define([
	'environment/Simulation',
	'environment/groundData',
	'environment/provider/GroundSegmentProvider',
	'environment/provider/physicsWorldProvider',
	'environment/Renderer',
	'environment/ticker',
	'environment/ground',
	'environment/endStateDetector'
], function(Simulation, groundData, GroundSegmentProvider, physicsWorldProvider, Renderer, ticker, Ground, EndStateDetector) {
	return {
		createSimulation:function () {
			var ground = new Ground(new GroundSegmentProvider());
			ground.setData(groundData);
			var simulation = new Simulation(physicsWorldProvider, new Renderer, ticker, new EndStateDetector());
			simulation.initialise(ground);
			return simulation;
		}
	};
});
