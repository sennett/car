define(['scripts/environment/groundSegmentProvider'], function(groundSegmentProvider) {
	describe("groundBodyGenerator", function () {
		beforeEach(function(){
			this.constructorMock = jasmine.createSpyObj('bodyConstructor', ['construct']);
			this.groundSegmentProvider = new groundSegmentProvider(this.constructorMock);
		});
		describe('makeGroundSegment', function(){
			it("should create horizontal", function () {
				this.groundSegmentProvider.makeGroundSegment({x: 100, y: 100}, {x: 200, y: 100});
				expect(this.constructorMock.construct).toHaveBeenCalledWith(100, 0, 150, 100);
			});
		});
	});
});