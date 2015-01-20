define(function () {
	var EndStateDetector = function(){
		var _this = this;

		this.tollerance = 2000; // milliseconds


		this.initialise = function(carBody){
			_this.lastContact = Date.now().valueOf();
			_this.carBody = carBody;
		};

		this.simulationEnded = function(){
			return !_this.carBody.IsAwake() || Date.now().valueOf() > _this.lastContact + _this.tollerance;
		};

		// b2ContactListener
		this.BeginContact = function(){
			_this.lastContact = Date.now().valueOf();
		};
		this.PreSolve = function(){};
		this.EndContact = function () {};
		this.PostSolve = function(){};
	};
	return EndStateDetector;
});