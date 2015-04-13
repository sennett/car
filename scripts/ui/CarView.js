define(['underscore'], function(_) {
    var CarView = function(){};
    
    CarView.prototype = _.extend(CarView.prototype, {
		setScore: function(score){
			throw 'not implemented exception';
		},
		setSimulationComplete: function(){
			throw 'not implemented exception';
		}
	});
    
    return CarView;
});