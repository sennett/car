define([
	'ractive',
	'rv!ui/templates/GenerationTemplate',
	'ui/presenters/GenerationPresenter'], function(Ractive, template, GenerationPresenter) {
    var GenerationView = function(generationProvider){
		var view = new Ractive({
			template: template,
			append: true,
			data:{
				currentMember: 0
			},
			addMember: function(member){
				this.set('currentMember', member);
			}
		});

		new GenerationPresenter(view, generationProvider);
		return view;
	};
    return GenerationView;
});