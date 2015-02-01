define(['evolution/genome', 'underscore'], function(baseGenome, _){
	describe('genome', function(){
		beforeEach(function(){
			this.genome = _.extend({}, baseGenome);
		});

		describe('toArray', function(){
			beforeEach(function(){
				this.genome.addVertex(1, 2);
				this.genome.addVertex(3, 4);
				this.genome.addWheel(0, 5);
				this.genome.addWheel(1, 6);
			});

			it('adds vertex genes', function(){
				var genomeAsArray = this.genome.toArray();
				expect(genomeAsArray[0]).toEqual({angle: 1, magnitude: 2, type: 'vertex'});
				expect(genomeAsArray[1]).toEqual({angle: 3, magnitude: 4, type: 'vertex'});
			});

			it('adds wheel genes', function(){
				var genomeAsArray = this.genome.toArray();
				expect(genomeAsArray[2]).toEqual({vertex: 0, magnitude: 5, type: 'wheel'});
				expect(genomeAsArray[3]).toEqual({vertex: 1, magnitude: 6, type: 'wheel'});
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