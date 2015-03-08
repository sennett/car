define(function() {
    var GenerationPresenter = function(view, generationProvider){
		view.setGenerationSize(generationProvider.generationSize);
		view.setGenerationNumber(generationProvider.currentGeneration);
		generationProvider.onRunningMember = view.runningMember.bind(view);
		generationProvider.onMemberRan = view.memberComplete.bind(view);
		generationProvider.onGenerationComplete = view.generationComplete.bind(view);
		generationProvider.onHighscore = view.newHighscore.bind(view);
	};
    
    return GenerationPresenter;
});