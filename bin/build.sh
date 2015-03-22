#!/usr/bin/env bash
rm -r build/*
node node_modules/.bin/r.js -o scripts/buildConfig.js
cp index.html build