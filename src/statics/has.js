import { isModernDataStructure, isDataStructure } from '../utils/shape';

export default function has(shape, key) {
  if (shape == null) {
    return false;
  } else if (isModernDataStructure(shape)) {
    return shape.has(key);
  } else if (Array.isArray(shape)) {
    return key < shape.length;
  }
  return Object.prototype.hasOwnProperty.call(shape, key);
}
