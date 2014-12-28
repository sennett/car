define(['environment/world'], function(world){
	var App = function(){};
	App.prototype.run = function(){
		world();
	};
	return App;
});