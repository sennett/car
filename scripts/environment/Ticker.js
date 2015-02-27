define(['underscore'], function (_) {
	var Ticker = function(timeoutProvider){
		this.timeoutProvider = timeoutProvider;
	};
	var _runCallCount = 0;
	Ticker.prototype = {
		intervals: { // ms
			fast: 1,
			slow: 16
		},
		interval: 16, // ms
		running: false,
		tick: undefined,
		simulation: undefined,

		_run: function(){
			this.running = true;
			var run = function(){
				this.tick.call(this.simulation);
				this.timeoutId = this.timeoutProvider.setTimeout(run, this.interval);
			}.bind(this);
			this.timeoutId = this.timeoutProvider.setTimeout(run, this.interval);
		},

		_setInterval: function(interval){
			var wasRunning = this.running;
			if (this.running)
				this.stop();
			this.interval = interval;
			if (wasRunning)
				this._run();
		},

		run: function(tick, simulation){
			this.tick = tick;
			this.simulation = simulation;
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