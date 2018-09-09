export function isImmutableCollection(shape) {
  return !!shape['@@__IMMUTABLE_ITERABLE__@@'];
}

export function isImmutableRecord(shape) {
  return !!shape['@@__IMMUTABLE_RECORD__@@'];
}

export function isImmutableSequence(shape) {
  return !!shape['@@__IMMUTABLE_SEQUENCE__@@'];
}

export function isImmutableConcrete(shape) {
  return isImmutable(shape) && !isImmutableSequence(shape);
}

export function isImmutable(shape) {
  return isImmutableCollection(shape) || isImmutableRecord(shape);
}

export function isMutableCollection(shape) {
  return !!shape['@@__MUTABLE_ITERABLE__@@'];
}

export function isMutableSeq(shape) {
  return !!shape['@@__MUTABLE_SEQUENCE__@@'];
}

export function isCollection(shape) {
  return isImmutableCollection(shape) || isMutableCollection(shape);
}

export function isNative(shape) {
  return isNativeKeyed(shape) || isNativeSet(shape);
}

// Impl. borrowed from immutable, Copyright (c) 2014-present, Facebook, Inc.
export function isPlainObj(shape) {
  return shape.constructor === Object || shape.constructor === undefined;
}

export function isDataStructure(shape) {
  return (
    isFancyDataStructure(shape) || isNative(shape) || Array.isArray(shape) || isPlainObj(shape)
  );
}

export function isFancyDataStructure(shape) {
  return isMutableCollection(shape) || isImmutable(shape);
}

export function isModernDataStructure(shape) {
  return isFancyDataStructure(shape) || isNative(shape);
}

export function isSeq(shape) {
  return isMutableSeq(shape) || isImmutableSequence(shape);
}

export function isMutableConcrete(shape) {
  return !!shape['@@__MUTABLE_ITERABLE__@@'] && !shape['@@__MUTABLE_SEQUENCE__@@'];
}

export function isConcrete(shape) {
  return isMutableConcrete(shape) || isImmutableConcrete(shape) || isNative(shape);
}

export function collectionType(shape) {
  if (isIndexed(shape)) {
    return 'Indexed';
  } else if (isKeyed(shape)) {
    return 'Keyed';
  } else {
    return 'Set';
  }
  return null;
}

// Indexed, Keyed, Set

export function isImmutableIndexed(shape) {
  return !!shape['@@__IMMUTABLE_INDEXED__@@'];
}
export function isImmutableKeyed(shape) {
  return !!shape['@@__IMMUTABLE_KEYED__@@'];
}

export function isNativeSet(shape) {
  return shape instanceof Set;
}
export function isNativeKeyed(shape) {
  return shape instanceof Map;
}

export function isMutableIndexed(shape) {
  return !!shape['@@__MUTABLE_INDEXED__@@'];
}
export function isMutableKeyed(shape) {
  return !!shape['@@__MUTABLE_KEYED__@@'];
}
export function isMutableAssociative(shape) {
  return isMutableIndexed(shape) || isMutableKeyed(shape);
}

export function isMutableIndexedSeq(shape) {
  return isMutableSeq(shape) && isMutableIndexed(shape);
}
export function isMutableKeyedSeq(shape) {
  return isMutableSeq(shape) && isMutableKeyed(shape);
}

export function isConcreteIndexed(shape) {
  return isConcrete(shape) && isIndexed(shape);
}
export function isConcreteKeyed(shape) {
  return isConcrete(shape) && isKeyed(shape);
}

export function isIndexed(shape) {
  return Array.isArray(shape) || isMutableIndexed(shape) || isImmutableIndexed(shape);
}
export function isKeyed(shape) {
  return isNativeKeyed(shape) || isMutableKeyed(shape) || isImmutableKeyed(shape);
}
