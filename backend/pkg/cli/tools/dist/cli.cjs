#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../node_modules/.pnpm/web-tree-sitter@0.22.6/node_modules/web-tree-sitter/tree-sitter.js
var require_tree_sitter = __commonJS({
  "../../../node_modules/.pnpm/web-tree-sitter@0.22.6/node_modules/web-tree-sitter/tree-sitter.js"(exports, module) {
    var Module = void 0 !== Module ? Module : {};
    var TreeSitter = function() {
      var initPromise, document = "object" == typeof window ? { currentScript: window.document.currentScript } : null;
      class Parser {
        constructor() {
          this.initialize();
        }
        initialize() {
          throw new Error("cannot construct a Parser before calling `init()`");
        }
        static init(moduleOptions) {
          return initPromise || (Module = Object.assign({}, Module, moduleOptions), initPromise = new Promise((resolveInitPromise) => {
            var moduleOverrides = Object.assign({}, Module), arguments_ = [], thisProgram = "./this.program", quit_ = (e, t) => {
              throw t;
            }, ENVIRONMENT_IS_WEB = "object" == typeof window, ENVIRONMENT_IS_WORKER = "function" == typeof importScripts, ENVIRONMENT_IS_NODE = "object" == typeof process && "object" == typeof process.versions && "string" == typeof process.versions.node, scriptDirectory = "", read_, readAsync, readBinary;
            function locateFile(e) {
              return Module.locateFile ? Module.locateFile(e, scriptDirectory) : scriptDirectory + e;
            }
            if (ENVIRONMENT_IS_NODE) {
              var fs = require("fs"), nodePath = require("path");
              scriptDirectory = ENVIRONMENT_IS_WORKER ? nodePath.dirname(scriptDirectory) + "/" : __dirname + "/", read_ = (e, t) => (e = isFileURI(e) ? new URL(e) : nodePath.normalize(e), fs.readFileSync(e, t ? void 0 : "utf8")), readBinary = (e) => {
                var t = read_(e, true);
                return t.buffer || (t = new Uint8Array(t)), t;
              }, readAsync = (e, t, _, s = true) => {
                e = isFileURI(e) ? new URL(e) : nodePath.normalize(e), fs.readFile(e, s ? void 0 : "utf8", (e2, r) => {
                  e2 ? _(e2) : t(s ? r.buffer : r);
                });
              }, !Module.thisProgram && process.argv.length > 1 && (thisProgram = process.argv[1].replace(/\\/g, "/")), arguments_ = process.argv.slice(2), "undefined" != typeof module && (module.exports = Module), quit_ = (e, t) => {
                throw process.exitCode = e, t;
              };
            } else (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && (ENVIRONMENT_IS_WORKER ? scriptDirectory = self.location.href : void 0 !== document && document.currentScript && (scriptDirectory = document.currentScript.src), scriptDirectory = scriptDirectory.startsWith("blob:") ? "" : scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1), read_ = (e) => {
              var t = new XMLHttpRequest();
              return t.open("GET", e, false), t.send(null), t.responseText;
            }, ENVIRONMENT_IS_WORKER && (readBinary = (e) => {
              var t = new XMLHttpRequest();
              return t.open("GET", e, false), t.responseType = "arraybuffer", t.send(null), new Uint8Array(t.response);
            }), readAsync = (e, t, _) => {
              var s = new XMLHttpRequest();
              s.open("GET", e, true), s.responseType = "arraybuffer", s.onload = () => {
                200 == s.status || 0 == s.status && s.response ? t(s.response) : _();
              }, s.onerror = _, s.send(null);
            });
            var out = Module.print || console.log.bind(console), err = Module.printErr || console.error.bind(console);
            Object.assign(Module, moduleOverrides), moduleOverrides = null, Module.arguments && (arguments_ = Module.arguments), Module.thisProgram && (thisProgram = Module.thisProgram), Module.quit && (quit_ = Module.quit);
            var dynamicLibraries = Module.dynamicLibraries || [], wasmBinary, wasmMemory;
            Module.wasmBinary && (wasmBinary = Module.wasmBinary), "object" != typeof WebAssembly && abort("no native wasm support detected");
            var ABORT = false, EXITSTATUS, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
            function updateMemoryViews() {
              var e = wasmMemory.buffer;
              Module.HEAP8 = HEAP8 = new Int8Array(e), Module.HEAP16 = HEAP16 = new Int16Array(e), Module.HEAPU8 = HEAPU8 = new Uint8Array(e), Module.HEAPU16 = HEAPU16 = new Uint16Array(e), Module.HEAP32 = HEAP32 = new Int32Array(e), Module.HEAPU32 = HEAPU32 = new Uint32Array(e), Module.HEAPF32 = HEAPF32 = new Float32Array(e), Module.HEAPF64 = HEAPF64 = new Float64Array(e);
            }
            var INITIAL_MEMORY = Module.INITIAL_MEMORY || 33554432;
            wasmMemory = Module.wasmMemory ? Module.wasmMemory : new WebAssembly.Memory({ initial: INITIAL_MEMORY / 65536, maximum: 32768 }), updateMemoryViews(), INITIAL_MEMORY = wasmMemory.buffer.byteLength;
            var __ATPRERUN__ = [], __ATINIT__ = [], __ATMAIN__ = [], __ATPOSTRUN__ = [], __RELOC_FUNCS__ = [], runtimeInitialized = false;
            function preRun() {
              if (Module.preRun) for ("function" == typeof Module.preRun && (Module.preRun = [Module.preRun]); Module.preRun.length; ) addOnPreRun(Module.preRun.shift());
              callRuntimeCallbacks(__ATPRERUN__);
            }
            function initRuntime() {
              runtimeInitialized = true, callRuntimeCallbacks(__RELOC_FUNCS__), callRuntimeCallbacks(__ATINIT__);
            }
            function preMain() {
              callRuntimeCallbacks(__ATMAIN__);
            }
            function postRun() {
              if (Module.postRun) for ("function" == typeof Module.postRun && (Module.postRun = [Module.postRun]); Module.postRun.length; ) addOnPostRun(Module.postRun.shift());
              callRuntimeCallbacks(__ATPOSTRUN__);
            }
            function addOnPreRun(e) {
              __ATPRERUN__.unshift(e);
            }
            function addOnInit(e) {
              __ATINIT__.unshift(e);
            }
            function addOnPostRun(e) {
              __ATPOSTRUN__.unshift(e);
            }
            var runDependencies = 0, runDependencyWatcher = null, dependenciesFulfilled = null;
            function getUniqueRunDependency(e) {
              return e;
            }
            function addRunDependency(e) {
              runDependencies++, Module.monitorRunDependencies?.(runDependencies);
            }
            function removeRunDependency(e) {
              if (runDependencies--, Module.monitorRunDependencies?.(runDependencies), 0 == runDependencies && (null !== runDependencyWatcher && (clearInterval(runDependencyWatcher), runDependencyWatcher = null), dependenciesFulfilled)) {
                var t = dependenciesFulfilled;
                dependenciesFulfilled = null, t();
              }
            }
            function abort(e) {
              throw Module.onAbort?.(e), err(e = "Aborted(" + e + ")"), ABORT = true, EXITSTATUS = 1, e += ". Build with -sASSERTIONS for more info.", new WebAssembly.RuntimeError(e);
            }
            var dataURIPrefix = "data:application/octet-stream;base64,", isDataURI = (e) => e.startsWith(dataURIPrefix), isFileURI = (e) => e.startsWith("file://"), wasmBinaryFile;
            function getBinarySync(e) {
              if (e == wasmBinaryFile && wasmBinary) return new Uint8Array(wasmBinary);
              if (readBinary) return readBinary(e);
              throw "both async and sync fetching of the wasm failed";
            }
            function getBinaryPromise(e) {
              if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
                if ("function" == typeof fetch && !isFileURI(e)) return fetch(e, { credentials: "same-origin" }).then((t) => {
                  if (!t.ok) throw `failed to load wasm binary file at '${e}'`;
                  return t.arrayBuffer();
                }).catch(() => getBinarySync(e));
                if (readAsync) return new Promise((t, _) => {
                  readAsync(e, (e2) => t(new Uint8Array(e2)), _);
                });
              }
              return Promise.resolve().then(() => getBinarySync(e));
            }
            function instantiateArrayBuffer(e, t, _) {
              return getBinaryPromise(e).then((e2) => WebAssembly.instantiate(e2, t)).then(_, (e2) => {
                err(`failed to asynchronously prepare wasm: ${e2}`), abort(e2);
              });
            }
            function instantiateAsync(e, t, _, s) {
              return e || "function" != typeof WebAssembly.instantiateStreaming || isDataURI(t) || isFileURI(t) || ENVIRONMENT_IS_NODE || "function" != typeof fetch ? instantiateArrayBuffer(t, _, s) : fetch(t, { credentials: "same-origin" }).then((e2) => WebAssembly.instantiateStreaming(e2, _).then(s, function(e3) {
                return err(`wasm streaming compile failed: ${e3}`), err("falling back to ArrayBuffer instantiation"), instantiateArrayBuffer(t, _, s);
              }));
            }
            function createWasm() {
              var e = { env: wasmImports, wasi_snapshot_preview1: wasmImports, "GOT.mem": new Proxy(wasmImports, GOTHandler), "GOT.func": new Proxy(wasmImports, GOTHandler) };
              function t(e2, t2) {
                wasmExports = e2.exports, wasmExports = relocateExports(wasmExports, 1024);
                var _ = getDylinkMetadata(t2);
                return _.neededDynlibs && (dynamicLibraries = _.neededDynlibs.concat(dynamicLibraries)), mergeLibSymbols(wasmExports, "main"), LDSO.init(), loadDylibs(), addOnInit(wasmExports.__wasm_call_ctors), __RELOC_FUNCS__.push(wasmExports.__wasm_apply_data_relocs), removeRunDependency("wasm-instantiate"), wasmExports;
              }
              if (addRunDependency("wasm-instantiate"), Module.instantiateWasm) try {
                return Module.instantiateWasm(e, t);
              } catch (e2) {
                return err(`Module.instantiateWasm callback failed with error: ${e2}`), false;
              }
              return instantiateAsync(wasmBinary, wasmBinaryFile, e, function(e2) {
                t(e2.instance, e2.module);
              }), {};
            }
            wasmBinaryFile = "tree-sitter.wasm", isDataURI(wasmBinaryFile) || (wasmBinaryFile = locateFile(wasmBinaryFile));
            var ASM_CONSTS = {};
            function ExitStatus(e) {
              this.name = "ExitStatus", this.message = `Program terminated with exit(${e})`, this.status = e;
            }
            var GOT = {}, currentModuleWeakSymbols = /* @__PURE__ */ new Set([]), GOTHandler = { get(e, t) {
              var _ = GOT[t];
              return _ || (_ = GOT[t] = new WebAssembly.Global({ value: "i32", mutable: true })), currentModuleWeakSymbols.has(t) || (_.required = true), _;
            } }, callRuntimeCallbacks = (e) => {
              for (; e.length > 0; ) e.shift()(Module);
            }, UTF8Decoder = "undefined" != typeof TextDecoder ? new TextDecoder("utf8") : void 0, UTF8ArrayToString = (e, t, _) => {
              for (var s = t + _, r = t; e[r] && !(r >= s); ) ++r;
              if (r - t > 16 && e.buffer && UTF8Decoder) return UTF8Decoder.decode(e.subarray(t, r));
              for (var a = ""; t < r; ) {
                var o = e[t++];
                if (128 & o) {
                  var n = 63 & e[t++];
                  if (192 != (224 & o)) {
                    var l = 63 & e[t++];
                    if ((o = 224 == (240 & o) ? (15 & o) << 12 | n << 6 | l : (7 & o) << 18 | n << 12 | l << 6 | 63 & e[t++]) < 65536) a += String.fromCharCode(o);
                    else {
                      var d = o - 65536;
                      a += String.fromCharCode(55296 | d >> 10, 56320 | 1023 & d);
                    }
                  } else a += String.fromCharCode((31 & o) << 6 | n);
                } else a += String.fromCharCode(o);
              }
              return a;
            }, getDylinkMetadata = (e) => {
              var t = 0, _ = 0;
              function s() {
                for (var _2 = 0, s2 = 1; ; ) {
                  var r2 = e[t++];
                  if (_2 += (127 & r2) * s2, s2 *= 128, !(128 & r2)) break;
                }
                return _2;
              }
              function r() {
                var _2 = s();
                return UTF8ArrayToString(e, (t += _2) - _2, _2);
              }
              function a(e2, t2) {
                if (e2) throw new Error(t2);
              }
              var o = "dylink.0";
              if (e instanceof WebAssembly.Module) {
                var n = WebAssembly.Module.customSections(e, o);
                0 === n.length && (o = "dylink", n = WebAssembly.Module.customSections(e, o)), a(0 === n.length, "need dylink section"), _ = (e = new Uint8Array(n[0])).length;
              } else {
                a(!(1836278016 == new Uint32Array(new Uint8Array(e.subarray(0, 24)).buffer)[0]), "need to see wasm magic number"), a(0 !== e[8], "need the dylink section to be first"), t = 9;
                var l = s();
                _ = t + l, o = r();
              }
              var d = { neededDynlibs: [], tlsExports: /* @__PURE__ */ new Set(), weakImports: /* @__PURE__ */ new Set() };
              if ("dylink" == o) {
                d.memorySize = s(), d.memoryAlign = s(), d.tableSize = s(), d.tableAlign = s();
                for (var u = s(), m = 0; m < u; ++m) {
                  var c = r();
                  d.neededDynlibs.push(c);
                }
              } else {
                a("dylink.0" !== o);
                for (; t < _; ) {
                  var w = e[t++], p = s();
                  if (1 === w) d.memorySize = s(), d.memoryAlign = s(), d.tableSize = s(), d.tableAlign = s();
                  else if (2 === w) for (u = s(), m = 0; m < u; ++m) c = r(), d.neededDynlibs.push(c);
                  else if (3 === w) for (var h = s(); h--; ) {
                    var g = r();
                    256 & s() && d.tlsExports.add(g);
                  }
                  else if (4 === w) for (h = s(); h--; ) {
                    r(), g = r();
                    1 == (3 & s()) && d.weakImports.add(g);
                  }
                  else t += p;
                }
              }
              return d;
            };
            function getValue(e, t = "i8") {
              switch (t.endsWith("*") && (t = "*"), t) {
                case "i1":
                case "i8":
                  return HEAP8[e];
                case "i16":
                  return HEAP16[e >> 1];
                case "i32":
                  return HEAP32[e >> 2];
                case "i64":
                  abort("to do getValue(i64) use WASM_BIGINT");
                case "float":
                  return HEAPF32[e >> 2];
                case "double":
                  return HEAPF64[e >> 3];
                case "*":
                  return HEAPU32[e >> 2];
                default:
                  abort(`invalid type for getValue: ${t}`);
              }
            }
            var newDSO = (e, t, _) => {
              var s = { refcount: 1 / 0, name: e, exports: _, global: true };
              return LDSO.loadedLibsByName[e] = s, null != t && (LDSO.loadedLibsByHandle[t] = s), s;
            }, LDSO = { loadedLibsByName: {}, loadedLibsByHandle: {}, init() {
              newDSO("__main__", 0, wasmImports);
            } }, ___heap_base = 78096, zeroMemory = (e, t) => (HEAPU8.fill(0, e, e + t), e), alignMemory = (e, t) => Math.ceil(e / t) * t, getMemory = (e) => {
              if (runtimeInitialized) return zeroMemory(_malloc(e), e);
              var t = ___heap_base, _ = t + alignMemory(e, 16);
              return ___heap_base = _, GOT.__heap_base.value = _, t;
            }, isInternalSym = (e) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(e) || e.startsWith("__em_js__"), uleb128Encode = (e, t) => {
              e < 128 ? t.push(e) : t.push(e % 128 | 128, e >> 7);
            }, sigToWasmTypes = (e) => {
              for (var t = { i: "i32", j: "i64", f: "f32", d: "f64", e: "externref", p: "i32" }, _ = { parameters: [], results: "v" == e[0] ? [] : [t[e[0]]] }, s = 1; s < e.length; ++s) _.parameters.push(t[e[s]]);
              return _;
            }, generateFuncType = (e, t) => {
              var _ = e.slice(0, 1), s = e.slice(1), r = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 };
              t.push(96), uleb128Encode(s.length, t);
              for (var a = 0; a < s.length; ++a) t.push(r[s[a]]);
              "v" == _ ? t.push(0) : t.push(1, r[_]);
            }, convertJsFunctionToWasm = (e, t) => {
              if ("function" == typeof WebAssembly.Function) return new WebAssembly.Function(sigToWasmTypes(t), e);
              var _ = [1];
              generateFuncType(t, _);
              var s = [0, 97, 115, 109, 1, 0, 0, 0, 1];
              uleb128Encode(_.length, s), s.push(..._), s.push(2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0);
              var r = new WebAssembly.Module(new Uint8Array(s));
              return new WebAssembly.Instance(r, { e: { f: e } }).exports.f;
            }, wasmTableMirror = [], wasmTable = new WebAssembly.Table({ initial: 27, element: "anyfunc" }), getWasmTableEntry = (e) => {
              var t = wasmTableMirror[e];
              return t || (e >= wasmTableMirror.length && (wasmTableMirror.length = e + 1), wasmTableMirror[e] = t = wasmTable.get(e)), t;
            }, updateTableMap = (e, t) => {
              if (functionsInTableMap) for (var _ = e; _ < e + t; _++) {
                var s = getWasmTableEntry(_);
                s && functionsInTableMap.set(s, _);
              }
            }, functionsInTableMap, getFunctionAddress = (e) => (functionsInTableMap || (functionsInTableMap = /* @__PURE__ */ new WeakMap(), updateTableMap(0, wasmTable.length)), functionsInTableMap.get(e) || 0), freeTableIndexes = [], getEmptyTableSlot = () => {
              if (freeTableIndexes.length) return freeTableIndexes.pop();
              try {
                wasmTable.grow(1);
              } catch (e) {
                if (!(e instanceof RangeError)) throw e;
                throw "Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.";
              }
              return wasmTable.length - 1;
            }, setWasmTableEntry = (e, t) => {
              wasmTable.set(e, t), wasmTableMirror[e] = wasmTable.get(e);
            }, addFunction = (e, t) => {
              var _ = getFunctionAddress(e);
              if (_) return _;
              var s = getEmptyTableSlot();
              try {
                setWasmTableEntry(s, e);
              } catch (_2) {
                if (!(_2 instanceof TypeError)) throw _2;
                var r = convertJsFunctionToWasm(e, t);
                setWasmTableEntry(s, r);
              }
              return functionsInTableMap.set(e, s), s;
            }, updateGOT = (e, t) => {
              for (var _ in e) if (!isInternalSym(_)) {
                var s = e[_];
                _.startsWith("orig$") && (_ = _.split("$")[1], t = true), GOT[_] ||= new WebAssembly.Global({ value: "i32", mutable: true }), (t || 0 == GOT[_].value) && ("function" == typeof s ? GOT[_].value = addFunction(s) : "number" == typeof s ? GOT[_].value = s : err(`unhandled export type for '${_}': ${typeof s}`));
              }
            }, relocateExports = (e, t, _) => {
              var s = {};
              for (var r in e) {
                var a = e[r];
                "object" == typeof a && (a = a.value), "number" == typeof a && (a += t), s[r] = a;
              }
              return updateGOT(s, _), s;
            }, isSymbolDefined = (e) => {
              var t = wasmImports[e];
              return !(!t || t.stub);
            }, dynCallLegacy = (e, t, _) => (0, Module["dynCall_" + e])(t, ..._), dynCall = (e, t, _ = []) => e.includes("j") ? dynCallLegacy(e, t, _) : getWasmTableEntry(t)(..._), createInvokeFunction = (e) => function() {
              var t = stackSave();
              try {
                return dynCall(e, arguments[0], Array.prototype.slice.call(arguments, 1));
              } catch (e2) {
                if (stackRestore(t), e2 !== e2 + 0) throw e2;
                _setThrew(1, 0);
              }
            }, resolveGlobalSymbol = (e, t = false) => {
              var _;
              return t && "orig$" + e in wasmImports && (e = "orig$" + e), isSymbolDefined(e) ? _ = wasmImports[e] : e.startsWith("invoke_") && (_ = wasmImports[e] = createInvokeFunction(e.split("_")[1])), { sym: _, name: e };
            }, UTF8ToString = (e, t) => e ? UTF8ArrayToString(HEAPU8, e, t) : "", loadWebAssemblyModule = (binary, flags, libName, localScope, handle) => {
              var metadata = getDylinkMetadata(binary);
              function loadModule() {
                var firstLoad = !handle || !HEAP8[handle + 8];
                if (firstLoad) {
                  var memAlign = Math.pow(2, metadata.memoryAlign), memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0, tableBase = metadata.tableSize ? wasmTable.length : 0;
                  handle && (HEAP8[handle + 8] = 1, HEAPU32[handle + 12 >> 2] = memoryBase, HEAP32[handle + 16 >> 2] = metadata.memorySize, HEAPU32[handle + 20 >> 2] = tableBase, HEAP32[handle + 24 >> 2] = metadata.tableSize);
                } else memoryBase = HEAPU32[handle + 12 >> 2], tableBase = HEAPU32[handle + 20 >> 2];
                var tableGrowthNeeded = tableBase + metadata.tableSize - wasmTable.length, moduleExports;
                function resolveSymbol(e) {
                  var t = resolveGlobalSymbol(e).sym;
                  return !t && localScope && (t = localScope[e]), t || (t = moduleExports[e]), t;
                }
                tableGrowthNeeded > 0 && wasmTable.grow(tableGrowthNeeded);
                var proxyHandler = { get(e, t) {
                  switch (t) {
                    case "__memory_base":
                      return memoryBase;
                    case "__table_base":
                      return tableBase;
                  }
                  if (t in wasmImports && !wasmImports[t].stub) return wasmImports[t];
                  var _;
                  t in e || (e[t] = (...e2) => (_ ||= resolveSymbol(t), _(...e2)));
                  return e[t];
                } }, proxy = new Proxy({}, proxyHandler), info = { "GOT.mem": new Proxy({}, GOTHandler), "GOT.func": new Proxy({}, GOTHandler), env: proxy, wasi_snapshot_preview1: proxy };
                function postInstantiation(module, instance) {
                  function addEmAsm(addr, body) {
                    for (var args = [], arity = 0; arity < 16 && -1 != body.indexOf("$" + arity); arity++) args.push("$" + arity);
                    args = args.join(",");
                    var func = `(${args}) => { ${body} };`;
                    ASM_CONSTS[start] = eval(func);
                  }
                  if (updateTableMap(tableBase, metadata.tableSize), moduleExports = relocateExports(instance.exports, memoryBase), flags.allowUndefined || reportUndefinedSymbols(), "__start_em_asm" in moduleExports) for (var start = moduleExports.__start_em_asm, stop = moduleExports.__stop_em_asm; start < stop; ) {
                    var jsString = UTF8ToString(start);
                    addEmAsm(start, jsString), start = HEAPU8.indexOf(0, start) + 1;
                  }
                  function addEmJs(name, cSig, body) {
                    var jsArgs = [];
                    if (cSig = cSig.slice(1, -1), "void" != cSig) for (var i in cSig = cSig.split(","), cSig) {
                      var jsArg = cSig[i].split(" ").pop();
                      jsArgs.push(jsArg.replace("*", ""));
                    }
                    var func = `(${jsArgs}) => ${body};`;
                    moduleExports[name] = eval(func);
                  }
                  for (var name in moduleExports) if (name.startsWith("__em_js__")) {
                    var start = moduleExports[name], jsString = UTF8ToString(start), parts = jsString.split("<::>");
                    addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]), delete moduleExports[name];
                  }
                  var applyRelocs = moduleExports.__wasm_apply_data_relocs;
                  applyRelocs && (runtimeInitialized ? applyRelocs() : __RELOC_FUNCS__.push(applyRelocs));
                  var init = moduleExports.__wasm_call_ctors;
                  return init && (runtimeInitialized ? init() : __ATINIT__.push(init)), moduleExports;
                }
                if (flags.loadAsync) {
                  if (binary instanceof WebAssembly.Module) {
                    var instance = new WebAssembly.Instance(binary, info);
                    return Promise.resolve(postInstantiation(binary, instance));
                  }
                  return WebAssembly.instantiate(binary, info).then((e) => postInstantiation(e.module, e.instance));
                }
                var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary), instance = new WebAssembly.Instance(module, info);
                return postInstantiation(module, instance);
              }
              return currentModuleWeakSymbols = metadata.weakImports, flags.loadAsync ? metadata.neededDynlibs.reduce((e, t) => e.then(() => loadDynamicLibrary(t, flags)), Promise.resolve()).then(loadModule) : (metadata.neededDynlibs.forEach((e) => loadDynamicLibrary(e, flags, localScope)), loadModule());
            }, mergeLibSymbols = (e, t) => {
              for (var [_, s] of Object.entries(e)) {
                const e2 = (e3) => {
                  isSymbolDefined(e3) || (wasmImports[e3] = s);
                };
                e2(_);
                const t2 = "__main_argc_argv";
                "main" == _ && e2(t2), _ == t2 && e2("main"), _.startsWith("dynCall_") && !Module.hasOwnProperty(_) && (Module[_] = s);
              }
            }, asyncLoad = (e, t, _, s) => {
              var r = s ? "" : getUniqueRunDependency(`al ${e}`);
              readAsync(e, (e2) => {
                t(new Uint8Array(e2)), r && removeRunDependency(r);
              }, (t2) => {
                if (!_) throw `Loading data file "${e}" failed.`;
                _();
              }), r && addRunDependency(r);
            };
            function loadDynamicLibrary(e, t = { global: true, nodelete: true }, _, s) {
              var r = LDSO.loadedLibsByName[e];
              if (r) return t.global ? r.global || (r.global = true, mergeLibSymbols(r.exports, e)) : _ && Object.assign(_, r.exports), t.nodelete && r.refcount !== 1 / 0 && (r.refcount = 1 / 0), r.refcount++, s && (LDSO.loadedLibsByHandle[s] = r), !t.loadAsync || Promise.resolve(true);
              function a() {
                if (s) {
                  var _2 = HEAPU32[s + 28 >> 2], r2 = HEAPU32[s + 32 >> 2];
                  if (_2 && r2) {
                    var a2 = HEAP8.slice(_2, _2 + r2);
                    return t.loadAsync ? Promise.resolve(a2) : a2;
                  }
                }
                var o2 = locateFile(e);
                if (t.loadAsync) return new Promise(function(e2, t2) {
                  asyncLoad(o2, e2, t2);
                });
                if (!readBinary) throw new Error(`${o2}: file not found, and synchronous loading of external files is not available`);
                return readBinary(o2);
              }
              function o() {
                return t.loadAsync ? a().then((r2) => loadWebAssemblyModule(r2, t, e, _, s)) : loadWebAssemblyModule(a(), t, e, _, s);
              }
              function n(t2) {
                r.global ? mergeLibSymbols(t2, e) : _ && Object.assign(_, t2), r.exports = t2;
              }
              return (r = newDSO(e, s, "loading")).refcount = t.nodelete ? 1 / 0 : 1, r.global = t.global, t.loadAsync ? o().then((e2) => (n(e2), true)) : (n(o()), true);
            }
            var reportUndefinedSymbols = () => {
              for (var [e, t] of Object.entries(GOT)) if (0 == t.value) {
                var _ = resolveGlobalSymbol(e, true).sym;
                if (!_ && !t.required) continue;
                if ("function" == typeof _) t.value = addFunction(_, _.sig);
                else {
                  if ("number" != typeof _) throw new Error(`bad export type for '${e}': ${typeof _}`);
                  t.value = _;
                }
              }
            }, loadDylibs = () => {
              dynamicLibraries.length ? (addRunDependency("loadDylibs"), dynamicLibraries.reduce((e, t) => e.then(() => loadDynamicLibrary(t, { loadAsync: true, global: true, nodelete: true, allowUndefined: true })), Promise.resolve()).then(() => {
                reportUndefinedSymbols(), removeRunDependency("loadDylibs");
              })) : reportUndefinedSymbols();
            }, noExitRuntime = Module.noExitRuntime || true;
            function setValue(e, t, _ = "i8") {
              switch (_.endsWith("*") && (_ = "*"), _) {
                case "i1":
                case "i8":
                  HEAP8[e] = t;
                  break;
                case "i16":
                  HEAP16[e >> 1] = t;
                  break;
                case "i32":
                  HEAP32[e >> 2] = t;
                  break;
                case "i64":
                  abort("to do setValue(i64) use WASM_BIGINT");
                case "float":
                  HEAPF32[e >> 2] = t;
                  break;
                case "double":
                  HEAPF64[e >> 3] = t;
                  break;
                case "*":
                  HEAPU32[e >> 2] = t;
                  break;
                default:
                  abort(`invalid type for setValue: ${_}`);
              }
            }
            var ___memory_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1024), ___stack_pointer = new WebAssembly.Global({ value: "i32", mutable: true }, 78096), ___table_base = new WebAssembly.Global({ value: "i32", mutable: false }, 1), nowIsMonotonic = 1, __emscripten_get_now_is_monotonic = () => nowIsMonotonic;
            __emscripten_get_now_is_monotonic.sig = "i";
            var _abort = () => {
              abort("");
            };
            _abort.sig = "v";
            var _emscripten_date_now = () => Date.now(), _emscripten_get_now;
            _emscripten_date_now.sig = "d", _emscripten_get_now = () => performance.now(), _emscripten_get_now.sig = "d";
            var _emscripten_memcpy_js = (e, t, _) => HEAPU8.copyWithin(e, t, t + _);
            _emscripten_memcpy_js.sig = "vppp";
            var getHeapMax = () => 2147483648, growMemory = (e) => {
              var t = (e - wasmMemory.buffer.byteLength + 65535) / 65536;
              try {
                return wasmMemory.grow(t), updateMemoryViews(), 1;
              } catch (e2) {
              }
            }, _emscripten_resize_heap = (e) => {
              var t = HEAPU8.length;
              e >>>= 0;
              var _ = getHeapMax();
              if (e > _) return false;
              for (var s, r, a = 1; a <= 4; a *= 2) {
                var o = t * (1 + 0.2 / a);
                o = Math.min(o, e + 100663296);
                var n = Math.min(_, (s = Math.max(e, o)) + ((r = 65536) - s % r) % r);
                if (growMemory(n)) return true;
              }
              return false;
            };
            _emscripten_resize_heap.sig = "ip";
            var _fd_close = (e) => 52;
            _fd_close.sig = "ii";
            var convertI32PairToI53Checked = (e, t) => t + 2097152 >>> 0 < 4194305 - !!e ? (e >>> 0) + 4294967296 * t : NaN;
            function _fd_seek(e, t, _, s, r) {
              convertI32PairToI53Checked(t, _);
              return 70;
            }
            _fd_seek.sig = "iiiiip";
            var printCharBuffers = [null, [], []], printChar = (e, t) => {
              var _ = printCharBuffers[e];
              0 === t || 10 === t ? ((1 === e ? out : err)(UTF8ArrayToString(_, 0)), _.length = 0) : _.push(t);
            }, SYSCALLS = { varargs: void 0, get() {
              var e = HEAP32[+SYSCALLS.varargs >> 2];
              return SYSCALLS.varargs += 4, e;
            }, getp: () => SYSCALLS.get(), getStr: (e) => UTF8ToString(e) }, _fd_write = (e, t, _, s) => {
              for (var r = 0, a = 0; a < _; a++) {
                var o = HEAPU32[t >> 2], n = HEAPU32[t + 4 >> 2];
                t += 8;
                for (var l = 0; l < n; l++) printChar(e, HEAPU8[o + l]);
                r += n;
              }
              return HEAPU32[s >> 2] = r, 0;
            };
            function _tree_sitter_log_callback(e, t) {
              if (currentLogCallback) {
                const _ = UTF8ToString(t);
                currentLogCallback(_, 0 !== e);
              }
            }
            function _tree_sitter_parse_callback(e, t, _, s, r) {
              const a = currentParseCallback(t, { row: _, column: s });
              "string" == typeof a ? (setValue(r, a.length, "i32"), stringToUTF16(a, e, 10240)) : setValue(r, 0, "i32");
            }
            _fd_write.sig = "iippp";
            var runtimeKeepaliveCounter = 0, keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0, _proc_exit = (e) => {
              EXITSTATUS = e, keepRuntimeAlive() || (Module.onExit?.(e), ABORT = true), quit_(e, new ExitStatus(e));
            };
            _proc_exit.sig = "vi";
            var exitJS = (e, t) => {
              EXITSTATUS = e, _proc_exit(e);
            }, handleException = (e) => {
              if (e instanceof ExitStatus || "unwind" == e) return EXITSTATUS;
              quit_(1, e);
            }, lengthBytesUTF8 = (e) => {
              for (var t = 0, _ = 0; _ < e.length; ++_) {
                var s = e.charCodeAt(_);
                s <= 127 ? t++ : s <= 2047 ? t += 2 : s >= 55296 && s <= 57343 ? (t += 4, ++_) : t += 3;
              }
              return t;
            }, stringToUTF8Array = (e, t, _, s) => {
              if (!(s > 0)) return 0;
              for (var r = _, a = _ + s - 1, o = 0; o < e.length; ++o) {
                var n = e.charCodeAt(o);
                if (n >= 55296 && n <= 57343) n = 65536 + ((1023 & n) << 10) | 1023 & e.charCodeAt(++o);
                if (n <= 127) {
                  if (_ >= a) break;
                  t[_++] = n;
                } else if (n <= 2047) {
                  if (_ + 1 >= a) break;
                  t[_++] = 192 | n >> 6, t[_++] = 128 | 63 & n;
                } else if (n <= 65535) {
                  if (_ + 2 >= a) break;
                  t[_++] = 224 | n >> 12, t[_++] = 128 | n >> 6 & 63, t[_++] = 128 | 63 & n;
                } else {
                  if (_ + 3 >= a) break;
                  t[_++] = 240 | n >> 18, t[_++] = 128 | n >> 12 & 63, t[_++] = 128 | n >> 6 & 63, t[_++] = 128 | 63 & n;
                }
              }
              return t[_] = 0, _ - r;
            }, stringToUTF8 = (e, t, _) => stringToUTF8Array(e, HEAPU8, t, _), stringToUTF8OnStack = (e) => {
              var t = lengthBytesUTF8(e) + 1, _ = stackAlloc(t);
              return stringToUTF8(e, _, t), _;
            }, stringToUTF16 = (e, t, _) => {
              if (_ ??= 2147483647, _ < 2) return 0;
              for (var s = t, r = (_ -= 2) < 2 * e.length ? _ / 2 : e.length, a = 0; a < r; ++a) {
                var o = e.charCodeAt(a);
                HEAP16[t >> 1] = o, t += 2;
              }
              return HEAP16[t >> 1] = 0, t - s;
            }, AsciiToString = (e) => {
              for (var t = ""; ; ) {
                var _ = HEAPU8[e++];
                if (!_) return t;
                t += String.fromCharCode(_);
              }
            }, wasmImports = { __heap_base: ___heap_base, __indirect_function_table: wasmTable, __memory_base: ___memory_base, __stack_pointer: ___stack_pointer, __table_base: ___table_base, _emscripten_get_now_is_monotonic: __emscripten_get_now_is_monotonic, abort: _abort, emscripten_get_now: _emscripten_get_now, emscripten_memcpy_js: _emscripten_memcpy_js, emscripten_resize_heap: _emscripten_resize_heap, fd_close: _fd_close, fd_seek: _fd_seek, fd_write: _fd_write, memory: wasmMemory, tree_sitter_log_callback: _tree_sitter_log_callback, tree_sitter_parse_callback: _tree_sitter_parse_callback }, wasmExports = createWasm(), ___wasm_call_ctors = () => (___wasm_call_ctors = wasmExports.__wasm_call_ctors)(), ___wasm_apply_data_relocs = () => (___wasm_apply_data_relocs = wasmExports.__wasm_apply_data_relocs)(), _malloc = Module._malloc = (e) => (_malloc = Module._malloc = wasmExports.malloc)(e), _calloc = Module._calloc = (e, t) => (_calloc = Module._calloc = wasmExports.calloc)(e, t), _realloc = Module._realloc = (e, t) => (_realloc = Module._realloc = wasmExports.realloc)(e, t), _free = Module._free = (e) => (_free = Module._free = wasmExports.free)(e), _ts_language_symbol_count = Module._ts_language_symbol_count = (e) => (_ts_language_symbol_count = Module._ts_language_symbol_count = wasmExports.ts_language_symbol_count)(e), _ts_language_state_count = Module._ts_language_state_count = (e) => (_ts_language_state_count = Module._ts_language_state_count = wasmExports.ts_language_state_count)(e), _ts_language_version = Module._ts_language_version = (e) => (_ts_language_version = Module._ts_language_version = wasmExports.ts_language_version)(e), _ts_language_field_count = Module._ts_language_field_count = (e) => (_ts_language_field_count = Module._ts_language_field_count = wasmExports.ts_language_field_count)(e), _ts_language_next_state = Module._ts_language_next_state = (e, t, _) => (_ts_language_next_state = Module._ts_language_next_state = wasmExports.ts_language_next_state)(e, t, _), _ts_language_symbol_name = Module._ts_language_symbol_name = (e, t) => (_ts_language_symbol_name = Module._ts_language_symbol_name = wasmExports.ts_language_symbol_name)(e, t), _ts_language_symbol_for_name = Module._ts_language_symbol_for_name = (e, t, _, s) => (_ts_language_symbol_for_name = Module._ts_language_symbol_for_name = wasmExports.ts_language_symbol_for_name)(e, t, _, s), _strncmp = Module._strncmp = (e, t, _) => (_strncmp = Module._strncmp = wasmExports.strncmp)(e, t, _), _ts_language_symbol_type = Module._ts_language_symbol_type = (e, t) => (_ts_language_symbol_type = Module._ts_language_symbol_type = wasmExports.ts_language_symbol_type)(e, t), _ts_language_field_name_for_id = Module._ts_language_field_name_for_id = (e, t) => (_ts_language_field_name_for_id = Module._ts_language_field_name_for_id = wasmExports.ts_language_field_name_for_id)(e, t), _ts_lookahead_iterator_new = Module._ts_lookahead_iterator_new = (e, t) => (_ts_lookahead_iterator_new = Module._ts_lookahead_iterator_new = wasmExports.ts_lookahead_iterator_new)(e, t), _ts_lookahead_iterator_delete = Module._ts_lookahead_iterator_delete = (e) => (_ts_lookahead_iterator_delete = Module._ts_lookahead_iterator_delete = wasmExports.ts_lookahead_iterator_delete)(e), _ts_lookahead_iterator_reset_state = Module._ts_lookahead_iterator_reset_state = (e, t) => (_ts_lookahead_iterator_reset_state = Module._ts_lookahead_iterator_reset_state = wasmExports.ts_lookahead_iterator_reset_state)(e, t), _ts_lookahead_iterator_reset = Module._ts_lookahead_iterator_reset = (e, t, _) => (_ts_lookahead_iterator_reset = Module._ts_lookahead_iterator_reset = wasmExports.ts_lookahead_iterator_reset)(e, t, _), _ts_lookahead_iterator_next = Module._ts_lookahead_iterator_next = (e) => (_ts_lookahead_iterator_next = Module._ts_lookahead_iterator_next = wasmExports.ts_lookahead_iterator_next)(e), _ts_lookahead_iterator_current_symbol = Module._ts_lookahead_iterator_current_symbol = (e) => (_ts_lookahead_iterator_current_symbol = Module._ts_lookahead_iterator_current_symbol = wasmExports.ts_lookahead_iterator_current_symbol)(e), _memset = Module._memset = (e, t, _) => (_memset = Module._memset = wasmExports.memset)(e, t, _), _memcpy = Module._memcpy = (e, t, _) => (_memcpy = Module._memcpy = wasmExports.memcpy)(e, t, _), _ts_parser_delete = Module._ts_parser_delete = (e) => (_ts_parser_delete = Module._ts_parser_delete = wasmExports.ts_parser_delete)(e), _ts_parser_reset = Module._ts_parser_reset = (e) => (_ts_parser_reset = Module._ts_parser_reset = wasmExports.ts_parser_reset)(e), _ts_parser_set_language = Module._ts_parser_set_language = (e, t) => (_ts_parser_set_language = Module._ts_parser_set_language = wasmExports.ts_parser_set_language)(e, t), _ts_parser_timeout_micros = Module._ts_parser_timeout_micros = (e) => (_ts_parser_timeout_micros = Module._ts_parser_timeout_micros = wasmExports.ts_parser_timeout_micros)(e), _ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = (e, t, _) => (_ts_parser_set_timeout_micros = Module._ts_parser_set_timeout_micros = wasmExports.ts_parser_set_timeout_micros)(e, t, _), _ts_parser_set_included_ranges = Module._ts_parser_set_included_ranges = (e, t, _) => (_ts_parser_set_included_ranges = Module._ts_parser_set_included_ranges = wasmExports.ts_parser_set_included_ranges)(e, t, _), _memmove = Module._memmove = (e, t, _) => (_memmove = Module._memmove = wasmExports.memmove)(e, t, _), _memcmp = Module._memcmp = (e, t, _) => (_memcmp = Module._memcmp = wasmExports.memcmp)(e, t, _), _ts_query_new = Module._ts_query_new = (e, t, _, s, r) => (_ts_query_new = Module._ts_query_new = wasmExports.ts_query_new)(e, t, _, s, r), _ts_query_delete = Module._ts_query_delete = (e) => (_ts_query_delete = Module._ts_query_delete = wasmExports.ts_query_delete)(e), _iswspace = Module._iswspace = (e) => (_iswspace = Module._iswspace = wasmExports.iswspace)(e), _iswalnum = Module._iswalnum = (e) => (_iswalnum = Module._iswalnum = wasmExports.iswalnum)(e), _ts_query_pattern_count = Module._ts_query_pattern_count = (e) => (_ts_query_pattern_count = Module._ts_query_pattern_count = wasmExports.ts_query_pattern_count)(e), _ts_query_capture_count = Module._ts_query_capture_count = (e) => (_ts_query_capture_count = Module._ts_query_capture_count = wasmExports.ts_query_capture_count)(e), _ts_query_string_count = Module._ts_query_string_count = (e) => (_ts_query_string_count = Module._ts_query_string_count = wasmExports.ts_query_string_count)(e), _ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = (e, t, _) => (_ts_query_capture_name_for_id = Module._ts_query_capture_name_for_id = wasmExports.ts_query_capture_name_for_id)(e, t, _), _ts_query_string_value_for_id = Module._ts_query_string_value_for_id = (e, t, _) => (_ts_query_string_value_for_id = Module._ts_query_string_value_for_id = wasmExports.ts_query_string_value_for_id)(e, t, _), _ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = (e, t, _) => (_ts_query_predicates_for_pattern = Module._ts_query_predicates_for_pattern = wasmExports.ts_query_predicates_for_pattern)(e, t, _), _ts_query_disable_capture = Module._ts_query_disable_capture = (e, t, _) => (_ts_query_disable_capture = Module._ts_query_disable_capture = wasmExports.ts_query_disable_capture)(e, t, _), _ts_tree_copy = Module._ts_tree_copy = (e) => (_ts_tree_copy = Module._ts_tree_copy = wasmExports.ts_tree_copy)(e), _ts_tree_delete = Module._ts_tree_delete = (e) => (_ts_tree_delete = Module._ts_tree_delete = wasmExports.ts_tree_delete)(e), _ts_init = Module._ts_init = () => (_ts_init = Module._ts_init = wasmExports.ts_init)(), _ts_parser_new_wasm = Module._ts_parser_new_wasm = () => (_ts_parser_new_wasm = Module._ts_parser_new_wasm = wasmExports.ts_parser_new_wasm)(), _ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = (e, t) => (_ts_parser_enable_logger_wasm = Module._ts_parser_enable_logger_wasm = wasmExports.ts_parser_enable_logger_wasm)(e, t), _ts_parser_parse_wasm = Module._ts_parser_parse_wasm = (e, t, _, s, r) => (_ts_parser_parse_wasm = Module._ts_parser_parse_wasm = wasmExports.ts_parser_parse_wasm)(e, t, _, s, r), _ts_parser_included_ranges_wasm = Module._ts_parser_included_ranges_wasm = (e) => (_ts_parser_included_ranges_wasm = Module._ts_parser_included_ranges_wasm = wasmExports.ts_parser_included_ranges_wasm)(e), _ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = (e, t) => (_ts_language_type_is_named_wasm = Module._ts_language_type_is_named_wasm = wasmExports.ts_language_type_is_named_wasm)(e, t), _ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = (e, t) => (_ts_language_type_is_visible_wasm = Module._ts_language_type_is_visible_wasm = wasmExports.ts_language_type_is_visible_wasm)(e, t), _ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = (e) => (_ts_tree_root_node_wasm = Module._ts_tree_root_node_wasm = wasmExports.ts_tree_root_node_wasm)(e), _ts_tree_root_node_with_offset_wasm = Module._ts_tree_root_node_with_offset_wasm = (e) => (_ts_tree_root_node_with_offset_wasm = Module._ts_tree_root_node_with_offset_wasm = wasmExports.ts_tree_root_node_with_offset_wasm)(e), _ts_tree_edit_wasm = Module._ts_tree_edit_wasm = (e) => (_ts_tree_edit_wasm = Module._ts_tree_edit_wasm = wasmExports.ts_tree_edit_wasm)(e), _ts_tree_included_ranges_wasm = Module._ts_tree_included_ranges_wasm = (e) => (_ts_tree_included_ranges_wasm = Module._ts_tree_included_ranges_wasm = wasmExports.ts_tree_included_ranges_wasm)(e), _ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = (e, t) => (_ts_tree_get_changed_ranges_wasm = Module._ts_tree_get_changed_ranges_wasm = wasmExports.ts_tree_get_changed_ranges_wasm)(e, t), _ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = (e) => (_ts_tree_cursor_new_wasm = Module._ts_tree_cursor_new_wasm = wasmExports.ts_tree_cursor_new_wasm)(e), _ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = (e) => (_ts_tree_cursor_delete_wasm = Module._ts_tree_cursor_delete_wasm = wasmExports.ts_tree_cursor_delete_wasm)(e), _ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = (e) => (_ts_tree_cursor_reset_wasm = Module._ts_tree_cursor_reset_wasm = wasmExports.ts_tree_cursor_reset_wasm)(e), _ts_tree_cursor_reset_to_wasm = Module._ts_tree_cursor_reset_to_wasm = (e, t) => (_ts_tree_cursor_reset_to_wasm = Module._ts_tree_cursor_reset_to_wasm = wasmExports.ts_tree_cursor_reset_to_wasm)(e, t), _ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = (e) => (_ts_tree_cursor_goto_first_child_wasm = Module._ts_tree_cursor_goto_first_child_wasm = wasmExports.ts_tree_cursor_goto_first_child_wasm)(e), _ts_tree_cursor_goto_last_child_wasm = Module._ts_tree_cursor_goto_last_child_wasm = (e) => (_ts_tree_cursor_goto_last_child_wasm = Module._ts_tree_cursor_goto_last_child_wasm = wasmExports.ts_tree_cursor_goto_last_child_wasm)(e), _ts_tree_cursor_goto_first_child_for_index_wasm = Module._ts_tree_cursor_goto_first_child_for_index_wasm = (e) => (_ts_tree_cursor_goto_first_child_for_index_wasm = Module._ts_tree_cursor_goto_first_child_for_index_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_index_wasm)(e), _ts_tree_cursor_goto_first_child_for_position_wasm = Module._ts_tree_cursor_goto_first_child_for_position_wasm = (e) => (_ts_tree_cursor_goto_first_child_for_position_wasm = Module._ts_tree_cursor_goto_first_child_for_position_wasm = wasmExports.ts_tree_cursor_goto_first_child_for_position_wasm)(e), _ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = (e) => (_ts_tree_cursor_goto_next_sibling_wasm = Module._ts_tree_cursor_goto_next_sibling_wasm = wasmExports.ts_tree_cursor_goto_next_sibling_wasm)(e), _ts_tree_cursor_goto_previous_sibling_wasm = Module._ts_tree_cursor_goto_previous_sibling_wasm = (e) => (_ts_tree_cursor_goto_previous_sibling_wasm = Module._ts_tree_cursor_goto_previous_sibling_wasm = wasmExports.ts_tree_cursor_goto_previous_sibling_wasm)(e), _ts_tree_cursor_goto_descendant_wasm = Module._ts_tree_cursor_goto_descendant_wasm = (e, t) => (_ts_tree_cursor_goto_descendant_wasm = Module._ts_tree_cursor_goto_descendant_wasm = wasmExports.ts_tree_cursor_goto_descendant_wasm)(e, t), _ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = (e) => (_ts_tree_cursor_goto_parent_wasm = Module._ts_tree_cursor_goto_parent_wasm = wasmExports.ts_tree_cursor_goto_parent_wasm)(e), _ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = (e) => (_ts_tree_cursor_current_node_type_id_wasm = Module._ts_tree_cursor_current_node_type_id_wasm = wasmExports.ts_tree_cursor_current_node_type_id_wasm)(e), _ts_tree_cursor_current_node_state_id_wasm = Module._ts_tree_cursor_current_node_state_id_wasm = (e) => (_ts_tree_cursor_current_node_state_id_wasm = Module._ts_tree_cursor_current_node_state_id_wasm = wasmExports.ts_tree_cursor_current_node_state_id_wasm)(e), _ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = (e) => (_ts_tree_cursor_current_node_is_named_wasm = Module._ts_tree_cursor_current_node_is_named_wasm = wasmExports.ts_tree_cursor_current_node_is_named_wasm)(e), _ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = (e) => (_ts_tree_cursor_current_node_is_missing_wasm = Module._ts_tree_cursor_current_node_is_missing_wasm = wasmExports.ts_tree_cursor_current_node_is_missing_wasm)(e), _ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = (e) => (_ts_tree_cursor_current_node_id_wasm = Module._ts_tree_cursor_current_node_id_wasm = wasmExports.ts_tree_cursor_current_node_id_wasm)(e), _ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = (e) => (_ts_tree_cursor_start_position_wasm = Module._ts_tree_cursor_start_position_wasm = wasmExports.ts_tree_cursor_start_position_wasm)(e), _ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = (e) => (_ts_tree_cursor_end_position_wasm = Module._ts_tree_cursor_end_position_wasm = wasmExports.ts_tree_cursor_end_position_wasm)(e), _ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = (e) => (_ts_tree_cursor_start_index_wasm = Module._ts_tree_cursor_start_index_wasm = wasmExports.ts_tree_cursor_start_index_wasm)(e), _ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = (e) => (_ts_tree_cursor_end_index_wasm = Module._ts_tree_cursor_end_index_wasm = wasmExports.ts_tree_cursor_end_index_wasm)(e), _ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = (e) => (_ts_tree_cursor_current_field_id_wasm = Module._ts_tree_cursor_current_field_id_wasm = wasmExports.ts_tree_cursor_current_field_id_wasm)(e), _ts_tree_cursor_current_depth_wasm = Module._ts_tree_cursor_current_depth_wasm = (e) => (_ts_tree_cursor_current_depth_wasm = Module._ts_tree_cursor_current_depth_wasm = wasmExports.ts_tree_cursor_current_depth_wasm)(e), _ts_tree_cursor_current_descendant_index_wasm = Module._ts_tree_cursor_current_descendant_index_wasm = (e) => (_ts_tree_cursor_current_descendant_index_wasm = Module._ts_tree_cursor_current_descendant_index_wasm = wasmExports.ts_tree_cursor_current_descendant_index_wasm)(e), _ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = (e) => (_ts_tree_cursor_current_node_wasm = Module._ts_tree_cursor_current_node_wasm = wasmExports.ts_tree_cursor_current_node_wasm)(e), _ts_node_symbol_wasm = Module._ts_node_symbol_wasm = (e) => (_ts_node_symbol_wasm = Module._ts_node_symbol_wasm = wasmExports.ts_node_symbol_wasm)(e), _ts_node_field_name_for_child_wasm = Module._ts_node_field_name_for_child_wasm = (e, t) => (_ts_node_field_name_for_child_wasm = Module._ts_node_field_name_for_child_wasm = wasmExports.ts_node_field_name_for_child_wasm)(e, t), _ts_node_children_by_field_id_wasm = Module._ts_node_children_by_field_id_wasm = (e, t) => (_ts_node_children_by_field_id_wasm = Module._ts_node_children_by_field_id_wasm = wasmExports.ts_node_children_by_field_id_wasm)(e, t), _ts_node_first_child_for_byte_wasm = Module._ts_node_first_child_for_byte_wasm = (e) => (_ts_node_first_child_for_byte_wasm = Module._ts_node_first_child_for_byte_wasm = wasmExports.ts_node_first_child_for_byte_wasm)(e), _ts_node_first_named_child_for_byte_wasm = Module._ts_node_first_named_child_for_byte_wasm = (e) => (_ts_node_first_named_child_for_byte_wasm = Module._ts_node_first_named_child_for_byte_wasm = wasmExports.ts_node_first_named_child_for_byte_wasm)(e), _ts_node_grammar_symbol_wasm = Module._ts_node_grammar_symbol_wasm = (e) => (_ts_node_grammar_symbol_wasm = Module._ts_node_grammar_symbol_wasm = wasmExports.ts_node_grammar_symbol_wasm)(e), _ts_node_child_count_wasm = Module._ts_node_child_count_wasm = (e) => (_ts_node_child_count_wasm = Module._ts_node_child_count_wasm = wasmExports.ts_node_child_count_wasm)(e), _ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = (e) => (_ts_node_named_child_count_wasm = Module._ts_node_named_child_count_wasm = wasmExports.ts_node_named_child_count_wasm)(e), _ts_node_child_wasm = Module._ts_node_child_wasm = (e, t) => (_ts_node_child_wasm = Module._ts_node_child_wasm = wasmExports.ts_node_child_wasm)(e, t), _ts_node_named_child_wasm = Module._ts_node_named_child_wasm = (e, t) => (_ts_node_named_child_wasm = Module._ts_node_named_child_wasm = wasmExports.ts_node_named_child_wasm)(e, t), _ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = (e, t) => (_ts_node_child_by_field_id_wasm = Module._ts_node_child_by_field_id_wasm = wasmExports.ts_node_child_by_field_id_wasm)(e, t), _ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = (e) => (_ts_node_next_sibling_wasm = Module._ts_node_next_sibling_wasm = wasmExports.ts_node_next_sibling_wasm)(e), _ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = (e) => (_ts_node_prev_sibling_wasm = Module._ts_node_prev_sibling_wasm = wasmExports.ts_node_prev_sibling_wasm)(e), _ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = (e) => (_ts_node_next_named_sibling_wasm = Module._ts_node_next_named_sibling_wasm = wasmExports.ts_node_next_named_sibling_wasm)(e), _ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = (e) => (_ts_node_prev_named_sibling_wasm = Module._ts_node_prev_named_sibling_wasm = wasmExports.ts_node_prev_named_sibling_wasm)(e), _ts_node_descendant_count_wasm = Module._ts_node_descendant_count_wasm = (e) => (_ts_node_descendant_count_wasm = Module._ts_node_descendant_count_wasm = wasmExports.ts_node_descendant_count_wasm)(e), _ts_node_parent_wasm = Module._ts_node_parent_wasm = (e) => (_ts_node_parent_wasm = Module._ts_node_parent_wasm = wasmExports.ts_node_parent_wasm)(e), _ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = (e) => (_ts_node_descendant_for_index_wasm = Module._ts_node_descendant_for_index_wasm = wasmExports.ts_node_descendant_for_index_wasm)(e), _ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = (e) => (_ts_node_named_descendant_for_index_wasm = Module._ts_node_named_descendant_for_index_wasm = wasmExports.ts_node_named_descendant_for_index_wasm)(e), _ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = (e) => (_ts_node_descendant_for_position_wasm = Module._ts_node_descendant_for_position_wasm = wasmExports.ts_node_descendant_for_position_wasm)(e), _ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = (e) => (_ts_node_named_descendant_for_position_wasm = Module._ts_node_named_descendant_for_position_wasm = wasmExports.ts_node_named_descendant_for_position_wasm)(e), _ts_node_start_point_wasm = Module._ts_node_start_point_wasm = (e) => (_ts_node_start_point_wasm = Module._ts_node_start_point_wasm = wasmExports.ts_node_start_point_wasm)(e), _ts_node_end_point_wasm = Module._ts_node_end_point_wasm = (e) => (_ts_node_end_point_wasm = Module._ts_node_end_point_wasm = wasmExports.ts_node_end_point_wasm)(e), _ts_node_start_index_wasm = Module._ts_node_start_index_wasm = (e) => (_ts_node_start_index_wasm = Module._ts_node_start_index_wasm = wasmExports.ts_node_start_index_wasm)(e), _ts_node_end_index_wasm = Module._ts_node_end_index_wasm = (e) => (_ts_node_end_index_wasm = Module._ts_node_end_index_wasm = wasmExports.ts_node_end_index_wasm)(e), _ts_node_to_string_wasm = Module._ts_node_to_string_wasm = (e) => (_ts_node_to_string_wasm = Module._ts_node_to_string_wasm = wasmExports.ts_node_to_string_wasm)(e), _ts_node_children_wasm = Module._ts_node_children_wasm = (e) => (_ts_node_children_wasm = Module._ts_node_children_wasm = wasmExports.ts_node_children_wasm)(e), _ts_node_named_children_wasm = Module._ts_node_named_children_wasm = (e) => (_ts_node_named_children_wasm = Module._ts_node_named_children_wasm = wasmExports.ts_node_named_children_wasm)(e), _ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = (e, t, _, s, r, a, o) => (_ts_node_descendants_of_type_wasm = Module._ts_node_descendants_of_type_wasm = wasmExports.ts_node_descendants_of_type_wasm)(e, t, _, s, r, a, o), _ts_node_is_named_wasm = Module._ts_node_is_named_wasm = (e) => (_ts_node_is_named_wasm = Module._ts_node_is_named_wasm = wasmExports.ts_node_is_named_wasm)(e), _ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = (e) => (_ts_node_has_changes_wasm = Module._ts_node_has_changes_wasm = wasmExports.ts_node_has_changes_wasm)(e), _ts_node_has_error_wasm = Module._ts_node_has_error_wasm = (e) => (_ts_node_has_error_wasm = Module._ts_node_has_error_wasm = wasmExports.ts_node_has_error_wasm)(e), _ts_node_is_error_wasm = Module._ts_node_is_error_wasm = (e) => (_ts_node_is_error_wasm = Module._ts_node_is_error_wasm = wasmExports.ts_node_is_error_wasm)(e), _ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = (e) => (_ts_node_is_missing_wasm = Module._ts_node_is_missing_wasm = wasmExports.ts_node_is_missing_wasm)(e), _ts_node_is_extra_wasm = Module._ts_node_is_extra_wasm = (e) => (_ts_node_is_extra_wasm = Module._ts_node_is_extra_wasm = wasmExports.ts_node_is_extra_wasm)(e), _ts_node_parse_state_wasm = Module._ts_node_parse_state_wasm = (e) => (_ts_node_parse_state_wasm = Module._ts_node_parse_state_wasm = wasmExports.ts_node_parse_state_wasm)(e), _ts_node_next_parse_state_wasm = Module._ts_node_next_parse_state_wasm = (e) => (_ts_node_next_parse_state_wasm = Module._ts_node_next_parse_state_wasm = wasmExports.ts_node_next_parse_state_wasm)(e), _ts_query_matches_wasm = Module._ts_query_matches_wasm = (e, t, _, s, r, a, o, n, l, d) => (_ts_query_matches_wasm = Module._ts_query_matches_wasm = wasmExports.ts_query_matches_wasm)(e, t, _, s, r, a, o, n, l, d), _ts_query_captures_wasm = Module._ts_query_captures_wasm = (e, t, _, s, r, a, o, n, l, d) => (_ts_query_captures_wasm = Module._ts_query_captures_wasm = wasmExports.ts_query_captures_wasm)(e, t, _, s, r, a, o, n, l, d), _iswalpha = Module._iswalpha = (e) => (_iswalpha = Module._iswalpha = wasmExports.iswalpha)(e), _iswblank = Module._iswblank = (e) => (_iswblank = Module._iswblank = wasmExports.iswblank)(e), _iswdigit = Module._iswdigit = (e) => (_iswdigit = Module._iswdigit = wasmExports.iswdigit)(e), _iswlower = Module._iswlower = (e) => (_iswlower = Module._iswlower = wasmExports.iswlower)(e), _iswupper = Module._iswupper = (e) => (_iswupper = Module._iswupper = wasmExports.iswupper)(e), _iswxdigit = Module._iswxdigit = (e) => (_iswxdigit = Module._iswxdigit = wasmExports.iswxdigit)(e), _memchr = Module._memchr = (e, t, _) => (_memchr = Module._memchr = wasmExports.memchr)(e, t, _), _strlen = Module._strlen = (e) => (_strlen = Module._strlen = wasmExports.strlen)(e), _strcmp = Module._strcmp = (e, t) => (_strcmp = Module._strcmp = wasmExports.strcmp)(e, t), _strncat = Module._strncat = (e, t, _) => (_strncat = Module._strncat = wasmExports.strncat)(e, t, _), _strncpy = Module._strncpy = (e, t, _) => (_strncpy = Module._strncpy = wasmExports.strncpy)(e, t, _), _towlower = Module._towlower = (e) => (_towlower = Module._towlower = wasmExports.towlower)(e), _towupper = Module._towupper = (e) => (_towupper = Module._towupper = wasmExports.towupper)(e), _setThrew = (e, t) => (_setThrew = wasmExports.setThrew)(e, t), stackSave = () => (stackSave = wasmExports.stackSave)(), stackRestore = (e) => (stackRestore = wasmExports.stackRestore)(e), stackAlloc = (e) => (stackAlloc = wasmExports.stackAlloc)(e), dynCall_jiji = Module.dynCall_jiji = (e, t, _, s, r) => (dynCall_jiji = Module.dynCall_jiji = wasmExports.dynCall_jiji)(e, t, _, s, r), _orig$ts_parser_timeout_micros = Module._orig$ts_parser_timeout_micros = (e) => (_orig$ts_parser_timeout_micros = Module._orig$ts_parser_timeout_micros = wasmExports.orig$ts_parser_timeout_micros)(e), _orig$ts_parser_set_timeout_micros = Module._orig$ts_parser_set_timeout_micros = (e, t) => (_orig$ts_parser_set_timeout_micros = Module._orig$ts_parser_set_timeout_micros = wasmExports.orig$ts_parser_set_timeout_micros)(e, t), calledRun;
            function callMain(e = []) {
              var t = resolveGlobalSymbol("main").sym;
              if (t) {
                e.unshift(thisProgram);
                var _ = e.length, s = stackAlloc(4 * (_ + 1)), r = s;
                e.forEach((e2) => {
                  HEAPU32[r >> 2] = stringToUTF8OnStack(e2), r += 4;
                }), HEAPU32[r >> 2] = 0;
                try {
                  var a = t(_, s);
                  return exitJS(a, true), a;
                } catch (e2) {
                  return handleException(e2);
                }
              }
            }
            function run(e = arguments_) {
              function t() {
                calledRun || (calledRun = true, Module.calledRun = true, ABORT || (initRuntime(), preMain(), Module.onRuntimeInitialized && Module.onRuntimeInitialized(), shouldRunNow && callMain(e), postRun()));
              }
              runDependencies > 0 || (preRun(), runDependencies > 0 || (Module.setStatus ? (Module.setStatus("Running..."), setTimeout(function() {
                setTimeout(function() {
                  Module.setStatus("");
                }, 1), t();
              }, 1)) : t()));
            }
            if (Module.AsciiToString = AsciiToString, Module.stringToUTF16 = stringToUTF16, dependenciesFulfilled = function e() {
              calledRun || run(), calledRun || (dependenciesFulfilled = e);
            }, Module.preInit) for ("function" == typeof Module.preInit && (Module.preInit = [Module.preInit]); Module.preInit.length > 0; ) Module.preInit.pop()();
            var shouldRunNow = true;
            Module.noInitialRun && (shouldRunNow = false), run();
            const C = Module, INTERNAL = {}, SIZE_OF_INT = 4, SIZE_OF_CURSOR = 4 * SIZE_OF_INT, SIZE_OF_NODE = 5 * SIZE_OF_INT, SIZE_OF_POINT = 2 * SIZE_OF_INT, SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT, ZERO_POINT = { row: 0, column: 0 }, QUERY_WORD_REGEX = /[\w-.]*/g, PREDICATE_STEP_TYPE_CAPTURE = 1, PREDICATE_STEP_TYPE_STRING = 2, LANGUAGE_FUNCTION_REGEX = /^_?tree_sitter_\w+/;
            let VERSION, MIN_COMPATIBLE_VERSION, TRANSFER_BUFFER, currentParseCallback, currentLogCallback;
            class ParserImpl {
              static init() {
                TRANSFER_BUFFER = C._ts_init(), VERSION = getValue(TRANSFER_BUFFER, "i32"), MIN_COMPATIBLE_VERSION = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
              }
              initialize() {
                C._ts_parser_new_wasm(), this[0] = getValue(TRANSFER_BUFFER, "i32"), this[1] = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
              }
              delete() {
                C._ts_parser_delete(this[0]), C._free(this[1]), this[0] = 0, this[1] = 0;
              }
              setLanguage(e) {
                let t;
                if (e) {
                  if (e.constructor !== Language) throw new Error("Argument must be a Language");
                  {
                    t = e[0];
                    const _ = C._ts_language_version(t);
                    if (_ < MIN_COMPATIBLE_VERSION || VERSION < _) throw new Error(`Incompatible language version ${_}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${VERSION}.`);
                  }
                } else t = 0, e = null;
                return this.language = e, C._ts_parser_set_language(this[0], t), this;
              }
              getLanguage() {
                return this.language;
              }
              parse(e, t, _) {
                if ("string" == typeof e) currentParseCallback = (t2, _2) => e.slice(t2);
                else {
                  if ("function" != typeof e) throw new Error("Argument must be a string or a function");
                  currentParseCallback = e;
                }
                this.logCallback ? (currentLogCallback = this.logCallback, C._ts_parser_enable_logger_wasm(this[0], 1)) : (currentLogCallback = null, C._ts_parser_enable_logger_wasm(this[0], 0));
                let s = 0, r = 0;
                if (_?.includedRanges) {
                  s = _.includedRanges.length, r = C._calloc(s, SIZE_OF_RANGE);
                  let e2 = r;
                  for (let t2 = 0; t2 < s; t2++) marshalRange(e2, _.includedRanges[t2]), e2 += SIZE_OF_RANGE;
                }
                const a = C._ts_parser_parse_wasm(this[0], this[1], t ? t[0] : 0, r, s);
                if (!a) throw currentParseCallback = null, currentLogCallback = null, new Error("Parsing failed");
                const o = new Tree(INTERNAL, a, this.language, currentParseCallback);
                return currentParseCallback = null, currentLogCallback = null, o;
              }
              reset() {
                C._ts_parser_reset(this[0]);
              }
              getIncludedRanges() {
                C._ts_parser_included_ranges_wasm(this[0]);
                const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), _ = new Array(e);
                if (e > 0) {
                  let s = t;
                  for (let t2 = 0; t2 < e; t2++) _[t2] = unmarshalRange(s), s += SIZE_OF_RANGE;
                  C._free(t);
                }
                return _;
              }
              getTimeoutMicros() {
                return C._ts_parser_timeout_micros(this[0]);
              }
              setTimeoutMicros(e) {
                C._ts_parser_set_timeout_micros(this[0], e);
              }
              setLogger(e) {
                if (e) {
                  if ("function" != typeof e) throw new Error("Logger callback must be a function");
                } else e = null;
                return this.logCallback = e, this;
              }
              getLogger() {
                return this.logCallback;
              }
            }
            class Tree {
              constructor(e, t, _, s) {
                assertInternal(e), this[0] = t, this.language = _, this.textCallback = s;
              }
              copy() {
                const e = C._ts_tree_copy(this[0]);
                return new Tree(INTERNAL, e, this.language, this.textCallback);
              }
              delete() {
                C._ts_tree_delete(this[0]), this[0] = 0;
              }
              edit(e) {
                marshalEdit(e), C._ts_tree_edit_wasm(this[0]);
              }
              get rootNode() {
                return C._ts_tree_root_node_wasm(this[0]), unmarshalNode(this);
              }
              rootNodeWithOffset(e, t) {
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return setValue(_, e, "i32"), marshalPoint(_ + SIZE_OF_INT, t), C._ts_tree_root_node_with_offset_wasm(this[0]), unmarshalNode(this);
              }
              getLanguage() {
                return this.language;
              }
              walk() {
                return this.rootNode.walk();
              }
              getChangedRanges(e) {
                if (e.constructor !== Tree) throw new TypeError("Argument must be a Tree");
                C._ts_tree_get_changed_ranges_wasm(this[0], e[0]);
                const t = getValue(TRANSFER_BUFFER, "i32"), _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s = new Array(t);
                if (t > 0) {
                  let e2 = _;
                  for (let _2 = 0; _2 < t; _2++) s[_2] = unmarshalRange(e2), e2 += SIZE_OF_RANGE;
                  C._free(_);
                }
                return s;
              }
              getIncludedRanges() {
                C._ts_tree_included_ranges_wasm(this[0]);
                const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), _ = new Array(e);
                if (e > 0) {
                  let s = t;
                  for (let t2 = 0; t2 < e; t2++) _[t2] = unmarshalRange(s), s += SIZE_OF_RANGE;
                  C._free(t);
                }
                return _;
              }
            }
            class Node {
              constructor(e, t) {
                assertInternal(e), this.tree = t;
              }
              get typeId() {
                return marshalNode(this), C._ts_node_symbol_wasm(this.tree[0]);
              }
              get grammarId() {
                return marshalNode(this), C._ts_node_grammar_symbol_wasm(this.tree[0]);
              }
              get type() {
                return this.tree.language.types[this.typeId] || "ERROR";
              }
              get grammarType() {
                return this.tree.language.types[this.grammarId] || "ERROR";
              }
              get endPosition() {
                return marshalNode(this), C._ts_node_end_point_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
              }
              get endIndex() {
                return marshalNode(this), C._ts_node_end_index_wasm(this.tree[0]);
              }
              get text() {
                return getText(this.tree, this.startIndex, this.endIndex);
              }
              get parseState() {
                return marshalNode(this), C._ts_node_parse_state_wasm(this.tree[0]);
              }
              get nextParseState() {
                return marshalNode(this), C._ts_node_next_parse_state_wasm(this.tree[0]);
              }
              get isNamed() {
                return marshalNode(this), 1 === C._ts_node_is_named_wasm(this.tree[0]);
              }
              get hasError() {
                return marshalNode(this), 1 === C._ts_node_has_error_wasm(this.tree[0]);
              }
              get hasChanges() {
                return marshalNode(this), 1 === C._ts_node_has_changes_wasm(this.tree[0]);
              }
              get isError() {
                return marshalNode(this), 1 === C._ts_node_is_error_wasm(this.tree[0]);
              }
              get isMissing() {
                return marshalNode(this), 1 === C._ts_node_is_missing_wasm(this.tree[0]);
              }
              get isExtra() {
                return marshalNode(this), 1 === C._ts_node_is_extra_wasm(this.tree[0]);
              }
              equals(e) {
                return this.id === e.id;
              }
              child(e) {
                return marshalNode(this), C._ts_node_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
              }
              namedChild(e) {
                return marshalNode(this), C._ts_node_named_child_wasm(this.tree[0], e), unmarshalNode(this.tree);
              }
              childForFieldId(e) {
                return marshalNode(this), C._ts_node_child_by_field_id_wasm(this.tree[0], e), unmarshalNode(this.tree);
              }
              childForFieldName(e) {
                const t = this.tree.language.fields.indexOf(e);
                return -1 !== t ? this.childForFieldId(t) : null;
              }
              fieldNameForChild(e) {
                marshalNode(this);
                const t = C._ts_node_field_name_for_child_wasm(this.tree[0], e);
                if (!t) return null;
                return AsciiToString(t);
              }
              childrenForFieldName(e) {
                const t = this.tree.language.fields.indexOf(e);
                return -1 !== t && 0 !== t ? this.childrenForFieldId(t) : [];
              }
              childrenForFieldId(e) {
                marshalNode(this), C._ts_node_children_by_field_id_wasm(this.tree[0], e);
                const t = getValue(TRANSFER_BUFFER, "i32"), _ = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s = new Array(t);
                if (t > 0) {
                  let e2 = _;
                  for (let _2 = 0; _2 < t; _2++) s[_2] = unmarshalNode(this.tree, e2), e2 += SIZE_OF_NODE;
                  C._free(_);
                }
                return s;
              }
              firstChildForIndex(e) {
                marshalNode(this);
                return setValue(TRANSFER_BUFFER + SIZE_OF_NODE, e, "i32"), C._ts_node_first_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              firstNamedChildForIndex(e) {
                marshalNode(this);
                return setValue(TRANSFER_BUFFER + SIZE_OF_NODE, e, "i32"), C._ts_node_first_named_child_for_byte_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get childCount() {
                return marshalNode(this), C._ts_node_child_count_wasm(this.tree[0]);
              }
              get namedChildCount() {
                return marshalNode(this), C._ts_node_named_child_count_wasm(this.tree[0]);
              }
              get firstChild() {
                return this.child(0);
              }
              get firstNamedChild() {
                return this.namedChild(0);
              }
              get lastChild() {
                return this.child(this.childCount - 1);
              }
              get lastNamedChild() {
                return this.namedChild(this.namedChildCount - 1);
              }
              get children() {
                if (!this._children) {
                  marshalNode(this), C._ts_node_children_wasm(this.tree[0]);
                  const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                  if (this._children = new Array(e), e > 0) {
                    let _ = t;
                    for (let t2 = 0; t2 < e; t2++) this._children[t2] = unmarshalNode(this.tree, _), _ += SIZE_OF_NODE;
                    C._free(t);
                  }
                }
                return this._children;
              }
              get namedChildren() {
                if (!this._namedChildren) {
                  marshalNode(this), C._ts_node_named_children_wasm(this.tree[0]);
                  const e = getValue(TRANSFER_BUFFER, "i32"), t = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
                  if (this._namedChildren = new Array(e), e > 0) {
                    let _ = t;
                    for (let t2 = 0; t2 < e; t2++) this._namedChildren[t2] = unmarshalNode(this.tree, _), _ += SIZE_OF_NODE;
                    C._free(t);
                  }
                }
                return this._namedChildren;
              }
              descendantsOfType(e, t, _) {
                Array.isArray(e) || (e = [e]), t || (t = ZERO_POINT), _ || (_ = ZERO_POINT);
                const s = [], r = this.tree.language.types;
                for (let t2 = 0, _2 = r.length; t2 < _2; t2++) e.includes(r[t2]) && s.push(t2);
                const a = C._malloc(SIZE_OF_INT * s.length);
                for (let e2 = 0, t2 = s.length; e2 < t2; e2++) setValue(a + e2 * SIZE_OF_INT, s[e2], "i32");
                marshalNode(this), C._ts_node_descendants_of_type_wasm(this.tree[0], a, s.length, t.row, t.column, _.row, _.column);
                const o = getValue(TRANSFER_BUFFER, "i32"), n = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), l = new Array(o);
                if (o > 0) {
                  let e2 = n;
                  for (let t2 = 0; t2 < o; t2++) l[t2] = unmarshalNode(this.tree, e2), e2 += SIZE_OF_NODE;
                }
                return C._free(n), C._free(a), l;
              }
              get nextSibling() {
                return marshalNode(this), C._ts_node_next_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get previousSibling() {
                return marshalNode(this), C._ts_node_prev_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get nextNamedSibling() {
                return marshalNode(this), C._ts_node_next_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get previousNamedSibling() {
                return marshalNode(this), C._ts_node_prev_named_sibling_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get descendantCount() {
                return marshalNode(this), C._ts_node_descendant_count_wasm(this.tree[0]);
              }
              get parent() {
                return marshalNode(this), C._ts_node_parent_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              descendantForIndex(e, t = e) {
                if ("number" != typeof e || "number" != typeof t) throw new Error("Arguments must be numbers");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return setValue(_, e, "i32"), setValue(_ + SIZE_OF_INT, t, "i32"), C._ts_node_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              namedDescendantForIndex(e, t = e) {
                if ("number" != typeof e || "number" != typeof t) throw new Error("Arguments must be numbers");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return setValue(_, e, "i32"), setValue(_ + SIZE_OF_INT, t, "i32"), C._ts_node_named_descendant_for_index_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              descendantForPosition(e, t = e) {
                if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return marshalPoint(_, e), marshalPoint(_ + SIZE_OF_POINT, t), C._ts_node_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              namedDescendantForPosition(e, t = e) {
                if (!isPoint(e) || !isPoint(t)) throw new Error("Arguments must be {row, column} objects");
                marshalNode(this);
                const _ = TRANSFER_BUFFER + SIZE_OF_NODE;
                return marshalPoint(_, e), marshalPoint(_ + SIZE_OF_POINT, t), C._ts_node_named_descendant_for_position_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              walk() {
                return marshalNode(this), C._ts_tree_cursor_new_wasm(this.tree[0]), new TreeCursor(INTERNAL, this.tree);
              }
              toString() {
                marshalNode(this);
                const e = C._ts_node_to_string_wasm(this.tree[0]), t = AsciiToString(e);
                return C._free(e), t;
              }
            }
            class TreeCursor {
              constructor(e, t) {
                assertInternal(e), this.tree = t, unmarshalTreeCursor(this);
              }
              delete() {
                marshalTreeCursor(this), C._ts_tree_cursor_delete_wasm(this.tree[0]), this[0] = this[1] = this[2] = 0;
              }
              reset(e) {
                marshalNode(e), marshalTreeCursor(this, TRANSFER_BUFFER + SIZE_OF_NODE), C._ts_tree_cursor_reset_wasm(this.tree[0]), unmarshalTreeCursor(this);
              }
              resetTo(e) {
                marshalTreeCursor(this, TRANSFER_BUFFER), marshalTreeCursor(e, TRANSFER_BUFFER + SIZE_OF_CURSOR), C._ts_tree_cursor_reset_to_wasm(this.tree[0], e.tree[0]), unmarshalTreeCursor(this);
              }
              get nodeType() {
                return this.tree.language.types[this.nodeTypeId] || "ERROR";
              }
              get nodeTypeId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]);
              }
              get nodeStateId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_state_id_wasm(this.tree[0]);
              }
              get nodeId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
              }
              get nodeIsNamed() {
                return marshalTreeCursor(this), 1 === C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]);
              }
              get nodeIsMissing() {
                return marshalTreeCursor(this), 1 === C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]);
              }
              get nodeText() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_start_index_wasm(this.tree[0]), t = C._ts_tree_cursor_end_index_wasm(this.tree[0]);
                return getText(this.tree, e, t);
              }
              get startPosition() {
                return marshalTreeCursor(this), C._ts_tree_cursor_start_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
              }
              get endPosition() {
                return marshalTreeCursor(this), C._ts_tree_cursor_end_position_wasm(this.tree[0]), unmarshalPoint(TRANSFER_BUFFER);
              }
              get startIndex() {
                return marshalTreeCursor(this), C._ts_tree_cursor_start_index_wasm(this.tree[0]);
              }
              get endIndex() {
                return marshalTreeCursor(this), C._ts_tree_cursor_end_index_wasm(this.tree[0]);
              }
              get currentNode() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_node_wasm(this.tree[0]), unmarshalNode(this.tree);
              }
              get currentFieldId() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
              }
              get currentFieldName() {
                return this.tree.language.fields[this.currentFieldId];
              }
              get currentDepth() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_depth_wasm(this.tree[0]);
              }
              get currentDescendantIndex() {
                return marshalTreeCursor(this), C._ts_tree_cursor_current_descendant_index_wasm(this.tree[0]);
              }
              gotoFirstChild() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoLastChild() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_last_child_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoFirstChildForIndex(e) {
                marshalTreeCursor(this), setValue(TRANSFER_BUFFER + SIZE_OF_CURSOR, e, "i32");
                const t = C._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === t;
              }
              gotoFirstChildForPosition(e) {
                marshalTreeCursor(this), marshalPoint(TRANSFER_BUFFER + SIZE_OF_CURSOR, e);
                const t = C._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === t;
              }
              gotoNextSibling() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoPreviousSibling() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
              gotoDescendant(e) {
                marshalTreeCursor(this), C._ts_tree_cursor_goto_descendant_wasm(this.tree[0], e), unmarshalTreeCursor(this);
              }
              gotoParent() {
                marshalTreeCursor(this);
                const e = C._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
                return unmarshalTreeCursor(this), 1 === e;
              }
            }
            class Language {
              constructor(e, t) {
                assertInternal(e), this[0] = t, this.types = new Array(C._ts_language_symbol_count(this[0]));
                for (let e2 = 0, t2 = this.types.length; e2 < t2; e2++) C._ts_language_symbol_type(this[0], e2) < 2 && (this.types[e2] = UTF8ToString(C._ts_language_symbol_name(this[0], e2)));
                this.fields = new Array(C._ts_language_field_count(this[0]) + 1);
                for (let e2 = 0, t2 = this.fields.length; e2 < t2; e2++) {
                  const t3 = C._ts_language_field_name_for_id(this[0], e2);
                  this.fields[e2] = 0 !== t3 ? UTF8ToString(t3) : null;
                }
              }
              get version() {
                return C._ts_language_version(this[0]);
              }
              get fieldCount() {
                return this.fields.length - 1;
              }
              get stateCount() {
                return C._ts_language_state_count(this[0]);
              }
              fieldIdForName(e) {
                const t = this.fields.indexOf(e);
                return -1 !== t ? t : null;
              }
              fieldNameForId(e) {
                return this.fields[e] || null;
              }
              idForNodeType(e, t) {
                const _ = lengthBytesUTF8(e), s = C._malloc(_ + 1);
                stringToUTF8(e, s, _ + 1);
                const r = C._ts_language_symbol_for_name(this[0], s, _, t);
                return C._free(s), r || null;
              }
              get nodeTypeCount() {
                return C._ts_language_symbol_count(this[0]);
              }
              nodeTypeForId(e) {
                const t = C._ts_language_symbol_name(this[0], e);
                return t ? UTF8ToString(t) : null;
              }
              nodeTypeIsNamed(e) {
                return !!C._ts_language_type_is_named_wasm(this[0], e);
              }
              nodeTypeIsVisible(e) {
                return !!C._ts_language_type_is_visible_wasm(this[0], e);
              }
              nextState(e, t) {
                return C._ts_language_next_state(this[0], e, t);
              }
              lookaheadIterator(e) {
                const t = C._ts_lookahead_iterator_new(this[0], e);
                return t ? new LookaheadIterable(INTERNAL, t, this) : null;
              }
              query(e) {
                const t = lengthBytesUTF8(e), _ = C._malloc(t + 1);
                stringToUTF8(e, _, t + 1);
                const s = C._ts_query_new(this[0], _, t, TRANSFER_BUFFER, TRANSFER_BUFFER + SIZE_OF_INT);
                if (!s) {
                  const t2 = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), s2 = getValue(TRANSFER_BUFFER, "i32"), r2 = UTF8ToString(_, s2).length, a2 = e.substr(r2, 100).split("\n")[0];
                  let o2, n2 = a2.match(QUERY_WORD_REGEX)[0];
                  switch (t2) {
                    case 2:
                      o2 = new RangeError(`Bad node name '${n2}'`);
                      break;
                    case 3:
                      o2 = new RangeError(`Bad field name '${n2}'`);
                      break;
                    case 4:
                      o2 = new RangeError(`Bad capture name @${n2}`);
                      break;
                    case 5:
                      o2 = new TypeError(`Bad pattern structure at offset ${r2}: '${a2}'...`), n2 = "";
                      break;
                    default:
                      o2 = new SyntaxError(`Bad syntax at offset ${r2}: '${a2}'...`), n2 = "";
                  }
                  throw o2.index = r2, o2.length = n2.length, C._free(_), o2;
                }
                const r = C._ts_query_string_count(s), a = C._ts_query_capture_count(s), o = C._ts_query_pattern_count(s), n = new Array(a), l = new Array(r);
                for (let e2 = 0; e2 < a; e2++) {
                  const t2 = C._ts_query_capture_name_for_id(s, e2, TRANSFER_BUFFER), _2 = getValue(TRANSFER_BUFFER, "i32");
                  n[e2] = UTF8ToString(t2, _2);
                }
                for (let e2 = 0; e2 < r; e2++) {
                  const t2 = C._ts_query_string_value_for_id(s, e2, TRANSFER_BUFFER), _2 = getValue(TRANSFER_BUFFER, "i32");
                  l[e2] = UTF8ToString(t2, _2);
                }
                const d = new Array(o), u = new Array(o), m = new Array(o), c = new Array(o), w = new Array(o);
                for (let e2 = 0; e2 < o; e2++) {
                  const t2 = C._ts_query_predicates_for_pattern(s, e2, TRANSFER_BUFFER), _2 = getValue(TRANSFER_BUFFER, "i32");
                  c[e2] = [], w[e2] = [];
                  const r2 = [];
                  let a2 = t2;
                  for (let t3 = 0; t3 < _2; t3++) {
                    const t4 = getValue(a2, "i32");
                    a2 += SIZE_OF_INT;
                    const _3 = getValue(a2, "i32");
                    if (a2 += SIZE_OF_INT, t4 === PREDICATE_STEP_TYPE_CAPTURE) r2.push({ type: "capture", name: n[_3] });
                    else if (t4 === PREDICATE_STEP_TYPE_STRING) r2.push({ type: "string", value: l[_3] });
                    else if (r2.length > 0) {
                      if ("string" !== r2[0].type) throw new Error("Predicates must begin with a literal value");
                      const t5 = r2[0].value;
                      let _4, s2 = true, a3 = true;
                      switch (t5) {
                        case "any-not-eq?":
                        case "not-eq?":
                          s2 = false;
                        case "any-eq?":
                        case "eq?":
                          if (3 !== r2.length) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected 2, got ${r2.length - 1}`);
                          if ("capture" !== r2[1].type) throw new Error(`First argument of \`#${t5}\` predicate must be a capture. Got "${r2[1].value}"`);
                          if (a3 = !t5.startsWith("any-"), "capture" === r2[2].type) {
                            const t6 = r2[1].name, _5 = r2[2].name;
                            w[e2].push((e3) => {
                              const r3 = [], o3 = [];
                              for (const s3 of e3) s3.name === t6 && r3.push(s3.node), s3.name === _5 && o3.push(s3.node);
                              const n3 = (e4, t7, _6) => _6 ? e4.text === t7.text : e4.text !== t7.text;
                              return a3 ? r3.every((e4) => o3.some((t7) => n3(e4, t7, s2))) : r3.some((e4) => o3.some((t7) => n3(e4, t7, s2)));
                            });
                          } else {
                            _4 = r2[1].name;
                            const t6 = r2[2].value, o3 = (e3) => e3.text === t6, n3 = (e3) => e3.text !== t6;
                            w[e2].push((e3) => {
                              const t7 = [];
                              for (const s3 of e3) s3.name === _4 && t7.push(s3.node);
                              const r3 = s2 ? o3 : n3;
                              return a3 ? t7.every(r3) : t7.some(r3);
                            });
                          }
                          break;
                        case "any-not-match?":
                        case "not-match?":
                          s2 = false;
                        case "any-match?":
                        case "match?":
                          if (3 !== r2.length) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected 2, got ${r2.length - 1}.`);
                          if ("capture" !== r2[1].type) throw new Error(`First argument of \`#${t5}\` predicate must be a capture. Got "${r2[1].value}".`);
                          if ("string" !== r2[2].type) throw new Error(`Second argument of \`#${t5}\` predicate must be a string. Got @${r2[2].value}.`);
                          _4 = r2[1].name;
                          const o2 = new RegExp(r2[2].value);
                          a3 = !t5.startsWith("any-"), w[e2].push((e3) => {
                            const t6 = [];
                            for (const s3 of e3) s3.name === _4 && t6.push(s3.node.text);
                            const r3 = (e4, t7) => t7 ? o2.test(e4) : !o2.test(e4);
                            return 0 === t6.length ? !s2 : a3 ? t6.every((e4) => r3(e4, s2)) : t6.some((e4) => r3(e4, s2));
                          });
                          break;
                        case "set!":
                          if (r2.length < 2 || r2.length > 3) throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${r2.length - 1}.`);
                          if (r2.some((e3) => "string" !== e3.type)) throw new Error('Arguments to `#set!` predicate must be a strings.".');
                          d[e2] || (d[e2] = {}), d[e2][r2[1].value] = r2[2] ? r2[2].value : null;
                          break;
                        case "is?":
                        case "is-not?":
                          if (r2.length < 2 || r2.length > 3) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected 1 or 2. Got ${r2.length - 1}.`);
                          if (r2.some((e3) => "string" !== e3.type)) throw new Error(`Arguments to \`#${t5}\` predicate must be a strings.".`);
                          const n2 = "is?" === t5 ? u : m;
                          n2[e2] || (n2[e2] = {}), n2[e2][r2[1].value] = r2[2] ? r2[2].value : null;
                          break;
                        case "not-any-of?":
                          s2 = false;
                        case "any-of?":
                          if (r2.length < 2) throw new Error(`Wrong number of arguments to \`#${t5}\` predicate. Expected at least 1. Got ${r2.length - 1}.`);
                          if ("capture" !== r2[1].type) throw new Error(`First argument of \`#${t5}\` predicate must be a capture. Got "${r2[1].value}".`);
                          for (let e3 = 2; e3 < r2.length; e3++) if ("string" !== r2[e3].type) throw new Error(`Arguments to \`#${t5}\` predicate must be a strings.".`);
                          _4 = r2[1].name;
                          const l2 = r2.slice(2).map((e3) => e3.value);
                          w[e2].push((e3) => {
                            const t6 = [];
                            for (const s3 of e3) s3.name === _4 && t6.push(s3.node.text);
                            return 0 === t6.length ? !s2 : t6.every((e4) => l2.includes(e4)) === s2;
                          });
                          break;
                        default:
                          c[e2].push({ operator: t5, operands: r2.slice(1) });
                      }
                      r2.length = 0;
                    }
                  }
                  Object.freeze(d[e2]), Object.freeze(u[e2]), Object.freeze(m[e2]);
                }
                return C._free(_), new Query(INTERNAL, s, n, w, c, Object.freeze(d), Object.freeze(u), Object.freeze(m));
              }
              static load(e) {
                let t;
                if (e instanceof Uint8Array) t = Promise.resolve(e);
                else {
                  const _ = e;
                  if ("undefined" != typeof process && process.versions && process.versions.node) {
                    const e2 = require("fs");
                    t = Promise.resolve(e2.readFileSync(_));
                  } else t = fetch(_).then((e2) => e2.arrayBuffer().then((t2) => {
                    if (e2.ok) return new Uint8Array(t2);
                    {
                      const _2 = new TextDecoder("utf-8").decode(t2);
                      throw new Error(`Language.load failed with status ${e2.status}.

${_2}`);
                    }
                  }));
                }
                return t.then((e2) => loadWebAssemblyModule(e2, { loadAsync: true })).then((e2) => {
                  const t2 = Object.keys(e2), _ = t2.find((e3) => LANGUAGE_FUNCTION_REGEX.test(e3) && !e3.includes("external_scanner_"));
                  _ || console.log(`Couldn't find language function in WASM file. Symbols:
${JSON.stringify(t2, null, 2)}`);
                  const s = e2[_]();
                  return new Language(INTERNAL, s);
                });
              }
            }
            class LookaheadIterable {
              constructor(e, t, _) {
                assertInternal(e), this[0] = t, this.language = _;
              }
              get currentTypeId() {
                return C._ts_lookahead_iterator_current_symbol(this[0]);
              }
              get currentType() {
                return this.language.types[this.currentTypeId] || "ERROR";
              }
              delete() {
                C._ts_lookahead_iterator_delete(this[0]), this[0] = 0;
              }
              resetState(e) {
                return C._ts_lookahead_iterator_reset_state(this[0], e);
              }
              reset(e, t) {
                return !!C._ts_lookahead_iterator_reset(this[0], e[0], t) && (this.language = e, true);
              }
              [Symbol.iterator]() {
                const e = this;
                return { next: () => C._ts_lookahead_iterator_next(e[0]) ? { done: false, value: e.currentType } : { done: true, value: "" } };
              }
            }
            class Query {
              constructor(e, t, _, s, r, a, o, n) {
                assertInternal(e), this[0] = t, this.captureNames = _, this.textPredicates = s, this.predicates = r, this.setProperties = a, this.assertedProperties = o, this.refutedProperties = n, this.exceededMatchLimit = false;
              }
              delete() {
                C._ts_query_delete(this[0]), this[0] = 0;
              }
              matches(e, { startPosition: t = ZERO_POINT, endPosition: _ = ZERO_POINT, startIndex: s = 0, endIndex: r = 0, matchLimit: a = 4294967295, maxStartDepth: o = 4294967295 } = {}) {
                if ("number" != typeof a) throw new Error("Arguments must be numbers");
                marshalNode(e), C._ts_query_matches_wasm(this[0], e.tree[0], t.row, t.column, _.row, _.column, s, r, a, o);
                const n = getValue(TRANSFER_BUFFER, "i32"), l = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), d = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), u = new Array(n);
                this.exceededMatchLimit = Boolean(d);
                let m = 0, c = l;
                for (let t2 = 0; t2 < n; t2++) {
                  const t3 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const _2 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const s2 = new Array(_2);
                  if (c = unmarshalCaptures(this, e.tree, c, s2), this.textPredicates[t3].every((e2) => e2(s2))) {
                    u[m] = { pattern: t3, captures: s2 };
                    const e2 = this.setProperties[t3];
                    e2 && (u[m].setProperties = e2);
                    const _3 = this.assertedProperties[t3];
                    _3 && (u[m].assertedProperties = _3);
                    const r2 = this.refutedProperties[t3];
                    r2 && (u[m].refutedProperties = r2), m++;
                  }
                }
                return u.length = m, C._free(l), u;
              }
              captures(e, { startPosition: t = ZERO_POINT, endPosition: _ = ZERO_POINT, startIndex: s = 0, endIndex: r = 0, matchLimit: a = 4294967295, maxStartDepth: o = 4294967295 } = {}) {
                if ("number" != typeof a) throw new Error("Arguments must be numbers");
                marshalNode(e), C._ts_query_captures_wasm(this[0], e.tree[0], t.row, t.column, _.row, _.column, s, r, a, o);
                const n = getValue(TRANSFER_BUFFER, "i32"), l = getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32"), d = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), u = [];
                this.exceededMatchLimit = Boolean(d);
                const m = [];
                let c = l;
                for (let t2 = 0; t2 < n; t2++) {
                  const t3 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const _2 = getValue(c, "i32");
                  c += SIZE_OF_INT;
                  const s2 = getValue(c, "i32");
                  if (c += SIZE_OF_INT, m.length = _2, c = unmarshalCaptures(this, e.tree, c, m), this.textPredicates[t3].every((e2) => e2(m))) {
                    const e2 = m[s2], _3 = this.setProperties[t3];
                    _3 && (e2.setProperties = _3);
                    const r2 = this.assertedProperties[t3];
                    r2 && (e2.assertedProperties = r2);
                    const a2 = this.refutedProperties[t3];
                    a2 && (e2.refutedProperties = a2), u.push(e2);
                  }
                }
                return C._free(l), u;
              }
              predicatesForPattern(e) {
                return this.predicates[e];
              }
              disableCapture(e) {
                const t = lengthBytesUTF8(e), _ = C._malloc(t + 1);
                stringToUTF8(e, _, t + 1), C._ts_query_disable_capture(this[0], _, t), C._free(_);
              }
              didExceedMatchLimit() {
                return this.exceededMatchLimit;
              }
            }
            function getText(e, t, _) {
              const s = _ - t;
              let r = e.textCallback(t, null, _);
              for (t += r.length; t < _; ) {
                const s2 = e.textCallback(t, null, _);
                if (!(s2 && s2.length > 0)) break;
                t += s2.length, r += s2;
              }
              return t > _ && (r = r.slice(0, s)), r;
            }
            function unmarshalCaptures(e, t, _, s) {
              for (let r = 0, a = s.length; r < a; r++) {
                const a2 = getValue(_, "i32"), o = unmarshalNode(t, _ += SIZE_OF_INT);
                _ += SIZE_OF_NODE, s[r] = { name: e.captureNames[a2], node: o };
              }
              return _;
            }
            function assertInternal(e) {
              if (e !== INTERNAL) throw new Error("Illegal constructor");
            }
            function isPoint(e) {
              return e && "number" == typeof e.row && "number" == typeof e.column;
            }
            function marshalNode(e) {
              let t = TRANSFER_BUFFER;
              setValue(t, e.id, "i32"), t += SIZE_OF_INT, setValue(t, e.startIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.startPosition.row, "i32"), t += SIZE_OF_INT, setValue(t, e.startPosition.column, "i32"), t += SIZE_OF_INT, setValue(t, e[0], "i32");
            }
            function unmarshalNode(e, t = TRANSFER_BUFFER) {
              const _ = getValue(t, "i32");
              if (0 === _) return null;
              const s = getValue(t += SIZE_OF_INT, "i32"), r = getValue(t += SIZE_OF_INT, "i32"), a = getValue(t += SIZE_OF_INT, "i32"), o = getValue(t += SIZE_OF_INT, "i32"), n = new Node(INTERNAL, e);
              return n.id = _, n.startIndex = s, n.startPosition = { row: r, column: a }, n[0] = o, n;
            }
            function marshalTreeCursor(e, t = TRANSFER_BUFFER) {
              setValue(t + 0 * SIZE_OF_INT, e[0], "i32"), setValue(t + 1 * SIZE_OF_INT, e[1], "i32"), setValue(t + 2 * SIZE_OF_INT, e[2], "i32"), setValue(t + 3 * SIZE_OF_INT, e[3], "i32");
            }
            function unmarshalTreeCursor(e) {
              e[0] = getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32"), e[1] = getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32"), e[2] = getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32"), e[3] = getValue(TRANSFER_BUFFER + 3 * SIZE_OF_INT, "i32");
            }
            function marshalPoint(e, t) {
              setValue(e, t.row, "i32"), setValue(e + SIZE_OF_INT, t.column, "i32");
            }
            function unmarshalPoint(e) {
              return { row: getValue(e, "i32") >>> 0, column: getValue(e + SIZE_OF_INT, "i32") >>> 0 };
            }
            function marshalRange(e, t) {
              marshalPoint(e, t.startPosition), marshalPoint(e += SIZE_OF_POINT, t.endPosition), setValue(e += SIZE_OF_POINT, t.startIndex, "i32"), setValue(e += SIZE_OF_INT, t.endIndex, "i32"), e += SIZE_OF_INT;
            }
            function unmarshalRange(e) {
              const t = {};
              return t.startPosition = unmarshalPoint(e), e += SIZE_OF_POINT, t.endPosition = unmarshalPoint(e), e += SIZE_OF_POINT, t.startIndex = getValue(e, "i32") >>> 0, e += SIZE_OF_INT, t.endIndex = getValue(e, "i32") >>> 0, t;
            }
            function marshalEdit(e) {
              let t = TRANSFER_BUFFER;
              marshalPoint(t, e.startPosition), t += SIZE_OF_POINT, marshalPoint(t, e.oldEndPosition), t += SIZE_OF_POINT, marshalPoint(t, e.newEndPosition), t += SIZE_OF_POINT, setValue(t, e.startIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.oldEndIndex, "i32"), t += SIZE_OF_INT, setValue(t, e.newEndIndex, "i32"), t += SIZE_OF_INT;
            }
            for (const e of Object.getOwnPropertyNames(ParserImpl.prototype)) Object.defineProperty(Parser.prototype, e, { value: ParserImpl.prototype[e], enumerable: false, writable: false });
            Parser.Language = Language, Module.onRuntimeInitialized = () => {
              ParserImpl.init(), resolveInitPromise();
            };
          }));
        }
      }
      return Parser;
    }();
    "object" == typeof exports && (module.exports = TreeSitter);
  }
});

// node_modules/commander/lib/error.js
var require_error = __commonJS({
  "node_modules/commander/lib/error.js"(exports2) {
    var CommanderError = class extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       */
      constructor(exitCode, code, message) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = void 0;
      }
    };
    var InvalidArgumentError = class extends CommanderError {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       */
      constructor(message) {
        super(1, "commander.invalidArgument", message);
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    };
    exports2.CommanderError = CommanderError;
    exports2.InvalidArgumentError = InvalidArgumentError;
  }
});

// node_modules/commander/lib/argument.js
var require_argument = __commonJS({
  "node_modules/commander/lib/argument.js"(exports2) {
    var { InvalidArgumentError } = require_error();
    var Argument = class {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
      constructor(name2, description) {
        this.description = description || "";
        this.variadic = false;
        this.parseArg = void 0;
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.argChoices = void 0;
        switch (name2[0]) {
          case "<":
            this.required = true;
            this._name = name2.slice(1, -1);
            break;
          case "[":
            this.required = false;
            this._name = name2.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name2;
            break;
        }
        if (this._name.length > 3 && this._name.slice(-3) === "...") {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
      /**
       * Return argument name.
       *
       * @return {string}
       */
      name() {
        return this._name;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Make argument required.
       *
       * @returns {Argument}
       */
      argRequired() {
        this.required = true;
        return this;
      }
      /**
       * Make argument optional.
       *
       * @returns {Argument}
       */
      argOptional() {
        this.required = false;
        return this;
      }
    };
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? "..." : "");
      return arg.required ? "<" + nameOutput + ">" : "[" + nameOutput + "]";
    }
    exports2.Argument = Argument;
    exports2.humanReadableArgName = humanReadableArgName;
  }
});

// node_modules/commander/lib/help.js
var require_help = __commonJS({
  "node_modules/commander/lib/help.js"(exports2) {
    var { humanReadableArgName } = require_argument();
    var Help = class {
      constructor() {
        this.helpWidth = void 0;
        this.minWidthToWrap = 40;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
      /**
       * prepareContext is called by Commander after applying overrides from `Command.configureHelp()`
       * and just before calling `formatHelp()`.
       *
       * Commander just uses the helpWidth and the rest is provided for optional use by more complex subclasses.
       *
       * @param {{ error?: boolean, helpWidth?: number, outputHasColors?: boolean }} contextOptions
       */
      prepareContext(contextOptions) {
        this.helpWidth = this.helpWidth ?? contextOptions.helpWidth ?? 80;
      }
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter((cmd2) => !cmd2._hidden);
        const helpCommand = cmd._getHelpCommand();
        if (helpCommand && !helpCommand._hidden) {
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns {number}
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          return option.short ? option.short.replace(/^-/, "") : option.long.replace(/^--/, "");
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        const helpOption = cmd._getHelpOption();
        if (helpOption && !helpOption.hidden) {
          const removeShort = helpOption.short && cmd._findOption(helpOption.short);
          const removeLong = helpOption.long && cmd._findOption(helpOption.long);
          if (!removeShort && !removeLong) {
            visibleOptions.push(helpOption);
          } else if (helpOption.long && !removeLong) {
            visibleOptions.push(
              cmd.createOption(helpOption.long, helpOption.description)
            );
          } else if (helpOption.short && !removeShort) {
            visibleOptions.push(
              cmd.createOption(helpOption.short, helpOption.description)
            );
          }
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter(
            (option) => !option.hidden
          );
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
      visibleArguments(cmd) {
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach((argument) => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || "";
          });
        }
        if (cmd.registeredArguments.find((argument) => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandTerm(cmd) {
        const args2 = cmd.registeredArguments.map((arg) => humanReadableArgName(arg)).join(" ");
        return cmd._name + (cmd._aliases[0] ? "|" + cmd._aliases[0] : "") + (cmd.options.length ? " [options]" : "") + // simplistic check for non-help option
        (args2 ? " " + args2 : "");
      }
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
      optionTerm(option) {
        return option.flags;
      }
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
      argumentTerm(argument) {
        return argument.name();
      }
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleSubcommandTerm(helper.subcommandTerm(command))
            )
          );
        }, 0);
      }
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(
            max,
            this.displayWidth(helper.styleOptionTerm(helper.optionTerm(option)))
          );
        }, 0);
      }
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(
            max,
            this.displayWidth(
              helper.styleArgumentTerm(helper.argumentTerm(argument))
            )
          );
        }, 0);
      }
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandUsage(cmd) {
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + "|" + cmd._aliases[0];
        }
        let ancestorCmdNames = "";
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + " " + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + " " + cmd.usage();
      }
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
      commandDescription(cmd) {
        return cmd.description();
      }
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
      subcommandDescription(cmd) {
        return cmd.summary() || cmd.description();
      }
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
      optionDescription(option) {
        const extraInfo = [];
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (option.defaultValue !== void 0) {
          const showDefault = option.required || option.optional || option.isBoolean() && typeof option.defaultValue === "boolean";
          if (showDefault) {
            extraInfo.push(
              `default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`
            );
          }
        }
        if (option.presetArg !== void 0 && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== void 0) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          const extraDescription = `(${extraInfo.join(", ")})`;
          if (option.description) {
            return `${option.description} ${extraDescription}`;
          }
          return extraDescription;
        }
        return option.description;
      }
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(", ")}`
          );
        }
        if (argument.defaultValue !== void 0) {
          extraInfo.push(
            `default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`
          );
        }
        if (extraInfo.length > 0) {
          const extraDescription = `(${extraInfo.join(", ")})`;
          if (argument.description) {
            return `${argument.description} ${extraDescription}`;
          }
          return extraDescription;
        }
        return argument.description;
      }
      /**
       * Format a list of items, given a heading and an array of formatted items.
       *
       * @param {string} heading
       * @param {string[]} items
       * @param {Help} helper
       * @returns string[]
       */
      formatItemList(heading, items, helper) {
        if (items.length === 0) return [];
        return [helper.styleTitle(heading), ...items, ""];
      }
      /**
       * Group items by their help group heading.
       *
       * @param {Command[] | Option[]} unsortedItems
       * @param {Command[] | Option[]} visibleItems
       * @param {Function} getGroup
       * @returns {Map<string, Command[] | Option[]>}
       */
      groupItems(unsortedItems, visibleItems, getGroup) {
        const result = /* @__PURE__ */ new Map();
        unsortedItems.forEach((item) => {
          const group = getGroup(item);
          if (!result.has(group)) result.set(group, []);
        });
        visibleItems.forEach((item) => {
          const group = getGroup(item);
          if (!result.has(group)) {
            result.set(group, []);
          }
          result.get(group).push(item);
        });
        return result;
      }
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth ?? 80;
        function callFormatItem(term, description) {
          return helper.formatItem(term, termWidth, description, helper);
        }
        let output = [
          `${helper.styleTitle("Usage:")} ${helper.styleUsage(helper.commandUsage(cmd))}`,
          ""
        ];
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([
            helper.boxWrap(
              helper.styleCommandDescription(commandDescription),
              helpWidth
            ),
            ""
          ]);
        }
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return callFormatItem(
            helper.styleArgumentTerm(helper.argumentTerm(argument)),
            helper.styleArgumentDescription(helper.argumentDescription(argument))
          );
        });
        output = output.concat(
          this.formatItemList("Arguments:", argumentList, helper)
        );
        const optionGroups = this.groupItems(
          cmd.options,
          helper.visibleOptions(cmd),
          (option) => option.helpGroupHeading ?? "Options:"
        );
        optionGroups.forEach((options, group) => {
          const optionList = options.map((option) => {
            return callFormatItem(
              helper.styleOptionTerm(helper.optionTerm(option)),
              helper.styleOptionDescription(helper.optionDescription(option))
            );
          });
          output = output.concat(this.formatItemList(group, optionList, helper));
        });
        if (helper.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return callFormatItem(
              helper.styleOptionTerm(helper.optionTerm(option)),
              helper.styleOptionDescription(helper.optionDescription(option))
            );
          });
          output = output.concat(
            this.formatItemList("Global Options:", globalOptionList, helper)
          );
        }
        const commandGroups = this.groupItems(
          cmd.commands,
          helper.visibleCommands(cmd),
          (sub) => sub.helpGroup() || "Commands:"
        );
        commandGroups.forEach((commands, group) => {
          const commandList = commands.map((sub) => {
            return callFormatItem(
              helper.styleSubcommandTerm(helper.subcommandTerm(sub)),
              helper.styleSubcommandDescription(helper.subcommandDescription(sub))
            );
          });
          output = output.concat(this.formatItemList(group, commandList, helper));
        });
        return output.join("\n");
      }
      /**
       * Return display width of string, ignoring ANSI escape sequences. Used in padding and wrapping calculations.
       *
       * @param {string} str
       * @returns {number}
       */
      displayWidth(str) {
        return stripColor(str).length;
      }
      /**
       * Style the title for displaying in the help. Called with 'Usage:', 'Options:', etc.
       *
       * @param {string} str
       * @returns {string}
       */
      styleTitle(str) {
        return str;
      }
      styleUsage(str) {
        return str.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word === "[command]") return this.styleSubcommandText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleCommandText(word);
        }).join(" ");
      }
      styleCommandDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleOptionDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleSubcommandDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleArgumentDescription(str) {
        return this.styleDescriptionText(str);
      }
      styleDescriptionText(str) {
        return str;
      }
      styleOptionTerm(str) {
        return this.styleOptionText(str);
      }
      styleSubcommandTerm(str) {
        return str.split(" ").map((word) => {
          if (word === "[options]") return this.styleOptionText(word);
          if (word[0] === "[" || word[0] === "<")
            return this.styleArgumentText(word);
          return this.styleSubcommandText(word);
        }).join(" ");
      }
      styleArgumentTerm(str) {
        return this.styleArgumentText(str);
      }
      styleOptionText(str) {
        return str;
      }
      styleArgumentText(str) {
        return str;
      }
      styleSubcommandText(str) {
        return str;
      }
      styleCommandText(str) {
        return str;
      }
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
      /**
       * Detect manually wrapped and indented strings by checking for line break followed by whitespace.
       *
       * @param {string} str
       * @returns {boolean}
       */
      preformatted(str) {
        return /\n[^\S\r\n]/.test(str);
      }
      /**
       * Format the "item", which consists of a term and description. Pad the term and wrap the description, indenting the following lines.
       *
       * So "TTT", 5, "DDD DDDD DD DDD" might be formatted for this.helpWidth=17 like so:
       *   TTT  DDD DDDD
       *        DD DDD
       *
       * @param {string} term
       * @param {number} termWidth
       * @param {string} description
       * @param {Help} helper
       * @returns {string}
       */
      formatItem(term, termWidth, description, helper) {
        const itemIndent = 2;
        const itemIndentStr = " ".repeat(itemIndent);
        if (!description) return itemIndentStr + term;
        const paddedTerm = term.padEnd(
          termWidth + term.length - helper.displayWidth(term)
        );
        const spacerWidth = 2;
        const helpWidth = this.helpWidth ?? 80;
        const remainingWidth = helpWidth - termWidth - spacerWidth - itemIndent;
        let formattedDescription;
        if (remainingWidth < this.minWidthToWrap || helper.preformatted(description)) {
          formattedDescription = description;
        } else {
          const wrappedDescription = helper.boxWrap(description, remainingWidth);
          formattedDescription = wrappedDescription.replace(
            /\n/g,
            "\n" + " ".repeat(termWidth + spacerWidth)
          );
        }
        return itemIndentStr + paddedTerm + " ".repeat(spacerWidth) + formattedDescription.replace(/\n/g, `
${itemIndentStr}`);
      }
      /**
       * Wrap a string at whitespace, preserving existing line breaks.
       * Wrapping is skipped if the width is less than `minWidthToWrap`.
       *
       * @param {string} str
       * @param {number} width
       * @returns {string}
       */
      boxWrap(str, width) {
        if (width < this.minWidthToWrap) return str;
        const rawLines = str.split(/\r\n|\n/);
        const chunkPattern = /[\s]*[^\s]+/g;
        const wrappedLines = [];
        rawLines.forEach((line) => {
          const chunks = line.match(chunkPattern);
          if (chunks === null) {
            wrappedLines.push("");
            return;
          }
          let sumChunks = [chunks.shift()];
          let sumWidth = this.displayWidth(sumChunks[0]);
          chunks.forEach((chunk) => {
            const visibleWidth = this.displayWidth(chunk);
            if (sumWidth + visibleWidth <= width) {
              sumChunks.push(chunk);
              sumWidth += visibleWidth;
              return;
            }
            wrappedLines.push(sumChunks.join(""));
            const nextChunk = chunk.trimStart();
            sumChunks = [nextChunk];
            sumWidth = this.displayWidth(nextChunk);
          });
          wrappedLines.push(sumChunks.join(""));
        });
        return wrappedLines.join("\n");
      }
    };
    function stripColor(str) {
      const sgrPattern = /\x1b\[\d*(;\d*)*m/g;
      return str.replace(sgrPattern, "");
    }
    exports2.Help = Help;
    exports2.stripColor = stripColor;
  }
});

// node_modules/commander/lib/option.js
var require_option = __commonJS({
  "node_modules/commander/lib/option.js"(exports2) {
    var { InvalidArgumentError } = require_error();
    var Option = class {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
      constructor(flags2, description) {
        this.flags = flags2;
        this.description = description || "";
        this.required = flags2.includes("<");
        this.optional = flags2.includes("[");
        this.variadic = /\w\.\.\.[>\]]$/.test(flags2);
        this.mandatory = false;
        const optionFlags = splitOptionFlags(flags2);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith("--no-");
        }
        this.defaultValue = void 0;
        this.defaultValueDescription = void 0;
        this.presetArg = void 0;
        this.envVar = void 0;
        this.parseArg = void 0;
        this.hidden = false;
        this.argChoices = void 0;
        this.conflictsWith = [];
        this.implied = void 0;
        this.helpGroupHeading = void 0;
      }
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {(string | string[])} names
       * @return {Option}
       */
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === "string") {
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
      env(name2) {
        this.envVar = name2;
        return this;
      }
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
      /**
       * @package
       */
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
        return previous.concat(value);
      }
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError(
              `Allowed choices are ${this.argChoices.join(", ")}.`
            );
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
      /**
       * Return option name.
       *
       * @return {string}
       */
      name() {
        if (this.long) {
          return this.long.replace(/^--/, "");
        }
        return this.short.replace(/^-/, "");
      }
      /**
       * Return option name, in a camelcase format that can be used
       * as an object attribute key.
       *
       * @return {string}
       */
      attributeName() {
        if (this.negate) {
          return camelcase(this.name().replace(/^no-/, ""));
        }
        return camelcase(this.name());
      }
      /**
       * Set the help group heading.
       *
       * @param {string} heading
       * @return {Option}
       */
      helpGroup(heading) {
        this.helpGroupHeading = heading;
        return this;
      }
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @package
       */
      is(arg) {
        return this.short === arg || this.long === arg;
      }
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @package
       */
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    };
    var DualOptions = class {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = /* @__PURE__ */ new Map();
        this.negativeOptions = /* @__PURE__ */ new Map();
        this.dualOptions = /* @__PURE__ */ new Set();
        options.forEach((option) => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = preset !== void 0 ? preset : false;
        return option.negate === (negativeValue === value);
      }
    };
    function camelcase(str) {
      return str.split("-").reduce((str2, word) => {
        return str2 + word[0].toUpperCase() + word.slice(1);
      });
    }
    function splitOptionFlags(flags2) {
      let shortFlag;
      let longFlag;
      const shortFlagExp = /^-[^-]$/;
      const longFlagExp = /^--[^-]/;
      const flagParts = flags2.split(/[ |,]+/).concat("guard");
      if (shortFlagExp.test(flagParts[0])) shortFlag = flagParts.shift();
      if (longFlagExp.test(flagParts[0])) longFlag = flagParts.shift();
      if (!shortFlag && shortFlagExp.test(flagParts[0]))
        shortFlag = flagParts.shift();
      if (!shortFlag && longFlagExp.test(flagParts[0])) {
        shortFlag = longFlag;
        longFlag = flagParts.shift();
      }
      if (flagParts[0].startsWith("-")) {
        const unsupportedFlag = flagParts[0];
        const baseError = `option creation failed due to '${unsupportedFlag}' in option flags '${flags2}'`;
        if (/^-[^-][^-]/.test(unsupportedFlag))
          throw new Error(
            `${baseError}
- a short flag is a single dash and a single character
  - either use a single dash and a single character (for a short flag)
  - or use a double dash for a long option (and can have two, like '--ws, --workspace')`
          );
        if (shortFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many short flags`);
        if (longFlagExp.test(unsupportedFlag))
          throw new Error(`${baseError}
- too many long flags`);
        throw new Error(`${baseError}
- unrecognised flag format`);
      }
      if (shortFlag === void 0 && longFlag === void 0)
        throw new Error(
          `option creation failed due to no flags found in '${flags2}'.`
        );
      return { shortFlag, longFlag };
    }
    exports2.Option = Option;
    exports2.DualOptions = DualOptions;
  }
});

// node_modules/commander/lib/suggestSimilar.js
var require_suggestSimilar = __commonJS({
  "node_modules/commander/lib/suggestSimilar.js"(exports2) {
    var maxDistance = 3;
    function editDistance(a, b) {
      if (Math.abs(a.length - b.length) > maxDistance)
        return Math.max(a.length, b.length);
      const d = [];
      for (let i2 = 0; i2 <= a.length; i2++) {
        d[i2] = [i2];
      }
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
      for (let j = 1; j <= b.length; j++) {
        for (let i2 = 1; i2 <= a.length; i2++) {
          let cost = 1;
          if (a[i2 - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i2][j] = Math.min(
            d[i2 - 1][j] + 1,
            // deletion
            d[i2][j - 1] + 1,
            // insertion
            d[i2 - 1][j - 1] + cost
            // substitution
          );
          if (i2 > 1 && j > 1 && a[i2 - 1] === b[j - 2] && a[i2 - 2] === b[j - 1]) {
            d[i2][j] = Math.min(d[i2][j], d[i2 - 2][j - 2] + 1);
          }
        }
      }
      return d[a.length][b.length];
    }
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return "";
      candidates = Array.from(new Set(candidates));
      const searchingOptions = word.startsWith("--");
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map((candidate) => candidate.slice(2));
      }
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return;
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map((candidate) => `--${candidate}`);
      }
      if (similar.length > 1) {
        return `
(Did you mean one of ${similar.join(", ")}?)`;
      }
      if (similar.length === 1) {
        return `
(Did you mean ${similar[0]}?)`;
      }
      return "";
    }
    exports2.suggestSimilar = suggestSimilar;
  }
});

// node_modules/commander/lib/command.js
var require_command = __commonJS({
  "node_modules/commander/lib/command.js"(exports2) {
    var EventEmitter = require("node:events").EventEmitter;
    var childProcess = require("node:child_process");
    var path5 = require("node:path");
    var fs3 = require("node:fs");
    var process2 = require("node:process");
    var { Argument, humanReadableArgName } = require_argument();
    var { CommanderError } = require_error();
    var { Help, stripColor } = require_help();
    var { Option, DualOptions } = require_option();
    var { suggestSimilar } = require_suggestSimilar();
    var Command = class _Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
      constructor(name2) {
        super();
        this.commands = [];
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = false;
        this.registeredArguments = [];
        this._args = this.registeredArguments;
        this.args = [];
        this.rawArgs = [];
        this.processedArgs = [];
        this._scriptPath = null;
        this._name = name2 || "";
        this._optionValues = {};
        this._optionValueSources = {};
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null;
        this._executableDir = null;
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = "";
        this._summary = "";
        this._argsDescription = void 0;
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {};
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
        this._savedState = null;
        this._outputConfiguration = {
          writeOut: (str) => process2.stdout.write(str),
          writeErr: (str) => process2.stderr.write(str),
          outputError: (str, write) => write(str),
          getOutHelpWidth: () => process2.stdout.isTTY ? process2.stdout.columns : void 0,
          getErrHelpWidth: () => process2.stderr.isTTY ? process2.stderr.columns : void 0,
          getOutHasColors: () => useColor() ?? (process2.stdout.isTTY && process2.stdout.hasColors?.()),
          getErrHasColors: () => useColor() ?? (process2.stderr.isTTY && process2.stderr.hasColors?.()),
          stripColor: (str) => stripColor(str)
        };
        this._hidden = false;
        this._helpOption = void 0;
        this._addImplicitHelpCommand = void 0;
        this._helpCommand = void 0;
        this._helpConfiguration = {};
        this._helpGroupHeading = void 0;
        this._defaultCommandGroup = void 0;
        this._defaultOptionGroup = void 0;
      }
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._helpOption = sourceCommand._helpOption;
        this._helpCommand = sourceCommand._helpCommand;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
        return this;
      }
      /**
       * @returns {Command[]}
       * @private
       */
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {(object | string)} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === "object" && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name2, args2] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const cmd = this.createCommand(name2);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden);
        cmd._executableFile = opts.executableFile || null;
        if (args2) cmd.arguments(args2);
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
        if (desc) return this;
        return cmd;
      }
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
      createCommand(name2) {
        return new _Command(name2);
      }
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
      createHelp() {
        return Object.assign(new Help(), this.configureHelp());
      }
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureHelp(configuration) {
        if (configuration === void 0) return this._helpConfiguration;
        this._helpConfiguration = configuration;
        return this;
      }
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // change how output being written, defaults to stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // change how output being written for errors, defaults to writeErr
       *     outputError(str, write) // used for displaying errors and not used for displaying help
       *     // specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // color support, currently only used with Help
       *     getOutHasColors()
       *     getErrHasColors()
       *     stripColor() // used to remove ANSI escape codes if output does not have colors
       *
       * @param {object} [configuration] - configuration options
       * @return {(Command | object)} `this` command for chaining, or stored configuration
       */
      configureOutput(configuration) {
        if (configuration === void 0) return this._outputConfiguration;
        this._outputConfiguration = Object.assign(
          {},
          this._outputConfiguration,
          configuration
        );
        return this;
      }
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {(boolean|string)} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== "string") displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
- specify the name in Command constructor or using .name()`);
        }
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true;
        this._registerCommand(cmd);
        cmd.parent = this;
        cmd._checkForBrokenPassThrough();
        return this;
      }
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
      createArgument(name2, description) {
        return new Argument(name2, description);
      }
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom argument processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name2, description, parseArg, defaultValue) {
        const argument = this.createArgument(name2, description);
        if (typeof parseArg === "function") {
          argument.default(defaultValue).argParser(parseArg);
        } else {
          argument.default(parseArg);
        }
        this.addArgument(argument);
        return this;
      }
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(
            `only the last argument can be variadic '${previousArgument.name()}'`
          );
        }
        if (argument.required && argument.defaultValue !== void 0 && argument.parseArg === void 0) {
          throw new Error(
            `a default value for a required argument is never used: '${argument.name()}'`
          );
        }
        this.registeredArguments.push(argument);
        return this;
      }
      /**
       * Customise or override default help command. By default a help command is automatically added if your command has subcommands.
       *
       * @example
       *    program.helpCommand('help [cmd]');
       *    program.helpCommand('help [cmd]', 'show help');
       *    program.helpCommand(false); // suppress default help command
       *    program.helpCommand(true); // add help command even if no subcommands
       *
       * @param {string|boolean} enableOrNameAndArgs - enable with custom name and/or arguments, or boolean to override whether added
       * @param {string} [description] - custom description
       * @return {Command} `this` command for chaining
       */
      helpCommand(enableOrNameAndArgs, description) {
        if (typeof enableOrNameAndArgs === "boolean") {
          this._addImplicitHelpCommand = enableOrNameAndArgs;
          if (enableOrNameAndArgs && this._defaultCommandGroup) {
            this._initCommandGroup(this._getHelpCommand());
          }
          return this;
        }
        const nameAndArgs = enableOrNameAndArgs ?? "help [command]";
        const [, helpName, helpArgs] = nameAndArgs.match(/([^ ]+) *(.*)/);
        const helpDescription = description ?? "display help for command";
        const helpCommand = this.createCommand(helpName);
        helpCommand.helpOption(false);
        if (helpArgs) helpCommand.arguments(helpArgs);
        if (helpDescription) helpCommand.description(helpDescription);
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        if (enableOrNameAndArgs || description) this._initCommandGroup(helpCommand);
        return this;
      }
      /**
       * Add prepared custom help command.
       *
       * @param {(Command|string|boolean)} helpCommand - custom help command, or deprecated enableOrNameAndArgs as for `.helpCommand()`
       * @param {string} [deprecatedDescription] - deprecated custom description used with custom name only
       * @return {Command} `this` command for chaining
       */
      addHelpCommand(helpCommand, deprecatedDescription) {
        if (typeof helpCommand !== "object") {
          this.helpCommand(helpCommand, deprecatedDescription);
          return this;
        }
        this._addImplicitHelpCommand = true;
        this._helpCommand = helpCommand;
        this._initCommandGroup(helpCommand);
        return this;
      }
      /**
       * Lazy create help command.
       *
       * @return {(Command|null)}
       * @package
       */
      _getHelpCommand() {
        const hasImplicitHelpCommand = this._addImplicitHelpCommand ?? (this.commands.length && !this._actionHandler && !this._findCommand("help"));
        if (hasImplicitHelpCommand) {
          if (this._helpCommand === void 0) {
            this.helpCommand(void 0, void 0);
          }
          return this._helpCommand;
        }
        return null;
      }
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
      hook(event, listener) {
        const allowedValues = ["preSubcommand", "preAction", "postAction"];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err2) => {
            if (err2.code !== "commander.executeSubCommandAsync") {
              throw err2;
            } else {
            }
          };
        }
        return this;
      }
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @private
       */
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError(exitCode, code, message));
        }
        process2.exit(exitCode);
      }
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
      action(fn) {
        const listener = (args2) => {
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args2.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this;
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
      createOption(flags2, description) {
        return new Option(flags2, description);
      }
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {(Option | Argument)} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @private
       */
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err2) {
          if (err2.code === "commander.invalidArgument") {
            const message = `${invalidArgumentMessage} ${err2.message}`;
            this.error(message, { exitCode: err2.exitCode, code: err2.code });
          }
          throw err2;
        }
      }
      /**
       * Check for option flag conflicts.
       * Register option if no conflicts found, or throw on conflict.
       *
       * @param {Option} option
       * @private
       */
      _registerOption(option) {
        const matchingOption = option.short && this._findOption(option.short) || option.long && this._findOption(option.long);
        if (matchingOption) {
          const matchingFlag = option.long && this._findOption(option.long) ? option.long : option.short;
          throw new Error(`Cannot add option '${option.flags}'${this._name && ` to command '${this._name}'`} due to conflicting flag '${matchingFlag}'
-  already used by option '${matchingOption.flags}'`);
        }
        this._initOptionGroup(option);
        this.options.push(option);
      }
      /**
       * Check for command name and alias conflicts with existing commands.
       * Register command if no conflicts found, or throw on conflict.
       *
       * @param {Command} command
       * @private
       */
      _registerCommand(command) {
        const knownBy = (cmd) => {
          return [cmd.name()].concat(cmd.aliases());
        };
        const alreadyUsed = knownBy(command).find(
          (name2) => this._findCommand(name2)
        );
        if (alreadyUsed) {
          const existingCmd = knownBy(this._findCommand(alreadyUsed)).join("|");
          const newCmd = knownBy(command).join("|");
          throw new Error(
            `cannot add command '${newCmd}' as already have command '${existingCmd}'`
          );
        }
        this._initCommandGroup(command);
        this.commands.push(command);
      }
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        this._registerOption(option);
        const oname = option.name();
        const name2 = option.attributeName();
        if (option.negate) {
          const positiveLongFlag = option.long.replace(/^--no-/, "--");
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(
              name2,
              option.defaultValue === void 0 ? true : option.defaultValue,
              "default"
            );
          }
        } else if (option.defaultValue !== void 0) {
          this.setOptionValueWithSource(name2, option.defaultValue, "default");
        }
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          if (val == null && option.presetArg !== void 0) {
            val = option.presetArg;
          }
          const oldValue = this.getOptionValue(name2);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = "";
            }
          }
          this.setOptionValueWithSource(name2, val, valueSource);
        };
        this.on("option:" + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, "cli");
        });
        if (option.envVar) {
          this.on("optionEnv:" + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, "env");
          });
        }
        return this;
      }
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @return {Command} `this` command for chaining
       * @private
       */
      _optionEx(config, flags2, description, fn, defaultValue) {
        if (typeof flags2 === "object" && flags2 instanceof Option) {
          throw new Error(
            "To add an Option object use addOption() instead of option() or requiredOption()"
          );
        }
        const option = this.createOption(flags2, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === "function") {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
        return this.addOption(option);
      }
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('--pt, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      option(flags2, description, parseArg, defaultValue) {
        return this._optionEx({}, flags2, description, parseArg, defaultValue);
      }
      /**
       * Add a required option which must have a value after parsing. This usually means
       * the option must be specified on the command line. (Otherwise the same as .option().)
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {(Function|*)} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      requiredOption(flags2, description, parseArg, defaultValue) {
        return this._optionEx(
          { mandatory: true },
          flags2,
          description,
          parseArg,
          defaultValue
        );
      }
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {boolean} [combine] - if `true` or omitted, an optional value can be specified directly after the flag.
       * @return {Command} `this` command for chaining
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
      /**
       * Allow unknown options on the command line.
       *
       * @param {boolean} [allowUnknown] - if `true` or omitted, no error will be thrown for unknown options.
       * @return {Command} `this` command for chaining
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {boolean} [allowExcess] - if `true` or omitted, no error will be thrown for excess arguments.
       * @return {Command} `this` command for chaining
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {boolean} [positional]
       * @return {Command} `this` command for chaining
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {boolean} [passThrough] for unknown options.
       * @return {Command} `this` command for chaining
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        this._checkForBrokenPassThrough();
        return this;
      }
      /**
       * @private
       */
      _checkForBrokenPassThrough() {
        if (this.parent && this._passThroughOptions && !this.parent._enablePositionalOptions) {
          throw new Error(
            `passThroughOptions cannot be used for '${this._name}' without turning on enablePositionalOptions for parent command(s)`
          );
        }
      }
      /**
       * Whether to store option values as properties on command object,
       * or store separately (specify false). In both cases the option values can be accessed using .opts().
       *
       * @param {boolean} [storeAsProperties=true]
       * @return {Command} `this` command for chaining
       */
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error("call .storeOptionsAsProperties() before adding options");
        }
        if (Object.keys(this._optionValues).length) {
          throw new Error(
            "call .storeOptionsAsProperties() before setting option values"
          );
        }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {object} value
       */
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {object} value
       * @return {Command} `this` command for chaining
       */
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, void 0);
      }
      /**
       * Store option value and where the value came from.
       *
       * @param {string} key
       * @param {object} value
       * @param {string} source - expected values are default/config/env/cli/implied
       * @return {Command} `this` command for chaining
       */
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
      /**
       * Get source of option value.
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
      /**
       * Get source of option value. See also .optsWithGlobals().
       * Expected values are default | config | env | cli | implied
       *
       * @param {string} key
       * @return {string}
       */
      getOptionValueSourceWithGlobals(key) {
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== void 0) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @private
       */
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== void 0 && !Array.isArray(argv)) {
          throw new Error("first parameter to parse must be array or undefined");
        }
        parseOptions = parseOptions || {};
        if (argv === void 0 && parseOptions.from === void 0) {
          if (process2.versions?.electron) {
            parseOptions.from = "electron";
          }
          const execArgv = process2.execArgv ?? [];
          if (execArgv.includes("-e") || execArgv.includes("--eval") || execArgv.includes("-p") || execArgv.includes("--print")) {
            parseOptions.from = "eval";
          }
        }
        if (argv === void 0) {
          argv = process2.argv;
        }
        this.rawArgs = argv.slice();
        let userArgs;
        switch (parseOptions.from) {
          case void 0:
          case "node":
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case "electron":
            if (process2.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case "user":
            userArgs = argv.slice(0);
            break;
          case "eval":
            userArgs = argv.slice(1);
            break;
          default:
            throw new Error(
              `unexpected parse option { from: '${parseOptions.from}' }`
            );
        }
        if (!this._name && this._scriptPath)
          this.nameFromFilename(this._scriptPath);
        this._name = this._name || "program";
        return userArgs;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * program.parse(); // parse process.argv and auto-detect electron and special node flags
       * program.parse(process.argv); // assume argv[0] is app and argv[1] is script
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
      parse(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
        return this;
      }
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Call with no parameters to parse `process.argv`. Detects Electron and special node options like `node --eval`. Easy mode!
       *
       * Or call with an array of strings to parse, and optionally where the user arguments start by specifying where the arguments are `from`:
       * - `'node'`: default, `argv[0]` is the application and `argv[1]` is the script being run, with user arguments after that
       * - `'electron'`: `argv[0]` is the application and `argv[1]` varies depending on whether the electron application is packaged
       * - `'user'`: just user arguments
       *
       * @example
       * await program.parseAsync(); // parse process.argv and auto-detect electron and special node flags
       * await program.parseAsync(process.argv); // assume argv[0] is app and argv[1] is script
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
      async parseAsync(argv, parseOptions) {
        this._prepareForParse();
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
        return this;
      }
      _prepareForParse() {
        if (this._savedState === null) {
          this.saveStateBeforeParse();
        } else {
          this.restoreStateBeforeParse();
        }
      }
      /**
       * Called the first time parse is called to save state and allow a restore before subsequent calls to parse.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state saved.
       */
      saveStateBeforeParse() {
        this._savedState = {
          // name is stable if supplied by author, but may be unspecified for root command and deduced during parsing
          _name: this._name,
          // option values before parse have default values (including false for negated options)
          // shallow clones
          _optionValues: { ...this._optionValues },
          _optionValueSources: { ...this._optionValueSources }
        };
      }
      /**
       * Restore state before parse for calls after the first.
       * Not usually called directly, but available for subclasses to save their custom state.
       *
       * This is called in a lazy way. Only commands used in parsing chain will have state restored.
       */
      restoreStateBeforeParse() {
        if (this._storeOptionsAsProperties)
          throw new Error(`Can not call parse again when storeOptionsAsProperties is true.
- either make a new Command for each call to parse, or stop storing options as properties`);
        this._name = this._savedState._name;
        this._scriptPath = null;
        this.rawArgs = [];
        this._optionValues = { ...this._savedState._optionValues };
        this._optionValueSources = { ...this._savedState._optionValueSources };
        this.args = [];
        this.processedArgs = [];
      }
      /**
       * Throw if expected executable is missing. Add lots of help for author.
       *
       * @param {string} executableFile
       * @param {string} executableDir
       * @param {string} subcommandName
       */
      _checkForMissingExecutable(executableFile, executableDir, subcommandName) {
        if (fs3.existsSync(executableFile)) return;
        const executableDirMessage = executableDir ? `searched for local subcommand relative to directory '${executableDir}'` : "no directory for search for local subcommand, use .executableDir() to supply a custom directory";
        const executableMissing = `'${executableFile}' does not exist
 - if '${subcommandName}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
 - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
 - ${executableDirMessage}`;
        throw new Error(executableMissing);
      }
      /**
       * Execute a sub-command executable.
       *
       * @private
       */
      _executeSubCommand(subcommand, args2) {
        args2 = args2.slice();
        let launchWithNode = false;
        const sourceExt = [".js", ".ts", ".tsx", ".mjs", ".cjs"];
        function findFile(baseDir, baseName) {
          const localBin = path5.resolve(baseDir, baseName);
          if (fs3.existsSync(localBin)) return localBin;
          if (sourceExt.includes(path5.extname(baseName))) return void 0;
          const foundExt = sourceExt.find(
            (ext) => fs3.existsSync(`${localBin}${ext}`)
          );
          if (foundExt) return `${localBin}${foundExt}`;
          return void 0;
        }
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || "";
        if (this._scriptPath) {
          let resolvedScriptPath;
          try {
            resolvedScriptPath = fs3.realpathSync(this._scriptPath);
          } catch {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path5.resolve(
            path5.dirname(resolvedScriptPath),
            executableDir
          );
        }
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path5.basename(
              this._scriptPath,
              path5.extname(this._scriptPath)
            );
            if (legacyName !== this._name) {
              localFile = findFile(
                executableDir,
                `${legacyName}-${subcommand._name}`
              );
            }
          }
          executableFile = localFile || executableFile;
        }
        launchWithNode = sourceExt.includes(path5.extname(executableFile));
        let proc;
        if (process2.platform !== "win32") {
          if (launchWithNode) {
            args2.unshift(executableFile);
            args2 = incrementNodeInspectorPort(process2.execArgv).concat(args2);
            proc = childProcess.spawn(process2.argv[0], args2, { stdio: "inherit" });
          } else {
            proc = childProcess.spawn(executableFile, args2, { stdio: "inherit" });
          }
        } else {
          this._checkForMissingExecutable(
            executableFile,
            executableDir,
            subcommand._name
          );
          args2.unshift(executableFile);
          args2 = incrementNodeInspectorPort(process2.execArgv).concat(args2);
          proc = childProcess.spawn(process2.execPath, args2, { stdio: "inherit" });
        }
        if (!proc.killed) {
          const signals = ["SIGUSR1", "SIGUSR2", "SIGTERM", "SIGINT", "SIGHUP"];
          signals.forEach((signal) => {
            process2.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
        const exitCallback = this._exitCallback;
        proc.on("close", (code) => {
          code = code ?? 1;
          if (!exitCallback) {
            process2.exit(code);
          } else {
            exitCallback(
              new CommanderError(
                code,
                "commander.executeSubCommandAsync",
                "(close)"
              )
            );
          }
        });
        proc.on("error", (err2) => {
          if (err2.code === "ENOENT") {
            this._checkForMissingExecutable(
              executableFile,
              executableDir,
              subcommand._name
            );
          } else if (err2.code === "EACCES") {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process2.exit(1);
          } else {
            const wrappedError = new CommanderError(
              1,
              "commander.executeSubCommandAsync",
              "(error)"
            );
            wrappedError.nestedError = err2;
            exitCallback(wrappedError);
          }
        });
        this.runningCommand = proc;
      }
      /**
       * @private
       */
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
        subCommand._prepareForParse();
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(
          promiseChain,
          subCommand,
          "preSubcommand"
        );
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @private
       */
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
        return this._dispatchSubcommand(
          subcommandName,
          [],
          [this._getHelpOption()?.long ?? this._getHelpOption()?.short ?? "--help"]
        );
      }
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @private
       */
      _checkNumberOfArguments() {
        this.registeredArguments.forEach((arg, i2) => {
          if (arg.required && this.args[i2] == null) {
            this.missingArgument(arg.name());
          }
        });
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @private
       */
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(
              argument,
              value,
              previous,
              invalidValueMessage
            );
          }
          return parsedValue;
        };
        this._checkNumberOfArguments();
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index2) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            if (index2 < this.args.length) {
              value = this.args.slice(index2);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === void 0) {
              value = [];
            }
          } else if (index2 < this.args.length) {
            value = this.args[index2];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index2] = value;
        });
        this.processedArgs = processedArgs;
      }
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {(Promise|undefined)} promise
       * @param {Function} fn
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCall(promise, fn) {
        if (promise && promise.then && typeof promise.then === "function") {
          return promise.then(() => fn());
        }
        return fn();
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors().reverse().filter((cmd) => cmd._lifeCycleHooks[event] !== void 0).forEach((hookedCommand) => {
          hookedCommand._lifeCycleHooks[event].forEach((callback) => {
            hooks.push({ hookedCommand, callback });
          });
        });
        if (event === "postAction") {
          hooks.reverse();
        }
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
      /**
       *
       * @param {(Promise|undefined)} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {(Promise|undefined)}
       * @private
       */
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== void 0) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @private
       */
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv();
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._getHelpCommand() && operands[0] === this._getHelpCommand().name()) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          this._outputHelpIfRequested(unknown);
          return this._dispatchSubcommand(
            this._defaultCommandName,
            operands,
            unknown
          );
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          this.help({ error: true });
        }
        this._outputHelpIfRequested(parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, "preAction");
          promiseChain = this._chainOrCall(
            promiseChain,
            () => this._actionHandler(this.processedArgs)
          );
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown);
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, "postAction");
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown);
        } else if (operands.length) {
          if (this._findCommand("*")) {
            return this._dispatchSubcommand("*", operands, unknown);
          }
          if (this.listenerCount("command:*")) {
            this.emit("command:*", operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
        }
      }
      /**
       * Find matching command.
       *
       * @private
       * @return {Command | undefined}
       */
      _findCommand(name2) {
        if (!name2) return void 0;
        return this.commands.find(
          (cmd) => cmd._name === name2 || cmd._aliases.includes(name2)
        );
      }
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @package
       */
      _findOption(arg) {
        return this.options.find((option) => option.is(arg));
      }
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForMissingMandatoryOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && cmd.getOptionValue(anOption.attributeName()) === void 0) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter((option) => {
          const optionKey = option.attributeName();
          if (this.getOptionValue(optionKey) === void 0) {
            return false;
          }
          return this.getOptionValueSource(optionKey) !== "default";
        });
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find(
            (defined) => option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @private
       */
      _checkForConflictingOptions() {
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Side effects: modifies command by storing options. Does not reset state if called again.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {string[]} argv
       * @return {{operands: string[], unknown: string[]}}
       */
      parseOptions(argv) {
        const operands = [];
        const unknown = [];
        let dest = operands;
        const args2 = argv.slice();
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === "-";
        }
        const negativeNumberArg = (arg) => {
          if (!/^-\d*\.?\d+(e[+-]?\d+)?$/.test(arg)) return false;
          return !this._getCommandAndAncestors().some(
            (cmd) => cmd.options.map((opt) => opt.short).some((short) => /^-\d$/.test(short))
          );
        };
        let activeVariadicOption = null;
        while (args2.length) {
          const arg = args2.shift();
          if (arg === "--") {
            if (dest === unknown) dest.push(arg);
            dest.push(...args2);
            break;
          }
          if (activeVariadicOption && (!maybeOption(arg) || negativeNumberArg(arg))) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            if (option) {
              if (option.required) {
                const value = args2.shift();
                if (value === void 0) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                if (args2.length > 0 && (!maybeOption(args2[0]) || negativeNumberArg(args2[0]))) {
                  value = args2.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else {
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
          if (arg.length > 2 && arg[0] === "-" && arg[1] !== "-") {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || option.optional && this._combineFlagAndOptionalValue) {
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                this.emit(`option:${option.name()}`);
                args2.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
          if (/^--[^=]+=/.test(arg)) {
            const index2 = arg.indexOf("=");
            const option = this._findOption(arg.slice(0, index2));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index2 + 1));
              continue;
            }
          }
          if (dest === operands && maybeOption(arg) && !(this.commands.length === 0 && negativeNumberArg(arg))) {
            dest = unknown;
          }
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args2.length > 0) unknown.push(...args2);
              break;
            } else if (this._getHelpCommand() && arg === this._getHelpCommand().name()) {
              operands.push(arg);
              if (args2.length > 0) operands.push(...args2);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args2.length > 0) unknown.push(...args2);
              break;
            }
          }
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args2.length > 0) dest.push(...args2);
            break;
          }
          dest.push(arg);
        }
        return { operands, unknown };
      }
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          const result = {};
          const len = this.options.length;
          for (let i2 = 0; i2 < len; i2++) {
            const key = this.options[i2].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
        return this._optionValues;
      }
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {object}
       */
      optsWithGlobals() {
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        this._outputConfiguration.outputError(
          `${message}
`,
          this._outputConfiguration.writeErr
        );
        if (typeof this._showHelpAfterError === "string") {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}
`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr("\n");
          this.outputHelp({ error: true });
        }
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || "commander.error";
        this._exit(exitCode, code, message);
      }
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process2.env) {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === void 0 || ["default", "config", "env"].includes(
              this.getOptionValueSource(optionKey)
            )) {
              if (option.required || option.optional) {
                this.emit(`optionEnv:${option.name()}`, process2.env[option.envVar]);
              } else {
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== void 0 && !["default", "implied"].includes(this.getOptionValueSource(optionKey));
        };
        this.options.filter(
          (option) => option.implied !== void 0 && hasCustomOptionValue(option.attributeName()) && dualHelper.valueFromOption(
            this.getOptionValue(option.attributeName()),
            option
          )
        ).forEach((option) => {
          Object.keys(option.implied).filter((impliedKey) => !hasCustomOptionValue(impliedKey)).forEach((impliedKey) => {
            this.setOptionValueWithSource(
              impliedKey,
              option.implied[impliedKey],
              "implied"
            );
          });
        });
      }
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @private
       */
      missingArgument(name2) {
        const message = `error: missing required argument '${name2}'`;
        this.error(message, { code: "commander.missingArgument" });
      }
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @private
       */
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: "commander.optionMissingArgument" });
      }
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @private
       */
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: "commander.missingMandatoryOptionValue" });
      }
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @private
       */
      _conflictingOption(option, conflictingOption) {
        const findBestOptionFromValue = (option2) => {
          const optionKey = option2.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(
            (target) => target.negate && optionKey === target.attributeName()
          );
          const positiveOption = this.options.find(
            (target) => !target.negate && optionKey === target.attributeName()
          );
          if (negativeOption && (negativeOption.presetArg === void 0 && optionValue === false || negativeOption.presetArg !== void 0 && optionValue === negativeOption.presetArg)) {
            return negativeOption;
          }
          return positiveOption || option2;
        };
        const getErrorMessage = (option2) => {
          const bestOption = findBestOptionFromValue(option2);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === "env") {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: "commander.conflictingOption" });
      }
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @private
       */
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = "";
        if (flag.startsWith("--") && this._showSuggestionAfterError) {
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command).filter((option) => option.long).map((option) => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: "commander.unknownOption" });
      }
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @private
       */
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
        const expected = this.registeredArguments.length;
        const s = expected === 1 ? "" : "s";
        const forSubcommand = this.parent ? ` for '${this.name()}'` : "";
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: "commander.excessArguments" });
      }
      /**
       * Unknown command.
       *
       * @private
       */
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = "";
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: "commander.unknownCommand" });
      }
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {(this | string | undefined)} `this` command for chaining, or version string if no arguments
       */
      version(str, flags2, description) {
        if (str === void 0) return this._version;
        this._version = str;
        flags2 = flags2 || "-V, --version";
        description = description || "output the version number";
        const versionOption = this.createOption(flags2, description);
        this._versionOptionName = versionOption.attributeName();
        this._registerOption(versionOption);
        this.on("option:" + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}
`);
          this._exit(0, "commander.version", str);
        });
        return this;
      }
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {object} [argsDescription]
       * @return {(string|Command)}
       */
      description(str, argsDescription) {
        if (str === void 0 && argsDescription === void 0)
          return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      summary(str) {
        if (str === void 0) return this._summary;
        this._summary = str;
        return this;
      }
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {(string|Command)}
       */
      alias(alias) {
        if (alias === void 0) return this._aliases[0];
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          command = this.commands[this.commands.length - 1];
        }
        if (alias === command._name)
          throw new Error("Command alias can't be the same as its name");
        const matchingCommand = this.parent?._findCommand(alias);
        if (matchingCommand) {
          const existingCmd = [matchingCommand.name()].concat(matchingCommand.aliases()).join("|");
          throw new Error(
            `cannot add alias '${alias}' to command '${this.name()}' as already have command '${existingCmd}'`
          );
        }
        command._aliases.push(alias);
        return this;
      }
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {(string[]|Command)}
       */
      aliases(aliases) {
        if (aliases === void 0) return this._aliases;
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      usage(str) {
        if (str === void 0) {
          if (this._usage) return this._usage;
          const args2 = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            this.options.length || this._helpOption !== null ? "[options]" : [],
            this.commands.length ? "[command]" : [],
            this.registeredArguments.length ? args2 : []
          ).join(" ");
        }
        this._usage = str;
        return this;
      }
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {(string|Command)}
       */
      name(str) {
        if (str === void 0) return this._name;
        this._name = str;
        return this;
      }
      /**
       * Set/get the help group heading for this subcommand in parent command's help.
       *
       * @param {string} [heading]
       * @return {Command | string}
       */
      helpGroup(heading) {
        if (heading === void 0) return this._helpGroupHeading ?? "";
        this._helpGroupHeading = heading;
        return this;
      }
      /**
       * Set/get the default help group heading for subcommands added to this command.
       * (This does not override a group set directly on the subcommand using .helpGroup().)
       *
       * @example
       * program.commandsGroup('Development Commands:);
       * program.command('watch')...
       * program.command('lint')...
       * ...
       *
       * @param {string} [heading]
       * @returns {Command | string}
       */
      commandsGroup(heading) {
        if (heading === void 0) return this._defaultCommandGroup ?? "";
        this._defaultCommandGroup = heading;
        return this;
      }
      /**
       * Set/get the default help group heading for options added to this command.
       * (This does not override a group set directly on the option using .helpGroup().)
       *
       * @example
       * program
       *   .optionsGroup('Development Options:')
       *   .option('-d, --debug', 'output extra debugging')
       *   .option('-p, --profile', 'output profiling information')
       *
       * @param {string} [heading]
       * @returns {Command | string}
       */
      optionsGroup(heading) {
        if (heading === void 0) return this._defaultOptionGroup ?? "";
        this._defaultOptionGroup = heading;
        return this;
      }
      /**
       * @param {Option} option
       * @private
       */
      _initOptionGroup(option) {
        if (this._defaultOptionGroup && !option.helpGroupHeading)
          option.helpGroup(this._defaultOptionGroup);
      }
      /**
       * @param {Command} cmd
       * @private
       */
      _initCommandGroup(cmd) {
        if (this._defaultCommandGroup && !cmd.helpGroup())
          cmd.helpGroup(this._defaultCommandGroup);
      }
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
      nameFromFilename(filename) {
        this._name = path5.basename(filename, path5.extname(filename));
        return this;
      }
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {(string|null|Command)}
       */
      executableDir(path6) {
        if (path6 === void 0) return this._executableDir;
        this._executableDir = path6;
        return this;
      }
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        const context = this._getOutputContext(contextOptions);
        helper.prepareContext({
          error: context.error,
          helpWidth: context.helpWidth,
          outputHasColors: context.hasColors
        });
        const text = helper.formatHelp(this, helper);
        if (context.hasColors) return text;
        return this._outputConfiguration.stripColor(text);
      }
      /**
       * @typedef HelpContext
       * @type {object}
       * @property {boolean} error
       * @property {number} helpWidth
       * @property {boolean} hasColors
       * @property {function} write - includes stripColor if needed
       *
       * @returns {HelpContext}
       * @private
       */
      _getOutputContext(contextOptions) {
        contextOptions = contextOptions || {};
        const error = !!contextOptions.error;
        let baseWrite;
        let hasColors;
        let helpWidth;
        if (error) {
          baseWrite = (str) => this._outputConfiguration.writeErr(str);
          hasColors = this._outputConfiguration.getErrHasColors();
          helpWidth = this._outputConfiguration.getErrHelpWidth();
        } else {
          baseWrite = (str) => this._outputConfiguration.writeOut(str);
          hasColors = this._outputConfiguration.getOutHasColors();
          helpWidth = this._outputConfiguration.getOutHelpWidth();
        }
        const write = (str) => {
          if (!hasColors) str = this._outputConfiguration.stripColor(str);
          return baseWrite(str);
        };
        return { error, write, hasColors, helpWidth };
      }
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === "function") {
          deprecatedCallback = contextOptions;
          contextOptions = void 0;
        }
        const outputContext = this._getOutputContext(contextOptions);
        const eventContext = {
          error: outputContext.error,
          write: outputContext.write,
          command: this
        };
        this._getCommandAndAncestors().reverse().forEach((command) => command.emit("beforeAllHelp", eventContext));
        this.emit("beforeHelp", eventContext);
        let helpInformation = this.helpInformation({ error: outputContext.error });
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== "string" && !Buffer.isBuffer(helpInformation)) {
            throw new Error("outputHelp callback must return a string or a Buffer");
          }
        }
        outputContext.write(helpInformation);
        if (this._getHelpOption()?.long) {
          this.emit(this._getHelpOption().long);
        }
        this.emit("afterHelp", eventContext);
        this._getCommandAndAncestors().forEach(
          (command) => command.emit("afterAllHelp", eventContext)
        );
      }
      /**
       * You can pass in flags and a description to customise the built-in help option.
       * Pass in false to disable the built-in help option.
       *
       * @example
       * program.helpOption('-?, --help' 'show help'); // customise
       * program.helpOption(false); // disable
       *
       * @param {(string | boolean)} flags
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
      helpOption(flags2, description) {
        if (typeof flags2 === "boolean") {
          if (flags2) {
            if (this._helpOption === null) this._helpOption = void 0;
            if (this._defaultOptionGroup) {
              this._initOptionGroup(this._getHelpOption());
            }
          } else {
            this._helpOption = null;
          }
          return this;
        }
        this._helpOption = this.createOption(
          flags2 ?? "-h, --help",
          description ?? "display help for command"
        );
        if (flags2 || description) this._initOptionGroup(this._helpOption);
        return this;
      }
      /**
       * Lazy create help option.
       * Returns null if has been disabled with .helpOption(false).
       *
       * @returns {(Option | null)} the help option
       * @package
       */
      _getHelpOption() {
        if (this._helpOption === void 0) {
          this.helpOption(void 0, void 0);
        }
        return this._helpOption;
      }
      /**
       * Supply your own option to use for the built-in help option.
       * This is an alternative to using helpOption() to customise the flags and description etc.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addHelpOption(option) {
        this._helpOption = option;
        this._initOptionGroup(option);
        return this;
      }
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = Number(process2.exitCode ?? 0);
        if (exitCode === 0 && contextOptions && typeof contextOptions !== "function" && contextOptions.error) {
          exitCode = 1;
        }
        this._exit(exitCode, "commander.help", "(outputHelp)");
      }
      /**
       * // Do a little typing to coordinate emit and listener for the help text events.
       * @typedef HelpTextEventContext
       * @type {object}
       * @property {boolean} error
       * @property {Command} command
       * @property {function} write
       */
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {(string | Function)} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ["beforeAll", "before", "after", "afterAll"];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === "function") {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          if (helpStr) {
            context.write(`${helpStr}
`);
          }
        });
        return this;
      }
      /**
       * Output help information if help flags specified
       *
       * @param {Array} args - array of options to search for help flags
       * @private
       */
      _outputHelpIfRequested(args2) {
        const helpOption = this._getHelpOption();
        const helpRequested = helpOption && args2.find((arg) => helpOption.is(arg));
        if (helpRequested) {
          this.outputHelp();
          this._exit(0, "commander.helpDisplayed", "(outputHelp)");
        }
      }
    };
    function incrementNodeInspectorPort(args2) {
      return args2.map((arg) => {
        if (!arg.startsWith("--inspect")) {
          return arg;
        }
        let debugOption;
        let debugHost = "127.0.0.1";
        let debugPort = "9229";
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            debugPort = match[3];
          } else {
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
        if (debugOption && debugPort !== "0") {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    function useColor() {
      if (process2.env.NO_COLOR || process2.env.FORCE_COLOR === "0" || process2.env.FORCE_COLOR === "false")
        return false;
      if (process2.env.FORCE_COLOR || process2.env.CLICOLOR_FORCE !== void 0)
        return true;
      return void 0;
    }
    exports2.Command = Command;
    exports2.useColor = useColor;
  }
});

// node_modules/commander/index.js
var require_commander = __commonJS({
  "node_modules/commander/index.js"(exports2) {
    var { Argument } = require_argument();
    var { Command } = require_command();
    var { CommanderError, InvalidArgumentError } = require_error();
    var { Help } = require_help();
    var { Option } = require_option();
    exports2.program = new Command();
    exports2.createCommand = (name2) => new Command(name2);
    exports2.createOption = (flags2, description) => new Option(flags2, description);
    exports2.createArgument = (name2, description) => new Argument(name2, description);
    exports2.Command = Command;
    exports2.Option = Option;
    exports2.Argument = Argument;
    exports2.Help = Help;
    exports2.CommanderError = CommanderError;
    exports2.InvalidArgumentError = InvalidArgumentError;
    exports2.InvalidOptionArgumentError = InvalidArgumentError;
  }
});

// ../autocompletion/v2/CodeSnippets.ts
var CodeSnippets = class _CodeSnippets {
  _nextId = 0;
  _idMap = /* @__PURE__ */ new Map();
  _byName = /* @__PURE__ */ new Map();
  _fileIndex = /* @__PURE__ */ new Map();
  // 基于结构化信息的索引
  _byDefinitionType = /* @__PURE__ */ new Map();
  // 按定义类型索引
  _bySignature = /* @__PURE__ */ new Map();
  // 按签名索引
  snippets = [];
  filesHash = /* @__PURE__ */ new Map();
  _addToIndices(id, snippet) {
    if (!this._byName.has(snippet.name)) this._byName.set(snippet.name, /* @__PURE__ */ new Set());
    this._byName.get(snippet.name).add(id);
    if (!this._fileIndex.has(snippet.filePath)) {
      this._fileIndex.set(snippet.filePath, {
        allIds: /* @__PURE__ */ new Set(),
        byName: /* @__PURE__ */ new Map()
      });
    }
    const bucket = this._fileIndex.get(snippet.filePath);
    bucket.allIds.add(id);
    if (!bucket.byName.has(snippet.name)) bucket.byName.set(snippet.name, /* @__PURE__ */ new Set());
    bucket.byName.get(snippet.name).add(id);
    this._addToStructuredIndices(id, snippet);
  }
  _removeFromIndices(id, snippet) {
    const nameSet = this._byName.get(snippet.name);
    if (nameSet) {
      nameSet.delete(id);
      if (nameSet.size === 0) this._byName.delete(snippet.name);
    }
    const bucket = this._fileIndex.get(snippet.filePath);
    if (bucket) {
      bucket.allIds.delete(id);
      const nameSetInFile = bucket.byName.get(snippet.name);
      if (nameSetInFile) {
        nameSetInFile.delete(id);
        if (nameSetInFile.size === 0) bucket.byName.delete(snippet.name);
      }
      if (bucket.allIds.size === 0) this._fileIndex.delete(snippet.filePath);
    }
    this._removeFromStructuredIndices(id, snippet);
  }
  /**
   * 添加结构化信息索引
   */
  _addToStructuredIndices(id, snippet) {
    if (snippet.definition?.type) {
      if (!this._byDefinitionType.has(snippet.definition.type)) {
        this._byDefinitionType.set(snippet.definition.type, /* @__PURE__ */ new Set());
      }
      this._byDefinitionType.get(snippet.definition.type).add(id);
    }
    if (snippet.signature) {
      if (!this._bySignature.has(snippet.signature)) {
        this._bySignature.set(snippet.signature, /* @__PURE__ */ new Set());
      }
      this._bySignature.get(snippet.signature).add(id);
    }
  }
  /**
   * 移除结构化信息索引
   */
  _removeFromStructuredIndices(id, snippet) {
    if (snippet.definition?.type) {
      const typeSet = this._byDefinitionType.get(snippet.definition.type);
      if (typeSet) {
        typeSet.delete(id);
        if (typeSet.size === 0) this._byDefinitionType.delete(snippet.definition.type);
      }
    }
    if (snippet.signature) {
      const signatureSet = this._bySignature.get(snippet.signature);
      if (signatureSet) {
        signatureSet.delete(id);
        if (signatureSet.size === 0) this._bySignature.delete(snippet.signature);
      }
    }
  }
  /**
   * 按名称查找单个片段
   */
  async findByName(name2) {
    const results = await this.find({ name: name2 });
    return results.length > 0 ? results[0] : void 0;
  }
  /**
   * 按文件查找片段
   */
  async findByFile(filePath) {
    return await this.find({ filePath });
  }
  /**
   * 按定义类型查找片段
   */
  async findByDefinitionType(definitionType) {
    const ids = this._byDefinitionType.get(definitionType) ?? /* @__PURE__ */ new Set();
    return Array.from(ids).map((id) => this._idMap.get(id));
  }
  /**
   * 按签名查找片段
   */
  async findBySignature(signature) {
    const ids = this._bySignature.get(signature) ?? /* @__PURE__ */ new Set();
    return Array.from(ids).map((id) => this._idMap.get(id));
  }
  /**
   * 查找具有特定参数类型的函数
   */
  async findFunctionsWithParameterTypes(paramTypes) {
    const results = [];
    for (const snippet of this.snippets) {
      if (snippet.parameters && snippet.parameters.length >= paramTypes.length) {
        let match = true;
        for (let i2 = 0; i2 < paramTypes.length; i2++) {
          if (snippet.parameters[i2]?.type !== paramTypes[i2]) {
            match = false;
            break;
          }
        }
        if (match) {
          results.push(snippet);
        }
      }
    }
    return results;
  }
  async merge(codeSnippets) {
    if (codeSnippets && codeSnippets.snippets) {
      await this.insert(codeSnippets.snippets);
    }
  }
  /**
   * 获取统计信息
   */
  getStats() {
    const typeDistribution = {};
    const definitionTypeDistribution = {};
    let totalLines = 0;
    for (const snippet of this.snippets) {
      typeDistribution[snippet.type] = (typeDistribution[snippet.type] || 0) + 1;
      if (snippet.definition?.type) {
        definitionTypeDistribution[snippet.definition.type] = (definitionTypeDistribution[snippet.definition.type] || 0) + 1;
      }
      totalLines += snippet.endLine - snippet.startLine + 1;
    }
    const files = new Set(this.snippets.map((s) => s.filePath));
    return {
      totalSnippets: this.snippets.length,
      fileCount: files.size,
      typeDistribution,
      definitionTypeDistribution,
      avgLinesPerSnippet: this.snippets.length > 0 ? totalLines / this.snippets.length : 0
    };
  }
  /**
   * Find snippets by partial information
   */
  async find(query) {
    if (query.filePath && query.name) {
      const bucket = this._fileIndex.get(query.filePath);
      const ids = bucket?.byName.get(query.name) ?? /* @__PURE__ */ new Set();
      let res = Array.from(ids).map((id) => this._idMap.get(id));
      if (query.type) res = res.filter((s) => s.type === query.type);
      if (query.field) {
        res = res.filter((s) => s.field === query.field);
      } else {
        res = res.filter((s) => s.field === void 0 || s.field === null || s.field === "");
      }
      return res;
    }
    if (query.name) {
      const ids = this._byName.get(query.name) ?? /* @__PURE__ */ new Set();
      return Array.from(ids).map((id) => this._idMap.get(id));
    }
    if (query.filePath) {
      const bucket = this._fileIndex.get(query.filePath);
      const ids = bucket?.allIds ?? /* @__PURE__ */ new Set();
      return Array.from(ids).map((id) => this._idMap.get(id));
    }
    return Array.from(this._idMap.values());
  }
  /**
   * Delete all snippets from a specific file
   */
  async deleteByFile(filePath) {
    const bucket = this._fileIndex.get(filePath);
    if (!bucket) return [];
    const deleted = [];
    for (const id of Array.from(bucket.allIds)) {
      const snippet = this._idMap.get(id);
      this._removeFromIndices(id, snippet);
      this._idMap.delete(id);
      deleted.push(snippet);
    }
    if (deleted.length) {
      this.snippets = this.snippets.filter((s) => s.filePath !== filePath);
    }
    return deleted;
  }
  /**
   * Insert snippets in batch
   */
  async insert(snippets) {
    for (const snippet of snippets) {
      const id = ++this._nextId;
      this._idMap.set(id, snippet);
      this._addToIndices(id, snippet);
      this.snippets.push(snippet);
      if (snippet.fileHash && snippet.filePath) {
        this.filesHash.set(snippet.filePath, snippet.fileHash);
      }
    }
    return snippets.length;
  }
  /**
   * Update a single snippet
   */
  async update(snippet) {
    if (snippet.filePath && snippet.name && snippet.type) {
      const bucket = this._fileIndex.get(snippet.filePath);
      if (!bucket) return false;
      const candidateIds = bucket.byName.get(snippet.name) ?? /* @__PURE__ */ new Set();
      for (const id of candidateIds) {
        const old = this._idMap.get(id);
        if (old.type === snippet.type) {
          this._removeFromIndices(id, old);
          this._idMap.set(id, snippet);
          this._addToIndices(id, snippet);
          const idx = this.snippets.indexOf(old);
          if (idx > -1) this.snippets[idx] = snippet;
          return true;
        }
      }
    }
    if (snippet.filePath && snippet.name) {
      const bucket = this._fileIndex.get(snippet.filePath);
      if (!bucket) return false;
      const candidateIds = bucket.byName.get(snippet.name) ?? /* @__PURE__ */ new Set();
      if (candidateIds.size > 0) {
        const id = Array.from(candidateIds)[0];
        const old = this._idMap.get(id);
        this._removeFromIndices(id, old);
        this._idMap.set(id, snippet);
        this._addToIndices(id, snippet);
        const idx = this.snippets.indexOf(old);
        if (idx > -1) this.snippets[idx] = snippet;
        return true;
      }
    }
    return false;
  }
  async updateByFile(file, snippets) {
    await this.deleteByFile(file.filePath);
    await this.merge(snippets);
    const fileHash = file.fileHash || file.hash;
    if (fileHash) {
      this.filesHash.set(file.filePath, fileHash);
    }
    return true;
  }
  /**
   * Clear all snippets
   */
  clear() {
    this._nextId = 0;
    this._idMap.clear();
    this._byName.clear();
    this._fileIndex.clear();
    this._byDefinitionType.clear();
    this._bySignature.clear();
    this.snippets = [];
  }
  /**
   * Filter snippets by condition
   */
  async filter(predicate) {
    const result = new _CodeSnippets();
    for (const snippet of this._idMap.values()) {
      if (predicate(snippet)) await result.insert([snippet]);
    }
    return result;
  }
  /**
   * Check if a code file's index is up to date
   * @param file The file to check
   * @returns true if the file needs to be updated (index is NOT latest), false if index is current
   */
  isCodeFileLatestIndex(file) {
    const storedHash = this.filesHash.get(file.filePath);
    if (!storedHash) {
      return true;
    }
    const currentHash = file.fileHash || file.hash;
    return currentHash !== storedHash;
  }
  getSnippets() {
    return this.snippets;
  }
};

// ../autocompletion/v2/types.ts
var CodeLanguageType = /* @__PURE__ */ ((CodeLanguageType3) => {
  CodeLanguageType3["Python"] = "python";
  CodeLanguageType3["Java"] = "java";
  CodeLanguageType3["JavaScript"] = "javascript";
  CodeLanguageType3["TypeScript"] = "typescript";
  CodeLanguageType3["JSX"] = "jsx";
  CodeLanguageType3["TSX"] = "tsx";
  CodeLanguageType3["Go"] = "go";
  CodeLanguageType3["Swift"] = "swift";
  CodeLanguageType3["CSS"] = "css";
  CodeLanguageType3["HTML"] = "html";
  CodeLanguageType3["Kotlin"] = "kotlin";
  CodeLanguageType3["PHP"] = "php";
  CodeLanguageType3["Rust"] = "rust";
  CodeLanguageType3["C"] = "c";
  CodeLanguageType3["CPP"] = "cpp";
  CodeLanguageType3["Unknown"] = "unknown";
  return CodeLanguageType3;
})(CodeLanguageType || {});
var CodeLanguageTypeSupport = [
  "python" /* Python */,
  "java" /* Java */,
  "javascript" /* JavaScript */,
  "typescript" /* TypeScript */,
  "jsx" /* JSX */,
  "tsx" /* TSX */,
  "go" /* Go */,
  "swift" /* Swift */,
  "css" /* CSS */,
  "html" /* HTML */,
  "kotlin" /* Kotlin */,
  "php" /* PHP */,
  "rust" /* Rust */,
  "c" /* C */,
  "cpp" /* CPP */
];
var FileExtensionLanguageMap = {
  ".py": "python" /* Python */,
  ".java": "java" /* Java */,
  ".js": "javascript" /* JavaScript */,
  ".mjs": "javascript" /* JavaScript */,
  ".ts": "typescript" /* TypeScript */,
  ".tsx": "tsx" /* TSX */,
  ".jsx": "jsx" /* JSX */,
  ".go": "go" /* Go */,
  ".swift": "swift" /* Swift */,
  ".css": "css" /* CSS */,
  ".html": "html" /* HTML */,
  ".kt": "kotlin" /* Kotlin */,
  ".kts": "kotlin" /* Kotlin */,
  ".php": "php" /* PHP */,
  ".rs": "rust" /* Rust */,
  ".c": "c" /* C */,
  ".h": "c" /* C */,
  ".cpp": "cpp" /* CPP */,
  ".cxx": "cpp" /* CPP */,
  ".cc": "cpp" /* CPP */,
  ".hpp": "cpp" /* CPP */,
  ".hxx": "cpp" /* CPP */
};
var LanguageFileExtensionMap = Object.entries(FileExtensionLanguageMap).reduce(
  (acc, [extension, language]) => {
    if (!acc[language]) acc[language] = [];
    acc[language].push(extension);
    return acc;
  },
  {}
);

// ../autocompletion/v2/CodeContext.ts
var path4 = __toESM(require("path"));
var crypto3 = __toESM(require("crypto"));

// ../../../src/services/CT-tree-sitter/languageParser.ts
var path = __toESM(require("path"));
var import_web_tree_sitter = __toESM(require_tree_sitter());

// ../../../src/services/CT-tree-sitter/queries/solidity.ts
var solidityQuery = `
; Contract declarations
(contract_declaration
  name: (identifier) @name.definition.contract) @definition.contract

(interface_declaration
  name: (identifier) @name.definition.interface) @definition.interface

(library_declaration
  name: (identifier) @name.definition.library) @definition.library

; Function declarations
(function_definition
  name: (identifier) @name.definition.function) @definition.function

(modifier_definition
  name: (identifier) @name.definition.modifier) @definition.modifier

(constructor_definition) @definition.constructor

(fallback_receive_definition
  (visibility)
  (state_mutability)) @definition.fallback

; Type declarations
(struct_declaration
  name: (identifier) @name.definition.struct) @definition.struct

(enum_declaration
  name: (identifier) @name.definition.enum) @definition.enum

(event_definition
  name: (identifier) @name.definition.event) @definition.event

(error_declaration
  name: (identifier) @name.definition.error) @definition.error

; Variable declarations
(state_variable_declaration
  name: (identifier) @name.definition.variable) @definition.variable

; Using directives
(using_directive
  (type_alias) @name.definition.using) @definition.using`;

// ../../../src/services/CT-tree-sitter/queries/php.ts
var php_default = `
;--------------------------
; 1. CLASS DEFINITIONS
;--------------------------
; Regular classes
(class_declaration
  name: (name) @name.definition.class) @definition.class

; Abstract classes
(class_declaration
  (abstract_modifier)
  name: (name) @name.definition.abstract_class) @definition.abstract_class

; Final classes
(class_declaration
  (final_modifier)
  name: (name) @name.definition.final_class) @definition.final_class

; Readonly classes (PHP 8.2+)
(class_declaration
  (readonly_modifier)
  name: (name) @name.definition.readonly_class) @definition.readonly_class

;--------------------------
; 2. INTERFACE & TRAIT DEFINITIONS
;--------------------------
; Interfaces
(interface_declaration
  name: (name) @name.definition.interface) @definition.interface

; Traits
(trait_declaration
  name: (name) @name.definition.trait) @definition.trait

; Enums (PHP 8.1+)
(enum_declaration
  name: (name) @name.definition.enum) @definition.enum

;--------------------------
; 3. FUNCTION & METHOD DEFINITIONS
;--------------------------
; Global functions
(function_definition
  name: (name) @name.definition.function
  parameters: (formal_parameters) @parameters.definition.function
  body: (compound_statement) @body.definition.function) @definition.function

; Regular methods
(method_declaration
  name: (name) @name.definition.method
  parameters: (formal_parameters) @parameters.definition.method) @definition.method

; Static methods
(method_declaration
  (static_modifier)
  name: (name) @name.definition.static_method
  parameters: (formal_parameters) @parameters.definition.static_method) @definition.static_method

; Abstract methods
(method_declaration
  (abstract_modifier)
  name: (name) @name.definition.abstract_method
  parameters: (formal_parameters) @parameters.definition.abstract_method) @definition.abstract_method

; Final methods
(method_declaration
  (final_modifier)
  name: (name) @name.definition.final_method
  parameters: (formal_parameters) @parameters.definition.final_method) @definition.final_method

; Arrow functions (PHP 7.4+)
(arrow_function) @definition.arrow_function

;--------------------------
; 4. PROPERTY DEFINITIONS
;--------------------------
; Regular properties
(property_declaration
  (property_element
    (variable_name
      (name) @name.definition.property))) @definition.property

; Static properties
(property_declaration
  (static_modifier)
  (property_element
    (variable_name
      (name) @name.definition.static_property))) @definition.static_property

; Readonly properties (PHP 8.1+)
(property_declaration
  (readonly_modifier)
  (property_element
    (variable_name
      (name) @name.definition.readonly_property))) @definition.readonly_property

; Constructor property promotion (PHP 8.0+)
(property_promotion_parameter
  name: (variable_name
    (name) @name.definition.promoted_property)) @definition.promoted_property

;--------------------------
; 5. OTHER LANGUAGE CONSTRUCTS
;--------------------------
; Constants
(const_declaration
  (const_element
    (name) @name.definition.constant)) @definition.constant

; Namespaces
(namespace_definition
  name: (namespace_name) @name.definition.namespace) @definition.namespace

; Use statements (imports)
(namespace_use_declaration
  (namespace_use_clause
    (qualified_name) @name.definition.use)) @definition.use

; Anonymous classes
(object_creation_expression
  (declaration_list)) @definition.anonymous_class

; Attributes (PHP 8.0+)
(attribute_group
  (attribute
    (name) @name.definition.attribute)) @definition.attribute

; Match expressions (PHP 8.0+)
(match_expression) @definition.match_expression

; Heredoc syntax
(heredoc) @definition.heredoc

; Nowdoc syntax
(nowdoc) @definition.nowdoc
`;

// ../../../src/services/CT-tree-sitter/queries/vue.ts
var vueQuery = `
; Top-level structure
(component) @component.definition

; Template section
(template_element) @template.definition
(template_element
  (element
    (start_tag
      (tag_name) @element.name.definition))
  (element
    (start_tag
      (attribute
        (attribute_name) @attribute.name.definition)))
  (element
    (start_tag
      (directive_attribute
        (directive_name) @directive.name.definition))))

; Script section
(script_element) @script.definition
(script_element
  (raw_text) @script.content.definition)

; Style section
(style_element) @style.definition
(style_element
  (raw_text) @style.content.definition)
`;

// ../../../src/services/CT-tree-sitter/queries/typescript.ts
var typescript_default = `
; === Import Declarations ===
(import_statement
  (import_clause
    (named_imports
      (import_specifier
        name: (identifier) @name.import)))) @definition.import

; === Default Imports ===
(import_statement
  (import_clause
    (identifier) @name.import)) @definition.import

; === Class Declarations ===
(class_declaration
  name: (type_identifier) @name.class) @definition.class

; === Abstract Class Declarations ===
(abstract_class_declaration
  name: (type_identifier) @name.class) @definition.class

; === Interface Declarations ===
(interface_declaration
  name: (type_identifier) @name.interface) @definition.interface

; === Type Alias Declarations ===
(type_alias_declaration
  name: (type_identifier) @name.type_alias) @definition.type_alias

; === Enum Declarations ===
(enum_declaration
  name: (identifier) @name.enum) @definition.enum

; === Function Declarations ===
(function_declaration
  name: (identifier) @name.function
  parameters: (formal_parameters) @parameters.function
  body: (statement_block) @body.function) @definition.function

; === Generator Function Declarations ===
(generator_function_declaration
  name: (identifier) @name.function
  parameters: (formal_parameters) @parameters.function
  body: (statement_block) @body.function) @definition.function

; === Method Definitions in Classes ===
(method_definition
  name: (property_identifier) @name.method
  parameters: (formal_parameters) @parameters.method
  body: (statement_block) @body.method) @definition.method

; === Variable Declarations ===
(variable_declaration
  (variable_declarator
    name: (identifier) @name.variable)) @definition.variable

; === Lexical Declarations (const, let) ===
(lexical_declaration
  (variable_declarator
    name: (identifier) @name.variable)) @definition.variable

; === Property Signatures in Interfaces ===
(property_signature
  name: (property_identifier) @name.property) @definition.property

; === Method Signatures in Interfaces ===
(method_signature
  name: (property_identifier) @name.method
  parameters: (formal_parameters) @parameters.method) @definition.method

; === Arrow Functions assigned to variables ===
(lexical_declaration
  (variable_declarator
    name: (identifier) @name.function
    value: (arrow_function
      parameters: (formal_parameters) @parameters.function))) @definition.function

(variable_declaration
  (variable_declarator
    name: (identifier) @name.function
    value: (arrow_function
      parameters: (formal_parameters) @parameters.function))) @definition.function

; === Function Expressions assigned to variables ===
(lexical_declaration
  (variable_declarator
    name: (identifier) @name.function
    value: (function_expression
      parameters: (formal_parameters) @parameters.function))) @definition.function

(variable_declaration
  (variable_declarator
    name: (identifier) @name.function
    value: (function_expression
      parameters: (formal_parameters) @parameters.function))) @definition.function
`;

// ../../../src/services/CT-tree-sitter/queries/tsx.ts
var tsx_default = `${typescript_default}

; Function Components - Both function declarations and arrow functions
(function_declaration
  name: (identifier) @name) @definition.component

; Arrow Function Components
(variable_declaration
  (variable_declarator
    name: (identifier) @name
    value: (arrow_function))) @definition.component

; Export Statement Components
(export_statement
  (variable_declaration
    (variable_declarator
      name: (identifier) @name
      value: (arrow_function)))) @definition.component

; Class Components
(class_declaration
  name: (type_identifier) @name) @definition.class_component

; Interface Declarations
(interface_declaration
  name: (type_identifier) @name) @definition.interface

; Type Alias Declarations
(type_alias_declaration
  name: (type_identifier) @name) @definition.type

; HOC Components
(variable_declaration
  (variable_declarator
    name: (identifier) @name
    value: (call_expression
      function: (identifier)))) @definition.component

; JSX Component Usage - Capture all components in JSX
(jsx_element
  open_tag: (jsx_opening_element
    name: [(identifier) @component (member_expression) @component])) @definition.jsx_element

; Self-closing JSX elements
(jsx_self_closing_element
  name: [(identifier) @component (member_expression) @component]) @definition.jsx_self_closing_element

; Capture all identifiers in JSX expressions that start with capital letters
(jsx_expression
  (identifier) @jsx_component) @definition.jsx_component

; Capture all member expressions in JSX
(member_expression
  object: (identifier) @object
  property: (property_identifier) @property) @definition.member_component

; Capture components in conditional expressions
(ternary_expression
  consequence: (parenthesized_expression
    (jsx_element
      open_tag: (jsx_opening_element
        name: (identifier) @component)))) @definition.conditional_component

(ternary_expression
  alternative: (jsx_self_closing_element
    name: (identifier) @component)) @definition.conditional_component

; Generic Components
(function_declaration
  name: (identifier) @name
  type_parameters: (type_parameters)) @definition.generic_component
`;

// ../../../src/services/CT-tree-sitter/queries/python.ts
var python_default = `
; Class definitions (including decorated)
(class_definition
  name: (identifier) @name.definition.class) @definition.class

(decorated_definition
  definition: (class_definition
    name: (identifier) @name.definition.class)) @definition.class

; Function definitions with parameters and body (including async and decorated)
(function_definition
  name: (identifier) @name.definition.function
  parameters: (parameters) @parameters.definition.function
  body: (block) @body.definition.function) @definition.function

(decorated_definition
  definition: (function_definition
    name: (identifier) @name.definition.function
    parameters: (parameters) @parameters.definition.function)) @definition.function

; Assignment statements for variables
(assignment
  left: (identifier) @name.definition.variable) @definition.variable

; Multiple assignment (tuple unpacking) - capture each identifier separately
(assignment
  left: (pattern_list
    (identifier) @name.definition.variable)) @definition.variable

; Augmented assignment (+=, -=, etc.)
(augmented_assignment
  left: (identifier) @name.definition.variable) @definition.variable

; Annotated assignment (with type hints)
(expression_statement
  (assignment
    left: (identifier) @name.definition.variable
    type: (type))) @definition.variable

; Attribute assignments (self.attribute = value) - capture the attribute name
(assignment
  left: (attribute
    object: (identifier)
    attribute: (identifier) @name.definition.member_variable)) @definition.variable

; Lambda expressions
(expression_statement
  (assignment
    left: (identifier) @name.definition.lambda
    right: (parenthesized_expression
      (lambda)))) @definition.lambda

; Generator functions (functions containing yield)
(function_definition
  name: (identifier) @name.definition.generator
  body: (block
    (expression_statement
      (yield)))) @definition.generator

; Comprehensions
(expression_statement
  (assignment
    left: (identifier) @name.definition.comprehension
    right: [
      (list_comprehension)
      (dictionary_comprehension)
      (set_comprehension)
    ])) @definition.comprehension

; With statements
(with_statement) @definition.with_statement

; Try statements
(try_statement) @definition.try_statement

; Import statements
(import_statement
  name: (dotted_name) @name.definition.import) @definition.import

(import_from_statement
  module_name: (dotted_name) @name.definition.import) @definition.import

(import_from_statement
  name: (dotted_name) @name.definition.import) @definition.import

; Global/Nonlocal statements
(function_definition
  body: (block
    [(global_statement) (nonlocal_statement)])) @definition.scope

; Match case statements
(function_definition
  body: (block
    (match_statement))) @definition.match_case

; Type annotations
(typed_parameter
  type: (type)) @definition.type_annotation

(expression_statement
  (assignment
    left: (identifier) @name.definition.type
    type: (type))) @definition.type_annotation
`;

// ../../../src/services/CT-tree-sitter/queries/javascript.ts
var javascript_default = `
(
  (comment)* @doc
  .
  (method_definition
    name: (property_identifier) @name
    parameters: (formal_parameters) @parameters.definition.method) @definition.method
  (#not-eq? @name "constructor")
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.method)
)

(
  (comment)* @doc
  .
  [
    (class
      name: (_) @name.definition.class)
    (class_declaration
      name: (_) @name.definition.class)
  ] @definition.class
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.class)
)

(
  (comment)* @doc
  .
  [
    (function_declaration
      name: (identifier) @name.definition.function
      parameters: (formal_parameters) @parameters.definition.function
      body: (statement_block) @body.definition.function) @definition.function
    (generator_function_declaration
      name: (identifier) @name.definition.function
      parameters: (formal_parameters) @parameters.definition.function) @definition.function
  ]
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.function)
)

(
  (comment)* @doc
  .
  (lexical_declaration
    (variable_declarator
      name: (identifier) @name
      value: [
        (arrow_function
          parameters: (formal_parameters) @parameters.definition.function)
        (function_expression
          parameters: (formal_parameters) @parameters.definition.function)
      ]) @definition.function)
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.function)
)

(
  (comment)* @doc
  .
  (variable_declaration
    (variable_declarator
      name: (identifier) @name
      value: [
        (arrow_function
          parameters: (formal_parameters) @parameters.definition.function)
        (function_expression
          parameters: (formal_parameters) @parameters.definition.function)
      ]) @definition.function)
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.function)
)

; Variable declarations (let, const, var) - capture each declarator separately
(variable_declarator
  name: (identifier) @name.definition.variable) @definition.variable

; Also capture from parent declarations for context
(variable_declaration
  (variable_declarator
    name: (identifier) @name.definition.variable)) @definition.variable

(lexical_declaration
  (variable_declarator
    name: (identifier) @name.definition.variable)) @definition.variable

; Destructuring assignments - capture all identifiers in destructuring patterns
(shorthand_property_identifier_pattern) @name.definition.variable @definition.variable

; Array destructuring - capture the whole pattern for manual processing
(lexical_declaration
  (variable_declarator
    name: (array_pattern) @array_pattern)) @definition.variable

(variable_declaration
  (variable_declarator
    name: (array_pattern) @array_pattern)) @definition.variable

; Class field declarations
(field_definition
  property: (property_identifier) @name.definition.member_variable) @definition.variable

; Assignment expressions for member variables (this.property = value)
(assignment_expression
  left: (member_expression
    object: (this)
    property: (property_identifier) @name.definition.member_variable)) @definition.variable

; Object property assignments
(assignment_expression
  left: (member_expression
    property: (property_identifier) @name.definition.member_variable)) @definition.variable

; JSON object definitions
(object) @object.definition

; JSON object key-value pairs
(pair
  key: (string) @property.name.definition
  value: [
    (object) @object.value
    (array) @array.value
    (string) @string.value
    (number) @number.value
    (true) @boolean.value
    (false) @boolean.value
    (null) @null.value
  ]
) @property.definition

; JSON array definitions
(array) @array.definition

; Decorated method definitions
(
  [
    (method_definition
      decorator: (decorator)
      name: (property_identifier) @name
      parameters: (formal_parameters) @parameters.definition.method) @definition.method
    (method_definition
      decorator: (decorator
        (call_expression
          function: (identifier) @decorator_name))
      name: (property_identifier) @name
      parameters: (formal_parameters) @parameters.definition.method) @definition.method
  ]
  (#not-eq? @name "constructor")
)

; Decorated class definitions
(
  [
    (class
      decorator: (decorator)
      name: (_) @name.definition.class) @definition.class
    (class_declaration
      decorator: (decorator)
      name: (_) @name.definition.class) @definition.class
  ]
)

; Capture method names in decorated classes
(
  (class_declaration
    decorator: (decorator)
    body: (class_body
      (method_definition
        name: (property_identifier) @name
        parameters: (formal_parameters) @parameters.definition.method) @definition.method))
  (#not-eq? @name "constructor")
)
`;

// ../../../src/services/CT-tree-sitter/queries/jsx.ts
var jsx_default = `${javascript_default}

; === React Function Components (override JavaScript base patterns) ===

(
  (comment)* @doc
  .
  (function_declaration
    name: (identifier) @name.definition.function
    parameters: (formal_parameters) @parameters.definition.function
    body: (statement_block) @body.definition.function) @definition.function
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.function)
)

(
  (comment)* @doc
  .
  (lexical_declaration
    (variable_declarator
      name: (identifier) @name.definition.function
      value: (arrow_function
        parameters: (formal_parameters) @parameters.definition.function
      )
    )
  ) @definition.function
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.function)
)

(
  (comment)* @doc
  .
  (variable_declaration
    (variable_declarator
      name: (identifier) @name.definition.function
      value: (arrow_function
        parameters: (formal_parameters) @parameters.definition.function
      )
    )
  ) @definition.function
  (#strip! @doc "^[\\s\\*/]+|^[\\s\\*/]$")
  (#select-adjacent! @doc @definition.function)
)

; === JSX Elements ===

(jsx_element
  open_tag: (jsx_opening_element
    name: (identifier) @name.jsx_element)) @definition.jsx_element

(jsx_self_closing_element
  name: (identifier) @name.jsx_element) @definition.jsx_element

; === Array pattern destructuring (for useState hooks) ===

(lexical_declaration
  (variable_declarator
    name: (array_pattern) @array_pattern)) @definition.variable

(variable_declaration
  (variable_declarator
    name: (array_pattern) @array_pattern)) @definition.variable

; === Function calls (for hooks like useEffect) ===

(call_expression
  function: (identifier) @name.definition.function) @definition.function_call
`;

// ../../../src/services/CT-tree-sitter/queries/java.ts
var java_default = `
; Import declarations
(import_declaration
  (scoped_identifier) @name.definition.import) @definition.import

; Package declarations
(package_declaration
  (scoped_identifier) @name.definition.package) @definition.package

; Class declarations
(class_declaration
  name: (identifier) @name.definition.class) @definition.class

; Interface declarations
(interface_declaration
  name: (identifier) @name.definition.interface) @definition.interface

; Enum declarations
(enum_declaration
  name: (identifier) @name.definition.enum) @definition.enum

; Record declarations
(record_declaration
  name: (identifier) @name.definition.record) @definition.record

; Annotation type declarations
(annotation_type_declaration
  name: (identifier) @name.definition.annotation) @definition.annotation

; Annotation type element declarations (annotation methods)
(annotation_type_element_declaration
  name: (identifier) @name.definition.method) @definition.method

; Method declarations with parameters and body
(method_declaration
  name: (identifier) @name.definition.method
  parameters: (formal_parameters) @parameters.definition.method
  body: (block) @body.definition.method) @definition.method

; Abstract method declarations (interface methods without body)
(method_declaration
  name: (identifier) @name.definition.method
  parameters: (formal_parameters) @parameters.definition.method) @definition.method

; Constructor declarations
(constructor_declaration
  name: (identifier) @name.definition.constructor
  parameters: (formal_parameters) @parameters.definition.constructor
  body: (constructor_body) @body.definition.constructor) @definition.constructor

; Field declarations - handle multiple declarators
(field_declaration
  declarator: (variable_declarator
    name: (identifier) @name.definition.field)) @definition.field

; Enum constant declarations
(enum_declaration
  body: (enum_body
    (enum_constant
      name: (identifier) @name.definition.enum_constant))) @definition.enum_constant

; Static initializers
(static_initializer) @definition.static_initializer

; Instance initializers
(block) @definition.instance_initializer
`;

// ../../../src/services/CT-tree-sitter/queries/rust.ts
var rust_default = `
; Function definitions
(function_item
    name: (identifier) @name.definition.function
    parameters: (parameters) @parameters.definition.function
    body: (block) @body.definition.function) @definition.function

; Struct definitions and their fields
(struct_item
    name: (type_identifier) @name.definition.struct
    body: (field_declaration_list
        (field_declaration
            name: (field_identifier) @name.definition.struct_field)*)) @definition.struct

; Tuple struct definitions
(struct_item
    name: (type_identifier) @name.definition.struct
    body: (ordered_field_declaration_list)*) @definition.struct

; Unit struct definitions
(struct_item
    name: (type_identifier) @name.definition.struct) @definition.struct

; Enum definitions with variants
(enum_item
    name: (type_identifier) @name.definition.enum
    body: (enum_variant_list
        (enum_variant
            name: (identifier) @name.definition.enum_variant)*)) @definition.enum

; Trait definitions and their methods
(trait_item
    name: (type_identifier) @name.definition.trait
    body: (declaration_list
        (function_signature_item
            name: (identifier) @name.definition.trait_method)*)) @definition.trait

; Impl blocks (inherent implementation) and their methods
(impl_item
    type: (type_identifier) @name.definition.impl
    body: (declaration_list
        (function_item
            name: (identifier) @name.definition.method
            parameters: (parameters) @parameters.definition.method
            body: (block) @body.definition.method)*)) @definition.impl

; Trait implementations and their methods
(impl_item
    trait: (type_identifier) @name.definition.impl_trait
    type: (type_identifier) @name.definition.impl_for
    body: (declaration_list
        (function_item
            name: (identifier) @name.definition.method
            parameters: (parameters) @parameters.definition.method
            body: (block) @body.definition.method)*)) @definition.impl_trait

; Module definitions
(mod_item
    name: (identifier) @name.definition.module) @definition.module

; Macro definitions (macro_rules!)
(macro_definition
    name: (identifier) @name.definition.macro) @definition.macro

; Type aliases
(type_item
    name: (type_identifier) @name.definition.type_alias) @definition.type_alias

; Constants
(const_item
    name: (identifier) @name.definition.constant) @definition.constant

; Static items
(static_item
    name: (identifier) @name.definition.static) @definition.static

; Use declarations (imports)
(use_declaration) @definition.use_declaration

; Let bindings (local variables)
(let_declaration
    pattern: (identifier) @name.definition.variable) @definition.variable

; Associated functions and methods in impl blocks
(impl_item
    body: (declaration_list)*) @definition.method_container

; Function parameters capture
(function_item
    parameters: (parameters
        (parameter
            pattern: (identifier) @name.definition.parameter)*))

; Associated types in traits
(trait_item
    body: (declaration_list
        (associated_type
            name: (type_identifier) @name.definition.associated_type)*))

; Associated constants in traits and impls
(trait_item
    body: (declaration_list
        (const_item
            name: (identifier) @name.definition.trait_constant)*))

(impl_item
    body: (declaration_list
        (const_item
            name: (identifier) @name.definition.impl_constant)*))
`;

// ../../../src/services/CT-tree-sitter/queries/ruby.ts
var ruby_default = `
; Method definitions
(method
  name: (identifier) @name.definition.method) @definition.method

; Singleton methods
(singleton_method
  object: (_)
  name: (identifier) @name.definition.method) @definition.method

; Method aliases
(alias
  name: (_) @name.definition.method) @definition.method

; Class definitions
(class
  name: [
    (constant) @name.definition.class
    (scope_resolution
      name: (_) @name.definition.class)
  ]) @definition.class

; Singleton classes
(singleton_class
  value: [
    (constant) @name.definition.class
    (scope_resolution
      name: (_) @name.definition.class)
  ]) @definition.class

; Module definitions
(module
  name: [
    (constant) @name.definition.module
    (scope_resolution
      name: (_) @name.definition.module)
  ]) @definition.module

; Constants
(assignment
  left: (constant) @name.definition.constant) @definition.constant

; Global variables
(global_variable) @definition.global_variable

; Instance variables
(instance_variable) @definition.instance_variable

; Class variables
(class_variable) @definition.class_variable

; Symbols
(simple_symbol) @definition.symbol
(hash_key_symbol) @definition.symbol

; Blocks
(block) @definition.block
(do_block) @definition.block

; Basic mixin statements - capture all include/extend/prepend calls
(call
  method: (identifier) @_mixin_method
  arguments: (argument_list
    (constant) @name.definition.mixin)
  (#match? @_mixin_method "^(include|extend|prepend)$")) @definition.mixin

; Mixin module definition
(module
  name: (constant) @name.definition.mixin_module
  (#match? @name.definition.mixin_module ".*Module$")) @definition.mixin_module

; Mixin-related methods
(method
  name: (identifier) @name.definition.mixin_method
  (#match? @name.definition.mixin_method "(included|extended|prepended)_method")) @definition.mixin_method

; Singleton class blocks
(singleton_class) @definition.singleton_class

; Class methods in singleton context
(singleton_method
  object: (self)
  name: (identifier) @name.definition.singleton_method) @definition.singleton_method

; Attribute accessors
(call
  method: (identifier) @_attr_accessor
  arguments: (argument_list
    (_) @name.definition.attr_accessor)
  (#eq? @_attr_accessor "attr_accessor")) @definition.attr_accessor

(call
  method: (identifier) @_attr_reader
  arguments: (argument_list
    (_) @name.definition.attr_reader)
  (#eq? @_attr_reader "attr_reader")) @definition.attr_reader

(call
  method: (identifier) @_attr_writer
  arguments: (argument_list
    (_) @name.definition.attr_writer)
  (#eq? @_attr_writer "attr_writer")) @definition.attr_writer

; Class macros (Rails-like)
(call
  method: (identifier) @_macro_name
  arguments: (argument_list
    (_) @name.definition.class_macro)
  (#match? @_macro_name "^(has_many|belongs_to|has_one|validates|scope|before_action|after_action)$")) @definition.class_macro

; Exception handling
(begin) @definition.begin
(rescue) @definition.rescue
(ensure) @definition.ensure

; Keyword arguments
(keyword_parameter
  name: (identifier) @name.definition.keyword_parameter) @definition.keyword_parameter

; Splat operators
(splat_parameter) @definition.splat_parameter
(splat_argument) @definition.splat_argument

; Hash syntax variants
(pair
  key: (_) @name.definition.hash_key) @definition.hash_pair

; String interpolation - capture the string with interpolation and surrounding context
(assignment
  left: (identifier) @name.definition.string_var
  right: (string
    (interpolation))) @definition.string_interpolation

; Regular expressions - capture the regex pattern and assignment
(assignment
  left: (identifier) @name.definition.regex_var
  right: (regex)) @definition.regex_assignment

; Pattern matching - capture the entire case_match structure
(case_match) @definition.case_match

; Pattern matching - capture in_clause with hash pattern
(in_clause
  pattern: (hash_pattern)) @definition.hash_pattern_clause

; Endless methods - capture the method definition with name and surrounding context
(comment) @_endless_method_comment
(#match? @_endless_method_comment "Ruby 3.0\\+ endless method")
(method
  name: (identifier) @name.definition.endless_method
  body: (binary
    operator: "=")) @definition.endless_method

; Pin operator - capture the entire in_clause with variable_reference_pattern
(in_clause
  pattern: (variable_reference_pattern)) @definition.pin_pattern_clause

; Shorthand hash syntax - capture the method containing shorthand hash
(comment) @_shorthand_hash_comment
(#match? @_shorthand_hash_comment "Ruby 3.1\\+ shorthand hash syntax")
(method
  name: (identifier) @name.definition.shorthand_method) @definition.shorthand_method

; Shorthand hash syntax - capture the hash with shorthand syntax
(hash
  (pair
    (hash_key_symbol)
    ":")) @definition.shorthand_hash

; Capture larger contexts for features that need at least 4 lines

; Capture the entire program to include all comments and code
(program) @definition.program

; Capture all comments
(comment) @definition.comment

; Capture all method definitions
(method) @definition.method_all
`;

// ../../../src/services/CT-tree-sitter/queries/cpp.ts
var cpp_default = `
; Include directives
(preproc_include
  path: (_) @name.definition.include) @definition.include

; Function definitions
(function_definition
  declarator: (function_declarator
    declarator: (identifier) @name.definition.function
    parameters: (parameter_list) @parameters.definition.function)
  body: (compound_statement) @body.definition.function) @definition.function

; Function declarations (prototypes)
(declaration
  declarator: (function_declarator
    declarator: (identifier) @name.definition.function
    parameters: (parameter_list) @parameters.definition.function)) @definition.function

; Struct definitions with fields
(struct_specifier
  name: (type_identifier) @name.definition.struct
  body: (field_declaration_list) @body.definition.struct) @definition.struct

; Union definitions with fields
(union_specifier
  name: (type_identifier) @name.definition.union
  body: (field_declaration_list) @body.definition.union) @definition.union

; Enum definitions with values
(enum_specifier
  name: (type_identifier) @name.definition.enum
  body: (enumerator_list) @body.definition.enum) @definition.enum

; Typedef declarations
(type_definition
  declarator: (type_identifier) @name.definition.type) @definition.type

; Global variables
(declaration
  declarator: (identifier) @name.definition.variable) @definition.variable

(declaration
  declarator: (init_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  declarator: (init_declarator
    declarator: (array_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (pointer_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  declarator: (pointer_declarator
    declarator: (pointer_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (init_declarator
    declarator: (pointer_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (function_declarator
    declarator: (parenthesized_declarator
      (pointer_declarator
        declarator: (identifier) @name.definition.variable)))) @definition.variable

(declaration
  declarator: (array_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  declarator: (array_declarator
    declarator: (array_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (array_declarator
    declarator: (array_declarator
      declarator: (array_declarator
        declarator: (identifier) @name.definition.variable)))) @definition.variable

; Static variables
(declaration
  (storage_class_specifier) @storage
  declarator: (identifier) @name.definition.variable) @definition.variable

(declaration
  (storage_class_specifier) @storage
  declarator: (init_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  (storage_class_specifier) @storage
  declarator: (array_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  (storage_class_specifier) @storage
  declarator: (pointer_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

; Object-like macros
(preproc_def
  name: (identifier) @name.definition.macro) @definition.macro

; Function-like macros
(preproc_function_def
  name: (identifier) @name.definition.macro
  parameters: (preproc_params) @parameters.definition.macro) @definition.macro

; Field declarations (members)
(field_declaration
  declarator: (field_identifier) @name.definition.field) @definition.field

; Enum values/enumerators
(enumerator
  name: (identifier) @name.definition.enumerator) @definition.enumerator

; Parameter declarations
(parameter_declaration
  declarator: (identifier) @name.definition.parameter) @definition.parameter

; C++ specific constructs

; Destructor definitions
(function_definition
  declarator: (function_declarator
    declarator: (destructor_name) @name.definition.destructor
    parameters: (parameter_list) @parameters.definition.destructor)
  body: (compound_statement) @body.definition.destructor) @definition.destructor

; Operator overloading
(function_definition
  declarator: (function_declarator
    declarator: (operator_name) @name.definition.operator
    parameters: (parameter_list) @parameters.definition.operator)
  body: (compound_statement) @body.definition.operator) @definition.operator

; Method definitions (class/struct members)
(function_definition
  declarator: (function_declarator
    declarator: (field_identifier) @name.definition.method
    parameters: (parameter_list) @parameters.definition.method)
  body: (compound_statement) @body.definition.method) @definition.method

; Class definitions
(class_specifier
  name: (type_identifier) @name.definition.class
  body: (field_declaration_list) @body.definition.class) @definition.class

; Namespace definitions
(namespace_definition
  name: (namespace_identifier) @name.definition.namespace
  body: (declaration_list) @body.definition.namespace) @definition.namespace

; Template declarations
(template_declaration
  parameters: (template_parameter_list) @parameters.definition.template
  (class_specifier
    name: (type_identifier) @name.definition.template.class)) @definition.template

; Template function declarations
(template_declaration
  parameters: (template_parameter_list) @parameters.definition.template
  (function_definition
    declarator: (function_declarator
      declarator: (identifier) @name.definition.template.function))) @definition.template

; Typedef declarations
(type_definition
  declarator: (type_identifier) @name.definition.typedef) @definition.typedef

; Using declarations  
(using_declaration) @definition.using

; More variable patterns for pointers and references
(declaration
  declarator: (init_declarator
    declarator: (identifier) @name.definition.variable
    value: (_))) @definition.variable

; Additional pointer declarator patterns
(declaration
  type: (_)
  declarator: (pointer_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

; Reference variables (using & in type)
(declaration
  type: (_)
  declarator: (identifier) @name.definition.variable) @definition.variable
`;

// ../../../src/services/CT-tree-sitter/queries/c.ts
var c_default = `
; Include directives
(preproc_include
  path: (_) @name.definition.include) @definition.include

; Function definitions
(function_definition
  declarator: (function_declarator
    declarator: (identifier) @name.definition.function
    parameters: (parameter_list) @parameters.definition.function)
  body: (compound_statement) @body.definition.function) @definition.function

; Function declarations (prototypes)
(declaration
  declarator: (function_declarator
    declarator: (identifier) @name.definition.function
    parameters: (parameter_list) @parameters.definition.function)) @definition.function

; Struct definitions with fields
(struct_specifier
  name: (type_identifier) @name.definition.struct
  body: (field_declaration_list) @body.definition.struct) @definition.struct

; Union definitions with fields
(union_specifier
  name: (type_identifier) @name.definition.union
  body: (field_declaration_list) @body.definition.union) @definition.union

; Enum definitions with values
(enum_specifier
  name: (type_identifier) @name.definition.enum
  body: (enumerator_list) @body.definition.enum) @definition.enum

; Typedef declarations
(type_definition
  declarator: (type_identifier) @name.definition.type) @definition.type

; Global variables
(declaration
  declarator: (identifier) @name.definition.variable) @definition.variable

(declaration
  declarator: (init_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  declarator: (init_declarator
    declarator: (array_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (pointer_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  declarator: (pointer_declarator
    declarator: (pointer_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (init_declarator
    declarator: (pointer_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (function_declarator
    declarator: (parenthesized_declarator
      (pointer_declarator
        declarator: (identifier) @name.definition.variable)))) @definition.variable

(declaration
  declarator: (array_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  declarator: (array_declarator
    declarator: (array_declarator
      declarator: (identifier) @name.definition.variable))) @definition.variable

(declaration
  declarator: (array_declarator
    declarator: (array_declarator
      declarator: (array_declarator
        declarator: (identifier) @name.definition.variable)))) @definition.variable

; Static variables
(declaration
  (storage_class_specifier) @storage
  declarator: (identifier) @name.definition.variable) @definition.variable

(declaration
  (storage_class_specifier) @storage
  declarator: (init_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  (storage_class_specifier) @storage
  declarator: (array_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

(declaration
  (storage_class_specifier) @storage
  declarator: (pointer_declarator
    declarator: (identifier) @name.definition.variable)) @definition.variable

; Object-like macros
(preproc_def
  name: (identifier) @name.definition.macro) @definition.macro

; Function-like macros
(preproc_function_def
  name: (identifier) @name.definition.macro
  parameters: (preproc_params) @parameters.definition.macro) @definition.macro

; Field declarations (members)
(field_declaration
  declarator: (field_identifier) @name.definition.field) @definition.field

; Enum values/enumerators
(enumerator
  name: (identifier) @name.definition.enumerator) @definition.enumerator

; Parameter declarations
(parameter_declaration
  declarator: (identifier) @name.definition.parameter) @definition.parameter
`;

// ../../../src/services/CT-tree-sitter/queries/c-sharp.ts
var c_sharp_default = `
; Using directives
(using_directive) @name.definition.using

; Namespace declarations (including file-scoped)
(namespace_declaration
  name: (identifier) @name.definition.namespace)
(file_scoped_namespace_declaration
  name: (identifier) @name.definition.namespace)

; Class declarations (including generic, static, abstract, partial, nested)
(class_declaration
  name: (identifier) @name.definition.class)

; Interface declarations
(interface_declaration
  name: (identifier) @name.definition.interface)

; Struct declarations
(struct_declaration
  name: (identifier) @name.definition.struct)

; Enum declarations
(enum_declaration
  name: (identifier) @name.definition.enum)

; Record declarations
(record_declaration
  name: (identifier) @name.definition.record)

; Method declarations (including async, static, generic)
(method_declaration
  name: (identifier) @name.definition.method
  parameter_list: (parameter_list) @parameters.definition.method
  body: (block) @body.definition.method) @definition.method

; Property declarations
(property_declaration
  name: (identifier) @name.definition.property)

; Event declarations
(event_declaration
  name: (identifier) @name.definition.event)

; Delegate declarations
(delegate_declaration
  name: (identifier) @name.definition.delegate)

; Attribute declarations
(class_declaration
  (attribute_list
    (attribute
      name: (identifier) @name.definition.attribute)))

; Generic type parameters
(type_parameter_list
  (type_parameter
    name: (identifier) @name.definition.type_parameter))

; LINQ expressions
(query_expression) @name.definition.linq_expression
`;

// ../../../src/services/CT-tree-sitter/queries/go.ts
var go_default = `
; Package declarations
(package_clause
  (package_identifier) @name.definition.package)

; Import declarations
(import_declaration
  (import_spec_list
    (import_spec path: (_) @name.definition.import)))

; Const declarations
(const_declaration) @definition.const
(const_declaration
  (const_spec name: (identifier) @name.definition.const))

; Var declarations
(var_declaration) @definition.var
(var_declaration
  (var_spec name: (identifier) @name.definition.var))

; Interface declarations
(type_declaration) @definition.interface
(type_declaration
  (type_spec
    name: (type_identifier) @name.definition.interface
    type: (interface_type)))

; Struct declarations
(type_declaration) @definition.struct
(type_declaration
  (type_spec
    name: (type_identifier) @name.definition.struct
    type: (struct_type)))

; Type declarations
(type_declaration) @definition.type
(type_declaration
  (type_spec
    name: (type_identifier) @name.definition.type))

; Function declarations with result (parameter_list)
(function_declaration
  name: (identifier) @name.definition.function
  parameters: (parameter_list) @parameters.definition.function
  result: (parameter_list) @result.definition.function
  body: (block) @body.definition.function) @definition.function

; Function declarations with result (type_identifier)
(function_declaration
  name: (identifier) @name.definition.function
  parameters: (parameter_list) @parameters.definition.function
  result: (type_identifier) @result.definition.function
  body: (block) @body.definition.function) @definition.function

; Function declarations without result
(function_declaration
  name: (identifier) @name.definition.function
  parameters: (parameter_list) @parameters.definition.function
  body: (block) @body.definition.function) @definition.function

; Method declarations with result (parameter_list)
(method_declaration
  receiver: (parameter_list
  	(parameter_declaration
    	(pointer_type
        	(type_identifier) @class.definition.method
        )
    )
  ) @self.definition.method
  name: (field_identifier) @name.definition.method
  parameters: (parameter_list) @parameters.definition.method
  result: (parameter_list) @result.definition.method
  body: (block) @body.definition.method) @definition.method

; Method declarations with result (type_identifier)
(method_declaration
  receiver: (parameter_list
  	(parameter_declaration
    	(pointer_type
        	(type_identifier) @class.definition.method
        )
    )
  ) @self.definition.method
  name: (field_identifier) @name.definition.method
  parameters: (parameter_list) @parameters.definition.method
  result: (type_identifier) @result.definition.method
  body: (block) @body.definition.method) @definition.method

; Method declarations without result
(method_declaration
  receiver: (parameter_list
  	(parameter_declaration
    	(pointer_type
        	(type_identifier) @class.definition.method
        )
    )
  ) @self.definition.method
  name: (field_identifier) @name.definition.method
  parameters: (parameter_list) @parameters.definition.method
  body: (block) @body.definition.method) @definition.method

; Channel operations
(channel_type) @name.definition.channel

; Goroutine declarations
(go_statement) @name.definition.goroutine

; Defer statements
(defer_statement) @name.definition.defer

; Select statements
(select_statement) @name.definition.select
`;

// ../../../src/services/CT-tree-sitter/queries/swift.ts
var swift_default = `
; Import declarations
(import_declaration) @definition.import
(import_declaration
  (identifier) @name.definition.import)

; Class declarations (includes class, struct, enum, extension)
(class_declaration) @definition.class

; Class name capture (for class, struct, enum)
(class_declaration
  (type_identifier) @name.definition.class)

; Extension name capture (extension extends user_type)
(class_declaration
  "extension"
  (user_type
    (type_identifier) @name.definition.class))

; Protocol declarations
(protocol_declaration
  (type_identifier) @name.definition.protocol) @definition.protocol

; Function declarations (both methods and global functions)
(function_declaration
  (simple_identifier) @name.definition.method) @definition.method

; Property declarations (all property declarations)
(property_declaration
  (pattern
    (simple_identifier) @name.definition.property)) @definition.property

; Computed properties (property declarations with computed_property body)
(property_declaration
  (pattern
    (simple_identifier) @name.definition.computed_property)
  (computed_property)) @definition.computed_property

; Global variables and constants (property_declaration at top level)
(source_file
  (property_declaration
    (pattern
      (simple_identifier) @name.definition.global_var)) @definition.global_var)

; Initializers
(init_declaration
  "init" @name.definition.initializer) @definition.initializer

; Deinitializers
(deinit_declaration
  "deinit" @name.definition.deinitializer) @definition.deinitializer

; Type alias
(typealias_declaration
  (type_identifier) @name.definition.type_alias) @definition.type_alias

; Protocol function declarations
(protocol_function_declaration
  (simple_identifier) @name.definition.protocol_method) @definition.protocol_method
`;

// ../../../src/services/CT-tree-sitter/queries/kotlin.ts
var kotlin_default = `
; Based on actual tree-sitter-kotlin grammar
; Package declarations
(package_header
  (identifier) @name.definition.package) @definition.package

; Import declarations - capture the full import path including wildcards
(import_header) @definition.import
(import_header
  (identifier) @name.definition.import)

; Class declarations (includes all types: class, interface, object, enum, etc.)
(class_declaration
  (type_identifier) @name.definition.class) @definition.class

; Object declarations (try alternative naming)
(object_declaration
  (type_identifier) @name.definition.object) @definition.object

; Function declarations
(function_declaration
  (simple_identifier) @name.definition.function) @definition.function

; Property declarations
(property_declaration
  (variable_declaration
    (simple_identifier) @name.definition.property)
) @definition.property

; Type alias declarations
(type_alias
  (type_identifier) @name.definition.type_alias) @definition.type_alias

`;

// ../../../src/services/CT-tree-sitter/queries/css.ts
var css_default = `
; CSS\u89C4\u5219\u96C6\uFF08\u5305\u542B\u6240\u6709\u7C7B\u578B\u7684\u9009\u62E9\u5668\uFF09
(rule_set
  (selectors) @selectors.definition.rule
  (block) @body.definition.rule) @definition.rule

; CSS\u58F0\u660E\uFF08\u5C5E\u6027\uFF09- \u5904\u7406\u591A\u79CD\u503C\u7C7B\u578B
(declaration
  (property_name) @property.definition.declaration
  (plain_value) @value.definition.declaration) @definition.declaration

(declaration
  (property_name) @property.definition.declaration
  (color_value) @value.definition.declaration) @definition.declaration

(declaration
  (property_name) @property.definition.declaration
  (integer_value) @value.definition.declaration) @definition.declaration

; @import\u8BED\u53E5 - \u5B57\u7B26\u4E32\u5F62\u5F0F
(import_statement
  (string_value) @name.definition.import) @definition.import

; @import\u8BED\u53E5 - url()\u51FD\u6570\u5F62\u5F0F
(import_statement
  (call_expression
    (function_name) @func.definition.import
    (arguments
      (string_value) @name.definition.import))) @definition.import

; CSS\u51FD\u6570\u8C03\u7528\uFF08\u5728\u58F0\u660E\u503C\u4E2D\uFF09
(declaration
  (property_name) @property.definition.function
  (call_expression
    (function_name) @name.definition.function
    (arguments) @args.definition.function)) @definition.function

; @keyframes\u52A8\u753B
(keyframes_statement
  (keyframes_name) @name.definition.keyframes
  (keyframe_block_list) @body.definition.keyframes) @definition.keyframes

; @media\u67E5\u8BE2 - \u652F\u6301\u4E0D\u540C\u7C7B\u578B\u7684\u67E5\u8BE2
(media_statement
  (binary_query) @query.definition.media
  (block) @body.definition.media) @definition.media

(media_statement
  (feature_query) @query.definition.media
  (block) @body.definition.media) @definition.media

(media_statement
  (keyword_query) @query.definition.media
  (block) @body.definition.media) @definition.media
`;

// ../../../src/services/CT-tree-sitter/queries/elixir.ts
var elixir_default = String.raw`
; Module, Protocol, and Implementation definitions
(call
  target: (identifier) @function
  (arguments) @args
  (do_block)?
  (#match? @function "^(defmodule|defprotocol|defimpl)$")) @definition.module

; Function definitions
(call
  target: (identifier) @function
  (arguments) @args
  (do_block)?
  (#eq? @function "def")) @definition.function

; Macro definitions
(call
  target: (identifier) @function
  (arguments) @args
  (do_block)?
  (#eq? @function "defmacro")) @definition.macro

; Struct definitions
(call
  target: (identifier) @function
  (arguments (list))
  (#eq? @function "defstruct")) @definition.struct

; Guard definitions
(call
  target: (identifier) @function
  (arguments) @args
  (#eq? @function "defguard")) @definition.guard

; Behaviour callback definitions
(call
  target: (identifier) @function
  (arguments) @args
  (#eq? @function "@callback")) @definition.behaviour

; Sigils
(sigil
  (sigil_name)
  (quoted_content)) @definition.sigil

; Module attributes
(unary_operator
  operator: "@"
  operand: (call)) @definition.attribute

; Test definitions with string name and map args
(call
  target: (identifier) @function
  (arguments
    (string)
    (map))
  (#eq? @function "test")) @definition.test

; Pipeline operator usage
(binary_operator
  operator: "|>"
  left: (_) @left
  right: (_) @right) @definition.pipeline

; For comprehensions with generator and filter clauses
(call
  target: (identifier) @function
  (arguments) @args
  (do_block)?
  (#eq? @function "for")) @definition.for_comprehension`;

// ../../../src/services/CT-tree-sitter/queries/html.ts
var html_default = `
; Document structure
(document) @definition.document

; Void elements (self-closing) - using explicit element names for better readability
; Area element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "area"))
  (#not-has? end_tag)) @definition.void_element

; Base element  
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "base"))
  (#not-has? end_tag)) @definition.void_element

; Line break element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "br"))
  (#not-has? end_tag)) @definition.void_element

; Column element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "col"))
  (#not-has? end_tag)) @definition.void_element

; Embed element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "embed"))
  (#not-has? end_tag)) @definition.void_element

; Horizontal rule element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "hr"))
  (#not-has? end_tag)) @definition.void_element

; Image element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "img"))
  (#not-has? end_tag)) @definition.void_element

; Input element  
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "input"))
  (#not-has? end_tag)) @definition.void_element

; Link element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "link"))
  (#not-has? end_tag)) @definition.void_element

; Meta element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "meta"))
  (#not-has? end_tag)) @definition.void_element

; Parameter element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "param"))
  (#not-has? end_tag)) @definition.void_element

; Source element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "source"))
  (#not-has? end_tag)) @definition.void_element

; Track element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "track"))
  (#not-has? end_tag)) @definition.void_element

; Word break opportunity element
(element
  (start_tag
    (tag_name) @name.definition.void
    (#eq? @name.definition.void "wbr"))
  (#not-has? end_tag)) @definition.void_element

; Elements with content (exclude script and style)
(element
  (start_tag
    (tag_name) @name.definition)
  (#not-eq? @name.definition "script")
  (#not-eq? @name.definition "style")) @definition.element

; Script elements
(script_element
  (start_tag
    (tag_name) @name.definition)) @definition.script

; Style elements
(style_element
  (start_tag
    (tag_name) @name.definition)) @definition.style

; Attributes
(attribute
  (attribute_name) @name.definition) @definition.attribute

; Comments
(comment) @definition.comment

; Text content
(text) @definition.text

; Raw text content
(raw_text) @definition.raw_text

; Self-closing tags
(self_closing_tag
  (tag_name) @name.definition) @definition.self_closing_tag

; Doctype declarations
(doctype) @definition.doctype

; Multiple elements (parent with children)
(element
  (element)+) @definition.nested_elements
`;

// ../../../src/services/CT-tree-sitter/queries/lua.ts
var lua_default = String.raw`
; Function definitions
(function_definition_statement
  name: (identifier) @name.definition.function
  parameters: (parameters) @parameters.definition.function
  body: (block) @body.definition.function) @definition.function

(function_definition_statement
  name: (variable
    table: (identifier)
    field: (identifier) @name.definition.method)) @definition.method

(local_function_definition_statement
  name: (identifier) @name.definition.function) @definition.function

; Table constructors (class-like structures)
(local_variable_declaration
  (variable_list
    (variable name: (identifier) @name.definition.table))
  (expression_list
    value: (table))) @definition.table

; Variable declarations
(variable_assignment
  (variable_list
    (variable name: (identifier) @name.definition.variable))) @definition.variable

; Local variable declarations
(local_variable_declaration
  (variable_list
    (variable name: (identifier) @name.definition.variable))) @definition.variable
`;

// ../../../src/services/CT-tree-sitter/queries/ocaml.ts
var ocamlQuery = `
; Captures module definitions
(module_definition
  (module_binding
    name: (module_name) @name.definition)) @definition.module

; Captures type definitions
(type_definition
  (type_binding
    name: (type_constructor) @name.definition)) @definition.type

; Captures function definitions
(value_definition
  (let_binding
    pattern: (value_name) @name.definition
    (parameter))) @definition.function

; Captures class definitions
(class_definition
  (class_binding
    name: (class_name) @name.definition)) @definition.class

; Captures method definitions
(method_definition
  name: (method_name) @name.definition) @definition.method

; Captures value bindings
(value_definition
  (let_binding
    pattern: (value_name) @name.definition)) @definition.value
`;

// ../../../src/services/CT-tree-sitter/queries/toml.ts
var tomlQuery = `
; Tables - capture the entire table node
(table) @definition

; Array tables - capture the entire array table node
(table_array_element) @definition

; Key-value pairs - capture the entire pair
(pair) @definition

; Arrays and inline tables
(array) @definition
(inline_table) @definition

; Basic values
(string) @definition
(integer) @definition
(float) @definition
(boolean) @definition
(offset_date_time) @definition
(local_date) @definition
(local_time) @definition
`;

// ../../../src/services/CT-tree-sitter/queries/systemrdl.ts
var systemrdl_default = `
; Component declarations
(component_named_def
  type: (component_type)
  id: (id) @name.definition.component) @definition.component

; Field declarations
(component_anon_def
  type: (component_type (component_primary_type))
  body: (component_body
    (component_body_elem
      (property_assignment)))) @definition.field

; Property declarations
(property_definition
  (id) @name.definition.property) @definition.property

; Parameter declarations
(component_inst
  id: (id) @name.definition.parameter) @definition.parameter

; Enum declarations
(enum_def
  (id) @name.definition.enum) @definition.enum
`;

// ../../../src/services/CT-tree-sitter/queries/tlaplus.ts
var tlaplus_default = `
; Module declarations
(module
  name: (identifier) @name.definition.module) @definition.module

; Operator definitions with optional parameters
(operator_definition
  name: (identifier) @name.definition.operator
  parameter: (identifier)?) @definition.operator

; Function definitions with bounds
(function_definition
  name: (identifier) @name.definition.function
  (quantifier_bound)?) @definition.function

; Variable declarations
(variable_declaration
  (identifier) @name.definition.variable) @definition.variable

; Constant declarations
(constant_declaration
  (identifier) @name.definition.constant) @definition.constant
`;

// ../../../src/services/CT-tree-sitter/queries/zig.ts
var zigQuery = `
; Functions
(function_declaration) @function.definition

; Structs and containers
(variable_declaration
  (identifier) @name
  (struct_declaration)
) @container.definition

; Enums
(variable_declaration
  (identifier) @name
  (enum_declaration)
) @container.definition

; Variables and constants
(variable_declaration
  (identifier) @name
) @variable.definition
`;

// ../../../src/services/CT-tree-sitter/queries/embedded_template.ts
var embedded_template_default = `
; Code blocks - class, module, method definitions
(directive
  (code) @name.definition.code) @definition.directive

; Output blocks - expressions
(output_directive
  (code) @output.content) @output

; Comments - documentation and section markers
(comment_directive
  (comment) @name.definition.comment) @definition.comment
`;

// ../../../src/services/CT-tree-sitter/queries/elisp.ts
var elispQuery = `
; Function definitions - capture only name and actual function node
((function_definition
  name: (symbol) @name.definition.function) @_func
  (#match? @name.definition.function "^[^;]"))

; Macro definitions - capture only name and actual macro node
((macro_definition
  name: (symbol) @name.definition.macro) @_macro
  (#match? @name.definition.macro "^[^;]"))

; Custom forms - match defcustom specifically and avoid comments
((list
  . (symbol) @_def
  . (symbol) @name.definition.custom) @_custom
  (#eq? @_def "defcustom")
  (#match? @name.definition.custom "^[^;]"))

; Face definitions - match defface specifically and avoid comments
((list
  . (symbol) @_def
  . (symbol) @name.definition.face) @_face
  (#eq? @_def "defface")
  (#match? @name.definition.face "^[^;]"))

; Group definitions - match defgroup specifically and avoid comments
((list
  . (symbol) @_def
  . (symbol) @name.definition.group) @_group
  (#eq? @_def "defgroup")
  (#match? @name.definition.group "^[^;]"))

; Advice definitions - match defadvice specifically and avoid comments
((list
  . (symbol) @_def
  . (symbol) @name.definition.advice) @_advice
  (#eq? @_def "defadvice")
  (#match? @name.definition.advice "^[^;]"))
`;

// ../../../src/services/CT-tree-sitter/languageParser.ts
async function loadLanguage(langName) {
  return await import_web_tree_sitter.default.Language.load(path.join(__dirname, `tree-sitter-${langName}.wasm`));
}
var isParserInitialized = false;
async function initializeParser() {
  if (!isParserInitialized) {
    await import_web_tree_sitter.default.init();
    isParserInitialized = true;
  }
}
async function loadRequiredLanguageParsers(filesToParse) {
  await initializeParser();
  const extensionsToLoad = new Set(filesToParse.map((file) => path.extname(file).toLowerCase().slice(1)));
  const parsers = {};
  for (const ext of extensionsToLoad) {
    let language;
    let query;
    let parserKey = ext;
    switch (ext) {
      case "js":
      case "json":
        language = await loadLanguage("javascript");
        query = language.query(javascript_default);
        break;
      case "jsx":
        language = await loadLanguage("javascript");
        query = language.query(jsx_default);
        break;
      case "ts":
        language = await loadLanguage("typescript");
        query = language.query(typescript_default);
        break;
      case "tsx":
        language = await loadLanguage("tsx");
        query = language.query(tsx_default);
        break;
      case "py":
        language = await loadLanguage("python");
        query = language.query(python_default);
        break;
      case "rs":
        language = await loadLanguage("rust");
        query = language.query(rust_default);
        break;
      case "go":
        language = await loadLanguage("go");
        query = language.query(go_default);
        break;
      case "cpp":
      case "hpp":
        language = await loadLanguage("cpp");
        query = language.query(cpp_default);
        break;
      case "c":
      case "h":
        language = await loadLanguage("c");
        query = language.query(c_default);
        break;
      case "cs":
        language = await loadLanguage("c_sharp");
        query = language.query(c_sharp_default);
        break;
      case "rb":
        language = await loadLanguage("ruby");
        query = language.query(ruby_default);
        break;
      case "java":
        language = await loadLanguage("java");
        query = language.query(java_default);
        break;
      case "php":
        language = await loadLanguage("php");
        query = language.query(php_default);
        break;
      case "swift":
        language = await loadLanguage("swift");
        query = language.query(swift_default);
        break;
      case "kt":
      case "kts":
        language = await loadLanguage("kotlin");
        query = language.query(kotlin_default);
        break;
      case "css":
        language = await loadLanguage("css");
        query = language.query(css_default);
        break;
      case "html":
        language = await loadLanguage("html");
        query = language.query(html_default);
        break;
      case "ml":
      case "mli":
        language = await loadLanguage("ocaml");
        query = language.query(ocamlQuery);
        break;
      case "scala":
        language = await loadLanguage("scala");
        query = language.query(lua_default);
        break;
      case "sol":
        language = await loadLanguage("solidity");
        query = language.query(solidityQuery);
        break;
      case "toml":
        language = await loadLanguage("toml");
        query = language.query(tomlQuery);
        break;
      case "vue":
        language = await loadLanguage("vue");
        query = language.query(vueQuery);
        break;
      case "lua":
        language = await loadLanguage("lua");
        query = language.query(lua_default);
        break;
      case "rdl":
        language = await loadLanguage("systemrdl");
        query = language.query(systemrdl_default);
        break;
      case "tla":
        language = await loadLanguage("tlaplus");
        query = language.query(tlaplus_default);
        break;
      case "zig":
        language = await loadLanguage("zig");
        query = language.query(zigQuery);
        break;
      case "ejs":
      case "erb":
        language = await loadLanguage("embedded_template");
        parserKey = "embedded_template";
        query = language.query(embedded_template_default);
        break;
      case "el":
        language = await loadLanguage("elisp");
        query = language.query(elispQuery);
        break;
      case "ex":
      case "exs":
        language = await loadLanguage("elixir");
        query = language.query(elixir_default);
        break;
      default:
        throw new Error(`Unsupported language: ${ext}`);
    }
    const parser = new import_web_tree_sitter.default();
    parser.setLanguage(language);
    parsers[parserKey] = { parser, query };
  }
  return parsers;
}

// ../autocompletion/v2/utils/processUtils.ts
var symbolPairs = {
  "(": ")",
  "[": "]",
  "{": "}",
  // '<': '>',
  "'": "'",
  '"': '"',
  "`": "`"
};
var openSymbols = new Set(Object.keys(symbolPairs));
var closeSymbols = new Set(Object.values(symbolPairs));
function findFirstMatchingCloseSymbol(fullStr, splitStr) {
  const splitIndex = fullStr.indexOf(splitStr);
  if (splitIndex === -1) {
    return { closeSymbol: "", suffixPrefix: "" };
  }
  const partA = fullStr.substring(0, splitIndex);
  const partB = fullStr.substring(splitIndex + splitStr.length);
  const stackA = [];
  for (let i2 = 0; i2 < partA.length; i2++) {
    const char = partA[i2];
    if (char === "\\") {
      i2++;
      continue;
    }
    if (openSymbols.has(char)) {
      if ((char === "'" || char === '"' || char === "`") && stackA.length > 0 && stackA[stackA.length - 1] === char) {
        stackA.pop();
      } else {
        stackA.push(char);
      }
    } else if (closeSymbols.has(char)) {
      if (stackA.length === 0) continue;
      const lastOpen = stackA[stackA.length - 1];
      if (symbolPairs[lastOpen] === char) {
        stackA.pop();
      }
    }
  }
  if (stackA.length === 0) {
    return { closeSymbol: "", suffixPrefix: "" };
  }
  const lastOpenSymbol = stackA[stackA.length - 1];
  const expectedCloseSymbol = symbolPairs[lastOpenSymbol];
  const stackB = [];
  for (let i2 = 0; i2 < partB.length; i2++) {
    const char = partB[i2];
    if (char === "\\") {
      i2++;
      continue;
    }
    if (stackB.length === 0 && char === expectedCloseSymbol) {
      return { closeSymbol: char, suffixPrefix: partB.slice(0, i2) };
    }
    if (openSymbols.has(char)) {
      if ((char === "'" || char === '"' || char === "`") && stackB.length > 0 && stackB[stackB.length - 1] === char) {
        stackB.pop();
      } else {
        stackB.push(char);
      }
    } else if (closeSymbols.has(char)) {
      if (stackB.length === 0) continue;
      const lastOpen = stackB[stackB.length - 1];
      if (symbolPairs[lastOpen] === char) {
        stackB.pop();
      }
    }
  }
  return { closeSymbol: "", suffixPrefix: "" };
}
function findMaxOverlap(str1, str2) {
  if (str1 === "" || str2 === "") return "";
  let maxOverlap = "";
  for (let len = Math.min(str1.length, str2.length); len > 0; len--) {
    const suffix = str1.substring(str1.length - len);
    const prefix = str2.substring(0, len);
    if (suffix === prefix) {
      maxOverlap = suffix;
      break;
    }
  }
  if (maxOverlap === "") {
    const str2Trimmed = str2.trimStart();
    for (let len = Math.min(str1.length, str2Trimmed.length); len > 0; len--) {
      const suffix = str1.substring(str1.length - len);
      const prefix = str2Trimmed.substring(0, len);
      if (suffix === prefix) {
        maxOverlap = suffix;
        break;
      }
    }
  }
  return maxOverlap;
}
function getStringBeforeCloseSymbol(str, closeSymbol) {
  if (!closeSymbols.has(closeSymbol)) {
    return "";
  }
  const stack = [];
  let result = "";
  for (let i2 = 0; i2 < str.length; i2++) {
    const char = str[i2];
    if (char === "\\") {
      result += char;
      if (i2 + 1 < str.length) {
        result += str[++i2];
      }
      continue;
    }
    if (stack.length === 0 && char === closeSymbol) {
      return result;
    }
    if (openSymbols.has(char)) {
      if ((char === "'" || char === '"' || char === "`") && stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (closeSymbols.has(char)) {
      if (stack.length > 0) {
        const lastOpen = stack[stack.length - 1];
        if (symbolPairs[lastOpen] === char) {
          stack.pop();
        }
      }
    }
    result += char;
  }
  return result;
}
function postProcessCompletionSynthesis(completion, prefix, suffix, closeSymbolChar, suffixPrefixString) {
  if (closeSymbolChar && closeSymbolChar.length > 0) {
    let cutCompletion = getStringBeforeCloseSymbol(completion, closeSymbolChar);
    let commonSubstring = findMaxOverlap(cutCompletion, suffixPrefixString);
    completion = cutCompletion.slice(0, cutCompletion.length - commonSubstring.length);
  } else {
    let commonSubstring = findMaxOverlap(completion, suffix);
    if (commonSubstring.length >= 10) {
      completion = completion.slice(0, completion.length - commonSubstring.length);
    }
  }
  return completion;
}
function isInsideWord(prefix, suffix, logCallback) {
  const charBefore = prefix.length > 0 ? prefix[prefix.length - 1] : "";
  const charAfter = suffix.length > 0 ? suffix[0] : "";
  const isLetter = (char) => {
    if (char.length !== 1) return false;
    const code = char.charCodeAt(0);
    return code >= 65 && code <= 90 || // A-Z
    code >= 97 && code <= 122;
  };
  const hasLetterBefore = isLetter(charBefore);
  const hasLetterAfter = isLetter(charAfter);
  if (hasLetterBefore && hasLetterAfter) {
    if (logCallback) {
      logCallback(`Skipping completion: cursor inside word (${charBefore}|${charAfter})`);
    }
    return true;
  }
  return false;
}

// ../autocompletion/v2/capturesProcess/general.ts
var import_path = __toESM(require("path"));
var import_crypto = __toESM(require("crypto"));

// ../autocompletion/v2/Logger.ts
var logLevelPriorityMap = {
  ["DEBUG" /* Debug */]: 0,
  ["INFO" /* Info */]: 1,
  ["WARN" /* Warn */]: 2,
  ["ERROR" /* Error */]: 3
};
var Logger = class _Logger {
  static _instance = null;
  prefix = "";
  level = "WARN" /* Warn */;
  constructor(prefix, level) {
    if (prefix) {
      this.prefix = prefix;
    }
    if (level) {
      this.level = level;
    }
  }
  static getDefaultLogger() {
    if (!_Logger._instance) {
      _Logger._instance = new _Logger();
    }
    return _Logger._instance;
  }
  static setDefaultLogger(logger) {
    _Logger._instance = logger;
  }
  debug(message, ...optionalParams) {
    if (logLevelPriorityMap[this.level] <= logLevelPriorityMap["DEBUG" /* Debug */]) {
      console.debug(`${this.prefix}${message} ${optionalParams.join(" ")}`);
    }
  }
  info(message, ...optionalParams) {
    if (logLevelPriorityMap[this.level] <= logLevelPriorityMap["INFO" /* Info */]) {
      console.log(`${this.prefix}${message} ${optionalParams.join(" ")}`);
    }
  }
  warn(message, ...optionalParams) {
    if (logLevelPriorityMap[this.level] <= logLevelPriorityMap["WARN" /* Warn */]) {
      console.warn(`${this.prefix}${message} ${optionalParams.join(" ")}`);
    }
  }
  error(message, ...optionalParams) {
    if (logLevelPriorityMap[this.level] <= logLevelPriorityMap["ERROR" /* Error */]) {
      console.error(`${this.prefix}${message} ${optionalParams.join(" ")}`);
    }
  }
  with(prefix) {
    return new _Logger(this.prefix + prefix + " ");
  }
};

// ../autocompletion/v2/capturesProcess/general.ts
function isFunctionNode(node) {
  const functionTypes = [
    "function_declaration",
    "function_definition",
    // Go
    "method_declaration",
    // Go methods
    "method_definition",
    // Class methods
    "arrow_function",
    "function_expression"
  ];
  return functionTypes.includes(node.type);
}
function isClassNode(node) {
  const classTypes = [
    "class_declaration",
    "class_definition",
    "interface_declaration",
    "struct_specifier"
    // C++ structs
  ];
  return classTypes.includes(node.type);
}
function findIdentifierInNode(node) {
  const identifierTypes = /* @__PURE__ */ new Set([
    "identifier",
    "name",
    "property_identifier",
    "field_identifier",
    "method_name",
    "function_name",
    "class_name",
    "type_identifier"
  ]);
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && identifierTypes.has(child.type)) {
      return child;
    }
  }
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child) {
      const found = findIdentifierInNode(child);
      if (found) return found;
    }
  }
  return null;
}
function isScopeNode(node) {
  const scopeTypes = /* @__PURE__ */ new Set([
    "function_declaration",
    "method_definition",
    "arrow_function",
    "function_expression",
    "class_declaration",
    "interface_declaration",
    "namespace_declaration",
    "module_declaration",
    "function_definition",
    "class_definition"
  ]);
  return scopeTypes.has(node.type);
}
function extractScopeName(node) {
  const identifierNode = findIdentifierInNode(node);
  if (identifierNode) {
    return node.text.substring(
      identifierNode.startIndex - node.startIndex,
      identifierNode.endIndex - node.startIndex
    );
  }
  return node.type;
}
function generateSnippetHash(filePath, startLine, endLine, rangeText) {
  const content = `${filePath}:${startLine}-${endLine}:${rangeText.substring(0, 100)}`;
  return import_crypto.default.createHash("sha256").update(content).digest("hex").substring(0, 16);
}
function extractSymbolName(node, sourceCode) {
  const identifierNode = findIdentifierInNode(node);
  if (identifierNode) {
    return sourceCode.substring(identifierNode.startIndex, identifierNode.endIndex);
  }
  return `${node.type}_${node.startPosition.row + 1}`;
}
function buildScopeChain(node) {
  const scope = [];
  let current = node.parent;
  while (current) {
    if (isScopeNode(current)) {
      const scopeName = extractScopeName(current);
      if (scopeName) {
        scope.unshift(scopeName);
      }
    }
    current = current.parent;
  }
  return scope;
}
function determineSnippetTypeFromCapture(capture, allowedTypes) {
  const captureTypeMap = {
    import: "import_or_include" /* ImportOrInclude */,
    "import.statement": "import_or_include" /* ImportOrInclude */,
    "function.definition": "function_or_method" /* FunctionOrMethod */,
    "class.definition": "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
    "method.definition": "function_or_method" /* FunctionOrMethod */,
    "variable.definition": "variable_or_constant" /* VariableOrConstant */
  };
  const mappedType = captureTypeMap[capture.name];
  if (mappedType && allowedTypes.includes(mappedType)) {
    return mappedType;
  }
  if (capture.node.type.includes("import") && allowedTypes.includes("import_or_include" /* ImportOrInclude */)) {
    return "import_or_include" /* ImportOrInclude */;
  }
  if (isFunctionNode(capture.node) && allowedTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    return "function_or_method" /* FunctionOrMethod */;
  }
  if (isClassNode(capture.node) && allowedTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    return "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */;
  }
  return allowedTypes[0];
}
function createSnippetFromQueryCapture(capture, allCaptures, sourceCode, lines, filePath, fileHash, snippetTypes, options, seenHashes) {
  const node = capture.node;
  const startLine = node.startPosition.row + 1;
  const endLine = node.endPosition.row + 1;
  const startColumn = node.startPosition.column;
  const endColumn = node.endPosition.column;
  const lineCount = endLine - startLine + 1;
  if (lineCount < Math.max(1, options.minSnippetLines - 2) || lineCount > options.maxSnippetLines * 2) {
    return null;
  }
  const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
  const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
  if (seenHashes.has(snippetHash)) {
    return null;
  }
  seenHashes.add(snippetHash);
  const name2 = extractSymbolName(node, sourceCode);
  const scope = buildScopeChain(node);
  const snippetType = determineSnippetTypeFromCapture(capture, snippetTypes);
  return {
    name: name2,
    type: snippetType,
    filePath,
    startLine,
    endLine,
    startColumn,
    endColumn,
    rangeText,
    scope,
    fileHash
  };
}
async function extractSnippetsFromCapturesForGeneral(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForGeneral]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  const lines = sourceCode.split("\n");
  try {
    logger.info(`[CodeContext] Starting query execution for: ${import_path.default.basename(filePath)}`);
    logger.info(`[CodeContext] Query found ${captures.length} captures`);
    const capturesByType = /* @__PURE__ */ new Map();
    captures.forEach((capture) => {
      const captureType = capture.name;
      if (!capturesByType.has(captureType)) {
        capturesByType.set(captureType, []);
      }
      capturesByType.get(captureType).push(capture);
    });
    logger.info(`[CodeContext] Capture types found:`, Array.from(capturesByType.keys()));
    for (const [captureType, captureList] of capturesByType) {
      logger.info(`[CodeContext] Processing ${captureList.length} ${captureType} captures`);
      for (const capture of captureList) {
        const snippet = createSnippetFromQueryCapture(
          capture,
          captures,
          sourceCode,
          lines,
          filePath,
          fileHash,
          snippetTypes,
          options,
          seenHashes
        );
        if (snippet) {
          snippets.push(snippet);
          logger.info(
            `"[CodeContext] Created snippet: ${snippet.name} (${snippet.startLine}-${snippet.endLine}) from ${captureType}`
          );
        }
      }
    }
    logger.info(`[CodeContext] Total snippets extracted: ${snippets.length}`);
  } catch (error) {
    logger.error(`[CodeContext] Error executing query:`, error);
  }
  return snippets;
}

// ../autocompletion/v2/capturesProcess/go.ts
async function extractSnippetsFromCapturesForGo(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForGo]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  const functionCaptureNames = /* @__PURE__ */ new Set([
    "name.definition.function",
    "name.definition.method",
    "parameters.definition.function",
    "body.definition.function",
    "definition.function"
  ]);
  const functionNodeMap = /* @__PURE__ */ new Map();
  captures.forEach((capture) => {
    if (functionCaptureNames.has(capture.name)) {
      const node = capture.node;
      const key = `${node.startIndex}:${node.endIndex}`;
      if (!functionNodeMap.has(key)) {
        functionNodeMap.set(key, capture);
      }
    }
  });
  captures.forEach((capture) => {
    if (capture.name === "name.definition.import") {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) return;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      const scope = buildScopeChain(node);
      snippets.push({
        name: name2,
        type: "import_or_include" /* ImportOrInclude */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        scope,
        fileHash
      });
    }
  });
  for (const capture of captures) {
    if (capture.name !== "definition.function" && capture.name !== "definition.method") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const isMethod = capture.name === "definition.method";
    const nameCap = captures.find(
      (c) => c.name === (isMethod ? "name.definition.method" : "name.definition.function") && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const paramCaps = captures.filter(
      (c) => c.name === (isMethod ? "parameters.definition.method" : "parameters.definition.function") && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const parameters = paramCaps.map((paramCap) => ({
      name: sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex)
    }));
    const bodyCap = captures.find(
      (c) => c.name === (isMethod ? "body.definition.method" : "body.definition.function") && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    let rangeText;
    let implementText = void 0;
    if (bodyCap) {
      rangeText = sourceCode.substring(node.startIndex, bodyCap.node.startIndex).trimEnd();
      implementText = sourceCode.substring(node.startIndex, node.endIndex);
    } else {
      rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    }
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const resultCap = captures.find(
      (c) => c.name === (isMethod ? "result.definition.method" : "result.definition.function") && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    let returnType = "";
    if (resultCap) {
      returnType = sourceCode.substring(resultCap.node.startIndex, resultCap.node.endIndex).trim();
    }
    const paramStr = parameters.map((p) => p.name).join(", ");
    const signature = `${name2}(${paramStr})`;
    const scope = buildScopeChain(node);
    let field = void 0;
    if (isMethod) {
      const selfCap = captures.find(
        (c) => c.name === "self.definition.method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      if (selfCap) {
        const classCap = captures.find(
          (c) => c.name === "class.definition.method" && c.node.startIndex >= selfCap.node.startIndex && c.node.endIndex <= selfCap.node.endIndex
        );
        if (classCap) {
          field = sourceCode.substring(classCap.node.startIndex, classCap.node.endIndex);
        }
      }
    }
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: node.type,
        parameters,
        returnType
      },
      parameters,
      signature,
      language: "go" /* Go */,
      ...implementText ? { implementText } : {}
    });
  }
  const typeDefs = [
    { capture: "name.definition.struct", outlineType: "struct" },
    { capture: "name.definition.interface", outlineType: "interface" },
    { capture: "name.definition.type", outlineType: "type" }
  ];
  for (const { capture, outlineType } of typeDefs) {
    const defCaptureName = `definition.${outlineType}`;
    for (const cap of captures.filter((c) => c.name === capture)) {
      const node = cap.node;
      const isInFunc = captures.some(
        (fc) => (fc.name === "definition.function" || fc.name === "definition.method") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
      );
      if (isInFunc) continue;
      const defCap = captures.find(
        (c) => c.name === defCaptureName && c.node.startIndex <= node.startIndex && node.endIndex <= c.node.endIndex
      );
      const rangeText = defCap ? sourceCode.substring(defCap.node.startIndex, defCap.node.endIndex) : sourceCode.substring(node.startIndex, node.endIndex);
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      snippets.push({
        name: name2,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        implementText: rangeText,
        scope: [],
        fileHash,
        field: "",
        definition: { name: name2, type: outlineType },
        language: "go" /* Go */
      });
    }
  }
  const varDefs = [
    { capture: "name.definition.const", outlineType: "const" },
    { capture: "name.definition.var", outlineType: "var" }
  ];
  for (const { capture, outlineType } of varDefs) {
    const defCaptureName = `definition.${outlineType}`;
    for (const cap of captures.filter((c) => c.name === capture)) {
      const node = cap.node;
      const isInFunc = captures.some(
        (fc) => (fc.name === "definition.function" || fc.name === "definition.method") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
      );
      if (isInFunc) continue;
      const defCap = captures.find(
        (c) => c.name === defCaptureName && c.node.startIndex <= node.startIndex && node.endIndex <= c.node.endIndex
      );
      const rangeText = defCap ? sourceCode.substring(defCap.node.startIndex, defCap.node.endIndex) : sourceCode.substring(node.startIndex, node.endIndex);
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      snippets.push({
        name: name2,
        type: "variable_or_constant" /* VariableOrConstant */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        implementText: rangeText,
        scope: [],
        fileHash,
        field: "",
        definition: { name: name2, type: outlineType },
        language: "go" /* Go */
      });
    }
  }
  return snippets.filter((snippet) => snippetTypes.includes(snippet.type)).sort((a, b) => a.startLine - b.startLine);
}
function buildSummaryFromSnippets(snippets) {
  const outline = [];
  const isGlobal = (s) => !s.scope || s.scope.length === 0 || s.scope.every((x) => !x);
  for (const s of snippets) {
    if (!isGlobal(s)) continue;
    if (s.type === "import_or_include" /* ImportOrInclude */) {
      outline.push({
        type: "import",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.definitionText
      });
    } else if (s.type === "function_or_method" /* FunctionOrMethod */) {
      if (s.field) {
        outline.push({
          type: "method",
          name: s.name,
          file: s.filePath,
          field: s.field,
          description: s.definitionText
        });
      } else {
        outline.push({
          type: "function",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.definitionText
        });
      }
    } else if (s.type === "variable_or_constant" /* VariableOrConstant */) {
      const t = s.definition?.type === "const" ? "const" : "var";
      outline.push({
        type: t,
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.definitionText
      });
    } else if (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */) {
      const t = s.definition?.type || "type";
      outline.push({
        type: t,
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.definitionText
      });
    }
  }
  return outline;
}
function formatOutlineText(outline) {
  const groups = {};
  for (const entry of outline) {
    const key = entry.field ?? "";
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  let result = "";
  for (const field of Object.keys(groups).sort()) {
    const group = groups[field];
    const title = field === "" ? "[global]" : `[${field}]`;
    result += title + "\n";
    for (const entry of group) {
      let line = `  ${entry.type}`;
      if (entry.description) line += `: ${entry.description.replace(/\n/g, " ")}`;
      result += line + "\n";
    }
    result += "\n";
  }
  return result.trimEnd();
}

// ../autocompletion/v2/capturesProcess/python.ts
async function extractSnippetsFromCapturesForPython(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  const classCaptures = captures.filter((c) => c.name === "definition.class").map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    nameCap: captures.find(
      (nc) => nc.name === "name.definition.class" && nc.node.startIndex >= c.node.startIndex && nc.node.endIndex <= c.node.endIndex
    )
  }));
  for (const capture of captures) {
    if (capture.name !== "definition.function") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const paramCap = captures.find(
      (c) => c.name === "parameters.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const parameters = [];
    if (paramCap) {
      const paramText = sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex);
      const cleanParams = paramText.replace(/^\(|\)$/g, "").trim();
      if (cleanParams) {
        const paramList = splitPythonParameters(cleanParams);
        parameters.push(...paramList.map((param) => ({ name: param })));
      }
    }
    const bodyCap = captures.find(
      (c) => c.name === "body.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    let definitionText;
    let implementText = void 0;
    if (bodyCap) {
      const functionHeader = sourceCode.substring(node.startIndex, bodyCap.node.startIndex).trimEnd();
      definitionText = functionHeader.endsWith(":") ? functionHeader : functionHeader + ":";
      implementText = sourceCode.substring(node.startIndex, node.endIndex);
    } else {
      definitionText = sourceCode.substring(node.startIndex, node.endIndex);
    }
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    let field = void 0;
    for (const cls of classCaptures) {
      if (node.startIndex > cls.start && node.endIndex <= cls.end && cls.nameCap) {
        field = sourceCode.substring(cls.nameCap.node.startIndex, cls.nameCap.node.endIndex);
        break;
      }
    }
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const paramStr = parameters.map((p) => p.name).join(", ");
    const signature = `${name2}(${paramStr})`;
    const scope = buildScopeChain(node);
    let functionType = "function";
    const nodeText = sourceCode.substring(node.startIndex, Math.min(node.startIndex + 100, node.endIndex));
    if (nodeText.includes("async def")) functionType = "async function";
    if (field) functionType = "method";
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: functionType,
        parameters,
        returnType: ""
        // Python没有显式返回类型（除非有类型注解）
      },
      parameters,
      signature,
      language: "python" /* Python */,
      ...implementText ? { implementText } : {}
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.class") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name.definition.class" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      definition: {
        name: name2,
        type: "class"
      },
      language: "python" /* Python */
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.variable") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const memberVarCaps = captures.filter(
      (c) => c.name === "name.definition.member_variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const regularVarCaps = captures.filter(
      (c) => c.name === "name.definition.variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const allVarCaps = [...memberVarCaps, ...regularVarCaps];
    if (allVarCaps.length === 0) continue;
    for (const nameCap of allVarCaps) {
      const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
      const isMemberVar = nameCap.name === "name.definition.member_variable";
      if (!isMemberVar) {
        const isInFunction = captures.some(
          (fc) => fc.name === "definition.function" && fc.node.startIndex < nameCap.node.startIndex && nameCap.node.endIndex < fc.node.endIndex
        );
        if (isInFunction) continue;
      }
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      let field = void 0;
      for (const cls of classCaptures) {
        if (nameCap.node.startIndex > cls.start && nameCap.node.endIndex <= cls.end && cls.nameCap) {
          field = sourceCode.substring(cls.nameCap.node.startIndex, cls.nameCap.node.endIndex);
          break;
        }
      }
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText + name2);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const scope = buildScopeChain(nameCap.node);
      snippets.push({
        name: name2,
        type: "variable_or_constant" /* VariableOrConstant */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        scope,
        fileHash,
        field,
        definition: {
          name: name2,
          type: field ? "member_variable" : "global_variable"
        },
        language: "python" /* Python */
      });
    }
  }
  const importDefs = captures.filter((c) => c.name === "definition.import");
  for (const nameCap of captures.filter((c) => c.name === "name.definition.import")) {
    const defCap = importDefs.find(
      (def) => nameCap.node.startIndex >= def.node.startIndex && nameCap.node.endIndex <= def.node.endIndex
    );
    if (!defCap) continue;
    const node = defCap.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, name2);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      type: "import_or_include" /* ImportOrInclude */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      language: "python" /* Python */
    });
  }
  return snippets.filter((snippet) => snippetTypes.includes(snippet.type)).sort((a, b) => a.startLine - b.startLine);
}
function splitPythonParameters(params) {
  const result = [];
  let current = "";
  let parenDepth = 0;
  let bracketDepth = 0;
  let braceDepth = 0;
  let inString = false;
  let stringChar = "";
  for (let i2 = 0; i2 < params.length; i2++) {
    const char = params[i2];
    const prevChar = i2 > 0 ? params[i2 - 1] : "";
    if (!inString && (char === '"' || char === "'" || char === "`")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && prevChar !== "\\") {
      inString = false;
      stringChar = "";
    }
    if (!inString) {
      if (char === "(") parenDepth++;
      else if (char === ")") parenDepth--;
      else if (char === "[") bracketDepth++;
      else if (char === "]") bracketDepth--;
      else if (char === "{") braceDepth++;
      else if (char === "}") braceDepth--;
      else if (char === "," && parenDepth === 0 && bracketDepth === 0 && braceDepth === 0) {
        if (current.trim()) {
          result.push(current.trim());
        }
        current = "";
        continue;
      }
    }
    current += char;
  }
  if (current.trim()) {
    result.push(current.trim());
  }
  return result;
}
function buildSummaryFromSnippets2(snippets) {
  const outline = [];
  for (const s of snippets) {
    const isTopLevelFunction = s.type === "function_or_method" /* FunctionOrMethod */ && !s.field && (!s.scope || s.scope.length === 0);
    const isClassOrGlobalVar = (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */ || s.type === "variable_or_constant" /* VariableOrConstant */) && !s.scope?.some((scopeItem) => scopeItem.startsWith("function"));
    const isMethodOrMemberVar = !!s.field;
    const isImport = s.type === "import_or_include" /* ImportOrInclude */;
    if (!(isTopLevelFunction || isClassOrGlobalVar || isMethodOrMemberVar || isImport)) {
      continue;
    }
    if (s.type === "import_or_include" /* ImportOrInclude */) {
      outline.push({
        type: "import",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.definitionText
      });
    } else if (s.type === "function_or_method" /* FunctionOrMethod */) {
      if (s.field) {
        outline.push({
          type: "method",
          name: s.name,
          file: s.filePath,
          field: s.field,
          description: s.definitionText
        });
      } else {
        outline.push({
          type: "function",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.definitionText
        });
      }
    } else if (s.type === "variable_or_constant" /* VariableOrConstant */) {
      const t = s.definition?.type === "global_variable" ? "variable" : "member_variable";
      const displayName = s.name.startsWith("self.") ? s.name.substring(5) : s.name;
      outline.push({
        type: t,
        name: displayName,
        file: s.filePath,
        field: s.field || "",
        description: s.definitionText
      });
    } else if (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */) {
      outline.push({
        type: "class",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.name
      });
    }
  }
  return outline;
}
function formatOutlineText2(outline) {
  const groups = {};
  for (const entry of outline) {
    const key = entry.field ?? "";
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  let result = "";
  for (const field of Object.keys(groups).sort()) {
    if (groups[field].length === 0) continue;
    const group = groups[field];
    const title = field === "" ? "[global]" : `[${field}]`;
    result += title + "\n";
    for (const entry of group) {
      let line = `  ${entry.type}`;
      if (entry.type === "variable" || entry.type === "member_variable") {
        line += `: ${entry.name}`;
      } else if (entry.description) {
        line += `: ${entry.description.replace(/\n/g, " ")}`;
      }
      result += line + "\n";
    }
    result += "\n";
  }
  return result.trimEnd();
}

// ../autocompletion/v2/capturesProcess/java.ts
async function extractSnippetsFromCapturesForJava(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForJava]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  captures.forEach((capture) => {
    if (capture.name === "name.definition.import") {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) return;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      const scope = buildScopeChain(node);
      snippets.push({
        name: name2,
        type: "import_or_include" /* ImportOrInclude */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        scope,
        fileHash
      });
    }
  });
  for (const capture of captures) {
    if (capture.name !== "definition.method" && capture.name !== "definition.constructor") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const isConstructor = capture.name === "definition.constructor";
    const nameCapName = isConstructor ? "name.definition.constructor" : "name.definition.method";
    const paramCapName = isConstructor ? "parameters.definition.constructor" : "parameters.definition.method";
    const bodyCapName = isConstructor ? "body.definition.constructor" : "body.definition.method";
    const nameCap = captures.find(
      (c) => c.name === nameCapName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const paramCap = captures.find(
      (c) => c.name === paramCapName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const parameters = [];
    if (paramCap) {
      const paramText = sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex);
      const cleanText = paramText.replace(/^\(|\)$/g, "").trim();
      if (cleanText) {
        const paramList = parseJavaParameters(cleanText);
        parameters.push(...paramList.map((param) => ({ name: param })));
      }
    }
    const bodyCap = captures.find(
      (c) => c.name === bodyCapName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    let rangeText;
    let implementText = void 0;
    if (bodyCap) {
      rangeText = sourceCode.substring(node.startIndex, bodyCap.node.startIndex).trimEnd();
      implementText = sourceCode.substring(node.startIndex, node.endIndex);
    } else {
      rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    }
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const paramStr = parameters.map((p) => p.name).join(", ");
    const signature = `${name2}(${paramStr})`;
    const scope = buildScopeChain(node);
    let field = void 0;
    const parentTypes = ["class", "interface", "enum", "record", "annotation"];
    for (const parentType of parentTypes) {
      const parentCap = captures.find(
        (c) => c.name === `definition.${parentType}` && c.node.startIndex < node.startIndex && node.endIndex < c.node.endIndex
      );
      if (parentCap) {
        const parentNameCap = captures.find(
          (c) => c.name === `name.definition.${parentType}` && c.node.startIndex >= parentCap.node.startIndex && c.node.endIndex <= parentCap.node.endIndex
        );
        if (parentNameCap) {
          field = sourceCode.substring(parentNameCap.node.startIndex, parentNameCap.node.endIndex);
          break;
        }
      }
    }
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: isConstructor ? "constructor" : "method",
        parameters,
        returnType: isConstructor ? "" : "void"
        // Java 方法默认返回类型
      },
      parameters,
      signature,
      language: "java" /* Java */,
      ...implementText ? { implementText } : {}
    });
  }
  const typeDefs = [
    { capture: "name.definition.class", outlineType: "class" },
    { capture: "name.definition.interface", outlineType: "interface" },
    { capture: "name.definition.enum", outlineType: "enum" },
    { capture: "name.definition.record", outlineType: "record" },
    { capture: "name.definition.annotation", outlineType: "annotation" }
  ];
  for (const { capture, outlineType } of typeDefs) {
    const defCaptureName = `definition.${outlineType}`;
    for (const cap of captures.filter((c) => c.name === capture)) {
      const node = cap.node;
      const isInMethod = captures.some(
        (fc) => (fc.name === "definition.method" || fc.name === "definition.constructor") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
      );
      if (isInMethod) continue;
      const defCap = captures.find(
        (c) => c.name === defCaptureName && c.node.startIndex <= node.startIndex && node.endIndex <= c.node.endIndex
      );
      const rangeText = defCap ? sourceCode.substring(defCap.node.startIndex, defCap.node.endIndex) : sourceCode.substring(node.startIndex, node.endIndex);
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      snippets.push({
        name: name2,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        implementText: rangeText,
        scope: [],
        fileHash,
        field: "",
        definition: { name: name2, type: outlineType },
        language: "java" /* Java */
      });
    }
  }
  const fieldNameCaptures = captures.filter((c) => c.name === "name.definition.field");
  for (const nameCap of fieldNameCaptures) {
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const fieldCap = captures.find(
      (c) => c.name === "definition.field" && c.node.startIndex <= nameCap.node.startIndex && nameCap.node.endIndex <= c.node.endIndex
    );
    if (!fieldCap) continue;
    const node = fieldCap.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const isInMethod = captures.some(
      (fc) => (fc.name === "definition.method" || fc.name === "definition.constructor") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
    );
    if (isInMethod) continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const nameStartLine = nameCap.node.startPosition.row + 1;
    const nameEndLine = nameCap.node.endPosition.row + 1;
    const nameRangeText = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const snippetHash = generateSnippetHash(filePath, nameStartLine, nameEndLine, nameRangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    let field = void 0;
    const parentTypes = ["class", "interface", "enum", "record", "annotation"];
    for (const parentType of parentTypes) {
      const parentCap = captures.find(
        (c) => c.name === `definition.${parentType}` && c.node.startIndex < node.startIndex && node.endIndex < c.node.endIndex
      );
      if (parentCap) {
        const parentNameCap = captures.find(
          (c) => c.name === `name.definition.${parentType}` && c.node.startIndex >= parentCap.node.startIndex && c.node.endIndex <= parentCap.node.endIndex
        );
        if (parentNameCap) {
          field = sourceCode.substring(parentNameCap.node.startIndex, parentNameCap.node.endIndex);
          break;
        }
      }
    }
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      implementText: rangeText,
      scope,
      fileHash,
      field: field || "",
      definition: { name: name2, type: "field" },
      language: "java" /* Java */
    });
  }
  return snippets.filter((snippet) => snippetTypes.includes(snippet.type)).sort((a, b) => a.startLine - b.startLine);
}
function buildSummaryFromSnippets3(snippets) {
  const outline = [];
  const isTopLevel = (s) => {
    return !s.scope || s.scope.length <= 1;
  };
  for (const s of snippets) {
    if (!isTopLevel(s)) continue;
    if (s.type === "import_or_include" /* ImportOrInclude */) {
      outline.push({
        type: "import",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.definitionText
      });
    } else if (s.type === "function_or_method" /* FunctionOrMethod */) {
      if (s.field) {
        const methodType = s.definition?.type === "constructor" ? "constructor" : "method";
        outline.push({
          type: methodType,
          name: s.name,
          file: s.filePath,
          field: s.field,
          description: s.definitionText
        });
      } else {
        outline.push({
          type: "method",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.definitionText
        });
      }
    } else if (s.type === "variable_or_constant" /* VariableOrConstant */) {
      const fieldType = s.definition?.type === "field" ? "field" : "variable";
      const simpleDescription = s.name;
      outline.push({
        type: fieldType,
        name: s.name,
        file: s.filePath,
        field: s.field || "",
        description: simpleDescription
      });
    } else if (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */) {
      const t = s.definition?.type || "class";
      outline.push({
        type: t,
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.name
      });
    }
  }
  return outline;
}
function formatOutlineText3(outline) {
  const groups = {};
  for (const entry of outline) {
    const key = entry.field ?? "";
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  let result = "";
  for (const field of Object.keys(groups).sort()) {
    const group = groups[field];
    const title = field === "" ? "[global]" : `[${field}]`;
    result += title + "\n";
    for (const entry of group) {
      let line = `  ${entry.type}`;
      if (entry.description) line += `: ${entry.description.replace(/\n/g, " ")}`;
      result += line + "\n";
    }
    result += "\n";
  }
  return result.trimEnd();
}
function parseJavaParameters(paramText) {
  if (!paramText.trim()) return [];
  const params = [];
  let current = "";
  let bracketDepth = 0;
  let i2 = 0;
  while (i2 < paramText.length) {
    const char = paramText[i2];
    if (char === "<") {
      bracketDepth++;
      current += char;
    } else if (char === ">") {
      bracketDepth--;
      current += char;
    } else if (char === "," && bracketDepth === 0) {
      if (current.trim()) {
        params.push(current.trim());
      }
      current = "";
    } else {
      current += char;
    }
    i2++;
  }
  if (current.trim()) {
    params.push(current.trim());
  }
  return params;
}

// ../autocompletion/v2/capturesProcess/javascript.ts
function removeParentheses(text) {
  let result = text.trim();
  if (result.startsWith("(") && result.endsWith(")")) {
    result = result.slice(1, -1).trim();
  }
  return result;
}
function removeBrackets(text) {
  let result = text.trim();
  if (result.startsWith("[") && result.endsWith("]")) {
    result = result.slice(1, -1).trim();
  }
  return result;
}
function isValidJavaScriptIdentifier(name2) {
  if (!name2) return false;
  const firstChar = name2[0];
  if (!(firstChar >= "a" && firstChar <= "z") && !(firstChar >= "A" && firstChar <= "Z") && firstChar !== "_" && firstChar !== "$") {
    return false;
  }
  for (let i2 = 1; i2 < name2.length; i2++) {
    const char = name2[i2];
    if (!(char >= "a" && char <= "z") && !(char >= "A" && char <= "Z") && !(char >= "0" && char <= "9") && char !== "_" && char !== "$") {
      return false;
    }
  }
  return true;
}
function replaceNewlinesWithSpaces(text) {
  return text.split("\n").join(" ");
}
function extractParametersFromMethodText(methodText) {
  const openParen = methodText.indexOf("(");
  const closeParen = methodText.lastIndexOf(")");
  if (openParen !== -1 && closeParen !== -1 && closeParen > openParen) {
    return methodText.substring(openParen + 1, closeParen).trim();
  }
  return null;
}
async function extractSnippetsFromCapturesForJavaScript(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  const classCaptures = captures.filter((c) => c.name === "definition.class").map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    nameCap: captures.find(
      (nc) => nc.name === "name" && nc.node.startIndex >= c.node.startIndex && nc.node.endIndex <= c.node.endIndex
    )
  }));
  for (const capture of captures) {
    if (capture.name !== "definition.function") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => (c.name === "name.definition.function" || c.name === "name") && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const paramCap = captures.find(
      (c) => c.name === "parameters.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const parameters = [];
    if (paramCap) {
      const paramText = sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex);
      const cleanParams = removeParentheses(paramText);
      if (cleanParams) {
        const paramList = splitJavaScriptParameters(cleanParams);
        parameters.push(...paramList.map((param) => ({ name: param })));
      }
    }
    const bodyCap = captures.find(
      (c) => c.name === "body.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    let rangeText;
    let implementText = void 0;
    if (bodyCap) {
      rangeText = sourceCode.substring(node.startIndex, bodyCap.node.startIndex).trimEnd();
      implementText = sourceCode.substring(node.startIndex, node.endIndex);
    } else {
      rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    }
    let field = void 0;
    for (const cls of classCaptures) {
      if (node.startIndex > cls.start && node.endIndex < cls.end && cls.nameCap) {
        field = sourceCode.substring(cls.nameCap.node.startIndex, cls.nameCap.node.endIndex);
        break;
      }
    }
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const paramStr = parameters.map((p) => p.name).join(", ");
    const signature = `${name2}(${paramStr})`;
    const scope = buildScopeChain(node);
    let functionType = "function";
    const nodeText = sourceCode.substring(node.startIndex, Math.min(node.startIndex + 100, node.endIndex));
    if (nodeText.includes("async")) functionType = "async function";
    if (nodeText.includes("function*")) functionType = "generator function";
    if (nodeText.includes("=>")) functionType = "arrow function";
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: functionType,
        parameters,
        returnType: ""
        // JavaScript doesn't have explicit return types
      },
      parameters,
      signature,
      language: "javascript" /* JavaScript */,
      ...implementText ? { implementText } : {}
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.method") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const paramCap = captures.find(
      (c) => c.name === "parameters.definition.method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const parameters = [];
    if (paramCap) {
      const paramText = sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex);
      const cleanParams = removeParentheses(paramText);
      if (cleanParams) {
        const paramList = splitJavaScriptParameters(cleanParams);
        parameters.push(...paramList.map((param) => ({ name: param })));
      }
    } else {
      const methodText2 = sourceCode.substring(node.startIndex, node.endIndex);
      const paramString = extractParametersFromMethodText(methodText2);
      if (paramString) {
        const paramList = splitJavaScriptParameters(paramString);
        parameters.push(...paramList.map((param) => ({ name: param })));
      }
    }
    let field = void 0;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const paramStr = parameters.map((p) => p.name).join(", ");
    const signature = `${name2}(${paramStr})`;
    const scope = buildScopeChain(node);
    let methodType = "method";
    const methodText = sourceCode.substring(node.startIndex, node.endIndex);
    if (methodText.includes("async")) methodType = "async method";
    if (methodText.includes("static")) methodType = "static method";
    if (methodText.includes("get ")) methodType = "getter";
    if (methodText.includes("set ")) methodType = "setter";
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: methodType,
        parameters,
        returnType: ""
      },
      parameters,
      signature,
      language: "javascript" /* JavaScript */,
      implementText: rangeText
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.class") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name.definition.class" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      definition: {
        name: name2,
        type: "class"
      },
      language: "javascript" /* JavaScript */
    });
  }
  const allClasses = snippets.filter((s) => s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */);
  for (const method of snippets) {
    if (method.type === "function_or_method" /* FunctionOrMethod */ && !method.field) {
      for (const cls of allClasses) {
        if (method.startLine >= cls.startLine && method.endLine <= cls.endLine) {
          method.field = cls.name;
          break;
        }
      }
    }
  }
  for (const capture of captures) {
    if (capture.name !== "definition.variable") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const arrayPatternCap = captures.find(
      (c) => c.name === "array_pattern" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (arrayPatternCap) {
      const arrayPatternText = sourceCode.substring(
        arrayPatternCap.node.startIndex,
        arrayPatternCap.node.endIndex
      );
      const variableNames = removeBrackets(arrayPatternText).split(",").map((name3) => name3.trim()).filter((name3) => name3 && isValidJavaScriptIdentifier(name3));
      for (const varName of variableNames) {
        const scope2 = buildScopeChain(node);
        const isInsideFunction2 = scope2.length > 0 && scope2.some((scopeItem) => {
          return !allClasses.some((cls) => cls.name === scopeItem);
        });
        if (isInsideFunction2) continue;
        const rangeText2 = sourceCode.substring(node.startIndex, node.endIndex);
        const snippetHash2 = generateSnippetHash(filePath, startLine, endLine, `${rangeText2}_${varName}`);
        if (seenHashes.has(snippetHash2)) continue;
        seenHashes.add(snippetHash2);
        let field2 = void 0;
        let variableType2 = "global_variable";
        for (const cls of allClasses) {
          if (startLine >= cls.startLine && endLine <= cls.endLine) {
            field2 = cls.name;
            variableType2 = "member_variable";
            break;
          }
        }
        let definitionText2 = varName;
        if (variableType2 === "global_variable") {
          definitionText2 = replaceNewlinesWithSpaces(rangeText2).trim();
        }
        snippets.push({
          name: varName,
          type: "variable_or_constant" /* VariableOrConstant */,
          filePath,
          startLine,
          endLine,
          rangeText: rangeText2,
          definitionText: definitionText2,
          scope: scope2,
          fileHash,
          field: field2,
          definition: {
            name: varName,
            type: variableType2
          },
          language: "javascript" /* JavaScript */
        });
      }
      continue;
    }
    const nameCap = captures.find(
      (c) => c.name === "name.definition.variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    ) || captures.find(
      (c) => c.name === "name.definition.member_variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const scope = buildScopeChain(node);
    const isMemberVariable = captures.some(
      (c) => c.name === "name.definition.member_variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex && sourceCode.substring(c.node.startIndex, c.node.endIndex) === name2
    );
    const isInsideFunction = scope.length > 0 && scope.some((scopeItem) => {
      return !allClasses.some((cls) => cls.name === scopeItem);
    });
    if (isInsideFunction && !isMemberVariable) continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    let field = void 0;
    let variableType = "global_variable";
    for (const cls of allClasses) {
      if (startLine >= cls.startLine && endLine <= cls.endLine) {
        field = cls.name;
        variableType = "member_variable";
        break;
      }
    }
    let definitionText = name2;
    if (variableType === "global_variable") {
      definitionText = replaceNewlinesWithSpaces(rangeText).trim();
    }
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: variableType
      },
      language: "javascript" /* JavaScript */
    });
  }
  return snippets.filter((snippet) => snippetTypes.includes(snippet.type)).sort((a, b) => a.startLine - b.startLine);
}
function splitJavaScriptParameters(params) {
  const result = [];
  let current = "";
  let braceDepth = 0;
  let bracketDepth = 0;
  let parenDepth = 0;
  let inString = false;
  let stringChar = "";
  for (let i2 = 0; i2 < params.length; i2++) {
    const char = params[i2];
    const prevChar = i2 > 0 ? params[i2 - 1] : "";
    if (!inString && (char === '"' || char === "'" || char === "`")) {
      inString = true;
      stringChar = char;
    } else if (inString && char === stringChar && prevChar !== "\\") {
      inString = false;
      stringChar = "";
    }
    if (!inString) {
      if (char === "{") braceDepth++;
      else if (char === "}") braceDepth--;
      else if (char === "[") bracketDepth++;
      else if (char === "]") bracketDepth--;
      else if (char === "(") parenDepth++;
      else if (char === ")") parenDepth--;
      else if (char === "," && braceDepth === 0 && bracketDepth === 0 && parenDepth === 0) {
        if (current.trim()) {
          result.push(current.trim());
        }
        current = "";
        continue;
      }
    }
    current += char;
  }
  if (current.trim()) {
    result.push(current.trim());
  }
  return result;
}

// ../autocompletion/v2/capturesProcess/jsx.ts
async function extractSnippetsFromCapturesForJSX(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const jsSnippets = await extractSnippetsFromCapturesForJavaScript(
    captures,
    sourceCode,
    filePath,
    fileHash,
    snippetTypes,
    options
  );
  for (const snippet of jsSnippets) {
    snippet.language = "jsx" /* JSX */;
    if (snippet.type === "function_or_method" /* FunctionOrMethod */ && snippet.definition?.type === "function") {
      snippet.definition.type = "react_component";
      if (snippet.parameters && snippet.parameters.length > 0) {
        const improvedParams = [];
        for (const param of snippet.parameters) {
          if (param.name.includes("{") && param.name.includes("}")) {
            const openBrace = param.name.indexOf("{");
            const closeBrace = param.name.indexOf("}");
            if (openBrace !== -1 && closeBrace !== -1 && closeBrace > openBrace) {
              const destructuredContent = param.name.substring(openBrace + 1, closeBrace);
              const destructuredParams = destructuredContent.split(",").map((p) => {
                const equalIndex = p.indexOf("=");
                const cleanParam = equalIndex !== -1 ? p.substring(0, equalIndex).trim() : p.trim();
                return cleanParam;
              });
              improvedParams.push(...destructuredParams.map((p) => ({ name: p })));
            }
          } else {
            improvedParams.push(param);
          }
        }
        snippet.parameters = improvedParams;
        const paramStr = improvedParams.map((p) => p.name).join(", ");
        snippet.signature = `${snippet.name}(${paramStr})`;
      }
    } else if (snippet.type === "function_or_method" /* FunctionOrMethod */ && snippet.definition?.type === "arrow function") {
      snippet.definition.type = "react_component";
      if (snippet.parameters && snippet.parameters.length > 0) {
        const improvedParams = [];
        for (const param of snippet.parameters) {
          if (param.name.includes("{") && param.name.includes("}")) {
            const openBrace = param.name.indexOf("{");
            const closeBrace = param.name.indexOf("}");
            if (openBrace !== -1 && closeBrace !== -1 && closeBrace > openBrace) {
              const destructuredContent = param.name.substring(openBrace + 1, closeBrace);
              const destructuredParams = destructuredContent.split(",").map((p) => {
                const equalIndex = p.indexOf("=");
                const cleanParam = equalIndex !== -1 ? p.substring(0, equalIndex).trim() : p.trim();
                return cleanParam;
              });
              improvedParams.push(...destructuredParams.map((p) => ({ name: p })));
            }
          } else {
            improvedParams.push(param);
          }
        }
        snippet.parameters = improvedParams;
        const paramStr = improvedParams.map((p) => p.name).join(", ");
        snippet.signature = `${snippet.name}(${paramStr})`;
      }
    } else if (snippet.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */ && snippet.definition?.type === "class") {
      snippet.definition.type = "react_class_component";
    } else if (snippet.type === "import_or_include" /* ImportOrInclude */ && snippet.definition?.type === "import") {
      snippet.definition.type = "react_import";
    }
    if (snippet.type === "function_or_method" /* FunctionOrMethod */ && snippet.name.startsWith("use") && snippet.definition?.type === "react_component") {
      snippet.definition.type = "react_custom_hook";
      if (snippet.parameters && snippet.parameters.length > 0) {
        const improvedParams = [];
        for (const param of snippet.parameters) {
          const equalIndex = param.name.indexOf("=");
          const cleanName = equalIndex !== -1 ? param.name.substring(0, equalIndex).trim() : param.name;
          improvedParams.push({ name: cleanName });
        }
        snippet.parameters = improvedParams;
        const paramStr = improvedParams.map((p) => p.name).join(", ");
        snippet.signature = `${snippet.name}(${paramStr})`;
      }
    }
  }
  const snippets = [...jsSnippets];
  const seenHashes = /* @__PURE__ */ new Set();
  for (const snippet of snippets) {
    const hash = generateSnippetHash(snippet.filePath, snippet.startLine, snippet.endLine, snippet.rangeText);
    seenHashes.add(hash);
  }
  for (const capture of captures) {
    if (capture.name !== "definition.jsx_element") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name.jsx_element" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const firstChar = name2.charAt(0);
    if (firstChar < "A" || firstChar > "Z") continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      signature: `<${name2}>`,
      parameters: [],
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      implementText: rangeText,
      scope,
      fileHash,
      language: "jsx" /* JSX */,
      definition: {
        name: name2,
        type: "jsx_element",
        parameters: []
      }
    });
  }
  for (const capture of captures) {
    if (capture.name !== "array_pattern") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const parentNode = node.parent;
    if (!parentNode || parentNode.type !== "variable_declarator") continue;
    const valueNode = parentNode.namedChild(1);
    if (!valueNode || valueNode.type !== "call_expression") continue;
    const functionNode = valueNode.namedChild(0);
    if (!functionNode || functionNode.type !== "identifier") continue;
    const functionName = sourceCode.substring(functionNode.startIndex, functionNode.endIndex);
    if (functionName !== "useState") continue;
    const firstIdentifier = node.namedChild(0);
    const secondIdentifier = node.namedChild(1);
    if (!firstIdentifier || !secondIdentifier || firstIdentifier.type !== "identifier" || secondIdentifier.type !== "identifier") {
      continue;
    }
    const stateName = sourceCode.substring(firstIdentifier.startIndex, firstIdentifier.endIndex);
    const setterName = sourceCode.substring(secondIdentifier.startIndex, secondIdentifier.endIndex);
    const rangeText = sourceCode.substring(parentNode.startIndex, parentNode.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: stateName,
      signature: `useState()`,
      parameters: [],
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      implementText: rangeText,
      scope,
      fileHash,
      language: "jsx" /* JSX */,
      definition: {
        name: stateName,
        type: "react_hook",
        parameters: []
      }
    });
  }
  for (const capture of captures) {
    if (capture.name !== "name.definition.function") continue;
    const node = capture.node;
    const functionName = sourceCode.substring(node.startIndex, node.endIndex);
    if (!functionName.startsWith("use")) continue;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    let callExpressionNode = node.parent;
    while (callExpressionNode && callExpressionNode.type !== "call_expression") {
      callExpressionNode = callExpressionNode.parent;
    }
    if (!callExpressionNode) continue;
    if (functionName === "useState") {
      let parentNode = callExpressionNode.parent;
      while (parentNode && parentNode.type !== "variable_declarator") {
        parentNode = parentNode.parent;
      }
      if (parentNode) {
        const nameNode = parentNode.namedChild(0);
        if (nameNode && nameNode.type === "array_pattern") {
          continue;
        }
      }
    }
    const rangeText = sourceCode.substring(callExpressionNode.startIndex, callExpressionNode.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: functionName,
      signature: `${functionName}()`,
      parameters: [],
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      implementText: rangeText,
      scope,
      fileHash,
      language: "jsx" /* JSX */,
      definition: {
        name: functionName,
        type: "react_hook",
        parameters: []
      }
    });
  }
  for (const capture of captures) {
    if (capture.name !== "name.definition.variable") continue;
    const node = capture.node;
    const variableName = sourceCode.substring(node.startIndex, node.endIndex);
    let declaratorNode = node.parent;
    while (declaratorNode && declaratorNode.type !== "variable_declarator") {
      declaratorNode = declaratorNode.parent;
    }
    if (!declaratorNode) continue;
    const valueNode = declaratorNode.namedChild(1);
    if (!valueNode || valueNode.type !== "call_expression") continue;
    const functionNode = valueNode.namedChild(0);
    if (!functionNode || functionNode.type !== "identifier") continue;
    const functionName = sourceCode.substring(functionNode.startIndex, functionNode.endIndex);
    const firstChar = functionName.charAt(0);
    const isUppercase = firstChar >= "A" && firstChar <= "Z";
    const startsWithWith = functionName.startsWith("with");
    if (!isUppercase && !startsWithWith) continue;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const rangeText = sourceCode.substring(declaratorNode.startIndex, declaratorNode.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: variableName,
      signature: `${functionName}(${variableName})`,
      parameters: [],
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      implementText: rangeText,
      scope,
      fileHash,
      language: "jsx" /* JSX */,
      definition: {
        name: variableName,
        type: "react_hoc",
        parameters: []
      }
    });
  }
  return snippets;
}
function buildSummaryFromSnippets4(snippets) {
  const outline = [];
  const isTopLevel = (s) => {
    return !s.scope || s.scope.length <= 1;
  };
  for (const s of snippets) {
    if (!isTopLevel(s)) continue;
    if (s.type === "import_or_include" /* ImportOrInclude */) {
      continue;
    } else if (s.type === "function_or_method" /* FunctionOrMethod */) {
      const definitionType = s.definition?.type;
      if (definitionType === "react_component") {
        outline.push({
          type: "component",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.signature
        });
      } else if (definitionType === "react_custom_hook") {
        outline.push({
          type: "custom_hook",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.signature
        });
      } else {
        outline.push({
          type: "function",
          name: s.name,
          file: s.filePath,
          field: s.field || "",
          description: s.signature
        });
      }
    } else if (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */) {
      outline.push({
        type: "class",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.signature || s.name
      });
    } else if (s.type === "variable_or_constant" /* VariableOrConstant */) {
      const definitionType = s.definition?.type;
      if (definitionType === "react_hook") {
        outline.push({
          type: "hook",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.signature
        });
      } else if (definitionType === "jsx_element") {
        outline.push({
          type: "jsx_element",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.signature
        });
      } else {
        outline.push({
          type: "variable",
          name: s.name,
          file: s.filePath,
          field: s.field || "",
          description: s.signature || s.name
        });
      }
    }
  }
  return outline;
}
function formatOutlineText4(outline) {
  const groups = {};
  for (const entry of outline) {
    const key = entry.type;
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  let result = "";
  const typeOrder = ["component", "class", "custom_hook", "hook", "jsx_element", "function", "variable"];
  const typeLabels = {
    component: "## React Components",
    class: "## Classes",
    custom_hook: "## Custom Hooks",
    hook: "## React Hooks",
    jsx_element: "## JSX Elements",
    function: "## Functions",
    variable: "## Variables"
  };
  for (const type of typeOrder) {
    const group = groups[type];
    if (!group || group.length === 0) continue;
    result += typeLabels[type] + "\n";
    for (const entry of group) {
      result += `- ${entry.description || entry.name}
`;
    }
    result += "\n";
  }
  return result;
}

// ../autocompletion/v2/capturesProcess/typescript.ts
async function extractSnippetsFromCapturesForTypeScript(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[TS extract]");
  const snippets = [];
  const seen = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) return snippets;
  for (const c of captures.filter((c2) => c2.name === "name.import")) {
    const node = c.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const text = sourceCode.slice(node.startIndex, node.endIndex);
    const hash = generateSnippetHash(filePath, startLine, endLine, text);
    if (seen.has(hash)) continue;
    seen.add(hash);
    snippets.push({
      name: text,
      type: "import_or_include" /* ImportOrInclude */,
      filePath,
      startLine,
      endLine,
      rangeText: text,
      definitionText: text,
      scope: buildScopeChain(node),
      fileHash
    });
  }
  for (const def of captures.filter((c) => c.name === "definition.function" || c.name === "definition.method")) {
    const node = def.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === (def.name === "definition.method" ? "name.method" : "name.function") && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.slice(nameCap.node.startIndex, nameCap.node.endIndex);
    const paramsCap = captures.find(
      (c) => c.name === "parameters.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const parameters = [];
    if (paramsCap) {
      const raw = sourceCode.slice(paramsCap.node.startIndex, paramsCap.node.endIndex);
      raw.replace(/^\(|\)$/g, "").split(",").map((p) => p.trim()).filter((p) => p).forEach((p) => parameters.push({ name: p }));
    }
    const isMethod = def.name === "definition.method";
    let field;
    if (isMethod) {
      const classDefCap = captures.find(
        (c) => c.name === "definition.class" && c.node.startIndex < node.startIndex && c.node.endIndex > node.endIndex
      );
      if (classDefCap) {
        const classCap = captures.find(
          (c) => c.name === "name.class" && c.node.startIndex >= classDefCap.node.startIndex && c.node.endIndex <= classDefCap.node.endIndex
        );
        if (classCap) {
          field = sourceCode.slice(classCap.node.startIndex, classCap.node.endIndex);
        }
      }
    }
    const sig = `${name2}(${parameters.map((p) => p.name).join(", ")})`;
    const hash = generateSnippetHash(filePath, startLine, endLine, sig);
    if (seen.has(hash)) continue;
    seen.add(hash);
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText: sourceCode.slice(node.startIndex, node.endIndex),
      definitionText: sig,
      scope: buildScopeChain(node),
      fileHash,
      field,
      parameters,
      signature: sig,
      definition: {
        name: name2,
        type: def.name === "definition.method" ? "method" : "function",
        parameters,
        returnType: ""
      },
      language: "typescript" /* TypeScript */,
      implementText: sourceCode.slice(node.startIndex, node.endIndex)
    });
  }
  const typeDefs = [
    {
      name: "name.class",
      def: "definition.class",
      kind: "class",
      type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */
    },
    {
      name: "name.interface",
      def: "definition.interface",
      kind: "interface",
      type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */
    },
    { name: "name.enum", def: "definition.enum", kind: "enum", type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */ },
    {
      name: "name.type_alias",
      def: "definition.type_alias",
      kind: "type",
      type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */
    }
  ];
  for (const { name: capName, def: defName, kind, type } of typeDefs) {
    for (const c of captures.filter((c2) => c2.name === capName)) {
      const node = c.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const text = sourceCode.slice(node.startIndex, node.endIndex);
      const inFunc = captures.some(
        (fc) => (fc.name === "definition.function" || fc.name === "definition.method") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
      );
      if (inFunc) continue;
      const defCap = captures.find(
        (dc) => dc.name === defName && dc.node.startIndex <= node.startIndex && node.endIndex <= dc.node.endIndex
      );
      const defNode = defCap ? defCap.node : node.parent || node;
      const hash = generateSnippetHash(filePath, startLine, endLine, text);
      if (seen.has(hash)) continue;
      seen.add(hash);
      snippets.push({
        name: text,
        type,
        filePath,
        startLine,
        endLine,
        rangeText: sourceCode.slice(defNode.startIndex, defNode.endIndex),
        definitionText: text,
        implementText: sourceCode.slice(defNode.startIndex, defNode.endIndex),
        scope: buildScopeChain(node),
        fileHash,
        definition: { name: text, type: kind },
        language: "typescript" /* TypeScript */,
        field: ""
      });
    }
  }
  for (const c of captures.filter((c2) => c2.name === "name.variable")) {
    const node = c.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const name2 = sourceCode.slice(node.startIndex, node.endIndex);
    const inFunc = captures.some(
      (fc) => (fc.name === "definition.function" || fc.name === "definition.method") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
    );
    if (inFunc) continue;
    const hash = generateSnippetHash(filePath, startLine, endLine, name2);
    if (seen.has(hash)) continue;
    seen.add(hash);
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText: sourceCode.slice(node.startIndex, node.endIndex),
      definitionText: name2,
      implementText: name2,
      scope: buildScopeChain(node),
      fileHash,
      definition: { name: name2, type: "variable" },
      language: "typescript" /* TypeScript */,
      field: ""
    });
  }
  for (const c of captures.filter((c2) => c2.name === "name.property")) {
    const node = c.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const name2 = sourceCode.slice(node.startIndex, node.endIndex);
    let field;
    const parentInterface = captures.find(
      (ic) => ic.name === "definition.interface" && ic.node.startIndex < node.startIndex && ic.node.endIndex > node.endIndex
    );
    const parentClass = captures.find(
      (cc) => cc.name === "definition.class" && cc.node.startIndex < node.startIndex && cc.node.endIndex > node.endIndex
    );
    if (parentInterface) {
      const interfaceCap = captures.find(
        (ic) => ic.name === "name.interface" && ic.node.startIndex >= parentInterface.node.startIndex && ic.node.endIndex <= parentInterface.node.endIndex
      );
      if (interfaceCap) {
        field = sourceCode.slice(interfaceCap.node.startIndex, interfaceCap.node.endIndex);
      }
    } else if (parentClass) {
      const classCap = captures.find(
        (cc) => cc.name === "name.class" && cc.node.startIndex >= parentClass.node.startIndex && cc.node.endIndex <= parentClass.node.endIndex
      );
      if (classCap) {
        field = sourceCode.slice(classCap.node.startIndex, classCap.node.endIndex);
      }
    }
    const hash = generateSnippetHash(filePath, startLine, endLine, name2);
    if (seen.has(hash)) continue;
    seen.add(hash);
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText: sourceCode.slice(node.startIndex, node.endIndex),
      definitionText: name2,
      implementText: name2,
      scope: buildScopeChain(node),
      fileHash,
      field,
      definition: { name: name2, type: "property" },
      language: "typescript" /* TypeScript */
    });
  }
  return snippets;
}
function buildSummaryFromSnippets5(snips) {
  const outline = [];
  for (const s of snips) {
    if (s.type === "import_or_include" /* ImportOrInclude */) {
      outline.push({ type: "import", name: s.name, file: s.filePath, field: "", description: s.definitionText });
    } else if (s.type === "function_or_method" /* FunctionOrMethod */) {
      outline.push({
        type: s.field ? "method" : "function",
        name: s.name,
        file: s.filePath,
        field: s.field || "",
        description: s.definitionText
      });
    } else if (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */) {
      outline.push({
        type: s.definition?.type || "type",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.name
      });
    } else if (s.type === "variable_or_constant" /* VariableOrConstant */) {
      outline.push({ type: "variable", name: s.name, file: s.filePath, field: "", description: s.definitionText });
    }
  }
  return outline;
}
function formatOutlineText5(outline) {
  const groups = {};
  for (const e of outline) {
    const key = e.field || "";
    (groups[key] ||= []).push(e);
  }
  let out2 = "";
  for (const field of Object.keys(groups).sort()) {
    out2 += (field ? `[${field}]` : "[global]") + "\n";
    for (const e of groups[field]) {
      out2 += `  ${e.type}: ${e.description}
`;
    }
    out2 += "\n";
  }
  return out2.trimEnd();
}

// ../autocompletion/v2/capturesProcess/tsx.ts
function startsWithUppercase(name2) {
  return name2.length > 0 && name2[0] >= "A" && name2[0] <= "Z";
}
function isGenericComponent(rangeText) {
  return rangeText.includes("function") && rangeText.includes("<") && rangeText.includes(">(");
}
function cleanParameterName(paramText) {
  let cleaned = paramText.trim();
  const colonIndex = cleaned.indexOf(":");
  if (colonIndex !== -1) {
    cleaned = cleaned.substring(0, colonIndex).trim();
  }
  const equalsIndex = cleaned.indexOf("=");
  if (equalsIndex !== -1) {
    cleaned = cleaned.substring(0, equalsIndex).trim();
  }
  if (cleaned.endsWith("?")) {
    cleaned = cleaned.slice(0, -1).trim();
  }
  return cleaned;
}
function extractDestructuredParamsFromText(paramText) {
  const params = [];
  const openBrace = paramText.indexOf("{");
  const closeBrace = paramText.lastIndexOf("}");
  if (openBrace !== -1 && closeBrace !== -1 && closeBrace > openBrace) {
    const destructuredContent = paramText.substring(openBrace + 1, closeBrace);
    const paramNames = destructuredContent.split(",");
    for (const param of paramNames) {
      const cleanName = cleanParameterName(param);
      if (cleanName && cleanName !== "..." && !cleanName.includes("...")) {
        params.push(cleanName);
      }
    }
  }
  return params;
}
async function extractSnippetsFromCapturesForTSX(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[TSX extract]");
  const tsSnippets = await extractSnippetsFromCapturesForTypeScript(
    captures,
    sourceCode,
    filePath,
    fileHash,
    snippetTypes,
    options
  );
  for (const snippet of tsSnippets) {
    snippet.language = "tsx" /* TSX */;
    if (snippet.type === "function_or_method" /* FunctionOrMethod */ && snippet.definition?.type === "function") {
      if (snippet.name.startsWith("use")) {
        snippet.definition.type = "react_custom_hook";
      } else {
        const isReactComponent = startsWithUppercase(snippet.name) || snippet.rangeText.includes("return") && snippet.rangeText.includes("<") && snippet.rangeText.includes(">");
        if (isReactComponent) {
          if (snippet.rangeText.includes("<") && snippet.rangeText.includes(">(") && isGenericComponent(snippet.rangeText)) {
            snippet.definition.type = "react_generic_component";
          } else {
            snippet.definition.type = "react_component";
          }
        }
      }
      if (snippet.parameters && snippet.parameters.length > 0) {
        const paramTexts = snippet.parameters.map((p) => p.name.trim());
        const fullParamText = paramTexts.join(", ");
        const improvedParams = [];
        if (fullParamText.includes("{") && fullParamText.includes("}")) {
          const destructuredParams = extractDestructuredParamsFromText(fullParamText);
          improvedParams.push(...destructuredParams.map((p) => ({ name: p })));
        } else {
          for (const param of snippet.parameters) {
            const paramText = param.name.trim();
            const cleanName = cleanParameterName(paramText);
            if (cleanName && !cleanName.includes("{") && !cleanName.includes("}")) {
              improvedParams.push({ name: cleanName });
            }
          }
        }
        snippet.parameters = improvedParams;
        const paramStr = improvedParams.map((p) => p.name).join(", ");
        snippet.signature = `${snippet.name}(${paramStr})`;
      } else if (!snippet.parameters || snippet.parameters.length === 0) {
        if (snippet.definition?.parameters && snippet.definition.parameters.length > 0) {
          const paramTexts = snippet.definition.parameters.map((p) => p.name || "");
          const fullParamText = paramTexts.join(", ");
          const improvedParams = [];
          if (fullParamText.includes("{") && fullParamText.includes("}")) {
            const destructuredParams = extractDestructuredParamsFromText(fullParamText);
            improvedParams.push(...destructuredParams.map((p) => ({ name: p })));
          } else {
            for (const param of snippet.definition.parameters) {
              const paramText = param.name?.trim() || "";
              const cleanName = cleanParameterName(paramText);
              if (cleanName && !cleanName.includes("{") && !cleanName.includes("}")) {
                improvedParams.push({ name: cleanName });
              }
            }
          }
          snippet.parameters = improvedParams;
          const paramStr = improvedParams.map((p) => p.name).join(", ");
          snippet.signature = `${snippet.name}(${paramStr})`;
        }
      }
    } else if (snippet.type === "function_or_method" /* FunctionOrMethod */ && snippet.definition?.type === "method") {
    } else if (snippet.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */ && snippet.definition?.type === "class") {
      if (snippet.rangeText.includes("extends") && (snippet.rangeText.includes("Component") || snippet.rangeText.includes("PureComponent"))) {
        snippet.definition.type = "react_class_component";
      }
    } else if (snippet.type === "import_or_include" /* ImportOrInclude */ && snippet.definition?.type === "import") {
      snippet.definition.type = "react_import";
    } else if (snippet.type === "variable_or_constant" /* VariableOrConstant */ && snippet.definition?.type === "variable") {
      if (startsWithUppercase(snippet.name)) {
        const isLikelyComponent = tsSnippets.some(
          (s) => s.name === snippet.name && s.type === "function_or_method" /* FunctionOrMethod */ && s.definition?.type === "react_component"
        ) || // 或者检查常见的 React 组件模式
        snippet.rangeText.includes("withError") || snippet.rangeText.includes("memo(") || snippet.rangeText.includes("forwardRef(") || snippet.rangeText.includes("lazy(") || snippet.rangeText.includes("React.") || snippet.rangeText.includes("FC") || snippet.rangeText.includes("FunctionComponent") || snippet.rangeText.includes("=>") && snippet.rangeText.includes("<") && snippet.rangeText.includes(">");
        if (isLikelyComponent) {
          snippet.definition.type = "react_component";
          snippet.type = "function_or_method" /* FunctionOrMethod */;
        }
      }
    }
  }
  const snippets = [...tsSnippets];
  const seenHashes = /* @__PURE__ */ new Set();
  for (const snippet of snippets) {
    const hash = generateSnippetHash(snippet.filePath, snippet.startLine, snippet.endLine, snippet.rangeText);
    seenHashes.add(hash);
  }
  for (const capture of captures) {
    if (capture.name !== "definition.component" && capture.name !== "definition.jsx_element" && capture.name !== "definition.jsx_self_closing_element")
      continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    let nameCap;
    if (capture.name === "definition.component") {
      nameCap = captures.find(
        (c) => c.name === "name" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
    } else {
      nameCap = captures.find(
        (c) => c.name === "component" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
    }
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    if (!startsWithUppercase(name2) && !isKnownReactComponent(name2)) continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      signature: `<${name2}>`,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: `<${name2}>`,
      implementText: rangeText,
      scope,
      fileHash,
      language: "tsx" /* TSX */,
      definition: {
        name: name2,
        type: "jsx_component",
        parameters: [],
        returnType: "JSX.Element"
      }
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.member_component") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const objectCap = captures.find(
      (c) => c.name === "object" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const propertyCap = captures.find(
      (c) => c.name === "property" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!objectCap || !propertyCap) continue;
    const objectName = sourceCode.substring(objectCap.node.startIndex, objectCap.node.endIndex);
    const propertyName = sourceCode.substring(propertyCap.node.startIndex, propertyCap.node.endIndex);
    const fullName = `${objectName}.${propertyName}`;
    if (!startsWithUppercase(objectName)) continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: fullName,
      signature: `<${fullName}>`,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: `<${fullName}>`,
      implementText: rangeText,
      scope,
      fileHash,
      field: objectName,
      language: "tsx" /* TSX */,
      definition: {
        name: fullName,
        type: "jsx_member_component",
        parameters: [],
        returnType: "JSX.Element"
      }
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.conditional_component") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const componentCap = captures.find(
      (c) => c.name === "component" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!componentCap) continue;
    const name2 = sourceCode.substring(componentCap.node.startIndex, componentCap.node.endIndex);
    if (!startsWithUppercase(name2)) continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      signature: `{condition ? <${name2}> : null}`,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: `{condition ? <${name2}> : null}`,
      implementText: rangeText,
      scope,
      fileHash,
      language: "tsx" /* TSX */,
      definition: {
        name: name2,
        type: "jsx_conditional_component",
        parameters: [],
        returnType: "JSX.Element | null"
      }
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.generic_component") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const isReactComponent = startsWithUppercase(name2) || sourceCode.substring(node.startIndex, node.endIndex).includes("JSX");
    if (!isReactComponent) continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    snippets.push({
      name: name2,
      signature: `${name2}<T>`,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: `${name2}<T>`,
      implementText: rangeText,
      scope,
      fileHash,
      language: "tsx" /* TSX */,
      definition: {
        name: name2,
        type: "react_generic_component",
        parameters: [],
        returnType: "JSX.Element"
      }
    });
  }
  return snippets;
}
function isKnownReactComponent(name2) {
  const knownComponents = [
    "Fragment",
    "Suspense",
    "StrictMode",
    "Profiler",
    "ErrorBoundary",
    "Provider",
    "Consumer",
    "Portal"
  ];
  return knownComponents.includes(name2);
}
function buildSummaryFromSnippets6(snips) {
  const outline = [];
  for (const s of snips) {
    if (s.type === "import_or_include" /* ImportOrInclude */) {
      outline.push({
        type: "import",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.definitionText
      });
    } else if (s.type === "function_or_method" /* FunctionOrMethod */) {
      let type = "function";
      if (s.definition?.type === "react_component") type = "component";
      else if (s.definition?.type === "react_custom_hook") type = "hook";
      else if (s.definition?.type === "jsx_component") type = "jsx";
      else if (s.definition?.type === "jsx_member_component") type = "jsx.member";
      else if (s.definition?.type === "jsx_conditional_component") type = "jsx.conditional";
      else if (s.definition?.type === "react_generic_component") type = "component.generic";
      else if (s.field) type = "method";
      outline.push({
        type,
        name: s.name,
        file: s.filePath,
        field: s.field || "",
        description: s.definitionText
      });
    } else if (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */) {
      let type = s.definition?.type || "type";
      if (s.definition?.type === "react_class_component") type = "class.component";
      outline.push({
        type,
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.name
      });
    } else if (s.type === "variable_or_constant" /* VariableOrConstant */) {
      outline.push({
        type: "variable",
        name: s.name,
        file: s.filePath,
        field: s.field || "",
        description: s.definitionText
      });
    }
  }
  return outline;
}
function formatOutlineText6(outline) {
  const groups = {};
  for (const e of outline) {
    const key = e.field || "";
    (groups[key] ||= []).push(e);
  }
  let out2 = "";
  for (const field of Object.keys(groups).sort()) {
    out2 += (field ? `[${field}]` : "[global]") + "\n";
    for (const e of groups[field]) {
      out2 += `  ${e.type}: ${e.description}
`;
    }
    out2 += "\n";
  }
  return out2.trimEnd();
}

// ../autocompletion/v2/capturesProcess/swift.ts
async function extractSnippetsFromCapturesForSwift(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForSwift]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  const containerCaptures = captures.filter(
    (c) => c.name === "definition.class" || c.name === "definition.struct" || c.name === "definition.protocol" || c.name === "definition.enum"
  ).map((c) => {
    const node = c.node;
    const type = c.name.split(".")[1];
    let nameCap = captures.find(
      (nc) => nc.name === `name.${c.name}` && nc.node.startIndex >= node.startIndex && nc.node.endIndex <= node.endIndex
    );
    let actualName = nameCap ? sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex) : "";
    if (type === "class") {
      const actualType = determineClassDeclarationType(node, sourceCode);
      if (actualType === "extension") {
        if (node.childCount >= 2) {
          const userTypeNode = node.child(1);
          if (userTypeNode && userTypeNode.type === "user_type" && userTypeNode.childCount > 0) {
            const typeIdNode = userTypeNode.child(0);
            if (typeIdNode && typeIdNode.type === "type_identifier") {
              actualName = sourceCode.substring(typeIdNode.startIndex, typeIdNode.endIndex);
            }
          }
        }
      }
    }
    return {
      node,
      start: node.startIndex,
      end: node.endIndex,
      type,
      nameCap,
      actualName
      // 实际的类型名（对于extension是被扩展的类型）
    };
  });
  captures.forEach((capture) => {
    if (capture.name === "name.definition.import") {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) return;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      const scope = buildScopeChain(node);
      snippets.push({
        name: name2,
        type: "import_or_include" /* ImportOrInclude */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        scope,
        fileHash
      });
    }
  });
  for (const capture of captures) {
    let findParameterNodes = function(node2) {
      if (node2.type === "parameter") {
        parameterNodes.push(node2);
      }
      for (let i2 = 0; i2 < node2.childCount; i2++) {
        const child = node2.child(i2);
        if (child) {
          findParameterNodes(child);
        }
      }
    };
    if (capture.name !== "definition.method" && capture.name !== "definition.initializer" && capture.name !== "definition.deinitializer" && capture.name !== "definition.protocol_method")
      continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    let nameCap;
    if (capture.name === "definition.method") {
      nameCap = captures.find(
        (c) => c.name === "name.definition.method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
    } else if (capture.name === "definition.protocol_method") {
      nameCap = captures.find(
        (c) => c.name === "name.definition.protocol_method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
    } else if (capture.name === "definition.initializer") {
      nameCap = captures.find(
        (c) => c.name === "name.definition.initializer" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
    } else if (capture.name === "definition.deinitializer") {
      nameCap = captures.find(
        (c) => c.name === "name.definition.deinitializer" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
    }
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const parameters = [];
    let parameterNodes = [];
    findParameterNodes(node);
    for (const paramNode of parameterNodes) {
      let paramName = "";
      for (let i2 = 0; i2 < paramNode.childCount; i2++) {
        const child = paramNode.child(i2);
        if (child && child.type === "simple_identifier") {
          paramName = sourceCode.substring(child.startIndex, child.endIndex);
          break;
        }
      }
      if (paramName) {
        parameters.push({
          name: paramName,
          type: "Any"
          // 暂时使用占位符类型
        });
      }
    }
    const bodyCap = captures.find(
      (c) => c.name === "body.definition.method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    let rangeText;
    let implementText = void 0;
    if (bodyCap) {
      rangeText = sourceCode.substring(node.startIndex, bodyCap.node.startIndex).trimEnd();
      implementText = sourceCode.substring(node.startIndex, node.endIndex);
    } else {
      rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    }
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    let returnType = "";
    const paramStr = parameters.map((p) => p.name).join(", ");
    const signature = `${name2}(${paramStr})`;
    const scope = buildScopeChain(node);
    let field = void 0;
    let closestContainer = void 0;
    for (const container of containerCaptures) {
      if (node.startIndex > container.start && node.endIndex <= container.end) {
        if (!closestContainer || container.end - container.start < closestContainer.end - closestContainer.start) {
          closestContainer = container;
        }
      }
    }
    if (closestContainer) {
      field = closestContainer.actualName || (closestContainer.nameCap ? sourceCode.substring(
        closestContainer.nameCap.node.startIndex,
        closestContainer.nameCap.node.endIndex
      ) : void 0);
    }
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: node.type,
        parameters,
        returnType
      },
      parameters,
      signature,
      language: "swift" /* Swift */,
      ...implementText ? { implementText } : {}
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.property" && capture.name !== "definition.computed_property") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nodeHash = `${node.startIndex}-${node.endIndex}`;
    const isAlreadyProcessed = snippets.some(
      (s) => s.rangeText === sourceCode.substring(node.startIndex, node.endIndex) && s.startLine === startLine
    );
    if (isAlreadyProcessed) continue;
    let nameCap;
    let isComputedProperty = false;
    nameCap = captures.find(
      (c) => c.name === "name.definition.computed_property" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (nameCap) {
      isComputedProperty = true;
    } else {
      nameCap = captures.find(
        (c) => c.name === "name.definition.property" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
    }
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const isInContainer = containerCaptures.some(
      (container) => node.startIndex > container.start && node.endIndex <= container.end
    );
    if (!isInContainer) continue;
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    let field = void 0;
    let closestContainer = void 0;
    for (const container of containerCaptures) {
      if (node.startIndex > container.start && node.endIndex <= container.end) {
        if (!closestContainer || container.end - container.start < closestContainer.end - closestContainer.start) {
          closestContainer = container;
        }
      }
    }
    if (closestContainer) {
      field = closestContainer.actualName || (closestContainer.nameCap ? sourceCode.substring(
        closestContainer.nameCap.node.startIndex,
        closestContainer.nameCap.node.endIndex
      ) : void 0);
    }
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      implementText: rangeText,
      scope,
      fileHash,
      field,
      definition: {
        name: name2,
        type: isComputedProperty ? "computed_property" : "property"
      },
      language: "swift" /* Swift */
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.global_var") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name.definition.global_var" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    let varType = "var";
    if (rangeText.trim().startsWith("let")) {
      varType = "let";
    }
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      implementText: rangeText,
      scope,
      fileHash,
      field: "",
      definition: { name: name2, type: varType },
      language: "swift" /* Swift */
    });
  }
  const typeDefs = [
    { capture: "name.definition.class", outlineType: "class" },
    { capture: "name.definition.protocol", outlineType: "protocol" },
    { capture: "name.definition.type_alias", outlineType: "typealias" }
  ];
  for (const { capture, outlineType } of typeDefs) {
    const defCaptureName = `definition.${outlineType === "typealias" ? "type_alias" : outlineType}`;
    for (const cap of captures.filter((c) => c.name === capture)) {
      const node = cap.node;
      const isInFunc = captures.some(
        (fc) => (fc.name === "definition.method" || fc.name === "definition.initializer" || fc.name === "definition.deinitializer") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
      );
      if (isInFunc) continue;
      let defCap = captures.filter(
        (c) => c.name === defCaptureName && c.node.startIndex <= node.startIndex && node.endIndex <= c.node.endIndex
      ).sort((a, b) => a.node.endIndex - a.node.startIndex - (b.node.endIndex - b.node.startIndex))[0];
      const rangeText = defCap ? sourceCode.substring(defCap.node.startIndex, defCap.node.endIndex) : sourceCode.substring(node.startIndex, node.endIndex);
      let actualType = outlineType;
      if (outlineType === "class" && defCap) {
        actualType = determineClassDeclarationType(defCap.node, sourceCode);
      }
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      snippets.push({
        name: name2,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        implementText: rangeText,
        scope: [],
        fileHash,
        field: "",
        definition: { name: name2, type: actualType },
        language: "swift" /* Swift */
      });
    }
  }
  return snippets.filter((snippet) => snippetTypes.includes(snippet.type)).sort((a, b) => a.startLine - b.startLine);
}
function normalizeTextForSummary(text) {
  return text.split("\n").join(" ");
}
function determineClassDeclarationType(node, sourceCode) {
  if (node.childCount > 0) {
    const firstChild = node.child(0);
    if (firstChild) {
      const firstChildType = firstChild.type;
      if (firstChildType === "struct") return "struct";
      if (firstChildType === "enum") return "enum";
      if (firstChildType === "class") return "class";
      if (firstChildType === "extension") return "extension";
    }
  }
  return "class";
}
function buildSummaryFromSnippets7(snippets) {
  const outline = [];
  const isGlobal = (s) => !s.scope || s.scope.length === 0 || s.scope.every((x) => !x);
  for (const s of snippets) {
    if (!isGlobal(s)) continue;
    if (s.type === "import_or_include" /* ImportOrInclude */) {
      outline.push({
        type: "import",
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.definitionText
      });
    } else if (s.type === "function_or_method" /* FunctionOrMethod */) {
      if (s.field) {
        outline.push({
          type: "method",
          name: s.name,
          file: s.filePath,
          field: s.field,
          description: s.definitionText
        });
      } else {
        outline.push({
          type: "function",
          name: s.name,
          file: s.filePath,
          field: "",
          description: s.definitionText
        });
      }
    } else if (s.type === "variable_or_constant" /* VariableOrConstant */) {
      const t = s.definition?.type || "var";
      outline.push({
        type: t,
        name: s.name,
        file: s.filePath,
        field: s.field || "",
        description: s.definitionText
      });
    } else if (s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */) {
      const t = s.definition?.type || "type";
      outline.push({
        type: t,
        name: s.name,
        file: s.filePath,
        field: "",
        description: s.name
      });
    }
  }
  return outline;
}
function formatOutlineText7(outline) {
  const groups = {};
  for (const entry of outline) {
    const key = entry.field ?? "";
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  let result = "";
  for (const field of Object.keys(groups).sort()) {
    const group = groups[field];
    const title = field === "" ? "[global]" : `[${field}]`;
    result += title + "\n";
    for (const entry of group) {
      let line = `  ${entry.type}`;
      if (entry.description) line += `: ${normalizeTextForSummary(entry.description)}`;
      result += line + "\n";
    }
    result += "\n";
  }
  return result.trimEnd();
}

// ../autocompletion/v2/capturesProcess/css.ts
function extractSelectorName(selectorsNode, sourceCode) {
  function findSelectorName(node) {
    if (node.type === "class_selector") {
      const classNameNode = findChildByType(node, "class_name");
      if (classNameNode) {
        return getNodeText(classNameNode, sourceCode);
      }
    }
    if (node.type === "id_selector") {
      const idNameNode = findChildByType(node, "id_name");
      if (idNameNode) {
        return getNodeText(idNameNode, sourceCode);
      }
    }
    if (node.type === "tag_name") {
      return getNodeText(node, sourceCode);
    }
    if (node.type === "pseudo_class_selector" || node.type === "pseudo_element_selector") {
      const nameNode = findChildByType(node, "class_name") || findChildByType(node, "tag_name");
      if (nameNode) {
        return getNodeText(nameNode, sourceCode);
      }
    }
    for (let i2 = 0; i2 < node.childCount; i2++) {
      const child = node.child(i2);
      if (child) {
        const name3 = findSelectorName(child);
        if (name3) return name3;
      }
    }
    return null;
  }
  const name2 = findSelectorName(selectorsNode);
  if (name2) return name2;
  const selectorText = getNodeText(selectorsNode, sourceCode).trim();
  let firstSelector = selectorText;
  const separators = [" ", ",", ">", "+", "~"];
  for (const sep of separators) {
    const index2 = firstSelector.indexOf(sep);
    if (index2 >= 0) {
      firstSelector = firstSelector.substring(0, index2);
    }
  }
  if (firstSelector.startsWith(".")) return firstSelector.substring(1);
  if (firstSelector.startsWith("#")) return firstSelector.substring(1);
  return firstSelector || "selector";
}
function isCSSVariable(propertyName) {
  return propertyName.startsWith("--");
}
function getNodeText(node, sourceCode) {
  return sourceCode.substring(node.startIndex, node.endIndex);
}
function findChildByType(node, type) {
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && child.type === type) {
      return child;
    }
  }
  return null;
}
async function extractSnippetsFromCapturesForCSS(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForCSS]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  for (const capture of captures) {
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const rangeText = getNodeText(node, sourceCode);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    if (capture.name === "definition.rule" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      const selectorsCapture = captures.find(
        (c) => c.name === "selectors.definition.rule" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      if (selectorsCapture) {
        let findSelectorType = function(node2) {
          if (node2.type === "class_selector") return "class_selector";
          if (node2.type === "id_selector") return "id_selector";
          if (node2.type === "tag_name") return "tag_selector";
          if (node2.type === "pseudo_class_selector" || node2.type === "pseudo_element_selector")
            return "pseudo_selector";
          for (let i2 = 0; i2 < node2.childCount; i2++) {
            const child = node2.child(i2);
            if (child) {
              const type = findSelectorType(child);
              if (type !== "selector") return type;
            }
          }
          return "selector";
        };
        const selectorText = getNodeText(selectorsCapture.node, sourceCode);
        const selectorName = extractSelectorName(selectorsCapture.node, sourceCode);
        let definitionType = "selector";
        definitionType = findSelectorType(selectorsCapture.node);
        snippets.push({
          name: selectorName,
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          filePath,
          startLine,
          endLine,
          rangeText,
          fileHash,
          language: "css" /* CSS */,
          definition: {
            name: selectorName,
            type: definitionType
          },
          definitionText: rangeText,
          signature: selectorName,
          scope: buildScopeChain(node)
        });
      }
    } else if (capture.name === "definition.import" && snippetTypes.includes("import_or_include" /* ImportOrInclude */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition.import" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      let importName = "import";
      if (nameCapture) {
        let rawName = getNodeText(nameCapture.node, sourceCode);
        if (rawName.startsWith('"') && rawName.endsWith('"')) {
          rawName = rawName.slice(1, -1);
        } else if (rawName.startsWith("'") && rawName.endsWith("'")) {
          rawName = rawName.slice(1, -1);
        }
        importName = rawName;
      }
      snippets.push({
        name: importName,
        type: "import_or_include" /* ImportOrInclude */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "css" /* CSS */,
        definitionText: rangeText,
        signature: `@import "${importName}"`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.keyframes" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition.keyframes" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      let keyframesName = "animation";
      if (nameCapture) {
        keyframesName = getNodeText(nameCapture.node, sourceCode);
      }
      snippets.push({
        name: keyframesName,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "css" /* CSS */,
        definition: {
          name: keyframesName,
          type: "keyframes"
        },
        definitionText: rangeText,
        signature: keyframesName,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.media" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      const queryCapture = captures.find(
        (c) => c.name === "query.definition.media" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      let mediaName = "media";
      if (queryCapture) {
        mediaName = getNodeText(queryCapture.node, sourceCode).trim();
      }
      snippets.push({
        name: mediaName,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "css" /* CSS */,
        definition: {
          name: mediaName,
          type: "media"
        },
        definitionText: rangeText,
        signature: `@media ${mediaName}`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.function" && snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      if (nameCapture) {
        const functionName = getNodeText(nameCapture.node, sourceCode);
        const argsCapture = captures.find(
          (c) => c.name === "args.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const parameters = [];
        if (argsCapture) {
          const argsText = getNodeText(argsCapture.node, sourceCode);
          const args2 = argsText.split(",").map((arg) => arg.trim()).filter((arg) => arg.length > 0);
          parameters.push(...args2.map((arg) => ({ name: arg })));
        }
        const signature = parameters.length > 0 ? `${functionName}(${parameters.map((p) => p.name).join(", ")})` : `${functionName}()`;
        snippets.push({
          name: functionName,
          type: "function_or_method" /* FunctionOrMethod */,
          filePath,
          startLine,
          endLine,
          rangeText,
          fileHash,
          language: "css" /* CSS */,
          parameters,
          definition: {
            name: functionName,
            type: "function",
            parameters
          },
          definitionText: rangeText,
          signature,
          scope: buildScopeChain(node)
        });
      }
    } else if (capture.name === "definition.declaration" && snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
      const propertyCapture = captures.find(
        (c) => c.name === "property.definition.declaration" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      if (propertyCapture) {
        const propertyName = getNodeText(propertyCapture.node, sourceCode);
        if (isCSSVariable(propertyName)) {
          const valueCapture = captures.find(
            (c) => c.name === "value.definition.declaration" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          let propertyValue = "";
          if (valueCapture) {
            propertyValue = getNodeText(valueCapture.node, sourceCode);
          }
          snippets.push({
            name: propertyName,
            type: "variable_or_constant" /* VariableOrConstant */,
            filePath,
            startLine,
            endLine,
            rangeText,
            fileHash,
            language: "css" /* CSS */,
            definition: {
              name: propertyName,
              type: "css_variable"
            },
            definitionText: `${propertyName}: ${propertyValue};`,
            signature: `${propertyName}: ${propertyValue}`,
            scope: buildScopeChain(node)
          });
        }
      }
    }
  }
  logger.info(`Extracted ${snippets.length} CSS snippets`);
  return snippets;
}
function buildSummaryFromSnippets8(snippets) {
  const selectors = [];
  const variables = [];
  const functions = [];
  const atRules = [];
  const imports = [];
  for (const snippet of snippets) {
    switch (snippet.type) {
      case "import_or_include" /* ImportOrInclude */:
        imports.push(snippet);
        break;
      case "function_or_method" /* FunctionOrMethod */:
        functions.push(snippet);
        break;
      case "variable_or_constant" /* VariableOrConstant */:
        variables.push(snippet);
        break;
      case "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */:
        if (snippet.definition?.type?.includes("selector")) {
          selectors.push(snippet);
        } else {
          atRules.push(snippet);
        }
        break;
    }
  }
  return { selectors, variables, functions, atRules, imports };
}
function formatOutlineText8(summary) {
  let outline = "CSS File Overview:\n\n";
  if (summary.imports.length > 0) {
    outline += "Imports:\n";
    for (const imp of summary.imports) {
      outline += `  - ${imp.signature}
`;
    }
    outline += "\n";
  }
  if (summary.variables.length > 0) {
    outline += "CSS Variables & Properties:\n";
    for (const variable of summary.variables) {
      outline += `  - ${variable.signature}
`;
    }
    outline += "\n";
  }
  if (summary.selectors.length > 0) {
    outline += "Selectors:\n";
    for (const selector of summary.selectors) {
      const type = selector.definition?.type || "selector";
      outline += `  - ${selector.name} (${type})
`;
    }
    outline += "\n";
  }
  if (summary.functions.length > 0) {
    outline += "CSS Functions:\n";
    for (const func2 of summary.functions) {
      outline += `  - ${func2.signature}
`;
    }
    outline += "\n";
  }
  if (summary.atRules.length > 0) {
    outline += "At-Rules:\n";
    for (const rule of summary.atRules) {
      outline += `  - @${rule.definition?.type}: ${rule.name}
`;
    }
    outline += "\n";
  }
  return outline.trim();
}

// ../autocompletion/v2/capturesProcess/html.ts
function escapeNewlinesForLogging(text) {
  return text.split("\n").join("\\n");
}
function formatTypeLabel(type) {
  return type.split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
}
function getNodeText2(node, sourceCode) {
  return sourceCode.substring(node.startIndex, node.endIndex);
}
function findChildByType2(node, type) {
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && child.type === type) {
      return child;
    }
  }
  return null;
}
function findChildByTypeRecursive(node, type) {
  if (node.type === type) {
    return node;
  }
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child) {
      const found = findChildByTypeRecursive(child, type);
      if (found) return found;
    }
  }
  return null;
}
function extractTagName(node, sourceCode) {
  const tagNameNode = findChildByTypeRecursive(node, "tag_name");
  if (tagNameNode) {
    return getNodeText2(tagNameNode, sourceCode);
  }
  return "element";
}
function extractAttributeInfo(node, sourceCode) {
  const attributeNameNode = findChildByType2(node, "attribute_name");
  const attributeValueNode = findChildByType2(node, "attribute_value") || findChildByType2(node, "quoted_attribute_value");
  const name2 = attributeNameNode ? getNodeText2(attributeNameNode, sourceCode) : "attribute";
  let value;
  if (attributeValueNode) {
    let rawValue = getNodeText2(attributeValueNode, sourceCode);
    if (rawValue.startsWith('"') && rawValue.endsWith('"') || rawValue.startsWith("'") && rawValue.endsWith("'")) {
      rawValue = rawValue.slice(1, -1);
    }
    value = rawValue;
  }
  return { name: name2, value };
}
function isSemanticElement(tagName) {
  const semanticTags = /* @__PURE__ */ new Set([
    "header",
    "nav",
    "main",
    "section",
    "article",
    "aside",
    "footer",
    "figure",
    "figcaption",
    "details",
    "summary",
    "mark",
    "time"
  ]);
  return semanticTags.has(tagName.toLowerCase());
}
function isInteractiveElement(tagName) {
  const interactiveTags = /* @__PURE__ */ new Set(["button", "input", "select", "textarea", "a", "form"]);
  return interactiveTags.has(tagName.toLowerCase());
}
async function extractSnippetsFromCapturesForHTML(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForHTML]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  for (const capture of captures) {
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const rangeText = getNodeText2(node, sourceCode);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText) + "_" + capture.name;
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    logger.info(`Processing capture: ${capture.name} -> "${escapeNewlinesForLogging(rangeText)}"`);
    if (capture.name === "definition.doctype" && snippetTypes.includes("import_or_include" /* ImportOrInclude */)) {
      snippets.push({
        name: "DOCTYPE",
        type: "import_or_include" /* ImportOrInclude */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: "DOCTYPE",
          type: "doctype"
        },
        definitionText: rangeText,
        signature: "DOCTYPE html",
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.document" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      snippets.push({
        name: "document",
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: "document",
          type: "document"
        },
        definitionText: rangeText,
        signature: "HTML Document",
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.element" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      const elementName = nameCapture ? getNodeText2(nameCapture.node, sourceCode) : extractTagName(node, sourceCode);
      let elementType = "element";
      if (isSemanticElement(elementName)) {
        elementType = "semantic_element";
      } else if (isInteractiveElement(elementName)) {
        elementType = "interactive_element";
      }
      snippets.push({
        name: elementName,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: elementName,
          type: elementType
        },
        definitionText: rangeText,
        signature: `<${elementName}>`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.script" && snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      const scriptName = nameCapture ? getNodeText2(nameCapture.node, sourceCode) : "script";
      snippets.push({
        name: scriptName,
        type: "function_or_method" /* FunctionOrMethod */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: scriptName,
          type: "script"
        },
        definitionText: rangeText,
        signature: `<${scriptName}>`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.style" && snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      const styleName = nameCapture ? getNodeText2(nameCapture.node, sourceCode) : "style";
      snippets.push({
        name: styleName,
        type: "function_or_method" /* FunctionOrMethod */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: styleName,
          type: "style"
        },
        definitionText: rangeText,
        signature: `<${styleName}>`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.void_element" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition.void" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      const elementName = nameCapture ? getNodeText2(nameCapture.node, sourceCode) : extractTagName(node, sourceCode);
      let elementType = "void_element";
      if (isInteractiveElement(elementName)) {
        elementType = "interactive_element";
      } else if (isSemanticElement(elementName)) {
        elementType = "semantic_element";
      }
      snippets.push({
        name: elementName,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: elementName,
          type: elementType
        },
        definitionText: rangeText,
        signature: elementType === "void_element" ? `<${elementName} />` : `<${elementName}>`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.self_closing_tag" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      const tagName = nameCapture ? getNodeText2(nameCapture.node, sourceCode) : "self_closing_tag";
      snippets.push({
        name: tagName,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: tagName,
          type: "self_closing_tag"
        },
        definitionText: rangeText,
        signature: `<${tagName} />`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.attribute" && snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
      const nameCapture = captures.find(
        (c) => c.name === "name.definition" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      if (nameCapture) {
        const attributeInfo = extractAttributeInfo(node, sourceCode);
        const attributeName = attributeInfo.name;
        let attributeType = "attribute";
        if (attributeName.startsWith("data-")) {
          attributeType = "data_attribute";
        } else if (attributeName.startsWith("aria-")) {
          attributeType = "aria_attribute";
        } else if (["id", "class"].includes(attributeName)) {
          attributeType = "core_attribute";
        }
        const signature = attributeInfo.value ? `${attributeName}="${attributeInfo.value}"` : attributeName;
        snippets.push({
          name: attributeName,
          type: "variable_or_constant" /* VariableOrConstant */,
          filePath,
          startLine,
          endLine,
          rangeText,
          fileHash,
          language: "html" /* HTML */,
          definition: {
            name: attributeName,
            type: attributeType
          },
          definitionText: rangeText,
          signature,
          scope: buildScopeChain(node)
        });
      }
    } else if (capture.name === "definition.comment" && snippetTypes.includes("import_or_include" /* ImportOrInclude */)) {
      let commentText = rangeText.trim();
      if (commentText.startsWith("<!--") && commentText.endsWith("-->")) {
        commentText = commentText.slice(4, -3).trim();
      }
      const firstLine = commentText.split("\n")[0].trim();
      const commentName = firstLine.length > 0 ? firstLine : "comment";
      snippets.push({
        name: commentName,
        type: "import_or_include" /* ImportOrInclude */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: commentName,
          type: "comment"
        },
        definitionText: rangeText,
        signature: `<!-- ${commentName} -->`,
        scope: buildScopeChain(node)
      });
    } else if (capture.name === "definition.text" && snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
      const lineCount = endLine - startLine + 1;
      if (lineCount >= options.minSnippetLines) {
        const textContent = rangeText.trim();
        const firstLine = textContent.split("\n")[0].trim();
        const textName = firstLine.length > 0 ? firstLine : "text";
        snippets.push({
          name: textName,
          type: "variable_or_constant" /* VariableOrConstant */,
          filePath,
          startLine,
          endLine,
          rangeText,
          fileHash,
          language: "html" /* HTML */,
          definition: {
            name: textName,
            type: "text"
          },
          definitionText: rangeText,
          signature: textName,
          scope: buildScopeChain(node)
        });
      }
    } else if (capture.name === "definition.raw_text" && snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
      const lineCount = endLine - startLine + 1;
      if (lineCount >= options.minSnippetLines) {
        const textContent = rangeText.trim();
        const firstLine = textContent.split("\n")[0].trim();
        const rawTextName = firstLine.length > 0 ? firstLine : "raw_text";
        snippets.push({
          name: rawTextName,
          type: "variable_or_constant" /* VariableOrConstant */,
          filePath,
          startLine,
          endLine,
          rangeText,
          fileHash,
          language: "html" /* HTML */,
          definition: {
            name: rawTextName,
            type: "raw_text"
          },
          definitionText: rangeText,
          signature: rawTextName,
          scope: buildScopeChain(node)
        });
      }
    } else if (capture.name === "definition.nested_elements" && snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
      const tagName = extractTagName(node, sourceCode);
      snippets.push({
        name: `${tagName}_container`,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        fileHash,
        language: "html" /* HTML */,
        definition: {
          name: `${tagName}_container`,
          type: "nested_elements"
        },
        definitionText: rangeText,
        signature: `<${tagName}> (with children)`,
        scope: buildScopeChain(node)
      });
    }
  }
  logger.info(`[CodeContext] Extracted ${snippets.length} HTML snippets`);
  return snippets;
}
function buildSummaryFromSnippets9(snippets) {
  const summary = {
    doctypes: [],
    elements: [],
    attributes: [],
    scripts: [],
    styles: [],
    comments: [],
    textContent: []
  };
  for (const snippet of snippets) {
    const defType = snippet.definition?.type || "";
    switch (defType) {
      case "doctype":
        summary.doctypes.push(snippet);
        break;
      case "element":
      case "semantic_element":
      case "interactive_element":
      case "void_element":
      case "self_closing_tag":
      case "nested_elements":
        summary.elements.push(snippet);
        break;
      case "attribute":
      case "data_attribute":
      case "aria_attribute":
      case "core_attribute":
        summary.attributes.push(snippet);
        break;
      case "script":
        summary.scripts.push(snippet);
        break;
      case "style":
        summary.styles.push(snippet);
        break;
      case "comment":
        summary.comments.push(snippet);
        break;
      case "text":
      case "raw_text":
        summary.textContent.push(snippet);
        break;
    }
  }
  return summary;
}
function formatOutlineText9(summary) {
  const lines = [];
  if (summary.doctypes.length > 0) {
    lines.push("## Document Type");
    summary.doctypes.forEach((snippet) => {
      lines.push(`- ${snippet.signature || snippet.name}`);
    });
    lines.push("");
  }
  if (summary.elements.length > 0) {
    lines.push("## HTML Elements");
    summary.elements.forEach((snippet) => {
      const typeSuffix = snippet.definition?.type === "semantic_element" ? " (semantic)" : snippet.definition?.type === "interactive_element" ? " (interactive)" : "";
      lines.push(`- ${snippet.signature || snippet.name}${typeSuffix}`);
    });
    lines.push("");
  }
  if (summary.scripts.length > 0 || summary.styles.length > 0) {
    lines.push("## Scripts & Styles");
    summary.scripts.forEach((snippet) => {
      lines.push(`- ${snippet.signature || snippet.name} (script)`);
    });
    summary.styles.forEach((snippet) => {
      lines.push(`- ${snippet.signature || snippet.name} (style)`);
    });
    lines.push("");
  }
  if (summary.attributes.length > 0) {
    lines.push("## Attributes");
    const attributesByType = {};
    summary.attributes.forEach((snippet) => {
      const type = snippet.definition?.type || "attribute";
      if (!attributesByType[type]) attributesByType[type] = [];
      attributesByType[type].push(snippet);
    });
    Object.keys(attributesByType).sort().forEach((type) => {
      const typeLabel = formatTypeLabel(type);
      lines.push(`### ${typeLabel}`);
      attributesByType[type].forEach((snippet) => {
        lines.push(`- ${snippet.signature || snippet.name}`);
      });
    });
    lines.push("");
  }
  if (summary.comments.length > 0) {
    lines.push("## Comments");
    summary.comments.forEach((snippet) => {
      lines.push(`- ${snippet.name}`);
    });
    lines.push("");
  }
  if (summary.textContent.length > 0) {
    lines.push("## Text Content");
    summary.textContent.forEach((snippet) => {
      const preview = snippet.name.length > 50 ? snippet.name.substring(0, 47) + "..." : snippet.name;
      lines.push(`- ${preview}`);
    });
    lines.push("");
  }
  return lines.join("\n").trim();
}

// ../autocompletion/v2/capturesProcess/kotlin.ts
var crypto2 = __toESM(require("crypto"));
function extractModifiers(node, sourceCode) {
  const modifiers = [];
  const modifierNode = node.children.find((child) => child.type === "modifiers");
  if (modifierNode) {
    modifierNode.children.forEach((child) => {
      if (child.type === "visibility_modifier" || child.type === "modifier") {
        const modifier = sourceCode.substring(child.startIndex, child.endIndex);
        modifiers.push(modifier);
      }
    });
  }
  return modifiers;
}
function extractImportPath(importNode, sourceCode) {
  const fullImportText = sourceCode.substring(importNode.startIndex, importNode.endIndex);
  const importKeywordIndex = fullImportText.indexOf("import");
  if (importKeywordIndex === -1) return fullImportText.trim();
  const importKeywordEnd = importKeywordIndex + 6;
  let pathPart = fullImportText.substring(importKeywordEnd).trim();
  pathPart = pathPart.split("\n")[0].split("\r")[0].split(";")[0].trim();
  return pathPart;
}
function getDefinitionType(node, sourceCode) {
  if (node.type === "object_declaration") return "object";
  if (node.type === "type_alias") return "typealias";
  if (node.type === "class_declaration") {
    const modifierNode = node.children.find((child) => child.type === "modifiers");
    if (modifierNode) {
      const modifierTexts = modifierNode.children.map(
        (child) => sourceCode.substring(child.startIndex, child.endIndex)
      );
      if (modifierTexts.includes("sealed")) return "sealed class";
      if (modifierTexts.includes("data")) return "data class";
      if (modifierTexts.includes("enum")) return "enum";
      if (modifierTexts.includes("annotation")) return "annotation class";
    }
    const hasEnumBody = node.children.some((child) => child.type === "enum_class_body");
    if (hasEnumBody) return "enum";
    const hasInterfaceKeyword = node.children.some((child) => {
      if (child.type === "interface") return true;
      const childText = sourceCode.substring(child.startIndex, child.endIndex);
      return childText === "interface";
    });
    if (hasInterfaceKeyword) return "interface";
    return "class";
  }
  return "class";
}
function findParentClassName(captures, node, sourceCode) {
  const classCapture = captures.find(
    (c) => c.name === "definition.class" && c.node.startIndex <= node.startIndex && c.node.endIndex >= node.endIndex
  );
  if (classCapture) {
    const nameNode = classCapture.node.children.find((child) => child.type === "type_identifier");
    return nameNode ? sourceCode.substring(nameNode.startIndex, nameNode.endIndex) : void 0;
  }
  return void 0;
}
function parseParameterInfo(paramNode, sourceCode) {
  const nameNode = paramNode.children.find((child) => child.type === "simple_identifier");
  const name2 = nameNode ? sourceCode.substring(nameNode.startIndex, nameNode.endIndex) : "";
  const typeNode = paramNode.children.find((child) => child.type === "user_type" || child.type === "type_identifier");
  const type = typeNode ? sourceCode.substring(typeNode.startIndex, typeNode.endIndex) : void 0;
  const defaultValueNode = paramNode.children.find((child) => child.type === "default_value");
  const defaultValue = defaultValueNode ? sourceCode.substring(defaultValueNode.startIndex, defaultValueNode.endIndex) : void 0;
  return {
    name: name2.trim(),
    type: type?.trim(),
    defaultValue: defaultValue?.trim(),
    isOptional: !!defaultValue
  };
}
function extractParameters(node, sourceCode) {
  const parameters = [];
  const parameterList = node.children.find((child) => child.type === "function_value_parameters");
  if (parameterList) {
    const paramNodes = parameterList.children.filter((child) => child.type === "parameter");
    paramNodes.forEach((paramNode) => {
      const paramInfo = parseParameterInfo(paramNode, sourceCode);
      if (paramInfo.name) {
        parameters.push(paramInfo);
      }
    });
  }
  return parameters;
}
function extractReturnType(node, sourceCode) {
  const returnTypeNode = node.children.find((child) => child.type === "user_type" || child.type === "type_identifier");
  if (returnTypeNode) {
    return sourceCode.substring(returnTypeNode.startIndex, returnTypeNode.endIndex);
  }
  return "Unit";
}
async function extractSnippetsFromCapturesForKotlin(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForKotlin]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  if (snippetTypes.includes("import_or_include" /* ImportOrInclude */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.import") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const importPath = extractImportPath(node, sourceCode);
        const name2 = importPath;
        const scope = ["global"];
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex).trim();
        const hash = crypto2.createHash("md5").update(`${name2}-${filePath}-${startLine}`).digest("hex");
        if (seenHashes.has(hash)) {
          return;
        }
        seenHashes.add(hash);
        snippets.push({
          name: name2,
          type: "import_or_include" /* ImportOrInclude */,
          filePath,
          startLine,
          endLine,
          rangeText,
          definitionText: rangeText,
          scope,
          fileHash,
          language: "kotlin" /* Kotlin */,
          definition: {
            name: name2,
            type: "import"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.class" || capture.name === "definition.object") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const nameNode = node.children.find((child) => child.type === "type_identifier");
        const name2 = nameNode ? sourceCode.substring(nameNode.startIndex, nameNode.endIndex) : "";
        if (!name2) return;
        const scope = ["global"];
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const hash = crypto2.createHash("md5").update(`${name2}-${filePath}-${startLine}`).digest("hex");
        if (seenHashes.has(hash)) {
          return;
        }
        seenHashes.add(hash);
        const modifiers = extractModifiers(node, sourceCode);
        const definitionType = getDefinitionType(node, sourceCode);
        snippets.push({
          name: name2,
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          filePath,
          startLine,
          endLine,
          rangeText,
          definitionText: rangeText,
          scope,
          fileHash,
          language: "kotlin" /* Kotlin */,
          definition: {
            name: name2,
            type: definitionType,
            visibility: modifiers.includes("private") ? "private" : modifiers.includes("protected") ? "protected" : modifiers.includes("internal") ? "internal" : "public"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.function") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const nameNode = node.children.find((child) => child.type === "simple_identifier");
        const name2 = nameNode ? sourceCode.substring(nameNode.startIndex, nameNode.endIndex) : "";
        if (!name2) return;
        const scope = ["global"];
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const hash = crypto2.createHash("md5").update(`${name2}-${filePath}-${startLine}`).digest("hex");
        if (seenHashes.has(hash)) {
          return;
        }
        seenHashes.add(hash);
        const parameters = extractParameters(node, sourceCode);
        const returnType = extractReturnType(node, sourceCode);
        const modifiers = extractModifiers(node, sourceCode);
        const className = findParentClassName(captures, node, sourceCode);
        snippets.push({
          name: name2,
          type: "function_or_method" /* FunctionOrMethod */,
          filePath,
          startLine,
          endLine,
          rangeText,
          definitionText: rangeText,
          scope,
          fileHash,
          language: "kotlin" /* Kotlin */,
          parameters,
          ...className && { field: className },
          definition: {
            name: name2,
            type: "function",
            parameters,
            returnType,
            visibility: modifiers.includes("private") ? "private" : modifiers.includes("protected") ? "protected" : modifiers.includes("internal") ? "internal" : "public",
            ...className && { className }
          }
        });
      }
    });
  }
  if (snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.property") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        let nameNode = node.children.find((child) => child.type === "simple_identifier");
        if (!nameNode) {
          const variableDecl = node.children.find((child) => child.type === "variable_declaration");
          if (variableDecl) {
            nameNode = variableDecl.children.find((child) => child.type === "simple_identifier");
          }
        }
        const name2 = nameNode ? sourceCode.substring(nameNode.startIndex, nameNode.endIndex) : "";
        if (!name2) return;
        const scope = ["global"];
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const hash = crypto2.createHash("md5").update(`${name2}-${filePath}-${startLine}`).digest("hex");
        if (seenHashes.has(hash)) {
          return;
        }
        seenHashes.add(hash);
        const modifiers = extractModifiers(node, sourceCode);
        const className = findParentClassName(captures, node, sourceCode);
        snippets.push({
          name: name2,
          type: "variable_or_constant" /* VariableOrConstant */,
          filePath,
          startLine,
          endLine,
          rangeText,
          definitionText: rangeText,
          scope,
          fileHash,
          language: "kotlin" /* Kotlin */,
          ...className && { field: className },
          definition: {
            name: name2,
            type: "property",
            visibility: modifiers.includes("private") ? "private" : modifiers.includes("protected") ? "protected" : modifiers.includes("internal") ? "internal" : "public",
            ...className && { className }
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.type_alias") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const nameNode = node.children.find((child) => child.type === "type_identifier");
        const name2 = nameNode ? sourceCode.substring(nameNode.startIndex, nameNode.endIndex) : "";
        if (!name2) return;
        const scope = ["global"];
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const hash = crypto2.createHash("md5").update(`${name2}-${filePath}-${startLine}`).digest("hex");
        if (seenHashes.has(hash)) {
          return;
        }
        seenHashes.add(hash);
        snippets.push({
          name: name2,
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          filePath,
          startLine,
          endLine,
          rangeText,
          definitionText: rangeText,
          scope,
          fileHash,
          language: "kotlin" /* Kotlin */,
          definition: {
            name: name2,
            type: "type_alias"
          }
        });
      }
    });
  }
  return snippets;
}
function buildSummaryFromSnippets10(snippets) {
  const summary = {
    imports: snippets.filter((s) => s.type === "import_or_include" /* ImportOrInclude */),
    classes: snippets.filter((s) => s.type === "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */),
    functions: snippets.filter((s) => s.type === "function_or_method" /* FunctionOrMethod */),
    variables: snippets.filter((s) => s.type === "variable_or_constant" /* VariableOrConstant */)
  };
  return summary;
}
function formatOutlineText10(summary) {
  const lines = [];
  if (summary.imports?.length > 0) {
    lines.push("# Imports");
    summary.imports.forEach((item) => {
      lines.push(`  import: ${item.name}`);
    });
    lines.push("");
  }
  if (summary.classes?.length > 0) {
    lines.push("# Classes/Interfaces/Objects");
    summary.classes.forEach((item) => {
      const type = item.definition?.type || "class";
      lines.push(`  ${type}: ${item.name}`);
    });
    lines.push("");
  }
  if (summary.functions?.length > 0) {
    lines.push("# Functions/Methods");
    summary.functions.forEach((item) => {
      const params = item.definition?.parameters?.map((p) => `${p.name}: ${p.type || "Any"}`).join(", ") || "";
      const returnType = item.definition?.returnType || "Unit";
      const className = item.field;
      const prefix = className ? `[${className}] ` : "";
      lines.push(`  ${prefix}${item.name}(${params}): ${returnType}`);
    });
    lines.push("");
  }
  if (summary.variables?.length > 0) {
    lines.push("# Variables/Properties");
    summary.variables.forEach((item) => {
      const className = item.field;
      const prefix = className ? `[${className}] ` : "";
      lines.push(`  ${prefix}property: ${item.name}`);
    });
    lines.push("");
  }
  return lines.join("\n");
}

// ../autocompletion/v2/capturesProcess/php.ts
async function extractSnippetsFromCapturesForPHP(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForPHP]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  const classCaptures = captures.filter(
    (c) => c.name === "definition.class" || c.name === "definition.abstract_class" || c.name === "definition.final_class" || c.name === "definition.readonly_class"
  ).map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    nameCap: captures.find(
      (nc) => (nc.name === "name.definition.class" || nc.name === "name.definition.abstract_class" || nc.name === "name.definition.final_class" || nc.name === "name.definition.readonly_class") && nc.node.startIndex >= c.node.startIndex && nc.node.endIndex <= c.node.endIndex
    )
  }));
  const interfaceCaptures = captures.filter((c) => c.name === "definition.interface").map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    nameCap: captures.find(
      (nc) => nc.name === "name.definition.interface" && nc.node.startIndex >= c.node.startIndex && nc.node.endIndex <= c.node.endIndex
    )
  }));
  const traitCaptures = captures.filter((c) => c.name === "definition.trait").map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    nameCap: captures.find(
      (nc) => nc.name === "name.definition.trait" && nc.node.startIndex >= c.node.startIndex && nc.node.endIndex <= c.node.endIndex
    )
  }));
  const enumCaptures = captures.filter((c) => c.name === "definition.enum").map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    nameCap: captures.find(
      (nc) => nc.name === "name.definition.enum" && nc.node.startIndex >= c.node.startIndex && nc.node.endIndex <= c.node.endIndex
    )
  }));
  const namespaceCaptures = captures.filter((c) => c.name === "definition.namespace").map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    nameCap: captures.find(
      (nc) => nc.name === "name.definition.namespace" && nc.node.startIndex >= c.node.startIndex && nc.node.endIndex <= c.node.endIndex
    )
  }));
  function findNamespaceForNode(node) {
    let closestNamespace = void 0;
    let closestDistance = Infinity;
    for (const ns of namespaceCaptures) {
      if (ns.start < node.startIndex && ns.nameCap) {
        const distance = node.startIndex - ns.start;
        if (distance < closestDistance) {
          closestDistance = distance;
          closestNamespace = sourceCode.substring(ns.nameCap.node.startIndex, ns.nameCap.node.endIndex);
        }
      }
    }
    return closestNamespace;
  }
  captures.forEach((capture) => {
    if (capture.name === "name.definition.use") {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) return;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      const scope = buildScopeChain(node);
      const namespace = findNamespaceForNode(node);
      snippets.push({
        name: name2,
        type: "import_or_include" /* ImportOrInclude */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        scope,
        fileHash,
        namespace
      });
    }
  });
  for (const capture of captures) {
    if (capture.name !== "definition.function" && capture.name !== "definition.method" && capture.name !== "definition.static_method" && capture.name !== "definition.abstract_method" && capture.name !== "definition.final_method")
      continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    let nameCapName;
    let paramCapName;
    let bodyCapName;
    if (capture.name === "definition.function") {
      nameCapName = "name.definition.function";
      paramCapName = "parameters.definition.function";
      bodyCapName = "body.definition.function";
    } else if (capture.name === "definition.method") {
      nameCapName = "name.definition.method";
      paramCapName = "parameters.definition.method";
      bodyCapName = "body.definition.method";
    } else if (capture.name === "definition.static_method") {
      nameCapName = "name.definition.static_method";
      paramCapName = "parameters.definition.static_method";
      bodyCapName = "body.definition.static_method";
    } else if (capture.name === "definition.abstract_method") {
      nameCapName = "name.definition.abstract_method";
      paramCapName = "parameters.definition.abstract_method";
      bodyCapName = "body.definition.abstract_method";
    } else if (capture.name === "definition.final_method") {
      nameCapName = "name.definition.final_method";
      paramCapName = "parameters.definition.final_method";
      bodyCapName = "body.definition.final_method";
    } else {
      continue;
    }
    const nameCap = captures.find(
      (c) => c.name === nameCapName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const paramCap = captures.find(
      (c) => c.name === paramCapName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    const parameters = [];
    if (paramCap) {
      const paramText = sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex);
      const cleanText = removeParentheses2(paramText).trim();
      if (cleanText) {
        const paramList = parsePHPParameters(cleanText);
        parameters.push(...paramList.map((param) => ({ name: param })));
      }
    }
    const bodyCap = captures.find(
      (c) => c.name === bodyCapName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    let rangeText;
    let implementText = void 0;
    if (bodyCap) {
      rangeText = sourceCode.substring(node.startIndex, bodyCap.node.startIndex).trimEnd();
      implementText = sourceCode.substring(node.startIndex, node.endIndex);
    } else {
      rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    }
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const paramStr = parameters.map((p) => p.name).join(", ");
    const signature = `${name2}(${paramStr})`;
    const scope = buildScopeChain(node);
    let field = void 0;
    const allParentCaptures = [...classCaptures, ...interfaceCaptures, ...traitCaptures, ...enumCaptures];
    for (const parent of allParentCaptures) {
      if (node.startIndex > parent.start && node.endIndex <= parent.end && parent.nameCap) {
        field = sourceCode.substring(parent.nameCap.node.startIndex, parent.nameCap.node.endIndex);
        break;
      }
    }
    const namespace = findNamespaceForNode(node);
    snippets.push({
      name: name2,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      namespace,
      definition: {
        name: name2,
        type: capture.name === "definition.function" ? "function" : "method",
        parameters,
        returnType: "mixed"
        // PHP默认返回类型
      },
      parameters,
      signature,
      language: "php" /* PHP */,
      ...implementText ? { implementText } : {}
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.property" && capture.name !== "definition.static_property" && capture.name !== "definition.readonly_property" && capture.name !== "definition.promoted_property")
      continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    let nameCapName;
    if (capture.name === "definition.property") {
      nameCapName = "name.definition.property";
    } else if (capture.name === "definition.static_property") {
      nameCapName = "name.definition.static_property";
    } else if (capture.name === "definition.readonly_property") {
      nameCapName = "name.definition.readonly_property";
    } else if (capture.name === "definition.promoted_property") {
      nameCapName = "name.definition.promoted_property";
    } else {
      continue;
    }
    const nameCap = captures.find(
      (c) => c.name === nameCapName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    let field = void 0;
    const allParentCaptures = [...classCaptures, ...interfaceCaptures, ...traitCaptures, ...enumCaptures];
    for (const parent of allParentCaptures) {
      if (node.startIndex > parent.start && node.endIndex <= parent.end && parent.nameCap) {
        field = sourceCode.substring(parent.nameCap.node.startIndex, parent.nameCap.node.endIndex);
        break;
      }
    }
    const namespace = findNamespaceForNode(node);
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      namespace,
      language: "php" /* PHP */
    });
  }
  for (const capture of captures) {
    if (capture.name !== "definition.constant") continue;
    const node = capture.node;
    const startLine = node.startPosition.row + 1;
    const endLine = node.endPosition.row + 1;
    const nameCap = captures.find(
      (c) => c.name === "name.definition.constant" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (!nameCap) continue;
    const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
    const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
    const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
    if (seenHashes.has(snippetHash)) continue;
    seenHashes.add(snippetHash);
    const scope = buildScopeChain(node);
    let field = void 0;
    const allParentCaptures = [...classCaptures, ...interfaceCaptures, ...traitCaptures, ...enumCaptures];
    for (const parent of allParentCaptures) {
      if (node.startIndex > parent.start && node.endIndex <= parent.end && parent.nameCap) {
        field = sourceCode.substring(parent.nameCap.node.startIndex, parent.nameCap.node.endIndex);
        break;
      }
    }
    const namespace = findNamespaceForNode(node);
    snippets.push({
      name: name2,
      type: "variable_or_constant" /* VariableOrConstant */,
      filePath,
      startLine,
      endLine,
      rangeText,
      definitionText: rangeText,
      scope,
      fileHash,
      field,
      namespace,
      language: "php" /* PHP */
    });
  }
  const typeDefs = [
    { capture: "name.definition.class", outlineType: "class" },
    { capture: "name.definition.abstract_class", outlineType: "abstract_class" },
    { capture: "name.definition.final_class", outlineType: "final_class" },
    { capture: "name.definition.readonly_class", outlineType: "readonly_class" },
    { capture: "name.definition.interface", outlineType: "interface" },
    { capture: "name.definition.trait", outlineType: "trait" },
    { capture: "name.definition.enum", outlineType: "enum" }
  ];
  for (const { capture, outlineType } of typeDefs) {
    const defCaptureName = `definition.${outlineType}`;
    for (const cap of captures.filter((c) => c.name === capture)) {
      const node = cap.node;
      const isInMethod = captures.some(
        (fc) => (fc.name === "definition.function" || fc.name === "definition.method" || fc.name === "definition.static_method" || fc.name === "definition.abstract_method" || fc.name === "definition.final_method") && fc.node.startIndex < node.startIndex && node.endIndex < fc.node.endIndex
      );
      if (isInMethod) continue;
      const defCap = captures.find(
        (c) => c.name === defCaptureName && c.node.startIndex <= node.startIndex && node.endIndex <= c.node.endIndex
      );
      const rangeText = defCap ? sourceCode.substring(defCap.node.startIndex, defCap.node.endIndex) : sourceCode.substring(node.startIndex, node.endIndex);
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const name2 = sourceCode.substring(node.startIndex, node.endIndex);
      const scope = buildScopeChain(node);
      const namespace = findNamespaceForNode(node);
      snippets.push({
        name: name2,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        implementText: rangeText,
        scope,
        fileHash,
        namespace,
        language: "php" /* PHP */
      });
    }
  }
  return snippets;
}
function parsePHPParameters(paramText) {
  const params = [];
  let current = "";
  let depth = 0;
  let inString = false;
  let stringChar = "";
  for (let i2 = 0; i2 < paramText.length; i2++) {
    const char = paramText[i2];
    const prev = i2 > 0 ? paramText[i2 - 1] : "";
    if (!inString) {
      if (char === '"' || char === "'") {
        inString = true;
        stringChar = char;
      } else if (char === "(" || char === "[" || char === "{") {
        depth++;
      } else if (char === ")" || char === "]" || char === "}") {
        depth--;
      } else if (char === "," && depth === 0) {
        if (current.trim()) {
          params.push(extractPHPParamName(current.trim()));
        }
        current = "";
        continue;
      }
    } else {
      if (char === stringChar && prev !== "\\") {
        inString = false;
        stringChar = "";
      }
    }
    current += char;
  }
  if (current.trim()) {
    params.push(extractPHPParamName(current.trim()));
  }
  return params;
}
function extractPHPParamName(param) {
  let cleaned = removeReferenceAndSplatOperators(param);
  const variableName = findPHPVariableName(cleaned);
  if (variableName) {
    return variableName;
  }
  return param;
}
function removeParentheses2(text) {
  if (text.startsWith("(") && text.endsWith(")")) {
    return text.slice(1, -1);
  }
  return text;
}
function removeReferenceAndSplatOperators(param) {
  let result = param.trim();
  while (result.startsWith(" ") || result.startsWith("	")) {
    result = result.slice(1);
  }
  if (result.startsWith("&")) {
    result = result.slice(1).trim();
  }
  if (result.startsWith("...")) {
    result = result.slice(3).trim();
  }
  return result;
}
function findPHPVariableName(text) {
  for (let i2 = 0; i2 < text.length; i2++) {
    if (text[i2] === "$") {
      let variableName = "$";
      let j = i2 + 1;
      while (j < text.length) {
        const char = text[j];
        if (isValidPHPVariableChar(char)) {
          variableName += char;
          j++;
        } else {
          break;
        }
      }
      if (variableName.length > 1) {
        return variableName;
      }
    }
  }
  return null;
}
function isValidPHPVariableChar(char) {
  return char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char >= "0" && char <= "9" || char === "_";
}
function buildSummaryFromSnippets11(snippets) {
  const outline = {
    imports: [],
    classes: [],
    interfaces: [],
    traits: [],
    enums: [],
    functions: [],
    constants: [],
    namespaces: []
  };
  for (const snippet of snippets) {
    if (snippet.namespace && !outline.namespaces.includes(snippet.namespace)) {
      outline.namespaces.push(snippet.namespace);
    }
    switch (snippet.type) {
      case "import_or_include" /* ImportOrInclude */:
        outline.imports.push(snippet.name);
        break;
      case "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */:
        if (snippet.name.includes("interface")) {
          outline.interfaces.push(snippet.name);
        } else if (snippet.name.includes("trait")) {
          outline.traits.push(snippet.name);
        } else if (snippet.name.includes("enum")) {
          outline.enums.push(snippet.name);
        } else {
          outline.classes.push(snippet.name);
        }
        break;
      case "function_or_method" /* FunctionOrMethod */:
        outline.functions.push(snippet.name);
        break;
      case "variable_or_constant" /* VariableOrConstant */:
        if (snippet.name.includes("const")) {
          outline.constants.push(snippet.name);
        }
        break;
    }
  }
  return outline;
}
function formatOutlineText11(outline) {
  const sections = [];
  if (outline.namespaces.length > 0) {
    sections.push(`Namespaces: ${outline.namespaces.join(", ")}`);
  }
  if (outline.imports.length > 0) {
    sections.push(`Imports: ${outline.imports.join(", ")}`);
  }
  if (outline.classes.length > 0) {
    sections.push(`Classes: ${outline.classes.join(", ")}`);
  }
  if (outline.interfaces.length > 0) {
    sections.push(`Interfaces: ${outline.interfaces.join(", ")}`);
  }
  if (outline.traits.length > 0) {
    sections.push(`Traits: ${outline.traits.join(", ")}`);
  }
  if (outline.enums.length > 0) {
    sections.push(`Enums: ${outline.enums.join(", ")}`);
  }
  if (outline.functions.length > 0) {
    sections.push(`Functions: ${outline.functions.join(", ")}`);
  }
  if (outline.constants.length > 0) {
    sections.push(`Constants: ${outline.constants.join(", ")}`);
  }
  return sections.join("\n");
}

// ../autocompletion/v2/capturesProcess/rust.ts
async function extractSnippetsFromCapturesForRust(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForRust]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  const containerCaptures = captures.filter(
    (c) => c.name === "definition.struct" || c.name === "definition.enum" || c.name === "definition.trait" || c.name === "definition.impl" || c.name === "definition.impl_trait"
  ).map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    name: c.name,
    nameCap: findNameCaptureForContainer(c, captures, sourceCode)
  })).filter((c) => c.nameCap);
  if (snippetTypes.includes("import_or_include" /* ImportOrInclude */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.use_declaration") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
        if (seenHashes.has(snippetHash)) return;
        seenHashes.add(snippetHash);
        const name2 = extractUseStatementName(rangeText);
        const scope = buildScopeChain(node);
        snippets.push({
          name: name2,
          type: "import_or_include" /* ImportOrInclude */,
          filePath,
          startLine,
          endLine,
          rangeText,
          definitionText: rangeText,
          scope,
          fileHash
        });
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    for (const capture of captures) {
      if (capture.name !== "definition.function") continue;
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const nameCap = captures.find(
        (c) => c.name === "name.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      if (!nameCap) continue;
      const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
      const paramCap = captures.find(
        (c) => c.name === "parameters.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      const parameters = [];
      if (paramCap) {
        const paramText = sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex);
        const cleanParams = removeParentheses3(paramText).trim();
        if (cleanParams) {
          const paramList = parseRustParameters(cleanParams);
          parameters.push(...paramList.map((param) => ({ name: param })));
        }
      }
      const bodyCap = captures.find(
        (c) => c.name === "body.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
      );
      let definitionText;
      let implementText = void 0;
      if (bodyCap) {
        const functionHeader = sourceCode.substring(node.startIndex, bodyCap.node.startIndex).trimEnd();
        definitionText = functionHeader.endsWith("{") ? functionHeader.slice(0, -1).trim() : functionHeader;
        implementText = sourceCode.substring(node.startIndex, node.endIndex);
      } else {
        definitionText = sourceCode.substring(node.startIndex, node.endIndex);
      }
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      let field = void 0;
      const sortedContainers = containerCaptures.sort((a, b) => {
        if (a.name === "definition.impl_trait" && b.name !== "definition.impl_trait") return -1;
        if (a.name !== "definition.impl_trait" && b.name === "definition.impl_trait") return 1;
        return 0;
      });
      for (const container of sortedContainers) {
        if (node.startIndex > container.start && node.endIndex <= container.end && container.nameCap) {
          field = container.nameCap;
          break;
        }
      }
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const scope = buildScopeChain(node);
      snippets.push({
        name: name2,
        type: "function_or_method" /* FunctionOrMethod */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText,
        implementText,
        parameters,
        field,
        scope,
        fileHash
      });
    }
    for (const capture of captures) {
      if (capture.name !== "name.definition.method") continue;
      const methodNode = capture.node;
      const name2 = sourceCode.substring(methodNode.startIndex, methodNode.endIndex);
      const implCapture = captures.find(
        (c) => (c.name === "definition.impl" || c.name === "definition.impl_trait") && c.node.startIndex <= methodNode.startIndex && c.node.endIndex >= methodNode.endIndex
      );
      if (!implCapture) continue;
      const functionNode = findParentFunctionNode(methodNode, sourceCode);
      if (!functionNode) continue;
      const startLine = functionNode.startPosition.row + 1;
      const endLine = functionNode.endPosition.row + 1;
      const paramCap = captures.find(
        (c) => c.name === "parameters.definition.method" && c.node.startIndex >= functionNode.startIndex && c.node.endIndex <= functionNode.endIndex
      );
      const parameters = [];
      if (paramCap) {
        const paramText = sourceCode.substring(paramCap.node.startIndex, paramCap.node.endIndex);
        const cleanParams = removeParentheses3(paramText).trim();
        if (cleanParams) {
          const paramList = parseRustParameters(cleanParams);
          parameters.push(...paramList.map((param) => ({ name: param })));
        }
      }
      const bodyCap = captures.find(
        (c) => c.name === "body.definition.method" && c.node.startIndex >= functionNode.startIndex && c.node.endIndex <= functionNode.endIndex
      );
      let definitionText;
      let implementText = void 0;
      if (bodyCap) {
        const methodHeader = sourceCode.substring(functionNode.startIndex, bodyCap.node.startIndex).trimEnd();
        definitionText = methodHeader.endsWith("{") ? methodHeader.slice(0, -1).trim() : methodHeader;
        implementText = sourceCode.substring(functionNode.startIndex, functionNode.endIndex);
      } else {
        definitionText = sourceCode.substring(functionNode.startIndex, functionNode.endIndex);
      }
      const rangeText = sourceCode.substring(functionNode.startIndex, functionNode.endIndex);
      let field = void 0;
      const sortedContainers = containerCaptures.sort((a, b) => {
        if (a.name === "definition.impl_trait" && b.name !== "definition.impl_trait") return -1;
        if (a.name !== "definition.impl_trait" && b.name === "definition.impl_trait") return 1;
        return 0;
      });
      for (const container of sortedContainers) {
        if (functionNode.startIndex > container.start && functionNode.endIndex <= container.end && container.nameCap) {
          field = container.nameCap;
          break;
        }
      }
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const scope = buildScopeChain(functionNode);
      snippets.push({
        name: name2,
        type: "function_or_method" /* FunctionOrMethod */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText,
        implementText,
        parameters,
        field,
        scope,
        fileHash
      });
    }
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const structureTypes = [
      "definition.struct",
      "definition.enum",
      "definition.trait",
      "definition.impl",
      "definition.impl_trait"
    ];
    const processedNodes = /* @__PURE__ */ new Set();
    for (const capture of captures) {
      if (!structureTypes.includes(capture.name)) continue;
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const nodeKey = `${node.startIndex}:${node.endIndex}`;
      if (processedNodes.has(nodeKey)) continue;
      if (capture.name === "definition.impl") {
        const hasImplTrait = captures.some(
          (c) => c.name === "definition.impl_trait" && c.node.startIndex === node.startIndex && c.node.endIndex === node.endIndex
        );
        if (hasImplTrait) continue;
      }
      processedNodes.add(nodeKey);
      let nameCap;
      let name2 = "";
      switch (capture.name) {
        case "definition.struct":
          nameCap = captures.find(
            (c) => c.name === "name.definition.struct" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          if (nameCap) {
            name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
          }
          break;
        case "definition.enum":
          nameCap = captures.find(
            (c) => c.name === "name.definition.enum" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          if (nameCap) {
            name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
          }
          break;
        case "definition.trait":
          nameCap = captures.find(
            (c) => c.name === "name.definition.trait" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          if (nameCap) {
            name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
          }
          break;
        case "definition.impl":
          nameCap = captures.find(
            (c) => c.name === "name.definition.impl" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          if (nameCap) {
            name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
          }
          break;
        case "definition.impl_trait":
          const traitCap = captures.find(
            (c) => c.name === "name.definition.impl_trait" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          const forCap = captures.find(
            (c) => c.name === "name.definition.impl_for" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          if (traitCap && forCap) {
            const traitName = sourceCode.substring(traitCap.node.startIndex, traitCap.node.endIndex);
            const forName = sourceCode.substring(forCap.node.startIndex, forCap.node.endIndex);
            name2 = `${traitName} for ${forName}`;
          }
          break;
      }
      if (!name2) continue;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (seenHashes.has(snippetHash)) continue;
      seenHashes.add(snippetHash);
      const scope = buildScopeChain(node);
      snippets.push({
        name: name2,
        type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
        filePath,
        startLine,
        endLine,
        rangeText,
        definitionText: rangeText,
        scope,
        fileHash
      });
    }
  }
  if (snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
    const variableTypes = [
      { captureName: "definition.variable", nameCapture: "name.definition.variable" },
      { captureName: "definition.constant", nameCapture: "name.definition.constant" },
      { captureName: "definition.static", nameCapture: "name.definition.static" }
    ];
    for (const { captureName, nameCapture } of variableTypes) {
      for (const capture of captures) {
        if (capture.name !== captureName) continue;
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const nameCap = captures.find(
          (c) => c.name === nameCapture && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        if (!nameCap) continue;
        const name2 = sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex);
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
        if (seenHashes.has(snippetHash)) continue;
        seenHashes.add(snippetHash);
        let field = void 0;
        for (const container of containerCaptures) {
          if (node.startIndex > container.start && node.endIndex <= container.end && container.nameCap) {
            field = container.nameCap;
            break;
          }
        }
        const scope = buildScopeChain(node);
        snippets.push({
          name: name2,
          type: "variable_or_constant" /* VariableOrConstant */,
          filePath,
          startLine,
          endLine,
          rangeText,
          definitionText: rangeText,
          field,
          scope,
          fileHash
        });
      }
    }
  }
  return snippets;
}
function parseRustParameters(paramText) {
  const params = [];
  let current = "";
  let depth = 0;
  let inString = false;
  let escapeNext = false;
  for (let i2 = 0; i2 < paramText.length; i2++) {
    const char = paramText[i2];
    if (escapeNext) {
      current += char;
      escapeNext = false;
      continue;
    }
    if (char === "\\") {
      escapeNext = true;
      current += char;
      continue;
    }
    if (char === '"' || char === "'") {
      inString = !inString;
      current += char;
      continue;
    }
    if (inString) {
      current += char;
      continue;
    }
    if (char === "<" || char === "(" || char === "[" || char === "{") {
      depth++;
    } else if (char === ">" || char === ")" || char === "]" || char === "}") {
      depth--;
    }
    if (char === "," && depth === 0) {
      const param2 = current.trim();
      if (param2) {
        const colonIndex = param2.indexOf(":");
        const paramName = colonIndex > -1 ? param2.substring(0, colonIndex).trim() : param2;
        if (paramName === "self" || paramName === "&self" || paramName === "&mut self") {
          params.push(paramName);
        } else {
          params.push(paramName);
        }
      }
      current = "";
    } else {
      current += char;
    }
  }
  const param = current.trim();
  if (param) {
    const colonIndex = param.indexOf(":");
    const paramName = colonIndex > -1 ? param.substring(0, colonIndex).trim() : param;
    if (paramName === "self" || paramName === "&self" || paramName === "&mut self") {
      params.push(paramName);
    } else {
      params.push(paramName);
    }
  }
  return params;
}
function extractUseStatementName(useStatement) {
  let cleaned = removeUseKeywordAndSemicolon(useStatement).trim();
  const asIndex = cleaned.lastIndexOf(" as ");
  if (asIndex > -1) {
    return cleaned.substring(asIndex + 4).trim();
  }
  if (cleaned.includes("{") && cleaned.includes("}")) {
    const braceContent = extractBraceContent(cleaned);
    if (braceContent) {
      const items = braceContent.split(",").map((s) => s.trim());
      return items.join(", ");
    }
  }
  const parts2 = cleaned.split("::");
  return parts2[parts2.length - 1].trim();
}
function findNameCaptureForContainer(container, captures, sourceCode) {
  let nameCaptureName;
  switch (container.name) {
    case "definition.struct":
      nameCaptureName = "name.definition.struct";
      break;
    case "definition.enum":
      nameCaptureName = "name.definition.enum";
      break;
    case "definition.trait":
      nameCaptureName = "name.definition.trait";
      break;
    case "definition.impl":
      nameCaptureName = "name.definition.impl";
      break;
    case "definition.impl_trait":
      const traitCap = captures.find(
        (c) => c.name === "name.definition.impl_trait" && c.node.startIndex >= container.node.startIndex && c.node.endIndex <= container.node.endIndex
      );
      const forCap = captures.find(
        (c) => c.name === "name.definition.impl_for" && c.node.startIndex >= container.node.startIndex && c.node.endIndex <= container.node.endIndex
      );
      if (traitCap && forCap) {
        const traitName = sourceCode.substring(traitCap.node.startIndex, traitCap.node.endIndex);
        const forName = sourceCode.substring(forCap.node.startIndex, forCap.node.endIndex);
        return `${traitName} for ${forName}`;
      }
      return void 0;
    default:
      return void 0;
  }
  const nameCap = captures.find(
    (c) => c.name === nameCaptureName && c.node.startIndex >= container.node.startIndex && c.node.endIndex <= container.node.endIndex
  );
  return nameCap ? sourceCode.substring(nameCap.node.startIndex, nameCap.node.endIndex) : void 0;
}
function findParentFunctionNode(methodNameNode, sourceCode) {
  let current = methodNameNode.parent;
  while (current) {
    if (current.type === "function_item") {
      return current;
    }
    current = current.parent;
  }
  return void 0;
}
function removeParentheses3(text) {
  if (text.startsWith("(") && text.endsWith(")")) {
    return text.slice(1, -1);
  }
  return text;
}
function removeUseKeywordAndSemicolon(useStatement) {
  let result = useStatement.trim();
  if (result.startsWith("use ")) {
    result = result.substring(4);
  }
  if (result.endsWith(";")) {
    result = result.slice(0, -1);
  }
  return result;
}
function extractBraceContent(text) {
  const startIndex = text.indexOf("{");
  const endIndex = text.lastIndexOf("}");
  if (startIndex > -1 && endIndex > startIndex) {
    return text.substring(startIndex + 1, endIndex);
  }
  return null;
}
function buildSummaryFromSnippets12(snippets) {
  const summary = {
    functions: [],
    structs: [],
    enums: [],
    traits: [],
    impls: [],
    constants: [],
    variables: [],
    imports: []
  };
  for (const snippet of snippets) {
    switch (snippet.type) {
      case "function_or_method" /* FunctionOrMethod */:
        summary.functions.push({
          name: snippet.name,
          parameters: snippet.parameters?.map((p) => p.name) || [],
          field: snippet.field
        });
        break;
      case "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */:
        const defText = snippet.definitionText || "";
        if (defText.startsWith("struct ")) {
          summary.structs.push({ name: snippet.name });
        } else if (defText.startsWith("enum ")) {
          summary.enums.push({ name: snippet.name });
        } else if (defText.startsWith("trait ")) {
          summary.traits.push({ name: snippet.name });
        } else if (defText.startsWith("impl ")) {
          summary.impls.push({ name: snippet.name });
        }
        break;
      case "variable_or_constant" /* VariableOrConstant */:
        const varDefText = snippet.definitionText || "";
        if (varDefText.startsWith("const ") || varDefText.startsWith("static ")) {
          summary.constants.push({
            name: snippet.name,
            field: snippet.field
          });
        } else {
          summary.variables.push({
            name: snippet.name,
            field: snippet.field
          });
        }
        break;
      case "import_or_include" /* ImportOrInclude */:
        summary.imports.push({ name: snippet.name });
        break;
    }
  }
  return summary;
}
function formatOutlineText12(summary) {
  let outlineText = "";
  if (summary.imports.length > 0) {
    outlineText += "Imports:\n";
    for (const imp of summary.imports) {
      outlineText += `  - ${imp.name}
`;
    }
    outlineText += "\n";
  }
  if (summary.structs.length > 0) {
    outlineText += "Structs:\n";
    for (const struct of summary.structs) {
      outlineText += `  - ${struct.name}
`;
    }
    outlineText += "\n";
  }
  if (summary.enums.length > 0) {
    outlineText += "Enums:\n";
    for (const enumItem of summary.enums) {
      outlineText += `  - ${enumItem.name}
`;
    }
    outlineText += "\n";
  }
  if (summary.traits.length > 0) {
    outlineText += "Traits:\n";
    for (const trait of summary.traits) {
      outlineText += `  - ${trait.name}
`;
    }
    outlineText += "\n";
  }
  if (summary.impls.length > 0) {
    outlineText += "Implementations:\n";
    for (const impl of summary.impls) {
      outlineText += `  - ${impl.name}
`;
    }
    outlineText += "\n";
  }
  if (summary.functions.length > 0) {
    outlineText += "Functions/Methods:\n";
    for (const func2 of summary.functions) {
      const paramStr = func2.parameters.length > 0 ? `(${func2.parameters.join(", ")})` : "()";
      const fieldStr = func2.field ? ` [in ${func2.field}]` : "";
      outlineText += `  - ${func2.name}${paramStr}${fieldStr}
`;
    }
    outlineText += "\n";
  }
  if (summary.constants.length > 0) {
    outlineText += "Constants/Statics:\n";
    for (const constant of summary.constants) {
      const fieldStr = constant.field ? ` [in ${constant.field}]` : "";
      outlineText += `  - ${constant.name}${fieldStr}
`;
    }
    outlineText += "\n";
  }
  if (summary.variables.length > 0) {
    outlineText += "Variables:\n";
    for (const variable of summary.variables) {
      const fieldStr = variable.field ? ` [in ${variable.field}]` : "";
      outlineText += `  - ${variable.name}${fieldStr}
`;
    }
    outlineText += "\n";
  }
  return outlineText.trim();
}

// ../autocompletion/v2/capturesProcess/c.ts
async function extractSnippetsFromCapturesForC(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForC]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  const containerCaptures = captures.filter((c) => c.name === "definition.struct" || c.name === "definition.union" || c.name === "definition.enum").map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    name: c.name,
    nameCap: findNameCaptureForContainer2(c, captures, sourceCode)
  })).filter((c) => c.nameCap);
  if (snippetTypes.includes("import_or_include" /* ImportOrInclude */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.include") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
        if (!seenHashes.has(snippetHash)) {
          seenHashes.add(snippetHash);
          const scope = buildScopeChain(node);
          const includeNameCapture = captures.find(
            (c) => c.name === "name.definition.include" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          const includeName = includeNameCapture ? sourceCode.substring(includeNameCapture.node.startIndex, includeNameCapture.node.endIndex) : "";
          snippets.push({
            type: "import_or_include" /* ImportOrInclude */,
            name: includeName,
            rangeText,
            startLine,
            endLine,
            filePath,
            fileHash,
            scope,
            language: "c" /* C */
          });
        }
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    const functionCaptures = captures.filter((c) => c.name === "definition.function");
    functionCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const functionNameCapture = captures.find(
          (c) => c.name === "name.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const functionName = functionNameCapture ? sourceCode.substring(functionNameCapture.node.startIndex, functionNameCapture.node.endIndex) : "";
        const parametersCapture = captures.find(
          (c) => c.name === "parameters.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const parameters = parametersCapture ? extractParametersFromNode(parametersCapture.node, sourceCode) : [];
        const bodyCapture = captures.find(
          (c) => c.name === "body.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const hasBody = !!bodyCapture;
        snippets.push({
          type: "function_or_method" /* FunctionOrMethod */,
          name: functionName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "c" /* C */,
          parameters,
          definition: {
            name: functionName,
            type: "function",
            parameters
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const structCaptures = captures.filter((c) => c.name === "definition.struct");
    structCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const structNameCapture = captures.find(
          (c) => c.name === "name.definition.struct" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const structName = structNameCapture ? sourceCode.substring(structNameCapture.node.startIndex, structNameCapture.node.endIndex) : "";
        const fields = extractFieldsFromStructNode(node, sourceCode, captures);
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: structName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "c" /* C */,
          definition: {
            name: structName,
            type: "struct"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const unionCaptures = captures.filter((c) => c.name === "definition.union");
    unionCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const unionNameCapture = captures.find(
          (c) => c.name === "name.definition.union" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const unionName = unionNameCapture ? sourceCode.substring(unionNameCapture.node.startIndex, unionNameCapture.node.endIndex) : "";
        const fields = extractFieldsFromStructNode(node, sourceCode, captures);
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: unionName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "c" /* C */,
          definition: {
            name: unionName,
            type: "union"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const enumCaptures = captures.filter((c) => c.name === "definition.enum");
    enumCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const enumNameCapture = captures.find(
          (c) => c.name === "name.definition.enum" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const enumName = enumNameCapture ? sourceCode.substring(enumNameCapture.node.startIndex, enumNameCapture.node.endIndex) : "";
        const enumerators = extractEnumeratorsFromEnumNode(node, sourceCode, captures);
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: enumName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "c" /* C */,
          definition: {
            name: enumName,
            type: "enum"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
    const variableCaptures = captures.filter((c) => c.name === "definition.variable");
    variableCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const variableNameCapture = captures.find(
          (c) => c.name === "name.definition.variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const variableName = variableNameCapture ? sourceCode.substring(variableNameCapture.node.startIndex, variableNameCapture.node.endIndex) : "";
        snippets.push({
          type: "variable_or_constant" /* VariableOrConstant */,
          name: variableName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "c" /* C */,
          definition: {
            name: variableName,
            type: "variable"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
    const staticVariableCaptures = captures.filter((c) => c.name === "definition.static_variable");
    staticVariableCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const staticVariableNameCapture = captures.find(
          (c) => c.name === "name.definition.variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const staticVariableName = staticVariableNameCapture ? sourceCode.substring(
          staticVariableNameCapture.node.startIndex,
          staticVariableNameCapture.node.endIndex
        ) : "";
        snippets.push({
          type: "variable_or_constant" /* VariableOrConstant */,
          name: staticVariableName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "c" /* C */,
          definition: {
            name: staticVariableName,
            type: "static_variable"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const typedefCaptures = captures.filter((c) => c.name === "definition.type");
    typedefCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const typedefNameCapture = captures.find(
          (c) => c.name === "name.definition.type" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const typedefName = typedefNameCapture ? sourceCode.substring(typedefNameCapture.node.startIndex, typedefNameCapture.node.endIndex) : "";
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: typedefName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "c" /* C */,
          definition: {
            name: typedefName,
            type: "typedef"
          }
        });
      }
    });
  }
  logger.info(`Extracted ${snippets.length} C snippets`);
  return snippets;
}
function extractParametersFromNode(node, sourceCode) {
  const parameters = [];
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && child.type === "parameter_declaration") {
      const parameterText = sourceCode.substring(child.startIndex, child.endIndex);
      const parameterName = extractParameterName(child, sourceCode);
      parameters.push({
        name: parameterName,
        type: parameterText
      });
    }
  }
  return parameters;
}
function extractParameterName(node, sourceCode) {
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && child.type === "identifier") {
      return sourceCode.substring(child.startIndex, child.endIndex);
    }
  }
  return "";
}
function extractFieldsFromStructNode(node, sourceCode, captures) {
  const fields = [];
  const fieldCaptures = captures.filter(
    (c) => c.name === "name.definition.field" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
  );
  fieldCaptures.forEach((capture) => {
    const fieldName = sourceCode.substring(capture.node.startIndex, capture.node.endIndex);
    fields.push(fieldName);
  });
  return fields;
}
function extractEnumeratorsFromEnumNode(node, sourceCode, captures) {
  const enumerators = [];
  const enumeratorCaptures = captures.filter(
    (c) => c.name === "name.definition.enumerator" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
  );
  enumeratorCaptures.forEach((capture) => {
    const enumeratorName = sourceCode.substring(capture.node.startIndex, capture.node.endIndex);
    enumerators.push(enumeratorName);
  });
  return enumerators;
}
function getNameCaptureNameForContainer(containerCaptureName) {
  switch (containerCaptureName) {
    case "definition.struct":
      return "name.definition.struct";
    case "definition.union":
      return "name.definition.union";
    case "definition.enum":
      return "name.definition.enum";
    default:
      return containerCaptureName;
  }
}
function findNameCaptureForContainer2(containerCapture, captures, sourceCode) {
  const node = containerCapture.node;
  const nameCaptureName = getNameCaptureNameForContainer(containerCapture.name);
  const nameCapture = captures.find(
    (c) => c.name === nameCaptureName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
  );
  return nameCapture ? sourceCode.substring(nameCapture.node.startIndex, nameCapture.node.endIndex) : null;
}
function buildSummaryFromSnippets13(snippets) {
  const summary = {
    includes: [],
    functions: [],
    structs: [],
    unions: [],
    enums: [],
    variables: []
  };
  snippets.forEach((snippet) => {
    switch (snippet.type) {
      case "import_or_include" /* ImportOrInclude */:
        summary.includes.push(snippet.name);
        break;
      case "function_or_method" /* FunctionOrMethod */:
        summary.functions.push(snippet.name);
        break;
      case "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */:
        if (snippet.rangeText.includes("struct")) {
          summary.structs.push(snippet.name);
        } else if (snippet.rangeText.includes("union")) {
          summary.unions.push(snippet.name);
        } else if (snippet.rangeText.includes("enum")) {
          summary.enums.push(snippet.name);
        }
        break;
      case "variable_or_constant" /* VariableOrConstant */:
        summary.variables.push(snippet.name);
        break;
    }
  });
  return summary;
}
function formatOutlineText13(summary) {
  let outline = "";
  if (summary.includes.length > 0) {
    outline += `Includes: ${summary.includes.join(", ")}
`;
  }
  if (summary.functions.length > 0) {
    outline += `Functions: ${summary.functions.join(", ")}
`;
  }
  if (summary.structs.length > 0) {
    outline += `Structs: ${summary.structs.join(", ")}
`;
  }
  if (summary.unions.length > 0) {
    outline += `Unions: ${summary.unions.join(", ")}
`;
  }
  if (summary.enums.length > 0) {
    outline += `Enums: ${summary.enums.join(", ")}
`;
  }
  if (summary.variables.length > 0) {
    outline += `Variables: ${summary.variables.join(", ")}
`;
  }
  return outline;
}

// ../autocompletion/v2/capturesProcess/cpp.ts
async function extractSnippetsFromCapturesForCPP(captures, sourceCode, filePath, fileHash, snippetTypes, options) {
  const logger = Logger.getDefaultLogger().with("[extractSnippetsFromCapturesForCPP]");
  const snippets = [];
  const seenHashes = /* @__PURE__ */ new Set();
  if (snippetTypes.length === 0) {
    logger.warn(`No snippet types provided, skipping`);
    return snippets;
  }
  const containerCaptures = captures.filter(
    (c) => c.name === "definition.class" || c.name === "definition.struct" || c.name === "definition.union" || c.name === "definition.enum" || c.name === "definition.template"
  ).map((c) => ({
    node: c.node,
    start: c.node.startIndex,
    end: c.node.endIndex,
    name: c.name,
    nameCap: findNameCaptureForContainer3(c, captures, sourceCode)
  })).filter((c) => c.nameCap);
  if (snippetTypes.includes("import_or_include" /* ImportOrInclude */)) {
    captures.forEach((capture) => {
      if (capture.name === "definition.include") {
        const node = capture.node;
        const startLine = node.startPosition.row + 1;
        const endLine = node.endPosition.row + 1;
        const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
        const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
        if (!seenHashes.has(snippetHash)) {
          seenHashes.add(snippetHash);
          const scope = buildScopeChain(node);
          const includeNameCapture = captures.find(
            (c) => c.name === "name.definition.include" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
          );
          const includeName = includeNameCapture ? sourceCode.substring(includeNameCapture.node.startIndex, includeNameCapture.node.endIndex) : "";
          snippets.push({
            type: "import_or_include" /* ImportOrInclude */,
            name: includeName,
            rangeText,
            startLine,
            endLine,
            filePath,
            fileHash,
            scope,
            language: "cpp" /* CPP */
          });
        }
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    const functionCaptures = captures.filter((c) => c.name === "definition.function");
    functionCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const functionNameCapture = captures.find(
          (c) => c.name === "name.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const functionName = functionNameCapture ? sourceCode.substring(functionNameCapture.node.startIndex, functionNameCapture.node.endIndex) : "";
        const parametersCapture = captures.find(
          (c) => c.name === "parameters.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const parameters = parametersCapture ? extractParametersFromNode2(parametersCapture.node, sourceCode) : [];
        const bodyCapture = captures.find(
          (c) => c.name === "body.definition.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const hasBody = !!bodyCapture;
        snippets.push({
          type: "function_or_method" /* FunctionOrMethod */,
          name: functionName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          parameters,
          definition: {
            name: functionName,
            type: "function",
            parameters
          }
        });
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    const methodCaptures = captures.filter((c) => c.name === "definition.method");
    methodCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const methodNameCapture = captures.find(
          (c) => c.name === "name.definition.method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const methodName = methodNameCapture ? sourceCode.substring(methodNameCapture.node.startIndex, methodNameCapture.node.endIndex) : "";
        const parametersCapture = captures.find(
          (c) => c.name === "parameters.definition.method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const parameters = parametersCapture ? extractParametersFromNode2(parametersCapture.node, sourceCode) : [];
        const bodyCapture = captures.find(
          (c) => c.name === "body.definition.method" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const hasBody = !!bodyCapture;
        const parentContainer = findParentContainer(node, containerCaptures);
        const field = parentContainer?.nameCap || void 0;
        snippets.push({
          type: "function_or_method" /* FunctionOrMethod */,
          name: methodName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          parameters,
          field,
          definition: {
            name: methodName,
            type: "method",
            parameters
          }
        });
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    const constructorCaptures = captures.filter((c) => c.name === "definition.constructor");
    constructorCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const constructorNameCapture = captures.find(
          (c) => c.name === "name.definition.constructor" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const constructorName = constructorNameCapture ? sourceCode.substring(constructorNameCapture.node.startIndex, constructorNameCapture.node.endIndex) : "";
        const parametersCapture = captures.find(
          (c) => c.name === "parameters.definition.constructor" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const parameters = parametersCapture ? extractParametersFromNode2(parametersCapture.node, sourceCode) : [];
        const parentContainer = findParentContainer(node, containerCaptures);
        const field = parentContainer?.nameCap || void 0;
        snippets.push({
          type: "function_or_method" /* FunctionOrMethod */,
          name: constructorName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          parameters,
          field,
          definition: {
            name: constructorName,
            type: "constructor",
            parameters
          }
        });
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    const destructorCaptures = captures.filter((c) => c.name === "definition.destructor");
    destructorCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const destructorNameCapture = captures.find(
          (c) => c.name === "name.definition.destructor" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const destructorName = destructorNameCapture ? sourceCode.substring(destructorNameCapture.node.startIndex, destructorNameCapture.node.endIndex) : "";
        const parentContainer = findParentContainer(node, containerCaptures);
        const field = parentContainer?.nameCap || void 0;
        snippets.push({
          type: "function_or_method" /* FunctionOrMethod */,
          name: destructorName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          field,
          definition: {
            name: destructorName,
            type: "destructor",
            parameters: []
          }
        });
      }
    });
  }
  if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
    const operatorCaptures = captures.filter((c) => c.name === "definition.operator");
    operatorCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const operatorNameCapture = captures.find(
          (c) => c.name === "name.definition.operator" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const operatorName = operatorNameCapture ? sourceCode.substring(operatorNameCapture.node.startIndex, operatorNameCapture.node.endIndex) : "";
        const parametersCapture = captures.find(
          (c) => c.name === "parameters.definition.operator" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const parameters = parametersCapture ? extractParametersFromNode2(parametersCapture.node, sourceCode) : [];
        const parentContainer = findParentContainer(node, containerCaptures);
        const field = parentContainer?.nameCap || void 0;
        snippets.push({
          type: "function_or_method" /* FunctionOrMethod */,
          name: operatorName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          parameters,
          field,
          definition: {
            name: operatorName,
            type: "operator",
            parameters
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const classCaptures = captures.filter((c) => c.name === "definition.class");
    const templateCaptures = captures.filter((c) => c.name === "definition.template");
    classCaptures.forEach((capture) => {
      const node = capture.node;
      const isWithinTemplate = templateCaptures.some((templateCapture) => {
        return templateCapture.node.startIndex <= node.startIndex && node.endIndex <= templateCapture.node.endIndex;
      });
      if (isWithinTemplate) {
        return;
      }
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const classNameCapture = captures.find(
          (c) => c.name === "name.definition.class" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const className = classNameCapture ? sourceCode.substring(classNameCapture.node.startIndex, classNameCapture.node.endIndex) : "";
        const fields = extractFieldsFromContainerNode(node, sourceCode, captures);
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: className,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: className,
            type: "class"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const structCaptures = captures.filter((c) => c.name === "definition.struct");
    structCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const structNameCapture = captures.find(
          (c) => c.name === "name.definition.struct" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const structName = structNameCapture ? sourceCode.substring(structNameCapture.node.startIndex, structNameCapture.node.endIndex) : "";
        const fields = extractFieldsFromContainerNode(node, sourceCode, captures);
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: structName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: structName,
            type: "struct"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const unionCaptures = captures.filter((c) => c.name === "definition.union");
    unionCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const unionNameCapture = captures.find(
          (c) => c.name === "name.definition.union" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const unionName = unionNameCapture ? sourceCode.substring(unionNameCapture.node.startIndex, unionNameCapture.node.endIndex) : "";
        const fields = extractFieldsFromContainerNode(node, sourceCode, captures);
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: unionName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: unionName,
            type: "union"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const enumCaptures = captures.filter((c) => c.name === "definition.enum");
    enumCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const enumNameCapture = captures.find(
          (c) => c.name === "name.definition.enum" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const enumName = enumNameCapture ? sourceCode.substring(enumNameCapture.node.startIndex, enumNameCapture.node.endIndex) : "";
        const enumerators = extractEnumeratorsFromEnumNode2(node, sourceCode, captures);
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: enumName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: enumName,
            type: "enum"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const templateCaptures = captures.filter((c) => c.name === "definition.template");
    templateCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const templateClassNameCapture = captures.find(
          (c) => c.name === "name.definition.template.class" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const templateStructNameCapture = captures.find(
          (c) => c.name === "name.definition.template.struct" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const templateFunctionNameCapture = captures.find(
          (c) => c.name === "name.definition.template.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        let templateName = "";
        let templateType = "template";
        if (templateClassNameCapture) {
          templateName = sourceCode.substring(
            templateClassNameCapture.node.startIndex,
            templateClassNameCapture.node.endIndex
          );
          templateType = "template_class";
        } else if (templateStructNameCapture) {
          templateName = sourceCode.substring(
            templateStructNameCapture.node.startIndex,
            templateStructNameCapture.node.endIndex
          );
          templateType = "template_struct";
        } else if (templateFunctionNameCapture) {
          templateName = sourceCode.substring(
            templateFunctionNameCapture.node.startIndex,
            templateFunctionNameCapture.node.endIndex
          );
          templateType = "template_function";
        }
        const parametersCapture = captures.find(
          (c) => c.name === "parameters.definition.template" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const templateParameters = parametersCapture ? extractTemplateParametersFromNode(parametersCapture.node, sourceCode) : [];
        if (templateType === "template_function") {
          if (snippetTypes.includes("function_or_method" /* FunctionOrMethod */)) {
            const functionParametersCapture = captures.find(
              (c) => c.name === "parameters.definition.template.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
            );
            const functionParameters = functionParametersCapture ? extractParametersFromNode2(functionParametersCapture.node, sourceCode) : [];
            snippets.push({
              type: "function_or_method" /* FunctionOrMethod */,
              name: templateName,
              rangeText,
              startLine,
              endLine,
              filePath,
              fileHash,
              scope,
              language: "cpp" /* CPP */,
              parameters: functionParameters,
              definition: {
                name: templateName,
                type: templateType,
                parameters: functionParameters
              }
            });
          }
        } else {
          snippets.push({
            type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
            name: templateName,
            rangeText,
            startLine,
            endLine,
            filePath,
            fileHash,
            scope,
            language: "cpp" /* CPP */,
            definition: {
              name: templateName,
              type: templateType
            }
          });
        }
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const namespaceCaptures = captures.filter((c) => c.name === "definition.namespace");
    namespaceCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const namespaceNameCapture = captures.find(
          (c) => c.name === "name.definition.namespace" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const namespaceName = namespaceNameCapture ? sourceCode.substring(namespaceNameCapture.node.startIndex, namespaceNameCapture.node.endIndex) : "<anonymous>";
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: namespaceName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: namespaceName,
            type: "namespace"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const typedefCaptures = captures.filter((c) => c.name === "definition.typedef");
    typedefCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const typedefNameCapture = captures.find(
          (c) => c.name === "name.definition.typedef" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const typedefName = typedefNameCapture ? sourceCode.substring(typedefNameCapture.node.startIndex, typedefNameCapture.node.endIndex) : "";
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: typedefName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: typedefName,
            type: "typedef"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */)) {
    const usingCaptures = captures.filter((c) => c.name === "definition.using");
    usingCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const usingNameCapture = captures.find(
          (c) => c.name === "name.definition.using" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const usingName = usingNameCapture ? sourceCode.substring(usingNameCapture.node.startIndex, usingNameCapture.node.endIndex) : "";
        snippets.push({
          type: "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          name: usingName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: usingName,
            type: "using"
          }
        });
      }
    });
  }
  if (snippetTypes.includes("variable_or_constant" /* VariableOrConstant */)) {
    const variableCaptures = captures.filter((c) => c.name === "definition.variable");
    variableCaptures.forEach((capture) => {
      const node = capture.node;
      const startLine = node.startPosition.row + 1;
      const endLine = node.endPosition.row + 1;
      const rangeText = sourceCode.substring(node.startIndex, node.endIndex);
      const snippetHash = generateSnippetHash(filePath, startLine, endLine, rangeText);
      if (!seenHashes.has(snippetHash)) {
        seenHashes.add(snippetHash);
        const scope = buildScopeChain(node);
        const variableNameCapture = captures.find(
          (c) => c.name === "name.definition.variable" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
        );
        const variableName = variableNameCapture ? sourceCode.substring(variableNameCapture.node.startIndex, variableNameCapture.node.endIndex) : "";
        snippets.push({
          type: "variable_or_constant" /* VariableOrConstant */,
          name: variableName,
          rangeText,
          startLine,
          endLine,
          filePath,
          fileHash,
          scope,
          language: "cpp" /* CPP */,
          definition: {
            name: variableName,
            type: "variable"
          }
        });
      }
    });
  }
  logger.info(`Extracted ${snippets.length} C++ snippets`);
  return snippets;
}
function extractParametersFromNode2(node, sourceCode) {
  const parameters = [];
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && child.type === "parameter_declaration") {
      const parameterText = sourceCode.substring(child.startIndex, child.endIndex);
      const parameterName = extractParameterName2(child, sourceCode);
      parameters.push({
        name: parameterName,
        type: parameterText
      });
    }
  }
  return parameters;
}
function extractParameterName2(node, sourceCode) {
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && child.type === "identifier") {
      return sourceCode.substring(child.startIndex, child.endIndex);
    }
  }
  return "";
}
function extractTemplateParametersFromNode(node, sourceCode) {
  const parameters = [];
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && (child.type === "type_parameter_declaration" || child.type === "parameter_declaration")) {
      const parameterText = sourceCode.substring(child.startIndex, child.endIndex);
      const parameterName = extractTemplateParameterName(child, sourceCode);
      parameters.push({
        name: parameterName,
        type: parameterText
      });
    }
  }
  return parameters;
}
function extractTemplateParameterName(node, sourceCode) {
  for (let i2 = 0; i2 < node.childCount; i2++) {
    const child = node.child(i2);
    if (child && (child.type === "type_identifier" || child.type === "identifier")) {
      return sourceCode.substring(child.startIndex, child.endIndex);
    }
  }
  return "";
}
function extractFieldsFromContainerNode(node, sourceCode, captures) {
  const fields = [];
  const fieldCaptures = captures.filter(
    (c) => c.name === "name.definition.field" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
  );
  fieldCaptures.forEach((capture) => {
    const fieldName = sourceCode.substring(capture.node.startIndex, capture.node.endIndex);
    fields.push(fieldName);
  });
  return fields;
}
function extractEnumeratorsFromEnumNode2(node, sourceCode, captures) {
  const enumerators = [];
  const enumeratorCaptures = captures.filter(
    (c) => c.name === "name.definition.enumerator" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
  );
  enumeratorCaptures.forEach((capture) => {
    const enumeratorName = sourceCode.substring(capture.node.startIndex, capture.node.endIndex);
    enumerators.push(enumeratorName);
  });
  return enumerators;
}
function findParentContainer(node, containerCaptures) {
  for (const container of containerCaptures) {
    if (container.start <= node.startIndex && node.endIndex <= container.end) {
      return container;
    }
  }
  return null;
}
function getNameCaptureNameForContainer2(containerCaptureName) {
  switch (containerCaptureName) {
    case "definition.class":
      return "name.definition.class";
    case "definition.struct":
      return "name.definition.struct";
    case "definition.union":
      return "name.definition.union";
    case "definition.enum":
      return "name.definition.enum";
    case "definition.template":
      return "name.definition.template.class";
    // 默认查找类模板
    default:
      return containerCaptureName;
  }
}
function findNameCaptureForContainer3(containerCapture, captures, sourceCode) {
  const node = containerCapture.node;
  const nameCaptureName = getNameCaptureNameForContainer2(containerCapture.name);
  if (containerCapture.name === "definition.template") {
    const templateClassNameCapture = captures.find(
      (c) => c.name === "name.definition.template.class" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (templateClassNameCapture) {
      return sourceCode.substring(
        templateClassNameCapture.node.startIndex,
        templateClassNameCapture.node.endIndex
      );
    }
    const templateStructNameCapture = captures.find(
      (c) => c.name === "name.definition.template.struct" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (templateStructNameCapture) {
      return sourceCode.substring(
        templateStructNameCapture.node.startIndex,
        templateStructNameCapture.node.endIndex
      );
    }
    const templateFunctionNameCapture = captures.find(
      (c) => c.name === "name.definition.template.function" && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
    );
    if (templateFunctionNameCapture) {
      return sourceCode.substring(
        templateFunctionNameCapture.node.startIndex,
        templateFunctionNameCapture.node.endIndex
      );
    }
  }
  const nameCapture = captures.find(
    (c) => c.name === nameCaptureName && c.node.startIndex >= node.startIndex && c.node.endIndex <= node.endIndex
  );
  return nameCapture ? sourceCode.substring(nameCapture.node.startIndex, nameCapture.node.endIndex) : null;
}
function buildSummaryFromSnippets14(snippets) {
  const summary = {
    includes: [],
    namespaces: [],
    classes: [],
    structs: [],
    unions: [],
    enums: [],
    templates: [],
    functions: [],
    methods: [],
    constructors: [],
    destructors: [],
    operators: [],
    variables: [],
    typedefs: [],
    usings: []
  };
  snippets.forEach((snippet) => {
    switch (snippet.type) {
      case "import_or_include" /* ImportOrInclude */:
        summary.includes.push(snippet.name);
        break;
      case "function_or_method" /* FunctionOrMethod */:
        if (snippet.definition?.type === "function") {
          summary.functions.push(snippet.name);
        } else if (snippet.definition?.type === "method") {
          summary.methods.push(snippet.name);
        } else if (snippet.definition?.type === "constructor") {
          summary.constructors.push(snippet.name);
        } else if (snippet.definition?.type === "destructor") {
          summary.destructors.push(snippet.name);
        } else if (snippet.definition?.type === "operator") {
          summary.operators.push(snippet.name);
        } else if (snippet.definition?.type === "template_function") {
          summary.functions.push(snippet.name);
        }
        break;
      case "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */:
        if (snippet.definition?.type === "class") {
          summary.classes.push(snippet.name);
        } else if (snippet.definition?.type === "struct") {
          summary.structs.push(snippet.name);
        } else if (snippet.definition?.type === "union") {
          summary.unions.push(snippet.name);
        } else if (snippet.definition?.type === "enum") {
          summary.enums.push(snippet.name);
        } else if (snippet.definition?.type === "template_class" || snippet.definition?.type === "template_struct") {
          summary.templates.push(snippet.name);
        } else if (snippet.definition?.type === "namespace") {
          summary.namespaces.push(snippet.name);
        } else if (snippet.definition?.type === "typedef") {
          summary.typedefs.push(snippet.name);
        } else if (snippet.definition?.type === "using") {
          summary.usings.push(snippet.name);
        }
        break;
      case "variable_or_constant" /* VariableOrConstant */:
        summary.variables.push(snippet.name);
        break;
    }
  });
  return summary;
}
function formatOutlineText14(summary) {
  let outline = "";
  if (summary.includes.length > 0) {
    outline += `Includes: ${summary.includes.join(", ")}
`;
  }
  if (summary.namespaces.length > 0) {
    outline += `Namespaces: ${summary.namespaces.join(", ")}
`;
  }
  if (summary.classes.length > 0) {
    outline += `Classes: ${summary.classes.join(", ")}
`;
  }
  if (summary.structs.length > 0) {
    outline += `Structs: ${summary.structs.join(", ")}
`;
  }
  if (summary.unions.length > 0) {
    outline += `Unions: ${summary.unions.join(", ")}
`;
  }
  if (summary.enums.length > 0) {
    outline += `Enums: ${summary.enums.join(", ")}
`;
  }
  if (summary.templates.length > 0) {
    outline += `Templates: ${summary.templates.join(", ")}
`;
  }
  if (summary.functions.length > 0) {
    outline += `Functions: ${summary.functions.join(", ")}
`;
  }
  if (summary.methods.length > 0) {
    outline += `Methods: ${summary.methods.join(", ")}
`;
  }
  if (summary.constructors.length > 0) {
    outline += `Constructors: ${summary.constructors.join(", ")}
`;
  }
  if (summary.destructors.length > 0) {
    outline += `Destructors: ${summary.destructors.join(", ")}
`;
  }
  if (summary.operators.length > 0) {
    outline += `Operators: ${summary.operators.join(", ")}
`;
  }
  if (summary.variables.length > 0) {
    outline += `Variables: ${summary.variables.join(", ")}
`;
  }
  if (summary.typedefs.length > 0) {
    outline += `Typedefs: ${summary.typedefs.join(", ")}
`;
  }
  if (summary.usings.length > 0) {
    outline += `Usings: ${summary.usings.join(", ")}
`;
  }
  return outline;
}

// ../autocompletion/v2/capturesProcess/index.ts
var extractSnippetsFromCaptures = {
  ["go" /* Go */]: extractSnippetsFromCapturesForGo,
  ["python" /* Python */]: extractSnippetsFromCapturesForPython,
  ["java" /* Java */]: extractSnippetsFromCapturesForJava,
  ["javascript" /* JavaScript */]: extractSnippetsFromCapturesForJavaScript,
  ["jsx" /* JSX */]: extractSnippetsFromCapturesForJSX,
  ["typescript" /* TypeScript */]: extractSnippetsFromCapturesForTypeScript,
  ["tsx" /* TSX */]: extractSnippetsFromCapturesForTSX,
  ["swift" /* Swift */]: extractSnippetsFromCapturesForSwift,
  ["css" /* CSS */]: extractSnippetsFromCapturesForCSS,
  ["html" /* HTML */]: extractSnippetsFromCapturesForHTML,
  ["kotlin" /* Kotlin */]: extractSnippetsFromCapturesForKotlin,
  ["php" /* PHP */]: extractSnippetsFromCapturesForPHP,
  ["rust" /* Rust */]: extractSnippetsFromCapturesForRust,
  ["c" /* C */]: extractSnippetsFromCapturesForC,
  ["cpp" /* CPP */]: extractSnippetsFromCapturesForCPP,
  ["unknown" /* Unknown */]: extractSnippetsFromCapturesForGeneral
};
var generateOverViewFromSnippets = {
  ["go" /* Go */]: (snippets) => {
    return formatOutlineText(buildSummaryFromSnippets(snippets));
  },
  ["python" /* Python */]: (snippets) => {
    return formatOutlineText2(buildSummaryFromSnippets2(snippets));
  },
  ["java" /* Java */]: (snippets) => {
    return formatOutlineText3(buildSummaryFromSnippets3(snippets));
  },
  ["javascript" /* JavaScript */]: (snippets) => {
    return "";
  },
  ["jsx" /* JSX */]: (snippets) => {
    return formatOutlineText4(buildSummaryFromSnippets4(snippets));
  },
  ["typescript" /* TypeScript */]: (snippets) => {
    return formatOutlineText5(buildSummaryFromSnippets5(snippets));
  },
  ["tsx" /* TSX */]: (snippets) => {
    return formatOutlineText6(buildSummaryFromSnippets6(snippets));
  },
  ["swift" /* Swift */]: (snippets) => {
    return formatOutlineText7(buildSummaryFromSnippets7(snippets));
  },
  ["css" /* CSS */]: (snippets) => {
    return formatOutlineText8(buildSummaryFromSnippets8(snippets));
  },
  ["html" /* HTML */]: (snippets) => {
    return formatOutlineText9(buildSummaryFromSnippets9(snippets));
  },
  ["kotlin" /* Kotlin */]: (snippets) => {
    return formatOutlineText10(buildSummaryFromSnippets10(snippets));
  },
  ["php" /* PHP */]: (snippets) => {
    return formatOutlineText11(buildSummaryFromSnippets11(snippets));
  },
  ["rust" /* Rust */]: (snippets) => {
    return formatOutlineText12(buildSummaryFromSnippets12(snippets));
  },
  ["c" /* C */]: (snippets) => {
    return formatOutlineText13(buildSummaryFromSnippets13(snippets));
  },
  ["cpp" /* CPP */]: (snippets) => {
    return formatOutlineText14(buildSummaryFromSnippets14(snippets));
  },
  ["unknown" /* Unknown */]: (snippets) => {
    return "";
  }
};

// ../autocompletion/v2/dependenciesProcess/queries/go.ts
var go_default2 = `(call_expression
  function: (identifier) @function.call.direct)

(call_expression
  function: (selector_expression
    operand: (identifier) @method.call.receiver
    field: (field_identifier) @method.call.name))`;

// ../autocompletion/v2/dependenciesProcess/queries/typescript.ts
var typescript_default2 = `
; \u76F4\u63A5\u51FD\u6570\u8C03\u7528 - function()
(call_expression
  function: (identifier) @function.call.direct)

; \u65B9\u6CD5\u8C03\u7528 - object.method()
(call_expression
  function: (member_expression
    object: (identifier) @method.call.receiver
    property: (property_identifier) @method.call.name)
  (#not-match? @method.call.receiver "^[A-Z]"))

; \u94FE\u5F0F\u65B9\u6CD5\u8C03\u7528 - object.method1().method2()
(call_expression
  function: (member_expression
    object: (call_expression)
    property: (property_identifier) @method.call.chain))

; \u9759\u6001\u65B9\u6CD5\u8C03\u7528 - Class.staticMethod() (\u9996\u5B57\u6BCD\u5927\u5199\u7684\u6807\u8BC6\u7B26)
(call_expression
  function: (member_expression
    object: (identifier) @static.call.class
    property: (property_identifier) @static.call.method)
  (#match? @static.call.class "^[A-Z]"))

; \u547D\u540D\u7A7A\u95F4/\u6A21\u5757\u8C03\u7528 - namespace.function()
(call_expression
  function: (member_expression
    object: (identifier) @namespace.call.name
    property: (property_identifier) @namespace.call.function)
  (#match? @namespace.call.name "^[A-Z]")
  (#not-match? @namespace.call.function "^(constructor|new|create|get|set|add|remove|update|delete)$"))

; \u5D4C\u5957\u5C5E\u6027\u8C03\u7528 - object.nested.method()
(call_expression
  function: (member_expression
    object: (member_expression
      object: (identifier) @nested.call.root
      property: (property_identifier) @nested.call.intermediate)
    property: (property_identifier) @nested.call.method))

; this \u65B9\u6CD5\u8C03\u7528 - this.method()
(call_expression
  function: (member_expression
    object: (this) @this.call.receiver
    property: (property_identifier) @this.call.method))

; super \u65B9\u6CD5\u8C03\u7528 - super.method()
(call_expression
  function: (member_expression
    object: (super) @super.call.receiver
    property: (property_identifier) @super.call.method))

; \u7BAD\u5934\u51FD\u6570\u8C03\u7528 - (() => {})()
(call_expression
  function: (arrow_function) @arrow.call.function)

; \u51FD\u6570\u8868\u8FBE\u5F0F\u8C03\u7528 - (function() {})()
(call_expression
  function: (function_expression) @function.call.expression)

; \u6570\u7EC4\u65B9\u6CD5\u8C03\u7528 - array.map(), array.filter()
(call_expression
  function: (member_expression
    object: (identifier) @array.call.object
    property: (property_identifier) @array.call.method)
  (#match? @array.call.method "^(map|filter|reduce|forEach|find|some|every|sort|push|pop|shift|unshift|slice|splice|concat|join|indexOf|includes)$"))

; Promise \u65B9\u6CD5\u8C03\u7528 - promise.then(), promise.catch() (\u660E\u786E\u7684Promise\u65B9\u6CD5)
(call_expression
  function: (member_expression
    object: (identifier) @promise.call.object
    property: (property_identifier) @promise.call.method)
  (#match? @promise.call.method "^(then|catch|finally)$"))

; \u53EF\u9009\u94FE\u8C03\u7528 - object?.method?.()
(call_expression
  function: (member_expression
    object: (identifier) @optional.call.receiver
    property: (property_identifier) @optional.call.method))

; \u6784\u9020\u51FD\u6570\u8C03\u7528 - new Constructor()
(new_expression
  constructor: (identifier) @constructor.call.name)

; \u6CDB\u578B\u51FD\u6570\u8C03\u7528 - genericFunction<T>()
(call_expression
  function: (identifier) @generic.call.function
  type_arguments: (type_arguments))

; \u6A21\u677F\u5B57\u7B26\u4E32\u4E2D\u7684\u8868\u8FBE\u5F0F\u8C03\u7528
(template_substitution
  (call_expression
    function: (identifier) @template.call.function))

; await \u8868\u8FBE\u5F0F\u4E2D\u7684\u51FD\u6570\u8C03\u7528
(await_expression
  (call_expression
    function: (identifier) @await.call.function))

; \u5F02\u6B65\u65B9\u6CD5\u8C03\u7528
(await_expression
  (call_expression
    function: (member_expression
      object: (identifier) @async.call.receiver
      property: (property_identifier) @async.call.method)))
`;

// ../autocompletion/v2/dependenciesProcess/queries/javascript.ts
var javascript_default2 = `
; \u76F4\u63A5\u51FD\u6570\u8C03\u7528 - function()
(call_expression
  function: (identifier) @function.call.direct)

; \u65B9\u6CD5\u8C03\u7528 - object.method()
(call_expression
  function: (member_expression
    object: (identifier) @method.call.receiver
    property: (property_identifier) @method.call.name)
  (#not-match? @method.call.receiver "^[A-Z]"))

; \u94FE\u5F0F\u65B9\u6CD5\u8C03\u7528 - object.method1().method2()
(call_expression
  function: (member_expression
    object: (call_expression)
    property: (property_identifier) @method.call.chain))

; \u9759\u6001\u65B9\u6CD5\u8C03\u7528 - Class.staticMethod() (\u9996\u5B57\u6BCD\u5927\u5199\u7684\u6807\u8BC6\u7B26)
(call_expression
  function: (member_expression
    object: (identifier) @static.call.class
    property: (property_identifier) @static.call.method)
  (#match? @static.call.class "^[A-Z]"))

; \u547D\u540D\u7A7A\u95F4/\u6A21\u5757\u8C03\u7528 - namespace.function()
(call_expression
  function: (member_expression
    object: (identifier) @namespace.call.name
    property: (property_identifier) @namespace.call.function)
  (#match? @namespace.call.name "^[A-Z]")
  (#not-match? @namespace.call.function "^(constructor|new|create|get|set|add|remove|update|delete)$"))

; \u5D4C\u5957\u5C5E\u6027\u8C03\u7528 - object.nested.method()
(call_expression
  function: (member_expression
    object: (member_expression
      object: (identifier) @nested.call.root
      property: (property_identifier) @nested.call.intermediate)
    property: (property_identifier) @nested.call.method))

; this \u65B9\u6CD5\u8C03\u7528 - this.method()
(call_expression
  function: (member_expression
    object: (this) @this.call.receiver
    property: (property_identifier) @this.call.method))

; super \u65B9\u6CD5\u8C03\u7528 - super.method()
(call_expression
  function: (member_expression
    object: (super) @super.call.receiver
    property: (property_identifier) @super.call.method))

; \u7BAD\u5934\u51FD\u6570\u8C03\u7528 - (() => {})()
(call_expression
  function: (arrow_function) @arrow.call.function)

; \u51FD\u6570\u8868\u8FBE\u5F0F\u8C03\u7528 - (function() {})()
(call_expression
  function: (function_expression) @function.call.expression)

; \u6570\u7EC4\u65B9\u6CD5\u8C03\u7528 - array.map(), array.filter()
(call_expression
  function: (member_expression
    object: (identifier) @array.call.object
    property: (property_identifier) @array.call.method)
  (#match? @array.call.method "^(map|filter|reduce|forEach|find|some|every|sort|push|pop|shift|unshift|slice|splice|concat|join|indexOf|includes)$"))

; Promise \u65B9\u6CD5\u8C03\u7528 - promise.then(), promise.catch() (\u660E\u786E\u7684Promise\u65B9\u6CD5)
(call_expression
  function: (member_expression
    object: (identifier) @promise.call.object
    property: (property_identifier) @promise.call.method)
  (#match? @promise.call.method "^(then|catch|finally)$"))

; \u53EF\u9009\u94FE\u8C03\u7528 - object?.method?.()
(call_expression
  function: (member_expression
    object: (identifier) @optional.call.receiver
    property: (property_identifier) @optional.call.method))

; \u6784\u9020\u51FD\u6570\u8C03\u7528 - new Constructor()
(new_expression
  constructor: (identifier) @constructor.call.name)

; \u6A21\u677F\u5B57\u7B26\u4E32\u4E2D\u7684\u8868\u8FBE\u5F0F\u8C03\u7528
(template_substitution
  (call_expression
    function: (identifier) @template.call.function))

; await \u8868\u8FBE\u5F0F\u4E2D\u7684\u51FD\u6570\u8C03\u7528
(await_expression
  (call_expression
    function: (identifier) @await.call.function))

; \u5F02\u6B65\u65B9\u6CD5\u8C03\u7528
(await_expression
  (call_expression
    function: (member_expression
      object: (identifier) @async.call.receiver
      property: (property_identifier) @async.call.method)))
`;

// ../autocompletion/v2/dependenciesProcess/queries/java.ts
var java_default2 = `
; \u76F4\u63A5\u65B9\u6CD5\u8C03\u7528 - method()
(method_invocation
  name: (identifier) @method.call.direct)

; \u5BF9\u8C61\u65B9\u6CD5\u8C03\u7528 - object.method()
(method_invocation
  object: (identifier) @method.call.receiver
  name: (identifier) @method.call.name)

; \u94FE\u5F0F\u65B9\u6CD5\u8C03\u7528 - object.method1().method2()
(method_invocation
  object: (method_invocation)
  name: (identifier) @method.call.chain)

; \u9759\u6001\u65B9\u6CD5\u8C03\u7528 - Class.staticMethod()
(method_invocation
  object: (identifier) @static.call.class
  name: (identifier) @static.call.method
  (#match? @static.call.class "^[A-Z]"))

; this \u65B9\u6CD5\u8C03\u7528 - this.method()
(method_invocation
  object: (this) @this.call.receiver
  name: (identifier) @this.call.method)

; super \u65B9\u6CD5\u8C03\u7528 - super.method()
(method_invocation
  object: (super) @super.call.receiver
  name: (identifier) @super.call.method)

; \u6784\u9020\u51FD\u6570\u8C03\u7528 - new Constructor()
(object_creation_expression
  type: (type_identifier) @constructor.call.name)
`;

// ../autocompletion/v2/dependenciesProcess/queries/python.ts
var python_default2 = `
; \u76F4\u63A5\u51FD\u6570\u8C03\u7528 - function()
(call
  function: (identifier) @function.call.direct)

; \u65B9\u6CD5\u8C03\u7528 - object.method()
(call
  function: (attribute
    object: (identifier) @method.call.receiver
    attribute: (identifier) @method.call.name))

; \u7C7B\u65B9\u6CD5\u8C03\u7528 - ClassName.method() (\u9996\u5B57\u6BCD\u5927\u5199)
(call
  function: (attribute
    object: (identifier) @class.call.name
    attribute: (identifier) @class.call.method)
  (#match? @class.call.name "^[A-Z]"))

; \u94FE\u5F0F\u65B9\u6CD5\u8C03\u7528 - obj.method1().method2()
(call
  function: (attribute
    object: (call)
    attribute: (identifier) @method.call.chain))

; self\u65B9\u6CD5\u8C03\u7528 - self.method()
(call
  function: (attribute
    object: (identifier) @self.call.receiver
    attribute: (identifier) @self.call.method)
  (#eq? @self.call.receiver "self"))

; super\u65B9\u6CD5\u8C03\u7528 - super().method()
(call
  function: (attribute
    object: (call
      function: (identifier) @super.call.function)
    attribute: (identifier) @super.call.method)
  (#eq? @super.call.function "super"))

; \u5F02\u6B65\u51FD\u6570\u8C03\u7528 - await function()
(await
  (call
    function: (identifier) @async.call.function))

; \u5F02\u6B65\u65B9\u6CD5\u8C03\u7528 - await obj.method()
(await
  (call
    function: (attribute
      object: (identifier) @async.call.receiver
      attribute: (identifier) @async.call.method)))

; \u88C5\u9970\u5668\u51FD\u6570\u8C03\u7528 - @decorator
(decorator
  (identifier) @decorator.call.function)

; \u88C5\u9970\u5668\u65B9\u6CD5\u8C03\u7528 - @obj.decorator
(decorator
  (attribute
    object: (identifier) @decorator.call.receiver
    attribute: (identifier) @decorator.call.method))

; \u5217\u8868\u63A8\u5BFC\u5F0F\u4E2D\u7684\u51FD\u6570\u8C03\u7528
(list_comprehension
  (call
    function: (identifier) @comprehension.call.function))

; \u5217\u8868\u63A8\u5BFC\u5F0F\u4E2D\u7684\u65B9\u6CD5\u8C03\u7528
(list_comprehension
  (call
    function: (attribute
      object: (identifier) @comprehension.call.receiver
      attribute: (identifier) @comprehension.call.method)))

; \u751F\u6210\u5668\u8868\u8FBE\u5F0F\u4E2D\u7684\u51FD\u6570\u8C03\u7528
(generator_expression
  (call
    function: (identifier) @generator.call.function))

; \u751F\u6210\u5668\u8868\u8FBE\u5F0F\u4E2D\u7684\u65B9\u6CD5\u8C03\u7528
(generator_expression
  (call
    function: (attribute
      object: (identifier) @generator.call.receiver
      attribute: (identifier) @generator.call.method)))

; Lambda \u8868\u8FBE\u5F0F\u4E2D\u7684\u51FD\u6570\u8C03\u7528
(lambda
  (call
    function: (identifier) @lambda.call.function))

; Lambda \u8868\u8FBE\u5F0F\u4E2D\u7684\u65B9\u6CD5\u8C03\u7528
(lambda
  (call
    function: (attribute
      object: (identifier) @lambda.call.receiver
      attribute: (identifier) @lambda.call.method)))

; \u5D4C\u5957\u5C5E\u6027\u8C03\u7528 - obj.attr.method()
(call
  function: (attribute
    object: (attribute
      object: (identifier) @nested.call.root
      attribute: (identifier) @nested.call.intermediate)
    attribute: (identifier) @nested.call.method))

; \u51FD\u6570\u4F5C\u4E3A\u53C2\u6570\u7684\u8C03\u7528 - func(other_func)
(call
  function: (identifier) @function.call.direct
  arguments: (argument_list
    (identifier) @function.call.argument))

; \u65B9\u6CD5\u4F5C\u4E3A\u53C2\u6570\u7684\u8C03\u7528 - func(obj.method)
(call
  function: (identifier) @function.call.direct
  arguments: (argument_list
    (attribute
      object: (identifier) @method.call.receiver
      attribute: (identifier) @method.call.name)))
`;

// ../autocompletion/v2/dependenciesProcess/queries/jsx.ts
var jsx_default2 = `
; === React\u7279\u5B9A\u67E5\u8BE2\uFF08\u4F18\u5148\u7EA7\u6700\u9AD8\uFF09===

; \u9AD8\u9636\u7EC4\u4EF6 HOC \u8C03\u7528 - withRouter(Component), memo(Component) - \u5FC5\u987B\u5728\u76F4\u63A5\u51FD\u6570\u8C03\u7528\u4E4B\u524D
(call_expression
  function: (identifier) @hoc.call.name
  arguments: (arguments
    (identifier) @hoc.call.component)
  (#match? @hoc.call.name "^(with[A-Z]|connect|memo|forwardRef)"))

; React.createElement \u8C03\u7528 - \u5FC5\u987B\u5728\u5176\u4ED6\u65B9\u6CD5\u8C03\u7528\u4E4B\u524D
(call_expression
  function: (member_expression
    object: (identifier) @react.create.namespace
    property: (property_identifier) @react.create.method)
  (#eq? @react.create.namespace "React")
  (#eq? @react.create.method "createElement"))

; State \u76F8\u5173 hooks - useState, useReducer
(call_expression
  function: (identifier) @state.hook.call
  (#match? @state.hook.call "^(useState|useReducer)$"))

; Effect \u76F8\u5173 hooks - useEffect, useLayoutEffect
(call_expression
  function: (identifier) @effect.hook.call
  (#match? @effect.hook.call "^(useEffect|useLayoutEffect|useInsertionEffect)$"))

; Memo \u76F8\u5173 hooks - useMemo, useCallback
(call_expression
  function: (identifier) @memo.hook.call
  (#match? @memo.hook.call "^(useMemo|useCallback)$"))

; Ref \u8C03\u7528 - useRef, createRef
(call_expression
  function: (identifier) @ref.hook.call
  (#match? @ref.hook.call "^(useRef|createRef)$"))

; Context \u8C03\u7528 - useContext(ThemeContext)
(call_expression
  function: (identifier) @context.hook.call
  (#eq? @context.hook.call "useContext"))

; \u5176\u4ED6 React Hooks \u8C03\u7528 - \u4E0D\u5728\u4E0A\u8FF0\u7279\u5B9A\u5206\u7C7B\u4E2D\u7684hooks
(call_expression
  function: (identifier) @react.hook.call
  (#match? @react.hook.call "^use[A-Z]")
  (#not-match? @react.hook.call "^(useState|useReducer|useEffect|useLayoutEffect|useInsertionEffect|useMemo|useCallback|useRef|createRef|useContext)$"))

; Event handlers \u5728\u8C03\u7528\u8868\u8FBE\u5F0F\u4E2D - handleClick()
(call_expression
  function: (identifier) @event.handler.function
  (#match? @event.handler.function "^handle[A-Z]"))

; === \u5F02\u6B65\u8C03\u7528\uFF08\u4F18\u5148\u7EA7\u8F83\u9AD8\uFF09===

; await \u8868\u8FBE\u5F0F\u4E2D\u7684\u51FD\u6570\u8C03\u7528
(await_expression
  (call_expression
    function: (identifier) @await.call.function))

; \u5F02\u6B65\u65B9\u6CD5\u8C03\u7528
(await_expression
  (call_expression
    function: (member_expression
      object: (identifier) @async.call.receiver
      property: (property_identifier) @async.call.method)))

; === \u7279\u5B9A\u65B9\u6CD5\u8C03\u7528\uFF08\u4F18\u5148\u7EA7\u9AD8\u4E8E\u901A\u7528\u65B9\u6CD5\u8C03\u7528\uFF09===

; Promise \u65B9\u6CD5\u8C03\u7528 - promise.then(), promise.catch()
(call_expression
  function: (member_expression
    object: (identifier) @promise.call.object
    property: (property_identifier) @promise.call.method)
  (#match? @promise.call.method "^(then|catch|finally)$"))

; \u6570\u7EC4\u65B9\u6CD5\u8C03\u7528 - array.map(), array.filter()
(call_expression
  function: (member_expression
    object: (identifier) @array.call.object
    property: (property_identifier) @array.call.method)
  (#match? @array.call.method "^(map|filter|reduce|forEach|find|some|every|sort|push|pop|shift|unshift|slice|splice|concat|join|indexOf|includes)$"))

; === \u6784\u9020\u51FD\u6570\u548C\u7C7B\u8C03\u7528 ===

; \u6784\u9020\u51FD\u6570\u8C03\u7528 - new Constructor()
(new_expression
  constructor: (identifier) @constructor.call.name)

; \u9759\u6001\u65B9\u6CD5\u8C03\u7528 - Class.staticMethod() (\u9996\u5B57\u6BCD\u5927\u5199\u7684\u6807\u8BC6\u7B26)
(call_expression
  function: (member_expression
    object: (identifier) @static.call.class
    property: (property_identifier) @static.call.method)
  (#match? @static.call.class "^[A-Z]"))

; === \u5BF9\u8C61\u65B9\u6CD5\u8C03\u7528 ===

; this \u65B9\u6CD5\u8C03\u7528 - this.method()
(call_expression
  function: (member_expression
    object: (this) @this.call.receiver
    property: (property_identifier) @this.call.method))

; super \u65B9\u6CD5\u8C03\u7528 - super.method()
(call_expression
  function: (member_expression
    object: (super) @super.call.receiver
    property: (property_identifier) @super.call.method))

; \u53EF\u9009\u94FE\u8C03\u7528 - object?.method?.()
(call_expression
  function: (member_expression
    object: (identifier) @optional.call.receiver
    property: (property_identifier) @optional.call.method))

; \u94FE\u5F0F\u65B9\u6CD5\u8C03\u7528 - object.method1().method2()
(call_expression
  function: (member_expression
    object: (call_expression)
    property: (property_identifier) @method.call.chain))

; \u5D4C\u5957\u5C5E\u6027\u8C03\u7528 - object.nested.method()
(call_expression
  function: (member_expression
    object: (member_expression
      object: (identifier) @nested.call.root
      property: (property_identifier) @nested.call.intermediate)
    property: (property_identifier) @nested.call.method))

; \u65B9\u6CD5\u8C03\u7528 - object.method()
(call_expression
  function: (member_expression
    object: (identifier) @method.call.receiver
    property: (property_identifier) @method.call.name)
  (#not-match? @method.call.receiver "^[A-Z]"))

; === \u547D\u540D\u7A7A\u95F4\u8C03\u7528 ===

; \u547D\u540D\u7A7A\u95F4/\u6A21\u5757\u8C03\u7528 - namespace.function()
(call_expression
  function: (member_expression
    object: (identifier) @namespace.call.name
    property: (property_identifier) @namespace.call.function)
  (#match? @namespace.call.name "^[A-Z]")
  (#not-match? @namespace.call.function "^(constructor|new|create|get|set|add|remove|update|delete)$"))

; === \u7279\u6B8A\u51FD\u6570\u8C03\u7528 ===

; \u7BAD\u5934\u51FD\u6570\u8C03\u7528 - (() => {})()
(call_expression
  function: (arrow_function) @arrow.call.function)

; \u51FD\u6570\u8868\u8FBE\u5F0F\u8C03\u7528 - (function() {})()
(call_expression
  function: (function_expression) @function.call.expression)

; \u6A21\u677F\u5B57\u7B26\u4E32\u4E2D\u7684\u8868\u8FBE\u5F0F\u8C03\u7528
(template_substitution
  (call_expression
    function: (identifier) @template.call.function))

; === \u901A\u7528\u76F4\u63A5\u51FD\u6570\u8C03\u7528\uFF08\u4F18\u5148\u7EA7\u6700\u4F4E\uFF09===

; \u76F4\u63A5\u51FD\u6570\u8C03\u7528 - function()
(call_expression
  function: (identifier) @function.call.direct)
`;

// ../autocompletion/v2/dependenciesProcess/queries/tsx.ts
var tsx_default2 = `
; === React\u7279\u5B9A\u67E5\u8BE2\uFF08\u4F18\u5148\u7EA7\u6700\u9AD8\uFF09===

; \u9AD8\u9636\u7EC4\u4EF6 HOC \u8C03\u7528 - withRouter(Component), memo(Component) - \u5FC5\u987B\u5728\u76F4\u63A5\u51FD\u6570\u8C03\u7528\u4E4B\u524D
(call_expression
  function: (identifier) @hoc.call.name
  arguments: (arguments
    (identifier) @hoc.call.component)
  (#match? @hoc.call.name "^(with[A-Z]|connect|memo|forwardRef)"))

; React.createElement \u8C03\u7528 - \u5FC5\u987B\u5728\u5176\u4ED6\u65B9\u6CD5\u8C03\u7528\u4E4B\u524D
(call_expression
  function: (member_expression
    object: (identifier) @react.create.namespace
    property: (property_identifier) @react.create.method)
  (#eq? @react.create.namespace "React")
  (#eq? @react.create.method "createElement"))

; State \u76F8\u5173 hooks - useState, useReducer
(call_expression
  function: (identifier) @state.hook.call
  (#match? @state.hook.call "^(useState|useReducer)$"))

; Effect \u76F8\u5173 hooks - useEffect, useLayoutEffect
(call_expression
  function: (identifier) @effect.hook.call
  (#match? @effect.hook.call "^(useEffect|useLayoutEffect|useInsertionEffect)$"))

; Memo \u76F8\u5173 hooks - useMemo, useCallback
(call_expression
  function: (identifier) @memo.hook.call
  (#match? @memo.hook.call "^(useMemo|useCallback)$"))

; Ref \u8C03\u7528 - useRef, createRef
(call_expression
  function: (identifier) @ref.hook.call
  (#match? @ref.hook.call "^(useRef|createRef)$"))

; Context \u8C03\u7528 - useContext(ThemeContext)
(call_expression
  function: (identifier) @context.hook.call
  (#eq? @context.hook.call "useContext"))

; \u5176\u4ED6 React Hooks \u8C03\u7528 - \u4E0D\u5728\u4E0A\u8FF0\u7279\u5B9A\u5206\u7C7B\u4E2D\u7684hooks
(call_expression
  function: (identifier) @react.hook.call
  (#match? @react.hook.call "^use[A-Z]")
  (#not-match? @react.hook.call "^(useState|useReducer|useEffect|useLayoutEffect|useInsertionEffect|useMemo|useCallback|useRef|createRef|useContext)$"))

; Event handlers \u5728\u8C03\u7528\u8868\u8FBE\u5F0F\u4E2D - handleClick()
(call_expression
  function: (identifier) @event.handler.function
  (#match? @event.handler.function "^handle[A-Z]"))

; === TypeScript\u7279\u5B9A\u67E5\u8BE2 ===

; \u6CDB\u578B\u51FD\u6570\u8C03\u7528 - function<T>()
(call_expression
  function: (identifier) @generic.call.function
  type_arguments: (type_arguments))

; \u6CDB\u578B\u65B9\u6CD5\u8C03\u7528 - object.method<T>()
(call_expression
  function: (member_expression
    object: (identifier) @generic.call.receiver
    property: (property_identifier) @generic.call.method)
  type_arguments: (type_arguments))

; \u6CDB\u578BPromise\u65B9\u6CD5\u8C03\u7528 - promise.then<T>()
(call_expression
  function: (member_expression
    object: (identifier) @promise.call.object
    property: (property_identifier) @promise.call.method)
  type_arguments: (type_arguments)
  (#match? @promise.call.method "^(then|catch|finally)$"))

; \u7C7B\u578B\u65AD\u8A00\u8C03\u7528 - as Type
(as_expression) @type.assertion

; === \u5F02\u6B65\u8C03\u7528\uFF08\u4F18\u5148\u7EA7\u8F83\u9AD8\uFF09===

; await \u8868\u8FBE\u5F0F\u4E2D\u7684\u51FD\u6570\u8C03\u7528
(await_expression
  (call_expression
    function: (identifier) @await.call.function))

; \u5F02\u6B65\u65B9\u6CD5\u8C03\u7528
(await_expression
  (call_expression
    function: (member_expression
      object: (identifier) @async.call.receiver
      property: (property_identifier) @async.call.method)))

; === \u7279\u5B9A\u65B9\u6CD5\u8C03\u7528\uFF08\u4F18\u5148\u7EA7\u9AD8\u4E8E\u901A\u7528\u65B9\u6CD5\u8C03\u7528\uFF09===

; Promise \u65B9\u6CD5\u8C03\u7528 - promise.then(), promise.catch()
(call_expression
  function: (member_expression
    object: (identifier) @promise.call.object
    property: (property_identifier) @promise.call.method)
  (#match? @promise.call.method "^(then|catch|finally)$"))

; \u6570\u7EC4\u65B9\u6CD5\u8C03\u7528 - array.map(), array.filter()
(call_expression
  function: (member_expression
    object: (identifier) @array.call.object
    property: (property_identifier) @array.call.method)
  (#match? @array.call.method "^(map|filter|reduce|forEach|find|some|every|sort|push|pop|shift|unshift|slice|splice|concat|join|indexOf|includes)$"))

; === \u6784\u9020\u51FD\u6570\u548C\u7C7B\u8C03\u7528 ===

; \u6784\u9020\u51FD\u6570\u8C03\u7528 - new Constructor()
(new_expression
  constructor: (identifier) @constructor.call.name)

; \u6CDB\u578B\u6784\u9020\u51FD\u6570\u8C03\u7528 - new Constructor<T>()
(new_expression
  constructor: (identifier) @generic.constructor.call.name
  type_arguments: (type_arguments))

; \u9759\u6001\u65B9\u6CD5\u8C03\u7528 - Class.staticMethod() (\u9996\u5B57\u6BCD\u5927\u5199\u7684\u6807\u8BC6\u7B26)
(call_expression
  function: (member_expression
    object: (identifier) @static.call.class
    property: (property_identifier) @static.call.method)
  (#match? @static.call.class "^[A-Z]"))

; === \u5BF9\u8C61\u65B9\u6CD5\u8C03\u7528 ===

; this \u65B9\u6CD5\u8C03\u7528 - this.method()
(call_expression
  function: (member_expression
    object: (this) @this.call.receiver
    property: (property_identifier) @this.call.method))

; super \u65B9\u6CD5\u8C03\u7528 - super.method()
(call_expression
  function: (member_expression
    object: (super) @super.call.receiver
    property: (property_identifier) @super.call.method))

; \u53EF\u9009\u94FE\u8C03\u7528 - object?.method?.()
(call_expression
  function: (member_expression
    object: (identifier) @optional.call.receiver
    property: (property_identifier) @optional.call.method))

; \u94FE\u5F0F\u65B9\u6CD5\u8C03\u7528 - object.method1().method2()
(call_expression
  function: (member_expression
    object: (call_expression)
    property: (property_identifier) @method.call.chain))

; \u5D4C\u5957\u5C5E\u6027\u8C03\u7528 - object.nested.method()
(call_expression
  function: (member_expression
    object: (member_expression
      object: (identifier) @nested.call.root
      property: (property_identifier) @nested.call.intermediate)
    property: (property_identifier) @nested.call.method))

; \u65B9\u6CD5\u8C03\u7528 - object.method()
(call_expression
  function: (member_expression
    object: (identifier) @method.call.receiver
    property: (property_identifier) @method.call.name)
  (#not-match? @method.call.receiver "^[A-Z]"))

; === \u547D\u540D\u7A7A\u95F4\u8C03\u7528 ===

; \u547D\u540D\u7A7A\u95F4/\u6A21\u5757\u8C03\u7528 - namespace.function()
(call_expression
  function: (member_expression
    object: (identifier) @namespace.call.name
    property: (property_identifier) @namespace.call.function)
  (#match? @namespace.call.name "^[A-Z]")
  (#not-match? @namespace.call.function "^(constructor|new|create|get|set|add|remove|update|delete)$"))

; === \u7279\u6B8A\u51FD\u6570\u8C03\u7528 ===

; \u7BAD\u5934\u51FD\u6570\u8C03\u7528 - (() => {})()
(call_expression
  function: (arrow_function) @arrow.call.function)

; \u51FD\u6570\u8868\u8FBE\u5F0F\u8C03\u7528 - (function() {})()
(call_expression
  function: (function_expression) @function.call.expression)

; \u6A21\u677F\u5B57\u7B26\u4E32\u4E2D\u7684\u8868\u8FBE\u5F0F\u8C03\u7528
(template_substitution
  (call_expression
    function: (identifier) @template.call.function))

; === \u901A\u7528\u76F4\u63A5\u51FD\u6570\u8C03\u7528\uFF08\u4F18\u5148\u7EA7\u6700\u4F4E\uFF09===

; \u76F4\u63A5\u51FD\u6570\u8C03\u7528 - function()
(call_expression
  function: (identifier) @function.call.direct)
`;

// ../autocompletion/v2/dependenciesProcess/go.ts
function dependenciesCapturesProcessForGo(captures) {
  const result = analyzeGoFunctionCalls(captures);
  return result.functionCalls.map((call) => ({
    name: call.calledFunctionName,
    type: "function_or_method" /* FunctionOrMethod */,
    filePath: "",
    startLine: call.line,
    endLine: call.line,
    startPosition: {
      row: call.line,
      column: call.column
    },
    endPosition: {
      row: call.line,
      column: call.column
    },
    rangeText: "",
    fileHash: ""
  }));
}
function analyzeGoFunctionCalls(captures) {
  const functionCalls = [];
  const scopeInfo = {
    packageName: void 0,
    typeName: void 0,
    functionName: "unknown"
  };
  console.log(`[analyzeGoFunctionCalls] Processing ${captures.length} captures`);
  const methodCallsByLine = /* @__PURE__ */ new Map();
  for (const capture of captures) {
    const node = capture.node;
    const captureText = node.text.trim();
    const line = node.startPosition.row;
    console.log(`[analyzeGoFunctionCalls] Processing capture: ${capture.name} = "${captureText}"`);
    switch (capture.name) {
      case "function.call.direct":
        console.log(`[analyzeGoFunctionCalls] Adding direct function call: ${captureText}`);
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "direct",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "method.call.name":
        if (!methodCallsByLine.has(line)) {
          methodCallsByLine.set(line, {});
        }
        methodCallsByLine.get(line).functionName = captureText;
        break;
      case "method.call.receiver":
        if (!methodCallsByLine.has(line)) {
          methodCallsByLine.set(line, {});
        }
        methodCallsByLine.get(line).receiver = captureText;
        break;
      default:
        console.log(`[analyzeGoFunctionCalls] Unhandled capture type: ${capture.name}`);
        break;
    }
  }
  for (const [line, callInfo] of methodCallsByLine) {
    if (callInfo.functionName && callInfo.receiver) {
      console.log(`[analyzeGoFunctionCalls] Adding method call: ${callInfo.receiver}.${callInfo.functionName}`);
      functionCalls.push({
        calledFunctionName: callInfo.functionName,
        callType: "method",
        receiver: callInfo.receiver,
        line: line + 1,
        column: 0
      });
    }
  }
  console.log(
    `[analyzeGoFunctionCalls] Final result: ${functionCalls.length} function calls, scope: ${JSON.stringify(scopeInfo)}`
  );
  return { functionCalls, scopeInfo };
}

// ../autocompletion/v2/dependenciesProcess/typescript.ts
function dependenciesCapturesProcessForTypeScript(captures) {
  const result = analyzeTypeScriptFunctionCalls(captures);
  return result.functionCalls.map((call) => ({
    name: call.calledFunctionName,
    type: "function_or_method" /* FunctionOrMethod */,
    filePath: "",
    startLine: call.line,
    endLine: call.line,
    startPosition: {
      row: call.line,
      column: call.column
    },
    endPosition: {
      row: call.line,
      column: call.column
    },
    rangeText: "",
    fileHash: "",
    definition: {
      name: call.calledFunctionName,
      type: call.callType
    },
    field: call.className || call.namespace,
    signature: `${call.calledFunctionName}()`,
    language: "typescript" /* TypeScript */
  }));
}
function analyzeTypeScriptFunctionCalls(captures) {
  const functionCalls = [];
  const scopeInfo = {
    moduleName: void 0,
    className: void 0,
    functionName: "unknown",
    isAsync: false
  };
  const callGroups = /* @__PURE__ */ new Map();
  const callsByLine = /* @__PURE__ */ new Map();
  for (const capture of captures) {
    const node = capture.node;
    const captureText = node.text.trim();
    const line = node.startPosition.row;
    switch (capture.name) {
      case "function.call.direct":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "direct",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "method.call.name":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const methodCall = callsByLine.get(line);
        methodCall.functionName = captureText;
        methodCall.callType = "method";
        break;
      case "method.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "static.call.class":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const staticCall = callsByLine.get(line);
        staticCall.className = captureText;
        staticCall.callType = "static";
        break;
      case "static.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "namespace.call.name":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const namespaceCall = callsByLine.get(line);
        namespaceCall.namespace = captureText;
        namespaceCall.callType = "namespace";
        break;
      case "namespace.call.function":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "this.call.method":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "this",
          receiver: "this",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "super.call.method":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "super",
          receiver: "super",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "constructor.call.name":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "constructor",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "method.call.chain":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "chain",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "array.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const arrayCall = callsByLine.get(line);
        arrayCall.functionName = captureText;
        arrayCall.callType = "array";
        break;
      case "array.call.object":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "promise.call.method":
        const promiseGroupKey = `promise-${line}`;
        if (!callGroups.has(promiseGroupKey)) {
          callGroups.set(promiseGroupKey, {});
        }
        callGroups.get(promiseGroupKey)["method"] = captureText;
        callGroups.get(promiseGroupKey)["line"] = line.toString();
        callGroups.get(promiseGroupKey)["column"] = node.startPosition.column.toString();
        break;
      case "promise.call.object":
        const promiseObjGroupKey = `promise-${line}`;
        if (!callGroups.has(promiseObjGroupKey)) {
          callGroups.set(promiseObjGroupKey, {});
        }
        callGroups.get(promiseObjGroupKey)["receiver"] = captureText;
        break;
      case "await.call.function":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "async",
          isAsync: true,
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "async.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const asyncCall = callsByLine.get(line);
        asyncCall.functionName = captureText;
        asyncCall.callType = "async";
        asyncCall.isAsync = true;
        break;
      case "async.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "optional.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const optionalCall = callsByLine.get(line);
        optionalCall.functionName = captureText;
        optionalCall.callType = "optional";
        optionalCall.isOptional = true;
        break;
      case "optional.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "generic.call.function":
        console.log(`[analyzeTypeScriptFunctionCalls] Adding generic function call: ${captureText}`);
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "generic",
          isGeneric: true,
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "template.call.function":
        console.log(`[analyzeTypeScriptFunctionCalls] Adding template function call: ${captureText}`);
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "template",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "nested.call.root":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const nestedCall = callsByLine.get(line);
        nestedCall.receiver = captureText;
        nestedCall.callType = "nested";
        break;
      case "nested.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      default:
        break;
    }
  }
  for (const [groupKey, group] of callGroups) {
    if (groupKey.startsWith("promise-") && group["method"] && group["receiver"]) {
      functionCalls.push({
        calledFunctionName: group["method"],
        callType: "promise",
        receiver: group["receiver"],
        line: parseInt(group["line"]) + 1,
        column: parseInt(group["column"])
      });
    }
  }
  const processedCalls = /* @__PURE__ */ new Set();
  for (const [line, callInfo] of callsByLine) {
    if (callInfo.functionName) {
      const callTypes = [];
      if (callInfo.callType === "promise") {
        callTypes.push({
          type: "promise",
          receiver: callInfo.receiver,
          functionName: callInfo.functionName
        });
      }
      if (callInfo.callType === "array") {
        callTypes.push({
          type: "array",
          receiver: callInfo.receiver,
          functionName: callInfo.functionName
        });
      }
      if (callInfo.className) {
        callTypes.push({
          type: "static",
          receiver: callInfo.className,
          functionName: callInfo.functionName,
          className: callInfo.className
        });
      }
      if (callInfo.namespace) {
        callTypes.push({
          type: "namespace",
          receiver: callInfo.namespace,
          functionName: callInfo.functionName,
          namespace: callInfo.namespace
        });
      }
      if (callInfo.isAsync) {
        callTypes.push({
          type: "async",
          receiver: callInfo.receiver,
          functionName: callInfo.functionName,
          isAsync: true
        });
      }
      if (callInfo.callType === "nested") {
        callTypes.push({
          type: "nested",
          receiver: callInfo.receiver,
          functionName: callInfo.functionName
        });
      }
      if (callTypes.length === 0 && callInfo.receiver) {
        callTypes.push({
          type: "method",
          receiver: callInfo.receiver,
          functionName: callInfo.functionName
        });
      }
      for (const callType of callTypes) {
        const callKey = `${line}-${callType.type}-${callType.functionName}-${callType.receiver || ""}`;
        if (!processedCalls.has(callKey)) {
          processedCalls.add(callKey);
          functionCalls.push({
            calledFunctionName: callType.functionName,
            callType: callType.type,
            receiver: callType.receiver,
            className: callType.className,
            namespace: callType.namespace,
            line: line + 1,
            column: 0,
            isAsync: callType.isAsync,
            isOptional: callInfo.isOptional,
            isGeneric: callInfo.isGeneric
          });
        }
      }
    }
  }
  return { functionCalls, scopeInfo };
}

// ../autocompletion/v2/dependenciesProcess/javascript.ts
function dependenciesCapturesProcessForJavaScript(captures) {
  const result = analyzeJavaScriptFunctionCalls(captures);
  return result.functionCalls.map((call) => ({
    name: call.calledFunctionName,
    type: "function_or_method" /* FunctionOrMethod */,
    filePath: "",
    startLine: call.line,
    endLine: call.line,
    startPosition: {
      row: call.line,
      column: call.column
    },
    endPosition: {
      row: call.line,
      column: call.column
    },
    rangeText: "",
    fileHash: "",
    definition: {
      name: call.calledFunctionName,
      type: call.callType
    },
    field: call.className || call.namespace,
    signature: `${call.calledFunctionName}()`,
    language: "javascript" /* JavaScript */
  }));
}
function analyzeJavaScriptFunctionCalls(captures) {
  const functionCalls = [];
  const scopeInfo = {
    moduleName: void 0,
    className: void 0,
    functionName: "unknown",
    isAsync: false
  };
  const callsByLine = /* @__PURE__ */ new Map();
  for (const capture of captures) {
    const node = capture.node;
    const captureText = node.text.trim();
    const line = node.startPosition.row;
    switch (capture.name) {
      case "function.call.direct":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "direct",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "method.call.name":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const methodCall = callsByLine.get(line);
        methodCall.functionName = captureText;
        methodCall.callType = "method";
        break;
      case "method.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "static.call.class":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const staticCall = callsByLine.get(line);
        staticCall.className = captureText;
        staticCall.callType = "static";
        break;
      case "static.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "this.call.method":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "this",
          receiver: "this",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "super.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = "super";
        break;
      case "super.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const superCall = callsByLine.get(line);
        superCall.functionName = captureText;
        superCall.callType = "super";
        break;
      case "constructor.call.name":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "constructor",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "method.call.chain":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "chain",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "namespace.call.name":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const namespaceCall = callsByLine.get(line);
        namespaceCall.namespace = captureText;
        namespaceCall.callType = "namespace";
        break;
      case "namespace.call.function":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "arrow.call.function":
        functionCalls.push({
          calledFunctionName: "arrow_function",
          callType: "arrow",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "function.call.expression":
        functionCalls.push({
          calledFunctionName: "function_expression",
          callType: "arrow",
          // 归类为箭头函数类型
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "array.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const arrayCall = callsByLine.get(line);
        arrayCall.functionName = captureText;
        arrayCall.callType = "array";
        break;
      case "array.call.object":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "promise.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const promiseCall = callsByLine.get(line);
        promiseCall.functionName = captureText;
        promiseCall.callType = "promise";
        break;
      case "promise.call.object":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "template.call.function":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "template",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "optional.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const optionalCall = callsByLine.get(line);
        optionalCall.receiver = captureText;
        optionalCall.isOptional = true;
        break;
      case "optional.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const optionalMethodCall = callsByLine.get(line);
        optionalMethodCall.functionName = captureText;
        optionalMethodCall.callType = "optional";
        break;
      case "await.call.function":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "async",
          isAsync: true,
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "async.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const asyncCall = callsByLine.get(line);
        asyncCall.receiver = captureText;
        asyncCall.isAsync = true;
        break;
      case "async.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const asyncMethodCall = callsByLine.get(line);
        asyncMethodCall.functionName = captureText;
        asyncMethodCall.callType = "async";
        break;
      case "nested.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const nestedCall = callsByLine.get(line);
        nestedCall.functionName = captureText;
        nestedCall.callType = "nested";
        break;
      case "nested.call.root":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      default:
        break;
    }
  }
  for (const [line, callInfo] of callsByLine) {
    if (callInfo.functionName) {
      functionCalls.push({
        calledFunctionName: callInfo.functionName,
        callType: callInfo.callType || "method",
        receiver: callInfo.receiver,
        className: callInfo.className,
        namespace: callInfo.namespace,
        line: line + 1,
        column: 0,
        isAsync: callInfo.isAsync,
        isOptional: callInfo.isOptional
      });
    }
  }
  return {
    functionCalls,
    scopeInfo
  };
}

// ../autocompletion/v2/dependenciesProcess/java.ts
function dependenciesCapturesProcessForJava(captures) {
  const result = analyzeJavaFunctionCalls(captures);
  return result.functionCalls.map((call) => ({
    name: call.calledFunctionName,
    type: "function_or_method" /* FunctionOrMethod */,
    filePath: "",
    startLine: call.line,
    endLine: call.line,
    startPosition: {
      row: call.line,
      column: call.column
    },
    endPosition: {
      row: call.line,
      column: call.column
    },
    rangeText: "",
    fileHash: "",
    definition: {
      name: call.calledFunctionName,
      type: call.callType
    },
    field: call.className || call.packageName,
    signature: `${call.calledFunctionName}()`,
    language: "java" /* Java */
  }));
}
function analyzeJavaFunctionCalls(captures) {
  const functionCalls = [];
  const scopeInfo = {
    packageName: void 0,
    className: void 0,
    functionName: "unknown"
  };
  const callsByLine = /* @__PURE__ */ new Map();
  for (const capture of captures) {
    const node = capture.node;
    const captureText = node.text.trim();
    const line = node.startPosition.row;
    switch (capture.name) {
      case "method.call.direct":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "direct",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "method.call.name":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const methodCall = callsByLine.get(line);
        methodCall.functionName = captureText;
        methodCall.callType = "method";
        break;
      case "method.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "static.call.class":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const staticCall = callsByLine.get(line);
        staticCall.className = captureText;
        staticCall.callType = "static";
        break;
      case "static.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "this.call.method":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "this",
          receiver: "this",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "super.call.method":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "super",
          receiver: "super",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "constructor.call.name":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "constructor",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      case "method.call.chain":
        functionCalls.push({
          calledFunctionName: captureText,
          callType: "chain",
          line: line + 1,
          column: node.startPosition.column
        });
        break;
      default:
        break;
    }
  }
  for (const [line, callInfo] of callsByLine) {
    if (callInfo.functionName) {
      const callData = {
        calledFunctionName: callInfo.functionName,
        callType: callInfo.callType || "method",
        receiver: callInfo.receiver,
        className: callInfo.className,
        packageName: callInfo.packageName,
        fieldName: callInfo.fieldName,
        line: line + 1,
        column: 0,
        isGeneric: callInfo.isGeneric,
        isException: callInfo.isException
      };
      functionCalls.push(callData);
    }
  }
  return { functionCalls, scopeInfo };
}

// ../autocompletion/v2/dependenciesProcess/python.ts
function dependenciesCapturesProcessForPython(captures) {
  const result = analyzePythonFunctionCalls(captures);
  return result.functionCalls.map((call) => ({
    name: call.calledFunctionName,
    type: "function_or_method" /* FunctionOrMethod */,
    filePath: "",
    startLine: call.line,
    endLine: call.line,
    startPosition: {
      row: call.line,
      column: call.column
    },
    endPosition: {
      row: call.line,
      column: call.column
    },
    rangeText: "",
    fileHash: "",
    definition: {
      name: call.calledFunctionName,
      type: call.callType
    },
    field: call.className,
    signature: `${call.calledFunctionName}()`,
    language: "python" /* Python */
  }));
}
function analyzePythonFunctionCalls(captures) {
  const functionCalls = [];
  const scopeInfo = {
    moduleName: void 0,
    className: void 0,
    functionName: "unknown",
    isAsync: false
  };
  console.log(`[analyzePythonFunctionCalls] Processing ${captures.length} captures`);
  const callsByLine = /* @__PURE__ */ new Map();
  for (const capture of captures) {
    const node = capture.node;
    const captureText = node.text.trim();
    const line = node.startPosition.row;
    console.log(`[analyzePythonFunctionCalls] Processing capture: ${capture.name} = "${captureText}"`);
    switch (capture.name) {
      case "function.call.direct":
        console.log(`[analyzePythonFunctionCalls] Adding direct function call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const directCall = callsByLine.get(line);
        if (!directCall.functionName) {
          directCall.functionName = captureText;
        }
        if (!directCall.callType) {
          directCall.callType = "direct";
        }
        break;
      case "method.call.name":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const methodCall = callsByLine.get(line);
        methodCall.functionName = captureText;
        methodCall.callType = "method";
        break;
      case "method.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).receiver = captureText;
        break;
      case "class.call.name":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const classCall = callsByLine.get(line);
        classCall.className = captureText;
        classCall.callType = "class";
        break;
      case "class.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "self.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const selfCall = callsByLine.get(line);
        selfCall.receiver = captureText;
        selfCall.callType = "self";
        break;
      case "self.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "super.call.function":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const superCall = callsByLine.get(line);
        superCall.receiver = "super";
        superCall.callType = "super";
        break;
      case "super.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "async.call.function":
        console.log(`[analyzePythonFunctionCalls] Adding async function call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const asyncDirectCall = callsByLine.get(line);
        asyncDirectCall.functionName = captureText;
        asyncDirectCall.callType = "async";
        asyncDirectCall.isAsync = true;
        break;
      case "async.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const asyncCall = callsByLine.get(line);
        asyncCall.receiver = captureText;
        asyncCall.callType = "async";
        asyncCall.isAsync = true;
        break;
      case "async.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "decorator.call.function":
        console.log(`[analyzePythonFunctionCalls] Adding decorator function call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const decoratorDirectCall = callsByLine.get(line);
        decoratorDirectCall.functionName = captureText;
        decoratorDirectCall.callType = "decorator";
        decoratorDirectCall.isDecorator = true;
        break;
      case "decorator.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const decoratorCall = callsByLine.get(line);
        decoratorCall.receiver = captureText;
        decoratorCall.callType = "decorator";
        decoratorCall.isDecorator = true;
        break;
      case "decorator.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "method.call.chain":
        console.log(`[analyzePythonFunctionCalls] Adding chain method call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const chainCall = callsByLine.get(line);
        chainCall.functionName = captureText;
        chainCall.callType = "chain";
        break;
      case "comprehension.call.function":
        console.log(`[analyzePythonFunctionCalls] Adding comprehension function call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const comprehensionDirectCall = callsByLine.get(line);
        comprehensionDirectCall.functionName = captureText;
        comprehensionDirectCall.callType = "comprehension";
        break;
      case "comprehension.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const comprehensionCall = callsByLine.get(line);
        comprehensionCall.receiver = captureText;
        comprehensionCall.callType = "comprehension";
        break;
      case "comprehension.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "generator.call.function":
        console.log(`[analyzePythonFunctionCalls] Adding generator function call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const generatorDirectCall = callsByLine.get(line);
        generatorDirectCall.functionName = captureText;
        generatorDirectCall.callType = "generator";
        break;
      case "generator.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const generatorCall = callsByLine.get(line);
        generatorCall.receiver = captureText;
        generatorCall.callType = "generator";
        break;
      case "generator.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "lambda.call.function":
        console.log(`[analyzePythonFunctionCalls] Adding lambda function call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const lambdaDirectCall = callsByLine.get(line);
        lambdaDirectCall.functionName = captureText;
        lambdaDirectCall.callType = "lambda";
        break;
      case "lambda.call.receiver":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const lambdaCall = callsByLine.get(line);
        lambdaCall.receiver = captureText;
        lambdaCall.callType = "lambda";
        break;
      case "lambda.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "nested.call.root":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const nestedCall = callsByLine.get(line);
        nestedCall.root = captureText;
        nestedCall.callType = "nested";
        break;
      case "nested.call.intermediate":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).intermediate = captureText;
        break;
      case "nested.call.method":
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        callsByLine.get(line).functionName = captureText;
        break;
      case "function.call.argument":
        console.log(`[analyzePythonFunctionCalls] Adding argument function call: ${captureText}`);
        if (!callsByLine.has(line)) {
          callsByLine.set(line, {});
        }
        const argumentCall = callsByLine.get(line);
        argumentCall.functionName = captureText;
        argumentCall.callType = "argument";
        break;
      default:
        console.log(`[analyzePythonFunctionCalls] Unhandled capture type: ${capture.name}`);
        break;
    }
  }
  const processedCalls = /* @__PURE__ */ new Set();
  for (const [line, callInfo] of callsByLine) {
    if (callInfo.functionName) {
      let finalCallType = callInfo.callType;
      if (callInfo.isDecorator) {
        finalCallType = "decorator";
      } else if (callInfo.isAsync) {
        finalCallType = "async";
      } else if (callInfo.receiver === "self") {
        finalCallType = "self";
      } else if (callInfo.className) {
        finalCallType = "class";
      } else if (callInfo.receiver && callInfo.callType === "method") {
        finalCallType = "method";
      }
      const callKey = `${line}-${finalCallType}-${callInfo.functionName}-${callInfo.receiver || ""}-${callInfo.className || ""}`;
      if (!processedCalls.has(callKey)) {
        processedCalls.add(callKey);
        let receiver = callInfo.receiver;
        if (finalCallType === "nested" && callInfo.root && callInfo.intermediate) {
          receiver = `${callInfo.root}.${callInfo.intermediate}`;
        }
        functionCalls.push({
          calledFunctionName: callInfo.functionName,
          callType: finalCallType,
          receiver,
          className: callInfo.className,
          line: line + 1,
          column: 0,
          isAsync: callInfo.isAsync,
          isDecorator: callInfo.isDecorator
        });
        console.log(
          `[analyzePythonFunctionCalls] Adding ${finalCallType} call: ${callInfo.functionName} (receiver: ${receiver || "none"})`
        );
      }
    }
  }
  console.log(
    `[analyzePythonFunctionCalls] Final result: ${functionCalls.length} function calls, scope: ${JSON.stringify(scopeInfo)}`
  );
  return { functionCalls, scopeInfo };
}

// ../autocompletion/v2/dependenciesProcess/jsx.ts
function dependenciesCapturesProcessForJSX(captures) {
  const result = analyzeJSXFunctionCalls(captures);
  return result.functionCalls.map((call) => ({
    name: call.calledFunctionName,
    type: "function_or_method" /* FunctionOrMethod */,
    filePath: "",
    startLine: call.line,
    endLine: call.line,
    startPosition: {
      row: call.line,
      column: call.column
    },
    endPosition: {
      row: call.line,
      column: call.column
    },
    rangeText: "",
    fileHash: "",
    definition: {
      name: call.calledFunctionName,
      type: call.callType,
      isAsync: call.isAsync
    },
    field: call.className || call.namespace || call.component || call.context,
    signature: buildSignatureForJSXCall(call),
    language: "jsx" /* JSX */
  }));
}
function buildSignatureForJSXCall(call) {
  switch (call.callType) {
    case "react_hook":
      return `${call.calledFunctionName}() // React Hook`;
    case "react_component":
      return `${call.calledFunctionName}() // React Component`;
    case "event_handler":
      return `${call.calledFunctionName}() // Event Handler`;
    case "react_create":
      return `React.createElement(${call.component}) // React.createElement`;
    case "hoc":
      return `${call.calledFunctionName}(${call.component}) // Higher-Order Component`;
    case "context_hook":
      return `useContext(${call.context}) // Context Hook`;
    case "ref_hook":
      return `${call.calledFunctionName}() // Ref Hook`;
    case "state_hook":
      return `${call.calledFunctionName}() // State Hook`;
    case "effect_hook":
      return `${call.calledFunctionName}() // Effect Hook`;
    case "memo_hook":
      return `${call.calledFunctionName}() // Memo Hook`;
    default:
      return `${call.calledFunctionName}()`;
  }
}
function analyzeJSXFunctionCalls(captures) {
  const functionCalls = [];
  const scopeInfo = {
    moduleName: void 0,
    componentName: void 0,
    functionName: "unknown",
    isAsync: false,
    isReactComponent: false
  };
  const callsByLine = /* @__PURE__ */ new Map();
  const processedCalls = /* @__PURE__ */ new Set();
  const priorityGroups = {
    hoc: [],
    reactCreate: [],
    reactHooks: [],
    eventHandlers: [],
    awaitCalls: [],
    arrayMethods: [],
    promiseMethods: [],
    directCalls: [],
    methodCalls: [],
    other: []
  };
  for (const capture of captures) {
    switch (capture.name) {
      case "hoc.call.name":
      case "hoc.call.component":
        priorityGroups.hoc.push(capture);
        break;
      case "react.create.namespace":
      case "react.create.method":
        priorityGroups.reactCreate.push(capture);
        break;
      case "state.hook.call":
      case "effect.hook.call":
      case "memo.hook.call":
      case "ref.hook.call":
      case "context.hook.call":
      case "react.hook.call":
        priorityGroups.reactHooks.push(capture);
        break;
      case "event.handler.function":
        priorityGroups.eventHandlers.push(capture);
        break;
      case "await.call.function":
      case "async.call.receiver":
      case "async.call.method":
        priorityGroups.awaitCalls.push(capture);
        break;
      case "array.call.method":
      case "array.call.object":
        priorityGroups.arrayMethods.push(capture);
        break;
      case "promise.call.method":
      case "promise.call.object":
        priorityGroups.promiseMethods.push(capture);
        break;
      case "function.call.direct":
        priorityGroups.directCalls.push(capture);
        break;
      case "method.call.name":
      case "method.call.receiver":
      case "method.call.chain":
      case "optional.call.receiver":
      case "optional.call.method":
      case "static.call.class":
      case "static.call.method":
        priorityGroups.methodCalls.push(capture);
        break;
      default:
        priorityGroups.other.push(capture);
        break;
    }
  }
  const allGroups = [
    priorityGroups.hoc,
    priorityGroups.reactCreate,
    priorityGroups.reactHooks,
    priorityGroups.eventHandlers,
    priorityGroups.awaitCalls,
    priorityGroups.arrayMethods,
    priorityGroups.promiseMethods,
    priorityGroups.methodCalls,
    priorityGroups.other,
    priorityGroups.directCalls
    // 直接调用放最后，优先级最低
  ];
  for (const group of allGroups) {
    for (const capture of group) {
      const node = capture.node;
      const captureText = node.text.trim();
      const line = node.startPosition.row;
      const callKey = `${line}-${node.startPosition.column}-${captureText}-${capture.name}`;
      if (processedCalls.has(callKey)) {
        continue;
      }
      if (capture.name === "function.call.direct") {
        const generalCallKey = `${line}-${captureText}`;
        let isAlreadyProcessed = false;
        for (const existingKey of processedCalls) {
          if (existingKey.includes(generalCallKey)) {
            isAlreadyProcessed = true;
            break;
          }
        }
        const lineCall = callsByLine.get(line);
        if (lineCall?.functionName === captureText) {
          isAlreadyProcessed = true;
        }
        if (isAlreadyProcessed) {
          continue;
        }
      }
      switch (capture.name) {
        case "hoc.call.name":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const hocCall = callsByLine.get(line);
          hocCall.functionName = captureText;
          hocCall.callType = "hoc";
          hocCall.isReactSpecific = true;
          break;
        case "hoc.call.component":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).component = captureText;
          break;
        case "react.create.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const createCall = callsByLine.get(line);
          createCall.functionName = captureText;
          createCall.callType = "react_create";
          createCall.isReactSpecific = true;
          break;
        case "state.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "state_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "effect.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "effect_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "memo.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "memo_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "ref.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "ref_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "context.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "context_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "react.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "react_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "event.handler.function":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "event_handler",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "await.call.function":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "async",
            isAsync: true,
            line: line + 1,
            column: node.startPosition.column
          });
          processedCalls.add(callKey);
          break;
        case "promise.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const promiseCall = callsByLine.get(line);
          promiseCall.functionName = captureText;
          promiseCall.callType = "promise";
          break;
        case "promise.call.object":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).receiver = captureText;
          break;
        case "array.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const arrayCall = callsByLine.get(line);
          arrayCall.functionName = captureText;
          arrayCall.callType = "array";
          break;
        case "array.call.object":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).receiver = captureText;
          break;
        case "async.call.receiver":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const asyncCall = callsByLine.get(line);
          asyncCall.receiver = captureText;
          asyncCall.isAsync = true;
          break;
        case "async.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const asyncMethodCall = callsByLine.get(line);
          asyncMethodCall.functionName = captureText;
          asyncMethodCall.callType = "async";
          break;
        case "method.call.name":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const methodCall = callsByLine.get(line);
          if (!methodCall.callType) {
            methodCall.functionName = captureText;
            methodCall.callType = "method";
          }
          break;
        case "method.call.receiver":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).receiver = captureText;
          break;
        case "static.call.class":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const staticClassCall = callsByLine.get(line);
          if (!staticClassCall.callType || staticClassCall.callType === "method") {
            staticClassCall.className = captureText;
            staticClassCall.callType = "static";
          }
          break;
        case "static.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const staticMethodCall = callsByLine.get(line);
          if (!staticMethodCall.callType || staticMethodCall.callType === "method") {
            staticMethodCall.functionName = captureText;
            staticMethodCall.callType = "static";
          }
          break;
        case "optional.call.receiver":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const optionalCall = callsByLine.get(line);
          optionalCall.receiver = captureText;
          optionalCall.isOptional = true;
          break;
        case "optional.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const optionalMethodCall = callsByLine.get(line);
          break;
        case "function.call.direct":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "direct",
            line: line + 1,
            column: node.startPosition.column
          });
          processedCalls.add(callKey);
          break;
        case "method.call.chain":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const chainCall = callsByLine.get(line);
          if (captureText.match(/^(then|catch|finally)$/)) {
            chainCall.functionName = captureText;
            chainCall.callType = "promise";
          } else {
            if (!chainCall.callType) {
              chainCall.functionName = captureText;
              chainCall.callType = "chain";
            }
          }
          break;
        // 其他情况处理...
        default:
          break;
      }
    }
  }
  for (const [line, callInfo] of callsByLine) {
    if (callInfo.functionName) {
      const callKey = `${line}-0-${callInfo.functionName}-compound`;
      if (!processedCalls.has(callKey)) {
        functionCalls.push({
          calledFunctionName: callInfo.functionName,
          callType: callInfo.callType || "method",
          receiver: callInfo.receiver,
          className: callInfo.className,
          namespace: callInfo.namespace,
          component: callInfo.component,
          context: callInfo.context,
          line: line + 1,
          column: 0,
          isAsync: callInfo.isAsync,
          isOptional: callInfo.isOptional,
          isReactSpecific: callInfo.isReactSpecific
        });
        processedCalls.add(callKey);
      }
    }
  }
  return {
    functionCalls,
    scopeInfo
  };
}

// ../autocompletion/v2/dependenciesProcess/tsx.ts
function dependenciesCapturesProcessForTSX(captures) {
  const result = analyzeTSXFunctionCalls(captures);
  return result.functionCalls.map((call) => {
    const def = {
      name: call.calledFunctionName,
      type: call.callType,
      isAsync: call.isAsync
    };
    if (call.isGeneric) def.isGeneric = true;
    if (call.isReactSpecific) def.isReactSpecific = true;
    return {
      name: call.calledFunctionName,
      type: "function_or_method" /* FunctionOrMethod */,
      filePath: "",
      startLine: call.line,
      endLine: call.line,
      startPosition: {
        row: call.line,
        column: call.column
      },
      endPosition: {
        row: call.line,
        column: call.column
      },
      rangeText: "",
      fileHash: "",
      definition: def,
      field: call.className || call.namespace || call.component || call.context || call.typeArgument,
      signature: buildSignatureForTSXCall(call),
      language: "tsx" /* TSX */
    };
  });
}
function buildSignatureForTSXCall(call) {
  switch (call.callType) {
    case "react_hook":
      return `${call.calledFunctionName}() // React Hook`;
    case "react_component":
      return `${call.calledFunctionName}() // React Component`;
    case "tsx_component":
      return `${call.calledFunctionName}() // TSX Component`;
    case "event_handler":
      return `${call.calledFunctionName}() // Event Handler`;
    case "react_create":
      return `React.createElement(${call.component}) // React.createElement`;
    case "hoc":
      return `${call.calledFunctionName}(${call.component}) // Higher-Order Component`;
    case "context_hook":
      return `useContext(${call.context}) // Context Hook`;
    case "ref_hook":
      return `${call.calledFunctionName}() // Ref Hook`;
    case "state_hook":
      return `${call.calledFunctionName}() // State Hook`;
    case "effect_hook":
      return `${call.calledFunctionName}() // Effect Hook`;
    case "memo_hook":
      return `${call.calledFunctionName}() // Memo Hook`;
    case "generic_call":
      return `${call.calledFunctionName}<${call.typeArgument}>() // Generic Function`;
    case "generic_method":
      return `${call.receiver}.${call.calledFunctionName}<${call.typeArgument}>() // Generic Method`;
    case "type_assertion":
      return `as ${call.typeArgument} // Type Assertion`;
    default:
      return `${call.calledFunctionName}()`;
  }
}
function analyzeTSXFunctionCalls(captures) {
  const functionCalls = [];
  const scopeInfo = {
    moduleName: void 0,
    componentName: void 0,
    functionName: "unknown",
    isAsync: false,
    isReactComponent: false,
    isTypeScript: true
  };
  const callsByLine = /* @__PURE__ */ new Map();
  const processedCalls = /* @__PURE__ */ new Set();
  const priorityGroups = {
    hoc: [],
    reactCreate: [],
    reactHooks: [],
    eventHandlers: [],
    genericCalls: [],
    typeAssertions: [],
    awaitCalls: [],
    arrayMethods: [],
    promiseMethods: [],
    directCalls: [],
    methodCalls: [],
    other: []
  };
  for (const capture of captures) {
    switch (capture.name) {
      case "hoc.call.name":
      case "hoc.call.component":
        priorityGroups.hoc.push(capture);
        break;
      case "react.create.namespace":
      case "react.create.method":
        priorityGroups.reactCreate.push(capture);
        break;
      case "state.hook.call":
      case "effect.hook.call":
      case "memo.hook.call":
      case "ref.hook.call":
      case "context.hook.call":
      case "react.hook.call":
        priorityGroups.reactHooks.push(capture);
        break;
      case "event.handler.function":
        priorityGroups.eventHandlers.push(capture);
        break;
      case "generic.call.function":
      case "generic.call.receiver":
      case "generic.call.method":
      case "generic.constructor.call.name":
        priorityGroups.genericCalls.push(capture);
        break;
      case "type.assertion.type":
        priorityGroups.typeAssertions.push(capture);
        break;
      case "await.call.function":
      case "async.call.receiver":
      case "async.call.method":
        priorityGroups.awaitCalls.push(capture);
        break;
      case "array.call.method":
      case "array.call.object":
        priorityGroups.arrayMethods.push(capture);
        break;
      case "promise.call.method":
      case "promise.call.object":
        priorityGroups.promiseMethods.push(capture);
        break;
      case "function.call.direct":
        priorityGroups.directCalls.push(capture);
        break;
      case "method.call.name":
      case "method.call.receiver":
      case "method.call.chain":
      case "optional.call.receiver":
      case "optional.call.method":
      case "static.call.class":
      case "static.call.method":
        priorityGroups.methodCalls.push(capture);
        break;
      default:
        priorityGroups.other.push(capture);
        break;
    }
  }
  const allGroups = [
    priorityGroups.hoc,
    priorityGroups.reactCreate,
    priorityGroups.reactHooks,
    priorityGroups.eventHandlers,
    priorityGroups.genericCalls,
    priorityGroups.typeAssertions,
    priorityGroups.awaitCalls,
    priorityGroups.arrayMethods,
    priorityGroups.promiseMethods,
    priorityGroups.methodCalls,
    priorityGroups.other,
    priorityGroups.directCalls
    // 直接调用放最后，优先级最低
  ];
  for (const group of allGroups) {
    for (const capture of group) {
      const node = capture.node;
      const captureText = node.text.trim();
      const line = node.startPosition.row;
      const callKey = `${line}-${node.startPosition.column}-${captureText}-${capture.name}`;
      if (processedCalls.has(callKey)) {
        continue;
      }
      if (capture.name === "function.call.direct") {
        const generalCallKey = `${line}-${captureText}`;
        let isAlreadyProcessed = false;
        for (const existingKey of processedCalls) {
          if (existingKey.includes(generalCallKey)) {
            isAlreadyProcessed = true;
            break;
          }
        }
        const lineCall = callsByLine.get(line);
        if (lineCall?.functionName === captureText) {
          isAlreadyProcessed = true;
        }
        if (isAlreadyProcessed) {
          continue;
        }
      }
      switch (capture.name) {
        case "hoc.call.name":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const hocCall = callsByLine.get(line);
          hocCall.functionName = captureText;
          hocCall.callType = "hoc";
          hocCall.isReactSpecific = true;
          break;
        case "hoc.call.component":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).component = captureText;
          break;
        case "react.create.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const createCall = callsByLine.get(line);
          createCall.functionName = captureText;
          createCall.callType = "react_create";
          createCall.isReactSpecific = true;
          break;
        case "state.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "state_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "effect.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "effect_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "memo.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "memo_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "ref.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "ref_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "context.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "context_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "react.hook.call":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "react_hook",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "event.handler.function":
          console.log(
            `[DEBUG] Event handler captured: ${captureText} at line ${line + 1}, column ${node.startPosition.column}`
          );
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "event_handler",
            line: line + 1,
            column: node.startPosition.column,
            isReactSpecific: true
          });
          processedCalls.add(callKey);
          break;
        case "generic.call.function":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const genericCall = callsByLine.get(line);
          genericCall.functionName = captureText;
          genericCall.callType = "generic_call";
          genericCall.isGeneric = true;
          break;
        case "generic.call.receiver":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).receiver = captureText;
          break;
        case "generic.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const genericMethodCall = callsByLine.get(line);
          genericMethodCall.functionName = captureText;
          genericMethodCall.callType = "generic_method";
          genericMethodCall.isGeneric = true;
          break;
        case "generic.constructor.call.name":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const genericConstructorCall = callsByLine.get(line);
          genericConstructorCall.functionName = captureText;
          genericConstructorCall.callType = "constructor";
          genericConstructorCall.isGeneric = true;
          break;
        case "type.assertion.type":
          functionCalls.push({
            calledFunctionName: "as",
            callType: "type_assertion",
            typeArgument: captureText,
            line: line + 1,
            column: node.startPosition.column
          });
          processedCalls.add(callKey);
          break;
        case "await.call.function":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "async",
            isAsync: true,
            line: line + 1,
            column: node.startPosition.column
          });
          processedCalls.add(callKey);
          break;
        case "promise.call.method":
          console.log(
            `[DEBUG] Promise method captured: ${captureText} at line ${line + 1}, column ${node.startPosition.column}`
          );
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const promiseCall = callsByLine.get(line);
          promiseCall.functionName = captureText;
          promiseCall.callType = "promise";
          break;
        case "promise.call.object":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).receiver = captureText;
          break;
        case "array.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const arrayCall = callsByLine.get(line);
          arrayCall.functionName = captureText;
          arrayCall.callType = "array";
          break;
        case "array.call.object":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).receiver = captureText;
          break;
        case "async.call.receiver":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const asyncCall = callsByLine.get(line);
          asyncCall.receiver = captureText;
          asyncCall.isAsync = true;
          break;
        case "async.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const asyncMethodCall = callsByLine.get(line);
          asyncMethodCall.functionName = captureText;
          asyncMethodCall.callType = "async";
          break;
        case "method.call.name":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const methodCall = callsByLine.get(line);
          if (!methodCall.callType) {
            methodCall.functionName = captureText;
            methodCall.callType = "method";
          }
          break;
        case "method.call.receiver":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          callsByLine.get(line).receiver = captureText;
          break;
        case "static.call.class":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const staticClassCall = callsByLine.get(line);
          if (!staticClassCall.callType || staticClassCall.callType === "method") {
            staticClassCall.className = captureText;
            staticClassCall.callType = "static";
          }
          break;
        case "static.call.method":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "static",
            line: line + 1,
            column: node.startPosition.column
          });
          processedCalls.add(callKey);
          break;
        case "optional.call.receiver":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const optionalCall = callsByLine.get(line);
          optionalCall.receiver = captureText;
          optionalCall.isOptional = true;
          break;
        case "optional.call.method":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const optionalMethodCall = callsByLine.get(line);
          break;
        case "function.call.direct":
          functionCalls.push({
            calledFunctionName: captureText,
            callType: "direct",
            line: line + 1,
            column: node.startPosition.column
          });
          processedCalls.add(callKey);
          break;
        case "method.call.chain":
          if (!callsByLine.has(line)) {
            callsByLine.set(line, {});
          }
          const chainCall = callsByLine.get(line);
          if (captureText.match(/^(then|catch|finally)$/)) {
            chainCall.functionName = captureText;
            chainCall.callType = "promise";
          } else {
            if (!chainCall.callType) {
              chainCall.functionName = captureText;
              chainCall.callType = "chain";
            }
          }
          break;
        // 其他情况处理...
        default:
          break;
      }
    }
  }
  for (const [line, callInfo] of callsByLine) {
    if (callInfo.functionName) {
      const callKey = `${line}-0-${callInfo.functionName}-compound`;
      if (!processedCalls.has(callKey)) {
        let callType = callInfo.callType;
        if (callType === "event_handler") {
        } else if (callType === "promise") {
        } else if (callInfo.className && (callType === "generic_method" || callType === "method")) {
          callType = "static";
        }
        functionCalls.push({
          calledFunctionName: callInfo.functionName,
          callType: callType || "method",
          receiver: callInfo.receiver,
          className: callInfo.className,
          namespace: callInfo.namespace,
          component: callInfo.component,
          context: callInfo.context,
          typeArgument: callInfo.typeArgument,
          line: line + 1,
          column: 0,
          isAsync: callInfo.isAsync,
          isOptional: callInfo.isOptional,
          isReactSpecific: callInfo.isReactSpecific,
          isGeneric: callInfo.isGeneric
        });
        processedCalls.add(callKey);
      }
    }
  }
  for (const capture of captures) {
    if (capture.name === "type.assertion") {
      const node = capture.node;
      functionCalls.push({
        calledFunctionName: "as",
        callType: "type_assertion",
        line: node.startPosition.row + 1,
        column: node.startPosition.column
      });
    }
  }
  return {
    functionCalls,
    scopeInfo
  };
}

// ../autocompletion/v2/dependenciesProcess/index.ts
var dependenciesCapturesQueries = {
  ["go" /* Go */]: go_default2,
  ["python" /* Python */]: python_default2,
  ["typescript" /* TypeScript */]: typescript_default2,
  ["javascript" /* JavaScript */]: javascript_default2,
  ["java" /* Java */]: java_default2,
  ["jsx" /* JSX */]: jsx_default2,
  ["tsx" /* TSX */]: tsx_default2,
  ["swift" /* Swift */]: null,
  ["css" /* CSS */]: null,
  ["html" /* HTML */]: null,
  ["kotlin" /* Kotlin */]: null,
  ["php" /* PHP */]: null,
  ["rust" /* Rust */]: null,
  ["c" /* C */]: null,
  ["cpp" /* CPP */]: null,
  ["unknown" /* Unknown */]: null
};
var dependenciesProcessors = {
  ["go" /* Go */]: dependenciesCapturesProcessForGo,
  ["python" /* Python */]: dependenciesCapturesProcessForPython,
  ["typescript" /* TypeScript */]: dependenciesCapturesProcessForTypeScript,
  ["javascript" /* JavaScript */]: dependenciesCapturesProcessForJavaScript,
  ["java" /* Java */]: dependenciesCapturesProcessForJava,
  ["jsx" /* JSX */]: dependenciesCapturesProcessForJSX,
  ["tsx" /* TSX */]: dependenciesCapturesProcessForTSX,
  ["swift" /* Swift */]: (captures) => [],
  ["css" /* CSS */]: (captures) => [],
  ["html" /* HTML */]: (captures) => [],
  ["kotlin" /* Kotlin */]: (captures) => [],
  ["php" /* PHP */]: (captures) => [],
  ["rust" /* Rust */]: (captures) => [],
  ["c" /* C */]: (captures) => [],
  ["cpp" /* CPP */]: (captures) => [],
  ["unknown" /* Unknown */]: (captures) => []
};

// ../autocompletion/v2/utils/languageCommentUtils.ts
var lineCommentSymbols = {
  ["go" /* Go */]: "//",
  ["python" /* Python */]: "#",
  ["typescript" /* TypeScript */]: "//",
  ["javascript" /* JavaScript */]: "//",
  ["java" /* Java */]: "//",
  ["unknown" /* Unknown */]: ""
};
function formatCodeWithLanguageWithLineComment(text, language) {
  if (language === "unknown" /* Unknown */) {
    return text;
  }
  const lineCommentSymbol = lineCommentSymbols[language];
  if (!lineCommentSymbol) {
    return text;
  }
  const lines = text.split("\n");
  const formattedLines = lines.map((line) => {
    return `${lineCommentSymbol} ${line}`;
  });
  return formattedLines.join("\n");
}

// ../autocompletion/v2/utils/treeUtils.ts
var fs2 = __toESM(require("fs/promises"));
var path3 = __toESM(require("path"));
var gitignoreCache = /* @__PURE__ */ new Map();
async function getGitignoreFilter(dirPathRoot) {
  const gitignorePath = path3.join(dirPathRoot, ".gitignore");
  try {
    const stat2 = await fs2.stat(gitignorePath);
    const cached = gitignoreCache.get(gitignorePath);
    if (cached && cached.mtimeMs === stat2.mtimeMs) {
      return cached.filter;
    }
    const content = await fs2.readFile(gitignorePath, "utf8");
    const rules = content.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
    const matchers = rules.map((rule) => {
      if (rule.endsWith("/")) {
        const dirRule = rule.replace(/\/$/, "");
        return (p, isDir) => isDir && p.includes(dirRule);
      } else {
        return (p, isDir) => p.includes(rule);
      }
    });
    const filter = (p, isDir) => !matchers.some((fn) => fn(p, isDir));
    gitignoreCache.set(gitignorePath, { mtimeMs: stat2.mtimeMs, rules, filter });
    return filter;
  } catch {
    return () => true;
  }
}
async function treeView(dirPathRoot, filePaths, limitNum, maxDepth, options = {}) {
  const { showDotDirs = false, allowOtherExtensions = false } = options;
  const absRoot = path3.resolve(dirPathRoot);
  const normFilePaths = filePaths.map((fp) => path3.resolve(dirPathRoot, fp));
  const expandDirs = /* @__PURE__ */ new Set();
  const siblingDirs = /* @__PURE__ */ new Set();
  const fileExts = /* @__PURE__ */ new Map();
  for (const fileAbs of normFilePaths) {
    let cur = path3.dirname(fileAbs);
    siblingDirs.add(cur);
    if (!fileExts.has(cur)) fileExts.set(cur, /* @__PURE__ */ new Set());
    fileExts.get(cur).add(path3.extname(fileAbs));
    while (cur.startsWith(absRoot)) {
      expandDirs.add(cur);
      if (cur === absRoot) break;
      cur = path3.dirname(cur);
    }
  }
  const gitignoreFilter = await getGitignoreFilter(absRoot);
  async function walk(dir, depth, prefix, isLast) {
    if (depth > maxDepth) {
      const entries2 = await fs2.readdir(dir, { withFileTypes: true });
      return [prefix + ellipsisLine(entries2.length, "(\u8D85\u51FA\u6DF1\u5EA6)")];
    }
    let entries = [];
    try {
      entries = await fs2.readdir(dir, { withFileTypes: true });
    } catch {
      return [prefix + "[\u65E0\u6CD5\u8BFB\u53D6\u76EE\u5F55]"];
    }
    const isSiblingDir = siblingDirs.has(dir);
    if (!showDotDirs && !isSiblingDir) {
      entries = entries.filter((e) => !e.name.startsWith("."));
    }
    entries = entries.filter(
      (e) => gitignoreFilter(path3.relative(absRoot, path3.join(dir, e.name)), e.isDirectory())
    );
    entries.sort((a, b) => {
      const aPath = path3.join(dir, a.name);
      const bPath = path3.join(dir, b.name);
      const aExpand = expandDirs.has(dir);
      const bExpand = expandDirs.has(dir);
      if (aExpand && bExpand) {
        if (a.isDirectory() !== b.isDirectory()) return Number(a.isDirectory()) - Number(b.isDirectory());
        return a.name.localeCompare(b.name);
      } else {
        if (a.isDirectory() !== b.isDirectory()) return Number(b.isDirectory()) - Number(a.isDirectory());
        return a.name.localeCompare(b.name);
      }
    });
    const lines2 = [];
    let shown = 0;
    let omitted = 0;
    const showAllSiblings = isSiblingDir;
    const requiredExts = fileExts.get(dir);
    if (showAllSiblings) {
      const siblingFiles = entries.filter(
        (e) => !e.isDirectory() && (allowOtherExtensions || !requiredExts || requiredExts.has(path3.extname(e.name)))
      );
      const siblingDirs2 = entries.filter((e) => e.isDirectory());
      for (let i2 = 0; i2 < siblingFiles.length && shown < limitNum; i2++, shown++) {
        const entry = siblingFiles[i2];
        const isEntryLast = shown === limitNum - 1 || i2 === siblingFiles.length - 1 && shown + siblingDirs2.length >= limitNum || shown === siblingFiles.length + siblingDirs2.length - 1;
        const branch = isEntryLast ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ";
        lines2.push(prefix + branch + entry.name);
      }
      for (let i2 = 0; i2 < siblingDirs2.length && shown < limitNum; i2++, shown++) {
        const entry = siblingDirs2[i2];
        const entryPath = path3.join(dir, entry.name);
        const isEntryLast = shown === limitNum - 1 || i2 === siblingDirs2.length - 1 || shown === siblingFiles.length + siblingDirs2.length - 1;
        const branch = isEntryLast ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ";
        const nextPrefix = prefix + (isEntryLast ? "    " : "\u2502   ");
        if (expandDirs.has(entryPath)) {
          lines2.push(prefix + branch + entry.name + "/");
          const sub = await walk(entryPath, depth + 1, nextPrefix, isEntryLast);
          lines2.push(...sub);
        } else {
          const subEntries = await fs2.readdir(entryPath, { withFileTypes: true });
          const filteredSubEntries = subEntries.filter(
            (e) => gitignoreFilter(path3.relative(absRoot, path3.join(entryPath, e.name)), e.isDirectory())
          );
          lines2.push(prefix + branch + entry.name + `/ ...(${filteredSubEntries.length}\u9879)`);
        }
      }
      const total = siblingFiles.length + siblingDirs2.length;
      if (shown < total) {
        lines2.push(prefix + ellipsisLine(total - shown));
      }
      return lines2;
    }
    for (let i2 = 0; i2 < entries.length; i2++) {
      const entry = entries[i2];
      const entryPath = path3.join(dir, entry.name);
      const isDir = entry.isDirectory();
      const isEntryLast = shown === limitNum - 1 || i2 === entries.length - 1 || shown === entries.length - 1;
      if (shown >= limitNum) {
        omitted = entries.length - shown;
        lines2.push(prefix + ellipsisLine(omitted));
        break;
      }
      const branch = isEntryLast ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ";
      const nextPrefix = prefix + (isEntryLast ? "    " : "\u2502   ");
      if (isDir) {
        if (expandDirs.has(entryPath)) {
          lines2.push(prefix + branch + entry.name + "/");
          const sub = await walk(entryPath, depth + 1, nextPrefix, isEntryLast);
          lines2.push(...sub);
        } else {
          const subEntries = await fs2.readdir(entryPath, { withFileTypes: true });
          const filteredSubEntries = subEntries.filter(
            (e) => gitignoreFilter(path3.relative(absRoot, path3.join(entryPath, e.name)), e.isDirectory())
          );
          lines2.push(prefix + branch + entry.name + `/ ...(${filteredSubEntries.length}\u9879)`);
        }
      } else {
        if (showAllSiblings) {
          if (allowOtherExtensions || !requiredExts || requiredExts.has(path3.extname(entry.name))) {
            lines2.push(prefix + branch + entry.name);
          }
        } else if (normFilePaths.includes(entryPath)) {
          lines2.push(prefix + branch + entry.name);
        }
      }
      shown++;
    }
    return lines2;
  }
  function ellipsisLine(count, note) {
    return `...(${count}\u9879${note ? note : ""})`;
  }
  const rootName = path3.basename(absRoot) || absRoot;
  const lines = await walk(absRoot, 1, "", true);
  return [rootName + "/", ...lines].join("\n");
}

// ../autocompletion/v2/CodeContext.ts
var CodeContext = class {
  _options;
  logger;
  get options() {
    return this._options;
  }
  constructor(options, logger) {
    this._options = {
      numLinesAsContext: 128,
      numLinesAsContextSuffix: 32,
      numImplementContexts: 3
    };
    this.logger = logger?.with("[CodeContext]") || Logger.getDefaultLogger().with("[CodeContext]");
    try {
      if (options && typeof options === "object") {
        for (const key in options) {
          if (options[key] === void 0) {
            throw new Error(`Option ${key} is not defined`);
          }
          this._options[key] = options[key];
        }
      }
    } catch (error) {
      this.logger.error(`Error checking options: ${error}, using default options`);
    }
  }
  async capture(codeText, file) {
    const languageParsers = await loadRequiredLanguageParsers([file.filePath]);
    const languageParser = languageParsers[file.fileExtension];
    if (!languageParser) {
      this.logger.warn(`No languageParser available for extension: ${file.fileExtension}`);
      return null;
    }
    const parser = languageParser.parser;
    const query = languageParser.query;
    if (!parser || !query) {
      this.logger.warn(`No parser or query available for extension: ${file.fileExtension}`);
      return null;
    }
    const tree = parser.parse(codeText);
    this.logger.info(`Successfully parsed AST for: ${path4.basename(file.filePath)}`);
    const captures = query.captures(tree.rootNode);
    return captures;
  }
  async captureDependencies(codeText, file) {
    const queryText = dependenciesCapturesQueries[file.language];
    if (!queryText) {
      this.logger.warn(`No query available for extension: ${file.fileExtension}`);
      return null;
    }
    const languageParsers = await loadRequiredLanguageParsers([file.filePath]);
    const languageParser = languageParsers[file.fileExtension];
    if (!languageParser) {
      this.logger.warn(`No languageParser available for extension: ${file.fileExtension}`);
      return null;
    }
    const parser = languageParser.parser;
    const query = parser.getLanguage().query(queryText);
    if (!parser || !query) {
      this.logger.warn(`No parser or query available for extension: ${file.fileExtension}`);
      return null;
    }
    const tree = parser.parse(codeText);
    this.logger.info(`Successfully parsed AST for: ${path4.basename(file.filePath)}`);
    const captures = query.captures(tree.rootNode);
    return captures;
  }
  /**
   * 切分代码为 CodeSnippets
   * 使用 tree-sitter 进行语义切分，提取完整的函数、类、方法等定义
   */
  async chunk(codeText, options) {
    const { file, snippetTypes = [], maxSnippetLines = 50, minSnippetLines = 3 } = options;
    const codeSnippets = new CodeSnippets();
    try {
      const fileHash = this.calculateFileHash(codeText);
      if (!this.isSupportedLanguage(file.language)) {
        if (file.language === "unknown" /* Unknown */) {
          this.logger.info(`Language ${file.language} not supported now`);
        } else {
          this.logger.warn(`Language ${file.language} not supported now`);
        }
        return codeSnippets;
      }
      const captures = await this.capture(codeText, file);
      if (!captures || captures.length === 0) {
        this.logger.warn(`No captures found`);
        return codeSnippets;
      }
      const extractSnippetsFromCapturesFunc = extractSnippetsFromCaptures[file.language];
      try {
        if (!extractSnippetsFromCapturesFunc) {
          this.logger.info(`No extractSnippetsFromCapturesFunc available for language: ${file.language}`);
          return codeSnippets;
        }
        const snippets = await extractSnippetsFromCapturesFunc(
          captures,
          codeText,
          file.filePath,
          fileHash,
          snippetTypes,
          {
            maxSnippetLines,
            minSnippetLines
          }
        );
        this.logger.info(`Extracted ${snippets.length} snippets total`);
        if (snippets && snippets.length > 0) {
          await codeSnippets.insert(snippets);
        }
      } catch (error) {
        this.logger.warn(`Error extracting snippets for ${file.filePath}:`, error);
      }
      return codeSnippets;
    } catch (error) {
      this.logger.error(`Error parsing AST for ${file.filePath}:`, error);
      return codeSnippets;
    }
  }
  async extractDependencies(codeText, file) {
    const captures = await this.captureDependencies(codeText, file);
    if (!captures || captures.length === 0) {
      this.logger.warn(`No captures found`);
      return [];
    }
    const processor = dependenciesProcessors[file.language];
    if (!processor) {
      this.logger.warn(`No processor available for language: ${file.language}`);
      return [];
    }
    try {
      const dependencies = processor(captures);
      if (!dependencies || dependencies.length === 0) {
        this.logger.warn(`No dependencies found`);
        return [];
      }
      return dependencies;
    } catch (error) {
      this.logger.warn(`Error extracting dependencies for ${file.filePath}:`, error);
      return [];
    }
  }
  /**
   * 索引文件集合，提取所有文件的代码片段
   */
  async index(codeFiles, options) {
    const { maxSnippetLines = 50, minSnippetLines = 3, snippetTypes = [], includeFileTypes = [] } = options || {};
    const allSnippets = new CodeSnippets();
    this.logger.info(`Indexing ${codeFiles.files?.length || 0} files`);
    const indexPromises = (codeFiles.files || []).map(async (fileMeta) => {
      try {
        const fileExtension = path4.extname(fileMeta.filePath).toLowerCase().slice(1);
        if (!includeFileTypes.includes(fileExtension)) {
          return new CodeSnippets();
        }
        const content = await fileMeta.read?.();
        if (!content) {
          this.logger.warn(`Could not read content for file: ${fileMeta.filePath}`);
          return new CodeSnippets();
        }
        const fileSnippets = await this.chunk(content, {
          file: fileMeta,
          snippetTypes,
          maxSnippetLines,
          minSnippetLines
        });
        this.logger.info(
          `Indexed ${fileSnippets.snippets.length} snippets from ${path4.basename(fileMeta.filePath)}`
        );
        return fileSnippets;
      } catch (error) {
        this.logger.error(`Error indexing file ${fileMeta.filePath}:`, error);
        return new CodeSnippets();
      }
    });
    const fileSnippetsArray = await Promise.all(indexPromises);
    for (const fileSnippets of fileSnippetsArray) {
      await allSnippets.merge(fileSnippets);
    }
    this.logger.info(`Total indexed snippets: ${allSnippets.snippets.length}`);
    return allSnippets;
  }
  async getFunctionOrMethodSurroundingCursor(codeSnippets, cursorPosition, file) {
    const snippets = await codeSnippets.filter((snippet) => {
      return cursorPosition.row >= snippet.startLine && cursorPosition.row <= snippet.endLine;
    });
    if (!snippets || snippets.snippets.length === 0) {
      this.logger.warn(`No snippets found for file: ${file.filePath}`);
      return null;
    }
    return snippets.snippets[0];
  }
  /**
   * 检索与当前位置相关的代码片段 - 智能上下文策略
   */
  /**
   * 检索与当前位置相关的代码片段 - 使用 capture 机制，直接返回文件原文
   */
  async retriveRelates(codeText, line, column, file, globalContext) {
    const relatedSnippets = new CodeSnippets();
    if (!globalContext) {
      this.logger.warn(`No global context provided`);
      return relatedSnippets;
    }
    this.logger.info(`Retrieving related snippets for line ${line}, column ${column}`);
    const functionOrMethod = await this.getFunctionOrMethodSurroundingCursor(
      globalContext,
      { row: line, column },
      file
    );
    if (!functionOrMethod) {
      this.logger.warn(`No function or method found for line ${line}, column ${column}`);
      return relatedSnippets;
    }
    if (!functionOrMethod.implementText) {
      this.logger.warn(`No implementText available for function or method: ${functionOrMethod.name}`);
      return relatedSnippets;
    }
    const dependencies = await this.extractDependencies(functionOrMethod.implementText, file);
    if (!dependencies || dependencies.length === 0) {
      this.logger.warn(`No dependencies found`);
      return relatedSnippets;
    }
    let relatedSnippetsWithDependencies = [];
    dependencies.sort((a, b) => {
      return Math.abs(functionOrMethod.startLine + a.startLine - line) - Math.abs(functionOrMethod.startLine + b.startLine - line);
    });
    for (const dependency of dependencies) {
      if (relatedSnippetsWithDependencies.length >= this.options.numImplementContexts) {
        break;
      }
      relatedSnippetsWithDependencies = relatedSnippetsWithDependencies.concat(
        await globalContext.find({
          filePath: file.filePath,
          name: dependency.name,
          type: dependency.type,
          field: dependency.field
        })
      );
    }
    await relatedSnippets.insert(relatedSnippetsWithDependencies);
    return relatedSnippets;
  }
  /**
   * 后处理 LLM 生成的补全文本
   * 使用 getStringBeforeCloseSymbol 处理符号闭合
   */
  postprocess(completion, options) {
    if (!completion || completion.trim() === "") {
      return "";
    }
    this.logger.info(`Postprocessing completion: "${completion.substring(0, 100)}..."`);
    let processedCompletion = completion;
    processedCompletion = processedCompletion.trimEnd();
    if (options && options.modelType === "qwen" /* Qwen */) {
      let { closeSymbol, suffixPrefix } = findFirstMatchingCloseSymbol(options.prompt, "<|fim_suffix|>");
      processedCompletion = postProcessCompletionSynthesis(
        processedCompletion,
        options.prefix,
        options.suffix,
        closeSymbol,
        suffixPrefix
      );
    }
    this.logger.info(`Postprocessed result: "${processedCompletion.substring(0, 100)}..."`);
    return processedCompletion;
  }
  /**
   * 获取代码补全所需的完整上下文
   */
  async getCompletionContext(documentInfo, positionInfo, globalContext) {
    this.logger.info(
      `Getting completion context for line ${positionInfo.line}, character ${positionInfo.character}`
    );
    const { prefix, suffix } = await this.getCurrentContext(documentInfo, positionInfo);
    this.logger.info(`Prefix: "${prefix.substring(prefix.length - 50)}..."`);
    this.logger.info(`Suffix: "${suffix.substring(0, 50)}..."`);
    const generateOverViewFromSnippetsFunc = generateOverViewFromSnippets[documentInfo.file.language];
    let overview = void 0;
    if (typeof generateOverViewFromSnippetsFunc === "function" && documentInfo.file.snippetMetas) {
      overview = generateOverViewFromSnippetsFunc(documentInfo.file.snippetMetas || []);
    }
    const relatedSnippets = await this.retriveRelates(
      documentInfo.content,
      positionInfo.line + 1,
      // 转换为 1-based
      positionInfo.character,
      documentInfo.file,
      globalContext
    );
    this.logger.info(`Found ${relatedSnippets.snippets.length} related snippets`);
    return {
      prefix,
      suffix,
      snippets: relatedSnippets.snippets,
      overview,
      filePath: documentInfo.file.filePath,
      fileHash: documentInfo.file.fileHash,
      gitUrl: ""
    };
  }
  /**
   * 预处理上下文 - 输出3个字符串
   */
  async preprocess(completionContext, options) {
    if (isInsideWord(completionContext.prefix, completionContext.suffix, (msg) => this.logger.info(msg))) {
      return {
        prefix: completionContext.prefix,
        suffix: completionContext.suffix,
        extraContexts: [],
        shouldSkipCompletion: false
      };
    }
    const extraContexts = [];
    const recentOpenFiles = options.recentOpenFiles.filter((file) => file.language === options.codeFile.language).map((file) => file.filePath);
    if (options.codeFile.projectRoot) {
      try {
        const treeViewText = await treeView(options.codeFile.projectRoot, recentOpenFiles, 10, 10);
        extraContexts.push({
          type: "RepoTreeView" /* RepoTreeView */,
          content: `## Repo Tree View
${treeViewText}`
        });
      } catch (error) {
        this.logger.warn(`Error getting repo tree view: ${error}`);
      }
    }
    extraContexts.push({
      type: "FileInfo" /* FileInfo */,
      content: `## Description
	This is a ${options.codeFile.language} file.`
    });
    if (completionContext.overview) {
      extraContexts.push({
        type: "FileCodeOverview" /* FileCodeOverview */,
        content: `## File Overview
${completionContext.overview}`
      });
    }
    if (completionContext.snippets.length > 0) {
      extraContexts.push({
        type: "RelatedFunctionDefinition" /* RelatedFunctionDefinition */,
        content: `## Related Function Definitions
${completionContext.snippets.map((snippet) => snippet.definitionText).join("\n")}`
      });
    }
    if (this.options.numImplementContexts > 0 && completionContext.snippets.length > 0) {
      extraContexts.push({
        type: "RelatedFuntionImplement" /* RelatedFuntionImplement */,
        content: `## Related Function Implementations
${completionContext.snippets.map((snippet) => snippet.implementText).join("\n")}`
      });
    }
    if (options.recentOpenFiles && options.recentOpenFiles.length > 0) {
      const sameLanguageFiles = options.recentOpenFiles.filter(
        (file) => file.language === options.codeFile.language && file.filePath !== options.codeFile.filePath
      );
      if (sameLanguageFiles.length > 0) {
        const symbolOverviews = [];
        for (const file of sameLanguageFiles) {
          if (file.snippetMetas && file.snippetMetas.length > 0) {
            const generateOverViewFunc = generateOverViewFromSnippets[file.language];
            if (typeof generateOverViewFunc === "function") {
              const overview = generateOverViewFunc(file.snippetMetas);
              if (overview.trim()) {
                symbolOverviews.push(`### ${file.filePath}
${overview}`);
              }
            }
          }
        }
        if (symbolOverviews.length > 0) {
          extraContexts.push({
            type: "RelatedFunctionDefinition" /* RelatedFunctionDefinition */,
            content: `## Open Tabs Symbol Overview
${symbolOverviews.join("\n\n")}`
          });
        }
      }
    }
    extraContexts.push({
      type: "EndContextPrompt" /* EndContextPrompt */,
      content: `## Recent Open Files
${recentOpenFiles.join(", ")}

 End of Context, Above is the context of the current file. You are editing the file at line ${options.editCursor.line}, character ${options.editCursor.character}, Starting Coding.`
    });
    for (const extraContext of extraContexts) {
      extraContext.content = formatCodeWithLanguageWithLineComment(
        extraContext.content,
        options.codeFile.language
      );
    }
    return {
      prefix: completionContext.prefix,
      suffix: completionContext.suffix,
      extraContexts,
      shouldSkipCompletion: false
    };
  }
  /**
   * 获取当前光标位置的上下文 - 基于函数级别而非行級別
   */
  async getCurrentContext(documentInfo, positionInfo) {
    const currentFunction = documentInfo.file.snippetMetas?.filter((snippet) => {
      if (snippet.startLine && snippet.endLine) {
        return positionInfo.line >= snippet.startLine && positionInfo.line <= snippet.endLine;
      }
      return false;
    })[0];
    if (currentFunction) {
      this.logger.info(
        `Found function: ${currentFunction.name} at lines ${currentFunction.startLine}-${currentFunction.endLine}`
      );
      if (!currentFunction.implementText) {
        this.logger.warn(`No implementText available for function: ${currentFunction.name}`);
        return this.getSurroundingCodeContextSimple(documentInfo, positionInfo);
      }
      const originalTextLines = documentInfo.content.split("\n");
      let startLine = Math.max(1, currentFunction.startLine);
      const functionLines = currentFunction.implementText.split("\n");
      let endLine = Math.min(startLine + functionLines.length, documentInfo.lineCount);
      const remainsLinesCount = this.options.numLinesAsContext - (endLine - startLine);
      if (remainsLinesCount > 0) {
        const halfRemainsLinesCount = Math.floor(remainsLinesCount / 2);
        startLine = Math.max(1, startLine - halfRemainsLinesCount);
        endLine = Math.min(documentInfo.lineCount, endLine + halfRemainsLinesCount);
      }
      const startIndex = startLine - 1;
      const endIndex = endLine - 1;
      if (startIndex < 0 || startIndex > originalTextLines.length || endIndex < 0 || endIndex > originalTextLines.length) {
        this.logger.warn(`Invalid startIndex or endIndex: ${startIndex}, ${endIndex}`);
        return this.getSurroundingCodeContextSimple(documentInfo, positionInfo);
      }
      let prefix = originalTextLines.slice(startIndex, positionInfo.line).join("\n");
      let suffix = "";
      if (positionInfo.line < originalTextLines.length) {
        suffix = originalTextLines[positionInfo.line].substring(positionInfo.character) + "\n" + originalTextLines.slice(positionInfo.line + 1, endIndex + 1).join("\n");
      }
      if (positionInfo.line >= 0 && positionInfo.line < originalTextLines.length) {
        prefix += "\n" + originalTextLines[positionInfo.line].substring(0, positionInfo.character);
      }
      this.logger.info(`Function-level context - Prefix: ${prefix.length} chars, Suffix: ${suffix.length} chars`);
      return { prefix, suffix };
    } else {
      this.logger.info(`No function found at position, using line-level context`);
      return this.getSurroundingCodeContextSimple(documentInfo, positionInfo);
    }
  }
  isSimpleContextEnough(documentInfo, positionInfo) {
    const { startLine, endLine } = this.getSurroundingCodeContextSimpleStartAndEnd(documentInfo, positionInfo);
    return startLine <= 0 && endLine >= documentInfo.lineCount - 1;
  }
  getSurroundingCodeContextSimpleStartAndEnd(documentInfo, positionInfo) {
    const line = positionInfo.line;
    const startLine = Math.max(0, line - this.options.numLinesAsContext);
    const endLine = Math.min(documentInfo.lineCount - 1, line + this.options.numLinesAsContextSuffix);
    return { startLine, endLine };
  }
  getSurroundingCodeContextSimple(documentInfo, positionInfo) {
    const line = positionInfo.line;
    const { startLine, endLine } = this.getSurroundingCodeContextSimpleStartAndEnd(documentInfo, positionInfo);
    const lines = documentInfo.content.split("\n");
    let prefix = lines.slice(startLine, line).join("\n");
    let suffix = "";
    if (line < lines.length) {
      suffix = lines[line].substring(positionInfo.character) + "\n" + lines.slice(line + 1, endLine).join("\n");
    }
    if (line >= 0 && line < lines.length) {
      prefix += "\n" + lines[line].substring(0, positionInfo.character);
    }
    return { prefix, suffix };
  }
  // ==================== 辅助方法 ====================
  calculateFileHash(content) {
    return crypto3.createHash("md5").update(content).digest("hex");
  }
  isSupportedLanguage(language) {
    return CodeLanguageTypeSupport.includes(language);
  }
};

// cli.ts
var { program } = require_commander();
var codeContext = new CodeContext();
function getExtension(filePath) {
  return filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length);
}
async function index(codeFiles, maxSnippetLines) {
  const maxLines = maxSnippetLines || 100;
  const allSnippets = new CodeSnippets();
  const indexPromises = codeFiles.files.map(async (file) => {
    try {
      if (file.language === void 0 || !Object.values(CodeLanguageType).includes(file.language)) {
        console.log(`Unsupported language: ${file.language}`);
        return new CodeSnippets();
      }
      const content = file.content;
      if (!content) {
        console.log(`Content is empty for file: ${file.filePath}`);
        return new CodeSnippets();
      }
      file.fileExtension = getExtension(file.filePath);
      const fileSnippets = await codeContext.chunk(content, {
        file,
        maxSnippetLines: maxLines,
        snippetTypes: [
          "function_or_method" /* FunctionOrMethod */,
          "class_or_interface_or_struct" /* ClassOrInterfaceOrStructOrEnum */,
          "variable_or_constant" /* VariableOrConstant */,
          "import_or_include" /* ImportOrInclude */
        ]
      });
      return fileSnippets;
    } catch (error) {
      return new CodeSnippets();
    }
  });
  const fileSnippetsArray = await Promise.all(indexPromises);
  for (const fileSnippets of fileSnippetsArray) {
    await allSnippets.merge(fileSnippets);
  }
  return allSnippets;
}
program.command("index <input> ").option("-m <number>", "--maxlines <number>", "Maximum number of lines for each snippet").description("Index the given files.").action(async (input, cmd) => {
  const codeFiles = { files: JSON.parse(input) };
  const indexResult = await index(
    codeFiles,
    cmd.maxlines ? parseInt(cmd.maxlines, 10) : void 0
  );
  console.log(`${JSON.stringify(indexResult.getSnippets(), null, 2)}`);
});
program.parse(process.argv);
//# sourceMappingURL=cli.cjs.map
