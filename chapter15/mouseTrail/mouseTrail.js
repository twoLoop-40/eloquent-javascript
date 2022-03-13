class MouseDot {
  static dotMaker() {
    return new MouseDot();
  }
  makeDot(event) {
    const composeDot = () => {
      const item = document.createElement("div");
      item.className = "trail";
      item.style.left = event.pageX - 5 + "px";
      item.style.top = event.pageY - 5 + "px";
      return item;
    };
    const dot = composeDot();
    document.body.appendChild(dot);
    setTimeout(() => document.body.removeChild(dot), 1000);
  }
  constructor() {}
}

let mouseSwitch = "OFF";

function mouseTrail(event) {
  const maker = MouseDot.dotMaker();
  maker.makeDot(event);
}

function mouseTrailSwtich(event) {
  if (mouseSwitch === "OFF") {
    console.log(mouseSwitch);
    document.addEventListener("mousemove", mouseTrail);
    const dotMaker = MouseDot.dotMaker();
    dotMaker.makeDot(event);
    mouseSwitch = "ON";
  } else if (mouseSwitch === "ON") {
    console.log(mouseSwitch);
    document.removeEventListener("mousemove", mouseTrail);
    mouseSwitch = "OFF";
  }
}

document.addEventListener("click", mouseTrailSwtich);
