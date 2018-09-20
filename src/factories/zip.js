import { zip as zipIterables } from 'iter-tools';
import { memoizeFactory } from '../utils/memoize';

function makeZip(Collection, collectionType, collectionSubtype) {
  const SequenceConstructor = Collection.Sequence[collectionSubtype];

  return function zip(iterable, ...iterables) {
    return zipIterables(iterable, ...iterables.map(iterable => new SequenceConstructor(iterable)));
  };
}

export default memoizeFactory(makeZip);
