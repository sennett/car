define(['underscore', 
	'ractiveRuntime', 
	'rv!ui/templates/CarTemplate'], function(_, Ractive, template) {
    var CarView = Ractive.extend({
		template: template,
		computed: {
			// Data context for computed properties
			simulationIsCompleteClass: function(){
				return this.get('complete') ? "complete" : "incomplete";
			}
		}
	});
    
    return CarView;
});