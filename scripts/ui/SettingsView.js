define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/SettingsTemplate',
	'ui/presenters/SettingsPresenter',
	'core/appConfig'], function(_, Ractive, template, SettingsPresenter, config) {
	
    return function(settingsUiService){
		var mutationRateChangeCb;
		
		var templateInterface = new Ractive({
			template: template,
			el: '#settingsTarget',
			data: {
				mutationRate: config.defaultMutationRate
			}
		});
		
		
		
		var publicInterface = {
			onMutationRateChange: function(updateRateCb){
				mutationRateChangeCb = updateRateCb;
			},
			mutationRateUpdated: function(newRate){
				templateInterface.set('mutationRate', newRate);
			},
			mutationRateNotUpdated: function(){},
			onWheelTorqueChange: function(){},
			wheelTorqueUpdated: function(){},
			wheelTorqueNotUpdated: function(){}
		};
		
		new SettingsPresenter(publicInterface, settingsUiService);
		return publicInterface;
	};
});