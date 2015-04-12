define(function() {
    var GenerationsPresenter = function(view, appService){
		console.dir(view);
		appService.onNewGeneration = function(generationId){
			view.newGeneration(generationId);
		}
	};
    
    return GenerationsPresenter;
});