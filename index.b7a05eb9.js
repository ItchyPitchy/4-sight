// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"fUTXd":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"jeorp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _game = require("./game");
var _gameDefault = parcelHelpers.interopDefault(_game);
const mainCanvas = document.querySelector("#gameScreen");
const mainCtx = mainCanvas.getContext("2d");
const shadowCanvas = document.querySelector("#shadowCanvas");
const shadowCtx = shadowCanvas.getContext("2d");
const sightCanvas = document.querySelector("#sightCanvas");
const sightCtx = sightCanvas.getContext("2d");
// ctx.imageSmoothingEnabled = true;
// ctx.imageSmoothingQuality = "high";
const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;
mainCanvas.width = GAME_WIDTH;
mainCanvas.height = GAME_HEIGHT;
shadowCanvas.width = GAME_WIDTH;
shadowCanvas.height = GAME_HEIGHT;
sightCanvas.width = GAME_WIDTH;
sightCanvas.height = GAME_HEIGHT;
const game = new (0, _gameDefault.default)(GAME_WIDTH, GAME_HEIGHT, mainCtx, shadowCtx, sightCtx);
let oldTimeStamp = 0;
function gameLoop(timestamp) {
    // dt i sekunder
    let dt = (timestamp - oldTimeStamp) / 1000;
    oldTimeStamp = timestamp;
    mainCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    shadowCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    sightCtx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    game.update(dt);
    game.draw(mainCtx, shadowCtx, sightCtx);
    requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);

},{"./game":"edeGs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"edeGs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _level1 = require("./Level/Level1");
class Game {
    constructor(gameWidth, gameHeight, mainCtx, shadowCtx, sightCtx){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.mainCtx = mainCtx;
        this.shadowCtx = shadowCtx;
        this.sightCtx = sightCtx;
        this.level = new (0, _level1.Level1)();
        this.entities = [];
        this.keys = new Set();
        this.mousePos = null;
        document.querySelector("#gameScreen").addEventListener("click", (e)=>{
            this.keys.add("leftClick");
        });
        // (
        //   document.querySelector("#gameScreen") as HTMLCanvasElement
        // ).addEventListener("mouseup", (e) => {
        //   this.keys.delete("leftClick");
        // });
        document.querySelector("#gameScreen").addEventListener("mousemove", (e)=>{
            this.mousePos = {
                x: e.offsetX,
                y: e.offsetY
            };
        });
        this.start();
    }
    start() {
        this.level.buildLevel(this.gameWidth, this.gameHeight);
    }
    update(dt) {
        this.level.update(dt, this);
    }
    draw(mainCtx, shadowCtx, sightCtx) {
        this.level.draw(mainCtx, shadowCtx, sightCtx);
    }
}
exports.default = Game;

},{"./Level/Level1":"gFPXY","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gFPXY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Level1", ()=>Level1);
var _level = require("./Level");
class Level1 extends (0, _level.Level) {
    constructor(){
        const structure = [
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ],
            [
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1,
                1,
                1,
                1,
                1,
                1,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                3,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                0,
                1
            ],
            [
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1,
                1
            ]
        ];
        super(structure);
    }
}

},{"./Level":"exWig","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"exWig":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Level", ()=>Level);
var _collisionSystem = require("../System/CollisionSystem");
var _moveSystem = require("../System/MoveSystem");
var _moveSystemDefault = parcelHelpers.interopDefault(_moveSystem);
var _playerSystem = require("../System/PlayerSystem");
var _playerSystemDefault = parcelHelpers.interopDefault(_playerSystem);
var _shootSystem = require("../System/ShootSystem");
var _lightsourceSystem = require("../System/LightsourceSystem");
var _lightsourceSystemDefault = parcelHelpers.interopDefault(_lightsourceSystem);
var _cell = require("../Entity/Cell");
var _cellDefault = parcelHelpers.interopDefault(_cell);
var _player1 = require("../Entity/Player1");
var _wall = require("../Entity/Wall");
var _wallDefault = parcelHelpers.interopDefault(_wall);
var _rectHitbox = require("../Component/RectHitbox");
var _rectHitboxDefault = parcelHelpers.interopDefault(_rectHitbox);
var _circleHitbox = require("../Component/CircleHitbox");
var _circleHitboxDefault = parcelHelpers.interopDefault(_circleHitbox);
var _lightSource = require("../Component/LightSource");
var _lightSourceDefault = parcelHelpers.interopDefault(_lightSource);
class Level {
    constructor(structure){
        this.structure = structure;
        this.systems = [
            new (0, _playerSystemDefault.default)(),
            new (0, _moveSystemDefault.default)(),
            new (0, _collisionSystem.CollisionSystem)()
        ];
        this.shadowSystem = new (0, _lightsourceSystemDefault.default)();
        this.ShootSystem = new (0, _shootSystem.ShootSystem)();
        this.entities = [];
        this.offsetX = 0;
        this.offsetY = 0;
    }
    buildLevel(gameWidth, gameHeight) {
        const entities = [];
        const rowLength = this.structure[0].length;
        const columnLength = this.structure.length;
        for (const row of this.structure){
            if (row.length !== rowLength) throw new Error("Not all rows in level structure have the same size");
        }
        const gameWidthHeightRatio = gameWidth / gameHeight;
        const levelWidthHeightRatio = rowLength / columnLength;
        let cellSize = 0;
        if (gameWidthHeightRatio < levelWidthHeightRatio) {
            cellSize = gameWidth / rowLength;
            this.offsetX = 0;
            this.offsetY = (gameHeight - cellSize * columnLength) / 2;
        } else {
            cellSize = gameHeight / columnLength;
            this.offsetX = (gameWidth - cellSize * rowLength) / 2;
            this.offsetY = 0;
        }
        if (cellSize <= 0) throw new Error("Cell size less than 0");
        this.structure.forEach((row, rowIndex)=>{
            row.forEach((rowColumn, rowColumnIndex)=>{
                const index = {
                    x: rowColumnIndex,
                    y: rowIndex
                };
                entities.push(new (0, _cellDefault.default)({
                    x: cellSize * index.x + this.offsetX,
                    y: cellSize * index.y + this.offsetY
                }, {
                    width: cellSize,
                    height: cellSize
                }));
                switch(rowColumn){
                    case 1:
                        {
                            const wall = new (0, _wallDefault.default)({
                                x: cellSize * index.x + this.offsetX,
                                y: cellSize * index.y + this.offsetY
                            }, {
                                width: cellSize,
                                height: cellSize
                            });
                            wall.addComponents(new (0, _rectHitboxDefault.default)());
                            entities.push(wall);
                            break;
                        }
                    case 3:
                        {
                            const player = new (0, _player1.Player1)({
                                x: cellSize * index.x + this.offsetX,
                                y: cellSize * index.y + this.offsetY
                            }, {
                                width: cellSize,
                                height: cellSize
                            });
                            player.addComponents(new (0, _circleHitboxDefault.default)(), new (0, _lightSourceDefault.default)());
                            entities.push(player);
                            break;
                        }
                    default:
                        break;
                }
            });
        });
        this.entities = entities;
    }
    update(dt, game) {
        for (const system of [
            ...this.systems,
            this.shadowSystem,
            this.ShootSystem
        ]){
            const filteredCells = this.entities.filter(system.appliesTo);
            system.update(filteredCells, dt, this, game);
        }
    }
    draw(mainCtx, shadowCtx, sightCtx) {
        for (const entity of this.entities)entity.draw(mainCtx);
        for (const system of this.systems)system.draw(mainCtx);
        this.shadowSystem.draw(shadowCtx);
        this.ShootSystem.draw(sightCtx);
    }
}

},{"../System/CollisionSystem":"gixWK","../System/MoveSystem":"cuuW5","../System/PlayerSystem":"2Jrcy","../System/ShootSystem":"duP3I","../System/LightsourceSystem":"fiTiQ","../Entity/Cell":"1Q7Rd","../Entity/Player1":"5Raoz","../Entity/Wall":"dZG75","../Component/RectHitbox":"ae29J","../Component/CircleHitbox":"fha8S","../Component/LightSource":"aPJ2N","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gixWK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CollisionSystem", ()=>CollisionSystem);
var _systemJs = require("./System.js");
var _hitboxJs = require("../Component/Hitbox.js");
var _vectorJs = require("../Component/Vector.js");
var _circleHitboxJs = require("../Component/CircleHitbox.js");
var _circleHitboxJsDefault = parcelHelpers.interopDefault(_circleHitboxJs);
var _rectHitboxJs = require("../Component/RectHitbox.js");
var _rectHitboxJsDefault = parcelHelpers.interopDefault(_rectHitboxJs);
class CollisionSystem extends (0, _systemJs.System) {
    constructor(){
        super();
    }
    appliesTo(entity) {
        return entity.hasComponent((0, _hitboxJs.Hitbox));
    }
    update(entities, dt, level) {
        for (const entity1 of entities)for (const entity2 of entities){
            if (entity1 === entity2) continue;
            if (entity1.hasComponent((0, _circleHitboxJsDefault.default)) && entity2.hasComponent((0, _rectHitboxJsDefault.default)) || entity1.hasComponent((0, _rectHitboxJsDefault.default)) && entity2.hasComponent((0, _circleHitboxJsDefault.default))) {
                const entityWithCircleHitbox = entity1.hasComponent((0, _circleHitboxJsDefault.default)) ? entity1 : entity2.hasComponent((0, _circleHitboxJsDefault.default)) ? entity2 : null;
                const entityWithRectHitbox = entity1.hasComponent((0, _rectHitboxJsDefault.default)) ? entity1 : entity2.hasComponent((0, _rectHitboxJsDefault.default)) ? entity2 : null;
                if (!entityWithCircleHitbox || !entityWithRectHitbox) throw new Error("Not exactly one point- and one rectangle shaped entity hitbox (should not happen)");
                const collision = this.circleRectangleCollision(entityWithCircleHitbox, entityWithRectHitbox);
                if (collision) {
                    console.log(collision);
                    this.resolveCircleRectCollision(entityWithCircleHitbox, entityWithRectHitbox);
                }
            }
        }
    }
    // pointRectangleCollision(circleEntity: Entity, rectEntity: Entity) {
    //   const cx = circleEntity.position.x; // point position
    //   const cy = circleEntity.position.y;
    //   const rx = rectEntity.position.x; // rectangle position
    //   const ry = rectEntity.position.y;
    //   const rw = rectEntity.size.width; // and dimensions
    //   const rh = rectEntity.size.height;
    //   // is the point inside the rectangle's bounds?
    //   if (
    //     cx >= rx && // left edge
    //     cx <= rx + rw && // right edge
    //     cy >= ry && // top edge
    //     cy <= ry + rh // bottom edge
    //   ) {
    //     return true;
    //   }
    //   return false;
    // }
    // resolvePointRectangleCollision(pointEntity: Entity, rectEntity: Entity) {
    //   const px = pointEntity.position.x; // point position
    //   const py = pointEntity.position.y;
    //   const rx = rectEntity.position.x; // rectangle position
    //   const ry = rectEntity.position.y;
    //   const rw = rectEntity.size.width; // and dimensions
    //   const rh = rectEntity.size.height;
    //   // Expects that point entity has vector but not rectangle entity
    //   const leftOffset = px - rx;
    //   const rightOffset = rx + rw - px;
    //   const topOffset = py - ry;
    //   const bottomOffset = ry + rh - py;
    //   const pointEntityVector = pointEntity.getComponent(Vector) as Vector;
    //   if (pointEntityVector) {
    //     if (leftOffset < topOffset && leftOffset < bottomOffset && pointEntityVector.x > 0) {
    //       pointEntityVector.x = -pointEntityVector.x
    //     } else if (rightOffset < topOffset && rightOffset < bottomOffset && pointEntityVector.x < 0) {
    //       pointEntityVector.y = -pointEntityVector.x
    //     } else if (topOffset < leftOffset && topOffset < rightOffset && pointEntityVector.y > 0) {
    //       pointEntityVector.y = -pointEntityVector.y
    //     } else if (bottomOffset < leftOffset && bottomOffset < rightOffset && pointEntityVector.y < 0) {
    //       pointEntityVector.y = -pointEntityVector.y
    //     }
    //   }
    // }
    circleRectangleCollision(entityWithCircleHitbox, entityWithRectHitbox) {
        const cx = entityWithCircleHitbox.position.x;
        const cy = entityWithCircleHitbox.position.y;
        const rx = entityWithRectHitbox.position.x;
        const ry = entityWithRectHitbox.position.y;
        const rw = entityWithRectHitbox.size.width;
        const rh = entityWithRectHitbox.size.height;
        let closestEdgeX = cx;
        let closestEdgeY = cy;
        if (cx < rx) closestEdgeX = rx; // left edge
        else if (cx > rx + rw) closestEdgeX = rx + rw; // right edge
        if (cy < ry) closestEdgeY = ry; // top edge
        else if (cy > ry + rh) closestEdgeY = ry + rh; // bottom edge
        const distX = cx - closestEdgeX;
        const distY = cy - closestEdgeY;
        const distance = Math.sqrt(distX * distX + distY * distY);
        if (distance <= entityWithCircleHitbox.size.width / 2) return true;
        return false;
    }
    resolveCircleRectCollision(entityWithCircleHitbox, entityWithRectHitbox) {
        const cx = entityWithCircleHitbox.position.x;
        const cy = entityWithCircleHitbox.position.y;
        const rx = entityWithRectHitbox.position.x;
        const ry = entityWithRectHitbox.position.y;
        const rw = entityWithRectHitbox.size.width;
        const rh = entityWithRectHitbox.size.height;
        // Expects that point entity has vector but not rectangle entity
        const leftOffset = cx - rx;
        const rightOffset = rx + rw - cx;
        const topOffset = cy - ry;
        const bottomOffset = ry + rh - cy;
        const circleEntityVector = entityWithCircleHitbox.getComponent((0, _vectorJs.Vector));
        if (circleEntityVector) {
            if (leftOffset < topOffset && leftOffset < bottomOffset && circleEntityVector.x > 0) {
                entityWithCircleHitbox.position.x = entityWithRectHitbox.position.x - entityWithCircleHitbox.size.width / 2;
                circleEntityVector.x = -circleEntityVector.x;
            } else if (rightOffset < topOffset && rightOffset < bottomOffset && circleEntityVector.x < 0) {
                entityWithCircleHitbox.position.x = entityWithRectHitbox.position.x + entityWithRectHitbox.size.width + entityWithCircleHitbox.size.width / 2;
                circleEntityVector.x = -circleEntityVector.x;
            } else if (topOffset < leftOffset && topOffset < rightOffset && circleEntityVector.y > 0) {
                entityWithCircleHitbox.position.y = entityWithRectHitbox.position.y - entityWithCircleHitbox.size.height / 2;
                circleEntityVector.y = -circleEntityVector.y;
            } else if (bottomOffset < leftOffset && bottomOffset < rightOffset && circleEntityVector.y < 0) {
                entityWithCircleHitbox.position.y = entityWithRectHitbox.position.y + entityWithRectHitbox.size.height + entityWithCircleHitbox.size.height / 2;
                circleEntityVector.y = -circleEntityVector.y;
            }
        } else {
            if (leftOffset < topOffset && leftOffset < bottomOffset) entityWithCircleHitbox.position.x = entityWithRectHitbox.position.x - entityWithCircleHitbox.size.width / 2;
            else if (rightOffset < topOffset && rightOffset < bottomOffset) entityWithCircleHitbox.position.x = entityWithRectHitbox.position.x + entityWithRectHitbox.size.width + entityWithCircleHitbox.size.width / 2;
            else if (topOffset < leftOffset && topOffset < rightOffset) entityWithCircleHitbox.position.y = entityWithRectHitbox.position.y - entityWithCircleHitbox.size.height / 2;
            else if (bottomOffset < leftOffset && bottomOffset < rightOffset) entityWithCircleHitbox.position.y = entityWithRectHitbox.position.y + entityWithRectHitbox.size.height + entityWithCircleHitbox.size.height / 2;
        }
    }
}

},{"./System.js":"1zonU","../Component/Hitbox.js":"iFmht","../Component/Vector.js":"3VCbJ","../Component/CircleHitbox.js":"fha8S","../Component/RectHitbox.js":"ae29J","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1zonU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "System", ()=>System);
class System {
    appliesTo(entity) {
        return false;
    }
    update(entities, dt, level, game) {
        throw new Error("not implemented");
    }
    draw(ctx) {}
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"iFmht":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Hitbox", ()=>Hitbox);
var _component = require("./Component");
var _componentDefault = parcelHelpers.interopDefault(_component);
class Hitbox extends (0, _componentDefault.default) {
    constructor(){
        super();
    }
}

},{"./Component":"joaCG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"joaCG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Component {
    constructor(){}
}
exports.default = Component;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3VCbJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Vector", ()=>Vector);
var _component = require("./Component");
var _componentDefault = parcelHelpers.interopDefault(_component);
class Vector extends (0, _componentDefault.default) {
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    norm() {
        return {
            x: this.x / this.magnitude(),
            y: this.y / this.magnitude()
        };
    }
    normalize() {
        const norm = this.norm();
        return new Vector(norm.x, norm.y);
    }
}

},{"./Component":"joaCG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fha8S":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _hitbox = require("./Hitbox");
class CircleHitbox extends (0, _hitbox.Hitbox) {
    constructor(){
        super();
    }
}
exports.default = CircleHitbox;

},{"./Hitbox":"iFmht","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ae29J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _hitbox = require("./Hitbox");
class RectHitbox extends (0, _hitbox.Hitbox) {
    constructor(){
        super();
    }
}
exports.default = RectHitbox;

},{"./Hitbox":"iFmht","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cuuW5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _system = require("./System");
var _vector = require("../Component/Vector");
class MoveSystem extends (0, _system.System) {
    constructor(){
        super();
    }
    appliesTo(entity) {
        return entity.hasComponent((0, _vector.Vector));
    }
    update(entities, dt, level) {
        for (const entity of entities){
            const vector = entity.getComponent((0, _vector.Vector));
            entity.position.x += vector.x * dt;
            entity.position.y += vector.y * dt;
        }
    }
}
exports.default = MoveSystem;

},{"./System":"1zonU","../Component/Vector":"3VCbJ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Jrcy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _system = require("./System");
var _player1 = require("../Entity/Player1");
class PlayerSystem extends (0, _system.System) {
    constructor(){
        super();
        this.keys = new Set();
        document.addEventListener("keydown", (e)=>{
            switch(e.keyCode){
                case 87:
                    this.keys.add("w");
                    break;
                case 65:
                    this.keys.add("a");
                    break;
                case 83:
                    this.keys.add("s");
                    break;
                case 68:
                    this.keys.add("d");
                    break;
            }
        });
        document.addEventListener("keyup", (e)=>{
            switch(e.keyCode){
                case 87:
                    this.keys.delete("w");
                    break;
                case 65:
                    this.keys.delete("a");
                    break;
                case 83:
                    this.keys.delete("s");
                    break;
                case 68:
                    this.keys.delete("d");
                    break;
            }
        });
    }
    appliesTo(entity) {
        return entity instanceof (0, _player1.Player1);
    }
    update(entities, dt, level, game) {
        // const playerCell = entities.find((cell) => cell.getEntity(Player1));
        // if (!playerCell) return;
        // let moveToCell: Cell | undefined | null = null;
        for (const entity of entities){
            if (this.keys.has("w")) entity.position.y -= 10;
            if (this.keys.has("a")) entity.position.x -= 10;
            if (this.keys.has("s")) entity.position.y += 10;
            if (this.keys.has("d")) entity.position.x += 10;
        }
    // if (this.keys.has("w")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x && cell.y === playerCell.y - 1
    //   );
    //   this.keys.delete("w");
    // }
    // if (this.keys.has("a")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x - 1 && cell.y === playerCell.y
    //   );
    //   this.keys.delete("a");
    // }
    // if (this.keys.has("s")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x + 1 && cell.y === playerCell.y
    //   );
    //   this.keys.delete("s");
    // }
    // if (this.keys.has("d")) {
    //   moveToCell = entities.find(
    //     (cell) => cell.x === playerCell.x && cell.y === playerCell.y + 1
    //   );
    //   this.keys.delete("d");
    // }
    // if (moveToCell) {
    //   // @ts-ignore
    //   const player = playerCell.getEntity(Player1);
    //   if (!player) return;
    //   const newPlayerInstance = new Player1();
    //   moveToCell.addEntitys(newPlayerInstance);
    //   // @ts-ignore
    //   playerCell.removeEntity(Player1);
    // }
    }
}
exports.default = PlayerSystem;

},{"./System":"1zonU","../Entity/Player1":"5Raoz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5Raoz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Player1", ()=>Player1);
var _entity = require("./Entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
class Player1 extends (0, _entityDefault.default) {
    constructor(position, size){
        super(position, size);
    }
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "#543";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size.width / 2, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}

},{"./Entity":"8SMxX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8SMxX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class Entity {
    constructor(position, size){
        this.position = position;
        this.size = size;
        this.components = [];
    }
    distanceTo(entity) {
        return Math.sqrt(Math.pow(this.position.x - entity.position.x, 2) + Math.pow(this.position.y - entity.position.y, 2));
    }
    getComponent(type) {
        for (const component of this.components){
            // @ts-ignore
            if (component instanceof type) // @ts-ignore
            return component;
        }
    }
    addComponents(...components) {
        for (const component of components)this.components.push(component);
    }
    hasComponent(type) {
        for (const component of this.components){
            // @ts-ignore
            if (component instanceof type) return true;
        }
        return false;
    }
    removeComponent(type) {
        this.components = this.components.filter(// @ts-ignore
        (component)=>component instanceof type);
    }
    draw(ctx) {
        throw new Error("Not implemented yet");
    }
}
exports.default = Entity;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"duP3I":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ShootSystem", ()=>ShootSystem);
var _system = require("./System");
var _bullet = require("../Entity/Bullet");
var _bulletDefault = parcelHelpers.interopDefault(_bullet);
var _entity = require("../Entity/Entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
var _player1 = require("../Entity/Player1");
var _vector = require("../Component/Vector");
var _circleHitbox = require("../Component/CircleHitbox");
var _circleHitboxDefault = parcelHelpers.interopDefault(_circleHitbox);
var _rectHitbox = require("../Component/RectHitbox");
var _rectHitboxDefault = parcelHelpers.interopDefault(_rectHitbox);
class ShootSystem extends (0, _system.System) {
    constructor(){
        super();
        this.gameWidth = 0;
        this.gameHeight = 0;
        this.startPos = null;
        this.aimPos = null;
        this.nearestIntersection = null;
    }
    appliesTo(entity) {
        return entity instanceof (0, _entityDefault.default);
    }
    update(entities, dt, level, game) {
        if (game.gameWidth) this.gameWidth = game.gameWidth;
        if (game.gameHeight) this.gameHeight = game.gameHeight;
        const players = entities.filter((entity)=>entity instanceof (0, _player1.Player1));
        // if (!players) return;
        for (const player of players){
            const playerCenter = {
                x: player.position.x,
                y: player.position.y
            };
            if (!game.mousePos) return null;
            this.startPos = {
                x: playerCenter.x + player.size.width / 2 * Math.cos(this.getDegrees(player.position, game.mousePos)),
                y: playerCenter.y + player.size.height / 2 * Math.sin(this.getDegrees(player.position, game.mousePos))
            };
            if (!game.mousePos) return;
            const vector = {
                x: game.mousePos.x - player.position.x,
                y: game.mousePos.y - player.position.y
            };
            const mousePosBasedMagnitude = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
            const norm = {
                x: vector.x / mousePosBasedMagnitude,
                y: vector.y / mousePosBasedMagnitude
            };
            const magnitude = {
                x: norm.x * Math.sqrt(Math.pow(game.gameWidth, 2) + Math.pow(game.gameHeight, 2)),
                y: norm.y * Math.sqrt(Math.pow(game.gameWidth, 2) + Math.pow(game.gameHeight, 2))
            };
            this.aimPos = {
                x: this.startPos.x + magnitude.x,
                y: this.startPos.y + magnitude.y
            };
            const x1 = this.aimPos.x; // points for line (controlled by mouse)
            const y1 = this.aimPos.y;
            const x2 = this.startPos.x; // static point
            const y2 = this.startPos.y;
            let nearestIntersection = {
                intersectionX: x1,
                intersectionY: y1
            };
            const obstacles = entities.filter((entity)=>entity.hasComponent((0, _rectHitboxDefault.default)));
            for (const obstacle of obstacles){
                const sx = obstacle.position.x; // square position
                const sy = obstacle.position.y;
                const sw = obstacle.size.width; // and size
                const sh = obstacle.size.height;
                // check if line has hit the square
                // if so, change the fill color
                const intersections = this.lineRect(x1, y1, x2, y2, sx, sy, sw, sh);
                for (const intersection of intersections){
                    const intersectionDistanceX = intersection.intersectionX - x2;
                    const intersectionDistanceY = intersection.intersectionY - y2;
                    const intersectionDistance = Math.sqrt(Math.pow(intersectionDistanceX, 2) + Math.pow(intersectionDistanceY, 2));
                    const nearestIntersectionDistanceX = nearestIntersection.intersectionX - x2;
                    const nearestIntersectionDistanceY = nearestIntersection.intersectionY - y2;
                    const nearestIntersectionDistance = Math.sqrt(Math.pow(nearestIntersectionDistanceX, 2) + Math.pow(nearestIntersectionDistanceY, 2));
                    if (intersectionDistance < nearestIntersectionDistance) nearestIntersection = {
                        intersectionX: intersection.intersectionX,
                        intersectionY: intersection.intersectionY,
                        intersectedRect: {
                            sx,
                            sy,
                            sw,
                            sh
                        }
                    };
                // ctx.fillStyle = "blue";
                // ctx.beginPath();
                // ctx.arc(
                //   intersection.intersectionX,
                //   intersection.intersectionY,
                //   5,
                //   0,
                //   2 * Math.PI
                // );
                // ctx.fill();
                }
            }
            this.nearestIntersection = nearestIntersection;
            if (game.keys.has("leftClick")) {
                const bullet = new (0, _bulletDefault.default)({
                    x: this.startPos.x,
                    y: this.startPos.y
                }, 5);
                bullet.addComponents(new (0, _vector.Vector)(norm.x * 1000, norm.y * 1000), new (0, _circleHitboxDefault.default)());
                level.entities.push(bullet);
                game.keys.delete("leftClick");
            }
        }
    }
    draw(ctx) {
        if (this.startPos && this.aimPos) {
            // ctx.save();
            // ctx.restore();
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            // ctx.save();
            // ctx.translate(this.startPos.x, this.startPos.y);
            // ctx.rotate(this.getDegrees(this.startPos, this.aimPos) + Math.PI / 2);
            // // Create a circular clipping path
            // ctx.beginPath();
            // ctx.arc(0, 0, 250, 0, Math.PI * 2);
            // ctx.clip();
            // // draw background
            // const lingrad = ctx.createLinearGradient(0, -300, 0, 0);
            // lingrad.addColorStop(0, "rgba(0,0,0,1)");
            // lingrad.addColorStop(0.1, "rgba(0,0,0,0.9)");
            // lingrad.addColorStop(0.2, "rgba(0,0,0,0.8)");
            // lingrad.addColorStop(0.3, "rgba(0,0,0,0.7)");
            // lingrad.addColorStop(0.4, "rgba(0,0,0,0.6)");
            // lingrad.addColorStop(0.5, "rgba(0,0,0,0.5)");
            // lingrad.addColorStop(0.6, "rgba(0,0,0,0.4)");
            // lingrad.addColorStop(0.7, "rgba(0,0,0,0.3)");
            // lingrad.addColorStop(0.8, "rgba(0,0,0,0.2)");
            // lingrad.addColorStop(0.9, "rgba(0,0,0,0.1)");
            // lingrad.addColorStop(1, "rgba(0,0,0,0)");
            // ctx.globalCompositeOperation = "source-in";
            // ctx.fillStyle = lingrad;
            // ctx.fill();
            // ctx.restore();
            ctx.save();
            ctx.translate(this.startPos.x, this.startPos.y);
            ctx.rotate(this.getDegrees(this.startPos, this.aimPos) + Math.PI / 2);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-1600, -800);
            ctx.lineTo(1600, -800);
            ctx.clip();
            // draw background
            const lingrad = ctx.createLinearGradient(0, -800, 0, 0);
            lingrad.addColorStop(0, "rgba(0,0,0,1)");
            lingrad.addColorStop(0.1, "rgba(0,0,0,0.9)");
            lingrad.addColorStop(0.2, "rgba(0,0,0,0.8)");
            lingrad.addColorStop(0.3, "rgba(0,0,0,0.7)");
            lingrad.addColorStop(0.4, "rgba(0,0,0,0.6)");
            lingrad.addColorStop(0.5, "rgba(0,0,0,0.5)");
            lingrad.addColorStop(0.6, "rgba(0,0,0,0.4)");
            lingrad.addColorStop(0.7, "rgba(0,0,0,0.3)");
            lingrad.addColorStop(0.8, "rgba(0,0,0,0.2)");
            lingrad.addColorStop(0.9, "rgba(0,0,0,0.1)");
            lingrad.addColorStop(1, "rgba(0,0,0,0)");
            ctx.globalCompositeOperation = "source-in";
            ctx.fillStyle = lingrad;
            ctx.fill();
            ctx.restore();
            ctx.save();
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.startPos.x, this.startPos.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            if (this.nearestIntersection) {
                if (this.nearestIntersection.intersectedRect) {
                    const { intersectedRect } = this.nearestIntersection;
                    ctx.fillStyle = "orange";
                    ctx.fillRect(intersectedRect.sx, intersectedRect.sy, intersectedRect.sw, intersectedRect.sh);
                }
                // draw the line
                ctx.beginPath();
                ctx.setLineDash([
                    5,
                    15
                ]);
                ctx.moveTo(this.startPos.x, this.startPos.y);
                ctx.lineTo(this.nearestIntersection.intersectionX, this.nearestIntersection.intersectionY);
                ctx.stroke();
                // draw intersection dot
                ctx.fillStyle = "red";
                ctx.beginPath();
                ctx.arc(this.nearestIntersection.intersectionX, this.nearestIntersection.intersectionY, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
            ctx.restore();
        }
    }
    lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
        // check if the line has hit any of the rectangle's sides
        // uses the Line/Line function below
        const left = this.lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
        const right = this.lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
        const top = this.lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
        const bottom = this.lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);
        const intersections = [];
        if (left) intersections.push(left);
        if (right) intersections.push(right);
        if (top) intersections.push(top);
        if (bottom) intersections.push(bottom);
        return intersections;
    }
    lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        // calculate the direction of the lines
        const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            // where the lines meet
            const intersectionX = x1 + uA * (x2 - x1);
            const intersectionY = y1 + uA * (y2 - y1);
            return {
                intersectionX,
                intersectionY
            };
        }
        return null;
    }
    getDegrees(startPos, mousePos) {
        if (!mousePos) throw new Error("No mousePos");
        if (mousePos.y > startPos.y) {
            if (mousePos.x > startPos.x) {
                const angle = Math.atan(Math.abs(mousePos.y - startPos.y) / Math.abs(mousePos.x - startPos.x));
                return angle;
            } else {
                const angle = Math.atan(Math.abs(mousePos.x - startPos.x) / Math.abs(mousePos.y - startPos.y)) + Math.PI / 2;
                return angle;
            }
        } else if (mousePos.x > startPos.x) {
            const angle = -Math.atan(Math.abs(mousePos.y - startPos.y) / Math.abs(mousePos.x - startPos.x));
            return angle;
        } else {
            const angle = -Math.atan(Math.abs(mousePos.x - startPos.x) / Math.abs(mousePos.y - startPos.y)) - Math.PI / 2;
            return angle;
        }
    }
}

},{"./System":"1zonU","../Entity/Bullet":"h611p","../Entity/Entity":"8SMxX","../Entity/Player1":"5Raoz","../Component/Vector":"3VCbJ","../Component/CircleHitbox":"fha8S","../Component/RectHitbox":"ae29J","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h611p":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _entity = require("./Entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
class Bullet extends (0, _entityDefault.default) {
    constructor(position, radius){
        super(position, {
            width: radius * 2,
            height: radius * 2
        });
        this.radius = radius;
        this.lifeLength = 5; // seconds
    }
    draw(ctx) {
        // draw intersection dot
        ctx.save();
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
}
exports.default = Bullet;

},{"./Entity":"8SMxX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fiTiQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _system = require("./System");
var _player1 = require("../Entity/Player1");
var _wall = require("../Entity/Wall");
var _wallDefault = parcelHelpers.interopDefault(_wall);
var _lightSource = require("../Component/LightSource");
var _lightSourceDefault = parcelHelpers.interopDefault(_lightSource);
var _rectangle = require("../rectangle");
var _loadMap = require("../load-map");
var _visibility = require("../visibility");
var _point = require("../point");
class LightsourceSystem extends (0, _system.System) {
    constructor(){
        super();
        this.room = null;
        this.lightSource = null;
        this.blocks = [];
        this.walls = [];
        this.visibility = [];
    }
    appliesTo(entity) {
        return entity instanceof (0, _wallDefault.default) || entity.hasComponent((0, _lightSourceDefault.default));
    }
    update(entities, dt, level, game) {
        const player = entities.find((entity)=>entity instanceof (0, _player1.Player1));
        const walls = entities.filter((entity)=>entity instanceof (0, _wallDefault.default));
        if (!player) {
            this.lightSource = null;
            return;
        }
        // Setup scene
        this.room = new (0, _rectangle.Rectangle)(0, 0, game.gameWidth, game.gameHeight);
        this.walls = [];
        this.blocks = walls.map((entity)=>new (0, _rectangle.Rectangle)(entity.position.x, entity.position.y, entity.size.width, entity.size.height));
        // Test lightsource middle of map
        this.lightSource = new (0, _point.Point)(player.position.x, player.position.y);
        const endpoints = (0, _loadMap.loadMap)(this.room, this.blocks, this.walls, this.lightSource);
        this.visibility = (0, _visibility.calculateVisibility)(this.lightSource, endpoints);
    }
    draw(ctx) {
        if (!this.lightSource || !this.room) return;
        this.drawVisibilityTriangles(ctx, "gray", this.lightSource, this.visibility);
        for (const block of this.blocks)this.drawRectangle(ctx, "blue", block);
        for (const wall of this.walls)this.drawSegment(ctx, "red", wall);
    }
    drawRectangle(ctx, color, rectangle) {
        ctx.save();
        ctx.strokeStyle = "blue";
        ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        ctx.restore();
    }
    drawSegment(ctx, color, segment) {
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.moveTo(segment.p1.x, segment.p1.y);
        ctx.lineTo(segment.p2.x, segment.p2.y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    drawVisibilityTriangles(ctx, color, lightSource, visibilityOutput) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, this.room.width, this.room.height);
        ctx.globalCompositeOperation = "source-out";
        ctx.beginPath();
        for (const points of visibilityOutput){
            ctx.moveTo(lightSource.x, lightSource.y);
            ctx.lineTo(points[0].x, points[0].y);
            ctx.lineTo(points[1].x, points[1].y);
        }
        ctx.clip();
        ctx.fillStyle = "transparent";
        ctx.fill();
        ctx.restore();
    }
}
exports.default = LightsourceSystem;

},{"./System":"1zonU","../Entity/Player1":"5Raoz","../Entity/Wall":"dZG75","../Component/LightSource":"aPJ2N","../rectangle":"kYSfO","../load-map":"cp506","../visibility":"hvo8f","../point":"5qEKp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dZG75":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cell = require("./Cell");
var _cellDefault = parcelHelpers.interopDefault(_cell);
class Wall extends (0, _cellDefault.default) {
    constructor(position, size){
        super(position, size);
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#000";
        ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}
exports.default = Wall;

},{"./Cell":"1Q7Rd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Q7Rd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _entity = require("./Entity");
var _entityDefault = parcelHelpers.interopDefault(_entity);
class Cell extends (0, _entityDefault.default) {
    constructor(position, size){
        super(position, size);
        this.components = [];
    }
    draw(ctx) {
    // ctx.beginPath();
    // ctx.fillStyle = "#FFF";
    // ctx.fillRect(
    //   this.position.x,
    //   this.position.y,
    //   this.size.width,
    //   this.size.height
    // );
    // ctx.fill();
    // ctx.closePath();
    }
}
exports.default = Cell;

},{"./Entity":"8SMxX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aPJ2N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _component = require("./Component");
var _componentDefault = parcelHelpers.interopDefault(_component);
class LightSource extends (0, _componentDefault.default) {
    constructor(){
        super();
    }
}
exports.default = LightSource;

},{"./Component":"joaCG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kYSfO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Rectangle", ()=>Rectangle);
var _point = require("./point");
var _segment = require("./segment");
class Rectangle {
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    getCorners() {
        return {
            nw: new (0, _point.Point)(this.x, this.y),
            sw: new (0, _point.Point)(this.x, this.y + this.height),
            ne: new (0, _point.Point)(this.x + this.width, this.y),
            se: new (0, _point.Point)(this.x + this.width, this.y + this.height)
        };
    }
    getCornerSegments() {
        const { nw, sw, ne, se } = this.getCorners();
        return [
            new (0, _segment.Segment)(nw.x, nw.y, ne.x, ne.y),
            new (0, _segment.Segment)(nw.x, nw.y, sw.x, sw.y),
            new (0, _segment.Segment)(ne.x, ne.y, se.x, se.y),
            new (0, _segment.Segment)(sw.x, sw.y, se.x, se.y)
        ];
    }
}

},{"./point":"5qEKp","./segment":"74559","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5qEKp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Point", ()=>Point);
class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"74559":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Segment", ()=>Segment);
var _endPoint = require("./end-point");
class Segment {
    constructor(x1, y1, x2, y2){
        this.d = 0;
        this.p1 = new (0, _endPoint.EndPoint)(x1, y1);
        this.p2 = new (0, _endPoint.EndPoint)(x2, y2);
        this.p1.segment = this;
        this.p2.segment = this;
    }
}

},{"./end-point":"5EZQb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5EZQb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EndPoint", ()=>EndPoint);
var _point = require("./point");
class EndPoint extends (0, _point.Point) {
    constructor(x, y){
        super(x, y);
        this.x = x;
        this.y = y;
    }
}

},{"./point":"5qEKp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cp506":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadMap", ()=>loadMap);
const calculateEndPointAngles = (lightSource, segment)=>{
    const { x, y } = lightSource;
    const dx = 0.5 * (segment.p1.x + segment.p2.x) - x;
    const dy = 0.5 * (segment.p1.y + segment.p2.y) - y;
    segment.d = dx * dx + dy * dy;
    segment.p1.angle = Math.atan2(segment.p1.y - y, segment.p1.x - x);
    segment.p2.angle = Math.atan2(segment.p2.y - y, segment.p2.x - x);
};
const setSegmentBeginning = (segment)=>{
    let dAngle = segment.p2.angle - segment.p1.angle;
    if (dAngle <= -Math.PI) dAngle += 2 * Math.PI;
    if (dAngle > Math.PI) dAngle -= 2 * Math.PI;
    segment.p1.beginsSegment = dAngle > 0;
    segment.p2.beginsSegment = !segment.p1.beginsSegment;
};
const processSegments = (lightSource, segments)=>{
    for (const segment of segments){
        calculateEndPointAngles(lightSource, segment);
        setSegmentBeginning(segment);
    }
    return segments;
};
function loadMap(room, blocks, walls, lightSource) {
    const segments = [];
    for (const segment of room.getCornerSegments())segments.push(segment);
    for (const block of blocks)for (const segment of block.getCornerSegments())segments.push(segment);
    for (const segment of walls)segments.push(segment);
    const endPoints = [];
    for (const segment of processSegments(lightSource, segments))endPoints.push(segment.p1, segment.p2);
    return endPoints;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hvo8f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "calculateVisibility", ()=>calculateVisibility);
var _lineIntersection = require("./line-intersection");
var _endpointCompare = require("./endpoint-compare");
var _segmentInFrontOf = require("./segment-in-front-of");
var _point = require("./point");
function getTrianglePoints(origin, angle1, angle2, segment) {
    const p1 = origin;
    const p2 = new (0, _point.Point)(origin.x + Math.cos(angle1), origin.y + Math.sin(angle1));
    const p3 = new (0, _point.Point)(0, 0);
    const p4 = new (0, _point.Point)(0, 0);
    if (segment) {
        p3.x = segment.p1.x;
        p3.y = segment.p1.y;
        p4.x = segment.p2.x;
        p4.y = segment.p2.y;
    } else {
        p3.x = origin.x + Math.cos(angle1) * 200;
        p3.y = origin.y + Math.sin(angle1) * 200;
        p4.x = origin.x + Math.cos(angle2) * 200;
        p4.y = origin.y + Math.sin(angle2) * 200;
    }
    const pBegin = (0, _lineIntersection.lineIntersection)(p3, p4, p1, p2);
    p2.x = origin.x + Math.cos(angle2);
    p2.y = origin.y + Math.sin(angle2);
    const pEnd = (0, _lineIntersection.lineIntersection)(p3, p4, p1, p2);
    return [
        pBegin,
        pEnd
    ];
}
function calculateVisibility(origin, endpoints) {
    const openSegments = [];
    const output = [];
    let beginAngle = 0;
    endpoints.sort((0, _endpointCompare.endpointCompare));
    for(let pass = 0; pass < 2; pass += 1)for (const endpoint of endpoints){
        const openSegment = openSegments[0];
        if (endpoint.beginsSegment) {
            let index = 0;
            let segment = openSegments[index];
            while(segment && (0, _segmentInFrontOf.segmentInFrontOf)(endpoint.segment, segment, origin)){
                index += 1;
                segment = openSegments[index];
            }
            if (!segment) openSegments.push(endpoint.segment);
            else openSegments.splice(index, 0, endpoint.segment);
        } else {
            const index = openSegments.indexOf(endpoint.segment);
            if (index > -1) openSegments.splice(index, 1);
        }
        if (openSegment !== openSegments[0]) {
            if (pass === 1) {
                const trianglePoints = getTrianglePoints(origin, beginAngle, endpoint.angle, openSegment);
                output.push(trianglePoints);
            }
            beginAngle = endpoint.angle;
        }
    }
    return output;
}

},{"./line-intersection":"gfuOU","./endpoint-compare":"8ZLFH","./segment-in-front-of":"6W6PC","./point":"5qEKp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gfuOU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lineIntersection", ()=>lineIntersection);
var _point = require("./point");
function lineIntersection(point1, point2, point3, point4) {
    const s = ((point4.x - point3.x) * (point1.y - point3.y) - (point4.y - point3.y) * (point1.x - point3.x)) / ((point4.y - point3.y) * (point2.x - point1.x) - (point4.x - point3.x) * (point2.y - point1.y));
    return new (0, _point.Point)(point1.x + s * (point2.x - point1.x), point1.y + s * (point2.y - point1.y));
}

},{"./point":"5qEKp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8ZLFH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "endpointCompare", ()=>endpointCompare);
function endpointCompare(pointA, pointB) {
    if (pointA.angle > pointB.angle) return 1;
    if (pointA.angle < pointB.angle) return -1;
    if (!pointA.beginsSegment && pointB.beginsSegment) return 1;
    if (pointA.beginsSegment && !pointB.beginsSegment) return -1;
    return 0;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6W6PC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "segmentInFrontOf", ()=>segmentInFrontOf);
var _point = require("./point");
const leftOf = (segment, point)=>{
    const cross = (segment.p2.x - segment.p1.x) * (point.y - segment.p1.y) - (segment.p2.y - segment.p1.y) * (point.x - segment.p1.x);
    return cross < 0;
};
const interpolate = (pointA, pointB, f)=>{
    return new (0, _point.Point)(pointA.x * (1 - f) + pointB.x * f, pointA.y * (1 - f) + pointB.y * f);
};
const segmentInFrontOf = (segmentA, segmentB, relativePoint)=>{
    const A1 = leftOf(segmentA, interpolate(segmentB.p1, segmentB.p2, 0.01));
    const A2 = leftOf(segmentA, interpolate(segmentB.p2, segmentB.p1, 0.01));
    const A3 = leftOf(segmentA, relativePoint);
    const B1 = leftOf(segmentB, interpolate(segmentA.p1, segmentA.p2, 0.01));
    const B2 = leftOf(segmentB, interpolate(segmentA.p2, segmentA.p1, 0.01));
    const B3 = leftOf(segmentB, relativePoint);
    if (B1 === B2 && B2 !== B3) return true;
    if (A1 === A2 && A2 === A3) return true;
    if (A1 === A2 && A2 !== A3) return false;
    if (B1 === B2 && B2 === B3) return false;
    return false;
};

},{"./point":"5qEKp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["fUTXd","jeorp"], "jeorp", "parcelRequire2c60")

//# sourceMappingURL=index.b7a05eb9.js.map
