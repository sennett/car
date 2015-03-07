define(['ui/GenerationView', 'evolution/Engine'], function (GenerationView, Engine) {
	describe('GenerationView', function () {
		beforeEach(function(){
			this.generationView = new GenerationView(new Engine());
			this.generationView.setGenerationSize(20);
		});
		describe('displayCurrentlyRunningMember', function(){
			describe('when set using runningMember', function(){
				it('returns true at the beginning of the generation', function(){
					this.generationView.runningMember(1);
					expect(this.generationView.get('displayCurrentlyRunningMember')).toEqual(true);
				});
				it('returns true on the last member in the generation', function(){
					this.generationView.runningMember(20);
					expect(this.generationView.get('displayCurrentlyRunningMember')).toEqual(true);
				});
			});
			describe('when set using memberComplete', function(){
				it('returns true at the beginning of the generation', function(){
					this.generationView.memberComplete(1);
					expect(this.generationView.get('displayCurrentlyRunningMember')).toEqual(true);
				});
				it('returns true on the last member in the generation', function(){
					this.generationView.memberComplete(19);
					expect(this.generationView.get('displayCurrentlyRunningMember')).toEqual(true);
				});
				it('returns false on the last member in the generation', function(){
					this.generationView.memberComplete(20);
					expect(this.generationView.get('displayCurrentlyRunningMember')).toEqual(false);
				});
			});
		});
	});
});