define([
	'environment/simulation',
	'environment/groundData',
	'environment/provider/groundSegmentProvider',
	'environment/provider/physicsWorldProvider',
	'environment/car',
	'environment/renderer',
	'environment/ticker',
	'environment/ground',
	'environment/endStateDetector'
], function(Simulation, groundData, GroundSegmentProvider, physicsWorldProvider, car, Renderer, ticker, Ground, EndStateDetector){
	var App = function(){};
	App.prototype.run = function(){
		var ground = new Ground(new GroundSegmentProvider());
		ground.setData(groundData);
		var simulation = new Simulation(physicsWorldProvider, new Renderer, ticker, new EndStateDetector());
		simulation.initialise(ground);
		simulation.onStop(function(score){
			console.log('stopped: travelled ' + score + 'm');
			simulation.start(car);
		});
		simulation.start(car);
	};
	return App;
});