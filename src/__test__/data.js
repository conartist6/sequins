const testData = {
  Indexed: {
    keys: [0, 1, 2],
    values: [1, 2, 3],
    entries: [[0, 1], [1, 2], [2, 3]],
    calls: [[1, 0], [2, 1], [3, 2]],
    array: [1, 2, 3],
    object: { 0: 1, 1: 2, 2: 3 },
    js: [1, 2, 3],
  },
  Keyed: {
    keys: [9, 8, 7],
    values: [1, 2, 3],
    entries: [[9, 1], [8, 2], [7, 3]],
    calls: [[1, 9], [2, 8], [3, 7]],
    array: [[9, 1], [8, 2], [7, 3]],
    object: { 9: 1, 8: 2, 7: 3 },
    js: { 9: 1, 8: 2, 7: 3 },
  },
  Set: {
    keys: [1, 2, 3],
    values: [1, 2, 3],
    entries: [[1, 1], [2, 2], [3, 3]],
    calls: [[1, 1], [2, 2], [3, 3]],
    array: [1, 2, 3],
    object: { 1: 1, 2: 2, 3: 3 },
    js: [1, 2, 3],
  },
};

export function freezeTestData(testData) {
  for (const sequenceType of Object.keys(testData)) {
    for (const dataset of Object.values(testData[sequenceType])) {
      Object.freeze(dataset);
    }
    Object.freeze(testData[sequenceType]);
  }
  Object.freeze(testData);
}

freezeTestData(testData);

export function makeCalls(calls, collection) {
  return collection ? calls.map(call => [...call, collection]) : calls;
}

export default testData;
