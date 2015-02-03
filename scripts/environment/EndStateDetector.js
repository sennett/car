define(function () {
	var EndStateDetector = function(){};
	EndStateDetector.prototype = {

		tollerance: 500, // milliseconds


		initialise: function(carBody){
			this.lastContact = Date.now().valueOf();
			this.carBody = carBody;
		},

		simulationEnded: function(){
			return !this.carBody.IsAwake() || Date.now().valueOf() > this.lastContact + this.tollerance;
		},

		// b2ContactListener
		BeginContact: function(){
			this.lastContact = Date.now().valueOf();
		},
		PreSolve: function(){},
		EndContact: function () {},
		PostSolve: function(){}
	};

	return EndStateDetector;
});