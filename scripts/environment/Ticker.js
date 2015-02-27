define(['underscore'], function (_) {
	var Ticker = function(timeoutProvider){
		this.timeoutProvider = timeoutProvider
	};

	Ticker.prototype = {
		interval: 16, // ms
		ticksPerInterval: 1,
		running: false,
		tick: undefined,
		simulation: undefined,

		_run: function(){
			this.running = true;
			var run = function(){
				if (this.running) {
					for (var i = 0; i < this.ticksPerInterval; i++)
						this.tick.call(this.simulation);
					this.timeoutProvider.setTimeout(run, this.interval)
				}
			}.bind(this);
			this.timeoutId = this.timeoutProvider.setTimeout(run, this.interval);
		},

		run: function(tick, simulation){
			this.tick = tick;
			this.simulation = simulation;
			this._run();
		},

		stop: function(){
			this.running = false;
			this.timeoutProvider.clearTimeout(this.timeoutId);
		},

		setInterval: function(interval){
			var wasRunning = this.running;
			if (this.running)
				this.stop();
			this.interval = interval;
			if (wasRunning)
				this._run();
		}
	};

	return Ticker;
});