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

  var def = defs.groups.find(group => group.members[pathSegments[0]]).members[
    pathSegments[0]
  ];

  pathSegments.slice(1).forEach(part => {
    def =
      def &&
      def.module &&
      def.module.groups.find(group => group.members[part]).members[part];
  });

  return def;
};
