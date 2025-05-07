var ee = Object.defineProperty;
var W = (r) => {
  throw TypeError(r);
};
var te = (r, e, t) => e in r ? ee(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var D = (r, e, t) => te(r, typeof e != "symbol" ? e + "" : e, t), K = (r, e, t) => e.has(r) || W("Cannot " + t);
var M = (r, e, t) => (K(r, e, "read from private field"), t ? t.call(r) : e.get(r)), G = (r, e, t) => e.has(r) ? W("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), H = (r, e, t, s) => (K(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t);
const PUBLIC_NEXUS_BASE_URL = "https://shopify-nexus.tko.rudgalvis.com";
class NexusApi {
  constructor() {
    D(this, "BASE_URL", PUBLIC_NEXUS_BASE_URL);
    D(this, "API_VERSION_PATH", "api");
    D(this, "API_ROUTES", {
      GET_AUTOMATIC_DISCOUNT: (e, t) => `automatic-discount/${e}/${t}`,
      GET_CURRENCY_RATES: (e) => `currency-rates/${e}`
    });
  }
  async getAutomaticDiscount(e, t) {
    const s = await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_AUTOMATIC_DISCOUNT(e, t)}`, { method: "GET" });
    try {
      return await s.json();
    } catch (i) {
      console.error(i);
    }
  }
  async getCurrencyRates(e) {
    const t = await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_CURRENCY_RATES(e)}`, { method: "GET" });
    try {
      return await t.json();
    } catch (s) {
      return console.error(s), null;
    }
  }
}
const CLIENT$1 = "GraphQL Client", MIN_RETRIES = 0, MAX_RETRIES = 3, GQL_API_ERROR = "An error occurred while fetching from the API. Review 'graphQLErrors' for details.", UNEXPECTED_CONTENT_TYPE_ERROR = "Response returned unexpected Content-Type:", NO_DATA_OR_ERRORS_ERROR = "An unknown error has occurred. The API did not return a data object or any errors in its response.", CONTENT_TYPES = {
  json: "application/json",
  multipart: "multipart/mixed"
}, SDK_VARIANT_HEADER$1 = "X-SDK-Variant", SDK_VERSION_HEADER$1 = "X-SDK-Version", DEFAULT_SDK_VARIANT$1 = "shopify-graphql-client", DEFAULT_CLIENT_VERSION$1 = "1.3.2", RETRY_WAIT_TIME = 1e3, RETRIABLE_STATUS_CODES = [429, 503], DEFER_OPERATION_REGEX = /@(defer)\b/i, NEWLINE_SEPARATOR = `\r
`, BOUNDARY_HEADER_REGEX = /boundary="?([^=";]+)"?/i, HEADER_SEPARATOR = NEWLINE_SEPARATOR + NEWLINE_SEPARATOR;
function formatErrorMessage(r, e = CLIENT$1) {
  return r.startsWith(`${e}`) ? r : `${e}: ${r}`;
}
function getErrorMessage(r) {
  return r instanceof Error ? r.message : JSON.stringify(r);
}
function getErrorCause(r) {
  return r instanceof Error && r.cause ? r.cause : void 0;
}
function combineErrors(r) {
  return r.flatMap(({ errors: e }) => e ?? []);
}
function validateRetries({ client: r, retries: e }) {
  if (e !== void 0 && (typeof e != "number" || e < MIN_RETRIES || e > MAX_RETRIES))
    throw new Error(`${r}: The provided "retries" value (${e}) is invalid - it cannot be less than ${MIN_RETRIES} or greater than ${MAX_RETRIES}`);
}
function getKeyValueIfValid(r, e) {
  return e && (typeof e != "object" || Array.isArray(e) || typeof e == "object" && Object.keys(e).length > 0) ? { [r]: e } : {};
}
function buildDataObjectByPath(r, e) {
  if (r.length === 0)
    return e;
  const s = {
    [r.pop()]: e
  };
  return r.length === 0 ? s : buildDataObjectByPath(r, s);
}
function combineObjects(r, e) {
  return Object.keys(e || {}).reduce((t, s) => (typeof e[s] == "object" || Array.isArray(e[s])) && r[s] ? (t[s] = combineObjects(r[s], e[s]), t) : (t[s] = e[s], t), Array.isArray(r) ? [...r] : { ...r });
}
function buildCombinedDataObject([r, ...e]) {
  return e.reduce(combineObjects, { ...r });
}
function generateHttpFetch({ clientLogger: r, customFetchApi: e = fetch, client: t = CLIENT$1, defaultRetryWaitTime: s = RETRY_WAIT_TIME, retriableCodes: i = RETRIABLE_STATUS_CODES }) {
  const n = async (o, l, c) => {
    const u = l + 1, d = c + 1;
    let f;
    try {
      if (f = await e(...o), r({
        type: "HTTP-Response",
        content: {
          requestParams: o,
          response: f
        }
      }), !f.ok && i.includes(f.status) && u <= d)
        throw new Error();
      return f;
    } catch (h) {
      if (u <= d) {
        const _ = f == null ? void 0 : f.headers.get("Retry-After");
        return await sleep$1(_ ? parseInt(_, 10) : s), r({
          type: "HTTP-Retry",
          content: {
            requestParams: o,
            lastResponse: f,
            retryAttempt: l,
            maxRetries: c
          }
        }), n(o, u, c);
      }
      throw new Error(formatErrorMessage(`${c > 0 ? `Attempted maximum number of ${c} network retries. Last message - ` : ""}${getErrorMessage(h)}`, t));
    }
  };
  return n;
}
async function sleep$1(r) {
  return new Promise((e) => setTimeout(e, r));
}
function createGraphQLClient({ headers: r, url: e, customFetchApi: t = fetch, retries: s = 0, logger: i }) {
  validateRetries({ client: CLIENT$1, retries: s });
  const n = {
    headers: r,
    url: e,
    retries: s
  }, o = generateClientLogger(i), l = generateHttpFetch({
    customFetchApi: t,
    clientLogger: o,
    defaultRetryWaitTime: RETRY_WAIT_TIME
  }), c = generateFetch(l, n), u = generateRequest(c), d = generateRequestStream(c);
  return {
    config: n,
    fetch: c,
    request: u,
    requestStream: d
  };
}
function generateClientLogger(r) {
  return (e) => {
    r && r(e);
  };
}
async function processJSONResponse(r) {
  const { errors: e, data: t, extensions: s } = await r.json();
  return {
    ...getKeyValueIfValid("data", t),
    ...getKeyValueIfValid("extensions", s),
    headers: r.headers,
    ...e || !t ? {
      errors: {
        networkStatusCode: r.status,
        message: formatErrorMessage(e ? GQL_API_ERROR : NO_DATA_OR_ERRORS_ERROR),
        ...getKeyValueIfValid("graphQLErrors", e),
        response: r
      }
    } : {}
  };
}
function generateFetch(r, { url: e, headers: t, retries: s }) {
  return async (i, n = {}) => {
    const { variables: o, headers: l, url: c, retries: u, keepalive: d, signal: f } = n, h = JSON.stringify({
      query: i,
      variables: o
    });
    validateRetries({ client: CLIENT$1, retries: u });
    const _ = Object.entries({
      ...t,
      ...l
    }).reduce((v, [m, y]) => (v[m] = Array.isArray(y) ? y.join(", ") : y.toString(), v), {});
    return !_[SDK_VARIANT_HEADER$1] && !_[SDK_VERSION_HEADER$1] && (_[SDK_VARIANT_HEADER$1] = DEFAULT_SDK_VARIANT$1, _[SDK_VERSION_HEADER$1] = DEFAULT_CLIENT_VERSION$1), r([
      c ?? e,
      {
        method: "POST",
        headers: _,
        body: h,
        signal: f,
        keepalive: d
      }
    ], 1, u ?? s);
  };
}
function generateRequest(r) {
  return async (...e) => {
    if (DEFER_OPERATION_REGEX.test(e[0]))
      throw new Error(formatErrorMessage("This operation will result in a streamable response - use requestStream() instead."));
    try {
      const t = await r(...e), { status: s, statusText: i } = t, n = t.headers.get("content-type") || "";
      return t.ok ? n.includes(CONTENT_TYPES.json) ? processJSONResponse(t) : {
        errors: {
          networkStatusCode: s,
          message: formatErrorMessage(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${n}`),
          response: t
        }
      } : {
        errors: {
          networkStatusCode: s,
          message: formatErrorMessage(i),
          response: t
        }
      };
    } catch (t) {
      return {
        errors: {
          message: getErrorMessage(t)
        }
      };
    }
  };
}
async function* getStreamBodyIterator(r) {
  const e = new TextDecoder();
  if (r.body[Symbol.asyncIterator])
    for await (const t of r.body)
      yield e.decode(t);
  else {
    const t = r.body.getReader();
    let s;
    try {
      for (; !(s = await t.read()).done; )
        yield e.decode(s.value);
    } finally {
      t.cancel();
    }
  }
}
function readStreamChunk(r, e) {
  return {
    async *[Symbol.asyncIterator]() {
      try {
        let t = "";
        for await (const s of r)
          if (t += s, t.indexOf(e) > -1) {
            const i = t.lastIndexOf(e), o = t.slice(0, i).split(e).filter((l) => l.trim().length > 0).map((l) => l.slice(l.indexOf(HEADER_SEPARATOR) + HEADER_SEPARATOR.length).trim());
            o.length > 0 && (yield o), t = t.slice(i + e.length), t.trim() === "--" && (t = "");
          }
      } catch (t) {
        throw new Error(`Error occured while processing stream payload - ${getErrorMessage(t)}`);
      }
    }
  };
}
function createJsonResponseAsyncIterator(r) {
  return {
    async *[Symbol.asyncIterator]() {
      yield {
        ...await processJSONResponse(r),
        hasNext: !1
      };
    }
  };
}
function getResponseDataFromChunkBodies(r) {
  return r.map((e) => {
    try {
      return JSON.parse(e);
    } catch (t) {
      throw new Error(`Error in parsing multipart response - ${getErrorMessage(t)}`);
    }
  }).map((e) => {
    const { data: t, incremental: s, hasNext: i, extensions: n, errors: o } = e;
    if (!s)
      return {
        data: t || {},
        ...getKeyValueIfValid("errors", o),
        ...getKeyValueIfValid("extensions", n),
        hasNext: i
      };
    const l = s.map(({ data: c, path: u, errors: d }) => ({
      data: c && u ? buildDataObjectByPath(u, c) : {},
      ...getKeyValueIfValid("errors", d)
    }));
    return {
      data: l.length === 1 ? l[0].data : buildCombinedDataObject([
        ...l.map(({ data: c }) => c)
      ]),
      ...getKeyValueIfValid("errors", combineErrors(l)),
      hasNext: i
    };
  });
}
function validateResponseData(r, e) {
  if (r.length > 0)
    throw new Error(GQL_API_ERROR, {
      cause: {
        graphQLErrors: r
      }
    });
  if (Object.keys(e).length === 0)
    throw new Error(NO_DATA_OR_ERRORS_ERROR);
}
function createMultipartResponseAsyncInterator(r, e) {
  var l, c;
  const t = (e ?? "").match(BOUNDARY_HEADER_REGEX), s = `--${t ? t[1] : "-"}`;
  if (!((l = r.body) != null && l.getReader) && !((c = r.body) != null && c[Symbol.asyncIterator]))
    throw new Error("API multipart response did not return an iterable body", {
      cause: r
    });
  const i = getStreamBodyIterator(r);
  let n = {}, o;
  return {
    async *[Symbol.asyncIterator]() {
      var u;
      try {
        let d = !0;
        for await (const f of readStreamChunk(i, s)) {
          const h = getResponseDataFromChunkBodies(f);
          o = ((u = h.find((g) => g.extensions)) == null ? void 0 : u.extensions) ?? o;
          const _ = combineErrors(h);
          n = buildCombinedDataObject([
            n,
            ...h.map(({ data: g }) => g)
          ]), d = h.slice(-1)[0].hasNext, validateResponseData(_, n), yield {
            ...getKeyValueIfValid("data", n),
            ...getKeyValueIfValid("extensions", o),
            hasNext: d
          };
        }
        if (d)
          throw new Error("Response stream terminated unexpectedly");
      } catch (d) {
        const f = getErrorCause(d);
        yield {
          ...getKeyValueIfValid("data", n),
          ...getKeyValueIfValid("extensions", o),
          errors: {
            message: formatErrorMessage(getErrorMessage(d)),
            networkStatusCode: r.status,
            ...getKeyValueIfValid("graphQLErrors", f == null ? void 0 : f.graphQLErrors),
            response: r
          },
          hasNext: !1
        };
      }
    }
  };
}
function generateRequestStream(r) {
  return async (...e) => {
    if (!DEFER_OPERATION_REGEX.test(e[0]))
      throw new Error(formatErrorMessage("This operation does not result in a streamable response - use request() instead."));
    try {
      const t = await r(...e), { statusText: s } = t;
      if (!t.ok)
        throw new Error(s, { cause: t });
      const i = t.headers.get("content-type") || "";
      switch (!0) {
        case i.includes(CONTENT_TYPES.json):
          return createJsonResponseAsyncIterator(t);
        case i.includes(CONTENT_TYPES.multipart):
          return createMultipartResponseAsyncInterator(t, i);
        default:
          throw new Error(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${i}`, { cause: t });
      }
    } catch (t) {
      return {
        async *[Symbol.asyncIterator]() {
          const s = getErrorCause(t);
          yield {
            errors: {
              message: formatErrorMessage(getErrorMessage(t)),
              ...getKeyValueIfValid("networkStatusCode", s == null ? void 0 : s.status),
              ...getKeyValueIfValid("response", s)
            },
            hasNext: !1
          };
        }
      };
    }
  };
}
function validateDomainAndGetStoreUrl({ client: r, storeDomain: e }) {
  try {
    const t = e.trim(), s = t.match(/^https?:/) ? t : `https://${t}`, i = new URL(s);
    return i.protocol = "https", i.origin;
  } catch (t) {
    throw new Error(`${r}: a valid store domain ("${e}") must be provided`, { cause: t });
  }
}
function validateApiVersion({ client: r, currentSupportedApiVersions: e, apiVersion: t, logger: s }) {
  const i = `${r}: the provided apiVersion ("${t}")`, n = `Currently supported API versions: ${e.join(", ")}`;
  if (!t || typeof t != "string")
    throw new Error(`${i} is invalid. ${n}`);
  const o = t.trim();
  e.includes(o) || (s ? s({
    type: "Unsupported_Api_Version",
    content: {
      apiVersion: t,
      supportedApiVersions: e
    }
  }) : console.warn(`${i} is likely deprecated or not supported. ${n}`));
}
function getQuarterMonth(r) {
  const e = r * 3 - 2;
  return e === 10 ? e : `0${e}`;
}
function getPrevousVersion(r, e, t) {
  const s = e - t;
  return s <= 0 ? `${r - 1}-${getQuarterMonth(s + 4)}` : `${r}-${getQuarterMonth(s)}`;
}
function getCurrentApiVersion() {
  const r = /* @__PURE__ */ new Date(), e = r.getUTCMonth(), t = r.getUTCFullYear(), s = Math.floor(e / 3 + 1);
  return {
    year: t,
    quarter: s,
    version: `${t}-${getQuarterMonth(s)}`
  };
}
function getCurrentSupportedApiVersions() {
  const { year: r, quarter: e, version: t } = getCurrentApiVersion(), s = e === 4 ? `${r + 1}-01` : `${r}-${getQuarterMonth(e + 1)}`;
  return [
    getPrevousVersion(r, e, 3),
    getPrevousVersion(r, e, 2),
    getPrevousVersion(r, e, 1),
    t,
    s,
    "unstable"
  ];
}
function generateGetHeaders(r) {
  return (e) => ({ ...e ?? {}, ...r.headers });
}
function generateGetGQLClientParams({ getHeaders: r, getApiUrl: e }) {
  return (t, s) => {
    const i = [t];
    if (s && Object.keys(s).length > 0) {
      const { variables: n, apiVersion: o, headers: l, retries: c } = s;
      i.push({
        ...n ? { variables: n } : {},
        ...l ? { headers: r(l) } : {},
        ...o ? { url: e(o) } : {},
        ...c ? { retries: c } : {}
      });
    }
    return i;
  };
}
const DEFAULT_CONTENT_TYPE = "application/json", DEFAULT_SDK_VARIANT = "storefront-api-client", DEFAULT_CLIENT_VERSION = "1.0.7", PUBLIC_ACCESS_TOKEN_HEADER = "X-Shopify-Storefront-Access-Token", SDK_VARIANT_HEADER = "X-SDK-Variant", SDK_VERSION_HEADER = "X-SDK-Version", SDK_VARIANT_SOURCE_HEADER = "X-SDK-Variant-Source", CLIENT = "Storefront API Client";
function validatePrivateAccessTokenUsage(r) {
  if (r && typeof window < "u")
    throw new Error(`${CLIENT}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`);
}
function validateRequiredAccessTokens(r, e) {
  if (e)
    throw new Error(`${CLIENT}: only provide either a public or private access token`);
}
function createStorefrontApiClient$1({ storeDomain: r, apiVersion: e, publicAccessToken: t, privateAccessToken: s, clientName: i, retries: n = 0, customFetchApi: o, logger: l }) {
  const c = getCurrentSupportedApiVersions(), u = validateDomainAndGetStoreUrl({
    client: CLIENT,
    storeDomain: r
  }), d = {
    client: CLIENT,
    currentSupportedApiVersions: c,
    logger: l
  };
  validateApiVersion({ ...d, apiVersion: e }), validateRequiredAccessTokens(t, s), validatePrivateAccessTokenUsage(s);
  const f = generateApiUrlFormatter(u, e, d), h = {
    storeDomain: u,
    apiVersion: e,
    publicAccessToken: t,
    headers: {
      "Content-Type": DEFAULT_CONTENT_TYPE,
      Accept: DEFAULT_CONTENT_TYPE,
      [SDK_VARIANT_HEADER]: DEFAULT_SDK_VARIANT,
      [SDK_VERSION_HEADER]: DEFAULT_CLIENT_VERSION,
      ...i ? { [SDK_VARIANT_SOURCE_HEADER]: i } : {},
      [PUBLIC_ACCESS_TOKEN_HEADER]: t
    },
    apiUrl: f(),
    clientName: i
  }, _ = createGraphQLClient({
    headers: h.headers,
    url: h.apiUrl,
    retries: n,
    customFetchApi: o,
    logger: l
  }), g = generateGetHeaders(h), v = generateGetApiUrl(h, f), m = generateGetGQLClientParams({
    getHeaders: g,
    getApiUrl: v
  });
  return Object.freeze({
    config: h,
    getHeaders: g,
    getApiUrl: v,
    fetch: (...E) => _.fetch(...m(...E)),
    request: (...E) => _.request(...m(...E)),
    requestStream: (...E) => _.requestStream(...m(...E))
  });
}
function generateApiUrlFormatter(r, e, t) {
  return (s) => {
    s && validateApiVersion({
      ...t,
      apiVersion: s
    });
    const i = (s ?? e).trim();
    return `${r}/api/${i}/graphql.json`;
  };
}
function generateGetApiUrl(r, e) {
  return (t) => t ? e(t) : r.apiUrl;
}
const DEV = !1;
var is_array = Array.isArray, index_of = Array.prototype.indexOf, array_from = Array.from, object_keys = Object.keys, define_property = Object.defineProperty, get_descriptor = Object.getOwnPropertyDescriptor, get_descriptors = Object.getOwnPropertyDescriptors, object_prototype = Object.prototype, array_prototype = Array.prototype, get_prototype_of = Object.getPrototypeOf, is_extensible = Object.isExtensible;
function is_function(r) {
  return typeof r == "function";
}
const noop$2 = () => {
};
function run(r) {
  return r();
}
function run_all(r) {
  for (var e = 0; e < r.length; e++)
    r[e]();
}
const DERIVED = 2, EFFECT = 4, RENDER_EFFECT = 8, BLOCK_EFFECT = 16, BRANCH_EFFECT = 32, ROOT_EFFECT = 64, BOUNDARY_EFFECT = 128, UNOWNED = 256, DISCONNECTED = 512, CLEAN = 1024, DIRTY = 2048, MAYBE_DIRTY = 4096, INERT = 8192, DESTROYED = 16384, EFFECT_RAN = 32768, EFFECT_TRANSPARENT = 65536, LEGACY_DERIVED_PROP = 1 << 17, HEAD_EFFECT = 1 << 19, EFFECT_HAS_DERIVED = 1 << 20, EFFECT_IS_UPDATING = 1 << 21, STATE_SYMBOL = Symbol("$state"), LEGACY_PROPS = Symbol("legacy props"), LOADING_ATTR_SYMBOL = Symbol(""), request_idle_callback = typeof requestIdleCallback > "u" ? (r) => setTimeout(r, 1) : requestIdleCallback;
let micro_tasks = [], idle_tasks = [];
function run_micro_tasks() {
  var r = micro_tasks;
  micro_tasks = [], run_all(r);
}
function run_idle_tasks() {
  var r = idle_tasks;
  idle_tasks = [], run_all(r);
}
function queue_micro_task(r) {
  micro_tasks.length === 0 && queueMicrotask(run_micro_tasks), micro_tasks.push(r);
}
function queue_idle_task(r) {
  idle_tasks.length === 0 && request_idle_callback(run_idle_tasks), idle_tasks.push(r);
}
function flush_tasks() {
  micro_tasks.length > 0 && run_micro_tasks(), idle_tasks.length > 0 && run_idle_tasks();
}
function equals(r) {
  return r === this.v;
}
function safe_not_equal(r, e) {
  return r != r ? e == e : r !== e || r !== null && typeof r == "object" || typeof r == "function";
}
function safe_equals(r) {
  return !safe_not_equal(r, this.v);
}
function effect_in_teardown(r) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function effect_in_unowned_derived() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function effect_orphan(r) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function effect_update_depth_exceeded() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function hydration_failed() {
  throw new Error("https://svelte.dev/e/hydration_failed");
}
function props_invalid_value(r) {
  throw new Error("https://svelte.dev/e/props_invalid_value");
}
function state_descriptors_fixed() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function state_prototype_fixed() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function state_unsafe_mutation() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
let legacy_mode_flag = !1, tracing_mode_flag = !1;
function enable_legacy_mode_flag() {
  legacy_mode_flag = !0;
}
const EACH_ITEM_REACTIVE = 1, EACH_INDEX_REACTIVE = 2, EACH_ITEM_IMMUTABLE = 16, PROPS_IS_IMMUTABLE = 1, PROPS_IS_RUNES = 2, PROPS_IS_UPDATED = 4, PROPS_IS_BINDABLE = 8, PROPS_IS_LAZY_INITIAL = 16, TRANSITION_GLOBAL = 4, TEMPLATE_FRAGMENT = 1, TEMPLATE_USE_IMPORT_NODE = 2, HYDRATION_START = "[", HYDRATION_START_ELSE = "[!", HYDRATION_END = "]", HYDRATION_ERROR = {}, UNINITIALIZED = Symbol(), NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
function lifecycle_outside_component(r) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
let component_context = null;
function set_component_context(r) {
  component_context = r;
}
function push(r, e = !1, t) {
  var s = component_context = {
    p: component_context,
    c: null,
    d: !1,
    e: null,
    m: !1,
    s: r,
    x: null,
    l: null
  };
  legacy_mode_flag && !e && (component_context.l = {
    s: null,
    u: null,
    r1: [],
    r2: source(!1)
  }), teardown(() => {
    s.d = !0;
  });
}
function pop(r) {
  const e = component_context;
  if (e !== null) {
    r !== void 0 && (e.x = r);
    const o = e.e;
    if (o !== null) {
      var t = active_effect, s = active_reaction;
      e.e = null;
      try {
        for (var i = 0; i < o.length; i++) {
          var n = o[i];
          set_active_effect(n.effect), set_active_reaction(n.reaction), effect(n.fn);
        }
      } finally {
        set_active_effect(t), set_active_reaction(s);
      }
    }
    component_context = e.p, e.m = !0;
  }
  return r || /** @type {T} */
  {};
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
function proxy(r) {
  if (typeof r != "object" || r === null || STATE_SYMBOL in r)
    return r;
  const e = get_prototype_of(r);
  if (e !== object_prototype && e !== array_prototype)
    return r;
  var t = /* @__PURE__ */ new Map(), s = is_array(r), i = /* @__PURE__ */ state(0), n = active_reaction, o = (l) => {
    var c = active_reaction;
    set_active_reaction(n);
    var u = l();
    return set_active_reaction(c), u;
  };
  return s && t.set("length", /* @__PURE__ */ state(
    /** @type {any[]} */
    r.length
  )), new Proxy(
    /** @type {any} */
    r,
    {
      defineProperty(l, c, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && state_descriptors_fixed();
        var d = t.get(c);
        return d === void 0 ? (d = o(() => /* @__PURE__ */ state(u.value)), t.set(c, d)) : set(
          d,
          o(() => proxy(u.value))
        ), !0;
      },
      deleteProperty(l, c) {
        var u = t.get(c);
        if (u === void 0)
          c in l && t.set(
            c,
            o(() => /* @__PURE__ */ state(UNINITIALIZED))
          );
        else {
          if (s && typeof c == "string") {
            var d = (
              /** @type {Source<number>} */
              t.get("length")
            ), f = Number(c);
            Number.isInteger(f) && f < d.v && set(d, f);
          }
          set(u, UNINITIALIZED), update_version(i);
        }
        return !0;
      },
      get(l, c, u) {
        var _;
        if (c === STATE_SYMBOL)
          return r;
        var d = t.get(c), f = c in l;
        if (d === void 0 && (!f || (_ = get_descriptor(l, c)) != null && _.writable) && (d = o(() => /* @__PURE__ */ state(proxy(f ? l[c] : UNINITIALIZED))), t.set(c, d)), d !== void 0) {
          var h = get$2(d);
          return h === UNINITIALIZED ? void 0 : h;
        }
        return Reflect.get(l, c, u);
      },
      getOwnPropertyDescriptor(l, c) {
        var u = Reflect.getOwnPropertyDescriptor(l, c);
        if (u && "value" in u) {
          var d = t.get(c);
          d && (u.value = get$2(d));
        } else if (u === void 0) {
          var f = t.get(c), h = f == null ? void 0 : f.v;
          if (f !== void 0 && h !== UNINITIALIZED)
            return {
              enumerable: !0,
              configurable: !0,
              value: h,
              writable: !0
            };
        }
        return u;
      },
      has(l, c) {
        var h;
        if (c === STATE_SYMBOL)
          return !0;
        var u = t.get(c), d = u !== void 0 && u.v !== UNINITIALIZED || Reflect.has(l, c);
        if (u !== void 0 || active_effect !== null && (!d || (h = get_descriptor(l, c)) != null && h.writable)) {
          u === void 0 && (u = o(() => /* @__PURE__ */ state(d ? proxy(l[c]) : UNINITIALIZED)), t.set(c, u));
          var f = get$2(u);
          if (f === UNINITIALIZED)
            return !1;
        }
        return d;
      },
      set(l, c, u, d) {
        var E;
        var f = t.get(c), h = c in l;
        if (s && c === "length")
          for (var _ = u; _ < /** @type {Source<number>} */
          f.v; _ += 1) {
            var g = t.get(_ + "");
            g !== void 0 ? set(g, UNINITIALIZED) : _ in l && (g = o(() => /* @__PURE__ */ state(UNINITIALIZED)), t.set(_ + "", g));
          }
        f === void 0 ? (!h || (E = get_descriptor(l, c)) != null && E.writable) && (f = o(() => /* @__PURE__ */ state(void 0)), set(
          f,
          o(() => proxy(u))
        ), t.set(c, f)) : (h = f.v !== UNINITIALIZED, set(
          f,
          o(() => proxy(u))
        ));
        var v = Reflect.getOwnPropertyDescriptor(l, c);
        if (v != null && v.set && v.set.call(d, u), !h) {
          if (s && typeof c == "string") {
            var m = (
              /** @type {Source<number>} */
              t.get("length")
            ), y = Number(c);
            Number.isInteger(y) && y >= m.v && set(m, y + 1);
          }
          update_version(i);
        }
        return !0;
      },
      ownKeys(l) {
        get$2(i);
        var c = Reflect.ownKeys(l).filter((f) => {
          var h = t.get(f);
          return h === void 0 || h.v !== UNINITIALIZED;
        });
        for (var [u, d] of t)
          d.v !== UNINITIALIZED && !(u in l) && c.push(u);
        return c;
      },
      setPrototypeOf() {
        state_prototype_fixed();
      }
    }
  );
}
function update_version(r, e = 1) {
  set(r, r.v + e);
}
// @__NO_SIDE_EFFECTS__
function derived(r) {
  var e = DERIVED | DIRTY, t = active_reaction !== null && active_reaction.f & DERIVED ? (
    /** @type {Derived} */
    active_reaction
  ) : null;
  return active_effect === null || t !== null && t.f & UNOWNED ? e |= UNOWNED : active_effect.f |= EFFECT_HAS_DERIVED, {
    ctx: component_context,
    deps: null,
    effects: null,
    equals,
    f: e,
    fn: r,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      null
    ),
    wv: 0,
    parent: t ?? active_effect
  };
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(r) {
  const e = /* @__PURE__ */ derived(r);
  return e.equals = safe_equals, e;
}
function destroy_derived_effects(r) {
  var e = r.effects;
  if (e !== null) {
    r.effects = null;
    for (var t = 0; t < e.length; t += 1)
      destroy_effect(
        /** @type {Effect} */
        e[t]
      );
  }
}
function get_derived_parent_effect(r) {
  for (var e = r.parent; e !== null; ) {
    if (!(e.f & DERIVED))
      return (
        /** @type {Effect} */
        e
      );
    e = e.parent;
  }
  return null;
}
function execute_derived(r) {
  var e, t = active_effect;
  set_active_effect(get_derived_parent_effect(r));
  try {
    destroy_derived_effects(r), e = update_reaction(r);
  } finally {
    set_active_effect(t);
  }
  return e;
}
function update_derived(r) {
  var e = execute_derived(r), t = (skip_reaction || r.f & UNOWNED) && r.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(r, t), r.equals(e) || (r.v = e, r.wv = increment_write_version());
}
const old_values = /* @__PURE__ */ new Map();
function source(r, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: r,
    reactions: null,
    equals,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function state(r, e) {
  const t = source(r);
  return push_reaction_value(t), t;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(r, e = !1) {
  var s;
  const t = source(r);
  return e || (t.equals = safe_equals), legacy_mode_flag && component_context !== null && component_context.l !== null && ((s = component_context.l).s ?? (s.s = [])).push(t), t;
}
function mutate(r, e) {
  return set(
    r,
    untrack(() => get$2(r))
  ), e;
}
function set(r, e, t = !1) {
  active_reaction !== null && !untracking && is_runes() && active_reaction.f & (DERIVED | BLOCK_EFFECT) && !(reaction_sources != null && reaction_sources.includes(r)) && state_unsafe_mutation();
  let s = t ? proxy(e) : e;
  return internal_set(r, s);
}
function internal_set(r, e) {
  if (!r.equals(e)) {
    var t = r.v;
    is_destroying_effect ? old_values.set(r, e) : old_values.set(r, t), r.v = e, r.f & DERIVED && (r.f & DIRTY && execute_derived(
      /** @type {Derived} */
      r
    ), set_signal_status(r, r.f & UNOWNED ? MAYBE_DIRTY : CLEAN)), r.wv = increment_write_version(), mark_reactions(r, DIRTY), is_runes() && active_effect !== null && active_effect.f & CLEAN && !(active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) && (untracked_writes === null ? set_untracked_writes([r]) : untracked_writes.push(r));
  }
  return e;
}
function mark_reactions(r, e) {
  var t = r.reactions;
  if (t !== null)
    for (var s = is_runes(), i = t.length, n = 0; n < i; n++) {
      var o = t[n], l = o.f;
      l & DIRTY || !s && o === active_effect || (set_signal_status(o, e), l & (CLEAN | UNOWNED) && (l & DERIVED ? mark_reactions(
        /** @type {Derived} */
        o,
        MAYBE_DIRTY
      ) : schedule_effect(
        /** @type {Effect} */
        o
      )));
    }
}
function hydration_mismatch(r) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
let hydrating = !1;
function set_hydrating(r) {
  hydrating = r;
}
let hydrate_node;
function set_hydrate_node(r) {
  if (r === null)
    throw hydration_mismatch(), HYDRATION_ERROR;
  return hydrate_node = r;
}
function hydrate_next() {
  return set_hydrate_node(
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(hydrate_node)
  );
}
function reset(r) {
  if (hydrating) {
    if (/* @__PURE__ */ get_next_sibling(hydrate_node) !== null)
      throw hydration_mismatch(), HYDRATION_ERROR;
    hydrate_node = r;
  }
}
function next(r = 1) {
  if (hydrating) {
    for (var e = r, t = hydrate_node; e--; )
      t = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(t);
    hydrate_node = t;
  }
}
function remove_nodes() {
  for (var r = 0, e = hydrate_node; ; ) {
    if (e.nodeType === 8) {
      var t = (
        /** @type {Comment} */
        e.data
      );
      if (t === HYDRATION_END) {
        if (r === 0) return e;
        r -= 1;
      } else (t === HYDRATION_START || t === HYDRATION_START_ELSE) && (r += 1);
    }
    var s = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(e)
    );
    e.remove(), e = s;
  }
}
var $window, is_firefox, first_child_getter, next_sibling_getter;
function init_operations() {
  if ($window === void 0) {
    $window = window, is_firefox = /Firefox/.test(navigator.userAgent);
    var r = Element.prototype, e = Node.prototype, t = Text.prototype;
    first_child_getter = get_descriptor(e, "firstChild").get, next_sibling_getter = get_descriptor(e, "nextSibling").get, is_extensible(r) && (r.__click = void 0, r.__className = void 0, r.__attributes = null, r.__style = void 0, r.__e = void 0), is_extensible(t) && (t.__t = void 0);
  }
}
function create_text(r = "") {
  return document.createTextNode(r);
}
// @__NO_SIDE_EFFECTS__
function get_first_child(r) {
  return first_child_getter.call(r);
}
// @__NO_SIDE_EFFECTS__
function get_next_sibling(r) {
  return next_sibling_getter.call(r);
}
function child(r, e) {
  if (!hydrating)
    return /* @__PURE__ */ get_first_child(r);
  var t = (
    /** @type {TemplateNode} */
    /* @__PURE__ */ get_first_child(hydrate_node)
  );
  if (t === null)
    t = hydrate_node.appendChild(create_text());
  else if (e && t.nodeType !== 3) {
    var s = create_text();
    return t == null || t.before(s), set_hydrate_node(s), s;
  }
  return set_hydrate_node(t), t;
}
function first_child(r, e) {
  if (!hydrating) {
    var t = (
      /** @type {DocumentFragment} */
      /* @__PURE__ */ get_first_child(
        /** @type {Node} */
        r
      )
    );
    return t instanceof Comment && t.data === "" ? /* @__PURE__ */ get_next_sibling(t) : t;
  }
  return hydrate_node;
}
function sibling(r, e = 1, t = !1) {
  let s = hydrating ? hydrate_node : r;
  for (var i; e--; )
    i = s, s = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(s);
  if (!hydrating)
    return s;
  var n = s == null ? void 0 : s.nodeType;
  if (t && n !== 3) {
    var o = create_text();
    return s === null ? i == null || i.after(o) : s.before(o), set_hydrate_node(o), o;
  }
  return set_hydrate_node(s), /** @type {TemplateNode} */
  s;
}
function clear_text_content(r) {
  r.textContent = "";
}
let is_throwing_error = !1, is_flushing = !1, last_scheduled_effect = null, is_updating_effect = !1, is_destroying_effect = !1;
function set_is_destroying_effect(r) {
  is_destroying_effect = r;
}
let queued_root_effects = [], dev_effect_stack = [], active_reaction = null, untracking = !1;
function set_active_reaction(r) {
  active_reaction = r;
}
let active_effect = null;
function set_active_effect(r) {
  active_effect = r;
}
let reaction_sources = null;
function push_reaction_value(r) {
  active_reaction !== null && active_reaction.f & EFFECT_IS_UPDATING && (reaction_sources === null ? reaction_sources = [r] : reaction_sources.push(r));
}
let new_deps = null, skipped_deps = 0, untracked_writes = null;
function set_untracked_writes(r) {
  untracked_writes = r;
}
let write_version = 1, read_version = 0, skip_reaction = !1;
function increment_write_version() {
  return ++write_version;
}
function check_dirtiness(r) {
  var f;
  var e = r.f;
  if (e & DIRTY)
    return !0;
  if (e & MAYBE_DIRTY) {
    var t = r.deps, s = (e & UNOWNED) !== 0;
    if (t !== null) {
      var i, n, o = (e & DISCONNECTED) !== 0, l = s && active_effect !== null && !skip_reaction, c = t.length;
      if (o || l) {
        var u = (
          /** @type {Derived} */
          r
        ), d = u.parent;
        for (i = 0; i < c; i++)
          n = t[i], (o || !((f = n == null ? void 0 : n.reactions) != null && f.includes(u))) && (n.reactions ?? (n.reactions = [])).push(u);
        o && (u.f ^= DISCONNECTED), l && d !== null && !(d.f & UNOWNED) && (u.f ^= UNOWNED);
      }
      for (i = 0; i < c; i++)
        if (n = t[i], check_dirtiness(
          /** @type {Derived} */
          n
        ) && update_derived(
          /** @type {Derived} */
          n
        ), n.wv > r.wv)
          return !0;
    }
    (!s || active_effect !== null && !skip_reaction) && set_signal_status(r, CLEAN);
  }
  return !1;
}
function propagate_error(r, e) {
  for (var t = e; t !== null; ) {
    if (t.f & BOUNDARY_EFFECT)
      try {
        t.fn(r);
        return;
      } catch {
        t.f ^= BOUNDARY_EFFECT;
      }
    t = t.parent;
  }
  throw is_throwing_error = !1, r;
}
function should_rethrow_error(r) {
  return (r.f & DESTROYED) === 0 && (r.parent === null || (r.parent.f & BOUNDARY_EFFECT) === 0);
}
function handle_error(r, e, t, s) {
  if (is_throwing_error) {
    if (t === null && (is_throwing_error = !1), should_rethrow_error(e))
      throw r;
    return;
  }
  t !== null && (is_throwing_error = !0);
  {
    propagate_error(r, e);
    return;
  }
}
function schedule_possible_effect_self_invalidation(r, e, t = !0) {
  var s = r.reactions;
  if (s !== null)
    for (var i = 0; i < s.length; i++) {
      var n = s[i];
      reaction_sources != null && reaction_sources.includes(r) || (n.f & DERIVED ? schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        n,
        e,
        !1
      ) : e === n && (t ? set_signal_status(n, DIRTY) : n.f & CLEAN && set_signal_status(n, MAYBE_DIRTY), schedule_effect(
        /** @type {Effect} */
        n
      )));
    }
}
function update_reaction(r) {
  var _;
  var e = new_deps, t = skipped_deps, s = untracked_writes, i = active_reaction, n = skip_reaction, o = reaction_sources, l = component_context, c = untracking, u = r.f;
  new_deps = /** @type {null | Value[]} */
  null, skipped_deps = 0, untracked_writes = null, skip_reaction = (u & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null), active_reaction = u & (BRANCH_EFFECT | ROOT_EFFECT) ? null : r, reaction_sources = null, set_component_context(r.ctx), untracking = !1, read_version++, r.f |= EFFECT_IS_UPDATING;
  try {
    var d = (
      /** @type {Function} */
      (0, r.fn)()
    ), f = r.deps;
    if (new_deps !== null) {
      var h;
      if (remove_reactions(r, skipped_deps), f !== null && skipped_deps > 0)
        for (f.length = skipped_deps + new_deps.length, h = 0; h < new_deps.length; h++)
          f[skipped_deps + h] = new_deps[h];
      else
        r.deps = f = new_deps;
      if (!skip_reaction)
        for (h = skipped_deps; h < f.length; h++)
          ((_ = f[h]).reactions ?? (_.reactions = [])).push(r);
    } else f !== null && skipped_deps < f.length && (remove_reactions(r, skipped_deps), f.length = skipped_deps);
    if (is_runes() && untracked_writes !== null && !untracking && f !== null && !(r.f & (DERIVED | MAYBE_DIRTY | DIRTY)))
      for (h = 0; h < /** @type {Source[]} */
      untracked_writes.length; h++)
        schedule_possible_effect_self_invalidation(
          untracked_writes[h],
          /** @type {Effect} */
          r
        );
    return i !== r && (read_version++, untracked_writes !== null && (s === null ? s = untracked_writes : s.push(.../** @type {Source[]} */
    untracked_writes))), d;
  } finally {
    new_deps = e, skipped_deps = t, untracked_writes = s, active_reaction = i, skip_reaction = n, reaction_sources = o, set_component_context(l), untracking = c, r.f ^= EFFECT_IS_UPDATING;
  }
}
function remove_reaction(r, e) {
  let t = e.reactions;
  if (t !== null) {
    var s = index_of.call(t, r);
    if (s !== -1) {
      var i = t.length - 1;
      i === 0 ? t = e.reactions = null : (t[s] = t[i], t.pop());
    }
  }
  t === null && e.f & DERIVED && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !new_deps.includes(e)) && (set_signal_status(e, MAYBE_DIRTY), e.f & (UNOWNED | DISCONNECTED) || (e.f ^= DISCONNECTED), destroy_derived_effects(
    /** @type {Derived} **/
    e
  ), remove_reactions(
    /** @type {Derived} **/
    e,
    0
  ));
}
function remove_reactions(r, e) {
  var t = r.deps;
  if (t !== null)
    for (var s = e; s < t.length; s++)
      remove_reaction(r, t[s]);
}
function update_effect(r) {
  var e = r.f;
  if (!(e & DESTROYED)) {
    set_signal_status(r, CLEAN);
    var t = active_effect, s = component_context, i = is_updating_effect;
    active_effect = r, is_updating_effect = !0;
    try {
      e & BLOCK_EFFECT ? destroy_block_effect_children(r) : destroy_effect_children(r), execute_effect_teardown(r);
      var n = update_reaction(r);
      r.teardown = typeof n == "function" ? n : null, r.wv = write_version;
      var o = r.deps, l;
      DEV && tracing_mode_flag && r.f & DIRTY;
    } catch (c) {
      handle_error(c, r, t, s || r.ctx);
    } finally {
      is_updating_effect = i, active_effect = t;
    }
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (r) {
    if (last_scheduled_effect !== null)
      handle_error(r, last_scheduled_effect, null);
    else
      throw r;
  }
}
function flush_queued_root_effects() {
  var r = is_updating_effect;
  try {
    var e = 0;
    for (is_updating_effect = !0; queued_root_effects.length > 0; ) {
      e++ > 1e3 && infinite_loop_guard();
      var t = queued_root_effects, s = t.length;
      queued_root_effects = [];
      for (var i = 0; i < s; i++) {
        var n = process_effects(t[i]);
        flush_queued_effects(n);
      }
      old_values.clear();
    }
  } finally {
    is_flushing = !1, is_updating_effect = r, last_scheduled_effect = null;
  }
}
function flush_queued_effects(r) {
  var e = r.length;
  if (e !== 0)
    for (var t = 0; t < e; t++) {
      var s = r[t];
      if (!(s.f & (DESTROYED | INERT)))
        try {
          check_dirtiness(s) && (update_effect(s), s.deps === null && s.first === null && s.nodes_start === null && (s.teardown === null ? unlink_effect(s) : s.fn = null));
        } catch (i) {
          handle_error(i, s, null, s.ctx);
        }
    }
}
function schedule_effect(r) {
  is_flushing || (is_flushing = !0, queueMicrotask(flush_queued_root_effects));
  for (var e = last_scheduled_effect = r; e.parent !== null; ) {
    e = e.parent;
    var t = e.f;
    if (t & (ROOT_EFFECT | BRANCH_EFFECT)) {
      if (!(t & CLEAN)) return;
      e.f ^= CLEAN;
    }
  }
  queued_root_effects.push(e);
}
function process_effects(r) {
  for (var e = [], t = r; t !== null; ) {
    var s = t.f, i = (s & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0, n = i && (s & CLEAN) !== 0;
    if (!n && !(s & INERT)) {
      if (s & EFFECT)
        e.push(t);
      else if (i)
        t.f ^= CLEAN;
      else {
        var o = active_reaction;
        try {
          active_reaction = t, check_dirtiness(t) && update_effect(t);
        } catch (u) {
          handle_error(u, t, null, t.ctx);
        } finally {
          active_reaction = o;
        }
      }
      var l = t.first;
      if (l !== null) {
        t = l;
        continue;
      }
    }
    var c = t.parent;
    for (t = t.next; t === null && c !== null; )
      t = c.next, c = c.parent;
  }
  return e;
}
function flushSync(r) {
  var e;
  for (flush_tasks(); queued_root_effects.length > 0; )
    is_flushing = !0, flush_queued_root_effects(), flush_tasks();
  return (
    /** @type {T} */
    e
  );
}
function get$2(r) {
  var e = r.f, t = (e & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    if (!(reaction_sources != null && reaction_sources.includes(r))) {
      var s = active_reaction.deps;
      r.rv < read_version && (r.rv = read_version, new_deps === null && s !== null && s[skipped_deps] === r ? skipped_deps++ : new_deps === null ? new_deps = [r] : (!skip_reaction || !new_deps.includes(r)) && new_deps.push(r));
    }
  } else if (t && /** @type {Derived} */
  r.deps === null && /** @type {Derived} */
  r.effects === null) {
    var i = (
      /** @type {Derived} */
      r
    ), n = i.parent;
    n !== null && !(n.f & UNOWNED) && (i.f ^= UNOWNED);
  }
  return t && (i = /** @type {Derived} */
  r, check_dirtiness(i) && update_derived(i)), is_destroying_effect && old_values.has(r) ? old_values.get(r) : r.v;
}
function untrack(r) {
  var e = untracking;
  try {
    return untracking = !0, r();
  } finally {
    untracking = e;
  }
}
const STATUS_MASK = -7169;
function set_signal_status(r, e) {
  r.f = r.f & STATUS_MASK | e;
}
function deep_read_state(r) {
  if (!(typeof r != "object" || !r || r instanceof EventTarget)) {
    if (STATE_SYMBOL in r)
      deep_read(r);
    else if (!Array.isArray(r))
      for (let e in r) {
        const t = r[e];
        typeof t == "object" && t && STATE_SYMBOL in t && deep_read(t);
      }
  }
}
function deep_read(r, e = /* @__PURE__ */ new Set()) {
  if (typeof r == "object" && r !== null && // We don't want to traverse DOM elements
  !(r instanceof EventTarget) && !e.has(r)) {
    e.add(r), r instanceof Date && r.getTime();
    for (let s in r)
      try {
        deep_read(r[s], e);
      } catch {
      }
    const t = get_prototype_of(r);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const s = get_descriptors(t);
      for (let i in s) {
        const n = s[i].get;
        if (n)
          try {
            n.call(r);
          } catch {
          }
      }
    }
  }
}
function validate_effect(r) {
  active_effect === null && active_reaction === null && effect_orphan(), active_reaction !== null && active_reaction.f & UNOWNED && active_effect === null && effect_in_unowned_derived(), is_destroying_effect && effect_in_teardown();
}
function push_effect(r, e) {
  var t = e.last;
  t === null ? e.last = e.first = r : (t.next = r, r.prev = t, e.last = r);
}
function create_effect(r, e, t, s = !0) {
  var i = active_effect, n = {
    ctx: component_context,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: r | DIRTY,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: i,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0
  };
  if (t)
    try {
      update_effect(n), n.f |= EFFECT_RAN;
    } catch (c) {
      throw destroy_effect(n), c;
    }
  else e !== null && schedule_effect(n);
  var o = t && n.deps === null && n.first === null && n.nodes_start === null && n.teardown === null && (n.f & (EFFECT_HAS_DERIVED | BOUNDARY_EFFECT)) === 0;
  if (!o && s && (i !== null && push_effect(n, i), active_reaction !== null && active_reaction.f & DERIVED)) {
    var l = (
      /** @type {Derived} */
      active_reaction
    );
    (l.effects ?? (l.effects = [])).push(n);
  }
  return n;
}
function teardown(r) {
  const e = create_effect(RENDER_EFFECT, null, !1);
  return set_signal_status(e, CLEAN), e.teardown = r, e;
}
function user_effect(r) {
  validate_effect();
  var e = active_effect !== null && (active_effect.f & BRANCH_EFFECT) !== 0 && component_context !== null && !component_context.m;
  if (e) {
    var t = (
      /** @type {ComponentContext} */
      component_context
    );
    (t.e ?? (t.e = [])).push({
      fn: r,
      effect: active_effect,
      reaction: active_reaction
    });
  } else {
    var s = effect(r);
    return s;
  }
}
function user_pre_effect(r) {
  return validate_effect(), render_effect(r);
}
function effect_root(r) {
  const e = create_effect(ROOT_EFFECT, r, !0);
  return () => {
    destroy_effect(e);
  };
}
function component_root(r) {
  const e = create_effect(ROOT_EFFECT, r, !0);
  return (t = {}) => new Promise((s) => {
    t.outro ? pause_effect(e, () => {
      destroy_effect(e), s(void 0);
    }) : (destroy_effect(e), s(void 0));
  });
}
function effect(r) {
  return create_effect(EFFECT, r, !1);
}
function legacy_pre_effect(r, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    component_context
  ), s = { effect: null, ran: !1 };
  t.l.r1.push(s), s.effect = render_effect(() => {
    r(), !s.ran && (s.ran = !0, set(t.l.r2, !0), untrack(e));
  });
}
function legacy_pre_effect_reset() {
  var r = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  render_effect(() => {
    if (get$2(r.l.r2)) {
      for (var e of r.l.r1) {
        var t = e.effect;
        t.f & CLEAN && set_signal_status(t, MAYBE_DIRTY), check_dirtiness(t) && update_effect(t), e.ran = !1;
      }
      r.l.r2.v = !1;
    }
  });
}
function render_effect(r) {
  return create_effect(RENDER_EFFECT, r, !0);
}
function template_effect(r, e = [], t = derived) {
  const s = e.map(t);
  return block(() => r(...s.map(get$2)));
}
function block(r, e = 0) {
  return create_effect(RENDER_EFFECT | BLOCK_EFFECT | e, r, !0);
}
function branch(r, e = !0) {
  return create_effect(RENDER_EFFECT | BRANCH_EFFECT, r, !0, e);
}
function execute_effect_teardown(r) {
  var e = r.teardown;
  if (e !== null) {
    const t = is_destroying_effect, s = active_reaction;
    set_is_destroying_effect(!0), set_active_reaction(null);
    try {
      e.call(null);
    } finally {
      set_is_destroying_effect(t), set_active_reaction(s);
    }
  }
}
function destroy_effect_children(r, e = !1) {
  var t = r.first;
  for (r.first = r.last = null; t !== null; ) {
    var s = t.next;
    t.f & ROOT_EFFECT ? t.parent = null : destroy_effect(t, e), t = s;
  }
}
function destroy_block_effect_children(r) {
  for (var e = r.first; e !== null; ) {
    var t = e.next;
    e.f & BRANCH_EFFECT || destroy_effect(e), e = t;
  }
}
function destroy_effect(r, e = !0) {
  var t = !1;
  if ((e || r.f & HEAD_EFFECT) && r.nodes_start !== null) {
    for (var s = r.nodes_start, i = r.nodes_end; s !== null; ) {
      var n = s === i ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(s)
      );
      s.remove(), s = n;
    }
    t = !0;
  }
  destroy_effect_children(r, e && !t), remove_reactions(r, 0), set_signal_status(r, DESTROYED);
  var o = r.transitions;
  if (o !== null)
    for (const c of o)
      c.stop();
  execute_effect_teardown(r);
  var l = r.parent;
  l !== null && l.first !== null && unlink_effect(r), r.next = r.prev = r.teardown = r.ctx = r.deps = r.fn = r.nodes_start = r.nodes_end = null;
}
function unlink_effect(r) {
  var e = r.parent, t = r.prev, s = r.next;
  t !== null && (t.next = s), s !== null && (s.prev = t), e !== null && (e.first === r && (e.first = s), e.last === r && (e.last = t));
}
function pause_effect(r, e) {
  var t = [];
  pause_children(r, t, !0), run_out_transitions(t, () => {
    destroy_effect(r), e && e();
  });
}
function run_out_transitions(r, e) {
  var t = r.length;
  if (t > 0) {
    var s = () => --t || e();
    for (var i of r)
      i.out(s);
  } else
    e();
}
function pause_children(r, e, t) {
  if (!(r.f & INERT)) {
    if (r.f ^= INERT, r.transitions !== null)
      for (const o of r.transitions)
        (o.is_global || t) && e.push(o);
    for (var s = r.first; s !== null; ) {
      var i = s.next, n = (s.f & EFFECT_TRANSPARENT) !== 0 || (s.f & BRANCH_EFFECT) !== 0;
      pause_children(s, e, n ? t : !1), s = i;
    }
  }
}
function resume_effect(r) {
  resume_children(r, !0);
}
function resume_children(r, e) {
  if (r.f & INERT) {
    r.f ^= INERT, r.f & CLEAN || (r.f ^= CLEAN), check_dirtiness(r) && (set_signal_status(r, DIRTY), schedule_effect(r));
    for (var t = r.first; t !== null; ) {
      var s = t.next, i = (t.f & EFFECT_TRANSPARENT) !== 0 || (t.f & BRANCH_EFFECT) !== 0;
      resume_children(t, i ? e : !1), t = s;
    }
    if (r.transitions !== null)
      for (const n of r.transitions)
        (n.is_global || e) && n.in();
  }
}
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(r) {
  return PASSIVE_EVENTS.includes(r);
}
function remove_textarea_child(r) {
  hydrating && /* @__PURE__ */ get_first_child(r) !== null && clear_text_content(r);
}
let listening_to_form_reset = !1;
function add_form_reset_listener() {
  listening_to_form_reset || (listening_to_form_reset = !0, document.addEventListener(
    "reset",
    (r) => {
      Promise.resolve().then(() => {
        var e;
        if (!r.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            r.target.elements
          )
            (e = t.__on_r) == null || e.call(t);
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possiblity of stopPropagation)
    { capture: !0 }
  ));
}
function without_reactive_context(r) {
  var e = active_reaction, t = active_effect;
  set_active_reaction(null), set_active_effect(null);
  try {
    return r();
  } finally {
    set_active_reaction(e), set_active_effect(t);
  }
}
function listen_to_event_and_reset_event(r, e, t, s = t) {
  r.addEventListener(e, () => without_reactive_context(t));
  const i = r.__on_r;
  i ? r.__on_r = () => {
    i(), s(!0);
  } : r.__on_r = () => s(!0), add_form_reset_listener();
}
const all_registered_events = /* @__PURE__ */ new Set(), root_event_handles = /* @__PURE__ */ new Set();
function create_event(r, e, t, s = {}) {
  function i(n) {
    if (s.capture || handle_event_propagation.call(e, n), !n.cancelBubble)
      return without_reactive_context(() => t == null ? void 0 : t.call(this, n));
  }
  return r.startsWith("pointer") || r.startsWith("touch") || r === "wheel" ? queue_micro_task(() => {
    e.addEventListener(r, i, s);
  }) : e.addEventListener(r, i, s), i;
}
function event(r, e, t, s, i) {
  var n = { capture: s, passive: i }, o = create_event(r, e, t, n);
  (e === document.body || e === window || e === document) && teardown(() => {
    e.removeEventListener(r, o, n);
  });
}
function handle_event_propagation(r) {
  var E;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), s = r.type, i = ((E = r.composedPath) == null ? void 0 : E.call(r)) || [], n = (
    /** @type {null | Element} */
    i[0] || r.target
  ), o = 0, l = r.__root;
  if (l) {
    var c = i.indexOf(l);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      r.__root = e;
      return;
    }
    var u = i.indexOf(e);
    if (u === -1)
      return;
    c <= u && (o = c);
  }
  if (n = /** @type {Element} */
  i[o] || r.target, n !== e) {
    define_property(r, "currentTarget", {
      configurable: !0,
      get() {
        return n || t;
      }
    });
    var d = active_reaction, f = active_effect;
    set_active_reaction(null), set_active_effect(null);
    try {
      for (var h, _ = []; n !== null; ) {
        var g = n.assignedSlot || n.parentNode || /** @type {any} */
        n.host || null;
        try {
          var v = n["__" + s];
          if (v != null && (!/** @type {any} */
          n.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          r.target === n))
            if (is_array(v)) {
              var [m, ...y] = v;
              m.apply(n, [r, ...y]);
            } else
              v.call(n, r);
        } catch (w) {
          h ? _.push(w) : h = w;
        }
        if (r.cancelBubble || g === e || g === null)
          break;
        n = g;
      }
      if (h) {
        for (let w of _)
          queueMicrotask(() => {
            throw w;
          });
        throw h;
      }
    } finally {
      r.__root = e, delete r.currentTarget, set_active_reaction(d), set_active_effect(f);
    }
  }
}
function create_fragment_from_html(r) {
  var e = document.createElement("template");
  return e.innerHTML = r, e.content;
}
function assign_nodes(r, e) {
  var t = (
    /** @type {Effect} */
    active_effect
  );
  t.nodes_start === null && (t.nodes_start = r, t.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function template(r, e) {
  var t = (e & TEMPLATE_FRAGMENT) !== 0, s = (e & TEMPLATE_USE_IMPORT_NODE) !== 0, i, n = !r.startsWith("<!>");
  return () => {
    if (hydrating)
      return assign_nodes(hydrate_node, null), hydrate_node;
    i === void 0 && (i = create_fragment_from_html(n ? r : "<!>" + r), t || (i = /** @type {Node} */
    /* @__PURE__ */ get_first_child(i)));
    var o = (
      /** @type {TemplateNode} */
      s || is_firefox ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (t) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_first_child(o)
      ), c = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      assign_nodes(l, c);
    } else
      assign_nodes(o, o);
    return o;
  };
}
function text(r = "") {
  if (!hydrating) {
    var e = create_text(r + "");
    return assign_nodes(e, e), e;
  }
  var t = hydrate_node;
  return t.nodeType !== 3 && (t.before(t = create_text()), set_hydrate_node(t)), assign_nodes(t, t), t;
}
function comment() {
  if (hydrating)
    return assign_nodes(hydrate_node, null), hydrate_node;
  var r = document.createDocumentFragment(), e = document.createComment(""), t = create_text();
  return r.append(e, t), assign_nodes(e, t), r;
}
function append(r, e) {
  if (hydrating) {
    active_effect.nodes_end = hydrate_node, hydrate_next();
    return;
  }
  r !== null && r.before(
    /** @type {Node} */
    e
  );
}
let should_intro = !0;
function set_text(r, e) {
  var t = e == null ? "" : typeof e == "object" ? e + "" : e;
  t !== (r.__t ?? (r.__t = r.nodeValue)) && (r.__t = t, r.nodeValue = t + "");
}
function mount(r, e) {
  return _mount(r, e);
}
function hydrate(r, e) {
  init_operations(), e.intro = e.intro ?? !1;
  const t = e.target, s = hydrating, i = hydrate_node;
  try {
    for (var n = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(t)
    ); n && (n.nodeType !== 8 || /** @type {Comment} */
    n.data !== HYDRATION_START); )
      n = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(n);
    if (!n)
      throw HYDRATION_ERROR;
    set_hydrating(!0), set_hydrate_node(
      /** @type {Comment} */
      n
    ), hydrate_next();
    const o = _mount(r, { ...e, anchor: n });
    if (hydrate_node === null || hydrate_node.nodeType !== 8 || /** @type {Comment} */
    hydrate_node.data !== HYDRATION_END)
      throw hydration_mismatch(), HYDRATION_ERROR;
    return set_hydrating(!1), /**  @type {Exports} */
    o;
  } catch (o) {
    if (o === HYDRATION_ERROR)
      return e.recover === !1 && hydration_failed(), init_operations(), clear_text_content(t), set_hydrating(!1), mount(r, e);
    throw o;
  } finally {
    set_hydrating(s), set_hydrate_node(i);
  }
}
const document_listeners = /* @__PURE__ */ new Map();
function _mount(r, { target: e, anchor: t, props: s = {}, events: i, context: n, intro: o = !0 }) {
  init_operations();
  var l = /* @__PURE__ */ new Set(), c = (f) => {
    for (var h = 0; h < f.length; h++) {
      var _ = f[h];
      if (!l.has(_)) {
        l.add(_);
        var g = is_passive_event(_);
        e.addEventListener(_, handle_event_propagation, { passive: g });
        var v = document_listeners.get(_);
        v === void 0 ? (document.addEventListener(_, handle_event_propagation, { passive: g }), document_listeners.set(_, 1)) : document_listeners.set(_, v + 1);
      }
    }
  };
  c(array_from(all_registered_events)), root_event_handles.add(c);
  var u = void 0, d = component_root(() => {
    var f = t ?? e.appendChild(create_text());
    return branch(() => {
      if (n) {
        push({});
        var h = (
          /** @type {ComponentContext} */
          component_context
        );
        h.c = n;
      }
      i && (s.$$events = i), hydrating && assign_nodes(
        /** @type {TemplateNode} */
        f,
        null
      ), should_intro = o, u = r(f, s) || {}, should_intro = !0, hydrating && (active_effect.nodes_end = hydrate_node), n && pop();
    }), () => {
      var g;
      for (var h of l) {
        e.removeEventListener(h, handle_event_propagation);
        var _ = (
          /** @type {number} */
          document_listeners.get(h)
        );
        --_ === 0 ? (document.removeEventListener(h, handle_event_propagation), document_listeners.delete(h)) : document_listeners.set(h, _);
      }
      root_event_handles.delete(c), f !== t && ((g = f.parentNode) == null || g.removeChild(f));
    };
  });
  return mounted_components.set(u, d), u;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(r, e) {
  const t = mounted_components.get(r);
  return t ? (mounted_components.delete(r), t(e)) : Promise.resolve();
}
function if_block(r, e, [t, s] = [0, 0]) {
  hydrating && t === 0 && hydrate_next();
  var i = r, n = null, o = null, l = UNINITIALIZED, c = t > 0 ? EFFECT_TRANSPARENT : 0, u = !1;
  const d = (h, _ = !0) => {
    u = !0, f(_, h);
  }, f = (h, _) => {
    if (l === (l = h)) return;
    let g = !1;
    if (hydrating && s !== -1) {
      if (t === 0) {
        const m = (
          /** @type {Comment} */
          i.data
        );
        m === HYDRATION_START ? s = 0 : m === HYDRATION_START_ELSE ? s = 1 / 0 : (s = parseInt(m.substring(1)), s !== s && (s = l ? 1 / 0 : -1));
      }
      const v = s > t;
      !!l === v && (i = remove_nodes(), set_hydrate_node(i), set_hydrating(!1), g = !0, s = -1);
    }
    l ? (n ? resume_effect(n) : _ && (n = branch(() => _(i))), o && pause_effect(o, () => {
      o = null;
    })) : (o ? resume_effect(o) : _ && (o = branch(() => _(i, [t + 1, s]))), n && pause_effect(n, () => {
      n = null;
    })), g && set_hydrating(!0);
  };
  block(() => {
    u = !1, e(d), u || f(null, null);
  }, c), hydrating && (i = hydrate_node);
}
function index(r, e) {
  return e;
}
function pause_effects(r, e, t, s) {
  for (var i = [], n = e.length, o = 0; o < n; o++)
    pause_children(e[o].e, i, !0);
  var l = n > 0 && i.length === 0 && t !== null;
  if (l) {
    var c = (
      /** @type {Element} */
      /** @type {Element} */
      t.parentNode
    );
    clear_text_content(c), c.append(
      /** @type {Element} */
      t
    ), s.clear(), link(r, e[0].prev, e[n - 1].next);
  }
  run_out_transitions(i, () => {
    for (var u = 0; u < n; u++) {
      var d = e[u];
      l || (s.delete(d.k), link(r, d.prev, d.next)), destroy_effect(d.e, !l);
    }
  });
}
function each(r, e, t, s, i, n = null) {
  var o = r, l = { flags: e, items: /* @__PURE__ */ new Map(), first: null };
  {
    var c = (
      /** @type {Element} */
      r
    );
    o = hydrating ? set_hydrate_node(
      /** @type {Comment | Text} */
      /* @__PURE__ */ get_first_child(c)
    ) : c.appendChild(create_text());
  }
  hydrating && hydrate_next();
  var u = null, d = !1, f = /* @__PURE__ */ derived_safe_equal(() => {
    var h = t();
    return is_array(h) ? h : h == null ? [] : array_from(h);
  });
  block(() => {
    var h = get$2(f), _ = h.length;
    if (d && _ === 0)
      return;
    d = _ === 0;
    let g = !1;
    if (hydrating) {
      var v = (
        /** @type {Comment} */
        o.data === HYDRATION_START_ELSE
      );
      v !== (_ === 0) && (o = remove_nodes(), set_hydrate_node(o), set_hydrating(!1), g = !0);
    }
    if (hydrating) {
      for (var m = null, y, E = 0; E < _; E++) {
        if (hydrate_node.nodeType === 8 && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          o = /** @type {Comment} */
          hydrate_node, g = !0, set_hydrating(!1);
          break;
        }
        var w = h[E], T = s(w, E);
        y = create_item(
          hydrate_node,
          l,
          m,
          null,
          w,
          T,
          E,
          i,
          e,
          t
        ), l.items.set(T, y), m = y;
      }
      _ > 0 && set_hydrate_node(remove_nodes());
    }
    hydrating || reconcile(h, l, o, i, e, s, t), n !== null && (_ === 0 ? u ? resume_effect(u) : u = branch(() => n(o)) : u !== null && pause_effect(u, () => {
      u = null;
    })), g && set_hydrating(!0), get$2(f);
  }), hydrating && (o = hydrate_node);
}
function reconcile(r, e, t, s, i, n, o) {
  var l = r.length, c = e.items, u = e.first, d = u, f, h = null, _ = [], g = [], v, m, y, E;
  for (E = 0; E < l; E += 1) {
    if (v = r[E], m = n(v, E), y = c.get(m), y === void 0) {
      var w = d ? (
        /** @type {TemplateNode} */
        d.e.nodes_start
      ) : t;
      h = create_item(
        w,
        e,
        h,
        h === null ? e.first : h.next,
        v,
        m,
        E,
        s,
        i,
        o
      ), c.set(m, h), _ = [], g = [], d = h.next;
      continue;
    }
    if (update_item(y, v, E), y.e.f & INERT && resume_effect(y.e), y !== d) {
      if (f !== void 0 && f.has(y)) {
        if (_.length < g.length) {
          var T = g[0], b;
          h = T.prev;
          var k = _[0], A = _[_.length - 1];
          for (b = 0; b < _.length; b += 1)
            move(_[b], T, t);
          for (b = 0; b < g.length; b += 1)
            f.delete(g[b]);
          link(e, k.prev, A.next), link(e, h, k), link(e, A, T), d = T, h = A, E -= 1, _ = [], g = [];
        } else
          f.delete(y), move(y, d, t), link(e, y.prev, y.next), link(e, y, h === null ? e.first : h.next), link(e, h, y), h = y;
        continue;
      }
      for (_ = [], g = []; d !== null && d.k !== m; )
        d.e.f & INERT || (f ?? (f = /* @__PURE__ */ new Set())).add(d), g.push(d), d = d.next;
      if (d === null)
        continue;
      y = d;
    }
    _.push(y), h = y, d = y.next;
  }
  if (d !== null || f !== void 0) {
    for (var $ = f === void 0 ? [] : array_from(f); d !== null; )
      d.e.f & INERT || $.push(d), d = d.next;
    var x = $.length;
    if (x > 0) {
      var S = l === 0 ? t : null;
      pause_effects(e, $, S, c);
    }
  }
  active_effect.first = e.first && e.first.e, active_effect.last = h && h.e;
}
function update_item(r, e, t, s) {
  internal_set(r.v, e), r.i = t;
}
function create_item(r, e, t, s, i, n, o, l, c, u) {
  var d = (c & EACH_ITEM_REACTIVE) !== 0, f = (c & EACH_ITEM_IMMUTABLE) === 0, h = d ? f ? /* @__PURE__ */ mutable_source(i) : source(i) : i, _ = c & EACH_INDEX_REACTIVE ? source(o) : o, g = {
    i: _,
    v: h,
    k: n,
    a: null,
    // @ts-expect-error
    e: null,
    prev: t,
    next: s
  };
  try {
    return g.e = branch(() => l(r, h, _, u), hydrating), g.e.prev = t && t.e, g.e.next = s && s.e, t === null ? e.first = g : (t.next = g, t.e.next = g.e), s !== null && (s.prev = g, s.e.prev = g.e), g;
  } finally {
  }
}
function move(r, e, t) {
  for (var s = r.next ? (
    /** @type {TemplateNode} */
    r.next.e.nodes_start
  ) : t, i = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : t, n = (
    /** @type {TemplateNode} */
    r.e.nodes_start
  ); n !== s; ) {
    var o = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(n)
    );
    i.before(n), n = o;
  }
}
function link(r, e, t) {
  e === null ? r.first = t : (e.next = t, e.e.next = t && t.e), t !== null && (t.prev = e, t.e.prev = e && e.e);
}
function slot(r, e, t, s, i) {
  var l;
  hydrating && hydrate_next();
  var n = (l = e.$$slots) == null ? void 0 : l[t], o = !1;
  n === !0 && (n = e.children, o = !0), n === void 0 || n(r, o ? () => s : s);
}
function append_styles(r, e) {
  queue_micro_task(() => {
    var t = r.getRootNode(), s = (
      /** @type {ShadowRoot} */
      t.host ? (
        /** @type {ShadowRoot} */
        t
      ) : (
        /** @type {Document} */
        t.head ?? /** @type {Document} */
        t.ownerDocument.head
      )
    );
    if (!s.querySelector("#" + e.hash)) {
      const i = document.createElement("style");
      i.id = e.hash, i.textContent = e.code, s.appendChild(i);
    }
  });
}
function action(r, e, t) {
  effect(() => {
    var s = untrack(() => e(r, t == null ? void 0 : t()) || {});
    if (s != null && s.destroy)
      return () => (
        /** @type {Function} */
        s.destroy()
      );
  });
}
const whitespace = [...` 	
\r\f \v\uFEFF`];
function to_class(r, e, t) {
  var s = r == null ? "" : "" + r;
  if (t) {
    for (var i in t)
      if (t[i])
        s = s ? s + " " + i : i;
      else if (s.length)
        for (var n = i.length, o = 0; (o = s.indexOf(i, o)) >= 0; ) {
          var l = o + n;
          (o === 0 || whitespace.includes(s[o - 1])) && (l === s.length || whitespace.includes(s[l])) ? s = (o === 0 ? "" : s.substring(0, o)) + s.substring(l + 1) : o = l;
        }
  }
  return s === "" ? null : s;
}
function to_style(r, e) {
  return r == null ? null : String(r);
}
function set_class(r, e, t, s, i, n) {
  var o = r.__className;
  if (hydrating || o !== t || o === void 0) {
    var l = to_class(t, s, n);
    (!hydrating || l !== r.getAttribute("class")) && (l == null ? r.removeAttribute("class") : r.className = l), r.__className = t;
  } else if (n && i !== n)
    for (var c in n) {
      var u = !!n[c];
      (i == null || u !== !!i[c]) && r.classList.toggle(c, u);
    }
  return n;
}
function set_style(r, e, t, s) {
  var i = r.__style;
  if (hydrating || i !== e) {
    var n = to_style(e);
    (!hydrating || n !== r.getAttribute("style")) && (n == null ? r.removeAttribute("style") : r.style.cssText = n), r.__style = e;
  }
  return s;
}
const IS_CUSTOM_ELEMENT = Symbol("is custom element"), IS_HTML = Symbol("is html");
function remove_input_defaults(r) {
  if (hydrating) {
    var e = !1, t = () => {
      if (!e) {
        if (e = !0, r.hasAttribute("value")) {
          var s = r.value;
          set_attribute(r, "value", null), r.value = s;
        }
        if (r.hasAttribute("checked")) {
          var i = r.checked;
          set_attribute(r, "checked", null), r.checked = i;
        }
      }
    };
    r.__on_r = t, queue_idle_task(t), add_form_reset_listener();
  }
}
function set_attribute(r, e, t, s) {
  var i = get_attributes(r);
  hydrating && (i[e] = r.getAttribute(e), e === "src" || e === "srcset" || e === "href" && r.nodeName === "LINK") || i[e] !== (i[e] = t) && (e === "loading" && (r[LOADING_ATTR_SYMBOL] = t), t == null ? r.removeAttribute(e) : typeof t != "string" && get_setters(r).includes(e) ? r[e] = t : r.setAttribute(e, t));
}
function get_attributes(r) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    r.__attributes ?? (r.__attributes = {
      [IS_CUSTOM_ELEMENT]: r.nodeName.includes("-"),
      [IS_HTML]: r.namespaceURI === NAMESPACE_HTML
    })
  );
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(r) {
  var e = setters_cache.get(r.nodeName);
  if (e) return e;
  setters_cache.set(r.nodeName, e = []);
  for (var t, s = r, i = Element.prototype; i !== s; ) {
    t = get_descriptors(s);
    for (var n in t)
      t[n].set && e.push(n);
    s = get_prototype_of(s);
  }
  return e;
}
const now$1 = () => performance.now(), raf = {
  // don't access requestAnimationFrame eagerly outside method
  // this allows basic testing of user code without JSDOM
  // bunder will eval and remove ternary when the user's app is built
  tick: (
    /** @param {any} _ */
    (r) => requestAnimationFrame(r)
  ),
  now: () => now$1(),
  tasks: /* @__PURE__ */ new Set()
};
function run_tasks() {
  const r = raf.now();
  raf.tasks.forEach((e) => {
    e.c(r) || (raf.tasks.delete(e), e.f());
  }), raf.tasks.size !== 0 && raf.tick(run_tasks);
}
function loop$1(r) {
  let e;
  return raf.tasks.size === 0 && raf.tick(run_tasks), {
    promise: new Promise((t) => {
      raf.tasks.add(e = { c: r, f: t });
    }),
    abort() {
      raf.tasks.delete(e);
    }
  };
}
function dispatch_event(r, e) {
  without_reactive_context(() => {
    r.dispatchEvent(new CustomEvent(e));
  });
}
function css_property_to_camelcase(r) {
  if (r === "float") return "cssFloat";
  if (r === "offset") return "cssOffset";
  if (r.startsWith("--")) return r;
  const e = r.split("-");
  return e.length === 1 ? e[0] : e[0] + e.slice(1).map(
    /** @param {any} word */
    (t) => t[0].toUpperCase() + t.slice(1)
  ).join("");
}
function css_to_keyframe(r) {
  const e = {}, t = r.split(";");
  for (const s of t) {
    const [i, n] = s.split(":");
    if (!i || n === void 0) break;
    const o = css_property_to_camelcase(i.trim());
    e[o] = n.trim();
  }
  return e;
}
const linear$1 = (r) => r;
function transition$1(r, e, t, s) {
  var i = (r & TRANSITION_GLOBAL) !== 0, n = "both", o, l = e.inert, c = e.style.overflow, u, d;
  function f() {
    var m = active_reaction, y = active_effect;
    set_active_reaction(null), set_active_effect(null);
    try {
      return o ?? (o = t()(e, (s == null ? void 0 : s()) ?? /** @type {P} */
      {}, {
        direction: n
      }));
    } finally {
      set_active_reaction(m), set_active_effect(y);
    }
  }
  var h = {
    is_global: i,
    in() {
      e.inert = l, dispatch_event(e, "introstart"), u = animate(e, f(), d, 1, () => {
        dispatch_event(e, "introend"), u == null || u.abort(), u = o = void 0, e.style.overflow = c;
      });
    },
    out(m) {
      e.inert = !0, dispatch_event(e, "outrostart"), d = animate(e, f(), u, 0, () => {
        dispatch_event(e, "outroend"), m == null || m();
      });
    },
    stop: () => {
      u == null || u.abort(), d == null || d.abort();
    }
  }, _ = (
    /** @type {Effect} */
    active_effect
  );
  if ((_.transitions ?? (_.transitions = [])).push(h), should_intro) {
    var g = i;
    if (!g) {
      for (var v = (
        /** @type {Effect | null} */
        _.parent
      ); v && v.f & EFFECT_TRANSPARENT; )
        for (; (v = v.parent) && !(v.f & BLOCK_EFFECT); )
          ;
      g = !v || (v.f & EFFECT_RAN) !== 0;
    }
    g && effect(() => {
      untrack(() => h.in());
    });
  }
}
function animate(r, e, t, s, i) {
  var n = s === 1;
  if (is_function(e)) {
    var o, l = !1;
    return queue_micro_task(() => {
      if (!l) {
        var m = e({ direction: n ? "in" : "out" });
        o = animate(r, m, t, s, i);
      }
    }), {
      abort: () => {
        l = !0, o == null || o.abort();
      },
      deactivate: () => o.deactivate(),
      reset: () => o.reset(),
      t: () => o.t()
    };
  }
  if (t == null || t.deactivate(), !(e != null && e.duration))
    return i(), {
      abort: noop$2,
      deactivate: noop$2,
      reset: noop$2,
      t: () => s
    };
  const { delay: c = 0, css: u, tick: d, easing: f = linear$1 } = e;
  var h = [];
  if (n && t === void 0 && (d && d(0, 1), u)) {
    var _ = css_to_keyframe(u(0, 1));
    h.push(_, _);
  }
  var g = () => 1 - s, v = r.animate(h, { duration: c });
  return v.onfinish = () => {
    var m = (t == null ? void 0 : t.t()) ?? 1 - s;
    t == null || t.abort();
    var y = s - m, E = (
      /** @type {number} */
      e.duration * Math.abs(y)
    ), w = [];
    if (E > 0) {
      var T = !1;
      if (u)
        for (var b = Math.ceil(E / 16.666666666666668), k = 0; k <= b; k += 1) {
          var A = m + y * f(k / b), $ = css_to_keyframe(u(A, 1 - A));
          w.push($), T || (T = $.overflow === "hidden");
        }
      T && (r.style.overflow = "hidden"), g = () => {
        var x = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          v.currentTime
        );
        return m + y * f(x / E);
      }, d && loop$1(() => {
        if (v.playState !== "running") return !1;
        var x = g();
        return d(x, 1 - x), !0;
      });
    }
    v = r.animate(w, { duration: E, fill: "forwards" }), v.onfinish = () => {
      g = () => s, d == null || d(s, 1 - s), i();
    };
  }, {
    abort: () => {
      v && (v.cancel(), v.effect = null, v.onfinish = noop$2);
    },
    deactivate: () => {
      i = noop$2;
    },
    reset: () => {
      s === 0 && (d == null || d(1, 0));
    },
    t: () => g()
  };
}
function bind_value(r, e, t = e) {
  var s = is_runes();
  listen_to_event_and_reset_event(r, "input", (i) => {
    var n = i ? r.defaultValue : r.value;
    if (n = is_numberlike_input(r) ? to_number(n) : n, t(n), s && n !== (n = e())) {
      var o = r.selectionStart, l = r.selectionEnd;
      r.value = n ?? "", l !== null && (r.selectionStart = o, r.selectionEnd = Math.min(l, r.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  (hydrating && r.defaultValue !== r.value || // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  untrack(e) == null && r.value) && t(is_numberlike_input(r) ? to_number(r.value) : r.value), render_effect(() => {
    var i = e();
    is_numberlike_input(r) && i === to_number(r.value) || r.type === "date" && !i && !r.value || i !== r.value && (r.value = i ?? "");
  });
}
function is_numberlike_input(r) {
  var e = r.type;
  return e === "number" || e === "range";
}
function to_number(r) {
  return r === "" ? null : +r;
}
function is_bound_this(r, e) {
  return r === e || (r == null ? void 0 : r[STATE_SYMBOL]) === e;
}
function bind_this(r = {}, e, t, s) {
  return effect(() => {
    var i, n;
    return render_effect(() => {
      i = n, n = [], untrack(() => {
        r !== t(...n) && (e(r, ...n), i && is_bound_this(t(...i), r) && e(null, ...i));
      });
    }), () => {
      queue_micro_task(() => {
        n && is_bound_this(t(...n), r) && e(null, ...n);
      });
    };
  }), r;
}
function preventDefault(r) {
  return function(...e) {
    var t = (
      /** @type {Event} */
      e[0]
    );
    return t.preventDefault(), r == null ? void 0 : r.apply(this, e);
  };
}
function init(r = !1) {
  const e = (
    /** @type {ComponentContextLegacy} */
    component_context
  ), t = e.l.u;
  if (!t) return;
  let s = () => deep_read_state(e.s);
  if (r) {
    let i = 0, n = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ derived(() => {
      let l = !1;
      const c = e.s;
      for (const u in c)
        c[u] !== n[u] && (n[u] = c[u], l = !0);
      return l && i++, i;
    });
    s = () => get$2(o);
  }
  t.b.length && user_pre_effect(() => {
    observe_all(e, s), run_all(t.b);
  }), user_effect(() => {
    const i = untrack(() => t.m.map(run));
    return () => {
      for (const n of i)
        typeof n == "function" && n();
    };
  }), t.a.length && user_effect(() => {
    observe_all(e, s), run_all(t.a);
  });
}
function observe_all(r, e) {
  if (r.l.s)
    for (const t of r.l.s) get$2(t);
  e();
}
let is_store_binding = !1, IS_UNMOUNTED = Symbol();
function store_get(r, e, t) {
  const s = t[e] ?? (t[e] = {
    store: null,
    source: /* @__PURE__ */ mutable_source(void 0),
    unsubscribe: noop$2
  });
  if (s.store !== r && !(IS_UNMOUNTED in t))
    if (s.unsubscribe(), s.store = r ?? null, r == null)
      s.source.v = void 0, s.unsubscribe = noop$2;
    else {
      var i = !0;
      s.unsubscribe = subscribe_to_store(r, (n) => {
        i ? s.source.v = n : set(s.source, n);
      }), i = !1;
    }
  return r && IS_UNMOUNTED in t ? get$1(r) : get$2(s.source);
}
function setup_stores() {
  const r = {};
  function e() {
    teardown(() => {
      for (var t in r)
        r[t].unsubscribe();
      define_property(r, IS_UNMOUNTED, {
        enumerable: !1,
        value: !0
      });
    });
  }
  return [r, e];
}
function capture_store_binding(r) {
  var e = is_store_binding;
  try {
    return is_store_binding = !1, [r(), is_store_binding];
  } finally {
    is_store_binding = e;
  }
}
function has_destroyed_component_ctx(r) {
  var e;
  return ((e = r.ctx) == null ? void 0 : e.d) ?? !1;
}
function prop(r, e, t, s) {
  var k;
  var i = (t & PROPS_IS_IMMUTABLE) !== 0, n = !legacy_mode_flag || (t & PROPS_IS_RUNES) !== 0, o = (t & PROPS_IS_BINDABLE) !== 0, l = (t & PROPS_IS_LAZY_INITIAL) !== 0, c = !1, u;
  o ? [u, c] = capture_store_binding(() => (
    /** @type {V} */
    r[e]
  )) : u = /** @type {V} */
  r[e];
  var d = STATE_SYMBOL in r || LEGACY_PROPS in r, f = o && (((k = get_descriptor(r, e)) == null ? void 0 : k.set) ?? (d && e in r && ((A) => r[e] = A))) || void 0, h = (
    /** @type {V} */
    s
  ), _ = !0, g = !1, v = () => (g = !0, _ && (_ = !1, l ? h = untrack(
    /** @type {() => V} */
    s
  ) : h = /** @type {V} */
  s), h);
  u === void 0 && s !== void 0 && (f && n && props_invalid_value(), u = v(), f && f(u));
  var m;
  if (n)
    m = () => {
      var A = (
        /** @type {V} */
        r[e]
      );
      return A === void 0 ? v() : (_ = !0, g = !1, A);
    };
  else {
    var y = (i ? derived : derived_safe_equal)(
      () => (
        /** @type {V} */
        r[e]
      )
    );
    y.f |= LEGACY_DERIVED_PROP, m = () => {
      var A = get$2(y);
      return A !== void 0 && (h = /** @type {V} */
      void 0), A === void 0 ? h : A;
    };
  }
  if (!(t & PROPS_IS_UPDATED))
    return m;
  if (f) {
    var E = r.$$legacy;
    return function(A, $) {
      return arguments.length > 0 ? ((!n || !$ || E || c) && f($ ? m() : A), A) : m();
    };
  }
  var w = !1, T = /* @__PURE__ */ mutable_source(u), b = /* @__PURE__ */ derived(() => {
    var A = m(), $ = get$2(T);
    return w ? (w = !1, $) : T.v = A;
  });
  return o && get$2(b), i || (b.equals = safe_equals), function(A, $) {
    if (arguments.length > 0) {
      const x = $ ? get$2(b) : n && o ? proxy(A) : A;
      if (!b.equals(x)) {
        if (w = !0, set(T, x), g && h !== void 0 && (h = x), has_destroyed_component_ctx(b))
          return A;
        untrack(() => get$2(b));
      }
      return A;
    }
    return has_destroyed_component_ctx(b) ? b.v : get$2(b);
  };
}
function createClassComponent(r) {
  return new Svelte4Component(r);
}
var q, U;
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    /** @type {any} */
    G(this, q);
    /** @type {Record<string, any>} */
    G(this, U);
    var n;
    var t = /* @__PURE__ */ new Map(), s = (o, l) => {
      var c = /* @__PURE__ */ mutable_source(l);
      return t.set(o, c), c;
    };
    const i = new Proxy(
      { ...e.props || {}, $$events: {} },
      {
        get(o, l) {
          return get$2(t.get(l) ?? s(l, Reflect.get(o, l)));
        },
        has(o, l) {
          return l === LEGACY_PROPS ? !0 : (get$2(t.get(l) ?? s(l, Reflect.get(o, l))), Reflect.has(o, l));
        },
        set(o, l, c) {
          return set(t.get(l) ?? s(l, c), c), Reflect.set(o, l, c);
        }
      }
    );
    H(this, U, (e.hydrate ? hydrate : mount)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: i,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover
    })), (!((n = e == null ? void 0 : e.props) != null && n.$$host) || e.sync === !1) && flushSync(), H(this, q, i.$$events);
    for (const o of Object.keys(M(this, U)))
      o === "$set" || o === "$destroy" || o === "$on" || define_property(this, o, {
        get() {
          return M(this, U)[o];
        },
        /** @param {any} value */
        set(l) {
          M(this, U)[o] = l;
        },
        enumerable: !0
      });
    M(this, U).$set = /** @param {Record<string, any>} next */
    (o) => {
      Object.assign(i, o);
    }, M(this, U).$destroy = () => {
      unmount(M(this, U));
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    M(this, U).$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, t) {
    M(this, q)[e] = M(this, q)[e] || [];
    const s = (...i) => t.call(this, ...i);
    return M(this, q)[e].push(s), () => {
      M(this, q)[e] = M(this, q)[e].filter(
        /** @param {any} fn */
        (i) => i !== s
      );
    };
  }
  $destroy() {
    M(this, U).$destroy();
  }
}
q = new WeakMap(), U = new WeakMap();
let SvelteElement;
typeof HTMLElement == "function" && (SvelteElement = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(e, t, s) {
    super();
    /** The Svelte component constructor */
    D(this, "$$ctor");
    /** Slots */
    D(this, "$$s");
    /** @type {any} The Svelte component instance */
    D(this, "$$c");
    /** Whether or not the custom element is connected */
    D(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    D(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    D(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    D(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    D(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    D(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    D(this, "$$me");
    this.$$ctor = e, this.$$s = t, s && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, t, s) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const i = this.$$c.$on(e, t);
      this.$$l_u.set(t, i);
    }
    super.addEventListener(e, t, s);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(e, t, s) {
    if (super.removeEventListener(e, t, s), this.$$c) {
      const i = this.$$l_u.get(t);
      i && (i(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(i) {
        return (n) => {
          const o = document.createElement("slot");
          i !== "default" && (o.name = i), append(n, o);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const t = {}, s = get_custom_elements_slots(this);
      for (const i of this.$$s)
        i in s && (i === "default" && !this.$$d.children ? (this.$$d.children = e(i), t.default = !0) : t[i] = e(i));
      for (const i of this.attributes) {
        const n = this.$$g_p(i.name);
        n in this.$$d || (this.$$d[n] = get_custom_element_value(n, i.value, this.$$p_d, "toProp"));
      }
      for (const i in this.$$p_d)
        !(i in this.$$d) && this[i] !== void 0 && (this.$$d[i] = this[i], delete this[i]);
      this.$$c = createClassComponent({
        component: this.$$ctor,
        target: this.shadowRoot || this,
        props: {
          ...this.$$d,
          $$slots: t,
          $$host: this
        }
      }), this.$$me = effect_root(() => {
        render_effect(() => {
          var i;
          this.$$r = !0;
          for (const n of object_keys(this.$$c)) {
            if (!((i = this.$$p_d[n]) != null && i.reflect)) continue;
            this.$$d[n] = this.$$c[n];
            const o = get_custom_element_value(
              n,
              this.$$d[n],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[n].attribute || n) : this.setAttribute(this.$$p_d[n].attribute || n, o);
          }
          this.$$r = !1;
        });
      });
      for (const i in this.$$l)
        for (const n of this.$$l[i]) {
          const o = this.$$c.$on(i, n);
          this.$$l_u.set(n, o);
        }
      this.$$l = {};
    }
  }
  // We don't need this when working within Svelte code, but for compatibility of people using this outside of Svelte
  // and setting attributes through setAttribute etc, this is helpful
  /**
   * @param {string} attr
   * @param {string} _oldValue
   * @param {string} newValue
   */
  attributeChangedCallback(e, t, s) {
    var i;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = get_custom_element_value(e, s, this.$$p_d, "toProp"), (i = this.$$c) == null || i.$set({ [e]: this.$$d[e] }));
  }
  disconnectedCallback() {
    this.$$cn = !1, Promise.resolve().then(() => {
      !this.$$cn && this.$$c && (this.$$c.$destroy(), this.$$me(), this.$$c = void 0);
    });
  }
  /**
   * @param {string} attribute_name
   */
  $$g_p(e) {
    return object_keys(this.$$p_d).find(
      (t) => this.$$p_d[t].attribute === e || !this.$$p_d[t].attribute && t.toLowerCase() === e
    ) || e;
  }
});
function get_custom_element_value(r, e, t, s) {
  var n;
  const i = (n = t[r]) == null ? void 0 : n.type;
  if (e = i === "Boolean" && typeof e != "boolean" ? e != null : e, !s || !t[r])
    return e;
  if (s === "toAttribute")
    switch (i) {
      case "Object":
      case "Array":
        return e == null ? null : JSON.stringify(e);
      case "Boolean":
        return e ? "" : null;
      case "Number":
        return e ?? null;
      default:
        return e;
    }
  else
    switch (i) {
      case "Object":
      case "Array":
        return e && JSON.parse(e);
      case "Boolean":
        return e;
      case "Number":
        return e != null ? +e : e;
      default:
        return e;
    }
}
function get_custom_elements_slots(r) {
  const e = {};
  return r.childNodes.forEach((t) => {
    e[
      /** @type {Element} node */
      t.slot || "default"
    ] = !0;
  }), e;
}
function create_custom_element(r, e, t, s, i, n) {
  let o = class extends SvelteElement {
    constructor() {
      super(r, t, i), this.$$p_d = e;
    }
    static get observedAttributes() {
      return object_keys(e).map(
        (l) => (e[l].attribute || l).toLowerCase()
      );
    }
  };
  return object_keys(e).forEach((l) => {
    define_property(o.prototype, l, {
      get() {
        return this.$$c && l in this.$$c ? this.$$c[l] : this.$$d[l];
      },
      set(c) {
        var f;
        c = get_custom_element_value(l, c, e), this.$$d[l] = c;
        var u = this.$$c;
        if (u) {
          var d = (f = get_descriptor(u, l)) == null ? void 0 : f.get;
          d ? u[l] = c : u.$set({ [l]: c });
        }
      }
    });
  }), s.forEach((l) => {
    define_property(o.prototype, l, {
      get() {
        var c;
        return (c = this.$$c) == null ? void 0 : c[l];
      }
    });
  }), r.element = /** @type {any} */
  o, o;
}
function onMount(r) {
  component_context === null && lifecycle_outside_component(), legacy_mode_flag && component_context.l !== null ? init_update_callbacks(component_context).m.push(r) : user_effect(() => {
    const e = untrack(r);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function create_custom_event(r, e, { bubbles: t = !1, cancelable: s = !1 } = {}) {
  return new CustomEvent(r, { detail: e, bubbles: t, cancelable: s });
}
function createEventDispatcher() {
  const r = component_context;
  return r === null && lifecycle_outside_component(), (e, t, s) => {
    var n;
    const i = (
      /** @type {Record<string, Function | Function[]>} */
      (n = r.s.$$events) == null ? void 0 : n[
        /** @type {any} */
        e
      ]
    );
    if (i) {
      const o = is_array(i) ? i.slice() : [i], l = create_custom_event(
        /** @type {string} */
        e,
        t,
        s
      );
      for (const c of o)
        c.call(r.x, l);
      return !l.defaultPrevented;
    }
    return !0;
  };
}
function init_update_callbacks(r) {
  var e = (
    /** @type {ComponentContextLegacy} */
    r.l
  );
  return e.u ?? (e.u = { a: [], b: [], m: [] });
}
function subscribe_to_store(r, e, t) {
  if (r == null)
    return e(void 0), noop$2;
  const s = untrack(
    () => r.subscribe(
      e,
      // @ts-expect-error
      t
    )
  );
  return s.unsubscribe ? () => s.unsubscribe() : s;
}
const subscriber_queue = [];
function writable(r, e = noop$2) {
  let t = null;
  const s = /* @__PURE__ */ new Set();
  function i(l) {
    if (safe_not_equal(r, l) && (r = l, t)) {
      const c = !subscriber_queue.length;
      for (const u of s)
        u[1](), subscriber_queue.push(u, r);
      if (c) {
        for (let u = 0; u < subscriber_queue.length; u += 2)
          subscriber_queue[u][0](subscriber_queue[u + 1]);
        subscriber_queue.length = 0;
      }
    }
  }
  function n(l) {
    i(l(
      /** @type {T} */
      r
    ));
  }
  function o(l, c = noop$2) {
    const u = [l, c];
    return s.add(u), s.size === 1 && (t = e(i, n) || noop$2), l(
      /** @type {T} */
      r
    ), () => {
      s.delete(u), s.size === 0 && t && (t(), t = null);
    };
  }
  return { set: i, update: n, subscribe: o };
}
function get$1(r) {
  let e;
  return subscribe_to_store(r, (t) => e = t)(), e;
}
const nexusApi = new NexusApi(), displayCurrency = writable("EUR"), marketCurrency = writable("EUR"), currencyRates = writable(null);
marketCurrency.subscribe(
  async (r) => currencyRates.set(await nexusApi.getCurrencyRates(r))
);
const BASE_URL = "http://172.20.10.6:5173/api", API_ROUTES = {
  GET_AUTOMATIC_DISCOUNT: (r, e) => `automatic-discount/${r}/${e}`
}, getAutomaticDiscount = async (r, e) => {
  const t = await fetch(
    `${BASE_URL}/${API_ROUTES.GET_AUTOMATIC_DISCOUNT(r, e)}`,
    { method: "GET" }
  );
  try {
    return await t.json();
  } catch (s) {
    console.error(s);
  }
}, PUBLIC_VERSION = "5";
var Y;
typeof window < "u" && ((Y = window.__svelte ?? (window.__svelte = {})).v ?? (Y.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
enable_legacy_mode_flag();
var root_1$6 = /* @__PURE__ */ template('<article class="card svelte-eaw9ki"><img class="svelte-eaw9ki"> <div class="content svelte-eaw9ki"><h3 class="svelte-eaw9ki"> </h3> <div class="tuple text-green-600 svelte-eaw9ki"><p> </p></div> <div class="ctas-buttons svelte-eaw9ki"><a style="transform: rotate(180deg)"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-eaw9ki"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a> <a class="cta svelte-eaw9ki"><span>Add to cart</span></a>    <a><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-eaw9ki"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a></div></div></article>');
const $$css$e = {
  hash: "svelte-eaw9ki",
  code: `/* Colors */
/**
 * Text styles
 */.text-green-600.svelte-eaw9ki, .text-green-600 {color:#018849;}

/**
 * Background styles
 */ .cta.svelte-eaw9ki, .bg-green-600 {background-color:#018849;}body {display:none !important;}.cta.svelte-eaw9ki {color:#ffffff;cursor:pointer;}.card.svelte-eaw9ki {width:100%;max-width:400px;display:flex;gap:27px;color:inherit;text-decoration:none;}.caret.svelte-eaw9ki {background-color:#000000;color:#ffffff;fill:#ffffff;cursor:pointer;}.caret---qualified.svelte-eaw9ki {background-color:#018849;}.stroke.svelte-eaw9ki {text-decoration:line-through;}.ctas-buttons.svelte-eaw9ki {display:flex;gap:1px;justify-content:center;align-content:center;}a.svelte-eaw9ki {display:flex;justify-content:center;align-items:center;font-size:14px;border:none;color:#000;background-color:#b4bed6;font-family:Monument, sans-serif;width:100%;height:41px;text-decoration:none;text-transform:uppercase;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:-0.22px;}a.svelte-eaw9ki:nth-child(1),
a.svelte-eaw9ki:nth-child(3) {aspect-ratio:1/1;flex-shrink:1;width:auto;}a.svelte-eaw9ki svg:where(.svelte-eaw9ki) {width:16px;}.content.svelte-eaw9ki {width:70%;display:flex;flex-direction:column;}h3.svelte-eaw9ki {margin:0;margin-bottom:10px;font-weight:100;min-height:32px;font-size:16px;color:#000;font-family:Panama, sans-serif;text-align:left;cursor:pointer;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:-0.22px;line-height:16px;}
.price.svelte-eaw9ki {margin:0 0 10px;text-transform:uppercase;font-weight:500;font-family:Monument, sans-serif;color:#000;font-size:14px;letter-spacing:-0.22px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;}.price.svelte-eaw9ki {margin-bottom:10px;}p.svelte-eaw9ki {margin:0;}.tuple.svelte-eaw9ki {display:flex;justify-content:space-between;align-items:start;flex-grow:1;}img.svelte-eaw9ki {display:block;width:30%;object-fit:cover;aspect-ratio:4/5;cursor:pointer;}`
};
function CartRecommendationCard($$anchor, $$props) {
  push($$props, !1), append_styles($$anchor, $$css$e);
  let id = prop($$props, "id", 12, void 0), title = prop($$props, "title", 12, void 0), featured_image = prop($$props, "featured_image", 12, void 0), price = prop($$props, "price", 12, void 0), url = prop($$props, "url", 12, void 0), onPrevious = prop($$props, "onPrevious", 12, ""), onNext = prop($$props, "onNext", 12, ""), spend_goal = prop($$props, "spend_goal", 12, 1), already_spent = prop($$props, "already_spent", 12, 2), isFreeGiftQualified = !1;
  const addToCart = () => {
    if (!window.CartJS) return console.error("Trying to add item, but CartJS is not accessible");
    if (!id()) return console.error("Trying to add item, but id is not provided");
    window.CartJS.addItem(id(), 1);
  }, toItem = () => {
    url() && (window.location.href = url());
  };
  var fragment = comment(), node = first_child(fragment);
  {
    var consequent = ($$anchor) => {
      var article = root_1$6(), img = child(article), div = sibling(img, 2), h3 = child(div), text = child(h3, !0);
      reset(h3);
      var div_1 = sibling(h3, 2), p = child(div_1);
      set_class(p, 1, "price svelte-eaw9ki", null, {}, { stroke: isFreeGiftQualified });
      var text_1 = child(p, !0);
      reset(p), reset(div_1);
      var div_2 = sibling(div_1, 2), a = child(div_2);
      set_class(a, 1, "caret svelte-eaw9ki", null, {}, {
        "caret---qualified": !0
      });
      var a_1 = sibling(a, 2), a_2 = sibling(a_1, 2);
      set_class(a_2, 1, "caret svelte-eaw9ki", null, {}, {
        "caret---qualified": !0
      }), reset(div_2), reset(div), reset(article), template_effect(() => {
        set_attribute(img, "src", featured_image()), set_attribute(img, "alt", title()), set_text(text, title()), set_text(text_1, price());
      }), event("click", img, toItem), event("click", h3, toItem), event("click", a, () => eval(onPrevious())), event("click", a_1, addToCart), event("click", a_2, () => eval(onNext())), append($$anchor, article);
    };
    if_block(node, (r) => {
      title() && featured_image() && price() && url() && r(consequent);
    });
  }
  return append($$anchor, fragment), pop({
    get id() {
      return id();
    },
    set id(r) {
      id(r), flushSync();
    },
    get title() {
      return title();
    },
    set title(r) {
      title(r), flushSync();
    },
    get featured_image() {
      return featured_image();
    },
    set featured_image(r) {
      featured_image(r), flushSync();
    },
    get price() {
      return price();
    },
    set price(r) {
      price(r), flushSync();
    },
    get url() {
      return url();
    },
    set url(r) {
      url(r), flushSync();
    },
    get onPrevious() {
      return onPrevious();
    },
    set onPrevious(r) {
      onPrevious(r), flushSync();
    },
    get onNext() {
      return onNext();
    },
    set onNext(r) {
      onNext(r), flushSync();
    },
    get spend_goal() {
      return spend_goal();
    },
    set spend_goal(r) {
      spend_goal(r), flushSync();
    },
    get already_spent() {
      return already_spent();
    },
    set already_spent(r) {
      already_spent(r), flushSync();
    }
  });
}
customElements.define("cart-recommendation-card", create_custom_element(
  CartRecommendationCard,
  {
    id: {},
    title: {},
    featured_image: {},
    price: {},
    url: {},
    onPrevious: {},
    onNext: {},
    spend_goal: {},
    already_spent: {}
  },
  [],
  [],
  !0
));
const resolveFetch$3 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$4).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
};
class FunctionsError extends Error {
  constructor(e, t = "FunctionsError", s) {
    super(e), this.name = t, this.context = s;
  }
}
class FunctionsFetchError extends FunctionsError {
  constructor(e) {
    super("Failed to send a request to the Edge Function", "FunctionsFetchError", e);
  }
}
class FunctionsRelayError extends FunctionsError {
  constructor(e) {
    super("Relay Error invoking the Edge Function", "FunctionsRelayError", e);
  }
}
class FunctionsHttpError extends FunctionsError {
  constructor(e) {
    super("Edge Function returned a non-2xx status code", "FunctionsHttpError", e);
  }
}
var FunctionRegion;
(function(r) {
  r.Any = "any", r.ApNortheast1 = "ap-northeast-1", r.ApNortheast2 = "ap-northeast-2", r.ApSouth1 = "ap-south-1", r.ApSoutheast1 = "ap-southeast-1", r.ApSoutheast2 = "ap-southeast-2", r.CaCentral1 = "ca-central-1", r.EuCentral1 = "eu-central-1", r.EuWest1 = "eu-west-1", r.EuWest2 = "eu-west-2", r.EuWest3 = "eu-west-3", r.SaEast1 = "sa-east-1", r.UsEast1 = "us-east-1", r.UsWest1 = "us-west-1", r.UsWest2 = "us-west-2";
})(FunctionRegion || (FunctionRegion = {}));
var __awaiter$7 = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
class FunctionsClient {
  constructor(e, { headers: t = {}, customFetch: s, region: i = FunctionRegion.Any } = {}) {
    this.url = e, this.headers = t, this.region = i, this.fetch = resolveFetch$3(s);
  }
  /**
   * Updates the authorization header
   * @param token - the new jwt token sent in the authorisation header
   */
  setAuth(e) {
    this.headers.Authorization = `Bearer ${e}`;
  }
  /**
   * Invokes a function
   * @param functionName - The name of the Function to invoke.
   * @param options - Options for invoking the Function.
   */
  invoke(e, t = {}) {
    var s;
    return __awaiter$7(this, void 0, void 0, function* () {
      try {
        const { headers: i, method: n, body: o } = t;
        let l = {}, { region: c } = t;
        c || (c = this.region), c && c !== "any" && (l["x-region"] = c);
        let u;
        o && (i && !Object.prototype.hasOwnProperty.call(i, "Content-Type") || !i) && (typeof Blob < "u" && o instanceof Blob || o instanceof ArrayBuffer ? (l["Content-Type"] = "application/octet-stream", u = o) : typeof o == "string" ? (l["Content-Type"] = "text/plain", u = o) : typeof FormData < "u" && o instanceof FormData ? u = o : (l["Content-Type"] = "application/json", u = JSON.stringify(o)));
        const d = yield this.fetch(`${this.url}/${e}`, {
          method: n || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, l), this.headers), i),
          body: u
        }).catch((g) => {
          throw new FunctionsFetchError(g);
        }), f = d.headers.get("x-relay-error");
        if (f && f === "true")
          throw new FunctionsRelayError(d);
        if (!d.ok)
          throw new FunctionsHttpError(d);
        let h = ((s = d.headers.get("Content-Type")) !== null && s !== void 0 ? s : "text/plain").split(";")[0].trim(), _;
        return h === "application/json" ? _ = yield d.json() : h === "application/octet-stream" ? _ = yield d.blob() : h === "text/event-stream" ? _ = d : h === "multipart/form-data" ? _ = yield d.formData() : _ = yield d.text(), { data: _, error: null };
      } catch (i) {
        return { data: null, error: i };
      }
    });
  }
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function getDefaultExportFromCjs(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
function getAugmentedNamespace(r) {
  if (r.__esModule) return r;
  var e = r.default;
  if (typeof e == "function") {
    var t = function s() {
      return this instanceof s ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(s) {
    var i = Object.getOwnPropertyDescriptor(r, s);
    Object.defineProperty(t, s, i.get ? i : {
      enumerable: !0,
      get: function() {
        return r[s];
      }
    });
  }), t;
}
var cjs = {}, PostgrestClient$2 = {}, PostgrestQueryBuilder$2 = {}, PostgrestFilterBuilder$2 = {}, PostgrestTransformBuilder$2 = {}, PostgrestBuilder$2 = {}, getGlobal = function() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}, globalObject = getGlobal();
const fetch$1 = globalObject.fetch, nodeFetch = globalObject.fetch.bind(globalObject), Headers$1 = globalObject.Headers, Request = globalObject.Request, Response$1 = globalObject.Response, browser$4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Headers: Headers$1,
  Request,
  Response: Response$1,
  default: nodeFetch,
  fetch: fetch$1
}, Symbol.toStringTag, { value: "Module" })), require$$0 = /* @__PURE__ */ getAugmentedNamespace(browser$4);
var PostgrestError$2 = {};
Object.defineProperty(PostgrestError$2, "__esModule", { value: !0 });
let PostgrestError$1 = class extends Error {
  constructor(e) {
    super(e.message), this.name = "PostgrestError", this.details = e.details, this.hint = e.hint, this.code = e.code;
  }
};
PostgrestError$2.default = PostgrestError$1;
var __importDefault$5 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(PostgrestBuilder$2, "__esModule", { value: !0 });
const node_fetch_1 = __importDefault$5(require$$0), PostgrestError_1$1 = __importDefault$5(PostgrestError$2);
let PostgrestBuilder$1 = class {
  constructor(e) {
    this.shouldThrowOnError = !1, this.method = e.method, this.url = e.url, this.headers = e.headers, this.schema = e.schema, this.body = e.body, this.shouldThrowOnError = e.shouldThrowOnError, this.signal = e.signal, this.isMaybeSingle = e.isMaybeSingle, e.fetch ? this.fetch = e.fetch : typeof fetch > "u" ? this.fetch = node_fetch_1.default : this.fetch = fetch;
  }
  /**
   * If there's an error with the query, throwOnError will reject the promise by
   * throwing the error instead of returning it as part of a successful response.
   *
   * {@link https://github.com/supabase/supabase-js/issues/92}
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Set an HTTP header for the request.
   */
  setHeader(e, t) {
    return this.headers = Object.assign({}, this.headers), this.headers[e] = t, this;
  }
  then(e, t) {
    this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers["Accept-Profile"] = this.schema : this.headers["Content-Profile"] = this.schema), this.method !== "GET" && this.method !== "HEAD" && (this.headers["Content-Type"] = "application/json");
    const s = this.fetch;
    let i = s(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then(async (n) => {
      var o, l, c;
      let u = null, d = null, f = null, h = n.status, _ = n.statusText;
      if (n.ok) {
        if (this.method !== "HEAD") {
          const y = await n.text();
          y === "" || (this.headers.Accept === "text/csv" || this.headers.Accept && this.headers.Accept.includes("application/vnd.pgrst.plan+text") ? d = y : d = JSON.parse(y));
        }
        const v = (o = this.headers.Prefer) === null || o === void 0 ? void 0 : o.match(/count=(exact|planned|estimated)/), m = (l = n.headers.get("content-range")) === null || l === void 0 ? void 0 : l.split("/");
        v && m && m.length > 1 && (f = parseInt(m[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(d) && (d.length > 1 ? (u = {
          // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
          code: "PGRST116",
          details: `Results contain ${d.length} rows, application/vnd.pgrst.object+json requires 1 row`,
          hint: null,
          message: "JSON object requested, multiple (or no) rows returned"
        }, d = null, f = null, h = 406, _ = "Not Acceptable") : d.length === 1 ? d = d[0] : d = null);
      } else {
        const v = await n.text();
        try {
          u = JSON.parse(v), Array.isArray(u) && n.status === 404 && (d = [], u = null, h = 200, _ = "OK");
        } catch {
          n.status === 404 && v === "" ? (h = 204, _ = "No Content") : u = {
            message: v
          };
        }
        if (u && this.isMaybeSingle && (!((c = u == null ? void 0 : u.details) === null || c === void 0) && c.includes("0 rows")) && (u = null, h = 200, _ = "OK"), u && this.shouldThrowOnError)
          throw new PostgrestError_1$1.default(u);
      }
      return {
        error: u,
        data: d,
        count: f,
        status: h,
        statusText: _
      };
    });
    return this.shouldThrowOnError || (i = i.catch((n) => {
      var o, l, c;
      return {
        error: {
          message: `${(o = n == null ? void 0 : n.name) !== null && o !== void 0 ? o : "FetchError"}: ${n == null ? void 0 : n.message}`,
          details: `${(l = n == null ? void 0 : n.stack) !== null && l !== void 0 ? l : ""}`,
          hint: "",
          code: `${(c = n == null ? void 0 : n.code) !== null && c !== void 0 ? c : ""}`
        },
        data: null,
        count: null,
        status: 0,
        statusText: ""
      };
    })), i.then(e, t);
  }
  /**
   * Override the type of the returned `data`.
   *
   * @typeParam NewResult - The new result type to override with
   * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
   */
  returns() {
    return this;
  }
  /**
   * Override the type of the returned `data` field in the response.
   *
   * @typeParam NewResult - The new type to cast the response data to
   * @typeParam Options - Optional type configuration (defaults to { merge: true })
   * @typeParam Options.merge - When true, merges the new type with existing return type. When false, replaces the existing types entirely (defaults to true)
   * @example
   * ```typescript
   * // Merge with existing types (default behavior)
   * const query = supabase
   *   .from('users')
   *   .select()
   *   .overrideTypes<{ custom_field: string }>()
   *
   * // Replace existing types completely
   * const replaceQuery = supabase
   *   .from('users')
   *   .select()
   *   .overrideTypes<{ id: number; name: string }, { merge: false }>()
   * ```
   * @returns A PostgrestBuilder instance with the new type
   */
  overrideTypes() {
    return this;
  }
};
PostgrestBuilder$2.default = PostgrestBuilder$1;
var __importDefault$4 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(PostgrestTransformBuilder$2, "__esModule", { value: !0 });
const PostgrestBuilder_1$1 = __importDefault$4(PostgrestBuilder$2);
let PostgrestTransformBuilder$1 = class extends PostgrestBuilder_1$1.default {
  /**
   * Perform a SELECT on the query result.
   *
   * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
   * return modified rows. By calling this method, modified rows are returned in
   * `data`.
   *
   * @param columns - The columns to retrieve, separated by commas
   */
  select(e) {
    let t = !1;
    const s = (e ?? "*").split("").map((i) => /\s/.test(i) && !t ? "" : (i === '"' && (t = !t), i)).join("");
    return this.url.searchParams.set("select", s), this.headers.Prefer && (this.headers.Prefer += ","), this.headers.Prefer += "return=representation", this;
  }
  /**
   * Order the query result by `column`.
   *
   * You can call this method multiple times to order by multiple columns.
   *
   * You can order referenced tables, but it only affects the ordering of the
   * parent table if you use `!inner` in the query.
   *
   * @param column - The column to order by
   * @param options - Named parameters
   * @param options.ascending - If `true`, the result will be in ascending order
   * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
   * `null`s appear last.
   * @param options.referencedTable - Set this to order a referenced table by
   * its columns
   * @param options.foreignTable - Deprecated, use `options.referencedTable`
   * instead
   */
  order(e, { ascending: t = !0, nullsFirst: s, foreignTable: i, referencedTable: n = i } = {}) {
    const o = n ? `${n}.order` : "order", l = this.url.searchParams.get(o);
    return this.url.searchParams.set(o, `${l ? `${l},` : ""}${e}.${t ? "asc" : "desc"}${s === void 0 ? "" : s ? ".nullsfirst" : ".nullslast"}`), this;
  }
  /**
   * Limit the query result by `count`.
   *
   * @param count - The maximum number of rows to return
   * @param options - Named parameters
   * @param options.referencedTable - Set this to limit rows of referenced
   * tables instead of the parent table
   * @param options.foreignTable - Deprecated, use `options.referencedTable`
   * instead
   */
  limit(e, { foreignTable: t, referencedTable: s = t } = {}) {
    const i = typeof s > "u" ? "limit" : `${s}.limit`;
    return this.url.searchParams.set(i, `${e}`), this;
  }
  /**
   * Limit the query result by starting at an offset `from` and ending at the offset `to`.
   * Only records within this range are returned.
   * This respects the query order and if there is no order clause the range could behave unexpectedly.
   * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
   * and fourth rows of the query.
   *
   * @param from - The starting index from which to limit the result
   * @param to - The last index to which to limit the result
   * @param options - Named parameters
   * @param options.referencedTable - Set this to limit rows of referenced
   * tables instead of the parent table
   * @param options.foreignTable - Deprecated, use `options.referencedTable`
   * instead
   */
  range(e, t, { foreignTable: s, referencedTable: i = s } = {}) {
    const n = typeof i > "u" ? "offset" : `${i}.offset`, o = typeof i > "u" ? "limit" : `${i}.limit`;
    return this.url.searchParams.set(n, `${e}`), this.url.searchParams.set(o, `${t - e + 1}`), this;
  }
  /**
   * Set the AbortSignal for the fetch request.
   *
   * @param signal - The AbortSignal to use for the fetch request
   */
  abortSignal(e) {
    return this.signal = e, this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be one row (e.g. using `.limit(1)`), otherwise this
   * returns an error.
   */
  single() {
    return this.headers.Accept = "application/vnd.pgrst.object+json", this;
  }
  /**
   * Return `data` as a single object instead of an array of objects.
   *
   * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
   * this returns an error.
   */
  maybeSingle() {
    return this.method === "GET" ? this.headers.Accept = "application/json" : this.headers.Accept = "application/vnd.pgrst.object+json", this.isMaybeSingle = !0, this;
  }
  /**
   * Return `data` as a string in CSV format.
   */
  csv() {
    return this.headers.Accept = "text/csv", this;
  }
  /**
   * Return `data` as an object in [GeoJSON](https://geojson.org) format.
   */
  geojson() {
    return this.headers.Accept = "application/geo+json", this;
  }
  /**
   * Return `data` as the EXPLAIN plan for the query.
   *
   * You need to enable the
   * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
   * setting before using this method.
   *
   * @param options - Named parameters
   *
   * @param options.analyze - If `true`, the query will be executed and the
   * actual run time will be returned
   *
   * @param options.verbose - If `true`, the query identifier will be returned
   * and `data` will include the output columns of the query
   *
   * @param options.settings - If `true`, include information on configuration
   * parameters that affect query planning
   *
   * @param options.buffers - If `true`, include information on buffer usage
   *
   * @param options.wal - If `true`, include information on WAL record generation
   *
   * @param options.format - The format of the output, can be `"text"` (default)
   * or `"json"`
   */
  explain({ analyze: e = !1, verbose: t = !1, settings: s = !1, buffers: i = !1, wal: n = !1, format: o = "text" } = {}) {
    var l;
    const c = [
      e ? "analyze" : null,
      t ? "verbose" : null,
      s ? "settings" : null,
      i ? "buffers" : null,
      n ? "wal" : null
    ].filter(Boolean).join("|"), u = (l = this.headers.Accept) !== null && l !== void 0 ? l : "application/json";
    return this.headers.Accept = `application/vnd.pgrst.plan+${o}; for="${u}"; options=${c};`, o === "json" ? this : this;
  }
  /**
   * Rollback the query.
   *
   * `data` will still be returned, but the query is not committed.
   */
  rollback() {
    var e;
    return ((e = this.headers.Prefer) !== null && e !== void 0 ? e : "").trim().length > 0 ? this.headers.Prefer += ",tx=rollback" : this.headers.Prefer = "tx=rollback", this;
  }
  /**
   * Override the type of the returned `data`.
   *
   * @typeParam NewResult - The new result type to override with
   * @deprecated Use overrideTypes<yourType, { merge: false }>() method at the end of your call chain instead
   */
  returns() {
    return this;
  }
};
PostgrestTransformBuilder$2.default = PostgrestTransformBuilder$1;
var __importDefault$3 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(PostgrestFilterBuilder$2, "__esModule", { value: !0 });
const PostgrestTransformBuilder_1$1 = __importDefault$3(PostgrestTransformBuilder$2);
let PostgrestFilterBuilder$1 = class extends PostgrestTransformBuilder_1$1.default {
  /**
   * Match only rows where `column` is equal to `value`.
   *
   * To check if the value of `column` is NULL, you should use `.is()` instead.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  eq(e, t) {
    return this.url.searchParams.append(e, `eq.${t}`), this;
  }
  /**
   * Match only rows where `column` is not equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  neq(e, t) {
    return this.url.searchParams.append(e, `neq.${t}`), this;
  }
  /**
   * Match only rows where `column` is greater than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gt(e, t) {
    return this.url.searchParams.append(e, `gt.${t}`), this;
  }
  /**
   * Match only rows where `column` is greater than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  gte(e, t) {
    return this.url.searchParams.append(e, `gte.${t}`), this;
  }
  /**
   * Match only rows where `column` is less than `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lt(e, t) {
    return this.url.searchParams.append(e, `lt.${t}`), this;
  }
  /**
   * Match only rows where `column` is less than or equal to `value`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  lte(e, t) {
    return this.url.searchParams.append(e, `lte.${t}`), this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-sensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  like(e, t) {
    return this.url.searchParams.append(e, `like.${t}`), this;
  }
  /**
   * Match only rows where `column` matches all of `patterns` case-sensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  likeAllOf(e, t) {
    return this.url.searchParams.append(e, `like(all).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` matches any of `patterns` case-sensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  likeAnyOf(e, t) {
    return this.url.searchParams.append(e, `like(any).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` matches `pattern` case-insensitively.
   *
   * @param column - The column to filter on
   * @param pattern - The pattern to match with
   */
  ilike(e, t) {
    return this.url.searchParams.append(e, `ilike.${t}`), this;
  }
  /**
   * Match only rows where `column` matches all of `patterns` case-insensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  ilikeAllOf(e, t) {
    return this.url.searchParams.append(e, `ilike(all).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` matches any of `patterns` case-insensitively.
   *
   * @param column - The column to filter on
   * @param patterns - The patterns to match with
   */
  ilikeAnyOf(e, t) {
    return this.url.searchParams.append(e, `ilike(any).{${t.join(",")}}`), this;
  }
  /**
   * Match only rows where `column` IS `value`.
   *
   * For non-boolean columns, this is only relevant for checking if the value of
   * `column` is NULL by setting `value` to `null`.
   *
   * For boolean columns, you can also set `value` to `true` or `false` and it
   * will behave the same way as `.eq()`.
   *
   * @param column - The column to filter on
   * @param value - The value to filter with
   */
  is(e, t) {
    return this.url.searchParams.append(e, `is.${t}`), this;
  }
  /**
   * Match only rows where `column` is included in the `values` array.
   *
   * @param column - The column to filter on
   * @param values - The values array to filter with
   */
  in(e, t) {
    const s = Array.from(new Set(t)).map((i) => typeof i == "string" && new RegExp("[,()]").test(i) ? `"${i}"` : `${i}`).join(",");
    return this.url.searchParams.append(e, `in.(${s})`), this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * `column` contains every element appearing in `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  contains(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `cs.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cs.{${t.join(",")}}`) : this.url.searchParams.append(e, `cs.${JSON.stringify(t)}`), this;
  }
  /**
   * Only relevant for jsonb, array, and range columns. Match only rows where
   * every element appearing in `column` is contained by `value`.
   *
   * @param column - The jsonb, array, or range column to filter on
   * @param value - The jsonb, array, or range value to filter with
   */
  containedBy(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `cd.${t}`) : Array.isArray(t) ? this.url.searchParams.append(e, `cd.{${t.join(",")}}`) : this.url.searchParams.append(e, `cd.${JSON.stringify(t)}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is greater than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGt(e, t) {
    return this.url.searchParams.append(e, `sr.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or greater than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeGte(e, t) {
    return this.url.searchParams.append(e, `nxl.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is less than any element in `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLt(e, t) {
    return this.url.searchParams.append(e, `sl.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where every element in
   * `column` is either contained in `range` or less than any element in
   * `range`.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeLte(e, t) {
    return this.url.searchParams.append(e, `nxr.${t}`), this;
  }
  /**
   * Only relevant for range columns. Match only rows where `column` is
   * mutually exclusive to `range` and there can be no element between the two
   * ranges.
   *
   * @param column - The range column to filter on
   * @param range - The range to filter with
   */
  rangeAdjacent(e, t) {
    return this.url.searchParams.append(e, `adj.${t}`), this;
  }
  /**
   * Only relevant for array and range columns. Match only rows where
   * `column` and `value` have an element in common.
   *
   * @param column - The array or range column to filter on
   * @param value - The array or range value to filter with
   */
  overlaps(e, t) {
    return typeof t == "string" ? this.url.searchParams.append(e, `ov.${t}`) : this.url.searchParams.append(e, `ov.{${t.join(",")}}`), this;
  }
  /**
   * Only relevant for text and tsvector columns. Match only rows where
   * `column` matches the query string in `query`.
   *
   * @param column - The text or tsvector column to filter on
   * @param query - The query text to match with
   * @param options - Named parameters
   * @param options.config - The text search configuration to use
   * @param options.type - Change how the `query` text is interpreted
   */
  textSearch(e, t, { config: s, type: i } = {}) {
    let n = "";
    i === "plain" ? n = "pl" : i === "phrase" ? n = "ph" : i === "websearch" && (n = "w");
    const o = s === void 0 ? "" : `(${s})`;
    return this.url.searchParams.append(e, `${n}fts${o}.${t}`), this;
  }
  /**
   * Match only rows where each column in `query` keys is equal to its
   * associated value. Shorthand for multiple `.eq()`s.
   *
   * @param query - The object to filter with, with column names as keys mapped
   * to their filter values
   */
  match(e) {
    return Object.entries(e).forEach(([t, s]) => {
      this.url.searchParams.append(t, `eq.${s}`);
    }), this;
  }
  /**
   * Match only rows which doesn't satisfy the filter.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to be negated to filter with, following
   * PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  not(e, t, s) {
    return this.url.searchParams.append(e, `not.${t}.${s}`), this;
  }
  /**
   * Match only rows which satisfy at least one of the filters.
   *
   * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure it's properly sanitized.
   *
   * It's currently not possible to do an `.or()` filter across multiple tables.
   *
   * @param filters - The filters to use, following PostgREST syntax
   * @param options - Named parameters
   * @param options.referencedTable - Set this to filter on referenced tables
   * instead of the parent table
   * @param options.foreignTable - Deprecated, use `referencedTable` instead
   */
  or(e, { foreignTable: t, referencedTable: s = t } = {}) {
    const i = s ? `${s}.or` : "or";
    return this.url.searchParams.append(i, `(${e})`), this;
  }
  /**
   * Match only rows which satisfy the filter. This is an escape hatch - you
   * should use the specific filter methods wherever possible.
   *
   * Unlike most filters, `opearator` and `value` are used as-is and need to
   * follow [PostgREST
   * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
   * to make sure they are properly sanitized.
   *
   * @param column - The column to filter on
   * @param operator - The operator to filter with, following PostgREST syntax
   * @param value - The value to filter with, following PostgREST syntax
   */
  filter(e, t, s) {
    return this.url.searchParams.append(e, `${t}.${s}`), this;
  }
};
PostgrestFilterBuilder$2.default = PostgrestFilterBuilder$1;
var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(PostgrestQueryBuilder$2, "__esModule", { value: !0 });
const PostgrestFilterBuilder_1$2 = __importDefault$2(PostgrestFilterBuilder$2);
let PostgrestQueryBuilder$1 = class {
  constructor(e, { headers: t = {}, schema: s, fetch: i }) {
    this.url = e, this.headers = t, this.schema = s, this.fetch = i;
  }
  /**
   * Perform a SELECT query on the table or view.
   *
   * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
   *
   * @param options - Named parameters
   *
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   *
   * @param options.count - Count algorithm to use to count rows in the table or view.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  select(e, { head: t = !1, count: s } = {}) {
    const i = t ? "HEAD" : "GET";
    let n = !1;
    const o = (e ?? "*").split("").map((l) => /\s/.test(l) && !n ? "" : (l === '"' && (n = !n), l)).join("");
    return this.url.searchParams.set("select", o), s && (this.headers.Prefer = `count=${s}`), new PostgrestFilterBuilder_1$2.default({
      method: i,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform an INSERT into the table or view.
   *
   * By default, inserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to insert. Pass an object to insert a single row
   * or an array to insert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count inserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   *
   * @param options.defaultToNull - Make missing fields default to `null`.
   * Otherwise, use the default value for the column. Only applies for bulk
   * inserts.
   */
  insert(e, { count: t, defaultToNull: s = !0 } = {}) {
    const i = "POST", n = [];
    if (this.headers.Prefer && n.push(this.headers.Prefer), t && n.push(`count=${t}`), s || n.push("missing=default"), this.headers.Prefer = n.join(","), Array.isArray(e)) {
      const o = e.reduce((l, c) => l.concat(Object.keys(c)), []);
      if (o.length > 0) {
        const l = [...new Set(o)].map((c) => `"${c}"`);
        this.url.searchParams.set("columns", l.join(","));
      }
    }
    return new PostgrestFilterBuilder_1$2.default({
      method: i,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform an UPSERT on the table or view. Depending on the column(s) passed
   * to `onConflict`, `.upsert()` allows you to perform the equivalent of
   * `.insert()` if a row with the corresponding `onConflict` columns doesn't
   * exist, or if it does exist, perform an alternative action depending on
   * `ignoreDuplicates`.
   *
   * By default, upserted rows are not returned. To return it, chain the call
   * with `.select()`.
   *
   * @param values - The values to upsert with. Pass an object to upsert a
   * single row or an array to upsert multiple rows.
   *
   * @param options - Named parameters
   *
   * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
   * duplicate rows are determined. Two rows are duplicates if all the
   * `onConflict` columns are equal.
   *
   * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
   * `false`, duplicate rows are merged with existing rows.
   *
   * @param options.count - Count algorithm to use to count upserted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   *
   * @param options.defaultToNull - Make missing fields default to `null`.
   * Otherwise, use the default value for the column. This only applies when
   * inserting new rows, not when merging with existing rows under
   * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
   */
  upsert(e, { onConflict: t, ignoreDuplicates: s = !1, count: i, defaultToNull: n = !0 } = {}) {
    const o = "POST", l = [`resolution=${s ? "ignore" : "merge"}-duplicates`];
    if (t !== void 0 && this.url.searchParams.set("on_conflict", t), this.headers.Prefer && l.push(this.headers.Prefer), i && l.push(`count=${i}`), n || l.push("missing=default"), this.headers.Prefer = l.join(","), Array.isArray(e)) {
      const c = e.reduce((u, d) => u.concat(Object.keys(d)), []);
      if (c.length > 0) {
        const u = [...new Set(c)].map((d) => `"${d}"`);
        this.url.searchParams.set("columns", u.join(","));
      }
    }
    return new PostgrestFilterBuilder_1$2.default({
      method: o,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform an UPDATE on the table or view.
   *
   * By default, updated rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param values - The values to update with
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count updated rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  update(e, { count: t } = {}) {
    const s = "PATCH", i = [];
    return this.headers.Prefer && i.push(this.headers.Prefer), t && i.push(`count=${t}`), this.headers.Prefer = i.join(","), new PostgrestFilterBuilder_1$2.default({
      method: s,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
  /**
   * Perform a DELETE on the table or view.
   *
   * By default, deleted rows are not returned. To return it, chain the call
   * with `.select()` after filters.
   *
   * @param options - Named parameters
   *
   * @param options.count - Count algorithm to use to count deleted rows.
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  delete({ count: e } = {}) {
    const t = "DELETE", s = [];
    return e && s.push(`count=${e}`), this.headers.Prefer && s.unshift(this.headers.Prefer), this.headers.Prefer = s.join(","), new PostgrestFilterBuilder_1$2.default({
      method: t,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
};
PostgrestQueryBuilder$2.default = PostgrestQueryBuilder$1;
var constants = {}, version$4 = {};
Object.defineProperty(version$4, "__esModule", { value: !0 });
version$4.version = void 0;
version$4.version = "0.0.0-automated";
Object.defineProperty(constants, "__esModule", { value: !0 });
constants.DEFAULT_HEADERS = void 0;
const version_1 = version$4;
constants.DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version_1.version}` };
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(PostgrestClient$2, "__esModule", { value: !0 });
const PostgrestQueryBuilder_1$1 = __importDefault$1(PostgrestQueryBuilder$2), PostgrestFilterBuilder_1$1 = __importDefault$1(PostgrestFilterBuilder$2), constants_1 = constants;
let PostgrestClient$1 = class J {
  // TODO: Add back shouldThrowOnError once we figure out the typings
  /**
   * Creates a PostgREST client.
   *
   * @param url - URL of the PostgREST endpoint
   * @param options - Named parameters
   * @param options.headers - Custom headers
   * @param options.schema - Postgres schema to switch to
   * @param options.fetch - Custom fetch
   */
  constructor(e, { headers: t = {}, schema: s, fetch: i } = {}) {
    this.url = e, this.headers = Object.assign(Object.assign({}, constants_1.DEFAULT_HEADERS), t), this.schemaName = s, this.fetch = i;
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(e) {
    const t = new URL(`${this.url}/${e}`);
    return new PostgrestQueryBuilder_1$1.default(t, {
      headers: Object.assign({}, this.headers),
      schema: this.schemaName,
      fetch: this.fetch
    });
  }
  /**
   * Select a schema to query or perform an function (rpc) call.
   *
   * The schema needs to be on the list of exposed schemas inside Supabase.
   *
   * @param schema - The schema to query
   */
  schema(e) {
    return new J(this.url, {
      headers: this.headers,
      schema: e,
      fetch: this.fetch
    });
  }
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.get - When set to `true`, the function will be called with
   * read-only access mode.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(e, t = {}, { head: s = !1, get: i = !1, count: n } = {}) {
    let o;
    const l = new URL(`${this.url}/rpc/${e}`);
    let c;
    s || i ? (o = s ? "HEAD" : "GET", Object.entries(t).filter(([d, f]) => f !== void 0).map(([d, f]) => [d, Array.isArray(f) ? `{${f.join(",")}}` : `${f}`]).forEach(([d, f]) => {
      l.searchParams.append(d, f);
    })) : (o = "POST", c = t);
    const u = Object.assign({}, this.headers);
    return n && (u.Prefer = `count=${n}`), new PostgrestFilterBuilder_1$1.default({
      method: o,
      url: l,
      headers: u,
      schema: this.schemaName,
      body: c,
      fetch: this.fetch,
      allowEmpty: !1
    });
  }
};
PostgrestClient$2.default = PostgrestClient$1;
var __importDefault = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(cjs, "__esModule", { value: !0 });
cjs.PostgrestError = cjs.PostgrestBuilder = cjs.PostgrestTransformBuilder = cjs.PostgrestFilterBuilder = cjs.PostgrestQueryBuilder = cjs.PostgrestClient = void 0;
const PostgrestClient_1 = __importDefault(PostgrestClient$2);
cjs.PostgrestClient = PostgrestClient_1.default;
const PostgrestQueryBuilder_1 = __importDefault(PostgrestQueryBuilder$2);
cjs.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
const PostgrestFilterBuilder_1 = __importDefault(PostgrestFilterBuilder$2);
cjs.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
const PostgrestTransformBuilder_1 = __importDefault(PostgrestTransformBuilder$2);
cjs.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
const PostgrestBuilder_1 = __importDefault(PostgrestBuilder$2);
cjs.PostgrestBuilder = PostgrestBuilder_1.default;
const PostgrestError_1 = __importDefault(PostgrestError$2);
cjs.PostgrestError = PostgrestError_1.default;
var _default = cjs.default = {
  PostgrestClient: PostgrestClient_1.default,
  PostgrestQueryBuilder: PostgrestQueryBuilder_1.default,
  PostgrestFilterBuilder: PostgrestFilterBuilder_1.default,
  PostgrestTransformBuilder: PostgrestTransformBuilder_1.default,
  PostgrestBuilder: PostgrestBuilder_1.default,
  PostgrestError: PostgrestError_1.default
};
const {
  PostgrestClient,
  PostgrestQueryBuilder,
  PostgrestFilterBuilder,
  PostgrestTransformBuilder,
  PostgrestBuilder,
  PostgrestError
} = _default, version$3 = "2.11.2", DEFAULT_HEADERS$3 = { "X-Client-Info": `realtime-js/${version$3}` }, VSN = "1.0.0", DEFAULT_TIMEOUT = 1e4, WS_CLOSE_NORMAL = 1e3;
var SOCKET_STATES;
(function(r) {
  r[r.connecting = 0] = "connecting", r[r.open = 1] = "open", r[r.closing = 2] = "closing", r[r.closed = 3] = "closed";
})(SOCKET_STATES || (SOCKET_STATES = {}));
var CHANNEL_STATES;
(function(r) {
  r.closed = "closed", r.errored = "errored", r.joined = "joined", r.joining = "joining", r.leaving = "leaving";
})(CHANNEL_STATES || (CHANNEL_STATES = {}));
var CHANNEL_EVENTS;
(function(r) {
  r.close = "phx_close", r.error = "phx_error", r.join = "phx_join", r.reply = "phx_reply", r.leave = "phx_leave", r.access_token = "access_token";
})(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
var TRANSPORTS;
(function(r) {
  r.websocket = "websocket";
})(TRANSPORTS || (TRANSPORTS = {}));
var CONNECTION_STATE;
(function(r) {
  r.Connecting = "connecting", r.Open = "open", r.Closing = "closing", r.Closed = "closed";
})(CONNECTION_STATE || (CONNECTION_STATE = {}));
class Serializer {
  constructor() {
    this.HEADER_LENGTH = 1;
  }
  decode(e, t) {
    return e.constructor === ArrayBuffer ? t(this._binaryDecode(e)) : t(typeof e == "string" ? JSON.parse(e) : {});
  }
  _binaryDecode(e) {
    const t = new DataView(e), s = new TextDecoder();
    return this._decodeBroadcast(e, t, s);
  }
  _decodeBroadcast(e, t, s) {
    const i = t.getUint8(1), n = t.getUint8(2);
    let o = this.HEADER_LENGTH + 2;
    const l = s.decode(e.slice(o, o + i));
    o = o + i;
    const c = s.decode(e.slice(o, o + n));
    o = o + n;
    const u = JSON.parse(s.decode(e.slice(o, e.byteLength)));
    return { ref: null, topic: l, event: c, payload: u };
  }
}
class Timer {
  constructor(e, t) {
    this.callback = e, this.timerCalc = t, this.timer = void 0, this.tries = 0, this.callback = e, this.timerCalc = t;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer);
  }
  // Cancels any previous scheduleTimeout and schedules callback
  scheduleTimeout() {
    clearTimeout(this.timer), this.timer = setTimeout(() => {
      this.tries = this.tries + 1, this.callback();
    }, this.timerCalc(this.tries + 1));
  }
}
var PostgresTypes;
(function(r) {
  r.abstime = "abstime", r.bool = "bool", r.date = "date", r.daterange = "daterange", r.float4 = "float4", r.float8 = "float8", r.int2 = "int2", r.int4 = "int4", r.int4range = "int4range", r.int8 = "int8", r.int8range = "int8range", r.json = "json", r.jsonb = "jsonb", r.money = "money", r.numeric = "numeric", r.oid = "oid", r.reltime = "reltime", r.text = "text", r.time = "time", r.timestamp = "timestamp", r.timestamptz = "timestamptz", r.timetz = "timetz", r.tsrange = "tsrange", r.tstzrange = "tstzrange";
})(PostgresTypes || (PostgresTypes = {}));
const convertChangeData = (r, e, t = {}) => {
  var s;
  const i = (s = t.skipTypes) !== null && s !== void 0 ? s : [];
  return Object.keys(e).reduce((n, o) => (n[o] = convertColumn(o, r, e, i), n), {});
}, convertColumn = (r, e, t, s) => {
  const i = e.find((l) => l.name === r), n = i == null ? void 0 : i.type, o = t[r];
  return n && !s.includes(n) ? convertCell(n, o) : noop$1(o);
}, convertCell = (r, e) => {
  if (r.charAt(0) === "_") {
    const t = r.slice(1, r.length);
    return toArray(e, t);
  }
  switch (r) {
    case PostgresTypes.bool:
      return toBoolean(e);
    case PostgresTypes.float4:
    case PostgresTypes.float8:
    case PostgresTypes.int2:
    case PostgresTypes.int4:
    case PostgresTypes.int8:
    case PostgresTypes.numeric:
    case PostgresTypes.oid:
      return toNumber(e);
    case PostgresTypes.json:
    case PostgresTypes.jsonb:
      return toJson(e);
    case PostgresTypes.timestamp:
      return toTimestampString(e);
    case PostgresTypes.abstime:
    case PostgresTypes.date:
    case PostgresTypes.daterange:
    case PostgresTypes.int4range:
    case PostgresTypes.int8range:
    case PostgresTypes.money:
    case PostgresTypes.reltime:
    case PostgresTypes.text:
    case PostgresTypes.time:
    case PostgresTypes.timestamptz:
    case PostgresTypes.timetz:
    case PostgresTypes.tsrange:
    case PostgresTypes.tstzrange:
      return noop$1(e);
    default:
      return noop$1(e);
  }
}, noop$1 = (r) => r, toBoolean = (r) => {
  switch (r) {
    case "t":
      return !0;
    case "f":
      return !1;
    default:
      return r;
  }
}, toNumber = (r) => {
  if (typeof r == "string") {
    const e = parseFloat(r);
    if (!Number.isNaN(e))
      return e;
  }
  return r;
}, toJson = (r) => {
  if (typeof r == "string")
    try {
      return JSON.parse(r);
    } catch (e) {
      return console.log(`JSON parse error: ${e}`), r;
    }
  return r;
}, toArray = (r, e) => {
  if (typeof r != "string")
    return r;
  const t = r.length - 1, s = r[t];
  if (r[0] === "{" && s === "}") {
    let n;
    const o = r.slice(1, t);
    try {
      n = JSON.parse("[" + o + "]");
    } catch {
      n = o ? o.split(",") : [];
    }
    return n.map((l) => convertCell(e, l));
  }
  return r;
}, toTimestampString = (r) => typeof r == "string" ? r.replace(" ", "T") : r, httpEndpointURL = (r) => {
  let e = r;
  return e = e.replace(/^ws/i, "http"), e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, ""), e.replace(/\/+$/, "");
};
class Push {
  /**
   * Initializes the Push
   *
   * @param channel The Channel
   * @param event The event, for example `"phx_join"`
   * @param payload The payload, for example `{user_id: 123}`
   * @param timeout The push timeout in milliseconds
   */
  constructor(e, t, s = {}, i = DEFAULT_TIMEOUT) {
    this.channel = e, this.event = t, this.payload = s, this.timeout = i, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
  }
  resend(e) {
    this.timeout = e, this._cancelRefEvent(), this.ref = "", this.refEvent = null, this.receivedResp = null, this.sent = !1, this.send();
  }
  send() {
    this._hasReceived("timeout") || (this.startTimeout(), this.sent = !0, this.channel.socket.push({
      topic: this.channel.topic,
      event: this.event,
      payload: this.payload,
      ref: this.ref,
      join_ref: this.channel._joinRef()
    }));
  }
  updatePayload(e) {
    this.payload = Object.assign(Object.assign({}, this.payload), e);
  }
  receive(e, t) {
    var s;
    return this._hasReceived(e) && t((s = this.receivedResp) === null || s === void 0 ? void 0 : s.response), this.recHooks.push({ status: e, callback: t }), this;
  }
  startTimeout() {
    if (this.timeoutTimer)
      return;
    this.ref = this.channel.socket._makeRef(), this.refEvent = this.channel._replyEventName(this.ref);
    const e = (t) => {
      this._cancelRefEvent(), this._cancelTimeout(), this.receivedResp = t, this._matchReceive(t);
    };
    this.channel._on(this.refEvent, {}, e), this.timeoutTimer = setTimeout(() => {
      this.trigger("timeout", {});
    }, this.timeout);
  }
  trigger(e, t) {
    this.refEvent && this.channel._trigger(this.refEvent, { status: e, response: t });
  }
  destroy() {
    this._cancelRefEvent(), this._cancelTimeout();
  }
  _cancelRefEvent() {
    this.refEvent && this.channel._off(this.refEvent, {});
  }
  _cancelTimeout() {
    clearTimeout(this.timeoutTimer), this.timeoutTimer = void 0;
  }
  _matchReceive({ status: e, response: t }) {
    this.recHooks.filter((s) => s.status === e).forEach((s) => s.callback(t));
  }
  _hasReceived(e) {
    return this.receivedResp && this.receivedResp.status === e;
  }
}
var REALTIME_PRESENCE_LISTEN_EVENTS;
(function(r) {
  r.SYNC = "sync", r.JOIN = "join", r.LEAVE = "leave";
})(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
class RealtimePresence {
  /**
   * Initializes the Presence.
   *
   * @param channel - The RealtimeChannel
   * @param opts - The options,
   *        for example `{events: {state: 'state', diff: 'diff'}}`
   */
  constructor(e, t) {
    this.channel = e, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.caller = {
      onJoin: () => {
      },
      onLeave: () => {
      },
      onSync: () => {
      }
    };
    const s = (t == null ? void 0 : t.events) || {
      state: "presence_state",
      diff: "presence_diff"
    };
    this.channel._on(s.state, {}, (i) => {
      const { onJoin: n, onLeave: o, onSync: l } = this.caller;
      this.joinRef = this.channel._joinRef(), this.state = RealtimePresence.syncState(this.state, i, n, o), this.pendingDiffs.forEach((c) => {
        this.state = RealtimePresence.syncDiff(this.state, c, n, o);
      }), this.pendingDiffs = [], l();
    }), this.channel._on(s.diff, {}, (i) => {
      const { onJoin: n, onLeave: o, onSync: l } = this.caller;
      this.inPendingSyncState() ? this.pendingDiffs.push(i) : (this.state = RealtimePresence.syncDiff(this.state, i, n, o), l());
    }), this.onJoin((i, n, o) => {
      this.channel._trigger("presence", {
        event: "join",
        key: i,
        currentPresences: n,
        newPresences: o
      });
    }), this.onLeave((i, n, o) => {
      this.channel._trigger("presence", {
        event: "leave",
        key: i,
        currentPresences: n,
        leftPresences: o
      });
    }), this.onSync(() => {
      this.channel._trigger("presence", { event: "sync" });
    });
  }
  /**
   * Used to sync the list of presences on the server with the
   * client's state.
   *
   * An optional `onJoin` and `onLeave` callback can be provided to
   * react to changes in the client's local presences across
   * disconnects and reconnects with the server.
   *
   * @internal
   */
  static syncState(e, t, s, i) {
    const n = this.cloneDeep(e), o = this.transformState(t), l = {}, c = {};
    return this.map(n, (u, d) => {
      o[u] || (c[u] = d);
    }), this.map(o, (u, d) => {
      const f = n[u];
      if (f) {
        const h = d.map((m) => m.presence_ref), _ = f.map((m) => m.presence_ref), g = d.filter((m) => _.indexOf(m.presence_ref) < 0), v = f.filter((m) => h.indexOf(m.presence_ref) < 0);
        g.length > 0 && (l[u] = g), v.length > 0 && (c[u] = v);
      } else
        l[u] = d;
    }), this.syncDiff(n, { joins: l, leaves: c }, s, i);
  }
  /**
   * Used to sync a diff of presence join and leave events from the
   * server, as they happen.
   *
   * Like `syncState`, `syncDiff` accepts optional `onJoin` and
   * `onLeave` callbacks to react to a user joining or leaving from a
   * device.
   *
   * @internal
   */
  static syncDiff(e, t, s, i) {
    const { joins: n, leaves: o } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves)
    };
    return s || (s = () => {
    }), i || (i = () => {
    }), this.map(n, (l, c) => {
      var u;
      const d = (u = e[l]) !== null && u !== void 0 ? u : [];
      if (e[l] = this.cloneDeep(c), d.length > 0) {
        const f = e[l].map((_) => _.presence_ref), h = d.filter((_) => f.indexOf(_.presence_ref) < 0);
        e[l].unshift(...h);
      }
      s(l, d, c);
    }), this.map(o, (l, c) => {
      let u = e[l];
      if (!u)
        return;
      const d = c.map((f) => f.presence_ref);
      u = u.filter((f) => d.indexOf(f.presence_ref) < 0), e[l] = u, i(l, u, c), u.length === 0 && delete e[l];
    }), e;
  }
  /** @internal */
  static map(e, t) {
    return Object.getOwnPropertyNames(e).map((s) => t(s, e[s]));
  }
  /**
   * Remove 'metas' key
   * Change 'phx_ref' to 'presence_ref'
   * Remove 'phx_ref' and 'phx_ref_prev'
   *
   * @example
   * // returns {
   *  abc123: [
   *    { presence_ref: '2', user_id: 1 },
   *    { presence_ref: '3', user_id: 2 }
   *  ]
   * }
   * RealtimePresence.transformState({
   *  abc123: {
   *    metas: [
   *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
   *      { phx_ref: '3', user_id: 2 }
   *    ]
   *  }
   * })
   *
   * @internal
   */
  static transformState(e) {
    return e = this.cloneDeep(e), Object.getOwnPropertyNames(e).reduce((t, s) => {
      const i = e[s];
      return "metas" in i ? t[s] = i.metas.map((n) => (n.presence_ref = n.phx_ref, delete n.phx_ref, delete n.phx_ref_prev, n)) : t[s] = i, t;
    }, {});
  }
  /** @internal */
  static cloneDeep(e) {
    return JSON.parse(JSON.stringify(e));
  }
  /** @internal */
  onJoin(e) {
    this.caller.onJoin = e;
  }
  /** @internal */
  onLeave(e) {
    this.caller.onLeave = e;
  }
  /** @internal */
  onSync(e) {
    this.caller.onSync = e;
  }
  /** @internal */
  inPendingSyncState() {
    return !this.joinRef || this.joinRef !== this.channel._joinRef();
  }
}
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT;
(function(r) {
  r.ALL = "*", r.INSERT = "INSERT", r.UPDATE = "UPDATE", r.DELETE = "DELETE";
})(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
var REALTIME_LISTEN_TYPES;
(function(r) {
  r.BROADCAST = "broadcast", r.PRESENCE = "presence", r.POSTGRES_CHANGES = "postgres_changes", r.SYSTEM = "system";
})(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
var REALTIME_SUBSCRIBE_STATES;
(function(r) {
  r.SUBSCRIBED = "SUBSCRIBED", r.TIMED_OUT = "TIMED_OUT", r.CLOSED = "CLOSED", r.CHANNEL_ERROR = "CHANNEL_ERROR";
})(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
class RealtimeChannel {
  constructor(e, t = { config: {} }, s) {
    this.topic = e, this.params = t, this.socket = s, this.bindings = {}, this.state = CHANNEL_STATES.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
      broadcast: { ack: !1, self: !1 },
      presence: { key: "" },
      private: !1
    }, t.config), this.timeout = this.socket.timeout, this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout), this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((i) => i.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = CHANNEL_STATES.closed, this.socket._remove(this);
    }), this._onError((i) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, i), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(CHANNEL_EVENTS.reply, {}, (i, n) => {
      this._trigger(this._replyEventName(n), i);
    }), this.presence = new RealtimePresence(this), this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint) + "/api/broadcast", this.private = this.params.config.private || !1;
  }
  /** Subscribe registers your client with the server */
  subscribe(e, t = this.timeout) {
    var s, i;
    if (this.socket.isConnected() || this.socket.connect(), this.joinedOnce)
      throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
    {
      const { config: { broadcast: n, presence: o, private: l } } = this.params;
      this._onError((d) => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, d)), this._onClose(() => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CLOSED));
      const c = {}, u = {
        broadcast: n,
        presence: o,
        postgres_changes: (i = (s = this.bindings.postgres_changes) === null || s === void 0 ? void 0 : s.map((d) => d.filter)) !== null && i !== void 0 ? i : [],
        private: l
      };
      this.socket.accessTokenValue && (c.access_token = this.socket.accessTokenValue), this.updateJoinPayload(Object.assign({ config: u }, c)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", async ({ postgres_changes: d }) => {
        var f;
        if (this.socket.setAuth(), d === void 0) {
          e == null || e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        } else {
          const h = this.bindings.postgres_changes, _ = (f = h == null ? void 0 : h.length) !== null && f !== void 0 ? f : 0, g = [];
          for (let v = 0; v < _; v++) {
            const m = h[v], { filter: { event: y, schema: E, table: w, filter: T } } = m, b = d && d[v];
            if (b && b.event === y && b.schema === E && b.table === w && b.filter === T)
              g.push(Object.assign(Object.assign({}, m), { id: b.id }));
            else {
              this.unsubscribe(), e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = g, e && e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        }
      }).receive("error", (d) => {
        e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(d).join(", ") || "error")));
      }).receive("timeout", () => {
        e == null || e(REALTIME_SUBSCRIBE_STATES.TIMED_OUT);
      });
    }
    return this;
  }
  presenceState() {
    return this.presence.state;
  }
  async track(e, t = {}) {
    return await this.send({
      type: "presence",
      event: "track",
      payload: e
    }, t.timeout || this.timeout);
  }
  async untrack(e = {}) {
    return await this.send({
      type: "presence",
      event: "untrack"
    }, e);
  }
  on(e, t, s) {
    return this._on(e, t, s);
  }
  /**
   * Sends a message into the channel.
   *
   * @param args Arguments to send to channel
   * @param args.type The type of event to send
   * @param args.event The name of the event being sent
   * @param args.payload Payload to be sent
   * @param opts Options to be used during the send process
   */
  async send(e, t = {}) {
    var s, i;
    if (!this._canPush() && e.type === "broadcast") {
      const { event: n, payload: o } = e, c = {
        method: "POST",
        headers: {
          Authorization: this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "",
          apikey: this.socket.apiKey ? this.socket.apiKey : "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            {
              topic: this.subTopic,
              event: n,
              payload: o,
              private: this.private
            }
          ]
        })
      };
      try {
        const u = await this._fetchWithTimeout(this.broadcastEndpointURL, c, (s = t.timeout) !== null && s !== void 0 ? s : this.timeout);
        return await ((i = u.body) === null || i === void 0 ? void 0 : i.cancel()), u.ok ? "ok" : "error";
      } catch (u) {
        return u.name === "AbortError" ? "timed out" : "error";
      }
    } else
      return new Promise((n) => {
        var o, l, c;
        const u = this._push(e.type, e, t.timeout || this.timeout);
        e.type === "broadcast" && !(!((c = (l = (o = this.params) === null || o === void 0 ? void 0 : o.config) === null || l === void 0 ? void 0 : l.broadcast) === null || c === void 0) && c.ack) && n("ok"), u.receive("ok", () => n("ok")), u.receive("error", () => n("error")), u.receive("timeout", () => n("timed out"));
      });
  }
  updateJoinPayload(e) {
    this.joinPush.updatePayload(e);
  }
  /**
   * Leaves the channel.
   *
   * Unsubscribes from server events, and instructs channel to terminate on server.
   * Triggers onClose() hooks.
   *
   * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
   * channel.unsubscribe().receive("ok", () => alert("left!") )
   */
  unsubscribe(e = this.timeout) {
    this.state = CHANNEL_STATES.leaving;
    const t = () => {
      this.socket.log("channel", `leave ${this.topic}`), this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
    };
    return this.rejoinTimer.reset(), this.joinPush.destroy(), new Promise((s) => {
      const i = new Push(this, CHANNEL_EVENTS.leave, {}, e);
      i.receive("ok", () => {
        t(), s("ok");
      }).receive("timeout", () => {
        t(), s("timed out");
      }).receive("error", () => {
        s("error");
      }), i.send(), this._canPush() || i.trigger("ok", {});
    });
  }
  /** @internal */
  async _fetchWithTimeout(e, t, s) {
    const i = new AbortController(), n = setTimeout(() => i.abort(), s), o = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: i.signal }));
    return clearTimeout(n), o;
  }
  /** @internal */
  _push(e, t, s = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let i = new Push(this, e, t, s);
    return this._canPush() ? i.send() : (i.startTimeout(), this.pushBuffer.push(i)), i;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(e, t, s) {
    return t;
  }
  /** @internal */
  _isMember(e) {
    return this.topic === e;
  }
  /** @internal */
  _joinRef() {
    return this.joinPush.ref;
  }
  /** @internal */
  _trigger(e, t, s) {
    var i, n;
    const o = e.toLocaleLowerCase(), { close: l, error: c, leave: u, join: d } = CHANNEL_EVENTS;
    if (s && [l, c, u, d].indexOf(o) >= 0 && s !== this._joinRef())
      return;
    let h = this._onMessage(o, t, s);
    if (t && !h)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o) ? (i = this.bindings.postgres_changes) === null || i === void 0 || i.filter((_) => {
      var g, v, m;
      return ((g = _.filter) === null || g === void 0 ? void 0 : g.event) === "*" || ((m = (v = _.filter) === null || v === void 0 ? void 0 : v.event) === null || m === void 0 ? void 0 : m.toLocaleLowerCase()) === o;
    }).map((_) => _.callback(h, s)) : (n = this.bindings[o]) === null || n === void 0 || n.filter((_) => {
      var g, v, m, y, E, w;
      if (["broadcast", "presence", "postgres_changes"].includes(o))
        if ("id" in _) {
          const T = _.id, b = (g = _.filter) === null || g === void 0 ? void 0 : g.event;
          return T && ((v = t.ids) === null || v === void 0 ? void 0 : v.includes(T)) && (b === "*" || (b == null ? void 0 : b.toLocaleLowerCase()) === ((m = t.data) === null || m === void 0 ? void 0 : m.type.toLocaleLowerCase()));
        } else {
          const T = (E = (y = _ == null ? void 0 : _.filter) === null || y === void 0 ? void 0 : y.event) === null || E === void 0 ? void 0 : E.toLocaleLowerCase();
          return T === "*" || T === ((w = t == null ? void 0 : t.event) === null || w === void 0 ? void 0 : w.toLocaleLowerCase());
        }
      else
        return _.type.toLocaleLowerCase() === o;
    }).map((_) => {
      if (typeof h == "object" && "ids" in h) {
        const g = h.data, { schema: v, table: m, commit_timestamp: y, type: E, errors: w } = g;
        h = Object.assign(Object.assign({}, {
          schema: v,
          table: m,
          commit_timestamp: y,
          eventType: E,
          new: {},
          old: {},
          errors: w
        }), this._getPayloadRecords(g));
      }
      _.callback(h, s);
    });
  }
  /** @internal */
  _isClosed() {
    return this.state === CHANNEL_STATES.closed;
  }
  /** @internal */
  _isJoined() {
    return this.state === CHANNEL_STATES.joined;
  }
  /** @internal */
  _isJoining() {
    return this.state === CHANNEL_STATES.joining;
  }
  /** @internal */
  _isLeaving() {
    return this.state === CHANNEL_STATES.leaving;
  }
  /** @internal */
  _replyEventName(e) {
    return `chan_reply_${e}`;
  }
  /** @internal */
  _on(e, t, s) {
    const i = e.toLocaleLowerCase(), n = {
      type: i,
      filter: t,
      callback: s
    };
    return this.bindings[i] ? this.bindings[i].push(n) : this.bindings[i] = [n], this;
  }
  /** @internal */
  _off(e, t) {
    const s = e.toLocaleLowerCase();
    return this.bindings[s] = this.bindings[s].filter((i) => {
      var n;
      return !(((n = i.type) === null || n === void 0 ? void 0 : n.toLocaleLowerCase()) === s && RealtimeChannel.isEqual(i.filter, t));
    }), this;
  }
  /** @internal */
  static isEqual(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return !1;
    for (const s in e)
      if (e[s] !== t[s])
        return !1;
    return !0;
  }
  /** @internal */
  _rejoinUntilConnected() {
    this.rejoinTimer.scheduleTimeout(), this.socket.isConnected() && this._rejoin();
  }
  /**
   * Registers a callback that will be executed when the channel closes.
   *
   * @internal
   */
  _onClose(e) {
    this._on(CHANNEL_EVENTS.close, {}, e);
  }
  /**
   * Registers a callback that will be executed when the channel encounteres an error.
   *
   * @internal
   */
  _onError(e) {
    this._on(CHANNEL_EVENTS.error, {}, (t) => e(t));
  }
  /**
   * Returns `true` if the socket is connected and the channel has been joined.
   *
   * @internal
   */
  _canPush() {
    return this.socket.isConnected() && this._isJoined();
  }
  /** @internal */
  _rejoin(e = this.timeout) {
    this._isLeaving() || (this.socket._leaveOpenTopic(this.topic), this.state = CHANNEL_STATES.joining, this.joinPush.resend(e));
  }
  /** @internal */
  _getPayloadRecords(e) {
    const t = {
      new: {},
      old: {}
    };
    return (e.type === "INSERT" || e.type === "UPDATE") && (t.new = convertChangeData(e.columns, e.record)), (e.type === "UPDATE" || e.type === "DELETE") && (t.old = convertChangeData(e.columns, e.old_record)), t;
  }
}
const noop = () => {
}, NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket < "u", WORKER_SCRIPT = `
  addEventListener("message", (e) => {
    if (e.data.event === "start") {
      setInterval(() => postMessage({ event: "keepAlive" }), e.data.interval);
    }
  });`;
class RealtimeClient {
  /**
   * Initializes the Socket.
   *
   * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
   * @param httpEndpoint The string HTTP endpoint, ie, "https://example.com", "/" (inherited host & protocol)
   * @param options.transport The Websocket Transport, for example WebSocket.
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers The optional headers to pass when connecting.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   * @param options.worker Use Web Worker to set a side flow. Defaults to false.
   * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
   */
  constructor(e, t) {
    var s;
    this.accessTokenValue = null, this.apiKey = null, this.channels = [], this.endPoint = "", this.httpEndpoint = "", this.headers = DEFAULT_HEADERS$3, this.params = {}, this.timeout = DEFAULT_TIMEOUT, this.heartbeatIntervalMs = 3e4, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.ref = 0, this.logger = noop, this.conn = null, this.sendBuffer = [], this.serializer = new Serializer(), this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }, this.accessToken = null, this._resolveFetch = (n) => {
      let o;
      return n ? o = n : typeof fetch > "u" ? o = (...l) => Promise.resolve().then(() => browser$4).then(({ default: c }) => c(...l)) : o = fetch, (...l) => o(...l);
    }, this.endPoint = `${e}/${TRANSPORTS.websocket}`, this.httpEndpoint = httpEndpointURL(e), t != null && t.transport ? this.transport = t.transport : this.transport = null, t != null && t.params && (this.params = t.params), t != null && t.headers && (this.headers = Object.assign(Object.assign({}, this.headers), t.headers)), t != null && t.timeout && (this.timeout = t.timeout), t != null && t.logger && (this.logger = t.logger), t != null && t.heartbeatIntervalMs && (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
    const i = (s = t == null ? void 0 : t.params) === null || s === void 0 ? void 0 : s.apikey;
    if (i && (this.accessTokenValue = i, this.apiKey = i), this.reconnectAfterMs = t != null && t.reconnectAfterMs ? t.reconnectAfterMs : (n) => [1e3, 2e3, 5e3, 1e4][n - 1] || 1e4, this.encode = t != null && t.encode ? t.encode : (n, o) => o(JSON.stringify(n)), this.decode = t != null && t.decode ? t.decode : this.serializer.decode.bind(this.serializer), this.reconnectTimer = new Timer(async () => {
      this.disconnect(), this.connect();
    }, this.reconnectAfterMs), this.fetch = this._resolveFetch(t == null ? void 0 : t.fetch), t != null && t.worker) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      this.worker = (t == null ? void 0 : t.worker) || !1, this.workerUrl = t == null ? void 0 : t.workerUrl;
    }
    this.accessToken = (t == null ? void 0 : t.accessToken) || null;
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (!this.conn) {
      if (this.transport) {
        this.conn = new this.transport(this.endpointURL(), void 0, {
          headers: this.headers
        });
        return;
      }
      if (NATIVE_WEBSOCKET_AVAILABLE) {
        this.conn = new WebSocket(this.endpointURL()), this.setupConnection();
        return;
      }
      this.conn = new WSWebSocketDummy(this.endpointURL(), void 0, {
        close: () => {
          this.conn = null;
        }
      }), Promise.resolve().then(() => browser$2).then(({ default: e }) => {
        this.conn = new e(this.endpointURL(), void 0, {
          headers: this.headers
        }), this.setupConnection();
      });
    }
  }
  /**
   * Returns the URL of the websocket.
   * @returns string The URL of the websocket.
   */
  endpointURL() {
    return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
  }
  /**
   * Disconnects the socket.
   *
   * @param code A numeric status code to send on disconnect.
   * @param reason A custom reason for the disconnect.
   */
  disconnect(e, t) {
    this.conn && (this.conn.onclose = function() {
    }, e ? this.conn.close(e, t ?? "") : this.conn.close(), this.conn = null, this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.reset());
  }
  /**
   * Returns all created channels
   */
  getChannels() {
    return this.channels;
  }
  /**
   * Unsubscribes and removes a single channel
   * @param channel A RealtimeChannel instance
   */
  async removeChannel(e) {
    const t = await e.unsubscribe();
    return this.channels.length === 0 && this.disconnect(), t;
  }
  /**
   * Unsubscribes and removes all channels
   */
  async removeAllChannels() {
    const e = await Promise.all(this.channels.map((t) => t.unsubscribe()));
    return this.disconnect(), e;
  }
  /**
   * Logs the message.
   *
   * For customized logging, `this.logger` can be overridden.
   */
  log(e, t, s) {
    this.logger(e, t, s);
  }
  /**
   * Returns the current state of the socket.
   */
  connectionState() {
    switch (this.conn && this.conn.readyState) {
      case SOCKET_STATES.connecting:
        return CONNECTION_STATE.Connecting;
      case SOCKET_STATES.open:
        return CONNECTION_STATE.Open;
      case SOCKET_STATES.closing:
        return CONNECTION_STATE.Closing;
      default:
        return CONNECTION_STATE.Closed;
    }
  }
  /**
   * Returns `true` is the connection is open.
   */
  isConnected() {
    return this.connectionState() === CONNECTION_STATE.Open;
  }
  channel(e, t = { config: {} }) {
    const s = new RealtimeChannel(`realtime:${e}`, t, this);
    return this.channels.push(s), s;
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(e) {
    const { topic: t, event: s, payload: i, ref: n } = e, o = () => {
      this.encode(e, (l) => {
        var c;
        (c = this.conn) === null || c === void 0 || c.send(l);
      });
    };
    this.log("push", `${t} ${s} (${n})`, i), this.isConnected() ? o() : this.sendBuffer.push(o);
  }
  /**
   * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
   *
   * If param is null it will use the `accessToken` callback function or the token set on the client.
   *
   * On callback used, it will set the value of the token internal to the client.
   *
   * @param token A JWT string to override the token set on the client.
   */
  async setAuth(e = null) {
    let t = e || this.accessToken && await this.accessToken() || this.accessTokenValue;
    if (t) {
      let s = null;
      try {
        s = JSON.parse(atob(t.split(".")[1]));
      } catch {
      }
      if (s && s.exp && !(Math.floor(Date.now() / 1e3) - s.exp < 0))
        return this.log("auth", `InvalidJWTToken: Invalid value for JWT claim "exp" with value ${s.exp}`), Promise.reject(`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${s.exp}`);
      this.accessTokenValue = t, this.channels.forEach((i) => {
        t && i.updateJoinPayload({ access_token: t }), i.joinedOnce && i._isJoined() && i._push(CHANNEL_EVENTS.access_token, {
          access_token: t
        });
      });
    }
  }
  /**
   * Sends a heartbeat message if the socket is connected.
   */
  async sendHeartbeat() {
    var e;
    if (this.isConnected()) {
      if (this.pendingHeartbeatRef) {
        this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), (e = this.conn) === null || e === void 0 || e.close(WS_CLOSE_NORMAL, "hearbeat timeout");
        return;
      }
      this.pendingHeartbeatRef = this._makeRef(), this.push({
        topic: "phoenix",
        event: "heartbeat",
        payload: {},
        ref: this.pendingHeartbeatRef
      }), this.setAuth();
    }
  }
  /**
   * Flushes send buffer
   */
  flushSendBuffer() {
    this.isConnected() && this.sendBuffer.length > 0 && (this.sendBuffer.forEach((e) => e()), this.sendBuffer = []);
  }
  /**
   * Return the next message ref, accounting for overflows
   *
   * @internal
   */
  _makeRef() {
    let e = this.ref + 1;
    return e === this.ref ? this.ref = 0 : this.ref = e, this.ref.toString();
  }
  /**
   * Unsubscribe from channels with the specified topic.
   *
   * @internal
   */
  _leaveOpenTopic(e) {
    let t = this.channels.find((s) => s.topic === e && (s._isJoined() || s._isJoining()));
    t && (this.log("transport", `leaving duplicate topic "${e}"`), t.unsubscribe());
  }
  /**
   * Removes a subscription from the socket.
   *
   * @param channel An open subscription.
   *
   * @internal
   */
  _remove(e) {
    this.channels = this.channels.filter((t) => t._joinRef() !== e._joinRef());
  }
  /**
   * Sets up connection handlers.
   *
   * @internal
   */
  setupConnection() {
    this.conn && (this.conn.binaryType = "arraybuffer", this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e) => this._onConnError(e), this.conn.onmessage = (e) => this._onConnMessage(e), this.conn.onclose = (e) => this._onConnClose(e));
  }
  /** @internal */
  _onConnMessage(e) {
    this.decode(e.data, (t) => {
      let { topic: s, event: i, payload: n, ref: o } = t;
      o && o === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null), this.log("receive", `${n.status || ""} ${s} ${i} ${o && "(" + o + ")" || ""}`, n), this.channels.filter((l) => l._isMember(s)).forEach((l) => l._trigger(i, n, o)), this.stateChangeCallbacks.message.forEach((l) => l(t));
    });
  }
  /** @internal */
  async _onConnOpen() {
    if (this.log("transport", `connected to ${this.endpointURL()}`), this.flushSendBuffer(), this.reconnectTimer.reset(), !this.worker)
      this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
    else {
      this.workerUrl ? this.log("worker", `starting worker for from ${this.workerUrl}`) : this.log("worker", "starting default worker");
      const e = this._workerObjectUrl(this.workerUrl);
      this.workerRef = new Worker(e), this.workerRef.onerror = (t) => {
        this.log("worker", "worker error", t.message), this.workerRef.terminate();
      }, this.workerRef.onmessage = (t) => {
        t.data.event === "keepAlive" && this.sendHeartbeat();
      }, this.workerRef.postMessage({
        event: "start",
        interval: this.heartbeatIntervalMs
      });
    }
    this.stateChangeCallbacks.open.forEach((e) => e());
  }
  /** @internal */
  _onConnClose(e) {
    this.log("transport", "close", e), this._triggerChanError(), this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.reconnectTimer.scheduleTimeout(), this.stateChangeCallbacks.close.forEach((t) => t(e));
  }
  /** @internal */
  _onConnError(e) {
    this.log("transport", e.message), this._triggerChanError(), this.stateChangeCallbacks.error.forEach((t) => t(e));
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((e) => e._trigger(CHANNEL_EVENTS.error));
  }
  /** @internal */
  _appendParams(e, t) {
    if (Object.keys(t).length === 0)
      return e;
    const s = e.match(/\?/) ? "&" : "?", i = new URLSearchParams(t);
    return `${e}${s}${i}`;
  }
  _workerObjectUrl(e) {
    let t;
    if (e)
      t = e;
    else {
      const s = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
      t = URL.createObjectURL(s);
    }
    return t;
  }
}
class WSWebSocketDummy {
  constructor(e, t, s) {
    this.binaryType = "arraybuffer", this.onclose = () => {
    }, this.onerror = () => {
    }, this.onmessage = () => {
    }, this.onopen = () => {
    }, this.readyState = SOCKET_STATES.connecting, this.send = () => {
    }, this.url = null, this.url = e, this.close = s.close;
  }
}
class StorageError extends Error {
  constructor(e) {
    super(e), this.__isStorageError = !0, this.name = "StorageError";
  }
}
function isStorageError(r) {
  return typeof r == "object" && r !== null && "__isStorageError" in r;
}
class StorageApiError extends StorageError {
  constructor(e, t) {
    super(e), this.name = "StorageApiError", this.status = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status
    };
  }
}
class StorageUnknownError extends StorageError {
  constructor(e, t) {
    super(e), this.name = "StorageUnknownError", this.originalError = t;
  }
}
var __awaiter$6 = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
const resolveFetch$2 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$4).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
}, resolveResponse = () => __awaiter$6(void 0, void 0, void 0, function* () {
  return typeof Response > "u" ? (yield Promise.resolve().then(() => browser$4)).Response : Response;
}), recursiveToCamel = (r) => {
  if (Array.isArray(r))
    return r.map((t) => recursiveToCamel(t));
  if (typeof r == "function" || r !== Object(r))
    return r;
  const e = {};
  return Object.entries(r).forEach(([t, s]) => {
    const i = t.replace(/([-_][a-z])/gi, (n) => n.toUpperCase().replace(/[-_]/g, ""));
    e[i] = recursiveToCamel(s);
  }), e;
};
var __awaiter$5 = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
const _getErrorMessage$1 = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r), handleError$1 = (r, e, t) => __awaiter$5(void 0, void 0, void 0, function* () {
  const s = yield resolveResponse();
  r instanceof s && !(t != null && t.noResolveJson) ? r.json().then((i) => {
    e(new StorageApiError(_getErrorMessage$1(i), r.status || 500));
  }).catch((i) => {
    e(new StorageUnknownError(_getErrorMessage$1(i), i));
  }) : e(new StorageUnknownError(_getErrorMessage$1(r), r));
}), _getRequestParams$1 = (r, e, t, s) => {
  const i = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return r === "GET" ? i : (i.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), s && (i.body = JSON.stringify(s)), Object.assign(Object.assign({}, i), t));
};
function _handleRequest$1(r, e, t, s, i, n) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return new Promise((o, l) => {
      r(t, _getRequestParams$1(e, s, i, n)).then((c) => {
        if (!c.ok)
          throw c;
        return s != null && s.noResolveJson ? c : c.json();
      }).then((c) => o(c)).catch((c) => handleError$1(c, l, s));
    });
  });
}
function get(r, e, t, s) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "GET", e, t, s);
  });
}
function post(r, e, t, s, i) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "POST", e, s, i, t);
  });
}
function put(r, e, t, s, i) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "PUT", e, s, i, t);
  });
}
function head(r, e, t, s) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "HEAD", e, Object.assign(Object.assign({}, t), { noResolveJson: !0 }), s);
  });
}
function remove(r, e, t, s, i) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "DELETE", e, s, i, t);
  });
}
var __awaiter$4 = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
const DEFAULT_SEARCH_OPTIONS = {
  limit: 100,
  offset: 0,
  sortBy: {
    column: "name",
    order: "asc"
  }
}, DEFAULT_FILE_OPTIONS = {
  cacheControl: "3600",
  contentType: "text/plain;charset=UTF-8",
  upsert: !1
};
class StorageFileApi {
  constructor(e, t = {}, s, i) {
    this.url = e, this.headers = t, this.bucketId = s, this.fetch = resolveFetch$2(i);
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(e, t, s, i) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        let n;
        const o = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), i);
        let l = Object.assign(Object.assign({}, this.headers), e === "POST" && { "x-upsert": String(o.upsert) });
        const c = o.metadata;
        typeof Blob < "u" && s instanceof Blob ? (n = new FormData(), n.append("cacheControl", o.cacheControl), c && n.append("metadata", this.encodeMetadata(c)), n.append("", s)) : typeof FormData < "u" && s instanceof FormData ? (n = s, n.append("cacheControl", o.cacheControl), c && n.append("metadata", this.encodeMetadata(c))) : (n = s, l["cache-control"] = `max-age=${o.cacheControl}`, l["content-type"] = o.contentType, c && (l["x-metadata"] = this.toBase64(this.encodeMetadata(c)))), i != null && i.headers && (l = Object.assign(Object.assign({}, l), i.headers));
        const u = this._removeEmptyFolders(t), d = this._getFinalPath(u), f = yield this.fetch(`${this.url}/object/${d}`, Object.assign({ method: e, body: n, headers: l }, o != null && o.duplex ? { duplex: o.duplex } : {})), h = yield f.json();
        return f.ok ? {
          data: { path: u, id: h.Id, fullPath: h.Key },
          error: null
        } : { data: null, error: h };
      } catch (n) {
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
      }
    });
  }
  /**
   * Uploads a file to an existing bucket.
   *
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  upload(e, t, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, s);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(e, t, s, i) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const n = this._removeEmptyFolders(e), o = this._getFinalPath(n), l = new URL(this.url + `/object/upload/sign/${o}`);
      l.searchParams.set("token", t);
      try {
        let c;
        const u = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, i), d = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(u.upsert) });
        typeof Blob < "u" && s instanceof Blob ? (c = new FormData(), c.append("cacheControl", u.cacheControl), c.append("", s)) : typeof FormData < "u" && s instanceof FormData ? (c = s, c.append("cacheControl", u.cacheControl)) : (c = s, d["cache-control"] = `max-age=${u.cacheControl}`, d["content-type"] = u.contentType);
        const f = yield this.fetch(l.toString(), {
          method: "PUT",
          body: c,
          headers: d
        }), h = yield f.json();
        return f.ok ? {
          data: { path: n, fullPath: h.Key },
          error: null
        } : { data: null, error: h };
      } catch (c) {
        if (isStorageError(c))
          return { data: null, error: c };
        throw c;
      }
    });
  }
  /**
   * Creates a signed upload URL.
   * Signed upload URLs can be used to upload files to the bucket without further authentication.
   * They are valid for 2 hours.
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param options.upsert If set to true, allows the file to be overwritten if it already exists.
   */
  createSignedUploadUrl(e, t) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e);
        const i = Object.assign({}, this.headers);
        t != null && t.upsert && (i["x-upsert"] = "true");
        const n = yield post(this.fetch, `${this.url}/object/upload/sign/${s}`, {}, { headers: i }), o = new URL(this.url + n.url), l = o.searchParams.get("token");
        if (!l)
          throw new StorageError("No token returned by API");
        return { data: { signedUrl: o.toString(), path: e, token: l }, error: null };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(e, t, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", e, t, s);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   * @param options The destination options.
   */
  move(e, t, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: s == null ? void 0 : s.destinationBucket
        }, { headers: this.headers }), error: null };
      } catch (i) {
        if (isStorageError(i))
          return { data: null, error: i };
        throw i;
      }
    });
  }
  /**
   * Copies an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
   * @param options The destination options.
   */
  copy(e, t, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        return { data: { path: (yield post(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: s == null ? void 0 : s.destinationBucket
        }, { headers: this.headers })).Key }, error: null };
      } catch (i) {
        if (isStorageError(i))
          return { data: null, error: i };
        throw i;
      }
    });
  }
  /**
   * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param path The file path, including the current file name. For example `folder/image.png`.
   * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  createSignedUrl(e, t, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        let i = this._getFinalPath(e), n = yield post(this.fetch, `${this.url}/object/sign/${i}`, Object.assign({ expiresIn: t }, s != null && s.transform ? { transform: s.transform } : {}), { headers: this.headers });
        const o = s != null && s.download ? `&download=${s.download === !0 ? "" : s.download}` : "";
        return n = { signedUrl: encodeURI(`${this.url}${n.signedURL}${o}`) }, { data: n, error: null };
      } catch (i) {
        if (isStorageError(i))
          return { data: null, error: i };
        throw i;
      }
    });
  }
  /**
   * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
   *
   * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
   * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
   * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   */
  createSignedUrls(e, t, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const i = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), n = s != null && s.download ? `&download=${s.download === !0 ? "" : s.download}` : "";
        return {
          data: i.map((o) => Object.assign(Object.assign({}, o), { signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${n}`) : null })),
          error: null
        };
      } catch (i) {
        if (isStorageError(i))
          return { data: null, error: i };
        throw i;
      }
    });
  }
  /**
   * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
   *
   * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
   * @param options.transform Transform the asset before serving it to the client.
   */
  download(e, t) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const i = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", n = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), o = n ? `?${n}` : "";
      try {
        const l = this._getFinalPath(e);
        return { data: yield (yield get(this.fetch, `${this.url}/${i}/${l}${o}`, {
          headers: this.headers,
          noResolveJson: !0
        })).blob(), error: null };
      } catch (l) {
        if (isStorageError(l))
          return { data: null, error: l };
        throw l;
      }
    });
  }
  /**
   * Retrieves the details of an existing file.
   * @param path
   */
  info(e) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        const s = yield get(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers
        });
        return { data: recursiveToCamel(s), error: null };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Checks the existence of a file.
   * @param path
   */
  exists(e) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        return yield head(this.fetch, `${this.url}/object/${t}`, {
          headers: this.headers
        }), { data: !0, error: null };
      } catch (s) {
        if (isStorageError(s) && s instanceof StorageUnknownError) {
          const i = s.originalError;
          if ([400, 404].includes(i == null ? void 0 : i.status))
            return { data: !1, error: s };
        }
        throw s;
      }
    });
  }
  /**
   * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
   * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
   *
   * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
   * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
   * @param options.transform Transform the asset before serving it to the client.
   */
  getPublicUrl(e, t) {
    const s = this._getFinalPath(e), i = [], n = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
    n !== "" && i.push(n);
    const l = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", c = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
    c !== "" && i.push(c);
    let u = i.join("&");
    return u !== "" && (u = `?${u}`), {
      data: { publicUrl: encodeURI(`${this.url}/${l}/public/${s}${u}`) }
    };
  }
  /**
   * Deletes files within the same bucket
   *
   * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
   */
  remove(e) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        return { data: yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }), error: null };
      } catch (t) {
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Get file metadata
   * @param id the file id to retrieve metadata
   */
  // async getMetadata(
  //   id: string
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Update file metadata
   * @param id the file id to update metadata
   * @param meta the new file metadata
   */
  // async updateMetadata(
  //   id: string,
  //   meta: Metadata
  // ): Promise<
  //   | {
  //       data: Metadata
  //       error: null
  //     }
  //   | {
  //       data: null
  //       error: StorageError
  //     }
  // > {
  //   try {
  //     const data = await post(
  //       this.fetch,
  //       `${this.url}/metadata/${id}`,
  //       { ...meta },
  //       { headers: this.headers }
  //     )
  //     return { data, error: null }
  //   } catch (error) {
  //     if (isStorageError(error)) {
  //       return { data: null, error }
  //     }
  //     throw error
  //   }
  // }
  /**
   * Lists all the files within a bucket.
   * @param path The folder path.
   */
  list(e, t, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const i = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), t), { prefix: e || "" });
        return { data: yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, i, { headers: this.headers }, s), error: null };
      } catch (i) {
        if (isStorageError(i))
          return { data: null, error: i };
        throw i;
      }
    });
  }
  encodeMetadata(e) {
    return JSON.stringify(e);
  }
  toBase64(e) {
    return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : btoa(e);
  }
  _getFinalPath(e) {
    return `${this.bucketId}/${e}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(e) {
    const t = [];
    return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), e.resize && t.push(`resize=${e.resize}`), e.format && t.push(`format=${e.format}`), e.quality && t.push(`quality=${e.quality}`), t.join("&");
  }
}
const version$2 = "2.7.1", DEFAULT_HEADERS$2 = { "X-Client-Info": `storage-js/${version$2}` };
var __awaiter$3 = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
class StorageBucketApi {
  constructor(e, t = {}, s) {
    this.url = e, this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$2), t), this.fetch = resolveFetch$2(s);
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets() {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers }), error: null };
      } catch (e) {
        if (isStorageError(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
  /**
   * Retrieves the details of an existing Storage bucket.
   *
   * @param id The unique identifier of the bucket you would like to retrieve.
   */
  getBucket(e) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield get(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }), error: null };
      } catch (t) {
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Creates a new Storage bucket
   *
   * @param id A unique identifier for the bucket you are creating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   * @returns newly created bucket id
   */
  createBucket(e, t = {
    public: !1
  }) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/bucket`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Updates a Storage bucket
   *
   * @param id A unique identifier for the bucket you are updating.
   * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
   * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
   * The global file size limit takes precedence over this value.
   * The default value is null, which doesn't set a per bucket file size limit.
   * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
   * The default value is null, which allows files with all mime types to be uploaded.
   * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
   */
  updateBucket(e, t) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield put(this.fetch, `${this.url}/bucket/${e}`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Removes all objects inside a single bucket.
   *
   * @param id The unique identifier of the bucket you would like to empty.
   */
  emptyBucket(e) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/bucket/${e}/empty`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
   * You must first `empty()` the bucket.
   *
   * @param id The unique identifier of the bucket you would like to delete.
   */
  deleteBucket(e) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield remove(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
class StorageClient extends StorageBucketApi {
  constructor(e, t = {}, s) {
    super(e, t, s);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(e) {
    return new StorageFileApi(this.url, this.headers, e, this.fetch);
  }
}
const version$1 = "2.49.4";
let JS_ENV = "";
typeof Deno < "u" ? JS_ENV = "deno" : typeof document < "u" ? JS_ENV = "web" : typeof navigator < "u" && navigator.product === "ReactNative" ? JS_ENV = "react-native" : JS_ENV = "node";
const DEFAULT_HEADERS$1 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version$1}` }, DEFAULT_GLOBAL_OPTIONS = {
  headers: DEFAULT_HEADERS$1
}, DEFAULT_DB_OPTIONS = {
  schema: "public"
}, DEFAULT_AUTH_OPTIONS = {
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  flowType: "implicit"
}, DEFAULT_REALTIME_OPTIONS = {};
var __awaiter$2 = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
const resolveFetch$1 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = nodeFetch : e = fetch, (...t) => e(...t);
}, resolveHeadersConstructor = () => typeof Headers > "u" ? Headers$1 : Headers, fetchWithAuth = (r, e, t) => {
  const s = resolveFetch$1(t), i = resolveHeadersConstructor();
  return (n, o) => __awaiter$2(void 0, void 0, void 0, function* () {
    var l;
    const c = (l = yield e()) !== null && l !== void 0 ? l : r;
    let u = new i(o == null ? void 0 : o.headers);
    return u.has("apikey") || u.set("apikey", r), u.has("Authorization") || u.set("Authorization", `Bearer ${c}`), s(n, Object.assign(Object.assign({}, o), { headers: u }));
  });
};
var __awaiter$1 = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
function stripTrailingSlash(r) {
  return r.replace(/\/$/, "");
}
function applySettingDefaults(r, e) {
  const { db: t, auth: s, realtime: i, global: n } = r, { db: o, auth: l, realtime: c, global: u } = e, d = {
    db: Object.assign(Object.assign({}, o), t),
    auth: Object.assign(Object.assign({}, l), s),
    realtime: Object.assign(Object.assign({}, c), i),
    global: Object.assign(Object.assign({}, u), n),
    accessToken: () => __awaiter$1(this, void 0, void 0, function* () {
      return "";
    })
  };
  return r.accessToken ? d.accessToken = r.accessToken : delete d.accessToken, d;
}
const version = "2.69.1", AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3, AUTO_REFRESH_TICK_THRESHOLD = 3, EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS, GOTRUE_URL = "http://localhost:9999", STORAGE_KEY = "supabase.auth.token", DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${version}` }, API_VERSION_HEADER_NAME = "X-Supabase-Api-Version", API_VERSIONS = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
}, BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, JWKS_TTL = 6e5;
class AuthError extends Error {
  constructor(e, t, s) {
    super(e), this.__isAuthError = !0, this.name = "AuthError", this.status = t, this.code = s;
  }
}
function isAuthError(r) {
  return typeof r == "object" && r !== null && "__isAuthError" in r;
}
class AuthApiError extends AuthError {
  constructor(e, t, s) {
    super(e, t, s), this.name = "AuthApiError", this.status = t, this.code = s;
  }
}
function isAuthApiError(r) {
  return isAuthError(r) && r.name === "AuthApiError";
}
class AuthUnknownError extends AuthError {
  constructor(e, t) {
    super(e), this.name = "AuthUnknownError", this.originalError = t;
  }
}
class CustomAuthError extends AuthError {
  constructor(e, t, s, i) {
    super(e, s, i), this.name = t, this.status = s;
  }
}
class AuthSessionMissingError extends CustomAuthError {
  constructor() {
    super("Auth session missing!", "AuthSessionMissingError", 400, void 0);
  }
}
function isAuthSessionMissingError(r) {
  return isAuthError(r) && r.name === "AuthSessionMissingError";
}
class AuthInvalidTokenResponseError extends CustomAuthError {
  constructor() {
    super("Auth session or user missing", "AuthInvalidTokenResponseError", 500, void 0);
  }
}
class AuthInvalidCredentialsError extends CustomAuthError {
  constructor(e) {
    super(e, "AuthInvalidCredentialsError", 400, void 0);
  }
}
class AuthImplicitGrantRedirectError extends CustomAuthError {
  constructor(e, t = null) {
    super(e, "AuthImplicitGrantRedirectError", 500, void 0), this.details = null, this.details = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
function isAuthImplicitGrantRedirectError(r) {
  return isAuthError(r) && r.name === "AuthImplicitGrantRedirectError";
}
class AuthPKCEGrantCodeExchangeError extends CustomAuthError {
  constructor(e, t = null) {
    super(e, "AuthPKCEGrantCodeExchangeError", 500, void 0), this.details = null, this.details = t;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      details: this.details
    };
  }
}
class AuthRetryableFetchError extends CustomAuthError {
  constructor(e, t) {
    super(e, "AuthRetryableFetchError", t, void 0);
  }
}
function isAuthRetryableFetchError(r) {
  return isAuthError(r) && r.name === "AuthRetryableFetchError";
}
class AuthWeakPasswordError extends CustomAuthError {
  constructor(e, t, s) {
    super(e, "AuthWeakPasswordError", t, "weak_password"), this.reasons = s;
  }
}
class AuthInvalidJwtError extends CustomAuthError {
  constructor(e) {
    super(e, "AuthInvalidJwtError", 400, "invalid_jwt");
  }
}
const TO_BASE64URL = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_".split(""), IGNORE_BASE64URL = ` 	
\r=`.split(""), FROM_BASE64URL = (() => {
  const r = new Array(128);
  for (let e = 0; e < r.length; e += 1)
    r[e] = -1;
  for (let e = 0; e < IGNORE_BASE64URL.length; e += 1)
    r[IGNORE_BASE64URL[e].charCodeAt(0)] = -2;
  for (let e = 0; e < TO_BASE64URL.length; e += 1)
    r[TO_BASE64URL[e].charCodeAt(0)] = e;
  return r;
})();
function byteFromBase64URL(r, e, t) {
  const s = FROM_BASE64URL[r];
  if (s > -1)
    for (e.queue = e.queue << 6 | s, e.queuedBits += 6; e.queuedBits >= 8; )
      t(e.queue >> e.queuedBits - 8 & 255), e.queuedBits -= 8;
  else {
    if (s === -2)
      return;
    throw new Error(`Invalid Base64-URL character "${String.fromCharCode(r)}"`);
  }
}
function stringFromBase64URL(r) {
  const e = [], t = (o) => {
    e.push(String.fromCodePoint(o));
  }, s = {
    utf8seq: 0,
    codepoint: 0
  }, i = { queue: 0, queuedBits: 0 }, n = (o) => {
    stringFromUTF8(o, s, t);
  };
  for (let o = 0; o < r.length; o += 1)
    byteFromBase64URL(r.charCodeAt(o), i, n);
  return e.join("");
}
function codepointToUTF8(r, e) {
  if (r <= 127) {
    e(r);
    return;
  } else if (r <= 2047) {
    e(192 | r >> 6), e(128 | r & 63);
    return;
  } else if (r <= 65535) {
    e(224 | r >> 12), e(128 | r >> 6 & 63), e(128 | r & 63);
    return;
  } else if (r <= 1114111) {
    e(240 | r >> 18), e(128 | r >> 12 & 63), e(128 | r >> 6 & 63), e(128 | r & 63);
    return;
  }
  throw new Error(`Unrecognized Unicode codepoint: ${r.toString(16)}`);
}
function stringToUTF8(r, e) {
  for (let t = 0; t < r.length; t += 1) {
    let s = r.charCodeAt(t);
    if (s > 55295 && s <= 56319) {
      const i = (s - 55296) * 1024 & 65535;
      s = (r.charCodeAt(t + 1) - 56320 & 65535 | i) + 65536, t += 1;
    }
    codepointToUTF8(s, e);
  }
}
function stringFromUTF8(r, e, t) {
  if (e.utf8seq === 0) {
    if (r <= 127) {
      t(r);
      return;
    }
    for (let s = 1; s < 6; s += 1)
      if (!(r >> 7 - s & 1)) {
        e.utf8seq = s;
        break;
      }
    if (e.utf8seq === 2)
      e.codepoint = r & 31;
    else if (e.utf8seq === 3)
      e.codepoint = r & 15;
    else if (e.utf8seq === 4)
      e.codepoint = r & 7;
    else
      throw new Error("Invalid UTF-8 sequence");
    e.utf8seq -= 1;
  } else if (e.utf8seq > 0) {
    if (r <= 127)
      throw new Error("Invalid UTF-8 sequence");
    e.codepoint = e.codepoint << 6 | r & 63, e.utf8seq -= 1, e.utf8seq === 0 && t(e.codepoint);
  }
}
function base64UrlToUint8Array(r) {
  const e = [], t = { queue: 0, queuedBits: 0 }, s = (i) => {
    e.push(i);
  };
  for (let i = 0; i < r.length; i += 1)
    byteFromBase64URL(r.charCodeAt(i), t, s);
  return new Uint8Array(e);
}
function stringToUint8Array(r) {
  const e = [];
  return stringToUTF8(r, (t) => e.push(t)), new Uint8Array(e);
}
function expiresAt(r) {
  return Math.round(Date.now() / 1e3) + r;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(r) {
    const e = Math.random() * 16 | 0;
    return (r == "x" ? e : e & 3 | 8).toString(16);
  });
}
const isBrowser = () => typeof window < "u" && typeof document < "u", localStorageWriteTests = {
  tested: !1,
  writable: !1
}, supportsLocalStorage = () => {
  if (!isBrowser())
    return !1;
  try {
    if (typeof globalThis.localStorage != "object")
      return !1;
  } catch {
    return !1;
  }
  if (localStorageWriteTests.tested)
    return localStorageWriteTests.writable;
  const r = `lswt-${Math.random()}${Math.random()}`;
  try {
    globalThis.localStorage.setItem(r, r), globalThis.localStorage.removeItem(r), localStorageWriteTests.tested = !0, localStorageWriteTests.writable = !0;
  } catch {
    localStorageWriteTests.tested = !0, localStorageWriteTests.writable = !1;
  }
  return localStorageWriteTests.writable;
};
function parseParametersFromURL(r) {
  const e = {}, t = new URL(r);
  if (t.hash && t.hash[0] === "#")
    try {
      new URLSearchParams(t.hash.substring(1)).forEach((i, n) => {
        e[n] = i;
      });
    } catch {
    }
  return t.searchParams.forEach((s, i) => {
    e[i] = s;
  }), e;
}
const resolveFetch = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$4).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
}, looksLikeFetchResponse = (r) => typeof r == "object" && r !== null && "status" in r && "ok" in r && "json" in r && typeof r.json == "function", setItemAsync = async (r, e, t) => {
  await r.setItem(e, JSON.stringify(t));
}, getItemAsync = async (r, e) => {
  const t = await r.getItem(e);
  if (!t)
    return null;
  try {
    return JSON.parse(t);
  } catch {
    return t;
  }
}, removeItemAsync = async (r, e) => {
  await r.removeItem(e);
};
class Deferred {
  constructor() {
    this.promise = new Deferred.promiseConstructor((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
Deferred.promiseConstructor = Promise;
function decodeJWT(r) {
  const e = r.split(".");
  if (e.length !== 3)
    throw new AuthInvalidJwtError("Invalid JWT structure");
  for (let s = 0; s < e.length; s++)
    if (!BASE64URL_REGEX.test(e[s]))
      throw new AuthInvalidJwtError("JWT not in base64url format");
  return {
    // using base64url lib
    header: JSON.parse(stringFromBase64URL(e[0])),
    payload: JSON.parse(stringFromBase64URL(e[1])),
    signature: base64UrlToUint8Array(e[2]),
    raw: {
      header: e[0],
      payload: e[1]
    }
  };
}
async function sleep(r) {
  return await new Promise((e) => {
    setTimeout(() => e(null), r);
  });
}
function retryable(r, e) {
  return new Promise((s, i) => {
    (async () => {
      for (let n = 0; n < 1 / 0; n++)
        try {
          const o = await r(n);
          if (!e(n, null, o)) {
            s(o);
            return;
          }
        } catch (o) {
          if (!e(n, o)) {
            i(o);
            return;
          }
        }
    })();
  });
}
function dec2hex(r) {
  return ("0" + r.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
  const e = new Uint32Array(56);
  if (typeof crypto > "u") {
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", s = t.length;
    let i = "";
    for (let n = 0; n < 56; n++)
      i += t.charAt(Math.floor(Math.random() * s));
    return i;
  }
  return crypto.getRandomValues(e), Array.from(e, dec2hex).join("");
}
async function sha256(r) {
  const t = new TextEncoder().encode(r), s = await crypto.subtle.digest("SHA-256", t), i = new Uint8Array(s);
  return Array.from(i).map((n) => String.fromCharCode(n)).join("");
}
async function generatePKCEChallenge(r) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
    return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), r;
  const t = await sha256(r);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function getCodeChallengeAndMethod(r, e, t = !1) {
  const s = generatePKCEVerifier();
  let i = s;
  t && (i += "/PASSWORD_RECOVERY"), await setItemAsync(r, `${e}-code-verifier`, i);
  const n = await generatePKCEChallenge(s);
  return [n, s === n ? "plain" : "s256"];
}
const API_VERSION_REGEX = /^2[0-9]{3}-(0[1-9]|1[0-2])-(0[1-9]|1[0-9]|2[0-9]|3[0-1])$/i;
function parseResponseAPIVersion(r) {
  const e = r.headers.get(API_VERSION_HEADER_NAME);
  if (!e || !e.match(API_VERSION_REGEX))
    return null;
  try {
    return /* @__PURE__ */ new Date(`${e}T00:00:00.0Z`);
  } catch {
    return null;
  }
}
function validateExp(r) {
  if (!r)
    throw new Error("Missing exp claim");
  const e = Math.floor(Date.now() / 1e3);
  if (r <= e)
    throw new Error("JWT has expired");
}
function getAlgorithm(r) {
  switch (r) {
    case "RS256":
      return {
        name: "RSASSA-PKCS1-v1_5",
        hash: { name: "SHA-256" }
      };
    case "ES256":
      return {
        name: "ECDSA",
        namedCurve: "P-256",
        hash: { name: "SHA-256" }
      };
    default:
      throw new Error("Invalid alg claim");
  }
}
var __rest$1 = function(r, e) {
  var t = {};
  for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && e.indexOf(s) < 0 && (t[s] = r[s]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, s = Object.getOwnPropertySymbols(r); i < s.length; i++)
      e.indexOf(s[i]) < 0 && Object.prototype.propertyIsEnumerable.call(r, s[i]) && (t[s[i]] = r[s[i]]);
  return t;
};
const _getErrorMessage = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r), NETWORK_ERROR_CODES = [502, 503, 504];
async function handleError(r) {
  var e;
  if (!looksLikeFetchResponse(r))
    throw new AuthRetryableFetchError(_getErrorMessage(r), 0);
  if (NETWORK_ERROR_CODES.includes(r.status))
    throw new AuthRetryableFetchError(_getErrorMessage(r), r.status);
  let t;
  try {
    t = await r.json();
  } catch (n) {
    throw new AuthUnknownError(_getErrorMessage(n), n);
  }
  let s;
  const i = parseResponseAPIVersion(r);
  if (i && i.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof t == "object" && t && typeof t.code == "string" ? s = t.code : typeof t == "object" && t && typeof t.error_code == "string" && (s = t.error_code), s) {
    if (s === "weak_password")
      throw new AuthWeakPasswordError(_getErrorMessage(t), r.status, ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) || []);
    if (s === "session_not_found")
      throw new AuthSessionMissingError();
  } else if (typeof t == "object" && t && typeof t.weak_password == "object" && t.weak_password && Array.isArray(t.weak_password.reasons) && t.weak_password.reasons.length && t.weak_password.reasons.reduce((n, o) => n && typeof o == "string", !0))
    throw new AuthWeakPasswordError(_getErrorMessage(t), r.status, t.weak_password.reasons);
  throw new AuthApiError(_getErrorMessage(t), r.status || 500, s);
}
const _getRequestParams = (r, e, t, s) => {
  const i = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return r === "GET" ? i : (i.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e == null ? void 0 : e.headers), i.body = JSON.stringify(s), Object.assign(Object.assign({}, i), t));
};
async function _request(r, e, t, s) {
  var i;
  const n = Object.assign({}, s == null ? void 0 : s.headers);
  n[API_VERSION_HEADER_NAME] || (n[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name), s != null && s.jwt && (n.Authorization = `Bearer ${s.jwt}`);
  const o = (i = s == null ? void 0 : s.query) !== null && i !== void 0 ? i : {};
  s != null && s.redirectTo && (o.redirect_to = s.redirectTo);
  const l = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : "", c = await _handleRequest(r, e, t + l, {
    headers: n,
    noResolveJson: s == null ? void 0 : s.noResolveJson
  }, {}, s == null ? void 0 : s.body);
  return s != null && s.xform ? s == null ? void 0 : s.xform(c) : { data: Object.assign({}, c), error: null };
}
async function _handleRequest(r, e, t, s, i, n) {
  const o = _getRequestParams(e, s, i, n);
  let l;
  try {
    l = await r(t, Object.assign({}, o));
  } catch (c) {
    throw console.error(c), new AuthRetryableFetchError(_getErrorMessage(c), 0);
  }
  if (l.ok || await handleError(l), s != null && s.noResolveJson)
    return l;
  try {
    return await l.json();
  } catch (c) {
    await handleError(c);
  }
}
function _sessionResponse(r) {
  var e;
  let t = null;
  hasSession(r) && (t = Object.assign({}, r), r.expires_at || (t.expires_at = expiresAt(r.expires_in)));
  const s = (e = r.user) !== null && e !== void 0 ? e : r;
  return { data: { session: t, user: s }, error: null };
}
function _sessionResponsePassword(r) {
  const e = _sessionResponse(r);
  return !e.error && r.weak_password && typeof r.weak_password == "object" && Array.isArray(r.weak_password.reasons) && r.weak_password.reasons.length && r.weak_password.message && typeof r.weak_password.message == "string" && r.weak_password.reasons.reduce((t, s) => t && typeof s == "string", !0) && (e.data.weak_password = r.weak_password), e;
}
function _userResponse(r) {
  var e;
  return { data: { user: (e = r.user) !== null && e !== void 0 ? e : r }, error: null };
}
function _ssoResponse(r) {
  return { data: r, error: null };
}
function _generateLinkResponse(r) {
  const { action_link: e, email_otp: t, hashed_token: s, redirect_to: i, verification_type: n } = r, o = __rest$1(r, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), l = {
    action_link: e,
    email_otp: t,
    hashed_token: s,
    redirect_to: i,
    verification_type: n
  }, c = Object.assign({}, o);
  return {
    data: {
      properties: l,
      user: c
    },
    error: null
  };
}
function _noResolveJsonResponse(r) {
  return r;
}
function hasSession(r) {
  return r.access_token && r.refresh_token && r.expires_in;
}
var __rest = function(r, e) {
  var t = {};
  for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && e.indexOf(s) < 0 && (t[s] = r[s]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var i = 0, s = Object.getOwnPropertySymbols(r); i < s.length; i++)
      e.indexOf(s[i]) < 0 && Object.prototype.propertyIsEnumerable.call(r, s[i]) && (t[s[i]] = r[s[i]]);
  return t;
};
class GoTrueAdminApi {
  constructor({ url: e = "", headers: t = {}, fetch: s }) {
    this.url = e, this.headers = t, this.fetch = resolveFetch(s), this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(e, t = "global") {
    try {
      return await _request(this.fetch, "POST", `${this.url}/logout?scope=${t}`, {
        headers: this.headers,
        jwt: e,
        noResolveJson: !0
      }), { data: null, error: null };
    } catch (s) {
      if (isAuthError(s))
        return { data: null, error: s };
      throw s;
    }
  }
  /**
   * Sends an invite link to an email address.
   * @param email The email address of the user.
   * @param options Additional options to be included when inviting.
   */
  async inviteUserByEmail(e, t = {}) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/invite`, {
        body: { email: e, data: t.data },
        headers: this.headers,
        redirectTo: t.redirectTo,
        xform: _userResponse
      });
    } catch (s) {
      if (isAuthError(s))
        return { data: { user: null }, error: s };
      throw s;
    }
  }
  /**
   * Generates email links and OTPs to be sent via a custom email provider.
   * @param email The user's email.
   * @param options.password User password. For signup only.
   * @param options.data Optional user metadata. For signup only.
   * @param options.redirectTo The redirect url which should be appended to the generated link
   */
  async generateLink(e) {
    try {
      const { options: t } = e, s = __rest(e, ["options"]), i = Object.assign(Object.assign({}, s), t);
      return "newEmail" in s && (i.new_email = s == null ? void 0 : s.newEmail, delete i.newEmail), await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body: i,
        headers: this.headers,
        xform: _generateLinkResponse,
        redirectTo: t == null ? void 0 : t.redirectTo
      });
    } catch (t) {
      if (isAuthError(t))
        return {
          data: {
            properties: null,
            user: null
          },
          error: t
        };
      throw t;
    }
  }
  // User Admin API
  /**
   * Creates a new user.
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async createUser(e) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
        body: e,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Get a list of users.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
   */
  async listUsers(e) {
    var t, s, i, n, o, l, c;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 }, d = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (s = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && s !== void 0 ? s : "",
          per_page: (n = (i = e == null ? void 0 : e.perPage) === null || i === void 0 ? void 0 : i.toString()) !== null && n !== void 0 ? n : ""
        },
        xform: _noResolveJsonResponse
      });
      if (d.error)
        throw d.error;
      const f = await d.json(), h = (o = d.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, _ = (c = (l = d.headers.get("link")) === null || l === void 0 ? void 0 : l.split(",")) !== null && c !== void 0 ? c : [];
      return _.length > 0 && (_.forEach((g) => {
        const v = parseInt(g.split(";")[0].split("=")[1].substring(0, 1)), m = JSON.parse(g.split(";")[1].split("=")[1]);
        u[`${m}Page`] = v;
      }), u.total = parseInt(h)), { data: Object.assign(Object.assign({}, f), u), error: null };
    } catch (u) {
      if (isAuthError(u))
        return { data: { users: [] }, error: u };
      throw u;
    }
  }
  /**
   * Get user by id.
   *
   * @param uid The user's unique identifier
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async getUserById(e) {
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        xform: _userResponse
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Updates the user data.
   *
   * @param attributes The data you want to update.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async updateUserById(e, t) {
    try {
      return await _request(this.fetch, "PUT", `${this.url}/admin/users/${e}`, {
        body: t,
        headers: this.headers,
        xform: _userResponse
      });
    } catch (s) {
      if (isAuthError(s))
        return { data: { user: null }, error: s };
      throw s;
    }
  }
  /**
   * Delete a user. Requires a `service_role` key.
   *
   * @param id The user id you want to remove.
   * @param shouldSoftDelete If true, then the user will be soft-deleted from the auth schema. Soft deletion allows user identification from the hashed user ID but is not reversible.
   * Defaults to false for backward compatibility.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async deleteUser(e, t = !1) {
    try {
      return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${e}`, {
        headers: this.headers,
        body: {
          should_soft_delete: t
        },
        xform: _userResponse
      });
    } catch (s) {
      if (isAuthError(s))
        return { data: { user: null }, error: s };
      throw s;
    }
  }
  async _listFactors(e) {
    try {
      const { data: t, error: s } = await _request(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
        headers: this.headers,
        xform: (i) => ({ data: { factors: i }, error: null })
      });
      return { data: t, error: s };
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _deleteFactor(e) {
    try {
      return { data: await _request(this.fetch, "DELETE", `${this.url}/admin/users/${e.userId}/factors/${e.id}`, {
        headers: this.headers
      }), error: null };
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
}
const localStorageAdapter = {
  getItem: (r) => supportsLocalStorage() ? globalThis.localStorage.getItem(r) : null,
  setItem: (r, e) => {
    supportsLocalStorage() && globalThis.localStorage.setItem(r, e);
  },
  removeItem: (r) => {
    supportsLocalStorage() && globalThis.localStorage.removeItem(r);
  }
};
function memoryLocalStorageAdapter(r = {}) {
  return {
    getItem: (e) => r[e] || null,
    setItem: (e, t) => {
      r[e] = t;
    },
    removeItem: (e) => {
      delete r[e];
    }
  };
}
function polyfillGlobalThis() {
  if (typeof globalThis != "object")
    try {
      Object.defineProperty(Object.prototype, "__magic__", {
        get: function() {
          return this;
        },
        configurable: !0
      }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__;
    } catch {
      typeof self < "u" && (self.globalThis = self);
    }
}
const internals = {
  /**
   * @experimental
   */
  debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
};
class LockAcquireTimeoutError extends Error {
  constructor(e) {
    super(e), this.isAcquireTimeout = !0;
  }
}
class NavigatorLockAcquireTimeoutError extends LockAcquireTimeoutError {
}
async function navigatorLock(r, e, t) {
  internals.debug && console.log("@supabase/gotrue-js: navigatorLock: acquire lock", r, e);
  const s = new globalThis.AbortController();
  return e > 0 && setTimeout(() => {
    s.abort(), internals.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", r);
  }, e), await Promise.resolve().then(() => globalThis.navigator.locks.request(r, e === 0 ? {
    mode: "exclusive",
    ifAvailable: !0
  } : {
    mode: "exclusive",
    signal: s.signal
  }, async (i) => {
    if (i) {
      internals.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", r, i.name);
      try {
        return await t();
      } finally {
        internals.debug && console.log("@supabase/gotrue-js: navigatorLock: released", r, i.name);
      }
    } else {
      if (e === 0)
        throw internals.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", r), new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${r}" immediately failed`);
      if (internals.debug)
        try {
          const n = await globalThis.navigator.locks.query();
          console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(n, null, "  "));
        } catch (n) {
          console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", n);
        }
      return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await t();
    }
  }));
}
polyfillGlobalThis();
const DEFAULT_OPTIONS = {
  url: GOTRUE_URL,
  storageKey: STORAGE_KEY,
  autoRefreshToken: !0,
  persistSession: !0,
  detectSessionInUrl: !0,
  headers: DEFAULT_HEADERS,
  flowType: "implicit",
  debug: !1,
  hasCustomAuthorizationHeader: !1
};
async function lockNoOp(r, e, t) {
  return await t();
}
class GoTrueClient {
  /**
   * Create a new client for use in the browser.
   */
  constructor(e) {
    var t, s;
    this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = GoTrueClient.nextInstanceID, GoTrueClient.nextInstanceID += 1, this.instanceID > 0 && isBrowser() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const i = Object.assign(Object.assign({}, DEFAULT_OPTIONS), e);
    if (this.logDebugMessages = !!i.debug, typeof i.debug == "function" && (this.logger = i.debug), this.persistSession = i.persistSession, this.storageKey = i.storageKey, this.autoRefreshToken = i.autoRefreshToken, this.admin = new GoTrueAdminApi({
      url: i.url,
      headers: i.headers,
      fetch: i.fetch
    }), this.url = i.url, this.headers = i.headers, this.fetch = resolveFetch(i.fetch), this.lock = i.lock || lockNoOp, this.detectSessionInUrl = i.detectSessionInUrl, this.flowType = i.flowType, this.hasCustomAuthorizationHeader = i.hasCustomAuthorizationHeader, i.lock ? this.lock = i.lock : isBrowser() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = navigatorLock : this.lock = lockNoOp, this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER, this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    }, this.persistSession ? i.storage ? this.storage = i.storage : supportsLocalStorage() ? this.storage = localStorageAdapter : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)) : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)), isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (n) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", n);
      }
      (s = this.broadcastChannel) === null || s === void 0 || s.addEventListener("message", async (n) => {
        this._debug("received broadcast notification from other tab or client", n), await this._notifyAllSubscribers(n.data.event, n.data.session, !1);
      });
    }
    this.initialize();
  }
  _debug(...e) {
    return this.logDebugMessages && this.logger(`GoTrueClient@${this.instanceID} (${version}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...e), this;
  }
  /**
   * Initializes the client session either from the url or from storage.
   * This method is automatically called when instantiating the client, but should also be called
   * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
   */
  async initialize() {
    return this.initializePromise ? await this.initializePromise : (this.initializePromise = (async () => await this._acquireLock(-1, async () => await this._initialize()))(), await this.initializePromise);
  }
  /**
   * IMPORTANT:
   * 1. Never throw in this method, as it is called from the constructor
   * 2. Never return a session from this method as it would be cached over
   *    the whole lifetime of the client
   */
  async _initialize() {
    var e;
    try {
      const t = parseParametersFromURL(window.location.href);
      let s = "none";
      if (this._isImplicitGrantCallback(t) ? s = "implicit" : await this._isPKCECallback(t) && (s = "pkce"), isBrowser() && this.detectSessionInUrl && s !== "none") {
        const { data: i, error: n } = await this._getSessionFromURL(t, s);
        if (n) {
          if (this._debug("#_initialize()", "error detecting session from URL", n), isAuthImplicitGrantRedirectError(n)) {
            const c = (e = n.details) === null || e === void 0 ? void 0 : e.code;
            if (c === "identity_already_exists" || c === "identity_not_found" || c === "single_identity_not_deletable")
              return { error: n };
          }
          return await this._removeSession(), { error: n };
        }
        const { session: o, redirectType: l } = i;
        return this._debug("#_initialize()", "detected session in URL", o, "redirect type", l), await this._saveSession(o), setTimeout(async () => {
          l === "recovery" ? await this._notifyAllSubscribers("PASSWORD_RECOVERY", o) : await this._notifyAllSubscribers("SIGNED_IN", o);
        }, 0), { error: null };
      }
      return await this._recoverAndRefresh(), { error: null };
    } catch (t) {
      return isAuthError(t) ? { error: t } : {
        error: new AuthUnknownError("Unexpected error during initialization", t)
      };
    } finally {
      await this._handleVisibilityChange(), this._debug("#_initialize()", "end");
    }
  }
  /**
   * Creates a new anonymous user.
   *
   * @returns A session where the is_anonymous claim in the access token JWT set to true
   */
  async signInAnonymously(e) {
    var t, s, i;
    try {
      const n = await _request(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (s = (t = e == null ? void 0 : e.options) === null || t === void 0 ? void 0 : t.data) !== null && s !== void 0 ? s : {},
          gotrue_meta_security: { captcha_token: (i = e == null ? void 0 : e.options) === null || i === void 0 ? void 0 : i.captchaToken }
        },
        xform: _sessionResponse
      }), { data: o, error: l } = n;
      if (l || !o)
        return { data: { user: null, session: null }, error: l };
      const c = o.session, u = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: u, session: c }, error: null };
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null, session: null }, error: n };
      throw n;
    }
  }
  /**
   * Creates a new user.
   *
   * Be aware that if a user account exists in the system you may get back an
   * error message that attempts to hide this information from the user.
   * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
   *
   * @returns A logged-in session if the server has "autoconfirm" ON
   * @returns A user if the server has "autoconfirm" OFF
   */
  async signUp(e) {
    var t, s, i;
    try {
      let n;
      if ("email" in e) {
        const { email: d, password: f, options: h } = e;
        let _ = null, g = null;
        this.flowType === "pkce" && ([_, g] = await getCodeChallengeAndMethod(this.storage, this.storageKey)), n = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: h == null ? void 0 : h.emailRedirectTo,
          body: {
            email: d,
            password: f,
            data: (t = h == null ? void 0 : h.data) !== null && t !== void 0 ? t : {},
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken },
            code_challenge: _,
            code_challenge_method: g
          },
          xform: _sessionResponse
        });
      } else if ("phone" in e) {
        const { phone: d, password: f, options: h } = e;
        n = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: d,
            password: f,
            data: (s = h == null ? void 0 : h.data) !== null && s !== void 0 ? s : {},
            channel: (i = h == null ? void 0 : h.channel) !== null && i !== void 0 ? i : "sms",
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken }
          },
          xform: _sessionResponse
        });
      } else
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      const { data: o, error: l } = n;
      if (l || !o)
        return { data: { user: null, session: null }, error: l };
      const c = o.session, u = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: u, session: c }, error: null };
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null, session: null }, error: n };
      throw n;
    }
  }
  /**
   * Log in an existing user with an email and password or phone and password.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or that the
   * email/phone and password combination is wrong or that the account can only
   * be accessed via social login.
   */
  async signInWithPassword(e) {
    try {
      let t;
      if ("email" in e) {
        const { email: n, password: o, options: l } = e;
        t = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email: n,
            password: o,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else if ("phone" in e) {
        const { phone: n, password: o, options: l } = e;
        t = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone: n,
            password: o,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      const { data: s, error: i } = t;
      return i ? { data: { user: null, session: null }, error: i } : !s || !s.session || !s.user ? { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() } : (s.session && (await this._saveSession(s.session), await this._notifyAllSubscribers("SIGNED_IN", s.session)), {
        data: Object.assign({ user: s.user, session: s.session }, s.weak_password ? { weakPassword: s.weak_password } : null),
        error: i
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Log in an existing user via a third-party provider.
   * This method supports the PKCE flow.
   */
  async signInWithOAuth(e) {
    var t, s, i, n;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (s = e.options) === null || s === void 0 ? void 0 : s.scopes,
      queryParams: (i = e.options) === null || i === void 0 ? void 0 : i.queryParams,
      skipBrowserRedirect: (n = e.options) === null || n === void 0 ? void 0 : n.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(e) {
    return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e));
  }
  async _exchangeCodeForSession(e) {
    const t = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`), [s, i] = (t ?? "").split("/");
    try {
      const { data: n, error: o } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: e,
          code_verifier: s
        },
        xform: _sessionResponse
      });
      if (await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`), o)
        throw o;
      return !n || !n.session || !n.user ? {
        data: { user: null, session: null, redirectType: null },
        error: new AuthInvalidTokenResponseError()
      } : (n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers("SIGNED_IN", n.session)), { data: Object.assign(Object.assign({}, n), { redirectType: i ?? null }), error: o });
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null, session: null, redirectType: null }, error: n };
      throw n;
    }
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(e) {
    try {
      const { options: t, provider: s, token: i, access_token: n, nonce: o } = e, l = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider: s,
          id_token: i,
          access_token: n,
          nonce: o,
          gotrue_meta_security: { captcha_token: t == null ? void 0 : t.captchaToken }
        },
        xform: _sessionResponse
      }), { data: c, error: u } = l;
      return u ? { data: { user: null, session: null }, error: u } : !c || !c.session || !c.user ? {
        data: { user: null, session: null },
        error: new AuthInvalidTokenResponseError()
      } : (c.session && (await this._saveSession(c.session), await this._notifyAllSubscribers("SIGNED_IN", c.session)), { data: c, error: u });
    } catch (t) {
      if (isAuthError(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Log in a user using magiclink or a one-time password (OTP).
   *
   * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
   * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
   * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
   *
   * Be aware that you may get back an error message that will not distinguish
   * between the cases where the account does not exist or, that the account
   * can only be accessed via social login.
   *
   * Do note that you will need to configure a Whatsapp sender on Twilio
   * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
   * channel is not supported on other providers
   * at this time.
   * This method supports PKCE when an email is passed.
   */
  async signInWithOtp(e) {
    var t, s, i, n, o;
    try {
      if ("email" in e) {
        const { email: l, options: c } = e;
        let u = null, d = null;
        this.flowType === "pkce" && ([u, d] = await getCodeChallengeAndMethod(this.storage, this.storageKey));
        const { error: f } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: l,
            data: (t = c == null ? void 0 : c.data) !== null && t !== void 0 ? t : {},
            create_user: (s = c == null ? void 0 : c.shouldCreateUser) !== null && s !== void 0 ? s : !0,
            gotrue_meta_security: { captcha_token: c == null ? void 0 : c.captchaToken },
            code_challenge: u,
            code_challenge_method: d
          },
          redirectTo: c == null ? void 0 : c.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: f };
      }
      if ("phone" in e) {
        const { phone: l, options: c } = e, { data: u, error: d } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone: l,
            data: (i = c == null ? void 0 : c.data) !== null && i !== void 0 ? i : {},
            create_user: (n = c == null ? void 0 : c.shouldCreateUser) !== null && n !== void 0 ? n : !0,
            gotrue_meta_security: { captcha_token: c == null ? void 0 : c.captchaToken },
            channel: (o = c == null ? void 0 : c.channel) !== null && o !== void 0 ? o : "sms"
          }
        });
        return { data: { user: null, session: null, messageId: u == null ? void 0 : u.message_id }, error: d };
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
    } catch (l) {
      if (isAuthError(l))
        return { data: { user: null, session: null }, error: l };
      throw l;
    }
  }
  /**
   * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
   */
  async verifyOtp(e) {
    var t, s;
    try {
      let i, n;
      "options" in e && (i = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo, n = (s = e.options) === null || s === void 0 ? void 0 : s.captchaToken);
      const { data: o, error: l } = await _request(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: n } }),
        redirectTo: i,
        xform: _sessionResponse
      });
      if (l)
        throw l;
      if (!o)
        throw new Error("An error occurred on token verification.");
      const c = o.session, u = o.user;
      return c != null && c.access_token && (await this._saveSession(c), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", c)), { data: { user: u, session: c }, error: null };
    } catch (i) {
      if (isAuthError(i))
        return { data: { user: null, session: null }, error: i };
      throw i;
    }
  }
  /**
   * Attempts a single-sign on using an enterprise Identity Provider. A
   * successful SSO attempt will redirect the current page to the identity
   * provider authorization page. The redirect URL is implementation and SSO
   * protocol specific.
   *
   * You can use it by providing a SSO domain. Typically you can extract this
   * domain by asking users for their email address. If this domain is
   * registered on the Auth instance the redirect will use that organization's
   * currently active SSO Identity Provider for the login.
   *
   * If you have built an organization-specific login page, you can use the
   * organization's SSO Identity Provider UUID directly instead.
   */
  async signInWithSSO(e) {
    var t, s, i;
    try {
      let n = null, o = null;
      return this.flowType === "pkce" && ([n, o] = await getCodeChallengeAndMethod(this.storage, this.storageKey)), await _request(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), { redirect_to: (s = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && s !== void 0 ? s : void 0 }), !((i = e == null ? void 0 : e.options) === null || i === void 0) && i.captchaToken ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: n, code_challenge_method: o }),
        headers: this.headers,
        xform: _ssoResponse
      });
    } catch (n) {
      if (isAuthError(n))
        return { data: null, error: n };
      throw n;
    }
  }
  /**
   * Sends a reauthentication OTP to the user's email or phone number.
   * Requires the user to be signed-in.
   */
  async reauthenticate() {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._reauthenticate());
  }
  async _reauthenticate() {
    try {
      return await this._useSession(async (e) => {
        const { data: { session: t }, error: s } = e;
        if (s)
          throw s;
        if (!t)
          throw new AuthSessionMissingError();
        const { error: i } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: t.access_token
        });
        return { data: { user: null, session: null }, error: i };
      });
    } catch (e) {
      if (isAuthError(e))
        return { data: { user: null, session: null }, error: e };
      throw e;
    }
  }
  /**
   * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
   */
  async resend(e) {
    try {
      const t = `${this.url}/resend`;
      if ("email" in e) {
        const { email: s, type: i, options: n } = e, { error: o } = await _request(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            email: s,
            type: i,
            gotrue_meta_security: { captcha_token: n == null ? void 0 : n.captchaToken }
          },
          redirectTo: n == null ? void 0 : n.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: o };
      } else if ("phone" in e) {
        const { phone: s, type: i, options: n } = e, { data: o, error: l } = await _request(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            phone: s,
            type: i,
            gotrue_meta_security: { captcha_token: n == null ? void 0 : n.captchaToken }
          }
        });
        return { data: { user: null, session: null, messageId: o == null ? void 0 : o.message_id }, error: l };
      }
      throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
    } catch (t) {
      if (isAuthError(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Returns the session, refreshing it if necessary.
   *
   * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
   *
   * **IMPORTANT:** This method loads values directly from the storage attached
   * to the client. If that storage is based on request cookies for example,
   * the values in it may not be authentic and therefore it's strongly advised
   * against using this method and its results in such circumstances. A warning
   * will be emitted if this is detected. Use {@link #getUser()} instead.
   */
  async getSession() {
    return await this.initializePromise, await this._acquireLock(-1, async () => this._useSession(async (t) => t));
  }
  /**
   * Acquires a global lock based on the storage key.
   */
  async _acquireLock(e, t) {
    this._debug("#_acquireLock", "begin", e);
    try {
      if (this.lockAcquired) {
        const s = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), i = (async () => (await s, await t()))();
        return this.pendingInLock.push((async () => {
          try {
            await i;
          } catch {
          }
        })()), i;
      }
      return await this.lock(`lock:${this.storageKey}`, e, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = !0;
          const s = t();
          for (this.pendingInLock.push((async () => {
            try {
              await s;
            } catch {
            }
          })()), await s; this.pendingInLock.length; ) {
            const i = [...this.pendingInLock];
            await Promise.all(i), this.pendingInLock.splice(0, i.length);
          }
          return await s;
        } finally {
          this._debug("#_acquireLock", "lock released for storage key", this.storageKey), this.lockAcquired = !1;
        }
      });
    } finally {
      this._debug("#_acquireLock", "end");
    }
  }
  /**
   * Use instead of {@link #getSession} inside the library. It is
   * semantically usually what you want, as getting a session involves some
   * processing afterwards that requires only one client operating on the
   * session at once across multiple tabs or processes.
   */
  async _useSession(e) {
    this._debug("#_useSession", "begin");
    try {
      const t = await this.__loadSession();
      return await e(t);
    } finally {
      this._debug("#_useSession", "end");
    }
  }
  /**
   * NEVER USE DIRECTLY!
   *
   * Always use {@link #_useSession}.
   */
  async __loadSession() {
    this._debug("#__loadSession()", "begin"), this.lockAcquired || this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
    try {
      let e = null;
      const t = await getItemAsync(this.storage, this.storageKey);
      if (this._debug("#getSession()", "session from storage", t), t !== null && (this._isValidSession(t) ? e = t : (this._debug("#getSession()", "session from storage is not valid"), await this._removeSession())), !e)
        return { data: { session: null }, error: null };
      const s = e.expires_at ? e.expires_at * 1e3 - Date.now() < EXPIRY_MARGIN_MS : !1;
      if (this._debug("#__loadSession()", `session has${s ? "" : " not"} expired`, "expires_at", e.expires_at), !s) {
        if (this.storage.isServer) {
          let o = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (c, u, d) => (!o && u === "user" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), o = !0, this.suppressGetSessionWarning = !0), Reflect.get(c, u, d))
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: i, error: n } = await this._callRefreshToken(e.refresh_token);
      return n ? { data: { session: null }, error: n } : { data: { session: i }, error: null };
    } finally {
      this._debug("#__loadSession()", "end");
    }
  }
  /**
   * Gets the current user details if there is an existing session. This method
   * performs a network request to the Supabase Auth server, so the returned
   * value is authentic and can be used to base authorization rules on.
   *
   * @param jwt Takes in an optional access token JWT. If no JWT is provided, the JWT from the current session is used.
   */
  async getUser(e) {
    return e ? await this._getUser(e) : (await this.initializePromise, await this._acquireLock(-1, async () => await this._getUser()));
  }
  async _getUser(e) {
    try {
      return e ? await _request(this.fetch, "GET", `${this.url}/user`, {
        headers: this.headers,
        jwt: e,
        xform: _userResponse
      }) : await this._useSession(async (t) => {
        var s, i, n;
        const { data: o, error: l } = t;
        if (l)
          throw l;
        return !(!((s = o.session) === null || s === void 0) && s.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new AuthSessionMissingError() } : await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (n = (i = o.session) === null || i === void 0 ? void 0 : i.access_token) !== null && n !== void 0 ? n : void 0,
          xform: _userResponse
        });
      });
    } catch (t) {
      if (isAuthError(t))
        return isAuthSessionMissingError(t) && (await this._removeSession(), await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)), { data: { user: null }, error: t };
      throw t;
    }
  }
  /**
   * Updates user data for a logged in user.
   */
  async updateUser(e, t = {}) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._updateUser(e, t));
  }
  async _updateUser(e, t = {}) {
    try {
      return await this._useSession(async (s) => {
        const { data: i, error: n } = s;
        if (n)
          throw n;
        if (!i.session)
          throw new AuthSessionMissingError();
        const o = i.session;
        let l = null, c = null;
        this.flowType === "pkce" && e.email != null && ([l, c] = await getCodeChallengeAndMethod(this.storage, this.storageKey));
        const { data: u, error: d } = await _request(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: t == null ? void 0 : t.emailRedirectTo,
          body: Object.assign(Object.assign({}, e), { code_challenge: l, code_challenge_method: c }),
          jwt: o.access_token,
          xform: _userResponse
        });
        if (d)
          throw d;
        return o.user = u.user, await this._saveSession(o), await this._notifyAllSubscribers("USER_UPDATED", o), { data: { user: o.user }, error: null };
      });
    } catch (s) {
      if (isAuthError(s))
        return { data: { user: null }, error: s };
      throw s;
    }
  }
  /**
   * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
   * If the refresh token or access token in the current session is invalid, an error will be thrown.
   * @param currentSession The current session that minimally contains an access token and refresh token.
   */
  async setSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._setSession(e));
  }
  async _setSession(e) {
    try {
      if (!e.access_token || !e.refresh_token)
        throw new AuthSessionMissingError();
      const t = Date.now() / 1e3;
      let s = t, i = !0, n = null;
      const { payload: o } = decodeJWT(e.access_token);
      if (o.exp && (s = o.exp, i = s <= t), i) {
        const { session: l, error: c } = await this._callRefreshToken(e.refresh_token);
        if (c)
          return { data: { user: null, session: null }, error: c };
        if (!l)
          return { data: { user: null, session: null }, error: null };
        n = l;
      } else {
        const { data: l, error: c } = await this._getUser(e.access_token);
        if (c)
          throw c;
        n = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: l.user,
          token_type: "bearer",
          expires_in: s - t,
          expires_at: s
        }, await this._saveSession(n), await this._notifyAllSubscribers("SIGNED_IN", n);
      }
      return { data: { user: n.user, session: n }, error: null };
    } catch (t) {
      if (isAuthError(t))
        return { data: { session: null, user: null }, error: t };
      throw t;
    }
  }
  /**
   * Returns a new session, regardless of expiry status.
   * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
   * If the current session's refresh token is invalid, an error will be thrown.
   * @param currentSession The current session. If passed in, it must contain a refresh token.
   */
  async refreshSession(e) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._refreshSession(e));
  }
  async _refreshSession(e) {
    try {
      return await this._useSession(async (t) => {
        var s;
        if (!e) {
          const { data: o, error: l } = t;
          if (l)
            throw l;
          e = (s = o.session) !== null && s !== void 0 ? s : void 0;
        }
        if (!(e != null && e.refresh_token))
          throw new AuthSessionMissingError();
        const { session: i, error: n } = await this._callRefreshToken(e.refresh_token);
        return n ? { data: { user: null, session: null }, error: n } : i ? { data: { user: i.user, session: i }, error: null } : { data: { user: null, session: null }, error: null };
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: { user: null, session: null }, error: t };
      throw t;
    }
  }
  /**
   * Gets the session data from a URL string
   */
  async _getSessionFromURL(e, t) {
    try {
      if (!isBrowser())
        throw new AuthImplicitGrantRedirectError("No browser detected.");
      if (e.error || e.error_description || e.error_code)
        throw new AuthImplicitGrantRedirectError(e.error_description || "Error in URL with unspecified error_description", {
          error: e.error || "unspecified_error",
          code: e.error_code || "unspecified_code"
        });
      switch (t) {
        case "implicit":
          if (this.flowType === "pkce")
            throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
          break;
        case "pkce":
          if (this.flowType === "implicit")
            throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
          break;
        default:
      }
      if (t === "pkce") {
        if (this._debug("#_initialize()", "begin", "is PKCE flow", !0), !e.code)
          throw new AuthPKCEGrantCodeExchangeError("No code detected.");
        const { data: E, error: w } = await this._exchangeCodeForSession(e.code);
        if (w)
          throw w;
        const T = new URL(window.location.href);
        return T.searchParams.delete("code"), window.history.replaceState(window.history.state, "", T.toString()), { data: { session: E.session, redirectType: null }, error: null };
      }
      const { provider_token: s, provider_refresh_token: i, access_token: n, refresh_token: o, expires_in: l, expires_at: c, token_type: u } = e;
      if (!n || !l || !o || !u)
        throw new AuthImplicitGrantRedirectError("No session defined in URL");
      const d = Math.round(Date.now() / 1e3), f = parseInt(l);
      let h = d + f;
      c && (h = parseInt(c));
      const _ = h - d;
      _ * 1e3 <= AUTO_REFRESH_TICK_DURATION_MS && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${_}s, should have been closer to ${f}s`);
      const g = h - f;
      d - g >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", g, h, d) : d - g < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", g, h, d);
      const { data: v, error: m } = await this._getUser(n);
      if (m)
        throw m;
      const y = {
        provider_token: s,
        provider_refresh_token: i,
        access_token: n,
        expires_in: f,
        expires_at: h,
        refresh_token: o,
        token_type: u,
        user: v.user
      };
      return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: y, redirectType: e.type }, error: null };
    } catch (s) {
      if (isAuthError(s))
        return { data: { session: null, redirectType: null }, error: s };
      throw s;
    }
  }
  /**
   * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
   */
  _isImplicitGrantCallback(e) {
    return !!(e.access_token || e.error_description);
  }
  /**
   * Checks if the current URL and backing storage contain parameters given by a PKCE flow
   */
  async _isPKCECallback(e) {
    const t = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
    return !!(e.code && t);
  }
  /**
   * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
   *
   * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
   * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
   *
   * If using `others` scope, no `SIGNED_OUT` event is fired!
   */
  async signOut(e = { scope: "global" }) {
    return await this.initializePromise, await this._acquireLock(-1, async () => await this._signOut(e));
  }
  async _signOut({ scope: e } = { scope: "global" }) {
    return await this._useSession(async (t) => {
      var s;
      const { data: i, error: n } = t;
      if (n)
        return { error: n };
      const o = (s = i.session) === null || s === void 0 ? void 0 : s.access_token;
      if (o) {
        const { error: l } = await this.admin.signOut(o, e);
        if (l && !(isAuthApiError(l) && (l.status === 404 || l.status === 401 || l.status === 403)))
          return { error: l };
      }
      return e !== "others" && (await this._removeSession(), await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)), { error: null };
    });
  }
  /**
   * Receive a notification every time an auth event happens.
   * @param callback A callback function to be invoked when an auth event happens.
   */
  onAuthStateChange(e) {
    const t = uuid(), s = {
      id: t,
      callback: e,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", t), this.stateChangeEmitters.delete(t);
      }
    };
    return this._debug("#onAuthStateChange()", "registered callback with id", t), this.stateChangeEmitters.set(t, s), (async () => (await this.initializePromise, await this._acquireLock(-1, async () => {
      this._emitInitialSession(t);
    })))(), { data: { subscription: s } };
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (t) => {
      var s, i;
      try {
        const { data: { session: n }, error: o } = t;
        if (o)
          throw o;
        await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", n)), this._debug("INITIAL_SESSION", "callback id", e, "session", n);
      } catch (n) {
        await ((i = this.stateChangeEmitters.get(e)) === null || i === void 0 ? void 0 : i.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", n), console.error(n);
      }
    });
  }
  /**
   * Sends a password reset request to an email address. This method supports the PKCE flow.
   *
   * @param email The email address of the user.
   * @param options.redirectTo The URL to send the user to after they click the password reset link.
   * @param options.captchaToken Verification token received when the user completes the captcha on the site.
   */
  async resetPasswordForEmail(e, t = {}) {
    let s = null, i = null;
    this.flowType === "pkce" && ([s, i] = await getCodeChallengeAndMethod(
      this.storage,
      this.storageKey,
      !0
      // isPasswordRecovery
    ));
    try {
      return await _request(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: s,
          code_challenge_method: i,
          gotrue_meta_security: { captcha_token: t.captchaToken }
        },
        headers: this.headers,
        redirectTo: t.redirectTo
      });
    } catch (n) {
      if (isAuthError(n))
        return { data: null, error: n };
      throw n;
    }
  }
  /**
   * Gets all the identities linked to a user.
   */
  async getUserIdentities() {
    var e;
    try {
      const { data: t, error: s } = await this.getUser();
      if (s)
        throw s;
      return { data: { identities: (e = t.user.identities) !== null && e !== void 0 ? e : [] }, error: null };
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Links an oauth identity to an existing user.
   * This method supports the PKCE flow.
   */
  async linkIdentity(e) {
    var t;
    try {
      const { data: s, error: i } = await this._useSession(async (n) => {
        var o, l, c, u, d;
        const { data: f, error: h } = n;
        if (h)
          throw h;
        const _ = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
          redirectTo: (o = e.options) === null || o === void 0 ? void 0 : o.redirectTo,
          scopes: (l = e.options) === null || l === void 0 ? void 0 : l.scopes,
          queryParams: (c = e.options) === null || c === void 0 ? void 0 : c.queryParams,
          skipBrowserRedirect: !0
        });
        return await _request(this.fetch, "GET", _, {
          headers: this.headers,
          jwt: (d = (u = f.session) === null || u === void 0 ? void 0 : u.access_token) !== null && d !== void 0 ? d : void 0
        });
      });
      if (i)
        throw i;
      return isBrowser() && !(!((t = e.options) === null || t === void 0) && t.skipBrowserRedirect) && window.location.assign(s == null ? void 0 : s.url), { data: { provider: e.provider, url: s == null ? void 0 : s.url }, error: null };
    } catch (s) {
      if (isAuthError(s))
        return { data: { provider: e.provider, url: null }, error: s };
      throw s;
    }
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var s, i;
        const { data: n, error: o } = t;
        if (o)
          throw o;
        return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
          headers: this.headers,
          jwt: (i = (s = n.session) === null || s === void 0 ? void 0 : s.access_token) !== null && i !== void 0 ? i : void 0
        });
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Generates a new JWT.
   * @param refreshToken A valid refresh token that was returned on login.
   */
  async _refreshAccessToken(e) {
    const t = `#_refreshAccessToken(${e.substring(0, 5)}...)`;
    this._debug(t, "begin");
    try {
      const s = Date.now();
      return await retryable(async (i) => (i > 0 && await sleep(200 * Math.pow(2, i - 1)), this._debug(t, "refreshing attempt", i), await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
        body: { refresh_token: e },
        headers: this.headers,
        xform: _sessionResponse
      })), (i, n) => {
        const o = 200 * Math.pow(2, i);
        return n && isAuthRetryableFetchError(n) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + o - s < AUTO_REFRESH_TICK_DURATION_MS;
      });
    } catch (s) {
      if (this._debug(t, "error", s), isAuthError(s))
        return { data: { session: null, user: null }, error: s };
      throw s;
    } finally {
      this._debug(t, "end");
    }
  }
  _isValidSession(e) {
    return typeof e == "object" && e !== null && "access_token" in e && "refresh_token" in e && "expires_at" in e;
  }
  async _handleProviderSignIn(e, t) {
    const s = await this._getUrlForProvider(`${this.url}/authorize`, e, {
      redirectTo: t.redirectTo,
      scopes: t.scopes,
      queryParams: t.queryParams
    });
    return this._debug("#_handleProviderSignIn()", "provider", e, "options", t, "url", s), isBrowser() && !t.skipBrowserRedirect && window.location.assign(s), { data: { provider: e, url: s }, error: null };
  }
  /**
   * Recovers the session from LocalStorage and refreshes the token
   * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
   */
  async _recoverAndRefresh() {
    var e;
    const t = "#_recoverAndRefresh()";
    this._debug(t, "begin");
    try {
      const s = await getItemAsync(this.storage, this.storageKey);
      if (this._debug(t, "session from storage", s), !this._isValidSession(s)) {
        this._debug(t, "session is not valid"), s !== null && await this._removeSession();
        return;
      }
      const i = ((e = s.expires_at) !== null && e !== void 0 ? e : 1 / 0) * 1e3 - Date.now() < EXPIRY_MARGIN_MS;
      if (this._debug(t, `session has${i ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`), i) {
        if (this.autoRefreshToken && s.refresh_token) {
          const { error: n } = await this._callRefreshToken(s.refresh_token);
          n && (console.error(n), isAuthRetryableFetchError(n) || (this._debug(t, "refresh failed with a non-retryable error, removing the session", n), await this._removeSession()));
        }
      } else
        await this._notifyAllSubscribers("SIGNED_IN", s);
    } catch (s) {
      this._debug(t, "error", s), console.error(s);
      return;
    } finally {
      this._debug(t, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, s;
    if (!e)
      throw new AuthSessionMissingError();
    if (this.refreshingDeferred)
      return this.refreshingDeferred.promise;
    const i = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(i, "begin");
    try {
      this.refreshingDeferred = new Deferred();
      const { data: n, error: o } = await this._refreshAccessToken(e);
      if (o)
        throw o;
      if (!n.session)
        throw new AuthSessionMissingError();
      await this._saveSession(n.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", n.session);
      const l = { session: n.session, error: null };
      return this.refreshingDeferred.resolve(l), l;
    } catch (n) {
      if (this._debug(i, "error", n), isAuthError(n)) {
        const o = { session: null, error: n };
        return isAuthRetryableFetchError(n) || await this._removeSession(), (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(o), o;
      }
      throw (s = this.refreshingDeferred) === null || s === void 0 || s.reject(n), n;
    } finally {
      this.refreshingDeferred = null, this._debug(i, "end");
    }
  }
  async _notifyAllSubscribers(e, t, s = !0) {
    const i = `#_notifyAllSubscribers(${e})`;
    this._debug(i, "begin", t, `broadcast = ${s}`);
    try {
      this.broadcastChannel && s && this.broadcastChannel.postMessage({ event: e, session: t });
      const n = [], o = Array.from(this.stateChangeEmitters.values()).map(async (l) => {
        try {
          await l.callback(e, t);
        } catch (c) {
          n.push(c);
        }
      });
      if (await Promise.all(o), n.length > 0) {
        for (let l = 0; l < n.length; l += 1)
          console.error(n[l]);
        throw n[0];
      }
    } finally {
      this._debug(i, "end");
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(e) {
    this._debug("#_saveSession()", e), this.suppressGetSessionWarning = !0, await setItemAsync(this.storage, this.storageKey, e);
  }
  async _removeSession() {
    this._debug("#_removeSession()"), await removeItemAsync(this.storage, this.storageKey), await this._notifyAllSubscribers("SIGNED_OUT", null);
  }
  /**
   * Removes any registered visibilitychange callback.
   *
   * {@see #startAutoRefresh}
   * {@see #stopAutoRefresh}
   */
  _removeVisibilityChangedCallback() {
    this._debug("#_removeVisibilityChangedCallback()");
    const e = this.visibilityChangedCallback;
    this.visibilityChangedCallback = null;
    try {
      e && isBrowser() && (window != null && window.removeEventListener) && window.removeEventListener("visibilitychange", e);
    } catch (t) {
      console.error("removing visibilitychange callback failed", t);
    }
  }
  /**
   * This is the private implementation of {@link #startAutoRefresh}. Use this
   * within the library.
   */
  async _startAutoRefresh() {
    await this._stopAutoRefresh(), this._debug("#_startAutoRefresh()");
    const e = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION_MS);
    this.autoRefreshTicker = e, e && typeof e == "object" && typeof e.unref == "function" ? e.unref() : typeof Deno < "u" && typeof Deno.unrefTimer == "function" && Deno.unrefTimer(e), setTimeout(async () => {
      await this.initializePromise, await this._autoRefreshTokenTick();
    }, 0);
  }
  /**
   * This is the private implementation of {@link #stopAutoRefresh}. Use this
   * within the library.
   */
  async _stopAutoRefresh() {
    this._debug("#_stopAutoRefresh()");
    const e = this.autoRefreshTicker;
    this.autoRefreshTicker = null, e && clearInterval(e);
  }
  /**
   * Starts an auto-refresh process in the background. The session is checked
   * every few seconds. Close to the time of expiration a process is started to
   * refresh the session. If refreshing fails it will be retried for as long as
   * necessary.
   *
   * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
   * to call this function, it will be called for you.
   *
   * On browsers the refresh process works only when the tab/window is in the
   * foreground to conserve resources as well as prevent race conditions and
   * flooding auth with requests. If you call this method any managed
   * visibility change callback will be removed and you must manage visibility
   * changes on your own.
   *
   * On non-browser platforms the refresh process works *continuously* in the
   * background, which may not be desirable. You should hook into your
   * platform's foreground indication mechanism and call these methods
   * appropriately to conserve resources.
   *
   * {@see #stopAutoRefresh}
   */
  async startAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._startAutoRefresh();
  }
  /**
   * Stops an active auto refresh process running in the background (if any).
   *
   * If you call this method any managed visibility change callback will be
   * removed and you must manage visibility changes on your own.
   *
   * See {@link #startAutoRefresh} for more details.
   */
  async stopAutoRefresh() {
    this._removeVisibilityChangedCallback(), await this._stopAutoRefresh();
  }
  /**
   * Runs the auto refresh token tick.
   */
  async _autoRefreshTokenTick() {
    this._debug("#_autoRefreshTokenTick()", "begin");
    try {
      await this._acquireLock(0, async () => {
        try {
          const e = Date.now();
          try {
            return await this._useSession(async (t) => {
              const { data: { session: s } } = t;
              if (!s || !s.refresh_token || !s.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const i = Math.floor((s.expires_at * 1e3 - e) / AUTO_REFRESH_TICK_DURATION_MS);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${i} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`), i <= AUTO_REFRESH_TICK_THRESHOLD && await this._callRefreshToken(s.refresh_token);
            });
          } catch (t) {
            console.error("Auto refresh tick failed with error. This is likely a transient error.", t);
          }
        } finally {
          this._debug("#_autoRefreshTokenTick()", "end");
        }
      });
    } catch (e) {
      if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError)
        this._debug("auto refresh token tick lock not available");
      else
        throw e;
    }
  }
  /**
   * Registers callbacks on the browser / platform, which in-turn run
   * algorithms when the browser window/tab are in foreground. On non-browser
   * platforms it assumes always foreground.
   */
  async _handleVisibilityChange() {
    if (this._debug("#_handleVisibilityChange()"), !isBrowser() || !(window != null && window.addEventListener))
      return this.autoRefreshToken && this.startAutoRefresh(), !1;
    try {
      this.visibilityChangedCallback = async () => await this._onVisibilityChanged(!1), window == null || window.addEventListener("visibilitychange", this.visibilityChangedCallback), await this._onVisibilityChanged(!0);
    } catch (e) {
      console.error("_handleVisibilityChange", e);
    }
  }
  /**
   * Callback registered with `window.addEventListener('visibilitychange')`.
   */
  async _onVisibilityChanged(e) {
    const t = `#_onVisibilityChanged(${e})`;
    this._debug(t, "visibilityState", document.visibilityState), document.visibilityState === "visible" ? (this.autoRefreshToken && this._startAutoRefresh(), e || (await this.initializePromise, await this._acquireLock(-1, async () => {
      if (document.visibilityState !== "visible") {
        this._debug(t, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
        return;
      }
      await this._recoverAndRefresh();
    }))) : document.visibilityState === "hidden" && this.autoRefreshToken && this._stopAutoRefresh();
  }
  /**
   * Generates the relevant login URL for a third-party provider.
   * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
   * @param options.scopes A space-separated list of scopes granted to the OAuth application.
   * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
   */
  async _getUrlForProvider(e, t, s) {
    const i = [`provider=${encodeURIComponent(t)}`];
    if (s != null && s.redirectTo && i.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`), s != null && s.scopes && i.push(`scopes=${encodeURIComponent(s.scopes)}`), this.flowType === "pkce") {
      const [n, o] = await getCodeChallengeAndMethod(this.storage, this.storageKey), l = new URLSearchParams({
        code_challenge: `${encodeURIComponent(n)}`,
        code_challenge_method: `${encodeURIComponent(o)}`
      });
      i.push(l.toString());
    }
    if (s != null && s.queryParams) {
      const n = new URLSearchParams(s.queryParams);
      i.push(n.toString());
    }
    return s != null && s.skipBrowserRedirect && i.push(`skip_http_redirect=${s.skipBrowserRedirect}`), `${e}?${i.join("&")}`;
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var s;
        const { data: i, error: n } = t;
        return n ? { data: null, error: n } : await _request(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
          headers: this.headers,
          jwt: (s = i == null ? void 0 : i.session) === null || s === void 0 ? void 0 : s.access_token
        });
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _enroll(e) {
    try {
      return await this._useSession(async (t) => {
        var s, i;
        const { data: n, error: o } = t;
        if (o)
          return { data: null, error: o };
        const l = Object.assign({ friendly_name: e.friendlyName, factor_type: e.factorType }, e.factorType === "phone" ? { phone: e.phone } : { issuer: e.issuer }), { data: c, error: u } = await _request(this.fetch, "POST", `${this.url}/factors`, {
          body: l,
          headers: this.headers,
          jwt: (s = n == null ? void 0 : n.session) === null || s === void 0 ? void 0 : s.access_token
        });
        return u ? { data: null, error: u } : (e.factorType === "totp" && (!((i = c == null ? void 0 : c.totp) === null || i === void 0) && i.qr_code) && (c.totp.qr_code = `data:image/svg+xml;utf-8,${c.totp.qr_code}`), { data: c, error: null });
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * {@see GoTrueMFAApi#verify}
   */
  async _verify(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var s;
          const { data: i, error: n } = t;
          if (n)
            return { data: null, error: n };
          const { data: o, error: l } = await _request(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
            body: { code: e.code, challenge_id: e.challengeId },
            headers: this.headers,
            jwt: (s = i == null ? void 0 : i.session) === null || s === void 0 ? void 0 : s.access_token
          });
          return l ? { data: null, error: l } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + o.expires_in }, o)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", o), { data: o, error: l });
        });
      } catch (t) {
        if (isAuthError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challenge}
   */
  async _challenge(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var s;
          const { data: i, error: n } = t;
          return n ? { data: null, error: n } : await _request(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
            body: { channel: e.channel },
            headers: this.headers,
            jwt: (s = i == null ? void 0 : i.session) === null || s === void 0 ? void 0 : s.access_token
          });
        });
      } catch (t) {
        if (isAuthError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * {@see GoTrueMFAApi#challengeAndVerify}
   */
  async _challengeAndVerify(e) {
    const { data: t, error: s } = await this._challenge({
      factorId: e.factorId
    });
    return s ? { data: null, error: s } : await this._verify({
      factorId: e.factorId,
      challengeId: t.id,
      code: e.code
    });
  }
  /**
   * {@see GoTrueMFAApi#listFactors}
   */
  async _listFactors() {
    const { data: { user: e }, error: t } = await this.getUser();
    if (t)
      return { data: null, error: t };
    const s = (e == null ? void 0 : e.factors) || [], i = s.filter((o) => o.factor_type === "totp" && o.status === "verified"), n = s.filter((o) => o.factor_type === "phone" && o.status === "verified");
    return {
      data: {
        all: s,
        totp: i,
        phone: n
      },
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(-1, async () => await this._useSession(async (e) => {
      var t, s;
      const { data: { session: i }, error: n } = e;
      if (n)
        return { data: null, error: n };
      if (!i)
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null
        };
      const { payload: o } = decodeJWT(i.access_token);
      let l = null;
      o.aal && (l = o.aal);
      let c = l;
      ((s = (t = i.user.factors) === null || t === void 0 ? void 0 : t.filter((f) => f.status === "verified")) !== null && s !== void 0 ? s : []).length > 0 && (c = "aal2");
      const d = o.amr || [];
      return { data: { currentLevel: l, nextLevel: c, currentAuthenticationMethods: d }, error: null };
    }));
  }
  async fetchJwk(e, t = { keys: [] }) {
    let s = t.keys.find((o) => o.kid === e);
    if (s || (s = this.jwks.keys.find((o) => o.kid === e), s && this.jwks_cached_at + JWKS_TTL > Date.now()))
      return s;
    const { data: i, error: n } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (n)
      throw n;
    if (!i.keys || i.keys.length === 0)
      throw new AuthInvalidJwtError("JWKS is empty");
    if (this.jwks = i, this.jwks_cached_at = Date.now(), s = i.keys.find((o) => o.kid === e), !s)
      throw new AuthInvalidJwtError("No matching signing key found in JWKS");
    return s;
  }
  /**
   * @experimental This method may change in future versions.
   * @description Gets the claims from a JWT. If the JWT is symmetric JWTs, it will call getUser() to verify against the server. If the JWT is asymmetric, it will be verified against the JWKS using the WebCrypto API.
   */
  async getClaims(e, t = { keys: [] }) {
    try {
      let s = e;
      if (!s) {
        const { data: _, error: g } = await this.getSession();
        if (g || !_.session)
          return { data: null, error: g };
        s = _.session.access_token;
      }
      const { header: i, payload: n, signature: o, raw: { header: l, payload: c } } = decodeJWT(s);
      if (validateExp(n.exp), !i.kid || i.alg === "HS256" || !("crypto" in globalThis && "subtle" in globalThis.crypto)) {
        const { error: _ } = await this.getUser(s);
        if (_)
          throw _;
        return {
          data: {
            claims: n,
            header: i,
            signature: o
          },
          error: null
        };
      }
      const u = getAlgorithm(i.alg), d = await this.fetchJwk(i.kid, t), f = await crypto.subtle.importKey("jwk", d, u, !0, [
        "verify"
      ]);
      if (!await crypto.subtle.verify(u, f, o, stringToUint8Array(`${l}.${c}`)))
        throw new AuthInvalidJwtError("Invalid JWT signature");
      return {
        data: {
          claims: n,
          header: i,
          signature: o
        },
        error: null
      };
    } catch (s) {
      if (isAuthError(s))
        return { data: null, error: s };
      throw s;
    }
  }
}
GoTrueClient.nextInstanceID = 0;
const AuthClient = GoTrueClient;
class SupabaseAuthClient extends AuthClient {
  constructor(e) {
    super(e);
  }
}
var __awaiter = function(r, e, t, s) {
  function i(n) {
    return n instanceof t ? n : new t(function(o) {
      o(n);
    });
  }
  return new (t || (t = Promise))(function(n, o) {
    function l(d) {
      try {
        u(s.next(d));
      } catch (f) {
        o(f);
      }
    }
    function c(d) {
      try {
        u(s.throw(d));
      } catch (f) {
        o(f);
      }
    }
    function u(d) {
      d.done ? n(d.value) : i(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
};
class SupabaseClient {
  /**
   * Create a new client for use in the browser.
   * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
   * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
   * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
   * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
   * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
   * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
   * @param options.realtime Options passed along to realtime-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(e, t, s) {
    var i, n, o;
    if (this.supabaseUrl = e, this.supabaseKey = t, !e)
      throw new Error("supabaseUrl is required.");
    if (!t)
      throw new Error("supabaseKey is required.");
    const l = stripTrailingSlash(e);
    this.realtimeUrl = `${l}/realtime/v1`.replace(/^http/i, "ws"), this.authUrl = `${l}/auth/v1`, this.storageUrl = `${l}/storage/v1`, this.functionsUrl = `${l}/functions/v1`;
    const c = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`, u = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: c }),
      global: DEFAULT_GLOBAL_OPTIONS
    }, d = applySettingDefaults(s ?? {}, u);
    this.storageKey = (i = d.auth.storageKey) !== null && i !== void 0 ? i : "", this.headers = (n = d.global.headers) !== null && n !== void 0 ? n : {}, d.accessToken ? (this.accessToken = d.accessToken, this.auth = new Proxy({}, {
      get: (f, h) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`);
      }
    })) : this.auth = this._initSupabaseAuthClient((o = d.auth) !== null && o !== void 0 ? o : {}, this.headers, d.global.fetch), this.fetch = fetchWithAuth(t, this._getAccessToken.bind(this), d.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, d.realtime)), this.rest = new PostgrestClient(`${l}/rest/v1`, {
      headers: this.headers,
      schema: d.db.schema,
      fetch: this.fetch
    }), d.accessToken || this._listenForAuthEvents();
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new FunctionsClient(this.functionsUrl, {
      headers: this.headers,
      customFetch: this.fetch
    });
  }
  /**
   * Supabase Storage allows you to manage user-generated content, such as photos or videos.
   */
  get storage() {
    return new StorageClient(this.storageUrl, this.headers, this.fetch);
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(e) {
    return this.rest.from(e);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.schema
  /**
   * Select a schema to query or perform an function (rpc) call.
   *
   * The schema needs to be on the list of exposed schemas inside Supabase.
   *
   * @param schema - The schema to query
   */
  schema(e) {
    return this.rest.schema(e);
  }
  // NOTE: signatures must be kept in sync with PostgrestClient.rpc
  /**
   * Perform a function call.
   *
   * @param fn - The function name to call
   * @param args - The arguments to pass to the function call
   * @param options - Named parameters
   * @param options.head - When set to `true`, `data` will not be returned.
   * Useful if you only need the count.
   * @param options.get - When set to `true`, the function will be called with
   * read-only access mode.
   * @param options.count - Count algorithm to use to count rows returned by the
   * function. Only applicable for [set-returning
   * functions](https://www.postgresql.org/docs/current/functions-srf.html).
   *
   * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
   * hood.
   *
   * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
   * statistics under the hood.
   *
   * `"estimated"`: Uses exact count for low numbers and planned count for high
   * numbers.
   */
  rpc(e, t = {}, s = {}) {
    return this.rest.rpc(e, t, s);
  }
  /**
   * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
   *
   * @param {string} name - The name of the Realtime channel.
   * @param {Object} opts - The options to pass to the Realtime channel.
   *
   */
  channel(e, t = { config: {} }) {
    return this.realtime.channel(e, t);
  }
  /**
   * Returns all Realtime channels.
   */
  getChannels() {
    return this.realtime.getChannels();
  }
  /**
   * Unsubscribes and removes Realtime channel from Realtime client.
   *
   * @param {RealtimeChannel} channel - The name of the Realtime channel.
   *
   */
  removeChannel(e) {
    return this.realtime.removeChannel(e);
  }
  /**
   * Unsubscribes and removes all Realtime channels from Realtime client.
   */
  removeAllChannels() {
    return this.realtime.removeAllChannels();
  }
  _getAccessToken() {
    var e, t;
    return __awaiter(this, void 0, void 0, function* () {
      if (this.accessToken)
        return yield this.accessToken();
      const { data: s } = yield this.auth.getSession();
      return (t = (e = s.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : null;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: s, storage: i, storageKey: n, flowType: o, lock: l, debug: c }, u, d) {
    const f = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, f), u),
      storageKey: n,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: s,
      storage: i,
      flowType: o,
      lock: l,
      debug: c,
      fetch: d,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: "Authorization" in this.headers
    });
  }
  _initRealtimeClient(e) {
    return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((t, s) => {
      this._handleTokenChanged(t, "CLIENT", s == null ? void 0 : s.access_token);
    });
  }
  _handleTokenChanged(e, t, s) {
    (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== s ? this.changedAccessToken = s : e === "SIGNED_OUT" && (this.realtime.setAuth(), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0);
  }
}
const createClient = (r, e, t) => new SupabaseClient(r, e, t), supabase = createClient(
  "https://fnaeijdumseiaoabvvmc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYWVpamR1bXNlaWFvYWJ2dm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0Njc5MDgsImV4cCI6MjA1MzA0MzkwOH0.AKnUpUDBfog2rDv9_jFwTXxNb_R5c9WtK2n0jn18bG4"
);
var root$d = /* @__PURE__ */ template('<h6 class="caption svelte-l7at5k"><!></h6>');
const $$css$d = {
  hash: "svelte-l7at5k",
  code: ".caption.svelte-l7at5k {font-size:12px;font-family:'Monument Regular', sans-serif;text-transform:uppercase;letter-spacing:-0.24px;margin:12px 0;}"
};
function CaptionType(r, e) {
  append_styles(r, $$css$d);
  var t = root$d(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(CaptionType, {}, ["default"], [], !0);
var root$c = /* @__PURE__ */ template('<h2 class="svelte-tzgj7f"><!></h2>');
const $$css$c = {
  hash: "svelte-tzgj7f",
  code: `h2.svelte-tzgj7f {font-size:18px;letter-spacing:-0.34px;text-transform:uppercase;color:#000;font-family:Monument, sans-serif;

		@media screen and (min-width: 1024px) {font-size:22px;
		}}`
};
function TitleType(r, e) {
  append_styles(r, $$css$c);
  var t = root$c(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(TitleType, {}, ["default"], [], !0);
var root$b = /* @__PURE__ */ template('<div class="review svelte-174em9x"><div class="header svelte-174em9x"><h6 class="svelte-174em9x"> </h6> <p class="date svelte-174em9x"> </p></div> <p class="svelte-174em9x"> </p></div>');
const $$css$b = {
  hash: "svelte-174em9x",
  code: `.review.svelte-174em9x {display:flex;flex-direction:column;gap:4px;}p.svelte-174em9x {font-family:Monument Regular;font-size:16px;color:rgba(0, 0, 0, 0.7019607843);letter-spacing:-0.25px;line-height:26px;margin:0;}h6.svelte-174em9x,
.date.svelte-174em9x {font-size:12px;font-family:Monument, sans-serif;color:#000;letter-spacing:-0.18px;text-transform:uppercase;margin:0;}.date.svelte-174em9x {opacity:0.6;}.header.svelte-174em9x {display:flex;align-items:center;gap:8px;justify-content:space-between;}
@media screen and (min-width: 1024px) {.header.svelte-174em9x {padding:24px 0;gap:12px;}
}`
};
function KnitterReviewItem(r, e) {
  push(e, !1), append_styles(r, $$css$b);
  let t = prop(e, "review", 12);
  init();
  var s = root$b(), i = child(s), n = child(i), o = child(n, !0);
  reset(n);
  var l = sibling(n, 2), c = child(l, !0);
  reset(l), reset(i);
  var u = sibling(i, 2), d = child(u, !0);
  return reset(u), reset(s), template_effect(
    (f) => {
      set_text(o, t().created_by), set_text(c, f), set_text(d, t().body);
    },
    [
      () => t().created_at.toLocaleDateString()
    ],
    derived_safe_equal
  ), append(r, s), pop({
    get review() {
      return t();
    },
    set review(f) {
      t(f), flushSync();
    }
  });
}
create_custom_element(KnitterReviewItem, { review: {} }, [], [], !0);
var root$a = /* @__PURE__ */ template('<section class="svelte-1s1jo0"></section>');
const $$css$a = {
  hash: "svelte-1s1jo0",
  code: "section.svelte-1s1jo0 {background:rgba(0, 0, 0, 0.02);width:100%;aspect-ratio:16/9;margin:20px 0;}"
};
function KnitterReviewsListSkeleton(r) {
  append_styles(r, $$css$a);
  var e = root$a();
  append(r, e);
}
create_custom_element(KnitterReviewsListSkeleton, {}, [], [], !0);
const linear = (r) => r;
function cubic_out(r) {
  const e = r - 1;
  return e * e * e + 1;
}
function split_css_unit(r) {
  const e = typeof r == "string" && r.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
  return e ? [parseFloat(e[1]), e[2] || "px"] : [
    /** @type {number} */
    r,
    "px"
  ];
}
function fade(r, { delay: e = 0, duration: t = 400, easing: s = linear } = {}) {
  const i = +getComputedStyle(r).opacity;
  return {
    delay: e,
    duration: t,
    easing: s,
    css: (n) => `opacity: ${n * i}`
  };
}
function fly(r, { delay: e = 0, duration: t = 400, easing: s = cubic_out, x: i = 0, y: n = 0, opacity: o = 0 } = {}) {
  const l = getComputedStyle(r), c = +l.opacity, u = l.transform === "none" ? "" : l.transform, d = c * (1 - o), [f, h] = split_css_unit(i), [_, g] = split_css_unit(n);
  return {
    delay: e,
    duration: t,
    easing: s,
    css: (v, m) => `
			transform: ${u} translate(${(1 - v) * f}${h}, ${(1 - v) * _}${g});
			opacity: ${c - d * m}`
  };
}
function isObject$1(r) {
  return r !== null && typeof r == "object" && "constructor" in r && r.constructor === Object;
}
function extend$1(r, e) {
  r === void 0 && (r = {}), e === void 0 && (e = {});
  const t = ["__proto__", "constructor", "prototype"];
  Object.keys(e).filter((s) => t.indexOf(s) < 0).forEach((s) => {
    typeof r[s] > "u" ? r[s] = e[s] : isObject$1(e[s]) && isObject$1(r[s]) && Object.keys(e[s]).length > 0 && extend$1(r[s], e[s]);
  });
}
const ssrDocument = {
  body: {},
  addEventListener() {
  },
  removeEventListener() {
  },
  activeElement: {
    blur() {
    },
    nodeName: ""
  },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return {
      initEvent() {
      }
    };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {
      },
      getElementsByTagName() {
        return [];
      }
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  }
};
function getDocument() {
  const r = typeof document < "u" ? document : {};
  return extend$1(r, ssrDocument), r;
}
const ssrWindow = {
  document: ssrDocument,
  navigator: {
    userAgent: ""
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: ""
  },
  history: {
    replaceState() {
    },
    pushState() {
    },
    go() {
    },
    back() {
    }
  },
  CustomEvent: function r() {
    return this;
  },
  addEventListener() {
  },
  removeEventListener() {
  },
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      }
    };
  },
  Image() {
  },
  Date() {
  },
  screen: {},
  setTimeout() {
  },
  clearTimeout() {
  },
  matchMedia() {
    return {};
  },
  requestAnimationFrame(r) {
    return typeof setTimeout > "u" ? (r(), null) : setTimeout(r, 0);
  },
  cancelAnimationFrame(r) {
    typeof setTimeout > "u" || clearTimeout(r);
  }
};
function getWindow() {
  const r = typeof window < "u" ? window : {};
  return extend$1(r, ssrWindow), r;
}
function classesToTokens(r) {
  return r === void 0 && (r = ""), r.trim().split(" ").filter((e) => !!e.trim());
}
function deleteProps(r) {
  const e = r;
  Object.keys(e).forEach((t) => {
    try {
      e[t] = null;
    } catch {
    }
    try {
      delete e[t];
    } catch {
    }
  });
}
function nextTick(r, e) {
  return e === void 0 && (e = 0), setTimeout(r, e);
}
function now() {
  return Date.now();
}
function getComputedStyle$1(r) {
  const e = getWindow();
  let t;
  return e.getComputedStyle && (t = e.getComputedStyle(r, null)), !t && r.currentStyle && (t = r.currentStyle), t || (t = r.style), t;
}
function getTranslate(r, e) {
  e === void 0 && (e = "x");
  const t = getWindow();
  let s, i, n;
  const o = getComputedStyle$1(r);
  return t.WebKitCSSMatrix ? (i = o.transform || o.webkitTransform, i.split(",").length > 6 && (i = i.split(", ").map((l) => l.replace(",", ".")).join(", ")), n = new t.WebKitCSSMatrix(i === "none" ? "" : i)) : (n = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = n.toString().split(",")), e === "x" && (t.WebKitCSSMatrix ? i = n.m41 : s.length === 16 ? i = parseFloat(s[12]) : i = parseFloat(s[4])), e === "y" && (t.WebKitCSSMatrix ? i = n.m42 : s.length === 16 ? i = parseFloat(s[13]) : i = parseFloat(s[5])), i || 0;
}
function isObject(r) {
  return typeof r == "object" && r !== null && r.constructor && Object.prototype.toString.call(r).slice(8, -1) === "Object";
}
function isNode(r) {
  return typeof window < "u" && typeof window.HTMLElement < "u" ? r instanceof HTMLElement : r && (r.nodeType === 1 || r.nodeType === 11);
}
function extend() {
  const r = Object(arguments.length <= 0 ? void 0 : arguments[0]), e = ["__proto__", "constructor", "prototype"];
  for (let t = 1; t < arguments.length; t += 1) {
    const s = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (s != null && !isNode(s)) {
      const i = Object.keys(Object(s)).filter((n) => e.indexOf(n) < 0);
      for (let n = 0, o = i.length; n < o; n += 1) {
        const l = i[n], c = Object.getOwnPropertyDescriptor(s, l);
        c !== void 0 && c.enumerable && (isObject(r[l]) && isObject(s[l]) ? s[l].__swiper__ ? r[l] = s[l] : extend(r[l], s[l]) : !isObject(r[l]) && isObject(s[l]) ? (r[l] = {}, s[l].__swiper__ ? r[l] = s[l] : extend(r[l], s[l])) : r[l] = s[l]);
      }
    }
  }
  return r;
}
function setCSSProperty(r, e, t) {
  r.style.setProperty(e, t);
}
function animateCSSModeScroll(r) {
  let {
    swiper: e,
    targetPosition: t,
    side: s
  } = r;
  const i = getWindow(), n = -e.translate;
  let o = null, l;
  const c = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", i.cancelAnimationFrame(e.cssModeFrameID);
  const u = t > n ? "next" : "prev", d = (h, _) => u === "next" && h >= _ || u === "prev" && h <= _, f = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), o === null && (o = l);
    const h = Math.max(Math.min((l - o) / c, 1), 0), _ = 0.5 - Math.cos(h * Math.PI) / 2;
    let g = n + _ * (t - n);
    if (d(g, t) && (g = t), e.wrapperEl.scrollTo({
      [s]: g
    }), d(g, t)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [s]: g
        });
      }), i.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = i.requestAnimationFrame(f);
  };
  f();
}
function elementChildren(r, e) {
  e === void 0 && (e = "");
  const t = getWindow(), s = [...r.children];
  return t.HTMLSlotElement && r instanceof HTMLSlotElement && s.push(...r.assignedElements()), e ? s.filter((i) => i.matches(e)) : s;
}
function elementIsChildOfSlot(r, e) {
  const t = [e];
  for (; t.length > 0; ) {
    const s = t.shift();
    if (r === s)
      return !0;
    t.push(...s.children, ...s.shadowRoot ? s.shadowRoot.children : [], ...s.assignedElements ? s.assignedElements() : []);
  }
}
function elementIsChildOf(r, e) {
  const t = getWindow();
  let s = e.contains(r);
  return !s && t.HTMLSlotElement && e instanceof HTMLSlotElement && (s = [...e.assignedElements()].includes(r), s || (s = elementIsChildOfSlot(r, e))), s;
}
function showWarning(r) {
  try {
    console.warn(r);
    return;
  } catch {
  }
}
function createElement(r, e) {
  e === void 0 && (e = []);
  const t = document.createElement(r);
  return t.classList.add(...Array.isArray(e) ? e : classesToTokens(e)), t;
}
function elementPrevAll(r, e) {
  const t = [];
  for (; r.previousElementSibling; ) {
    const s = r.previousElementSibling;
    e ? s.matches(e) && t.push(s) : t.push(s), r = s;
  }
  return t;
}
function elementNextAll(r, e) {
  const t = [];
  for (; r.nextElementSibling; ) {
    const s = r.nextElementSibling;
    e ? s.matches(e) && t.push(s) : t.push(s), r = s;
  }
  return t;
}
function elementStyle(r, e) {
  return getWindow().getComputedStyle(r, null).getPropertyValue(e);
}
function elementIndex(r) {
  let e = r, t;
  if (e) {
    for (t = 0; (e = e.previousSibling) !== null; )
      e.nodeType === 1 && (t += 1);
    return t;
  }
}
function elementParents(r, e) {
  const t = [];
  let s = r.parentElement;
  for (; s; )
    t.push(s), s = s.parentElement;
  return t;
}
function elementOuterSize(r, e, t) {
  const s = getWindow();
  return r[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(s.getComputedStyle(r, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(s.getComputedStyle(r, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"));
}
let support;
function calcSupport() {
  const r = getWindow(), e = getDocument();
  return {
    smoothScroll: e.documentElement && e.documentElement.style && "scrollBehavior" in e.documentElement.style,
    touch: !!("ontouchstart" in r || r.DocumentTouch && e instanceof r.DocumentTouch)
  };
}
function getSupport() {
  return support || (support = calcSupport()), support;
}
let deviceCached;
function calcDevice(r) {
  let {
    userAgent: e
  } = r === void 0 ? {} : r;
  const t = getSupport(), s = getWindow(), i = s.navigator.platform, n = e || s.navigator.userAgent, o = {
    ios: !1,
    android: !1
  }, l = s.screen.width, c = s.screen.height, u = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = n.match(/(iPad).*OS\s([\d_]+)/);
  const f = n.match(/(iPod)(.*OS\s([\d_]+))?/), h = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), _ = i === "Win32";
  let g = i === "MacIntel";
  const v = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !d && g && t.touch && v.indexOf(`${l}x${c}`) >= 0 && (d = n.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), g = !1), u && !_ && (o.os = "android", o.android = !0), (d || h || f) && (o.os = "ios", o.ios = !0), o;
}
function getDevice(r) {
  return r === void 0 && (r = {}), deviceCached || (deviceCached = calcDevice(r)), deviceCached;
}
let browser$3;
function calcBrowser() {
  const r = getWindow(), e = getDevice();
  let t = !1;
  function s() {
    const l = r.navigator.userAgent.toLowerCase();
    return l.indexOf("safari") >= 0 && l.indexOf("chrome") < 0 && l.indexOf("android") < 0;
  }
  if (s()) {
    const l = String(r.navigator.userAgent);
    if (l.includes("Version/")) {
      const [c, u] = l.split("Version/")[1].split(" ")[0].split(".").map((d) => Number(d));
      t = c < 16 || c === 16 && u < 2;
    }
  }
  const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(r.navigator.userAgent), n = s(), o = n || i && e.ios;
  return {
    isSafari: t || n,
    needPerspectiveFix: t,
    need3dFix: o,
    isWebView: i
  };
}
function getBrowser() {
  return browser$3 || (browser$3 = calcBrowser()), browser$3;
}
function Resize(r) {
  let {
    swiper: e,
    on: t,
    emit: s
  } = r;
  const i = getWindow();
  let n = null, o = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (s("beforeResize"), s("resize"));
  }, c = () => {
    !e || e.destroyed || !e.initialized || (n = new ResizeObserver((f) => {
      o = i.requestAnimationFrame(() => {
        const {
          width: h,
          height: _
        } = e;
        let g = h, v = _;
        f.forEach((m) => {
          let {
            contentBoxSize: y,
            contentRect: E,
            target: w
          } = m;
          w && w !== e.el || (g = E ? E.width : (y[0] || y).inlineSize, v = E ? E.height : (y[0] || y).blockSize);
        }), (g !== h || v !== _) && l();
      });
    }), n.observe(e.el));
  }, u = () => {
    o && i.cancelAnimationFrame(o), n && n.unobserve && e.el && (n.unobserve(e.el), n = null);
  }, d = () => {
    !e || e.destroyed || !e.initialized || s("orientationchange");
  };
  t("init", () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < "u") {
      c();
      return;
    }
    i.addEventListener("resize", l), i.addEventListener("orientationchange", d);
  }), t("destroy", () => {
    u(), i.removeEventListener("resize", l), i.removeEventListener("orientationchange", d);
  });
}
function Observer(r) {
  let {
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  } = r;
  const n = [], o = getWindow(), l = function(d, f) {
    f === void 0 && (f = {});
    const h = o.MutationObserver || o.WebkitMutationObserver, _ = new h((g) => {
      if (e.__preventObserver__) return;
      if (g.length === 1) {
        i("observerUpdate", g[0]);
        return;
      }
      const v = function() {
        i("observerUpdate", g[0]);
      };
      o.requestAnimationFrame ? o.requestAnimationFrame(v) : o.setTimeout(v, 0);
    });
    _.observe(d, {
      attributes: typeof f.attributes > "u" ? !0 : f.attributes,
      childList: e.isElement || (typeof f.childList > "u" ? !0 : f).childList,
      characterData: typeof f.characterData > "u" ? !0 : f.characterData
    }), n.push(_);
  }, c = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const d = elementParents(e.hostEl);
        for (let f = 0; f < d.length; f += 1)
          l(d[f]);
      }
      l(e.hostEl, {
        childList: e.params.observeSlideChildren
      }), l(e.wrapperEl, {
        attributes: !1
      });
    }
  }, u = () => {
    n.forEach((d) => {
      d.disconnect();
    }), n.splice(0, n.length);
  };
  t({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), s("init", c), s("destroy", u);
}
var eventsEmitter = {
  on(r, e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != "function") return s;
    const i = t ? "unshift" : "push";
    return r.split(" ").forEach((n) => {
      s.eventsListeners[n] || (s.eventsListeners[n] = []), s.eventsListeners[n][i](e);
    }), s;
  },
  once(r, e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != "function") return s;
    function i() {
      s.off(r, i), i.__emitterProxy && delete i.__emitterProxy;
      for (var n = arguments.length, o = new Array(n), l = 0; l < n; l++)
        o[l] = arguments[l];
      e.apply(s, o);
    }
    return i.__emitterProxy = e, s.on(r, i, t);
  },
  onAny(r, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof r != "function") return t;
    const s = e ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(r) < 0 && t.eventsAnyListeners[s](r), t;
  },
  offAny(r) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(r);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e;
  },
  off(r, e) {
    const t = this;
    return !t.eventsListeners || t.destroyed || !t.eventsListeners || r.split(" ").forEach((s) => {
      typeof e > "u" ? t.eventsListeners[s] = [] : t.eventsListeners[s] && t.eventsListeners[s].forEach((i, n) => {
        (i === e || i.__emitterProxy && i.__emitterProxy === e) && t.eventsListeners[s].splice(n, 1);
      });
    }), t;
  },
  emit() {
    const r = this;
    if (!r.eventsListeners || r.destroyed || !r.eventsListeners) return r;
    let e, t, s;
    for (var i = arguments.length, n = new Array(i), o = 0; o < i; o++)
      n[o] = arguments[o];
    return typeof n[0] == "string" || Array.isArray(n[0]) ? (e = n[0], t = n.slice(1, n.length), s = r) : (e = n[0].events, t = n[0].data, s = n[0].context || r), t.unshift(s), (Array.isArray(e) ? e : e.split(" ")).forEach((c) => {
      r.eventsAnyListeners && r.eventsAnyListeners.length && r.eventsAnyListeners.forEach((u) => {
        u.apply(s, [c, ...t]);
      }), r.eventsListeners && r.eventsListeners[c] && r.eventsListeners[c].forEach((u) => {
        u.apply(s, t);
      });
    }), r;
  }
};
function updateSize() {
  const r = this;
  let e, t;
  const s = r.el;
  typeof r.params.width < "u" && r.params.width !== null ? e = r.params.width : e = s.clientWidth, typeof r.params.height < "u" && r.params.height !== null ? t = r.params.height : t = s.clientHeight, !(e === 0 && r.isHorizontal() || t === 0 && r.isVertical()) && (e = e - parseInt(elementStyle(s, "padding-left") || 0, 10) - parseInt(elementStyle(s, "padding-right") || 0, 10), t = t - parseInt(elementStyle(s, "padding-top") || 0, 10) - parseInt(elementStyle(s, "padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), Object.assign(r, {
    width: e,
    height: t,
    size: r.isHorizontal() ? e : t
  }));
}
function updateSlides() {
  const r = this;
  function e(S, C) {
    return parseFloat(S.getPropertyValue(r.getDirectionLabel(C)) || 0);
  }
  const t = r.params, {
    wrapperEl: s,
    slidesEl: i,
    size: n,
    rtlTranslate: o,
    wrongRTL: l
  } = r, c = r.virtual && t.virtual.enabled, u = c ? r.virtual.slides.length : r.slides.length, d = elementChildren(i, `.${r.params.slideClass}, swiper-slide`), f = c ? r.virtual.slides.length : d.length;
  let h = [];
  const _ = [], g = [];
  let v = t.slidesOffsetBefore;
  typeof v == "function" && (v = t.slidesOffsetBefore.call(r));
  let m = t.slidesOffsetAfter;
  typeof m == "function" && (m = t.slidesOffsetAfter.call(r));
  const y = r.snapGrid.length, E = r.slidesGrid.length;
  let w = t.spaceBetween, T = -v, b = 0, k = 0;
  if (typeof n > "u")
    return;
  typeof w == "string" && w.indexOf("%") >= 0 ? w = parseFloat(w.replace("%", "")) / 100 * n : typeof w == "string" && (w = parseFloat(w)), r.virtualSize = -w, d.forEach((S) => {
    o ? S.style.marginLeft = "" : S.style.marginRight = "", S.style.marginBottom = "", S.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (setCSSProperty(s, "--swiper-centered-offset-before", ""), setCSSProperty(s, "--swiper-centered-offset-after", ""));
  const A = t.grid && t.grid.rows > 1 && r.grid;
  A ? r.grid.initSlides(d) : r.grid && r.grid.unsetSlides();
  let $;
  const x = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((S) => typeof t.breakpoints[S].slidesPerView < "u").length > 0;
  for (let S = 0; S < f; S += 1) {
    $ = 0;
    let C;
    if (d[S] && (C = d[S]), A && r.grid.updateSlide(S, C, d), !(d[S] && elementStyle(C, "display") === "none")) {
      if (t.slidesPerView === "auto") {
        x && (d[S].style[r.getDirectionLabel("width")] = "");
        const I = getComputedStyle(C), O = C.style.transform, B = C.style.webkitTransform;
        if (O && (C.style.transform = "none"), B && (C.style.webkitTransform = "none"), t.roundLengths)
          $ = r.isHorizontal() ? elementOuterSize(C, "width") : elementOuterSize(C, "height");
        else {
          const j = e(I, "width"), R = e(I, "padding-left"), N = e(I, "padding-right"), L = e(I, "margin-left"), P = e(I, "margin-right"), F = I.getPropertyValue("box-sizing");
          if (F && F === "border-box")
            $ = j + L + P;
          else {
            const {
              clientWidth: V,
              offsetWidth: z
            } = C;
            $ = j + R + N + L + P + (z - V);
          }
        }
        O && (C.style.transform = O), B && (C.style.webkitTransform = B), t.roundLengths && ($ = Math.floor($));
      } else
        $ = (n - (t.slidesPerView - 1) * w) / t.slidesPerView, t.roundLengths && ($ = Math.floor($)), d[S] && (d[S].style[r.getDirectionLabel("width")] = `${$}px`);
      d[S] && (d[S].swiperSlideSize = $), g.push($), t.centeredSlides ? (T = T + $ / 2 + b / 2 + w, b === 0 && S !== 0 && (T = T - n / 2 - w), S === 0 && (T = T - n / 2 - w), Math.abs(T) < 1 / 1e3 && (T = 0), t.roundLengths && (T = Math.floor(T)), k % t.slidesPerGroup === 0 && h.push(T), _.push(T)) : (t.roundLengths && (T = Math.floor(T)), (k - Math.min(r.params.slidesPerGroupSkip, k)) % r.params.slidesPerGroup === 0 && h.push(T), _.push(T), T = T + $ + w), r.virtualSize += $ + w, b = $, k += 1;
    }
  }
  if (r.virtualSize = Math.max(r.virtualSize, n) + m, o && l && (t.effect === "slide" || t.effect === "coverflow") && (s.style.width = `${r.virtualSize + w}px`), t.setWrapperSize && (s.style[r.getDirectionLabel("width")] = `${r.virtualSize + w}px`), A && r.grid.updateWrapperSize($, h), !t.centeredSlides) {
    const S = [];
    for (let C = 0; C < h.length; C += 1) {
      let I = h[C];
      t.roundLengths && (I = Math.floor(I)), h[C] <= r.virtualSize - n && S.push(I);
    }
    h = S, Math.floor(r.virtualSize - n) - Math.floor(h[h.length - 1]) > 1 && h.push(r.virtualSize - n);
  }
  if (c && t.loop) {
    const S = g[0] + w;
    if (t.slidesPerGroup > 1) {
      const C = Math.ceil((r.virtual.slidesBefore + r.virtual.slidesAfter) / t.slidesPerGroup), I = S * t.slidesPerGroup;
      for (let O = 0; O < C; O += 1)
        h.push(h[h.length - 1] + I);
    }
    for (let C = 0; C < r.virtual.slidesBefore + r.virtual.slidesAfter; C += 1)
      t.slidesPerGroup === 1 && h.push(h[h.length - 1] + S), _.push(_[_.length - 1] + S), r.virtualSize += S;
  }
  if (h.length === 0 && (h = [0]), w !== 0) {
    const S = r.isHorizontal() && o ? "marginLeft" : r.getDirectionLabel("marginRight");
    d.filter((C, I) => !t.cssMode || t.loop ? !0 : I !== d.length - 1).forEach((C) => {
      C.style[S] = `${w}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let S = 0;
    g.forEach((I) => {
      S += I + (w || 0);
    }), S -= w;
    const C = S > n ? S - n : 0;
    h = h.map((I) => I <= 0 ? -v : I > C ? C + m : I);
  }
  if (t.centerInsufficientSlides) {
    let S = 0;
    g.forEach((I) => {
      S += I + (w || 0);
    }), S -= w;
    const C = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (S + C < n) {
      const I = (n - S - C) / 2;
      h.forEach((O, B) => {
        h[B] = O - I;
      }), _.forEach((O, B) => {
        _[B] = O + I;
      });
    }
  }
  if (Object.assign(r, {
    slides: d,
    snapGrid: h,
    slidesGrid: _,
    slidesSizesGrid: g
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    setCSSProperty(s, "--swiper-centered-offset-before", `${-h[0]}px`), setCSSProperty(s, "--swiper-centered-offset-after", `${r.size / 2 - g[g.length - 1] / 2}px`);
    const S = -r.snapGrid[0], C = -r.slidesGrid[0];
    r.snapGrid = r.snapGrid.map((I) => I + S), r.slidesGrid = r.slidesGrid.map((I) => I + C);
  }
  if (f !== u && r.emit("slidesLengthChange"), h.length !== y && (r.params.watchOverflow && r.checkOverflow(), r.emit("snapGridLengthChange")), _.length !== E && r.emit("slidesGridLengthChange"), t.watchSlidesProgress && r.updateSlidesOffset(), r.emit("slidesUpdated"), !c && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const S = `${t.containerModifierClass}backface-hidden`, C = r.el.classList.contains(S);
    f <= t.maxBackfaceHiddenSlides ? C || r.el.classList.add(S) : C && r.el.classList.remove(S);
  }
}
function updateAutoHeight(r) {
  const e = this, t = [], s = e.virtual && e.params.virtual.enabled;
  let i = 0, n;
  typeof r == "number" ? e.setTransition(r) : r === !0 && e.setTransition(e.params.speed);
  const o = (l) => s ? e.slides[e.getSlideIndexByData(l)] : e.slides[l];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((l) => {
        t.push(l);
      });
    else
      for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
        const l = e.activeIndex + n;
        if (l > e.slides.length && !s) break;
        t.push(o(l));
      }
  else
    t.push(o(e.activeIndex));
  for (n = 0; n < t.length; n += 1)
    if (typeof t[n] < "u") {
      const l = t[n].offsetHeight;
      i = l > i ? l : i;
    }
  (i || i === 0) && (e.wrapperEl.style.height = `${i}px`);
}
function updateSlidesOffset() {
  const r = this, e = r.slides, t = r.isElement ? r.isHorizontal() ? r.wrapperEl.offsetLeft : r.wrapperEl.offsetTop : 0;
  for (let s = 0; s < e.length; s += 1)
    e[s].swiperSlideOffset = (r.isHorizontal() ? e[s].offsetLeft : e[s].offsetTop) - t - r.cssOverflowAdjustment();
}
const toggleSlideClasses$1 = (r, e, t) => {
  e && !r.classList.contains(t) ? r.classList.add(t) : !e && r.classList.contains(t) && r.classList.remove(t);
};
function updateSlidesProgress(r) {
  r === void 0 && (r = this && this.translate || 0);
  const e = this, t = e.params, {
    slides: s,
    rtlTranslate: i,
    snapGrid: n
  } = e;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let o = -r;
  i && (o = r), e.visibleSlidesIndexes = [], e.visibleSlides = [];
  let l = t.spaceBetween;
  typeof l == "string" && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * e.size : typeof l == "string" && (l = parseFloat(l));
  for (let c = 0; c < s.length; c += 1) {
    const u = s[c];
    let d = u.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (d -= s[0].swiperSlideOffset);
    const f = (o + (t.centeredSlides ? e.minTranslate() : 0) - d) / (u.swiperSlideSize + l), h = (o - n[0] + (t.centeredSlides ? e.minTranslate() : 0) - d) / (u.swiperSlideSize + l), _ = -(o - d), g = _ + e.slidesSizesGrid[c], v = _ >= 0 && _ <= e.size - e.slidesSizesGrid[c], m = _ >= 0 && _ < e.size - 1 || g > 1 && g <= e.size || _ <= 0 && g >= e.size;
    m && (e.visibleSlides.push(u), e.visibleSlidesIndexes.push(c)), toggleSlideClasses$1(u, m, t.slideVisibleClass), toggleSlideClasses$1(u, v, t.slideFullyVisibleClass), u.progress = i ? -f : f, u.originalProgress = i ? -h : h;
  }
}
function updateProgress(r) {
  const e = this;
  if (typeof r > "u") {
    const d = e.rtlTranslate ? -1 : 1;
    r = e && e.translate && e.translate * d || 0;
  }
  const t = e.params, s = e.maxTranslate() - e.minTranslate();
  let {
    progress: i,
    isBeginning: n,
    isEnd: o,
    progressLoop: l
  } = e;
  const c = n, u = o;
  if (s === 0)
    i = 0, n = !0, o = !0;
  else {
    i = (r - e.minTranslate()) / s;
    const d = Math.abs(r - e.minTranslate()) < 1, f = Math.abs(r - e.maxTranslate()) < 1;
    n = d || i <= 0, o = f || i >= 1, d && (i = 0), f && (i = 1);
  }
  if (t.loop) {
    const d = e.getSlideIndexByData(0), f = e.getSlideIndexByData(e.slides.length - 1), h = e.slidesGrid[d], _ = e.slidesGrid[f], g = e.slidesGrid[e.slidesGrid.length - 1], v = Math.abs(r);
    v >= h ? l = (v - h) / g : l = (v + g - _) / g, l > 1 && (l -= 1);
  }
  Object.assign(e, {
    progress: i,
    progressLoop: l,
    isBeginning: n,
    isEnd: o
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(r), n && !c && e.emit("reachBeginning toEdge"), o && !u && e.emit("reachEnd toEdge"), (c && !n || u && !o) && e.emit("fromEdge"), e.emit("progress", i);
}
const toggleSlideClasses = (r, e, t) => {
  e && !r.classList.contains(t) ? r.classList.add(t) : !e && r.classList.contains(t) && r.classList.remove(t);
};
function updateSlidesClasses() {
  const r = this, {
    slides: e,
    params: t,
    slidesEl: s,
    activeIndex: i
  } = r, n = r.virtual && t.virtual.enabled, o = r.grid && t.grid && t.grid.rows > 1, l = (f) => elementChildren(s, `.${t.slideClass}${f}, swiper-slide${f}`)[0];
  let c, u, d;
  if (n)
    if (t.loop) {
      let f = i - r.virtual.slidesBefore;
      f < 0 && (f = r.virtual.slides.length + f), f >= r.virtual.slides.length && (f -= r.virtual.slides.length), c = l(`[data-swiper-slide-index="${f}"]`);
    } else
      c = l(`[data-swiper-slide-index="${i}"]`);
  else
    o ? (c = e.find((f) => f.column === i), d = e.find((f) => f.column === i + 1), u = e.find((f) => f.column === i - 1)) : c = e[i];
  c && (o || (d = elementNextAll(c, `.${t.slideClass}, swiper-slide`)[0], t.loop && !d && (d = e[0]), u = elementPrevAll(c, `.${t.slideClass}, swiper-slide`)[0], t.loop && !u === 0 && (u = e[e.length - 1]))), e.forEach((f) => {
    toggleSlideClasses(f, f === c, t.slideActiveClass), toggleSlideClasses(f, f === d, t.slideNextClass), toggleSlideClasses(f, f === u, t.slidePrevClass);
  }), r.emitSlidesClasses();
}
const processLazyPreloader = (r, e) => {
  if (!r || r.destroyed || !r.params) return;
  const t = () => r.isElement ? "swiper-slide" : `.${r.params.slideClass}`, s = e.closest(t());
  if (s) {
    let i = s.querySelector(`.${r.params.lazyPreloaderClass}`);
    !i && r.isElement && (s.shadowRoot ? i = s.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      s.shadowRoot && (i = s.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`), i && i.remove());
    })), i && i.remove();
  }
}, unlazy = (r, e) => {
  if (!r.slides[e]) return;
  const t = r.slides[e].querySelector('[loading="lazy"]');
  t && t.removeAttribute("loading");
}, preload = (r) => {
  if (!r || r.destroyed || !r.params) return;
  let e = r.params.lazyPreloadPrevNext;
  const t = r.slides.length;
  if (!t || !e || e < 0) return;
  e = Math.min(e, t);
  const s = r.params.slidesPerView === "auto" ? r.slidesPerViewDynamic() : Math.ceil(r.params.slidesPerView), i = r.activeIndex;
  if (r.params.grid && r.params.grid.rows > 1) {
    const o = i, l = [o - e];
    l.push(...Array.from({
      length: e
    }).map((c, u) => o + s + u)), r.slides.forEach((c, u) => {
      l.includes(c.column) && unlazy(r, u);
    });
    return;
  }
  const n = i + s - 1;
  if (r.params.rewind || r.params.loop)
    for (let o = i - e; o <= n + e; o += 1) {
      const l = (o % t + t) % t;
      (l < i || l > n) && unlazy(r, l);
    }
  else
    for (let o = Math.max(i - e, 0); o <= Math.min(n + e, t - 1); o += 1)
      o !== i && (o > n || o < i) && unlazy(r, o);
};
function getActiveIndexByTranslate(r) {
  const {
    slidesGrid: e,
    params: t
  } = r, s = r.rtlTranslate ? r.translate : -r.translate;
  let i;
  for (let n = 0; n < e.length; n += 1)
    typeof e[n + 1] < "u" ? s >= e[n] && s < e[n + 1] - (e[n + 1] - e[n]) / 2 ? i = n : s >= e[n] && s < e[n + 1] && (i = n + 1) : s >= e[n] && (i = n);
  return t.normalizeSlideIndex && (i < 0 || typeof i > "u") && (i = 0), i;
}
function updateActiveIndex(r) {
  const e = this, t = e.rtlTranslate ? e.translate : -e.translate, {
    snapGrid: s,
    params: i,
    activeIndex: n,
    realIndex: o,
    snapIndex: l
  } = e;
  let c = r, u;
  const d = (_) => {
    let g = _ - e.virtual.slidesBefore;
    return g < 0 && (g = e.virtual.slides.length + g), g >= e.virtual.slides.length && (g -= e.virtual.slides.length), g;
  };
  if (typeof c > "u" && (c = getActiveIndexByTranslate(e)), s.indexOf(t) >= 0)
    u = s.indexOf(t);
  else {
    const _ = Math.min(i.slidesPerGroupSkip, c);
    u = _ + Math.floor((c - _) / i.slidesPerGroup);
  }
  if (u >= s.length && (u = s.length - 1), c === n && !e.params.loop) {
    u !== l && (e.snapIndex = u, e.emit("snapIndexChange"));
    return;
  }
  if (c === n && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = d(c);
    return;
  }
  const f = e.grid && i.grid && i.grid.rows > 1;
  let h;
  if (e.virtual && i.virtual.enabled && i.loop)
    h = d(c);
  else if (f) {
    const _ = e.slides.find((v) => v.column === c);
    let g = parseInt(_.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(g) && (g = Math.max(e.slides.indexOf(_), 0)), h = Math.floor(g / i.grid.rows);
  } else if (e.slides[c]) {
    const _ = e.slides[c].getAttribute("data-swiper-slide-index");
    _ ? h = parseInt(_, 10) : h = c;
  } else
    h = c;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: u,
    previousRealIndex: o,
    realIndex: h,
    previousIndex: n,
    activeIndex: c
  }), e.initialized && preload(e), e.emit("activeIndexChange"), e.emit("snapIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && (o !== h && e.emit("realIndexChange"), e.emit("slideChange"));
}
function updateClickedSlide(r, e) {
  const t = this, s = t.params;
  let i = r.closest(`.${s.slideClass}, swiper-slide`);
  !i && t.isElement && e && e.length > 1 && e.includes(r) && [...e.slice(e.indexOf(r) + 1, e.length)].forEach((l) => {
    !i && l.matches && l.matches(`.${s.slideClass}, swiper-slide`) && (i = l);
  });
  let n = !1, o;
  if (i) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === i) {
        n = !0, o = l;
        break;
      }
  }
  if (i && n)
    t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(i.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return;
  }
  s.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
}
var update = {
  updateSize,
  updateSlides,
  updateAutoHeight,
  updateSlidesOffset,
  updateSlidesProgress,
  updateProgress,
  updateSlidesClasses,
  updateActiveIndex,
  updateClickedSlide
};
function getSwiperTranslate(r) {
  r === void 0 && (r = this.isHorizontal() ? "x" : "y");
  const e = this, {
    params: t,
    rtlTranslate: s,
    translate: i,
    wrapperEl: n
  } = e;
  if (t.virtualTranslate)
    return s ? -i : i;
  if (t.cssMode)
    return i;
  let o = getTranslate(n, r);
  return o += e.cssOverflowAdjustment(), s && (o = -o), o || 0;
}
function setTranslate(r, e) {
  const t = this, {
    rtlTranslate: s,
    params: i,
    wrapperEl: n,
    progress: o
  } = t;
  let l = 0, c = 0;
  const u = 0;
  t.isHorizontal() ? l = s ? -r : r : c = r, i.roundLengths && (l = Math.floor(l), c = Math.floor(c)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? l : c, i.cssMode ? n[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -l : -c : i.virtualTranslate || (t.isHorizontal() ? l -= t.cssOverflowAdjustment() : c -= t.cssOverflowAdjustment(), n.style.transform = `translate3d(${l}px, ${c}px, ${u}px)`);
  let d;
  const f = t.maxTranslate() - t.minTranslate();
  f === 0 ? d = 0 : d = (r - t.minTranslate()) / f, d !== o && t.updateProgress(r), t.emit("setTranslate", t.translate, e);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(r, e, t, s, i) {
  r === void 0 && (r = 0), e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), s === void 0 && (s = !0);
  const n = this, {
    params: o,
    wrapperEl: l
  } = n;
  if (n.animating && o.preventInteractionOnTransition)
    return !1;
  const c = n.minTranslate(), u = n.maxTranslate();
  let d;
  if (s && r > c ? d = c : s && r < u ? d = u : d = r, n.updateProgress(d), o.cssMode) {
    const f = n.isHorizontal();
    if (e === 0)
      l[f ? "scrollLeft" : "scrollTop"] = -d;
    else {
      if (!n.support.smoothScroll)
        return animateCSSModeScroll({
          swiper: n,
          targetPosition: -d,
          side: f ? "left" : "top"
        }), !0;
      l.scrollTo({
        [f ? "left" : "top"]: -d,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return e === 0 ? (n.setTransition(0), n.setTranslate(d), t && (n.emit("beforeTransitionStart", e, i), n.emit("transitionEnd"))) : (n.setTransition(e), n.setTranslate(d), t && (n.emit("beforeTransitionStart", e, i), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(h) {
    !n || n.destroyed || h.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, t && n.emit("transitionEnd"));
  }), n.wrapperEl.addEventListener("transitionend", n.onTranslateToWrapperTransitionEnd))), !0;
}
var translate = {
  getTranslate: getSwiperTranslate,
  setTranslate,
  minTranslate,
  maxTranslate,
  translateTo
};
function setTransition(r, e) {
  const t = this;
  t.params.cssMode || (t.wrapperEl.style.transitionDuration = `${r}ms`, t.wrapperEl.style.transitionDelay = r === 0 ? "0ms" : ""), t.emit("setTransition", r, e);
}
function transitionEmit(r) {
  let {
    swiper: e,
    runCallbacks: t,
    direction: s,
    step: i
  } = r;
  const {
    activeIndex: n,
    previousIndex: o
  } = e;
  let l = s;
  if (l || (n > o ? l = "next" : n < o ? l = "prev" : l = "reset"), e.emit(`transition${i}`), t && n !== o) {
    if (l === "reset") {
      e.emit(`slideResetTransition${i}`);
      return;
    }
    e.emit(`slideChangeTransition${i}`), l === "next" ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`);
  }
}
function transitionStart(r, e) {
  r === void 0 && (r = !0);
  const t = this, {
    params: s
  } = t;
  s.cssMode || (s.autoHeight && t.updateAutoHeight(), transitionEmit({
    swiper: t,
    runCallbacks: r,
    direction: e,
    step: "Start"
  }));
}
function transitionEnd(r, e) {
  r === void 0 && (r = !0);
  const t = this, {
    params: s
  } = t;
  t.animating = !1, !s.cssMode && (t.setTransition(0), transitionEmit({
    swiper: t,
    runCallbacks: r,
    direction: e,
    step: "End"
  }));
}
var transition = {
  setTransition,
  transitionStart,
  transitionEnd
};
function slideTo(r, e, t, s, i) {
  r === void 0 && (r = 0), t === void 0 && (t = !0), typeof r == "string" && (r = parseInt(r, 10));
  const n = this;
  let o = r;
  o < 0 && (o = 0);
  const {
    params: l,
    snapGrid: c,
    slidesGrid: u,
    previousIndex: d,
    activeIndex: f,
    rtlTranslate: h,
    wrapperEl: _,
    enabled: g
  } = n;
  if (!g && !s && !i || n.destroyed || n.animating && l.preventInteractionOnTransition)
    return !1;
  typeof e > "u" && (e = n.params.speed);
  const v = Math.min(n.params.slidesPerGroupSkip, o);
  let m = v + Math.floor((o - v) / n.params.slidesPerGroup);
  m >= c.length && (m = c.length - 1);
  const y = -c[m];
  if (l.normalizeSlideIndex)
    for (let A = 0; A < u.length; A += 1) {
      const $ = -Math.floor(y * 100), x = Math.floor(u[A] * 100), S = Math.floor(u[A + 1] * 100);
      typeof u[A + 1] < "u" ? $ >= x && $ < S - (S - x) / 2 ? o = A : $ >= x && $ < S && (o = A + 1) : $ >= x && (o = A);
    }
  if (n.initialized && o !== f && (!n.allowSlideNext && (h ? y > n.translate && y > n.minTranslate() : y < n.translate && y < n.minTranslate()) || !n.allowSlidePrev && y > n.translate && y > n.maxTranslate() && (f || 0) !== o))
    return !1;
  o !== (d || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(y);
  let E;
  o > f ? E = "next" : o < f ? E = "prev" : E = "reset";
  const w = n.virtual && n.params.virtual.enabled;
  if (!(w && i) && (h && -y === n.translate || !h && y === n.translate))
    return n.updateActiveIndex(o), l.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), l.effect !== "slide" && n.setTranslate(y), E !== "reset" && (n.transitionStart(t, E), n.transitionEnd(t, E)), !1;
  if (l.cssMode) {
    const A = n.isHorizontal(), $ = h ? y : -y;
    if (e === 0)
      w && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), w && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        _[A ? "scrollLeft" : "scrollTop"] = $;
      })) : _[A ? "scrollLeft" : "scrollTop"] = $, w && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    else {
      if (!n.support.smoothScroll)
        return animateCSSModeScroll({
          swiper: n,
          targetPosition: $,
          side: A ? "left" : "top"
        }), !0;
      _.scrollTo({
        [A ? "left" : "top"]: $,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const k = getBrowser().isSafari;
  return w && !i && k && n.isElement && n.virtual.update(!1, !1, o), n.setTransition(e), n.setTranslate(y), n.updateActiveIndex(o), n.updateSlidesClasses(), n.emit("beforeTransitionStart", e, s), n.transitionStart(t, E), e === 0 ? n.transitionEnd(t, E) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function($) {
    !n || n.destroyed || $.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(t, E));
  }), n.wrapperEl.addEventListener("transitionend", n.onSlideToWrapperTransitionEnd)), !0;
}
function slideToLoop(r, e, t, s) {
  r === void 0 && (r = 0), t === void 0 && (t = !0), typeof r == "string" && (r = parseInt(r, 10));
  const i = this;
  if (i.destroyed) return;
  typeof e > "u" && (e = i.params.speed);
  const n = i.grid && i.params.grid && i.params.grid.rows > 1;
  let o = r;
  if (i.params.loop)
    if (i.virtual && i.params.virtual.enabled)
      o = o + i.virtual.slidesBefore;
    else {
      let l;
      if (n) {
        const h = o * i.params.grid.rows;
        l = i.slides.find((_) => _.getAttribute("data-swiper-slide-index") * 1 === h).column;
      } else
        l = i.getSlideIndexByData(o);
      const c = n ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length, {
        centeredSlides: u
      } = i.params;
      let d = i.params.slidesPerView;
      d === "auto" ? d = i.slidesPerViewDynamic() : (d = Math.ceil(parseFloat(i.params.slidesPerView, 10)), u && d % 2 === 0 && (d = d + 1));
      let f = c - l < d;
      if (u && (f = f || l < Math.ceil(d / 2)), s && u && i.params.slidesPerView !== "auto" && !n && (f = !1), f) {
        const h = u ? l < i.activeIndex ? "prev" : "next" : l - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev";
        i.loopFix({
          direction: h,
          slideTo: !0,
          activeSlideIndex: h === "next" ? l + 1 : l - c + 1,
          slideRealIndex: h === "next" ? i.realIndex : void 0
        });
      }
      if (n) {
        const h = o * i.params.grid.rows;
        o = i.slides.find((_) => _.getAttribute("data-swiper-slide-index") * 1 === h).column;
      } else
        o = i.getSlideIndexByData(o);
    }
  return requestAnimationFrame(() => {
    i.slideTo(o, e, t, s);
  }), i;
}
function slideNext(r, e, t) {
  e === void 0 && (e = !0);
  const s = this, {
    enabled: i,
    params: n,
    animating: o
  } = s;
  if (!i || s.destroyed) return s;
  typeof r > "u" && (r = s.params.speed);
  let l = n.slidesPerGroup;
  n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (l = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const c = s.activeIndex < n.slidesPerGroupSkip ? 1 : l, u = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (o && !u && n.loopPreventsSliding) return !1;
    if (s.loopFix({
      direction: "next"
    }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && n.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + c, r, e, t);
      }), !0;
  }
  return n.rewind && s.isEnd ? s.slideTo(0, r, e, t) : s.slideTo(s.activeIndex + c, r, e, t);
}
function slidePrev(r, e, t) {
  e === void 0 && (e = !0);
  const s = this, {
    params: i,
    snapGrid: n,
    slidesGrid: o,
    rtlTranslate: l,
    enabled: c,
    animating: u
  } = s;
  if (!c || s.destroyed) return s;
  typeof r > "u" && (r = s.params.speed);
  const d = s.virtual && i.virtual.enabled;
  if (i.loop) {
    if (u && !d && i.loopPreventsSliding) return !1;
    s.loopFix({
      direction: "prev"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const f = l ? s.translate : -s.translate;
  function h(E) {
    return E < 0 ? -Math.floor(Math.abs(E)) : Math.floor(E);
  }
  const _ = h(f), g = n.map((E) => h(E)), v = i.freeMode && i.freeMode.enabled;
  let m = n[g.indexOf(_) - 1];
  if (typeof m > "u" && (i.cssMode || v)) {
    let E;
    n.forEach((w, T) => {
      _ >= w && (E = T);
    }), typeof E < "u" && (m = v ? n[E] : n[E > 0 ? E - 1 : E]);
  }
  let y = 0;
  if (typeof m < "u" && (y = o.indexOf(m), y < 0 && (y = s.activeIndex - 1), i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (y = y - s.slidesPerViewDynamic("previous", !0) + 1, y = Math.max(y, 0))), i.rewind && s.isBeginning) {
    const E = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(E, r, e, t);
  } else if (i.loop && s.activeIndex === 0 && i.cssMode)
    return requestAnimationFrame(() => {
      s.slideTo(y, r, e, t);
    }), !0;
  return s.slideTo(y, r, e, t);
}
function slideReset(r, e, t) {
  e === void 0 && (e = !0);
  const s = this;
  if (!s.destroyed)
    return typeof r > "u" && (r = s.params.speed), s.slideTo(s.activeIndex, r, e, t);
}
function slideToClosest(r, e, t, s) {
  e === void 0 && (e = !0), s === void 0 && (s = 0.5);
  const i = this;
  if (i.destroyed) return;
  typeof r > "u" && (r = i.params.speed);
  let n = i.activeIndex;
  const o = Math.min(i.params.slidesPerGroupSkip, n), l = o + Math.floor((n - o) / i.params.slidesPerGroup), c = i.rtlTranslate ? i.translate : -i.translate;
  if (c >= i.snapGrid[l]) {
    const u = i.snapGrid[l], d = i.snapGrid[l + 1];
    c - u > (d - u) * s && (n += i.params.slidesPerGroup);
  } else {
    const u = i.snapGrid[l - 1], d = i.snapGrid[l];
    c - u <= (d - u) * s && (n -= i.params.slidesPerGroup);
  }
  return n = Math.max(n, 0), n = Math.min(n, i.slidesGrid.length - 1), i.slideTo(n, r, e, t);
}
function slideToClickedSlide() {
  const r = this;
  if (r.destroyed) return;
  const {
    params: e,
    slidesEl: t
  } = r, s = e.slidesPerView === "auto" ? r.slidesPerViewDynamic() : e.slidesPerView;
  let i = r.clickedIndex, n;
  const o = r.isElement ? "swiper-slide" : `.${e.slideClass}`;
  if (e.loop) {
    if (r.animating) return;
    n = parseInt(r.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? i < r.loopedSlides - s / 2 || i > r.slides.length - r.loopedSlides + s / 2 ? (r.loopFix(), i = r.getSlideIndex(elementChildren(t, `${o}[data-swiper-slide-index="${n}"]`)[0]), nextTick(() => {
      r.slideTo(i);
    })) : r.slideTo(i) : i > r.slides.length - s ? (r.loopFix(), i = r.getSlideIndex(elementChildren(t, `${o}[data-swiper-slide-index="${n}"]`)[0]), nextTick(() => {
      r.slideTo(i);
    })) : r.slideTo(i);
  } else
    r.slideTo(i);
}
var slide = {
  slideTo,
  slideToLoop,
  slideNext,
  slidePrev,
  slideReset,
  slideToClosest,
  slideToClickedSlide
};
function loopCreate(r, e) {
  const t = this, {
    params: s,
    slidesEl: i
  } = t;
  if (!s.loop || t.virtual && t.params.virtual.enabled) return;
  const n = () => {
    elementChildren(i, `.${s.slideClass}, swiper-slide`).forEach((h, _) => {
      h.setAttribute("data-swiper-slide-index", _);
    });
  }, o = t.grid && s.grid && s.grid.rows > 1, l = s.slidesPerGroup * (o ? s.grid.rows : 1), c = t.slides.length % l !== 0, u = o && t.slides.length % s.grid.rows !== 0, d = (f) => {
    for (let h = 0; h < f; h += 1) {
      const _ = t.isElement ? createElement("swiper-slide", [s.slideBlankClass]) : createElement("div", [s.slideClass, s.slideBlankClass]);
      t.slidesEl.append(_);
    }
  };
  if (c) {
    if (s.loopAddBlankSlides) {
      const f = l - t.slides.length % l;
      d(f), t.recalcSlides(), t.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else if (u) {
    if (s.loopAddBlankSlides) {
      const f = s.grid.rows - t.slides.length % s.grid.rows;
      d(f), t.recalcSlides(), t.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else
    n();
  t.loopFix({
    slideRealIndex: r,
    direction: s.centeredSlides ? void 0 : "next",
    initial: e
  });
}
function loopFix(r) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: s,
    setTranslate: i,
    activeSlideIndex: n,
    initial: o,
    byController: l,
    byMousewheel: c
  } = r === void 0 ? {} : r;
  const u = this;
  if (!u.params.loop) return;
  u.emit("beforeLoopFix");
  const {
    slides: d,
    allowSlidePrev: f,
    allowSlideNext: h,
    slidesEl: _,
    params: g
  } = u, {
    centeredSlides: v,
    initialSlide: m
  } = g;
  if (u.allowSlidePrev = !0, u.allowSlideNext = !0, u.virtual && g.virtual.enabled) {
    t && (!g.centeredSlides && u.snapIndex === 0 ? u.slideTo(u.virtual.slides.length, 0, !1, !0) : g.centeredSlides && u.snapIndex < g.slidesPerView ? u.slideTo(u.virtual.slides.length + u.snapIndex, 0, !1, !0) : u.snapIndex === u.snapGrid.length - 1 && u.slideTo(u.virtual.slidesBefore, 0, !1, !0)), u.allowSlidePrev = f, u.allowSlideNext = h, u.emit("loopFix");
    return;
  }
  let y = g.slidesPerView;
  y === "auto" ? y = u.slidesPerViewDynamic() : (y = Math.ceil(parseFloat(g.slidesPerView, 10)), v && y % 2 === 0 && (y = y + 1));
  const E = g.slidesPerGroupAuto ? y : g.slidesPerGroup;
  let w = E;
  w % E !== 0 && (w += E - w % E), w += g.loopAdditionalSlides, u.loopedSlides = w;
  const T = u.grid && g.grid && g.grid.rows > 1;
  d.length < y + w || u.params.effect === "cards" && d.length < y + w * 2 ? showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : T && g.grid.fill === "row" && showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const b = [], k = [], A = T ? Math.ceil(d.length / g.grid.rows) : d.length, $ = o && A - m < y && !v;
  let x = $ ? m : u.activeIndex;
  typeof n > "u" ? n = u.getSlideIndex(d.find((R) => R.classList.contains(g.slideActiveClass))) : x = n;
  const S = s === "next" || !s, C = s === "prev" || !s;
  let I = 0, O = 0;
  const j = (T ? d[n].column : n) + (v && typeof i > "u" ? -y / 2 + 0.5 : 0);
  if (j < w) {
    I = Math.max(w - j, E);
    for (let R = 0; R < w - j; R += 1) {
      const N = R - Math.floor(R / A) * A;
      if (T) {
        const L = A - N - 1;
        for (let P = d.length - 1; P >= 0; P -= 1)
          d[P].column === L && b.push(P);
      } else
        b.push(A - N - 1);
    }
  } else if (j + y > A - w) {
    O = Math.max(j - (A - w * 2), E), $ && (O = Math.max(O, y - A + m + 1));
    for (let R = 0; R < O; R += 1) {
      const N = R - Math.floor(R / A) * A;
      T ? d.forEach((L, P) => {
        L.column === N && k.push(P);
      }) : k.push(N);
    }
  }
  if (u.__preventObserver__ = !0, requestAnimationFrame(() => {
    u.__preventObserver__ = !1;
  }), u.params.effect === "cards" && d.length < y + w * 2 && (k.includes(n) && k.splice(k.indexOf(n), 1), b.includes(n) && b.splice(b.indexOf(n), 1)), C && b.forEach((R) => {
    d[R].swiperLoopMoveDOM = !0, _.prepend(d[R]), d[R].swiperLoopMoveDOM = !1;
  }), S && k.forEach((R) => {
    d[R].swiperLoopMoveDOM = !0, _.append(d[R]), d[R].swiperLoopMoveDOM = !1;
  }), u.recalcSlides(), g.slidesPerView === "auto" ? u.updateSlides() : T && (b.length > 0 && C || k.length > 0 && S) && u.slides.forEach((R, N) => {
    u.grid.updateSlide(N, R, u.slides);
  }), g.watchSlidesProgress && u.updateSlidesOffset(), t) {
    if (b.length > 0 && C) {
      if (typeof e > "u") {
        const R = u.slidesGrid[x], L = u.slidesGrid[x + I] - R;
        c ? u.setTranslate(u.translate - L) : (u.slideTo(x + Math.ceil(I), 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - L, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - L));
      } else if (i) {
        const R = T ? b.length / g.grid.rows : b.length;
        u.slideTo(u.activeIndex + R, 0, !1, !0), u.touchEventsData.currentTranslate = u.translate;
      }
    } else if (k.length > 0 && S)
      if (typeof e > "u") {
        const R = u.slidesGrid[x], L = u.slidesGrid[x - O] - R;
        c ? u.setTranslate(u.translate - L) : (u.slideTo(x - O, 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - L, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - L));
      } else {
        const R = T ? k.length / g.grid.rows : k.length;
        u.slideTo(u.activeIndex - R, 0, !1, !0);
      }
  }
  if (u.allowSlidePrev = f, u.allowSlideNext = h, u.controller && u.controller.control && !l) {
    const R = {
      slideRealIndex: e,
      direction: s,
      setTranslate: i,
      activeSlideIndex: n,
      byController: !0
    };
    Array.isArray(u.controller.control) ? u.controller.control.forEach((N) => {
      !N.destroyed && N.params.loop && N.loopFix({
        ...R,
        slideTo: N.params.slidesPerView === g.slidesPerView ? t : !1
      });
    }) : u.controller.control instanceof u.constructor && u.controller.control.params.loop && u.controller.control.loopFix({
      ...R,
      slideTo: u.controller.control.params.slidesPerView === g.slidesPerView ? t : !1
    });
  }
  u.emit("loopFix");
}
function loopDestroy() {
  const r = this, {
    params: e,
    slidesEl: t
  } = r;
  if (!e.loop || !t || r.virtual && r.params.virtual.enabled) return;
  r.recalcSlides();
  const s = [];
  r.slides.forEach((i) => {
    const n = typeof i.swiperSlideIndex > "u" ? i.getAttribute("data-swiper-slide-index") * 1 : i.swiperSlideIndex;
    s[n] = i;
  }), r.slides.forEach((i) => {
    i.removeAttribute("data-swiper-slide-index");
  }), s.forEach((i) => {
    t.append(i);
  }), r.recalcSlides(), r.slideTo(r.realIndex, 0);
}
var loop = {
  loopCreate,
  loopFix,
  loopDestroy
};
function setGrabCursor(r) {
  const e = this;
  if (!e.params.simulateTouch || e.params.watchOverflow && e.isLocked || e.params.cssMode) return;
  const t = e.params.touchEventsTarget === "container" ? e.el : e.wrapperEl;
  e.isElement && (e.__preventObserver__ = !0), t.style.cursor = "move", t.style.cursor = r ? "grabbing" : "grab", e.isElement && requestAnimationFrame(() => {
    e.__preventObserver__ = !1;
  });
}
function unsetGrabCursor() {
  const r = this;
  r.params.watchOverflow && r.isLocked || r.params.cssMode || (r.isElement && (r.__preventObserver__ = !0), r[r.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "", r.isElement && requestAnimationFrame(() => {
    r.__preventObserver__ = !1;
  }));
}
var grabCursor = {
  setGrabCursor,
  unsetGrabCursor
};
function closestElement(r, e) {
  e === void 0 && (e = this);
  function t(s) {
    if (!s || s === getDocument() || s === getWindow()) return null;
    s.assignedSlot && (s = s.assignedSlot);
    const i = s.closest(r);
    return !i && !s.getRootNode ? null : i || t(s.getRootNode().host);
  }
  return t(e);
}
function preventEdgeSwipe(r, e, t) {
  const s = getWindow(), {
    params: i
  } = r, n = i.edgeSwipeDetection, o = i.edgeSwipeThreshold;
  return n && (t <= o || t >= s.innerWidth - o) ? n === "prevent" ? (e.preventDefault(), !0) : !1 : !0;
}
function onTouchStart(r) {
  const e = this, t = getDocument();
  let s = r;
  s.originalEvent && (s = s.originalEvent);
  const i = e.touchEventsData;
  if (s.type === "pointerdown") {
    if (i.pointerId !== null && i.pointerId !== s.pointerId)
      return;
    i.pointerId = s.pointerId;
  } else s.type === "touchstart" && s.targetTouches.length === 1 && (i.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    preventEdgeSwipe(e, s, s.targetTouches[0].pageX);
    return;
  }
  const {
    params: n,
    touches: o,
    enabled: l
  } = e;
  if (!l || !n.simulateTouch && s.pointerType === "mouse" || e.animating && n.preventInteractionOnTransition)
    return;
  !e.animating && n.cssMode && n.loop && e.loopFix();
  let c = s.target;
  if (n.touchEventsTarget === "wrapper" && !elementIsChildOf(c, e.wrapperEl) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || i.isTouched && i.isMoved) return;
  const u = !!n.noSwipingClass && n.noSwipingClass !== "", d = s.composedPath ? s.composedPath() : s.path;
  u && s.target && s.target.shadowRoot && d && (c = d[0]);
  const f = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, h = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (h ? closestElement(f, c) : c.closest(f))) {
    e.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !c.closest(n.swipeHandler))
    return;
  o.currentX = s.pageX, o.currentY = s.pageY;
  const _ = o.currentX, g = o.currentY;
  if (!preventEdgeSwipe(e, s, _))
    return;
  Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), o.startX = _, o.startY = g, i.touchStartTime = now(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, n.threshold > 0 && (i.allowThresholdMove = !1);
  let v = !0;
  c.matches(i.focusableElements) && (v = !1, c.nodeName === "SELECT" && (i.isTouched = !1)), t.activeElement && t.activeElement.matches(i.focusableElements) && t.activeElement !== c && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !c.matches(i.focusableElements)) && t.activeElement.blur();
  const m = v && e.allowTouchMove && n.touchStartPreventDefault;
  (n.touchStartForcePreventDefault || m) && !c.isContentEditable && s.preventDefault(), n.freeMode && n.freeMode.enabled && e.freeMode && e.animating && !n.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", s);
}
function onTouchMove(r) {
  const e = getDocument(), t = this, s = t.touchEventsData, {
    params: i,
    touches: n,
    rtlTranslate: o,
    enabled: l
  } = t;
  if (!l || !i.simulateTouch && r.pointerType === "mouse") return;
  let c = r;
  if (c.originalEvent && (c = c.originalEvent), c.type === "pointermove" && (s.touchId !== null || c.pointerId !== s.pointerId))
    return;
  let u;
  if (c.type === "touchmove") {
    if (u = [...c.changedTouches].find((b) => b.identifier === s.touchId), !u || u.identifier !== s.touchId) return;
  } else
    u = c;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && t.emit("touchMoveOpposite", c);
    return;
  }
  const d = u.pageX, f = u.pageY;
  if (c.preventedByNestedSwiper) {
    n.startX = d, n.startY = f;
    return;
  }
  if (!t.allowTouchMove) {
    c.target.matches(s.focusableElements) || (t.allowClick = !1), s.isTouched && (Object.assign(n, {
      startX: d,
      startY: f,
      currentX: d,
      currentY: f
    }), s.touchStartTime = now());
    return;
  }
  if (i.touchReleaseOnEdges && !i.loop)
    if (t.isVertical()) {
      if (f < n.startY && t.translate <= t.maxTranslate() || f > n.startY && t.translate >= t.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else {
      if (o && (d > n.startX && -t.translate <= t.maxTranslate() || d < n.startX && -t.translate >= t.minTranslate()))
        return;
      if (!o && (d < n.startX && t.translate <= t.maxTranslate() || d > n.startX && t.translate >= t.minTranslate()))
        return;
    }
  if (e.activeElement && e.activeElement.matches(s.focusableElements) && e.activeElement !== c.target && c.pointerType !== "mouse" && e.activeElement.blur(), e.activeElement && c.target === e.activeElement && c.target.matches(s.focusableElements)) {
    s.isMoved = !0, t.allowClick = !1;
    return;
  }
  s.allowTouchCallbacks && t.emit("touchMove", c), n.previousX = n.currentX, n.previousY = n.currentY, n.currentX = d, n.currentY = f;
  const h = n.currentX - n.startX, _ = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(h ** 2 + _ ** 2) < t.params.threshold) return;
  if (typeof s.isScrolling > "u") {
    let b;
    t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : h * h + _ * _ >= 25 && (b = Math.atan2(Math.abs(_), Math.abs(h)) * 180 / Math.PI, s.isScrolling = t.isHorizontal() ? b > i.touchAngle : 90 - b > i.touchAngle);
  }
  if (s.isScrolling && t.emit("touchMoveOpposite", c), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling || c.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  t.allowClick = !1, !i.cssMode && c.cancelable && c.preventDefault(), i.touchMoveStopPropagation && !i.nested && c.stopPropagation();
  let g = t.isHorizontal() ? h : _, v = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  i.oneWayMovement && (g = Math.abs(g) * (o ? 1 : -1), v = Math.abs(v) * (o ? 1 : -1)), n.diff = g, g *= i.touchRatio, o && (g = -g, v = -v);
  const m = t.touchesDirection;
  t.swipeDirection = g > 0 ? "prev" : "next", t.touchesDirection = v > 0 ? "prev" : "next";
  const y = t.params.loop && !i.cssMode, E = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!s.isMoved) {
    if (y && E && t.loopFix({
      direction: t.swipeDirection
    }), s.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const b = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(b);
    }
    s.allowMomentumBounce = !1, i.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", c);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), i._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && m !== t.touchesDirection && y && E && Math.abs(g) >= 1) {
    Object.assign(n, {
      startX: d,
      startY: f,
      currentX: d,
      currentY: f,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  t.emit("sliderMove", c), s.isMoved = !0, s.currentTranslate = g + s.startTranslate;
  let w = !0, T = i.resistanceRatio;
  if (i.touchReleaseOnEdges && (T = 0), g > 0 ? (y && E && s.allowThresholdMove && s.currentTranslate > (i.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > t.minTranslate() && (w = !1, i.resistance && (s.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + s.startTranslate + g) ** T))) : g < 0 && (y && E && s.allowThresholdMove && s.currentTranslate < (i.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (i.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(i.slidesPerView, 10)))
  }), s.currentTranslate < t.maxTranslate() && (w = !1, i.resistance && (s.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - s.startTranslate - g) ** T))), w && (c.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (s.currentTranslate = s.startTranslate), i.threshold > 0)
    if (Math.abs(g) > i.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, s.currentTranslate = s.startTranslate, n.diff = t.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY;
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !i.followFinger || i.cssMode || ((i.freeMode && i.freeMode.enabled && t.freeMode || i.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), i.freeMode && i.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(s.currentTranslate), t.setTranslate(s.currentTranslate));
}
function onTouchEnd(r) {
  const e = this, t = e.touchEventsData;
  let s = r;
  s.originalEvent && (s = s.originalEvent);
  let i;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (i = [...s.changedTouches].find((b) => b.identifier === t.touchId), !i || i.identifier !== t.touchId) return;
  } else {
    if (t.touchId !== null || s.pointerId !== t.pointerId) return;
    i = s;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(s.type) && !(["pointercancel", "contextmenu"].includes(s.type) && (e.browser.isSafari || e.browser.isWebView)))
    return;
  t.pointerId = null, t.touchId = null;
  const {
    params: o,
    touches: l,
    rtlTranslate: c,
    slidesGrid: u,
    enabled: d
  } = e;
  if (!d || !o.simulateTouch && s.pointerType === "mouse") return;
  if (t.allowTouchCallbacks && e.emit("touchEnd", s), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && o.grabCursor && e.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return;
  }
  o.grabCursor && t.isMoved && t.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
  const f = now(), h = f - t.touchStartTime;
  if (e.allowClick) {
    const b = s.path || s.composedPath && s.composedPath();
    e.updateClickedSlide(b && b[0] || s.target, b), e.emit("tap click", s), h < 300 && f - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", s);
  }
  if (t.lastClickTime = now(), nextTick(() => {
    e.destroyed || (e.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !e.swipeDirection || l.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let _;
  if (o.followFinger ? _ = c ? e.translate : -e.translate : _ = -t.currentTranslate, o.cssMode)
    return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: _
    });
    return;
  }
  const g = _ >= -e.maxTranslate() && !e.params.loop;
  let v = 0, m = e.slidesSizesGrid[0];
  for (let b = 0; b < u.length; b += b < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    const k = b < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof u[b + k] < "u" ? (g || _ >= u[b] && _ < u[b + k]) && (v = b, m = u[b + k] - u[b]) : (g || _ >= u[b]) && (v = b, m = u[u.length - 1] - u[u.length - 2]);
  }
  let y = null, E = null;
  o.rewind && (e.isBeginning ? E = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (y = 0));
  const w = (_ - u[v]) / m, T = v < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (h > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" && (w >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? y : v + T) : e.slideTo(v)), e.swipeDirection === "prev" && (w > 1 - o.longSwipesRatio ? e.slideTo(v + T) : E !== null && w < 0 && Math.abs(w) > o.longSwipesRatio ? e.slideTo(E) : e.slideTo(v));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation && (s.target === e.navigation.nextEl || s.target === e.navigation.prevEl) ? s.target === e.navigation.nextEl ? e.slideTo(v + T) : e.slideTo(v) : (e.swipeDirection === "next" && e.slideTo(y !== null ? y : v + T), e.swipeDirection === "prev" && e.slideTo(E !== null ? E : v));
  }
}
function onResize() {
  const r = this, {
    params: e,
    el: t
  } = r;
  if (t && t.offsetWidth === 0) return;
  e.breakpoints && r.setBreakpoint();
  const {
    allowSlideNext: s,
    allowSlidePrev: i,
    snapGrid: n
  } = r, o = r.virtual && r.params.virtual.enabled;
  r.allowSlideNext = !0, r.allowSlidePrev = !0, r.updateSize(), r.updateSlides(), r.updateSlidesClasses();
  const l = o && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) && r.isEnd && !r.isBeginning && !r.params.centeredSlides && !l ? r.slideTo(r.slides.length - 1, 0, !1, !0) : r.params.loop && !o ? r.slideToLoop(r.realIndex, 0, !1, !0) : r.slideTo(r.activeIndex, 0, !1, !0), r.autoplay && r.autoplay.running && r.autoplay.paused && (clearTimeout(r.autoplay.resizeTimeout), r.autoplay.resizeTimeout = setTimeout(() => {
    r.autoplay && r.autoplay.running && r.autoplay.paused && r.autoplay.resume();
  }, 500)), r.allowSlidePrev = i, r.allowSlideNext = s, r.params.watchOverflow && n !== r.snapGrid && r.checkOverflow();
}
function onClick(r) {
  const e = this;
  e.enabled && (e.allowClick || (e.params.preventClicks && r.preventDefault(), e.params.preventClicksPropagation && e.animating && (r.stopPropagation(), r.stopImmediatePropagation())));
}
function onScroll() {
  const r = this, {
    wrapperEl: e,
    rtlTranslate: t,
    enabled: s
  } = r;
  if (!s) return;
  r.previousTranslate = r.translate, r.isHorizontal() ? r.translate = -e.scrollLeft : r.translate = -e.scrollTop, r.translate === 0 && (r.translate = 0), r.updateActiveIndex(), r.updateSlidesClasses();
  let i;
  const n = r.maxTranslate() - r.minTranslate();
  n === 0 ? i = 0 : i = (r.translate - r.minTranslate()) / n, i !== r.progress && r.updateProgress(t ? -r.translate : r.translate), r.emit("setTranslate", r.translate, !1);
}
function onLoad(r) {
  const e = this;
  processLazyPreloader(e, r.target), !(e.params.cssMode || e.params.slidesPerView !== "auto" && !e.params.autoHeight) && e.update();
}
function onDocumentTouchStart() {
  const r = this;
  r.documentTouchHandlerProceeded || (r.documentTouchHandlerProceeded = !0, r.params.touchReleaseOnEdges && (r.el.style.touchAction = "auto"));
}
const events = (r, e) => {
  const t = getDocument(), {
    params: s,
    el: i,
    wrapperEl: n,
    device: o
  } = r, l = !!s.nested, c = e === "on" ? "addEventListener" : "removeEventListener", u = e;
  !i || typeof i == "string" || (t[c]("touchstart", r.onDocumentTouchStart, {
    passive: !1,
    capture: l
  }), i[c]("touchstart", r.onTouchStart, {
    passive: !1
  }), i[c]("pointerdown", r.onTouchStart, {
    passive: !1
  }), t[c]("touchmove", r.onTouchMove, {
    passive: !1,
    capture: l
  }), t[c]("pointermove", r.onTouchMove, {
    passive: !1,
    capture: l
  }), t[c]("touchend", r.onTouchEnd, {
    passive: !0
  }), t[c]("pointerup", r.onTouchEnd, {
    passive: !0
  }), t[c]("pointercancel", r.onTouchEnd, {
    passive: !0
  }), t[c]("touchcancel", r.onTouchEnd, {
    passive: !0
  }), t[c]("pointerout", r.onTouchEnd, {
    passive: !0
  }), t[c]("pointerleave", r.onTouchEnd, {
    passive: !0
  }), t[c]("contextmenu", r.onTouchEnd, {
    passive: !0
  }), (s.preventClicks || s.preventClicksPropagation) && i[c]("click", r.onClick, !0), s.cssMode && n[c]("scroll", r.onScroll), s.updateOnWindowResize ? r[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, !0) : r[u]("observerUpdate", onResize, !0), i[c]("load", r.onLoad, {
    capture: !0
  }));
};
function attachEvents() {
  const r = this, {
    params: e
  } = r;
  r.onTouchStart = onTouchStart.bind(r), r.onTouchMove = onTouchMove.bind(r), r.onTouchEnd = onTouchEnd.bind(r), r.onDocumentTouchStart = onDocumentTouchStart.bind(r), e.cssMode && (r.onScroll = onScroll.bind(r)), r.onClick = onClick.bind(r), r.onLoad = onLoad.bind(r), events(r, "on");
}
function detachEvents() {
  events(this, "off");
}
var events$1 = {
  attachEvents,
  detachEvents
};
const isGridEnabled = (r, e) => r.grid && e.grid && e.grid.rows > 1;
function setBreakpoint() {
  const r = this, {
    realIndex: e,
    initialized: t,
    params: s,
    el: i
  } = r, n = s.breakpoints;
  if (!n || n && Object.keys(n).length === 0) return;
  const o = getDocument(), l = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container", c = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? r.el : o.querySelector(s.breakpointsBase), u = r.getBreakpoint(n, l, c);
  if (!u || r.currentBreakpoint === u) return;
  const f = (u in n ? n[u] : void 0) || r.originalParams, h = isGridEnabled(r, s), _ = isGridEnabled(r, f), g = r.params.grabCursor, v = f.grabCursor, m = s.enabled;
  h && !_ ? (i.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), r.emitContainerClasses()) : !h && _ && (i.classList.add(`${s.containerModifierClass}grid`), (f.grid.fill && f.grid.fill === "column" || !f.grid.fill && s.grid.fill === "column") && i.classList.add(`${s.containerModifierClass}grid-column`), r.emitContainerClasses()), g && !v ? r.unsetGrabCursor() : !g && v && r.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((k) => {
    if (typeof f[k] > "u") return;
    const A = s[k] && s[k].enabled, $ = f[k] && f[k].enabled;
    A && !$ && r[k].disable(), !A && $ && r[k].enable();
  });
  const y = f.direction && f.direction !== s.direction, E = s.loop && (f.slidesPerView !== s.slidesPerView || y), w = s.loop;
  y && t && r.changeDirection(), extend(r.params, f);
  const T = r.params.enabled, b = r.params.loop;
  Object.assign(r, {
    allowTouchMove: r.params.allowTouchMove,
    allowSlideNext: r.params.allowSlideNext,
    allowSlidePrev: r.params.allowSlidePrev
  }), m && !T ? r.disable() : !m && T && r.enable(), r.currentBreakpoint = u, r.emit("_beforeBreakpoint", f), t && (E ? (r.loopDestroy(), r.loopCreate(e), r.updateSlides()) : !w && b ? (r.loopCreate(e), r.updateSlides()) : w && !b && r.loopDestroy()), r.emit("breakpoint", f);
}
function getBreakpoint(r, e, t) {
  if (e === void 0 && (e = "window"), !r || e === "container" && !t) return;
  let s = !1;
  const i = getWindow(), n = e === "window" ? i.innerHeight : t.clientHeight, o = Object.keys(r).map((l) => {
    if (typeof l == "string" && l.indexOf("@") === 0) {
      const c = parseFloat(l.substr(1));
      return {
        value: n * c,
        point: l
      };
    }
    return {
      value: l,
      point: l
    };
  });
  o.sort((l, c) => parseInt(l.value, 10) - parseInt(c.value, 10));
  for (let l = 0; l < o.length; l += 1) {
    const {
      point: c,
      value: u
    } = o[l];
    e === "window" ? i.matchMedia(`(min-width: ${u}px)`).matches && (s = c) : u <= t.clientWidth && (s = c);
  }
  return s || "max";
}
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(r, e) {
  const t = [];
  return r.forEach((s) => {
    typeof s == "object" ? Object.keys(s).forEach((i) => {
      s[i] && t.push(e + i);
    }) : typeof s == "string" && t.push(e + s);
  }), t;
}
function addClasses() {
  const r = this, {
    classNames: e,
    params: t,
    rtl: s,
    el: i,
    device: n
  } = r, o = prepareClasses(["initialized", t.direction, {
    "free-mode": r.params.freeMode && t.freeMode.enabled
  }, {
    autoheight: t.autoHeight
  }, {
    rtl: s
  }, {
    grid: t.grid && t.grid.rows > 1
  }, {
    "grid-column": t.grid && t.grid.rows > 1 && t.grid.fill === "column"
  }, {
    android: n.android
  }, {
    ios: n.ios
  }, {
    "css-mode": t.cssMode
  }, {
    centered: t.cssMode && t.centeredSlides
  }, {
    "watch-progress": t.watchSlidesProgress
  }], t.containerModifierClass);
  e.push(...o), i.classList.add(...e), r.emitContainerClasses();
}
function removeClasses() {
  const r = this, {
    el: e,
    classNames: t
  } = r;
  !e || typeof e == "string" || (e.classList.remove(...t), r.emitContainerClasses());
}
var classes = {
  addClasses,
  removeClasses
};
function checkOverflow() {
  const r = this, {
    isLocked: e,
    params: t
  } = r, {
    slidesOffsetBefore: s
  } = t;
  if (s) {
    const i = r.slides.length - 1, n = r.slidesGrid[i] + r.slidesSizesGrid[i] + s * 2;
    r.isLocked = r.size > n;
  } else
    r.isLocked = r.snapGrid.length === 1;
  t.allowSlideNext === !0 && (r.allowSlideNext = !r.isLocked), t.allowSlidePrev === !0 && (r.allowSlidePrev = !r.isLocked), e && e !== r.isLocked && (r.isEnd = !1), e !== r.isLocked && r.emit(r.isLocked ? "lock" : "unlock");
}
var checkOverflow$1 = {
  checkOverflow
}, defaults = {
  init: !0,
  direction: "horizontal",
  oneWayMovement: !1,
  swiperElementNodeName: "SWIPER-CONTAINER",
  touchEventsTarget: "wrapper",
  initialSlide: 0,
  speed: 300,
  cssMode: !1,
  updateOnWindowResize: !0,
  resizeObserver: !0,
  nested: !1,
  createElements: !1,
  eventsPrefix: "swiper",
  enabled: !0,
  focusableElements: "input, select, option, textarea, button, video, label",
  // Overrides
  width: null,
  height: null,
  //
  preventInteractionOnTransition: !1,
  // ssr
  userAgent: null,
  url: null,
  // To support iOS's swipe-to-go-back gesture (when being used in-app).
  edgeSwipeDetection: !1,
  edgeSwipeThreshold: 20,
  // Autoheight
  autoHeight: !1,
  // Set wrapper width
  setWrapperSize: !1,
  // Virtual Translate
  virtualTranslate: !1,
  // Effects
  effect: "slide",
  // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
  // Breakpoints
  breakpoints: void 0,
  breakpointsBase: "window",
  // Slides grid
  spaceBetween: 0,
  slidesPerView: 1,
  slidesPerGroup: 1,
  slidesPerGroupSkip: 0,
  slidesPerGroupAuto: !1,
  centeredSlides: !1,
  centeredSlidesBounds: !1,
  slidesOffsetBefore: 0,
  // in px
  slidesOffsetAfter: 0,
  // in px
  normalizeSlideIndex: !0,
  centerInsufficientSlides: !1,
  // Disable swiper and hide navigation when container not overflow
  watchOverflow: !0,
  // Round length
  roundLengths: !1,
  // Touches
  touchRatio: 1,
  touchAngle: 45,
  simulateTouch: !0,
  shortSwipes: !0,
  longSwipes: !0,
  longSwipesRatio: 0.5,
  longSwipesMs: 300,
  followFinger: !0,
  allowTouchMove: !0,
  threshold: 5,
  touchMoveStopPropagation: !1,
  touchStartPreventDefault: !0,
  touchStartForcePreventDefault: !1,
  touchReleaseOnEdges: !1,
  // Unique Navigation Elements
  uniqueNavElements: !0,
  // Resistance
  resistance: !0,
  resistanceRatio: 0.85,
  // Progress
  watchSlidesProgress: !1,
  // Cursor
  grabCursor: !1,
  // Clicks
  preventClicks: !0,
  preventClicksPropagation: !0,
  slideToClickedSlide: !1,
  // loop
  loop: !1,
  loopAddBlankSlides: !0,
  loopAdditionalSlides: 0,
  loopPreventsSliding: !0,
  // rewind
  rewind: !1,
  // Swiping/no swiping
  allowSlidePrev: !0,
  allowSlideNext: !0,
  swipeHandler: null,
  // '.swipe-handler',
  noSwiping: !0,
  noSwipingClass: "swiper-no-swiping",
  noSwipingSelector: null,
  // Passive Listeners
  passiveListeners: !0,
  maxBackfaceHiddenSlides: 10,
  // NS
  containerModifierClass: "swiper-",
  // NEW
  slideClass: "swiper-slide",
  slideBlankClass: "swiper-slide-blank",
  slideActiveClass: "swiper-slide-active",
  slideVisibleClass: "swiper-slide-visible",
  slideFullyVisibleClass: "swiper-slide-fully-visible",
  slideNextClass: "swiper-slide-next",
  slidePrevClass: "swiper-slide-prev",
  wrapperClass: "swiper-wrapper",
  lazyPreloaderClass: "swiper-lazy-preloader",
  lazyPreloadPrevNext: 0,
  // Callbacks
  runCallbacksOnInit: !0,
  // Internals
  _emitClasses: !1
};
function moduleExtendParams(r, e) {
  return function(s) {
    s === void 0 && (s = {});
    const i = Object.keys(s)[0], n = s[i];
    if (typeof n != "object" || n === null) {
      extend(e, s);
      return;
    }
    if (r[i] === !0 && (r[i] = {
      enabled: !0
    }), i === "navigation" && r[i] && r[i].enabled && !r[i].prevEl && !r[i].nextEl && (r[i].auto = !0), ["pagination", "scrollbar"].indexOf(i) >= 0 && r[i] && r[i].enabled && !r[i].el && (r[i].auto = !0), !(i in r && "enabled" in n)) {
      extend(e, s);
      return;
    }
    typeof r[i] == "object" && !("enabled" in r[i]) && (r[i].enabled = !0), r[i] || (r[i] = {
      enabled: !1
    }), extend(e, s);
  };
}
const prototypes = {
  eventsEmitter,
  update,
  translate,
  transition,
  slide,
  loop,
  grabCursor,
  events: events$1,
  breakpoints,
  checkOverflow: checkOverflow$1,
  classes
}, extendedDefaults = {};
class Swiper {
  constructor() {
    let e, t;
    for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
      i[n] = arguments[n];
    i.length === 1 && i[0].constructor && Object.prototype.toString.call(i[0]).slice(8, -1) === "Object" ? t = i[0] : [e, t] = i, t || (t = {}), t = extend({}, t), e && !t.el && (t.el = e);
    const o = getDocument();
    if (t.el && typeof t.el == "string" && o.querySelectorAll(t.el).length > 1) {
      const d = [];
      return o.querySelectorAll(t.el).forEach((f) => {
        const h = extend({}, t, {
          el: f
        });
        d.push(new Swiper(h));
      }), d;
    }
    const l = this;
    l.__swiper__ = !0, l.support = getSupport(), l.device = getDevice({
      userAgent: t.userAgent
    }), l.browser = getBrowser(), l.eventsListeners = {}, l.eventsAnyListeners = [], l.modules = [...l.__modules__], t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
    const c = {};
    l.modules.forEach((d) => {
      d({
        params: t,
        swiper: l,
        extendParams: moduleExtendParams(t, c),
        on: l.on.bind(l),
        once: l.once.bind(l),
        off: l.off.bind(l),
        emit: l.emit.bind(l)
      });
    });
    const u = extend({}, defaults, c);
    return l.params = extend({}, u, extendedDefaults, t), l.originalParams = extend({}, l.params), l.passedParams = extend({}, t), l.params && l.params.on && Object.keys(l.params.on).forEach((d) => {
      l.on(d, l.params.on[d]);
    }), l.params && l.params.onAny && l.onAny(l.params.onAny), Object.assign(l, {
      enabled: l.params.enabled,
      el: e,
      // Classes
      classNames: [],
      // Slides
      slides: [],
      slidesGrid: [],
      snapGrid: [],
      slidesSizesGrid: [],
      // isDirection
      isHorizontal() {
        return l.params.direction === "horizontal";
      },
      isVertical() {
        return l.params.direction === "vertical";
      },
      // Indexes
      activeIndex: 0,
      realIndex: 0,
      //
      isBeginning: !0,
      isEnd: !1,
      // Props
      translate: 0,
      previousTranslate: 0,
      progress: 0,
      velocity: 0,
      animating: !1,
      cssOverflowAdjustment() {
        return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
      },
      // Locks
      allowSlideNext: l.params.allowSlideNext,
      allowSlidePrev: l.params.allowSlidePrev,
      // Touch Events
      touchEventsData: {
        isTouched: void 0,
        isMoved: void 0,
        allowTouchCallbacks: void 0,
        touchStartTime: void 0,
        isScrolling: void 0,
        currentTranslate: void 0,
        startTranslate: void 0,
        allowThresholdMove: void 0,
        // Form elements to match
        focusableElements: l.params.focusableElements,
        // Last click time
        lastClickTime: 0,
        clickTimeout: void 0,
        // Velocities
        velocities: [],
        allowMomentumBounce: void 0,
        startMoving: void 0,
        pointerId: null,
        touchId: null
      },
      // Clicks
      allowClick: !0,
      // Touches
      allowTouchMove: l.params.allowTouchMove,
      touches: {
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        diff: 0
      },
      // Images
      imagesToLoad: [],
      imagesLoaded: 0
    }), l.emit("_swiper"), l.params.init && l.init(), l;
  }
  getDirectionLabel(e) {
    return this.isHorizontal() ? e : {
      width: "height",
      "margin-top": "margin-left",
      "margin-bottom ": "margin-right",
      "margin-left": "margin-top",
      "margin-right": "margin-bottom",
      "padding-left": "padding-top",
      "padding-right": "padding-bottom",
      marginRight: "marginBottom"
    }[e];
  }
  getSlideIndex(e) {
    const {
      slidesEl: t,
      params: s
    } = this, i = elementChildren(t, `.${s.slideClass}, swiper-slide`), n = elementIndex(i[0]);
    return elementIndex(e) - n;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === e));
  }
  recalcSlides() {
    const e = this, {
      slidesEl: t,
      params: s
    } = e;
    e.slides = elementChildren(t, `.${s.slideClass}, swiper-slide`);
  }
  enable() {
    const e = this;
    e.enabled || (e.enabled = !0, e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
  }
  disable() {
    const e = this;
    e.enabled && (e.enabled = !1, e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
  }
  setProgress(e, t) {
    const s = this;
    e = Math.min(Math.max(e, 0), 1);
    const i = s.minTranslate(), o = (s.maxTranslate() - i) * e + i;
    s.translateTo(o, typeof t > "u" ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className.split(" ").filter((s) => s.indexOf("swiper") === 0 || s.indexOf(e.params.containerModifierClass) === 0);
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed ? "" : e.className.split(" ").filter((s) => s.indexOf("swiper-slide") === 0 || s.indexOf(t.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach((s) => {
      const i = e.getSlideClasses(s);
      t.push({
        slideEl: s,
        classNames: i
      }), e.emit("_slideClass", s, i);
    }), e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = "current"), t === void 0 && (t = !1);
    const s = this, {
      params: i,
      slides: n,
      slidesGrid: o,
      slidesSizesGrid: l,
      size: c,
      activeIndex: u
    } = s;
    let d = 1;
    if (typeof i.slidesPerView == "number") return i.slidesPerView;
    if (i.centeredSlides) {
      let f = n[u] ? Math.ceil(n[u].swiperSlideSize) : 0, h;
      for (let _ = u + 1; _ < n.length; _ += 1)
        n[_] && !h && (f += Math.ceil(n[_].swiperSlideSize), d += 1, f > c && (h = !0));
      for (let _ = u - 1; _ >= 0; _ -= 1)
        n[_] && !h && (f += n[_].swiperSlideSize, d += 1, f > c && (h = !0));
    } else if (e === "current")
      for (let f = u + 1; f < n.length; f += 1)
        (t ? o[f] + l[f] - o[u] < c : o[f] - o[u] < c) && (d += 1);
    else
      for (let f = u - 1; f >= 0; f -= 1)
        o[u] - o[f] < c && (d += 1);
    return d;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const {
      snapGrid: t,
      params: s
    } = e;
    s.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
      o.complete && processLazyPreloader(e, o);
    }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();
    function i() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate, l = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let n;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      i(), s.autoHeight && e.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
        const o = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        n = e.slideTo(o.length - 1, 0, !1, !0);
      } else
        n = e.slideTo(e.activeIndex, 0, !1, !0);
      n || i();
    }
    s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const s = this, i = s.params.direction;
    return e || (e = i === "horizontal" ? "vertical" : "horizontal"), e === i || e !== "horizontal" && e !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach((n) => {
      e === "vertical" ? n.style.width = "" : n.style.height = "";
    }), s.emit("changeDirection"), t && s.update()), s;
  }
  changeLanguageDirection(e) {
    const t = this;
    t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let s = e || t.params.el;
    if (typeof s == "string" && (s = document.querySelector(s)), !s)
      return !1;
    s.swiper = t, s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
    const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let o = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(i()) : elementChildren(s, i())[0];
    return !o && t.params.createElements && (o = createElement("div", t.params.wrapperClass), s.append(o), elementChildren(s, `.${t.params.slideClass}`).forEach((l) => {
      o.append(l);
    })), Object.assign(t, {
      el: s,
      wrapperEl: o,
      slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : o,
      hostEl: t.isElement ? s.parentNode.host : s,
      mounted: !0,
      // RTL
      rtl: s.dir.toLowerCase() === "rtl" || elementStyle(s, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (s.dir.toLowerCase() === "rtl" || elementStyle(s, "direction") === "rtl"),
      wrongRTL: elementStyle(o, "display") === "-webkit-box"
    }), !0;
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1) return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(void 0, !0), t.attachEvents();
    const i = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && i.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), i.forEach((n) => {
      n.complete ? processLazyPreloader(t, n) : n.addEventListener("load", (o) => {
        processLazyPreloader(t, o.target);
      });
    }), preload(t), t.initialized = !0, preload(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const s = this, {
      params: i,
      el: n,
      wrapperEl: o,
      slides: l
    } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), i.loop && s.loopDestroy(), t && (s.removeClasses(), n && typeof n != "string" && n.removeAttribute("style"), o && o.removeAttribute("style"), l && l.length && l.forEach((c) => {
      c.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass), c.removeAttribute("style"), c.removeAttribute("data-swiper-slide-index");
    })), s.emit("destroy"), Object.keys(s.eventsListeners).forEach((c) => {
      s.off(c);
    }), e !== !1 && (s.el && typeof s.el != "string" && (s.el.swiper = null), deleteProps(s)), s.destroyed = !0), null;
  }
  static extendDefaults(e) {
    extend(extendedDefaults, e);
  }
  static get extendedDefaults() {
    return extendedDefaults;
  }
  static get defaults() {
    return defaults;
  }
  static installModule(e) {
    Swiper.prototype.__modules__ || (Swiper.prototype.__modules__ = []);
    const t = Swiper.prototype.__modules__;
    typeof e == "function" && t.indexOf(e) < 0 && t.push(e);
  }
  static use(e) {
    return Array.isArray(e) ? (e.forEach((t) => Swiper.installModule(t)), Swiper) : (Swiper.installModule(e), Swiper);
  }
}
Object.keys(prototypes).forEach((r) => {
  Object.keys(prototypes[r]).forEach((e) => {
    Swiper.prototype[e] = prototypes[r][e];
  });
});
Swiper.use([Resize, Observer]);
var root_4 = /* @__PURE__ */ template('<p class="svelte-t4awvj">No messages yet. Be first one to leave a feedback.</p>'), root_6$1 = /* @__PURE__ */ template('<figure class="svelte-t4awvj"><!></figure>'), root_5 = /* @__PURE__ */ template('<section class="svelte-t4awvj"></section>'), root$9 = /* @__PURE__ */ template("<!> <!>", 1);
const $$css$9 = {
  hash: "svelte-t4awvj",
  code: `figure.svelte-t4awvj {border-bottom:1px solid black;margin:12px 0;padding:0 0 12px 0;}
@media screen and (min-width: 1024px) {figure.svelte-t4awvj {margin:24px 0;padding:0 0 24px 0;}
}section.svelte-t4awvj {margin-bottom:40px;}
@media screen and (min-width: 1024px) {section.svelte-t4awvj {margin-bottom:60px;}
}p.svelte-t4awvj {font-family:Monument Regular, sans-serif;opacity:0.5;margin-bottom:32px;}`
};
function KnitterReviewsList(r, e) {
  push(e, !1), append_styles(r, $$css$9);
  let t = prop(e, "id", 12, void 0), s = prop(e, "isFetchBlock", 12, !1), i = /* @__PURE__ */ mutable_source([]), n = /* @__PURE__ */ mutable_source(!1), o = /* @__PURE__ */ mutable_source(!1);
  const l = async () => {
    if (!t()) return console.error("No id provided");
    const { data: _, error: g } = await supabase.from("knitter_reviews").select("*").order("created_at", { ascending: !1 }).eq("knitter_id", t());
    _ && (set(i, _.map((v) => ({ ...v, created_at: new Date(v.created_at) }))), setTimeout(() => set(n, !0)), set(o, !0));
  };
  legacy_pre_effect(
    () => (deep_read_state(s()), get$2(o)),
    () => {
      !s() && !get$2(o) && l();
    }
  ), legacy_pre_effect_reset(), init();
  var c = root$9(), u = first_child(c);
  TitleType(u, {
    children: (_, g) => {
      next();
      var v = text("Customers feedback");
      append(_, v);
    },
    $$slots: { default: !0 }
  });
  var d = sibling(u, 2);
  {
    var f = (_) => {
      KnitterReviewsListSkeleton(_);
    }, h = (_, g) => {
      {
        var v = (y) => {
          var E = root_4();
          append(y, E);
        }, m = (y) => {
          var E = root_5();
          each(E, 5, () => get$2(i), index, (w, T) => {
            var b = root_6$1(), k = child(b);
            KnitterReviewItem(k, {
              get review() {
                return get$2(T);
              }
            }), reset(b), append(w, b);
          }), reset(E), transition$1(3, E, () => fade), append(y, E);
        };
        if_block(
          _,
          (y) => {
            get$2(i).length === 0 ? y(v) : y(m, !1);
          },
          g
        );
      }
    };
    if_block(d, (_) => {
      get$2(n) ? _(h, !1) : _(f);
    });
  }
  return append(r, c), pop({
    get id() {
      return t();
    },
    set id(_) {
      t(_), flushSync();
    },
    get isFetchBlock() {
      return s();
    },
    set isFetchBlock(_) {
      s(_), flushSync();
    }
  });
}
create_custom_element(KnitterReviewsList, { id: {}, isFetchBlock: {} }, [], [], !0);
var root$8 = /* @__PURE__ */ template("<button><!></button>");
const $$css$8 = {
  hash: "svelte-ph9rtg",
  code: "button.svelte-ph9rtg {width:178px;height:52px;background:#018849;cursor:pointer;border:none;color:#fff;font-family:Monument, sans-serif;font-size:16px;letter-spacing:-0.25px;text-transform:uppercase;display:flex;align-items:center;word-break:keep-all;white-space:nowrap;justify-content:center;}.w-full.svelte-ph9rtg {width:100%;}.disabled.svelte-ph9rtg {opacity:0.5;cursor:default;}"
};
function Button(r, e) {
  push(e, !1), append_styles(r, $$css$8);
  let t = prop(e, "fullWidth", 12, !1), s = prop(e, "disabled", 12, !1), i = prop(e, "type", 12, "button");
  var n = root$8();
  let o;
  var l = child(n);
  return slot(l, e, "default", {}), reset(n), template_effect(
    (c) => {
      set_attribute(n, "type", i()), n.disabled = s(), o = set_class(n, 1, "svelte-ph9rtg", null, o, c);
    },
    [
      () => ({
        "w-full": t(),
        disabled: s()
      })
    ],
    derived_safe_equal
  ), append(r, n), pop({
    get fullWidth() {
      return t();
    },
    set fullWidth(c) {
      t(c), flushSync();
    },
    get disabled() {
      return s();
    },
    set disabled(c) {
      s(c), flushSync();
    },
    get type() {
      return i();
    },
    set type(c) {
      i(c), flushSync();
    }
  });
}
create_custom_element(Button, { fullWidth: {}, disabled: {}, type: {} }, ["default"], [], !0);
var root_3$1 = /* @__PURE__ */ template('<p class="error svelte-xo5t5q">There was an error submitting your message. Please try again later.</p>'), root_2$1 = /* @__PURE__ */ template('<form action="" class="svelte-xo5t5q"><textarea name="" id="" cols="30" rows="10 " placeholder="Enter your feedback here..." class="svelte-xo5t5q"></textarea> <div class="cta svelte-xo5t5q"><input type="text" placeholder="Enter your name..." class="svelte-xo5t5q"> <!> <!></div></form>'), root_6 = /* @__PURE__ */ template('<p class="success svelte-xo5t5q">Review submitted successfully!</p>'), root$7 = /* @__PURE__ */ template("<!> <!>", 1);
const $$css$7 = {
  hash: "svelte-xo5t5q",
  code: `input.svelte-xo5t5q {border:none;padding:6px 16px;border-bottom:1px solid black;width:100%;font-size:16px;margin:12px 0;box-sizing:border-box;background:transparent;color:black;}input.svelte-xo5t5q:focus {outline:none;}p.svelte-xo5t5q {font-family:"Monument Regular", sans-serif;padding:8px 16px;}p.success.svelte-xo5t5q {background:#b0beb2;}p.error.svelte-xo5t5q {background:#f6a3a3;}textarea.svelte-xo5t5q {width:100%;aspect-ratio:4/1;border:1px solid black;box-sizing:border-box;resize:none;background:transparent;padding:12px 16px;font-family:"Monument Regular", sans-serif;font-size:16px;color:black;}textarea.svelte-xo5t5q:focus {outline:none;}
@media screen and (min-width: 1024px) {textarea.svelte-xo5t5q {aspect-ratio:8/1;font-size:16px;}
}form.svelte-xo5t5q {display:flex;flex-direction:column;align-items:flex-end;gap:12px;}.cta.svelte-xo5t5q {width:100%;gap:12px;display:grid;grid-template-columns:1fr;grid-template-rows:auto auto;}`
};
function KnitterReviewForm(r, e) {
  push(e, !1), append_styles(r, $$css$7);
  let t = prop(e, "id", 12, void 0), s = /* @__PURE__ */ mutable_source(""), i = /* @__PURE__ */ mutable_source(""), n = /* @__PURE__ */ mutable_source("idle");
  const o = createEventDispatcher(), l = async () => {
    const { error: _ } = await supabase.from("knitter_reviews").insert([
      {
        knitter_id: t(),
        body: get$2(i),
        created_by: get$2(s)
      }
    ]);
    _ ? set(n, "error") : set(n, "success"), setTimeout(() => o("submit"));
  };
  init();
  var c = root$7(), u = first_child(c);
  TitleType(u, {
    children: (_, g) => {
      next();
      var v = text("Leave a feedback");
      append(_, v);
    },
    $$slots: { default: !0 }
  });
  var d = sibling(u, 2);
  {
    var f = (_) => {
      var g = root_2$1(), v = child(g);
      remove_textarea_child(v);
      var m = sibling(v, 2), y = child(m);
      remove_input_defaults(y);
      var E = sibling(y, 2);
      {
        var w = (k) => {
          var A = root_3$1();
          append(k, A);
        };
        if_block(E, (k) => {
          get$2(n) === "error" && k(w);
        });
      }
      var T = sibling(E, 2);
      const b = /* @__PURE__ */ derived_safe_equal(() => !get$2(i) || !get$2(s));
      Button(T, {
        type: "submit",
        fullWidth: !0,
        get disabled() {
          return get$2(b);
        },
        children: (k, A) => {
          next();
          var $ = text("Leave a feedback");
          append(k, $);
        },
        $$slots: { default: !0 }
      }), reset(m), reset(g), bind_value(v, () => get$2(i), (k) => set(i, k)), bind_value(y, () => get$2(s), (k) => set(s, k)), event("submit", g, preventDefault(l)), append(_, g);
    }, h = (_, g) => {
      {
        var v = (m) => {
          var y = root_6();
          append(m, y);
        };
        if_block(
          _,
          (m) => {
            get$2(n) === "success" && m(v);
          },
          g
        );
      }
    };
    if_block(d, (_) => {
      get$2(n) === "idle" || get$2(n) === "error" ? _(f) : _(h, !1);
    });
  }
  return append(r, c), pop({
    get id() {
      return t();
    },
    set id(_) {
      t(_), flushSync();
    }
  });
}
create_custom_element(KnitterReviewForm, { id: {} }, [], [], !0);
var root$6 = /* @__PURE__ */ template('<p class="svelte-7fo9ce">↑</p>');
const $$css$6 = {
  hash: "svelte-7fo9ce",
  code: `p.svelte-7fo9ce {margin:0;font-family:Monument, sans-serif;letter-spacing:-0.43px;color:#000;}
@media (max-width: 812px) {p.svelte-7fo9ce {letter-spacing:-0.18px;}
}
@media (min-width: 320px) and (max-width: 480px) {p.svelte-7fo9ce {letter-spacing:-0.18px;}
}`
};
function ArrowIcon(r) {
  append_styles(r, $$css$6);
  var e = root$6();
  append(r, e);
}
create_custom_element(ArrowIcon, {}, [], [], !0);
var root_1$5 = /* @__PURE__ */ template("<div><!> <!></div>"), root$5 = /* @__PURE__ */ template('<div class="accordion svelte-pbk1c8"><div class="header grid svelte-pbk1c8"><img class="avatar svelte-pbk1c8"> <h3 class="svelte-pbk1c8"> </h3> <div><!></div></div> <div class="content grid svelte-pbk1c8"><p> </p> <img> <!></div></div>');
const $$css$5 = {
  hash: "svelte-pbk1c8",
  code: `.accordion.svelte-pbk1c8 {display:flex;flex-direction:column;border-bottom:1px solid black;}.fade-in.svelte-pbk1c8 {opacity:1;transition:opacity 0.3s 0.3s linear;}.fade-out.svelte-pbk1c8 {opacity:0;transition:opacity 0.2s ease;}.grid.svelte-pbk1c8 {display:grid;grid-template-columns:65px 1fr 40px;align-items:center;gap:25px;}
@media screen and (min-width: 1024px) {.grid.svelte-pbk1c8 {gap:40px;grid-template-columns:124px 5fr 3fr 40px;}
}.header.svelte-pbk1c8 {width:100%;grid-template-areas:"avatar name arrow";cursor:pointer;user-select:none;position:relative;z-index:1;padding:12px 0;}
@media screen and (min-width: 1024px) {.header.svelte-pbk1c8 {grid-template-areas:"avatar name name arrow";padding:24px 0;}
}.content.svelte-pbk1c8 {grid-template-rows:auto;grid-template-areas:"description description description" "photo photo photo" "reviews reviews reviews";overflow:hidden;}
@media screen and (min-width: 1024px) {.content.svelte-pbk1c8 {transform:translateY(-144px);grid-template-areas:". description photo ." ". reviews reviews .";}
}.avatar.svelte-pbk1c8 {grid-area:avatar;border-radius:100%;width:65px;aspect-ratio:1/1;}
@media screen and (min-width: 1024px) {.avatar.svelte-pbk1c8 {width:124px;}
}h3.svelte-pbk1c8 {grid-area:name;font-family:Monument, sans-serif;color:black;text-transform:uppercase;font-weight:300;font-size:16px;letter-spacing:-0.19px;line-height:16px;}
@media screen and (min-width: 1024px) {h3.svelte-pbk1c8 {font-size:28px;}
}.arrow.svelte-pbk1c8 {justify-self:flex-end;font-size:16px;transition:transform 0.3s ease;display:flex;justify-content:center;align-items:center;width:40px;height:40px;transform:rotate(-180deg);}.arrow---down.svelte-pbk1c8 {transform:rotate(0);}
@media screen and (min-width: 1024px) {.arrow.svelte-pbk1c8 {font-size:24px;}
}p.svelte-pbk1c8 {grid-area:description;font-family:Monument Regular, sans-serif;font-size:14px;letter-spacing:-0.22px;line-height:20px;font-weight:400;max-width:600px;margin:16px auto 12px;color:black;transform:translateZ(1px);}
@media screen and (min-width: 1024px) {p.svelte-pbk1c8 {font-size:20px;letter-spacing:-0.32px;line-height:32px;padding-right:40px;padding-top:60px;padding-bottom:60px;margin:0px auto 18px;}
}.photo.svelte-pbk1c8 {grid-area:photo;width:100%;transform:translateZ(1px);}.reviews.svelte-pbk1c8 {grid-area:reviews;margin-bottom:32px;}`
};
function KnittersAccordionItem(r, e) {
  push(e, !1), append_styles(r, $$css$5);
  let t = prop(e, "name", 12, void 0), s = prop(e, "id", 12, void 0), i = prop(e, "description", 12, void 0), n = prop(e, "photo", 12, void 0), o = prop(e, "avatar", 12, void 0), l = !1, c = /* @__PURE__ */ mutable_source(!1), u = /* @__PURE__ */ mutable_source(!1), d = /* @__PURE__ */ mutable_source(), f = /* @__PURE__ */ mutable_source();
  const h = () => {
    set(c, !get$2(c));
  }, _ = (P = 150) => {
    if (!get$2(f)) return;
    const V = get$2(f).getBoundingClientRect().top + window.pageYOffset - P;
    window.scrollTo({ top: V, behavior: "smooth" });
  }, g = () => {
    set(u, !1), get$2(d) && (window.innerWidth >= 1024 && _(114), window.innerWidth < 1024 && _(52), mutate(d, get$2(d).style.maxHeight = "inherit"), get$2(d).removeEventListener("transitionend", g));
  }, v = () => {
    !get$2(c) || !get$2(d) || (set(u, !0), get$2(d).addEventListener("transitionend", g), setTimeout(() => {
      mutate(d, get$2(d).style.maxHeight = `${get$2(d).scrollHeight}px`), mutate(d, get$2(d).style.transition = "max-height .3s ease");
    }), l || (l = !0));
  }, m = () => {
    if (get$2(c) || !get$2(d)) return console.warn("No content element");
    set(u, !0), l && mutate(d, get$2(d).style.maxHeight = `${get$2(d).scrollHeight}px`), setTimeout(() => {
      mutate(d, get$2(d).style.maxHeight = "0px"), mutate(d, get$2(d).style.transition = "max-height .15s ease");
    }), l || (l = !0);
  }, y = () => {
  }, E = () => {
    const P = new URLSearchParams(window.location.search), { knitter: F } = Object.fromEntries(P.entries());
    F === s() && set(c, !0);
  };
  onMount(() => {
    get$2(c) ? v() : m(), E();
  }), legacy_pre_effect(() => get$2(c), () => {
    get$2(c) && v();
  }), legacy_pre_effect(() => get$2(c), () => {
    get$2(c) || m();
  }), legacy_pre_effect_reset(), init();
  var w = root$5();
  event("resize", $window, y);
  var T = child(w), b = child(T), k = sibling(b, 2), A = child(k, !0);
  reset(k);
  var $ = sibling(k, 2);
  let x;
  var S = child($);
  ArrowIcon(S), reset($), reset(T);
  var C = sibling(T, 2), I = child(C);
  let O;
  var B = child(I, !0);
  reset(I);
  var j = sibling(I, 2);
  let R;
  var N = sibling(j, 2);
  {
    var L = (P) => {
      var F = root_1$5();
      let V;
      var z = child(F);
      const X = /* @__PURE__ */ derived_safe_equal(() => !get$2(c) || get$2(u));
      KnitterReviewsList(z, {
        get id() {
          return s();
        },
        get isFetchBlock() {
          return get$2(X);
        }
      });
      var Q = sibling(z, 2);
      KnitterReviewForm(Q, {
        get id() {
          return s();
        }
      }), reset(F), template_effect(
        (Z) => V = set_class(F, 1, "reviews svelte-pbk1c8", null, V, Z),
        [
          () => ({
            "fade-in": get$2(c),
            "fade-out": !get$2(c)
          })
        ],
        derived_safe_equal
      ), append(P, F);
    };
    if_block(N, (P) => {
      s() && P(L);
    });
  }
  return reset(C), bind_this(C, (P) => set(d, P), () => get$2(d)), reset(w), bind_this(w, (P) => set(f, P), () => get$2(f)), template_effect(
    (P, F, V) => {
      set_attribute(b, "src", o()), set_attribute(b, "alt", `Small picture of ${t() ?? ""}`), set_text(A, t()), x = set_class($, 1, "arrow svelte-pbk1c8", null, x, P), O = set_class(I, 1, "svelte-pbk1c8", null, O, F), set_text(B, i()), R = set_class(j, 1, "photo svelte-pbk1c8", null, R, V), set_attribute(j, "src", n()), set_attribute(j, "alt", `Picture of ${t() ?? ""}`);
    },
    [
      () => ({ "arrow---down": get$2(c) }),
      () => ({
        "fade-in": get$2(c),
        "fade-out": !get$2(c)
      }),
      () => ({
        "fade-in": get$2(c),
        "fade-out": !get$2(c)
      })
    ],
    derived_safe_equal
  ), event("click", T, h), append(r, w), pop({
    get name() {
      return t();
    },
    set name(P) {
      t(P), flushSync();
    },
    get id() {
      return s();
    },
    set id(P) {
      s(P), flushSync();
    },
    get description() {
      return i();
    },
    set description(P) {
      i(P), flushSync();
    },
    get photo() {
      return n();
    },
    set photo(P) {
      n(P), flushSync();
    },
    get avatar() {
      return o();
    },
    set avatar(P) {
      o(P), flushSync();
    }
  });
}
customElements.define("knitter-accordion-item", create_custom_element(
  KnittersAccordionItem,
  {
    name: {},
    id: {},
    description: {},
    photo: {},
    avatar: {}
  },
  [],
  [],
  !0
));
var root$4 = /* @__PURE__ */ template('<div class="svelte-1sgbr3w"><!></div>');
const $$css$4 = {
  hash: "svelte-1sgbr3w",
  code: `div.svelte-1sgbr3w {padding:0 8px;

		@media screen and (min-width: 1024px) {padding:0 25px;
		}}`
};
function ContentWrapper(r, e) {
  append_styles(r, $$css$4);
  var t = root$4(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(ContentWrapper, {}, ["default"], [], !0);
var root_1$4 = /* @__PURE__ */ template('<section class="title-section svelte-emjvyd"><h2 class="svelte-emjvyd">All Knitters</h2></section> <section class="list svelte-emjvyd"><!></section>', 1), root$3 = /* @__PURE__ */ template("<div><!></div>");
const $$css$3 = {
  hash: "svelte-emjvyd",
  code: `h2.svelte-emjvyd {font-size:28px;letter-spacing:-0.43px;line-height:18px;font-weight:300;margin:0;}
@media screen and (min-width: 1024px) {h2.svelte-emjvyd {font-family:Panama, sans-serif;font-size:62px;letter-spacing:-0.95px;line-height:70px;color:#000;}
}.title-section.svelte-emjvyd {height:93px;border-top:1px solid black;border-bottom:1px solid black;display:flex;align-items:center;}
@media screen and (min-width: 1024px) {.title-section.svelte-emjvyd {height:241px;justify-content:center;}
}.list.svelte-emjvyd {display:flex;flex-direction:column;}`
};
function KnittersAccordion(r, e) {
  push(e, !1), append_styles(r, $$css$3);
  let t = /* @__PURE__ */ mutable_source("");
  onMount(() => {
    const o = new URLSearchParams(window.location.search), { knitter: l } = Object.fromEntries(o.entries());
    set(t, l);
  });
  const s = (o) => {
    const l = document.getElementById(o);
    l && l.scrollIntoView({ behavior: "smooth" });
  };
  legacy_pre_effect(() => get$2(t), () => {
    get$2(t) && s(get$2(t));
  }), legacy_pre_effect_reset(), init();
  var i = root$3(), n = child(i);
  ContentWrapper(n, {
    children: (o, l) => {
      var c = root_1$4(), u = sibling(first_child(c), 2), d = child(u);
      slot(d, e, "default", {}), reset(u), append(o, c);
    },
    $$slots: { default: !0 }
  }), reset(i), append(r, i), pop();
}
customElements.define("knitter-accordion", create_custom_element(KnittersAccordion, {}, ["default"], [], !0));
function expoOut(r) {
  return r === 1 ? r : 1 - Math.pow(2, -10 * r);
}
function sineIn(r) {
  const e = Math.cos(r * Math.PI * 0.5);
  return Math.abs(e) < 1e-14 ? 1 : 1 - e;
}
var root_1$3 = /* @__PURE__ */ template('<button class="main svelte-ymfpde"> </button>'), root_3 = /* @__PURE__ */ template('<li role="menuitem"><button class="menuitem svelte-ymfpde"> </button></li>'), root_2 = /* @__PURE__ */ template('<ul role="menu" class="svelte-ymfpde"></ul>'), root$2 = /* @__PURE__ */ template('<div class="wrapper svelte-ymfpde"><!> <div><!></div></div>');
const $$css$2 = {
  hash: "svelte-ymfpde",
  code: ".wrapper.svelte-ymfpde {display:inline-flex;position:relative;}button.main.svelte-ymfpde {background:transparent;padding:8px 16px;border:none;cursor:pointer;width:max-content;font-weight:600;}.dropdown.svelte-ymfpde {position:absolute;top:100%;margin-top:8px;}.dropdown.left.svelte-ymfpde {left:0;}.dropdown.center.svelte-ymfpde {left:50%;transform:translateX(-50%);}.dropdown.right.svelte-ymfpde {right:0;}ul.svelte-ymfpde {list-style:none;padding:0 0;width:max-content;margin:0;border:1px solid rgba(0, 0, 0, 0.01);}button.menuitem.svelte-ymfpde {background:transparent;border:none;padding:8px 16px;transition:background-color 0.3s ease;cursor:pointer;font-weight:600;}button.menuitem.svelte-ymfpde:hover {background:rgba(0, 0, 0, 0.05);}"
};
function CurrencySelector(r, e) {
  push(e, !1), append_styles(r, $$css$2);
  function t(w, {
    y: T = 100,
    scale: b = 0.5,
    duration: k = 300,
    easing: A = sineIn
    // Try different easing functions
  }) {
    return {
      duration: k,
      easing: A,
      css: ($) => `
        transform:
          scale(${b + (1 - b) * $})
          translateY(${(1 - $) * T}px);
        opacity: ${$};
      `
    };
  }
  let s = prop(e, "params", 12, void 0), i = prop(e, "available", 28, () => []), n = prop(e, "active", 12, void 0), o = prop(e, "left", 12, !0), l = prop(e, "center", 12, !1), c = prop(e, "right", 12, !1), u = prop(e, "bg", 12, "#eeeeea"), d = /* @__PURE__ */ mutable_source(!1);
  const f = (w) => {
    n(w), set(d, !1), displayCurrency.set(w.currency);
  };
  onMount(() => {
    if (!s()) return console.warn("DUMP no params found");
    try {
      const { available: w, active: T } = JSON.parse(s());
      i(w), n(T);
    } catch (w) {
      console.error(w);
    }
  }), init();
  var h = root$2(), _ = child(h);
  {
    var g = (w) => {
      var T = root_1$3(), b = child(T);
      reset(T), template_effect(() => set_text(b, `${n().symbol ?? ""} ${n().currency ?? ""}`)), event("click", T, () => set(d, !get$2(d))), append(w, T);
    };
    if_block(_, (w) => {
      n() && w(g);
    });
  }
  var v = sibling(_, 2);
  let m;
  var y = child(v);
  {
    var E = (w) => {
      var T = root_2();
      each(T, 5, i, index, (b, k) => {
        var A = root_3(), $ = child(A), x = child($);
        reset($), reset(A), template_effect(() => set_text(x, `${get$2(k).symbol ?? ""}
							${get$2(k).currency ?? ""}`)), event("click", $, () => f(get$2(k))), append(b, A);
      }), reset(T), template_effect(() => set_style(T, `background: ${u()}`)), transition$1(3, T, () => t, () => ({
        y: -16,
        scale: 0.95,
        duration: 250,
        easing: expoOut
      })), append(w, T);
    };
    if_block(y, (w) => {
      get$2(d) && w(E);
    });
  }
  return reset(v), reset(h), template_effect(
    (w) => m = set_class(v, 1, "dropdown svelte-ymfpde", null, m, w),
    [
      () => ({
        left: o(),
        center: l(),
        right: c()
      })
    ],
    derived_safe_equal
  ), append(r, h), pop({
    get params() {
      return s();
    },
    set params(w) {
      s(w), flushSync();
    },
    get available() {
      return i();
    },
    set available(w) {
      i(w), flushSync();
    },
    get active() {
      return n();
    },
    set active(w) {
      n(w), flushSync();
    },
    get left() {
      return o();
    },
    set left(w) {
      o(w), flushSync();
    },
    get center() {
      return l();
    },
    set center(w) {
      l(w), flushSync();
    },
    get right() {
      return c();
    },
    set right(w) {
      c(w), flushSync();
    },
    get bg() {
      return u();
    },
    set bg(w) {
      u(w), flushSync();
    }
  });
}
customElements.define("currency-selector", create_custom_element(
  CurrencySelector,
  {
    params: {},
    available: {},
    active: {},
    left: {},
    center: {},
    right: {},
    bg: {}
  },
  [],
  [],
  !0
));
const removeNonComponentChildren = (r) => {
  var e;
  return Array.from(((e = r.parentElement) == null ? void 0 : e.children) || []).filter((t) => t !== r).forEach((t) => {
    var s;
    return (s = t.parentElement) == null ? void 0 : s.removeChild(t);
  }), {};
};
function parseCurrencyString(r, e = void 0) {
  if (!r && r !== "")
    return {
      formatted: "",
      value: 0,
      symbol: "",
      isSymbolAtStart: !0
    };
  r = String(r);
  const t = r.match(/^[\p{Currency_Symbol}\s]+|[\p{Currency_Symbol}\s]+$/gu), s = t ? t[0] : "", i = r.startsWith(s);
  if (!e) {
    let h = r.replace(/[^\d.,\-]/g, "");
    return h.includes(",") && (/,\d{2}$/.test(h) ? h = h.replace(/\./g, "").replace(",", ".") : h = h.replace(/,/g, "")), e = parseFloat(h), isNaN(e) && (e = 0), {
      formatted: r || "0",
      value: e,
      symbol: s,
      isSymbolAtStart: i
    };
  }
  e = Number(e), isNaN(e) && (e = 0);
  let n = e.toString();
  const o = /[.,]\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(r);
  if (!n.includes(".") && o)
    n += ".00";
  else if (n.includes(".")) {
    const [h, _] = n.split(".");
    n = h + "." + (_ + "00").slice(0, 2);
  }
  const l = /\d,\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(r);
  if (l && (n = n.replace(".", ",")), /\d{1,3}([,.])\d{3}/.test(r)) {
    const [h, _] = n.split(/[.,]/), g = l ? "." : ",";
    n = `${h.replace(/\B(?=(\d{3})+(?!\d))/g, g)}${_ ? (l ? "," : ".") + _ : ""}`;
  }
  const u = /^[\p{Currency_Symbol}]+\s/u.test(r), d = /\s[\p{Currency_Symbol}]+$/u.test(r);
  return {
    formatted: i ? `${s}${u ? " " : ""}${n}` : `${n}${d ? " " : ""}${s}`,
    value: e,
    symbol: s,
    isSymbolAtStart: i
  };
}
const subtractCurrencyStrings = (r, e) => {
  const { value: t } = parseCurrencyString(r), { value: s } = parseCurrencyString(e);
  return parseCurrencyString(r, t - s);
}, calculateDiscountPercentage = (r, e) => {
  if (!e) return;
  const { value: t } = parseCurrencyString(r), { value: s } = parseCurrencyString(e);
  return (Math.abs(t - s) / s * 100).toFixed(0);
}, priceFormatter = (r, e) => {
  const t = {
    price: "",
    compared_at: void 0
  }, { value: s } = parseCurrencyString(r), { value: i } = e ? parseCurrencyString(e) : { value: void 0 };
  return s && i ? isNaN(i) ? t.compared_at = void 0 : s > i ? (t.compared_at = r, t.price = e) : (t.price = r, t.compared_at = e) : s && (t.price = r, t.compared_at = void 0), t;
};
var root_1$2 = /* @__PURE__ */ template('<div class="pdp-price--compared-at svelte-1ufi9b3"> </div>'), root$1 = /* @__PURE__ */ template('<div><!> <div class="pdp-price--price svelte-1ufi9b3"> </div></div>');
const $$css$1 = {
  hash: "svelte-1ufi9b3",
  code: `.pdp-price.svelte-1ufi9b3 {font-family:"Monument", sans-serif;display:flex;}.pdp-price.small.svelte-1ufi9b3 {gap:8px;font-size:16px;letter-spacing:-0.22px;color:rgb(124, 124, 124);justify-content:center;}
@media screen and (max-width: 1024px) {.pdp-price.small.svelte-1ufi9b3 {font-size:12px;gap:4px;}
}.pdp-price.big.svelte-1ufi9b3 {gap:16px;font-size:42px;color:#000;}
@media screen and (max-width: 1024px) {.pdp-price.big.svelte-1ufi9b3 {font-size:20px;gap:8px;}
}.pdp-price.has-discount.svelte-1ufi9b3 .pdp-price--price:where(.svelte-1ufi9b3) {color:rgb(210, 25, 16);}.pdp-price--compared-at.svelte-1ufi9b3 {text-decoration:line-through;}`
};
function ProductPrice(r, e) {
  push(e, !0), append_styles(r, $$css$1);
  const [t, s] = setup_stores(), i = () => store_get(displayCurrency, "$displayCurrency", t), n = () => store_get(marketCurrency, "$marketCurrency", t), o = () => store_get(currencyRates, "$currencyRates", t), l = prop(e, "theme", 7, "big"), c = prop(e, "price", 7), u = prop(e, "compared_at", 7), d = prop(e, "iso_code", 7), f = prop(e, "variant_id", 7), h = prop(e, "devCurrency", 7), _ = new NexusApi(), g = /* @__PURE__ */ state(proxy({
    price: c(),
    comparedAt: u()
  })), v = /* @__PURE__ */ state(proxy({
    price: c(),
    comparedAt: c()
  })), m = /* @__PURE__ */ state(proxy({ price: "-1", comparedAt: void 0 }));
  user_effect(() => {
    h() && displayCurrency.set(h());
  }), user_effect(() => {
    let x = c(), S = u();
    S === "nodiscount" && (S = void 0), x < S && ([x, S] = [S, x]), get$2(g).price = x, get$2(g).comparedAt = S;
  }), user_effect(() => {
    if (get$2(v).price = get$2(g).price, get$2(v).comparedAt = get$2(g).comparedAt, !!d() && f() && get$2(g).price && !get$2(g).comparedAt)
      try {
        y({ ...get$2(g) }).then(({ price: x, comparedAt: S }) => {
          get$2(v).price = x, get$2(v).comparedAt = S;
        });
      } catch (x) {
        console.error(x);
      }
  }), user_effect(() => {
    const x = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: i(),
      // 'EUR', 'USD', etc.
      currencySign: "standard",
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    if (get$2(m).price = x.format(parseCurrencyString(get$2(v).price).value), get$2(v).comparedAt && (get$2(m).comparedAt = x.format(parseCurrencyString(get$2(v).comparedAt).value)), n() === i()) return;
    if (!o()) return console.error("currencyRates is not set");
    const S = o()[i()], { value: C } = parseCurrencyString(get$2(v).price);
    if (get$2(m).price = x.format(Math.round(C * S)), get$2(v).comparedAt) {
      const { value: I } = parseCurrencyString(get$2(v).comparedAt);
      get$2(m).comparedAt = x.format(Math.round(I * S));
    }
  });
  const y = async ({ price: x }) => {
    if (!d()) throw new Error("market is required");
    if (!f()) throw new Error("market is required");
    const { amount: S } = await _.getAutomaticDiscount(d(), +f());
    if (!S || S === 0) return { price: x, comparedAt: void 0 };
    const { formatted: C } = subtractCurrencyStrings(x, S);
    return { price: C, comparedAt: x };
  };
  var E = root$1();
  let w;
  var T = child(E);
  {
    var b = (x) => {
      var S = root_1$2(), C = child(S, !0);
      reset(S), template_effect(() => set_text(C, get$2(m).comparedAt)), append(x, S);
    };
    if_block(T, (x) => {
      get$2(m).comparedAt && x(b);
    });
  }
  var k = sibling(T, 2), A = child(k, !0);
  reset(k), reset(E), action(E, (x) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(x)), template_effect(
    (x) => {
      w = set_class(E, 1, "pdp-price svelte-1ufi9b3", null, w, x), set_text(A, get$2(m).price);
    },
    [
      () => ({
        "has-discount": get$2(m).comparedAt,
        small: l() === "small",
        big: l() === "big"
      })
    ]
  ), append(r, E);
  var $ = pop({
    get theme() {
      return l();
    },
    set theme(x = "big") {
      l(x), flushSync();
    },
    get price() {
      return c();
    },
    set price(x) {
      c(x), flushSync();
    },
    get compared_at() {
      return u();
    },
    set compared_at(x) {
      u(x), flushSync();
    },
    get iso_code() {
      return d();
    },
    set iso_code(x) {
      d(x), flushSync();
    },
    get variant_id() {
      return f();
    },
    set variant_id(x) {
      f(x), flushSync();
    },
    get devCurrency() {
      return h();
    },
    set devCurrency(x) {
      h(x), flushSync();
    }
  });
  return s(), $;
}
customElements.define("product-price", create_custom_element(
  ProductPrice,
  {
    theme: {},
    price: {},
    compared_at: {},
    iso_code: {},
    variant_id: {},
    devCurrency: {}
  },
  [],
  [],
  !1
));
var root_1$1 = /* @__PURE__ */ template("<div> </div>");
const $$css = {
  hash: "svelte-163f7ne",
  code: `.discount-percentage.svelte-163f7ne {font-family:"Monument", sans-serif;color:rgb(210, 25, 16);}.discount-percentage.small.svelte-163f7ne {gap:8px;font-size:16px;letter-spacing:-0.22px;}
@media screen and (max-width: 1024px) {.discount-percentage.small.svelte-163f7ne {font-size:12px;gap:4px;}
}.discount-percentage.big.svelte-163f7ne {gap:16px;font-size:42px;}
@media screen and (max-width: 1024px) {.discount-percentage.big.svelte-163f7ne {font-size:20px;gap:8px;}
}`
};
function ProductDiscountPercentage(r, e) {
  push(e, !1), append_styles(r, $$css);
  let t = prop(e, "price", 12, ""), s = prop(e, "compared_at", 12, void 0), i = prop(e, "iso_code", 12, void 0), n = prop(e, "variant_id", 12, void 0), o = prop(e, "theme", 12, "big"), l = /* @__PURE__ */ mutable_source(t()), c = /* @__PURE__ */ mutable_source(s());
  const u = new NexusApi();
  let d = /* @__PURE__ */ mutable_source(), f = prop(e, "discountPercentage", 12);
  const h = async () => {
    if (!i() || !n() || s() && s() !== "nodiscount") return;
    const { amount: m } = await u.getAutomaticDiscount(i(), +n());
    if (!m) return;
    const { formatted: y } = subtractCurrencyStrings(t(), m);
    set(l, t()), set(c, y);
  };
  legacy_pre_effect(() => deep_read_state(t()), () => {
    set(l, t());
  }), legacy_pre_effect(() => deep_read_state(s()), () => {
    set(c, s());
  }), legacy_pre_effect(() => (get$2(l), get$2(c)), () => {
    set(d, priceFormatter(get$2(l), get$2(c)));
  }), legacy_pre_effect(() => get$2(d), () => {
    f(calculateDiscountPercentage(get$2(d).price, get$2(d).compared_at));
  }), legacy_pre_effect(
    () => (deep_read_state(i()), deep_read_state(n()), deep_read_state(t()), deep_read_state(s())),
    () => {
      i() && n() && t() && (s() || !s()) && h();
    }
  ), legacy_pre_effect_reset(), init();
  var _ = comment(), g = first_child(_);
  {
    var v = (m) => {
      var y = root_1$1();
      let E;
      var w = child(y);
      reset(y), template_effect(
        (T) => {
          E = set_class(y, 1, "discount-percentage svelte-163f7ne", null, E, T), set_text(w, `-${f() ?? ""}% off`);
        },
        [
          () => ({
            "has-discount": get$2(d).compared_at && get$2(d).compared_at !== get$2(d).price,
            small: o() === "small",
            big: o() === "big"
          })
        ],
        derived_safe_equal
      ), append(m, y);
    };
    if_block(g, (m) => {
      f() && +f() > 0 && m(v);
    });
  }
  return append(r, _), pop({
    get price() {
      return t();
    },
    set price(m) {
      t(m), flushSync();
    },
    get compared_at() {
      return s();
    },
    set compared_at(m) {
      s(m), flushSync();
    },
    get iso_code() {
      return i();
    },
    set iso_code(m) {
      i(m), flushSync();
    },
    get variant_id() {
      return n();
    },
    set variant_id(m) {
      n(m), flushSync();
    },
    get theme() {
      return o();
    },
    set theme(m) {
      o(m), flushSync();
    },
    get discountPercentage() {
      return f();
    },
    set discountPercentage(m) {
      f(m), flushSync();
    }
  });
}
customElements.define("product-discount-percentage", create_custom_element(
  ProductDiscountPercentage,
  {
    price: {},
    compared_at: {},
    iso_code: {},
    variant_id: {},
    theme: {},
    discountPercentage: {}
  },
  [],
  [],
  !0
));
const addLineItemsMutation = `
mutation AddLineItems($cartId: ID!, $lines: [CartLineInput!]!) {
  cartLinesAdd(cartId: $cartId, lines: $lines) {
    cart {
      id
      totalQuantity
      lines(first: 50) {
        nodes {
          id
          quantity
					discountAllocations {
       			discountedAmount {
       				amount
       			}
          }
          merchandise {
            ... on ProductVariant {
              id
            }
          }
        }
      }
    }
    userErrors {
      message
    }
  }
}
`, createCartMutation = `
  mutation CreateCart {
    cartCreate {
      cart {
        id
      }
      userErrors {
        field
        message
      }
    }
  }
`, createCartWithBuyerIdentityMutation = `
mutation createCartWithBuyerIdentity($buyerIdentity: CartBuyerIdentityInput!) {
  cartCreate(
    input: {
      buyerIdentity: $buyerIdentity
    }
  ) {
    cart {
      id
      checkoutUrl
      buyerIdentity {
        countryCode
        email
        phone
      }
    }
    userErrors {
      field
      message
    }
  }
}
`, getProductVariantsQuery = `
query getProductVariants($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    variants(first: 10) {
      edges {
        node {
          id
          title
          sku
          metafield(namespace: "preorder", key: "preordercontent") {
						value
						id
					}
        }
      }
    }
  }
}
`, createStorefrontApiClient = () => createStorefrontApiClient$1({
  storeDomain: "the-knotty-ones.myshopify.com",
  apiVersion: "2025-01",
  publicAccessToken: "9244b79a2b1f32cbc7bd2a7e673fe6e1"
}), storefrontApi = () => {
  const r = createStorefrontApiClient();
  return {
    createCart: async () => {
      var l, c, u;
      const { data: n, errors: o } = await r.request(createCartMutation);
      if (o)
        throw console.error(o), new Error("Failed to create cart");
      if (((c = (l = n == null ? void 0 : n.cartCreate) == null ? void 0 : l.userErrors) == null ? void 0 : c.length) > 0)
        throw new Error(n.cartCreate.userErrors[0].message);
      return (u = n == null ? void 0 : n.cartCreate) == null ? void 0 : u.cart;
    },
    createCartWithBuyerIdentity: async (n) => {
      var c, u, d;
      const { data: o, errors: l } = await r.request(createCartWithBuyerIdentityMutation, {
        variables: {
          buyerIdentity: {
            countryCode: n
          }
        }
      });
      if (l)
        throw console.error(l), new Error("Failed to create cart");
      if (((u = (c = o == null ? void 0 : o.cartCreate) == null ? void 0 : c.userErrors) == null ? void 0 : u.length) > 0)
        throw new Error(o.cartCreate.userErrors[0].message);
      return (d = o == null ? void 0 : o.cartCreate) == null ? void 0 : d.cart;
    },
    addLineItems: async (n, o) => {
      var u, d, f;
      if (!n) throw new Error("cartId is required");
      if (!o || !o.length) throw new Error("lines are required");
      const { data: l, errors: c } = await r.request(
        addLineItemsMutation,
        {
          variables: {
            cartId: n,
            lines: o.map((h) => ({
              merchandiseId: h.variantGid,
              quantity: h.quantity
            }))
          }
        }
      );
      if (c)
        throw console.error(c), console.error(c.graphQLErrors), new Error("Error adding line items to cart");
      if ((d = (u = l == null ? void 0 : l.cartLinesAdd) == null ? void 0 : u.userErrors) != null && d.length)
        throw new Error(l.cartLinesAdd.userErrors[0].message);
      return (f = l == null ? void 0 : l.cartLinesAdd) == null ? void 0 : f.cart;
    },
    getPreOrderMessage: async (n, o) => {
      var f;
      if (!n) throw new Error("variantId is required");
      if (!o) throw new Error("variantId is required");
      const { data: l, errors: c } = await r.request(
        getProductVariantsQuery,
        {
          variables: {
            handle: n
          }
        }
      );
      if (c)
        return console.error(c.graphQLErrors), null;
      if (!(l != null && l.productByHandle)) return null;
      const u = (f = l.productByHandle.variants.edges.find(
        (h) => {
          var _;
          return ((_ = h == null ? void 0 : h.node) == null ? void 0 : _.id) === `gid://shopify/ProductVariant/${o}`;
        }
      )) == null ? void 0 : f.node;
      if (!u) return null;
      const { metafield: d } = u;
      return d ? d.value : null;
    }
  };
};
var root_1 = /* @__PURE__ */ template(`<div class="bg-blue font-sans
						fixed z-10 bottom-[73px] left-0 right-0 text-[10px]
						sm:static sm:text-[14px] tracking-[-0.34px] sm:min-h-[42px] p-[10px] text-black
							"> </div>`), root = /* @__PURE__ */ template('<div class="min-h-[42px]"><!></div>');
function PreOrderStrip(r, e) {
  push(e, !1);
  let t = prop(e, "handle", 12, void 0), s = prop(e, "variantId", 12, void 0), i = prop(e, "message", 12, void 0);
  const n = async () => {
    if (!t() || !s()) {
      i(null);
      return;
    }
    i(await storefrontApi().getPreOrderMessage(t(), s()));
  };
  legacy_pre_effect(
    () => (deep_read_state(t()), deep_read_state(s())),
    () => {
      t() && s() && n();
    }
  ), legacy_pre_effect(() => deep_read_state(i()), () => {
    console.log("dump", i());
  }), legacy_pre_effect_reset(), init();
  var o = root(), l = child(o);
  {
    var c = (u) => {
      var d = root_1(), f = child(d, !0);
      reset(d), template_effect(() => set_text(f, i())), transition$1(3, d, () => fly, () => ({ y: 6, duration: 300 })), append(u, d);
    };
    if_block(l, (u) => {
      i() && u(c);
    });
  }
  return reset(o), action(o, (u) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(u)), append(r, o), pop({
    get handle() {
      return t();
    },
    set handle(u) {
      t(u), flushSync();
    },
    get variantId() {
      return s();
    },
    set variantId(u) {
      s(u), flushSync();
    },
    get message() {
      return i();
    },
    set message(u) {
      i(u), flushSync();
    }
  });
}
customElements.define("pre-order-strip", create_custom_element(PreOrderStrip, { handle: {}, variantId: {}, message: {} }, [], [], !1));
if (typeof window < "u") {
  const r = {
    stores: {
      displayCurrency,
      marketCurrency
    }
  };
  window.getAutomaticDiscount = getAutomaticDiscount, window.UI = r;
}
var browser = function() {
  throw new Error(
    "ws does not work in the browser. Browser clients must use the native WebSocket object"
  );
};
const browser$1 = /* @__PURE__ */ getDefaultExportFromCjs(browser), browser$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: browser$1
}, Symbol.toStringTag, { value: "Module" }));
export {
  CartRecommendationCard,
  CurrencySelector,
  KnittersAccordion,
  KnittersAccordionItem,
  PreOrderStrip,
  ProductDiscountPercentage,
  ProductPrice,
  getAutomaticDiscount
};
