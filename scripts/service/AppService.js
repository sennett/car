define(['underscore'], function(_) {
    var AppService = function(){};
    
    AppService.prototype = _.extend(AppService.prototype, {
		onNewGeneration: function(handler){
			throw 'not implemented';
		}
	});
    
    return AppService;
});