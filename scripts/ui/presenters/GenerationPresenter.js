define(function() {
    var GenerationPresenter = function(view, generation){
		view.setGenerationSize(generation.generationSize);
		view.setGenerationNumber(generation.getGenerationNumber());
		view.onNewAverageScore = generation.newAverageScore;
		generation.onRunningMember = view.runningMember.bind(view);
		generation.onMemberRan = view.memberComplete.bind(view);
		generation.onGenerationComplete = view.generationComplete.bind(view);
		generation.onHighscore = view.newHighscore.bind(view);
	};
    
    return GenerationPresenter;
});