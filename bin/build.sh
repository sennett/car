#!/usr/bin/env bash
rm -r build/*
node node_modules/.bin/r.js -o scripts/buildConfig.js
node node_modules/.bin/r.js -o scripts/wireBuildConfig.js

cat index.html |\
	sed s,bower_components/requirejs/require.js,require.js,g |\
	sed s,scripts/baseRequireConfig.js,productionRequireConfig.js,g \
	> build/index.html