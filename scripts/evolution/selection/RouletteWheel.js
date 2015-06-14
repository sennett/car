define([
	'underscore', 'core/util', 'domain/genome', 'core/appConfig', 'domain/generation'], 
	function (_, util, genome, config, generation) {
	// todo:  move this into generation domain obj
	// detailed here:  http://boxcar2d.com/about.html

	var selectRandomGenome = function (selectableGenomes){
		// who knows why this does not return sometimes.  don't care.  evolution baby.
		return util.selectAtScore(selectableGenomes, _.random(0, 100)) || genome.createRandom();
	};
	
	var Roulette = function(){
	};

	Roulette.prototype = _.extend(Roulette.prototype, {
		nextGeneration: function(generation){
			// filter out negative scores
			var genomes = _.filter(generation.genomes, function(genome){
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

				var children = parentOne.mate(parentTwo);
				children.one.mutate();
				children.two.mutate();
				nextGeneration.genomes.push(children.one);
				nextGeneration.genomes.push(children.two);
			}
			return nextGeneration;
		}
	});

	return Roulette;
});