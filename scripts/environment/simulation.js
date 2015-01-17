define(['underscore', 'box2dweb'], function(_, Box2D) {

	var Simulation = function Simulation(groundSegmentProvider, physicsWorldProvider, renderer, ticker) {
		var _this = this;

		this.groundSegmentProvider = groundSegmentProvider;
		this.physicsWorldProvider = physicsWorldProvider;
		this.renderer = renderer;
		this.ticker = ticker;

		this.world = this.physicsWorldProvider.world();

		var tick = function(){
			//if (!_this.carBody.IsAwake())
			//	alert('slept');
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
			_.each(ground.points, function(point, index){
				var nextPoint = ground.points[index + 1];
				if (nextPoint)
					_this.groundSegmentProvider.makeGroundSegment(point, nextPoint).createPhysicsBody(_this.world);
			});
		};

		this.start = function(){
			_this.renderer.initialise(_this.world);
			_this.ticker.run(tick);
		};

		this.onStop = function(cb) {

		};
	};

	return Simulation;
});