define(['ui/presenters/GenerationPresenter', 'ui/GenerationView', 'domain/Generation'], function (GenerationPresenter, GenerationView, Generation) {
	describe('GenerationPresenter', function () {
		beforeEach(function(){
			Generation.prototype
		});
		describe('basic wiring', function(){
			it('wires up the generation number', function(){
				this.view = spyOn(GenerationView.prototype, 'setGenerationNumber');
				this.generation = spyOn(Generation.prototype, 'generationNumber')
				this.generationPresenter = new GenerationPresenter(this.view, )
			});

			it('wires up the average score for the generation', function(){
				
			});

			it('wires up the new highscore', function(){
				
			});
		});
	});
});