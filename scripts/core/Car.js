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

	var createBody = function(){
		debugger;
		var twoDVertices = [];
		this.genome.runForVertices(function(angle, magnitude){
			twoDVertices.push(new b2Vec2(Math.cos(angle) * magnitude, Math.sin(angle) * magnitude));
		});
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(5, 5);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2PolygonShape();
		fixtureDef.shape.SetAsArray(twoDVertices, twoDVertices.length);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;

		var carBody = this.world.CreateBody(bodyDef);
		carBody.CreateFixture(fixtureDef);
		return carBody;
	};

	Car.prototype = {
		destroyPhysicsBodies: function(){
			this.world.DestroyBody(this.body);
			this.world.DestroyBody(this.frontWheel);
			this.world.DestroyBody(this.backWheel);
		},
		initialisePhysicsBodies: function(world){
			this.world = world;
			this.body = createBody.call(this);
		}
	};

	return Car;
});