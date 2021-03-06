define(['underscore', 'domain/generation', 'core/appConfig'], function (_, generation, config) {

	var Engine = function(scoreNotifier){
		this.scoreNotifier = scoreNotifier;
		this.generationCount = 0;
		this.mutationRate = config.defaultMutationRate;
	};

	Engine.prototype = _.extend(Engine.prototype, {
		nextGeneration: function(scoredGeneration){
			this.generationCount++;
			this.scoreNotifier.runningGeneration(this.generationCount);
			if(this.onNewGeneration)
				this.onNewGeneration(this.generationCount, this.generationCount);
			if (scoredGeneration)
				return scoredGeneration.createViaRoulette(this.mutationRate);
			else
				return generation.createRandom();
		},
		updateMutationRate: function(mutationRate, onCompleteResponse){
			this.mutationRate = mutationRate;
			onCompleteResponse.success(mutationRate + " will be used from next generation", mutationRate);
		}
	});

	return Engine;
});