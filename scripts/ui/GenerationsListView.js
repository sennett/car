define(['underscore', 'ui/GenerationView'], function(_, GenerationView) {
    var GenerationsListView = function(){
		this.generations = [];
	};
    
	var checkGeneration = function(id){
		if (!this.generations[id])
			throw 'application exception: no generation with id ' + id + ' found';
	};
	
    GenerationsListView.prototype = _.extend(GenerationsListView.prototype, {
		onNewGeneration:function(id){
			this.generations[id] = new GenerationView();
		},
		onNewGenerationHighScore: function(id, highScore){
			checkGeneration.call(this, id);
			this.generations[id].newHighScore(highScore);
		},
		onNewGenerationAverageScore: function(id, averageScore){
			throw 'not implemented exception';
		},
		onNewCar: function(id, generationId){
			throw 'not implemented exception';
		},
		onNewCarScore: function(id, score){
			throw 'not implemented exception';
		},
		onCarSimulationComplete: function(id){
			throw 'not implemented exception';
		}
	});
	
    return GenerationsListView;
});