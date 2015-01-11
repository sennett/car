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
		box2dweb: 'vendor/Box2dWeb-2.1.a.3'
	},
	shim: {
		box2dweb: {
			exports: 'Box2D'
		}
	}
});

require(['app'], function(App){
	new App().run();
});