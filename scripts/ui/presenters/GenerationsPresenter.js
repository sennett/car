define(function() {
    var GenerationsPresenter = function(view, appService){
		appService.onNewGeneration(view.onNewGeneration);
		appService.onNewGenerationHighScore(view.onNewGenerationHighScore);
		appService.onNewGenerationAverageScore(view.onNewGenerationAverageScore);
		appService.onNewCar(view.onNewCar);
		appService.onNewCarScore(view.onNewCarScore);
		appService.onCarSimulationComplete(view.onCarSimulationComplete);
	};
    
    return GenerationsPresenter;
});