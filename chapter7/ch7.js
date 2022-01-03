// 기본 데이터
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Ernie's House-Grete's House",
];

// graph만들기
const buildGraph = function (edges) {
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
