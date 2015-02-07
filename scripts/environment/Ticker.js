define(['underscore'], function (_) {
	var Ticker = function(){};

	Ticker.prototype = {
		running: false,
		run: function(tick, simulation){
			this.intervalId = window.setInterval(_.bind(function(){
				if (!this.running){
					this.running = true;
					tick.call(simulation);
					this.running = false;
				}
			}, this), 1000 / 600);
		},
		stop: function(){
			window.clearInterval(this.intervalId);
		}
	};

	return Ticker;
});