require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// TODO remove me when babel-plugin-add-module-exports works right
module.exports = require('./sequins').default;

},{"./sequins":2}],2:[function(require,module,exports){
(function (global){
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Seq = Seq;
exports.isCollection = isMutableCollection;
exports.isKeyed = isMutableKeyed;
exports.isIndexed = isMutableIndexed;
exports.isAssociative = isMutableAssociative;
exports.isSeq = isMutableSeq;
exports.isList = isMutableList;
exports.isMap = isMutableMap;
exports.isSet = isMutableSet;
exports.Range = Range;
exports.Repeat = Repeat;
exports.get = get;
exports.set = set;
exports.has = has;
exports.keys = keys$1;
exports.values = values;
exports.entries = entries$1;
exports.NativeSet = exports.NativeMap = exports.Set = exports.Map = exports.List = exports.SetSequence = exports.KeyedSequence = exports.IndexedSequence = exports.default = void 0;

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _invariant = _interopRequireDefault(require("invariant"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _concat2 = _interopRequireDefault(require("iter-tools/es5/concat"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _reduce = _interopRequireDefault(require("iter-tools/es5/reduce"));

var _stable = _interopRequireDefault(require("stable"));

var _zipAll = _interopRequireDefault(require("iter-tools/es5/zip-all"));

var _zip = _interopRequireDefault(require("iter-tools/es5/zip"));

var _size = _interopRequireDefault(require("iter-tools/es5/size"));

var _filter2 = _interopRequireDefault(require("iter-tools/es5/filter"));

var _keys = _interopRequireDefault(require("iter-tools/es5/keys"));

var _slice2 = _interopRequireDefault(require("iter-tools/es5/slice"));

require("iter-tools/es5/compose");

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _map2 = _interopRequireDefault(require("iter-tools/es5/map"));

var _tap2 = _interopRequireDefault(require("iter-tools/es5/tap"));

var _interpose2 = _interopRequireDefault(require("iter-tools/es5/interpose"));

var _range = _interopRequireDefault(require("iter-tools/es5/range"));

var _entries = _interopRequireDefault(require("iter-tools/es5/entries"));

var _flat = _interopRequireDefault(require("iter-tools/es5/flat"));

var _repeat = _interopRequireDefault(require("iter-tools/es5/repeat"));

function isImmutableCollection(shape) {
  return !!shape['@@__IMMUTABLE_ITERABLE__@@'];
}

function isImmutableRecord(shape) {
  return !!shape['@@__IMMUTABLE_RECORD__@@'];
}

function isImmutable(shape) {
  return isImmutableCollection(shape) || isImmutableRecord(shape);
}

function isMutableCollection(shape) {
  return !!shape['@@__MUTABLE_COLLECTION__@@'];
}

function isMutableSeq(shape) {
  return !!shape['@@__MUTABLE_SEQUENCE__@@'];
}

function isCollection(shape) {
  return isImmutableCollection(shape) || isMutableCollection(shape);
}

function isNative(shape) {
  return isNativeKeyed(shape) || isNativeSet(shape);
} // Impl. borrowed from immutable, Copyright (c) 2014-present, Facebook, Inc.


function isPlainObj(shape) {
  return !shape[Symbol.iterator] && shape.constructor === Object || shape.constructor === undefined;
}

function isDataStructure(shape) {
  return isFancyDataStructure(shape) || isNative(shape) || Array.isArray(shape) || isPlainObj(shape);
}

function isFancyDataStructure(shape) {
  return isMutableCollection(shape) || isImmutable(shape);
}

function isModernDataStructure(shape) {
  return isFancyDataStructure(shape) || isNative(shape);
}

function isMutableConcreteish(shape) {
  return !!shape['@@__MUTABLE_COLLECTION__@@'] && !shape['@@__MUTABLE_SEQUENCE__@@'];
}

function isMutableList(shape) {
  return isMutableConcreteish(shape) && isMutableIndexed(shape);
}

function isMutableMap(shape) {
  return isMutableConcreteish(shape) && isMutableKeyed(shape);
}

function isMutableSet(shape) {
  return isMutableConcreteish(shape) && !isMutableAssociative(shape);
}

function isImmutableIndexed(shape) {
  return !!shape['@@__IMMUTABLE_INDEXED__@@'];
}

function isImmutableKeyed(shape) {
  return !!shape['@@__IMMUTABLE_KEYED__@@'];
}

function isNativeSet(shape) {
  return shape instanceof Set;
}

function isNativeKeyed(shape) {
  return shape instanceof Map;
}

function isMutableIndexed(shape) {
  return !!shape['@@__MUTABLE_INDEXED__@@'];
}

function isMutableKeyed(shape) {
  return !!shape['@@__MUTABLE_KEYED__@@'];
}

function isMutableAssociative(shape) {
  return isMutableIndexed(shape) || isMutableKeyed(shape);
}

function isIndexed(shape) {
  return Array.isArray(shape) || isMutableIndexed(shape) || isImmutableIndexed(shape);
}

function isKeyed(shape) {
  return isNativeKeyed(shape) || isMutableKeyed(shape) || isImmutableKeyed(shape);
}

var Namespace =
/*#__PURE__*/
function () {
  function Namespace() {
    (0, _classCallCheck2.default)(this, Namespace);
  }

  (0, _createClass2.default)(Namespace, [{
    key: "__get",
    value: function __get(key) {
      var _key = "_".concat(key);

      (0, _invariant.default)(this.hasOwnProperty(_key), 'Tried to access member %s of %s, but no such member was registered yet. The module include order was likely wrong.', key, this.__description);
      return this[_key];
    }
  }, {
    key: "__description",
    get: function get() {
      return 'namespace';
    }
  }]);
  return Namespace;
}();

var RootNamespace =
/*#__PURE__*/
function (_Namespace) {
  (0, _inherits2.default)(RootNamespace, _Namespace);

  function RootNamespace() {
    (0, _classCallCheck2.default)(this, RootNamespace);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RootNamespace).apply(this, arguments));
  }

  (0, _createClass2.default)(RootNamespace, [{
    key: "__register",
    value: function __register(collectionType, NestedNamespace) {
      return this["_".concat(collectionType)] = NestedNamespace;
    }
  }, {
    key: "__description",
    get: function get() {
      return 'the root namespace';
    }
  }, {
    key: "Concrete",
    get: function get() {
      return this.__get('Concrete');
    }
  }, {
    key: "Sequence",
    get: function get() {
      return this.__get('Sequence');
    }
  }]);
  return RootNamespace;
}(Namespace);

var SubtypeNamespace =
/*#__PURE__*/
function (_Namespace2) {
  (0, _inherits2.default)(SubtypeNamespace, _Namespace2);

  function SubtypeNamespace() {
    (0, _classCallCheck2.default)(this, SubtypeNamespace);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SubtypeNamespace).apply(this, arguments));
  }

  (0, _createClass2.default)(SubtypeNamespace, [{
    key: "__register",
    value: function __register(collectionSubtype, CollectionConstructor) {
      return this["_".concat(collectionSubtype)] = CollectionConstructor;
    }
  }, {
    key: "Duplicated",
    get: function get() {
      return this.__get('Duplicated');
    }
  }, {
    key: "Indexed",
    get: function get() {
      return this.__get('Indexed');
    }
  }, {
    key: "Keyed",
    get: function get() {
      return this.__get('Keyed');
    }
  }]);
  return SubtypeNamespace;
}(Namespace);

function makeKey(collectionSubtype, collectionType) {
  return "".concat(collectionSubtype, "__").concat(collectionType);
}

function memoizeFactory(factory) {
  var results = Object.create(null);
  return function memoizedFactory(Collection) {
    for (var _len = arguments.length, dynamicArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      dynamicArgs[_key - 1] = arguments[_key];
    }

    var key = makeKey.apply(void 0, dynamicArgs);

    if (!results[key]) {
      results[key] = factory.apply(void 0, [Collection].concat(dynamicArgs));
    }

    return results[key];
  };
}

function makeConcat(Collection, collectionType, collectionSubtype) {
  var SequenceConstructor = Collection.Sequence[collectionSubtype];
  return function concat(iterable) {
    for (var _len = arguments.length, iterables = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      iterables[_key - 1] = arguments[_key];
    }

    return _concat2.default.apply(void 0, [iterable].concat((0, _toConsumableArray2.default)(iterables.map(function (iterable) {
      return new SequenceConstructor(iterable);
    }))));
  };
}

var concat$1 = memoizeFactory(makeConcat);
var reflect = Object.freeze({
  Duplicated: {
    NativeConstructor: Set,
    itemValue: function itemValue(item) {
      return item;
    },
    primitiveIterator: function primitiveIterator(collection) {
      return collection.values();
    }
  },
  Indexed: {
    NativeConstructor: Array,
    itemValue: function itemValue(item) {
      return item;
    },
    primitiveIterator: function primitiveIterator(collection) {
      return collection.values();
    }
  },
  Keyed: {
    NativeConstructor: Map,
    itemValue: function itemValue(item) {
      return item[1];
    },
    primitiveIterator: function primitiveIterator(collection) {
      return collection.entries();
    }
  }
});

function makeFlatten(Collection, collectionType$$1, collectionSubtype) {
  var _reflect$collectionSu = reflect[collectionSubtype],
      itemValue = _reflect$collectionSu.itemValue,
      primitiveIterator = _reflect$collectionSu.primitiveIterator;
  return (
    /*#__PURE__*/
    _regenerator.default.mark(function flatten(iterable) {
      var shallowOrDepth,
          depth,
          _iteratorNormalCompletion,
          _didIteratorError,
          _iteratorError,
          _iterator,
          _step,
          item,
          value,
          _args = arguments;

      return _regenerator.default.wrap(function flatten$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              shallowOrDepth = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              depth = Number(shallowOrDepth);
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 5;
              _iterator = iterable[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 23;
                break;
              }

              item = _step.value;
              value = itemValue(item);

              if (!(!value || !isMutableCollection(value))) {
                _context.next = 15;
                break;
              }

              _context.next = 13;
              return item;

            case 13:
              _context.next = 20;
              break;

            case 15:
              if (!(depth !== 1)) {
                _context.next = 19;
                break;
              }

              return _context.delegateYield(flatten(primitiveIterator(value), depth === 0 ? 0 : depth - 1), "t0", 17);

            case 17:
              _context.next = 20;
              break;

            case 19:
              return _context.delegateYield(primitiveIterator(value), "t1", 20);

            case 20:
              _iteratorNormalCompletion = true;
              _context.next = 7;
              break;

            case 23:
              _context.next = 29;
              break;

            case 25:
              _context.prev = 25;
              _context.t2 = _context["catch"](5);
              _didIteratorError = true;
              _iteratorError = _context.t2;

            case 29:
              _context.prev = 29;
              _context.prev = 30;

              if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
              }

            case 32:
              _context.prev = 32;

              if (!_didIteratorError) {
                _context.next = 35;
                break;
              }

              throw _iteratorError;

            case 35:
              return _context.finish(32);

            case 36:
              return _context.finish(29);

            case 37:
            case "end":
              return _context.stop();
          }
        }
      }, flatten, this, [[5, 25, 29, 37], [30,, 32, 36]]);
    })
  );
}

var flatten = memoizeFactory(makeFlatten);

function makePush(Collection, collectionType, collectionSubtype) {
  if (collectionSubtype === 'Indexed') {
    return function (collection, _, value) {
      return collection.push(value);
    };
  } else if (collectionSubtype === 'Keyed') {
    return function (collection, key, value) {
      return collection.set(key, value);
    };
  } else {
    return function (collection, _, value) {
      return collection.add(value);
    };
  }
}

var makePush$1 = memoizeFactory(makePush);
var reduceByType = {
  Duplicated: function reduce(iterable, reducer, initial) {
    var setReducer = function setReducer(acc, item) {
      return reducer(acc, item, item);
    };

    var reduced;

    if (arguments.length > 2) {
      reduced = (0, _reduce.default)(initial, setReducer, iterable);
    } else {
      reduced = (0, _reduce.default)(setReducer, iterable);
    }

    return reduced;
  },
  Indexed: function reduce(iterable, reducer, initial) {
    var reduced;

    if (arguments.length > 2) {
      reduced = (0, _reduce.default)(initial, reducer, iterable);
    } else {
      reduced = (0, _reduce.default)(reducer, iterable);
    }

    return reduced;
  },
  Keyed: function reduce(iterable, reducer, initial) {
    var invocations = 0;
    var hasInitial = arguments.length > 2;
    var reduced;

    var keyedReducer = function keyedReducer(acc, _ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      if (invocations++ === 0 && !hasInitial) {
        acc = acc[1];
      }

      return reducer(acc, value, key);
    };

    if (hasInitial) {
      reduced = (0, _reduce.default)(initial, keyedReducer, iterable);
    } else {
      reduced = (0, _reduce.default)(keyedReducer, iterable);
    }

    return reduced;
  }
};

function makeReduce(Collection, collectionType, collectionSubtype) {
  return reduceByType[collectionSubtype];
}

function makeGroupBy(Collection, collectionType, collectionSubtype) {
  var concreteType = collectionType === 'Sequence' ? 'Concrete' : collectionType;
  var CollectionConstructor = Collection[collectionType][collectionSubtype];
  var ConcreteCollectionConstructor = Collection[concreteType][collectionSubtype];
  var Map = Collection.Concrete.Keyed;
  var push = makePush$1.apply(void 0, arguments);
  var reduce = makeReduce.apply(void 0, arguments);
  return function groupBy(collection, grouper) {
    var map = reduce(collection, function (result, value, key) {
      var groupKey = grouper(value, key);

      if (!result.get(groupKey)) {
        var concrete = new ConcreteCollectionConstructor();
        result.set(groupKey, concrete);
      }

      push(result.get(groupKey), key, value);
      return result;
    }, new Map());
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = map.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;
        map.set(key, new CollectionConstructor(map.get(key)));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return map;
  };
}

var groupBy = memoizeFactory(makeGroupBy);

function ensureArray(iterable) {
  return Array.isArray(iterable) ? iterable : Array.from(iterable);
}

var defaultComparator = function defaultComparator(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
};

function makeSort(Collection, collectionType, collectionSubtype) {
  var _reflect$collectionSu = reflect[collectionSubtype],
      itemValue = _reflect$collectionSu.itemValue,
      NativeConstructor = _reflect$collectionSu.NativeConstructor;
  return function sort(inPlace, iterable, selector) {
    var comparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : defaultComparator;
    var array = ensureArray(iterable);
    var wrappedComparator = selector ? function (a, b) {
      return comparator(selector(itemValue(a)), selector(itemValue(b)));
    } : function (a, b) {
      return comparator(itemValue(a), itemValue(b));
    };

    if (inPlace) {
      _stable.default.inplace(array, wrappedComparator);
    } else {
      array = (0, _stable.default)(array, wrappedComparator);
    }

    if (collectionType === 'Sequence' || collectionSubtype === 'Indexed') {
      return array;
    }

    return new NativeConstructor(array);
  };
}

var sort = memoizeFactory(makeSort);

function makeToConcrete(Collection, collectionType, collectionSubtype) {
  var ConcreteConstructor = Collection.Concrete[collectionSubtype];
  return function toNative(value) {
    return new ConcreteConstructor(value);
  };
}

var toConcrete = memoizeFactory(makeToConcrete);

function makeToJS(Collection) {
  return function toJS(value) {
    return isDataStructure(value) ? Collection.Sequence.from(value).map(toJS).toJSON() : value;
  };
}

var toJs = memoizeFactory(makeToJS);

function makeZipAll(Collection, collectionType, collectionSubtype) {
  var SequenceConstructor = Collection.Sequence[collectionSubtype];
  return function zipAll(iterable) {
    for (var _len = arguments.length, iterables = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      iterables[_key - 1] = arguments[_key];
    }

    return _zipAll.default.apply(void 0, [iterable].concat((0, _toConsumableArray2.default)(iterables.map(function (iterable) {
      return new SequenceConstructor(iterable);
    }))));
  };
}

var zipAll = memoizeFactory(makeZipAll);

function makeZip(Collection, collectionType, collectionSubtype) {
  var SequenceConstructor = Collection.Sequence[collectionSubtype];
  return function zip(iterable) {
    for (var _len = arguments.length, iterables = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      iterables[_key - 1] = arguments[_key];
    }

    return _zip.default.apply(void 0, [iterable].concat((0, _toConsumableArray2.default)(iterables.map(function (iterable) {
      return new SequenceConstructor(iterable);
    }))));
  };
}

var zip = memoizeFactory(makeZip);
var factories =
/*#__PURE__*/
Object.freeze({
  concat: concat$1,
  flatten: flatten,
  groupBy: groupBy,
  reduce: makeReduce,
  sort: sort,
  toConcrete: toConcrete,
  toJS: toJs,
  zipAll: zipAll,
  zip: zip
});
var Namespace$1 = new RootNamespace();
var Collection = Namespace$1;
var emptyArray = [];

var MethodFactory = function MethodFactory(collectionType, collectionSubtype) {
  (0, _classCallCheck2.default)(this, MethodFactory);
  this._collectionType = collectionType;
  this._collectionSubtype = collectionSubtype;
};

var nativeFactories = new Map([[Map, function (coll) {
  return new Map(new Collection.Sequence.Keyed(coll));
}], [Set, function (coll) {
  return new Set(new Collection.Sequence.Duplicated(coll));
}], [Array, function (coll) {
  return Array.from(new Collection.Sequence.Indexed(coll));
}], [Object, // TODO use Object.fromEntries here when it is ready.
function (coll) {
  return new Collection.Sequence.Keyed(coll).reduce(function (obj, value, key) {
    obj[key] = value;
    return obj;
  }, {});
}]]);
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function _loop() {
    var name = _step.value;
    Object.defineProperty(MethodFactory.prototype, name, {
      get: function get() {
        return factories[name](Collection, this._collectionType, this._collectionSubtype);
      }
    });
  };

  for (var _iterator = (0, _keys.default)(factories)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    _loop();
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator.return != null) {
      _iterator.return();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

var CollectionMixin = function CollectionMixin(Base) {
  var CollectionMixin =
  /*#__PURE__*/
  function (_Base) {
    (0, _inherits2.default)(CollectionMixin, _Base);

    function CollectionMixin(iterable, collectionType, collectionSubtype) {
      var _this;

      (0, _classCallCheck2.default)(this, CollectionMixin);
      _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CollectionMixin).call(this, iterable, collectionSubtype));
      _this.__selfParam = emptyArray;
      _this.__dynamicMethods = new MethodFactory(collectionType, collectionSubtype);
      return _this;
    }

    (0, _createClass2.default)(CollectionMixin, [{
      key: "slice",
      value: function slice() {
        var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
        var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
        return this.__doCollectionTransform((0, _slice2.default)({
          start: start,
          end: end
        }));
      }
    }, {
      key: "concat",
      value: function concat() {
        var _this2 = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.__doCollectionTransform(function (iterable) {
          var _this2$__dynamicMetho;

          return (_this2$__dynamicMetho = _this2.__dynamicMethods).concat.apply(_this2$__dynamicMetho, [iterable].concat(args));
        });
      }
    }, {
      key: "flatten",
      value: function flatten$$1() {
        var _this3 = this;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.__doCollectionTransform(function (iterable) {
          var _this3$__dynamicMetho;

          return (_this3$__dynamicMetho = _this3.__dynamicMethods).flatten.apply(_this3$__dynamicMetho, [iterable].concat(args));
        });
      }
    }, {
      key: "groupBy",
      value: function groupBy$$1(grouper) {
        var _this4 = this;

        return this.__doCollectionTransform(function (iterable) {
          return _this4.__dynamicMethods.groupBy(iterable, grouper);
        });
      }
    }, {
      key: "flatMap",
      value: function flatMap(mapFn) {
        return this.map(mapFn).flatten(true);
      }
    }, {
      key: "sort",
      value: function sort$$1() {
        for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return this.sortBy.apply(this, [null].concat(args));
      }
    }, {
      key: "count",
      value: function count(predicate) {
        return (0, _size.default)(predicate ? this.filter(predicate) : this);
      } // Reductive functions

    }, {
      key: "reduce",
      value: function reduce(reducer) {
        var _this5 = this;

        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }

        return this.__doReductiveTransform(function (iterable) {
          var _this5$__dynamicMetho;

          return (_this5$__dynamicMetho = _this5.__dynamicMethods).reduce.apply(_this5$__dynamicMetho, [iterable, function (acc, value, index) {
            return reducer.apply(void 0, [acc, value, index].concat((0, _toConsumableArray2.default)(_this5.__selfParam)));
          }].concat(args));
        });
      } // Deep conversions

    }, {
      key: "toJS",
      value: function toJS() {
        return this.__dynamicMethods.toJS(this);
      } // Shallow conversions

    }, {
      key: "toSeq",
      value: function toSeq() {
        return new Collection.Sequence.from(this);
      }
    }, {
      key: "toConcrete",
      value: function toConcrete$$1() {
        return this.__dynamicMethods.toConcrete(this);
      }
    }, {
      key: "to",
      value: function to(CollectionConstructor) {
        if (nativeFactories.has(CollectionConstructor)) {
          return nativeFactories.get(CollectionConstructor)(this);
        } else {
          return this instanceof CollectionConstructor ? this : new CollectionConstructor(this);
        }
      }
    }]);
    return CollectionMixin;
  }(Base);

  Object.defineProperty(CollectionMixin.prototype, '@@__MUTABLE_COLLECTION__@@', {
    value: true
  });
  return CollectionMixin;
};

var Collection$1 = CollectionMixin(function SequinsBase() {
  (0, _classCallCheck2.default)(this, SequinsBase);
});
var emptyArray$1 = [];

function makeFrom(Collection, collectionType$$1) {
  var TypedCollection = Collection[collectionType$$1];
  return function from(initial) {
    if (initial == null) {
      return new TypedCollection.Indexed(emptyArray$1);
    } else if (isCollection(initial) || isNative(initial)) {
      if (isIndexed(initial)) {
        return new TypedCollection.Indexed(initial);
      } else if (isKeyed(initial)) {
        return new TypedCollection.Keyed(initial);
      } else {
        return new TypedCollection.Duplicated(initial);
      }
    } else if (typeof initial[Symbol.iterator] === 'function') {
      return new TypedCollection.Indexed(initial);
    } else if (isPlainObj(initial)) {
      return new TypedCollection.Keyed(initial);
    }

    return null;
  };
}

var makeFrom$1 = memoizeFactory(makeFrom);

var SequenceNamespace =
/*#__PURE__*/
function (_SubtypeNamespace) {
  (0, _inherits2.default)(SequenceNamespace, _SubtypeNamespace);

  function SequenceNamespace() {
    (0, _classCallCheck2.default)(this, SequenceNamespace);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SequenceNamespace).apply(this, arguments));
  }

  (0, _createClass2.default)(SequenceNamespace, [{
    key: "from",
    value: function from(initial) {
      return sequenceFrom(initial);
    }
  }]);
  return SequenceNamespace;
}(SubtypeNamespace);

var Namespace$2 = Namespace$1.__register('Sequence', new SequenceNamespace());

var sequenceFrom = makeFrom$1(Namespace$1, 'Sequence');

var identityFn = function identityFn(_) {
  return _;
};

var Sequence =
/*#__PURE__*/
function (_Collection) {
  (0, _inherits2.default)(Sequence, _Collection);
  (0, _createClass2.default)(Sequence, null, [{
    key: "from",
    value: function from(initial) {
      return sequenceFrom(initial);
    }
  }]);

  function Sequence(iterable, collectionSubtype) {
    var _this;

    (0, _classCallCheck2.default)(this, Sequence);
    iterable = iterable || [];
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Sequence).call(this, iterable, 'Sequence', collectionSubtype));
    _this.__iterable = iterable;
    _this.__transform = null;
    _this.__constructorTransform = null;
    return _this;
  }

  (0, _createClass2.default)(Sequence, [{
    key: "__doCollectionTransform",
    value: function __doCollectionTransform(transform) {
      var Sequence = this[Symbol.species]();
      var result = new Sequence(this);
      result.__transform = transform;
      return result;
    }
  }, {
    key: "__doReductiveTransform",
    value: function __doReductiveTransform(transform) {
      return transform(this._transform());
    }
  }, {
    key: "_transform",
    value: function _transform() {
      var constructorTransform = this.__constructorTransform || identityFn;
      var transform = this.__transform || identityFn;
      return transform(constructorTransform(this.__iterable));
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      return this._transform()[Symbol.iterator]();
    }
  }, {
    key: "set",
    value: function set(key, newValue) {
      return this.map(function (value, key) {
        return key === key ? newValue : value;
      });
    }
  }, {
    key: "push",
    value: function push(key, newValue) {
      return this.concat([newValue]);
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return this.filter(function (_, key) {
        return key !== key;
      });
    }
  }, {
    key: "groupBy",
    value: function groupBy(grouper) {
      var _this2 = this;

      var concrete = this.toConcrete();
      var keyed = new Namespace$2.Keyed(concrete);

      keyed.__transform = function () {
        return _this2.__dynamicMethods.groupBy(concrete, grouper);
      };

      return keyed;
    }
  }, {
    key: "reverse",
    value: function reverse() {
      return this.__doCollectionTransform(function (iterable) {
        return Array.from(iterable).reverse();
      });
    }
  }, {
    key: "sortBy",
    value: function sortBy() {
      var _this3 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.__doCollectionTransform(function (iterable) {
        var _this3$__dynamicMetho;

        return (_this3$__dynamicMetho = _this3.__dynamicMethods).sort.apply(_this3$__dynamicMetho, [false, iterable].concat(args));
      });
    }
  }]);
  return Sequence;
}(Collection$1);

Object.defineProperty(Sequence.prototype, '@@__MUTABLE_SEQUENCE__@@', {
  value: true
});

var Namespace$3 = Namespace$1.__register('Concrete', new SubtypeNamespace());

var concreteFrom = makeFrom$1(Collection$1, 'Concrete');

var ConcreteCollection =
/*#__PURE__*/
function (_Collection) {
  (0, _inherits2.default)(ConcreteCollection, _Collection);

  function ConcreteCollection(iterable, collectionSubtype) {
    var _this;

    (0, _classCallCheck2.default)(this, ConcreteCollection);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConcreteCollection).call(this, iterable, 'Concrete', collectionSubtype));
    _this.__selfParam = [(0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this))];
    return _this;
  }

  (0, _createClass2.default)(ConcreteCollection, [{
    key: "__doCollectionTransform",
    value: function __doCollectionTransform(transform) {
      var CollectionConstructor = this.constructor;
      var transformed = transform(this.__native);

      if (transformed instanceof ConcreteCollection) {
        return transformed;
      } else {
        var coll = new CollectionConstructor();
        coll.__native = this.__constructNative(transformed);
        return coll;
      }
    }
  }, {
    key: "__constructNative",
    value: function __constructNative(iterable) {
      var NativeConstructor = this.__native.constructor;
      return new NativeConstructor(iterable);
    }
  }, {
    key: "__doReductiveTransform",
    value: function __doReductiveTransform(transform) {
      return transform(this.__native);
    }
  }, {
    key: "count",
    value: function count(predicate) {
      return predicate ? (0, _get2.default)((0, _getPrototypeOf2.default)(ConcreteCollection.prototype), "count", this).call(this, predicate) : this.size;
    }
  }, {
    key: "get",
    value: function get(key, defaultValue) {
      return this.has(key) ? this.__native.get(key) : defaultValue;
    }
  }, {
    key: "has",
    value: function has(key) {
      return this.__native.has(key);
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return this.__native.delete(key);
    }
  }, {
    key: "clear",
    value: function clear() {
      var NativeConstructor = this.__native.constructor;
      this.__native = new NativeConstructor();
      return this;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.size === 0;
    }
  }, {
    key: "concat",
    value: function (_concat) {
      function concat() {
        return _concat.apply(this, arguments);
      }

      concat.toString = function () {
        return _concat.toString();
      };

      return concat;
    }(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.__doCollectionTransform(function (iterable) {
        return concat.apply(void 0, [iterable].concat(args));
      });
    })
  }, {
    key: "__reverse",
    value: function __reverse() {
      var reversedSeq = Namespace$1.Sequence.from(this).reverse().toConcrete();
      this.clear();
      return reversedSeq;
    }
  }, {
    key: "toConcrete",
    value: function toConcrete() {
      return this;
    } // Iterators

  }, {
    key: "keys",
    value: function keys$$1() {
      return new Namespace$1.Sequence.Duplicated(this.__native.keys());
    }
  }, {
    key: "values",
    value: function values() {
      return new Namespace$1.Sequence.Duplicated(this.__native.values());
    }
  }, {
    key: "entries",
    value: function entries$$1() {
      return new Namespace$1.Sequence.Duplicated(this.__native.entries());
    }
  }, {
    key: Symbol.iterator,
    value: function value() {
      return this.__native[Symbol.iterator]();
    }
  }, {
    key: "size",
    get: function get() {
      return this.__native.size;
    }
  }], [{
    key: "from",
    value: function from(initial) {
      return concreteFrom(initial);
    }
  }]);
  return ConcreteCollection;
}(Collection$1);

function forEach(func, iterable) {
  var c = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      func(item, c++);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return iterable;
}

function forSome(func, iterable) {
  var c = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = iterable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var ret = func(item, c++);

      if (ret === false) {
        break;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return c;
}

var DuplicatedMixin = function DuplicatedMixin(Base) {
  return (
    /*#__PURE__*/
    function (_Base) {
      (0, _inherits2.default)(SetCollection, _Base);

      function SetCollection(iterable) {
        (0, _classCallCheck2.default)(this, SetCollection);
        return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SetCollection).call(this, iterable, 'Duplicated'));
      } // Collection functions


      (0, _createClass2.default)(SetCollection, [{
        key: "map",
        value: function map(mapFn) {
          var _this = this;

          return this.__doCollectionTransform((0, _map2.default)(function (item) {
            return mapFn.apply(void 0, [item, item].concat((0, _toConsumableArray2.default)(_this.__selfParam)));
          }));
        }
      }, {
        key: "tap",
        value: function tap(tapFn) {
          var _this2 = this;

          return this.__doCollectionTransform((0, _tap2.default)(function (item) {
            return tapFn.apply(void 0, [item, item].concat((0, _toConsumableArray2.default)(_this2.__selfParam)));
          }));
        }
      }, {
        key: "filter",
        value: function filter(filterFn) {
          var _this3 = this;

          return this.__doCollectionTransform((0, _filter2.default)(function (item) {
            return filterFn.apply(void 0, [item, item].concat((0, _toConsumableArray2.default)(_this3.__selfParam)));
          }));
        }
      }, {
        key: "filterNot",
        value: function filterNot(filterFn) {
          var _this4 = this;

          return this.__doCollectionTransform((0, _filter2.default)(function (item) {
            return !filterFn.apply(void 0, [item, item].concat((0, _toConsumableArray2.default)(_this4.__selfParam)));
          }));
        } // Reductive functions

      }, {
        key: "forEach",
        value: function forEach$$1(eachFn) {
          var _this5 = this;

          forEach(function (item) {
            return eachFn.apply(void 0, [item, item].concat((0, _toConsumableArray2.default)(_this5.__selfParam)));
          }, this);
        }
      }, {
        key: "forSome",
        value: function forSome$$1(eachFn) {
          var _this6 = this;

          return forSome(function (item) {
            return eachFn.apply(void 0, [item, item].concat((0, _toConsumableArray2.default)(_this6.__selfParam)));
          }, this);
        } // Conversions

      }, {
        key: "toJSON",
        value: function toJSON() {
          return this.to(Array);
        }
      }]);
      return SetCollection;
    }(Base)
  );
};

var IndexedMixin = function IndexedMixin(Base) {
  var IndexedCollection =
  /*#__PURE__*/
  function (_Base) {
    (0, _inherits2.default)(IndexedCollection, _Base);

    function IndexedCollection(iterable) {
      (0, _classCallCheck2.default)(this, IndexedCollection);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(IndexedCollection).call(this, iterable, 'Indexed'));
    } // prettier-ignore


    (0, _createClass2.default)(IndexedCollection, [{
      key: "zip",
      value: function zip() {
        var _this = this;

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.__doCollectionTransform(function (iterable) {
          var _this$__dynamicMethod;

          return (_this$__dynamicMethod = _this.__dynamicMethods).zip.apply(_this$__dynamicMethod, [iterable].concat(args));
        });
      }
    }, {
      key: "zipAll",
      value: function zipAll() {
        var _this2 = this;

        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.__doCollectionTransform(function (iterable) {
          var _this2$__dynamicMetho;

          return (_this2$__dynamicMetho = _this2.__dynamicMethods).zipAll.apply(_this2$__dynamicMetho, [iterable].concat(args));
        });
      }
    }, {
      key: "zipWith",
      value: function zipWith(zipper) {
        var _this3 = this;

        for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
          args[_key3 - 1] = arguments[_key3];
        }

        return this.__doCollectionTransform(function (iterable) {
          var _this3$__dynamicMetho;

          return (0, _map2.default)(function (items) {
            return zipper.apply(void 0, (0, _toConsumableArray2.default)(items));
          }, (_this3$__dynamicMetho = _this3.__dynamicMethods).zip.apply(_this3$__dynamicMetho, [iterable].concat(args)));
        });
      }
    }, {
      key: "interpose",
      value: function interpose(separator) {
        return this.__doCollectionTransform((0, _interpose2.default)(separator));
      } // Collection functions

    }, {
      key: "map",
      value: function map(mapFn) {
        var _this4 = this;

        return this.__doCollectionTransform((0, _map2.default)(function (value, i) {
          return mapFn.apply(void 0, [value, i].concat((0, _toConsumableArray2.default)(_this4.__selfParam)));
        }));
      }
    }, {
      key: "tap",
      value: function tap(tapFn) {
        var _this5 = this;

        return this.__doCollectionTransform((0, _tap2.default)(function (value, i) {
          return tapFn.apply(void 0, [value, i].concat((0, _toConsumableArray2.default)(_this5.__selfParam)));
        }));
      }
    }, {
      key: "filter",
      value: function filter(filterFn) {
        var _this6 = this;

        return this.__doCollectionTransform((0, _filter2.default)(function (value, i) {
          return filterFn.apply(void 0, [value, i].concat((0, _toConsumableArray2.default)(_this6.__selfParam)));
        }));
      }
    }, {
      key: "filterNot",
      value: function filterNot(filterFn) {
        var _this7 = this;

        return this.__doCollectionTransform((0, _filter2.default)(function (value, i) {
          return !filterFn.apply(void 0, [value, i].concat((0, _toConsumableArray2.default)(_this7.__selfParam)));
        }));
      } // Reductive functions

    }, {
      key: "forEach",
      value: function forEach$$1(eachFn) {
        var _this8 = this;

        forEach(function (value, i) {
          return eachFn.apply(void 0, [value, i].concat((0, _toConsumableArray2.default)(_this8.__selfParam)));
        }, this);
      }
    }, {
      key: "forSome",
      value: function forSome$$1(eachFn) {
        var _this9 = this;

        return forSome(function (value, i) {
          return eachFn.apply(void 0, [value, i].concat((0, _toConsumableArray2.default)(_this9.__selfParam)));
        }, this);
      } // Conversions

    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.to(Array);
      }
    }]);
    return IndexedCollection;
  }(Base);

  Object.defineProperty(IndexedCollection.prototype, '@@__MUTABLE_INDEXED__@@', {
    value: true
  });
  return IndexedCollection;
};

var KeyedMixin = function KeyedMixin(Base) {
  var KeyedCollection =
  /*#__PURE__*/
  function (_Base) {
    (0, _inherits2.default)(KeyedCollection, _Base);

    function KeyedCollection(iterable) {
      (0, _classCallCheck2.default)(this, KeyedCollection);
      return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(KeyedCollection).call(this, iterable, 'Keyed'));
    }

    (0, _createClass2.default)(KeyedCollection, [{
      key: "flip",
      value: function flip() {
        return this.__doCollectionTransform((0, _map2.default)(function (_ref) {
          var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
              key = _ref2[0],
              value = _ref2[1];

          return [value, key];
        }));
      } // Collection functions

    }, {
      key: "map",
      value: function map(mapFn) {
        var _this = this;

        return this.__doCollectionTransform((0, _map2.default)(function (_ref3) {
          var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
              key = _ref4[0],
              value = _ref4[1];

          return [key, mapFn.apply(void 0, [value, key].concat((0, _toConsumableArray2.default)(_this.__selfParam)))];
        }));
      }
    }, {
      key: "mapKeys",
      value: function mapKeys(mapFn) {
        var _this2 = this;

        return this.__doCollectionTransform((0, _map2.default)(function (_ref5) {
          var _ref6 = (0, _slicedToArray2.default)(_ref5, 2),
              key = _ref6[0],
              value = _ref6[1];

          return [mapFn.apply(void 0, [key, value].concat((0, _toConsumableArray2.default)(_this2.__selfParam))), value];
        }));
      }
    }, {
      key: "mapEntries",
      value: function mapEntries(mapFn) {
        var _this3 = this;

        return this.__doCollectionTransform((0, _map2.default)(function (entry, i) {
          return mapFn.apply(void 0, [entry, i].concat((0, _toConsumableArray2.default)(_this3.__selfParam)));
        }));
      }
    }, {
      key: "tap",
      value: function tap(tapFn) {
        var _this4 = this;

        return this.__doCollectionTransform((0, _tap2.default)(function (_ref7) {
          var _ref8 = (0, _slicedToArray2.default)(_ref7, 2),
              key = _ref8[0],
              value = _ref8[1];

          return tapFn.apply(void 0, [value, key].concat((0, _toConsumableArray2.default)(_this4.__selfParam)));
        }));
      }
    }, {
      key: "filter",
      value: function filter(filterFn) {
        var _this5 = this;

        return this.__doCollectionTransform((0, _filter2.default)(function (_ref9) {
          var _ref10 = (0, _slicedToArray2.default)(_ref9, 2),
              key = _ref10[0],
              value = _ref10[1];

          return filterFn.apply(void 0, [value, key].concat((0, _toConsumableArray2.default)(_this5.__selfParam)));
        }));
      }
    }, {
      key: "filterNot",
      value: function filterNot(filterFn) {
        var _this6 = this;

        return this.__doCollectionTransform((0, _filter2.default)(function (_ref11) {
          var _ref12 = (0, _slicedToArray2.default)(_ref11, 2),
              key = _ref12[0],
              value = _ref12[1];

          return !filterFn.apply(void 0, [value, key].concat((0, _toConsumableArray2.default)(_this6.__selfParam)));
        }));
      } // Reductive functions

    }, {
      key: "forEach",
      value: function forEach$$1(eachFn) {
        var _this7 = this;

        forEach(function (_ref13) {
          var _ref14 = (0, _slicedToArray2.default)(_ref13, 2),
              key = _ref14[0],
              value = _ref14[1];

          return eachFn.apply(void 0, [value, key].concat((0, _toConsumableArray2.default)(_this7.__selfParam)));
        }, this);
      }
    }, {
      key: "forSome",
      value: function forSome$$1(eachFn) {
        var _this8 = this;

        return forSome(function (_ref15) {
          var _ref16 = (0, _slicedToArray2.default)(_ref15, 2),
              key = _ref16[0],
              value = _ref16[1];

          return eachFn.apply(void 0, [value, key].concat((0, _toConsumableArray2.default)(_this8.__selfParam)));
        }, this);
      } // Conversions

    }, {
      key: "toJSON",
      value: function toJSON() {
        return this.to(Object);
      }
    }]);
    return KeyedCollection;
  }(Base);

  Object.defineProperty(KeyedCollection.prototype, '@@__MUTABLE_KEYED__@@', {
    value: true
  });
  return KeyedCollection;
};

var _marked =
/*#__PURE__*/
_regenerator.default.mark(arrayEntries);

function arrayEntries(array) {
  var i;
  return _regenerator.default.wrap(function arrayEntries$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < array.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return [i, array[i]];

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var List =
/*#__PURE__*/
function (_IndexedMixin) {
  (0, _inherits2.default)(List, _IndexedMixin);
  (0, _createClass2.default)(List, null, [{
    key: "isList",
    value: function isList(shape) {
      return isMutableList(shape);
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      return new List(values);
    }
  }]);

  function List(iterable) {
    var _this;

    (0, _classCallCheck2.default)(this, List);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(List).call(this, iterable));
    _this.__native = iterable == null ? [] : Array.from(isKeyed(iterable) ? iterable.values() : iterable);
    return _this;
  }

  (0, _createClass2.default)(List, [{
    key: "__constructNative",
    value: function __constructNative(iterable) {
      return Array.from(iterable);
    }
  }, {
    key: "get",
    value: function get(idx) {
      return this.__native[idx];
    }
  }, {
    key: "set",
    value: function set(idx, value) {
      this.__native[idx] = value;
      return this;
    }
  }, {
    key: "has",
    value: function has(idx) {
      return idx < this.__native.length;
    }
  }, {
    key: "push",
    value: function push() {
      var _this$__native;

      (_this$__native = this.__native).push.apply(_this$__native, arguments);

      return this;
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.__native.pop();
    }
  }, {
    key: "shift",
    value: function shift() {
      return this.__native.shift();
    }
  }, {
    key: "unshift",
    value: function unshift(value) {
      this.__native.unshift(value);

      return this;
    }
  }, {
    key: "first",
    value: function first() {
      return this.__native[0];
    }
  }, {
    key: "last",
    value: function last() {
      return this.__native[this.__native.length];
    }
  }, {
    key: "sortBy",
    value: function sortBy() {
      var _this$__dynamicMethod;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      (_this$__dynamicMethod = this.__dynamicMethods).sort.apply(_this$__dynamicMethod, [true, this.__native].concat(args));

      return this;
    }
  }, {
    key: "fill",
    value: function fill() {
      var _this$__native2;

      (_this$__native2 = this.__native).fill.apply(_this$__native2, arguments);

      return this;
    }
  }, {
    key: "includes",
    value: function includes(value) {
      return this.__native.includes(value);
    }
  }, {
    key: "map",
    value: function map(mapFn) {
      var _this2 = this;

      return this.__doCollectionTransform(function () {
        return _this2.__native.map(function (value, index) {
          return mapFn(value, index, _this2);
        });
      });
    }
  }, {
    key: "filter",
    value: function filter(filterFn) {
      var _this3 = this;

      return this.__doCollectionTransform(function () {
        return _this3.__native.filter(function (value, index) {
          return filterFn(value, index, _this3);
        });
      });
    }
  }, {
    key: "filterNot",
    value: function filterNot(filterFn) {
      var _this4 = this;

      return this.__doCollectionTransform(function () {
        return _this4.__native.filter(function (value, index) {
          return !filterFn(value, index, _this4);
        });
      });
    }
  }, {
    key: "slice",
    value: function slice() {
      var _this5 = this;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.__doCollectionTransform(function () {
        var _this5$__native;

        return (_this5$__native = _this5.__native).slice.apply(_this5$__native, args);
      });
    }
  }, {
    key: "concat",
    value: function concat() {
      var _this6 = this;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.__doCollectionTransform(function () {
        var _this6$__native;

        return (_this6$__native = _this6.__native).concat.apply(_this6$__native, args);
      });
    }
  }, {
    key: "reverse",
    value: function reverse() {
      this.__native.reverse();

      return this;
    }
  }, {
    key: "reduce",
    value: function reduce(reducer) {
      var _this$__native3,
          _this7 = this;

      for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        args[_key5 - 1] = arguments[_key5];
      }

      return (_this$__native3 = this.__native).reduce.apply(_this$__native3, [function (acc, value, index) {
        return reducer(acc, value, index, _this7);
      }].concat(args));
    }
  }, {
    key: "join",
    value: function join(separator) {
      return this.__native.join(separator);
    }
  }, {
    key: "has",
    value: function has(idx) {
      return idx < this.size();
    }
  }, {
    key: "delete",
    value: function _delete(idx) {
      var hasIdx = this.has(idx);

      if (hasIdx) {
        this.__native[idx] = undefined;
      }

      return hasIdx;
    } // Iterators

  }, {
    key: "keys",
    value: function keys$$1() {
      return new Namespace$1.Sequence.Duplicated((0, _range.default)(this.__native.length));
    }
  }, {
    key: "values",
    value: function values() {
      return new Namespace$1.Sequence.Duplicated(this);
    }
  }, {
    key: "entries",
    value: function entries$$1() {
      return new Namespace$1.Sequence.Duplicated(arrayEntries(this.__native));
    }
  }, {
    key: Symbol.species,
    value: function value() {
      return List;
    }
  }, {
    key: "size",
    get: function get() {
      return this.__native.length;
    }
  }]);
  return List;
}(IndexedMixin(ConcreteCollection));

var List$1 = Namespace$3.__register('Indexed', List);

exports.List = List$1;

var SequinsMap =
/*#__PURE__*/
function (_KeyedMixin) {
  (0, _inherits2.default)(SequinsMap, _KeyedMixin);
  (0, _createClass2.default)(SequinsMap, null, [{
    key: "isMap",
    value: function isMap(shape) {
      return isMutableMap(shape);
    }
  }]);

  function SequinsMap(iterable) {
    var _this;

    (0, _classCallCheck2.default)(this, SequinsMap);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SequinsMap).call(this, iterable)); // prettier-ignore

    _this.__native = new Map(iterable == null ? [] : isCollection(iterable) || isNative(iterable) ? iterable.entries() : isPlainObj(iterable) ? (0, _entries.default)(iterable) : iterable);
    return _this;
  }

  (0, _createClass2.default)(SequinsMap, [{
    key: "set",
    value: function set(key, value) {
      this.__native.set(key, value);

      return this;
    }
  }, {
    key: "sortBy",
    value: function sortBy() {
      var _this$__dynamicMethod;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.__native = new Map((_this$__dynamicMethod = this.__dynamicMethods).sort.apply(_this$__dynamicMethod, [true, Array.from(this.__native)].concat(args)));
      return this;
    }
  }, {
    key: "reverse",
    value: function reverse() {
      var reversedSeq = this.__reverse();

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = reversedSeq[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = (0, _slicedToArray2.default)(_step.value, 2),
              key = _step$value[0],
              value = _step$value[1];

          this.set(key, value);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    } // Conversions

  }, {
    key: Symbol.species,
    value: function value() {
      return SequinsMap;
    }
  }]);
  return SequinsMap;
}(KeyedMixin(ConcreteCollection));

var Map$1 = Namespace$3.__register('Keyed', SequinsMap);

exports.Map = Map$1;

var SequinsSet =
/*#__PURE__*/
function (_DuplicatedMixin) {
  (0, _inherits2.default)(SequinsSet, _DuplicatedMixin);
  (0, _createClass2.default)(SequinsSet, null, [{
    key: "isSet",
    value: function isSet(shape) {
      return isMutableSet(shape);
    }
  }, {
    key: "of",
    value: function of() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      return new SequinsSet(values);
    }
  }, {
    key: "fromKeys",
    value: function fromKeys(shape) {
      return makeFrom$1(Namespace$1, 'Sequence')(shape).keys().to(SequinsSet);
    }
  }, {
    key: "union",
    value: function union() {
      for (var _len2 = arguments.length, iterables = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        iterables[_key2] = arguments[_key2];
      }

      return new SequinsSet((0, _flat.default)(1, (0, _map2.default)(function (iterable) {
        return new Namespace$1.Sequence.Duplicated(iterable);
      }, iterables)));
    }
  }, {
    key: "intersect",
    value: function intersect() {
      for (var _len3 = arguments.length, iterables = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        iterables[_key3] = arguments[_key3];
      }

      var countMap = new Namespace$3.Keyed();

      for (var _i = 0; _i < iterables.length; _i++) {
        var iterable = iterables[_i];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = new Namespace$1.Sequence.Duplicated(iterable)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var value = _step.value;
            countMap.set(value, (countMap.get(value) || 0) + 1);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }

      return new Namespace$1.Sequence.Keyed(countMap).filter(function (count) {
        return count === iterables.length;
      }).keys().to(SequinsSet);
    }
  }]);

  function SequinsSet(iterable) {
    var _this;

    (0, _classCallCheck2.default)(this, SequinsSet);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SequinsSet).call(this, iterable));
    _this.__native = new Set(iterable == null ? [] : isKeyed(iterable) ? iterable.values() : iterable);
    return _this;
  }

  (0, _createClass2.default)(SequinsSet, [{
    key: "add",
    value: function add(key, value) {
      this.__native.add(key, value);

      return this;
    }
  }, {
    key: "sortBy",
    value: function sortBy() {
      var _this$__dynamicMethod;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this.__native = new Set((_this$__dynamicMethod = this.__dynamicMethods).sort.apply(_this$__dynamicMethod, [true, Array.from(this.__native)].concat(args)));
      return this;
    }
  }, {
    key: "reverse",
    value: function reverse() {
      var reversedSeq = this.__reverse();

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = reversedSeq[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var value = _step2.value;
          this.add(value);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    }
  }, {
    key: "union",
    value: function union() {
      for (var _len5 = arguments.length, iterables = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        iterables[_key5] = arguments[_key5];
      }

      return SequinsSet.union.apply(SequinsSet, [this].concat(iterables));
    }
  }, {
    key: "intersect",
    value: function intersect() {
      for (var _len6 = arguments.length, iterables = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        iterables[_key6] = arguments[_key6];
      }

      return SequinsSet.intersect.apply(SequinsSet, [this].concat(iterables));
    } // Conversions

  }, {
    key: Symbol.species,
    value: function value() {
      return SequinsSet;
    }
  }]);
  return SequinsSet;
}(DuplicatedMixin(ConcreteCollection));

var Set$1 = Namespace$3.__register('Duplicated', SequinsSet);

exports.Set = Set$1;

var IndexedSequence =
/*#__PURE__*/
function (_IndexedMixin) {
  (0, _inherits2.default)(IndexedSequence, _IndexedMixin);
  (0, _createClass2.default)(IndexedSequence, null, [{
    key: "of",
    value: function of() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      return new IndexedSequence(values);
    }
  }]);

  function IndexedSequence(iterable) {
    var _this;

    (0, _classCallCheck2.default)(this, IndexedSequence);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(IndexedSequence).call(this, iterable));

    if (isKeyed(_this.__iterable)) {
      _this.__constructorTransform = function (iterable) {
        return iterable.values();
      };
    }

    return _this;
  } // Iterators


  (0, _createClass2.default)(IndexedSequence, [{
    key: "keys",
    value: function keys$$1() {
      return new Namespace$2.Duplicated((0, _map2.default)(function (_, i) {
        return i;
      }, this));
    }
  }, {
    key: "values",
    value: function values() {
      return new Namespace$2.Duplicated(this);
    }
  }, {
    key: "entries",
    value: function entries$$1() {
      return new Namespace$2.Duplicated((0, _map2.default)(function (value, i) {
        return [i, value];
      }, this));
    }
  }, {
    key: Symbol.species,
    value: function value() {
      return IndexedSequence;
    }
  }]);
  return IndexedSequence;
}(IndexedMixin(Sequence));

exports.IndexedSequence = IndexedSequence;

Namespace$2.__register('Indexed', IndexedSequence);

var KeyedSequence =
/*#__PURE__*/
function (_KeyedMixin) {
  (0, _inherits2.default)(KeyedSequence, _KeyedMixin);

  function KeyedSequence(iterable) {
    var _this;

    (0, _classCallCheck2.default)(this, KeyedSequence);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(KeyedSequence).call(this, iterable));

    if (isMutableCollection(_this.__iterable) && !isKeyed(_this.__iterable)) {
      _this.__constructorTransform = function (iterable) {
        return iterable.entries();
      };
    } else if (isPlainObj(_this.__iterable)) {
      _this.__constructorTransform = function (obj) {
        return (0, _entries.default)(obj);
      };
    }

    return _this;
  } // Iterators


  (0, _createClass2.default)(KeyedSequence, [{
    key: "keys",
    value: function keys$$1() {
      return new Namespace$2.Duplicated((0, _map2.default)(function (_ref) {
        var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
            key = _ref2[0],
            _ = _ref2[1];

        return key;
      }, this));
    }
  }, {
    key: "values",
    value: function values() {
      return new Namespace$2.Duplicated((0, _map2.default)(function (_ref3) {
        var _ref4 = (0, _slicedToArray2.default)(_ref3, 2),
            _ = _ref4[0],
            value = _ref4[1];

        return value;
      }, this));
    }
  }, {
    key: "entries",
    value: function entries$$1() {
      return new Namespace$2.Duplicated((0, _map2.default)(function (_) {
        return _;
      }, this));
    }
  }, {
    key: Symbol.species,
    value: function value() {
      return KeyedSequence;
    }
  }]);
  return KeyedSequence;
}(KeyedMixin(Sequence));

exports.KeyedSequence = KeyedSequence;

Namespace$2.__register('Keyed', KeyedSequence);

var SetSequence =
/*#__PURE__*/
function (_DuplicatedMixin) {
  (0, _inherits2.default)(SetSequence, _DuplicatedMixin);
  (0, _createClass2.default)(SetSequence, null, [{
    key: "of",
    value: function of() {
      for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      return new SetSequence(values);
    }
  }]);

  function SetSequence(iterable) {
    var _this;

    (0, _classCallCheck2.default)(this, SetSequence);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SetSequence).call(this, iterable));

    if (isKeyed(_this.__iterable)) {
      _this.__constructorTransform = function (iterable) {
        return iterable.values();
      };
    }

    return _this;
  } // Iterators


  (0, _createClass2.default)(SetSequence, [{
    key: "keys",
    value: function keys$$1() {
      return this;
    }
  }, {
    key: "values",
    value: function values() {
      return this;
    }
  }, {
    key: "entries",
    value: function entries$$1() {
      return new Namespace$2.Duplicated((0, _map2.default)(function (value) {
        return [value, value];
      }, this));
    }
  }, {
    key: Symbol.species,
    value: function value() {
      return SetSequence;
    }
  }]);
  return SetSequence;
}(DuplicatedMixin(Sequence));

exports.SetSequence = SetSequence;

Namespace$2.__register('Duplicated', SetSequence);

var _global = typeof window !== 'undefined' ? window : global;

var Map$2 = _global.Map;
exports.NativeMap = Map$2;
var Set$2 = _global.Set;
exports.NativeSet = Set$2;

function has(shape, key) {
  if (shape == null) {
    return false;
  } else if (isModernDataStructure(shape)) {
    return shape.has(key);
  } else if (Array.isArray(shape)) {
    return key < shape.length;
  }

  return Object.prototype.hasOwnProperty.call(shape, key);
}

function get(shape, key, defaultValue) {
  if (shape == null) {
    return false;
  } else if (isModernDataStructure(shape)) {
    return shape.get(key, defaultValue);
  }

  return !has(shape, key) ? defaultValue : shape[key];
}

function set(shape, key, value) {
  if (isMutableCollection(shape) || isNativeKeyed(map)) {
    return shape.set(key, value);
  } else if (isImmutable(shape)) {
    // Reasoning: Immutable's set does not have the same contract as this function:
    // it requires you to use the returned reference.
    throw new TypeError('Sequins.set cannot set on Immutable data structures.');
  } else if (isNativeSet(shape)) {
    throw new TypeError('Sets do not support the set method.');
  }

  shape[key] = value;
  return shape;
}

function keys$1(shape) {
  return makeFrom$1(Namespace$1, 'Sequence')(shape).keys();
}

function values(shape) {
  return makeFrom$1(Namespace$1, 'Sequence')(shape).values();
}

function entries$1(shape) {
  return makeFrom$1(Namespace$1, 'Sequence')(shape).entries();
}

function Range() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  return new IndexedSequence((0, _range.default)({
    start: start,
    step: step,
    end: end
  }));
}

function Repeat(value) {
  var times = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Infinity;
  return new IndexedSequence((0, _repeat.default)(value, times));
}

function Seq(initial) {
  var seq = Sequence.from(initial);

  if (!seq) {
    throw new Error("Could not create a sequence out of ".concat(initial, "."));
  }

  return seq;
}

function IndexedSequenceFactory(iterable) {
  return new IndexedSequence(iterable);
}

Object.assign(IndexedSequenceFactory, IndexedSequence);

function KeyedSequenceFactory(iterable) {
  return new KeyedSequence(iterable);
}

Object.assign(KeyedSequenceFactory, KeyedSequence);

function SetSequenceFactory(iterable) {
  return new SetSequence(iterable);
}

Object.assign(SetSequenceFactory, SetSequence);
Seq.Indexed = IndexedSequenceFactory;
Seq.Keyed = KeyedSequenceFactory;
Seq.Set = SetSequenceFactory;
var index = {
  Seq: Seq,
  IndexedSequence: IndexedSequence,
  KeyedSequence: KeyedSequence,
  SetSequence: SetSequence,
  List: List$1,
  Map: Map$1,
  Set: Set$1,
  NativeMap: Map$2,
  NativeSet: Set$2,
  isCollection: isMutableCollection,
  isKeyed: isMutableKeyed,
  isIndexed: isMutableIndexed,
  isAssociative: isMutableAssociative,
  isSeq: isMutableSeq,
  isList: isMutableList,
  isMap: isMutableMap,
  isSet: isMutableSet,
  Range: Range,
  Repeat: Repeat,
  get: get,
  set: set,
  has: has,
  keys: keys$1,
  values: values,
  entries: entries$1
};
var _default = index;
exports.default = _default;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"@babel/runtime/helpers/assertThisInitialized":14,"@babel/runtime/helpers/classCallCheck":15,"@babel/runtime/helpers/createClass":16,"@babel/runtime/helpers/get":17,"@babel/runtime/helpers/getPrototypeOf":18,"@babel/runtime/helpers/inherits":19,"@babel/runtime/helpers/interopRequireDefault":20,"@babel/runtime/helpers/possibleConstructorReturn":25,"@babel/runtime/helpers/slicedToArray":27,"@babel/runtime/helpers/toConsumableArray":29,"@babel/runtime/regenerator":31,"invariant":106,"iter-tools/es5/compose":108,"iter-tools/es5/concat":109,"iter-tools/es5/entries":110,"iter-tools/es5/filter":111,"iter-tools/es5/flat":112,"iter-tools/es5/interpose":115,"iter-tools/es5/keys":116,"iter-tools/es5/map":117,"iter-tools/es5/range":118,"iter-tools/es5/reduce":119,"iter-tools/es5/repeat":120,"iter-tools/es5/size":121,"iter-tools/es5/slice":122,"iter-tools/es5/tap":123,"iter-tools/es5/zip":126,"iter-tools/es5/zip-all":124,"stable":177}],3:[function(require,module,exports){
module.exports = require("core-js/library/fn/get-iterator");
},{"core-js/library/fn/get-iterator":34}],4:[function(require,module,exports){
module.exports = require("core-js/library/fn/object/define-property");
},{"core-js/library/fn/object/define-property":35}],5:[function(require,module,exports){
module.exports = require("core-js/library/fn/symbol");
},{"core-js/library/fn/symbol":36}],6:[function(require,module,exports){
module.exports = require("core-js/library/fn/symbol/iterator");
},{"core-js/library/fn/symbol/iterator":37}],7:[function(require,module,exports){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
},{}],8:[function(require,module,exports){
var _Object$defineProperty = require("../core-js/object/define-property");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{"../core-js/object/define-property":4}],9:[function(require,module,exports){
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

module.exports = _interopRequireDefault;
},{}],10:[function(require,module,exports){
var _Symbol$iterator = require("../core-js/symbol/iterator");

var _Symbol = require("../core-js/symbol");

function _typeof2(obj) { if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof _Symbol === "function" && _typeof2(_Symbol$iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{"../core-js/symbol":5,"../core-js/symbol/iterator":6}],11:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":175}],12:[function(require,module,exports){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
},{}],13:[function(require,module,exports){
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

module.exports = _arrayWithoutHoles;
},{}],14:[function(require,module,exports){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;
},{}],15:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7}],16:[function(require,module,exports){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
},{}],17:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

var superPropBase = require("./superPropBase");

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    module.exports = _get = Reflect.get;
  } else {
    module.exports = _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

module.exports = _get;
},{"./getPrototypeOf":18,"./superPropBase":28}],18:[function(require,module,exports){
function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;
},{}],19:[function(require,module,exports){
var setPrototypeOf = require("./setPrototypeOf");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;
},{"./setPrototypeOf":26}],20:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"dup":9}],21:[function(require,module,exports){
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

module.exports = _iterableToArray;
},{}],22:[function(require,module,exports){
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;
},{}],23:[function(require,module,exports){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;
},{}],24:[function(require,module,exports){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

module.exports = _nonIterableSpread;
},{}],25:[function(require,module,exports){
var _typeof = require("../helpers/typeof");

var assertThisInitialized = require("./assertThisInitialized");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;
},{"../helpers/typeof":30,"./assertThisInitialized":14}],26:[function(require,module,exports){
function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;
},{}],27:[function(require,module,exports){
var arrayWithHoles = require("./arrayWithHoles");

var iterableToArrayLimit = require("./iterableToArrayLimit");

var nonIterableRest = require("./nonIterableRest");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
},{"./arrayWithHoles":12,"./iterableToArrayLimit":22,"./nonIterableRest":23}],28:[function(require,module,exports){
var getPrototypeOf = require("./getPrototypeOf");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

module.exports = _superPropBase;
},{"./getPrototypeOf":18}],29:[function(require,module,exports){
var arrayWithoutHoles = require("./arrayWithoutHoles");

var iterableToArray = require("./iterableToArray");

var nonIterableSpread = require("./nonIterableSpread");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
},{"./arrayWithoutHoles":13,"./iterableToArray":21,"./nonIterableSpread":24}],30:[function(require,module,exports){
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
},{}],31:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"dup":11,"regenerator-runtime":175}],32:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],33:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":32,"ieee754":104}],34:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":95,"../modules/es6.string.iterator":99,"../modules/web.dom.iterable":103}],35:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/_core":44,"../../modules/es6.object.define-property":97}],36:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/_core":44,"../../modules/es6.object.to-string":98,"../../modules/es6.symbol":100,"../../modules/es7.symbol.async-iterator":101,"../../modules/es7.symbol.observable":102}],37:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/_wks-ext":92,"../../modules/es6.string.iterator":99,"../../modules/web.dom.iterable":103}],38:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],39:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],40:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":60}],41:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":84,"./_to-iobject":86,"./_to-length":87}],42:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":43,"./_wks":93}],43:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],44:[function(require,module,exports){
var core = module.exports = { version: '2.6.0' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],45:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":38}],46:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],47:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":52}],48:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":53,"./_is-object":60}],49:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],50:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-gops":73,"./_object-keys":76,"./_object-pie":77}],51:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":44,"./_ctx":45,"./_global":53,"./_has":54,"./_hide":55}],52:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],53:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],54:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],55:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":47,"./_object-dp":68,"./_property-desc":78}],56:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":53}],57:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":47,"./_dom-create":48,"./_fails":52}],58:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":43}],59:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":43}],60:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],61:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":55,"./_object-create":67,"./_property-desc":78,"./_set-to-string-tag":80,"./_wks":93}],62:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":51,"./_hide":55,"./_iter-create":61,"./_iterators":64,"./_library":65,"./_object-gpo":74,"./_redefine":79,"./_set-to-string-tag":80,"./_wks":93}],63:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],64:[function(require,module,exports){
module.exports = {};

},{}],65:[function(require,module,exports){
module.exports = true;

},{}],66:[function(require,module,exports){
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_fails":52,"./_has":54,"./_is-object":60,"./_object-dp":68,"./_uid":90}],67:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":40,"./_dom-create":48,"./_enum-bug-keys":49,"./_html":56,"./_object-dps":69,"./_shared-key":81}],68:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":40,"./_descriptors":47,"./_ie8-dom-define":57,"./_to-primitive":89}],69:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":40,"./_descriptors":47,"./_object-dp":68,"./_object-keys":76}],70:[function(require,module,exports){
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_descriptors":47,"./_has":54,"./_ie8-dom-define":57,"./_object-pie":77,"./_property-desc":78,"./_to-iobject":86,"./_to-primitive":89}],71:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":72,"./_to-iobject":86}],72:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_enum-bug-keys":49,"./_object-keys-internal":75}],73:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;

},{}],74:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":54,"./_shared-key":81,"./_to-object":88}],75:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":41,"./_has":54,"./_shared-key":81,"./_to-iobject":86}],76:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":49,"./_object-keys-internal":75}],77:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;

},{}],78:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],79:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":55}],80:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":54,"./_object-dp":68,"./_wks":93}],81:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":82,"./_uid":90}],82:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":44,"./_global":53,"./_library":65}],83:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":46,"./_to-integer":85}],84:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":85}],85:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],86:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":46,"./_iobject":58}],87:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":85}],88:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":46}],89:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":60}],90:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],91:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_core":44,"./_global":53,"./_library":65,"./_object-dp":68,"./_wks-ext":92}],92:[function(require,module,exports){
exports.f = require('./_wks');

},{"./_wks":93}],93:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":53,"./_shared":82,"./_uid":90}],94:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":42,"./_core":44,"./_iterators":64,"./_wks":93}],95:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":40,"./_core":44,"./core.get-iterator-method":94}],96:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":39,"./_iter-define":62,"./_iter-step":63,"./_iterators":64,"./_to-iobject":86}],97:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_descriptors":47,"./_export":51,"./_object-dp":68}],98:[function(require,module,exports){

},{}],99:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":62,"./_string-at":83}],100:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_an-object":40,"./_descriptors":47,"./_enum-keys":50,"./_export":51,"./_fails":52,"./_global":53,"./_has":54,"./_hide":55,"./_is-array":59,"./_is-object":60,"./_library":65,"./_meta":66,"./_object-create":67,"./_object-dp":68,"./_object-gopd":70,"./_object-gopn":72,"./_object-gopn-ext":71,"./_object-gops":73,"./_object-keys":76,"./_object-pie":77,"./_property-desc":78,"./_redefine":79,"./_set-to-string-tag":80,"./_shared":82,"./_to-iobject":86,"./_to-primitive":89,"./_uid":90,"./_wks":93,"./_wks-define":91,"./_wks-ext":92}],101:[function(require,module,exports){
require('./_wks-define')('asyncIterator');

},{"./_wks-define":91}],102:[function(require,module,exports){
require('./_wks-define')('observable');

},{"./_wks-define":91}],103:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":53,"./_hide":55,"./_iterators":64,"./_wks":93,"./es6.array.iterator":96}],104:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],105:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Immutable = {})));
}(this, (function (exports) { 'use strict';

  // Used for setting prototype methods that IE8 chokes on.
  var DELETE = 'delete';

  // Constants describing the size of trie nodes.
  var SHIFT = 5; // Resulted in best performance after ______?
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;

  // A consistent shared value representing "not set" which equals nothing other
  // than itself, and nothing that could be provided externally.
  var NOT_SET = {};

  // Boolean references, Rough equivalent of `bool &`.
  function MakeRef() {
    return { value: false };
  }

  function SetRef(ref) {
    if (ref) {
      ref.value = true;
    }
  }

  // A function which returns a value representing an "owner" for transient writes
  // to tries. The return value will only ever equal itself, and will not equal
  // the return of any subsequent call of this function.
  function OwnerID() {}

  function ensureSize(iter) {
    if (iter.size === undefined) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }

  function wrapIndex(iter, index) {
    // This implements "is array index" which the ECMAString spec defines as:
    //
    //     A String property name P is an array index if and only if
    //     ToString(ToUint32(P)) is equal to P and ToUint32(P) is not equal
    //     to 2^32−1.
    //
    // http://www.ecma-international.org/ecma-262/6.0/#sec-array-exotic-objects
    if (typeof index !== 'number') {
      var uint32Index = index >>> 0; // N >>> 0 is shorthand for ToUint32
      if ('' + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }

  function returnTrue() {
    return true;
  }

  function wholeSlice(begin, end, size) {
    return (
      ((begin === 0 && !isNeg(begin)) ||
        (size !== undefined && begin <= -size)) &&
      (end === undefined || (size !== undefined && end >= size))
    );
  }

  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }

  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }

  function resolveIndex(index, size, defaultIndex) {
    // Sanitize indices using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    return index === undefined
      ? defaultIndex
      : isNeg(index)
        ? size === Infinity
          ? size
          : Math.max(0, size + index) | 0
        : size === undefined || size === index
          ? index
          : Math.min(size, index) | 0;
  }

  function isNeg(value) {
    // Account for -0 which is negative, but not less than 0.
    return value < 0 || (value === 0 && 1 / value === -Infinity);
  }

  // Note: value is unchanged to not break immutable-devtools.
  var IS_COLLECTION_SYMBOL = '@@__IMMUTABLE_ITERABLE__@@';

  function isCollection(maybeCollection) {
    return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
  }

  var IS_KEYED_SYMBOL = '@@__IMMUTABLE_KEYED__@@';

  function isKeyed(maybeKeyed) {
    return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
  }

  var IS_INDEXED_SYMBOL = '@@__IMMUTABLE_INDEXED__@@';

  function isIndexed(maybeIndexed) {
    return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
  }

  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }

  var Collection = function Collection(value) {
    return isCollection(value) ? value : Seq(value);
  };

  var KeyedCollection = (function (Collection) {
    function KeyedCollection(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }

    if ( Collection ) KeyedCollection.__proto__ = Collection;
    KeyedCollection.prototype = Object.create( Collection && Collection.prototype );
    KeyedCollection.prototype.constructor = KeyedCollection;

    return KeyedCollection;
  }(Collection));

  var IndexedCollection = (function (Collection) {
    function IndexedCollection(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }

    if ( Collection ) IndexedCollection.__proto__ = Collection;
    IndexedCollection.prototype = Object.create( Collection && Collection.prototype );
    IndexedCollection.prototype.constructor = IndexedCollection;

    return IndexedCollection;
  }(Collection));

  var SetCollection = (function (Collection) {
    function SetCollection(value) {
      return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
    }

    if ( Collection ) SetCollection.__proto__ = Collection;
    SetCollection.prototype = Object.create( Collection && Collection.prototype );
    SetCollection.prototype.constructor = SetCollection;

    return SetCollection;
  }(Collection));

  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;

  var IS_SEQ_SYMBOL = '@@__IMMUTABLE_SEQ__@@';

  function isSeq(maybeSeq) {
    return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
  }

  var IS_RECORD_SYMBOL = '@@__IMMUTABLE_RECORD__@@';

  function isRecord(maybeRecord) {
    return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
  }

  function isImmutable(maybeImmutable) {
    return isCollection(maybeImmutable) || isRecord(maybeImmutable);
  }

  var IS_ORDERED_SYMBOL = '@@__IMMUTABLE_ORDERED__@@';

  function isOrdered(maybeOrdered) {
    return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
  }

  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;

  var REAL_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator';

  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;

  var Iterator = function Iterator(next) {
    this.next = next;
  };

  Iterator.prototype.toString = function toString () {
    return '[Iterator]';
  };

  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;

  Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
    return this.toString();
  };
  Iterator.prototype[ITERATOR_SYMBOL] = function() {
    return this;
  };

  function iteratorValue(type, k, v, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v : [k, v];
    iteratorResult
      ? (iteratorResult.value = value)
      : (iteratorResult = {
          value: value,
          done: false,
        });
    return iteratorResult;
  }

  function iteratorDone() {
    return { value: undefined, done: true };
  }

  function hasIterator(maybeIterable) {
    return !!getIteratorFn(maybeIterable);
  }

  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === 'function';
  }

  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }

  function getIteratorFn(iterable) {
    var iteratorFn =
      iterable &&
      ((REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL]) ||
        iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  var hasOwnProperty = Object.prototype.hasOwnProperty;

  function isArrayLike(value) {
    if (Array.isArray(value) || typeof value === 'string') {
      return true;
    }

    return (
      value &&
      typeof value === 'object' &&
      Number.isInteger(value.length) &&
      value.length >= 0 &&
      (value.length === 0
        ? // Only {length: 0} is considered Array-like.
          Object.keys(value).length === 1
        : // An object is only Array-like if it has a property where the last value
          // in the array-like may be found (which could be undefined).
          value.hasOwnProperty(value.length - 1))
    );
  }

  var Seq = (function (Collection$$1) {
    function Seq(value) {
      return value === null || value === undefined
        ? emptySequence()
        : isImmutable(value)
          ? value.toSeq()
          : seqFromValue(value);
    }

    if ( Collection$$1 ) Seq.__proto__ = Collection$$1;
    Seq.prototype = Object.create( Collection$$1 && Collection$$1.prototype );
    Seq.prototype.constructor = Seq;

    Seq.prototype.toSeq = function toSeq () {
      return this;
    };

    Seq.prototype.toString = function toString () {
      return this.__toString('Seq {', '}');
    };

    Seq.prototype.cacheResult = function cacheResult () {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };

    // abstract __iterateUncached(fn, reverse)

    Seq.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var cache = this._cache;
      if (cache) {
        var size = cache.length;
        var i = 0;
        while (i !== size) {
          var entry = cache[reverse ? size - ++i : i++];
          if (fn(entry[1], entry[0], this$1) === false) {
            break;
          }
        }
        return i;
      }
      return this.__iterateUncached(fn, reverse);
    };

    // abstract __iteratorUncached(type, reverse)

    Seq.prototype.__iterator = function __iterator (type, reverse) {
      var cache = this._cache;
      if (cache) {
        var size = cache.length;
        var i = 0;
        return new Iterator(function () {
          if (i === size) {
            return iteratorDone();
          }
          var entry = cache[reverse ? size - ++i : i++];
          return iteratorValue(type, entry[0], entry[1]);
        });
      }
      return this.__iteratorUncached(type, reverse);
    };

    return Seq;
  }(Collection));

  var KeyedSeq = (function (Seq) {
    function KeyedSeq(value) {
      return value === null || value === undefined
        ? emptySequence().toKeyedSeq()
        : isCollection(value)
          ? isKeyed(value)
            ? value.toSeq()
            : value.fromEntrySeq()
          : isRecord(value)
            ? value.toSeq()
            : keyedSeqFromValue(value);
    }

    if ( Seq ) KeyedSeq.__proto__ = Seq;
    KeyedSeq.prototype = Object.create( Seq && Seq.prototype );
    KeyedSeq.prototype.constructor = KeyedSeq;

    KeyedSeq.prototype.toKeyedSeq = function toKeyedSeq () {
      return this;
    };

    return KeyedSeq;
  }(Seq));

  var IndexedSeq = (function (Seq) {
    function IndexedSeq(value) {
      return value === null || value === undefined
        ? emptySequence()
        : isCollection(value)
          ? isKeyed(value)
            ? value.entrySeq()
            : value.toIndexedSeq()
          : isRecord(value)
            ? value.toSeq().entrySeq()
            : indexedSeqFromValue(value);
    }

    if ( Seq ) IndexedSeq.__proto__ = Seq;
    IndexedSeq.prototype = Object.create( Seq && Seq.prototype );
    IndexedSeq.prototype.constructor = IndexedSeq;

    IndexedSeq.of = function of (/*...values*/) {
      return IndexedSeq(arguments);
    };

    IndexedSeq.prototype.toIndexedSeq = function toIndexedSeq () {
      return this;
    };

    IndexedSeq.prototype.toString = function toString () {
      return this.__toString('Seq [', ']');
    };

    return IndexedSeq;
  }(Seq));

  var SetSeq = (function (Seq) {
    function SetSeq(value) {
      return (isCollection(value) && !isAssociative(value)
        ? value
        : IndexedSeq(value)
      ).toSetSeq();
    }

    if ( Seq ) SetSeq.__proto__ = Seq;
    SetSeq.prototype = Object.create( Seq && Seq.prototype );
    SetSeq.prototype.constructor = SetSeq;

    SetSeq.of = function of (/*...values*/) {
      return SetSeq(arguments);
    };

    SetSeq.prototype.toSetSeq = function toSetSeq () {
      return this;
    };

    return SetSeq;
  }(Seq));

  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;

  Seq.prototype[IS_SEQ_SYMBOL] = true;

  // #pragma Root Sequences

  var ArraySeq = (function (IndexedSeq) {
    function ArraySeq(array) {
      this._array = array;
      this.size = array.length;
    }

    if ( IndexedSeq ) ArraySeq.__proto__ = IndexedSeq;
    ArraySeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
    ArraySeq.prototype.constructor = ArraySeq;

    ArraySeq.prototype.get = function get (index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };

    ArraySeq.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var array = this._array;
      var size = array.length;
      var i = 0;
      while (i !== size) {
        var ii = reverse ? size - ++i : i++;
        if (fn(array[ii], ii, this$1) === false) {
          break;
        }
      }
      return i;
    };

    ArraySeq.prototype.__iterator = function __iterator (type, reverse) {
      var array = this._array;
      var size = array.length;
      var i = 0;
      return new Iterator(function () {
        if (i === size) {
          return iteratorDone();
        }
        var ii = reverse ? size - ++i : i++;
        return iteratorValue(type, ii, array[ii]);
      });
    };

    return ArraySeq;
  }(IndexedSeq));

  var ObjectSeq = (function (KeyedSeq) {
    function ObjectSeq(object) {
      var keys = Object.keys(object);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }

    if ( KeyedSeq ) ObjectSeq.__proto__ = KeyedSeq;
    ObjectSeq.prototype = Object.create( KeyedSeq && KeyedSeq.prototype );
    ObjectSeq.prototype.constructor = ObjectSeq;

    ObjectSeq.prototype.get = function get (key, notSetValue) {
      if (notSetValue !== undefined && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };

    ObjectSeq.prototype.has = function has (key) {
      return hasOwnProperty.call(this._object, key);
    };

    ObjectSeq.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var object = this._object;
      var keys = this._keys;
      var size = keys.length;
      var i = 0;
      while (i !== size) {
        var key = keys[reverse ? size - ++i : i++];
        if (fn(object[key], key, this$1) === false) {
          break;
        }
      }
      return i;
    };

    ObjectSeq.prototype.__iterator = function __iterator (type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var size = keys.length;
      var i = 0;
      return new Iterator(function () {
        if (i === size) {
          return iteratorDone();
        }
        var key = keys[reverse ? size - ++i : i++];
        return iteratorValue(type, key, object[key]);
      });
    };

    return ObjectSeq;
  }(KeyedSeq));
  ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;

  var CollectionSeq = (function (IndexedSeq) {
    function CollectionSeq(collection) {
      this._collection = collection;
      this.size = collection.length || collection.size;
    }

    if ( IndexedSeq ) CollectionSeq.__proto__ = IndexedSeq;
    CollectionSeq.prototype = Object.create( IndexedSeq && IndexedSeq.prototype );
    CollectionSeq.prototype.constructor = CollectionSeq;

    CollectionSeq.prototype.__iterateUncached = function __iterateUncached (fn, reverse) {
      var this$1 = this;

      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var collection = this._collection;
      var iterator = getIterator(collection);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this$1) === false) {
            break;
          }
        }
      }
      return iterations;
    };

    CollectionSeq.prototype.__iteratorUncached = function __iteratorUncached (type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var collection = this._collection;
      var iterator = getIterator(collection);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function () {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };

    return CollectionSeq;
  }(IndexedSeq));

  // # pragma Helper functions

  var EMPTY_SEQ;

  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }

  function keyedSeqFromValue(value) {
    var seq = Array.isArray(value)
      ? new ArraySeq(value)
      : hasIterator(value)
        ? new CollectionSeq(value)
        : undefined;
    if (seq) {
      return seq.fromEntrySeq();
    }
    if (typeof value === 'object') {
      return new ObjectSeq(value);
    }
    throw new TypeError(
      'Expected Array or collection object of [k, v] entries, or keyed object: ' +
        value
    );
  }

  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return seq;
    }
    throw new TypeError(
      'Expected Array or collection object of values: ' + value
    );
  }

  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return seq;
    }
    if (typeof value === 'object') {
      return new ObjectSeq(value);
    }
    throw new TypeError(
      'Expected Array or collection object of values, or keyed object: ' + value
    );
  }

  function maybeIndexedSeqFromValue(value) {
    return isArrayLike(value)
      ? new ArraySeq(value)
      : hasIterator(value)
        ? new CollectionSeq(value)
        : undefined;
  }

  var IS_MAP_SYMBOL = '@@__IMMUTABLE_MAP__@@';

  function isMap(maybeMap) {
    return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
  }

  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }

  function isValueObject(maybeValue) {
    return Boolean(
      maybeValue &&
        typeof maybeValue.equals === 'function' &&
        typeof maybeValue.hashCode === 'function'
    );
  }

  /**
   * An extension of the "same-value" algorithm as [described for use by ES6 Map
   * and Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map#Key_equality)
   *
   * NaN is considered the same as NaN, however -0 and 0 are considered the same
   * value, which is different from the algorithm described by
   * [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is).
   *
   * This is extended further to allow Objects to describe the values they
   * represent, by way of `valueOf` or `equals` (and `hashCode`).
   *
   * Note: because of this extension, the key equality of Immutable.Map and the
   * value equality of Immutable.Set will differ from ES6 Map and Set.
   *
   * ### Defining custom values
   *
   * The easiest way to describe the value an object represents is by implementing
   * `valueOf`. For example, `Date` represents a value by returning a unix
   * timestamp for `valueOf`:
   *
   *     var date1 = new Date(1234567890000); // Fri Feb 13 2009 ...
   *     var date2 = new Date(1234567890000);
   *     date1.valueOf(); // 1234567890000
   *     assert( date1 !== date2 );
   *     assert( Immutable.is( date1, date2 ) );
   *
   * Note: overriding `valueOf` may have other implications if you use this object
   * where JavaScript expects a primitive, such as implicit string coercion.
   *
   * For more complex types, especially collections, implementing `valueOf` may
   * not be performant. An alternative is to implement `equals` and `hashCode`.
   *
   * `equals` takes another object, presumably of similar type, and returns true
   * if it is equal. Equality is symmetrical, so the same result should be
   * returned if this and the argument are flipped.
   *
   *     assert( a.equals(b) === b.equals(a) );
   *
   * `hashCode` returns a 32bit integer number representing the object which will
   * be used to determine how to store the value object in a Map or Set. You must
   * provide both or neither methods, one must not exist without the other.
   *
   * Also, an important relationship between these methods must be upheld: if two
   * values are equal, they *must* return the same hashCode. If the values are not
   * equal, they might have the same hashCode; this is called a hash collision,
   * and while undesirable for performance reasons, it is acceptable.
   *
   *     if (a.equals(b)) {
   *       assert( a.hashCode() === b.hashCode() );
   *     }
   *
   * All Immutable collections are Value Objects: they implement `equals()`
   * and `hashCode()`.
   */
  function is(valueA, valueB) {
    if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (
      typeof valueA.valueOf === 'function' &&
      typeof valueB.valueOf === 'function'
    ) {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || (valueA !== valueA && valueB !== valueB)) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    return !!(
      isValueObject(valueA) &&
      isValueObject(valueB) &&
      valueA.equals(valueB)
    );
  }

  var imul =
    typeof Math.imul === 'function' && Math.imul(0xffffffff, 2) === -2
      ? Math.imul
      : function imul(a, b) {
          a |= 0; // int
          b |= 0; // int
          var c = a & 0xffff;
          var d = b & 0xffff;
          // Shift by 0 fixes the sign on the high part.
          return (c * d + ((((a >>> 16) * d + c * (b >>> 16)) << 16) >>> 0)) | 0; // int
        };

  // v8 has an optimization for storing 31-bit signed numbers.
  // Values which have either 00 or 11 as the high order bits qualify.
  // This function drops the highest order bit in a signed number, maintaining
  // the sign bit.
  function smi(i32) {
    return ((i32 >>> 1) & 0x40000000) | (i32 & 0xbfffffff);
  }

  function hash(o) {
    if (o === false || o === null || o === undefined) {
      return 0;
    }
    if (typeof o.valueOf === 'function') {
      o = o.valueOf();
      if (o === false || o === null || o === undefined) {
        return 0;
      }
    }
    if (o === true) {
      return 1;
    }
    var type = typeof o;
    if (type === 'number') {
      if (o !== o || o === Infinity) {
        return 0;
      }
      var h = o | 0;
      if (h !== o) {
        h ^= o * 0xffffffff;
      }
      while (o > 0xffffffff) {
        o /= 0xffffffff;
        h ^= o;
      }
      return smi(h);
    }
    if (type === 'string') {
      return o.length > STRING_HASH_CACHE_MIN_STRLEN
        ? cachedHashString(o)
        : hashString(o);
    }
    if (typeof o.hashCode === 'function') {
      // Drop any high bits from accidentally long hash codes.
      return smi(o.hashCode());
    }
    if (type === 'object' || type === 'function') {
      return hashJSObj(o);
    }
    if (typeof o.toString === 'function') {
      return hashString(o.toString());
    }
    throw new Error('Value type ' + type + ' cannot be hashed.');
  }

  function cachedHashString(string) {
    var hashed = stringHashCache[string];
    if (hashed === undefined) {
      hashed = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hashed;
    }
    return hashed;
  }

  // http://jsperf.com/hashing-strings
  function hashString(string) {
    // This is the hash from JVM
    // The hash code for a string is computed as
    // s[0] * 31 ^ (n - 1) + s[1] * 31 ^ (n - 2) + ... + s[n - 1],
    // where s[i] is the ith character of the string and n is the length of
    // the string. We "mod" the result to make it between 0 (inclusive) and 2^31
    // (exclusive) by dropping high bits.
    var hashed = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hashed = (31 * hashed + string.charCodeAt(ii)) | 0;
    }
    return smi(hashed);
  }

  function hashJSObj(obj) {
    var hashed;
    if (usingWeakMap) {
      hashed = weakMap.get(obj);
      if (hashed !== undefined) {
        return hashed;
      }
    }

    hashed = obj[UID_HASH_KEY];
    if (hashed !== undefined) {
      return hashed;
    }

    if (!canDefineProperty) {
      hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hashed !== undefined) {
        return hashed;
      }

      hashed = getIENodeHash(obj);
      if (hashed !== undefined) {
        return hashed;
      }
    }

    hashed = ++objHashUID;
    if (objHashUID & 0x40000000) {
      objHashUID = 0;
    }

    if (usingWeakMap) {
      weakMap.set(obj, hashed);
    } else if (isExtensible !== undefined && isExtensible(obj) === false) {
      throw new Error('Non-extensible objects are not allowed as keys.');
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: hashed,
      });
    } else if (
      obj.propertyIsEnumerable !== undefined &&
      obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable
    ) {
      // Since we can't define a non-enumerable property on the object
      // we'll hijack one of the less-used non-enumerable properties to
      // save our hash on it. Since this is a function it will not show up in
      // `JSON.stringify` which is what we want.
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(
          this,
          arguments
        );
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
    } else if (obj.nodeType !== undefined) {
      // At this point we couldn't get the IE `uniqueID` to use as a hash
      // and we couldn't use a non-enumerable property to exploit the
      // dontEnum bug so we simply add the `UID_HASH_KEY` on the node
      // itself.
      obj[UID_HASH_KEY] = hashed;
    } else {
      throw new Error('Unable to set a non-enumerable property on object.');
    }

    return hashed;
  }

  // Get references to ES5 object methods.
  var isExtensible = Object.isExtensible;

  // True if Object.defineProperty works as expected. IE8 fails this test.
  var canDefineProperty = (function() {
    try {
      Object.defineProperty({}, '@', {});
      return true;
    } catch (e) {
      return false;
    }
  })();

  // IE has a `uniqueID` property on DOM nodes. We can construct the hash from it
  // and avoid memory leaks from the IE cloneNode bug.
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1: // Element
          return node.uniqueID;
        case 9: // Document
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }

  // If possible, use a WeakMap.
  var usingWeakMap = typeof WeakMap === 'function';
  var weakMap;
  if (usingWeakMap) {
    weakMap = new WeakMap();
  }

  var objHashUID = 0;

  var UID_HASH_KEY = '__immutablehash__';
  if (typeof Symbol === 'function') {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }

  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};

  var ToKeyedSequence = (function (KeyedSeq$$1) {
    function ToKeyedSequence(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }

    if ( KeyedSeq$$1 ) ToKeyedSequence.__proto__ = KeyedSeq$$1;
    ToKeyedSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
    ToKeyedSequence.prototype.constructor = ToKeyedSequence;

    ToKeyedSequence.prototype.get = function get (key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };

    ToKeyedSequence.prototype.has = function has (key) {
      return this._iter.has(key);
    };

    ToKeyedSequence.prototype.valueSeq = function valueSeq () {
      return this._iter.valueSeq();
    };

    ToKeyedSequence.prototype.reverse = function reverse () {
      var this$1 = this;

      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function () { return this$1._iter.toSeq().reverse(); };
      }
      return reversedSequence;
    };

    ToKeyedSequence.prototype.map = function map (mapper, context) {
      var this$1 = this;

      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function () { return this$1._iter.toSeq().map(mapper, context); };
      }
      return mappedSequence;
    };

    ToKeyedSequence.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      return this._iter.__iterate(function (v, k) { return fn(v, k, this$1); }, reverse);
    };

    ToKeyedSequence.prototype.__iterator = function __iterator (type, reverse) {
      return this._iter.__iterator(type, reverse);
    };

    return ToKeyedSequence;
  }(KeyedSeq));
  ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;

  var ToIndexedSequence = (function (IndexedSeq$$1) {
    function ToIndexedSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    if ( IndexedSeq$$1 ) ToIndexedSequence.__proto__ = IndexedSeq$$1;
    ToIndexedSequence.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
    ToIndexedSequence.prototype.constructor = ToIndexedSequence;

    ToIndexedSequence.prototype.includes = function includes (value) {
      return this._iter.includes(value);
    };

    ToIndexedSequence.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var i = 0;
      reverse && ensureSize(this);
      return this._iter.__iterate(
        function (v) { return fn(v, reverse ? this$1.size - ++i : i++, this$1); },
        reverse
      );
    };

    ToIndexedSequence.prototype.__iterator = function __iterator (type, reverse) {
      var this$1 = this;

      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var i = 0;
      reverse && ensureSize(this);
      return new Iterator(function () {
        var step = iterator.next();
        return step.done
          ? step
          : iteratorValue(
              type,
              reverse ? this$1.size - ++i : i++,
              step.value,
              step
            );
      });
    };

    return ToIndexedSequence;
  }(IndexedSeq));

  var ToSetSequence = (function (SetSeq$$1) {
    function ToSetSequence(iter) {
      this._iter = iter;
      this.size = iter.size;
    }

    if ( SetSeq$$1 ) ToSetSequence.__proto__ = SetSeq$$1;
    ToSetSequence.prototype = Object.create( SetSeq$$1 && SetSeq$$1.prototype );
    ToSetSequence.prototype.constructor = ToSetSequence;

    ToSetSequence.prototype.has = function has (key) {
      return this._iter.includes(key);
    };

    ToSetSequence.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      return this._iter.__iterate(function (v) { return fn(v, v, this$1); }, reverse);
    };

    ToSetSequence.prototype.__iterator = function __iterator (type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        return step.done
          ? step
          : iteratorValue(type, step.value, step.value, step);
      });
    };

    return ToSetSequence;
  }(SetSeq));

  var FromEntriesSequence = (function (KeyedSeq$$1) {
    function FromEntriesSequence(entries) {
      this._iter = entries;
      this.size = entries.size;
    }

    if ( KeyedSeq$$1 ) FromEntriesSequence.__proto__ = KeyedSeq$$1;
    FromEntriesSequence.prototype = Object.create( KeyedSeq$$1 && KeyedSeq$$1.prototype );
    FromEntriesSequence.prototype.constructor = FromEntriesSequence;

    FromEntriesSequence.prototype.entrySeq = function entrySeq () {
      return this._iter.toSeq();
    };

    FromEntriesSequence.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      return this._iter.__iterate(function (entry) {
        // Check if entry exists first so array access doesn't throw for holes
        // in the parent iteration.
        if (entry) {
          validateEntry(entry);
          var indexedCollection = isCollection(entry);
          return fn(
            indexedCollection ? entry.get(1) : entry[1],
            indexedCollection ? entry.get(0) : entry[0],
            this$1
          );
        }
      }, reverse);
    };

    FromEntriesSequence.prototype.__iterator = function __iterator (type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function () {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          // Check if entry exists first so array access doesn't throw for holes
          // in the parent iteration.
          if (entry) {
            validateEntry(entry);
            var indexedCollection = isCollection(entry);
            return iteratorValue(
              type,
              indexedCollection ? entry.get(0) : entry[0],
              indexedCollection ? entry.get(1) : entry[1],
              step
            );
          }
        }
      });
    };

    return FromEntriesSequence;
  }(KeyedSeq));

  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;

  function flipFactory(collection) {
    var flipSequence = makeSequence(collection);
    flipSequence._iter = collection;
    flipSequence.size = collection.size;
    flipSequence.flip = function () { return collection; };
    flipSequence.reverse = function() {
      var reversedSequence = collection.reverse.apply(this); // super.reverse()
      reversedSequence.flip = function () { return collection.reverse(); };
      return reversedSequence;
    };
    flipSequence.has = function (key) { return collection.includes(key); };
    flipSequence.includes = function (key) { return collection.has(key); };
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function(fn, reverse) {
      var this$1 = this;

      return collection.__iterate(function (v, k) { return fn(k, v, this$1) !== false; }, reverse);
    };
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = collection.__iterator(type, reverse);
        return new Iterator(function () {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return collection.__iterator(
        type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES,
        reverse
      );
    };
    return flipSequence;
  }

  function mapFactory(collection, mapper, context) {
    var mappedSequence = makeSequence(collection);
    mappedSequence.size = collection.size;
    mappedSequence.has = function (key) { return collection.has(key); };
    mappedSequence.get = function (key, notSetValue) {
      var v = collection.get(key, NOT_SET);
      return v === NOT_SET
        ? notSetValue
        : mapper.call(context, v, key, collection);
    };
    mappedSequence.__iterateUncached = function(fn, reverse) {
      var this$1 = this;

      return collection.__iterate(
        function (v, k, c) { return fn(mapper.call(context, v, k, c), k, this$1) !== false; },
        reverse
      );
    };
    mappedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function () {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(
          type,
          key,
          mapper.call(context, entry[1], key, collection),
          step
        );
      });
    };
    return mappedSequence;
  }

  function reverseFactory(collection, useKeys) {
    var this$1 = this;

    var reversedSequence = makeSequence(collection);
    reversedSequence._iter = collection;
    reversedSequence.size = collection.size;
    reversedSequence.reverse = function () { return collection; };
    if (collection.flip) {
      reversedSequence.flip = function() {
        var flipSequence = flipFactory(collection);
        flipSequence.reverse = function () { return collection.flip(); };
        return flipSequence;
      };
    }
    reversedSequence.get = function (key, notSetValue) { return collection.get(useKeys ? key : -1 - key, notSetValue); };
    reversedSequence.has = function (key) { return collection.has(useKeys ? key : -1 - key); };
    reversedSequence.includes = function (value) { return collection.includes(value); };
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function(fn, reverse) {
      var this$1 = this;

      var i = 0;
      reverse && ensureSize(collection);
      return collection.__iterate(
        function (v, k) { return fn(v, useKeys ? k : reverse ? this$1.size - ++i : i++, this$1); },
        !reverse
      );
    };
    reversedSequence.__iterator = function (type, reverse) {
      var i = 0;
      reverse && ensureSize(collection);
      var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);
      return new Iterator(function () {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        return iteratorValue(
          type,
          useKeys ? entry[0] : reverse ? this$1.size - ++i : i++,
          entry[1],
          step
        );
      });
    };
    return reversedSequence;
  }

  function filterFactory(collection, predicate, context, useKeys) {
    var filterSequence = makeSequence(collection);
    if (useKeys) {
      filterSequence.has = function (key) {
        var v = collection.get(key, NOT_SET);
        return v !== NOT_SET && !!predicate.call(context, v, key, collection);
      };
      filterSequence.get = function (key, notSetValue) {
        var v = collection.get(key, NOT_SET);
        return v !== NOT_SET && predicate.call(context, v, key, collection)
          ? v
          : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function(fn, reverse) {
      var this$1 = this;

      var iterations = 0;
      collection.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$1);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function(type, reverse) {
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function () {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, collection)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }

  function countByFactory(collection, grouper, context) {
    var groups = Map().asMutable();
    collection.__iterate(function (v, k) {
      groups.update(grouper.call(context, v, k, collection), 0, function (a) { return a + 1; });
    });
    return groups.asImmutable();
  }

  function groupByFactory(collection, grouper, context) {
    var isKeyedIter = isKeyed(collection);
    var groups = (isOrdered(collection) ? OrderedMap() : Map()).asMutable();
    collection.__iterate(function (v, k) {
      groups.update(
        grouper.call(context, v, k, collection),
        function (a) { return ((a = a || []), a.push(isKeyedIter ? [k, v] : v), a); }
      );
    });
    var coerce = collectionClass(collection);
    return groups.map(function (arr) { return reify(collection, coerce(arr)); }).asImmutable();
  }

  function sliceFactory(collection, begin, end, useKeys) {
    var originalSize = collection.size;

    if (wholeSlice(begin, end, originalSize)) {
      return collection;
    }

    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);

    // begin or end will be NaN if they were provided as negative numbers and
    // this collection's size is unknown. In that case, cache first so there is
    // a known size and these do not resolve to NaN.
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
    }

    // Note: resolvedEnd is undefined when the original sequence's length is
    // unknown and this slice did not supply an end and should contain all
    // elements after resolvedBegin.
    // In that case, resolvedSize will be NaN and sliceSize will remain undefined.
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }

    var sliceSeq = makeSequence(collection);

    // If collection.size is undefined, the size of the realized sliceSeq is
    // unknown at this point unless the number of items to slice is 0
    sliceSeq.size =
      sliceSize === 0 ? sliceSize : (collection.size && sliceSize) || undefined;

    if (!useKeys && isSeq(collection) && sliceSize >= 0) {
      sliceSeq.get = function(index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize
          ? collection.get(index + resolvedBegin, notSetValue)
          : notSetValue;
      };
    }

    sliceSeq.__iterateUncached = function(fn, reverse) {
      var this$1 = this;

      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      collection.__iterate(function (v, k) {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return (
            fn(v, useKeys ? k : iterations - 1, this$1) !== false &&
            iterations !== sliceSize
          );
        }
      });
      return iterations;
    };

    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      // Don't bother instantiating parent iterator if taking 0.
      if (sliceSize === 0) {
        return new Iterator(iteratorDone);
      }
      var iterator = collection.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function () {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES || step.done) {
          return step;
        }
        if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, undefined, step);
        }
        return iteratorValue(type, iterations - 1, step.value[1], step);
      });
    };

    return sliceSeq;
  }

  function takeWhileFactory(collection, predicate, context) {
    var takeSequence = makeSequence(collection);
    takeSequence.__iterateUncached = function(fn, reverse) {
      var this$1 = this;

      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      collection.__iterate(
        function (v, k, c) { return predicate.call(context, v, k, c) && ++iterations && fn(v, k, this$1); }
      );
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {
      var this$1 = this;

      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function () {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v = entry[1];
        if (!predicate.call(context, v, k, this$1)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return takeSequence;
  }

  function skipWhileFactory(collection, predicate, context, useKeys) {
    var skipSequence = makeSequence(collection);
    skipSequence.__iterateUncached = function(fn, reverse) {
      var this$1 = this;

      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      collection.__iterate(function (v, k, c) {
        if (!(isSkipping && (isSkipping = predicate.call(context, v, k, c)))) {
          iterations++;
          return fn(v, useKeys ? k : iterations - 1, this$1);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {
      var this$1 = this;

      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function () {
        var step;
        var k;
        var v;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            }
            if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, undefined, step);
            }
            return iteratorValue(type, iterations++, step.value[1], step);
          }
          var entry = step.value;
          k = entry[0];
          v = entry[1];
          skipping && (skipping = predicate.call(context, v, k, this$1));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v, step);
      });
    };
    return skipSequence;
  }

  function concatFactory(collection, values) {
    var isKeyedCollection = isKeyed(collection);
    var iters = [collection]
      .concat(values)
      .map(function (v) {
        if (!isCollection(v)) {
          v = isKeyedCollection
            ? keyedSeqFromValue(v)
            : indexedSeqFromValue(Array.isArray(v) ? v : [v]);
        } else if (isKeyedCollection) {
          v = KeyedCollection(v);
        }
        return v;
      })
      .filter(function (v) { return v.size !== 0; });

    if (iters.length === 0) {
      return collection;
    }

    if (iters.length === 1) {
      var singleton = iters[0];
      if (
        singleton === collection ||
        (isKeyedCollection && isKeyed(singleton)) ||
        (isIndexed(collection) && isIndexed(singleton))
      ) {
        return singleton;
      }
    }

    var concatSeq = new ArraySeq(iters);
    if (isKeyedCollection) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(collection)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(function (sum, seq) {
      if (sum !== undefined) {
        var size = seq.size;
        if (size !== undefined) {
          return sum + size;
        }
      }
    }, 0);
    return concatSeq;
  }

  function flattenFactory(collection, depth, useKeys) {
    var flatSequence = makeSequence(collection);
    flatSequence.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {
        iter.__iterate(function (v, k) {
          if ((!depth || currentDepth < depth) && isCollection(v)) {
            flatDeep(v, currentDepth + 1);
          } else {
            iterations++;
            if (fn(v, useKeys ? k : iterations - 1, flatSequence) === false) {
              stopped = true;
            }
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(collection, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = collection.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function () {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v = step.value;
          if (type === ITERATE_ENTRIES) {
            v = v[1];
          }
          if ((!depth || stack.length < depth) && isCollection(v)) {
            stack.push(iterator);
            iterator = v.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }

  function flatMapFactory(collection, mapper, context) {
    var coerce = collectionClass(collection);
    return collection
      .toSeq()
      .map(function (v, k) { return coerce(mapper.call(context, v, k, collection)); })
      .flatten(true);
  }

  function interposeFactory(collection, separator) {
    var interposedSequence = makeSequence(collection);
    interposedSequence.size = collection.size && collection.size * 2 - 1;
    interposedSequence.__iterateUncached = function(fn, reverse) {
      var this$1 = this;

      var iterations = 0;
      collection.__iterate(
        function (v) { return (!iterations || fn(separator, iterations++, this$1) !== false) &&
          fn(v, iterations++, this$1) !== false; },
        reverse
      );
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = collection.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function () {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2
          ? iteratorValue(type, iterations++, separator)
          : iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }

  function sortFactory(collection, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedCollection = isKeyed(collection);
    var index = 0;
    var entries = collection
      .toSeq()
      .map(function (v, k) { return [k, v, index++, mapper ? mapper(v, k, collection) : v]; })
      .valueSeq()
      .toArray();
    entries.sort(function (a, b) { return comparator(a[3], b[3]) || a[2] - b[2]; }).forEach(
      isKeyedCollection
        ? function (v, i) {
            entries[i].length = 2;
          }
        : function (v, i) {
            entries[i] = v[1];
          }
    );
    return isKeyedCollection
      ? KeyedSeq(entries)
      : isIndexed(collection)
        ? IndexedSeq(entries)
        : SetSeq(entries);
  }

  function maxFactory(collection, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = collection
        .toSeq()
        .map(function (v, k) { return [v, mapper(v, k, collection)]; })
        .reduce(function (a, b) { return (maxCompare(comparator, a[1], b[1]) ? b : a); });
      return entry && entry[0];
    }
    return collection.reduce(function (a, b) { return (maxCompare(comparator, a, b) ? b : a); });
  }

  function maxCompare(comparator, a, b) {
    var comp = comparator(b, a);
    // b is considered the new max if the comparator declares them equal, but
    // they are not equal and b is in fact a nullish value.
    return (
      (comp === 0 && b !== a && (b === undefined || b === null || b !== b)) ||
      comp > 0
    );
  }

  function zipWithFactory(keyIter, zipper, iters, zipAll) {
    var zipSequence = makeSequence(keyIter);
    var sizes = new ArraySeq(iters).map(function (i) { return i.size; });
    zipSequence.size = zipAll ? sizes.max() : sizes.min();
    // Note: this a generic base implementation of __iterate in terms of
    // __iterator which may be more generically useful in the future.
    zipSequence.__iterate = function(fn, reverse) {
      var this$1 = this;

      /* generic:
      var iterator = this.__iterator(ITERATE_ENTRIES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        iterations++;
        if (fn(step.value[1], step.value[0], this) === false) {
          break;
        }
      }
      return iterations;
      */
      // indexed:
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this$1) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(
        function (i) { return ((i = Collection(i)), getIterator(reverse ? i.reverse() : i)); }
      );
      var iterations = 0;
      var isDone = false;
      return new Iterator(function () {
        var steps;
        if (!isDone) {
          steps = iterators.map(function (i) { return i.next(); });
          isDone = zipAll ? steps.every(function (s) { return s.done; }) : steps.some(function (s) { return s.done; });
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(
          type,
          iterations++,
          zipper.apply(null, steps.map(function (s) { return s.value; }))
        );
      });
    };
    return zipSequence;
  }

  // #pragma Helper Functions

  function reify(iter, seq) {
    return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
  }

  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError('Expected [K, V] tuple: ' + entry);
    }
  }

  function collectionClass(collection) {
    return isKeyed(collection)
      ? KeyedCollection
      : isIndexed(collection)
        ? IndexedCollection
        : SetCollection;
  }

  function makeSequence(collection) {
    return Object.create(
      (isKeyed(collection)
        ? KeyedSeq
        : isIndexed(collection)
          ? IndexedSeq
          : SetSeq
      ).prototype
    );
  }

  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    }
    return Seq.prototype.cacheResult.call(this);
  }

  function defaultComparator(a, b) {
    if (a === undefined && b === undefined) {
      return 0;
    }

    if (a === undefined) {
      return 1;
    }

    if (b === undefined) {
      return -1;
    }

    return a > b ? 1 : a < b ? -1 : 0;
  }

  // http://jsperf.com/copy-array-inline
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }

  function invariant(condition, error) {
    if (!condition) { throw new Error(error); }
  }

  function assertNotInfinite(size) {
    invariant(
      size !== Infinity,
      'Cannot perform this action with an infinite size.'
    );
  }

  function coerceKeyPath(keyPath) {
    if (isArrayLike(keyPath) && typeof keyPath !== 'string') {
      return keyPath;
    }
    if (isOrdered(keyPath)) {
      return keyPath.toArray();
    }
    throw new TypeError(
      'Invalid keyPath: expected Ordered Collection or Array: ' + keyPath
    );
  }

  function isPlainObj(value) {
    return (
      value &&
      ((value.constructor && value.constructor.name === 'Object') ||
        value.constructor === undefined)
    );
  }

  /**
   * Returns true if the value is a potentially-persistent data structure, either
   * provided by Immutable.js or a plain Array or Object.
   */
  function isDataStructure(value) {
    return (
      typeof value === 'object' &&
      (isImmutable(value) || Array.isArray(value) || isPlainObj(value))
    );
  }

  /**
   * Converts a value to a string, adding quotes if a string was provided.
   */
  function quoteString(value) {
    try {
      return typeof value === 'string' ? JSON.stringify(value) : String(value);
    } catch (_ignoreError) {
      return JSON.stringify(value);
    }
  }

  function has(collection, key) {
    return isImmutable(collection)
      ? collection.has(key)
      : isDataStructure(collection) && hasOwnProperty.call(collection, key);
  }

  function get(collection, key, notSetValue) {
    return isImmutable(collection)
      ? collection.get(key, notSetValue)
      : !has(collection, key)
        ? notSetValue
        : typeof collection.get === 'function'
          ? collection.get(key)
          : collection[key];
  }

  function shallowCopy(from) {
    if (Array.isArray(from)) {
      return arrCopy(from);
    }
    var to = {};
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    return to;
  }

  function remove(collection, key) {
    if (!isDataStructure(collection)) {
      throw new TypeError(
        'Cannot update non-data-structure value: ' + collection
      );
    }
    if (isImmutable(collection)) {
      if (!collection.remove) {
        throw new TypeError(
          'Cannot update immutable value without .remove() method: ' + collection
        );
      }
      return collection.remove(key);
    }
    if (!hasOwnProperty.call(collection, key)) {
      return collection;
    }
    var collectionCopy = shallowCopy(collection);
    if (Array.isArray(collectionCopy)) {
      collectionCopy.splice(key, 1);
    } else {
      delete collectionCopy[key];
    }
    return collectionCopy;
  }

  function set(collection, key, value) {
    if (!isDataStructure(collection)) {
      throw new TypeError(
        'Cannot update non-data-structure value: ' + collection
      );
    }
    if (isImmutable(collection)) {
      if (!collection.set) {
        throw new TypeError(
          'Cannot update immutable value without .set() method: ' + collection
        );
      }
      return collection.set(key, value);
    }
    if (hasOwnProperty.call(collection, key) && value === collection[key]) {
      return collection;
    }
    var collectionCopy = shallowCopy(collection);
    collectionCopy[key] = value;
    return collectionCopy;
  }

  function updateIn(collection, keyPath, notSetValue, updater) {
    if (!updater) {
      updater = notSetValue;
      notSetValue = undefined;
    }
    var updatedValue = updateInDeeply(
      isImmutable(collection),
      collection,
      coerceKeyPath(keyPath),
      0,
      notSetValue,
      updater
    );
    return updatedValue === NOT_SET ? notSetValue : updatedValue;
  }

  function updateInDeeply(
    inImmutable,
    existing,
    keyPath,
    i,
    notSetValue,
    updater
  ) {
    var wasNotSet = existing === NOT_SET;
    if (i === keyPath.length) {
      var existingValue = wasNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    if (!wasNotSet && !isDataStructure(existing)) {
      throw new TypeError(
        'Cannot update within non-data-structure value in path [' +
          keyPath.slice(0, i).map(quoteString) +
          ']: ' +
          existing
      );
    }
    var key = keyPath[i];
    var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
    var nextUpdated = updateInDeeply(
      nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting),
      nextExisting,
      keyPath,
      i + 1,
      notSetValue,
      updater
    );
    return nextUpdated === nextExisting
      ? existing
      : nextUpdated === NOT_SET
        ? remove(existing, key)
        : set(
            wasNotSet ? (inImmutable ? emptyMap() : {}) : existing,
            key,
            nextUpdated
          );
  }

  function setIn(collection, keyPath, value) {
    return updateIn(collection, keyPath, NOT_SET, function () { return value; });
  }

  function setIn$1(keyPath, v) {
    return setIn(this, keyPath, v);
  }

  function removeIn(collection, keyPath) {
    return updateIn(collection, keyPath, function () { return NOT_SET; });
  }

  function deleteIn(keyPath) {
    return removeIn(this, keyPath);
  }

  function update(collection, key, notSetValue, updater) {
    return updateIn(collection, [key], notSetValue, updater);
  }

  function update$1(key, notSetValue, updater) {
    return arguments.length === 1
      ? key(this)
      : update(this, key, notSetValue, updater);
  }

  function updateIn$1(keyPath, notSetValue, updater) {
    return updateIn(this, keyPath, notSetValue, updater);
  }

  function merge() {
    var iters = [], len = arguments.length;
    while ( len-- ) iters[ len ] = arguments[ len ];

    return mergeIntoKeyedWith(this, iters);
  }

  function mergeWith(merger) {
    var iters = [], len = arguments.length - 1;
    while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

    if (typeof merger !== 'function') {
      throw new TypeError('Invalid merger function: ' + merger);
    }
    return mergeIntoKeyedWith(this, iters, merger);
  }

  function mergeIntoKeyedWith(collection, collections, merger) {
    var iters = [];
    for (var ii = 0; ii < collections.length; ii++) {
      var collection$1 = KeyedCollection(collections[ii]);
      if (collection$1.size !== 0) {
        iters.push(collection$1);
      }
    }
    if (iters.length === 0) {
      return collection;
    }
    if (
      collection.toSeq().size === 0 &&
      !collection.__ownerID &&
      iters.length === 1
    ) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function (collection) {
      var mergeIntoCollection = merger
        ? function (value, key) {
            update(
              collection,
              key,
              NOT_SET,
              function (oldVal) { return (oldVal === NOT_SET ? value : merger(oldVal, value, key)); }
            );
          }
        : function (value, key) {
            collection.set(key, value);
          };
      for (var ii = 0; ii < iters.length; ii++) {
        iters[ii].forEach(mergeIntoCollection);
      }
    });
  }

  function merge$1(collection) {
    var sources = [], len = arguments.length - 1;
    while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

    return mergeWithSources(collection, sources);
  }

  function mergeWith$1(merger, collection) {
    var sources = [], len = arguments.length - 2;
    while ( len-- > 0 ) sources[ len ] = arguments[ len + 2 ];

    return mergeWithSources(collection, sources, merger);
  }

  function mergeDeep(collection) {
    var sources = [], len = arguments.length - 1;
    while ( len-- > 0 ) sources[ len ] = arguments[ len + 1 ];

    return mergeDeepWithSources(collection, sources);
  }

  function mergeDeepWith(merger, collection) {
    var sources = [], len = arguments.length - 2;
    while ( len-- > 0 ) sources[ len ] = arguments[ len + 2 ];

    return mergeDeepWithSources(collection, sources, merger);
  }

  function mergeDeepWithSources(collection, sources, merger) {
    return mergeWithSources(collection, sources, deepMergerWith(merger));
  }

  function mergeWithSources(collection, sources, merger) {
    if (!isDataStructure(collection)) {
      throw new TypeError(
        'Cannot merge into non-data-structure value: ' + collection
      );
    }
    if (isImmutable(collection)) {
      return typeof merger === 'function' && collection.mergeWith
        ? collection.mergeWith.apply(collection, [ merger ].concat( sources ))
        : collection.merge
          ? collection.merge.apply(collection, sources)
          : collection.concat.apply(collection, sources);
    }
    var isArray = Array.isArray(collection);
    var merged = collection;
    var Collection$$1 = isArray ? IndexedCollection : KeyedCollection;
    var mergeItem = isArray
      ? function (value) {
          // Copy on write
          if (merged === collection) {
            merged = shallowCopy(merged);
          }
          merged.push(value);
        }
      : function (value, key) {
          var hasVal = hasOwnProperty.call(merged, key);
          var nextVal =
            hasVal && merger ? merger(merged[key], value, key) : value;
          if (!hasVal || nextVal !== merged[key]) {
            // Copy on write
            if (merged === collection) {
              merged = shallowCopy(merged);
            }
            merged[key] = nextVal;
          }
        };
    for (var i = 0; i < sources.length; i++) {
      Collection$$1(sources[i]).forEach(mergeItem);
    }
    return merged;
  }

  function deepMergerWith(merger) {
    function deepMerger(oldValue, newValue, key) {
      return isDataStructure(oldValue) && isDataStructure(newValue)
        ? mergeWithSources(oldValue, [newValue], deepMerger)
        : merger
          ? merger(oldValue, newValue, key)
          : newValue;
    }
    return deepMerger;
  }

  function mergeDeep$1() {
    var iters = [], len = arguments.length;
    while ( len-- ) iters[ len ] = arguments[ len ];

    return mergeDeepWithSources(this, iters);
  }

  function mergeDeepWith$1(merger) {
    var iters = [], len = arguments.length - 1;
    while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

    return mergeDeepWithSources(this, iters, merger);
  }

  function mergeIn(keyPath) {
    var iters = [], len = arguments.length - 1;
    while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

    return updateIn(this, keyPath, emptyMap(), function (m) { return mergeWithSources(m, iters); });
  }

  function mergeDeepIn(keyPath) {
    var iters = [], len = arguments.length - 1;
    while ( len-- > 0 ) iters[ len ] = arguments[ len + 1 ];

    return updateIn(this, keyPath, emptyMap(), function (m) { return mergeDeepWithSources(m, iters); }
    );
  }

  function withMutations(fn) {
    var mutable = this.asMutable();
    fn(mutable);
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
  }

  function asMutable() {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  }

  function asImmutable() {
    return this.__ensureOwner();
  }

  function wasAltered() {
    return this.__altered;
  }

  var Map = (function (KeyedCollection$$1) {
    function Map(value) {
      return value === null || value === undefined
        ? emptyMap()
        : isMap(value) && !isOrdered(value)
          ? value
          : emptyMap().withMutations(function (map) {
              var iter = KeyedCollection$$1(value);
              assertNotInfinite(iter.size);
              iter.forEach(function (v, k) { return map.set(k, v); });
            });
    }

    if ( KeyedCollection$$1 ) Map.__proto__ = KeyedCollection$$1;
    Map.prototype = Object.create( KeyedCollection$$1 && KeyedCollection$$1.prototype );
    Map.prototype.constructor = Map;

    Map.of = function of () {
      var keyValues = [], len = arguments.length;
      while ( len-- ) keyValues[ len ] = arguments[ len ];

      return emptyMap().withMutations(function (map) {
        for (var i = 0; i < keyValues.length; i += 2) {
          if (i + 1 >= keyValues.length) {
            throw new Error('Missing value for key: ' + keyValues[i]);
          }
          map.set(keyValues[i], keyValues[i + 1]);
        }
      });
    };

    Map.prototype.toString = function toString () {
      return this.__toString('Map {', '}');
    };

    // @pragma Access

    Map.prototype.get = function get (k, notSetValue) {
      return this._root
        ? this._root.get(0, undefined, k, notSetValue)
        : notSetValue;
    };

    // @pragma Modification

    Map.prototype.set = function set (k, v) {
      return updateMap(this, k, v);
    };

    Map.prototype.remove = function remove (k) {
      return updateMap(this, k, NOT_SET);
    };

    Map.prototype.deleteAll = function deleteAll (keys) {
      var collection = Collection(keys);

      if (collection.size === 0) {
        return this;
      }

      return this.withMutations(function (map) {
        collection.forEach(function (key) { return map.remove(key); });
      });
    };

    Map.prototype.clear = function clear () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };

    // @pragma Composition

    Map.prototype.sort = function sort (comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator));
    };

    Map.prototype.sortBy = function sortBy (mapper, comparator) {
      // Late binding
      return OrderedMap(sortFactory(this, comparator, mapper));
    };

    Map.prototype.map = function map (mapper, context) {
      return this.withMutations(function (map) {
        map.forEach(function (value, key) {
          map.set(key, mapper.call(context, value, key, map));
        });
      });
    };

    // @pragma Mutability

    Map.prototype.__iterator = function __iterator (type, reverse) {
      return new MapIterator(this, type, reverse);
    };

    Map.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var iterations = 0;
      this._root &&
        this._root.iterate(function (entry) {
          iterations++;
          return fn(entry[1], entry[0], this$1);
        }, reverse);
      return iterations;
    };

    Map.prototype.__ensureOwner = function __ensureOwner (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyMap();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };

    return Map;
  }(KeyedCollection));

  Map.isMap = isMap;

  var MapPrototype = Map.prototype;
  MapPrototype[IS_MAP_SYMBOL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeAll = MapPrototype.deleteAll;
  MapPrototype.setIn = setIn$1;
  MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
  MapPrototype.update = update$1;
  MapPrototype.updateIn = updateIn$1;
  MapPrototype.merge = MapPrototype.concat = merge;
  MapPrototype.mergeWith = mergeWith;
  MapPrototype.mergeDeep = mergeDeep$1;
  MapPrototype.mergeDeepWith = mergeDeepWith$1;
  MapPrototype.mergeIn = mergeIn;
  MapPrototype.mergeDeepIn = mergeDeepIn;
  MapPrototype.withMutations = withMutations;
  MapPrototype.wasAltered = wasAltered;
  MapPrototype.asImmutable = asImmutable;
  MapPrototype['@@transducer/init'] = MapPrototype.asMutable = asMutable;
  MapPrototype['@@transducer/step'] = function(result, arr) {
    return result.set(arr[0], arr[1]);
  };
  MapPrototype['@@transducer/result'] = function(obj) {
    return obj.asImmutable();
  };

  // #pragma Trie Nodes

  var ArrayMapNode = function ArrayMapNode(ownerID, entries) {
    this.ownerID = ownerID;
    this.entries = entries;
  };

  ArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  ArrayMapNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;

    var entries = this.entries;
    var idx = 0;
    var len = entries.length;
    for (; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && entries.length === 1) {
      return; // undefined
    }

    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
      return createNodes(ownerID, entries, key, value);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1
          ? newEntries.pop()
          : (newEntries[idx] = newEntries.pop());
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new ArrayMapNode(ownerID, newEntries);
  };

  var BitmapIndexedNode = function BitmapIndexedNode(ownerID, bitmap, nodes) {
    this.ownerID = ownerID;
    this.bitmap = bitmap;
    this.nodes = nodes;
  };

  BitmapIndexedNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
    var bitmap = this.bitmap;
    return (bitmap & bit) === 0
      ? notSetValue
      : this.nodes[popCount(bitmap & (bit - 1))].get(
          shift + SHIFT,
          keyHash,
          key,
          notSetValue
        );
  };

  BitmapIndexedNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var bit = 1 << keyHashFrag;
    var bitmap = this.bitmap;
    var exists = (bitmap & bit) !== 0;

    if (!exists && value === NOT_SET) {
      return this;
    }

    var idx = popCount(bitmap & (bit - 1));
    var nodes = this.nodes;
    var node = exists ? nodes[idx] : undefined;
    var newNode = updateNode(
      node,
      ownerID,
      shift + SHIFT,
      keyHash,
      key,
      value,
      didChangeSize,
      didAlter
    );

    if (newNode === node) {
      return this;
    }

    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
    }

    if (
      exists &&
      !newNode &&
      nodes.length === 2 &&
      isLeafNode(nodes[idx ^ 1])
    ) {
      return nodes[idx ^ 1];
    }

    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
      return newNode;
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newBitmap = exists ? (newNode ? bitmap : bitmap ^ bit) : bitmap | bit;
    var newNodes = exists
      ? newNode
        ? setAt(nodes, idx, newNode, isEditable)
        : spliceOut(nodes, idx, isEditable)
      : spliceIn(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.bitmap = newBitmap;
      this.nodes = newNodes;
      return this;
    }

    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
  };

  var HashArrayMapNode = function HashArrayMapNode(ownerID, count, nodes) {
    this.ownerID = ownerID;
    this.count = count;
    this.nodes = nodes;
  };

  HashArrayMapNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var node = this.nodes[idx];
    return node
      ? node.get(shift + SHIFT, keyHash, key, notSetValue)
      : notSetValue;
  };

  HashArrayMapNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var removed = value === NOT_SET;
    var nodes = this.nodes;
    var node = nodes[idx];

    if (removed && !node) {
      return this;
    }

    var newNode = updateNode(
      node,
      ownerID,
      shift + SHIFT,
      keyHash,
      key,
      value,
      didChangeSize,
      didAlter
    );
    if (newNode === node) {
      return this;
    }

    var newCount = this.count;
    if (!node) {
      newCount++;
    } else if (!newNode) {
      newCount--;
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
        return packNodes(ownerID, nodes, newCount, idx);
      }
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newNodes = setAt(nodes, idx, newNode, isEditable);

    if (isEditable) {
      this.count = newCount;
      this.nodes = newNodes;
      return this;
    }

    return new HashArrayMapNode(ownerID, newCount, newNodes);
  };

  var HashCollisionNode = function HashCollisionNode(ownerID, keyHash, entries) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entries = entries;
  };

  HashCollisionNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };

  HashCollisionNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === undefined) {
      keyHash = hash(key);
    }

    var removed = value === NOT_SET;

    if (keyHash !== this.keyHash) {
      if (removed) {
        return this;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
    }

    var entries = this.entries;
    var idx = 0;
    var len = entries.length;
    for (; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;

    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }

    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);

    if (removed && len === 2) {
      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
    }

    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);

    if (exists) {
      if (removed) {
        idx === len - 1
          ? newEntries.pop()
          : (newEntries[idx] = newEntries.pop());
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }

    if (isEditable) {
      this.entries = newEntries;
      return this;
    }

    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
  };

  var ValueNode = function ValueNode(ownerID, keyHash, entry) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entry = entry;
  };

  ValueNode.prototype.get = function get (shift, keyHash, key, notSetValue) {
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
  };

  ValueNode.prototype.update = function update (ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var keyMatch = is(key, this.entry[0]);
    if (keyMatch ? value === this.entry[1] : removed) {
      return this;
    }

    SetRef(didAlter);

    if (removed) {
      SetRef(didChangeSize);
      return; // undefined
    }

    if (keyMatch) {
      if (ownerID && ownerID === this.ownerID) {
        this.entry[1] = value;
        return this;
      }
      return new ValueNode(ownerID, this.keyHash, [key, value]);
    }

    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
  };

  // #pragma Iterators

  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(
    fn,
    reverse
  ) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };

  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(
    fn,
    reverse
  ) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  ValueNode.prototype.iterate = function(fn, reverse) {
    return fn(this.entry);
  };

  var MapIterator = (function (Iterator$$1) {
    function MapIterator(map, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map._root && mapIteratorFrame(map._root);
    }

    if ( Iterator$$1 ) MapIterator.__proto__ = Iterator$$1;
    MapIterator.prototype = Object.create( Iterator$$1 && Iterator$$1.prototype );
    MapIterator.prototype.constructor = MapIterator;

    MapIterator.prototype.next = function next () {
      var this$1 = this;

      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex = (void 0);
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(
              type,
              node.entries[this$1._reverse ? maxIndex - index : index]
            );
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this$1._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this$1._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this$1._stack = this$1._stack.__prev;
      }
      return iteratorDone();
    };

    return MapIterator;
  }(Iterator));

  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }

  function mapIteratorFrame(node, prev) {
    return {
      node: node,
      index: 0,
      __prev: prev,
    };
  }

  function makeMap(size, root, ownerID, hash$$1) {
    var map = Object.create(MapPrototype);
    map.size = size;
    map._root = root;
    map.__ownerID = ownerID;
    map.__hash = hash$$1;
    map.__altered = false;
    return map;
  }

  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }

  function updateMap(map, k, v) {
    var newRoot;
    var newSize;
    if (!map._root) {
      if (v === NOT_SET) {
        return map;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map.__ownerID, [[k, v]]);
    } else {
      var didChangeSize = MakeRef();
      var didAlter = MakeRef();
      newRoot = updateNode(
        map._root,
        map.__ownerID,
        0,
        undefined,
        k,
        v,
        didChangeSize,
        didAlter
      );
      if (!didAlter.value) {
        return map;
      }
      newSize = map.size + (didChangeSize.value ? (v === NOT_SET ? -1 : 1) : 0);
    }
    if (map.__ownerID) {
      map.size = newSize;
      map._root = newRoot;
      map.__hash = undefined;
      map.__altered = true;
      return map;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }

  function updateNode(
    node,
    ownerID,
    shift,
    keyHash,
    key,
    value,
    didChangeSize,
    didAlter
  ) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(
      ownerID,
      shift,
      keyHash,
      key,
      value,
      didChangeSize,
      didAlter
    );
  }

  function isLeafNode(node) {
    return (
      node.constructor === ValueNode || node.constructor === HashCollisionNode
    );
  }

  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }

    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;

    var newNode;
    var nodes =
      idx1 === idx2
        ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)]
        : ((newNode = new ValueNode(ownerID, keyHash, entry)),
          idx1 < idx2 ? [node, newNode] : [newNode, node]);

    return new BitmapIndexedNode(ownerID, (1 << idx1) | (1 << idx2), nodes);
  }

  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, undefined, entry[0], entry[1]);
    }
    return node;
  }

  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== undefined && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }

  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : undefined;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }

  function popCount(x) {
    x -= (x >> 1) & 0x55555555;
    x = (x & 0x33333333) + ((x >> 2) & 0x33333333);
    x = (x + (x >> 4)) & 0x0f0f0f0f;
    x += x >> 8;
    x += x >> 16;
    return x & 0x7f;
  }

  function setAt(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }

  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }

  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }

  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;

  var IS_LIST_SYMBOL = '@@__IMMUTABLE_LIST__@@';

  function isList(maybeList) {
    return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
  }

  var List = (function (IndexedCollection$$1) {
    function List(value) {
      var empty = emptyList();
      if (value === null || value === undefined) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedCollection$$1(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function (list) {
        list.setSize(size);
        iter.forEach(function (v, i) { return list.set(i, v); });
      });
    }

    if ( IndexedCollection$$1 ) List.__proto__ = IndexedCollection$$1;
    List.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
    List.prototype.constructor = List;

    List.of = function of (/*...values*/) {
      return this(arguments);
    };

    List.prototype.toString = function toString () {
      return this.__toString('List [', ']');
    };

    // @pragma Access

    List.prototype.get = function get (index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };

    // @pragma Modification

    List.prototype.set = function set (index, value) {
      return updateList(this, index, value);
    };

    List.prototype.remove = function remove (index) {
      return !this.has(index)
        ? this
        : index === 0
          ? this.shift()
          : index === this.size - 1
            ? this.pop()
            : this.splice(index, 1);
    };

    List.prototype.insert = function insert (index, value) {
      return this.splice(index, 0, value);
    };

    List.prototype.clear = function clear () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = null;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };

    List.prototype.push = function push (/*...values*/) {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function (list) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };

    List.prototype.pop = function pop () {
      return setListBounds(this, 0, -1);
    };

    List.prototype.unshift = function unshift (/*...values*/) {
      var values = arguments;
      return this.withMutations(function (list) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };

    List.prototype.shift = function shift () {
      return setListBounds(this, 1);
    };

    // @pragma Composition

    List.prototype.concat = function concat (/*...collections*/) {
      var arguments$1 = arguments;

      var seqs = [];
      for (var i = 0; i < arguments.length; i++) {
        var argument = arguments$1[i];
        var seq = IndexedCollection$$1(
          typeof argument !== 'string' && hasIterator(argument)
            ? argument
            : [argument]
        );
        if (seq.size !== 0) {
          seqs.push(seq);
        }
      }
      if (seqs.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
        return this.constructor(seqs[0]);
      }
      return this.withMutations(function (list) {
        seqs.forEach(function (seq) { return seq.forEach(function (value) { return list.push(value); }); });
      });
    };

    List.prototype.setSize = function setSize (size) {
      return setListBounds(this, 0, size);
    };

    List.prototype.map = function map (mapper, context) {
      var this$1 = this;

      return this.withMutations(function (list) {
        for (var i = 0; i < this$1.size; i++) {
          list.set(i, mapper.call(context, list.get(i), i, list));
        }
      });
    };

    // @pragma Iteration

    List.prototype.slice = function slice (begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(
        this,
        resolveBegin(begin, size),
        resolveEnd(end, size)
      );
    };

    List.prototype.__iterator = function __iterator (type, reverse) {
      var index = reverse ? this.size : 0;
      var values = iterateList(this, reverse);
      return new Iterator(function () {
        var value = values();
        return value === DONE
          ? iteratorDone()
          : iteratorValue(type, reverse ? --index : index++, value);
      });
    };

    List.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var index = reverse ? this.size : 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, reverse ? --index : index++, this$1) === false) {
          break;
        }
      }
      return index;
    };

    List.prototype.__ensureOwner = function __ensureOwner (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyList();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeList(
        this._origin,
        this._capacity,
        this._level,
        this._root,
        this._tail,
        ownerID,
        this.__hash
      );
    };

    return List;
  }(IndexedCollection));

  List.isList = isList;

  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SYMBOL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.merge = ListPrototype.concat;
  ListPrototype.setIn = setIn$1;
  ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
  ListPrototype.update = update$1;
  ListPrototype.updateIn = updateIn$1;
  ListPrototype.mergeIn = mergeIn;
  ListPrototype.mergeDeepIn = mergeDeepIn;
  ListPrototype.withMutations = withMutations;
  ListPrototype.wasAltered = wasAltered;
  ListPrototype.asImmutable = asImmutable;
  ListPrototype['@@transducer/init'] = ListPrototype.asMutable = asMutable;
  ListPrototype['@@transducer/step'] = function(result, arr) {
    return result.push(arr);
  };
  ListPrototype['@@transducer/result'] = function(obj) {
    return obj.asImmutable();
  };

  var VNode = function VNode(array, ownerID) {
    this.array = array;
    this.ownerID = ownerID;
  };

  // TODO: seems like these methods are very similar

  VNode.prototype.removeBefore = function removeBefore (ownerID, level, index) {
    if (index === level ? 1 << level : this.array.length === 0) {
      return this;
    }
    var originIndex = (index >>> level) & MASK;
    if (originIndex >= this.array.length) {
      return new VNode([], ownerID);
    }
    var removingFirst = originIndex === 0;
    var newChild;
    if (level > 0) {
      var oldChild = this.array[originIndex];
      newChild =
        oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
      if (newChild === oldChild && removingFirst) {
        return this;
      }
    }
    if (removingFirst && !newChild) {
      return this;
    }
    var editable = editableVNode(this, ownerID);
    if (!removingFirst) {
      for (var ii = 0; ii < originIndex; ii++) {
        editable.array[ii] = undefined;
      }
    }
    if (newChild) {
      editable.array[originIndex] = newChild;
    }
    return editable;
  };

  VNode.prototype.removeAfter = function removeAfter (ownerID, level, index) {
    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
      return this;
    }
    var sizeIndex = ((index - 1) >>> level) & MASK;
    if (sizeIndex >= this.array.length) {
      return this;
    }

    var newChild;
    if (level > 0) {
      var oldChild = this.array[sizeIndex];
      newChild =
        oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
        return this;
      }
    }

    var editable = editableVNode(this, ownerID);
    editable.array.splice(sizeIndex + 1);
    if (newChild) {
      editable.array[sizeIndex] = newChild;
    }
    return editable;
  };

  var DONE = {};

  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;

    return iterateNodeOrLeaf(list._root, list._level, 0);

    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0
        ? iterateLeaf(node, offset)
        : iterateNode(node, level, offset);
    }

    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }

    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : (left - offset) >> level;
      var to = ((right - offset) >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function () {
        while (true) {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(
            array && array[idx],
            level - SHIFT,
            offset + (idx << level)
          );
        }
      };
    }
  }

  function makeList(origin, capacity, level, root, tail, ownerID, hash) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash;
    list.__altered = false;
    return list;
  }

  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }

  function updateList(list, index, value) {
    index = wrapIndex(list, index);

    if (index !== index) {
      return list;
    }

    if (index >= list.size || index < 0) {
      return list.withMutations(function (list) {
        index < 0
          ? setListBounds(list, index).set(0, value)
          : setListBounds(list, 0, index + 1).set(index, value);
      });
    }

    index += list._origin;

    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef();
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(
        newRoot,
        list.__ownerID,
        list._level,
        index,
        value,
        didAlter
      );
    }

    if (!didAlter.value) {
      return list;
    }

    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }

  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = (index >>> level) & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === undefined) {
      return node;
    }

    var newNode;

    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(
        lowerNode,
        ownerID,
        level - SHIFT,
        index,
        value,
        didAlter
      );
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }

    if (nodeHas && node.array[idx] === value) {
      return node;
    }

    if (didAlter) {
      SetRef(didAlter);
    }

    newNode = editableVNode(node, ownerID);
    if (value === undefined && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }

  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }

  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << (list._level + SHIFT)) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[(rawIndex >>> level) & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }

  function setListBounds(list, begin, end) {
    // Sanitize begin & end using this shorthand for ToInt32(argument)
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toint32
    if (begin !== undefined) {
      begin |= 0;
    }
    if (end !== undefined) {
      end |= 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity =
      end === undefined
        ? oldCapacity
        : end < 0
          ? oldCapacity + end
          : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }

    // If it's going to end after it starts, it's empty.
    if (newOrigin >= newCapacity) {
      return list.clear();
    }

    var newLevel = list._level;
    var newRoot = list._root;

    // New origin might need creating a higher root.
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(
        newRoot && newRoot.array.length ? [undefined, newRoot] : [],
        owner
      );
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }

    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);

    // New size might need creating a higher root.
    while (newTailOffset >= 1 << (newLevel + SHIFT)) {
      newRoot = new VNode(
        newRoot && newRoot.array.length ? [newRoot] : [],
        owner
      );
      newLevel += SHIFT;
    }

    // Locate or create the new tail.
    var oldTail = list._tail;
    var newTail =
      newTailOffset < oldTailOffset
        ? listNodeFor(list, newCapacity - 1)
        : newTailOffset > oldTailOffset
          ? new VNode([], owner)
          : oldTail;

    // Merge Tail into tree.
    if (
      oldTail &&
      newTailOffset > oldTailOffset &&
      newOrigin < oldCapacity &&
      oldTail.array.length
    ) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = (oldTailOffset >>> level) & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[(oldTailOffset >>> SHIFT) & MASK] = oldTail;
    }

    // If the size has been reduced, there's a chance the tail needs to be trimmed.
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }

    // If the new origin is within the tail, then we do not need a root.
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);

      // Otherwise, if the root has been trimmed, garbage collect.
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;

      // Identify the new top root node of the subtree of the old root.
      while (newRoot) {
        var beginIndex = (newOrigin >>> newLevel) & MASK;
        if ((beginIndex !== newTailOffset >>> newLevel) & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }

      // Trim the new sides of the new root.
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(
          owner,
          newLevel,
          newTailOffset - offsetShift
        );
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }

    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = undefined;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }

  function getTailOffset(size) {
    return size < SIZE ? 0 : ((size - 1) >>> SHIFT) << SHIFT;
  }

  var OrderedMap = (function (Map$$1) {
    function OrderedMap(value) {
      return value === null || value === undefined
        ? emptyOrderedMap()
        : isOrderedMap(value)
          ? value
          : emptyOrderedMap().withMutations(function (map) {
              var iter = KeyedCollection(value);
              assertNotInfinite(iter.size);
              iter.forEach(function (v, k) { return map.set(k, v); });
            });
    }

    if ( Map$$1 ) OrderedMap.__proto__ = Map$$1;
    OrderedMap.prototype = Object.create( Map$$1 && Map$$1.prototype );
    OrderedMap.prototype.constructor = OrderedMap;

    OrderedMap.of = function of (/*...values*/) {
      return this(arguments);
    };

    OrderedMap.prototype.toString = function toString () {
      return this.__toString('OrderedMap {', '}');
    };

    // @pragma Access

    OrderedMap.prototype.get = function get (k, notSetValue) {
      var index = this._map.get(k);
      return index !== undefined ? this._list.get(index)[1] : notSetValue;
    };

    // @pragma Modification

    OrderedMap.prototype.clear = function clear () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        return this;
      }
      return emptyOrderedMap();
    };

    OrderedMap.prototype.set = function set (k, v) {
      return updateOrderedMap(this, k, v);
    };

    OrderedMap.prototype.remove = function remove (k) {
      return updateOrderedMap(this, k, NOT_SET);
    };

    OrderedMap.prototype.wasAltered = function wasAltered () {
      return this._map.wasAltered() || this._list.wasAltered();
    };

    OrderedMap.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      return this._list.__iterate(
        function (entry) { return entry && fn(entry[1], entry[0], this$1); },
        reverse
      );
    };

    OrderedMap.prototype.__iterator = function __iterator (type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };

    OrderedMap.prototype.__ensureOwner = function __ensureOwner (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        if (this.size === 0) {
          return emptyOrderedMap();
        }
        this.__ownerID = ownerID;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };

    return OrderedMap;
  }(Map));

  OrderedMap.isOrderedMap = isOrderedMap;

  OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;

  function makeOrderedMap(map, list, ownerID, hash) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map ? map.size : 0;
    omap._map = map;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash;
    return omap;
  }

  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return (
      EMPTY_ORDERED_MAP ||
      (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()))
    );
  }

  function updateOrderedMap(omap, k, v) {
    var map = omap._map;
    var list = omap._list;
    var i = map.get(k);
    var has = i !== undefined;
    var newMap;
    var newList;
    if (v === NOT_SET) {
      // removed
      if (!has) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map.size * 2) {
        newList = list.filter(function (entry, idx) { return entry !== undefined && i !== idx; });
        newMap = newList
          .toKeyedSeq()
          .map(function (entry) { return entry[0]; })
          .flip()
          .toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map.remove(k);
        newList = i === list.size - 1 ? list.pop() : list.set(i, undefined);
      }
    } else if (has) {
      if (v === list.get(i)[1]) {
        return omap;
      }
      newMap = map;
      newList = list.set(i, [k, v]);
    } else {
      newMap = map.set(k, list.size);
      newList = list.set(list.size, [k, v]);
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = undefined;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }

  var IS_STACK_SYMBOL = '@@__IMMUTABLE_STACK__@@';

  function isStack(maybeStack) {
    return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
  }

  var Stack = (function (IndexedCollection$$1) {
    function Stack(value) {
      return value === null || value === undefined
        ? emptyStack()
        : isStack(value)
          ? value
          : emptyStack().pushAll(value);
    }

    if ( IndexedCollection$$1 ) Stack.__proto__ = IndexedCollection$$1;
    Stack.prototype = Object.create( IndexedCollection$$1 && IndexedCollection$$1.prototype );
    Stack.prototype.constructor = Stack;

    Stack.of = function of (/*...values*/) {
      return this(arguments);
    };

    Stack.prototype.toString = function toString () {
      return this.__toString('Stack [', ']');
    };

    // @pragma Access

    Stack.prototype.get = function get (index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };

    Stack.prototype.peek = function peek () {
      return this._head && this._head.value;
    };

    // @pragma Modification

    Stack.prototype.push = function push (/*...values*/) {
      var arguments$1 = arguments;

      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments$1[ii],
          next: head,
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pushAll = function pushAll (iter) {
      iter = IndexedCollection$$1(iter);
      if (iter.size === 0) {
        return this;
      }
      if (this.size === 0 && isStack(iter)) {
        return iter;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.__iterate(function (value) {
        newSize++;
        head = {
          value: value,
          next: head,
        };
      }, /* reverse */ true);
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    Stack.prototype.pop = function pop () {
      return this.slice(1);
    };

    Stack.prototype.clear = function clear () {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = undefined;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };

    Stack.prototype.slice = function slice (begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        // super.slice(begin, end);
        return IndexedCollection$$1.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = undefined;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };

    // @pragma Mutability

    Stack.prototype.__ensureOwner = function __ensureOwner (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyStack();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };

    // @pragma Iteration

    Stack.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      if (reverse) {
        return new ArraySeq(this.toArray()).__iterate(
          function (v, k) { return fn(v, k, this$1); },
          reverse
        );
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this$1) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };

    Stack.prototype.__iterator = function __iterator (type, reverse) {
      if (reverse) {
        return new ArraySeq(this.toArray()).__iterator(type, reverse);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function () {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };

    return Stack;
  }(IndexedCollection));

  Stack.isStack = isStack;

  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SYMBOL] = true;
  StackPrototype.shift = StackPrototype.pop;
  StackPrototype.unshift = StackPrototype.push;
  StackPrototype.unshiftAll = StackPrototype.pushAll;
  StackPrototype.withMutations = withMutations;
  StackPrototype.wasAltered = wasAltered;
  StackPrototype.asImmutable = asImmutable;
  StackPrototype['@@transducer/init'] = StackPrototype.asMutable = asMutable;
  StackPrototype['@@transducer/step'] = function(result, arr) {
    return result.unshift(arr);
  };
  StackPrototype['@@transducer/result'] = function(obj) {
    return obj.asImmutable();
  };

  function makeStack(size, head, ownerID, hash) {
    var map = Object.create(StackPrototype);
    map.size = size;
    map._head = head;
    map.__ownerID = ownerID;
    map.__hash = hash;
    map.__altered = false;
    return map;
  }

  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }

  var IS_SET_SYMBOL = '@@__IMMUTABLE_SET__@@';

  function isSet(maybeSet) {
    return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
  }

  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }

  function deepEqual(a, b) {
    if (a === b) {
      return true;
    }

    if (
      !isCollection(b) ||
      (a.size !== undefined && b.size !== undefined && a.size !== b.size) ||
      (a.__hash !== undefined &&
        b.__hash !== undefined &&
        a.__hash !== b.__hash) ||
      isKeyed(a) !== isKeyed(b) ||
      isIndexed(a) !== isIndexed(b) ||
      isOrdered(a) !== isOrdered(b)
    ) {
      return false;
    }

    if (a.size === 0 && b.size === 0) {
      return true;
    }

    var notAssociative = !isAssociative(a);

    if (isOrdered(a)) {
      var entries = a.entries();
      return (
        b.every(function (v, k) {
          var entry = entries.next().value;
          return entry && is(entry[1], v) && (notAssociative || is(entry[0], k));
        }) && entries.next().done
      );
    }

    var flipped = false;

    if (a.size === undefined) {
      if (b.size === undefined) {
        if (typeof a.cacheResult === 'function') {
          a.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a;
        a = b;
        b = _;
      }
    }

    var allEqual = true;
    var bSize = b.__iterate(function (v, k) {
      if (
        notAssociative
          ? !a.has(v)
          : flipped
            ? !is(v, a.get(k, NOT_SET))
            : !is(a.get(k, NOT_SET), v)
      ) {
        allEqual = false;
        return false;
      }
    });

    return allEqual && a.size === bSize;
  }

  /**
   * Contributes additional methods to a constructor
   */
  function mixin(ctor, methods) {
    var keyCopier = function (key) {
      ctor.prototype[key] = methods[key];
    };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols &&
      Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }

  function toJS(value) {
    if (!value || typeof value !== 'object') {
      return value;
    }
    if (!isCollection(value)) {
      if (!isDataStructure(value)) {
        return value;
      }
      value = Seq(value);
    }
    if (isKeyed(value)) {
      var result$1 = {};
      value.__iterate(function (v, k) {
        result$1[k] = toJS(v);
      });
      return result$1;
    }
    var result = [];
    value.__iterate(function (v) {
      result.push(toJS(v));
    });
    return result;
  }

  var Set = (function (SetCollection$$1) {
    function Set(value) {
      return value === null || value === undefined
        ? emptySet()
        : isSet(value) && !isOrdered(value)
          ? value
          : emptySet().withMutations(function (set) {
              var iter = SetCollection$$1(value);
              assertNotInfinite(iter.size);
              iter.forEach(function (v) { return set.add(v); });
            });
    }

    if ( SetCollection$$1 ) Set.__proto__ = SetCollection$$1;
    Set.prototype = Object.create( SetCollection$$1 && SetCollection$$1.prototype );
    Set.prototype.constructor = Set;

    Set.of = function of (/*...values*/) {
      return this(arguments);
    };

    Set.fromKeys = function fromKeys (value) {
      return this(KeyedCollection(value).keySeq());
    };

    Set.intersect = function intersect (sets) {
      sets = Collection(sets).toArray();
      return sets.length
        ? SetPrototype.intersect.apply(Set(sets.pop()), sets)
        : emptySet();
    };

    Set.union = function union (sets) {
      sets = Collection(sets).toArray();
      return sets.length
        ? SetPrototype.union.apply(Set(sets.pop()), sets)
        : emptySet();
    };

    Set.prototype.toString = function toString () {
      return this.__toString('Set {', '}');
    };

    // @pragma Access

    Set.prototype.has = function has (value) {
      return this._map.has(value);
    };

    // @pragma Modification

    Set.prototype.add = function add (value) {
      return updateSet(this, this._map.set(value, value));
    };

    Set.prototype.remove = function remove (value) {
      return updateSet(this, this._map.remove(value));
    };

    Set.prototype.clear = function clear () {
      return updateSet(this, this._map.clear());
    };

    // @pragma Composition

    Set.prototype.map = function map (mapper, context) {
      var this$1 = this;

      return updateSet(this, this._map.map(function (v) { return mapper(v, v, this$1); }, context));
    };

    Set.prototype.union = function union () {
      var iters = [], len = arguments.length;
      while ( len-- ) iters[ len ] = arguments[ len ];

      iters = iters.filter(function (x) { return x.size !== 0; });
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function (set) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetCollection$$1(iters[ii]).forEach(function (value) { return set.add(value); });
        }
      });
    };

    Set.prototype.intersect = function intersect () {
      var iters = [], len = arguments.length;
      while ( len-- ) iters[ len ] = arguments[ len ];

      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function (iter) { return SetCollection$$1(iter); });
      var toRemove = [];
      this.forEach(function (value) {
        if (!iters.every(function (iter) { return iter.includes(value); })) {
          toRemove.push(value);
        }
      });
      return this.withMutations(function (set) {
        toRemove.forEach(function (value) {
          set.remove(value);
        });
      });
    };

    Set.prototype.subtract = function subtract () {
      var iters = [], len = arguments.length;
      while ( len-- ) iters[ len ] = arguments[ len ];

      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function (iter) { return SetCollection$$1(iter); });
      var toRemove = [];
      this.forEach(function (value) {
        if (iters.some(function (iter) { return iter.includes(value); })) {
          toRemove.push(value);
        }
      });
      return this.withMutations(function (set) {
        toRemove.forEach(function (value) {
          set.remove(value);
        });
      });
    };

    Set.prototype.sort = function sort (comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator));
    };

    Set.prototype.sortBy = function sortBy (mapper, comparator) {
      // Late binding
      return OrderedSet(sortFactory(this, comparator, mapper));
    };

    Set.prototype.wasAltered = function wasAltered () {
      return this._map.wasAltered();
    };

    Set.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      return this._map.__iterate(function (k) { return fn(k, k, this$1); }, reverse);
    };

    Set.prototype.__iterator = function __iterator (type, reverse) {
      return this._map.__iterator(type, reverse);
    };

    Set.prototype.__ensureOwner = function __ensureOwner (ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        if (this.size === 0) {
          return this.__empty();
        }
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };

    return Set;
  }(SetCollection));

  Set.isSet = isSet;

  var SetPrototype = Set.prototype;
  SetPrototype[IS_SET_SYMBOL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
  SetPrototype.withMutations = withMutations;
  SetPrototype.asImmutable = asImmutable;
  SetPrototype['@@transducer/init'] = SetPrototype.asMutable = asMutable;
  SetPrototype['@@transducer/step'] = function(result, arr) {
    return result.add(arr);
  };
  SetPrototype['@@transducer/result'] = function(obj) {
    return obj.asImmutable();
  };

  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;

  function updateSet(set, newMap) {
    if (set.__ownerID) {
      set.size = newMap.size;
      set._map = newMap;
      return set;
    }
    return newMap === set._map
      ? set
      : newMap.size === 0
        ? set.__empty()
        : set.__make(newMap);
  }

  function makeSet(map, ownerID) {
    var set = Object.create(SetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }

  /**
   * Returns a lazy seq of nums from start (inclusive) to end
   * (exclusive), by step, where start defaults to 0, step to 1, and end to
   * infinity. When start is equal to end, returns empty list.
   */
  var Range = (function (IndexedSeq$$1) {
    function Range(start, end, step) {
      if (!(this instanceof Range)) {
        return new Range(start, end, step);
      }
      invariant(step !== 0, 'Cannot step a Range by 0');
      start = start || 0;
      if (end === undefined) {
        end = Infinity;
      }
      step = step === undefined ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }

    if ( IndexedSeq$$1 ) Range.__proto__ = IndexedSeq$$1;
    Range.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
    Range.prototype.constructor = Range;

    Range.prototype.toString = function toString () {
      if (this.size === 0) {
        return 'Range []';
      }
      return (
        'Range [ ' +
        this._start +
        '...' +
        this._end +
        (this._step !== 1 ? ' by ' + this._step : '') +
        ' ]'
      );
    };

    Range.prototype.get = function get (index, notSetValue) {
      return this.has(index)
        ? this._start + wrapIndex(this, index) * this._step
        : notSetValue;
    };

    Range.prototype.includes = function includes (searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return (
        possibleIndex >= 0 &&
        possibleIndex < this.size &&
        possibleIndex === Math.floor(possibleIndex)
      );
    };

    Range.prototype.slice = function slice (begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range(0, 0);
      }
      return new Range(
        this.get(begin, this._end),
        this.get(end, this._end),
        this._step
      );
    };

    Range.prototype.indexOf = function indexOf (searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index;
        }
      }
      return -1;
    };

    Range.prototype.lastIndexOf = function lastIndexOf (searchValue) {
      return this.indexOf(searchValue);
    };

    Range.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var size = this.size;
      var step = this._step;
      var value = reverse ? this._start + (size - 1) * step : this._start;
      var i = 0;
      while (i !== size) {
        if (fn(value, reverse ? size - ++i : i++, this$1) === false) {
          break;
        }
        value += reverse ? -step : step;
      }
      return i;
    };

    Range.prototype.__iterator = function __iterator (type, reverse) {
      var size = this.size;
      var step = this._step;
      var value = reverse ? this._start + (size - 1) * step : this._start;
      var i = 0;
      return new Iterator(function () {
        if (i === size) {
          return iteratorDone();
        }
        var v = value;
        value += reverse ? -step : step;
        return iteratorValue(type, reverse ? size - ++i : i++, v);
      });
    };

    Range.prototype.equals = function equals (other) {
      return other instanceof Range
        ? this._start === other._start &&
            this._end === other._end &&
            this._step === other._step
        : deepEqual(this, other);
    };

    return Range;
  }(IndexedSeq));

  var EMPTY_RANGE;

  function getIn(collection, searchKeyPath, notSetValue) {
    var keyPath = coerceKeyPath(searchKeyPath);
    var i = 0;
    while (i !== keyPath.length) {
      collection = get(collection, keyPath[i++], NOT_SET);
      if (collection === NOT_SET) {
        return notSetValue;
      }
    }
    return collection;
  }

  function getIn$1(searchKeyPath, notSetValue) {
    return getIn(this, searchKeyPath, notSetValue);
  }

  function hasIn(collection, keyPath) {
    return getIn(collection, keyPath, NOT_SET) !== NOT_SET;
  }

  function hasIn$1(searchKeyPath) {
    return hasIn(this, searchKeyPath);
  }

  function toObject() {
    assertNotInfinite(this.size);
    var object = {};
    this.__iterate(function (v, k) {
      object[k] = v;
    });
    return object;
  }

  // Note: all of these methods are deprecated.
  Collection.isIterable = isCollection;
  Collection.isKeyed = isKeyed;
  Collection.isIndexed = isIndexed;
  Collection.isAssociative = isAssociative;
  Collection.isOrdered = isOrdered;

  Collection.Iterator = Iterator;

  mixin(Collection, {
    // ### Conversion to other types

    toArray: function toArray() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      var useTuples = isKeyed(this);
      var i = 0;
      this.__iterate(function (v, k) {
        // Keyed collections produce an array of tuples.
        array[i++] = useTuples ? [k, v] : v;
      });
      return array;
    },

    toIndexedSeq: function toIndexedSeq() {
      return new ToIndexedSequence(this);
    },

    toJS: function toJS$1() {
      return toJS(this);
    },

    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, true);
    },

    toMap: function toMap() {
      // Use Late Binding here to solve the circular dependency.
      return Map(this.toKeyedSeq());
    },

    toObject: toObject,

    toOrderedMap: function toOrderedMap() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedMap(this.toKeyedSeq());
    },

    toOrderedSet: function toOrderedSet() {
      // Use Late Binding here to solve the circular dependency.
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },

    toSet: function toSet() {
      // Use Late Binding here to solve the circular dependency.
      return Set(isKeyed(this) ? this.valueSeq() : this);
    },

    toSetSeq: function toSetSeq() {
      return new ToSetSequence(this);
    },

    toSeq: function toSeq() {
      return isIndexed(this)
        ? this.toIndexedSeq()
        : isKeyed(this)
          ? this.toKeyedSeq()
          : this.toSetSeq();
    },

    toStack: function toStack() {
      // Use Late Binding here to solve the circular dependency.
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },

    toList: function toList() {
      // Use Late Binding here to solve the circular dependency.
      return List(isKeyed(this) ? this.valueSeq() : this);
    },

    // ### Common JavaScript methods and properties

    toString: function toString() {
      return '[Collection]';
    },

    __toString: function __toString(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return (
        head +
        ' ' +
        this.toSeq()
          .map(this.__toStringMapper)
          .join(', ') +
        ' ' +
        tail
      );
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    concat: function concat() {
      var values = [], len = arguments.length;
      while ( len-- ) values[ len ] = arguments[ len ];

      return reify(this, concatFactory(this, values));
    },

    includes: function includes(searchValue) {
      return this.some(function (value) { return is(value, searchValue); });
    },

    entries: function entries() {
      return this.__iterator(ITERATE_ENTRIES);
    },

    every: function every(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function (v, k, c) {
        if (!predicate.call(context, v, k, c)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },

    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },

    find: function find(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },

    forEach: function forEach(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },

    join: function join(separator) {
      assertNotInfinite(this.size);
      separator = separator !== undefined ? '' + separator : ',';
      var joined = '';
      var isFirst = true;
      this.__iterate(function (v) {
        isFirst ? (isFirst = false) : (joined += separator);
        joined += v !== null && v !== undefined ? v.toString() : '';
      });
      return joined;
    },

    keys: function keys() {
      return this.__iterator(ITERATE_KEYS);
    },

    map: function map(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },

    reduce: function reduce$1(reducer, initialReduction, context) {
      return reduce(
        this,
        reducer,
        initialReduction,
        context,
        arguments.length < 2,
        false
      );
    },

    reduceRight: function reduceRight(reducer, initialReduction, context) {
      return reduce(
        this,
        reducer,
        initialReduction,
        context,
        arguments.length < 2,
        true
      );
    },

    reverse: function reverse() {
      return reify(this, reverseFactory(this, true));
    },

    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },

    some: function some(predicate, context) {
      return !this.every(not(predicate), context);
    },

    sort: function sort(comparator) {
      return reify(this, sortFactory(this, comparator));
    },

    values: function values() {
      return this.__iterator(ITERATE_VALUES);
    },

    // ### More sequential methods

    butLast: function butLast() {
      return this.slice(0, -1);
    },

    isEmpty: function isEmpty() {
      return this.size !== undefined ? this.size === 0 : !this.some(function () { return true; });
    },

    count: function count(predicate, context) {
      return ensureSize(
        predicate ? this.toSeq().filter(predicate, context) : this
      );
    },

    countBy: function countBy(grouper, context) {
      return countByFactory(this, grouper, context);
    },

    equals: function equals(other) {
      return deepEqual(this, other);
    },

    entrySeq: function entrySeq() {
      var collection = this;
      if (collection._cache) {
        // We cache as an entries array, so we can just return the cache!
        return new ArraySeq(collection._cache);
      }
      var entriesSequence = collection
        .toSeq()
        .map(entryMapper)
        .toIndexedSeq();
      entriesSequence.fromEntrySeq = function () { return collection.toSeq(); };
      return entriesSequence;
    },

    filterNot: function filterNot(predicate, context) {
      return this.filter(not(predicate), context);
    },

    findEntry: function findEntry(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function (v, k, c) {
        if (predicate.call(context, v, k, c)) {
          found = [k, v];
          return false;
        }
      });
      return found;
    },

    findKey: function findKey(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },

    findLast: function findLast(predicate, context, notSetValue) {
      return this.toKeyedSeq()
        .reverse()
        .find(predicate, context, notSetValue);
    },

    findLastEntry: function findLastEntry(predicate, context, notSetValue) {
      return this.toKeyedSeq()
        .reverse()
        .findEntry(predicate, context, notSetValue);
    },

    findLastKey: function findLastKey(predicate, context) {
      return this.toKeyedSeq()
        .reverse()
        .findKey(predicate, context);
    },

    first: function first(notSetValue) {
      return this.find(returnTrue, null, notSetValue);
    },

    flatMap: function flatMap(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },

    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },

    fromEntrySeq: function fromEntrySeq() {
      return new FromEntriesSequence(this);
    },

    get: function get(searchKey, notSetValue) {
      return this.find(function (_, key) { return is(key, searchKey); }, undefined, notSetValue);
    },

    getIn: getIn$1,

    groupBy: function groupBy(grouper, context) {
      return groupByFactory(this, grouper, context);
    },

    has: function has(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },

    hasIn: hasIn$1,

    isSubset: function isSubset(iter) {
      iter = typeof iter.includes === 'function' ? iter : Collection(iter);
      return this.every(function (value) { return iter.includes(value); });
    },

    isSuperset: function isSuperset(iter) {
      iter = typeof iter.isSubset === 'function' ? iter : Collection(iter);
      return iter.isSubset(this);
    },

    keyOf: function keyOf(searchValue) {
      return this.findKey(function (value) { return is(value, searchValue); });
    },

    keySeq: function keySeq() {
      return this.toSeq()
        .map(keyMapper)
        .toIndexedSeq();
    },

    last: function last(notSetValue) {
      return this.toSeq()
        .reverse()
        .first(notSetValue);
    },

    lastKeyOf: function lastKeyOf(searchValue) {
      return this.toKeyedSeq()
        .reverse()
        .keyOf(searchValue);
    },

    max: function max(comparator) {
      return maxFactory(this, comparator);
    },

    maxBy: function maxBy(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },

    min: function min(comparator) {
      return maxFactory(
        this,
        comparator ? neg(comparator) : defaultNegComparator
      );
    },

    minBy: function minBy(mapper, comparator) {
      return maxFactory(
        this,
        comparator ? neg(comparator) : defaultNegComparator,
        mapper
      );
    },

    rest: function rest() {
      return this.slice(1);
    },

    skip: function skip(amount) {
      return amount === 0 ? this : this.slice(Math.max(0, amount));
    },

    skipLast: function skipLast(amount) {
      return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
    },

    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },

    skipUntil: function skipUntil(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },

    sortBy: function sortBy(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },

    take: function take(amount) {
      return this.slice(0, Math.max(0, amount));
    },

    takeLast: function takeLast(amount) {
      return this.slice(-Math.max(0, amount));
    },

    takeWhile: function takeWhile(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },

    takeUntil: function takeUntil(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },

    update: function update(fn) {
      return fn(this);
    },

    valueSeq: function valueSeq() {
      return this.toIndexedSeq();
    },

    // ### Hashable Object

    hashCode: function hashCode() {
      return this.__hash || (this.__hash = hashCollection(this));
    },

    // ### Internal

    // abstract __iterate(fn, reverse)

    // abstract __iterator(type, reverse)
  });

  var CollectionPrototype = Collection.prototype;
  CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
  CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
  CollectionPrototype.toJSON = CollectionPrototype.toArray;
  CollectionPrototype.__toStringMapper = quoteString;
  CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
    return this.toString();
  };
  CollectionPrototype.chain = CollectionPrototype.flatMap;
  CollectionPrototype.contains = CollectionPrototype.includes;

  mixin(KeyedCollection, {
    // ### More sequential methods

    flip: function flip() {
      return reify(this, flipFactory(this));
    },

    mapEntries: function mapEntries(mapper, context) {
      var this$1 = this;

      var iterations = 0;
      return reify(
        this,
        this.toSeq()
          .map(function (v, k) { return mapper.call(context, [k, v], iterations++, this$1); })
          .fromEntrySeq()
      );
    },

    mapKeys: function mapKeys(mapper, context) {
      var this$1 = this;

      return reify(
        this,
        this.toSeq()
          .flip()
          .map(function (k, v) { return mapper.call(context, k, v, this$1); })
          .flip()
      );
    },
  });

  var KeyedCollectionPrototype = KeyedCollection.prototype;
  KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
  KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
  KeyedCollectionPrototype.toJSON = toObject;
  KeyedCollectionPrototype.__toStringMapper = function (v, k) { return quoteString(k) + ': ' + quoteString(v); };

  mixin(IndexedCollection, {
    // ### Conversion to other types

    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, false);
    },

    // ### ES6 Collection methods (ES6 Array and Map)

    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },

    findIndex: function findIndex(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    indexOf: function indexOf(searchValue) {
      var key = this.keyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    lastIndexOf: function lastIndexOf(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === undefined ? -1 : key;
    },

    reverse: function reverse() {
      return reify(this, reverseFactory(this, false));
    },

    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },

    splice: function splice(index, removeNum /*, ...values*/) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum || 0, 0);
      if (numArgs === 0 || (numArgs === 2 && !removeNum)) {
        return this;
      }
      // If index is negative, it should resolve relative to the size of the
      // collection. However size may be expensive to compute if not cached, so
      // only call count() if the number is in fact negative.
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(
        this,
        numArgs === 1
          ? spliced
          : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum))
      );
    },

    // ### More collection methods

    findLastIndex: function findLastIndex(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },

    first: function first(notSetValue) {
      return this.get(0, notSetValue);
    },

    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },

    get: function get(index, notSetValue) {
      index = wrapIndex(this, index);
      return index < 0 ||
        (this.size === Infinity || (this.size !== undefined && index > this.size))
        ? notSetValue
        : this.find(function (_, key) { return key === index; }, undefined, notSetValue);
    },

    has: function has(index) {
      index = wrapIndex(this, index);
      return (
        index >= 0 &&
        (this.size !== undefined
          ? this.size === Infinity || index < this.size
          : this.indexOf(index) !== -1)
      );
    },

    interpose: function interpose(separator) {
      return reify(this, interposeFactory(this, separator));
    },

    interleave: function interleave(/*...collections*/) {
      var collections = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * collections.length;
      }
      return reify(this, interleaved);
    },

    keySeq: function keySeq() {
      return Range(0, this.size);
    },

    last: function last(notSetValue) {
      return this.get(-1, notSetValue);
    },

    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },

    zip: function zip(/*, ...collections */) {
      var collections = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, collections));
    },

    zipAll: function zipAll(/*, ...collections */) {
      var collections = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, collections, true));
    },

    zipWith: function zipWith(zipper /*, ...collections */) {
      var collections = arrCopy(arguments);
      collections[0] = this;
      return reify(this, zipWithFactory(this, zipper, collections));
    },
  });

  var IndexedCollectionPrototype = IndexedCollection.prototype;
  IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
  IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;

  mixin(SetCollection, {
    // ### ES6 Collection methods (ES6 Array and Map)

    get: function get(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },

    includes: function includes(value) {
      return this.has(value);
    },

    // ### More sequential methods

    keySeq: function keySeq() {
      return this.valueSeq();
    },
  });

  SetCollection.prototype.has = CollectionPrototype.includes;
  SetCollection.prototype.contains = SetCollection.prototype.includes;

  // Mixin subclasses

  mixin(KeyedSeq, KeyedCollection.prototype);
  mixin(IndexedSeq, IndexedCollection.prototype);
  mixin(SetSeq, SetCollection.prototype);

  // #pragma Helper functions

  function reduce(collection, reducer, reduction, context, useFirst, reverse) {
    assertNotInfinite(collection.size);
    collection.__iterate(function (v, k, c) {
      if (useFirst) {
        useFirst = false;
        reduction = v;
      } else {
        reduction = reducer.call(context, reduction, v, k, c);
      }
    }, reverse);
    return reduction;
  }

  function keyMapper(v, k) {
    return k;
  }

  function entryMapper(v, k) {
    return [k, v];
  }

  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }

  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    };
  }

  function defaultZipper() {
    return arrCopy(arguments);
  }

  function defaultNegComparator(a, b) {
    return a < b ? 1 : a > b ? -1 : 0;
  }

  function hashCollection(collection) {
    if (collection.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(collection);
    var keyed = isKeyed(collection);
    var h = ordered ? 1 : 0;
    var size = collection.__iterate(
      keyed
        ? ordered
          ? function (v, k) {
              h = (31 * h + hashMerge(hash(v), hash(k))) | 0;
            }
          : function (v, k) {
              h = (h + hashMerge(hash(v), hash(k))) | 0;
            }
        : ordered
          ? function (v) {
              h = (31 * h + hash(v)) | 0;
            }
          : function (v) {
              h = (h + hash(v)) | 0;
            }
    );
    return murmurHashOfSize(size, h);
  }

  function murmurHashOfSize(size, h) {
    h = imul(h, 0xcc9e2d51);
    h = imul((h << 15) | (h >>> -15), 0x1b873593);
    h = imul((h << 13) | (h >>> -13), 5);
    h = ((h + 0xe6546b64) | 0) ^ size;
    h = imul(h ^ (h >>> 16), 0x85ebca6b);
    h = imul(h ^ (h >>> 13), 0xc2b2ae35);
    h = smi(h ^ (h >>> 16));
    return h;
  }

  function hashMerge(a, b) {
    return (a ^ (b + 0x9e3779b9 + (a << 6) + (a >> 2))) | 0; // int
  }

  var OrderedSet = (function (Set$$1) {
    function OrderedSet(value) {
      return value === null || value === undefined
        ? emptyOrderedSet()
        : isOrderedSet(value)
          ? value
          : emptyOrderedSet().withMutations(function (set) {
              var iter = SetCollection(value);
              assertNotInfinite(iter.size);
              iter.forEach(function (v) { return set.add(v); });
            });
    }

    if ( Set$$1 ) OrderedSet.__proto__ = Set$$1;
    OrderedSet.prototype = Object.create( Set$$1 && Set$$1.prototype );
    OrderedSet.prototype.constructor = OrderedSet;

    OrderedSet.of = function of (/*...values*/) {
      return this(arguments);
    };

    OrderedSet.fromKeys = function fromKeys (value) {
      return this(KeyedCollection(value).keySeq());
    };

    OrderedSet.prototype.toString = function toString () {
      return this.__toString('OrderedSet {', '}');
    };

    return OrderedSet;
  }(Set));

  OrderedSet.isOrderedSet = isOrderedSet;

  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
  OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
  OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;

  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;

  function makeOrderedSet(map, ownerID) {
    var set = Object.create(OrderedSetPrototype);
    set.size = map ? map.size : 0;
    set._map = map;
    set.__ownerID = ownerID;
    return set;
  }

  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return (
      EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()))
    );
  }

  var Record = function Record(defaultValues, name) {
    var hasInitialized;

    var RecordType = function Record(values) {
      var this$1 = this;

      if (values instanceof RecordType) {
        return values;
      }
      if (!(this instanceof RecordType)) {
        return new RecordType(values);
      }
      if (!hasInitialized) {
        hasInitialized = true;
        var keys = Object.keys(defaultValues);
        var indices = (RecordTypePrototype._indices = {});
        RecordTypePrototype._name = name;
        RecordTypePrototype._keys = keys;
        RecordTypePrototype._defaultValues = defaultValues;
        for (var i = 0; i < keys.length; i++) {
          var propName = keys[i];
          indices[propName] = i;
          if (RecordTypePrototype[propName]) {
            /* eslint-disable no-console */
            typeof console === 'object' &&
              console.warn &&
              console.warn(
                'Cannot define ' +
                  recordName(this$1) +
                  ' with property "' +
                  propName +
                  '" since that property name is part of the Record API.'
              );
            /* eslint-enable no-console */
          } else {
            setProp(RecordTypePrototype, propName);
          }
        }
      }
      this.__ownerID = undefined;
      this._values = List().withMutations(function (l) {
        l.setSize(this$1._keys.length);
        KeyedCollection(values).forEach(function (v, k) {
          l.set(this$1._indices[k], v === this$1._defaultValues[k] ? undefined : v);
        });
      });
    };

    var RecordTypePrototype = (RecordType.prototype = Object.create(
      RecordPrototype
    ));
    RecordTypePrototype.constructor = RecordType;

    return RecordType;
  };

  Record.prototype.toString = function toString () {
      var this$1 = this;

    var str = recordName(this) + ' { ';
    var keys = this._keys;
    var k;
    for (var i = 0, l = keys.length; i !== l; i++) {
      k = keys[i];
      str += (i ? ', ' : '') + k + ': ' + quoteString(this$1.get(k));
    }
    return str + ' }';
  };

  Record.prototype.equals = function equals (other) {
    return (
      this === other ||
      (other &&
        this._keys === other._keys &&
        recordSeq(this).equals(recordSeq(other)))
    );
  };

  Record.prototype.hashCode = function hashCode () {
    return recordSeq(this).hashCode();
  };

  // @pragma Access

  Record.prototype.has = function has (k) {
    return this._indices.hasOwnProperty(k);
  };

  Record.prototype.get = function get (k, notSetValue) {
    if (!this.has(k)) {
      return notSetValue;
    }
    var index = this._indices[k];
    var value = this._values.get(index);
    return value === undefined ? this._defaultValues[k] : value;
  };

  // @pragma Modification

  Record.prototype.set = function set (k, v) {
    if (this.has(k)) {
      var newValues = this._values.set(
        this._indices[k],
        v === this._defaultValues[k] ? undefined : v
      );
      if (newValues !== this._values && !this.__ownerID) {
        return makeRecord(this, newValues);
      }
    }
    return this;
  };

  Record.prototype.remove = function remove (k) {
    return this.set(k);
  };

  Record.prototype.clear = function clear () {
    var newValues = this._values.clear().setSize(this._keys.length);
    return this.__ownerID ? this : makeRecord(this, newValues);
  };

  Record.prototype.wasAltered = function wasAltered () {
    return this._values.wasAltered();
  };

  Record.prototype.toSeq = function toSeq () {
    return recordSeq(this);
  };

  Record.prototype.toJS = function toJS$1 () {
    return toJS(this);
  };

  Record.prototype.entries = function entries () {
    return this.__iterator(ITERATE_ENTRIES);
  };

  Record.prototype.__iterator = function __iterator (type, reverse) {
    return recordSeq(this).__iterator(type, reverse);
  };

  Record.prototype.__iterate = function __iterate (fn, reverse) {
    return recordSeq(this).__iterate(fn, reverse);
  };

  Record.prototype.__ensureOwner = function __ensureOwner (ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newValues = this._values.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._values = newValues;
      return this;
    }
    return makeRecord(this, newValues, ownerID);
  };

  Record.isRecord = isRecord;
  Record.getDescriptiveName = recordName;
  var RecordPrototype = Record.prototype;
  RecordPrototype[IS_RECORD_SYMBOL] = true;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
  RecordPrototype.getIn = getIn$1;
  RecordPrototype.hasIn = CollectionPrototype.hasIn;
  RecordPrototype.merge = merge;
  RecordPrototype.mergeWith = mergeWith;
  RecordPrototype.mergeIn = mergeIn;
  RecordPrototype.mergeDeep = mergeDeep$1;
  RecordPrototype.mergeDeepWith = mergeDeepWith$1;
  RecordPrototype.mergeDeepIn = mergeDeepIn;
  RecordPrototype.setIn = setIn$1;
  RecordPrototype.update = update$1;
  RecordPrototype.updateIn = updateIn$1;
  RecordPrototype.withMutations = withMutations;
  RecordPrototype.asMutable = asMutable;
  RecordPrototype.asImmutable = asImmutable;
  RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
  RecordPrototype.toJSON = RecordPrototype.toObject =
    CollectionPrototype.toObject;
  RecordPrototype.inspect = RecordPrototype.toSource = function() {
    return this.toString();
  };

  function makeRecord(likeRecord, values, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._values = values;
    record.__ownerID = ownerID;
    return record;
  }

  function recordName(record) {
    return record._name || record.constructor.name || 'Record';
  }

  function recordSeq(record) {
    return keyedSeqFromValue(record._keys.map(function (k) { return [k, record.get(k)]; }));
  }

  function setProp(prototype, name) {
    try {
      Object.defineProperty(prototype, name, {
        get: function() {
          return this.get(name);
        },
        set: function(value) {
          invariant(this.__ownerID, 'Cannot set on an immutable record.');
          this.set(name, value);
        },
      });
    } catch (error) {
      // Object.defineProperty failed. Probably IE8.
    }
  }

  /**
   * Returns a lazy Seq of `value` repeated `times` times. When `times` is
   * undefined, returns an infinite sequence of `value`.
   */
  var Repeat = (function (IndexedSeq$$1) {
    function Repeat(value, times) {
      if (!(this instanceof Repeat)) {
        return new Repeat(value, times);
      }
      this._value = value;
      this.size = times === undefined ? Infinity : Math.max(0, times);
      if (this.size === 0) {
        if (EMPTY_REPEAT) {
          return EMPTY_REPEAT;
        }
        EMPTY_REPEAT = this;
      }
    }

    if ( IndexedSeq$$1 ) Repeat.__proto__ = IndexedSeq$$1;
    Repeat.prototype = Object.create( IndexedSeq$$1 && IndexedSeq$$1.prototype );
    Repeat.prototype.constructor = Repeat;

    Repeat.prototype.toString = function toString () {
      if (this.size === 0) {
        return 'Repeat []';
      }
      return 'Repeat [ ' + this._value + ' ' + this.size + ' times ]';
    };

    Repeat.prototype.get = function get (index, notSetValue) {
      return this.has(index) ? this._value : notSetValue;
    };

    Repeat.prototype.includes = function includes (searchValue) {
      return is(this._value, searchValue);
    };

    Repeat.prototype.slice = function slice (begin, end) {
      var size = this.size;
      return wholeSlice(begin, end, size)
        ? this
        : new Repeat(
            this._value,
            resolveEnd(end, size) - resolveBegin(begin, size)
          );
    };

    Repeat.prototype.reverse = function reverse () {
      return this;
    };

    Repeat.prototype.indexOf = function indexOf (searchValue) {
      if (is(this._value, searchValue)) {
        return 0;
      }
      return -1;
    };

    Repeat.prototype.lastIndexOf = function lastIndexOf (searchValue) {
      if (is(this._value, searchValue)) {
        return this.size;
      }
      return -1;
    };

    Repeat.prototype.__iterate = function __iterate (fn, reverse) {
      var this$1 = this;

      var size = this.size;
      var i = 0;
      while (i !== size) {
        if (fn(this$1._value, reverse ? size - ++i : i++, this$1) === false) {
          break;
        }
      }
      return i;
    };

    Repeat.prototype.__iterator = function __iterator (type, reverse) {
      var this$1 = this;

      var size = this.size;
      var i = 0;
      return new Iterator(
        function () { return i === size
            ? iteratorDone()
            : iteratorValue(type, reverse ? size - ++i : i++, this$1._value); }
      );
    };

    Repeat.prototype.equals = function equals (other) {
      return other instanceof Repeat
        ? is(this._value, other._value)
        : deepEqual(other);
    };

    return Repeat;
  }(IndexedSeq));

  var EMPTY_REPEAT;

  function fromJS(value, converter) {
    return fromJSWith(
      [],
      converter || defaultConverter,
      value,
      '',
      converter && converter.length > 2 ? [] : undefined,
      { '': value }
    );
  }

  function fromJSWith(stack, converter, value, key, keyPath, parentValue) {
    var toSeq = Array.isArray(value)
      ? IndexedSeq
      : isPlainObj(value)
        ? KeyedSeq
        : null;
    if (toSeq) {
      if (~stack.indexOf(value)) {
        throw new TypeError('Cannot convert circular structure to Immutable');
      }
      stack.push(value);
      keyPath && key !== '' && keyPath.push(key);
      var converted = converter.call(
        parentValue,
        key,
        toSeq(value).map(function (v, k) { return fromJSWith(stack, converter, v, k, keyPath, value); }
        ),
        keyPath && keyPath.slice()
      );
      stack.pop();
      keyPath && keyPath.pop();
      return converted;
    }
    return value;
  }

  function defaultConverter(k, v) {
    return isKeyed(v) ? v.toMap() : v.toList();
  }

  var version = "4.0.0-rc.10";

  var Immutable = {
    version: version,

    Collection: Collection,
    // Note: Iterable is deprecated
    Iterable: Collection,

    Seq: Seq,
    Map: Map,
    OrderedMap: OrderedMap,
    List: List,
    Stack: Stack,
    Set: Set,
    OrderedSet: OrderedSet,

    Record: Record,
    Range: Range,
    Repeat: Repeat,

    is: is,
    fromJS: fromJS,
    hash: hash,

    isImmutable: isImmutable,
    isCollection: isCollection,
    isKeyed: isKeyed,
    isIndexed: isIndexed,
    isAssociative: isAssociative,
    isOrdered: isOrdered,
    isValueObject: isValueObject,
    isSeq: isSeq,
    isList: isList,
    isMap: isMap,
    isOrderedMap: isOrderedMap,
    isStack: isStack,
    isSet: isSet,
    isOrderedSet: isOrderedSet,
    isRecord: isRecord,

    get: get,
    getIn: getIn,
    has: has,
    hasIn: hasIn,
    merge: merge$1,
    mergeDeep: mergeDeep,
    mergeWith: mergeWith$1,
    mergeDeepWith: mergeDeepWith,
    remove: remove,
    removeIn: removeIn,
    set: set,
    setIn: setIn,
    update: update,
    updateIn: updateIn,
  };

  // Note: Iterable is deprecated
  var Iterable = Collection;

  exports.default = Immutable;
  exports.version = version;
  exports.Collection = Collection;
  exports.Iterable = Iterable;
  exports.Seq = Seq;
  exports.Map = Map;
  exports.OrderedMap = OrderedMap;
  exports.List = List;
  exports.Stack = Stack;
  exports.Set = Set;
  exports.OrderedSet = OrderedSet;
  exports.Record = Record;
  exports.Range = Range;
  exports.Repeat = Repeat;
  exports.is = is;
  exports.fromJS = fromJS;
  exports.hash = hash;
  exports.isImmutable = isImmutable;
  exports.isCollection = isCollection;
  exports.isKeyed = isKeyed;
  exports.isIndexed = isIndexed;
  exports.isAssociative = isAssociative;
  exports.isOrdered = isOrdered;
  exports.isValueObject = isValueObject;
  exports.get = get;
  exports.getIn = getIn;
  exports.has = has;
  exports.hasIn = hasIn;
  exports.merge = merge$1;
  exports.mergeDeep = mergeDeep;
  exports.mergeWith = mergeWith$1;
  exports.mergeDeepWith = mergeDeepWith;
  exports.remove = remove;
  exports.removeIn = removeIn;
  exports.set = set;
  exports.setIn = setIn;
  exports.update = update;
  exports.updateIn = updateIn;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}],106:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":128}],107:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = chain;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(chain);

function chain() {
  var _len,
      arrayOfIter,
      _key,
      _i,
      iterable,
      _args = arguments;

  return _regenerator.default.wrap(function chain$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          for (_len = _args.length, arrayOfIter = new Array(_len), _key = 0; _key < _len; _key++) {
            arrayOfIter[_key] = _args[_key];
          }

          _i = 0;

        case 2:
          if (!(_i < arrayOfIter.length)) {
            _context.next = 8;
            break;
          }

          iterable = arrayOfIter[_i];
          return _context.delegateYield((0, _ensureIterable.default)(iterable), "t0", 5);

        case 5:
          _i++;
          _context.next = 2;
          break;

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],108:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compose;

function compose() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return fns.reduce(function (f, g) {
    return function () {
      return f(g.apply(void 0, arguments));
    };
  });
}

module.exports = exports["default"];
},{}],109:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _chain = _interopRequireDefault(require("./chain"));

var _default = _chain.default;
exports.default = _default;
module.exports = exports["default"];
},{"./chain":107,"@babel/runtime-corejs2/helpers/interopRequireDefault":9}],110:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = entries;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(entries);

var emptyArr = [];

function entries(entriesable) {
  var key;
  return _regenerator.default.wrap(function entries$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(entriesable == null)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", (0, _getIterator2.default)(emptyArr));

        case 4:
          if (!(typeof entriesable.entries === 'function')) {
            _context.next = 8;
            break;
          }

          return _context.delegateYield(entriesable.entries(), "t0", 6);

        case 6:
          _context.next = 17;
          break;

        case 8:
          if (!((0, _typeof2.default)(entriesable) === 'object')) {
            _context.next = 17;
            break;
          }

          _context.t1 = _regenerator.default.keys(entriesable);

        case 10:
          if ((_context.t2 = _context.t1()).done) {
            _context.next = 17;
            break;
          }

          key = _context.t2.value;

          if (!entriesable.hasOwnProperty(key)) {
            _context.next = 15;
            break;
          }

          _context.next = 15;
          return [key, entriesable[key]];

        case 15:
          _context.next = 10;
          break;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = exports["default"];
},{"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/helpers/typeof":10,"@babel/runtime-corejs2/regenerator":11}],111:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curriedFilter;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(filter);

function filter(func, iterable) {
  var c, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return _regenerator.default.wrap(function filter$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          c = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = (0, _getIterator2.default)((0, _ensureIterable.default)(iterable));

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 14;
            break;
          }

          item = _step.value;

          if (!func(item, c++)) {
            _context.next = 11;
            break;
          }

          _context.next = 11;
          return item;

        case 11:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 20:
          _context.prev = 20;
          _context.prev = 21;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 23:
          _context.prev = 23;

          if (!_didIteratorError) {
            _context.next = 26;
            break;
          }

          throw _iteratorError;

        case 26:
          return _context.finish(23);

        case 27:
          return _context.finish(20);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[4, 16, 20, 28], [21,, 23, 27]]);
}

function curriedFilter(func, iterable) {
  if (arguments.length === 1) {
    return function (iterable) {
      return filter(func, iterable);
    };
  }

  return filter(func, iterable);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],112:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curriedFlat;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _iterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var defaultShouldIFlat = function defaultShouldIFlat(depth) {
  if (typeof depth === 'function') {
    return depth;
  }

  if (typeof depth === 'number') {
    return function (currentDepth, iter) {
      return currentDepth <= depth && typeof iter[_iterator2.default] === 'function' && typeof iter !== 'string';
    };
  }

  throw new Error('flat: "depth" can be a function or a number');
};

function flat(shouldIFlat, iterable) {
  var _marked =
  /*#__PURE__*/
  _regenerator.default.mark(_flat);

  function _flat(currentDepth, iterable) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, iter;

    return _regenerator.default.wrap(function _flat$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!shouldIFlat(currentDepth, iterable)) {
              _context.next = 28;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 4;
            _iterator = (0, _getIterator2.default)(iterable);

          case 6:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 12;
              break;
            }

            iter = _step.value;
            return _context.delegateYield(_flat(currentDepth + 1, iter), "t0", 9);

          case 9:
            _iteratorNormalCompletion = true;
            _context.next = 6;
            break;

          case 12:
            _context.next = 18;
            break;

          case 14:
            _context.prev = 14;
            _context.t1 = _context["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context.t1;

          case 18:
            _context.prev = 18;
            _context.prev = 19;

            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }

          case 21:
            _context.prev = 21;

            if (!_didIteratorError) {
              _context.next = 24;
              break;
            }

            throw _iteratorError;

          case 24:
            return _context.finish(21);

          case 25:
            return _context.finish(18);

          case 26:
            _context.next = 30;
            break;

          case 28:
            _context.next = 30;
            return iterable;

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _marked, this, [[4, 14, 18, 26], [19,, 21, 25]]);
  }

  return _flat(0, (0, _ensureIterable.default)(iterable));
}

function curriedFlat() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 0) {
    return function (iterable) {
      return flat(defaultShouldIFlat(1), iterable);
    };
  } else if (args.length === 1) {
    if (typeof args[0][_iterator2.default] === 'function') {
      return flat(defaultShouldIFlat(1), args[0]);
    } else {
      return function (iterable) {
        return flat(defaultShouldIFlat(args[0]), iterable);
      };
    }
  } else {
    return flat(defaultShouldIFlat(args[0]), args[1]);
  }
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/core-js/symbol/iterator":6,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],113:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var CircularBuffer =
/*#__PURE__*/
function () {
  function CircularBuffer(size) {
    (0, _classCallCheck2.default)(this, CircularBuffer);
    this.array = new Array(size);
    this._size = size;
    this.counter = 0;
  }

  (0, _createClass2.default)(CircularBuffer, [{
    key: "push",
    value: function push(newItem) {
      this.counter++;
      var index = this.counter % this._size;
      var currentItem = this.array[index];
      this.array[index] = newItem;
      return currentItem;
    }
  }, {
    key: _iterator.default,
    value:
    /*#__PURE__*/
    _regenerator.default.mark(function value() {
      var counter, i;
      return _regenerator.default.wrap(function value$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              counter = this.counter;
              i = 0;

            case 2:
              if (!(i < this._size)) {
                _context.next = 9;
                break;
              }

              counter++;
              _context.next = 6;
              return this.array[counter % this._size];

            case 6:
              i++;
              _context.next = 2;
              break;

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, value, this);
    })
  }]);
  return CircularBuffer;
}();

exports.default = CircularBuffer;
module.exports = exports["default"];
},{"@babel/runtime-corejs2/core-js/symbol/iterator":6,"@babel/runtime-corejs2/helpers/classCallCheck":7,"@babel/runtime-corejs2/helpers/createClass":8,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],114:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ensureIterable;

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var emptyArr = [];

function ensureIterable(i) {
  if (i == null) {
    return (0, _getIterator2.default)(emptyArr);
  } else if (!i[_iterator.default]) {
    if (typeof i.next === 'function') {
      throw new TypeError('Iterators are not supported arguments to iter-tools. You must wrap them using the `iterable` method.');
    }

    throw new TypeError('The argument is not an iterable or null');
  }

  return i;
}

module.exports = exports["default"];
},{"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/core-js/symbol/iterator":6,"@babel/runtime-corejs2/helpers/interopRequireDefault":9}],115:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curriedInterpose;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(interpose);

function interpose(interposeItem, iterable) {
  var first, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return _regenerator.default.wrap(function interpose$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          first = true;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = (0, _getIterator2.default)((0, _ensureIterable.default)(iterable));

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 17;
            break;
          }

          item = _step.value;

          if (first) {
            _context.next = 11;
            break;
          }

          _context.next = 11;
          return interposeItem;

        case 11:
          _context.next = 13;
          return item;

        case 13:
          first = false;

        case 14:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 17:
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 23:
          _context.prev = 23;
          _context.prev = 24;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 26:
          _context.prev = 26;

          if (!_didIteratorError) {
            _context.next = 29;
            break;
          }

          throw _iteratorError;

        case 29:
          return _context.finish(26);

        case 30:
          return _context.finish(23);

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[4, 19, 23, 31], [24,, 26, 30]]);
}

function curriedInterpose(interposeItem, iterable) {
  if (arguments.length === 1) {
    return function (iterable) {
      return interpose(interposeItem, iterable);
    };
  }

  return interpose(interposeItem, iterable);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],116:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = keys;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(keys);

var emptyArr = [];

function keys(keysable) {
  var key;
  return _regenerator.default.wrap(function keys$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(keysable == null)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return", (0, _getIterator2.default)(emptyArr));

        case 4:
          if (!(typeof keysable.keys === 'function')) {
            _context.next = 8;
            break;
          }

          return _context.delegateYield(keysable.keys(), "t0", 6);

        case 6:
          _context.next = 17;
          break;

        case 8:
          if (!((0, _typeof2.default)(keysable) === 'object')) {
            _context.next = 17;
            break;
          }

          _context.t1 = _regenerator.default.keys(keysable);

        case 10:
          if ((_context.t2 = _context.t1()).done) {
            _context.next = 17;
            break;
          }

          key = _context.t2.value;

          if (!keysable.hasOwnProperty(key)) {
            _context.next = 15;
            break;
          }

          _context.next = 15;
          return key;

        case 15:
          _context.next = 10;
          break;

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = exports["default"];
},{"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/helpers/typeof":10,"@babel/runtime-corejs2/regenerator":11}],117:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curriedMap;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(map);

function map(func, iterable) {
  var c, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return _regenerator.default.wrap(function map$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          c = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = (0, _getIterator2.default)((0, _ensureIterable.default)(iterable));

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 13;
            break;
          }

          item = _step.value;
          _context.next = 10;
          return func(item, c++);

        case 10:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 13:
          _context.next = 19;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 19:
          _context.prev = 19;
          _context.prev = 20;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 22:
          _context.prev = 22;

          if (!_didIteratorError) {
            _context.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context.finish(22);

        case 26:
          return _context.finish(19);

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[4, 15, 19, 27], [20,, 22, 26]]);
}

function curriedMap(func, iterable) {
  if (arguments.length === 1) {
    return function (iterable) {
      return map(func, iterable);
    };
  }

  return map(func, iterable);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],118:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = range;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(range);

function range(opts) {
  var start, step, end, i;
  return _regenerator.default.wrap(function range$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          opts = typeof opts === 'number' ? {
            end: opts,
            start: 0
          } : (0, _typeof2.default)(opts) === 'object' ? opts : {};
          step = typeof opts.step === 'undefined' ? 1 : opts.step;
          end = typeof opts.end === 'undefined' ? step > 0 ? Infinity : -Infinity : opts.end;
          start = opts.start ? opts.start : 0;
          i = start;

        case 5:
          if (!(step > 0 ? i < end : i > end)) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return i;

        case 8:
          i += step;
          _context.next = 5;
          break;

        case 11:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = exports["default"];
},{"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/helpers/typeof":10,"@babel/runtime-corejs2/regenerator":11}],119:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curriedReduce;

var _iterator = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

function reduce(initial, func, iterable) {
  var c = 0;
  var acc = initial;
  var iterator = (0, _getIterator2.default)((0, _ensureIterable.default)(iterable));

  try {
    if (initial === undefined) {
      var firstResult = iterator.next();

      if (firstResult.done) {
        throw new Error('Cannot reduce: no initial value specified and iterable was empty');
      }

      acc = firstResult.value;
      c = 1;
    }

    var result;

    while (!(result = iterator.next()).done) {
      acc = func(acc, result.value, c++);
    }

    return acc;
  } finally {
    // close the iterable in case of exceptions
    if (typeof iterable.return === 'function') iterable.return();
  }
}

function curriedReduce(initial, func, iterable) {
  // is this complete? has an iterable been specified? (func can never be iterable)
  //    is there an iterable that comes after func
  //    work backwards from there
  var hasIterable = false;

  if (arguments.length === 1) {
    func = initial;
    initial = undefined;
  } else if (arguments.length === 2 && (func == null || func[_iterator.default])) {
    iterable = func;
    func = initial;
    initial = undefined;
    hasIterable = true;
  } else if (arguments.length === 3) {
    hasIterable = true;
  }

  if (!hasIterable) {
    return function (iterable) {
      return reduce(initial, func, iterable);
    };
  }

  return reduce(initial, func, iterable);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/core-js/symbol/iterator":6,"@babel/runtime-corejs2/helpers/interopRequireDefault":9}],120:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = repeat;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(repeat);

function repeat(obj) {
  var times,
      _args = arguments;
  return _regenerator.default.wrap(function repeat$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          times = _args.length > 1 && _args[1] !== undefined ? _args[1] : Infinity;

        case 1:
          if (!times--) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return obj;

        case 4:
          _context.next = 1;
          break;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

module.exports = exports["default"];
},{"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],121:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = size;

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

function size(iterable) {
  var size = 0; // eslint-disable-next-line

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator2.default)((0, _ensureIterable.default)(iterable)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ = _step.value;
      size++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return size;
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9}],122:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curriedSlice;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _circularBuffer = _interopRequireDefault(require("./internal/circular-buffer"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(simpleSlice),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(slice);

function bufferedSlice(iterable, start, end, step) {
  var bufferSize = Math.abs(start);
  var buffer = new _circularBuffer.default(bufferSize);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator2.default)(iterable), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      buffer.push(item);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var newEnd;

  if (isFinite(end) && end > 0) {
    newEnd = end - (buffer.counter - bufferSize);
    if (newEnd < 0) return [];
  } else {
    newEnd = end;
  }

  return simpleSlice(buffer, 0, newEnd, step);
}

function simpleSlice(iterable, start, end, step) {
  var currentPos, nextValidPos, bufferSize, buffer, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, item;

  return _regenerator.default.wrap(function simpleSlice$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          currentPos = 0;
          nextValidPos = start;
          bufferSize = Math.abs(end);

          if (end < 0) {
            buffer = new _circularBuffer.default(bufferSize);
          }

          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 7;
          _iterator2 = (0, _getIterator2.default)(iterable);

        case 9:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 25;
            break;
          }

          item = _step2.value;

          if (!buffer) {
            _context.next = 15;
            break;
          }

          item = buffer.push(item);

          if (!(buffer.counter <= bufferSize)) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("continue", 22);

        case 15:
          if (!(currentPos >= end && end >= 0)) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("break", 25);

        case 17:
          if (!(nextValidPos === currentPos)) {
            _context.next = 21;
            break;
          }

          _context.next = 20;
          return item;

        case 20:
          nextValidPos += step;

        case 21:
          currentPos++;

        case 22:
          _iteratorNormalCompletion2 = true;
          _context.next = 9;
          break;

        case 25:
          _context.next = 31;
          break;

        case 27:
          _context.prev = 27;
          _context.t0 = _context["catch"](7);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t0;

        case 31:
          _context.prev = 31;
          _context.prev = 32;

          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }

        case 34:
          _context.prev = 34;

          if (!_didIteratorError2) {
            _context.next = 37;
            break;
          }

          throw _iteratorError2;

        case 37:
          return _context.finish(34);

        case 38:
          return _context.finish(31);

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[7, 27, 31, 39], [32,, 34, 38]]);
}

function slice(opts, iterable) {
  var start, step, end;
  return _regenerator.default.wrap(function slice$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          opts = typeof opts === 'number' ? {
            end: opts,
            start: 0
          } : opts;
          step = typeof opts.step === 'undefined' ? 1 : opts.step;
          end = typeof opts.end === 'undefined' ? Infinity : opts.end;
          start = opts.start ? opts.start : 0;
          iterable = (0, _ensureIterable.default)(iterable);

          if (!(step <= 0)) {
            _context2.next = 7;
            break;
          }

          throw new TypeError('Cannot slice with step <= 0');

        case 7:
          if (!(start >= 0)) {
            _context2.next = 11;
            break;
          }

          return _context2.delegateYield(simpleSlice(iterable, start, end, step), "t0", 9);

        case 9:
          _context2.next = 12;
          break;

        case 11:
          return _context2.delegateYield(bufferedSlice(iterable, start, end, step), "t1", 12);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, this);
}

function curriedSlice(opts, iterable) {
  if (arguments.length === 1) {
    return function (iterable) {
      return slice(opts, iterable);
    };
  }

  return slice(opts, iterable);
}

module.exports = exports["default"];
},{"./internal/circular-buffer":113,"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],123:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = curriedTap;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(tap);

function tap(func, iterable) {
  var c, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;

  return _regenerator.default.wrap(function tap$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          c = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 4;
          _iterator = (0, _getIterator2.default)((0, _ensureIterable.default)(iterable));

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 14;
            break;
          }

          item = _step.value;
          func(item, c++);
          _context.next = 11;
          return item;

        case 11:
          _iteratorNormalCompletion = true;
          _context.next = 6;
          break;

        case 14:
          _context.next = 20;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](4);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 20:
          _context.prev = 20;
          _context.prev = 21;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 23:
          _context.prev = 23;

          if (!_didIteratorError) {
            _context.next = 26;
            break;
          }

          throw _iteratorError;

        case 26:
          return _context.finish(23);

        case 27:
          return _context.finish(20);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[4, 16, 20, 28], [21,, 23, 27]]);
}

function curriedTap(func, iterable) {
  if (arguments.length === 1) {
    return function (iterable) {
      return tap(func, iterable);
    };
  }

  return tap(func, iterable);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],124:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _zipLongest = _interopRequireDefault(require("./zip-longest"));

var _default = _zipLongest.default;
exports.default = _default;
module.exports = exports["default"];
},{"./zip-longest":125,"@babel/runtime-corejs2/helpers/interopRequireDefault":9}],125:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = zipLongest;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(zipLongest);

function zipLongest() {
  var _len,
      iterables,
      _key,
      iters,
      numberOfExhausted,
      zipped,
      i,
      _iteratorNormalCompletion,
      _didIteratorError,
      _iteratorError,
      _iterator,
      _step,
      iter,
      _iter$next,
      done,
      value,
      _iteratorNormalCompletion2,
      _didIteratorError2,
      _iteratorError2,
      _iterator2,
      _step2,
      _iter,
      _args = arguments;

  return _regenerator.default.wrap(function zipLongest$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          for (_len = _args.length, iterables = new Array(_len), _key = 0; _key < _len; _key++) {
            iterables[_key] = _args[_key];
          }

          iters = iterables.map(function (i) {
            return (0, _getIterator2.default)((0, _ensureIterable.default)(i));
          });
          _context.prev = 2;

        case 3:
          if (!true) {
            _context.next = 32;
            break;
          }

          numberOfExhausted = 0;
          zipped = new Array(iterables.length);
          i = 0;
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 10;

          for (_iterator = (0, _getIterator2.default)(iters); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            iter = _step.value;
            _iter$next = iter.next(), done = _iter$next.done, value = _iter$next.value;

            if (done) {
              numberOfExhausted++;
            }

            zipped[i++] = done ? undefined : value;
          }

          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](10);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 18:
          _context.prev = 18;
          _context.prev = 19;

          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }

        case 21:
          _context.prev = 21;

          if (!_didIteratorError) {
            _context.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return _context.finish(21);

        case 25:
          return _context.finish(18);

        case 26:
          if (!(iters.length === numberOfExhausted)) {
            _context.next = 28;
            break;
          }

          return _context.abrupt("return");

        case 28:
          _context.next = 30;
          return zipped;

        case 30:
          _context.next = 3;
          break;

        case 32:
          _context.prev = 32;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 36;

          for (_iterator2 = (0, _getIterator2.default)(iters); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            _iter = _step2.value;
            if (typeof _iter.return === 'function') _iter.return();
          }

          _context.next = 44;
          break;

        case 40:
          _context.prev = 40;
          _context.t1 = _context["catch"](36);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t1;

        case 44:
          _context.prev = 44;
          _context.prev = 45;

          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }

        case 47:
          _context.prev = 47;

          if (!_didIteratorError2) {
            _context.next = 50;
            break;
          }

          throw _iteratorError2;

        case 50:
          return _context.finish(47);

        case 51:
          return _context.finish(44);

        case 52:
          return _context.finish(32);

        case 53:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[2,, 32, 53], [10, 14, 18, 26], [19,, 21, 25], [36, 40, 44, 52], [45,, 47, 51]]);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],126:[function(require,module,exports){
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = zip;

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _getIterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/get-iterator"));

var _ensureIterable = _interopRequireDefault(require("./internal/ensure-iterable"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(zip);

function closeIterators(iters, except) {
  var c = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = (0, _getIterator2.default)(iters), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var iter = _step.value;

      if (c === except) {
        c++;
        continue;
      }

      if (typeof iter.return === 'function') iter.return();
      c++;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function zip() {
  var _len,
      iterables,
      _key,
      iters,
      zipped,
      i,
      c,
      _iteratorNormalCompletion2,
      _didIteratorError2,
      _iteratorError2,
      _iterator2,
      _step2,
      iter,
      _iter$next,
      done,
      value,
      _args = arguments;

  return _regenerator.default.wrap(function zip$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          for (_len = _args.length, iterables = new Array(_len), _key = 0; _key < _len; _key++) {
            iterables[_key] = _args[_key];
          }

          iters = iterables.map(function (i) {
            return (0, _getIterator2.default)((0, _ensureIterable.default)(i));
          });
          _context.prev = 2;

        case 3:
          if (!true) {
            _context.next = 41;
            break;
          }

          zipped = new Array(iterables.length);
          i = 0;
          c = 0;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 10;
          _iterator2 = (0, _getIterator2.default)(iters);

        case 12:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            _context.next = 23;
            break;
          }

          iter = _step2.value;
          _iter$next = iter.next(), done = _iter$next.done, value = _iter$next.value;

          if (!done) {
            _context.next = 18;
            break;
          }

          closeIterators(iters, c); // clean up unfinished iterators

          return _context.abrupt("return");

        case 18:
          c++;
          zipped[i++] = value;

        case 20:
          _iteratorNormalCompletion2 = true;
          _context.next = 12;
          break;

        case 23:
          _context.next = 29;
          break;

        case 25:
          _context.prev = 25;
          _context.t0 = _context["catch"](10);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t0;

        case 29:
          _context.prev = 29;
          _context.prev = 30;

          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }

        case 32:
          _context.prev = 32;

          if (!_didIteratorError2) {
            _context.next = 35;
            break;
          }

          throw _iteratorError2;

        case 35:
          return _context.finish(32);

        case 36:
          return _context.finish(29);

        case 37:
          _context.next = 39;
          return zipped;

        case 39:
          _context.next = 3;
          break;

        case 41:
          _context.prev = 41;
          closeIterators(iters);
          return _context.finish(41);

        case 44:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this, [[2,, 41, 44], [10, 25, 29, 37], [30,, 32, 36]]);
}

module.exports = exports["default"];
},{"./internal/ensure-iterable":114,"@babel/runtime-corejs2/core-js/get-iterator":3,"@babel/runtime-corejs2/helpers/interopRequireDefault":9,"@babel/runtime-corejs2/regenerator":11}],127:[function(require,module,exports){
(function (global){
/**
 * marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/markedjs/marked
 */

;(function(root) {
'use strict';

/**
 * Block-Level Grammar
 */

var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
  def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
  table: noop,
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
  paragraph: /^([^\n]+(?:\n?(?!hr|heading|lheading| {0,3}>|tag)[^\n]+)+)/,
  text: /^[^\n]+/
};

block._label = /(?:\\[\[\]]|[^\[\]])+/;
block._title = /(?:"(?:\\"|[^"]|"[^"\n]*")*"|'\n?(?:[^'\n]+\n?)*'|\([^()]*\))/;
block.def = edit(block.def)
  .replace('label', block._label)
  .replace('title', block._title)
  .getRegex();

block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = edit(block.item, 'gm')
  .replace(/bull/g, block.bullet)
  .getRegex();

block.list = edit(block.list)
  .replace(/bull/g, block.bullet)
  .replace('hr', '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))')
  .replace('def', '\\n+(?=' + block.def.source + ')')
  .getRegex();

block._tag = '(?!(?:'
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b';

block.html = edit(block.html)
  .replace('comment', /<!--[\s\S]*?-->/)
  .replace('closed', /<(tag)[\s\S]+?<\/\1>/)
  .replace('closing', /<tag(?:"[^"]*"|'[^']*'|\s[^'"\/>\s]*)*?\/?>/)
  .replace(/tag/g, block._tag)
  .getRegex();

block.paragraph = edit(block.paragraph)
  .replace('hr', block.hr)
  .replace('heading', block.heading)
  .replace('lheading', block.lheading)
  .replace('tag', '<' + block._tag)
  .getRegex();

block.blockquote = edit(block.blockquote)
  .replace('paragraph', block.paragraph)
  .getRegex();

/**
 * Normal Block Grammar
 */

block.normal = merge({}, block);

/**
 * GFM Block Grammar
 */

block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\n? *\1 *(?:\n+|$)/,
  paragraph: /^/,
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/
});

block.gfm.paragraph = edit(block.paragraph)
  .replace('(?!', '(?!'
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'
    + block.list.source.replace('\\1', '\\3') + '|')
  .getRegex();

/**
 * GFM + Tables Block Grammar
 */

block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});

/**
 * Block Lexer
 */

function Lexer(options) {
  this.tokens = [];
  this.tokens.links = {};
  this.options = options || marked.defaults;
  this.rules = block.normal;

  if (this.options.gfm) {
    if (this.options.tables) {
      this.rules = block.tables;
    } else {
      this.rules = block.gfm;
    }
  }
}

/**
 * Expose Block Rules
 */

Lexer.rules = block;

/**
 * Static Lex Method
 */

Lexer.lex = function(src, options) {
  var lexer = new Lexer(options);
  return lexer.lex(src);
};

/**
 * Preprocessing
 */

Lexer.prototype.lex = function(src) {
  src = src
    .replace(/\r\n|\r/g, '\n')
    .replace(/\t/g, '    ')
    .replace(/\u00a0/g, ' ')
    .replace(/\u2424/g, '\n');

  return this.token(src, true);
};

/**
 * Lexing
 */

Lexer.prototype.token = function(src, top) {
  src = src.replace(/^ +$/gm, '');
  var next,
      loose,
      cap,
      bull,
      b,
      item,
      space,
      i,
      tag,
      l,
      isordered;

  while (src) {
    // newline
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[0].length > 1) {
        this.tokens.push({
          type: 'space'
        });
      }
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
      this.tokens.push({
        type: 'code',
        text: !this.options.pedantic
          ? cap.replace(/\n+$/, '')
          : cap
      });
      continue;
    }

    // fences (gfm)
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'code',
        lang: cap[2],
        text: cap[3] || ''
      });
      continue;
    }

    // heading
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[1].length,
        text: cap[2]
      });
      continue;
    }

    // table no leading pipe (gfm)
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i].split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // hr
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'hr'
      });
      continue;
    }

    // blockquote
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);

      this.tokens.push({
        type: 'blockquote_start'
      });

      cap = cap[0].replace(/^ *> ?/gm, '');

      // Pass `top` to keep the current
      // "toplevel" state. This is exactly
      // how markdown.pl works.
      this.token(cap, top);

      this.tokens.push({
        type: 'blockquote_end'
      });

      continue;
    }

    // list
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      bull = cap[2];
      isordered = bull.length > 1;

      this.tokens.push({
        type: 'list_start',
        ordered: isordered,
        start: isordered ? +bull : ''
      });

      // Get each top-level item.
      cap = cap[0].match(this.rules.item);

      next = false;
      l = cap.length;
      i = 0;

      for (; i < l; i++) {
        item = cap[i];

        // Remove the list item's bullet
        // so it is seen as the next token.
        space = item.length;
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');

        // Outdent whatever the
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          space -= item.length;
          item = !this.options.pedantic
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
            : item.replace(/^ {1,4}/gm, '');
        }

        // Determine whether the next list item belongs here.
        // Backpedal if it does not belong in this list.
        if (this.options.smartLists && i !== l - 1) {
          b = block.bullet.exec(cap[i + 1])[0];
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {
            src = cap.slice(i + 1).join('\n') + src;
            i = l - 1;
          }
        }

        // Determine whether item is loose or not.
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
        // for discount behavior.
        loose = next || /\n\n(?!\s*$)/.test(item);
        if (i !== l - 1) {
          next = item.charAt(item.length - 1) === '\n';
          if (!loose) loose = next;
        }

        this.tokens.push({
          type: loose
            ? 'loose_item_start'
            : 'list_item_start'
        });

        // Recurse.
        this.token(item, false);

        this.tokens.push({
          type: 'list_item_end'
        });
      }

      this.tokens.push({
        type: 'list_end'
      });

      continue;
    }

    // html
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: this.options.sanitize
          ? 'paragraph'
          : 'html',
        pre: !this.options.sanitizer
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
        text: cap[0]
      });
      continue;
    }

    // def
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
      if (cap[3]) cap[3] = cap[3].substring(1, cap[3].length - 1);
      tag = cap[1].toLowerCase();
      if (!this.tokens.links[tag]) {
        this.tokens.links[tag] = {
          href: cap[2],
          title: cap[3]
        };
      }
      continue;
    }

    // table (gfm)
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);

      item = {
        type: 'table',
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
      };

      for (i = 0; i < item.align.length; i++) {
        if (/^ *-+: *$/.test(item.align[i])) {
          item.align[i] = 'right';
        } else if (/^ *:-+: *$/.test(item.align[i])) {
          item.align[i] = 'center';
        } else if (/^ *:-+ *$/.test(item.align[i])) {
          item.align[i] = 'left';
        } else {
          item.align[i] = null;
        }
      }

      for (i = 0; i < item.cells.length; i++) {
        item.cells[i] = item.cells[i]
          .replace(/^ *\| *| *\| *$/g, '')
          .split(/ *\| */);
      }

      this.tokens.push(item);

      continue;
    }

    // lheading
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'heading',
        depth: cap[2] === '=' ? 1 : 2,
        text: cap[1]
      });
      continue;
    }

    // top-level paragraph
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'paragraph',
        text: cap[1].charAt(cap[1].length - 1) === '\n'
          ? cap[1].slice(0, -1)
          : cap[1]
      });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      // Top-level should never reach here.
      src = src.substring(cap[0].length);
      this.tokens.push({
        type: 'text',
        text: cap[0]
      });
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return this.tokens;
};

/**
 * Inline-Level Grammar
 */

var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
  autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?[a-zA-Z0-9\-]+(?:"[^"]*"|'[^']*'|\s[^<'">\/\s]*)*?\/?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^_([^\s_](?:[^_]|__)+?[^\s_])_\b|^\*((?:\*\*|[^*])+?)\*(?!\*)/,
  code: /^(`+)\s*([\s\S]*?[^`]?)\s*\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[`*]|\b_| {2,}\n|$)/
};

inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;

inline.autolink = edit(inline.autolink)
  .replace('scheme', inline._scheme)
  .replace('email', inline._email)
  .getRegex()

inline._inside = /(?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

inline.link = edit(inline.link)
  .replace('inside', inline._inside)
  .replace('href', inline._href)
  .getRegex();

inline.reflink = edit(inline.reflink)
  .replace('inside', inline._inside)
  .getRegex();

/**
 * Normal Inline Grammar
 */

inline.normal = merge({}, inline);

/**
 * Pedantic Inline Grammar
 */

inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});

/**
 * GFM Inline Grammar
 */

inline.gfm = merge({}, inline.normal, {
  escape: edit(inline.escape).replace('])', '~|])').getRegex(),
  url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/)
    .replace('email', inline._email)
    .getRegex(),
  _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: edit(inline.text)
    .replace(']|', '~]|')
    .replace('|', '|https?://|ftp://|www\\.|[a-zA-Z0-9.!#$%&\'*+/=?^_`{\\|}~-]+@|')
    .getRegex()
});

/**
 * GFM + Line Breaks Inline Grammar
 */

inline.breaks = merge({}, inline.gfm, {
  br: edit(inline.br).replace('{2,}', '*').getRegex(),
  text: edit(inline.gfm.text).replace('{2,}', '*').getRegex()
});

/**
 * Inline Lexer & Compiler
 */

function InlineLexer(links, options) {
  this.options = options || marked.defaults;
  this.links = links;
  this.rules = inline.normal;
  this.renderer = this.options.renderer || new Renderer();
  this.renderer.options = this.options;

  if (!this.links) {
    throw new Error('Tokens array requires a `links` property.');
  }

  if (this.options.gfm) {
    if (this.options.breaks) {
      this.rules = inline.breaks;
    } else {
      this.rules = inline.gfm;
    }
  } else if (this.options.pedantic) {
    this.rules = inline.pedantic;
  }
}

/**
 * Expose Inline Rules
 */

InlineLexer.rules = inline;

/**
 * Static Lexing/Compiling Method
 */

InlineLexer.output = function(src, links, options) {
  var inline = new InlineLexer(links, options);
  return inline.output(src);
};

/**
 * Lexing/Compiling
 */

InlineLexer.prototype.output = function(src) {
  var out = '',
      link,
      text,
      href,
      cap;

  while (src) {
    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      cap[0] = this.rules._backpedal.exec(cap[0])[0];
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = escape(cap[0]);
        href = 'mailto:' + text;
      } else {
        text = escape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      out += this.renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : escape(cap[0])
        : cap[0]
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      out += this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.strong(this.output(cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.em(this.output(cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.codespan(escape(cap[2].trim(), true));
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      out += this.renderer.text(escape(this.smartypants(cap[0])));
      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return out;
};

/**
 * Compile Link
 */

InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href),
      title = link.title ? escape(link.title) : null;

  return cap[0].charAt(0) !== '!'
    ? this.renderer.link(href, title, this.output(cap[1]))
    : this.renderer.image(href, title, escape(cap[1]));
};

/**
 * Smartypants Transformations
 */

InlineLexer.prototype.smartypants = function(text) {
  if (!this.options.smartypants) return text;
  return text
    // em-dashes
    .replace(/---/g, '\u2014')
    // en-dashes
    .replace(/--/g, '\u2013')
    // opening singles
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
    // closing singles & apostrophes
    .replace(/'/g, '\u2019')
    // opening doubles
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
    // closing doubles
    .replace(/"/g, '\u201d')
    // ellipses
    .replace(/\.{3}/g, '\u2026');
};

/**
 * Mangle Links
 */

InlineLexer.prototype.mangle = function(text) {
  if (!this.options.mangle) return text;
  var out = '',
      l = text.length,
      i = 0,
      ch;

  for (; i < l; i++) {
    ch = text.charCodeAt(i);
    if (Math.random() > 0.5) {
      ch = 'x' + ch.toString(16);
    }
    out += '&#' + ch + ';';
  }

  return out;
};

/**
 * Renderer
 */

function Renderer(options) {
  this.options = options || {};
}

Renderer.prototype.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre><code>'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre><code class="'
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

Renderer.prototype.blockquote = function(quote) {
  return '<blockquote>\n' + quote + '</blockquote>\n';
};

Renderer.prototype.html = function(html) {
  return html;
};

Renderer.prototype.heading = function(text, level, raw) {
  return '<h'
    + level
    + ' id="'
    + this.options.headerPrefix
    + raw.toLowerCase().replace(/[^\w]+/g, '-')
    + '">'
    + text
    + '</h'
    + level
    + '>\n';
};

Renderer.prototype.hr = function() {
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
};

Renderer.prototype.list = function(body, ordered, start) {
  var type = ordered ? 'ol' : 'ul',
      startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
  return '<' + type + startatt + '>\n' + body + '</' + type + '>\n';
};

Renderer.prototype.listitem = function(text) {
  return '<li>' + text + '</li>\n';
};

Renderer.prototype.paragraph = function(text) {
  return '<p>' + text + '</p>\n';
};

Renderer.prototype.table = function(header, body) {
  return '<table>\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};

Renderer.prototype.tablerow = function(content) {
  return '<tr>\n' + content + '</tr>\n';
};

Renderer.prototype.tablecell = function(content, flags) {
  var type = flags.header ? 'th' : 'td';
  var tag = flags.align
    ? '<' + type + ' style="text-align:' + flags.align + '">'
    : '<' + type + '>';
  return tag + content + '</' + type + '>\n';
};

// span level renderer
Renderer.prototype.strong = function(text) {
  return '<strong>' + text + '</strong>';
};

Renderer.prototype.em = function(text) {
  return '<em>' + text + '</em>';
};

Renderer.prototype.codespan = function(text) {
  return '<code>' + text + '</code>';
};

Renderer.prototype.br = function() {
  return this.options.xhtml ? '<br/>' : '<br>';
};

Renderer.prototype.del = function(text) {
  return '<del>' + text + '</del>';
};

Renderer.prototype.link = function(href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return text;
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0 || prot.indexOf('data:') === 0) {
      return text;
    }
  }
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<a href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};

Renderer.prototype.image = function(href, title, text) {
  if (this.options.baseUrl && !originIndependentUrl.test(href)) {
    href = resolveUrl(this.options.baseUrl, href);
  }
  var out = '<img src="' + href + '" alt="' + text + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += this.options.xhtml ? '/>' : '>';
  return out;
};

Renderer.prototype.text = function(text) {
  return text;
};

/**
 * TextRenderer
 * returns only the textual part of the token
 */

function TextRenderer() {}

// no need for block level renderers

TextRenderer.prototype.strong =
TextRenderer.prototype.em =
TextRenderer.prototype.codespan =
TextRenderer.prototype.del =
TextRenderer.prototype.text = function (text) {
  return text;
}

TextRenderer.prototype.link =
TextRenderer.prototype.image = function(href, title, text) {
  return '' + text;
}

TextRenderer.prototype.br = function() {
  return '';
}

/**
 * Parsing & Compiling
 */

function Parser(options) {
  this.tokens = [];
  this.token = null;
  this.options = options || marked.defaults;
  this.options.renderer = this.options.renderer || new Renderer();
  this.renderer = this.options.renderer;
  this.renderer.options = this.options;
}

/**
 * Static Parse Method
 */

Parser.parse = function(src, options) {
  var parser = new Parser(options);
  return parser.parse(src);
};

/**
 * Parse Loop
 */

Parser.prototype.parse = function(src) {
  this.inline = new InlineLexer(src.links, this.options);
  // use an InlineLexer with a TextRenderer to extract pure text
  this.inlineText = new InlineLexer(
    src.links,
    merge({}, this.options, {renderer: new TextRenderer()})
  );
  this.tokens = src.reverse();

  var out = '';
  while (this.next()) {
    out += this.tok();
  }

  return out;
};

/**
 * Next Token
 */

Parser.prototype.next = function() {
  return this.token = this.tokens.pop();
};

/**
 * Preview Next Token
 */

Parser.prototype.peek = function() {
  return this.tokens[this.tokens.length - 1] || 0;
};

/**
 * Parse Text Tokens
 */

Parser.prototype.parseText = function() {
  var body = this.token.text;

  while (this.peek().type === 'text') {
    body += '\n' + this.next().text;
  }

  return this.inline.output(body);
};

/**
 * Parse Current Token
 */

Parser.prototype.tok = function() {
  switch (this.token.type) {
    case 'space': {
      return '';
    }
    case 'hr': {
      return this.renderer.hr();
    }
    case 'heading': {
      return this.renderer.heading(
        this.inline.output(this.token.text),
        this.token.depth,
        unescape(this.inlineText.output(this.token.text)));
    }
    case 'code': {
      return this.renderer.code(this.token.text,
        this.token.lang,
        this.token.escaped);
    }
    case 'table': {
      var header = '',
          body = '',
          i,
          row,
          cell,
          j;

      // header
      cell = '';
      for (i = 0; i < this.token.header.length; i++) {
        cell += this.renderer.tablecell(
          this.inline.output(this.token.header[i]),
          { header: true, align: this.token.align[i] }
        );
      }
      header += this.renderer.tablerow(cell);

      for (i = 0; i < this.token.cells.length; i++) {
        row = this.token.cells[i];

        cell = '';
        for (j = 0; j < row.length; j++) {
          cell += this.renderer.tablecell(
            this.inline.output(row[j]),
            { header: false, align: this.token.align[j] }
          );
        }

        body += this.renderer.tablerow(cell);
      }
      return this.renderer.table(header, body);
    }
    case 'blockquote_start': {
      body = '';

      while (this.next().type !== 'blockquote_end') {
        body += this.tok();
      }

      return this.renderer.blockquote(body);
    }
    case 'list_start': {
      body = '';
      var ordered = this.token.ordered,
          start = this.token.start;

      while (this.next().type !== 'list_end') {
        body += this.tok();
      }

      return this.renderer.list(body, ordered, start);
    }
    case 'list_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.token.type === 'text'
          ? this.parseText()
          : this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'loose_item_start': {
      body = '';

      while (this.next().type !== 'list_item_end') {
        body += this.tok();
      }

      return this.renderer.listitem(body);
    }
    case 'html': {
      var html = !this.token.pre && !this.options.pedantic
        ? this.inline.output(this.token.text)
        : this.token.text;
      return this.renderer.html(html);
    }
    case 'paragraph': {
      return this.renderer.paragraph(this.inline.output(this.token.text));
    }
    case 'text': {
      return this.renderer.paragraph(this.parseText());
    }
  }
};

/**
 * Helpers
 */

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function unescape(html) {
  // explicitly match decimal, hex, and named HTML entities
  return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
    n = n.toLowerCase();
    if (n === 'colon') return ':';
    if (n.charAt(0) === '#') {
      return n.charAt(1) === 'x'
        ? String.fromCharCode(parseInt(n.substring(2), 16))
        : String.fromCharCode(+n.substring(1));
    }
    return '';
  });
}

function edit(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return {
    replace: function(name, val) {
      val = val.source || val;
      val = val.replace(/(^|[^\[])\^/g, '$1');
      regex = regex.replace(name, val);
      return this;
    },
    getRegex: function() {
      return new RegExp(regex, opt);
    }
  };
}

function resolveUrl(base, href) {
  if (!baseUrls[' ' + base]) {
    // we can ignore everything in base after the last slash of its path component,
    // but we might need to add _that_
    // https://tools.ietf.org/html/rfc3986#section-3
    if (/^[^:]+:\/*[^/]*$/.test(base)) {
      baseUrls[' ' + base] = base + '/';
    } else {
      baseUrls[' ' + base] = base.replace(/[^/]*$/, '');
    }
  }
  base = baseUrls[' ' + base];

  if (href.slice(0, 2) === '//') {
    return base.replace(/:[\s\S]*/, ':') + href;
  } else if (href.charAt(0) === '/') {
    return base.replace(/(:\/*[^/]*)[\s\S]*/, '$1') + href;
  } else {
    return base + href;
  }
}
var baseUrls = {};
var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;

function noop() {}
noop.exec = noop;

function merge(obj) {
  var i = 1,
      target,
      key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

/**
 * Marked
 */

function marked(src, opt, callback) {
  // throw error in case of non string input
  if (typeof src === 'undefined' || src === null) {
    throw new Error('marked(): input parameter is undefined or null');
  }
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }

  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }

    opt = merge({}, marked.defaults, opt || {});

    var highlight = opt.highlight,
        tokens,
        pending,
        i = 0;

    try {
      tokens = Lexer.lex(src, opt)
    } catch (e) {
      return callback(e);
    }

    pending = tokens.length;

    var done = function(err) {
      if (err) {
        opt.highlight = highlight;
        return callback(err);
      }

      var out;

      try {
        out = Parser.parse(tokens, opt);
      } catch (e) {
        err = e;
      }

      opt.highlight = highlight;

      return err
        ? callback(err)
        : callback(null, out);
    };

    if (!highlight || highlight.length < 3) {
      return done();
    }

    delete opt.highlight;

    if (!pending) return done();

    for (; i < tokens.length; i++) {
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (err) return done(err);
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }

    return;
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
    return Parser.parse(Lexer.lex(src, opt), opt);
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/markedjs/marked.';
    if ((opt || marked.defaults).silent) {
      return '<p>An error occurred:</p><pre>'
        + escape(e.message + '', true)
        + '</pre>';
    }
    throw e;
  }
}

/**
 * Options
 */

marked.options =
marked.setOptions = function(opt) {
  merge(marked.defaults, opt);
  return marked;
};

marked.defaults = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  mangle: true,
  smartLists: false,
  silent: false,
  highlight: null,
  langPrefix: 'lang-',
  smartypants: false,
  headerPrefix: '',
  renderer: new Renderer(),
  xhtml: false,
  baseUrl: null
};

/**
 * Expose
 */

marked.Parser = Parser;
marked.parser = Parser.parse;

marked.Renderer = Renderer;
marked.TextRenderer = TextRenderer;

marked.Lexer = Lexer;
marked.lexer = Lexer.lex;

marked.InlineLexer = InlineLexer;
marked.inlineLexer = InlineLexer.output;

marked.parse = marked;

if (typeof module !== 'undefined' && typeof exports === 'object') {
  module.exports = marked;
} else if (typeof define === 'function' && define.amd) {
  define(function() { return marked; });
} else {
  root.marked = marked;
}
})(this || (typeof window !== 'undefined' ? window : global));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],128:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],129:[function(require,module,exports){
module.exports = require('./lib');

},{"./lib":130}],130:[function(require,module,exports){
// Load modules

var Stringify = require('./stringify');
var Parse = require('./parse');


// Declare internals

var internals = {};


module.exports = {
    stringify: Stringify,
    parse: Parse
};

},{"./parse":131,"./stringify":132}],131:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&',
    depth: 5,
    arrayLimit: 20,
    parameterLimit: 1000
};


internals.parseValues = function (str, options) {

    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0, il = parts.length; i < il; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        if (pos === -1) {
            obj[Utils.decode(part)] = '';
        }
        else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));

            if (!obj[key]) {
                obj[key] = val;
            }
            else {
                obj[key] = [].concat(obj[key]).concat(val);
            }
        }
    }

    return obj;
};


internals.parseObject = function (chain, val, options) {

    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj = {};
    if (root === '[]') {
        obj = [];
        obj = obj.concat(internals.parseObject(chain, val, options));
    }
    else {
        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
        var index = parseInt(cleanRoot, 10);
        if (!isNaN(index) &&
            root !== cleanRoot &&
            index <= options.arrayLimit) {

            obj = [];
            obj[index] = internals.parseObject(chain, val, options);
        }
        else {
            obj[cleanRoot] = internals.parseObject(chain, val, options);
        }
    }

    return obj;
};


internals.parseKeys = function (key, val, options) {

    if (!key) {
        return;
    }

    // The regex chunks

    var parent = /^([^\[\]]*)/;
    var child = /(\[[^\[\]]*\])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Don't allow them to overwrite object prototype properties

    if (Object.prototype.hasOwnProperty(segment[1])) {
        return;
    }

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {

        ++i;
        if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
            keys.push(segment[1]);
        }
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return internals.parseObject(keys, val, options);
};


module.exports = function (str, options) {

    if (str === '' ||
        str === null ||
        typeof str === 'undefined') {

        return {};
    }

    options = options || {};
    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : internals.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : internals.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : internals.arrayLimit;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : internals.parameterLimit;

    var tempObj = typeof str === 'string' ? internals.parseValues(str, options) : str;
    var obj = {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        var newObj = internals.parseKeys(key, tempObj[key], options);
        obj = Utils.merge(obj, newObj);
    }

    return Utils.compact(obj);
};

},{"./utils":133}],132:[function(require,module,exports){
// Load modules

var Utils = require('./utils');


// Declare internals

var internals = {
    delimiter: '&'
};


internals.stringify = function (obj, prefix) {

    if (Utils.isBuffer(obj)) {
        obj = obj.toString();
    }
    else if (obj instanceof Date) {
        obj = obj.toISOString();
    }
    else if (obj === null) {
        obj = '';
    }

    if (typeof obj === 'string' ||
        typeof obj === 'number' ||
        typeof obj === 'boolean') {

        return [encodeURIComponent(prefix) + '=' + encodeURIComponent(obj)];
    }

    var values = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            values = values.concat(internals.stringify(obj[key], prefix + '[' + key + ']'));
        }
    }

    return values;
};


module.exports = function (obj, options) {

    options = options || {};
    var delimiter = typeof options.delimiter === 'undefined' ? internals.delimiter : options.delimiter;

    var keys = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keys = keys.concat(internals.stringify(obj[key], key));
        }
    }

    return keys.join(delimiter);
};

},{"./utils":133}],133:[function(require,module,exports){
(function (Buffer){
// Load modules


// Declare internals

var internals = {};


exports.arrayToObject = function (source) {

    var obj = {};
    for (var i = 0, il = source.length; i < il; ++i) {
        if (typeof source[i] !== 'undefined') {

            obj[i] = source[i];
        }
    }

    return obj;
};


exports.merge = function (target, source) {

    if (!source) {
        return target;
    }

    if (Array.isArray(source)) {
        for (var i = 0, il = source.length; i < il; ++i) {
            if (typeof source[i] !== 'undefined') {
                if (typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], source[i]);
                }
                else {
                    target[i] = source[i];
                }
            }
        }

        return target;
    }

    if (Array.isArray(target)) {
        if (typeof source !== 'object') {
            target.push(source);
            return target;
        }
        else {
            target = exports.arrayToObject(target);
        }
    }

    var keys = Object.keys(source);
    for (var k = 0, kl = keys.length; k < kl; ++k) {
        var key = keys[k];
        var value = source[key];

        if (value &&
            typeof value === 'object') {

            if (!target[key]) {
                target[key] = value;
            }
            else {
                target[key] = exports.merge(target[key], value);
            }
        }
        else {
            target[key] = value;
        }
    }

    return target;
};


exports.decode = function (str) {

    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};


exports.compact = function (obj, refs) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    refs = refs || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0, l = obj.length; i < l; ++i) {
            if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    for (var i = 0, il = keys.length; i < il; ++i) {
        var key = keys[i];
        obj[key] = exports.compact(obj[key], refs);
    }

    return obj;
};


exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};


exports.isBuffer = function (obj) {

    if (typeof Buffer !== 'undefined') {
        return Buffer.isBuffer(obj);
    }
    else {
        return false;
    }
};

}).call(this,require("buffer").Buffer)

},{"buffer":33}],134:[function(require,module,exports){
/**
 * Actions that modify the URL.
 */
var LocationActions = {

  /**
   * Indicates a new location is being pushed to the history stack.
   */
  PUSH: 'push',

  /**
   * Indicates the current location should be replaced.
   */
  REPLACE: 'replace',

  /**
   * Indicates the most recent entry should be removed from the history stack.
   */
  POP: 'pop'

};

module.exports = LocationActions;

},{}],135:[function(require,module,exports){
var LocationActions = require('../actions/LocationActions');

/**
 * A scroll behavior that attempts to imitate the default behavior
 * of modern browsers.
 */
var ImitateBrowserBehavior = {

  updateScrollPosition: function (position, actionType) {
    switch (actionType) {
      case LocationActions.PUSH:
      case LocationActions.REPLACE:
        window.scrollTo(0, 0);
        break;
      case LocationActions.POP:
        if (position) {
          window.scrollTo(position.x, position.y);
        } else {
          window.scrollTo(0, 0);
        }
        break;
    }
  }

};

module.exports = ImitateBrowserBehavior;

},{"../actions/LocationActions":134}],136:[function(require,module,exports){
/**
 * A scroll behavior that always scrolls to the top of the page
 * after a transition.
 */
var ScrollToTopBehavior = {

  updateScrollPosition: function () {
    window.scrollTo(0, 0);
  }

};

module.exports = ScrollToTopBehavior;

},{}],137:[function(require,module,exports){
var React = require('react');
var FakeNode = require('../mixins/FakeNode');
var PropTypes = require('../utils/PropTypes');

/**
 * A <DefaultRoute> component is a special kind of <Route> that
 * renders when its parent matches but none of its siblings do.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */
var DefaultRoute = React.createClass({

  displayName: 'DefaultRoute',

  mixins: [ FakeNode ],

  propTypes: {
    name: React.PropTypes.string,
    path: PropTypes.falsy,
    handler: React.PropTypes.func.isRequired
  }

});

module.exports = DefaultRoute;

},{"../mixins/FakeNode":147,"../utils/PropTypes":158,"react":"react"}],138:[function(require,module,exports){
var React = require('react');
var classSet = require('react/lib/cx');
var assign = require('react/lib/Object.assign');
var Navigation = require('../mixins/Navigation');
var State = require('../mixins/State');

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

/**
 * <Link> components are used to create an <a> element that links to a route.
 * When that route is active, the link gets an "active" class name (or the
 * value of its `activeClassName` prop).
 *
 * For example, assuming you have the following route:
 *
 *   <Route name="showPost" path="/posts/:postID" handler={Post}/>
 *
 * You could use the following component to link to that route:
 *
 *   <Link to="showPost" params={{ postID: "123" }} />
 *
 * In addition to params, links may pass along query string parameters
 * using the `query` prop.
 *
 *   <Link to="showPost" params={{ postID: "123" }} query={{ show:true }}/>
 */
var Link = React.createClass({

  displayName: 'Link',

  mixins: [ Navigation, State ],

  propTypes: {
    activeClassName: React.PropTypes.string.isRequired,
    to: React.PropTypes.string.isRequired,
    params: React.PropTypes.object,
    query: React.PropTypes.object,
    onClick: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      activeClassName: 'active'
    };
  },

  handleClick: function (event) {
    var allowTransition = true;
    var clickResult;

    if (this.props.onClick)
      clickResult = this.props.onClick(event);

    if (isModifiedEvent(event) || !isLeftClickEvent(event))
      return;

    if (clickResult === false || event.defaultPrevented === true)
      allowTransition = false;

    event.preventDefault();

    if (allowTransition)
      this.transitionTo(this.props.to, this.props.params, this.props.query);
  },

  /**
   * Returns the value of the "href" attribute to use on the DOM element.
   */
  getHref: function () {
    return this.makeHref(this.props.to, this.props.params, this.props.query);
  },

  /**
   * Returns the value of the "class" attribute to use on the DOM element, which contains
   * the value of the activeClassName property when this <Link> is active.
   */
  getClassName: function () {
    var classNames = {};

    if (this.props.className)
      classNames[this.props.className] = true;

    if (this.isActive(this.props.to, this.props.params, this.props.query))
      classNames[this.props.activeClassName] = true;

    return classSet(classNames);
  },

  render: function () {
    var props = assign({}, this.props, {
      href: this.getHref(),
      className: this.getClassName(),
      onClick: this.handleClick
    });

    return React.DOM.a(props, this.props.children);
  }

});

module.exports = Link;

},{"../mixins/Navigation":148,"../mixins/State":152,"react":"react","react/lib/Object.assign":169,"react/lib/cx":171}],139:[function(require,module,exports){
var React = require('react');
var FakeNode = require('../mixins/FakeNode');
var PropTypes = require('../utils/PropTypes');

/**
 * A <NotFoundRoute> is a special kind of <Route> that
 * renders when the beginning of its parent's path matches
 * but none of its siblings do, including any <DefaultRoute>.
 * Only one such route may be used at any given level in the
 * route hierarchy.
 */
var NotFoundRoute = React.createClass({

  displayName: 'NotFoundRoute',

  mixins: [ FakeNode ],

  propTypes: {
    name: React.PropTypes.string,
    path: PropTypes.falsy,
    handler: React.PropTypes.func.isRequired
  }

});

module.exports = NotFoundRoute;

},{"../mixins/FakeNode":147,"../utils/PropTypes":158,"react":"react"}],140:[function(require,module,exports){
var React = require('react');
var FakeNode = require('../mixins/FakeNode');
var PropTypes = require('../utils/PropTypes');

/**
 * A <Redirect> component is a special kind of <Route> that always
 * redirects to another route when it matches.
 */
var Redirect = React.createClass({

  displayName: 'Redirect',

  mixins: [ FakeNode ],

  propTypes: {
    path: React.PropTypes.string,
    from: React.PropTypes.string, // Alias for path.
    to: React.PropTypes.string,
    handler: PropTypes.falsy
  }

});

module.exports = Redirect;

},{"../mixins/FakeNode":147,"../utils/PropTypes":158,"react":"react"}],141:[function(require,module,exports){
var React = require('react');
var FakeNode = require('../mixins/FakeNode');

/**
 * <Route> components specify components that are rendered to the page when the
 * URL matches a given pattern.
 *
 * Routes are arranged in a nested tree structure. When a new URL is requested,
 * the tree is searched depth-first to find a route whose path matches the URL.
 * When one is found, all routes in the tree that lead to it are considered
 * "active" and their components are rendered into the DOM, nested in the same
 * order as they are in the tree.
 *
 * The preferred way to configure a router is using JSX. The XML-like syntax is
 * a great way to visualize how routes are laid out in an application.
 *
 *   var routes = [
 *     <Route handler={App}>
 *       <Route name="login" handler={Login}/>
 *       <Route name="logout" handler={Logout}/>
 *       <Route name="about" handler={About}/>
 *     </Route>
 *   ];
 *   
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 *
 * Handlers for Route components that contain children can render their active
 * child route using a <RouteHandler> element.
 *
 *   var App = React.createClass({
 *     render: function () {
 *       return (
 *         <div class="application">
 *           <RouteHandler/>
 *         </div>
 *       );
 *     }
 *   });
 */
var Route = React.createClass({

  displayName: 'Route',

  mixins: [ FakeNode ],

  propTypes: {
    name: React.PropTypes.string,
    path: React.PropTypes.string,
    handler: React.PropTypes.func.isRequired,
    ignoreScrollBehavior: React.PropTypes.bool
  }

});

module.exports = Route;

},{"../mixins/FakeNode":147,"react":"react"}],142:[function(require,module,exports){
var React = require('react');
var RouteHandlerMixin = require('../mixins/RouteHandler');

/**
 * A <RouteHandler> component renders the active child route handler
 * when routes are nested.
 */
var RouteHandler = React.createClass({

  displayName: 'RouteHandler',

  mixins: [RouteHandlerMixin],

  getDefaultProps: function () {
    return {
      ref: '__routeHandler__'
    };
  },

  render: function () {
    return this.getRouteHandler();
  }

});

module.exports = RouteHandler;

},{"../mixins/RouteHandler":150,"react":"react"}],143:[function(require,module,exports){
exports.DefaultRoute = require('./components/DefaultRoute');
exports.Link = require('./components/Link');
exports.NotFoundRoute = require('./components/NotFoundRoute');
exports.Redirect = require('./components/Redirect');
exports.Route = require('./components/Route');
exports.RouteHandler = require('./components/RouteHandler');

exports.HashLocation = require('./locations/HashLocation');
exports.HistoryLocation = require('./locations/HistoryLocation');
exports.RefreshLocation = require('./locations/RefreshLocation');

exports.ImitateBrowserBehavior = require('./behaviors/ImitateBrowserBehavior');
exports.ScrollToTopBehavior = require('./behaviors/ScrollToTopBehavior');

exports.Navigation = require('./mixins/Navigation');
exports.State = require('./mixins/State');

exports.create = require('./utils/createRouter');
exports.run = require('./utils/runRouter');

exports.History = require('./utils/History');

},{"./behaviors/ImitateBrowserBehavior":135,"./behaviors/ScrollToTopBehavior":136,"./components/DefaultRoute":137,"./components/Link":138,"./components/NotFoundRoute":139,"./components/Redirect":140,"./components/Route":141,"./components/RouteHandler":142,"./locations/HashLocation":144,"./locations/HistoryLocation":145,"./locations/RefreshLocation":146,"./mixins/Navigation":148,"./mixins/State":152,"./utils/History":155,"./utils/createRouter":161,"./utils/runRouter":165}],144:[function(require,module,exports){
var LocationActions = require('../actions/LocationActions');
var History = require('../utils/History');
var Path = require('../utils/Path');

/**
 * Returns the current URL path from the `hash` portion of the URL, including
 * query string.
 */
function getHashPath() {
  return Path.decode(
    // We can't use window.location.hash here because it's not
    // consistent across browsers - Firefox will pre-decode it!
    window.location.href.split('#')[1] || ''
  );
}

var _actionType;

function ensureSlash() {
  var path = getHashPath();

  if (path.charAt(0) === '/')
    return true;

  HashLocation.replace('/' + path);

  return false;
}

var _changeListeners = [];

function notifyChange(type) {
  if (type === LocationActions.PUSH)
    History.length += 1;

  var change = {
    path: getHashPath(),
    type: type
  };

  _changeListeners.forEach(function (listener) {
    listener(change);
  });
}

var _isListening = false;

function onHashChange() {
  if (ensureSlash()) {
    // If we don't have an _actionType then all we know is the hash
    // changed. It was probably caused by the user clicking the Back
    // button, but may have also been the Forward button or manual
    // manipulation. So just guess 'pop'.
    notifyChange(_actionType || LocationActions.POP);
    _actionType = null;
  }
}

/**
 * A Location that uses `window.location.hash`.
 */
var HashLocation = {

  addChangeListener: function (listener) {
    _changeListeners.push(listener);

    // Do this BEFORE listening for hashchange.
    ensureSlash();

    if (_isListening)
      return;

    if (window.addEventListener) {
      window.addEventListener('hashchange', onHashChange, false);
    } else {
      window.attachEvent('onhashchange', onHashChange);
    }

    _isListening = true;
  },

  removeChangeListener: function(listener) {
    for (var i = 0, l = _changeListeners.length; i < l; i ++) {
      if (_changeListeners[i] === listener) {
        _changeListeners.splice(i, 1);
        break;
      }
    }

    if (window.removeEventListener) {
      window.removeEventListener('hashchange', onHashChange, false);
    } else {
      window.removeEvent('onhashchange', onHashChange);
    }

    if (_changeListeners.length === 0)
      _isListening = false;
  },



  push: function (path) {
    _actionType = LocationActions.PUSH;
    window.location.hash = Path.encode(path);
  },

  replace: function (path) {
    _actionType = LocationActions.REPLACE;
    window.location.replace(window.location.pathname + '#' + Path.encode(path));
  },

  pop: function () {
    _actionType = LocationActions.POP;
    History.back();
  },

  getCurrentPath: getHashPath,

  toString: function () {
    return '<HashLocation>';
  }

};

module.exports = HashLocation;

},{"../actions/LocationActions":134,"../utils/History":155,"../utils/Path":156}],145:[function(require,module,exports){
var LocationActions = require('../actions/LocationActions');
var History = require('../utils/History');
var Path = require('../utils/Path');

/**
 * Returns the current URL path from `window.location`, including query string.
 */
function getWindowPath() {
  return Path.decode(
    window.location.pathname + window.location.search
  );
}

var _changeListeners = [];

function notifyChange(type) {
  var change = {
    path: getWindowPath(),
    type: type
  };

  _changeListeners.forEach(function (listener) {
    listener(change);
  });
}

var _isListening = false;

function onPopState() {
  notifyChange(LocationActions.POP);
}

/**
 * A Location that uses HTML5 history.
 */
var HistoryLocation = {

  addChangeListener: function (listener) {
    _changeListeners.push(listener);

    if (_isListening)
      return;

    if (window.addEventListener) {
      window.addEventListener('popstate', onPopState, false);
    } else {
      window.attachEvent('popstate', onPopState);
    }

    _isListening = true;
  },

  removeChangeListener: function(listener) {
    for (var i = 0, l = _changeListeners.length; i < l; i ++) {
      if (_changeListeners[i] === listener) {
        _changeListeners.splice(i, 1);
        break;
      }
    }

    if (window.addEventListener) {
      window.removeEventListener('popstate', onPopState);
    } else {
      window.removeEvent('popstate', onPopState);
    }

    if (_changeListeners.length === 0)
      _isListening = false;
  },



  push: function (path) {
    window.history.pushState({ path: path }, '', Path.encode(path));
    History.length += 1;
    notifyChange(LocationActions.PUSH);
  },

  replace: function (path) {
    window.history.replaceState({ path: path }, '', Path.encode(path));
    notifyChange(LocationActions.REPLACE);
  },

  pop: History.back,

  getCurrentPath: getWindowPath,

  toString: function () {
    return '<HistoryLocation>';
  }

};

module.exports = HistoryLocation;

},{"../actions/LocationActions":134,"../utils/History":155,"../utils/Path":156}],146:[function(require,module,exports){
var HistoryLocation = require('./HistoryLocation');
var History = require('../utils/History');
var Path = require('../utils/Path');

/**
 * A Location that uses full page refreshes. This is used as
 * the fallback for HistoryLocation in browsers that do not
 * support the HTML5 history API.
 */
var RefreshLocation = {

  push: function (path) {
    window.location = Path.encode(path);
  },

  replace: function (path) {
    window.location.replace(Path.encode(path));
  },

  pop: History.back,

  getCurrentPath: HistoryLocation.getCurrentPath,

  toString: function () {
    return '<RefreshLocation>';
  }

};

module.exports = RefreshLocation;

},{"../utils/History":155,"../utils/Path":156,"./HistoryLocation":145}],147:[function(require,module,exports){
var invariant = require('react/lib/invariant');

var FakeNode = {

  render: function () {
    invariant(
      false,
      '%s elements should not be rendered',
      this.constructor.displayName
    );
  }

};

module.exports = FakeNode;

},{"react/lib/invariant":173}],148:[function(require,module,exports){
var React = require('react');

/**
 * A mixin for components that modify the URL.
 *
 * Example:
 *
 *   var MyLink = React.createClass({
 *     mixins: [ Router.Navigation ],
 *     handleClick: function (event) {
 *       event.preventDefault();
 *       this.transitionTo('aRoute', { the: 'params' }, { the: 'query' });
 *     },
 *     render: function () {
 *       return (
 *         <a onClick={this.handleClick}>Click me!</a>
 *       );
 *     }
 *   });
 */
var Navigation = {

  contextTypes: {
    makePath: React.PropTypes.func.isRequired,
    makeHref: React.PropTypes.func.isRequired,
    transitionTo: React.PropTypes.func.isRequired,
    replaceWith: React.PropTypes.func.isRequired,
    goBack: React.PropTypes.func.isRequired
  },

  /**
   * Returns an absolute URL path created from the given route
   * name, URL parameters, and query values.
   */
  makePath: function (to, params, query) {
    return this.context.makePath(to, params, query);
  },

  /**
   * Returns a string that may safely be used as the href of a
   * link to the route with the given name.
   */
  makeHref: function (to, params, query) {
    return this.context.makeHref(to, params, query);
  },

  /**
   * Transitions to the URL specified in the arguments by pushing
   * a new URL onto the history stack.
   */
  transitionTo: function (to, params, query) {
    this.context.transitionTo(to, params, query);
  },

  /**
   * Transitions to the URL specified in the arguments by replacing
   * the current URL in the history stack.
   */
  replaceWith: function (to, params, query) {
    this.context.replaceWith(to, params, query);
  },

  /**
   * Transitions to the previous URL.
   */
  goBack: function () {
    this.context.goBack();
  }

};

module.exports = Navigation;

},{"react":"react"}],149:[function(require,module,exports){
var React = require('react');

/**
 * Provides the router with context for Router.Navigation.
 */
var NavigationContext = {

  childContextTypes: {
    makePath: React.PropTypes.func.isRequired,
    makeHref: React.PropTypes.func.isRequired,
    transitionTo: React.PropTypes.func.isRequired,
    replaceWith: React.PropTypes.func.isRequired,
    goBack: React.PropTypes.func.isRequired
  },

  getChildContext: function () {
    return {
      makePath: this.constructor.makePath,
      makeHref: this.constructor.makeHref,
      transitionTo: this.constructor.transitionTo,
      replaceWith: this.constructor.replaceWith,
      goBack: this.constructor.goBack
    };
  }

};

module.exports = NavigationContext;

},{"react":"react"}],150:[function(require,module,exports){
var React = require('react');

module.exports = {
  contextTypes: {
    getRouteAtDepth: React.PropTypes.func.isRequired,
    getRouteComponents: React.PropTypes.func.isRequired,
    routeHandlers: React.PropTypes.array.isRequired
  },

  childContextTypes: {
    routeHandlers: React.PropTypes.array.isRequired
  },

  getChildContext: function () {
    return {
      routeHandlers: this.context.routeHandlers.concat([ this ])
    };
  },

  getRouteDepth: function () {
    return this.context.routeHandlers.length - 1;
  },

  componentDidMount: function () {
    this._updateRouteComponent();
  },

  componentDidUpdate: function () {
    this._updateRouteComponent();
  },

  _updateRouteComponent: function () {
    var depth = this.getRouteDepth();
    var components = this.context.getRouteComponents();
    components[depth] = this.refs[this.props.ref || '__routeHandler__'];
  },

  getRouteHandler: function (props) {
    var route = this.context.getRouteAtDepth(this.getRouteDepth());
    return route ? React.createElement(route.handler, props || this.props) : null;
  }
};
},{"react":"react"}],151:[function(require,module,exports){
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var getWindowScrollPosition = require('../utils/getWindowScrollPosition');

function shouldUpdateScroll(state, prevState) {
  if (!prevState)
    return true;

  // Don't update scroll position when only the query has changed.
  if (state.pathname === prevState.pathname)
    return false;

  var routes = state.routes;
  var prevRoutes = prevState.routes;

  var sharedAncestorRoutes = routes.filter(function (route) {
    return prevRoutes.indexOf(route) !== -1;
  });

  return !sharedAncestorRoutes.some(function (route) {
    return route.ignoreScrollBehavior;
  });
}

/**
 * Provides the router with the ability to manage window scroll position
 * according to its scroll behavior.
 */
var Scrolling = {

  statics: {
    /**
     * Records curent scroll position as the last known position for the given URL path.
     */
    recordScrollPosition: function (path) {
      if (!this.scrollHistory)
        this.scrollHistory = {};

      this.scrollHistory[path] = getWindowScrollPosition();
    },

    /**
     * Returns the last known scroll position for the given URL path.
     */
    getScrollPosition: function (path) {
      if (!this.scrollHistory)
        this.scrollHistory = {};

      return this.scrollHistory[path] || null;
    }
  },

  componentWillMount: function () {
    invariant(
      this.getScrollBehavior() == null || canUseDOM,
      'Cannot use scroll behavior without a DOM'
    );
  },

  componentDidMount: function () {
    this._updateScroll();
  },

  componentDidUpdate: function (prevProps, prevState) {
    this._updateScroll(prevState);
  },

  _updateScroll: function (prevState) {
    if (!shouldUpdateScroll(this.state, prevState))
      return;

    var scrollBehavior = this.getScrollBehavior();

    if (scrollBehavior)
      scrollBehavior.updateScrollPosition(
        this.constructor.getScrollPosition(this.state.path),
        this.state.action
      );
  }

};

module.exports = Scrolling;

},{"../utils/getWindowScrollPosition":163,"react/lib/ExecutionEnvironment":168,"react/lib/invariant":173}],152:[function(require,module,exports){
var React = require('react');

/**
 * A mixin for components that need to know the path, routes, URL
 * params and query that are currently active.
 *
 * Example:
 *
 *   var AboutLink = React.createClass({
 *     mixins: [ Router.State ],
 *     render: function () {
 *       var className = this.props.className;
 *   
 *       if (this.isActive('about'))
 *         className += ' is-active';
 *   
 *       return React.DOM.a({ className: className }, this.props.children);
 *     }
 *   });
 */
var State = {

  contextTypes: {
    getCurrentPath: React.PropTypes.func.isRequired,
    getCurrentRoutes: React.PropTypes.func.isRequired,
    getCurrentPathname: React.PropTypes.func.isRequired,
    getCurrentParams: React.PropTypes.func.isRequired,
    getCurrentQuery: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.func.isRequired
  },

  /**
   * Returns the current URL path.
   */
  getPath: function () {
    return this.context.getCurrentPath();
  },

  /**
   * Returns an array of the routes that are currently active.
   */
  getRoutes: function () {
    return this.context.getCurrentRoutes();
  },

  /**
   * Returns the current URL path without the query string.
   */
  getPathname: function () {
    return this.context.getCurrentPathname();
  },

  /**
   * Returns an object of the URL params that are currently active.
   */
  getParams: function () {
    return this.context.getCurrentParams();
  },

  /**
   * Returns an object of the query params that are currently active.
   */
  getQuery: function () {
    return this.context.getCurrentQuery();
  },

  /**
   * A helper method to determine if a given route, params, and query
   * are active.
   */
  isActive: function (to, params, query) {
    return this.context.isActive(to, params, query);
  }

};

module.exports = State;

},{"react":"react"}],153:[function(require,module,exports){
var React = require('react');
var assign = require('react/lib/Object.assign');
var Path = require('../utils/Path');

function routeIsActive(activeRoutes, routeName) {
  return activeRoutes.some(function (route) {
    return route.name === routeName;
  });
}

function paramsAreActive(activeParams, params) {
  for (var property in params)
    if (String(activeParams[property]) !== String(params[property]))
      return false;

  return true;
}

function queryIsActive(activeQuery, query) {
  for (var property in query)
    if (String(activeQuery[property]) !== String(query[property]))
      return false;

  return true;
}

/**
 * Provides the router with context for Router.State.
 */
var StateContext = {

  /**
   * Returns the current URL path + query string.
   */
  getCurrentPath: function () {
    return this.state.path;
  },

  /**
   * Returns a read-only array of the currently active routes.
   */
  getCurrentRoutes: function () {
    return this.state.routes.slice(0);
  },

  /**
   * Returns the current URL path without the query string.
   */
  getCurrentPathname: function () {
    return this.state.pathname;
  },

  /**
   * Returns a read-only object of the currently active URL parameters.
   */
  getCurrentParams: function () {
    return assign({}, this.state.params);
  },

  /**
   * Returns a read-only object of the currently active query parameters.
   */
  getCurrentQuery: function () {
    return assign({}, this.state.query);
  },

  /**
   * Returns true if the given route, params, and query are active.
   */
  isActive: function (to, params, query) {
    if (Path.isAbsolute(to))
      return to === this.state.path;

    return routeIsActive(this.state.routes, to) &&
      paramsAreActive(this.state.params, params) &&
      (query == null || queryIsActive(this.state.query, query));
  },

  childContextTypes: {
    getCurrentPath: React.PropTypes.func.isRequired,
    getCurrentRoutes: React.PropTypes.func.isRequired,
    getCurrentPathname: React.PropTypes.func.isRequired,
    getCurrentParams: React.PropTypes.func.isRequired,
    getCurrentQuery: React.PropTypes.func.isRequired,
    isActive: React.PropTypes.func.isRequired
  },

  getChildContext: function () {
    return {
      getCurrentPath: this.getCurrentPath,
      getCurrentRoutes: this.getCurrentRoutes,
      getCurrentPathname: this.getCurrentPathname,
      getCurrentParams: this.getCurrentParams,
      getCurrentQuery: this.getCurrentQuery,
      isActive: this.isActive
    };
  }

};

module.exports = StateContext;

},{"../utils/Path":156,"react":"react","react/lib/Object.assign":169}],154:[function(require,module,exports){
/**
 * Represents a cancellation caused by navigating away
 * before the previous transition has fully resolved.
 */
function Cancellation() { }

module.exports = Cancellation;

},{}],155:[function(require,module,exports){
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;

var History = {

  /**
   * Sends the browser back one entry in the history.
   */
  back: function () {
    invariant(
      canUseDOM,
      'Cannot use History.back without a DOM'
    );

    // Do this first so that History.length will
    // be accurate in location change listeners.
    History.length -= 1;

    window.history.back();
  },

  /**
   * The current number of entries in the history.
   */
  length: 1

};

module.exports = History;

},{"react/lib/ExecutionEnvironment":168,"react/lib/invariant":173}],156:[function(require,module,exports){
var invariant = require('react/lib/invariant');
var merge = require('qs/lib/utils').merge;
var qs = require('qs');

var paramCompileMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|[*.()\[\]\\+|{}^$]/g;
var paramInjectMatcher = /:([a-zA-Z_$][a-zA-Z0-9_$?]*[?]?)|[*]/g;
var paramInjectTrailingSlashMatcher = /\/\/\?|\/\?/g;
var queryMatcher = /\?(.+)/;

var _compiledPatterns = {};

function compilePattern(pattern) {
  if (!(pattern in _compiledPatterns)) {
    var paramNames = [];
    var source = pattern.replace(paramCompileMatcher, function (match, paramName) {
      if (paramName) {
        paramNames.push(paramName);
        return '([^/?#]+)';
      } else if (match === '*') {
        paramNames.push('splat');
        return '(.*?)';
      } else {
        return '\\' + match;
      }
    });

    _compiledPatterns[pattern] = {
      matcher: new RegExp('^' + source + '$', 'i'),
      paramNames: paramNames
    };
  }

  return _compiledPatterns[pattern];
}

var Path = {

  /**
   * Safely decodes special characters in the given URL path.
   */
  decode: function (path) {
    return decodeURI(path.replace(/\+/g, ' '));
  },

  /**
   * Safely encodes special characters in the given URL path.
   */
  encode: function (path) {
    return encodeURI(path).replace(/%20/g, '+');
  },

  /**
   * Returns an array of the names of all parameters in the given pattern.
   */
  extractParamNames: function (pattern) {
    return compilePattern(pattern).paramNames;
  },

  /**
   * Extracts the portions of the given URL path that match the given pattern
   * and returns an object of param name => value pairs. Returns null if the
   * pattern does not match the given path.
   */
  extractParams: function (pattern, path) {
    var object = compilePattern(pattern);
    var match = path.match(object.matcher);

    if (!match)
      return null;

    var params = {};

    object.paramNames.forEach(function (paramName, index) {
      params[paramName] = match[index + 1];
    });

    return params;
  },

  /**
   * Returns a version of the given route path with params interpolated. Throws
   * if there is a dynamic segment of the route path for which there is no param.
   */
  injectParams: function (pattern, params) {
    params = params || {};

    var splatIndex = 0;

    return pattern.replace(paramInjectMatcher, function (match, paramName) {
      paramName = paramName || 'splat';

      // If param is optional don't check for existence
      if (paramName.slice(-1) !== '?') {
        invariant(
          params[paramName] != null,
          'Missing "' + paramName + '" parameter for path "' + pattern + '"'
        );
      } else {
        paramName = paramName.slice(0, -1);

        if (params[paramName] == null)
          return '';
      }

      var segment;
      if (paramName === 'splat' && Array.isArray(params[paramName])) {
        segment = params[paramName][splatIndex++];

        invariant(
          segment != null,
          'Missing splat # ' + splatIndex + ' for path "' + pattern + '"'
        );
      } else {
        segment = params[paramName];
      }

      return segment;
    }).replace(paramInjectTrailingSlashMatcher, '/');
  },

  /**
   * Returns an object that is the result of parsing any query string contained
   * in the given path, null if the path contains no query string.
   */
  extractQuery: function (path) {
    var match = path.match(queryMatcher);
    return match && qs.parse(match[1]);
  },

  /**
   * Returns a version of the given path without the query string.
   */
  withoutQuery: function (path) {
    return path.replace(queryMatcher, '');
  },

  /**
   * Returns a version of the given path with the parameters in the given
   * query merged into the query string.
   */
  withQuery: function (path, query) {
    var existingQuery = Path.extractQuery(path);

    if (existingQuery)
      query = query ? merge(existingQuery, query) : existingQuery;

    var queryString = query && qs.stringify(query);

    if (queryString)
      return Path.withoutQuery(path) + '?' + queryString;

    return path;
  },

  /**
   * Returns true if the given path is absolute.
   */
  isAbsolute: function (path) {
    return path.charAt(0) === '/';
  },

  /**
   * Returns a normalized version of the given path.
   */
  normalize: function (path, parentRoute) {
    return path.replace(/^\/*/, '/');
  },

  /**
   * Joins two URL paths together.
   */
  join: function (a, b) {
    return a.replace(/\/*$/, '/') + b;
  }

};

module.exports = Path;

},{"qs":129,"qs/lib/utils":133,"react/lib/invariant":173}],157:[function(require,module,exports){
var Promise = require('when/lib/Promise');

// TODO: Use process.env.NODE_ENV check + envify to enable
// when's promise monitor here when in dev.

module.exports = Promise;

},{"when/lib/Promise":178}],158:[function(require,module,exports){
var PropTypes = {

  /**
   * Requires that the value of a prop be falsy.
   */
  falsy: function (props, propName, componentName) {
    if (props[propName])
      return new Error('<' + componentName + '> may not have a "' + propName + '" prop');
  }

};

module.exports = PropTypes;

},{}],159:[function(require,module,exports){
/**
 * Encapsulates a redirect to the given route.
 */
function Redirect(to, params, query) {
  this.to = to;
  this.params = params;
  this.query = query;
}

module.exports = Redirect;

},{}],160:[function(require,module,exports){
var assign = require('react/lib/Object.assign');
var reversedArray = require('./reversedArray');
var Redirect = require('./Redirect');
var Promise = require('./Promise');

/**
 * Runs all hook functions serially and calls callback(error) when finished.
 * A hook may return a promise if it needs to execute asynchronously.
 */
function runHooks(hooks, callback) {
  var promise;
  try {
    promise = hooks.reduce(function (promise, hook) {
      // The first hook to use transition.wait makes the rest
      // of the transition async from that point forward.
      return promise ? promise.then(hook) : hook();
    }, null);
  } catch (error) {
    return callback(error); // Sync error.
  }

  if (promise) {
    // Use setTimeout to break the promise chain.
    promise.then(function () {
      setTimeout(callback);
    }, function (error) {
      setTimeout(function () {
        callback(error);
      });
    });
  } else {
    callback();
  }
}

/**
 * Calls the willTransitionFrom hook of all handlers in the given matches
 * serially in reverse with the transition object and the current instance of
 * the route's handler, so that the deepest nested handlers are called first.
 * Calls callback(error) when finished.
 */
function runTransitionFromHooks(transition, routes, components, callback) {
  components = reversedArray(components);

  var hooks = reversedArray(routes).map(function (route, index) {
    return function () {
      var handler = route.handler;

      if (!transition.isAborted && handler.willTransitionFrom)
        return handler.willTransitionFrom(transition, components[index]);

      var promise = transition._promise;
      transition._promise = null;

      return promise;
    };
  });

  runHooks(hooks, callback);
}

/**
 * Calls the willTransitionTo hook of all handlers in the given matches
 * serially with the transition object and any params that apply to that
 * handler. Calls callback(error) when finished.
 */
function runTransitionToHooks(transition, routes, params, query, callback) {
  var hooks = routes.map(function (route) {
    return function () {
      var handler = route.handler;

      if (!transition.isAborted && handler.willTransitionTo)
        handler.willTransitionTo(transition, params, query);

      var promise = transition._promise;
      transition._promise = null;

      return promise;
    };
  });

  runHooks(hooks, callback);
}

/**
 * Encapsulates a transition to a given path.
 *
 * The willTransitionTo and willTransitionFrom handlers receive
 * an instance of this class as their first argument.
 */
function Transition(path, retry) {
  this.path = path;
  this.abortReason = null;
  this.isAborted = false;
  this.retry = retry.bind(this);
  this._promise = null;
}

assign(Transition.prototype, {

  abort: function (reason) {
    if (this.isAborted) {
      // First abort wins.
      return;
    }

    this.abortReason = reason;
    this.isAborted = true;
  },

  redirect: function (to, params, query) {
    this.abort(new Redirect(to, params, query));
  },

  wait: function (value) {
    this._promise = Promise.resolve(value);
  },

  from: function (routes, components, callback) {
    return runTransitionFromHooks(this, routes, components, callback);
  },

  to: function (routes, params, query, callback) {
    return runTransitionToHooks(this, routes, params, query, callback);
  }

});

module.exports = Transition;

},{"./Promise":157,"./Redirect":159,"./reversedArray":164,"react/lib/Object.assign":169}],161:[function(require,module,exports){
(function (process){
/* jshint -W058 */
var React = require('react');
var warning = require('react/lib/warning');
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;
var ImitateBrowserBehavior = require('../behaviors/ImitateBrowserBehavior');
var RouteHandler = require('../components/RouteHandler');
var LocationActions = require('../actions/LocationActions');
var HashLocation = require('../locations/HashLocation');
var HistoryLocation = require('../locations/HistoryLocation');
var RefreshLocation = require('../locations/RefreshLocation');
var NavigationContext = require('../mixins/NavigationContext');
var StateContext = require('../mixins/StateContext');
var Scrolling = require('../mixins/Scrolling');
var createRoutesFromChildren = require('./createRoutesFromChildren');
var supportsHistory = require('./supportsHistory');
var Transition = require('./Transition');
var PropTypes = require('./PropTypes');
var Redirect = require('./Redirect');
var History = require('./History');
var Cancellation = require('./Cancellation');
var Path = require('./Path');

/**
 * The default location for new routers.
 */
var DEFAULT_LOCATION = canUseDOM ? HashLocation : '/';

/**
 * The default scroll behavior for new routers.
 */
var DEFAULT_SCROLL_BEHAVIOR = canUseDOM ? ImitateBrowserBehavior : null;

/**
 * The default error handler for new routers.
 */
function defaultErrorHandler(error) {
  // Throw so we don't silently swallow async errors.
  throw error; // This error probably originated in a transition hook.
}

/**
 * The default aborted transition handler for new routers.
 */
function defaultAbortHandler(abortReason, location) {
  if (typeof location === 'string')
    throw new Error('Unhandled aborted transition! Reason: ' + abortReason);

  if (abortReason instanceof Cancellation) {
    return;
  } else if (abortReason instanceof Redirect) {
    location.replace(this.makePath(abortReason.to, abortReason.params, abortReason.query));
  } else {
    location.pop();
  }
}

function findMatch(pathname, routes, defaultRoute, notFoundRoute) {
  var match, route, params;

  for (var i = 0, len = routes.length; i < len; ++i) {
    route = routes[i];

    // Check the subtree first to find the most deeply-nested match.
    match = findMatch(pathname, route.childRoutes, route.defaultRoute, route.notFoundRoute);

    if (match != null) {
      match.routes.unshift(route);
      return match;
    }

    // No routes in the subtree matched, so check this route.
    params = Path.extractParams(route.path, pathname);

    if (params)
      return createMatch(route, params);
  }

  // No routes matched, so try the default route if there is one.
  if (defaultRoute && (params = Path.extractParams(defaultRoute.path, pathname)))
    return createMatch(defaultRoute, params);

  // Last attempt: does the "not found" route match?
  if (notFoundRoute && (params = Path.extractParams(notFoundRoute.path, pathname)))
    return createMatch(notFoundRoute, params);

  return match;
}

function createMatch(route, params) {
  return { routes: [ route ], params: params };
}

function hasProperties(object, properties) {
  for (var propertyName in properties)
    if (properties.hasOwnProperty(propertyName) && object[propertyName] !== properties[propertyName])
      return false;

  return true;
}

function hasMatch(routes, route, prevParams, nextParams, prevQuery, nextQuery) {
  return routes.some(function (r) {
    if (r !== route)
      return false;

    var paramNames = route.paramNames;
    var paramName;

    // Ensure that all params the route cares about did not change.
    for (var i = 0, len = paramNames.length; i < len; ++i) {
      paramName = paramNames[i];

      if (nextParams[paramName] !== prevParams[paramName])
        return false;
    }

    // Ensure the query hasn't changed.
    return hasProperties(prevQuery, nextQuery) && hasProperties(nextQuery, prevQuery);
  });
}

/**
 * Creates and returns a new router using the given options. A router
 * is a ReactComponent class that knows how to react to changes in the
 * URL and keep the contents of the page in sync.
 *
 * Options may be any of the following:
 *
 * - routes           (required) The route config
 * - location         The location to use. Defaults to HashLocation when
 *                    the DOM is available, "/" otherwise
 * - scrollBehavior   The scroll behavior to use. Defaults to ImitateBrowserBehavior
 *                    when the DOM is available, null otherwise
 * - onError          A function that is used to handle errors
 * - onAbort          A function that is used to handle aborted transitions
 *
 * When rendering in a server-side environment, the location should simply
 * be the URL path that was used in the request, including the query string.
 */
function createRouter(options) {
  options = options || {};

  if (typeof options === 'function') {
    options = { routes: options }; // Router.create(<Route>)
  } else if (Array.isArray(options)) {
    options = { routes: options }; // Router.create([ <Route>, <Route> ])
  }

  var routes = [];
  var namedRoutes = {};
  var components = [];
  var location = options.location || DEFAULT_LOCATION;
  var scrollBehavior = options.scrollBehavior || DEFAULT_SCROLL_BEHAVIOR;
  var onError = options.onError || defaultErrorHandler;
  var onAbort = options.onAbort || defaultAbortHandler;
  var state = {};
  var nextState = {};
  var pendingTransition = null;

  function updateState() {
    state = nextState;
    nextState = {};
  }

  if (typeof location === 'string') {
    warning(
      !canUseDOM || process.env.NODE_ENV === 'test',
      'You should not use a static location in a DOM environment because ' +
      'the router will not be kept in sync with the current URL'
    );
  } else {
    invariant(
      canUseDOM,
      'You cannot use %s without a DOM',
      location
    );
  }

  // Automatically fall back to full page refreshes in
  // browsers that don't support the HTML history API.
  if (location === HistoryLocation && !supportsHistory())
    location = RefreshLocation;

  var router = React.createClass({

    displayName: 'Router',

    mixins: [ NavigationContext, StateContext, Scrolling ],

    statics: {

      defaultRoute: null,
      notFoundRoute: null,

      /**
       * Adds routes to this router from the given children object (see ReactChildren).
       */
      addRoutes: function (children) {
        routes.push.apply(routes, createRoutesFromChildren(children, this, namedRoutes));
      },

      /**
       * Returns an absolute URL path created from the given route
       * name, URL parameters, and query.
       */
      makePath: function (to, params, query) {
        var path;
        if (Path.isAbsolute(to)) {
          path = Path.normalize(to);
        } else {
          var route = namedRoutes[to];

          invariant(
            route,
            'Unable to find <Route name="%s">',
            to
          );

          path = route.path;
        }

        return Path.withQuery(Path.injectParams(path, params), query);
      },

      /**
       * Returns a string that may safely be used as the href of a link
       * to the route with the given name, URL parameters, and query.
       */
      makeHref: function (to, params, query) {
        var path = this.makePath(to, params, query);
        return (location === HashLocation) ? '#' + path : path;
      },

      /**
       * Transitions to the URL specified in the arguments by pushing
       * a new URL onto the history stack.
       */
      transitionTo: function (to, params, query) {
        invariant(
          typeof location !== 'string',
          'You cannot use transitionTo with a static location'
        );

        var path = this.makePath(to, params, query);

        if (pendingTransition) {
          // Replace so pending location does not stay in history.
          location.replace(path);
        } else {
          location.push(path);
        }
      },

      /**
       * Transitions to the URL specified in the arguments by replacing
       * the current URL in the history stack.
       */
      replaceWith: function (to, params, query) {
        invariant(
          typeof location !== 'string',
          'You cannot use replaceWith with a static location'
        );

        location.replace(this.makePath(to, params, query));
      },

      /**
       * Transitions to the previous URL if one is available. Returns true if the
       * router was able to go back, false otherwise.
       *
       * Note: The router only tracks history entries in your application, not the
       * current browser session, so you can safely call this function without guarding
       * against sending the user back to some other site. However, when using
       * RefreshLocation (which is the fallback for HistoryLocation in browsers that
       * don't support HTML5 history) this method will *always* send the client back
       * because we cannot reliably track history length.
       */
      goBack: function () {
        invariant(
          typeof location !== 'string',
          'You cannot use goBack with a static location'
        );

        if (History.length > 1 || location === RefreshLocation) {
          location.pop();
          return true;
        }

        warning(false, 'goBack() was ignored because there is no router history');

        return false;
      },

      /**
       * Performs a match of the given pathname against this router and returns an object
       * with the { routes, params } that match. Returns null if no match can be made.
       */
      match: function (pathname) {
        return findMatch(pathname, routes, this.defaultRoute, this.notFoundRoute) || null;
      },

      /**
       * Performs a transition to the given path and calls callback(error, abortReason)
       * when the transition is finished. If both arguments are null the router's state
       * was updated. Otherwise the transition did not complete.
       *
       * In a transition, a router first determines which routes are involved by beginning
       * with the current route, up the route tree to the first parent route that is shared
       * with the destination route, and back down the tree to the destination route. The
       * willTransitionFrom hook is invoked on all route handlers we're transitioning away
       * from, in reverse nesting order. Likewise, the willTransitionTo hook is invoked on
       * all route handlers we're transitioning to.
       *
       * Both willTransitionFrom and willTransitionTo hooks may either abort or redirect the
       * transition. To resolve asynchronously, they may use transition.wait(promise). If no
       * hooks wait, the transition is fully synchronous.
       */
      dispatch: function (path, action, callback) {
        if (pendingTransition) {
          pendingTransition.abort(new Cancellation);
          pendingTransition = null;
        }

        var prevPath = state.path;
        if (prevPath === path)
          return; // Nothing to do!

        // Record the scroll position as early as possible to
        // get it before browsers try update it automatically.
        if (prevPath && action !== LocationActions.REPLACE)
          this.recordScrollPosition(prevPath);

        var pathname = Path.withoutQuery(path);
        var match = this.match(pathname);

        warning(
          match != null,
          'No route matches path "%s". Make sure you have <Route path="%s"> somewhere in your routes',
          path, path
        );

        if (match == null)
          match = {};

        var prevRoutes = state.routes || [];
        var prevParams = state.params || {};
        var prevQuery = state.query || {};

        var nextRoutes = match.routes || [];
        var nextParams = match.params || {};
        var nextQuery = Path.extractQuery(path) || {};

        var fromRoutes, toRoutes;
        if (prevRoutes.length) {
          fromRoutes = prevRoutes.filter(function (route) {
            return !hasMatch(nextRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });

          toRoutes = nextRoutes.filter(function (route) {
            return !hasMatch(prevRoutes, route, prevParams, nextParams, prevQuery, nextQuery);
          });
        } else {
          fromRoutes = [];
          toRoutes = nextRoutes;
        }

        var transition = new Transition(path, this.replaceWith.bind(this, path));
        pendingTransition = transition;

        transition.from(fromRoutes, components, function (error) {
          if (error || transition.isAborted)
            return callback.call(router, error, transition);

          transition.to(toRoutes, nextParams, nextQuery, function (error) {
            if (error || transition.isAborted)
              return callback.call(router, error, transition);

            nextState.path = path;
            nextState.action = action;
            nextState.pathname = pathname;
            nextState.routes = nextRoutes;
            nextState.params = nextParams;
            nextState.query = nextQuery;

            callback.call(router, null, transition);
          });
        });
      },

      /**
       * Starts this router and calls callback(router, state) when the route changes.
       *
       * If the router's location is static (i.e. a URL path in a server environment)
       * the callback is called only once. Otherwise, the location should be one of the
       * Router.*Location objects (e.g. Router.HashLocation or Router.HistoryLocation).
       */
      run: function (callback) {
        var dispatchHandler = function (error, transition) {
          pendingTransition = null;

          if (error) {
            onError.call(router, error);
          } else if (transition.isAborted) {
            onAbort.call(router, transition.abortReason, location);
          } else {
            callback.call(router, router, nextState);
          }
        };

        if (typeof location === 'string') {
          router.dispatch(location, null, dispatchHandler);
        } else {
          // Listen for changes to the location.
          var changeListener = function (change) {
            router.dispatch(change.path, change.type, dispatchHandler);
          };

          if (location.addChangeListener)
            location.addChangeListener(changeListener);

          // Bootstrap using the current path.
          router.dispatch(location.getCurrentPath(), null, dispatchHandler);
        }
      },

      teardown: function() {
        location.removeChangeListener(this.changeListener);
      }

    },

    propTypes: {
      children: PropTypes.falsy
    },

    getLocation: function () {
      return location;
    },

    getScrollBehavior: function () {
      return scrollBehavior;
    },

    getRouteAtDepth: function (depth) {
      var routes = this.state.routes;
      return routes && routes[depth];
    },

    getRouteComponents: function () {
      return components;
    },

    getInitialState: function () {
      updateState();
      return state;
    },

    componentWillReceiveProps: function () {
      updateState();
      this.setState(state);
    },

    componentWillUnmount: function() {
      router.teardown();
    },

    render: function () {
      return this.getRouteAtDepth(0) ? React.createElement(RouteHandler, this.props) : null;
    },

    childContextTypes: {
      getRouteAtDepth: React.PropTypes.func.isRequired,
      getRouteComponents: React.PropTypes.func.isRequired,
      routeHandlers: React.PropTypes.array.isRequired
    },

    getChildContext: function () {
      return {
        getRouteComponents: this.getRouteComponents,
        getRouteAtDepth: this.getRouteAtDepth,
        routeHandlers: [ this ]
      };
    }

  });

  if (options.routes)
    router.addRoutes(options.routes);

  return router;
}

module.exports = createRouter;

}).call(this,require('_process'))

},{"../actions/LocationActions":134,"../behaviors/ImitateBrowserBehavior":135,"../components/RouteHandler":142,"../locations/HashLocation":144,"../locations/HistoryLocation":145,"../locations/RefreshLocation":146,"../mixins/NavigationContext":149,"../mixins/Scrolling":151,"../mixins/StateContext":153,"./Cancellation":154,"./History":155,"./Path":156,"./PropTypes":158,"./Redirect":159,"./Transition":160,"./createRoutesFromChildren":162,"./supportsHistory":166,"_process":128,"react":"react","react/lib/ExecutionEnvironment":168,"react/lib/invariant":173,"react/lib/warning":174}],162:[function(require,module,exports){
/* jshint -W084 */
var React = require('react');
var warning = require('react/lib/warning');
var invariant = require('react/lib/invariant');
var DefaultRoute = require('../components/DefaultRoute');
var NotFoundRoute = require('../components/NotFoundRoute');
var Redirect = require('../components/Redirect');
var Route = require('../components/Route');
var Path = require('./Path');

var CONFIG_ELEMENT_TYPES = [
  DefaultRoute.type,
  NotFoundRoute.type,
  Redirect.type,
  Route.type
];

function createRedirectHandler(to, _params, _query) {
  return React.createClass({
    statics: {
      willTransitionTo: function (transition, params, query) {
        transition.redirect(to, _params || params, _query || query);
      }
    },

    render: function () {
      return null;
    }
  });
}

function checkPropTypes(componentName, propTypes, props) {
  for (var propName in propTypes) {
    if (propTypes.hasOwnProperty(propName)) {
      var error = propTypes[propName](props, propName, componentName);

      if (error instanceof Error)
        warning(false, error.message);
    }
  }
}

function createRoute(element, parentRoute, namedRoutes) {
  var type = element.type;
  var props = element.props;
  var componentName = (type && type.displayName) || 'UnknownComponent';

  invariant(
    CONFIG_ELEMENT_TYPES.indexOf(type) !== -1,
    'Unrecognized route configuration element "<%s>"',
    componentName
  );

  if (type.propTypes)
    checkPropTypes(componentName, type.propTypes, props);

  var route = { name: props.name };

  if (props.ignoreScrollBehavior) {
    route.ignoreScrollBehavior = true;
  }

  if (type === Redirect.type) {
    route.handler = createRedirectHandler(props.to, props.params, props.query);
    props.path = props.path || props.from || '*';
  } else {
    route.handler = props.handler;
  }

  var parentPath = (parentRoute && parentRoute.path) || '/';

  if ((props.path || props.name) && type !== DefaultRoute.type && type !== NotFoundRoute.type) {
    var path = props.path || props.name;

    // Relative paths extend their parent.
    if (!Path.isAbsolute(path))
      path = Path.join(parentPath, path);

    route.path = Path.normalize(path);
  } else {
    route.path = parentPath;

    if (type === NotFoundRoute.type)
      route.path += '*';
  }

  route.paramNames = Path.extractParamNames(route.path);

  // Make sure the route's path has all params its parent needs.
  if (parentRoute && Array.isArray(parentRoute.paramNames)) {
    parentRoute.paramNames.forEach(function (paramName) {
      invariant(
        route.paramNames.indexOf(paramName) !== -1,
        'The nested route path "%s" is missing the "%s" parameter of its parent path "%s"',
        route.path, paramName, parentRoute.path
      );
    });
  }

  // Make sure the route can be looked up by <Link>s.
  if (props.name) {
    invariant(
      namedRoutes[props.name] == null,
      'You cannot use the name "%s" for more than one route',
      props.name
    );

    namedRoutes[props.name] = route;
  }

  // Handle <NotFoundRoute>.
  if (type === NotFoundRoute.type) {
    invariant(
      parentRoute,
      '<NotFoundRoute> must have a parent <Route>'
    );

    invariant(
      parentRoute.notFoundRoute == null,
      'You may not have more than one <NotFoundRoute> per <Route>'
    );

    parentRoute.notFoundRoute = route;

    return null;
  }

  // Handle <DefaultRoute>.
  if (type === DefaultRoute.type) {
    invariant(
      parentRoute,
      '<DefaultRoute> must have a parent <Route>'
    );

    invariant(
      parentRoute.defaultRoute == null,
      'You may not have more than one <DefaultRoute> per <Route>'
    );

    parentRoute.defaultRoute = route;

    return null;
  }

  route.childRoutes = createRoutesFromChildren(props.children, route, namedRoutes);

  return route;
}

/**
 * Creates and returns an array of route objects from the given ReactChildren.
 */
function createRoutesFromChildren(children, parentRoute, namedRoutes) {
  var routes = [];

  React.Children.forEach(children, function (child) {
    // Exclude <DefaultRoute>s and <NotFoundRoute>s.
    if (child = createRoute(child, parentRoute, namedRoutes))
      routes.push(child);
  });

  return routes;
}

module.exports = createRoutesFromChildren;

},{"../components/DefaultRoute":137,"../components/NotFoundRoute":139,"../components/Redirect":140,"../components/Route":141,"./Path":156,"react":"react","react/lib/invariant":173,"react/lib/warning":174}],163:[function(require,module,exports){
var invariant = require('react/lib/invariant');
var canUseDOM = require('react/lib/ExecutionEnvironment').canUseDOM;

/**
 * Returns the current scroll position of the window as { x, y }.
 */
function getWindowScrollPosition() {
  invariant(
    canUseDOM,
    'Cannot get current scroll position without a DOM'
  );

  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

module.exports = getWindowScrollPosition;

},{"react/lib/ExecutionEnvironment":168,"react/lib/invariant":173}],164:[function(require,module,exports){
function reversedArray(array) {
  return array.slice(0).reverse();
}

module.exports = reversedArray;

},{}],165:[function(require,module,exports){
var createRouter = require('./createRouter');

/**
 * A high-level convenience method that creates, configures, and
 * runs a router in one shot. The method signature is:
 *
 *   Router.run(routes[, location ], callback);
 *
 * Using `window.location.hash` to manage the URL, you could do:
 *
 *   Router.run(routes, function (Handler) {
 *     React.render(<Handler/>, document.body);
 *   });
 * 
 * Using HTML5 history and a custom "cursor" prop:
 * 
 *   Router.run(routes, Router.HistoryLocation, function (Handler) {
 *     React.render(<Handler cursor={cursor}/>, document.body);
 *   });
 *
 * Returns the newly created router.
 *
 * Note: If you need to specify further options for your router such
 * as error/abort handling or custom scroll behavior, use Router.create
 * instead.
 *
 *   var router = Router.create(options);
 *   router.run(function (Handler) {
 *     // ...
 *   });
 */
function runRouter(routes, location, callback) {
  if (typeof location === 'function') {
    callback = location;
    location = null;
  }

  var router = createRouter({
    routes: routes,
    location: location
  });

  router.run(callback);

  return router;
}

module.exports = runRouter;

},{"./createRouter":161}],166:[function(require,module,exports){
function supportsHistory() {
  /*! taken from modernizr
   * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
   * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
   * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
   */
  var ua = navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 ||
      (ua.indexOf('Android 4.0') !== -1)) &&
      ua.indexOf('Mobile Safari') !== -1 &&
      ua.indexOf('Chrome') === -1 &&
      ua.indexOf('Windows Phone') === -1) {
    return false;
  }
  return (window.history && 'pushState' in window.history);
}

module.exports = supportsHistory;

},{}],167:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule CSSCore
 * @typechecks
 */

var invariant = require("./invariant");

/**
 * The CSSCore module specifies the API (and implements most of the methods)
 * that should be used when dealing with the display of elements (via their
 * CSS classes and visibility on screen. It is an API focused on mutating the
 * display and not reading it as no logical state should be encoded in the
 * display of elements.
 */

var CSSCore = {

  /**
   * Adds the class passed in to the element if it doesn't already have it.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   */
  addClass: function(element, className) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !/\s/.test(className),
      'CSSCore.addClass takes only a single class name. "%s" contains ' +
      'multiple classes.', className
    ) : invariant(!/\s/.test(className)));

    if (className) {
      if (element.classList) {
        element.classList.add(className);
      } else if (!CSSCore.hasClass(element, className)) {
        element.className = element.className + ' ' + className;
      }
    }
    return element;
  },

  /**
   * Removes the class passed in from the element
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @return {DOMElement} the element passed in
   */
  removeClass: function(element, className) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !/\s/.test(className),
      'CSSCore.removeClass takes only a single class name. "%s" contains ' +
      'multiple classes.', className
    ) : invariant(!/\s/.test(className)));

    if (className) {
      if (element.classList) {
        element.classList.remove(className);
      } else if (CSSCore.hasClass(element, className)) {
        element.className = element.className
          .replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)', 'g'), '$1')
          .replace(/\s+/g, ' ') // multiple spaces to one
          .replace(/^\s*|\s*$/g, ''); // trim the ends
      }
    }
    return element;
  },

  /**
   * Helper to add or remove a class from an element based on a condition.
   *
   * @param {DOMElement} element the element to set the class on
   * @param {string} className the CSS className
   * @param {*} bool condition to whether to add or remove the class
   * @return {DOMElement} the element passed in
   */
  conditionClass: function(element, className, bool) {
    return (bool ? CSSCore.addClass : CSSCore.removeClass)(element, className);
  },

  /**
   * Tests whether the element has the class specified.
   *
   * @param {DOMNode|DOMWindow} element the element to set the class on
   * @param {string} className the CSS className
   * @return {boolean} true if the element has the class, false if not
   */
  hasClass: function(element, className) {
    ("production" !== process.env.NODE_ENV ? invariant(
      !/\s/.test(className),
      'CSS.hasClass takes only a single class name.'
    ) : invariant(!/\s/.test(className)));
    if (element.classList) {
      return !!className && element.classList.contains(className);
    }
    return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;
  }

};

module.exports = CSSCore;

}).call(this,require('_process'))

},{"./invariant":173,"_process":128}],168:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ExecutionEnvironment
 */

/*jslint evil: true */

"use strict";

var canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

/**
 * Simple, lightweight module assisting with the detection and context of
 * Worker. Helps avoid circular dependencies and allows code to reason about
 * whether or not they are in a Worker, even if they never include the main
 * `ReactWorker` dependency.
 */
var ExecutionEnvironment = {

  canUseDOM: canUseDOM,

  canUseWorkers: typeof Worker !== 'undefined',

  canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),

  canUseViewport: canUseDOM && !!window.screen,

  isInWorker: !canUseDOM // For now, this is true - might change in the future.

};

module.exports = ExecutionEnvironment;

},{}],169:[function(require,module,exports){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule Object.assign
 */

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign

function assign(target, sources) {
  if (target == null) {
    throw new TypeError('Object.assign target cannot be null or undefined');
  }

  var to = Object(target);
  var hasOwnProperty = Object.prototype.hasOwnProperty;

  for (var nextIndex = 1; nextIndex < arguments.length; nextIndex++) {
    var nextSource = arguments[nextIndex];
    if (nextSource == null) {
      continue;
    }

    var from = Object(nextSource);

    // We don't currently support accessors nor proxies. Therefore this
    // copy cannot throw. If we ever supported this then we must handle
    // exceptions and side-effects. We don't support symbols so they won't
    // be transferred.

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
  }

  return to;
};

module.exports = assign;

},{}],170:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactTransitionEvents
 */

"use strict";

var ExecutionEnvironment = require("./ExecutionEnvironment");

/**
 * EVENT_NAME_MAP is used to determine which event fired when a
 * transition/animation ends, based on the style property used to
 * define that event.
 */
var EVENT_NAME_MAP = {
  transitionend: {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'mozTransitionEnd',
    'OTransition': 'oTransitionEnd',
    'msTransition': 'MSTransitionEnd'
  },

  animationend: {
    'animation': 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd',
    'MozAnimation': 'mozAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd'
  }
};

var endEvents = [];

function detectEvents() {
  var testEl = document.createElement('div');
  var style = testEl.style;

  // On some platforms, in particular some releases of Android 4.x,
  // the un-prefixed "animation" and "transition" properties are defined on the
  // style object but the events that fire will still be prefixed, so we need
  // to check if the un-prefixed events are useable, and if not remove them
  // from the map
  if (!('AnimationEvent' in window)) {
    delete EVENT_NAME_MAP.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete EVENT_NAME_MAP.transitionend.transition;
  }

  for (var baseEventName in EVENT_NAME_MAP) {
    var baseEvents = EVENT_NAME_MAP[baseEventName];
    for (var styleName in baseEvents) {
      if (styleName in style) {
        endEvents.push(baseEvents[styleName]);
        break;
      }
    }
  }
}

if (ExecutionEnvironment.canUseDOM) {
  detectEvents();
}

// We use the raw {add|remove}EventListener() call because EventListener
// does not know how to remove event listeners and we really should
// clean up. Also, these events are not triggered in older browsers
// so we should be A-OK here.

function addEventListener(node, eventName, eventListener) {
  node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node, eventName, eventListener) {
  node.removeEventListener(eventName, eventListener, false);
}

var ReactTransitionEvents = {
  addEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      // If CSS transitions are not supported, trigger an "end animation"
      // event immediately.
      window.setTimeout(eventListener, 0);
      return;
    }
    endEvents.forEach(function(endEvent) {
      addEventListener(node, endEvent, eventListener);
    });
  },

  removeEndEventListener: function(node, eventListener) {
    if (endEvents.length === 0) {
      return;
    }
    endEvents.forEach(function(endEvent) {
      removeEventListener(node, endEvent, eventListener);
    });
  }
};

module.exports = ReactTransitionEvents;

},{"./ExecutionEnvironment":168}],171:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule cx
 */

/**
 * This function is used to mark string literals representing CSS class names
 * so that they can be transformed statically. This allows for modularization
 * and minification of CSS class names.
 *
 * In static_upstream, this function is actually implemented, but it should
 * eventually be replaced with something more descriptive, and the transform
 * that is used in the main stack should be ported for use elsewhere.
 *
 * @param string|object className to modularize, or an object of key/values.
 *                      In the object case, the values are conditions that
 *                      determine if the className keys should be included.
 * @param [string ...]  Variable list of classNames in the string case.
 * @return string       Renderable space-separated CSS className.
 */
function cx(classNames) {
  if (typeof classNames == 'object') {
    return Object.keys(classNames).filter(function(className) {
      return classNames[className];
    }).join(' ');
  } else {
    return Array.prototype.join.call(arguments, ' ');
  }
}

module.exports = cx;

},{}],172:[function(require,module,exports){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule emptyFunction
 */

function makeEmptyFunction(arg) {
  return function() {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
function emptyFunction() {}

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function() { return this; };
emptyFunction.thatReturnsArgument = function(arg) { return arg; };

module.exports = emptyFunction;

},{}],173:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule invariant
 */

"use strict";

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if ("production" !== process.env.NODE_ENV) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        'Invariant Violation: ' +
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

}).call(this,require('_process'))

},{"_process":128}],174:[function(require,module,exports){
(function (process){
/**
 * Copyright 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule warning
 */

"use strict";

var emptyFunction = require("./emptyFunction");

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("production" !== process.env.NODE_ENV) {
  warning = function(condition, format ) {for (var args=[],$__0=2,$__1=arguments.length;$__0<$__1;$__0++) args.push(arguments[$__0]);
    if (format === undefined) {
      throw new Error(
        '`warning(condition, format, ...args)` requires a warning ' +
        'message argument'
      );
    }

    if (!condition) {
      var argIndex = 0;
      console.warn('Warning: ' + format.replace(/%s/g, function()  {return args[argIndex++];}));
    }
  };
}

module.exports = warning;

}).call(this,require('_process'))

},{"./emptyFunction":172,"_process":128}],175:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":176}],176:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);

},{}],177:[function(require,module,exports){
//! stable.js 0.1.8, https://github.com/Two-Screen/stable
//! © 2018 Angry Bytes and contributors. MIT licensed.

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.stable = factory());
}(this, (function () { 'use strict';

  // A stable array sort, because `Array#sort()` is not guaranteed stable.
  // This is an implementation of merge sort, without recursion.

  var stable = function (arr, comp) {
    return exec(arr.slice(), comp)
  };

  stable.inplace = function (arr, comp) {
    var result = exec(arr, comp);

    // This simply copies back if the result isn't in the original array,
    // which happens on an odd number of passes.
    if (result !== arr) {
      pass(result, null, arr.length, arr);
    }

    return arr
  };

  // Execute the sort using the input array and a second buffer as work space.
  // Returns one of those two, containing the final result.
  function exec(arr, comp) {
    if (typeof(comp) !== 'function') {
      comp = function (a, b) {
        return String(a).localeCompare(b)
      };
    }

    // Short-circuit when there's nothing to sort.
    var len = arr.length;
    if (len <= 1) {
      return arr
    }

    // Rather than dividing input, simply iterate chunks of 1, 2, 4, 8, etc.
    // Chunks are the size of the left or right hand in merge sort.
    // Stop when the left-hand covers all of the array.
    var buffer = new Array(len);
    for (var chk = 1; chk < len; chk *= 2) {
      pass(arr, comp, chk, buffer);

      var tmp = arr;
      arr = buffer;
      buffer = tmp;
    }

    return arr
  }

  // Run a single pass with the given chunk size.
  var pass = function (arr, comp, chk, result) {
    var len = arr.length;
    var i = 0;
    // Step size / double chunk size.
    var dbl = chk * 2;
    // Bounds of the left and right chunks.
    var l, r, e;
    // Iterators over the left and right chunk.
    var li, ri;

    // Iterate over pairs of chunks.
    for (l = 0; l < len; l += dbl) {
      r = l + chk;
      e = r + chk;
      if (r > len) r = len;
      if (e > len) e = len;

      // Iterate both chunks in parallel.
      li = l;
      ri = r;
      while (true) {
        // Compare the chunks.
        if (li < r && ri < e) {
          // This works for a regular `sort()` compatible comparator,
          // but also for a simple comparator like: `a > b`
          if (comp(arr[li], arr[ri]) <= 0) {
            result[i++] = arr[li++];
          }
          else {
            result[i++] = arr[ri++];
          }
        }
        // Nothing to compare, just flush what's left.
        else if (li < r) {
          result[i++] = arr[li++];
        }
        else if (ri < e) {
          result[i++] = arr[ri++];
        }
        // Both iterators are at the chunk ends.
        else {
          break
        }
      }
    }
  };

  return stable;

})));

},{}],178:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function (require) {

	var makePromise = require('./makePromise');
	var Scheduler = require('./Scheduler');
	var async = require('./async');

	return makePromise({
		scheduler: new Scheduler(async)
	});

});
})(typeof define === 'function' && define.amd ? define : function (factory) { module.exports = factory(require); });

},{"./Scheduler":180,"./async":181,"./makePromise":182}],179:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {
	/**
	 * Circular queue
	 * @param {number} capacityPow2 power of 2 to which this queue's capacity
	 *  will be set initially. eg when capacityPow2 == 3, queue capacity
	 *  will be 8.
	 * @constructor
	 */
	function Queue(capacityPow2) {
		this.head = this.tail = this.length = 0;
		this.buffer = new Array(1 << capacityPow2);
	}

	Queue.prototype.push = function(x) {
		if(this.length === this.buffer.length) {
			this._ensureCapacity(this.length * 2);
		}

		this.buffer[this.tail] = x;
		this.tail = (this.tail + 1) & (this.buffer.length - 1);
		++this.length;
		return this.length;
	};

	Queue.prototype.shift = function() {
		var x = this.buffer[this.head];
		this.buffer[this.head] = void 0;
		this.head = (this.head + 1) & (this.buffer.length - 1);
		--this.length;
		return x;
	};

	Queue.prototype._ensureCapacity = function(capacity) {
		var head = this.head;
		var buffer = this.buffer;
		var newBuffer = new Array(capacity);
		var i = 0;
		var len;

		if(head === 0) {
			len = this.length;
			for(; i<len; ++i) {
				newBuffer[i] = buffer[i];
			}
		} else {
			capacity = buffer.length;
			len = this.tail;
			for(; head<capacity; ++i, ++head) {
				newBuffer[i] = buffer[head];
			}

			for(head=0; head<len; ++i, ++head) {
				newBuffer[i] = buffer[head];
			}
		}

		this.buffer = newBuffer;
		this.head = 0;
		this.tail = this.length;
	};

	return Queue;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],180:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	var Queue = require('./Queue');

	// Credit to Twisol (https://github.com/Twisol) for suggesting
	// this type of extensible queue + trampoline approach for next-tick conflation.

	/**
	 * Async task scheduler
	 * @param {function} async function to schedule a single async function
	 * @constructor
	 */
	function Scheduler(async) {
		this._async = async;
		this._queue = new Queue(15);
		this._afterQueue = new Queue(5);
		this._running = false;

		var self = this;
		this.drain = function() {
			self._drain();
		};
	}

	/**
	 * Enqueue a task
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.enqueue = function(task) {
		this._add(this._queue, task);
	};

	/**
	 * Enqueue a task to run after the main task queue
	 * @param {{ run:function }} task
	 */
	Scheduler.prototype.afterQueue = function(task) {
		this._add(this._afterQueue, task);
	};

	/**
	 * Drain the handler queue entirely, and then the after queue
	 */
	Scheduler.prototype._drain = function() {
		runQueue(this._queue);
		this._running = false;
		runQueue(this._afterQueue);
	};

	/**
	 * Add a task to the q, and schedule drain if not already scheduled
	 * @param {Queue} queue
	 * @param {{run:function}} task
	 * @private
	 */
	Scheduler.prototype._add = function(queue, task) {
		queue.push(task);
		if(!this._running) {
			this._running = true;
			this._async(this.drain);
		}
	};

	/**
	 * Run all the tasks in the q
	 * @param queue
	 */
	function runQueue(queue) {
		while(queue.length > 0) {
			queue.shift().run();
		}
	}

	return Scheduler;

});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

},{"./Queue":179}],181:[function(require,module,exports){
(function (process){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function(require) {

	// Sniff "best" async scheduling option
	// Prefer process.nextTick or MutationObserver, then check for
	// vertx and finally fall back to setTimeout

	/*jshint maxcomplexity:6*/
	/*global process,document,setTimeout,MutationObserver,WebKitMutationObserver*/
	var nextTick, MutationObs;

	if (typeof process !== 'undefined' && process !== null &&
		typeof process.nextTick === 'function') {
		nextTick = function(f) {
			process.nextTick(f);
		};

	} else if (MutationObs =
		(typeof MutationObserver === 'function' && MutationObserver) ||
		(typeof WebKitMutationObserver === 'function' && WebKitMutationObserver)) {
		nextTick = (function (document, MutationObserver) {
			var scheduled;
			var el = document.createElement('div');
			var o = new MutationObserver(run);
			o.observe(el, { attributes: true });

			function run() {
				var f = scheduled;
				scheduled = void 0;
				f();
			}

			return function (f) {
				scheduled = f;
				el.setAttribute('class', 'x');
			};
		}(document, MutationObs));

	} else {
		nextTick = (function(cjsRequire) {
			var vertx;
			try {
				// vert.x 1.x || 2.x
				vertx = cjsRequire('vertx');
			} catch (ignore) {}

			if (vertx) {
				if (typeof vertx.runOnLoop === 'function') {
					return vertx.runOnLoop;
				}
				if (typeof vertx.runOnContext === 'function') {
					return vertx.runOnContext;
				}
			}

			// capture setTimeout to avoid being caught by fake timers
			// used in time based tests
			var capturedSetTimeout = setTimeout;
			return function (t) {
				capturedSetTimeout(t, 0);
			};
		}(require));
	}

	return nextTick;
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(require); }));

}).call(this,require('_process'))

},{"_process":128}],182:[function(require,module,exports){
/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */

(function(define) { 'use strict';
define(function() {

	return function makePromise(environment) {

		var tasks = environment.scheduler;

		var objectCreate = Object.create ||
			function(proto) {
				function Child() {}
				Child.prototype = proto;
				return new Child();
			};

		/**
		 * Create a promise whose fate is determined by resolver
		 * @constructor
		 * @returns {Promise} promise
		 * @name Promise
		 */
		function Promise(resolver, handler) {
			this._handler = resolver === Handler ? handler : init(resolver);
		}

		/**
		 * Run the supplied resolver
		 * @param resolver
		 * @returns {Pending}
		 */
		function init(resolver) {
			var handler = new Pending();

			try {
				resolver(promiseResolve, promiseReject, promiseNotify);
			} catch (e) {
				promiseReject(e);
			}

			return handler;

			/**
			 * Transition from pre-resolution state to post-resolution state, notifying
			 * all listeners of the ultimate fulfillment or rejection
			 * @param {*} x resolution value
			 */
			function promiseResolve (x) {
				handler.resolve(x);
			}
			/**
			 * Reject this promise with reason, which will be used verbatim
			 * @param {Error|*} reason rejection reason, strongly suggested
			 *   to be an Error type
			 */
			function promiseReject (reason) {
				handler.reject(reason);
			}

			/**
			 * Issue a progress event, notifying all progress listeners
			 * @param {*} x progress event payload to pass to all listeners
			 */
			function promiseNotify (x) {
				handler.notify(x);
			}
		}

		// Creation

		Promise.resolve = resolve;
		Promise.reject = reject;
		Promise.never = never;

		Promise._defer = defer;
		Promise._handler = getHandler;

		/**
		 * Returns a trusted promise. If x is already a trusted promise, it is
		 * returned, otherwise returns a new trusted Promise which follows x.
		 * @param  {*} x
		 * @return {Promise} promise
		 */
		function resolve(x) {
			return isPromise(x) ? x
				: new Promise(Handler, new Async(getHandler(x)));
		}

		/**
		 * Return a reject promise with x as its reason (x is used verbatim)
		 * @param {*} x
		 * @returns {Promise} rejected promise
		 */
		function reject(x) {
			return new Promise(Handler, new Async(new Rejected(x)));
		}

		/**
		 * Return a promise that remains pending forever
		 * @returns {Promise} forever-pending promise.
		 */
		function never() {
			return foreverPendingPromise; // Should be frozen
		}

		/**
		 * Creates an internal {promise, resolver} pair
		 * @private
		 * @returns {Promise}
		 */
		function defer() {
			return new Promise(Handler, new Pending());
		}

		// Transformation and flow control

		/**
		 * Transform this promise's fulfillment value, returning a new Promise
		 * for the transformed result.  If the promise cannot be fulfilled, onRejected
		 * is called with the reason.  onProgress *may* be called with updates toward
		 * this promise's fulfillment.
		 * @param {function=} onFulfilled fulfillment handler
		 * @param {function=} onRejected rejection handler
		 * @deprecated @param {function=} onProgress progress handler
		 * @return {Promise} new promise
		 */
		Promise.prototype.then = function(onFulfilled, onRejected) {
			var parent = this._handler;
			var state = parent.join().state();

			if ((typeof onFulfilled !== 'function' && state > 0) ||
				(typeof onRejected !== 'function' && state < 0)) {
				// Short circuit: value will not change, simply share handler
				return new this.constructor(Handler, parent);
			}

			var p = this._beget();
			var child = p._handler;

			parent.chain(child, parent.receiver, onFulfilled, onRejected,
					arguments.length > 2 ? arguments[2] : void 0);

			return p;
		};

		/**
		 * If this promise cannot be fulfilled due to an error, call onRejected to
		 * handle the error. Shortcut for .then(undefined, onRejected)
		 * @param {function?} onRejected
		 * @return {Promise}
		 */
		Promise.prototype['catch'] = function(onRejected) {
			return this.then(void 0, onRejected);
		};

		/**
		 * Creates a new, pending promise of the same type as this promise
		 * @private
		 * @returns {Promise}
		 */
		Promise.prototype._beget = function() {
			var parent = this._handler;
			var child = new Pending(parent.receiver, parent.join().context);
			return new this.constructor(Handler, child);
		};

		// Array combinators

		Promise.all = all;
		Promise.race = race;

		/**
		 * Return a promise that will fulfill when all promises in the
		 * input array have fulfilled, or will reject when one of the
		 * promises rejects.
		 * @param {array} promises array of promises
		 * @returns {Promise} promise for array of fulfillment values
		 */
		function all(promises) {
			/*jshint maxcomplexity:8*/
			var resolver = new Pending();
			var pending = promises.length >>> 0;
			var results = new Array(pending);

			var i, h, x, s;
			for (i = 0; i < promises.length; ++i) {
				x = promises[i];

				if (x === void 0 && !(i in promises)) {
					--pending;
					continue;
				}

				if (maybeThenable(x)) {
					h = getHandlerMaybeThenable(x);

					s = h.state();
					if (s === 0) {
						h.fold(settleAt, i, results, resolver);
					} else if (s > 0) {
						results[i] = h.value;
						--pending;
					} else {
						unreportRemaining(promises, i+1, h);
						resolver.become(h);
						break;
					}

				} else {
					results[i] = x;
					--pending;
				}
			}

			if(pending === 0) {
				resolver.become(new Fulfilled(results));
			}

			return new Promise(Handler, resolver);

			function settleAt(i, x, resolver) {
				/*jshint validthis:true*/
				this[i] = x;
				if(--pending === 0) {
					resolver.become(new Fulfilled(this));
				}
			}
		}

		function unreportRemaining(promises, start, rejectedHandler) {
			var i, h, x;
			for(i=start; i<promises.length; ++i) {
				x = promises[i];
				if(maybeThenable(x)) {
					h = getHandlerMaybeThenable(x);

					if(h !== rejectedHandler) {
						h.visit(h, void 0, h._unreport);
					}
				}
			}
		}

		/**
		 * Fulfill-reject competitive race. Return a promise that will settle
		 * to the same state as the earliest input promise to settle.
		 *
		 * WARNING: The ES6 Promise spec requires that race()ing an empty array
		 * must return a promise that is pending forever.  This implementation
		 * returns a singleton forever-pending promise, the same singleton that is
		 * returned by Promise.never(), thus can be checked with ===
		 *
		 * @param {array} promises array of promises to race
		 * @returns {Promise} if input is non-empty, a promise that will settle
		 * to the same outcome as the earliest input promise to settle. if empty
		 * is empty, returns a promise that will never settle.
		 */
		function race(promises) {
			// Sigh, race([]) is untestable unless we return *something*
			// that is recognizable without calling .then() on it.
			if(Object(promises) === promises && promises.length === 0) {
				return never();
			}

			var h = new Pending();
			var i, x;
			for(i=0; i<promises.length; ++i) {
				x = promises[i];
				if (x !== void 0 && i in promises) {
					getHandler(x).visit(h, h.resolve, h.reject);
				}
			}
			return new Promise(Handler, h);
		}

		// Promise internals
		// Below this, everything is @private

		/**
		 * Get an appropriate handler for x, without checking for cycles
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandler(x) {
			if(isPromise(x)) {
				return x._handler.join();
			}
			return maybeThenable(x) ? getHandlerUntrusted(x) : new Fulfilled(x);
		}

		/**
		 * Get a handler for thenable x.
		 * NOTE: You must only call this if maybeThenable(x) == true
		 * @param {object|function|Promise} x
		 * @returns {object} handler
		 */
		function getHandlerMaybeThenable(x) {
			return isPromise(x) ? x._handler.join() : getHandlerUntrusted(x);
		}

		/**
		 * Get a handler for potentially untrusted thenable x
		 * @param {*} x
		 * @returns {object} handler
		 */
		function getHandlerUntrusted(x) {
			try {
				var untrustedThen = x.then;
				return typeof untrustedThen === 'function'
					? new Thenable(untrustedThen, x)
					: new Fulfilled(x);
			} catch(e) {
				return new Rejected(e);
			}
		}

		/**
		 * Handler for a promise that is pending forever
		 * @constructor
		 */
		function Handler() {}

		Handler.prototype.when
			= Handler.prototype.become
			= Handler.prototype.notify
			= Handler.prototype.fail
			= Handler.prototype._unreport
			= Handler.prototype._report
			= noop;

		Handler.prototype._state = 0;

		Handler.prototype.state = function() {
			return this._state;
		};

		/**
		 * Recursively collapse handler chain to find the handler
		 * nearest to the fully resolved value.
		 * @returns {object} handler nearest the fully resolved value
		 */
		Handler.prototype.join = function() {
			var h = this;
			while(h.handler !== void 0) {
				h = h.handler;
			}
			return h;
		};

		Handler.prototype.chain = function(to, receiver, fulfilled, rejected, progress) {
			this.when({
				resolver: to,
				receiver: receiver,
				fulfilled: fulfilled,
				rejected: rejected,
				progress: progress
			});
		};

		Handler.prototype.visit = function(receiver, fulfilled, rejected, progress) {
			this.chain(failIfRejected, receiver, fulfilled, rejected, progress);
		};

		Handler.prototype.fold = function(f, z, c, to) {
			this.visit(to, function(x) {
				f.call(c, z, x, this);
			}, to.reject, to.notify);
		};

		/**
		 * Handler that invokes fail() on any handler it becomes
		 * @constructor
		 */
		function FailIfRejected() {}

		inherit(Handler, FailIfRejected);

		FailIfRejected.prototype.become = function(h) {
			h.fail();
		};

		var failIfRejected = new FailIfRejected();

		/**
		 * Handler that manages a queue of consumers waiting on a pending promise
		 * @constructor
		 */
		function Pending(receiver, inheritedContext) {
			Promise.createContext(this, inheritedContext);

			this.consumers = void 0;
			this.receiver = receiver;
			this.handler = void 0;
			this.resolved = false;
		}

		inherit(Handler, Pending);

		Pending.prototype._state = 0;

		Pending.prototype.resolve = function(x) {
			this.become(getHandler(x));
		};

		Pending.prototype.reject = function(x) {
			if(this.resolved) {
				return;
			}

			this.become(new Rejected(x));
		};

		Pending.prototype.join = function() {
			if (!this.resolved) {
				return this;
			}

			var h = this;

			while (h.handler !== void 0) {
				h = h.handler;
				if (h === this) {
					return this.handler = cycle();
				}
			}

			return h;
		};

		Pending.prototype.run = function() {
			var q = this.consumers;
			var handler = this.join();
			this.consumers = void 0;

			for (var i = 0; i < q.length; ++i) {
				handler.when(q[i]);
			}
		};

		Pending.prototype.become = function(handler) {
			if(this.resolved) {
				return;
			}

			this.resolved = true;
			this.handler = handler;
			if(this.consumers !== void 0) {
				tasks.enqueue(this);
			}

			if(this.context !== void 0) {
				handler._report(this.context);
			}
		};

		Pending.prototype.when = function(continuation) {
			if(this.resolved) {
				tasks.enqueue(new ContinuationTask(continuation, this.handler));
			} else {
				if(this.consumers === void 0) {
					this.consumers = [continuation];
				} else {
					this.consumers.push(continuation);
				}
			}
		};

		Pending.prototype.notify = function(x) {
			if(!this.resolved) {
				tasks.enqueue(new ProgressTask(x, this));
			}
		};

		Pending.prototype.fail = function(context) {
			var c = typeof context === 'undefined' ? this.context : context;
			this.resolved && this.handler.join().fail(c);
		};

		Pending.prototype._report = function(context) {
			this.resolved && this.handler.join()._report(context);
		};

		Pending.prototype._unreport = function() {
			this.resolved && this.handler.join()._unreport();
		};

		/**
		 * Wrap another handler and force it into a future stack
		 * @param {object} handler
		 * @constructor
		 */
		function Async(handler) {
			this.handler = handler;
		}

		inherit(Handler, Async);

		Async.prototype.when = function(continuation) {
			tasks.enqueue(new ContinuationTask(continuation, this));
		};

		Async.prototype._report = function(context) {
			this.join()._report(context);
		};

		Async.prototype._unreport = function() {
			this.join()._unreport();
		};

		/**
		 * Handler that wraps an untrusted thenable and assimilates it in a future stack
		 * @param {function} then
		 * @param {{then: function}} thenable
		 * @constructor
		 */
		function Thenable(then, thenable) {
			Pending.call(this);
			tasks.enqueue(new AssimilateTask(then, thenable, this));
		}

		inherit(Pending, Thenable);

		/**
		 * Handler for a fulfilled promise
		 * @param {*} x fulfillment value
		 * @constructor
		 */
		function Fulfilled(x) {
			Promise.createContext(this);
			this.value = x;
		}

		inherit(Handler, Fulfilled);

		Fulfilled.prototype._state = 1;

		Fulfilled.prototype.fold = function(f, z, c, to) {
			runContinuation3(f, z, this, c, to);
		};

		Fulfilled.prototype.when = function(cont) {
			runContinuation1(cont.fulfilled, this, cont.receiver, cont.resolver);
		};

		var errorId = 0;

		/**
		 * Handler for a rejected promise
		 * @param {*} x rejection reason
		 * @constructor
		 */
		function Rejected(x) {
			Promise.createContext(this);

			this.id = ++errorId;
			this.value = x;
			this.handled = false;
			this.reported = false;

			this._report();
		}

		inherit(Handler, Rejected);

		Rejected.prototype._state = -1;

		Rejected.prototype.fold = function(f, z, c, to) {
			to.become(this);
		};

		Rejected.prototype.when = function(cont) {
			if(typeof cont.rejected === 'function') {
				this._unreport();
			}
			runContinuation1(cont.rejected, this, cont.receiver, cont.resolver);
		};

		Rejected.prototype._report = function(context) {
			tasks.afterQueue(new ReportTask(this, context));
		};

		Rejected.prototype._unreport = function() {
			this.handled = true;
			tasks.afterQueue(new UnreportTask(this));
		};

		Rejected.prototype.fail = function(context) {
			Promise.onFatalRejection(this, context === void 0 ? this.context : context);
		};

		function ReportTask(rejection, context) {
			this.rejection = rejection;
			this.context = context;
		}

		ReportTask.prototype.run = function() {
			if(!this.rejection.handled) {
				this.rejection.reported = true;
				Promise.onPotentiallyUnhandledRejection(this.rejection, this.context);
			}
		};

		function UnreportTask(rejection) {
			this.rejection = rejection;
		}

		UnreportTask.prototype.run = function() {
			if(this.rejection.reported) {
				Promise.onPotentiallyUnhandledRejectionHandled(this.rejection);
			}
		};

		// Unhandled rejection hooks
		// By default, everything is a noop

		// TODO: Better names: "annotate"?
		Promise.createContext
			= Promise.enterContext
			= Promise.exitContext
			= Promise.onPotentiallyUnhandledRejection
			= Promise.onPotentiallyUnhandledRejectionHandled
			= Promise.onFatalRejection
			= noop;

		// Errors and singletons

		var foreverPendingHandler = new Handler();
		var foreverPendingPromise = new Promise(Handler, foreverPendingHandler);

		function cycle() {
			return new Rejected(new TypeError('Promise cycle'));
		}

		// Task runners

		/**
		 * Run a single consumer
		 * @constructor
		 */
		function ContinuationTask(continuation, handler) {
			this.continuation = continuation;
			this.handler = handler;
		}

		ContinuationTask.prototype.run = function() {
			this.handler.join().when(this.continuation);
		};

		/**
		 * Run a queue of progress handlers
		 * @constructor
		 */
		function ProgressTask(value, handler) {
			this.handler = handler;
			this.value = value;
		}

		ProgressTask.prototype.run = function() {
			var q = this.handler.consumers;
			if(q === void 0) {
				return;
			}

			for (var c, i = 0; i < q.length; ++i) {
				c = q[i];
				runNotify(c.progress, this.value, this.handler, c.receiver, c.resolver);
			}
		};

		/**
		 * Assimilate a thenable, sending it's value to resolver
		 * @param {function} then
		 * @param {object|function} thenable
		 * @param {object} resolver
		 * @constructor
		 */
		function AssimilateTask(then, thenable, resolver) {
			this._then = then;
			this.thenable = thenable;
			this.resolver = resolver;
		}

		AssimilateTask.prototype.run = function() {
			var h = this.resolver;
			tryAssimilate(this._then, this.thenable, _resolve, _reject, _notify);

			function _resolve(x) { h.resolve(x); }
			function _reject(x)  { h.reject(x); }
			function _notify(x)  { h.notify(x); }
		};

		function tryAssimilate(then, thenable, resolve, reject, notify) {
			try {
				then.call(thenable, resolve, reject, notify);
			} catch (e) {
				reject(e);
			}
		}

		// Other helpers

		/**
		 * @param {*} x
		 * @returns {boolean} true iff x is a trusted Promise
		 */
		function isPromise(x) {
			return x instanceof Promise;
		}

		/**
		 * Test just enough to rule out primitives, in order to take faster
		 * paths in some code
		 * @param {*} x
		 * @returns {boolean} false iff x is guaranteed *not* to be a thenable
		 */
		function maybeThenable(x) {
			return (typeof x === 'object' || typeof x === 'function') && x !== null;
		}

		function runContinuation1(f, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject(f, h.value, receiver, next);
			Promise.exitContext();
		}

		function runContinuation3(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.become(h);
			}

			Promise.enterContext(h);
			tryCatchReject3(f, x, h.value, receiver, next);
			Promise.exitContext();
		}

		function runNotify(f, x, h, receiver, next) {
			if(typeof f !== 'function') {
				return next.notify(x);
			}

			Promise.enterContext(h);
			tryCatchReturn(f, x, receiver, next);
			Promise.exitContext();
		}

		/**
		 * Return f.call(thisArg, x), or if it throws return a rejected promise for
		 * the thrown exception
		 */
		function tryCatchReject(f, x, thisArg, next) {
			try {
				next.become(getHandler(f.call(thisArg, x)));
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Same as above, but includes the extra argument parameter.
		 */
		function tryCatchReject3(f, x, y, thisArg, next) {
			try {
				f.call(thisArg, x, y, next);
			} catch(e) {
				next.become(new Rejected(e));
			}
		}

		/**
		 * Return f.call(thisArg, x), or if it throws, *return* the exception
		 */
		function tryCatchReturn(f, x, thisArg, next) {
			try {
				next.notify(f.call(thisArg, x));
			} catch(e) {
				next.notify(e);
			}
		}

		function inherit(Parent, Child) {
			Child.prototype = objectCreate(Parent.prototype);
			Child.prototype.constructor = Child;
		}

		function noop() {}

		return Promise;
	};
});
}(typeof define === 'function' && define.amd ? define : function(factory) { module.exports = factory(); }));

},{}],183:[function(require,module,exports){
module.exports={
  "name": "sequins",
  "version": "0.9.3",
  "description": "Mutable sequences and native data structures (Map, Set, List) following the Immutable.js API",
  "author": "conrad@burningpotato.com",
  "license": "MIT",
  "files": [
    "dist/**"
  ],
  "main": "dist/_sequins.js",
  "module": "dist/sequins.mjs",
  "typings": "dist/sequins.d.ts",
  "scripts": {
    "build": "run-s build:*",
    "build:dist": "broccoli build dist --overwrite",
    "build:pages": "gulp --gulpfile ./resources/gulpfile.js default",
    "build:type-tests": "node ./resources/build-type-tests.js",
    "start:pages": "gulp --gulpfile ./resources/gulpfile.js dev",
    "format": "prettier --write \"{src,pages/src,pages/lib,resources}/**/*.js\"",
    "test": "run-p --aggregate-output test:js test:types",
    "test:__i": "run-p test:js test:types:__i",
    "test:js": "jest",
    "test:types": "run-s build:dist test:types:__i",
    "test:types:__i": "run-s build:type-tests test:types:*:__i",
    "test:types:ts": "run-s build:type-tests test:types:ts:__i",
    "test:types:ts:__i": "tsc",
    "test:no-changes": "./resources/check-changes.sh",
    "verify": "run-s format test:no-changes build test:__i"
  },
  "engines": {
    "yarn": "^1.10.1"
  },
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/plugin-syntax-typescript": "^7.2.0",
    "@babel/plugin-transform-runtime": "^7.2.0",
    "@babel/preset-env": "7.2.3",
    "@babel/preset-typescript": "^7.1.0",
    "@types/jest": "^23.3.11",
    "babel-core": "^7.0.0-bridge.0",
    "babel-jest": "^23.6.0",
    "babel-plugin-minify-dead-code-elimination": "^0.5.0",
    "broccoli": "^2.0.0-beta.4",
    "broccoli-babel-transpiler": "^7.0.0",
    "broccoli-cli": "^1.0.0",
    "broccoli-merge-trees": "^3.0.1",
    "broccoli-rollup": "^2.1.1",
    "browser-sync": "2.24.4",
    "browserify": "16.2.2",
    "del": "3.0.0",
    "gulp": "3.9.1",
    "gulp-concat": "2.6.1",
    "gulp-filter": "5.1.0",
    "gulp-header": "2.0.5",
    "gulp-less": "3.5.0",
    "gulp-size": "3.0.0",
    "gulp-sourcemaps": "2.6.4",
    "gulp-uglify": "2.1.0",
    "gulp-util": "3.0.8",
    "immutable": "^4.0.0-rc.10",
    "jest": "^23.6.0",
    "marked": "0.3.19",
    "npm-run-all": "^4.1.5",
    "prettier": "^1.15.3",
    "react": "^0.12.0",
    "react-router": "^0.11.2",
    "react-tools": "0.13.3",
    "recursive-readdir": "^2.2.2",
    "rollup-plugin-babel": "^4.0.2",
    "rollup-plugin-commonjs": "^9.1.6",
    "rollup-plugin-node-resolve": "^3.3.0",
    "run-sequence": "2.2.1",
    "typescript": "3.2.2",
    "vinyl-buffer": "1.0.1",
    "vinyl-source-stream": "2.0.0"
  },
  "dependencies": {
    "@babel/runtime": "^7.0.0",
    "invariant": "^2.2.4",
    "iter-tools": "^6.1.8-next.3",
    "stable": "^0.1.8"
  },
  "resolutions": {
    "babel-core": "7.0.0-bridge.0"
  },
  "jest": {
    "moduleFileExtensions": [
      "js"
    ],
    "setupTestFrameworkScriptFile": "<rootDir>/src/__test__/helpers/framework-setup.js",
    "coveragePathIgnorePatterns": [
      "/node_modules/",
      "/__test__/"
    ]
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/conartist6/sequins.git"
  },
  "keywords": [
    "mutable",
    "immutable",
    "map",
    "set",
    "list",
    "stable",
    "sort",
    "sequence",
    "seq",
    "iter-tools",
    "es6",
    "es2015"
  ],
  "bugs": {
    "url": "https://github.com/conartist6/sequins/issues"
  },
  "homepage": "https://github.com/conartist6/sequins#readme"
}

},{}],184:[function(require,module,exports){
module.exports={"groups":[{"title":"Concrete","members":{"List":{"class":{"isClass":true,"constructor":{"signatures":[{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":24},{"params":[{"name":"collection","type":{"k":1},"optional":true}],"type":{"k":11,"name":"List","args":[{"k":0}]},"line":25},{"typeParams":["T"],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":26}]},"statics":{"isList":{"doc":{"synopsis":"True if the provided value is a List","description":"<!-- runkit:activate\n  { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nList.isList([]); // false\nList.isList(new List()); // true\n```","notes":[]},"signatures":[{"params":[{"name":"maybeList","type":{"k":0}}],"type":{"k":3},"line":39}]},"of":{"doc":{"synopsis":"Creates a new Sequins List containing `values`.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nList.of(1, 2, 3, 4)\n// List [ 1, 2, 3, 4 ]\n```\n\nNote: Values are not altered or converted in any way.\n\n<!-- runkit:activate\n  { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nList.of({x:1}, 2, [3], 4)\n// List [ { x: 1 }, 2, [ 3 ], 4 ]\n```","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":62}]}},"line":79,"doc":{"synopsis":"List is a dense `Indexed` `Collection` backed by a JavaScript array.\nList shares its peformance charactersitics with array too. `get`, `set`,\n`push`, and `pop` are all O(1) on lists. `shift` and `unshift` are O(n).","description":"Unlike a JavaScript Array, there is no distinction between an\n\"unset\" index and an index set to `undefined`. `List#forEach` visits all\nindices from 0 to size, regardless of whether they were explicitly defined.","notes":[]},"typeParams":["T"],"extends":[{"k":11,"name":"Concrete","args":[{"k":4},{"k":10,"param":"T"}]}],"implements":[{"k":11,"name":"Indexed","args":[{"k":10,"param":"T"}]}],"groups":[{"members":{"#size":{"line":83}}},{"title":"Persistent changes","members":{"#set":{"doc":{"synopsis":"Sets `index` to `value`.","description":"`index` may be a negative number, which indexes back from the end of the\nList. `v.set(-1, \"value\")` sets the last item in the List.\n\nIf `index` larger than `size`, the returned List's `size` will be large\nenough to include the `index`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nconst originalList = List([ 0 ]);\n// List [ 0 ]\noriginalList.set(1, 1);\n// List [ 0, 1 ]\noriginalList.set(0, 'overwritten');\n// List [ \"overwritten\" ]\noriginalList.set(2, 2);\n// List [ 0, undefined, 2 ]\n\nnew List().set(50000, 'value').size;\n// 50001\n```","notes":[]},"signatures":[{"params":[{"name":"index","type":{"k":4}},{"name":"value","type":{"k":10,"param":"T"}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":113}]},"#delete":{"doc":{"synopsis":"Removes the value at `index` from the list. Values at indices above\n`index` are shifted down by 1 to fill the position.","description":"This is synonymous with `list.splice(index, 1)`.\n\n`index` may be a negative number, which indexes back from the end of the\nList. `v.delete(-1)` deletes the last item in the List.\n\nNote: `delete` cannot be safely used in IE8\n\n<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 0, 1, 2, 3, 4 ]).delete(0);\n// List [ 1, 2, 3, 4 ]\n```\n","notes":[{"name":"alias","body":"remove"}]},"signatures":[{"params":[{"name":"index","type":{"k":4}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":136}]},"#insert":{"doc":{"synopsis":"Inserts `value` at `index` in the list. Values at indices above\n`index` are shifted over by 1.","description":"This is synonymous with `list.splice(index, 0, value)`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 0, 1, 2, 3, 4 ]).insert(6, 5)\n// List [ 0, 1, 2, 3, 4, 5 ]\n```","notes":[]},"signatures":[{"params":[{"name":"index","type":{"k":4}},{"name":"value","type":{"k":10,"param":"T"}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":153}]},"#clear":{"doc":{"synopsis":"Removes all values from the list.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 1, 2, 3, 4 ]).clear()\n// List []\n```","notes":[]},"signatures":[{"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":166}]},"#push":{"doc":{"synopsis":"Appends `values` to the end of the list.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 1, 2, 3, 4 ]).push(5)\n// List [ 1, 2, 3, 4, 5 ]\n```","notes":[]},"signatures":[{"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":179}]},"#pop":{"doc":{"synopsis":"Removes the last value from the list and returns it.","description":"```js\nnew List([ 1, 2, 3, 4 ]).pop()\n// List[ 1, 2, 3 ]\n```","notes":[]},"signatures":[{"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":189}]},"#unshift":{"doc":{"synopsis":"Inserts `values` at the beginning of the list. Note that this will\nrequire shifting every item in the list, and will take O(n) time.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 2, 3, 4]).unshift(1);\n// List [ 1, 2, 3, 4 ]\n```","notes":[]},"signatures":[{"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":203}]},"#shift":{"doc":{"synopsis":"Removes the first value from the list and returns it. Note that\nthis will require shifting every item in the list, and will take O(n)\ntime.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 0, 1, 2, 3, 4 ]).shift();\n// List [ 1, 2, 3, 4 ]\n```","notes":[]},"signatures":[{"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":218}]},"#setSize":{"doc":{"synopsis":"Sets list's `size`. If `size` is less than the list's size, values at\nhigher indices will be excluded. If `size` is greater than the list's\nsize, newly created indicies will have undefined values.","description":"","notes":[]},"signatures":[{"params":[{"name":"size","type":{"k":4}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":225}]}}},{"title":"Sequence algorithms","members":{"#concat":{"doc":{"synopsis":"Returns a new List with other values or collections concatenated to this one.\n","description":"","notes":[{"name":"alias","body":"merge"}]},"signatures":[{"typeParams":["C"],"params":[{"name":"valuesOrCollections","type":{"k":11,"name":"Array","args":[{"k":14,"types":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"C"}]},{"k":10,"param":"C"}]}]},"varArgs":true}],"type":{"k":11,"name":"List","args":[{"k":14,"types":[{"k":10,"param":"T"},{"k":10,"param":"C"}]}]},"line":234}]},"#map":{"doc":{"synopsis":"Returns a new List with values passed through a\n`mapper` function.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 1, 2 ]).map(x => 10 * x)\n// List [ 10, 20 ]\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":4}},{"name":"iter","type":{"k":12}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"M"}]},"line":249}]},"#flatten":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Collection.flatten"}]},"signatures":[{"params":[{"name":"depth","type":{"k":4},"optional":true}],"type":{"k":11,"name":"List","args":[{"k":0}]},"line":254},{"params":[{"name":"shallow","type":{"k":3},"optional":true}],"type":{"k":11,"name":"List","args":[{"k":0}]},"line":255}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the List, returning a new List.","description":"Similar to `list.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":4}},{"name":"iter","type":{"k":12}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"M"}]},"line":262}]},"#filter":{"doc":{"synopsis":"Returns a new List with only the values for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"index","type":{"k":4}},{"name":"iter","type":{"k":12}}],"type":{"k":3}}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"F"}]},"line":270},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"index","type":{"k":4}},{"name":"iter","type":{"k":12}}],"type":{"k":0}}}],"type":{"k":12},"line":273}]},"#zip":{"doc":{"synopsis":"Returns a List \"zipped\" with the provided collection.","description":"Like `zipWith`, but using the default `zipper`: creating an `Array`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nconst a = new List([ 1, 2, 3 ]);\nconst b = new List([ 4, 5, 6 ]);\nconst c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]\n```","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"List","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":289},{"typeParams":["U","V"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"other2","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"List","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"},{"k":10,"param":"V"}]}]},"line":290},{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"List","args":[{"k":0}]},"line":294}]},"#zipAll":{"doc":{"synopsis":"Returns a List \"zipped\" with the provided collections.","description":"Unlike `zip`, `zipAll` continues zipping until the longest collection is\nexhausted. Missing values from shorter collections are filled with `undefined`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nconst a = new List([ 1, 2 ]);\nconst b = new List([ 3, 4, 5 ]);\nconst c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]\n```\n\nNote: Since zipAll will return a collection as large as the largest\ninput, some results may contain undefined values. TypeScript cannot\naccount for these without cases (as of v2.5).","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"List","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":315},{"typeParams":["U","V"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"other2","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"List","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"},{"k":10,"param":"V"}]}]},"line":316},{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"List","args":[{"k":0}]},"line":320}]},"#zipWith":{"doc":{"synopsis":"Returns a List \"zipped\" with the provided collections by using a\ncustom `zipper` function.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nconst a = new List([ 1, 2, 3 ]);\nconst b = new List([ 4, 5, 6 ]);\nconst c = a.zipWith((a, b) => a + b, b);\n// List [ 5, 7, 9 ]\n```","notes":[]},"signatures":[{"typeParams":["U","Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"otherValue","type":{"k":10,"param":"U"}}],"type":{"k":10,"param":"Z"}}},{"name":"otherCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"Z"}]},"line":336},{"typeParams":["U","V","Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"otherValue","type":{"k":10,"param":"U"}},{"name":"thirdValue","type":{"k":10,"param":"V"}}],"type":{"k":10,"param":"Z"}}},{"name":"otherCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"thirdCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"Z"}]},"line":340},{"typeParams":["Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"any","type":{"k":11,"name":"Array","args":[{"k":0}]},"varArgs":true}],"type":{"k":10,"param":"Z"}}},{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"Z"}]},"line":345}]}}},{"title":"Combination","members":{"#interpose":{"doc":{"synopsis":"Returns a List with `separator` between each item.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew List([ 1, 2, 3 ]).interpose(null);\n// List [ 1, null, 2, null, 3]\n```","notes":[]},"signatures":[{"typeParams":["S"],"params":[{"name":"separator","type":{"k":10,"param":"S"}}],"type":{"k":11,"name":"List","args":[{"k":14,"types":[{"k":10,"param":"S"},{"k":10,"param":"T"}]}]},"line":363}]}}},{"title":"Conversions","members":{"#toJS":{"doc":{"synopsis":"Deeply converts all nested structures to Objects and Arrays.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":0}]},"line":370}]},"#toJSON":{"doc":{"synopsis":"Returns an Array containing the values from the List.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"line":375}]},"#toConcrete":{"signatures":[{"type":{"k":12},"line":377}]},"#toSeq":{"doc":{"synopsis":"Returns an `IndexedSequence` of the values from the List.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":382}]}}}]}},"Map":{"class":{"isClass":true,"constructor":{"signatures":[{"typeParams":["K","V"],"params":[{"name":"entries","type":{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}]}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":396},{"typeParams":["K","V"],"params":[{"name":"collection","type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":397},{"typeParams":["V"],"params":[{"name":"obj","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}}],"type":{"k":11,"name":"Map","args":[{"k":5},{"k":10,"param":"V"}]},"line":398},{"params":[{"name":"entries","type":{"k":1},"optional":true}],"type":{"k":11,"name":"Map","args":[{"k":0},{"k":0}]},"line":399},{"typeParams":["K","V"],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":400}]},"statics":{"isMap":{"doc":{"synopsis":"True if the provided value is a Map","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nMap.isMap({}) // false\nMap.isMap(new Map()) // true\n```","notes":[]},"signatures":[{"params":[{"name":"maybeMap","type":{"k":0}}],"type":{"k":3},"line":413}]}},"line":433,"doc":{"synopsis":"Map is a `Keyed` `Collection` of `[key, value]` tuples with\nO(1) `get` and `set`. Its API is fully compatible with that of\n[JavaScript Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map),\nbut the Sequins Map class delegates to a native Map for storage as\nopposed to extending the native Map class.","description":"Map's keys can be of any type. This allows the use of any value\n(including NaN) as a key. Strict identity is used to evaluate key\nequality. Two similar looking objects, for example, when both used as\nkeys, will store two separate values.","notes":[]},"typeParams":["K","V"],"extends":[{"k":11,"name":"Concrete","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}],"implements":[{"k":11,"name":"Keyed","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}],"groups":[{"members":{"#size":{"line":437}}},{"title":"Persistent changes","members":{"#set":{"doc":{"synopsis":"Sets `key` to `value`. If an equivalent the key already exists in\nthe map, it will be replaced.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nconst originalMap = Map()\nconst newerMap = originalMap.set('key', 'value')\nconst newestMap = newerMap.set('key', 'newer value')\n\noriginalMap\n// Map {}\nnewerMap\n// Map { \"key\": \"value\" }\nnewestMap\n// Map { \"key\": \"newer value\" }\n```","notes":[]},"signatures":[{"params":[{"name":"key","type":{"k":10,"param":"K"}},{"name":"value","type":{"k":10,"param":"V"}}],"type":{"k":12},"line":461}]},"#delete":{"doc":{"synopsis":"Removes `key` and its associated value from the map.","description":"Note: `delete` cannot be safely used in IE8, but is provided to mirror\nthe ES6 collection API.\n\n<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nconst originalMap = Map({\n  key: 'value',\n  otherKey: 'other value'\n})\n// Map { \"key\": \"value\", \"otherKey\": \"other value\" }\noriginalMap.delete('otherKey')\n// Map { \"key\": \"value\" }\n```\n","notes":[{"name":"alias","body":"remove"}]},"signatures":[{"params":[{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":12},"line":484}]},"#clear":{"doc":{"synopsis":"Removes all keys and values from the map.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nnew Map({ key: 'value' }).clear()\n// Map {}\n```","notes":[]},"signatures":[{"type":{"k":12},"line":498}]},"#merge":{"doc":{"synopsis":"Returns a new Map resulting from merging the provided Collections\n(or JS objects) into this Map. In other words, this takes each entry of\neach collection and sets it on this Map.","description":"Note: Values provided to `merge` are shallowly converted before being\nmerged. No nested values are altered.\n\n<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nconst one = new Map({ a: 10, b: 20, c: 30 })\nconst two = new Map({ b: 40, a: 50, d: 60 })\none.merge(two) // Map { \"a\": 50, \"b\": 40, \"c\": 30, \"d\": 60 }\ntwo.merge(one) // Map { \"b\": 20, \"a\": 10, \"d\": 60, \"c\": 30 }\n```\n","notes":[{"name":"alias","body":"concat"}]},"signatures":[{"typeParams":["KC","VC"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"KC"},{"k":10,"param":"VC"}]}]}]},"varArgs":true}],"type":{"k":11,"name":"Map","args":[{"k":14,"types":[{"k":10,"param":"K"},{"k":10,"param":"KC"}]},{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"VC"}]}]},"line":520},{"typeParams":["C"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"C"}}]}]},"varArgs":true}],"type":{"k":11,"name":"Map","args":[{"k":14,"types":[{"k":10,"param":"K"},{"k":5}]},{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"C"}]}]},"line":521}]}}},{"title":"Sequence algorithms","members":{"#map":{"doc":{"synopsis":"Returns a new Map with values passed through a\n`mapper` function.","description":"    new Map({ a: 1, b: 2 }).map(x => 10 * x)\n    // Map { a: 10, b: 20 }","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"M"}]},"line":538}]},"#mapKeys":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Keyed.mapKeys"}]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"key","type":{"k":10,"param":"K"}},{"name":"value","type":{"k":10,"param":"V"}},{"name":"iter","type":{"k":12}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"M"},{"k":10,"param":"V"}]},"line":543}]},"#mapEntries":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Keyed.mapEntries"}]},"signatures":[{"typeParams":["KM","VM"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"entry","type":{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}},{"name":"index","type":{"k":4}},{"name":"iter","type":{"k":12}}],"type":{"k":16,"types":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]}}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]},"line":548}]},"#flatten":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Collection.flatten"}]},"signatures":[{"params":[{"name":"depth","type":{"k":4},"optional":true}],"type":{"k":11,"name":"Map","args":[{"k":0},{"k":0}]},"line":555},{"params":[{"name":"shallow","type":{"k":3},"optional":true}],"type":{"k":11,"name":"Map","args":[{"k":0},{"k":0}]},"line":556}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the Map, returning a new Map.","description":"Similar to `data.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["KM","VM"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12}}],"type":{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]}]}}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]},"line":563}]},"#filter":{"doc":{"synopsis":"Returns a new Map with only the entries for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12}}],"type":{"k":3}}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"F"}]},"line":571},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12}}],"type":{"k":0}}}],"type":{"k":12},"line":574}]},"#flip":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Keyed.flip"}]},"signatures":[{"type":{"k":11,"name":"Map","args":[{"k":10,"param":"V"},{"k":10,"param":"K"}]},"line":579}]}}},{"title":"Conversions","members":{"#toJS":{"doc":{"synopsis":"Deeply converts all nested structures to Objects and Arrays.","description":"","notes":[]},"signatures":[{"type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":0}}]},"line":586}]},"#toJSON":{"doc":{"synopsis":"Returns an Object with the keys (stringified) and values from the Map.","description":"","notes":[]},"signatures":[{"type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]},"line":591}]},"#toConcrete":{"signatures":[{"type":{"k":12},"line":593}]},"#toSeq":{"doc":{"synopsis":"Returns an `KeyedSequence` of the entries from the List.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":598}]}}}]}},"Set":{"class":{"isClass":true,"constructor":{"signatures":[{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":604},{"params":[{"name":"collection","type":{"k":1},"optional":true}],"type":{"k":11,"name":"Set","args":[{"k":0}]},"line":605},{"typeParams":["T"],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":606}]},"statics":{"isSet":{"doc":{"synopsis":"True if the provided value is a Set","description":"","notes":[]},"signatures":[{"params":[{"name":"maybeSet","type":{"k":0}}],"type":{"k":3},"line":611}]},"of":{"doc":{"synopsis":"Creates a new Set containing `values`.","description":"","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":616}]},"fromKeys":{"signatures":[{"typeParams":["T"],"params":[{"name":"iter","type":{"k":11,"name":"Collection","args":[{"k":10,"param":"T"},{"k":0}]}}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":622},{"params":[{"name":"obj","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":0}}]}}],"type":{"k":11,"name":"Set","args":[{"k":5}]},"line":623},{"type":{"k":11,"name":"Set","args":[{"k":0}]},"line":624}]},"union":{"doc":{"synopsis":"`Set.union()` creates a new Set that includes all members present in any\ninput Set.","description":"If an input is an associative iterable, its values are considered the Set.\n\n```js\nconst { Set } = require('immutable')\nconst unioned = Set.union([\n  Set([ 'a', 'b', 'c' ])\n  Set([ 'c', 'a', 't' ])\n])\n// Set [ \"a\", \"b\", \"c\", \"t\"\" ]\n```","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"sets","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}]},"varArgs":true}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":641}]},"intersect":{"doc":{"synopsis":"`Set.intersect()` creates a new Set that includes only members that are\npresent in all input Sets.","description":"If an input is an associative iterable, its values are considered the Set.\n\n```js\nconst { Set } = require('immutable')\nconst intersected = Set.intersect([\n  Set([ 'a', 'b', 'c' ])\n  Set([ 'c', 'a', 't' ])\n])\n// Set [ \"a\", \"c\"\" ]\n```","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"sets","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}]},"varArgs":true}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":658}]}},"line":678,"doc":{"synopsis":"Set is a `Duplicated` `Collection` of unique values with O(1) `add` and `has`.\nIts API is fully compatible with that of\n[JavaScript Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set),\nbut the Sequins Set class delegates to a native Set for storage as\nopposed to extending the native Set class.","description":"When iterating a Set, the entries will be [value, value] tuples.\n\nSet values, like Map keys, may be of any type including other collections\nand NaN.","notes":[]},"typeParams":["T"],"extends":[{"k":11,"name":"Concrete","args":[{"k":10,"param":"T"},{"k":10,"param":"T"}]}],"implements":[{"k":11,"name":"Duplicated","args":[{"k":10,"param":"T"}]}],"groups":[{"members":{"#size":{"line":682}}},{"title":"Persistent changes","members":{"#add":{"doc":{"synopsis":"Adds value to the set.","description":"","notes":[]},"signatures":[{"params":[{"name":"value","type":{"k":10,"param":"T"}}],"type":{"k":12},"line":689}]},"#delete":{"doc":{"synopsis":"Removes value from the set.","description":"Note: `delete` **cannot** be safely used in IE8, use `remove` if\nsupporting old browsers.\n","notes":[{"name":"alias","body":"remove"}]},"signatures":[{"params":[{"name":"value","type":{"k":10,"param":"T"}}],"type":{"k":12},"line":699}]},"#clear":{"doc":{"synopsis":"Clears all keys and values from the set","description":"","notes":[]},"signatures":[{"type":{"k":12},"line":705}]},"#union":{"doc":{"synopsis":"Returns a Set including any value from `collections` that does not already\nexist in this Set.","description":"","notes":[{"name":"alias","body":"merge"},{"name":"alias","body":"concat"}]},"signatures":[{"typeParams":["C"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"C"}]}]},"varArgs":true}],"type":{"k":11,"name":"Set","args":[{"k":14,"types":[{"k":10,"param":"T"},{"k":10,"param":"C"}]}]},"line":713}]},"#intersect":{"doc":{"synopsis":"Returns a Set which has removed any values not also contained\nwithin `collections`.","description":"","notes":[]},"signatures":[{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}]},"varArgs":true}],"type":{"k":12},"line":721}]},"#subtract":{"doc":{"synopsis":"Returns a Set excluding any values contained within `collections`.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Set } = require('sequins');\" }\n-->\n```js\nnew Set([ 1, 2, 3 ]).subtract([1, 3])\n// Set [2]\n```","notes":[]},"signatures":[{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}]},"varArgs":true}],"type":{"k":12},"line":734}]}}},{"title":"Sequence algorithms","members":{"#map":{"doc":{"synopsis":"Returns a new Set with values passed through a\n`mapper` function.","description":"    new Set([1,2]).map(x => 10 * x)\n    // Set [10,20]","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}},{"name":"iter","type":{"k":12}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"M"}]},"line":745}]},"#flatten":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Collection.flatten"}]},"signatures":[{"params":[{"name":"depth","type":{"k":4},"optional":true}],"type":{"k":11,"name":"Set","args":[{"k":0}]},"line":750},{"params":[{"name":"shallow","type":{"k":3},"optional":true}],"type":{"k":11,"name":"Set","args":[{"k":0}]},"line":751}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the Set, returning a new Set.","description":"Similar to `set.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}},{"name":"iter","type":{"k":12}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"M"}]},"line":758}]},"#filter":{"doc":{"synopsis":"Returns a new Set with only the values for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}},{"name":"iter","type":{"k":12}}],"type":{"k":3}}}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"F"}]},"line":764},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}},{"name":"iter","type":{"k":12}}],"type":{"k":0}}}],"type":{"k":12},"line":767}]}}},{"title":"Conversions","members":{"#toJS":{"doc":{"synopsis":"Deeply converts all nested structures to Objects and Arrays.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":0}]},"line":774}]},"#toJSON":{"doc":{"synopsis":"Returns an Array with the values from the Set.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"line":779}]},"#toConcrete":{"signatures":[{"type":{"k":12},"line":781}]},"#toSeq":{"doc":{"synopsis":"Returns a `SetSequence` of the values from the Set.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":786}]}}}]}}}},{"title":"Sequence","members":{"IndexedSequence":{"class":{"isClass":true,"constructor":{"signatures":[{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":794},{"params":[{"name":"collection","type":{"k":1},"optional":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":795},{"typeParams":["T"],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":796}]},"statics":{"of":{"doc":{"synopsis":"Creates a new IndexedSequence containing `values`.","description":"","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":801}]}},"line":818,"doc":{"synopsis":"An IndexedSequence is quite simply an `Indexed` `Sequence`. It represents\nsequential transformations against Array or List-like data as a series of\nchained function calls. The chain of calls will usually be terminated with\n`toList`.","description":"When constructing an IndexedSequence from another data type, keys will be\ndiscarded.","notes":[]},"typeParams":["T"],"extends":[{"k":11,"name":"Sequence","args":[{"k":4},{"k":10,"param":"T"}]}],"implements":[{"k":11,"name":"Indexed","args":[{"k":10,"param":"T"}]}],"groups":[{"title":"Combination","members":{"#concat":{"doc":{"synopsis":"Returns a new IndexedSequence with other collections concatenated to this\none.","description":"","notes":[]},"signatures":[{"typeParams":["C"],"params":[{"name":"valuesOrCollections","type":{"k":11,"name":"Array","args":[{"k":14,"types":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"C"}]},{"k":10,"param":"C"}]}]},"varArgs":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":14,"types":[{"k":10,"param":"T"},{"k":10,"param":"C"}]}]},"line":825}]},"#interpose":{"doc":{"synopsis":"Returns an IndexedSequence with `separator` between each item.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { List } = require('sequins');\" }\n-->\n```js\nnew IndexedSequence([ 1, 2, 3 ]).interpose(null);\n// IndexedSequence [ 1, null, 2, null, 3]\n```","notes":[]},"signatures":[{"typeParams":["S"],"params":[{"name":"separator","type":{"k":10,"param":"S"}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":14,"types":[{"k":10,"param":"S"},{"k":10,"param":"T"}]}]},"line":840}]}}},{"title":"Sequence algorithms","members":{"#map":{"doc":{"synopsis":"Returns a new IndexedSequence with values passed through a\n`mapper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Seq } = require('sequins');\" }\n-->\n```js\nIndexedSequence([ 1, 2 ]).map(x => 10 * x)\n// Seq [ 10, 20 ]\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":4}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"M"}]},"line":856}]},"#tap":{"doc":{"synopsis":"Does not alter the sequence, but allows you to inspect values as they are\ncomptued. Returns the sequence for chaining. Unlike `forEach`, tap does not\nevaluate the sequence.","description":"```js\nconst seq = IndexedSequence([ 1, 2 ]).tap(x => console.log(x))\nArray.from(seq); // logs 1, 2\n```","notes":[]},"signatures":[{"params":[{"name":"fn","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":4}}],"type":{"k":0}}}],"type":{"k":12},"line":868}]},"#flatten":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Collection.flatten"}]},"signatures":[{"params":[{"name":"depth","type":{"k":4},"optional":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":873},{"params":[{"name":"shallow","type":{"k":3},"optional":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":874}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the IndexedSequence, returning an IndexedSequence.","description":"Similar to `seq.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":4}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"M"}]},"line":881}]},"#filter":{"doc":{"synopsis":"Returns a new IndexedSequence with only the values for which the\n`predicate` function returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"index","type":{"k":4}}],"type":{"k":3}}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"F"}]},"line":889},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"index","type":{"k":4}}],"type":{"k":0}}}],"type":{"k":12},"line":892}]},"#zip":{"doc":{"synopsis":"Returns a new IndexedSequence \"zipped\" with the provided collections.","description":"Like `zipWith`, but using the default `zipper`: creating an `Array`.\n\n```js\nconst a = Seq([ 1, 2, 3 ]);\nconst b = Seq([ 4, 5, 6 ]);\nconst c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]\n```","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":905},{"typeParams":["U","V"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"other2","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"},{"k":10,"param":"V"}]}]},"line":906},{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":910}]},"#zipAll":{"doc":{"synopsis":"Returns a new IndexedSequence \"zipped\" with the provided collections.\nContinues until the longest collection is exhausted.","description":"Missing values from shorter collections are filled with `undefined`.\n\n```js\nconst a = Seq([ 1, 2 ]);\nconst b = Seq([ 3, 4, 5 ]);\nconst c = a.zipAll(b); // Seq [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]\n```","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":924},{"typeParams":["U","V"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"other2","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"},{"k":10,"param":"V"}]}]},"line":925},{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":929}]},"#zipWith":{"doc":{"synopsis":"Returns a new IndexedSequence \"zipped\" with the provided collections by\nusing a custom `zipper` function.","description":"```js\nconst a = Seq([ 1, 2, 3 ]);\nconst b = Seq([ 4, 5, 6 ]);\nconst c = a.zipWith((a, b) => a + b, b);\n// Seq [ 5, 7, 9 ]\n```","notes":[]},"signatures":[{"typeParams":["U","Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"otherValue","type":{"k":10,"param":"U"}}],"type":{"k":10,"param":"Z"}}},{"name":"otherCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"Z"}]},"line":942},{"typeParams":["U","V","Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"otherValue","type":{"k":10,"param":"U"}},{"name":"thirdValue","type":{"k":10,"param":"V"}}],"type":{"k":10,"param":"Z"}}},{"name":"otherCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"thirdCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"Z"}]},"line":946},{"typeParams":["Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"any","type":{"k":11,"name":"Array","args":[{"k":0}]},"varArgs":true}],"type":{"k":10,"param":"Z"}}},{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"Z"}]},"line":951}]}}},{"title":"Conversions","members":{"#toConcrete":{"doc":{"synopsis":"Returns a `List` of the sequence's values","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":961}]},"#toSeq":{"doc":{"synopsis":"Returns itself","description":"","notes":[]},"signatures":[{"type":{"k":12},"line":966}]},"#toJS":{"doc":{"synopsis":"Deeply converts this IndexedSequence to equivalent native JavaScript\nArray.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":0}]},"line":972}]},"#toJSON":{"doc":{"synopsis":"Shallowly converts this IndexedSequence to equivalent native JavaScript\nArray.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"line":978}]}}}]}},"KeyedSequence":{"class":{"isClass":true,"constructor":{"signatures":[{"typeParams":["K","V"],"params":[{"name":"entries","type":{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":992},{"typeParams":["K","V"],"params":[{"name":"collection","type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":993},{"typeParams":["V"],"params":[{"name":"obj","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":5},{"k":10,"param":"V"}]},"line":994},{"params":[{"name":"entries","type":{"k":1},"optional":true}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":0},{"k":0}]},"line":995},{"typeParams":["K","V"],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":996}]},"line":1014,"doc":{"synopsis":"A KeyedSequence is, as expected, a `Keyed` `Sequence`. It represents\nsequential transformations on Object or Map-like data as a series of\nchained function calls. Note that a KeyedSequence lacks the key-coalescing\nproperty of a `Map`. Duplicate keys will be eliminated when calling `as(Map)`\nwhich will usually be the last call in the chain.","description":"When constructing a KeyedSequence pass either keyed data or an iterable of\n[K, V] tuples.","notes":[]},"typeParams":["K","V"],"extends":[{"k":11,"name":"Sequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}],"implements":[{"k":11,"name":"Keyed","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}],"groups":[{"members":{"#concat":{"doc":{"synopsis":"Returns a new KeyedSequence with other collections concatenated to this one.","description":"All entries will be present in the resulting KeyedSequence, even if they\nhave the same key.","notes":[]},"signatures":[{"typeParams":["KC","VC"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"KC"},{"k":10,"param":"VC"}]}]}]},"varArgs":true}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":14,"types":[{"k":10,"param":"K"},{"k":10,"param":"KC"}]},{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"VC"}]}]},"line":1021},{"typeParams":["C"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"C"}}]}]},"varArgs":true}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":14,"types":[{"k":10,"param":"K"},{"k":5}]},{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"C"}]}]},"line":1024}]},"#map":{"doc":{"synopsis":"Returns a new KeyedSequence with values passed through a\n`mapper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { KeyedSequence } = require('sequins');\" }\n-->\n```js\nKeyedSequence({ a: 1, b: 2 }).map(x => 10 * x)\n// Seq { \"a\": 10, \"b\": 20 }\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"M"}]},"line":1040}]},"#mapKeys":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Keyed.mapKeys"}]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"key","type":{"k":10,"param":"K"}},{"name":"value","type":{"k":10,"param":"V"}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"M"},{"k":10,"param":"V"}]},"line":1045}]},"#mapEntries":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Keyed.mapEntries"}]},"signatures":[{"typeParams":["KM","VM"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"entry","type":{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}},{"name":"index","type":{"k":4}}],"type":{"k":16,"types":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]}}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]},"line":1050}]},"#tap":{"doc":{"synopsis":"Does not alter the sequence, but allows you to inspect keys and values as\nthey are comptued. Returns the sequence for chaining. Unlike `forEach`, tap\ndoes not evaluate the sequence.","description":"```js\nconst seq = KeyedSequence([[1, 1], [2, 2]]).tap(x => console.log(x))\nArray.from(seq); // logs 1, 2\n```","notes":[]},"signatures":[{"params":[{"name":"fn","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":0}}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1064}]},"#flatten":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Collection.flatten"}]},"signatures":[{"params":[{"name":"depth","type":{"k":4},"optional":true}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":0},{"k":0}]},"line":1069},{"params":[{"name":"shallow","type":{"k":3},"optional":true}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":0},{"k":0}]},"line":1070}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the KeyedSequence, returning a new KeyedSequence.","description":"Similar to `seq.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["KM","VM"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]}]}}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]},"line":1077}]},"#filter":{"doc":{"synopsis":"Returns a new KeyedSequence with only the entries for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":3}}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"F"}]},"line":1085},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":0}}}],"type":{"k":12},"line":1088}]},"#flip":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Keyed.flip"}]},"signatures":[{"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"V"},{"k":10,"param":"K"}]},"line":1093}]}}},{"title":"Conversions","members":{"#toJS":{"doc":{"synopsis":"Deeply converts this KeyedSequence to equivalent native JavaScript Object.","description":"Converts keys to Strings.","notes":[]},"signatures":[{"type":{"k":11,"name":"Object"},"line":1102}]},"#toJSON":{"doc":{"synopsis":"Shallowly converts this KeyedSequence to equivalent native JavaScript Object.","description":"Converts keys to Strings.","notes":[]},"signatures":[{"type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]},"line":1109}]},"#toConcrete":{"doc":{"synopsis":"Returns a `Map` of the entries from this sequence.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1114}]},"#toSeq":{"doc":{"synopsis":"Returns itself","description":"","notes":[]},"signatures":[{"type":{"k":12},"line":1119}]}}}]}},"SetSequence":{"class":{"isClass":true,"constructor":{"signatures":[{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":1125},{"params":[{"name":"collection","type":{"k":1},"optional":true}],"type":{"k":11,"name":"SetSequence","args":[{"k":0}]},"line":1126},{"typeParams":["T"],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":1127}]},"statics":{"of":{"doc":{"synopsis":"Creates a new SetSequence containing `values`.","description":"","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":1132}]}},"line":1151,"doc":{"synopsis":"A SetSequence is a `Duplicated` `Sequence`. It represents sequntial\ntransformations on Set-like data as a series of chained function calls.\nNote that a SetSequence is allowed to contain duplicate values. Such\nduplicates will be eliminated when using `as(Set)` or a similar method to\nconvert back to a concrete type after the desired transformations are\nmade.","description":"When constructing a SetSequence from another data type, any associated\nindices or keys are discareded.","notes":[]},"typeParams":["T"],"extends":[{"k":11,"name":"Sequence","args":[{"k":10,"param":"T"},{"k":10,"param":"T"}]}],"implements":[{"k":11,"name":"Duplicated","args":[{"k":10,"param":"T"}]}],"groups":[{"members":{"#concat":{"doc":{"synopsis":"Returns a new SetSequence with other collections concatenated to this one.","description":"All entries will be present in the resulting SetSequence, even if they\nare duplicates.","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"U"}]}]},"varArgs":true}],"type":{"k":11,"name":"SetSequence","args":[{"k":14,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":1158}]},"#map":{"doc":{"synopsis":"Returns a new SetSequence with values passed through a\n`mapper` function.","description":"```js\nSetSequence([ 1, 2 ]).map(x => 10 * x)\n// Seq { 10, 20 }\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"M"}]},"line":1169}]},"#tap":{"doc":{"synopsis":"Does not alter the sequence, but allows you to inspect values as they are\ncomptued. Returns the sequence for chaining. Unlike `forEach`, tap does not\nevaluate the sequence.","description":"```js\nconst seq = SetSequence([ 1, 2 ]).tap(x => console.log(x))\nArray.from(seq); // logs 1, 2\n```","notes":[]},"signatures":[{"params":[{"name":"fn","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":0}}}],"type":{"k":12},"line":1181}]},"#flatten":{"doc":{"synopsis":"","description":"","notes":[{"name":"see","body":"Collection.flatten"}]},"signatures":[{"params":[{"name":"depth","type":{"k":4},"optional":true}],"type":{"k":11,"name":"SetSequence","args":[{"k":0}]},"line":1186},{"params":[{"name":"shallow","type":{"k":3},"optional":true}],"type":{"k":11,"name":"SetSequence","args":[{"k":0}]},"line":1187}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the SetSequence, returning a SetSequence.","description":"Similar to `seq.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"M"}]},"line":1194}]},"#filter":{"doc":{"synopsis":"Returns a new SetSequence with only the values for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":3}}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"F"}]},"line":1200},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":0}}}],"type":{"k":12},"line":1203}]}}},{"title":"Conversion","members":{"#toJS":{"doc":{"synopsis":"Deeply converts this SetSequence to equivalent native JavaScript Array.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":0}]},"line":1209}]},"#toJSON":{"doc":{"synopsis":"Shallowly converts this SetSequence to equivalent native JavaScript Array.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"line":1214}]},"#toConcrete":{"doc":{"synopsis":"Returns a `Set` of the values from this sequence.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":1219}]},"#toSeq":{"doc":{"synopsis":"Returns itself","description":"","notes":[]},"signatures":[{"type":{"k":12},"line":1224}]}}}]}},"Seq":{"call":{"signatures":[{"typeParams":["S"],"params":[{"name":"seq","type":{"k":10,"param":"S"}}],"type":{"k":10,"param":"S"},"line":1229},{"typeParams":["K","V"],"params":[{"name":"collection","type":{"k":11,"name":"Keyed","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1230},{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Indexed","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":1231},{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Duplicated","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":1232},{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":1233},{"typeParams":["V"],"params":[{"name":"obj","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":5},{"k":10,"param":"V"}]},"line":1234},{"params":[{"name":"collection","type":{"k":1},"optional":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":1235}]},"doc":{"synopsis":"Seq is a helper function for creating instances of `Sequence`. Given any argument,\nSeq will make a best-effort guess as to the appropriate `Sequence` subtype, and\nwill return an instance of it. The desired Sequence type can be selected by using\none of the nested functions: `Seq.Indexed`, `Seq.Keyed`, or `Seq.Set`.","description":"Seq's best-effort selection of subtypes uses the following logic:\n\n  * If a `Collection` a `Sequence` of the same subtype as the collection\n  * If an Array-like or Iterable, an `IndexedSequence`.\n  * If an Object, a `KeyedSequence`.\n","notes":[{"name":"constructs","body":""}]},"module":{"isSeq":{"call":{"doc":{"synopsis":"True if `maybeSeq` is a Sequence, it is not backed by a concrete\nstructure such as Map, List, or Set.","description":"","notes":[]},"signatures":[{"params":[{"name":"maybeSeq","type":{"k":0}}],"type":{"k":3},"line":1256}]}},"Keyed":{"call":{"doc":{"synopsis":"Factory function for convenient construction of `KeyedSequence` instances\n","description":"","notes":[{"name":"constructs","body":""}]},"signatures":[{"typeParams":["K","V"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1268},{"typeParams":["V"],"params":[{"name":"obj","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":5},{"k":10,"param":"V"}]},"line":1271},{"typeParams":["K","V"],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1272},{"type":{"k":11,"name":"KeyedSequence","args":[{"k":0},{"k":0}]},"line":1273}]}},"Indexed":{"module":{"of":{"call":{"doc":{"synopsis":"Provides an IndexedSequence of the values provided.","description":"","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":1279}]}}},"call":{"doc":{"synopsis":"Factory function for convenient construction of `IndexedSequence` instances\n","description":"","notes":[{"name":"constructs","body":""}]},"signatures":[{"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":1287},{"typeParams":["T"],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":1288},{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":1289}]}},"Set":{"module":{"of":{"call":{"doc":{"synopsis":"Returns a SetSequence of the provided values","description":"","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"values","type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"varArgs":true}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":1295}]}}},"call":{"doc":{"synopsis":"Factory function for convenient construction of `SetSequence` instances\n","description":"","notes":[{"name":"constructs","body":""}]},"signatures":[{"type":{"k":11,"name":"SetSequence","args":[{"k":0}]},"line":1303},{"typeParams":["T"],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":1304},{"typeParams":["T"],"params":[{"name":"collection","type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"T"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":1305}]}}}}}},{"title":"Abstract","members":{"Concrete":{"interface":{"line":1320,"doc":{"synopsis":"Concretes are a type of `Collection` which store their own data\nand have O(1) random access. It is the base class for `List`, `Map`, and\n`Set`.","description":"","notes":[]},"typeParams":["K","V"],"extends":[{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}],"groups":[{"title":"Reading values","members":{"#get":{"doc":{"synopsis":"Returns the value associated with the provided key, or notSetValue if\nthe Collection does not contain this key.","description":"Note: it is possible a key may be associated with an `undefined` value,\nso if `notSetValue` is not provided and this method returns `undefined`,\nthat does not guarantee the key was not found.","notes":[]},"signatures":[{"typeParams":["NSV"],"params":[{"name":"key","type":{"k":10,"param":"K"}},{"name":"notSetValue","type":{"k":10,"param":"NSV"}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"NSV"}]},"line":1331},{"params":[{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":13}]},"line":1332}]},"#has":{"doc":{"synopsis":"True if a key exists within this `Collection`.\nto determine equality","description":"","notes":[]},"signatures":[{"params":[{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":3},"line":1338}]},"#includes":{"doc":{"synopsis":"True if a value exists within this `Collection`.","description":"","notes":[{"name":"alias","body":"contains"}]},"signatures":[{"params":[{"name":"value","type":{"k":10,"param":"V"}}],"type":{"k":3},"line":1344}]},"#first":{"doc":{"synopsis":"In case the `Collection` is not empty returns the first element of the\n`Collection`.\nIn case the `Collection` is empty returns the optional default\nvalue if provided, if no default value is provided returns undefined.","description":"","notes":[]},"signatures":[{"typeParams":["NSV"],"params":[{"name":"notSetValue","type":{"k":10,"param":"NSV"},"optional":true}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"NSV"}]},"line":1353}]}}},{"title":"Reducing a value","members":{"#isEmpty":{"doc":{"synopsis":"Returns true if this Collection includes no values.","description":"For some lazy `Seq`, `isEmpty` might need to iterate to determine\nemptiness. At most one iteration will occur.","notes":[]},"signatures":[{"type":{"k":3},"line":1363}]}}}]}},"Sequence":{"interface":{"line":1416,"doc":{"synopsis":"Sequence is the abstract base class for describing efficient, lazy\ntransformations. Sequences never store their own data, instead they\ndescribe how to compute values (or keys) using a series of transforms against\nsome source data. Sequences are immutable with regards to which transforms\nthey apply, but as their source data is mutable applying the sequence\ntransformations more than once may yield different results if the source data\nhas changed. Sequence subtypes are `IndexedSequence`, `KeyedSequence`,\nand `SetSequence`.","description":"Why are Sequences efficient? Both a sequence and a concrete\nstructure may be transformed through chanined operations like\n`nums.filter(x => x > 0).map(x => x + 1)`. The difference is in how they\nexecute. A concrete structure will do all the mapping (and store it) and\nthen do all the filtering on the mapped results. A sequence executes value\nby value not transform by transform. The filter function will read numbers\nuntil it finds one greater than 0 then the mapper function will\nadd one to it. Only then will a second value be read.\n\nThis method of working gives sequences their laziness, because Sequence\nvalues are consumed and operators applied to them only on demand. Values\ngenerated by a sequence are not implicitly cached or stored. This means\nthat Sequences can even have infintely many items. Take for example this way\nof expressing the concept of \"the first n natural numbers:\"\n\n<!-- runkit:activate\n  { \"preamble\": \"const { Range } = require('sequins');\" }\n-->\n```js\nfunction naturals(n) {\n  return Range(1, Infinity).slice(0, n).as(Array)\n}\nnaturals(3); // [1, 2, 3]\n```\nWe move smoothly past our inability to store a list of infinite size,\nbecause slice will only ever request three values from Range.\n\nBecause seuqences need not cache intermediate states, they shine when\nworking with multiple transforms on lists which may not be infinite but\nare simply very large. In practical terms they allow the programmer to\nreduce memory usage at the cost of CPU cycles.\n\nFinally, Sequence is often used to provide a rich collection API to JavaScript\nObject.\n\n```js\nSeq({ x: 0, y: 1, z: 2 }).map(v => v * 2).as(Object);\n// { x: 0, y: 2, z: 4 }\n```","notes":[]},"typeParams":["K","V"],"extends":[{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}],"groups":[{"title":"Sequence algorithms","members":{"#map":{"doc":{"synopsis":"Returns a new Sequence with values passed through a\n`mapper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Seq } = require('sequins');\" }\n-->\n```js\nSeq([ 1, 2 ]).map(x => 10 * x)\n// Seq [ 10, 20 ]\n```\n\nNote: used only for sets.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Sequence","args":[{"k":10,"param":"K"},{"k":10,"param":"M"}]},"line":1431},{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Sequence","args":[{"k":10,"param":"M"},{"k":10,"param":"M"}]},"line":1447}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the Sequence, returning a Sequence of the same type.","description":"Similar to `seq.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"Sequence","args":[{"k":10,"param":"K"},{"k":10,"param":"M"}]},"line":1454},{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"Sequence","args":[{"k":10,"param":"M"},{"k":10,"param":"M"}]},"line":1455}]},"#filter":{"doc":{"synopsis":"Returns a new Sequence with only the values for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":3}}}],"type":{"k":11,"name":"Sequence","args":[{"k":10,"param":"K"},{"k":10,"param":"F"}]},"line":1461},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":0}}}],"type":{"k":12},"line":1464}]}}}]}},"Collection":{"interface":{"line":1477,"doc":{"synopsis":"Collection is the base type for all Sequins structures. There are two\nfundamental Collection types: Concrete and Sequence. The distinction is that\na `Concrete` stores its data, while a `Sequence` computes it.\nFurthermore, all Collections have keys and values of some kind. Values are\nsimilar everywhere, but the nature of keys is determined by the Collection's\nsubtype. Key may be explicitly declared ( `Keyed` subtype), the index of the\nitem in the collection ( `Indexed` subtype), or just the value again as a\nplaceholder ( `Duplicated` subtype).","description":"","notes":[]},"typeParams":["K","V"],"groups":[{"title":"Sequence algorithms","members":{"#map":{"doc":{"synopsis":"Returns a new Collection of the same type with values passed through a\n`mapper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Collection } = require('sequins');\" }\n-->\n```js\nCollection({ a: 1, b: 2 }).map(x => 10 * x)\n// Sequence { \"a\": 10, \"b\": 20 }\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"M"}]},"line":1492}]},"#filter":{"doc":{"synopsis":"Returns a new Collection of the same type with only the entries for which\nthe `predicate` function returns true.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nnew Map({ a: 1, b: 2, c: 3, d: 4}).filter(x => x % 2 === 0)\n// Map { \"b\": 2, \"d\": 4 }\n```","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":3}}}],"type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"F"}]},"line":1514},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":0}}}],"type":{"k":12},"line":1517}]},"#filterNot":{"doc":{"synopsis":"Returns a new Collection of the same type with only the entries for which\nthe `predicate` function returns false.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nnew Map({ a: 1, b: 2, c: 3, d: 4}).filterNot(x => x % 2 === 0)\n// Map { \"a\": 1, \"c\": 3 }\n```","notes":[]},"signatures":[{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":3}}}],"type":{"k":12},"line":1531}]},"#reverse":{"doc":{"synopsis":"Reverses the order of elements in the collection.","description":"","notes":[]},"signatures":[{"type":{"k":12},"line":1536}]},"#sort":{"doc":{"synopsis":"Stably sorts the elements of the collection by using a `comparator`.","description":"If a `comparator` is not provided, a default comparator uses `<` and `>`.\n\n`comparator(valueA, valueB)`:\n\n  * Returns `0` if the elements should not be swapped.\n  * Returns `-1` (or any negative number) if `valueA` comes before `valueB`\n  * Returns `1` (or any positive number) if `valueA` comes after `valueB`\n  * Is pure, i.e. it must always return the same value for the same pair\n    of values.\n\nWhen sorting collections which have no defined order, their ordered\nequivalents will be returned. e.g. `map.sort()` returns OrderedMap.\n\n<!-- runkit:activate\n  { \"preamble\": \"const { Map } = require('sequins');\" }\n-->\n```js\nnew Map({ \"c\": 3, \"a\": 1, \"b\": 2 }).sort((a, b) => {\n  if (a < b) { return -1; }\n  if (a > b) { return 1; }\n  if (a === b) { return 0; }\n});\n// Map { \"a\": 1, \"b\": 2, \"c\": 3 }\n```","notes":[]},"signatures":[{"params":[{"name":"comparator","type":{"k":9,"params":[{"name":"valueA","type":{"k":10,"param":"V"}},{"name":"valueB","type":{"k":10,"param":"V"}}],"type":{"k":4}},"optional":true}],"type":{"k":12},"line":1566}]},"#sortBy":{"doc":{"synopsis":"Like `sort`, but also accepts a `comparatorValueMapper` which allows for\nsorting by more sophisticated means:","description":"    hitters.sortBy(hitter => hitter.avgHits)","notes":[]},"signatures":[{"typeParams":["C"],"params":[{"name":"comparatorValueMapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":10,"param":"C"}}},{"name":"comparator","type":{"k":9,"params":[{"name":"valueA","type":{"k":10,"param":"C"}},{"name":"valueB","type":{"k":10,"param":"C"}}],"type":{"k":4}},"optional":true}],"type":{"k":12},"line":1574}]},"#groupBy":{"doc":{"synopsis":"Returns a `Keyed` of `Keyeds`, grouped by the return\nvalue of the `grouper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { List, Map } = require('sequins');\" }\n-->\n```js\nconst listOfMaps = new List([\n  new Map({ v: 0 }),\n  new Map({ v: 1 }),\n  new Map({ v: 1 }),\n  new Map({ v: 0 }),\n  new Map({ v: 2 })\n])\nconst groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))\n// Map {\n//   0: List [ new Map{ \"v\": 0 }, new Map { \"v\": 0 } ],\n//   1: List [ new Map{ \"v\": 1 }, new Map { \"v\": 1 } ],\n//   2: List [ new Map{ \"v\": 2 } ],\n// }\n```","notes":[]},"signatures":[{"typeParams":["G"],"params":[{"name":"grouper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":10,"param":"G"}}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"G"},{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}]},"line":1602}]}}},{"title":"Side effects","members":{"#forEach":{"doc":{"synopsis":"The `sideEffect` is executed for every entry in the Collection.\n`forEach` has no return value!","description":"","notes":[]},"signatures":[{"params":[{"name":"sideEffect","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":0}}}],"type":{"k":2},"line":1612}]},"#forSome":{"doc":{"synopsis":"The `sideEffect` is executed for entries in the Collection.","description":"If any call of `sideEffect` returns\n`false`, the iteration will stop. Returns the number of entries iterated\n(including the last iteration which returned false).","notes":[]},"signatures":[{"params":[{"name":"sideEffect","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":0}}}],"type":{"k":4},"line":1621}]}}},{"title":"Creating subsets","members":{"#slice":{"doc":{"synopsis":"Returns a new Collection of the same type representing a portion of this\nCollection from start up to but not including end.","description":"If begin is negative, it is offset from the end of the Collection. e.g.\n`slice(-2)` returns a Collection of the last two entries. If it is not\nprovided the new Collection will begin at the beginning of this Collection.\n\nIf end is negative, it is offset from the end of the Collection. e.g.\n`slice(0, -1)` returns a Collection of everything but the last entry. If\nit is not provided, the new Collection will continue through the end of\nthis Collection.\n\nIf the requested slice is equivalent to the current Collection, then it\nwill return itself.","notes":[]},"signatures":[{"params":[{"name":"begin","type":{"k":4},"optional":true},{"name":"end","type":{"k":4},"optional":true}],"type":{"k":12},"line":1641}]}}},{"title":"Combination","members":{"#concat":{"doc":{"synopsis":"Returns a new Collection of the same type with other values and\ncollection-like concatenated to this one.","description":"For Seqs, all entries will be present in the resulting Sequence, even if they\nhave the same key.","notes":[]},"signatures":[{"params":[{"name":"valuesOrCollections","type":{"k":11,"name":"Array","args":[{"k":0}]},"varArgs":true}],"type":{"k":11,"name":"Collection","args":[{"k":0},{"k":0}]},"line":1652}]},"#flatten":{"doc":{"synopsis":"Flattens nested Collections.","description":"Will deeply flatten the Collection by default, returning a Collection of the\nsame type, but a `depth` can be provided in the form of a number or\nboolean (where true means to shallowly flatten one level). A depth of 0\n(or shallow: false) will deeply flatten.\n\nFlattens only others Collection, not Arrays or Objects.\n\nNote: `flatten(true)` operates on Collection<any, Collection<K, V>> and\nreturns Collection<K, V>","notes":[]},"signatures":[{"params":[{"name":"depth","type":{"k":4},"optional":true}],"type":{"k":11,"name":"Collection","args":[{"k":0},{"k":0}]},"line":1667},{"params":[{"name":"shallow","type":{"k":3},"optional":true}],"type":{"k":11,"name":"Collection","args":[{"k":0},{"k":0}]},"line":1668}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the Collection, returning a Collection of the same type.","description":"Similar to `collection.map(...).flatten(true)`.\nUsed for Dictionaries only.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"M"}]},"line":1675},{"typeParams":["KM","VM"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]}]}}}],"type":{"k":11,"name":"Collection","args":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]},"line":1685}]}}},{"title":"Reducing a value","members":{"#reduce":{"doc":{"synopsis":"Reduces the Collection to a value by calling the `reducer` for every entry\nin the Collection and passing along the reduced value.","description":"If `initialReduction` is not provided, the first item in the\nCollection will be used.\n","notes":[{"name":"see","body":"`Array#reduce`."}]},"signatures":[{"typeParams":["R"],"params":[{"name":"reducer","type":{"k":9,"params":[{"name":"reduction","type":{"k":10,"param":"R"}},{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":10,"param":"R"}}},{"name":"initialReduction","type":{"k":10,"param":"R"}}],"type":{"k":10,"param":"R"},"line":1700},{"typeParams":["R"],"params":[{"name":"reducer","type":{"k":9,"params":[{"name":"reduction","type":{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"R"}]}},{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":10,"param":"R"}}}],"type":{"k":10,"param":"R"},"line":1704}]},"#every":{"doc":{"synopsis":"True if `predicate` returns true for all entries in the Collection.","description":"","notes":[]},"signatures":[{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":3}}}],"type":{"k":3},"line":1709}]},"#some":{"doc":{"synopsis":"True if `predicate` returns true for any entry in the Collection.","description":"","notes":[]},"signatures":[{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":3}}}],"type":{"k":3},"line":1714}]},"#count":{"doc":{"synopsis":"Returns the size of this Collection by iterating through it.","description":"If a `predicate` is provided, returns the count of entries in the\nSequence for which the `predicate` returns true.\n\nNOTE: For concrete collections, this returns size when no args\nare passed. For sequences it must always iterate over the whole\ncollection.","notes":[]},"signatures":[{"type":{"k":4},"line":1726},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":3}}}],"type":{"k":4},"line":1727}]}}},{"title":"Search for value","members":{"#find":{"doc":{"synopsis":"Returns the first value for which the `predicate` returns true.","description":"","notes":[]},"signatures":[{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":3}}},{"name":"notSetValue","type":{"k":10,"param":"V"},"optional":true}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":13}]},"line":1734}]}}},{"title":"Conversions","members":{"#to":{"doc":{"synopsis":"Converts this collection into the type of collection specified as the\n`CollectionConstructor` parameter. If no conversion is neccessary, returns\n the original instance. The easiest way to describe the function is to show\nsome example usages:","description":"```js\nimport {List, Map, Set, IndexedSequence, KeyedSequence, SetSequence, NativeMap, NativeSet} from 'sequins';\nconst list = new List([1, 2, 3]);\nlist.to(Map) // Map{0 => 1, 1 => 2, 2 => 3}\nlist.to(Set) // Set{1, 2, 3}\nlist.to(List) // list\nlist.to(IndexedSequence) // new IndexedSequence(list)\nlist.to(KeyedSequence) // new KeyedSequence(list)\nlist.to(SetSequence) // new SetSequence(list)\nlist.to(NativeMap) // NativeMap{0 => 1, 1 => 2, 2 => 3}\nlist.to(NativeMap) instanceof global.Map // true\nlist.to(NativeSet) // NativeSet{1, 2, 3}\nlist.to(NativeSet) instanceof global.Set // true\nlist.to(Array) // [1, 2, 3]\nlist.to(Object) // {'0': 1, '1': 2, '2': 3}\n```\n\n\nWhile you can find definitive information in the constructor references,\nthe basics are that keys will be discarded when converting from a `Keyed`\nto anything other than a `Keyed`. When converting an `Indexed` to a\n`Keyed`, the indexes will become the keys. When converting a `Duplicated`\nto a keyed, the keys will be the same as the values.\n","notes":[{"name":"pragma","body":"showExampleAboveType"}]},"signatures":[{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]}}]}}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"V"}]},"line":1774},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"KeyedSequence","args":[{"k":0},{"k":0}]}}]}}],"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1775},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"SetSequence","args":[{"k":0}]}}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":1776},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"List","args":[{"k":0}]}}]}}],"type":{"k":11,"name":"List","args":[{"k":10,"param":"V"}]},"line":1777},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"Map","args":[{"k":0},{"k":0}]}}]}}],"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1778},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"Set","args":[{"k":0}]}}]}}],"type":{"k":11,"name":"Set","args":[{"k":10,"param":"V"}]},"line":1779},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"NativeMap","args":[{"k":0},{"k":0}]}}]}}],"type":{"k":11,"name":"NativeMap","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1780},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"NativeSet","args":[{"k":0}]}}]}}],"type":{"k":11,"name":"NativeSet","args":[{"k":10,"param":"V"}]},"line":1781},{"params":[{"name":"Type","type":{"k":6,"members":[{"construct":true,"name":"new","type":{"k":11,"name":"Array","args":[{"k":0}]}}]}}],"type":{"k":11,"name":"Array","args":[{"k":10,"param":"V"}]},"line":1782},{"params":[{"name":"Type","type":{"k":6,"members":[{"name":"prototype","type":{"k":11,"name":"Object"}}]}}],"type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]},"line":1783}]},"#toConcrete":{"doc":{"synopsis":"Converts this collection to `Map` if it is `Keyed`, `List` if it is\n`Indexed`, or `Set` if it is `Duplicated`.\nor","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Concrete","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1790}]},"#toSeq":{"doc":{"synopsis":"Converts this Collection to a Sequence of the same kind (`Indexed`,\n`Keyed`, or `Duplicated`).","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Sequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1796}]},"#toJS":{"doc":{"synopsis":"Deeply converts this Collection to equivalent native JavaScript Array or Object.","description":"`Indexed`, and `Duplicated` become `Array`, while\n`Keyed` becomes `Object`, converting keys to Strings.","notes":[]},"signatures":[{"type":{"k":14,"types":[{"k":11,"name":"Array","args":[{"k":0}]},{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":0}}]}]},"line":1804}]},"#toJSON":{"doc":{"synopsis":"Shallowly converts this Collection to equivalent native JavaScript Array or Object.","description":"`Indexed`, and `Duplicated` become `Array`, while\n`Keyed` becomes `Object`, converting keys to Strings.","notes":[]},"signatures":[{"type":{"k":14,"types":[{"k":11,"name":"Array","args":[{"k":10,"param":"V"}]},{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}]},"line":1812}]}}},{"title":"Iterables","members":{"#keys":{"doc":{"synopsis":"Returns a `SetSequence` of the collection's keys, which is also suitable for\nuse as an es6 iterable over the collection's keys.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"K"}]},"line":1820}]},"#values":{"doc":{"synopsis":"Returns a `SetSequence` of the collection's values, which is also suitable\nfor use as an es6 iterable over the collection's values.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":1826}]},"#entries":{"doc":{"synopsis":"Returns a `KeyedSequence` of the collection's entries, which is also suitable\nfor use as an es6 iterable over the collection's `[key, value]` entry tuples.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1832}]}}}],"constructor":{"signatures":[{"type":{"k":11,"name":"IndexedSequence","args":[{"k":0}]},"line":1774},{"type":{"k":11,"name":"KeyedSequence","args":[{"k":0},{"k":0}]},"line":1775},{"type":{"k":11,"name":"SetSequence","args":[{"k":0}]},"line":1776},{"type":{"k":11,"name":"List","args":[{"k":0}]},"line":1777},{"type":{"k":11,"name":"Map","args":[{"k":0},{"k":0}]},"line":1778},{"type":{"k":11,"name":"Set","args":[{"k":0}]},"line":1779},{"type":{"k":11,"name":"NativeMap","args":[{"k":0},{"k":0}]},"line":1780},{"type":{"k":11,"name":"NativeSet","args":[{"k":0}]},"line":1781},{"type":{"k":11,"name":"Array","args":[{"k":0}]},"line":1782}]}}}}},{"title":"Subtypes","members":{"Keyed":{"interface":{"line":1844,"doc":{"synopsis":"Keyed is used to describe Collections which have explicit keys and values.\nCallbacks for methods in classes implementing Keyed will receive\n`(value, key)` as thier first two arguments.","description":"Iterating over a `Keyed`, yields `[K, V]` tuples.","notes":[]},"typeParams":["K","V"],"extends":[{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}],"groups":[{"members":{"#toJS":{"doc":{"synopsis":"Deeply converts this Keyed collection to equivalent native JavaScript Object.","description":"Converts keys to Strings.","notes":[]},"signatures":[{"type":{"k":11,"name":"Object"},"line":1850}]},"#toJSON":{"doc":{"synopsis":"Shallowly converts this Keyed collection to equivalent native JavaScript Object.","description":"Converts keys to Strings.","notes":[]},"signatures":[{"type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]},"line":1857}]},"#toConcrete":{"doc":{"synopsis":"Converts this collection to a `Map`","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Map","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1862}]},"#toSeq":{"doc":{"synopsis":"Returns KeyedSequence.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"KeyedSequence","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]},"line":1868}]}}},{"title":"Sequence functions","members":{"#flip":{"doc":{"synopsis":"Returns a new Keyed of the same type where the keys and values\nhave been flipped.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { KeyedSequence } = require('sequins');\" }\n-->\n```js\nnew KeyedSequence({ a: 'z', b: 'y' }).flip()\n// KeyedSequence { \"z\": \"a\", \"y\": \"b\" }\n```","notes":[]},"signatures":[{"type":{"k":11,"name":"Keyed","args":[{"k":10,"param":"V"},{"k":10,"param":"K"}]},"line":1884}]},"#concat":{"doc":{"synopsis":"Returns a new Collection with other collections concatenated to this one.","description":"","notes":[]},"signatures":[{"typeParams":["KC","VC"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"KC"},{"k":10,"param":"VC"}]}]}]},"varArgs":true}],"type":{"k":11,"name":"Keyed","args":[{"k":14,"types":[{"k":10,"param":"K"},{"k":10,"param":"KC"}]},{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"VC"}]}]},"line":1889},{"typeParams":["C"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"C"}}]}]},"varArgs":true}],"type":{"k":11,"name":"Keyed","args":[{"k":14,"types":[{"k":10,"param":"K"},{"k":5}]},{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"C"}]}]},"line":1892}]},"#map":{"doc":{"synopsis":"Returns a new Keyed with values passed through a\n`mapper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { KeyedSequence } = require('sequins');\" }\n-->\n```js\nnew KeyedSequence({ a: 1, b: 2 }).map(x => 10 * x)\n// KeyedSequence { \"a\": 10, \"b\": 20 }\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Keyed","args":[{"k":10,"param":"K"},{"k":10,"param":"M"}]},"line":1908}]},"#mapKeys":{"doc":{"synopsis":"Returns a new Keyed of the same type with keys passed through\na `mapper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { KeyedSequence } = require('sequins');\" }\n-->\n<!-- runkit:activate -->\n```js\nnew KeyedSequence({ a: 1, b: 2 }).mapKeys(x => x.toUpperCase())\n// KeyedSequence { \"A\": 1, \"B\": 2 }\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"key","type":{"k":10,"param":"K"}},{"name":"value","type":{"k":10,"param":"V"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Keyed","args":[{"k":10,"param":"M"},{"k":10,"param":"V"}]},"line":1923}]},"#mapEntries":{"doc":{"synopsis":"Returns a new Keyed of the same type with entries\n([key, value] tuples) passed through a `mapper` function.","description":"<!-- runkit:activate\n  { \"preamble\": \"const { KeyedSequence } = require('sequins');\" }\n-->\n```js\nnew KeyedSequence({ a: 1, b: 2 })\n  .mapEntries(([ k, v ]) => [ k.toUpperCase(), v * 2 ])\n// KeyedSequence { \"A\": 2, \"B\": 4 }\n```","notes":[]},"signatures":[{"typeParams":["KM","VM"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"entry","type":{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}},{"name":"index","type":{"k":4}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":16,"types":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]}}}],"type":{"k":11,"name":"Keyed","args":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]},"line":1938}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the Collection, returning a Collection of the same type.","description":"Similar to `collection.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["KM","VM"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":11,"name":"Iterable","args":[{"k":16,"types":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]}]}}}],"type":{"k":11,"name":"Keyed","args":[{"k":10,"param":"KM"},{"k":10,"param":"VM"}]},"line":1947}]},"#filter":{"doc":{"synopsis":"Returns a new Collection with only the values for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":3}}}],"type":{"k":11,"name":"Keyed","args":[{"k":10,"param":"K"},{"k":10,"param":"F"}]},"line":1955},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"V"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"iter","type":{"k":12},"optional":true}],"type":{"k":0}}}],"type":{"k":12},"line":1958}]},"#[Symbol.iterator]":{"signatures":[{"type":{"k":11,"name":"IterableIterator","args":[{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}]},"line":1960}]}}}]}},"Indexed":{"interface":{"line":1975,"doc":{"synopsis":"Indexed is used to describe Collections of values where the collections\nalso track the indexes of those values. Callbacks for methods in classes\nimplementing Indexed will receive `(value, index)` as their first two\narguments.","description":"Iterating over an `Indexed` yields only values, no indexes.\n\nUnlike JavaScript arrays, `Indexed` collections are always dense. \"Unset\"\nindices and `undefined` indices are indistinguishable, and all indices from\n0 to `size` are visited when iterated.","notes":[]},"typeParams":["T"],"extends":[{"k":11,"name":"Collection","args":[{"k":4},{"k":10,"param":"T"}]}],"groups":[{"members":{"#toJS":{"doc":{"synopsis":"Deeply converts this Indexed collection to equivalent native JavaScript Array.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":0}]},"line":1979}]},"#toJSON":{"doc":{"synopsis":"Shallowly converts this Indexed collection to equivalent native JavaScript Array.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"line":1984}]},"#toConcrete":{"doc":{"synopsis":"Converts this collection to a `List`","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"List","args":[{"k":10,"param":"T"}]},"line":1989}]}}},{"title":"Reading values","members":{"#get":{"doc":{"synopsis":"Returns the value associated with the provided index, or notSetValue if\nthe index is beyond the bounds of the Collection.","description":"`index` may be a negative number, which indexes back from the end of the\nCollection. `s.get(-1)` gets the last item in the Collection.","notes":[]},"signatures":[{"typeParams":["NSV"],"params":[{"name":"index","type":{"k":4}},{"name":"notSetValue","type":{"k":10,"param":"NSV"}}],"type":{"k":14,"types":[{"k":10,"param":"T"},{"k":10,"param":"NSV"}]},"line":2000},{"params":[{"name":"index","type":{"k":4}}],"type":{"k":14,"types":[{"k":10,"param":"T"},{"k":13}]},"line":2001}]}}},{"title":"Conversions","members":{"#toSeq":{"doc":{"synopsis":"Returns IndexedSequence.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":2009}]}}},{"title":"Combination","members":{"#zip":{"doc":{"synopsis":"Returns a Collection of the same type \"zipped\" with the provided\ncollections.","description":"Like `zipWith`, but using the default `zipper`: creating an `Array`.\n\n\n<!-- runkit:activate\n  { \"preamble\": \"const { IndexedSequence } = require('sequins');\" }\n-->\n```js\nconst a = new IndexedSequence([ 1, 2, 3 ]);\nconst b = new IndexedSequence([ 4, 5, 6 ]);\nconst c = a.zip(b); // IndexedSequence [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]\n```","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"Indexed","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":2029},{"typeParams":["U","V"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"other2","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"Indexed","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"},{"k":10,"param":"V"}]}]},"line":2030},{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"Indexed","args":[{"k":0}]},"line":2034}]},"#zipAll":{"doc":{"synopsis":"Returns a Collection \"zipped\" with the provided collections.","description":"Unlike `zip`, `zipAll` continues zipping until the longest collection is\nexhausted. Missing values from shorter collections are filled with `undefined`.\n\n<!-- runkit:activate\n  { \"preamble\": \"const { IndexedSequence } = require('sequins');\" }\n-->\n```js\nconst a = new IndexedSequence([ 1, 2 ]);\nconst b = new IndexedSequence([ 3, 4, 5 ]);\nconst c = a.zipAll(b);\n// IndexedSequence [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]\n```","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"Indexed","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":2052},{"typeParams":["U","V"],"params":[{"name":"other","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"other2","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"Indexed","args":[{"k":16,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"},{"k":10,"param":"V"}]}]},"line":2053},{"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"Indexed","args":[{"k":0}]},"line":2057}]},"#zipWith":{"doc":{"synopsis":"Returns a Collection of the same type \"zipped\" with the provided\ncollections by using a custom `zipper` function.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { IndexedSequence } = require('sequins')\" }\n-->\n```js\nconst a = new IndexedSequence([ 1, 2, 3 ]);\nconst b = new IndexedSequence([ 4, 5, 6 ]);\nconst c = a.zipWith((a, b) => a + b, b);\n// IndexedSequence [ 5, 7, 9 ]\n```","notes":[]},"signatures":[{"typeParams":["U","Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"otherValue","type":{"k":10,"param":"U"}}],"type":{"k":10,"param":"Z"}}},{"name":"otherCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}}],"type":{"k":11,"name":"Indexed","args":[{"k":10,"param":"Z"}]},"line":2073},{"typeParams":["U","V","Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"otherValue","type":{"k":10,"param":"U"}},{"name":"thirdValue","type":{"k":10,"param":"V"}}],"type":{"k":10,"param":"Z"}}},{"name":"otherCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"U"}]}},{"name":"thirdCollection","type":{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"Indexed","args":[{"k":10,"param":"Z"}]},"line":2077},{"typeParams":["Z"],"params":[{"name":"zipper","type":{"k":9,"params":[{"name":"any","type":{"k":11,"name":"Array","args":[{"k":0}]},"varArgs":true}],"type":{"k":10,"param":"Z"}}},{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"CollectionLike","args":[{"k":0},{"k":0}]}]},"varArgs":true}],"type":{"k":11,"name":"Indexed","args":[{"k":10,"param":"Z"}]},"line":2082}]}}},{"title":"Sequence algorithms","members":{"#concat":{"doc":{"synopsis":"Returns a new Collection with other collections concatenated to this one.","description":"","notes":[]},"signatures":[{"typeParams":["C"],"params":[{"name":"valuesOrCollections","type":{"k":11,"name":"Array","args":[{"k":14,"types":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"C"}]},{"k":10,"param":"C"}]}]},"varArgs":true}],"type":{"k":11,"name":"Indexed","args":[{"k":14,"types":[{"k":10,"param":"T"},{"k":10,"param":"C"}]}]},"line":2092}]},"#map":{"doc":{"synopsis":"Returns a new Indexed with values passed through a\n`mapper` function.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { IndexedSequence } = require('sequins')\" }\n-->\n```js\nnew IndexedSequence([1,2]).map(x => 10 * x)\n// IndexedSequence [ 1, 2 ]\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":4}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Indexed","args":[{"k":10,"param":"M"}]},"line":2106}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the Collection, returning a Collection of the same type.","description":"Similar to `collection.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":4}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"Indexed","args":[{"k":10,"param":"M"}]},"line":2113}]},"#filter":{"doc":{"synopsis":"Returns a new Collection with only the values for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"index","type":{"k":4}}],"type":{"k":3}}}],"type":{"k":11,"name":"Indexed","args":[{"k":10,"param":"F"}]},"line":2119},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"index","type":{"k":4}}],"type":{"k":0}}}],"type":{"k":12},"line":2122}]},"#[Symbol.iterator]":{"signatures":[{"type":{"k":11,"name":"IterableIterator","args":[{"k":10,"param":"T"}]},"line":2124}]}}}]}},"Duplicated":{"interface":{"line":2135,"doc":{"synopsis":"Duplicated describes collections of values where no index is desired.\nInstead, callbacks for methods in classes implementing Duplicated will\nreceive `(value, value)` as their first two arguments, which is the source\nof the name.","description":"Iterating over a Duplicated yields only values.","notes":[]},"typeParams":["T"],"extends":[{"k":11,"name":"Collection","args":[{"k":10,"param":"T"},{"k":10,"param":"T"}]}],"groups":[{"members":{"#toJS":{"doc":{"synopsis":"Deeply converts this Set collection to equivalent native JavaScript Array.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":0}]},"line":2139}]},"#toJSON":{"doc":{"synopsis":"Shallowly converts this Set collection to equivalent native JavaScript Array.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Array","args":[{"k":10,"param":"T"}]},"line":2144}]},"#toConcrete":{"doc":{"synopsis":"Converts this collection to a `Set`","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"Set","args":[{"k":10,"param":"T"}]},"line":2149}]},"#toSeq":{"doc":{"synopsis":"Returns SetSequence.","description":"","notes":[]},"signatures":[{"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"T"}]},"line":2155}]}}},{"title":"Sequence algorithms","members":{"#concat":{"doc":{"synopsis":"Returns a new Collection with other collections concatenated to this one.","description":"","notes":[]},"signatures":[{"typeParams":["U"],"params":[{"name":"collections","type":{"k":11,"name":"Array","args":[{"k":11,"name":"Iterable","args":[{"k":10,"param":"U"}]}]},"varArgs":true}],"type":{"k":11,"name":"Duplicated","args":[{"k":14,"types":[{"k":10,"param":"T"},{"k":10,"param":"U"}]}]},"line":2162}]},"#map":{"doc":{"synopsis":"Returns a new Duplicated with values passed through a\n`mapper` function.","description":"```\nDuplicated([ 1, 2 ]).map(x => 10 * x)\n// Sequence { 1, 2 }\n```","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":10,"param":"M"}}}],"type":{"k":11,"name":"Duplicated","args":[{"k":10,"param":"M"}]},"line":2173}]},"#flatMap":{"doc":{"synopsis":"Flat-maps the Collection, returning a Collection of the same type.","description":"Similar to `collection.map(...).flatten(true)`.","notes":[]},"signatures":[{"typeParams":["M"],"params":[{"name":"mapper","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":11,"name":"Iterable","args":[{"k":10,"param":"M"}]}}}],"type":{"k":11,"name":"Duplicated","args":[{"k":10,"param":"M"}]},"line":2180}]},"#filter":{"doc":{"synopsis":"Returns a new Collection with only the values for which the `predicate`\nfunction returns true.","description":"","notes":[]},"signatures":[{"typeParams":["F"],"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":3}}}],"type":{"k":11,"name":"Duplicated","args":[{"k":10,"param":"F"}]},"line":2186},{"params":[{"name":"predicate","type":{"k":9,"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"key","type":{"k":10,"param":"T"}}],"type":{"k":0}}}],"type":{"k":12},"line":2189}]},"#[Symbol.iterator]":{"signatures":[{"type":{"k":11,"name":"IterableIterator","args":[{"k":10,"param":"T"}]},"line":2191}]}}}]}}}},{"title":"Construction","members":{"Range":{"call":{"doc":{"synopsis":"Returns a IndexedSequence of numbers from `start` (inclusive) to `end`\n(exclusive), by `step`, where `start` defaults to 0, `step` to 1, and `end` to\ninfinity. When `start` is equal to `end`, returns empty range.","description":"```js\nRange() // [ 0, 1, 2, 3, ... ]\nRange(10) // [ 10, 11, 12, 13, ... ]\nRange(10, 15) // [ 10, 11, 12, 13, 14 ]\nRange(10, 30, 5) // [ 10, 15, 20, 25 ]\nRange(30, 10, 5) // [ 30, 25, 20, 15 ]\nRange(30, 30, 5) // []\n```","notes":[]},"signatures":[{"params":[{"name":"start","type":{"k":4},"optional":true},{"name":"end","type":{"k":4},"optional":true},{"name":"step","type":{"k":4},"optional":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":4}]},"line":2210}]}},"Repeat":{"call":{"doc":{"synopsis":"Returns a IndexedSequence of `value` repeated `times` times. When `times` is\nnot defined, returns an infinite `Sequence` of `value`.","description":"```js\nRepeat('foo') // [ 'foo', 'foo', 'foo', ... ]\nRepeat('bar', 4) // [ 'bar', 'bar', 'bar', 'bar' ]\n```","notes":[]},"signatures":[{"typeParams":["T"],"params":[{"name":"value","type":{"k":10,"param":"T"}},{"name":"times","type":{"k":4},"optional":true}],"type":{"k":11,"name":"IndexedSequence","args":[{"k":10,"param":"T"}]},"line":2225}]}}}},{"title":"Utility","members":{"isCollection":{"call":{"doc":{"synopsis":"True if `maybeCollection` is a Collection, or any of its subclasses.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { isCollection, Map, List } = require('sequins')\" }\n-->\n```js\nisCollection([]); // false\nisCollection({}); // false\nisCollection(new Map()); // true\nisCollection(new List()); // true\n```","notes":[]},"signatures":[{"params":[{"name":"maybeCollection","type":{"k":0}}],"type":{"k":3},"line":2242}]}},"isKeyed":{"call":{"doc":{"synopsis":"True if `maybeKeyed` is a Keyed, or any of its subclasses.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { isKeyed, Map, List } = require('sequins')\" }\n-->\n```js\nisKeyed([]); // false\nisKeyed({}); // false\nisKeyed(new Map()); // true\nisKeyed(new List()); // false\n```","notes":[]},"signatures":[{"params":[{"name":"maybeKeyed","type":{"k":0}}],"type":{"k":3},"line":2259}]}},"isIndexed":{"call":{"doc":{"synopsis":"True if `maybeIndexed` is an Indexed, or any of its subclasses.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { isIndexed, Map, List } = require('sequins')\" }\n-->\n```js\nisIndexed([]); // false\nisIndexed({}); // false\nisIndexed(new Map()); // false\nisIndexed(new List()); // true\nisIndexed(new Set()); // false\n```","notes":[]},"signatures":[{"params":[{"name":"maybeIndexed","type":{"k":0}}],"type":{"k":3},"line":2275}]}},"isAssociative":{"call":{"doc":{"synopsis":"True if `maybeAssociative` is either a Keyed or Indexed Collection.","description":"<!-- runkit:activate\n     { \"preamble\": \"const { isAssociative, Map, List } = require('sequins')\" }\n-->\n```js\nisAssociative([]); // false\nisAssociative({}); // false\nisAssociative(new Map()); // true\nisAssociative(new List()); // true\nisAssociative(new Set()); // false\n```","notes":[]},"signatures":[{"params":[{"name":"maybeAssociative","type":{"k":0}}],"type":{"k":3},"line":2291}]}},"isSeq":{"call":{"doc":{"synopsis":"True if `maybeSeq` is a Sequence.","description":"","notes":[]},"signatures":[{"params":[{"name":"maybeSeq","type":{"k":0}}],"type":{"k":3},"line":2298}]}},"isList":{"call":{"doc":{"synopsis":"True if `maybeList` is a List.","description":"","notes":[]},"signatures":[{"params":[{"name":"maybeList","type":{"k":0}}],"type":{"k":3},"line":2308}]}},"isMap":{"call":{"doc":{"synopsis":"True if `maybeMap` is a Map.","description":"Also true for OrderedMaps.","notes":[]},"signatures":[{"params":[{"name":"maybeMap","type":{"k":0}}],"type":{"k":3},"line":2315}]}},"isSet":{"call":{"doc":{"synopsis":"True if `maybeSet` is a Set.","description":"Also true for OrderedSets.","notes":[]},"signatures":[{"params":[{"name":"maybeSet","type":{"k":0}}],"type":{"k":3},"line":2322}]}},"get":{"call":{"doc":{"synopsis":"Returns the value within the provided collection associated with the\nprovided key, or notSetValue if the key is not defined in the collection.","description":"A functional alternative to `collection.get(key)` which will also work on\nplain Objects and Arrays as an alternative for `collection[key]`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { get } = require('sequins')\" }\n-->\n```js\nget([ 'dog', 'frog', 'cat' ], 2) // 'frog'\nget({ x: 123, y: 456 }, 'x') // 123\nget({ x: 123, y: 456 }, 'z', 'ifNotSet') // 'ifNotSet'\n```","notes":[]},"signatures":[{"typeParams":["K","V"],"params":[{"name":"collection","type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":13}]},"line":2340},{"typeParams":["K","V","NSV"],"params":[{"name":"collection","type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"notSetValue","type":{"k":10,"param":"NSV"}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"NSV"}]},"line":2341},{"typeParams":["V"],"params":[{"name":"collection","type":{"k":11,"name":"Array","args":[{"k":10,"param":"V"}]}},{"name":"key","type":{"k":4}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":13}]},"line":2346},{"typeParams":["V","NSV"],"params":[{"name":"collection","type":{"k":11,"name":"Array","args":[{"k":10,"param":"V"}]}},{"name":"key","type":{"k":4}},{"name":"notSetValue","type":{"k":10,"param":"NSV"}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"NSV"}]},"line":2347},{"typeParams":["C","K"],"params":[{"name":"object","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"notSetValue","type":{"k":0}}],"type":{"k":17,"type":{"k":10,"param":"C"},"index":{"k":10,"param":"K"}},"line":2352},{"typeParams":["V"],"params":[{"name":"collection","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}},{"name":"key","type":{"k":5}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":13}]},"line":2357},{"typeParams":["V","NSV"],"params":[{"name":"collection","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}},{"name":"key","type":{"k":5}},{"name":"notSetValue","type":{"k":10,"param":"NSV"}}],"type":{"k":14,"types":[{"k":10,"param":"V"},{"k":10,"param":"NSV"}]},"line":2361}]}},"has":{"call":{"doc":{"synopsis":"Returns true if the key is defined in the provided collection.","description":"A functional alternative to `collection.has(key)` which will also work with\nplain Objects and Arrays as an alternative for\n`collection.hasOwnProperty(key)`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { has } = require('sequins')\" }\n-->\n```js\nhas([ 'dog', 'frog', 'cat' ], 2) // true\nhas([ 'dog', 'frog', 'cat' ], 5) // false\nhas({ x: 123, y: 456 }, 'x') // true\nhas({ x: 123, y: 456 }, 'z') // false\n```","notes":[]},"signatures":[{"params":[{"name":"collection","type":{"k":11,"name":"Object"}},{"name":"key","type":{"k":0}}],"type":{"k":3},"line":2384}]}},"remove":{"call":{"doc":{"synopsis":"Removes the key at value","description":"A functional alternative to `collection.remove(key)` which will also work\nwith plain Objects and Arrays as an alternative for\n`delete collectionCopy[key]`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { remove } = require('sequins')\" }\n-->\n```js\nconst array = [ 'dog', 'frog', 'cat' ]\nremove(array, 1)\nconsole.log(array) // [ 'dog', 'cat' ]\n\nconst object = { x: 123, y: 456 }\nremove(object, 'x')\nconsole.log(object) // { y: 456 }\n```","notes":[]},"signatures":[{"typeParams":["K","C"],"params":[{"name":"collection","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":10,"param":"C"},"line":2406},{"typeParams":["C"],"params":[{"name":"collection","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":4}}],"type":{"k":10,"param":"C"},"line":2410},{"typeParams":["C","K"],"params":[{"name":"collection","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":10,"param":"C"},"line":2411},{"typeParams":["C","K"],"params":[{"name":"collection","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":10,"param":"K"}}],"type":{"k":10,"param":"C"},"line":2412}]}},"set":{"call":{"doc":{"synopsis":"Sets key to value","description":"A functional alternative to `collection.set(key, value)` which will also\nwork with plain Objects and Arrays as an alternative for\n`collectionCopy[key] = value`.\n\n<!-- runkit:activate\n     { \"preamble\": \"const { set } = require('sequins')\" }\n-->\n```js\nconst array = [ 'dog', 'frog', 'cat' ]\nset(array, 1, 'cow')\nconsole.log(array) // [ 'dog', 'cow', 'cat' ]\n\nconst object = { x: 123, y: 456 }\nset(object, 'x', 789)\nconsole.log(object) // { x: 123, y: 456 }\n```","notes":[]},"signatures":[{"typeParams":["K","V","C"],"params":[{"name":"collection","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"value","type":{"k":10,"param":"V"}}],"type":{"k":10,"param":"C"},"line":2437},{"typeParams":["V","C"],"params":[{"name":"collection","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":4}},{"name":"value","type":{"k":10,"param":"V"}}],"type":{"k":10,"param":"C"},"line":2442},{"typeParams":["C","K"],"params":[{"name":"object","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":10,"param":"K"}},{"name":"value","type":{"k":17,"type":{"k":10,"param":"C"},"index":{"k":10,"param":"K"}}}],"type":{"k":10,"param":"C"},"line":2447},{"typeParams":["V","C"],"params":[{"name":"collection","type":{"k":10,"param":"C"}},{"name":"key","type":{"k":5}},{"name":"value","type":{"k":10,"param":"V"}}],"type":{"k":10,"param":"C"},"line":2448}]}},"keys":{"call":{"doc":{"synopsis":"Gets the keys of a Collection, Object, or Array.","description":"","notes":[]},"signatures":[{"params":[{"name":"shape","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":0}}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":5}]},"line":2457},{"params":[{"name":"shape","type":{"k":11,"name":"Array","args":[{"k":0}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":4}]},"line":2458},{"typeParams":["K"],"params":[{"name":"shape","type":{"k":11,"name":"NativeMap","args":[{"k":10,"param":"K"},{"k":0}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"K"}]},"line":2459},{"typeParams":["V"],"params":[{"name":"shape","type":{"k":11,"name":"NativeSet","args":[{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":2460},{"typeParams":["K"],"params":[{"name":"shape","type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":0}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"K"}]},"line":2461}]}},"values":{"call":{"doc":{"synopsis":"Gets the value of a Collection, Object, or Array.","description":"","notes":[]},"signatures":[{"typeParams":["V"],"params":[{"name":"shape","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":2466},{"typeParams":["V"],"params":[{"name":"shape","type":{"k":11,"name":"Array","args":[{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":2467},{"typeParams":["V"],"params":[{"name":"shape","type":{"k":11,"name":"NativeMap","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":2468},{"typeParams":["V"],"params":[{"name":"shape","type":{"k":11,"name":"NativeSet","args":[{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":2469},{"typeParams":["V"],"params":[{"name":"shape","type":{"k":11,"name":"Collection","args":[{"k":0},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":10,"param":"V"}]},"line":2470}]}},"entries":{"call":{"doc":{"synopsis":"Gets the entries of a Collection, Object, or Array.","description":"","notes":[]},"signatures":[{"typeParams":["V"],"params":[{"name":"shape","type":{"k":6,"members":[{"index":true,"params":[{"name":"key","type":{"k":5}}],"type":{"k":10,"param":"V"}}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":16,"types":[{"k":5},{"k":10,"param":"V"}]}]},"line":2475},{"typeParams":["V"],"params":[{"name":"shape","type":{"k":11,"name":"Array","args":[{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":16,"types":[{"k":4},{"k":10,"param":"V"}]}]},"line":2476},{"typeParams":["K","V"],"params":[{"name":"shape","type":{"k":11,"name":"NativeMap","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}]},"line":2477},{"typeParams":["V"],"params":[{"name":"shape","type":{"k":11,"name":"NativeSet","args":[{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":16,"types":[{"k":10,"param":"V"},{"k":10,"param":"V"}]}]},"line":2478},{"typeParams":["K","V"],"params":[{"name":"shape","type":{"k":11,"name":"Collection","args":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}}],"type":{"k":11,"name":"SetSequence","args":[{"k":16,"types":[{"k":10,"param":"K"},{"k":10,"param":"V"}]}]},"line":2479}]}}}}]}
},{}],185:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var TypeKind = {
  Any: 0,

  Null: 1,
  Void: 2,
  Boolean: 3,
  Number: 4,
  String: 5,
  Object: 6,
  Array: 7,
  Never: 8,
  Function: 9,

  Param: 10,
  Type: 11,

  This: 12,
  Undefined: 13,
  Union: 14,
  Intersection: 15,
  Tuple: 16,
  Indexed: 17,
  Operator: 18
};

module.exports = TypeKind;

},{}],186:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var $__0=    require("../.."),Seq=$__0.Seq;
var getDefByPath = require("./getDefByPath");

function collectMemberGroups(interfaceDef, options = {}) {
  var members = {};

  if (interfaceDef) {
    collectFromDef(interfaceDef);
  }

  var groups = { "": [] };

  if (options.showInGroups) {
    Seq(members).forEach(function(member)  {
      (groups[member.group] || (groups[member.group] = [])).push(member);
    });
  } else {
    groups[""] = Seq(members)
      .sortBy(function(member)  {return member.memberName;})
      .to(Array);
  }

  return groups;

  function collectFromDef(def, name) {
    def.extends &&
      def.extends.forEach(function(e)  {
        var superModule = getDefByPath(e.name);
        var superInterface = superModule && superModule.interface;
        if (superInterface) {
          collectFromDef(superInterface, e.name);
        }
      });

    def.groups &&
      def.groups.forEach(function(g)  {
        Seq(g.members).forEach(function(memberDef, memberName)  {
          collectMember(g.title || "", memberName, memberDef);
        });
      });

    function collectMember(group, memberName, memberDef) {
      var member = members[memberName];
      if (member) {
        if (!member.inherited) {
          member.overrides = { name:name, def:def, memberDef:memberDef };
        }
        if (!member.group && group) {
          member.group = group;
        }
      } else {
        member = {
          group:group,
          memberName: memberName.substr(1),
          memberDef:memberDef
        };
        if (def !== interfaceDef) {
          member.inherited = { name:name, def:def };
        }
        members[memberName] = member;
      }
    }
  }
}

module.exports = collectMemberGroups;

},{"../..":1,"./getDefByPath":187}],187:[function(require,module,exports){
// Note: intentionally using raw defs, not getTypeDefs to avoid circular ref.
var defs = require("../generated/sequins.d.json");

module.exports = function getByPath(path) {
  if (!path) {
    return defs;
  }

  var pathSegments;
  if (typeof path === "string") {
    pathSegments = path.split(".");
  } else {
    pathSegments = path;
  }

  var def = defs.groups.find(function(group)  {return group.members[pathSegments[0]];}).members[
    pathSegments[0]
  ];

  pathSegments.slice(1).forEach(function(part)  {
    def =
      def &&
      def.module &&
      def.module.groups.find(function(group)  {return group.members[part];}).members[part];
  });

  return def;
};

},{"../generated/sequins.d.json":184}],188:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var markdownDocs = require("./markdownDocs");
var defs = require("../generated/sequins.d.json");

markdownDocs(defs);

module.exports = defs;

},{"../generated/sequins.d.json":184,"./markdownDocs":190}],189:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var $__0=    require("../.."),Seq=$__0.Seq;
var marked = require("marked");
var prism = require("./prism");
var collectMemberGroups = require("./collectMemberGroups");
// Note: intentionally using raw defs, not getTypeDefs to avoid circular ref.
var defs = require("../generated/sequins.d.json");

function collectAllMembersForAllTypes(defs) {
  var allMembers = new WeakMap();
  _collectAllMembersForAllTypes(defs);
  return allMembers;
  function _collectAllMembersForAllTypes(defs) {
    Seq(defs).forEach(function(def)  {
      if (def.interface) {
        var groups = collectMemberGroups(def.interface);
        allMembers.set(
          def.interface,
          Seq.Keyed(
            groups[""].map(function(member)  {return [member.memberName, member.memberDef];})
          ).to(Object)
        );
      }
      if (def.module) {
        _collectAllMembersForAllTypes(def.module);
      }
    });
    return allMembers;
  }
}

var allMembers = collectAllMembersForAllTypes(defs);

// functions come before keywords
prism.languages.insertBefore("javascript", "keyword", {
  var: /\b(this)\b/g,
  "block-keyword": /\b(if|else|while|for|function)\b/g,
  primitive: /\b(true|false|null|undefined)\b/g,
  function: prism.languages.function
});

marked.setOptions({
  xhtml: true,
  highlight: function(code)  {return prism.highlight(code, prism.languages.javascript);}
});

var renderer = new marked.Renderer();

const runkitRegExp = /^<!--\s*runkit:activate((.|\n)*)-->(.|\n)*$/;
const runkitContext = { options: "{}", activated: false };

renderer.html = function(text) {
  const result = runkitRegExp.exec(text);

  if (!result) return text;

  runkitContext.activated = true;
  try {
    runkitContext.options = result[1] ? JSON.parse(result[1]) : {};
  } catch (e) {
    runkitContext.options = {};
  }
  return text;
};

renderer.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  const runItButton = runkitContext.activated
    ? '<a class="try-it" data-options="' +
      escape(JSON.stringify(runkitContext.options)) +
      '" onClick="runIt(this)">run it</a>'
    : "";

  runkitContext.activated = false;
  runkitContext.options = "{}";

  return (
    '<code class="codeBlock">' +
    (escaped ? code : escapeCode(code, true)) +
    runItButton +
    "</code>"
  );
};

var METHOD_RX = /^(\w+)(?:[#.](\w+))?(?:\(\))?$/;
var PARAM_RX = /^\w+$/;
var MDN_TYPES = {
  Array: true,
  Object: true,
  JSON: true
};
var MDN_BASE_URL =
  "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/";

renderer.codespan = function(text) {
  return "<code>" + decorateCodeSpan(text, this.options) + "</code>";
};

function decorateCodeSpan(text, options) {
  var context = options.context;

  if (
    context.signatures &&
    PARAM_RX.test(text) &&
    context.signatures.some(
      function(sig)  {return sig.params && sig.params.some(function(param)  {return param.name === text;});}
    )
  ) {
    return '<span class="t param">' + text + "</span>";
  }

  var method = METHOD_RX.exec(text);
  if (method) {
    method = method.slice(1).filter(Boolean);
    if (MDN_TYPES[method[0]]) {
      return (
        '<a href="' + MDN_BASE_URL + method.join("/") + '">' + text + "</a>"
      );
    }
    if (
      context.typePath &&
      !arrEndsWith(context.typePath, method) &&
      !arrEndsWith(context.typePath.slice(0, -1), method)
    ) {
      var path = findPath(context, method);
      if (path) {
        var relPath = context.relPath || "";
        return (
          '<a target="_self" href="' +
          relPath +
          "#/" +
          path.slice(1).join("/") +
          '">' +
          text +
          "</a>"
        );
      }
    }
  }

  if (options.highlight) {
    return options.highlight(unescapeCode(text), prism.languages.javascript);
  }

  return text;
}

function arrEndsWith(arr1, arr2) {
  for (var ii = 1; ii <= arr2.length; ii++) {
    if (arr2[arr2.length - ii] !== arr1[arr1.length - ii]) {
      return false;
    }
  }
  return true;
}

function findPath(context, search) {
  var relative = context.typePath;

  for (var ii = 0; ii <= relative.length; ii++) {
    var path = relative.slice(0, relative.length - ii).concat(search);
    if (
      path.reduce(
        function(def, name) 
          {return def &&
          ((def.module && def.module[name]) ||
            (def.interface &&
              allMembers &&
              allMembers.get(def.interface)[name]) ||
            undefined);},
        { module: defs }
      )
    ) {
      return path;
    }
  }
}

function escapeCode(code) {
  return code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function unescapeCode(code) {
  return code
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function markdown(content, context) {
  context || (context = {});
  return content ? marked(content, { renderer:renderer, context:context }) : content;
}

module.exports = markdown;

},{"../..":1,"../generated/sequins.d.json":184,"./collectMemberGroups":186,"./prism":191,"marked":127}],190:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var $__0=    require("../.."),Seq=$__0.Seq;
var markdown = require("./markdown");

var noteTypesToPreserve = ["alias", "memberof", "pragma"];

function markdownDocs(defs) {
  markdownTypes(defs, []);

  function markdownType(typeDef, typeName, typePath) {
    markdownDoc(typeDef.doc, { typePath:typePath });
    typeDef.call &&
      markdownDoc(typeDef.call.doc, {
        typePath:typePath,
        signatures: typeDef.call.signatures
      });
    var classLikeDoc = typeDef.class || typeDef.interface;
    if (classLikeDoc) {
      markdownDoc(classLikeDoc.doc, { defs:defs, typePath:typePath });
      Seq(classLikeDoc.groups).forEach(function(group) 
        {return Seq(group.members).forEach(function(member, memberName) 
          {return markdownDoc(member.doc, {
            typePath: typePath.concat(memberName.slice(1)),
            signatures: member.signatures
          });}
        );}
      );
    }
    typeDef.module && markdownTypes(typeDef.module, typePath);
    typeDef.class &&
      typeDef.class.statics &&
      markdownTypes(typeDef.class.statics, typePath);
  }

  function markdownTypes(typeDefs, path) {
    if (typeDefs.groups) {
      for (const group of typeDefs.groups) {
        Seq(group.members).forEach(function(memberDef, memberName)  {
          markdownType(memberDef, memberName, path.concat(memberName));
        });
      }
    } else {
      Seq(typeDefs).forEach(function(typeDef, typeName)  {
        markdownType(typeDef, typeName, path.concat(typeName));
      });
    }
  }
}

function markdownDoc(doc, context) {
  if (!doc) {
    return;
  }
  doc.synopsis && (doc.synopsis = markdown(doc.synopsis, context));
  doc.description && (doc.description = markdown(doc.description, context));
  doc.notes &&
    doc.notes.forEach(function(note)  {
      if (!noteTypesToPreserve.includes(note.name)) {
        note.body = markdown(note.body, context);
      }
    });
}

module.exports = markdownDocs;

},{"../..":1,"./markdown":189}],191:[function(require,module,exports){
/* eslint-disable */

/* **********************************************
     Begin prism-core.js
********************************************** */

self =
  typeof window !== "undefined"
    ? window // if in browser
    : typeof WorkerGlobalScope !== "undefined" &&
      self instanceof WorkerGlobalScope
    ? self // if in worker
    : {}; // if in node js

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function() {
  // Private helper vars
  var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;

  var _ = (self.Prism = {
    util: {
      encode: function(tokens) {
        if (tokens instanceof Token) {
          return new Token(
            tokens.type,
            _.util.encode(tokens.content),
            tokens.alias
          );
        } else if (_.util.type(tokens) === "Array") {
          return tokens.map(_.util.encode);
        } else {
          return tokens
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/\u00a0/g, " ");
        }
      },

      type: function(o) {
        return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
      },

      // Deep clone a language definition (e.g. to extend it)
      clone: function(o) {
        var type = _.util.type(o);

        switch (type) {
          case "Object":
            var clone = {};

            for (var key in o) {
              if (o.hasOwnProperty(key)) {
                clone[key] = _.util.clone(o[key]);
              }
            }

            return clone;

          case "Array":
            return o.slice();
        }

        return o;
      }
    },

    languages: {
      extend: function(id, redef) {
        var lang = _.util.clone(_.languages[id]);

        for (var key in redef) {
          lang[key] = redef[key];
        }

        return lang;
      },

      /**
       * Insert a token before another token in a language literal
       * As this needs to recreate the object (we cannot actually insert before keys in object literals),
       * we cannot just provide an object, we need anobject and a key.
       * @param inside The key (or language id) of the parent
       * @param before The key to insert before. If not provided, the function appends instead.
       * @param insert Object with the key/value pairs to insert
       * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
       */
      insertBefore: function(inside, before, insert, root) {
        root = root || _.languages;
        var grammar = root[inside];

        if (arguments.length == 2) {
          insert = arguments[1];

          for (var newToken in insert) {
            if (insert.hasOwnProperty(newToken)) {
              grammar[newToken] = insert[newToken];
            }
          }

          return grammar;
        }

        var ret = {};

        for (var token in grammar) {
          if (grammar.hasOwnProperty(token)) {
            if (token == before) {
              for (var newToken in insert) {
                if (insert.hasOwnProperty(newToken)) {
                  ret[newToken] = insert[newToken];
                }
              }
            }

            ret[token] = grammar[token];
          }
        }

        // Update references in other language definitions
        _.languages.DFS(_.languages, function(key, value) {
          if (value === root[inside] && key != inside) {
            this[key] = ret;
          }
        });

        return (root[inside] = ret);
      },

      // Traverse a language definition with Depth First Search
      DFS: function(o, callback, type) {
        for (var i in o) {
          if (o.hasOwnProperty(i)) {
            callback.call(o, i, o[i], type || i);

            if (_.util.type(o[i]) === "Object") {
              _.languages.DFS(o[i], callback);
            } else if (_.util.type(o[i]) === "Array") {
              _.languages.DFS(o[i], callback, i);
            }
          }
        }
      }
    },

    highlightAll: function(async, callback) {
      var elements = document.querySelectorAll(
        'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
      );

      for (var i = 0, element; (element = elements[i++]); ) {
        _.highlightElement(element, async === true, callback);
      }
    },

    highlightElement: function(element, async, callback) {
      // Find language
      var language,
        grammar,
        parent = element;

      while (parent && !lang.test(parent.className)) {
        parent = parent.parentNode;
      }

      if (parent) {
        language = (parent.className.match(lang) || [, ""])[1];
        grammar = _.languages[language];
      }

      if (!grammar) {
        return;
      }

      // Set language on the element, if not present
      element.className =
        element.className.replace(lang, "").replace(/\s+/g, " ") +
        " language-" +
        language;

      // Set language on the parent, for styling
      parent = element.parentNode;

      if (/pre/i.test(parent.nodeName)) {
        parent.className =
          parent.className.replace(lang, "").replace(/\s+/g, " ") +
          " language-" +
          language;
      }

      var code = element.textContent;

      if (!code) {
        return;
      }

      var env = {
        element: element,
        language: language,
        grammar: grammar,
        code: code
      };

      _.hooks.run("before-highlight", env);

      if (async && self.Worker) {
        var worker = new Worker(_.filename);

        worker.onmessage = function(evt) {
          env.highlightedCode = Token.stringify(JSON.parse(evt.data), language);

          _.hooks.run("before-insert", env);

          env.element.innerHTML = env.highlightedCode;

          callback && callback.call(env.element);
          _.hooks.run("after-highlight", env);
        };

        worker.postMessage(
          JSON.stringify({
            language: env.language,
            code: env.code
          })
        );
      } else {
        env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

        _.hooks.run("before-insert", env);

        env.element.innerHTML = env.highlightedCode;

        callback && callback.call(element);

        _.hooks.run("after-highlight", env);
      }
    },

    highlight: function(text, grammar, language) {
      var tokens = _.tokenize(text, grammar);
      return Token.stringify(_.util.encode(tokens), language);
    },

    tokenize: function(text, grammar, language) {
      var Token = _.Token;

      var strarr = [text];

      var rest = grammar.rest;

      if (rest) {
        for (var token in rest) {
          grammar[token] = rest[token];
        }

        delete grammar.rest;
      }

      tokenloop: for (var token in grammar) {
        if (!grammar.hasOwnProperty(token) || !grammar[token]) {
          continue;
        }

        var patterns = grammar[token];
        patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

        for (var j = 0; j < patterns.length; ++j) {
          var pattern = patterns[j],
            inside = pattern.inside,
            lookbehind = !!pattern.lookbehind,
            lookbehindLength = 0,
            alias = pattern.alias;

          pattern = pattern.pattern || pattern;

          for (var i = 0; i < strarr.length; i++) {
            // Don’t cache length as it changes during the loop

            var str = strarr[i];

            if (strarr.length > text.length) {
              // Something went terribly wrong, ABORT, ABORT!
              break tokenloop;
            }

            if (str instanceof Token) {
              continue;
            }

            pattern.lastIndex = 0;

            var match = pattern.exec(str);

            if (match) {
              if (lookbehind) {
                lookbehindLength = match[1].length;
              }

              var from = match.index - 1 + lookbehindLength,
                match = match[0].slice(lookbehindLength),
                len = match.length,
                to = from + len,
                before = str.slice(0, from + 1),
                after = str.slice(to + 1);

              var args = [i, 1];

              if (before) {
                args.push(before);
              }

              var wrapped = new Token(
                token,
                inside ? _.tokenize(match, inside) : match,
                alias
              );

              args.push(wrapped);

              if (after) {
                args.push(after);
              }

              Array.prototype.splice.apply(strarr, args);
            }
          }
        }
      }

      return strarr;
    },

    hooks: {
      all: {},

      add: function(name, callback) {
        var hooks = _.hooks.all;

        hooks[name] = hooks[name] || [];

        hooks[name].push(callback);
      },

      run: function(name, env) {
        var callbacks = _.hooks.all[name];

        if (!callbacks || !callbacks.length) {
          return;
        }

        for (var i = 0, callback; (callback = callbacks[i++]); ) {
          callback(env);
        }
      }
    }
  });

  var Token = (_.Token = function(type, content, alias) {
    this.type = type;
    this.content = content;
    this.alias = alias;
  });

  Token.stringify = function(o, language, parent) {
    if (typeof o == "string") {
      return o;
    }

    if (Object.prototype.toString.call(o) == "[object Array]") {
      return o
        .map(function(element) {
          return Token.stringify(element, language, o);
        })
        .join("");
    }

    var env = {
      type: o.type,
      content: Token.stringify(o.content, language, parent),
      tag: "span",
      classes: ["token", o.type],
      attributes: {},
      language: language,
      parent: parent
    };

    if (env.type == "comment") {
      env.attributes["spellcheck"] = "true";
    }

    if (o.alias) {
      var aliases = _.util.type(o.alias) === "Array" ? o.alias : [o.alias];
      Array.prototype.push.apply(env.classes, aliases);
    }

    _.hooks.run("wrap", env);

    var attributes = "";

    for (var name in env.attributes) {
      attributes += name + '="' + (env.attributes[name] || "") + '"';
    }

    return (
      "<" +
      env.tag +
      ' class="' +
      env.classes.join(" ") +
      '" ' +
      attributes +
      ">" +
      env.content +
      "</" +
      env.tag +
      ">"
    );
  };

  if (!self.document) {
    if (!self.addEventListener) {
      // in Node.js
      return self.Prism;
    }
    // In worker
    self.addEventListener(
      "message",
      function(evt) {
        var message = JSON.parse(evt.data),
          lang = message.language,
          code = message.code;

        self.postMessage(
          JSON.stringify(_.util.encode(_.tokenize(code, _.languages[lang])))
        );
        self.close();
      },
      false
    );

    return self.Prism;
  }

  // Get current script and highlight
  var script = document.getElementsByTagName("script");

  script = script[script.length - 1];

  if (script) {
    _.filename = script.src;

    if (document.addEventListener && !script.hasAttribute("data-manual")) {
      document.addEventListener("DOMContentLoaded", _.highlightAll);
    }
  }

  return self.Prism;
})();

if (typeof module !== "undefined" && module.exports) {
  module.exports = Prism;
}

/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
  comment: /<!--[\w\W]*?-->/g,
  prolog: /<\?.+?\?>/,
  doctype: /<!DOCTYPE.+?>/,
  cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
  tag: {
    pattern: /<\/?[\w:-]+\s*(?:\s+[\w:-]+(?:=(?:("|')(\\?[\w\W])*?\1|[^\s'">=]+))?\s*)*\/?>/gi,
    inside: {
      tag: {
        pattern: /^<\/?[\w:-]+/i,
        inside: {
          punctuation: /^<\/?/,
          namespace: /^[\w-]+?:/
        }
      },
      "attr-value": {
        pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/gi,
        inside: {
          punctuation: /=|>|"/g
        }
      },
      punctuation: /\/?>/g,
      "attr-name": {
        pattern: /[\w:-]+/g,
        inside: {
          namespace: /^[\w-]+?:/
        }
      }
    }
  },
  entity: /\&#?[\da-z]{1,8};/gi
};

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add("wrap", function(env) {
  if (env.type === "entity") {
    env.attributes["title"] = env.content.replace(/&amp;/, "&");
  }
});

/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
  comment: /\/\*[\w\W]*?\*\//g,
  atrule: {
    pattern: /@[\w-]+?.*?(;|(?=\s*{))/gi,
    inside: {
      punctuation: /[;:]/g
    }
  },
  url: /url\((["']?).*?\1\)/gi,
  selector: /[^\{\}\s][^\{\};]*(?=\s*\{)/g,
  property: /(\b|\B)[\w-]+(?=\s*:)/gi,
  string: /("|')(\\?.)*?\1/g,
  important: /\B!important\b/gi,
  punctuation: /[\{\};:]/g,
  function: /[-a-z0-9]+(?=\()/gi
};

if (Prism.languages.markup) {
  Prism.languages.insertBefore("markup", "tag", {
    style: {
      pattern: /<style[\w\W]*?>[\w\W]*?<\/style>/gi,
      inside: {
        tag: {
          pattern: /<style[\w\W]*?>|<\/style>/gi,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.css
      },
      alias: "language-css"
    }
  });

  Prism.languages.insertBefore(
    "inside",
    "attr-value",
    {
      "style-attr": {
        pattern: /\s*style=("|').+?\1/gi,
        inside: {
          "attr-name": {
            pattern: /^\s*style/gi,
            inside: Prism.languages.markup.tag.inside
          },
          punctuation: /^\s*=\s*['"]|['"]\s*$/,
          "attr-value": {
            pattern: /.+/gi,
            inside: Prism.languages.css
          }
        },
        alias: "language-css"
      }
    },
    Prism.languages.markup.tag
  );
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
  comment: [
    {
      pattern: /(^|[^\\])\/\*[\w\W]*?\*\//g,
      lookbehind: true
    },
    {
      pattern: /(^|[^\\:])\/\/.*?(\r?\n|$)/g,
      lookbehind: true
    }
  ],
  string: /("|')(\\?.)*?\1/g,
  "class-name": {
    pattern: /((?:(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/gi,
    lookbehind: true,
    inside: {
      punctuation: /(\.|\\)/
    }
  },
  keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/g,
  boolean: /\b(true|false)\b/g,
  function: {
    pattern: /[a-z0-9_]+\(/gi,
    inside: {
      punctuation: /\(/
    }
  },
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/g,
  operator: /[-+]{1,2}|!|<=?|>=?|={1,3}|&{1,2}|\|?\||\?|\*|\/|\~|\^|\%/g,
  ignore: /&(lt|gt|amp);/gi,
  punctuation: /[{}[\];(),.:]/g
};

/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend("clike", {
  keyword: /\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/g,
  number: /\b-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?|NaN|-?Infinity)\b/g
});

Prism.languages.insertBefore("javascript", "keyword", {
  regex: {
    pattern: /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\r\n])+\/[gim]{0,3}(?=\s*($|[\r\n,.;})]))/g,
    lookbehind: true
  }
});

if (Prism.languages.markup) {
  Prism.languages.insertBefore("markup", "tag", {
    script: {
      pattern: /<script[\w\W]*?>[\w\W]*?<\/script>/gi,
      inside: {
        tag: {
          pattern: /<script[\w\W]*?>|<\/script>/gi,
          inside: Prism.languages.markup.tag.inside
        },
        rest: Prism.languages.javascript
      },
      alias: "language-javascript"
    }
  });
}

/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function() {
  if (!self.Prism || !self.document || !document.querySelector) {
    return;
  }

  var Extensions = {
    js: "javascript",
    html: "markup",
    svg: "markup",
    xml: "markup",
    py: "python",
    rb: "ruby"
  };

  Array.prototype.slice
    .call(document.querySelectorAll("pre[data-src]"))
    .forEach(function(pre) {
      var src = pre.getAttribute("data-src");
      var extension = (src.match(/\.(\w+)$/) || [, ""])[1];
      var language = Extensions[extension] || extension;

      var code = document.createElement("code");
      code.className = "language-" + language;

      pre.textContent = "";

      code.textContent = "Loading…";

      pre.appendChild(code);

      var xhr = new XMLHttpRequest();

      xhr.open("GET", src, true);

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status < 400 && xhr.responseText) {
            code.textContent = xhr.responseText;

            Prism.highlightElement(code);
          } else if (xhr.status >= 400) {
            code.textContent =
              "✖ Error " +
              xhr.status +
              " while fetching file: " +
              xhr.statusText;
          } else {
            code.textContent = "✖ Error: File does not exist or is empty";
          }
        }
      };

      xhr.send(null);
    });
})();

},{}],192:[function(require,module,exports){
(function (global){
global.runIt = function runIt(button) {
  if (!global.RunKit) return;

  var container = document.createElement("div");
  var codeElement = button.parentNode;
  var parent = codeElement.parentNode;

  parent.insertBefore(container, codeElement);
  parent.removeChild(codeElement);
  codeElement.removeChild(button);

  const options = JSON.parse(unescape(button.dataset.options));

  function withCorrectVersion(code) {
    return code;
    // return code.replace(
    //   /require\('sequins'\)/g,
    //   "require('sequins@VERSION')"
    // );
  }

  global.RunKit.createNotebook({
    element: container,
    nodeVersion: options.nodeVersion || "*",
    preamble: withCorrectVersion(
      "const assert = (" +
        makeAssert +
        ")(require('sequins'));" +
        (options.preamble || "")
    ),
    source: withCorrectVersion(
      codeElement.textContent.replace(/\n(>[^\n]*\n?)+$/g, "")
    ),
    minHeight: "52px",
    onLoad: function(notebook) {
      notebook.evaluate();
    }
  });
};

function makeAssert(Sequins) {
  var isCollection = Sequins.isCollection;
  var html = ("\n    <style>\n      * {\n        font-size: 14px;\n        font-family: monospace;\n      }\n\n      code {\n        font-family: monospace;\n        color: #4183C4;\n        text-decoration: none;\n        text-decoration: none;\n        background: rgba(65, 131, 196, 0.1);\n        border-radius: 2px;\n        padding: 2px;\n    }\n\n      .success {\n        color: rgba(84,184,54,1.0);\n      }\n\n      .success:before {\n        content: \"✅\";\n      }\n\n      .failure {\n        color: rgba(220,47,33,1.0);\n      }\n\n      .failure i {\n        color: rgba(210,44,31,1.0);\n      }\n\n      .failure:before {\n        content: \"❌\";\n      }\n    </style>"



































);

  function compare(lhs, rhs, same, identical) {
    var both = !identical && isCollection(lhs) && isCollection(rhs);

    if (both) return lhs.equals(rhs);

    return lhs === rhs;
  }

  function message(lhs, rhs, same, identical) {
    var result = compare(lhs, rhs, same, identical);
    var comparison = result
      ? identical
        ? "strict equal to"
        : "does equal"
      : identical
      ? "not strict equal to"
      : "does not equal";
    var className = result === same ? "success" : "failure";
    var lhsString = isCollection(lhs) ? lhs + "" : JSON.stringify(lhs);
    var rhsString = isCollection(rhs) ? rhs + "" : JSON.stringify(rhs);

    return (html += ("\n      <span class=\"" + 
className + "\">\n        <code>" + 
lhsString + "</code>\n        " + 
comparison + "\n        <code>" + 
rhsString + "</code>\n      </span><br/>"
));
  }

  function equal(lhs, rhs) {
    return message(lhs, rhs, true);
  }

  function notEqual(lhs, rhs) {
    return message(lhs, rhs, false);
  }

  function strictEqual(lhs, rhs) {
    return message(lhs, rhs, true, true);
  }

  function notStrictEqual(lhs, rhs) {
    return message(lhs, rhs, false, true);
  }

  return { equal:equal, notEqual:notEqual, strictEqual:strictEqual, notStrictEqual:notStrictEqual };
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],193:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var CSSCore = require("react/lib/CSSCore");
var Router = require("react-router");
var $__0=    require("../../../.."),Seq=$__0.Seq;
var TypeKind = require("../../../lib/TypeKind");
var defs = require("../../../lib/getTypeDefs");

var InterfaceDef = React.createClass({displayName: "InterfaceDef",
  render:function() {
    const $__0=     this.props,name=$__0.name,def=$__0.def;

    return (
      React.createElement("span", {className: "t interfaceDef"}, 
        React.createElement("span", {className: "t keyword"}, def.isClass ? "class" : "type", " "), 
        React.createElement("span", {className: "t typeName"}, name), 
        def.typeParams && [
          "<",
          Seq(def.typeParams)
            .map(function(t, k)  
              {return React.createElement("span", {className: "t typeParam", key: k}, 
                t
              );}
            )
            .interpose(", ")
            .to(Array),
          ">"
        ], 
        def.extends && def.extends.length
          ? [
              React.createElement("span", {className: "t keyword"}, " extends "),
              Seq(def.extends)
                .map(function(e, i)  {return React.createElement(TypeDef, {key: i, type: e});})
                .interpose(", ")
                .to(Array)
            ]
          : null, 
        def.implements && def.implements.length
          ? [
              React.createElement("span", {className: "t keyword"}, " implements "),
              Seq(def.implements)
                .map(function(e, i)  {return React.createElement(TypeDef, {key: i, type: e});})
                .interpose(", ")
                .to(Array)
            ]
          : null, 
        def.isClass && (
          React.createElement("span", null, 
            " {", " ", React.createElement("br", null), 
            Seq(def.constructor.signatures)
              .map(function(constructSig, i)  
                {return React.createElement(CallSigDef, {name: "constructor", callSig: constructSig, key: i});}
              )
              .concat([null])
              .interpose(React.createElement("br", null))
              .to(Array), 
            "}"
          )
        )
      )
    );
  }
});

exports.InterfaceDef = InterfaceDef;

var CallSigDef = React.createClass({displayName: "CallSigDef",
  render:function() {
    var info = this.props.info;
    var module = this.props.module;
    var name = this.props.name;
    var callSig = this.props.callSig || {};

    var shouldWrap = callSigLength(info, module, name, callSig) > 80;

    return (
      React.createElement("span", {className: "t callSig"}, 
        module && [React.createElement("span", {className: "t fnQualifier"}, module), "."], 
        React.createElement("span", {className: "t fnName"}, name), 
        callSig.typeParams && [
          "<",
          Seq(callSig.typeParams)
            .map(function(t)  {return React.createElement("span", {className: "t typeParam"}, t);})
            .interpose(", ")
            .to(Array),
          ">"
        ], 
        "(", 
        callSig && functionParams(info, callSig.params, shouldWrap), 
        ")", 
        callSig.type && [": ", React.createElement(TypeDef, {info: info, type: callSig.type})]
      )
    );
  }
});

exports.CallSigDef = CallSigDef;

var TypeDef = React.createClass({displayName: "TypeDef",
  render:function() {
    var info = this.props.info;
    var type = this.props.type;
    var prefix = this.props.prefix;
    switch (type.k) {
      case TypeKind.Never:
        return this.wrap("primitive", "never");
      case TypeKind.Null:
        return this.wrap("primitive", "null");
      case TypeKind.Void:
        return this.wrap("primitive", "void");
      case TypeKind.Any:
        return this.wrap("primitive", "any");
      case TypeKind.This:
        return this.wrap("primitive", "this");
      case TypeKind.Undefined:
        return this.wrap("primitive", "undefined");
      case TypeKind.Boolean:
        return this.wrap("primitive", "boolean");
      case TypeKind.Number:
        return this.wrap("primitive", "number");
      case TypeKind.String:
        return this.wrap("primitive", "string");
      case TypeKind.Union:
        return this.wrap("union", [
          Seq(type.types)
            .map(function(t)  {return React.createElement(TypeDef, {info: info, type: t});})
            .interpose(" | ")
            .to(Array)
        ]);
      case TypeKind.Intersection:
        return this.wrap("intersection", [
          Seq(type.types)
            .map(function(t)  {return React.createElement(TypeDef, {info: info, type: t});})
            .interpose(" & ")
            .to(Array)
        ]);
      case TypeKind.Tuple:
        return this.wrap("tuple", [
          "[",
          Seq(type.types)
            .map(function(t)  {return React.createElement(TypeDef, {info: info, type: t});})
            .interpose(", ")
            .to(Array),
          "]"
        ]);
      case TypeKind.Object:
        return this.wrap("object", [
          "{",
          Seq(type.members)
            .map(function(t)  {return React.createElement(MemberDef, {member: t});})
            .interpose(", ")
            .to(Array),
          "}"
        ]);
      case TypeKind.Indexed:
        return this.wrap("indexed", [
          React.createElement(TypeDef, {info: info, type: type.type}),
          "[",
          React.createElement(TypeDef, {info: info, type: type.index}),
          "]"
        ]);
      case TypeKind.Operator:
        return this.wrap("operator", [
          this.wrap("primitive", type.operator),
          " ",
          React.createElement(TypeDef, {info: info, type: type.type})
        ]);
      case TypeKind.Array:
        return this.wrap("array", [
          React.createElement(TypeDef, {info: info, type: type.type}),
          "[]"
        ]);
      case TypeKind.Function:
        var shouldWrap = (prefix || 0) + funcLength(info, type) > 78;
        return this.wrap("function", [
          type.typeParams && [
            "<",
            Seq(type.typeParams)
              .map(function(t, k)  
                {return React.createElement("span", {className: "t typeParam", key: k}, 
                  t
                );}
              )
              .interpose(", ")
              .to(Array),
            ">"
          ],
          "(",
          functionParams(info, type.params, shouldWrap),
          ") => ",
          React.createElement(TypeDef, {info: info, type: type.type})
        ]);
      case TypeKind.Param:
        return info && info.propMap[info.defining + "<" + type.param] ? (
          React.createElement(TypeDef, {type: info.propMap[info.defining + "<" + type.param]})
        ) : (
          this.wrap("typeParam", type.param)
        );
      case TypeKind.Type:
        var def = defs[type.name];

        var typeNameElement = React.createElement("span", {className: "t typeName"}, type.name);
        if (def) {
          typeNameElement = (
            React.createElement(Router.Link, {to: "/" + type.name}, typeNameElement)
          );
        }
        return this.wrap("type", [
          typeNameElement,
          type.args && [
            "<",
            Seq(type.args)
              .map(function(a)  {return React.createElement(TypeDef, {info: info, type: a});})
              .interpose(", ")
              .to(Array),
            ">"
          ]
        ]);
    }
    throw new Error("Unknown kind " + type.k);
  },

  mouseOver:function(event) {
    CSSCore.addClass(this.getDOMNode(), "over");
    event.stopPropagation();
  },

  mouseOut:function() {
    CSSCore.removeClass(this.getDOMNode(), "over");
  },

  wrap:function(className, child) {
    return (
      React.createElement("span", {
        className: "t " + className, 
        onMouseOver: this.mouseOver, 
        onFocus: this.mouseOver, 
        onMouseOut: this.mouseOut, 
        onBlur: this.mouseOut
      }, 
        child
      )
    );
  }
});

exports.TypeDef = TypeDef;

var MemberDef = React.createClass({displayName: "MemberDef",
  render:function() {
    var module = this.props.module;
    var member = this.props.member;
    return (
      React.createElement("span", {className: "t member"}, 
        module && [React.createElement("span", {className: "t fnQualifier"}, module), "."], 
        member.index ? (
          ["[", functionParams(null, member.params), "]"]
        ) : (
          React.createElement("span", {className: "t memberName"}, member.name)
        ), 
        member.construct ? "()" : "", 
        member.type && [": ", React.createElement(TypeDef, {type: member.type})]
      )
    );
  }
});

exports.MemberDef = MemberDef;

function functionParams(info, params, shouldWrap) {
  var elements = Seq(params)
    .map(function(t)  {return [
      t.varArgs ? "..." : null,
      React.createElement("span", {className: "t param"}, t.name),
      t.optional ? "?: " : ": ",
      React.createElement(TypeDef, {
        prefix: t.name.length + (t.varArgs ? 3 : 0) + (t.optional ? 3 : 2), 
        info: info, 
        type: t.type}
      )
    ];})
    .interpose(shouldWrap ? [",", React.createElement("br", null)] : ", ")
    .to(Array);
  return shouldWrap ? (
    React.createElement("div", {className: "t blockParams"}, elements)
  ) : (
    elements
  );
}

function callSigLength(info, module, name, sig) {
  return (module ? module.length + 1 : 0) + name.length + funcLength(info, sig);
}

function funcLength(info, sig) {
  return (
    (sig.typeParams ? 2 + sig.typeParams.join(", ").length : 0) +
    2 +
    (sig.params ? paramLength(info, sig.params) : 0) +
    (sig.type ? 2 + typeLength(info, sig.type) : 0)
  );
}

function paramLength(info, params) {
  return params.reduce(
    function(s, p) 
      {return s +
      (p.varArgs ? 3 : 0) +
      p.name.length +
      (p.optional ? 3 : 2) +
      typeLength(info, p.type);},
    (params.length - 1) * 2
  );
}

function memberLength(info, members) {
  return members.reduce(
    function(s, m) 
      {return s +
      (m.index ? paramLength(info, m.params) + 4 : m.name + 2) +
      typeLength(info, m.type);},
    (members.length - 1) * 2
  );
}

function typeLength(info, type) {
  if (!type) {
    throw new Error("Expected type");
  }
  switch (type.k) {
    case TypeKind.Never:
      return 5;
    case TypeKind.Null:
      return 4;
    case TypeKind.Void:
      return 4;
    case TypeKind.Any:
      return 3;
    case TypeKind.This:
      return 4;
    case TypeKind.Undefined:
      return 9;
    case TypeKind.Boolean:
      return 7;
    case TypeKind.Number:
      return 6;
    case TypeKind.String:
      return 6;
    case TypeKind.Union:
    case TypeKind.Intersection:
      return (
        type.types.reduce(function(s, t)  {return s + typeLength(info, t);}, 0) +
        (type.types.length - 1) * 3
      );
    case TypeKind.Tuple:
      return (
        2 +
        type.types.reduce(function(s, t)  {return s + typeLength(info, t);}, 0) +
        (type.types.length - 1) * 2
      );
    case TypeKind.Object:
      return 2 + memberLength(info, type.members);
    case TypeKind.Indexed:
      return 2 + typeLength(info, type.type) + typeLength(info, type.index);
    case TypeKind.Operator:
      return 1 + type.operator.length + typeLength(info, type.type);
    case TypeKind.Array:
      return typeLength(info, type.type) + 2;
    case TypeKind.Function:
      return 2 + funcLength(info, type);
    case TypeKind.Param:
      return info && info.propMap[info.defining + "<" + type.param]
        ? typeLength(null, info.propMap[info.defining + "<" + type.param])
        : type.param.length;
    case TypeKind.Type:
      return (
        type.name.length +
        (!type.args
          ? 0
          : type.args.reduce(
              function(s, a)  {return s + typeLength(info, a);},
              type.args.length * 2
            ))
      );
  }
  throw new Error("Type with unknown kind " + JSON.stringify(type));
}

},{"../../../..":1,"../../../lib/TypeKind":185,"../../../lib/getTypeDefs":188,"react":"react","react-router":143,"react/lib/CSSCore":167}],194:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var packageJson = require("../../../../package.json");

var DocHeader = React.createClass({displayName: "DocHeader",
  render:function() {
    return (
      React.createElement("div", {className: "header"}, 
        React.createElement("div", {className: "miniHeader"}, 
          React.createElement("div", {className: "miniHeaderMask"}, 
            React.createElement("div", {className: "miniHeaderBody"}, 
              React.createElement("div", {className: "miniHeaderContents"}, 
                React.createElement("a", {href: "./", target: "_self", className: "miniLogo"}, 
                  "sequins"
                ), 
                React.createElement("a", {href: "./", target: "_self"}, 
                  "Docs (v", 
                  packageJson.version, ")"
                ), 
                React.createElement("a", {href: "https://stackoverflow.com/questions/tagged/sequins?sort=votes"}, 
                  "Questions"
                ), 
                React.createElement("a", {href: "https://github.com/conartist6/sequins/"}, "Github")
              )
            )
          ), 
          React.createElement("div", {className: "miniHeaderBody"}, 
            React.createElement("div", {className: "miniHeaderContents"}, 
              React.createElement("div", {className: "miniLogo inverted"}, 
                React.createElement("span", {className: "hidden"}, "se"), "q", 
                React.createElement("span", {className: "hidden"}, "uins")
              )
            )
          )
        )
      )
    );
  }
});

module.exports = DocHeader;

},{"../../../../package.json":183,"react":"react"}],195:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var Router = require("react-router");
var $__0=    require("../../../.."),Seq=$__0.Seq;
var Markdown = require("./MarkDown");

var DocOverview = React.createClass({displayName: "DocOverview",
  render:function() {
    var def = this.props.def;
    var doc = def.doc;

    return (
      React.createElement("div", null, 
        doc && (
          React.createElement("section", null, 
            React.createElement(Markdown, {contents: doc.synopsis}), 
            doc.description && React.createElement(Markdown, {contents: doc.description})
          )
        ), 
        Seq(def.groups)
          .map(function(group)  {
            return (
              React.createElement("section", null, 
                React.createElement("h4", {className: "groupTitle"}, group.title), 
                Seq(group.members)
                  .map(function(t, name)  {
                    let isFunction = false;
                    if (t.class) {
                      t = t.class;
                    } else if (t.interface) {
                      t = t.interface;
                    } else if (!t.module) {
                      isFunction = true;
                      t = t.call;
                    }

                    return (
                      React.createElement("section", {key: name, className: "interfaceMember"}, 
                        React.createElement("h3", {className: "memberLabel"}, 
                          React.createElement(Router.Link, {to: "/" + name}, 
                            name + (isFunction ? "()" : "")
                          )
                        ), 
                        t.doc && (
                          React.createElement(Markdown, {
                            className: "detail", 
                            contents: t.doc.synopsis}
                          )
                        )
                      )
                    );
                  })
                  .values()
                  .to(Array)
              )
            );
          })
          .to(Array)
      )
    );
  }
});

module.exports = DocOverview;

},{"../../../..":1,"./MarkDown":196,"react":"react","react-router":143}],196:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");

var MarkDown = React.createClass({displayName: "MarkDown",
  shouldComponentUpdate:function() {
    return false;
  },

  render:function() {
    var html = this.props.contents;
    return (
      React.createElement("div", {
        className: this.props.className, 
        dangerouslySetInnerHTML: { __html: html}}
      )
    );
  }
});

module.exports = MarkDown;

},{"react":"react"}],197:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var ReactTransitionEvents = require("react/lib/ReactTransitionEvents");
var Router = require("react-router");
var $__0=     require("./Defs"),CallSigDef=$__0.CallSigDef,MemberDef=$__0.MemberDef;
var PageDataMixin = require("./PageDataMixin");
var isMobile = require("./isMobile");
var MarkDown = require("./MarkDown");
var $__1=    require("./utils"),getDisplayTypeName=$__1.getDisplayTypeName;

var $__2=    React.addons,TransitionGroup=$__2.TransitionGroup;

var ignoredNotes = ["constructs", "pragma"];

var MemberDoc = React.createClass({displayName: "MemberDoc",
  mixins: [PageDataMixin, Router.Navigation],

  getInitialState:function() {
    var showDetail = this.props.showDetail;
    return { detail: showDetail };
  },

  componentDidMount:function() {
    if (this.props.showDetail) {
      var node = this.getDOMNode();
      var navType = this.getPageData().type;
      if (navType === "init" || navType === "push") {
        window.scrollTo(window.scrollX, offsetTop(node) - FIXED_HEADER_HEIGHT);
      }
    }
  },

  componentWillReceiveProps:function(nextProps) {
    if (nextProps.showDetail && !this.props.showDetail) {
      this.scrollTo = true;
      this.setState({ detail: true });
    }
  },

  componentDidUpdate:function() {
    if (this.scrollTo) {
      this.scrollTo = false;
      var node = this.getDOMNode();
      var navType = this.getPageData().type;
      if (navType === "init" || navType === "push") {
        window.scrollTo(window.scrollX, offsetTop(node) - FIXED_HEADER_HEIGHT);
      }
    }
  },

  toggleDetail:function() {
    // Note: removed this because it drops the URL bar on mobile, and that's
    // the only place it's currently being used.
    // var member = this.props.member;
    // var name = member.memberName;
    // var typeName = this.props.parentName;
    // var showDetail = this.props.showDetail;
    // if (!this.state.detail) {
    //   this.replaceWith('/' + (typeName ? typeName + '/' : '') + name );
    // } else if (this.state.detail && showDetail) {
    //   this.replaceWith('/' + (typeName || '') );
    // }
    this.setState({ detail: !this.state.detail });
  },

  render:function() {
    var typePropMap = this.props.typePropMap;
    var member = this.props.member;
    var module = member.isStatic ? this.props.parentName : null;
    var name = member.memberName;
    var def = member.memberDef;
    var doc = def.doc || {};
    var isProp = !def.signatures;

    var typeInfo = member.inherited && {
      propMap: typePropMap,
      defining: member.inherited.name
    };

    var showDetail = isMobile ? this.state.detail : true;

    var memberAnchorLink = this.props.parentName + "/" + name;

    var typeDef = isProp ? (
      React.createElement("code", {key: "typeDef", className: "codeBlock memberSignature"}, 
        React.createElement(MemberDef, {module: module, member: { name:name, type: def.type}})
      )
    ) : (
      React.createElement("code", {key: "typeDef", className: "codeBlock memberSignature"}, 
        def.signatures.map(function(callSig, i)  {return [
          React.createElement(CallSigDef, {
            key: i, 
            info: typeInfo, 
            module: module, 
            name: name, 
            callSig: callSig}
          ),
          "\n"
        ];})
      )
    );

    var metadata = [
      member.inherited && (
        React.createElement("section", {key: "inherited"}, 
          React.createElement("h4", {className: "infoHeader"}, "Inherited from"), 
          React.createElement("code", null, 
            React.createElement(Router.Link, {to: "/" + member.inherited.name + "/" + name}, 
              member.inherited.name + "#" + name
            )
          )
        )
      ),
      member.overrides && (
        React.createElement("section", {key: "overrides"}, 
          React.createElement("h4", {className: "infoHeader"}, "Overrides"), 
          React.createElement("code", null, 
            React.createElement(Router.Link, {to: "/" + member.overrides.name + "/" + name}, 
              member.overrides.name + "#" + name
            )
          )
        )
      ),
      ...(doc.notes
        ? doc.notes
            .filter(function(note)  {return !ignoredNotes.includes(note.name);})
            .map(function(note, i)  
              {return React.createElement("section", {key: ("note_" + i)}, 
                React.createElement("h4", {className: "infoHeader"}, note.name), 
                note.name === "alias" ? (
                  React.createElement("code", null, 
                    React.createElement(CallSigDef, {name: note.body})
                  )
                ) : (
                  React.createElement(MarkDown, {className: "discussion", contents: note.body})
                )
              );}
            )
        : [])
    ].filter(Boolean);

    var description = doc.description && (
      React.createElement("section", {key: "description"}, 
        React.createElement("h4", {className: "infoHeader"}, 
          doc.description.substr(0, 5) === "<code" ? "Example" : "Discussion"
        ), 
        React.createElement(MarkDown, {className: "discussion", contents: doc.description})
      )
    );

    var detail =
      doc.notes &&
      doc.notes.find(
        function(note) 
          {return note.name === "pragma" && note.body.trim() === "showExampleAboveType";}
      )
        ? [description, typeDef, metadata]
        : [typeDef, metadata, description];

    return (
      React.createElement("div", {className: "interfaceMember"}, 
        React.createElement("h3", {className: "memberLabel"}, 
          React.createElement(Router.Link, {
            to: "/" + memberAnchorLink, 
            onClick: isMobile ? this.toggleDetail : null
          }, 
            (module ? module + "." : "") + name + (isProp ? "" : "()")
          )
        ), 
        React.createElement(TransitionGroup, {childFactory: makeSlideDown}, 
          showDetail && (
            React.createElement("div", {key: "detail", className: "detail"}, 
              doc.synopsis && (
                React.createElement(MarkDown, {className: "synopsis", contents: doc.synopsis})
              ), 
              detail
            )
          )
        )
      )
    );
  }
});

function makeSlideDown(child) {
  return React.createElement(SlideDown, null, child);
}

var SlideDown = React.createClass({displayName: "SlideDown",
  componentWillEnter:function(done) {
    this.slide(false, done);
  },

  componentWillLeave:function(done) {
    this.slide(true, done);
  },

  slide:function(slidingUp, done) {
    var node = this.getDOMNode();
    node.style.height = "auto";
    var height = getComputedStyle(node).height;
    var start = slidingUp ? height : 0;
    var end = slidingUp ? 0 : height;
    node.style.transition = "";
    node.style.height = start;
    node.style.transition = "height 0.35s ease-in-out";
    var endListener = function()  {
      ReactTransitionEvents.removeEndEventListener(node, endListener);
      done();
    };
    ReactTransitionEvents.addEndEventListener(node, endListener);
    this.timeout = setTimeout(function()  {
      node.style.height = end;
    }, 17);
  },

  render:function() {
    return this.props.children;
  }
});

var FIXED_HEADER_HEIGHT = 75;

function offsetTop(node) {
  var top = 0;
  do {
    top += node.offsetTop;
  } while ((node = node.offsetParent));
  return top;
}

module.exports = MemberDoc;

},{"./Defs":193,"./MarkDown":196,"./PageDataMixin":198,"./isMobile":201,"./utils":202,"react":"react","react-router":143,"react/lib/ReactTransitionEvents":170}],198:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");

module.exports = {
  contextTypes: {
    getPageData: React.PropTypes.func.isRequired
  },

  /**
   * Returns the most recent change event.
   */
  getPageData:function() {
    return this.context.getPageData();
  }
};

},{"react":"react"}],199:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var Router = require("react-router");
var $__0=    require("../../../.."),Seq=$__0.Seq;
var defs = require("../../../lib/getTypeDefs");
var $__1=     require("./utils"),flattenDef=$__1.flattenDef,getDisplayTypeName=$__1.getDisplayTypeName;

var SideBar = React.createClass({displayName: "SideBar",
  render:function() {
    var type = defs;

    return (
      React.createElement("div", {className: "sideBar"}, 
        React.createElement("div", {className: "toolBar"}, 
          React.createElement("div", {
            onClick: this.props.toggleShowInGroups, 
            onKeyPress: this.props.toggleShowInGroups
          }, 
            React.createElement("span", {className: this.props.showInGroups && "selected"}, 
              "Grouped"
            ), 
            " • ", 
            React.createElement("span", {className: this.props.showInGroups || "selected"}, 
              "Alphabetized"
            )
          )
        ), 
        React.createElement("div", {className: "scrollContent"}, 
          Seq(type.groups)
            .map(function(group)  {
              return (
                React.createElement("section", null, 
                  React.createElement("h4", {className: "groupTitle"}, group.title), 
                  Seq(group.members)
                    .map(function(t, name)  {return this.renderSideBarType(name, t);}.bind(this))
                    .values()
                    .to(Array)
                )
              );
            }.bind(this))
            .to(Array)
        )
      )
    );
  },

  renderSideBarType:function(typeName, def) {
    var isFocus = this.props.focus === typeName;
    var isFunction = !def.interface && !def.class && !def.module;
    def = flattenDef(def, typeName);
    var calls = Seq(def.constructors);
    var functions = Seq((def.class && def.class.statics) || def.functions);

    var label = typeName + (isFunction ? "()" : "");

    if (!isFocus) {
      label = React.createElement(Router.Link, {to: "/" + typeName}, label);
    }

    var memberGroups = this.props.memberGroups;

    const flat = Seq(memberGroups)
      .map(function(members, title) 
        {return members.length === 0
          ? null
          : Seq([
              React.createElement("h4", {key: title || "Members", className: "groupTitle"}, 
                title || "Members"
              ),
              Seq(members).map(function(member)  
                {return React.createElement("div", {key: member.memberName}, 
                  React.createElement(Router.Link, {to: "/" + typeName + "/" + member.memberName}, 
                    member.memberName +
                      (member.memberDef.signatures ? "()" : "")
                  )
                );}
              )
            ]);}
      )
      .flatten()
      .values()
      .to(Array);

    var members =
      !isFocus || isFunction ? null : (
        React.createElement("div", {className: "members"}, 
          calls.count() > 0 && (
            React.createElement("section", null, 
              calls
                .map(function(call, name)  
                  {return React.createElement("div", {key: name}, 
                    React.createElement(Router.Link, {to: "/" + typeName + "/" + name}, 
                      getDisplayTypeName(name, typeName)
                    )
                  );}
                )
                .values()
                .to(Array)
            )
          ), 

          functions.count() > 0 && (
            React.createElement("section", null, 
              React.createElement("h4", {className: "groupTitle"}, "Static Methods"), 
              functions
                .map(function(t, name)  
                  {return React.createElement("div", {key: name}, 
                    React.createElement(Router.Link, {to: "/" + typeName + "/" + name}, 
                      getDisplayTypeName(name, typeName)
                    )
                  );}
                )
                .values()
                .to(Array)
            )
          ), 

          React.createElement("section", null, 
            Seq(memberGroups)
              .map(function(members, title) 
                {return members.length === 0
                  ? null
                  : Seq([
                      React.createElement("h4", {key: title || "Members", className: "groupTitle"}, 
                        title || "Members"
                      ),
                      Seq(members).map(function(member)  
                        {return React.createElement("div", {key: member.memberName}, 
                          React.createElement(Router.Link, {
                            to: "/" + typeName + "/" + member.memberName
                          }, 
                            member.memberName +
                              (member.memberDef.signatures ? "()" : "")
                          )
                        );}
                      )
                    ]);}
              )
              .flatten()
              .values()
              .to(Array)
          )
        )
      );

    return (
      React.createElement("div", {key: typeName}, 
        React.createElement("h2", null, label), 
        members
      )
    );
  }
});

module.exports = SideBar;

},{"../../../..":1,"../../../lib/getTypeDefs":188,"./utils":202,"react":"react","react-router":143}],200:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var Router = require("react-router");
var $__0=     require("../../../.."),Seq=$__0.Seq,KeyedSequence=$__0.KeyedSequence;
var $__1=     require("./Defs"),InterfaceDef=$__1.InterfaceDef,CallSigDef=$__1.CallSigDef;
var MemberDoc = require("./MemberDoc");
var isMobile = require("./isMobile");
var SideBar = require("./SideBar");
var MarkDown = require("./MarkDown");
var DocOverview = require("./DocOverview");
var collectMemberGroups = require("../../../lib/collectMemberGroups");
var TypeKind = require("../../../lib/TypeKind");
var getDefByPath = require("../../../lib/getDefByPath");
var $__2=    require("./utils"),flattenDef=$__2.flattenDef;

var typeDefURL =
  "https://github.com/conartist6/sequins/blob/master/type-definitions/sequins.d.ts";
var issuesURL = "https://github.com/conartist6/sequins/issues";

var Disclaimer = function() {
  return (
    React.createElement("section", {className: "disclaimer"}, 
      "This documentation is generated from ", React.createElement("a", {href: typeDefURL}, "sequins.d.ts"), 
      ". Pull requests and ", React.createElement("a", {href: issuesURL}, "Issues"), " welcome."
    )
  );
};

var TypeDocumentation = React.createClass({displayName: "TypeDocumentation",
  getInitialState:function() {
    return {
      showInGroups: true
    };
  },

  toggleShowInGroups:function() {
    this.setState({ showInGroups: !this.state.showInGroups });
  },

  render:function() {
    var name = this.props.name;
    var memberName = this.props.memberName;
    var def = this.props.def;

    var memberGroups = collectMemberGroups(
      def && (def.class || def.interface),
      {
        showInGroups: this.state.showInGroups
      }
    );

    return (
      React.createElement("div", null, 
        isMobile || (
          React.createElement(SideBar, {
            focus: name, 
            memberGroups: memberGroups, 
            toggleShowInherited: this.toggleShowInherited, 
            toggleShowInGroups: this.toggleShowInGroups, 
            showInGroups: this.state.showInGroups}
          )
        ), 
        React.createElement("div", {key: name, className: "docContents"}, 
          !def ? (
            React.createElement(NotFound, null)
          ) : !name ? (
            React.createElement(DocOverview, {def: def})
          ) : !def.interface && !def.class && !def.module ? (
            React.createElement(FunctionDoc, {name: name, def: def.call})
          ) : (
            React.createElement(TypeDoc, {
              name: name, 
              def: def, 
              memberName: memberName, 
              memberGroups: memberGroups}
            )
          )
        )
      )
    );
  }
});

function NotFound() {
  return React.createElement("div", null, "Not found");
}

var FunctionDoc = React.createClass({displayName: "FunctionDoc",
  render:function() {
    var name = this.props.name;
    var def = this.props.def;
    var doc = def.doc || {};

    return (
      React.createElement("div", null, 
        React.createElement("h1", {className: "typeHeader"}, name + "()"), 
        doc.synopsis && (
          React.createElement(MarkDown, {className: "synopsis", contents: doc.synopsis})
        ), 
        React.createElement("code", {className: "codeBlock memberSignature"}, 
          def.signatures.map(function(callSig, i)  {return [
            React.createElement(CallSigDef, {key: i, name: name, callSig: callSig}),
            "\n"
          ];})
        ), 
        doc.notes &&
          doc.notes.map(function(note, i)  
            {return React.createElement("section", {key: i}, 
              React.createElement("h4", {className: "infoHeader"}, note.name), 
              note.name === "alias" ? (
                React.createElement(CallSigDef, {name: note.body})
              ) : (
                note.body
              )
            );}
          ), 
        doc.description && (
          React.createElement("section", null, 
            React.createElement("h4", {className: "infoHeader"}, 
              doc.description.substr(0, 5) === "<code"
                ? "Example"
                : "Discussion"
            ), 
            React.createElement(MarkDown, {className: "discussion", contents: doc.description})
          )
        ), 
        React.createElement(Disclaimer, null)
      )
    );
  }
});

var TypeDoc = React.createClass({displayName: "TypeDoc",
  render:function() {
    var name = this.props.name;
    var def = this.props.def;
    var memberName = this.props.memberName;
    var memberGroups = this.props.memberGroups;

    var flatDef = flattenDef(def, name);

    var calls = Seq(flatDef.constructors);

    var interfaceDef = def.class || def.interface;
    var functions = Seq((def.class && def.class.statics) || flatDef.functions);
    var types = Seq(def.module).filter(function(t)  {return t.interface || t.class || t.module;});

    var typePropMap = getTypePropMap(interfaceDef);

    var doc = (interfaceDef ? interfaceDef.doc : def.doc) || {};

    return (
      React.createElement("div", null, 
        React.createElement("h1", {className: "typeHeader"}, name), 
        doc.synopsis && (
          React.createElement(MarkDown, {className: "synopsis", contents: doc.synopsis})
        ), 
        interfaceDef && (
          React.createElement("code", {className: "codeBlock memberSignature"}, 
            React.createElement(InterfaceDef, {name: name, def: interfaceDef})
          )
        ), 

        doc.notes &&
          doc.notes.map(function(note, i)  
            {return React.createElement("section", {key: i}, 
              React.createElement("h4", {className: "infoHeader"}, note.name), 
              note.name === "alias" ? (
                React.createElement(CallSigDef, {name: note.body})
              ) : (
                note.body
              )
            );}
          ), 

        doc.description && (
          React.createElement("section", null, 
            React.createElement("h4", {className: "infoHeader"}, 
              doc.description.substr(0, 5) === "<code"
                ? "Example"
                : "Discussion"
            ), 
            React.createElement(MarkDown, {className: "discussion", contents: doc.description})
          )
        ), 

        types.size > 0 && (
          React.createElement("section", null, 
            React.createElement("h4", {className: "groupTitle"}, "Sub-types"), 
            types
              .map(function(t, typeName)  
                {return React.createElement("div", {key: typeName}, 
                  React.createElement(Router.Link, {
                    to: "/" + (name ? name + "." + typeName : typeName)
                  }, 
                    name ? name + "." + typeName : typeName
                  )
                );}
              )
              .values()
              .to(Array)
          )
        ), 

        calls.count() > 0 && (
          React.createElement("section", null, 
            calls
              .map(function(call, callName)  
                {return React.createElement(MemberDoc, {
                  key: callName, 
                  showDetail: callName === memberName, 
                  parentName: name, 
                  member: {
                    memberName: callName,
                    memberDef: call,
                    isStatic: callName !== name
                  }}
                );}
              )
              .values()
              .to(Array)
          )
        ), 

        functions.count() > 0 && (
          React.createElement("section", null, 
            React.createElement("h4", {className: "groupTitle"}, "Static methods"), 
            functions
              .map(function(def, fnName)  
                {return React.createElement(MemberDoc, {
                  key: fnName, 
                  showDetail: fnName === memberName, 
                  parentName: name, 
                  member: {
                    memberName: fnName,
                    memberDef: def,
                    isStatic: true
                  }}
                );}
              )
              .values()
              .to(Array)
          )
        ), 

        React.createElement("section", null, 
          Seq(memberGroups)
            .map(function(members, title) 
              {return members.length === 0
                ? null
                : Seq([
                    React.createElement("h4", {key: title || "Members", className: "groupTitle"}, 
                      title || "Members"
                    ),
                    Seq(members).map(function(member)  
                      {return React.createElement(MemberDoc, {
                        typePropMap: typePropMap, 
                        key: member.memberName, 
                        showDetail: member.memberName === memberName, 
                        parentName: name, 
                        member: member}
                      );}
                    )
                  ]);}
            )
            .flatten()
            .values()
            .to(Array)
        ), 

        React.createElement(Disclaimer, null)
      )
    );
  }
});

/**
 * Get a map from super type parameter to concrete type definition. This is
 * used when rendering inherited type definitions to ensure contextually
 * relevant information.
 *
 * Example:
 *
 *   type A<T> implements B<number, T>
 *   type B<K, V> implements C<K, V, V>
 *   type C<X, Y, Z>
 *
 * parse C:
 *   {}
 *
 * parse B:
 *   { C<X: K
 *     C<Y: V
 *     C<Z: V }
 *
 * parse A:
 *   { B<K: number
 *     B<V: T
 *     C<X: number
 *     C<Y: T
 *     C<Z: T }
 */
function getTypePropMap(def) {
  var map = {};
  def &&
    def.extends &&
    def.extends.forEach(function(e)  {
      var superModule = getDefByPath(e.name);
      var superInterface =
        (superModule && superModule.class) || superModule.interface;
      if (superInterface) {
        var interfaceMap = Seq(superInterface.typeParams)
          .to(KeyedSequence)
          .flip()
          .map(function(i)  {return e.args[i];})
          .to(Object);
        Seq(interfaceMap).forEach(function(v, k)  {
          map[e.name + "<" + k] = v;
        });
        var superMap = getTypePropMap(superInterface);
        Seq(superMap).forEach(function(v, k)  {
          map[k] = v.k === TypeKind.Param ? interfaceMap[v.param] : v;
        });
      }
    });
  return map;
}

module.exports = TypeDocumentation;

},{"../../../..":1,"../../../lib/TypeKind":185,"../../../lib/collectMemberGroups":186,"../../../lib/getDefByPath":187,"./Defs":193,"./DocOverview":195,"./MarkDown":196,"./MemberDoc":197,"./SideBar":199,"./isMobile":201,"./utils":202,"react":"react","react-router":143}],"/home/travis/build/conartist6/sequins/pages/src/docs/src/index.js":[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var assign = require("react/lib/Object.assign");
var Router = require("react-router");
var DocHeader = require("./DocHeader");
var TypeDocumentation = require("./TypeDocumentation");
var getDefByPath = require("../../../lib/getDefByPath");
var Sequins = require("../../../..");

window.Sequins = Sequins;
console.log("Feel free to try Sequins!");
console.log(Sequins);

var $__0=      Router,Route=$__0.Route,DefaultRoute=$__0.DefaultRoute,RouteHandler=$__0.RouteHandler;

require("../../../lib/runkit-embed");

var Documentation = React.createClass({displayName: "Documentation",
  render:function() {
    return (
      React.createElement("div", null, 
        React.createElement(DocHeader, null), 
        React.createElement("div", {className: "pageBody", id: "body"}, 
          React.createElement("div", {className: "contents"}, 
            React.createElement(RouteHandler, null)
          )
        )
      )
    );
  }
});

var DocDeterminer = React.createClass({displayName: "DocDeterminer",
  mixins: [Router.State],

  render:function() {
    var $__0=      determineDoc(this.getPath()),def=$__0.def,name=$__0.name,memberName=$__0.memberName;
    return React.createElement(TypeDocumentation, {def: def, name: name, memberName: memberName});
  }
});

function determineDoc(path) {
  var $__0=    path.split("/"),name=$__0[1],memberName=$__0[2];

  var def = getDefByPath(name);

  return { def:def, name:name, memberName:memberName };
}

module.exports = React.createClass({displayName: "exports",
  childContextTypes: {
    getPageData: React.PropTypes.func.isRequired
  },

  getChildContext:function() {
    return {
      getPageData: this.getPageData
    };
  },

  getPageData:function() {
    return this.pageData;
  },

  componentWillMount:function() {
    var location;
    var scrollBehavior;

    if (window.document) {
      location = Router.HashLocation;
      location.addChangeListener(function(change)  {
        this.pageData = assign({}, change, determineDoc(change.path));
      }.bind(this));

      this.pageData = !window.document
        ? {}
        : assign(
            {
              path: location.getCurrentPath(),
              type: "init"
            },
            determineDoc(location.getCurrentPath())
          );

      scrollBehavior = {
        updateScrollPosition: function(position, actionType)  {
          switch (actionType) {
            case "push":
              return this.getPageData().memberName
                ? null
                : window.scrollTo(0, 0);
            case "pop":
              return window.scrollTo(
                position ? position.x : 0,
                position ? position.y : 0
              );
          }
        }.bind(this)
      };
    }

    Router.create({
      routes: (
        React.createElement(Route, {handler: Documentation, path: "/"}, 
          React.createElement(DefaultRoute, {handler: DocDeterminer}), 
          React.createElement(Route, {name: "type", path: "/:name", handler: DocDeterminer}), 
          React.createElement(Route, {
            name: "method", 
            path: "/:name/:memberName", 
            handler: DocDeterminer}
          )
        )
      ),
      location: location,
      scrollBehavior: scrollBehavior
    }).run(function(Handler)  {
      this.setState({ handler: Handler });
      if (window.document) {
        window.document.title = this.pageData.name
          ? (this.pageData.name + " — Sequins")
          : "Sequins — API";
      }
    }.bind(this));
  },

  // TODO: replace this. this is hacky and probably wrong

  componentDidMount:function() {
    setTimeout(function()  {
      this.pageData.type = "";
    }.bind(this), 0);
  },

  componentDidUpdate:function() {
    setTimeout(function()  {
      this.pageData.type = "";
    }.bind(this), 0);
  },

  render:function() {
    var Handler = this.state.handler;
    return React.createElement(Handler, null);
  }
});

},{"../../../..":1,"../../../lib/getDefByPath":187,"../../../lib/runkit-embed":192,"./DocHeader":194,"./TypeDocumentation":200,"react":"react","react-router":143,"react/lib/Object.assign":169}],201:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var isMobile =
  window.matchMedia && window.matchMedia("(max-device-width: 680px)");
module.exports = false && !!(isMobile && isMobile.matches);

},{}],202:[function(require,module,exports){
var $__0=      require("immutable"),Seq=$__0.Seq,merge=$__0.merge,mergeWith=$__0.mergeWith;

function makeKey(rootName, name, key) {
  return name === rootName ? key : (name + "." + key);
}

function flattenDef(def, name, rootName = name) {
  var flatDef = Object.assign({}, def);
  if (flatDef.call) {
    flatDef.constructors = { [name]: flatDef.call };
    delete flatDef.call;
  }

  delete flatDef.module;

  return mergeWith.apply(null, [function(a, b)  {return merge(a, b);},
    flatDef].concat(Seq(def.module)
      .map(function(def, key)  {
        const flatDef = {};
        if (def.call) {
          if (def.call.doc.notes.find(function(note)  {return note.name === "constructs";})) {
            flatDef.constructors = { [makeKey(rootName, name, key)]: def.call };
          } else {
            flatDef.functions = { [makeKey(rootName, name, key)]: def.call };
          }
        }
        return flatDef;
      })
      .concat(
        Seq(def.module)
          .filter(function(def)  {return def.module;})
          .map(function(def, key) 
            {return flattenDef(def, makeKey(rootName, name, key), rootName);}
          )
      )
      .valueSeq()
      .toArray()));
}

function getDisplayTypeName(name, typeName) {
  return (name === typeName ? name : (typeName + "." + name)) + "()";
}

module.exports = {
  flattenDef:flattenDef,
  getDisplayTypeName:getDisplayTypeName
};

},{"immutable":105}],"react":[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = global.React;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"sequins":[function(require,module,exports){
(function (global){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = global.Sequins;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},["/home/travis/build/conartist6/sequins/pages/src/docs/src/index.js"])