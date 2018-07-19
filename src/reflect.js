export default Object.freeze({
  Indexed: {
    toOwnTypeSeq: seq => seq.toIndexedSeq(),
    itemKey: (item, i) => i,
    itemValue: item => item,
  },
  Keyed: {
    toOwnTypeSeq: seq => seq.toKeyedSeq(),
    itemKey: item => item[0],
    itemValue: item => item[1],
  },
  Set: {
    toOwnTypeSeq: seq => seq.toSetSeq(),
    itemKey: item => item,
    itemValue: item => item,
  },
});
