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

// 4. Pass-through original rejection reason
Promise.reject("Server Down")
  .finally(() => console.log("Cleanup done"))
  .catch(console.log);
// Output:
// "Cleanup done"
// "Server Down"

// 5. Overriding rejection if .finally() itself throws
Promise.resolve("Success")
  .finally(() => {
    throw new Error("Cleanup Crash");
  })
  .catch((err) => console.log(err.message));
// Output: "Cleanup Crash"

// Promise.resolve(val): Wraps a value in a fulfilled Promise immediately

// 1. Converting primitive value to Promise
Promise.resolve(100).then(console.log);
// Output: 100

// 2. Flattening existing Promise (returns same reference)
const original = Promise.resolve("Exist");
console.log(Promise.resolve(original) === original);
// Output: true

// 3. Converting Thenable objects
const thenable = { then: (resolve) => resolve("Custom Thenable") };
Promise.resolve(thenable).then(console.log);
// Output: "Custom Thenable"

// 4. Resolving empty/undefined Promise
Promise.resolve().then((val) => console.log(val));
// Output: undefined

// 5. Normalizing dynamic return values in functions
const getData = (cached) =>
  cached ? Promise.resolve("Cache") : Promise.resolve("Network");
getData(true).then(console.log);
// Output: "Cache"

// Promise.reject(reason): Returns a rejected Promise immediately with reason

// 1. Rejecting with string reason
Promise.reject("Bad Request").catch(console.log);
// Output: "Bad Request"

// 2. Rejecting with Error object
Promise.reject(new TypeError("Invalid Type")).catch((err) =>
  console.log(err.name),
);
// Output: "TypeError"

// 3. Short-circuiting validation logic
function validate(input) {
  if (!input) return Promise.reject("Input required");
  return Promise.resolve("Valid");
}
validate("").catch(console.log);
// Output: "Input required"

// 4. Rejecting with an object
Promise.reject({ status: 404, message: "Not Found" }).catch((err) =>
  console.log(err.status),
);
// Output: 404

// 5. Rejecting another Promise instance (does not flatten)
const innerErr = new Error("Inner");
Promise.reject(Promise.reject(innerErr)).catch((reason) =>
  console.log(reason instanceof Promise),
);
// Output: true

// Promise.all(iterable): Fulfills when ALL succeed; fails fast if ANY 1 rejects

// 1. Parallel execution of multiple promises
Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B"),
  Promise.resolve("C"),
]).then(console.log);
// Output: ['A', 'B', 'C']

// 2. Fast-fail behavior on single rejection
Promise.all([
  Promise.resolve("OK"),
  Promise.reject("Failed Item"),
  Promise.resolve("OK 2"),
]).catch(console.log);
// Output: "Failed Item"

// 3. Mixing non-promise values in the array
Promise.all([10, Promise.resolve(20), 30]).then(console.log);
// Output: [10, 20, 30]

// 4. Handling empty array input (fulfills synchronously)
Promise.all([]).then((results) => console.log(results));
// Output: []

// 5. Concurrent timer processing
const p1 = new Promise((r) => setTimeout(() => r("Fast"), 10));
const p2 = new Promise((r) => setTimeout(() => r("Slow"), 20));
Promise.all([p1, p2]).then(console.log);
// Output: ['Fast', 'Slow']

// Promise.allSettled(iterable): Waits for all tasks to finish; returns array of {status, value/reason}

// 1. Aggregating successful and failed outcomes
Promise.allSettled([Promise.resolve("Success"), Promise.reject("Error")]).then(
  console.log,
);
// Output:
// [
//   { status: 'fulfilled', value: 'Success' },
//   { status: 'rejected', reason: 'Error' }
// ]

// 2. Filtering successful results only
Promise.allSettled([
  Promise.resolve(10),
  Promise.reject("Fail"),
  Promise.resolve(30),
])
  .then((results) =>
    results.filter((r) => r.status === "fulfilled").map((r) => r.value),
  )
  .then(console.log);
// Output: [10, 30]

// 3. Counting total failure rate
Promise.allSettled([
  Promise.reject("E1"),
  Promise.reject("E2"),
  Promise.resolve("OK"),
])
  .then((results) => results.filter((r) => r.status === "rejected").length)
  .then(console.log);
// Output: 2

// 4. Empty array handling
Promise.allSettled([]).then(console.log);
// Output: []

// 5. Handling non-promise elements
Promise.allSettled(["Static", Promise.resolve("Dynamic")]).then(console.log);
// Output:
// [
//   { status: 'fulfilled', value: 'Static' },
//   { status: 'fulfilled', value: 'Dynamic' }
// ]

