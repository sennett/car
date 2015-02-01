define(['core/util'], function (util) {
	describe('core/util', function(){
		describe('crossover', function(){
			beforeEach(function(){
				this.arrayOne = ['zero', 'one', 'two','three', 'four'];
				this.arrayTwo = ['0', '1', '2','3', '4'];
			});

			it('crosses between start and end index inclusive', function(){
				var results = util.crossover(this.arrayOne, this.arrayTwo, 1, 3);

				expect(results.one).toEqual(['zero', '1', '2','3', 'four']);
				expect(results.two).toEqual(['0', 'one', 'two','three', '4']);
			});

			it('crosses the entire array', function(){
				var results = util.crossover(this.arrayOne, this.arrayTwo, 0, 4);

				expect(results.one).toEqual(['0', '1', '2','3', '4']);
				expect(results.two).toEqual(['zero', 'one', 'two','three', 'four']);
			});

			it('throws exception with arrays not of equal length', function(){
				var shouldThrow = function(){
					util.crossover([], ['something']);
				};
				expect(shouldThrow).toThrow("cannot cross arrays of different lengths");
			});
		});
	});
});