define(['evolution/Genome'], function (Genome) {

	var GenomeMater = function (cutoffProvider) {
		this.cutoffProvider = cutoffProvider;
	};

	GenomeMater.prototype = {
		mate: function (genome1, genome2) {
			// count genomes
			// build two arrays, one for each genome
			// two numbers in between the
			return {one: genome1, two: genome2}
		}
	};

	return GenomeMater;
});