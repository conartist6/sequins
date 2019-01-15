/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var packageJson = require("../../../../package.json");

var DocHeader = React.createClass({
  render() {
    return (
      <div className="header">
        <div className="miniHeader">
          <div className="miniHeaderMask">
            <div className="miniHeaderBody">
              <div className="miniHeaderContents">
                <a href="./" target="_self" className="miniLogo">
                  sequins
                </a>
                <a href="./" target="_self">
                  Docs (v
                  {packageJson.version})
                </a>
                <a href="https://stackoverflow.com/questions/tagged/sequins?sort=votes">
                  Questions
                </a>
                <a href="https://github.com/conartist6/sequins/">Github</a>
              </div>
            </div>
          </div>
          <div className="miniHeaderBody">
            <div className="miniHeaderContents">
              <div className="miniLogo inverted">
                <span className="hidden">se</span>q
                <span className="hidden">uins</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DocHeader;
