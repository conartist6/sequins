import '../index';
import { Namespace as Collection } from '../collection';
import makeTestMethod from './helpers/make-test-method';
import testDataBySubtype from './data';

function makeTests(collectionSubtype) {
  const Sequence = Collection.Sequence[collectionSubtype];

  const { array, calls } = testDataBySubtype[collectionSubtype];

  describe(Sequence.name, function() {
    let sequence;

    const testMethod = makeTestMethod(Sequence);

    describe('instance methods', function() {
      beforeEach(() => {
        sequence = new Sequence(array);
      });

      // This creates duplicate keys/values, which is expected even for Keyed and Set Seqs
      testMethod('concat', t => {
        t.run(() => sequence.concat(array));
        t.expectCollectionYields([...array, ...array]);
      });

      testMethod('tap', t => {
        t.callback(() => null, calls);
        t.run(tapFn => sequence.tap(tapFn));
        t.expectCollectionYields(array);
      });
    });
  });
}

makeTests('Duplicated');
makeTests('Indexed');
makeTests('Keyed');
