define(function() {
    var GenerationPresenter = function(view, generationProvider){
		view.generationSize = generationProvider.generationSize;
		generationProvider.onStartMember = view.addMember.bind(view);
	};
    
    return GenerationPresenter;
});