define(['../core/car'], function (car) {
	var Engine = function(){
	};

	Engine.prototype = {
		nextCar: function(){
			return car;
		},
		registerScore: function(score){
			console.log('stopped: travelled ' + score + 'm');
		}
	};

	return Engine;
});