define(['evolution/genome', 'underscore'], function(baseGenome, _){
	describe('genome', function(){
		beforeEach(function(){
			this.genome = _.extend({}, baseGenome);
		});

		describe('toArray', function(){
			beforeEach(function(){
				this.genome.addVertex(1, 2);
				this.genome.addVertex(3, 4);
			});

			it('adds vertex genes', function(){
				var genomeAsArray = this.genome.toArray();
				expect(genomeAsArray[0]).toEqual({angle: 1, magnitude: 2, type: 'vertex'});
				expect(genomeAsArray[1]).toEqual({angle: 3, magnitude: 4, type: 'vertex'});
			});

			it('adds wheel genes', function(){

			});
		});

		describe('fromArray', function(){
			it('adds vertex genes', function(){

			});
			it('adds wheel genes', function(){

			});
		});
	});
});