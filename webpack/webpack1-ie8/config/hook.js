class ModulePlugin {
	constructor(fn) {
		this.handle = typeof fn === "function" ? fn : null;
	}
	checkModule = module => {
		const { request, context, ...rest } = module || {};
		// eslint-disable-next-line no-console
		console.log("------\n", request, "\n",
			context, "\n", rest, "\n------");
		return this.handle ? this.handle(module) : module;
	};
	apply = compiler => {
		compiler.hooks.normalModuleFactory.tap(
			"ModulePlugin", normalModuleFactory =>
				normalModuleFactory.hooks.beforeResolve
					.tap("ModulePlugin", this.checkModule));
		compiler.hooks.contextModuleFactory.tap(
			"ModulePlugin", contextModuleFactory =>
				contextModuleFactory.hooks.beforeResolve
					.tap("ModulePlugin", this.checkModule));
	};
}
module.exports = ModulePlugin;