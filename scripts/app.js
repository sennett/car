define([
	'environment/simulationBuilder',
	'environment/car'
], function(simulationBuilder, car){
	var App = function(){};
	App.prototype.run = function(){
		var simulation = simulationBuilder.createSimulation();

		simulation.onStop(function(score){
			console.log('stopped: travelled ' + score + 'm');
			simulation.start(car);
		});

		simulation.start(car);
	};
	return App;
});