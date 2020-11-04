
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
/**
 * Hot module replacement for Svelte in the Wild
 *
 * @export
 * @param {object} Component Svelte component
 * @param {object} [options={ target: document.body }] Options for the Svelte component
 * @param {string} [id='hmr'] ID for the component container
 * @param {string} [eventName='app-loaded'] Name of the event that triggers replacement of previous component
 * @returns
 */
function HMR(Component, options = { target: document.body }, id = 'hmr', eventName = 'app-loaded') {
    const oldContainer = document.getElementById(id);

    // Create the new (temporarily hidden) component container
    const appContainer = document.createElement("div");
    if (oldContainer) appContainer.style.visibility = 'hidden';
    else appContainer.setAttribute('id', id); //ssr doesn't get an event, so we set the id now

    // Attach it to the target element
    options.target.appendChild(appContainer);

    // Wait for the app to load before replacing the component
    addEventListener(eventName, replaceComponent);

    function replaceComponent() {
        if (oldContainer) oldContainer.remove();
        // Show our component and take over the ID of the old container
        appContainer.style.visibility = 'initial';
        // delete (appContainer.style.visibility)
        appContainer.setAttribute('id', id);
    }

    return new Component({
        ...options,
        target: appContainer
    });
}

function noop() { }
const identity = x => x;
function assign(tar, src) {
    // @ts-ignore
    for (const k in src)
        tar[k] = src[k];
    return tar;
}
function add_location(element, file, line, column, char) {
    element.__svelte_meta = {
        loc: { file, line, column, char }
    };
}
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function validate_store(store, name) {
    if (store != null && typeof store.subscribe !== 'function') {
        throw new Error(`'${name}' is not a store with a 'subscribe' method`);
    }
}
function subscribe(store, ...callbacks) {
    if (store == null) {
        return noop;
    }
    const unsub = store.subscribe(...callbacks);
    return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
    let value;
    subscribe(store, _ => value = _)();
    return value;
}
function component_subscribe(component, store, callback) {
    component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
    if (definition) {
        const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
        return definition[0](slot_ctx);
    }
}
function get_slot_context(definition, ctx, $$scope, fn) {
    return definition[1] && fn
        ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
        : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
    if (definition[2] && fn) {
        const lets = definition[2](fn(dirty));
        if ($$scope.dirty === undefined) {
            return lets;
        }
        if (typeof lets === 'object') {
            const merged = [];
            const len = Math.max($$scope.dirty.length, lets.length);
            for (let i = 0; i < len; i += 1) {
                merged[i] = $$scope.dirty[i] | lets[i];
            }
            return merged;
        }
        return $$scope.dirty | lets;
    }
    return $$scope.dirty;
}
function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
    const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
    if (slot_changes) {
        const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
        slot.p(slot_context, slot_changes);
    }
}
function action_destroyer(action_result) {
    return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}

const is_client = typeof window !== 'undefined';
let now = is_client
    ? () => window.performance.now()
    : () => Date.now();
let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

const tasks = new Set();
function run_tasks(now) {
    tasks.forEach(task => {
        if (!task.c(now)) {
            tasks.delete(task);
            task.f();
        }
    });
    if (tasks.size !== 0)
        raf(run_tasks);
}
/**
 * Creates a new task that runs on each raf frame
 * until it returns a falsy value or is aborted
 */
function loop(callback) {
    let task;
    if (tasks.size === 0)
        raf(run_tasks);
    return {
        promise: new Promise(fulfill => {
            tasks.add(task = { c: callback, f: fulfill });
        }),
        abort() {
            tasks.delete(task);
        }
    };
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function svg_element(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function claim_element(nodes, name, attributes, svg) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeName === name) {
            let j = 0;
            const remove = [];
            while (j < node.attributes.length) {
                const attribute = node.attributes[j++];
                if (!attributes[attribute.name]) {
                    remove.push(attribute.name);
                }
            }
            for (let k = 0; k < remove.length; k++) {
                node.removeAttribute(remove[k]);
            }
            return nodes.splice(i, 1)[0];
        }
    }
    return svg ? svg_element(name) : element(name);
}
function claim_text(nodes, data) {
    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.nodeType === 3) {
            node.data = '' + data;
            return nodes.splice(i, 1)[0];
        }
    }
    return text(data);
}
function claim_space(nodes) {
    return claim_text(nodes, ' ');
}
function set_style(node, key, value, important) {
    node.style.setProperty(key, value, important ? 'important' : '');
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}
function custom_event(type, detail) {
    const e = document.createEvent('CustomEvent');
    e.initCustomEvent(type, false, false, detail);
    return e;
}

const active_docs = new Set();
let active = 0;
// https://github.com/darkskyapp/string-hash/blob/master/index.js
function hash(str) {
    let hash = 5381;
    let i = str.length;
    while (i--)
        hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
    return hash >>> 0;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
    const step = 16.666 / duration;
    let keyframes = '{\n';
    for (let p = 0; p <= 1; p += step) {
        const t = a + (b - a) * ease(p);
        keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
    }
    const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
    const name = `__svelte_${hash(rule)}_${uid}`;
    const doc = node.ownerDocument;
    active_docs.add(doc);
    const stylesheet = doc.__svelte_stylesheet || (doc.__svelte_stylesheet = doc.head.appendChild(element('style')).sheet);
    const current_rules = doc.__svelte_rules || (doc.__svelte_rules = {});
    if (!current_rules[name]) {
        current_rules[name] = true;
        stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
    }
    const animation = node.style.animation || '';
    node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
    active += 1;
    return name;
}
function delete_rule(node, name) {
    const previous = (node.style.animation || '').split(', ');
    const next = previous.filter(name
        ? anim => anim.indexOf(name) < 0 // remove specific animation
        : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
    );
    const deleted = previous.length - next.length;
    if (deleted) {
        node.style.animation = next.join(', ');
        active -= deleted;
        if (!active)
            clear_rules();
    }
}
function clear_rules() {
    raf(() => {
        if (active)
            return;
        active_docs.forEach(doc => {
            const stylesheet = doc.__svelte_stylesheet;
            let i = stylesheet.cssRules.length;
            while (i--)
                stylesheet.deleteRule(i);
            doc.__svelte_rules = {};
        });
        active_docs.clear();
    });
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
    const component = get_current_component();
    return (type, detail) => {
        const callbacks = component.$$.callbacks[type];
        if (callbacks) {
            // TODO are there situations where events could be dispatched
            // in a server (non-DOM) environment?
            const event = custom_event(type, detail);
            callbacks.slice().forEach(fn => {
                fn.call(component, event);
            });
        }
    };
}
function setContext(key, context) {
    get_current_component().$$.context.set(key, context);
}
function getContext(key) {
    return get_current_component().$$.context.get(key);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}

