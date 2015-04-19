define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/CarTemplate'], function(_, Ractive, template) {
	
	function createPrototype(carData) {
		
		return new Ractive({
			template: template,
			append: true,
			data: carData,
			setScore: function(score){
				this.set('score', score);
			},
			setSimulationComplete: function(){
				this.set('complete', true);
			}
		});
	};
	
	var CarView = function(carData){
		var view = createPrototype(carData);
		return view;
	};
	
    CarView.prototype = _.extend(CarView.prototype, createPrototype());
    
    return CarView;
});