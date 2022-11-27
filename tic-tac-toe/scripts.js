"use strict"

class tictactoe {

  resetBtn // HTML button element to reset the game
  line // HTML line element that shows up when a game is won
  turn = 'X' // X starts first I guess
  gameWrapper // HTML wrapper element for everything
  gameBoard // Tic tac toe area
  gameStatus // HTML element showing game status
  sqaureValues = new Array(9).fill(false) // Initial array of values in sqaures


  constructor(gameWrapper, gameBoard) {

    this.resetBtn = document.getElementById('reset-game')
    this.gameStatus = document.getElementById('game-status')
    this.line = document.getElementById('line')
    this.gameWrapper = document.getElementById(gameWrapper)
    this.gameBoard = document.getElementById(gameBoard)
    this.resetBtn.addEventListener('click', () => this.reset())
    this.render()
  }

  // 
  // toggle an individual square to X or O
  toggleGameSquare(sqaureIndex) {

    // If square has already been played
    if(this.sqaureValues[sqaureIndex]) {
      this.warnAlreadyPlayed(sqaureIndex)
      return
    }
      
    this.sqaureValues[sqaureIndex] = this.turn
    this.toggleTurn()
    this.render()

    const isGameOver = this.isGameOver()
    if (isGameOver) this.completeGame(isGameOver)
  }

  // 
  // Warn that a square has already been played
  warnAlreadyPlayed(index) {
    const gameSquares = document.querySelectorAll('.game-square')
    gameSquares[index].classList.add('already-played')
    setTimeout( () => gameSquares[index].classList.remove('already-played') , 500)
  }

  // 
  // Add click events for each square
  addClickEvents() {
    const gameSquares = document.querySelectorAll('.game-square')
    gameSquares.forEach( (square, index) => {
      square.addEventListener('click', () => this.toggleGameSquare(index))
    })
  }
  
  // 
  // remove click events. called when game is complete
  removeClickEvents() {
    const gameSquares = document.querySelectorAll('.game-square')
    gameSquares.forEach( square => {
      square.removeEventListener('click', () => this.toggleGameSquare)
    } )
  }

  // 
  // Generate the squares for the game
  generateSquares() {
    this.sqaureValues.forEach( square => {

      const sqaureHTML = `<button class="game-square">${ square ? square : '' }</button>`
      this.gameBoard.insertAdjacentHTML('beforeend', sqaureHTML)
    })
  }

  // 
  // Reset the game
  reset() {
    this.clearBoard()
    this.line.removeAttribute('class')
    this.sqaureValues = new Array(9).fill(false)
    this.render()
    this.setGameStatus('Game in progress')
  }
  
  // 
  // Clear the entire board. used for re-rendering
  clearBoard() {
    this.gameBoard.innerHTML = ''
  }

  // 
  // Change the game Status
  setGameStatus(status) {
    this.gameStatus.innerHTML = status
  }

  // 
  // Take turns, its only fair
  toggleTurn() {
    this.turn = this.turn === 'X' ? 'O' : 'X'
  }

  // 
  // Render the game
  render() {
    this.clearBoard()
    this.generateSquares()
    if(!this.isGameOver()) this.addClickEvents()
  }

  // 
  // Complete the game
  completeGame(winner) {
    if(winner === 'tie') {
      this.setGameStatus('Game Over - Tie')
    } else {
      this.setGameStatus(`Player ${winner} won!!`)
    }
    this.removeClickEvents()
  }

  // 
  // Check if the game is over (a line is made by a player)
  // Return the winning player or false
  // I feel like there may be a better way to do this. maybe not?
  isGameOver() {

    // top row
    if(this.sqaureValues[0] && 
      this.sqaureValues[1] && 
      this.sqaureValues[2] &&
      this.sqaureValues[0] === this.sqaureValues[1] &&
      this.sqaureValues[1] === this.sqaureValues[2]
    ) {
      this.line.classList.add('line-visible', 'line-r1')
      return this.sqaureValues[0]
    }
    
    // middle row (horizontal)
    if(this.sqaureValues[3] && 
      this.sqaureValues[4] && 
      this.sqaureValues[5] &&
      this.sqaureValues[3] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[5]
      ) {
        this.line.classList.add('line-visible', 'line-r2')
        return this.sqaureValues[3]
      }
      
      // bottom row
      if(this.sqaureValues[6] && 
      this.sqaureValues[7] && 
      this.sqaureValues[8] &&
      this.sqaureValues[6] === this.sqaureValues[7] &&
      this.sqaureValues[7] === this.sqaureValues[8]
      ) {
      this.line.classList.add('line-visible', 'line-r3')
      return this.sqaureValues[6]
    }
    
    // left row
    if(this.sqaureValues[0] && 
      this.sqaureValues[3] && 
      this.sqaureValues[6] &&
      this.sqaureValues[0] === this.sqaureValues[3] &&
      this.sqaureValues[3] === this.sqaureValues[6]
      ) {
      this.line.classList.add('line-visible', 'line-c1')
      return this.sqaureValues[0]
    }
    
    // middle row (vertical)
    if(this.sqaureValues[1] && 
      this.sqaureValues[4] && 
      this.sqaureValues[7] &&
      this.sqaureValues[1] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[7]
      ) {
      this.line.classList.add('line-visible', 'line-c2')
      return this.sqaureValues[1]
    }

    // right row
    if(this.sqaureValues[2] && 
      this.sqaureValues[5] && 
      this.sqaureValues[8] &&
      this.sqaureValues[2] === this.sqaureValues[5] &&
      this.sqaureValues[5] === this.sqaureValues[8]
      ) {
      this.line.classList.add('line-visible', 'line-c3')
      return this.sqaureValues[2]
    }
    
    // top left to bottom right row
    if(this.sqaureValues[0] && 
      this.sqaureValues[4] && 
      this.sqaureValues[8] &&
      this.sqaureValues[0] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[8]
      ) {
      this.line.classList.add('line-visible', 'line-tl-br')
      return this.sqaureValues[0]
    }
    
    // top right to bottom left row
    if(this.sqaureValues[2] && 
      this.sqaureValues[4] && 
      this.sqaureValues[6] &&
      this.sqaureValues[2] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[6]
      ) {
      this.line.classList.add('line-visible', 'line-tr-bl')
      return this.sqaureValues[2]
    }

    // Check if all squares are played but no one one
    if( this.sqaureValues.every( square => square !== false ) ) return 'tie'

    return false
  }

}