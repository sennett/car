define([
	'ractive',
	'rv!ui/templates/GenerationTemplate',
	'ui/presenters/GenerationPresenter'], function(Ractive, template, GenerationPresenter) {
    var GenerationView = function(generationProvider){
		var view = new Ractive({
			template: template,
			append: true
		});

		new GenerationPresenter(view, generationProvider);
		return view;
	};
    return GenerationView;
});