export default {
  Indexed: {
    keys: Object.freeze([0, 1, 2]),
    values: Object.freeze([1, 2, 3]),
    entries: Object.freeze([[0, 1], [1, 2], [2, 3]]),
    calls: Object.freeze([[1, 0], [2, 1], [3, 2]]),
    array: Object.freeze([1, 2, 3]),
    js: Object.freeze([1, 2, 3]),
  },
  Keyed: {
    keys: Object.freeze([9, 8, 7]),
    values: Object.freeze([1, 2, 3]),
    entries: Object.freeze([[9, 1], [8, 2], [7, 3]]),
    calls: Object.freeze([[1, 9], [2, 8], [3, 7]]),
    array: Object.freeze([[9, 1], [8, 2], [7, 3]]),
    js: Object.freeze({ 9: 1, 8: 2, 7: 3 }),
  },
  Set: {
    keys: Object.freeze([1, 2, 3]),
    values: Object.freeze([1, 2, 3]),
    entries: Object.freeze([[1, 1], [2, 2], [3, 3]]),
    calls: Object.freeze([[1, 1], [2, 2], [3, 3]]),
    array: Object.freeze([1, 2, 3]),
    js: Object.freeze([1, 2, 3]),
  },
};
