define(['underscore', 'core/util'], function (_, util) {
	// currently incomplete.  uses roulette wheel selection
	// detailed here:  http://boxcar2d.com/about.html

	var Roulette = function(genomeMater, randomGenomeGenerator){
		this.genomeMater = genomeMater;
		this.randomGenomeGenerator = randomGenomeGenerator;
	};

	Roulette.prototype = {
		nextGeneration: function(genomes, generationSize){
			// filter out negative scores
			genomes = _.filter(genomes, function(genome){
				return genome.score > 0;
			});

			// create new random genomes to complete generation
			for (var i = genomes.length; i < generationSize; i++){
				var newGenome = this.randomGenomeGenerator.getOne();
				newGenome.score = 0.1;
				genomes.push(newGenome);
			}

			var nextGeneration = [];
			while(nextGeneration.length <= generationSize){
				var parentOne = util.selectAtScore(genomes, _.random(0, 100));
				var genomesWithoutParentOne = _.without(genomes, parentOne);

				var parentTwo = util.selectAtScore(genomesWithoutParentOne, _.random(0, 100));

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