define(function() {

	var Simulation = function Simulation(physicsWorldProvider, renderer, ticker, endStateDetector) {
		var _this = this;

		this.physicsWorldProvider = physicsWorldProvider;
		this.renderer = renderer;
		this.ticker = ticker;
		this.endStateDetector = endStateDetector;

		this.world = this.physicsWorldProvider.world();
		this.world.SetContactListener(endStateDetector);

		var tick = function(){
			if (_this.endStateDetector.simulationEnded())
				_this.end();
			_this.world.Step(
				1 / 60   //frame-rate
				,  10       //velocity iterations
				,  10       //position iterations
			);
			_this.renderer.render();
			_this.world.ClearForces();
		};

		this.initialise = function(ground){
			ground.initialisePhysicsBodies(_this.world);
			_this.renderer.initialise(_this.world);
		};

		this.start = function(car){
			_this.car = car;
			car.initialisePhysicsBodies(_this.world);
			_this.renderer.followBody(_this.car.body);
			_this.endStateDetector.initialise(_this.car.body);
			_this.ticker.run(tick);
		};

		this.end = function(){
			_this.ticker.stop();
			_this.renderer.reset();
			_this.car.destroy();
			if (_this.stopCallback)
				_this.stopCallback(_this.car.body.GetPosition().x);
		};

		this.onStop = function(callback) {
			_this.stopCallback = callback;
		};
	};

	return Simulation;
});