define(['evolution/genome', 'underscore', 'core/util'], function (genome, _, util) {

	var GenomeMater = function (cutoffProvider) {
		this.cutoffProvider = cutoffProvider;
	};

	GenomeMater.prototype = {
		mate: function (genome1, genome2) {
			var genomeOneArray = [], genomeTwoArray = [];
			return {one: genome1, two: genome2}
		}
	};

	return GenomeMater;
});