export function keyFromInst() {}

export default Object.freeze({
  Indexed: {
    nativeSet: (array, key, value) => (array[key] = value),
    nativeSize: array => array.length,
    itemKey: (item, i) => i,
    itemValue: item => item,
    primitiveIterator: collection => collection.values(),
  },
  Keyed: {
    nativeSet: (map, key, value) => map.set(key, value),
    nativeSize: map => map.size,
    itemKey: item => item[0],
    itemValue: item => item[1],
    primitiveIterator: collection => collection.entries(),
  },
  Set: {
    nativeSet: (set, key, value) => set.set(key, value),
    nativeSize: set => set.size,
    itemKey: item => item,
    itemValue: item => item,
    primitiveIterator: collection => collection.values(),
  },
});
