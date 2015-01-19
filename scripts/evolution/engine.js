define(['environment/car'], function (car) {
	return function(){
		this.nextCar = function(){
			return car;
		};
		this.registerScore = function(score){
			console.log('stopped: travelled ' + score + 'm');
		};
	};
});