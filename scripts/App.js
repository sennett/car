define(['underscore'], function(_){
	var App = function(simulation, evolutionEngine){
		this.simulation = simulation;
		this.evolutionEngine = evolutionEngine;
	};

	App.prototype = {
		run: function() {
			console.log('running');
			this.simulation.onStop(_.bind(function (score) {
				this.evolutionEngine.registerScore(score);
				this.simulation.start(this.evolutionEngine.nextCar());
			}, this));
			this.simulation.start(this.evolutionEngine.nextCar());
		}
	};

	return App;
});