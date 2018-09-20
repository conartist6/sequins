import { concat as concatIterables } from 'iter-tools';
import { memoizeFactory } from '../utils/memoize';

function makeConcat(Collection, collectionType, collectionSubtype) {
  const SequenceConstructor = Collection.Sequence[collectionSubtype];

  return function concat(iterable, ...iterables) {
    return concatIterables(
      iterable,
      ...iterables.map(iterable => new SequenceConstructor(iterable)),
    );
  };
}

export default memoizeFactory(makeConcat);
