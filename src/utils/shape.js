// '@@__IMMUTABLE_ITERABLE__@@';
// '@@__IMMUTABLE_KEYED__@@';
// '@@__IMMUTABLE_INDEXED__@@';
// '@@__IMMUTABLE_ORDERED__@@';
// '@@__IMMUTABLE_RECORD__@@';

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
