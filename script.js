'use strict';

const newGameBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollDiceBtn = document.querySelector('.btn--roll');
const diceImage = document.querySelector('.dice');
const p1 = document.querySelector('.player--0');
const p2 = document.querySelector('.player--1');
const p1Cur = document.getElementById('current--0');
const p2Cur = document.getElementById('current--1');
const p1Score = document.getElementById('score--0');
const p2Score = document.getElementById('score--1');

let player1Score = 0;
let player2Score = 0;
let turn = 1;
diceImage.classList.add('hidden');

const switchPlayers = function () {
  if (turn > 0) {
    p1.classList.remove('player--active');
    p2.classList.add('player--active');
    p1Cur.textContent = 0;
    turn *= -1;
  } else {
    p2.classList.remove('player--active');
    p1.classList.add('player--active');
    p2Cur.textContent = 0;
    turn *= -1;
  }
};

const updateCurrent = function (roll) {
  if (roll > 1) {
    if (turn > 0) {
      p1Cur.textContent = Number(p1Cur.textContent) + roll;
    } else {
      p2Cur.textContent = Number(p2Cur.textContent) + roll;
    }
  }
};

const diceRoll = function () {
  if (diceImage.classList.contains('hidden'))
    diceImage.classList.remove('hidden');
  const roll = Math.trunc(Math.random() * 6) + 1;
  if (roll !== 1) {
    diceImage.src = `dice-${roll}.png`;
    updateCurrent(roll);
  } else {
    diceImage.src = 'dice-1.png';
    switchPlayers();
  }
};

const playerWins = function () {
  holdBtn.classList.add('hidden');
  rollDiceBtn.classList.add('hidden');
  if (turn > 0) {
    p1.classList.add('player--winner');
    document.getElementById('name--0').textContent = 'Player 1 Wins';
  } else {
    p2.classList.add('player--winner');
    document.getElementById('name--1').textContent = 'Playeyr 2 Wins';
  }
};

const hold = function () {
  diceImage.classList.add('hidden');
  if (turn > 0) {
    player1Score += Number(p1Cur.textContent);
    p1Score.textContent = player1Score;
    if (player1Score > 100) playerWins();
    switchPlayers();
  } else {
    player2Score += Number(p2Cur.textContent);
    p2Score.textContent = player2Score;
    if (player2Score > 100) playerWins();
    switchPlayers();
  }
};

const newGame = function () {
  player1Score = 0;
  player2Score = 0;
  turn = -1;
  p1Score.textContent = player1Score;
  p2Score.textContent = player2Score;
  p1Cur.tabIndex = 0;
  p2Cur.textContent = 0;
  diceImage.classList.add('hidden');
  if (holdBtn.classList.contains('hidden')) holdBtn.classList.remove('hidden');
  if (rollDiceBtn.classList.contains('hidden'))
    rollDiceBtn.classList.remove('hidden');
  if (p1.classList.contains('player--winner')) {
    p1.classList.remove('player--winner');
    document.getElementById('name--0').textContent = 'Player 1';
  }
  if (p2.classList.contains('player--winner')) {
    p2.classList.remove('player--winner');
    document.getElementById('name--1').textContent = 'Player 2';
  }
  switchPlayers();
};

// document.addEventListener('keydown', function (e) {
//   if (e.key === 'Enter') diceRoll();
// });
// document.addEventListener('keydown', function (e) {
//   if (e.key === ' ') hold();
// });
rollDiceBtn.addEventListener('click', diceRoll);
holdBtn.addEventListener('click', hold);
newGameBtn.addEventListener('click', newGame);
