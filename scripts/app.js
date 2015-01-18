define([
	'environment/simulation',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/physicsWorldProvider',
	'environment/car',
	'environment/renderer',
	'environment/ticker',
	'environment/ground'
], function(Simulation, groundData, GroundSegmentProvider, physicsWorldProvider, car, Renderer, ticker, Ground){
	var App = function(){};
	App.prototype.run = function(){
		var ground = new Ground(new GroundSegmentProvider());
		ground.setData(groundData);
		var simulation = new Simulation(physicsWorldProvider, new Renderer, ticker);
		simulation.setCar(car);
		simulation.setGround(ground);
		simulation.onStop(function(score){
			alert('stopped');
		});
		simulation.start();
	};
	return App;
});