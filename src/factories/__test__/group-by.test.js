import { IndexedSequence, KeyedSequence, SetSequence, List, Map, Set } from '../..';
import { Namespace as Collection } from '../../collection';

function makeTests(CollectionConstructor, collectionType, collectionSubtype) {
  const KeyedCollectionConstructor = Collection[collectionType].Keyed;

  describe(`${CollectionConstructor.name}.groupBy`, function() {
    it('works', function() {
      const grouped = new CollectionConstructor(new SetSequence([1, 2, 3, 4])).groupBy(
        (v: number) => v % 2,
      );
      expect(grouped).toEqual(
        new KeyedCollectionConstructor([
          [1, new CollectionConstructor(new SetSequence([1, 3]))],
          [0, new CollectionConstructor(new SetSequence([2, 4]))],
        ]),
      );
    });
  });
}

makeTests(SetSequence, 'Sequence', 'Duplicated');
makeTests(IndexedSequence, 'Sequence', 'Indexed');
makeTests(KeyedSequence, 'Sequence', 'Keyed');
makeTests(Set, 'Concrete', 'Duplicated');
makeTests(List, 'Concrete', 'Indexed');
makeTests(Map, 'Concrete', 'Keyed');
