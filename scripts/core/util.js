define(['underscore'], function (_) {
	return {
		random: function(min, max){
			return Math.random() * (max - min) + min;
		},
		crossover: function(inArrayOne, inArrayTwo, startIndex, endIndex){
			if (inArrayOne.length != inArrayTwo.length)
				throw "cannot cross arrays of different lengths";

			var outArrayOne = [], outArrayTwo = [];
			for (var i = 0; i < inArrayOne.length; i++){
				if (i >= startIndex && i <= endIndex){
					outArrayTwo[i] = inArrayOne[i];
					outArrayOne[i] = inArrayTwo[i];
				} else {
					outArrayTwo[i] = inArrayTwo[i];
					outArrayOne[i] = inArrayOne[i];
				}
			}

			return {
				one: outArrayOne,
				two: outArrayTwo
			};
		},
		selectAtScore: function(array, percentile){
			var totalScore = 0;
			_.each(array, function(scoredItem){
				totalScore += scoredItem.score;
			});
			var requiredScore = totalScore * percentile / 100;
			var runningTotal = 0;
			var returnableItem;
			_.each(array, function(scoredItem){
				if (!returnableItem && runningTotal <= requiredScore && requiredScore <= scoredItem.score + runningTotal)
					returnableItem = scoredItem;
				runningTotal+= scoredItem.score;
			});
			return returnableItem;
		}
	};
});