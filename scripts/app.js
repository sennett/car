define([
	'environment/simulationBuilder',
	'environment/car',
	'evolution/engineBuilder'
], function(simulationBuilder, car, evolutionEngineBuilder){

	var App = function(){};
	App.prototype.run = function(){
		var simulation = simulationBuilder.createSimulation(),
			evolutionEngine = evolutionEngineBuilder.createEvolutionEngine();

		simulation.onStop(function(score){
			evolutionEngine.registerScore(score);
			simulation.start(evolutionEngine.nextCar());
		});

		simulation.start(evolutionEngine.nextCar());
	};
	return App;
});