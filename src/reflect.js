export function keyFromInst() {}

export default Object.freeze({
  Indexed: {
    toNative: seq => seq.toArray(),
    clone: seq => seq.toIndexedSeq(),
    itemKey: (item, i) => i,
    itemValue: item => item,
  },
  Keyed: {
    toNative: seq => seq.toMap(),
    clone: seq => seq.toKeyedSeq(),
    itemKey: item => item[0],
    itemValue: item => item[1],
  },
  Set: {
    toNative: seq => seq.toSet(),
    clone: seq => seq.toSetSeq(),
    itemKey: item => item,
    itemValue: item => item,
  },
});
