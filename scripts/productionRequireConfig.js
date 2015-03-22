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
		'ractive': [
			'//cdnjs.cloudflare.com/ajax/libs/ractive.js/0.3.7/ractive.min',
			'ractive'
		],
		'wire/wire': ['wire.min']
	},
	shim: {
		box2dweb: {
			exports: 'Box2D'
		}
	},
	waitSeconds: 1,
	deps: ['productionBuildWrapper']
});
