define(['scripts/evolution/GenomeMater'], function (GenomeMater) {
	describe('GenomeMater', function(){
		beforeEach(function(){
			this.mater = new GenomeMater();
		});
		it('runs', function(){
			expect(true).toEqual(true);
		});
	});
});