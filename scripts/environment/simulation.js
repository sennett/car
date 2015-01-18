define(function() {

	var Simulation = function Simulation(physicsWorldProvider, renderer, ticker) {
		var _this = this;

		this.physicsWorldProvider = physicsWorldProvider;
		this.renderer = renderer;
		this.ticker = ticker;

		this.world = this.physicsWorldProvider.world();

		var tick = function(){
			if (!_this.carBody.IsAwake()) {
				_this.ticker.stop();
				if (_this.stopCallback)
					_this.stopCallback.call();
			}
			_this.world.Step(
				1 / 60   //frame-rate
				,  10       //velocity iterations
				,  10       //position iterations
			);
			_this.renderer.render();
			_this.world.ClearForces();
		};

		this.setCar = function(car){
			_this.carBody = car.createPhysicsBody(_this.world);
			_this.renderer.followBody(_this.carBody);
		};

		this.setGround = function(ground){
			ground.initialisePhysicsBodies(_this.world);
		};

		this.start = function(){
			_this.renderer.initialise(_this.world);
			_this.ticker.run(tick);
		};

		this.onStop = function(callback) {
			_this.stopCallback = callback;
		};
	};

	return Simulation;
});