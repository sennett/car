define(['evolution/genome', 'underscore', 'core/util'], function (genome, _, util) {

	var GenomeMater = function (cutoffProvider) {
		this.cutoffProvider = cutoffProvider;
	};

	GenomeMater.prototype = {
		mate: function (parentOne, parentTwo) {
			if(_.isUndefined(parentOne) || _.isUndefined(parentTwo))
				debugger;

			var firstRand = _.random(0, parentOne.totalGenes());
			var offspringData = util.crossover(parentOne.toArray(), parentTwo.toArray(), firstRand, _.random(firstRand, 10)),
				childOne = _.extend({}, genome),
				childTwo = _.extend({}, genome);
			childOne.fromArray(offspringData.one);
			childTwo.fromArray(offspringData.two);
			return {
				one: childOne,
				two: childTwo
			};
		}
	};

	return GenomeMater;
});