define(function () {
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
		}
	};
});