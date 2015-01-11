define(['underscore', 'box2dweb'], function(_, Box2D) {

	var World = function World(groundSegmentProvider, physicsWorldProvider) {
		var _this = this;

		this.groundSegmentProvider = groundSegmentProvider;
		this.physicsWorldProvider = physicsWorldProvider;
		
		this.world = this.physicsWorldProvider.world();

		(function (world) {

			var debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("worldRender").getContext("2d"));
			debugDraw.SetDrawScale(30.0);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);

		})(this.world);

		this.setCar = function(car){
			car.createPhysicsBody(_this.world);
		};

		this.setGround = function(ground){
			_.each(ground.points, function(point, index){
				var nextPoint = ground.points[index + 1];
				if (nextPoint)
					_this.groundSegmentProvider.makeGroundSegment(point, nextPoint).createPhysicsBody(_this.world);
			});
		};

		this.start = function(){
			// update
			window.setInterval( function(){
				_this.world.Step(
					1 / 60   //frame-rate
					,  10       //velocity iterations
					,  10       //position iterations
				);
				_this.world.DrawDebugData();
				_this.world.ClearForces();
			}, 1000 / 60);
		};

	};

	return World;
});