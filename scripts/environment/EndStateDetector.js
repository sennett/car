define(function () {
	var EndStateDetector = function(){};
	EndStateDetector.prototype = {

		timeTolerance: 2000, // milliseconds
		tickTolerance: 500,
		timeOverRunAfter: 10000,

		initialise: function(carBody){
			this.startTime = Date.now().valueOf();
			this.lastContact = Date.now().valueOf();
			this.carBody = carBody;
			this.resetTicks();
		},

		simulationEnded: function(){
			this.ticks++;

			var carBodySleepingLater = !this.carBody.IsAwake();
			var ticksOverrun = this.ticks > this.tickTolerance;
			var timeCanOverrun = Date.now().valueOf() > this.startTime + this.timeOverRunAfter;
			var timeOverrun = Date.now().valueOf() > this.lastContact + this.timeTolerance && timeCanOverrun;

			return carBodySleepingLater || ticksOverrun || timeOverrun;
		},

		resetTicks: function(){
			this.ticks = 0;
		},

		// b2ContactListener
		BeginContact: function(){
			this.resetTicks();
			this.lastContact = Date.now().valueOf();
		},
		PreSolve: function(){},
		EndContact: function () {},
		PostSolve: function(){}
	};

	return EndStateDetector;
});