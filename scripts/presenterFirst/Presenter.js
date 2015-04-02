define(['underscore'], function(_) {
    var Presenter = function(view, model){
		if (model)
			model.aMethodOnModel('hello model from presenter');
		if (view)
			view.aMethod('hello view from presenter');
		//model.onAMethodCall = view.aMethod.bind(view);
	};
    
    return Presenter;
});