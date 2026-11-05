// let queued microtasks run so the script external's `loadScript` has appended
// its <script> tag before we look for it
const tick = () => new Promise(resolve => setTimeout(resolve, 0));

it("should load the script external even when a named element has its global name", async () => {
	// `<div id="myGlobal">` in the page, see `test.config.js`
	expect(typeof myGlobal).toBe("object");
	expect(Object.prototype.hasOwnProperty.call(globalThis, "myGlobal")).toBe(
		false
	);

	const promise = import("myExternal");
	await tick();

	// the element must not count as the already loaded script
	const script = document.head._children.find(
		child => child.nodeName === "SCRIPT" && child.onload
	);
	expect(script).toBeDefined();
	expect(script.src).toBe("https://test.cases/path/external.js");

	// the script declares the global like `var myGlobal = ...` would
	myGlobal = { loaded: true };
	script.onload({ type: "load", target: script });

	const external = await promise;
	expect(external.loaded).toBe(true);
});
