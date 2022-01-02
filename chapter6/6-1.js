// class Vec
class Vec {
  // x, y로 cons 없으면 원점
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  // plus:: Vec -> Vec
  // 좌표끼리 더하는 메서드
  plus(aVec) {
    return new Vec(this.x + aVec.x, this.y + aVec.y);
  }
  // minus:: Vec -> Vec
  // 좌표끼리 빼는 메서드
  minus(aVec) {
    return new Vec(this.x - aVec.x, this.y - aVec.y);
  }

  // length:: () -> number
  // 원점으로 부터의 길이
  get length() {
    const square = (x) => x * x;
    return Math.sqrt(
      [this.x, this.y].reduce(
        (sumSquare, currVal) => sumSquare + square(currVal),
        0
      )
    );
  }
}
