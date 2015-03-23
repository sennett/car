({
	baseUrl: "./",
	name: "wire",
	out: "../build/wire.min.js",
	optimize: "uglify2",
	packages: [
		{ name: 'wire', location: '../bower_components/wire', main: 'wire' },
		{ name: 'when', location: '../bower_components/when', main: 'when' },
		{ name: 'meld', location: '../bower_components/meld', main: 'meld' }
	]
})