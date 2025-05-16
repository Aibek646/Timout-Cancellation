var cancellable = function (fn, args, t) {
  const timer = setTimeout(() => {
    fn(...args);
  }, t);
  const cancelTimer = () => {
    clearTimeout(timer);
  };
  return cancelTimer;
};

const result = [];

const fn1 = (x) => {
  return x ** 2;
};

const args = [2];
const t = 100;
const cancelTimesMs = 50;

const start = performance.now();
console.log(start);

const log = (...argsArr) => {
  const diff = Math.floor(performance.now() - start);
  result.push({ time: diff, returned: fn1(...argsArr) });
};

const cancel = cancellable(log, args, t);

const maxT = Math.max(t, cancelTimesMs);

setTimeout(cancel, cancelTimesMs);

setTimeout(() => {
  console.log(result);
}, maxT + 15);
