define(['scripts/environment/groundBodyGenerator'], function(groundBodyGenerator) {
	describe("groundBodyGenerator", function () {
		beforeEach(function(){
			this.constructorMock = jasmine.createSpyObj('bodyConstructor', ['construct']);
			this.groundBodyGenerator = new groundBodyGenerator(this.constructorMock);
		});
		describe('generate', function(){
			it("should create horizontal", function () {
				this.groundBodyGenerator.generate({x: 100, y: 100}, {x: 200, y: 100});
				expect(this.constructorMock.construct).toHaveBeenCalledWith(100, 0, 150, 100);
			});
		});
	});
});