'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "474bc5649d2f69164a71ae345467e6ea",
"/": "474bc5649d2f69164a71ae345467e6ea",
"version.json": "7d7afe391f5d81dd16f6f20cd403cc46",
"manifest.json": "9f3094c44b2ebc6cc6c21304168e0563",
"main.dart.js": "08814a2fb3e00f7d9daf2cc376634d34",
"canvaskit/profiling/canvaskit.wasm": "a9610cf39260f60fbe7524a785c66101",
"canvaskit/profiling/canvaskit.js": "f3bfccc993a1e0bfdd3440af60d99df4",
"canvaskit/canvaskit.wasm": "04ed3c745ff1dee16504be01f9623498",
"canvaskit/canvaskit.js": "43fa9e17039a625450b6aba93baf521e",
"404.html": "ac65368a0327a211f3ac5b76b86e8a2b",
"CNAME": "f2a3989d8c3ba538775bd20218256b30",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/favicon-96x96.png": "a69a0290dd64ee751f2764cbbc67491e",
"icons/ms-icon-70x70.png": "6bb2f15ee0485ce67c1d027e4ff754e8",
"icons/apple-icon-76x76.png": "36c1187b724d3e55fb629a4531f96e6b",
"icons/apple-icon-60x60.png": "0d12d46f7a588c3851f19ab8055fabc5",
"icons/android-icon-48x48.png": "f929e01cb935b582829c3e1862bd1557",
"icons/manifest.json": "b58fcfa7628c9205cb11a1b2c3e8f99a",
"icons/apple-icon-72x72.png": "02492169824eac94ab96807a220599b4",
"icons/favicon-32x32.png": "c41271e440f1cafe34629a0ed7660133",
"icons/apple-icon-precomposed.png": "61dc7df5e69585c90091019c6f305cac",
"icons/android-icon-144x144.png": "61bafbe649a16f2b65a660b7060cd2ba",
"icons/ms-icon-310x310.png": "f8f0777d41190ee3c6a87dc877dad2ae",
"icons/apple-icon-57x57.png": "537bbd84e567d9b7e9345a12111d2590",
"icons/android-icon-96x96.png": "a69a0290dd64ee751f2764cbbc67491e",
"icons/android-icon-36x36.png": "7efaa768f16e0038fc06905ea93e0975",
"icons/apple-icon-120x120.png": "2acf01d4d4c46452f681dc0e6cba4cb2",
"icons/apple-icon-152x152.png": "4956e43003bb8321a11efd96f56fbdb4",
"icons/apple-icon-144x144.png": "61bafbe649a16f2b65a660b7060cd2ba",
"icons/android-icon-72x72.png": "02492169824eac94ab96807a220599b4",
"icons/ms-icon-150x150.png": "673490079fb94f10e49cf227311303b7",
"icons/apple-icon-114x114.png": "a9d5becf987cac6935f072f803151e3f",
"icons/favicon.ico": "e32db6cbd141e8ec95842f64107ff0b0",
"icons/apple-icon-180x180.png": "91e1d9ff20ffdbc6df126ba75e906c92",
"icons/browserconfig.xml": "653d077300a12f09a69caeea7a8947f8",
"icons/ms-icon-144x144.png": "61bafbe649a16f2b65a660b7060cd2ba",
"icons/android-icon-192x192.png": "582f1aa9414ad806e31bbab70ce63a35",
"icons/favicon-16x16.png": "b35434bfb5c9fb1867459b9a077f1865",
"icons/apple-icon.png": "61dc7df5e69585c90091019c6f305cac",
"assets/FontManifest.json": "1458e6f72312fd50a116d8994e9fbfb3",
"assets/AssetManifest.json": "72bbbfae3c22179af92b60cc6fad81d1",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/fluttertoast/assets/toastify.css": "a85675050054f179444bc5ad70ffc635",
"assets/packages/fluttertoast/assets/toastify.js": "e7006a0a033d834ef9414d48db3be6fc",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/NOTICES": "717d64fd9b3bba6be00c3dd59672972f",
"assets/assets/images/donut-blue.png": "965911f59710d7d9059f170e42b9d961",
"assets/assets/fonts/Pacifico.ttf": "9b94499ccea3bd82b24cb210733c4b5e"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
