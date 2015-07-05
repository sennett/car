define(['underscore', 'domain/generation', 'core/appConfig', 'util/callbackList'], function (_, generation, config, callbackList) {

	var Engine = function(scoreNotifier){
		this.scoreNotifier = scoreNotifier;
		this.generationCount = 0;
		this.mutationRate = config.defaultMutationRate;
		this.onNewGenerationCallbacks = callbackList.create();
	};

	Engine.prototype = _.extend(Engine.prototype, {
		nextGeneration: function(scoredGeneration){
			this.generationCount++;
			this.scoreNotifier.runningGeneration(this.generationCount);
			this.onNewGenerationCallbacks.callAll(this.generationCount, this.generationCount);
			if (scoredGeneration)
				return scoredGeneration.createViaRoulette(this.mutationRate);
			else
				return generation.createRandom();
		},
		updateMutationRate: function(mutationRate, onCompleteResponse){
			this.mutationRate = mutationRate;
			onCompleteResponse.success(mutationRate + " will be used from next generation", mutationRate);
		},
		onNewGeneration: function(cb){
			this.onNewGenerationCallbacks.register(cb);
		}
	});

	return Engine;
});