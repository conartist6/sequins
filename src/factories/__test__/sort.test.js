import { SetSeq } from "../../index";
import { Namespace as Collection } from "../../collection";
import makeGroupBy from "../group-by";

function makeTests(type, collectionSubtype) {
  const CollectionConstructor = Collection[collectionSubtype][type];
  const KeyedCollectionConstructor = Collection[collectionSubtype].Keyed;

  describe(CollectionConstructor.name, function() {
    it("sort works", function() {
      const collection = new CollectionConstructor(new SetSeq([3, 2, 4, 1]));
      collection.sort();
      expect(Array.from(collection.toSetSeq())).toEqual([1, 2, 3, 4]);
    });

    it("sortBy works", function() {
      const v1 = { value: 1 };
      const v2 = { value: 2 };
      const v3 = { value: 3 };
      const v4 = { value: 4 };
      const collection = new CollectionConstructor(
        new SetSeq([v3, v2, v4, v1])
      );
      collection.sortBy(item => item.value);
      expect(Array.from(collection.toSetSeq())).toEqual([v1, v2, v3, v4]);
    });
  });
}

describe("groupBy", function() {
  makeTests("Indexed", "Sequence");
  makeTests("Keyed", "Sequence");
  makeTests("Set", "Sequence");
  makeTests("Indexed", "Concrete");
  makeTests("Keyed", "Concrete");
  makeTests("Set", "Concrete");
});
