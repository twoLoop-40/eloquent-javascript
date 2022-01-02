// head of Array
const head = (anArray = []) => anArray[0];
// tail of Array
const tail = (anArray = []) => anArray.slice(1);

// arrayToList:: [] -> List
// 엔트리가 하나: value 와 rest: null
// 엔트리가 둘 이상 value, rest: arrayToList(tail(anArray))
const arrayToList = function (anArray = []) {
  if (anArray.length === 0) {
    return null;
  } else if (anArray.length === 1) {
    return { value: head(anArray), rest: null };
  } else {
    return { value: head(anArray), rest: arrayToList(tail(anArray)) };
  }
};

// 테스트
const testArray = [1, 2, 3];
console.log(arrayToList(testArray));
