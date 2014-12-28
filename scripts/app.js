define(['environment/world'], function(World){
	var App = function(){};
	App.prototype.run = function(){
		var world = new World();
		world.setCar();
		world.start();
	};
	return App;
});