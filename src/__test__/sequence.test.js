import "../index";
import { Namespace as Collection } from "../collection";
import makeTestMethod from "./helpers/make-test-method";
import testDataBySubtype from "./data";

function makeTests(collectionSubtype) {
  const CollectionConstructor = Collection.Sequence[collectionSubtype];

  const testData = testDataBySubtype[collectionSubtype];

  describe(`Sequence.${collectionSubtype}`, function() {
    let collection;

    const testMethod = makeTestMethod(CollectionConstructor);

    describe("instance methods", function() {
      beforeEach(() => {
        collection = new CollectionConstructor(testData.array);
      });

      // This creates duplicate keys/values, which is expected even for Keyed and Set Seqs
      testMethod("concat")
        .run(() => collection.concat(testData.array))
        .expectCollectionYields([...testData.array, ...testData.array]);
    });
  });
}

makeTests("Indexed");
makeTests("Keyed");
makeTests("Set");
