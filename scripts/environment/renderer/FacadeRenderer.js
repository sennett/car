define(function () {
	var FacadeRenderer = function (nullRenderer, canvasRenderer) {
		this.nullRenderer = nullRenderer;
		this.canvasRenderer = canvasRenderer;
		this.currentRenderer = this.canvasRenderer;
	};

	FacadeRenderer.prototype = {
		initialise: function(world){
			this.canvasRenderer.initialise(world);
		},
		followBody: function(body){
			this.currentRenderer.followBody(body);
		},
		render: function(){
			this.currentRenderer.render();
		},
		reset: function(){
			this.currentRenderer.reset();
		},
		switchToNullRenderer: function(){
			this.currentRenderer = this.nullRenderer;
		},
		switchToCanvasRenderer: function(){
			this.currentRenderer = this.canvasRenderer;
		}
	};

	return FacadeRenderer;
});