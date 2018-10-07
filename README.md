# Sequins

Sequins provides a core mutable data structures for javascript using the rich and proven API developed by [Immutable.js](http://facebook.github.io/immutable-js/) (with [a few tweaks](#differences-from-immutable)).

Sequins is inspired by and powered by [iter-tools](https://github.com/sithmel/iter-tools#readme)

## Install

```
  npm install --save sequins
```

OR

```
  yarn add sequins
```

Sequins does not yet support being included outside of a module system.

**IMPORTANT NOTE**: Sequins depends on a working implementation of Map and Set. If you need to support browsers which lack some or all of the implementation, it is your responsibility to setup `core-js`.

## Status

This project is in alpha. It is not ready for production usage and should be expected to contain (many) omissions and bugs.

### Project milestones:

    Name chosen and registered on npm: 6/14/18
    First npm version that isn't broken: 9/9/18
    First production usage: ---
    Immutable recognizes Sequins data types: ---
    1.0: ---

## API Documentation

This does not exist yet. Want to help me build it? For now you can look at [the Immutable docs](http://facebook.github.io/immutable-js/docs/#/) and Sequins' [differences from Immutable](#differences-from-immutable). Undocumented parity failures should be considered bugs.

## Why Sequins? A.K.A. A Brief History of (javascript) Time

In the beginning, there were turtles all the way down. Wait, no. There were Objects. Objects sucked for storing data, because they could only use string keys, it was possible to have collisions between data and prototype methods, and fixing that problem forced you to give up the entire prototype. It took O(n) time to know the amount data stored in one. It was not suitable for them to implement the Iterable protocol.

And so ES6 added the `Map` and `Set` core data types to javascript, fixing all these problems in one go. These structures also make it possible, easy even, to reflectively differentiate between data, classes, and class instances. Great! The only downside is that they lack the kind of toolbox that javascript programmers have become quite used to having with Arrays.

Enter: Sequins. Sequins, by way of the Immutable.js API, offers the benefits of `Map` and `Set` along with the most important common functionality which programmers expect

-   **Sorting**: Sequins includes the `stable` npm module for doing stable sorts.
-   **Functional programming**: Sequins includes a full suite of functional programming methods, including of course the common ones: `map`, `filter`, and `reduce`.
-   **Type coercion**: Sequins makes it super easy to convert between its data types!
-   **Work with objects, if you need!**: `Seq({foo: 1}).map(x => ++x).toObject() // {foo: 2}`
-   **group, flatten**: When you need them, do you really want to dig out lodash? Bonus: `reverse`!

## Differences from Immutable

-   **new** `List`, `Map` and `Set` are classes in Sequins, not factory functions as in Immutable. Thes means that you must use the `new` keyword to construct them. It also means that `instanceof` checks are possible, **however** using instanceof is not considered idiomatic, and it is preferred to use the static methods such as `Sequins.isMap(shape)`.

-   **Unordered types**: All Sequins types are ordered because the native data structures which underly them preserve ordering without additional work.

-   **No getIn/setIn/updateIn**: These helpers existed to work around immutability for easily updating deep inside nested structures. Sequins does not have this need.

-   **Sequence get**: In Immutable you can still use get on sequences. In Sequins, you cannot.

-   **Eager operations on sequences**: In Immutable, Sequences are lazy, except when certain operations like `sort` or `groupBy` are performed, which immediately evaluate the sequence and cache all the data. These operations in Sequins are still forced to cache data, but they don't force evaluation of the sequence, and the cache must be rebuilt each time the sequence is evaluated.

-   **Sequence locking**: Sequences in Sequins are mutable like Sequins data structures, meaning that transforms on them generally return the same sequence object to be used for further chaining. Sequence transforms which return a sequence of a different type, however, obviously cannot return the same object. In order to avoid confusion these operations "lock" the former sequence to further transformation. This ensures that any operations designed to derive multiple sequences from a single base sequence must be explicit.

-   **delete**: In Sequins the delete operation does not return the collection. It follows the es6 spec, which indicates that the method should return whether or not the key whose deletion was requested existed.

-   **Sequence transforms**: In Immutable transform callbacks generally receive three arguments. `map`, for example, receives `(value, key, collection)`. In Sequins, the `collection` argument is omitted if the transform is done on a sequence.
