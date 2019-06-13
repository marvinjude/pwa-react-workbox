importScripts("workbox-v4.3.1/workbox-sw.js");

workbox.setConfig({ modulePathPrefix: "workbox-v4.3.1/" });

const precacheManifest = [];

workbox.precaching.precacheAndRoute(precacheManifest);

//Cache fetch reqquest:
const dataCacheConfig = {
  cacheName: "data"
};


//Cache our speakers
workbox.routing.registerRoute(/.*speakers/ , workbox.strategies.cacheFirst(dataCacheConfig), 'GET')
