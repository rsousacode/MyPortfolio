
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
import './main-09938019.js';
import { s as sleep } from './index-c4898b44.js';

/// <reference path='../types.js' />

let elementsToScramble = [];

const getMatchingLetters = elementWithScrambledText =>
	elementsToScramble.find(element => element.currentNode === elementWithScrambledText);

const scrambleLetters = element => {
	const scrambledText = element.textContent
		.split('')
		.map((letter, letterIdx) => {
			const { matchingLetters } = getMatchingLetters(element);
			const foundMatchingLetterOrSpace = matchingLetters.includes(letterIdx) || letter === ' ';
			const randomLetter = String.fromCharCode(65 + Math.round(Math.random() * 50));
			return foundMatchingLetterOrSpace ? letter : randomLetter
		})
		.join('');
	element.textContent = scrambledText;
};

const hasMatchingLetter = (elementWithScrambledText, normalText) => {
	const scrambledText = elementWithScrambledText.textContent;
	normalText.forEach((letter, i) => {
		const { matchingLetters } = getMatchingLetters(elementWithScrambledText);
		!matchingLetters.includes(i) && letter === scrambledText[i] && matchingLetters.push(i);
	});
};

/** @type {TypewriterModeFn} */
var scramble = async ({ elements }, options) => {
	elementsToScramble = [
		...elements.map(({ currentNode }) => ({ currentNode, matchingLetters: [] }))
	];
	await new Promise(resolve => {
		elements.forEach(async ({ currentNode, text }) => {
			const scrambleDuration = typeof options.scramble == 'number' ? options.scramble : 3000;
			const startTime = new Date().getTime();
			while (true) {
				scrambleLetters(currentNode);
				hasMatchingLetter(currentNode, text);
				await sleep(options.interval);
				const scrambledTextMatch = currentNode.textContent != text.join('');
				const didTimeout = new Date().getTime() - startTime < scrambleDuration;
				if (!scrambledTextMatch || !didTimeout) {
					resolve();
					break
				}
			}
			currentNode.textContent = text.join('');
		});
	});
	options.dispatch('done');
};

export default scramble;
//# sourceMappingURL=scramble-38a9a5bd.js.map
