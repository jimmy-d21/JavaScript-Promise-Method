// new Promise((resolve, reject) => {}): Wraps async operations; call resolve(data) or reject(error)

// 1. Basic successful Promise creation
new Promise((resolve) => resolve("Success!")).then(console.log);
// Output: "Success!"

// 2. Basic rejected Promise creation
new Promise((_, reject) => reject(new Error("Failed!"))).catch((err) =>
  console.log(err.message),
);
// Output: "Failed!"
