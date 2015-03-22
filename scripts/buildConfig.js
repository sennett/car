({
	"baseUrl": "./",

	modules: [
		{
			"name": "main",
			"exclude": ['underscore', 'ractive'],
			"stubModules": ['rv'],
			//insertRequire: ['main']
		}
	],

	"dir": "../build",

	mainConfigFile: 'main.js',

	paths: {
		'wire/builder/rjs': '../node_modules/wire-rjs-builder/builder'
	},

	optimize: "uglify",
	removeCombined: true,
	waitSeconds: 7
})