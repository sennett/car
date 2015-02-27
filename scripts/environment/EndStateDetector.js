define(function () {
	var EndStateDetector = function(){};
	EndStateDetector.prototype = {

		timeTolerance: 1000, // milliseconds
		tickTolerance: 200,

		initialise: function(carBody){
			this.lastContact = Date.now().valueOf();
			this.carBody = carBody;
		},

		simulationEnded: function(){
			this.ticks++;

			return (
				!this.carBody.IsAwake()
					//|| this.ticks > this.tickTolerance
					|| Date.now().valueOf() > this.lastContact + this.timeTolerance
			);
		},

		// b2ContactListener
		BeginContact: function(){
			this.ticks = 0;
			this.lastContact = Date.now().valueOf();
		},
		PreSolve: function(){},
		EndContact: function () {},
		PostSolve: function(){}
	};

	return EndStateDetector;
});