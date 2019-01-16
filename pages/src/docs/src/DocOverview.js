/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var Router = require("react-router");
var { Seq } = require("../../../..");
var Markdown = require("./MarkDown");

var DocOverview = React.createClass({
  render() {
    var def = this.props.def;
    var doc = def.doc;

    return (
      <div>
        {doc && (
          <section>
            <Markdown contents={doc.synopsis} />
            {doc.description && <Markdown contents={doc.description} />}
          </section>
        )}
        {Seq(def.groups)
          .map(group => {
            return (
              <section>
                <h4 className="groupTitle">{group.title}</h4>
                {Seq(group.members)
                  .map((t, name) => {
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
                      <section key={name} className="interfaceMember">
                        <h3 className="memberLabel">
                          <Router.Link to={"/" + name}>
                            {name + (isFunction ? "()" : "")}
                          </Router.Link>
                        </h3>
                        {t.doc && (
                          <Markdown
                            className="detail"
                            contents={t.doc.synopsis}
                          />
                        )}
                      </section>
                    );
                  })
                  .values()
                  .to(Array)}
              </section>
            );
          })
          .to(Array)}
      </div>
    );
  }
});

module.exports = DocOverview;
