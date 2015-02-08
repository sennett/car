define(['underscore'], function (_) {
	var Ticker = function(intervalProvider){
		this.intervalProvider = intervalProvider
	};

	Ticker.prototype = {
		interval: 1, // ms
		ticksPerInterval: 1000,
		running: false,
		tick: undefined,
		simulation: undefined,

		_run: function(){
			this.running = true;
			this.intervalId = this.intervalProvider.setInterval(_.bind(function(){
				if (this.running)
					for (var i = 0; i < this.ticksPerInterval; i++)
						this.tick.call(this.simulation);
			}, this), this.interval);
		},

		run: function(tick, simulation){
			this.tick = tick;
			this.simulation = simulation;
			this._run();
		},

		stop: function(){
			this.running = false;
			this.intervalProvider.clearInterval(this.intervalId);
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