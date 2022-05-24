/* constants */
const PLAYER1_MARK = 'red';
const PLAYER2_MARK = 'blue';
const WINNING_ARRAY = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 5, 9],
	[3, 5, 7],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
];

/* app's state (variables) */
let currentPlayer;
const player1Boxes = [];
const player2Boxes = [];
const player1Score = 0;
const player2Score = 0;

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
	playerElement.innerText = currentPlayer;
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
			checkForWinner();
			box.style.backgroundColor = PLAYER1_MARK;
			currentPlayer = 2;
			playerElement.innerText = currentPlayer;
		} else {
			player2Boxes.push(boxId);
			checkForWinner();
			box.style.backgroundColor = PLAYER2_MARK;
			currentPlayer = 1;
			playerElement.innerText = currentPlayer;
		}
	}
}

function checkForWinner() {
	let playerBoxes;
	if (currentPlayer === 1) {
		playerBoxes = player1Boxes;
	} else {
		playerBoxes = player2Boxes;
	}
	// check if player has 3 in a row
	// winning combos: [1,2,3][4,5,6][7,8,9][3,5,7][1,5,9][1,4,6][2,5,8][3,6,9]
	for (let i = 0; i < WINNING_ARRAY.length; i++) {
		const containsAll = WINNING_ARRAY[i].every((element) => {
			return playerBoxes.includes(element);
		});
		if (containsAll === true) {
			return true;
		}
	}
	return false;
}
