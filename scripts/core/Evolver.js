define(['underscore'], function(_){
	var Evolver = function(simulator, evolutionEngine){
		this.simulator = simulator;
		this.evolutionEngine = evolutionEngine;
	};

	var runEvolution = function(scoredGeneration){
		var nextGeneration = this.evolutionEngine.nextGeneration(scoredGeneration);
		this.simulator.runGeneration(nextGeneration, runEvolution.bind(this));
	};

	Evolver.prototype = _.extend(Evolver.prototype, {
		run: function(onRunning) {
			runEvolution.call(this);
			onRunning();
		}
	});

	return Evolver;
});