define(['underscore', 'box2dweb'], function(_, box2dweb) {

	var World = function World(groundSegmentProvider, physicsWorldProvider) {
		var _this = this;

		this.groundSegmentProvider = groundSegmentProvider;
		this.physicsWorldProvider = physicsWorldProvider;
		
		this.world = this.physicsWorldProvider.world();


		var   b2Vec2 = Box2D.Common.Math.b2Vec2
			,	b2BodyDef = Box2D.Dynamics.b2BodyDef
			,	b2Body = Box2D.Dynamics.b2Body
			,	b2FixtureDef = Box2D.Dynamics.b2FixtureDef
			,	b2Fixture = Box2D.Dynamics.b2Fixture
			,	b2World = Box2D.Dynamics.b2World
			,	b2MassData = Box2D.Collision.Shapes.b2MassData
			,	b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
			,	b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
			,	b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

		(function (world) {

			var debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetSprite(document.getElementById("worldRender").getContext("2d"));
			debugDraw.SetDrawScale(30.0);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
			world.SetDebugDraw(debugDraw);


			var fixDef = new b2FixtureDef;
			fixDef.density = 1.0;
			fixDef.friction = 0.5;
			fixDef.restitution = 0.2;

			var bodyDef = new b2BodyDef;

			//create ground
			bodyDef.type = b2Body.b2_staticBody;
			bodyDef.position.x = 9;
			bodyDef.position.y = 13;
			fixDef.shape = new b2PolygonShape;
			fixDef.shape.SetAsBox(10, 0.5);
			world.CreateBody(bodyDef).CreateFixture(fixDef);

			//create some objects
			bodyDef.type = b2Body.b2_dynamicBody;
			for(var i = 0; i < 10; ++i) {
				if(Math.random() > 0.5) {
					fixDef.shape = new b2PolygonShape;
					fixDef.shape.SetAsBox(
						Math.random() + 0.1 //half width
						,  Math.random() + 0.1 //half height
					);
				} else {
					fixDef.shape = new b2CircleShape(
						Math.random() + 0.1 //radius
					);
				}
				bodyDef.position.x = Math.random() * 10;
				bodyDef.position.y = Math.random() * 10;
				world.CreateBody(bodyDef).CreateFixture(fixDef);
			}
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
					_this.world.add(_this.groundSegmentProvider.makeGroundSegment(point, nextPoint).getPhysicsBody());
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