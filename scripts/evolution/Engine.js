define(['underscore', 'domain/generation'], function (_, generation) {
	
	var getGenomeId = function(){
		return this.currentGeneration + '-' + this.genomesSimulatedThisGeneration;
	};

	var Engine = function(evolutionAlgorithm){
		this.evolutionAlgorithm = evolutionAlgorithm;
		this.generationCount = 0;
	};

	Engine.prototype = _.extend(Engine.prototype, {
		nextGeneration: function(scoredGeneration){
			if (this.onNewGeneration)
				this.onNewGeneration();
			if (scoredGeneration)
				return this.evolutionAlgorithm.nextGeneration(scoredGeneration);
			else
				return generation.createRandom();
		}
	});

	return Engine;
});