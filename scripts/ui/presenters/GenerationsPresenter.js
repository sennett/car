define(function() {
    var GenerationsPresenter = function(view, generationsUiService){
		generationsUiService.onNewGeneration(view.onNewGeneration);
		generationsUiService.onNewGenerationHighScore(view.onNewGenerationHighScore);
		generationsUiService.onNewGenerationAverageScore(view.onNewGenerationAverageScore);
		generationsUiService.onNewCar(view.onNewCar);
		generationsUiService.onNewCarScore(view.onNewCarScore);
		generationsUiService.onCarSimulationComplete(view.onCarSimulationComplete);
	};
    
    return GenerationsPresenter;
});