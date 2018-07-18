export function mapish(shape) {
  return (
    typeof shape.keys === 'function' &&
    typeof shape.values === 'function' &&
    typeof shape.entries === 'function' &&
    shape[Symbol.iterator]
  );
}
