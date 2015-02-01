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

		describe('selectAtScore', function(){
			beforeEach(function(){
				this.data = [
					{score: 10},
					{score: 2.5},
					{score: 30},
					{score: 1}
				];
			});

			it('selects the lowest value on 0', function(){
				var result = util.selectAtScore(this.data, 0);
				expect(result).toBe(this.data[0]);
			});

			it('selects the highest value on 100', function(){
				var result = util.selectAtScore(this.data, 100);
				expect(result).toBe(this.data[3]);
			});

			describe('when selecting a middle value', function(){
				it('selects the correct middle value', function(){
					var result = util.selectAtScore(this.data, 25);
					expect(result).toBe(this.data[1]);
				});

				it('selects the other correct middle value', function(){
					var result = util.selectAtScore(this.data, 33);
					expect(result).toBe(this.data[2]);
				});
			});
		});
	});
});