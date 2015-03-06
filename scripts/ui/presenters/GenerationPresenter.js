define(['underscore'], function(_) {
    var GenerationPresenter = function(view, generationProvider){
		view.generationSize = generationProvider.generationSize;
		generationProvider.onMemberComplete.push(view.addMember.bind(view));
	};
    
    return GenerationPresenter;
});