// 파이프
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((y, f) => f(y), x);

/*
 * [number, str] -> [number, str] -> [number, str]
 * 숫자를 받고 문자열을 받아서 숫자의 배수가 확인되면 [숫자, 문자열 + 문자열]
 * 아니면 원래 받은 [숫자, 문자열]
 */
function addStringForMultiple([num, str = ""] = []) {
  return ([aNum, aStr = ""]) =>
    aNum % num === 0 ? [aNum, aStr + str] : [aNum, aStr];
}

// 3은 Fizz, 5는 Buzz
const addStringForThree = addStringForMultiple([3, "Fizz"]);
const addStringForFive = addStringForMultiple([5, "Buzz"]);

// [number, str] 받아서 str !== '' 이면 number 아니면 str 출력
function chooseFromArray([num, str = ""]) {
  return str === "" ? num : str;
}

// from 에서 to 까지 [number, ''] 생성
function makeNumberString(from, to) {
  const netLength = to - from + 1;
  return Array.from({ length: netLength }, (_, idx) => [idx + from, ""]);
}

// 함수 합쳐서 결과 내는 함수
const combined = pipe(addStringForThree, addStringForFive, chooseFromArray);

// 결과
makeNumberString(1, 100)
  .map(combined)
  .forEach((output) => console.log(output));
