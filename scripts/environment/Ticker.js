define(['underscore'], function (_) {
	var Ticker = function(timeoutProvider){
		this.timeoutProvider = timeoutProvider;
	};
	Ticker.prototype = {
		intervals: { // ms
			fast: 0,
			slow: 16
		},
		interval: 16, // ms
		running: false,
		tick: undefined,

		_run: function(){
			this.running = true;
			var run = function(){
				// deferred because the tick function could stop the ticker
				_.defer(this.tick);
				this.timeoutId = this.timeoutProvider.setTimeout(run, this.interval);
			}.bind(this);
			run();
		},

		_setInterval: function(interval){
			var wasRunning = this.running;
			if (this.running)
				this.stop();
			this.interval = interval;
			if (wasRunning)
				this._run();
		},

		run: function(tick){
			this.tick = tick;
			this._run();
		},

		stop: function(){
			this.timeoutProvider.clearTimeout(this.timeoutId);
			this.running = false;
		},

		speedUp: function(){
			this._setInterval(this.intervals.fast);
		},

		slowDown: function(){
			this._setInterval(this.intervals.slow);
		}
	};

	return Ticker;
});