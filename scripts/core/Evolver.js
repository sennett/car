define(['underscore', 'core/Car'], function(_, Car){
	var Evolver = function(simulation, evolutionEngine){
		this.simulation = simulation;
		this.evolutionEngine = evolutionEngine;
	};

	

	Evolver.prototype = _.extend(Evolver.prototype, {
		run: function() {
			this.simulation.runGeneration(this.evolutionEngine.nextGeneration());
		}
	});

	return Evolver;
});