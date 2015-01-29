define({
	app: {
		create: {
			module: 'App',
			args: [{ $ref: "simulation"}, { $ref: "evolutionEngine"}]
		},
		ready: "run"
	},
	simulation: {
		create:{
			module: 'environment/Simulation',
			args: [{ $ref: "physicsWorldProvider"}, { $ref: "renderer"}, { $ref: "ticker" }, { $ref: "endStateDetector" }]
		},
		ready: {
			initialise: {$ref:'ground'}
		}
	},
	physicsWorldProvider: {
		create: {
			module: 'environment/provider/PhysicsWorldProvider'
		}
	},
	renderer: {
		create: {
			module:'environment/Renderer'
		}
	},
	ticker:{
		create: {
			module: 'environment/Ticker'
		}
	},
	endStateDetector: {
		create: {
			module: 'environment/EndStateDetector'
		}
	},
	ground: {
		create: {
			module:'environment/Ground',
			args: [{$ref:'groundSegmentProvider'}]
		},
		ready: {
			setData: {$ref: 'groundData'}
		}
	},
	groundSegmentProvider: {
		create: {
			module: 'environment/provider/GroundSegmentProvider'
		}
	},
	groundData: {
		module: 'environment/groundData'
	},

	evolutionEngine: {
		create: {
			module: 'evolution/Engine'
		}
	}
});