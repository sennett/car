define(function() {

    var CurrentStatePresenter = function(view, currentScoreProvider){
		currentScoreProvider.onUpdateScore.push(view.updateCurrentScore.bind(view));
	};
    
    return CurrentStatePresenter;
});