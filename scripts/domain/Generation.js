define(['underscore'], function(_) {
    var Generation = function(genomes){
		this.genomes = genomes;
	};
    
    Generation.prototype = _.extend(Generation.prototype, {
		getGenerationNumber: function(){
			throw 'not implemented';
		},
		newAverageScore: function(){
			throw 'not implemented';
		},
		memberRunning: function(){
			throw 'not implemented';
		},
		memberRan: function(){
			throw 'not implemented';
		},
		generationComplete: function(){
			throw 'not implemented';
		}
	});
    
    return Generation;
});