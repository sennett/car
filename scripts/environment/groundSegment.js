define(['box2dweb'], function (box2dweb) {
	var b2BodyDef = box2dweb.Dynamics.b2BodyDef;
	var b2FixtureDef = box2dweb.Dynamics.b2FixtureDef;
	var b2PolygonShape = box2dweb.Collision.Shapes.b2PolygonShape;

	return function(point1, point2) {
		var _this = this;

		(function(){
			var xDifference = point2.x - point1.x,
				yDifference = point2.y - point1.y;

			this.length = (Math.sqrt(Math.pow(xDifference, 2) + Math.pow(yDifference, 2))) / 2;
			this.height = 0.1;
			this.angle = Math.atan2(yDifference, xDifference);
			this.xLocation = (point2.x + point1.x) / 2;
			this.yLocation = (point2.y + point1.y) / 2;
		}).call(this);

		var getBodyDef = function(){
			var bodyDef = new b2BodyDef();
			bodyDef.type = b2BodyDef.b2_staticBody;
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

		this.createPhysicsBody = function(world){
			world.CreateBody(getBodyDef.call(_this)).CreateFixture(getFixtureDef.call(_this));
		};
	};
});