let promise;
function wait() {
    if (!promise) {
        promise = Promise.resolve();
        promise.then(() => {
            promise = null;
        });
    }
    return promise;
}
function dispatch(node, direction, kind) {
    node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
const null_transition = { duration: 0 };
function create_in_transition(node, fn, params) {
    let config = fn(node, params);
    let running = false;
    let animation_name;
    let task;
    let uid = 0;
    function cleanup() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
        tick(0, 1);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        if (task)
            task.abort();
        running = true;
        add_render_callback(() => dispatch(node, true, 'start'));
        task = loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(1, 0);
                    dispatch(node, true, 'end');
                    cleanup();
                    return running = false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(t, 1 - t);
                }
            }
            return running;
        });
    }
    let started = false;
    return {
        start() {
            if (started)
                return;
            delete_rule(node);
            if (is_function(config)) {
                config = config();
                wait().then(go);
            }
            else {
                go();
            }
        },
        invalidate() {
            started = false;
        },
        end() {
            if (running) {
                cleanup();
                running = false;
            }
        }
    };
}
function create_out_transition(node, fn, params) {
    let config = fn(node, params);
    let running = true;
    let animation_name;
    const group = outros;
    group.r += 1;
    function go() {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        if (css)
            animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
        const start_time = now() + delay;
        const end_time = start_time + duration;
        add_render_callback(() => dispatch(node, false, 'start'));
        loop(now => {
            if (running) {
                if (now >= end_time) {
                    tick(0, 1);
                    dispatch(node, false, 'end');
                    if (!--group.r) {
                        // this will result in `end()` being called,
                        // so we don't need to clean up here
                        run_all(group.c);
                    }
                    return false;
                }
                if (now >= start_time) {
                    const t = easing((now - start_time) / duration);
                    tick(1 - t, t);
                }
            }
            return running;
        });
    }
    if (is_function(config)) {
        wait().then(() => {
            // @ts-ignore
            config = config();
            go();
        });
    }
    else {
        go();
    }
    return {
        end(reset) {
            if (reset && config.tick) {
                config.tick(1, 0);
            }
            if (running) {
                if (animation_name)
                    delete_rule(node, animation_name);
                running = false;
            }
        }
    };
}
function create_bidirectional_transition(node, fn, params, intro) {
    let config = fn(node, params);
    let t = intro ? 0 : 1;
    let running_program = null;
    let pending_program = null;
    let animation_name = null;
    function clear_animation() {
        if (animation_name)
            delete_rule(node, animation_name);
    }
    function init(program, duration) {
        const d = program.b - t;
        duration *= Math.abs(d);
        return {
            a: t,
            b: program.b,
            d,
            duration,
            start: program.start,
            end: program.start + duration,
            group: program.group
        };
    }
    function go(b) {
        const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
        const program = {
            start: now() + delay,
            b
        };
        if (!b) {
            // @ts-ignore todo: improve typings
            program.group = outros;
            outros.r += 1;
        }
        if (running_program || pending_program) {
            pending_program = program;
        }
        else {
            // if this is an intro, and there's a delay, we need to do
            // an initial tick and/or apply CSS animation immediately
            if (css) {
                clear_animation();
                animation_name = create_rule(node, t, b, duration, delay, easing, css);
            }
            if (b)
                tick(0, 1);
            running_program = init(program, duration);
            add_render_callback(() => dispatch(node, b, 'start'));
            loop(now => {
                if (pending_program && now > pending_program.start) {
                    running_program = init(pending_program, duration);
                    pending_program = null;
                    dispatch(node, running_program.b, 'start');
                    if (css) {
                        clear_animation();
                        animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                    }
                }
                if (running_program) {
                    if (now >= running_program.end) {
                        tick(t = running_program.b, 1 - t);
                        dispatch(node, running_program.b, 'end');
                        if (!pending_program) {
                            // we're done
                            if (running_program.b) {
                                // intro — we can tidy up immediately
                                clear_animation();
                            }
                            else {
                                // outro — needs to be coordinated
                                if (!--running_program.group.r)
                                    run_all(running_program.group.c);
                            }
                        }
                        running_program = null;
                    }
                    else if (now >= running_program.start) {
                        const p = now - running_program.start;
                        t = running_program.a + running_program.d * easing(p / running_program.duration);
                        tick(t, 1 - t);
                    }
                }
                return !!(running_program || pending_program);
            });
        }
    }
    return {
        run(b) {
            if (is_function(config)) {
                wait().then(() => {
                    // @ts-ignore
                    config = config();
                    go(b);
                });
            }
            else {
                go(b);
            }
        },
        end() {
            clear_animation();
            running_program = pending_program = null;
        }
    };
}

const globals = (typeof window !== 'undefined'
    ? window
    : typeof globalThis !== 'undefined'
        ? globalThis
        : global);

function destroy_block(block, lookup) {
    block.d(1);
    lookup.delete(block.key);
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}
function validate_each_keys(ctx, list, get_context, get_key) {
    const keys = new Set();
    for (let i = 0; i < list.length; i++) {
        const key = get_key(get_context(ctx, list, i));
        if (keys.has(key)) {
            throw new Error('Cannot have duplicate keys in a keyed each');
        }
        keys.add(key);
    }
}

function get_spread_update(levels, updates) {
    const update = {};
    const to_null_out = {};
    const accounted_for = { $$scope: 1 };
    let i = levels.length;
    while (i--) {
        const o = levels[i];
        const n = updates[i];
        if (n) {
            for (const key in o) {
                if (!(key in n))
                    to_null_out[key] = 1;
            }
            for (const key in n) {
                if (!accounted_for[key]) {
                    update[key] = n[key];
                    accounted_for[key] = 1;
                }
            }
            levels[i] = n;
        }
        else {
            for (const key in o) {
                accounted_for[key] = 1;
            }
        }
    }
    for (const key in to_null_out) {
        if (!(key in update))
            update[key] = undefined;
    }
    return update;
}
function get_spread_object(spread_props) {
    return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}
function create_component(block) {
    block && block.c();
}
function claim_component(block, parent_nodes) {
    block && block.l(parent_nodes);
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

function dispatch_dev(type, detail) {
    document.dispatchEvent(custom_event(type, Object.assign({ version: '3.29.4' }, detail)));
}
function append_dev(target, node) {
    dispatch_dev('SvelteDOMInsert', { target, node });
    append(target, node);
}
function insert_dev(target, node, anchor) {
    dispatch_dev('SvelteDOMInsert', { target, node, anchor });
    insert(target, node, anchor);
}
function detach_dev(node) {
    dispatch_dev('SvelteDOMRemove', { node });
    detach(node);
}
function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
    const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
    if (has_prevent_default)
        modifiers.push('preventDefault');
    if (has_stop_propagation)
        modifiers.push('stopPropagation');
    dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
    const dispose = listen(node, event, handler, options);
    return () => {
        dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
        dispose();
    };
}
function attr_dev(node, attribute, value) {
    attr(node, attribute, value);
    if (value == null)
        dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
    else
        dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
}
function set_data_dev(text, data) {
    data = '' + data;
    if (text.wholeText === data)
        return;
    dispatch_dev('SvelteDOMSetData', { node: text, data });
    text.data = data;
}
function validate_each_argument(arg) {
    if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
        let msg = '{#each} only iterates over array-like objects.';
        if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
            msg += ' You can use a spread to convert this iterable into an array.';
        }
        throw new Error(msg);
    }
}
function validate_slots(name, slot, keys) {
    for (const slot_key of Object.keys(slot)) {
        if (!~keys.indexOf(slot_key)) {
            console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
        }
    }
}
class SvelteComponentDev extends SvelteComponent {
    constructor(options) {
        if (!options || (!options.target && !options.$$inline)) {
            throw new Error("'target' is a required option");
        }
        super();
    }
    $destroy() {
        super.$destroy();
        this.$destroy = () => {
            console.warn('Component was already destroyed'); // eslint-disable-line no-console
        };
    }
    $capture_state() { }
    $inject_state() { }
}

const subscriber_queue = [];
/**
 * Creates a `Readable` store that allows reading by subscription.
 * @param value initial value
 * @param {StartStopNotifier}start start and stop notifications for subscriptions
 */
function readable(value, start) {
    return {
        subscribe: writable(value, start).subscribe
    };
}
/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 * @param {*=}value initial value
 * @param {StartStopNotifier=}start start and stop notifications for subscriptions
 */
function writable(value, start = noop) {
    let stop;
    const subscribers = [];
    function set(new_value) {
        if (safe_not_equal(value, new_value)) {
            value = new_value;
            if (stop) { // store is ready
                const run_queue = !subscriber_queue.length;
                for (let i = 0; i < subscribers.length; i += 1) {
                    const s = subscribers[i];
                    s[1]();
                    subscriber_queue.push(s, value);
                }
                if (run_queue) {
                    for (let i = 0; i < subscriber_queue.length; i += 2) {
                        subscriber_queue[i][0](subscriber_queue[i + 1]);
                    }
                    subscriber_queue.length = 0;
                }
            }
        }
    }
    function update(fn) {
        set(fn(value));
    }
    function subscribe(run, invalidate = noop) {
        const subscriber = [run, invalidate];
        subscribers.push(subscriber);
        if (subscribers.length === 1) {
            stop = start(set) || noop;
        }
        run(value);
        return () => {
            const index = subscribers.indexOf(subscriber);
            if (index !== -1) {
                subscribers.splice(index, 1);
            }
            if (subscribers.length === 0) {
                stop();
                stop = null;
            }
        };
    }
    return { set, update, subscribe };
}
function derived(stores, fn, initial_value) {
    const single = !Array.isArray(stores);
    const stores_array = single
        ? [stores]
        : stores;
    const auto = fn.length < 2;
    return readable(initial_value, (set) => {
        let inited = false;
        const values = [];
        let pending = 0;
        let cleanup = noop;
        const sync = () => {
            if (pending) {
                return;
            }
            cleanup();
            const result = fn(single ? values[0] : values, set);
            if (auto) {
                set(result);
            }
            else {
                cleanup = is_function(result) ? result : noop;
            }
        };
        const unsubscribers = stores_array.map((store, i) => subscribe(store, (value) => {
            values[i] = value;
            pending &= ~(1 << i);
            if (inited) {
                sync();
            }
        }, () => {
            pending |= (1 << i);
        }));
        inited = true;
        sync();
        return function stop() {
            run_all(unsubscribers);
            cleanup();
        };
    });
}

const MATCH_PARAM = RegExp(/\:([^/()]+)/g);

function handleScroll (element) {
  if (navigator.userAgent.includes('jsdom')) return false
  scrollAncestorsToTop(element);
  handleHash();
}

function handleHash () {
  if (navigator.userAgent.includes('jsdom')) return false
  const { hash } = window.location;
  if (hash) {
    const validElementIdRegex = /^[A-Za-z]+[\w\-\:\.]*$/;
    if (validElementIdRegex.test(hash.substring(1))) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView();
    }
  }
}

