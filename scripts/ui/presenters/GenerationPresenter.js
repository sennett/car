define(function() {
    var GenerationPresenter = function(view, generationProvider){
		view.setGenerationSize(generationProvider.generationSize);
		generationProvider.onStartMember = view.addMember.bind(view);
	};
    
    return GenerationPresenter;
});