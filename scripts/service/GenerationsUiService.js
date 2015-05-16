define(['underscore'], function(_) {
    var GenerationsUiService = function(evolutionEngine, scoreNotifier){
		this.evolutionEngine = evolutionEngine;
		this.scoreNotifier = scoreNotifier;
	};
    
    GenerationsUiService.prototype = _.extend(GenerationsUiService.prototype, {
		onNewGeneration: function(handler){
			this.evolutionEngine.onNewGeneration = handler;
		},
		onNewGenerationHighScore: function(handler){
			this.scoreNotifier.onHighscore = handler;
		},
		onNewGenerationAverageScore: function(handler){
			this.scoreNotifier.onGenerationComplete = handler;
		},
		onNewCar: function(handler){
			this.scoreNotifier.onNewCar = handler;
		},
		onNewCarScore: function(handler){
			this.scoreNotifier.onNewCarScore = handler;
		},
		onCarSimulationComplete: function(handler){
			this.scoreNotifier.onCarSimulationComplete = handler;
		}
	});
	
    return GenerationsUiService;
});