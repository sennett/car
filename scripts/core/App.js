define(['underscore', 'core/Car'], function(_, Car){
	var App = function(simulation, evolutionEngine){
		this.simulation = simulation;
		this.evolutionEngine = evolutionEngine;
		this.highScore = 0;
	};

	var getGenomeAndStart = function(){
		this.genome = this.evolutionEngine.nextGenome();
		this.simulation.start(new Car(this.genome));
	};

	App.prototype = {
		run: function() {
			this.simulation.onStop(_.bind(function (score) {
				if (score > this.highScore) {
					this.highScore = score;
					console.log("new highscore: " + this.highScore);
				}
				this.evolutionEngine.registerScore(score, this.genome);
				getGenomeAndStart.call(this);
			}, this));
			getGenomeAndStart.call(this);
		}
	};

	return App;
});