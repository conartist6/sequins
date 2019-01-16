# Sequins

Sequins provides a core mutable data structures for javascript using the rich and proven API developed by [Immutable.js](http://facebook.github.io/immutable-js/) (with [a few tweaks](#differences-from-immutable)).

Sequins is inspired by and powered by [iter-tools](https://github.com/sithmel/iter-tools#readme)

[![Build Status](https://travis-ci.org/conartist6/sequins.svg?branch=master)](https://travis-ci.org/conartist6/sequins)
[![npm version](https://img.shields.io/npm/v/sequins.svg)](https://www.npmjs.com/package/sequins)

## Install

```
  npm install --save sequins
```

OR

```
  yarn add sequins
```

Sequins does not yet support being included outside of a module system.

**IMPORTANT NOTE**: Sequins is an es6 library. It depends on working implementations of several es6 features,
including `Map`, `Set` `Array.from` and `Symbol.iterator`. The easiest way to set these up is using
[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill).

## Status

This project is in alpha. It is not ready for production usage and should be expected to contain omissions and bugs.

### Project milestones:

    Name chosen and registered on npm: 6/14/18
    First npm version that isn't broken: 9/9/18
    Documentation website go-live: 10/15/18
    Typescript defs tested: 1/15/19
    Flow defs tested: ---
    First production usage: ---
    Immutable recognizes Sequins data types: ---
    1.0: ---

## API Documentation

https://conartist6.github.io/sequins/

## Why Sequins? A.K.A. A Brief History of (javascript) Time

In the beginning, there were turtles all the way down. Wait, no. There were Objects. Objects sucked for storing data, because they could only use string keys, it was possible to have collisions between data and prototype methods, and fixing that problem forced you to give up the entire prototype. It took O(n) time to know the amount data stored in one. It was not suitable for them to implement the Iterable protocol.

And so ES6 added the `Map` and `Set` core data types to javascript, fixing all these problems in one go. These structures also make it possible, easy even, to reflectively differentiate between data, classes, and class instances. Great! The only downside is that they lack the kind of toolbox that javascript programmers have become quite used to having with Arrays.

Enter: Sequins. Sequins, by way of the Immutable.js API, offers the benefits of `Map` and `Set` along with the most important common functionality which programmers expect

-   **Sorting**: Sequins includes the `stable` npm module for doing stable sorts.
-   **Functional programming**: Sequins includes a full suite of functional programming methods, including of course the common ones: `map`, `filter`, and `reduce`.
-   **Type coercion**: Sequins makes it super easy to convert between its data types!
-   **Work with objects, if you need!**: `Seq({foo: 1}).map(x => ++x).toObject() // {foo: 2}`
-   **group, flatten**: When you need them, do you really want to dig out lodash? Bonus: `reverse`!
-   **Derive classes**: Extending Map and Set is part of es6, yet the pattern cannot be transpiled to es5. Sequins classes can always be safely extended.

## Differences from Immutable

-   **Classes not Factory functions** The only factory function in Sequins is `Seq`. The rest of Sequins' types are classes, which means they must that you must use the `new` keyword to construct them. It also means that `instanceof` checks are possible, **however** using instanceof is not considered idiomatic, and it is preferred to use the static methods such as `isMap(shape)`.

-   **as**: Sequins structures lack several of the conversion methods provided by Immutable: `toList`, `toMap`, `toSet`, `toIndexedSeq`,
    `toKeyedSeq`, `toSetSeq`, `toObject`, and `toArray`. Instead there is a single method, `as`, which replaces all of them. Examples of its usage look like: `mySet.as(List)` or `myMap.as(Array)`.

-   **forEach**: Sequins `forEach` instance method matches the es6 spec precisely. It has no return value. It also is eager, which means that calling it on a seqence triggers evaluation of that sequence. If you want a method which is not eager and returns the collection for further chaining, use `tap`.

-   **Unordered types**: All Sequins types are ordered because the native data structures which underly them preserve ordering without additional work.

-   **Iterator methods return sequences:** The `keys` `values` and `entries` methods of Sequins structures return sequences! This is possible because those methods are meant to return iterables, which Sequences are. This means that Sequins does not need separate `keySeq`, `valueSeq` or `entrySeq` methods. Note that in immutable those methose return IndexedSeq, while Seqins `keys`, `values`, and `entries` return `SetSequence`.

-   **No reverse iteration**: Sequins `Map` and `Set` lack `last`, `findLast`, `takeLast`, and `reduceRight`. This is because Sequins uses native data structures, and native data structure ordering is only accessible as an iterator. In other words to get or find the last item requires iterating through every other item, which is not what the programmer expects from a performance perspective.

-   **No records**: I see no reason to support Records, which were mostly an attempt to fill in for the convenience of using objects. Just use objects.

-   **No getIn/setIn/updateIn**: These helpers existed to work around immutability for easily updating deep inside nested structures. Sequins does not have this need.

-   **Sequence get**: In Immutable you can use `get` on sequences. In Sequins, you cannot.

-   **Eager operations on sequences**: In Immutable, Sequences are lazy, except when certain operations like `sort` or `groupBy` are performed, which immediately evaluate the sequence and cache all the data. These operations in Sequins are still forced to cache data, but they don't force evaluation of the sequence, and the cache must be rebuilt each time the sequence is evaluated.

-   **delete**: In Sequins the delete operation does not return the collection. It follows the es6 spec, which indicates that the method should return whether or not the key whose deletion was requested existed.

-   **Sequence transforms**: In Immutable transform callbacks generally receive three arguments. `map`, for example, receives `(value, key, collection)`. In Sequins, the `collection` argument is omitted if the transform is done on a sequence.
