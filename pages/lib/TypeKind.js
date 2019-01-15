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
