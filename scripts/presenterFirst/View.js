define(['underscore', 'ractiveRuntime', 'presenterFirst/Presenter'], function(_, Ractive, Presenter) {
	
	var createRactive = function(){
		return new Ractive({
			aMethod: function(thing){
				this.set('thing', thing);
			}
		});
	};
	
    var View = function(model){
		var view = createRactive();
		new Presenter(view, model);
		return view;
	};
	
	View.prototype = _.extend(View.prototype, createRactive());
    
    return View;
});