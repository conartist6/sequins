export default function forEach(func, iterable) {
  let c = 0;
  for (const item of iterable) {
    const ret = func(item, c++);

    if (ret === false) {
      break;
    }
  }
  return c;
}
