
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import './main-dc98cdbc.js';
import { s as sleep, t as typingInterval } from './index-32aec052.js';

/// <reference path='../types.js' />

const cleanChildNodes = node => node.childNodes.forEach(el => el.remove());

/** @type {TypewriterEffectFn} */
const typewriterEffect = async ({ currentNode, text }, options) => {
	currentNode.textContent = '';
	currentNode.classList.add('typing');
	for (const letter of text) {
		currentNode.textContent += letter;
		const fullyWritten = currentNode.textContent === text.join('');
		if (fullyWritten) {
			options.dispatch('done');
			await sleep(typeof options.loop === 'number' ? options.loop : 1500);
			while (currentNode.textContent !== '') {
				currentNode.textContent = currentNode.textContent.slice(0, -1);
				await typingInterval(options.interval);
			}
		}
		await typingInterval(options.interval);
	}
	currentNode.nextSibling !== null && currentNode.classList.length == 1
		? currentNode.removeAttribute('class')
		: currentNode.classList.remove('typing');
};

/** @type {TypewriterModeFn} */
var loop = async ({ node, elements }, options) => {
	while (options.loop) {
		for (const { currentNode, text } of elements) {
			cleanChildNodes(node);
			const loopParagraphTag = currentNode.tagName.toLowerCase();
			const loopParagraph = document.createElement(loopParagraphTag);
			loopParagraph.textContent = text.join('');
			node.appendChild(loopParagraph);
			await typewriterEffect({ currentNode: loopParagraph, text }, options);
			node.childNodes.forEach(el => el.remove());
			cleanChildNodes(node);
		}
	}
};

export default loop;
//# sourceMappingURL=loop-461a6955.js.map
