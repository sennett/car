define(function () {
	var FacadeRenderer = function (nullRenderer, canvasRenderer) {
		this.nullRenderer = nullRenderer;
		this.canvasRenderer = canvasRenderer;
	};

	FacadeRenderer.prototype = {
		initialise: function(world){
			this.canvasRenderer.initialise(world);
		},
		followBody: function(body){
			this.canvasRenderer.followBody(body);
		},
		render: function(){
			this.canvasRenderer.render();
		},
		reset: function(){
			this.canvasRenderer.reset();
		},
		switchToNullRenderer: function(){},
		switchToCanvasRenderer: function(){}
	};

	return FacadeRenderer;
});