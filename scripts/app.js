define([
	'environment/simulation',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/physicsWorldProvider',
	'environment/car',
	'environment/renderer',
	'environment/ticker'
], function(Simulation, groundData, GroundSegmentProvider, physicsWorldProvider, car, renderer, ticker){
	var App = function(){};
	App.prototype.run = function(){
		var world = new Simulation(new GroundSegmentProvider(), physicsWorldProvider, new renderer,ticker);
		world.setCar(car);
		world.setGround(groundData);
		world.start();
	};
	return App;
});