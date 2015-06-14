define(function() {
	
    var SettingsPresenter = function(view, model){
		
		view.onMutationRateChange(function(newMutationRate){
			model.updateMutationRate(newMutationRate, mutationRateChangeResponse);
		});
		
		view.onWheelTorqueChange(function(newWheelTorque){
			model.updateWheelTorqueModifier(newWheelTorque, wheelTorqueChangeResponse);
		});
		
		var mutationRateChangeResponse = {
			success: view.mutationRateUpdated(),
			fail: view.mutationRateNotUpdated()
		};
		
		var wheelTorqueChangeResponse = {
			success: view.wheelTorqueUpdated(),
			fail: view.wheelTorqueNotUpdated()
		}
	};
    
    return SettingsPresenter;
});