function scrollAncestorsToTop (element) {
  if (
    element &&
    element.scrollTo &&
    element.dataset.routify !== 'scroll-lock' &&
    element.dataset['routify-scroll'] !== 'lock'
  ) {
    element.style['scroll-behavior'] = 'auto';
    element.scrollTo({ top: 0, behavior: 'auto' });
    element.style['scroll-behavior'] = '';
    scrollAncestorsToTop(element.parentElement);
  }
}

const pathToRegex = (str, recursive) => {
  const suffix = recursive ? '' : '/?$'; //fallbacks should match recursively
  str = str.replace(/\/_fallback?$/, '(/|$)');
  str = str.replace(/\/index$/, '(/index)?'); //index files should be matched even if not present in url
  str = str.replace(MATCH_PARAM, '([^/]+)') + suffix;
  return str
};

const pathToParamKeys = string => {
  const paramsKeys = [];
  let matches;
  while ((matches = MATCH_PARAM.exec(string))) paramsKeys.push(matches[1]);
  return paramsKeys
};

const pathToRank = ({ path }) => {
  return path
    .split('/')
    .filter(Boolean)
    .map(str => (str === '_fallback' ? 'A' : str.startsWith(':') ? 'B' : 'C'))
    .join('')
};

let warningSuppressed = false;

/* eslint no-console: 0 */
function suppressWarnings () {
  if (warningSuppressed) return
  const consoleWarn = console.warn;
  console.warn = function (msg, ...msgs) {
    const ignores = [
      "was created with unknown prop 'scoped'",
      "was created with unknown prop 'scopedSync'",
    ];
    if (!ignores.find(iMsg => msg.includes(iMsg)))
      return consoleWarn(msg, ...msgs)
  };
  warningSuppressed = true;
}

function currentLocation () {
  const pathMatch = window.location.search.match(/__routify_path=([^&]+)/);
  const prefetchMatch = window.location.search.match(/__routify_prefetch=\d+/);
  window.routify = window.routify || {};
  window.routify.prefetched = prefetchMatch ? true : false;
  const path = pathMatch && pathMatch[1].replace(/[#?].+/, ''); // strip any thing after ? and #
  return path || window.location.pathname
}

window.routify = window.routify || {};

/** @type {import('svelte/store').Writable<RouteNode>} */
const route = writable(null); // the actual route being rendered

/** @type {import('svelte/store').Writable<RouteNode[]>} */
const routes = writable([]); // all routes
routes.subscribe(routes => (window.routify.routes = routes));

let rootContext = writable({ component: { params: {} } });

/** @type {import('svelte/store').Writable<RouteNode>} */
const urlRoute = writable(null);  // the route matching the url

/** @type {import('svelte/store').Writable<String>} */
const basepath = (() => {
    const { set, subscribe } = writable("");

    return {
        subscribe,
        set(value) {
            if (value.match(/^[/(]/))
                set(value);
            else console.warn('Basepaths must start with / or (');
        },
        update() { console.warn('Use assignment or set to update basepaths.'); }
    }
})();

const location$1 = derived( // the part of the url matching the basepath
    [basepath, urlRoute],
    ([$basepath, $route]) => {
        const [, base, path] = currentLocation().match(`^(${$basepath})(${$route.regex})`) || [];
        return { base, path }
    }
);

const prefetchPath = writable("");

function onAppLoaded({ path, metatags }) {
    metatags.update();
    const prefetchMatch = window.location.search.match(/__routify_prefetch=(\d+)/);
    const prefetchId = prefetchMatch && prefetchMatch[1];

    dispatchEvent(new CustomEvent('app-loaded'));
    parent.postMessage({
        msg: 'app-loaded',
        prefetched: window.routify.prefetched,
        path,
        prefetchId
    }, "*");
    window['routify'].appLoaded = true;
}

var defaultConfig = {
    queryHandler: {
        parse: search => fromEntries(new URLSearchParams(search)),
        stringify: params => '?' + (new URLSearchParams(params)).toString()
    }
};


function fromEntries(iterable) {
    return [...iterable].reduce((obj, [key, val]) => {
        obj[key] = val;
        return obj
    }, {})
}

/**
 * @param {string} url 
 * @return {ClientNode}
 */
function urlToRoute(url) {
    /** @type {RouteNode[]} */
    const routes$1 = get_store_value(routes);
    const basepath$1 = get_store_value(basepath);
    const route = routes$1.find(route => url.match(`^${basepath$1}${route.regex}`));
    if (!route)
        throw new Error(
            `Route could not be found for "${url}".`
        )

    const [, base] = url.match(`^(${basepath$1})${route.regex}`);
    const path = url.slice(base.length);

    if (defaultConfig.queryHandler)
        route.params = defaultConfig.queryHandler.parse(window.location.search);

    if (route.paramKeys) {
        const layouts = layoutByPos(route.layouts);
        const fragments = path.split('/').filter(Boolean);
        const routeProps = getRouteProps(route.path);

        routeProps.forEach((prop, i) => {
            if (prop) {
                route.params[prop] = fragments[i];
                if (layouts[i]) layouts[i].param = { [prop]: fragments[i] };
                else route.param = { [prop]: fragments[i] };
            }
        });
    }

    route.leftover = url.replace(new RegExp(base + route.regex), '');

    return route
}


/**
 * @param {array} layouts
 */
function layoutByPos(layouts) {
    const arr = [];
    layouts.forEach(layout => {
        arr[layout.path.split('/').filter(Boolean).length - 1] = layout;
    });
    return arr
}


/**
 * @param {string} url
 */
function getRouteProps(url) {
    return url
        .split('/')
        .filter(Boolean)
        .map(f => f.match(/\:(.+)/))
        .map(f => f && f[1])
}

/* node_modules/@sveltech/routify/runtime/Prefetcher.svelte generated by Svelte v3.29.4 */

const { Object: Object_1 } = globals;
const file = "node_modules/@sveltech/routify/runtime/Prefetcher.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (93:2) {#each $actives as prefetch (prefetch.options.prefetch)}
function create_each_block(key_1, ctx) {
	let iframe;
	let iframe_src_value;

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			iframe = element("iframe");
			this.h();
		},
		l: function claim(nodes) {
			iframe = claim_element(nodes, "IFRAME", {
				src: true,
				frameborder: true,
				title: true
			});

			children(iframe).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			if (iframe.src !== (iframe_src_value = /*prefetch*/ ctx[1].url)) attr_dev(iframe, "src", iframe_src_value);
			attr_dev(iframe, "frameborder", "0");
			attr_dev(iframe, "title", "routify prefetcher");
			add_location(iframe, file, 93, 4, 2705);
			this.first = iframe;
		},
		m: function mount(target, anchor) {
			insert_dev(target, iframe, anchor);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$actives*/ 1 && iframe.src !== (iframe_src_value = /*prefetch*/ ctx[1].url)) {
				attr_dev(iframe, "src", iframe_src_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(iframe);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(93:2) {#each $actives as prefetch (prefetch.options.prefetch)}",
		ctx
	});

	return block;
}

function create_fragment(ctx) {
	let div;
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_value = /*$actives*/ ctx[0];
	validate_each_argument(each_value);
	const get_key = ctx => /*prefetch*/ ctx[1].options.prefetch;
	validate_each_keys(ctx, each_value, get_each_context, get_key);

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	const block = {
		c: function create() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { id: true, style: true });
			var div_nodes = children(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div_nodes);
			}

			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div, "id", "__routify_iframes");
			set_style(div, "display", "none");
			add_location(div, file, 91, 0, 2591);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}
		},
		p: function update(ctx, [dirty]) {
			if (dirty & /*$actives*/ 1) {
				const each_value = /*$actives*/ ctx[0];
				validate_each_argument(each_value);
				validate_each_keys(ctx, each_value, get_each_context, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block, null, get_each_context);
			}
		},
		i: noop,
		o: noop,
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

const iframeNum = 2;

const defaults = {
	validFor: 60,
	timeout: 5000,
	gracePeriod: 1000
};

/** stores and subscriptions */
const queue = writable([]);

const actives = derived(queue, q => q.slice(0, iframeNum));

actives.subscribe(actives => actives.forEach(({ options }) => {
	setTimeout(() => removeFromQueue(options.prefetch), options.timeout);
}));

