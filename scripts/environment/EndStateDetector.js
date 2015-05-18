define(['underscore'], function(_) {
    var EndStateDetector = function(){};
    
    EndStateDetector.prototype = _.extend(EndStateDetector.prototype, {
		setCars: function(cars){
			this.cars = cars;
		},
		simulationEnded: function(){
			if (_.isEmpty(this.cars))
				throw 'no cars in endstate detector';
			
			if (this.forceSimulationEnd) {
				this.forceSimulationEnd = false;
				return true;
			}
			
			return _.every(this.cars, function(car){
				return car.serialise().simulationComplete;
			});
		},
		endSimulation: function() {
			this.forceSimulationEnd = true;
		}
	});
    
    return EndStateDetector;
});