export function keyFromInst() {}

export default Object.freeze({
  Indexed: {
    NativeConstructor: Array,
    nativeSet: (array, key, value) => (array[key] = value),
    nativeSize: array => array.length,
    toNative: seq => seq.toArray(),
    clone: seq => seq.toIndexedSeq(),
    itemKey: (item, i) => i,
    itemValue: item => item,
  },
  Keyed: {
    NativeConstructor: Map,
    nativeSet: (map, key, value) => map.set(key, value),
    nativeSize: map => map.size,
    toNative: seq => seq.toMap(),
    clone: seq => seq.toKeyedSeq(),
    itemKey: item => item[0],
    itemValue: item => item[1],
  },
  Set: {
    NativeConstructor: Set,
    nativeSet: (set, key, value) => set.set(key, value),
    nativeSize: set => set.size,
    toNative: seq => seq.toSet(),
    clone: seq => seq.toSetSeq(),
    itemKey: item => item,
    itemValue: item => item,
  },
});
