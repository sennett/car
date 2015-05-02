define(['underscore'], function(_){
	var Evolver = function(simulator, evolutionEngine){
		this.simulator = simulator;
		this.evolutionEngine = evolutionEngine;
	};

	var runGeneration = function(scoredGeneration){
		var nextGeneration = scoredGeneration ? 
			this.evolutionEngine.nextGeneration(scoredGeneration)
			: this.evolutionEngine.nextGeneration();
		this.simulator.runGeneration(nextGeneration, runGeneration.bind(this));
	};

	Evolver.prototype = _.extend(Evolver.prototype, {
		run: function() {
			runGeneration.call(this);
		}
	});

	return Evolver;
});