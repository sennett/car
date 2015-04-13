define(['underscore', 'ui/GenerationView'], function(_, GenerationView) {
    var GenerationsListView = function(){
		this.generations = [];
	};
    
    GenerationsListView.prototype = _.extend(GenerationsListView.prototype, {
		onNewGeneration:function(id){
			this.generations[id] = new GenerationView();
		},
		onNewGenerationHighScore: function(id, highScore){
			if (this.generations[id])
				this.generations[id].newHighScore(highScore);
			else
				throw 'application exception: no generation with id ' + id + ' found';
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