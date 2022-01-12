// (function, number, number) -> number
// function 은 primitiveMultiply 이고 성공하면 결과를 실패하면 다시 시도하는 함수
const tryMultiplication = function (action, x, y) {
  try {
    return action(x, y);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
      console.error(e);
      return tryMultiplication(action, x, y);
    } else {
      throw e;
    }
  }
};
