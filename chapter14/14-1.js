const elt = function (type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child != "string") node.appendChild(child);
    else node.appendChild(document.createTextNode(child));
  }
  return node;
};

// tr에 td 넣기
const makeTr = function (row) {
  return elt(
    "tr",
    elt("td", row.name),
    elt("td", row.height.toString()),
    elt("td", row.place)
  );
};

const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];

// Your code here
const mountainsTable = document.createElement("table");
mountainsTable.setAttribute("class", "mountains-table");
mountainsTable.appendChild(
  elt("tr", elt("th", "name"), elt("th", "height"), elt("th", "place"))
);
// mountains 붙이기
for (const row of MOUNTAINS) {
  mountainsTable.appendChild(makeTr(row));
}

// mountains에 tag child 붙이기
const mountainsBox = document.getElementById("mountains");
mountainsBox.appendChild(mountainsTable);
