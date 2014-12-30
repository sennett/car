define([
	'environment/world',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/physicsWorldProvider'
], function(World, groundData, GroundSegmentProvider, physicsWorldProvider){
	var App = function(){};
	App.prototype.run = function(){
		var world = new World(new GroundSegmentProvider(), physicsWorldProvider);
		world.setCar();
		world.setGround(groundData);
		world.start();
	};
	return App;
});