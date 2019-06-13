module.exports = {
  "globDirectory": "build/",
  "globPatterns": [
    "**/*.{json,ico,png,html,js,css,svg,mjs,gif}"
  ],
  "swDest": "build/sw.js",
  "swSrc": 'src/sw.js',
  "injectionPointRegexp": /(const precacheManifest = )\[\](;)/
};