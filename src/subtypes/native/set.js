import { NativeCollectionMixin, Namespace } from '../../collection-native';
import { DuplicatedMixin } from '..';
import { isKeyed } from '../../utils/shape';

export class TranspiledSet extends Set {}

export default class SequinsSet extends DuplicatedMixin(NativeCollectionMixin(TranspiledSet)) {
    constructor(iterable) {
        super(iterable && isKeyed(iterable) ? iterable.values() : iterable);
    }

    toSet() {
        return this;
    }
}

Namespace.__register('Set', SequinsSet);
