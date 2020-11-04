
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
var _default = async ({ elements }, options) => {
	for (const element of elements) typewriterEffect(element, options);
	const { currentNode: lastElementToFinish } = elements.reduce((longestTextElement, element) => {
		const longestTextLength = longestTextElement.text.length;
		return element.text.length > longestTextLength
			? (longestTextElement = element)
			: longestTextElement
	});

	const observer = new MutationObserver(mutations => {
		mutations.forEach(mutation => {
			const lastElementFinishedTyping = !mutation.target.classList.contains('typing');
			if (mutation.type === 'attributes' && lastElementFinishedTyping) {
				options.dispatch('done');
			}
		});
	});

	observer.observe(lastElementToFinish, {
		attributes: true,
		childList: true,
		subtree: true
	});
};

export default _default;
//# sourceMappingURL=default-93297434.js.map
