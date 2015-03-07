define([
	'ractive',
	'rv!ui/templates/GenerationTemplate',
	'ui/presenters/GenerationPresenter'], function(Ractive, template, GenerationPresenter) {
    var GenerationView = function(generationProvider){
		var view = new Ractive({
			template: template,
			append: true,
			data:{
				display: function(){
					return this.get('currentMember') && this.get('generationSize') ? 'block' : "none";
				}
			},
			addMember: function(member){
				this.set('currentMember', member);
			},
			setGenerationSize: function(generationSize){
				this.set('generationSize', generationSize);
			}
		});

		new GenerationPresenter(view, generationProvider);
		return view;
	};
    return GenerationView;
});