function prefetch(path, options = {}) {
	prefetch.id = prefetch.id || 1;

	path = !path.href
	? path
	: path.href.replace(/^(?:\/\/|[^/]+)*\//, "/");

	//replace first ? since were mixing user queries with routify queries
	path = path.replace("?", "&");

	options = { ...defaults, ...options, path };
	options.prefetch = prefetch.id++;

	//don't prefetch within prefetch or SSR
	if (window.routify.prefetched || navigator.userAgent.match("jsdom")) return false;

	// add to queue
	queue.update(q => {
		if (!q.some(e => e.options.path === path)) q.push({
			url: `/__app.html?${optionsToQuery(options)}`,
			options
		});

		return q;
	});
}

/**
 * convert options to query string
 * {a:1,b:2} becomes __routify_a=1&routify_b=2
 * @param {defaults & {path: string, prefetch: number}} options
 */
function optionsToQuery(options) {
	return Object.entries(options).map(([key, val]) => `__routify_${key}=${val}`).join("&");
}

/**
 * @param {number|MessageEvent} idOrEvent
 */
function removeFromQueue(idOrEvent) {
	const id = idOrEvent.data ? idOrEvent.data.prefetchId : idOrEvent;
	if (!id) return null;
	const entry = get_store_value(queue).find(entry => entry && entry.options.prefetch == id);

	// removeFromQueue is called by both eventListener and timeout,
	// but we can only remove the item once
	if (entry) {
		const { gracePeriod } = entry.options;
		const gracePromise = new Promise(resolve => setTimeout(resolve, gracePeriod));

		const idlePromise = new Promise(resolve => {
				window.requestIdleCallback
				? window.requestIdleCallback(resolve)
				: setTimeout(resolve, gracePeriod + 1000);
			});

		Promise.all([gracePromise, idlePromise]).then(() => {
			queue.update(q => q.filter(q => q.options.prefetch != id));
		});
	}
}

// Listen to message from child window
addEventListener("message", removeFromQueue, false);

function instance($$self, $$props, $$invalidate) {
	let $actives;
	validate_store(actives, "actives");
	component_subscribe($$self, actives, $$value => $$invalidate(0, $actives = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Prefetcher", slots, []);
	const writable_props = [];

	Object_1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Prefetcher> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		writable,
		derived,
		get: get_store_value,
		iframeNum,
		defaults,
		queue,
		actives,
		prefetch,
		optionsToQuery,
		removeFromQueue,
		$actives
	});

	return [$actives];
}

class Prefetcher extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance, create_fragment, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Prefetcher",
			options,
			id: create_fragment.name
		});
	}
}

/// <reference path="../typedef.js" />

/** @ts-check */
/**
 * @typedef {Object} RoutifyContext
 * @prop {ClientNode} component
 * @prop {ClientNode} layout
 * @prop {any} componentFile 
 * 
 *  @returns {import('svelte/store').Readable<RoutifyContext>} */
function getRoutifyContext() {
  return getContext('routify') || rootContext
}

/**
 * @callback AfterPageLoadHelper
 * @param {function} callback
 * 
 * @typedef {import('svelte/store').Readable<AfterPageLoadHelper> & {_hooks:Array<function>}} AfterPageLoadHelperStore
 * @type {AfterPageLoadHelperStore}
 */
const afterPageLoad = {
  _hooks: [],
  subscribe: hookHandler
};

/** 
 * @callback BeforeUrlChangeHelper
 * @param {function} callback
 *
 * @typedef {import('svelte/store').Readable<BeforeUrlChangeHelper> & {_hooks:Array<function>}} BeforeUrlChangeHelperStore
 * @type {BeforeUrlChangeHelperStore}
 **/
const beforeUrlChange = {
  _hooks: [],
  subscribe: hookHandler
};

function hookHandler(listener) {
  const hooks = this._hooks;
  const index = hooks.length;
  listener(callback => { hooks[index] = callback; });
  return () => delete hooks[index]
}



const _metatags = {
  props: {},
  templates: {},
  services: {
    plain: { propField: 'name', valueField: 'content' },
    twitter: { propField: 'name', valueField: 'content' },
    og: { propField: 'property', valueField: 'content' },
  },
  plugins: [
    {
      name: 'applyTemplate',
      condition: () => true,
      action: (prop, value) => {
        const template = _metatags.getLongest(_metatags.templates, prop) || (x => x);
        return [prop, template(value)]
      }
    },
    {
      name: 'createMeta',
      condition: () => true,
      action(prop, value) {
        _metatags.writeMeta(prop, value);
      }
    },
    {
      name: 'createOG',
      condition: prop => !prop.match(':'),
      action(prop, value) {
        _metatags.writeMeta(`og:${prop}`, value);
      }
    },
    {
      name: 'createTitle',
      condition: prop => prop === 'title',
      action(prop, value) {
        document.title = value;
      }
    }
  ],
  getLongest(repo, name) {
    const providers = repo[name];
    if (providers) {
      const currentPath = get_store_value(route).path;
      const allPaths = Object.keys(repo[name]);
      const matchingPaths = allPaths.filter(path => currentPath.includes(path));

      const longestKey = matchingPaths.sort((a, b) => b.length - a.length)[0];

      return providers[longestKey]
    }
  },
  writeMeta(prop, value) {
    const head = document.getElementsByTagName('head')[0];
    const match = prop.match(/(.+)\:/);
    const serviceName = match && match[1] || 'plain';
    const { propField, valueField } = metatags.services[serviceName] || metatags.services.plain;
    const oldElement = document.querySelector(`meta[${propField}='${prop}']`);
    if (oldElement) oldElement.remove();

    const newElement = document.createElement('meta');
    newElement.setAttribute(propField, prop);
    newElement.setAttribute(valueField, value);
    newElement.setAttribute('data-origin', 'routify');
    head.appendChild(newElement);
  },
  set(prop, value) {
    _metatags.plugins.forEach(plugin => {
      if (plugin.condition(prop, value))
        [prop, value] = plugin.action(prop, value) || [prop, value];
    });
  },
  clear() {
    const oldElement = document.querySelector(`meta`);
    if (oldElement) oldElement.remove();
  },
  template(name, fn) {
    const origin = _metatags.getOrigin();
    _metatags.templates[name] = _metatags.templates[name] || {};
    _metatags.templates[name][origin] = fn;
  },
  update() {
    Object.keys(_metatags.props).forEach((prop) => {
      let value = (_metatags.getLongest(_metatags.props, prop));
      _metatags.plugins.forEach(plugin => {
        if (plugin.condition(prop, value)) {
          [prop, value] = plugin.action(prop, value) || [prop, value];

        }
      });
    });
  },
  batchedUpdate() {
    if (!_metatags._pendingUpdate) {
      _metatags._pendingUpdate = true;
      setTimeout(() => {
        _metatags._pendingUpdate = false;
        this.update();
      });
    }
  },
  _updateQueued: false,
  getOrigin() {
    const routifyCtx = getRoutifyContext();
    return routifyCtx && get_store_value(routifyCtx).path || '/'
  },
  _pendingUpdate: false
};


/**
 * metatags
 * @prop {Object.<string, string>}
 */
const metatags = new Proxy(_metatags, {
  set(target, name, value, receiver) {
    const { props, getOrigin } = target;

    if (Reflect.has(target, name))
      Reflect.set(target, name, value, receiver);
    else {
      props[name] = props[name] || {};
      props[name][getOrigin()] = value;
    }

    if (window['routify'].appLoaded)
      target.batchedUpdate();
    return true
  }
});

const isChangingPage = (function () {
  const store = writable(false);
  beforeUrlChange.subscribe(fn => fn(event => {
    store.set(true);
    return true
  }));
  
  afterPageLoad.subscribe(fn => fn(event => store.set(false)));

  return store
})();

/* node_modules/@sveltech/routify/runtime/Route.svelte generated by Svelte v3.29.4 */
const file$1 = "node_modules/@sveltech/routify/runtime/Route.svelte";

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i].component;
	child_ctx[20] = list[i].componentFile;
	return child_ctx;
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i].component;
	child_ctx[20] = list[i].componentFile;
	return child_ctx;
}

// (120:0) {#if $context}
function create_if_block_1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_2, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*$context*/ ctx[6].component.isLayout === false) return 0;
		if (/*remainingLayouts*/ ctx[5].length) return 1;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			if_block_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert_dev(target, if_block_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach_dev(if_block_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(120:0) {#if $context}",
		ctx
	});

	return block;
}

// (132:36) 
function create_if_block_3(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value_1 = [/*$context*/ ctx[6]];
	validate_each_argument(each_value_1);
	const get_key = ctx => /*component*/ ctx[19].path;
	validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);

	for (let i = 0; i < 1; i += 1) {
		let child_ctx = get_each_context_1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block_1(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$context, scoped, scopedSync, layout, remainingLayouts, decorator, Decorator, scopeToChild*/ 100663415) {
				const each_value_1 = [/*$context*/ ctx[6]];
				validate_each_argument(each_value_1);
				group_outros();
				validate_each_keys(ctx, each_value_1, get_each_context_1, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value_1, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block_1, each_1_anchor, get_each_context_1);
				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < 1; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 1; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_3.name,
		type: "if",
		source: "(132:36) ",
		ctx
	});

	return block;
}

