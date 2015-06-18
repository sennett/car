define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/SettingsTemplate',
	'ui/presenters/SettingsPresenter',
	'core/appConfig',
	'css!ui/styles/settings'], function(_, Ractive, template, SettingsPresenter, config, css) {
	
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
				var updateMutation = _.debounce(function(newValue){
					updateRateCb(newValue);
				}, 1000);
				templateInterface.observe('mutationRate', updateMutation, { init: false });
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