define([
	'environment/world',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/groundBodyProvider',
	'environment/provider/physicsWorldProvider'
], function(World, groundData, GroundSegmentProvider, groundBodyConstructor, physicsWorldProvider){
	var App = function(){};
	App.prototype.run = function(){
		var world = new World(new GroundSegmentProvider(groundBodyConstructor), physicsWorldProvider);
		world.setCar();
		world.setGround(groundData);
		world.start();
	};
	return App;
});