// PGroup
// add와 delete를 할 때 새로운 PGroup를 만들어 내는 자료구조
// PGroup.empty와 빈그룹
class PGroup {
  constructor() {
    this.members = [];
  }

  static get empty() {
    return new PGroup();
  }

  has(elem) {
    return this.members.indexOf(elem) > -1;
  }

  add(elem) {
    if (this.has(elem)) {
      return this;
    } else {
      const pgroup = PGroup.empty;
      pgroup.members = this.members.concat([elem]);
      return pgroup;
    }
  }

  delete(elem) {
    if (!this.has(elem)) {
      return this;
    } else {
      const idx = this.members.indexOf(elem);
      const pgroup = PGroup.empty;
      pgroup.members = this.members
        .slice(0, idx)
        .concat(this.members.slice(idx + 1));
      return pgroup;
    }
  }
}
