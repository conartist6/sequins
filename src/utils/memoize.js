import memoize from 'memoizee';

export function memoizeFactory(factory) {
  //const normalizeFn = factory.length > 0 ? collectionType => collectionType : () => null;
  //return memoize(factory, normalizeFn);
  return memoize(factory);
}
