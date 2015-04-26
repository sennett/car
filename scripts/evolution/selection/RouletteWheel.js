define(['underscore', 'core/util'], function (_, util) {
	// detailed here:  http://boxcar2d.com/about.html

	var Roulette = function(genomeMater, randomGenomeGenerator){
		this.genomeMater = genomeMater;
		this.randomGenomeGenerator = randomGenomeGenerator;
	};

	Roulette.prototype = {
		getRandomGenome: function(selectableGenomes){
			// who knows why this does not return sometimes.  don't care.  evolution baby.
			return util.selectAtScore(selectableGenomes, _.random(0, 100)) || this.randomGenomeGenerator.getOne();
		},
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
				var parentOne = this.getRandomGenome(genomes);
				var genomesWithoutParentOne = _.without(genomes, parentOne);

				var parentTwo = this.getRandomGenome(genomesWithoutParentOne);

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