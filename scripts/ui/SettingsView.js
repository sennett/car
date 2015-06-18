define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/SettingsTemplate',
	'ui/presenters/SettingsPresenter'], function(_, Ractive, template, SettingsPresenter) {
    
    return function(settingsUiService){
		var view = new Ractive({
			template: template,
			el: '#settingsTarget',
			data: {
				mutationRate: 'hello!'
			},
			onMutationRateChange: function(updateRateCb){
				this.updateRateCb
			},
			mutationRateUpdated: function(newRate){
				this.set('mutationRate', newRate);
			},
			mutationRateNotUpdated: function(){},
			onWheelTorqueChange: function(){},
			wheelTorqueUpdated: function(){},
			wheelTorqueNotUpdated: function(){}
		});
		
		new SettingsPresenter(view, settingsUiService);
		return view;
	};
});