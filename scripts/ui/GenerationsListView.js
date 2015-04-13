define(['underscore'], function(_) {
    var GenerationsListView = function(){};
    
    GenerationsListView.prototype = _.extend(GenerationsListView.prototype, {
		onNewGeneration:function(id){
			throw 'not implemented exception';
		},
		onNewGenerationHighScore: function(id, highScore){
			throw 'not implemented exception';
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