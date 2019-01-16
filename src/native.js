const _global = typeof window !== 'undefined' ? window : global;

const Map = _global.Map;
const Set = _global.Set;

export { Map as NativeMap, Set as NativeSet };
