define(['underscore'], function(_){
	var Evolver = function(simulator, evolutionEngine){
		this.simulator = simulator;
		this.evolutionEngine = evolutionEngine;
	};

	var runEvolution = function(scoredGeneration){
		var nextGeneration = scoredGeneration ? 
			this.evolutionEngine.nextGeneration(scoredGeneration)
			: this.evolutionEngine.nextGeneration();
		this.simulator.runGeneration(nextGeneration, runEvolution.bind(this));
	};

	Evolver.prototype = _.extend(Evolver.prototype, {
		run: function() {
			runEvolution.call(this);
		}
	});

	return Evolver;
});