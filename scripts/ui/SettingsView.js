define([
	'underscore',
	'ractiveRuntime',
	'rv!ui/templates/SettingsTemplate',
	'ui/presenters/SettingsPresenter',
	'core/appConfig',
	'css!ui/styles/settings',
	'ractiveTransitionsFade'], function(_, Ractive, template, SettingsPresenter, config, css, ractiveTransitionsFade) {
	
    return function(settingsUiService){
		var updateMutationRateChangeListener;
		
		var templateInterface = new Ractive({
			template: template,
			el: '#settingsTarget',
			data: {
				mutationRate: config.defaultMutationRate,
				mutationRateMessage: "",
				mutationRateMessageVisible: false
			},
			transitions: {
				fade: ractiveTransitionsFade
			}
		});

		templateInterface.observe('mutationRateMessage', function(){
			templateInterface.set('mutationRateMessageVisible', true);
			setTimeout(function(){
				templateInterface.set('mutationRateMessageVisible', false);
			}, 1000);
		});
		
		templateInterface.observe('mutationRate', function(newValue, oldValue, keypath){
			if (!isNumber(newValue) || isEmpty(newValue))
				resetValue();
			
			function isEmpty(value){
				return value == '';
			}
			
			function isNumber(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			}

			function resetValue(){
				// does not work without timeout. 
				// afaik, ractive 0.7 was supposed to fix this
				// but apparently is still needed
				setTimeout(function(){
					templateInterface.set(keypath, oldValue);
				}, 0);
			}
		});
		
		templateInterface.on('confirmValue', function(){
			updateMutationRateChangeListener(parseFloat(templateInterface.get('mutationRate')));
		});
		
		var publicInterface = {
			onMutationRateChange: function(updateRateCb){
				updateMutationRateChangeListener = updateRateCb;
			},
			mutationRateUpdated: function(message, mutationRate){
				templateInterface.set('mutationRateMessage', message);
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