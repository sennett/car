define(['underscore'], function (_) {
	var FastForward = function (rendererSwitcher, ticker) {
		this.rendererSwitcher = rendererSwitcher;
		this.ticker = ticker;
		this.button = document.getElementById('fastForward');
		this.button.addEventListener('click', this);
		this.speed = this.speeds.slow;
	};

	FastForward.prototype = {
		speeds: {
			fast: 'fast',
			slow: 'slow'
		},
		slowDown: function(){
			this.rendererSwitcher.switchToCanvasRenderer();
			this.button.innerHTML = 'fast forward';
			this.speed = this.speeds.slow;
			this.ticker.slowDown();
		},
		speedUp: function(){
			this.rendererSwitcher.switchToNullRenderer();
			this.button.innerHTML = 'slow down';
			this.speed = this.speeds.fast;
			this.ticker.speedUp();
		},
		handleEvent: function(){
			if (this.speed == this.speeds.fast) {
				this.slowDown();
			} else {
				this.speedUp();
			}
		}
	};

	return FastForward;
});