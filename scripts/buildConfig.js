({
	"baseUrl": "./",

	modules: [
		{
			"name": "productionBuildWrapper",
			// exclude shallow because of some weirdness with wire.js
			"excludeShallow": ['underscore', 'ractiveRuntime', 'wire/wire', 'ractive'],
			"stubModules": ['rv', 'text']
		}
	],
	
	"dir": "../build",

	mainConfigFile: 'baseRequireConfig.js',

	paths: {
		'wire/builder/rjs': '../node_modules/wire-rjs-builder/builder'
	},
	
	optimize: "uglify2",
	removeCombined: true,
	waitSeconds: 7
})