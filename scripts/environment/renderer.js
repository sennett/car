define(['box2dweb'], function (Box2D) {
	var Renderer = function(){
		var _this = this;
		this.drawScale = 30;

		this.initialise = function(world){
			_this.world = world;
			_this.drawContext = document.getElementById("worldRender").getContext("2d");
			var debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetSprite(_this.drawContext);
			debugDraw.SetDrawScale(_this.drawScale);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
			_this.world.SetDebugDraw(debugDraw);
		};

		this.followBody = function(body){
			_this.followedBody = body;
			_this.previousBodyX = _this.followedBody.GetPosition().x;
			_this.previousBodyY = _this.followedBody.GetPosition().y;
		};

		this.render = function(){
			var xdiff = (_this.previousBodyX - _this.followedBody.GetPosition().x) * _this.drawScale,
				ydiff = (_this.previousBodyY - _this.followedBody.GetPosition().y) * _this.drawScale;
			//_this.drawContext.rect();
			//_this.drawContext.clip();
			_this.drawContext.translate(xdiff, ydiff);
			// try ctx.clip, .restore, .save
			// http://stackoverflow.com/questions/24145535/html5-canvas-smearing-image-patterns-when-translating
			_this.previousBodyX = _this.followedBody.GetPosition().x;
			_this.previousBodyY = _this.followedBody.GetPosition().y;
			_this.world.DrawDebugData();
		};
	};

	return Renderer;
});