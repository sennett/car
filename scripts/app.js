define([
	'environment/simulation',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/physicsWorldProvider',
	'environment/car',
	'environment/renderer',
	'environment/ticker',
	'environment/ground'
], function(Simulation, groundData, GroundSegmentProvider, physicsWorldProvider, car, renderer, ticker, ground){
	var App = function(){};
	App.prototype.run = function(){
		var simulation = new Simulation(new GroundSegmentProvider(), physicsWorldProvider, new renderer,ticker);
		simulation.setCar(car);
		simulation.setGround(new ground(groundData));
		simulation.onStop(function(score){
			alert('stopped');
		});
		simulation.start();
	};
	return App;
});