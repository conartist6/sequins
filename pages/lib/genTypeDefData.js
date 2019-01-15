/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ts = require("typescript");

var TypeKind = require("./TypeKind");

var subtypes = ["Indexed", "Keyed", "Set"];

function genTypeDefData(typeDefPath, typeDefSource) {
  var sourceFile = ts.createSourceFile(
    typeDefPath,
    typeDefSource,
    ts.ScriptTarget.ES2015,
    /* parentReferences */ true
  );
  return DocVisitor(sourceFile);
}

module.exports = genTypeDefData;

function DocVisitor(source) {
  var stack = [];
  var data = {};
  var typeParams = [];
  var aliases = [{}];
  var isStatic = false;

  visit(source);
  return pop();

  function visit(node, parentName) {
    switch (node.kind) {
      case ts.SyntaxKind.ModuleDeclaration:
        return visitModuleDeclaration(node, parentName);
      case ts.SyntaxKind.FunctionDeclaration:
        return visitFunctionDeclaration(node, parentName);
      case ts.SyntaxKind.InterfaceDeclaration:
        return visitInterfaceDeclaration(node, parentName);
      case ts.SyntaxKind.TypeAnnotation:
        return; // do not visit type annotations.
      case ts.SyntaxKind.ConstructSignature:
        return visitConstructorSignature(node, parentName);
      case ts.SyntaxKind.PropertySignature:
        return visitPropertySignature(node, parentName);
      case ts.SyntaxKind.MethodSignature:
        return visitMethodSignature(node, parentName);
      default:
        return ts.forEachChild(node, function(node) {
          visit(node, parentName);
        });
    }
  }

  function push(newData) {
    stack.push(data);
    data = newData;
  }

  function pop() {
    var prevData = data;
    data = stack.pop();
    return prevData;
  }

  function isTypeParam(name) {
    return typeParams.some(set => set && set.indexOf(name) !== -1);
  }

  function isAliased(name) {
    return !!last(aliases)[name];
  }

  function addAliases(comment, name) {
    comment &&
      comment.notes &&
      comment.notes
        .filter(note => note.name === "alias")
        .map(node => node.body)
        .forEach(alias => {
          last(aliases)[alias] = name;
        });
  }

  function visitModuleDeclaration(node) {
    var comment = getDoc(node);

    var moduleObj = {};

    if (comment && comment.notes.find(note => note.name === "grouped")) {
      moduleObj.groups = [];
    }

    if (!shouldIgnore(comment)) {
      var name = node.name
        ? node.name.text
        : node.stringLiteral
        ? node.stringLiteral.text
        : "";

      if (comment) {
        setMemberIn(data, [name, "doc"], comment);
      }

      setMemberIn(data, [name, "module"], moduleObj);
    }

    push(moduleObj);
    aliases.push({});

    ts.forEachChild(node, function(node) {
      visit(node, name);
    });

    aliases.pop();
    pop();
  }

  function visitFunctionDeclaration(node, parentName) {
    var comment = getDoc(node);
    var name = node.name.text;

    if (!shouldIgnore(comment) && !isAliased(name)) {
      addAliases(comment, name);
      findGroups(node);

      if (comment) {
        setMemberIn(data, [name, "call", "doc"], comment);
      }

      var callSignature = parseCallSignature(node);
      callSignature.line = getLineNum(node);
      pushInMember(data, [name, "call", "signatures"], callSignature);
    }

    ts.forEachChild(node, visit);
  }

  function visitInterfaceDeclaration(node) {
    var comment = getDoc(node);
    var ignore = shouldIgnore(comment);
    var name = getInterfaceName(node);
    var wasStatic = isStatic;
    var existingInterfaceObj =
      data.groups && data.groups.length
        ? last(data.groups).members[name]
        : data[name];
    var interfaceObj =
      (existingInterfaceObj && existingInterfaceObj.class) || {};

    isStatic = isStaticInterface(node);

    if (!ignore) {
      findGroups(node);

      var lastGroup = last(data.groups);

      var isClass =
        isStatic ||
        (lastGroup.members &&
          lastGroup.members[name] &&
          lastGroup.members[name].class);

      if (!isStatic) {
        interfaceObj.line = getLineNum(node);

        if (comment) {
          interfaceObj.doc = comment;
        }
        if (node.typeParameters) {
          interfaceObj.typeParams = node.typeParameters.map(tp => tp.name.text);
        }

        typeParams.push(interfaceObj.typeParams);

        if (node.heritageClauses) {
          node.heritageClauses.forEach((hc, i) => {
            var kind;
            if (hc.token === ts.SyntaxKind.ExtendsKeyword) {
              kind = "extends";
            } else if (hc.token === ts.SyntaxKind.ImplementsKeyword) {
              kind = "implements";
            } else {
              throw new Error("Unknown heritageClause");
            }

            if (interfaceObj.isClass && kind === "extends") {
              interfaceObj.extends = [parseType(hc.types[0])];
              interfaceObj.implements = hc.types
                .slice(1)
                .map(c => parseType(c));
            } else {
              interfaceObj[kind] = hc.types.map(c => parseType(c));
            }
          });
        }
      }
      if (isClass) {
        interfaceObj.isClass = true;
      }

      setIn(
        lastGroup,
        ["members", name, isClass ? "class" : "interface"],
        interfaceObj
      );
    }

    push(interfaceObj);
    aliases.push({});

    ts.forEachChild(node, visit);

    if (!ignore && !isStatic) {
      typeParams.pop();
    }

    aliases.pop();
    pop();
    isStatic = wasStatic;
  }

  function findGroups(node) {
    var trivia = ts.getLeadingCommentRangesOfNode(node, source);
    if (trivia && trivia.length) {
      trivia.forEach(range => {
        if (range.kind === ts.SyntaxKind.SingleLineCommentTrivia) {
          pushIn(data, ["groups"], {
            title: source.text.substring(range.pos + 3, range.end)
          });
        }
      });
    }
  }

  function ensureGroup(node) {
    findGroups(node);

    if (!data.groups || data.groups.length === 0) {
      pushIn(data, ["groups"], {});
    }
  }

  function visitPropertySignature(node) {
    var comment = getDoc(node);
    var name = ts.getTextOfNode(node.name);
    if (!shouldIgnore(comment) && !isAliased(name)) {
      addAliases(comment, name);

      ensureGroup(node);

      var propertyObj = {
        line: getLineNum(node)
        // name: name // redundant
      };

      if (comment) {
        setIn(last(data.groups), ["members", "#" + name, "doc"], comment);
      }

      setIn(last(data.groups), ["members", "#" + name], propertyObj);

      if (node.questionToken) {
        throw new Error("NYI: questionToken");
      }

      if (node.typeAnnotation) {
        propertyObj.type = parseType(node.typeAnnotation.type);
      }
    }

    ts.forEachChild(node, visit);
  }

  function visitConstructorSignature(node) {
    var comment = getDoc(node);

    if (!shouldIgnore(comment)) {
      if (comment) {
        setIn(data, ["constructor", "doc"], comment);
      }

      var callSignature = parseCallSignature(node);
      callSignature.line = getLineNum(node);

      pushIn(data, ["constructor", "signatures"], callSignature);

      if (node.questionToken) {
        throw new Error("NYI: questionToken");
      }
    }

    ts.forEachChild(node, visit);
  }

  function visitMethodSignature(node, parentName) {
    var comment = getDoc(node);
    var name = ts.getTextOfNode(node.name);

    if (!shouldIgnore(comment) && !isAliased(name)) {
      addAliases(comment, name);

      if (isStatic) {
        setIn(data, ["statics", name, "doc"], comment);

        var callSignature = parseCallSignature(node);
        callSignature.line = getLineNum(node);
        pushIn(data, ["statics", name, "signatures"], callSignature);
      } else {
        ensureGroup(node);

        if (comment) {
          setIn(last(data.groups), ["members", "#" + name, "doc"], comment);
        }

        var callSignature = parseCallSignature(node);
        callSignature.line = getLineNum(node);
        pushIn(
          last(data.groups),
          ["members", "#" + name, "signatures"],
          callSignature
        );
      }

      if (node.questionToken) {
        throw new Error("NYI: questionToken");
      }
    }

    ts.forEachChild(node, visit);
  }

  function parseCallSignature(node) {
    var callSignature = {};

    if (node.typeParameters) {
      callSignature.typeParams = node.typeParameters.map(tp => tp.name.text);
    }

    typeParams.push(callSignature.typeParams);

    if (node.parameters.length) {
      callSignature.params = node.parameters.map(p => parseParam(p));
    }

    if (node.type) {
      callSignature.type = parseType(node.type);
    }

    typeParams.pop();

    return callSignature;
  }

  function parseType(node) {
    switch (node.kind) {
      case ts.SyntaxKind.NeverKeyword:
        return {
          k: TypeKind.NeverKeyword
        };
      case ts.SyntaxKind.AnyKeyword:
        return {
          k: TypeKind.Any
        };
      case ts.SyntaxKind.NullKeyword:
        return {
          k: TypeKind.Null
        };
      case ts.SyntaxKind.VoidKeyword:
        return {
          k: TypeKind.Void
        };
      case ts.SyntaxKind.ThisType:
        return {
          k: TypeKind.This
        };
      case ts.SyntaxKind.UndefinedKeyword:
        return {
          k: TypeKind.Undefined
        };
      case ts.SyntaxKind.BooleanKeyword:
        return {
          k: TypeKind.Boolean
        };
      case ts.SyntaxKind.NumberKeyword:
        return {
          k: TypeKind.Number
        };
      case ts.SyntaxKind.StringKeyword:
        return {
          k: TypeKind.String
        };
      case ts.SyntaxKind.UnionType:
        return {
          k: TypeKind.Union,
          types: node.types.map(parseType)
        };
      case ts.SyntaxKind.IntersectionType:
        return {
          k: TypeKind.Intersection,
          types: node.types.map(parseType)
        };
      case ts.SyntaxKind.TupleType:
        return {
          k: TypeKind.Tuple,
          types: node.elementTypes.map(parseType)
        };
      case ts.SyntaxKind.IndexedAccessType:
        return {
          k: TypeKind.Indexed,
          type: parseType(node.objectType),
          index: parseType(node.indexType)
        };
      case ts.SyntaxKind.TypeOperator:
        var operator =
          node.operator === ts.SyntaxKind.KeyOfKeyword
            ? "keyof"
            : node.operator === ts.SyntaxKind.ReadonlyKeyword
            ? "readonly"
            : undefined;
        if (!operator) {
          throw new Error(
            "Unknown operator kind: " + ts.SyntaxKind[node.operator]
          );
        }
        return {
          k: TypeKind.Operator,
          operator,
          type: parseType(node.type)
        };
      case ts.SyntaxKind.TypeLiteral:
        return {
          k: TypeKind.Object,
          members: node.members.map(m => {
            switch (m.kind) {
              case ts.SyntaxKind.IndexSignature:
                return {
                  index: true,
                  params: m.parameters.map(p => parseParam(p)),
                  type: parseType(m.type)
                };
              case ts.SyntaxKind.PropertySignature:
                return {
                  name: m.name.text,
                  type: m.type && parseType(m.type)
                };
            }
            throw new Error("Unknown member kind: " + ts.SyntaxKind[m.kind]);
          })
        };
      case ts.SyntaxKind.ArrayType:
        return {
          k: TypeKind.Array,
          type: parseType(node.elementType)
        };
      case ts.SyntaxKind.FunctionType:
        return {
          k: TypeKind.Function,
          typeParams: node.typeParameters && node.typeParameters.map(parseType),
          params: node.parameters.map(p => parseParam(p)),
          type: parseType(node.type)
        };
      case ts.SyntaxKind.TypeReference:
        var name = getNameText(node.typeName);
        if (isTypeParam(name)) {
          return {
            k: TypeKind.Param,
            param: name
          };
        }
        return {
          k: TypeKind.Type,
          name: getNameText(node.typeName),
          args: node.typeArguments && node.typeArguments.map(parseType)
        };
      case ts.SyntaxKind.ExpressionWithTypeArguments:
        return {
          k: TypeKind.Type,
          name: getNameText(node.expression),
          args: node.typeArguments && node.typeArguments.map(parseType)
        };
        return type;
      case ts.SyntaxKind.TypePredicate:
        return {
          k: TypeKind.Boolean
        };
      case ts.SyntaxKind.MappedType:
        // Simplification of MappedType to typical Object type.
        return {
          k: TypeKind.Object,
          members: [
            {
              index: true,
              params: [
                {
                  name: "key",
                  type: { k: TypeKind.String }
                }
              ],
              type: parseType(node.type)
            }
          ]
        };
    }
    throw new Error("Unknown type kind: " + ts.SyntaxKind[node.kind]);
  }

  function parseParam(node) {
    var p = {
      name: node.name.text,
      type: parseType(node.type)
    };
    if (node.dotDotDotToken) {
      p.varArgs = true;
    }
    if (node.questionToken) {
      p.optional = true;
    }
    if (node.initializer) {
      throw new Error("NYI: equalsValueClause");
    }
    return p;
  }
}

