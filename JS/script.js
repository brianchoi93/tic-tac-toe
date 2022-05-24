/* constants */
const PLAYER1_MARK = 'red';
const PLAYER2_MARK = 'blue';

/* app's state (variables) */
let currentPlayer;
const player1Boxes = [];
const player2Boxes = [];

/* cached element references */
const mainElement = document.querySelector('main');
const resetButtonElement = document.querySelector('.reset');
const playerElement = document.querySelector('#js-player');
const playButtonElement = document.querySelector('#js-play-btn');
const welcomeModalElement = document.querySelector('.modal-welcome');
const boxes = document.querySelectorAll('.box');

/* event listeners */
playButtonElement.addEventListener('click', init);
mainElement.addEventListener('click', changeGrid);
resetButtonElement.addEventListener('click', init);

/* functions */
function init() {
	//hide modal and show game screen
	welcomeModalElement.classList.add('hide');
	currentPlayer = 1;
	playerElement.innerText = 'Player 1';
	player1Boxes.length = 0;
	player2Boxes.length = 0;
	boxes.forEach(function (box) {
		box.style.backgroundColor = 'white';
	});
}

function changeGrid(element) {
	const box = element.target;
	if (box.classList.contains('box')) {
		const boxId = parseInt(box.id);
		//check if box is already selected
		if (player1Boxes.includes(boxId) || player2Boxes.includes(boxId)) {
			alert('Please select a different box.');
		} else if (currentPlayer === 1) {
			player1Boxes.push(boxId);
			box.style.backgroundColor = PLAYER1_MARK;
			currentPlayer = 2;
			playerElement.innerText = 'Player 2';
		} else {
			player2Boxes.push(boxId);
			box.style.backgroundColor = PLAYER2_MARK;
			currentPlayer = 1;
			playerElement.innerText = 'Player 1';
		}
	}
}
