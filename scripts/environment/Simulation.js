define(['environment/groundData'], function(groundData) {

	var tick = function(){
		console.log('tick');
		if (this.endStateDetector.simulationEnded())
			this.end();
		this.world.Step(
			1 / 60   //frame-rate
			,  10       //velocity iterations
			,  10       //position iterations
		);
		this.renderer.render();
		this.world.ClearForces();
	};

	var Simulation = function(physicsWorldProvider, renderer, ticker, endStateDetector, ground, fastForwardDomNode) {
		console.log(fastForwardDomNode);
		this.physicsWorldProvider = physicsWorldProvider;
		this.renderer = renderer;
		this.ticker = ticker;
		this.endStateDetector = endStateDetector;
		this.ground = ground;
		this.ground.setData(groundData);

		this.world = this.physicsWorldProvider.getWorld();
		this.world.SetContactListener(endStateDetector);
		this.ground.initialisePhysicsBodies(this.world);
		this.renderer.initialise(this.world);
	};

	Simulation.prototype = {

		start: function(car){
			this.car = car;
			car.initialisePhysicsBodies(this.world);
			this.renderer.followBody(this.car.body);
			this.endStateDetector.initialise(this.car.body);
			this.ticker.run(tick.bind(this));
		},

		end: function(){
			this.ticker.stop();
			this.renderer.reset();
			this.car.destroyPhysicsBodies();
			if (this.stopCallback)
				this.stopCallback(this.car.body.GetPosition().x);
		},

		onStop: function(callback) {
			this.stopCallback = callback;
		}
	};

	return Simulation;
});