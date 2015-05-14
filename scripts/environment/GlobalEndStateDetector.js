define(['underscore'], function(_) {
    var GlobalEndStateDetector = function(){};
    
    GlobalEndStateDetector.prototype = _.extend(GlobalEndStateDetector.prototype, {
		setCars: function(cars){
			throw 'not implemented';
		},
		simulationEnded: function(){
			throw 'not implemented';
		},
		clearBodies: function(){
			throw 'not implemented';
		}
	});
    
    return GlobalEndStateDetector;
});