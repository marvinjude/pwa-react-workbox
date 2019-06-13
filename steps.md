## 1. Add Manifest.json to public directory

yarn build

## 2. generate config

workbox wizard

## 3 Generate workbox config

<!-- CRA's `register()` stop here -->

`workbox generateSW workbox-config.js`

## 4. Create Custom service worker in `src/sw.js` with boilerplate , while sourcing workbox locally

```js
importScripts("workbox-v4.3.1/workbox-sw.js");

workbox.setConfig({ modulePathPrefix: "workbox-v4.3.1/" });

const precacheManifest = [];

workbox.precaching.precacheAndRoute(precacheManifest);
```

## 5. Modify workbox-config to point to custom sw and injectionPointRegexp

```json
{
  "swSrc": "src/sw.js",
  "injectionPointRegexp": /(const precacheManifest = )\[\](;)/
}
```

## 6. Load sw from index.html or index.js - (it doesn't make sense so do PWA thing when we aren't running build)

```js
const isProduction = "%NODE_ENV%" === "production";

if (isProduction && "serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
```

## 7. Rebuild

## 8. Add start-sw to package.json
`"start-sw": "workbox copyLibraries build/ && workbox injectManifest workbox-config.js && http-server build/ -c-1"`

`yarn start-sw`

## 9. Cache data from API

```js
const dataCacheConfig = { cacheName: "data" };
workbox.routing.registerRoute(
  /.\*speakers/,
  workbox.strategies.cacheFirst(dataCacheConfig),
  "GET"
);
```
