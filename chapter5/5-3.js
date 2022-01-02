// everyUsingSome :: ([], function) => bool
// some을 이용한 every 구현
// predicate를 만족하지 않는 것이 하나라도 있으면 false 이니면 trud
const everyUsingSome = function (array, predicate) {
  return !array.some((item) => !predicate(item));
};

// everyUsingFor:: ([], function) => bool
// for문을 이용한 구현 하나씩 체크해서 하나라도 거짓이면 거짓
const everyUsingFor = function (array, predicate) {
  for (const item of array) {
    if (!predicate(item)) return false;
  }
  return true;
};
