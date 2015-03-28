define(['underscore', 'ractiveRuntime'], function(_, Ractive, Presenter) {
	
    var View = function(model){
		var view = new Ractive({
			template: '',
			append: true,
			aMethod: function(thing){
				this.set('thing', thing);
			}
		});

		new Presenter(view, model);
		return view;
	};
    
    return View;
});