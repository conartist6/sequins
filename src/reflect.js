export function keyFromInst() {}

export default Object.freeze({
  Indexed: {
    toOwnType: seq => seq.toArray(),
    toOwnTypeSeq: seq => seq.toIndexedSeq(),
    itemKey: (item, i) => i,
    itemValue: item => item,
  },
  Keyed: {
    toOwnType: seq => seq.toMap(),
    toOwnTypeSeq: seq => seq.toKeyedSeq(),
    itemKey: item => item[0],
    itemValue: item => item[1],
  },
  Set: {
    toOwnType: seq => seq.toSet(),
    toOwnTypeSeq: seq => seq.toSetSeq(),
    itemKey: item => item,
    itemValue: item => item,
  },
});
