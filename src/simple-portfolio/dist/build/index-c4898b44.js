
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import { i as identity, S as SvelteComponentDev, a as init, s as safe_not_equal, d as dispatch_dev, c as create_slot, v as validate_slots, b as createEventDispatcher, e as element, f as claim_element, g as children, h as detach_dev, j as set_style, k as attr_dev, t as toggle_class, l as add_location, m as insert_dev, n as action_destroyer, u as update_slot, o as transition_in, p as transition_out, q as validate_each_argument, r as text, w as space, x as claim_text, y as claim_space, z as append_dev, A as check_outros, B as add_render_callback, C as create_bidirectional_transition, D as destroy_each, E as listen_dev, F as set_data_dev, G as group_outros, H as create_in_transition, I as create_out_transition, J as is_function } from './main-09938019.js';

function cubicOut(t) {
    const f = t - 1.0;
    return f * f * f + 1.0;
}

function fade(node, { delay = 0, duration = 400, easing = identity }) {
    const o = +getComputedStyle(node).opacity;
    return {
        delay,
        duration,
        easing,
        css: t => `opacity: ${t * o}`
    };
}
function fly(node, { delay = 0, duration = 400, easing = cubicOut, x = 0, y = 0, opacity = 0 }) {
    const style = getComputedStyle(node);
    const target_opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;
    const od = target_opacity * (1 - opacity);
    return {
        delay,
        duration,
        easing,
        css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${target_opacity - (od * u)}`
    };
}

/**
 * Waits for a given amount of time
 * @param {number} ms The time in milliseconds to wait before resuming execution
 * @example
 *  const someFunction = () => {
 *    // Waits for 1 second before resuming execution
 *    await sleep(1000)
 *  }
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Generates a random number between `min` and `max`
 * @param {number} min The minimum value in range
 * @param {number} max The maximum value in range
 * @example
 * // Generates a random number between 10 and 20
 * rng(10, 20)
 */
const rng = (min, max) => Math.floor(Math.random() * (max - min) + min);

/**
 * Verifies if a given element contains only one text node child
 * @param {HTMLElement} el
 * @example
 * const h1 = document.createElement('h1')
 * h1.textContent = 'Hello World!'
 * hasSingleTextNode(h1) // Returns `true`
 */
const hasSingleTextNode = el => el.childNodes.length === 1 && el.childNodes[0].nodeType === 3;

/**
 * Delay for each keystroke during the typewriter animation
 * @param {number|number[]} interval The delay between each letter during typing animation (if is an array, randomly cycles between it's numbers for each letter)
 * @example
 * // Delays the next keystroke for 40 milliseconds
 * typingInterval(40)
 * // Randomly delays the next keystroke for 15, 30 or 45 milliseconds
 * typingInterval([15, 30, 45])
 */
const typingInterval = async interval => sleep(interval[rng(0, interval.length)] || interval);

/**
 * Get children data from `parentElement`
 * @param {HTMLElement} parentElement The element to get children from
 * @example
 * const p = document.createElement('p')
 * p.textContent = 'Lorem ipsum dolor sit consectetur'
 * getElements(p)
 */
const getElements = parentElement => {
	if (hasSingleTextNode(parentElement)) {
		const text = parentElement.textContent.split('');
		const childNode = document.createElement('p');
		childNode.textContent = parentElement.textContent;
		parentElement.textContent = '';
		parentElement.appendChild(childNode);
		return [{ currentNode: childNode, text }]
	} else {
		return [...parentElement.getElementsByTagName('*')]
			.filter(el => hasSingleTextNode(el))
			.map(currentNode => ({ currentNode, text: currentNode.textContent.split('') }))
	}
};

var utils = /*#__PURE__*/Object.freeze({
    __proto__: null,
    sleep: sleep,
    rng: rng,
    hasSingleTextNode: hasSingleTextNode,
    typingInterval: typingInterval,
    getElements: getElements
});

/// <reference path='../types.js' />

/** @type {(node: HTMLElement, options: TypewriterOptions) => Promise<any>} */
const typewriter = async (node, options) => {
	const { default: mode } =
		(options.loop && (await import('./loop-6df397f1.js'))) ||
		(options.cascade && (await import('./cascade-c68f916d.js'))) ||
		(options.scramble && (await import('./scramble-38a9a5bd.js'))) ||
		(await import('./default-73770bdb.js'));
	const elements = getElements(node);
	if (options.delay > 0) {
		const { sleep } = await Promise.resolve().then(function () { return utils; });
		await sleep(options.delay);
		node.classList.remove('delay');
	}
	mode({ node, elements }, options);
};

/* node_modules/svelte-typewriter/src/Typewriter.svelte generated by Svelte v3.29.4 */
const file = "node_modules/svelte-typewriter/src/Typewriter.svelte";

function create_fragment(ctx) {
	let div;
	let typewriter_action;
	let current;
	let mounted;
	let dispose;
	const default_slot_template = /*#slots*/ ctx[8].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[7], null);

	const block = {
		c: function create() {
			div = element("div");
			if (default_slot) default_slot.c();
			this.h();
		},
		l: function claim(nodes) {
			div = claim_element(nodes, "DIV", { style: true, class: true });
			var div_nodes = children(div);
			if (default_slot) default_slot.l(div_nodes);
			div_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			set_style(div, "--cursor-color", typeof /*cursor*/ ctx[0] === "string"
			? /*cursor*/ ctx[0]
			: "black");

			attr_dev(div, "class", "svelte-8gtb9p");
			toggle_class(div, "cursor", /*cursor*/ ctx[0]);
			toggle_class(div, "delay", /*options*/ ctx[1].delay > 0);
			add_location(div, file, 40, 0, 681);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div, anchor);

			if (default_slot) {
				default_slot.m(div, null);
			}

			current = true;

			if (!mounted) {
				dispose = action_destroyer(typewriter_action = typewriter.call(null, div, /*options*/ ctx[1]));
				mounted = true;
			}
		},
		p: function update(ctx, [dirty]) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 128) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[7], dirty, null, null);
				}
			}

			if (!current || dirty & /*cursor*/ 1) {
				set_style(div, "--cursor-color", typeof /*cursor*/ ctx[0] === "string"
				? /*cursor*/ ctx[0]
				: "black");
			}

			if (dirty & /*cursor*/ 1) {
				toggle_class(div, "cursor", /*cursor*/ ctx[0]);
			}

			if (dirty & /*options*/ 2) {
				toggle_class(div, "delay", /*options*/ ctx[1].delay > 0);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o: function outro(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div);
			if (default_slot) default_slot.d(detaching);
			mounted = false;
			dispose();
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

function instance($$self, $$props, $$invalidate) {
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Typewriter", slots, ['default']);
	let { interval = 30 } = $$props;
	let { cascade = false } = $$props;
	let { loop = false } = $$props;
	let { scramble = false } = $$props;
	let { cursor = true } = $$props;
	let { delay = 0 } = $$props;
	const dispatch = createEventDispatcher();

	const options = {
		interval,
		cascade,
		loop,
		scramble,
		cursor,
		delay,
		dispatch
	};

	const writable_props = ["interval", "cascade", "loop", "scramble", "cursor", "delay"];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Typewriter> was created with unknown prop '${key}'`);
	});

	$$self.$$set = $$props => {
		if ("interval" in $$props) $$invalidate(2, interval = $$props.interval);
		if ("cascade" in $$props) $$invalidate(3, cascade = $$props.cascade);
		if ("loop" in $$props) $$invalidate(4, loop = $$props.loop);
		if ("scramble" in $$props) $$invalidate(5, scramble = $$props.scramble);
		if ("cursor" in $$props) $$invalidate(0, cursor = $$props.cursor);
		if ("delay" in $$props) $$invalidate(6, delay = $$props.delay);
		if ("$$scope" in $$props) $$invalidate(7, $$scope = $$props.$$scope);
	};

	$$self.$capture_state = () => ({
		createEventDispatcher,
		typewriter,
		interval,
		cascade,
		loop,
		scramble,
		cursor,
		delay,
		dispatch,
		options
	});

	$$self.$inject_state = $$props => {
		if ("interval" in $$props) $$invalidate(2, interval = $$props.interval);
		if ("cascade" in $$props) $$invalidate(3, cascade = $$props.cascade);
		if ("loop" in $$props) $$invalidate(4, loop = $$props.loop);
		if ("scramble" in $$props) $$invalidate(5, scramble = $$props.scramble);
		if ("cursor" in $$props) $$invalidate(0, cursor = $$props.cursor);
		if ("delay" in $$props) $$invalidate(6, delay = $$props.delay);
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [cursor, options, interval, cascade, loop, scramble, delay, $$scope, slots];
}

