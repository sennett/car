define(['underscore', 'ractiveRuntime', 'presenterFirst/Presenter'], function(_, Ractive, Presenter) {
	
    var View = function(model){
		new Presenter(this, model);
	};
	
	View.prototype = _.extend(View.prototype, new Ractive({
		//template: 'hi',
		append: true,
		aMethod: function(thing){
			this.set('thing', thing);
		}
	}));
    
    return View;
});