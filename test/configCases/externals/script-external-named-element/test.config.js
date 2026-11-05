"use strict";

module.exports = {
	moduleScope(scope) {
		// Named access: `<div id="myGlobal">` resolves for the bare identifier but
		// isn't an own property of the global. Old `vm` contexts call a prototype
		// property of the global its own, so use scope.
		scope.myGlobal = scope.document.createElement("div");
	}
};
