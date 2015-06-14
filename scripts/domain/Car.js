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
		var createVertex = _.bind(function(angle, magnitude, id) {
			this.twoDVertices.push({
				id: id,
				location: new b2Vec2(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude)
			});
		}, this);

		this.twoDVertices = [];
		this.genome.forEachVertex(createVertex, this);

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position = startPosition;
		var carBody = this.world.CreateBody(bodyDef);
		var fixture;
		// create body shape using multiple fixtures (box2d does not support convex polygons)
		for (var i = 0; i < this.twoDVertices.length - 1; i++) {
			fixture = carBody.CreateFixture(createSubBodyFixtureDef.call(this, this.twoDVertices[i].location, this.twoDVertices[i + 1].location));
			this.fixtures.push(fixture);
		}
		fixture = carBody.CreateFixture(createSubBodyFixtureDef.call(this, _.last(this.twoDVertices).location, _.first(this.twoDVertices).location));
		this.fixtures.push(fixture);
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
			this.fixtures.push(wheel.CreateFixture(fixtureDef));

			var axleDef = new b2RevoluteJointDef();
			axleDef.Initialize(this.body, wheel, wheel.GetWorldCenter());
			axleDef.enableMotor = true;
			axleDef.motorSpeed = 20;
			
			// using torque from The Master: http://boxcar2d.com/about.html
			axleDef.maxMotorTorque = wheel.GetMass() * this.world.GetGravity().y / radius / 4;
			
			this.world.CreateJoint(axleDef);

			wheels.push(wheel);
		};

		this.genome.forEachWheel(createWheel, this);

		return wheels;
	};
	
	var getScore = function(){
		return this.body.GetPosition().x;
	};
	
	var handleSimulationComplete = function(){
		this.simulationWasEnded = true;
		if(this.onSimulationCompleteCb)
			this.onSimulationCompleteCb(this.id);
	};
	
	var incrementTicks = function(){
		this.pastScores.push(getScore.call(this));
		this.ticksSinceSimulationStart++;
	};
	
	var handleScoreUpdate = function(){
		var currentScore = getScore.call(this);
		if (currentScore != this.oldScore)
			_.each(this.onNewScoreCbs, function(cb) {
				cb(this.id, currentScore);
			}, this);
		this.oldScore = currentScore;
	};
	
	var SIMULATION_MIN_TICKS = 120; // ticks
	var MIN_SPEED = 0.01; // meters per tick
	var SPEED_SAMPLE_SIZE = 100; // ticks
	var detectEndStateFromScore = function(){
		if (this.ticksSinceSimulationStart < SIMULATION_MIN_TICKS)
			return false;
		return (
			this.pastScores[this.ticksSinceSimulationStart - 1] 
			- this.pastScores[this.ticksSinceSimulationStart - 1 - SPEED_SAMPLE_SIZE]
			< MIN_SPEED
		);
	};
	
	var simulationComplete = function (){
		return detectEndStateFromScore.call(this);
	};

	var Car = function(genome){
		this.genome = genome;
		this.ticksSinceSimulationStart = 0;
		// http://stackoverflow.com/a/2117523/614523 :D
		this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
		this.simulationWasEnded = false;
		this.fixtures = [];
		this.pastScores = [];
		this.onNewScoreCbs = [];
		_.bindAll(this, 
			'destroyPhysicsBodies',
			'initialisePhysicsBodies',
			'registerTick',
			'serialise',
			'onNewScore',
			'onSimulationComplete'
		);
	};

	Car.prototype = _.extend(Car.prototype, {
		destroyPhysicsBodies: function(){
			this.world.DestroyBody(this.body);
			_.each(this.wheels, function(wheel){
				this.world.DestroyBody(wheel);
			}, this);
			this.fixtures = [];
		},
		initialisePhysicsBodies: function(world){
			this.world = world;
			this.body = createBody.call(this);
			this.wheels = createWheels.call(this);
		},
		registerTick: function(){
			if(this.simulationWasEnded)
				return;
			
			incrementTicks.call(this);
			handleScoreUpdate.call(this);

			if (simulationComplete.call(this)) 
				handleSimulationComplete.call(this);
		},
		serialise: function(){
			return {
				simulationComplete: simulationComplete.call(this),
				score: getScore.call(this),
				id: this.id
			}
		},
		onNewScore: function(cb){
			this.onNewScoreCbs.push(cb);
		},
		onSimulationComplete: function(cb){
			this.onSimulationCompleteCb = cb;
		}
	});

	return Car;
});