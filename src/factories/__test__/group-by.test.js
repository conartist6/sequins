import { SetSeq } from "../../index";
import { Namespace as Collection } from "../../collection";
import makeGroupBy from "../group-by";

function makeTests(type, collectionSubtype) {
  const CollectionConstructor = Collection[collectionSubtype][type];
  const KeyedCollectionConstructor = Collection[collectionSubtype].Keyed;

  describe(CollectionConstructor.name, function() {
    it("works", function() {
      const grouped = new CollectionConstructor(
        new SetSeq([1, 2, 3, 4])
      ).groupBy(v => v % 2);
      expect(grouped).toEqual(
        new KeyedCollectionConstructor([
          [1, new CollectionConstructor(new SetSeq([1, 3]))],
          [0, new CollectionConstructor(new SetSeq([2, 4]))]
        ])
      );
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
