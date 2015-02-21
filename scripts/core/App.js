define(['underscore', 'core/Car'], function(_, Car){
	var App = function(simulation, evolutionEngine, ticker){
		this.simulation = simulation;
		this.evolutionEngine = evolutionEngine;
		this.ticker = ticker;
	};

	var getGenomeAndStart = function(){
		this.genome = this.evolutionEngine.nextGenome();
		this.simulation.start(new Car(this.genome));
	};

	App.prototype = {
		run: function() {
			try {
				this.simulation.onStop(_.bind(function (score) {
					this.evolutionEngine.registerScore(score, this.genome);
					getGenomeAndStart.call(this);
				}, this));
				getGenomeAndStart.call(this);
			} catch (e){
				this.ticker.stop();
				throw e;
			}
		}
	};

	return App;
});