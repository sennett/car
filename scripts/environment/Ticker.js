define(['underscore'], function (_) {
	var Ticker = function(timeoutProvider){
		this.timeoutProvider = timeoutProvider;
	};
	var _runCallCount = 0;
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
				this.tick();
				this.timeoutId = this.timeoutProvider.setTimeout(run, this.interval);
			}.bind(this);
			run();
			//this.timeoutId = this.timeoutProvider.setTimeout(run, this.interval);
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
			//console.log('run');
			this.tick = tick;
			this._run();
		},

		stop: function(){
			//console.log('stop');
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