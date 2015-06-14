define(['underscore'], function(_) {
    var SettingsView = function(){
		
	};
    
    SettingsView.prototype = _.extend(SettingsView.prototype, {
		onMutationRateChange: function(){},
		onWheelTorqueChange: function(){},
		mutationRateUpdated: function(){},
		mutationRateNotUpdated: function(){},
		wheelTorqueUpdated: function(){},
		wheelTorqueNotUpdated: function(){}
	});
    
    return SettingsView;
});