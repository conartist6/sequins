function forEach(func, iterable) {
  let c = 0;
  for (const item of iterable) {
    const ret = func(item, c++);

    if (ret === false) {
      break;
    }
  }
  return c;
}

export default function curriedForEach(func, iterable) {
  if (!iterable) {
    return iterable => forEach(func, iterable);
  }
  return forEach(func, iterable);
}
