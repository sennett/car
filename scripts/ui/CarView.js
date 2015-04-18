define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/CarTemplate'], function(_, Ractive, template) {
	
	function createPrototype() {
		return new Ractive({
			template: template,
			append: true,
			data:{
				score: 0,
				complete: false,
				anthony: 'yes'
			},
			setScore: function(score){
				this.set('score', score);
			},
			setSimulationComplete: function(){
				this.set('complete', true);
			}
		});
	};
	
	var CarView = function(){
		var view = createPrototype();
		return view;
	};
	
    CarView.prototype = _.extend(CarView.prototype, createPrototype());
    
    return CarView;
});