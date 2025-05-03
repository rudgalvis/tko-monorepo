var J = Object.defineProperty;
var H = (r) => {
  throw TypeError(r);
};
var X = (r, e, t) => e in r ? J(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var M = (r, e, t) => X(r, typeof e != "symbol" ? e + "" : e, t), G = (r, e, t) => e.has(r) || H("Cannot " + t);
var N = (r, e, t) => (G(r, e, "read from private field"), t ? t.call(r) : e.get(r)), q = (r, e, t) => e.has(r) ? H("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(r) : e.set(r, t), z = (r, e, t, n) => (G(r, e, "write to private field"), n ? n.call(r, t) : e.set(r, t), t);
const BASE_URL = "https://rrxtko.tko.rudgalvis.com/api", API_ROUTES = {
  GET_AUTOMATIC_DISCOUNT: (r, e) => `automatic-discount/${r}/${e}`
}, getAutomaticDiscount = async (r, e) => {
  const t = await fetch(
    `${BASE_URL}/${API_ROUTES.GET_AUTOMATIC_DISCOUNT(r, e)}`,
    { method: "GET" }
  );
  try {
    return await t.json();
  } catch (n) {
    console.error(n);
  }
}, PUBLIC_VERSION = "5";
typeof window < "u" && (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
const EACH_ITEM_REACTIVE = 1, EACH_INDEX_REACTIVE = 2, EACH_ITEM_IMMUTABLE = 16, PROPS_IS_IMMUTABLE = 1, PROPS_IS_RUNES = 2, PROPS_IS_UPDATED = 4, PROPS_IS_BINDABLE = 8, PROPS_IS_LAZY_INITIAL = 16, TRANSITION_GLOBAL = 4, TEMPLATE_FRAGMENT = 1, TEMPLATE_USE_IMPORT_NODE = 2, HYDRATION_START = "[", HYDRATION_START_ELSE = "[!", HYDRATION_END = "]", HYDRATION_ERROR = {}, UNINITIALIZED = Symbol(), DEV = !1;
function hydration_mismatch(r) {
  console.warn("hydration_mismatch");
}
var is_array = Array.isArray, array_from = Array.from, object_keys = Object.keys, define_property = Object.defineProperty, get_descriptor = Object.getOwnPropertyDescriptor, get_descriptors = Object.getOwnPropertyDescriptors, object_prototype = Object.prototype, array_prototype = Array.prototype, get_prototype_of = Object.getPrototypeOf;
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
const DERIVED = 2, EFFECT = 4, RENDER_EFFECT = 8, BLOCK_EFFECT = 16, BRANCH_EFFECT = 32, ROOT_EFFECT = 64, UNOWNED = 128, DISCONNECTED = 256, CLEAN = 512, DIRTY = 1024, MAYBE_DIRTY = 2048, INERT = 4096, DESTROYED = 8192, EFFECT_RAN = 16384, EFFECT_TRANSPARENT = 32768, LEGACY_DERIVED_PROP = 65536, HEAD_EFFECT = 1 << 18, EFFECT_HAS_DERIVED = 1 << 19, STATE_SYMBOL = Symbol("$state"), LOADING_ATTR_SYMBOL = Symbol("");
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
  throw new Error("effect_in_teardown");
}
function effect_in_unowned_derived() {
  throw new Error("effect_in_unowned_derived");
}
function effect_orphan(r) {
  throw new Error("effect_orphan");
}
function effect_update_depth_exceeded() {
  throw new Error("effect_update_depth_exceeded");
}
function hydration_failed() {
  throw new Error("hydration_failed");
}
function props_invalid_value(r) {
  throw new Error("props_invalid_value");
}
function state_descriptors_fixed() {
  throw new Error("state_descriptors_fixed");
}
function state_prototype_fixed() {
  throw new Error("state_prototype_fixed");
}
function state_unsafe_local_read() {
  throw new Error("state_unsafe_local_read");
}
function state_unsafe_mutation() {
  throw new Error("state_unsafe_mutation");
}
function source(r) {
  return {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: r,
    reactions: null,
    equals,
    version: 0
  };
}
// @__NO_SIDE_EFFECTS__
function mutable_source(r, e = !1) {
  var n;
  const t = source(r);
  return e || (t.equals = safe_equals), component_context !== null && component_context.l !== null && ((n = component_context.l).s ?? (n.s = [])).push(t), t;
}
function mutable_state(r, e = !1) {
  return /* @__PURE__ */ push_derived_source(/* @__PURE__ */ mutable_source(r, e));
}
// @__NO_SIDE_EFFECTS__
function push_derived_source(r) {
  return active_reaction !== null && active_reaction.f & DERIVED && (derived_sources === null ? set_derived_sources([r]) : derived_sources.push(r)), r;
}
function mutate(r, e) {
  return set(
    r,
    untrack(() => get$1(r))
  ), e;
}
function set(r, e) {
  return active_reaction !== null && is_runes() && active_reaction.f & (DERIVED | BLOCK_EFFECT) && // If the source was created locally within the current derived, then
  // we allow the mutation.
  (derived_sources === null || !derived_sources.includes(r)) && state_unsafe_mutation(), internal_set(r, e);
}
function internal_set(r, e) {
  return r.equals(e) || (r.v = e, r.version = increment_version(), mark_reactions(r, DIRTY), is_runes() && active_effect !== null && active_effect.f & CLEAN && !(active_effect.f & BRANCH_EFFECT) && (new_deps !== null && new_deps.includes(r) ? (set_signal_status(active_effect, DIRTY), schedule_effect(active_effect)) : untracked_writes === null ? set_untracked_writes([r]) : untracked_writes.push(r))), e;
}
function mark_reactions(r, e) {
  var t = r.reactions;
  if (t !== null)
    for (var n = is_runes(), s = t.length, i = 0; i < s; i++) {
      var o = t[i], l = o.f;
      l & DIRTY || !n && o === active_effect || (set_signal_status(o, e), l & (CLEAN | UNOWNED) && (l & DERIVED ? mark_reactions(
        /** @type {Derived} */
        o,
        MAYBE_DIRTY
      ) : schedule_effect(
        /** @type {Effect} */
        o
      )));
    }
}
// @__NO_SIDE_EFFECTS__
function derived(r) {
  var e = DERIVED | DIRTY;
  active_effect === null ? e |= UNOWNED : active_effect.f |= EFFECT_HAS_DERIVED;
  const t = {
    children: null,
    ctx: component_context,
    deps: null,
    equals,
    f: e,
    fn: r,
    reactions: null,
    v: (
      /** @type {V} */
      null
    ),
    version: 0,
    parent: active_effect
  };
  if (active_reaction !== null && active_reaction.f & DERIVED) {
    var n = (
      /** @type {Derived} */
      active_reaction
    );
    (n.children ?? (n.children = [])).push(t);
  }
  return t;
}
// @__NO_SIDE_EFFECTS__
function derived_safe_equal(r) {
  const e = /* @__PURE__ */ derived(r);
  return e.equals = safe_equals, e;
}
function destroy_derived_children(r) {
  var e = r.children;
  if (e !== null) {
    r.children = null;
    for (var t = 0; t < e.length; t += 1) {
      var n = e[t];
      n.f & DERIVED ? destroy_derived(
        /** @type {Derived} */
        n
      ) : destroy_effect(
        /** @type {Effect} */
        n
      );
    }
  }
}
function execute_derived(r) {
  var e, t = active_effect;
  set_active_effect(r.parent);
  try {
    destroy_derived_children(r), e = update_reaction(r);
  } finally {
    set_active_effect(t);
  }
  return e;
}
function update_derived(r) {
  var e = execute_derived(r), t = (skip_reaction || r.f & UNOWNED) && r.deps !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(r, t), r.equals(e) || (r.v = e, r.version = increment_version());
}
function destroy_derived(r) {
  destroy_derived_children(r), remove_reactions(r, 0), set_signal_status(r, DESTROYED), r.v = r.children = r.deps = r.ctx = r.reactions = null;
}
function validate_effect(r) {
  active_effect === null && active_reaction === null && effect_orphan(), active_reaction !== null && active_reaction.f & UNOWNED && effect_in_unowned_derived(), is_destroying_effect && effect_in_teardown();
}
function push_effect(r, e) {
  var t = e.last;
  t === null ? e.last = e.first = r : (t.next = r, r.prev = t, e.last = r);
}
function create_effect(r, e, t, n = !0) {
  var s = (r & ROOT_EFFECT) !== 0, i = active_effect, o = {
    ctx: component_context,
    deps: null,
    deriveds: null,
    nodes_start: null,
    nodes_end: null,
    f: r | DIRTY,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: s ? null : i,
    prev: null,
    teardown: null,
    transitions: null,
    version: 0
  };
  if (t) {
    var l = is_flushing_effect;
    try {
      set_is_flushing_effect(!0), update_effect(o), o.f |= EFFECT_RAN;
    } catch (u) {
      throw destroy_effect(o), u;
    } finally {
      set_is_flushing_effect(l);
    }
  } else e !== null && schedule_effect(o);
  var c = t && o.deps === null && o.first === null && o.nodes_start === null && o.teardown === null && (o.f & EFFECT_HAS_DERIVED) === 0;
  if (!c && !s && n && (i !== null && push_effect(o, i), active_reaction !== null && active_reaction.f & DERIVED)) {
    var d = (
      /** @type {Derived} */
      active_reaction
    );
    (d.children ?? (d.children = [])).push(o);
  }
  return o;
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
    var n = effect(r);
    return n;
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
function effect(r) {
  return create_effect(EFFECT, r, !1);
}
function legacy_pre_effect(r, e) {
  var t = (
    /** @type {ComponentContextLegacy} */
    component_context
  ), n = { effect: null, ran: !1 };
  t.l.r1.push(n), n.effect = render_effect(() => {
    r(), !n.ran && (n.ran = !0, set(t.l.r2, !0), untrack(e));
  });
}
function legacy_pre_effect_reset() {
  var r = (
    /** @type {ComponentContextLegacy} */
    component_context
  );
  render_effect(() => {
    if (get$1(r.l.r2)) {
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
function template_effect(r) {
  return block(r);
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
    const t = is_destroying_effect, n = active_reaction;
    set_is_destroying_effect(!0), set_active_reaction(null);
    try {
      e.call(null);
    } finally {
      set_is_destroying_effect(t), set_active_reaction(n);
    }
  }
}
function destroy_effect_deriveds(r) {
  var e = r.deriveds;
  if (e !== null) {
    r.deriveds = null;
    for (var t = 0; t < e.length; t += 1)
      destroy_derived(e[t]);
  }
}
function destroy_effect_children(r, e = !1) {
  var t = r.first;
  for (r.first = r.last = null; t !== null; ) {
    var n = t.next;
    destroy_effect(t, e), t = n;
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
    for (var n = r.nodes_start, s = r.nodes_end; n !== null; ) {
      var i = n === s ? null : (
        /** @type {TemplateNode} */
        /* @__PURE__ */ get_next_sibling(n)
      );
      n.remove(), n = i;
    }
    t = !0;
  }
  destroy_effect_deriveds(r), destroy_effect_children(r, e && !t), remove_reactions(r, 0), set_signal_status(r, DESTROYED);
  var o = r.transitions;
  if (o !== null)
    for (const c of o)
      c.stop();
  execute_effect_teardown(r);
  var l = r.parent;
  l !== null && l.first !== null && unlink_effect(r), r.next = r.prev = r.teardown = r.ctx = r.deps = r.parent = r.fn = r.nodes_start = r.nodes_end = null;
}
function unlink_effect(r) {
  var e = r.parent, t = r.prev, n = r.next;
  t !== null && (t.next = n), n !== null && (n.prev = t), e !== null && (e.first === r && (e.first = n), e.last === r && (e.last = t));
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
    var n = () => --t || e();
    for (var s of r)
      s.out(n);
  } else
    e();
}
function pause_children(r, e, t) {
  if (!(r.f & INERT)) {
    if (r.f ^= INERT, r.transitions !== null)
      for (const o of r.transitions)
        (o.is_global || t) && e.push(o);
    for (var n = r.first; n !== null; ) {
      var s = n.next, i = (n.f & EFFECT_TRANSPARENT) !== 0 || (n.f & BRANCH_EFFECT) !== 0;
      pause_children(n, e, i ? t : !1), n = s;
    }
  }
}
function resume_effect(r) {
  resume_children(r, !0);
}
function resume_children(r, e) {
  if (r.f & INERT) {
    r.f ^= INERT, check_dirtiness(r) && update_effect(r);
    for (var t = r.first; t !== null; ) {
      var n = t.next, s = (t.f & EFFECT_TRANSPARENT) !== 0 || (t.f & BRANCH_EFFECT) !== 0;
      resume_children(t, s ? e : !1), t = n;
    }
    if (r.transitions !== null)
      for (const i of r.transitions)
        (i.is_global || e) && i.in();
  }
}
const request_idle_callback = typeof requestIdleCallback > "u" ? (r) => setTimeout(r, 1) : requestIdleCallback;
let is_micro_task_queued$1 = !1, is_idle_task_queued = !1, current_queued_micro_tasks = [], current_queued_idle_tasks = [];
function process_micro_tasks() {
  is_micro_task_queued$1 = !1;
  const r = current_queued_micro_tasks.slice();
  current_queued_micro_tasks = [], run_all(r);
}
function process_idle_tasks() {
  is_idle_task_queued = !1;
  const r = current_queued_idle_tasks.slice();
  current_queued_idle_tasks = [], run_all(r);
}
function queue_micro_task(r) {
  is_micro_task_queued$1 || (is_micro_task_queued$1 = !0, queueMicrotask(process_micro_tasks)), current_queued_micro_tasks.push(r);
}
function queue_idle_task(r) {
  is_idle_task_queued || (is_idle_task_queued = !0, request_idle_callback(process_idle_tasks)), current_queued_idle_tasks.push(r);
}
function flush_tasks() {
  is_micro_task_queued$1 && process_micro_tasks(), is_idle_task_queued && process_idle_tasks();
}
function lifecycle_outside_component(r) {
  throw new Error("lifecycle_outside_component");
}
const FLUSH_MICROTASK = 0, FLUSH_SYNC = 1;
let scheduler_mode = FLUSH_MICROTASK, is_micro_task_queued = !1, is_flushing_effect = !1, is_destroying_effect = !1;
function set_is_flushing_effect(r) {
  is_flushing_effect = r;
}
function set_is_destroying_effect(r) {
  is_destroying_effect = r;
}
let queued_root_effects = [], flush_count = 0, dev_effect_stack = [], active_reaction = null;
function set_active_reaction(r) {
  active_reaction = r;
}
let active_effect = null;
function set_active_effect(r) {
  active_effect = r;
}
let derived_sources = null;
function set_derived_sources(r) {
  derived_sources = r;
}
let new_deps = null, skipped_deps = 0, untracked_writes = null;
function set_untracked_writes(r) {
  untracked_writes = r;
}
let current_version = 0, skip_reaction = !1, component_context = null;
function increment_version() {
  return ++current_version;
}
function is_runes() {
  return component_context !== null && component_context.l === null;
}
function check_dirtiness(r) {
  var o, l;
  var e = r.f;
  if (e & DIRTY)
    return !0;
  if (e & MAYBE_DIRTY) {
    var t = r.deps, n = (e & UNOWNED) !== 0;
    if (t !== null) {
      var s;
      if (e & DISCONNECTED) {
        for (s = 0; s < t.length; s++)
          ((o = t[s]).reactions ?? (o.reactions = [])).push(r);
        r.f ^= DISCONNECTED;
      }
      for (s = 0; s < t.length; s++) {
        var i = t[s];
        if (check_dirtiness(
          /** @type {Derived} */
          i
        ) && update_derived(
          /** @type {Derived} */
          i
        ), n && active_effect !== null && !skip_reaction && !((l = i == null ? void 0 : i.reactions) != null && l.includes(r)) && (i.reactions ?? (i.reactions = [])).push(r), i.version > r.version)
          return !0;
      }
    }
    n || set_signal_status(r, CLEAN);
  }
  return !1;
}
function handle_error(r, e, t) {
  throw r;
}
function update_reaction(r) {
  var h;
  var e = new_deps, t = skipped_deps, n = untracked_writes, s = active_reaction, i = skip_reaction, o = derived_sources, l = component_context, c = r.f;
  new_deps = /** @type {null | Value[]} */
  null, skipped_deps = 0, untracked_writes = null, active_reaction = c & (BRANCH_EFFECT | ROOT_EFFECT) ? null : r, skip_reaction = !is_flushing_effect && (c & UNOWNED) !== 0, derived_sources = null, component_context = r.ctx;
  try {
    var d = (
      /** @type {Function} */
      (0, r.fn)()
    ), u = r.deps;
    if (new_deps !== null) {
      var f;
      if (remove_reactions(r, skipped_deps), u !== null && skipped_deps > 0)
        for (u.length = skipped_deps + new_deps.length, f = 0; f < new_deps.length; f++)
          u[skipped_deps + f] = new_deps[f];
      else
        r.deps = u = new_deps;
      if (!skip_reaction)
        for (f = skipped_deps; f < u.length; f++)
          ((h = u[f]).reactions ?? (h.reactions = [])).push(r);
    } else u !== null && skipped_deps < u.length && (remove_reactions(r, skipped_deps), u.length = skipped_deps);
    return d;
  } finally {
    new_deps = e, skipped_deps = t, untracked_writes = n, active_reaction = s, skip_reaction = i, derived_sources = o, component_context = l;
  }
}
function remove_reaction(r, e) {
  let t = e.reactions;
  if (t !== null) {
    var n = t.indexOf(r);
    if (n !== -1) {
      var s = t.length - 1;
      s === 0 ? t = e.reactions = null : (t[n] = t[s], t.pop());
    }
  }
  t === null && e.f & DERIVED && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (new_deps === null || !new_deps.includes(e)) && (set_signal_status(e, MAYBE_DIRTY), e.f & (UNOWNED | DISCONNECTED) || (e.f ^= DISCONNECTED), remove_reactions(
    /** @type {Derived} **/
    e,
    0
  ));
}
function remove_reactions(r, e) {
  var t = r.deps;
  if (t !== null)
    for (var n = e; n < t.length; n++)
      remove_reaction(r, t[n]);
}
function update_effect(r) {
  var e = r.f;
  if (!(e & DESTROYED)) {
    set_signal_status(r, CLEAN);
    var t = active_effect;
    active_effect = r;
    try {
      destroy_effect_deriveds(r), e & BLOCK_EFFECT ? destroy_block_effect_children(r) : destroy_effect_children(r), execute_effect_teardown(r);
      var n = update_reaction(r);
      r.teardown = typeof n == "function" ? n : null, r.version = current_version;
    } catch (s) {
      handle_error(
        /** @type {Error} */
        s
      );
    } finally {
      active_effect = t;
    }
  }
}
function infinite_loop_guard() {
  flush_count > 1e3 && (flush_count = 0, effect_update_depth_exceeded()), flush_count++;
}
function flush_queued_root_effects(r) {
  var e = r.length;
  if (e !== 0) {
    infinite_loop_guard();
    var t = is_flushing_effect;
    is_flushing_effect = !0;
    try {
      for (var n = 0; n < e; n++) {
        var s = r[n];
        s.f & CLEAN || (s.f ^= CLEAN);
        var i = [];
        process_effects(s, i), flush_queued_effects(i);
      }
    } finally {
      is_flushing_effect = t;
    }
  }
}
function flush_queued_effects(r) {
  var e = r.length;
  if (e !== 0)
    for (var t = 0; t < e; t++) {
      var n = r[t];
      !(n.f & (DESTROYED | INERT)) && check_dirtiness(n) && (update_effect(n), n.deps === null && n.first === null && n.nodes_start === null && (n.teardown === null ? unlink_effect(n) : n.fn = null));
    }
}
function process_deferred() {
  if (is_micro_task_queued = !1, flush_count > 1001)
    return;
  const r = queued_root_effects;
  queued_root_effects = [], flush_queued_root_effects(r), is_micro_task_queued || (flush_count = 0);
}
function schedule_effect(r) {
  scheduler_mode === FLUSH_MICROTASK && (is_micro_task_queued || (is_micro_task_queued = !0, queueMicrotask(process_deferred)));
  for (var e = r; e.parent !== null; ) {
    e = e.parent;
    var t = e.f;
    if (t & (ROOT_EFFECT | BRANCH_EFFECT)) {
      if (!(t & CLEAN)) return;
      e.f ^= CLEAN;
    }
  }
  queued_root_effects.push(e);
}
function process_effects(r, e) {
  var t = r.first, n = [];
  e: for (; t !== null; ) {
    var s = t.f, i = (s & BRANCH_EFFECT) !== 0, o = i && (s & CLEAN) !== 0;
    if (!o && !(s & INERT))
      if (s & RENDER_EFFECT) {
        i ? t.f ^= CLEAN : check_dirtiness(t) && update_effect(t);
        var l = t.first;
        if (l !== null) {
          t = l;
          continue;
        }
      } else s & EFFECT && n.push(t);
    var c = t.next;
    if (c === null) {
      let f = t.parent;
      for (; f !== null; ) {
        if (r === f)
          break e;
        var d = f.next;
        if (d !== null) {
          t = d;
          continue e;
        }
        f = f.parent;
      }
    }
    t = c;
  }
  for (var u = 0; u < n.length; u++)
    l = n[u], e.push(l), process_effects(l, e);
}
function flush_sync(r) {
  var e = scheduler_mode, t = queued_root_effects;
  try {
    infinite_loop_guard();
    const s = [];
    scheduler_mode = FLUSH_SYNC, queued_root_effects = s, is_micro_task_queued = !1, flush_queued_root_effects(t);
    var n = r == null ? void 0 : r();
    return flush_tasks(), (queued_root_effects.length > 0 || s.length > 0) && flush_sync(), flush_count = 0, n;
  } finally {
    scheduler_mode = e, queued_root_effects = t;
  }
}
function get$1(r) {
  var l;
  var e = r.f, t = (e & DERIVED) !== 0;
  if (t && e & DESTROYED) {
    var n = execute_derived(
      /** @type {Derived} */
      r
    );
    return destroy_derived(
      /** @type {Derived} */
      r
    ), n;
  }
  if (active_reaction !== null) {
    derived_sources !== null && derived_sources.includes(r) && state_unsafe_local_read();
    var s = active_reaction.deps;
    new_deps === null && s !== null && s[skipped_deps] === r ? skipped_deps++ : new_deps === null ? new_deps = [r] : new_deps.push(r), untracked_writes !== null && active_effect !== null && active_effect.f & CLEAN && !(active_effect.f & BRANCH_EFFECT) && untracked_writes.includes(r) && (set_signal_status(active_effect, DIRTY), schedule_effect(active_effect));
  } else if (t && /** @type {Derived} */
  r.deps === null) {
    var i = (
      /** @type {Derived} */
      r
    ), o = i.parent;
    o !== null && !((l = o.deriveds) != null && l.includes(i)) && (o.deriveds ?? (o.deriveds = [])).push(i);
  }
  return t && (i = /** @type {Derived} */
  r, check_dirtiness(i) && update_derived(i)), r.v;
}
function untrack(r) {
  const e = active_reaction;
  try {
    return active_reaction = null, r();
  } finally {
    active_reaction = e;
  }
}
const STATUS_MASK = -3585;
function set_signal_status(r, e) {
  r.f = r.f & STATUS_MASK | e;
}
function push(r, e = !1, t) {
  component_context = {
    p: component_context,
    c: null,
    e: null,
    m: !1,
    s: r,
    x: null,
    l: null
  }, e || (component_context.l = {
    s: null,
    u: null,
    r1: [],
    r2: source(!1)
  });
}
function pop(r) {
  const e = component_context;
  if (e !== null) {
    r !== void 0 && (e.x = r);
    const o = e.e;
    if (o !== null) {
      var t = active_effect, n = active_reaction;
      e.e = null;
      try {
        for (var s = 0; s < o.length; s++) {
          var i = o[s];
          set_active_effect(i.effect), set_active_reaction(i.reaction), effect(i.fn);
        }
      } finally {
        set_active_effect(t), set_active_reaction(n);
      }
    }
    component_context = e.p, e.m = !0;
  }
  return r || /** @type {T} */
  {};
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
    for (let n in r)
      try {
        deep_read(r[n], e);
      } catch {
      }
    const t = get_prototype_of(r);
    if (t !== Object.prototype && t !== Array.prototype && t !== Map.prototype && t !== Set.prototype && t !== Date.prototype) {
      const n = get_descriptors(t);
      for (let s in n) {
        const i = n[s].get;
        if (i)
          try {
            i.call(r);
          } catch {
          }
      }
    }
  }
}
function proxy(r, e = null, t) {
  if (typeof r != "object" || r === null || STATE_SYMBOL in r)
    return r;
  const n = get_prototype_of(r);
  if (n !== object_prototype && n !== array_prototype)
    return r;
  var s = /* @__PURE__ */ new Map(), i = is_array(r), o = source(0);
  i && s.set("length", source(
    /** @type {any[]} */
    r.length
  ));
  var l;
  return new Proxy(
    /** @type {any} */
    r,
    {
      defineProperty(c, d, u) {
        (!("value" in u) || u.configurable === !1 || u.enumerable === !1 || u.writable === !1) && state_descriptors_fixed();
        var f = s.get(d);
        return f === void 0 ? (f = source(u.value), s.set(d, f)) : set(f, proxy(u.value, l)), !0;
      },
      deleteProperty(c, d) {
        var u = s.get(d);
        if (u === void 0)
          d in c && s.set(d, source(UNINITIALIZED));
        else {
          if (i && typeof d == "string") {
            var f = (
              /** @type {Source<number>} */
              s.get("length")
            ), h = Number(d);
            Number.isInteger(h) && h < f.v && set(f, h);
          }
          set(u, UNINITIALIZED), update_version(o);
        }
        return !0;
      },
      get(c, d, u) {
        var g;
        if (d === STATE_SYMBOL)
          return r;
        var f = s.get(d), h = d in c;
        if (f === void 0 && (!h || (g = get_descriptor(c, d)) != null && g.writable) && (f = source(proxy(h ? c[d] : UNINITIALIZED, l)), s.set(d, f)), f !== void 0) {
          var _ = get$1(f);
          return _ === UNINITIALIZED ? void 0 : _;
        }
        return Reflect.get(c, d, u);
      },
      getOwnPropertyDescriptor(c, d) {
        var u = Reflect.getOwnPropertyDescriptor(c, d);
        if (u && "value" in u) {
          var f = s.get(d);
          f && (u.value = get$1(f));
        } else if (u === void 0) {
          var h = s.get(d), _ = h == null ? void 0 : h.v;
          if (h !== void 0 && _ !== UNINITIALIZED)
            return {
              enumerable: !0,
              configurable: !0,
              value: _,
              writable: !0
            };
        }
        return u;
      },
      has(c, d) {
        var _;
        if (d === STATE_SYMBOL)
          return !0;
        var u = s.get(d), f = u !== void 0 && u.v !== UNINITIALIZED || Reflect.has(c, d);
        if (u !== void 0 || active_effect !== null && (!f || (_ = get_descriptor(c, d)) != null && _.writable)) {
          u === void 0 && (u = source(f ? proxy(c[d], l) : UNINITIALIZED), s.set(d, u));
          var h = get$1(u);
          if (h === UNINITIALIZED)
            return !1;
        }
        return f;
      },
      set(c, d, u, f) {
        var w;
        var h = s.get(d), _ = d in c;
        if (i && d === "length")
          for (var g = u; g < /** @type {Source<number>} */
          h.v; g += 1) {
            var m = s.get(g + "");
            m !== void 0 ? set(m, UNINITIALIZED) : g in c && (m = source(UNINITIALIZED), s.set(g + "", m));
          }
        h === void 0 ? (!_ || (w = get_descriptor(c, d)) != null && w.writable) && (h = source(void 0), set(h, proxy(u, l)), s.set(d, h)) : (_ = h.v !== UNINITIALIZED, set(h, proxy(u, l)));
        var v = Reflect.getOwnPropertyDescriptor(c, d);
        if (v != null && v.set && v.set.call(f, u), !_) {
          if (i && typeof d == "string") {
            var y = (
              /** @type {Source<number>} */
              s.get("length")
            ), b = Number(d);
            Number.isInteger(b) && b >= y.v && set(y, b + 1);
          }
          update_version(o);
        }
        return !0;
      },
      ownKeys(c) {
        get$1(o);
        var d = Reflect.ownKeys(c).filter((h) => {
          var _ = s.get(h);
          return _ === void 0 || _.v !== UNINITIALIZED;
        });
        for (var [u, f] of s)
          f.v !== UNINITIALIZED && !(u in c) && d.push(u);
        return d;
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
var $window, first_child_getter, next_sibling_getter;
function init_operations() {
  if ($window === void 0) {
    $window = window;
    var r = Element.prototype, e = Node.prototype;
    first_child_getter = get_descriptor(e, "firstChild").get, next_sibling_getter = get_descriptor(e, "nextSibling").get, r.__click = void 0, r.__className = "", r.__attributes = null, r.__styles = null, r.__e = void 0, Text.prototype.__t = void 0;
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
    var n = create_text();
    return t == null || t.before(n), set_hydrate_node(n), n;
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
  let n = hydrating ? hydrate_node : r;
  for (; e--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ get_next_sibling(n);
  if (!hydrating)
    return n;
  var s = n.nodeType;
  if (t && s !== 3) {
    var i = create_text();
    return n == null || n.before(i), set_hydrate_node(i), i;
  }
  return set_hydrate_node(n), /** @type {TemplateNode} */
  n;
}
function clear_text_content(r) {
  r.textContent = "";
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
    var n = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(e)
    );
    e.remove(), e = n;
  }
}
const all_registered_events = /* @__PURE__ */ new Set(), root_event_handles = /* @__PURE__ */ new Set();
function create_event(r, e, t, n) {
  function s(i) {
    if (n.capture || handle_event_propagation.call(e, i), !i.cancelBubble) {
      var o = active_reaction, l = active_effect;
      set_active_reaction(null), set_active_effect(null);
      try {
        return t.call(this, i);
      } finally {
        set_active_reaction(o), set_active_effect(l);
      }
    }
  }
  return r.startsWith("pointer") || r.startsWith("touch") || r === "wheel" ? queue_micro_task(() => {
    e.addEventListener(r, s, n);
  }) : e.addEventListener(r, s, n), s;
}
function event(r, e, t, n, s) {
  var i = { capture: n, passive: s }, o = create_event(r, e, t, i);
  (e === document.body || e === window || e === document) && teardown(() => {
    e.removeEventListener(r, o, i);
  });
}
function handle_event_propagation(r) {
  var b;
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), n = r.type, s = ((b = r.composedPath) == null ? void 0 : b.call(r)) || [], i = (
    /** @type {null | Element} */
    s[0] || r.target
  ), o = 0, l = r.__root;
  if (l) {
    var c = s.indexOf(l);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      r.__root = e;
      return;
    }
    var d = s.indexOf(e);
    if (d === -1)
      return;
    c <= d && (o = c);
  }
  if (i = /** @type {Element} */
  s[o] || r.target, i !== e) {
    define_property(r, "currentTarget", {
      configurable: !0,
      get() {
        return i || t;
      }
    });
    var u = active_reaction, f = active_effect;
    set_active_reaction(null), set_active_effect(null);
    try {
      for (var h, _ = []; i !== null; ) {
        var g = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var m = i["__" + n];
          if (m !== void 0 && !/** @type {any} */
          i.disabled)
            if (is_array(m)) {
              var [v, ...y] = m;
              v.apply(i, [r, ...y]);
            } else
              m.call(i, r);
        } catch (w) {
          h ? _.push(w) : h = w;
        }
        if (r.cancelBubble || g === e || g === null)
          break;
        i = g;
      }
      if (h) {
        for (let w of _)
          queueMicrotask(() => {
            throw w;
          });
        throw h;
      }
    } finally {
      r.__root = e, delete r.currentTarget, set_active_reaction(u), set_active_effect(f);
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
  var t = (e & TEMPLATE_FRAGMENT) !== 0, n = (e & TEMPLATE_USE_IMPORT_NODE) !== 0, s, i = !r.startsWith("<!>");
  return () => {
    if (hydrating)
      return assign_nodes(hydrate_node, null), hydrate_node;
    s === void 0 && (s = create_fragment_from_html(i ? r : "<!>" + r), t || (s = /** @type {Node} */
    /* @__PURE__ */ get_first_child(s)));
    var o = (
      /** @type {TemplateNode} */
      n ? document.importNode(s, !0) : s.cloneNode(!0)
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
const PASSIVE_EVENTS = ["touchstart", "touchmove"];
function is_passive_event(r) {
  return PASSIVE_EVENTS.includes(r);
}
let should_intro = !0;
function set_text(r, e) {
  var t = e == null ? "" : typeof e == "object" ? e + "" : e;
  t !== (r.__t ?? (r.__t = r.nodeValue)) && (r.__t = t, r.nodeValue = t == null ? "" : t + "");
}
function mount(r, e) {
  return _mount(r, e);
}
function hydrate(r, e) {
  init_operations(), e.intro = e.intro ?? !1;
  const t = e.target, n = hydrating, s = hydrate_node;
  try {
    for (var i = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_first_child(t)
    ); i && (i.nodeType !== 8 || /** @type {Comment} */
    i.data !== HYDRATION_START); )
      i = /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(i);
    if (!i)
      throw HYDRATION_ERROR;
    set_hydrating(!0), set_hydrate_node(
      /** @type {Comment} */
      i
    ), hydrate_next();
    const o = _mount(r, { ...e, anchor: i });
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
    set_hydrating(n), set_hydrate_node(s);
  }
}
const document_listeners = /* @__PURE__ */ new Map();
function _mount(r, { target: e, anchor: t, props: n = {}, events: s, context: i, intro: o = !0 }) {
  init_operations();
  var l = /* @__PURE__ */ new Set(), c = (f) => {
    for (var h = 0; h < f.length; h++) {
      var _ = f[h];
      if (!l.has(_)) {
        l.add(_);
        var g = is_passive_event(_);
        e.addEventListener(_, handle_event_propagation, { passive: g });
        var m = document_listeners.get(_);
        m === void 0 ? (document.addEventListener(_, handle_event_propagation, { passive: g }), document_listeners.set(_, 1)) : document_listeners.set(_, m + 1);
      }
    }
  };
  c(array_from(all_registered_events)), root_event_handles.add(c);
  var d = void 0, u = effect_root(() => {
    var f = t ?? e.appendChild(create_text());
    return branch(() => {
      if (i) {
        push({});
        var h = (
          /** @type {ComponentContext} */
          component_context
        );
        h.c = i;
      }
      s && (n.$$events = s), hydrating && assign_nodes(
        /** @type {TemplateNode} */
        f,
        null
      ), should_intro = o, d = r(f, n) || {}, should_intro = !0, hydrating && (active_effect.nodes_end = hydrate_node), i && pop();
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
      root_event_handles.delete(c), mounted_components.delete(d), f !== t && ((g = f.parentNode) == null || g.removeChild(f));
    };
  });
  return mounted_components.set(d, u), d;
}
let mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(r) {
  const e = mounted_components.get(r);
  e && e();
}
function if_block(r, e, t, n = null, s = !1) {
  hydrating && hydrate_next();
  var i = r, o = null, l = null, c = null, d = s ? EFFECT_TRANSPARENT : 0;
  block(() => {
    if (c === (c = !!e())) return;
    let u = !1;
    if (hydrating) {
      const f = (
        /** @type {Comment} */
        i.data === HYDRATION_START_ELSE
      );
      c === f && (i = remove_nodes(), set_hydrate_node(i), set_hydrating(!1), u = !0);
    }
    c ? (o ? resume_effect(o) : o = branch(() => t(i)), l && pause_effect(l, () => {
      l = null;
    })) : (l ? resume_effect(l) : n && (l = branch(() => n(i))), o && pause_effect(o, () => {
      o = null;
    })), u && set_hydrating(!0);
  }, d), hydrating && (i = hydrate_node);
}
let current_each_item = null;
function index(r, e) {
  return e;
}
function pause_effects(r, e, t, n) {
  for (var s = [], i = e.length, o = 0; o < i; o++)
    pause_children(e[o].e, s, !0);
  var l = i > 0 && s.length === 0 && t !== null;
  if (l) {
    var c = (
      /** @type {Element} */
      /** @type {Element} */
      t.parentNode
    );
    clear_text_content(c), c.append(
      /** @type {Element} */
      t
    ), n.clear(), link(r, e[0].prev, e[i - 1].next);
  }
  run_out_transitions(s, () => {
    for (var d = 0; d < i; d++) {
      var u = e[d];
      l || (n.delete(u.k), link(r, u.prev, u.next)), destroy_effect(u.e, !l);
    }
  });
}
function each(r, e, t, n, s, i = null) {
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
  var d = null, u = !1;
  block(() => {
    var f = t(), h = is_array(f) ? f : f == null ? [] : array_from(f), _ = h.length;
    if (u && _ === 0)
      return;
    u = _ === 0;
    let g = !1;
    if (hydrating) {
      var m = (
        /** @type {Comment} */
        o.data === HYDRATION_START_ELSE
      );
      m !== (_ === 0) && (o = remove_nodes(), set_hydrate_node(o), set_hydrating(!1), g = !0);
    }
    if (hydrating) {
      for (var v = null, y, b = 0; b < _; b++) {
        if (hydrate_node.nodeType === 8 && /** @type {Comment} */
        hydrate_node.data === HYDRATION_END) {
          o = /** @type {Comment} */
          hydrate_node, g = !0, set_hydrating(!1);
          break;
        }
        var w = h[b], T = n(w, b);
        y = create_item(hydrate_node, l, v, null, w, T, b, s, e), l.items.set(T, y), v = y;
      }
      _ > 0 && set_hydrate_node(remove_nodes());
    }
    hydrating || reconcile(h, l, o, s, e, n), i !== null && (_ === 0 ? d ? resume_effect(d) : d = branch(() => i(o)) : d !== null && pause_effect(d, () => {
      d = null;
    })), g && set_hydrating(!0), t();
  }), hydrating && (o = hydrate_node);
}
function reconcile(r, e, t, n, s, i) {
  var o = r.length, l = e.items, c = e.first, d = c, u, f = null, h = [], _ = [], g, m, v, y;
  for (y = 0; y < o; y += 1) {
    if (g = r[y], m = i(g, y), v = l.get(m), v === void 0) {
      var b = d ? (
        /** @type {TemplateNode} */
        d.e.nodes_start
      ) : t;
      f = create_item(
        b,
        e,
        f,
        f === null ? e.first : f.next,
        g,
        m,
        y,
        n,
        s
      ), l.set(m, f), h = [], _ = [], d = f.next;
      continue;
    }
    if (update_item(v, g, y), v.e.f & INERT && resume_effect(v.e), v !== d) {
      if (u !== void 0 && u.has(v)) {
        if (h.length < _.length) {
          var w = _[0], T;
          f = w.prev;
          var E = h[0], k = h[h.length - 1];
          for (T = 0; T < h.length; T += 1)
            move(h[T], w, t);
          for (T = 0; T < _.length; T += 1)
            u.delete(_[T]);
          link(e, E.prev, k.next), link(e, f, E), link(e, k, w), d = w, f = k, y -= 1, h = [], _ = [];
        } else
          u.delete(v), move(v, d, t), link(e, v.prev, v.next), link(e, v, f === null ? e.first : f.next), link(e, f, v), f = v;
        continue;
      }
      for (h = [], _ = []; d !== null && d.k !== m; )
        d.e.f & INERT || (u ?? (u = /* @__PURE__ */ new Set())).add(d), _.push(d), d = d.next;
      if (d === null)
        continue;
      v = d;
    }
    h.push(v), f = v, d = v.next;
  }
  if (d !== null || u !== void 0) {
    for (var C = u === void 0 ? [] : array_from(u); d !== null; )
      d.e.f & INERT || C.push(d), d = d.next;
    var $ = C.length;
    if ($ > 0) {
      var L = o === 0 ? t : null;
      pause_effects(e, C, L, l);
    }
  }
  active_effect.first = e.first && e.first.e, active_effect.last = f && f.e;
}
function update_item(r, e, t, n) {
  internal_set(r.v, e), r.i = t;
}
function create_item(r, e, t, n, s, i, o, l, c) {
  var d = current_each_item;
  try {
    var u = (c & EACH_ITEM_REACTIVE) !== 0, f = (c & EACH_ITEM_IMMUTABLE) === 0, h = u ? f ? /* @__PURE__ */ mutable_source(s) : source(s) : s, _ = c & EACH_INDEX_REACTIVE ? source(o) : o, g = {
      i: _,
      v: h,
      k: i,
      a: null,
      // @ts-expect-error
      e: null,
      prev: t,
      next: n
    };
    return current_each_item = g, g.e = branch(() => l(r, h, _), hydrating), g.e.prev = t && t.e, g.e.next = n && n.e, t === null ? e.first = g : (t.next = g, t.e.next = g.e), n !== null && (n.prev = g, n.e.prev = g.e), g;
  } finally {
    current_each_item = d;
  }
}
function move(r, e, t) {
  for (var n = r.next ? (
    /** @type {TemplateNode} */
    r.next.e.nodes_start
  ) : t, s = e ? (
    /** @type {TemplateNode} */
    e.e.nodes_start
  ) : t, i = (
    /** @type {TemplateNode} */
    r.e.nodes_start
  ); i !== n; ) {
    var o = (
      /** @type {TemplateNode} */
      /* @__PURE__ */ get_next_sibling(i)
    );
    s.before(i), i = o;
  }
}
function link(r, e, t) {
  e === null ? r.first = t : (e.next = t, e.e.next = t && t.e), t !== null && (t.prev = e, t.e.prev = e && e.e);
}
function slot(r, e, t, n, s) {
  var l;
  hydrating && hydrate_next();
  var i = (l = e.$$slots) == null ? void 0 : l[t], o = !1;
  i === !0 && (i = e.children, o = !0), i === void 0 || i(r, o ? () => n : n);
}
function append_styles(r, e) {
  queue_micro_task(() => {
    var t = r.getRootNode(), n = (
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
    if (!n.querySelector("#" + e.hash)) {
      const s = document.createElement("style");
      s.id = e.hash, s.textContent = e.code, n.appendChild(s);
    }
  });
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
function remove_input_defaults(r) {
  if (hydrating) {
    var e = !1, t = () => {
      if (!e) {
        if (e = !0, r.hasAttribute("value")) {
          var n = r.value;
          set_attribute(r, "value", null), r.value = n;
        }
        if (r.hasAttribute("checked")) {
          var s = r.checked;
          set_attribute(r, "checked", null), r.checked = s;
        }
      }
    };
    r.__on_r = t, queue_idle_task(t), add_form_reset_listener();
  }
}
function set_attribute(r, e, t, n) {
  var s = r.__attributes ?? (r.__attributes = {});
  hydrating && (s[e] = r.getAttribute(e), e === "src" || e === "srcset" || e === "href" && r.nodeName === "LINK") || s[e] !== (s[e] = t) && (e === "style" && "__styles" in r && (r.__styles = {}), e === "loading" && (r[LOADING_ATTR_SYMBOL] = t), t == null ? r.removeAttribute(e) : typeof t != "string" && get_setters(r).includes(e) ? r[e] = t : r.setAttribute(e, t));
}
var setters_cache = /* @__PURE__ */ new Map();
function get_setters(r) {
  var e = setters_cache.get(r.nodeName);
  if (e) return e;
  setters_cache.set(r.nodeName, e = []);
  for (var t, n = get_prototype_of(r), s = Element.prototype; s !== n; ) {
    t = get_descriptors(n);
    for (var i in t)
      t[i].set && e.push(i);
    n = get_prototype_of(n);
  }
  return e;
}
function toggle_class(r, e, t) {
  if (t) {
    if (r.classList.contains(e)) return;
    r.classList.add(e);
  } else {
    if (!r.classList.contains(e)) return;
    r.classList.remove(e);
  }
}
const request_animation_frame = requestAnimationFrame, now$1 = () => performance.now(), raf = {
  tick: (
    /** @param {any} _ */
    (r) => request_animation_frame(r)
  ),
  now: () => now$1(),
  tasks: /* @__PURE__ */ new Set()
};
function run_tasks(r) {
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
  r.dispatchEvent(new CustomEvent(e));
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
  for (const n of t) {
    const [s, i] = n.split(":");
    if (!s || i === void 0) break;
    const o = css_property_to_camelcase(s.trim());
    e[o] = i.trim();
  }
  return e;
}
const linear$1 = (r) => r;
function transition$1(r, e, t, n) {
  var s = (r & TRANSITION_GLOBAL) !== 0, i = "both", o, l = e.inert, c, d;
  function u() {
    var m = active_reaction, v = active_effect;
    set_active_reaction(null), set_active_effect(null);
    try {
      return o ?? (o = t()(e, (n == null ? void 0 : n()) ?? /** @type {P} */
      {}, {
        direction: i
      }));
    } finally {
      set_active_reaction(m), set_active_effect(v);
    }
  }
  var f = {
    is_global: s,
    in() {
      e.inert = l, dispatch_event(e, "introstart"), c = animate(e, u(), d, 1, () => {
        dispatch_event(e, "introend"), c == null || c.abort(), c = o = void 0;
      });
    },
    out(m) {
      e.inert = !0, dispatch_event(e, "outrostart"), d = animate(e, u(), c, 0, () => {
        dispatch_event(e, "outroend"), m == null || m();
      });
    },
    stop: () => {
      c == null || c.abort(), d == null || d.abort();
    }
  }, h = (
    /** @type {Effect} */
    active_effect
  );
  if ((h.transitions ?? (h.transitions = [])).push(f), should_intro) {
    var _ = s;
    if (!_) {
      for (var g = (
        /** @type {Effect | null} */
        h.parent
      ); g && g.f & EFFECT_TRANSPARENT; )
        for (; (g = g.parent) && !(g.f & BLOCK_EFFECT); )
          ;
      _ = !g || (g.f & EFFECT_RAN) !== 0;
    }
    _ && effect(() => {
      untrack(() => f.in());
    });
  }
}
function animate(r, e, t, n, s) {
  var i = n === 1;
  if (is_function(e)) {
    var o, l = !1;
    return queue_micro_task(() => {
      if (!l) {
        var v = e({ direction: i ? "in" : "out" });
        o = animate(r, v, t, n, s);
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
    return s(), {
      abort: noop$2,
      deactivate: noop$2,
      reset: noop$2,
      t: () => n
    };
  const { delay: c = 0, css: d, tick: u, easing: f = linear$1 } = e;
  var h = [];
  if (i && t === void 0 && (u && u(0, 1), d)) {
    var _ = css_to_keyframe(d(0, 1));
    h.push(_, _);
  }
  var g = () => 1 - n, m = r.animate(h, { duration: c });
  return m.onfinish = () => {
    var v = (t == null ? void 0 : t.t()) ?? 1 - n;
    t == null || t.abort();
    var y = n - v, b = (
      /** @type {number} */
      e.duration * Math.abs(y)
    ), w = [];
    if (b > 0) {
      if (d)
        for (var T = Math.ceil(b / 16.666666666666668), E = 0; E <= T; E += 1) {
          var k = v + y * f(E / T), C = d(k, 1 - k);
          w.push(css_to_keyframe(C));
        }
      g = () => {
        var $ = (
          /** @type {number} */
          /** @type {globalThis.Animation} */
          m.currentTime
        );
        return v + y * f($ / b);
      }, u && loop$1(() => {
        if (m.playState !== "running") return !1;
        var $ = g();
        return u($, 1 - $), !0;
      });
    }
    m = r.animate(w, { duration: b, fill: "forwards" }), m.onfinish = () => {
      g = () => n, u == null || u(n, 1 - n), s();
    };
  }, {
    abort: () => {
      m && (m.cancel(), m.effect = null, m.onfinish = noop$2);
    },
    deactivate: () => {
      s = noop$2;
    },
    reset: () => {
      n === 0 && (u == null || u(1, 0));
    },
    t: () => g()
  };
}
function listen_to_event_and_reset_event(r, e, t, n = t) {
  r.addEventListener(e, t);
  const s = r.__on_r;
  s ? r.__on_r = () => {
    s(), n();
  } : r.__on_r = n, add_form_reset_listener();
}
function bind_value(r, e, t = e) {
  var n = is_runes();
  listen_to_event_and_reset_event(r, "input", () => {
    var s = is_numberlike_input(r) ? to_number(r.value) : r.value;
    t(s), n && s !== (s = e()) && (r.value = s ?? "");
  }), render_effect(() => {
    var s = e();
    if (hydrating && r.defaultValue !== r.value) {
      t(r.value);
      return;
    }
    is_numberlike_input(r) && s === to_number(r.value) || r.type === "date" && !s && !r.value || s !== r.value && (r.value = s ?? "");
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
function bind_this(r = {}, e, t, n) {
  return effect(() => {
    var s, i;
    return render_effect(() => {
      s = i, i = [], untrack(() => {
        r !== t(...i) && (e(r, ...i), s && is_bound_this(t(...s), r) && e(null, ...s));
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
  let n = () => deep_read_state(e.s);
  if (r) {
    let s = 0, i = (
      /** @type {Record<string, any>} */
      {}
    );
    const o = /* @__PURE__ */ derived(() => {
      let l = !1;
      const c = e.s;
      for (const d in c)
        c[d] !== i[d] && (i[d] = c[d], l = !0);
      return l && s++, s;
    });
    n = () => get$1(o);
  }
  t.b.length && user_pre_effect(() => {
    observe_all(e, n), run_all(t.b);
  }), user_effect(() => {
    const s = untrack(() => t.m.map(run));
    return () => {
      for (const i of s)
        typeof i == "function" && i();
    };
  }), t.a.length && user_effect(() => {
    observe_all(e, n), run_all(t.a);
  });
}
function observe_all(r, e) {
  if (r.l.s)
    for (const t of r.l.s) get$1(t);
  e();
}
function onMount(r) {
  component_context === null && lifecycle_outside_component(), component_context.l !== null ? init_update_callbacks(component_context).m.push(r) : user_effect(() => {
    const e = untrack(r);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
function create_custom_event(r, e, { bubbles: t = !1, cancelable: n = !1 } = {}) {
  return new CustomEvent(r, { detail: e, bubbles: t, cancelable: n });
}
function createEventDispatcher() {
  const r = component_context;
  return r === null && lifecycle_outside_component(), (e, t, n) => {
    var i;
    const s = (
      /** @type {Record<string, Function | Function[]>} */
      (i = r.s.$$events) == null ? void 0 : i[
        /** @type {any} */
        e
      ]
    );
    if (s) {
      const o = is_array(s) ? s.slice() : [s], l = create_custom_event(
        /** @type {string} */
        e,
        t,
        n
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
let is_store_binding = !1;
function capture_store_binding(r) {
  var e = is_store_binding;
  try {
    return is_store_binding = !1, [r(), is_store_binding];
  } finally {
    is_store_binding = e;
  }
}
function with_parent_branch(r) {
  for (var e = active_effect, t = active_effect; e !== null && !(e.f & (BRANCH_EFFECT | ROOT_EFFECT)); )
    e = e.parent;
  try {
    return set_active_effect(e), r();
  } finally {
    set_active_effect(t);
  }
}
function prop(r, e, t, n) {
  var k;
  var s = (t & PROPS_IS_IMMUTABLE) !== 0, i = (t & PROPS_IS_RUNES) !== 0, o = (t & PROPS_IS_BINDABLE) !== 0, l = (t & PROPS_IS_LAZY_INITIAL) !== 0, c = !1, d;
  o ? [d, c] = capture_store_binding(() => (
    /** @type {V} */
    r[e]
  )) : d = /** @type {V} */
  r[e];
  var u = (k = get_descriptor(r, e)) == null ? void 0 : k.set, f = (
    /** @type {V} */
    n
  ), h = !0, _ = !1, g = () => (_ = !0, h && (h = !1, l ? f = untrack(
    /** @type {() => V} */
    n
  ) : f = /** @type {V} */
  n), f);
  d === void 0 && n !== void 0 && (u && i && props_invalid_value(), d = g(), u && u(d));
  var m;
  if (i)
    m = () => {
      var C = (
        /** @type {V} */
        r[e]
      );
      return C === void 0 ? g() : (h = !0, _ = !1, C);
    };
  else {
    var v = with_parent_branch(
      () => (s ? derived : derived_safe_equal)(() => (
        /** @type {V} */
        r[e]
      ))
    );
    v.f |= LEGACY_DERIVED_PROP, m = () => {
      var C = get$1(v);
      return C !== void 0 && (f = /** @type {V} */
      void 0), C === void 0 ? f : C;
    };
  }
  if (!(t & PROPS_IS_UPDATED))
    return m;
  if (u) {
    var y = r.$$legacy;
    return function(C, $) {
      return arguments.length > 0 ? ((!i || !$ || y || c) && u($ ? m() : C), C) : m();
    };
  }
  var b = !1, w = !1, T = /* @__PURE__ */ mutable_source(d), E = with_parent_branch(
    () => /* @__PURE__ */ derived(() => {
      var C = m(), $ = get$1(T), L = (
        /** @type {Derived} */
        active_reaction
      );
      return b || C === void 0 && L.f & DESTROYED ? (b = !1, w = !0, $) : (w = !1, T.v = C);
    })
  );
  return s || (E.equals = safe_equals), function(C, $) {
    if (arguments.length > 0) {
      const L = $ ? get$1(E) : i && o ? proxy(C) : C;
      return E.equals(L) || (b = !0, set(T, L), _ && f !== void 0 && (f = L), untrack(() => get$1(E))), C;
    }
    return get$1(E);
  };
}
function createClassComponent(r) {
  return new Svelte4Component(r);
}
var j, D;
class Svelte4Component {
  /**
   * @param {ComponentConstructorOptions & {
   *  component: any;
   * }} options
   */
  constructor(e) {
    /** @type {any} */
    q(this, j);
    /** @type {Record<string, any>} */
    q(this, D);
    var i;
    var t = /* @__PURE__ */ new Map(), n = (o, l) => {
      var c = /* @__PURE__ */ mutable_source(l);
      return t.set(o, c), c;
    };
    const s = new Proxy(
      { ...e.props || {}, $$events: {} },
      {
        get(o, l) {
          return get$1(t.get(l) ?? n(l, Reflect.get(o, l)));
        },
        has(o, l) {
          return get$1(t.get(l) ?? n(l, Reflect.get(o, l))), Reflect.has(o, l);
        },
        set(o, l, c) {
          return set(t.get(l) ?? n(l, c), c), Reflect.set(o, l, c);
        }
      }
    );
    z(this, D, (e.hydrate ? hydrate : mount)(e.component, {
      target: e.target,
      props: s,
      context: e.context,
      intro: e.intro ?? !1,
      recover: e.recover
    })), (!((i = e == null ? void 0 : e.props) != null && i.$$host) || e.sync === !1) && flush_sync(), z(this, j, s.$$events);
    for (const o of Object.keys(N(this, D)))
      o === "$set" || o === "$destroy" || o === "$on" || define_property(this, o, {
        get() {
          return N(this, D)[o];
        },
        /** @param {any} value */
        set(l) {
          N(this, D)[o] = l;
        },
        enumerable: !0
      });
    N(this, D).$set = /** @param {Record<string, any>} next */
    (o) => {
      Object.assign(s, o);
    }, N(this, D).$destroy = () => {
      unmount(N(this, D));
    };
  }
  /** @param {Record<string, any>} props */
  $set(e) {
    N(this, D).$set(e);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(e, t) {
    N(this, j)[e] = N(this, j)[e] || [];
    const n = (...s) => t.call(this, ...s);
    return N(this, j)[e].push(n), () => {
      N(this, j)[e] = N(this, j)[e].filter(
        /** @param {any} fn */
        (s) => s !== n
      );
    };
  }
  $destroy() {
    N(this, D).$destroy();
  }
}
j = new WeakMap(), D = new WeakMap();
let SvelteElement;
typeof HTMLElement == "function" && (SvelteElement = class extends HTMLElement {
  /**
   * @param {*} $$componentCtor
   * @param {*} $$slots
   * @param {*} use_shadow_dom
   */
  constructor(e, t, n) {
    super();
    /** The Svelte component constructor */
    M(this, "$$ctor");
    /** Slots */
    M(this, "$$s");
    /** @type {any} The Svelte component instance */
    M(this, "$$c");
    /** Whether or not the custom element is connected */
    M(this, "$$cn", !1);
    /** @type {Record<string, any>} Component props data */
    M(this, "$$d", {});
    /** `true` if currently in the process of reflecting component props back to attributes */
    M(this, "$$r", !1);
    /** @type {Record<string, CustomElementPropDefinition>} Props definition (name, reflected, type etc) */
    M(this, "$$p_d", {});
    /** @type {Record<string, EventListenerOrEventListenerObject[]>} Event listeners */
    M(this, "$$l", {});
    /** @type {Map<EventListenerOrEventListenerObject, Function>} Event listener unsubscribe functions */
    M(this, "$$l_u", /* @__PURE__ */ new Map());
    /** @type {any} The managed render effect for reflecting attributes */
    M(this, "$$me");
    this.$$ctor = e, this.$$s = t, n && this.attachShadow({ mode: "open" });
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  addEventListener(e, t, n) {
    if (this.$$l[e] = this.$$l[e] || [], this.$$l[e].push(t), this.$$c) {
      const s = this.$$c.$on(e, t);
      this.$$l_u.set(t, s);
    }
    super.addEventListener(e, t, n);
  }
  /**
   * @param {string} type
   * @param {EventListenerOrEventListenerObject} listener
   * @param {boolean | AddEventListenerOptions} [options]
   */
  removeEventListener(e, t, n) {
    if (super.removeEventListener(e, t, n), this.$$c) {
      const s = this.$$l_u.get(t);
      s && (s(), this.$$l_u.delete(t));
    }
  }
  async connectedCallback() {
    if (this.$$cn = !0, !this.$$c) {
      let e = function(s) {
        return (i) => {
          const o = document.createElement("slot");
          s !== "default" && (o.name = s), append(i, o);
        };
      };
      if (await Promise.resolve(), !this.$$cn || this.$$c)
        return;
      const t = {}, n = get_custom_elements_slots(this);
      for (const s of this.$$s)
        s in n && (s === "default" && !this.$$d.children ? (this.$$d.children = e(s), t.default = !0) : t[s] = e(s));
      for (const s of this.attributes) {
        const i = this.$$g_p(s.name);
        i in this.$$d || (this.$$d[i] = get_custom_element_value(i, s.value, this.$$p_d, "toProp"));
      }
      for (const s in this.$$p_d)
        !(s in this.$$d) && this[s] !== void 0 && (this.$$d[s] = this[s], delete this[s]);
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
          var s;
          this.$$r = !0;
          for (const i of object_keys(this.$$c)) {
            if (!((s = this.$$p_d[i]) != null && s.reflect)) continue;
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
      for (const s in this.$$l)
        for (const i of this.$$l[s]) {
          const o = this.$$c.$on(s, i);
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
  attributeChangedCallback(e, t, n) {
    var s;
    this.$$r || (e = this.$$g_p(e), this.$$d[e] = get_custom_element_value(e, n, this.$$p_d, "toProp"), (s = this.$$c) == null || s.$set({ [e]: this.$$d[e] }));
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
function get_custom_element_value(r, e, t, n) {
  var i;
  const s = (i = t[r]) == null ? void 0 : i.type;
  if (e = s === "Boolean" && typeof e != "boolean" ? e != null : e, !n || !t[r])
    return e;
  if (n === "toAttribute")
    switch (s) {
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
    switch (s) {
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
function create_custom_element(r, e, t, n, s, i) {
  let o = class extends SvelteElement {
    constructor() {
      super(r, t, s), this.$$p_d = e;
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
        var d = this.$$c;
        if (d) {
          var u = (f = get_descriptor(d, l)) == null ? void 0 : f.get;
          u ? d[l] = c : d.$set({ [l]: c });
        }
      }
    });
  }), n.forEach((l) => {
    define_property(o.prototype, l, {
      get() {
        var c;
        return (c = this.$$c) == null ? void 0 : c[l];
      }
    });
  }), r.element = /** @type {any} */
  o, o;
}
var root_1$6 = /* @__PURE__ */ template('<article class="card svelte-eaw9ki"><img class="svelte-eaw9ki"> <div class="content svelte-eaw9ki"><h3 class="svelte-eaw9ki"> </h3> <div class="tuple text-green-600 svelte-eaw9ki"><p class="price svelte-eaw9ki"> </p></div> <div class="ctas-buttons svelte-eaw9ki"><a class="caret svelte-eaw9ki" style="transform: rotate(180deg)"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-eaw9ki"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a> <a class="cta svelte-eaw9ki"><span>Add to cart</span></a>    <a class="caret svelte-eaw9ki"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" class="svelte-eaw9ki"><path d="M4 .755l14.374 11.245-14.374 11.219.619.781 15.381-12-15.391-12-.609.755z"></path></svg></a></div></div></article>');
const $$css$e = {
  hash: "svelte-eaw9ki",
  code: `/* Colors */
/**
 * Text styles
 */
.text-green-600.svelte-eaw9ki, .text-green-600 {
  color: #018849;
}

/**
 * Background styles
 */
/* (unused) .bg-green-600*/ .cta.svelte-eaw9ki, .bg-green-600 {
  background-color: #018849;
}

body {
  display: none !important;
}

.cta.svelte-eaw9ki {
  color: #ffffff;
  cursor: pointer;
}

.card.svelte-eaw9ki {
  width: 100%;
  max-width: 400px;
  display: flex;
  gap: 27px;
  color: inherit;
  text-decoration: none;
}

.caret.svelte-eaw9ki {
  background-color: #000000;
  color: #ffffff;
  fill: #ffffff;
  cursor: pointer;
}

.caret---qualified.svelte-eaw9ki {
  background-color: #018849;
}

.stroke.svelte-eaw9ki {
  text-decoration: line-through;
}

.ctas-buttons.svelte-eaw9ki {
  display: flex;
  gap: 1px;
  justify-content: center;
  align-content: center;
}

a.svelte-eaw9ki {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border: none;
  color: #000;
  background-color: #b4bed6;
  font-family: Monument, sans-serif;
  width: 100%;
  height: 41px;
  text-decoration: none;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -0.22px;
}

a.svelte-eaw9ki:nth-child(1),
a.svelte-eaw9ki:nth-child(3) {
  aspect-ratio: 1/1;
  flex-shrink: 1;
  width: auto;
}

a.svelte-eaw9ki svg:where(.svelte-eaw9ki) {
  width: 16px;
}

.content.svelte-eaw9ki {
  width: 70%;
  display: flex;
  flex-direction: column;
}

h3.svelte-eaw9ki {
  margin: 0;
  margin-bottom: 10px;
  font-weight: 100;
  min-height: 32px;
  font-size: 16px;
  color: #000;
  font-family: Panama, sans-serif;
  text-align: left;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  letter-spacing: -0.22px;
  line-height: 16px;
}

/* (unused) h4*/
.price.svelte-eaw9ki {
  margin: 0 0 10px;
  text-transform: uppercase;
  font-weight: 500;
  font-family: Monument, sans-serif;
  color: #000;
  font-size: 14px;
  letter-spacing: -0.22px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.price.svelte-eaw9ki {
  margin-bottom: 10px;
}

p.svelte-eaw9ki {
  margin: 0;
}

.tuple.svelte-eaw9ki {
  display: flex;
  justify-content: space-between;
  align-items: start;
  flex-grow: 1;
}

img.svelte-eaw9ki {
  display: block;
  width: 30%;
  object-fit: cover;
  aspect-ratio: 4/5;
  cursor: pointer;
}`
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
  return if_block(node, () => title() && featured_image() && price() && url(), ($$anchor) => {
    var article = root_1$6(), img = child(article), div = sibling(img, 2), h3 = child(div), text = child(h3, !0);
    reset(h3);
    var div_1 = sibling(h3, 2), p = child(div_1);
    toggle_class(p, "stroke", isFreeGiftQualified);
    var text_1 = child(p, !0);
    reset(p), reset(div_1);
    var div_2 = sibling(div_1, 2), a = child(div_2);
    toggle_class(a, "caret---qualified", !0);
    var a_1 = sibling(a, 2), a_2 = sibling(a_1, 2);
    toggle_class(a_2, "caret---qualified", !0), reset(div_2), reset(div), reset(article), template_effect(() => {
      set_attribute(img, "src", featured_image()), set_attribute(img, "alt", title()), set_text(text, title()), set_text(text_1, price());
    }), event("click", img, toItem), event("click", h3, toItem), event("click", a, () => eval(onPrevious())), event("click", a_1, addToCart), event("click", a_2, () => eval(onNext())), append($$anchor, article);
  }), append($$anchor, fragment), pop({
    get id() {
      return id();
    },
    set id(r) {
      id(r), flush_sync();
    },
    get title() {
      return title();
    },
    set title(r) {
      title(r), flush_sync();
    },
    get featured_image() {
      return featured_image();
    },
    set featured_image(r) {
      featured_image(r), flush_sync();
    },
    get price() {
      return price();
    },
    set price(r) {
      price(r), flush_sync();
    },
    get url() {
      return url();
    },
    set url(r) {
      url(r), flush_sync();
    },
    get onPrevious() {
      return onPrevious();
    },
    set onPrevious(r) {
      onPrevious(r), flush_sync();
    },
    get onNext() {
      return onNext();
    },
    set onNext(r) {
      onNext(r), flush_sync();
    },
    get spend_goal() {
      return spend_goal();
    },
    set spend_goal(r) {
      spend_goal(r), flush_sync();
    },
    get already_spent() {
      return already_spent();
    },
    set already_spent(r) {
      already_spent(r), flush_sync();
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
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$4).then(({ default: n }) => n(...t)) : e = fetch, (...t) => e(...t);
};
class FunctionsError extends Error {
  constructor(e, t = "FunctionsError", n) {
    super(e), this.name = t, this.context = n;
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
var __awaiter$7 = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
  });
};
class FunctionsClient {
  constructor(e, { headers: t = {}, customFetch: n, region: s = FunctionRegion.Any } = {}) {
    this.url = e, this.headers = t, this.region = s, this.fetch = resolveFetch$3(n);
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
    var n;
    return __awaiter$7(this, void 0, void 0, function* () {
      try {
        const { headers: s, method: i, body: o } = t;
        let l = {}, { region: c } = t;
        c || (c = this.region), c && c !== "any" && (l["x-region"] = c);
        let d;
        o && (s && !Object.prototype.hasOwnProperty.call(s, "Content-Type") || !s) && (typeof Blob < "u" && o instanceof Blob || o instanceof ArrayBuffer ? (l["Content-Type"] = "application/octet-stream", d = o) : typeof o == "string" ? (l["Content-Type"] = "text/plain", d = o) : typeof FormData < "u" && o instanceof FormData ? d = o : (l["Content-Type"] = "application/json", d = JSON.stringify(o)));
        const u = yield this.fetch(`${this.url}/${e}`, {
          method: i || "POST",
          // headers priority is (high to low):
          // 1. invoke-level headers
          // 2. client-level headers
          // 3. default Content-Type header
          headers: Object.assign(Object.assign(Object.assign({}, l), this.headers), s),
          body: d
        }).catch((g) => {
          throw new FunctionsFetchError(g);
        }), f = u.headers.get("x-relay-error");
        if (f && f === "true")
          throw new FunctionsRelayError(u);
        if (!u.ok)
          throw new FunctionsHttpError(u);
        let h = ((n = u.headers.get("Content-Type")) !== null && n !== void 0 ? n : "text/plain").split(";")[0].trim(), _;
        return h === "application/json" ? _ = yield u.json() : h === "application/octet-stream" ? _ = yield u.blob() : h === "text/event-stream" ? _ = u : h === "multipart/form-data" ? _ = yield u.formData() : _ = yield u.text(), { data: _, error: null };
      } catch (s) {
        return { data: null, error: s };
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
    var t = function n() {
      return this instanceof n ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(r).forEach(function(n) {
    var s = Object.getOwnPropertyDescriptor(r, n);
    Object.defineProperty(t, n, s.get ? s : {
      enumerable: !0,
      get: function() {
        return r[n];
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
    const n = this.fetch;
    let s = n(this.url.toString(), {
      method: this.method,
      headers: this.headers,
      body: JSON.stringify(this.body),
      signal: this.signal
    }).then(async (i) => {
      var o, l, c;
      let d = null, u = null, f = null, h = i.status, _ = i.statusText;
      if (i.ok) {
        if (this.method !== "HEAD") {
          const y = await i.text();
          y === "" || (this.headers.Accept === "text/csv" || this.headers.Accept && this.headers.Accept.includes("application/vnd.pgrst.plan+text") ? u = y : u = JSON.parse(y));
        }
        const m = (o = this.headers.Prefer) === null || o === void 0 ? void 0 : o.match(/count=(exact|planned|estimated)/), v = (l = i.headers.get("content-range")) === null || l === void 0 ? void 0 : l.split("/");
        m && v && v.length > 1 && (f = parseInt(v[1])), this.isMaybeSingle && this.method === "GET" && Array.isArray(u) && (u.length > 1 ? (d = {
          // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
          code: "PGRST116",
          details: `Results contain ${u.length} rows, application/vnd.pgrst.object+json requires 1 row`,
          hint: null,
          message: "JSON object requested, multiple (or no) rows returned"
        }, u = null, f = null, h = 406, _ = "Not Acceptable") : u.length === 1 ? u = u[0] : u = null);
      } else {
        const m = await i.text();
        try {
          d = JSON.parse(m), Array.isArray(d) && i.status === 404 && (u = [], d = null, h = 200, _ = "OK");
        } catch {
          i.status === 404 && m === "" ? (h = 204, _ = "No Content") : d = {
            message: m
          };
        }
        if (d && this.isMaybeSingle && (!((c = d == null ? void 0 : d.details) === null || c === void 0) && c.includes("0 rows")) && (d = null, h = 200, _ = "OK"), d && this.shouldThrowOnError)
          throw new PostgrestError_1$1.default(d);
      }
      return {
        error: d,
        data: u,
        count: f,
        status: h,
        statusText: _
      };
    });
    return this.shouldThrowOnError || (s = s.catch((i) => {
      var o, l, c;
      return {
        error: {
          message: `${(o = i == null ? void 0 : i.name) !== null && o !== void 0 ? o : "FetchError"}: ${i == null ? void 0 : i.message}`,
          details: `${(l = i == null ? void 0 : i.stack) !== null && l !== void 0 ? l : ""}`,
          hint: "",
          code: `${(c = i == null ? void 0 : i.code) !== null && c !== void 0 ? c : ""}`
        },
        data: null,
        count: null,
        status: 0,
        statusText: ""
      };
    })), s.then(e, t);
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
    const n = (e ?? "*").split("").map((s) => /\s/.test(s) && !t ? "" : (s === '"' && (t = !t), s)).join("");
    return this.url.searchParams.set("select", n), this.headers.Prefer && (this.headers.Prefer += ","), this.headers.Prefer += "return=representation", this;
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
  order(e, { ascending: t = !0, nullsFirst: n, foreignTable: s, referencedTable: i = s } = {}) {
    const o = i ? `${i}.order` : "order", l = this.url.searchParams.get(o);
    return this.url.searchParams.set(o, `${l ? `${l},` : ""}${e}.${t ? "asc" : "desc"}${n === void 0 ? "" : n ? ".nullsfirst" : ".nullslast"}`), this;
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
  limit(e, { foreignTable: t, referencedTable: n = t } = {}) {
    const s = typeof n > "u" ? "limit" : `${n}.limit`;
    return this.url.searchParams.set(s, `${e}`), this;
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
  range(e, t, { foreignTable: n, referencedTable: s = n } = {}) {
    const i = typeof s > "u" ? "offset" : `${s}.offset`, o = typeof s > "u" ? "limit" : `${s}.limit`;
    return this.url.searchParams.set(i, `${e}`), this.url.searchParams.set(o, `${t - e + 1}`), this;
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
  explain({ analyze: e = !1, verbose: t = !1, settings: n = !1, buffers: s = !1, wal: i = !1, format: o = "text" } = {}) {
    var l;
    const c = [
      e ? "analyze" : null,
      t ? "verbose" : null,
      n ? "settings" : null,
      s ? "buffers" : null,
      i ? "wal" : null
    ].filter(Boolean).join("|"), d = (l = this.headers.Accept) !== null && l !== void 0 ? l : "application/json";
    return this.headers.Accept = `application/vnd.pgrst.plan+${o}; for="${d}"; options=${c};`, o === "json" ? this : this;
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
    const n = Array.from(new Set(t)).map((s) => typeof s == "string" && new RegExp("[,()]").test(s) ? `"${s}"` : `${s}`).join(",");
    return this.url.searchParams.append(e, `in.(${n})`), this;
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
  textSearch(e, t, { config: n, type: s } = {}) {
    let i = "";
    s === "plain" ? i = "pl" : s === "phrase" ? i = "ph" : s === "websearch" && (i = "w");
    const o = n === void 0 ? "" : `(${n})`;
    return this.url.searchParams.append(e, `${i}fts${o}.${t}`), this;
  }
  /**
   * Match only rows where each column in `query` keys is equal to its
   * associated value. Shorthand for multiple `.eq()`s.
   *
   * @param query - The object to filter with, with column names as keys mapped
   * to their filter values
   */
  match(e) {
    return Object.entries(e).forEach(([t, n]) => {
      this.url.searchParams.append(t, `eq.${n}`);
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
  not(e, t, n) {
    return this.url.searchParams.append(e, `not.${t}.${n}`), this;
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
  or(e, { foreignTable: t, referencedTable: n = t } = {}) {
    const s = n ? `${n}.or` : "or";
    return this.url.searchParams.append(s, `(${e})`), this;
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
  filter(e, t, n) {
    return this.url.searchParams.append(e, `${t}.${n}`), this;
  }
};
PostgrestFilterBuilder$2.default = PostgrestFilterBuilder$1;
var __importDefault$2 = commonjsGlobal && commonjsGlobal.__importDefault || function(r) {
  return r && r.__esModule ? r : { default: r };
};
Object.defineProperty(PostgrestQueryBuilder$2, "__esModule", { value: !0 });
const PostgrestFilterBuilder_1$2 = __importDefault$2(PostgrestFilterBuilder$2);
let PostgrestQueryBuilder$1 = class {
  constructor(e, { headers: t = {}, schema: n, fetch: s }) {
    this.url = e, this.headers = t, this.schema = n, this.fetch = s;
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
  select(e, { head: t = !1, count: n } = {}) {
    const s = t ? "HEAD" : "GET";
    let i = !1;
    const o = (e ?? "*").split("").map((l) => /\s/.test(l) && !i ? "" : (l === '"' && (i = !i), l)).join("");
    return this.url.searchParams.set("select", o), n && (this.headers.Prefer = `count=${n}`), new PostgrestFilterBuilder_1$2.default({
      method: s,
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
  insert(e, { count: t, defaultToNull: n = !0 } = {}) {
    const s = "POST", i = [];
    if (this.headers.Prefer && i.push(this.headers.Prefer), t && i.push(`count=${t}`), n || i.push("missing=default"), this.headers.Prefer = i.join(","), Array.isArray(e)) {
      const o = e.reduce((l, c) => l.concat(Object.keys(c)), []);
      if (o.length > 0) {
        const l = [...new Set(o)].map((c) => `"${c}"`);
        this.url.searchParams.set("columns", l.join(","));
      }
    }
    return new PostgrestFilterBuilder_1$2.default({
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
  upsert(e, { onConflict: t, ignoreDuplicates: n = !1, count: s, defaultToNull: i = !0 } = {}) {
    const o = "POST", l = [`resolution=${n ? "ignore" : "merge"}-duplicates`];
    if (t !== void 0 && this.url.searchParams.set("on_conflict", t), this.headers.Prefer && l.push(this.headers.Prefer), s && l.push(`count=${s}`), i || l.push("missing=default"), this.headers.Prefer = l.join(","), Array.isArray(e)) {
      const c = e.reduce((d, u) => d.concat(Object.keys(u)), []);
      if (c.length > 0) {
        const d = [...new Set(c)].map((u) => `"${u}"`);
        this.url.searchParams.set("columns", d.join(","));
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
    const n = "PATCH", s = [];
    return this.headers.Prefer && s.push(this.headers.Prefer), t && s.push(`count=${t}`), this.headers.Prefer = s.join(","), new PostgrestFilterBuilder_1$2.default({
      method: n,
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
    const t = "DELETE", n = [];
    return e && n.push(`count=${e}`), this.headers.Prefer && n.unshift(this.headers.Prefer), this.headers.Prefer = n.join(","), new PostgrestFilterBuilder_1$2.default({
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
let PostgrestClient$1 = class W {
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
  constructor(e, { headers: t = {}, schema: n, fetch: s } = {}) {
    this.url = e, this.headers = Object.assign(Object.assign({}, constants_1.DEFAULT_HEADERS), t), this.schemaName = n, this.fetch = s;
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
    return new W(this.url, {
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
  rpc(e, t = {}, { head: n = !1, get: s = !1, count: i } = {}) {
    let o;
    const l = new URL(`${this.url}/rpc/${e}`);
    let c;
    n || s ? (o = n ? "HEAD" : "GET", Object.entries(t).filter(([u, f]) => f !== void 0).map(([u, f]) => [u, Array.isArray(f) ? `{${f.join(",")}}` : `${f}`]).forEach(([u, f]) => {
      l.searchParams.append(u, f);
    })) : (o = "POST", c = t);
    const d = Object.assign({}, this.headers);
    return i && (d.Prefer = `count=${i}`), new PostgrestFilterBuilder_1$1.default({
      method: o,
      url: l,
      headers: d,
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
    const t = new DataView(e), n = new TextDecoder();
    return this._decodeBroadcast(e, t, n);
  }
  _decodeBroadcast(e, t, n) {
    const s = t.getUint8(1), i = t.getUint8(2);
    let o = this.HEADER_LENGTH + 2;
    const l = n.decode(e.slice(o, o + s));
    o = o + s;
    const c = n.decode(e.slice(o, o + i));
    o = o + i;
    const d = JSON.parse(n.decode(e.slice(o, e.byteLength)));
    return { ref: null, topic: l, event: c, payload: d };
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
  var n;
  const s = (n = t.skipTypes) !== null && n !== void 0 ? n : [];
  return Object.keys(e).reduce((i, o) => (i[o] = convertColumn(o, r, e, s), i), {});
}, convertColumn = (r, e, t, n) => {
  const s = e.find((l) => l.name === r), i = s == null ? void 0 : s.type, o = t[r];
  return i && !n.includes(i) ? convertCell(i, o) : noop$1(o);
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
  const t = r.length - 1, n = r[t];
  if (r[0] === "{" && n === "}") {
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
  constructor(e, t, n = {}, s = DEFAULT_TIMEOUT) {
    this.channel = e, this.event = t, this.payload = n, this.timeout = s, this.sent = !1, this.timeoutTimer = void 0, this.ref = "", this.receivedResp = null, this.recHooks = [], this.refEvent = null;
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
    var n;
    return this._hasReceived(e) && t((n = this.receivedResp) === null || n === void 0 ? void 0 : n.response), this.recHooks.push({ status: e, callback: t }), this;
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
    this.recHooks.filter((n) => n.status === e).forEach((n) => n.callback(t));
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
    const n = (t == null ? void 0 : t.events) || {
      state: "presence_state",
      diff: "presence_diff"
    };
    this.channel._on(n.state, {}, (s) => {
      const { onJoin: i, onLeave: o, onSync: l } = this.caller;
      this.joinRef = this.channel._joinRef(), this.state = RealtimePresence.syncState(this.state, s, i, o), this.pendingDiffs.forEach((c) => {
        this.state = RealtimePresence.syncDiff(this.state, c, i, o);
      }), this.pendingDiffs = [], l();
    }), this.channel._on(n.diff, {}, (s) => {
      const { onJoin: i, onLeave: o, onSync: l } = this.caller;
      this.inPendingSyncState() ? this.pendingDiffs.push(s) : (this.state = RealtimePresence.syncDiff(this.state, s, i, o), l());
    }), this.onJoin((s, i, o) => {
      this.channel._trigger("presence", {
        event: "join",
        key: s,
        currentPresences: i,
        newPresences: o
      });
    }), this.onLeave((s, i, o) => {
      this.channel._trigger("presence", {
        event: "leave",
        key: s,
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
  static syncState(e, t, n, s) {
    const i = this.cloneDeep(e), o = this.transformState(t), l = {}, c = {};
    return this.map(i, (d, u) => {
      o[d] || (c[d] = u);
    }), this.map(o, (d, u) => {
      const f = i[d];
      if (f) {
        const h = u.map((v) => v.presence_ref), _ = f.map((v) => v.presence_ref), g = u.filter((v) => _.indexOf(v.presence_ref) < 0), m = f.filter((v) => h.indexOf(v.presence_ref) < 0);
        g.length > 0 && (l[d] = g), m.length > 0 && (c[d] = m);
      } else
        l[d] = u;
    }), this.syncDiff(i, { joins: l, leaves: c }, n, s);
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
  static syncDiff(e, t, n, s) {
    const { joins: i, leaves: o } = {
      joins: this.transformState(t.joins),
      leaves: this.transformState(t.leaves)
    };
    return n || (n = () => {
    }), s || (s = () => {
    }), this.map(i, (l, c) => {
      var d;
      const u = (d = e[l]) !== null && d !== void 0 ? d : [];
      if (e[l] = this.cloneDeep(c), u.length > 0) {
        const f = e[l].map((_) => _.presence_ref), h = u.filter((_) => f.indexOf(_.presence_ref) < 0);
        e[l].unshift(...h);
      }
      n(l, u, c);
    }), this.map(o, (l, c) => {
      let d = e[l];
      if (!d)
        return;
      const u = c.map((f) => f.presence_ref);
      d = d.filter((f) => u.indexOf(f.presence_ref) < 0), e[l] = d, s(l, d, c), d.length === 0 && delete e[l];
    }), e;
  }
  /** @internal */
  static map(e, t) {
    return Object.getOwnPropertyNames(e).map((n) => t(n, e[n]));
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
    return e = this.cloneDeep(e), Object.getOwnPropertyNames(e).reduce((t, n) => {
      const s = e[n];
      return "metas" in s ? t[n] = s.metas.map((i) => (i.presence_ref = i.phx_ref, delete i.phx_ref, delete i.phx_ref_prev, i)) : t[n] = s, t;
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
  constructor(e, t = { config: {} }, n) {
    this.topic = e, this.params = t, this.socket = n, this.bindings = {}, this.state = CHANNEL_STATES.closed, this.joinedOnce = !1, this.pushBuffer = [], this.subTopic = e.replace(/^realtime:/i, ""), this.params.config = Object.assign({
      broadcast: { ack: !1, self: !1 },
      presence: { key: "" },
      private: !1
    }, t.config), this.timeout = this.socket.timeout, this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout), this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs), this.joinPush.receive("ok", () => {
      this.state = CHANNEL_STATES.joined, this.rejoinTimer.reset(), this.pushBuffer.forEach((s) => s.send()), this.pushBuffer = [];
    }), this._onClose(() => {
      this.rejoinTimer.reset(), this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`), this.state = CHANNEL_STATES.closed, this.socket._remove(this);
    }), this._onError((s) => {
      this._isLeaving() || this._isClosed() || (this.socket.log("channel", `error ${this.topic}`, s), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this.joinPush.receive("timeout", () => {
      this._isJoining() && (this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout), this.state = CHANNEL_STATES.errored, this.rejoinTimer.scheduleTimeout());
    }), this._on(CHANNEL_EVENTS.reply, {}, (s, i) => {
      this._trigger(this._replyEventName(i), s);
    }), this.presence = new RealtimePresence(this), this.broadcastEndpointURL = httpEndpointURL(this.socket.endPoint) + "/api/broadcast", this.private = this.params.config.private || !1;
  }
  /** Subscribe registers your client with the server */
  subscribe(e, t = this.timeout) {
    var n, s;
    if (this.socket.isConnected() || this.socket.connect(), this.joinedOnce)
      throw "tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance";
    {
      const { config: { broadcast: i, presence: o, private: l } } = this.params;
      this._onError((u) => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, u)), this._onClose(() => e == null ? void 0 : e(REALTIME_SUBSCRIBE_STATES.CLOSED));
      const c = {}, d = {
        broadcast: i,
        presence: o,
        postgres_changes: (s = (n = this.bindings.postgres_changes) === null || n === void 0 ? void 0 : n.map((u) => u.filter)) !== null && s !== void 0 ? s : [],
        private: l
      };
      this.socket.accessTokenValue && (c.access_token = this.socket.accessTokenValue), this.updateJoinPayload(Object.assign({ config: d }, c)), this.joinedOnce = !0, this._rejoin(t), this.joinPush.receive("ok", async ({ postgres_changes: u }) => {
        var f;
        if (this.socket.setAuth(), u === void 0) {
          e == null || e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        } else {
          const h = this.bindings.postgres_changes, _ = (f = h == null ? void 0 : h.length) !== null && f !== void 0 ? f : 0, g = [];
          for (let m = 0; m < _; m++) {
            const v = h[m], { filter: { event: y, schema: b, table: w, filter: T } } = v, E = u && u[m];
            if (E && E.event === y && E.schema === b && E.table === w && E.filter === T)
              g.push(Object.assign(Object.assign({}, v), { id: E.id }));
            else {
              this.unsubscribe(), e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error("mismatch between server and client bindings for postgres changes"));
              return;
            }
          }
          this.bindings.postgres_changes = g, e && e(REALTIME_SUBSCRIBE_STATES.SUBSCRIBED);
          return;
        }
      }).receive("error", (u) => {
        e == null || e(REALTIME_SUBSCRIBE_STATES.CHANNEL_ERROR, new Error(JSON.stringify(Object.values(u).join(", ") || "error")));
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
  on(e, t, n) {
    return this._on(e, t, n);
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
    var n, s;
    if (!this._canPush() && e.type === "broadcast") {
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
        const d = await this._fetchWithTimeout(this.broadcastEndpointURL, c, (n = t.timeout) !== null && n !== void 0 ? n : this.timeout);
        return await ((s = d.body) === null || s === void 0 ? void 0 : s.cancel()), d.ok ? "ok" : "error";
      } catch (d) {
        return d.name === "AbortError" ? "timed out" : "error";
      }
    } else
      return new Promise((i) => {
        var o, l, c;
        const d = this._push(e.type, e, t.timeout || this.timeout);
        e.type === "broadcast" && !(!((c = (l = (o = this.params) === null || o === void 0 ? void 0 : o.config) === null || l === void 0 ? void 0 : l.broadcast) === null || c === void 0) && c.ack) && i("ok"), d.receive("ok", () => i("ok")), d.receive("error", () => i("error")), d.receive("timeout", () => i("timed out"));
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
    return this.rejoinTimer.reset(), this.joinPush.destroy(), new Promise((n) => {
      const s = new Push(this, CHANNEL_EVENTS.leave, {}, e);
      s.receive("ok", () => {
        t(), n("ok");
      }).receive("timeout", () => {
        t(), n("timed out");
      }).receive("error", () => {
        n("error");
      }), s.send(), this._canPush() || s.trigger("ok", {});
    });
  }
  /** @internal */
  async _fetchWithTimeout(e, t, n) {
    const s = new AbortController(), i = setTimeout(() => s.abort(), n), o = await this.socket.fetch(e, Object.assign(Object.assign({}, t), { signal: s.signal }));
    return clearTimeout(i), o;
  }
  /** @internal */
  _push(e, t, n = this.timeout) {
    if (!this.joinedOnce)
      throw `tried to push '${e}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
    let s = new Push(this, e, t, n);
    return this._canPush() ? s.send() : (s.startTimeout(), this.pushBuffer.push(s)), s;
  }
  /**
   * Overridable message hook
   *
   * Receives all events for specialized message handling before dispatching to the channel callbacks.
   * Must return the payload, modified or unmodified.
   *
   * @internal
   */
  _onMessage(e, t, n) {
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
  _trigger(e, t, n) {
    var s, i;
    const o = e.toLocaleLowerCase(), { close: l, error: c, leave: d, join: u } = CHANNEL_EVENTS;
    if (n && [l, c, d, u].indexOf(o) >= 0 && n !== this._joinRef())
      return;
    let h = this._onMessage(o, t, n);
    if (t && !h)
      throw "channel onMessage callbacks must return the payload, modified or unmodified";
    ["insert", "update", "delete"].includes(o) ? (s = this.bindings.postgres_changes) === null || s === void 0 || s.filter((_) => {
      var g, m, v;
      return ((g = _.filter) === null || g === void 0 ? void 0 : g.event) === "*" || ((v = (m = _.filter) === null || m === void 0 ? void 0 : m.event) === null || v === void 0 ? void 0 : v.toLocaleLowerCase()) === o;
    }).map((_) => _.callback(h, n)) : (i = this.bindings[o]) === null || i === void 0 || i.filter((_) => {
      var g, m, v, y, b, w;
      if (["broadcast", "presence", "postgres_changes"].includes(o))
        if ("id" in _) {
          const T = _.id, E = (g = _.filter) === null || g === void 0 ? void 0 : g.event;
          return T && ((m = t.ids) === null || m === void 0 ? void 0 : m.includes(T)) && (E === "*" || (E == null ? void 0 : E.toLocaleLowerCase()) === ((v = t.data) === null || v === void 0 ? void 0 : v.type.toLocaleLowerCase()));
        } else {
          const T = (b = (y = _ == null ? void 0 : _.filter) === null || y === void 0 ? void 0 : y.event) === null || b === void 0 ? void 0 : b.toLocaleLowerCase();
          return T === "*" || T === ((w = t == null ? void 0 : t.event) === null || w === void 0 ? void 0 : w.toLocaleLowerCase());
        }
      else
        return _.type.toLocaleLowerCase() === o;
    }).map((_) => {
      if (typeof h == "object" && "ids" in h) {
        const g = h.data, { schema: m, table: v, commit_timestamp: y, type: b, errors: w } = g;
        h = Object.assign(Object.assign({}, {
          schema: m,
          table: v,
          commit_timestamp: y,
          eventType: b,
          new: {},
          old: {},
          errors: w
        }), this._getPayloadRecords(g));
      }
      _.callback(h, n);
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
  _on(e, t, n) {
    const s = e.toLocaleLowerCase(), i = {
      type: s,
      filter: t,
      callback: n
    };
    return this.bindings[s] ? this.bindings[s].push(i) : this.bindings[s] = [i], this;
  }
  /** @internal */
  _off(e, t) {
    const n = e.toLocaleLowerCase();
    return this.bindings[n] = this.bindings[n].filter((s) => {
      var i;
      return !(((i = s.type) === null || i === void 0 ? void 0 : i.toLocaleLowerCase()) === n && RealtimeChannel.isEqual(s.filter, t));
    }), this;
  }
  /** @internal */
  static isEqual(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length)
      return !1;
    for (const n in e)
      if (e[n] !== t[n])
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
    var n;
    this.accessTokenValue = null, this.apiKey = null, this.channels = [], this.endPoint = "", this.httpEndpoint = "", this.headers = DEFAULT_HEADERS$3, this.params = {}, this.timeout = DEFAULT_TIMEOUT, this.heartbeatIntervalMs = 3e4, this.heartbeatTimer = void 0, this.pendingHeartbeatRef = null, this.ref = 0, this.logger = noop, this.conn = null, this.sendBuffer = [], this.serializer = new Serializer(), this.stateChangeCallbacks = {
      open: [],
      close: [],
      error: [],
      message: []
    }, this.accessToken = null, this._resolveFetch = (i) => {
      let o;
      return i ? o = i : typeof fetch > "u" ? o = (...l) => Promise.resolve().then(() => browser$4).then(({ default: c }) => c(...l)) : o = fetch, (...l) => o(...l);
    }, this.endPoint = `${e}/${TRANSPORTS.websocket}`, this.httpEndpoint = httpEndpointURL(e), t != null && t.transport ? this.transport = t.transport : this.transport = null, t != null && t.params && (this.params = t.params), t != null && t.headers && (this.headers = Object.assign(Object.assign({}, this.headers), t.headers)), t != null && t.timeout && (this.timeout = t.timeout), t != null && t.logger && (this.logger = t.logger), t != null && t.heartbeatIntervalMs && (this.heartbeatIntervalMs = t.heartbeatIntervalMs);
    const s = (n = t == null ? void 0 : t.params) === null || n === void 0 ? void 0 : n.apikey;
    if (s && (this.accessTokenValue = s, this.apiKey = s), this.reconnectAfterMs = t != null && t.reconnectAfterMs ? t.reconnectAfterMs : (i) => [1e3, 2e3, 5e3, 1e4][i - 1] || 1e4, this.encode = t != null && t.encode ? t.encode : (i, o) => o(JSON.stringify(i)), this.decode = t != null && t.decode ? t.decode : this.serializer.decode.bind(this.serializer), this.reconnectTimer = new Timer(async () => {
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
  log(e, t, n) {
    this.logger(e, t, n);
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
    const n = new RealtimeChannel(`realtime:${e}`, t, this);
    return this.channels.push(n), n;
  }
  /**
   * Push out a message if the socket is connected.
   *
   * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
   */
  push(e) {
    const { topic: t, event: n, payload: s, ref: i } = e, o = () => {
      this.encode(e, (l) => {
        var c;
        (c = this.conn) === null || c === void 0 || c.send(l);
      });
    };
    this.log("push", `${t} ${n} (${i})`, s), this.isConnected() ? o() : this.sendBuffer.push(o);
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
      let n = null;
      try {
        n = JSON.parse(atob(t.split(".")[1]));
      } catch {
      }
      if (n && n.exp && !(Math.floor(Date.now() / 1e3) - n.exp < 0))
        return this.log("auth", `InvalidJWTToken: Invalid value for JWT claim "exp" with value ${n.exp}`), Promise.reject(`InvalidJWTToken: Invalid value for JWT claim "exp" with value ${n.exp}`);
      this.accessTokenValue = t, this.channels.forEach((s) => {
        t && s.updateJoinPayload({ access_token: t }), s.joinedOnce && s._isJoined() && s._push(CHANNEL_EVENTS.access_token, {
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
    let t = this.channels.find((n) => n.topic === e && (n._isJoined() || n._isJoining()));
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
      let { topic: n, event: s, payload: i, ref: o } = t;
      o && o === this.pendingHeartbeatRef && (this.pendingHeartbeatRef = null), this.log("receive", `${i.status || ""} ${n} ${s} ${o && "(" + o + ")" || ""}`, i), this.channels.filter((l) => l._isMember(n)).forEach((l) => l._trigger(s, i, o)), this.stateChangeCallbacks.message.forEach((l) => l(t));
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
    const n = e.match(/\?/) ? "&" : "?", s = new URLSearchParams(t);
    return `${e}${n}${s}`;
  }
  _workerObjectUrl(e) {
    let t;
    if (e)
      t = e;
    else {
      const n = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
      t = URL.createObjectURL(n);
    }
    return t;
  }
}
class WSWebSocketDummy {
  constructor(e, t, n) {
    this.binaryType = "arraybuffer", this.onclose = () => {
    }, this.onerror = () => {
    }, this.onmessage = () => {
    }, this.onopen = () => {
    }, this.readyState = SOCKET_STATES.connecting, this.send = () => {
    }, this.url = null, this.url = e, this.close = n.close;
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
var __awaiter$6 = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
  });
};
const resolveFetch$2 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$4).then(({ default: n }) => n(...t)) : e = fetch, (...t) => e(...t);
}, resolveResponse = () => __awaiter$6(void 0, void 0, void 0, function* () {
  return typeof Response > "u" ? (yield Promise.resolve().then(() => browser$4)).Response : Response;
}), recursiveToCamel = (r) => {
  if (Array.isArray(r))
    return r.map((t) => recursiveToCamel(t));
  if (typeof r == "function" || r !== Object(r))
    return r;
  const e = {};
  return Object.entries(r).forEach(([t, n]) => {
    const s = t.replace(/([-_][a-z])/gi, (i) => i.toUpperCase().replace(/[-_]/g, ""));
    e[s] = recursiveToCamel(n);
  }), e;
};
var __awaiter$5 = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
  });
};
const _getErrorMessage$1 = (r) => r.msg || r.message || r.error_description || r.error || JSON.stringify(r), handleError$1 = (r, e, t) => __awaiter$5(void 0, void 0, void 0, function* () {
  const n = yield resolveResponse();
  r instanceof n && !(t != null && t.noResolveJson) ? r.json().then((s) => {
    e(new StorageApiError(_getErrorMessage$1(s), r.status || 500));
  }).catch((s) => {
    e(new StorageUnknownError(_getErrorMessage$1(s), s));
  }) : e(new StorageUnknownError(_getErrorMessage$1(r), r));
}), _getRequestParams$1 = (r, e, t, n) => {
  const s = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return r === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json" }, e == null ? void 0 : e.headers), n && (s.body = JSON.stringify(n)), Object.assign(Object.assign({}, s), t));
};
function _handleRequest$1(r, e, t, n, s, i) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return new Promise((o, l) => {
      r(t, _getRequestParams$1(e, n, s, i)).then((c) => {
        if (!c.ok)
          throw c;
        return n != null && n.noResolveJson ? c : c.json();
      }).then((c) => o(c)).catch((c) => handleError$1(c, l, n));
    });
  });
}
function get(r, e, t, n) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "GET", e, t, n);
  });
}
function post(r, e, t, n, s) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "POST", e, n, s, t);
  });
}
function put(r, e, t, n, s) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "PUT", e, n, s, t);
  });
}
function head(r, e, t, n) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "HEAD", e, Object.assign(Object.assign({}, t), { noResolveJson: !0 }), n);
  });
}
function remove(r, e, t, n, s) {
  return __awaiter$5(this, void 0, void 0, function* () {
    return _handleRequest$1(r, "DELETE", e, n, s, t);
  });
}
var __awaiter$4 = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
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
  constructor(e, t = {}, n, s) {
    this.url = e, this.headers = t, this.bucketId = n, this.fetch = resolveFetch$2(s);
  }
  /**
   * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
   *
   * @param method HTTP method.
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadOrUpdate(e, t, n, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        let i;
        const o = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), s);
        let l = Object.assign(Object.assign({}, this.headers), e === "POST" && { "x-upsert": String(o.upsert) });
        const c = o.metadata;
        typeof Blob < "u" && n instanceof Blob ? (i = new FormData(), i.append("cacheControl", o.cacheControl), c && i.append("metadata", this.encodeMetadata(c)), i.append("", n)) : typeof FormData < "u" && n instanceof FormData ? (i = n, i.append("cacheControl", o.cacheControl), c && i.append("metadata", this.encodeMetadata(c))) : (i = n, l["cache-control"] = `max-age=${o.cacheControl}`, l["content-type"] = o.contentType, c && (l["x-metadata"] = this.toBase64(this.encodeMetadata(c)))), s != null && s.headers && (l = Object.assign(Object.assign({}, l), s.headers));
        const d = this._removeEmptyFolders(t), u = this._getFinalPath(d), f = yield this.fetch(`${this.url}/object/${u}`, Object.assign({ method: e, body: i, headers: l }, o != null && o.duplex ? { duplex: o.duplex } : {})), h = yield f.json();
        return f.ok ? {
          data: { path: d, id: h.Id, fullPath: h.Key },
          error: null
        } : { data: null, error: h };
      } catch (i) {
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
  upload(e, t, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("POST", e, t, n);
    });
  }
  /**
   * Upload a file with a token generated from `createSignedUploadUrl`.
   * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
   * @param token The token generated from `createSignedUploadUrl`
   * @param fileBody The body of the file to be stored in the bucket.
   */
  uploadToSignedUrl(e, t, n, s) {
    return __awaiter$4(this, void 0, void 0, function* () {
      const i = this._removeEmptyFolders(e), o = this._getFinalPath(i), l = new URL(this.url + `/object/upload/sign/${o}`);
      l.searchParams.set("token", t);
      try {
        let c;
        const d = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, s), u = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(d.upsert) });
        typeof Blob < "u" && n instanceof Blob ? (c = new FormData(), c.append("cacheControl", d.cacheControl), c.append("", n)) : typeof FormData < "u" && n instanceof FormData ? (c = n, c.append("cacheControl", d.cacheControl)) : (c = n, u["cache-control"] = `max-age=${d.cacheControl}`, u["content-type"] = d.contentType);
        const f = yield this.fetch(l.toString(), {
          method: "PUT",
          body: c,
          headers: u
        }), h = yield f.json();
        return f.ok ? {
          data: { path: i, fullPath: h.Key },
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
        let n = this._getFinalPath(e);
        const s = Object.assign({}, this.headers);
        t != null && t.upsert && (s["x-upsert"] = "true");
        const i = yield post(this.fetch, `${this.url}/object/upload/sign/${n}`, {}, { headers: s }), o = new URL(this.url + i.url), l = o.searchParams.get("token");
        if (!l)
          throw new StorageError("No token returned by API");
        return { data: { signedUrl: o.toString(), path: e, token: l }, error: null };
      } catch (n) {
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
      }
    });
  }
  /**
   * Replaces an existing file at the specified path with a new one.
   *
   * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
   * @param fileBody The body of the file to be stored in the bucket.
   */
  update(e, t, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      return this.uploadOrUpdate("PUT", e, t, n);
    });
  }
  /**
   * Moves an existing file to a new path in the same bucket.
   *
   * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
   * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
   * @param options The destination options.
   */
  move(e, t, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        return { data: yield post(this.fetch, `${this.url}/object/move`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: n == null ? void 0 : n.destinationBucket
        }, { headers: this.headers }), error: null };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
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
  copy(e, t, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        return { data: { path: (yield post(this.fetch, `${this.url}/object/copy`, {
          bucketId: this.bucketId,
          sourceKey: e,
          destinationKey: t,
          destinationBucket: n == null ? void 0 : n.destinationBucket
        }, { headers: this.headers })).Key }, error: null };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
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
  createSignedUrl(e, t, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        let s = this._getFinalPath(e), i = yield post(this.fetch, `${this.url}/object/sign/${s}`, Object.assign({ expiresIn: t }, n != null && n.transform ? { transform: n.transform } : {}), { headers: this.headers });
        const o = n != null && n.download ? `&download=${n.download === !0 ? "" : n.download}` : "";
        return i = { signedUrl: encodeURI(`${this.url}${i.signedURL}${o}`) }, { data: i, error: null };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
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
  createSignedUrls(e, t, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const s = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn: t, paths: e }, { headers: this.headers }), i = n != null && n.download ? `&download=${n.download === !0 ? "" : n.download}` : "";
        return {
          data: s.map((o) => Object.assign(Object.assign({}, o), { signedUrl: o.signedURL ? encodeURI(`${this.url}${o.signedURL}${i}`) : null })),
          error: null
        };
      } catch (s) {
        if (isStorageError(s))
          return { data: null, error: s };
        throw s;
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
      const s = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image/authenticated" : "object", i = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {}), o = i ? `?${i}` : "";
      try {
        const l = this._getFinalPath(e);
        return { data: yield (yield get(this.fetch, `${this.url}/${s}/${l}${o}`, {
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
        const n = yield get(this.fetch, `${this.url}/object/info/${t}`, {
          headers: this.headers
        });
        return { data: recursiveToCamel(n), error: null };
      } catch (n) {
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
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
      } catch (n) {
        if (isStorageError(n) && n instanceof StorageUnknownError) {
          const s = n.originalError;
          if ([400, 404].includes(s == null ? void 0 : s.status))
            return { data: !1, error: n };
        }
        throw n;
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
    const n = this._getFinalPath(e), s = [], i = t != null && t.download ? `download=${t.download === !0 ? "" : t.download}` : "";
    i !== "" && s.push(i);
    const l = typeof (t == null ? void 0 : t.transform) < "u" ? "render/image" : "object", c = this.transformOptsToQueryString((t == null ? void 0 : t.transform) || {});
    c !== "" && s.push(c);
    let d = s.join("&");
    return d !== "" && (d = `?${d}`), {
      data: { publicUrl: encodeURI(`${this.url}/${l}/public/${n}${d}`) }
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
  list(e, t, n) {
    return __awaiter$4(this, void 0, void 0, function* () {
      try {
        const s = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), t), { prefix: e || "" });
        return { data: yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, s, { headers: this.headers }, n), error: null };
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
var __awaiter$3 = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
  });
};
class StorageBucketApi {
  constructor(e, t = {}, n) {
    this.url = e, this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS$2), t), this.fetch = resolveFetch$2(n);
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
      } catch (n) {
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
    return __awaiter$3(this, void 0, void 0, function* () {
      try {
        return { data: yield put(this.fetch, `${this.url}/bucket/${e}`, {
          id: e,
          name: e,
          public: t.public,
          file_size_limit: t.fileSizeLimit,
          allowed_mime_types: t.allowedMimeTypes
        }, { headers: this.headers }), error: null };
      } catch (n) {
        if (isStorageError(n))
          return { data: null, error: n };
        throw n;
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
  constructor(e, t = {}, n) {
    super(e, t, n);
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
const version$1 = "2.48.1";
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
var __awaiter$2 = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
  });
};
const resolveFetch$1 = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = nodeFetch : e = fetch, (...t) => e(...t);
}, resolveHeadersConstructor = () => typeof Headers > "u" ? Headers$1 : Headers, fetchWithAuth = (r, e, t) => {
  const n = resolveFetch$1(t), s = resolveHeadersConstructor();
  return (i, o) => __awaiter$2(void 0, void 0, void 0, function* () {
    var l;
    const c = (l = yield e()) !== null && l !== void 0 ? l : r;
    let d = new s(o == null ? void 0 : o.headers);
    return d.has("apikey") || d.set("apikey", r), d.has("Authorization") || d.set("Authorization", `Bearer ${c}`), n(i, Object.assign(Object.assign({}, o), { headers: d }));
  });
};
var __awaiter$1 = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
  });
};
function stripTrailingSlash(r) {
  return r.replace(/\/$/, "");
}
function applySettingDefaults(r, e) {
  const { db: t, auth: n, realtime: s, global: i } = r, { db: o, auth: l, realtime: c, global: d } = e, u = {
    db: Object.assign(Object.assign({}, o), t),
    auth: Object.assign(Object.assign({}, l), n),
    realtime: Object.assign(Object.assign({}, c), s),
    global: Object.assign(Object.assign({}, d), i),
    accessToken: () => __awaiter$1(this, void 0, void 0, function* () {
      return "";
    })
  };
  return r.accessToken ? u.accessToken = r.accessToken : delete u.accessToken, u;
}
const version = "2.67.3", GOTRUE_URL = "http://localhost:9999", STORAGE_KEY = "supabase.auth.token", DEFAULT_HEADERS = { "X-Client-Info": `gotrue-js/${version}` }, EXPIRY_MARGIN = 10, API_VERSION_HEADER_NAME = "X-Supabase-Api-Version", API_VERSIONS = {
  "2024-01-01": {
    timestamp: Date.parse("2024-01-01T00:00:00.0Z"),
    name: "2024-01-01"
  }
};
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
      new URLSearchParams(t.hash.substring(1)).forEach((s, i) => {
        e[i] = s;
      });
    } catch {
    }
  return t.searchParams.forEach((n, s) => {
    e[s] = n;
  }), e;
}
const resolveFetch = (r) => {
  let e;
  return r ? e = r : typeof fetch > "u" ? e = (...t) => Promise.resolve().then(() => browser$4).then(({ default: n }) => n(...t)) : e = fetch, (...t) => e(...t);
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
function decodeBase64URL(r) {
  const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let t = "", n, s, i, o, l, c, d, u = 0;
  for (r = r.replace("-", "+").replace("_", "/"); u < r.length; )
    o = e.indexOf(r.charAt(u++)), l = e.indexOf(r.charAt(u++)), c = e.indexOf(r.charAt(u++)), d = e.indexOf(r.charAt(u++)), n = o << 2 | l >> 4, s = (l & 15) << 4 | c >> 2, i = (c & 3) << 6 | d, t = t + String.fromCharCode(n), c != 64 && s != 0 && (t = t + String.fromCharCode(s)), d != 64 && i != 0 && (t = t + String.fromCharCode(i));
  return t;
}
class Deferred {
  constructor() {
    this.promise = new Deferred.promiseConstructor((e, t) => {
      this.resolve = e, this.reject = t;
    });
  }
}
Deferred.promiseConstructor = Promise;
function decodeJWTPayload(r) {
  const e = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i, t = r.split(".");
  if (t.length !== 3)
    throw new Error("JWT is not valid: not a JWT structure");
  if (!e.test(t[1]))
    throw new Error("JWT is not valid: payload is not in base64url format");
  const n = t[1];
  return JSON.parse(decodeBase64URL(n));
}
async function sleep$1(r) {
  return await new Promise((e) => {
    setTimeout(() => e(null), r);
  });
}
function retryable(r, e) {
  return new Promise((n, s) => {
    (async () => {
      for (let i = 0; i < 1 / 0; i++)
        try {
          const o = await r(i);
          if (!e(i, null, o)) {
            n(o);
            return;
          }
        } catch (o) {
          if (!e(i, o)) {
            s(o);
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
    const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~", n = t.length;
    let s = "";
    for (let i = 0; i < 56; i++)
      s += t.charAt(Math.floor(Math.random() * n));
    return s;
  }
  return crypto.getRandomValues(e), Array.from(e, dec2hex).join("");
}
async function sha256(r) {
  const t = new TextEncoder().encode(r), n = await crypto.subtle.digest("SHA-256", t), s = new Uint8Array(n);
  return Array.from(s).map((i) => String.fromCharCode(i)).join("");
}
function base64urlencode(r) {
  return btoa(r).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function generatePKCEChallenge(r) {
  if (!(typeof crypto < "u" && typeof crypto.subtle < "u" && typeof TextEncoder < "u"))
    return console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256."), r;
  const t = await sha256(r);
  return base64urlencode(t);
}
async function getCodeChallengeAndMethod(r, e, t = !1) {
  const n = generatePKCEVerifier();
  let s = n;
  t && (s += "/PASSWORD_RECOVERY"), await setItemAsync(r, `${e}-code-verifier`, s);
  const i = await generatePKCEChallenge(n);
  return [i, n === i ? "plain" : "s256"];
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
class AuthError extends Error {
  constructor(e, t, n) {
    super(e), this.__isAuthError = !0, this.name = "AuthError", this.status = t, this.code = n;
  }
}
function isAuthError(r) {
  return typeof r == "object" && r !== null && "__isAuthError" in r;
}
class AuthApiError extends AuthError {
  constructor(e, t, n) {
    super(e, t, n), this.name = "AuthApiError", this.status = t, this.code = n;
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
  constructor(e, t, n, s) {
    super(e, n, s), this.name = t, this.status = n;
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
  constructor(e, t, n) {
    super(e, "AuthWeakPasswordError", t, "weak_password"), this.reasons = n;
  }
}
var __rest$1 = function(r, e) {
  var t = {};
  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, n = Object.getOwnPropertySymbols(r); s < n.length; s++)
      e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[s]) && (t[n[s]] = r[n[s]]);
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
  } catch (i) {
    throw new AuthUnknownError(_getErrorMessage(i), i);
  }
  let n;
  const s = parseResponseAPIVersion(r);
  if (s && s.getTime() >= API_VERSIONS["2024-01-01"].timestamp && typeof t == "object" && t && typeof t.code == "string" ? n = t.code : typeof t == "object" && t && typeof t.error_code == "string" && (n = t.error_code), n) {
    if (n === "weak_password")
      throw new AuthWeakPasswordError(_getErrorMessage(t), r.status, ((e = t.weak_password) === null || e === void 0 ? void 0 : e.reasons) || []);
    if (n === "session_not_found")
      throw new AuthSessionMissingError();
  } else if (typeof t == "object" && t && typeof t.weak_password == "object" && t.weak_password && Array.isArray(t.weak_password.reasons) && t.weak_password.reasons.length && t.weak_password.reasons.reduce((i, o) => i && typeof o == "string", !0))
    throw new AuthWeakPasswordError(_getErrorMessage(t), r.status, t.weak_password.reasons);
  throw new AuthApiError(_getErrorMessage(t), r.status || 500, n);
}
const _getRequestParams = (r, e, t, n) => {
  const s = { method: r, headers: (e == null ? void 0 : e.headers) || {} };
  return r === "GET" ? s : (s.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, e == null ? void 0 : e.headers), s.body = JSON.stringify(n), Object.assign(Object.assign({}, s), t));
};
async function _request(r, e, t, n) {
  var s;
  const i = Object.assign({}, n == null ? void 0 : n.headers);
  i[API_VERSION_HEADER_NAME] || (i[API_VERSION_HEADER_NAME] = API_VERSIONS["2024-01-01"].name), n != null && n.jwt && (i.Authorization = `Bearer ${n.jwt}`);
  const o = (s = n == null ? void 0 : n.query) !== null && s !== void 0 ? s : {};
  n != null && n.redirectTo && (o.redirect_to = n.redirectTo);
  const l = Object.keys(o).length ? "?" + new URLSearchParams(o).toString() : "", c = await _handleRequest(r, e, t + l, {
    headers: i,
    noResolveJson: n == null ? void 0 : n.noResolveJson
  }, {}, n == null ? void 0 : n.body);
  return n != null && n.xform ? n == null ? void 0 : n.xform(c) : { data: Object.assign({}, c), error: null };
}
async function _handleRequest(r, e, t, n, s, i) {
  const o = _getRequestParams(e, n, s, i);
  let l;
  try {
    l = await r(t, Object.assign({}, o));
  } catch (c) {
    throw console.error(c), new AuthRetryableFetchError(_getErrorMessage(c), 0);
  }
  if (l.ok || await handleError(l), n != null && n.noResolveJson)
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
  const n = (e = r.user) !== null && e !== void 0 ? e : r;
  return { data: { session: t, user: n }, error: null };
}
function _sessionResponsePassword(r) {
  const e = _sessionResponse(r);
  return !e.error && r.weak_password && typeof r.weak_password == "object" && Array.isArray(r.weak_password.reasons) && r.weak_password.reasons.length && r.weak_password.message && typeof r.weak_password.message == "string" && r.weak_password.reasons.reduce((t, n) => t && typeof n == "string", !0) && (e.data.weak_password = r.weak_password), e;
}
function _userResponse(r) {
  var e;
  return { data: { user: (e = r.user) !== null && e !== void 0 ? e : r }, error: null };
}
function _ssoResponse(r) {
  return { data: r, error: null };
}
function _generateLinkResponse(r) {
  const { action_link: e, email_otp: t, hashed_token: n, redirect_to: s, verification_type: i } = r, o = __rest$1(r, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]), l = {
    action_link: e,
    email_otp: t,
    hashed_token: n,
    redirect_to: s,
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
var __rest = function(r, e) {
  var t = {};
  for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && e.indexOf(n) < 0 && (t[n] = r[n]);
  if (r != null && typeof Object.getOwnPropertySymbols == "function")
    for (var s = 0, n = Object.getOwnPropertySymbols(r); s < n.length; s++)
      e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(r, n[s]) && (t[n[s]] = r[n[s]]);
  return t;
};
class GoTrueAdminApi {
  constructor({ url: e = "", headers: t = {}, fetch: n }) {
    this.url = e, this.headers = t, this.fetch = resolveFetch(n), this.mfa = {
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
    } catch (n) {
      if (isAuthError(n))
        return { data: null, error: n };
      throw n;
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
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null }, error: n };
      throw n;
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
      const { options: t } = e, n = __rest(e, ["options"]), s = Object.assign(Object.assign({}, n), t);
      return "newEmail" in n && (s.new_email = n == null ? void 0 : n.newEmail, delete s.newEmail), await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
        body: s,
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
    var t, n, s, i, o, l, c;
    try {
      const d = { nextPage: null, lastPage: 0, total: 0 }, u = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
        headers: this.headers,
        noResolveJson: !0,
        query: {
          page: (n = (t = e == null ? void 0 : e.page) === null || t === void 0 ? void 0 : t.toString()) !== null && n !== void 0 ? n : "",
          per_page: (i = (s = e == null ? void 0 : e.perPage) === null || s === void 0 ? void 0 : s.toString()) !== null && i !== void 0 ? i : ""
        },
        xform: _noResolveJsonResponse
      });
      if (u.error)
        throw u.error;
      const f = await u.json(), h = (o = u.headers.get("x-total-count")) !== null && o !== void 0 ? o : 0, _ = (c = (l = u.headers.get("link")) === null || l === void 0 ? void 0 : l.split(",")) !== null && c !== void 0 ? c : [];
      return _.length > 0 && (_.forEach((g) => {
        const m = parseInt(g.split(";")[0].split("=")[1].substring(0, 1)), v = JSON.parse(g.split(";")[1].split("=")[1]);
        d[`${v}Page`] = m;
      }), d.total = parseInt(h)), { data: Object.assign(Object.assign({}, f), d), error: null };
    } catch (d) {
      if (isAuthError(d))
        return { data: { users: [] }, error: d };
      throw d;
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
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null }, error: n };
      throw n;
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
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null }, error: n };
      throw n;
    }
  }
  async _listFactors(e) {
    try {
      const { data: t, error: n } = await _request(this.fetch, "GET", `${this.url}/admin/users/${e.userId}/factors`, {
        headers: this.headers,
        xform: (s) => ({ data: { factors: s }, error: null })
      });
      return { data: t, error: n };
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
  const n = new globalThis.AbortController();
  return e > 0 && setTimeout(() => {
    n.abort(), internals.debug && console.log("@supabase/gotrue-js: navigatorLock acquire timed out", r);
  }, e), await Promise.resolve().then(() => globalThis.navigator.locks.request(r, e === 0 ? {
    mode: "exclusive",
    ifAvailable: !0
  } : {
    mode: "exclusive",
    signal: n.signal
  }, async (s) => {
    if (s) {
      internals.debug && console.log("@supabase/gotrue-js: navigatorLock: acquired", r, s.name);
      try {
        return await t();
      } finally {
        internals.debug && console.log("@supabase/gotrue-js: navigatorLock: released", r, s.name);
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
}, AUTO_REFRESH_TICK_DURATION = 30 * 1e3, AUTO_REFRESH_TICK_THRESHOLD = 3;
async function lockNoOp(r, e, t) {
  return await t();
}
class GoTrueClient {
  /**
   * Create a new client for use in the browser.
   */
  constructor(e) {
    var t, n;
    this.memoryStorage = null, this.stateChangeEmitters = /* @__PURE__ */ new Map(), this.autoRefreshTicker = null, this.visibilityChangedCallback = null, this.refreshingDeferred = null, this.initializePromise = null, this.detectSessionInUrl = !0, this.hasCustomAuthorizationHeader = !1, this.suppressGetSessionWarning = !1, this.lockAcquired = !1, this.pendingInLock = [], this.broadcastChannel = null, this.logger = console.log, this.instanceID = GoTrueClient.nextInstanceID, GoTrueClient.nextInstanceID += 1, this.instanceID > 0 && isBrowser() && console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
    const s = Object.assign(Object.assign({}, DEFAULT_OPTIONS), e);
    if (this.logDebugMessages = !!s.debug, typeof s.debug == "function" && (this.logger = s.debug), this.persistSession = s.persistSession, this.storageKey = s.storageKey, this.autoRefreshToken = s.autoRefreshToken, this.admin = new GoTrueAdminApi({
      url: s.url,
      headers: s.headers,
      fetch: s.fetch
    }), this.url = s.url, this.headers = s.headers, this.fetch = resolveFetch(s.fetch), this.lock = s.lock || lockNoOp, this.detectSessionInUrl = s.detectSessionInUrl, this.flowType = s.flowType, this.hasCustomAuthorizationHeader = s.hasCustomAuthorizationHeader, s.lock ? this.lock = s.lock : isBrowser() && (!((t = globalThis == null ? void 0 : globalThis.navigator) === null || t === void 0) && t.locks) ? this.lock = navigatorLock : this.lock = lockNoOp, this.mfa = {
      verify: this._verify.bind(this),
      enroll: this._enroll.bind(this),
      unenroll: this._unenroll.bind(this),
      challenge: this._challenge.bind(this),
      listFactors: this._listFactors.bind(this),
      challengeAndVerify: this._challengeAndVerify.bind(this),
      getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
    }, this.persistSession ? s.storage ? this.storage = s.storage : supportsLocalStorage() ? this.storage = localStorageAdapter : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)) : (this.memoryStorage = {}, this.storage = memoryLocalStorageAdapter(this.memoryStorage)), isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
      try {
        this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
      } catch (i) {
        console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", i);
      }
      (n = this.broadcastChannel) === null || n === void 0 || n.addEventListener("message", async (i) => {
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
      let n = "none";
      if (this._isImplicitGrantCallback(t) ? n = "implicit" : await this._isPKCECallback(t) && (n = "pkce"), isBrowser() && this.detectSessionInUrl && n !== "none") {
        const { data: s, error: i } = await this._getSessionFromURL(t, n);
        if (i) {
          if (this._debug("#_initialize()", "error detecting session from URL", i), isAuthImplicitGrantRedirectError(i)) {
            const c = (e = i.details) === null || e === void 0 ? void 0 : e.code;
            if (c === "identity_already_exists" || c === "identity_not_found" || c === "single_identity_not_deletable")
              return { error: i };
          }
          return await this._removeSession(), { error: i };
        }
        const { session: o, redirectType: l } = s;
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
    var t, n, s;
    try {
      const i = await _request(this.fetch, "POST", `${this.url}/signup`, {
        headers: this.headers,
        body: {
          data: (n = (t = e == null ? void 0 : e.options) === null || t === void 0 ? void 0 : t.data) !== null && n !== void 0 ? n : {},
          gotrue_meta_security: { captcha_token: (s = e == null ? void 0 : e.options) === null || s === void 0 ? void 0 : s.captchaToken }
        },
        xform: _sessionResponse
      }), { data: o, error: l } = i;
      if (l || !o)
        return { data: { user: null, session: null }, error: l };
      const c = o.session, d = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: d, session: c }, error: null };
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
    var t, n, s;
    try {
      let i;
      if ("email" in e) {
        const { email: u, password: f, options: h } = e;
        let _ = null, g = null;
        this.flowType === "pkce" && ([_, g] = await getCodeChallengeAndMethod(this.storage, this.storageKey)), i = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          redirectTo: h == null ? void 0 : h.emailRedirectTo,
          body: {
            email: u,
            password: f,
            data: (t = h == null ? void 0 : h.data) !== null && t !== void 0 ? t : {},
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken },
            code_challenge: _,
            code_challenge_method: g
          },
          xform: _sessionResponse
        });
      } else if ("phone" in e) {
        const { phone: u, password: f, options: h } = e;
        i = await _request(this.fetch, "POST", `${this.url}/signup`, {
          headers: this.headers,
          body: {
            phone: u,
            password: f,
            data: (n = h == null ? void 0 : h.data) !== null && n !== void 0 ? n : {},
            channel: (s = h == null ? void 0 : h.channel) !== null && s !== void 0 ? s : "sms",
            gotrue_meta_security: { captcha_token: h == null ? void 0 : h.captchaToken }
          },
          xform: _sessionResponse
        });
      } else
        throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
      const { data: o, error: l } = i;
      if (l || !o)
        return { data: { user: null, session: null }, error: l };
      const c = o.session, d = o.user;
      return o.session && (await this._saveSession(o.session), await this._notifyAllSubscribers("SIGNED_IN", c)), { data: { user: d, session: c }, error: null };
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
      const { data: n, error: s } = t;
      return s ? { data: { user: null, session: null }, error: s } : !n || !n.session || !n.user ? { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() } : (n.session && (await this._saveSession(n.session), await this._notifyAllSubscribers("SIGNED_IN", n.session)), {
        data: Object.assign({ user: n.user, session: n.session }, n.weak_password ? { weakPassword: n.weak_password } : null),
        error: s
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
    var t, n, s, i;
    return await this._handleProviderSignIn(e.provider, {
      redirectTo: (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo,
      scopes: (n = e.options) === null || n === void 0 ? void 0 : n.scopes,
      queryParams: (s = e.options) === null || s === void 0 ? void 0 : s.queryParams,
      skipBrowserRedirect: (i = e.options) === null || i === void 0 ? void 0 : i.skipBrowserRedirect
    });
  }
  /**
   * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
   */
  async exchangeCodeForSession(e) {
    return await this.initializePromise, this._acquireLock(-1, async () => this._exchangeCodeForSession(e));
  }
  async _exchangeCodeForSession(e) {
    const t = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`), [n, s] = (t ?? "").split("/");
    try {
      const { data: i, error: o } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
        headers: this.headers,
        body: {
          auth_code: e,
          code_verifier: n
        },
        xform: _sessionResponse
      });
      if (await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`), o)
        throw o;
      return !i || !i.session || !i.user ? {
        data: { user: null, session: null, redirectType: null },
        error: new AuthInvalidTokenResponseError()
      } : (i.session && (await this._saveSession(i.session), await this._notifyAllSubscribers("SIGNED_IN", i.session)), { data: Object.assign(Object.assign({}, i), { redirectType: s ?? null }), error: o });
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
      const { options: t, provider: n, token: s, access_token: i, nonce: o } = e, l = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
        headers: this.headers,
        body: {
          provider: n,
          id_token: s,
          access_token: i,
          nonce: o,
          gotrue_meta_security: { captcha_token: t == null ? void 0 : t.captchaToken }
        },
        xform: _sessionResponse
      }), { data: c, error: d } = l;
      return d ? { data: { user: null, session: null }, error: d } : !c || !c.session || !c.user ? {
        data: { user: null, session: null },
        error: new AuthInvalidTokenResponseError()
      } : (c.session && (await this._saveSession(c.session), await this._notifyAllSubscribers("SIGNED_IN", c.session)), { data: c, error: d });
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
    var t, n, s, i, o;
    try {
      if ("email" in e) {
        const { email: l, options: c } = e;
        let d = null, u = null;
        this.flowType === "pkce" && ([d, u] = await getCodeChallengeAndMethod(this.storage, this.storageKey));
        const { error: f } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            email: l,
            data: (t = c == null ? void 0 : c.data) !== null && t !== void 0 ? t : {},
            create_user: (n = c == null ? void 0 : c.shouldCreateUser) !== null && n !== void 0 ? n : !0,
            gotrue_meta_security: { captcha_token: c == null ? void 0 : c.captchaToken },
            code_challenge: d,
            code_challenge_method: u
          },
          redirectTo: c == null ? void 0 : c.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: f };
      }
      if ("phone" in e) {
        const { phone: l, options: c } = e, { data: d, error: u } = await _request(this.fetch, "POST", `${this.url}/otp`, {
          headers: this.headers,
          body: {
            phone: l,
            data: (s = c == null ? void 0 : c.data) !== null && s !== void 0 ? s : {},
            create_user: (i = c == null ? void 0 : c.shouldCreateUser) !== null && i !== void 0 ? i : !0,
            gotrue_meta_security: { captcha_token: c == null ? void 0 : c.captchaToken },
            channel: (o = c == null ? void 0 : c.channel) !== null && o !== void 0 ? o : "sms"
          }
        });
        return { data: { user: null, session: null, messageId: d == null ? void 0 : d.message_id }, error: u };
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
    var t, n;
    try {
      let s, i;
      "options" in e && (s = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo, i = (n = e.options) === null || n === void 0 ? void 0 : n.captchaToken);
      const { data: o, error: l } = await _request(this.fetch, "POST", `${this.url}/verify`, {
        headers: this.headers,
        body: Object.assign(Object.assign({}, e), { gotrue_meta_security: { captcha_token: i } }),
        redirectTo: s,
        xform: _sessionResponse
      });
      if (l)
        throw l;
      if (!o)
        throw new Error("An error occurred on token verification.");
      const c = o.session, d = o.user;
      return c != null && c.access_token && (await this._saveSession(c), await this._notifyAllSubscribers(e.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", c)), { data: { user: d, session: c }, error: null };
    } catch (s) {
      if (isAuthError(s))
        return { data: { user: null, session: null }, error: s };
      throw s;
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
    var t, n, s;
    try {
      let i = null, o = null;
      return this.flowType === "pkce" && ([i, o] = await getCodeChallengeAndMethod(this.storage, this.storageKey)), await _request(this.fetch, "POST", `${this.url}/sso`, {
        body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in e ? { provider_id: e.providerId } : null), "domain" in e ? { domain: e.domain } : null), { redirect_to: (n = (t = e.options) === null || t === void 0 ? void 0 : t.redirectTo) !== null && n !== void 0 ? n : void 0 }), !((s = e == null ? void 0 : e.options) === null || s === void 0) && s.captchaToken ? { gotrue_meta_security: { captcha_token: e.options.captchaToken } } : null), { skip_http_redirect: !0, code_challenge: i, code_challenge_method: o }),
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
        const { data: { session: t }, error: n } = e;
        if (n)
          throw n;
        if (!t)
          throw new AuthSessionMissingError();
        const { error: s } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
          headers: this.headers,
          jwt: t.access_token
        });
        return { data: { user: null, session: null }, error: s };
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
        const { email: n, type: s, options: i } = e, { error: o } = await _request(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            email: n,
            type: s,
            gotrue_meta_security: { captcha_token: i == null ? void 0 : i.captchaToken }
          },
          redirectTo: i == null ? void 0 : i.emailRedirectTo
        });
        return { data: { user: null, session: null }, error: o };
      } else if ("phone" in e) {
        const { phone: n, type: s, options: i } = e, { data: o, error: l } = await _request(this.fetch, "POST", t, {
          headers: this.headers,
          body: {
            phone: n,
            type: s,
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
        const n = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve(), s = (async () => (await n, await t()))();
        return this.pendingInLock.push((async () => {
          try {
            await s;
          } catch {
          }
        })()), s;
      }
      return await this.lock(`lock:${this.storageKey}`, e, async () => {
        this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
        try {
          this.lockAcquired = !0;
          const n = t();
          for (this.pendingInLock.push((async () => {
            try {
              await n;
            } catch {
            }
          })()), await n; this.pendingInLock.length; ) {
            const s = [...this.pendingInLock];
            await Promise.all(s), this.pendingInLock.splice(0, s.length);
          }
          return await n;
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
      const n = e.expires_at ? e.expires_at <= Date.now() / 1e3 : !1;
      if (this._debug("#__loadSession()", `session has${n ? "" : " not"} expired`, "expires_at", e.expires_at), !n) {
        if (this.storage.isServer) {
          let o = this.suppressGetSessionWarning;
          e = new Proxy(e, {
            get: (c, d, u) => (!o && d === "user" && (console.warn("Using the user object as returned from supabase.auth.getSession() or from some supabase.auth.onAuthStateChange() events could be insecure! This value comes directly from the storage medium (usually cookies on the server) and may not be authentic. Use supabase.auth.getUser() instead which authenticates the data by contacting the Supabase Auth server."), o = !0, this.suppressGetSessionWarning = !0), Reflect.get(c, d, u))
          });
        }
        return { data: { session: e }, error: null };
      }
      const { session: s, error: i } = await this._callRefreshToken(e.refresh_token);
      return i ? { data: { session: null }, error: i } : { data: { session: s }, error: null };
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
        var n, s, i;
        const { data: o, error: l } = t;
        if (l)
          throw l;
        return !(!((n = o.session) === null || n === void 0) && n.access_token) && !this.hasCustomAuthorizationHeader ? { data: { user: null }, error: new AuthSessionMissingError() } : await _request(this.fetch, "GET", `${this.url}/user`, {
          headers: this.headers,
          jwt: (i = (s = o.session) === null || s === void 0 ? void 0 : s.access_token) !== null && i !== void 0 ? i : void 0,
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
      return await this._useSession(async (n) => {
        const { data: s, error: i } = n;
        if (i)
          throw i;
        if (!s.session)
          throw new AuthSessionMissingError();
        const o = s.session;
        let l = null, c = null;
        this.flowType === "pkce" && e.email != null && ([l, c] = await getCodeChallengeAndMethod(this.storage, this.storageKey));
        const { data: d, error: u } = await _request(this.fetch, "PUT", `${this.url}/user`, {
          headers: this.headers,
          redirectTo: t == null ? void 0 : t.emailRedirectTo,
          body: Object.assign(Object.assign({}, e), { code_challenge: l, code_challenge_method: c }),
          jwt: o.access_token,
          xform: _userResponse
        });
        if (u)
          throw u;
        return o.user = d.user, await this._saveSession(o), await this._notifyAllSubscribers("USER_UPDATED", o), { data: { user: o.user }, error: null };
      });
    } catch (n) {
      if (isAuthError(n))
        return { data: { user: null }, error: n };
      throw n;
    }
  }
  /**
   * Decodes a JWT (without performing any validation).
   */
  _decodeJWT(e) {
    return decodeJWTPayload(e);
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
      let n = t, s = !0, i = null;
      const o = decodeJWTPayload(e.access_token);
      if (o.exp && (n = o.exp, s = n <= t), s) {
        const { session: l, error: c } = await this._callRefreshToken(e.refresh_token);
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
          expires_in: n - t,
          expires_at: n
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
        var n;
        if (!e) {
          const { data: o, error: l } = t;
          if (l)
            throw l;
          e = (n = o.session) !== null && n !== void 0 ? n : void 0;
        }
        if (!(e != null && e.refresh_token))
          throw new AuthSessionMissingError();
        const { session: s, error: i } = await this._callRefreshToken(e.refresh_token);
        return i ? { data: { user: null, session: null }, error: i } : s ? { data: { user: s.user, session: s }, error: null } : { data: { user: null, session: null }, error: null };
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
        const { data: b, error: w } = await this._exchangeCodeForSession(e.code);
        if (w)
          throw w;
        const T = new URL(window.location.href);
        return T.searchParams.delete("code"), window.history.replaceState(window.history.state, "", T.toString()), { data: { session: b.session, redirectType: null }, error: null };
      }
      const { provider_token: n, provider_refresh_token: s, access_token: i, refresh_token: o, expires_in: l, expires_at: c, token_type: d } = e;
      if (!i || !l || !o || !d)
        throw new AuthImplicitGrantRedirectError("No session defined in URL");
      const u = Math.round(Date.now() / 1e3), f = parseInt(l);
      let h = u + f;
      c && (h = parseInt(c));
      const _ = h - u;
      _ * 1e3 <= AUTO_REFRESH_TICK_DURATION && console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${_}s, should have been closer to ${f}s`);
      const g = h - f;
      u - g >= 120 ? console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", g, h, u) : u - g < 0 && console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clock for skew", g, h, u);
      const { data: m, error: v } = await this._getUser(i);
      if (v)
        throw v;
      const y = {
        provider_token: n,
        provider_refresh_token: s,
        access_token: i,
        expires_in: f,
        expires_at: h,
        refresh_token: o,
        token_type: d,
        user: m.user
      };
      return window.location.hash = "", this._debug("#_getSessionFromURL()", "clearing window.location.hash"), { data: { session: y, redirectType: e.type }, error: null };
    } catch (n) {
      if (isAuthError(n))
        return { data: { session: null, redirectType: null }, error: n };
      throw n;
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
      var n;
      const { data: s, error: i } = t;
      if (i)
        return { error: i };
      const o = (n = s.session) === null || n === void 0 ? void 0 : n.access_token;
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
    const t = uuid(), n = {
      id: t,
      callback: e,
      unsubscribe: () => {
        this._debug("#unsubscribe()", "state change callback with id removed", t), this.stateChangeEmitters.delete(t);
      }
    };
    return this._debug("#onAuthStateChange()", "registered callback with id", t), this.stateChangeEmitters.set(t, n), (async () => (await this.initializePromise, await this._acquireLock(-1, async () => {
      this._emitInitialSession(t);
    })))(), { data: { subscription: n } };
  }
  async _emitInitialSession(e) {
    return await this._useSession(async (t) => {
      var n, s;
      try {
        const { data: { session: i }, error: o } = t;
        if (o)
          throw o;
        await ((n = this.stateChangeEmitters.get(e)) === null || n === void 0 ? void 0 : n.callback("INITIAL_SESSION", i)), this._debug("INITIAL_SESSION", "callback id", e, "session", i);
      } catch (i) {
        await ((s = this.stateChangeEmitters.get(e)) === null || s === void 0 ? void 0 : s.callback("INITIAL_SESSION", null)), this._debug("INITIAL_SESSION", "callback id", e, "error", i), console.error(i);
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
    let n = null, s = null;
    this.flowType === "pkce" && ([n, s] = await getCodeChallengeAndMethod(
      this.storage,
      this.storageKey,
      !0
      // isPasswordRecovery
    ));
    try {
      return await _request(this.fetch, "POST", `${this.url}/recover`, {
        body: {
          email: e,
          code_challenge: n,
          code_challenge_method: s,
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
      const { data: t, error: n } = await this.getUser();
      if (n)
        throw n;
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
      const { data: n, error: s } = await this._useSession(async (i) => {
        var o, l, c, d, u;
        const { data: f, error: h } = i;
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
          jwt: (u = (d = f.session) === null || d === void 0 ? void 0 : d.access_token) !== null && u !== void 0 ? u : void 0
        });
      });
      if (s)
        throw s;
      return isBrowser() && !(!((t = e.options) === null || t === void 0) && t.skipBrowserRedirect) && window.location.assign(n == null ? void 0 : n.url), { data: { provider: e.provider, url: n == null ? void 0 : n.url }, error: null };
    } catch (n) {
      if (isAuthError(n))
        return { data: { provider: e.provider, url: null }, error: n };
      throw n;
    }
  }
  /**
   * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
   */
  async unlinkIdentity(e) {
    try {
      return await this._useSession(async (t) => {
        var n, s;
        const { data: i, error: o } = t;
        if (o)
          throw o;
        return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${e.identity_id}`, {
          headers: this.headers,
          jwt: (s = (n = i.session) === null || n === void 0 ? void 0 : n.access_token) !== null && s !== void 0 ? s : void 0
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
      const n = Date.now();
      return await retryable(async (s) => (s > 0 && await sleep$1(200 * Math.pow(2, s - 1)), this._debug(t, "refreshing attempt", s), await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
        body: { refresh_token: e },
        headers: this.headers,
        xform: _sessionResponse
      })), (s, i) => {
        const o = 200 * Math.pow(2, s);
        return i && isAuthRetryableFetchError(i) && // retryable only if the request can be sent before the backoff overflows the tick duration
        Date.now() + o - n < AUTO_REFRESH_TICK_DURATION;
      });
    } catch (n) {
      if (this._debug(t, "error", n), isAuthError(n))
        return { data: { session: null, user: null }, error: n };
      throw n;
    } finally {
      this._debug(t, "end");
    }
  }
  _isValidSession(e) {
    return typeof e == "object" && e !== null && "access_token" in e && "refresh_token" in e && "expires_at" in e;
  }
  async _handleProviderSignIn(e, t) {
    const n = await this._getUrlForProvider(`${this.url}/authorize`, e, {
      redirectTo: t.redirectTo,
      scopes: t.scopes,
      queryParams: t.queryParams
    });
    return this._debug("#_handleProviderSignIn()", "provider", e, "options", t, "url", n), isBrowser() && !t.skipBrowserRedirect && window.location.assign(n), { data: { provider: e, url: n }, error: null };
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
      const n = await getItemAsync(this.storage, this.storageKey);
      if (this._debug(t, "session from storage", n), !this._isValidSession(n)) {
        this._debug(t, "session is not valid"), n !== null && await this._removeSession();
        return;
      }
      const s = Math.round(Date.now() / 1e3), i = ((e = n.expires_at) !== null && e !== void 0 ? e : 1 / 0) < s + EXPIRY_MARGIN;
      if (this._debug(t, `session has${i ? "" : " not"} expired with margin of ${EXPIRY_MARGIN}s`), i) {
        if (this.autoRefreshToken && n.refresh_token) {
          const { error: o } = await this._callRefreshToken(n.refresh_token);
          o && (console.error(o), isAuthRetryableFetchError(o) || (this._debug(t, "refresh failed with a non-retryable error, removing the session", o), await this._removeSession()));
        }
      } else
        await this._notifyAllSubscribers("SIGNED_IN", n);
    } catch (n) {
      this._debug(t, "error", n), console.error(n);
      return;
    } finally {
      this._debug(t, "end");
    }
  }
  async _callRefreshToken(e) {
    var t, n;
    if (!e)
      throw new AuthSessionMissingError();
    if (this.refreshingDeferred)
      return this.refreshingDeferred.promise;
    const s = `#_callRefreshToken(${e.substring(0, 5)}...)`;
    this._debug(s, "begin");
    try {
      this.refreshingDeferred = new Deferred();
      const { data: i, error: o } = await this._refreshAccessToken(e);
      if (o)
        throw o;
      if (!i.session)
        throw new AuthSessionMissingError();
      await this._saveSession(i.session), await this._notifyAllSubscribers("TOKEN_REFRESHED", i.session);
      const l = { session: i.session, error: null };
      return this.refreshingDeferred.resolve(l), l;
    } catch (i) {
      if (this._debug(s, "error", i), isAuthError(i)) {
        const o = { session: null, error: i };
        return isAuthRetryableFetchError(i) || await this._removeSession(), (t = this.refreshingDeferred) === null || t === void 0 || t.resolve(o), o;
      }
      throw (n = this.refreshingDeferred) === null || n === void 0 || n.reject(i), i;
    } finally {
      this.refreshingDeferred = null, this._debug(s, "end");
    }
  }
  async _notifyAllSubscribers(e, t, n = !0) {
    const s = `#_notifyAllSubscribers(${e})`;
    this._debug(s, "begin", t, `broadcast = ${n}`);
    try {
      this.broadcastChannel && n && this.broadcastChannel.postMessage({ event: e, session: t });
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
      this._debug(s, "end");
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
    const e = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
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
              const { data: { session: n } } = t;
              if (!n || !n.refresh_token || !n.expires_at) {
                this._debug("#_autoRefreshTokenTick()", "no session");
                return;
              }
              const s = Math.floor((n.expires_at * 1e3 - e) / AUTO_REFRESH_TICK_DURATION);
              this._debug("#_autoRefreshTokenTick()", `access token expires in ${s} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`), s <= AUTO_REFRESH_TICK_THRESHOLD && await this._callRefreshToken(n.refresh_token);
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
  async _getUrlForProvider(e, t, n) {
    const s = [`provider=${encodeURIComponent(t)}`];
    if (n != null && n.redirectTo && s.push(`redirect_to=${encodeURIComponent(n.redirectTo)}`), n != null && n.scopes && s.push(`scopes=${encodeURIComponent(n.scopes)}`), this.flowType === "pkce") {
      const [i, o] = await getCodeChallengeAndMethod(this.storage, this.storageKey), l = new URLSearchParams({
        code_challenge: `${encodeURIComponent(i)}`,
        code_challenge_method: `${encodeURIComponent(o)}`
      });
      s.push(l.toString());
    }
    if (n != null && n.queryParams) {
      const i = new URLSearchParams(n.queryParams);
      s.push(i.toString());
    }
    return n != null && n.skipBrowserRedirect && s.push(`skip_http_redirect=${n.skipBrowserRedirect}`), `${e}?${s.join("&")}`;
  }
  async _unenroll(e) {
    try {
      return await this._useSession(async (t) => {
        var n;
        const { data: s, error: i } = t;
        return i ? { data: null, error: i } : await _request(this.fetch, "DELETE", `${this.url}/factors/${e.factorId}`, {
          headers: this.headers,
          jwt: (n = s == null ? void 0 : s.session) === null || n === void 0 ? void 0 : n.access_token
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
        var n, s;
        const { data: i, error: o } = t;
        if (o)
          return { data: null, error: o };
        const l = Object.assign({ friendly_name: e.friendlyName, factor_type: e.factorType }, e.factorType === "phone" ? { phone: e.phone } : { issuer: e.issuer }), { data: c, error: d } = await _request(this.fetch, "POST", `${this.url}/factors`, {
          body: l,
          headers: this.headers,
          jwt: (n = i == null ? void 0 : i.session) === null || n === void 0 ? void 0 : n.access_token
        });
        return d ? { data: null, error: d } : (e.factorType === "totp" && (!((s = c == null ? void 0 : c.totp) === null || s === void 0) && s.qr_code) && (c.totp.qr_code = `data:image/svg+xml;utf-8,${c.totp.qr_code}`), { data: c, error: null });
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
          var n;
          const { data: s, error: i } = t;
          if (i)
            return { data: null, error: i };
          const { data: o, error: l } = await _request(this.fetch, "POST", `${this.url}/factors/${e.factorId}/verify`, {
            body: { code: e.code, challenge_id: e.challengeId },
            headers: this.headers,
            jwt: (n = s == null ? void 0 : s.session) === null || n === void 0 ? void 0 : n.access_token
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
          var n;
          const { data: s, error: i } = t;
          return i ? { data: null, error: i } : await _request(this.fetch, "POST", `${this.url}/factors/${e.factorId}/challenge`, {
            body: { channel: e.channel },
            headers: this.headers,
            jwt: (n = s == null ? void 0 : s.session) === null || n === void 0 ? void 0 : n.access_token
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
    const { data: t, error: n } = await this._challenge({
      factorId: e.factorId
    });
    return n ? { data: null, error: n } : await this._verify({
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
    const n = (e == null ? void 0 : e.factors) || [], s = n.filter((o) => o.factor_type === "totp" && o.status === "verified"), i = n.filter((o) => o.factor_type === "phone" && o.status === "verified");
    return {
      data: {
        all: n,
        totp: s,
        phone: i
      },
      error: null
    };
  }
  /**
   * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
   */
  async _getAuthenticatorAssuranceLevel() {
    return this._acquireLock(-1, async () => await this._useSession(async (e) => {
      var t, n;
      const { data: { session: s }, error: i } = e;
      if (i)
        return { data: null, error: i };
      if (!s)
        return {
          data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
          error: null
        };
      const o = this._decodeJWT(s.access_token);
      let l = null;
      o.aal && (l = o.aal);
      let c = l;
      ((n = (t = s.user.factors) === null || t === void 0 ? void 0 : t.filter((f) => f.status === "verified")) !== null && n !== void 0 ? n : []).length > 0 && (c = "aal2");
      const u = o.amr || [];
      return { data: { currentLevel: l, nextLevel: c, currentAuthenticationMethods: u }, error: null };
    }));
  }
}
GoTrueClient.nextInstanceID = 0;
const AuthClient = GoTrueClient;
class SupabaseAuthClient extends AuthClient {
  constructor(e) {
    super(e);
  }
}
var __awaiter = function(r, e, t, n) {
  function s(i) {
    return i instanceof t ? i : new t(function(o) {
      o(i);
    });
  }
  return new (t || (t = Promise))(function(i, o) {
    function l(u) {
      try {
        d(n.next(u));
      } catch (f) {
        o(f);
      }
    }
    function c(u) {
      try {
        d(n.throw(u));
      } catch (f) {
        o(f);
      }
    }
    function d(u) {
      u.done ? i(u.value) : s(u.value).then(l, c);
    }
    d((n = n.apply(r, e || [])).next());
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
  constructor(e, t, n) {
    var s, i, o;
    if (this.supabaseUrl = e, this.supabaseKey = t, !e)
      throw new Error("supabaseUrl is required.");
    if (!t)
      throw new Error("supabaseKey is required.");
    const l = stripTrailingSlash(e);
    this.realtimeUrl = `${l}/realtime/v1`.replace(/^http/i, "ws"), this.authUrl = `${l}/auth/v1`, this.storageUrl = `${l}/storage/v1`, this.functionsUrl = `${l}/functions/v1`;
    const c = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`, d = {
      db: DEFAULT_DB_OPTIONS,
      realtime: DEFAULT_REALTIME_OPTIONS,
      auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: c }),
      global: DEFAULT_GLOBAL_OPTIONS
    }, u = applySettingDefaults(n ?? {}, d);
    this.storageKey = (s = u.auth.storageKey) !== null && s !== void 0 ? s : "", this.headers = (i = u.global.headers) !== null && i !== void 0 ? i : {}, u.accessToken ? (this.accessToken = u.accessToken, this.auth = new Proxy({}, {
      get: (f, h) => {
        throw new Error(`@supabase/supabase-js: Supabase Client is configured with the accessToken option, accessing supabase.auth.${String(h)} is not possible`);
      }
    })) : this.auth = this._initSupabaseAuthClient((o = u.auth) !== null && o !== void 0 ? o : {}, this.headers, u.global.fetch), this.fetch = fetchWithAuth(t, this._getAccessToken.bind(this), u.global.fetch), this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers, accessToken: this._getAccessToken.bind(this) }, u.realtime)), this.rest = new PostgrestClient(`${l}/rest/v1`, {
      headers: this.headers,
      schema: u.db.schema,
      fetch: this.fetch
    }), u.accessToken || this._listenForAuthEvents();
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
  rpc(e, t = {}, n = {}) {
    return this.rest.rpc(e, t, n);
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
      const { data: n } = yield this.auth.getSession();
      return (t = (e = n.session) === null || e === void 0 ? void 0 : e.access_token) !== null && t !== void 0 ? t : null;
    });
  }
  _initSupabaseAuthClient({ autoRefreshToken: e, persistSession: t, detectSessionInUrl: n, storage: s, storageKey: i, flowType: o, lock: l, debug: c }, d, u) {
    const f = {
      Authorization: `Bearer ${this.supabaseKey}`,
      apikey: `${this.supabaseKey}`
    };
    return new SupabaseAuthClient({
      url: this.authUrl,
      headers: Object.assign(Object.assign({}, f), d),
      storageKey: i,
      autoRefreshToken: e,
      persistSession: t,
      detectSessionInUrl: n,
      storage: s,
      flowType: o,
      lock: l,
      debug: c,
      fetch: u,
      // auth checks if there is a custom authorizaiton header using this flag
      // so it knows whether to return an error when getUser is called with no session
      hasCustomAuthorizationHeader: "Authorization" in this.headers
    });
  }
  _initRealtimeClient(e) {
    return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, e), { params: Object.assign({ apikey: this.supabaseKey }, e == null ? void 0 : e.params) }));
  }
  _listenForAuthEvents() {
    return this.auth.onAuthStateChange((t, n) => {
      this._handleTokenChanged(t, "CLIENT", n == null ? void 0 : n.access_token);
    });
  }
  _handleTokenChanged(e, t, n) {
    (e === "TOKEN_REFRESHED" || e === "SIGNED_IN") && this.changedAccessToken !== n ? this.changedAccessToken = n : e === "SIGNED_OUT" && (this.realtime.setAuth(), t == "STORAGE" && this.auth.signOut(), this.changedAccessToken = void 0);
  }
}
const createClient = (r, e, t) => new SupabaseClient(r, e, t), supabase = createClient(
  "https://fnaeijdumseiaoabvvmc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYWVpamR1bXNlaWFvYWJ2dm1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0Njc5MDgsImV4cCI6MjA1MzA0MzkwOH0.AKnUpUDBfog2rDv9_jFwTXxNb_R5c9WtK2n0jn18bG4"
);
var root$d = /* @__PURE__ */ template('<h6 class="caption svelte-l7at5k"><!></h6>');
const $$css$d = {
  hash: "svelte-l7at5k",
  code: `
	.caption.svelte-l7at5k {
		font-size: 12px;
		font-family: 'Monument Regular', sans-serif;
		text-transform: uppercase;
		letter-spacing: -0.24px;
		margin: 12px 0;
	}
`
};
function CaptionType(r, e) {
  append_styles(r, $$css$d);
  var t = root$d(), n = child(t);
  slot(n, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(CaptionType, {}, ["default"], [], !0);
var root$c = /* @__PURE__ */ template('<h2 class="svelte-tzgj7f"><!></h2>');
const $$css$c = {
  hash: "svelte-tzgj7f",
  code: `
	h2.svelte-tzgj7f {
		font-size: 18px;
		letter-spacing: -0.34px;
		text-transform: uppercase;
		color: #000;
		font-family: Monument, sans-serif;

		@media screen and (min-width: 1024px) {
			font-size: 22px;
		}
	}
`
};
function TitleType(r, e) {
  append_styles(r, $$css$c);
  var t = root$c(), n = child(t);
  slot(n, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(TitleType, {}, ["default"], [], !0);
var root$b = /* @__PURE__ */ template('<div class="review svelte-174em9x"><div class="header svelte-174em9x"><h6 class="svelte-174em9x"> </h6> <p class="date svelte-174em9x"> </p></div> <p class="svelte-174em9x"> </p></div>');
const $$css$b = {
  hash: "svelte-174em9x",
  code: `.review.svelte-174em9x {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

p.svelte-174em9x {
  font-family: Monument Regular;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.7019607843);
  letter-spacing: -0.25px;
  line-height: 26px;
  margin: 0;
}

h6.svelte-174em9x,
.date.svelte-174em9x {
  font-size: 12px;
  font-family: Monument, sans-serif;
  color: #000;
  letter-spacing: -0.18px;
  text-transform: uppercase;
  margin: 0;
}

.date.svelte-174em9x {
  opacity: 0.6;
}

.header.svelte-174em9x {
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: space-between;
}
@media screen and (min-width: 1024px) {
  .header.svelte-174em9x {
    padding: 24px 0;
    gap: 12px;
  }
}`
};
function KnitterReviewItem(r, e) {
  push(e, !1), append_styles(r, $$css$b);
  let t = prop(e, "review", 12);
  init();
  var n = root$b(), s = child(n), i = child(s), o = child(i, !0);
  reset(i);
  var l = sibling(i, 2), c = child(l, !0);
  template_effect(() => set_text(c, t().created_at.toLocaleDateString())), reset(l), reset(s);
  var d = sibling(s, 2), u = child(d, !0);
  return reset(d), reset(n), template_effect(() => {
    set_text(o, t().created_by), set_text(u, t().body);
  }), append(r, n), pop({
    get review() {
      return t();
    },
    set review(f) {
      t(f), flush_sync();
    }
  });
}
create_custom_element(KnitterReviewItem, { review: {} }, [], [], !0);
var root$a = /* @__PURE__ */ template('<section class="svelte-1s1jo0"></section>');
const $$css$a = {
  hash: "svelte-1s1jo0",
  code: `
	section.svelte-1s1jo0 {
		background: rgba(0, 0, 0, 0.02);
		width: 100%;
		aspect-ratio: 16/9;
		margin: 20px 0;
	}
`
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
function fade(r, { delay: e = 0, duration: t = 400, easing: n = linear } = {}) {
  const s = +getComputedStyle(r).opacity;
  return {
    delay: e,
    duration: t,
    easing: n,
    css: (i) => `opacity: ${i * s}`
  };
}
function fly(r, { delay: e = 0, duration: t = 400, easing: n = cubic_out, x: s = 0, y: i = 0, opacity: o = 0 } = {}) {
  const l = getComputedStyle(r), c = +l.opacity, d = l.transform === "none" ? "" : l.transform, u = c * (1 - o), [f, h] = split_css_unit(s), [_, g] = split_css_unit(i);
  return {
    delay: e,
    duration: t,
    easing: n,
    css: (m, v) => `
			transform: ${d} translate(${(1 - m) * f}${h}, ${(1 - m) * _}${g});
			opacity: ${c - u * v}`
  };
}
function isObject$1(r) {
  return r !== null && typeof r == "object" && "constructor" in r && r.constructor === Object;
}
function extend$1(r, e) {
  r === void 0 && (r = {}), e === void 0 && (e = {}), Object.keys(e).forEach((t) => {
    typeof r[t] > "u" ? r[t] = e[t] : isObject$1(e[t]) && isObject$1(r[t]) && Object.keys(e[t]).length > 0 && extend$1(r[t], e[t]);
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
  let n, s, i;
  const o = getComputedStyle$1(r);
  return t.WebKitCSSMatrix ? (s = o.transform || o.webkitTransform, s.split(",").length > 6 && (s = s.split(", ").map((l) => l.replace(",", ".")).join(", ")), i = new t.WebKitCSSMatrix(s === "none" ? "" : s)) : (i = o.MozTransform || o.OTransform || o.MsTransform || o.msTransform || o.transform || o.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"), n = i.toString().split(",")), e === "x" && (t.WebKitCSSMatrix ? s = i.m41 : n.length === 16 ? s = parseFloat(n[12]) : s = parseFloat(n[4])), e === "y" && (t.WebKitCSSMatrix ? s = i.m42 : n.length === 16 ? s = parseFloat(n[13]) : s = parseFloat(n[5])), s || 0;
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
    const n = t < 0 || arguments.length <= t ? void 0 : arguments[t];
    if (n != null && !isNode(n)) {
      const s = Object.keys(Object(n)).filter((i) => e.indexOf(i) < 0);
      for (let i = 0, o = s.length; i < o; i += 1) {
        const l = s[i], c = Object.getOwnPropertyDescriptor(n, l);
        c !== void 0 && c.enumerable && (isObject(r[l]) && isObject(n[l]) ? n[l].__swiper__ ? r[l] = n[l] : extend(r[l], n[l]) : !isObject(r[l]) && isObject(n[l]) ? (r[l] = {}, n[l].__swiper__ ? r[l] = n[l] : extend(r[l], n[l])) : r[l] = n[l]);
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
    side: n
  } = r;
  const s = getWindow(), i = -e.translate;
  let o = null, l;
  const c = e.params.speed;
  e.wrapperEl.style.scrollSnapType = "none", s.cancelAnimationFrame(e.cssModeFrameID);
  const d = t > i ? "next" : "prev", u = (h, _) => d === "next" && h >= _ || d === "prev" && h <= _, f = () => {
    l = (/* @__PURE__ */ new Date()).getTime(), o === null && (o = l);
    const h = Math.max(Math.min((l - o) / c, 1), 0), _ = 0.5 - Math.cos(h * Math.PI) / 2;
    let g = i + _ * (t - i);
    if (u(g, t) && (g = t), e.wrapperEl.scrollTo({
      [n]: g
    }), u(g, t)) {
      e.wrapperEl.style.overflow = "hidden", e.wrapperEl.style.scrollSnapType = "", setTimeout(() => {
        e.wrapperEl.style.overflow = "", e.wrapperEl.scrollTo({
          [n]: g
        });
      }), s.cancelAnimationFrame(e.cssModeFrameID);
      return;
    }
    e.cssModeFrameID = s.requestAnimationFrame(f);
  };
  f();
}
function elementChildren(r, e) {
  e === void 0 && (e = "");
  const t = [...r.children];
  return r instanceof HTMLSlotElement && t.push(...r.assignedElements()), e ? t.filter((n) => n.matches(e)) : t;
}
function elementIsChildOf(r, e) {
  const t = e.contains(r);
  return !t && e instanceof HTMLSlotElement ? [...e.assignedElements()].includes(r) : t;
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
    const n = r.previousElementSibling;
    e ? n.matches(e) && t.push(n) : t.push(n), r = n;
  }
  return t;
}
function elementNextAll(r, e) {
  const t = [];
  for (; r.nextElementSibling; ) {
    const n = r.nextElementSibling;
    e ? n.matches(e) && t.push(n) : t.push(n), r = n;
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
  let n = r.parentElement;
  for (; n; )
    t.push(n), n = n.parentElement;
  return t;
}
function elementOuterSize(r, e, t) {
  const n = getWindow();
  return r[e === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(n.getComputedStyle(r, null).getPropertyValue(e === "width" ? "margin-right" : "margin-top")) + parseFloat(n.getComputedStyle(r, null).getPropertyValue(e === "width" ? "margin-left" : "margin-bottom"));
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
  const t = getSupport(), n = getWindow(), s = n.navigator.platform, i = e || n.navigator.userAgent, o = {
    ios: !1,
    android: !1
  }, l = n.screen.width, c = n.screen.height, d = i.match(/(Android);?[\s\/]+([\d.]+)?/);
  let u = i.match(/(iPad).*OS\s([\d_]+)/);
  const f = i.match(/(iPod)(.*OS\s([\d_]+))?/), h = !u && i.match(/(iPhone\sOS|iOS)\s([\d_]+)/), _ = s === "Win32";
  let g = s === "MacIntel";
  const m = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
  return !u && g && t.touch && m.indexOf(`${l}x${c}`) >= 0 && (u = i.match(/(Version)\/([\d.]+)/), u || (u = [0, 1, "13_0_0"]), g = !1), d && !_ && (o.os = "android", o.android = !0), (u || h || f) && (o.os = "ios", o.ios = !0), o;
}
function getDevice(r) {
  return r === void 0 && (r = {}), deviceCached || (deviceCached = calcDevice(r)), deviceCached;
}
let browser$3;
function calcBrowser() {
  const r = getWindow(), e = getDevice();
  let t = !1;
  function n() {
    const l = r.navigator.userAgent.toLowerCase();
    return l.indexOf("safari") >= 0 && l.indexOf("chrome") < 0 && l.indexOf("android") < 0;
  }
  if (n()) {
    const l = String(r.navigator.userAgent);
    if (l.includes("Version/")) {
      const [c, d] = l.split("Version/")[1].split(" ")[0].split(".").map((u) => Number(u));
      t = c < 16 || c === 16 && d < 2;
    }
  }
  const s = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(r.navigator.userAgent), i = n(), o = i || s && e.ios;
  return {
    isSafari: t || i,
    needPerspectiveFix: t,
    need3dFix: o,
    isWebView: s
  };
}
function getBrowser() {
  return browser$3 || (browser$3 = calcBrowser()), browser$3;
}
function Resize(r) {
  let {
    swiper: e,
    on: t,
    emit: n
  } = r;
  const s = getWindow();
  let i = null, o = null;
  const l = () => {
    !e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"));
  }, c = () => {
    !e || e.destroyed || !e.initialized || (i = new ResizeObserver((f) => {
      o = s.requestAnimationFrame(() => {
        const {
          width: h,
          height: _
        } = e;
        let g = h, m = _;
        f.forEach((v) => {
          let {
            contentBoxSize: y,
            contentRect: b,
            target: w
          } = v;
          w && w !== e.el || (g = b ? b.width : (y[0] || y).inlineSize, m = b ? b.height : (y[0] || y).blockSize);
        }), (g !== h || m !== _) && l();
      });
    }), i.observe(e.el));
  }, d = () => {
    o && s.cancelAnimationFrame(o), i && i.unobserve && e.el && (i.unobserve(e.el), i = null);
  }, u = () => {
    !e || e.destroyed || !e.initialized || n("orientationchange");
  };
  t("init", () => {
    if (e.params.resizeObserver && typeof s.ResizeObserver < "u") {
      c();
      return;
    }
    s.addEventListener("resize", l), s.addEventListener("orientationchange", u);
  }), t("destroy", () => {
    d(), s.removeEventListener("resize", l), s.removeEventListener("orientationchange", u);
  });
}
function Observer(r) {
  let {
    swiper: e,
    extendParams: t,
    on: n,
    emit: s
  } = r;
  const i = [], o = getWindow(), l = function(u, f) {
    f === void 0 && (f = {});
    const h = o.MutationObserver || o.WebkitMutationObserver, _ = new h((g) => {
      if (e.__preventObserver__) return;
      if (g.length === 1) {
        s("observerUpdate", g[0]);
        return;
      }
      const m = function() {
        s("observerUpdate", g[0]);
      };
      o.requestAnimationFrame ? o.requestAnimationFrame(m) : o.setTimeout(m, 0);
    });
    _.observe(u, {
      attributes: typeof f.attributes > "u" ? !0 : f.attributes,
      childList: e.isElement || (typeof f.childList > "u" ? !0 : f).childList,
      characterData: typeof f.characterData > "u" ? !0 : f.characterData
    }), i.push(_);
  }, c = () => {
    if (e.params.observer) {
      if (e.params.observeParents) {
        const u = elementParents(e.hostEl);
        for (let f = 0; f < u.length; f += 1)
          l(u[f]);
      }
      l(e.hostEl, {
        childList: e.params.observeSlideChildren
      }), l(e.wrapperEl, {
        attributes: !1
      });
    }
  }, d = () => {
    i.forEach((u) => {
      u.disconnect();
    }), i.splice(0, i.length);
  };
  t({
    observer: !1,
    observeParents: !1,
    observeSlideChildren: !1
  }), n("init", c), n("destroy", d);
}
var eventsEmitter = {
  on(r, e, t) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
    const s = t ? "unshift" : "push";
    return r.split(" ").forEach((i) => {
      n.eventsListeners[i] || (n.eventsListeners[i] = []), n.eventsListeners[i][s](e);
    }), n;
  },
  once(r, e, t) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
    function s() {
      n.off(r, s), s.__emitterProxy && delete s.__emitterProxy;
      for (var i = arguments.length, o = new Array(i), l = 0; l < i; l++)
        o[l] = arguments[l];
      e.apply(n, o);
    }
    return s.__emitterProxy = e, n.on(r, s, t);
  },
  onAny(r, e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || typeof r != "function") return t;
    const n = e ? "unshift" : "push";
    return t.eventsAnyListeners.indexOf(r) < 0 && t.eventsAnyListeners[n](r), t;
  },
  offAny(r) {
    const e = this;
    if (!e.eventsListeners || e.destroyed || !e.eventsAnyListeners) return e;
    const t = e.eventsAnyListeners.indexOf(r);
    return t >= 0 && e.eventsAnyListeners.splice(t, 1), e;
  },
  off(r, e) {
    const t = this;
    return !t.eventsListeners || t.destroyed || !t.eventsListeners || r.split(" ").forEach((n) => {
      typeof e > "u" ? t.eventsListeners[n] = [] : t.eventsListeners[n] && t.eventsListeners[n].forEach((s, i) => {
        (s === e || s.__emitterProxy && s.__emitterProxy === e) && t.eventsListeners[n].splice(i, 1);
      });
    }), t;
  },
  emit() {
    const r = this;
    if (!r.eventsListeners || r.destroyed || !r.eventsListeners) return r;
    let e, t, n;
    for (var s = arguments.length, i = new Array(s), o = 0; o < s; o++)
      i[o] = arguments[o];
    return typeof i[0] == "string" || Array.isArray(i[0]) ? (e = i[0], t = i.slice(1, i.length), n = r) : (e = i[0].events, t = i[0].data, n = i[0].context || r), t.unshift(n), (Array.isArray(e) ? e : e.split(" ")).forEach((c) => {
      r.eventsAnyListeners && r.eventsAnyListeners.length && r.eventsAnyListeners.forEach((d) => {
        d.apply(n, [c, ...t]);
      }), r.eventsListeners && r.eventsListeners[c] && r.eventsListeners[c].forEach((d) => {
        d.apply(n, t);
      });
    }), r;
  }
};
function updateSize() {
  const r = this;
  let e, t;
  const n = r.el;
  typeof r.params.width < "u" && r.params.width !== null ? e = r.params.width : e = n.clientWidth, typeof r.params.height < "u" && r.params.height !== null ? t = r.params.height : t = n.clientHeight, !(e === 0 && r.isHorizontal() || t === 0 && r.isVertical()) && (e = e - parseInt(elementStyle(n, "padding-left") || 0, 10) - parseInt(elementStyle(n, "padding-right") || 0, 10), t = t - parseInt(elementStyle(n, "padding-top") || 0, 10) - parseInt(elementStyle(n, "padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), Object.assign(r, {
    width: e,
    height: t,
    size: r.isHorizontal() ? e : t
  }));
}
function updateSlides() {
  const r = this;
  function e(S, A) {
    return parseFloat(S.getPropertyValue(r.getDirectionLabel(A)) || 0);
  }
  const t = r.params, {
    wrapperEl: n,
    slidesEl: s,
    size: i,
    rtlTranslate: o,
    wrongRTL: l
  } = r, c = r.virtual && t.virtual.enabled, d = c ? r.virtual.slides.length : r.slides.length, u = elementChildren(s, `.${r.params.slideClass}, swiper-slide`), f = c ? r.virtual.slides.length : u.length;
  let h = [];
  const _ = [], g = [];
  let m = t.slidesOffsetBefore;
  typeof m == "function" && (m = t.slidesOffsetBefore.call(r));
  let v = t.slidesOffsetAfter;
  typeof v == "function" && (v = t.slidesOffsetAfter.call(r));
  const y = r.snapGrid.length, b = r.slidesGrid.length;
  let w = t.spaceBetween, T = -m, E = 0, k = 0;
  if (typeof i > "u")
    return;
  typeof w == "string" && w.indexOf("%") >= 0 ? w = parseFloat(w.replace("%", "")) / 100 * i : typeof w == "string" && (w = parseFloat(w)), r.virtualSize = -w, u.forEach((S) => {
    o ? S.style.marginLeft = "" : S.style.marginRight = "", S.style.marginBottom = "", S.style.marginTop = "";
  }), t.centeredSlides && t.cssMode && (setCSSProperty(n, "--swiper-centered-offset-before", ""), setCSSProperty(n, "--swiper-centered-offset-after", ""));
  const C = t.grid && t.grid.rows > 1 && r.grid;
  C ? r.grid.initSlides(u) : r.grid && r.grid.unsetSlides();
  let $;
  const L = t.slidesPerView === "auto" && t.breakpoints && Object.keys(t.breakpoints).filter((S) => typeof t.breakpoints[S].slidesPerView < "u").length > 0;
  for (let S = 0; S < f; S += 1) {
    $ = 0;
    let A;
    if (u[S] && (A = u[S]), C && r.grid.updateSlide(S, A, u), !(u[S] && elementStyle(A, "display") === "none")) {
      if (t.slidesPerView === "auto") {
        L && (u[S].style[r.getDirectionLabel("width")] = "");
        const P = getComputedStyle(A), x = A.style.transform, R = A.style.webkitTransform;
        if (x && (A.style.transform = "none"), R && (A.style.webkitTransform = "none"), t.roundLengths)
          $ = r.isHorizontal() ? elementOuterSize(A, "width") : elementOuterSize(A, "height");
        else {
          const I = e(P, "width"), O = e(P, "padding-left"), F = e(P, "padding-right"), B = e(P, "margin-left"), U = e(P, "margin-right"), V = P.getPropertyValue("box-sizing");
          if (V && V === "border-box")
            $ = I + B + U;
          else {
            const {
              clientWidth: K,
              offsetWidth: Y
            } = A;
            $ = I + O + F + B + U + (Y - K);
          }
        }
        x && (A.style.transform = x), R && (A.style.webkitTransform = R), t.roundLengths && ($ = Math.floor($));
      } else
        $ = (i - (t.slidesPerView - 1) * w) / t.slidesPerView, t.roundLengths && ($ = Math.floor($)), u[S] && (u[S].style[r.getDirectionLabel("width")] = `${$}px`);
      u[S] && (u[S].swiperSlideSize = $), g.push($), t.centeredSlides ? (T = T + $ / 2 + E / 2 + w, E === 0 && S !== 0 && (T = T - i / 2 - w), S === 0 && (T = T - i / 2 - w), Math.abs(T) < 1 / 1e3 && (T = 0), t.roundLengths && (T = Math.floor(T)), k % t.slidesPerGroup === 0 && h.push(T), _.push(T)) : (t.roundLengths && (T = Math.floor(T)), (k - Math.min(r.params.slidesPerGroupSkip, k)) % r.params.slidesPerGroup === 0 && h.push(T), _.push(T), T = T + $ + w), r.virtualSize += $ + w, E = $, k += 1;
    }
  }
  if (r.virtualSize = Math.max(r.virtualSize, i) + v, o && l && (t.effect === "slide" || t.effect === "coverflow") && (n.style.width = `${r.virtualSize + w}px`), t.setWrapperSize && (n.style[r.getDirectionLabel("width")] = `${r.virtualSize + w}px`), C && r.grid.updateWrapperSize($, h), !t.centeredSlides) {
    const S = [];
    for (let A = 0; A < h.length; A += 1) {
      let P = h[A];
      t.roundLengths && (P = Math.floor(P)), h[A] <= r.virtualSize - i && S.push(P);
    }
    h = S, Math.floor(r.virtualSize - i) - Math.floor(h[h.length - 1]) > 1 && h.push(r.virtualSize - i);
  }
  if (c && t.loop) {
    const S = g[0] + w;
    if (t.slidesPerGroup > 1) {
      const A = Math.ceil((r.virtual.slidesBefore + r.virtual.slidesAfter) / t.slidesPerGroup), P = S * t.slidesPerGroup;
      for (let x = 0; x < A; x += 1)
        h.push(h[h.length - 1] + P);
    }
    for (let A = 0; A < r.virtual.slidesBefore + r.virtual.slidesAfter; A += 1)
      t.slidesPerGroup === 1 && h.push(h[h.length - 1] + S), _.push(_[_.length - 1] + S), r.virtualSize += S;
  }
  if (h.length === 0 && (h = [0]), w !== 0) {
    const S = r.isHorizontal() && o ? "marginLeft" : r.getDirectionLabel("marginRight");
    u.filter((A, P) => !t.cssMode || t.loop ? !0 : P !== u.length - 1).forEach((A) => {
      A.style[S] = `${w}px`;
    });
  }
  if (t.centeredSlides && t.centeredSlidesBounds) {
    let S = 0;
    g.forEach((P) => {
      S += P + (w || 0);
    }), S -= w;
    const A = S > i ? S - i : 0;
    h = h.map((P) => P <= 0 ? -m : P > A ? A + v : P);
  }
  if (t.centerInsufficientSlides) {
    let S = 0;
    g.forEach((P) => {
      S += P + (w || 0);
    }), S -= w;
    const A = (t.slidesOffsetBefore || 0) + (t.slidesOffsetAfter || 0);
    if (S + A < i) {
      const P = (i - S - A) / 2;
      h.forEach((x, R) => {
        h[R] = x - P;
      }), _.forEach((x, R) => {
        _[R] = x + P;
      });
    }
  }
  if (Object.assign(r, {
    slides: u,
    snapGrid: h,
    slidesGrid: _,
    slidesSizesGrid: g
  }), t.centeredSlides && t.cssMode && !t.centeredSlidesBounds) {
    setCSSProperty(n, "--swiper-centered-offset-before", `${-h[0]}px`), setCSSProperty(n, "--swiper-centered-offset-after", `${r.size / 2 - g[g.length - 1] / 2}px`);
    const S = -r.snapGrid[0], A = -r.slidesGrid[0];
    r.snapGrid = r.snapGrid.map((P) => P + S), r.slidesGrid = r.slidesGrid.map((P) => P + A);
  }
  if (f !== d && r.emit("slidesLengthChange"), h.length !== y && (r.params.watchOverflow && r.checkOverflow(), r.emit("snapGridLengthChange")), _.length !== b && r.emit("slidesGridLengthChange"), t.watchSlidesProgress && r.updateSlidesOffset(), r.emit("slidesUpdated"), !c && !t.cssMode && (t.effect === "slide" || t.effect === "fade")) {
    const S = `${t.containerModifierClass}backface-hidden`, A = r.el.classList.contains(S);
    f <= t.maxBackfaceHiddenSlides ? A || r.el.classList.add(S) : A && r.el.classList.remove(S);
  }
}
function updateAutoHeight(r) {
  const e = this, t = [], n = e.virtual && e.params.virtual.enabled;
  let s = 0, i;
  typeof r == "number" ? e.setTransition(r) : r === !0 && e.setTransition(e.params.speed);
  const o = (l) => n ? e.slides[e.getSlideIndexByData(l)] : e.slides[l];
  if (e.params.slidesPerView !== "auto" && e.params.slidesPerView > 1)
    if (e.params.centeredSlides)
      (e.visibleSlides || []).forEach((l) => {
        t.push(l);
      });
    else
      for (i = 0; i < Math.ceil(e.params.slidesPerView); i += 1) {
        const l = e.activeIndex + i;
        if (l > e.slides.length && !n) break;
        t.push(o(l));
      }
  else
    t.push(o(e.activeIndex));
  for (i = 0; i < t.length; i += 1)
    if (typeof t[i] < "u") {
      const l = t[i].offsetHeight;
      s = l > s ? l : s;
    }
  (s || s === 0) && (e.wrapperEl.style.height = `${s}px`);
}
function updateSlidesOffset() {
  const r = this, e = r.slides, t = r.isElement ? r.isHorizontal() ? r.wrapperEl.offsetLeft : r.wrapperEl.offsetTop : 0;
  for (let n = 0; n < e.length; n += 1)
    e[n].swiperSlideOffset = (r.isHorizontal() ? e[n].offsetLeft : e[n].offsetTop) - t - r.cssOverflowAdjustment();
}
const toggleSlideClasses$1 = (r, e, t) => {
  e && !r.classList.contains(t) ? r.classList.add(t) : !e && r.classList.contains(t) && r.classList.remove(t);
};
function updateSlidesProgress(r) {
  r === void 0 && (r = this && this.translate || 0);
  const e = this, t = e.params, {
    slides: n,
    rtlTranslate: s,
    snapGrid: i
  } = e;
  if (n.length === 0) return;
  typeof n[0].swiperSlideOffset > "u" && e.updateSlidesOffset();
  let o = -r;
  s && (o = r), e.visibleSlidesIndexes = [], e.visibleSlides = [];
  let l = t.spaceBetween;
  typeof l == "string" && l.indexOf("%") >= 0 ? l = parseFloat(l.replace("%", "")) / 100 * e.size : typeof l == "string" && (l = parseFloat(l));
  for (let c = 0; c < n.length; c += 1) {
    const d = n[c];
    let u = d.swiperSlideOffset;
    t.cssMode && t.centeredSlides && (u -= n[0].swiperSlideOffset);
    const f = (o + (t.centeredSlides ? e.minTranslate() : 0) - u) / (d.swiperSlideSize + l), h = (o - i[0] + (t.centeredSlides ? e.minTranslate() : 0) - u) / (d.swiperSlideSize + l), _ = -(o - u), g = _ + e.slidesSizesGrid[c], m = _ >= 0 && _ <= e.size - e.slidesSizesGrid[c], v = _ >= 0 && _ < e.size - 1 || g > 1 && g <= e.size || _ <= 0 && g >= e.size;
    v && (e.visibleSlides.push(d), e.visibleSlidesIndexes.push(c)), toggleSlideClasses$1(d, v, t.slideVisibleClass), toggleSlideClasses$1(d, m, t.slideFullyVisibleClass), d.progress = s ? -f : f, d.originalProgress = s ? -h : h;
  }
}
function updateProgress(r) {
  const e = this;
  if (typeof r > "u") {
    const u = e.rtlTranslate ? -1 : 1;
    r = e && e.translate && e.translate * u || 0;
  }
  const t = e.params, n = e.maxTranslate() - e.minTranslate();
  let {
    progress: s,
    isBeginning: i,
    isEnd: o,
    progressLoop: l
  } = e;
  const c = i, d = o;
  if (n === 0)
    s = 0, i = !0, o = !0;
  else {
    s = (r - e.minTranslate()) / n;
    const u = Math.abs(r - e.minTranslate()) < 1, f = Math.abs(r - e.maxTranslate()) < 1;
    i = u || s <= 0, o = f || s >= 1, u && (s = 0), f && (s = 1);
  }
  if (t.loop) {
    const u = e.getSlideIndexByData(0), f = e.getSlideIndexByData(e.slides.length - 1), h = e.slidesGrid[u], _ = e.slidesGrid[f], g = e.slidesGrid[e.slidesGrid.length - 1], m = Math.abs(r);
    m >= h ? l = (m - h) / g : l = (m + g - _) / g, l > 1 && (l -= 1);
  }
  Object.assign(e, {
    progress: s,
    progressLoop: l,
    isBeginning: i,
    isEnd: o
  }), (t.watchSlidesProgress || t.centeredSlides && t.autoHeight) && e.updateSlidesProgress(r), i && !c && e.emit("reachBeginning toEdge"), o && !d && e.emit("reachEnd toEdge"), (c && !i || d && !o) && e.emit("fromEdge"), e.emit("progress", s);
}
const toggleSlideClasses = (r, e, t) => {
  e && !r.classList.contains(t) ? r.classList.add(t) : !e && r.classList.contains(t) && r.classList.remove(t);
};
function updateSlidesClasses() {
  const r = this, {
    slides: e,
    params: t,
    slidesEl: n,
    activeIndex: s
  } = r, i = r.virtual && t.virtual.enabled, o = r.grid && t.grid && t.grid.rows > 1, l = (f) => elementChildren(n, `.${t.slideClass}${f}, swiper-slide${f}`)[0];
  let c, d, u;
  if (i)
    if (t.loop) {
      let f = s - r.virtual.slidesBefore;
      f < 0 && (f = r.virtual.slides.length + f), f >= r.virtual.slides.length && (f -= r.virtual.slides.length), c = l(`[data-swiper-slide-index="${f}"]`);
    } else
      c = l(`[data-swiper-slide-index="${s}"]`);
  else
    o ? (c = e.filter((f) => f.column === s)[0], u = e.filter((f) => f.column === s + 1)[0], d = e.filter((f) => f.column === s - 1)[0]) : c = e[s];
  c && (o || (u = elementNextAll(c, `.${t.slideClass}, swiper-slide`)[0], t.loop && !u && (u = e[0]), d = elementPrevAll(c, `.${t.slideClass}, swiper-slide`)[0], t.loop && !d === 0 && (d = e[e.length - 1]))), e.forEach((f) => {
    toggleSlideClasses(f, f === c, t.slideActiveClass), toggleSlideClasses(f, f === u, t.slideNextClass), toggleSlideClasses(f, f === d, t.slidePrevClass);
  }), r.emitSlidesClasses();
}
const processLazyPreloader = (r, e) => {
  if (!r || r.destroyed || !r.params) return;
  const t = () => r.isElement ? "swiper-slide" : `.${r.params.slideClass}`, n = e.closest(t());
  if (n) {
    let s = n.querySelector(`.${r.params.lazyPreloaderClass}`);
    !s && r.isElement && (n.shadowRoot ? s = n.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`) : requestAnimationFrame(() => {
      n.shadowRoot && (s = n.shadowRoot.querySelector(`.${r.params.lazyPreloaderClass}`), s && s.remove());
    })), s && s.remove();
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
  const n = r.params.slidesPerView === "auto" ? r.slidesPerViewDynamic() : Math.ceil(r.params.slidesPerView), s = r.activeIndex;
  if (r.params.grid && r.params.grid.rows > 1) {
    const o = s, l = [o - e];
    l.push(...Array.from({
      length: e
    }).map((c, d) => o + n + d)), r.slides.forEach((c, d) => {
      l.includes(c.column) && unlazy(r, d);
    });
    return;
  }
  const i = s + n - 1;
  if (r.params.rewind || r.params.loop)
    for (let o = s - e; o <= i + e; o += 1) {
      const l = (o % t + t) % t;
      (l < s || l > i) && unlazy(r, l);
    }
  else
    for (let o = Math.max(s - e, 0); o <= Math.min(i + e, t - 1); o += 1)
      o !== s && (o > i || o < s) && unlazy(r, o);
};
function getActiveIndexByTranslate(r) {
  const {
    slidesGrid: e,
    params: t
  } = r, n = r.rtlTranslate ? r.translate : -r.translate;
  let s;
  for (let i = 0; i < e.length; i += 1)
    typeof e[i + 1] < "u" ? n >= e[i] && n < e[i + 1] - (e[i + 1] - e[i]) / 2 ? s = i : n >= e[i] && n < e[i + 1] && (s = i + 1) : n >= e[i] && (s = i);
  return t.normalizeSlideIndex && (s < 0 || typeof s > "u") && (s = 0), s;
}
function updateActiveIndex(r) {
  const e = this, t = e.rtlTranslate ? e.translate : -e.translate, {
    snapGrid: n,
    params: s,
    activeIndex: i,
    realIndex: o,
    snapIndex: l
  } = e;
  let c = r, d;
  const u = (_) => {
    let g = _ - e.virtual.slidesBefore;
    return g < 0 && (g = e.virtual.slides.length + g), g >= e.virtual.slides.length && (g -= e.virtual.slides.length), g;
  };
  if (typeof c > "u" && (c = getActiveIndexByTranslate(e)), n.indexOf(t) >= 0)
    d = n.indexOf(t);
  else {
    const _ = Math.min(s.slidesPerGroupSkip, c);
    d = _ + Math.floor((c - _) / s.slidesPerGroup);
  }
  if (d >= n.length && (d = n.length - 1), c === i && !e.params.loop) {
    d !== l && (e.snapIndex = d, e.emit("snapIndexChange"));
    return;
  }
  if (c === i && e.params.loop && e.virtual && e.params.virtual.enabled) {
    e.realIndex = u(c);
    return;
  }
  const f = e.grid && s.grid && s.grid.rows > 1;
  let h;
  if (e.virtual && s.virtual.enabled && s.loop)
    h = u(c);
  else if (f) {
    const _ = e.slides.filter((m) => m.column === c)[0];
    let g = parseInt(_.getAttribute("data-swiper-slide-index"), 10);
    Number.isNaN(g) && (g = Math.max(e.slides.indexOf(_), 0)), h = Math.floor(g / s.grid.rows);
  } else if (e.slides[c]) {
    const _ = e.slides[c].getAttribute("data-swiper-slide-index");
    _ ? h = parseInt(_, 10) : h = c;
  } else
    h = c;
  Object.assign(e, {
    previousSnapIndex: l,
    snapIndex: d,
    previousRealIndex: o,
    realIndex: h,
    previousIndex: i,
    activeIndex: c
  }), e.initialized && preload(e), e.emit("activeIndexChange"), e.emit("snapIndexChange"), (e.initialized || e.params.runCallbacksOnInit) && (o !== h && e.emit("realIndexChange"), e.emit("slideChange"));
}
function updateClickedSlide(r, e) {
  const t = this, n = t.params;
  let s = r.closest(`.${n.slideClass}, swiper-slide`);
  !s && t.isElement && e && e.length > 1 && e.includes(r) && [...e.slice(e.indexOf(r) + 1, e.length)].forEach((l) => {
    !s && l.matches && l.matches(`.${n.slideClass}, swiper-slide`) && (s = l);
  });
  let i = !1, o;
  if (s) {
    for (let l = 0; l < t.slides.length; l += 1)
      if (t.slides[l] === s) {
        i = !0, o = l;
        break;
      }
  }
  if (s && i)
    t.clickedSlide = s, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(s.getAttribute("data-swiper-slide-index"), 10) : t.clickedIndex = o;
  else {
    t.clickedSlide = void 0, t.clickedIndex = void 0;
    return;
  }
  n.slideToClickedSlide && t.clickedIndex !== void 0 && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide();
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
    rtlTranslate: n,
    translate: s,
    wrapperEl: i
  } = e;
  if (t.virtualTranslate)
    return n ? -s : s;
  if (t.cssMode)
    return s;
  let o = getTranslate(i, r);
  return o += e.cssOverflowAdjustment(), n && (o = -o), o || 0;
}
function setTranslate(r, e) {
  const t = this, {
    rtlTranslate: n,
    params: s,
    wrapperEl: i,
    progress: o
  } = t;
  let l = 0, c = 0;
  const d = 0;
  t.isHorizontal() ? l = n ? -r : r : c = r, s.roundLengths && (l = Math.floor(l), c = Math.floor(c)), t.previousTranslate = t.translate, t.translate = t.isHorizontal() ? l : c, s.cssMode ? i[t.isHorizontal() ? "scrollLeft" : "scrollTop"] = t.isHorizontal() ? -l : -c : s.virtualTranslate || (t.isHorizontal() ? l -= t.cssOverflowAdjustment() : c -= t.cssOverflowAdjustment(), i.style.transform = `translate3d(${l}px, ${c}px, ${d}px)`);
  let u;
  const f = t.maxTranslate() - t.minTranslate();
  f === 0 ? u = 0 : u = (r - t.minTranslate()) / f, u !== o && t.updateProgress(r), t.emit("setTranslate", t.translate, e);
}
function minTranslate() {
  return -this.snapGrid[0];
}
function maxTranslate() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function translateTo(r, e, t, n, s) {
  r === void 0 && (r = 0), e === void 0 && (e = this.params.speed), t === void 0 && (t = !0), n === void 0 && (n = !0);
  const i = this, {
    params: o,
    wrapperEl: l
  } = i;
  if (i.animating && o.preventInteractionOnTransition)
    return !1;
  const c = i.minTranslate(), d = i.maxTranslate();
  let u;
  if (n && r > c ? u = c : n && r < d ? u = d : u = r, i.updateProgress(u), o.cssMode) {
    const f = i.isHorizontal();
    if (e === 0)
      l[f ? "scrollLeft" : "scrollTop"] = -u;
    else {
      if (!i.support.smoothScroll)
        return animateCSSModeScroll({
          swiper: i,
          targetPosition: -u,
          side: f ? "left" : "top"
        }), !0;
      l.scrollTo({
        [f ? "left" : "top"]: -u,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return e === 0 ? (i.setTransition(0), i.setTranslate(u), t && (i.emit("beforeTransitionStart", e, s), i.emit("transitionEnd"))) : (i.setTransition(e), i.setTranslate(u), t && (i.emit("beforeTransitionStart", e, s), i.emit("transitionStart")), i.animating || (i.animating = !0, i.onTranslateToWrapperTransitionEnd || (i.onTranslateToWrapperTransitionEnd = function(h) {
    !i || i.destroyed || h.target === this && (i.wrapperEl.removeEventListener("transitionend", i.onTranslateToWrapperTransitionEnd), i.onTranslateToWrapperTransitionEnd = null, delete i.onTranslateToWrapperTransitionEnd, i.animating = !1, t && i.emit("transitionEnd"));
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
    direction: n,
    step: s
  } = r;
  const {
    activeIndex: i,
    previousIndex: o
  } = e;
  let l = n;
  if (l || (i > o ? l = "next" : i < o ? l = "prev" : l = "reset"), e.emit(`transition${s}`), t && i !== o) {
    if (l === "reset") {
      e.emit(`slideResetTransition${s}`);
      return;
    }
    e.emit(`slideChangeTransition${s}`), l === "next" ? e.emit(`slideNextTransition${s}`) : e.emit(`slidePrevTransition${s}`);
  }
}
function transitionStart(r, e) {
  r === void 0 && (r = !0);
  const t = this, {
    params: n
  } = t;
  n.cssMode || (n.autoHeight && t.updateAutoHeight(), transitionEmit({
    swiper: t,
    runCallbacks: r,
    direction: e,
    step: "Start"
  }));
}
function transitionEnd(r, e) {
  r === void 0 && (r = !0);
  const t = this, {
    params: n
  } = t;
  t.animating = !1, !n.cssMode && (t.setTransition(0), transitionEmit({
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
function slideTo(r, e, t, n, s) {
  r === void 0 && (r = 0), t === void 0 && (t = !0), typeof r == "string" && (r = parseInt(r, 10));
  const i = this;
  let o = r;
  o < 0 && (o = 0);
  const {
    params: l,
    snapGrid: c,
    slidesGrid: d,
    previousIndex: u,
    activeIndex: f,
    rtlTranslate: h,
    wrapperEl: _,
    enabled: g
  } = i;
  if (!g && !n && !s || i.destroyed || i.animating && l.preventInteractionOnTransition)
    return !1;
  typeof e > "u" && (e = i.params.speed);
  const m = Math.min(i.params.slidesPerGroupSkip, o);
  let v = m + Math.floor((o - m) / i.params.slidesPerGroup);
  v >= c.length && (v = c.length - 1);
  const y = -c[v];
  if (l.normalizeSlideIndex)
    for (let E = 0; E < d.length; E += 1) {
      const k = -Math.floor(y * 100), C = Math.floor(d[E] * 100), $ = Math.floor(d[E + 1] * 100);
      typeof d[E + 1] < "u" ? k >= C && k < $ - ($ - C) / 2 ? o = E : k >= C && k < $ && (o = E + 1) : k >= C && (o = E);
    }
  if (i.initialized && o !== f && (!i.allowSlideNext && (h ? y > i.translate && y > i.minTranslate() : y < i.translate && y < i.minTranslate()) || !i.allowSlidePrev && y > i.translate && y > i.maxTranslate() && (f || 0) !== o))
    return !1;
  o !== (u || 0) && t && i.emit("beforeSlideChangeStart"), i.updateProgress(y);
  let b;
  o > f ? b = "next" : o < f ? b = "prev" : b = "reset";
  const w = i.virtual && i.params.virtual.enabled;
  if (!(w && s) && (h && -y === i.translate || !h && y === i.translate))
    return i.updateActiveIndex(o), l.autoHeight && i.updateAutoHeight(), i.updateSlidesClasses(), l.effect !== "slide" && i.setTranslate(y), b !== "reset" && (i.transitionStart(t, b), i.transitionEnd(t, b)), !1;
  if (l.cssMode) {
    const E = i.isHorizontal(), k = h ? y : -y;
    if (e === 0)
      w && (i.wrapperEl.style.scrollSnapType = "none", i._immediateVirtual = !0), w && !i._cssModeVirtualInitialSet && i.params.initialSlide > 0 ? (i._cssModeVirtualInitialSet = !0, requestAnimationFrame(() => {
        _[E ? "scrollLeft" : "scrollTop"] = k;
      })) : _[E ? "scrollLeft" : "scrollTop"] = k, w && requestAnimationFrame(() => {
        i.wrapperEl.style.scrollSnapType = "", i._immediateVirtual = !1;
      });
    else {
      if (!i.support.smoothScroll)
        return animateCSSModeScroll({
          swiper: i,
          targetPosition: k,
          side: E ? "left" : "top"
        }), !0;
      _.scrollTo({
        [E ? "left" : "top"]: k,
        behavior: "smooth"
      });
    }
    return !0;
  }
  return i.setTransition(e), i.setTranslate(y), i.updateActiveIndex(o), i.updateSlidesClasses(), i.emit("beforeTransitionStart", e, n), i.transitionStart(t, b), e === 0 ? i.transitionEnd(t, b) : i.animating || (i.animating = !0, i.onSlideToWrapperTransitionEnd || (i.onSlideToWrapperTransitionEnd = function(k) {
    !i || i.destroyed || k.target === this && (i.wrapperEl.removeEventListener("transitionend", i.onSlideToWrapperTransitionEnd), i.onSlideToWrapperTransitionEnd = null, delete i.onSlideToWrapperTransitionEnd, i.transitionEnd(t, b));
  }), i.wrapperEl.addEventListener("transitionend", i.onSlideToWrapperTransitionEnd)), !0;
}
function slideToLoop(r, e, t, n) {
  r === void 0 && (r = 0), t === void 0 && (t = !0), typeof r == "string" && (r = parseInt(r, 10));
  const s = this;
  if (s.destroyed) return;
  typeof e > "u" && (e = s.params.speed);
  const i = s.grid && s.params.grid && s.params.grid.rows > 1;
  let o = r;
  if (s.params.loop)
    if (s.virtual && s.params.virtual.enabled)
      o = o + s.virtual.slidesBefore;
    else {
      let l;
      if (i) {
        const h = o * s.params.grid.rows;
        l = s.slides.filter((_) => _.getAttribute("data-swiper-slide-index") * 1 === h)[0].column;
      } else
        l = s.getSlideIndexByData(o);
      const c = i ? Math.ceil(s.slides.length / s.params.grid.rows) : s.slides.length, {
        centeredSlides: d
      } = s.params;
      let u = s.params.slidesPerView;
      u === "auto" ? u = s.slidesPerViewDynamic() : (u = Math.ceil(parseFloat(s.params.slidesPerView, 10)), d && u % 2 === 0 && (u = u + 1));
      let f = c - l < u;
      if (d && (f = f || l < Math.ceil(u / 2)), n && d && s.params.slidesPerView !== "auto" && !i && (f = !1), f) {
        const h = d ? l < s.activeIndex ? "prev" : "next" : l - s.activeIndex - 1 < s.params.slidesPerView ? "next" : "prev";
        s.loopFix({
          direction: h,
          slideTo: !0,
          activeSlideIndex: h === "next" ? l + 1 : l - c + 1,
          slideRealIndex: h === "next" ? s.realIndex : void 0
        });
      }
      if (i) {
        const h = o * s.params.grid.rows;
        o = s.slides.filter((_) => _.getAttribute("data-swiper-slide-index") * 1 === h)[0].column;
      } else
        o = s.getSlideIndexByData(o);
    }
  return requestAnimationFrame(() => {
    s.slideTo(o, e, t, n);
  }), s;
}
function slideNext(r, e, t) {
  e === void 0 && (e = !0);
  const n = this, {
    enabled: s,
    params: i,
    animating: o
  } = n;
  if (!s || n.destroyed) return n;
  typeof r > "u" && (r = n.params.speed);
  let l = i.slidesPerGroup;
  i.slidesPerView === "auto" && i.slidesPerGroup === 1 && i.slidesPerGroupAuto && (l = Math.max(n.slidesPerViewDynamic("current", !0), 1));
  const c = n.activeIndex < i.slidesPerGroupSkip ? 1 : l, d = n.virtual && i.virtual.enabled;
  if (i.loop) {
    if (o && !d && i.loopPreventsSliding) return !1;
    if (n.loopFix({
      direction: "next"
    }), n._clientLeft = n.wrapperEl.clientLeft, n.activeIndex === n.slides.length - 1 && i.cssMode)
      return requestAnimationFrame(() => {
        n.slideTo(n.activeIndex + c, r, e, t);
      }), !0;
  }
  return i.rewind && n.isEnd ? n.slideTo(0, r, e, t) : n.slideTo(n.activeIndex + c, r, e, t);
}
function slidePrev(r, e, t) {
  e === void 0 && (e = !0);
  const n = this, {
    params: s,
    snapGrid: i,
    slidesGrid: o,
    rtlTranslate: l,
    enabled: c,
    animating: d
  } = n;
  if (!c || n.destroyed) return n;
  typeof r > "u" && (r = n.params.speed);
  const u = n.virtual && s.virtual.enabled;
  if (s.loop) {
    if (d && !u && s.loopPreventsSliding) return !1;
    n.loopFix({
      direction: "prev"
    }), n._clientLeft = n.wrapperEl.clientLeft;
  }
  const f = l ? n.translate : -n.translate;
  function h(y) {
    return y < 0 ? -Math.floor(Math.abs(y)) : Math.floor(y);
  }
  const _ = h(f), g = i.map((y) => h(y));
  let m = i[g.indexOf(_) - 1];
  if (typeof m > "u" && s.cssMode) {
    let y;
    i.forEach((b, w) => {
      _ >= b && (y = w);
    }), typeof y < "u" && (m = i[y > 0 ? y - 1 : y]);
  }
  let v = 0;
  if (typeof m < "u" && (v = o.indexOf(m), v < 0 && (v = n.activeIndex - 1), s.slidesPerView === "auto" && s.slidesPerGroup === 1 && s.slidesPerGroupAuto && (v = v - n.slidesPerViewDynamic("previous", !0) + 1, v = Math.max(v, 0))), s.rewind && n.isBeginning) {
    const y = n.params.virtual && n.params.virtual.enabled && n.virtual ? n.virtual.slides.length - 1 : n.slides.length - 1;
    return n.slideTo(y, r, e, t);
  } else if (s.loop && n.activeIndex === 0 && s.cssMode)
    return requestAnimationFrame(() => {
      n.slideTo(v, r, e, t);
    }), !0;
  return n.slideTo(v, r, e, t);
}
function slideReset(r, e, t) {
  e === void 0 && (e = !0);
  const n = this;
  if (!n.destroyed)
    return typeof r > "u" && (r = n.params.speed), n.slideTo(n.activeIndex, r, e, t);
}
function slideToClosest(r, e, t, n) {
  e === void 0 && (e = !0), n === void 0 && (n = 0.5);
  const s = this;
  if (s.destroyed) return;
  typeof r > "u" && (r = s.params.speed);
  let i = s.activeIndex;
  const o = Math.min(s.params.slidesPerGroupSkip, i), l = o + Math.floor((i - o) / s.params.slidesPerGroup), c = s.rtlTranslate ? s.translate : -s.translate;
  if (c >= s.snapGrid[l]) {
    const d = s.snapGrid[l], u = s.snapGrid[l + 1];
    c - d > (u - d) * n && (i += s.params.slidesPerGroup);
  } else {
    const d = s.snapGrid[l - 1], u = s.snapGrid[l];
    c - d <= (u - d) * n && (i -= s.params.slidesPerGroup);
  }
  return i = Math.max(i, 0), i = Math.min(i, s.slidesGrid.length - 1), s.slideTo(i, r, e, t);
}
function slideToClickedSlide() {
  const r = this;
  if (r.destroyed) return;
  const {
    params: e,
    slidesEl: t
  } = r, n = e.slidesPerView === "auto" ? r.slidesPerViewDynamic() : e.slidesPerView;
  let s = r.clickedIndex, i;
  const o = r.isElement ? "swiper-slide" : `.${e.slideClass}`;
  if (e.loop) {
    if (r.animating) return;
    i = parseInt(r.clickedSlide.getAttribute("data-swiper-slide-index"), 10), e.centeredSlides ? s < r.loopedSlides - n / 2 || s > r.slides.length - r.loopedSlides + n / 2 ? (r.loopFix(), s = r.getSlideIndex(elementChildren(t, `${o}[data-swiper-slide-index="${i}"]`)[0]), nextTick(() => {
      r.slideTo(s);
    })) : r.slideTo(s) : s > r.slides.length - n ? (r.loopFix(), s = r.getSlideIndex(elementChildren(t, `${o}[data-swiper-slide-index="${i}"]`)[0]), nextTick(() => {
      r.slideTo(s);
    })) : r.slideTo(s);
  } else
    r.slideTo(s);
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
function loopCreate(r) {
  const e = this, {
    params: t,
    slidesEl: n
  } = e;
  if (!t.loop || e.virtual && e.params.virtual.enabled) return;
  const s = () => {
    elementChildren(n, `.${t.slideClass}, swiper-slide`).forEach((f, h) => {
      f.setAttribute("data-swiper-slide-index", h);
    });
  }, i = e.grid && t.grid && t.grid.rows > 1, o = t.slidesPerGroup * (i ? t.grid.rows : 1), l = e.slides.length % o !== 0, c = i && e.slides.length % t.grid.rows !== 0, d = (u) => {
    for (let f = 0; f < u; f += 1) {
      const h = e.isElement ? createElement("swiper-slide", [t.slideBlankClass]) : createElement("div", [t.slideClass, t.slideBlankClass]);
      e.slidesEl.append(h);
    }
  };
  if (l) {
    if (t.loopAddBlankSlides) {
      const u = o - e.slides.length % o;
      d(u), e.recalcSlides(), e.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    s();
  } else if (c) {
    if (t.loopAddBlankSlides) {
      const u = t.grid.rows - e.slides.length % t.grid.rows;
      d(u), e.recalcSlides(), e.updateSlides();
    } else
      showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
    s();
  } else
    s();
  e.loopFix({
    slideRealIndex: r,
    direction: t.centeredSlides ? void 0 : "next"
  });
}
function loopFix(r) {
  let {
    slideRealIndex: e,
    slideTo: t = !0,
    direction: n,
    setTranslate: s,
    activeSlideIndex: i,
    byController: o,
    byMousewheel: l
  } = r === void 0 ? {} : r;
  const c = this;
  if (!c.params.loop) return;
  c.emit("beforeLoopFix");
  const {
    slides: d,
    allowSlidePrev: u,
    allowSlideNext: f,
    slidesEl: h,
    params: _
  } = c, {
    centeredSlides: g
  } = _;
  if (c.allowSlidePrev = !0, c.allowSlideNext = !0, c.virtual && _.virtual.enabled) {
    t && (!_.centeredSlides && c.snapIndex === 0 ? c.slideTo(c.virtual.slides.length, 0, !1, !0) : _.centeredSlides && c.snapIndex < _.slidesPerView ? c.slideTo(c.virtual.slides.length + c.snapIndex, 0, !1, !0) : c.snapIndex === c.snapGrid.length - 1 && c.slideTo(c.virtual.slidesBefore, 0, !1, !0)), c.allowSlidePrev = u, c.allowSlideNext = f, c.emit("loopFix");
    return;
  }
  let m = _.slidesPerView;
  m === "auto" ? m = c.slidesPerViewDynamic() : (m = Math.ceil(parseFloat(_.slidesPerView, 10)), g && m % 2 === 0 && (m = m + 1));
  const v = _.slidesPerGroupAuto ? m : _.slidesPerGroup;
  let y = v;
  y % v !== 0 && (y += v - y % v), y += _.loopAdditionalSlides, c.loopedSlides = y;
  const b = c.grid && _.grid && _.grid.rows > 1;
  d.length < m + y ? showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters") : b && _.grid.fill === "row" && showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
  const w = [], T = [];
  let E = c.activeIndex;
  typeof i > "u" ? i = c.getSlideIndex(d.filter((x) => x.classList.contains(_.slideActiveClass))[0]) : E = i;
  const k = n === "next" || !n, C = n === "prev" || !n;
  let $ = 0, L = 0;
  const S = b ? Math.ceil(d.length / _.grid.rows) : d.length, P = (b ? d[i].column : i) + (g && typeof s > "u" ? -m / 2 + 0.5 : 0);
  if (P < y) {
    $ = Math.max(y - P, v);
    for (let x = 0; x < y - P; x += 1) {
      const R = x - Math.floor(x / S) * S;
      if (b) {
        const I = S - R - 1;
        for (let O = d.length - 1; O >= 0; O -= 1)
          d[O].column === I && w.push(O);
      } else
        w.push(S - R - 1);
    }
  } else if (P + m > S - y) {
    L = Math.max(P - (S - y * 2), v);
    for (let x = 0; x < L; x += 1) {
      const R = x - Math.floor(x / S) * S;
      b ? d.forEach((I, O) => {
        I.column === R && T.push(O);
      }) : T.push(R);
    }
  }
  if (c.__preventObserver__ = !0, requestAnimationFrame(() => {
    c.__preventObserver__ = !1;
  }), C && w.forEach((x) => {
    d[x].swiperLoopMoveDOM = !0, h.prepend(d[x]), d[x].swiperLoopMoveDOM = !1;
  }), k && T.forEach((x) => {
    d[x].swiperLoopMoveDOM = !0, h.append(d[x]), d[x].swiperLoopMoveDOM = !1;
  }), c.recalcSlides(), _.slidesPerView === "auto" ? c.updateSlides() : b && (w.length > 0 && C || T.length > 0 && k) && c.slides.forEach((x, R) => {
    c.grid.updateSlide(R, x, c.slides);
  }), _.watchSlidesProgress && c.updateSlidesOffset(), t) {
    if (w.length > 0 && C) {
      if (typeof e > "u") {
        const x = c.slidesGrid[E], I = c.slidesGrid[E + $] - x;
        l ? c.setTranslate(c.translate - I) : (c.slideTo(E + Math.ceil($), 0, !1, !0), s && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - I, c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - I));
      } else if (s) {
        const x = b ? w.length / _.grid.rows : w.length;
        c.slideTo(c.activeIndex + x, 0, !1, !0), c.touchEventsData.currentTranslate = c.translate;
      }
    } else if (T.length > 0 && k)
      if (typeof e > "u") {
        const x = c.slidesGrid[E], I = c.slidesGrid[E - L] - x;
        l ? c.setTranslate(c.translate - I) : (c.slideTo(E - L, 0, !1, !0), s && (c.touchEventsData.startTranslate = c.touchEventsData.startTranslate - I, c.touchEventsData.currentTranslate = c.touchEventsData.currentTranslate - I));
      } else {
        const x = b ? T.length / _.grid.rows : T.length;
        c.slideTo(c.activeIndex - x, 0, !1, !0);
      }
  }
  if (c.allowSlidePrev = u, c.allowSlideNext = f, c.controller && c.controller.control && !o) {
    const x = {
      slideRealIndex: e,
      direction: n,
      setTranslate: s,
      activeSlideIndex: i,
      byController: !0
    };
    Array.isArray(c.controller.control) ? c.controller.control.forEach((R) => {
      !R.destroyed && R.params.loop && R.loopFix({
        ...x,
        slideTo: R.params.slidesPerView === _.slidesPerView ? t : !1
      });
    }) : c.controller.control instanceof c.constructor && c.controller.control.params.loop && c.controller.control.loopFix({
      ...x,
      slideTo: c.controller.control.params.slidesPerView === _.slidesPerView ? t : !1
    });
  }
  c.emit("loopFix");
}
function loopDestroy() {
  const r = this, {
    params: e,
    slidesEl: t
  } = r;
  if (!e.loop || r.virtual && r.params.virtual.enabled) return;
  r.recalcSlides();
  const n = [];
  r.slides.forEach((s) => {
    const i = typeof s.swiperSlideIndex > "u" ? s.getAttribute("data-swiper-slide-index") * 1 : s.swiperSlideIndex;
    n[i] = s;
  }), r.slides.forEach((s) => {
    s.removeAttribute("data-swiper-slide-index");
  }), n.forEach((s) => {
    t.append(s);
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
  function t(n) {
    if (!n || n === getDocument() || n === getWindow()) return null;
    n.assignedSlot && (n = n.assignedSlot);
    const s = n.closest(r);
    return !s && !n.getRootNode ? null : s || t(n.getRootNode().host);
  }
  return t(e);
}
function preventEdgeSwipe(r, e, t) {
  const n = getWindow(), {
    params: s
  } = r, i = s.edgeSwipeDetection, o = s.edgeSwipeThreshold;
  return i && (t <= o || t >= n.innerWidth - o) ? i === "prevent" ? (e.preventDefault(), !0) : !1 : !0;
}
function onTouchStart(r) {
  const e = this, t = getDocument();
  let n = r;
  n.originalEvent && (n = n.originalEvent);
  const s = e.touchEventsData;
  if (n.type === "pointerdown") {
    if (s.pointerId !== null && s.pointerId !== n.pointerId)
      return;
    s.pointerId = n.pointerId;
  } else n.type === "touchstart" && n.targetTouches.length === 1 && (s.touchId = n.targetTouches[0].identifier);
  if (n.type === "touchstart") {
    preventEdgeSwipe(e, n, n.targetTouches[0].pageX);
    return;
  }
  const {
    params: i,
    touches: o,
    enabled: l
  } = e;
  if (!l || !i.simulateTouch && n.pointerType === "mouse" || e.animating && i.preventInteractionOnTransition)
    return;
  !e.animating && i.cssMode && i.loop && e.loopFix();
  let c = n.target;
  if (i.touchEventsTarget === "wrapper" && !elementIsChildOf(c, e.wrapperEl) || "which" in n && n.which === 3 || "button" in n && n.button > 0 || s.isTouched && s.isMoved) return;
  const d = !!i.noSwipingClass && i.noSwipingClass !== "", u = n.composedPath ? n.composedPath() : n.path;
  d && n.target && n.target.shadowRoot && u && (c = u[0]);
  const f = i.noSwipingSelector ? i.noSwipingSelector : `.${i.noSwipingClass}`, h = !!(n.target && n.target.shadowRoot);
  if (i.noSwiping && (h ? closestElement(f, c) : c.closest(f))) {
    e.allowClick = !0;
    return;
  }
  if (i.swipeHandler && !c.closest(i.swipeHandler))
    return;
  o.currentX = n.pageX, o.currentY = n.pageY;
  const _ = o.currentX, g = o.currentY;
  if (!preventEdgeSwipe(e, n, _))
    return;
  Object.assign(s, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0
  }), o.startX = _, o.startY = g, s.touchStartTime = now(), e.allowClick = !0, e.updateSize(), e.swipeDirection = void 0, i.threshold > 0 && (s.allowThresholdMove = !1);
  let m = !0;
  c.matches(s.focusableElements) && (m = !1, c.nodeName === "SELECT" && (s.isTouched = !1)), t.activeElement && t.activeElement.matches(s.focusableElements) && t.activeElement !== c && (n.pointerType === "mouse" || n.pointerType !== "mouse" && !c.matches(s.focusableElements)) && t.activeElement.blur();
  const v = m && e.allowTouchMove && i.touchStartPreventDefault;
  (i.touchStartForcePreventDefault || v) && !c.isContentEditable && n.preventDefault(), i.freeMode && i.freeMode.enabled && e.freeMode && e.animating && !i.cssMode && e.freeMode.onTouchStart(), e.emit("touchStart", n);
}
function onTouchMove(r) {
  const e = getDocument(), t = this, n = t.touchEventsData, {
    params: s,
    touches: i,
    rtlTranslate: o,
    enabled: l
  } = t;
  if (!l || !s.simulateTouch && r.pointerType === "mouse") return;
  let c = r;
  if (c.originalEvent && (c = c.originalEvent), c.type === "pointermove" && (n.touchId !== null || c.pointerId !== n.pointerId))
    return;
  let d;
  if (c.type === "touchmove") {
    if (d = [...c.changedTouches].filter((E) => E.identifier === n.touchId)[0], !d || d.identifier !== n.touchId) return;
  } else
    d = c;
  if (!n.isTouched) {
    n.startMoving && n.isScrolling && t.emit("touchMoveOpposite", c);
    return;
  }
  const u = d.pageX, f = d.pageY;
  if (c.preventedByNestedSwiper) {
    i.startX = u, i.startY = f;
    return;
  }
  if (!t.allowTouchMove) {
    c.target.matches(n.focusableElements) || (t.allowClick = !1), n.isTouched && (Object.assign(i, {
      startX: u,
      startY: f,
      currentX: u,
      currentY: f
    }), n.touchStartTime = now());
    return;
  }
  if (s.touchReleaseOnEdges && !s.loop) {
    if (t.isVertical()) {
      if (f < i.startY && t.translate <= t.maxTranslate() || f > i.startY && t.translate >= t.minTranslate()) {
        n.isTouched = !1, n.isMoved = !1;
        return;
      }
    } else if (u < i.startX && t.translate <= t.maxTranslate() || u > i.startX && t.translate >= t.minTranslate())
      return;
  }
  if (e.activeElement && e.activeElement.matches(n.focusableElements) && e.activeElement !== c.target && c.pointerType !== "mouse" && e.activeElement.blur(), e.activeElement && c.target === e.activeElement && c.target.matches(n.focusableElements)) {
    n.isMoved = !0, t.allowClick = !1;
    return;
  }
  n.allowTouchCallbacks && t.emit("touchMove", c), i.previousX = i.currentX, i.previousY = i.currentY, i.currentX = u, i.currentY = f;
  const h = i.currentX - i.startX, _ = i.currentY - i.startY;
  if (t.params.threshold && Math.sqrt(h ** 2 + _ ** 2) < t.params.threshold) return;
  if (typeof n.isScrolling > "u") {
    let E;
    t.isHorizontal() && i.currentY === i.startY || t.isVertical() && i.currentX === i.startX ? n.isScrolling = !1 : h * h + _ * _ >= 25 && (E = Math.atan2(Math.abs(_), Math.abs(h)) * 180 / Math.PI, n.isScrolling = t.isHorizontal() ? E > s.touchAngle : 90 - E > s.touchAngle);
  }
  if (n.isScrolling && t.emit("touchMoveOpposite", c), typeof n.startMoving > "u" && (i.currentX !== i.startX || i.currentY !== i.startY) && (n.startMoving = !0), n.isScrolling || c.type === "touchmove" && n.preventTouchMoveFromPointerMove) {
    n.isTouched = !1;
    return;
  }
  if (!n.startMoving)
    return;
  t.allowClick = !1, !s.cssMode && c.cancelable && c.preventDefault(), s.touchMoveStopPropagation && !s.nested && c.stopPropagation();
  let g = t.isHorizontal() ? h : _, m = t.isHorizontal() ? i.currentX - i.previousX : i.currentY - i.previousY;
  s.oneWayMovement && (g = Math.abs(g) * (o ? 1 : -1), m = Math.abs(m) * (o ? 1 : -1)), i.diff = g, g *= s.touchRatio, o && (g = -g, m = -m);
  const v = t.touchesDirection;
  t.swipeDirection = g > 0 ? "prev" : "next", t.touchesDirection = m > 0 ? "prev" : "next";
  const y = t.params.loop && !s.cssMode, b = t.touchesDirection === "next" && t.allowSlideNext || t.touchesDirection === "prev" && t.allowSlidePrev;
  if (!n.isMoved) {
    if (y && b && t.loopFix({
      direction: t.swipeDirection
    }), n.startTranslate = t.getTranslate(), t.setTransition(0), t.animating) {
      const E = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
        detail: {
          bySwiperTouchMove: !0
        }
      });
      t.wrapperEl.dispatchEvent(E);
    }
    n.allowMomentumBounce = !1, s.grabCursor && (t.allowSlideNext === !0 || t.allowSlidePrev === !0) && t.setGrabCursor(!0), t.emit("sliderFirstMove", c);
  }
  if ((/* @__PURE__ */ new Date()).getTime(), n.isMoved && n.allowThresholdMove && v !== t.touchesDirection && y && b && Math.abs(g) >= 1) {
    Object.assign(i, {
      startX: u,
      startY: f,
      currentX: u,
      currentY: f,
      startTranslate: n.currentTranslate
    }), n.loopSwapReset = !0, n.startTranslate = n.currentTranslate;
    return;
  }
  t.emit("sliderMove", c), n.isMoved = !0, n.currentTranslate = g + n.startTranslate;
  let w = !0, T = s.resistanceRatio;
  if (s.touchReleaseOnEdges && (T = 0), g > 0 ? (y && b && n.allowThresholdMove && n.currentTranslate > (s.centeredSlides ? t.minTranslate() - t.slidesSizesGrid[t.activeIndex + 1] - (s.slidesPerView !== "auto" && t.slides.length - s.slidesPerView >= 2 ? t.slidesSizesGrid[t.activeIndex + 1] + t.params.spaceBetween : 0) - t.params.spaceBetween : t.minTranslate()) && t.loopFix({
    direction: "prev",
    setTranslate: !0,
    activeSlideIndex: 0
  }), n.currentTranslate > t.minTranslate() && (w = !1, s.resistance && (n.currentTranslate = t.minTranslate() - 1 + (-t.minTranslate() + n.startTranslate + g) ** T))) : g < 0 && (y && b && n.allowThresholdMove && n.currentTranslate < (s.centeredSlides ? t.maxTranslate() + t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween + (s.slidesPerView !== "auto" && t.slides.length - s.slidesPerView >= 2 ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] + t.params.spaceBetween : 0) : t.maxTranslate()) && t.loopFix({
    direction: "next",
    setTranslate: !0,
    activeSlideIndex: t.slides.length - (s.slidesPerView === "auto" ? t.slidesPerViewDynamic() : Math.ceil(parseFloat(s.slidesPerView, 10)))
  }), n.currentTranslate < t.maxTranslate() && (w = !1, s.resistance && (n.currentTranslate = t.maxTranslate() + 1 - (t.maxTranslate() - n.startTranslate - g) ** T))), w && (c.preventedByNestedSwiper = !0), !t.allowSlideNext && t.swipeDirection === "next" && n.currentTranslate < n.startTranslate && (n.currentTranslate = n.startTranslate), !t.allowSlidePrev && t.swipeDirection === "prev" && n.currentTranslate > n.startTranslate && (n.currentTranslate = n.startTranslate), !t.allowSlidePrev && !t.allowSlideNext && (n.currentTranslate = n.startTranslate), s.threshold > 0)
    if (Math.abs(g) > s.threshold || n.allowThresholdMove) {
      if (!n.allowThresholdMove) {
        n.allowThresholdMove = !0, i.startX = i.currentX, i.startY = i.currentY, n.currentTranslate = n.startTranslate, i.diff = t.isHorizontal() ? i.currentX - i.startX : i.currentY - i.startY;
        return;
      }
    } else {
      n.currentTranslate = n.startTranslate;
      return;
    }
  !s.followFinger || s.cssMode || ((s.freeMode && s.freeMode.enabled && t.freeMode || s.watchSlidesProgress) && (t.updateActiveIndex(), t.updateSlidesClasses()), s.freeMode && s.freeMode.enabled && t.freeMode && t.freeMode.onTouchMove(), t.updateProgress(n.currentTranslate), t.setTranslate(n.currentTranslate));
}
function onTouchEnd(r) {
  const e = this, t = e.touchEventsData;
  let n = r;
  n.originalEvent && (n = n.originalEvent);
  let s;
  if (n.type === "touchend" || n.type === "touchcancel") {
    if (s = [...n.changedTouches].filter((E) => E.identifier === t.touchId)[0], !s || s.identifier !== t.touchId) return;
  } else {
    if (t.touchId !== null || n.pointerId !== t.pointerId) return;
    s = n;
  }
  if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(n.type) && !(["pointercancel", "contextmenu"].includes(n.type) && (e.browser.isSafari || e.browser.isWebView)))
    return;
  t.pointerId = null, t.touchId = null;
  const {
    params: o,
    touches: l,
    rtlTranslate: c,
    slidesGrid: d,
    enabled: u
  } = e;
  if (!u || !o.simulateTouch && n.pointerType === "mouse") return;
  if (t.allowTouchCallbacks && e.emit("touchEnd", n), t.allowTouchCallbacks = !1, !t.isTouched) {
    t.isMoved && o.grabCursor && e.setGrabCursor(!1), t.isMoved = !1, t.startMoving = !1;
    return;
  }
  o.grabCursor && t.isMoved && t.isTouched && (e.allowSlideNext === !0 || e.allowSlidePrev === !0) && e.setGrabCursor(!1);
  const f = now(), h = f - t.touchStartTime;
  if (e.allowClick) {
    const E = n.path || n.composedPath && n.composedPath();
    e.updateClickedSlide(E && E[0] || n.target, E), e.emit("tap click", n), h < 300 && f - t.lastClickTime < 300 && e.emit("doubleTap doubleClick", n);
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
  let m = 0, v = e.slidesSizesGrid[0];
  for (let E = 0; E < d.length; E += E < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
    const k = E < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
    typeof d[E + k] < "u" ? (g || _ >= d[E] && _ < d[E + k]) && (m = E, v = d[E + k] - d[E]) : (g || _ >= d[E]) && (m = E, v = d[d.length - 1] - d[d.length - 2]);
  }
  let y = null, b = null;
  o.rewind && (e.isBeginning ? b = o.virtual && o.virtual.enabled && e.virtual ? e.virtual.slides.length - 1 : e.slides.length - 1 : e.isEnd && (y = 0));
  const w = (_ - d[m]) / v, T = m < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
  if (h > o.longSwipesMs) {
    if (!o.longSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.swipeDirection === "next" && (w >= o.longSwipesRatio ? e.slideTo(o.rewind && e.isEnd ? y : m + T) : e.slideTo(m)), e.swipeDirection === "prev" && (w > 1 - o.longSwipesRatio ? e.slideTo(m + T) : b !== null && w < 0 && Math.abs(w) > o.longSwipesRatio ? e.slideTo(b) : e.slideTo(m));
  } else {
    if (!o.shortSwipes) {
      e.slideTo(e.activeIndex);
      return;
    }
    e.navigation && (n.target === e.navigation.nextEl || n.target === e.navigation.prevEl) ? n.target === e.navigation.nextEl ? e.slideTo(m + T) : e.slideTo(m) : (e.swipeDirection === "next" && e.slideTo(y !== null ? y : m + T), e.swipeDirection === "prev" && e.slideTo(b !== null ? b : m));
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
    allowSlideNext: n,
    allowSlidePrev: s,
    snapGrid: i
  } = r, o = r.virtual && r.params.virtual.enabled;
  r.allowSlideNext = !0, r.allowSlidePrev = !0, r.updateSize(), r.updateSlides(), r.updateSlidesClasses();
  const l = o && e.loop;
  (e.slidesPerView === "auto" || e.slidesPerView > 1) && r.isEnd && !r.isBeginning && !r.params.centeredSlides && !l ? r.slideTo(r.slides.length - 1, 0, !1, !0) : r.params.loop && !o ? r.slideToLoop(r.realIndex, 0, !1, !0) : r.slideTo(r.activeIndex, 0, !1, !0), r.autoplay && r.autoplay.running && r.autoplay.paused && (clearTimeout(r.autoplay.resizeTimeout), r.autoplay.resizeTimeout = setTimeout(() => {
    r.autoplay && r.autoplay.running && r.autoplay.paused && r.autoplay.resume();
  }, 500)), r.allowSlidePrev = s, r.allowSlideNext = n, r.params.watchOverflow && i !== r.snapGrid && r.checkOverflow();
}
function onClick(r) {
  const e = this;
  e.enabled && (e.allowClick || (e.params.preventClicks && r.preventDefault(), e.params.preventClicksPropagation && e.animating && (r.stopPropagation(), r.stopImmediatePropagation())));
}
function onScroll() {
  const r = this, {
    wrapperEl: e,
    rtlTranslate: t,
    enabled: n
  } = r;
  if (!n) return;
  r.previousTranslate = r.translate, r.isHorizontal() ? r.translate = -e.scrollLeft : r.translate = -e.scrollTop, r.translate === 0 && (r.translate = 0), r.updateActiveIndex(), r.updateSlidesClasses();
  let s;
  const i = r.maxTranslate() - r.minTranslate();
  i === 0 ? s = 0 : s = (r.translate - r.minTranslate()) / i, s !== r.progress && r.updateProgress(t ? -r.translate : r.translate), r.emit("setTranslate", r.translate, !1);
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
    params: n,
    el: s,
    wrapperEl: i,
    device: o
  } = r, l = !!n.nested, c = e === "on" ? "addEventListener" : "removeEventListener", d = e;
  !s || typeof s == "string" || (t[c]("touchstart", r.onDocumentTouchStart, {
    passive: !1,
    capture: l
  }), s[c]("touchstart", r.onTouchStart, {
    passive: !1
  }), s[c]("pointerdown", r.onTouchStart, {
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
  }), (n.preventClicks || n.preventClicksPropagation) && s[c]("click", r.onClick, !0), n.cssMode && i[c]("scroll", r.onScroll), n.updateOnWindowResize ? r[d](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, !0) : r[d]("observerUpdate", onResize, !0), s[c]("load", r.onLoad, {
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
    params: n,
    el: s
  } = r, i = n.breakpoints;
  if (!i || i && Object.keys(i).length === 0) return;
  const o = r.getBreakpoint(i, r.params.breakpointsBase, r.el);
  if (!o || r.currentBreakpoint === o) return;
  const c = (o in i ? i[o] : void 0) || r.originalParams, d = isGridEnabled(r, n), u = isGridEnabled(r, c), f = r.params.grabCursor, h = c.grabCursor, _ = n.enabled;
  d && !u ? (s.classList.remove(`${n.containerModifierClass}grid`, `${n.containerModifierClass}grid-column`), r.emitContainerClasses()) : !d && u && (s.classList.add(`${n.containerModifierClass}grid`), (c.grid.fill && c.grid.fill === "column" || !c.grid.fill && n.grid.fill === "column") && s.classList.add(`${n.containerModifierClass}grid-column`), r.emitContainerClasses()), f && !h ? r.unsetGrabCursor() : !f && h && r.setGrabCursor(), ["navigation", "pagination", "scrollbar"].forEach((w) => {
    if (typeof c[w] > "u") return;
    const T = n[w] && n[w].enabled, E = c[w] && c[w].enabled;
    T && !E && r[w].disable(), !T && E && r[w].enable();
  });
  const g = c.direction && c.direction !== n.direction, m = n.loop && (c.slidesPerView !== n.slidesPerView || g), v = n.loop;
  g && t && r.changeDirection(), extend(r.params, c);
  const y = r.params.enabled, b = r.params.loop;
  Object.assign(r, {
    allowTouchMove: r.params.allowTouchMove,
    allowSlideNext: r.params.allowSlideNext,
    allowSlidePrev: r.params.allowSlidePrev
  }), _ && !y ? r.disable() : !_ && y && r.enable(), r.currentBreakpoint = o, r.emit("_beforeBreakpoint", c), t && (m ? (r.loopDestroy(), r.loopCreate(e), r.updateSlides()) : !v && b ? (r.loopCreate(e), r.updateSlides()) : v && !b && r.loopDestroy()), r.emit("breakpoint", c);
}
function getBreakpoint(r, e, t) {
  if (e === void 0 && (e = "window"), !r || e === "container" && !t) return;
  let n = !1;
  const s = getWindow(), i = e === "window" ? s.innerHeight : t.clientHeight, o = Object.keys(r).map((l) => {
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
      value: d
    } = o[l];
    e === "window" ? s.matchMedia(`(min-width: ${d}px)`).matches && (n = c) : d <= t.clientWidth && (n = c);
  }
  return n || "max";
}
var breakpoints = {
  setBreakpoint,
  getBreakpoint
};
function prepareClasses(r, e) {
  const t = [];
  return r.forEach((n) => {
    typeof n == "object" ? Object.keys(n).forEach((s) => {
      n[s] && t.push(e + s);
    }) : typeof n == "string" && t.push(e + n);
  }), t;
}
function addClasses() {
  const r = this, {
    classNames: e,
    params: t,
    rtl: n,
    el: s,
    device: i
  } = r, o = prepareClasses(["initialized", t.direction, {
    "free-mode": r.params.freeMode && t.freeMode.enabled
  }, {
    autoheight: t.autoHeight
  }, {
    rtl: n
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
  e.push(...o), s.classList.add(...e), r.emitContainerClasses();
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
    slidesOffsetBefore: n
  } = t;
  if (n) {
    const s = r.slides.length - 1, i = r.slidesGrid[s] + r.slidesSizesGrid[s] + n * 2;
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
  return function(n) {
    n === void 0 && (n = {});
    const s = Object.keys(n)[0], i = n[s];
    if (typeof i != "object" || i === null) {
      extend(e, n);
      return;
    }
    if (r[s] === !0 && (r[s] = {
      enabled: !0
    }), s === "navigation" && r[s] && r[s].enabled && !r[s].prevEl && !r[s].nextEl && (r[s].auto = !0), ["pagination", "scrollbar"].indexOf(s) >= 0 && r[s] && r[s].enabled && !r[s].el && (r[s].auto = !0), !(s in r && "enabled" in i)) {
      extend(e, n);
      return;
    }
    typeof r[s] == "object" && !("enabled" in r[s]) && (r[s].enabled = !0), r[s] || (r[s] = {
      enabled: !1
    }), extend(e, n);
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
    for (var n = arguments.length, s = new Array(n), i = 0; i < n; i++)
      s[i] = arguments[i];
    s.length === 1 && s[0].constructor && Object.prototype.toString.call(s[0]).slice(8, -1) === "Object" ? t = s[0] : [e, t] = s, t || (t = {}), t = extend({}, t), e && !t.el && (t.el = e);
    const o = getDocument();
    if (t.el && typeof t.el == "string" && o.querySelectorAll(t.el).length > 1) {
      const u = [];
      return o.querySelectorAll(t.el).forEach((f) => {
        const h = extend({}, t, {
          el: f
        });
        u.push(new Swiper(h));
      }), u;
    }
    const l = this;
    l.__swiper__ = !0, l.support = getSupport(), l.device = getDevice({
      userAgent: t.userAgent
    }), l.browser = getBrowser(), l.eventsListeners = {}, l.eventsAnyListeners = [], l.modules = [...l.__modules__], t.modules && Array.isArray(t.modules) && l.modules.push(...t.modules);
    const c = {};
    l.modules.forEach((u) => {
      u({
        params: t,
        swiper: l,
        extendParams: moduleExtendParams(t, c),
        on: l.on.bind(l),
        once: l.once.bind(l),
        off: l.off.bind(l),
        emit: l.emit.bind(l)
      });
    });
    const d = extend({}, defaults, c);
    return l.params = extend({}, d, extendedDefaults, t), l.originalParams = extend({}, l.params), l.passedParams = extend({}, t), l.params && l.params.on && Object.keys(l.params.on).forEach((u) => {
      l.on(u, l.params.on[u]);
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
      params: n
    } = this, s = elementChildren(t, `.${n.slideClass}, swiper-slide`), i = elementIndex(s[0]);
    return elementIndex(e) - i;
  }
  getSlideIndexByData(e) {
    return this.getSlideIndex(this.slides.filter((t) => t.getAttribute("data-swiper-slide-index") * 1 === e)[0]);
  }
  recalcSlides() {
    const e = this, {
      slidesEl: t,
      params: n
    } = e;
    e.slides = elementChildren(t, `.${n.slideClass}, swiper-slide`);
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
    const n = this;
    e = Math.min(Math.max(e, 0), 1);
    const s = n.minTranslate(), o = (n.maxTranslate() - s) * e + s;
    n.translateTo(o, typeof t > "u" ? 0 : t), n.updateActiveIndex(), n.updateSlidesClasses();
  }
  emitContainerClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = e.el.className.split(" ").filter((n) => n.indexOf("swiper") === 0 || n.indexOf(e.params.containerModifierClass) === 0);
    e.emit("_containerClasses", t.join(" "));
  }
  getSlideClasses(e) {
    const t = this;
    return t.destroyed ? "" : e.className.split(" ").filter((n) => n.indexOf("swiper-slide") === 0 || n.indexOf(t.params.slideClass) === 0).join(" ");
  }
  emitSlidesClasses() {
    const e = this;
    if (!e.params._emitClasses || !e.el) return;
    const t = [];
    e.slides.forEach((n) => {
      const s = e.getSlideClasses(n);
      t.push({
        slideEl: n,
        classNames: s
      }), e.emit("_slideClass", n, s);
    }), e.emit("_slideClasses", t);
  }
  slidesPerViewDynamic(e, t) {
    e === void 0 && (e = "current"), t === void 0 && (t = !1);
    const n = this, {
      params: s,
      slides: i,
      slidesGrid: o,
      slidesSizesGrid: l,
      size: c,
      activeIndex: d
    } = n;
    let u = 1;
    if (typeof s.slidesPerView == "number") return s.slidesPerView;
    if (s.centeredSlides) {
      let f = i[d] ? Math.ceil(i[d].swiperSlideSize) : 0, h;
      for (let _ = d + 1; _ < i.length; _ += 1)
        i[_] && !h && (f += Math.ceil(i[_].swiperSlideSize), u += 1, f > c && (h = !0));
      for (let _ = d - 1; _ >= 0; _ -= 1)
        i[_] && !h && (f += i[_].swiperSlideSize, u += 1, f > c && (h = !0));
    } else if (e === "current")
      for (let f = d + 1; f < i.length; f += 1)
        (t ? o[f] + l[f] - o[d] < c : o[f] - o[d] < c) && (u += 1);
    else
      for (let f = d - 1; f >= 0; f -= 1)
        o[d] - o[f] < c && (u += 1);
    return u;
  }
  update() {
    const e = this;
    if (!e || e.destroyed) return;
    const {
      snapGrid: t,
      params: n
    } = e;
    n.breakpoints && e.setBreakpoint(), [...e.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
      o.complete && processLazyPreloader(e, o);
    }), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses();
    function s() {
      const o = e.rtlTranslate ? e.translate * -1 : e.translate, l = Math.min(Math.max(o, e.maxTranslate()), e.minTranslate());
      e.setTranslate(l), e.updateActiveIndex(), e.updateSlidesClasses();
    }
    let i;
    if (n.freeMode && n.freeMode.enabled && !n.cssMode)
      s(), n.autoHeight && e.updateAutoHeight();
    else {
      if ((n.slidesPerView === "auto" || n.slidesPerView > 1) && e.isEnd && !n.centeredSlides) {
        const o = e.virtual && n.virtual.enabled ? e.virtual.slides : e.slides;
        i = e.slideTo(o.length - 1, 0, !1, !0);
      } else
        i = e.slideTo(e.activeIndex, 0, !1, !0);
      i || s();
    }
    n.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update");
  }
  changeDirection(e, t) {
    t === void 0 && (t = !0);
    const n = this, s = n.params.direction;
    return e || (e = s === "horizontal" ? "vertical" : "horizontal"), e === s || e !== "horizontal" && e !== "vertical" || (n.el.classList.remove(`${n.params.containerModifierClass}${s}`), n.el.classList.add(`${n.params.containerModifierClass}${e}`), n.emitContainerClasses(), n.params.direction = e, n.slides.forEach((i) => {
      e === "vertical" ? i.style.width = "" : i.style.height = "";
    }), n.emit("changeDirection"), t && n.update()), n;
  }
  changeLanguageDirection(e) {
    const t = this;
    t.rtl && e === "rtl" || !t.rtl && e === "ltr" || (t.rtl = e === "rtl", t.rtlTranslate = t.params.direction === "horizontal" && t.rtl, t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`), t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`), t.el.dir = "ltr"), t.update());
  }
  mount(e) {
    const t = this;
    if (t.mounted) return !0;
    let n = e || t.params.el;
    if (typeof n == "string" && (n = document.querySelector(n)), !n)
      return !1;
    n.swiper = t, n.parentNode && n.parentNode.host && n.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
    const s = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let o = n && n.shadowRoot && n.shadowRoot.querySelector ? n.shadowRoot.querySelector(s()) : elementChildren(n, s())[0];
    return !o && t.params.createElements && (o = createElement("div", t.params.wrapperClass), n.append(o), elementChildren(n, `.${t.params.slideClass}`).forEach((l) => {
      o.append(l);
    })), Object.assign(t, {
      el: n,
      wrapperEl: o,
      slidesEl: t.isElement && !n.parentNode.host.slideSlots ? n.parentNode.host : o,
      hostEl: t.isElement ? n.parentNode.host : n,
      mounted: !0,
      // RTL
      rtl: n.dir.toLowerCase() === "rtl" || elementStyle(n, "direction") === "rtl",
      rtlTranslate: t.params.direction === "horizontal" && (n.dir.toLowerCase() === "rtl" || elementStyle(n, "direction") === "rtl"),
      wrongRTL: elementStyle(o, "display") === "-webkit-box"
    }), !0;
  }
  init(e) {
    const t = this;
    if (t.initialized || t.mount(e) === !1) return t;
    t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.params.loop && t.loopCreate(), t.attachEvents();
    const s = [...t.el.querySelectorAll('[loading="lazy"]')];
    return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')), s.forEach((i) => {
      i.complete ? processLazyPreloader(t, i) : i.addEventListener("load", (o) => {
        processLazyPreloader(t, o.target);
      });
    }), preload(t), t.initialized = !0, preload(t), t.emit("init"), t.emit("afterInit"), t;
  }
  destroy(e, t) {
    e === void 0 && (e = !0), t === void 0 && (t = !0);
    const n = this, {
      params: s,
      el: i,
      wrapperEl: o,
      slides: l
    } = n;
    return typeof n.params > "u" || n.destroyed || (n.emit("beforeDestroy"), n.initialized = !1, n.detachEvents(), s.loop && n.loopDestroy(), t && (n.removeClasses(), i && typeof i != "string" && i.removeAttribute("style"), o && o.removeAttribute("style"), l && l.length && l.forEach((c) => {
      c.classList.remove(s.slideVisibleClass, s.slideFullyVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass), c.removeAttribute("style"), c.removeAttribute("data-swiper-slide-index");
    })), n.emit("destroy"), Object.keys(n.eventsListeners).forEach((c) => {
      n.off(c);
    }), e !== !1 && (n.el && typeof n.el != "string" && (n.el.swiper = null), deleteProps(n)), n.destroyed = !0), null;
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
  code: `figure.svelte-t4awvj {
  border-bottom: 1px solid black;
  margin: 12px 0;
  padding: 0 0 12px 0;
}
@media screen and (min-width: 1024px) {
  figure.svelte-t4awvj {
    margin: 24px 0;
    padding: 0 0 24px 0;
  }
}

section.svelte-t4awvj {
  margin-bottom: 40px;
}
@media screen and (min-width: 1024px) {
  section.svelte-t4awvj {
    margin-bottom: 60px;
  }
}

p.svelte-t4awvj {
  font-family: Monument Regular, sans-serif;
  opacity: 0.5;
  margin-bottom: 32px;
}`
};
function KnitterReviewsList(r, e) {
  push(e, !1), append_styles(r, $$css$9);
  let t = prop(e, "id", 12, void 0), n = prop(e, "isFetchBlock", 12, !1), s = mutable_state([]), i = mutable_state(!1), o = mutable_state(!1);
  const l = async () => {
    if (!t()) return console.error("No id provided");
    const { data: f, error: h } = await supabase.from("knitter_reviews").select("*").order("created_at", { ascending: !1 }).eq("knitter_id", t());
    f && (set(s, f.map((_) => ({ ..._, created_at: new Date(_.created_at) }))), setTimeout(() => set(i, !0)), set(o, !0));
  };
  legacy_pre_effect(
    () => (deep_read_state(n()), get$1(o)),
    () => {
      !n() && !get$1(o) && l();
    }
  ), legacy_pre_effect_reset(), init();
  var c = root$9(), d = first_child(c);
  TitleType(d, {
    children: (f, h) => {
      next();
      var _ = text("Customers feedback");
      append(f, _);
    },
    $$slots: { default: !0 }
  });
  var u = sibling(d, 2);
  return if_block(
    u,
    () => !get$1(i),
    (f) => {
      KnitterReviewsListSkeleton(f);
    },
    (f) => {
      var h = comment(), _ = first_child(h);
      if_block(
        _,
        () => get$1(s).length === 0,
        (g) => {
          var m = root_4();
          append(g, m);
        },
        (g) => {
          var m = root_5();
          each(m, 5, () => get$1(s), index, (v, y) => {
            var b = root_6$1(), w = child(b);
            KnitterReviewItem(w, {
              get review() {
                return get$1(y);
              }
            }), reset(b), append(v, b);
          }), reset(m), transition$1(3, m, () => fade), append(g, m);
        },
        !0
      ), append(f, h);
    }
  ), append(r, c), pop({
    get id() {
      return t();
    },
    set id(f) {
      t(f), flush_sync();
    },
    get isFetchBlock() {
      return n();
    },
    set isFetchBlock(f) {
      n(f), flush_sync();
    }
  });
}
create_custom_element(KnitterReviewsList, { id: {}, isFetchBlock: { type: "Boolean" } }, [], [], !0);
var root$8 = /* @__PURE__ */ template('<button class="svelte-ph9rtg"><!></button>');
const $$css$8 = {
  hash: "svelte-ph9rtg",
  code: `
	button.svelte-ph9rtg {
		width: 178px;
		height: 52px;
		background: #018849;
		cursor: pointer;
		border: none;
		color: #fff;
		font-family: Monument, sans-serif;
		font-size: 16px;
		letter-spacing: -0.25px;
		text-transform: uppercase;
		display: flex;
		align-items: center;
		word-break: keep-all;
		white-space: nowrap;
		justify-content: center;
	}

	.w-full.svelte-ph9rtg {
		width: 100%;
	}

	.disabled.svelte-ph9rtg {
		opacity: 0.5;
		cursor: default;
	}
`
};
function Button(r, e) {
  push(e, !1), append_styles(r, $$css$8);
  let t = prop(e, "fullWidth", 12, !1), n = prop(e, "disabled", 12, !1), s = prop(e, "type", 12, "button");
  var i = root$8(), o = child(i);
  return slot(o, e, "default", {}), reset(i), template_effect(() => {
    set_attribute(i, "type", s()), i.disabled = n(), toggle_class(i, "w-full", t()), toggle_class(i, "disabled", n());
  }), append(r, i), pop({
    get fullWidth() {
      return t();
    },
    set fullWidth(l) {
      t(l), flush_sync();
    },
    get disabled() {
      return n();
    },
    set disabled(l) {
      n(l), flush_sync();
    },
    get type() {
      return s();
    },
    set type(l) {
      s(l), flush_sync();
    }
  });
}
create_custom_element(
  Button,
  {
    fullWidth: { type: "Boolean" },
    disabled: { type: "Boolean" },
    type: {}
  },
  ["default"],
  [],
  !0
);
var root_3$1 = /* @__PURE__ */ template('<p class="error svelte-xo5t5q">There was an error submitting your message. Please try again later.</p>'), root_2$1 = /* @__PURE__ */ template('<form action="" class="svelte-xo5t5q"><textarea name="" id="" cols="30" rows="10 " placeholder="Enter your feedback here..." class="svelte-xo5t5q"></textarea> <div class="cta svelte-xo5t5q"><input type="text" placeholder="Enter your name..." class="svelte-xo5t5q"> <!> <!></div></form>'), root_6 = /* @__PURE__ */ template('<p class="success svelte-xo5t5q">Review submitted successfully!</p>'), root$7 = /* @__PURE__ */ template("<!> <!>", 1);
const $$css$7 = {
  hash: "svelte-xo5t5q",
  code: `input.svelte-xo5t5q {
  border: none;
  padding: 6px 16px;
  border-bottom: 1px solid black;
  width: 100%;
  font-size: 16px;
  margin: 12px 0;
  box-sizing: border-box;
  background: transparent;
  color: black;
}
input.svelte-xo5t5q:focus {
  outline: none;
}

/* (unused) h6 {
  font-size: 12px;
  font-family: "Monument Regular", sans-serif;
  text-transform: uppercase;
  letter-spacing: -0.24px;
  margin: 12px 0;
}*/

p.svelte-xo5t5q {
  font-family: "Monument Regular", sans-serif;
  padding: 8px 16px;
}
p.success.svelte-xo5t5q {
  background: #b0beb2;
}
p.error.svelte-xo5t5q {
  background: #f6a3a3;
}

textarea.svelte-xo5t5q {
  width: 100%;
  aspect-ratio: 4/1;
  border: 1px solid black;
  box-sizing: border-box;
  resize: none;
  background: transparent;
  padding: 12px 16px;
  font-family: "Monument Regular", sans-serif;
  font-size: 16px;
  color: black;
}
textarea.svelte-xo5t5q:focus {
  outline: none;
}
@media screen and (min-width: 1024px) {
  textarea.svelte-xo5t5q {
    aspect-ratio: 8/1;
    font-size: 16px;
  }
}

form.svelte-xo5t5q {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.cta.svelte-xo5t5q {
  width: 100%;
  gap: 12px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
}`
};
function KnitterReviewForm(r, e) {
  push(e, !1), append_styles(r, $$css$7);
  let t = prop(e, "id", 12, void 0), n = mutable_state(""), s = mutable_state(""), i = mutable_state("idle");
  const o = createEventDispatcher(), l = async () => {
    const { error: f } = await supabase.from("knitter_reviews").insert([
      {
        knitter_id: t(),
        body: get$1(s),
        created_by: get$1(n)
      }
    ]);
    f ? set(i, "error") : set(i, "success"), setTimeout(() => o("submit"));
  };
  init();
  var c = root$7(), d = first_child(c);
  TitleType(d, {
    children: (f, h) => {
      next();
      var _ = text("Leave a feedback");
      append(f, _);
    },
    $$slots: { default: !0 }
  });
  var u = sibling(d, 2);
  return if_block(
    u,
    () => get$1(i) === "idle" || get$1(i) === "error",
    (f) => {
      var h = root_2$1(), _ = child(h);
      remove_textarea_child(_);
      var g = sibling(_, 2), m = child(g);
      remove_input_defaults(m);
      var v = sibling(m, 2);
      if_block(v, () => get$1(i) === "error", (w) => {
        var T = root_3$1();
        append(w, T);
      });
      var y = sibling(v, 2), b = /* @__PURE__ */ derived_safe_equal(() => !get$1(s) || !get$1(n));
      Button(y, {
        type: "submit",
        fullWidth: !0,
        get disabled() {
          return get$1(b);
        },
        children: (w, T) => {
          next();
          var E = text("Leave a feedback");
          append(w, E);
        },
        $$slots: { default: !0 }
      }), reset(g), reset(h), bind_value(_, () => get$1(s), (w) => set(s, w)), bind_value(m, () => get$1(n), (w) => set(n, w)), event("submit", h, preventDefault(l)), append(f, h);
    },
    (f) => {
      var h = comment(), _ = first_child(h);
      if_block(
        _,
        () => get$1(i) === "success",
        (g) => {
          var m = root_6();
          append(g, m);
        },
        null,
        !0
      ), append(f, h);
    }
  ), append(r, c), pop({
    get id() {
      return t();
    },
    set id(f) {
      t(f), flush_sync();
    }
  });
}
create_custom_element(KnitterReviewForm, { id: {} }, [], [], !0);
var root$6 = /* @__PURE__ */ template('<p class="svelte-7fo9ce">↑</p>');
const $$css$6 = {
  hash: "svelte-7fo9ce",
  code: `p.svelte-7fo9ce {
  margin: 0;
  font-family: Monument, sans-serif;
  letter-spacing: -0.43px;
  color: #000;
}
@media (max-width: 812px) {
  p.svelte-7fo9ce {
    letter-spacing: -0.18px;
  }
}
@media (min-width: 320px) and (max-width: 480px) {
  p.svelte-7fo9ce {
    letter-spacing: -0.18px;
  }
}`
};
function ArrowIcon(r) {
  append_styles(r, $$css$6);
  var e = root$6();
  append(r, e);
}
create_custom_element(ArrowIcon, {}, [], [], !0);
var root_1$5 = /* @__PURE__ */ template('<div class="reviews svelte-pbk1c8"><!> <!></div>'), root$5 = /* @__PURE__ */ template('<div class="accordion svelte-pbk1c8"><div class="header grid svelte-pbk1c8"><img class="avatar svelte-pbk1c8"> <h3 class="svelte-pbk1c8"> </h3> <div class="arrow svelte-pbk1c8"><!></div></div> <div class="content grid svelte-pbk1c8"><p class="svelte-pbk1c8"> </p> <img class="photo svelte-pbk1c8"> <!></div></div>');
const $$css$5 = {
  hash: "svelte-pbk1c8",
  code: `.accordion.svelte-pbk1c8 {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
}

.fade-in.svelte-pbk1c8 {
  opacity: 1;
  transition: opacity 0.3s 0.3s linear;
}

.fade-out.svelte-pbk1c8 {
  opacity: 0;
  transition: opacity 0.2s ease;
}

.grid.svelte-pbk1c8 {
  display: grid;
  grid-template-columns: 65px 1fr 40px;
  align-items: center;
  gap: 25px;
}
@media screen and (min-width: 1024px) {
  .grid.svelte-pbk1c8 {
    gap: 40px;
    grid-template-columns: 124px 5fr 3fr 40px;
  }
}

.header.svelte-pbk1c8 {
  width: 100%;
  grid-template-areas: "avatar name arrow";
  cursor: pointer;
  user-select: none;
  position: relative;
  z-index: 1;
  padding: 12px 0;
}
@media screen and (min-width: 1024px) {
  .header.svelte-pbk1c8 {
    grid-template-areas: "avatar name name arrow";
    padding: 24px 0;
  }
}

.content.svelte-pbk1c8 {
  grid-template-rows: auto;
  grid-template-areas: "description description description" "photo photo photo" "reviews reviews reviews";
  overflow: hidden;
}
@media screen and (min-width: 1024px) {
  .content.svelte-pbk1c8 {
    transform: translateY(-144px);
    grid-template-areas: ". description photo ." ". reviews reviews .";
  }
}

.avatar.svelte-pbk1c8 {
  grid-area: avatar;
  border-radius: 100%;
  width: 65px;
  aspect-ratio: 1/1;
}
@media screen and (min-width: 1024px) {
  .avatar.svelte-pbk1c8 {
    width: 124px;
  }
}

h3.svelte-pbk1c8 {
  grid-area: name;
  font-family: Monument, sans-serif;
  color: black;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 16px;
  letter-spacing: -0.19px;
  line-height: 16px;
}
@media screen and (min-width: 1024px) {
  h3.svelte-pbk1c8 {
    font-size: 28px;
  }
}

.arrow.svelte-pbk1c8 {
  justify-self: flex-end;
  font-size: 16px;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  transform: rotate(-180deg);
}
.arrow---down.svelte-pbk1c8 {
  transform: rotate(0);
}
@media screen and (min-width: 1024px) {
  .arrow.svelte-pbk1c8 {
    font-size: 24px;
  }
}

p.svelte-pbk1c8 {
  grid-area: description;
  font-family: Monument Regular, sans-serif;
  font-size: 14px;
  letter-spacing: -0.22px;
  line-height: 20px;
  font-weight: 400;
  max-width: 600px;
  margin: 16px auto 12px;
  color: black;
  transform: translateZ(1px);
}
@media screen and (min-width: 1024px) {
  p.svelte-pbk1c8 {
    font-size: 20px;
    letter-spacing: -0.32px;
    line-height: 32px;
    padding-right: 40px;
    padding-top: 60px;
    padding-bottom: 60px;
    margin: 0px auto 18px;
  }
}

.photo.svelte-pbk1c8 {
  grid-area: photo;
  width: 100%;
  transform: translateZ(1px);
}

.reviews.svelte-pbk1c8 {
  grid-area: reviews;
  margin-bottom: 32px;
}`
};
function KnittersAccordionItem(r, e) {
  push(e, !1), append_styles(r, $$css$5);
  let t = prop(e, "name", 12, void 0), n = prop(e, "id", 12, void 0), s = prop(e, "description", 12, void 0), i = prop(e, "photo", 12, void 0), o = prop(e, "avatar", 12, void 0), l = !1, c = mutable_state(!1), d = mutable_state(!1), u = mutable_state(), f = mutable_state();
  const h = () => {
    set(c, !get$1(c));
  }, _ = (I = 150) => {
    if (!get$1(f)) return;
    const F = get$1(f).getBoundingClientRect().top + window.pageYOffset - I;
    window.scrollTo({ top: F, behavior: "smooth" });
  }, g = () => {
    set(d, !1), get$1(u) && (window.innerWidth >= 1024 && _(114), window.innerWidth < 1024 && _(52), mutate(u, get$1(u).style.maxHeight = "inherit"), get$1(u).removeEventListener("transitionend", g));
  }, m = () => {
    !get$1(c) || !get$1(u) || (set(d, !0), get$1(u).addEventListener("transitionend", g), setTimeout(() => {
      mutate(u, get$1(u).style.maxHeight = `${get$1(u).scrollHeight}px`), mutate(u, get$1(u).style.transition = "max-height .3s ease");
    }), l || (l = !0));
  }, v = () => {
    if (get$1(c) || !get$1(u)) return console.warn("No content element");
    set(d, !0), l && mutate(u, get$1(u).style.maxHeight = `${get$1(u).scrollHeight}px`), setTimeout(() => {
      mutate(u, get$1(u).style.maxHeight = "0px"), mutate(u, get$1(u).style.transition = "max-height .15s ease");
    }), l || (l = !0);
  }, y = () => {
  }, b = () => {
    const I = new URLSearchParams(window.location.search), { knitter: O } = Object.fromEntries(I.entries());
    O === n() && set(c, !0);
  };
  onMount(() => {
    get$1(c) ? m() : v(), b();
  }), legacy_pre_effect(() => get$1(c), () => {
    get$1(c) && m();
  }), legacy_pre_effect(() => get$1(c), () => {
    get$1(c) || v();
  }), legacy_pre_effect_reset(), init();
  var w = root$5();
  event("resize", $window, y), bind_this(w, (I) => set(f, I), () => get$1(f));
  var T = child(w), E = child(T), k = sibling(E, 2), C = child(k, !0);
  reset(k);
  var $ = sibling(k, 2), L = child($);
  ArrowIcon(L), reset($), reset(T);
  var S = sibling(T, 2);
  bind_this(S, (I) => set(u, I), () => get$1(u));
  var A = child(S), P = child(A, !0);
  reset(A);
  var x = sibling(A, 2), R = sibling(x, 2);
  return if_block(R, n, (I) => {
    var O = root_1$5(), F = child(O), B = /* @__PURE__ */ derived_safe_equal(() => !get$1(c) || get$1(d));
    KnitterReviewsList(F, {
      get id() {
        return n();
      },
      get isFetchBlock() {
        return get$1(B);
      }
    });
    var U = sibling(F, 2);
    KnitterReviewForm(U, {
      get id() {
        return n();
      }
    }), reset(O), template_effect(() => {
      toggle_class(O, "fade-in", get$1(c)), toggle_class(O, "fade-out", !get$1(c));
    }), append(I, O);
  }), reset(S), reset(w), template_effect(() => {
    set_attribute(E, "src", o()), set_attribute(E, "alt", `Small picture of ${t() ?? ""}`), set_text(C, t()), toggle_class($, "arrow---down", get$1(c)), toggle_class(A, "fade-in", get$1(c)), toggle_class(A, "fade-out", !get$1(c)), set_text(P, s()), set_attribute(x, "src", i()), set_attribute(x, "alt", `Picture of ${t() ?? ""}`), toggle_class(x, "fade-in", get$1(c)), toggle_class(x, "fade-out", !get$1(c));
  }), event("click", T, h), append(r, w), pop({
    get name() {
      return t();
    },
    set name(I) {
      t(I), flush_sync();
    },
    get id() {
      return n();
    },
    set id(I) {
      n(I), flush_sync();
    },
    get description() {
      return s();
    },
    set description(I) {
      s(I), flush_sync();
    },
    get photo() {
      return i();
    },
    set photo(I) {
      i(I), flush_sync();
    },
    get avatar() {
      return o();
    },
    set avatar(I) {
      o(I), flush_sync();
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
  code: `
	div.svelte-1sgbr3w {
		padding: 0 8px;

		@media screen and (min-width: 1024px) {
			padding: 0 25px;
		}
	}
`
};
function ContentWrapper(r, e) {
  append_styles(r, $$css$4);
  var t = root$4(), n = child(t);
  slot(n, e, "default", {}), reset(t), append(r, t);
}
create_custom_element(ContentWrapper, {}, ["default"], [], !0);
var root_1$4 = /* @__PURE__ */ template('<section class="title-section svelte-emjvyd"><h2 class="svelte-emjvyd">All Knitters</h2></section> <section class="list svelte-emjvyd"><!></section>', 1), root$3 = /* @__PURE__ */ template("<div><!></div>");
const $$css$3 = {
  hash: "svelte-emjvyd",
  code: `h2.svelte-emjvyd {
  font-size: 28px;
  letter-spacing: -0.43px;
  line-height: 18px;
  font-weight: 300;
  margin: 0;
}
@media screen and (min-width: 1024px) {
  h2.svelte-emjvyd {
    font-family: Panama, sans-serif;
    font-size: 62px;
    letter-spacing: -0.95px;
    line-height: 70px;
    color: #000;
  }
}

.title-section.svelte-emjvyd {
  height: 93px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
}
@media screen and (min-width: 1024px) {
  .title-section.svelte-emjvyd {
    height: 241px;
    justify-content: center;
  }
}

.list.svelte-emjvyd {
  display: flex;
  flex-direction: column;
}`
};
function KnittersAccordion(r, e) {
  push(e, !1), append_styles(r, $$css$3);
  let t = mutable_state("");
  onMount(() => {
    const o = new URLSearchParams(window.location.search), { knitter: l } = Object.fromEntries(o.entries());
    set(t, l);
  });
  const n = (o) => {
    const l = document.getElementById(o);
    l && l.scrollIntoView({ behavior: "smooth" });
  };
  legacy_pre_effect(() => get$1(t), () => {
    get$1(t) && n(get$1(t));
  }), legacy_pre_effect_reset(), init();
  var s = root$3(), i = child(s);
  ContentWrapper(i, {
    children: (o, l) => {
      var c = root_1$4(), d = sibling(first_child(c), 2), u = child(d);
      slot(u, e, "default", {}), reset(d), append(o, c);
    },
    $$slots: { default: !0 }
  }), reset(s), append(r, s), pop();
}
customElements.define("knitter-accordion", create_custom_element(KnittersAccordion, {}, ["default"], [], !0));
const setLocale = ({ country: r, language: e }) => {
  const t = crypto.randomUUID(), n = `
    <form id="${t}" action="/localization" method="POST" hidden>
      <input name="_method" value="PUT">
      <input name="country_code" value="${r}">
      <input name="language_code" value="${e}">
    </form>
  `;
  document.body.insertAdjacentHTML("beforeend", n);
  const s = document.getElementById(t);
  s == null || s.submit(), s == null || s.remove();
};
function expoOut(r) {
  return r === 1 ? r : 1 - Math.pow(2, -10 * r);
}
function sineIn(r) {
  const e = Math.cos(r * Math.PI * 0.5);
  return Math.abs(e) < 1e-14 ? 1 : 1 - e;
}
var root_1$3 = /* @__PURE__ */ template('<button class="main svelte-ymfpde"> </button>'), root_3 = /* @__PURE__ */ template('<li role="menuitem"><button class="menuitem svelte-ymfpde"> </button></li>'), root_2 = /* @__PURE__ */ template('<ul role="menu" class="svelte-ymfpde"></ul>'), root$2 = /* @__PURE__ */ template('<div class="wrapper svelte-ymfpde"><!> <div class="dropdown svelte-ymfpde"><!></div></div>');
const $$css$2 = {
  hash: "svelte-ymfpde",
  code: `.wrapper.svelte-ymfpde {
  display: inline-flex;
  position: relative;
}

button.main.svelte-ymfpde {
  background: transparent;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  width: max-content;
  font-weight: 600;
}

.dropdown.svelte-ymfpde {
  position: absolute;
  top: 100%;
  margin-top: 8px;
}
.dropdown.left.svelte-ymfpde {
  left: 0;
}
.dropdown.center.svelte-ymfpde {
  left: 50%;
  transform: translateX(-50%);
}
.dropdown.right.svelte-ymfpde {
  right: 0;
}

ul.svelte-ymfpde {
  list-style: none;
  padding: 0 0;
  width: max-content;
  margin: 0;
  border: 1px solid rgba(0, 0, 0, 0.01);
}

button.menuitem.svelte-ymfpde {
  background: transparent;
  border: none;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-weight: 600;
}
button.menuitem.svelte-ymfpde:hover {
  background: rgba(0, 0, 0, 0.05);
}`
};
function CurrencySelector(r, e) {
  push(e, !1), append_styles(r, $$css$2);
  function t(v, {
    y = 100,
    scale: b = 0.5,
    duration: w = 300,
    easing: T = sineIn
    // Try different easing functions
  }) {
    return {
      duration: w,
      easing: T,
      css: (E) => `
        transform: 
          scale(${b + (1 - b) * E})
          translateY(${(1 - E) * y}px);
        opacity: ${E};
      `
    };
  }
  let n = prop(e, "params", 12, void 0), s = prop(e, "available", 28, () => []), i = prop(e, "active", 12, void 0), o = prop(e, "left", 12, !0), l = prop(e, "center", 12, !1), c = prop(e, "right", 12, !1), d = prop(e, "bg", 12, "#eeeeea"), u = mutable_state(!1);
  const f = (v) => {
    i(v), set(u, !1), setLocale({
      country: v.country.toLowerCase(),
      language: "en"
    });
  };
  onMount(() => {
    if (!n()) return console.warn("DUMP no params found");
    try {
      const { available: v, active: y } = JSON.parse(n());
      s(v), i(y);
    } catch (v) {
      console.error(v);
    }
  }), init();
  var h = root$2(), _ = child(h);
  if_block(_, i, (v) => {
    var y = root_1$3(), b = child(y);
    reset(y), template_effect(() => set_text(b, `${i().symbol ?? ""} ${i().currency ?? ""}`)), event("click", y, () => set(u, !get$1(u))), append(v, y);
  });
  var g = sibling(_, 2), m = child(g);
  return if_block(m, () => get$1(u), (v) => {
    var y = root_2();
    each(y, 5, s, index, (b, w) => {
      var T = root_3(), E = child(T), k = child(E);
      reset(E), reset(T), template_effect(() => set_text(k, `${get$1(w).symbol ?? ""}
							${get$1(w).currency ?? ""}`)), event("click", E, () => f(get$1(w))), append(b, T);
    }), reset(y), template_effect(() => set_attribute(y, "style", `background: ${d()}`)), transition$1(3, y, () => t, () => ({
      y: -16,
      scale: 0.95,
      duration: 250,
      easing: expoOut
    })), append(v, y);
  }), reset(g), reset(h), template_effect(() => {
    toggle_class(g, "left", o()), toggle_class(g, "center", l()), toggle_class(g, "right", c());
  }), append(r, h), pop({
    get params() {
      return n();
    },
    set params(v) {
      n(v), flush_sync();
    },
    get available() {
      return s();
    },
    set available(v) {
      s(v), flush_sync();
    },
    get active() {
      return i();
    },
    set active(v) {
      i(v), flush_sync();
    },
    get left() {
      return o();
    },
    set left(v) {
      o(v), flush_sync();
    },
    get center() {
      return l();
    },
    set center(v) {
      l(v), flush_sync();
    },
    get right() {
      return c();
    },
    set right(v) {
      c(v), flush_sync();
    },
    get bg() {
      return d();
    },
    set bg(v) {
      d(v), flush_sync();
    }
  });
}
customElements.define("currency-selector", create_custom_element(
  CurrencySelector,
  {
    params: {},
    available: {},
    active: {},
    left: { type: "Boolean" },
    center: { type: "Boolean" },
    right: { type: "Boolean" },
    bg: {}
  },
  [],
  [],
  !0
));
function parseCurrencyString(r, e = void 0) {
  if (!r && r !== "")
    return {
      formatted: "",
      value: 0,
      symbol: "",
      isSymbolAtStart: !0
    };
  r = String(r);
  const t = r.match(/^[\p{Currency_Symbol}\s]+|[\p{Currency_Symbol}\s]+$/gu), n = t ? t[0] : "", s = r.startsWith(n);
  if (!e) {
    let h = r.replace(/[^\d.,\-]/g, "");
    return h.includes(",") && (/,\d{2}$/.test(h) ? h = h.replace(/\./g, "").replace(",", ".") : h = h.replace(/,/g, "")), e = parseFloat(h), isNaN(e) && (e = 0), {
      formatted: r || "0",
      value: e,
      symbol: n,
      isSymbolAtStart: s
    };
  }
  e = Number(e), isNaN(e) && (e = 0);
  let i = e.toString();
  const o = /[.,]\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(r);
  if (!i.includes(".") && o)
    i += ".00";
  else if (i.includes(".")) {
    const [h, _] = i.split(".");
    i = h + "." + (_ + "00").slice(0, 2);
  }
  const l = /\d,\d{2}(?:\s*[^\d.,\-\s]+)?$/.test(r);
  if (l && (i = i.replace(".", ",")), /\d{1,3}([,.])\d{3}/.test(r)) {
    const [h, _] = i.split(/[.,]/), g = l ? "." : ",";
    i = `${h.replace(/\B(?=(\d{3})+(?!\d))/g, g)}${_ ? (l ? "," : ".") + _ : ""}`;
  }
  const d = /^[\p{Currency_Symbol}]+\s/u.test(r), u = /\s[\p{Currency_Symbol}]+$/u.test(r);
  return {
    formatted: s ? `${n}${d ? " " : ""}${i}` : `${i}${u ? " " : ""}${n}`,
    value: e,
    symbol: n,
    isSymbolAtStart: s
  };
}
const subtractCurrencyStrings = (r, e) => {
  const { value: t } = parseCurrencyString(r), { value: n } = parseCurrencyString(e);
  return parseCurrencyString(r, t - n);
}, calculateDiscountPercentage = (r, e) => {
  if (!e) return;
  const { value: t } = parseCurrencyString(r), { value: n } = parseCurrencyString(e);
  return (Math.abs(t - n) / n * 100).toFixed(0);
}, priceFormatter = (r, e) => {
  let t = {
    price: "",
    compared_at: void 0
  }, { value: n } = parseCurrencyString(r), { value: s } = e ? parseCurrencyString(e) : { value: void 0 };
  return n && s ? isNaN(s) ? t.compared_at = void 0 : n > s ? (t.compared_at = r, t.price = e) : (t.price = r, t.compared_at = e) : n && (t.price = r, t.compared_at = void 0), t;
};
var root_1$2 = /* @__PURE__ */ template('<div class="pdp-price--compared-at svelte-1ufi9b3"> </div>'), root$1 = /* @__PURE__ */ template('<div class="pdp-price svelte-1ufi9b3"><!> <div class="pdp-price--price svelte-1ufi9b3"> </div></div>');
const $$css$1 = {
  hash: "svelte-1ufi9b3",
  code: `.pdp-price.svelte-1ufi9b3 {
  font-family: "Monument", sans-serif;
  display: flex;
}
.pdp-price.small.svelte-1ufi9b3 {
  gap: 8px;
  font-size: 16px;
  letter-spacing: -0.22px;
  color: rgb(124, 124, 124);
  justify-content: center;
}
@media screen and (max-width: 1024px) {
  .pdp-price.small.svelte-1ufi9b3 {
    font-size: 12px;
    gap: 4px;
  }
}
.pdp-price.big.svelte-1ufi9b3 {
  gap: 16px;
  font-size: 42px;
  color: #000;
}
@media screen and (max-width: 1024px) {
  .pdp-price.big.svelte-1ufi9b3 {
    font-size: 20px;
    gap: 8px;
  }
}
.pdp-price.has-discount.svelte-1ufi9b3 .pdp-price--price:where(.svelte-1ufi9b3) {
  color: rgb(210, 25, 16);
}
.pdp-price--compared-at.svelte-1ufi9b3 {
  text-decoration: line-through;
}`
};
function ProductPrice(r, e) {
  push(e, !1), append_styles(r, $$css$1);
  let t = prop(e, "price", 12, ""), n = prop(e, "compared_at", 12, void 0), s = prop(e, "iso_code", 12, void 0), i = prop(e, "variant_id", 12, void 0), o = prop(e, "theme", 12, "big"), l = mutable_state(t()), c = mutable_state(n()), d = mutable_state();
  const u = async () => {
    if (!s() || !i() || n() && n() !== "nodiscount") return;
    const { amount: m } = await getAutomaticDiscount(s(), +i());
    if (!m) return;
    const { formatted: v } = subtractCurrencyStrings(t(), m);
    set(l, t()), set(c, v);
  };
  legacy_pre_effect(() => deep_read_state(t()), () => {
    set(l, t());
  }), legacy_pre_effect(() => deep_read_state(n()), () => {
    set(c, n());
  }), legacy_pre_effect(() => (get$1(l), get$1(c)), () => {
    set(d, priceFormatter(get$1(l), get$1(c)));
  }), legacy_pre_effect(
    () => (deep_read_state(s()), deep_read_state(i()), deep_read_state(t()), deep_read_state(n())),
    () => {
      s() && i() && t() && (n() || !n()) && u();
    }
  ), legacy_pre_effect_reset(), init();
  var f = root$1(), h = child(f);
  if_block(h, () => get$1(d).compared_at, (m) => {
    var v = root_1$2(), y = child(v, !0);
    reset(v), template_effect(() => set_text(y, get$1(d).compared_at)), append(m, v);
  });
  var _ = sibling(h, 2), g = child(_, !0);
  return reset(_), reset(f), template_effect(() => {
    toggle_class(f, "has-discount", get$1(d).compared_at), toggle_class(f, "small", o() === "small"), toggle_class(f, "big", o() === "big"), toggle_class(_, "highlight", get$1(d).compared_at), set_text(g, get$1(d).price);
  }), append(r, f), pop({
    get price() {
      return t();
    },
    set price(m) {
      t(m), flush_sync();
    },
    get compared_at() {
      return n();
    },
    set compared_at(m) {
      n(m), flush_sync();
    },
    get iso_code() {
      return s();
    },
    set iso_code(m) {
      s(m), flush_sync();
    },
    get variant_id() {
      return i();
    },
    set variant_id(m) {
      i(m), flush_sync();
    },
    get theme() {
      return o();
    },
    set theme(m) {
      o(m), flush_sync();
    }
  });
}
customElements.define("product-price", create_custom_element(
  ProductPrice,
  {
    price: {},
    compared_at: {},
    iso_code: {},
    variant_id: {},
    theme: {}
  },
  [],
  [],
  !1
));
var root_1$1 = /* @__PURE__ */ template('<div class="discount-percentage svelte-163f7ne"> </div>');
const $$css = {
  hash: "svelte-163f7ne",
  code: `.discount-percentage.svelte-163f7ne {
  font-family: "Monument", sans-serif;
  color: rgb(210, 25, 16);
}
.discount-percentage.small.svelte-163f7ne {
  gap: 8px;
  font-size: 16px;
  letter-spacing: -0.22px;
}
@media screen and (max-width: 1024px) {
  .discount-percentage.small.svelte-163f7ne {
    font-size: 12px;
    gap: 4px;
  }
}
.discount-percentage.big.svelte-163f7ne {
  gap: 16px;
  font-size: 42px;
}
@media screen and (max-width: 1024px) {
  .discount-percentage.big.svelte-163f7ne {
    font-size: 20px;
    gap: 8px;
  }
}`
};
function ProductDiscountPercentage(r, e) {
  push(e, !1), append_styles(r, $$css);
  let t = prop(e, "price", 12, ""), n = prop(e, "compared_at", 12, void 0), s = prop(e, "iso_code", 12, void 0), i = prop(e, "variant_id", 12, void 0), o = prop(e, "theme", 12, "big"), l = mutable_state(t()), c = mutable_state(n()), d = mutable_state(), u = prop(e, "discountPercentage", 12);
  const f = async () => {
    if (!s() || !i() || n() && n() !== "nodiscount") return;
    const { amount: g } = await getAutomaticDiscount(s(), +i());
    if (!g) return;
    const { formatted: m } = subtractCurrencyStrings(t(), g);
    set(l, t()), set(c, m);
  };
  legacy_pre_effect(() => deep_read_state(t()), () => {
    set(l, t());
  }), legacy_pre_effect(() => deep_read_state(n()), () => {
    set(c, n());
  }), legacy_pre_effect(() => (get$1(l), get$1(c)), () => {
    set(d, priceFormatter(get$1(l), get$1(c)));
  }), legacy_pre_effect(() => get$1(d), () => {
    u(calculateDiscountPercentage(get$1(d).price, get$1(d).compared_at));
  }), legacy_pre_effect(
    () => (deep_read_state(s()), deep_read_state(i()), deep_read_state(t()), deep_read_state(n())),
    () => {
      s() && i() && t() && (n() || !n()) && f();
    }
  ), legacy_pre_effect_reset(), init();
  var h = comment(), _ = first_child(h);
  return if_block(_, u, (g) => {
    var m = root_1$1(), v = child(m);
    reset(m), template_effect(() => {
      toggle_class(m, "has-discount", get$1(d).compared_at && get$1(d).compared_at !== get$1(d).price), toggle_class(m, "small", o() === "small"), toggle_class(m, "big", o() === "big"), set_text(v, `-${u() ?? ""}% off`);
    }), append(g, m);
  }), append(r, h), pop({
    get price() {
      return t();
    },
    set price(g) {
      t(g), flush_sync();
    },
    get compared_at() {
      return n();
    },
    set compared_at(g) {
      n(g), flush_sync();
    },
    get iso_code() {
      return s();
    },
    set iso_code(g) {
      s(g), flush_sync();
    },
    get variant_id() {
      return i();
    },
    set variant_id(g) {
      i(g), flush_sync();
    },
    get theme() {
      return o();
    },
    set theme(g) {
      o(g), flush_sync();
    },
    get discountPercentage() {
      return u();
    },
    set discountPercentage(g) {
      u(g), flush_sync();
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
`, CLIENT$1 = "GraphQL Client", MIN_RETRIES = 0, MAX_RETRIES = 3, GQL_API_ERROR = "An error occurred while fetching from the API. Review 'graphQLErrors' for details.", UNEXPECTED_CONTENT_TYPE_ERROR = "Response returned unexpected Content-Type:", NO_DATA_OR_ERRORS_ERROR = "An unknown error has occurred. The API did not return a data object or any errors in its response.", CONTENT_TYPES = {
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
  const n = {
    [r.pop()]: e
  };
  return r.length === 0 ? n : buildDataObjectByPath(r, n);
}
function combineObjects(r, e) {
  return Object.keys(e || {}).reduce((t, n) => (typeof e[n] == "object" || Array.isArray(e[n])) && r[n] ? (t[n] = combineObjects(r[n], e[n]), t) : (t[n] = e[n], t), Array.isArray(r) ? [...r] : { ...r });
}
function buildCombinedDataObject([r, ...e]) {
  return e.reduce(combineObjects, { ...r });
}
function generateHttpFetch({ clientLogger: r, customFetchApi: e = fetch, client: t = CLIENT$1, defaultRetryWaitTime: n = RETRY_WAIT_TIME, retriableCodes: s = RETRIABLE_STATUS_CODES }) {
  const i = async (o, l, c) => {
    const d = l + 1, u = c + 1;
    let f;
    try {
      if (f = await e(...o), r({
        type: "HTTP-Response",
        content: {
          requestParams: o,
          response: f
        }
      }), !f.ok && s.includes(f.status) && d <= u)
        throw new Error();
      return f;
    } catch (h) {
      if (d <= u) {
        const _ = f == null ? void 0 : f.headers.get("Retry-After");
        return await sleep(_ ? parseInt(_, 10) : n), r({
          type: "HTTP-Retry",
          content: {
            requestParams: o,
            lastResponse: f,
            retryAttempt: l,
            maxRetries: c
          }
        }), i(o, d, c);
      }
      throw new Error(formatErrorMessage(`${c > 0 ? `Attempted maximum number of ${c} network retries. Last message - ` : ""}${getErrorMessage(h)}`, t));
    }
  };
  return i;
}
async function sleep(r) {
  return new Promise((e) => setTimeout(e, r));
}
function createGraphQLClient({ headers: r, url: e, customFetchApi: t = fetch, retries: n = 0, logger: s }) {
  validateRetries({ client: CLIENT$1, retries: n });
  const i = {
    headers: r,
    url: e,
    retries: n
  }, o = generateClientLogger(s), l = generateHttpFetch({
    customFetchApi: t,
    clientLogger: o,
    defaultRetryWaitTime: RETRY_WAIT_TIME
  }), c = generateFetch(l, i), d = generateRequest(c), u = generateRequestStream(c);
  return {
    config: i,
    fetch: c,
    request: d,
    requestStream: u
  };
}
function generateClientLogger(r) {
  return (e) => {
    r && r(e);
  };
}
async function processJSONResponse(r) {
  const { errors: e, data: t, extensions: n } = await r.json();
  return {
    ...getKeyValueIfValid("data", t),
    ...getKeyValueIfValid("extensions", n),
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
function generateFetch(r, { url: e, headers: t, retries: n }) {
  return async (s, i = {}) => {
    const { variables: o, headers: l, url: c, retries: d, keepalive: u, signal: f } = i, h = JSON.stringify({
      query: s,
      variables: o
    });
    validateRetries({ client: CLIENT$1, retries: d });
    const _ = Object.entries({
      ...t,
      ...l
    }).reduce((m, [v, y]) => (m[v] = Array.isArray(y) ? y.join(", ") : y.toString(), m), {});
    return !_[SDK_VARIANT_HEADER$1] && !_[SDK_VERSION_HEADER$1] && (_[SDK_VARIANT_HEADER$1] = DEFAULT_SDK_VARIANT$1, _[SDK_VERSION_HEADER$1] = DEFAULT_CLIENT_VERSION$1), r([
      c ?? e,
      {
        method: "POST",
        headers: _,
        body: h,
        signal: f,
        keepalive: u
      }
    ], 1, d ?? n);
  };
}
function generateRequest(r) {
  return async (...e) => {
    if (DEFER_OPERATION_REGEX.test(e[0]))
      throw new Error(formatErrorMessage("This operation will result in a streamable response - use requestStream() instead."));
    try {
      const t = await r(...e), { status: n, statusText: s } = t, i = t.headers.get("content-type") || "";
      return t.ok ? i.includes(CONTENT_TYPES.json) ? processJSONResponse(t) : {
        errors: {
          networkStatusCode: n,
          message: formatErrorMessage(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${i}`),
          response: t
        }
      } : {
        errors: {
          networkStatusCode: n,
          message: formatErrorMessage(s),
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
    let n;
    try {
      for (; !(n = await t.read()).done; )
        yield e.decode(n.value);
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
        for await (const n of r)
          if (t += n, t.indexOf(e) > -1) {
            const s = t.lastIndexOf(e), o = t.slice(0, s).split(e).filter((l) => l.trim().length > 0).map((l) => l.slice(l.indexOf(HEADER_SEPARATOR) + HEADER_SEPARATOR.length).trim());
            o.length > 0 && (yield o), t = t.slice(s + e.length), t.trim() === "--" && (t = "");
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
    const { data: t, incremental: n, hasNext: s, extensions: i, errors: o } = e;
    if (!n)
      return {
        data: t || {},
        ...getKeyValueIfValid("errors", o),
        ...getKeyValueIfValid("extensions", i),
        hasNext: s
      };
    const l = n.map(({ data: c, path: d, errors: u }) => ({
      data: c && d ? buildDataObjectByPath(d, c) : {},
      ...getKeyValueIfValid("errors", u)
    }));
    return {
      data: l.length === 1 ? l[0].data : buildCombinedDataObject([
        ...l.map(({ data: c }) => c)
      ]),
      ...getKeyValueIfValid("errors", combineErrors(l)),
      hasNext: s
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
  const t = (e ?? "").match(BOUNDARY_HEADER_REGEX), n = `--${t ? t[1] : "-"}`;
  if (!((l = r.body) != null && l.getReader) && !((c = r.body) != null && c[Symbol.asyncIterator]))
    throw new Error("API multipart response did not return an iterable body", {
      cause: r
    });
  const s = getStreamBodyIterator(r);
  let i = {}, o;
  return {
    async *[Symbol.asyncIterator]() {
      var d;
      try {
        let u = !0;
        for await (const f of readStreamChunk(s, n)) {
          const h = getResponseDataFromChunkBodies(f);
          o = ((d = h.find((g) => g.extensions)) == null ? void 0 : d.extensions) ?? o;
          const _ = combineErrors(h);
          i = buildCombinedDataObject([
            i,
            ...h.map(({ data: g }) => g)
          ]), u = h.slice(-1)[0].hasNext, validateResponseData(_, i), yield {
            ...getKeyValueIfValid("data", i),
            ...getKeyValueIfValid("extensions", o),
            hasNext: u
          };
        }
        if (u)
          throw new Error("Response stream terminated unexpectedly");
      } catch (u) {
        const f = getErrorCause(u);
        yield {
          ...getKeyValueIfValid("data", i),
          ...getKeyValueIfValid("extensions", o),
          errors: {
            message: formatErrorMessage(getErrorMessage(u)),
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
      const t = await r(...e), { statusText: n } = t;
      if (!t.ok)
        throw new Error(n, { cause: t });
      const s = t.headers.get("content-type") || "";
      switch (!0) {
        case s.includes(CONTENT_TYPES.json):
          return createJsonResponseAsyncIterator(t);
        case s.includes(CONTENT_TYPES.multipart):
          return createMultipartResponseAsyncInterator(t, s);
        default:
          throw new Error(`${UNEXPECTED_CONTENT_TYPE_ERROR} ${s}`, { cause: t });
      }
    } catch (t) {
      return {
        async *[Symbol.asyncIterator]() {
          const n = getErrorCause(t);
          yield {
            errors: {
              message: formatErrorMessage(getErrorMessage(t)),
              ...getKeyValueIfValid("networkStatusCode", n == null ? void 0 : n.status),
              ...getKeyValueIfValid("response", n)
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
    if (!e || typeof e != "string")
      throw new Error();
    const t = e.trim(), n = t.match(/^https?:/) ? t : `https://${t}`, s = new URL(n);
    return s.protocol = "https", s.origin;
  } catch (t) {
    throw new Error(`${r}: a valid store domain ("${e}") must be provided`, { cause: t });
  }
}
function validateApiVersion({ client: r, currentSupportedApiVersions: e, apiVersion: t, logger: n }) {
  const s = `${r}: the provided apiVersion ("${t}")`, i = `Currently supported API versions: ${e.join(", ")}`;
  if (!t || typeof t != "string")
    throw new Error(`${s} is invalid. ${i}`);
  const o = t.trim();
  e.includes(o) || (n ? n({
    type: "Unsupported_Api_Version",
    content: {
      apiVersion: t,
      supportedApiVersions: e
    }
  }) : console.warn(`${s} is likely deprecated or not supported. ${i}`));
}
function getQuarterMonth(r) {
  const e = r * 3 - 2;
  return e === 10 ? e : `0${e}`;
}
function getPrevousVersion(r, e, t) {
  const n = e - t;
  return n <= 0 ? `${r - 1}-${getQuarterMonth(n + 4)}` : `${r}-${getQuarterMonth(n)}`;
}
function getCurrentApiVersion() {
  const r = /* @__PURE__ */ new Date(), e = r.getUTCMonth(), t = r.getUTCFullYear(), n = Math.floor(e / 3 + 1);
  return {
    year: t,
    quarter: n,
    version: `${t}-${getQuarterMonth(n)}`
  };
}
function getCurrentSupportedApiVersions() {
  const { year: r, quarter: e, version: t } = getCurrentApiVersion(), n = e === 4 ? `${r + 1}-01` : `${r}-${getQuarterMonth(e + 1)}`;
  return [
    getPrevousVersion(r, e, 3),
    getPrevousVersion(r, e, 2),
    getPrevousVersion(r, e, 1),
    t,
    n,
    "unstable"
  ];
}
function generateGetHeaders(r) {
  return (e) => ({ ...e ?? {}, ...r.headers });
}
function generateGetGQLClientParams({ getHeaders: r, getApiUrl: e }) {
  return (t, n) => {
    const s = [t];
    if (n && Object.keys(n).length > 0) {
      const { variables: i, apiVersion: o, headers: l, retries: c } = n;
      s.push({
        ...i ? { variables: i } : {},
        ...l ? { headers: r(l) } : {},
        ...o ? { url: e(o) } : {},
        ...c ? { retries: c } : {}
      });
    }
    return s;
  };
}
const DEFAULT_CONTENT_TYPE = "application/json", DEFAULT_SDK_VARIANT = "storefront-api-client", DEFAULT_CLIENT_VERSION = "1.0.7", PUBLIC_ACCESS_TOKEN_HEADER = "X-Shopify-Storefront-Access-Token", PRIVATE_ACCESS_TOKEN_HEADER = "Shopify-Storefront-Private-Token", SDK_VARIANT_HEADER = "X-SDK-Variant", SDK_VERSION_HEADER = "X-SDK-Version", SDK_VARIANT_SOURCE_HEADER = "X-SDK-Variant-Source", CLIENT = "Storefront API Client";
function validatePrivateAccessTokenUsage(r) {
  if (r && typeof window < "u")
    throw new Error(`${CLIENT}: private access tokens and headers should only be used in a server-to-server implementation. Use the public API access token in nonserver environments.`);
}
function validateRequiredAccessTokens(r, e) {
  if (!r && !e)
    throw new Error(`${CLIENT}: a public or private access token must be provided`);
  if (r && e)
    throw new Error(`${CLIENT}: only provide either a public or private access token`);
}
function createStorefrontApiClient$1({ storeDomain: r, apiVersion: e, publicAccessToken: t, privateAccessToken: n, clientName: s, retries: i = 0, customFetchApi: o, logger: l }) {
  const c = getCurrentSupportedApiVersions(), d = validateDomainAndGetStoreUrl({
    client: CLIENT,
    storeDomain: r
  }), u = {
    client: CLIENT,
    currentSupportedApiVersions: c,
    logger: l
  };
  validateApiVersion({ ...u, apiVersion: e }), validateRequiredAccessTokens(t, n), validatePrivateAccessTokenUsage(n);
  const f = generateApiUrlFormatter(d, e, u), h = {
    storeDomain: d,
    apiVersion: e,
    ...t ? { publicAccessToken: t } : {
      privateAccessToken: n
    },
    headers: {
      "Content-Type": DEFAULT_CONTENT_TYPE,
      Accept: DEFAULT_CONTENT_TYPE,
      [SDK_VARIANT_HEADER]: DEFAULT_SDK_VARIANT,
      [SDK_VERSION_HEADER]: DEFAULT_CLIENT_VERSION,
      ...s ? { [SDK_VARIANT_SOURCE_HEADER]: s } : {},
      ...t ? { [PUBLIC_ACCESS_TOKEN_HEADER]: t } : { [PRIVATE_ACCESS_TOKEN_HEADER]: n }
    },
    apiUrl: f(),
    clientName: s
  }, _ = createGraphQLClient({
    headers: h.headers,
    url: h.apiUrl,
    retries: i,
    customFetchApi: o,
    logger: l
  }), g = generateGetHeaders(h), m = generateGetApiUrl(h, f), v = generateGetGQLClientParams({
    getHeaders: g,
    getApiUrl: m
  });
  return Object.freeze({
    config: h,
    getHeaders: g,
    getApiUrl: m,
    fetch: (...b) => _.fetch(...v(...b)),
    request: (...b) => _.request(...v(...b)),
    requestStream: (...b) => _.requestStream(...v(...b))
  });
}
function generateApiUrlFormatter(r, e, t) {
  return (n) => {
    n && validateApiVersion({
      ...t,
      apiVersion: n
    });
    const s = (n ?? e).trim();
    return `${r}/api/${s}/graphql.json`;
  };
}
function generateGetApiUrl(r, e) {
  return (t) => t ? e(t) : r.apiUrl;
}
const createStorefrontApiClient = () => createStorefrontApiClient$1({
  storeDomain: "the-knotty-ones.myshopify.com",
  apiVersion: "2025-01",
  publicAccessToken: "9244b79a2b1f32cbc7bd2a7e673fe6e1"
}), storefrontApi = () => {
  const r = createStorefrontApiClient();
  return {
    createCart: async () => {
      var l, c, d;
      const { data: i, errors: o } = await r.request(createCartMutation);
      if (o)
        throw console.error(o), new Error("Failed to create cart");
      if (((c = (l = i == null ? void 0 : i.cartCreate) == null ? void 0 : l.userErrors) == null ? void 0 : c.length) > 0)
        throw new Error(i.cartCreate.userErrors[0].message);
      return (d = i == null ? void 0 : i.cartCreate) == null ? void 0 : d.cart;
    },
    createCartWithBuyerIdentity: async (i) => {
      var c, d, u;
      const { data: o, errors: l } = await r.request(createCartWithBuyerIdentityMutation, {
        variables: {
          buyerIdentity: {
            countryCode: i
          }
        }
      });
      if (l)
        throw console.error(l), new Error("Failed to create cart");
      if (((d = (c = o == null ? void 0 : o.cartCreate) == null ? void 0 : c.userErrors) == null ? void 0 : d.length) > 0)
        throw new Error(o.cartCreate.userErrors[0].message);
      return (u = o == null ? void 0 : o.cartCreate) == null ? void 0 : u.cart;
    },
    addLineItems: async (i, o) => {
      var d, u, f;
      if (!i) throw new Error("cartId is required");
      if (!o || !o.length) throw new Error("lines are required");
      const { data: l, errors: c } = await r.request(
        addLineItemsMutation,
        {
          variables: {
            cartId: i,
            lines: o.map((h) => ({
              merchandiseId: h.variantGid,
              quantity: h.quantity
            }))
          }
        }
      );
      if (c)
        throw console.error(c), console.error(c.graphQLErrors), new Error("Error adding line items to cart");
      if ((u = (d = l == null ? void 0 : l.cartLinesAdd) == null ? void 0 : d.userErrors) != null && u.length)
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
      const d = (f = l.productByHandle.variants.edges.find(
        (h) => {
          var _;
          return ((_ = h == null ? void 0 : h.node) == null ? void 0 : _.id) === `gid://shopify/ProductVariant/${o}`;
        }
      )) == null ? void 0 : f.node;
      if (!d) return null;
      const { metafield: u } = d;
      return u ? u.value : null;
    }
  };
};
var root_1 = /* @__PURE__ */ template(`<div class="bg-blue font-sans
						fixed z-10 bottom-[73px] left-0 right-0 text-[10px]
						sm:static sm:text-[14px] tracking-[-0.34px] sm:min-h-[42px] p-[10px] text-black
							"> </div>`), root = /* @__PURE__ */ template('<div class="min-h-[42px]"><!></div>');
function PreOrderStrip(r, e) {
  push(e, !1);
  let t = prop(e, "handle", 12, void 0), n = prop(e, "variantId", 12, void 0), s = prop(e, "message", 12, void 0);
  const i = async () => {
    if (!t() || !n()) {
      s(null);
      return;
    }
    s(await storefrontApi().getPreOrderMessage(t(), n()));
  };
  legacy_pre_effect(
    () => (deep_read_state(t()), deep_read_state(n())),
    () => {
      t() && n() && i();
    }
  ), legacy_pre_effect(() => deep_read_state(s()), () => {
    console.log("dump", s());
  }), legacy_pre_effect_reset(), init();
  var o = root(), l = child(o);
  return if_block(l, s, (c) => {
    var d = root_1(), u = child(d, !0);
    reset(d), template_effect(() => set_text(u, s())), transition$1(3, d, () => fly, () => ({ y: 6, duration: 300 })), append(c, d);
  }), reset(o), append(r, o), pop({
    get handle() {
      return t();
    },
    set handle(c) {
      t(c), flush_sync();
    },
    get variantId() {
      return n();
    },
    set variantId(c) {
      n(c), flush_sync();
    },
    get message() {
      return s();
    },
    set message(c) {
      s(c), flush_sync();
    }
  });
}
customElements.define("pre-order-strip", create_custom_element(PreOrderStrip, { handle: {}, variantId: {}, message: {} }, [], [], !1));
typeof window < "u" && (window.getAutomaticDiscount = getAutomaticDiscount);
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
