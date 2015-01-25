(function(curl) {

	var config = {
		packages: [
			{ name: 'curl', location: 'bower_components/curl/src/curl', main: 'curl' },
			{ name: 'wire', location: 'bower_components/wire', main: 'wire' },
			{ name: 'when', location: 'bower_components/when', main: 'when' },
			{ name: 'meld', location: 'bower_components/meld', main: 'meld' },
			{ name: 'poly', location: 'bower_components/poly', main: 'poly' }
		]
	};

	curl(config, ['wire!app/wireSpec']);

})(curl);