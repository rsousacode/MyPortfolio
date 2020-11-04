
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import './main-dc98cdbc.js';
import { t as typingInterval } from './index-32aec052.js';

/// <reference path='../types.js' />

/** @type {TypewriterEffectFn} */
const typewriterEffect = async ({ currentNode, text }, options) => {
	currentNode.textContent = '';
	currentNode.classList.add('typing');
	for (const letter of text) {
		currentNode.textContent += letter;
		await typingInterval(options.interval);
	}
	currentNode.nextSibling !== null && currentNode.classList.length == 1
		? currentNode.removeAttribute('class')
		: currentNode.classList.remove('typing');
};

/** @type {TypewriterModeFn} */
var cascade = async ({ elements }, options) => {
	elements.forEach(({ currentNode }) => (currentNode.textContent = ''));
	for (const element of elements) await typewriterEffect(element, options);
	options.dispatch('done');
};

export default cascade;
//# sourceMappingURL=cascade-cbe813ba.js.map
