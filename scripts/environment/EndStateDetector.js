define(['underscore'], function(_) {
    var EndStateDetector = function(){};
    
    EndStateDetector.prototype = _.extend(EndStateDetector.prototype, {
		setCars: function(cars){
			this.cars = cars;
		},
		simulationEnded: function(){
			if (_.isEmpty(this.cars))
				throw 'no cars in endstate detector';
			return _.every(this.cars, function(car){
				return car.serialise().simulationComplete;
			});
		}
	});
    
    return EndStateDetector;
});