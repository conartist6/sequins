import { SetSequence, IndexedSequence, KeyedSequence } from '..';
import makeTestMethod from './helpers/make-test-method';
import testDataBySubtype from './data';

function makeTests(SequenceConstructor, collectionType, collectionSubtype) {
  const { array, calls } = testDataBySubtype[collectionSubtype];

  describe(SequenceConstructor.name, function() {
    let sequence: SequenceConstructor<number, number>;

    const testMethod = makeTestMethod(SequenceConstructor);

    it('can be consumed multiple times', function() {
      sequence = new SequenceConstructor(array).map(_ => _);
      expect(Array.from(sequence)).toEqual(array);
      expect(Array.from(sequence)).toEqual(array);
    });

    describe('instance methods', function() {
      beforeEach(() => {
        sequence = new SequenceConstructor(array);
      });

      // This creates duplicate keys/values, which is expected even for Keyed and Set Seqs
      testMethod('concat', mt => {
        mt.expectCollectionYields([...array, ...array]) //
          .run(() => sequence.concat(array));
      });

      testMethod('tap', mt => {
        mt.callback(() => null, calls)
          .expectCollectionYields(array)
          .run(tapFn => sequence.tap(tapFn));
      });
    });
  });
}

makeTests(SetSequence, 'Sequence', 'Duplicated');
makeTests(IndexedSequence, 'Sequence', 'Indexed');
makeTests(KeyedSequence, 'Sequence', 'Keyed');
