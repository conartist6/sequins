export function* reverseArrayIterator(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    yield array[i];
  }
}
