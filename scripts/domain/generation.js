define(['underscore', 'core/appConfig', 'domain/genome', 'core/util'], function(_, config, genome, util) {
	var selectRandomGenome = function (selectableGenomes){
		// who knows why this does not return sometimes.  don't care.  evolution baby.
		return util.selectAtScore(selectableGenomes, _.random(0, 100)) || genome.createRandom();
	};
	
	var resetPreviousInstantiation = function(){
		this.genomes = [];
	};
	
    var generation = {
		genomes: [],
		createRandom: function(){
			var newGeneration = this.createNew();
			for (var i = 0; i < config.generationSize; i++)
				newGeneration.genomes.push(genome.createRandom());
			return newGeneration;
		},
		serialise: function(){
			return {
				genomes: _.map(this.genomes, function(genome) {
					return genome.serialise();
				})
			}
		},
		createNew: function(){
			var newGeneration = _.extend({}, this);
			resetPreviousInstantiation.call(newGeneration);
			return newGeneration;
		},
		// roulette selection detailed here:  http://boxcar2d.com/about.html
		createViaRoulette: function(mutationRate){
			// filter out negative scores
			var genomes = _.filter(this.genomes, function(genome){
				return genome.score > 0;
			});

			// create new random genomes to complete generation
			for (var i = genomes.length; i < config.generationSize; i++){
				var newGenome = genome.createRandom();
				newGenome.score = 0.1;
				genomes.push(newGenome);
			}

			var nextGeneration = generation.createNew();
			while(nextGeneration.genomes.length < config.generationSize){
				var parentOne = selectRandomGenome(genomes);
				var genomesWithoutParentOne = _.without(genomes, parentOne);

				var parentTwo = selectRandomGenome(genomesWithoutParentOne);

				var children = parentOne.mate(parentTwo, mutationRate);
				nextGeneration.genomes.push(children.one);
				nextGeneration.genomes.push(children.two);
			}
			return nextGeneration;
		}
	};
	
	return generation;
});