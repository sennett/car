define(['underscore'], function(_) {
    var Presenter = function(view, model){
		model.aMethodOnModel('yes');
		//model.onAMethodCall = view.aMethod.bind(view);
	};
    
    return Presenter;
});