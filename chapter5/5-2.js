// loop:: (any, function, function, function) -> any
// 첫번째는 테스트, 두번째는 update, 세번째는 목적함수
// 재귀로 구현
const loop = function (value, predicate, next, targetAction) {
  if (!predicate(value)) {
    return;
  } else {
    targetAction(value);
    return loop(next(value), predicate, next, targetAction);
  }
};
