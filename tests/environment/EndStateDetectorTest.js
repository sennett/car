define(['environment/EndStateDetector'], function (EndStateDetector) {
	describe('EndStateDetectorTest', function () {
		beforeEach(function(){
			this.endStateDetector = new EndStateDetector();
			this.carBody = jasmine.createSpyObj('carBody', ['IsAwake']);
			this.endStateDetector.initialise(this.carBody);
		});
		it('ends the simulation on car sleeping', function(){
			this.carBody.IsAwake.and.returnValue(false);
			expect(this.endStateDetector.simulationEnded()).toEqual(true);
		});
	});
});