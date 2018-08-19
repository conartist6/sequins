import makeTestMethod from './helpers/make-test-method';
import IndexedSeq from '../subtypes/sequence/indexed';
import KeyedSeq from '../subtypes/sequence/keyed';
import SetSeq from '../subtypes/sequence/set';
import testDataByType from './data';

function makeTests(CollectionConstructor, type, description) {
  const testData = testDataByType[type];

  describe(description, function() {
    let collection;

    const testMethod = makeTestMethod(CollectionConstructor);

    beforeEach(() => {
      collection = new CollectionConstructor(testData.array);
    });

    // This creates duplicate keys/values, which is expected even for Keyed and Set Seqs
    testMethod('concat')
      .run(() => collection.concat(testData.array))
      .expectCollectionYields([...testData.array, ...testData.array]);
  });
}

makeTests(IndexedSeq, 'Indexed', 'IndexedSequence');
makeTests(KeyedSeq, 'Keyed', 'KeyedSequence');
makeTests(SetSeq, 'Set', 'SetSequence');
