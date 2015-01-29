define([], function(){
	var App = function(simulation, evolutionEngine){
		this.simulation = simulation;
		this.evolutionEngine = evolutionEngine;
	};

	App.prototype = {
		run: function() {
			this.simulation.onStop(function (score) {
				this.evolutionEngine.registerScore(score);
				this.simulation.start(this.evolutionEngine.nextCar());
			});
			this.simulation.start(this.evolutionEngine.nextCar());
		}
	};

	return App;
});