function getLineNum(node) {
  var source = ts.getSourceFileOfNode(node);
  return source.getLineAndCharacterOfPosition(node.getStart(source)).line;
}

var COMMENT_NOTE_RX = /^@(\w+)\s*(.*)$/;

var NOTE_BLACKLIST = {
  override: true
};

function getDoc(node) {
  var source = ts.getSourceFileOfNode(node);
  var trivia = last(ts.getLeadingCommentRangesOfNode(node, source));
  if (!trivia || trivia.kind !== ts.SyntaxKind.MultiLineCommentTrivia) {
    return;
  }

  var lines = source.text
    .substring(trivia.pos, trivia.end)
    .split("\n")
    .slice(1, -1)
    .map(l => l.trim().substr(2));

  var paragraphs = lines
    .filter(l => l[0] !== "@")
    .join("\n")
    .split("\n\n");

  var synopsis = paragraphs && paragraphs.shift();
  var description = paragraphs && paragraphs.join("\n\n");
  var notes = lines
    .filter(l => l[0] === "@")
    .map(l => l.match(COMMENT_NOTE_RX))
    .map(n => ({ name: n[1], body: n[2] }))
    .filter(note => !NOTE_BLACKLIST[note.name]);

  return {
    synopsis,
    description,
    notes
  };
}

