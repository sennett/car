define(['underscore'], function (_) {

	var reset = function(){
		this.ticksSinceLastContact = 0;
		this.timeOfLastContact = Date.now().valueOf();
	};

	var EndStateDetector = function(){};
	EndStateDetector.prototype = _.extend(EndStateDetector.prototype, {

		timeTolerance: 2000, // milliseconds
		tickTolerance: 120, // ticks
		timeOverRunAfter: 2000, // ms
		ticksCanOverRunAfter: 120, // ticks
		

		initialise: function(carBody){
			reset.call(this);
			this.startTime = Date.now().valueOf();
			this.totalTicks = 0;
			this.carBody = carBody;
			this.forcedEnd = false;
		},

		simulationEnded: function(){
			this.ticksSinceLastContact++;
			this.totalTicks++;

			var carBodySleeping = !this.carBody.IsAwake();
			var ticksCanOverrun = this.totalTicks > this.ticksCanOverRunAfter;
			var ticksOverrun = this.ticksSinceLastContact > this.tickTolerance && ticksCanOverrun;
			var timeCanOverrun = Date.now().valueOf() > this.startTime + this.timeOverRunAfter;
			var timeOverrun = Date.now().valueOf() > this.timeOfLastContact + this.timeTolerance && timeCanOverrun;

			return this.forcedEnd || carBodySleeping || ticksOverrun || timeOverrun;
		},
		
		forceEnd: function(){
			this.forcedEnd = true;
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