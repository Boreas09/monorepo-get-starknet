var te = Object.defineProperty;
var re = (t, e, r) => e in t ? te(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var O = (t, e, r) => (re(t, typeof e != "symbol" ? e + "" : e, r), r), K = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
};
var S = (t, e, r) => (K(t, e, "read from private field"), r ? r.call(t) : e.get(t)), C = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, F = (t, e, r, n) => (K(t, e, "write to private field"), n ? n.call(t, r) : e.set(t, r), r);
var j = (t, e, r) => (K(t, e, "access private method"), r);
const generateUID = () => `${Date.now()}-${Math.floor(Math.random() * 8999999999999) + 1e12}`, shuffle = (t) => {
  for (let e = t.length - 1; e > 0; e--) {
    const r = Math.floor(Math.random() * (e + 1));
    [t[e], t[r]] = [t[r], t[e]];
  }
  return t;
}, pipe$1 = (...t) => (e) => t.reduce((r, n) => r.then(n), Promise.resolve(e));
function ensureKeysArray(t) {
  return Object.keys(t);
}
const ssrSafeWindow = typeof window < "u" ? window : null;
function getBuilderId() {
  return typeof FEDERATION_BUILD_IDENTIFIER < "u" ? FEDERATION_BUILD_IDENTIFIER : "";
}
function isDebugMode$1() {
  return Boolean("");
}
function isBrowserEnv$1() {
  return typeof window < "u";
}
const LOG_CATEGORY$1 = "[ Federation Runtime ]";
function assert(t, e) {
  t || error(e);
}
function error(t) {
  throw t instanceof Error ? (t.message = `${LOG_CATEGORY$1}: ${t.message}`, t) : new Error(`${LOG_CATEGORY$1}: ${t}`);
}
function warn$1(t) {
  t instanceof Error ? (t.message = `${LOG_CATEGORY$1}: ${t.message}`, console.warn(t)) : console.warn(`${LOG_CATEGORY$1}: ${t}`);
}
function addUniqueItem(t, e) {
  return t.findIndex((r) => r === e) === -1 && t.push(e), t;
}
function getFMId(t) {
  return "version" in t && t.version ? `${t.name}:${t.version}` : "entry" in t && t.entry ? `${t.name}:${t.entry}` : `${t.name}`;
}
function isRemoteInfoWithEntry(t) {
  return typeof t.entry < "u";
}
function isPureRemoteEntry(t) {
  return !t.entry.includes(".json") && t.entry.includes(".js");
}
function safeToString$1(t) {
  try {
    return JSON.stringify(t, null, 2);
  } catch {
    return "";
  }
}
function isObject(t) {
  return t && typeof t == "object";
}
const objectToString = Object.prototype.toString;
function isPlainObject(t) {
  return objectToString.call(t) === "[object Object]";
}
function arrayOptions(t) {
  return Array.isArray(t) ? t : [
    t
  ];
}
function _extends$1$1() {
  return _extends$1$1 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$1$1.apply(this, arguments);
}
function _object_without_properties_loose$1(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), o, s;
  for (s = 0; s < n.length; s++)
    o = n[s], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r;
}
const nativeGlobal = (() => {
  try {
    return new Function("return this")();
  } catch {
    return globalThis;
  }
})(), Global = nativeGlobal;
function definePropertyGlobalVal(t, e, r) {
  Object.defineProperty(t, e, {
    value: r,
    configurable: !1,
    writable: !0
  });
}
function includeOwnProperty(t, e) {
  return Object.hasOwnProperty.call(t, e);
}
includeOwnProperty(globalThis, "__GLOBAL_LOADING_REMOTE_ENTRY__") || definePropertyGlobalVal(globalThis, "__GLOBAL_LOADING_REMOTE_ENTRY__", {});
const globalLoading = globalThis.__GLOBAL_LOADING_REMOTE_ENTRY__;
function setGlobalDefaultVal(t) {
  var e, r, n, o, s, i;
  includeOwnProperty(t, "__VMOK__") && !includeOwnProperty(t, "__FEDERATION__") && definePropertyGlobalVal(t, "__FEDERATION__", t.__VMOK__), includeOwnProperty(t, "__FEDERATION__") || (definePropertyGlobalVal(t, "__FEDERATION__", {
    __GLOBAL_PLUGIN__: [],
    __INSTANCES__: [],
    moduleInfo: {},
    __SHARE__: {},
    __MANIFEST_LOADING__: {},
    __PRELOADED_MAP__: /* @__PURE__ */ new Map()
  }), definePropertyGlobalVal(t, "__VMOK__", t.__FEDERATION__));
  var l;
  (l = (e = t.__FEDERATION__).__GLOBAL_PLUGIN__) != null || (e.__GLOBAL_PLUGIN__ = []);
  var c;
  (c = (r = t.__FEDERATION__).__INSTANCES__) != null || (r.__INSTANCES__ = []);
  var a;
  (a = (n = t.__FEDERATION__).moduleInfo) != null || (n.moduleInfo = {});
  var d;
  (d = (o = t.__FEDERATION__).__SHARE__) != null || (o.__SHARE__ = {});
  var u;
  (u = (s = t.__FEDERATION__).__MANIFEST_LOADING__) != null || (s.__MANIFEST_LOADING__ = {});
  var h;
  (h = (i = t.__FEDERATION__).__PRELOADED_MAP__) != null || (i.__PRELOADED_MAP__ = /* @__PURE__ */ new Map());
}
setGlobalDefaultVal(globalThis);
setGlobalDefaultVal(nativeGlobal);
function getGlobalFederationInstance(t, e) {
  const r = getBuilderId();
  return globalThis.__FEDERATION__.__INSTANCES__.find((n) => !!(r && n.options.id === getBuilderId() || n.options.name === t && !n.options.version && !e || n.options.name === t && e && n.options.version === e));
}
function setGlobalFederationInstance(t) {
  globalThis.__FEDERATION__.__INSTANCES__.push(t);
}
function getGlobalFederationConstructor() {
  return globalThis.__FEDERATION__.__DEBUG_CONSTRUCTOR__;
}
function setGlobalFederationConstructor(t, e = isDebugMode$1()) {
  e && (globalThis.__FEDERATION__.__DEBUG_CONSTRUCTOR__ = t, globalThis.__FEDERATION__.__DEBUG_CONSTRUCTOR_VERSION__ = "0.1.21");
}
function getInfoWithoutType(t, e) {
  if (typeof e == "string") {
    if (t[e])
      return {
        value: t[e],
        key: e
      };
    {
      const n = Object.keys(t);
      for (const o of n) {
        const [s, i] = o.split(":"), l = `${s}:${e}`, c = t[l];
        if (c)
          return {
            value: c,
            key: l
          };
      }
      return {
        value: void 0,
        key: e
      };
    }
  } else
    throw new Error("key must be string");
}
const getGlobalSnapshot = () => nativeGlobal.__FEDERATION__.moduleInfo, getTargetSnapshotInfoByModuleInfo = (t, e) => {
  const r = getFMId(t), n = getInfoWithoutType(e, r).value;
  if (n && !n.version && "version" in t && t.version && (n.version = t.version), n)
    return n;
  if ("version" in t && t.version) {
    const { version: o } = t, s = _object_without_properties_loose$1(t, [
      "version"
    ]), i = getFMId(s), l = getInfoWithoutType(nativeGlobal.__FEDERATION__.moduleInfo, i).value;
    if ((l == null ? void 0 : l.version) === o)
      return l;
  }
}, getGlobalSnapshotInfoByModuleInfo = (t) => getTargetSnapshotInfoByModuleInfo(t, nativeGlobal.__FEDERATION__.moduleInfo), setGlobalSnapshotInfoByModuleInfo = (t, e) => {
  const r = getFMId(t);
  return nativeGlobal.__FEDERATION__.moduleInfo[r] = e, nativeGlobal.__FEDERATION__.moduleInfo;
}, addGlobalSnapshot = (t) => (nativeGlobal.__FEDERATION__.moduleInfo = _extends$1$1({}, nativeGlobal.__FEDERATION__.moduleInfo, t), () => {
  const e = Object.keys(t);
  for (const r of e)
    delete nativeGlobal.__FEDERATION__.moduleInfo[r];
}), getRemoteEntryExports = (t, e) => {
  const r = e || `__FEDERATION_${t}:custom__`, n = globalThis[r];
  return {
    remoteEntryKey: r,
    entryExports: n
  };
}, getGlobalHostPlugins = () => nativeGlobal.__FEDERATION__.__GLOBAL_PLUGIN__, getPreloaded = (t) => globalThis.__FEDERATION__.__PRELOADED_MAP__.get(t), setPreloaded = (t) => globalThis.__FEDERATION__.__PRELOADED_MAP__.set(t, !0), DEFAULT_SCOPE = "default", DEFAULT_REMOTE_TYPE = "global", buildIdentifier = "[0-9A-Za-z-]+", build = `(?:\\+(${buildIdentifier}(?:\\.${buildIdentifier})*))`, numericIdentifier = "0|[1-9]\\d*", numericIdentifierLoose = "[0-9]+", nonNumericIdentifier = "\\d*[a-zA-Z-][a-zA-Z0-9-]*", preReleaseIdentifierLoose = `(?:${numericIdentifierLoose}|${nonNumericIdentifier})`, preReleaseLoose = `(?:-?(${preReleaseIdentifierLoose}(?:\\.${preReleaseIdentifierLoose})*))`, preReleaseIdentifier = `(?:${numericIdentifier}|${nonNumericIdentifier})`, preRelease = `(?:-(${preReleaseIdentifier}(?:\\.${preReleaseIdentifier})*))`, xRangeIdentifier = `${numericIdentifier}|x|X|\\*`, xRangePlain = `[v=\\s]*(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:\\.(${xRangeIdentifier})(?:${preRelease})?${build}?)?)?`, hyphenRange = `^\\s*(${xRangePlain})\\s+-\\s+(${xRangePlain})\\s*$`, mainVersionLoose = `(${numericIdentifierLoose})\\.(${numericIdentifierLoose})\\.(${numericIdentifierLoose})`, loosePlain = `[v=\\s]*${mainVersionLoose}${preReleaseLoose}?${build}?`, gtlt = "((?:<|>)?=?)", comparatorTrim = `(\\s*)${gtlt}\\s*(${loosePlain}|${xRangePlain})`, loneTilde = "(?:~>?)", tildeTrim = `(\\s*)${loneTilde}\\s+`, loneCaret = "(?:\\^)", caretTrim = `(\\s*)${loneCaret}\\s+`, star = "(<|>)?=?\\s*\\*", caret = `^${loneCaret}${xRangePlain}$`, mainVersion = `(${numericIdentifier})\\.(${numericIdentifier})\\.(${numericIdentifier})`, fullPlain = `v?${mainVersion}${preRelease}?${build}?`, tilde = `^${loneTilde}${xRangePlain}$`, xRange = `^${gtlt}\\s*${xRangePlain}$`, comparator = `^${gtlt}\\s*(${fullPlain})$|^$`, gte0 = "^\\s*>=\\s*0.0.0\\s*$";
function parseRegex(t) {
  return new RegExp(t);
}
function isXVersion(t) {
  return !t || t.toLowerCase() === "x" || t === "*";
}
function pipe(...t) {
  return (e) => t.reduce((r, n) => n(r), e);
}
function extractComparator(t) {
  return t.match(parseRegex(comparator));
}
function combineVersion(t, e, r, n) {
  const o = `${t}.${e}.${r}`;
  return n ? `${o}-${n}` : o;
}
function parseHyphen(t) {
  return t.replace(parseRegex(hyphenRange), (e, r, n, o, s, i, l, c, a, d, u, h) => (isXVersion(n) ? r = "" : isXVersion(o) ? r = `>=${n}.0.0` : isXVersion(s) ? r = `>=${n}.${o}.0` : r = `>=${r}`, isXVersion(a) ? c = "" : isXVersion(d) ? c = `<${Number(a) + 1}.0.0-0` : isXVersion(u) ? c = `<${a}.${Number(d) + 1}.0-0` : h ? c = `<=${a}.${d}.${u}-${h}` : c = `<=${c}`, `${r} ${c}`.trim()));
}
function parseComparatorTrim(t) {
  return t.replace(parseRegex(comparatorTrim), "$1$2$3");
}
function parseTildeTrim(t) {
  return t.replace(parseRegex(tildeTrim), "$1~");
}
function parseCaretTrim(t) {
  return t.replace(parseRegex(caretTrim), "$1^");
}
function parseCarets(t) {
  return t.trim().split(/\s+/).map((e) => e.replace(parseRegex(caret), (r, n, o, s, i) => isXVersion(n) ? "" : isXVersion(o) ? `>=${n}.0.0 <${Number(n) + 1}.0.0-0` : isXVersion(s) ? n === "0" ? `>=${n}.${o}.0 <${n}.${Number(o) + 1}.0-0` : `>=${n}.${o}.0 <${Number(n) + 1}.0.0-0` : i ? n === "0" ? o === "0" ? `>=${n}.${o}.${s}-${i} <${n}.${o}.${Number(s) + 1}-0` : `>=${n}.${o}.${s}-${i} <${n}.${Number(o) + 1}.0-0` : `>=${n}.${o}.${s}-${i} <${Number(n) + 1}.0.0-0` : n === "0" ? o === "0" ? `>=${n}.${o}.${s} <${n}.${o}.${Number(s) + 1}-0` : `>=${n}.${o}.${s} <${n}.${Number(o) + 1}.0-0` : `>=${n}.${o}.${s} <${Number(n) + 1}.0.0-0`)).join(" ");
}
function parseTildes(t) {
  return t.trim().split(/\s+/).map((e) => e.replace(parseRegex(tilde), (r, n, o, s, i) => isXVersion(n) ? "" : isXVersion(o) ? `>=${n}.0.0 <${Number(n) + 1}.0.0-0` : isXVersion(s) ? `>=${n}.${o}.0 <${n}.${Number(o) + 1}.0-0` : i ? `>=${n}.${o}.${s}-${i} <${n}.${Number(o) + 1}.0-0` : `>=${n}.${o}.${s} <${n}.${Number(o) + 1}.0-0`)).join(" ");
}
function parseXRanges(t) {
  return t.split(/\s+/).map((e) => e.trim().replace(parseRegex(xRange), (r, n, o, s, i, l) => {
    const c = isXVersion(o), a = c || isXVersion(s), d = a || isXVersion(i);
    return n === "=" && d && (n = ""), l = "", c ? n === ">" || n === "<" ? "<0.0.0-0" : "*" : n && d ? (a && (s = 0), i = 0, n === ">" ? (n = ">=", a ? (o = Number(o) + 1, s = 0, i = 0) : (s = Number(s) + 1, i = 0)) : n === "<=" && (n = "<", a ? o = Number(o) + 1 : s = Number(s) + 1), n === "<" && (l = "-0"), `${n + o}.${s}.${i}${l}`) : a ? `>=${o}.0.0${l} <${Number(o) + 1}.0.0-0` : d ? `>=${o}.${s}.0${l} <${o}.${Number(s) + 1}.0-0` : r;
  })).join(" ");
}
function parseStar(t) {
  return t.trim().replace(parseRegex(star), "");
}
function parseGTE0(t) {
  return t.trim().replace(parseRegex(gte0), "");
}
function compareAtom(t, e) {
  return t = Number(t) || t, e = Number(e) || e, t > e ? 1 : t === e ? 0 : -1;
}
function comparePreRelease(t, e) {
  const { preRelease: r } = t, { preRelease: n } = e;
  if (r === void 0 && Boolean(n))
    return 1;
  if (Boolean(r) && n === void 0)
    return -1;
  if (r === void 0 && n === void 0)
    return 0;
  for (let o = 0, s = r.length; o <= s; o++) {
    const i = r[o], l = n[o];
    if (i !== l)
      return i === void 0 && l === void 0 ? 0 : i ? l ? compareAtom(i, l) : -1 : 1;
  }
  return 0;
}
function compareVersion(t, e) {
  return compareAtom(t.major, e.major) || compareAtom(t.minor, e.minor) || compareAtom(t.patch, e.patch) || comparePreRelease(t, e);
}
function eq(t, e) {
  return t.version === e.version;
}
function compare(t, e) {
  switch (t.operator) {
    case "":
    case "=":
      return eq(t, e);
    case ">":
      return compareVersion(t, e) < 0;
    case ">=":
      return eq(t, e) || compareVersion(t, e) < 0;
    case "<":
      return compareVersion(t, e) > 0;
    case "<=":
      return eq(t, e) || compareVersion(t, e) > 0;
    case void 0:
      return !0;
    default:
      return !1;
  }
}
function parseComparatorString(t) {
  return pipe(
    parseCarets,
    parseTildes,
    parseXRanges,
    parseStar
  )(t);
}
function parseRange(t) {
  return pipe(
    parseHyphen,
    parseComparatorTrim,
    parseTildeTrim,
    parseCaretTrim
  )(t.trim()).split(/\s+/).join(" ");
}
function satisfy(t, e) {
  if (!t)
    return !1;
  const o = parseRange(e).split(" ").map((h) => parseComparatorString(h)).join(" ").split(/\s+/).map((h) => parseGTE0(h)), s = extractComparator(t);
  if (!s)
    return !1;
  const [, i, , l, c, a, d] = s, u = {
    operator: i,
    version: combineVersion(l, c, a, d),
    major: l,
    minor: c,
    patch: a,
    preRelease: d == null ? void 0 : d.split(".")
  };
  for (const h of o) {
    const g = extractComparator(h);
    if (!g)
      return !1;
    const [, m, , I, p, y, A] = g, M = {
      operator: m,
      version: combineVersion(I, p, y, A),
      major: I,
      minor: p,
      patch: y,
      preRelease: A == null ? void 0 : A.split(".")
    };
    if (!compare(M, u))
      return !1;
  }
  return !0;
}
function _extends$8() {
  return _extends$8 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$8.apply(this, arguments);
}
function formatShare(t, e, r) {
  let n;
  "get" in t ? n = t.get : "lib" in t ? n = () => Promise.resolve(t.lib) : n = () => Promise.resolve(() => {
    throw new Error(`Can not get shared '${r}'!`);
  });
  var o, s;
  return _extends$8({
    deps: [],
    useIn: [],
    from: e,
    loading: null
  }, t, {
    shareConfig: _extends$8({
      requiredVersion: `^${t.version}`,
      singleton: !1,
      eager: !1,
      strictVersion: !1
    }, t.shareConfig),
    get: n,
    loaded: "lib" in t ? !0 : void 0,
    version: (o = t.version) != null ? o : "0",
    scope: Array.isArray(t.scope) ? t.scope : [
      (s = t.scope) != null ? s : "default"
    ],
    strategy: t.strategy || "version-first"
  });
}
function formatShareConfigs(t, e) {
  const r = e.shared || {}, n = e.name, o = Object.keys(r).reduce((i, l) => {
    const c = arrayOptions(r[l]);
    return i[l] = i[l] || [], c.forEach((a) => {
      i[l].push(formatShare(a, n, l));
    }), i;
  }, {}), s = _extends$8({}, t.shared);
  return Object.keys(o).forEach((i) => {
    s[i] ? o[i].forEach((l) => {
      s[i].find((a) => a.version === l.version) || s[i].push(l);
    }) : s[i] = o[i];
  }), {
    shared: s,
    shareInfos: o
  };
}
function versionLt(t, e) {
  const r = (n) => {
    if (!Number.isNaN(Number(n))) {
      const s = n.split(".");
      let i = n;
      for (let l = 0; l < 3 - s.length; l++)
        i += ".0";
      return i;
    }
    return n;
  };
  return !!satisfy(r(t), `<=${r(e)}`);
}
const findVersion = (t, e) => {
  const r = e || function(n, o) {
    return versionLt(n, o);
  };
  return Object.keys(t).reduce((n, o) => !n || r(n, o) || n === "0" ? o : n, 0);
}, isLoaded = (t) => Boolean(t.loaded) || typeof t.lib == "function";
function findSingletonVersionOrderByVersion(t, e, r) {
  const n = t[e][r], o = function(s, i) {
    return !isLoaded(n[s]) && versionLt(s, i);
  };
  return findVersion(t[e][r], o);
}
function findSingletonVersionOrderByLoaded(t, e, r) {
  const n = t[e][r], o = function(s, i) {
    return isLoaded(n[i]) ? isLoaded(n[s]) ? Boolean(versionLt(s, i)) : !0 : isLoaded(n[s]) ? !1 : versionLt(s, i);
  };
  return findVersion(t[e][r], o);
}
function getFindShareFunction(t) {
  return t === "loaded-first" ? findSingletonVersionOrderByLoaded : findSingletonVersionOrderByVersion;
}
function getRegisteredShare(t, e, r, n) {
  if (!t)
    return;
  const { shareConfig: o, scope: s = DEFAULT_SCOPE, strategy: i } = r, l = Array.isArray(s) ? s : [
    s
  ];
  for (const c of l)
    if (o && t[c] && t[c][e]) {
      const { requiredVersion: a } = o, u = getFindShareFunction(i)(t, c, e), h = () => {
        if (o.singleton) {
          if (typeof a == "string" && !satisfy(u, a)) {
            const I = `Version ${u} from ${u && t[c][e][u].from} of shared singleton module ${e} does not satisfy the requirement of ${r.from} which needs ${a})`;
            o.strictVersion ? error(I) : warn$1(I);
          }
          return t[c][e][u];
        } else {
          if (a === !1 || a === "*" || satisfy(u, a))
            return t[c][e][u];
          for (const [I, p] of Object.entries(t[c][e]))
            if (satisfy(I, a))
              return p;
        }
      }, g = {
        shareScopeMap: t,
        scope: c,
        pkgName: e,
        version: u,
        GlobalFederation: Global.__FEDERATION__,
        resolver: h
      };
      return (n.emit(g) || g).resolver();
    }
}
function getGlobalShareScope() {
  return Global.__FEDERATION__.__SHARE__;
}
function getTargetSharedOptions(t) {
  const { pkgName: e, extraOptions: r, shareInfos: n } = t, o = (l) => {
    if (!l)
      return;
    const c = {};
    l.forEach((u) => {
      c[u.version] = u;
    });
    const d = findVersion(c, function(u, h) {
      return !isLoaded(c[u]) && versionLt(u, h);
    });
    return c[d];
  };
  var s;
  const i = (s = r == null ? void 0 : r.resolver) != null ? s : o;
  return Object.assign({}, i(n[e]), r == null ? void 0 : r.customShareInfo);
}
function _define_property$4(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
var MANIFEST_EXT = ".json", BROWSER_LOG_KEY = "FEDERATION_DEBUG", BROWSER_LOG_VALUE = "1", NameTransformSymbol = {
  AT: "@",
  HYPHEN: "-",
  SLASH: "/"
}, _obj, NameTransformMap = (_obj = {}, _define_property$4(_obj, NameTransformSymbol.AT, "scope_"), _define_property$4(_obj, NameTransformSymbol.HYPHEN, "_"), _define_property$4(_obj, NameTransformSymbol.SLASH, "__"), _obj), _obj1;
_obj1 = {}, _define_property$4(_obj1, NameTransformMap[NameTransformSymbol.AT], NameTransformSymbol.AT), _define_property$4(_obj1, NameTransformMap[NameTransformSymbol.HYPHEN], NameTransformSymbol.HYPHEN), _define_property$4(_obj1, NameTransformMap[NameTransformSymbol.SLASH], NameTransformSymbol.SLASH);
var SEPARATOR = ":";
function isBrowserEnv() {
  return typeof window < "u";
}
function isDebugMode() {
  return typeof process < "u" && process.env && process.env.FEDERATION_DEBUG ? Boolean(process.env.FEDERATION_DEBUG) : typeof FEDERATION_DEBUG < "u" && Boolean(FEDERATION_DEBUG);
}
function _array_like_to_array$2(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function _array_without_holes(t) {
  if (Array.isArray(t))
    return _array_like_to_array$2(t);
}
function _class_call_check(t, e) {
  if (!(t instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function _create_class(t, e, r) {
  return e && _defineProperties(t.prototype, e), r && _defineProperties(t, r), t;
}
function _define_property$3(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function _iterable_to_array$1(t) {
  if (typeof Symbol < "u" && t[Symbol.iterator] != null || t["@@iterator"] != null)
    return Array.from(t);
}
function _non_iterable_spread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _to_consumable_array(t) {
  return _array_without_holes(t) || _iterable_to_array$1(t) || _unsupported_iterable_to_array$2(t) || _non_iterable_spread();
}
function _unsupported_iterable_to_array$2(t, e) {
  if (!!t) {
    if (typeof t == "string")
      return _array_like_to_array$2(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return _array_like_to_array$2(t, e);
  }
}
function safeToString(t) {
  try {
    return JSON.stringify(t, null, 2);
  } catch {
    return "";
  }
}
var DEBUG_LOG = "[ FEDERATION DEBUG ]";
function safeGetLocalStorageItem() {
  try {
    if (typeof window < "u" && window.localStorage)
      return localStorage.getItem(BROWSER_LOG_KEY) === BROWSER_LOG_VALUE;
  } catch {
    return typeof document < "u";
  }
  return !1;
}
var Logger = /* @__PURE__ */ function() {
  function t(e) {
    _class_call_check(this, t), _define_property$3(this, "enable", !1), _define_property$3(this, "identifier", void 0), this.identifier = e || DEBUG_LOG, isBrowserEnv() && safeGetLocalStorageItem() ? this.enable = !0 : isDebugMode() && (this.enable = !0);
  }
  return _create_class(t, [
    {
      key: "info",
      value: function(e, r) {
        if (this.enable) {
          var n = safeToString(r) || "";
          isBrowserEnv() ? console.info("%c ".concat(this.identifier, ": ").concat(e, " ").concat(n), "color:#3300CC") : console.info("\x1B[34m%s", "".concat(this.identifier, ": ").concat(e, " ").concat(n ? `
`.concat(n) : ""));
        }
      }
    },
    {
      key: "logOriginalInfo",
      value: function() {
        for (var r = arguments.length, n = new Array(r), o = 0; o < r; o++)
          n[o] = arguments[o];
        if (this.enable)
          if (isBrowserEnv()) {
            var s;
            console.info("%c ".concat(this.identifier, ": OriginalInfo"), "color:#3300CC"), (s = console).log.apply(s, _to_consumable_array(n));
          } else {
            var i;
            console.info("%c ".concat(this.identifier, ": OriginalInfo"), "color:#3300CC"), (i = console).log.apply(i, _to_consumable_array(n));
          }
      }
    }
  ]), t;
}(), LOG_CATEGORY = "[ Federation Runtime ]";
new Logger();
var composeKeyWithSeparator = function() {
  for (var e = arguments.length, r = new Array(e), n = 0; n < e; n++)
    r[n] = arguments[n];
  return r.length ? r.reduce(function(o, s) {
    return s ? o ? "".concat(o).concat(SEPARATOR).concat(s) : s : o;
  }, "") : "";
}, getResourceUrl = function(t, e) {
  if ("getPublicPath" in t) {
    var r = new Function(t.getPublicPath)();
    return "".concat(r).concat(e);
  } else
    return "publicPath" in t ? "".concat(t.publicPath).concat(e) : (console.warn("Can not get resource url, if in debug mode, please ignore", t, e), "");
}, warn = function(t) {
  console.warn("".concat(LOG_CATEGORY, ": ").concat(t));
};
function _define_property$2(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function _object_spread$2(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(o) {
      return Object.getOwnPropertyDescriptor(r, o).enumerable;
    }))), n.forEach(function(o) {
      _define_property$2(t, o, r[o]);
    });
  }
  return t;
}
function ownKeys(t, e) {
  var r = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(t);
    e && (n = n.filter(function(o) {
      return Object.getOwnPropertyDescriptor(t, o).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function _object_spread_props(t, e) {
  return e = e != null ? e : {}, Object.getOwnPropertyDescriptors ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(e)) : ownKeys(Object(e)).forEach(function(r) {
    Object.defineProperty(t, r, Object.getOwnPropertyDescriptor(e, r));
  }), t;
}
var simpleJoinRemoteEntry = function(t, e) {
  if (!t)
    return e;
  var r = function(o) {
    if (o === ".")
      return "";
    if (o.startsWith("./"))
      return o.replace("./", "");
    if (o.startsWith("/")) {
      var s = o.slice(1);
      return s.endsWith("/") ? s.slice(0, -1) : s;
    }
    return o;
  }, n = r(t);
  return n ? n.endsWith("/") ? "".concat(n).concat(e) : "".concat(n, "/").concat(e) : e;
};
function inferAutoPublicPath(t) {
  return t.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
}
function generateSnapshotFromManifest(t) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, r, n, o = e.remotes, s = o === void 0 ? {} : o, i = e.overrides, l = i === void 0 ? {} : i, c = e.version, a, d = function() {
    return "publicPath" in t.metaData ? t.metaData.publicPath === "auto" && c ? inferAutoPublicPath(c) : t.metaData.publicPath : t.metaData.getPublicPath;
  }, u = Object.keys(l), h = {};
  if (!Object.keys(s).length) {
    var g;
    h = ((g = t.remotes) === null || g === void 0 ? void 0 : g.reduce(function(E, Q) {
      var H, V = Q.federationContainerName;
      return u.includes(V) ? H = l[V] : "version" in Q ? H = Q.version : H = Q.entry, E[V] = {
        matchedVersion: H
      }, E;
    }, {})) || {};
  }
  Object.keys(s).forEach(function(E) {
    return h[E] = {
      matchedVersion: u.includes(E) ? l[E] : s[E]
    };
  });
  var m = t.metaData, I = m.remoteEntry, p = I.path, y = I.name, A = I.type, M = m.types, b = m.buildInfo.buildVersion, v = m.globalName, N = t.exposes, T = {
    version: c || "",
    buildVersion: b,
    globalName: v,
    remoteEntry: simpleJoinRemoteEntry(p, y),
    remoteEntryType: A,
    remoteTypes: simpleJoinRemoteEntry(M.path, M.name),
    remoteTypesZip: M.zip || "",
    remoteTypesAPI: M.api || "",
    remotesInfo: h,
    shared: t == null ? void 0 : t.shared.map(function(E) {
      return {
        assets: E.assets,
        sharedName: E.name,
        version: E.version
      };
    }),
    modules: N == null ? void 0 : N.map(function(E) {
      return {
        moduleName: E.name,
        modulePath: E.path,
        assets: E.assets
      };
    })
  };
  if (!((r = t.metaData) === null || r === void 0) && r.prefetchInterface) {
    var x = t.metaData.prefetchInterface;
    T = _object_spread_props(_object_spread$2({}, T), {
      prefetchInterface: x
    });
  }
  if (!((n = t.metaData) === null || n === void 0) && n.prefetchEntry) {
    var _ = t.metaData.prefetchEntry, w = _.path, D = _.name, G = _.type;
    T = _object_spread_props(_object_spread$2({}, T), {
      prefetchEntry: simpleJoinRemoteEntry(w, D),
      prefetchEntryType: G
    });
  }
  return "publicPath" in t.metaData ? a = _object_spread_props(_object_spread$2({}, T), {
    publicPath: d()
  }) : a = _object_spread_props(_object_spread$2({}, T), {
    getPublicPath: d()
  }), a;
}
function isManifestProvider(t) {
  return !!("remoteEntry" in t && t.remoteEntry.includes(MANIFEST_EXT));
}
function asyncGeneratorStep$1(t, e, r, n, o, s, i) {
  try {
    var l = t[s](i), c = l.value;
  } catch (a) {
    r(a);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(n, o);
}
function _async_to_generator$1(t) {
  return function() {
    var e = this, r = arguments;
    return new Promise(function(n, o) {
      var s = t.apply(e, r);
      function i(c) {
        asyncGeneratorStep$1(s, n, o, i, l, "next", c);
      }
      function l(c) {
        asyncGeneratorStep$1(s, n, o, i, l, "throw", c);
      }
      i(void 0);
    });
  };
}
function _define_property$1(t, e, r) {
  return e in t ? Object.defineProperty(t, e, {
    value: r,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = r, t;
}
function _instanceof(t, e) {
  return e != null && typeof Symbol < "u" && e[Symbol.hasInstance] ? !!e[Symbol.hasInstance](t) : t instanceof e;
}
function _object_spread$1(t) {
  for (var e = 1; e < arguments.length; e++) {
    var r = arguments[e] != null ? arguments[e] : {}, n = Object.keys(r);
    typeof Object.getOwnPropertySymbols == "function" && (n = n.concat(Object.getOwnPropertySymbols(r).filter(function(o) {
      return Object.getOwnPropertyDescriptor(r, o).enumerable;
    }))), n.forEach(function(o) {
      _define_property$1(t, o, r[o]);
    });
  }
  return t;
}
function _type_of$2(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
}
function _ts_generator$1(t, e) {
  var r, n, o, s, i = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  };
  return s = {
    next: l(0),
    throw: l(1),
    return: l(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function l(a) {
    return function(d) {
      return c([
        a,
        d
      ]);
    };
  }
  function c(a) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; i; )
      try {
        if (r = 1, n && (o = a[0] & 2 ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, a[1])).done)
          return o;
        switch (n = 0, o && (a = [
          a[0] & 2,
          o.value
        ]), a[0]) {
          case 0:
          case 1:
            o = a;
            break;
          case 4:
            return i.label++, {
              value: a[1],
              done: !1
            };
          case 5:
            i.label++, n = a[1], a = [
              0
            ];
            continue;
          case 7:
            a = i.ops.pop(), i.trys.pop();
            continue;
          default:
            if (o = i.trys, !(o = o.length > 0 && o[o.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              i = 0;
              continue;
            }
            if (a[0] === 3 && (!o || a[1] > o[0] && a[1] < o[3])) {
              i.label = a[1];
              break;
            }
            if (a[0] === 6 && i.label < o[1]) {
              i.label = o[1], o = a;
              break;
            }
            if (o && i.label < o[2]) {
              i.label = o[2], i.ops.push(a);
              break;
            }
            o[2] && i.ops.pop(), i.trys.pop();
            continue;
        }
        a = e.call(t, i);
      } catch (d) {
        a = [
          6,
          d
        ], n = 0;
      } finally {
        r = o = 0;
      }
    if (a[0] & 5)
      throw a[1];
    return {
      value: a[0] ? a[1] : void 0,
      done: !0
    };
  }
}
function safeWrapper(t, e) {
  return _safeWrapper.apply(this, arguments);
}
function _safeWrapper() {
  return _safeWrapper = _async_to_generator$1(function(t, e) {
    var r, n;
    return _ts_generator$1(this, function(o) {
      switch (o.label) {
        case 0:
          return o.trys.push([
            0,
            2,
            ,
            3
          ]), [
            4,
            t()
          ];
        case 1:
          return r = o.sent(), [
            2,
            r
          ];
        case 2:
          return n = o.sent(), !e && warn(n), [
            2
          ];
        case 3:
          return [
            2
          ];
      }
    });
  }), _safeWrapper.apply(this, arguments);
}
function isStaticResourcesEqual(t, e) {
  var r = /^(https?:)?\/\//i, n = t.replace(r, "").replace(/\/$/, ""), o = e.replace(r, "").replace(/\/$/, "");
  return n === o;
}
function createScript(t) {
  for (var e = null, r = !0, n = 2e4, o, s = document.getElementsByTagName("script"), i = 0; i < s.length; i++) {
    var l = s[i], c = l.getAttribute("src");
    if (c && isStaticResourcesEqual(c, t.url)) {
      e = l, r = !1;
      break;
    }
  }
  if (!e) {
    if (e = document.createElement("script"), e.type = "text/javascript", e.src = t.url, t.createScriptHook) {
      var a = t.createScriptHook(t.url);
      _instanceof(a, HTMLScriptElement) ? e = a : (typeof a > "u" ? "undefined" : _type_of$2(a)) === "object" && (a.script && (e = a.script), a.timeout && (n = a.timeout));
    }
    var d = t.attrs;
    d && Object.keys(d).forEach(function(h) {
      e && (h === "async" || h === "defer" ? e[h] = d[h] : e.getAttribute(h) || e.setAttribute(h, d[h]));
    });
  }
  var u = function(h, g) {
    var m;
    if (clearTimeout(o), e && (e.onerror = null, e.onload = null, safeWrapper(function() {
      var y = t.needDeleteScript, A = y === void 0 ? !0 : y;
      A && e != null && e.parentNode && e.parentNode.removeChild(e);
    }), h)) {
      var I, p = h(g);
      return t == null || (I = t.cb) === null || I === void 0 || I.call(t), p;
    }
    t == null || (m = t.cb) === null || m === void 0 || m.call(t);
  };
  return e.onerror = u.bind(null, e.onerror), e.onload = u.bind(null, e.onload), o = setTimeout(function() {
    u(null, new Error('Remote script "'.concat(t.url, '" time-outed.')));
  }, n), {
    script: e,
    needAttach: r
  };
}
function createLink(t) {
  for (var e = null, r = !0, n = document.getElementsByTagName("link"), o = 0; o < n.length; o++) {
    var s = n[o], i = s.getAttribute("href"), l = s.getAttribute("ref");
    if (i && isStaticResourcesEqual(i, t.url) && l === t.attrs.ref) {
      e = s, r = !1;
      break;
    }
  }
  if (!e) {
    if (e = document.createElement("link"), e.setAttribute("href", t.url), t.createLinkHook) {
      var c = t.createLinkHook(t.url);
      _instanceof(c, HTMLLinkElement) && (e = c);
    }
    var a = t.attrs;
    a && Object.keys(a).forEach(function(u) {
      e && !e.getAttribute(u) && e.setAttribute(u, a[u]);
    });
  }
  var d = function(u, h) {
    if (e && (e.onerror = null, e.onload = null, safeWrapper(function() {
      var m = t.needDeleteLink, I = m === void 0 ? !0 : m;
      I && e != null && e.parentNode && e.parentNode.removeChild(e);
    }), u)) {
      var g = u(h);
      return t.cb(), g;
    }
    t.cb();
  };
  return e.onerror = d.bind(null, e.onerror), e.onload = d.bind(null, e.onload), {
    link: e,
    needAttach: r
  };
}
function loadScript(t, e) {
  var r = e.attrs, n = r === void 0 ? {} : r, o = e.createScriptHook;
  return new Promise(function(s, i) {
    var l = createScript({
      url: t,
      cb: s,
      attrs: _object_spread$1({
        crossorigin: "anonymous",
        fetchpriority: "high"
      }, n),
      createScriptHook: o,
      needDeleteScript: !0
    }), c = l.script, a = l.needAttach;
    a && document.head.appendChild(c);
  });
}
function _array_like_to_array(t, e) {
  (e == null || e > t.length) && (e = t.length);
  for (var r = 0, n = new Array(e); r < e; r++)
    n[r] = t[r];
  return n;
}
function _array_with_holes(t) {
  if (Array.isArray(t))
    return t;
}
function asyncGeneratorStep(t, e, r, n, o, s, i) {
  try {
    var l = t[s](i), c = l.value;
  } catch (a) {
    r(a);
    return;
  }
  l.done ? e(c) : Promise.resolve(c).then(n, o);
}
function _async_to_generator(t) {
  return function() {
    var e = this, r = arguments;
    return new Promise(function(n, o) {
      var s = t.apply(e, r);
      function i(c) {
        asyncGeneratorStep(s, n, o, i, l, "next", c);
      }
      function l(c) {
        asyncGeneratorStep(s, n, o, i, l, "throw", c);
      }
      i(void 0);
    });
  };
}
function _iterable_to_array_limit(t, e) {
  var r = t == null ? null : typeof Symbol < "u" && t[Symbol.iterator] || t["@@iterator"];
  if (r != null) {
    var n = [], o = !0, s = !1, i, l;
    try {
      for (r = r.call(t); !(o = (i = r.next()).done) && (n.push(i.value), !(e && n.length === e)); o = !0)
        ;
    } catch (c) {
      s = !0, l = c;
    } finally {
      try {
        !o && r.return != null && r.return();
      } finally {
        if (s)
          throw l;
      }
    }
    return n;
  }
}
function _non_iterable_rest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(t, e) {
  return _array_with_holes(t) || _iterable_to_array_limit(t, e) || _unsupported_iterable_to_array(t, e) || _non_iterable_rest();
}
function _type_of$1(t) {
  return t && typeof Symbol < "u" && t.constructor === Symbol ? "symbol" : typeof t;
}
function _unsupported_iterable_to_array(t, e) {
  if (!!t) {
    if (typeof t == "string")
      return _array_like_to_array(t, e);
    var r = Object.prototype.toString.call(t).slice(8, -1);
    if (r === "Object" && t.constructor && (r = t.constructor.name), r === "Map" || r === "Set")
      return Array.from(r);
    if (r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))
      return _array_like_to_array(t, e);
  }
}
function _ts_generator(t, e) {
  var r, n, o, s, i = {
    label: 0,
    sent: function() {
      if (o[0] & 1)
        throw o[1];
      return o[1];
    },
    trys: [],
    ops: []
  };
  return s = {
    next: l(0),
    throw: l(1),
    return: l(2)
  }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function l(a) {
    return function(d) {
      return c([
        a,
        d
      ]);
    };
  }
  function c(a) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; i; )
      try {
        if (r = 1, n && (o = a[0] & 2 ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n), 0) : n.next) && !(o = o.call(n, a[1])).done)
          return o;
        switch (n = 0, o && (a = [
          a[0] & 2,
          o.value
        ]), a[0]) {
          case 0:
          case 1:
            o = a;
            break;
          case 4:
            return i.label++, {
              value: a[1],
              done: !1
            };
          case 5:
            i.label++, n = a[1], a = [
              0
            ];
            continue;
          case 7:
            a = i.ops.pop(), i.trys.pop();
            continue;
          default:
            if (o = i.trys, !(o = o.length > 0 && o[o.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              i = 0;
              continue;
            }
            if (a[0] === 3 && (!o || a[1] > o[0] && a[1] < o[3])) {
              i.label = a[1];
              break;
            }
            if (a[0] === 6 && i.label < o[1]) {
              i.label = o[1], o = a;
              break;
            }
            if (o && i.label < o[2]) {
              i.label = o[2], i.ops.push(a);
              break;
            }
            o[2] && i.ops.pop(), i.trys.pop();
            continue;
        }
        a = e.call(t, i);
      } catch (d) {
        a = [
          6,
          d
        ], n = 0;
      } finally {
        r = o = 0;
      }
    if (a[0] & 5)
      throw a[1];
    return {
      value: a[0] ? a[1] : void 0,
      done: !0
    };
  }
}
function importNodeModule(t) {
  if (!t)
    throw new Error("import specifier is required");
  var e = new Function("name", "return import(name)");
  return e(t).then(function(r) {
    return r.default;
  }).catch(function(r) {
    throw console.error("Error importing module ".concat(t, ":"), r), r;
  });
}
function createScriptNode(url, cb, attrs, createScriptHook) {
  if (createScriptHook) {
    var hookResult = createScriptHook(url);
    hookResult && (typeof hookResult > "u" ? "undefined" : _type_of$1(hookResult)) === "object" && "url" in hookResult && (url = hookResult.url);
  }
  var urlObj;
  try {
    urlObj = new URL(url);
  } catch (t) {
    console.error("Error constructing URL:", t), cb(new Error("Invalid URL: ".concat(t)));
    return;
  }
  var getFetch = function() {
    var t = _async_to_generator(function() {
      var e;
      return _ts_generator(this, function(r) {
        switch (r.label) {
          case 0:
            return typeof fetch > "u" ? [
              4,
              importNodeModule("node-fetch")
            ] : [
              3,
              2
            ];
          case 1:
            return e = r.sent(), [
              2,
              (e == null ? void 0 : e.default) || e
            ];
          case 2:
            return [
              2,
              fetch
            ];
          case 3:
            return [
              2
            ];
        }
      });
    });
    return function() {
      return t.apply(this, arguments);
    };
  }();
  console.log("fetching", urlObj.href), getFetch().then(function(f) {
    f(urlObj.href).then(function(t) {
      return t.text();
    }).then(function() {
      var _ref = _async_to_generator(function(data) {
        var _ref, path, vm, scriptContext, urlDirname, filename, script, exportedInterface, container;
        return _ts_generator(this, function(_state) {
          switch (_state.label) {
            case 0:
              return [
                4,
                Promise.all([
                  importNodeModule("path"),
                  importNodeModule("vm")
                ])
              ];
            case 1:
              _ref = _sliced_to_array.apply(void 0, [
                _state.sent(),
                2
              ]), path = _ref[0], vm = _ref[1], scriptContext = {
                exports: {},
                module: {
                  exports: {}
                }
              }, urlDirname = urlObj.pathname.split("/").slice(0, -1).join("/"), filename = path.basename(urlObj.pathname);
              try {
                if (script = new vm.Script("(function(exports, module, require, __dirname, __filename) {".concat(data, `
})`), filename), script.runInThisContext()(scriptContext.exports, scriptContext.module, eval("require"), urlDirname, filename), exportedInterface = scriptContext.module.exports || scriptContext.exports, attrs && exportedInterface && attrs.globalName)
                  return container = exportedInterface[attrs.globalName] || exportedInterface, cb(void 0, container), [
                    2
                  ];
                cb(void 0, exportedInterface);
              } catch (t) {
                cb(new Error("Script execution error: ".concat(t)));
              }
              return [
                2
              ];
          }
        });
      });
      return function(t) {
        return _ref.apply(this, arguments);
      };
    }()).catch(function(t) {
      cb(t);
    });
  });
}
function loadScriptNode(t, e) {
  return new Promise(function(r, n) {
    createScriptNode(t, function(o, s) {
      if (o)
        n(o);
      else {
        var i, l, c = (e == null || (i = e.attrs) === null || i === void 0 ? void 0 : i.globalName) || "__FEDERATION_".concat(e == null || (l = e.attrs) === null || l === void 0 ? void 0 : l.name, ":custom__"), a = globalThis[c] = s;
        r(a);
      }
    }, e.attrs, e.createScriptHook);
  });
}
function matchRemoteWithNameAndExpose(t, e) {
  for (const r of t) {
    const n = e.startsWith(r.name);
    let o = e.replace(r.name, "");
    if (n) {
      if (o.startsWith("/")) {
        const l = r.name;
        return o = `.${o}`, {
          pkgNameOrAlias: l,
          expose: o,
          remote: r
        };
      } else if (o === "")
        return {
          pkgNameOrAlias: r.name,
          expose: ".",
          remote: r
        };
    }
    const s = r.alias && e.startsWith(r.alias);
    let i = r.alias && e.replace(r.alias, "");
    if (r.alias && s) {
      if (i && i.startsWith("/")) {
        const l = r.alias;
        return i = `.${i}`, {
          pkgNameOrAlias: l,
          expose: i,
          remote: r
        };
      } else if (i === "")
        return {
          pkgNameOrAlias: r.alias,
          expose: ".",
          remote: r
        };
    }
  }
}
function matchRemote(t, e) {
  for (const r of t)
    if (e === r.name || r.alias && e === r.alias)
      return r;
}
function registerPlugins$1(t, e) {
  const r = getGlobalHostPlugins();
  return r.length > 0 && r.forEach((n) => {
    t != null && t.find((o) => o.name !== n.name) && t.push(n);
  }), t && t.length > 0 && t.forEach((n) => {
    e.forEach((o) => {
      o.applyPlugin(n);
    });
  }), t;
}
function _extends$7() {
  return _extends$7 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$7.apply(this, arguments);
}
async function loadEsmEntry({ entry: t, remoteEntryExports: e }) {
  return new Promise((r, n) => {
    try {
      e ? r(e) : new Function("callbacks", `import("${t}").then(callbacks[0]).catch(callbacks[1])`)([
        r,
        n
      ]);
    } catch (o) {
      n(o);
    }
  });
}
async function loadEntryScript({ name: t, globalName: e, entry: r, createScriptHook: n }) {
  const { entryExports: o } = getRemoteEntryExports(t, e);
  return o || (typeof document > "u" ? loadScriptNode(r, {
    attrs: {
      name: t,
      globalName: e
    },
    createScriptHook: n
  }).then(() => {
    const { remoteEntryKey: s, entryExports: i } = getRemoteEntryExports(t, e);
    return assert(i, `
        Unable to use the ${t}'s '${r}' URL with ${s}'s globalName to get remoteEntry exports.
        Possible reasons could be:

        1. '${r}' is not the correct URL, or the remoteEntry resource or name is incorrect.

        2. ${s} cannot be used to get remoteEntry exports in the window object.
      `), i;
  }).catch((s) => {
    throw s;
  }) : loadScript(r, {
    attrs: {},
    createScriptHook: n
  }).then(() => {
    const { remoteEntryKey: s, entryExports: i } = getRemoteEntryExports(t, e);
    return assert(i, `
      Unable to use the ${t}'s '${r}' URL with ${s}'s globalName to get remoteEntry exports.
      Possible reasons could be:

      1. '${r}' is not the correct URL, or the remoteEntry resource or name is incorrect.

      2. ${s} cannot be used to get remoteEntry exports in the window object.
    `), i;
  }).catch((s) => {
    throw s;
  }));
}
function getRemoteEntryUniqueKey(t) {
  const { entry: e, name: r } = t;
  return composeKeyWithSeparator(r, e);
}
async function getRemoteEntry({ remoteEntryExports: t, remoteInfo: e, createScriptHook: r }) {
  const { entry: n, name: o, type: s, entryGlobalName: i } = e, l = getRemoteEntryUniqueKey(e);
  return t || (globalLoading[l] || ([
    "esm",
    "module"
  ].includes(s) ? globalLoading[l] = loadEsmEntry({
    entry: n,
    remoteEntryExports: t
  }) : globalLoading[l] = loadEntryScript({
    name: o,
    globalName: i,
    entry: n,
    createScriptHook: r
  })), globalLoading[l]);
}
function getRemoteInfo(t) {
  return _extends$7({}, t, {
    entry: "entry" in t ? t.entry : "",
    type: t.type || DEFAULT_REMOTE_TYPE,
    entryGlobalName: t.entryGlobalName || t.name,
    shareScope: t.shareScope || DEFAULT_SCOPE
  });
}
function _extends$6() {
  return _extends$6 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$6.apply(this, arguments);
}
let Module = class {
  async getEntry() {
    if (this.remoteEntryExports)
      return this.remoteEntryExports;
    const e = await getRemoteEntry({
      remoteInfo: this.remoteInfo,
      remoteEntryExports: this.remoteEntryExports,
      createScriptHook: (r) => {
        const n = this.host.loaderHook.lifecycle.createScript.emit({
          url: r
        });
        if (!!n && (typeof document > "u" || n instanceof HTMLScriptElement || "script" in n || "timeout" in n))
          return n;
      }
    });
    return assert(e, `remoteEntryExports is undefined 
 ${safeToString$1(this.remoteInfo)}`), this.remoteEntryExports = e, this.remoteEntryExports;
  }
  async get(e, r, n) {
    const { loadFactory: o = !0 } = n || {
      loadFactory: !0
    }, s = await this.getEntry();
    if (!this.inited) {
      const a = this.host.shareScopeMap, d = this.remoteInfo.shareScope || "default";
      a[d] || (a[d] = {});
      const u = a[d], h = [], g = {
        version: this.remoteInfo.version || ""
      };
      Object.defineProperty(g, "shareScopeMap", {
        value: a,
        enumerable: !1
      });
      const m = await this.host.hooks.lifecycle.beforeInitContainer.emit({
        shareScope: u,
        remoteEntryInitOptions: g,
        initScope: h,
        remoteInfo: this.remoteInfo,
        origin: this.host
      });
      await s.init(m.shareScope, m.initScope, m.remoteEntryInitOptions), await this.host.hooks.lifecycle.initContainer.emit(_extends$6({}, m, {
        remoteEntryExports: s
      }));
    }
    this.lib = s, this.inited = !0;
    const i = await s.get(r);
    assert(i, `${getFMId(this.remoteInfo)} remote don't export ${r}.`);
    const l = this.wraperFactory(i, e);
    return o ? await l() : l;
  }
  wraperFactory(e, r) {
    function n(o, s) {
      o && typeof o == "object" && Object.isExtensible(o) && !Object.getOwnPropertyDescriptor(o, Symbol.for("mf_module_id")) && Object.defineProperty(o, Symbol.for("mf_module_id"), {
        value: s,
        enumerable: !1
      });
    }
    return e instanceof Promise ? async () => {
      const o = await e();
      return n(o, r), o;
    } : () => {
      const o = e();
      return n(o, r), o;
    };
  }
  constructor({ remoteInfo: e, host: r }) {
    this.inited = !1, this.lib = void 0, this.remoteInfo = e, this.host = r;
  }
};
class SyncHook {
  on(e) {
    typeof e == "function" && this.listeners.add(e);
  }
  once(e) {
    const r = this;
    this.on(function n(...o) {
      return r.remove(n), e.apply(null, o);
    });
  }
  emit(...e) {
    let r;
    return this.listeners.size > 0 && this.listeners.forEach((n) => {
      r = n(...e);
    }), r;
  }
  remove(e) {
    this.listeners.delete(e);
  }
  removeAll() {
    this.listeners.clear();
  }
  constructor(e) {
    this.type = "", this.listeners = /* @__PURE__ */ new Set(), e && (this.type = e);
  }
}
class AsyncHook extends SyncHook {
  emit(...e) {
    let r;
    const n = Array.from(this.listeners);
    if (n.length > 0) {
      let o = 0;
      const s = (i) => i === !1 ? !1 : o < n.length ? Promise.resolve(n[o++].apply(null, e)).then(s) : i;
      r = s();
    }
    return Promise.resolve(r);
  }
}
function checkReturnData(t, e) {
  if (!isObject(e))
    return !1;
  if (t !== e) {
    for (const r in t)
      if (!(r in e))
        return !1;
  }
  return !0;
}
class SyncWaterfallHook extends SyncHook {
  emit(e) {
    isObject(e) || error(`The data for the "${this.type}" hook should be an object.`);
    for (const r of this.listeners)
      try {
        const n = r(e);
        if (checkReturnData(e, n))
          e = n;
        else {
          this.onerror(`A plugin returned an unacceptable value for the "${this.type}" type.`);
          break;
        }
      } catch (n) {
        warn$1(n), this.onerror(n);
      }
    return e;
  }
  constructor(e) {
    super(), this.onerror = error, this.type = e;
  }
}
class AsyncWaterfallHook extends SyncHook {
  emit(e) {
    isObject(e) || error(`The response data for the "${this.type}" hook must be an object.`);
    const r = Array.from(this.listeners);
    if (r.length > 0) {
      let n = 0;
      const o = (i) => (warn$1(i), this.onerror(i), e), s = (i) => {
        if (checkReturnData(e, i)) {
          if (e = i, n < r.length)
            try {
              return Promise.resolve(r[n++](e)).then(s, o);
            } catch (l) {
              return o(l);
            }
        } else
          this.onerror(`A plugin returned an incorrect value for the "${this.type}" type.`);
        return e;
      };
      return Promise.resolve(s(e));
    }
    return Promise.resolve(e);
  }
  constructor(e) {
    super(), this.onerror = error, this.type = e;
  }
}
class PluginSystem {
  applyPlugin(e) {
    assert(isPlainObject(e), "Plugin configuration is invalid.");
    const r = e.name;
    assert(r, "A name must be provided by the plugin."), this.registerPlugins[r] || (this.registerPlugins[r] = e, Object.keys(this.lifecycle).forEach((n) => {
      const o = e[n];
      o && this.lifecycle[n].on(o);
    }));
  }
  removePlugin(e) {
    assert(e, "A name is required.");
    const r = this.registerPlugins[e];
    assert(r, `The plugin "${e}" is not registered.`), Object.keys(r).forEach((n) => {
      n !== "name" && this.lifecycle[n].remove(r[n]);
    });
  }
  inherit({ lifecycle: e, registerPlugins: r }) {
    Object.keys(e).forEach((n) => {
      assert(!this.lifecycle[n], `The hook "${n}" has a conflict and cannot be inherited.`), this.lifecycle[n] = e[n];
    }), Object.keys(r).forEach((n) => {
      assert(!this.registerPlugins[n], `The plugin "${n}" has a conflict and cannot be inherited.`), this.applyPlugin(r[n]);
    });
  }
  constructor(e) {
    this.registerPlugins = {}, this.lifecycle = e, this.lifecycleKeys = Object.keys(e);
  }
}
function _extends$5() {
  return _extends$5 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$5.apply(this, arguments);
}
function defaultPreloadArgs(t) {
  return _extends$5({
    resourceCategory: "sync",
    share: !0,
    depsRemote: !0,
    prefetchInterface: !1
  }, t);
}
function formatPreloadArgs(t, e) {
  return e.map((r) => {
    const n = matchRemote(t, r.nameOrAlias);
    return assert(n, `Unable to preload ${r.nameOrAlias} as it is not included in ${!n && safeToString$1({
      remoteInfo: n,
      remotes: t
    })}`), {
      remote: n,
      preloadConfig: defaultPreloadArgs(r)
    };
  });
}
function normalizePreloadExposes(t) {
  return t ? t.map((e) => e === "." ? e : e.startsWith("./") ? e.replace("./", "") : e) : [];
}
function preloadAssets(t, e, r, n = !0) {
  const { cssAssets: o, jsAssetsWithoutEntry: s, entryAssets: i } = r;
  e.options.inBrowser && (i.forEach((l) => {
    const { moduleInfo: c } = l, a = e.moduleCache.get(t.name);
    getRemoteEntry(a ? {
      remoteInfo: c,
      remoteEntryExports: a.remoteEntryExports,
      createScriptHook: (d) => {
        const u = e.loaderHook.lifecycle.createScript.emit({
          url: d
        });
        if (!!u && (typeof document > "u" || u instanceof HTMLScriptElement || "script" in u || "timeout" in u))
          return u;
      }
    } : {
      remoteInfo: c,
      remoteEntryExports: void 0,
      createScriptHook: (d) => {
        const u = e.loaderHook.lifecycle.createScript.emit({
          url: d
        });
        if (!!u && (typeof document > "u" || u instanceof HTMLScriptElement || "script" in u || "timeout" in u))
          return u;
      }
    });
  }), n ? o.forEach((l) => {
    const { link: c, needAttach: a } = createLink({
      url: l,
      cb: () => {
      },
      attrs: {
        rel: "preload",
        as: "style",
        crossorigin: "anonymous"
      },
      createLinkHook: (d) => {
        const u = e.loaderHook.lifecycle.createLink.emit({
          url: d
        });
        if (u instanceof HTMLLinkElement)
          return u;
      }
    });
    a && document.head.appendChild(c);
  }) : o.forEach((l) => {
    const { link: c, needAttach: a } = createLink({
      url: l,
      cb: () => {
      },
      attrs: {
        rel: "stylesheet",
        type: "text/css"
      },
      createLinkHook: (d) => {
        const u = e.loaderHook.lifecycle.createLink.emit({
          url: d
        });
        if (u instanceof HTMLLinkElement)
          return u;
      },
      needDeleteLink: !1
    });
    a && document.head.appendChild(c);
  }), n ? s.forEach((l) => {
    const { link: c, needAttach: a } = createLink({
      url: l,
      cb: () => {
      },
      attrs: {
        rel: "preload",
        as: "script",
        crossorigin: "anonymous"
      },
      createLinkHook: (d) => {
        const u = e.loaderHook.lifecycle.createLink.emit({
          url: d
        });
        if (u instanceof HTMLLinkElement)
          return u;
      }
    });
    a && document.head.appendChild(c);
  }) : s.forEach((l) => {
    const { script: c, needAttach: a } = createScript({
      url: l,
      cb: () => {
      },
      attrs: {
        crossorigin: "anonymous",
        fetchpriority: "high"
      },
      createScriptHook: (d) => {
        const u = e.loaderHook.lifecycle.createScript.emit({
          url: d
        });
        if (u instanceof HTMLScriptElement)
          return u;
      },
      needDeleteScript: !0
    });
    a && document.head.appendChild(c);
  }));
}
function _extends$4() {
  return _extends$4 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$4.apply(this, arguments);
}
function assignRemoteInfo(t, e) {
  (!("remoteEntry" in e) || !e.remoteEntry) && error(`The attribute remoteEntry of ${name} must not be undefined.`);
  const { remoteEntry: r } = e;
  let n = getResourceUrl(e, r);
  !isBrowserEnv$1() && !n.startsWith("http") && (n = `https:${n}`), t.type = e.remoteEntryType, t.entryGlobalName = e.globalName, t.entry = n, t.version = e.version, t.buildVersion = e.buildVersion;
}
function snapshotPlugin() {
  return {
    name: "snapshot-plugin",
    async afterResolve(t) {
      const { remote: e, pkgNameOrAlias: r, expose: n, origin: o, remoteInfo: s } = t;
      if (!isRemoteInfoWithEntry(e) || !isPureRemoteEntry(e)) {
        const { remoteSnapshot: i, globalSnapshot: l } = await o.snapshotHandler.loadRemoteSnapshotInfo(e);
        assignRemoteInfo(s, i);
        const c = {
          remote: e,
          preloadConfig: {
            nameOrAlias: r,
            exposes: [
              n
            ],
            resourceCategory: "sync",
            share: !1,
            depsRemote: !1
          }
        }, a = await o.remoteHandler.hooks.lifecycle.generatePreloadAssets.emit({
          origin: o,
          preloadOptions: c,
          remoteInfo: s,
          remote: e,
          remoteSnapshot: i,
          globalSnapshot: l
        });
        return a && preloadAssets(s, o, a, !1), _extends$4({}, t, {
          remoteSnapshot: i
        });
      }
      return t;
    }
  };
}
function splitId(t) {
  const e = t.split(":");
  return e.length === 1 ? {
    name: e[0],
    version: void 0
  } : e.length === 2 ? {
    name: e[0],
    version: e[1]
  } : {
    name: e[1],
    version: e[2]
  };
}
function traverseModuleInfo(t, e, r, n, o = {}, s) {
  const i = getFMId(e), { value: l } = getInfoWithoutType(t, i), c = s || l;
  if (c && !isManifestProvider(c) && (r(c, e, n), c.remotesInfo)) {
    const a = Object.keys(c.remotesInfo);
    for (const d of a) {
      if (o[d])
        continue;
      o[d] = !0;
      const u = splitId(d), h = c.remotesInfo[d];
      traverseModuleInfo(t, {
        name: u.name,
        version: h.matchedVersion
      }, r, !1, o, void 0);
    }
  }
}
function generatePreloadAssets(t, e, r, n, o) {
  const s = [], i = [], l = [], c = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), { options: d } = t, { preloadConfig: u } = e, { depsRemote: h } = u;
  if (traverseModuleInfo(n, r, (p, y, A) => {
    let M;
    if (A)
      M = u;
    else if (Array.isArray(h)) {
      const _ = h.find((w) => w.nameOrAlias === y.name || w.nameOrAlias === y.alias);
      if (!_)
        return;
      M = defaultPreloadArgs(_);
    } else if (h === !0)
      M = u;
    else
      return;
    const b = getResourceUrl(p, "remoteEntry" in p ? p.remoteEntry : "");
    b && l.push({
      name: y.name,
      moduleInfo: {
        name: y.name,
        entry: b,
        type: "remoteEntryType" in p ? p.remoteEntryType : "global",
        entryGlobalName: "globalName" in p ? p.globalName : y.name,
        shareScope: "",
        version: "version" in p ? p.version : void 0
      },
      url: b
    });
    let v = "modules" in p ? p.modules : [];
    const N = normalizePreloadExposes(M.exposes);
    if (N.length && "modules" in p) {
      var T;
      v = p == null || (T = p.modules) == null ? void 0 : T.reduce((_, w) => ((N == null ? void 0 : N.indexOf(w.moduleName)) !== -1 && _.push(w), _), []);
    }
    function x(_) {
      const w = _.map((D) => getResourceUrl(p, D));
      return M.filter ? w.filter(M.filter) : w;
    }
    if (v) {
      const _ = v.length;
      for (let w = 0; w < _; w++) {
        const D = v[w], G = `${y.name}/${D.moduleName}`;
        t.remoteHandler.hooks.lifecycle.handlePreloadModule.emit({
          id: D.moduleName === "." ? y.name : G,
          name: y.name,
          remoteSnapshot: p,
          preloadConfig: M,
          remote: y,
          origin: t
        }), !getPreloaded(G) && (M.resourceCategory === "all" ? (s.push(...x(D.assets.css.async)), s.push(...x(D.assets.css.sync)), i.push(...x(D.assets.js.async)), i.push(...x(D.assets.js.sync))) : (M.resourceCategory = "sync") && (s.push(...x(D.assets.css.sync)), i.push(...x(D.assets.js.sync))), setPreloaded(G));
      }
    }
  }, !0, {}, o), o.shared) {
    const p = (y, A) => {
      const M = getRegisteredShare(t.shareScopeMap, A.sharedName, y, t.sharedHandler.hooks.lifecycle.resolveShare);
      M && typeof M.lib == "function" && (A.assets.js.sync.forEach((b) => {
        c.add(b);
      }), A.assets.css.sync.forEach((b) => {
        a.add(b);
      }));
    };
    o.shared.forEach((y) => {
      var A;
      const M = (A = d.shared) == null ? void 0 : A[y.sharedName];
      if (!M)
        return;
      const b = y.version ? M.find((N) => N.version === y.version) : M;
      if (!b)
        return;
      arrayOptions(b).forEach((N) => {
        p(N, y);
      });
    });
  }
  const m = i.filter((p) => !c.has(p));
  return {
    cssAssets: s.filter((p) => !a.has(p)),
    jsAssetsWithoutEntry: m,
    entryAssets: l
  };
}
const generatePreloadAssetsPlugin = function() {
  return {
    name: "generate-preload-assets-plugin",
    async generatePreloadAssets(t) {
      const { origin: e, preloadOptions: r, remoteInfo: n, remote: o, globalSnapshot: s, remoteSnapshot: i } = t;
      return isRemoteInfoWithEntry(o) && isPureRemoteEntry(o) ? {
        cssAssets: [],
        jsAssetsWithoutEntry: [],
        entryAssets: [
          {
            name: o.name,
            url: o.entry,
            moduleInfo: {
              name: n.name,
              entry: o.entry,
              type: "global",
              entryGlobalName: "",
              shareScope: ""
            }
          }
        ]
      } : (assignRemoteInfo(n, i), generatePreloadAssets(e, r, n, s, i));
    }
  };
};
function _extends$3() {
  return _extends$3 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$3.apply(this, arguments);
}
class SnapshotHandler {
  async loadSnapshot(e) {
    const { options: r } = this.HostInstance, { hostGlobalSnapshot: n, remoteSnapshot: o, globalSnapshot: s } = this.getGlobalRemoteInfo(e), { remoteSnapshot: i, globalSnapshot: l } = await this.hooks.lifecycle.loadSnapshot.emit({
      options: r,
      moduleInfo: e,
      hostGlobalSnapshot: n,
      remoteSnapshot: o,
      globalSnapshot: s
    });
    return {
      remoteSnapshot: i,
      globalSnapshot: l
    };
  }
  async loadRemoteSnapshotInfo(e) {
    const { options: r } = this.HostInstance;
    await this.hooks.lifecycle.beforeLoadRemoteSnapshot.emit({
      options: r,
      moduleInfo: e
    });
    let n = getGlobalSnapshotInfoByModuleInfo({
      name: this.HostInstance.options.name,
      version: this.HostInstance.options.version
    });
    n || (n = {
      version: this.HostInstance.options.version || "",
      remoteEntry: "",
      remotesInfo: {}
    }, addGlobalSnapshot({
      [this.HostInstance.options.name]: n
    })), n && "remotesInfo" in n && !getInfoWithoutType(n.remotesInfo, e.name).value && ("version" in e || "entry" in e) && (n.remotesInfo = _extends$3({}, n == null ? void 0 : n.remotesInfo, {
      [e.name]: {
        matchedVersion: "version" in e ? e.version : e.entry
      }
    }));
    const { hostGlobalSnapshot: o, remoteSnapshot: s, globalSnapshot: i } = this.getGlobalRemoteInfo(e), { remoteSnapshot: l, globalSnapshot: c } = await this.hooks.lifecycle.loadSnapshot.emit({
      options: r,
      moduleInfo: e,
      hostGlobalSnapshot: o,
      remoteSnapshot: s,
      globalSnapshot: i
    });
    if (l)
      if (isManifestProvider(l)) {
        const a = await this.getManifestJson(l.remoteEntry, e, {}), d = setGlobalSnapshotInfoByModuleInfo(_extends$3({}, e, {
          entry: l.remoteEntry
        }), a);
        return {
          remoteSnapshot: a,
          globalSnapshot: d
        };
      } else {
        const { remoteSnapshot: a } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
          options: this.HostInstance.options,
          moduleInfo: e,
          remoteSnapshot: l,
          from: "global"
        });
        return {
          remoteSnapshot: a,
          globalSnapshot: c
        };
      }
    else if (isRemoteInfoWithEntry(e)) {
      const a = await this.getManifestJson(e.entry, e, {}), d = setGlobalSnapshotInfoByModuleInfo(e, a), { remoteSnapshot: u } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
        options: this.HostInstance.options,
        moduleInfo: e,
        remoteSnapshot: a,
        from: "global"
      });
      return {
        remoteSnapshot: u,
        globalSnapshot: d
      };
    } else
      error(`
          Cannot get remoteSnapshot with the name: '${e.name}', version: '${e.version}' from __FEDERATION__.moduleInfo. The following reasons may be causing the problem:

          1. The Deploy platform did not deliver the correct data. You can use __FEDERATION__.moduleInfo to check the remoteInfo.

          2. The remote '${e.name}' version '${e.version}' is not released.

          The transformed module info: ${JSON.stringify(c)}
        `);
  }
  getGlobalRemoteInfo(e) {
    const r = getGlobalSnapshotInfoByModuleInfo({
      name: this.HostInstance.options.name,
      version: this.HostInstance.options.version
    }), n = r && "remotesInfo" in r && r.remotesInfo && getInfoWithoutType(r.remotesInfo, e.name).value;
    return n && n.matchedVersion ? {
      hostGlobalSnapshot: r,
      globalSnapshot: getGlobalSnapshot(),
      remoteSnapshot: getGlobalSnapshotInfoByModuleInfo({
        name: e.name,
        version: n.matchedVersion
      })
    } : {
      hostGlobalSnapshot: void 0,
      globalSnapshot: getGlobalSnapshot(),
      remoteSnapshot: getGlobalSnapshotInfoByModuleInfo({
        name: e.name,
        version: "version" in e ? e.version : void 0
      })
    };
  }
  async getManifestJson(e, r, n) {
    const o = async () => {
      let i = this.manifestCache.get(e);
      if (i)
        return i;
      try {
        let l = await this.loaderHook.lifecycle.fetch.emit(e, {});
        return (!l || !(l instanceof Response)) && (l = await fetch(e, {})), i = await l.json(), assert(i.metaData && i.exposes && i.shared, `${e} is not a federation manifest`), this.manifestCache.set(e, i), i;
      } catch (l) {
        error(`Failed to get manifestJson for ${r.name}. The manifest URL is ${e}. Please ensure that the manifestUrl is accessible.
          
 Error message:
          
 ${l}`);
      }
    }, s = async () => {
      const i = await o(), l = generateSnapshotFromManifest(i, {
        version: e
      }), { remoteSnapshot: c } = await this.hooks.lifecycle.loadRemoteSnapshot.emit({
        options: this.HostInstance.options,
        moduleInfo: r,
        manifestJson: i,
        remoteSnapshot: l,
        manifestUrl: e,
        from: "manifest"
      });
      return c;
    };
    return this.manifestLoading[e] || (this.manifestLoading[e] = s().then((i) => i)), this.manifestLoading[e];
  }
  constructor(e) {
    this.loadingHostSnapshot = null, this.manifestCache = /* @__PURE__ */ new Map(), this.hooks = new PluginSystem({
      beforeLoadRemoteSnapshot: new AsyncHook("beforeLoadRemoteSnapshot"),
      loadSnapshot: new AsyncWaterfallHook("loadGlobalSnapshot"),
      loadRemoteSnapshot: new AsyncWaterfallHook("loadRemoteSnapshot")
    }), this.manifestLoading = Global.__FEDERATION__.__MANIFEST_LOADING__, this.HostInstance = e, this.loaderHook = e.loaderHook;
  }
}
function _extends$2() {
  return _extends$2 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$2.apply(this, arguments);
}
function _object_without_properties_loose(t, e) {
  if (t == null)
    return {};
  var r = {}, n = Object.keys(t), o, s;
  for (s = 0; s < n.length; s++)
    o = n[s], !(e.indexOf(o) >= 0) && (r[o] = t[o]);
  return r;
}
class SharedHandler {
  registerShared(e, r) {
    const { shareInfos: n, shared: o } = formatShareConfigs(e, r);
    return Object.keys(n).forEach((i) => {
      n[i].forEach((c) => {
        !getRegisteredShare(this.shareScopeMap, i, c, this.hooks.lifecycle.resolveShare) && c && c.lib && this.setShared({
          pkgName: i,
          lib: c.lib,
          get: c.get,
          loaded: !0,
          shared: c,
          from: r.name
        });
      });
    }), {
      shareInfos: n,
      shared: o
    };
  }
  async loadShare(e, r) {
    const { host: n } = this, o = getTargetSharedOptions({
      pkgName: e,
      extraOptions: r,
      shareInfos: n.options.shared
    });
    o != null && o.scope && await Promise.all(o.scope.map(async (a) => {
      await Promise.all(this.initializeSharing(a, o.strategy));
    }));
    const s = await this.hooks.lifecycle.beforeLoadShare.emit({
      pkgName: e,
      shareInfo: o,
      shared: n.options.shared,
      origin: n
    }), { shareInfo: i } = s;
    assert(i, `Cannot find ${e} Share in the ${n.options.name}. Please ensure that the ${e} Share parameters have been injected`);
    const l = getRegisteredShare(this.shareScopeMap, e, i, this.hooks.lifecycle.resolveShare), c = (a) => {
      a.useIn || (a.useIn = []), addUniqueItem(a.useIn, n.options.name);
    };
    if (l && l.lib)
      return c(l), l.lib;
    if (l && l.loading && !l.loaded) {
      const a = await l.loading;
      return l.loaded = !0, l.lib || (l.lib = a), c(l), a;
    } else if (l) {
      const d = (async () => {
        const u = await l.get();
        i.lib = u, i.loaded = !0, c(i);
        const h = getRegisteredShare(this.shareScopeMap, e, i, this.hooks.lifecycle.resolveShare);
        return h && (h.lib = u, h.loaded = !0), u;
      })();
      return this.setShared({
        pkgName: e,
        loaded: !1,
        shared: l,
        from: n.options.name,
        lib: null,
        loading: d
      }), d;
    } else {
      if (r != null && r.customShareInfo)
        return !1;
      const d = (async () => {
        const u = await i.get();
        i.lib = u, i.loaded = !0, c(i);
        const h = getRegisteredShare(this.shareScopeMap, e, i, this.hooks.lifecycle.resolveShare);
        return h && (h.lib = u, h.loaded = !0), u;
      })();
      return this.setShared({
        pkgName: e,
        loaded: !1,
        shared: i,
        from: n.options.name,
        lib: null,
        loading: d
      }), d;
    }
  }
  initializeSharing(e = DEFAULT_SCOPE, r) {
    const { host: n } = this, o = this.shareScopeMap, s = n.options.name;
    o[e] || (o[e] = {});
    const i = o[e], l = (u, h) => {
      var g;
      const { version: m, eager: I } = h;
      i[u] = i[u] || {};
      const p = i[u], y = p[m], A = Boolean(y && (y.eager || ((g = y.shareConfig) == null ? void 0 : g.eager)));
      (!y || y.strategy !== "loaded-first" && !y.loaded && (Boolean(!I) !== !A ? I : s > y.from)) && (p[m] = h);
    }, c = [], a = (u) => u && u.init && u.init(o[e]), d = async (u) => {
      const { module: h } = await n.remoteHandler.getRemoteModuleAndOptions({
        id: u
      });
      if (h.getEntry) {
        const g = await h.getEntry();
        h.inited || (a(g), h.inited = !0);
      }
    };
    return Object.keys(n.options.shared).forEach((u) => {
      n.options.shared[u].forEach((g) => {
        g.scope.includes(e) && l(u, g);
      });
    }), r === "version-first" && n.options.remotes.forEach((u) => {
      u.shareScope === e && c.push(d(u.name));
    }), c;
  }
  loadShareSync(e, r) {
    const { host: n } = this, o = getTargetSharedOptions({
      pkgName: e,
      extraOptions: r,
      shareInfos: n.options.shared
    });
    o != null && o.scope && o.scope.forEach((l) => {
      this.initializeSharing(l, o.strategy);
    });
    const s = getRegisteredShare(this.shareScopeMap, e, o, this.hooks.lifecycle.resolveShare), i = (l) => {
      l.useIn || (l.useIn = []), addUniqueItem(l.useIn, n.options.name);
    };
    if (s) {
      if (typeof s.lib == "function")
        return i(s), s.loaded || (s.loaded = !0, s.from === n.options.name && (o.loaded = !0)), s.lib;
      if (typeof s.get == "function") {
        const l = s.get();
        if (!(l instanceof Promise))
          return i(s), this.setShared({
            pkgName: e,
            loaded: !0,
            from: n.options.name,
            lib: l,
            shared: s
          }), l;
      }
    }
    if (o.lib)
      return o.loaded || (o.loaded = !0), o.lib;
    if (o.get) {
      const l = o.get();
      if (l instanceof Promise)
        throw new Error(`
        The loadShareSync function was unable to load ${e}. The ${e} could not be found in ${n.options.name}.
        Possible reasons for failure: 

        1. The ${e} share was registered with the 'get' attribute, but loadShare was not used beforehand.

        2. The ${e} share was not registered with the 'lib' attribute.

      `);
      return o.lib = l, this.setShared({
        pkgName: e,
        loaded: !0,
        from: n.options.name,
        lib: o.lib,
        shared: o
      }), o.lib;
    }
    throw new Error(`
        The loadShareSync function was unable to load ${e}. The ${e} could not be found in ${n.options.name}.
        Possible reasons for failure: 

        1. The ${e} share was registered with the 'get' attribute, but loadShare was not used beforehand.

        2. The ${e} share was not registered with the 'lib' attribute.

      `);
  }
  initShareScopeMap(e, r, n = {}) {
    const { host: o } = this;
    this.shareScopeMap[e] = r, this.hooks.lifecycle.initContainerShareScopeMap.emit({
      shareScope: r,
      options: o.options,
      origin: o,
      scopeName: e,
      hostShareScopeMap: n.hostShareScopeMap
    });
  }
  setShared({ pkgName: e, shared: r, from: n, lib: o, loading: s, loaded: i, get: l }) {
    const { version: c, scope: a = "default" } = r, d = _object_without_properties_loose(r, [
      "version",
      "scope"
    ]);
    (Array.isArray(a) ? a : [
      a
    ]).forEach((h) => {
      this.shareScopeMap[h] || (this.shareScopeMap[h] = {}), this.shareScopeMap[h][e] || (this.shareScopeMap[h][e] = {}), !this.shareScopeMap[h][e][c] && (this.shareScopeMap[h][e][c] = _extends$2({
        version: c,
        scope: [
          "default"
        ]
      }, d, {
        lib: o,
        loaded: i,
        loading: s
      }), l && (this.shareScopeMap[h][e][c].get = l));
    });
  }
  _setGlobalShareScopeMap(e) {
    const r = getGlobalShareScope(), n = e.id || e.name;
    n && !r[n] && (r[n] = this.shareScopeMap);
  }
  constructor(e) {
    this.hooks = new PluginSystem({
      afterResolve: new AsyncWaterfallHook("afterResolve"),
      beforeLoadShare: new AsyncWaterfallHook("beforeLoadShare"),
      loadShare: new AsyncHook(),
      resolveShare: new SyncWaterfallHook("resolveShare"),
      initContainerShareScopeMap: new SyncWaterfallHook("initContainerShareScopeMap")
    }), this.host = e, this.shareScopeMap = {}, this._setGlobalShareScopeMap(e.options);
  }
}
function _extends$1() {
  return _extends$1 = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends$1.apply(this, arguments);
}
class RemoteHandler {
  formatAndRegisterRemote(e, r) {
    return (r.remotes || []).reduce((o, s) => (this.registerRemote(s, o, {
      force: !1
    }), o), e.remotes);
  }
  async loadRemote(e, r) {
    const { host: n } = this;
    try {
      const { loadFactory: o = !0 } = r || {
        loadFactory: !0
      }, { module: s, moduleOptions: i, remoteMatchInfo: l } = await this.getRemoteModuleAndOptions({
        id: e
      }), { pkgNameOrAlias: c, remote: a, expose: d, id: u } = l, h = await s.get(u, d, r), g = await this.hooks.lifecycle.onLoad.emit({
        id: u,
        pkgNameOrAlias: c,
        expose: d,
        exposeModule: o ? h : void 0,
        exposeModuleFactory: o ? void 0 : h,
        remote: a,
        options: i,
        moduleInstance: s,
        origin: n
      });
      return typeof g == "function" ? g : h;
    } catch (o) {
      const { from: s = "runtime" } = r || {
        from: "runtime"
      }, i = await this.hooks.lifecycle.errorLoadRemote.emit({
        id: e,
        error: o,
        from: s,
        lifecycle: "onLoad",
        origin: n
      });
      if (!i)
        throw o;
      return i;
    }
  }
  async preloadRemote(e) {
    const { host: r } = this;
    await this.hooks.lifecycle.beforePreloadRemote.emit({
      preloadOps: e,
      options: r.options,
      origin: r
    });
    const n = formatPreloadArgs(r.options.remotes, e);
    await Promise.all(n.map(async (o) => {
      const { remote: s } = o, i = getRemoteInfo(s), { globalSnapshot: l, remoteSnapshot: c } = await r.snapshotHandler.loadRemoteSnapshotInfo(s), a = await this.hooks.lifecycle.generatePreloadAssets.emit({
        origin: r,
        preloadOptions: o,
        remote: s,
        remoteInfo: i,
        globalSnapshot: l,
        remoteSnapshot: c
      });
      !a || preloadAssets(i, r, a);
    }));
  }
  registerRemotes(e, r) {
    const { host: n } = this;
    e.forEach((o) => {
      this.registerRemote(o, n.options.remotes, {
        force: r == null ? void 0 : r.force
      });
    });
  }
  async getRemoteModuleAndOptions(e) {
    const { host: r } = this, { id: n } = e;
    let o;
    try {
      o = await this.hooks.lifecycle.beforeRequest.emit({
        id: n,
        options: r.options,
        origin: r
      });
    } catch (m) {
      if (o = await this.hooks.lifecycle.errorLoadRemote.emit({
        id: n,
        options: r.options,
        origin: r,
        from: "runtime",
        error: m,
        lifecycle: "beforeRequest"
      }), !o)
        throw m;
    }
    const { id: s } = o, i = matchRemoteWithNameAndExpose(r.options.remotes, s);
    assert(i, `
        Unable to locate ${s} in ${r.options.name}. Potential reasons for failure include:

        1. ${s} was not included in the 'remotes' parameter of ${r.options.name || "the host"}.

        2. ${s} could not be found in the 'remotes' of ${r.options.name} with either 'name' or 'alias' attributes.
        3. ${s} is not online, injected, or loaded.
        4. ${s}  cannot be accessed on the expected.
        5. The 'beforeRequest' hook was provided but did not return the correct 'remoteInfo' when attempting to load ${s}.
      `);
    const { remote: l } = i, c = getRemoteInfo(l), a = await r.sharedHandler.hooks.lifecycle.afterResolve.emit(_extends$1({
      id: s
    }, i, {
      options: r.options,
      origin: r,
      remoteInfo: c
    })), { remote: d, expose: u } = a;
    assert(d && u, `The 'beforeRequest' hook was executed, but it failed to return the correct 'remote' and 'expose' values while loading ${s}.`);
    let h = r.moduleCache.get(d.name);
    const g = {
      host: r,
      remoteInfo: c
    };
    return h || (h = new Module(g), r.moduleCache.set(d.name, h)), {
      module: h,
      moduleOptions: g,
      remoteMatchInfo: a
    };
  }
  registerRemote(e, r, n) {
    const { host: o } = this, s = () => {
      if (e.alias) {
        const l = r.find((c) => {
          var a;
          return e.alias && (c.name.startsWith(e.alias) || ((a = c.alias) == null ? void 0 : a.startsWith(e.alias)));
        });
        assert(!l, `The alias ${e.alias} of remote ${e.name} is not allowed to be the prefix of ${l && l.name} name or alias`);
      }
      "entry" in e && isBrowserEnv() && !e.entry.startsWith("http") && (e.entry = new URL(e.entry, window.location.origin).href), e.shareScope || (e.shareScope = DEFAULT_SCOPE), e.type || (e.type = DEFAULT_REMOTE_TYPE);
    }, i = r.find((l) => l.name === e.name);
    if (!i)
      s(), r.push(e), this.hooks.lifecycle.registerRemote.emit({
        remote: e,
        origin: o
      });
    else {
      const l = [
        `The remote "${e.name}" is already registered.`,
        n != null && n.force ? "Hope you have known that OVERRIDE it may have some unexpected errors" : 'If you want to merge the remote, you can set "force: true".'
      ];
      n != null && n.force && (this.removeRemote(i), s(), r.push(e), this.hooks.lifecycle.registerRemote.emit({
        remote: e,
        origin: o
      })), warn(l.join(" "));
    }
  }
  removeRemote(e) {
    const { host: r } = this, { name: n } = e, o = r.options.remotes.findIndex((l) => l.name === n);
    o !== -1 && r.options.remotes.splice(o, 1);
    const s = r.moduleCache.get(e.name);
    if (s) {
      var i;
      const l = s.remoteInfo, c = l.entryGlobalName;
      globalThis[c] && ((i = Object.getOwnPropertyDescriptor(globalThis, c)) == null ? void 0 : i.configurable) && delete globalThis[c];
      const a = getRemoteEntryUniqueKey(s.remoteInfo);
      globalLoading[a] && delete globalLoading[a];
      let d = l.buildVersion ? composeKeyWithSeparator(l.name, l.buildVersion) : l.name;
      const u = globalThis.__FEDERATION__.__INSTANCES__.findIndex((h) => l.buildVersion ? h.options.id === d : h.name === d);
      if (u !== -1) {
        const h = globalThis.__FEDERATION__.__INSTANCES__[u];
        d = h.options.id || d;
        const g = getGlobalShareScope();
        let m = !0;
        const I = [];
        Object.keys(g).forEach((p) => {
          Object.keys(g[p]).forEach((y) => {
            Object.keys(g[p][y]).forEach((A) => {
              Object.keys(g[p][y][A]).forEach((M) => {
                const b = g[p][y][A][M];
                b.from === l.name && (b.loaded || b.loading ? (b.useIn = b.useIn.filter((v) => v !== l.name), b.useIn.length ? m = !1 : I.push([
                  p,
                  y,
                  A,
                  M
                ])) : I.push([
                  p,
                  y,
                  A,
                  M
                ]));
              });
            });
          });
        }), m && (h.shareScopeMap = {}, delete g[d]), I.forEach(([p, y, A, M]) => {
          var b, v, N;
          (N = g[p]) == null || (v = N[y]) == null || (b = v[A]) == null || delete b[M];
        }), globalThis.__FEDERATION__.__INSTANCES__.splice(u, 1);
      }
      r.moduleCache.delete(e.name);
    }
  }
  constructor(e) {
    this.hooks = new PluginSystem({
      registerRemote: new SyncWaterfallHook("registerRemote"),
      beforeRequest: new AsyncWaterfallHook("beforeRequest"),
      onLoad: new AsyncHook("onLoad"),
      handlePreloadModule: new SyncHook("handlePreloadModule"),
      errorLoadRemote: new AsyncHook("errorLoadRemote"),
      beforePreloadRemote: new AsyncHook("beforePreloadRemote"),
      generatePreloadAssets: new AsyncHook("generatePreloadAssets"),
      afterPreloadRemote: new AsyncHook()
    }), this.host = e;
  }
}
function _extends() {
  return _extends = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var r = arguments[e];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
    }
    return t;
  }, _extends.apply(this, arguments);
}
class FederationHost {
  initOptions(e) {
    this.registerPlugins(e.plugins);
    const r = this.formatOptions(this.options, e);
    return this.options = r, r;
  }
  async loadShare(e, r) {
    return this.sharedHandler.loadShare(e, r);
  }
  loadShareSync(e, r) {
    return this.sharedHandler.loadShareSync(e, r);
  }
  initializeSharing(e = DEFAULT_SCOPE, r) {
    return this.sharedHandler.initializeSharing(e, r);
  }
  initRawContainer(e, r, n) {
    const o = getRemoteInfo({
      name: e,
      entry: r
    }), s = new Module({
      host: this,
      remoteInfo: o
    });
    return s.remoteEntryExports = n, this.moduleCache.set(e, s), s;
  }
  async loadRemote(e, r) {
    return this.remoteHandler.loadRemote(e, r);
  }
  async preloadRemote(e) {
    return this.remoteHandler.preloadRemote(e);
  }
  initShareScopeMap(e, r, n = {}) {
    this.sharedHandler.initShareScopeMap(e, r, n);
  }
  formatOptions(e, r) {
    const { shared: n } = formatShareConfigs(e, r), { userOptions: o, options: s } = this.hooks.lifecycle.beforeInit.emit({
      origin: this,
      userOptions: r,
      options: e,
      shareInfo: n
    }), i = this.remoteHandler.formatAndRegisterRemote(s, o), { shared: l } = this.sharedHandler.registerShared(s, o), c = [
      ...s.plugins
    ];
    o.plugins && o.plugins.forEach((d) => {
      c.includes(d) || c.push(d);
    });
    const a = _extends({}, e, r, {
      plugins: c,
      remotes: i,
      shared: l
    });
    return this.hooks.lifecycle.init.emit({
      origin: this,
      options: a
    }), a;
  }
  registerPlugins(e) {
    const r = registerPlugins$1(e, [
      this.hooks,
      this.remoteHandler.hooks,
      this.sharedHandler.hooks,
      this.snapshotHandler.hooks,
      this.loaderHook
    ]);
    this.options.plugins = this.options.plugins.reduce((n, o) => (o && n && !n.find((s) => s.name === o.name) && n.push(o), n), r || []);
  }
  registerRemotes(e, r) {
    return this.remoteHandler.registerRemotes(e, r);
  }
  constructor(e) {
    this.hooks = new PluginSystem({
      beforeInit: new SyncWaterfallHook("beforeInit"),
      init: new SyncHook(),
      beforeInitContainer: new AsyncWaterfallHook("beforeInitContainer"),
      initContainer: new AsyncWaterfallHook("initContainer")
    }), this.version = "0.1.21", this.moduleCache = /* @__PURE__ */ new Map(), this.loaderHook = new PluginSystem({
      getModuleInfo: new SyncHook(),
      createScript: new SyncHook(),
      createLink: new SyncHook(),
      fetch: new AsyncHook("fetch")
    });
    const r = {
      id: getBuilderId(),
      name: e.name,
      plugins: [
        snapshotPlugin(),
        generatePreloadAssetsPlugin()
      ],
      remotes: [],
      shared: {},
      inBrowser: isBrowserEnv$1()
    };
    this.name = e.name, this.options = r, this.snapshotHandler = new SnapshotHandler(this), this.sharedHandler = new SharedHandler(this), this.remoteHandler = new RemoteHandler(this), this.shareScopeMap = this.sharedHandler.shareScopeMap, this.registerPlugins([
      ...r.plugins,
      ...e.plugins || []
    ]), this.options = this.formatOptions(r, e);
  }
}
let FederationInstance = null;
function init(t) {
  const e = getGlobalFederationInstance(t.name, t.version);
  if (e)
    return e.initOptions(t), FederationInstance || (FederationInstance = e), e;
  {
    const r = getGlobalFederationConstructor() || FederationHost;
    return FederationInstance = new r(t), setGlobalFederationInstance(FederationInstance), FederationInstance;
  }
}
function loadRemote(...t) {
  return assert(FederationInstance, "Please call init first"), FederationInstance.loadRemote.apply(FederationInstance, t);
}
setGlobalFederationConstructor(FederationHost);
function __awaiter(t, e, r, n) {
  function o(s) {
    return s instanceof r ? s : new r(function(i) {
      i(s);
    });
  }
  return new (r || (r = Promise))(function(s, i) {
    function l(d) {
      try {
        a(n.next(d));
      } catch (u) {
        i(u);
      }
    }
    function c(d) {
      try {
        a(n.throw(d));
      } catch (u) {
        i(u);
      }
    }
    function a(d) {
      d.done ? s(d.value) : o(d.value).then(l, c);
    }
    a((n = n.apply(t, e || [])).next());
  });
}
function __generator(t, e) {
  var r = { label: 0, sent: function() {
    if (s[0] & 1)
      throw s[1];
    return s[1];
  }, trys: [], ops: [] }, n, o, s, i = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return i.next = l(0), i.throw = l(1), i.return = l(2), typeof Symbol == "function" && (i[Symbol.iterator] = function() {
    return this;
  }), i;
  function l(a) {
    return function(d) {
      return c([a, d]);
    };
  }
  function c(a) {
    if (n)
      throw new TypeError("Generator is already executing.");
    for (; i && (i = 0, a[0] && (r = 0)), r; )
      try {
        if (n = 1, o && (s = a[0] & 2 ? o.return : a[0] ? o.throw || ((s = o.return) && s.call(o), 0) : o.next) && !(s = s.call(o, a[1])).done)
          return s;
        switch (o = 0, s && (a = [a[0] & 2, s.value]), a[0]) {
          case 0:
          case 1:
            s = a;
            break;
          case 4:
            return r.label++, { value: a[1], done: !1 };
          case 5:
            r.label++, o = a[1], a = [0];
            continue;
          case 7:
            a = r.ops.pop(), r.trys.pop();
            continue;
          default:
            if (s = r.trys, !(s = s.length > 0 && s[s.length - 1]) && (a[0] === 6 || a[0] === 2)) {
              r = 0;
              continue;
            }
            if (a[0] === 3 && (!s || a[1] > s[0] && a[1] < s[3])) {
              r.label = a[1];
              break;
            }
            if (a[0] === 6 && r.label < s[1]) {
              r.label = s[1], s = a;
              break;
            }
            if (s && r.label < s[2]) {
              r.label = s[2], r.ops.push(a);
              break;
            }
            s[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        a = e.call(t, r);
      } catch (d) {
        a = [6, d], o = 0;
      } finally {
        n = s = 0;
      }
    if (a[0] & 5)
      throw a[1];
    return { value: a[0] ? a[1] : void 0, done: !0 };
  }
}
typeof SuppressedError == "function" && SuppressedError;
var E_CANCELED = new Error("request for lock canceled"), Semaphore = function() {
  function t(e, r) {
    r === void 0 && (r = E_CANCELED), this._value = e, this._cancelError = r, this._queue = [], this._weightedWaiters = [];
  }
  return t.prototype.acquire = function(e, r) {
    var n = this;
    if (e === void 0 && (e = 1), r === void 0 && (r = 0), e <= 0)
      throw new Error("invalid weight ".concat(e, ": must be positive"));
    return new Promise(function(o, s) {
      var i = { resolve: o, reject: s, weight: e, priority: r }, l = findIndexFromEnd(n._queue, function(c) {
        return r <= c.priority;
      });
      l === -1 && e <= n._value ? n._dispatchItem(i) : n._queue.splice(l + 1, 0, i);
    });
  }, t.prototype.runExclusive = function(e) {
    return __awaiter(this, arguments, void 0, function(r, n, o) {
      var s, i, l;
      return n === void 0 && (n = 1), o === void 0 && (o = 0), __generator(this, function(c) {
        switch (c.label) {
          case 0:
            return [4, this.acquire(n, o)];
          case 1:
            s = c.sent(), i = s[0], l = s[1], c.label = 2;
          case 2:
            return c.trys.push([2, , 4, 5]), [4, r(i)];
          case 3:
            return [2, c.sent()];
          case 4:
            return l(), [7];
          case 5:
            return [2];
        }
      });
    });
  }, t.prototype.waitForUnlock = function(e, r) {
    var n = this;
    if (e === void 0 && (e = 1), r === void 0 && (r = 0), e <= 0)
      throw new Error("invalid weight ".concat(e, ": must be positive"));
    return this._couldLockImmediately(e, r) ? Promise.resolve() : new Promise(function(o) {
      n._weightedWaiters[e - 1] || (n._weightedWaiters[e - 1] = []), insertSorted(n._weightedWaiters[e - 1], { resolve: o, priority: r });
    });
  }, t.prototype.isLocked = function() {
    return this._value <= 0;
  }, t.prototype.getValue = function() {
    return this._value;
  }, t.prototype.setValue = function(e) {
    this._value = e, this._dispatchQueue();
  }, t.prototype.release = function(e) {
    if (e === void 0 && (e = 1), e <= 0)
      throw new Error("invalid weight ".concat(e, ": must be positive"));
    this._value += e, this._dispatchQueue();
  }, t.prototype.cancel = function() {
    var e = this;
    this._queue.forEach(function(r) {
      return r.reject(e._cancelError);
    }), this._queue = [];
  }, t.prototype._dispatchQueue = function() {
    for (this._drainUnlockWaiters(); this._queue.length > 0 && this._queue[0].weight <= this._value; )
      this._dispatchItem(this._queue.shift()), this._drainUnlockWaiters();
  }, t.prototype._dispatchItem = function(e) {
    var r = this._value;
    this._value -= e.weight, e.resolve([r, this._newReleaser(e.weight)]);
  }, t.prototype._newReleaser = function(e) {
    var r = this, n = !1;
    return function() {
      n || (n = !0, r.release(e));
    };
  }, t.prototype._drainUnlockWaiters = function() {
    if (this._queue.length === 0)
      for (var e = this._value; e > 0; e--) {
        var r = this._weightedWaiters[e - 1];
        !r || (r.forEach(function(s) {
          return s.resolve();
        }), this._weightedWaiters[e - 1] = []);
      }
    else
      for (var n = this._queue[0].priority, e = this._value; e > 0; e--) {
        var r = this._weightedWaiters[e - 1];
        if (!!r) {
          var o = r.findIndex(function(l) {
            return l.priority <= n;
          });
          (o === -1 ? r : r.splice(0, o)).forEach(function(l) {
            return l.resolve();
          });
        }
      }
  }, t.prototype._couldLockImmediately = function(e, r) {
    return (this._queue.length === 0 || this._queue[0].priority < r) && e <= this._value;
  }, t;
}();
function insertSorted(t, e) {
  var r = findIndexFromEnd(t, function(n) {
    return e.priority <= n.priority;
  });
  t.splice(r + 1, 0, e);
}
function findIndexFromEnd(t, e) {
  for (var r = t.length - 1; r >= 0; r--)
    if (e(t[r]))
      return r;
  return -1;
}
var Mutex = function() {
  function t(e) {
    this._semaphore = new Semaphore(1, e);
  }
  return t.prototype.acquire = function() {
    return __awaiter(this, arguments, void 0, function(e) {
      var r, n;
      return e === void 0 && (e = 0), __generator(this, function(o) {
        switch (o.label) {
          case 0:
            return [4, this._semaphore.acquire(1, e)];
          case 1:
            return r = o.sent(), n = r[1], [2, n];
        }
      });
    });
  }, t.prototype.runExclusive = function(e, r) {
    return r === void 0 && (r = 0), this._semaphore.runExclusive(function() {
      return e();
    }, 1, r);
  }, t.prototype.isLocked = function() {
    return this._semaphore.isLocked();
  }, t.prototype.waitForUnlock = function(e) {
    return e === void 0 && (e = 0), this._semaphore.waitForUnlock(1, e);
  }, t.prototype.release = function() {
    this._semaphore.isLocked() && this._semaphore.release();
  }, t.prototype.cancel = function() {
    return this._semaphore.cancel();
  }, t;
}();
function isMetaMaskProvider(t) {
  return t !== null && typeof t == "object" && t.hasOwnProperty("isMetaMask") && t.hasOwnProperty("request");
}
function detectMetaMaskProvider(t, { timeout: e = 3e3 } = {}) {
  let r = !1;
  return new Promise((n) => {
    const o = (s) => {
      const { info: i, provider: l } = s.detail;
      (i.rdns === "io.metamask" || i.rdns === "io.metamask.flask") && isMetaMaskProvider(l) && (n(l), r = !0);
    };
    typeof t.addEventListener == "function" && t.addEventListener(
      "eip6963:announceProvider",
      o
    ), setTimeout(() => {
      r || n(null);
    }, e), typeof t.dispatchEvent == "function" && t.dispatchEvent(new Event("eip6963:requestProvider"));
  });
}
async function waitForMetaMaskProvider(t, e = {}) {
  const { timeout: r = 3e3, retries: n = 0 } = e;
  let o = null;
  try {
    o = await detectMetaMaskProvider(t, { timeout: r });
  } catch {
  }
  return o || (n === 0 ? null : (o = await waitForMetaMaskProvider({ timeout: r, retries: n - 1 }), o));
}
async function detectMetamaskSupport(t) {
  return await waitForMetaMaskProvider(t, { retries: 3 });
}
var B, Z, R, U, Y, J;
class MetaMaskVirtualWallet {
  constructor() {
    C(this, B);
    C(this, R);
    C(this, Y);
    O(this, "id", "metamasksnaps");
    O(this, "name", "MetaMask Snaps");
    O(this, "icon", "data:image/svg+xml;utf8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAxNDIgMTM3Ij4KICA8cGF0aCBmaWxsPSIjMEEwQTBBIiBkPSJtMTMxLjIxNSAxMzAuNzI3LTI5Ljk3Ni04Ljg4My0yMi42MDQgMTMuNDQ5SDYyLjg2MWwtMjIuNjE5LTEzLjQ0OS0yOS45NiA4Ljg4My05LjExLTMwLjYzIDkuMTE3LTMzLjk5Mi05LjExNy0yOC43NDIgOS4xMS0zNS42MTggNDYuODE3IDI3Ljg0N2gyNy4yOThsNDYuODE4LTI3Ljg0NyA5LjExNyAzNS42MTgtOS4xMTcgMjguNzQyIDkuMTE3IDMzLjk5Mi05LjExNyAzMC42M1oiLz4KICA8cGF0aCBmaWxsPSIjODlCMEZGIiBkPSJtMTM4LjgyOCAxMDEuMjE5LTguMzY0IDI4LjEwMy0yOC4wODgtOC4zMzUtMi4yNTctLjY2OS0zLjIxOS0uOTU2LTEzLjc4LTQuMDkyLTEuMjA0LjE1OC0uNDY2IDEuNyAxNy4wMTUgNS4wNDgtMjAuMTQ1IDExLjk5SDYzLjE5M2wtMjAuMTQ0LTExLjk5IDE3LjAwOC01LjA0LS40NjctMS43MDgtMS4xOTYtLjE1OC0xNy4wMDcgNS4wNDgtMi4yNTcuNjY5LTI4LjA4IDguMzM1LTguMzY1LTI4LjEwM0wwIDEwMC4xMjFsOS41MyAzMi4wMDYgMzAuNTctOS4wNzkgMjIuNDY5IDEzLjM3NGgxNi4zNzZsMjIuNDY4LTEzLjM3NCAzMC41NyA5LjA3OSA5LjUyMy0zMi4wMDYtMi42NzggMS4wOThaIi8+CiAgPHBhdGggZmlsbD0iI0QwNzVGRiIgZD0iTTM5LjEzIDEwMS4yMTh2MTkuNzY4bDIuMjU3LS42Njl2LTE3Ljk0OGwxNy4wMDcgMTIuOSAxLjE5Ni4xNTggMS4xMTMtMS4yNDEtMjAuMDc2LTE1LjIyNUgyLjY0N2w4LjUwOC0zMS43MjgtMi4wMzgtMS4xMDZMMCAxMDAuMTJsMi42ODUgMS4wOThIMzkuMTNabTcwLjEyOC0xNy44MjctNy4yMjEgMS43ODN2Mi4zMzJsMTAuNjM2LTIuNjMzLjA2OC0xNy42NGgtMS40OTdsLS43Ni0uNTE4LS4wNiAxNC42Ni04LjcxOC04LjIyOUg4My42MTVsLS4zNDYgMi4yNjRoMTcuNTQybDguNDQ3IDcuOTgxWiIvPgogIDxwYXRoIGZpbGw9IiNEMDc1RkYiIGQ9Ik0zOS40NzUgODcuNTA2di0yLjMzMmwtNy4yMjItMS43ODMgOC40NDgtNy45OGgxNy41MzRsLS4zNDYtMi4yNjVINDAuMjQybC0uNzc1LjMwOS04LjM4IDcuOTItLjA2LTE0LjY2LS43Ni41MTloLTEuNTA0bC4wNjggMTcuNjQgMTAuNjQ0IDIuNjMyWm05MC44NzctMjAuMjczIDguNTA4IDMxLjcyOGgtMzcuOTc5bC0yMC4wNzcgMTUuMjI1IDEuMTE0IDEuMjQxIDEuMjAzLS4xNTggMTctMTIuOXYxNy45NDhsMi4yNTcuNjY5di0xOS43NjhoMzYuNDUybDIuNjc4LTEuMDk4LTkuMTEtMzMuOTkzLTIuMDQ2IDEuMTA2WiIvPgogIDxwYXRoIGZpbGw9IiNGRjVDMTYiIGQ9Ik0yOC43NjUgNjcuMjMzaDEuNTA0bC43Ni0uNTIgMjMuMzg2LTE2LjAyMSAzLjQ4MyAyMi40Ni4zNDYgMi4yNjUgNS40OTEgMzUuNDIyIDEuOTU2LS43OWguMjAzbC05LjUwOC02MS4zNSAxLjc1Mi0xNy45NzFoMjUuMjM3TDg1LjEyIDQ4LjcybC05LjUwOCA2MS4zMjhoLjIwNGwxLjk1NS43OSA1LjQ5MS0zNS40MjIuMzQ2LTIuMjY0aC4wMDhsMy40ODMtMjIuNDYxIDIzLjM3OCAxNi4wMjIuNzYuNTI2aDE5LjExNGwyLjAzOC0xLjEwNSA5LjExLTI4LjczNUwxMzEuOTM4IDAgODQuMTIgMjguNDY0SDU3LjM5NEw5LjU2OCAwIDAgMzcuNGw5LjExIDI4LjczNSAyLjAzOCAxLjEwNWgxNy42MWwuMDA3LS4wMDdabTExMC4zOTQtMjkuOS04Ljc3IDI3LjY0M2gtMTguNDIybC0yMy45NzMtMTYuNDIgNDIuNjM1LTQ0LjU2MiA4LjUzIDMzLjMzOFpNMTI0LjY3MiA2Ljk1NyA4Ny4xNTIgNDYuMTdsLTEuNTU4LTE1Ljk1NSAzOS4wNzgtMjMuMjU4Wm0tNjguNzYgMjMuMjUtMS41NSAxNS45NjMtMzcuNTItMzkuMjIgMzkuMDcgMjMuMjV2LjAwOFpNMi4zNDcgMzcuMzMzbDguNTMtMzMuMzM4IDQyLjYzNSA0NC41NjEtMjMuOTcyIDE2LjQySDExLjExOEwyLjM0NyAzNy4zMzJaIi8+CiAgPHBhdGggZmlsbD0iI0JBRjI0QSIgZD0iTTc3LjA3IDExMC4wNDlINjQuNDQybC00Ljg1MiA1LjM3OSAyLjQxNSA4LjgwOGgxNy40ODlsMi40MTUtOC44MDgtNC44NTItNS4zNzloLjAxNVptLjcgMTEuOTNINjMuNzVsLTEuNjQtNS45NzIgMy4zMTctMy42NzloMTAuNjY2bDMuMzE3IDMuNjc5LTEuNjQgNS45NzJaTTU4LjI2IDkwLjgwN2wtLjIxMS0uNTV2LS4wMTRsLTMuNzM5LTkuNjg5SDQ0LjJsLTQuNzIzIDQuNjE5djIuMzI0bDE2LjY3NiA0LjEyMiAyLjEwNi0uODEyWm0tMTMuMTQyLTcuOTg5aDcuNjQzbDIuNCA2LjIxNC0xMy4xMDQtMy4yMzUgMy4wNTQtMi45NzhoLjAwN1ptNDAuMjI4IDguODAyIDE2LjY3Ny00LjEyMXYtMi4zMjVsLTQuNzI0LTQuNjFoLTEwLjExbC0zLjczOCA5LjY4di4wMTVsLS4yMTEuNTUgMi4xMDYuODEyWm0xNC4wOS01LjgyMi0xMy4xMDQgMy4yMzUgMi40LTYuMjJoNy42NDJsMy4wNTQgMi45ODZoLjAwN1oiLz4KPC9zdmc+Cg==");
    O(this, "windowKey", "starknet_metamask");
    O(this, "provider", null);
    O(this, "swo", null);
    O(this, "lock");
    O(this, "version", "v2.0.0");
    this.lock = new Mutex();
  }
  async loadWallet(e) {
    return await j(this, R, U).call(this, e), this;
  }
  async hasSupport(e) {
    return this.provider = await detectMetamaskSupport(e), this.provider !== null;
  }
  async request(e) {
    return j(this, R, U).call(this).then((r) => r.request(
      e
    ));
  }
  on(e, r) {
    j(this, R, U).call(this).then(
      (n) => n.on(e, r)
    );
  }
  off(e, r) {
    j(this, R, U).call(this).then(
      (n) => n.off(e, r)
    );
  }
}
B = new WeakSet(), Z = async function(e) {
  this.provider || (this.provider = await detectMetamaskSupport(e)), await init({
    name: "MetaMaskStarknetSnapWallet",
    remotes: [
      {
        name: "MetaMaskStarknetSnapWallet",
        alias: "MetaMaskStarknetSnapWallet",
        entry: `https://snaps.consensys.io/starknet/get-starknet/v1/remoteEntry.js?ts=${Date.now()}`
      }
    ]
  });
  const r = await loadRemote("MetaMaskStarknetSnapWallet/index");
  if (!r)
    throw new Error("Failed to load MetaMask Wallet");
  return new r.MetaMaskSnapWallet(
    this.provider,
    "*"
  );
}, R = new WeakSet(), U = async function(e = window) {
  return this.lock.runExclusive(async () => (this.swo || (this.swo = await j(this, B, Z).call(this, e), j(this, Y, J).call(this)), this.swo));
}, Y = new WeakSet(), J = function() {
  this.swo && (this.version = this.swo.version, this.name = this.swo.name, this.id = this.swo.id, this.icon = this.swo.icon);
};
const metaMaskVirtualWallet = new MetaMaskVirtualWallet();
var X, q;
const wallets = [
  {
    id: "argentX",
    name: "Argent X",
    icon: "data:image/svg+xml;base64,Cjxzdmcgd2lkdGg9IjQwIiBoZWlnaHQ9IjM2IiB2aWV3Qm94PSIwIDAgNDAgMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0yNC43NTgyIC0zLjk3MzY0ZS0wN0gxNC42MjM4QzE0LjI4NTEgLTMuOTczNjRlLTA3IDE0LjAxMzggMC4yODExNzggMTQuMDA2NCAwLjYzMDY4M0MxMy44MDE3IDEwLjQ1NDkgOC44MjIzNCAxOS43NzkyIDAuMjUxODkzIDI2LjM4MzdDLTAuMDIwMjA0NiAyNi41OTMzIC0wLjA4MjE5NDYgMjYuOTg3MiAwLjExNjczNCAyNy4yNzA5TDYuMDQ2MjMgMzUuNzM0QzYuMjQ3OTYgMzYuMDIyIDYuNjQwOTkgMzYuMDg3IDYuOTE3NjYgMzUuODc1NEMxMi4yNzY1IDMxLjc3MjggMTYuNTg2OSAyNi44MjM2IDE5LjY5MSAyMS4zMzhDMjIuNzk1MSAyNi44MjM2IDI3LjEwNTcgMzEuNzcyOCAzMi40NjQ2IDM1Ljg3NTRDMzIuNzQxIDM2LjA4NyAzMy4xMzQxIDM2LjAyMiAzMy4zMzYxIDM1LjczNEwzOS4yNjU2IDI3LjI3MDlDMzkuNDY0MiAyNi45ODcyIDM5LjQwMjIgMjYuNTkzMyAzOS4xMzA0IDI2LjM4MzdDMzAuNTU5NyAxOS43NzkyIDI1LjU4MDQgMTAuNDU0OSAyNS4zNzU5IDAuNjMwNjgzQzI1LjM2ODUgMC4yODExNzggMjUuMDk2OSAtMy45NzM2NGUtMDcgMjQuNzU4MiAtMy45NzM2NGUtMDdaIiBmaWxsPSIjRkY4NzVCIi8+Cjwvc3ZnPgo=",
    downloads: {
      chrome: "https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/argent-x",
      edge: "https://microsoftedge.microsoft.com/addons/detail/argent-x/ajcicjlkibolbeaaagejfhnofogocgcj"
    }
  },
  {
    id: "braavos",
    name: "Braavos",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aAogICAgICAgIGQ9Ik02Mi43MDUgMTMuOTExNkM2Mi44MzU5IDE0LjEzMzMgNjIuNjYyMSAxNC40MDcgNjIuNDAzOSAxNC40MDdDNTcuMTgwNyAxNC40MDcgNTIuOTM0OCAxOC41NDI3IDUyLjgzNTEgMjMuNjgxN0M1MS4wNDY1IDIzLjM0NzcgNDkuMTkzMyAyMy4zMjI2IDQ3LjM2MjYgMjMuNjMxMUM0Ny4yMzYxIDE4LjUxNTYgNDMuMDAwOSAxNC40MDcgMzcuNzk0OCAxNC40MDdDMzcuNTM2NSAxNC40MDcgMzcuMzYyNSAxNC4xMzMxIDM3LjQ5MzUgMTMuOTExMkM0MC4wMjE3IDkuNjI4MDkgNDQuNzIwNCA2Ljc1IDUwLjA5OTEgNi43NUM1NS40NzgxIDYuNzUgNjAuMTc2OSA5LjYyODI2IDYyLjcwNSAxMy45MTE2WiIKICAgICAgICBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMzcyXzQwMjU5KSIgLz4KICAgIDxwYXRoCiAgICAgICAgZD0iTTc4Ljc2MDYgNDUuODcxOEM4MC4yNzI1IDQ2LjMyOTcgODEuNzAyNSA0NS4wMDU1IDgxLjE3MTQgNDMuNTIyMkM3Ni40MTM3IDMwLjIzMzQgNjEuMzkxMSAyNC44MDM5IDUwLjAyNzcgMjQuODAzOUMzOC42NDQyIDI0LjgwMzkgMjMuMjg2OCAzMC40MDcgMTguODc1NCA0My41OTEyQzE4LjM4MjQgNDUuMDY0NSAxOS44MDgzIDQ2LjM0NDYgMjEuMjk3OCA0NS44ODgxTDQ4Ljg3MiAzNy40MzgxQzQ5LjUzMzEgMzcuMjM1NSA1MC4yMzk5IDM3LjIzNDQgNTAuOTAxNyAzNy40MzQ4TDc4Ljc2MDYgNDUuODcxOFoiCiAgICAgICAgZmlsbD0idXJsKCNwYWludDFfbGluZWFyXzM3Ml80MDI1OSkiIC8+CiAgICA8cGF0aAogICAgICAgIGQ9Ik0xOC44MTMyIDQ4LjE3MDdMNDguODkzNSAzOS4wNDcyQzQ5LjU1MDYgMzguODQ3OCA1MC4yNTI0IDM4Ljg0NzMgNTAuOTA5OCAzOS4wNDU2TDgxLjE3ODEgNDguMTc1MkM4My42OTEyIDQ4LjkzMzIgODUuNDExIDUxLjI0ODMgODUuNDExIDUzLjg3MzVWODEuMjIzM0M4NS4yOTQ0IDg3Ljg5OTEgNzkuMjk3NyA5My4yNSA3Mi42MjQ1IDkzLjI1SDYxLjU0MDZDNjAuNDQ0OSA5My4yNSA1OS41NTc3IDkyLjM2MzcgNTkuNTU3NyA5MS4yNjhWODEuNjc4OUM1OS41NTc3IDc3LjkwMzEgNjEuNzkyMSA3NC40ODU1IDY1LjI0OTggNzIuOTcyOUM2OS44ODQ5IDcwLjk0NTQgNzUuMzY4MSA2OC4yMDI4IDc2LjM5OTQgNjIuNjk5MkM3Ni43MzIzIDYwLjkyMjkgNzUuNTc0MSA1OS4yMDk0IDczLjgwMjQgNTguODU3M0M2OS4zMjI2IDU3Ljk2NjcgNjQuMzU2MiA1OC4zMTA3IDYwLjE1NjQgNjAuMTg5M0M1NS4zODg3IDYyLjMyMTkgNTQuMTQxNSA2NS44Njk0IDUzLjY3OTcgNzAuNjMzN0w1My4xMjAxIDc1Ljc2NjJDNTIuOTQ5MSA3Ny4zMzQ5IDUxLjQ3ODUgNzguNTM2NiA0OS45MDE0IDc4LjUzNjZDNDguMjY5OSA3OC41MzY2IDQ3LjA0NjUgNzcuMjk0IDQ2Ljg2OTYgNzUuNjcxMkw0Ni4zMjA0IDcwLjYzMzdDNDUuOTI0OSA2Ni41NTI5IDQ1LjIwNzkgNjIuNTg4NyA0MC45ODk1IDYwLjcwMThDMzYuMTc3NiA1OC41NDk0IDMxLjM0MTkgNTcuODM0NyAyNi4xOTc2IDU4Ljg1NzNDMjQuNDI2IDU5LjIwOTQgMjMuMjY3OCA2MC45MjI5IDIzLjYwMDcgNjIuNjk5MkMyNC42NDEgNjguMjUwNyAzMC4wODEyIDcwLjkzMDUgMzQuNzUwMyA3Mi45NzI5QzM4LjIwOCA3NC40ODU1IDQwLjQ0MjQgNzcuOTAzMSA0MC40NDI0IDgxLjY3ODlWOTEuMjY2M0M0MC40NDI0IDkyLjM2MiAzOS41NTU1IDkzLjI1IDM4LjQ1OTkgOTMuMjVIMjcuMzc1NkMyMC43MDI0IDkzLjI1IDE0LjcwNTcgODcuODk5MSAxNC41ODkxIDgxLjIyMzNWNTMuODY2M0MxNC41ODkxIDUxLjI0NDYgMTYuMzA0NSA0OC45MzE2IDE4LjgxMzIgNDguMTcwN1oiCiAgICAgICAgZmlsbD0idXJsKCNwYWludDJfbGluZWFyXzM3Ml80MDI1OSkiIC8+CiAgICA8ZGVmcz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMzcyXzQwMjU5IiB4MT0iNDkuMzA1NyIgeTE9IjIuMDc5IiB4Mj0iODAuMzYyNyIgeTI9IjkzLjY1OTciCiAgICAgICAgICAgIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0Y1RDQ1RSIgLz4KICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjRkY5NjAwIiAvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPSJwYWludDFfbGluZWFyXzM3Ml80MDI1OSIgeDE9IjQ5LjMwNTciIHkxPSIyLjA3OSIgeDI9IjgwLjM2MjciIHkyPSI5My42NTk3IgogICAgICAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGNUQ0NUUiIC8+CiAgICAgICAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ZGOTYwMCIgLz4KICAgICAgICA8L2xpbmVhckdyYWRpZW50PgogICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD0icGFpbnQyX2xpbmVhcl8zNzJfNDAyNTkiIHgxPSI0OS4zMDU3IiB5MT0iMi4wNzkiIHgyPSI4MC4zNjI3IiB5Mj0iOTMuNjU5NyIKICAgICAgICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjRjVENDVFIiAvPgogICAgICAgICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjk2MDAiIC8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDwvZGVmcz4KPC9zdmc+",
    downloads: {
      chrome: "https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/braavos-wallet",
      edge: "https://microsoftedge.microsoft.com/addons/detail/braavos-wallet/hkkpjehhcnhgefhbdcgfkeegglpjchdc",
      ios: `https://link.braavos.app/dapp/${(X = ssrSafeWindow == null ? void 0 : ssrSafeWindow.location) == null ? void 0 : X.host}`,
      android: `https://link.braavos.app/dapp/${(q = ssrSafeWindow == null ? void 0 : ssrSafeWindow.location) == null ? void 0 : q.host}`
    }
  },
  {
    id: "metamasksnaps",
    name: "Metamask Snaps",
    icon: metaMaskVirtualWallet.icon,
    downloads: {
      chrome: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/",
      edge: "https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US"
    }
  },
  {
    id: "okxwallet",
    name: "OKX Wallet",
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJDSURBVHgB7Zq9jtpAEMfHlhEgQLiioXEkoAGECwoKxMcTRHmC5E3IoyRPkPAEkI7unJYmTgEFTYwA8a3NTKScLnCHN6c9r1e3P2llWQy7M/s1Gv1twCP0ej37dDq9x+Zut1t3t9vZjDEHIiSRSPg4ZpDL5fxkMvn1cDh8m0wmfugfO53OoFQq/crn8wxfY9EymQyrVCqMfHvScZx1p9ls3pFxXBy/bKlUipGPrVbLuQqAfsCliq3zl0H84zwtjQrOw4Mt1W63P5LvBm2d+Xz+YzqdgkqUy+WgWCy+Mc/nc282m4FqLBYL+3g8fjDxenq72WxANZbLJeA13zDX67UDioL5ybXwafMYu64Ltn3bdDweQ5R97fd7GyhBQMipx4POeEDHIu2LfDdBIGGz+hJ9CQ1ABjoA2egAZPM6AgiCAEQhsi/C4jHyPA/6/f5NG3Ks2+3CYDC4aTccDrn6ojG54MnEvG00GoVmWLIRNZ7wTCwDHYBsdACy0QHIhiuRETxlICWpMMhGZHmqS8qH6JLyGegAZKMDkI0uKf8X4SWlaZo+Pp1bRrwlJU8ZKLIvUjKh0WiQ3sRUbNVq9c5Ebew7KEo2m/1p4jJ4qAmDaqDQBzj5XyiAT4VCQezJigAU+IDU+z8vJFnGWeC+bKQV/5VZ71FV6L7PA3gg3tXrdQ+DgLhC+75Wq3no69P3MC0NFQpx2lL04Ql9gHK1bRDjsSBIvScBnDTk1WrlGIZBorIDEYJj+rhdgnQ67VmWRe0zlplXl81vcyEt0rSoYDUAAAAASUVORK5CYII=",
    downloads: {
      chrome: "https://chrome.google.com/webstore/detail/mcohilncbfahbmgdjkbpemcciiolgcge",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/okexwallet",
      edge: "https://microsoftedge.microsoft.com/addons/detail/%E6%AC%A7%E6%98%93-web3-%E9%92%B1%E5%8C%85/pbpjkcldjiffchgbbndmhojiacbgflha",
      safari: "https://apps.apple.com/us/app/okx-wallet/id6463797825"
    }
  },
  {
    id: "keplr",
    name: "Keplr",
    icon: "data:image/png;base64,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",
    downloads: {
      chrome: "https://chrome.google.com/webstore/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
      firefox: "https://addons.mozilla.org/en-US/firefox/addon/keplr",
      edge: "https://microsoftedge.microsoft.com/addons/detail/keplr/ocodgmmffbkkeecmadcijjhkmeohinei"
    }
  },
  {
    id: "fordefi",
    name: "Fordefi",
    icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgY2xpcC1wYXRoPSJ1cmwoI2NsaXAwXzEzNDk0XzY2MjU0KSI+CjxwYXRoIGQ9Ik0xMC44NzY5IDE1LjYzNzhIMS41VjE4LjM5OUMxLjUgMTkuODAxMyAyLjYzNDQ3IDIwLjkzOCA0LjAzMzkyIDIwLjkzOEg4LjI0OTkyTDEwLjg3NjkgMTUuNjM3OFoiIGZpbGw9IiM3OTk0RkYiLz4KPHBhdGggZD0iTTEuNSA5Ljc3NTUxSDE5LjA1MTZMMTcuMDEzOSAxMy44NzExSDEuNVY5Ljc3NTUxWiIgZmlsbD0iIzQ4NkRGRiIvPgo8cGF0aCBkPSJNNy42NTk5NiAzSDEuNTI0NDFWOC4wMDcwNEgyMi40NjEyVjNIMTYuMzI1NlY2LjczOTQ0SDE1LjA2MDZWM0g4LjkyNTAyVjYuNzM5NDRINy42NTk5NlYzWiIgZmlsbD0iIzVDRDFGQSIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzEzNDk0XzY2MjU0Ij4KPHJlY3Qgd2lkdGg9IjIxIiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMS41IDMpIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==",
    downloads: {
      chrome: "https://chrome.google.com/webstore/detail/fordefi/hcmehenccjdmfbojapcbcofkgdpbnlle"
    }
  }
];
var z, L, P, $, ee, k, W;
class LocalStorageWrapper {
  constructor(e) {
    C(this, $);
    C(this, k);
    C(this, z, !1);
    C(this, L, void 0);
    C(this, P, void 0);
    O(this, "value");
    F(this, P, e), j(this, k, W).call(this);
  }
  set(e) {
    return !S(this, z) && !j(this, k, W).call(this) ? !1 : (this.delete(), this.value = e, e && (F(this, L, `${S(this, P)}-${generateUID()}`), localStorage.setItem(S(this, L), e)), !0);
  }
  get() {
    return j(this, $, ee).call(this), this.value;
  }
  delete() {
    return !S(this, z) && !j(this, k, W).call(this) ? !1 : (this.value = null, S(this, L) && localStorage.removeItem(S(this, L)), !0);
  }
}
z = new WeakMap(), L = new WeakMap(), P = new WeakMap(), $ = new WeakSet(), ee = function() {
  this.value && this.set(this.value);
}, k = new WeakSet(), W = function() {
  try {
    !S(this, z) && typeof window < "u" && (F(this, L, Object.keys(localStorage).find(
      (e) => e.startsWith(S(this, P))
    )), F(this, z, !0), S(this, L) && this.set(localStorage.getItem(S(this, L))));
  } catch (e) {
    console.warn(e);
  }
  return S(this, z);
};
function isEVMProvider(t) {
  return t !== null && typeof t == "object" && t.hasOwnProperty("sendAsync") && t.hasOwnProperty("request");
}
async function detectEVMProvider(t, { timeout: e = 3e3 } = {}) {
  let r = !1, n = [];
  return new Promise((o) => {
    const s = (i) => {
      let { info: l, provider: c } = i.detail;
      l.rdns === "com.bitget.web3" ? l = { ...l, name: "Bitget Wallet via Rosettanet" } : l.rdns === "com.okex.wallet" && (l = { ...l, name: "OKX Wallet via Rosettanet" }), n.some((a) => a.info.rdns === l.rdns) || n.push({ info: l, provider: c }), isEVMProvider(c) && (o(n), r = !0);
    };
    typeof t.addEventListener == "function" && t.addEventListener(
      "eip6963:announceProvider",
      s
    ), setTimeout(() => {
      r || o([{ provider: null, info: null }]);
    }, e), typeof t.dispatchEvent == "function" && t.dispatchEvent(new Event("eip6963:requestProvider"));
  });
}
async function waitForEVMProvider(t, e = {}) {
  const { timeout: r = 3e3, retries: n = 0 } = e;
  try {
    const o = await detectEVMProvider(t, { timeout: r });
    if (o[0].provider)
      return o;
  } catch {
  }
  return n === 0 ? [{ provider: null, info: null }] : waitForEVMProvider(t, {
    timeout: r,
    retries: n - 1
  });
}
async function detectEVMSupport(t) {
  return await waitForEVMProvider(t, {
    retries: 3
  });
}
const Permission = {
  ACCOUNTS: "accounts"
};
function filterBy(t, e) {
  var r, n;
  if ((r = e == null ? void 0 : e.include) != null && r.length) {
    const o = new Set(e.include);
    return t.filter((s) => o.has(s.id));
  }
  if ((n = e == null ? void 0 : e.exclude) != null && n.length) {
    const o = new Set(e.exclude);
    return t.filter((s) => !o.has(s.id));
  }
  return t;
}
const filterByAuthorized = async (t) => {
  const e = await Promise.all(
    t.map(async (r) => {
      try {
        return (await r.request({
          type: "wallet_getPermissions"
        })).includes(Permission.ACCOUNTS);
      } catch {
        return !1;
      }
    })
  );
  return t.filter((r, n) => e[n]);
}, virtualWalletKeys = ensureKeysArray({
  id: !0,
  name: !0,
  icon: !0,
  windowKey: !0,
  loadWallet: !0,
  hasSupport: !0
}), fullWalletKeys = ensureKeysArray({
  id: !0,
  name: !0,
  version: !0,
  icon: !0,
  request: !0,
  on: !0,
  off: !0
}), evmWalletKeys = ensureKeysArray({
  sendAsync: !0,
  send: !0,
  request: !0
});
function createWalletGuard(t) {
  return function(r) {
    return r !== null && typeof r == "object" && t.every((n) => n in r);
  };
}
const isFullWallet = createWalletGuard(fullWalletKeys), isVirtualWallet = createWalletGuard(virtualWalletKeys), isEvmWallet = createWalletGuard(evmWalletKeys);
function isWalletObject(t) {
  try {
    return isFullWallet(t) || isVirtualWallet(t) || isEvmWallet(t);
  } catch {
  }
  return !1;
}
function scanObjectForWallets(t, e) {
  return Object.values(
    Object.getOwnPropertyNames(t).reduce((r, n) => {
      if (n.startsWith("starknet")) {
        const o = t[n];
        e(o) && !r[o.id] && (r[o.id] = o);
      }
      return r;
    }, {})
  );
}
const sortBy = (t, e) => {
  if (e && Array.isArray(e)) {
    t.sort((n, o) => e.indexOf(n.id) - e.indexOf(o.id));
    const r = t.length - e.length;
    return [
      ...t.slice(r),
      ...shuffle(t.slice(0, r))
    ];
  } else
    return shuffle(t);
}, virtualWallets = [metaMaskVirtualWallet];
function initiateVirtualWallets(t) {
  virtualWallets.forEach(async (e) => {
    e.windowKey in t || await e.hasSupport(t) && (t[e.windowKey] = e);
  });
}
const virtualWalletsMap = {};
async function resolveVirtualWallet(t, e) {
  let r = virtualWalletsMap[e.id];
  return r || (r = await e.loadWallet(t), virtualWalletsMap[e.id] = r), r;
}
const defaultOptions = {
  windowObject: ssrSafeWindow != null ? ssrSafeWindow : {},
  isWalletObject,
  storageFactoryImplementation: (t) => new LocalStorageWrapper(t)
};
function getStarknet(t = {}) {
  const { storageFactoryImplementation: e, windowObject: r, isWalletObject: n } = {
    ...defaultOptions,
    ...t
  }, o = e("gsw-last");
  initiateVirtualWallets(r);
  let s;
  async function i() {
    s = await detectEVMSupport(r);
  }
  return i(), {
    getAvailableWallets: async (l = {}) => {
      const c = scanObjectForWallets(
        r,
        n
      );
      return s.forEach((a) => {
        a.provider && a.info && c.push({
          ...a.provider,
          id: a.info.name,
          name: a.info.name,
          icon: a.info.icon,
          version: a.info.icon,
          on: a.provider.on,
          off: a.provider.off
        });
      }), pipe$1(
        (a) => filterBy(a, l),
        (a) => sortBy(a, l.sort)
      )(c);
    },
    getAuthorizedWallets: async (l = {}) => {
      const c = scanObjectForWallets(
        r,
        n
      );
      return pipe$1(
        (a) => filterByAuthorized(a),
        (a) => filterBy(a, l),
        (a) => sortBy(a, l.sort)
      )(c);
    },
    getDiscoveryWallets: async (l = {}) => pipe$1(
      (c) => filterBy(c, l),
      (c) => sortBy(c, l.sort)
    )(wallets),
    getLastConnectedWallet: async () => {
      const l = o.get(), a = scanObjectForWallets(r, n).find(
        (u) => u.id === l
      ), [d] = await filterByAuthorized(
        a ? [a] : []
      );
      return d || (o.delete(), null);
    },
    discoverVirtualWallets: async (l = []) => {
      const c = new Set(l), a = c.size > 0 ? virtualWallets.filter(
        (d) => c.has(d.name) || c.has(d.id)
      ) : virtualWallets;
      await Promise.all(
        a.map(async (d) => {
          await d.hasSupport(r) && (r[d.windowKey] = d);
        })
      );
    },
    enable: async (l, c) => {
      let a;
      if (isVirtualWallet(l))
        a = await resolveVirtualWallet(r, l);
      else if (isEvmWallet(l)) {
        const h = (await detectEVMSupport(r)).find(
          ({ info: g }) => g && g.name === l.name
        );
        if (h && h.provider)
          a = h.provider;
        else
          throw new Error("Failed to connect to the selected EVM wallet");
      } else if (isFullWallet(l))
        a = l;
      else
        throw new Error("Invalid wallet object");
      isEvmWallet(a) ? await a.request({ method: "eth_requestAccounts" }) : await a.request({
        type: "wallet_requestAccounts",
        params: {
          silent_mode: c == null ? void 0 : c.silent_mode
        }
      });
      const d = await a.request({
        type: "wallet_getPermissions"
      });
      if (!(d != null && d.includes(Permission.ACCOUNTS)))
        throw new Error("Failed to connect to wallet");
      return o.set(a.id), a;
    },
    disconnect: async ({ clearLastWallet: l } = {}) => {
      l && o.delete();
    }
  };
}
const main = getStarknet();
export {
  main as default,
  getStarknet,
  isWalletObject,
  scanObjectForWallets,
  ssrSafeWindow
};
