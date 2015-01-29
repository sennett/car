define([], function(){
	var App = function(simulation, evolutionEngine){
		this.simulation = simulation;
		this.evolutionEngine = evolutionEngine;
		debugger;
	};

	App.prototype = {
		run: function() {
			this.simulation.onStop(function (score) {
				this.evolutionEngine.registerScore(score);
				this.simulation.start(evolutionEngine.nextCar());
			});
			this.simulation.start(evolutionEngine.nextCar());
		}
	};

	return App;
});