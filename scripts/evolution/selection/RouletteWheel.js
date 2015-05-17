define(['underscore', 'core/util', 'domain/genome'], function (_, util, genome) {
	// detailed here:  http://boxcar2d.com/about.html

	var Roulette = function(genomeMater){
		this.genomeMater = genomeMater;
	};

	Roulette.prototype = {
		getRandomGenome: function(selectableGenomes){
			// who knows why this does not return sometimes.  don't care.  evolution baby.
			return util.selectAtScore(selectableGenomes, _.random(0, 100)) || genome.createRandom();
		},
		nextGeneration: function(genomes, generationSize){
			// filter out negative scores
			genomes = _.filter(genomes, function(genome){
				return genome.score > 0;
			});

			// create new random genomes to complete generation
			for (var i = genomes.length; i < generationSize; i++){
				var newGenome = genome.createRandom();
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