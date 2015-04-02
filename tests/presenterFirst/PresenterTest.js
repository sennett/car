define(['presenterFirst/Presenter', 'presenterFirst/Model', 'presenterFirst/View'], function (Presenter, Model, View) {
	describe('Presenter', function () {
		describe('basic wiring', function(){
			it('can use the prototype of the model', function(){
				spyOn(Model.prototype, 'aMethodOnModel');
				new Presenter(null, Model.prototype);
				expect(Model.prototype.aMethodOnModel).toHaveBeenCalledWith('hello model from presenter');
			});
			it('can use the prototype of the view', function(){
				spyOn(View.prototype, 'aMethod');
				new Presenter(View.prototype, null);
				expect(View.prototype.aMethod).toHaveBeenCalledWith('hello view from presenter');
			});
		});
		describe('instantiating views', function(){
			it('does not allow two instances to collide', function(){
				var viewOne = new View();
				var viewTwo = new View();
				viewOne.aMethod('hello view one');
				viewTwo.aMethod('hello view two');
				expect(viewOne.get('thing')).toEqual('hello view one');
				expect(viewTwo.get('thing')).toEqual('hello view two');
			});
		});
	});
});