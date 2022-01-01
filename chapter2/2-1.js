// 인수 배열을 받아서 함수를 인수 배열위에서 실행하는 함수
function excuteOnArray(args = []) {
  return (afunction) => args.forEach((arg) => afunction(arg));
}

// character을 받아서 숫자대로 그 character를 만들어서 리턴하는 함수
function replicateCharacter(aChar = "") {
  return (aNumber) => {
    let result = "";
    for (let i = 0; i < aNumber; i++) {
      result = result + aChar;
    }
    console.log(result);
    return result;
  };
}

// 원하는 숫자의 배열
const REPEAT = 20;
const numberArgs = Array.from({ length: REPEAT }, (_, idx) => idx + 1);

// #를 찍는 함수 만들기
const repeatSharp = replicateCharacter("#");

// 결과
excuteOnArray(numberArgs)(repeatSharp);
