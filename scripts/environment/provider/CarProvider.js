define(['underscore', 'core/Car'], function(_, Car) {
    var CarProvider = function(){};
    
    CarProvider.prototype = _.extend(CarProvider.prototype, {
		createCar: function(genome){
			return new Car(genome);
		}
	});
    
    return CarProvider;
});