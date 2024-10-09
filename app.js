/*-------------- Constants -------------*/

//all card types are defined 
const cardTypes = {
    King:{ name: 'King',attack: 1, health:4, class: 'king'},
    Queen:{ name: 'Queen', attack: 4, health:3, class: 'queen'},
    Rook:{ name: 'Rook', attack: 2, health:4, class: 'rook'},
    Bishop:{ name: 'Bishop', attack: 3, health:2, class: 'bishop'},
    Knight:{ name: 'Knight', attack: 2, health:2, class: 'knight'},
    Pawn:{ name: 'Pawn', attack: 1, health:1, class: 'pawn'},
}



/*---------- Variables (state) ---------*/

// Initialized decks for both players 
let deck1 = creatDeck(cardTypes);
let deck2 = creatDeck(cardTypes);

shuffle(deck1);
shuffle(deck2);

console.log(deck1);
// Initialize hands and the playing area for players 
let hand1 =[];
let hand2 =[];
let playArea1 = [];
let playArea2 = [];

//track the current player
let currentplayer = 2;

let gameOver = false;

let selectedCardIndex = null;

/*----- Cached Element References  -----*/
 
//player hands and ther buttons 
const player1Hand = document.getElementById('player1-hand');
const player2Hand = document.getElementById('player2-hand');
const drawCardBtn= document.getElementById('draw-card-btn');
const playCardBtn= document.getElementById('play-card-btn');
const startGameBtn= document.querySelector('#start-game-btn');
const ResetGameBtn= document.getElementById('reset-game-btn');


/*-------------- Functions -------------*/

//this function will start the game and give each player four cards
function startGame(){

    for (let i = 0; i < 4; i++){
        hand1.push(deck1.pop());
        hand2.push(deck2.pop());
    }

    updateHandDisplay();

}


// this function will make the main deck
function creatDeck() {
const deck =[];
deck.push(cardTypes.King);
deck.push(cardTypes.Queen);
deck.push(cardTypes.Rook, cardTypes.Rook);
deck.push(cardTypes.Bishop, cardTypes.Bishop);
deck.push(cardTypes.Knight, cardTypes.Knight);
deck.push(cardTypes.Pawn, cardTypes.Pawn, cardTypes.Pawn, cardTypes.Pawn);
return deck;
}

// shuffle cards
function shuffle(array) {
  for (let i = 0; i < array.length; i++){
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }}

// Draw cards 
function drawDeck(deck){
if (deck.length ===0){
    return null;
}
    return deck.pop();
}

//function for attacking 
function attack(attacker, defender){
if(defender.health <= 0){
    return;
}
defender.health -= attacker.attack;
console.log(`${attacker.name} attacked ${defender.name} and dealt ${attacker.attack} damage. ${defender.name} has ${defender.health} health left.`);
}

//turn management function
function nextTurn(){
if(currentplayer === 1){
    currentplayer = 2;
} else {
    currentplayer = 1;
}
}

//win condition function
function checkWinCondition(){
if(hand1.length === 0){
    alert('Player 2 wins!');
    resetGame();
}
if (hand1.King.health===0){
    alert('Player 2 wins!');
    resetGame();
}
if(hand2.length === 0){
    alert('Player 1 wins!');
    resetGame();
}
if (hand2.King.health===0){
    alert('Player 1 wins!');
    resetGame();
}
}

// reset game function
// function resetGame(){
//     deck1= creatDeck();
//     deck2 = creatDeck();
//     deck1= shuffleDeck(deck1);
//     deck2= shuffleDeck(deck2);
//     hand1 = [];
//     hand2 = [];
//     playingArea = [];
//     currentplayer = 2;
//     updateHandDisplay();
// }

// update hand display for both players 

function updateHandDisplay(){
    player1Hand.innerHTML = '';
    player2Hand.innerHTML = '';
    hand1.forEach(cardType => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('cardType');
      cardElement.innerHTML = cardType.name;
      player1Hand.appendChild(cardElement);
    });
    hand2.forEach(cardType => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('cardType');
      cardElement.innerHTML = cardType.name;
      player2Hand.appendChild(cardElement);
    });
  };
// need a function that will loop through a hand and
// create a list of cards from the card objects in the
// hand array and then we append each of those cards we 
// create into the container
// int he loop
// create card el
// giv ethe classes and textContent
// playerHand#.appendChild(card)







/*----------- Event Listeners ----------*/
startGameBtn.addEventListener('click', () => {
    startGame();
    startGameBtn.style.display = 'none';
    ResetGameBtn.style.display = 'block';
  });

  drawCardBtn.addEventListener('click', () => {
    if (hand2.length>5){
        return;
    }
    else{
         hand2.push(drawDeck(deck2));
    updateHandDisplay();
    }
  });

  playCardBtn.addEventListener('click', () => {
    // TODO: Implement the logic to play a card
  });

  ResetGameBtn.addEventListener('click', () => {
    // resetGame();
    startGameBtn.style.display = 'block';
    ResetGameBtn.style.display = 'none';
  });