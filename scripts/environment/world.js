define(['underscore', 'box2dweb'], function(_, Box2D) {

	var World = function World(groundSegmentProvider, physicsWorldProvider) {
		var _this = this;

		this.groundSegmentProvider = groundSegmentProvider;
		this.physicsWorldProvider = physicsWorldProvider;
		
		this.world = this.physicsWorldProvider.world();

		(function () {
			_this.drawContext = document.getElementById("worldRender").getContext("2d");
			var debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetSprite(_this.drawContext);
			debugDraw.SetDrawScale(30);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
			_this.world.SetDebugDraw(debugDraw);

		})();

		this.setCar = function(car){
			_this.carBody = car.createPhysicsBody(_this.world);
			_this.previousCarX = _this.carBody.GetPosition().x;
			_this.previousCarY = _this.carBody.GetPosition().y;
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

				var xdiff = (_this.previousCarX - _this.carBody.GetPosition().x) * 30,
					ydiff = (_this.previousCarY - _this.carBody.GetPosition().y) * 30;
				_this.drawContext.translate(xdiff, ydiff);
				_this.previousCarX = _this.carBody.GetPosition().x;
				_this.previousCarY = _this.carBody.GetPosition().y;

				_this.world.DrawDebugData();
				_this.world.ClearForces();
			}, 1000 / 60);
		};

	};

	return World;
});