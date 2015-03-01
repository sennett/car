define(['underscore'], function (_) {
	var Ticker = function(timeoutProvider){
		this.timeoutProvider = timeoutProvider;
	};

	var _run = function(){
		this.running = true;
		var run = function(){
			// deferred because the tick function could stop the ticker
			_.defer(this.tick);
			this.timeoutId = this.timeoutProvider.setTimeout(run, this.interval);
		}.bind(this);
		run();
	};

	var _setInterval = function(interval){
		_.defer(function(){
			var wasRunning = this.running;
			if (this.running)
				this.stop();
			this.interval = interval;
			if (wasRunning)
				_run.call(this);
		}.bind(this));
	};

	Ticker.prototype = _.extend(Ticker.prototype, {
		intervals: { // ms
			fast: 0,
			slow: 16
		},
		interval: 16, // ms
		running: false,
		tick: undefined,

		run: function(tick){
			this.tick = tick;
			_run.call(this);
		},

		stop: function(){
			this.timeoutProvider.clearTimeout(this.timeoutId);
			this.running = false;
		},

		speedUp: function(){
			_setInterval.call(this, this.intervals.fast);
		},

		slowDown: function(){
			_setInterval.call(this, this.intervals.slow);
		}
	});

	return Ticker;
});