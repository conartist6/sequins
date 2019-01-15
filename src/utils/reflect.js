export default Object.freeze({
  Duplicated: {
    NativeConstructor: Set,
    itemValue: item => item,
    primitiveIterator: collection => collection.values(),
  },
  Indexed: {
    NativeConstructor: Array,
    itemValue: item => item,
    primitiveIterator: collection => collection.values(),
  },
  Keyed: {
    NativeConstructor: Map,
    itemValue: item => item[1],
    primitiveIterator: collection => collection.entries(),
  },
});
