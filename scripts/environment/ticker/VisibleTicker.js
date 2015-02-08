define(['underscore'], function (_) {
	var Ticker = function(window){
		this.window = window
	};

	Ticker.prototype = {
		stopped: false,
		run: function(tick, simulation){
			this.stopped = false;
			this.intervalId = this.window.setInterval(_.bind(function(){
				if (!this.stopped)
					tick.call(simulation);
			}, this), 1000 / 600);
		},
		stop: function(){
			this.stopped = true;
			this.window.clearInterval(this.intervalId);
		}
	};

	return Ticker;
});