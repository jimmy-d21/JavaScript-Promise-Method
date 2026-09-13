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

// 3. Transforming string values through chain steps
Promise.resolve("hello")
  .then((str) => str.toUpperCase())
  .then((str) => `${str} WORLD`)
  .then(console.log);
// Output: "HELLO WORLD"

// 4. Error recovery in the middle of a chain
Promise.reject("Initial Error")
  .catch(() => "Recovered Value")
  .then((val) => `${val} -> Next Step`)
  .then(console.log);
// Output: "Recovered Value -> Next Step"

// 5. Short-circuiting a chain on uncaught failure
Promise.resolve(10)
  .then(() => {
    throw new Error("Break Chain");
  })
  .then(() => "Skipped Step")
  .catch((err) => err.message)
  .then(console.log);
// Output: "Break Chain"

// .then(onFulfilled): Runs callback when Promise resolves; returns a new Promise

// 1. Extracting data on resolution
Promise.resolve("Payload Ready").then((data) => console.log(data));
// Output: "Payload Ready"

// 2. Dual parameter use (onFulfilled, onRejected)
Promise.reject("Failed").then(
  (res) => console.log(res),
  (err) => console.log(`Handled rejection: ${err}`),
);
// Output: "Handled rejection: Failed"

// 3. Value pass-through when callback returns scalar
Promise.resolve(100)
  .then((res) => res + 50)
  .then(console.log);
// Output: 150

// 4. Async flattening (returning internal Promise)
Promise.resolve()
  .then(() => Promise.resolve("Nested Resolved"))
  .then(console.log);
// Output: "Nested Resolved"

// 5. Skipping handler when non-function passed
Promise.resolve("Direct Value").then(null).then(console.log);
// Output: "Direct Value"

// .catch(onRejected): Catches rejections or exceptions thrown anywhere prior in the chain

// 1. Catching rejected promises
Promise.reject("API 500 Server Error").catch((err) =>
  console.log(`Caught: ${err}`),
);
// Output: "Caught: API 500 Server Error"

// 2. Catching synchronous throws inside .then()
Promise.resolve()
  .then(() => {
    throw new Error("Unexpected Crash");
  })
  .catch((err) => console.log(err.message));
// Output: "Unexpected Crash"

// 3. Continuing the chain by returning a fallback value from .catch()
Promise.reject("Failed Fetch")
  .catch(() => ({ status: "Offline Cache" }))
  .then((data) => console.log(data.status));
// Output: "Offline Cache"

// 4. Re-throwing errors to pass them to downstream handlers
Promise.reject("Fatal DB Failure")
  .catch((err) => {
    throw new Error(`Log: ${err}`);
  })
  .catch((err) => console.log(err.message));
// Output: "Log: Fatal DB Failure"

// 5. Bypassing .catch() when no error occurs
Promise.resolve("All Good")
  .catch(() => "Won't Run")
  .then(console.log);
// Output: "All Good"

// .finally(callback): Runs cleanup logic on settlement; transparently passes through state/values

// 1. Cleanup after success
Promise.resolve("Data Loaded")
  .finally(() => console.log("Spinner hidden"))
  .then(console.log);
// Output:
// "Spinner hidden"
// "Data Loaded"

// 2. Cleanup after failure
Promise.reject("Error Occurred")
  .finally(() => console.log("Resource released"))
  .catch((err) => console.log(err));
// Output:
// "Resource released"
// "Error Occurred"

// 3. Pass-through original resolution value
Promise.resolve(42)
  .finally(() => "Ignored return value")
  .then(console.log);
// Output: 42
