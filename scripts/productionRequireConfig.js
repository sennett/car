require.config({
	baseUrl: "./",
	packages: [
		{ name: 'wire', location: '../bower_components/wire', main: 'wire' },
		{ name: 'when', location: '../bower_components/when', main: 'when' },
		{ name: 'meld', location: '../bower_components/meld', main: 'meld' }
	],
	paths:{
		'underscore': [
			'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
			'underscore'
		],
		'require': [
			'//cdnjs.cloudflare.com/ajax/libs/require.js/2.1.16/require.min',
			'require'
		],
		'ractiveRuntime': [
			'//cdn.ractivejs.org/0.6.1/ractive',
			'ractiveRuntime'
		],
		'wire/wire': ['wire.min'],
		'box2dweb': 'vendor/Box2dWeb-2.1.a.3'
	},
	shim: {
		box2dweb: {
			exports: 'Box2D'
		}
	},
	deps: ['productionBuildWrapper']
});
