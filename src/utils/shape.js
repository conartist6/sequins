function isImmutable(shape) {
  return !!shape['@@__IMMUTABLE_ITERABLE__@@'];
}

function isImmutableIndexed(shape) {
  return !!shape['@@__IMMUTABLE_INDEXED__@@'];
}

function isImmutableKeyed(shape) {
  return !!shape['@@__IMMUTABLE_KEYED__@@'];
}

function isImmutableSet(shape) {
  return isImmutable(shape) && !isImmutableIndexed(shape) && !isImmutableKeyed(shape);
}

function isNativeSet(shape) {
  return shape instanceof Set;
}

function isNativeKeyed(shape) {
  return shape instanceof Map;
}

function isNativeIndexed(shape) {
  return Array.isArray(shape);
}

export function isNative(shape) {
  return isNativeIndexed(shape) || isNativeKeyed(shape) || isNativeSet(shape);
}

// Impl. borrowed from immutable
export function isPlainObj(shape) {
  return shape && (shape.constructor === Object || shape.constructor === undefined);
}

export function isDataStructure(shape) {
  return isMutableSeq(shape) || isImmutable(shape) || isNative(shape) || isPlainObj(shape);
}

export function isMutableSeq(shape) {
  return !!shape['@@__MUTABLE_SEQUENCE__@@'];
}

export function isMutableIndexedSeq(shape) {
  return !!shape['@@__MUTABLE_INDEXED__@@'];
}

export function isMutableKeyedSeq(shape) {
  return !!shape['@@__MUTABLE_KEYED__@@'];
}

export function isMutableSetSeq(shape) {
  return isMutableSeq(shape) && !isMutableIndexedSeq(shape) && !isMutableKeyedSeq(shape);
}

export function isIndexed(shape) {
  return isNativeIndexed(shape) || isMutableIndexedSeq(shape) || isImmutableIndexed(shape);
}

export function isKeyed(shape) {
  return isNativeKeyed(shape) || isMutableKeyedSeq(shape) || isImmutableKeyed(shape);
}

export function isSet(shape) {
  return isNativeSet(shape) || isMutableSetSeq(shape) || isImmutableSet(shape);
}

export function isSeq(shape) {
  return !!shape['@@__MUTABLE_SEQUENCE__@@'] || !!shape['@@__IMMUTABLE_SEQ__@@'];
}

export function reflectionKey(shape) {
  if (isIndexed(shape)) {
    return 'Indexed';
  } else if (isKeyed(shape)) {
    return 'Keyed';
  } else if (isSet(shape)) {
    return 'Set';
  }
  return null;
}
