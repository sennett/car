define(['underscore'], function(_) {
    var Generation = function(){};
    
    Generation.prototype = _.extend(Generation.prototype, {
		generationNumber: undefined,
		getGenerationNumber: function(){
			return this.generationNumber;
		}
	});
    
    return Generation;
});