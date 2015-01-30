define(['underscore', 'core/Car'], function(_, Car){
	var App = function(simulation, evolutionEngine){
		this.simulation = simulation;
		this.evolutionEngine = evolutionEngine;
	};

	App.prototype = {
		run: function() {
			this.simulation.onStop(_.bind(function (score) {
				this.evolutionEngine.registerScore(score);
				this.simulation.start(new Car(this.evolutionEngine.nextGenome()));
			}, this));
			this.simulation.start(new Car(this.evolutionEngine.nextGenome()));
		}
	};

	return App;
});