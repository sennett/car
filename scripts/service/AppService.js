define(['underscore'], function(_) {
    var AppService = function(){};
    
    AppService.prototype = _.extend(AppService.prototype, {
		onNewGeneration: function(handler){
			throw 'not implemented';
		},
		onNewGenerationHighScore: function(handler){
			throw 'not implemented exception';
		},
		onNewGenerationAverageScore: function(handler){
			throw 'not implemented';
		},
		onNewCar: function(handler){
			throw 'not implemented exception';
		}
	});
    
    return AppService;
});