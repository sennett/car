define(function () {
	var EndStateDetector = function(){};
	EndStateDetector.prototype = {

		timeTolerance: 1000, // milliseconds
		tickTolerance: 200,

		initialise: function(carBody){
			this.lastContact = Date.now().valueOf();
			this.carBody = carBody;
			this.resetTicks();
		},

		simulationEnded: function(){
			this.ticks++;

			var carBodySleeping = !this.carBody.IsAwake();
			var ticksOverrun = this.ticks > this.tickTolerance;
			var timeOverrun = Date.now().valueOf() > this.lastContact + this.timeTolerance;

			return carBodySleeping || ticksOverrun || timeOverrun;
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