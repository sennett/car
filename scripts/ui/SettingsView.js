define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/SettingsTemplate',
	'ui/presenters/SettingsPresenter',
	'core/appConfig'], function(_, Ractive, template, SettingsPresenter, config) {
	
    return function(settingsUiService){
		
		var templateInterface = new Ractive({
			template: template,
			el: '#settingsTarget',
			data: {
				mutationRate: config.defaultMutationRate
			}
		});
		
		var publicInterface = {
			onMutationRateChange: function(updateRateCb){
				templateInterface.observe('mutationRate', function(newValue){
					updateRateCb(newValue);
				}, { init: false });
			},
			mutationRateUpdated: function(responseMessage, mutationRate){
				console.log(responseMessage);
				templateInterface.set('mutationRate', mutationRate);
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