require.config({
	baseUrl: './scripts',
	packages: [
		{
			name: 'physicsjs',
			location: 'vendor',
			main: 'physicsjs-full.min'
		},{
			name: 'underscore',
			location: 'vendor',
			main: 'underscore'
		}
	]
});

require(['app'], function(App){
	new App().run();
});