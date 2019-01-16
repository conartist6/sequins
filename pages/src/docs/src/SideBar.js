/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require("react");
var Router = require("react-router");
var { Seq } = require("../../../..");
var defs = require("../../../lib/getTypeDefs");
var { flattenDef, getDisplayTypeName } = require("./utils");

var SideBar = React.createClass({
  render() {
    var type = defs;

    return (
      <div className="sideBar">
        <div className="toolBar">
          <div
            onClick={this.props.toggleShowInGroups}
            onKeyPress={this.props.toggleShowInGroups}
          >
            <span className={this.props.showInGroups && "selected"}>
              Grouped
            </span>
            {" • "}
            <span className={this.props.showInGroups || "selected"}>
              Alphabetized
            </span>
          </div>
        </div>
        <div className="scrollContent">
          {Seq(type.groups)
            .map(group => {
              return (
                <section>
                  <h4 className="groupTitle">{group.title}</h4>
                  {Seq(group.members)
                    .map((t, name) => this.renderSideBarType(name, t))
                    .values()
                    .to(Array)}
                </section>
              );
            })
            .to(Array)}
        </div>
      </div>
    );
  },

  renderSideBarType(typeName, def) {
    var isFocus = this.props.focus === typeName;
    var isFunction = !def.interface && !def.class && !def.module;
    def = flattenDef(def, typeName);
    var calls = Seq(def.constructors);
    var functions = Seq((def.class && def.class.statics) || def.functions);

    var label = typeName + (isFunction ? "()" : "");

    if (!isFocus) {
      label = <Router.Link to={"/" + typeName}>{label}</Router.Link>;
    }

    var memberGroups = this.props.memberGroups;

    const flat = Seq(memberGroups)
      .map((members, title) =>
        members.length === 0
          ? null
          : Seq([
              <h4 key={title || "Members"} className="groupTitle">
                {title || "Members"}
              </h4>,
              Seq(members).map(member => (
                <div key={member.memberName}>
                  <Router.Link to={"/" + typeName + "/" + member.memberName}>
                    {member.memberName +
                      (member.memberDef.signatures ? "()" : "")}
                  </Router.Link>
                </div>
              ))
            ])
      )
      .flatten()
      .values()
      .to(Array);

    var members =
      !isFocus || isFunction ? null : (
        <div className="members">
          {calls.count() > 0 && (
            <section>
              {calls
                .map((call, name) => (
                  <div key={name}>
                    <Router.Link to={"/" + typeName + "/" + name}>
                      {getDisplayTypeName(name, typeName)}
                    </Router.Link>
                  </div>
                ))
                .values()
                .to(Array)}
            </section>
          )}

          {functions.count() > 0 && (
            <section>
              <h4 className="groupTitle">Static Methods</h4>
              {functions
                .map((t, name) => (
                  <div key={name}>
                    <Router.Link to={"/" + typeName + "/" + name}>
                      {getDisplayTypeName(name, typeName)}
                    </Router.Link>
                  </div>
                ))
                .values()
                .to(Array)}
            </section>
          )}

          <section>
            {Seq(memberGroups)
              .map((members, title) =>
                members.length === 0
                  ? null
                  : Seq([
                      <h4 key={title || "Members"} className="groupTitle">
                        {title || "Members"}
                      </h4>,
                      Seq(members).map(member => (
                        <div key={member.memberName}>
                          <Router.Link
                            to={"/" + typeName + "/" + member.memberName}
                          >
                            {member.memberName +
                              (member.memberDef.signatures ? "()" : "")}
                          </Router.Link>
                        </div>
                      ))
                    ])
              )
              .flatten()
              .values()
              .to(Array)}
          </section>
        </div>
      );

    return (
      <div key={typeName}>
        <h2>{label}</h2>
        {members}
      </div>
    );
  }
});

module.exports = SideBar;
