define(['box2dweb'], function (Box2D) {
	var b2BodyDef = Box2D.Dynamics.b2BodyDef;
	var b2Body = Box2D.Dynamics.b2Body
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;

	return function(point1, point2, index, world) {

		var getBodyDef = function(){
			var bodyDef = new b2BodyDef();
			bodyDef.type = b2Body.b2_staticBody;
			bodyDef.position.Set(this.xLocation, this.yLocation);
			bodyDef.angle = this.angle;
			return bodyDef;
		};

		var getFixtureDef = function(){
			var fixtureDef = new b2FixtureDef();
			fixtureDef.shape = new b2PolygonShape();
			fixtureDef.shape.SetAsBox(this.length, this.height);
			return fixtureDef;
		};

		var initialisePhysicsElements = function(){
			this.fixture = this.world.CreateBody(getBodyDef.call(this)).CreateFixture(getFixtureDef.call(this));
			this.fixture.SetUserData({ groundSegment: this });
		};

		(function(){
			var xDifference = point2.x - point1.x,
				yDifference = point2.y - point1.y;

			this.length = (Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2))) / 2;
			this.height = 0.1;
			this.angle = Math.atan2(yDifference, xDifference);
			this.xLocation = (point2.x + point1.x) / 2;
			this.yLocation = (point2.y + point1.y) / 2;
			this.index = index;
			this.world = world;
			initialisePhysicsElements.call(this);
		}).call(this);
	};
});