define(['underscore', 'core/util'], function (_, util) {
	// currently incomplete.  uses roulette wheel selection
	// detailed here:  http://boxcar2d.com/about.html

	var Roulette = function(genomeMater){
		this.genomeMater = genomeMater;
	};

	Roulette.prototype = {
		nextGeneration: function(genomes){
			var nextGeneration = [];
			while(genomes.length){
				var parentOne = util.selectAtScore(genomes, _.random(0, 100));
				genomes = _.without(genomes, parentOne);
				var parentTwo = util.selectAtScore(genomes, _.random(0, 100));
				genomes = _.without(genomes, parentTwo);
				var children = this.genomeMater.mate(parentOne, parentTwo);
				children.one.mutate();
				children.two.mutate();
				nextGeneration.push(children.one);
				nextGeneration.push(children.two);
			}
			return nextGeneration;
		}
	};

	return Roulette;
});