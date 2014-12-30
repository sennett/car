define(['physicsjs', 'underscore'], function(Physics, _) {

	var World = function World(groundSegmentProvider, physicsWorldProvider) {
		var _this = this;

		this.groundSegmentProvider = groundSegmentProvider;
		this.physicsWorldProvider = physicsWorldProvider;

		this.world = this.physicsWorldProvider.world(function (world) {
			// bounds of the window
			var viewportBounds = Physics.aabb(0, 0, window.innerWidth, window.innerHeight);

			// create a renderer
			_this.renderer = Physics.renderer('canvas', {
				el: 'viewport'
			});

			// add the renderer
			world.add(_this.renderer);
			// render on each step
			world.on('step', function () {
				world.render();
			});

			// constrain objects to these bounds
			_this.edgeBounce = Physics.behavior('edge-collision-detection', {
				aabb: viewportBounds, restitution: 0.99, cof: 0.8
			});

			// resize events
			window.addEventListener('resize', function () {

				// as of 0.7.0 the renderer will auto resize... so we just take the values from the renderer
				viewportBounds = Physics.aabb(0, 0, _this.renderer.width, _this.renderer.height);
				// update the boundaries
				_this.edgeBounce.setAABB(viewportBounds);

			}, true);

			// add things to the world
			world.add([
				Physics.behavior('interactive', {el: _this.renderer.container}),
				Physics.behavior('constant-acceleration'),
				Physics.behavior('body-impulse-response'),
				_this.edgeBounce,
				Physics.behavior('body-collision-detection'),
				Physics.behavior('sweep-prune')
			]);
		});

		this.setCar = function(car){
			// create some bodies
			_this.world.add(Physics.body('circle', {
				x: _this.renderer.width * 0.4, y: _this.renderer.height * 0.3, vx: 0.3, radius: 80, styles: {
					fillStyle: '#cb4b16', angleIndicator: '#72240d'
				}
			}));

			_this.world.add(Physics.body('circle', {
				x: _this.renderer.width * 0.7, y: _this.renderer.height * 0.3, vx: -0.3, radius: 40, styles: {
					fillStyle: '#6c71c4', angleIndicator: '#3b3e6b'
				}
			}));


		};

		this.setGround = function(ground){
			_.each(ground.points, function(point, index){
				var nextPoint = ground.points[index + 1];
				if (nextPoint)
					_this.world.add(_this.groundSegmentProvider.makeGroundSegment(point, nextPoint).getPhysicsBody());
			});
		};

		this.start = function(){
			Physics.util.ticker.on(function (time) {
				_this.world.step(time);
			});
		};

	};

	return World;
});