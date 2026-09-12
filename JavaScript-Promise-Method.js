// new Promise((resolve, reject) => {}): Wraps async operations; call resolve(data) or reject(error)

// 1. Basic successful Promise creation
new Promise((resolve) => resolve("Success!")).then(console.log);
// Output: "Success!"

// 2. Basic rejected Promise creation
new Promise((_, reject) => reject(new Error("Failed!"))).catch((err) =>
  console.log(err.message),
);
// Output: "Failed!"

// 3. Wrapping setTimeout inside a Promise
const delay = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(`Done in ${ms}ms`), ms));
delay(10).then(console.log);
// Output: "Done in 10ms"
