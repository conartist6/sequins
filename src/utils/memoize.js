function makeKey(collectionSubtype, collectionType) {
  return `${collectionSubtype}__${collectionType}`;
}

export function memoizeFactory(factory) {
  const results = Object.create(null);

  return function memoizedFactory(Collection, ...dynamicArgs) {
    const key = makeKey(...dynamicArgs);
    if (!results[key]) {
      results[key] = factory(Collection, ...dynamicArgs);
    }
    return results[key];
  };
}
