define(function() {
    var GenerationPresenter = function(view, generation, highScoreProvider){
		view.setGenerationSize(generation.generationSize);
		view.setGenerationNumber(generation.getGenerationNumber());
		view.onNewAverageScore = generation.newAverageScore;
		highScoreProvider.registerNewHighScoreListener(view.newHighScore);
		generation.memberRunning = view.runningMember;
		generation.memberRan = view.memberComplete;
		generation.generationComplete = view.generationComplete;
	};
    
    return GenerationPresenter;
});