import {
  goalOrientedRobot,
  randomRobot,
  runRobot,
  VillageState,
} from "./ch7.js";

// 평균 구하기
const average = function (values = []) {
  const length = values.length;
  const sumOfValues = values.reduce((sum, value) => sum + value, 0);
  return sumOfValues / length;
};

const compareRobots = function (robot1, robot2) {
  // 작업 생성
  const NUM_OF_WORKS = 100;
  const works = [];
  for (let i = 0; i < NUM_OF_WORKS; i++) {
    works.push(VillageState.random());
  }
  // 각 로봇의 평균 작업 횟수들
  const averageTurnsForRobot1 = average(
    works.map((work) => runRobot(work, robot1))
  );
  const averageTurnsForRobot2 = average(
    works.map((work) => runRobot(work, robot2))
  );

  console.log(
    `첫번째 로봇: ${averageTurnsForRobot1}, 두번째 로봇: ${averageTurnsForRobot2}`
  );
};

compareRobots(randomRobot, goalOrientedRobot);
