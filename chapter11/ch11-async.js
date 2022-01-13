const { bigOak, defineRequestType, everywhere } = require("./crow-tech");

// nest의 스토리지를 읽어서 결과를 resolve하기
const storage = function (nest, name) {
  return new Promise((resolve) => {
    nest.readStorage(name, (result) => resolve(result));
  });
};

// storage(bigOak, "enemies").then((value) => console.log("Got", value));

// Timeout error 만들기
class Timeout extends Error {}

// nest에서 target에 type에 해당하는 핸들러를 활용해서 content를 보내기
const request = function (nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    const attempt = function (n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 250);
    };
    attempt(1);
  });
};

// handler type에 등록하기
const requestType = function (name, handler) {
  defineRequestType(name, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source)).then(
        (response) => callback(null, response),
        (failure) => callback(failure)
      );
    } catch (exception) {
      callback(exception);
    }
  });
};

// 가능한 neighbor 찾기
requestType("ping", () => "pong");
const availableNeighbors = function (nest) {
  let requests = nest.neighbors.map((neighbor) => {
    return request(nest, neighbor, "ping").then(
      () => true,
      () => false
    );
  });
  return Promise.all(requests).then((result) => {
    return nest.neighbor.filter((_, i) => result[i]);
  });
};

// 저장소에 gossip 만들기
everywhere((nest) => {
  nest.state.gossip = [];
});

// gossip neighbor에게 전파하는 함수
const sendGossip = function (nest, message, exceptFor = null) {
  // 일단 메세지 저장
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    // gossip 타입의 request 하기
    request(nest, neighbor, "gossip", message);
  }
};

// gossip type 만들기
requestType("gossip", (nest, message, source) => {
  if (nest.state.gossip.includes(message)) return;
  console.log(`${nest.name} received gossip '${message}' from ${source}`);
  sendGossip(nest, message, source);
});

// connection type 만들기
requestType("connections", (nest, { name, neighbors }, source) => {
  let connections = nest.state.connections;
  if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors))
    return;
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

const broadcastConnections = function (nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "connections", {
      name,
      neighbors: nest.state.connections.get(name),
    });
  }
};
// 모든 둥지에 connections 정보 달기
everywhere((nest) => {
  nest.state.connections = new Map();
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

// 길찾기 함수
const findRoute = function (from, to, connections) {
  let work = [{ at: from, via: null }];
  for (let i = 0; i < work.length; i++) {
    let { at, via } = work[i];
    for (let next of connections.get(at) || []) {
      if (next == to) return via;
      if (!work.some((w) => w.at == next)) {
        work.push({ at: next, via: via || next });
      }
    }
  }
  return null;
};
