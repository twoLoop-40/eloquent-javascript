// 기본 데이터
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town",
  "Shop-Town Hall",
];

// graph만들기
const buildGraph = function (edges) {
  // 빈 객체
  let graph = Object.create(null);
  // addEdge, 그래프에 없으면 시작 = 끝, 다르면 추가
  const addEdge = function (from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  };
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
};

const roadGraph = buildGraph(roads);

// VillageState place와 parcels
class VillageState {
  // 상태
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  // parcel 중 이곳에서 출발하지 않는 것은 그대로 둠
  // 이곳에서 출발하는 것은 destination으로 시작지를 옮김
  // 출발하는 곳과 목적지가 같은 것은 제외함
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);
      return new VillageState(destination, parcels);
    }
  }
}
// 시작점 설정
let first = new VillageState("Post Office", [
  { place: "Post Office", address: "Alice's House" },
]);
let next = first.move("Alice's House");
// 로봇 운영하기
// village state와 memory를 이용하여 action = { direction, memory } 를 결정
// state와 memory를 재할당
const runRobot = function (state, robot, memory) {
  let totalTurns = 0;
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      console.log(`Done in ${turn} turns`);
      totalTurns = turn;
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
  return totalTurns;
};

// random 하게 할일 결정하기
const randomPick = function (array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
};
const randomRobot = function (state) {
  return { direction: randomPick(roadGraph[state.place]) };
};

// 5개의 parcel을 random하게 만들고 Post Office에서 출발하기
VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);
    parcels.push({ place, address });
  }
  return new VillageState("Post Office", parcels);
};

// 메일의 경로
const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];

// memory를 이용한 robot
const routeRobot = function (state, memory) {
  if (memory.length == 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
};

// 중복을 최대한 줄이는 경로 찾기
const findRoute = function (graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
};
// findRoute 장착한 robot
const goalOrientedRobot = function ({ place, parcels }, route = []) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
};

// randomRobot으로 실행하기
//runRobot(VillageState.random(), randomRobot);

// routeRobot로 실행하기
// runRobot(VillageState.random(), routeRobot, mailRoute);

// goalOrientedRobot으로 실행
//runRobot(VillageState.random(), goalOrientedRobot);

export { runRobot, VillageState, randomRobot, routeRobot, goalOrientedRobot };
