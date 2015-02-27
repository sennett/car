define(['box2dweb'], function (Box2D) {
	var drawScale = 30;

	var atRenderScale = function(worldScale){
		return worldScale * drawScale;
	};

	var CanvsaDebugRenderer =  function(){};
	CanvsaDebugRenderer.prototype = {

		initialise: function(world){
			this.world = world;
			this.renderTarget = document.getElementById("worldRender");
			this.drawContext = this.renderTarget.getContext("2d");
			var debugDraw = new Box2D.Dynamics.b2DebugDraw();
			debugDraw.SetSprite(this.drawContext);
			debugDraw.SetDrawScale(drawScale);
			debugDraw.SetFillAlpha(0.3);
			debugDraw.SetLineThickness(1.0);
			debugDraw.SetFlags(Box2D.Dynamics.b2DebugDraw.e_shapeBit | Box2D.Dynamics.b2DebugDraw.e_jointBit);
			this.world.SetDebugDraw(debugDraw);
		},

		followBody: function(body){
			this.drawContext.save();
			this.followedBodyPosition = body.GetPosition();
			this.previousBodyX = atRenderScale(this.followedBodyPosition.x);
			this.previousBodyY = atRenderScale(this.followedBodyPosition.y);
			this.drawContext.translate(atRenderScale(this.followedBodyPosition.x - 5), atRenderScale(this.followedBodyPosition.y - 12));
		},

		render: function(){
			var currentBodyX = atRenderScale(this.followedBodyPosition.x),
				currentBodyY = atRenderScale(this.followedBodyPosition.y);
			var xdiff = this.previousBodyX - currentBodyX,
				ydiff = this.previousBodyY - currentBodyY;
			this.drawContext.translate(xdiff, ydiff);
			this.drawContext.clearRect(-1000, -1000, 10000000, 10000000);
			// TODO: clear properly
			// http://stackoverflow.com/questions/24145535/html5-canvas-smearing-image-patterns-when-translating
			//this.drawContext.save();
			//this.drawContext.rect(xdiff, ydiff, this.renderTarget.width, this.renderTarget.height);
			//this.drawContext.clip();
			this.previousBodyX = currentBodyX;
			this.previousBodyY = currentBodyY;
			this.world.DrawDebugData();
			//this.drawContext.restore();
		},

		reset: function(){
			this.drawContext.clearRect(-1000, -1000, 10000000, 10000000);
			this.drawContext.restore();
		}
	};

	return CanvsaDebugRenderer;
});