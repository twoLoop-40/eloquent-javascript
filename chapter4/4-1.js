// number -> [] -> [] 배열의 끝의 엔트리를 number만큼 더해서 추가함
const entailItem = function (step) {
  return (arr = []) => arr.concat(liftToArray(arr[arr.length - 1] + step));
};

// item -> [item]
const liftToArray = function (item) {
  return [item];
};

// (start, end, step) -> []
// start 에서 step만큼 더해서 end까지 숫자를 붙여나감
const range = function (start, end, step = 1) {
  // step만큼 더해서 배열에 붙이는 함수
  const addItemToTail = entailItem(step);

  let result = liftToArray(start);
  let currentPosition = start;
  while (currentPosition + step <= end) {
    result = addItemToTail(result);
    currentPosition += step;
  }
  return result;
};

// 배열에 있는 원소를 합하기
const sum = function (arr = []) {
  return arr.reduce((total, value) => total + value, 0);
};

// 결과
console.log(range(1, 15, 2));
console.log(sum(range(1, 15, 2)));
