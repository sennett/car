define(['underscore'], function (_) {
	// does not breed passed genomes, just returns them

	var NoBreeding = function () {
	};

	NoBreeding.prototype = _.extend(NoBreeding.prototype, {
		nextGeneration: function(genomes){
			return genomes;
		}
	});

	return NoBreeding;
});