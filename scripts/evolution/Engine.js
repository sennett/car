define(['evolution/Genome'], function (Genome) {
	var Engine = function(){
	};

	Engine.prototype = {
		nextGenome: function(){
			return Genome;
		},
		registerScore: function(score){
			console.log('stopped: travelled ' + score + 'm');
		}
	};

	return Engine;
});