define({
	//$plugins: [
	//	'wire/debug'
	//],
	app: {
		create: {
			module: 'core/Evolver',
			args: [{ $ref: "simulator"}, { $ref: "evolutionEngine"}]
		}
	},
	simulator: {
		create:{
			module: 'environment/Simulator',
			args: [
				{ $ref: "physicsWorldProvider"},
				{ $ref: "endStateDetector" },
				{ $ref: "ticker" },
				{ $ref: "facadeRenderer"},
				{ $ref: "scoreNotifier"},
				{ $ref: 'ground'}
			]
		}
	},
	scoreNotifier: {
		create: {
			module: 'environment/ScoreNotifier',
			args: [
				{ $ref: "facadeRenderer"}
			]
		}
	},
	physicsWorldProvider: {
		create: {
			module: 'environment/provider/PhysicsWorldProvider'
		}
	},
	facadeRenderer: {
		create:{
			module:'environment/renderer/FacadeRenderer',
			args: [{$ref: 'nullRenderer'}, {$ref: 'visibleRenderer'}]
		}
	},
	visibleRenderer: {
		create: {
			module:'environment/renderer/CanvasDebugRenderer'
		}
	},
	nullRenderer: {
		create: {
			module:'environment/renderer/NullRenderer'
		}
	},
	ticker:{
		create: {
			module: 'environment/Ticker',
			args: [{ $ref: 'windowWrapper' }]
		}
	},
	windowWrapper: {
		module: 'environment/documentWindowWrapper'
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
		}
	},
	groundSegmentProvider: {
		create: {
			module: 'environment/provider/GroundSegmentProvider'
		}
	},
	evolutionEngine: {
		create: {
			module: 'evolution/Engine',
			args:[ 
				{$ref:'scoreNotifier'}
			]
		}
	},
	fastForward:{
		create: {
			module: 'environment/FastForward',
			args: [{$ref: 'facadeRenderer'}, {$ref: 'ticker'}]
		}
	},

	// UI

	currentStateView: {
		create: {
			module: 'ui/CurrentStateView',
			args: [{$ref: 'fastForward'}, {$ref: 'app'}, {$ref:'endStateDetector'}]
		}
	},

	generationsListView: {
		create: {
			module: 'ui/GenerationsListView',
			args: [{ $ref: "generationsUiService"}, {$ref: 'domNodeProvider'}]
		}
	},

	generationsUiService: {
		create: {
			module: 'service/GenerationsUiService',
			args: [
				{ $ref: "evolutionEngine"},
				{ $ref: "scoreNotifier"}
			]
		}
	},
	
	settingsUiService: {
		create: {
			module: 'service/SettingsUiService',
			args: [
				{ $ref: "evolutionEngine"},
				{ $ref: "simulator"}
			]
		}
	},
	
	settingsView: {
		create: {
			module: 'ui/SettingsView',
			args: [{$ref: 'settingsUiService'}]
		}
	},
	
	graphView: {
		create: {
			module: 'ui/Graph',
			args: [{$ref: 'generationsUiService'}]
		}
	},

	domNodeProvider: {
		module: 'ui/domNodeProvider'
	}
});