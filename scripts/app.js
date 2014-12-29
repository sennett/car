define([
	'environment/world',
	'environment/groundData',
	'environment/groundBodyGenerator',
	'environment/groundBodyConstructor',
	'environment/provider/physicsWorldProvider'
], function(World, groundData, GroundBodyGenerator, groundBodyConstructor, physicsWorldProvider){
	var App = function(){};
	App.prototype.run = function(){
		var world = new World(new GroundBodyGenerator(groundBodyConstructor), physicsWorldProvider);
		world.setCar();
		world.setGround(groundData);
		world.start();
	};
	return App;
});