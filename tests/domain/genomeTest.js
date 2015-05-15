define(['domain/genome', 'underscore'], function(baseGenome, _){
	var exerciseRandomGenomeAndSerialise = function(){
		return baseGenome.createRandom().serialise();
	};
	
	var assertBothContainTheSameNumberOfGenes = function(arrayOne, arrayTwo){
		expect(arrayOne.length).toEqual(arrayTwo.length);
	};
	
	var assertBothContainDifferentGenes = function(arrayOne, arrayTwo) {
		expect(arrayOne).not.toEqual(arrayTwo);
	};
	
	describe('genome', function(){
		beforeEach(function(){
			this.genome = _.extend({}, baseGenome);
		});

		describe('toArray', function(){
			beforeEach(function(){
				this.genome.fromArray([
					{angle: 1, magnitude: 2, type: this.genome.geneType.vertex},
					{angle: 3, magnitude: 4, type: this.genome.geneType.vertex},
					{vertex: 0, radius: 5, type: this.genome.geneType.wheel},
					{vertex: 1, radius: 6, type: this.genome.geneType.wheel}
				]);
			});

			it('adds vertex genes', function(){
				var genomeAsArray = this.genome.toArray();
				expect(genomeAsArray[0]).toEqual({angle: 1, magnitude: 2, type: this.genome.geneType.vertex});
				expect(genomeAsArray[1]).toEqual({angle: 3, magnitude: 4, type: this.genome.geneType.vertex});
			});

			it('adds wheel genes', function(){
				var genomeAsArray = this.genome.toArray();
				expect(genomeAsArray[2]).toEqual({vertex: 0, radius: 5, type: this.genome.geneType.wheel});
				expect(genomeAsArray[3]).toEqual({vertex: 1, radius: 6, type: this.genome.geneType.wheel});
			});
		});

		describe('fromArray', function(){
			beforeEach(function(){
				this.genome.fromArray([
					{angle: 1, magnitude: 2, type: this.genome.geneType.vertex},
					{angle: 3, magnitude: 4, type: this.genome.geneType.vertex},
					{vertex: 0, radius: 5, type: this.genome.geneType.wheel},
					{vertex: 1, radius: 6, type: this.genome.geneType.wheel}
				]);
			});
			it('applies vertex genes', function(){
				expect(this.genome.angle0).toEqual(1);
				expect(this.genome.magnitude0).toEqual(2);
				expect(this.genome.angle1).toEqual(3);
				expect(this.genome.magnitude1).toEqual(4);
			});
			it('applies wheel genes', function(){
				expect(this.genome.wheelVertex0).toEqual(0);
				expect(this.genome.wheelRadius0).toEqual(5);
				expect(this.genome.wheelVertex1).toEqual(1);
				expect(this.genome.wheelRadius1).toEqual(6);
			});
		});
		
		describe('randomise', function(){
			it('clears old genes', function(){
				var genomeOne = exerciseRandomGenomeAndSerialise();
				var genomeTwo = exerciseRandomGenomeAndSerialise();
				assertBothContainTheSameNumberOfGenes(genomeOne, genomeTwo);
			});
			it('does not copy reference to new genes', function(){
				var genomeOne = exerciseRandomGenomeAndSerialise();
				var genomeTwo = exerciseRandomGenomeAndSerialise();
				assertBothContainDifferentGenes(genomeOne, genomeTwo);
			});
		});
	});
});