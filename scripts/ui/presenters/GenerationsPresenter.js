define(function() {
    var GenerationsPresenter = function(view, appService){
		appService.onNewGeneration(view.onNewGeneration);
		appService.onNewGenerationHighScore(view.onNewGenerationHighScore);
	};
    
    return GenerationsPresenter;
});