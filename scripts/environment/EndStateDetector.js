define(['underscore'], function (_) {

	var reset = function(){
		this.ticks = 0;
		this.lastContact = Date.now().valueOf();
	};

	var EndStateDetector = function(){};
	EndStateDetector.prototype = _.extend(EndStateDetector.prototype, {

		timeTolerance: 2000, // milliseconds
		tickTolerance: 500, // ticks
		timeOverRunAfter: 5000, // ms

		initialise: function(carBody){
			reset.call(this);
			this.startTime = Date.now().valueOf();
			this.carBody = carBody;
		},

		simulationEnded: function(){
			this.ticks++;

			var carBodySleeping = !this.carBody.IsAwake();
			var ticksOverrun = this.ticks > this.tickTolerance;
			var timeCanOverrun = Date.now().valueOf() > this.startTime + this.timeOverRunAfter;
			var timeOverrun = Date.now().valueOf() > this.lastContact + this.timeTolerance && timeCanOverrun;

			return carBodySleeping || ticksOverrun || timeOverrun;
		},

		// b2ContactListener
		BeginContact: function(){
			reset.call(this);
		},
		PreSolve: function(){},
		EndContact: function () {},
		PostSolve: function(){}
	});

	return EndStateDetector;
});