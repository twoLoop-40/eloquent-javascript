class ArrowKey {
  static makeArrowKey(event) {
    return new ArrowKey(event);
  }
  direction() {
    const { keyCode } = this.event;
    if (keyCode == "37") return "left";
    if (keyCode == "38") return "up";
    if (keyCode == "39") return "right";
    if (keyCode == "40") return "down";
  }

  constructor(event) {
    this.event = event;
  }
}

function changeSize(elem, percentRatio) {
  const measureSize = (elem) => {
    const sizeString = elem.style.fontSize;
    const getNumber = (string) => {
      const reg = /^\d+/;
      return Number(reg.exec(string)[0]);
    };
    return getNumber(sizeString);
  };
  const increase = (elem, delta) => {
    const fontSize = measureSize(elem) + delta;
    elem.style.fontSize = `${fontSize}%`;
    return elem;
  };
  const decrease = (elem, delta) => {
    const fontSize = measureSize(elem) - delta;
    elem.style.fontSize = `${fontSize}%`;
    return elem;
  };
  const bigger = (elem, targetRatio, delta) => {
    if (measureSize(elem) / currentSize > targetRatio) return elem;
    setTimeout(() => {
      const nextElem = increase(elem, delta);
      return bigger(nextElem, targetRatio, delta);
    }, 10);
  };
  const smaller = (elem, targetRatio, delta) => {
    if (measureSize(elem) / currentSize < targetRatio) return elem;
    setTimeout(() => {
      const nextElem = decrease(elem, delta);
      return smaller(nextElem, targetRatio, delta);
    }, 10);
  };
  const currentSize = measureSize(elem);
  const delta = 1;
  const targetRatio = 1 + percentRatio / 100;
  if (percentRatio == 0) {
    return elem;
  }
  if (percentRatio > 0) {
    if (measureSize(elem) > 750) return pung(elem);
    return bigger(elem, targetRatio, delta);
  }
  if (percentRatio < 0) {
    return smaller(elem, targetRatio, delta);
  }
}

function pung(elem) {
  const pungString = "💥";
  elem.textContent = pungString;
  document.removeEventListener("keydown", resizePic);
}
function startBalloon() {
  const balloon = document.getElementById("balloon");
  balloon.style.fontSize = "150%";
  return balloon;
}

const balloon = startBalloon();
function resizePic(event) {
  event.preventDefault();
  const arrowKey = ArrowKey.makeArrowKey(event);
  if (arrowKey.direction() == "up") {
    changeSize(balloon, 10);
  }
  if (arrowKey.direction() == "down") {
    changeSize(balloon, -10);
  }
}
document.addEventListener("keydown", resizePic);
