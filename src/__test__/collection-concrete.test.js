import makeTestMethod from "./helpers/make-test-method";
import { IndexedSeq, KeyedSeq, SetSeq, List, Map, Set } from "../index";
import { Namespace as Collection } from "../collection";
import makeFlatten from "../factories/flatten";
import testData from "./data";

function makeTests(collectionSubtype) {
  const CollectionConstructor = Collection.Concrete[collectionSubtype];

  describe(CollectionConstructor.name, function() {
    let collection;

    const { keys, values, entries, calls, array, object, js } = testData[
      collectionSubtype
    ];

    const testMethod = makeTestMethod(CollectionConstructor);

    describe("instance methods", function() {
      beforeEach(() => {
        collection = new CollectionConstructor(array);
      });

      it("has size", function() {
        expect(collection.size).toBe(array.length);
      });
    });
  });
}

makeTests("Indexed");
makeTests("Keyed");
makeTests("Set");