// aChar -> aStr -> number
// 캐릭터 받아서 스트링 받으면 캐릭터 카운트 하기
const countChar = function (aChar) {
  return (aStr) => {
    let result = 0;
    for (const letter of aStr) {
      letter === aChar ? (result += 1) : (result += 0);
    }
    return result;
  };
};

// B 카운트 하기
const countBs = countChar("B");

// 결과
console.log(countBs("Brazil Brother"));
