define(['box2dweb', 'underscore'], function(Box2D, _){
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;

	var Car = function(genome){
		this.genome = genome;
	};

	var createSubBody = function(point1, point2){
		var points = [new b2Vec2(0,0), point1, point2];
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(5, 12);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2PolygonShape();
		fixtureDef.shape.SetAsArray(points, points.length);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;

		var carBody = this.world.CreateBody(bodyDef);
		carBody.CreateFixture(fixtureDef);
		this.carBodies.push(carBody);
	};

	var createBody = function(){
		var twoDVertices = [];
		this.genome.runForVertices(function(angle, magnitude){
			twoDVertices.push(new b2Vec2(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude));
		});

		// create fake convex shapes (box2d does not support convex polygons)
		this.carBodies = [];
		for (var i = 0; i < twoDVertices.length - 1; i++)
			createSubBody.call(this, twoDVertices[i], twoDVertices[i + 1]);
		createSubBody.call(this, _.last(twoDVertices), _.first(twoDVertices));
		return this.carBodies[0];
	};

	Car.prototype = {
		destroyPhysicsBodies: function(){
			_.each(this.carBodies, function(body){
				this.world.DestroyBody(body);
			}, this);
			//this.world.DestroyBody(this.frontWheel);
			//this.world.DestroyBody(this.backWheel);
		},
		initialisePhysicsBodies: function(world){
			this.world = world;
			this.body = createBody.call(this);
		}
	};

	return Car;
});