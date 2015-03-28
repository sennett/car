// requirejs base config
require.config({
	baseUrl: "scripts",
	packages: [
		{ name: 'wire', location: '../bower_components/wire', main: 'wire' },
		{ name: 'when', location: '../bower_components/when', main: 'when' },
		{ name: 'meld', location: '../bower_components/meld', main: 'meld' }
	],
	paths:{
		box2dweb: 'vendor/Box2dWeb-2.1.a.3',
		underscore: '../bower_components/underscore/underscore',
		ractive: '../bower_components/ractive/ractive',
		rv: '../bower_components/rv/rv',
		require: '../bower_components/requirejs/require',
		ractiveRuntime: '../bower_components/ractive/ractive.runtime',
		Spinner: '../bower_components/spin.js/spin'
	},
	shim: {
		box2dweb: {
			exports: 'Box2D'
		}
	},
	deps: ['main']
});