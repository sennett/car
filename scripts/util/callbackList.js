define(['underscore'], function (_) {
	return {
		create: function(){
			var callbacks = [];
			return {
				register:function(callback){
					callbacks.push(callback)
				},
				callAll: function(){
					_.each(callbacks, function(cb){
						cb();
					});
				}
			}
		}
	};
});