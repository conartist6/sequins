export function ensureArray(iterable) {
  return Array.isArray(iterable) ? iterable : Array.from(iterable);
}
