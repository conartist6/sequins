## Sequins Architecture Documentation

The purpose of this file is to give the highest level details of Sequins architecture, as well as terminology and documentation of the most important design decisions underlying the project and the reasons for them. It should be the jumping off point for what any developers new to the code need to know to understand what they are looking at!

## Terminology

-   **Shape**: A thing of some kind, particularly when we do not know what kind of thing it is.

-   **Data Structure**: A known class or primitive whose sole purpose is to store data.

-   **Fancy Data Structure**: A data structure which implements the Immutable js API.

-   **Modern Data Structure**: Either es6 Map or Set (or derivate thereof), or a fancy data structure

-   **Collection**: Collection is the abstract base from which all of Sequins' data structures derive. Collection may be used as a true base class or as a mixin. Collection is also the root namespace. Collection lives in 'collection-mixin.js'. All collections (and thus all Sequins types) are iterable. In the immutable codebase Collection has the same meaning, though there it really is always a true base class.

-   **Namespace**: It is neccessary for code reuse and testing to structure the library in formal manner at runtime, and that manner is namespaces. Namespaces are registries of classes which derive from them. There are three main namespaces: `Collection`, `Collection.Sequence`, and `Collection.Concrete`. An example of something in the concrete namespace is `Collection.Concrete.Keyed`.

-   **Concrete**: Concrete is a namespace, as well as being a member of the Collection namespace. Concrete classes derive from Collection and ConcreteCollection. Concrete data structures store their own data. Transforms like `map` and `filter`, when run on concrete types, return a new instance of their type. Concrete types are not subclasses of native types (es6 `Map` and `Set`), but in the future the native collection type/namespace will be available. Concrete-ish refers to either a concrete or native collection.

-   **Sequence**: Sequence is a namespace, and a member of the Collection namespace. Sequence classes derive from Collection and Sequence. Sequences are basically just syntactic sugar for creating iterables. This means they share the proprties of iterables: they may be infinite in size, they are evaluated item-by-item at the time of their usage as opposed to the time of their creation. They consist primarily of a reference to a source iterable and an array of transforms, each of which is a function which takes an iterable and returns an iterable. The transform implementations are largely defined by `iter-tools`. Sequences are mutable also, which is to say that evaluating a sequnce more than once may have different results if the source iterable has changed. It may also not be possible to evaluate a sequence more than once if it is not possible to evaluate its source iterable more than once.

-   **Collection Type**: `collectionType` is the variable use to store either the string `'Concrete'` or the string `'Sequence'`, when the value will later be used to access a member of the Collection namespace.

-   **Collection Subtype**: The three subtypes are **Indexed**, **Keyed**, and **Set**. Their semantics are taken, unchanged, from Immutable. All collections have some primitive representation of their data (used to construct them), as well as some form of keys and values. In a Keyed Collection the primitive representation of the data is an entry list, which is familiar if you have declared an es6 `Map` literal. An entry is a "tuple", an array of size two where the structure is `[key, value]`. Neither Indexed nor Set Collections use entries, since normal arrays are sufficient to express their primitive data. Set Collections reuse the value of each item as its key, while Indexed Collections use the index of each element in the array as its key.
    `collectionSubtype` is the variable which will be used to store one of the strings `'Indexed'`, `'Keyed'`, or `'Set'` when the value will later be used to access a member of a collection types' namespace.

-   **Method Factory**: Many methods need slightly different implementations to work on any of the many collection types and subtypes. Such methods are given implementations which live in the `factory` folder. The method factory is passed the Collection namespace, as well as `collectionType` and `collectionSubtype` for which it should produce a method, and the result (the method) is memoized. With all the reflective tools at their disposal, the factories are able to write an implementation that shares as much or as little code as is neccesary.

## File tree structure

```
sequins/
│
├── factories/      Method factories
│
├── functions/
│
├── subtypes/
│
├── utils/
│
└── ARCHITECTURE.md  // YOU ARE HERE
```

## Major decisions

-   **Avoid circular dependencies**: Initially I tried to embrace some circular dependencies in a structured fashion. This experiment failed. In order to eliminate circular deps I created namespaces and forced subclasses to register themselves. By eliminating the need of base classes to import thier subclasses, the dependency loops were broken.

-   **Don't extend native data sturctures**: There were several reasons that I chose not to extend native Map and Set. Firstly, it would have needed to be inconsistent, because I think subclassing Array would be a bad choice. Array has a full API of its own, and any inconsistencies would be glaringly obvious. It also serves as the most fundamental underlying primative type for literals. Secondly IE 11 is still supported for a while, and does not support extending native types. Finally, Immutable, which which this project hopes to achieve relative parity, does not extend native data types. I did however leave the door open to publishing a separate package which uses this library's mixins to create types which extend native ones. For a fuller explanation of all the semantics involved, take a look at [this article](http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/).


