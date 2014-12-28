define([
	'environment/world',
	'environment/groundData',
	'environment/groundBodyGenerator',
	'environment/groundBodyConstructor',
], function(World, groundData, GroundBodyGenerator, groundBodyConstructor){
	var App = function(){};
	App.prototype.run = function(){
		var world = new World(new GroundBodyGenerator(groundBodyConstructor));
		world.setCar();
		world.setGround(groundData);
		world.start();
	};
	return App;
});