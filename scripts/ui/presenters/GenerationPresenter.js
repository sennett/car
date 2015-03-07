define(function() {
    var GenerationPresenter = function(view, generationProvider){
		view.setGenerationSize(generationProvider.generationSize);
		generationProvider.onRunningMember = view.runningMember.bind(view);
		generationProvider.onMemberRan = view.memberComplete.bind(view);
	};
    
    return GenerationPresenter;
});