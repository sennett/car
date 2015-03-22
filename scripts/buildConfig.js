({
	"baseUrl": "./",

	modules: [
		{
			"name": "productionBuildWrapper",
			// exclude shallow because of some weirdness with wire.js
			"excludeShallow": ['underscore', 'ractive', 'wire/wire'],
			"stubModules": ['rv', 'text']
		}
	],
	
	"dir": "../build",

	mainConfigFile: 'baseRequireConfig.js',

	paths: {
		'wire/builder/rjs': '../node_modules/wire-rjs-builder/builder'
	},
	
	optimize: "none",
	removeCombined: true,
	waitSeconds: 7
})