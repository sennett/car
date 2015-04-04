define(['underscore'], function(_) {
    var Generation = function(){};
    
    Generation.prototype = _.extend(Generation.prototype, {
		getGenerationNumber: function(){
			throw 'not implemented';
		},
		newAverageScore: function(){
			throw 'not implemented';
		}
	});
    
    return Generation;
});