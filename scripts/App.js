define([
	'environment/simulationBuilder',
	'environment/car',
	'evolution/engineBuilder'
], function(simulationBuilder, car, evolutionEngineBuilder){
	return function(){
		this.run = function(){
			var simulation = simulationBuilder.createSimulation(),
				evolutionEngine = evolutionEngineBuilder.createEvolutionEngine();

			simulation.onStop(function(score){
				evolutionEngine.registerScore(score);
				simulation.start(evolutionEngine.nextCar());
			});

			simulation.start(evolutionEngine.nextCar());
		};
	};
});