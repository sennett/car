define(['scripts/environment/provider/groundSegmentProvider'], function(groundSegmentProvider) {
	xdescribe("groundBodyGenerator", function () {
		var assert = function(assertion){
			expect(this.constructorMock.construct).toHaveBeenCalledWith(
				assertion.length, assertion.angle, assertion.xLocation, assertion.yLocation);
		};
		beforeEach(function(){
			this.constructorMock = jasmine.createSpyObj('bodyConstructor', ['construct']);
			this.groundSegmentProvider = new groundSegmentProvider(this.constructorMock);
		});
		describe('makeGroundSegment', function(){
			it("should create horizontal", function () {
				this.groundSegmentProvider.makeGroundSegment({x: 100, y: 100}, {x: 200, y: 100});
				assert.call(this, {
					length:100,
					angle:0,
					xLocation: 150,
					yLocation:100
				});
			});
			it("should create downwards slope", function () {
				this.groundSegmentProvider.makeGroundSegment({x: 0, y: 0}, {x: 3, y: 4});
				assert.call(this, {
					length:5,
					angle:0,
					xLocation: 1.5,
					yLocation:2
				});
			});
			xit("should create upwards slope", function () {
				this.groundSegmentProvider.makeGroundSegment({x: 100, y: 100}, {x: 200, y: 100});
				expect(this.constructorMock.construct).toHaveBeenCalledWith(100, 0, 150, 100);
			});
		});
	});
});