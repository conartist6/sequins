/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var { Seq } = require("../../");
var markdown = require("./markdown");

var noteTypesToPreserve = ["alias", "memberof"];

function markdownDocs(defs) {
  markdownTypes(defs, []);

  function markdownType(typeDef, typeName, typePath) {
    markdownDoc(typeDef.doc, { typePath });
    typeDef.call &&
      markdownDoc(typeDef.call.doc, {
        typePath,
        signatures: typeDef.call.signatures
      });
    var classLikeDoc = typeDef.class || typeDef.interface;
    if (classLikeDoc) {
      markdownDoc(classLikeDoc.doc, { defs, typePath });
      Seq(classLikeDoc.groups).forEach(group =>
        Seq(group.members).forEach((member, memberName) =>
          markdownDoc(member.doc, {
            typePath: typePath.concat(memberName.slice(1)),
            signatures: member.signatures
          })
        )
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
        Seq(group.members).forEach((memberDef, memberName) => {
          markdownType(memberDef, memberName, path.concat(memberName));
        });
      }
    } else {
      Seq(typeDefs).forEach((typeDef, typeName) => {
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
    doc.notes.forEach(note => {
      if (!noteTypesToPreserve.includes(note.name)) {
        note.body = markdown(note.body, context);
      }
    });
}

module.exports = markdownDocs;
