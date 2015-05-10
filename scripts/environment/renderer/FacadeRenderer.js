define(['underscore'], function (_) {
	var FacadeRenderer = function (nullRenderer, canvasRenderer) {
		this.nullRenderer = nullRenderer;
		this.canvasRenderer = canvasRenderer;
		this.currentRenderer = this.canvasRenderer;
	};

	FacadeRenderer.prototype = _.extend(FacadeRenderer.prototype, {
		initialise: function(world){
			this.world = world;
			this.currentRenderer.initialise(this.world);
		},
		followBody: function(body){
			this.body = body;
			this.currentRenderer.followBody(this.body);
		},
		render: function(){
			this.currentRenderer.render();
		},
		reset: function(){
			this.currentRenderer.reset();
		},
		switchToNullRenderer: function(){
			this.currentRenderer = this.nullRenderer;
			this.applyRenderer();
		},
		switchToCanvasRenderer: function(){
			this.currentRenderer = this.canvasRenderer;
			this.applyRenderer();
		},
		applyRenderer: function(){
			this.currentRenderer.reset();
			this.currentRenderer.followBody(this.body);
		}
	});

	return FacadeRenderer;
});