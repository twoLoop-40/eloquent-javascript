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
const range = function (start, end, step) {
  // step만큼 올리는 jumper를 만듦
  const makejump = entailItem(step);

  let result = liftToArray(start);
  let currentPosition = start;
  while (currentPosition + step < end) {
    result = makejump(result);
    currentPosition += step;
  }
  return result;
};

// 결과
console.log(range(1, 15, 3));
