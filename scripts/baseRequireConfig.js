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
		ractiveTransitionsFade: '../bower_components/ractive-transitions-fade/dist/ractive-transitions-fade',
		Spinner: '../bower_components/spin.js/spin',
		css: '../bower_components/require-css/css',
		'Highcharts': '../bower_components/highcharts/highcharts.src',
		'HighchartsStandalone': '../bower_components/highcharts/adapters/standalone-framework.src'
	},
	shim: {
		box2dweb: {
			exports: 'Box2D'
		},
		Highcharts: {
			exports: 'Highcharts',
			deps: ['HighchartsStandalone']
		}
	},
	
	deps: ['main']
});