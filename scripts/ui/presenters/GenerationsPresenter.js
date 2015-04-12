define(function() {
    var GenerationsPresenter = function(view, appService){
		appService.onNewGeneration(view.onNewGeneration);
	};
    
    return GenerationsPresenter;
});