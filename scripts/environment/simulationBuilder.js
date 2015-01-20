define([
	'environment/Simulation',
	'environment/groundData',
	'environment/provider/GroundSegmentProvider',
	'environment/provider/PhysicsWorldProvider',
	'environment/Renderer',
	'environment/ticker',
	'environment/Ground',
	'environment/EndStateDetector'
], function(Simulation, groundData, GroundSegmentProvider, PhysicsWorldProvider, Renderer, ticker, Ground, EndStateDetector) {
	return {
		createSimulation:function () {
			var ground = new Ground(new GroundSegmentProvider());
			ground.setData(groundData);
			var simulation = new Simulation(new PhysicsWorldProvider, new Renderer, ticker, new EndStateDetector());
			simulation.initialise(ground);
			return simulation;
		}
	};
});
