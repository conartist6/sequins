export default function forEach(func, iterable) {
  let c = 0;
  for (const item of iterable) {
    func(item, c++);
  }
  return iterable;
}
