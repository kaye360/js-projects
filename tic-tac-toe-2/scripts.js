"use strict"

class Square {

  // 
  // Game DOM element
  game

  // 
  // State of the current square
  // Values: x, o, false
  state = false;

  //
  // DOM element for this square
  el

  // 
  // Constructor
  constructor(game) {

    this.game = game
    this.init()

  }

  // 
  // Init Square
  init() {

    this.el = document.createElement('button')
    game.appendChild(this.el)

  }

  // Play a square
  play(player) {

    this.state = player
    this.el.innerHTML = player
    
  }
}



class TicTacToe {

  // 
  // DOM element #ID for the game
  el

  // 
  // Node list of all game squares
  squaresList

  //
  // Reset Button
  resetBtn = document.querySelector('#reset-game')

  // 
  // Win Line
  line = document.querySelector('#line')

  // 
  // Whose turn is it?
  turn = 'X'

  // 
  // DOM element showing Status of the Game
  gameStatus = document.querySelector('#game-status')

  // 
  // set Game DOM element and initialize game
  constructor(el) {
    this.el = document.getElementById(el)
    this.resetBtn.addEventListener('click', () => this.reset() )
    this.init()
  }

  // 
  // Initialize Game by setting up squares w/ event listeners
  init() {
    this.squaresList = new Array(9).fill(false)

    this.squaresList.forEach( (_, index) => {
      this.squaresList[index] = new Square(this.el)
      this.squaresList[index].el.addEventListener('click', () => {
        this.takeTurn( this.squaresList[index], index)
      })
    })
  }

  // 
  // Actions when player attempts making a turn
  //   Check if square is played
  //   Check if game is over
  takeTurn(square, index) {

    if(this.isSquarePlayed(square)) {

      this.warnAlreadyPlayed(square)
      return

    } else {

      square.play(this.turn)
      this.squaresList[index] = square
      this.toggleTurn()

      if( this.isGameOver() ) this.completeGame()
    }
  }

  // 
  // Check if one square is already played or not
  isSquarePlayed(square) {
    return square.el.innerHTML ? true : false
  }

  // 
  // Warning for when a square is clicked and already played
  warnAlreadyPlayed (square) {
    square.el.classList.add('already-played')
    setTimeout( () => square.el.classList.remove('already-played') , 500)
  }

  // 
  // Reset the game
  reset() {
    this.el.innerHTML = ''
    this.init()
    this.setGameStatus('Game In Progress')
    this.line.removeAttribute('class')
  }

  // 
  // Complete the game and prevent further plays
  completeGame() {
    this.squaresList.forEach( square => {
      square.el.style.pointerEvents = 'none'
    })

    this.setGameStatus('Game Over!')
  }

  // 
  // Check if the game is over. Win or Tie
  // Return true, false, 'tie'
  isGameOver() {

    // Possible array combinations that signify 3 in a row
    let wins = [
      [0, 1, 2], // 0 top row
      [3, 4, 5], // 1 middle row (horizontal)
      [6, 7, 8], // 2 bottom row
      [0, 3, 6], // 3 left row
      [1, 4, 7], // 4 middle row (vertical)
      [2, 5, 8], // 5 right row
      [0, 4, 8], // 6 TL to BR
      [2, 4, 6]  // 7 TR to BL
    ]

    let isWon = false
    let winningRow = false

    // Check for a win
    wins.forEach( (row, index) => {
      if( 

        this.squaresList[ row[0] ].state &&
        this.squaresList[ row[1] ].state &&
        this.squaresList[ row[2] ].state &&
        this.squaresList[ row[0] ].state === this.squaresList[ row[1] ].state &&
        this.squaresList[ row[1] ].state === this.squaresList[ row[2] ].state

      ) {

        winningRow = index
        isWon = this.squaresList[ row[0] ].state
        return this.squaresList[ row[0] ].state 

      }
    })

    // Set Line CSS 
    switch (winningRow) {
      case 0: this.line.classList.add('line-visible', 'line-r1'); break;
      case 1: this.line.classList.add('line-visible', 'line-r2'); break;
      case 2: this.line.classList.add('line-visible', 'line-r3'); break;
      case 3: this.line.classList.add('line-visible', 'line-c1'); break;
      case 4: this.line.classList.add('line-visible', 'line-c2'); break;
      case 5: this.line.classList.add('line-visible', 'line-c3'); break;
      case 6: this.line.classList.add('line-visible', 'line-tl-br'); break;
      case 7: this.line.classList.add('line-visible', 'line-tr-bl'); break;
    }

    if (isWon) return isWon // Win. Return X or O

    // Check if Tie
    // Return true if all squares are played but no one won
    // Or false if there are still squares to play
    return this.squaresList.every( square => square.state !== false ) ? 'Tie' : false
  }

  // 
  // Take turns
  toggleTurn() {
    this.turn = this.turn === 'X' ? 'O' : 'X'
  }

  // 
  // Set the game status
  setGameStatus(status) {
    this.gameStatus.innerHTML = status
  }

}