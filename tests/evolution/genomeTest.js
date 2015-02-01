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
				expect(genomeAsArray[2]).toEqual({vertex: 0, radius: 5, type: 'wheel'});
				expect(genomeAsArray[3]).toEqual({vertex: 1, radius: 6, type: 'wheel'});
			});
		});

		xdescribe('fromArray', function(){
			beforeEach(function(){
				this.genome.fromArray([
					{angle: 1, magnitude: 2, type: 'vertex'},
					{angle: 3, magnitude: 4, type: 'vertex'},
					{vertex: 0, radius: 5, type: 'wheel'},
					{vertex: 1, radius: 6, type: 'wheel'}
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
	});
});