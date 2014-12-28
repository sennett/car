define(function(){
	// takes two coordinates and generates numbers from a
	return function(groundBodyConstructor) {
		var _this = this;

		this.groundBodyConstructor = groundBodyConstructor;

		this.generate = function(point1, point2){
			return _this.groundBodyConstructor.construct();
		}
	}
});