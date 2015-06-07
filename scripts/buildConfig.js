({
	"baseUrl": "./",

	modules: [
		{
			name: "Spinner"	
		},
		{
			"name": 'main',
			// exclude shallow because `exclude` also excludes main from output (?)
			excludeShallow: ['Spinner']
		},
		{
			"name": "productionBuildWrapper",
			// exclude shallow because of some weirdness with wire.js
			"excludeShallow": ['underscore', 'ractiveRuntime', 'wire/wire', 'ractive', 'box2dweb', 'css/normalize'],
			"stubModules": ['rv', 'text']
		}
	],
	
	"dir": "../build",

	mainConfigFile: 'baseRequireConfig.js',

	paths: {
		'wire/builder/rjs': '../node_modules/wire-rjs-builder/builder',
		'css-builder': '../bower_components/require-css/css-builder',
		'normalize': '../bower_components/require-css/normalize'
	},
	
	optimize: "uglify2",
	removeCombined: true,
	waitSeconds: 7
})