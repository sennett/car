define(['presenterFirst/Presenter', 'presenterFirst/Model', 'presenterFirst/View'], function (Presenter, Model, View) {
	describe('Presenter', function () {
		describe('basic wiring', function(){
			it('can use the prototype of the model', function(){
				spyOn(Model.prototype, 'aMethodOnModel');
				new Presenter(null, Model.prototype);
				expect(Model.prototype.aMethodOnModel).toHaveBeenCalled();
			});
		});
	});
});