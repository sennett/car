define(['underscore'], function (_) {

	var reset = function(){
		this.ticksSinceLastContact = 0;
	};

	var EndStateDetector = function(){};
	EndStateDetector.prototype = _.extend(EndStateDetector.prototype, {
		tickTolerance: 120, // ticks
		ticksCanOverRunAfter: 120, // ticks
		

		initialise: function(carBody){
			reset.call(this);
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

			return this.forcedEnd || carBodySleeping || ticksOverrun;
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