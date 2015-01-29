define(function() {

	var tick = function(){
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

	var Simulation = function(physicsWorldProvider, renderer, ticker, endStateDetector) {
		this.physicsWorldProvider = physicsWorldProvider;
		this.renderer = renderer;
		this.ticker = ticker;
		this.endStateDetector = endStateDetector;

		this.world = this.physicsWorldProvider.getWorld();
		this.world.SetContactListener(endStateDetector);
	};

	Simulation.prototype = {
		initialise: function(ground){
			ground.initialisePhysicsBodies(this.world);
			this.renderer.initialise(this.world);
		},

		start: function(car){
			this.car = car;
			car.initialisePhysicsBodies(this.world);
			this.renderer.followBody(this.car.body);
			this.endStateDetector.initialise(this.car.body);
			this.ticker.run(tick, this);
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