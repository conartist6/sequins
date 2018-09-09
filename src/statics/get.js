import { isModernDataStructure } from '../utils/shape';
import has from './has';

export default function get(shape, key, defaultValue) {
  if (shape == null) {
    return false;
  } else if (isModernDataStructure(shape)) {
    return shape.get(key, defaultValue);
  }
  return !has(shape, key) ? defaultValue : shape[key];
}
