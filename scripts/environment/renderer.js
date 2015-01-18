define(['box2dweb'], function (Box2D) {
	var Renderer = function(){
		var _this = this;
		this.drawScale = 30;

		var atRenderScale = function(worldScale){
			return worldScale * _this.drawScale;
		};

		var getTranslateDiffs = function(){

		};

		this.initialise = function(world){
			_this.world = world;
			_this.renderTarget = document.getElementById("worldRender");
			_this.drawContext = _this.renderTarget.getContext("2d");
			var debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetSprite(_this.drawContext);
			debugDraw.SetDrawScale(_this.drawScale);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
			_this.world.SetDebugDraw(debugDraw);
		};

		this.followBody = function(body){
			_this.followedBodyPosition = body.GetPosition();
			_this.previousBodyX = atRenderScale(_this.followedBodyPosition.x);
			_this.previousBodyY = atRenderScale(_this.followedBodyPosition.y);
		};

		this.render = function(){
			var currentBodyX = atRenderScale(_this.followedBodyPosition.x),
				currentBodyY = atRenderScale(_this.followedBodyPosition.y);
			var xdiff = _this.previousBodyX - currentBodyX,
				ydiff = _this.previousBodyY - currentBodyY;
			_this.drawContext.translate(xdiff, ydiff);
			_this.drawContext.clearRect(-1000, -1000, 10000000, 10000000);
			// TODO: clear properly
			// http://stackoverflow.com/questions/24145535/html5-canvas-smearing-image-patterns-when-translating
			//_this.drawContext.save();
			//_this.drawContext.rect(xdiff, ydiff, _this.renderTarget.width, _this.renderTarget.height);
			//_this.drawContext.clip();
			_this.previousBodyX = currentBodyX;
			_this.previousBodyY = currentBodyY;
			_this.world.DrawDebugData();
			//_this.drawContext.restore();
		};

		this.reset = function(){

		};
	};

	return Renderer;
});