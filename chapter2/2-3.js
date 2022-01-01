/*
 * 체스판 만들기
 */

// 문자 두개와 숫자를 받아서 번갈아 문자 두개를 숫자만큼 놓는 함수
function alternateChar(c1 = "", c2 = "") {
  return (num) => {
    let result = "",
      count = 1;
    while (count <= num) {
      count % 2 === 1 ? (result = result + c1) : (result = result + c2);
      count++;
    }
    return result;
  };
}

// 문자 두개와 문자열을 받아서 문자열의 문자를 서로 바꾸는 함수
function inverseString(c1 = "", c2 = "") {
  return (str = "") => {
    let result = "";
    for (const letter of str) {
      letter === c1
        ? (result = result + c2)
        : letter === c2
        ? (result = result + c1)
        : (result = result + letter);
    }
    return result;
  };
}

// 체스판 홀수행과, 짝수행
const COLUMN = 10;
const oddRow = alternateChar(" ", "#")(COLUMN);
const evenRow = inverseString(" ", "#")(oddRow);

// 홀수행과 짝수행을 주어진 행 만큼 반복해서 붙이기
const ROW = 10;
let count = 1,
  result = "";
while (count <= ROW) {
  count % 2
    ? (result = result + oddRow + "\n")
    : (result = result + evenRow + "\n");
  count++;
}

// 마지막 글자 제거
const cutTailWords =
  (num = 0) =>
  (str = "") =>
    str.slice(0, -num);
const cutTailChar = cutTailWords(1);

// 결과 출력
console.log(cutTailChar(result));
