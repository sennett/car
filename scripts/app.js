define([
	'environment/world',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/physicsWorldProvider',
	'environment/car'
], function(World, groundData, GroundSegmentProvider, physicsWorldProvider, car){
	var App = function(){};
	App.prototype.run = function(){
		var world = new World(new GroundSegmentProvider(), physicsWorldProvider);
		world.setCar(car);
		world.setGround(groundData);
		world.start();
	};
	return App;
});