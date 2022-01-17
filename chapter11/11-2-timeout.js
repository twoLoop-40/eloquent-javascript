const Promise_all = function (promises) {
  return new Promise((resolve, reject) => {
    let result = [];
    for (let [idx, p] of promises.entries()) {
      p.then((value) => {
        result[idx] = value;
      }).catch((err) => reject(err));
    }
    setTimeout(() => resolve(result), 300);
    // Promise.resolve()
    //   .then(() => console.log("한번 쉬고"))
    //   .then(() => resolve(result));
  });
};

// Test code.
Promise_all([]).then((array) => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then((array) => {
    console.log("We should not get here");
  })
  .catch((error) => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    } else console.error(error);
  });
