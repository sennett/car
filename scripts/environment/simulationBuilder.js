define([
	'di-lite',
	'environment/Simulation',
	'environment/groundData',
	'environment/provider/GroundSegmentProvider',
	'environment/provider/PhysicsWorldProvider',
	'environment/Renderer',
	'environment/Ticker',
	'environment/Ground',
	'environment/EndStateDetector'
], function(di, Simulation, groundData, GroundSegmentProvider, PhysicsWorldProvider, Renderer, Ticker, Ground, EndStateDetector) {
	return {
		createSimulation:function () {

			var ground = new Ground(new GroundSegmentProvider());
			ground.setData(groundData);
			var simulation = new Simulation(new PhysicsWorldProvider, new Renderer, new Ticker, new EndStateDetector());
			simulation.initialise(ground);
			return simulation;
		}
	};
});
