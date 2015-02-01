({
	"name": "productionBuildWrapper",
	"baseUrl": "./",
	"out": "../build/main.js",

	mainConfigFile: 'main.js',

	paths: {
		'wire/builder/rjs': '../node_modules/wire-rjs-builder/builder'
	},

	optimize: "uglify",
	removeCombined: true

})