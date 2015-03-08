define([
	'ractive',
	'rv!ui/templates/GenerationTemplate',
	'ui/presenters/GenerationPresenter'], function(Ractive, template, GenerationPresenter) {
    var GenerationView = function(generationProvider){
		var view = new Ractive({
			template: template,
			append: true,
			computed:{
				percentComplete: function(){
					return this.get('lastMemberComplete') / this.get('generationSize') * 100;
				},
				progressBarUnitPercentage: function(){
					return 1 / this.get('generationSize') * 100;
				},
				displayCurrentlyRunningMember: function(){
					return this.get('lastMemberComplete') != this.get('generationSize');
				}
			},
			setGenerationSize: function(generationSize){
				this.set('generationSize', generationSize);
			},
			runningMember: function(member){
				this.set('lastMemberComplete', member - 1);
			},
			memberComplete: function(member){
				this.set('lastMemberComplete', member);
			},
			setGenerationNumber: function(generationNumber){
				this.set('generationNumber', generationNumber);
			}
		});

		new GenerationPresenter(view, generationProvider);
		return view;
	};
    return GenerationView;
});