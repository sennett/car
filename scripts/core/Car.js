define(['box2dweb', 'underscore', 'core/appConfig'], function(Box2D, _, config){
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var startPosition = new b2Vec2(config.startPosition.x, config.startPosition.y);

	var createSubBodyFixtureDef = function(point1, point2){
		var points = [new b2Vec2(0,0), point1, point2];

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2PolygonShape();
		fixtureDef.shape.SetAsArray(points, points.length);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;
		fixtureDef.filter.groupIndex = -1;

		return fixtureDef;
	};

	var createBody = function(){
		var createVertex = function(angle, magnitude, id){
			this.twoDVertices.push({
				id: id,
				location: new b2Vec2(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
			});
		};

		this.twoDVertices = [];
		this.genome.forEachVertex(createVertex, this);

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position = startPosition;
		var carBody = this.world.CreateBody(bodyDef);

		// create body shape using multiple fixtures (box2d does not support convex polygons)
		for (var i = 0; i < this.twoDVertices.length - 1; i++)
			carBody.CreateFixture(createSubBodyFixtureDef.call(this, this.twoDVertices[i].location, this.twoDVertices[i + 1].location));
		carBody.CreateFixture(createSubBodyFixtureDef.call(this, _.last(this.twoDVertices).location, _.first(this.twoDVertices).location));

		return carBody;
	};

	var createWheels = function(){
		var wheels = [];

		var createWheel = function(vertexId, radius){
			var vertex = _.findWhere(this.twoDVertices, { id: vertexId});
			if (!vertex)
				throw "unknown vertex for wheel from genome: " + vertexId;

			var bodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_dynamicBody;

			// copy vertex location, move to car body, and apply to wheel
			var vertexLocationCopy = vertex.location.Copy();
			vertexLocationCopy.Add(startPosition);
			bodyDef.position = vertexLocationCopy;

			var fixtureDef = new b2FixtureDef();
			fixtureDef.shape = new b2CircleShape(radius);
			fixtureDef.density = 1.0;
			fixtureDef.friction = 1;
			fixtureDef.restitution = 0.2;
			fixtureDef.filter.groupIndex = -1;

			var wheel = this.world.CreateBody(bodyDef);
			wheel.CreateFixture(fixtureDef);

			var axleDef = new b2RevoluteJointDef();
			axleDef.Initialize(this.body, wheel, wheel.GetWorldCenter());
			axleDef.enableMotor = true;
			axleDef.motorSpeed = 20;

			// using torque from The Master: http://boxcar2d.com/about.html
			axleDef.maxMotorTorque = wheel.GetMass() * this.world.GetGravity() / radius / 4;

			this.world.CreateJoint(axleDef);

			wheels.push(wheel);
		};

		this.genome.forEachWheel(createWheel, this);

		return wheels;
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