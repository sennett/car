define(function() {
    var GenerationPresenter = function(view, generationProvider){
		view.generationSize = generationProvider.generationSize;
		generationProvider.onMemberComplete = view.addMember.bind(view);
	};
    
    return GenerationPresenter;
});