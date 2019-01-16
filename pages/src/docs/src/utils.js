var { Seq, merge, mergeWith } = require("immutable");

function makeKey(rootName, name, key) {
  return name === rootName ? key : `${name}.${key}`;
}

function flattenDef(def, name, rootName = name) {
  var flatDef = Object.assign({}, def);
  if (flatDef.call) {
    flatDef.constructors = { [name]: flatDef.call };
    delete flatDef.call;
  }

  delete flatDef.module;

  return mergeWith(
    (a, b) => merge(a, b),
    flatDef,
    ...Seq(def.module)
      .map((def, key) => {
        const flatDef = {};
        if (def.call) {
          if (def.call.doc.notes.find(note => note.name === "constructs")) {
            flatDef.constructors = { [makeKey(rootName, name, key)]: def.call };
          } else {
            flatDef.functions = { [makeKey(rootName, name, key)]: def.call };
          }
        }
        return flatDef;
      })
      .concat(
        Seq(def.module)
          .filter(def => def.module)
          .map((def, key) =>
            flattenDef(def, makeKey(rootName, name, key), rootName)
          )
      )
      .valueSeq()
      .toArray()
  );
}

function getDisplayTypeName(name, typeName) {
  return (name === typeName ? name : `${typeName}.${name}`) + "()";
}

module.exports = {
  flattenDef,
  getDisplayTypeName
};
