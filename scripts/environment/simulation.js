define(function() {

	var Simulation = function Simulation(physicsWorldProvider, renderer, ticker, endStateDetector) {
		var _this = this;

		this.physicsWorldProvider = physicsWorldProvider;
		this.renderer = renderer;
		this.ticker = ticker;
		this.endStateDetector = endStateDetector;

		this.world = this.physicsWorldProvider.world();

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
			_this.carBody = car.createPhysicsBody(_this.world);
			_this.renderer.followBody(_this.carBody);
			_this.endStateDetector.initialise(_this.carBody);
			_this.ticker.run(tick);
		};

		this.end = function(){
			_this.ticker.stop();
			_this.renderer.reset();
			if (_this.stopCallback)
				_this.stopCallback(_this.carBody.GetPosition().x);
		};

		this.onStop = function(callback) {
			_this.stopCallback = callback;
		};
	};

	return Simulation;
});