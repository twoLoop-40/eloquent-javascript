// nodeName 을 조사하여 tagName과 같으면 리턴
// 아니면 자손을 재귀적으로 조사하여 같은 함수를 실행
function byTagName(node, tagName) {
  let result = [];
  const iter = function (node) {
    if (node.nodeName.toLowerCase() == tagName.toLowerCase()) {
      result.push(node);
      //console.log(result.nodeName);
      return;
    } else {
      for (let childNode of node.childNodes) {
        iter(childNode);
      }
    }
  };
  iter(node);
  return result;
}

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2
