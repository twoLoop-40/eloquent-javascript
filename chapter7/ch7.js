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
