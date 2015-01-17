define([
	'environment/simulation',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/physicsWorldProvider',
	'environment/car',
	'environment/renderer'
], function(Simulation, groundData, GroundSegmentProvider, physicsWorldProvider, car, renderer){
	var App = function(){};
	App.prototype.run = function(){
		var world = new Simulation(new GroundSegmentProvider(), physicsWorldProvider, new renderer);
		world.setCar(car);
		world.setGround(groundData);
		world.start();
	};
	return App;
});