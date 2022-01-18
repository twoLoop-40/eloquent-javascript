const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];
// 노드만들기
// table 시작하기
const startTable = function ({ id = "", className = "" } = {}) {
  const tableBox = document.createElement("table");
  if (id) tableBox.setAttribute("id", id);
  else if (className) tableBox.setAttribute("className", className);
  return tableBox;
};

// tableBox 받아서 tableElements를 받아서 한줄 씩 붙여 나가기
const fillUpTable = function (type = "", tableElemStrings = []) {
  // row를 만들어두기
  const tableElems = tableElemStrings.map((itemName) => {
    const typeElement = document.createElement(type);
    typeElement.appendChild(document.createTextNode(itemName));
    return typeElement;
  });
  // tr에 붙이기
  const tr = document.createElement("tr");
  tableElems.forEach((item) => tr.appendChild(item));
  return (tableBox) => {
    // tableBox에 달아서 리턴
    tableBox.appendChild(tr);
    return tableBox;
  };
};
// mountains 의 요소들을 주어진 속성의 순서대로 배열로 바꾸기
const changeType = function (items = {}) {
  return (...props) => props.map((prop) => items[prop].toString());
};

const props = ["name", "height", "place"];
// table 시작하기
const table = fillUpTable("th", props)(startTable());
MOUNTAINS.map((mountain) => changeType(mountain)(...props))
  .map((mountainArray) => fillUpTable("td", mountainArray))
  .forEach((row) => row(table));
document.getElementById("mountains").appendChild(table);
