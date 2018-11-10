import invariant from 'invariant';

class Namespace {
  get __description() {
    return 'namespace';
  }

  __get(key) {
    const _key = `_${key}`;
    invariant(
      this.hasOwnProperty(_key),
      'Tried to access member %s of %s, but no such member was registered yet. The module include order was likely wrong.',
      key,
      this.__description,
    );
    return this[_key];
  }
}

export class RootNamespace extends Namespace {
  get __description() {
    return 'the root namespace';
  }

  __register(collectionType, NestedNamespace) {
    return (this[`_${collectionType}`] = NestedNamespace);
  }

  get Concrete() {
    return this.__get('Concrete');
  }

  get Sequence() {
    return this.__get('Sequence');
  }
}

export class SubtypeNamespace extends Namespace {
  __register(collectionSubtype, CollectionConstructor) {
    return (this[`_${collectionSubtype}`] = CollectionConstructor);
  }

  get Duplicated() {
    return this.__get('Duplicated');
  }
  get Indexed() {
    return this.__get('Indexed');
  }
  get Keyed() {
    return this.__get('Keyed');
  }
}
