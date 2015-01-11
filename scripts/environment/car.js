define(['box2dweb'], function(Box2D){
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
	var b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
	var b2Vec2 = Box2D.Common.Math.b2Vec2;

	var createCarBody = function(world){
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(5, 5);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2PolygonShape();
		fixtureDef.shape.SetAsBox(2, 0.5);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;

		var carBody = world.CreateBody(bodyDef);
		carBody.CreateFixture(fixtureDef);
		return carBody;
	};

	var createFrontWheel = function(world, carBody){

		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(3, 5.5);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2CircleShape(1);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;

		var wheel = world.CreateBody(bodyDef);
		wheel.CreateFixture(fixtureDef);

		var axleDef = new b2RevoluteJointDef();
		axleDef.Initialize(carBody, wheel, wheel.GetWorldCenter());
		axleDef.enableMotor = true;
		axleDef.motorSpeed = 5;
		axleDef.maxMotorTorque = 10;
		world.CreateJoint(axleDef);
	};

	var createBackWheel = function(world, carBody){
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.Set(7, 5.5);

		var fixtureDef = new b2FixtureDef();
		fixtureDef.shape = new b2CircleShape(1);
		fixtureDef.density = 1.0;
		fixtureDef.friction = 0.3;
		fixtureDef.restitution = 0.2;

		var wheel = world.CreateBody(bodyDef);
		wheel.CreateFixture(fixtureDef);

		var axleDef = new b2RevoluteJointDef();
		axleDef.Initialize(carBody, wheel, wheel.GetWorldCenter());
		axleDef.enableMotor = true;
		axleDef.motorSpeed = 5;
		axleDef.maxMotorTorque = 10;
		world.CreateJoint(axleDef);
	};

	return {
		createPhysicsBody: function(world){
			var carBody = createCarBody(world);
			createFrontWheel(world, carBody);
			createBackWheel(world, carBody);
		}
	};
});