// le js a ete fait par claude le goat

// URL of this script, used to build paths that work from any page
const scriptUrl = document.currentScript.src;
const style1 = new URL('style1.css', scriptUrl).href;
const style2 = new URL('style2.css', scriptUrl).href;

document.addEventListener('DOMContentLoaded', () => {
	const allGames = document.querySelectorAll('.game');

	// Each h3 in the timeline starts a branch; its games are the links up to the next h3
	const branchData = Array.from(document.querySelectorAll('.timeline_branch h3')).map(title => {
		const ids = [];
		let element = title.nextElementSibling;
		while (element && element.tagName !== 'H3') {
			element.querySelectorAll('a[href^="#"]').forEach(link => {
				ids.push(link.getAttribute('href').substring(1));
			});
			element = element.nextElementSibling;
		}
		return { title, ids };
	});

	// Stop here if this page has no timeline
	if (branchData.length === 0) return;

	function showBranch(index) {
		allGames.forEach(game => game.classList.add('is-hidden'));

		branchData[index].ids.forEach(id => {
			const game = document.getElementById(id);
			if (game) game.classList.remove('is-hidden');
		});

		branchData.forEach(branch => branch.title.classList.remove('active'));
		branchData[index].title.classList.add('active');
	}

	function findBranchIndex(id) {
		return branchData.findIndex(branch => branch.ids.includes(id));
	}

	// Click on a branch title
	branchData.forEach((branch, index) => {
		branch.title.addEventListener('click', () => {
			showBranch(index);
			window.scrollTo({ top: 0, behavior: 'smooth' });
			if (branch.ids.length) {
				history.pushState(null, '', '#' + branch.ids[0]);
			}
		});
	});

	// Click on a game link
	document.querySelectorAll('.timeline_games a').forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault();

			const id = link.getAttribute('href').substring(1);
			const index = findBranchIndex(id);
			if (index !== -1) showBranch(index);

			const game = document.getElementById(id);
			if (game) {
				game.scrollIntoView({ behavior: 'smooth', block: 'start' });
				history.pushState(null, '', '#' + id);
			}
		});
	});

	window.addEventListener('popstate', () => {
		const id = window.location.hash.substring(1);
		const index = findBranchIndex(id);
		if (index !== -1) showBranch(index);
	});

	const hash = window.location.hash.substring(1);
	const startIndex = findBranchIndex(hash);
	showBranch(startIndex !== -1 ? startIndex : 0);
});

// Konami code: up up down down left right left right B A
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
	'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
	'b', 'a'];
let keysPressed = [];

document.addEventListener('keydown', (event) => {
	const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
	keysPressed.push(key);
	keysPressed = keysPressed.slice(-konamiCode.length);

	if (keysPressed.join(',') === konamiCode.join(',')) {
		activateEasterEgg();
		keysPressed = [];
	}
});

function activateEasterEgg() {
	const video = document.getElementById('video');

	if (video) {
		video.setAttribute('src', 'https://www.youtube.com/embed/ci8HQFF6d5A?si=jeSnlKNLc1LiQIFd');
		console.log('Easter egg activated');
	}
}


// par contre ca c'est moi qui lai fait

function changeStyle() {
	const link = document.getElementById('linkSource');
	const sound1 = new Audio(new URL('Sounds/sound1.mp3', scriptUrl).href);
	const sound2 = new Audio(new URL('Sounds/sound2.mp3', scriptUrl).href);

	if (link.href.endsWith('style1.css')) {
		sound1.play();
		link.setAttribute('href', style2);
	} else {
		sound2.play();
		link.setAttribute('href', style1);
	}
}

function sendMail() {
	const senderName = document.getElementById('nameForm').value;
	const message = document.getElementById('messageForm').value;

	window.location.href =
		'mailto:lauris.amendola@etu.univ-amu.fr,lohan.nanthavongdouangsy@etu.univ-amu.fr,eloise.goulais@etu.univ-amu.fr,anna-lucia.puddinu@etu.univ-amu.fr' +
		'?subject=' + encodeURIComponent('Message de la part de ' + senderName) +
		'&body=' + encodeURIComponent(message);
}
