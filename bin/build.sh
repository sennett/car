#!/usr/bin/env bash
node node_modules/.bin/r.js -o scripts/buildConfig.js
node_modules/uglify-js/bin/uglifyjs scripts/vendor/require.js -o build/require.js
cp index.html build