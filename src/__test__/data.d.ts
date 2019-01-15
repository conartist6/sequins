declare const testData: {
  Indexed: {
    keys: Array<number>;
    values: Array<number>;
    entries: Array<[number, number]>;
    calls: Array<[number, number]>;
    array: Array<number>;
    object: { [key: number]: number };
    js: Array<number>;
  };
  Keyed: {
    keys: Array<number>;
    values: Array<number>;
    entries: Array<[number, number]>;
    calls: Array<[number, number]>;
    array: Array<[number, number]>;
    object: { [key: number]: number };
    objectKeys: Array<string>;
    objectValues: Array<number>;
    objectEntries: Array<[string, number]>;
    js: { [key: number]: number };
  };
  Duplicated: {
    keys: Array<number>;
    values: Array<number>;
    entries: Array<[number, number]>;
    calls: Array<[number, number]>;
    array: Array<number>;
    object: { [key: number]: number };
    js: Array<number>;
  };
};

declare function makeCalls(calls: any, collection?: any): any;
declare function freezeTestData<T>(testData: T): T;

export { makeCalls, freezeTestData };
export default testData;
