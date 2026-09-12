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

// 4. Conditional resolve/reject based on logic
const checkAge = (age) =>
  new Promise((resolve, reject) => {
    age >= 18 ? resolve("Allowed") : reject("Denied");
  });
checkAge(20).then(console.log);
// Output: "Allowed"

// 5. Handling asynchronous execution order
new Promise((resolve) => {
  console.log("1. Executor runs synchronously");
  resolve("3. Resolved");
}).then(console.log);
console.log("2. Outer script continues");
// Output:
// "1. Executor runs synchronously"
// "2. Outer script continues"
// "3. Resolved"

// States: pending -> fulfilled (resolved) OR pending -> rejected (state changes are permanent)

// 1. Pending state (unsettled execution)
const pendingPromise = new Promise(() => {});
console.log(pendingPromise);
// Output: Promise { <pending> }

// 2. Fulfilled state transition
const fulfilledPromise = Promise.resolve("Data loaded");
console.log(fulfilledPromise);
// Output: Promise { "Data loaded" }

// 3. Rejected state transition
const rejectedPromise = Promise.reject("Network Error");
rejectedPromise.catch(() => {}); // Prevent unhandled rejection warning
console.log(rejectedPromise);
// Output: Promise { <rejected> "Network Error" }

// 4. State immutability (first resolution wins)
new Promise((resolve, reject) => {
  resolve("First Call Wins");
  reject("Ignored");
  resolve("Ignored");
}).then(console.log);
// Output: "First Call Wins"

// 5. State locks indefinitely if never settled
const neverSettles = new Promise(() => {});
neverSettles.then(() => console.log("Never runs"));
console.log("Finished script");
// Output: "Finished script"

// Chaining: Returning values/promises inside .then() passes them down to the next .then()

// 1. Chaining simple mathematical operations
Promise.resolve(5)
  .then((val) => val * 2)
  .then((val) => val + 3)
  .then(console.log);
// Output: 13

// 2. Returning a inner Promise inside a chain
Promise.resolve("User ID: 42")
  .then((id) => new Promise((resolve) => resolve(`${id} -> Profile Data`)))
  .then(console.log);
// Output: "User ID: 42 -> Profile Data"
