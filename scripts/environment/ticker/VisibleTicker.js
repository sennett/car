define(['underscore'], function (_) {
	var Ticker = function(intervalProvider){
		this.intervalProvider = intervalProvider
	};

	Ticker.prototype = {
		interval: 10, // ms
		stopped: false,
		run: function(tick, simulation){
			this.stopped = false;
			this.intervalId = this.intervalProvider.setInterval(_.bind(function(){
				if (!this.stopped)
					tick.call(simulation);
			}, this), this.interval);
		},
		stop: function(){
			this.stopped = true;
			this.intervalProvider.clearInterval(this.intervalId);
		},
		setInterval: function(interval){
			this.interval = interval;
		}
	};

	return Ticker;
});