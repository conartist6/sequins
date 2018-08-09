export function keyFromInst() {}

export default Object.freeze({
  Indexed: {
    nativeSet: (array, key, value) => (array[key] = value),
    nativeSize: array => array.length,
    toNative: seq => seq.toArray(),
    itemKey: (item, i) => i,
    itemValue: item => item,
  },
  Keyed: {
    nativeSet: (map, key, value) => map.set(key, value),
    nativeSize: map => map.size,
    toNative: seq => seq.toMap(),
    itemKey: item => item[0],
    itemValue: item => item[1],
  },
  Set: {
    nativeSet: (set, key, value) => set.set(key, value),
    nativeSize: set => set.size,
    toNative: seq => seq.toSet(),
    itemKey: item => item,
    itemValue: item => item,
  },
});
