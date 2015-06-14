define(['underscore'], function(_) {
    var SettingsPresenter = function(view, model){
		view.onMutationRateChange(function(newMutationRate){
			model.setMutationRate(newMutationRate, mutationRateChangeResponse);
			
		});
		
		view.onWheelTorqueChange(function(newWheelTorque){
			model.setNewWheelTorque(newWheelTorque, wheelTalkChangeResponse);
		});
		
		var mutationRateChangeResponse = {
			success: view.mutationRateUpdated(),
			fail: view.mutationRateNotUpdated()
		};
		
		var wheelTalkChangeResponse = {
			success: view.wheelTorqueUpdated(),
			fail: view.wheelTorqueNotUpdated()
		}
	};
    
    return SettingsPresenter;
});