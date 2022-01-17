const checkResolve = function () {
  const err = new Error("error");
  Promise.resolve(Promise.reject(err))
    .then((err) => console.error(err, "\nfrom then"))
    .catch((err) => console.error(err, "\nfrom catch"));
};

checkResolve();
