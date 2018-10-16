import range from "iter-tools/es5/range";
import IndexedSeq from "../subtypes/sequence/indexed";

export default function Range(start = 0, end = Infinity, step = 1) {
  return new IndexedSeq(range({ start, step, end }));
}
