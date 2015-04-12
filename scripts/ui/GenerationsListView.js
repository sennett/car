define(['underscore'], function(_) {
    var GenerationsListView = function(){};
    
    GenerationsListView.prototype = _.extend(GenerationsListView.prototype, {
		newGeneration:function(id){
			throw 'not implemented exception';
		}
	});
    
    return GenerationsListView;
});