// (121:2) {#if $context.component.isLayout === false}
function create_if_block_2(ctx) {
	let each_blocks = [];
	let each_1_lookup = new Map();
	let each_1_anchor;
	let current;
	let each_value = [/*$context*/ ctx[6]];
	validate_each_argument(each_value);
	const get_key = ctx => /*component*/ ctx[19].path;
	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

	for (let i = 0; i < 1; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key(child_ctx);
		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
	}

	const block = {
		c: function create() {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		l: function claim(nodes) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].l(nodes);
			}

			each_1_anchor = empty();
		},
		m: function mount(target, anchor) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert_dev(target, each_1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*$context, scoped, scopedSync, layout*/ 85) {
				const each_value = [/*$context*/ ctx[6]];
				validate_each_argument(each_value);
				group_outros();
				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, each_1_anchor.parentNode, outro_and_destroy_block, create_each_block$1, each_1_anchor, get_each_context$1);
				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			for (let i = 0; i < 1; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o: function outro(local) {
			for (let i = 0; i < 1; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d: function destroy(detaching) {
			for (let i = 0; i < 1; i += 1) {
				each_blocks[i].d(detaching);
			}

			if (detaching) detach_dev(each_1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(121:2) {#if $context.component.isLayout === false}",
		ctx
	});

	return block;
}

// (134:6) <svelte:component         this={componentFile}         let:scoped={scopeToChild}         let:decorator         {scoped}         {scopedSync}         {...layout.param || {}}>
function create_default_slot(ctx) {
	let route_1;
	let t;
	let current;

	route_1 = new Route({
			props: {
				layouts: [.../*remainingLayouts*/ ctx[5]],
				Decorator: typeof /*decorator*/ ctx[26] !== "undefined"
				? /*decorator*/ ctx[26]
				: /*Decorator*/ ctx[1],
				childOfDecorator: /*layout*/ ctx[4].isDecorator,
				scoped: {
					.../*scoped*/ ctx[0],
					.../*scopeToChild*/ ctx[25]
				}
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(route_1.$$.fragment);
			t = space();
		},
		l: function claim(nodes) {
			claim_component(route_1.$$.fragment, nodes);
			t = claim_space(nodes);
		},
		m: function mount(target, anchor) {
			mount_component(route_1, target, anchor);
			insert_dev(target, t, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const route_1_changes = {};
			if (dirty & /*remainingLayouts*/ 32) route_1_changes.layouts = [.../*remainingLayouts*/ ctx[5]];

			if (dirty & /*decorator, Decorator*/ 67108866) route_1_changes.Decorator = typeof /*decorator*/ ctx[26] !== "undefined"
			? /*decorator*/ ctx[26]
			: /*Decorator*/ ctx[1];

			if (dirty & /*layout*/ 16) route_1_changes.childOfDecorator = /*layout*/ ctx[4].isDecorator;

			if (dirty & /*scoped, scopeToChild*/ 33554433) route_1_changes.scoped = {
				.../*scoped*/ ctx[0],
				.../*scopeToChild*/ ctx[25]
			};

			route_1.$set(route_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(route_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(route_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(route_1, detaching);
			if (detaching) detach_dev(t);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_default_slot.name,
		type: "slot",
		source: "(134:6) <svelte:component         this={componentFile}         let:scoped={scopeToChild}         let:decorator         {scoped}         {scopedSync}         {...layout.param || {}}>",
		ctx
	});

	return block;
}

// (133:4) {#each [$context] as { component, componentFile }
function create_each_block_1(key_1, ctx) {
	let first;
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{ scoped: /*scoped*/ ctx[0] },
		{ scopedSync: /*scopedSync*/ ctx[2] },
		/*layout*/ ctx[4].param || {}
	];

	var switch_value = /*componentFile*/ ctx[20];

	function switch_props(ctx) {
		let switch_instance_props = {
			$$slots: {
				default: [
					create_default_slot,
					({ scoped: scopeToChild, decorator }) => ({ 25: scopeToChild, 26: decorator }),
					({ scoped: scopeToChild, decorator }) => (scopeToChild ? 33554432 : 0) | (decorator ? 67108864 : 0)
				]
			},
			$$scope: { ctx }
		};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props(ctx));
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = empty();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			first = empty();
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			this.first = first;
		},
		m: function mount(target, anchor) {
			insert_dev(target, first, anchor);

			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*scoped, scopedSync, layout*/ 21)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*scoped*/ 1 && { scoped: /*scoped*/ ctx[0] },
					dirty & /*scopedSync*/ 4 && { scopedSync: /*scopedSync*/ ctx[2] },
					dirty & /*layout*/ 16 && get_spread_object(/*layout*/ ctx[4].param || {})
				])
			: {};

			if (dirty & /*$$scope, remainingLayouts, decorator, Decorator, layout, scoped, scopeToChild*/ 234881075) {
				switch_instance_changes.$$scope = { dirty, ctx };
			}

			if (switch_value !== (switch_value = /*componentFile*/ ctx[20])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props(ctx));
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(first);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block_1.name,
		type: "each",
		source: "(133:4) {#each [$context] as { component, componentFile }",
		ctx
	});

	return block;
}

// (122:4) {#each [$context] as { component, componentFile }
function create_each_block$1(key_1, ctx) {
	let first;
	let switch_instance;
	let switch_instance_anchor;
	let current;

	const switch_instance_spread_levels = [
		{ scoped: /*scoped*/ ctx[0] },
		{ scopedSync: /*scopedSync*/ ctx[2] },
		/*layout*/ ctx[4].param || {}
	];

	var switch_value = /*componentFile*/ ctx[20];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return {
			props: switch_instance_props,
			$$inline: true
		};
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	const block = {
		key: key_1,
		first: null,
		c: function create() {
			first = empty();
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
			this.h();
		},
		l: function claim(nodes) {
			first = empty();
			if (switch_instance) claim_component(switch_instance.$$.fragment, nodes);
			switch_instance_anchor = empty();
			this.h();
		},
		h: function hydrate() {
			this.first = first;
		},
		m: function mount(target, anchor) {
			insert_dev(target, first, anchor);

			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert_dev(target, switch_instance_anchor, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const switch_instance_changes = (dirty & /*scoped, scopedSync, layout*/ 21)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*scoped*/ 1 && { scoped: /*scoped*/ ctx[0] },
					dirty & /*scopedSync*/ 4 && { scopedSync: /*scopedSync*/ ctx[2] },
					dirty & /*layout*/ 16 && get_spread_object(/*layout*/ ctx[4].param || {})
				])
			: {};

			if (switch_value !== (switch_value = /*componentFile*/ ctx[20])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i: function intro(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(first);
			if (detaching) detach_dev(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block$1.name,
		type: "each",
		source: "(122:4) {#each [$context] as { component, componentFile }",
		ctx
	});

	return block;
}

// (152:0) {#if !parentElement}
function create_if_block(ctx) {
	let span;
	let setParent_action;
	let mounted;
	let dispose;

	const block = {
		c: function create() {
			span = element("span");
			this.h();
		},
		l: function claim(nodes) {
			span = claim_element(nodes, "SPAN", {});
			children(span).forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(span, file$1, 152, 2, 4450);
		},
		m: function mount(target, anchor) {
			insert_dev(target, span, anchor);

			if (!mounted) {
				dispose = action_destroyer(setParent_action = /*setParent*/ ctx[8].call(null, span));
				mounted = true;
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(span);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(152:0) {#if !parentElement}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let t;
	let if_block1_anchor;
	let current;
	let if_block0 = /*$context*/ ctx[6] && create_if_block_1(ctx);
	let if_block1 = !/*parentElement*/ ctx[3] && create_if_block(ctx);

	const block = {
		c: function create() {
			if (if_block0) if_block0.c();
			t = space();
			if (if_block1) if_block1.c();
			if_block1_anchor = empty();
		},
		l: function claim(nodes) {
			if (if_block0) if_block0.l(nodes);
			t = claim_space(nodes);
			if (if_block1) if_block1.l(nodes);
			if_block1_anchor = empty();
		},
		m: function mount(target, anchor) {
			if (if_block0) if_block0.m(target, anchor);
			insert_dev(target, t, anchor);
			if (if_block1) if_block1.m(target, anchor);
			insert_dev(target, if_block1_anchor, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*$context*/ ctx[6]) {
				if (if_block0) {
					if_block0.p(ctx, dirty);

					if (dirty & /*$context*/ 64) {
						transition_in(if_block0, 1);
					}
				} else {
					if_block0 = create_if_block_1(ctx);
					if_block0.c();
					transition_in(if_block0, 1);
					if_block0.m(t.parentNode, t);
				}
			} else if (if_block0) {
				group_outros();

				transition_out(if_block0, 1, 1, () => {
					if_block0 = null;
				});

				check_outros();
			}

			if (!/*parentElement*/ ctx[3]) {
				if (if_block1) ; else {
					if_block1 = create_if_block(ctx);
					if_block1.c();
					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
				}
			} else if (if_block1) {
				if_block1.d(1);
				if_block1 = null;
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block0);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block0);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block0) if_block0.d(detaching);
			if (detaching) detach_dev(t);
			if (if_block1) if_block1.d(detaching);
			if (detaching) detach_dev(if_block1_anchor);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$1.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$1($$self, $$props, $$invalidate) {
	let $route;
	let $context;
	validate_store(route, "route");
	component_subscribe($$self, route, $$value => $$invalidate(14, $route = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Route", slots, []);
	let { layouts = [] } = $$props;
	let { scoped = {} } = $$props;
	let { Decorator = null } = $$props;
	let { childOfDecorator = false } = $$props;
	let { isRoot = false } = $$props;
	let scopedSync = {};
	let isDecorator = false;

	/** @type {HTMLElement} */
	let parentElement;

	/** @type {LayoutOrDecorator} */
	let layout = null;

	/** @type {LayoutOrDecorator} */
	let lastLayout = null;

	/** @type {LayoutOrDecorator[]} */
	let remainingLayouts = [];

	const context = writable(null);
	validate_store(context, "context");
	component_subscribe($$self, context, value => $$invalidate(6, $context = value));

	/** @type {import("svelte/store").Writable<Context>} */
	const parentContextStore = getContext("routify");

	isDecorator = Decorator && !childOfDecorator;
	setContext("routify", context);

	/** @param {HTMLElement} el */
	function setParent(el) {
		$$invalidate(3, parentElement = el.parentElement);
	}

	/** @param {SvelteComponent} componentFile */
	function onComponentLoaded(componentFile) {
		/** @type {Context} */
		const parentContext = get_store_value(parentContextStore);

		$$invalidate(2, scopedSync = { ...scoped });
		lastLayout = layout;
		if (remainingLayouts.length === 0) onLastComponentLoaded();

		const ctx = {
			layout: isDecorator ? parentContext.layout : layout,
			component: layout,
			route: $route,
			componentFile,
			child: isDecorator
			? parentContext.child
			: get_store_value(context) && get_store_value(context).child
		};

		context.set(ctx);
		if (isRoot) rootContext.set(ctx);

		if (parentContext && !isDecorator) parentContextStore.update(store => {
			store.child = layout || store.child;
			return store;
		});
	}

	/**  @param {LayoutOrDecorator} layout */
	function setComponent(layout) {
		let PendingComponent = layout.component();
		if (PendingComponent instanceof Promise) PendingComponent.then(onComponentLoaded); else onComponentLoaded(PendingComponent);
	}

	async function onLastComponentLoaded() {
		afterPageLoad._hooks.forEach(hook => hook(layout.api));
		await tick();
		handleScroll(parentElement);

		if (!window["routify"].appLoaded) {
			const pagePath = $context.component.path;
			const routePath = $route.path;
			const isOnCurrentRoute = pagePath === routePath; //maybe we're getting redirected

			// Let everyone know the last child has rendered
			if (!window["routify"].stopAutoReady && isOnCurrentRoute) {
				onAppLoaded({ path: pagePath, metatags });
			}
		}
	}

	const writable_props = ["layouts", "scoped", "Decorator", "childOfDecorator", "isRoot"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Route> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("layouts" in $$props) $$invalidate(9, layouts = $$props.layouts);
		if ("scoped" in $$props) $$invalidate(0, scoped = $$props.scoped);
		if ("Decorator" in $$props) $$invalidate(1, Decorator = $$props.Decorator);
		if ("childOfDecorator" in $$props) $$invalidate(10, childOfDecorator = $$props.childOfDecorator);
		if ("isRoot" in $$props) $$invalidate(11, isRoot = $$props.isRoot);
	};

	$$self.$capture_state = () => ({
		getContext,
		setContext,
		onDestroy,
		onMount,
		tick,
		writable,
		get: get_store_value,
		metatags,
		afterPageLoad,
		route,
		routes,
		rootContext,
		handleScroll,
		onAppLoaded,
		layouts,
		scoped,
		Decorator,
		childOfDecorator,
		isRoot,
		scopedSync,
		isDecorator,
		parentElement,
		layout,
		lastLayout,
		remainingLayouts,
		context,
		parentContextStore,
		setParent,
		onComponentLoaded,
		setComponent,
		onLastComponentLoaded,
		$route,
		$context
	});

	$$self.$inject_state = $$props => {
		if ("layouts" in $$props) $$invalidate(9, layouts = $$props.layouts);
		if ("scoped" in $$props) $$invalidate(0, scoped = $$props.scoped);
		if ("Decorator" in $$props) $$invalidate(1, Decorator = $$props.Decorator);
		if ("childOfDecorator" in $$props) $$invalidate(10, childOfDecorator = $$props.childOfDecorator);
		if ("isRoot" in $$props) $$invalidate(11, isRoot = $$props.isRoot);
		if ("scopedSync" in $$props) $$invalidate(2, scopedSync = $$props.scopedSync);
		if ("isDecorator" in $$props) $$invalidate(12, isDecorator = $$props.isDecorator);
		if ("parentElement" in $$props) $$invalidate(3, parentElement = $$props.parentElement);
		if ("layout" in $$props) $$invalidate(4, layout = $$props.layout);
		if ("lastLayout" in $$props) lastLayout = $$props.lastLayout;
		if ("remainingLayouts" in $$props) $$invalidate(5, remainingLayouts = $$props.remainingLayouts);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isDecorator, Decorator, layouts*/ 4610) {
			 if (isDecorator) {
				const decoratorLayout = {
					component: () => Decorator,
					path: `${layouts[0].path}__decorator`,
					isDecorator: true
				};

				$$invalidate(9, layouts = [decoratorLayout, ...layouts]);
			}
		}

		if ($$self.$$.dirty & /*layouts*/ 512) {
			 $$invalidate(4, [layout, ...remainingLayouts] = layouts, layout, ((($$invalidate(5, remainingLayouts), $$invalidate(9, layouts)), $$invalidate(12, isDecorator)), $$invalidate(1, Decorator)));
		}

		if ($$self.$$.dirty & /*layout*/ 16) {
			 setComponent(layout);
		}
	};

	return [
		scoped,
		Decorator,
		scopedSync,
		parentElement,
		layout,
		remainingLayouts,
		$context,
		context,
		setParent,
		layouts,
		childOfDecorator,
		isRoot
	];
}

class Route extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			layouts: 9,
			scoped: 0,
			Decorator: 1,
			childOfDecorator: 10,
			isRoot: 11
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Route",
			options,
			id: create_fragment$1.name
		});
	}

	get layouts() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set layouts(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scoped() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scoped(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get Decorator() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set Decorator(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get childOfDecorator() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set childOfDecorator(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get isRoot() {
		throw new Error("<Route>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set isRoot(value) {
		throw new Error("<Route>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

function init$1(routes, callback) {
  /** @type { ClientNode | false } */
  let lastRoute = false;

  function updatePage(proxyToUrl, shallow) {
    const url = proxyToUrl || currentLocation();
    const route$1 = urlToRoute(url);
    const currentRoute = shallow && urlToRoute(currentLocation());
    const contextRoute = currentRoute || route$1;
    const layouts = [...contextRoute.layouts, route$1];
    if (lastRoute) delete lastRoute.last; //todo is a page component the right place for the previous route?
    route$1.last = lastRoute;
    lastRoute = route$1;

    //set the route in the store
    if (!proxyToUrl)
      urlRoute.set(route$1);
    route.set(route$1);

    //run callback in Router.svelte
    callback(layouts);
  }

  const destroy = createEventListeners(updatePage);

  return { updatePage, destroy }
}

/**
 * svelte:window events doesn't work on refresh
 * @param {Function} updatePage
 */
function createEventListeners(updatePage) {
['pushState', 'replaceState'].forEach(eventName => {
    const fn = history[eventName];
    history[eventName] = async function (state = {}, title, url) {
      const { id, path, params } = get_store_value(route);
      state = { id, path, params, ...state };
      const event = new Event(eventName.toLowerCase());
      Object.assign(event, { state, title, url });

      if (await runHooksBeforeUrlChange(event)) {
        fn.apply(this, [state, title, url]);
        return dispatchEvent(event)
      }
    };
  });

  let _ignoreNextPop = false;

  const listeners = {
    click: handleClick,
    pushstate: () => updatePage(),
    replacestate: () => updatePage(),
    popstate: async event => {
      if (_ignoreNextPop)
        _ignoreNextPop = false;
      else {
        if (await runHooksBeforeUrlChange(event)) {
          updatePage();
        } else {
          _ignoreNextPop = true;
          event.preventDefault();
          history.go(1);
        }
      }
    },
  };

  Object.entries(listeners).forEach(args => addEventListener(...args));

  const unregister = () => {
    Object.entries(listeners).forEach(args => removeEventListener(...args));
  };

  return unregister
}

function handleClick(event) {
  const el = event.target.closest('a');
  const href = el && el.getAttribute('href');

  if (
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.shiftKey ||
    event.button ||
    event.defaultPrevented
  )
    return
  if (!href || el.target || el.host !== location.host) return

  event.preventDefault();
  history.pushState({}, '', href);
}

async function runHooksBeforeUrlChange(event) {
  const route$1 = get_store_value(route);
  for (const hook of beforeUrlChange._hooks.filter(Boolean)) {
    // return false if the hook returns false
    const result = await hook(event, route$1); //todo remove route from hook. Its API Can be accessed as $page
    if (!result) return false
  }
  return true
}

/* node_modules/@sveltech/routify/runtime/Router.svelte generated by Svelte v3.29.4 */

const { Object: Object_1$1 } = globals;

// (64:0) {#if layouts && $route !== null}
function create_if_block$1(ctx) {
	let route_1;
	let current;

	route_1 = new Route({
			props: {
				layouts: /*layouts*/ ctx[0],
				isRoot: true
			},
			$$inline: true
		});

	const block = {
		c: function create() {
			create_component(route_1.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(route_1.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(route_1, target, anchor);
			current = true;
		},
		p: function update(ctx, dirty) {
			const route_1_changes = {};
			if (dirty & /*layouts*/ 1) route_1_changes.layouts = /*layouts*/ ctx[0];
			route_1.$set(route_1_changes);
		},
		i: function intro(local) {
			if (current) return;
			transition_in(route_1.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(route_1.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(route_1, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block$1.name,
		type: "if",
		source: "(64:0) {#if layouts && $route !== null}",
		ctx
	});

	return block;
}

function create_fragment$2(ctx) {
	let t;
	let prefetcher;
	let current;
	let if_block = /*layouts*/ ctx[0] && /*$route*/ ctx[1] !== null && create_if_block$1(ctx);
	prefetcher = new Prefetcher({ $$inline: true });

	const block = {
		c: function create() {
			if (if_block) if_block.c();
			t = space();
			create_component(prefetcher.$$.fragment);
		},
		l: function claim(nodes) {
			if (if_block) if_block.l(nodes);
			t = claim_space(nodes);
			claim_component(prefetcher.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert_dev(target, t, anchor);
			mount_component(prefetcher, target, anchor);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if (/*layouts*/ ctx[0] && /*$route*/ ctx[1] !== null) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*layouts, $route*/ 3) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(t.parentNode, t);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);
			transition_in(prefetcher.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);
			transition_out(prefetcher.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach_dev(t);
			destroy_component(prefetcher, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$2.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$2($$self, $$props, $$invalidate) {
	let $route;
	validate_store(route, "route");
	component_subscribe($$self, route, $$value => $$invalidate(1, $route = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Router", slots, []);
	let { routes: routes$1 } = $$props;
	let { config = {} } = $$props;
	let layouts;
	let navigator;
	window.routify = window.routify || {};
	window.routify.inBrowser = !window.navigator.userAgent.match("jsdom");

	Object.entries(config).forEach(([key, value]) => {
		defaultConfig[key] = value;
	});

	suppressWarnings();
	const updatePage = (...args) => navigator && navigator.updatePage(...args);
	setContext("routifyupdatepage", updatePage);
	const callback = res => $$invalidate(0, layouts = res);

	const cleanup = () => {
		if (!navigator) return;
		navigator.destroy();
		navigator = null;
	};

	let initTimeout = null;

	// init is async to prevent a horrible bug that completely disable reactivity
	// in the host component -- something like the component's update function is
	// called before its fragment is created, and since the component is then seen
	// as already dirty, it is never scheduled for update again, and remains dirty
	// forever... I failed to isolate the precise conditions for the bug, but the
	// faulty update is triggered by a change in the route store, and so offseting
	// store initialization by one tick gives the host component some time to
	// create its fragment. The root cause it probably a bug in Svelte with deeply
	// intertwinned store and reactivity.
	const doInit = () => {
		clearTimeout(initTimeout);

		initTimeout = setTimeout(() => {
			cleanup();
			navigator = init$1(routes$1, callback);
			routes.set(routes$1);
			navigator.updatePage();
		});
	};

	onDestroy(cleanup);
	const writable_props = ["routes", "config"];

	Object_1$1.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Router> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("routes" in $$props) $$invalidate(2, routes$1 = $$props.routes);
		if ("config" in $$props) $$invalidate(3, config = $$props.config);
	};

	$$self.$capture_state = () => ({
		setContext,
		onDestroy,
		Route,
		Prefetcher,
		init: init$1,
		route,
		routesStore: routes,
		prefetchPath,
		suppressWarnings,
		defaultConfig,
		routes: routes$1,
		config,
		layouts,
		navigator,
		updatePage,
		callback,
		cleanup,
		initTimeout,
		doInit,
		$route
	});

	$$self.$inject_state = $$props => {
		if ("routes" in $$props) $$invalidate(2, routes$1 = $$props.routes);
		if ("config" in $$props) $$invalidate(3, config = $$props.config);
		if ("layouts" in $$props) $$invalidate(0, layouts = $$props.layouts);
		if ("navigator" in $$props) navigator = $$props.navigator;
		if ("initTimeout" in $$props) initTimeout = $$props.initTimeout;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*routes*/ 4) {
			 if (routes$1) doInit();
		}
	};

	return [layouts, $route, routes$1, config];
}

class Router extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$2, create_fragment$2, safe_not_equal, { routes: 2, config: 3 });

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Router",
			options,
			id: create_fragment$2.name
		});

		const { ctx } = this.$$;
		const props = options.props || {};

		if (/*routes*/ ctx[2] === undefined && !("routes" in props)) {
			console.warn("<Router> was created without expected prop 'routes'");
		}
	}

	get routes() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set routes(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get config() {
		throw new Error("<Router>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set config(value) {
		throw new Error("<Router>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/** 
 * Node payload
 * @typedef {Object} NodePayload
 * @property {RouteNode=} file current node
 * @property {RouteNode=} parent parent of the current node
 * @property {StateObject=} state state shared by every node in the walker
 * @property {Object=} scope scope inherited by descendants in the scope
 *
 * State Object
 * @typedef {Object} StateObject
 * @prop {TreePayload=} treePayload payload from the tree
 * 
 * Node walker proxy
 * @callback NodeWalkerProxy
 * @param {NodePayload} NodePayload
 */


/**
 * Node middleware
 * @description Walks through the nodes of a tree
 * @example middleware = createNodeMiddleware(payload => {payload.file.name = 'hello'})(treePayload))
 * @param {NodeWalkerProxy} fn 
 */
function createNodeMiddleware(fn) {

    /**    
     * NodeMiddleware payload receiver
     * @param {TreePayload} payload
     */
    const inner = async function execute(payload) {
        return await nodeMiddleware(payload.tree, fn, { state: { treePayload: payload } })
    };

    /**    
     * NodeMiddleware sync payload receiver
     * @param {TreePayload} payload
     */
    inner.sync = function executeSync(payload) {
        return nodeMiddlewareSync(payload.tree, fn, { state: { treePayload: payload } })
    };

    return inner
}

/**
 * Node walker
 * @param {Object} file mutable file
 * @param {NodeWalkerProxy} fn function to be called for each file
 * @param {NodePayload=} payload 
 */
async function nodeMiddleware(file, fn, payload) {
    const { state, scope, parent } = payload || {};
    payload = {
        file,
        parent,
        state: state || {},            //state is shared by all files in the walk
        scope: clone(scope || {}),     //scope is inherited by descendants
    };

    await fn(payload);

    if (file.children) {
        payload.parent = file;
        await Promise.all(file.children.map(_file => nodeMiddleware(_file, fn, payload)));
    }
    return payload
}

/**
 * Node walker (sync version)
 * @param {Object} file mutable file
 * @param {NodeWalkerProxy} fn function to be called for each file
 * @param {NodePayload=} payload 
 */
function nodeMiddlewareSync(file, fn, payload) {
    const { state, scope, parent } = payload || {};
    payload = {
        file,
        parent,
        state: state || {},            //state is shared by all files in the walk
        scope: clone(scope || {}),     //scope is inherited by descendants
    };

    fn(payload);

    if (file.children) {
        payload.parent = file;
        file.children.map(_file => nodeMiddlewareSync(_file, fn, payload));
    }
    return payload
}


/**
 * Clone with JSON
 * @param {T} obj 
 * @returns {T} JSON cloned object
 * @template T
 */
function clone(obj) { return JSON.parse(JSON.stringify(obj)) }

const setRegex = createNodeMiddleware(({ file }) => {
    if (file.isPage || file.isFallback)
        file.regex = pathToRegex(file.path, file.isFallback);
});
const setParamKeys = createNodeMiddleware(({ file }) => {
    file.paramKeys = pathToParamKeys(file.path);
});

const setShortPath = createNodeMiddleware(({ file }) => {
    if (file.isFallback || file.isIndex)
        file.shortPath = file.path.replace(/\/[^/]+$/, '');
    else file.shortPath = file.path;
});
const setRank = createNodeMiddleware(({ file }) => {
    file.ranking = pathToRank(file);
});


// todo delete?
const addMetaChildren = createNodeMiddleware(({ file }) => {
    const node = file;
    const metaChildren = file.meta && file.meta.children || [];
    if (metaChildren.length) {
        node.children = node.children || [];
        node.children.push(...metaChildren.map(meta => ({ isMeta: true, ...meta, meta })));
    }
});

const setIsIndexable = createNodeMiddleware(payload => {
    const { file } = payload;
    const { isLayout, isFallback, meta } = file;
    file.isIndexable = !isLayout && !isFallback && meta.index !== false;
    file.isNonIndexable = !file.isIndexable;
});


const assignRelations = createNodeMiddleware(({ file, parent }) => {
    Object.defineProperty(file, 'parent', { get: () => parent });
    Object.defineProperty(file, 'nextSibling', { get: () => _getSibling(file, 1) });
    Object.defineProperty(file, 'prevSibling', { get: () => _getSibling(file, -1) });
    Object.defineProperty(file, 'lineage', { get: () => _getLineage(parent) });
});

function _getLineage(node, lineage = []){
    if(node){
        lineage.unshift(node);
        _getLineage(node.parent, lineage);
    }
    return lineage
}

/**
 * 
 * @param {RouteNode} file 
 * @param {Number} direction 
 */
function _getSibling(file, direction) {
    if (!file.root) {
        const siblings = file.parent.children.filter(c => c.isIndexable);
        const index = siblings.indexOf(file);
        return siblings[index + direction]
    }
}

const assignIndex = createNodeMiddleware(({ file, parent }) => {
    if (file.isIndex) Object.defineProperty(parent, 'index', { get: () => file });
    if (file.isLayout)
        Object.defineProperty(parent, 'layout', { get: () => file });
});

const assignLayout = createNodeMiddleware(({ file, scope }) => {
    Object.defineProperty(file, 'layouts', { get: () => getLayouts(file) });
    function getLayouts(file) {
        const { parent } = file;
        const layout = parent && parent.layout;
        const isReset = layout && layout.isReset;
        const layouts = (parent && !isReset && getLayouts(parent)) || [];
        if (layout) layouts.push(layout);
        return layouts
    }
});


const createFlatList = treePayload => {
    createNodeMiddleware(payload => {
        if (payload.file.isPage || payload.file.isFallback)
        payload.state.treePayload.routes.push(payload.file);
    }).sync(treePayload);    
    treePayload.routes.sort((c, p) => (c.ranking >= p.ranking ? -1 : 1));
};

const setPrototype = createNodeMiddleware(({ file }) => {
    const Prototype = file.root
        ? Root
        : file.children
            ? file.isFile ? PageDir : Dir
            : file.isReset
                ? Reset
                : file.isLayout
                    ? Layout
                    : file.isFallback
                        ? Fallback
                        : Page;
    Object.setPrototypeOf(file, Prototype.prototype);

    function Layout() { }
    function Dir() { }
    function Fallback() { }
    function Page() { }
    function PageDir() { }
    function Reset() { }
    function Root() { }
});

var miscPlugins = /*#__PURE__*/Object.freeze({
    __proto__: null,
    setRegex: setRegex,
    setParamKeys: setParamKeys,
    setShortPath: setShortPath,
    setRank: setRank,
    addMetaChildren: addMetaChildren,
    setIsIndexable: setIsIndexable,
    assignRelations: assignRelations,
    assignIndex: assignIndex,
    assignLayout: assignLayout,
    createFlatList: createFlatList,
    setPrototype: setPrototype
});

const assignAPI = createNodeMiddleware(({ file }) => {
    file.api = new ClientApi(file);
});

class ClientApi {
    constructor(file) {
        this.__file = file;
        Object.defineProperty(this, '__file', { enumerable: false });
        this.isMeta = !!file.isMeta;
        this.path = file.path;
        this.title = _prettyName(file);
        this.meta = file.meta;
    }

    get parent() { return !this.__file.root && this.__file.parent.api }
    get children() {
        return (this.__file.children || this.__file.isLayout && this.__file.parent.children || [])
            .filter(c => !c.isNonIndexable)
            .sort((a, b) => {
                if(a.isMeta && b.isMeta) return 0
                a = (a.meta.index || a.meta.title || a.path).toString();
                b = (b.meta.index || b.meta.title || b.path).toString();
                return a.localeCompare((b), undefined, { numeric: true, sensitivity: 'base' })
            })
            .map(({ api }) => api)
    }
    get next() { return _navigate(this, +1) }
    get prev() { return _navigate(this, -1) }
    preload() {
        this.__file.layouts.forEach(file => file.component());
        this.__file.component(); 
    }
}

function _navigate(node, direction) {
    if (!node.__file.root) {
        const siblings = node.parent.children;
        const index = siblings.indexOf(node);
        return node.parent.children[index + direction]
    }
}


function _prettyName(file) {
    if (typeof file.meta.title !== 'undefined') return file.meta.title
    else return (file.shortPath || file.path)
        .split('/')
        .pop()
        .replace(/-/g, ' ')
}

const plugins = {...miscPlugins, assignAPI};

function buildClientTree(tree) {
  const order = [
    // pages
    "setParamKeys", //pages only
    "setRegex", //pages only
    "setShortPath", //pages only
    "setRank", //pages only
    "assignLayout", //pages only,
    // all
    "setPrototype",
    "addMetaChildren",
    "assignRelations", //all (except meta components?)
    "setIsIndexable", //all
    "assignIndex", //all
    "assignAPI", //all
    // routes
    "createFlatList"
  ];

  const payload = { tree, routes: [] };
  for (let name of order) {
    const syncFn = plugins[name].sync || plugins[name];
    syncFn(payload);
  }
  return payload
}

//tree
const _tree = {
  "name": "root",
  "filepath": "/",
  "root": true,
  "ownMeta": {},
  "absolutePath": "src/pages",
  "children": [
    {
      "isFile": true,
      "isDir": false,
      "file": "index.svelte",
      "filepath": "/index.svelte",
      "name": "index",
      "ext": "svelte",
      "badExt": false,
      "absolutePath": "/Users/relax_b7/Misc/Development/Frontend/SimplePortfolio/src/simple-portfolio/src/pages/index.svelte",
      "importPath": "../../../../src/pages/index.svelte",
      "isLayout": false,
      "isReset": false,
      "isIndex": true,
      "isFallback": false,
      "isPage": true,
      "ownMeta": {},
      "meta": {
        "preload": false,
        "prerender": true,
        "precache-order": false,
        "precache-proximity": true,
        "recursive": true
      },
      "path": "/index",
      "id": "_index",
      "component": () => import('./index-32aec052.js').then(function (n) { return n.i; }).then(m => m.default)
    }
  ],
  "isLayout": false,
  "isReset": false,
  "isIndex": false,
  "isFallback": false,
  "meta": {
    "preload": false,
    "prerender": true,
    "precache-order": false,
    "precache-proximity": true,
    "recursive": true
  },
  "path": "/"
};


const {tree, routes: routes$1} = buildClientTree(_tree);

/* src/App.svelte generated by Svelte v3.29.4 */

function create_fragment$3(ctx) {
	let router;
	let current;
	router = new Router({ props: { routes: routes$1 }, $$inline: true });

	const block = {
		c: function create() {
			create_component(router.$$.fragment);
		},
		l: function claim(nodes) {
			claim_component(router.$$.fragment, nodes);
		},
		m: function mount(target, anchor) {
			mount_component(router, target, anchor);
			current = true;
		},
		p: noop,
		i: function intro(local) {
			if (current) return;
			transition_in(router.$$.fragment, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(router.$$.fragment, local);
			current = false;
		},
		d: function destroy(detaching) {
			destroy_component(router, detaching);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_fragment$3.name,
		type: "component",
		source: "",
		ctx
	});

	return block;
}

function instance$3($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("App", slots, []);
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({ Router, routes: routes$1 });
	return [];
}

class App extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "App",
			options,
			id: create_fragment$3.name
		});
	}
}

const app = HMR(App, { target: document.body }, 'routify-app');

export { append_dev as A, check_outros as B, add_render_callback as C, create_bidirectional_transition as D, destroy_each as E, listen_dev as F, set_data_dev as G, group_outros as H, create_in_transition as I, create_out_transition as J, is_function as K, app as L, SvelteComponentDev as S, init as a, createEventDispatcher as b, create_slot as c, dispatch_dev as d, element as e, claim_element as f, children as g, detach_dev as h, identity as i, set_style as j, attr_dev as k, add_location as l, insert_dev as m, action_destroyer as n, transition_in as o, transition_out as p, globals as q, validate_each_argument as r, safe_not_equal as s, toggle_class as t, update_slot as u, validate_slots as v, text as w, space as x, claim_text as y, claim_space as z };
//# sourceMappingURL=main-dc98cdbc.js.map
