define(['scripts/environment/groundBodyGenerator'], function(groundBodyGenerator) {

	beforeEach(function(){
		this.constructorMock = jasmine.createSpyObj('bodyConstructor', ['construct']);
		this.groundBodyGenerator = new groundBodyGenerator(this.constructorMock);
	});

	describe("groundBodyGenerator", function () {
		describe('generate', function(){
			it("should call constructor", function () {
				this.groundBodyGenerator.generate();
				expect(this.constructorMock.construct).toHaveBeenCalled();
			});
		});
	});
});