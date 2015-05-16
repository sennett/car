define(['underscore'], function(_) {
    var GlobalEndStateDetector = function(){};
    
    GlobalEndStateDetector.prototype = _.extend(GlobalEndStateDetector.prototype, {
		setCars: function(cars){
			this.cars = cars;
		},
		simulationEnded: function(){
			return _.every(this.cars, function(car){
				return car.serialise().simulationComplete;
			});
		},
		clearBodies: function(){
			throw 'not implemented';
		}
	});
    
    return GlobalEndStateDetector;
});