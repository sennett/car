define(function () {
	var NoBreeding = function () {
	};

	NoBreeding.prototype = {
		nextGeneration: function(genomes){
			return genomes;
		}
	};

	return NoBreeding;
});