function getNameText(node) {
  return ts.entityNameToString(node);
}

function getInterfaceName(node) {
  return /(.*?)(Constructor)?$/.exec(node.name.text)[1];
}

function isStaticInterface(node) {
  return getInterfaceName(node) !== node.name.text;
}

function last(list) {
  return list && list[list.length - 1];
}

function isLast(list, i) {
  return i === list.length - 1;
}

function pushInMember(obj, path, value) {
  if (obj.groups) {
    pushIn(last(obj.groups), ["members", ...path], value);
  } else {
    pushIn(obj, path, value);
  }
}

function pushIn(obj, path, value) {
  path.forEach((pathSegment, i) => {
    obj = obj.hasOwnProperty(pathSegment)
      ? obj[pathSegment]
      : (obj[pathSegment] = isLast(path, i) ? [] : {});
  });

  obj.push(value);
}

function setMemberIn(obj, path, value) {
  if (obj.groups) {
    setIn(last(obj.groups), ["members", ...path], value);
  } else {
    setIn(obj, path, value);
  }
}

function setIn(obj, path, value) {
  path.slice(0, -1).forEach(pathSegment => {
    obj = obj.hasOwnProperty(pathSegment)
      ? obj[pathSegment]
      : (obj[pathSegment] = {});
  });

  obj[last(path)] = value;
}

function shouldIgnore(comment) {
  return Boolean(
    comment &&
      comment.notes &&
      comment.notes.find(
        note => note.name === "ignore" || note.name === "deprecated"
      )
  );
}
