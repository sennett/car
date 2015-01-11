define(['box2dweb'], function (box2dweb) {
	var b2BodyDef = box2dweb.Dynamics.b2BodyDef;
	var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
	var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
	return function(point1, point2) {
		var _this = this;
		this.point1 = point1;
		this.point2 = point2;

		(function(){
			var xdiff = point2.x - point1.x,
				ydiff = point2.y - point1.y,
				length = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2)),
				angle = Math.atan2(ydiff, xdiff),
				xLocation = (point2.x + point1.x) / 2,
				yLocation = (point2.y + point1.y) / 2;
			this.length = length;
			this.height = 0.1;
			this.angle = angle;
			this.xLocation = xLocation;
			this.yLocation = yLocation;
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
		}

		this.createPhysicsBody = function(world){
			world.CreateBody(getBodyDef.call(_this)).CreateFixture(getFixtureDef.call(_this));
		};
	};
});