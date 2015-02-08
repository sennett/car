define(['underscore'], function (_) {
	var Ticker = function(){};

	Ticker.prototype = {
		stopped: false,
		run: function(tick, simulation){
			this.stopped = false;
			this.intervalId = window.setInterval(_.bind(function(){
				if (!this.stopped)
					tick.call(simulation);
			}, this), 1000 / 600);
		},
		stop: function(){
			this.stopped = true;
			window.clearInterval(this.intervalId);
		}
	};

	return Ticker;
});