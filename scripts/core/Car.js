define(['box2dweb', 'underscore'], function(Box2D, _){
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;

	var createSubBodyFixtureDef = function(point1, point2){
		var points = [new b2Vec2(0,0), point1, point2];

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2PolygonShape();
		fixtureDef.shape.SetAsArray(points, points.length);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;

		return fixtureDef;
	};

	var createBody = function(){
		var createVertex = _.bind(function(angle, magnitude, id){
			this.twoDVertices.push({
				id: id,
				location: new b2Vec2(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
			});
		}, this);

		this.twoDVertices = [];
		this.genome.forEachVertex(createVertex);

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(5, 12);
		var carBody = this.world.CreateBody(bodyDef);

		// create body shape using multiple fixtures (box2d does not support convex polygons)
		for (var i = 0; i < this.twoDVertices.length - 1; i++)
			carBody.CreateFixture(createSubBodyFixtureDef.call(this, this.twoDVertices[i].location, this.twoDVertices[i + 1].location));
		carBody.CreateFixture(createSubBodyFixtureDef.call(this, _.last(this.twoDVertices).location, _.first(this.twoDVertices).location));

		return carBody;
	};

	var createWheels = function(){

		var createWheel = _.bind(function(vertexId, radius){
			var vertex = _.findWhere(this.twoDVertices, { id: vertexId});
			if (!vertex)
				throw "invalid vertex for wheel from genome: " + vertexId;

			var bodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_dynamicBody;

			// copy vertex location, move to car body, and apply to wheel
			var vertexLocationCopy = vertex.location.Copy();
			vertexLocationCopy.Add(this.body.GetWorldCenter());
			bodyDef.position = vertexLocationCopy;

			var fixtureDef = new b2FixtureDef();
			fixtureDef.shape = new b2CircleShape(radius);
			fixtureDef.density = 1.0;
			fixtureDef.friction = 1;
			fixtureDef.restitution = 0.2;

			var wheel = this.world.CreateBody(bodyDef);
			wheel.CreateFixture(fixtureDef);

			var axleDef = new b2RevoluteJointDef();
			axleDef.Initialize(this.body, wheel, wheel.GetWorldCenter());
			axleDef.enableMotor = true;
			axleDef.motorSpeed = 5;
			axleDef.maxMotorTorque = 10;
			this.world.CreateJoint(axleDef);

			this.wheels.push(wheel);
		}, this);

		this.wheels = [];
		this.genome.forEachWheel(createWheel);
	};

	var Car = function(genome){
		this.genome = genome;
	};

	Car.prototype = {
		destroyPhysicsBodies: function(){
			this.world.DestroyBody(this.body);
			_.each(this.wheels, function(wheel){
				this.world.DestroyBody(wheel);
			}, this);
		},
		initialisePhysicsBodies: function(world){
			this.world = world;
			this.body = createBody.call(this);
			this.wheels = createWheels.call(this);
		}
	};

	return Car;
});