// Promise.race(iterable): Adopts state of the FIRST settled promise (whether fulfilled or rejected)

// 1. Fastest fulfillment wins
const fast = new Promise((r) => setTimeout(() => r("Fast"), 10));
const slow = new Promise((r) => setTimeout(() => r("Slow"), 50));
Promise.race([fast, slow]).then(console.log);
// Output: "Fast"

// 2. Fastest rejection wins
const fastFail = new Promise((_, r) => setTimeout(() => r("Fast Error"), 10));
const slowSuccess = new Promise((r) => setTimeout(() => r("Slow Success"), 50));
Promise.race([fastFail, slowSuccess]).catch(console.log);
// Output: "Fast Error"

// 3. Request timeout implementation pattern
const request = new Promise((r) => setTimeout(() => r("Data Loaded"), 100));
const timeout = new Promise((_, r) =>
  setTimeout(() => r("Request Timeout"), 20),
);
Promise.race([request, timeout]).catch(console.log);
// Output: "Request Timeout"

// 4. Non-promise values win immediately
Promise.race([Promise.resolve("Async"), "Sync Immediate"]).then(console.log);
// Output: "Sync Immediate"

// 5. Empty array stays pending forever
const emptyRace = Promise.race([]);
console.log(emptyRace);
// Output: Promise { <pending> }

// Promise.any(iterable): Resolves on FIRST fulfillment; rejects with AggregateError if ALL fail

// 1. Ignores early rejections if a later fulfillment succeeds
const pErr = Promise.reject("Mirror 1 Failed");
const pOK = new Promise((r) => setTimeout(() => r("Mirror 2 OK"), 10));
Promise.any([pErr, pOK]).then(console.log);
// Output: "Mirror 2 OK"

// 2. All rejected leads to AggregateError
Promise.any([Promise.reject("Err 1"), Promise.reject("Err 2")]).catch((err) => {
  console.log(err.name);
  console.log(err.errors);
});
// Output:
// "AggregateError"
// ['Err 1', 'Err 2']

// 3. First fulfillment among multiple fulfills wins
Promise.any([
  Promise.resolve("First Success"),
  Promise.resolve("Second Success"),
]).then(console.log);
// Output: "First Success"

// 4. Mixed non-promises fulfill instantly
Promise.any([Promise.reject("Fail"), "Instant Static"]).then(console.log);
// Output: "Instant Static"

// 5. Empty array rejects immediately with AggregateError
Promise.any([]).catch((err) => console.log(err.name));
// Output: "AggregateError"

// Promise.withResolvers(): Returns { promise, resolve, reject } to settle a promise externally

// 1. Basic external resolution usage
const { promise, resolve } = Promise.withResolvers();
promise.then(console.log);
resolve("Resolved externally!");
// Output: "Resolved externally!"

// 2. Basic external rejection usage
const { promise: p3, reject: r2 } = Promise.withResolvers();
p3.catch(console.log);
r2("Rejected externally!");
// Output: "Rejected externally!"

// 3. Resolving inside an event callback pattern
const { promise: eventPromise, resolve: trigger } = Promise.withResolvers();
eventPromise.then((val) => console.log(`Triggered: ${val}`));
trigger("Button Clicked");
// Output: "Triggered: Button Clicked"

// 4. Storing resolve controls in a queue
const queue = [];
const task = Promise.withResolvers();
queue.push(task);
queue[0].resolve("Task 1 Completed");
task.promise.then(console.log);
// Output: "Task 1 Completed"

// 5. Cleaning up timer logic externally
const { promise: timePromise, resolve: finish } = Promise.withResolvers();
const timer = setTimeout(() => finish("Timer Done"), 10);
timePromise.then(console.log);
// Output: "Timer Done"

// async/await: Syntactic sugar; async functions return Promises, await pauses execution until resolved

// 1. Basic async function return wrapping
async function fetchNumber() {
  return 42;
}
fetchNumber().then(console.log);
// Output: 42

// 2. Awaiting a promise execution
async function run() {
  const data = await Promise.resolve("Data");
  console.log(data);
}
run();
// Output: "Data"

// 3. Error handling with try/catch
async function failRun() {
  try {
    await Promise.reject("Crash");
  } catch (err) {
    console.log(`Caught: ${err}`);
  }
}
failRun();
// Output: "Caught: Crash"

// 4. Sequential awaits
async function steps() {
  const a = await Promise.resolve("Step 1");
  const b = await Promise.resolve("Step 2");
  console.log(`${a} -> ${b}`);
}
steps();
// Output: "Step 1 -> Step 2"

// 5. Awaiting non-promise primitives
async function primitive() {
  const x = await 100;
  console.log(x);
}
primitive();
// Output: 100
