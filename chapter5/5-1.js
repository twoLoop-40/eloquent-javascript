// array를 받아서 첫번째 엔트리를 꺼내서 array 아니면 붙여 나감 array 이면 재귀
const flatten = function (anArray) {
  return anArray.reduce((result, item) => {
    return !Array.isArray(item)
      ? result.concat([item])
      : result.concat(flatten(item));
  }, []);
};

// 테스트
const testArray = [[1, 2, 3], 4, [5, 6], [7, [8, 9]]];
console.log(testArray);
console.log(flatten(testArray));
