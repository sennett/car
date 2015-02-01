define(function () {
	// does not breed passed genomes, just returns them

	var NoBreeding = function () {
	};

	NoBreeding.prototype = {
		nextGeneration: function(genomes){
			return genomes;
		}
	};

	return NoBreeding;
});