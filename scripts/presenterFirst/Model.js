define(['underscore'], function(_) {
    var Model = function(){};
	
    Model.prototype = _.extend(Model.prototype, {
		aMethodOnModel: function(argument){
			this.onAMethodCall(argument);
		}
	});
    
    return Model;
});