define(['underscore', 'box2dweb'], function(_, box2dweb) {

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
			// create some bodies
			_this.world.add(Physics.body('circle', {
				x: _this.renderer.width * 0.4, y: _this.renderer.height * 0.3, vx: 0.3, radius: 80, styles: {
					fillStyle: '#cb4b16', angleIndicator: '#72240d'
				}
			}));

			_this.world.add(Physics.body('circle', {
				x: _this.renderer.width * 0.7, y: _this.renderer.height * 0.3, vx: -0.3, radius: 40, styles: {
					fillStyle: '#6c71c4', angleIndicator: '#3b3e6b'
				}
			}));

			_this.world.add(car.getPhysicsBodies());
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
			window.setInterval( function update() {
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