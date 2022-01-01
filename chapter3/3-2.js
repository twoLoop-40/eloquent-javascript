// 0 이면 true 1 이면 false n > 1 이면 isEven(n-2)
function isEven(num) {
  if (num < 0) {
    throw new Error("Invalid Input");
  }
  return num === 0 ? true : num === 1 ? false : isEven(num - 2);
}

// test
try {
  console.log(isEven(150));
} catch (err) {
  console.error(err);
}
