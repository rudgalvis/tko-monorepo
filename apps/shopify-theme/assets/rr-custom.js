var ge = Object.defineProperty;
var fe = (r) => {
  throw TypeError(r);
};
var ve = (r, e, t) => e in r ? ge(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var U = (r, e, t) => ve(r, typeof e != "symbol" ? e + "" : e, t), ue = (r, e, t) => e.has(r) || fe("Cannot " + t);
var L = (r, e, t) => (ue(r, e, "read from private field"), t ? t.call(r) : e.get(r)), B = (r, e, t) => e.has(r) ? fe("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), F = (r, e, t, s) => (ue(r, e, "write to private field"), s ? s.call(r, t) : e.set(r, t), t), Y = (r, e, t) => (ue(r, e, "access private method"), t);
const isBrowser$1 = typeof window < "u", DEV = !1;
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
  var r, e, t = new Promise((s, i) => {
    r = s, e = i;
  });
  return { promise: t, resolve: r, reject: e };
}
const DERIVED = 2, EFFECT = 4, RENDER_EFFECT = 8, BLOCK_EFFECT = 16, BRANCH_EFFECT = 32, ROOT_EFFECT = 64, BOUNDARY_EFFECT = 128, UNOWNED = 256, DISCONNECTED = 512, CLEAN = 1024, DIRTY = 2048, MAYBE_DIRTY = 4096, INERT = 8192, DESTROYED = 16384, EFFECT_RAN = 32768, EFFECT_TRANSPARENT = 65536, INSPECT_EFFECT = 1 << 17, HEAD_EFFECT = 1 << 18, EFFECT_PRESERVED = 1 << 19, USER_EFFECT = 1 << 20, REACTION_IS_UPDATING = 1 << 21, ASYNC = 1 << 22, ERROR_VALUE = 1 << 23, STATE_SYMBOL = Symbol("$state"), LEGACY_PROPS = Symbol("legacy props"), LOADING_ATTR_SYMBOL = Symbol(""), STALE_REACTION = new class extends Error {
  constructor() {
    super(...arguments);
    U(this, "name", "StaleReactionError");
    U(this, "message", "The reaction that called `getAbortSignal()` was re-run or destroyed");
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
function await_outside_boundary() {
  throw new Error("https://svelte.dev/e/await_outside_boundary");
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
    if (e.nodeType === COMMENT_NODE) {
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
  var t = /* @__PURE__ */ new Map(), s = is_array(r), i = /* @__PURE__ */ state(0), n = update_version, o = (l) => {
    if (update_version === n)
      return l();
    var c = active_reaction, u = update_version;
    set_active_reaction(null), set_update_version(n);
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
            t.set(c, d), increment(i);
          }
        } else
          set(u, UNINITIALIZED), increment(i);
        return !0;
      },
      get(l, c, u) {
        var p;
        if (c === STATE_SYMBOL)
          return r;
        var d = t.get(c), f = c in l;
        if (d === void 0 && (!f || (p = get_descriptor(l, c)) != null && p.writable) && (d = o(() => {
          var h = proxy(f ? l[c] : UNINITIALIZED), g = /* @__PURE__ */ state(h);
          return g;
        }), t.set(c, d)), d !== void 0) {
          var _ = get$2(d);
          return _ === UNINITIALIZED ? void 0 : _;
        }
        return Reflect.get(l, c, u);
      },
      getOwnPropertyDescriptor(l, c) {
        var u = Reflect.getOwnPropertyDescriptor(l, c);
        if (u && "value" in u) {
          var d = t.get(c);
          d && (u.value = get$2(d));
        } else if (u === void 0) {
          var f = t.get(c), _ = f == null ? void 0 : f.v;
          if (f !== void 0 && _ !== UNINITIALIZED)
            return {
              enumerable: !0,
              configurable: !0,
              value: _,
              writable: !0
            };
        }
        return u;
      },
      has(l, c) {
        var _;
        if (c === STATE_SYMBOL)
          return !0;
        var u = t.get(c), d = u !== void 0 && u.v !== UNINITIALIZED || Reflect.has(l, c);
        if (u !== void 0 || active_effect !== null && (!d || (_ = get_descriptor(l, c)) != null && _.writable)) {
          u === void 0 && (u = o(() => {
            var p = d ? proxy(l[c]) : UNINITIALIZED, h = /* @__PURE__ */ state(p);
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
        var f = t.get(c), _ = c in l;
        if (s && c === "length")
          for (var p = u; p < /** @type {Source<number>} */
          f.v; p += 1) {
            var h = t.get(p + "");
            h !== void 0 ? set(h, UNINITIALIZED) : p in l && (h = o(() => /* @__PURE__ */ state(UNINITIALIZED)), t.set(p + "", h));
          }
        if (f === void 0)
          (!_ || (v = get_descriptor(l, c)) != null && v.writable) && (f = o(() => /* @__PURE__ */ state(void 0)), set(f, proxy(u)), t.set(c, f));
        else {
          _ = f.v !== UNINITIALIZED;
          var g = o(() => proxy(u));
          set(f, g);
        }
        var m = Reflect.getOwnPropertyDescriptor(l, c);
        if (m != null && m.set && m.set.call(d, u), !_) {
          if (s && typeof c == "string") {
            var y = (
              /** @type {Source<number>} */
              t.get("length")
            ), w = Number(c);
            Number.isInteger(w) && w >= y.v && set(y, w + 1);
          }
          increment(i);
        }
        return !0;
      },
      ownKeys(l) {
        get$2(i);
        var c = Reflect.ownKeys(l).filter((f) => {
          var _ = t.get(f);
          return _ === void 0 || _.v !== UNINITIALIZED;
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
  if (t && (s == null ? void 0 : s.nodeType) !== TEXT_NODE) {
    var n = create_text();
    return s === null ? i == null || i.after(n) : s.before(n), set_hydrate_node(n), n;
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
const request_idle_callback = typeof requestIdleCallback > "u" ? (r) => setTimeout(r, 1) : requestIdleCallback;
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
function get_pending_boundary() {
  for (var r = (
    /** @type {Effect} */
    active_effect.b
  ); r !== null && !r.has_pending_snippet(); )
    r = r.parent;
  return r === null && await_outside_boundary(), r;
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
  ), i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), n = source(
    /** @type {V} */
    UNINITIALIZED
  ), o = null, l = !active_reaction;
  return async_effect(() => {
    try {
      var c = r();
    } catch (p) {
      c = Promise.reject(p);
    }
    var u = () => c;
    i = (o == null ? void 0 : o.then(u, u)) ?? Promise.resolve(c), o = i;
    var d = (
      /** @type {Batch} */
      current_batch
    ), f = s.pending;
    l && (s.update_pending_count(1), f || d.increment());
    const _ = (p, h = void 0) => {
      o = null, f || d.activate(), h ? h !== STALE_REACTION && (n.f |= ERROR_VALUE, internal_set(n, h)) : (n.f & ERROR_VALUE && (n.f ^= ERROR_VALUE), internal_set(n, p)), l && (s.update_pending_count(-1), f || d.decrement()), unset_context();
    };
    if (i.then(_, (p) => _(null, p || "unknown")), d)
      return () => {
        queueMicrotask(() => d.neuter());
      };
  }), new Promise((c) => {
    function u(d) {
      function f() {
        d === i ? c(n) : u(i);
      }
      d.then(f, f);
    }
    u(i);
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
    destroy_derived_effects(r), e = update_reaction(r);
  } finally {
    set_active_effect(t);
  }
  return e;
}
function update_derived(r) {
  var e = execute_derived(r);
  if (r.equals(e) || (r.v = e, r.wv = increment_write_version()), !is_destroying_effect)
    if (batch_deriveds !== null)
      batch_deriveds.set(r, r.v);
    else {
      var t = (skip_reaction || r.f & UNOWNED) && r.deps !== null ? MAYBE_DIRTY : CLEAN;
      set_signal_status(r, t);
    }
}
function flatten(r, e, t) {
  const s = is_runes() ? derived : derived_safe_equal;
  if (e.length === 0) {
    t(r.map(s));
    return;
  }
  var i = current_batch, n = (
    /** @type {Effect} */
    active_effect
  ), o = capture(), l = get_pending_boundary();
  Promise.all(e.map((c) => /* @__PURE__ */ async_derived(c))).then((c) => {
    i == null || i.activate(), o();
    try {
      t([...r.map(s), ...c]);
    } catch (u) {
      n.f & DESTROYED || invoke_error_boundary(u, n);
    }
    i == null || i.deactivate(), unset_context();
  }).catch((c) => {
    l.error(c);
  });
}
function capture() {
  var r = active_effect, e = active_reaction, t = component_context;
  return function() {
    set_active_effect(r), set_active_reaction(e), set_component_context(t);
  };
}
function unset_context() {
  set_active_effect(null), set_active_reaction(null), set_component_context(null);
}
const batches = /* @__PURE__ */ new Set();
let current_batch = null, previous_batch = null, batch_deriveds = null, effect_pending_updates = /* @__PURE__ */ new Set(), tasks = [];
function dequeue() {
  const r = (
    /** @type {() => void} */
    tasks.shift()
  );
  tasks.length > 0 && queueMicrotask(dequeue), r();
}
let queued_root_effects = [], last_scheduled_effect = null, is_flushing = !1, is_flushing_sync = !1;
var Z, Q, V, re, se, J, ee, X, W, te, ie, ne, H, pe, oe, de;
const le = class le {
  constructor() {
    B(this, H);
    /**
     * The current values of any sources that are updated in this batch
     * They keys of this map are identical to `this.#previous`
     * @type {Map<Source, any>}
     */
    U(this, "current", /* @__PURE__ */ new Map());
    /**
     * The values of any sources that are updated in this batch _before_ those updates took place.
     * They keys of this map are identical to `this.#current`
     * @type {Map<Source, any>}
     */
    B(this, Z, /* @__PURE__ */ new Map());
    /**
     * When the batch is committed (and the DOM is updated), we need to remove old branches
     * and append new ones by calling the functions added inside (if/each/key/etc) blocks
     * @type {Set<() => void>}
     */
    B(this, Q, /* @__PURE__ */ new Set());
    /**
     * The number of async effects that are currently in flight
     */
    B(this, V, 0);
    /**
     * A deferred that resolves when the batch is committed, used with `settled()`
     * TODO replace with Promise.withResolvers once supported widely enough
     * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
     */
    B(this, re, null);
    /**
     * True if an async effect inside this batch resolved and
     * its parent branch was already deleted
     */
    B(this, se, !1);
    /**
     * Async effects (created inside `async_derived`) encountered during processing.
     * These run after the rest of the batch has updated, since they should
     * always have the latest values
     * @type {Effect[]}
     */
    B(this, J, []);
    /**
     * The same as `#async_effects`, but for effects inside a newly-created
     * `<svelte:boundary>` — these do not prevent the batch from committing
     * @type {Effect[]}
     */
    B(this, ee, []);
    /**
     * Template effects and `$effect.pre` effects, which run when
     * a batch is committed
     * @type {Effect[]}
     */
    B(this, X, []);
    /**
     * The same as `#render_effects`, but for `$effect` (which runs after)
     * @type {Effect[]}
     */
    B(this, W, []);
    /**
     * Block effects, which may need to re-run on subsequent flushes
     * in order to update internal sources (e.g. each block items)
     * @type {Effect[]}
     */
    B(this, te, []);
    /**
     * Deferred effects (which run after async work has completed) that are DIRTY
     * @type {Effect[]}
     */
    B(this, ie, []);
    /**
     * Deferred effects that are MAYBE_DIRTY
     * @type {Effect[]}
     */
    B(this, ne, []);
    /**
     * A set of branches that still exist, but will be destroyed when this batch
     * is committed — we skip over these during `process`
     * @type {Set<Effect>}
     */
    U(this, "skipped_effects", /* @__PURE__ */ new Set());
  }
  /**
   *
   * @param {Effect[]} root_effects
   */
  process(e) {
    var n;
    queued_root_effects = [], previous_batch = null;
    var t = null;
    if (batches.size > 1) {
      t = /* @__PURE__ */ new Map(), batch_deriveds = /* @__PURE__ */ new Map();
      for (const [o, l] of this.current)
        t.set(o, { v: o.v, wv: o.wv }), o.v = l;
      for (const o of batches)
        if (o !== this)
          for (const [l, c] of L(o, Z))
            t.has(l) || (t.set(l, { v: l.v, wv: l.wv }), l.v = c);
    }
    for (const o of e)
      Y(this, H, pe).call(this, o);
    if (L(this, J).length === 0 && L(this, V) === 0) {
      Y(this, H, de).call(this);
      var s = L(this, X), i = L(this, W);
      F(this, X, []), F(this, W, []), F(this, te, []), previous_batch = current_batch, current_batch = null, flush_queued_effects(s), flush_queued_effects(i), current_batch === null ? current_batch = this : batches.delete(this), (n = L(this, re)) == null || n.resolve();
    } else
      Y(this, H, oe).call(this, L(this, X)), Y(this, H, oe).call(this, L(this, W)), Y(this, H, oe).call(this, L(this, te));
    if (t) {
      for (const [o, { v: l, wv: c }] of t)
        o.wv <= c && (o.v = l);
      batch_deriveds = null;
    }
    for (const o of L(this, J))
      update_effect(o);
    for (const o of L(this, ee))
      update_effect(o);
    F(this, J, []), F(this, ee, []);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Source} source
   * @param {any} value
   */
  capture(e, t) {
    L(this, Z).has(e) || L(this, Z).set(e, t), this.current.set(e, e.v);
  }
  activate() {
    current_batch = this;
  }
  deactivate() {
    current_batch = null, previous_batch = null;
    for (const e of effect_pending_updates)
      if (effect_pending_updates.delete(e), e(), current_batch !== null)
        break;
  }
  neuter() {
    F(this, se, !0);
  }
  flush() {
    queued_root_effects.length > 0 ? flush_effects() : Y(this, H, de).call(this), current_batch === this && (L(this, V) === 0 && batches.delete(this), this.deactivate());
  }
  increment() {
    F(this, V, L(this, V) + 1);
  }
  decrement() {
    if (F(this, V, L(this, V) - 1), L(this, V) === 0) {
      for (const e of L(this, ie))
        set_signal_status(e, DIRTY), schedule_effect(e);
      for (const e of L(this, ne))
        set_signal_status(e, MAYBE_DIRTY), schedule_effect(e);
      F(this, X, []), F(this, W, []), this.flush();
    } else
      this.deactivate();
  }
  /** @param {() => void} fn */
  add_callback(e) {
    L(this, Q).add(e);
  }
  settled() {
    return (L(this, re) ?? F(this, re, deferred())).promise;
  }
  static ensure() {
    if (current_batch === null) {
      const e = current_batch = new le();
      batches.add(current_batch), is_flushing_sync || le.enqueue(() => {
        current_batch === e && e.flush();
      });
    }
    return current_batch;
  }
  /** @param {() => void} task */
  static enqueue(e) {
    tasks.length === 0 && queueMicrotask(dequeue), tasks.unshift(e);
  }
};
Z = new WeakMap(), Q = new WeakMap(), V = new WeakMap(), re = new WeakMap(), se = new WeakMap(), J = new WeakMap(), ee = new WeakMap(), X = new WeakMap(), W = new WeakMap(), te = new WeakMap(), ie = new WeakMap(), ne = new WeakMap(), H = new WeakSet(), /**
 * Traverse the effect tree, executing effects or stashing
 * them for later execution as appropriate
 * @param {Effect} root
 */
pe = function(e) {
  var d;
  e.f ^= CLEAN;
  for (var t = e.first; t !== null; ) {
    var s = t.f, i = (s & (BRANCH_EFFECT | ROOT_EFFECT)) !== 0, n = i && (s & CLEAN) !== 0, o = n || (s & INERT) !== 0 || this.skipped_effects.has(t);
    if (!o && t.fn !== null) {
      if (i)
        t.f ^= CLEAN;
      else if (s & EFFECT)
        L(this, W).push(t);
      else if (!(s & CLEAN))
        if (s & ASYNC) {
          var l = (d = t.b) != null && d.pending ? L(this, ee) : L(this, J);
          l.push(t);
        } else is_dirty(t) && (t.f & BLOCK_EFFECT && L(this, te).push(t), update_effect(t));
      var c = t.first;
      if (c !== null) {
        t = c;
        continue;
      }
    }
    var u = t.parent;
    for (t = t.next; t === null && u !== null; )
      t = u.next, u = u.parent;
  }
}, /**
 * @param {Effect[]} effects
 */
oe = function(e) {
  for (const t of e)
    (t.f & DIRTY ? L(this, ie) : L(this, ne)).push(t), set_signal_status(t, CLEAN);
  e.length = 0;
}, /**
 * Append and remove branches to/from the DOM
 */
de = function() {
  if (!L(this, se))
    for (const e of L(this, Q))
      e();
  L(this, Q).clear();
};
let Batch = le;
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
        var s, i;
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
      if (!(s.f & (DESTROYED | INERT)) && is_dirty(s) && (eager_block_effects = [], update_effect(s), s.deps === null && s.first === null && s.nodes_start === null && (s.teardown === null && s.ac === null ? unlink_effect(s) : s.fn = null), eager_block_effects.length > 0)) {
        old_values.clear();
        for (const i of eager_block_effects)
          update_effect(i);
        eager_block_effects = [];
      }
    }
    eager_block_effects = null;
  }
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
  var i;
  const s = source(r);
  return e || (s.equals = safe_equals), legacy_mode_flag && t && component_context !== null && component_context.l !== null && ((i = component_context.l).s ?? (i.s = [])).push(s), s;
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
    for (var s = is_runes(), i = t.length, n = 0; n < i; n++) {
      var o = t[n], l = o.f;
      if (!(!s && o === active_effect)) {
        var c = (l & DIRTY) === 0;
        c && set_signal_status(o, e), l & DERIVED ? mark_reactions(
          /** @type {Derived} */
          o,
          MAYBE_DIRTY
        ) : c && (l & BLOCK_EFFECT && eager_block_effects !== null && eager_block_effects.push(
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
  const i = r.__on_r;
  i ? r.__on_r = () => {
    i(), s(!0);
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
    if (t !== null) {
      var i, n, o = (e & DISCONNECTED) !== 0, l = s && active_effect !== null && !skip_reaction, c = t.length;
      if ((o || l) && (active_effect === null || !(active_effect.f & DESTROYED))) {
        var u = (
          /** @type {Derived} */
          r
        ), d = u.parent;
        for (i = 0; i < c; i++)
          n = t[i], (o || !((f = n == null ? void 0 : n.reactions) != null && f.includes(u))) && (n.reactions ?? (n.reactions = [])).push(u);
        o && (u.f ^= DISCONNECTED), l && d !== null && !(d.f & UNOWNED) && (u.f ^= UNOWNED);
      }
      for (i = 0; i < c; i++)
        if (n = t[i], is_dirty(
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
function schedule_possible_effect_self_invalidation(r, e, t = !0) {
  var s = r.reactions;
  if (s !== null && !(current_sources != null && current_sources.includes(r)))
    for (var i = 0; i < s.length; i++) {
      var n = s[i];
      n.f & DERIVED ? schedule_possible_effect_self_invalidation(
        /** @type {Derived} */
        n,
        e,
        !1
      ) : e === n && (t ? set_signal_status(n, DIRTY) : n.f & CLEAN && set_signal_status(n, MAYBE_DIRTY), schedule_effect(
        /** @type {Effect} */
        n
      ));
    }
}
function update_reaction(r) {
  var g;
  var e = new_deps, t = skipped_deps, s = untracked_writes, i = active_reaction, n = skip_reaction, o = current_sources, l = component_context, c = untracking, u = update_version, d = r.f;
  new_deps = /** @type {null | Value[]} */
  null, skipped_deps = 0, untracked_writes = null, skip_reaction = (d & UNOWNED) !== 0 && (untracking || !is_updating_effect || active_reaction === null), active_reaction = d & (BRANCH_EFFECT | ROOT_EFFECT) ? null : r, current_sources = null, set_component_context(r.ctx), untracking = !1, update_version = ++read_version, r.ac !== null && (without_reactive_context(() => {
    r.ac.abort(STALE_REACTION);
  }), r.ac = null);
  try {
    r.f |= REACTION_IS_UPDATING;
    var f = (
      /** @type {Function} */
      r.fn
    ), _ = f(), p = r.deps;
    if (new_deps !== null) {
      var h;
      if (remove_reactions(r, skipped_deps), p !== null && skipped_deps > 0)
        for (p.length = skipped_deps + new_deps.length, h = 0; h < new_deps.length; h++)
          p[skipped_deps + h] = new_deps[h];
      else
        r.deps = p = new_deps;
      if (!skip_reaction || // Deriveds that already have reactions can cleanup, so we still add them as reactions
      d & DERIVED && /** @type {import('#client').Derived} */
      r.reactions !== null)
        for (h = skipped_deps; h < p.length; h++)
          ((g = p[h]).reactions ?? (g.reactions = [])).push(r);
    } else p !== null && skipped_deps < p.length && (remove_reactions(r, skipped_deps), p.length = skipped_deps);
    if (is_runes() && untracked_writes !== null && !untracking && p !== null && !(r.f & (DERIVED | MAYBE_DIRTY | DIRTY)))
      for (h = 0; h < /** @type {Source[]} */
      untracked_writes.length; h++)
        schedule_possible_effect_self_invalidation(
          untracked_writes[h],
          /** @type {Effect} */
          r
        );
    return i !== null && i !== r && (read_version++, untracked_writes !== null && (s === null ? s = untracked_writes : s.push(.../** @type {Source[]} */
    untracked_writes))), r.f & ERROR_VALUE && (r.f ^= ERROR_VALUE), _;
  } catch (m) {
    return handle_error(m);
  } finally {
    r.f ^= REACTION_IS_UPDATING, new_deps = e, skipped_deps = t, untracked_writes = s, active_reaction = i, skip_reaction = n, current_sources = o, set_component_context(l), untracking = c, update_version = u;
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
    var t = active_effect, s = is_updating_effect;
    active_effect = r, is_updating_effect = !0;
    try {
      e & BLOCK_EFFECT ? destroy_block_effect_children(r) : destroy_effect_children(r), execute_effect_teardown(r);
      var i = update_reaction(r);
      r.teardown = typeof i == "function" ? i : null, r.wv = write_version;
      var n;
      DEV && tracing_mode_flag && r.f & DIRTY && r.deps;
    } finally {
      is_updating_effect = s, active_effect = t;
    }
  }
}
function get$2(r) {
  var e = r.f, t = (e & DERIVED) !== 0;
  if (active_reaction !== null && !untracking) {
    var s = active_effect !== null && (active_effect.f & DESTROYED) !== 0;
    if (!s && !(current_sources != null && current_sources.includes(r))) {
      var i = active_reaction.deps;
      if (active_reaction.f & REACTION_IS_UPDATING)
        r.rv < read_version && (r.rv = read_version, new_deps === null && i !== null && i[skipped_deps] === r ? skipped_deps++ : new_deps === null ? new_deps = [r] : (!skip_reaction || !new_deps.includes(r)) && new_deps.push(r));
      else {
        (active_reaction.deps ?? (active_reaction.deps = [])).push(r);
        var n = r.reactions;
        n === null ? r.reactions = [active_reaction] : n.includes(active_reaction) || n.push(active_reaction);
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
    r, batch_deriveds != null && batch_deriveds.has(o))
      return batch_deriveds.get(o);
    is_dirty(o) && update_derived(o);
  }
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
  var i = active_effect;
  i !== null && i.f & INERT && (r |= INERT);
  var n = {
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
    b: i && i.b,
    prev: null,
    teardown: null,
    transitions: null,
    wv: 0,
    ac: null
  };
  if (t)
    try {
      update_effect(n), n.f |= EFFECT_RAN;
    } catch (c) {
      throw destroy_effect(n), c;
    }
  else e !== null && schedule_effect(n);
  var o = t && n.deps === null && n.first === null && n.nodes_start === null && n.teardown === null && (n.f & EFFECT_PRESERVED) === 0;
  if (!o && s && (i !== null && push_effect(n, i), active_reaction !== null && active_reaction.f & DERIVED && !(r & ROOT_EFFECT))) {
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
  const e = create_effect(ROOT_EFFECT, r, !0);
  return () => {
    destroy_effect(e);
  };
}
function component_root(r) {
  Batch.ensure();
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
  return create_effect(BRANCH_EFFECT, r, !0, e);
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
    const i = t.ac;
    i !== null && without_reactive_context(() => {
      i.abort(STALE_REACTION);
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
    for (const n of s)
      n.stop();
  execute_effect_teardown(r);
  var i = r.parent;
  i !== null && i.first !== null && unlink_effect(r), r.next = r.prev = r.teardown = r.ctx = r.deps = r.fn = r.nodes_start = r.nodes_end = r.ac = null;
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
    r.f ^= INERT, r.f & CLEAN || (set_signal_status(r, DIRTY), schedule_effect(r));
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
function event$1(r, e, t, s, i) {
  var n = { capture: s, passive: i }, o = create_event(r, e, t, n);
  (e === document.body || // @ts-ignore
  e === window || // @ts-ignore
  e === document || // Firefox has quirky behavior, it can happen that we still get "canplay" events when the element is already removed
  e instanceof HTMLMediaElement) && teardown(() => {
    e.removeEventListener(r, o, n);
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
  ), s = r.type, i = ((w = r.composedPath) == null ? void 0 : w.call(r)) || [], n = (
    /** @type {null | Element} */
    i[0] || r.target
  );
  last_propagated_event = r;
  var o = 0, l = last_propagated_event === r && r.__root;
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
      for (var _, p = []; n !== null; ) {
        var h = n.assignedSlot || n.parentNode || /** @type {any} */
        n.host || null;
        try {
          var g = n["__" + s];
          if (g != null && (!/** @type {any} */
          n.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          r.target === n))
            if (is_array(g)) {
              var [m, ...y] = g;
              m.apply(n, [r, ...y]);
            } else
              g.call(n, r);
        } catch (v) {
          _ ? p.push(v) : _ = v;
        }
        if (r.cancelBubble || h === e || h === null)
          break;
        n = h;
      }
      if (_) {
        for (let v of p)
          queueMicrotask(() => {
            throw v;
          });
        throw _;
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
  const t = e.target, s = hydrating, i = hydrate_node;
  try {
    for (var n = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(t)
    ); n && (n.nodeType !== COMMENT_NODE || /** @type {Comment} */
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
    if (hydrate_node === null || hydrate_node.nodeType !== COMMENT_NODE || /** @type {Comment} */
    hydrate_node.data !== HYDRATION_END)
      throw hydration_mismatch(), HYDRATION_ERROR;
    return set_hydrating(!1), /**  @type {Exports} */
    o;
  } catch (o) {
    if (o instanceof Error && o.message.split(`
`).some((l) => l.startsWith("https://svelte.dev/e/")))
      throw o;
    return o !== HYDRATION_ERROR && console.warn("Failed to hydrate: ", o), e.recover === !1 && hydration_failed(), init_operations(), clear_text_content(t), set_hydrating(!1), mount(r, e);
  } finally {
    set_hydrating(s), set_hydrate_node(i);
  }
}
const document_listeners = /* @__PURE__ */ new Map();
function _mount(r, { target: e, anchor: t, props: s = {}, events: i, context: n, intro: o = !0 }) {
  init_operations();
  var l = /* @__PURE__ */ new Set(), c = (f) => {
    for (var _ = 0; _ < f.length; _++) {
      var p = f[_];
      if (!l.has(p)) {
        l.add(p);
        var h = is_passive_event(p);
        e.addEventListener(p, handle_event_propagation, { passive: h });
        var g = document_listeners.get(p);
        g === void 0 ? (document.addEventListener(p, handle_event_propagation, { passive: h }), document_listeners.set(p, 1)) : document_listeners.set(p, g + 1);
      }
    }
  };
  c(array_from(all_registered_events)), root_event_handles.add(c);
  var u = void 0, d = component_root(() => {
    var f = t ?? e.appendChild(create_text());
    return branch(() => {
      if (n) {
        push({});
        var _ = (
          /** @type {ComponentContext} */
          component_context
        );
        _.c = n;
      }
      i && (s.$$events = i), hydrating && assign_nodes(
        /** @type {TemplateNode} */
        f,
        null
      ), should_intro = o, u = r(f, s) || {}, should_intro = !0, hydrating && (active_effect.nodes_end = hydrate_node), n && pop();
    }), () => {
      var h;
      for (var _ of l) {
        e.removeEventListener(_, handle_event_propagation);
        var p = (
          /** @type {number} */
          document_listeners.get(_)
        );
        --p === 0 ? (document.removeEventListener(_, handle_event_propagation), document_listeners.delete(_)) : document_listeners.set(_, p);
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
function if_block(r, e, t = !1) {
  hydrating && hydrate_next();
  var s = r, i = null, n = null, o = UNINITIALIZED, l = t ? EFFECT_TRANSPARENT : 0, c = !1;
  const u = (p, h = !0) => {
    c = !0, _(h, p);
  };
  var d = null;
  function f() {
    d !== null && (d.lastChild.remove(), s.before(d), d = null);
    var p = o ? i : n, h = o ? n : i;
    p && resume_effect(p), h && pause_effect(h, () => {
      o ? n = null : i = null;
    });
  }
  const _ = (p, h) => {
    if (o === (o = p)) return;
    let g = !1;
    if (hydrating) {
      const T = read_hydration_instruction(s) === HYDRATION_START_ELSE;
      !!o === T && (s = remove_nodes(), set_hydrate_node(s), set_hydrating(!1), g = !0);
    }
    var m = should_defer_append(), y = s;
    if (m && (d = document.createDocumentFragment(), d.append(y = create_text())), o ? i ?? (i = h && branch(() => h(y))) : n ?? (n = h && branch(() => h(y))), m) {
      var w = (
        /** @type {Batch} */
        current_batch
      ), v = o ? i : n, b = o ? n : i;
      v && w.skipped_effects.delete(v), b && w.skipped_effects.add(b), w.add_callback(f);
    } else
      f();
    g && set_hydrating(!0);
  };
  block(() => {
    c = !1, e(u), c || _(null, null);
  }, l), hydrating && (s = hydrate_node);
}
function index(r, e) {
  return e;
}
function pause_effects(r, e, t) {
  for (var s = r.items, i = [], n = e.length, o = 0; o < n; o++)
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
  var d = null, f = !1, _ = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ derived_safe_equal(() => {
    var y = t();
    return is_array(y) ? y : y == null ? [] : array_from(y);
  }), h, g;
  function m() {
    reconcile(
      g,
      h,
      l,
      _,
      o,
      i,
      e,
      s,
      t
    ), n !== null && (h.length === 0 ? d ? resume_effect(d) : d = branch(() => n(o)) : d !== null && pause_effect(d, () => {
      d = null;
    }));
  }
  block(() => {
    g ?? (g = /** @type {Effect} */
    active_effect), h = /** @type {V[]} */
    get$2(p);
    var y = h.length;
    if (f && y === 0)
      return;
    f = y === 0;
    let w = !1;
    if (hydrating) {
      var v = read_hydration_instruction(o) === HYDRATION_START_ELSE;
      v !== (y === 0) && (o = remove_nodes(), set_hydrate_node(o), set_hydrating(!1), w = !0);
    }
    if (hydrating) {
      for (var b = null, T, E = 0; E < y; E++) {
        if (hydrate_node.nodeType === COMMENT_NODE && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          o = /** @type {Comment} */
          hydrate_node, w = !0, set_hydrating(!1);
          break;
        }
        var C = h[E], x = s(C, E);
        T = create_item(
          hydrate_node,
          l,
          b,
          null,
          C,
          x,
          E,
          i,
          e,
          t
        ), l.items.set(x, T), b = T;
      }
      y > 0 && set_hydrate_node(remove_nodes());
    }
    if (hydrating)
      y === 0 && n && (d = branch(() => n(o)));
    else if (should_defer_append()) {
      var I = /* @__PURE__ */ new Set(), k = (
        /** @type {Batch} */
        current_batch
      );
      for (E = 0; E < y; E += 1) {
        C = h[E], x = s(C, E);
        var A = l.items.get(x) ?? _.get(x);
        A ? e & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE) && update_item(A, C, E, e) : (T = create_item(
          null,
          l,
          null,
          null,
          C,
          x,
          E,
          i,
          e,
          t,
          !0
        ), _.set(x, T)), I.add(x);
      }
      for (const [S, $] of l.items)
        I.has(S) || k.skipped_effects.add($.e);
      k.add_callback(m);
    } else
      m();
    w && set_hydrating(!0), get$2(p);
  }), hydrating && (o = hydrate_node);
}
function reconcile(r, e, t, s, i, n, o, l, c) {
  var N, j, q, K;
  var u = (o & EACH_IS_ANIMATED) !== 0, d = (o & (EACH_ITEM_REACTIVE | EACH_INDEX_REACTIVE)) !== 0, f = e.length, _ = t.items, p = t.first, h = p, g, m = null, y, w = [], v = [], b, T, E, C;
  if (u)
    for (C = 0; C < f; C += 1)
      b = e[C], T = l(b, C), E = _.get(T), E !== void 0 && ((N = E.a) == null || N.measure(), (y ?? (y = /* @__PURE__ */ new Set())).add(E));
  for (C = 0; C < f; C += 1) {
    if (b = e[C], T = l(b, C), E = _.get(T), E === void 0) {
      var x = s.get(T);
      if (x !== void 0) {
        s.delete(T), _.set(T, x);
        var I = m ? m.next : h;
        link(t, m, x), link(t, x, I), move(x, I, i), m = x;
      } else {
        var k = h ? (
          /** @type {TemplateNode} */
          h.e.nodes_start
        ) : i;
        m = create_item(
          k,
          t,
          m,
          m === null ? t.first : m.next,
          b,
          T,
          C,
          n,
          o,
          c
        );
      }
      _.set(T, m), w = [], v = [], h = m.next;
      continue;
    }
    if (d && update_item(E, b, C, o), E.e.f & INERT && (resume_effect(E.e), u && ((j = E.a) == null || j.unfix(), (y ?? (y = /* @__PURE__ */ new Set())).delete(E))), E !== h) {
      if (g !== void 0 && g.has(E)) {
        if (w.length < v.length) {
          var A = v[0], S;
          m = A.prev;
          var $ = w[0], P = w[w.length - 1];
          for (S = 0; S < w.length; S += 1)
            move(w[S], A, i);
          for (S = 0; S < v.length; S += 1)
            g.delete(v[S]);
          link(t, $.prev, P.next), link(t, m, $), link(t, P, A), h = A, m = P, C -= 1, w = [], v = [];
        } else
          g.delete(E), move(E, h, i), link(t, E.prev, E.next), link(t, E, m === null ? t.first : m.next), link(t, m, E), m = E;
        continue;
      }
      for (w = [], v = []; h !== null && h.k !== T; )
        h.e.f & INERT || (g ?? (g = /* @__PURE__ */ new Set())).add(h), v.push(h), h = h.next;
      if (h === null)
        continue;
      E = h;
    }
    w.push(E), m = E, h = E.next;
  }
  if (h !== null || g !== void 0) {
    for (var R = g === void 0 ? [] : array_from(g); h !== null; )
      h.e.f & INERT || R.push(h), h = h.next;
    var O = R.length;
    if (O > 0) {
      var D = o & EACH_IS_CONTROLLED && f === 0 ? i : null;
      if (u) {
        for (C = 0; C < O; C += 1)
          (q = R[C].a) == null || q.measure();
        for (C = 0; C < O; C += 1)
          (K = R[C].a) == null || K.fix();
      }
      pause_effects(t, R, D);
    }
  }
  u && queue_micro_task(() => {
    var ae;
    if (y !== void 0)
      for (E of y)
        (ae = E.a) == null || ae.apply();
  }), r.first = t.first && t.first.e, r.last = m && m.e;
  for (var M of s.values())
    destroy_effect(M.e);
  s.clear();
}
function update_item(r, e, t, s) {
  s & EACH_ITEM_REACTIVE && internal_set(r.v, e), s & EACH_INDEX_REACTIVE ? internal_set(
    /** @type {Value<number>} */
    r.i,
    t
  ) : r.i = t;
}
function create_item(r, e, t, s, i, n, o, l, c, u, d) {
  var f = (c & EACH_ITEM_REACTIVE) !== 0, _ = (c & EACH_ITEM_IMMUTABLE) === 0, p = f ? _ ? /* @__PURE__ */ mutable_source(i, !1, !1) : source(i) : i, h = c & EACH_INDEX_REACTIVE ? source(o) : o, g = {
    i: h,
    v: p,
    k: n,
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
    return g.e = branch(() => l(
      /** @type {Node} */
      r,
      p,
      h,
      u
    ), hydrating), g.e.prev = t && t.e, g.e.next = s && s.e, t === null ? d || (e.first = g) : (t.next = g, t.e.next = g.e), s !== null && (s.prev = g, s.e.prev = g.e), g;
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
  ); n !== null && n !== s; ) {
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
function component(r, e, t) {
  hydrating && hydrate_next();
  var s = r, i, n, o = null, l = null;
  function c() {
    n && (pause_effect(n), n = null), o && (o.lastChild.remove(), s.before(o), o = null), n = l, l = null;
  }
  block(() => {
    if (i !== (i = e())) {
      var u = should_defer_append();
      if (i) {
        var d = s;
        u && (o = document.createDocumentFragment(), o.append(d = create_text()), n && current_batch.skipped_effects.add(n)), l = branch(() => t(d, i));
      }
      u ? current_batch.add_callback(c) : c();
    }
  }, EFFECT_TRANSPARENT), hydrating && (s = hydrate_node);
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
      const i = document.createElement("style");
      i.id = e.hash, i.textContent = e.code, s.appendChild(i);
    }
  });
}
function action(r, e, t) {
  effect(() => {
    var s = untrack(() => e(r, t == null ? void 0 : t()) || {});
    if (t && (s != null && s.update)) {
      var i = !1, n = (
        /** @type {any} */
        {}
      );
      render_effect(() => {
        var o = t();
        deep_read_state(o), i && safe_not_equal(n, o) && (n = o, s.update(o));
      }), i = !0;
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
    return without_reactive_context(() => o ?? (o = t()(e, (s == null ? void 0 : s()) ?? /** @type {P} */
    {}, {
      direction: n
    })));
  }
  var _ = {
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
  }, p = (
    /** @type {Effect} */
    active_effect
  );
  if ((p.transitions ?? (p.transitions = [])).push(_), should_intro) {
    var h = i;
    if (!h) {
      for (var g = (
        /** @type {Effect | null} */
        p.parent
      ); g && g.f & EFFECT_TRANSPARENT; )
        for (; (g = g.parent) && !(g.f & BLOCK_EFFECT); )
          ;
      h = !g || (g.f & EFFECT_RAN) !== 0;
    }
    h && effect(() => {
      untrack(() => _.in());
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
  var _ = [];
  if (n && t === void 0 && (d && d(0, 1), u)) {
    var p = css_to_keyframe(u(0, 1));
    _.push(p, p);
  }
  var h = () => 1 - s, g = r.animate(_, { duration: c, fill: "forwards" });
  return g.onfinish = () => {
    g.cancel();
    var m = (t == null ? void 0 : t.t()) ?? 1 - s;
    t == null || t.abort();
    var y = s - m, w = (
      /** @type {number} */
      e.duration * Math.abs(y)
    ), v = [];
    if (w > 0) {
      var b = !1;
      if (u)
        for (var T = Math.ceil(w / 16.666666666666668), E = 0; E <= T; E += 1) {
          var C = m + y * f(E / T), x = css_to_keyframe(u(C, 1 - C));
          v.push(x), b || (b = x.overflow === "hidden");
        }
      b && (r.style.overflow = "hidden"), h = () => {
        var I = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          g.currentTime
        );
        return m + y * f(I / w);
      }, d && loop$1(() => {
        if (g.playState !== "running") return !1;
        var I = h();
        return d(I, 1 - I), !0;
      });
    }
    g = r.animate(v, { duration: w, fill: "forwards" }), g.onfinish = () => {
      h = () => s, d == null || d(s, 1 - s), i();
    };
  }, {
    abort: () => {
      g && (g.cancel(), g.effect = null, g.onfinish = noop$2);
    },
    deactivate: () => {
      i = noop$2;
    },
    reset: () => {
      s === 0 && (d == null || d(1, 0));
    },
    t: () => h()
  };
}
function bind_value(r, e, t = e) {
  var s = is_runes(), i = /* @__PURE__ */ new WeakSet();
  listen_to_event_and_reset_event(r, "input", (n) => {
    var o = n ? r.defaultValue : r.value;
    if (o = is_numberlike_input(r) ? to_number(o) : o, t(o), current_batch !== null && i.add(current_batch), s && o !== (o = e())) {
      var l = r.selectionStart, c = r.selectionEnd;
      r.value = o ?? "", c !== null && (r.selectionStart = l, r.selectionEnd = Math.min(c, r.value.length));
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  (hydrating && r.defaultValue !== r.value || // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  untrack(e) == null && r.value) && (t(is_numberlike_input(r) ? to_number(r.value) : r.value), current_batch !== null && i.add(current_batch)), render_effect(() => {
    var n = e();
    if (r === document.activeElement) {
      var o = (
        /** @type {Batch} */
        previous_batch ?? current_batch
      );
      if (i.has(o))
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
      let i = r.props[s];
      is_function(i) && (i = i());
      const n = get_descriptor(i, e);
      if (n && n.set)
        return n.set(t), !0;
    }
    return !1;
  },
  getOwnPropertyDescriptor(r, e) {
    let t = r.props.length;
    for (; t--; ) {
      let s = r.props[t];
      if (is_function(s) && (s = s()), typeof s == "object" && s !== null && e in s) {
        const i = get_descriptor(s, e);
        return i && !i.configurable && (i.configurable = !0), i;
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
  var i = !legacy_mode_flag || (t & PROPS_IS_RUNES) !== 0, n = (t & PROPS_IS_BINDABLE) !== 0, o = (t & PROPS_IS_LAZY_INITIAL) !== 0, l = (
    /** @type {V} */
    s
  ), c = !0, u = () => (c && (c = !1, l = o ? untrack(
    /** @type {() => V} */
    s
  ) : (
    /** @type {V} */
    s
  )), l), d;
  if (n) {
    var f = STATE_SYMBOL in r || LEGACY_PROPS in r;
    d = ((v = get_descriptor(r, e)) == null ? void 0 : v.set) ?? (f && e in r ? (b) => r[e] = b : void 0);
  }
  var _, p = !1;
  n ? [_, p] = capture_store_binding(() => (
    /** @type {V} */
    r[e]
  )) : _ = /** @type {V} */
  r[e], _ === void 0 && s !== void 0 && (_ = u(), d && (i && props_invalid_value(), d(_)));
  var h;
  if (i ? h = () => {
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
  }, i && !(t & PROPS_IS_UPDATED))
    return h;
  if (d) {
    var g = r.$$legacy;
    return (
      /** @type {() => V} */
      function(b, T) {
        return arguments.length > 0 ? ((!i || !T || g || p) && d(T ? h() : b), b) : h();
      }
    );
  }
  var m = !1, y = (t & PROPS_IS_IMMUTABLE ? derived : derived_safe_equal)(() => (m = !1, h()));
  n && get$2(y);
  var w = (
    /** @type {Effect} */
    active_effect
  );
  return (
    /** @type {() => V} */
    function(b, T) {
      if (arguments.length > 0) {
        const E = T ? get$2(y) : i && n ? proxy(b) : b;
        return set(y, E), m = !0, l !== void 0 && (l = E), b;
      }
      return is_destroying_effect && m || w.f & DESTROYED ? y.v : get$2(y);
    }
  );
}
function createClassComponent(r) {
  return new Svelte4Component(r);
}
var G, z;
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    /** @type {any} */
    B(this, G);
    /** @type {Record<string, any>} */
    B(this, z);
    var n;
    var t = /* @__PURE__ */ new Map(), s = (o, l) => {
      var c = /* @__PURE__ */ mutable_source(l, !1, !1);
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
    F(this, z, (e.hydrate ? hydrate : mount)(e.component, {
      target: e.target,
      anchor: e.anchor,
      props: i,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover
    })), (!((n = e == null ? void 0 : e.props) != null && n.$$host) || e.sync === !1) && flushSync(), F(this, G, i.$$events);
    for (const o of Object.keys(L(this, z)))
      o === "$set" || o === "$destroy" || o === "$on" || define_property(this, o, {
        get() {
          return L(this, z)[o];
        },
        /** @param {any} value */
        set(l) {
          L(this, z)[o] = l;
        },
        enumerable: !0
      });
    L(this, z).$set = /** @param {Record<string, any>} next */
    (o) => {
      Object.assign(i, o);
    }, L(this, z).$destroy = () => {
      unmount(L(this, z));
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    L(this, z).$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, t) {
    L(this, G)[e] = L(this, G)[e] || [];
    const s = (...i) => t.call(this, ...i);
    return L(this, G)[e].push(s), () => {
      L(this, G)[e] = L(this, G)[e].filter(
        /** @param {any} fn */
        (i) => i !== s
      );
    };
  }
  $destroy() {
    L(this, z).$destroy();
  }
}
G = new WeakMap(), z = new WeakMap();
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
    U(this, "$$ctor");
    /** Slots */
    U(this, "$$s");
    /** @type {any} The Svelte component instance */
    U(this, "$$c");
    /** Whether or not the custom element is connected */
    U(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    U(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    U(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    U(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    U(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    U(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    U(this, "$$me");
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
        /** @type {string} */
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
const persistentWritable = (r, e) => {
  const t = isBrowser$1 ? localStorage.getItem(r) : null, s = writable(t ? JSON.parse(t) : e);
  return isBrowser$1 && s.subscribe((i) => {
    localStorage.setItem(r, JSON.stringify(i));
  }), s;
}, cartItemToPreorderCartItem = (r) => {
  var c, u, d;
  const e = r.final_price, t = r.quantity, s = (u = (c = r == null ? void 0 : r.selling_plan_allocation) == null ? void 0 : c.selling_plan) == null ? void 0 : u.checkout_charge;
  let i = (d = r == null ? void 0 : r.selling_plan_allocation) == null ? void 0 : d.checkout_charge_amount;
  if (!i && s)
    switch (s.value_type) {
      case "percentage":
        i = r.selling_plan_allocation.price * (s.value / 100);
        break;
      case "fixed_amount":
        i = s.value;
        break;
    }
  let n = !0, o;
  i || (n = !1), i && e <= i && (n = !1), i && (i = Math.min(e, i)), n && (o = e - i);
  const l = {
    checkout_price: i * t,
    remaining_price: (o || 0) * t
  };
  return {
    original_price: r.original_price * t,
    final_price: e * t,
    pre_oder_price: n ? l : void 0
  };
}, createCartDrawerFooterRivet = () => {
  const e = document.getElementById("total-price-drawer-footer"), t = {
    total: 0,
    totalOriginal: 0,
    discounts: 0,
    items: 0,
    updateTotals: function() {
      var i;
      if (!window.CartJS) return;
      let s = 0;
      (i = window.CartJS.cart.items) == null || i.forEach((n) => {
        const { pre_oder_price: o, final_price: l } = cartItemToPreorderCartItem(n);
        if (!o || !o.checkout_price)
          return s += l;
        s += o.checkout_price;
      }), this.total = s, this.totalOriginal = window.CartJS.cart.original_total_price, this.discounts = window.CartJS.cart.total_discount, this.items = window.CartJS.cart.item_count;
    }
  };
  window.rivets.bind(e, t), document.addEventListener("cart:fix-1-applied", () => {
    t.updateTotals();
  }), t.updateTotals();
}, mainFooter = () => {
  console.log("dump", "mainfooter"), createCartDrawerFooterRivet();
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
    const s = e[t], i = s.indexOf("="), n = i > -1 ? s.substring(0, i).trim() : s.trim();
    document.cookie = n + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
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
    const { CartJS: i } = window;
    i && i.cart.items.length !== 0 && i.updateItem(1, i.cart.items[0].quantity);
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
    U(this, "BASE_URL", PUBLIC_NEXUS_BASE_URL);
    U(this, "API_VERSION_PATH", "api");
    U(this, "NGROK_SKIP_HEADER", {});
    U(this, "API_ROUTES", {
      GET_VARIANT_AUTOMATIC_DISCOUNT: (e, t) => `automatic-discount/${e}/${t}`,
      GET_PRODUCT_AUTOMATIC_DISCOUNT: (e, t) => `automatic-discount/product/${e}/${t}`,
      GET_CURRENCY_RATES: (e) => `currency-rates/${e}`
    });
  }
  async getVariantAutomaticDiscount(e, t) {
    try {
      return await (await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_VARIANT_AUTOMATIC_DISCOUNT(e, t)}`, {
        method: "GET",
        headers: {
          ...this.NGROK_SKIP_HEADER
        }
      })).json();
    } catch (s) {
      console.error(s);
    }
  }
  async getProductAutomaticDiscount(e, t) {
    try {
      return await (await fetch(`${this.BASE_URL}/${this.API_VERSION_PATH}/${this.API_ROUTES.GET_PRODUCT_AUTOMATIC_DISCOUNT(e, t)}`, {
        method: "GET",
        headers: {
          ...this.NGROK_SKIP_HEADER
        }
      })).json();
    } catch (s) {
      console.error(s);
    }
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
const getCookie = (r, e = null) => {
  if (!r.trim() || typeof document > "u" || !document.cookie)
    return e;
  try {
    const s = `; ${document.cookie}`.split(`; ${r}=`);
    if (s.length === 2) {
      const i = s.pop();
      if (i)
        return decodeURIComponent(i.split(";")[0]);
    }
    return e;
  } catch (t) {
    return console.error(`Error getting cookie "${r}":`, t), e;
  }
}, availableMarkets = [
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
  const t = new URL(window.location.href), i = new URLSearchParams(window.location.search).get("country");
  if (i) {
    displayCurrency.set(countryToCurrency(i)), localization.set(i), marketCurrency.set(countryToCurrency(i)), t.searchParams.delete("country"), window.history.replaceState({}, "", t.toString());
    return;
  }
  r.localization && e.localization.toLowerCase() !== r.localization.toLowerCase() && (t.searchParams.set("country", r.localization), window.location.href = t.toString());
}, mainHead = () => {
  cacheSweeper(), initiateCurrencies(), enforceCartCalculationConsistency();
}, BASE_URL = "http://172.20.10.6:5173/api", API_ROUTES = {
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
var he;
typeof window < "u" && ((he = window.__svelte ?? (window.__svelte = {})).v ?? (he.v = /* @__PURE__ */ new Set())).add(PUBLIC_VERSION);
enable_legacy_mode_flag();
var root_1$c = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-11u6xdw"> </s>'), root$j = /* @__PURE__ */ from_html('<div class="price-ui svelte-11u6xdw"><!> <p> </p></div>');
const $$css$l = {
  hash: "svelte-11u6xdw",
  code: `.price-ui.svelte-11u6xdw {display:flex;gap:0 8px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-11u6xdw {gap:4px;}
}.price-ui--value.svelte-11u6xdw {font-family:"Monument", sans-serif;font-size:16px;color:black;letter-spacing:-0.22px;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-11u6xdw {font-size:12px;}
}.red.svelte-11u6xdw {color:rgb(210, 25, 16);}`
};
function CartItemPrice(r, e) {
  push(e, !0), append_styles(r, $$css$l);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7);
  var i = root$j(), n = child(i);
  {
    var o = (d) => {
      var f = root_1$c(), _ = child(f, !0);
      reset(f), template_effect(() => set_text(_, s())), append(d, f);
    };
    if_block(n, (d) => {
      s() && d(o);
    });
  }
  var l = sibling(n, 2);
  let c;
  var u = child(l, !0);
  return reset(l), reset(i), template_effect(
    (d) => {
      c = set_class(l, 1, "price-ui--value svelte-11u6xdw", null, c, d), set_text(u, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, i), pop({
    get price() {
      return t();
    },
    set price(d) {
      t(d), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(d) {
      s(d), flushSync();
    }
  });
}
create_custom_element(CartItemPrice, { price: {}, comparedAt: {} }, [], [], !0);
var root_1$b = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-dtw9bx"> </s>'), root$i = /* @__PURE__ */ from_html('<div class="price-ui svelte-dtw9bx"><!> <p> </p></div>');
const $$css$k = {
  hash: "svelte-dtw9bx",
  code: `.price-ui.svelte-dtw9bx {display:flex;gap:0 8px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-dtw9bx {gap:4px;}
}.price-ui--value.svelte-dtw9bx {font-family:"Monument", sans-serif;font-size:22px;color:black;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-dtw9bx {font-size:12px;}
}.red.svelte-dtw9bx {color:rgb(210, 25, 16);}`
};
function CartTotalPrice(r, e) {
  push(e, !0), append_styles(r, $$css$k);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7);
  var i = root$i(), n = child(i);
  {
    var o = (d) => {
      var f = root_1$b(), _ = child(f, !0);
      reset(f), template_effect(() => set_text(_, s())), append(d, f);
    };
    if_block(n, (d) => {
      s() && d(o);
    });
  }
  var l = sibling(n, 2);
  let c;
  var u = child(l, !0);
  return reset(l), reset(i), template_effect(
    (d) => {
      c = set_class(l, 1, "price-ui--value svelte-dtw9bx", null, c, d), set_text(u, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, i), pop({
    get price() {
      return t();
    },
    set price(d) {
      t(d), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(d) {
      s(d), flushSync();
    }
  });
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
  const t = r.match(/^[\p{Currency_Symbol}\s]+|[\p{Currency_Symbol}\s]+$/gu), s = t ? t[0] : "", i = r.startsWith(s);
  if (!e) {
    let _ = r.replace(/[^\d.,\-]/g, "");
    return _.includes(",") && (/,\d{2}$/.test(_) ? _ = _.replace(/\./g, "").replace(",", ".") : _ = _.replace(/,/g, "")), e = parseFloat(_), isNaN(e) && (e = 0), {
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
    const [_, p] = n.split(".");
    n = _ + "." + (p + "00").slice(0, 2);
  }
  const l = /\d,\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(r);
  if (l && (n = n.replace(".", ",")), /\d{1,3}([,.])\d{3}/.test(r)) {
    const [_, p] = n.split(/[.,]/), h = l ? "." : ",";
    n = `${_.replace(/\B(?=(\d{3})+(?!\d))/g, h)}${p ? (l ? "," : ".") + p : ""}`;
  }
  const u = /^[\p{Currency_Symbol}]+\s/u.test(r), d = /\s[\p{Currency_Symbol}]+$/u.test(r);
  return {
    formatted: i ? `${s}${u ? " " : ""}${n}` : `${n}${d ? " " : ""}${s}`,
    value: e,
    symbol: s,
    isSymbolAtStart: i
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
  }, { value: s } = parseCurrencyString(r), { value: i } = e ? parseCurrencyString(e) : { value: void 0 };
  return s && i ? isNaN(i) ? t.compared_at = void 0 : s > i ? (t.compared_at = r, t.price = e) : (t.price = r, t.compared_at = e) : s && (t.price = r, t.compared_at = void 0), t;
}, priceToDiscount = ({ price: r, comparedAt: e }) => {
  if (!r || !e)
    return null;
  const { value: t } = parseCurrencyString(r), { value: s } = parseCurrencyString(e);
  if (!t || !s)
    return null;
  const i = Math.abs(s - t), n = Math.round(i / s * 100);
  return n > 0 ? n : 0;
};
var root_1$a = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-ykoa38"> </s>'), root_2$4 = /* @__PURE__ */ from_html('<p class="price-ui--value percentage svelte-ykoa38"><small class="red svelte-ykoa38"> </small></p>'), root$h = /* @__PURE__ */ from_html('<div class="price-ui svelte-ykoa38"><!> <p> </p> <!></div>');
const $$css$j = {
  hash: "svelte-ykoa38",
  code: `.price-ui.svelte-ykoa38 {display:flex;flex-wrap:wrap;justify-content:center;gap:0 8px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-ykoa38 {gap:4px;}
}.price-ui--value.svelte-ykoa38 {font-family:"Monument", sans-serif;font-size:16px;color:rgb(124, 124, 124);letter-spacing:-0.22px;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-ykoa38 {font-size:12px;}
}small.svelte-ykoa38 {font-size:100%;}.red.svelte-ykoa38 {color:rgb(210, 25, 16);}.percentage.svelte-ykoa38 {width:100%;text-align:center;}`
};
function CollectionItemPrice(r, e) {
  push(e, !0), append_styles(r, $$css$j);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7), i = /* @__PURE__ */ user_derived(() => priceToDiscount({ price: t(), comparedAt: s() }));
  var n = root$h(), o = child(n);
  {
    var l = (p) => {
      var h = root_1$a(), g = child(h, !0);
      reset(h), template_effect(() => set_text(g, s())), append(p, h);
    };
    if_block(o, (p) => {
      s() && p(l);
    });
  }
  var c = sibling(o, 2);
  let u;
  var d = child(c, !0);
  reset(c);
  var f = sibling(c, 2);
  {
    var _ = (p) => {
      var h = root_2$4(), g = child(h), m = child(g);
      reset(g), reset(h), template_effect(() => set_text(m, `-${get$2(i) ?? ""}% off`)), append(p, h);
    };
    if_block(f, (p) => {
      get$2(i) && p(_);
    });
  }
  return reset(n), template_effect(
    (p) => {
      u = set_class(c, 1, "price-ui--value svelte-ykoa38", null, u, p), set_text(d, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, n), pop({
    get price() {
      return t();
    },
    set price(p) {
      t(p), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(p) {
      s(p), flushSync();
    }
  });
}
create_custom_element(CollectionItemPrice, { price: {}, comparedAt: {} }, [], [], !0);
var root_1$9 = /* @__PURE__ */ from_html('<s class="price-ui--value svelte-1yemhqv"> </s>'), root_2$3 = /* @__PURE__ */ from_html('<p class="price-ui--value percentage svelte-1yemhqv"><span class="red svelte-1yemhqv"> </span></p>'), root$g = /* @__PURE__ */ from_html('<div class="price-ui svelte-1yemhqv"><p> </p> <!> <!></div>');
const $$css$i = {
  hash: "svelte-1yemhqv",
  code: `.price-ui.svelte-1yemhqv {display:flex;align-items:center;gap:0 16px;}
@media screen and (max-width: 1024px) {.price-ui.svelte-1yemhqv {gap:0px 8px;flex-wrap:wrap;}
}.price-ui--value.svelte-1yemhqv {font-family:"Monument", sans-serif;font-size:48px;font-weight:500;color:#000;line-height:1.2em;margin:0;}
@media screen and (max-width: 1024px) {.price-ui--value.svelte-1yemhqv {font-size:32px;}
}s.price-ui--value.svelte-1yemhqv {font-size:20px;letter-spacing:0.02em;color:rgb(123, 123, 123);text-decoration:line-through;}
@media screen and (max-width: 1024px) {s.price-ui--value.svelte-1yemhqv {font-size:12px;}
}.red.svelte-1yemhqv {color:rgb(171, 54, 58);}.percentage.svelte-1yemhqv {font-size:20px;margin-left:-8px;}
@media screen and (max-width: 1024px) {.percentage.svelte-1yemhqv {width:100%;line-height:0.6;font-size:12px;margin-left:0;}
}

@media screen and (max-width: 1024px) {.price-ui.svelte-1yemhqv {display:grid;grid-template-columns:auto auto;grid-template-rows:auto auto;grid-template-areas:"compared-at percentage" "price price";justify-content:flex-end;}.price-ui--value.svelte-1yemhqv {grid-area:price;text-align:right;}s.price-ui--value.svelte-1yemhqv {grid-area:compared-at;}.percentage.svelte-1yemhqv {grid-area:percentage;white-space:nowrap;}
}`
};
function ProductDetailsPagePrice(r, e) {
  push(e, !0), append_styles(r, $$css$i);
  const t = prop(e, "price", 7), s = prop(e, "comparedAt", 7), i = /* @__PURE__ */ user_derived(() => priceToDiscount({ price: t(), comparedAt: s() }));
  var n = root$g(), o = child(n);
  let l;
  var c = child(o, !0);
  reset(o);
  var u = sibling(o, 2);
  {
    var d = (p) => {
      var h = root_1$9(), g = child(h, !0);
      reset(h), template_effect(() => set_text(g, s())), append(p, h);
    };
    if_block(u, (p) => {
      s() && p(d);
    });
  }
  var f = sibling(u, 2);
  {
    var _ = (p) => {
      var h = root_2$3(), g = child(h), m = child(g);
      reset(g), reset(h), template_effect(() => set_text(m, `-${get$2(i) ?? ""}% off`)), append(p, h);
    };
    if_block(f, (p) => {
      get$2(i) && p(_);
    });
  }
  return reset(n), template_effect(
    (p) => {
      l = set_class(o, 1, "price-ui--value svelte-1yemhqv", null, l, p), set_text(c, t());
    },
    [() => ({ red: !!s() })]
  ), append(r, n), pop({
    get price() {
      return t();
    },
    set price(p) {
      t(p), flushSync();
    },
    get comparedAt() {
      return s();
    },
    set comparedAt(p) {
      s(p), flushSync();
    }
  });
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
    var i;
    return (i = s.parentElement) == null ? void 0 : i.removeChild(s);
  }), {
    update(s) {
      var i;
      s && !e && Array.from(((i = r.parentElement) == null ? void 0 : i.children) || []).filter((n) => n !== r).forEach((n) => {
        var o;
        return (o = n.parentElement) == null ? void 0 : o.removeChild(n);
      }), e = s;
    }
  };
}, normalizePrice = (r, e) => ((e === "nodiscount" || !e) && (e = void 0), e && parseCurrencyString(r).value === parseCurrencyString(e).value && (e = void 0), e && parseCurrencyString(r).value > parseCurrencyString(e).value && ([r, e] = [e, r]), { price: r, comparedAt: e }), linear = (r) => r;
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
  const l = getComputedStyle(r), c = +l.opacity, u = l.transform === "none" ? "" : l.transform, d = c * (1 - o), [f, _] = split_css_unit(i), [p, h] = split_css_unit(n);
  return {
    delay: e,
    duration: t,
    easing: s,
    css: (g, m) => `
			transform: ${u} translate(${(1 - g) * f}${_}, ${(1 - g) * p}${h});
			opacity: ${c - d * m}`
  };
}
var root$f = /* @__PURE__ */ from_html("<div><!></div>");
function ProductPrice(r, e) {
  push(e, !0);
  const [t, s] = setup_stores(), i = () => store_get(displayCurrency, "$displayCurrency", t), n = () => store_get(currencyRates, "$currencyRates", t), o = () => store_get(marketCurrency, "$marketCurrency", t), l = prop(e, "price", 7), c = prop(e, "compared_at", 7), u = prop(e, "iso_code", 7), d = prop(e, "variant_id", 7), f = prop(e, "product_id", 7), _ = prop(e, "type", 7, "ProductDetailsPagePrice"), p = prop(e, "DEV_currency", 7), h = prop(e, "DEV_market", 7), g = new NexusApi(), m = { price: "-1", comparedAt: void 0 }, y = /* @__PURE__ */ user_derived(() => normalizePrice(l(), c())), w = /* @__PURE__ */ state(proxy(m)), v = /* @__PURE__ */ state(proxy(m));
  user_effect(() => {
    if (get$2(w).price = get$2(y).price, get$2(w).comparedAt = get$2(y).comparedAt, !!u() && !(!d() && !f()) && get$2(y).price && !get$2(y).comparedAt)
      try {
        b({ ...get$2(y) }).then(({ price: A, comparedAt: S }) => {
          get$2(w).price = A, get$2(w).comparedAt = S;
        });
      } catch (A) {
        console.error(A);
      }
  }), user_effect(() => {
    if (!i() || !n()) return;
    const A = new Intl.NumberFormat(void 0, {
      style: "currency",
      currency: i(),
      // 'EUR', 'USD', etc.
      currencySign: "standard",
      currencyDisplay: "narrowSymbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }), { value: S } = parseCurrencyString(get$2(w).price);
    if (get$2(v).price = A.format(S), get$2(w).comparedAt) {
      const { value: P } = parseCurrencyString(get$2(w).comparedAt);
      get$2(v).comparedAt = A.format(P);
    } else
      get$2(v).comparedAt = void 0;
    if (o() === i()) return;
    const $ = n()[i()];
    if (get$2(v).price = A.format(Math.round(S * $)), get$2(w).comparedAt) {
      const { value: P } = parseCurrencyString(get$2(w).comparedAt);
      get$2(v).comparedAt = A.format(Math.round(P * $));
    } else
      get$2(v).comparedAt = void 0;
  });
  const b = async ({ price: A }) => {
    if (!u()) throw new Error("Market is required");
    if (!d() && !f()) throw new Error("Either variant or product id is required is required");
    const S = g.getVariantAutomaticDiscount.bind(g), $ = g.getProductAutomaticDiscount.bind(g), P = d() ? () => S(u(), +d()) : () => $(u(), +f()), { amount: R } = await P();
    if (!R || R === 0) return { price: A, comparedAt: void 0 };
    const { formatted: O } = subtractFromPriceWithSymbol(A, R);
    return { price: O, comparedAt: A };
  };
  user_effect(() => {
    p() && displayCurrency.set(p()), h() && marketCurrency.set(h());
  });
  const T = /* @__PURE__ */ user_derived(() => {
    switch (_()) {
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
  }), E = /* @__PURE__ */ user_derived(() => o() && get$2(v).price !== "-1");
  var C = root$f(), x = child(C);
  {
    var I = (A) => {
      var S = comment(), $ = first_child(S);
      component($, () => get$2(T), (P, R) => {
        R(P, spread_props(() => get$2(v)));
      }), append(A, S);
    };
    if_block(x, (A) => {
      get$2(E) && A(I);
    });
  }
  reset(C), action(C, (A, S) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(A, S), () => get$2(E)), append(r, C);
  var k = pop({
    get price() {
      return l();
    },
    set price(A) {
      l(A), flushSync();
    },
    get compared_at() {
      return c();
    },
    set compared_at(A) {
      c(A), flushSync();
    },
    get iso_code() {
      return u();
    },
    set iso_code(A) {
      u(A), flushSync();
    },
    get variant_id() {
      return d();
    },
    set variant_id(A) {
      d(A), flushSync();
    },
    get product_id() {
      return f();
    },
    set product_id(A) {
      f(A), flushSync();
    },
    get type() {
      return _();
    },
    set type(A = "ProductDetailsPagePrice") {
      _(A), flushSync();
    },
    get DEV_currency() {
      return p();
    },
    set DEV_currency(A) {
      p(A), flushSync();
    },
    get DEV_market() {
      return h();
    },
    set DEV_market(A) {
      h(A), flushSync();
    }
  });
  return s(), k;
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
    DEV_currency: {},
    DEV_market: {}
  },
  [],
  [],
  !1
));
var root_1$8 = /* @__PURE__ */ from_html('<article class="card svelte-1qhpxg8"><img class="svelte-1qhpxg8"/> <div class="content svelte-1qhpxg8"><h3 class="svelte-1qhpxg8"> </h3> <div class="tuple text-green-600 svelte-1qhpxg8"><!></div> <div class="ctas-buttons svelte-1qhpxg8"><a style="transform: rotate(180deg)"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-1qhpxg8"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a> <a class="cta svelte-1qhpxg8"><span>Add to cart</span></a>    <a><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-1qhpxg8"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a></div></div></article>');
const $$css$h = {
  hash: "svelte-1qhpxg8",
  code: `/* Colors */
/**
 * Text styles
 */.text-green-600.svelte-1qhpxg8, .text-green-600 {color:#018849;}

/**
 * Background styles
 */ .cta.svelte-1qhpxg8, .bg-green-600 {background-color:#018849;}body {display:none !important;}.cta.svelte-1qhpxg8 {color:#ffffff;cursor:pointer;}.card.svelte-1qhpxg8 {width:100%;max-width:400px;display:flex;gap:27px;color:inherit;text-decoration:none;}.caret.svelte-1qhpxg8 {background-color:#000000;color:#ffffff;fill:#ffffff;cursor:pointer;}.caret---qualified.svelte-1qhpxg8 {background-color:#018849;}.ctas-buttons.svelte-1qhpxg8 {display:flex;gap:1px;justify-content:center;align-content:center;}a.svelte-1qhpxg8 {display:flex;justify-content:center;align-items:center;font-size:14px;border:none;color:#000;background-color:#b4bed6;font-family:Monument, sans-serif;width:100%;height:41px;text-decoration:none;text-transform:uppercase;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:-0.22px;}a.svelte-1qhpxg8:nth-child(1),
a.svelte-1qhpxg8:nth-child(3) {aspect-ratio:1/1;flex-shrink:1;width:auto;}a.svelte-1qhpxg8 svg:where(.svelte-1qhpxg8) {width:16px;}.content.svelte-1qhpxg8 {width:70%;display:flex;flex-direction:column;}h3.svelte-1qhpxg8 {margin:0;margin-bottom:10px;font-weight:100;min-height:32px;font-size:16px;color:#000;font-family:Panama, sans-serif;text-align:left;cursor:pointer;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:-0.22px;line-height:16px;}.tuple.svelte-1qhpxg8 {display:flex;justify-content:space-between;align-items:start;flex-grow:1;}img.svelte-1qhpxg8 {display:block;width:30%;object-fit:cover;aspect-ratio:4/5;cursor:pointer;}`
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
      set_class(a, 1, "caret svelte-1qhpxg8", null, {}, { "caret---qualified": !0 });
      var a_1 = sibling(a, 2), a_2 = sibling(a_1, 2);
      set_class(a_2, 1, "caret svelte-1qhpxg8", null, {}, { "caret---qualified": !0 }), reset(div_2), reset(div), reset(article), template_effect(() => {
        set_attribute(img, "src", featured_image()), set_attribute(img, "alt", title()), set_text(text, title());
      }), event$1("click", img, toItem), event$1("click", h3, toItem), event$1("click", a, () => eval(onPrevious())), event$1("click", a_1, addToCart), event$1("click", a_2, () => eval(onNext())), append($$anchor, article);
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
        c || (c = this.region);
        const u = new URL(`${this.url}/${e}`);
        c && c !== "any" && (l["x-region"] = c, u.searchParams.set("forceFunctionRegion", c));
        let d;
        o && (i && !Object.prototype.hasOwnProperty.call(i, "Content-Type") || !i) && (typeof Blob < "u" && o instanceof Blob || o instanceof ArrayBuffer ? (l["Content-Type"] = "application/octet-stream", d = o) : typeof o == "string" ? (l["Content-Type"] = "text/plain", d = o) : typeof FormData < "u" && o instanceof FormData ? d = o : (l["Content-Type"] = "application/json", d = JSON.stringify(o)));
        const f = yield this.fetch(u.toString(), {
          method: n || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, l), this.headers), i),
          body: d
        }).catch((g) => {
          throw new FunctionsFetchError(g);
        }), _ = f.headers.get("x-relay-error");
        if (_ && _ === "true")
          throw new FunctionsRelayError(f);
        if (!f.ok)
          throw new FunctionsHttpError(f);
        let p = ((s = f.headers.get("Content-Type")) !== null && s !== void 0 ? s : "text/plain").split(";")[0].trim(), h;
        return p === "application/json" ? h = yield f.json() : p === "application/octet-stream" ? h = yield f.blob() : p === "text/event-stream" ? h = f : p === "multipart/form-data" ? h = yield f.formData() : h = yield f.text(), { data: h, error: null, response: f };
      } catch (i) {
        return {
          data: null,
          error: i,
          response: i instanceof FunctionsHttpError || i instanceof FunctionsRelayError ? i.context : void 0
        };
      }
    });
  }
}
var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
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
const fetch$1 = globalObject.fetch, nodeFetch = globalObject.fetch.bind(globalObject), Headers$1 = globalObject.Headers, Request = globalObject.Request, Response$1 = globalObject.Response, browser$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Headers: Headers$1,
  Request,
  Response: Response$1,
  default: nodeFetch,
  fetch: fetch$1
}, Symbol.toStringTag, { value: "Module" })), require$$0 = /* @__PURE__ */ getAugmentedNamespace(browser$1);
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
    var t, s;
    this.shouldThrowOnError = !1, this.method = e.method, this.url = e.url, this.headers = new Headers(e.headers), this.schema = e.schema, this.body = e.body, this.shouldThrowOnError = (t = e.shouldThrowOnError) !== null && t !== void 0 ? t : !1, this.signal = e.signal, this.isMaybeSingle = (s = e.isMaybeSingle) !== null && s !== void 0 ? s : !1, e.fetch ? this.fetch = e.fetch : typeof fetch > "u" ? this.fetch = node_fetch_1.default : this.fetch = fetch;
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
    return this.headers = new Headers(this.headers), this.headers.set(e, t), this;
  }
  then(e, t) {
    this.schema === void 0 || (["GET", "HEAD"].includes(this.method) ? this.headers.set("Accept-Profile", this.schema) : this.headers.set("Content-Profile", this.schema)), this.method !== "GET" && this.method !== "HEAD" && this.headers.set("Content-Type", "application/json");
    const s = this.fetch;
    let i = s(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then(async (n) => {
      var o, l, c, u;
      let d = null, f = null, _ = null, p = n.status, h = n.statusText;
      if (n.ok) {
        if (this.method !== "HEAD") {
          const w = await n.text();
          w === "" || (this.headers.get("Accept") === "text/csv" || this.headers.get("Accept") && (!((o = this.headers.get("Accept")) === null || o === void 0) && o.includes("application/vnd.pgrst.plan+text")) ? f = w : f = JSON.parse(w));
        }
        const m = (l = this.headers.get("Prefer")) === null || l === void 0 ? void 0 : l.match(/count=(exact|planned|estimated)/), y = (c = n.headers.get("content-range")) === null || c === void 0 ? void 0 : c.split("/");
        m && y && y.length > 1 && (_ = parseInt(y[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(f) && (f.length > 1 ? (d = {
          // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
          code: "PGRST116",
          details: `Results contain ${f.length} rows, application/vnd.pgrst.object+json requires 1 row`,
          hint: null,
          message: "JSON object requested, multiple (or no) rows returned"
        }, f = null, _ = null, p = 406, h = "Not Acceptable") : f.length === 1 ? f = f[0] : f = null);
      } else {
        const m = await n.text();
        try {
          d = JSON.parse(m), Array.isArray(d) && n.status === 404 && (f = [], d = null, p = 200, h = "OK");
        } catch {
          n.status === 404 && m === "" ? (p = 204, h = "No Content") : d = {
            message: m
          };
        }
        if (d && this.isMaybeSingle && (!((u = d == null ? void 0 : d.details) === null || u === void 0) && u.includes("0 rows")) && (d = null, p = 200, h = "OK"), d && this.shouldThrowOnError)
          throw new PostgrestError_1$1.default(d);
      }
      return {
        error: d,
        data: f,
        count: _,
        status: p,
        statusText: h
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
    return this.url.searchParams.set("select", s), this.headers.append("Prefer", "return=representation"), this;
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
  explain({ analyze: e = !1, verbose: t = !1, settings: s = !1, buffers: i = !1, wal: n = !1, format: o = "text" } = {}) {
    var l;
    const c = [
      e ? "analyze" : null,
      t ? "verbose" : null,
      s ? "settings" : null,
      i ? "buffers" : null,
      n ? "wal" : null
    ].filter(Boolean).join("|"), u = (l = this.headers.get("Accept")) !== null && l !== void 0 ? l : "application/json";
    return this.headers.set("Accept", `application/vnd.pgrst.plan+${o}; for="${u}"; options=${c};`), o === "json" ? this : this;
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
  maxAffected(e) {
    return this.headers.append("Prefer", "handling=strict"), this.headers.append("Prefer", `max-affected=${e}`), this;
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
    this.url = e, this.headers = new Headers(t), this.schema = s, this.fetch = i;
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
    return this.url.searchParams.set("select", o), s && this.headers.append("Prefer", `count=${s}`), new PostgrestFilterBuilder_1$2.default({
      method: i,
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
  insert(e, { count: t, defaultToNull: s = !0 } = {}) {
    var i;
    const n = "POST";
    if (t && this.headers.append("Prefer", `count=${t}`), s || this.headers.append("Prefer", "missing=default"), Array.isArray(e)) {
      const o = e.reduce((l, c) => l.concat(Object.keys(c)), []);
      if (o.length > 0) {
        const l = [...new Set(o)].map((c) => `"${c}"`);
        this.url.searchParams.set("columns", l.join(","));
      }
    }
    return new PostgrestFilterBuilder_1$2.default({
      method: n,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: (i = this.fetch) !== null && i !== void 0 ? i : fetch
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
    var o;
    const l = "POST";
    if (this.headers.append("Prefer", `resolution=${s ? "ignore" : "merge"}-duplicates`), t !== void 0 && this.url.searchParams.set("on_conflict", t), i && this.headers.append("Prefer", `count=${i}`), n || this.headers.append("Prefer", "missing=default"), Array.isArray(e)) {
      const c = e.reduce((u, d) => u.concat(Object.keys(d)), []);
      if (c.length > 0) {
        const u = [...new Set(c)].map((d) => `"${d}"`);
        this.url.searchParams.set("columns", u.join(","));
      }
    }
    return new PostgrestFilterBuilder_1$2.default({
      method: l,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch
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
    var s;
    const i = "PATCH";
    return t && this.headers.append("Prefer", `count=${t}`), new PostgrestFilterBuilder_1$2.default({
      method: i,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      body: e,
      fetch: (s = this.fetch) !== null && s !== void 0 ? s : fetch
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
    var t;
    const s = "DELETE";
    return e && this.headers.append("Prefer", `count=${e}`), new PostgrestFilterBuilder_1$2.default({
      method: s,
      url: this.url,
      headers: this.headers,
      schema: this.schema,
      fetch: (t = this.fetch) !== null && t !== void 0 ? t : fetch
    });
  }
};
PostgrestQueryBuilder$2.default = PostgrestQueryBuilder$1;
var __importDefault$1 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(PostgrestClient$2, "__esModule", { value: !0 });
const PostgrestQueryBuilder_1$1 = __importDefault$1(PostgrestQueryBuilder$2), PostgrestFilterBuilder_1$1 = __importDefault$1(PostgrestFilterBuilder$2);
let PostgrestClient$1 = class _e {
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
    this.url = e, this.headers = new Headers(t), this.schemaName = s, this.fetch = i;
  }
  /**
   * Perform a query on a table or a view.
   *
   * @param relation - The table or view name to query
   */
  from(e) {
    const t = new URL(`${this.url}/${e}`);
    return new PostgrestQueryBuilder_1$1.default(t, {
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
  schema(e) {
    return new _e(this.url, {
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
    var o;
    let l;
    const c = new URL(`${this.url}/rpc/${e}`);
    let u;
    s || i ? (l = s ? "HEAD" : "GET", Object.entries(t).filter(([f, _]) => _ !== void 0).map(([f, _]) => [f, Array.isArray(_) ? `{${_.join(",")}}` : `${_}`]).forEach(([f, _]) => {
      c.searchParams.append(f, _);
    })) : (l = "POST", u = t);
    const d = new Headers(this.headers);
    return n && d.set("Prefer", `count=${n}`), new PostgrestFilterBuilder_1$1.default({
      method: l,
      url: c,
      headers: d,
      schema: this.schemaName,
      body: u,
      fetch: (o = this.fetch) !== null && o !== void 0 ? o : fetch
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
    if (typeof process < "u" && process.versions && process.versions.node) {
      const t = parseInt(process.versions.node.split(".")[0]);
      return t >= 22 ? typeof globalThis.WebSocket < "u" ? { type: "native", constructor: globalThis.WebSocket } : {
        type: "unsupported",
        error: `Node.js ${t} detected but native WebSocket not found.`,
        workaround: "Provide a WebSocket implementation via the transport option."
      } : {
        type: "unsupported",
        error: `Node.js ${t} detected without native WebSocket support.`,
        workaround: `For Node.js < 22, install "ws" package and provide it via the transport option:
import ws from "ws"
new RealtimeClient(url, { transport: ws })`
      };
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
const version$3 = "2.15.1", DEFAULT_VERSION = `realtime-js/${version$3}`, VSN = "1.0.0", DEFAULT_TIMEOUT = 1e4, WS_CLOSE_NORMAL = 1e3, MAX_PUSH_BUFFER_SIZE = 100;
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
  return e = e.replace(/^ws/i, "http"), e = e.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, ""), e.replace(/\/+$/, "") + "/api/broadcast";
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
        const _ = d.map((m) => m.presence_ref), p = f.map((m) => m.presence_ref), h = d.filter((m) => p.indexOf(m.presence_ref) < 0), g = f.filter((m) => _.indexOf(m.presence_ref) < 0);
        h.length > 0 && (l[u] = h), g.length > 0 && (c[u] = g);
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
        const f = e[l].map((p) => p.presence_ref), _ = d.filter((p) => f.indexOf(p.presence_ref) < 0);
        e[l].unshift(..._);
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
      presence: { key: "", enabled: !1 },
      private: !1
    }, t.config), this.timeout = this.socket.timeout, this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout), this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((i) => i.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = CHANNEL_STATES.closed, this.socket._remove(this);
    }), this._onError((i) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, i), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("error", (i) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, i), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(CHANNEL_EVENTS.reply, {}, (i, n) => {
      this._trigger(this._replyEventName(n), i);
    }), this.presence = new RealtimePresence(this), this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint), this.private = this.params.config.private || !1;
  }
  /** Subscribe registers your client with the server */
  subscribe(e, t = this.timeout) {
    var s, i;
    if (this.socket.isConnected() || this.socket.connect(), this.state == CHANNEL_STATES.closed) {
      const { config: { broadcast: n, presence: o, private: l } } = this.params, c = (i = (s = this.bindings.postgres_changes) === null || s === void 0 ? void 0 : s.map((_) => _.filter)) !== null && i !== void 0 ? i : [], u = !!this.bindings[REALTIME_LISTEN_TYPES.PRESENCE] && this.bindings[REALTIME_LISTEN_TYPES.PRESENCE].length > 0, d = {}, f = {
        broadcast: n,
        presence: Object.assign(Object.assign({}, o), { enabled: u }),
        postgres_changes: c,
        private: l
      };
      this.socket.accessTokenValue && (d.access_token = this.socket.accessTokenValue), this._onError((_) => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, _)), this._onClose(() => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CLOSED)), this.updateJoinPayload(Object.assign({ config: f }, d)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", async ({ postgres_changes: _ }) => {
        var p;
        if (this.socket.setAuth(), _ === void 0) {
          e == null || e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        } else {
          const h = this.bindings.postgres_changes, g = (p = h == null ? void 0 : h.length) !== null && p !== void 0 ? p : 0, m = [];
          for (let y = 0; y < g; y++) {
            const w = h[y], { filter: { event: v, schema: b, table: T, filter: E } } = w, C = _ && _[y];
            if (C && C.event === v && C.schema === b && C.table === T && C.filter === E)
              m.push(Object.assign(Object.assign({}, w), { id: C.id }));
            else {
              this.unsubscribe(), this.state = CHANNEL_STATES.errored, e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = m, e && e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        }
      }).receive("error", (_) => {
        this.state = CHANNEL_STATES.errored, e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(_).join(", ") || "error")));
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
    this.joinPush.destroy();
    let s = null;
    return new Promise((i) => {
      s = new Push(this, CHANNEL_EVENTS.leave, {}, e), s.receive("ok", () => {
        t(), i("ok");
      }).receive("timeout", () => {
        t(), i("timed out");
      }).receive("error", () => {
        i("error");
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
    const i = new AbortController(), n = setTimeout(() => i.abort(), s), o = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: i.signal }));
    return clearTimeout(n), o;
  }
  /** @internal */
  _push(e, t, s = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let i = new Push(this, e, t, s);
    return this._canPush() ? i.send() : this._addToPushBuffer(i), i;
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
    var i, n;
    const o = e.toLocaleLowerCase(), { close: l, error: c, leave: u, join: d } = CHANNEL_EVENTS;
    if (s && [l, c, u, d].indexOf(o) >= 0 && s !== this._joinRef())
      return;
    let _ = this._onMessage(o, t, s);
    if (t && !_)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o) ? (i = this.bindings.postgres_changes) === null || i === void 0 || i.filter((p) => {
      var h, g, m;
      return ((h = p.filter) === null || h === void 0 ? void 0 : h.event) === "*" || ((m = (g = p.filter) === null || g === void 0 ? void 0 : g.event) === null || m === void 0 ? void 0 : m.toLocaleLowerCase()) === o;
    }).map((p) => p.callback(_, s)) : (n = this.bindings[o]) === null || n === void 0 || n.filter((p) => {
      var h, g, m, y, w, v;
      if (["broadcast", "presence", "postgres_changes"].includes(o))
        if ("id" in p) {
          const b = p.id, T = (h = p.filter) === null || h === void 0 ? void 0 : h.event;
          return b && ((g = t.ids) === null || g === void 0 ? void 0 : g.includes(b)) && (T === "*" || (T == null ? void 0 : T.toLocaleLowerCase()) === ((m = t.data) === null || m === void 0 ? void 0 : m.type.toLocaleLowerCase()));
        } else {
          const b = (w = (y = p == null ? void 0 : p.filter) === null || y === void 0 ? void 0 : y.event) === null || w === void 0 ? void 0 : w.toLocaleLowerCase();
          return b === "*" || b === ((v = t == null ? void 0 : t.event) === null || v === void 0 ? void 0 : v.toLocaleLowerCase());
        }
      else
        return p.type.toLocaleLowerCase() === o;
    }).map((p) => {
      if (typeof _ == "object" && "ids" in _) {
        const h = _.data, { schema: g, table: m, commit_timestamp: y, type: w, errors: v } = h;
        _ = Object.assign(Object.assign({}, {
          schema: g,
          table: m,
          commit_timestamp: y,
          eventType: w,
          new: {},
          old: {},
          errors: v
        }), this._getPayloadRecords(h));
      }
      p.callback(_, s);
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
    return this.bindings[s] && (this.bindings[s] = this.bindings[s].filter((i) => {
      var n;
      return !(((n = i.type) === null || n === void 0 ? void 0 : n.toLocaleLowerCase()) === s && RealtimeChannel.isEqual(i.filter, t));
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
    }, this.accessToken = null, this._connectionState = "disconnected", this._wasManualDisconnect = !1, this._authPromise = null, this._resolveFetch = (i) => {
      let n;
      return i ? n = i : typeof fetch > "u" ? n = (...o) => Promise.resolve().then(() => browser$1).then(({ default: l }) => l(...o)).catch((l) => {
        throw new Error(`Failed to load @supabase/node-fetch: ${l.message}. This is required for HTTP requests in Node.js environments without native fetch.`);
      }) : n = fetch, (...o) => n(...o);
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
    const s = `realtime:${e}`, i = this.getChannels().find((n) => n.topic === s);
    if (i)
      return i;
    {
      const n = new RealtimeChannel(`realtime:${e}`, t, this);
      return this.channels.push(n), n;
    }
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
      this.heartbeatCallback("disconnected");
      return;
    }
    if (this.pendingHeartbeatRef) {
      this.pendingHeartbeatRef = null, this.log("transport", "heartbeat timeout. Attempting to re-establish connection"), this.heartbeatCallback("timeout"), this._wasManualDisconnect = !1, (e = this.conn) === null || e === void 0 || e.close(WS_CLOSE_NORMAL, "heartbeat timeout"), setTimeout(() => {
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
    }), this.heartbeatCallback("sent"), this._setAuthSafely("heartbeat");
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
      t.topic === "phoenix" && t.event === "phx_reply" && this.heartbeatCallback(t.payload.status === "ok" ? "ok" : "error"), t.ref && t.ref === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null);
      const { topic: s, event: i, payload: n, ref: o } = t, l = o ? `(${o})` : "", c = n.status || "";
      this.log("receive", `${c} ${s} ${i} ${l}`.trim(), n), this.channels.filter((u) => u._isMember(s)).forEach((u) => u._trigger(i, n, o)), this._triggerStateCallbacks("message", t);
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
      const i = {
        access_token: t,
        version: DEFAULT_VERSION
      };
      t && s.updateJoinPayload(i), s.joinedOnce && s._isJoined() && s._push(CHANNEL_EVENTS.access_token, {
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
        } catch (i) {
          this.log("error", `error in ${e} callback`, i);
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
    var t, s, i, n, o, l, c, u;
    if (this.transport = (t = e == null ? void 0 : e.transport) !== null && t !== void 0 ? t : null, this.timeout = (s = e == null ? void 0 : e.timeout) !== null && s !== void 0 ? s : DEFAULT_TIMEOUT, this.heartbeatIntervalMs = (i = e == null ? void 0 : e.heartbeatIntervalMs) !== null && i !== void 0 ? i : CONNECTION_TIMEOUTS.HEARTBEAT_INTERVAL, this.worker = (n = e == null ? void 0 : e.worker) !== null && n !== void 0 ? n : !1, this.accessToken = (o = e == null ? void 0 : e.accessToken) !== null && o !== void 0 ? o : null, e != null && e.params && (this.params = e.params), e != null && e.logger && (this.logger = e.logger), (e != null && e.logLevel || e != null && e.log_level) && (this.logLevel = e.logLevel || e.log_level, this.params = Object.assign(Object.assign({}, this.params), { log_level: this.logLevel })), this.reconnectAfterMs = (l = e == null ? void 0 : e.reconnectAfterMs) !== null && l !== void 0 ? l : (d) => RECONNECT_INTERVALS[d - 1] || DEFAULT_RECONNECT_FALLBACK, this.encode = (c = e == null ? void 0 : e.encode) !== null && c !== void 0 ? c : (d, f) => f(JSON.stringify(d)), this.decode = (u = e == null ? void 0 : e.decode) !== null && u !== void 0 ? u : this.serializer.decode.bind(this.serializer), this.worker) {
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
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$1).then(({ default: s }) => s(...t)) : e = fetch, (...t) => e(...t);
}, resolveResponse = () => __awaiter$6(void 0, void 0, void 0, function* () {
  return typeof Response > "u" ? (yield Promise.resolve().then(() => browser$1)).Response : Response;
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
}, isPlainObject = (r) => {
  if (typeof r != "object" || r === null)
    return !1;
  const e = Object.getPrototypeOf(r);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in r) && !(Symbol.iterator in r);
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
    const n = r.status || 500, o = (i == null ? void 0 : i.statusCode) || n + "";
    e(new StorageApiError(_getErrorMessage$1(i), n, o));
  }).catch((i) => {
    e(new StorageUnknownError(_getErrorMessage$1(i), i));
  }) : e(new StorageUnknownError(_getErrorMessage$1(r), r));
}), _getRequestParams$1 = (r, e, t, s) => {
  const i = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return r === "GET" || !s ? i : (isPlainObject(s) ? (i.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), i.body = JSON.stringify(s)) : i.body = s, e != null && e.duplex && (i.duplex = e.duplex), Object.assign(Object.assign({}, i), t));
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
        const u = this._removeEmptyFolders(t), d = this._getFinalPath(u), f = yield (e == "PUT" ? put : post)(this.fetch, `${this.url}/object/${d}`, n, Object.assign({ headers: l }, o != null && o.duplex ? { duplex: o.duplex } : {}));
        return {
          data: { path: u, id: f.Id, fullPath: f.Key },
          error: null
        };
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
        const f = yield put(this.fetch, l.toString(), c, { headers: d });
        return {
          data: { path: n, fullPath: f.Key },
          error: null
        };
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
   * @param options Search options including limit (defaults to 100), offset, sortBy, and search
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
  /**
   * @experimental this method signature might change in the future
   * @param options search options
   * @param parameters
   */
  listV2(e, t) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const s = Object.assign({}, e);
        return { data: yield post(this.fetch, `${this.url}/object/list-v2/${this.bucketId}`, s, { headers: this.headers }, t), error: null };
      } catch (s) {
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
const version$2 = "2.11.0", DEFAULT_HEADERS$2 = { "X-Client-Info": `storage-js/${version$2}` };
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
  constructor(e, t = {}, s, i) {
    const n = new URL(e);
    i != null && i.useNewHostname && /supabase\.(co|in|red)$/.test(n.hostname) && !n.hostname.includes("storage.supabase.") && (n.hostname = n.hostname.replace("supabase.", "storage.supabase.")), this.url = n.href, this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$2), t), this.fetch = resolveFetch$2(s);
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
   * @param options.type (private-beta) specifies the bucket type. see `BucketType` for more details.
   *   - default bucket type is `STANDARD`
   */
  createBucket(e, t = {
    public: !1
  }) {
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/bucket`, {
          id: e,
          name: e,
          type: t.type,
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
  constructor(e, t = {}, s, i) {
    super(e, t, s, i);
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
const version$1 = "2.56.0";
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
function ensureTrailingSlash(r) {
  return r.endsWith("/") ? r : r + "/";
}
function applySettingDefaults(r, e) {
  var t, s;
  const { db: i, auth: n, realtime: o, global: l } = r, { db: c, auth: u, realtime: d, global: f } = e, _ = {
    db: Object.assign(Object.assign({}, c), i),
    auth: Object.assign(Object.assign({}, u), n),
    realtime: Object.assign(Object.assign({}, d), o),
    storage: {},
    global: Object.assign(Object.assign(Object.assign({}, f), l), { headers: Object.assign(Object.assign({}, (t = f == null ? void 0 : f.headers) !== null && t !== void 0 ? t : {}), (s = l == null ? void 0 : l.headers) !== null && s !== void 0 ? s : {}) }),
    accessToken: () => __awaiter$1(this, void 0, void 0, function* () {
      return "";
    })
  };
  return r.accessToken ? _.accessToken = r.accessToken : delete _.accessToken, _;
}
const version = "2.71.1", AUTO_REFRESH_TICK_DURATION_MS = 30 * 1e3, AUTO_REFRESH_TICK_THRESHOLD = 3, EXPIRY_MARGIN_MS = AUTO_REFRESH_TICK_THRESHOLD * AUTO_REFRESH_TICK_DURATION_MS, GOTRUE_URL = "http://localhost:9999", STORAGE_KEY = "supabase.auth.token", DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${version}` }, API_VERSION_HEADER_NAME = "X-Supabase-Api-Version", API_VERSIONS = {
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
function bytesToBase64URL(r) {
  const e = [], t = { queue: 0, queuedBits: 0 }, s = (i) => {
    e.push(i);
  };
  return r.forEach((i) => byteToBase64URL(i, t, s)), byteToBase64URL(null, t, s), e.join("");
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
const SIGN_OUT_SCOPES = ["global", "local", "others"];
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
      const f = await d.json(), _ = (o = d.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, p = (c = (l = d.headers.get("link")) === null || l === void 0 ? void 0 : l.split(",")) !== null && c !== void 0 ? c : [];
      return p.length > 0 && (p.forEach((h) => {
        const g = parseInt(h.split(";")[0].split("=")[1].substring(0, 1)), m = JSON.parse(h.split(";")[1].split("=")[1]);
        u[`${m}Page`] = g;
      }), u.total = parseInt(_)), { data: Object.assign(Object.assign({}, f), u), error: null };
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
const GLOBAL_JWKS = {};
class GoTrueClient {
  /**
   * Create a new client for use in the browser.
   */
  constructor(e) {
    var t, s;
    this.userStorage = null, this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = GoTrueClient.nextInstanceID, GoTrueClient.nextInstanceID += 1, this.instanceID > 0 && isBrowser() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const i = Object.assign(Object.assign({}, DEFAULT_OPTIONS), e);
    if (this.logDebugMessages = !!i.debug, typeof i.debug == "function" && (this.logger = i.debug), this.persistSession = i.persistSession, this.storageKey = i.storageKey, this.autoRefreshToken = i.autoRefreshToken, this.admin = new GoTrueAdminApi({
      url: i.url,
      headers: i.headers,
      fetch: i.fetch
    }), this.url = i.url, this.headers = i.headers, this.fetch = resolveFetch(i.fetch), this.lock = i.lock || lockNoOp, this.detectSessionInUrl = i.detectSessionInUrl, this.flowType = i.flowType, this.hasCustomAuthorizationHeader = i.hasCustomAuthorizationHeader, i.lock ? this.lock = i.lock : isBrowser() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = navigatorLock : this.lock = lockNoOp, this.jwks || (this.jwks = { keys: [] }, this.jwks_cached_at = Number.MIN_SAFE_INTEGER), this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    }, this.persistSession ? (i.storage ? this.storage = i.storage : supportsLocalStorage() ? this.storage = globalThis.localStorage : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)), i.userStorage && (this.userStorage = i.userStorage)) : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)), isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
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
        const { email: d, password: f, options: _ } = e;
        let p = null, h = null;
        this.flowType === "pkce" && ([p, h] = await getCodeChallengeAndMethod(this.storage, this.storageKey)), n = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: _ == null ? void 0 : _.emailRedirectTo,
          body: {
            email: d,
            password: f,
            data: (t = _ == null ? void 0 : _.data) !== null && t !== void 0 ? t : {},
            gotrue_meta_security: { captcha_token: _ == null ? void 0 : _.captchaToken },
            code_challenge: p,
            code_challenge_method: h
          },
          xform: _sessionResponse
        });
      } else if ("phone" in e) {
        const { phone: d, password: f, options: _ } = e;
        n = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: d,
            password: f,
            data: (s = _ == null ? void 0 : _.data) !== null && s !== void 0 ? s : {},
            channel: (i = _ == null ? void 0 : _.channel) !== null && i !== void 0 ? i : "sms",
            gotrue_meta_security: { captcha_token: _ == null ? void 0 : _.captchaToken }
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
  /**
   * Signs in a user by verifying a message signed by the user's private key.
   * Only Solana supported at this time, using the Sign in with Solana standard.
   */
  async signInWithWeb3(e) {
    const { chain: t } = e;
    if (t === "solana")
      return await this.signInWithSolana(e);
    throw new Error(`@supabase/auth-js: Unsupported chain "${t}"`);
  }
  async signInWithSolana(e) {
    var t, s, i, n, o, l, c, u, d, f, _, p;
    let h, g;
    if ("message" in e)
      h = e.message, g = e.signature;
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
      const T = new URL((t = v == null ? void 0 : v.url) !== null && t !== void 0 ? t : window.location.href);
      if ("signIn" in b && b.signIn) {
        const E = await b.signIn(Object.assign(Object.assign(Object.assign({ issuedAt: (/* @__PURE__ */ new Date()).toISOString() }, v == null ? void 0 : v.signInWithSolana), {
          // non-overridable properties
          version: "1",
          domain: T.host,
          uri: T.href
        }), w ? { statement: w } : null));
        let C;
        if (Array.isArray(E) && E[0] && typeof E[0] == "object")
          C = E[0];
        else if (E && typeof E == "object" && "signedMessage" in E && "signature" in E)
          C = E;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() returned unrecognized value");
        if ("signedMessage" in C && "signature" in C && (typeof C.signedMessage == "string" || C.signedMessage instanceof Uint8Array) && C.signature instanceof Uint8Array)
          h = typeof C.signedMessage == "string" ? C.signedMessage : new TextDecoder().decode(C.signedMessage), g = C.signature;
        else
          throw new Error("@supabase/auth-js: Wallet method signIn() API returned object without signedMessage and signature fields");
      } else {
        if (!("signMessage" in b) || typeof b.signMessage != "function" || !("publicKey" in b) || typeof b != "object" || !b.publicKey || !("toBase58" in b.publicKey) || typeof b.publicKey.toBase58 != "function")
          throw new Error("@supabase/auth-js: Wallet does not have a compatible signMessage() and publicKey.toBase58() API");
        h = [
          `${T.host} wants you to sign in with your Solana account:`,
          b.publicKey.toBase58(),
          ...w ? ["", w, ""] : [""],
          "Version: 1",
          `URI: ${T.href}`,
          `Issued At: ${(i = (s = v == null ? void 0 : v.signInWithSolana) === null || s === void 0 ? void 0 : s.issuedAt) !== null && i !== void 0 ? i : (/* @__PURE__ */ new Date()).toISOString()}`,
          ...!((n = v == null ? void 0 : v.signInWithSolana) === null || n === void 0) && n.notBefore ? [`Not Before: ${v.signInWithSolana.notBefore}`] : [],
          ...!((o = v == null ? void 0 : v.signInWithSolana) === null || o === void 0) && o.expirationTime ? [`Expiration Time: ${v.signInWithSolana.expirationTime}`] : [],
          ...!((l = v == null ? void 0 : v.signInWithSolana) === null || l === void 0) && l.chainId ? [`Chain ID: ${v.signInWithSolana.chainId}`] : [],
          ...!((c = v == null ? void 0 : v.signInWithSolana) === null || c === void 0) && c.nonce ? [`Nonce: ${v.signInWithSolana.nonce}`] : [],
          ...!((u = v == null ? void 0 : v.signInWithSolana) === null || u === void 0) && u.requestId ? [`Request ID: ${v.signInWithSolana.requestId}`] : [],
          ...!((f = (d = v == null ? void 0 : v.signInWithSolana) === null || d === void 0 ? void 0 : d.resources) === null || f === void 0) && f.length ? [
            "Resources",
            ...v.signInWithSolana.resources.map((C) => `- ${C}`)
          ] : []
        ].join(`
`);
        const E = await b.signMessage(new TextEncoder().encode(h), "utf8");
        if (!E || !(E instanceof Uint8Array))
          throw new Error("@supabase/auth-js: Wallet signMessage() API returned an recognized value");
        g = E;
      }
    }
    try {
      const { data: m, error: y } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=web3`, {
        headers: this.headers,
        body: Object.assign({ chain: "solana", message: h, signature: bytesToBase64URL(g) }, !((_ = e.options) === null || _ === void 0) && _.captchaToken ? { gotrue_meta_security: { captcha_token: (p = e.options) === null || p === void 0 ? void 0 : p.captchaToken } } : null),
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
        const { data: w, error: v } = await this._exchangeCodeForSession(e.code);
        if (v)
          throw v;
        const b = new URL(window.location.href);
        return b.searchParams.delete("code"), window.history.replaceState(window.history.state, "", b.toString()), { data: { session: w.session, redirectType: null }, error: null };
      }
      const { provider_token: s, provider_refresh_token: i, access_token: n, refresh_token: o, expires_in: l, expires_at: c, token_type: u } = e;
      if (!n || !l || !o || !u)
        throw new AuthImplicitGrantRedirectError("No session defined in URL");
      const d = Math.round(Date.now() / 1e3), f = parseInt(l);
      let _ = d + f;
      c && (_ = parseInt(c));
      const p = _ - d;
      p * 1e3 <= AUTO_REFRESH_TICK_DURATION_MS && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${p}s, should have been closer to ${f}s`);
      const h = _ - f;
      d - h >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", h, _, d) : d - h < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", h, _, d);
      const { data: g, error: m } = await this._getUser(n);
      if (m)
        throw m;
      const y = {
        provider_token: s,
        provider_refresh_token: i,
        access_token: n,
        expires_in: f,
        expires_at: _,
        refresh_token: o,
        token_type: u,
        user: g.user
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
        const { data: f, error: _ } = n;
        if (_)
          throw _;
        const p = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, e.provider, {
          redirectTo: (o = e.options) === null || o === void 0 ? void 0 : o.redirectTo,
          scopes: (l = e.options) === null || l === void 0 ? void 0 : l.scopes,
          queryParams: (c = e.options) === null || c === void 0 ? void 0 : c.queryParams,
          skipBrowserRedirect: !0
        });
        return await _request(this.fetch, "GET", p, {
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
    var e, t;
    const s = "#_recoverAndRefresh()";
    this._debug(s, "begin");
    try {
      const i = await getItemAsync(this.storage, this.storageKey);
      if (i && this.userStorage) {
        let o = await getItemAsync(this.userStorage, this.storageKey + "-user");
        !this.storage.isServer && Object.is(this.storage, this.userStorage) && !o && (o = { user: i.user }, await setItemAsync(this.userStorage, this.storageKey + "-user", o)), i.user = (e = o == null ? void 0 : o.user) !== null && e !== void 0 ? e : userNotAvailableProxy();
      } else if (i && !i.user && !i.user) {
        const o = await getItemAsync(this.storage, this.storageKey + "-user");
        o && (o != null && o.user) ? (i.user = o.user, await removeItemAsync(this.storage, this.storageKey + "-user"), await setItemAsync(this.storage, this.storageKey, i)) : i.user = userNotAvailableProxy();
      }
      if (this._debug(s, "session from storage", i), !this._isValidSession(i)) {
        this._debug(s, "session is not valid"), i !== null && await this._removeSession();
        return;
      }
      const n = ((t = i.expires_at) !== null && t !== void 0 ? t : 1 / 0) * 1e3 - Date.now() < EXPIRY_MARGIN_MS;
      if (this._debug(s, `session has${n ? "" : " not"} expired with margin of ${EXPIRY_MARGIN_MS}s`), n) {
        if (this.autoRefreshToken && i.refresh_token) {
          const { error: o } = await this._callRefreshToken(i.refresh_token);
          o && (console.error(o), isAuthRetryableFetchError(o) || (this._debug(s, "refresh failed with a non-retryable error, removing the session", o), await this._removeSession()));
        }
      } else if (i.user && i.user.__isUserNotAvailableProxy === !0)
        try {
          const { data: o, error: l } = await this._getUser(i.access_token);
          !l && (o != null && o.user) ? (i.user = o.user, await this._saveSession(i), await this._notifyAllSubscribers("SIGNED_IN", i)) : this._debug(s, "could not get user data, skipping SIGNED_IN notification");
        } catch (o) {
          console.error("Error getting user data:", o), this._debug(s, "error getting user data, skipping SIGNED_IN notification", o);
        }
      else
        await this._notifyAllSubscribers("SIGNED_IN", i);
    } catch (i) {
      this._debug(s, "error", i), console.error(i);
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
    this._debug("#_saveSession()", e), this.suppressGetSessionWarning = !0;
    const t = Object.assign({}, e), s = t.user && t.user.__isUserNotAvailableProxy === !0;
    if (this.userStorage) {
      !s && t.user && await setItemAsync(this.userStorage, this.storageKey + "-user", {
        user: t.user
      });
      const i = Object.assign({}, t);
      delete i.user;
      const n = deepClone(i);
      await setItemAsync(this.storage, this.storageKey, n);
    } else {
      const i = deepClone(t);
      await setItemAsync(this.storage, this.storageKey, i);
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
    let s = t.keys.find((l) => l.kid === e);
    if (s)
      return s;
    const i = Date.now();
    if (s = this.jwks.keys.find((l) => l.kid === e), s && this.jwks_cached_at + JWKS_TTL > i)
      return s;
    const { data: n, error: o } = await _request(this.fetch, "GET", `${this.url}/.well-known/jwks.json`, {
      headers: this.headers
    });
    if (o)
      throw o;
    return !n.keys || n.keys.length === 0 || (this.jwks = n, this.jwks_cached_at = i, s = n.keys.find((l) => l.kid === e), !s) ? null : s;
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
        const { data: p, error: h } = await this.getSession();
        if (h || !p.session)
          return { data: null, error: h };
        s = p.session.access_token;
      }
      const { header: i, payload: n, signature: o, raw: { header: l, payload: c } } = decodeJWT(s);
      t != null && t.allowExpired || validateExp(n.exp);
      const u = !i.alg || i.alg.startsWith("HS") || !i.kid || !("crypto" in globalThis && "subtle" in globalThis.crypto) ? null : await this.fetchJwk(i.kid, t != null && t.keys ? { keys: t.keys } : t == null ? void 0 : t.jwks);
      if (!u) {
        const { error: p } = await this.getUser(s);
        if (p)
          throw p;
        return {
          data: {
            claims: n,
            header: i,
            signature: o
          },
          error: null
        };
      }
      const d = getAlgorithm(i.alg), f = await crypto.subtle.importKey("jwk", u, d, !0, [
        "verify"
      ]);
      if (!await crypto.subtle.verify(d, f, o, stringToUint8Array(`${l}.${c}`)))
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
   * @param options.storage Options passed along to the storage-js constructor.
   * @param options.global.fetch A custom fetch implementation.
   * @param options.global.headers Any additional headers to send with each network request.
   */
  constructor(e, t, s) {
    var i, n, o;
    if (this.supabaseUrl = e, this.supabaseKey = t, !e)
      throw new Error("supabaseUrl is required.");
    if (!t)
      throw new Error("supabaseKey is required.");
    const l = ensureTrailingSlash(e), c = new URL(l);
    this.realtimeUrl = new URL("realtime/v1", c), this.realtimeUrl.protocol = this.realtimeUrl.protocol.replace("http", "ws"), this.authUrl = new URL("auth/v1", c), this.storageUrl = new URL("storage/v1", c), this.functionsUrl = new URL("functions/v1", c);
    const u = `sb-${c.hostname.split(".")[0]}-auth-token`, d = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: u }),
      global: DEFAULT_GLOBAL_OPTIONS
    }, f = applySettingDefaults(s ?? {}, d);
    this.storageKey = (i = f.auth.storageKey) !== null && i !== void 0 ? i : "", this.headers = (n = f.global.headers) !== null && n !== void 0 ? n : {}, f.accessToken ? (this.accessToken = f.accessToken, this.auth = new Proxy({}, {
      get: (_, p) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(p)} is not possible`);
      }
    })) : this.auth = this._initSupabaseAuthClient((o = f.auth) !== null && o !== void 0 ? o : {}, this.headers, f.global.fetch), this.fetch = fetchWithAuth(t, this._getAccessToken.bind(this), f.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, f.realtime)), this.rest = new PostgrestClient(new URL("rest/v1", c).href, {
      headers: this.headers,
      schema: f.db.schema,
      fetch: this.fetch
    }), this.storage = new StorageClient(this.storageUrl.href, this.headers, this.fetch, s == null ? void 0 : s.storage), f.accessToken || this._listenForAuthEvents();
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
      return (t = (e = s.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : this.supabaseKey;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: s, storage: i, storageKey: n, flowType: o, lock: l, debug: c }, u, d) {
    const f = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl.href,
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
    return new RealtimeClient(this.realtimeUrl.href, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
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
var root$e = /* @__PURE__ */ from_html('<h6 class="caption svelte-l7at5k"><!></h6>');
const $$css$g = {
  hash: "svelte-l7at5k",
  code: ".caption.svelte-l7at5k {font-size:12px;font-family:'Monument Regular', sans-serif;text-transform:uppercase;letter-spacing:-0.24px;margin:12px 0;}"
};
function CaptionType(r, e) {
  append_styles(r, $$css$g);
  var t = root$e(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(CaptionType, {}, ["default"], [], !0);
var root$d = /* @__PURE__ */ from_html('<h2 class="svelte-tzgj7f"><!></h2>');
const $$css$f = {
  hash: "svelte-tzgj7f",
  code: `h2.svelte-tzgj7f {font-size:18px;letter-spacing:-0.34px;text-transform:uppercase;color:#000;font-family:Monument, sans-serif;

		@media screen and (min-width: 1024px) {font-size:22px;
		}}`
};
function TitleType(r, e) {
  append_styles(r, $$css$f);
  var t = root$d(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(TitleType, {}, ["default"], [], !0);
var root$c = /* @__PURE__ */ from_html('<div class="review svelte-174em9x"><div class="header svelte-174em9x"><h6 class="svelte-174em9x"> </h6> <p class="date svelte-174em9x"> </p></div> <p class="svelte-174em9x"> </p></div>');
const $$css$e = {
  hash: "svelte-174em9x",
  code: `.review.svelte-174em9x {display:flex;flex-direction:column;gap:4px;}p.svelte-174em9x {font-family:Monument Regular;font-size:16px;color:rgba(0, 0, 0, 0.7019607843);letter-spacing:-0.25px;line-height:26px;margin:0;}h6.svelte-174em9x,
.date.svelte-174em9x {font-size:12px;font-family:Monument, sans-serif;color:#000;letter-spacing:-0.18px;text-transform:uppercase;margin:0;}.date.svelte-174em9x {opacity:0.6;}.header.svelte-174em9x {display:flex;align-items:center;gap:8px;justify-content:space-between;}
@media screen and (min-width: 1024px) {.header.svelte-174em9x {padding:24px 0;gap:12px;}
}`
};
function KnitterReviewItem(r, e) {
  push(e, !1), append_styles(r, $$css$e);
  let t = prop(e, "review", 12);
  init();
  var s = root$c(), i = child(s), n = child(i), o = child(n, !0);
  reset(n);
  var l = sibling(n, 2), c = child(l, !0);
  reset(l), reset(i);
  var u = sibling(i, 2), d = child(u, !0);
  return reset(u), reset(s), template_effect(
    (f) => {
      set_text(o, (deep_read_state(t()), untrack(() => t().created_by))), set_text(c, f), set_text(d, (deep_read_state(t()), untrack(() => t().body)));
    },
    [
      () => (deep_read_state(t()), untrack(() => t().created_at.toLocaleDateString()))
    ]
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
var root$b = /* @__PURE__ */ from_html('<section class="svelte-1s1jo0"></section>');
const $$css$d = {
  hash: "svelte-1s1jo0",
  code: "section.svelte-1s1jo0 {background:rgba(0, 0, 0, 0.02);width:100%;aspect-ratio:16/9;margin:20px 0;}"
};
function KnitterReviewsListSkeleton(r) {
  append_styles(r, $$css$d);
  var e = root$b();
  append(r, e);
}
create_custom_element(KnitterReviewsListSkeleton, {}, [], [], !0);
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
  const u = t > n ? "next" : "prev", d = (_, p) => u === "next" && _ >= p || u === "prev" && _ <= p, f = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), o === null && (o = l);
    const _ = Math.max(Math.min((l - o) / c, 1), 0), p = 0.5 - Math.cos(_ * Math.PI) / 2;
    let h = n + p * (t - n);
    if (d(h, t) && (h = t), e.wrapperEl.scrollTo({
      [s]: h
    }), d(h, t)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [s]: h
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
function elementOffset(r) {
  const e = getWindow(), t = getDocument(), s = r.getBoundingClientRect(), i = t.body, n = r.clientTop || i.clientTop || 0, o = r.clientLeft || i.clientLeft || 0, l = r === e ? e.scrollY : r.scrollTop, c = r === e ? e.scrollX : r.scrollLeft;
  return {
    top: s.top + l - n,
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
  const t = getSupport(), s = getWindow(), i = s.navigator.platform, n = e || s.navigator.userAgent, o = {
    ios: !1,
    android: !1
  }, l = s.screen.width, c = s.screen.height, u = n.match(/(Android);?[\s\/]+([\d.]+)?/);
  let d = n.match(/(iPad).*OS\s([\d_]+)/);
  const f = n.match(/(iPod)(.*OS\s([\d_]+))?/), _ = !d && n.match(/(iPhone\sOS|iOS)\s([\d_]+)/), p = i === "Win32";
  let h = i === "MacIntel";
  const g = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !d && h && t.touch && g.indexOf(`${l}x${c}`) >= 0 && (d = n.match(/(Version)\/([\d.]+)/), d || (d = [0, 1, "13_0_0"]), h = !1), u && !p && (o.os = "android", o.android = !0), (d || _ || f) && (o.os = "ios", o.ios = !0), o;
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
  const i = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(r.navigator.userAgent), n = s(), o = n || i && e.ios;
  return {
    isSafari: t || n,
    needPerspectiveFix: t,
    need3dFix: o,
    isWebView: i
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
  const i = getWindow();
  let n = null, o = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (s("beforeResize"), s("resize"));
  }, c = () => {
    !e || e.destroyed || !e.initialized || (n = new ResizeObserver((f) => {
      o = i.requestAnimationFrame(() => {
        const {
          width: _,
          height: p
        } = e;
        let h = _, g = p;
        f.forEach((m) => {
          let {
            contentBoxSize: y,
            contentRect: w,
            target: v
          } = m;
          v && v !== e.el || (h = w ? w.width : (y[0] || y).inlineSize, g = w ? w.height : (y[0] || y).blockSize);
        }), (h !== _ || g !== p) && l();
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
    const _ = o.MutationObserver || o.WebkitMutationObserver, p = new _((h) => {
      if (e.__preventObserver__) return;
      if (h.length === 1) {
        i("observerUpdate", h[0]);
        return;
      }
      const g = function() {
        i("observerUpdate", h[0]);
      };
      o.requestAnimationFrame ? o.requestAnimationFrame(g) : o.setTimeout(g, 0);
    });
    p.observe(d, {
      attributes: typeof f.attributes > "u" ? !0 : f.attributes,
      childList: e.isElement || (typeof f.childList > "u" ? !0 : f).childList,
      characterData: typeof f.characterData > "u" ? !0 : f.characterData
    }), n.push(p);
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
  function e(k, A) {
    return parseFloat(k.getPropertyValue(r.getDirectionLabel(A)) || 0);
  }
  const t = r.params, {
    wrapperEl: s,
    slidesEl: i,
    size: n,
    rtlTranslate: o,
    wrongRTL: l
  } = r, c = r.virtual && t.virtual.enabled, u = c ? r.virtual.slides.length : r.slides.length, d = elementChildren(i, `.${r.params.slideClass}, swiper-slide`), f = c ? r.virtual.slides.length : d.length;
  let _ = [];
  const p = [], h = [];
  let g = t.slidesOffsetBefore;
  typeof g == "function" && (g = t.slidesOffsetBefore.call(r));
  let m = t.slidesOffsetAfter;
  typeof m == "function" && (m = t.slidesOffsetAfter.call(r));
  const y = r.snapGrid.length, w = r.slidesGrid.length;
  let v = t.spaceBetween, b = -g, T = 0, E = 0;
  if (typeof n > "u")
    return;
  typeof v == "string" && v.indexOf("%") >= 0 ? v = parseFloat(v.replace("%", "")) / 100 * n : typeof v == "string" && (v = parseFloat(v)), r.virtualSize = -v, d.forEach((k) => {
    o ? k.style.marginLeft = "" : k.style.marginRight = "", k.style.marginBottom = "", k.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (setCSSProperty(s, "--swiper-centered-offset-before", ""), setCSSProperty(s, "--swiper-centered-offset-after", ""));
  const C = t.grid && t.grid.rows > 1 && r.grid;
  C ? r.grid.initSlides(d) : r.grid && r.grid.unsetSlides();
  let x;
  const I = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((k) => typeof t.breakpoints[k].slidesPerView < "u").length > 0;
  for (let k = 0; k < f; k += 1) {
    x = 0;
    let A;
    if (d[k] && (A = d[k]), C && r.grid.updateSlide(k, A, d), !(d[k] && elementStyle(A, "display") === "none")) {
      if (t.slidesPerView === "auto") {
        I && (d[k].style[r.getDirectionLabel("width")] = "");
        const S = getComputedStyle(A), $ = A.style.transform, P = A.style.webkitTransform;
        if ($ && (A.style.transform = "none"), P && (A.style.webkitTransform = "none"), t.roundLengths)
          x = r.isHorizontal() ? elementOuterSize(A, "width") : elementOuterSize(A, "height");
        else {
          const R = e(S, "width"), O = e(S, "padding-left"), D = e(S, "padding-right"), M = e(S, "margin-left"), N = e(S, "margin-right"), j = S.getPropertyValue("box-sizing");
          if (j && j === "border-box")
            x = R + M + N;
          else {
            const {
              clientWidth: q,
              offsetWidth: K
            } = A;
            x = R + O + D + M + N + (K - q);
          }
        }
        $ && (A.style.transform = $), P && (A.style.webkitTransform = P), t.roundLengths && (x = Math.floor(x));
      } else
        x = (n - (t.slidesPerView - 1) * v) / t.slidesPerView, t.roundLengths && (x = Math.floor(x)), d[k] && (d[k].style[r.getDirectionLabel("width")] = `${x}px`);
      d[k] && (d[k].swiperSlideSize = x), h.push(x), t.centeredSlides ? (b = b + x / 2 + T / 2 + v, T === 0 && k !== 0 && (b = b - n / 2 - v), k === 0 && (b = b - n / 2 - v), Math.abs(b) < 1 / 1e3 && (b = 0), t.roundLengths && (b = Math.floor(b)), E % t.slidesPerGroup === 0 && _.push(b), p.push(b)) : (t.roundLengths && (b = Math.floor(b)), (E - Math.min(r.params.slidesPerGroupSkip, E)) % r.params.slidesPerGroup === 0 && _.push(b), p.push(b), b = b + x + v), r.virtualSize += x + v, T = x, E += 1;
    }
  }
  if (r.virtualSize = Math.max(r.virtualSize, n) + m, o && l && (t.effect === "slide" || t.effect === "coverflow") && (s.style.width = `${r.virtualSize + v}px`), t.setWrapperSize && (s.style[r.getDirectionLabel("width")] = `${r.virtualSize + v}px`), C && r.grid.updateWrapperSize(x, _), !t.centeredSlides) {
    const k = [];
    for (let A = 0; A < _.length; A += 1) {
      let S = _[A];
      t.roundLengths && (S = Math.floor(S)), _[A] <= r.virtualSize - n && k.push(S);
    }
    _ = k, Math.floor(r.virtualSize - n) - Math.floor(_[_.length - 1]) > 1 && _.push(r.virtualSize - n);
  }
  if (c && t.loop) {
    const k = h[0] + v;
    if (t.slidesPerGroup > 1) {
      const A = Math.ceil((r.virtual.slidesBefore + r.virtual.slidesAfter) / t.slidesPerGroup), S = k * t.slidesPerGroup;
      for (let $ = 0; $ < A; $ += 1)
        _.push(_[_.length - 1] + S);
    }
    for (let A = 0; A < r.virtual.slidesBefore + r.virtual.slidesAfter; A += 1)
      t.slidesPerGroup === 1 && _.push(_[_.length - 1] + k), p.push(p[p.length - 1] + k), r.virtualSize += k;
  }
  if (_.length === 0 && (_ = [0]), v !== 0) {
    const k = r.isHorizontal() && o ? "marginLeft" : r.getDirectionLabel("marginRight");
    d.filter((A, S) => !t.cssMode || t.loop ? !0 : S !== d.length - 1).forEach((A) => {
      A.style[k] = `${v}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let k = 0;
    h.forEach((S) => {
      k += S + (v || 0);
    }), k -= v;
    const A = k > n ? k - n : 0;
    _ = _.map((S) => S <= 0 ? -g : S > A ? A + m : S);
  }
  if (t.centerInsufficientSlides) {
    let k = 0;
    h.forEach((S) => {
      k += S + (v || 0);
    }), k -= v;
    const A = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (k + A < n) {
      const S = (n - k - A) / 2;
      _.forEach(($, P) => {
        _[P] = $ - S;
      }), p.forEach(($, P) => {
        p[P] = $ + S;
      });
    }
  }
  if (Object.assign(r, {
    slides: d,
    snapGrid: _,
    slidesGrid: p,
    slidesSizesGrid: h
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    setCSSProperty(s, "--swiper-centered-offset-before", `${-_[0]}px`), setCSSProperty(s, "--swiper-centered-offset-after", `${r.size / 2 - h[h.length - 1] / 2}px`);
    const k = -r.snapGrid[0], A = -r.slidesGrid[0];
    r.snapGrid = r.snapGrid.map((S) => S + k), r.slidesGrid = r.slidesGrid.map((S) => S + A);
  }
  if (f !== u && r.emit("slidesLengthChange"), _.length !== y && (r.params.watchOverflow && r.checkOverflow(), r.emit("snapGridLengthChange")), p.length !== w && r.emit("slidesGridLengthChange"), t.watchSlidesProgress && r.updateSlidesOffset(), r.emit("slidesUpdated"), !c && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const k = `${t.containerModifierClass}backface-hidden`, A = r.el.classList.contains(k);
    f <= t.maxBackfaceHiddenSlides ? A || r.el.classList.add(k) : A && r.el.classList.remove(k);
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
    const f = (o + (t.centeredSlides ? e.minTranslate() : 0) - d) / (u.swiperSlideSize + l), _ = (o - n[0] + (t.centeredSlides ? e.minTranslate() : 0) - d) / (u.swiperSlideSize + l), p = -(o - d), h = p + e.slidesSizesGrid[c], g = p >= 0 && p <= e.size - e.slidesSizesGrid[c], m = p >= 0 && p < e.size - 1 || h > 1 && h <= e.size || p <= 0 && h >= e.size;
    m && (e.visibleSlides.push(u), e.visibleSlidesIndexes.push(c)), toggleSlideClasses$1(u, m, t.slideVisibleClass), toggleSlideClasses$1(u, g, t.slideFullyVisibleClass), u.progress = i ? -f : f, u.originalProgress = i ? -_ : _;
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
    const d = e.getSlideIndexByData(0), f = e.getSlideIndexByData(e.slides.length - 1), _ = e.slidesGrid[d], p = e.slidesGrid[f], h = e.slidesGrid[e.slidesGrid.length - 1], g = Math.abs(r);
    g >= _ ? l = (g - _) / h : l = (g + h - p) / h, l > 1 && (l -= 1);
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
  const d = (p) => {
    let h = p - e.virtual.slidesBefore;
    return h < 0 && (h = e.virtual.slides.length + h), h >= e.virtual.slides.length && (h -= e.virtual.slides.length), h;
  };
  if (typeof c > "u" && (c = getActiveIndexByTranslate(e)), s.indexOf(t) >= 0)
    u = s.indexOf(t);
  else {
    const p = Math.min(i.slidesPerGroupSkip, c);
    u = p + Math.floor((c - p) / i.slidesPerGroup);
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
  let _;
  if (e.virtual && i.virtual.enabled && i.loop)
    _ = d(c);
  else if (f) {
    const p = e.slides.find((g) => g.column === c);
    let h = parseInt(p.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(h) && (h = Math.max(e.slides.indexOf(p), 0)), _ = Math.floor(h / i.grid.rows);
  } else if (e.slides[c]) {
    const p = e.slides[c].getAttribute("data-swiper-slide-index");
    p ? _ = parseInt(p, 10) : _ = c;
  } else
    _ = c;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: u,
    previousRealIndex: o,
    realIndex: _,
    previousIndex: n,
    activeIndex: c
  }), e.initialized && preload(e), e.emit("activeIndexChange"), e.emit("snapIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && (o !== _ && e.emit("realIndexChange"), e.emit("slideChange"));
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
  return e === 0 ? (n.setTransition(0), n.setTranslate(d), t && (n.emit("beforeTransitionStart", e, i), n.emit("transitionEnd"))) : (n.setTransition(e), n.setTranslate(d), t && (n.emit("beforeTransitionStart", e, i), n.emit("transitionStart")), n.animating || (n.animating = !0, n.onTranslateToWrapperTransitionEnd || (n.onTranslateToWrapperTransitionEnd = function(_) {
    !n || n.destroyed || _.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onTranslateToWrapperTransitionEnd), n.onTranslateToWrapperTransitionEnd = null, delete n.onTranslateToWrapperTransitionEnd, n.animating = !1, t && n.emit("transitionEnd"));
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
  l || (n > o ? l = "next" : n < o ? l = "prev" : l = "reset"), e.emit(`transition${i}`), t && l === "reset" ? e.emit(`slideResetTransition${i}`) : t && n !== o && (e.emit(`slideChangeTransition${i}`), l === "next" ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`));
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
    rtlTranslate: _,
    wrapperEl: p,
    enabled: h
  } = n;
  if (!h && !s && !i || n.destroyed || n.animating && l.preventInteractionOnTransition)
    return !1;
  typeof e > "u" && (e = n.params.speed);
  const g = Math.min(n.params.slidesPerGroupSkip, o);
  let m = g + Math.floor((o - g) / n.params.slidesPerGroup);
  m >= c.length && (m = c.length - 1);
  const y = -c[m];
  if (l.normalizeSlideIndex)
    for (let C = 0; C < u.length; C += 1) {
      const x = -Math.floor(y * 100), I = Math.floor(u[C] * 100), k = Math.floor(u[C + 1] * 100);
      typeof u[C + 1] < "u" ? x >= I && x < k - (k - I) / 2 ? o = C : x >= I && x < k && (o = C + 1) : x >= I && (o = C);
    }
  if (n.initialized && o !== f && (!n.allowSlideNext && (_ ? y > n.translate && y > n.minTranslate() : y < n.translate && y < n.minTranslate()) || !n.allowSlidePrev && y > n.translate && y > n.maxTranslate() && (f || 0) !== o))
    return !1;
  o !== (d || 0) && t && n.emit("beforeSlideChangeStart"), n.updateProgress(y);
  let w;
  o > f ? w = "next" : o < f ? w = "prev" : w = "reset";
  const v = n.virtual && n.params.virtual.enabled;
  if (!(v && i) && (_ && -y === n.translate || !_ && y === n.translate))
    return n.updateActiveIndex(o), l.autoHeight && n.updateAutoHeight(), n.updateSlidesClasses(), l.effect !== "slide" && n.setTranslate(y), w !== "reset" && (n.transitionStart(t, w), n.transitionEnd(t, w)), !1;
  if (l.cssMode) {
    const C = n.isHorizontal(), x = _ ? y : -y;
    if (e === 0)
      v && (n.wrapperEl.style.scrollSnapType = "none", n._immediateVirtual = !0), v && !n._cssModeVirtualInitialSet && n.params.initialSlide > 0 ? (n._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        p[C ? "scrollLeft" : "scrollTop"] = x;
      })) : p[C ? "scrollLeft" : "scrollTop"] = x, v && requestAnimationFrame(() => {
        n.wrapperEl.style.scrollSnapType = "", n._immediateVirtual = !1;
      });
    else {
      if (!n.support.smoothScroll)
        return animateCSSModeScroll({
          swiper: n,
          targetPosition: x,
          side: C ? "left" : "top"
        }), !0;
      p.scrollTo({
        [C ? "left" : "top"]: x,
        behavior: "smooth"
      });
    }
    return !0;
  }
  const E = getBrowser().isSafari;
  return v && !i && E && n.isElement && n.virtual.update(!1, !1, o), n.setTransition(e), n.setTranslate(y), n.updateActiveIndex(o), n.updateSlidesClasses(), n.emit("beforeTransitionStart", e, s), n.transitionStart(t, w), e === 0 ? n.transitionEnd(t, w) : n.animating || (n.animating = !0, n.onSlideToWrapperTransitionEnd || (n.onSlideToWrapperTransitionEnd = function(x) {
    !n || n.destroyed || x.target === this && (n.wrapperEl.removeEventListener("transitionend", n.onSlideToWrapperTransitionEnd), n.onSlideToWrapperTransitionEnd = null, delete n.onSlideToWrapperTransitionEnd, n.transitionEnd(t, w));
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
        const _ = o * i.params.grid.rows;
        l = i.slides.find((p) => p.getAttribute("data-swiper-slide-index") * 1 === _).column;
      } else
        l = i.getSlideIndexByData(o);
      const c = n ? Math.ceil(i.slides.length / i.params.grid.rows) : i.slides.length, {
        centeredSlides: u
      } = i.params;
      let d = i.params.slidesPerView;
      d === "auto" ? d = i.slidesPerViewDynamic() : (d = Math.ceil(parseFloat(i.params.slidesPerView, 10)), u && d % 2 === 0 && (d = d + 1));
      let f = c - l < d;
      if (u && (f = f || l < Math.ceil(d / 2)), s && u && i.params.slidesPerView !== "auto" && !n && (f = !1), f) {
        const _ = u ? l < i.activeIndex ? "prev" : "next" : l - i.activeIndex - 1 < i.params.slidesPerView ? "next" : "prev";
        i.loopFix({
          direction: _,
          slideTo: !0,
          activeSlideIndex: _ === "next" ? l + 1 : l - c + 1,
          slideRealIndex: _ === "next" ? i.realIndex : void 0
        });
      }
      if (n) {
        const _ = o * i.params.grid.rows;
        o = i.slides.find((p) => p.getAttribute("data-swiper-slide-index") * 1 === _).column;
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
  function _(w) {
    return w < 0 ? -Math.floor(Math.abs(w)) : Math.floor(w);
  }
  const p = _(f), h = n.map((w) => _(w)), g = i.freeMode && i.freeMode.enabled;
  let m = n[h.indexOf(p) - 1];
  if (typeof m > "u" && (i.cssMode || g)) {
    let w;
    n.forEach((v, b) => {
      p >= v && (w = b);
    }), typeof w < "u" && (m = g ? n[w] : n[w > 0 ? w - 1 : w]);
  }
  let y = 0;
  if (typeof m < "u" && (y = o.indexOf(m), y < 0 && (y = s.activeIndex - 1), i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (y = y - s.slidesPerViewDynamic("previous", !0) + 1, y = Math.max(y, 0))), i.rewind && s.isBeginning) {
    const w = s.params.virtual && s.params.virtual.enabled && s.virtual ? s.virtual.slides.length - 1 : s.slides.length - 1;
    return s.slideTo(w, r, e, t);
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
  let i = r.getSlideIndexWhenGrid(r.clickedIndex), n;
  const o = r.isElement ? "swiper-slide" : `.${e.slideClass}`, l = r.grid && r.params.grid && r.params.grid.rows > 1;
  if (e.loop) {
    if (r.animating) return;
    n = parseInt(r.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? r.slideToLoop(n) : i > (l ? (r.slides.length - s) / 2 - (r.params.grid.rows - 1) : r.slides.length - s) ? (r.loopFix(), i = r.getSlideIndex(elementChildren(t, `${o}[data-swiper-slide-index="${n}"]`)[0]), nextTick(() => {
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
    elementChildren(i, `.${s.slideClass}, swiper-slide`).forEach((p, h) => {
      p.setAttribute("data-swiper-slide-index", h);
    });
  }, o = () => {
    const _ = elementChildren(i, `.${s.slideBlankClass}`);
    _.forEach((p) => {
      p.remove();
    }), _.length > 0 && (t.recalcSlides(), t.updateSlides());
  }, l = t.grid && s.grid && s.grid.rows > 1;
  s.loopAddBlankSlides && (s.slidesPerGroup > 1 || l) && o();
  const c = s.slidesPerGroup * (l ? s.grid.rows : 1), u = t.slides.length % c !== 0, d = l && t.slides.length % s.grid.rows !== 0, f = (_) => {
    for (let p = 0; p < _; p += 1) {
      const h = t.isElement ? createElement("swiper-slide", [s.slideBlankClass]) : createElement("div", [s.slideClass, s.slideBlankClass]);
      t.slidesEl.append(h);
    }
  };
  if (u) {
    if (s.loopAddBlankSlides) {
      const _ = c - t.slides.length % c;
      f(_), t.recalcSlides(), t.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    n();
  } else if (d) {
    if (s.loopAddBlankSlides) {
      const _ = s.grid.rows - t.slides.length % s.grid.rows;
      f(_), t.recalcSlides(), t.updateSlides();
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
    allowSlideNext: _,
    slidesEl: p,
    params: h
  } = u, {
    centeredSlides: g,
    initialSlide: m
  } = h;
  if (u.allowSlidePrev = !0, u.allowSlideNext = !0, u.virtual && h.virtual.enabled) {
    t && (!h.centeredSlides && u.snapIndex === 0 ? u.slideTo(u.virtual.slides.length, 0, !1, !0) : h.centeredSlides && u.snapIndex < h.slidesPerView ? u.slideTo(u.virtual.slides.length + u.snapIndex, 0, !1, !0) : u.snapIndex === u.snapGrid.length - 1 && u.slideTo(u.virtual.slidesBefore, 0, !1, !0)), u.allowSlidePrev = f, u.allowSlideNext = _, u.emit("loopFix");
    return;
  }
  let y = h.slidesPerView;
  y === "auto" ? y = u.slidesPerViewDynamic() : (y = Math.ceil(parseFloat(h.slidesPerView, 10)), g && y % 2 === 0 && (y = y + 1));
  const w = h.slidesPerGroupAuto ? y : h.slidesPerGroup;
  let v = g ? Math.max(w, Math.ceil(y / 2)) : w;
  v % w !== 0 && (v += w - v % w), v += h.loopAdditionalSlides, u.loopedSlides = v;
  const b = u.grid && h.grid && h.grid.rows > 1;
  d.length < y + v || u.params.effect === "cards" && d.length < y + v * 2 ? showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : b && h.grid.fill === "row" && showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const T = [], E = [], C = b ? Math.ceil(d.length / h.grid.rows) : d.length, x = o && C - m < y && !g;
  let I = x ? m : u.activeIndex;
  typeof n > "u" ? n = u.getSlideIndex(d.find((O) => O.classList.contains(h.slideActiveClass))) : I = n;
  const k = s === "next" || !s, A = s === "prev" || !s;
  let S = 0, $ = 0;
  const R = (b ? d[n].column : n) + (g && typeof i > "u" ? -y / 2 + 0.5 : 0);
  if (R < v) {
    S = Math.max(v - R, w);
    for (let O = 0; O < v - R; O += 1) {
      const D = O - Math.floor(O / C) * C;
      if (b) {
        const M = C - D - 1;
        for (let N = d.length - 1; N >= 0; N -= 1)
          d[N].column === M && T.push(N);
      } else
        T.push(C - D - 1);
    }
  } else if (R + y > C - v) {
    $ = Math.max(R - (C - v * 2), w), x && ($ = Math.max($, y - C + m + 1));
    for (let O = 0; O < $; O += 1) {
      const D = O - Math.floor(O / C) * C;
      b ? d.forEach((M, N) => {
        M.column === D && E.push(N);
      }) : E.push(D);
    }
  }
  if (u.__preventObserver__ = !0, requestAnimationFrame(() => {
    u.__preventObserver__ = !1;
  }), u.params.effect === "cards" && d.length < y + v * 2 && (E.includes(n) && E.splice(E.indexOf(n), 1), T.includes(n) && T.splice(T.indexOf(n), 1)), A && T.forEach((O) => {
    d[O].swiperLoopMoveDOM = !0, p.prepend(d[O]), d[O].swiperLoopMoveDOM = !1;
  }), k && E.forEach((O) => {
    d[O].swiperLoopMoveDOM = !0, p.append(d[O]), d[O].swiperLoopMoveDOM = !1;
  }), u.recalcSlides(), h.slidesPerView === "auto" ? u.updateSlides() : b && (T.length > 0 && A || E.length > 0 && k) && u.slides.forEach((O, D) => {
    u.grid.updateSlide(D, O, u.slides);
  }), h.watchSlidesProgress && u.updateSlidesOffset(), t) {
    if (T.length > 0 && A) {
      if (typeof e > "u") {
        const O = u.slidesGrid[I], M = u.slidesGrid[I + S] - O;
        c ? u.setTranslate(u.translate - M) : (u.slideTo(I + Math.ceil(S), 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - M, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - M));
      } else if (i) {
        const O = b ? T.length / h.grid.rows : T.length;
        u.slideTo(u.activeIndex + O, 0, !1, !0), u.touchEventsData.currentTranslate = u.translate;
      }
    } else if (E.length > 0 && k)
      if (typeof e > "u") {
        const O = u.slidesGrid[I], M = u.slidesGrid[I - $] - O;
        c ? u.setTranslate(u.translate - M) : (u.slideTo(I - $, 0, !1, !0), i && (u.touchEventsData.startTranslate = u.touchEventsData.startTranslate - M, u.touchEventsData.currentTranslate = u.touchEventsData.currentTranslate - M));
      } else {
        const O = b ? E.length / h.grid.rows : E.length;
        u.slideTo(u.activeIndex - O, 0, !1, !0);
      }
  }
  if (u.allowSlidePrev = f, u.allowSlideNext = _, u.controller && u.controller.control && !l) {
    const O = {
      slideRealIndex: e,
      direction: s,
      setTranslate: i,
      activeSlideIndex: n,
      byController: !0
    };
    Array.isArray(u.controller.control) ? u.controller.control.forEach((D) => {
      !D.destroyed && D.params.loop && D.loopFix({
        ...O,
        slideTo: D.params.slidesPerView === h.slidesPerView ? t : !1
      });
    }) : u.controller.control instanceof u.constructor && u.controller.control.params.loop && u.controller.control.loopFix({
      ...O,
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
  const f = n.noSwipingSelector ? n.noSwipingSelector : `.${n.noSwipingClass}`, _ = !!(s.target && s.target.shadowRoot);
  if (n.noSwiping && (_ ? closestElement(f, c) : c.closest(f))) {
    e.allowClick = !0;
    return;
  }
  if (n.swipeHandler && !c.closest(n.swipeHandler))
    return;
  o.currentX = s.pageX, o.currentY = s.pageY;
  const p = o.currentX, h = o.currentY;
  if (!preventEdgeSwipe(e, s, p))
    return;
  Object.assign(i, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), o.startX = p, o.startY = h, i.touchStartTime = now(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, n.threshold > 0 && (i.allowThresholdMove = !1);
  let g = !0;
  c.matches(i.focusableElements) && (g = !1, c.nodeName === "SELECT" && (i.isTouched = !1)), t.activeElement && t.activeElement.matches(i.focusableElements) && t.activeElement !== c && (s.pointerType === "mouse" || s.pointerType !== "mouse" && !c.matches(i.focusableElements)) && t.activeElement.blur();
  const m = g && e.allowTouchMove && n.touchStartPreventDefault;
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
    if (u = [...c.changedTouches].find((T) => T.identifier === s.touchId), !u || u.identifier !== s.touchId) return;
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
  const _ = n.currentX - n.startX, p = n.currentY - n.startY;
  if (t.params.threshold && Math.sqrt(_ ** 2 + p ** 2) < t.params.threshold) return;
  if (typeof s.isScrolling > "u") {
    let T;
    t.isHorizontal() && n.currentY === n.startY || t.isVertical() && n.currentX === n.startX ? s.isScrolling = !1 : _ * _ + p * p >= 25 && (T = Math.atan2(Math.abs(p), Math.abs(_)) * 180 / Math.PI, s.isScrolling = t.isHorizontal() ? T > i.touchAngle : 90 - T > i.touchAngle);
  }
  if (s.isScrolling && t.emit("touchMoveOpposite", c), typeof s.startMoving > "u" && (n.currentX !== n.startX || n.currentY !== n.startY) && (s.startMoving = !0), s.isScrolling || c.type === "touchmove" && s.preventTouchMoveFromPointerMove) {
    s.isTouched = !1;
    return;
  }
  if (!s.startMoving)
    return;
  t.allowClick = !1, !i.cssMode && c.cancelable && c.preventDefault(), i.touchMoveStopPropagation && !i.nested && c.stopPropagation();
  let h = t.isHorizontal() ? _ : p, g = t.isHorizontal() ? n.currentX - n.previousX : n.currentY - n.previousY;
  i.oneWayMovement && (h = Math.abs(h) * (o ? 1 : -1), g = Math.abs(g) * (o ? 1 : -1)), n.diff = h, h *= i.touchRatio, o && (h = -h, g = -g);
  const m = t.touchesDirection;
  t.swipeDirection = h > 0 ? "prev" : "next", t.touchesDirection = g > 0 ? "prev" : "next";
  const y = t.params.loop && !i.cssMode, w = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!s.isMoved) {
    if (y && w && t.loopFix({
      direction: t.swipeDirection
    }), s.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const T = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(T);
    }
    s.allowMomentumBounce = !1, i.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", c);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), i._loopSwapReset !== !1 && s.isMoved && s.allowThresholdMove && m !== t.touchesDirection && y && w && Math.abs(h) >= 1) {
    Object.assign(n, {
      startX: d,
      startY: f,
      currentX: d,
      currentY: f,
      startTranslate: s.currentTranslate
    }), s.loopSwapReset = !0, s.startTranslate = s.currentTranslate;
    return;
  }
  t.emit("sliderMove", c), s.isMoved = !0, s.currentTranslate = h + s.startTranslate;
  let v = !0, b = i.resistanceRatio;
  if (i.touchReleaseOnEdges && (b = 0), h > 0 ? (y && w && s.allowThresholdMove && s.currentTranslate > (i.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), s.currentTranslate > t.minTranslate() && (v = !1, i.resistance && (s.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + s.startTranslate + h) ** b))) : h < 0 && (y && w && s.allowThresholdMove && s.currentTranslate < (i.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (i.slidesPerView !== "auto" && t.slides.length - i.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (i.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(i.slidesPerView, 10)))
  }), s.currentTranslate < t.maxTranslate() && (v = !1, i.resistance && (s.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - s.startTranslate - h) ** b))), v && (c.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && s.currentTranslate < s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && s.currentTranslate > s.startTranslate && (s.currentTranslate = s.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (s.currentTranslate = s.startTranslate), i.threshold > 0)
    if (Math.abs(h) > i.threshold || s.allowThresholdMove) {
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
    if (i = [...s.changedTouches].find((T) => T.identifier === t.touchId), !i || i.identifier !== t.touchId) return;
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
  const f = now(), _ = f - t.touchStartTime;
  if (e.allowClick) {
    const T = s.path || s.composedPath && s.composedPath();
    e.updateClickedSlide(T && T[0] || s.target, T), e.emit("tap click", s), _ < 300 && f - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", s);
  }
  if (t.lastClickTime = now(), nextTick(() => {
    e.destroyed || (e.allowClick = !0);
  }), !t.isTouched || !t.isMoved || !e.swipeDirection || l.diff === 0 && !t.loopSwapReset || t.currentTranslate === t.startTranslate && !t.loopSwapReset) {
    t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
    return;
  }
  t.isTouched = !1, t.isMoved = !1, t.startMoving = !1;
  let p;
  if (o.followFinger ? p = c ? e.translate : -e.translate : p = -t.currentTranslate, o.cssMode)
    return;
  if (o.freeMode && o.freeMode.enabled) {
    e.freeMode.onTouchEnd({
      currentPos: p
    });
    return;
  }
  const h = p >= -e.maxTranslate() && !e.params.loop;
  let g = 0, m = e.slidesSizesGrid[0];
  for (let T = 0; T < u.length; T += T < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    const E = T < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof u[T + E] < "u" ? (h || p >= u[T] && p < u[T + E]) && (g = T, m = u[T + E] - u[T]) : (h || p >= u[T]) && (g = T, m = u[u.length - 1] - u[u.length - 2]);
  }
  let y = null, w = null;
  o.rewind && (e.isBeginning ? w = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (y = 0));
  const v = (p - u[g]) / m, b = g < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (_ > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" && (v >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? y : g + b) : e.slideTo(g)), e.swipeDirection === "prev" && (v > 1 - o.longSwipesRatio ? e.slideTo(g + b) : w !== null && v < 0 && Math.abs(v) > o.longSwipesRatio ? e.slideTo(w) : e.slideTo(g));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation && (s.target === e.navigation.nextEl || s.target === e.navigation.prevEl) ? s.target === e.navigation.nextEl ? e.slideTo(g + b) : e.slideTo(g) : (e.swipeDirection === "next" && e.slideTo(y !== null ? y : g + b), e.swipeDirection === "prev" && e.slideTo(w !== null ? w : g));
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
  const f = (u in n ? n[u] : void 0) || r.originalParams, _ = isGridEnabled(r, s), p = isGridEnabled(r, f), h = r.params.grabCursor, g = f.grabCursor, m = s.enabled;
  _ && !p ? (i.classList.remove(`${s.containerModifierClass}grid`, `${s.containerModifierClass}grid-column`), r.emitContainerClasses()) : !_ && p && (i.classList.add(`${s.containerModifierClass}grid`), (f.grid.fill && f.grid.fill === "column" || !f.grid.fill && s.grid.fill === "column") && i.classList.add(`${s.containerModifierClass}grid-column`), r.emitContainerClasses()), h && !g ? r.unsetGrabCursor() : !h && g && r.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((E) => {
    if (typeof f[E] > "u") return;
    const C = s[E] && s[E].enabled, x = f[E] && f[E].enabled;
    C && !x && r[E].disable(), !C && x && r[E].enable();
  });
  const y = f.direction && f.direction !== s.direction, w = s.loop && (f.slidesPerView !== s.slidesPerView || y), v = s.loop;
  y && t && r.changeDirection(), extend(r.params, f);
  const b = r.params.enabled, T = r.params.loop;
  Object.assign(r, {
    allowTouchMove: r.params.allowTouchMove,
    allowSlideNext: r.params.allowSlideNext,
    allowSlidePrev: r.params.allowSlidePrev
  }), m && !b ? r.disable() : !m && b && r.enable(), r.currentBreakpoint = u, r.emit("_beforeBreakpoint", f), t && (w ? (r.loopDestroy(), r.loopCreate(e), r.updateSlides()) : !v && T ? (r.loopCreate(e), r.updateSlides()) : v && !T && r.loopDestroy()), r.emit("breakpoint", f);
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
        const _ = extend({}, t, {
          el: f
        });
        d.push(new Swiper(_));
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
      let f = n[u] ? Math.ceil(n[u].swiperSlideSize) : 0, _;
      for (let p = u + 1; p < n.length; p += 1)
        n[p] && !_ && (f += Math.ceil(n[p].swiperSlideSize), d += 1, f > c && (_ = !0));
      for (let p = u - 1; p >= 0; p -= 1)
        n[p] && !_ && (f += n[p].swiperSlideSize, d += 1, f > c && (_ = !0));
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
var root_4 = /* @__PURE__ */ from_html('<p class="svelte-t4awvj">No messages yet. Be first one to leave a feedback.</p>'), root_6$1 = /* @__PURE__ */ from_html('<figure class="svelte-t4awvj"><!></figure>'), root_5 = /* @__PURE__ */ from_html('<section class="svelte-t4awvj"></section>'), root$a = /* @__PURE__ */ from_html("<!> <!>", 1);
const $$css$c = {
  hash: "svelte-t4awvj",
  code: `figure.svelte-t4awvj {border-bottom:1px solid black;margin:12px 0;padding:0 0 12px 0;}
@media screen and (min-width: 1024px) {figure.svelte-t4awvj {margin:24px 0;padding:0 0 24px 0;}
}section.svelte-t4awvj {margin-bottom:40px;}
@media screen and (min-width: 1024px) {section.svelte-t4awvj {margin-bottom:60px;}
}p.svelte-t4awvj {font-family:Monument Regular, sans-serif;opacity:0.5;margin-bottom:32px;}`
};
function KnitterReviewsList(r, e) {
  push(e, !1), append_styles(r, $$css$c);
  let t = prop(e, "id", 12, void 0), s = prop(e, "isFetchBlock", 12, !1), i = /* @__PURE__ */ mutable_source([]), n = /* @__PURE__ */ mutable_source(!1), o = /* @__PURE__ */ mutable_source(!1);
  const l = async () => {
    if (!t()) return console.error("No id provided");
    const { data: p, error: h } = await supabase.from("knitter_reviews").select("*").order("created_at", { ascending: !1 }).eq("knitter_id", t());
    p && (set(i, p.map((g) => ({ ...g, created_at: new Date(g.created_at) }))), setTimeout(() => set(n, !0)), set(o, !0));
  };
  legacy_pre_effect(() => (deep_read_state(s()), get$2(o)), () => {
    !s() && !get$2(o) && l();
  }), legacy_pre_effect_reset(), init();
  var c = root$a(), u = first_child(c);
  TitleType(u, {
    children: (p, h) => {
      next();
      var g = text("Customers feedback");
      append(p, g);
    },
    $$slots: { default: !0 }
  });
  var d = sibling(u, 2);
  {
    var f = (p) => {
      KnitterReviewsListSkeleton(p);
    }, _ = (p) => {
      var h = comment(), g = first_child(h);
      {
        var m = (w) => {
          var v = root_4();
          append(w, v);
        }, y = (w) => {
          var v = root_5();
          each(v, 5, () => get$2(i), index, (b, T) => {
            var E = root_6$1(), C = child(E);
            KnitterReviewItem(C, {
              get review() {
                return get$2(T);
              }
            }), reset(E), append(b, E);
          }), reset(v), transition$1(3, v, () => fade), append(w, v);
        };
        if_block(
          g,
          (w) => {
            get$2(i), untrack(() => get$2(i).length === 0) ? w(m) : w(y, !1);
          },
          !0
        );
      }
      append(p, h);
    };
    if_block(d, (p) => {
      get$2(n) ? p(_, !1) : p(f);
    });
  }
  return append(r, c), pop({
    get id() {
      return t();
    },
    set id(p) {
      t(p), flushSync();
    },
    get isFetchBlock() {
      return s();
    },
    set isFetchBlock(p) {
      s(p), flushSync();
    }
  });
}
create_custom_element(KnitterReviewsList, { id: {}, isFetchBlock: {} }, [], [], !0);
var root$9 = /* @__PURE__ */ from_html("<button><!></button>");
const $$css$b = {
  hash: "svelte-ph9rtg",
  code: "button.svelte-ph9rtg {width:178px;height:52px;background:#018849;cursor:pointer;border:none;color:#fff;font-family:Monument, sans-serif;font-size:16px;letter-spacing:-0.25px;text-transform:uppercase;display:flex;align-items:center;word-break:keep-all;white-space:nowrap;justify-content:center;}.w-full.svelte-ph9rtg {width:100%;}.disabled.svelte-ph9rtg {opacity:0.5;cursor:default;}"
};
function Button(r, e) {
  push(e, !1), append_styles(r, $$css$b);
  let t = prop(e, "fullWidth", 12, !1), s = prop(e, "disabled", 12, !1), i = prop(e, "type", 12, "button");
  var n = root$9();
  let o;
  var l = child(n);
  return slot(l, e, "default", {}), reset(n), template_effect(
    (c) => {
      set_attribute(n, "type", i()), n.disabled = s(), o = set_class(n, 1, "svelte-ph9rtg", null, o, c);
    },
    [() => ({ "w-full": t(), disabled: s() })]
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
var root_3$1 = /* @__PURE__ */ from_html('<p class="error svelte-xo5t5q">There was an error submitting your message. Please try again later.</p>'), root_2$2 = /* @__PURE__ */ from_html('<form action="" class="svelte-xo5t5q"><textarea name="" id="" cols="30" rows="10 " placeholder="Enter your feedback here..." class="svelte-xo5t5q"></textarea> <div class="cta svelte-xo5t5q"><input type="text" placeholder="Enter your name..." class="svelte-xo5t5q"/> <!> <!></div></form>'), root_6 = /* @__PURE__ */ from_html('<p class="success svelte-xo5t5q">Review submitted successfully!</p>'), root$8 = /* @__PURE__ */ from_html("<!> <!>", 1);
const $$css$a = {
  hash: "svelte-xo5t5q",
  code: `input.svelte-xo5t5q {border:none;padding:6px 16px;border-bottom:1px solid black;width:100%;font-size:16px;margin:12px 0;box-sizing:border-box;background:transparent;color:black;}input.svelte-xo5t5q:focus {outline:none;}p.svelte-xo5t5q {font-family:"Monument Regular", sans-serif;padding:8px 16px;}p.success.svelte-xo5t5q {background:#b0beb2;}p.error.svelte-xo5t5q {background:#f6a3a3;}textarea.svelte-xo5t5q {width:100%;aspect-ratio:4/1;border:1px solid black;box-sizing:border-box;resize:none;background:transparent;padding:12px 16px;font-family:"Monument Regular", sans-serif;font-size:16px;color:black;}textarea.svelte-xo5t5q:focus {outline:none;}
@media screen and (min-width: 1024px) {textarea.svelte-xo5t5q {aspect-ratio:8/1;font-size:16px;}
}form.svelte-xo5t5q {display:flex;flex-direction:column;align-items:flex-end;gap:12px;}.cta.svelte-xo5t5q {width:100%;gap:12px;display:grid;grid-template-columns:1fr;grid-template-rows:auto auto;}`
};
function KnitterReviewForm(r, e) {
  push(e, !1), append_styles(r, $$css$a);
  let t = prop(e, "id", 12, void 0), s = /* @__PURE__ */ mutable_source(""), i = /* @__PURE__ */ mutable_source(""), n = /* @__PURE__ */ mutable_source("idle");
  const o = createEventDispatcher(), l = async () => {
    const { error: p } = await supabase.from("knitter_reviews").insert([
      {
        knitter_id: t(),
        body: get$2(i),
        created_by: get$2(s)
      }
    ]);
    p ? set(n, "error") : set(n, "success"), setTimeout(() => o("submit"));
  };
  init();
  var c = root$8(), u = first_child(c);
  TitleType(u, {
    children: (p, h) => {
      next();
      var g = text("Leave a feedback");
      append(p, g);
    },
    $$slots: { default: !0 }
  });
  var d = sibling(u, 2);
  {
    var f = (p) => {
      var h = root_2$2(), g = child(h);
      remove_textarea_child(g);
      var m = sibling(g, 2), y = child(m);
      remove_input_defaults(y);
      var w = sibling(y, 2);
      {
        var v = (T) => {
          var E = root_3$1();
          append(T, E);
        };
        if_block(w, (T) => {
          get$2(n) === "error" && T(v);
        });
      }
      var b = sibling(w, 2);
      {
        let T = /* @__PURE__ */ derived_safe_equal(() => !get$2(i) || !get$2(s));
        Button(b, {
          type: "submit",
          fullWidth: !0,
          get disabled() {
            return get$2(T);
          },
          children: (E, C) => {
            next();
            var x = text("Leave a feedback");
            append(E, x);
          },
          $$slots: { default: !0 }
        });
      }
      reset(m), reset(h), bind_value(g, () => get$2(i), (T) => set(i, T)), bind_value(y, () => get$2(s), (T) => set(s, T)), event$1("submit", h, preventDefault(l)), append(p, h);
    }, _ = (p) => {
      var h = comment(), g = first_child(h);
      {
        var m = (y) => {
          var w = root_6();
          append(y, w);
        };
        if_block(
          g,
          (y) => {
            get$2(n) === "success" && y(m);
          },
          !0
        );
      }
      append(p, h);
    };
    if_block(d, (p) => {
      get$2(n) === "idle" || get$2(n) === "error" ? p(f) : p(_, !1);
    });
  }
  return append(r, c), pop({
    get id() {
      return t();
    },
    set id(p) {
      t(p), flushSync();
    }
  });
}
create_custom_element(KnitterReviewForm, { id: {} }, [], [], !0);
var root$7 = /* @__PURE__ */ from_html('<p class="svelte-7fo9ce">↑</p>');
const $$css$9 = {
  hash: "svelte-7fo9ce",
  code: `p.svelte-7fo9ce {margin:0;font-family:Monument, sans-serif;letter-spacing:-0.43px;color:#000;}
@media (max-width: 812px) {p.svelte-7fo9ce {letter-spacing:-0.18px;}
}
@media (min-width: 320px) and (max-width: 480px) {p.svelte-7fo9ce {letter-spacing:-0.18px;}
}`
};
function ArrowIcon(r) {
  append_styles(r, $$css$9);
  var e = root$7();
  append(r, e);
}
create_custom_element(ArrowIcon, {}, [], [], !0);
var root_1$7 = /* @__PURE__ */ from_html("<div><!> <!></div>"), root$6 = /* @__PURE__ */ from_html('<div class="accordion svelte-pbk1c8"><div class="header grid svelte-pbk1c8"><img class="avatar svelte-pbk1c8"/> <h3 class="svelte-pbk1c8"> </h3> <div><!></div></div> <div class="content grid svelte-pbk1c8"><p> </p> <img/> <!></div></div>');
const $$css$8 = {
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
  push(e, !1), append_styles(r, $$css$8);
  let t = prop(e, "name", 12, void 0), s = prop(e, "id", 12, void 0), i = prop(e, "description", 12, void 0), n = prop(e, "photo", 12, void 0), o = prop(e, "avatar", 12, void 0), l = !1, c = /* @__PURE__ */ mutable_source(!1), u = /* @__PURE__ */ mutable_source(!1), d = /* @__PURE__ */ mutable_source(), f = /* @__PURE__ */ mutable_source();
  const _ = () => {
    set(c, !get$2(c));
  }, p = (N = 150) => {
    if (!get$2(f)) return;
    const q = get$2(f).getBoundingClientRect().top + window.pageYOffset - N;
    window.scrollTo({ top: q, behavior: "smooth" });
  }, h = () => {
    set(u, !1), get$2(d) && (window.innerWidth >= 1024 && p(114), window.innerWidth < 1024 && p(52), mutate(d, get$2(d).style.maxHeight = "inherit"), get$2(d).removeEventListener("transitionend", h));
  }, g = () => {
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
    const N = new URLSearchParams(window.location.search), { knitter: j } = Object.fromEntries(N.entries());
    j === s() && set(c, !0);
  };
  onMount(() => {
    get$2(c) ? g() : m(), w();
  }), legacy_pre_effect(() => get$2(c), () => {
    get$2(c) && g();
  }), legacy_pre_effect(() => get$2(c), () => {
    get$2(c) || m();
  }), legacy_pre_effect_reset(), init();
  var v = root$6();
  event$1("resize", $window, y);
  var b = child(v), T = child(b), E = sibling(T, 2), C = child(E, !0);
  reset(E);
  var x = sibling(E, 2);
  let I;
  var k = child(x);
  ArrowIcon(k), reset(x), reset(b);
  var A = sibling(b, 2), S = child(A);
  let $;
  var P = child(S, !0);
  reset(S);
  var R = sibling(S, 2);
  let O;
  var D = sibling(R, 2);
  {
    var M = (N) => {
      var j = root_1$7();
      let q;
      var K = child(j);
      {
        let ce = /* @__PURE__ */ derived_safe_equal(() => !get$2(c) || get$2(u));
        KnitterReviewsList(K, {
          get id() {
            return s();
          },
          get isFetchBlock() {
            return get$2(ce);
          }
        });
      }
      var ae = sibling(K, 2);
      KnitterReviewForm(ae, {
        get id() {
          return s();
        }
      }), reset(j), template_effect((ce) => q = set_class(j, 1, "reviews svelte-pbk1c8", null, q, ce), [
        () => ({ "fade-in": get$2(c), "fade-out": !get$2(c) })
      ]), append(N, j);
    };
    if_block(D, (N) => {
      s() && N(M);
    });
  }
  return reset(A), bind_this(A, (N) => set(d, N), () => get$2(d)), reset(v), bind_this(v, (N) => set(f, N), () => get$2(f)), template_effect(
    (N, j, q) => {
      set_attribute(T, "src", o()), set_attribute(T, "alt", `Small picture of ${t() ?? ""}`), set_text(C, t()), I = set_class(x, 1, "arrow svelte-pbk1c8", null, I, N), $ = set_class(S, 1, "svelte-pbk1c8", null, $, j), set_text(P, i()), O = set_class(R, 1, "photo svelte-pbk1c8", null, O, q), set_attribute(R, "src", n()), set_attribute(R, "alt", `Picture of ${t() ?? ""}`);
    },
    [
      () => ({ "arrow---down": get$2(c) }),
      () => ({ "fade-in": get$2(c), "fade-out": !get$2(c) }),
      () => ({ "fade-in": get$2(c), "fade-out": !get$2(c) })
    ]
  ), event$1("click", b, _), append(r, v), pop({
    get name() {
      return t();
    },
    set name(N) {
      t(N), flushSync();
    },
    get id() {
      return s();
    },
    set id(N) {
      s(N), flushSync();
    },
    get description() {
      return i();
    },
    set description(N) {
      i(N), flushSync();
    },
    get photo() {
      return n();
    },
    set photo(N) {
      n(N), flushSync();
    },
    get avatar() {
      return o();
    },
    set avatar(N) {
      o(N), flushSync();
    }
  });
}
customElements.define("knitter-accordion-item", create_custom_element(KnittersAccordionItem, { name: {}, id: {}, description: {}, photo: {}, avatar: {} }, [], [], !0));
var root$5 = /* @__PURE__ */ from_html('<div class="svelte-1sgbr3w"><!></div>');
const $$css$7 = {
  hash: "svelte-1sgbr3w",
  code: `div.svelte-1sgbr3w {padding:0 8px;

		@media screen and (min-width: 1024px) {padding:0 25px;
		}}`
};
function ContentWrapper(r, e) {
  append_styles(r, $$css$7);
  var t = root$5(), s = child(t);
  slot(s, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(ContentWrapper, {}, ["default"], [], !0);
var root_1$6 = /* @__PURE__ */ from_html('<section class="title-section svelte-emjvyd"><h2 class="svelte-emjvyd">All Knitters</h2></section> <section class="list svelte-emjvyd"><!></section>', 1), root$4 = /* @__PURE__ */ from_html("<div><!></div>");
const $$css$6 = {
  hash: "svelte-emjvyd",
  code: `h2.svelte-emjvyd {font-size:28px;letter-spacing:-0.43px;line-height:18px;font-weight:300;margin:0;}
@media screen and (min-width: 1024px) {h2.svelte-emjvyd {font-family:Panama, sans-serif;font-size:62px;letter-spacing:-0.95px;line-height:70px;color:#000;}
}.title-section.svelte-emjvyd {height:93px;border-top:1px solid black;border-bottom:1px solid black;display:flex;align-items:center;}
@media screen and (min-width: 1024px) {.title-section.svelte-emjvyd {height:241px;justify-content:center;}
}.list.svelte-emjvyd {display:flex;flex-direction:column;}`
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
  var i = root$4(), n = child(i);
  ContentWrapper(n, {
    children: (o, l) => {
      var c = root_1$6(), u = sibling(first_child(c), 2), d = child(u);
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
var root_1$5 = /* @__PURE__ */ from_html('<button class="main svelte-ymfpde"> </button>'), root_3 = /* @__PURE__ */ from_html('<li role="menuitem"><button class="menuitem svelte-ymfpde"> </button></li>'), root_2$1 = /* @__PURE__ */ from_html('<ul role="menu" class="svelte-ymfpde"></ul>'), root$3 = /* @__PURE__ */ from_html('<div class="wrapper svelte-ymfpde"><!> <div><!></div></div>');
const $$css$5 = {
  hash: "svelte-ymfpde",
  code: ".wrapper.svelte-ymfpde {display:inline-flex;position:relative;}button.main.svelte-ymfpde {background:transparent;padding:8px 16px;border:none;cursor:pointer;width:max-content;font-weight:600;}.dropdown.svelte-ymfpde {position:absolute;top:100%;margin-top:8px;}.dropdown.left.svelte-ymfpde {left:0;}.dropdown.center.svelte-ymfpde {left:50%;transform:translateX(-50%);}.dropdown.right.svelte-ymfpde {right:0;}ul.svelte-ymfpde {list-style:none;padding:0 0;width:max-content;margin:0;border:1px solid rgba(0, 0, 0, 0.01);}button.menuitem.svelte-ymfpde {background:transparent;border:none;padding:8px 16px;transition:background-color 0.3s ease;cursor:pointer;font-weight:600;}button.menuitem.svelte-ymfpde:hover {background:rgba(0, 0, 0, 0.05);}"
};
function CurrencySelector(r, e) {
  push(e, !1), append_styles(r, $$css$5);
  const [t, s] = setup_stores(), i = () => store_get(displayCurrency, "$displayCurrency", t);
  function n(x, {
    y: I = 100,
    scale: k = 0.5,
    duration: A = 300,
    easing: S = sineIn
    // Try different easing functions
  }) {
    return {
      duration: A,
      easing: S,
      css: ($) => `
        transform:
          scale(${k + (1 - k) * $})
          translateY(${(1 - $) * I}px);
        opacity: ${$};
      `
    };
  }
  let o = prop(e, "params", 12, void 0), l = prop(e, "available", 28, () => []), c = prop(e, "active", 12, void 0), u = prop(e, "left", 12, !0), d = prop(e, "center", 12, !1), f = prop(e, "right", 12, !1), _ = prop(e, "bg", 12, "#eeeeea"), p = /* @__PURE__ */ mutable_source(!1), h = /* @__PURE__ */ mutable_source(!1);
  const g = (x) => {
    set(p, !1), set(h, !0), c(x), displayCurrency.set(x.currency);
  };
  legacy_pre_effect(
    () => (deep_read_state(o()), i(), get$2(h)),
    () => {
      if (o() && i())
        try {
          const { available: x } = JSON.parse(o());
          l(x), c(x.find((I) => I.currency === i()));
        } catch (x) {
          console.error("UI", x);
        }
      else get$2(h) && set(h, !1);
    }
  ), legacy_pre_effect_reset(), init();
  var m = root$3(), y = child(m);
  {
    var w = (x) => {
      var I = root_1$5(), k = child(I);
      reset(I), template_effect(() => set_text(k, `${deep_read_state(c()), untrack(() => c().symbol) ?? ""} ${deep_read_state(c()), untrack(() => c().currency) ?? ""}`)), event$1("click", I, () => set(p, !get$2(p))), append(x, I);
    };
    if_block(y, (x) => {
      c() && x(w);
    });
  }
  var v = sibling(y, 2);
  let b;
  var T = child(v);
  {
    var E = (x) => {
      var I = root_2$1();
      each(I, 5, l, index, (k, A) => {
        var S = root_3(), $ = child(S), P = child($);
        reset($), reset(S), template_effect(() => set_text(P, `${get$2(A), untrack(() => get$2(A).symbol) ?? ""}
							${get$2(A), untrack(() => get$2(A).currency) ?? ""}`)), event$1("click", $, () => g(get$2(A))), append(k, S);
      }), reset(I), template_effect(() => set_style(I, `background: ${_()}`)), transition$1(3, I, () => n, () => ({ y: -16, scale: 0.95, duration: 250, easing: expoOut })), append(x, I);
    };
    if_block(T, (x) => {
      get$2(p) && x(E);
    });
  }
  reset(v), reset(m), template_effect((x) => b = set_class(v, 1, "dropdown svelte-ymfpde", null, b, x), [() => ({ left: u(), center: d(), right: f() })]), append(r, m);
  var C = pop({
    get params() {
      return o();
    },
    set params(x) {
      o(x), flushSync();
    },
    get available() {
      return l();
    },
    set available(x) {
      l(x), flushSync();
    },
    get active() {
      return c();
    },
    set active(x) {
      c(x), flushSync();
    },
    get left() {
      return u();
    },
    set left(x) {
      u(x), flushSync();
    },
    get center() {
      return d();
    },
    set center(x) {
      d(x), flushSync();
    },
    get right() {
      return f();
    },
    set right(x) {
      f(x), flushSync();
    },
    get bg() {
      return _();
    },
    set bg(x) {
      _(x), flushSync();
    }
  });
  return s(), C;
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
  hash: "svelte-163f7ne",
  code: `.discount-percentage.svelte-163f7ne {font-family:"Monument", sans-serif;color:rgb(210, 25, 16);}.discount-percentage.small.svelte-163f7ne {gap:8px;font-size:16px;letter-spacing:-0.22px;}
@media screen and (max-width: 1024px) {.discount-percentage.small.svelte-163f7ne {font-size:12px;gap:4px;}
}.discount-percentage.big.svelte-163f7ne {gap:16px;font-size:42px;}
@media screen and (max-width: 1024px) {.discount-percentage.big.svelte-163f7ne {font-size:20px;gap:8px;}
}`
};
function ProductDiscountPercentage(r, e) {
  push(e, !1), append_styles(r, $$css$4);
  let t = prop(e, "price", 12, ""), s = prop(e, "compared_at", 12, void 0), i = prop(e, "iso_code", 12, void 0), n = prop(e, "variant_id", 12, void 0), o = prop(e, "theme", 12, "big"), l = /* @__PURE__ */ mutable_source(t()), c = /* @__PURE__ */ mutable_source(s());
  const u = new NexusApi();
  let d = /* @__PURE__ */ mutable_source(), f = prop(e, "discountPercentage", 12);
  const _ = async () => {
    if (!i() || !n() || s() && s() !== "nodiscount") return;
    const { amount: m } = await u.getAutomaticDiscount(i(), +n());
    if (!m) return;
    const { formatted: y } = subtractFromPriceWithSymbol(t(), m);
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
      i() && n() && t() && (s() || !s()) && _();
    }
  ), legacy_pre_effect_reset(), init();
  var p = comment(), h = first_child(p);
  {
    var g = (m) => {
      var y = root_1$4();
      let w;
      var v = child(y);
      reset(y), template_effect(
        (b) => {
          w = set_class(y, 1, "discount-percentage svelte-163f7ne", null, w, b), set_text(v, `-${f() ?? ""}% off`);
        },
        [
          () => ({
            "has-discount": get$2(d).compared_at && get$2(d).compared_at !== get$2(d).price,
            small: o() === "small",
            big: o() === "big"
          })
        ]
      ), append(m, y);
    };
    if_block(h, (m) => {
      f() && +f() > 0 && m(g);
    });
  }
  return append(r, p), pop({
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
`, createStorefrontApiClient = () => {
  throw new Error("VITE_SHOPIFY_SHOP_URL environment variable is not defined");
}, storefrontApi = () => {
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
            lines: o.map((_) => ({
              merchandiseId: _.variantGid,
              quantity: _.quantity
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
        (_) => {
          var p;
          return ((p = _ == null ? void 0 : _.node) == null ? void 0 : p.id) === `gid://shopify/ProductVariant/${o}`;
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
  let t = prop(e, "handle", 12, void 0), s = prop(e, "variantId", 12, void 0), i = prop(e, "message", 12, void 0);
  const n = async () => {
    if (!t() || !s()) {
      i(null);
      return;
    }
    i(await storefrontApi().getPreOrderMessage(t(), s()));
  };
  legacy_pre_effect(() => (deep_read_state(t()), deep_read_state(s())), () => {
    t() && s() && n();
  }), legacy_pre_effect_reset(), init();
  var o = root$2(), l = child(o);
  {
    var c = (u) => {
      var d = root_1$3(), f = child(d, !0);
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
function ProductForm(r) {
}
create_custom_element(ProductForm, {}, [], [], !0);
var root_1$2 = /* @__PURE__ */ from_html('<table class="svelte-1dtzky1"><tbody><tr><td>cookies</td><td>cart_currency</td><td> </td></tr><tr><td>cookies</td><td>localization</td><td> </td></tr><tr><td>localStorage</td><td>displayCurrency</td><td> </td></tr><tr><td>localStorage</td><td>marketCurrency</td><td> </td></tr><tr><td>localStorage</td><td>localization</td><td> </td></tr></tbody></table>');
const $$css$3 = {
  hash: "svelte-1dtzky1",
  code: "table.svelte-1dtzky1 {position:fixed;top:8px;left:8px;z-index:10000;background:black;color:white;padding:5px;font-size:12px;}"
};
function DevMarketDetails(r, e) {
  push(e, !0), append_styles(r, $$css$3);
  const [t, s] = setup_stores(), i = () => store_get(displayCurrency, "$displayCurrency", t), n = () => store_get(marketCurrency, "$marketCurrency", t), o = () => store_get(localization, "$localization", t), l = prop(e, "show", 7, !1);
  var c = comment(), u = first_child(c);
  {
    var d = (_) => {
      var p = root_1$2(), h = child(p), g = child(h), m = sibling(child(g), 2), y = child(m, !0);
      reset(m), reset(g);
      var w = sibling(g), v = sibling(child(w), 2), b = child(v, !0);
      reset(v), reset(w);
      var T = sibling(w), E = sibling(child(T), 2), C = child(E, !0);
      reset(E), reset(T);
      var x = sibling(T), I = sibling(child(x), 2), k = child(I, !0);
      reset(I), reset(x);
      var A = sibling(x), S = sibling(child(A), 2), $ = child(S, !0);
      reset(S), reset(A), reset(h), reset(p), template_effect(
        (P, R) => {
          set_text(y, P), set_text(b, R), set_text(C, i()), set_text(k, n()), set_text($, o());
        },
        [
          () => getCookie("cart_currency"),
          () => getCookie("localization")
        ]
      ), append(_, p);
    };
    if_block(u, (_) => {
      l() && _(d);
    });
  }
  append(r, c);
  var f = pop({
    get show() {
      return l();
    },
    set show(_ = !1) {
      l(_), flushSync();
    }
  });
  return s(), f;
}
customElements.define("dev-market-details", create_custom_element(DevMarketDetails, { show: {} }, [], [], !0));
function onChange(r, e) {
  const s = r.target.value;
  e(s);
}
var root_2 = /* @__PURE__ */ from_html('<textarea class="cart-note svelte-ji2lc2" placeholder="Leave a note about your order"></textarea>');
const $$css$2 = {
  hash: "svelte-ji2lc2",
  code: "textarea.cart-note.svelte-ji2lc2 {border:1px solid black;width:100%;height:100px;padding:10px 10px;font-size:14px;line-height:1.2;resize:none;}"
};
function CartNote(r, e) {
  push(e, !0), append_styles(r, $$css$2);
  const t = prop(e, "isCartEmpty", 7), s = /* @__PURE__ */ user_derived(() => t() === "false");
  localStorage.getItem("staging");
  const i = /* @__PURE__ */ user_derived(() => !0);
  function n(p, h) {
    let g;
    return (...m) => {
      clearTimeout(g), g = setTimeout(() => p.apply(this, m), h);
    };
  }
  const l = n((p) => {
    fetch("/cart/update.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note: p })
    }).then((h) => h.json()).then((h) => {
      console.log("Cart note updated:", h);
    }).catch((h) => {
      console.error("Error:", h);
    });
  }, 500);
  let c = /* @__PURE__ */ state("");
  const u = () => {
    const { cart: p } = window.CartJS || {};
    if (!p) return;
    const { note: h } = p;
    h && set(c, h, !0);
  };
  onMount(() => (u(), globalThis.$(document).on("cart.ready", u), () => {
    globalThis.$(document).off("cart.ready", u);
  }));
  var d = comment(), f = first_child(d);
  {
    var _ = (p) => {
      var h = comment(), g = first_child(h);
      {
        var m = (y) => {
          var w = root_2();
          remove_textarea_child(w), w.__input = [onChange, l], bind_value(w, () => get$2(c), (v) => set(c, v)), append(y, w);
        };
        if_block(g, (y) => {
          get$2(s) && y(m);
        });
      }
      append(p, h);
    };
    if_block(f, (p) => {
      get$2(i) && p(_);
    });
  }
  return append(r, d), pop({
    get isCartEmpty() {
      return t();
    },
    set isCartEmpty(p) {
      t(p), flushSync();
    }
  });
}
delegate(["input"]);
customElements.define("cart-note", create_custom_element(CartNote, { isCartEmpty: {} }, [], [], !1));
function Mousewheel(r) {
  let {
    swiper: e,
    extendParams: t,
    on: s,
    emit: i
  } = r;
  const n = getWindow();
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
    let C = 0, x = 0, I = 0, k = 0;
    return "detail" in v && (x = v.detail), "wheelDelta" in v && (x = -v.wheelDelta / 120), "wheelDeltaY" in v && (x = -v.wheelDeltaY / 120), "wheelDeltaX" in v && (C = -v.wheelDeltaX / 120), "axis" in v && v.axis === v.HORIZONTAL_AXIS && (C = x, x = 0), I = C * 10, k = x * 10, "deltaY" in v && (k = v.deltaY), "deltaX" in v && (I = v.deltaX), v.shiftKey && !I && (I = k, k = 0), (I || k) && v.deltaMode && (v.deltaMode === 1 ? (I *= 40, k *= 40) : (I *= 800, k *= 800)), I && !C && (C = I < 1 ? -1 : 1), k && !x && (x = k < 1 ? -1 : 1), {
      spinX: C,
      spinY: x,
      pixelX: I,
      pixelY: k
    };
  }
  function f() {
    e.enabled && (e.mouseEntered = !0);
  }
  function _() {
    e.enabled && (e.mouseEntered = !1);
  }
  function p(v) {
    return e.params.mousewheel.thresholdDelta && v.delta < e.params.mousewheel.thresholdDelta || e.params.mousewheel.thresholdTime && now() - l < e.params.mousewheel.thresholdTime ? !1 : v.delta >= 6 && now() - l < 60 ? !0 : (v.direction < 0 ? (!e.isEnd || e.params.loop) && !e.animating && (e.slideNext(), i("scroll", v.raw)) : (!e.isBeginning || e.params.loop) && !e.animating && (e.slidePrev(), i("scroll", v.raw)), l = new n.Date().getTime(), !1);
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
  function g(v) {
    let b = v, T = !0;
    if (!e.enabled || v.target.closest(`.${e.params.mousewheel.noMousewheelClass}`)) return;
    const E = e.params.mousewheel;
    e.params.cssMode && b.preventDefault();
    let C = e.el;
    e.params.mousewheel.eventsTarget !== "container" && (C = document.querySelector(e.params.mousewheel.eventsTarget));
    const x = C && C.contains(b.target);
    if (!e.mouseEntered && !x && !E.releaseOnEdges) return !0;
    b.originalEvent && (b = b.originalEvent);
    let I = 0;
    const k = e.rtlTranslate ? -1 : 1, A = d(b);
    if (E.forceToAxis)
      if (e.isHorizontal())
        if (Math.abs(A.pixelX) > Math.abs(A.pixelY)) I = -A.pixelX * k;
        else return !0;
      else if (Math.abs(A.pixelY) > Math.abs(A.pixelX)) I = -A.pixelY;
      else return !0;
    else
      I = Math.abs(A.pixelX) > Math.abs(A.pixelY) ? -A.pixelX * k : -A.pixelY;
    if (I === 0) return !0;
    E.invert && (I = -I);
    let S = e.getTranslate() + I * E.sensitivity;
    if (S >= e.minTranslate() && (S = e.minTranslate()), S <= e.maxTranslate() && (S = e.maxTranslate()), T = e.params.loop ? !0 : !(S === e.minTranslate() || S === e.maxTranslate()), T && e.params.nested && b.stopPropagation(), !e.params.freeMode || !e.params.freeMode.enabled) {
      const $ = {
        time: now(),
        delta: Math.abs(I),
        direction: Math.sign(I),
        raw: v
      };
      u.length >= 2 && u.shift();
      const P = u.length ? u[u.length - 1] : void 0;
      if (u.push($), P ? ($.direction !== P.direction || $.delta > P.delta || $.time > P.time + 150) && p($) : p($), h($))
        return !0;
    } else {
      const $ = {
        time: now(),
        delta: Math.abs(I),
        direction: Math.sign(I)
      }, P = c && $.time < c.time + 500 && $.delta <= c.delta && $.direction === c.direction;
      if (!P) {
        c = void 0;
        let R = e.getTranslate() + I * E.sensitivity;
        const O = e.isBeginning, D = e.isEnd;
        if (R >= e.minTranslate() && (R = e.minTranslate()), R <= e.maxTranslate() && (R = e.maxTranslate()), e.setTransition(0), e.setTranslate(R), e.updateProgress(), e.updateActiveIndex(), e.updateSlidesClasses(), (!O && e.isBeginning || !D && e.isEnd) && e.updateSlidesClasses(), e.params.loop && e.loopFix({
          direction: $.direction < 0 ? "next" : "prev",
          byMousewheel: !0
        }), e.params.freeMode.sticky) {
          clearTimeout(o), o = void 0, u.length >= 15 && u.shift();
          const M = u.length ? u[u.length - 1] : void 0, N = u[0];
          if (u.push($), M && ($.delta > M.delta || $.direction !== M.direction))
            u.splice(0);
          else if (u.length >= 15 && $.time - N.time < 500 && N.delta - $.delta >= 1 && $.delta <= 6) {
            const j = I > 0 ? 0.8 : 0.2;
            c = $, u.splice(0), o = nextTick(() => {
              e.destroyed || !e.params || e.slideToClosest(e.params.speed, !0, void 0, j);
            }, 0);
          }
          o || (o = nextTick(() => {
            if (e.destroyed || !e.params) return;
            const j = 0.5;
            c = $, u.splice(0), e.slideToClosest(e.params.speed, !0, void 0, j);
          }, 500));
        }
        if (P || i("scroll", b), e.params.autoplay && e.params.autoplay.disableOnInteraction && e.autoplay.stop(), E.releaseOnEdges && (R === e.minTranslate() || R === e.maxTranslate()))
          return !0;
      }
    }
    return b.preventDefault ? b.preventDefault() : b.returnValue = !1, !1;
  }
  function m(v) {
    let b = e.el;
    e.params.mousewheel.eventsTarget !== "container" && (b = document.querySelector(e.params.mousewheel.eventsTarget)), b[v]("mouseenter", f), b[v]("mouseleave", _), b[v]("wheel", g);
  }
  function y() {
    return e.params.cssMode ? (e.wrapperEl.removeEventListener("wheel", g), !0) : e.mousewheel.enabled ? !1 : (m("addEventListener"), e.mousewheel.enabled = !0, !0);
  }
  function w() {
    return e.params.cssMode ? (e.wrapperEl.addEventListener(event, g), !0) : e.mousewheel.enabled ? (m("removeEventListener"), e.mousewheel.enabled = !1, !0) : !1;
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
  return r.params.createElements && Object.keys(s).forEach((i) => {
    if (!t[i] && t.auto === !0) {
      let n = elementChildren(r.el, `.${s[i]}`)[0];
      n || (n = createElement("div", s[i]), n.className = s[i], r.el.append(n)), t[i] = n, e[i] = n;
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
    emit: i
  } = r;
  const n = getDocument();
  let o = !1, l = null, c = null, u, d, f, _;
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
  function p() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const {
      scrollbar: S,
      rtlTranslate: $
    } = e, {
      dragEl: P,
      el: R
    } = S, O = e.params.scrollbar, D = e.params.loop ? e.progressLoop : e.progress;
    let M = d, N = (f - d) * D;
    $ ? (N = -N, N > 0 ? (M = d - N, N = 0) : -N + d > f && (M = f + N)) : N < 0 ? (M = d + N, N = 0) : N + d > f && (M = f - N), e.isHorizontal() ? (P.style.transform = `translate3d(${N}px, 0, 0)`, P.style.width = `${M}px`) : (P.style.transform = `translate3d(0px, ${N}px, 0)`, P.style.height = `${M}px`), O.hide && (clearTimeout(l), R.style.opacity = 1, l = setTimeout(() => {
      R.style.opacity = 0, R.style.transitionDuration = "400ms";
    }, 1e3));
  }
  function h(S) {
    !e.params.scrollbar.el || !e.scrollbar.el || (e.scrollbar.dragEl.style.transitionDuration = `${S}ms`);
  }
  function g() {
    if (!e.params.scrollbar.el || !e.scrollbar.el) return;
    const {
      scrollbar: S
    } = e, {
      dragEl: $,
      el: P
    } = S;
    $.style.width = "", $.style.height = "", f = e.isHorizontal() ? P.offsetWidth : P.offsetHeight, _ = e.size / (e.virtualSize + e.params.slidesOffsetBefore - (e.params.centeredSlides ? e.snapGrid[0] : 0)), e.params.scrollbar.dragSize === "auto" ? d = f * _ : d = parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? $.style.width = `${d}px` : $.style.height = `${d}px`, _ >= 1 ? P.style.display = "none" : P.style.display = "", e.params.scrollbar.hide && (P.style.opacity = 0), e.params.watchOverflow && e.enabled && S.el.classList[e.isLocked ? "add" : "remove"](e.params.scrollbar.lockClass);
  }
  function m(S) {
    return e.isHorizontal() ? S.clientX : S.clientY;
  }
  function y(S) {
    const {
      scrollbar: $,
      rtlTranslate: P
    } = e, {
      el: R
    } = $;
    let O;
    O = (m(S) - elementOffset(R)[e.isHorizontal() ? "left" : "top"] - (u !== null ? u : d / 2)) / (f - d), O = Math.max(Math.min(O, 1), 0), P && (O = 1 - O);
    const D = e.minTranslate() + (e.maxTranslate() - e.minTranslate()) * O;
    e.updateProgress(D), e.setTranslate(D), e.updateActiveIndex(), e.updateSlidesClasses();
  }
  function w(S) {
    const $ = e.params.scrollbar, {
      scrollbar: P,
      wrapperEl: R
    } = e, {
      el: O,
      dragEl: D
    } = P;
    o = !0, u = S.target === D ? m(S) - S.target.getBoundingClientRect()[e.isHorizontal() ? "left" : "top"] : null, S.preventDefault(), S.stopPropagation(), R.style.transitionDuration = "100ms", D.style.transitionDuration = "100ms", y(S), clearTimeout(c), O.style.transitionDuration = "0ms", $.hide && (O.style.opacity = 1), e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "none"), i("scrollbarDragStart", S);
  }
  function v(S) {
    const {
      scrollbar: $,
      wrapperEl: P
    } = e, {
      el: R,
      dragEl: O
    } = $;
    o && (S.preventDefault && S.cancelable ? S.preventDefault() : S.returnValue = !1, y(S), P.style.transitionDuration = "0ms", R.style.transitionDuration = "0ms", O.style.transitionDuration = "0ms", i("scrollbarDragMove", S));
  }
  function b(S) {
    const $ = e.params.scrollbar, {
      scrollbar: P,
      wrapperEl: R
    } = e, {
      el: O
    } = P;
    o && (o = !1, e.params.cssMode && (e.wrapperEl.style["scroll-snap-type"] = "", R.style.transitionDuration = ""), $.hide && (clearTimeout(c), c = nextTick(() => {
      O.style.opacity = 0, O.style.transitionDuration = "400ms";
    }, 1e3)), i("scrollbarDragEnd", S), $.snapOnRelease && e.slideToClosest());
  }
  function T(S) {
    const {
      scrollbar: $,
      params: P
    } = e, R = $.el;
    if (!R) return;
    const O = R, D = P.passiveListeners ? {
      passive: !1,
      capture: !1
    } : !1, M = P.passiveListeners ? {
      passive: !0,
      capture: !1
    } : !1;
    if (!O) return;
    const N = S === "on" ? "addEventListener" : "removeEventListener";
    O[N]("pointerdown", w, D), n[N]("pointermove", v, D), n[N]("pointerup", b, M);
  }
  function E() {
    !e.params.scrollbar.el || !e.scrollbar.el || T("on");
  }
  function C() {
    !e.params.scrollbar.el || !e.scrollbar.el || T("off");
  }
  function x() {
    const {
      scrollbar: S,
      el: $
    } = e;
    e.params.scrollbar = createElementIfNotDefined(e, e.originalParams.scrollbar, e.params.scrollbar, {
      el: "swiper-scrollbar"
    });
    const P = e.params.scrollbar;
    if (!P.el) return;
    let R;
    if (typeof P.el == "string" && e.isElement && (R = e.el.querySelector(P.el)), !R && typeof P.el == "string") {
      if (R = n.querySelectorAll(P.el), !R.length) return;
    } else R || (R = P.el);
    e.params.uniqueNavElements && typeof P.el == "string" && R.length > 1 && $.querySelectorAll(P.el).length === 1 && (R = $.querySelector(P.el)), R.length > 0 && (R = R[0]), R.classList.add(e.isHorizontal() ? P.horizontalClass : P.verticalClass);
    let O;
    R && (O = R.querySelector(classesToSelector(e.params.scrollbar.dragClass)), O || (O = createElement("div", e.params.scrollbar.dragClass), R.append(O))), Object.assign(S, {
      el: R,
      dragEl: O
    }), P.draggable && E(), R && R.classList[e.enabled ? "remove" : "add"](...classesToTokens(e.params.scrollbar.lockClass));
  }
  function I() {
    const S = e.params.scrollbar, $ = e.scrollbar.el;
    $ && $.classList.remove(...classesToTokens(e.isHorizontal() ? S.horizontalClass : S.verticalClass)), C();
  }
  s("changeDirection", () => {
    if (!e.scrollbar || !e.scrollbar.el) return;
    const S = e.params.scrollbar;
    let {
      el: $
    } = e.scrollbar;
    $ = makeElementsArray($), $.forEach((P) => {
      P.classList.remove(S.horizontalClass, S.verticalClass), P.classList.add(e.isHorizontal() ? S.horizontalClass : S.verticalClass);
    });
  }), s("init", () => {
    e.params.scrollbar.enabled === !1 ? A() : (x(), g(), p());
  }), s("update resize observerUpdate lock unlock changeDirection", () => {
    g();
  }), s("setTranslate", () => {
    p();
  }), s("setTransition", (S, $) => {
    h($);
  }), s("enable disable", () => {
    const {
      el: S
    } = e.scrollbar;
    S && S.classList[e.enabled ? "remove" : "add"](...classesToTokens(e.params.scrollbar.lockClass));
  }), s("destroy", () => {
    I();
  });
  const k = () => {
    e.el.classList.remove(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.remove(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), x(), g(), p();
  }, A = () => {
    e.el.classList.add(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), e.scrollbar.el && e.scrollbar.el.classList.add(...classesToTokens(e.params.scrollbar.scrollbarDisabledClass)), I();
  };
  Object.assign(e.scrollbar, {
    enable: k,
    disable: A,
    updateSize: g,
    setTranslate: p,
    init: x,
    destroy: I
  });
}
var root_1$1 = /* @__PURE__ */ from_html('<div class="swiper-slide svelte-hajgcm"><a class="color-selector--link svelte-hajgcm"><img alt="img"/></a></div>'), root$1 = /* @__PURE__ */ from_html('<section><div><div class="swiper-wrapper"></div> <div class="swiper-scrollbar"></div></div></section>');
const $$css$1 = {
  hash: "svelte-hajgcm",
  code: `.swiper.svelte-hajgcm {width:calc(100% - 25px);margin:0;overflow:visible;line-height:0;opacity:0;height:0;transition:opacity 0.3s ease;}.swiper--inited.svelte-hajgcm {height:auto;opacity:1;}.color-selector--link.svelte-hajgcm {display:inline-block;}.swiper-slide.svelte-hajgcm {width:64px;}
@media screen and (max-width: 767px) {.swiper-slide.svelte-hajgcm {width:44px;}
}.color-selector--image.svelte-hajgcm {min-width:64px;height:64px;border-radius:5px;}
@media screen and (max-width: 767px) {.color-selector--image.svelte-hajgcm {min-width:44px;height:44px;}
}.color-selector--image.active.svelte-hajgcm {outline:2px solid black;outline-offset:-2px;}:root {--swiper-scrollbar-bg-color: rgba(0, 0, 0, 0.2);--swiper-scrollbar-sides-offset: 0;}.swiper-scrollbar {transform:scaleX(0.95);}.swiper-scrollbar {transition:opacity 0.3s ease;}.swiper-horizontal > .swiper-scrollbar, .swiper-scrollbar.swiper-scrollbar-horizontal {width:100% !important;}.swiper-scrollbar-drag {background:rgba(0, 0, 0, 0.3);border-radius:10px;cursor:grab;}.swiper-scrollbar-drag:active {cursor:grabbing;}`
};
function ColorSelector(r, e) {
  push(e, !0), append_styles(r, $$css$1);
  let t = prop(e, "activeId", 7), s = prop(e, "list", 7), i = /* @__PURE__ */ user_derived(() => {
    try {
      return s() ? JSON.parse(s()) : [];
    } catch (h) {
      return console.error("Failed parsing JSON.", h), [];
    }
  }), n = /* @__PURE__ */ state(void 0), o = /* @__PURE__ */ state(void 0), l = /* @__PURE__ */ state(!1), c = /* @__PURE__ */ user_derived(() => {
    if (!get$2(i) || !t()) return 0;
    const h = get$2(i).findIndex((g) => +g.id == +t());
    return h !== -1 ? h : 0;
  });
  const u = () => {
    get$2(n) && set(
      o,
      new Swiper(get$2(n), {
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
          init: (h) => {
            setTimeout(
              () => {
                h.virtualSize > h.size && get$2(c) > 0 && h.slideTo(get$2(
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
    get$2(n) && u();
  });
  var d = root$1(), f = child(d);
  let _;
  var p = child(f);
  return each(p, 21, () => get$2(i), index, (h, g) => {
    var m = root_1$1(), y = child(m), w = child(y);
    let v;
    reset(y), reset(m), template_effect(
      (b) => {
        var T;
        set_attribute(y, "href", get$2(g).url), v = set_class(w, 1, "color-selector--image svelte-hajgcm", null, v, b), set_attribute(w, "src", (T = get$2(g)) == null ? void 0 : T.images[0]);
      },
      [() => ({ active: +get$2(g).id == +t() })]
    ), append(h, m);
  }), reset(p), next(2), reset(f), bind_this(f, (h) => set(n, h), () => get$2(n)), reset(d), action(d, (h, g) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(h, g), () => get$2(l)), template_effect((h) => _ = set_class(f, 1, "swiper color-selector--swiper-wrapper svelte-hajgcm", null, _, h), [() => ({ "swiper--inited": get$2(l) })]), append(r, d), pop({
    get activeId() {
      return t();
    },
    set activeId(h) {
      t(h), flushSync();
    },
    get list() {
      return s();
    },
    set list(h) {
      s(h), flushSync();
    }
  });
}
customElements.define("color-selector", create_custom_element(ColorSelector, { activeId: {}, list: {} }, [], [], !1));
var root_1 = /* @__PURE__ */ from_html("<a> </a>"), root = /* @__PURE__ */ from_html('<div class="size-selector svelte-1301zof"></div>');
const $$css = {
  hash: "svelte-1301zof",
  code: `.size-selector.svelte-1301zof {line-height:0;display:flex;gap:8px;}.pill.svelte-1301zof {font-family:"Monument", sans-serif;font-size:16px;letter-spacing:-0.15px;text-transform:uppercase;line-height:100%;display:block;color:black;text-decoration:none;border:1px solid black;border-radius:20px;padding:4px 24px;cursor:pointer;transition:background 0.2s ease;}.pill.svelte-1301zof:hover:not(.active) {background:rgba(0, 0, 0, 0.1);}.pill.active.svelte-1301zof {background:#000;color:#fff;}
@media screen and (max-width: 767px) {.pill.svelte-1301zof {font-size:14px;}
}`
};
function SizeSelector(r, e) {
  push(e, !0), append_styles(r, $$css);
  let t = prop(e, "activeId", 7), s = prop(e, "list", 7), i = /* @__PURE__ */ user_derived(() => {
    try {
      return JSON.parse(s());
    } catch (o) {
      return console.error(o), [];
    }
  });
  var n = root();
  return each(n, 21, () => get$2(i), index, (o, l) => {
    var c = root_1();
    let u;
    var d = child(c, !0);
    reset(c), template_effect(
      (f) => {
        set_attribute(c, "href", get$2(l).url), u = set_class(c, 1, "pill svelte-1301zof", null, u, f), set_text(d, get$2(l).label);
      },
      [() => ({ active: +get$2(l).id == +t() })]
    ), append(o, c);
  }), reset(n), action(n, (o) => removeNonComponentChildren == null ? void 0 : removeNonComponentChildren(o)), append(r, n), pop({
    get activeId() {
      return t();
    },
    set activeId(o) {
      t(o), flushSync();
    },
    get list() {
      return s();
    },
    set list(o) {
      s(o), flushSync();
    }
  });
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
  CartNote,
  CartRecommendationCard,
  ColorSelector,
  CurrencySelector,
  DevMarketDetails,
  KnittersAccordion,
  KnittersAccordionItem,
  PreOrderStrip,
  ProductDiscountPercentage,
  ProductForm,
  ProductPrice,
  SizeSelector,
  getAutomaticDiscount
};
