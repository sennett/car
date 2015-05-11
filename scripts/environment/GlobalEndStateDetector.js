define(['underscore'], function(_) {
    var GlobalEndStateDetector = function(){};
    
    GlobalEndStateDetector.prototype = _.extend(GlobalEndStateDetector.prototype, {
		registerBody: function(){
			throw 'not implemented';
		},
		simulationEnded: function(){
			throw 'not implemented';
		}
	});
    
    return GlobalEndStateDetector;
});