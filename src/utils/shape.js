export function isKeyed(shape) {
  return shape instanceof Map || shape['@@__IMMUTABLE_KEYED__@@'];
}

export function isSet(shape) {
  return (
    shape instanceof Set ||
    (shape['@@__IMMUTABLE_ITERABLE__@@'] && !shape['@@__IMMUTABLE_KEYED__@@'])
  );
}

export function isIndexed(shape) {
  return Array.isArray(shape) || shape['@@__IMMUTABLE_INDEXED__@@'];
}

export function isIteratorish(shape) {
  return !!shape && typeof shape.next === 'function';
}
