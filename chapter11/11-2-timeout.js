const Promise_all = function (promises) {
  return new Promise((resolve, reject) => {
    const length = promises.length;
    //if (length == 0) resolve(promises);
    let result = [];
    //let count = 0;
    for (let [idx, p] of promises.entries()) {
      p.then((value) => {
        result[idx] = value;
      }).catch((err) => reject(err));
    }
    setTimeout(() => resolve(result), 1000);
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
    }
  });
