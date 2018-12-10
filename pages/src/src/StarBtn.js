/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var loadJSON = require("./loadJSON");

// API endpoints
// https://registry.npmjs.org/sequins/latest
// https://api.github.com/repos/conartist6/sequins

var StarBtn = React.createClass({
  getInitialState: function() {
    return { stars: null };
  },

  componentDidMount: function() {
    loadJSON("https://api.github.com/repos/conartist6/sequins", value => {
      value &&
        value.stargazers_count &&
        this.setState({ stars: value.stargazers_count });
    });
  },

  render: function() {
    return (
      <span className="github-btn">
        <a
          className="gh-btn"
          id="gh-btn"
          href="https://github.com/conartist6/sequins/"
        >
          <span className="gh-ico" />
          <span className="gh-text">Star</span>
        </a>
        {this.state.stars && <span className="gh-triangle" />}
        {this.state.stars && (
          <a
            className="gh-count"
            href="https://github.com/conartist6/sequins/stargazers"
          >
            {this.state.stars}
          </a>
        )}
      </span>
    );
  }
});

module.exports = StarBtn;
