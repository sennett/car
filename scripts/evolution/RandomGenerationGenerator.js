define(['underscore'], function(_) {
    var RandomGenerationGenerator = function(){};
    
    RandomGenerationGenerator.prototype = _.extend(RandomGenerationGenerator.prototype, {
		createRandomGeneration: function(){
			throw 'not implemented';
		}
	});
    
    return RandomGenerationGenerator;
});