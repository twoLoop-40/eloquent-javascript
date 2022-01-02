// class Group
class Group {
  // 데이터는 배열에 저장하지만 걸러내는 메서드 사용
  constructor() {
    this.member = [];
  }
  // add 중복된 엔트리 제거하고 member에 추가
  add(elem) {
    if (!this.has(elem)) this.member.push(elem);
    return this;
  }
  // has member가 존재하는 지 확인
  has(elem) {
    return this.member.indexOf(elem) >= 0;
  }
  //delete member가 존재하면 그 멤버를 제거
  delete(elem) {
    if (!this.has(elem)) {
      return this;
    } else {
      const indexOfElem = this.member.indexOf(elem);
      this.member.splice(indexOfElem, 1);
      return this;
    }
  }

  // from iterable 오브젝트에서 그룹을 생성
  // has를 이용해서 확인하고 iterable에서 하나씩 넣어서 리턴
  static from(anIterable) {
    const group = new Group();
    for (const item of anIterable) {
      if (!group.has(item)) group.add(item);
    }
    return group;
  }
}

// test
const group = Group.from([10, 20, 30]);
console.log(group.has(10));
