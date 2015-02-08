define(['underscore'], function (_) {

	var nonBlockingWhileTrue = function(runnable){
		if (!this.stopped) {
			runnable();
			window.setTimeout(function() {
				nonBlockingWhileTrue.call(this, runnable);
			}, 0);
		}
	};

	var SpeedyTicker = function () {
	};

	SpeedyTicker.prototype = {
		stopped: false,
		run: function(tick, simulation){
			this.stopped = false;
			nonBlockingWhileTrue.call(this, function(){
				tick.call(simulation);
			});
		},
		stop: function(){
			this.stopped = true;
		}
	};

	return SpeedyTicker;
});