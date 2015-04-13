define(['underscore'], function(_) {
    var AppService = function(evolutionEngine){
		this.evolutionEngine = evolutionEngine;
	};
    
    AppService.prototype = _.extend(AppService.prototype, {
		onNewGeneration: function(handler){
			this.evolutionEngine.onStartGeneration = handler;
		},
		onNewGenerationHighScore: function(handler){
			this.evolutionEngine.onHighscore = handler;
		},
		onNewGenerationAverageScore: function(handler){
			this.evolutionEngine.onGenerationComplete = handler;
		},
		onNewCar: function(handler){
			this.evolutionEngine.onRunningMember = handler;
		},
		onNewCarScore: function(handler){
			this.evolutionEngine.onNewCarScore = handler;
		},
		onCarSimulationComplete: function(handler){
			this.evolutionEngine.onCarSimulationComplete = handler;
		}
	});
	
    return AppService;
});