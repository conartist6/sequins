/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.resolve('dist');
const TYPE_DEFS_DIR = path.resolve('type-definitions');

const tsTypes = fs.readFileSync(path.join(TYPE_DEFS_DIR, 'Sequins.d.ts'), 'utf8');
// const flowTypes = fs.readFileSync(
//   path.join(TYPE_DEFS_DIR, 'immutable.js.flow'),
//   'utf8'
// );

fs.writeFileSync(path.join(DIST_DIR, 'sequins.d.ts'), tsTypes, 'utf-8');
//fs.writeFileSync(path.join(DIST_DIR, 'immutable.js.flow'), flowTypes, 'utf-8');
