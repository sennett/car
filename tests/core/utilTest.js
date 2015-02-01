define(['core/util'], function (util) {
	describe('core/util', function(){
		describe('crossover', function(){
			it('crosses between start and end index inclusive', function(){
				var arrayOne = ['zero', 'one', 'two','three', 'four'];
				var arrayTwo = ['0', '1', '2','3', '4'];

				var results = util.crossover(arrayOne, arrayTwo, 1, 3);

				expect(results.one).toEqual(['zero', '1', '2','3', 'four']);
				expect(results.two).toEqual(['0', 'one', 'two','three', '4']);
			});
		});
	});
});