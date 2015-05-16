define(['underscore', 'domain/generation'], function (_, generation) {
	
	var getGenomeId = function(){
		return this.currentGeneration + '-' + this.genomesSimulatedThisGeneration;
	};

	var Engine = function(evolutionAlgorithm, scoreNotifier){
		this.evolutionAlgorithm = evolutionAlgorithm;
		this.scoreNotifier = scoreNotifier;
		this.generationCount = 0;
	};

	Engine.prototype = _.extend(Engine.prototype, {
		nextGeneration: function(scoredGeneration){
			this.generationCount++;
			this.scoreNotifier.runningGeneration(this.generationCount);
			if (this.onNewGeneration)
				this.onNewGeneration(this.generationCount);
			if (scoredGeneration)
				return this.evolutionAlgorithm.nextGeneration(scoredGeneration);
			else
				return generation.createRandom();
		}
	});

	return Engine;
});