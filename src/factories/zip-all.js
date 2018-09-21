import zipAllIterables from 'iter-tools/es5/zip-all';
import { memoizeFactory } from '../utils/memoize';

function makeZipAll(Collection, collectionType, collectionSubtype) {
    const SequenceConstructor = Collection.Sequence[collectionSubtype];

    return function zipAll(iterable, ...iterables) {
        return zipAllIterables(
            iterable,
            ...iterables.map(iterable => new SequenceConstructor(iterable)),
        );
    };
}

export default memoizeFactory(makeZipAll);
