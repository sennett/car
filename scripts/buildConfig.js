({
	"baseUrl": "./",

	modules: [
		{
			"name": "productionBuildWrapper",
			"exclude": ['underscore', 'ractive'],
			"stubModules": ['rv', 'text'],
			//insertRequire: ['main']
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