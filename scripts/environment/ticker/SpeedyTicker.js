define(['underscore'], function (_) {
	var SpeedyTicker = function () {
	};

	SpeedyTicker.prototype = {
		stopped: false,
		run: function(tick, simulation){
			this.stopped = false;
			while(this.stopped == false)
				tick.call(simulation);
		},
		stop: function(){
			this.stopped = true;
		}
	};

	return SpeedyTicker;
});