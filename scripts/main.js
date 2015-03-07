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
		underscore: 'vendor/underscore',
		ractive: '../bower_components/ractive/ractive',
		rv: '../bower_components/rv/rv'
	},
	shim: {
		box2dweb: {
			exports: 'Box2D'
		}
	},
	waitSeconds: 1,
	deps: ['wire!wireSpec']
});

//define(['wire!wireSpec'], function () {
//	return {};
//});