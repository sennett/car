define(['underscore', 'domain/generation'], function (_, generation) {
	
	var getGenomeId = function(){
		return this.currentGeneration + '-' + this.genomesSimulatedThisGeneration;
	};

	var Engine = function(evolutionAlgorithm){
		this.evolutionAlgorithm = evolutionAlgorithm;
	};

	Engine.prototype = _.extend(Engine.prototype, {
		generationSize: 20,
		currentGenomes: [],
		genomesSimulatedThisGeneration: 0,
		nextGeneration: function(scoredGeneration){
			if (scoredGeneration)
				return this.evolutionAlgorithm.nextGeneration(scoredGeneration);
			else
				return generation.createRandom();
		}
	});

	return Engine;
});