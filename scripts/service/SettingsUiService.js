define(['underscore'], function(_) {
    var SettingsUiService = function(evolutionEngine, simulator){
		this.evolutionEngine = evolutionEngine;
		this.simulator = simulator;
		_.bindAll(this, 'updateMutationRate', 'updateWheelTorqueModifier');
	};
    
    SettingsUiService.prototype = _.extend(SettingsUiService.prototype, {
		updateMutationRate: function(newMutationRate, responseObj){
			throw 'not implemented';
		},
		updateWheelTorqueModifier: function(newMutationRate, responseObj){
			throw 'not implemented';
		}
	});
    
    return SettingsUiService;
});