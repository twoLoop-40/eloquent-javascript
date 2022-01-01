// 배열의 제일 앞의 엔트리를 리프트 해서 결과와 concat
const reverseArray = function (array) {
  // item -> array
  const liftToArray = (item) => [item];
  let result = [];
  for (const item of array) {
    result = liftToArray(item).concat(result);
  }
  return result;
};
// 배열의 엔트리에서 거울위치를 찾음
const findSymmtricIndex = function (array) {
  return (idx) => array.length - 1 - idx;
};

// 배열 인덱스 절반 전까지를 절반뒤와 바꿈
const reverseArrayInPlace = function (array) {
  const pivot = Math.floor(array.length / 2);
  const replaceIndex = findSymmtricIndex(array);
  for (let i = 0; i < pivot; i++) {
    [array[i], array[replaceIndex(i)]] = [array[replaceIndex(i)], array[i]];
  }
};

// 부수효과 없는 함수 결과
const testArr1 = [1, 2, 3, 4, 5];
console.log(reverseArray(testArr1));
console.log(testArr1);
// 부수효과 있는 함수 결과
reverseArrayInPlace(testArr1);
console.log(testArr1);
