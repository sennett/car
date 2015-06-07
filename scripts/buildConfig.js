({
	"baseUrl": "./",

	modules: [
		{
			"name": 'main'
		},
		{
			"name": "productionBuildWrapper",
			// exclude shallow because of some weirdness with wire.js
			"excludeShallow": ['wire/wire'],
			"stubModules": ['rv', 'text'],
			exclude: ['main', 'Spinner', 'normalize', 'underscore', 'ractiveRuntime', 'box2dweb', 'ractive']
		}
	],
	
	"dir": "../build",

	mainConfigFile: 'baseRequireConfig.js',

	paths: {
		'wire/builder/rjs': '../node_modules/wire-rjs-builder/builder',
		'css-builder': '../bower_components/require-css/css-builder',
		// not sure why it can't find it here...
		'normalize': '../bower_components/require-css/normalize'
	},

	pragmasOnSave: {
		excludeRequireCss: true
	},
	
	optimize: "none",
	removeCombined: true,
	waitSeconds: 7
})