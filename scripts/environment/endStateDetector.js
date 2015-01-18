define(function () {
	var EndStateDetector = function(){
		var _this = this;

		this.initialise = function(carBody){
			_this.carBody = carBody;
		};

		this.simulationEnded = function(){
			return !_this.carBody.IsAwake();
		};
	};
	return EndStateDetector;
});