define([], function(){
	return function(simulation, evolutionEngine){
		this.run = function(){
			simulation.onStop(function(score){
				evolutionEngine.registerScore(score);
				simulation.start(evolutionEngine.nextCar());
			});

			simulation.start(evolutionEngine.nextCar());
		};
	};
});