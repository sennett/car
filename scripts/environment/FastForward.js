define(['underscore'], function (_) {

	var slowDown = function(){
		this.rendererSwitcher.switchToCanvasRenderer();
		this.speed = this.speeds.slow;
		this.ticker.slowDown();
	};

	var speedUp = function(){
		this.rendererSwitcher.switchToNullRenderer();
		this.speed = this.speeds.fast;
		this.ticker.speedUp();
	};

	var FastForward = function (rendererSwitcher, ticker) {
		this.rendererSwitcher = rendererSwitcher;
		this.ticker = ticker;
		this.speed = this.speeds.slow;
	};

	FastForward.prototype = {
		speeds: {
			fast: 'fast',
			slow: 'slow'
		},

		changeSpeed: function(response){
			if (this.speed == this.speeds.fast) {
				slowDown.call(this);
				response.slow();
			} else {
				speedUp.call(this);
				response.fast();
			}
		}
	};

	return FastForward;
});