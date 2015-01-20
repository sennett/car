require.config({
	baseUrl: './scripts',
	packages: [
		{
			name: 'underscore',
			location: 'vendor',
			main: 'underscore'
		}
	],
	paths:{
		box2dweb: 'vendor/Box2dWeb-2.1.a.3',
		'di-lite': 'vendor/di-lite'
	},
	shim: {
		box2dweb: {
			exports: 'Box2D'
		},
		'di-lite': {
			exports: 'di'
		}
	}
});

require(['App'], function(App){
	new App().run();
});