class Typewriter extends SvelteComponentDev {
	constructor(options) {
		super(options);

		init(this, options, instance, create_fragment, safe_not_equal, {
			interval: 2,
			cascade: 3,
			loop: 4,
			scramble: 5,
			cursor: 0,
			delay: 6
		});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Typewriter",
			options,
			id: create_fragment.name
		});
	}

	get interval() {
		throw new Error("<Typewriter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set interval(value) {
		throw new Error("<Typewriter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get cascade() {
		throw new Error("<Typewriter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set cascade(value) {
		throw new Error("<Typewriter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get loop() {
		throw new Error("<Typewriter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set loop(value) {
		throw new Error("<Typewriter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get scramble() {
		throw new Error("<Typewriter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set scramble(value) {
		throw new Error("<Typewriter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get cursor() {
		throw new Error("<Typewriter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set cursor(value) {
		throw new Error("<Typewriter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	get delay() {
		throw new Error("<Typewriter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}

	set delay(value) {
		throw new Error("<Typewriter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
	}
}

/* src/pages/index.svelte generated by Svelte v3.29.4 */
const file$1 = "src/pages/index.svelte";

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[8] = list[i].name;
	child_ctx[9] = list[i].description;
	child_ctx[10] = list[i].id;
	child_ctx[11] = list[i].github;
	child_ctx[12] = list[i].website;
	return child_ctx;
}

// (113:4) {#if pageLoaded}
function create_if_block(ctx) {
	let div2;
	let div1;
	let div0;
	let t0;
	let div0_transition;
	let t1;
	let div2_transition;
	let current;
	let each_value = /*props*/ ctx[0].projects;
	validate_each_argument(each_value);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	const block = {
		c: function create() {
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			t0 = text("Projects");
			t1 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			this.h();
		},
		l: function claim(nodes) {
			div2 = claim_element(nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			t0 = claim_text(div0_nodes, "Projects");
			div0_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].l(div1_nodes);
			}

			div1_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "projects-title");
			add_location(div0, file$1, 115, 16, 4378);
			attr_dev(div1, "class", "flex-item");
			add_location(div1, file$1, 114, 12, 4338);
			attr_dev(div2, "class", "flex-container mt-4");
			add_location(div2, file$1, 113, 8, 4247);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div2, anchor);
			append_dev(div2, div1);
			append_dev(div1, div0);
			append_dev(div0, t0);
			append_dev(div1, t1);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			current = true;
		},
		p: function update(ctx, dirty) {
			if (dirty & /*props, getProjectVisibility, closeAllVisibilityExcept*/ 13) {
				each_value = /*props*/ ctx[0].projects;
				validate_each_argument(each_value);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div1, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fly, {}, true);
				div0_transition.run(1);
			});

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			add_render_callback(() => {
				if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, { x: -200, duration: 300 }, true);
				div2_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fly, {}, false);
			div0_transition.run(0);
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			if (!div2_transition) div2_transition = create_bidirectional_transition(div2, fly, { x: -200, duration: 300 }, false);
			div2_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div2);
			if (detaching && div0_transition) div0_transition.end();
			destroy_each(each_blocks, detaching);
			if (detaching && div2_transition) div2_transition.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block.name,
		type: "if",
		source: "(113:4) {#if pageLoaded}",
		ctx
	});

	return block;
}

// (124:28) {#if getProjectVisibility(name)}
function create_if_block_1(ctx) {
	let div1;
	let p;
	let t0_value = /*description*/ ctx[9] + "";
	let t0;
	let p_intro;
	let p_outro;
	let t1;
	let div0;
	let a;
	let img;
	let img_src_value;
	let t2;
	let span;
	let t3;
	let a_href_value;
	let t4;
	let div0_intro;
	let div0_outro;
	let current;
	let if_block = /*website*/ ctx[12] !== "" && create_if_block_2(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			p = element("p");
			t0 = text(t0_value);
			t1 = space();
			div0 = element("div");
			a = element("a");
			img = element("img");
			t2 = space();
			span = element("span");
			t3 = text("GitHub");
			t4 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", {});
			var div1_nodes = children(div1);
			p = claim_element(div1_nodes, "P", {});
			var p_nodes = children(p);
			t0 = claim_text(p_nodes, t0_value);
			p_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", {});
			var div0_nodes = children(div0);
			a = claim_element(div0_nodes, "A", { href: true, target: true, class: true });
			var a_nodes = children(a);
			img = claim_element(a_nodes, "IMG", { alt: true, src: true, class: true });
			t2 = claim_space(a_nodes);
			span = claim_element(a_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t3 = claim_text(span_nodes, "GitHub");
			span_nodes.forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			t4 = claim_space(div0_nodes);
			if (if_block) if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			add_location(p, file$1, 125, 36, 5009);
			attr_dev(img, "alt", "github");
			if (img.src !== (img_src_value = "/icons/github-alt.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "class", "icon");
			add_location(img, file$1, 128, 72, 5321);
			attr_dev(span, "class", "link");
			add_location(span, file$1, 130, 44, 5503);
			attr_dev(a, "href", a_href_value = /*github*/ ctx[11]);
			attr_dev(a, "target", "_blank");
			attr_dev(a, "class", "link");
			add_location(a, file$1, 127, 40, 5230);
			add_location(div0, file$1, 126, 36, 5125);
			add_location(div1, file$1, 124, 32, 4967);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, p);
			append_dev(p, t0);
			append_dev(div1, t1);
			append_dev(div1, div0);
			append_dev(div0, a);
			append_dev(a, img);
			append_dev(a, t2);
			append_dev(a, span);
			append_dev(span, t3);
			append_dev(div0, t4);
			if (if_block) if_block.m(div0, null);
			current = true;
		},
		p: function update(ctx, dirty) {
			if ((!current || dirty & /*props*/ 1) && t0_value !== (t0_value = /*description*/ ctx[9] + "")) set_data_dev(t0, t0_value);

			if (!current || dirty & /*props*/ 1 && a_href_value !== (a_href_value = /*github*/ ctx[11])) {
				attr_dev(a, "href", a_href_value);
			}

			if (/*website*/ ctx[12] !== "") {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					if_block.m(div0, null);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}
		},
		i: function intro(local) {
			if (current) return;

			add_render_callback(() => {
				if (p_outro) p_outro.end(1);
				if (!p_intro) p_intro = create_in_transition(p, fly, { x: -100, duration: 700, delay: 500 });
				p_intro.start();
			});

			add_render_callback(() => {
				if (div0_outro) div0_outro.end(1);
				if (!div0_intro) div0_intro = create_in_transition(div0, fly, { y: -35, duration: 700, delay: 1500 });
				div0_intro.start();
			});

			current = true;
		},
		o: function outro(local) {
			if (p_intro) p_intro.invalidate();
			p_outro = create_out_transition(p, fade, {});
			if (div0_intro) div0_intro.invalidate();
			div0_outro = create_out_transition(div0, fade, {});
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (detaching && p_outro) p_outro.end();
			if (if_block) if_block.d();
			if (detaching && div0_outro) div0_outro.end();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_1.name,
		type: "if",
		source: "(124:28) {#if getProjectVisibility(name)}",
		ctx
	});

	return block;
}

// (134:40) {#if website !== ''}
function create_if_block_2(ctx) {
	let a;
	let img;
	let img_src_value;
	let t0;
	let span;
	let t1;
	let a_href_value;

	const block = {
		c: function create() {
			a = element("a");
			img = element("img");
			t0 = space();
			span = element("span");
			t1 = text("Website");
			this.h();
		},
		l: function claim(nodes) {
			a = claim_element(nodes, "A", { href: true, target: true, class: true });
			var a_nodes = children(a);
			img = claim_element(a_nodes, "IMG", { alt: true, src: true, class: true });
			t0 = claim_space(a_nodes);
			span = claim_element(a_nodes, "SPAN", { class: true });
			var span_nodes = children(span);
			t1 = claim_text(span_nodes, "Website");
			span_nodes.forEach(detach_dev);
			a_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(img, "alt", "website");
			if (img.src !== (img_src_value = "/icons/web.svg")) attr_dev(img, "src", img_src_value);
			attr_dev(img, "class", "icon");
			add_location(img, file$1, 135, 76, 5783);
			attr_dev(span, "class", "link");
			add_location(span, file$1, 137, 48, 5967);
			attr_dev(a, "href", a_href_value = /*website*/ ctx[12]);
			attr_dev(a, "target", "_blank");
			attr_dev(a, "class", "link");
			add_location(a, file$1, 134, 44, 5687);
		},
		m: function mount(target, anchor) {
			insert_dev(target, a, anchor);
			append_dev(a, img);
			append_dev(a, t0);
			append_dev(a, span);
			append_dev(span, t1);
		},
		p: function update(ctx, dirty) {
			if (dirty & /*props*/ 1 && a_href_value !== (a_href_value = /*website*/ ctx[12])) {
				attr_dev(a, "href", a_href_value);
			}
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(a);
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_if_block_2.name,
		type: "if",
		source: "(134:40) {#if website !== ''}",
		ctx
	});

	return block;
}

// (118:16) {#each props.projects as {name, description, id, github, website}}
function create_each_block(ctx) {
	let div1;
	let h2;
	let t0_value = /*name*/ ctx[8] + "";
	let t0;
	let t1;
	let div0;
	let show_if = /*getProjectVisibility*/ ctx[2](/*name*/ ctx[8]);
	let div1_data_flip_key_value;
	let div1_transition;
	let t2;
	let current;
	let mounted;
	let dispose;
	let if_block = show_if && create_if_block_1(ctx);

	const block = {
		c: function create() {
			div1 = element("div");
			h2 = element("h2");
			t0 = text(t0_value);
			t1 = space();
			div0 = element("div");
			if (if_block) if_block.c();
			t2 = space();
			this.h();
		},
		l: function claim(nodes) {
			div1 = claim_element(nodes, "DIV", {
				class: true,
				"data-flip-key": true,
				"data-flip-no-scale": true
			});

			var div1_nodes = children(div1);
			h2 = claim_element(div1_nodes, "H2", { class: true, "data-flip-no-scale": true });
			var h2_nodes = children(h2);
			t0 = claim_text(h2_nodes, t0_value);
			h2_nodes.forEach(detach_dev);
			t1 = claim_space(div1_nodes);
			div0 = claim_element(div1_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			if (if_block) if_block.l(div0_nodes);
			div0_nodes.forEach(detach_dev);
			div1_nodes.forEach(detach_dev);
			t2 = claim_space(nodes);
			this.h();
		},
		h: function hydrate() {
			attr_dev(h2, "class", "pointer");
			attr_dev(h2, "data-flip-no-scale", "");
			add_location(h2, file$1, 120, 24, 4706);
			attr_dev(div0, "class", "details");
			add_location(div0, file$1, 122, 24, 4852);
			attr_dev(div1, "class", "stuff");
			attr_dev(div1, "data-flip-key", div1_data_flip_key_value = /*id*/ ctx[10]);
			attr_dev(div1, "data-flip-no-scale", "");
			add_location(div1, file$1, 118, 20, 4540);
		},
		m: function mount(target, anchor) {
			insert_dev(target, div1, anchor);
			append_dev(div1, h2);
			append_dev(h2, t0);
			append_dev(div1, t1);
			append_dev(div1, div0);
			if (if_block) if_block.m(div0, null);
			insert_dev(target, t2, anchor);
			current = true;

			if (!mounted) {
				dispose = listen_dev(
					h2,
					"click",
					function () {
						if (is_function(/*closeAllVisibilityExcept*/ ctx[3](/*name*/ ctx[8]))) /*closeAllVisibilityExcept*/ ctx[3](/*name*/ ctx[8]).apply(this, arguments);
					},
					false,
					false,
					false
				);

				mounted = true;
			}
		},
		p: function update(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*props*/ 1) && t0_value !== (t0_value = /*name*/ ctx[8] + "")) set_data_dev(t0, t0_value);
			if (dirty & /*props*/ 1) show_if = /*getProjectVisibility*/ ctx[2](/*name*/ ctx[8]);

			if (show_if) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*props*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(div0, null);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}

			if (!current || dirty & /*props*/ 1 && div1_data_flip_key_value !== (div1_data_flip_key_value = /*id*/ ctx[10])) {
				attr_dev(div1, "data-flip-key", div1_data_flip_key_value);
			}
		},
		i: function intro(local) {
			if (current) return;
			transition_in(if_block);

			add_render_callback(() => {
				if (!div1_transition) div1_transition = create_bidirectional_transition(
					div1,
					fade,
					{
						x: -100,
						delay: 500 + 260 * (/*id*/ ctx[10] + 1)
					},
					true
				);

				div1_transition.run(1);
			});

			current = true;
		},
		o: function outro(local) {
			transition_out(if_block);

			if (!div1_transition) div1_transition = create_bidirectional_transition(
				div1,
				fade,
				{
					x: -100,
					delay: 500 + 260 * (/*id*/ ctx[10] + 1)
				},
				false
			);

			div1_transition.run(0);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(div1);
			if (if_block) if_block.d();
			if (detaching && div1_transition) div1_transition.end();
			if (detaching) detach_dev(t2);
			mounted = false;
			dispose();
		}
	};

	dispatch_dev("SvelteRegisterBlock", {
		block,
		id: create_each_block.name,
		type: "each",
		source: "(118:16) {#each props.projects as {name, description, id, github, website}}",
		ctx
	});

	return block;
}

function create_fragment$1(ctx) {
	let main;
	let div4;
	let div3;
	let div2;
	let div0;
	let t0_value = /*props*/ ctx[0].author + "";
	let t0;
	let div0_transition;
	let t1;
	let div1;
	let t2_value = /*props*/ ctx[0].position + "";
	let t2;
	let t3;
	let a0;
	let img0;
	let img0_src_value;
	let a0_href_value;
	let t4;
	let a1;
	let img1;
	let img1_src_value;
	let a1_href_value;
	let t5;
	let a2;
	let img2;
	let img2_src_value;
	let a2_href_value;
	let t6;
	let current;
	let if_block = /*pageLoaded*/ ctx[1] && create_if_block(ctx);

	const block = {
		c: function create() {
			main = element("main");
			div4 = element("div");
			div3 = element("div");
			div2 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			div1 = element("div");
			t2 = text(t2_value);
			t3 = space();
			a0 = element("a");
			img0 = element("img");
			t4 = space();
			a1 = element("a");
			img1 = element("img");
			t5 = space();
			a2 = element("a");
			img2 = element("img");
			t6 = space();
			if (if_block) if_block.c();
			this.h();
		},
		l: function claim(nodes) {
			main = claim_element(nodes, "MAIN", {});
			var main_nodes = children(main);
			div4 = claim_element(main_nodes, "DIV", { class: true });
			var div4_nodes = children(div4);
			div3 = claim_element(div4_nodes, "DIV", { class: true });
			var div3_nodes = children(div3);
			div2 = claim_element(div3_nodes, "DIV", { class: true });
			var div2_nodes = children(div2);
			div0 = claim_element(div2_nodes, "DIV", { class: true });
			var div0_nodes = children(div0);
			t0 = claim_text(div0_nodes, t0_value);
			div0_nodes.forEach(detach_dev);
			t1 = claim_space(div2_nodes);
			div1 = claim_element(div2_nodes, "DIV", { class: true });
			var div1_nodes = children(div1);
			t2 = claim_text(div1_nodes, t2_value);
			div1_nodes.forEach(detach_dev);
			t3 = claim_space(div2_nodes);
			a0 = claim_element(div2_nodes, "A", { href: true, target: true, class: true });
			var a0_nodes = children(a0);
			img0 = claim_element(a0_nodes, "IMG", { alt: true, src: true, class: true });
			a0_nodes.forEach(detach_dev);
			t4 = claim_space(div2_nodes);
			a1 = claim_element(div2_nodes, "A", { href: true, target: true, class: true });
			var a1_nodes = children(a1);
			img1 = claim_element(a1_nodes, "IMG", { alt: true, src: true, class: true });
			a1_nodes.forEach(detach_dev);
			t5 = claim_space(div2_nodes);
			a2 = claim_element(div2_nodes, "A", { href: true, target: true, class: true });
			var a2_nodes = children(a2);
			img2 = claim_element(a2_nodes, "IMG", { alt: true, src: true, class: true });
			a2_nodes.forEach(detach_dev);
			div2_nodes.forEach(detach_dev);
			div3_nodes.forEach(detach_dev);
			div4_nodes.forEach(detach_dev);
			t6 = claim_space(main_nodes);
			if (if_block) if_block.l(main_nodes);
			main_nodes.forEach(detach_dev);
			this.h();
		},
		h: function hydrate() {
			attr_dev(div0, "class", "author");
			add_location(div0, file$1, 99, 16, 3423);
			attr_dev(div1, "class", "position");
			add_location(div1, file$1, 100, 16, 3496);
			attr_dev(img0, "alt", "github");
			if (img0.src !== (img0_src_value = "/icons/github-alt.svg")) attr_dev(img0, "src", img0_src_value);
			attr_dev(img0, "class", "icon");
			add_location(img0, file$1, 102, 20, 3637);
			attr_dev(a0, "href", a0_href_value = /*props*/ ctx[0].github);
			attr_dev(a0, "target", "_blank");
			attr_dev(a0, "class", "link ml-4");
			add_location(a0, file$1, 101, 16, 3557);
			attr_dev(img1, "alt", "linkedin");
			if (img1.src !== (img1_src_value = "/icons/linkedin.svg")) attr_dev(img1, "src", img1_src_value);
			attr_dev(img1, "class", "icon");
			add_location(img1, file$1, 105, 20, 3817);
			attr_dev(a1, "href", a1_href_value = /*props*/ ctx[0].linkedin);
			attr_dev(a1, "target", "_blank");
			attr_dev(a1, "class", "link ml-4");
			add_location(a1, file$1, 104, 16, 3735);
			attr_dev(img2, "alt", "twitter");
			if (img2.src !== (img2_src_value = "/icons/twitter.svg")) attr_dev(img2, "src", img2_src_value);
			attr_dev(img2, "class", "icon");
			add_location(img2, file$1, 107, 76, 3975);
			attr_dev(a2, "href", a2_href_value = /*props*/ ctx[0].twitter);
			attr_dev(a2, "target", "_blank");
			attr_dev(a2, "class", "link ml-4");
			add_location(a2, file$1, 107, 16, 3915);
			attr_dev(div2, "class", "author-card");
			add_location(div2, file$1, 98, 12, 3381);
			attr_dev(div3, "class", "flex-item");
			add_location(div3, file$1, 97, 8, 3345);
			attr_dev(div4, "class", "flex-container mt-3");
			add_location(div4, file$1, 96, 4, 3303);
			add_location(main, file$1, 95, 0, 3292);
		},
		m: function mount(target, anchor) {
			insert_dev(target, main, anchor);
			append_dev(main, div4);
			append_dev(div4, div3);
			append_dev(div3, div2);
			append_dev(div2, div0);
			append_dev(div0, t0);
			append_dev(div2, t1);
			append_dev(div2, div1);
			append_dev(div1, t2);
			append_dev(div2, t3);
			append_dev(div2, a0);
			append_dev(a0, img0);
			append_dev(div2, t4);
			append_dev(div2, a1);
			append_dev(a1, img1);
			append_dev(div2, t5);
			append_dev(div2, a2);
			append_dev(a2, img2);
			append_dev(main, t6);
			if (if_block) if_block.m(main, null);
			current = true;
		},
		p: function update(ctx, [dirty]) {
			if ((!current || dirty & /*props*/ 1) && t0_value !== (t0_value = /*props*/ ctx[0].author + "")) set_data_dev(t0, t0_value);
			if ((!current || dirty & /*props*/ 1) && t2_value !== (t2_value = /*props*/ ctx[0].position + "")) set_data_dev(t2, t2_value);

			if (!current || dirty & /*props*/ 1 && a0_href_value !== (a0_href_value = /*props*/ ctx[0].github)) {
				attr_dev(a0, "href", a0_href_value);
			}

			if (!current || dirty & /*props*/ 1 && a1_href_value !== (a1_href_value = /*props*/ ctx[0].linkedin)) {
				attr_dev(a1, "href", a1_href_value);
			}

			if (!current || dirty & /*props*/ 1 && a2_href_value !== (a2_href_value = /*props*/ ctx[0].twitter)) {
				attr_dev(a2, "href", a2_href_value);
			}

			if (/*pageLoaded*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*pageLoaded*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(main, null);
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

			add_render_callback(() => {
				if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, {}, true);
				div0_transition.run(1);
			});

			transition_in(if_block);
			current = true;
		},
		o: function outro(local) {
			if (!div0_transition) div0_transition = create_bidirectional_transition(div0, fade, {}, false);
			div0_transition.run(0);
			transition_out(if_block);
			current = false;
		},
		d: function destroy(detaching) {
			if (detaching) detach_dev(main);
			if (detaching && div0_transition) div0_transition.end();
			if (if_block) if_block.d();
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
	let { $$slots: slots = {}, $$scope } = $$props;
	validate_slots("Pages", slots, []);

	const props = {
		author: "Rui Sousa",
		position: "Software developer",
		twitter: "https://twitter.com/rsousacode",
		github: "https://github.com/rsousacode",
		linkedin: "https://linkedin.com/in/rsousa",
		uid: 0,
		projects: [
			{
				id: 0,
				name: "Commands and Snippets",
				description: "Web app that allows storing useful snippets and commands. It has a branch with authentication provided. ",
				github: "https://github.com/rsousacode/CommandsAndSnippets",
				website: "",
				toggled: false,
				tech: ".Net Core Mvc 3.x, T-SQL, Angular, Vue.Js, Quasar"
			},
			{
				id: 1,
				name: "Winter Come",
				description: "Backend, for the Winter Come game. The player can do Qr login from the companion app to be able to sign in in the game. ",
				github: "https://github.com/rsousacode/WinterComeBackend",
				toggled: false,
				website: "https://bigmonte.com/projects/wintercome/",
				tech: "Node.JS, Express, Mongoose, MongoDB, C# (Client)"
			},
			{
				id: 2,
				name: "Puryon",
				description: "Frontend and Backend, for the Puryon FPS multiplayer game made in UE4, which presents real-time statistics and data about the game being played.",
				github: "https://github.com/rsousacode/puryon_backend",
				toggled: false,
				website: "https://bigmonte.com/projects/puryon/",
				tech: "Node.JS, Express, Mongoose, MongoDB, React.Js, C++ (Client)"
			},
			{
				id: 3,
				name: "Lusoportunas",
				description: "Streamlines the job finding process " + "and has a comprehensive dashboard for recruiters and job seekers with a communication" + "platform that allows both to connect easily.",
				github: "https://github.com/rsousacode/Lusoportunas",
				toggled: false,
				website: "",
				tech: "Node.JS, Express, Mongoose, MongoDB, Pug, Passport"
			}
		]
	};

	// auxiliar
	let termPrompt = "> ";

	let pageLoaded = false;
	let timeouts = [];

	// functions
	function getProjectVisibility(name) {
		return props.projects.filter(d => d.name === name)[0].visible;
	}

	function toggleProjectVisibility(name) {
		const index = props.projects.findIndex(p => p.name === name);
		$$invalidate(0, props.projects[index].visible = !props.projects[index].visible, props);
	}

	function closeAllVisibilityExcept(name) {
		toggleProjectVisibility(name);
		let i;

		for (i = 0; i < props.projects.length; i++) {
			const project = props.projects[i];

			if (project.name !== name) {
				$$invalidate(0, props.projects[i].visible = false, props);
			}
		}
	}

	function simulateLoading() {
		setTimeout(
			() => {
				$$invalidate(1, pageLoaded = true);
			},
			800
		);
	}

	simulateLoading();
	const writable_props = [];

	Object.keys($$props).forEach(key => {
		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Pages> was created with unknown prop '${key}'`);
	});

	$$self.$capture_state = () => ({
		fly,
		fade,
		TypeWriter: Typewriter,
		props,
		termPrompt,
		pageLoaded,
		timeouts,
		getProjectVisibility,
		toggleProjectVisibility,
		closeAllVisibilityExcept,
		simulateLoading
	});

	$$self.$inject_state = $$props => {
		if ("termPrompt" in $$props) termPrompt = $$props.termPrompt;
		if ("pageLoaded" in $$props) $$invalidate(1, pageLoaded = $$props.pageLoaded);
		if ("timeouts" in $$props) timeouts = $$props.timeouts;
	};

	if ($$props && "$$inject" in $$props) {
		$$self.$inject_state($$props.$$inject);
	}

	return [props, pageLoaded, getProjectVisibility, closeAllVisibilityExcept];
}

class Pages extends SvelteComponentDev {
	constructor(options) {
		super(options);
		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

		dispatch_dev("SvelteRegisterComponent", {
			component: this,
			tagName: "Pages",
			options,
			id: create_fragment$1.name
		});
	}
}

var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Pages
});

export { index as i, sleep as s, typingInterval as t };
//# sourceMappingURL=index-c4898b44.js.map
