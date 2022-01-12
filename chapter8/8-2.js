const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked");
    return this._content;
  },
};

const withBoxUnlocked = function (body) {
  if (box.locked) {
    box.unlock();
    try {
      body();
      box.lock();
      return;
    } catch (err) {
      box.lock();
      throw err;
    }
  } else {
    body();
  }
};

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort");
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log(box.locked);
