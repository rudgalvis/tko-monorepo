var Fe = Object.defineProperty;
var Le = (r) => {
  throw TypeError(r);
};
var ze = (r, e, t) => e in r ? Fe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var L = (r, e, t) => ze(r, typeof e != "symbol" ? e + "" : e, t), Ie = (r, e, t) => e.has(r) || Le("Cannot " + t);
var T = (r, e, t) => (Ie(r, e, "read from private field"), t ? t.call(r) : e.get(r)), F = (r, e, t) => e.has(r) ? Le("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), D = (r, e, t, s) => (Ie(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t), z = (r, e, t) => (Ie(r, e, "access private method"), t);
const isBrowser$2 = typeof window < "u", DEV = !1;
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
function deferred() {
  var r, e, t = new Promise((s, n) => {
    r = s, e = n;
  });
  return { promise: t, resolve: r, reject: e };
}
const DERIVED = 2, EFFECT = 4, RENDER_EFFECT = 8, BLOCK_EFFECT = 16, BRANCH_EFFECT = 32, ROOT_EFFECT = 64, BOUNDARY_EFFECT = 128, CLEAN = 1024, DIRTY = 2048, MAYBE_DIRTY = 4096, INERT = 8192, DESTROYED = 16384, EFFECT_RAN = 32768, EFFECT_TRANSPARENT = 65536, INSPECT_EFFECT = 1 << 17, HEAD_EFFECT = 1 << 18, EFFECT_PRESERVED = 1 << 19, USER_EFFECT = 1 << 20, UNOWNED = 256, DISCONNECTED = 512, WAS_MARKED = 32768, REACTION_IS_UPDATING = 1 << 21, ASYNC = 1 << 22, ERROR_VALUE = 1 << 23, STATE_SYMBOL = Symbol("$state"), LEGACY_PROPS = Symbol("legacy props"), LOADING_ATTR_SYMBOL = Symbol(""), STALE_REACTION = new class extends Error {
  constructor() {
    super(...arguments);
    L(this, "name", "StaleReactionError");
    L(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
  }
}(), TEXT_NODE = 3, COMMENT_NODE = 8;
function equals(r) {
  return r === this.v;
}
function safe_not_equal(r, e) {
  return r != r ? e == e : r !== e || r !== null && typeof r == "object" || typeof r == "function";
}
function safe_equals(r) {
  return !safe_not_equal(r, this.v);
}
function lifecycle_outside_component(r) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function async_derived_orphan() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
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
function svelte_boundary_reset_onerror() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
let legacy_mode_flag = !1, tracing_mode_flag = !1;
function enable_legacy_mode_flag() {
  legacy_mode_flag = !0;
}
const EACH_ITEM_REACTIVE = 1, EACH_INDEX_REACTIVE = 2, EACH_IS_CONTROLLED = 4, EACH_IS_ANIMATED = 8, EACH_ITEM_IMMUTABLE = 16, PROPS_IS_IMMUTABLE = 1, PROPS_IS_RUNES = 2, PROPS_IS_UPDATED = 4, PROPS_IS_BINDABLE = 8, PROPS_IS_LAZY_INITIAL = 16, TRANSITION_GLOBAL = 4, TEMPLATE_FRAGMENT = 1, TEMPLATE_USE_IMPORT_NODE = 2, HYDRATION_START = "[", HYDRATION_START_ELSE = "[!", HYDRATION_END = "]", HYDRATION_ERROR = {}, UNINITIALIZED = Symbol(), NAMESPACE_HTML = "http://www.w3.org/1999/xhtml";
let component_context = null;
function set_component_context(r) {
  component_context = r;
}
function push(r, e = !1, t) {
  component_context = {
    p: component_context,
    c: null,
    e: null,
    s: r,
    x: null,
    l: legacy_mode_flag && !e ? { s: null, u: null, $: [] } : null
  };
}
function pop(r) {
  var e = (
    /** @type {ComponentContext} */
    component_context
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var s of t)
      create_user_effect(s);
  }
  return r !== void 0 && (e.x = r), component_context = e.p, r ?? /** @type {T} */
  {};
}
function is_runes() {
  return !legacy_mode_flag || component_context !== null && component_context.l === null;
}
let micro_tasks = [];
function run_micro_tasks() {
  var r = micro_tasks;
  micro_tasks = [], run_all(r);
}
function queue_micro_task(r) {
  if (micro_tasks.length === 0 && !is_flushing_sync) {
    var e = micro_tasks;
    queueMicrotask(() => {
      e === micro_tasks && run_micro_tasks();
    });
  }
  micro_tasks.push(r);
}
function flush_tasks() {
  for (; micro_tasks.length > 0; )
    run_micro_tasks();
}
function hydration_mismatch(r) {
  console.warn("https://svelte.dev/e/hydration_mismatch");
}
function svelte_boundary_reset_noop() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
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
function skip_nodes(r = !0) {
  for (var e = 0, t = hydrate_node; ; ) {
    if (t.nodeType === COMMENT_NODE) {
      var s = (
        /** @type {Comment} */
        t.data
      );
      if (s === HYDRATION_END) {
        if (e === 0) return t;
        e -= 1;
      } else (s === HYDRATION_START || s === HYDRATION_START_ELSE) && (e += 1);
    }
    var n = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(t)
    );
    r && t.remove(), t = n;
  }
}
function read_hydration_instruction(r) {
  if (!r || r.nodeType !== COMMENT_NODE)
    throw hydration_mismatch(), HYDRATION_ERROR;
  return (
    /** @type {Comment} */
    r.data
  );
}
function proxy(r) {
  if (typeof r != "object" || r === null || STATE_SYMBOL in r)
    return r;
  const e = get_prototype_of(r);
  if (e !== object_prototype && e !== array_prototype)
    return r;
  var t = /* @__PURE__ */ new Map(), s = is_array(r), n = /* @__PURE__ */ state(0), i = update_version, o = (l) => {
    if (update_version === i)
      return l();
    var c = active_reaction, u = update_version;
    set_active_reaction(null), set_update_version(i);
    var d = l();
    return set_active_reaction(c), set_update_version(u), d;
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
        return d === void 0 ? d = o(() => {
          var f = /* @__PURE__ */ state(u.value);
          return t.set(c, f), f;
        }) : set(d, u.value, !0), !0;
      },
      deleteProperty(l, c) {
        var u = t.get(c);
        if (u === void 0) {
          if (c in l) {
            const d = o(() => /* @__PURE__ */ state(UNINITIALIZED));
            t.set(c, d), increment(n);
          }
        } else
          set(u, UNINITIALIZED), increment(n);
        return !0;
      },
      get(l, c, u) {
        var g;
        if (c === STATE_SYMBOL)
          return r;
        var d = t.get(c), f = c in l;
        if (d === void 0 && (!f || (g = get_descriptor(l, c)) != null && g.writable) && (d = o(() => {
          var h = proxy(f ? l[c] : UNINITIALIZED), _ = /* @__PURE__ */ state(h);
          return _;
        }), t.set(c, d)), d !== void 0) {
          var p = get$2(d);
          return p === UNINITIALIZED ? void 0 : p;
        }
        return Reflect.get(l, c, u);
      },
      getOwnPropertyDescriptor(l, c) {
        var u = Reflect.getOwnPropertyDescriptor(l, c);
        if (u && "value" in u) {
          var d = t.get(c);
          d && (u.value = get$2(d));
        } else if (u === void 0) {
          var f = t.get(c), p = f == null ? void 0 : f.v;
          if (f !== void 0 && p !== UNINITIALIZED)
            return {
              enumerable: !0,
              configurable: !0,
              value: p,
              writable: !0
            };
        }
        return u;
      },
      has(l, c) {
        var p;
        if (c === STATE_SYMBOL)
          return !0;
        var u = t.get(c), d = u !== void 0 && u.v !== UNINITIALIZED || Reflect.has(l, c);
        if (u !== void 0 || active_effect !== null && (!d || (p = get_descriptor(l, c)) != null && p.writable)) {
          u === void 0 && (u = o(() => {
            var g = d ? proxy(l[c]) : UNINITIALIZED, h = /* @__PURE__ */ state(g);
            return h;
          }), t.set(c, u));
          var f = get$2(u);
          if (f === UNINITIALIZED)
            return !1;
        }
        return d;
      },
      set(l, c, u, d) {
        var v;
        var f = t.get(c), p = c in l;
        if (s && c === "length")
          for (var g = u; g < /** @type {Source<number>} */
          f.v; g += 1) {
            var h = t.get(g + "");
            h !== void 0 ? set(h, UNINITIALIZED) : g in l && (h = o(() => /* @__PURE__ */ state(UNINITIALIZED)), t.set(g + "", h));
          }
        if (f === void 0)
          (!p || (v = get_descriptor(l, c)) != null && v.writable) && (f = o(() => /* @__PURE__ */ state(void 0)), set(f, proxy(u)), t.set(c, f));
        else {
          p = f.v !== UNINITIALIZED;
          var _ = o(() => proxy(u));
          set(f, _);
        }
        var m = Reflect.getOwnPropertyDescriptor(l, c);
        if (m != null && m.set && m.set.call(d, u), !p) {
          if (s && typeof c == "string") {
            var y = (
              /** @type {Source<number>} */
              t.get("length")
            ), w = Number(c);
            Number.isInteger(w) && w >= y.v && set(y, w + 1);
          }
          increment(n);
        }
        return !0;
      },
      ownKeys(l) {
        get$2(n);
        var c = Reflect.ownKeys(l).filter((f) => {
          var p = t.get(f);
          return p === void 0 || p.v !== UNINITIALIZED;
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
  else if (e && t.nodeType !== TEXT_NODE) {
    var s = create_text();
    return t == null || t.before(s), set_hydrate_node(s), s;
  }
  return set_hydrate_node(t), t;
}
function first_child(r, e = !1) {
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
  if (e && (hydrate_node == null ? void 0 : hydrate_node.nodeType) !== TEXT_NODE) {
    var s = create_text();
    return hydrate_node == null || hydrate_node.before(s), set_hydrate_node(s), s;
  }
  return hydrate_node;
}
function sibling(r, e = 1, t = !1) {
  let s = hydrating ? hydrate_node : r;
  for (var n; e--; )
    n = s, s = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(s);
  if (!hydrating)
    return s;
  if (t && (s == null ? void 0 : s.nodeType) !== TEXT_NODE) {
    var i = create_text();
    return s === null ? n == null || n.after(i) : s.before(i), set_hydrate_node(i), i;
  }
  return set_hydrate_node(s), /** @type {TemplateNode} */
  s;
}
function clear_text_content(r) {
  r.textContent = "";
}
function should_defer_append() {
  return !1;
}
const adjustments = /* @__PURE__ */ new WeakMap();
function handle_error(r) {
  var e = active_effect;
  if (e === null)
    return active_reaction.f |= ERROR_VALUE, r;
  if (e.f & EFFECT_RAN)
    invoke_error_boundary(r, e);
  else {
    if (!(e.f & BOUNDARY_EFFECT))
      throw !e.parent && r instanceof Error && apply_adjustments(r), r;
    e.b.error(r);
  }
}
function invoke_error_boundary(r, e) {
  for (; e !== null; ) {
    if (e.f & BOUNDARY_EFFECT)
      try {
        e.b.error(r);
        return;
      } catch (t) {
        r = t;
      }
    e = e.parent;
  }
  throw r instanceof Error && apply_adjustments(r), r;
}
function apply_adjustments(r) {
  const e = adjustments.get(r);
  e && (define_property(r, "message", {
    value: e.message
  }), define_property(r, "stack", {
    value: e.stack
  }));
}
const batches = /* @__PURE__ */ new Set();
let current_batch = null, previous_batch = null, batch_values = null, effect_pending_updates = /* @__PURE__ */ new Set(), queued_root_effects = [], last_scheduled_effect = null, is_flushing = !1, is_flushing_sync = !1;
var pe, ge, _e, ue, we, me, ve, q, ke, ce, $e, Me;
const Pe = class Pe {
  constructor() {
    F(this, q);
    L(this, "committed", !1);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    L(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    F(this, pe, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    F(this, ge, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    F(this, _e, 0);
    /**
     * The number of async effects that are currently in flight, _not_ inside a pending boundary
     */
    F(this, ue, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    F(this, we, null);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    F(this, me, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    F(this, ve, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    L(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    queued_root_effects = [], previous_batch = null, this.apply();
    var t = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: [],
      block_effects: []
    };
    for (const s of e)
      z(this, q, ke).call(this, s, t);
    z(this, q, $e).call(this), T(this, ue) > 0 ? (z(this, q, ce).call(this, t.effects), z(this, q, ce).call(this, t.render_effects), z(this, q, ce).call(this, t.block_effects)) : (previous_batch = this, current_batch = null, flush_queued_effects(t.render_effects), flush_queued_effects(t.effects), previous_batch = null), batch_values = null;
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, t) {
    T(this, pe).has(e) || T(this, pe).set(e, t), this.current.set(e, e.v), batch_values == null || batch_values.set(e, e.v);
  }
  activate() {
    current_batch = this;
  }
  deactivate() {
    current_batch = null, batch_values = null;
  }
  flush() {
    if (queued_root_effects.length > 0) {
      if (this.activate(), flush_effects(), current_batch !== null && current_batch !== this)
        return;
    } else
      z(this, q, $e).call(this);
    this.deactivate();
    for (const e of effect_pending_updates)
      if (effect_pending_updates.delete(e), e(), current_batch !== null)
        break;
  }
  /**
   *
   * @param {boolean} blocking
   */
  increment(e) {
    D(this, _e, T(this, _e) + 1), e && D(this, ue, T(this, ue) + 1);
  }
  /**
   *
   * @param {boolean} blocking
   */
  decrement(e) {
    D(this, _e, T(this, _e) - 1), e && D(this, ue, T(this, ue) - 1);
    for (const t of T(this, me))
      set_signal_status(t, DIRTY), schedule_effect(t);
    for (const t of T(this, ve))
      set_signal_status(t, MAYBE_DIRTY), schedule_effect(t);
    D(this, me, []), D(this, ve, []), this.flush();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    T(this, ge).add(e);
  }
  settled() {
    return (T(this, we) ?? D(this, we, deferred())).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const e = current_batch = new Pe();
      batches.add(current_batch), is_flushing_sync || Pe.enqueue(() => {
        current_batch === e && e.flush();
      });
    }
    return current_batch;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    queue_micro_task(e);
  }
  apply() {
  }
};
pe = new WeakMap(), ge = new WeakMap(), _e = new WeakMap(), ue = new WeakMap(), we = new WeakMap(), me = new WeakMap(), ve = new WeakMap(), q = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 * @param {EffectTarget} target
 */
ke = function(e, t) {
  var d;
  e.f ^= CLEAN;
  for (var s = e.first; s !== null; ) {
    var n = s.f, i = (n & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0, o = i && (n & CLEAN) !== 0, l = o || (n & INERT) !== 0 || this.skipped_effects.has(s);
    if (s.f & BOUNDARY_EFFECT && ((d = s.b) != null && d.is_pending()) && (t = {
      parent: t,
      effect: s,
      effects: [],
      render_effects: [],
      block_effects: []
    }), !l && s.fn !== null) {
      i ? s.f ^= CLEAN : n & EFFECT ? t.effects.push(s) : is_dirty(s) && (s.f & BLOCK_EFFECT && t.block_effects.push(s), update_effect(s));
      var c = s.first;
      if (c !== null) {
        s = c;
        continue;
      }
    }
    var u = s.parent;
    for (s = s.next; s === null && u !== null; )
      u === t.effect && (z(this, q, ce).call(this, t.effects), z(this, q, ce).call(this, t.render_effects), z(this, q, ce).call(this, t.block_effects), t = /** @type {EffectTarget} */
      t.parent), s = u.next, u = u.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
ce = function(e) {
  for (const t of e)
    (t.f & DIRTY ? T(this, me) : T(this, ve)).push(t), set_signal_status(t, CLEAN);
}, $e = function() {
  if (T(this, ue) === 0) {
    for (const e of T(this, ge)) e();
    T(this, ge).clear();
  }
  T(this, _e) === 0 && z(this, q, Me).call(this);
}, Me = function() {
  var n, i;
  if (batches.size > 1) {
    T(this, pe).clear();
    var e = batch_values, t = !0, s = {
      parent: null,
      effect: null,
      effects: [],
      render_effects: [],
      block_effects: []
    };
    for (const o of batches) {
      if (o === this) {
        t = !1;
        continue;
      }
      const l = [];
      for (const [u, d] of this.current) {
        if (o.current.has(u))
          if (t && d !== o.current.get(u))
            o.current.set(u, d);
          else
            continue;
        l.push(u);
      }
      if (l.length === 0)
        continue;
      const c = [...o.current.keys()].filter((u) => !this.current.has(u));
      if (c.length > 0) {
        const u = /* @__PURE__ */ new Set(), d = /* @__PURE__ */ new Map();
        for (const f of l)
          mark_effects(f, c, u, d);
        if (queued_root_effects.length > 0) {
          current_batch = o, o.apply();
          for (const f of queued_root_effects)
            z(n = o, q, ke).call(n, f, s);
          queued_root_effects = [], o.deactivate();
        }
      }
    }
    current_batch = null, batch_values = e;
  }
  this.committed = !0, batches.delete(this), (i = T(this, we)) == null || i.resolve();
};
let Batch = Pe;
function flushSync(r) {
  var e = is_flushing_sync;
  is_flushing_sync = !0;
  try {
    for (var t; ; ) {
      if (flush_tasks(), queued_root_effects.length === 0 && (current_batch == null || current_batch.flush(), queued_root_effects.length === 0))
        return last_scheduled_effect = null, /** @type {T} */
        t;
      flush_effects();
    }
  } finally {
    is_flushing_sync = e;
  }
}
function flush_effects() {
  var r = is_updating_effect;
  is_flushing = !0;
  try {
    var e = 0;
    for (set_is_updating_effect(!0); queued_root_effects.length > 0; ) {
      var t = Batch.ensure();
      if (e++ > 1e3) {
        var s, n;
        infinite_loop_guard();
      }
      t.process(queued_root_effects), old_values.clear();
    }
  } finally {
    is_flushing = !1, set_is_updating_effect(r), last_scheduled_effect = null;
  }
}
function infinite_loop_guard() {
  try {
    effect_update_depth_exceeded();
  } catch (r) {
    invoke_error_boundary(r, last_scheduled_effect);
  }
}
let eager_block_effects = null;
function flush_queued_effects(r) {
  var e = r.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var s = r[t++];
      if (!(s.f & (DESTROYED | INERT)) && is_dirty(s) && (eager_block_effects = /* @__PURE__ */ new Set(), update_effect(s), s.deps === null && s.first === null && s.nodes_start === null && (s.teardown === null && s.ac === null ? unlink_effect(s) : s.fn = null), (eager_block_effects == null ? void 0 : eager_block_effects.size) > 0)) {
        old_values.clear();
        for (const n of eager_block_effects) {
          if (n.f & (DESTROYED | INERT)) continue;
          const i = [n];
          let o = n.parent;
          for (; o !== null; )
            eager_block_effects.has(o) && (eager_block_effects.delete(o), i.push(o)), o = o.parent;
          for (let l = i.length - 1; l >= 0; l--) {
            const c = i[l];
            c.f & (DESTROYED | INERT) || update_effect(c);
          }
        }
        eager_block_effects.clear();
      }
    }
    eager_block_effects = null;
  }
}
function mark_effects(r, e, t, s) {
  if (!t.has(r) && (t.add(r), r.reactions !== null))
    for (const n of r.reactions) {
      const i = n.f;
      i & DERIVED ? mark_effects(
        /** @type {Derived} */
        n,
        e,
        t,
        s
      ) : i & (ASYNC | BLOCK_EFFECT) && !(i & DIRTY) && // we may have scheduled this one already
      depends_on(n, e, s) && (set_signal_status(n, DIRTY), schedule_effect(
        /** @type {Effect} */
        n
      ));
    }
}
function depends_on(r, e, t) {
  const s = t.get(r);
  if (s !== void 0) return s;
  if (r.deps !== null)
    for (const n of r.deps) {
      if (e.includes(n))
        return !0;
      if (n.f & DERIVED && depends_on(
        /** @type {Derived} */
        n,
        e,
        t
      ))
        return t.set(
          /** @type {Derived} */
          n,
          !0
        ), !0;
    }
  return t.set(r, !1), !1;
}
function schedule_effect(r) {
  for (var e = last_scheduled_effect = r; e.parent !== null; ) {
    e = e.parent;
    var t = e.f;
    if (is_flushing && e === active_effect && t & BLOCK_EFFECT)
      return;
    if (t & (ROOT_EFFECT | BRANCH_EFFECT)) {
      if (!(t & CLEAN)) return;
      e.f ^= CLEAN;
    }
  }
  queued_root_effects.push(e);
}
function createSubscriber(r) {
  let e = 0, t = source(0), s;
  return () => {
    effect_tracking() && (get$2(t), render_effect(() => (e === 0 && (s = untrack(() => r(() => increment(t)))), e += 1, () => {
      queue_micro_task(() => {
        e -= 1, e === 0 && (s == null || s(), s = void 0, increment(t));
      });
    })));
  };
}
var flags = EFFECT_TRANSPARENT | EFFECT_PRESERVED | BOUNDARY_EFFECT;
function boundary(r, e, t) {
  new Boundary(r, e, t);
}
var Y, H, be, Q, de, ee, K, W, te, se, oe, fe, ae, he, le, Ce, xe, G, Be, Ue, Re, Te, Ae, Ne;
class Boundary {
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   */
  constructor(e, t, s) {
    F(this, G);
    /** @type {Boundary | null} */
    L(this, "parent");
    F(this, Y, !1);
    /** @type {TemplateNode} */
    F(this, H);
    /** @type {TemplateNode | null} */
    F(this, be, hydrating ? hydrate_node : null);
    /** @type {BoundaryProps} */
    F(this, Q);
    /** @type {((anchor: Node) => void)} */
    F(this, de);
    /** @type {Effect} */
    F(this, ee);
    /** @type {Effect | null} */
    F(this, K, null);
    /** @type {Effect | null} */
    F(this, W, null);
    /** @type {Effect | null} */
    F(this, te, null);
    /** @type {DocumentFragment | null} */
    F(this, se, null);
    /** @type {TemplateNode | null} */
    F(this, oe, null);
    F(this, fe, 0);
    F(this, ae, 0);
    F(this, he, !1);
    /**
     * A source containing the number of pending async deriveds/expressions.
     * Only created if `$effect.pending()` is used inside the boundary,
     * otherwise updating the source results in needless `Batch.ensure()`
     * calls followed by no-op flushes
     * @type {Source<number> | null}
     */
    F(this, le, null);
    F(this, Ce, () => {
      T(this, le) && internal_set(T(this, le), T(this, fe));
    });
    F(this, xe, createSubscriber(() => (D(this, le, source(T(this, fe))), () => {
      D(this, le, null);
    })));
    D(this, H, e), D(this, Q, t), D(this, de, s), this.parent = /** @type {Effect} */
    active_effect.b, D(this, Y, !!T(this, Q).pending), D(this, ee, block(() => {
      if (active_effect.b = this, hydrating) {
        const i = T(this, be);
        hydrate_next(), /** @type {Comment} */
        i.nodeType === COMMENT_NODE && /** @type {Comment} */
        i.data === HYDRATION_START_ELSE ? z(this, G, Ue).call(this) : z(this, G, Be).call(this);
      } else {
        var n = z(this, G, Re).call(this);
        try {
          D(this, K, branch(() => s(n)));
        } catch (i) {
          this.error(i);
        }
        T(this, ae) > 0 ? z(this, G, Ae).call(this) : D(this, Y, !1);
      }
      return () => {
        var i;
        (i = T(this, oe)) == null || i.remove();
      };
    }, flags)), hydrating && D(this, H, hydrate_node);
  }
  /**
   * Returns `true` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_pending() {
    return T(this, Y) || !!this.parent && this.parent.is_pending();
  }
  has_pending_snippet() {
    return !!T(this, Q).pending;
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   */
  update_pending_count(e) {
    z(this, G, Ne).call(this, e), D(this, fe, T(this, fe) + e), effect_pending_updates.add(T(this, Ce));
  }
  get_effect_pending() {
    return T(this, xe).call(this), get$2(
      /** @type {Source<number>} */
      T(this, le)
    );
  }
  /** @param {unknown} error */
  error(e) {
    var t = T(this, Q).onerror;
    let s = T(this, Q).failed;
    if (T(this, he) || !t && !s)
      throw e;
    T(this, K) && (destroy_effect(T(this, K)), D(this, K, null)), T(this, W) && (destroy_effect(T(this, W)), D(this, W, null)), T(this, te) && (destroy_effect(T(this, te)), D(this, te, null)), hydrating && (set_hydrate_node(
      /** @type {TemplateNode} */
      T(this, be)
    ), next(), set_hydrate_node(skip_nodes()));
    var n = !1, i = !1;
    const o = () => {
      if (n) {
        svelte_boundary_reset_noop();
        return;
      }
      n = !0, i && svelte_boundary_reset_onerror(), Batch.ensure(), D(this, fe, 0), T(this, te) !== null && pause_effect(T(this, te), () => {
        D(this, te, null);
      }), D(this, Y, this.has_pending_snippet()), D(this, K, z(this, G, Te).call(this, () => (D(this, he, !1), branch(() => T(this, de).call(this, T(this, H)))))), T(this, ae) > 0 ? z(this, G, Ae).call(this) : D(this, Y, !1);
    };
    var l = active_reaction;
    try {
      set_active_reaction(null), i = !0, t == null || t(e, o), i = !1;
    } catch (c) {
      invoke_error_boundary(c, T(this, ee) && T(this, ee).parent);
    } finally {
      set_active_reaction(l);
    }
    s && queue_micro_task(() => {
      D(this, te, z(this, G, Te).call(this, () => {
        Batch.ensure(), D(this, he, !0);
        try {
          return branch(() => {
            s(
              T(this, H),
              () => e,
              () => o
            );
          });
        } catch (c) {
          return invoke_error_boundary(
            c,
            /** @type {Effect} */
            T(this, ee).parent
          ), null;
        } finally {
          D(this, he, !1);
        }
      }));
    });
  }
}
Y = new WeakMap(), H = new WeakMap(), be = new WeakMap(), Q = new WeakMap(), de = new WeakMap(), ee = new WeakMap(), K = new WeakMap(), W = new WeakMap(), te = new WeakMap(), se = new WeakMap(), oe = new WeakMap(), fe = new WeakMap(), ae = new WeakMap(), he = new WeakMap(), le = new WeakMap(), Ce = new WeakMap(), xe = new WeakMap(), G = new WeakSet(), Be = function() {
  try {
    D(this, K, branch(() => T(this, de).call(this, T(this, H))));
  } catch (e) {
    this.error(e);
  }
  D(this, Y, !1);
}, Ue = function() {
  const e = T(this, Q).pending;
  e && (D(this, W, branch(() => e(T(this, H)))), Batch.enqueue(() => {
    var t = z(this, G, Re).call(this);
    D(this, K, z(this, G, Te).call(this, () => (Batch.ensure(), branch(() => T(this, de).call(this, t))))), T(this, ae) > 0 ? z(this, G, Ae).call(this) : (pause_effect(
      /** @type {Effect} */
      T(this, W),
      () => {
        D(this, W, null);
      }
    ), D(this, Y, !1));
  }));
}, Re = function() {
  var e = T(this, H);
  return T(this, Y) && (D(this, oe, create_text()), T(this, H).before(T(this, oe)), e = T(this, oe)), e;
}, /**
 * @param {() => Effect | null} fn
 */
Te = function(e) {
  var t = active_effect, s = active_reaction, n = component_context;
  set_active_effect(T(this, ee)), set_active_reaction(T(this, ee)), set_component_context(T(this, ee).ctx);
  try {
    return e();
  } catch (i) {
    return handle_error(i), null;
  } finally {
    set_active_effect(t), set_active_reaction(s), set_component_context(n);
  }
}, Ae = function() {
  const e = (
    /** @type {(anchor: Node) => void} */
    T(this, Q).pending
  );
  T(this, K) !== null && (D(this, se, document.createDocumentFragment()), T(this, se).append(
    /** @type {TemplateNode} */
    T(this, oe)
  ), move_effect(T(this, K), T(this, se))), T(this, W) === null && D(this, W, branch(() => e(T(this, H))));
}, /**
 * Updates the pending count associated with the currently visible pending snippet,
 * if any, such that we can replace the snippet with content once work is done
 * @param {1 | -1} d
 */
Ne = function(e) {
  var t;
  if (!this.has_pending_snippet()) {
    this.parent && z(t = this.parent, G, Ne).call(t, e);
    return;
  }
  D(this, ae, T(this, ae) + e), T(this, ae) === 0 && (D(this, Y, !1), T(this, W) && pause_effect(T(this, W), () => {
    D(this, W, null);
  }), T(this, se) && (T(this, H).before(T(this, se)), D(this, se, null)));
};
function flatten(r, e, t) {
  const s = is_runes() ? derived : derived_safe_equal;
  if (e.length === 0) {
    t(r.map(s));
    return;
  }
  var n = current_batch, i = (
    /** @type {Effect} */
    active_effect
  ), o = capture(), l = hydrating;
  Promise.all(e.map((c) => /* @__PURE__ */ async_derived(c))).then((c) => {
    o();
    try {
      t([...r.map(s), ...c]);
    } catch (u) {
      i.f & DESTROYED || invoke_error_boundary(u, i);
    }
    l && set_hydrating(!1), n == null || n.deactivate(), unset_context();
  }).catch((c) => {
    invoke_error_boundary(c, i);
  });
}
function capture() {
  var r = active_effect, e = active_reaction, t = component_context, s = current_batch, n = hydrating;
  if (n)
    var i = hydrate_node;
  return function() {
    set_active_effect(r), set_active_reaction(e), set_component_context(t), s == null || s.activate(), n && (set_hydrating(!0), set_hydrate_node(i));
  };
}
function unset_context() {
  set_active_effect(null), set_active_reaction(null), set_component_context(null);
}
// @__NO_SIDE_EFFECTS__
function derived(r) {
  var e = DERIVED | DIRTY, t = active_reaction !== null && active_reaction.f & DERIVED ? (
    /** @type {Derived} */
    active_reaction
  ) : null;
  return active_effect === null || t !== null && t.f & UNOWNED ? e |= UNOWNED : active_effect.f |= EFFECT_PRESERVED, {
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
      UNINITIALIZED
    ),
    wv: 0,
    parent: t ?? active_effect,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function async_derived(r, e) {
  let t = (
    /** @type {Effect | null} */
    active_effect
  );
  t === null && async_derived_orphan();
  var s = (
    /** @type {Boundary} */
    t.b
  ), n = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = source(
    /** @type {V} */
    UNINITIALIZED
  ), o = !active_reaction, l = /* @__PURE__ */ new Map();
  return async_effect(() => {
    var p;
    var c = deferred();
    n = c.promise;
    try {
      Promise.resolve(r()).then(c.resolve, c.reject).then(() => {
        u === current_batch && u.committed && u.deactivate(), unset_context();
      });
    } catch (g) {
      c.reject(g), unset_context();
    }
    var u = (
      /** @type {Batch} */
      current_batch
    );
    if (o) {
      var d = !s.is_pending();
      s.update_pending_count(1), u.increment(d), (p = l.get(u)) == null || p.reject(STALE_REACTION), l.delete(u), l.set(u, c);
    }
    const f = (g, h = void 0) => {
      if (u.activate(), h)
        h !== STALE_REACTION && (i.f |= ERROR_VALUE, internal_set(i, h));
      else {
        i.f & ERROR_VALUE && (i.f ^= ERROR_VALUE), internal_set(i, g);
        for (const [_, m] of l) {
          if (l.delete(_), _ === u) break;
          m.reject(STALE_REACTION);
        }
      }
      o && (s.update_pending_count(-1), u.decrement(d));
    };
    c.promise.then(f, (g) => f(null, g || "unknown"));
  }), teardown(() => {
    for (const c of l.values())
      c.reject(STALE_REACTION);
  }), new Promise((c) => {
    function u(d) {
      function f() {
        d === n ? c(i) : u(n);
      }
      d.then(f, f);
    }
    u(n);
  });
}
// @__NO_SIDE_EFFECTS__
function user_derived(r) {
  const e = /* @__PURE__ */ derived(r);
  return push_reaction_value(e), e;
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
    r.f &= ~WAS_MARKED, destroy_derived_effects(r), e = update_reaction(r);
  } finally {
    set_active_effect(t);
  }
  return e;
}
function update_derived(r) {
  var e = execute_derived(r);
  if (r.equals(e) || (r.v = e, r.wv = increment_write_version()), !is_destroying_effect)
    if (batch_values !== null)
      batch_values.set(r, r.v);
    else {
      var t = (skip_reaction || r.f & UNOWNED) && r.deps !== null ? MAYBE_DIRTY : CLEAN;
      set_signal_status(r, t);
    }
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
function mutable_source(r, e = !1, t = !0) {
  var n;
  const s = source(r);
  return e || (s.equals = safe_equals), legacy_mode_flag && t && component_context !== null && component_context.l !== null && ((n = component_context.l).s ?? (n.s = [])).push(s), s;
}
function mutate(r, e) {
  return set(
    r,
    untrack(() => get$2(r))
  ), e;
}
function set(r, e, t = !1) {
  active_reaction !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!untracking || active_reaction.f & INSPECT_EFFECT) && is_runes() && active_reaction.f & (DERIVED | BLOCK_EFFECT | ASYNC | INSPECT_EFFECT) && !(current_sources != null && current_sources.includes(r)) && state_unsafe_mutation();
  let s = t ? proxy(e) : e;
  return internal_set(r, s);
}
function internal_set(r, e) {
  if (!r.equals(e)) {
    var t = r.v;
    is_destroying_effect ? old_values.set(r, e) : old_values.set(r, t), r.v = e;
    var s = Batch.ensure();
    s.capture(r, t), r.f & DERIVED && (r.f & DIRTY && execute_derived(
      /** @type {Derived} */
      r
    ), set_signal_status(r, r.f & UNOWNED ? MAYBE_DIRTY : CLEAN)), r.wv = increment_write_version(), mark_reactions(r, DIRTY), is_runes() && active_effect !== null && active_effect.f & CLEAN && !(active_effect.f & (BRANCH_EFFECT | ROOT_EFFECT)) && (untracked_writes === null ? set_untracked_writes([r]) : untracked_writes.push(r));
  }
  return e;
}
function increment(r) {
  set(r, r.v + 1);
}
function mark_reactions(r, e) {
  var t = r.reactions;
  if (t !== null)
    for (var s = is_runes(), n = t.length, i = 0; i < n; i++) {
      var o = t[i], l = o.f;
      if (!(!s && o === active_effect)) {
        var c = (l & DIRTY) === 0;
        c && set_signal_status(o, e), l & DERIVED ? l & WAS_MARKED || (o.f |= WAS_MARKED, mark_reactions(
          /** @type {Derived} */
          o,
          MAYBE_DIRTY
        )) : c && (l & BLOCK_EFFECT && eager_block_effects !== null && eager_block_effects.add(
          /** @type {Effect} */
          o
        ), schedule_effect(
          /** @type {Effect} */
          o
        ));
      }
    }
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
  const n = r.__on_r;
  n ? r.__on_r = () => {
    n(), s(!0);
  } : r.__on_r = () => s(!0), add_form_reset_listener();
}
let is_updating_effect = !1;
function set_is_updating_effect(r) {
  is_updating_effect = r;
}
let is_destroying_effect = !1;
function set_is_destroying_effect(r) {
  is_destroying_effect = r;
}
let active_reaction = null, untracking = !1;
function set_active_reaction(r) {
  active_reaction = r;
}
let active_effect = null;
function set_active_effect(r) {
  active_effect = r;
}
let current_sources = null;
function push_reaction_value(r) {
  active_reaction !== null && (current_sources === null ? current_sources = [r] : current_sources.push(r));
}
let new_deps = null, skipped_deps = 0, untracked_writes = null;
function set_untracked_writes(r) {
  untracked_writes = r;
}
let write_version = 1, read_version = 0, update_version = read_version;
function set_update_version(r) {
  update_version = r;
}
let skip_reaction = !1;
function increment_write_version() {
  return ++write_version;
}
function is_dirty(r) {
  var f;
  var e = r.f;
  if (e & DIRTY)
    return !0;
  if (e & MAYBE_DIRTY) {
    var t = r.deps, s = (e & UNOWNED) !== 0;
    if (e & DERIVED && (r.f &= ~WAS_MARKED), t !== null) {
      var n, i, o = (e & DISCONNECTED) !== 0, l = s && active_effect !== null && !skip_reaction, c = t.length;
      if ((o || l) && (active_effect === null || !(active_effect.f & DESTROYED))) {
        var u = (
          /** @type {Derived} */
          r
        ), d = u.parent;
        for (n = 0; n < c; n++)
          i = t[n], (o || !((f = i == null ? void 0 : i.reactions) != null && f.includes(u))) && (i.reactions ?? (i.reactions = [])).push(u);
        o && (u.f ^= DISCONNECTED), l && d !== null && !(d.f & UNOWNED) && (u.f ^= UNOWNED);
      }
      for (n = 0; n < c; n++)
        if (i = t[n], is_dirty(
          /** @type {Derived} */
          i
        ) && update_derived(
          /** @type {Derived} */
          i
        ), i.wv > r.wv)
          return !0;
    }
    (!s || active_effect !== null && !skip_reaction) && set_signal_status(r, CLEAN);
  }
  return !1;
}
function schedule_possible_effect_self_invalidation(r, e, t = !0) {
  var s = r.reactions;
  if (s !== null && !(current_sources != null && current_sources.includes(r)))
    for (var n = 0; n < s.length; n++) {
      var i = s[n];
      i.f & DERIVED ? schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        i,
        e,
        !1
      ) : e === i && (t ? set_signal_status(i, DIRTY) : i.f & CLEAN && set_signal_status(i, MAYBE_DIRTY), schedule_effect(
        /** @type {Effect} */
        i
      ));
    }
}
function update_reaction(r) {
  var _;
  var e = new_deps, t = skipped_deps, s = untracked_writes, n = active_reaction, i = skip_reaction, o = current_sources, l = component_context, c = untracking, u = update_version, d = r.f;
  new_deps = /** @type {null | Value[]} */
  null, skipped_deps = 0, untracked_writes = null, skip_reaction = (d & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null), active_reaction = d & (BRANCH_EFFECT | ROOT_EFFECT) ? null : r, current_sources = null, set_component_context(r.ctx), untracking = !1, update_version = ++read_version, r.ac !== null && (without_reactive_context(() => {
    r.ac.abort(STALE_REACTION);
  }), r.ac = null);
  try {
    r.f |= REACTION_IS_UPDATING;
    var f = (
      /** @type {Function} */
      r.fn
    ), p = f(), g = r.deps;
    if (new_deps !== null) {
      var h;
      if (remove_reactions(r, skipped_deps), g !== null && skipped_deps > 0)
        for (g.length = skipped_deps + new_deps.length, h = 0; h < new_deps.length; h++)
          g[skipped_deps + h] = new_deps[h];
      else
        r.deps = g = new_deps;
      if (!skip_reaction || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      d & DERIVED && /** @type {import('#client').Derived} */
      r.reactions !== null)
        for (h = skipped_deps; h < g.length; h++)
          ((_ = g[h]).reactions ?? (_.reactions = [])).push(r);
    } else g !== null && skipped_deps < g.length && (remove_reactions(r, skipped_deps), g.length = skipped_deps);
    if (is_runes() && untracked_writes !== null && !untracking && g !== null && !(r.f & (DERIVED | MAYBE_DIRTY | DIRTY)))
      for (h = 0; h < /** @type {Source[]} */
      untracked_writes.length; h++)
        schedule_possible_effect_self_invalidation(
          untracked_writes[h],
          /** @type {Effect} */
          r
        );
    return n !== null && n !== r && (read_version++, untracked_writes !== null && (s === null ? s = untracked_writes : s.push(.../** @type {Source[]} */
    untracked_writes))), r.f & ERROR_VALUE && (r.f ^= ERROR_VALUE), p;
  } catch (m) {
    return handle_error(m);
  } finally {
    r.f ^= REACTION_IS_UPDATING, new_deps = e, skipped_deps = t, untracked_writes = s, active_reaction = n, skip_reaction = i, current_sources = o, set_component_context(l), untracking = c, update_version = u;
  }
}
function remove_reaction(r, e) {
  let t = e.reactions;
  if (t !== null) {
    var s = index_of.call(t, r);
    if (s !== -1) {
      var n = t.length - 1;
      n === 0 ? t = e.reactions = null : (t[s] = t[n], t.pop());
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
    var t = active_effect, s = is_updating_effect;
    active_effect = r, is_updating_effect = !0;
    try {
      e & BLOCK_EFFECT ? destroy_block_effect_children(r) : destroy_effect_children(r), execute_effect_teardown(r);
      var n = update_reaction(r);
      r.teardown = typeof n == "function" ? n : null, r.wv = write_version;
      var i;
      DEV && tracing_mode_flag && r.f & DIRTY && r.deps;
    } finally {
      is_updating_effect = s, active_effect = t;
    }
  }
}
async function tick() {
  await Promise.resolve(), flushSync();
}
function get$2(r) {
  var e = r.f, t = (e & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    var s = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!s && !(current_sources != null && current_sources.includes(r))) {
      var n = active_reaction.deps;
      if (active_reaction.f & REACTION_IS_UPDATING)
        r.rv < read_version && (r.rv = read_version, new_deps === null && n !== null && n[skipped_deps] === r ? skipped_deps++ : new_deps === null ? new_deps = [r] : (!skip_reaction || !new_deps.includes(r)) && new_deps.push(r));
      else {
        (active_reaction.deps ?? (active_reaction.deps = [])).push(r);
        var i = r.reactions;
        i === null ? r.reactions = [active_reaction] : i.includes(active_reaction) || i.push(active_reaction);
      }
    }
  } else if (t && /** @type {Derived} */
  r.deps === null && /** @type {Derived} */
  r.effects === null) {
    var o = (
      /** @type {Derived} */
      r
    ), l = o.parent;
    l !== null && !(l.f & UNOWNED) && (o.f ^= UNOWNED);
  }
  if (is_destroying_effect) {
    if (old_values.has(r))
      return old_values.get(r);
    if (t) {
      o = /** @type {Derived} */
      r;
      var c = o.v;
      return (!(o.f & CLEAN) && o.reactions !== null || depends_on_old_values(o)) && (c = execute_derived(o)), old_values.set(o, c), c;
    }
  } else if (t) {
    if (o = /** @type {Derived} */
    r, batch_values != null && batch_values.has(o))
      return batch_values.get(o);
    is_dirty(o) && update_derived(o);
  }
  if (batch_values != null && batch_values.has(r))
    return batch_values.get(r);
  if (r.f & ERROR_VALUE)
    throw r.v;
  return r.v;
}
function depends_on_old_values(r) {
  if (r.v === UNINITIALIZED) return !0;
  if (r.deps === null) return !1;
  for (const e of r.deps)
    if (old_values.has(e) || e.f & DERIVED && depends_on_old_values(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
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
      for (let n in s) {
        const i = s[n].get;
        if (i)
          try {
            i.call(r);
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
  var n = active_effect;
  n !== null && n.f & INERT && (r |= INERT);
  var i = {
    ctx: component_context,
    deps: null,
    nodes_start: null,
    nodes_end: null,
    f: r | DIRTY,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (t)
    try {
      update_effect(i), i.f |= EFFECT_RAN;
    } catch (c) {
      throw destroy_effect(i), c;
    }
  else e !== null && schedule_effect(i);
  if (s) {
    var o = i;
    if (t && o.deps === null && o.teardown === null && o.nodes_start === null && o.first === o.last && // either `null`, or a singular child
    !(o.f & EFFECT_PRESERVED) && (o = o.first, r & BLOCK_EFFECT && r & EFFECT_TRANSPARENT && o !== null && (o.f |= EFFECT_TRANSPARENT)), o !== null && (o.parent = n, n !== null && push_effect(o, n), active_reaction !== null && active_reaction.f & DERIVED && !(r & ROOT_EFFECT))) {
      var l = (
        /** @type {Derived} */
        active_reaction
      );
      (l.effects ?? (l.effects = [])).push(o);
    }
  }
  return i;
}
function effect_tracking() {
  return active_reaction !== null && !untracking;
}
function teardown(r) {
  const e = create_effect(RENDER_EFFECT, null, !1);
  return set_signal_status(e, CLEAN), e.teardown = r, e;
}
function user_effect(r) {
  validate_effect();
  var e = (
    /** @type {Effect} */
    active_effect.f
  ), t = !active_reaction && (e & BRANCH_EFFECT) !== 0 && (e & EFFECT_RAN) === 0;
  if (t) {
    var s = (
      /** @type {ComponentContext} */
      component_context
    );
    (s.e ?? (s.e = [])).push(r);
  } else
    return create_user_effect(r);
}
function create_user_effect(r) {
  return create_effect(EFFECT | USER_EFFECT, r, !1);
}
function user_pre_effect(r) {
  return validate_effect(), create_effect(RENDER_EFFECT | USER_EFFECT, r, !0);
}
function effect_root(r) {
  Batch.ensure();
  const e = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, r, !0);
  return () => {
    destroy_effect(e);
  };
}
function component_root(r) {
  Batch.ensure();
  const e = create_effect(ROOT_EFFECT | EFFECT_PRESERVED, r, !0);
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
  ), s = { effect: null, ran: !1, deps: r };
  t.l.$.push(s), s.effect = render_effect(() => {
    r(), !s.ran && (s.ran = !0, untrack(e));
  });
}
function legacy_pre_effect_reset() {
  var r = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  render_effect(() => {
    for (var e of r.l.$) {
      e.deps();
      var t = e.effect;
      t.f & CLEAN && set_signal_status(t, MAYBE_DIRTY), is_dirty(t) && update_effect(t), e.ran = !1;
    }
  });
}
function async_effect(r) {
  return create_effect(ASYNC | EFFECT_PRESERVED, r, !0);
}
function render_effect(r, e = 0) {
  return create_effect(RENDER_EFFECT | e, r, !0);
}
function template_effect(r, e = [], t = []) {
  flatten(e, t, (s) => {
    create_effect(RENDER_EFFECT, () => r(...s.map(get$2)), !0);
  });
}
function block(r, e = 0) {
  var t = create_effect(BLOCK_EFFECT | e, r, !0);
  return t;
}
function branch(r, e = !0) {
  return create_effect(BRANCH_EFFECT | EFFECT_PRESERVED, r, !0, e);
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
    const n = t.ac;
    n !== null && without_reactive_context(() => {
      n.abort(STALE_REACTION);
    });
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
  (e || r.f & HEAD_EFFECT) && r.nodes_start !== null && r.nodes_end !== null && (remove_effect_dom(
    r.nodes_start,
    /** @type {TemplateNode} */
    r.nodes_end
  ), t = !0), destroy_effect_children(r, e && !t), remove_reactions(r, 0), set_signal_status(r, DESTROYED);
  var s = r.transitions;
  if (s !== null)
    for (const i of s)
      i.stop();
  execute_effect_teardown(r);
  var n = r.parent;
  n !== null && n.first !== null && unlink_effect(r), r.next = r.prev = r.teardown = r.ctx = r.deps = r.fn = r.nodes_start = r.nodes_end = r.ac = null;
}
function remove_effect_dom(r, e) {
  for (; r !== null; ) {
    var t = r === e ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(r)
    );
    r.remove(), r = t;
  }
}
function unlink_effect(r) {
  var e = r.parent, t = r.prev, s = r.next;
  t !== null && (t.next = s), s !== null && (s.prev = t), e !== null && (e.first === r && (e.first = s), e.last === r && (e.last = t));
}
function pause_effect(r, e, t = !0) {
  var s = [];
  pause_children(r, s, !0), run_out_transitions(s, () => {
    t && destroy_effect(r), e && e();
  });
}
function run_out_transitions(r, e) {
  var t = r.length;
  if (t > 0) {
    var s = () => --t || e();
    for (var n of r)
      n.out(s);
  } else
    e();
}
function pause_children(r, e, t) {
  if (!(r.f & INERT)) {
    if (r.f ^= INERT, r.transitions !== null)
      for (const o of r.transitions)
        (o.is_global || t) && e.push(o);
    for (var s = r.first; s !== null; ) {
      var n = s.next, i = (s.f & EFFECT_TRANSPARENT) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (s.f & BRANCH_EFFECT) !== 0 && (r.f & BLOCK_EFFECT) !== 0;
      pause_children(s, e, i ? t : !1), s = n;
    }
  }
}
function resume_effect(r) {
  resume_children(r, !0);
}
function resume_children(r, e) {
  if (r.f & INERT) {
    r.f ^= INERT, r.f & CLEAN || (set_signal_status(r, DIRTY), schedule_effect(r));
    for (var t = r.first; t !== null; ) {
      var s = t.next, n = (t.f & EFFECT_TRANSPARENT) !== 0 || (t.f & BRANCH_EFFECT) !== 0;
      resume_children(t, n ? e : !1), t = s;
    }
    if (r.transitions !== null)
      for (const i of r.transitions)
        (i.is_global || e) && i.in();
  }
}
function move_effect(r, e) {
  for (var t = r.nodes_start, s = r.nodes_end; t !== null; ) {
    var n = t === s ? null : (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(t)
    );
    e.append(t), t = n;
  }
}
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(r) {
  return PASSIVE_EVENTS.includes(r);
}
const all_registered_events = /* @__PURE__ */ new Set(), root_event_handles = /* @__PURE__ */ new Set();
function create_event(r, e, t, s = {}) {
  function n(i) {
    if (s.capture || handle_event_propagation.call(e, i), !i.cancelBubble)
      return without_reactive_context(() => t == null ? void 0 : t.call(this, i));
  }
  return r.startsWith("pointer") || r.startsWith("touch") || r === "wheel" ? queue_micro_task(() => {
    e.addEventListener(r, n, s);
  }) : e.addEventListener(r, n, s), n;
}
function event$1(r, e, t, s, n) {
  var i = { capture: s, passive: n }, o = create_event(r, e, t, i);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && teardown(() => {
    e.removeEventListener(r, o, i);
  });
}
function delegate(r) {
  for (var e = 0; e < r.length; e++)
    all_registered_events.add(r[e]);
  for (var t of root_event_handles)
    t(r);
}
let last_propagated_event = null;
function handle_event_propagation(r) {
  var w;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), s = r.type, n = ((w = r.composedPath) == null ? void 0 : w.call(r)) || [], i = (
    /** @type {null | Element} */
    n[0] || r.target
  );
  last_propagated_event = r;
  var o = 0, l = last_propagated_event === r && r.__root;
  if (l) {
    var c = n.indexOf(l);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      r.__root = e;
      return;
    }
    var u = n.indexOf(e);
    if (u === -1)
      return;
    c <= u && (o = c);
  }
  if (i = /** @type {Element} */
  n[o] || r.target, i !== e) {
    define_property(r, "currentTarget", {
      configurable: !0,
      get() {
        return i || t;
      }
    });
    var d = active_reaction, f = active_effect;
    set_active_reaction(null), set_active_effect(null);
    try {
      for (var p, g = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var _ = i["__" + s];
          if (_ != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          r.target === i))
            if (is_array(_)) {
              var [m, ...y] = _;
              m.apply(i, [r, ...y]);
            } else
              _.call(i, r);
        } catch (v) {
          p ? g.push(v) : p = v;
        }
        if (r.cancelBubble || h === e || h === null)
          break;
        i = h;
      }
      if (p) {
        for (let v of g)
          queueMicrotask(() => {
            throw v;
          });
        throw p;
      }
    } finally {
      r.__root = e, delete r.currentTarget, set_active_reaction(d), set_active_effect(f);
    }
  }
}
function create_fragment_from_html(r) {
  var e = document.createElement("template");
  return e.innerHTML = r.replaceAll("<!>", "<!---->"), e.content;
}
function assign_nodes(r, e) {
  var t = (
    /** @type {Effect} */
    active_effect
  );
  t.nodes_start === null && (t.nodes_start = r, t.nodes_end = e);
}
// @__NO_SIDE_EFFECTS__
function from_html(r, e) {
  var t = (e & TEMPLATE_FRAGMENT) !== 0, s = (e & TEMPLATE_USE_IMPORT_NODE) !== 0, n, i = !r.startsWith("<!>");
  return () => {
    if (hydrating)
      return assign_nodes(hydrate_node, null), hydrate_node;
    n === void 0 && (n = create_fragment_from_html(i ? r : "<!>" + r), t || (n = /** @type {Node} */
    /* @__PURE__ */ get_first_child(n)));
    var o = (
      /** @type {TemplateNode} */
      s || is_firefox ? document.importNode(n, !0) : n.cloneNode(!0)
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
  return t.nodeType !== TEXT_NODE && (t.before(t = create_text()), set_hydrate_node(t)), assign_nodes(t, t), t;
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
  const t = e.target, s = hydrating, n = hydrate_node;
  try {
    for (var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(t)
    ); i && (i.nodeType !== COMMENT_NODE || /** @type {Comment} */
    i.data !== HYDRATION_START); )
      i = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(i);
    if (!i)
      throw HYDRATION_ERROR;
    set_hydrating(!0), set_hydrate_node(
      /** @type {Comment} */
      i
    );
    const o = _mount(r, { ...e, anchor: i });
    return set_hydrating(!1), /**  @type {Exports} */
    o;
  } catch (o) {
    if (o instanceof Error && o.message.split(`
`).some((l) => l.startsWith("https://svelte.dev/e/")))
      throw o;
    return o !== HYDRATION_ERROR && console.warn("Failed to hydrate: ", o), e.recover === !1 && hydration_failed(), init_operations(), clear_text_content(t), set_hydrating(!1), mount(r, e);
  } finally {
    set_hydrating(s), set_hydrate_node(n);
  }
}
const document_listeners = /* @__PURE__ */ new Map();
function _mount(r, { target: e, anchor: t, props: s = {}, events: n, context: i, intro: o = !0 }) {
  init_operations();
  var l = /* @__PURE__ */ new Set(), c = (f) => {
    for (var p = 0; p < f.length; p++) {
      var g = f[p];
      if (!l.has(g)) {
        l.add(g);
        var h = is_passive_event(g);
        e.addEventListener(g, handle_event_propagation, { passive: h });
        var _ = document_listeners.get(g);
        _ === void 0 ? (document.addEventListener(g, handle_event_propagation, { passive: h }), document_listeners.set(g, 1)) : document_listeners.set(g, _ + 1);
      }
    }
  };
  c(array_from(all_registered_events)), root_event_handles.add(c);
  var u = void 0, d = component_root(() => {
    var f = t ?? e.appendChild(create_text());
    return boundary(
      /** @type {TemplateNode} */
      f,
      {
        pending: () => {
        }
      },
      (p) => {
        if (i) {
          push({});
          var g = (
            /** @type {ComponentContext} */
            component_context
          );
          g.c = i;
        }
        if (n && (s.$$events = n), hydrating && assign_nodes(
          /** @type {TemplateNode} */
          p,
          null
        ), should_intro = o, u = r(p, s) || {}, should_intro = !0, hydrating && (active_effect.nodes_end = hydrate_node, hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
        hydrate_node.data !== HYDRATION_END))
          throw hydration_mismatch(), HYDRATION_ERROR;
        i && pop();
      }
    ), () => {
      var h;
      for (var p of l) {
        e.removeEventListener(p, handle_event_propagation);
        var g = (
          /** @type {number} */
          document_listeners.get(p)
        );
        --g === 0 ? (document.removeEventListener(p, handle_event_propagation), document_listeners.delete(p)) : document_listeners.set(p, g);
      }
      root_event_handles.delete(c), f !== t && ((h = f.parentNode) == null || h.removeChild(f));
    };
  });
  return mounted_components.set(u, d), u;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(r, e) {
  const t = mounted_components.get(r);
  return t ? (mounted_components.delete(r), t(e)) : Promise.resolve();
}
var ne, re, Z, Ee, Se;
class BranchManager {
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(e, t = !0) {
    /** @type {TemplateNode} */
    L(this, "anchor");
    /** @type {Map<Batch, Key>} */
    F(this, ne, /* @__PURE__ */ new Map());
    /** @type {Map<Key, Effect>} */
    F(this, re, /* @__PURE__ */ new Map());
    /** @type {Map<Key, Branch>} */
    F(this, Z, /* @__PURE__ */ new Map());
    /**
     * Whether to pause (i.e. outro) on change, or destroy immediately.
     * This is necessary for `<svelte:element>`
     */
    F(this, Ee, !0);
    F(this, Se, () => {
      var e = (
        /** @type {Batch} */
        current_batch
      );
      if (T(this, ne).has(e)) {
        var t = (
          /** @type {Key} */
          T(this, ne).get(e)
        ), s = T(this, re).get(t);
        if (s)
          resume_effect(s);
        else {
          var n = T(this, Z).get(t);
          n && (T(this, re).set(t, n.effect), T(this, Z).delete(t), n.fragment.lastChild.remove(), this.anchor.before(n.fragment), s = n.effect);
        }
        for (const [i, o] of T(this, ne)) {
          if (T(this, ne).delete(i), i === e)
            break;
          const l = T(this, Z).get(o);
          l && (destroy_effect(l.effect), T(this, Z).delete(o));
        }
        for (const [i, o] of T(this, re)) {
          if (i === t) continue;
          const l = () => {
            if (Array.from(T(this, ne).values()).includes(i)) {
              var u = document.createDocumentFragment();
              move_effect(o, u), u.append(create_text()), T(this, Z).set(i, { effect: o, fragment: u });
            } else
              destroy_effect(o);
            T(this, re).delete(i);
          };
          T(this, Ee) || !s ? pause_effect(o, l, !1) : l();
        }
      }
    });
    this.anchor = e, D(this, Ee, t);
  }
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(e, t) {
    var s = (
      /** @type {Batch} */
      current_batch
    ), n = should_defer_append();
    if (t && !T(this, re).has(e) && !T(this, Z).has(e))
      if (n) {
        var i = document.createDocumentFragment(), o = create_text();
        i.append(o), T(this, Z).set(e, {
          effect: branch(() => t(o)),
          fragment: i
        });
      } else
        T(this, re).set(
          e,
          branch(() => t(this.anchor))
        );
    if (T(this, ne).set(s, e), n) {
      for (const [l, c] of T(this, re))
        l === e ? s.skipped_effects.delete(c) : s.skipped_effects.add(c);
      for (const [l, c] of T(this, Z))
        l === e ? s.skipped_effects.delete(c.effect) : s.skipped_effects.add(c.effect);
      s.add_callback(T(this, Se));
    } else
      hydrating && (this.anchor = hydrate_node), T(this, Se).call(this);
  }
}
ne = new WeakMap(), re = new WeakMap(), Z = new WeakMap(), Ee = new WeakMap(), Se = new WeakMap();
function if_block(r, e, t = !1) {
  hydrating && hydrate_next();
  var s = new BranchManager(r), n = t ? EFFECT_TRANSPARENT : 0;
  function i(o, l) {
    if (hydrating) {
      const u = read_hydration_instruction(r) === HYDRATION_START_ELSE;
      if (o === u) {
        var c = skip_nodes();
        set_hydrate_node(c), s.anchor = c, set_hydrating(!1), s.ensure(o, l), set_hydrating(!0);
        return;
      }
    }
    s.ensure(o, l);
  }
  block(() => {
    var o = !1;
    e((l, c = !0) => {
      o = !0, i(c, l);
    }), o || i(!1, null);
  }, n);
}
function index(r, e) {
  return e;
}
function pause_effects(r, e, t) {
  for (var s = r.items, n = [], i = e.length, o = 0; o < i; o++)
    pause_children(e[o].e, n, !0);
  var l = i > 0 && n.length === 0 && t !== null;
  if (l) {
    var c = (
      /** @type {Element} */
      /** @type {Element} */
      t.parentNode
    );
    clear_text_content(c), c.append(
      /** @type {Element} */
      t
    ), s.clear(), link(r, e[0].prev, e[i - 1].next);
  }
  run_out_transitions(n, () => {
    for (var u = 0; u < i; u++) {
      var d = e[u];
      l || (s.delete(d.k), link(r, d.prev, d.next)), destroy_effect(d.e, !l);
    }
  });
}
function each(r, e, t, s, n, i = null) {
  var o = r, l = { flags: e, items: /* @__PURE__ */ new Map(), first: null }, c = (e & EACH_IS_CONTROLLED) !== 0;
  if (c) {
    var u = (
      /** @type {Element} */
      r
    );
    o = hydrating ? set_hydrate_node(
      /** @type {Comment | Text} */
      /* @__PURE__ */ get_first_child(u)
    ) : u.appendChild(create_text());
  }
  hydrating && hydrate_next();
  var d = null, f = !1, p = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ derived_safe_equal(() => {
    var y = t();
    return is_array(y) ? y : y == null ? [] : array_from(y);
  }), h, _;
  function m() {
    reconcile(
      _,
      h,
      l,
      p,
      o,
      n,
      e,
      s,
      t
    ), i !== null && (h.length === 0 ? d ? resume_effect(d) : d = branch(() => i(o)) : d !== null && pause_effect(d, () => {
      d = null;
    }));
  }
  block(() => {
    _ ?? (_ = /** @type {Effect} */
    active_effect), h = /** @type {V[]} */
    get$2(g);
    var y = h.length;
    if (f && y === 0)
      return;
    f = y === 0;
    let w = !1;
    if (hydrating) {
      var v = read_hydration_instruction(o) === HYDRATION_START_ELSE;
      v !== (y === 0) && (o = skip_nodes(), set_hydrate_node(o), set_hydrating(!1), w = !0);
    }
    if (hydrating) {
      for (var b = null, S, E = 0; E < y; E++) {
        if (hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          o = /** @type {Comment} */
          hydrate_node, w = !0, set_hydrating(!1);
          break;
        }
        var A = h[E], I = s(A, E);
        S = create_item(
          hydrate_node,
          l,
          b,
          null,
          A,
          I,
          E,
          n,
          e,
          t
        ), l.items.set(I, S), b = S;
      }
      y > 0 && set_hydrate_node(skip_nodes());
    }
    if (hydrating)
      y === 0 && i && (d = branch(() => i(o)));
    else if (should_defer_append()) {
      var P = /* @__PURE__ */ new Set(), O = (
        /** @type {Batch} */
        current_batch
      );
      for (E = 0; E < y; E += 1) {
        A = h[E], I = s(A, E);
        var R = l.items.get(I) ?? p.get(I);
        R ? e & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE) && update_item(R, A, E, e) : (S = create_item(
          null,
          l,
          null,
          null,
          A,
          I,
          E,
          n,
          e,
          t,
          !0
        ), p.set(I, S)), P.add(I);
      }
      for (const [C, k] of l.items)
        P.has(C) || O.skipped_effects.add(k.e);
      O.add_callback(m);
    } else
      m();
    w && set_hydrating(!0), get$2(g);
  }), hydrating && (o = hydrate_node);
}
function reconcile(r, e, t, s, n, i, o, l, c) {
  var M, j, V, X;
  var u = (o & EACH_IS_ANIMATED) !== 0, d = (o & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0, f = e.length, p = t.items, g = t.first, h = g, _, m = null, y, w = [], v = [], b, S, E, A;
  if (u)
    for (A = 0; A < f; A += 1)
      b = e[A], S = l(b, A), E = p.get(S), E !== void 0 && ((M = E.a) == null || M.measure(), (y ?? (y = /* @__PURE__ */ new Set())).add(E));
  for (A = 0; A < f; A += 1) {
    if (b = e[A], S = l(b, A), E = p.get(S), E === void 0) {
      var I = s.get(S);
      if (I !== void 0) {
        s.delete(S), p.set(S, I);
        var P = m ? m.next : h;
        link(t, m, I), link(t, I, P), move(I, P, n), m = I;
      } else {
        var O = h ? (
          /** @type {TemplateNode} */
          h.e.nodes_start
        ) : n;
        m = create_item(
          O,
          t,
          m,
          m === null ? t.first : m.next,
          b,
          S,
          A,
          i,
          o,
          c
        );
      }
      p.set(S, m), w = [], v = [], h = m.next;
      continue;
    }
    if (d && update_item(E, b, A, o), E.e.f & INERT && (resume_effect(E.e), u && ((j = E.a) == null || j.unfix(), (y ?? (y = /* @__PURE__ */ new Set())).delete(E))), E !== h) {
      if (_ !== void 0 && _.has(E)) {
        if (w.length < v.length) {
          var R = v[0], C;
          m = R.prev;
          var k = w[0], N = w[w.length - 1];
          for (C = 0; C < w.length; C += 1)
            move(w[C], R, n);
          for (C = 0; C < v.length; C += 1)
            _.delete(v[C]);
          link(t, k.prev, N.next), link(t, m, k), link(t, N, R), h = R, m = N, A -= 1, w = [], v = [];
        } else
          _.delete(E), move(E, h, n), link(t, E.prev, E.next), link(t, E, m === null ? t.first : m.next), link(t, m, E), m = E;
        continue;
      }
      for (w = [], v = []; h !== null && h.k !== S; )
        h.e.f & INERT || (_ ?? (_ = /* @__PURE__ */ new Set())).add(h), v.push(h), h = h.next;
      if (h === null)
        continue;
      E = h;
    }
    w.push(E), m = E, h = E.next;
  }
  if (h !== null || _ !== void 0) {
    for (var x = _ === void 0 ? [] : array_from(_); h !== null; )
      h.e.f & INERT || x.push(h), h = h.next;
    var $ = x.length;
    if ($ > 0) {
      var B = o & EACH_IS_CONTROLLED && f === 0 ? n : null;
      if (u) {
        for (A = 0; A < $; A += 1)
          (V = x[A].a) == null || V.measure();
        for (A = 0; A < $; A += 1)
          (X = x[A].a) == null || X.fix();
      }
      pause_effects(t, x, B);
    }
  }
  u && queue_micro_task(() => {
    var ye;
    if (y !== void 0)
      for (E of y)
        (ye = E.a) == null || ye.apply();
  }), r.first = t.first && t.first.e, r.last = m && m.e;
  for (var U of s.values())
    destroy_effect(U.e);
  s.clear();
}
function update_item(r, e, t, s) {
  s & EACH_ITEM_REACTIVE && internal_set(r.v, e), s & EACH_INDEX_REACTIVE ? internal_set(
    /** @type {Value<number>} */
    r.i,
    t
  ) : r.i = t;
}
function create_item(r, e, t, s, n, i, o, l, c, u, d) {
  var f = (c & EACH_ITEM_REACTIVE) !== 0, p = (c & EACH_ITEM_IMMUTABLE) === 0, g = f ? p ? /* @__PURE__ */ mutable_source(n, !1, !1) : source(n) : n, h = c & EACH_INDEX_REACTIVE ? source(o) : o, _ = {
    i: h,
    v: g,
    k: i,
    a: null,
    // @ts-expect-error
    e: null,
    prev: t,
    next: s
  };
  try {
    if (r === null) {
      var m = document.createDocumentFragment();
      m.append(r = create_text());
    }
    return _.e = branch(() => l(
      /** @type {Node} */
      r,
      g,
      h,
      u
    ), hydrating), _.e.prev = t && t.e, _.e.next = s && s.e, t === null ? d || (e.first = _) : (t.next = _, t.e.next = _.e), s !== null && (s.prev = _, s.e.prev = _.e), _;
  } finally {
  }
}
function move(r, e, t) {
  for (var s = r.next ? (
    /** @type {TemplateNode} */
    r.next.e.nodes_start
  ) : t, n = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : t, i = (
    /** @type {TemplateNode} */
    r.e.nodes_start
  ); i !== null && i !== s; ) {
    var o = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(i)
    );
    n.before(i), i = o;
  }
}
function link(r, e, t) {
  e === null ? r.first = t : (e.next = t, e.e.next = t && t.e), t !== null && (t.prev = e, t.e.prev = e && e.e);
}
function slot(r, e, t, s, n) {
  var l;
  hydrating && hydrate_next();
  var i = (l = e.$$slots) == null ? void 0 : l[t], o = !1;
  i === !0 && (i = e.children, o = !0), i === void 0 || i(r, o ? () => s : s);
}
function component(r, e, t) {
  hydrating && hydrate_next();
  var s = new BranchManager(r);
  block(() => {
    var n = e() ?? null;
    s.ensure(n, n && ((i) => t(i, n)));
  }, EFFECT_TRANSPARENT);
}
function append_styles(r, e) {
  effect(() => {
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
      const n = document.createElement("style");
      n.id = e.hash, n.textContent = e.code, s.appendChild(n);
    }
  });
}
function action(r, e, t) {
  effect(() => {
    var s = untrack(() => e(r, t == null ? void 0 : t()) || {});
    if (t && (s != null && s.update)) {
      var n = !1, i = (
        /** @type {any} */
        {}
      );
      render_effect(() => {
        var o = t();
        deep_read_state(o), n && safe_not_equal(i, o) && (i = o, s.update(o));
      }), n = !0;
    }
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
    for (var n in t)
      if (t[n])
        s = s ? s + " " + n : n;
      else if (s.length)
        for (var i = n.length, o = 0; (o = s.indexOf(n, o)) >= 0; ) {
          var l = o + i;
          (o === 0 || whitespace.includes(s[o - 1])) && (l === s.length || whitespace.includes(s[l])) ? s = (o === 0 ? "" : s.substring(0, o)) + s.substring(l + 1) : o = l;
        }
  }
  return s === "" ? null : s;
}
function to_style(r, e) {
  return r == null ? null : String(r);
}
function set_class(r, e, t, s, n, i) {
  var o = r.__className;
  if (hydrating || o !== t || o === void 0) {
    var l = to_class(t, s, i);
    (!hydrating || l !== r.getAttribute("class")) && (l == null ? r.removeAttribute("class") : r.className = l), r.__className = t;
  } else if (i && n !== i)
    for (var c in i) {
      var u = !!i[c];
      (n == null || u !== !!n[c]) && r.classList.toggle(c, u);
    }
  return i;
}
function set_style(r, e, t, s) {
  var n = r.__style;
  if (hydrating || n !== e) {
    var i = to_style(e);
    (!hydrating || i !== r.getAttribute("style")) && (i == null ? r.removeAttribute("style") : r.style.cssText = i), r.__style = e;
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
          var n = r.checked;
          set_attribute(r, "checked", null), r.checked = n;
        }
      }
    };
    r.__on_r = t, queue_micro_task(t), add_form_reset_listener();
  }
}
function set_attribute(r, e, t, s) {
  var n = get_attributes(r);
  hydrating && (n[e] = r.getAttribute(e), e === "src" || e === "srcset" || e === "href" && r.nodeName === "LINK") || n[e] !== (n[e] = t) && (e === "loading" && (r[LOADING_ATTR_SYMBOL] = t), t == null ? r.removeAttribute(e) : typeof t != "string" && get_setters(r).includes(e) ? r[e] = t : r.setAttribute(e, t));
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
  var e = r.getAttribute("is") || r.nodeName, t = setters_cache.get(e);
  if (t) return t;
  setters_cache.set(e, t = []);
  for (var s, n = r, i = Element.prototype; i !== n; ) {
    s = get_descriptors(n);
    for (var o in s)
      s[o].set && t.push(o);
    n = get_prototype_of(n);
  }
  return t;
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
    const [n, i] = s.split(":");
    if (!n || i === void 0) break;
    const o = css_property_to_camelcase(n.trim());
    e[o] = i.trim();
  }
  return e;
}
const linear$1 = (r) => r;
function transition$1(r, e, t, s) {
  var n = (r & TRANSITION_GLOBAL) !== 0, i = "both", o, l = e.inert, c = e.style.overflow, u, d;
  function f() {
    return without_reactive_context(() => o ?? (o = t()(e, (s == null ? void 0 : s()) ?? /** @type {P} */
    {}, {
      direction: i
    })));
  }
  var p = {
    is_global: n,
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
  }, g = (
    /** @type {Effect} */
    active_effect
  );
  if ((g.transitions ?? (g.transitions = [])).push(p), should_intro) {
    var h = n;
    if (!h) {
      for (var _ = (
        /** @type {Effect | null} */
        g.parent
      ); _ && _.f & EFFECT_TRANSPARENT; )
        for (; (_ = _.parent) && !(_.f & BLOCK_EFFECT); )
          ;
      h = !_ || (_.f & EFFECT_RAN) !== 0;
    }
    h && effect(() => {
      untrack(() => p.in());
    });
  }
}
function animate(r, e, t, s, n) {
  var i = s === 1;
  if (is_function(e)) {
    var o, l = !1;
    return queue_micro_task(() => {
      if (!l) {
        var m = e({ direction: i ? "in" : "out" });
        o = animate(r, m, t, s, n);
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
    return n(), {
      abort: noop$2,
      deactivate: noop$2,
      reset: noop$2,
      t: () => s
    };
  const { delay: c = 0, css: u, tick: d, easing: f = linear$1 } = e;
  var p = [];
  if (i && t === void 0 && (d && d(0, 1), u)) {
    var g = css_to_keyframe(u(0, 1));
    p.push(g, g);
  }
  var h = () => 1 - s, _ = r.animate(p, { duration: c, fill: "forwards" });
  return _.onfinish = () => {
    _.cancel();
    var m = (t == null ? void 0 : t.t()) ?? 1 - s;
    t == null || t.abort();
    var y = s - m, w = (
      /** @type {number} */
      e.duration * Math.abs(y)
    ), v = [];
    if (w > 0) {
      var b = !1;
      if (u)
        for (var S = Math.ceil(w / 16.666666666666668), E = 0; E <= S; E += 1) {
          var A = m + y * f(E / S), I = css_to_keyframe(u(A, 1 - A));
          v.push(I), b || (b = I.overflow === "hidden");
        }
      b && (r.style.overflow = "hidden"), h = () => {
        var P = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          _.currentTime
        );
        return m + y * f(P / w);
      }, d && loop$1(() => {
        if (_.playState !== "running") return !1;
        var P = h();
        return d(P, 1 - P), !0;
      });
    }
    _ = r.animate(v, { duration: w, fill: "forwards" }), _.onfinish = () => {
      h = () => s, d == null || d(s, 1 - s), n();
    };
  }, {
    abort: () => {
      _ && (_.cancel(), _.effect = null, _.onfinish = noop$2);
    },
    deactivate: () => {
      n = noop$2;
    },
    reset: () => {
      s === 0 && (d == null || d(1, 0));
    },
    t: () => h()
  };
}
function bind_value(r, e, t = e) {
  var s = /* @__PURE__ */ new WeakSet();
  listen_to_event_and_reset_event(r, "input", async (n) => {
    var i = n ? r.defaultValue : r.value;
    if (i = is_numberlike_input(r) ? to_number(i) : i, t(i), current_batch !== null && s.add(current_batch), await tick(), i !== (i = e())) {
      var o = r.selectionStart, l = r.selectionEnd, c = r.value.length;
      if (r.value = i ?? "", l !== null) {
        var u = r.value.length;
        o === l && l === c && u > c ? (r.selectionStart = u, r.selectionEnd = u) : (r.selectionStart = o, r.selectionEnd = Math.min(l, u));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  (hydrating && r.defaultValue !== r.value || // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  untrack(e) == null && r.value) && (t(is_numberlike_input(r) ? to_number(r.value) : r.value), current_batch !== null && s.add(current_batch)), render_effect(() => {
    var n = e();
    if (r === document.activeElement) {
      var i = (
        /** @type {Batch} */
        previous_batch ?? current_batch
      );
      if (s.has(i))
        return;
    }
    is_numberlike_input(r) && n === to_number(r.value) || r.type === "date" && !n && !r.value || n !== r.value && (r.value = n ?? "");
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
    var n, i;
    return render_effect(() => {
      n = i, i = [], untrack(() => {
        r !== t(...i) && (e(r, ...i), n && is_bound_this(t(...n), r) && e(null, ...n));
      });
    }), () => {
      queue_micro_task(() => {
        i && is_bound_this(t(...i), r) && e(null, ...i);
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
    let n = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ derived(() => {
      let l = !1;
      const c = e.s;
      for (const u in c)
        c[u] !== i[u] && (i[u] = c[u], l = !0);
      return l && n++, n;
    });
    s = () => get$2(o);
  }
  t.b.length && user_pre_effect(() => {
    observe_all(e, s), run_all(t.b);
  }), user_effect(() => {
    const n = untrack(() => t.m.map(run));
    return () => {
      for (const i of n)
        typeof i == "function" && i();
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
      var n = !0;
      s.unsubscribe = subscribe_to_store(r, (i) => {
        n ? s.source.v = i : set(s.source, i);
      }), n = !1;
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
const rest_props_handler = {
  get(r, e) {
    if (!r.exclude.includes(e))
      return r.props[e];
  },
  set(r, e) {
    return !1;
  },
  getOwnPropertyDescriptor(r, e) {
    if (!r.exclude.includes(e) && e in r.props)
      return {
        enumerable: !0,
        configurable: !0,
        value: r.props[e]
      };
  },
  has(r, e) {
    return r.exclude.includes(e) ? !1 : e in r.props;
  },
  ownKeys(r) {
    return Reflect.ownKeys(r.props).filter((e) => !r.exclude.includes(e));
  }
};
// @__NO_SIDE_EFFECTS__
function rest_props(r, e, t) {
  return new Proxy(
    { props: r, exclude: e },
    rest_props_handler
  );
}
const spread_props_handler = {
  get(r, e) {
    let t = r.props.length;
    for (; t--; ) {
      let s = r.props[t];
      if (is_function(s) && (s = s()), typeof s == "object" && s !== null && e in s) return s[e];
    }
  },
  set(r, e, t) {
    let s = r.props.length;
    for (; s--; ) {
      let n = r.props[s];
      is_function(n) && (n = n());
      const i = get_descriptor(n, e);
      if (i && i.set)
        return i.set(t), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(r, e) {
    let t = r.props.length;
    for (; t--; ) {
      let s = r.props[t];
      if (is_function(s) && (s = s()), typeof s == "object" && s !== null && e in s) {
        const n = get_descriptor(s, e);
        return n && !n.configurable && (n.configurable = !0), n;
      }
    }
  },
  has(r, e) {
    if (e === STATE_SYMBOL || e === LEGACY_PROPS) return !1;
    for (let t of r.props)
      if (is_function(t) && (t = t()), t != null && e in t) return !0;
    return !1;
  },
  ownKeys(r) {
    const e = [];
    for (let t of r.props)
      if (is_function(t) && (t = t()), !!t) {
        for (const s in t)
          e.includes(s) || e.push(s);
        for (const s of Object.getOwnPropertySymbols(t))
          e.includes(s) || e.push(s);
      }
    return e;
  }
};
function spread_props(...r) {
  return new Proxy({ props: r }, spread_props_handler);
}
function prop(r, e, t, s) {
  var v;
  var n = !legacy_mode_flag || (t & PROPS_IS_RUNES) !== 0, i = (t & PROPS_IS_BINDABLE) !== 0, o = (t & PROPS_IS_LAZY_INITIAL) !== 0, l = (
    /** @type {V} */
    s
  ), c = !0, u = () => (c && (c = !1, l = o ? untrack(
    /** @type {() => V} */
    s
  ) : (
    /** @type {V} */
    s
  )), l), d;
  if (i) {
    var f = STATE_SYMBOL in r || LEGACY_PROPS in r;
    d = ((v = get_descriptor(r, e)) == null ? void 0 : v.set) ?? (f && e in r ? (b) => r[e] = b : void 0);
  }
  var p, g = !1;
  i ? [p, g] = capture_store_binding(() => (
    /** @type {V} */
    r[e]
  )) : p = /** @type {V} */
  r[e], p === void 0 && s !== void 0 && (p = u(), d && (n && props_invalid_value(), d(p)));
  var h;
  if (n ? h = () => {
    var b = (
      /** @type {V} */
      r[e]
    );
    return b === void 0 ? u() : (c = !0, b);
  } : h = () => {
    var b = (
      /** @type {V} */
      r[e]
    );
    return b !== void 0 && (l = /** @type {V} */
    void 0), b === void 0 ? l : b;
  }, n && !(t & PROPS_IS_UPDATED))
    return h;
  if (d) {
    var _ = r.$$legacy;
    return (
      /** @type {() => V} */
      function(b, S) {
        return arguments.length > 0 ? ((!n || !S || _ || g) && d(S ? h() : b), b) : h();
      }
    );
  }
  var m = !1, y = (t & PROPS_IS_IMMUTABLE ? derived : derived_safe_equal)(() => (m = !1, h()));
  i && get$2(y);
  var w = (
    /** @type {Effect} */
    active_effect
  );
  return (
    /** @type {() => V} */
    function(b, S) {
      if (arguments.length > 0) {
        const E = S ? get$2(y) : n && i ? proxy(b) : b;
        return set(y, E), m = !0, l !== void 0 && (l = E), b;
      }
      return is_destroying_effect && m || w.f & DESTROYED ? y.v : get$2(y);
    }
  );
}
function createClassComponent(r) {
  return new Svelte4Component(r);
}
var ie, J;
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    /** @type {any} */
    F(this, ie);
    /** @type {Record<string, any>} */
    F(this, J);
    var i;
    var t = /* @__PURE__ */ new Map(), s = (o, l) => {
      var c = /* @__PURE__ */ mutable_source(l, !1, !1);
      return t.set(o, c), c;
    };
    const n = new Proxy(
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
    D(this, J, (e.hydrate ? hydrate : mount)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: n,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover
    })), (!((i = e == null ? void 0 : e.props) != null && i.$$host) || e.sync === !1) && flushSync(), D(this, ie, n.$$events);
    for (const o of Object.keys(T(this, J)))
      o === "$set" || o === "$destroy" || o === "$on" || define_property(this, o, {
        get() {
          return T(this, J)[o];
        },
        /** @param {any} value */
        set(l) {
          T(this, J)[o] = l;
        },
        enumerable: !0
      });
    T(this, J).$set = /** @param {Record<string, any>} next */
    (o) => {
      Object.assign(n, o);
    }, T(this, J).$destroy = () => {
      unmount(T(this, J));
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    T(this, J).$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, t) {
    T(this, ie)[e] = T(this, ie)[e] || [];
    const s = (...n) => t.call(this, ...n);
    return T(this, ie)[e].push(s), () => {
      T(this, ie)[e] = T(this, ie)[e].filter(
        /** @param {any} fn */
        (n) => n !== s
      );
    };
  }
  $destroy() {
    T(this, J).$destroy();
  }
}
ie = new WeakMap(), J = new WeakMap();
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
    L(this, "$$ctor");
    /** Slots */
    L(this, "$$s");
    /** @type {any} The Svelte component instance */
    L(this, "$$c");
    /** Whether or not the custom element is connected */
    L(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    L(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    L(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    L(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    L(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    L(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    L(this, "$$me");
    this.$$ctor = e, this.$$s = t, s && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, t, s) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const n = this.$$c.$on(e, t);
      this.$$l_u.set(t, n);
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
      const n = this.$$l_u.get(t);
      n && (n(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(n) {
        return (i) => {
          const o = document.createElement("slot");
          n !== "default" && (o.name = n), append(i, o);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const t = {}, s = get_custom_elements_slots(this);
      for (const n of this.$$s)
        n in s && (n === "default" && !this.$$d.children ? (this.$$d.children = e(n), t.default = !0) : t[n] = e(n));
      for (const n of this.attributes) {
        const i = this.$$g_p(n.name);
        i in this.$$d || (this.$$d[i] = get_custom_element_value(i, n.value, this.$$p_d, "toProp"));
      }
      for (const n in this.$$p_d)
        !(n in this.$$d) && this[n] !== void 0 && (this.$$d[n] = this[n], delete this[n]);
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
          var n;
          this.$$r = !0;
          for (const i of object_keys(this.$$c)) {
            if (!((n = this.$$p_d[i]) != null && n.reflect)) continue;
            this.$$d[i] = this.$$c[i];
            const o = get_custom_element_value(
              i,
              this.$$d[i],
              this.$$p_d,
              "toAttribute"
            );
            o == null ? this.removeAttribute(this.$$p_d[i].attribute || i) : this.setAttribute(this.$$p_d[i].attribute || i, o);
          }
          this.$$r = !1;
        });
      });
      for (const n in this.$$l)
        for (const i of this.$$l[n]) {
          const o = this.$$c.$on(n, i);
          this.$$l_u.set(i, o);
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
    var n;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = get_custom_element_value(e, s, this.$$p_d, "toProp"), (n = this.$$c) == null || n.$set({ [e]: this.$$d[e] }));
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
  var i;
  const n = (i = t[r]) == null ? void 0 : i.type;
  if (e = n === "Boolean" && typeof e != "boolean" ? e != null : e, !s || !t[r])
    return e;
  if (s === "toAttribute")
    switch (n) {
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
    switch (n) {
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
function create_custom_element(r, e, t, s, n, i) {
  let o = class extends SvelteElement {
    constructor() {
      super(r, t, n), this.$$p_d = e;
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
    var i;
    const n = (
      /** @type {Record<string, Function | Function[]>} */
      (i = r.s.$$events) == null ? void 0 : i[
        /** @type {string} */
        e
      ]
    );
    if (n) {
      const o = is_array(n) ? n.slice() : [n], l = create_custom_event(
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
  function n(l) {
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
  function i(l) {
    n(l(
      /** @type {T} */
      r
    ));
  }
  function o(l, c = noop$2) {
    const u = [l, c];
    return s.add(u), s.size === 1 && (t = e(n, i) || noop$2), l(
      /** @type {T} */
      r
    ), () => {
      s.delete(u), s.size === 0 && t && (t(), t = null);
    };
  }
  return { set: n, update: i, subscribe: o };
}
function get$1(r) {
  let e;
  return subscribe_to_store(r, (t) => e = t)(), e;
}
const persistentWritable = (r, e) => {
  const t = isBrowser$2 ? localStorage.getItem(r) : null, s = writable(t ? JSON.parse(t) : e);
  return isBrowser$2 && s.subscribe((n) => {
    localStorage.setItem(r, JSON.stringify(n));
  }), s;
}, cartItemToPreorderCartItem = (r) => {
  var c, u, d;
  const e = r.final_price, t = r.quantity, s = (u = (c = r == null ? void 0 : r.selling_plan_allocation) == null ? void 0 : c.selling_plan) == null ? void 0 : u.checkout_charge;
  let n = (d = r == null ? void 0 : r.selling_plan_allocation) == null ? void 0 : d.checkout_charge_amount;
  if (!n && s)
    switch (s.value_type) {
      case "percentage":
        n = r.selling_plan_allocation.price * (s.value / 100);
        break;
      case "fixed_amount":
        n = s.value;
        break;
    }
  let i = !0, o;
  n || (i = !1), n && e <= n && (i = !1), n && (n = Math.min(e, n)), i && (o = e - n);
  const l = {
    checkout_price: n * t,
    remaining_price: (o || 0) * t
  };
  return {
    original_price: r.original_price * t,
    final_price: e * t,
    pre_oder_price: i ? l : void 0
  };
}, createCartDrawerFooterRivet = () => {
  const e = document.getElementById("total-price-drawer-footer"), t = {
    total: 0,
    totalOriginal: 0,
    discounts: 0,
    items: 0,
    updateTotals: function() {
      var n;
      if (!window.CartJS) return;
      let s = 0;
      (n = window.CartJS.cart.items) == null || n.forEach((i) => {
        const { pre_oder_price: o, final_price: l } = cartItemToPreorderCartItem(i);
        if (!o || !o.checkout_price)
          return s += l;
        s += o.checkout_price;
      }), this.total = s, this.totalOriginal = window.CartJS.cart.original_total_price, this.discounts = window.CartJS.cart.total_discount, this.items = window.CartJS.cart.item_count;
    }
  };
  window.rivets.bind(e, t), document.addEventListener("cart:fix-1-applied", () => {
    t.updateTotals();
  }), t.updateTotals();
};
var Page = /* @__PURE__ */ ((r) => (r.PDP = "pdp", r))(Page || {});
const isPage = (r) => {
  switch (r) {
    case "pdp":
      return window.location.pathname.includes("/products/");
    default:
      return !1;
  }
}, BUY_BUTTONS_CONFIG = {
  debug: {
    enabled: !1
  },
  selectors: {
    priceValue: ".pdp-price-container .price-ui--value",
    ctaPrice: ".pdp-cta-price",
    preorderButton: ".gPreorderBtnLoaded",
    productForm: "product-form",
    productFormSubmit: ".product-form__submit",
    productFormButtons: ".product-form__buttons",
    footer: ".pdp-cta-footer--content",
    disclaimer: ".pdp-disclaimer",
    paymentOptions: ".gPreorderTopMessageParent",
    productPriceElement: ".pdp-price-container product-price",
    skeletonWave: ".skeleton-wave",
    globoBackInStock: "#Globo-Back-In-Stock",
    sellingPlanOptions: ".gPreorderSellingPlanOptions",
    sellingPlanParent: ".gPreorderSellingPlanParent",
    observerContainer: ".product__info-container"
  },
  retry: {
    maxAttempts: 100,
    interval: 150
  },
  breakpoints: {
    mobile: 767
  }
}, frontendLogger = {
  debug: (...r) => {
    console.log("[UI]", ...r);
  },
  warn: (...r) => {
    console.warn("[UI]", ...r);
  }
};
class PriceManager {
  constructor() {
    L(this, "debug");
    L(this, "subscribers", /* @__PURE__ */ new Set());
    L(this, "currentPrice", null);
    L(this, "observer", null);
    L(this, "priceElement", null);
    L(this, "retryCount", 0);
    L(this, "isInitialized", !1);
    L(this, "onComplete");
    L(this, "completeTimer", null);
    L(this, "STABILITY_DELAY_MS", 100);
    L(this, "changeCounter", 0);
    this.debug = BUY_BUTTONS_CONFIG.debug.enabled;
  }
  /**
   * Set completion callback for when observer finishes initialization
   */
  setCompletionCallback(e) {
    this.onComplete = e, this.isInitialized && e();
  }
  /**
   * Subscribe to price changes
   * @param callback Function to call when price changes
   * @returns Unsubscribe function
   */
  subscribe(e) {
    return this.subscribers.add(e), this.currentPrice !== null && e(this.currentPrice), () => this.subscribers.delete(e);
  }
  /**
   * Notify all subscribers of price changes
   */
  notifySubscribers(e) {
    e !== this.currentPrice && (this.currentPrice = e, this.changeCounter++, this.debug && frontendLogger.debug(`💰 Price change #${this.changeCounter}: ${e}`, {
      previousPrice: this.currentPrice,
      newPrice: e,
      changeNumber: this.changeCounter,
      subscriberCount: this.subscribers.size
    }), this.subscribers.forEach((t) => {
      try {
        t(e);
      } catch (s) {
        console.error("Price observer subscriber error:", s);
      }
    }));
  }
  /**
   * Signal completion after price has been stable for the configured delay
   */
  scheduleCompletion() {
    this.completeTimer !== null && clearTimeout(this.completeTimer), this.completeTimer = window.setTimeout(() => {
      var e;
      this.isInitialized || (this.debug && frontendLogger.debug(`✅ Price observer completed after ${this.STABILITY_DELAY_MS}ms stability`, {
        finalPrice: this.currentPrice,
        totalChanges: this.changeCounter
      }), this.isInitialized = !0, (e = this.onComplete) == null || e.call(this));
    }, this.STABILITY_DELAY_MS);
  }
  /**
   * Get current price synchronously
   */
  getCurrentPrice() {
    return this.currentPrice;
  }
  /**
   * Get price with retry logic (backward compatibility)
   */
  async getPrice(e = 0) {
    const t = document.querySelector(
      BUY_BUTTONS_CONFIG.selectors.priceValue
    );
    if (!t && e <= BUY_BUTTONS_CONFIG.retry.maxAttempts)
      return await new Promise(
        (n) => setTimeout(n, BUY_BUTTONS_CONFIG.retry.interval)
      ), this.getPrice(e + 1);
    if (!t)
      return console.error("Could not find price element"), null;
    const s = t.innerText.trim();
    return this.notifySubscribers(s), s;
  }
  /**
   * Start observing price element changes
   */
  startObserving() {
    this.debug && frontendLogger.debug("🚀 Starting price observation"), this.observer && this.observer.disconnect(), this.findAndObservePriceElement(), this.priceElement || this.retryObserving();
  }
  /**
   * Find price element and set up observer
   */
  findAndObservePriceElement() {
    if (this.priceElement = document.querySelector(
      BUY_BUTTONS_CONFIG.selectors.priceValue
    ), this.priceElement) {
      this.debug && frontendLogger.debug("🔍 Price element found, setting up mutation observer"), this.observer = new MutationObserver((t) => {
        t.forEach((s) => {
          var n;
          if (s.type === "childList" || s.type === "characterData") {
            const i = (n = this.priceElement) == null ? void 0 : n.innerText.trim();
            i && i !== this.currentPrice && (this.debug && frontendLogger.debug(`📍 Price mutation detected: ${i}`, {
              mutationType: s.type,
              newPrice: i
            }), this.notifySubscribers(i), this.scheduleCompletion());
          }
        });
      }), this.observer.observe(this.priceElement, {
        childList: !0,
        subtree: !0,
        characterData: !0
      });
      const e = this.priceElement.innerText.trim();
      e ? (this.debug && frontendLogger.debug(`🎯 Initial price detected: ${e}`), this.notifySubscribers(e)) : this.debug && frontendLogger.warn("⚠️ Price element found but has no text content"), this.scheduleCompletion();
    }
  }
  /**
   * Retry mechanism for finding price element
   */
  retryObserving() {
    var e;
    this.retryCount < BUY_BUTTONS_CONFIG.retry.maxAttempts ? (this.retryCount++, this.debug && frontendLogger.debug(`🔄 Retry attempt #${this.retryCount} to find price element`), setTimeout(() => {
      this.findAndObservePriceElement(), this.priceElement || this.retryObserving();
    }, BUY_BUTTONS_CONFIG.retry.interval)) : (frontendLogger.warn("⚠️ Price observer: Could not find price element after max retries", {
      maxAttempts: BUY_BUTTONS_CONFIG.retry.maxAttempts,
      totalRetries: this.retryCount,
      selector: BUY_BUTTONS_CONFIG.selectors.priceValue,
      hint: "Check if the selector matches the DOM structure"
    }), this.isInitialized || (this.isInitialized = !0, (e = this.onComplete) == null || e.call(this)));
  }
  /**
   * Stop observing
   */
  stopObserving() {
    this.observer && (this.observer.disconnect(), this.observer = null), this.completeTimer !== null && (clearTimeout(this.completeTimer), this.completeTimer = null), this.priceElement = null, this.retryCount = 0;
  }
  /**
   * Clean up all resources
   */
  destroy() {
    this.stopObserving(), this.subscribers.clear(), this.currentPrice = null;
  }
}
class CTAManager {
  // Fallback timeout
  constructor() {
    L(this, "debug");
    L(this, "isPriceReady", !1);
    L(this, "isPreorder", !1);
    L(this, "price");
    L(this, "isInitialized", !1);
    L(this, "onComplete");
    L(this, "initializationTimeout", null);
    L(this, "INITIALIZATION_TIMEOUT_MS", 3e3);
    this.debug = BUY_BUTTONS_CONFIG.debug.enabled;
  }
  /**
   * Set completion callback for when CTA updates are complete
   */
  setCompletionCallback(e) {
    this.onComplete = e, this.isInitialized ? e() : this.initializationTimeout = setTimeout(() => {
      this.isInitialized || (console.warn("⚠️ CTAManager: Forcing completion after timeout (price may not have been set)"), this.forceComplete());
    }, this.INITIALIZATION_TIMEOUT_MS);
  }
  /**
   * Set the price and trigger update
   */
  setPrice(e) {
    this.price = e, this.isPriceReady = !0, this.update();
  }
  /**
   * Set preorder state and trigger update
   */
  setIsPreorder(e) {
    this.isPreorder = e, this.update();
  }
  /**
   * Add price to regular buy button
   */
  addPriceToBuyButton() {
    document.querySelectorAll(
      BUY_BUTTONS_CONFIG.selectors.ctaPrice
    ).forEach((t) => {
      t.innerHTML = ` for ${this.price}`;
    });
  }
  /**
   * Add price to preorder button (handles Globo integration)
   */
  addPriceToPreorderButton(e = null) {
    if (!e) {
      const s = document.querySelector(
        BUY_BUTTONS_CONFIG.selectors.footer
      ), n = document.querySelector(
        BUY_BUTTONS_CONFIG.selectors.productFormButtons
      );
      this.addPriceToPreorderButton(s), this.addPriceToPreorderButton(n);
      return;
    }
    if (!e) return;
    const t = e.querySelectorAll(
      `${BUY_BUTTONS_CONFIG.selectors.preorderButton}:not(.hidden)`
    );
    if (t.length === 0) {
      setTimeout(() => {
        this.addPriceToPreorderButton(e);
      }, 50);
      return;
    }
    t.forEach((s) => {
      var o, l;
      const n = s.cloneNode(!0);
      s.classList.add("hidden");
      const i = (o = s.parentElement) == null ? void 0 : o.querySelectorAll(
        `${BUY_BUTTONS_CONFIG.selectors.preorderButton}:not(.hidden)`
      );
      i && i.length > 1 || (n.innerHTML = `Pre Order for ${this.price}`, (l = s.parentElement) == null || l.appendChild(n));
    });
  }
  /**
   * Update CTA buttons based on current state
   */
  update() {
    !this.isPriceReady || !this.price || (this.isPreorder ? this.addPriceToPreorderButton() : this.addPriceToBuyButton(), this.isInitialized || this.markComplete());
  }
  /**
   * Mark as complete and clear timeout
   */
  markComplete() {
    var e;
    this.initializationTimeout && (clearTimeout(this.initializationTimeout), this.initializationTimeout = null), this.isInitialized = !0, (e = this.onComplete) == null || e.call(this);
  }
  /**
   * Force completion without price update (fallback)
   */
  forceComplete() {
    console.warn("⚠️ CTAManager completing without price update", {
      isPriceReady: this.isPriceReady,
      hasPrice: !!this.price,
      isPreorder: this.isPreorder
    }), this.markComplete();
  }
  /**
   * Clean up resources
   */
  destroy() {
    this.initializationTimeout && (clearTimeout(this.initializationTimeout), this.initializationTimeout = null);
  }
}
class ResponsiveManager {
  constructor(e = BUY_BUTTONS_CONFIG.selectors.productForm) {
    L(this, "productForm", null);
    L(this, "boundHandleResize");
    L(this, "isInitialized", !1);
    L(this, "onComplete");
    this.productForm = document.querySelector(e), this.boundHandleResize = this.handleResize.bind(this);
  }
  /**
   * Set completion callback for when layout initialization is complete
   */
  setCompletionCallback(e) {
    this.onComplete = e, this.isInitialized && e();
  }
  /**
   * Initialize responsive layout handling
   */
  init() {
    var e;
    this.handleResize(), window.addEventListener("resize", this.boundHandleResize), this.isInitialized || (this.isInitialized = !0, (e = this.onComplete) == null || e.call(this));
  }
  /**
   * Handle window resize events
   */
  handleResize() {
    window.innerWidth <= BUY_BUTTONS_CONFIG.breakpoints.mobile ? this.transformForMobile() : this.transformForDesktop();
  }
  /**
   * Transform layout for mobile view
   * Hides buttons in sidebar (they're shown in footer instead)
   */
  transformForMobile() {
    if (!this.productForm) return;
    this.productForm.querySelectorAll(
      BUY_BUTTONS_CONFIG.selectors.productFormSubmit
    ).forEach((s) => s.style.display = "none");
    const t = this.productForm.querySelector(
      BUY_BUTTONS_CONFIG.selectors.disclaimer
    );
    t && (t.style.display = "none");
  }
  /**
   * Transform layout for desktop view
   * Shows buttons in sidebar
   */
  transformForDesktop() {
    if (!this.productForm) return;
    this.productForm.querySelectorAll(
      BUY_BUTTONS_CONFIG.selectors.productFormSubmit
    ).forEach((s) => s.style.display = "");
    const t = this.productForm.querySelector(
      BUY_BUTTONS_CONFIG.selectors.disclaimer
    );
    t && (t.style.display = "");
  }
  /**
   * Clean up event listeners
   */
  destroy() {
    window.removeEventListener("resize", this.boundHandleResize);
  }
}
class FooterCTAManager {
  constructor(e) {
    L(this, "productForm", null);
    L(this, "footer", null);
    L(this, "isInitialized", !1);
    L(this, "onComplete");
    L(this, "paymentOptionManager");
    this.productForm = document.querySelector(BUY_BUTTONS_CONFIG.selectors.productForm), this.footer = document.querySelector(BUY_BUTTONS_CONFIG.selectors.footer), this.paymentOptionManager = e;
  }
  /**
   * Set completion callback for when footer move is complete
   */
  setCompletionCallback(e) {
    this.onComplete = e, this.isInitialized && e();
  }
  /**
   * Move CTA to footer (for mobile sticky footer)
   */
  moveCtaToFooter() {
    var t, s;
    if (!this.productForm || !this.footer) {
      this.isInitialized || (this.isInitialized = !0, (t = this.onComplete) == null || t.call(this));
      return;
    }
    const e = this.productForm.cloneNode(!0);
    this.cleanFooter(e), this.footer.prepend(e), this.isInitialized || (this.isInitialized = !0, (s = this.onComplete) == null || s.call(this));
  }
  /**
   * Clean footer content by removing payment options
   * Uses PaymentOptionManager to efficiently check if payment options exist
   * Note: PaymentOptionManager must be initialized before this is called
   */
  cleanFooter(e) {
    var s;
    if (this.paymentOptionManager.getPaymentOptionsInfo().hasPaymentOptions) {
      const n = e.querySelector(
        BUY_BUTTONS_CONFIG.selectors.paymentOptions
      );
      n && ((s = n.parentElement) == null || s.removeChild(n));
    }
  }
}
class PaymentOptionManager {
  constructor() {
    L(this, "debug");
    L(this, "observer", null);
    L(this, "isInitialized", !1);
    L(this, "observerInitialized", !1);
    L(this, "onComplete");
    this.debug = BUY_BUTTONS_CONFIG.debug.enabled;
  }
  /**
   * Set completion callback for when payment option check is complete
   */
  setCompletionCallback(e) {
    this.onComplete = e, this.isInitialized && e();
  }
  /**
   * Get information about available payment options
   * Used by SkeletonManager to determine what skeletons to show
   */
  getPaymentOptionsInfo() {
    const e = document.querySelector(
      BUY_BUTTONS_CONFIG.selectors.sellingPlanOptions
    );
    if (!e)
      return {
        hasPaymentOptions: !1,
        optionCount: 0
      };
    const t = e.children.length;
    return {
      hasPaymentOptions: t > 0,
      optionCount: t
    };
  }
  /**
   * Initialize the payment option manager for observing and hiding behavior
   * Sets up observer on product info container for dynamic content changes
   * Should be called when preorder functionality is active
   * Safe to call multiple times - will only initialize once
   */
  init() {
    if (this.observerInitialized) {
      this.debug && frontendLogger.debug("PaymentOptionManager already initialized, skipping");
      return;
    }
    this.observerInitialized = !0, this.setupObserver(), this.debug && frontendLogger.debug("PaymentOptionManager observer initialized"), this.checkAndHideParent();
  }
  /**
   * Initialize only the completion tracking without observer
   * Used when we need payment options info but don't need hiding behavior
   */
  initWithoutObserver() {
    var e;
    this.isInitialized || (this.isInitialized = !0, (e = this.onComplete) == null || e.call(this)), this.debug && frontendLogger.debug("PaymentOptionManager initialized without observer");
  }
  /**
   * Check if selling plan parent should be hidden based on child count
   * Hides parent if only one child exists
   */
  checkAndHideParent() {
    var s;
    const e = document.querySelector(
      BUY_BUTTONS_CONFIG.selectors.sellingPlanOptions
    );
    if (!e)
      return;
    if (e.children.length === 1) {
      const n = document.querySelector(
        BUY_BUTTONS_CONFIG.selectors.sellingPlanParent
      );
      n && (this.debug && frontendLogger.debug("Only one selling plan option found, hiding parent"), n.style.display = "none", this.stopObserving());
    }
    this.isInitialized || (this.isInitialized = !0, (s = this.onComplete) == null || s.call(this));
  }
  /**
   * Setup observer on product info container to handle dynamic content loading
   * Reacts when selling plan options are added to the DOM
   */
  setupObserver() {
    var t;
    const e = document.querySelector(
      BUY_BUTTONS_CONFIG.selectors.observerContainer
    );
    if (!e) {
      this.debug && frontendLogger.debug(
        "Product info container not found",
        BUY_BUTTONS_CONFIG.selectors.observerContainer
      ), this.isInitialized || (this.isInitialized = !0, (t = this.onComplete) == null || t.call(this));
      return;
    }
    this.observer = new MutationObserver(() => {
      this.checkAndHideParent();
    }), this.observer.observe(e, {
      childList: !0,
      subtree: !0,
      attributes: !0
    }), this.debug && frontendLogger.debug(
      "PaymentOptionManager observer started on",
      BUY_BUTTONS_CONFIG.selectors.observerContainer
    );
  }
  /**
   * Stop observing for mutations
   */
  stopObserving() {
    this.observer && (this.observer.disconnect(), this.observer = null, this.debug && frontendLogger.debug("PaymentOptionManager observer stopped"));
  }
  /**
   * Clean up observer
   */
  destroy() {
    this.stopObserving();
  }
}
class SkeletonManager {
  constructor() {
    L(this, "debug");
    L(this, "SKELETON_HEIGHT", "60px");
    L(this, "HIDE_STYLE_ID", "skeleton-manager-hide-styles");
    L(this, "styledElements", []);
    L(this, "hideStyleElement", null);
    this.debug = BUY_BUTTONS_CONFIG.debug.enabled;
  }
  /**
   * Show skeleton loading state
   * Called on initialization
   */
  showSkeletons() {
    this.createSkeleton(), this.injectHideStyles(), this.debug && frontendLogger.debug("Skeleton shown");
  }
  /**
   * Hide skeleton loading state
   * Called when all managers complete initialization
   */
  hideSkeletons() {
    setTimeout(() => {
      this.removeSkeleton(), this.removeHideStyles(), this.debug && frontendLogger.debug("Skeleton hidden");
    }, 150);
  }
  /**
   * Create skeleton loading overlay on all product form buttons instances
   * Sets fixed height, hidden overflow, margin-bottom, and adds skeleton overlay
   * Handles both original and cloned (footer) instances
   */
  createSkeleton() {
    const e = document.querySelectorAll(
      BUY_BUTTONS_CONFIG.selectors.productFormButtons
    );
    if (e.length === 0) {
      this.debug && frontendLogger.debug("No product form buttons found");
      return;
    }
    e.forEach((t) => {
      const s = t, n = s.style.height || "", i = s.style.overflow || "", o = s.style.marginBottom || "";
      s.style.height = this.SKELETON_HEIGHT, s.style.overflow = "hidden", s.style.marginBottom = "5px";
      const l = document.createElement("div");
      l.className = BUY_BUTTONS_CONFIG.selectors.skeletonWave.replace(".", ""), l.style.cssText = `
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				z-index: 10;
			`, s.appendChild(l), this.styledElements.push({
        element: s,
        originalHeight: n,
        originalOverflow: i,
        originalMarginBottom: o
      });
    }), this.debug && frontendLogger.debug(`Created ${this.styledElements.length} skeleton instance(s)`);
  }
  /**
   * Remove all skeleton overlays from page and restore original styles
   * Uses simple approach: removes all .skeleton-wave elements from entire page
   */
  removeSkeleton() {
    const e = document.querySelectorAll(BUY_BUTTONS_CONFIG.selectors.skeletonWave);
    e.forEach((t) => {
      t.remove();
    }), this.styledElements.forEach(({ element: t, originalHeight: s, originalOverflow: n, originalMarginBottom: i }) => {
      t.style.height = s, t.style.overflow = n, t.style.marginBottom = i;
    }), this.debug && frontendLogger.debug(`Removed ${e.length} skeleton element(s) and restored styles for ${this.styledElements.length} element(s)`), this.styledElements = [];
  }
  /**
   * Inject CSS to hide elements that should not be visible during skeleton state
   * 
   * THE PROBLEM:
   * When a product is out of stock, the Globo Back In Stock app (#Globo-Back-In-Stock)
   * loads its button dynamically/asynchronously. This creates a flicker sequence:
   * 1. Our skeleton shows (covering .product-form__buttons)
   * 2. Globo button appears (outside our skeleton's coverage area)
   * 3. User sees Globo button briefly
   * 4. Our skeleton hides
   * 5. Globo button remains visible (correct final state)
   * 
   * THE SOLUTION:
   * CSS injection with display: none !important applies instantly to any element
   * matching #Globo-Back-In-Stock, regardless of when it's added to the DOM.
   * This prevents the flicker because the button is hidden the moment it appears.
   * 
   * WHY NOT DIRECT ELEMENT STYLING:
   * We can't style the element directly because it doesn't exist yet when we show
   * the skeleton. Even with MutationObserver, there would be a brief moment where
   * the element is visible before the observer reacts.
   * 
   * WHY CSS INJECTION WORKS:
   * Browser applies CSS rules instantly when elements are inserted into the DOM.
   * No race condition, no observer overhead, guaranteed to work.
   */
  injectHideStyles() {
    if (document.getElementById(this.HIDE_STYLE_ID)) {
      this.debug && frontendLogger.debug("Hide styles already exist");
      return;
    }
    const e = document.createElement("style");
    e.id = this.HIDE_STYLE_ID, e.textContent = `
			${BUY_BUTTONS_CONFIG.selectors.globoBackInStock} {
				display: none !important;
			}
		`, document.head.appendChild(e), this.hideStyleElement = e, this.debug && frontendLogger.debug("Hide styles injected");
  }
  /**
   * Remove injected hide styles to reveal hidden elements
   * 
   * Removes the CSS rule so #Globo-Back-In-Stock becomes visible again.
   * Includes fallback removal by ID in case the element reference is lost
   * (e.g., if this is called after a page navigation or component remount).
   */
  removeHideStyles() {
    this.hideStyleElement && (this.hideStyleElement.remove(), this.hideStyleElement = null, this.debug && frontendLogger.debug("Hide styles removed"));
    const e = document.getElementById(this.HIDE_STYLE_ID);
    e && (e.remove(), this.debug && frontendLogger.debug("Hide styles removed via fallback"));
  }
  /**
   * Clean up resources
   */
  destroy() {
    this.removeSkeleton(), this.removeHideStyles();
  }
}
function getPreorderState() {
  return window.__GLOBO_PREORDER_STATE__ || (window.__GLOBO_PREORDER_STATE__ = {
    isPreorderProduct: !1
  }), window.__GLOBO_PREORDER_STATE__;
}
function setIsPreorder(r) {
  const e = getPreorderState();
  e.isPreorderProduct = r, BUY_BUTTONS_CONFIG.debug.enabled && frontendLogger.debug("Preorder state updated:", { isPreorderProduct: r });
}
function isPreorderProduct() {
  return getPreorderState().isPreorderProduct;
}
let isListenerInitialized = !1;
function initPreorderListener() {
  if (isListenerInitialized) {
    BUY_BUTTONS_CONFIG.debug.enabled && frontendLogger.debug("Preorder listener already initialized, skipping");
    return;
  }
  isListenerInitialized = !0, document.addEventListener("globo.preorder.show.preorder", () => {
    BUY_BUTTONS_CONFIG.debug.enabled && frontendLogger.debug("Globo preorder event detected"), setIsPreorder(!0);
  }), BUY_BUTTONS_CONFIG.debug.enabled && frontendLogger.debug("Preorder event listener initialized");
}
class CompletionTracker {
  constructor(e = !0) {
    L(this, "debug");
    L(this, "completionTracking", /* @__PURE__ */ new Map());
    L(this, "completionPollInterval", null);
    L(this, "onAllComplete");
    this.debug = e;
  }
  /**
   * Register a manager that needs to complete
   */
  register(e) {
    this.completionTracking.set(e, !1), this.debug && frontendLogger.debug(`📝 Registered manager: ${e}`);
  }
  /**
   * Mark a manager as complete
   */
  markComplete(e) {
    this.debug && frontendLogger.debug(`✅ Manager completed: ${e}`), this.completionTracking.set(e, !0), this.logCompletionStatus(), this.checkAllComplete();
  }
  /**
   * Set callback to be called when all managers are complete
   * If all managers are already complete, calls the callback immediately
   */
  onComplete(e) {
    this.onAllComplete = e, this.checkAllComplete();
  }
  /**
   * Start polling to track pending completions
   */
  startPolling(e = 5e3) {
    this.completionPollInterval || (this.completionPollInterval = setInterval(() => {
      const t = Array.from(this.completionTracking.entries()).filter(([, s]) => !s).map(([s]) => s);
      t.length > 0 && this.debug && frontendLogger.warn(
        `⏳ Still waiting for completion of: ${t.join(", ")}`
      );
    }, e));
  }
  /**
   * Stop polling for completions
   */
  stopPolling() {
    this.completionPollInterval && (clearInterval(this.completionPollInterval), this.completionPollInterval = null);
  }
  /**
   * Check if all registered managers are complete
   */
  checkAllComplete() {
    var s;
    const e = Array.from(this.completionTracking.keys());
    e.every(
      (n) => this.completionTracking.get(n) === !0
    ) && e.length > 0 && (this.debug && frontendLogger.debug("✅ All managers initialized successfully", {
      managers: e
    }), this.stopPolling(), (s = this.onAllComplete) == null || s.call(this));
  }
  /**
   * Log current completion status for debugging
   */
  logCompletionStatus() {
    if (this.debug) {
      const e = Array.from(this.completionTracking.entries()).map(
        ([t, s]) => ({
          manager: t,
          complete: s,
          status: s ? "✅ DONE" : "⏳ WAITING"
        })
      );
      frontendLogger.debug("📊 Completion Status:", e);
    }
  }
  /**
   * Clean up resources
   */
  destroy() {
    this.stopPolling(), this.completionTracking.clear();
  }
}
class BuyButtonsManager {
  constructor() {
    L(this, "debug");
    L(this, "priceManager");
    L(this, "ctaManager");
    L(this, "responsiveManager");
    L(this, "footerManager");
    L(this, "paymentOptionManager");
    L(this, "skeletonManager");
    L(this, "completionTracker");
    L(this, "externalCallback");
    this.debug = BUY_BUTTONS_CONFIG.debug.enabled, this.priceManager = new PriceManager(), this.ctaManager = new CTAManager(), this.responsiveManager = new ResponsiveManager(), this.paymentOptionManager = new PaymentOptionManager(), this.footerManager = new FooterCTAManager(this.paymentOptionManager), this.skeletonManager = new SkeletonManager(), this.completionTracker = new CompletionTracker(this.debug);
  }
  /**
   * Set completion callback to be called when all managers finish initialization
   */
  onComplete(e) {
    this.externalCallback = e;
  }
  /**
   * Initialize all buy button functionality
   */
  init() {
    this.skeletonManager.showSkeletons(), this.completionTracker.register("priceManager"), this.completionTracker.register("ctaManager"), this.completionTracker.register("responsiveManager"), this.completionTracker.register("footerManager"), this.completionTracker.register("paymentOptionManager"), this.completionTracker.onComplete(() => {
      var e;
      this.debug && frontendLogger.debug("All buy button managers initialized successfully"), this.skeletonManager.hideSkeletons(), (e = this.externalCallback) == null || e.call(this);
    }), this.debug && (frontendLogger.debug("🚀 Initializing Buy Buttons Manager"), this.completionTracker.startPolling()), this.priceManager.setCompletionCallback(() => {
      this.completionTracker.markComplete("priceManager");
    }), this.ctaManager.setCompletionCallback(() => {
      this.completionTracker.markComplete("ctaManager");
    }), this.responsiveManager.setCompletionCallback(() => {
      this.completionTracker.markComplete("responsiveManager");
    }), this.footerManager.setCompletionCallback(() => {
      this.completionTracker.markComplete("footerManager");
    }), this.paymentOptionManager.setCompletionCallback(() => {
      this.completionTracker.markComplete("paymentOptionManager");
    }), this.paymentOptionManager.initWithoutObserver(), this.priceManager.subscribe((e) => {
      this.ctaManager.setPrice(e);
    }), this.priceManager.startObserving(), isPreorderProduct() && (this.debug && frontendLogger.debug("Preorder product detected via global state"), this.ctaManager.setIsPreorder(!0), this.paymentOptionManager.init()), document.addEventListener("globo.preorder.show.preorder", () => {
      this.debug && frontendLogger.debug("Preorder event received in BuyButtonsManager"), this.ctaManager.setIsPreorder(!0), this.paymentOptionManager.init();
    }), this.setupPriceInitializationListener(), this.footerManager.moveCtaToFooter(), this.responsiveManager.init();
  }
  /**
   * Listen for price initialization from product-price web component
   */
  setupPriceInitializationListener() {
    const e = document.querySelector(
      BUY_BUTTONS_CONFIG.selectors.productPriceElement
    );
    e && e.addEventListener("shouldShowPriceChanged", (t) => {
      var i;
      ((i = t.detail) == null ? void 0 : i.shouldShowPrice) && this.ctaManager.update();
    });
  }
  /**
   * Clean up all resources
   */
  destroy() {
    this.priceManager.destroy(), this.ctaManager.destroy(), this.responsiveManager.destroy(), this.paymentOptionManager.destroy(), this.skeletonManager.destroy(), this.completionTracker.destroy();
  }
}
const loadStyles = (r, e = {}) => {
  if (typeof document > "u" || e.id && document.getElementById(e.id))
    return;
  const t = document.createElement("style");
  e.id && (t.id = e.id, t.setAttribute("data-source", e.id)), t.textContent = r, e.prepend && document.head.firstChild ? document.head.insertBefore(t, document.head.firstChild) : document.body.insertBefore(t, document.body.firstChild);
}, nativeStyles = `/* ========================================
   BUY BUTTONS - Native Styles Only
   Non-third-party component styles
   ======================================== */

.product-form {
    pointer-events: all;
}

.pdp-disclaimer {
    width: 100%;
    text-align: center;
}

@media screen and (max-width: 767px) {
    .pdp-disclaimer {
        margin-top: -8px;
    }
}

product-price .skeleton > div {
    height: 30px;
    width: 150px;
    border-radius: 50px;
    overflow: hidden;
}

product-price .skeleton {
    display: none;    
    height: 50px;
    padding: 10px 0;
}

.button:disabled, .button[aria-disabled=true], .button.disabled, .customer button:disabled, .customer button[aria-disabled=true], .customer button.disabled {
    opacity: .8!important;
}

.product-form__submit {
    height: 56px;
    width: 100%;
    font-family: Monument, sans-serif;
    font-weight: 500;
    font-style: Light;
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
}

.product-form__buttons button {
    background: rgba(1, 136, 73, 1)!important;
    border: 1px solid rgba(1, 136, 73, 1)!important;
}

.button--primary:hover {
    background: rgba(1, 136, 73, 1)!important;
    border: 1px solid rgba(1, 136, 73, 1)!important;
    opacity: .8;
}

.product-form__buttons {
    position: relative;
}

.relative {
    position: relative;
}

`, globoStyles = `/* ========================================
   BUY BUTTONS - Globo Third-Party Styles
   Customizations for Globo library components
   ======================================== */

/* ========================================
   Globo Back-in-Stock Button
   ======================================== */

@media screen and (max-width: 767px) {
    .gBackInStock-Button {
        display: none!important;
    }

    .pdp-cta-footer .gBackInStock-Button {
        display: block!important;
    }

    .singleProductPreOrderForm.preorderLoaded .product-form__buttons:has(~ #Globo-Back-In-Stock) {
        display: none;
    }

    #Globo-Back-In-Stock {
        margin: 0 0 8px;
    }
}

.gBackInStockBtn {
    background: rgba(171, 54, 58, 1)!important;
    border: 1px solid rgba(171, 54, 58, 1)!important;
    color: white!important;
    border: 1px solid rgba(171, 182, 208, 1)!important;
    font-family: Monument, sans-serif!important;
    font-size: 20px!important;
    transition: opacity .3s ease;
}

.gBackInStockBtn:hover {
    background: rgba(171, 54, 58, 1)!important;
    color: white!important;
    border: 1px solid rgba(171, 54, 58, 1)!important;
    opacity: .8;
}

@media screen and (max-width: 767px) {
    .gBackInStockBtn {
        font-size: 14px!important;
    }

    .gBackInStock-Button .gBackInStockBtn {
        font-family: "Monument", sans-serif !important;
        background: rgba(171, 54, 58, 1) !important;
        color: white !important;
        border: 1px solid rgba(171, 54, 58, 1) !important;
    }
}

/* ========================================
   Globo Notify Me Popup
   ======================================== */

.Globo-form .Globo-form-subscribe .Globo-form-header .Globo-header-background,
.Globo-form .Globo-form-subscribe .Globo-form-header .Globo-header-img-left,
.Globo-form .Globo-form-subscribe .Globo-form-header .Globo-header-img-right {
    display: none!important;
}

.Globo-form .Globo-form-subscribe .Globo-form-header {
    transform: translateY(150%);
    height: 22px;
}

.Globo-form .Globo-form-subscribe .Globo-form-body {
    border-radius: 10px;
}

.Globo-form-body,
.Globo-form .Globo-form-subscribe .Globo-form-body .Globo-body-header p {
    font-family: "Monument", sans-serif!important;
}

.Globo-form .Globo-form-subscribe .Globo-form-body .Globo-body-content .Globo-content-product .Globo-product-infor .Globo-product-title,
.Globo-form .Globo-form-subscribe .Globo-form-body .Globo-body-content .Globo-content-product .Globo-product-infor .Globo-product-price,
.Globo-form .Globo-form-subscribe .Globo-form-body .Globo-body-footer p {
    font-family: "Monument Regular", sans-serif!important;
    color: black;
}

.Globo-form-popup {
    padding: 0 6px;
}

/* ========================================
   Globo Preorder Button
   ======================================== */

.gPreorderBtn,
.Globo-form .Globo-form-subscribe .Globo-form-body .Globo-body-content .Globo-content-form button {
    pointer-events: all!important;
    background: rgba(1, 136, 73, 1)!important;
    border: 1px solid rgba(1, 136, 73, 1)!important;
    font-family: Monument, sans-serif;
    font-weight: 500;
    font-style: Light;
    font-size: 24px;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    vertical-align: middle;
}

@media screen and (max-width: 767px) {
    .gPreorderBtn {
        font-size: 24px;
    }
}

.gPreorderWarning,
.gPreorderBottomMessage,
.gPreorderTopMessage {
    display: none;
}

/* ========================================
   Globo Preorder Selling Plan Options
   ======================================== */

.gPreorderSellingPlanWrapper .gPreorderSellingPlanNameWrapper p {
    font-family: "Monument", sans-serif;
    font-size: 18px!important;
}

@media screen and (max-width: 767px) {
    .gPreorderSellingPlanWrapper .gPreorderSellingPlanNameWrapper p {
        font-size: 14px!important;
    }
}

.gPreorderSellingPlanValue span,
.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue .gPreorderPartialPaymentPrice {
    font-family: "Monument", sans-serif;
    font-size: 14px!important;
    letter-spacing: -0.15px;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanDescription {
    font-family: "Monument Regular", sans-serif;
    font-size: 14px!important;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 100;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue {
    border: 1px solid rgba(0,0,0,.05)!important;
    padding: 0!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue .gPreorderPartialPaymentPrice {
    border: none!important;
    border-radius: 0;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions {
    display: flex!important;
    flex-direction: column;
    gap: 8px;
    color: black;
    padding: 0!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue label {
    flex-wrap: nowrap!important;
    gap: 0;
    width: 100%;
}

.gPreorderSellingPlanWrapper {
    margin: 24px 0 !important;
}

@media screen and (max-width: 767px) {
    .gPreorderSellingPlanWrapper {
        margin: 8px 0 !important;
    }
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue label span {
    cursor: pointer;
    transition: background-color .2s ease;
    display: block;
    margin-left: 0;
    width: 100%;
    padding-top: 12px!important;
    padding-bottom: 12px!important;
    position: relative;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue label:hover input:not(:checked)~span {
    background: rgba(0,0,0,.03)!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue input {
    display: none!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue input:checked~span {
    background: rgba(0,0,0,.1)!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue input:checked~span:last-child:after {
    content: "";
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%) rotate(45deg);
    margin-top: -1px;
    width: 6px;
    height: 12px;
    border: 2px solid #018849;
    border-top: none;
    border-left: none;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:nth-child(4) {
    width: 100%;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:first-child,
.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:nth-child(2) {
    padding-left: 24px!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:last-child {
    padding-right: 24px!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span.gPreorderSellingPlanOptionName {
    padding-right: 12px!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span.gPreorderPartialPaymentPrice {
    padding-left: 12px!important;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:nth-child(0):not(:last-child),
.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:nth-child(1):not(:last-child),
.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:nth-child(2):not(:last-child),
.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:nth-child(3):not(:last-child) {
    width: min-content;
    white-space: nowrap;
}

.gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup {
    border: none;
}

@media screen and (max-width: 768px) {
    .gPreorderSellingPlanWrapper .gPreorderSellingPlanNameWrapper p {
        font-size: 14px!important;
    }

    .gPreorderSellingPlanWrapper .gPreorderSellingPlanDescription {
        font-size: 12px!important;
    }

    .gPreorderSellingPlanValue span,
    .gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue .gPreorderPartialPaymentPrice {
        font-size: 12px!important;
    }

    .gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue label span {
        padding-top: 8px!important;
        padding-bottom: 8px!important;
    }

    .gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:first-child,
    .gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:nth-child(2) {
        padding-left: 8px!important;
    }

    .gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span:last-child {
        padding-right: 8px!important;
    }

    .gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span.gPreorderSellingPlanOptionName {
        padding-right: 4px!important;
    }

    .gPreorderSellingPlanWrapper .gPreorderSellingPlanGroup .gPreorderSellingPlanOptions .gPreorderSellingPlanValue span.gPreorderPartialPaymentPrice {
        padding-left: 4px!important;
    }
}

`, buyButtonsInitialize = (r) => {
  window.BuyButtonsManager && (frontendLogger.debug("🧹 Destroying previous BuyButtonsManager instance"), window.BuyButtonsManager.destroy()), loadStyles(nativeStyles, { id: "buy-buttons-styles" }), loadStyles(globoStyles, { id: "buy-buttons-globo-styles" });
  const e = new BuyButtonsManager();
  e.init(), window.BuyButtonsManager = e;
}, mainFooter = () => {
  createCartDrawerFooterRivet(), isPage(Page.PDP) && buyButtonsInitialize();
}, isIosSafari = () => {
  if (typeof window > "u" || !window.navigator)
    return !1;
  const r = window.navigator.userAgent, e = /iPad|iPhone|iPod/.test(r) || navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1, t = /Safari/.test(r) && !/Chrome/.test(r) && !/CriOS/.test(r) && !/FxiOS/.test(r);
  return e && t;
}, isShopifyOnWindow = () => typeof window.Shopify < "u", SWEEP_DATE = "2025-05-23-v2", SWEEP_DATE_KEY = "storage_cleared_at", sweep = () => {
  const r = [SWEEP_DATE_KEY];
  Object.keys(localStorage).forEach((t) => {
    r.includes(t) || localStorage.removeItem(t);
  }), sessionStorage.clear();
  const e = document.cookie.split(";");
  for (let t = 0; t < e.length; t++) {
    const s = e[t], n = s.indexOf("="), i = n > -1 ? s.substring(0, n).trim() : s.trim();
    document.cookie = i + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
  window.location.reload();
}, flagSweepComplete = () => {
  localStorage.setItem(SWEEP_DATE_KEY, SWEEP_DATE);
}, isSweepRequired = () => {
  const r = localStorage.getItem(SWEEP_DATE_KEY);
  return !r || r !== SWEEP_DATE;
}, cacheSweeper = () => {
  isShopifyOnWindow() && isSweepRequired() && isIosSafari() && (sweep(), flagSweepComplete());
}, dump = (...r) => console.log("dump", ...r), wait = (r) => new Promise((e) => setTimeout(e, r)), enforceCartCalculationConsistency = async () => {
  await wait(1e3);
  const r = () => {
    dump("regular cart update");
    const { CartJS: n } = window;
    n && n.cart.items.length !== 0 && n.updateItem(1, n.cart.items[0].quantity);
  }, e = () => {
    dump("cart update, and dispatching cart:fix-1-applied"), document.dispatchEvent(new Event("cart:fix-1-applied"));
  };
  let t = !1;
  document.addEventListener("cart:before-update-item", () => {
    t = !0;
  });
  let s;
  document.addEventListener("cart:request-complete", () => {
    clearTimeout(s), s = setTimeout(() => {
      if (t) {
        t = !1, e();
        return;
      }
      r();
    }, 100);
  });
}, PUBLIC_NEXUS_BASE_URL = "https://shopify-nexus.tko.rudgalvis.com";
class NexusApi {
  constructor() {
    L(this, "BASE_URL", PUBLIC_NEXUS_BASE_URL);
    L(this, "API_VERSION_PATH", "api");
    L(this, "NGROK_SKIP_HEADER", {});
    L(this, "API_ROUTES", {
      GET_VARIANT_AUTOMATIC_DISCOUNT: (e, t) => `automatic-discount/${e}/${t}`,
      GET_PRODUCT_AUTOMATIC_DISCOUNT: (e, t) => `automatic-discount/product/${e}/${t}`,
      GET_CURRENCY_RATES: (e) => `currency-rates/${e}`,
      CACHE_PRODUCT_PRICES: () => "products/cache-prices",
      GET_AVAILABLE_VARIANT_IDS: () => "products/get-available-variant-ids"
    });
  }
  async getVariantAutomaticDiscount(e, t, s) {
    const n = await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_VARIANT_AUTOMATIC_DISCOUNT(e, t)}`, {
      method: "GET",
      headers: {
        ...this.NGROK_SKIP_HEADER
      },
      signal: s
    });
    if (!n.ok)
      throw new Error(`Failed to get variant automatic discount: ${n.statusText}. Querying: ${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_VARIANT_AUTOMATIC_DISCOUNT(e, t)}`);
    try {
      return await n.json();
    } catch (i) {
      console.error(i);
      return;
    }
  }
  async getProductAutomaticDiscount(e, t) {
    return await (await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_PRODUCT_AUTOMATIC_DISCOUNT(e, t)}`, {
      method: "GET",
      headers: {
        ...this.NGROK_SKIP_HEADER
      }
    })).json();
  }
  async getCurrencyRates(e) {
    try {
      return await (await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_CURRENCY_RATES(e)}`, {
        method: "GET",
        headers: {
          ...this.NGROK_SKIP_HEADER
        }
      })).json();
    } catch (t) {
      return console.error(t), null;
    }
  }
  async cacheProductPrices() {
    try {
      return await (await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.CACHE_PRODUCT_PRICES()}`, {
        method: "GET",
        headers: {
          ...this.NGROK_SKIP_HEADER
        }
      })).json();
    } catch (e) {
      return console.error(e), null;
    }
  }
  async getAvailableVariantIds() {
    try {
      return await (await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_AVAILABLE_VARIANT_IDS()}`, {
        method: "GET",
        headers: {
          ...this.NGROK_SKIP_HEADER
        }
      })).json();
    } catch (e) {
      return console.error(e), null;
    }
  }
}
const availableCurrencies = [
  {
    currency: "EUR",
    symbol: "€"
  },
  {
    currency: "AUD",
    symbol: "$"
  },
  {
    currency: "GBP",
    symbol: "£"
  },
  {
    currency: "USD",
    symbol: "$"
  }
], nexusApi = new NexusApi(), DISPLAY_CURRENCY_KEY = "displayCurrency", MARKET_CURRENCY_KEY = "marketCurrency", LOCALIZATION = "localization", DEFAULT_CURRENCY = "EUR", whitelistedCurrencies = availableCurrencies.map((r) => r.currency), displayCurrency = persistentWritable(DISPLAY_CURRENCY_KEY, null), marketCurrency = persistentWritable(MARKET_CURRENCY_KEY, null), localization = persistentWritable(LOCALIZATION, null), currencyRates = writable(null);
displayCurrency.subscribe((r) => {
  if (r && !whitelistedCurrencies.includes(r))
    return displayCurrency.set(DEFAULT_CURRENCY);
});
marketCurrency.subscribe(async (r) => {
  if (r) {
    if (!whitelistedCurrencies.includes(r))
      return marketCurrency.set(DEFAULT_CURRENCY);
    currencyRates.set(await nexusApi.getCurrencyRates(r));
  }
});
const availableMarkets = [
  {
    currency: "EUR",
    symbol: "€",
    country: "LT"
  },
  {
    currency: "AUD",
    symbol: "$",
    country: "AU"
  },
  {
    currency: "GBP",
    symbol: "£",
    country: "GB"
  },
  {
    currency: "USD",
    symbol: "$",
    country: "US"
  }
], countryToCurrency = (r) => {
  const e = availableMarkets.find((t) => t.country.toLowerCase() === r.toLowerCase());
  return e ? e.currency : "EUR";
}, getCookie = (r, e = null) => {
  if (!r.trim() || typeof document > "u" || !document.cookie)
    return e;
  try {
    const s = `; ${document.cookie}`.split(`; ${r}=`);
    if (s.length === 2) {
      const n = s.pop();
      if (n)
        return decodeURIComponent(n.split(";")[0]);
    }
    return e;
  } catch (t) {
    return console.error(`Error getting cookie "${r}":`, t), e;
  }
}, cookieExists = (r) => {
  if (!r.trim() || typeof document > "u" || !document.cookie)
    return !1;
  try {
    return `; ${document.cookie}`.split(`; ${r}=`).length === 2;
  } catch (e) {
    return console.error(`Error checking if cookie "${r}" exists:`, e), !1;
  }
}, initiateCurrencies = () => {
  if (!isShopifyOnWindow()) return;
  const r = {
    marketCurrency: get$1(marketCurrency),
    displayCurrency: get$1(displayCurrency),
    localization: get$1(localization)
  }, e = {
    cart_currency: getCookie("cart_currency"),
    localization: getCookie("localization")
  };
  if (e.cart_currency && !r.marketCurrency) {
    marketCurrency.set(e.cart_currency), displayCurrency.set(e.cart_currency), localization.set(e.localization);
    return;
  }
  r.localization || localization.set(e.localization);
  const t = new URL(window.location.href), n = new URLSearchParams(window.location.search).get("country");
  if (n) {
    displayCurrency.set(countryToCurrency(n)), localization.set(n), marketCurrency.set(countryToCurrency(n)), t.searchParams.delete("country"), window.history.replaceState({}, "", t.toString());
    return;
  }
  r.localization && (e.localization.toLowerCase(), r.localization.toLowerCase());
}, isBrowser$1 = () => !(typeof document > "u" || !document.cookie), getSession = (r, e = null) => {
  if (!r.trim() || !isBrowser$1())
    return e;
  const t = sessionStorage.getItem(r);
  if (!t)
    return e;
  try {
    return JSON.parse(t);
  } catch (s) {
    return console.error(`Error getting session "${r}":`, s), e;
  }
}, setSession = (r, e) => {
  if (!(!r.trim() || !isBrowser$1())) {
    try {
      e = JSON.stringify(e);
    } catch (t) {
      console.error(`Error setting session "${r}":`, t);
      return;
    }
    sessionStorage.setItem(r, e);
  }
}, LOCALIZATION_STORAGE_KEYS = {
  VISITED_BEFORE: "localization_visited_before",
  LAST_CHECKED: "localization_last_checked",
  SESSION_INITIALIZED: "localization_session_initialized"
}, LOCALIZATION_REFRESH_INTERVAL = 24 * 60 * 60 * 1e3, hasVisitedBefore = () => isBrowser$1() ? localStorage.getItem(LOCALIZATION_STORAGE_KEYS.VISITED_BEFORE) === "true" : !1, markAsVisited = () => {
  isBrowser$1() && localStorage.setItem(LOCALIZATION_STORAGE_KEYS.VISITED_BEFORE, "true");
}, getLastLocalizationCheck = () => {
  if (!isBrowser$1()) return null;
  const r = localStorage.getItem(LOCALIZATION_STORAGE_KEYS.LAST_CHECKED);
  return r ? parseInt(r, 10) : null;
}, updateLastLocalizationCheck = () => {
  isBrowser$1() && localStorage.setItem(LOCALIZATION_STORAGE_KEYS.LAST_CHECKED, Date.now().toString());
}, needsLocalizationRefresh = () => {
  const r = getLastLocalizationCheck();
  return r === null ? !0 : Date.now() - r >= LOCALIZATION_REFRESH_INTERVAL;
}, CLOUDFLARE_GEO_WORKER_URL = "https://geo-location.rokas-239.workers.dev", getGeolocation = async (r) => {
  try {
    const e = new URL(CLOUDFLARE_GEO_WORKER_URL);
    e.searchParams.set("_t", `${Date.now()}-${Math.random().toString(36).substring(7)}`);
    const t = await fetch(e.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      cache: "no-store",
      // Prevent browser caching (fetch API option, not a header)
      credentials: "omit",
      // Don't send cookies - prevents cookie-based caching
      signal: r
    });
    if (!t.ok)
      throw new Error(`HTTP ${t.status}`);
    return (await t.json()).country || null;
  } catch (e) {
    if (e instanceof Error && e.name === "AbortError")
      throw e;
    return console.error("Failed to get geolocation from Cloudflare Worker:", e), null;
  }
}, getBaseUrl = () => {
  const r = PUBLIC_NEXUS_BASE_URL;
  return r.endsWith("/api") ? r : `${r}/api`;
}, BASE_URL = getBaseUrl(), API_ROUTES = {
  GET_AUTOMATIC_DISCOUNT: (r, e) => `automatic-discount/${r}/${e}`,
  GET_GEOLOCATION: () => "geolocation",
  LOG_GEOLOCATION: () => "logs/geolocation/attempt",
  LOG_GEOLOCATION_FAILURE: () => "logs/geolocation/failure"
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
}, logGeolocationAttempt = async (r, e, t, s) => {
  try {
    await fetch(`${BASE_URL}/${API_ROUTES.LOG_GEOLOCATION()}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        method: r,
        success: e,
        country: t || null,
        error: s || null,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      })
    });
  } catch (n) {
    console.debug("Failed to log geolocation attempt:", n);
  }
}, logGeolocationFailure = async () => {
  try {
    const r = await fetch(`${BASE_URL}/${API_ROUTES.LOG_GEOLOCATION_FAILURE()}`, {
      method: "POST",
      headers: {
        Accept: "application/json"
      }
    });
    if (!r.ok)
      throw new Error(`HTTP ${r.status}`);
    const e = await r.json();
    return e.success && e.country || null;
  } catch (r) {
    return console.error("Failed to get geolocation fallback:", r), null;
  }
}, getCountryFromIpApi = async () => {
  try {
    const r = new AbortController(), e = setTimeout(() => r.abort(), 5e3), t = await fetch("https://ipapi.co/json/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      signal: r.signal
    });
    if (clearTimeout(e), !t.ok)
      throw new Error(`HTTP ${t.status}`);
    const s = await t.json();
    return s.country_code ? (frontendLogger.debug(`Geolocation: Detected from ipapi.co: ${s.country_code}`), s.country_code) : null;
  } catch (r) {
    return r instanceof Error && r.name === "AbortError" ? frontendLogger.debug("Geolocation: ipapi.co method timed out") : frontendLogger.debug("Geolocation: ipapi.co method failed", r), null;
  }
}, getCountryFromIpApiProxied = async () => {
  try {
    const r = new AbortController(), e = setTimeout(() => r.abort(), 5e3);
    frontendLogger.debug("http://ip-api.com/json/"), await new Promise((n) => setTimeout(n, 1e3));
    const t = await fetch("http://ip-api.com/json/", {
      method: "GET",
      signal: r.signal
    });
    if (clearTimeout(e), !t.ok)
      throw new Error(`HTTP ${t.status}`);
    const s = await t.json();
    return s.status === "success" && s.countryCode ? (frontendLogger.debug(`Geolocation: Detected from ip-api.com: ${s.countryCode}`), s.countryCode) : null;
  } catch (r) {
    return r instanceof Error && r.name === "AbortError" ? frontendLogger.debug("Geolocation: ip-api.com method timed out") : frontendLogger.debug("Geolocation: ip-api.com method failed", r), null;
  }
}, getCountryFromIpWho = async () => {
  try {
    const r = new AbortController(), e = setTimeout(() => r.abort(), 5e3), t = await fetch("https://ipwho.is/", {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
      signal: r.signal
    });
    if (clearTimeout(e), !t.ok)
      throw new Error(`HTTP ${t.status}`);
    const s = await t.json();
    return s.success && s.country_code ? (frontendLogger.debug(`Geolocation: Detected from ipwho.is: ${s.country_code}`), s.country_code) : null;
  } catch (r) {
    return r instanceof Error && r.name === "AbortError" ? frontendLogger.debug("Geolocation: ipwho.is method timed out") : frontendLogger.debug("Geolocation: ipwho.is method failed", r), null;
  }
}, getCountryFromNexus = async () => {
  const r = "nexus";
  try {
    const e = new AbortController(), t = setTimeout(() => e.abort(), 5e3), s = await getGeolocation(e.signal);
    return clearTimeout(t), s ? (frontendLogger.debug(`Geolocation: Detected from Nexus API: ${s}`), await logGeolocationAttempt(r, !0, s), s) : (await logGeolocationAttempt(r, !1, null, "No country returned"), null);
  } catch (e) {
    const t = e instanceof Error ? e.message : "Unknown error";
    return e instanceof Error && e.name === "AbortError" ? (frontendLogger.debug("Geolocation: Nexus API method timed out"), await logGeolocationAttempt(r, !1, null, "Request timeout")) : (frontendLogger.debug("Geolocation: Nexus API method failed", e), await logGeolocationAttempt(r, !1, null, t)), null;
  }
}, detectUserCountry = async () => {
  frontendLogger.debug("Geolocation: Starting country detection...");
  const r = [
    getGeolocation,
    // Unlimited, our own w/ claudflare
    getCountryFromIpWho,
    // 10k req/month (final fallback)
    getCountryFromIpApi,
    // 1000 req/day
    getCountryFromIpApiProxied,
    // 45 req/min (~65k/day)
    getCountryFromNexus
    // Uses ipapi, but from server other IP addr
  ];
  for (const e of r)
    try {
      const t = await e();
      if (t)
        return t;
    } catch (t) {
      frontendLogger.debug("Geolocation: Method failed, trying next...", t);
    }
  return frontendLogger.warn("Geolocation: All detection methods failed"), await logGeolocationFailure(), null;
};
typeof window < "u" && (window.detectUserCountry = detectUserCountry);
const normalizeCountryCode = (r) => r.toUpperCase(), LOCALIZATION_COOKIE_NAME$1 = "localization", JUST_REFRESHED_FLAG = "localization_just_refreshed", initializeSession = () => {
  setSession(LOCALIZATION_STORAGE_KEYS.SESSION_INITIALIZED, !0);
}, wasJustRefreshed = () => isBrowser$1() ? localStorage.getItem(JUST_REFRESHED_FLAG) === "true" : !1, handlePostRefresh = () => {
  if (isBrowser$1())
    try {
      localStorage.removeItem(JUST_REFRESHED_FLAG), initializeSession(), updateLastLocalizationCheck(), frontendLogger.debug("Localization: Freshened successfully", getCookie(LOCALIZATION_COOKIE_NAME$1));
    } catch (r) {
      frontendLogger.warn("Localization: Error during post-refresh initialization", r);
    }
}, handleFirstVisit = () => {
  markAsVisited(), initializeSession(), frontendLogger.debug("Localization: First visit, keeping default Shopify cookie");
}, triggerLocalizationRefresh = async () => {
  if (isBrowser$1()) {
    frontendLogger.debug("Localization: Starting refresh process...");
    try {
      const r = await detectUserCountry();
      if (!r) {
        frontendLogger.warn("Localization: Could not detect user country, skipping refresh"), updateLastLocalizationCheck(), initializeSession();
        return;
      }
      const e = normalizeCountryCode(r), t = getCookie(LOCALIZATION_COOKIE_NAME$1);
      if ((t == null ? void 0 : t.toUpperCase()) === e.toUpperCase()) {
        frontendLogger.debug(`Localization: Already in correct market (${e}), no redirect needed`), updateLastLocalizationCheck(), initializeSession();
        return;
      }
      frontendLogger.debug(`Localization: Redirecting from ${t} to ${e}`);
      try {
        displayCurrency.set(null), marketCurrency.set(null), localization.set(null);
      } catch (s) {
        frontendLogger.warn("Localization: Error clearing stores before redirect", s);
      }
      try {
        localStorage.setItem(JUST_REFRESHED_FLAG, "true");
      } catch (s) {
        frontendLogger.warn("Localization: Error setting refresh flag", s);
      }
      try {
        new URL(window.location.href).searchParams.set("country", e);
      } catch (s) {
        frontendLogger.warn("Localization: Error during redirect", s);
      }
    } catch (r) {
      frontendLogger.warn("Localization: Unexpected error in refresh process", r);
      try {
        updateLastLocalizationCheck(), initializeSession();
      } catch (e) {
        frontendLogger.warn("Localization: Error in fallback recovery", e);
      }
    }
  }
}, handleReturningVisitorNoRefresh = () => {
  updateLastLocalizationCheck(), initializeSession(), frontendLogger.debug("Localization: Recent check, keeping existing cookie");
}, LOCALIZATION_COOKIE_NAME = "localization", geolocationMarketEnforcer = async () => {
  if (isBrowser$1())
    try {
      if (wasJustRefreshed()) {
        handlePostRefresh();
        return;
      }
      if (getSession(LOCALIZATION_STORAGE_KEYS.SESSION_INITIALIZED)) {
        frontendLogger.debug("Localization: Same session, skipping checks");
        return;
      }
      if (!hasVisitedBefore()) {
        handleFirstVisit();
        return;
      }
      if (needsLocalizationRefresh() && cookieExists(LOCALIZATION_COOKIE_NAME)) {
        await triggerLocalizationRefresh();
        return;
      }
      handleReturningVisitorNoRefresh();
    } catch (r) {
      frontendLogger.warn("Localization: Unexpected error in freshener", r);
    }
}, mainHead = async () => {
  cacheSweeper(), await geolocationMarketEnforcer(), initiateCurrencies(), enforceCartCalculationConsistency(), initPreorderListener();
}, PUBLIC_VERSION = "5";
var De;
typeof window < "u" && ((De = window.__svelte ?? (window.__svelte = {})).v ?? (De.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
enable_legacy_mode_flag();
var root_1$c = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-sl8aa8"> </s>'), root$j = /* @__PURE__ */ from_html('<div class="price-ui svelte-sl8aa8"><!> <p> </p></div>');
const $$css$l = {
  hash: "svelte-sl8aa8",
  code: `.price-ui.svelte-sl8aa8 {display:flex;gap:0 8px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-sl8aa8 {gap:4px;}
}.price-ui--value.svelte-sl8aa8 {font-family:"Monument", sans-serif;font-size:16px;color:black;letter-spacing:-0.22px;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-sl8aa8 {font-size:12px;}
}.red.svelte-sl8aa8 {color:rgb(210, 25, 16);}`
};
function CartItemPrice(r, e) {
  push(e, !0), append_styles(r, $$css$l);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7);
  var n = {
    get price() {
      return t();
    },
    set price(f) {
      t(f), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(f) {
      s(f), flushSync();
    }
  }, i = root$j(), o = child(i);
  {
    var l = (f) => {
      var p = root_1$c(), g = child(p, !0);
      reset(p), template_effect(() => set_text(g, s())), append(f, p);
    };
    if_block(o, (f) => {
      s() && f(l);
    });
  }
  var c = sibling(o, 2);
  let u;
  var d = child(c, !0);
  return reset(c), reset(i), template_effect(
    (f) => {
      u = set_class(c, 1, "price-ui--value svelte-sl8aa8", null, u, f), set_text(d, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, i), pop(n);
}
create_custom_element(CartItemPrice, { price: {}, comparedAt: {} }, [], [], !0);
var root_1$b = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-1a0odwl"> </s>'), root$i = /* @__PURE__ */ from_html('<div class="price-ui svelte-1a0odwl"><!> <p> </p></div>');
const $$css$k = {
  hash: "svelte-1a0odwl",
  code: `.price-ui.svelte-1a0odwl {display:flex;gap:0 8px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-1a0odwl {gap:4px;}
}.price-ui--value.svelte-1a0odwl {font-family:"Monument", sans-serif;font-size:22px;color:black;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-1a0odwl {font-size:12px;}
}.red.svelte-1a0odwl {color:rgb(210, 25, 16);}`
};
function CartTotalPrice(r, e) {
  push(e, !0), append_styles(r, $$css$k);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7);
  var n = {
    get price() {
      return t();
    },
    set price(f) {
      t(f), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(f) {
      s(f), flushSync();
    }
  }, i = root$i(), o = child(i);
  {
    var l = (f) => {
      var p = root_1$b(), g = child(p, !0);
      reset(p), template_effect(() => set_text(g, s())), append(f, p);
    };
    if_block(o, (f) => {
      s() && f(l);
    });
  }
  var c = sibling(o, 2);
  let u;
  var d = child(c, !0);
  return reset(c), reset(i), template_effect(
    (f) => {
      u = set_class(c, 1, "price-ui--value svelte-1a0odwl", null, u, f), set_text(d, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, i), pop(n);
}
create_custom_element(CartTotalPrice, { price: {}, comparedAt: {} }, [], [], !0);
function parseCurrencyString(r, e = void 0) {
  if (!r && r !== "")
    return {
      formatted: "",
      value: 0,
      symbol: "",
      isSymbolAtStart: !0
    };
  r = String(r);
  const t = r.match(/^[\p{Currency_Symbol}\s]+|[\p{Currency_Symbol}\s]+$/gu), s = t ? t[0] : "", n = r.startsWith(s);
  if (!e) {
    let p = r.replace(/[^\d.,\-]/g, "");
    return p.includes(",") && (/,\d{2}$/.test(p) ? p = p.replace(/\./g, "").replace(",", ".") : p = p.replace(/,/g, "")), e = parseFloat(p), isNaN(e) && (e = 0), {
      formatted: r || "0",
      value: e,
      symbol: s,
      isSymbolAtStart: n
    };
  }
  e = Number(e), isNaN(e) && (e = 0);
  let i = e.toString();
  const o = /[.,]\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(r);
  if (!i.includes(".") && o)
    i += ".00";
  else if (i.includes(".")) {
    const [p, g] = i.split(".");
    i = p + "." + (g + "00").slice(0, 2);
  }
  const l = /\d,\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(r);
  if (l && (i = i.replace(".", ",")), /\d{1,3}([,.])\d{3}/.test(r)) {
    const [p, g] = i.split(/[.,]/), h = l ? "." : ",";
    i = `${p.replace(/\B(?=(\d{3})+(?!\d))/g, h)}${g ? (l ? "," : ".") + g : ""}`;
  }
  const u = /^[\p{Currency_Symbol}]+\s/u.test(r), d = /\s[\p{Currency_Symbol}]+$/u.test(r);
  return {
    formatted: n ? `${s}${u ? " " : ""}${i}` : `${i}${d ? " " : ""}${s}`,
    value: e,
    symbol: s,
    isSymbolAtStart: n
  };
}
const subtractFromPriceWithSymbol = (r, e) => {
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
  }, { value: s } = parseCurrencyString(r), { value: n } = e ? parseCurrencyString(e) : { value: void 0 };
  return s && n ? isNaN(n) ? t.compared_at = void 0 : s > n ? (t.compared_at = r, t.price = e) : (t.price = r, t.compared_at = e) : s && (t.price = r, t.compared_at = void 0), t;
}, priceToDiscount = ({ price: r, comparedAt: e }) => {
  if (!r || !e)
    return null;
  const { value: t } = parseCurrencyString(r), { value: s } = parseCurrencyString(e);
  if (!t || !s)
    return null;
  const n = Math.abs(s - t), i = Math.round(n / s * 100);
  return i > 0 ? i : 0;
};
var root_1$a = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-1c6f19y"> </s>'), root_2$4 = /* @__PURE__ */ from_html('<p class="price-ui--value percentage svelte-1c6f19y"><small class="red svelte-1c6f19y"> </small></p>'), root$h = /* @__PURE__ */ from_html('<div class="price-ui svelte-1c6f19y"><!> <p> </p> <!></div>');
const $$css$j = {
  hash: "svelte-1c6f19y",
  code: `.price-ui.svelte-1c6f19y {display:flex;flex-wrap:wrap;justify-content:center;gap:0 8px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-1c6f19y {gap:4px;}
}.price-ui--value.svelte-1c6f19y {font-family:"Monument", sans-serif;font-size:16px;color:rgb(124, 124, 124);letter-spacing:-0.22px;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-1c6f19y {font-size:12px;}
}small.svelte-1c6f19y {font-size:100%;}.red.svelte-1c6f19y {color:rgb(210, 25, 16);}.percentage.svelte-1c6f19y {width:100%;text-align:center;}`
};
function CollectionItemPrice(r, e) {
  push(e, !0), append_styles(r, $$css$j);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7), n = /* @__PURE__ */ user_derived(() => priceToDiscount({ price: t(), comparedAt: s() }));
  var i = {
    get price() {
      return t();
    },
    set price(h) {
      t(h), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(h) {
      s(h), flushSync();
    }
  }, o = root$h(), l = child(o);
  {
    var c = (h) => {
      var _ = root_1$a(), m = child(_, !0);
      reset(_), template_effect(() => set_text(m, s())), append(h, _);
    };
    if_block(l, (h) => {
      s() && h(c);
    });
  }
  var u = sibling(l, 2);
  let d;
  var f = child(u, !0);
  reset(u);
  var p = sibling(u, 2);
  {
    var g = (h) => {
      var _ = root_2$4(), m = child(_), y = child(m);
      reset(m), reset(_), template_effect(() => set_text(y, `-${get$2(n) ?? ""}% off`)), append(h, _);
    };
    if_block(p, (h) => {
      get$2(n) && h(g);
    });
  }
  return reset(o), template_effect(
    (h) => {
      d = set_class(u, 1, "price-ui--value svelte-1c6f19y", null, d, h), set_text(f, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, o), pop(i);
}
create_custom_element(CollectionItemPrice, { price: {}, comparedAt: {} }, [], [], !0);
var root_1$9 = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-1rcjg2v"> </s>'), root_2$3 = /* @__PURE__ */ from_html('<p class="price-ui--value percentage svelte-1rcjg2v"><span class="red svelte-1rcjg2v"> </span></p>'), root$g = /* @__PURE__ */ from_html('<div class="price-ui svelte-1rcjg2v"><p> </p> <!> <!></div>');
const $$css$i = {
  hash: "svelte-1rcjg2v",
  code: `.price-ui.svelte-1rcjg2v {display:flex;align-items:center;gap:0 16px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-1rcjg2v {gap:0px 8px;flex-wrap:wrap;}
}.price-ui--value.svelte-1rcjg2v {font-family:"Monument", sans-serif;font-size:48px;font-weight:500;color:#000;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-1rcjg2v {font-size:32px;}
}s.price-ui--value.svelte-1rcjg2v {font-size:20px;letter-spacing:0.02em;color:rgb(123, 123, 123);text-decoration:line-through;}
@media screen and (max-width: 1024px) {s.price-ui--value.svelte-1rcjg2v {font-size:12px;}
}.red.svelte-1rcjg2v {color:rgb(171, 54, 58);}.percentage.svelte-1rcjg2v {font-size:20px;margin-left:-8px;}
@media screen and (max-width: 1024px) {.percentage.svelte-1rcjg2v {width:100%;line-height:0.6;font-size:12px;margin-left:0;}
}

@media screen and (max-width: 1024px) {.price-ui.svelte-1rcjg2v {display:grid;grid-template-columns:auto auto;grid-template-rows:auto auto;grid-template-areas:"compared-at percentage" "price price";justify-content:flex-end;}.price-ui--value.svelte-1rcjg2v {grid-area:price;text-align:right;}s.price-ui--value.svelte-1rcjg2v {grid-area:compared-at;}.percentage.svelte-1rcjg2v {grid-area:percentage;white-space:nowrap;}
}`
};
function ProductDetailsPagePrice(r, e) {
  push(e, !0), append_styles(r, $$css$i);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7), n = /* @__PURE__ */ user_derived(() => priceToDiscount({ price: t(), comparedAt: s() }));
  var i = {
    get price() {
      return t();
    },
    set price(h) {
      t(h), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(h) {
      s(h), flushSync();
    }
  }, o = root$g(), l = child(o);
  let c;
  var u = child(l, !0);
  reset(l);
  var d = sibling(l, 2);
  {
    var f = (h) => {
      var _ = root_1$9(), m = child(_, !0);
      reset(_), template_effect(() => set_text(m, s())), append(h, _);
    };
    if_block(d, (h) => {
      s() && h(f);
    });
  }
  var p = sibling(d, 2);
  {
    var g = (h) => {
      var _ = root_2$3(), m = child(_), y = child(m);
      reset(m), reset(_), template_effect(() => set_text(y, `-${get$2(n) ?? ""}% off`)), append(h, _);
    };
    if_block(p, (h) => {
      get$2(n) && h(g);
    });
  }
  return reset(o), template_effect(
    (h) => {
      c = set_class(l, 1, "price-ui--value svelte-1rcjg2v", null, c, h), set_text(u, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, o), pop(i);
}
create_custom_element(ProductDetailsPagePrice, { price: {}, comparedAt: {} }, [], [], !0);
function SearchCardPrice(r, e) {
  const t = /* @__PURE__ */ rest_props(e, ["$$slots", "$$events", "$$legacy", "$$host"]);
  CartItemPrice(r, spread_props(() => t));
}
create_custom_element(SearchCardPrice, {}, [], [], !0);
const removeNonComponentChildren = (r, e = !0) => {
  var t;
  return e && Array.from(((t = r.parentElement) == null ? void 0 : t.children) || []).filter((s) => s !== r).forEach((s) => {
    var n;
    return (n = s.parentElement) == null ? void 0 : n.removeChild(s);
  }), {
    update(s) {
      var n;
      s && !e && Array.from(((n = r.parentElement) == null ? void 0 : n.children) || []).filter((i) => i !== r).forEach((i) => {
        var o;
        return (o = i.parentElement) == null ? void 0 : o.removeChild(i);
      }), e = s;
    }
  };
}, normalizePrice = (r, e) => ((e === "nodiscount" || !e) && (e = void 0), e && parseCurrencyString(r).value === parseCurrencyString(e).value && (e = void 0), e && parseCurrencyString(r).value > parseCurrencyString(e).value && ([r, e] = [e, r]), { price: r, comparedAt: e });
var root$f = /* @__PURE__ */ from_html("<div><!></div>");
function ProductPrice(r, e) {
  push(e, !0);
  const t = () => store_get(displayCurrency, "$displayCurrency", i), s = () => store_get(currencyRates, "$currencyRates", i), n = () => store_get(marketCurrency, "$marketCurrency", i), [i, o] = setup_stores(), l = prop(e, "price", 7), c = prop(e, "compared_at", 7), u = prop(e, "iso_code", 7), d = prop(e, "variant_id", 7), f = prop(e, "product_id", 7), p = prop(e, "type", 7, "ProductDetailsPagePrice"), g = prop(e, "isPriceReady", 15, !1), h = prop(e, "DEV_currency", 7), _ = prop(e, "DEV_market", 7);
  let m = /* @__PURE__ */ state(!1);
  const y = new NexusApi(), w = { price: "-1", comparedAt: void 0 }, v = /* @__PURE__ */ user_derived(() => normalizePrice(l(), c())), b = /* @__PURE__ */ state(proxy(w)), S = /* @__PURE__ */ state(proxy(w));
  user_effect(() => {
    if (get$2(b).price = get$2(v).price, get$2(b).comparedAt = get$2(v).comparedAt, !!u() && !(!d() && !f()) && get$2(v).price && !get$2(v).comparedAt)
      try {
        E({ ...get$2(v) }).then(({ price: x, comparedAt: $ }) => {
          get$2(b).price = x, get$2(b).comparedAt = $;
        });
      } catch (x) {
        console.error(x);
      }
  }), user_effect(() => {
    if (!t() || !s()) return;
    const x = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: t(),
      // 'EUR', 'USD', etc.
      currencySign: "standard",
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }), { value: $ } = parseCurrencyString(get$2(b).price);
    if (get$2(S).price = x.format($), get$2(b).comparedAt) {
      const { value: U } = parseCurrencyString(get$2(b).comparedAt);
      get$2(S).comparedAt = x.format(U);
    } else
      get$2(S).comparedAt = void 0;
    if (n() === t()) return;
    const B = s()[t()];
    if (get$2(S).price = x.format(Math.round($ * B)), get$2(b).comparedAt) {
      const { value: U } = parseCurrencyString(get$2(b).comparedAt);
      get$2(S).comparedAt = x.format(Math.round(U * B));
    } else
      get$2(S).comparedAt = void 0;
  });
  const E = async ({ price: x }) => {
    if (!u()) throw new Error("Market is required");
    if (!d() && !f()) throw new Error("Either variant or product id is required is required");
    set(m, !0);
    const $ = y.getVariantAutomaticDiscount.bind(y), B = y.getProductAutomaticDiscount.bind(y), U = d() ? () => $(u(), +d()) : () => B(u(), +f()), { amount: M } = await U();
    if (set(m, !1), !M || M === 0) return { price: x, comparedAt: void 0 };
    const { formatted: j } = subtractFromPriceWithSymbol(x, M);
    return { price: j, comparedAt: x };
  };
  user_effect(() => {
    h() && displayCurrency.set(h()), _() && marketCurrency.set(_());
  });
  const A = /* @__PURE__ */ user_derived(() => {
    switch (p()) {
      case "CartItemPrice":
        return CartItemPrice;
      case "CollectionItemPrice":
        return CollectionItemPrice;
      case "CartTotalPrice":
        return CartTotalPrice;
      case "SearchCardPrice":
        return SearchCardPrice;
      case "ProductDetailsPagePrice":
        return ProductDetailsPagePrice;
      default:
        return ProductDetailsPagePrice;
    }
  }), I = /* @__PURE__ */ user_derived(() => n() && get$2(S).price !== "-1" && !get$2(m));
  let P;
  user_effect(() => {
    P && (P.shouldShowPrice = get$2(I), P.dispatchEvent(new CustomEvent("shouldShowPriceChanged", {
      detail: { shouldShowPrice: get$2(I) },
      bubbles: !0
    })));
  });
  var O = {
    get price() {
      return l();
    },
    set price(x) {
      l(x), flushSync();
    },
    get compared_at() {
      return c();
    },
    set compared_at(x) {
      c(x), flushSync();
    },
    get iso_code() {
      return u();
    },
    set iso_code(x) {
      u(x), flushSync();
    },
    get variant_id() {
      return d();
    },
    set variant_id(x) {
      d(x), flushSync();
    },
    get product_id() {
      return f();
    },
    set product_id(x) {
      f(x), flushSync();
    },
    get type() {
      return p();
    },
    set type(x = "ProductDetailsPagePrice") {
      p(x), flushSync();
    },
    get isPriceReady() {
      return g();
    },
    set isPriceReady(x = !1) {
      g(x), flushSync();
    },
    get DEV_currency() {
      return h();
    },
    set DEV_currency(x) {
      h(x), flushSync();
    },
    get DEV_market() {
      return _();
    },
    set DEV_market(x) {
      _(x), flushSync();
    }
  }, R = root$f(), C = child(R);
  {
    var k = (x) => {
      var $ = comment(), B = first_child($);
      component(B, () => get$2(A), (U, M) => {
        M(U, spread_props(() => get$2(S)));
      }), append(x, $);
    };
    if_block(C, (x) => {
      get$2(I) && x(k);
    });
  }
  reset(R), bind_this(R, (x) => P = x, () => P), action(R, (x, $) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(x, $), () => get$2(I)), append(r, R);
  var N = pop(O);
  return o(), N;
}
customElements.define("product-price", create_custom_element(
  ProductPrice,
  {
    price: {},
    compared_at: {},
    iso_code: {},
    variant_id: {},
    product_id: {},
    type: {},
    isPriceReady: {},
    DEV_currency: {},
    DEV_market: {}
  },
  [],
  [],
  !1
));
var root_1$8 = /* @__PURE__ */ from_html('<article class="card svelte-t07r6b"><img class="svelte-t07r6b"/> <div class="content svelte-t07r6b"><h3 class="svelte-t07r6b"> </h3> <div class="tuple text-green-600 svelte-t07r6b"><!></div> <div class="ctas-buttons svelte-t07r6b"><a style="transform: rotate(180deg)"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-t07r6b"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a> <a class="cta svelte-t07r6b"><span>Add to cart</span></a>    <a><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-t07r6b"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a></div></div></article>');
const $$css$h = {
  hash: "svelte-t07r6b",
  code: `/* Colors */
/**
 * Text styles
 */.text-green-600.svelte-t07r6b, .text-green-600 {color:#018849;}

/**
 * Background styles
 */ .cta.svelte-t07r6b, .bg-green-600 {background-color:#018849;}body {display:none !important;}.cta.svelte-t07r6b {color:#ffffff;cursor:pointer;}.card.svelte-t07r6b {width:100%;max-width:400px;display:flex;gap:27px;color:inherit;text-decoration:none;}.caret.svelte-t07r6b {background-color:#000000;color:#ffffff;fill:#ffffff;cursor:pointer;}.caret---qualified.svelte-t07r6b {background-color:#018849;}.ctas-buttons.svelte-t07r6b {display:flex;gap:1px;justify-content:center;align-content:center;}a.svelte-t07r6b {display:flex;justify-content:center;align-items:center;font-size:14px;border:none;color:#000;background-color:#b4bed6;font-family:Monument, sans-serif;width:100%;height:41px;text-decoration:none;text-transform:uppercase;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:-0.22px;}a.svelte-t07r6b:nth-child(1),
a.svelte-t07r6b:nth-child(3) {aspect-ratio:1/1;flex-shrink:1;width:auto;}a.svelte-t07r6b svg:where(.svelte-t07r6b) {width:16px;}.content.svelte-t07r6b {width:70%;display:flex;flex-direction:column;}h3.svelte-t07r6b {margin:0;margin-bottom:10px;font-weight:100;min-height:32px;font-size:16px;color:#000;font-family:Panama, sans-serif;text-align:left;cursor:pointer;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:-0.22px;line-height:16px;}.tuple.svelte-t07r6b {display:flex;justify-content:space-between;align-items:start;flex-grow:1;}img.svelte-t07r6b {display:block;width:30%;object-fit:cover;aspect-ratio:4/5;cursor:pointer;}`
};
function CartRecommendationCard($$anchor, $$props) {
  push($$props, !1), append_styles($$anchor, $$css$h);
  let id = prop($$props, "id", 12, void 0), title = prop($$props, "title", 12, void 0), featured_image = prop($$props, "featured_image", 12, void 0), price = prop($$props, "price", 12, void 0), url = prop($$props, "url", 12, void 0), onPrevious = prop($$props, "onPrevious", 12, ""), onNext = prop($$props, "onNext", 12, ""), spend_goal = prop($$props, "spend_goal", 12, 1), already_spent = prop($$props, "already_spent", 12, 2);
  const addToCart = () => {
    if (!window.CartJS) return console.error("Trying to add item, but CartJS is not accessible");
    if (!id()) return console.error("Trying to add item, but id is not provided");
    window.CartJS.addItem(id(), 1);
  }, toItem = () => {
    url() && (window.location.href = url());
  };
  var $$exports = {
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
  };
  init();
  var fragment = comment(), node = first_child(fragment);
  {
    var consequent = ($$anchor) => {
      var article = root_1$8(), img = child(article), div = sibling(img, 2), h3 = child(div), text = child(h3, !0);
      reset(h3);
      var div_1 = sibling(h3, 2), node_1 = child(div_1);
      {
        let r = /* @__PURE__ */ derived_safe_equal(() => (deep_read_state(price()), untrack(() => price().toString())));
        ProductPrice(node_1, {
          get price() {
            return get$2(r);
          },
          type: "CartItemPrice",
          get variant_id() {
            return id();
          }
        });
      }
      reset(div_1);
      var div_2 = sibling(div_1, 2), a = child(div_2);
      set_class(a, 1, "caret svelte-t07r6b", null, {}, { "caret---qualified": !0 });
      var a_1 = sibling(a, 2), a_2 = sibling(a_1, 2);
      set_class(a_2, 1, "caret svelte-t07r6b", null, {}, { "caret---qualified": !0 }), reset(div_2), reset(div), reset(article), template_effect(() => {
        set_attribute(img, "src", featured_image()), set_attribute(img, "alt", title()), set_text(text, title());
      }), event$1("click", img, toItem), event$1("click", h3, toItem), event$1("click", a, () => eval(onPrevious())), event$1("click", a_1, addToCart), event$1("click", a_2, () => eval(onNext())), append($$anchor, article);
    };
    if_block(node, (r) => {
      title() && featured_image() && price() && url() && r(consequent);
    });
  }
  return append($$anchor, fragment), pop($$exports);
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
var extendStatics = function(r, e) {
  return extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, s) {
    t.__proto__ = s;
  } || function(t, s) {
    for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]);
  }, extendStatics(r, e);
};
function __extends(r, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  extendStatics(r, e);
  function t() {
    this.constructor = r;
  }
  r.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var __assign = function() {
  return __assign = Object.assign || function(e) {
    for (var t, s = 1, n = arguments.length; s < n; s++) {
      t = arguments[s];
      for (var i in t) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, __assign.apply(this, arguments);
};
function __rest(r, e) {
  var t = {};
  for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && e.indexOf(s) < 0 && (t[s] = r[s]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var n = 0, s = Object.getOwnPropertySymbols(r); n < s.length; n++)
      e.indexOf(s[n]) < 0 && Object.prototype.propertyIsEnumerable.call(r, s[n]) && (t[s[n]] = r[s[n]]);
  return t;
}
function __decorate(r, e, t, s) {
  var n = arguments.length, i = n < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, t) : s, o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") i = Reflect.decorate(r, e, t, s);
  else for (var l = r.length - 1; l >= 0; l--) (o = r[l]) && (i = (n < 3 ? o(i) : n > 3 ? o(e, t, i) : o(e, t)) || i);
  return n > 3 && i && Object.defineProperty(e, t, i), i;
}
function __param(r, e) {
  return function(t, s) {
    e(t, s, r);
  };
}
function __esDecorate(r, e, t, s, n, i) {
  function o(y) {
    if (y !== void 0 && typeof y != "function") throw new TypeError("Function expected");
    return y;
  }
  for (var l = s.kind, c = l === "getter" ? "get" : l === "setter" ? "set" : "value", u = !e && r ? s.static ? r : r.prototype : null, d = e || (u ? Object.getOwnPropertyDescriptor(u, s.name) : {}), f, p = !1, g = t.length - 1; g >= 0; g--) {
    var h = {};
    for (var _ in s) h[_] = _ === "access" ? {} : s[_];
    for (var _ in s.access) h.access[_] = s.access[_];
    h.addInitializer = function(y) {
      if (p) throw new TypeError("Cannot add initializers after decoration has completed");
      i.push(o(y || null));
    };
    var m = (0, t[g])(l === "accessor" ? { get: d.get, set: d.set } : d[c], h);
    if (l === "accessor") {
      if (m === void 0) continue;
      if (m === null || typeof m != "object") throw new TypeError("Object expected");
      (f = o(m.get)) && (d.get = f), (f = o(m.set)) && (d.set = f), (f = o(m.init)) && n.unshift(f);
    } else (f = o(m)) && (l === "field" ? n.unshift(f) : d[c] = f);
  }
  u && Object.defineProperty(u, s.name, d), p = !0;
}
function __runInitializers(r, e, t) {
  for (var s = arguments.length > 2, n = 0; n < e.length; n++)
    t = s ? e[n].call(r, t) : e[n].call(r);
  return s ? t : void 0;
}
function __propKey(r) {
  return typeof r == "symbol" ? r : "".concat(r);
}
function __setFunctionName(r, e, t) {
  return typeof e == "symbol" && (e = e.description ? "[".concat(e.description, "]") : ""), Object.defineProperty(r, "name", { configurable: !0, value: t ? "".concat(t, " ", e) : e });
}
function __metadata(r, e) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(r, e);
}
function __awaiter(r, e, t, s) {
  function n(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
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
      d.done ? i(d.value) : n(d.value).then(l, c);
    }
    u((s = s.apply(r, e || [])).next());
  });
}
function __generator(r, e) {
  var t = { label: 0, sent: function() {
    if (i[0] & 1) throw i[1];
    return i[1];
  }, trys: [], ops: [] }, s, n, i, o = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
  return o.next = l(0), o.throw = l(1), o.return = l(2), typeof Symbol == "function" && (o[Symbol.iterator] = function() {
    return this;
  }), o;
  function l(u) {
    return function(d) {
      return c([u, d]);
    };
  }
  function c(u) {
    if (s) throw new TypeError("Generator is already executing.");
    for (; o && (o = 0, u[0] && (t = 0)), t; ) try {
      if (s = 1, n && (i = u[0] & 2 ? n.return : u[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, u[1])).done) return i;
      switch (n = 0, i && (u = [u[0] & 2, i.value]), u[0]) {
        case 0:
        case 1:
          i = u;
          break;
        case 4:
          return t.label++, { value: u[1], done: !1 };
        case 5:
          t.label++, n = u[1], u = [0];
          continue;
        case 7:
          u = t.ops.pop(), t.trys.pop();
          continue;
        default:
          if (i = t.trys, !(i = i.length > 0 && i[i.length - 1]) && (u[0] === 6 || u[0] === 2)) {
            t = 0;
            continue;
          }
          if (u[0] === 3 && (!i || u[1] > i[0] && u[1] < i[3])) {
            t.label = u[1];
            break;
          }
          if (u[0] === 6 && t.label < i[1]) {
            t.label = i[1], i = u;
            break;
          }
          if (i && t.label < i[2]) {
            t.label = i[2], t.ops.push(u);
            break;
          }
          i[2] && t.ops.pop(), t.trys.pop();
          continue;
      }
      u = e.call(r, t);
    } catch (d) {
      u = [6, d], n = 0;
    } finally {
      s = i = 0;
    }
    if (u[0] & 5) throw u[1];
    return { value: u[0] ? u[1] : void 0, done: !0 };
  }
}
var __createBinding = Object.create ? function(r, e, t, s) {
  s === void 0 && (s = t);
  var n = Object.getOwnPropertyDescriptor(e, t);
  (!n || ("get" in n ? !e.__esModule : n.writable || n.configurable)) && (n = { enumerable: !0, get: function() {
    return e[t];
  } }), Object.defineProperty(r, s, n);
} : function(r, e, t, s) {
  s === void 0 && (s = t), r[s] = e[t];
};
function __exportStar(r, e) {
  for (var t in r) t !== "default" && !Object.prototype.hasOwnProperty.call(e, t) && __createBinding(e, r, t);
}
function __values(r) {
  var e = typeof Symbol == "function" && Symbol.iterator, t = e && r[e], s = 0;
  if (t) return t.call(r);
  if (r && typeof r.length == "number") return {
    next: function() {
      return r && s >= r.length && (r = void 0), { value: r && r[s++], done: !r };
    }
  };
  throw new TypeError(e ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(r, e) {
  var t = typeof Symbol == "function" && r[Symbol.iterator];
  if (!t) return r;
  var s = t.call(r), n, i = [], o;
  try {
    for (; (e === void 0 || e-- > 0) && !(n = s.next()).done; ) i.push(n.value);
  } catch (l) {
    o = { error: l };
  } finally {
    try {
      n && !n.done && (t = s.return) && t.call(s);
    } finally {
      if (o) throw o.error;
    }
  }
  return i;
}
function __spread() {
  for (var r = [], e = 0; e < arguments.length; e++)
    r = r.concat(__read(arguments[e]));
  return r;
}
function __spreadArrays() {
  for (var r = 0, e = 0, t = arguments.length; e < t; e++) r += arguments[e].length;
  for (var s = Array(r), n = 0, e = 0; e < t; e++)
    for (var i = arguments[e], o = 0, l = i.length; o < l; o++, n++)
      s[n] = i[o];
  return s;
}
function __spreadArray(r, e, t) {
  if (t || arguments.length === 2) for (var s = 0, n = e.length, i; s < n; s++)
    (i || !(s in e)) && (i || (i = Array.prototype.slice.call(e, 0, s)), i[s] = e[s]);
  return r.concat(i || Array.prototype.slice.call(e));
}
function __await(r) {
  return this instanceof __await ? (this.v = r, this) : new __await(r);
}
function __asyncGenerator(r, e, t) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var s = t.apply(r, e || []), n, i = [];
  return n = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), l("next"), l("throw"), l("return", o), n[Symbol.asyncIterator] = function() {
    return this;
  }, n;
  function o(g) {
    return function(h) {
      return Promise.resolve(h).then(g, f);
    };
  }
  function l(g, h) {
    s[g] && (n[g] = function(_) {
      return new Promise(function(m, y) {
        i.push([g, _, m, y]) > 1 || c(g, _);
      });
    }, h && (n[g] = h(n[g])));
  }
  function c(g, h) {
    try {
      u(s[g](h));
    } catch (_) {
      p(i[0][3], _);
    }
  }
  function u(g) {
    g.value instanceof __await ? Promise.resolve(g.value.v).then(d, f) : p(i[0][2], g);
  }
  function d(g) {
    c("next", g);
  }
  function f(g) {
    c("throw", g);
  }
  function p(g, h) {
    g(h), i.shift(), i.length && c(i[0][0], i[0][1]);
  }
}
function __asyncDelegator(r) {
  var e, t;
  return e = {}, s("next"), s("throw", function(n) {
    throw n;
  }), s("return"), e[Symbol.iterator] = function() {
    return this;
  }, e;
  function s(n, i) {
    e[n] = r[n] ? function(o) {
      return (t = !t) ? { value: __await(r[n](o)), done: !1 } : i ? i(o) : o;
    } : i;
  }
}
function __asyncValues(r) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = r[Symbol.asyncIterator], t;
  return e ? e.call(r) : (r = typeof __values == "function" ? __values(r) : r[Symbol.iterator](), t = {}, s("next"), s("throw"), s("return"), t[Symbol.asyncIterator] = function() {
    return this;
  }, t);
  function s(i) {
    t[i] = r[i] && function(o) {
      return new Promise(function(l, c) {
        o = r[i](o), n(l, c, o.done, o.value);
      });
    };
  }
  function n(i, o, l, c) {
    Promise.resolve(c).then(function(u) {
      i({ value: u, done: l });
    }, o);
  }
}
function __makeTemplateObject(r, e) {
  return Object.defineProperty ? Object.defineProperty(r, "raw", { value: e }) : r.raw = e, r;
}
var __setModuleDefault = Object.create ? function(r, e) {
  Object.defineProperty(r, "default", { enumerable: !0, value: e });
} : function(r, e) {
  r.default = e;
}, ownKeys = function(r) {
  return ownKeys = Object.getOwnPropertyNames || function(e) {
    var t = [];
    for (var s in e) Object.prototype.hasOwnProperty.call(e, s) && (t[t.length] = s);
    return t;
  }, ownKeys(r);
};
function __importStar(r) {
  if (r && r.__esModule) return r;
  var e = {};
  if (r != null) for (var t = ownKeys(r), s = 0; s < t.length; s++) t[s] !== "default" && __createBinding(e, r, t[s]);
  return __setModuleDefault(e, r), e;
}
function __importDefault(r) {
  return r && r.__esModule ? r : { default: r };
}
function __classPrivateFieldGet(r, e, t, s) {
  if (t === "a" && !s) throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? r !== e || !s : !e.has(r)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t === "m" ? s : t === "a" ? s.call(r) : s ? s.value : e.get(r);
}
function __classPrivateFieldSet(r, e, t, s, n) {
  if (s === "m") throw new TypeError("Private method is not writable");
  if (s === "a" && !n) throw new TypeError("Private accessor was defined without a setter");
  if (typeof e == "function" ? r !== e || !n : !e.has(r)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return s === "a" ? n.call(r, t) : n ? n.value = t : e.set(r, t), t;
}
function __classPrivateFieldIn(r, e) {
  if (e === null || typeof e != "object" && typeof e != "function") throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof r == "function" ? e === r : r.has(e);
}
function __addDisposableResource(r, e, t) {
  if (e != null) {
    if (typeof e != "object" && typeof e != "function") throw new TypeError("Object expected.");
    var s, n;
    if (t) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      s = e[Symbol.asyncDispose];
    }
    if (s === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      s = e[Symbol.dispose], t && (n = s);
    }
    if (typeof s != "function") throw new TypeError("Object not disposable.");
    n && (s = function() {
      try {
        n.call(this);
      } catch (i) {
        return Promise.reject(i);
      }
    }), r.stack.push({ value: e, dispose: s, async: t });
  } else t && r.stack.push({ async: !0 });
  return e;
}
var _SuppressedError = typeof SuppressedError == "function" ? SuppressedError : function(r, e, t) {
  var s = new Error(t);
  return s.name = "SuppressedError", s.error = r, s.suppressed = e, s;
};
function __disposeResources(r) {
  function e(i) {
    r.error = r.hasError ? new _SuppressedError(i, r.error, "An error was suppressed during disposal.") : i, r.hasError = !0;
  }
  var t, s = 0;
  function n() {
    for (; t = r.stack.pop(); )
      try {
        if (!t.async && s === 1) return s = 0, r.stack.push(t), Promise.resolve().then(n);
        if (t.dispose) {
          var i = t.dispose.call(t.value);
          if (t.async) return s |= 2, Promise.resolve(i).then(n, function(o) {
            return e(o), n();
          });
        } else s |= 1;
      } catch (o) {
        e(o);
      }
    if (s === 1) return r.hasError ? Promise.reject(r.error) : Promise.resolve();
    if (r.hasError) throw r.error;
  }
  return n();
}
function __rewriteRelativeImportExtension(r, e) {
  return typeof r == "string" && /^\.\.?\//.test(r) ? r.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(t, s, n, i, o) {
    return s ? e ? ".jsx" : ".js" : n && (!i || !o) ? t : n + i + "." + o.toLowerCase() + "js";
  }) : r;
}
const tslib_es6 = {
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension
}, tslib_es6$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  __addDisposableResource,
  get __assign() {
    return __assign;
  },
  __asyncDelegator,
  __asyncGenerator,
  __asyncValues,
  __await,
  __awaiter,
  __classPrivateFieldGet,
  __classPrivateFieldIn,
  __classPrivateFieldSet,
  __createBinding,
  __decorate,
  __disposeResources,
  __esDecorate,
  __exportStar,
  __extends,
  __generator,
  __importDefault,
  __importStar,
  __makeTemplateObject,
  __metadata,
  __param,
  __propKey,
  __read,
  __rest,
  __rewriteRelativeImportExtension,
  __runInitializers,
  __setFunctionName,
  __spread,
  __spreadArray,
  __spreadArrays,
  __values,
  default: tslib_es6
}, Symbol.toStringTag, { value: "Module" })), resolveFetch$4 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$1).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
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
class FunctionsClient {
  constructor(e, { headers: t = {}, customFetch: s, region: n = FunctionRegion.Any } = {}) {
    this.url = e, this.headers = t, this.region = n, this.fetch = resolveFetch$4(s);
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
  invoke(e) {
    return __awaiter(this, arguments, void 0, function* (t, s = {}) {
      var n;
      try {
        const { headers: i, method: o, body: l, signal: c } = s;
        let u = {}, { region: d } = s;
        d || (d = this.region);
        const f = new URL(`${this.url}/${t}`);
        d && d !== "any" && (u["x-region"] = d, f.searchParams.set("forceFunctionRegion", d));
        let p;
        l && (i && !Object.prototype.hasOwnProperty.call(i, "Content-Type") || !i) ? typeof Blob < "u" && l instanceof Blob || l instanceof ArrayBuffer ? (u["Content-Type"] = "application/octet-stream", p = l) : typeof l == "string" ? (u["Content-Type"] = "text/plain", p = l) : typeof FormData < "u" && l instanceof FormData ? p = l : (u["Content-Type"] = "application/json", p = JSON.stringify(l)) : p = l;
        const g = yield this.fetch(f.toString(), {
          method: o || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, u), this.headers), i),
          body: p,
          signal: c
        }).catch((y) => {
          throw y.name === "AbortError" ? y : new FunctionsFetchError(y);
        }), h = g.headers.get("x-relay-error");
        if (h && h === "true")
          throw new FunctionsRelayError(g);
        if (!g.ok)
          throw new FunctionsHttpError(g);
        let _ = ((n = g.headers.get("Content-Type")) !== null && n !== void 0 ? n : "text/plain").split(";")[0].trim(), m;
        return _ === "application/json" ? m = yield g.json() : _ === "application/octet-stream" || _ === "application/pdf" ? m = yield g.blob() : _ === "text/event-stream" ? m = g : _ === "multipart/form-data" ? m = yield g.formData() : m = yield g.text(), { data: m, error: null, response: g };
      } catch (i) {
        return i instanceof Error && i.name === "AbortError" ? { data: null, error: new FunctionsFetchError(i) } : {
          data: null,
          error: i,
          response: i instanceof FunctionsHttpError || i instanceof FunctionsRelayError ? i.context : void 0
        };
      }
    });
  }
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
    var n = Object.getOwnPropertyDescriptor(r, s);
    Object.defineProperty(t, s, n.get ? n : {
      enumerable: !0,
      get: function() {
        return r[s];
      }
    });
  }), t;
}
var cjs = {};
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(tslib_es6$1);
var PostgrestClient$1 = {}, PostgrestQueryBuilder$1 = {}, PostgrestFilterBuilder$1 = {}, PostgrestTransformBuilder$1 = {}, PostgrestBuilder$1 = {}, getGlobal = function() {
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}, globalObject = getGlobal();
const fetch$1 = globalObject.fetch, nodeFetch = globalObject.fetch.bind(globalObject), Headers$1 = globalObject.Headers, Request = globalObject.Request, Response$1 = globalObject.Response, browser$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Headers: Headers$1,
  Request,
  Response: Response$1,
  default: nodeFetch,
  fetch: fetch$1
}, Symbol.toStringTag, { value: "Module" })), require$$1 = /* @__PURE__ */ getAugmentedNamespace(browser$1);
var PostgrestError$1 = {}, hasRequiredPostgrestError;
function requirePostgrestError() {
  if (hasRequiredPostgrestError) return PostgrestError$1;
  hasRequiredPostgrestError = 1, Object.defineProperty(PostgrestError$1, "__esModule", { value: !0 });
  class r extends Error {
    constructor(t) {
      super(t.message), this.name = "PostgrestError", this.details = t.details, this.hint = t.hint, this.code = t.code;
    }
  }
  return PostgrestError$1.default = r, PostgrestError$1;
}
var hasRequiredPostgrestBuilder;
function requirePostgrestBuilder() {
  if (hasRequiredPostgrestBuilder) return PostgrestBuilder$1;
  hasRequiredPostgrestBuilder = 1, Object.defineProperty(PostgrestBuilder$1, "__esModule", { value: !0 });
  const r = require$$0, e = r.__importDefault(require$$1), t = r.__importDefault(requirePostgrestError());
  class s {
    constructor(i) {
      var o, l;
      this.shouldThrowOnError = !1, this.method = i.method, this.url = i.url, this.headers = new Headers(i.headers), this.schema = i.schema, this.body = i.body, this.shouldThrowOnError = (o = i.shouldThrowOnError) !== null && o !== void 0 ? o : !1, this.signal = i.signal, this.isMaybeSingle = (l = i.isMaybeSingle) !== null && l !== void 0 ? l : !1, i.fetch ? this.fetch = i.fetch : typeof fetch > "u" ? this.fetch = e.default : this.fetch = fetch;
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
    setHeader(i, o) {
      return this.headers = new Headers(this.headers), this.headers.set(i, o), this;
    }
    then(i, o) {
      this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json");
      const l = this.fetch;
      let c = l(this.url.toString(), {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body),
        signal: this.signal
      }).then(async (u) => {
        var d, f, p, g;
        let h = null, _ = null, m = null, y = u.status, w = u.statusText;
        if (u.ok) {
          if (this.method !== "HEAD") {
            const E = await u.text();
            E === "" || (this.headers.get("Accept") === "text/csv" || this.headers.get("Accept") && (!((d = this.headers.get("Accept")) === null || d === void 0) && d.includes("application/vnd.pgrst.plan+text")) ? _ = E : _ = JSON.parse(E));
          }
          const b = (f = this.headers.get("Prefer")) === null || f === void 0 ? void 0 : f.match(/count=(exact|planned|estimated)/), S = (p = u.headers.get("content-range")) === null || p === void 0 ? void 0 : p.split("/");
          b && S && S.length > 1 && (m = parseInt(S[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(_) && (_.length > 1 ? (h = {
            // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
            code: "PGRST116",
            details: `Results contain ${_.length} rows, application/vnd.pgrst.object+json requires 1 row`,
            hint: null,
            message: "JSON object requested, multiple (or no) rows returned"
          }, _ = null, m = null, y = 406, w = "Not Acceptable") : _.length === 1 ? _ = _[0] : _ = null);
        } else {
          const b = await u.text();
          try {
            h = JSON.parse(b), Array.isArray(h) && u.status === 404 && (_ = [], h = null, y = 200, w = "OK");
          } catch {
            u.status === 404 && b === "" ? (y = 204, w = "No Content") : h = {
              message: b
            };
          }
          if (h && this.isMaybeSingle && (!((g = h == null ? void 0 : h.details) === null || g === void 0) && g.includes("0 rows")) && (h = null, y = 200, w = "OK"), h && this.shouldThrowOnError)
            throw new t.default(h);
        }
        return {
          error: h,
          data: _,
          count: m,
          status: y,
          statusText: w
        };
      });
      return this.shouldThrowOnError || (c = c.catch((u) => {
        var d, f, p;
        return {
          error: {
            message: `${(d = u == null ? void 0 : u.name) !== null && d !== void 0 ? d : "FetchError"}: ${u == null ? void 0 : u.message}`,
            details: `${(f = u == null ? void 0 : u.stack) !== null && f !== void 0 ? f : ""}`,
            hint: "",
            code: `${(p = u == null ? void 0 : u.code) !== null && p !== void 0 ? p : ""}`
          },
          data: null,
          count: null,
          status: 0,
          statusText: ""
        };
      })), c.then(i, o);
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
  }
  return PostgrestBuilder$1.default = s, PostgrestBuilder$1;
}
var hasRequiredPostgrestTransformBuilder;
function requirePostgrestTransformBuilder() {
  if (hasRequiredPostgrestTransformBuilder) return PostgrestTransformBuilder$1;
  hasRequiredPostgrestTransformBuilder = 1, Object.defineProperty(PostgrestTransformBuilder$1, "__esModule", { value: !0 });
  const e = require$$0.__importDefault(requirePostgrestBuilder());
  class t extends e.default {
    /**
     * Perform a SELECT on the query result.
     *
     * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
     * return modified rows. By calling this method, modified rows are returned in
     * `data`.
     *
     * @param columns - The columns to retrieve, separated by commas
     */
    select(n) {
      let i = !1;
      const o = (n ?? "*").split("").map((l) => /\s/.test(l) && !i ? "" : (l === '"' && (i = !i), l)).join("");
      return this.url.searchParams.set("select", o), this.headers.append("Prefer", "return=representation"), this;
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
    order(n, { ascending: i = !0, nullsFirst: o, foreignTable: l, referencedTable: c = l } = {}) {
      const u = c ? `${c}.order` : "order", d = this.url.searchParams.get(u);
      return this.url.searchParams.set(u, `${d ? `${d},` : ""}${n}.${i ? "asc" : "desc"}${o === void 0 ? "" : o ? ".nullsfirst" : ".nullslast"}`), this;
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
    limit(n, { foreignTable: i, referencedTable: o = i } = {}) {
      const l = typeof o > "u" ? "limit" : `${o}.limit`;
      return this.url.searchParams.set(l, `${n}`), this;
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
    range(n, i, { foreignTable: o, referencedTable: l = o } = {}) {
      const c = typeof l > "u" ? "offset" : `${l}.offset`, u = typeof l > "u" ? "limit" : `${l}.limit`;
      return this.url.searchParams.set(c, `${n}`), this.url.searchParams.set(u, `${i - n + 1}`), this;
    }
    /**
     * Set the AbortSignal for the fetch request.
     *
     * @param signal - The AbortSignal to use for the fetch request
     */
    abortSignal(n) {
      return this.signal = n, this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be one row (e.g. using `.limit(1)`), otherwise this
     * returns an error.
     */
    single() {
      return this.headers.set("Accept", "application/vnd.pgrst.object+json"), this;
    }
    /**
     * Return `data` as a single object instead of an array of objects.
     *
     * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
     * this returns an error.
     */
    maybeSingle() {
      return this.method === "GET" ? this.headers.set("Accept", "application/json") : this.headers.set("Accept", "application/vnd.pgrst.object+json"), this.isMaybeSingle = !0, this;
    }
    /**
     * Return `data` as a string in CSV format.
     */
    csv() {
      return this.headers.set("Accept", "text/csv"), this;
    }
    /**
     * Return `data` as an object in [GeoJSON](https://geojson.org) format.
     */
    geojson() {
      return this.headers.set("Accept", "application/geo+json"), this;
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
    explain({ analyze: n = !1, verbose: i = !1, settings: o = !1, buffers: l = !1, wal: c = !1, format: u = "text" } = {}) {
      var d;
      const f = [
        n ? "analyze" : null,
        i ? "verbose" : null,
        o ? "settings" : null,
        l ? "buffers" : null,
        c ? "wal" : null
      ].filter(Boolean).join("|"), p = (d = this.headers.get("Accept")) !== null && d !== void 0 ? d : "application/json";
      return this.headers.set("Accept", `application/vnd.pgrst.plan+${u}; for="${p}"; options=${f};`), u === "json" ? this : this;
    }
    /**
     * Rollback the query.
     *
     * `data` will still be returned, but the query is not committed.
     */
    rollback() {
      return this.headers.append("Prefer", "tx=rollback"), this;
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
     * Set the maximum number of rows that can be affected by the query.
     * Only available in PostgREST v13+ and only works with PATCH and DELETE methods.
     *
     * @param value - The maximum number of rows that can be affected
     */
    maxAffected(n) {
      return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${n}`), this;
    }
  }
  return PostgrestTransformBuilder$1.default = t, PostgrestTransformBuilder$1;
}
var hasRequiredPostgrestFilterBuilder;
function requirePostgrestFilterBuilder() {
  if (hasRequiredPostgrestFilterBuilder) return PostgrestFilterBuilder$1;
  hasRequiredPostgrestFilterBuilder = 1, Object.defineProperty(PostgrestFilterBuilder$1, "__esModule", { value: !0 });
  const e = require$$0.__importDefault(requirePostgrestTransformBuilder());
  class t extends e.default {
    /**
     * Match only rows where `column` is equal to `value`.
     *
     * To check if the value of `column` is NULL, you should use `.is()` instead.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    eq(n, i) {
      return this.url.searchParams.append(n, `eq.${i}`), this;
    }
    /**
     * Match only rows where `column` is not equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    neq(n, i) {
      return this.url.searchParams.append(n, `neq.${i}`), this;
    }
    /**
     * Match only rows where `column` is greater than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gt(n, i) {
      return this.url.searchParams.append(n, `gt.${i}`), this;
    }
    /**
     * Match only rows where `column` is greater than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    gte(n, i) {
      return this.url.searchParams.append(n, `gte.${i}`), this;
    }
    /**
     * Match only rows where `column` is less than `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lt(n, i) {
      return this.url.searchParams.append(n, `lt.${i}`), this;
    }
    /**
     * Match only rows where `column` is less than or equal to `value`.
     *
     * @param column - The column to filter on
     * @param value - The value to filter with
     */
    lte(n, i) {
      return this.url.searchParams.append(n, `lte.${i}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-sensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    like(n, i) {
      return this.url.searchParams.append(n, `like.${i}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAllOf(n, i) {
      return this.url.searchParams.append(n, `like(all).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-sensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    likeAnyOf(n, i) {
      return this.url.searchParams.append(n, `like(any).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches `pattern` case-insensitively.
     *
     * @param column - The column to filter on
     * @param pattern - The pattern to match with
     */
    ilike(n, i) {
      return this.url.searchParams.append(n, `ilike.${i}`), this;
    }
    /**
     * Match only rows where `column` matches all of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAllOf(n, i) {
      return this.url.searchParams.append(n, `ilike(all).{${i.join(",")}}`), this;
    }
    /**
     * Match only rows where `column` matches any of `patterns` case-insensitively.
     *
     * @param column - The column to filter on
     * @param patterns - The patterns to match with
     */
    ilikeAnyOf(n, i) {
      return this.url.searchParams.append(n, `ilike(any).{${i.join(",")}}`), this;
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
    is(n, i) {
      return this.url.searchParams.append(n, `is.${i}`), this;
    }
    /**
     * Match only rows where `column` is included in the `values` array.
     *
     * @param column - The column to filter on
     * @param values - The values array to filter with
     */
    in(n, i) {
      const o = Array.from(new Set(i)).map((l) => typeof l == "string" && new RegExp("[,()]").test(l) ? `"${l}"` : `${l}`).join(",");
      return this.url.searchParams.append(n, `in.(${o})`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * `column` contains every element appearing in `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    contains(n, i) {
      return typeof i == "string" ? this.url.searchParams.append(n, `cs.${i}`) : Array.isArray(i) ? this.url.searchParams.append(n, `cs.{${i.join(",")}}`) : this.url.searchParams.append(n, `cs.${JSON.stringify(i)}`), this;
    }
    /**
     * Only relevant for jsonb, array, and range columns. Match only rows where
     * every element appearing in `column` is contained by `value`.
     *
     * @param column - The jsonb, array, or range column to filter on
     * @param value - The jsonb, array, or range value to filter with
     */
    containedBy(n, i) {
      return typeof i == "string" ? this.url.searchParams.append(n, `cd.${i}`) : Array.isArray(i) ? this.url.searchParams.append(n, `cd.{${i.join(",")}}`) : this.url.searchParams.append(n, `cd.${JSON.stringify(i)}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is greater than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGt(n, i) {
      return this.url.searchParams.append(n, `sr.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or greater than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeGte(n, i) {
      return this.url.searchParams.append(n, `nxl.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is less than any element in `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLt(n, i) {
      return this.url.searchParams.append(n, `sl.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where every element in
     * `column` is either contained in `range` or less than any element in
     * `range`.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeLte(n, i) {
      return this.url.searchParams.append(n, `nxr.${i}`), this;
    }
    /**
     * Only relevant for range columns. Match only rows where `column` is
     * mutually exclusive to `range` and there can be no element between the two
     * ranges.
     *
     * @param column - The range column to filter on
     * @param range - The range to filter with
     */
    rangeAdjacent(n, i) {
      return this.url.searchParams.append(n, `adj.${i}`), this;
    }
    /**
     * Only relevant for array and range columns. Match only rows where
     * `column` and `value` have an element in common.
     *
     * @param column - The array or range column to filter on
     * @param value - The array or range value to filter with
     */
    overlaps(n, i) {
      return typeof i == "string" ? this.url.searchParams.append(n, `ov.${i}`) : this.url.searchParams.append(n, `ov.{${i.join(",")}}`), this;
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
    textSearch(n, i, { config: o, type: l } = {}) {
      let c = "";
      l === "plain" ? c = "pl" : l === "phrase" ? c = "ph" : l === "websearch" && (c = "w");
      const u = o === void 0 ? "" : `(${o})`;
      return this.url.searchParams.append(n, `${c}fts${u}.${i}`), this;
    }
    /**
     * Match only rows where each column in `query` keys is equal to its
     * associated value. Shorthand for multiple `.eq()`s.
     *
     * @param query - The object to filter with, with column names as keys mapped
     * to their filter values
     */
    match(n) {
      return Object.entries(n).forEach(([i, o]) => {
        this.url.searchParams.append(i, `eq.${o}`);
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
    not(n, i, o) {
      return this.url.searchParams.append(n, `not.${i}.${o}`), this;
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
    or(n, { foreignTable: i, referencedTable: o = i } = {}) {
      const l = o ? `${o}.or` : "or";
      return this.url.searchParams.append(l, `(${n})`), this;
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
    filter(n, i, o) {
      return this.url.searchParams.append(n, `${i}.${o}`), this;
    }
  }
  return PostgrestFilterBuilder$1.default = t, PostgrestFilterBuilder$1;
}
var hasRequiredPostgrestQueryBuilder;
function requirePostgrestQueryBuilder() {
  if (hasRequiredPostgrestQueryBuilder) return PostgrestQueryBuilder$1;
  hasRequiredPostgrestQueryBuilder = 1, Object.defineProperty(PostgrestQueryBuilder$1, "__esModule", { value: !0 });
  const e = require$$0.__importDefault(requirePostgrestFilterBuilder());
  class t {
    constructor(n, { headers: i = {}, schema: o, fetch: l }) {
      this.url = n, this.headers = new Headers(i), this.schema = o, this.fetch = l;
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
    select(n, i) {
      const { head: o = !1, count: l } = i ?? {}, c = o ? "HEAD" : "GET";
      let u = !1;
      const d = (n ?? "*").split("").map((f) => /\s/.test(f) && !u ? "" : (f === '"' && (u = !u), f)).join("");
      return this.url.searchParams.set("select", d), l && this.headers.append("Prefer", `count=${l}`), new e.default({
        method: c,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        fetch: this.fetch
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
    insert(n, { count: i, defaultToNull: o = !0 } = {}) {
      var l;
      const c = "POST";
      if (i && this.headers.append("Prefer", `count=${i}`), o || this.headers.append("Prefer", "missing=default"), Array.isArray(n)) {
        const u = n.reduce((d, f) => d.concat(Object.keys(f)), []);
        if (u.length > 0) {
          const d = [...new Set(u)].map((f) => `"${f}"`);
          this.url.searchParams.set("columns", d.join(","));
        }
      }
      return new e.default({
        method: c,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: n,
        fetch: (l = this.fetch) !== null && l !== void 0 ? l : fetch
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
    upsert(n, { onConflict: i, ignoreDuplicates: o = !1, count: l, defaultToNull: c = !0 } = {}) {
      var u;
      const d = "POST";
      if (this.headers.append("Prefer", `resolution=${o ? "ignore" : "merge"}-duplicates`), i !== void 0 && this.url.searchParams.set("on_conflict", i), l && this.headers.append("Prefer", `count=${l}`), c || this.headers.append("Prefer", "missing=default"), Array.isArray(n)) {
        const f = n.reduce((p, g) => p.concat(Object.keys(g)), []);
        if (f.length > 0) {
          const p = [...new Set(f)].map((g) => `"${g}"`);
          this.url.searchParams.set("columns", p.join(","));
        }
      }
      return new e.default({
        method: d,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: n,
        fetch: (u = this.fetch) !== null && u !== void 0 ? u : fetch
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
    update(n, { count: i } = {}) {
      var o;
      const l = "PATCH";
      return i && this.headers.append("Prefer", `count=${i}`), new e.default({
        method: l,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        body: n,
        fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch
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
    delete({ count: n } = {}) {
      var i;
      const o = "DELETE";
      return n && this.headers.append("Prefer", `count=${n}`), new e.default({
        method: o,
        url: this.url,
        headers: this.headers,
        schema: this.schema,
        fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch
      });
    }
  }
  return PostgrestQueryBuilder$1.default = t, PostgrestQueryBuilder$1;
}
var hasRequiredPostgrestClient;
function requirePostgrestClient() {
  if (hasRequiredPostgrestClient) return PostgrestClient$1;
  hasRequiredPostgrestClient = 1, Object.defineProperty(PostgrestClient$1, "__esModule", { value: !0 });
  const r = require$$0, e = r.__importDefault(requirePostgrestQueryBuilder()), t = r.__importDefault(requirePostgrestFilterBuilder());
  class s {
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
    constructor(i, { headers: o = {}, schema: l, fetch: c } = {}) {
      this.url = i, this.headers = new Headers(o), this.schemaName = l, this.fetch = c;
    }
    /**
     * Perform a query on a table or a view.
     *
     * @param relation - The table or view name to query
     */
    from(i) {
      const o = new URL(`${this.url}/${i}`);
      return new e.default(o, {
        headers: new Headers(this.headers),
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
    schema(i) {
      return new s(this.url, {
        headers: this.headers,
        schema: i,
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
    rpc(i, o = {}, { head: l = !1, get: c = !1, count: u } = {}) {
      var d;
      let f;
      const p = new URL(`${this.url}/rpc/${i}`);
      let g;
      l || c ? (f = l ? "HEAD" : "GET", Object.entries(o).filter(([_, m]) => m !== void 0).map(([_, m]) => [_, Array.isArray(m) ? `{${m.join(",")}}` : `${m}`]).forEach(([_, m]) => {
        p.searchParams.append(_, m);
      })) : (f = "POST", g = o);
      const h = new Headers(this.headers);
      return u && h.set("Prefer", `count=${u}`), new t.default({
        method: f,
        url: p,
        headers: h,
        schema: this.schemaName,
        body: g,
        fetch: (d = this.fetch) !== null && d !== void 0 ? d : fetch
      });
    }
  }
  return PostgrestClient$1.default = s, PostgrestClient$1;
}
Object.defineProperty(cjs, "__esModule", { value: !0 });
cjs.PostgrestError = cjs.PostgrestBuilder = cjs.PostgrestTransformBuilder = cjs.PostgrestFilterBuilder = cjs.PostgrestQueryBuilder = cjs.PostgrestClient = void 0;
const tslib_1 = require$$0, PostgrestClient_1 = tslib_1.__importDefault(requirePostgrestClient());
cjs.PostgrestClient = PostgrestClient_1.default;
const PostgrestQueryBuilder_1 = tslib_1.__importDefault(requirePostgrestQueryBuilder());
cjs.PostgrestQueryBuilder = PostgrestQueryBuilder_1.default;
const PostgrestFilterBuilder_1 = tslib_1.__importDefault(requirePostgrestFilterBuilder());
cjs.PostgrestFilterBuilder = PostgrestFilterBuilder_1.default;
const PostgrestTransformBuilder_1 = tslib_1.__importDefault(requirePostgrestTransformBuilder());
cjs.PostgrestTransformBuilder = PostgrestTransformBuilder_1.default;
const PostgrestBuilder_1 = tslib_1.__importDefault(requirePostgrestBuilder());
cjs.PostgrestBuilder = PostgrestBuilder_1.default;
const PostgrestError_1 = tslib_1.__importDefault(requirePostgrestError());
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
} = _default;
class WebSocketFactory {
  static detectEnvironment() {
    var e;
    if (typeof WebSocket < "u")
      return { type: "native", constructor: WebSocket };
    if (typeof globalThis < "u" && typeof globalThis.WebSocket < "u")
      return { type: "native", constructor: globalThis.WebSocket };
    if (typeof global < "u" && typeof global.WebSocket < "u")
      return { type: "native", constructor: global.WebSocket };
    if (typeof globalThis < "u" && typeof globalThis.WebSocketPair < "u" && typeof globalThis.WebSocket > "u")
      return {
        type: "cloudflare",
        error: "Cloudflare Workers detected. WebSocket clients are not supported in Cloudflare Workers.",
        workaround: "Use Cloudflare Workers WebSocket API for server-side WebSocket handling, or deploy to a different runtime."
      };
    if (typeof globalThis < "u" && globalThis.EdgeRuntime || typeof navigator < "u" && (!((e = navigator.userAgent) === null || e === void 0) && e.includes("Vercel-Edge")))
      return {
        type: "unsupported",
        error: "Edge runtime detected (Vercel Edge/Netlify Edge). WebSockets are not supported in edge functions.",
        workaround: "Use serverless functions or a different deployment target for WebSocket functionality."
      };
    if (typeof process < "u") {
      const t = process.versions;
      if (t && t.node) {
        const s = t.node, n = parseInt(s.replace(/^v/, "").split(".")[0]);
        return n >= 22 ? typeof globalThis.WebSocket < "u" ? { type: "native", constructor: globalThis.WebSocket } : {
          type: "unsupported",
          error: `Node.js ${n} detected but native WebSocket not found.`,
          workaround: "Provide a WebSocket implementation via the transport option."
        } : {
          type: "unsupported",
          error: `Node.js ${n} detected without native WebSocket support.`,
          workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`
        };
      }
    }
    return {
      type: "unsupported",
      error: "Unknown JavaScript runtime without WebSocket support.",
      workaround: "Ensure you're running in a supported environment (browser, Node.js, Deno) or provide a custom WebSocket implementation."
    };
  }
  static getWebSocketConstructor() {
    const e = this.detectEnvironment();
    if (e.constructor)
      return e.constructor;
    let t = e.error || "WebSocket not supported in this environment.";
    throw e.workaround && (t += `

Suggested solution: ${e.workaround}`), new Error(t);
  }
  static createWebSocket(e, t) {
    const s = this.getWebSocketConstructor();
    return new s(e, t);
  }
  static isWebSocketSupported() {
    try {
      const e = this.detectEnvironment();
      return e.type === "native" || e.type === "ws";
    } catch {
      return !1;
    }
  }
}
const version$3 = "2.76.1", DEFAULT_VERSION = `realtime-js/${version$3}`, VSN = "1.0.0", DEFAULT_TIMEOUT = 1e4, WS_CLOSE_NORMAL = 1e3, MAX_PUSH_BUFFER_SIZE = 100;
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
    const n = t.getUint8(1), i = t.getUint8(2);
    let o = this.HEADER_LENGTH + 2;
    const l = s.decode(e.slice(o, o + n));
    o = o + n;
    const c = s.decode(e.slice(o, o + i));
    o = o + i;
    const u = JSON.parse(s.decode(e.slice(o, e.byteLength)));
    return { ref: null, topic: l, event: c, payload: u };
  }
}
class Timer {
  constructor(e, t) {
    this.callback = e, this.timerCalc = t, this.timer = void 0, this.tries = 0, this.callback = e, this.timerCalc = t;
  }
  reset() {
    this.tries = 0, clearTimeout(this.timer), this.timer = void 0;
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
  const n = (s = t.skipTypes) !== null && s !== void 0 ? s : [];
  return e ? Object.keys(e).reduce((i, o) => (i[o] = convertColumn(o, r, e, n), i), {}) : {};
}, convertColumn = (r, e, t, s) => {
  const n = e.find((l) => l.name === r), i = n == null ? void 0 : n.type, o = t[r];
  return i && !s.includes(i) ? convertCell(i, o) : noop$1(o);
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
    let i;
    const o = r.slice(1, t);
    try {
      i = JSON.parse("[" + o + "]");
    } catch {
      i = o ? o.split(",") : [];
    }
    return i.map((l) => convertCell(e, l));
  }
  return r;
}, toTimestampString = (r) => typeof r == "string" ? r.replace(" ", "T") : r, httpEndpointURL = (r) => {
  const e = new URL(r);
  return e.protocol = e.protocol.replace(/^ws/i, "http"), e.pathname = e.pathname.replace(/\/+$/, "").replace(/\/socket\/websocket$/i, "").replace(/\/socket$/i, "").replace(/\/websocket$/i, ""), e.pathname === "" || e.pathname === "/" ? e.pathname = "/api/broadcast" : e.pathname = e.pathname + "/api/broadcast", e.href;
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
  constructor(e, t, s = {}, n = DEFAULT_TIMEOUT) {
    this.channel = e, this.event = t, this.payload = s, this.timeout = n, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
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
    this.channel = e, this.state = {}, this.pendingDiffs = [], this.joinRef = null, this.enabled = !1, this.caller = {
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
    this.channel._on(s.state, {}, (n) => {
      const { onJoin: i, onLeave: o, onSync: l } = this.caller;
      this.joinRef = this.channel._joinRef(), this.state = RealtimePresence.syncState(this.state, n, i, o), this.pendingDiffs.forEach((c) => {
        this.state = RealtimePresence.syncDiff(this.state, c, i, o);
      }), this.pendingDiffs = [], l();
    }), this.channel._on(s.diff, {}, (n) => {
      const { onJoin: i, onLeave: o, onSync: l } = this.caller;
      this.inPendingSyncState() ? this.pendingDiffs.push(n) : (this.state = RealtimePresence.syncDiff(this.state, n, i, o), l());
    }), this.onJoin((n, i, o) => {
      this.channel._trigger("presence", {
        event: "join",
        key: n,
        currentPresences: i,
        newPresences: o
      });
    }), this.onLeave((n, i, o) => {
      this.channel._trigger("presence", {
        event: "leave",
        key: n,
        currentPresences: i,
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
  static syncState(e, t, s, n) {
    const i = this.cloneDeep(e), o = this.transformState(t), l = {}, c = {};
    return this.map(i, (u, d) => {
      o[u] || (c[u] = d);
    }), this.map(o, (u, d) => {
      const f = i[u];
      if (f) {
        const p = d.map((m) => m.presence_ref), g = f.map((m) => m.presence_ref), h = d.filter((m) => g.indexOf(m.presence_ref) < 0), _ = f.filter((m) => p.indexOf(m.presence_ref) < 0);
        h.length > 0 && (l[u] = h), _.length > 0 && (c[u] = _);
      } else
        l[u] = d;
    }), this.syncDiff(i, { joins: l, leaves: c }, s, n);
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
  static syncDiff(e, t, s, n) {
    const { joins: i, leaves: o } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves)
    };
    return s || (s = () => {
    }), n || (n = () => {
    }), this.map(i, (l, c) => {
      var u;
      const d = (u = e[l]) !== null && u !== void 0 ? u : [];
      if (e[l] = this.cloneDeep(c), d.length > 0) {
        const f = e[l].map((g) => g.presence_ref), p = d.filter((g) => f.indexOf(g.presence_ref) < 0);
        e[l].unshift(...p);
      }
      s(l, d, c);
    }), this.map(o, (l, c) => {
      let u = e[l];
      if (!u)
        return;
      const d = c.map((f) => f.presence_ref);
      u = u.filter((f) => d.indexOf(f.presence_ref) < 0), e[l] = u, n(l, u, c), u.length === 0 && delete e[l];
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
      const n = e[s];
      return "metas" in n ? t[s] = n.metas.map((i) => (i.presence_ref = i.phx_ref, delete i.phx_ref, delete i.phx_ref_prev, i)) : t[s] = n, t;
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
    var n, i;
    if (this.topic = e, this.params = t, this.socket = s, this.bindings = {}, this.state = CHANNEL_STATES.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
      broadcast: { ack: !1, self: !1 },
      presence: { key: "", enabled: !1 },
      private: !1
    }, t.config), this.timeout = this.socket.timeout, this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout), this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((o) => o.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = CHANNEL_STATES.closed, this.socket._remove(this);
    }), this._onError((o) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, o), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("error", (o) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, o), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(CHANNEL_EVENTS.reply, {}, (o, l) => {
      this._trigger(this._replyEventName(l), o);
    }), this.presence = new RealtimePresence(this), this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint), this.private = this.params.config.private || !1, !this.private && (!((i = (n = this.params.config) === null || n === void 0 ? void 0 : n.broadcast) === null || i === void 0) && i.replay))
      throw `tried to use replay on public channel '${this.topic}'. It must be a private channel.`;
  }
  /** Subscribe registers your client with the server */
  subscribe(e, t = this.timeout) {
    var s, n, i;
    if (this.socket.isConnected() || this.socket.connect(), this.state == CHANNEL_STATES.closed) {
      const { config: { broadcast: o, presence: l, private: c } } = this.params, u = (n = (s = this.bindings.postgres_changes) === null || s === void 0 ? void 0 : s.map((g) => g.filter)) !== null && n !== void 0 ? n : [], d = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0 || ((i = this.params.config.presence) === null || i === void 0 ? void 0 : i.enabled) === !0, f = {}, p = {
        broadcast: o,
        presence: Object.assign(Object.assign({}, l), { enabled: d }),
        postgres_changes: u,
        private: c
      };
      this.socket.accessTokenValue && (f.access_token = this.socket.accessTokenValue), this._onError((g) => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, g)), this._onClose(() => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CLOSED)), this.updateJoinPayload(Object.assign({ config: p }, f)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", async ({ postgres_changes: g }) => {
        var h;
        if (this.socket.setAuth(), g === void 0) {
          e == null || e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        } else {
          const _ = this.bindings.postgres_changes, m = (h = _ == null ? void 0 : _.length) !== null && h !== void 0 ? h : 0, y = [];
          for (let w = 0; w < m; w++) {
            const v = _[w], { filter: { event: b, schema: S, table: E, filter: A } } = v, I = g && g[w];
            if (I && I.event === b && I.schema === S && I.table === E && I.filter === A)
              y.push(Object.assign(Object.assign({}, v), { id: I.id }));
            else {
              this.unsubscribe(), this.state = CHANNEL_STATES.errored, e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = y, e && e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        }
      }).receive("error", (g) => {
        this.state = CHANNEL_STATES.errored, e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(g).join(", ") || "error")));
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
    return this.state === CHANNEL_STATES.joined && e === REALTIME_LISTEN_TYPES.PRESENCE && (this.socket.log("channel", `resubscribe to ${this.topic} due to change in presence callbacks on joined channel`), this.unsubscribe().then(() => this.subscribe())), this._on(e, t, s);
  }
  /**
   * Sends a broadcast message explicitly via REST API.
   *
   * This method always uses the REST API endpoint regardless of WebSocket connection state.
   * Useful when you want to guarantee REST delivery or when gradually migrating from implicit REST fallback.
   *
   * @param event The name of the broadcast event
   * @param payload Payload to be sent (required)
   * @param opts Options including timeout
   * @returns Promise resolving to object with success status, and error details if failed
   */
  async httpSend(e, t, s = {}) {
    var n;
    const i = this.socket.accessTokenValue ? `Bearer ${this.socket.accessTokenValue}` : "";
    if (t == null)
      return Promise.reject("Payload is required for httpSend()");
    const o = {
      method: "POST",
      headers: {
        Authorization: i,
        apikey: this.socket.apiKey ? this.socket.apiKey : "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            topic: this.subTopic,
            event: e,
            payload: t,
            private: this.private
          }
        ]
      })
    }, l = await this._fetchWithTimeout(this.broadcastEndpointURL, o, (n = s.timeout) !== null && n !== void 0 ? n : this.timeout);
    if (l.status === 202)
      return { success: !0 };
    let c = l.statusText;
    try {
      const u = await l.json();
      c = u.error || u.message || c;
    } catch {
    }
    return Promise.reject(new Error(c));
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
    var s, n;
    if (!this._canPush() && e.type === "broadcast") {
      console.warn("Realtime send() is automatically falling back to REST API. This behavior will be deprecated in the future. Please use httpSend() explicitly for REST delivery.");
      const { event: i, payload: o } = e, c = {
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
              event: i,
              payload: o,
              private: this.private
            }
          ]
        })
      };
      try {
        const u = await this._fetchWithTimeout(this.broadcastEndpointURL, c, (s = t.timeout) !== null && s !== void 0 ? s : this.timeout);
        return await ((n = u.body) === null || n === void 0 ? void 0 : n.cancel()), u.ok ? "ok" : "error";
      } catch (u) {
        return u.name === "AbortError" ? "timed out" : "error";
      }
    } else
      return new Promise((i) => {
        var o, l, c;
        const u = this._push(e.type, e, t.timeout || this.timeout);
        e.type === "broadcast" && !(!((c = (l = (o = this.params) === null || o === void 0 ? void 0 : o.config) === null || l === void 0 ? void 0 : l.broadcast) === null || c === void 0) && c.ack) && i("ok"), u.receive("ok", () => i("ok")), u.receive("error", () => i("error")), u.receive("timeout", () => i("timed out"));
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
    this.joinPush.destroy();
    let s = null;
    return new Promise((n) => {
      s = new Push(this, CHANNEL_EVENTS.leave, {}, e), s.receive("ok", () => {
        t(), n("ok");
      }).receive("timeout", () => {
        t(), n("timed out");
      }).receive("error", () => {
        n("error");
      }), s.send(), this._canPush() || s.trigger("ok", {});
    }).finally(() => {
      s == null || s.destroy();
    });
  }
  /**
   * Teardown the channel.
   *
   * Destroys and stops related timers.
   */
  teardown() {
    this.pushBuffer.forEach((e) => e.destroy()), this.pushBuffer = [], this.rejoinTimer.reset(), this.joinPush.destroy(), this.state = CHANNEL_STATES.closed, this.bindings = {};
  }
  /** @internal */
  async _fetchWithTimeout(e, t, s) {
    const n = new AbortController(), i = setTimeout(() => n.abort(), s), o = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: n.signal }));
    return clearTimeout(i), o;
  }
  /** @internal */
  _push(e, t, s = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let n = new Push(this, e, t, s);
    return this._canPush() ? n.send() : this._addToPushBuffer(n), n;
  }
  /** @internal */
  _addToPushBuffer(e) {
    if (e.startTimeout(), this.pushBuffer.push(e), this.pushBuffer.length > MAX_PUSH_BUFFER_SIZE) {
      const t = this.pushBuffer.shift();
      t && (t.destroy(), this.socket.log("channel", `discarded push due to buffer overflow: ${t.event}`, t.payload));
    }
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
    var n, i;
    const o = e.toLocaleLowerCase(), { close: l, error: c, leave: u, join: d } = CHANNEL_EVENTS;
    if (s && [l, c, u, d].indexOf(o) >= 0 && s !== this._joinRef())
      return;
    let p = this._onMessage(o, t, s);
    if (t && !p)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o) ? (n = this.bindings.postgres_changes) === null || n === void 0 || n.filter((g) => {
      var h, _, m;
      return ((h = g.filter) === null || h === void 0 ? void 0 : h.event) === "*" || ((m = (_ = g.filter) === null || _ === void 0 ? void 0 : _.event) === null || m === void 0 ? void 0 : m.toLocaleLowerCase()) === o;
    }).map((g) => g.callback(p, s)) : (i = this.bindings[o]) === null || i === void 0 || i.filter((g) => {
      var h, _, m, y, w, v;
      if (["broadcast", "presence", "postgres_changes"].includes(o))
        if ("id" in g) {
          const b = g.id, S = (h = g.filter) === null || h === void 0 ? void 0 : h.event;
          return b && ((_ = t.ids) === null || _ === void 0 ? void 0 : _.includes(b)) && (S === "*" || (S == null ? void 0 : S.toLocaleLowerCase()) === ((m = t.data) === null || m === void 0 ? void 0 : m.type.toLocaleLowerCase()));
        } else {
          const b = (w = (y = g == null ? void 0 : g.filter) === null || y === void 0 ? void 0 : y.event) === null || w === void 0 ? void 0 : w.toLocaleLowerCase();
          return b === "*" || b === ((v = t == null ? void 0 : t.event) === null || v === void 0 ? void 0 : v.toLocaleLowerCase());
        }
      else
        return g.type.toLocaleLowerCase() === o;
    }).map((g) => {
      if (typeof p == "object" && "ids" in p) {
        const h = p.data, { schema: _, table: m, commit_timestamp: y, type: w, errors: v } = h;
        p = Object.assign(Object.assign({}, {
          schema: _,
          table: m,
          commit_timestamp: y,
          eventType: w,
          new: {},
          old: {},
          errors: v
        }), this._getPayloadRecords(h));
      }
      g.callback(p, s);
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
    const n = e.toLocaleLowerCase(), i = {
      type: n,
      filter: t,
      callback: s
    };
    return this.bindings[n] ? this.bindings[n].push(i) : this.bindings[n] = [i], this;
  }
  /** @internal */
  _off(e, t) {
    const s = e.toLocaleLowerCase();
    return this.bindings[s] && (this.bindings[s] = this.bindings[s].filter((n) => {
      var i;
      return !(((i = n.type) === null || i === void 0 ? void 0 : i.toLocaleLowerCase()) === s && RealtimeChannel.isEqual(n.filter, t));
    })), this;
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
}, CONNECTION_TIMEOUTS = {
  HEARTBEAT_INTERVAL: 25e3,
  RECONNECT_DELAY: 10,
  HEARTBEAT_TIMEOUT_FALLBACK: 100
}, RECONNECT_INTERVALS = [1e3, 2e3, 5e3, 1e4], DEFAULT_RECONNECT_FALLBACK = 1e4, WORKER_SCRIPT = `
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
   * @param options.transport The Websocket Transport, for example WebSocket. This can be a custom implementation
   * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
   * @param options.params The optional params to pass when connecting.
   * @param options.headers Deprecated: headers cannot be set on websocket connections and this option will be removed in the future.
   * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
   * @param options.heartbeatCallback The optional function to handle heartbeat status.
   * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
   * @param options.logLevel Sets the log level for Realtime
   * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
   * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
   * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
   * @param options.worker Use Web Worker to set a side flow. Defaults to false.
   * @param options.workerUrl The URL of the worker script. Defaults to https://realtime.supabase.com/worker.js that includes a heartbeat event call to keep the connection alive.
   */
  constructor(e, t) {
    var s;
    if (this.accessTokenValue = null, this.apiKey = null, this.channels = new Array(), this.endPoint = "", this.httpEndpoint = "", this.headers = {}, this.params = {}, this.timeout = DEFAULT_TIMEOUT, this.transport = null, this.heartbeatIntervalMs = CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.heartbeatCallback = noop, this.ref = 0, this.reconnectTimer = null, this.logger = noop, this.conn = null, this.sendBuffer = [], this.serializer = new Serializer(), this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = !1, this._authPromise = null, this._resolveFetch = (n) => {
      let i;
      return n ? i = n : typeof fetch > "u" ? i = (...o) => Promise.resolve().then(() => browser$1).then(({ default: l }) => l(...o)).catch((l) => {
        throw new Error(`Failed to load @supabase/node-fetch: ${l.message}. This is required for HTTP requests in Node.js environments without native fetch.`);
      }) : i = fetch, (...o) => i(...o);
    }, !(!((s = t == null ? void 0 : t.params) === null || s === void 0) && s.apikey))
      throw new Error("API key is required to connect to Realtime");
    this.apiKey = t.params.apikey, this.endPoint = `${e}/${TRANSPORTS.websocket}`, this.httpEndpoint = httpEndpointURL(e), this._initializeOptions(t), this._setupReconnectionTimer(), this.fetch = this._resolveFetch(t == null ? void 0 : t.fetch);
  }
  /**
   * Connects the socket, unless already connected.
   */
  connect() {
    if (!(this.isConnecting() || this.isDisconnecting() || this.conn !== null && this.isConnected())) {
      if (this._setConnectionState("connecting"), this._setAuthSafely("connect"), this.transport)
        this.conn = new this.transport(this.endpointURL());
      else
        try {
          this.conn = WebSocketFactory.createWebSocket(this.endpointURL());
        } catch (e) {
          this._setConnectionState("disconnected");
          const t = e.message;
          throw t.includes("Node.js") ? new Error(`${t}

To use Realtime in Node.js, you need to provide a WebSocket implementation:

Option 1: Use Node.js 22+ which has native WebSocket support
Option 2: Install and provide the "ws" package:

  npm install ws

  import ws from "ws"
  const client = new RealtimeClient(url, {
    ...options,
    transport: ws
  })`) : new Error(`WebSocket not available: ${t}`);
        }
      this._setupConnectionHandlers();
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
    if (!this.isDisconnecting())
      if (this._setConnectionState("disconnecting", !0), this.conn) {
        const s = setTimeout(() => {
          this._setConnectionState("disconnected");
        }, 100);
        this.conn.onclose = () => {
          clearTimeout(s), this._setConnectionState("disconnected");
        }, e ? this.conn.close(e, t ?? "") : this.conn.close(), this._teardownConnection();
      } else
        this._setConnectionState("disconnected");
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
    return this.channels = [], this.disconnect(), e;
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
  /**
   * Returns `true` if the connection is currently connecting.
   */
  isConnecting() {
    return this._connectionState === "connecting";
  }
  /**
   * Returns `true` if the connection is currently disconnecting.
   */
  isDisconnecting() {
    return this._connectionState === "disconnecting";
  }
  channel(e, t = { config: {} }) {
    const s = `realtime:${e}`, n = this.getChannels().find((i) => i.topic === s);
    if (n)
      return n;
    {
      const i = new RealtimeChannel(`realtime:${e}`, t, this);
      return this.channels.push(i), i;
    }
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(e) {
    const { topic: t, event: s, payload: n, ref: i } = e, o = () => {
      this.encode(e, (l) => {
        var c;
        (c = this.conn) === null || c === void 0 || c.send(l);
      });
    };
    this.log("push", `${t} ${s} (${i})`, n), this.isConnected() ? o() : this.sendBuffer.push(o);
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
    this._authPromise = this._performAuth(e);
    try {
      await this._authPromise;
    } finally {
      this._authPromise = null;
    }
  }
  /**
   * Sends a heartbeat message if the socket is connected.
   */
  async sendHeartbeat() {
    var e;
    if (!this.isConnected()) {
      try {
        this.heartbeatCallback("disconnected");
      } catch (t) {
        this.log("error", "error in heartbeat callback", t);
      }
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
      try {
        this.heartbeatCallback("timeout");
      } catch (t) {
        this.log("error", "error in heartbeat callback", t);
      }
      this._wasManualDisconnect = !1, (e = this.conn) === null || e === void 0 || e.close(WS_CLOSE_NORMAL, "heartbeat timeout"), setTimeout(() => {
        var t;
        this.isConnected() || (t = this.reconnectTimer) === null || t === void 0 || t.scheduleTimeout();
      }, CONNECTION_TIMEOUTS.HEARTBEAT_TIMEOUT_FALLBACK);
      return;
    }
    this.pendingHeartbeatRef = this._makeRef(), this.push({
      topic: "phoenix",
      event: "heartbeat",
      payload: {},
      ref: this.pendingHeartbeatRef
    });
    try {
      this.heartbeatCallback("sent");
    } catch (t) {
      this.log("error", "error in heartbeat callback", t);
    }
    this._setAuthSafely("heartbeat");
  }
  onHeartbeat(e) {
    this.heartbeatCallback = e;
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
    this.channels = this.channels.filter((t) => t.topic !== e.topic);
  }
  /** @internal */
  _onConnMessage(e) {
    this.decode(e.data, (t) => {
      if (t.topic === "phoenix" && t.event === "phx_reply")
        try {
          this.heartbeatCallback(t.payload.status === "ok" ? "ok" : "error");
        } catch (u) {
          this.log("error", "error in heartbeat callback", u);
        }
      t.ref && t.ref === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null);
      const { topic: s, event: n, payload: i, ref: o } = t, l = o ? `(${o})` : "", c = i.status || "";
      this.log("receive", `${c} ${s} ${n} ${l}`.trim(), i), this.channels.filter((u) => u._isMember(s)).forEach((u) => u._trigger(n, i, o)), this._triggerStateCallbacks("message", t);
    });
  }
  /**
   * Clear specific timer
   * @internal
   */
  _clearTimer(e) {
    var t;
    e === "heartbeat" && this.heartbeatTimer ? (clearInterval(this.heartbeatTimer), this.heartbeatTimer = void 0) : e === "reconnect" && ((t = this.reconnectTimer) === null || t === void 0 || t.reset());
  }
  /**
   * Clear all timers
   * @internal
   */
  _clearAllTimers() {
    this._clearTimer("heartbeat"), this._clearTimer("reconnect");
  }
  /**
   * Setup connection handlers for WebSocket events
   * @internal
   */
  _setupConnectionHandlers() {
    this.conn && ("binaryType" in this.conn && (this.conn.binaryType = "arraybuffer"), this.conn.onopen = () => this._onConnOpen(), this.conn.onerror = (e) => this._onConnError(e), this.conn.onmessage = (e) => this._onConnMessage(e), this.conn.onclose = (e) => this._onConnClose(e));
  }
  /**
   * Teardown connection and cleanup resources
   * @internal
   */
  _teardownConnection() {
    this.conn && (this.conn.onopen = null, this.conn.onerror = null, this.conn.onmessage = null, this.conn.onclose = null, this.conn = null), this._clearAllTimers(), this.channels.forEach((e) => e.teardown());
  }
  /** @internal */
  _onConnOpen() {
    this._setConnectionState("connected"), this.log("transport", `connected to ${this.endpointURL()}`), this.flushSendBuffer(), this._clearTimer("reconnect"), this.worker ? this.workerRef || this._startWorkerHeartbeat() : this._startHeartbeat(), this._triggerStateCallbacks("open");
  }
  /** @internal */
  _startHeartbeat() {
    this.heartbeatTimer && clearInterval(this.heartbeatTimer), this.heartbeatTimer = setInterval(() => this.sendHeartbeat(), this.heartbeatIntervalMs);
  }
  /** @internal */
  _startWorkerHeartbeat() {
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
  /** @internal */
  _onConnClose(e) {
    var t;
    this._setConnectionState("disconnected"), this.log("transport", "close", e), this._triggerChanError(), this._clearTimer("heartbeat"), this._wasManualDisconnect || (t = this.reconnectTimer) === null || t === void 0 || t.scheduleTimeout(), this._triggerStateCallbacks("close", e);
  }
  /** @internal */
  _onConnError(e) {
    this._setConnectionState("disconnected"), this.log("transport", `${e}`), this._triggerChanError(), this._triggerStateCallbacks("error", e);
  }
  /** @internal */
  _triggerChanError() {
    this.channels.forEach((e) => e._trigger(CHANNEL_EVENTS.error));
  }
  /** @internal */
  _appendParams(e, t) {
    if (Object.keys(t).length === 0)
      return e;
    const s = e.match(/\?/) ? "&" : "?", n = new URLSearchParams(t);
    return `${e}${s}${n}`;
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
  /**
   * Set connection state with proper state management
   * @internal
   */
  _setConnectionState(e, t = !1) {
    this._connectionState = e, e === "connecting" ? this._wasManualDisconnect = !1 : e === "disconnecting" && (this._wasManualDisconnect = t);
  }
  /**
   * Perform the actual auth operation
   * @internal
   */
  async _performAuth(e = null) {
    let t;
    e ? t = e : this.accessToken ? t = await this.accessToken() : t = this.accessTokenValue, this.accessTokenValue != t && (this.accessTokenValue = t, this.channels.forEach((s) => {
      const n = {
        access_token: t,
        version: DEFAULT_VERSION
      };
      t && s.updateJoinPayload(n), s.joinedOnce && s._isJoined() && s._push(CHANNEL_EVENTS.access_token, {
        access_token: t
      });
    }));
  }
  /**
   * Wait for any in-flight auth operations to complete
   * @internal
   */
  async _waitForAuthIfNeeded() {
    this._authPromise && await this._authPromise;
  }
  /**
   * Safely call setAuth with standardized error handling
   * @internal
   */
  _setAuthSafely(e = "general") {
    this.setAuth().catch((t) => {
      this.log("error", `error setting auth in ${e}`, t);
    });
  }
  /**
   * Trigger state change callbacks with proper error handling
   * @internal
   */
  _triggerStateCallbacks(e, t) {
    try {
      this.stateChangeCallbacks[e].forEach((s) => {
        try {
          s(t);
        } catch (n) {
          this.log("error", `error in ${e} callback`, n);
        }
      });
    } catch (s) {
      this.log("error", `error triggering ${e} callbacks`, s);
    }
  }
  /**
   * Setup reconnection timer with proper configuration
   * @internal
   */
  _setupReconnectionTimer() {
    this.reconnectTimer = new Timer(async () => {
      setTimeout(async () => {
        await this._waitForAuthIfNeeded(), this.isConnected() || this.connect();
      }, CONNECTION_TIMEOUTS.RECONNECT_DELAY);
    }, this.reconnectAfterMs);
  }
  /**
   * Initialize client options with defaults
   * @internal
   */
  _initializeOptions(e) {
    var t, s, n, i, o, l, c, u, d;
    if (this.transport = (t = e == null ? void 0 : e.transport) !== null && t !== void 0 ? t : null, this.timeout = (s = e == null ? void 0 : e.timeout) !== null && s !== void 0 ? s : DEFAULT_TIMEOUT, this.heartbeatIntervalMs = (n = e == null ? void 0 : e.heartbeatIntervalMs) !== null && n !== void 0 ? n : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL, this.worker = (i = e == null ? void 0 : e.worker) !== null && i !== void 0 ? i : !1, this.accessToken = (o = e == null ? void 0 : e.accessToken) !== null && o !== void 0 ? o : null, this.heartbeatCallback = (l = e == null ? void 0 : e.heartbeatCallback) !== null && l !== void 0 ? l : noop, e != null && e.params && (this.params = e.params), e != null && e.logger && (this.logger = e.logger), (e != null && e.logLevel || e != null && e.log_level) && (this.logLevel = e.logLevel || e.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = (c = e == null ? void 0 : e.reconnectAfterMs) !== null && c !== void 0 ? c : (f) => RECONNECT_INTERVALS[f - 1] || DEFAULT_RECONNECT_FALLBACK, this.encode = (u = e == null ? void 0 : e.encode) !== null && u !== void 0 ? u : (f, p) => p(JSON.stringify(f)), this.decode = (d = e == null ? void 0 : e.decode) !== null && d !== void 0 ? d : this.serializer.decode.bind(this.serializer), this.worker) {
      if (typeof window < "u" && !window.Worker)
        throw new Error("Web Worker is not supported");
      this.workerUrl = e == null ? void 0 : e.workerUrl;
    }
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
  constructor(e, t, s) {
    super(e), this.name = "StorageApiError", this.status = t, this.statusCode = s;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}
class StorageUnknownError extends StorageError {
  constructor(e, t) {
    super(e), this.name = "StorageUnknownError", this.originalError = t;
  }
}
const resolveFetch$3 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$1).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
}, resolveResponse = () => __awaiter(void 0, void 0, void 0, function* () {
  return typeof Response > "u" ? (yield Promise.resolve().then(() => browser$1)).Response : Response;
}), recursiveToCamel = (r) => {
  if (Array.isArray(r))
    return r.map((t) => recursiveToCamel(t));
  if (typeof r == "function" || r !== Object(r))
    return r;
  const e = {};
  return Object.entries(r).forEach(([t, s]) => {
    const n = t.replace(/([-_][a-z])/gi, (i) => i.toUpperCase().replace(/[-_]/g, ""));
    e[n] = recursiveToCamel(s);
  }), e;
}, isPlainObject$1 = (r) => {
  if (typeof r != "object" || r === null)
    return !1;
  const e = Object.getPrototypeOf(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in r) && !(Symbol.iterator in r);
}, _getErrorMessage$2 = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r), handleError$2 = (r, e, t) => __awaiter(void 0, void 0, void 0, function* () {
  const s = yield resolveResponse();
  r instanceof s && !(t != null && t.noResolveJson) ? r.json().then((n) => {
    const i = r.status || 500, o = (n == null ? void 0 : n.statusCode) || i + "";
    e(new StorageApiError(_getErrorMessage$2(n), i, o));
  }).catch((n) => {
    e(new StorageUnknownError(_getErrorMessage$2(n), n));
  }) : e(new StorageUnknownError(_getErrorMessage$2(r), r));
}), _getRequestParams$2 = (r, e, t, s) => {
  const n = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return r === "GET" || !s ? n : (isPlainObject$1(s) ? (n.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), n.body = JSON.stringify(s)) : n.body = s, e != null && e.duplex && (n.duplex = e.duplex), Object.assign(Object.assign({}, n), t));
};
function _handleRequest$2(r, e, t, s, n, i) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((o, l) => {
      r(t, _getRequestParams$2(e, s, n, i)).then((c) => {
        if (!c.ok)
          throw c;
        return s != null && s.noResolveJson ? c : c.json();
      }).then((c) => o(c)).catch((c) => handleError$2(c, l, s));
    });
  });
}
function get(r, e, t, s) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest$2(r, "GET", e, t, s);
  });
}
function post$1(r, e, t, s, n) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest$2(r, "POST", e, s, n, t);
  });
}
function put(r, e, t, s, n) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest$2(r, "PUT", e, s, n, t);
  });
}
function head(r, e, t, s) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest$2(r, "HEAD", e, Object.assign(Object.assign({}, t), { noResolveJson: !0 }), s);
  });
}
function remove(r, e, t, s, n) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest$2(r, "DELETE", e, s, n, t);
  });
}
class StreamDownloadBuilder {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t;
  }
  then(e, t) {
    return this.execute().then(e, t);
  }
  execute() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return {
          data: (yield this.downloadFn()).body,
          error: null
        };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (isStorageError(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
}
var _a;
class BlobDownloadBuilder {
  constructor(e, t) {
    this.downloadFn = e, this.shouldThrowOnError = t, this[_a] = "BlobDownloadBuilder", this.promise = null;
  }
  asStream() {
    return new StreamDownloadBuilder(this.downloadFn, this.shouldThrowOnError);
  }
  then(e, t) {
    return this.getPromise().then(e, t);
  }
  catch(e) {
    return this.getPromise().catch(e);
  }
  finally(e) {
    return this.getPromise().finally(e);
  }
  getPromise() {
    return this.promise || (this.promise = this.execute()), this.promise;
  }
  execute() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return {
          data: yield (yield this.downloadFn()).blob(),
          error: null
        };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
        if (isStorageError(e))
          return { data: null, error: e };
        throw e;
      }
    });
  }
}
_a = Symbol.toStringTag;
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
  constructor(e, t = {}, s, n) {
    this.shouldThrowOnError = !1, this.url = e, this.headers = t, this.bucketId = s, this.fetch = resolveFetch$3(n);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(e, t, s, n) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let i;
        const o = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), n);
        let l = Object.assign(Object.assign({}, this.headers), e === "POST" && { "x-upsert": String(o.upsert) });
        const c = o.metadata;
        typeof Blob < "u" && s instanceof Blob ? (i = new FormData(), i.append("cacheControl", o.cacheControl), c && i.append("metadata", this.encodeMetadata(c)), i.append("", s)) : typeof FormData < "u" && s instanceof FormData ? (i = s, i.append("cacheControl", o.cacheControl), c && i.append("metadata", this.encodeMetadata(c))) : (i = s, l["cache-control"] = `max-age=${o.cacheControl}`, l["content-type"] = o.contentType, c && (l["x-metadata"] = this.toBase64(this.encodeMetadata(c)))), n != null && n.headers && (l = Object.assign(Object.assign({}, l), n.headers));
        const u = this._removeEmptyFolders(t), d = this._getFinalPath(u), f = yield (e == "PUT" ? put : post$1)(this.fetch, `${this.url}/object/${d}`, i, Object.assign({ headers: l }, o != null && o.duplex ? { duplex: o.duplex } : {}));
        return {
          data: { path: u, id: f.Id, fullPath: f.Key },
          error: null
        };
      } catch (i) {
        if (this.shouldThrowOnError)
          throw i;
        if (isStorageError(i))
          return { data: null, error: i };
        throw i;
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
    return __awaiter(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, s);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(e, t, s, n) {
    return __awaiter(this, void 0, void 0, function* () {
      const i = this._removeEmptyFolders(e), o = this._getFinalPath(i), l = new URL(this.url + `/object/upload/sign/${o}`);
      l.searchParams.set("token", t);
      try {
        let c;
        const u = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, n), d = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(u.upsert) });
        typeof Blob < "u" && s instanceof Blob ? (c = new FormData(), c.append("cacheControl", u.cacheControl), c.append("", s)) : typeof FormData < "u" && s instanceof FormData ? (c = s, c.append("cacheControl", u.cacheControl)) : (c = s, d["cache-control"] = `max-age=${u.cacheControl}`, d["content-type"] = u.contentType);
        const f = yield put(this.fetch, l.toString(), c, { headers: d });
        return {
          data: { path: i, fullPath: f.Key },
          error: null
        };
      } catch (c) {
        if (this.shouldThrowOnError)
          throw c;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e);
        const n = Object.assign({}, this.headers);
        t != null && t.upsert && (n["x-upsert"] = "true");
        const i = yield post$1(this.fetch, `${this.url}/object/upload/sign/${s}`, {}, { headers: n }), o = new URL(this.url + i.url), l = o.searchParams.get("token");
        if (!l)
          throw new StorageError("No token returned by API");
        return { data: { signedUrl: o.toString(), path: e, token: l }, error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
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
    return __awaiter(this, void 0, void 0, function* () {
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post$1(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: s == null ? void 0 : s.destinationBucket
        }, { headers: this.headers }), error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: { path: (yield post$1(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: s == null ? void 0 : s.destinationBucket
        }, { headers: this.headers })).Key }, error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        let n = this._getFinalPath(e), i = yield post$1(this.fetch, `${this.url}/object/sign/${n}`, Object.assign({ expiresIn: t }, s != null && s.transform ? { transform: s.transform } : {}), { headers: this.headers });
        const o = s != null && s.download ? `&download=${s.download === !0 ? "" : s.download}` : "";
        return i = { signedUrl: encodeURI(`${this.url}${i.signedURL}${o}`) }, { data: i, error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const n = yield post$1(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), i = s != null && s.download ? `&download=${s.download === !0 ? "" : s.download}` : "";
        return {
          data: n.map((o) => Object.assign(Object.assign({}, o), { signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${i}`) : null })),
          error: null
        };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
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
    const n = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", i = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), o = i ? `?${i}` : "", l = this._getFinalPath(e), c = () => get(this.fetch, `${this.url}/${n}/${l}${o}`, {
      headers: this.headers,
      noResolveJson: !0
    });
    return new BlobDownloadBuilder(c, this.shouldThrowOnError);
  }
  /**
   * Retrieves the details of an existing file.
   * @param path
   */
  info(e) {
    return __awaiter(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        const s = yield get(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers
        });
        return { data: recursiveToCamel(s), error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
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
    return __awaiter(this, void 0, void 0, function* () {
      const t = this._getFinalPath(e);
      try {
        return yield head(this.fetch, `${this.url}/object/${t}`, {
          headers: this.headers
        }), { data: !0, error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (isStorageError(s) && s instanceof StorageUnknownError) {
          const n = s.originalError;
          if ([400, 404].includes(n == null ? void 0 : n.status))
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
    const s = this._getFinalPath(e), n = [], i = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
    i !== "" && n.push(i);
    const l = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", c = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
    c !== "" && n.push(c);
    let u = n.join("&");
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: e }, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
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
   * Lists all the files and folders within a path of the bucket.
   * @param path The folder path.
   * @param options Search options including limit (defaults to 100), offset, sortBy, and search
   */
  list(e, t, s) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const n = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), t), { prefix: e || "" });
        return { data: yield post$1(this.fetch, `${this.url}/object/list/${this.bucketId}`, n, { headers: this.headers }, s), error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
      }
    });
  }
  /**
   * @experimental this method signature might change in the future
   * @param options search options
   * @param parameters
   */
  listV2(e, t) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const s = Object.assign({}, e);
        return { data: yield post$1(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, s, { headers: this.headers }, t), error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
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
    return `${this.bucketId}/${e.replace(/^\/+/, "")}`;
  }
  _removeEmptyFolders(e) {
    return e.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
  }
  transformOptsToQueryString(e) {
    const t = [];
    return e.width && t.push(`width=${e.width}`), e.height && t.push(`height=${e.height}`), e.resize && t.push(`resize=${e.resize}`), e.format && t.push(`format=${e.format}`), e.quality && t.push(`quality=${e.quality}`), t.join("&");
  }
}
const version$2 = "2.76.1", DEFAULT_HEADERS$3 = {
  "X-Client-Info": `storage-js/${version$2}`
};
class StorageBucketApi {
  constructor(e, t = {}, s, n) {
    this.shouldThrowOnError = !1;
    const i = new URL(e);
    n != null && n.useNewHostname && /supabase\.(co|in|red)$/.test(i.hostname) && !i.hostname.includes("storage.supabase.") && (i.hostname = i.hostname.replace("supabase.", "storage.supabase.")), this.url = i.href.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$3), t), this.fetch = resolveFetch$3(s);
  }
  /**
   * Enable throwing errors instead of returning them.
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Retrieves the details of all Storage buckets within an existing project.
   */
  listBuckets() {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield get(this.fetch, `${this.url}/bucket`, { headers: this.headers }), error: null };
      } catch (e) {
        if (this.shouldThrowOnError)
          throw e;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield get(this.fetch, `${this.url}/bucket/${e}`, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
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
   * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
   *   - default bucket type is `STANDARD`
   */
  createBucket(e) {
    return __awaiter(this, arguments, void 0, function* (t, s = {
      public: !1
    }) {
      try {
        return { data: yield post$1(this.fetch, `${this.url}/bucket`, {
          id: t,
          name: t,
          type: s.type,
          public: s.public,
          file_size_limit: s.fileSizeLimit,
          allowed_mime_types: s.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (n) {
        if (this.shouldThrowOnError)
          throw n;
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield put(this.fetch, `${this.url}/bucket/${e}`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post$1(this.fetch, `${this.url}/bucket/${e}/empty`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
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
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield remove(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
class StorageAnalyticsApi {
  /**
   * Creates a new StorageAnalyticsApi instance
   * @param url - The base URL for the storage API
   * @param headers - HTTP headers to include in requests
   * @param fetch - Optional custom fetch implementation
   */
  constructor(e, t = {}, s) {
    this.shouldThrowOnError = !1, this.url = e.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$3), t), this.fetch = resolveFetch$3(s);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Creates a new analytics bucket using Iceberg tables
   * Analytics buckets are optimized for analytical queries and data processing
   *
   * @param name A unique name for the bucket you are creating
   * @returns Promise with newly created bucket name or error
   *
   * @example
   * ```typescript
   * const { data, error } = await storage.analytics.createBucket('analytics-data')
   * if (error) {
   *   console.error('Failed to create analytics bucket:', error.message)
   * } else {
   *   console.log('Created bucket:', data.name)
   * }
   * ```
   */
  createBucket(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post$1(this.fetch, `${this.url}/bucket`, { name: e }, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Retrieves the details of all Analytics Storage buckets within an existing project
   * Only returns buckets of type 'ANALYTICS'
   *
   * @param options Query parameters for listing buckets
   * @param options.limit Maximum number of buckets to return
   * @param options.offset Number of buckets to skip
   * @param options.sortColumn Column to sort by ('id', 'name', 'created_at', 'updated_at')
   * @param options.sortOrder Sort order ('asc' or 'desc')
   * @param options.search Search term to filter bucket names
   * @returns Promise with list of analytics buckets or error
   *
   * @example
   * ```typescript
   * const { data, error } = await storage.analytics.listBuckets({
   *   limit: 10,
   *   offset: 0,
   *   sortColumn: 'created_at',
   *   sortOrder: 'desc',
   *   search: 'analytics'
   * })
   * if (data) {
   *   console.log('Found analytics buckets:', data.length)
   *   data.forEach(bucket => console.log(`- ${bucket.name}`))
   * }
   * ```
   */
  listBuckets(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const t = new URLSearchParams();
        (e == null ? void 0 : e.limit) !== void 0 && t.set("limit", e.limit.toString()), (e == null ? void 0 : e.offset) !== void 0 && t.set("offset", e.offset.toString()), e != null && e.sortColumn && t.set("sortColumn", e.sortColumn), e != null && e.sortOrder && t.set("sortOrder", e.sortOrder), e != null && e.search && t.set("search", e.search);
        const s = t.toString(), n = s ? `${this.url}/bucket?${s}` : `${this.url}/bucket`, i = yield get(this.fetch, n, { headers: this.headers });
        return { data: Array.isArray(i) ? i.filter((l) => l.type === "ANALYTICS") : [], error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Deletes an existing analytics bucket
   * A bucket can't be deleted with existing objects inside it
   * You must first empty the bucket before deletion
   *
   * @param bucketId The unique identifier of the bucket you would like to delete
   * @returns Promise with success message or error
   *
   * @example
   * ```typescript
   * const { data, error } = await analyticsApi.deleteBucket('old-analytics-bucket')
   * if (error) {
   *   console.error('Failed to delete bucket:', error.message)
   * } else {
   *   console.log('Bucket deleted successfully:', data.message)
   * }
   * ```
   */
  deleteBucket(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield remove(this.fetch, `${this.url}/bucket/${e}`, {}, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
const DEFAULT_HEADERS$2 = {
  "X-Client-Info": `storage-js/${version$2}`,
  "Content-Type": "application/json"
};
class StorageVectorsError extends Error {
  constructor(e) {
    super(e), this.__isStorageVectorsError = !0, this.name = "StorageVectorsError";
  }
}
function isStorageVectorsError(r) {
  return typeof r == "object" && r !== null && "__isStorageVectorsError" in r;
}
class StorageVectorsApiError extends StorageVectorsError {
  constructor(e, t, s) {
    super(e), this.name = "StorageVectorsApiError", this.status = t, this.statusCode = s;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}
class StorageVectorsUnknownError extends StorageVectorsError {
  constructor(e, t) {
    super(e), this.name = "StorageVectorsUnknownError", this.originalError = t;
  }
}
var StorageVectorsErrorCode;
(function(r) {
  r.InternalError = "InternalError", r.S3VectorConflictException = "S3VectorConflictException", r.S3VectorNotFoundException = "S3VectorNotFoundException", r.S3VectorBucketNotEmpty = "S3VectorBucketNotEmpty", r.S3VectorMaxBucketsExceeded = "S3VectorMaxBucketsExceeded", r.S3VectorMaxIndexesExceeded = "S3VectorMaxIndexesExceeded";
})(StorageVectorsErrorCode || (StorageVectorsErrorCode = {}));
const resolveFetch$2 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$1).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
}, isPlainObject = (r) => {
  if (typeof r != "object" || r === null)
    return !1;
  const e = Object.getPrototypeOf(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in r) && !(Symbol.iterator in r);
}, _getErrorMessage$1 = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r), handleError$1 = (r, e, t) => __awaiter(void 0, void 0, void 0, function* () {
  if (r && typeof r == "object" && "status" in r && "ok" in r && typeof r.status == "number" && !(t != null && t.noResolveJson)) {
    const n = r.status || 500, i = r;
    if (typeof i.json == "function")
      i.json().then((o) => {
        const l = (o == null ? void 0 : o.statusCode) || (o == null ? void 0 : o.code) || n + "";
        e(new StorageVectorsApiError(_getErrorMessage$1(o), n, l));
      }).catch(() => {
        const o = n + "", l = i.statusText || `HTTP ${n} error`;
        e(new StorageVectorsApiError(l, n, o));
      });
    else {
      const o = n + "", l = i.statusText || `HTTP ${n} error`;
      e(new StorageVectorsApiError(l, n, o));
    }
  } else
    e(new StorageVectorsUnknownError(_getErrorMessage$1(r), r));
}), _getRequestParams$1 = (r, e, t, s) => {
  const n = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return s ? (isPlainObject(s) ? (n.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), n.body = JSON.stringify(s)) : n.body = s, Object.assign(Object.assign({}, n), t)) : n;
};
function _handleRequest$1(r, e, t, s, n, i) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((o, l) => {
      r(t, _getRequestParams$1(e, s, n, i)).then((c) => {
        if (!c.ok)
          throw c;
        if (s != null && s.noResolveJson)
          return c;
        const u = c.headers.get("content-type");
        return !u || !u.includes("application/json") ? {} : c.json();
      }).then((c) => o(c)).catch((c) => handleError$1(c, l, s));
    });
  });
}
function post(r, e, t, s, n) {
  return __awaiter(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "POST", e, s, n, t);
  });
}
class VectorIndexApi {
  constructor(e, t = {}, s) {
    this.shouldThrowOnError = !1, this.url = e.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$2), t), this.fetch = resolveFetch$2(s);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   * @example
   * ```typescript
   * const client = new VectorIndexApi(url, headers)
   * client.throwOnError()
   * const { data } = await client.createIndex(options) // throws on error
   * ```
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Creates a new vector index within a bucket
   * Defines the schema for vectors including dimensionality, distance metric, and metadata config
   *
   * @param options - Index configuration
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Unique name for the index within the bucket
   * @param options.dataType - Data type for vector components (currently only 'float32')
   * @param options.dimension - Dimensionality of vectors (e.g., 384, 768, 1536)
   * @param options.distanceMetric - Similarity metric ('cosine', 'euclidean', 'dotproduct')
   * @param options.metadataConfiguration - Optional config for non-filterable metadata keys
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorConflictException` if index already exists (HTTP 409)
   * - `S3VectorMaxIndexesExceeded` if quota exceeded (HTTP 400)
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.createIndex({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   dataType: 'float32',
   *   dimension: 1536,
   *   distanceMetric: 'cosine',
   *   metadataConfiguration: {
   *     nonFilterableMetadataKeys: ['raw_text', 'internal_id']
   *   }
   * })
   * ```
   */
  createIndex(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: (yield post(this.fetch, `${this.url}/CreateIndex`, e, {
          headers: this.headers
        })) || {}, error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Retrieves metadata for a specific vector index
   * Returns index configuration including dimension, distance metric, and metadata settings
   *
   * @param vectorBucketName - Name of the parent vector bucket
   * @param indexName - Name of the index to retrieve
   * @returns Promise with index metadata or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if index or bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.getIndex('embeddings-prod', 'documents-openai-small')
   * if (data) {
   *   console.log('Index dimension:', data.index.dimension)
   *   console.log('Distance metric:', data.index.distanceMetric)
   * }
   * ```
   */
  getIndex(e, t) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/GetIndex`, { vectorBucketName: e, indexName: t }, { headers: this.headers }), error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (isStorageVectorsError(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
  /**
   * Lists vector indexes within a bucket with optional filtering and pagination
   * Supports prefix-based filtering and paginated results
   *
   * @param options - Listing options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.prefix - Filter indexes by name prefix
   * @param options.maxResults - Maximum results per page (default: 100)
   * @param options.nextToken - Pagination token from previous response
   * @returns Promise with list of indexes and pagination token
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // List all indexes in a bucket
   * const { data, error } = await client.listIndexes({
   *   vectorBucketName: 'embeddings-prod',
   *   prefix: 'documents-'
   * })
   * if (data) {
   *   console.log('Found indexes:', data.indexes.map(i => i.indexName))
   *   // Fetch next page if available
   *   if (data.nextToken) {
   *     const next = await client.listIndexes({
   *       vectorBucketName: 'embeddings-prod',
   *       nextToken: data.nextToken
   *     })
   *   }
   * }
   * ```
   */
  listIndexes(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/ListIndexes`, e, {
          headers: this.headers
        }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Deletes a vector index and all its data
   * This operation removes the index schema and all vectors stored in the index
   *
   * @param vectorBucketName - Name of the parent vector bucket
   * @param indexName - Name of the index to delete
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if index or bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Delete an index and all its vectors
   * const { error } = await client.deleteIndex('embeddings-prod', 'old-index')
   * if (!error) {
   *   console.log('Index deleted successfully')
   * }
   * ```
   */
  deleteIndex(e, t) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: (yield post(this.fetch, `${this.url}/DeleteIndex`, { vectorBucketName: e, indexName: t }, { headers: this.headers })) || {}, error: null };
      } catch (s) {
        if (this.shouldThrowOnError)
          throw s;
        if (isStorageVectorsError(s))
          return { data: null, error: s };
        throw s;
      }
    });
  }
}
class VectorDataApi {
  constructor(e, t = {}, s) {
    this.shouldThrowOnError = !1, this.url = e.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$2), t), this.fetch = resolveFetch$2(s);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   * @example
   * ```typescript
   * const client = new VectorDataApi(url, headers)
   * client.throwOnError()
   * const { data } = await client.putVectors(options) // throws on error
   * ```
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Inserts or updates vectors in batch (upsert operation)
   * Accepts 1-500 vectors per request. Larger batches should be split
   *
   * @param options - Vector insertion options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the target index
   * @param options.vectors - Array of vectors to insert/update (1-500 items)
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorConflictException` if duplicate key conflict occurs (HTTP 409)
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.putVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   vectors: [
   *     {
   *       key: 'doc-1',
   *       data: { float32: [0.1, 0.2, 0.3, ...] }, // 1536 dimensions
   *       metadata: { title: 'Introduction', page: 1 }
   *     },
   *     {
   *       key: 'doc-2',
   *       data: { float32: [0.4, 0.5, 0.6, ...] },
   *       metadata: { title: 'Conclusion', page: 42 }
   *     }
   *   ]
   * })
   * ```
   */
  putVectors(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (e.vectors.length < 1 || e.vectors.length > 500)
          throw new Error("Vector batch size must be between 1 and 500 items");
        return { data: (yield post(this.fetch, `${this.url}/PutVectors`, e, {
          headers: this.headers
        })) || {}, error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Retrieves vectors by their keys in batch
   * Optionally includes vector data and/or metadata in response
   * Additional permissions required when returning data or metadata
   *
   * @param options - Vector retrieval options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.keys - Array of vector keys to retrieve
   * @param options.returnData - Whether to include vector embeddings (requires permission)
   * @param options.returnMetadata - Whether to include metadata (requires permission)
   * @returns Promise with array of vectors or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.getVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   keys: ['doc-1', 'doc-2', 'doc-3'],
   *   returnData: false,     // Don't return embeddings
   *   returnMetadata: true   // Return metadata only
   * })
   * if (data) {
   *   data.vectors.forEach(v => console.log(v.key, v.metadata))
   * }
   * ```
   */
  getVectors(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/GetVectors`, e, {
          headers: this.headers
        }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Lists/scans vectors in an index with pagination
   * Supports parallel scanning via segment configuration for high-throughput scenarios
   * Additional permissions required when returning data or metadata
   *
   * @param options - Vector listing options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.maxResults - Maximum results per page (default: 500, max: 1000)
   * @param options.nextToken - Pagination token from previous response
   * @param options.returnData - Whether to include vector embeddings (requires permission)
   * @param options.returnMetadata - Whether to include metadata (requires permission)
   * @param options.segmentCount - Total parallel segments (1-16) for distributed scanning
   * @param options.segmentIndex - Zero-based segment index (0 to segmentCount-1)
   * @returns Promise with array of vectors, pagination token, or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Simple pagination
   * let nextToken: string | undefined
   * do {
   *   const { data, error } = await client.listVectors({
   *     vectorBucketName: 'embeddings-prod',
   *     indexName: 'documents-openai-small',
   *     maxResults: 500,
   *     nextToken,
   *     returnMetadata: true
   *   })
   *   if (error) break
   *   console.log('Batch:', data.vectors.length)
   *   nextToken = data.nextToken
   * } while (nextToken)
   *
   * // Parallel scanning (4 concurrent workers)
   * const workers = [0, 1, 2, 3].map(async (segmentIndex) => {
   *   const { data } = await client.listVectors({
   *     vectorBucketName: 'embeddings-prod',
   *     indexName: 'documents-openai-small',
   *     segmentCount: 4,
   *     segmentIndex,
   *     returnMetadata: true
   *   })
   *   return data?.vectors || []
   * })
   * const results = await Promise.all(workers)
   * ```
   */
  listVectors(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (e.segmentCount !== void 0) {
          if (e.segmentCount < 1 || e.segmentCount > 16)
            throw new Error("segmentCount must be between 1 and 16");
          if (e.segmentIndex !== void 0 && (e.segmentIndex < 0 || e.segmentIndex >= e.segmentCount))
            throw new Error(`segmentIndex must be between 0 and ${e.segmentCount - 1}`);
        }
        return { data: yield post(this.fetch, `${this.url}/ListVectors`, e, {
          headers: this.headers
        }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Queries for similar vectors using approximate nearest neighbor (ANN) search
   * Returns top-K most similar vectors based on the configured distance metric
   * Supports optional metadata filtering (requires GetVectors permission)
   *
   * @param options - Query options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.queryVector - Query embedding to find similar vectors
   * @param options.topK - Number of nearest neighbors to return (default: 10)
   * @param options.filter - Optional JSON filter for metadata (requires GetVectors permission)
   * @param options.returnDistance - Whether to include similarity distances
   * @param options.returnMetadata - Whether to include metadata (requires GetVectors permission)
   * @returns Promise with array of similar vectors ordered by distance
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Semantic search with filtering
   * const { data, error } = await client.queryVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   queryVector: { float32: [0.1, 0.2, 0.3, ...] }, // 1536 dimensions
   *   topK: 5,
   *   filter: {
   *     category: 'technical',
   *     published: true
   *   },
   *   returnDistance: true,
   *   returnMetadata: true
   * })
   * if (data) {
   *   data.matches.forEach(match => {
   *     console.log(`${match.key}: distance=${match.distance}`)
   *     console.log('Metadata:', match.metadata)
   *   })
   * }
   * ```
   */
  queryVectors(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/QueryVectors`, e, {
          headers: this.headers
        }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Deletes vectors by their keys in batch
   * Accepts 1-500 keys per request
   *
   * @param options - Vector deletion options
   * @param options.vectorBucketName - Name of the parent vector bucket
   * @param options.indexName - Name of the index
   * @param options.keys - Array of vector keys to delete (1-500 items)
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket or index doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { error } = await client.deleteVectors({
   *   vectorBucketName: 'embeddings-prod',
   *   indexName: 'documents-openai-small',
   *   keys: ['doc-1', 'doc-2', 'doc-3']
   * })
   * if (!error) {
   *   console.log('Vectors deleted successfully')
   * }
   * ```
   */
  deleteVectors(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        if (e.keys.length < 1 || e.keys.length > 500)
          throw new Error("Keys batch size must be between 1 and 500 items");
        return { data: (yield post(this.fetch, `${this.url}/DeleteVectors`, e, {
          headers: this.headers
        })) || {}, error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
class VectorBucketApi {
  /**
   * Creates a new VectorBucketApi instance
   * @param url - The base URL for the storage vectors API
   * @param headers - HTTP headers to include in requests
   * @param fetch - Optional custom fetch implementation
   */
  constructor(e, t = {}, s) {
    this.shouldThrowOnError = !1, this.url = e.replace(/\/$/, ""), this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$2), t), this.fetch = resolveFetch$2(s);
  }
  /**
   * Enable throwing errors instead of returning them in the response
   * When enabled, failed operations will throw instead of returning { data: null, error }
   *
   * @returns This instance for method chaining
   * @example
   * ```typescript
   * const client = new VectorBucketApi(url, headers)
   * client.throwOnError()
   * const { data } = await client.createBucket('my-bucket') // throws on error
   * ```
   */
  throwOnError() {
    return this.shouldThrowOnError = !0, this;
  }
  /**
   * Creates a new vector bucket
   * Vector buckets are containers for vector indexes and their data
   *
   * @param vectorBucketName - Unique name for the vector bucket
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorConflictException` if bucket already exists (HTTP 409)
   * - `S3VectorMaxBucketsExceeded` if quota exceeded (HTTP 400)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.createBucket('embeddings-prod')
   * if (error) {
   *   console.error('Failed to create bucket:', error.message)
   * }
   * ```
   */
  createBucket(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: (yield post(this.fetch, `${this.url}/CreateVectorBucket`, { vectorBucketName: e }, { headers: this.headers })) || {}, error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Retrieves metadata for a specific vector bucket
   * Returns bucket configuration including encryption settings and creation time
   *
   * @param vectorBucketName - Name of the vector bucket to retrieve
   * @returns Promise with bucket metadata or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * const { data, error } = await client.getBucket('embeddings-prod')
   * if (data) {
   *   console.log('Bucket created at:', new Date(data.vectorBucket.creationTime! * 1000))
   * }
   * ```
   */
  getBucket(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/GetVectorBucket`, { vectorBucketName: e }, { headers: this.headers }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Lists vector buckets with optional filtering and pagination
   * Supports prefix-based filtering and paginated results
   *
   * @param options - Listing options
   * @param options.prefix - Filter buckets by name prefix
   * @param options.maxResults - Maximum results per page (default: 100)
   * @param options.nextToken - Pagination token from previous response
   * @returns Promise with list of buckets and pagination token
   *
   * @throws {StorageVectorsApiError} With code:
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // List all buckets with prefix 'prod-'
   * const { data, error } = await client.listBuckets({ prefix: 'prod-' })
   * if (data) {
   *   console.log('Found buckets:', data.buckets.length)
   *   // Fetch next page if available
   *   if (data.nextToken) {
   *     const next = await client.listBuckets({ nextToken: data.nextToken })
   *   }
   * }
   * ```
   */
  listBuckets() {
    return __awaiter(this, arguments, void 0, function* (e = {}) {
      try {
        return { data: yield post(this.fetch, `${this.url}/ListVectorBuckets`, e, {
          headers: this.headers
        }), error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  /**
   * Deletes a vector bucket
   * Bucket must be empty before deletion (all indexes must be removed first)
   *
   * @param vectorBucketName - Name of the vector bucket to delete
   * @returns Promise with empty response on success or error
   *
   * @throws {StorageVectorsApiError} With code:
   * - `S3VectorBucketNotEmpty` if bucket contains indexes (HTTP 400)
   * - `S3VectorNotFoundException` if bucket doesn't exist (HTTP 404)
   * - `InternalError` for server errors (HTTP 500)
   *
   * @example
   * ```typescript
   * // Delete all indexes first, then delete bucket
   * const { error } = await client.deleteBucket('old-bucket')
   * if (error?.statusCode === 'S3VectorBucketNotEmpty') {
   *   console.error('Must delete all indexes first')
   * }
   * ```
   */
  deleteBucket(e) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        return { data: (yield post(this.fetch, `${this.url}/DeleteVectorBucket`, { vectorBucketName: e }, { headers: this.headers })) || {}, error: null };
      } catch (t) {
        if (this.shouldThrowOnError)
          throw t;
        if (isStorageVectorsError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
}
class StorageVectorsClient extends VectorBucketApi {
  constructor(e, t = {}) {
    super(e, t.headers || {}, t.fetch);
  }
  /**
   * Access operations for a specific vector bucket
   * Returns a scoped client for index and vector operations within the bucket
   *
   * @param vectorBucketName - Name of the vector bucket
   * @returns Bucket-scoped client with index and vector operations
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   *
   * // Create an index in this bucket
   * await bucket.createIndex({
   *   indexName: 'documents-openai',
   *   dataType: 'float32',
   *   dimension: 1536,
   *   distanceMetric: 'cosine'
   * })
   *
   * // List indexes in this bucket
   * const { data } = await bucket.listIndexes()
   * ```
   */
  from(e) {
    return new VectorBucketScope(this.url, this.headers, e, this.fetch);
  }
}
class VectorBucketScope extends VectorIndexApi {
  constructor(e, t, s, n) {
    super(e, t, n), this.vectorBucketName = s;
  }
  /**
   * Creates a new vector index in this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param options - Index configuration (vectorBucketName is automatically set)
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * await bucket.createIndex({
   *   indexName: 'documents-openai',
   *   dataType: 'float32',
   *   dimension: 1536,
   *   distanceMetric: 'cosine',
   *   metadataConfiguration: {
   *     nonFilterableMetadataKeys: ['raw_text']
   *   }
   * })
   * ```
   */
  createIndex(e) {
    const t = Object.create(null, {
      createIndex: { get: () => super.createIndex }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return t.createIndex.call(this, Object.assign(Object.assign({}, e), { vectorBucketName: this.vectorBucketName }));
    });
  }
  /**
   * Lists indexes in this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param options - Listing options (vectorBucketName is automatically set)
   * @returns Promise with list of indexes or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * const { data } = await bucket.listIndexes({ prefix: 'documents-' })
   * ```
   */
  listIndexes() {
    const e = Object.create(null, {
      listIndexes: { get: () => super.listIndexes }
    });
    return __awaiter(this, arguments, void 0, function* (t = {}) {
      return e.listIndexes.call(this, Object.assign(Object.assign({}, t), { vectorBucketName: this.vectorBucketName }));
    });
  }
  /**
   * Retrieves metadata for a specific index in this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param indexName - Name of the index to retrieve
   * @returns Promise with index metadata or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * const { data } = await bucket.getIndex('documents-openai')
   * console.log('Dimension:', data?.index.dimension)
   * ```
   */
  getIndex(e) {
    const t = Object.create(null, {
      getIndex: { get: () => super.getIndex }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return t.getIndex.call(this, this.vectorBucketName, e);
    });
  }
  /**
   * Deletes an index from this bucket
   * Convenience method that automatically includes the bucket name
   *
   * @param indexName - Name of the index to delete
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const bucket = client.bucket('embeddings-prod')
   * await bucket.deleteIndex('old-index')
   * ```
   */
  deleteIndex(e) {
    const t = Object.create(null, {
      deleteIndex: { get: () => super.deleteIndex }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return t.deleteIndex.call(this, this.vectorBucketName, e);
    });
  }
  /**
   * Access operations for a specific index within this bucket
   * Returns a scoped client for vector data operations
   *
   * @param indexName - Name of the index
   * @returns Index-scoped client with vector data operations
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   *
   * // Insert vectors
   * await index.putVectors({
   *   vectors: [
   *     { key: 'doc-1', data: { float32: [...] }, metadata: { title: 'Intro' } }
   *   ]
   * })
   *
   * // Query similar vectors
   * const { data } = await index.queryVectors({
   *   queryVector: { float32: [...] },
   *   topK: 5
   * })
   * ```
   */
  index(e) {
    return new VectorIndexScope(this.url, this.headers, this.vectorBucketName, e, this.fetch);
  }
}
class VectorIndexScope extends VectorDataApi {
  constructor(e, t, s, n, i) {
    super(e, t, i), this.vectorBucketName = s, this.indexName = n;
  }
  /**
   * Inserts or updates vectors in this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Vector insertion options (bucket and index names automatically set)
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * await index.putVectors({
   *   vectors: [
   *     {
   *       key: 'doc-1',
   *       data: { float32: [0.1, 0.2, ...] },
   *       metadata: { title: 'Introduction', page: 1 }
   *     }
   *   ]
   * })
   * ```
   */
  putVectors(e) {
    const t = Object.create(null, {
      putVectors: { get: () => super.putVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return t.putVectors.call(this, Object.assign(Object.assign({}, e), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Retrieves vectors by keys from this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Vector retrieval options (bucket and index names automatically set)
   * @returns Promise with array of vectors or error
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * const { data } = await index.getVectors({
   *   keys: ['doc-1', 'doc-2'],
   *   returnMetadata: true
   * })
   * ```
   */
  getVectors(e) {
    const t = Object.create(null, {
      getVectors: { get: () => super.getVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return t.getVectors.call(this, Object.assign(Object.assign({}, e), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Lists vectors in this index with pagination
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Listing options (bucket and index names automatically set)
   * @returns Promise with array of vectors and pagination token
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * const { data } = await index.listVectors({
   *   maxResults: 500,
   *   returnMetadata: true
   * })
   * ```
   */
  listVectors() {
    const e = Object.create(null, {
      listVectors: { get: () => super.listVectors }
    });
    return __awaiter(this, arguments, void 0, function* (t = {}) {
      return e.listVectors.call(this, Object.assign(Object.assign({}, t), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Queries for similar vectors in this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Query options (bucket and index names automatically set)
   * @returns Promise with array of similar vectors ordered by distance
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * const { data } = await index.queryVectors({
   *   queryVector: { float32: [0.1, 0.2, ...] },
   *   topK: 5,
   *   filter: { category: 'technical' },
   *   returnDistance: true,
   *   returnMetadata: true
   * })
   * ```
   */
  queryVectors(e) {
    const t = Object.create(null, {
      queryVectors: { get: () => super.queryVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return t.queryVectors.call(this, Object.assign(Object.assign({}, e), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
  /**
   * Deletes vectors by keys from this index
   * Convenience method that automatically includes bucket and index names
   *
   * @param options - Deletion options (bucket and index names automatically set)
   * @returns Promise with empty response on success or error
   *
   * @example
   * ```typescript
   * const index = client.bucket('embeddings-prod').index('documents-openai')
   * await index.deleteVectors({
   *   keys: ['doc-1', 'doc-2', 'doc-3']
   * })
   * ```
   */
  deleteVectors(e) {
    const t = Object.create(null, {
      deleteVectors: { get: () => super.deleteVectors }
    });
    return __awaiter(this, void 0, void 0, function* () {
      return t.deleteVectors.call(this, Object.assign(Object.assign({}, e), { vectorBucketName: this.vectorBucketName, indexName: this.indexName }));
    });
  }
}
class StorageClient extends StorageBucketApi {
  constructor(e, t = {}, s, n) {
    super(e, t, s, n);
  }
  /**
   * Perform file operation in a bucket.
   *
   * @param id The bucket id to operate on.
   */
  from(e) {
    return new StorageFileApi(this.url, this.headers, e, this.fetch);
  }
  /**
   * Access vector storage operations.
   *
   * @returns A StorageVectorsClient instance configured with the current storage settings.
   */
  get vectors() {
    return new StorageVectorsClient(this.url + "/vector", {
      headers: this.headers,
      fetch: this.fetch
    });
  }
  /**
   * Access analytics storage operations using Iceberg tables.
   *
   * @returns A StorageAnalyticsApi instance configured with the current storage settings.
   * @example
   * ```typescript
   * const client = createClient(url, key)
   * const analytics = client.storage.analytics
   *
   * // Create an analytics bucket
   * await analytics.createBucket('my-analytics-bucket')
   *
   * // List all analytics buckets
   * const { data: buckets } = await analytics.listBuckets()
   *
   * // Delete an analytics bucket
   * await analytics.deleteBucket('old-analytics-bucket')
   * ```
   */
  get analytics() {
    return new StorageAnalyticsApi(this.url + "/iceberg", this.headers, this.fetch);
  }
}
const version$1 = "2.76.1";
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
}, DEFAULT_REALTIME_OPTIONS = {}, resolveFetch$1 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = nodeFetch : e = fetch, (...t) => e(...t);
}, resolveHeadersConstructor = () => typeof Headers > "u" ? Headers$1 : Headers, fetchWithAuth = (r, e, t) => {
  const s = resolveFetch$1(t), n = resolveHeadersConstructor();
  return async (i, o) => {
    var l;
    const c = (l = await e()) !== null && l !== void 0 ? l : r;
    let u = new n(o == null ? void 0 : o.headers);
    return u.has("apikey") || u.set("apikey", r), u.has("Authorization") || u.set("Authorization", `Bearer ${c}`), s(i, Object.assign(Object.assign({}, o), { headers: u }));
  };
};
function ensureTrailingSlash(r) {
  return r.endsWith("/") ? r : r + "/";
}
function applySettingDefaults(r, e) {
  var t, s;
  const { db: n, auth: i, realtime: o, global: l } = r, { db: c, auth: u, realtime: d, global: f } = e, p = {
    db: Object.assign(Object.assign({}, c), n),
    auth: Object.assign(Object.assign({}, u), i),
    realtime: Object.assign(Object.assign({}, d), o),
    storage: {},
    global: Object.assign(Object.assign(Object.assign({}, f), l), { headers: Object.assign(Object.assign({}, (t = f == null ? void 0 : f.headers) !== null && t !== void 0 ? t : {}), (s = l == null ? void 0 : l.headers) !== null && s !== void 0 ? s : {}) }),
    accessToken: async () => ""
  };
  return r.accessToken ? p.accessToken = r.accessToken : delete p.accessToken, p;
}
function validateSupabaseUrl(r) {
  const e = r == null ? void 0 : r.trim();
  if (!e)
    throw new Error("supabaseUrl is required.");
  if (!e.match(/^https?:\/\//i))
    throw new Error("Invalid supabaseUrl: Must be a valid HTTP or HTTPS URL.");
  try {
    return new URL(ensureTrailingSlash(e));
  } catch {
    throw Error("Invalid supabaseUrl: Provided URL is malformed.");
  }
}
const version = "2.76.1", AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3, AUTO_REFRESH_TICK_THRESHOLD = 3, EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS, GOTRUE_URL = "http://localhost:9999", STORAGE_KEY = "supabase.auth.token", DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${version}` }, API_VERSION_HEADER_NAME = "X-Supabase-Api-Version", API_VERSIONS = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
}, BASE64URL_REGEX = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}$|[a-z0-9_-]{2}$)$/i, JWKS_TTL = 10 * 60 * 1e3;
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
  constructor(e, t, s, n) {
    super(e, s, n), this.name = t, this.status = s;
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
function byteToBase64URL(r, e, t) {
  if (r !== null)
    for (e.queue = e.queue << 8 | r, e.queuedBits += 8; e.queuedBits >= 6; ) {
      const s = e.queue >> e.queuedBits - 6 & 63;
      t(TO_BASE64URL[s]), e.queuedBits -= 6;
    }
  else if (e.queuedBits > 0)
    for (e.queue = e.queue << 6 - e.queuedBits, e.queuedBits = 6; e.queuedBits >= 6; ) {
      const s = e.queue >> e.queuedBits - 6 & 63;
      t(TO_BASE64URL[s]), e.queuedBits -= 6;
    }
}
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
  }, n = { queue: 0, queuedBits: 0 }, i = (o) => {
    stringFromUTF8(o, s, t);
  };
  for (let o = 0; o < r.length; o += 1)
    byteFromBase64URL(r.charCodeAt(o), n, i);
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
      const n = (s - 55296) * 1024 & 65535;
      s = (r.charCodeAt(t + 1) - 56320 & 65535 | n) + 65536, t += 1;
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
  const e = [], t = { queue: 0, queuedBits: 0 }, s = (n) => {
    e.push(n);
  };
  for (let n = 0; n < r.length; n += 1)
    byteFromBase64URL(r.charCodeAt(n), t, s);
  return new Uint8Array(e);
}
function stringToUint8Array(r) {
  const e = [];
  return stringToUTF8(r, (t) => e.push(t)), new Uint8Array(e);
}
function bytesToBase64URL(r) {
  const e = [], t = { queue: 0, queuedBits: 0 }, s = (n) => {
    e.push(n);
  };
  return r.forEach((n) => byteToBase64URL(n, t, s)), byteToBase64URL(null, t, s), e.join("");
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
      new URLSearchParams(t.hash.substring(1)).forEach((n, i) => {
        e[i] = n;
      });
    } catch {
    }
  return t.searchParams.forEach((s, n) => {
    e[n] = s;
  }), e;
}
const resolveFetch = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$1).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
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
  return new Promise((s, n) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const o = await r(i);
          if (!e(i, null, o)) {
            s(o);
            return;
          }
        } catch (o) {
          if (!e(i, o)) {
            n(o);
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
    let n = "";
    for (let i = 0; i < 56; i++)
      n += t.charAt(Math.floor(Math.random() * s));
    return n;
  }
  return crypto.getRandomValues(e), Array.from(e, dec2hex).join("");
}
async function sha256(r) {
  const t = new TextEncoder().encode(r), s = await crypto.subtle.digest("SHA-256", t), n = new Uint8Array(s);
  return Array.from(n).map((i) => String.fromCharCode(i)).join("");
}
async function generatePKCEChallenge(r) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
    return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), r;
  const t = await sha256(r);
  return btoa(t).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function getCodeChallengeAndMethod(r, e, t = !1) {
  const s = generatePKCEVerifier();
  let n = s;
  t && (n += "/PASSWORD_RECOVERY"), await setItemAsync(r, `${e}-code-verifier`, n);
  const i = await generatePKCEChallenge(s);
  return [i, s === i ? "plain" : "s256"];
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
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
function validateUUID(r) {
  if (!UUID_REGEX.test(r))
    throw new Error("@supabase/auth-js: Expected parameter to be UUID but is not");
}
function userNotAvailableProxy() {
  const r = {};
  return new Proxy(r, {
    get: (e, t) => {
      if (t === "__isUserNotAvailableProxy")
        return !0;
      if (typeof t == "symbol") {
        const s = t.toString();
        if (s === "Symbol(Symbol.toPrimitive)" || s === "Symbol(Symbol.toStringTag)" || s === "Symbol(util.inspect.custom)")
          return;
      }
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Accessing the "${t}" property of the session object is not supported. Please use getUser() instead.`);
    },
    set: (e, t) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Setting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    },
    deleteProperty: (e, t) => {
      throw new Error(`@supabase/auth-js: client was created with userStorage option and there was no user stored in the user storage. Deleting the "${t}" property of the session object is not supported. Please use getUser() to fetch a user object you can manipulate.`);
    }
  });
}
function deepClone(r) {
  return JSON.parse(JSON.stringify(r));
}
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
  } catch (i) {
    throw new AuthUnknownError(_getErrorMessage(i), i);
  }
  let s;
  const n = parseResponseAPIVersion(r);
  if (n && n.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof t == "object" && t && typeof t.code == "string" ? s = t.code : typeof t == "object" && t && typeof t.error_code == "string" && (s = t.error_code), s) {
    if (s === "weak_password")
      throw new AuthWeakPasswordError(_getErrorMessage(t), r.status, ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) || []);
    if (s === "session_not_found")
      throw new AuthSessionMissingError();
  } else if (typeof t == "object" && t && typeof t.weak_password == "object" && t.weak_password && Array.isArray(t.weak_password.reasons) && t.weak_password.reasons.length && t.weak_password.reasons.reduce((i, o) => i && typeof o == "string", !0))
    throw new AuthWeakPasswordError(_getErrorMessage(t), r.status, t.weak_password.reasons);
  throw new AuthApiError(_getErrorMessage(t), r.status || 500, s);
}
const _getRequestParams = (r, e, t, s) => {
  const n = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return r === "GET" ? n : (n.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e == null ? void 0 : e.headers), n.body = JSON.stringify(s), Object.assign(Object.assign({}, n), t));
};
async function _request(r, e, t, s) {
  var n;
  const i = Object.assign({}, s == null ? void 0 : s.headers);
  i[API_VERSION_HEADER_NAME] || (i[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name), s != null && s.jwt && (i.Authorization = `Bearer ${s.jwt}`);
  const o = (n = s == null ? void 0 : s.query) !== null && n !== void 0 ? n : {};
  s != null && s.redirectTo && (o.redirect_to = s.redirectTo);
  const l = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : "", c = await _handleRequest(r, e, t + l, {
    headers: i,
    noResolveJson: s == null ? void 0 : s.noResolveJson
  }, {}, s == null ? void 0 : s.body);
  return s != null && s.xform ? s == null ? void 0 : s.xform(c) : { data: Object.assign({}, c), error: null };
}
async function _handleRequest(r, e, t, s, n, i) {
  const o = _getRequestParams(e, s, n, i);
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
  const { action_link: e, email_otp: t, hashed_token: s, redirect_to: n, verification_type: i } = r, o = __rest(r, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), l = {
    action_link: e,
    email_otp: t,
    hashed_token: s,
    redirect_to: n,
    verification_type: i
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
const SIGN_OUT_SCOPES = ["global", "local", "others"];
class GoTrueAdminApi {
  constructor({ url: e = "", headers: t = {}, fetch: s }) {
    this.url = e, this.headers = t, this.fetch = resolveFetch(s), this.mfa = {
      listFactors: this._listFactors.bind(this),
      deleteFactor: this._deleteFactor.bind(this)
    }, this.oauth = {
      listClients: this._listOAuthClients.bind(this),
      createClient: this._createOAuthClient.bind(this),
      getClient: this._getOAuthClient.bind(this),
      deleteClient: this._deleteOAuthClient.bind(this),
      regenerateClientSecret: this._regenerateOAuthClientSecret.bind(this)
    };
  }
  /**
   * Removes a logged-in session.
   * @param jwt A valid, logged-in JWT.
   * @param scope The logout sope.
   */
  async signOut(e, t = SIGN_OUT_SCOPES[0]) {
    if (SIGN_OUT_SCOPES.indexOf(t) < 0)
      throw new Error(`@supabase/auth-js: Parameter scope must be one of ${SIGN_OUT_SCOPES.join(", ")}`);
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
      const { options: t } = e, s = __rest(e, ["options"]), n = Object.assign(Object.assign({}, s), t);
      return "newEmail" in s && (n.new_email = s == null ? void 0 : s.newEmail, delete n.newEmail), await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body: n,
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
    var t, s, n, i, o, l, c;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 }, d = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (s = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && s !== void 0 ? s : "",
          per_page: (i = (n = e == null ? void 0 : e.perPage) === null || n === void 0 ? void 0 : n.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: _noResolveJsonResponse
      });
      if (d.error)
        throw d.error;
      const f = await d.json(), p = (o = d.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, g = (c = (l = d.headers.get("link")) === null || l === void 0 ? void 0 : l.split(",")) !== null && c !== void 0 ? c : [];
      return g.length > 0 && (g.forEach((h) => {
        const _ = parseInt(h.split(";")[0].split("=")[1].substring(0, 1)), m = JSON.parse(h.split(";")[1].split("=")[1]);
        u[`${m}Page`] = _;
      }), u.total = parseInt(p)), { data: Object.assign(Object.assign({}, f), u), error: null };
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
    validateUUID(e);
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
    validateUUID(e);
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
    validateUUID(e);
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
    validateUUID(e.userId);
    try {
      const { data: t, error: s } = await _request(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
        headers: this.headers,
        xform: (n) => ({ data: { factors: n }, error: null })
      });
      return { data: t, error: s };
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _deleteFactor(e) {
    validateUUID(e.userId), validateUUID(e.id);
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
  /**
   * Lists all OAuth clients with optional pagination.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _listOAuthClients(e) {
    var t, s, n, i, o, l, c;
    try {
      const u = { nextPage: null, lastPage: 0, total: 0 }, d = await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (s = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && s !== void 0 ? s : "",
          per_page: (i = (n = e == null ? void 0 : e.perPage) === null || n === void 0 ? void 0 : n.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: _noResolveJsonResponse
      });
      if (d.error)
        throw d.error;
      const f = await d.json(), p = (o = d.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, g = (c = (l = d.headers.get("link")) === null || l === void 0 ? void 0 : l.split(",")) !== null && c !== void 0 ? c : [];
      return g.length > 0 && (g.forEach((h) => {
        const _ = parseInt(h.split(";")[0].split("=")[1].substring(0, 1)), m = JSON.parse(h.split(";")[1].split("=")[1]);
        u[`${m}Page`] = _;
      }), u.total = parseInt(p)), { data: Object.assign(Object.assign({}, f), u), error: null };
    } catch (u) {
      if (isAuthError(u))
        return { data: { clients: [] }, error: u };
      throw u;
    }
  }
  /**
   * Creates a new OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _createOAuthClient(e) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients`, {
        body: e,
        headers: this.headers,
        xform: (t) => ({ data: t, error: null })
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Gets details of a specific OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _getOAuthClient(e) {
    try {
      return await _request(this.fetch, "GET", `${this.url}/admin/oauth/clients/${e}`, {
        headers: this.headers,
        xform: (t) => ({ data: t, error: null })
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Deletes an OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _deleteOAuthClient(e) {
    try {
      return await _request(this.fetch, "DELETE", `${this.url}/admin/oauth/clients/${e}`, {
        headers: this.headers,
        xform: (t) => ({ data: t, error: null })
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  /**
   * Regenerates the secret for an OAuth client.
   * Only relevant when the OAuth 2.1 server is enabled in Supabase Auth.
   *
   * This function should only be called on a server. Never expose your `service_role` key in the browser.
   */
  async _regenerateOAuthClientSecret(e) {
    try {
      return await _request(this.fetch, "POST", `${this.url}/admin/oauth/clients/${e}/regenerate_secret`, {
        headers: this.headers,
        xform: (t) => ({ data: t, error: null })
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
}
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
  }, async (n) => {
    if (n) {
      internals.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", r, n.name);
      try {
        return await t();
      } finally {
        internals.debug && console.log("@supabase/gotrue-js: navigatorLock: released", r, n.name);
      }
    } else {
      if (e === 0)
        throw internals.debug && console.log("@supabase/gotrue-js: navigatorLock: not immediately available", r), new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${r}" immediately failed`);
      if (internals.debug)
        try {
          const i = await globalThis.navigator.locks.query();
          console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(i, null, "  "));
        } catch (i) {
          console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", i);
        }
      return console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request"), await t();
    }
  }));
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
function getAddress(r) {
  if (!/^0x[a-fA-F0-9]{40}$/.test(r))
    throw new Error(`@supabase/auth-js: Address "${r}" is invalid.`);
  return r.toLowerCase();
}
function fromHex(r) {
  return parseInt(r, 16);
}
function toHex(r) {
  const e = new TextEncoder().encode(r);
  return "0x" + Array.from(e, (s) => s.toString(16).padStart(2, "0")).join("");
}
function createSiweMessage(r) {
  var e;
  const { chainId: t, domain: s, expirationTime: n, issuedAt: i = /* @__PURE__ */ new Date(), nonce: o, notBefore: l, requestId: c, resources: u, scheme: d, uri: f, version: p } = r;
  {
    if (!Number.isInteger(t))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "chainId". Chain ID must be a EIP-155 chain ID. Provided value: ${t}`);
    if (!s)
      throw new Error('@supabase/auth-js: Invalid SIWE message field "domain". Domain must be provided.');
    if (o && o.length < 8)
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "nonce". Nonce must be at least 8 characters. Provided value: ${o}`);
    if (!f)
      throw new Error('@supabase/auth-js: Invalid SIWE message field "uri". URI must be provided.');
    if (p !== "1")
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "version". Version must be '1'. Provided value: ${p}`);
    if (!((e = r.statement) === null || e === void 0) && e.includes(`
`))
      throw new Error(`@supabase/auth-js: Invalid SIWE message field "statement". Statement must not include '\\n'. Provided value: ${r.statement}`);
  }
  const g = getAddress(r.address), h = d ? `${d}://${s}` : s, _ = r.statement ? `${r.statement}
` : "", m = `${h} wants you to sign in with your Ethereum account:
${g}

${_}`;
  let y = `URI: ${f}
Version: ${p}
Chain ID: ${t}${o ? `
Nonce: ${o}` : ""}
Issued At: ${i.toISOString()}`;
  if (n && (y += `
Expiration Time: ${n.toISOString()}`), l && (y += `
Not Before: ${l.toISOString()}`), c && (y += `
Request ID: ${c}`), u) {
    let w = `
Resources:`;
    for (const v of u) {
      if (!v || typeof v != "string")
        throw new Error(`@supabase/auth-js: Invalid SIWE message field "resources". Every resource must be a valid string. Provided value: ${v}`);
      w += `
- ${v}`;
    }
    y += w;
  }
  return `${m}
${y}`;
}
class WebAuthnError extends Error {
  constructor({ message: e, code: t, cause: s, name: n }) {
    var i;
    super(e, { cause: s }), this.__isWebAuthnError = !0, this.name = (i = n ?? (s instanceof Error ? s.name : void 0)) !== null && i !== void 0 ? i : "Unknown Error", this.code = t;
  }
}
class WebAuthnUnknownError extends WebAuthnError {
  constructor(e, t) {
    super({
      code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
      cause: t,
      message: e
    }), this.name = "WebAuthnUnknownError", this.originalError = t;
  }
}
function identifyRegistrationError({ error: r, options: e }) {
  var t, s, n;
  const { publicKey: i } = e;
  if (!i)
    throw Error("options was missing required publicKey property");
  if (r.name === "AbortError") {
    if (e.signal instanceof AbortSignal)
      return new WebAuthnError({
        message: "Registration ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: r
      });
  } else if (r.name === "ConstraintError") {
    if (((t = i.authenticatorSelection) === null || t === void 0 ? void 0 : t.requireResidentKey) === !0)
      return new WebAuthnError({
        message: "Discoverable credentials were required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_DISCOVERABLE_CREDENTIAL_SUPPORT",
        cause: r
      });
    if (
      // @ts-ignore: `mediation` doesn't yet exist on CredentialCreationOptions but it's possible as of Sept 2024
      e.mediation === "conditional" && ((s = i.authenticatorSelection) === null || s === void 0 ? void 0 : s.userVerification) === "required"
    )
      return new WebAuthnError({
        message: "User verification was required during automatic registration but it could not be performed",
        code: "ERROR_AUTO_REGISTER_USER_VERIFICATION_FAILURE",
        cause: r
      });
    if (((n = i.authenticatorSelection) === null || n === void 0 ? void 0 : n.userVerification) === "required")
      return new WebAuthnError({
        message: "User verification was required but no available authenticator supported it",
        code: "ERROR_AUTHENTICATOR_MISSING_USER_VERIFICATION_SUPPORT",
        cause: r
      });
  } else {
    if (r.name === "InvalidStateError")
      return new WebAuthnError({
        message: "The authenticator was previously registered",
        code: "ERROR_AUTHENTICATOR_PREVIOUSLY_REGISTERED",
        cause: r
      });
    if (r.name === "NotAllowedError")
      return new WebAuthnError({
        message: r.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: r
      });
    if (r.name === "NotSupportedError")
      return i.pubKeyCredParams.filter((l) => l.type === "public-key").length === 0 ? new WebAuthnError({
        message: 'No entry in pubKeyCredParams was of type "public-key"',
        code: "ERROR_MALFORMED_PUBKEYCREDPARAMS",
        cause: r
      }) : new WebAuthnError({
        message: "No available authenticator supported any of the specified pubKeyCredParams algorithms",
        code: "ERROR_AUTHENTICATOR_NO_SUPPORTED_PUBKEYCREDPARAMS_ALG",
        cause: r
      });
    if (r.name === "SecurityError") {
      const o = window.location.hostname;
      if (isValidDomain(o)) {
        if (i.rp.id !== o)
          return new WebAuthnError({
            message: `The RP ID "${i.rp.id}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: r
          });
      } else return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: r
      });
    } else if (r.name === "TypeError") {
      if (i.user.id.byteLength < 1 || i.user.id.byteLength > 64)
        return new WebAuthnError({
          message: "User ID was not between 1 and 64 characters",
          code: "ERROR_INVALID_USER_ID_LENGTH",
          cause: r
        });
    } else if (r.name === "UnknownError")
      return new WebAuthnError({
        message: "The authenticator was unable to process the specified options, or could not create a new credential",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: r
      });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: r
  });
}
function identifyAuthenticationError({ error: r, options: e }) {
  const { publicKey: t } = e;
  if (!t)
    throw Error("options was missing required publicKey property");
  if (r.name === "AbortError") {
    if (e.signal instanceof AbortSignal)
      return new WebAuthnError({
        message: "Authentication ceremony was sent an abort signal",
        code: "ERROR_CEREMONY_ABORTED",
        cause: r
      });
  } else {
    if (r.name === "NotAllowedError")
      return new WebAuthnError({
        message: r.message,
        code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
        cause: r
      });
    if (r.name === "SecurityError") {
      const s = window.location.hostname;
      if (isValidDomain(s)) {
        if (t.rpId !== s)
          return new WebAuthnError({
            message: `The RP ID "${t.rpId}" is invalid for this domain`,
            code: "ERROR_INVALID_RP_ID",
            cause: r
          });
      } else return new WebAuthnError({
        message: `${window.location.hostname} is an invalid domain`,
        code: "ERROR_INVALID_DOMAIN",
        cause: r
      });
    } else if (r.name === "UnknownError")
      return new WebAuthnError({
        message: "The authenticator was unable to process the specified options, or could not create a new assertion signature",
        code: "ERROR_AUTHENTICATOR_GENERAL_ERROR",
        cause: r
      });
  }
  return new WebAuthnError({
    message: "a Non-Webauthn related error has occurred",
    code: "ERROR_PASSTHROUGH_SEE_CAUSE_PROPERTY",
    cause: r
  });
}
class WebAuthnAbortService {
  /**
   * Create an abort signal for a new WebAuthn operation.
   * Automatically cancels any existing operation.
   *
   * @returns {AbortSignal} Signal to pass to navigator.credentials.create() or .get()
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal MDN - AbortSignal}
   */
  createNewAbortSignal() {
    if (this.controller) {
      const t = new Error("Cancelling existing WebAuthn API call for new one");
      t.name = "AbortError", this.controller.abort(t);
    }
    const e = new AbortController();
    return this.controller = e, e.signal;
  }
  /**
   * Manually cancel the current WebAuthn operation.
   * Useful for cleaning up when user cancels or navigates away.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortController/abort MDN - AbortController.abort}
   */
  cancelCeremony() {
    if (this.controller) {
      const e = new Error("Manually cancelling existing WebAuthn API call");
      e.name = "AbortError", this.controller.abort(e), this.controller = void 0;
    }
  }
}
const webAuthnAbortService = new WebAuthnAbortService();
function deserializeCredentialCreationOptions(r) {
  if (!r)
    throw new Error("Credential creation options are required");
  if (typeof PublicKeyCredential < "u" && "parseCreationOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseCreationOptionsFromJSON == "function")
    return PublicKeyCredential.parseCreationOptionsFromJSON(
      /** we assert the options here as typescript still doesn't know about future webauthn types */
      r
    );
  const { challenge: e, user: t, excludeCredentials: s } = r, n = __rest(
    r,
    ["challenge", "user", "excludeCredentials"]
  ), i = base64UrlToUint8Array(e).buffer, o = Object.assign(Object.assign({}, t), { id: base64UrlToUint8Array(t.id).buffer }), l = Object.assign(Object.assign({}, n), {
    challenge: i,
    user: o
  });
  if (s && s.length > 0) {
    l.excludeCredentials = new Array(s.length);
    for (let c = 0; c < s.length; c++) {
      const u = s[c];
      l.excludeCredentials[c] = Object.assign(Object.assign({}, u), {
        id: base64UrlToUint8Array(u.id).buffer,
        type: u.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: u.transports
      });
    }
  }
  return l;
}
function deserializeCredentialRequestOptions(r) {
  if (!r)
    throw new Error("Credential request options are required");
  if (typeof PublicKeyCredential < "u" && "parseRequestOptionsFromJSON" in PublicKeyCredential && typeof PublicKeyCredential.parseRequestOptionsFromJSON == "function")
    return PublicKeyCredential.parseRequestOptionsFromJSON(r);
  const { challenge: e, allowCredentials: t } = r, s = __rest(
    r,
    ["challenge", "allowCredentials"]
  ), n = base64UrlToUint8Array(e).buffer, i = Object.assign(Object.assign({}, s), { challenge: n });
  if (t && t.length > 0) {
    i.allowCredentials = new Array(t.length);
    for (let o = 0; o < t.length; o++) {
      const l = t[o];
      i.allowCredentials[o] = Object.assign(Object.assign({}, l), {
        id: base64UrlToUint8Array(l.id).buffer,
        type: l.type || "public-key",
        // Cast transports to handle future transport types like "cable"
        transports: l.transports
      });
    }
  }
  return i;
}
function serializeCredentialCreationResponse(r) {
  var e;
  if ("toJSON" in r && typeof r.toJSON == "function")
    return r.toJSON();
  const t = r;
  return {
    id: r.id,
    rawId: r.id,
    response: {
      attestationObject: bytesToBase64URL(new Uint8Array(r.response.attestationObject)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(r.response.clientDataJSON))
    },
    type: "public-key",
    clientExtensionResults: r.getClientExtensionResults(),
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (e = t.authenticatorAttachment) !== null && e !== void 0 ? e : void 0
  };
}
function serializeCredentialRequestResponse(r) {
  var e;
  if ("toJSON" in r && typeof r.toJSON == "function")
    return r.toJSON();
  const t = r, s = r.getClientExtensionResults(), n = r.response;
  return {
    id: r.id,
    rawId: r.id,
    // W3C spec expects rawId to match id for JSON format
    response: {
      authenticatorData: bytesToBase64URL(new Uint8Array(n.authenticatorData)),
      clientDataJSON: bytesToBase64URL(new Uint8Array(n.clientDataJSON)),
      signature: bytesToBase64URL(new Uint8Array(n.signature)),
      userHandle: n.userHandle ? bytesToBase64URL(new Uint8Array(n.userHandle)) : void 0
    },
    type: "public-key",
    clientExtensionResults: s,
    // Convert null to undefined and cast to AuthenticatorAttachment type
    authenticatorAttachment: (e = t.authenticatorAttachment) !== null && e !== void 0 ? e : void 0
  };
}
function isValidDomain(r) {
  return (
    // Consider localhost valid as well since it's okay wrt Secure Contexts
    r === "localhost" || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(r)
  );
}
function browserSupportsWebAuthn() {
  var r, e;
  return !!(isBrowser() && "PublicKeyCredential" in window && window.PublicKeyCredential && "credentials" in navigator && typeof ((r = navigator == null ? void 0 : navigator.credentials) === null || r === void 0 ? void 0 : r.create) == "function" && typeof ((e = navigator == null ? void 0 : navigator.credentials) === null || e === void 0 ? void 0 : e.get) == "function");
}
async function createCredential(r) {
  try {
    const e = await navigator.credentials.create(
      /** we assert the type here until typescript types are updated */
      r
    );
    return e ? e instanceof PublicKeyCredential ? { data: e, error: null } : {
      data: null,
      error: new WebAuthnUnknownError("Browser returned unexpected credential type", e)
    } : {
      data: null,
      error: new WebAuthnUnknownError("Empty credential response", e)
    };
  } catch (e) {
    return {
      data: null,
      error: identifyRegistrationError({
        error: e,
        options: r
      })
    };
  }
}
async function getCredential(r) {
  try {
    const e = await navigator.credentials.get(
      /** we assert the type here until typescript types are updated */
      r
    );
    return e ? e instanceof PublicKeyCredential ? { data: e, error: null } : {
      data: null,
      error: new WebAuthnUnknownError("Browser returned unexpected credential type", e)
    } : {
      data: null,
      error: new WebAuthnUnknownError("Empty credential response", e)
    };
  } catch (e) {
    return {
      data: null,
      error: identifyAuthenticationError({
        error: e,
        options: r
      })
    };
  }
}
const DEFAULT_CREATION_OPTIONS = {
  hints: ["security-key"],
  authenticatorSelection: {
    authenticatorAttachment: "cross-platform",
    requireResidentKey: !1,
    /** set to preferred because older yubikeys don't have PIN/Biometric */
    userVerification: "preferred",
    residentKey: "discouraged"
  },
  attestation: "none"
}, DEFAULT_REQUEST_OPTIONS = {
  /** set to preferred because older yubikeys don't have PIN/Biometric */
  userVerification: "preferred",
  hints: ["security-key"]
};
function deepMerge(...r) {
  const e = (n) => n !== null && typeof n == "object" && !Array.isArray(n), t = (n) => n instanceof ArrayBuffer || ArrayBuffer.isView(n), s = {};
  for (const n of r)
    if (n)
      for (const i in n) {
        const o = n[i];
        if (o !== void 0)
          if (Array.isArray(o))
            s[i] = o;
          else if (t(o))
            s[i] = o;
          else if (e(o)) {
            const l = s[i];
            e(l) ? s[i] = deepMerge(l, o) : s[i] = deepMerge(o);
          } else
            s[i] = o;
      }
  return s;
}
function mergeCredentialCreationOptions(r, e) {
  return deepMerge(DEFAULT_CREATION_OPTIONS, r, e || {});
}
function mergeCredentialRequestOptions(r, e) {
  return deepMerge(DEFAULT_REQUEST_OPTIONS, r, e || {});
}
class WebAuthnApi {
  constructor(e) {
    this.client = e, this.enroll = this._enroll.bind(this), this.challenge = this._challenge.bind(this), this.verify = this._verify.bind(this), this.authenticate = this._authenticate.bind(this), this.register = this._register.bind(this);
  }
  /**
   * Enroll a new WebAuthn factor.
   * Creates an unverified WebAuthn factor that must be verified with a credential.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Omit<MFAEnrollWebauthnParams, 'factorType'>} params - Enrollment parameters (friendlyName required)
   * @returns {Promise<AuthMFAEnrollWebauthnResponse>} Enrolled factor details or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registering a New Credential}
   */
  async _enroll(e) {
    return this.client.mfa.enroll(Object.assign(Object.assign({}, e), { factorType: "webauthn" }));
  }
  /**
   * Challenge for WebAuthn credential creation or authentication.
   * Combines server challenge with browser credential operations.
   * Handles both registration (create) and authentication (request) flows.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {MFAChallengeWebauthnParams & { friendlyName?: string; signal?: AbortSignal }} params - Challenge parameters including factorId
   * @param {Object} overrides - Allows you to override the parameters passed to navigator.credentials
   * @param {PublicKeyCredentialCreationOptionsFuture} overrides.create - Override options for credential creation
   * @param {PublicKeyCredentialRequestOptionsFuture} overrides.request - Override options for credential request
   * @returns {Promise<RequestResult>} Challenge response with credential or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-credential-creation W3C WebAuthn Spec - Credential Creation}
   * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying Assertion}
   */
  async _challenge({ factorId: e, webauthn: t, friendlyName: s, signal: n }, i) {
    try {
      const { data: o, error: l } = await this.client.mfa.challenge({
        factorId: e,
        webauthn: t
      });
      if (!o)
        return { data: null, error: l };
      const c = n ?? webAuthnAbortService.createNewAbortSignal();
      if (o.webauthn.type === "create") {
        const { user: u } = o.webauthn.credential_options.publicKey;
        u.name || (u.name = `${u.id}:${s}`), u.displayName || (u.displayName = u.name);
      }
      switch (o.webauthn.type) {
        case "create": {
          const u = mergeCredentialCreationOptions(o.webauthn.credential_options.publicKey, i == null ? void 0 : i.create), { data: d, error: f } = await createCredential({
            publicKey: u,
            signal: c
          });
          return d ? {
            data: {
              factorId: e,
              challengeId: o.id,
              webauthn: {
                type: o.webauthn.type,
                credential_response: d
              }
            },
            error: null
          } : { data: null, error: f };
        }
        case "request": {
          const u = mergeCredentialRequestOptions(o.webauthn.credential_options.publicKey, i == null ? void 0 : i.request), { data: d, error: f } = await getCredential(Object.assign(Object.assign({}, o.webauthn.credential_options), { publicKey: u, signal: c }));
          return d ? {
            data: {
              factorId: e,
              challengeId: o.id,
              webauthn: {
                type: o.webauthn.type,
                credential_response: d
              }
            },
            error: null
          } : { data: null, error: f };
        }
      }
    } catch (o) {
      return isAuthError(o) ? { data: null, error: o } : {
        data: null,
        error: new AuthUnknownError("Unexpected error in challenge", o)
      };
    }
  }
  /**
   * Verify a WebAuthn credential with the server.
   * Completes the WebAuthn ceremony by sending the credential to the server for verification.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Verification parameters
   * @param {string} params.challengeId - ID of the challenge being verified
   * @param {string} params.factorId - ID of the WebAuthn factor
   * @param {MFAVerifyWebauthnParams<T>['webauthn']} params.webauthn - WebAuthn credential response
   * @returns {Promise<AuthMFAVerifyResponse>} Verification result with session or error
   * @see {@link https://w3c.github.io/webauthn/#sctn-verifying-assertion W3C WebAuthn Spec - Verifying an Authentication Assertion}
   * */
  async _verify({ challengeId: e, factorId: t, webauthn: s }) {
    return this.client.mfa.verify({
      factorId: t,
      challengeId: e,
      webauthn: s
    });
  }
  /**
   * Complete WebAuthn authentication flow.
   * Performs challenge and verification in a single operation for existing credentials.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Authentication parameters
   * @param {string} params.factorId - ID of the WebAuthn factor to authenticate with
   * @param {Object} params.webauthn - WebAuthn configuration
   * @param {string} params.webauthn.rpId - Relying Party ID (defaults to current hostname)
   * @param {string[]} params.webauthn.rpOrigins - Allowed origins (defaults to current origin)
   * @param {AbortSignal} params.webauthn.signal - Optional abort signal
   * @param {PublicKeyCredentialRequestOptionsFuture} overrides - Override options for navigator.credentials.get
   * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Authentication result
   * @see {@link https://w3c.github.io/webauthn/#sctn-authentication W3C WebAuthn Spec - Authentication Ceremony}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialRequestOptions MDN - PublicKeyCredentialRequestOptions}
   */
  async _authenticate({ factorId: e, webauthn: { rpId: t = typeof window < "u" ? window.location.hostname : void 0, rpOrigins: s = typeof window < "u" ? [window.location.origin] : void 0, signal: n } }, i) {
    if (!t)
      return {
        data: null,
        error: new AuthError("rpId is required for WebAuthn authentication")
      };
    try {
      if (!browserSupportsWebAuthn())
        return {
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        };
      const { data: o, error: l } = await this.challenge({
        factorId: e,
        webauthn: { rpId: t, rpOrigins: s },
        signal: n
      }, { request: i });
      if (!o)
        return { data: null, error: l };
      const { webauthn: c } = o;
      return this._verify({
        factorId: e,
        challengeId: o.challengeId,
        webauthn: {
          type: c.type,
          rpId: t,
          rpOrigins: s,
          credential_response: c.credential_response
        }
      });
    } catch (o) {
      return isAuthError(o) ? { data: null, error: o } : {
        data: null,
        error: new AuthUnknownError("Unexpected error in authenticate", o)
      };
    }
  }
  /**
   * Complete WebAuthn registration flow.
   * Performs enrollment, challenge, and verification in a single operation for new credentials.
   *
   * @experimental This method is experimental and may change in future releases
   * @param {Object} params - Registration parameters
   * @param {string} params.friendlyName - User-friendly name for the credential
   * @param {string} params.rpId - Relying Party ID (defaults to current hostname)
   * @param {string[]} params.rpOrigins - Allowed origins (defaults to current origin)
   * @param {AbortSignal} params.signal - Optional abort signal
   * @param {PublicKeyCredentialCreationOptionsFuture} overrides - Override options for navigator.credentials.create
   * @returns {Promise<RequestResult<AuthMFAVerifyResponseData, WebAuthnError | AuthError>>} Registration result
   * @see {@link https://w3c.github.io/webauthn/#sctn-registering-a-new-credential W3C WebAuthn Spec - Registration Ceremony}
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/PublicKeyCredentialCreationOptions MDN - PublicKeyCredentialCreationOptions}
   */
  async _register({ friendlyName: e, rpId: t = typeof window < "u" ? window.location.hostname : void 0, rpOrigins: s = typeof window < "u" ? [window.location.origin] : void 0, signal: n }, i) {
    if (!t)
      return {
        data: null,
        error: new AuthError("rpId is required for WebAuthn registration")
      };
    try {
      if (!browserSupportsWebAuthn())
        return {
          data: null,
          error: new AuthUnknownError("Browser does not support WebAuthn", null)
        };
      const { data: o, error: l } = await this._enroll({
        friendlyName: e
      });
      if (!o)
        return await this.client.mfa.listFactors().then((d) => {
          var f;
          return (f = d.data) === null || f === void 0 ? void 0 : f.all.find((p) => p.factor_type === "webauthn" && p.friendly_name === e && p.status !== "unverified");
        }).then((d) => d ? this.client.mfa.unenroll({ factorId: d == null ? void 0 : d.id }) : void 0), { data: null, error: l };
      const { data: c, error: u } = await this._challenge({
        factorId: o.id,
        friendlyName: o.friendly_name,
        webauthn: { rpId: t, rpOrigins: s },
        signal: n
      }, {
        create: i
      });
      return c ? this._verify({
        factorId: o.id,
        challengeId: c.challengeId,
        webauthn: {
          rpId: t,
          rpOrigins: s,
          type: c.webauthn.type,
          credential_response: c.webauthn.credential_response
        }
      }) : { data: null, error: u };
    } catch (o) {
      return isAuthError(o) ? { data: null, error: o } : {
        data: null,
        error: new AuthUnknownError("Unexpected error in register", o)
      };
    }
  }
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
const GLOBAL_JWKS = {};
class GoTrueClient {
  /**
   * The JWKS used for verifying asymmetric JWTs
   */
  get jwks() {
    var e, t;
    return (t = (e = GLOBAL_JWKS[this.storageKey]) === null || e === void 0 ? void 0 : e.jwks) !== null && t !== void 0 ? t : { keys: [] };
  }
  set jwks(e) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { jwks: e });
  }
  get jwks_cached_at() {
    var e, t;
    return (t = (e = GLOBAL_JWKS[this.storageKey]) === null || e === void 0 ? void 0 : e.cachedAt) !== null && t !== void 0 ? t : Number.MIN_SAFE_INTEGER;
  }
  set jwks_cached_at(e) {
    GLOBAL_JWKS[this.storageKey] = Object.assign(Object.assign({}, GLOBAL_JWKS[this.storageKey]), { cachedAt: e });
  }
  /**
   * Create a new client for use in the browser.
   */
  constructor(e) {
    var t, s;
    this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = GoTrueClient.nextInstanceID, GoTrueClient.nextInstanceID += 1, this.instanceID > 0 && isBrowser() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const n = Object.assign(Object.assign({}, DEFAULT_OPTIONS), e);
    if (this.logDebugMessages = !!n.debug, typeof n.debug == "function" && (this.logger = n.debug), this.persistSession = n.persistSession, this.storageKey = n.storageKey, this.autoRefreshToken = n.autoRefreshToken, this.admin = new GoTrueAdminApi({
      url: n.url,
      headers: n.headers,
      fetch: n.fetch
    }), this.url = n.url, this.headers = n.headers, this.fetch = resolveFetch(n.fetch), this.lock = n.lock || lockNoOp, this.detectSessionInUrl = n.detectSessionInUrl, this.flowType = n.flowType, this.hasCustomAuthorizationHeader = n.hasCustomAuthorizationHeader, n.lock ? this.lock = n.lock : isBrowser() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = navigatorLock : this.lock = lockNoOp, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this),
      webauthn: new WebAuthnApi(this)
    }, this.persistSession ? (n.storage ? this.storage = n.storage : supportsLocalStorage() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)), n.userStorage && (this.userStorage = n.userStorage)) : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)), isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (i) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", i);
      }
      (s = this.broadcastChannel) === null || s === void 0 || s.addEventListener("message", async (i) => {
        this._debug("received broadcast notification from other tab or client", i), await this._notifyAllSubscribers(i.data.event, i.data.session, !1);
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
        const { data: n, error: i } = await this._getSessionFromURL(t, s);
        if (i) {
          if (this._debug("#_initialize()", "error detecting session from URL", i), isAuthImplicitGrantRedirectError(i)) {
            const c = (e = i.details) === null || e === void 0 ? void 0 : e.code;
            if (c === "identity_already_exists" || c === "identity_not_found" || c === "single_identity_not_deletable")
              return { error: i };
          }
          return await this._removeSession(), { error: i };
        }
        const { session: o, redirectType: l } = n;
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
    var t, s, n;
    try {
      const i = await _request(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (s = (t = e == null ? void 0 : e.options) === null || t === void 0 ? void 0 : t.data) !== null && s !== void 0 ? s : {},
          gotrue_meta_security: { captcha_token: (n = e == null ? void 0 : e.options) === null || n === void 0 ? void 0 : n.captchaToken }
        },
        xform: _sessionResponse
      }), { data: o, error: l } = i;
      if (l || !o)
        return { data: { user: null, session: null }, error: l };
      const c = o.session, u = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: u, session: c }, error: null };
    } catch (i) {
      if (isAuthError(i))
        return { data: { user: null, session: null }, error: i };
      throw i;
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
    var t, s, n;
    try {
      let i;
      if ("email" in e) {
        const { email: d, password: f, options: p } = e;
        let g = null, h = null;
        this.flowType === "pkce" && ([g, h] = await getCodeChallengeAndMethod(this.storage, this.storageKey)), i = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: p == null ? void 0 : p.emailRedirectTo,
          body: {
            email: d,
            password: f,
            data: (t = p == null ? void 0 : p.data) !== null && t !== void 0 ? t : {},
            gotrue_meta_security: { captcha_token: p == null ? void 0 : p.captchaToken },
            code_challenge: g,
            code_challenge_method: h
          },
          xform: _sessionResponse
        });
      } else if ("phone" in e) {
        const { phone: d, password: f, options: p } = e;
        i = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: d,
            password: f,
            data: (s = p == null ? void 0 : p.data) !== null && s !== void 0 ? s : {},
            channel: (n = p == null ? void 0 : p.channel) !== null && n !== void 0 ? n : "sms",
            gotrue_meta_security: { captcha_token: p == null ? void 0 : p.captchaToken }
          },
          xform: _sessionResponse
        });
      } else
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      const { data: o, error: l } = i;
      if (l || !o)
        return { data: { user: null, session: null }, error: l };
      const c = o.session, u = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: u, session: c }, error: null };
    } catch (i) {
      if (isAuthError(i))
        return { data: { user: null, session: null }, error: i };
      throw i;
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
        const { email: i, password: o, options: l } = e;
        t = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            email: i,
            password: o,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else if ("phone" in e) {
        const { phone: i, password: o, options: l } = e;
        t = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
          headers: this.headers,
          body: {
            phone: i,
            password: o,
            gotrue_meta_security: { captcha_token: l == null ? void 0 : l.captchaToken }
          },
          xform: _sessionResponsePassword
        });
      } else
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      const { data: s, error: n } = t;
      return n ? { data: { user: null, session: null }, error: n } : !s || !s.session || !s.user ? { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() } : (s.session && (await this._saveSession(s.session), await this._notifyAllSubscribers("SIGNED_IN", s.session)), {
        data: Object.assign({ user: s.user, session: s.session }, s.weak_password ? { weakPassword: s.weak_password } : null),
        error: n
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
    var t, s, n, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (s = e.options) === null || s === void 0 ? void 0 : s.scopes,
      queryParams: (n = e.options) === null || n === void 0 ? void 0 : n.queryParams,
      skipBrowserRedirect: (i = e.options) === null || i === void 0 ? void 0 : i.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(e) {
    return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e));
  }
  /**
   * Signs in a user by verifying a message signed by the user's private key.
   * Supports Ethereum (via Sign-In-With-Ethereum) & Solana (Sign-In-With-Solana) standards,
   * both of which derive from the EIP-4361 standard
   * With slight variation on Solana's side.
   * @reference https://eips.ethereum.org/EIPS/eip-4361
   */
  async signInWithWeb3(e) {
    const { chain: t } = e;
    switch (t) {
      case "ethereum":
        return await this.signInWithEthereum(e);
      case "solana":
        return await this.signInWithSolana(e);
      default:
        throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`);
    }
  }
  async signInWithEthereum(e) {
    var t, s, n, i, o, l, c, u, d, f, p;
    let g, h;
    if ("message" in e)
      g = e.message, h = e.signature;
    else {
      const { chain: _, wallet: m, statement: y, options: w } = e;
      let v;
      if (isBrowser())
        if (typeof m == "object")
          v = m;
        else {
          const P = window;
          if ("ethereum" in P && typeof P.ethereum == "object" && "request" in P.ethereum && typeof P.ethereum.request == "function")
            v = P.ethereum;
          else
            throw new Error("@supabase/auth-js: No compatible Ethereum wallet interface on the window object (window.ethereum) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'ethereum', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof m != "object" || !(w != null && w.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        v = m;
      }
      const b = new URL((t = w == null ? void 0 : w.url) !== null && t !== void 0 ? t : window.location.href), S = await v.request({
        method: "eth_requestAccounts"
      }).then((P) => P).catch(() => {
        throw new Error("@supabase/auth-js: Wallet method eth_requestAccounts is missing or invalid");
      });
      if (!S || S.length === 0)
        throw new Error("@supabase/auth-js: No accounts available. Please ensure the wallet is connected.");
      const E = getAddress(S[0]);
      let A = (s = w == null ? void 0 : w.signInWithEthereum) === null || s === void 0 ? void 0 : s.chainId;
      if (!A) {
        const P = await v.request({
          method: "eth_chainId"
        });
        A = fromHex(P);
      }
      const I = {
        domain: b.host,
        address: E,
        statement: y,
        uri: b.href,
        version: "1",
        chainId: A,
        nonce: (n = w == null ? void 0 : w.signInWithEthereum) === null || n === void 0 ? void 0 : n.nonce,
        issuedAt: (o = (i = w == null ? void 0 : w.signInWithEthereum) === null || i === void 0 ? void 0 : i.issuedAt) !== null && o !== void 0 ? o : /* @__PURE__ */ new Date(),
        expirationTime: (l = w == null ? void 0 : w.signInWithEthereum) === null || l === void 0 ? void 0 : l.expirationTime,
        notBefore: (c = w == null ? void 0 : w.signInWithEthereum) === null || c === void 0 ? void 0 : c.notBefore,
        requestId: (u = w == null ? void 0 : w.signInWithEthereum) === null || u === void 0 ? void 0 : u.requestId,
        resources: (d = w == null ? void 0 : w.signInWithEthereum) === null || d === void 0 ? void 0 : d.resources
      };
      g = createSiweMessage(I), h = await v.request({
        method: "personal_sign",
        params: [toHex(g), E]
      });
    }
    try {
      const { data: _, error: m } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({
          chain: "ethereum",
          message: g,
          signature: h
        }, !((f = e.options) === null || f === void 0) && f.captchaToken ? { gotrue_meta_security: { captcha_token: (p = e.options) === null || p === void 0 ? void 0 : p.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (m)
        throw m;
      return !_ || !_.session || !_.user ? {
        data: { user: null, session: null },
        error: new AuthInvalidTokenResponseError()
      } : (_.session && (await this._saveSession(_.session), await this._notifyAllSubscribers("SIGNED_IN", _.session)), { data: Object.assign({}, _), error: m });
    } catch (_) {
      if (isAuthError(_))
        return { data: { user: null, session: null }, error: _ };
      throw _;
    }
  }
  async signInWithSolana(e) {
    var t, s, n, i, o, l, c, u, d, f, p, g;
    let h, _;
    if ("message" in e)
      h = e.message, _ = e.signature;
    else {
      const { chain: m, wallet: y, statement: w, options: v } = e;
      let b;
      if (isBrowser())
        if (typeof y == "object")
          b = y;
        else {
          const E = window;
          if ("solana" in E && typeof E.solana == "object" && ("signIn" in E.solana && typeof E.solana.signIn == "function" || "signMessage" in E.solana && typeof E.solana.signMessage == "function"))
            b = E.solana;
          else
            throw new Error("@supabase/auth-js: No compatible Solana wallet interface on the window object (window.solana) detected. Make sure the user already has a wallet installed and connected for this app. Prefer passing the wallet interface object directly to signInWithWeb3({ chain: 'solana', wallet: resolvedUserWallet }) instead.");
        }
      else {
        if (typeof y != "object" || !(v != null && v.url))
          throw new Error("@supabase/auth-js: Both wallet and url must be specified in non-browser environments.");
        b = y;
      }
      const S = new URL((t = v == null ? void 0 : v.url) !== null && t !== void 0 ? t : window.location.href);
      if ("signIn" in b && b.signIn) {
        const E = await b.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, v == null ? void 0 : v.signInWithSolana), {
          // non-overridable properties
          version: "1",
          domain: S.host,
          uri: S.href
        }), w ? { statement: w } : null));
        let A;
        if (Array.isArray(E) && E[0] && typeof E[0] == "object")
          A = E[0];
        else if (E && typeof E == "object" && "signedMessage" in E && "signature" in E)
          A = E;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        if ("signedMessage" in A && "signature" in A && (typeof A.signedMessage == "string" || A.signedMessage instanceof Uint8Array) && A.signature instanceof Uint8Array)
          h = typeof A.signedMessage == "string" ? A.signedMessage : new TextDecoder().decode(A.signedMessage), _ = A.signature;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
      } else {
        if (!("signMessage" in b) || typeof b.signMessage != "function" || !("publicKey" in b) || typeof b != "object" || !b.publicKey || !("toBase58" in b.publicKey) || typeof b.publicKey.toBase58 != "function")
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        h = [
          `${S.host} wants you to sign in with your Solana account:`,
          b.publicKey.toBase58(),
          ...w ? ["", w, ""] : [""],
          "Version: 1",
          `URI: ${S.href}`,
          `Issued At: ${(n = (s = v == null ? void 0 : v.signInWithSolana) === null || s === void 0 ? void 0 : s.issuedAt) !== null && n !== void 0 ? n : (/* @__PURE__ */ new Date()).toISOString()}`,
          ...!((i = v == null ? void 0 : v.signInWithSolana) === null || i === void 0) && i.notBefore ? [`Not Before: ${v.signInWithSolana.notBefore}`] : [],
          ...!((o = v == null ? void 0 : v.signInWithSolana) === null || o === void 0) && o.expirationTime ? [`Expiration Time: ${v.signInWithSolana.expirationTime}`] : [],
          ...!((l = v == null ? void 0 : v.signInWithSolana) === null || l === void 0) && l.chainId ? [`Chain ID: ${v.signInWithSolana.chainId}`] : [],
          ...!((c = v == null ? void 0 : v.signInWithSolana) === null || c === void 0) && c.nonce ? [`Nonce: ${v.signInWithSolana.nonce}`] : [],
          ...!((u = v == null ? void 0 : v.signInWithSolana) === null || u === void 0) && u.requestId ? [`Request ID: ${v.signInWithSolana.requestId}`] : [],
          ...!((f = (d = v == null ? void 0 : v.signInWithSolana) === null || d === void 0 ? void 0 : d.resources) === null || f === void 0) && f.length ? [
            "Resources",
            ...v.signInWithSolana.resources.map((A) => `- ${A}`)
          ] : []
        ].join(`
`);
        const E = await b.signMessage(new TextEncoder().encode(h), "utf8");
        if (!E || !(E instanceof Uint8Array))
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        _ = E;
      }
    }
    try {
      const { data: m, error: y } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message: h, signature: bytesToBase64URL(_) }, !((p = e.options) === null || p === void 0) && p.captchaToken ? { gotrue_meta_security: { captcha_token: (g = e.options) === null || g === void 0 ? void 0 : g.captchaToken } } : null),
        xform: _sessionResponse
      });
      if (y)
        throw y;
      return !m || !m.session || !m.user ? {
        data: { user: null, session: null },
        error: new AuthInvalidTokenResponseError()
      } : (m.session && (await this._saveSession(m.session), await this._notifyAllSubscribers("SIGNED_IN", m.session)), { data: Object.assign({}, m), error: y });
    } catch (m) {
      if (isAuthError(m))
        return { data: { user: null, session: null }, error: m };
      throw m;
    }
  }
  async _exchangeCodeForSession(e) {
    const t = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`), [s, n] = (t ?? "").split("/");
    try {
      const { data: i, error: o } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: e,
          code_verifier: s
        },
        xform: _sessionResponse
      });
      if (await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`), o)
        throw o;
      return !i || !i.session || !i.user ? {
        data: { user: null, session: null, redirectType: null },
        error: new AuthInvalidTokenResponseError()
      } : (i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), { data: Object.assign(Object.assign({}, i), { redirectType: n ?? null }), error: o });
    } catch (i) {
      if (isAuthError(i))
        return { data: { user: null, session: null, redirectType: null }, error: i };
      throw i;
    }
  }
  /**
   * Allows signing in with an OIDC ID token. The authentication provider used
   * should be enabled and configured.
   */
  async signInWithIdToken(e) {
    try {
      const { options: t, provider: s, token: n, access_token: i, nonce: o } = e, l = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider: s,
          id_token: n,
          access_token: i,
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
    var t, s, n, i, o;
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
            data: (n = c == null ? void 0 : c.data) !== null && n !== void 0 ? n : {},
            create_user: (i = c == null ? void 0 : c.shouldCreateUser) !== null && i !== void 0 ? i : !0,
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
      let n, i;
      "options" in e && (n = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo, i = (s = e.options) === null || s === void 0 ? void 0 : s.captchaToken);
      const { data: o, error: l } = await _request(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: i } }),
        redirectTo: n,
        xform: _sessionResponse
      });
      if (l)
        throw l;
      if (!o)
        throw new Error("An error occurred on token verification.");
      const c = o.session, u = o.user;
      return c != null && c.access_token && (await this._saveSession(c), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", c)), { data: { user: u, session: c }, error: null };
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null, session: null }, error: n };
      throw n;
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
    var t, s, n;
    try {
      let i = null, o = null;
      return this.flowType === "pkce" && ([i, o] = await getCodeChallengeAndMethod(this.storage, this.storageKey)), await _request(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), { redirect_to: (s = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && s !== void 0 ? s : void 0 }), !((n = e == null ? void 0 : e.options) === null || n === void 0) && n.captchaToken ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: i, code_challenge_method: o }),
        headers: this.headers,
        xform: _ssoResponse
      });
    } catch (i) {
      if (isAuthError(i))
        return { data: null, error: i };
      throw i;
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
        const { error: n } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: t.access_token
        });
        return { data: { user: null, session: null }, error: n };
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
        const { email: s, type: n, options: i } = e, { error: o } = await _request(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            email: s,
            type: n,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          },
          redirectTo: i == null ? void 0 : i.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: o };
      } else if ("phone" in e) {
        const { phone: s, type: n, options: i } = e, { data: o, error: l } = await _request(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            phone: s,
            type: n,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
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
        const s = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), n = (async () => (await s, await t()))();
        return this.pendingInLock.push((async () => {
          try {
            await n;
          } catch {
          }
        })()), n;
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
            const n = [...this.pendingInLock];
            await Promise.all(n), this.pendingInLock.splice(0, n.length);
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
        if (this.userStorage) {
          const o = await getItemAsync(this.userStorage, this.storageKey + "-user");
          o != null && o.user ? e.user = o.user : e.user = userNotAvailableProxy();
        }
        if (this.storage.isServer && e.user) {
          let o = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (c, u, d) => (!o && u === "user" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), o = !0, this.suppressGetSessionWarning = !0), Reflect.get(c, u, d))
          });
        }
        return { data: { session: e }, error: null };
      }
      const { data: n, error: i } = await this._callRefreshToken(e.refresh_token);
      return i ? { data: { session: null }, error: i } : { data: { session: n }, error: null };
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
        var s, n, i;
        const { data: o, error: l } = t;
        if (l)
          throw l;
        return !(!((s = o.session) === null || s === void 0) && s.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new AuthSessionMissingError() } : await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (i = (n = o.session) === null || n === void 0 ? void 0 : n.access_token) !== null && i !== void 0 ? i : void 0,
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
        const { data: n, error: i } = s;
        if (i)
          throw i;
        if (!n.session)
          throw new AuthSessionMissingError();
        const o = n.session;
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
      let s = t, n = !0, i = null;
      const { payload: o } = decodeJWT(e.access_token);
      if (o.exp && (s = o.exp, n = s <= t), n) {
        const { data: l, error: c } = await this._callRefreshToken(e.refresh_token);
        if (c)
          return { data: { user: null, session: null }, error: c };
        if (!l)
          return { data: { user: null, session: null }, error: null };
        i = l;
      } else {
        const { data: l, error: c } = await this._getUser(e.access_token);
        if (c)
          throw c;
        i = {
          access_token: e.access_token,
          refresh_token: e.refresh_token,
          user: l.user,
          token_type: "bearer",
          expires_in: s - t,
          expires_at: s
        }, await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i);
      }
      return { data: { user: i.user, session: i }, error: null };
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
        const { data: n, error: i } = await this._callRefreshToken(e.refresh_token);
        return i ? { data: { user: null, session: null }, error: i } : n ? { data: { user: n.user, session: n }, error: null } : { data: { user: null, session: null }, error: null };
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
        const { data: w, error: v } = await this._exchangeCodeForSession(e.code);
        if (v)
          throw v;
        const b = new URL(window.location.href);
        return b.searchParams.delete("code"), window.history.replaceState(window.history.state, "", b.toString()), { data: { session: w.session, redirectType: null }, error: null };
      }
      const { provider_token: s, provider_refresh_token: n, access_token: i, refresh_token: o, expires_in: l, expires_at: c, token_type: u } = e;
      if (!i || !l || !o || !u)
        throw new AuthImplicitGrantRedirectError("No session defined in URL");
      const d = Math.round(Date.now() / 1e3), f = parseInt(l);
      let p = d + f;
      c && (p = parseInt(c));
      const g = p - d;
      g * 1e3 <= AUTO_REFRESH_TICK_DURATION_MS && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${g}s, should have been closer to ${f}s`);
      const h = p - f;
      d - h >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", h, p, d) : d - h < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", h, p, d);
      const { data: _, error: m } = await this._getUser(i);
      if (m)
        throw m;
      const y = {
        provider_token: s,
        provider_refresh_token: n,
        access_token: i,
        expires_in: f,
        expires_at: p,
        refresh_token: o,
        token_type: u,
        user: _.user
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
      const { data: n, error: i } = t;
      if (i)
        return { error: i };
      const o = (s = n.session) === null || s === void 0 ? void 0 : s.access_token;
      if (o) {
        const { error: l } = await this.admin.signOut(o, e);
        if (l && !(isAuthApiError(l) && (l.status === 404 || l.status === 401 || l.status === 403)))
          return { error: l };
      }
      return e !== "others" && (await this._removeSession(), await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`)), { error: null };
    });
  }
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
      var s, n;
      try {
        const { data: { session: i }, error: o } = t;
        if (o)
          throw o;
        await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", i)), this._debug("INITIAL_SESSION", "callback id", e, "session", i);
      } catch (i) {
        await ((n = this.stateChangeEmitters.get(e)) === null || n === void 0 ? void 0 : n.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", i), console.error(i);
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
    let s = null, n = null;
    this.flowType === "pkce" && ([s, n] = await getCodeChallengeAndMethod(
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
          code_challenge_method: n,
          gotrue_meta_security: { captcha_token: t.captchaToken }
        },
        headers: this.headers,
        redirectTo: t.redirectTo
      });
    } catch (i) {
      if (isAuthError(i))
        return { data: null, error: i };
      throw i;
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
  async linkIdentity(e) {
    return "token" in e ? this.linkIdentityIdToken(e) : this.linkIdentityOAuth(e);
  }
  async linkIdentityOAuth(e) {
    var t;
    try {
      const { data: s, error: n } = await this._useSession(async (i) => {
        var o, l, c, u, d;
        const { data: f, error: p } = i;
        if (p)
          throw p;
        const g = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
          redirectTo: (o = e.options) === null || o === void 0 ? void 0 : o.redirectTo,
          scopes: (l = e.options) === null || l === void 0 ? void 0 : l.scopes,
          queryParams: (c = e.options) === null || c === void 0 ? void 0 : c.queryParams,
          skipBrowserRedirect: !0
        });
        return await _request(this.fetch, "GET", g, {
          headers: this.headers,
          jwt: (d = (u = f.session) === null || u === void 0 ? void 0 : u.access_token) !== null && d !== void 0 ? d : void 0
        });
      });
      if (n)
        throw n;
      return isBrowser() && !(!((t = e.options) === null || t === void 0) && t.skipBrowserRedirect) && window.location.assign(s == null ? void 0 : s.url), { data: { provider: e.provider, url: s == null ? void 0 : s.url }, error: null };
    } catch (s) {
      if (isAuthError(s))
        return { data: { provider: e.provider, url: null }, error: s };
      throw s;
    }
  }
  async linkIdentityIdToken(e) {
    return await this._useSession(async (t) => {
      var s;
      try {
        const { error: n, data: { session: i } } = t;
        if (n)
          throw n;
        const { options: o, provider: l, token: c, access_token: u, nonce: d } = e, f = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
          headers: this.headers,
          jwt: (s = i == null ? void 0 : i.access_token) !== null && s !== void 0 ? s : void 0,
          body: {
            provider: l,
            id_token: c,
            access_token: u,
            nonce: d,
            link_identity: !0,
            gotrue_meta_security: { captcha_token: o == null ? void 0 : o.captchaToken }
          },
          xform: _sessionResponse
        }), { data: p, error: g } = f;
        return g ? { data: { user: null, session: null }, error: g } : !p || !p.session || !p.user ? {
          data: { user: null, session: null },
          error: new AuthInvalidTokenResponseError()
        } : (p.session && (await this._saveSession(p.session), await this._notifyAllSubscribers("USER_UPDATED", p.session)), { data: p, error: g });
      } catch (n) {
        if (isAuthError(n))
          return { data: { user: null, session: null }, error: n };
        throw n;
      }
    });
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var s, n;
        const { data: i, error: o } = t;
        if (o)
          throw o;
        return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
          headers: this.headers,
          jwt: (n = (s = i.session) === null || s === void 0 ? void 0 : s.access_token) !== null && n !== void 0 ? n : void 0
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
      return await retryable(async (n) => (n > 0 && await sleep(200 * Math.pow(2, n - 1)), this._debug(t, "refreshing attempt", n), await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
        body: { refresh_token: e },
        headers: this.headers,
        xform: _sessionResponse
      })), (n, i) => {
        const o = 200 * Math.pow(2, n);
        return i && isAuthRetryableFetchError(i) && // retryable only if the request can be sent before the backoff overflows the tick duration
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
    var e, t;
    const s = "#_recoverAndRefresh()";
    this._debug(s, "begin");
    try {
      const n = await getItemAsync(this.storage, this.storageKey);
      if (n && this.userStorage) {
        let o = await getItemAsync(this.userStorage, this.storageKey + "-user");
        !this.storage.isServer && Object.is(this.storage, this.userStorage) && !o && (o = { user: n.user }, await setItemAsync(this.userStorage, this.storageKey + "-user", o)), n.user = (e = o == null ? void 0 : o.user) !== null && e !== void 0 ? e : userNotAvailableProxy();
      } else if (n && !n.user && !n.user) {
        const o = await getItemAsync(this.storage, this.storageKey + "-user");
        o && (o != null && o.user) ? (n.user = o.user, await removeItemAsync(this.storage, this.storageKey + "-user"), await setItemAsync(this.storage, this.storageKey, n)) : n.user = userNotAvailableProxy();
      }
      if (this._debug(s, "session from storage", n), !this._isValidSession(n)) {
        this._debug(s, "session is not valid"), n !== null && await this._removeSession();
        return;
      }
      const i = ((t = n.expires_at) !== null && t !== void 0 ? t : 1 / 0) * 1e3 - Date.now() < EXPIRY_MARGIN_MS;
      if (this._debug(s, `session has${i ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`), i) {
        if (this.autoRefreshToken && n.refresh_token) {
          const { error: o } = await this._callRefreshToken(n.refresh_token);
          o && (console.error(o), isAuthRetryableFetchError(o) || (this._debug(s, "refresh failed with a non-retryable error, removing the session", o), await this._removeSession()));
        }
      } else if (n.user && n.user.__isUserNotAvailableProxy === !0)
        try {
          const { data: o, error: l } = await this._getUser(n.access_token);
          !l && (o != null && o.user) ? (n.user = o.user, await this._saveSession(n), await this._notifyAllSubscribers("SIGNED_IN", n)) : this._debug(s, "could not get user data, skipping SIGNED_IN notification");
        } catch (o) {
          console.error("Error getting user data:", o), this._debug(s, "error getting user data, skipping SIGNED_IN notification", o);
        }
      else
        await this._notifyAllSubscribers("SIGNED_IN", n);
    } catch (n) {
      this._debug(s, "error", n), console.error(n);
      return;
    } finally {
      this._debug(s, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, s;
    if (!e)
      throw new AuthSessionMissingError();
    if (this.refreshingDeferred)
      return this.refreshingDeferred.promise;
    const n = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(n, "begin");
    try {
      this.refreshingDeferred = new Deferred();
      const { data: i, error: o } = await this._refreshAccessToken(e);
      if (o)
        throw o;
      if (!i.session)
        throw new AuthSessionMissingError();
      await this._saveSession(i.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", i.session);
      const l = { data: i.session, error: null };
      return this.refreshingDeferred.resolve(l), l;
    } catch (i) {
      if (this._debug(n, "error", i), isAuthError(i)) {
        const o = { data: null, error: i };
        return isAuthRetryableFetchError(i) || await this._removeSession(), (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(o), o;
      }
      throw (s = this.refreshingDeferred) === null || s === void 0 || s.reject(i), i;
    } finally {
      this.refreshingDeferred = null, this._debug(n, "end");
    }
  }
  async _notifyAllSubscribers(e, t, s = !0) {
    const n = `#_notifyAllSubscribers(${e})`;
    this._debug(n, "begin", t, `broadcast = ${s}`);
    try {
      this.broadcastChannel && s && this.broadcastChannel.postMessage({ event: e, session: t });
      const i = [], o = Array.from(this.stateChangeEmitters.values()).map(async (l) => {
        try {
          await l.callback(e, t);
        } catch (c) {
          i.push(c);
        }
      });
      if (await Promise.all(o), i.length > 0) {
        for (let l = 0; l < i.length; l += 1)
          console.error(i[l]);
        throw i[0];
      }
    } finally {
      this._debug(n, "end");
    }
  }
  /**
   * set currentSession and currentUser
   * process to _startAutoRefreshToken if possible
   */
  async _saveSession(e) {
    this._debug("#_saveSession()", e), this.suppressGetSessionWarning = !0;
    const t = Object.assign({}, e), s = t.user && t.user.__isUserNotAvailableProxy === !0;
    if (this.userStorage) {
      !s && t.user && await setItemAsync(this.userStorage, this.storageKey + "-user", {
        user: t.user
      });
      const n = Object.assign({}, t);
      delete n.user;
      const i = deepClone(n);
      await setItemAsync(this.storage, this.storageKey, i);
    } else {
      const n = deepClone(t);
      await setItemAsync(this.storage, this.storageKey, n);
    }
  }
  async _removeSession() {
    this._debug("#_removeSession()"), await removeItemAsync(this.storage, this.storageKey), await removeItemAsync(this.storage, this.storageKey + "-code-verifier"), await removeItemAsync(this.storage, this.storageKey + "-user"), this.userStorage && await removeItemAsync(this.userStorage, this.storageKey + "-user"), await this._notifyAllSubscribers("SIGNED_OUT", null);
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
              const n = Math.floor((s.expires_at * 1e3 - e) / AUTO_REFRESH_TICK_DURATION_MS);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${n} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION_MS}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`), n <= AUTO_REFRESH_TICK_THRESHOLD && await this._callRefreshToken(s.refresh_token);
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
    const n = [`provider=${encodeURIComponent(t)}`];
    if (s != null && s.redirectTo && n.push(`redirect_to=${encodeURIComponent(s.redirectTo)}`), s != null && s.scopes && n.push(`scopes=${encodeURIComponent(s.scopes)}`), this.flowType === "pkce") {
      const [i, o] = await getCodeChallengeAndMethod(this.storage, this.storageKey), l = new URLSearchParams({
        code_challenge: `${encodeURIComponent(i)}`,
        code_challenge_method: `${encodeURIComponent(o)}`
      });
      n.push(l.toString());
    }
    if (s != null && s.queryParams) {
      const i = new URLSearchParams(s.queryParams);
      n.push(i.toString());
    }
    return s != null && s.skipBrowserRedirect && n.push(`skip_http_redirect=${s.skipBrowserRedirect}`), `${e}?${n.join("&")}`;
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var s;
        const { data: n, error: i } = t;
        return i ? { data: null, error: i } : await _request(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
          headers: this.headers,
          jwt: (s = n == null ? void 0 : n.session) === null || s === void 0 ? void 0 : s.access_token
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
        var s, n;
        const { data: i, error: o } = t;
        if (o)
          return { data: null, error: o };
        const l = Object.assign({ friendly_name: e.friendlyName, factor_type: e.factorType }, e.factorType === "phone" ? { phone: e.phone } : e.factorType === "totp" ? { issuer: e.issuer } : {}), { data: c, error: u } = await _request(this.fetch, "POST", `${this.url}/factors`, {
          body: l,
          headers: this.headers,
          jwt: (s = i == null ? void 0 : i.session) === null || s === void 0 ? void 0 : s.access_token
        });
        return u ? { data: null, error: u } : (e.factorType === "totp" && c.type === "totp" && (!((n = c == null ? void 0 : c.totp) === null || n === void 0) && n.qr_code) && (c.totp.qr_code = `data:image/svg+xml;utf-8,${c.totp.qr_code}`), { data: c, error: null });
      });
    } catch (t) {
      if (isAuthError(t))
        return { data: null, error: t };
      throw t;
    }
  }
  async _verify(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var s;
          const { data: n, error: i } = t;
          if (i)
            return { data: null, error: i };
          const o = Object.assign({ challenge_id: e.challengeId }, "webauthn" in e ? {
            webauthn: Object.assign(Object.assign({}, e.webauthn), { credential_response: e.webauthn.type === "create" ? serializeCredentialCreationResponse(e.webauthn.credential_response) : serializeCredentialRequestResponse(e.webauthn.credential_response) })
          } : { code: e.code }), { data: l, error: c } = await _request(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
            body: o,
            headers: this.headers,
            jwt: (s = n == null ? void 0 : n.session) === null || s === void 0 ? void 0 : s.access_token
          });
          return c ? { data: null, error: c } : (await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + l.expires_in }, l)), await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", l), { data: l, error: c });
        });
      } catch (t) {
        if (isAuthError(t))
          return { data: null, error: t };
        throw t;
      }
    });
  }
  async _challenge(e) {
    return this._acquireLock(-1, async () => {
      try {
        return await this._useSession(async (t) => {
          var s;
          const { data: n, error: i } = t;
          if (i)
            return { data: null, error: i };
          const o = await _request(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
            body: e,
            headers: this.headers,
            jwt: (s = n == null ? void 0 : n.session) === null || s === void 0 ? void 0 : s.access_token
          });
          if (o.error)
            return o;
          const { data: l } = o;
          if (l.type !== "webauthn")
            return { data: l, error: null };
          switch (l.webauthn.type) {
            case "create":
              return {
                data: Object.assign(Object.assign({}, l), { webauthn: Object.assign(Object.assign({}, l.webauthn), { credential_options: Object.assign(Object.assign({}, l.webauthn.credential_options), { publicKey: deserializeCredentialCreationOptions(l.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
            case "request":
              return {
                data: Object.assign(Object.assign({}, l), { webauthn: Object.assign(Object.assign({}, l.webauthn), { credential_options: Object.assign(Object.assign({}, l.webauthn.credential_options), { publicKey: deserializeCredentialRequestOptions(l.webauthn.credential_options.publicKey) }) }) }),
                error: null
              };
          }
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
    var e;
    const { data: { user: t }, error: s } = await this.getUser();
    if (s)
      return { data: null, error: s };
    const n = {
      all: [],
      phone: [],
      totp: [],
      webauthn: []
    };
    for (const i of (e = t == null ? void 0 : t.factors) !== null && e !== void 0 ? e : [])
      n.all.push(i), i.status === "verified" && n[i.factor_type].push(i);
    return {
      data: n,
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(-1, async () => await this._useSession(async (e) => {
      var t, s;
      const { data: { session: n }, error: i } = e;
      if (i)
        return { data: null, error: i };
      if (!n)
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null
        };
      const { payload: o } = decodeJWT(n.access_token);
      let l = null;
      o.aal && (l = o.aal);
      let c = l;
      ((s = (t = n.user.factors) === null || t === void 0 ? void 0 : t.filter((f) => f.status === "verified")) !== null && s !== void 0 ? s : []).length > 0 && (c = "aal2");
      const d = o.amr || [];
      return { data: { currentLevel: l, nextLevel: c, currentAuthenticationMethods: d }, error: null };
    }));
  }
  async fetchJwk(e, t = { keys: [] }) {
    let s = t.keys.find((l) => l.kid === e);
    if (s)
      return s;
    const n = Date.now();
    if (s = this.jwks.keys.find((l) => l.kid === e), s && this.jwks_cached_at + JWKS_TTL > n)
      return s;
    const { data: i, error: o } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (o)
      throw o;
    return !i.keys || i.keys.length === 0 || (this.jwks = i, this.jwks_cached_at = n, s = i.keys.find((l) => l.kid === e), !s) ? null : s;
  }
  /**
   * Extracts the JWT claims present in the access token by first verifying the
   * JWT against the server's JSON Web Key Set endpoint
   * `/.well-known/jwks.json` which is often cached, resulting in significantly
   * faster responses. Prefer this method over {@link #getUser} which always
   * sends a request to the Auth server for each JWT.
   *
   * If the project is not using an asymmetric JWT signing key (like ECC or
   * RSA) it always sends a request to the Auth server (similar to {@link
   * #getUser}) to verify the JWT.
   *
   * @param jwt An optional specific JWT you wish to verify, not the one you
   *            can obtain from {@link #getSession}.
   * @param options Various additional options that allow you to customize the
   *                behavior of this method.
   */
  async getClaims(e, t = {}) {
    try {
      let s = e;
      if (!s) {
        const { data: g, error: h } = await this.getSession();
        if (h || !g.session)
          return { data: null, error: h };
        s = g.session.access_token;
      }
      const { header: n, payload: i, signature: o, raw: { header: l, payload: c } } = decodeJWT(s);
      t != null && t.allowExpired || validateExp(i.exp);
      const u = !n.alg || n.alg.startsWith("HS") || !n.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(n.kid, t != null && t.keys ? { keys: t.keys } : t == null ? void 0 : t.jwks);
      if (!u) {
        const { error: g } = await this.getUser(s);
        if (g)
          throw g;
        return {
          data: {
            claims: i,
            header: n,
            signature: o
          },
          error: null
        };
      }
      const d = getAlgorithm(n.alg), f = await crypto.subtle.importKey("jwk", u, d, !0, [
        "verify"
      ]);
      if (!await crypto.subtle.verify(d, f, o, stringToUint8Array(`${l}.${c}`)))
        throw new AuthInvalidJwtError("Invalid JWT signature");
      return {
        data: {
          claims: i,
          header: n,
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
   * @param options.storage Options passed along to the storage-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(e, t, s) {
    var n, i, o;
    this.supabaseUrl = e, this.supabaseKey = t;
    const l = validateSupabaseUrl(e);
    if (!t)
      throw new Error("supabaseKey is required.");
    this.realtimeUrl = new URL("realtime/v1", l), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", l), this.storageUrl = new URL("storage/v1", l), this.functionsUrl = new URL("functions/v1", l);
    const c = `sb-${l.hostname.split(".")[0]}-auth-token`, u = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: c }),
      global: DEFAULT_GLOBAL_OPTIONS
    }, d = applySettingDefaults(s ?? {}, u);
    this.storageKey = (n = d.auth.storageKey) !== null && n !== void 0 ? n : "", this.headers = (i = d.global.headers) !== null && i !== void 0 ? i : {}, d.accessToken ? (this.accessToken = d.accessToken, this.auth = new Proxy({}, {
      get: (f, p) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(p)} is not possible`);
      }
    })) : this.auth = this._initSupabaseAuthClient((o = d.auth) !== null && o !== void 0 ? o : {}, this.headers, d.global.fetch), this.fetch = fetchWithAuth(t, this._getAccessToken.bind(this), d.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, d.realtime)), this.rest = new PostgrestClient(new URL("rest/v1", l).href, {
      headers: this.headers,
      schema: d.db.schema,
      fetch: this.fetch
    }), this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, s == null ? void 0 : s.storage), d.accessToken || this._listenForAuthEvents();
  }
  /**
   * Supabase Functions allows you to deploy and invoke edge functions.
   */
  get functions() {
    return new FunctionsClient(this.functionsUrl.href, {
      headers: this.headers,
      customFetch: this.fetch
    });
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
  rpc(e, t = {}, s = {
    head: !1,
    get: !1,
    count: void 0
  }) {
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
  async _getAccessToken() {
    var e, t;
    if (this.accessToken)
      return await this.accessToken();
    const { data: s } = await this.auth.getSession();
    return (t = (e = s.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : this.supabaseKey;
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: s, storage: n, userStorage: i, storageKey: o, flowType: l, lock: c, debug: u }, d, f) {
    const p = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl.href,
      headers: Object.assign(Object.assign({}, p), d),
      storageKey: o,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: s,
      storage: n,
      userStorage: i,
      flowType: l,
      lock: c,
      debug: u,
      fetch: f,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: Object.keys(this.headers).some((g) => g.toLowerCase() === "authorization")
    });
  }
  _initRealtimeClient(e) {
    return new RealtimeClient(this.realtimeUrl.href, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((t, s) => {
      this._handleTokenChanged(t, "CLIENT", s == null ? void 0 : s.access_token);
    });
  }
  _handleTokenChanged(e, t, s) {
    (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== s ? (this.changedAccessToken = s, this.realtime.setAuth(s)) : e === "SIGNED_OUT" && (this.realtime.setAuth(), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0);
  }
}
const createClient = (r, e, t) => new SupabaseClient(r, e, t);
function shouldShowDeprecationWarning() {
  if (typeof window < "u" || typeof process > "u")
    return !1;
  const r = process.version;
  if (r == null)
    return !1;
  const e = r.match(/^v(\d+)\./);
  return e ? parseInt(e[1], 10) <= 18 : !1;
}
shouldShowDeprecationWarning() && console.warn("⚠️  Node.js 18 and below are deprecated and will no longer be supported in future versions of @supabase/supabase-js. Please upgrade to Node.js 20 or later. For more information, visit: https://github.com/orgs/supabase/discussions/37217");
const supabase = createClient(
  "https://fnaeijdumseiaoabvvmc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYWVpamR1bXNlaWFvYWJ2dm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0Njc5MDgsImV4cCI6MjA1MzA0MzkwOH0.AKnUpUDBfog2rDv9_jFwTXxNb_R5c9WtK2n0jn18bG4"
);
var root$e = /* @__PURE__ */ from_html('<h6 class="caption svelte-g77f4s"><!></h6>');
const $$css$g = {
  hash: "svelte-g77f4s",
  code: ".caption.svelte-g77f4s {font-size:12px;font-family:'Monument Regular', sans-serif;text-transform:uppercase;letter-spacing:-0.24px;margin:12px 0;}"
};
function CaptionType(r, e) {
  append_styles(r, $$css$g);
  var t = root$e(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(CaptionType, {}, ["default"], [], !0);
var root$d = /* @__PURE__ */ from_html('<h2 class="svelte-an796w"><!></h2>');
const $$css$f = {
  hash: "svelte-an796w",
  code: `h2.svelte-an796w {font-size:18px;letter-spacing:-0.34px;text-transform:uppercase;color:#000;font-family:Monument, sans-serif;

		@media screen and (min-width: 1024px) {font-size:22px;
		}}`
};
function TitleType(r, e) {
  append_styles(r, $$css$f);
  var t = root$d(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(TitleType, {}, ["default"], [], !0);
var root$c = /* @__PURE__ */ from_html('<div class="review svelte-vmc8u8"><div class="header svelte-vmc8u8"><h6 class="svelte-vmc8u8"> </h6> <p class="date svelte-vmc8u8"> </p></div> <p class="svelte-vmc8u8"> </p></div>');
const $$css$e = {
  hash: "svelte-vmc8u8",
  code: `.review.svelte-vmc8u8 {display:flex;flex-direction:column;gap:4px;}p.svelte-vmc8u8 {font-family:Monument Regular;font-size:16px;color:rgba(0, 0, 0, 0.7019607843);letter-spacing:-0.25px;line-height:26px;margin:0;}h6.svelte-vmc8u8,
.date.svelte-vmc8u8 {font-size:12px;font-family:Monument, sans-serif;color:#000;letter-spacing:-0.18px;text-transform:uppercase;margin:0;}.date.svelte-vmc8u8 {opacity:0.6;}.header.svelte-vmc8u8 {display:flex;align-items:center;gap:8px;justify-content:space-between;}
@media screen and (min-width: 1024px) {.header.svelte-vmc8u8 {padding:24px 0;gap:12px;}
}`
};
function KnitterReviewItem(r, e) {
  push(e, !1), append_styles(r, $$css$e);
  let t = prop(e, "review", 12);
  var s = {
    get review() {
      return t();
    },
    set review(p) {
      t(p), flushSync();
    }
  };
  init();
  var n = root$c(), i = child(n), o = child(i), l = child(o, !0);
  reset(o);
  var c = sibling(o, 2), u = child(c, !0);
  reset(c), reset(i);
  var d = sibling(i, 2), f = child(d, !0);
  return reset(d), reset(n), template_effect(
    (p) => {
      set_text(l, (deep_read_state(t()), untrack(() => t().created_by))), set_text(u, p), set_text(f, (deep_read_state(t()), untrack(() => t().body)));
    },
    [
      () => (deep_read_state(t()), untrack(() => t().created_at.toLocaleDateString()))
    ]
  ), append(r, n), pop(s);
}
create_custom_element(KnitterReviewItem, { review: {} }, [], [], !0);
var root$b = /* @__PURE__ */ from_html('<section class="svelte-ca9cdp"></section>');
const $$css$d = {
  hash: "svelte-ca9cdp",
  code: "section.svelte-ca9cdp {background:rgba(0, 0, 0, 0.02);width:100%;aspect-ratio:16/9;margin:20px 0;}"
};
function KnitterReviewsListSkeleton(r) {
  append_styles(r, $$css$d);
  var e = root$b();
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
  const n = +getComputedStyle(r).opacity;
  return {
    delay: e,
    duration: t,
    easing: s,
    css: (i) => `opacity: ${i * n}`
  };
}
function fly(r, { delay: e = 0, duration: t = 400, easing: s = cubic_out, x: n = 0, y: i = 0, opacity: o = 0 } = {}) {
  const l = getComputedStyle(r), c = +l.opacity, u = l.transform === "none" ? "" : l.transform, d = c * (1 - o), [f, p] = split_css_unit(n), [g, h] = split_css_unit(i);
  return {
    delay: e,
    duration: t,
    easing: s,
    css: (_, m) => `
			transform: ${u} translate(${(1 - _) * f}${p}, ${(1 - _) * g}${h});
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
  let s, n, i;
  const o = getComputedStyle$1(r);
  return t.WebKitCSSMatrix ? (n = o.transform || o.webkitTransform, n.split(",").length > 6 && (n = n.split(", ").map((l) => l.replace(",", ".")).join(", ")), i = new t.WebKitCSSMatrix(n === "none" ? "" : n)) : (i = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), s = i.toString().split(",")), e === "x" && (t.WebKitCSSMatrix ? n = i.m41 : s.length === 16 ? n = parseFloat(s[12]) : n = parseFloat(s[4])), e === "y" && (t.WebKitCSSMatrix ? n = i.m42 : s.length === 16 ? n = parseFloat(s[13]) : n = parseFloat(s[5])), n || 0;
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
      const n = Object.keys(Object(s)).filter((i) => e.indexOf(i) < 0);
      for (let i = 0, o = n.length; i < o; i += 1) {
        const l = n[i], c = Object.getOwnPropertyDescriptor(s, l);
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
  const n = getWindow(), i = -e.translate;
  let o = null, l;
  const c = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", n.cancelAnimationFrame(e.cssModeFrameID);
  const u = t > i ? "next" : "prev", d = (p, g) => u === "next" && p >= g || u === "prev" && p <= g, f = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), o === null && (o = l);
    const p = Math.max(Math.min((l - o) / c, 1), 0), g = 0.5 - Math.cos(p * Math.PI) / 2;
    let h = i + g * (t - i);
    if (d(h, t) && (h = t), e.wrapperEl.scrollTo({
      [s]: h
    }), d(h, t)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [s]: h
        });
      }), n.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = n.requestAnimationFrame(f);
  };
  f();
}
function elementChildren(r, e) {
  e === void 0 && (e = "");
  const t = getWindow(), s = [...r.children];
  return t.HTMLSlotElement && r instanceof HTMLSlotElement && s.push(...r.assignedElements()), e ? s.filter((n) => n.matches(e)) : s;
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
function elementOffset(r) {
  const e = getWindow(), t = getDocument(), s = r.getBoundingClientRect(), n = t.body, i = r.clientTop || n.clientTop || 0, o = r.clientLeft || n.clientLeft || 0, l = r === e ? e.scrollY : r.scrollTop, c = r === e ? e.scrollX : r.scrollLeft;
  return {
    top: s.top + l - i,
    left: s.left + c - o
  };
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
function makeElementsArray(r) {
  return (Array.isArray(r) ? r : [r]).filter((e) => !!e);
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
  const t = getSupport(), s = getWindow(), n = s.navigator.platform, i = e || s.navigator.userAgent, o = {
    ios: !1,
    android: !1
  }, l = s.screen.width, c = s.screen.height, u = i.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = i.match(/(iPad).*OS\s([\d_]+)/);
  const f = i.match(/(iPod)(.*OS\s([\d_]+))?/), p = !d && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/), g = n === "Win32";
  let h = n === "MacIntel";
  const _ = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !d && h && t.touch && _.indexOf(`${l}x${c}`) >= 0 && (d = i.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), h = !1), u && !g && (o.os = "android", o.android = !0), (d || p || f) && (o.os = "ios", o.ios = !0), o;
}
function getDevice(r) {
  return r === void 0 && (r = {}), deviceCached || (deviceCached = calcDevice(r)), deviceCached;
}
let browser;
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
  const n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(r.navigator.userAgent), i = s(), o = i || n && e.ios;
  return {
    isSafari: t || i,
    needPerspectiveFix: t,
    need3dFix: o,
    isWebView: n
  };
}
function getBrowser() {
  return browser || (browser = calcBrowser()), browser;
}
function Resize(r) {
  let {
    swiper: e,
    on: t,
    emit: s
  } = r;
  const n = getWindow();
  let i = null, o = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (s("beforeResize"), s("resize"));
  }, c = () => {
    !e || e.destroyed || !e.initialized || (i = new ResizeObserver((f) => {
      o = n.requestAnimationFrame(() => {
        const {
          width: p,
          height: g
        } = e;
        let h = p, _ = g;
        f.forEach((m) => {
          let {
            contentBoxSize: y,
            contentRect: w,
            target: v
          } = m;
          v && v !== e.el || (h = w ? w.width : (y[0] || y).inlineSize, _ = w ? w.height : (y[0] || y).blockSize);
        }), (h !== p || _ !== g) && l();
      });
    }), i.observe(e.el));
  }, u = () => {
    o && n.cancelAnimationFrame(o), i && i.unobserve && e.el && (i.unobserve(e.el), i = null);
  }, d = () => {
    !e || e.destroyed || !e.initialized || s("orientationchange");
  };
  t("init", () => {
    if (e.params.resizeObserver && typeof n.ResizeObserver < "u") {
      c();
      return;
    }
    n.addEventListener("resize", l), n.addEventListener("orientationchange", d);
  }), t("destroy", () => {
    u(), n.removeEventListener("resize", l), n.removeEventListener("orientationchange", d);
  });
}
function Observer(r) {
  let {
    swiper: e,
    extendParams: t,
    on: s,
    emit: n
  } = r;
  const i = [], o = getWindow(), l = function(d, f) {
    f === void 0 && (f = {});
    const p = o.MutationObserver || o.WebkitMutationObserver, g = new p((h) => {
      if (e.__preventObserver__) return;
      if (h.length === 1) {
        n("observerUpdate", h[0]);
        return;
      }
      const _ = function() {
        n("observerUpdate", h[0]);
      };
      o.requestAnimationFrame ? o.requestAnimationFrame(_) : o.setTimeout(_, 0);
    });
    g.observe(d, {
      attributes: typeof f.attributes > "u" ? !0 : f.attributes,
      childList: e.isElement || (typeof f.childList > "u" ? !0 : f).childList,
      characterData: typeof f.characterData > "u" ? !0 : f.characterData
    }), i.push(g);
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
    i.forEach((d) => {
      d.disconnect();
    }), i.splice(0, i.length);
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
    const n = t ? "unshift" : "push";
    return r.split(" ").forEach((i) => {
      s.eventsListeners[i] || (s.eventsListeners[i] = []), s.eventsListeners[i][n](e);
    }), s;
  },
  once(r, e, t) {
    const s = this;
    if (!s.eventsListeners || s.destroyed || typeof e != "function") return s;
    function n() {
      s.off(r, n), n.__emitterProxy && delete n.__emitterProxy;
      for (var i = arguments.length, o = new Array(i), l = 0; l < i; l++)
        o[l] = arguments[l];
      e.apply(s, o);
    }
    return n.__emitterProxy = e, s.on(r, n, t);
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
      typeof e > "u" ? t.eventsListeners[s] = [] : t.eventsListeners[s] && t.eventsListeners[s].forEach((n, i) => {
        (n === e || n.__emitterProxy && n.__emitterProxy === e) && t.eventsListeners[s].splice(i, 1);
      });
    }), t;
  },
  emit() {
    const r = this;
    if (!r.eventsListeners || r.destroyed || !r.eventsListeners) return r;
    let e, t, s;
    for (var n = arguments.length, i = new Array(n), o = 0; o < n; o++)
      i[o] = arguments[o];
    return typeof i[0] == "string" || Array.isArray(i[0]) ? (e = i[0], t = i.slice(1, i.length), s = r) : (e = i[0].events, t = i[0].data, s = i[0].context || r), t.unshift(s), (Array.isArray(e) ? e : e.split(" ")).forEach((c) => {
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
  function e(O, R) {
    return parseFloat(O.getPropertyValue(r.getDirectionLabel(R)) || 0);
  }
  const t = r.params, {
    wrapperEl: s,
    slidesEl: n,
    size: i,
    rtlTranslate: o,
    wrongRTL: l
  } = r, c = r.virtual && t.virtual.enabled, u = c ? r.virtual.slides.length : r.slides.length, d = elementChildren(n, `.${r.params.slideClass}, swiper-slide`), f = c ? r.virtual.slides.length : d.length;
  let p = [];
  const g = [], h = [];
  let _ = t.slidesOffsetBefore;
  typeof _ == "function" && (_ = t.slidesOffsetBefore.call(r));
  let m = t.slidesOffsetAfter;
  typeof m == "function" && (m = t.slidesOffsetAfter.call(r));
  const y = r.snapGrid.length, w = r.slidesGrid.length;
  let v = t.spaceBetween, b = -_, S = 0, E = 0;
  if (typeof i > "u")
    return;
  typeof v == "string" && v.indexOf("%") >= 0 ? v = parseFloat(v.replace("%", "")) / 100 * i : typeof v == "string" && (v = parseFloat(v)), r.virtualSize = -v, d.forEach((O) => {
    o ? O.style.marginLeft = "" : O.style.marginRight = "", O.style.marginBottom = "", O.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (setCSSProperty(s, "--swiper-centered-offset-before", ""), setCSSProperty(s, "--swiper-centered-offset-after", ""));
  const A = t.grid && t.grid.rows > 1 && r.grid;
  A ? r.grid.initSlides(d) : r.grid && r.grid.unsetSlides();
  let I;
  const P = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((O) => typeof t.breakpoints[O].slidesPerView < "u").length > 0;
  for (let O = 0; O < f; O += 1) {
    I = 0;
    let R;
    if (d[O] && (R = d[O]), A && r.grid.updateSlide(O, R, d), !(d[O] && elementStyle(R, "display") === "none")) {
      if (t.slidesPerView === "auto") {
        P && (d[O].style[r.getDirectionLabel("width")] = "");
        const C = getComputedStyle(R), k = R.style.transform, N = R.style.webkitTransform;
        if (k && (R.style.transform = "none"), N && (R.style.webkitTransform = "none"), t.roundLengths)
          I = r.isHorizontal() ? elementOuterSize(R, "width") : elementOuterSize(R, "height");
        else {
          const x = e(C, "width"), $ = e(C, "padding-left"), B = e(C, "padding-right"), U = e(C, "margin-left"), M = e(C, "margin-right"), j = C.getPropertyValue("box-sizing");
          if (j && j === "border-box")
            I = x + U + M;
          else {
            const {
              clientWidth: V,
              offsetWidth: X
            } = R;
            I = x + $ + B + U + M + (X - V);
          }
        }
        k && (R.style.transform = k), N && (R.style.webkitTransform = N), t.roundLengths && (I = Math.floor(I));
      } else
        I = (i - (t.slidesPerView - 1) * v) / t.slidesPerView, t.roundLengths && (I = Math.floor(I)), d[O] && (d[O].style[r.getDirectionLabel("width")] = `${I}px`);
      d[O] && (d[O].swiperSlideSize = I), h.push(I), t.centeredSlides ? (b = b + I / 2 + S / 2 + v, S === 0 && O !== 0 && (b = b - i / 2 - v), O === 0 && (b = b - i / 2 - v), Math.abs(b) < 1 / 1e3 && (b = 0), t.roundLengths && (b = Math.floor(b)), E % t.slidesPerGroup === 0 && p.push(b), g.push(b)) : (t.roundLengths && (b = Math.floor(b)), (E - Math.min(r.params.slidesPerGroupSkip, E)) % r.params.slidesPerGroup === 0 && p.push(b), g.push(b), b = b + I + v), r.virtualSize += I + v, S = I, E += 1;
    }
  }
  if (r.virtualSize = Math.max(r.virtualSize, i) + m, o && l && (t.effect === "slide" || t.effect === "coverflow") && (s.style.width = `${r.virtualSize + v}px`), t.setWrapperSize && (s.style[r.getDirectionLabel("width")] = `${r.virtualSize + v}px`), A && r.grid.updateWrapperSize(I, p), !t.centeredSlides) {
    const O = [];
    for (let R = 0; R < p.length; R += 1) {
      let C = p[R];
      t.roundLengths && (C = Math.floor(C)), p[R] <= r.virtualSize - i && O.push(C);
    }
    p = O, Math.floor(r.virtualSize - i) - Math.floor(p[p.length - 1]) > 1 && p.push(r.virtualSize - i);
  }
  if (c && t.loop) {
    const O = h[0] + v;
    if (t.slidesPerGroup > 1) {
      const R = Math.ceil((r.virtual.slidesBefore + r.virtual.slidesAfter) / t.slidesPerGroup), C = O * t.slidesPerGroup;
      for (let k = 0; k < R; k += 1)
        p.push(p[p.length - 1] + C);
    }
    for (let R = 0; R < r.virtual.slidesBefore + r.virtual.slidesAfter; R += 1)
      t.slidesPerGroup === 1 && p.push(p[p.length - 1] + O), g.push(g[g.length - 1] + O), r.virtualSize += O;
  }
  if (p.length === 0 && (p = [0]), v !== 0) {
    const O = r.isHorizontal() && o ? "marginLeft" : r.getDirectionLabel("marginRight");
    d.filter((R, C) => !t.cssMode || t.loop ? !0 : C !== d.length - 1).forEach((R) => {
      R.style[O] = `${v}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let O = 0;
    h.forEach((C) => {
      O += C + (v || 0);
    }), O -= v;
    const R = O > i ? O - i : 0;
    p = p.map((C) => C <= 0 ? -_ : C > R ? R + m : C);
  }
  if (t.centerInsufficientSlides) {
    let O = 0;
    h.forEach((C) => {
      O += C + (v || 0);
    }), O -= v;
    const R = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (O + R < i) {
      const C = (i - O - R) / 2;
      p.forEach((k, N) => {
        p[N] = k - C;
      }), g.forEach((k, N) => {
        g[N] = k + C;
      });
    }
  }
  if (Object.assign(r, {
    slides: d,
    snapGrid: p,
    slidesGrid: g,
    slidesSizesGrid: h
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    setCSSProperty(s, "--swiper-centered-offset-before", `${-p[0]}px`), setCSSProperty(s, "--swiper-centered-offset-after", `${r.size / 2 - h[h.length - 1] / 2}px`);
    const O = -r.snapGrid[0], R = -r.slidesGrid[0];
    r.snapGrid = r.snapGrid.map((C) => C + O), r.slidesGrid = r.slidesGrid.map((C) => C + R);
  }
  if (f !== u && r.emit("slidesLengthChange"), p.length !== y && (r.params.watchOverflow && r.checkOverflow(), r.emit("snapGridLengthChange")), g.length !== w && r.emit("slidesGridLengthChange"), t.watchSlidesProgress && r.updateSlidesOffset(), r.emit("slidesUpdated"), !c && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const O = `${t.containerModifierClass}backface-hidden`, R = r.el.classList.contains(O);
    f <= t.maxBackfaceHiddenSlides ? R || r.el.classList.add(O) : R && r.el.classList.remove(O);
  }
}
function updateAutoHeight(r) {
  const e = this, t = [], s = e.virtual && e.params.virtual.enabled;
  let n = 0, i;
  typeof r == "number" ? e.setTransition(r) : r === !0 && e.setTransition(e.params.speed);
  const o = (l) => s ? e.slides[e.getSlideIndexByData(l)] : e.slides[l];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((l) => {
        t.push(l);
      });
    else
      for (i = 0; i < Math.ceil(e.params.slidesPerView); i += 1) {
        const l = e.activeIndex + i;
        if (l > e.slides.length && !s) break;
        t.push(o(l));
      }
  else
    t.push(o(e.activeIndex));
  for (i = 0; i < t.length; i += 1)
    if (typeof t[i] < "u") {
      const l = t[i].offsetHeight;
      n = l > n ? l : n;
    }
  (n || n === 0) && (e.wrapperEl.style.height = `${n}px`);
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
    rtlTranslate: n,
    snapGrid: i
  } = e;
  if (s.length === 0) return;
  typeof s[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let o = -r;
  n && (o = r), e.visibleSlidesIndexes = [], e.visibleSlides = [];
  let l = t.spaceBetween;
  typeof l == "string" && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * e.size : typeof l == "string" && (l = parseFloat(l));
  for (let c = 0; c < s.length; c += 1) {
    const u = s[c];
    let d = u.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (d -= s[0].swiperSlideOffset);
    const f = (o + (t.centeredSlides ? e.minTranslate() : 0) - d) / (u.swiperSlideSize + l), p = (o - i[0] + (t.centeredSlides ? e.minTranslate() : 0) - d) / (u.swiperSlideSize + l), g = -(o - d), h = g + e.slidesSizesGrid[c], _ = g >= 0 && g <= e.size - e.slidesSizesGrid[c], m = g >= 0 && g < e.size - 1 || h > 1 && h <= e.size || g <= 0 && h >= e.size;
    m && (e.visibleSlides.push(u), e.visibleSlidesIndexes.push(c)), toggleSlideClasses$1(u, m, t.slideVisibleClass), toggleSlideClasses$1(u, _, t.slideFullyVisibleClass), u.progress = n ? -f : f, u.originalProgress = n ? -p : p;
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
    progress: n,
    isBeginning: i,
    isEnd: o,
    progressLoop: l
  } = e;
  const c = i, u = o;
  if (s === 0)
    n = 0, i = !0, o = !0;
  else {
    n = (r - e.minTranslate()) / s;
    const d = Math.abs(r - e.minTranslate()) < 1, f = Math.abs(r - e.maxTranslate()) < 1;
    i = d || n <= 0, o = f || n >= 1, d && (n = 0), f && (n = 1);
  }
  if (t.loop) {
    const d = e.getSlideIndexByData(0), f = e.getSlideIndexByData(e.slides.length - 1), p = e.slidesGrid[d], g = e.slidesGrid[f], h = e.slidesGrid[e.slidesGrid.length - 1], _ = Math.abs(r);
    _ >= p ? l = (_ - p) / h : l = (_ + h - g) / h, l > 1 && (l -= 1);
  }
  Object.assign(e, {
    progress: n,
    progressLoop: l,
    isBeginning: i,
    isEnd: o
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(r), i && !c && e.emit("reachBeginning toEdge"), o && !u && e.emit("reachEnd toEdge"), (c && !i || u && !o) && e.emit("fromEdge"), e.emit("progress", n);
}
const toggleSlideClasses = (r, e, t) => {
  e && !r.classList.contains(t) ? r.classList.add(t) : !e && r.classList.contains(t) && r.classList.remove(t);
};
function updateSlidesClasses() {
  const r = this, {
    slides: e,
    params: t,
    slidesEl: s,
    activeIndex: n
  } = r, i = r.virtual && t.virtual.enabled, o = r.grid && t.grid && t.grid.rows > 1, l = (f) => elementChildren(s, `.${t.slideClass}${f}, swiper-slide${f}`)[0];
  let c, u, d;
  if (i)
    if (t.loop) {
      let f = n - r.virtual.slidesBefore;
      f < 0 && (f = r.virtual.slides.length + f), f >= r.virtual.slides.length && (f -= r.virtual.slides.length), c = l(`[data-swiper-slide-index="${f}"]`);
    } else
      c = l(`[data-swiper-slide-index="${n}"]`);
  else
    o ? (c = e.find((f) => f.column === n), d = e.find((f) => f.column === n + 1), u = e.find((f) => f.column === n - 1)) : c = e[n];
  c && (o || (d = elementNextAll(c, `.${t.slideClass}, swiper-slide`)[0], t.loop && !d && (d = e[0]), u = elementPrevAll(c, `.${t.slideClass}, swiper-slide`)[0], t.loop && !u === 0 && (u = e[e.length - 1]))), e.forEach((f) => {
    toggleSlideClasses(f, f === c, t.slideActiveClass), toggleSlideClasses(f, f === d, t.slideNextClass), toggleSlideClasses(f, f === u, t.slidePrevClass);
  }), r.emitSlidesClasses();
}
const processLazyPreloader = (r, e) => {
  if (!r || r.destroyed || !r.params) return;
  const t = () => r.isElement ? "swiper-slide" : `.${r.params.slideClass}`, s = e.closest(t());
  if (s) {
    let n = s.querySelector(`.${r.params.lazyPreloaderClass}`);
    !n && r.isElement && (s.shadowRoot ? n = s.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      s.shadowRoot && (n = s.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`), n && n.remove());
    })), n && n.remove();
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
  const s = r.params.slidesPerView === "auto" ? r.slidesPerViewDynamic() : Math.ceil(r.params.slidesPerView), n = r.activeIndex;
  if (r.params.grid && r.params.grid.rows > 1) {
    const o = n, l = [o - e];
    l.push(...Array.from({
      length: e
    }).map((c, u) => o + s + u)), r.slides.forEach((c, u) => {
      l.includes(c.column) && unlazy(r, u);
    });
    return;
  }
  const i = n + s - 1;
  if (r.params.rewind || r.params.loop)
    for (let o = n - e; o <= i + e; o += 1) {
      const l = (o % t + t) % t;
      (l < n || l > i) && unlazy(r, l);
    }
  else
    for (let o = Math.max(n - e, 0); o <= Math.min(i + e, t - 1); o += 1)
      o !== n && (o > i || o < n) && unlazy(r, o);
};
function getActiveIndexByTranslate(r) {
  const {
    slidesGrid: e,
    params: t
  } = r, s = r.rtlTranslate ? r.translate : -r.translate;
  let n;
  for (let i = 0; i < e.length; i += 1)
    typeof e[i + 1] < "u" ? s >= e[i] && s < e[i + 1] - (e[i + 1] - e[i]) / 2 ? n = i : s >= e[i] && s < e[i + 1] && (n = i + 1) : s >= e[i] && (n = i);
  return t.normalizeSlideIndex && (n < 0 || typeof n > "u") && (n = 0), n;
}
function updateActiveIndex(r) {
  const e = this, t = e.rtlTranslate ? e.translate : -e.translate, {
    snapGrid: s,
    params: n,
    activeIndex: i,
    realIndex: o,
    snapIndex: l
  } = e;
  let c = r, u;
  const d = (g) => {
    let h = g - e.virtual.slidesBefore;
    return h < 0 && (h = e.virtual.slides.length + h), h >= e.virtual.slides.length && (h -= e.virtual.slides.length), h;
  };
  if (typeof c > "u" && (c = getActiveIndexByTranslate(e)), s.indexOf(t) >= 0)
    u = s.indexOf(t);
  else {
    const g = Math.min(n.slidesPerGroupSkip, c);
    u = g + Math.floor((c - g) / n.slidesPerGroup);
  }
  if (u >= s.length && (u = s.length - 1), c === i && !e.params.loop) {
    u !== l && (e.snapIndex = u, e.emit("snapIndexChange"));
    return;
  }
  if (c === i && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = d(c);
    return;
  }
  const f = e.grid && n.grid && n.grid.rows > 1;
  let p;
  if (e.virtual && n.virtual.enabled && n.loop)
    p = d(c);
  else if (f) {
    const g = e.slides.find((_) => _.column === c);
    let h = parseInt(g.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(h) && (h = Math.max(e.slides.indexOf(g), 0)), p = Math.floor(h / n.grid.rows);
  } else if (e.slides[c]) {
    const g = e.slides[c].getAttribute("data-swiper-slide-index");
    g ? p = parseInt(g, 10) : p = c;
  } else
    p = c;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: u,
    previousRealIndex: o,
    realIndex: p,
    previousIndex: i,
    activeIndex: c
  }), e.initialized && preload(e), e.emit("activeIndexChange"), e.emit("snapIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && (o !== p && e.emit("realIndexChange"), e.emit("slideChange"));
}
function updateClickedSlide(r, e) {
  const t = this, s = t.params;
  let n = r.closest(`.${s.slideClass}, swiper-slide`);
  !n && t.isElement && e && e.length > 1 && e.includes(r) && [...e.slice(e.indexOf(r) + 1, e.length)].forEach((l) => {
    !n && l.matches && l.matches(`.${s.slideClass}, swiper-slide`) && (n = l);
  });
  let i = !1, o;
  if (n) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === n) {
        i = !0, o = l;
        break;
      }
  }
  if (n && i)
    t.clickedSlide = n, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(n.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
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
    translate: n,
    wrapperEl: i
  } = e;
  if (t.virtualTranslate)
    return s ? -n : n;
  if (t.cssMode)
    return n;
  let o = getTranslate(i, r);
  return o += e.cssOverflowAdjustment(), s && (o = -o), o || 0;
}
function setTranslate(r, e) {
  const t = this, {
    rtlTranslate: s,
    params: n,
    wrapperEl: i,
    progress: o
  } = t;
  let l = 0, c = 0;
  const u = 0;
  t.isHorizontal() ? l = s ? -r : r : c = r, n.roundLengths && (l = Math.floor(l), c = Math.floor(c)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? l : c, n.cssMode ? i[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -l : -c : n.virtualTranslate || (t.isHorizontal() ? l -= t.cssOverflowAdjustment() : c -= t.cssOverflowAdjustment(), i.style.transform = `translate3d(${l}px, ${c}px, ${u}px)`);
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
function translateTo(r, e, t, s, n) {
  r === void 0 && (r = 0), e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), s === void 0 && (s = !0);
  const i = this, {
    params: o,
    wrapperEl: l
  } = i;
  if (i.animating && o.preventInteractionOnTransition)
    return !1;
  const c = i.minTranslate(), u = i.maxTranslate();
  let d;
  if (s && r > c ? d = c : s && r < u ? d = u : d = r, i.updateProgress(d), o.cssMode) {
    const f = i.isHorizontal();
    if (e === 0)
      l[f ? "scrollLeft" : "scrollTop"] = -d;
    else {
      if (!i.support.smoothScroll)
        return animateCSSModeScroll({
          swiper: i,
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
  return e === 0 ? (i.setTransition(0), i.setTranslate(d), t && (i.emit("beforeTransitionStart", e, n), i.emit("transitionEnd"))) : (i.setTransition(e), i.setTranslate(d), t && (i.emit("beforeTransitionStart", e, n), i.emit("transitionStart")), i.animating || (i.animating = !0, i.onTranslateToWrapperTransitionEnd || (i.onTranslateToWrapperTransitionEnd = function(p) {
    !i || i.destroyed || p.target === this && (i.wrapperEl.removeEventListener("transitionend", i.onTranslateToWrapperTransitionEnd), i.onTranslateToWrapperTransitionEnd = null, delete i.onTranslateToWrapperTransitionEnd, i.animating = !1, t && i.emit("transitionEnd"));
  }), i.wrapperEl.addEventListener("transitionend", i.onTranslateToWrapperTransitionEnd))), !0;
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
    step: n
  } = r;
  const {
    activeIndex: i,
    previousIndex: o
  } = e;
  let l = s;
  l || (i > o ? l = "next" : i < o ? l = "prev" : l = "reset"), e.emit(`transition${n}`), t && l === "reset" ? e.emit(`slideResetTransition${n}`) : t && i !== o && (e.emit(`slideChangeTransition${n}`), l === "next" ? e.emit(`slideNextTransition${n}`) : e.emit(`slidePrevTransition${n}`));
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
function slideTo(r, e, t, s, n) {
  r === void 0 && (r = 0), t === void 0 && (t = !0), typeof r == "string" && (r = parseInt(r, 10));
  const i = this;
  let o = r;
  o < 0 && (o = 0);
  const {
    params: l,
    snapGrid: c,
    slidesGrid: u,
    previousIndex: d,
    activeIndex: f,
    rtlTranslate: p,
    wrapperEl: g,
    enabled: h
  } = i;
  if (!h && !s && !n || i.destroyed || i.animating && l.preventInteractionOnTransition)
    return !1;
  typeof e > "u" && (e = i.params.speed);
  const _ = Math.min(i.params.slidesPerGroupSkip, o);
  let m = _ + Math.floor((o - _) / i.params.slidesPerGroup);
  m >= c.length && (m = c.length - 1);
  const y = -c[m];
  if (l.normalizeSlideIndex)
    for (let A = 0; A < u.length; A += 1) {
      const I = -Math.floor(y * 100), P = Math.floor(u[A] * 100), O = Math.floor(u[A + 1] * 100);
      typeof u[A + 1] < "u" ? I >= P && I < O - (O - P) / 2 ? o = A : I >= P && I < O && (o = A + 1) : I >= P && (o = A);
    }
  if (i.initialized && o !== f && (!i.allowSlideNext && (p ? y > i.translate && y > i.minTranslate() : y < i.translate && y < i.minTranslate()) || !i.allowSlidePrev && y > i.translate && y > i.maxTranslate() && (f || 0) !== o))
    return !1;
  o !== (d || 0) && t && i.emit("beforeSlideChangeStart"), i.updateProgress(y);
  let w;
  o > f ? w = "next" : o < f ? w = "prev" : w = "reset";
  const v = i.virtual && i.params.virtual.enabled;
  if (!(v && n) && (p && -y === i.translate || !p && y === i.translate))
    return i.updateActiveIndex(o), l.autoHeight && i.updateAutoHeight(), i.updateSlidesClasses(), l.effect !== "slide" && i.setTranslate(y), w !== "reset" && (i.transitionStart(t, w), i.transitionEnd(t, w)), !1;
  if (l.cssMode) {
    const A = i.isHorizontal(), I = p ? y : -y;
    if (e === 0)
      v && (i.wrapperEl.style.scrollSnapType = "none", i._immediateVirtual = !0), v && !i._cssModeVirtualInitialSet && i.params.initialSlide > 0 ? (i._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        g[A ? "scrollLeft" : "scrollTop"] = I;
      })) : g[A ? "scrollLeft" : "scrollTop"] = I, v && requestAnimationFrame(() => {
        i.wrapperEl.style.scrollSnapType = "", i._immediateVirtual = !1;
      });
    else {
      if (!i.support.smoothScroll)
        return animateCSSModeScroll({
          swiper: i,
          targetPosition: I,
          side: A ? "left" : "top"
        }), !0;
      g.scrollTo({
        [A ? "left" : "top"]: I,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const E = getBrowser().isSafari;
  return v && !n && E && i.isElement && i.virtual.update(!1, !1, o), i.setTransition(e), i.setTranslate(y), i.updateActiveIndex(o), i.updateSlidesClasses(), i.emit("beforeTransitionStart", e, s), i.transitionStart(t, w), e === 0 ? i.transitionEnd(t, w) : i.animating || (i.animating = !0, i.onSlideToWrapperTransitionEnd || (i.onSlideToWrapperTransitionEnd = function(I) {
    !i || i.destroyed || I.target === this && (i.wrapperEl.removeEventListener("transitionend", i.onSlideToWrapperTransitionEnd), i.onSlideToWrapperTransitionEnd = null, delete i.onSlideToWrapperTransitionEnd, i.transitionEnd(t, w));
  }), i.wrapperEl.addEventListener("transitionend", i.onSlideToWrapperTransitionEnd)), !0;
}
function slideToLoop(r, e, t, s) {
  r === void 0 && (r = 0), t === void 0 && (t = !0), typeof r == "string" && (r = parseInt(r, 10));
  const n = this;
  if (n.destroyed) return;
  typeof e > "u" && (e = n.params.speed);
  const i = n.grid && n.params.grid && n.params.grid.rows > 1;
  let o = r;
  if (n.params.loop)
    if (n.virtual && n.params.virtual.enabled)
      o = o + n.virtual.slidesBefore;
    else {
      let l;
      if (i) {
        const p = o * n.params.grid.rows;
        l = n.slides.find((g) => g.getAttribute("data-swiper-slide-index") * 1 === p).column;
      } else
        l = n.getSlideIndexByData(o);
      const c = i ? Math.ceil(n.slides.length / n.params.grid.rows) : n.slides.length, {
        centeredSlides: u
      } = n.params;
      let d = n.params.slidesPerView;
      d === "auto" ? d = n.slidesPerViewDynamic() : (d = Math.ceil(parseFloat(n.params.slidesPerView, 10)), u && d % 2 === 0 && (d = d + 1));
      let f = c - l < d;
      if (u && (f = f || l < Math.ceil(d / 2)), s && u && n.params.slidesPerView !== "auto" && !i && (f = !1), f) {
        const p = u ? l < n.activeIndex ? "prev" : "next" : l - n.activeIndex - 1 < n.params.slidesPerView ? "next" : "prev";
        n.loopFix({
          direction: p,
          slideTo: !0,
          activeSlideIndex: p === "next" ? l + 1 : l - c + 1,
          slideRealIndex: p === "next" ? n.realIndex : void 0
        });
      }
      if (i) {
        const p = o * n.params.grid.rows;
        o = n.slides.find((g) => g.getAttribute("data-swiper-slide-index") * 1 === p).column;
      } else
        o = n.getSlideIndexByData(o);
    }
  return requestAnimationFrame(() => {
    n.slideTo(o, e, t, s);
  }), n;
}
function slideNext(r, e, t) {
  e === void 0 && (e = !0);
  const s = this, {
    enabled: n,
    params: i,
    animating: o
  } = s;
  if (!n || s.destroyed) return s;
  typeof r > "u" && (r = s.params.speed);
  let l = i.slidesPerGroup;
  i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (l = Math.max(s.slidesPerViewDynamic("current", !0), 1));
  const c = s.activeIndex < i.slidesPerGroupSkip ? 1 : l, u = s.virtual && i.virtual.enabled;
  if (i.loop) {
    if (o && !u && i.loopPreventsSliding) return !1;
    if (s.loopFix({
      direction: "next"
    }), s._clientLeft = s.wrapperEl.clientLeft, s.activeIndex === s.slides.length - 1 && i.cssMode)
      return requestAnimationFrame(() => {
        s.slideTo(s.activeIndex + c, r, e, t);
      }), !0;
  }
  return i.rewind && s.isEnd ? s.slideTo(0, r, e, t) : s.slideTo(s.activeIndex + c, r, e, t);
}
function slidePrev(r, e, t) {
  e === void 0 && (e = !0);
  const s = this, {
    params: n,
    snapGrid: i,
    slidesGrid: o,
    rtlTranslate: l,
    enabled: c,
    animating: u
  } = s;
  if (!c || s.destroyed) return s;
  typeof r > "u" && (r = s.params.speed);
  const d = s.virtual && n.virtual.enabled;
  if (n.loop) {
    if (u && !d && n.loopPreventsSliding) return !1;
    s.loopFix({
      direction: "prev"
    }), s._clientLeft = s.wrapperEl.clientLeft;
  }
  const f = l ? s.translate : -s.translate;
  function p(w) {
    return w < 0 ? -Math.floor(Math.abs(w)) : Math.floor(w);
  }
  const g = p(f), h = i.map((w) => p(w)), _ = n.freeMode && n.freeMode.enabled;
  let m = i[h.indexOf(g) - 1];
  if (typeof m > "u" && (n.cssMode || _)) {
    let w;
    i.forEach((v, b) => {
      g >= v && (w = b);
    }), typeof w < "u" && (m = _ ? i[w] : i[w > 0 ? w - 1 : w]);
  }
  let y = 0;
  if (typeof m < "u" && (y = o.indexOf(m), y < 0 && (y = s.activeIndex - 1), n.slidesPerView === "auto" && n.slidesPerGroup === 1 && n.slidesPerGroupAuto && (y = y - s.slidesPerViewDynamic("previous", !0) + 1, y = Math.max(y, 0))), n.rewind && s.isBeginning) {
    const w = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(w, r, e, t);
  } else if (n.loop && s.activeIndex === 0 && n.cssMode)
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
  const n = this;
  if (n.destroyed) return;
  typeof r > "u" && (r = n.params.speed);
  let i = n.activeIndex;
  const o = Math.min(n.params.slidesPerGroupSkip, i), l = o + Math.floor((i - o) / n.params.slidesPerGroup), c = n.rtlTranslate ? n.translate : -n.translate;
  if (c >= n.snapGrid[l]) {
    const u = n.snapGrid[l], d = n.snapGrid[l + 1];
    c - u > (d - u) * s && (i += n.params.slidesPerGroup);
  } else {
    const u = n.snapGrid[l - 1], d = n.snapGrid[l];
    c - u <= (d - u) * s && (i -= n.params.slidesPerGroup);
  }
  return i = Math.max(i, 0), i = Math.min(i, n.slidesGrid.length - 1), n.slideTo(i, r, e, t);
}
function slideToClickedSlide() {
  const r = this;
  if (r.destroyed) return;
  const {
    params: e,
    slidesEl: t
  } = r, s = e.slidesPerView === "auto" ? r.slidesPerViewDynamic() : e.slidesPerView;
  let n = r.getSlideIndexWhenGrid(r.clickedIndex), i;
  const o = r.isElement ? "swiper-slide" : `.${e.slideClass}`, l = r.grid && r.params.grid && r.params.grid.rows > 1;
  if (e.loop) {
    if (r.animating) return;
    i = parseInt(r.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? r.slideToLoop(i) : n > (l ? (r.slides.length - s) / 2 - (r.params.grid.rows - 1) : r.slides.length - s) ? (r.loopFix(), n = r.getSlideIndex(elementChildren(t, `${o}[data-swiper-slide-index="${i}"]`)[0]), nextTick(() => {
      r.slideTo(n);
    })) : r.slideTo(n);
  } else
    r.slideTo(n);
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
    slidesEl: n
  } = t;
  if (!s.loop || t.virtual && t.params.virtual.enabled) return;
  const i = () => {
    elementChildren(n, `.${s.slideClass}, swiper-slide`).forEach((g, h) => {
      g.setAttribute("data-swiper-slide-index", h);
    });
  }, o = () => {
    const p = elementChildren(n, `.${s.slideBlankClass}`);
    p.forEach((g) => {
      g.remove();
    }), p.length > 0 && (t.recalcSlides(), t.updateSlides());
  }, l = t.grid && s.grid && s.grid.rows > 1;
  s.loopAddBlankSlides && (s.slidesPerGroup > 1 || l) && o();
  const c = s.slidesPerGroup * (l ? s.grid.rows : 1), u = t.slides.length % c !== 0, d = l && t.slides.length % s.grid.rows !== 0, f = (p) => {
    for (let g = 0; g < p; g += 1) {
      const h = t.isElement ? createElement("swiper-slide", [s.slideBlankClass]) : createElement("div", [s.slideClass, s.slideBlankClass]);
      t.slidesEl.append(h);
    }
  };
  if (u) {
    if (s.loopAddBlankSlides) {
      const p = c - t.slides.length % c;
      f(p), t.recalcSlides(), t.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    i();
  } else if (d) {
    if (s.loopAddBlankSlides) {
      const p = s.grid.rows - t.slides.length % s.grid.rows;
      f(p), t.recalcSlides(), t.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    i();
  } else
    i();
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
    setTranslate: n,
    activeSlideIndex: i,
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
    allowSlideNext: p,
    slidesEl: g,
    params: h
  } = u, {
    centeredSlides: _,
    initialSlide: m
  } = h;
  if (u.allowSlidePrev = !0, u.allowSlideNext = !0, u.virtual && h.virtual.enabled) {
    t && (!h.centeredSlides && u.snapIndex === 0 ? u.slideTo(u.virtual.slides.length, 0, !1, !0) : h.centeredSlides && u.snapIndex < h.slidesPerView ? u.slideTo(u.virtual.slides.length + u.snapIndex, 0, !1, !0) : u.snapIndex === u.snapGrid.length - 1 && u.slideTo(u.virtual.slidesBefore, 0, !1, !0)), u.allowSlidePrev = f, u.allowSlideNext = p, u.emit("loopFix");
    return;
  }
  let y = h.slidesPerView;
  y === "auto" ? y = u.slidesPerViewDynamic() : (y = Math.ceil(parseFloat(h.slidesPerView, 10)), _ && y % 2 === 0 && (y = y + 1));
  const w = h.slidesPerGroupAuto ? y : h.slidesPerGroup;
  let v = _ ? Math.max(w, Math.ceil(y / 2)) : w;
  v % w !== 0 && (v += w - v % w), v += h.loopAdditionalSlides, u.loopedSlides = v;
  const b = u.grid && h.grid && h.grid.rows > 1;
  d.length < y + v || u.params.effect === "cards" && d.length < y + v * 2 ? showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : b && h.grid.fill === "row" && showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const S = [], E = [], A = b ? Math.ceil(d.length / h.grid.rows) : d.length, I = o && A - m < y && !_;
  let P = I ? m : u.activeIndex;
  typeof i > "u" ? i = u.getSlideIndex(d.find(($) => $.classList.contains(h.slideActiveClass))) : P = i;
  const O = s === "next" || !s, R = s === "prev" || !s;
  let C = 0, k = 0;
  const x = (b ? d[i].column : i) + (_ && typeof n > "u" ? -y / 2 + 0.5 : 0);
  if (x < v) {
    C = Math.max(v - x, w);
    for (let $ = 0; $ < v - x; $ += 1) {
      const B = $ - Math.floor($ / A) * A;
      if (b) {
        const U = A - B - 1;
        for (let M = d.length - 1; M >= 0; M -= 1)
          d[M].column === U && S.push(M);
      } else
        S.push(A - B - 1);
    }
  } else if (x + y > A - v) {
    k = Math.max(x - (A - v * 2), w), I && (k = Math.max(k, y - A + m + 1));
    for (let $ = 0; $ < k; $ += 1) {
      const B = $ - Math.floor($ / A) * A;
      b ? d.forEach((U, M) => {
        U.column === B && E.push(M);
      }) : E.push(B);
    }
  }
  if (u.__preventObserver__ = !0, requestAnimationFrame(() => {
    u.__preventObserver__ = !1;
  }), u.params.effect === "cards" && d.length < y + v * 2 && (E.includes(i) && E.splice(E.indexOf(i), 1), S.includes(i) && S.splice(S.indexOf(i), 1)), R && S.forEach(($) => {
    d[$].swiperLoopMoveDOM = !0, g.prepend(d[$]), d[$].swiperLoopMoveDOM = !1;
  }), O && E.forEach(($) => {
    d[$].swiperLoopMoveDOM = !0, g.append(d[$]), d[$].swiperLoopMoveDOM = !1;
  }), u.recalcSlides(), h.slidesPerView === "auto" ? u.updateSlides() : b && (S.length > 0 && R || E.length > 0 && O) && u.slides.forEach(($, B) => {
    u.grid.updateSlide(B, $, u.slides);
  }), h.watchSlidesProgress && u.updateSlidesOffset(), t) {
    if (S.length > 0 && R) {
      if (typeof e > "u") {
        const $ = u.slidesGrid[P], U = u.slidesGrid[P + C] - $;
        c ? u.setTranslate(u.translate - U) : (u.slideTo(P + Math.ceil(C), 0, !1, !0), n && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - U, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - U));
      } else if (n) {
        const $ = b ? S.length / h.grid.rows : S.length;
        u.slideTo(u.activeIndex + $, 0, !1, !0), u.touchEventsData.currentTranslate = u.translate;
      }
    } else if (E.length > 0 && O)
      if (typeof e > "u") {
        const $ = u.slidesGrid[P], U = u.slidesGrid[P - k] - $;
        c ? u.setTranslate(u.translate - U) : (u.slideTo(P - k, 0, !1, !0), n && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - U, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - U));
      } else {
        const $ = b ? E.length / h.grid.rows : E.length;
        u.slideTo(u.activeIndex - $, 0, !1, !0);
      }
  }
  if (u.allowSlidePrev = f, u.allowSlideNext = p, u.controller && u.controller.control && !l) {
    const $ = {
      slideRealIndex: e,
      direction: s,
      setTranslate: n,
      activeSlideIndex: i,
      byController: !0
    };
    Array.isArray(u.controller.control) ? u.controller.control.forEach((B) => {
      !B.destroyed && B.params.loop && B.loopFix({
        ...$,
        slideTo: B.params.slidesPerView === h.slidesPerView ? t : !1
      });
    }) : u.controller.control instanceof u.constructor && u.controller.control.params.loop && u.controller.control.loopFix({
      ...$,
      slideTo: u.controller.control.params.slidesPerView === h.slidesPerView ? t : !1
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
  r.slides.forEach((n) => {
    const i = typeof n.swiperSlideIndex > "u" ? n.getAttribute("data-swiper-slide-index") * 1 : n.swiperSlideIndex;
    s[i] = n;
  }), r.slides.forEach((n) => {
    n.removeAttribute("data-swiper-slide-index");
  }), s.forEach((n) => {
    t.append(n);
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
    const n = s.closest(r);
    return !n && !s.getRootNode ? null : n || t(s.getRootNode().host);
  }
  return t(e);
}
function preventEdgeSwipe(r, e, t) {
  const s = getWindow(), {
    params: n
  } = r, i = n.edgeSwipeDetection, o = n.edgeSwipeThreshold;
  return i && (t <= o || t >= s.innerWidth - o) ? i === "prevent" ? (e.preventDefault(), !0) : !1 : !0;
}
function onTouchStart(r) {
  const e = this, t = getDocument();
  let s = r;
  s.originalEvent && (s = s.originalEvent);
  const n = e.touchEventsData;
  if (s.type === "pointerdown") {
    if (n.pointerId !== null && n.pointerId !== s.pointerId)
      return;
    n.pointerId = s.pointerId;
  } else s.type === "touchstart" && s.targetTouches.length === 1 && (n.touchId = s.targetTouches[0].identifier);
  if (s.type === "touchstart") {
    preventEdgeSwipe(e, s, s.targetTouches[0].pageX);
    return;
  }
  const {
    params: i,
    touches: o,
    enabled: l
  } = e;
  if (!l || !i.simulateTouch && s.pointerType === "mouse" || e.animating && i.preventInteractionOnTransition)
    return;
  !e.animating && i.cssMode && i.loop && e.loopFix();
  let c = s.target;
  if (i.touchEventsTarget === "wrapper" && !elementIsChildOf(c, e.wrapperEl) || "which" in s && s.which === 3 || "button" in s && s.button > 0 || n.isTouched && n.isMoved) return;
  const u = !!i.noSwipingClass && i.noSwipingClass !== "", d = s.composedPath ? s.composedPath() : s.path;
  u && s.target && s.target.shadowRoot && d && (c = d[0]);
  const f = i.noSwipingSelector ? i.noSwipingSelector : `.${i.noSwipingClass}`, p = !!(s.target && s.target.shadowRoot);
  if (i.noSwiping && (p ? closestElement(f, c) : c.closest(f))) {
    e.allowClick = !0;
    return;
  }
  if (i.swipeHandler && !c.closest(i.swipeHandler))
    return;
  o.currentX = s.pageX, o.currentY = s.pageY;
  const g = o.currentX, h = o.currentY;
  if (!preventEdgeSwipe(e, s, g))
    return;
  Object.assign(n, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), o.startX = g, o.startY = h, n.touchStartTime = now(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, i.threshold > 0 && (n.allowThresholdMove = !1);
  let _ = !0;
  c.matches(n.focusableElements) && (_ = !1, c.nodeName === "SELECT" && (n.isTouched = !1)), t.activeElement && t.activeElement.matches(n.focusableElements) && t.activeElement !== c && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !c.matches(n.focusableElements)) && t.activeElement.blur();
  const m = _ && e.allowTouchMove && i.touchStartPreventDefault;
  (i.touchStartForcePreventDefault || m) && !c.isContentEditable && s.preventDefault(), i.freeMode && i.freeMode.enabled && e.freeMode && e.animating && !i.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", s);
}
function onTouchMove(r) {
  const e = getDocument(), t = this, s = t.touchEventsData, {
    params: n,
    touches: i,
    rtlTranslate: o,
    enabled: l
  } = t;
  if (!l || !n.simulateTouch && r.pointerType === "mouse") return;
  let c = r;
  if (c.originalEvent && (c = c.originalEvent), c.type === "pointermove" && (s.touchId !== null || c.pointerId !== s.pointerId))
    return;
  let u;
  if (c.type === "touchmove") {
    if (u = [...c.changedTouches].find((S) => S.identifier === s.touchId), !u || u.identifier !== s.touchId) return;
  } else
    u = c;
  if (!s.isTouched) {
    s.startMoving && s.isScrolling && t.emit("touchMoveOpposite", c);
    return;
  }
  const d = u.pageX, f = u.pageY;
  if (c.preventedByNestedSwiper) {
    i.startX = d, i.startY = f;
    return;
  }
  if (!t.allowTouchMove) {
    c.target.matches(s.focusableElements) || (t.allowClick = !1), s.isTouched && (Object.assign(i, {
      startX: d,
      startY: f,
      currentX: d,
      currentY: f
    }), s.touchStartTime = now());
    return;
  }
  if (n.touchReleaseOnEdges && !n.loop)
    if (t.isVertical()) {
      if (f < i.startY && t.translate <= t.maxTranslate() || f > i.startY && t.translate >= t.minTranslate()) {
        s.isTouched = !1, s.isMoved = !1;
        return;
      }
    } else {
      if (o && (d > i.startX && -t.translate <= t.maxTranslate() || d < i.startX && -t.translate >= t.minTranslate()))
        return;
      if (!o && (d < i.startX && t.translate <= t.maxTranslate() || d > i.startX && t.translate >= t.minTranslate()))
        return;
    }
  if (e.activeElement && e.activeElement.matches(s.focusableElements) && e.activeElement !== c.target && c.pointerType !== "mouse" && e.activeElement.blur(), e.activeElement && c.target === e.activeElement && c.target.matches(s.focusableElements)) {
    s.isMoved = !0, t.allowClick = !1;
    return;
  }
  s.allowTouchCallbacks && t.emit("touchMove", c), i.previousX = i.currentX, i.previousY = i.currentY, i.currentX = d, i.currentY = f;
  const p = i.currentX - i.startX, g = i.currentY - i.startY;
  if (t.params.threshold && Math.sqrt(p ** 2 + g ** 2) < t.params.threshold) return;
  if (typeof s.isScrolling > "u") {
    let S;
    t.isHorizontal() && i.currentY === i.startY || t.isVertical() && i.currentX === i.startX ? s.isScrolling = !1 : p * p + g * g >= 25 && (S = Math.atan2(Math.abs(g), Math.abs(p)) * 180 / Math.PI, s.isScrolling = t.isHorizontal() ? S > n.touchAngle : 90 - S > n.touchAngle);
  }
  if (s.isScrolling && t.emit("touchMoveOpposite", c), typeof s.startMoving > "u" && (i.currentX !== i.startX || i.currentY !== i.startY) && (s.startMoving = !0), s.isScrolling || c.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  t.allowClick = !1, !n.cssMode && c.cancelable && c.preventDefault(), n.touchMoveStopPropagation && !n.nested && c.stopPropagation();
  let h = t.isHorizontal() ? p : g, _ = t.isHorizontal() ? i.currentX - i.previousX : i.currentY - i.previousY;
  n.oneWayMovement && (h = Math.abs(h) * (o ? 1 : -1), _ = Math.abs(_) * (o ? 1 : -1)), i.diff = h, h *= n.touchRatio, o && (h = -h, _ = -_);
  const m = t.touchesDirection;
  t.swipeDirection = h > 0 ? "prev" : "next", t.touchesDirection = _ > 0 ? "prev" : "next";
  const y = t.params.loop && !n.cssMode, w = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!s.isMoved) {
    if (y && w && t.loopFix({
      direction: t.swipeDirection
    }), s.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const S = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(S);
    }
    s.allowMomentumBounce = !1, n.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", c);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), n._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && m !== t.touchesDirection && y && w && Math.abs(h) >= 1) {
    Object.assign(i, {
      startX: d,
      startY: f,
      currentX: d,
      currentY: f,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  t.emit("sliderMove", c), s.isMoved = !0, s.currentTranslate = h + s.startTranslate;
  let v = !0, b = n.resistanceRatio;
  if (n.touchReleaseOnEdges && (b = 0), h > 0 ? (y && w && s.allowThresholdMove && s.currentTranslate > (n.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > t.minTranslate() && (v = !1, n.resistance && (s.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + s.startTranslate + h) ** b))) : h < 0 && (y && w && s.allowThresholdMove && s.currentTranslate < (n.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (n.slidesPerView !== "auto" && t.slides.length - n.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (n.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(n.slidesPerView, 10)))
  }), s.currentTranslate < t.maxTranslate() && (v = !1, n.resistance && (s.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - s.startTranslate - h) ** b))), v && (c.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (s.currentTranslate = s.startTranslate), n.threshold > 0)
    if (Math.abs(h) > n.threshold || s.allowThresholdMove) {
      if (!s.allowThresholdMove) {
        s.allowThresholdMove = !0, i.startX = i.currentX, i.startY = i.currentY, s.currentTranslate = s.startTranslate, i.diff = t.isHorizontal() ? i.currentX - i.startX : i.currentY - i.startY;
        return;
      }
    } else {
      s.currentTranslate = s.startTranslate;
      return;
    }
  !n.followFinger || n.cssMode || ((n.freeMode && n.freeMode.enabled && t.freeMode || n.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), n.freeMode && n.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(s.currentTranslate), t.setTranslate(s.currentTranslate));
}
function onTouchEnd(r) {
  const e = this, t = e.touchEventsData;
  let s = r;
  s.originalEvent && (s = s.originalEvent);
  let n;
  if (s.type === "touchend" || s.type === "touchcancel") {
    if (n = [...s.changedTouches].find((S) => S.identifier === t.touchId), !n || n.identifier !== t.touchId) return;
  } else {
    if (t.touchId !== null || s.pointerId !== t.pointerId) return;
    n = s;
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
  const f = now(), p = f - t.touchStartTime;
  if (e.allowClick) {
    const S = s.path || s.composedPath && s.composedPath();
    e.updateClickedSlide(S && S[0] || s.target, S), e.emit("tap click", s), p < 300 && f - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", s);
  }
  if (t.lastClickTime = now(), nextTick(() => {
    e.destroyed || (e.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !e.swipeDirection || l.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let g;
  if (o.followFinger ? g = c ? e.translate : -e.translate : g = -t.currentTranslate, o.cssMode)
    return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: g
    });
    return;
  }
  const h = g >= -e.maxTranslate() && !e.params.loop;
  let _ = 0, m = e.slidesSizesGrid[0];
  for (let S = 0; S < u.length; S += S < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    const E = S < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof u[S + E] < "u" ? (h || g >= u[S] && g < u[S + E]) && (_ = S, m = u[S + E] - u[S]) : (h || g >= u[S]) && (_ = S, m = u[u.length - 1] - u[u.length - 2]);
  }
  let y = null, w = null;
  o.rewind && (e.isBeginning ? w = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (y = 0));
  const v = (g - u[_]) / m, b = _ < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (p > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" && (v >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? y : _ + b) : e.slideTo(_)), e.swipeDirection === "prev" && (v > 1 - o.longSwipesRatio ? e.slideTo(_ + b) : w !== null && v < 0 && Math.abs(v) > o.longSwipesRatio ? e.slideTo(w) : e.slideTo(_));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation && (s.target === e.navigation.nextEl || s.target === e.navigation.prevEl) ? s.target === e.navigation.nextEl ? e.slideTo(_ + b) : e.slideTo(_) : (e.swipeDirection === "next" && e.slideTo(y !== null ? y : _ + b), e.swipeDirection === "prev" && e.slideTo(w !== null ? w : _));
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
    allowSlidePrev: n,
    snapGrid: i
  } = r, o = r.virtual && r.params.virtual.enabled;
  r.allowSlideNext = !0, r.allowSlidePrev = !0, r.updateSize(), r.updateSlides(), r.updateSlidesClasses();
  const l = o && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) && r.isEnd && !r.isBeginning && !r.params.centeredSlides && !l ? r.slideTo(r.slides.length - 1, 0, !1, !0) : r.params.loop && !o ? r.slideToLoop(r.realIndex, 0, !1, !0) : r.slideTo(r.activeIndex, 0, !1, !0), r.autoplay && r.autoplay.running && r.autoplay.paused && (clearTimeout(r.autoplay.resizeTimeout), r.autoplay.resizeTimeout = setTimeout(() => {
    r.autoplay && r.autoplay.running && r.autoplay.paused && r.autoplay.resume();
  }, 500)), r.allowSlidePrev = n, r.allowSlideNext = s, r.params.watchOverflow && i !== r.snapGrid && r.checkOverflow();
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
  let n;
  const i = r.maxTranslate() - r.minTranslate();
  i === 0 ? n = 0 : n = (r.translate - r.minTranslate()) / i, n !== r.progress && r.updateProgress(t ? -r.translate : r.translate), r.emit("setTranslate", r.translate, !1);
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
    el: n,
    wrapperEl: i,
    device: o
  } = r, l = !!s.nested, c = e === "on" ? "addEventListener" : "removeEventListener", u = e;
  !n || typeof n == "string" || (t[c]("touchstart", r.onDocumentTouchStart, {
    passive: !1,
    capture: l
  }), n[c]("touchstart", r.onTouchStart, {
    passive: !1
  }), n[c]("pointerdown", r.onTouchStart, {
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
  }), (s.preventClicks || s.preventClicksPropagation) && n[c]("click", r.onClick, !0), s.cssMode && i[c]("scroll", r.onScroll), s.updateOnWindowResize ? r[u](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, !0) : r[u]("observerUpdate", onResize, !0), n[c]("load", r.onLoad, {
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
    el: n
  } = r, i = s.breakpoints;
  if (!i || i && Object.keys(i).length === 0) return;
  const o = getDocument(), l = s.breakpointsBase === "window" || !s.breakpointsBase ? s.breakpointsBase : "container", c = ["window", "container"].includes(s.breakpointsBase) || !s.breakpointsBase ? r.el : o.querySelector(s.breakpointsBase), u = r.getBreakpoint(i, l, c);
  if (!u || r.currentBreakpoint === u) return;
  const f = (u in i ? i[u] : void 0) || r.originalParams, p = isGridEnabled(r, s), g = isGridEnabled(r, f), h = r.params.grabCursor, _ = f.grabCursor, m = s.enabled;
  p && !g ? (n.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), r.emitContainerClasses()) : !p && g && (n.classList.add(`${s.containerModifierClass}grid`), (f.grid.fill && f.grid.fill === "column" || !f.grid.fill && s.grid.fill === "column") && n.classList.add(`${s.containerModifierClass}grid-column`), r.emitContainerClasses()), h && !_ ? r.unsetGrabCursor() : !h && _ && r.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((E) => {
    if (typeof f[E] > "u") return;
    const A = s[E] && s[E].enabled, I = f[E] && f[E].enabled;
    A && !I && r[E].disable(), !A && I && r[E].enable();
  });
  const y = f.direction && f.direction !== s.direction, w = s.loop && (f.slidesPerView !== s.slidesPerView || y), v = s.loop;
  y && t && r.changeDirection(), extend(r.params, f);
  const b = r.params.enabled, S = r.params.loop;
  Object.assign(r, {
    allowTouchMove: r.params.allowTouchMove,
    allowSlideNext: r.params.allowSlideNext,
    allowSlidePrev: r.params.allowSlidePrev
  }), m && !b ? r.disable() : !m && b && r.enable(), r.currentBreakpoint = u, r.emit("_beforeBreakpoint", f), t && (w ? (r.loopDestroy(), r.loopCreate(e), r.updateSlides()) : !v && S ? (r.loopCreate(e), r.updateSlides()) : v && !S && r.loopDestroy()), r.emit("breakpoint", f);
}
function getBreakpoint(r, e, t) {
  if (e === void 0 && (e = "window"), !r || e === "container" && !t) return;
  let s = !1;
  const n = getWindow(), i = e === "window" ? n.innerHeight : t.clientHeight, o = Object.keys(r).map((l) => {
    if (typeof l == "string" && l.indexOf("@") === 0) {
      const c = parseFloat(l.substr(1));
      return {
        value: i * c,
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
    e === "window" ? n.matchMedia(`(min-width: ${u}px)`).matches && (s = c) : u <= t.clientWidth && (s = c);
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
    typeof s == "object" ? Object.keys(s).forEach((n) => {
      s[n] && t.push(e + n);
    }) : typeof s == "string" && t.push(e + s);
  }), t;
}
function addClasses() {
  const r = this, {
    classNames: e,
    params: t,
    rtl: s,
    el: n,
    device: i
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
    android: i.android
  }, {
    ios: i.ios
  }, {
    "css-mode": t.cssMode
  }, {
    centered: t.cssMode && t.centeredSlides
  }, {
    "watch-progress": t.watchSlidesProgress
  }], t.containerModifierClass);
  e.push(...o), n.classList.add(...e), r.emitContainerClasses();
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
    const n = r.slides.length - 1, i = r.slidesGrid[n] + r.slidesSizesGrid[n] + s * 2;
    r.isLocked = r.size > i;
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
    const n = Object.keys(s)[0], i = s[n];
    if (typeof i != "object" || i === null) {
      extend(e, s);
      return;
    }
    if (r[n] === !0 && (r[n] = {
      enabled: !0
    }), n === "navigation" && r[n] && r[n].enabled && !r[n].prevEl && !r[n].nextEl && (r[n].auto = !0), ["pagination", "scrollbar"].indexOf(n) >= 0 && r[n] && r[n].enabled && !r[n].el && (r[n].auto = !0), !(n in r && "enabled" in i)) {
      extend(e, s);
      return;
    }
    typeof r[n] == "object" && !("enabled" in r[n]) && (r[n].enabled = !0), r[n] || (r[n] = {
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
    for (var s = arguments.length, n = new Array(s), i = 0; i < s; i++)
      n[i] = arguments[i];
    n.length === 1 && n[0].constructor && Object.prototype.toString.call(n[0]).slice(8, -1) === "Object" ? t = n[0] : [e, t] = n, t || (t = {}), t = extend({}, t), e && !t.el && (t.el = e);
    const o = getDocument();
    if (t.el && typeof t.el == "string" && o.querySelectorAll(t.el).length > 1) {
      const d = [];
      return o.querySelectorAll(t.el).forEach((f) => {
        const p = extend({}, t, {
          el: f
        });
        d.push(new Swiper(p));
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
    } = this, n = elementChildren(t, `.${s.slideClass}, swiper-slide`), i = elementIndex(n[0]);
    return elementIndex(e) - i;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.find((t) => t.getAttribute("data-swiper-slide-index") * 1 === e));
  }
  getSlideIndexWhenGrid(e) {
    return this.grid && this.params.grid && this.params.grid.rows > 1 && (this.params.grid.fill === "column" ? e = Math.floor(e / this.params.grid.rows) : this.params.grid.fill === "row" && (e = e % Math.ceil(this.slides.length / this.params.grid.rows))), e;
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
    const n = s.minTranslate(), o = (s.maxTranslate() - n) * e + n;
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
      const n = e.getSlideClasses(s);
      t.push({
        slideEl: s,
        classNames: n
      }), e.emit("_slideClass", s, n);
    }), e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = "current"), t === void 0 && (t = !1);
    const s = this, {
      params: n,
      slides: i,
      slidesGrid: o,
      slidesSizesGrid: l,
      size: c,
      activeIndex: u
    } = s;
    let d = 1;
    if (typeof n.slidesPerView == "number") return n.slidesPerView;
    if (n.centeredSlides) {
      let f = i[u] ? Math.ceil(i[u].swiperSlideSize) : 0, p;
      for (let g = u + 1; g < i.length; g += 1)
        i[g] && !p && (f += Math.ceil(i[g].swiperSlideSize), d += 1, f > c && (p = !0));
      for (let g = u - 1; g >= 0; g -= 1)
        i[g] && !p && (f += i[g].swiperSlideSize, d += 1, f > c && (p = !0));
    } else if (e === "current")
      for (let f = u + 1; f < i.length; f += 1)
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
    function n() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate, l = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let i;
    if (s.freeMode && s.freeMode.enabled && !s.cssMode)
      n(), s.autoHeight && e.updateAutoHeight();
    else {
      if ((s.slidesPerView === "auto" || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
        const o = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
        i = e.slideTo(o.length - 1, 0, !1, !0);
      } else
        i = e.slideTo(e.activeIndex, 0, !1, !0);
      i || n();
    }
    s.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const s = this, n = s.params.direction;
    return e || (e = n === "horizontal" ? "vertical" : "horizontal"), e === n || e !== "horizontal" && e !== "vertical" || (s.el.classList.remove(`${s.params.containerModifierClass}${n}`), s.el.classList.add(`${s.params.containerModifierClass}${e}`), s.emitContainerClasses(), s.params.direction = e, s.slides.forEach((i) => {
      e === "vertical" ? i.style.width = "" : i.style.height = "";
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
    const n = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let o = s && s.shadowRoot && s.shadowRoot.querySelector ? s.shadowRoot.querySelector(n()) : elementChildren(s, n())[0];
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
    const n = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && n.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), n.forEach((i) => {
      i.complete ? processLazyPreloader(t, i) : i.addEventListener("load", (o) => {
        processLazyPreloader(t, o.target);
      });
    }), preload(t), t.initialized = !0, preload(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const s = this, {
      params: n,
      el: i,
      wrapperEl: o,
      slides: l
    } = s;
    return typeof s.params > "u" || s.destroyed || (s.emit("beforeDestroy"), s.initialized = !1, s.detachEvents(), n.loop && s.loopDestroy(), t && (s.removeClasses(), i && typeof i != "string" && i.removeAttribute("style"), o && o.removeAttribute("style"), l && l.length && l.forEach((c) => {
      c.classList.remove(n.slideVisibleClass, n.slideFullyVisibleClass, n.slideActiveClass, n.slideNextClass, n.slidePrevClass), c.removeAttribute("style"), c.removeAttribute("data-swiper-slide-index");
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
var root_4 = /* @__PURE__ */ from_html('<p class="svelte-7ds20c">No messages yet. Be first one to leave a feedback.</p>'), root_6$1 = /* @__PURE__ */ from_html('<figure class="svelte-7ds20c"><!></figure>'), root_5 = /* @__PURE__ */ from_html('<section class="svelte-7ds20c"></section>'), root$a = /* @__PURE__ */ from_html("<!> <!>", 1);
const $$css$c = {
  hash: "svelte-7ds20c",
  code: `figure.svelte-7ds20c {border-bottom:1px solid black;margin:12px 0;padding:0 0 12px 0;}
@media screen and (min-width: 1024px) {figure.svelte-7ds20c {margin:24px 0;padding:0 0 24px 0;}
}section.svelte-7ds20c {margin-bottom:40px;}
@media screen and (min-width: 1024px) {section.svelte-7ds20c {margin-bottom:60px;}
}p.svelte-7ds20c {font-family:Monument Regular, sans-serif;opacity:0.5;margin-bottom:32px;}`
};
function KnitterReviewsList(r, e) {
  push(e, !1), append_styles(r, $$css$c);
  let t = prop(e, "id", 12, void 0), s = prop(e, "isFetchBlock", 12, !1), n = /* @__PURE__ */ mutable_source([]), i = /* @__PURE__ */ mutable_source(!1), o = /* @__PURE__ */ mutable_source(!1);
  const l = async () => {
    if (!t()) return console.error("No id provided");
    const { data: h, error: _ } = await supabase.from("knitter_reviews").select("*").order("created_at", { ascending: !1 }).eq("knitter_id", t());
    h && (set(n, h.map((m) => ({ ...m, created_at: new Date(m.created_at) }))), setTimeout(() => set(i, !0)), set(o, !0));
  };
  legacy_pre_effect(() => (deep_read_state(s()), get$2(o)), () => {
    !s() && !get$2(o) && l();
  }), legacy_pre_effect_reset();
  var c = {
    get id() {
      return t();
    },
    set id(h) {
      t(h), flushSync();
    },
    get isFetchBlock() {
      return s();
    },
    set isFetchBlock(h) {
      s(h), flushSync();
    }
  };
  init();
  var u = root$a(), d = first_child(u);
  TitleType(d, {
    children: (h, _) => {
      next();
      var m = text("Customers feedback");
      append(h, m);
    },
    $$slots: { default: !0 }
  });
  var f = sibling(d, 2);
  {
    var p = (h) => {
      KnitterReviewsListSkeleton(h);
    }, g = (h) => {
      var _ = comment(), m = first_child(_);
      {
        var y = (v) => {
          var b = root_4();
          append(v, b);
        }, w = (v) => {
          var b = root_5();
          each(b, 5, () => get$2(n), index, (S, E) => {
            var A = root_6$1(), I = child(A);
            KnitterReviewItem(I, {
              get review() {
                return get$2(E);
              }
            }), reset(A), append(S, A);
          }), reset(b), transition$1(3, b, () => fade), append(v, b);
        };
        if_block(
          m,
          (v) => {
            get$2(n), untrack(() => get$2(n).length === 0) ? v(y) : v(w, !1);
          },
          !0
        );
      }
      append(h, _);
    };
    if_block(f, (h) => {
      get$2(i) ? h(g, !1) : h(p);
    });
  }
  return append(r, u), pop(c);
}
create_custom_element(KnitterReviewsList, { id: {}, isFetchBlock: {} }, [], [], !0);
var root$9 = /* @__PURE__ */ from_html("<button><!></button>");
const $$css$b = {
  hash: "svelte-18sv61c",
  code: "button.svelte-18sv61c {width:178px;height:52px;background:#018849;cursor:pointer;border:none;color:#fff;font-family:Monument, sans-serif;font-size:16px;letter-spacing:-0.25px;text-transform:uppercase;display:flex;align-items:center;word-break:keep-all;white-space:nowrap;justify-content:center;}.w-full.svelte-18sv61c {width:100%;}.disabled.svelte-18sv61c {opacity:0.5;cursor:default;}"
};
function Button(r, e) {
  push(e, !1), append_styles(r, $$css$b);
  let t = prop(e, "fullWidth", 12, !1), s = prop(e, "disabled", 12, !1), n = prop(e, "type", 12, "button");
  var i = {
    get fullWidth() {
      return t();
    },
    set fullWidth(u) {
      t(u), flushSync();
    },
    get disabled() {
      return s();
    },
    set disabled(u) {
      s(u), flushSync();
    },
    get type() {
      return n();
    },
    set type(u) {
      n(u), flushSync();
    }
  }, o = root$9();
  let l;
  var c = child(o);
  return slot(c, e, "default", {}), reset(o), template_effect(
    (u) => {
      set_attribute(o, "type", n()), o.disabled = s(), l = set_class(o, 1, "svelte-18sv61c", null, l, u);
    },
    [() => ({ "w-full": t(), disabled: s() })]
  ), append(r, o), pop(i);
}
create_custom_element(Button, { fullWidth: {}, disabled: {}, type: {} }, ["default"], [], !0);
var root_3$1 = /* @__PURE__ */ from_html('<p class="error svelte-mkxwwp">There was an error submitting your message. Please try again later.</p>'), root_2$2 = /* @__PURE__ */ from_html('<form action="" class="svelte-mkxwwp"><textarea name="" id="" cols="30" rows="10 " placeholder="Enter your feedback here..." class="svelte-mkxwwp"></textarea> <div class="cta svelte-mkxwwp"><input type="text" placeholder="Enter your name..." class="svelte-mkxwwp"/> <!> <!></div></form>'), root_6 = /* @__PURE__ */ from_html('<p class="success svelte-mkxwwp">Review submitted successfully!</p>'), root$8 = /* @__PURE__ */ from_html("<!> <!>", 1);
const $$css$a = {
  hash: "svelte-mkxwwp",
  code: `input.svelte-mkxwwp {border:none;padding:6px 16px;border-bottom:1px solid black;width:100%;font-size:16px;margin:12px 0;box-sizing:border-box;background:transparent;color:black;}input.svelte-mkxwwp:focus {outline:none;}p.svelte-mkxwwp {font-family:"Monument Regular", sans-serif;padding:8px 16px;}p.success.svelte-mkxwwp {background:#b0beb2;}p.error.svelte-mkxwwp {background:#f6a3a3;}textarea.svelte-mkxwwp {width:100%;aspect-ratio:4/1;border:1px solid black;box-sizing:border-box;resize:none;background:transparent;padding:12px 16px;font-family:"Monument Regular", sans-serif;font-size:16px;color:black;}textarea.svelte-mkxwwp:focus {outline:none;}
@media screen and (min-width: 1024px) {textarea.svelte-mkxwwp {aspect-ratio:8/1;font-size:16px;}
}form.svelte-mkxwwp {display:flex;flex-direction:column;align-items:flex-end;gap:12px;}.cta.svelte-mkxwwp {width:100%;gap:12px;display:grid;grid-template-columns:1fr;grid-template-rows:auto auto;}`
};
function KnitterReviewForm(r, e) {
  push(e, !1), append_styles(r, $$css$a);
  let t = prop(e, "id", 12, void 0), s = /* @__PURE__ */ mutable_source(""), n = /* @__PURE__ */ mutable_source(""), i = /* @__PURE__ */ mutable_source("idle");
  const o = createEventDispatcher(), l = async () => {
    const { error: h } = await supabase.from("knitter_reviews").insert([
      {
        knitter_id: t(),
        body: get$2(n),
        created_by: get$2(s)
      }
    ]);
    h ? set(i, "error") : set(i, "success"), setTimeout(() => o("submit"));
  };
  var c = {
    get id() {
      return t();
    },
    set id(h) {
      t(h), flushSync();
    }
  };
  init();
  var u = root$8(), d = first_child(u);
  TitleType(d, {
    children: (h, _) => {
      next();
      var m = text("Leave a feedback");
      append(h, m);
    },
    $$slots: { default: !0 }
  });
  var f = sibling(d, 2);
  {
    var p = (h) => {
      var _ = root_2$2(), m = child(_);
      remove_textarea_child(m);
      var y = sibling(m, 2), w = child(y);
      remove_input_defaults(w);
      var v = sibling(w, 2);
      {
        var b = (E) => {
          var A = root_3$1();
          append(E, A);
        };
        if_block(v, (E) => {
          get$2(i) === "error" && E(b);
        });
      }
      var S = sibling(v, 2);
      {
        let E = /* @__PURE__ */ derived_safe_equal(() => !get$2(n) || !get$2(s));
        Button(S, {
          type: "submit",
          fullWidth: !0,
          get disabled() {
            return get$2(E);
          },
          children: (A, I) => {
            next();
            var P = text("Leave a feedback");
            append(A, P);
          },
          $$slots: { default: !0 }
        });
      }
      reset(y), reset(_), bind_value(m, () => get$2(n), (E) => set(n, E)), bind_value(w, () => get$2(s), (E) => set(s, E)), event$1("submit", _, preventDefault(l)), append(h, _);
    }, g = (h) => {
      var _ = comment(), m = first_child(_);
      {
        var y = (w) => {
          var v = root_6();
          append(w, v);
        };
        if_block(
          m,
          (w) => {
            get$2(i) === "success" && w(y);
          },
          !0
        );
      }
      append(h, _);
    };
    if_block(f, (h) => {
      get$2(i) === "idle" || get$2(i) === "error" ? h(p) : h(g, !1);
    });
  }
  return append(r, u), pop(c);
}
create_custom_element(KnitterReviewForm, { id: {} }, [], [], !0);
var root$7 = /* @__PURE__ */ from_html('<p class="svelte-1rmj9ox">↑</p>');
const $$css$9 = {
  hash: "svelte-1rmj9ox",
  code: `p.svelte-1rmj9ox {margin:0;font-family:Monument, sans-serif;letter-spacing:-0.43px;color:#000;}
@media (max-width: 812px) {p.svelte-1rmj9ox {letter-spacing:-0.18px;}
}
@media (min-width: 320px) and (max-width: 480px) {p.svelte-1rmj9ox {letter-spacing:-0.18px;}
}`
};
function ArrowIcon(r) {
  append_styles(r, $$css$9);
  var e = root$7();
  append(r, e);
}
create_custom_element(ArrowIcon, {}, [], [], !0);
var root_1$7 = /* @__PURE__ */ from_html("<div><!> <!></div>"), root$6 = /* @__PURE__ */ from_html('<div class="accordion svelte-1mwffhh"><div class="header grid svelte-1mwffhh"><img class="avatar svelte-1mwffhh"/> <h3 class="svelte-1mwffhh"> </h3> <div><!></div></div> <div class="content grid svelte-1mwffhh"><p> </p> <img/> <!></div></div>');
const $$css$8 = {
  hash: "svelte-1mwffhh",
  code: `.accordion.svelte-1mwffhh {display:flex;flex-direction:column;border-bottom:1px solid black;}.fade-in.svelte-1mwffhh {opacity:1;transition:opacity 0.3s 0.3s linear;}.fade-out.svelte-1mwffhh {opacity:0;transition:opacity 0.2s ease;}.grid.svelte-1mwffhh {display:grid;grid-template-columns:65px 1fr 40px;align-items:center;gap:25px;}
@media screen and (min-width: 1024px) {.grid.svelte-1mwffhh {gap:40px;grid-template-columns:124px 5fr 3fr 40px;}
}.header.svelte-1mwffhh {width:100%;grid-template-areas:"avatar name arrow";cursor:pointer;user-select:none;position:relative;z-index:1;padding:12px 0;}
@media screen and (min-width: 1024px) {.header.svelte-1mwffhh {grid-template-areas:"avatar name name arrow";padding:24px 0;}
}.content.svelte-1mwffhh {grid-template-rows:auto;grid-template-areas:"description description description" "photo photo photo" "reviews reviews reviews";overflow:hidden;}
@media screen and (min-width: 1024px) {.content.svelte-1mwffhh {transform:translateY(-144px);grid-template-areas:". description photo ." ". reviews reviews .";}
}.avatar.svelte-1mwffhh {grid-area:avatar;border-radius:100%;width:65px;aspect-ratio:1/1;}
@media screen and (min-width: 1024px) {.avatar.svelte-1mwffhh {width:124px;}
}h3.svelte-1mwffhh {grid-area:name;font-family:Monument, sans-serif;color:black;text-transform:uppercase;font-weight:300;font-size:16px;letter-spacing:-0.19px;line-height:16px;}
@media screen and (min-width: 1024px) {h3.svelte-1mwffhh {font-size:28px;}
}.arrow.svelte-1mwffhh {justify-self:flex-end;font-size:16px;transition:transform 0.3s ease;display:flex;justify-content:center;align-items:center;width:40px;height:40px;transform:rotate(-180deg);}.arrow---down.svelte-1mwffhh {transform:rotate(0);}
@media screen and (min-width: 1024px) {.arrow.svelte-1mwffhh {font-size:24px;}
}p.svelte-1mwffhh {grid-area:description;font-family:Monument Regular, sans-serif;font-size:14px;letter-spacing:-0.22px;line-height:20px;font-weight:400;max-width:600px;margin:16px auto 12px;color:black;transform:translateZ(1px);}
@media screen and (min-width: 1024px) {p.svelte-1mwffhh {font-size:20px;letter-spacing:-0.32px;line-height:32px;padding-right:40px;padding-top:60px;padding-bottom:60px;margin:0px auto 18px;}
}.photo.svelte-1mwffhh {grid-area:photo;width:100%;transform:translateZ(1px);}.reviews.svelte-1mwffhh {grid-area:reviews;margin-bottom:32px;}`
};
function KnittersAccordionItem(r, e) {
  push(e, !1), append_styles(r, $$css$8);
  let t = prop(e, "name", 12, void 0), s = prop(e, "id", 12, void 0), n = prop(e, "description", 12, void 0), i = prop(e, "photo", 12, void 0), o = prop(e, "avatar", 12, void 0), l = !1, c = /* @__PURE__ */ mutable_source(!1), u = /* @__PURE__ */ mutable_source(!1), d = /* @__PURE__ */ mutable_source(), f = /* @__PURE__ */ mutable_source();
  const p = () => {
    set(c, !get$2(c));
  }, g = (j = 150) => {
    if (!get$2(f)) return;
    const X = get$2(f).getBoundingClientRect().top + window.pageYOffset - j;
    window.scrollTo({ top: X, behavior: "smooth" });
  }, h = () => {
    set(u, !1), get$2(d) && (window.innerWidth >= 1024 && g(114), window.innerWidth < 1024 && g(52), mutate(d, get$2(d).style.maxHeight = "inherit"), get$2(d).removeEventListener("transitionend", h));
  }, _ = () => {
    !get$2(c) || !get$2(d) || (set(u, !0), get$2(d).addEventListener("transitionend", h), setTimeout(() => {
      mutate(d, get$2(d).style.maxHeight = `${get$2(d).scrollHeight}px`), mutate(d, get$2(d).style.transition = "max-height .3s ease");
    }), l || (l = !0));
  }, m = () => {
    if (get$2(c) || !get$2(d)) return console.warn("No content element");
    set(u, !0), l && mutate(d, get$2(d).style.maxHeight = `${get$2(d).scrollHeight}px`), setTimeout(() => {
      mutate(d, get$2(d).style.maxHeight = "0px"), mutate(d, get$2(d).style.transition = "max-height .15s ease");
    }), l || (l = !0);
  }, y = () => {
  }, w = () => {
    const j = new URLSearchParams(window.location.search), { knitter: V } = Object.fromEntries(j.entries());
    V === s() && set(c, !0);
  };
  onMount(() => {
    get$2(c) ? _() : m(), w();
  }), legacy_pre_effect(() => get$2(c), () => {
    get$2(c) && _();
  }), legacy_pre_effect(() => get$2(c), () => {
    get$2(c) || m();
  }), legacy_pre_effect_reset();
  var v = {
    get name() {
      return t();
    },
    set name(j) {
      t(j), flushSync();
    },
    get id() {
      return s();
    },
    set id(j) {
      s(j), flushSync();
    },
    get description() {
      return n();
    },
    set description(j) {
      n(j), flushSync();
    },
    get photo() {
      return i();
    },
    set photo(j) {
      i(j), flushSync();
    },
    get avatar() {
      return o();
    },
    set avatar(j) {
      o(j), flushSync();
    }
  };
  init();
  var b = root$6();
  event$1("resize", $window, y);
  var S = child(b), E = child(S), A = sibling(E, 2), I = child(A, !0);
  reset(A);
  var P = sibling(A, 2);
  let O;
  var R = child(P);
  ArrowIcon(R), reset(P), reset(S);
  var C = sibling(S, 2), k = child(C);
  let N;
  var x = child(k, !0);
  reset(k);
  var $ = sibling(k, 2);
  let B;
  var U = sibling($, 2);
  {
    var M = (j) => {
      var V = root_1$7();
      let X;
      var ye = child(V);
      {
        let Oe = /* @__PURE__ */ derived_safe_equal(() => !get$2(c) || get$2(u));
        KnitterReviewsList(ye, {
          get id() {
            return s();
          },
          get isFetchBlock() {
            return get$2(Oe);
          }
        });
      }
      var je = sibling(ye, 2);
      KnitterReviewForm(je, {
        get id() {
          return s();
        }
      }), reset(V), template_effect((Oe) => X = set_class(V, 1, "reviews svelte-1mwffhh", null, X, Oe), [
        () => ({ "fade-in": get$2(c), "fade-out": !get$2(c) })
      ]), append(j, V);
    };
    if_block(U, (j) => {
      s() && j(M);
    });
  }
  return reset(C), bind_this(C, (j) => set(d, j), () => get$2(d)), reset(b), bind_this(b, (j) => set(f, j), () => get$2(f)), template_effect(
    (j, V, X) => {
      set_attribute(E, "src", o()), set_attribute(E, "alt", `Small picture of ${t() ?? ""}`), set_text(I, t()), O = set_class(P, 1, "arrow svelte-1mwffhh", null, O, j), N = set_class(k, 1, "svelte-1mwffhh", null, N, V), set_text(x, n()), B = set_class($, 1, "photo svelte-1mwffhh", null, B, X), set_attribute($, "src", i()), set_attribute($, "alt", `Picture of ${t() ?? ""}`);
    },
    [
      () => ({ "arrow---down": get$2(c) }),
      () => ({ "fade-in": get$2(c), "fade-out": !get$2(c) }),
      () => ({ "fade-in": get$2(c), "fade-out": !get$2(c) })
    ]
  ), event$1("click", S, p), append(r, b), pop(v);
}
customElements.define("knitter-accordion-item", create_custom_element(KnittersAccordionItem, { name: {}, id: {}, description: {}, photo: {}, avatar: {} }, [], [], !0));
var root$5 = /* @__PURE__ */ from_html('<div class="svelte-xwfa80"><!></div>');
const $$css$7 = {
  hash: "svelte-xwfa80",
  code: `div.svelte-xwfa80 {padding:0 8px;

		@media screen and (min-width: 1024px) {padding:0 25px;
		}}`
};
function ContentWrapper(r, e) {
  append_styles(r, $$css$7);
  var t = root$5(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(ContentWrapper, {}, ["default"], [], !0);
var root_1$6 = /* @__PURE__ */ from_html('<section class="title-section svelte-nm0m2i"><h2 class="svelte-nm0m2i">All Knitters</h2></section> <section class="list svelte-nm0m2i"><!></section>', 1), root$4 = /* @__PURE__ */ from_html("<div><!></div>");
const $$css$6 = {
  hash: "svelte-nm0m2i",
  code: `h2.svelte-nm0m2i {font-size:28px;letter-spacing:-0.43px;line-height:18px;font-weight:300;margin:0;}
@media screen and (min-width: 1024px) {h2.svelte-nm0m2i {font-family:Panama, sans-serif;font-size:62px;letter-spacing:-0.95px;line-height:70px;color:#000;}
}.title-section.svelte-nm0m2i {height:93px;border-top:1px solid black;border-bottom:1px solid black;display:flex;align-items:center;}
@media screen and (min-width: 1024px) {.title-section.svelte-nm0m2i {height:241px;justify-content:center;}
}.list.svelte-nm0m2i {display:flex;flex-direction:column;}`
};
function KnittersAccordion(r, e) {
  push(e, !1), append_styles(r, $$css$6);
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
  var n = root$4(), i = child(n);
  ContentWrapper(i, {
    children: (o, l) => {
      var c = root_1$6(), u = sibling(first_child(c), 2), d = child(u);
      slot(d, e, "default", {}), reset(u), append(o, c);
    },
    $$slots: { default: !0 }
  }), reset(n), append(r, n), pop();
}
customElements.define("knitter-accordion", create_custom_element(KnittersAccordion, {}, ["default"], [], !0));
function expoOut(r) {
  return r === 1 ? r : 1 - Math.pow(2, -10 * r);
}
function sineIn(r) {
  const e = Math.cos(r * Math.PI * 0.5);
  return Math.abs(e) < 1e-14 ? 1 : 1 - e;
}
var root_1$5 = /* @__PURE__ */ from_html('<button class="main svelte-1c359or"> </button>'), root_3 = /* @__PURE__ */ from_html('<li role="menuitem"><button class="menuitem svelte-1c359or"> </button></li>'), root_2$1 = /* @__PURE__ */ from_html('<ul role="menu" class="svelte-1c359or"></ul>'), root$3 = /* @__PURE__ */ from_html('<div class="wrapper svelte-1c359or"><!> <div><!></div></div>');
const $$css$5 = {
  hash: "svelte-1c359or",
  code: ".wrapper.svelte-1c359or {display:inline-flex;position:relative;}button.main.svelte-1c359or {background:transparent;padding:8px 16px;border:none;cursor:pointer;width:max-content;font-weight:600;}.dropdown.svelte-1c359or {position:absolute;top:100%;margin-top:8px;}.dropdown.left.svelte-1c359or {left:0;}.dropdown.center.svelte-1c359or {left:50%;transform:translateX(-50%);}.dropdown.right.svelte-1c359or {right:0;}ul.svelte-1c359or {list-style:none;padding:0 0;width:max-content;margin:0;border:1px solid rgba(0, 0, 0, 0.01);}button.menuitem.svelte-1c359or {background:transparent;border:none;padding:8px 16px;transition:background-color 0.3s ease;cursor:pointer;font-weight:600;}button.menuitem.svelte-1c359or:hover {background:rgba(0, 0, 0, 0.05);}"
};
function CurrencySelector(r, e) {
  push(e, !1), append_styles(r, $$css$5);
  const t = () => store_get(displayCurrency, "$displayCurrency", s), [s, n] = setup_stores();
  function i(P, {
    y: O = 100,
    scale: R = 0.5,
    duration: C = 300,
    easing: k = sineIn
    // Try different easing functions
  }) {
    return {
      duration: C,
      easing: k,
      css: (N) => `
        transform:
          scale(${R + (1 - R) * N})
          translateY(${(1 - N) * O}px);
        opacity: ${N};
      `
    };
  }
  let o = prop(e, "params", 12, void 0), l = prop(e, "available", 28, () => []), c = prop(e, "active", 12, void 0), u = prop(e, "left", 12, !0), d = prop(e, "center", 12, !1), f = prop(e, "right", 12, !1), p = prop(e, "bg", 12, "#eeeeea"), g = /* @__PURE__ */ mutable_source(!1), h = /* @__PURE__ */ mutable_source(!1);
  const _ = (P) => {
    set(g, !1), set(h, !0), c(P), displayCurrency.set(P.currency);
  };
  legacy_pre_effect(
    () => (deep_read_state(o()), t(), get$2(h)),
    () => {
      if (o() && t())
        try {
          const { available: P } = JSON.parse(o());
          l(P), c(P.find((O) => O.currency === t()));
        } catch (P) {
          console.error("UI", P);
        }
      else get$2(h) && set(h, !1);
    }
  ), legacy_pre_effect_reset();
  var m = {
    get params() {
      return o();
    },
    set params(P) {
      o(P), flushSync();
    },
    get available() {
      return l();
    },
    set available(P) {
      l(P), flushSync();
    },
    get active() {
      return c();
    },
    set active(P) {
      c(P), flushSync();
    },
    get left() {
      return u();
    },
    set left(P) {
      u(P), flushSync();
    },
    get center() {
      return d();
    },
    set center(P) {
      d(P), flushSync();
    },
    get right() {
      return f();
    },
    set right(P) {
      f(P), flushSync();
    },
    get bg() {
      return p();
    },
    set bg(P) {
      p(P), flushSync();
    }
  };
  init();
  var y = root$3(), w = child(y);
  {
    var v = (P) => {
      var O = root_1$5(), R = child(O);
      reset(O), template_effect(() => set_text(R, `${deep_read_state(c()), untrack(() => c().symbol) ?? ""} ${deep_read_state(c()), untrack(() => c().currency) ?? ""}`)), event$1("click", O, () => set(g, !get$2(g))), append(P, O);
    };
    if_block(w, (P) => {
      c() && P(v);
    });
  }
  var b = sibling(w, 2);
  let S;
  var E = child(b);
  {
    var A = (P) => {
      var O = root_2$1();
      each(O, 5, l, index, (R, C) => {
        var k = root_3(), N = child(k), x = child(N);
        reset(N), reset(k), template_effect(() => set_text(x, `${get$2(C), untrack(() => get$2(C).symbol) ?? ""}
							${get$2(C), untrack(() => get$2(C).currency) ?? ""}`)), event$1("click", N, () => _(get$2(C))), append(R, k);
      }), reset(O), template_effect(() => set_style(O, `background: ${p()}`)), transition$1(3, O, () => i, () => ({ y: -16, scale: 0.95, duration: 250, easing: expoOut })), append(P, O);
    };
    if_block(E, (P) => {
      get$2(g) && P(A);
    });
  }
  reset(b), reset(y), template_effect((P) => S = set_class(b, 1, "dropdown svelte-1c359or", null, S, P), [() => ({ left: u(), center: d(), right: f() })]), append(r, y);
  var I = pop(m);
  return n(), I;
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
var root_1$4 = /* @__PURE__ */ from_html("<div> </div>");
const $$css$4 = {
  hash: "svelte-1ru3l9",
  code: `.discount-percentage.svelte-1ru3l9 {font-family:"Monument", sans-serif;color:rgb(210, 25, 16);}.discount-percentage.small.svelte-1ru3l9 {gap:8px;font-size:16px;letter-spacing:-0.22px;}
@media screen and (max-width: 1024px) {.discount-percentage.small.svelte-1ru3l9 {font-size:12px;gap:4px;}
}.discount-percentage.big.svelte-1ru3l9 {gap:16px;font-size:42px;}
@media screen and (max-width: 1024px) {.discount-percentage.big.svelte-1ru3l9 {font-size:20px;gap:8px;}
}`
};
function ProductDiscountPercentage(r, e) {
  push(e, !1), append_styles(r, $$css$4);
  let t = prop(e, "price", 12, ""), s = prop(e, "compared_at", 12, void 0), n = prop(e, "iso_code", 12, void 0), i = prop(e, "variant_id", 12, void 0), o = prop(e, "theme", 12, "big"), l = /* @__PURE__ */ mutable_source(t()), c = /* @__PURE__ */ mutable_source(s());
  const u = new NexusApi();
  let d = /* @__PURE__ */ mutable_source(), f = prop(e, "discountPercentage", 12);
  const p = async () => {
    if (!n() || !i() || s() && s() !== "nodiscount") return;
    const { amount: y } = await u.getAutomaticDiscount(n(), +i());
    if (!y) return;
    const { formatted: w } = subtractFromPriceWithSymbol(t(), y);
    set(l, t()), set(c, w);
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
    () => (deep_read_state(n()), deep_read_state(i()), deep_read_state(t()), deep_read_state(s())),
    () => {
      n() && i() && t() && (s() || !s()) && p();
    }
  ), legacy_pre_effect_reset();
  var g = {
    get price() {
      return t();
    },
    set price(y) {
      t(y), flushSync();
    },
    get compared_at() {
      return s();
    },
    set compared_at(y) {
      s(y), flushSync();
    },
    get iso_code() {
      return n();
    },
    set iso_code(y) {
      n(y), flushSync();
    },
    get variant_id() {
      return i();
    },
    set variant_id(y) {
      i(y), flushSync();
    },
    get theme() {
      return o();
    },
    set theme(y) {
      o(y), flushSync();
    },
    get discountPercentage() {
      return f();
    },
    set discountPercentage(y) {
      f(y), flushSync();
    }
  };
  init();
  var h = comment(), _ = first_child(h);
  {
    var m = (y) => {
      var w = root_1$4();
      let v;
      var b = child(w);
      reset(w), template_effect(
        (S) => {
          v = set_class(w, 1, "discount-percentage svelte-1ru3l9", null, v, S), set_text(b, `-${f() ?? ""}% off`);
        },
        [
          () => ({
            "has-discount": get$2(d).compared_at && get$2(d).compared_at !== get$2(d).price,
            small: o() === "small",
            big: o() === "big"
          })
        ]
      ), append(y, w);
    };
    if_block(_, (y) => {
      f() && +f() > 0 && y(m);
    });
  }
  return append(r, h), pop(g);
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
`, createStorefrontApiClient = () => {
  throw new Error("VITE_SHOPIFY_SHOP_URL environment variable is not defined");
}, storefrontApi = () => {
  const r = createStorefrontApiClient();
  return {
    createCart: async () => {
      var l, c, u;
      const { data: i, errors: o } = await r.request(createCartMutation);
      if (o)
        throw console.error(o), new Error("Failed to create cart");
      if (((c = (l = i == null ? void 0 : i.cartCreate) == null ? void 0 : l.userErrors) == null ? void 0 : c.length) > 0)
        throw new Error(i.cartCreate.userErrors[0].message);
      return (u = i == null ? void 0 : i.cartCreate) == null ? void 0 : u.cart;
    },
    createCartWithBuyerIdentity: async (i) => {
      var c, u, d;
      const { data: o, errors: l } = await r.request(createCartWithBuyerIdentityMutation, {
        variables: {
          buyerIdentity: {
            countryCode: i
          }
        }
      });
      if (l)
        throw console.error(l), new Error("Failed to create cart");
      if (((u = (c = o == null ? void 0 : o.cartCreate) == null ? void 0 : c.userErrors) == null ? void 0 : u.length) > 0)
        throw new Error(o.cartCreate.userErrors[0].message);
      return (d = o == null ? void 0 : o.cartCreate) == null ? void 0 : d.cart;
    },
    addLineItems: async (i, o) => {
      var u, d, f;
      if (!i) throw new Error("cartId is required");
      if (!o || !o.length) throw new Error("lines are required");
      const { data: l, errors: c } = await r.request(
        addLineItemsMutation,
        {
          variables: {
            cartId: i,
            lines: o.map((p) => ({
              merchandiseId: p.variantGid,
              quantity: p.quantity
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
    getPreOrderMessage: async (i, o) => {
      var f;
      if (!i) throw new Error("variantId is required");
      if (!o) throw new Error("variantId is required");
      const { data: l, errors: c } = await r.request(
        getProductVariantsQuery,
        {
          variables: {
            handle: i
          }
        }
      );
      if (c)
        return console.error(c.graphQLErrors), null;
      if (!(l != null && l.productByHandle)) return null;
      const u = (f = l.productByHandle.variants.edges.find(
        (p) => {
          var g;
          return ((g = p == null ? void 0 : p.node) == null ? void 0 : g.id) === `gid://shopify/ProductVariant/${o}`;
        }
      )) == null ? void 0 : f.node;
      if (!u) return null;
      const { metafield: d } = u;
      return d ? d.value : null;
    }
  };
};
var root_1$3 = /* @__PURE__ */ from_html(`<div class="bg-blue font-sans
						fixed z-10 bottom-[73px] left-0 right-0 text-[10px]
						sm:static sm:text-[14px] tracking-[-0.34px] sm:min-h-[42px] p-[10px] text-black
							"> </div>`), root$2 = /* @__PURE__ */ from_html('<div class="min-h-[42px]"><!></div>');
function PreOrderStrip(r, e) {
  push(e, !1);
  let t = prop(e, "handle", 12, void 0), s = prop(e, "variantId", 12, void 0), n = prop(e, "message", 12, void 0);
  const i = async () => {
    if (!t() || !s()) {
      n(null);
      return;
    }
    n(await storefrontApi().getPreOrderMessage(t(), s()));
  };
  legacy_pre_effect(() => (deep_read_state(t()), deep_read_state(s())), () => {
    t() && s() && i();
  }), legacy_pre_effect_reset();
  var o = {
    get handle() {
      return t();
    },
    set handle(d) {
      t(d), flushSync();
    },
    get variantId() {
      return s();
    },
    set variantId(d) {
      s(d), flushSync();
    },
    get message() {
      return n();
    },
    set message(d) {
      n(d), flushSync();
    }
  };
  init();
  var l = root$2(), c = child(l);
  {
    var u = (d) => {
      var f = root_1$3(), p = child(f, !0);
      reset(f), template_effect(() => set_text(p, n())), transition$1(3, f, () => fly, () => ({ y: 6, duration: 300 })), append(d, f);
    };
    if_block(c, (d) => {
      n() && d(u);
    });
  }
  return reset(l), action(l, (d) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(d)), append(r, l), pop(o);
}
customElements.define("pre-order-strip", create_custom_element(PreOrderStrip, { handle: {}, variantId: {}, message: {} }, [], [], !1));
function ProductForm(r) {
}
create_custom_element(ProductForm, {}, [], [], !0);
var root_1$2 = /* @__PURE__ */ from_html('<table class="svelte-1chxnoo"><tbody><tr><td>cookies</td><td>cart_currency</td><td> </td></tr><tr><td>cookies</td><td>localization</td><td> </td></tr><tr><td>localStorage</td><td>displayCurrency</td><td> </td></tr><tr><td>localStorage</td><td>marketCurrency</td><td> </td></tr><tr><td>localStorage</td><td>localization</td><td> </td></tr></tbody></table>');
const $$css$3 = {
  hash: "svelte-1chxnoo",
  code: "table.svelte-1chxnoo {position:fixed;top:8px;left:8px;z-index:10000;background:black;color:white;padding:5px;font-size:12px;}"
};
function DevMarketDetails(r, e) {
  push(e, !0), append_styles(r, $$css$3);
  const t = () => store_get(displayCurrency, "$displayCurrency", i), s = () => store_get(marketCurrency, "$marketCurrency", i), n = () => store_get(localization, "$localization", i), [i, o] = setup_stores(), l = prop(e, "show", 7, !1);
  var c = {
    get show() {
      return l();
    },
    set show(g = !1) {
      l(g), flushSync();
    }
  }, u = comment(), d = first_child(u);
  {
    var f = (g) => {
      var h = root_1$2(), _ = child(h), m = child(_), y = sibling(child(m), 2), w = child(y, !0);
      reset(y), reset(m);
      var v = sibling(m), b = sibling(child(v), 2), S = child(b, !0);
      reset(b), reset(v);
      var E = sibling(v), A = sibling(child(E), 2), I = child(A, !0);
      reset(A), reset(E);
      var P = sibling(E), O = sibling(child(P), 2), R = child(O, !0);
      reset(O), reset(P);
      var C = sibling(P), k = sibling(child(C), 2), N = child(k, !0);
      reset(k), reset(C), reset(_), reset(h), template_effect(
        (x, $) => {
          set_text(w, x), set_text(S, $), set_text(I, t()), set_text(R, s()), set_text(N, n());
        },
        [
          () => getCookie("cart_currency"),
          () => getCookie("localization")
        ]
      ), append(g, h);
    };
    if_block(d, (g) => {
      l() && g(f);
    });
  }
  append(r, u);
  var p = pop(c);
  return o(), p;
}
customElements.define("dev-market-details", create_custom_element(DevMarketDetails, { show: {} }, [], [], !0));
function onChange(r, e) {
  const s = r.target.value;
  e(s);
}
var root_2 = /* @__PURE__ */ from_html('<textarea class="cart-note svelte-1al8qmo" placeholder="Leave a note about your order"></textarea>');
const $$css$2 = {
  hash: "svelte-1al8qmo",
  code: "textarea.cart-note.svelte-1al8qmo {border:1px solid black;width:100%;height:100px;padding:10px 10px;font-size:14px;line-height:1.2;resize:none;}"
};
function CartNote(r, e) {
  push(e, !0), append_styles(r, $$css$2);
  const t = prop(e, "isCartEmpty", 7), s = /* @__PURE__ */ user_derived(() => t() === "false");
  localStorage.getItem("staging");
  const n = /* @__PURE__ */ user_derived(() => !0);
  function i(h, _) {
    let m;
    return (...y) => {
      clearTimeout(m), m = setTimeout(() => h.apply(this, y), _);
    };
  }
  const l = i((h) => {
    fetch("/cart/update.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: h })
    }).then((_) => _.json()).then((_) => {
      console.log("Cart note updated:", _);
    }).catch((_) => {
      console.error("Error:", _);
    });
  }, 500);
  let c = /* @__PURE__ */ state("");
  const u = () => {
    const { cart: h } = window.CartJS || {};
    if (!h) return;
    const { note: _ } = h;
    _ && set(c, _, !0);
  };
  onMount(() => (u(), globalThis.$(document).on("cart.ready", u), () => {
    globalThis.$(document).off("cart.ready", u);
  }));
  var d = {
    get isCartEmpty() {
      return t();
    },
    set isCartEmpty(h) {
      t(h), flushSync();
    }
  }, f = comment(), p = first_child(f);
  {
    var g = (h) => {
      var _ = comment(), m = first_child(_);
      {
        var y = (w) => {
          var v = root_2();
          remove_textarea_child(v), v.__input = [onChange, l], bind_value(v, () => get$2(c), (b) => set(c, b)), append(w, v);
        };
        if_block(m, (w) => {
          get$2(s) && w(y);
        });
      }
      append(h, _);
    };
    if_block(p, (h) => {
      get$2(n) && h(g);
    });
  }
  return append(r, f), pop(d);
}
delegate(["input"]);
customElements.define("cart-note", create_custom_element(CartNote, { isCartEmpty: {} }, [], [], !1));
function Mousewheel(r) {
  let {
    swiper: e,
    extendParams: t,
    on: s,
    emit: n
  } = r;
  const i = getWindow();
  t({
    mousewheel: {
      enabled: !1,
      releaseOnEdges: !1,
      invert: !1,
      forceToAxis: !1,
      sensitivity: 1,
      eventsTarget: "container",
      thresholdDelta: null,
      thresholdTime: null,
      noMousewheelClass: "swiper-no-mousewheel"
    }
  }), e.mousewheel = {
    enabled: !1
  };
  let o, l = now(), c;
  const u = [];
  function d(v) {
    let A = 0, I = 0, P = 0, O = 0;
    return "detail" in v && (I = v.detail), "wheelDelta" in v && (I = -v.wheelDelta / 120), "wheelDeltaY" in v && (I = -v.wheelDeltaY / 120), "wheelDeltaX" in v && (A = -v.wheelDeltaX / 120), "axis" in v && v.axis === v.HORIZONTAL_AXIS && (A = I, I = 0), P = A * 10, O = I * 10, "deltaY" in v && (O = v.deltaY), "deltaX" in v && (P = v.deltaX), v.shiftKey && !P && (P = O, O = 0), (P || O) && v.deltaMode && (v.deltaMode === 1 ? (P *= 40, O *= 40) : (P *= 800, O *= 800)), P && !A && (A = P < 1 ? -1 : 1), O && !I && (I = O < 1 ? -1 : 1), {
      spinX: A,
      spinY: I,
      pixelX: P,
      pixelY: O
    };
  }
  function f() {
    e.enabled && (e.mouseEntered = !0);
  }
  function p() {
    e.enabled && (e.mouseEntered = !1);
  }
  function g(v) {
    return e.params.mousewheel.thresholdDelta && v.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && now() - l < e.params.mousewheel.thresholdTime ? !1 : v.delta >= 6 && now() - l < 60 ? !0 : (v.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), n("scroll", v.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), n("scroll", v.raw)), l = new i.Date().getTime(), !1);
  }
  function h(v) {
    const b = e.params.mousewheel;
    if (v.direction < 0) {
      if (e.isEnd && !e.params.loop && b.releaseOnEdges)
        return !0;
    } else if (e.isBeginning && !e.params.loop && b.releaseOnEdges)
      return !0;
    return !1;
  }
  function _(v) {
    let b = v, S = !0;
    if (!e.enabled || v.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)) return;
    const E = e.params.mousewheel;
    e.params.cssMode && b.preventDefault();
    let A = e.el;
    e.params.mousewheel.eventsTarget !== "container" && (A = document.querySelector(e.params.mousewheel.eventsTarget));
    const I = A && A.contains(b.target);
    if (!e.mouseEntered && !I && !E.releaseOnEdges) return !0;
    b.originalEvent && (b = b.originalEvent);
    let P = 0;
    const O = e.rtlTranslate ? -1 : 1, R = d(b);
    if (E.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(R.pixelX) > Math.abs(R.pixelY)) P = -R.pixelX * O;
        else return !0;
      else if (Math.abs(R.pixelY) > Math.abs(R.pixelX)) P = -R.pixelY;
      else return !0;
    else
      P = Math.abs(R.pixelX) > Math.abs(R.pixelY) ? -R.pixelX * O : -R.pixelY;
    if (P === 0) return !0;
    E.invert && (P = -P);
    let C = e.getTranslate() + P * E.sensitivity;
    if (C >= e.minTranslate() && (C = e.minTranslate()), C <= e.maxTranslate() && (C = e.maxTranslate()), S = e.params.loop ? !0 : !(C === e.minTranslate() || C === e.maxTranslate()), S && e.params.nested && b.stopPropagation(), !e.params.freeMode || !e.params.freeMode.enabled) {
      const k = {
        time: now(),
        delta: Math.abs(P),
        direction: Math.sign(P),
        raw: v
      };
      u.length >= 2 && u.shift();
      const N = u.length ? u[u.length - 1] : void 0;
      if (u.push(k), N ? (k.direction !== N.direction || k.delta > N.delta || k.time > N.time + 150) && g(k) : g(k), h(k))
        return !0;
    } else {
      const k = {
        time: now(),
        delta: Math.abs(P),
        direction: Math.sign(P)
      }, N = c && k.time < c.time + 500 && k.delta <= c.delta && k.direction === c.direction;
      if (!N) {
        c = void 0;
        let x = e.getTranslate() + P * E.sensitivity;
        const $ = e.isBeginning, B = e.isEnd;
        if (x >= e.minTranslate() && (x = e.minTranslate()), x <= e.maxTranslate() && (x = e.maxTranslate()), e.setTransition(0), e.setTranslate(x), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!$ && e.isBeginning || !B && e.isEnd) && e.updateSlidesClasses(), e.params.loop && e.loopFix({
          direction: k.direction < 0 ? "next" : "prev",
          byMousewheel: !0
        }), e.params.freeMode.sticky) {
          clearTimeout(o), o = void 0, u.length >= 15 && u.shift();
          const U = u.length ? u[u.length - 1] : void 0, M = u[0];
          if (u.push(k), U && (k.delta > U.delta || k.direction !== U.direction))
            u.splice(0);
          else if (u.length >= 15 && k.time - M.time < 500 && M.delta - k.delta >= 1 && k.delta <= 6) {
            const j = P > 0 ? 0.8 : 0.2;
            c = k, u.splice(0), o = nextTick(() => {
              e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, j);
            }, 0);
          }
          o || (o = nextTick(() => {
            if (e.destroyed || !e.params) return;
            const j = 0.5;
            c = k, u.splice(0), e.slideToClosest(e.params.speed, !0, void 0, j);
          }, 500));
        }
        if (N || n("scroll", b), e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(), E.releaseOnEdges && (x === e.minTranslate() || x === e.maxTranslate()))
          return !0;
      }
    }
    return b.preventDefault ? b.preventDefault() : b.returnValue = !1, !1;
  }
  function m(v) {
    let b = e.el;
    e.params.mousewheel.eventsTarget !== "container" && (b = document.querySelector(e.params.mousewheel.eventsTarget)), b[v]("mouseenter", f), b[v]("mouseleave", p), b[v]("wheel", _);
  }
  function y() {
    return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", _), !0) : e.mousewheel.enabled ? !1 : (m("addEventListener"), e.mousewheel.enabled = !0, !0);
  }
  function w() {
    return e.params.cssMode ? (e.wrapperEl.addEventListener(event, _), !0) : e.mousewheel.enabled ? (m("removeEventListener"), e.mousewheel.enabled = !1, !0) : !1;
  }
  s("init", () => {
    !e.params.mousewheel.enabled && e.params.cssMode && w(), e.params.mousewheel.enabled && y();
  }), s("destroy", () => {
    e.params.cssMode && y(), e.mousewheel.enabled && w();
  }), Object.assign(e.mousewheel, {
    enable: y,
    disable: w
  });
}
function createElementIfNotDefined(r, e, t, s) {
  return r.params.createElements && Object.keys(s).forEach((n) => {
    if (!t[n] && t.auto === !0) {
      let i = elementChildren(r.el, `.${s[n]}`)[0];
      i || (i = createElement("div", s[n]), i.className = s[n], r.el.append(i)), t[n] = i, e[n] = i;
    }
  }), t;
}
function classesToSelector(r) {
  return r === void 0 && (r = ""), `.${r.trim().replace(/([\.:!+\/()[\]])/g, "\\$1").replace(/ /g, ".")}`;
}
function Scrollbar(r) {
  let {
    swiper: e,
    extendParams: t,
    on: s,
    emit: n
  } = r;
  const i = getDocument();
  let o = !1, l = null, c = null, u, d, f, p;
  t({
    scrollbar: {
      el: null,
      dragSize: "auto",
      hide: !1,
      draggable: !1,
      snapOnRelease: !0,
      lockClass: "swiper-scrollbar-lock",
      dragClass: "swiper-scrollbar-drag",
      scrollbarDisabledClass: "swiper-scrollbar-disabled",
      horizontalClass: "swiper-scrollbar-horizontal",
      verticalClass: "swiper-scrollbar-vertical"
    }
  }), e.scrollbar = {
    el: null,
    dragEl: null
  };
  function g() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const {
      scrollbar: C,
      rtlTranslate: k
    } = e, {
      dragEl: N,
      el: x
    } = C, $ = e.params.scrollbar, B = e.params.loop ? e.progressLoop : e.progress;
    let U = d, M = (f - d) * B;
    k ? (M = -M, M > 0 ? (U = d - M, M = 0) : -M + d > f && (U = f + M)) : M < 0 ? (U = d + M, M = 0) : M + d > f && (U = f - M), e.isHorizontal() ? (N.style.transform = `translate3d(${M}px, 0, 0)`, N.style.width = `${U}px`) : (N.style.transform = `translate3d(0px, ${M}px, 0)`, N.style.height = `${U}px`), $.hide && (clearTimeout(l), x.style.opacity = 1, l = setTimeout(() => {
      x.style.opacity = 0, x.style.transitionDuration = "400ms";
    }, 1e3));
  }
  function h(C) {
    !e.params.scrollbar.el || !e.scrollbar.el || (e.scrollbar.dragEl.style.transitionDuration = `${C}ms`);
  }
  function _() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const {
      scrollbar: C
    } = e, {
      dragEl: k,
      el: N
    } = C;
    k.style.width = "", k.style.height = "", f = e.isHorizontal() ? N.offsetWidth : N.offsetHeight, p = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), e.params.scrollbar.dragSize === "auto" ? d = f * p : d = parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? k.style.width = `${d}px` : k.style.height = `${d}px`, p >= 1 ? N.style.display = "none" : N.style.display = "", e.params.scrollbar.hide && (N.style.opacity = 0), e.params.watchOverflow && e.enabled && C.el.classList[e.isLocked ? "add" : "remove"](e.params.scrollbar.lockClass);
  }
  function m(C) {
    return e.isHorizontal() ? C.clientX : C.clientY;
  }
  function y(C) {
    const {
      scrollbar: k,
      rtlTranslate: N
    } = e, {
      el: x
    } = k;
    let $;
    $ = (m(C) - elementOffset(x)[e.isHorizontal() ? "left" : "top"] - (u !== null ? u : d / 2)) / (f - d), $ = Math.max(Math.min($, 1), 0), N && ($ = 1 - $);
    const B = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * $;
    e.updateProgress(B), e.setTranslate(B), e.updateActiveIndex(), e.updateSlidesClasses();
  }
  function w(C) {
    const k = e.params.scrollbar, {
      scrollbar: N,
      wrapperEl: x
    } = e, {
      el: $,
      dragEl: B
    } = N;
    o = !0, u = C.target === B ? m(C) - C.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, C.preventDefault(), C.stopPropagation(), x.style.transitionDuration = "100ms", B.style.transitionDuration = "100ms", y(C), clearTimeout(c), $.style.transitionDuration = "0ms", k.hide && ($.style.opacity = 1), e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"), n("scrollbarDragStart", C);
  }
  function v(C) {
    const {
      scrollbar: k,
      wrapperEl: N
    } = e, {
      el: x,
      dragEl: $
    } = k;
    o && (C.preventDefault && C.cancelable ? C.preventDefault() : C.returnValue = !1, y(C), N.style.transitionDuration = "0ms", x.style.transitionDuration = "0ms", $.style.transitionDuration = "0ms", n("scrollbarDragMove", C));
  }
  function b(C) {
    const k = e.params.scrollbar, {
      scrollbar: N,
      wrapperEl: x
    } = e, {
      el: $
    } = N;
    o && (o = !1, e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "", x.style.transitionDuration = ""), k.hide && (clearTimeout(c), c = nextTick(() => {
      $.style.opacity = 0, $.style.transitionDuration = "400ms";
    }, 1e3)), n("scrollbarDragEnd", C), k.snapOnRelease && e.slideToClosest());
  }
  function S(C) {
    const {
      scrollbar: k,
      params: N
    } = e, x = k.el;
    if (!x) return;
    const $ = x, B = N.passiveListeners ? {
      passive: !1,
      capture: !1
    } : !1, U = N.passiveListeners ? {
      passive: !0,
      capture: !1
    } : !1;
    if (!$) return;
    const M = C === "on" ? "addEventListener" : "removeEventListener";
    $[M]("pointerdown", w, B), i[M]("pointermove", v, B), i[M]("pointerup", b, U);
  }
  function E() {
    !e.params.scrollbar.el || !e.scrollbar.el || S("on");
  }
  function A() {
    !e.params.scrollbar.el || !e.scrollbar.el || S("off");
  }
  function I() {
    const {
      scrollbar: C,
      el: k
    } = e;
    e.params.scrollbar = createElementIfNotDefined(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: "swiper-scrollbar"
    });
    const N = e.params.scrollbar;
    if (!N.el) return;
    let x;
    if (typeof N.el == "string" && e.isElement && (x = e.el.querySelector(N.el)), !x && typeof N.el == "string") {
      if (x = i.querySelectorAll(N.el), !x.length) return;
    } else x || (x = N.el);
    e.params.uniqueNavElements && typeof N.el == "string" && x.length > 1 && k.querySelectorAll(N.el).length === 1 && (x = k.querySelector(N.el)), x.length > 0 && (x = x[0]), x.classList.add(e.isHorizontal() ? N.horizontalClass : N.verticalClass);
    let $;
    x && ($ = x.querySelector(classesToSelector(e.params.scrollbar.dragClass)), $ || ($ = createElement("div", e.params.scrollbar.dragClass), x.append($))), Object.assign(C, {
      el: x,
      dragEl: $
    }), N.draggable && E(), x && x.classList[e.enabled ? "remove" : "add"](...classesToTokens(e.params.scrollbar.lockClass));
  }
  function P() {
    const C = e.params.scrollbar, k = e.scrollbar.el;
    k && k.classList.remove(...classesToTokens(e.isHorizontal() ? C.horizontalClass : C.verticalClass)), A();
  }
  s("changeDirection", () => {
    if (!e.scrollbar || !e.scrollbar.el) return;
    const C = e.params.scrollbar;
    let {
      el: k
    } = e.scrollbar;
    k = makeElementsArray(k), k.forEach((N) => {
      N.classList.remove(C.horizontalClass, C.verticalClass), N.classList.add(e.isHorizontal() ? C.horizontalClass : C.verticalClass);
    });
  }), s("init", () => {
    e.params.scrollbar.enabled === !1 ? R() : (I(), _(), g());
  }), s("update resize observerUpdate lock unlock changeDirection", () => {
    _();
  }), s("setTranslate", () => {
    g();
  }), s("setTransition", (C, k) => {
    h(k);
  }), s("enable disable", () => {
    const {
      el: C
    } = e.scrollbar;
    C && C.classList[e.enabled ? "remove" : "add"](...classesToTokens(e.params.scrollbar.lockClass));
  }), s("destroy", () => {
    P();
  });
  const O = () => {
    e.el.classList.remove(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.remove(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), I(), _(), g();
  }, R = () => {
    e.el.classList.add(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.add(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), P();
  };
  Object.assign(e.scrollbar, {
    enable: O,
    disable: R,
    updateSize: _,
    setTranslate: g,
    init: I,
    destroy: P
  });
}
var root_1$1 = /* @__PURE__ */ from_html('<div class="swiper-slide svelte-1vei7h4"><a class="color-selector--link svelte-1vei7h4"><img alt="img"/></a></div>'), root$1 = /* @__PURE__ */ from_html('<section><div><div class="swiper-wrapper"></div> <div class="swiper-scrollbar"></div></div></section>');
const $$css$1 = {
  hash: "svelte-1vei7h4",
  code: `.swiper.svelte-1vei7h4 {width:calc(100% - 25px);margin:0;overflow:visible;line-height:0;opacity:0;height:0;transition:opacity 0.3s ease;}.swiper--inited.svelte-1vei7h4 {height:auto;opacity:1;}.color-selector--link.svelte-1vei7h4 {display:inline-block;}.swiper-slide.svelte-1vei7h4 {width:64px;}
@media screen and (max-width: 767px) {.swiper-slide.svelte-1vei7h4 {width:44px;}
}.color-selector--image.svelte-1vei7h4 {min-width:64px;height:64px;border-radius:5px;}
@media screen and (max-width: 767px) {.color-selector--image.svelte-1vei7h4 {min-width:44px;height:44px;}
}.color-selector--image.active.svelte-1vei7h4 {outline:2px solid black;outline-offset:-2px;}:root {--swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.2);--swiper-scrollbar-sides-offset: 0;}.swiper-scrollbar {transform:scaleX(0.95);}.swiper-scrollbar {transition:opacity 0.3s ease;}.swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal {width:100% !important;}.swiper-scrollbar-drag {background:rgba(0, 0, 0, 0.3);border-radius:10px;cursor:grab;}.swiper-scrollbar-drag:active {cursor:grabbing;}`
};
function ColorSelector(r, e) {
  push(e, !0), append_styles(r, $$css$1);
  let t = prop(e, "activeId", 7), s = prop(e, "list", 7), n = /* @__PURE__ */ user_derived(() => {
    try {
      return s() ? JSON.parse(s()) : [];
    } catch (_) {
      return console.error("Failed parsing JSON.", _), [];
    }
  }), i = /* @__PURE__ */ state(void 0), o = /* @__PURE__ */ state(void 0), l = /* @__PURE__ */ state(!1), c = /* @__PURE__ */ user_derived(() => {
    if (!get$2(n) || !t()) return 0;
    const _ = get$2(n).findIndex((m) => +m.id == +t());
    return _ !== -1 ? _ : 0;
  });
  const u = () => {
    get$2(i) && set(
      o,
      new Swiper(get$2(i), {
        modules: [Scrollbar, Mousewheel],
        slidesPerView: "auto",
        spaceBetween: 8,
        scrollbar: { el: ".swiper-scrollbar", draggable: !0 },
        mousewheel: {
          enabled: !0,
          forceToAxis: !1,
          // Forces horizontal scrolling even on vertical wheel movement
          sensitivity: 1,
          // Adjust sensitivity (optional)
          releaseOnEdges: !0
          // Prevents page scroll when reaching swiper edges
        },
        on: {
          init: (_) => {
            setTimeout(
              () => {
                _.virtualSize > _.size && get$2(c) > 0 && _.slideTo(get$2(
                  c
                  // 300ms transition
                ), 0), console.log("dump", get$2(o)), set(l, !0);
              },
              100
            );
          }
        }
      }),
      !0
    );
  };
  user_effect(() => {
    get$2(i) && u();
  });
  var d = {
    get activeId() {
      return t();
    },
    set activeId(_) {
      t(_), flushSync();
    },
    get list() {
      return s();
    },
    set list(_) {
      s(_), flushSync();
    }
  }, f = root$1(), p = child(f);
  let g;
  var h = child(p);
  return each(h, 21, () => get$2(n), index, (_, m) => {
    var y = root_1$1(), w = child(y), v = child(w);
    let b;
    reset(w), reset(y), template_effect(
      (S) => {
        var E;
        set_attribute(w, "href", get$2(m).url), b = set_class(v, 1, "color-selector--image svelte-1vei7h4", null, b, S), set_attribute(v, "src", (E = get$2(m)) == null ? void 0 : E.images[0]);
      },
      [() => ({ active: +get$2(m).id == +t() })]
    ), append(_, y);
  }), reset(h), next(2), reset(p), bind_this(p, (_) => set(i, _), () => get$2(i)), reset(f), action(f, (_, m) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(_, m), () => get$2(l)), template_effect((_) => g = set_class(p, 1, "swiper color-selector--swiper-wrapper svelte-1vei7h4", null, g, _), [() => ({ "swiper--inited": get$2(l) })]), append(r, f), pop(d);
}
customElements.define("color-selector", create_custom_element(ColorSelector, { activeId: {}, list: {} }, [], [], !1));
var root_1 = /* @__PURE__ */ from_html("<a> </a>"), root = /* @__PURE__ */ from_html('<div class="size-selector svelte-nkwbzs"></div>');
const $$css = {
  hash: "svelte-nkwbzs",
  code: `.size-selector.svelte-nkwbzs {line-height:0;display:flex;gap:8px;flex-wrap:wrap;}.pill.svelte-nkwbzs {font-family:"Monument", sans-serif;font-size:16px;letter-spacing:-0.15px;text-transform:uppercase;line-height:100%;display:block;color:black;text-decoration:none;border:1px solid black;border-radius:20px;padding:4px 24px;cursor:pointer;transition:background 0.2s ease;}.pill.svelte-nkwbzs:hover:not(.active) {background:rgba(0, 0, 0, 0.1);}.pill.active.svelte-nkwbzs {background:#000;color:#fff;}
@media screen and (max-width: 767px) {.pill.svelte-nkwbzs {font-size:14px;}
}`
};
function SizeSelector(r, e) {
  push(e, !0), append_styles(r, $$css);
  let t = prop(e, "activeId", 7), s = prop(e, "list", 7), n = /* @__PURE__ */ user_derived(() => {
    try {
      return JSON.parse(s());
    } catch (l) {
      return console.error(l), [];
    }
  });
  var i = {
    get activeId() {
      return t();
    },
    set activeId(l) {
      t(l), flushSync();
    },
    get list() {
      return s();
    },
    set list(l) {
      s(l), flushSync();
    }
  }, o = root();
  return each(o, 21, () => get$2(n), index, (l, c) => {
    var u = root_1();
    let d;
    var f = child(u, !0);
    reset(u), template_effect(
      (p) => {
        set_attribute(u, "href", get$2(c).url), d = set_class(u, 1, "pill svelte-nkwbzs", null, d, p), set_text(f, get$2(c).label);
      },
      [() => ({ active: +get$2(c).id == +t() })]
    ), append(l, u);
  }), reset(o), action(o, (l) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(l)), append(r, o), pop(i);
}
customElements.define("size-selector", create_custom_element(SizeSelector, { activeId: {}, list: {} }, [], [], !1));
typeof window < "u" && (window.UI = {
  stores: {
    displayCurrency,
    marketCurrency
  },
  actions: {}
}, window.footerScripts = mainFooter, window.getAutomaticDiscount = getAutomaticDiscount, window.cartItemToPreorderCartItem = cartItemToPreorderCartItem);
mainHead();
export {
  BUY_BUTTONS_CONFIG,
  BuyButtonsManager,
  CTAManager,
  CartNote,
  CartRecommendationCard,
  ColorSelector,
  CurrencySelector,
  DevMarketDetails,
  FooterCTAManager,
  KnittersAccordion,
  KnittersAccordionItem,
  PreOrderStrip,
  PriceManager,
  ProductDiscountPercentage,
  ProductForm,
  ProductPrice,
  ResponsiveManager,
  SizeSelector,
  getAutomaticDiscount
};
