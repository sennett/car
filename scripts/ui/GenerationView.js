define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/GenerationTemplate',
	'ui/presenters/GenerationPresenter',
	'ui/utils'], function(_, Ractive, template, GenerationPresenter, utils) {

	function createPrototype() {
		return new Ractive({
			template: template,
			append: true,
			computed: {
				percentComplete: function () {
					return this.get('lastMemberComplete') / this.get('generationSize') * 100;
				},
				progressBarUnitPercentage: function () {
					return 1 / this.get('generationSize') * 100;
				},
				displayCurrentlyRunningMember: function () {
					return this.get('lastMemberComplete') != this.get('generationSize');
				}
			},
			setGenerationSize: function (generationSize) {
				this.set('generationSize', generationSize);
			},
			runningMember: function (member) {
				this.set('lastMemberComplete', member - 1);
			},
			memberComplete: function (member) {
				this.set('lastMemberComplete', member);
			},
			setGenerationNumber: function (generationNumber) {
				this.set('generationNumber', generationNumber);
			},
			generationComplete: function (averageScore) {
				this.set('generationComplete', true);
				this.onNewAverageScore(averageScore);
			},
			onNewAverageScore: function(averageScore){
				this.set('averageScore', utils.roundScore(averageScore));
			},
			newHighScore: function (highscore) {
				this.set('highscore', utils.roundScore(highscore));
			}
		});
	};

	var GenerationView = function(generationProvider){
		var view = createPrototype();

		new GenerationPresenter(view, generationProvider);
		return view;
	};
	
	GenerationView.prototype = _.extend(GenerationView.prototype, createPrototype());
	
    return GenerationView;
});