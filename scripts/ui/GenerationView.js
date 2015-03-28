define([
	'ractiveRuntime',
	'rv!ui/templates/GenerationTemplate',
	'ui/presenters/GenerationPresenter',
	'ui/utils'], function(Ractive, template, GenerationPresenter, utils) {
	
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
			},
			generationComplete: function(averageScore){
				this.set('generationComplete', true);
				this.set('averageScore', utils.roundScore(averageScore));
			},
			newHighscore: function(highscore){
				this.set('highscore', utils.roundScore(highscore));
			}
		});

		new GenerationPresenter(view, generationProvider);
		return view;
	};
    return GenerationView;
});