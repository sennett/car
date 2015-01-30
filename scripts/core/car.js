define(['box2dweb'], function(Box2D){
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;

	var createCarBody = function(){
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(5, 5);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2PolygonShape();
		var vertices = [];
		vertices.push(new b2Vec2(0, 0));
		vertices.push(new b2Vec2(1, 0));
		vertices.push(new b2Vec2(0, 1));
		fixtureDef.shape.SetAsArray(vertices, vertices.length);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;

		var carBody = this.world.CreateBody(bodyDef);
		carBody.CreateFixture(fixtureDef);
		return carBody;
	};

	var createWheel = function(front){

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(front ? 7 : 3, 5.5);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2CircleShape(1);
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

		return wheel;
	};

	return {
		destroyPhysicsBodies: function(){
			this.world.DestroyBody(this.body);
			this.world.DestroyBody(this.frontWheel);
			this.world.DestroyBody(this.backWheel);
		},
		initialisePhysicsBodies: function(world){
			this.world = world;
			this.body = createCarBody.call(this);
			this.frontWheel = createWheel.call(this, true);
			this.backWheel = createWheel.call(this, false);
		}
	};
});