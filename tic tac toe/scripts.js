"use strict"

class tictactoe {

  resetBtn
  turn = 'x'
  gameWrapper
  gameBoard
  gameStatus
  sqaureValues = new Array(9).fill(false)


  constructor(gameWrapper, gameBoard) {

    this.gameWrapper = document.getElementById(gameWrapper)
    this.gameBoard = document.getElementById(gameBoard)
    this.resetBtn = document.getElementById('reset-game')
    this.resetBtn.addEventListener('click', () => this.reset())
    this.gameStatus = document.getElementById('game-status')
    this.render()
  }



  toggleGameSquare(sqaureIndex) {

    // If square has already been played
    if(this.sqaureValues[sqaureIndex]) {
      console.log('already played')
      
      // Else square hasn't been played
    } else {
      
      this.sqaureValues[sqaureIndex] = this.turn
      this.toggleTurn()
      this.render()

      const isGameOver = this.isGameOver()
      if (isGameOver) this.completeGame(isGameOver)
    }


  }



  toggleTurn() {
    this.turn = this.turn === 'x' ? '0' : 'x'
  }


  addClickEvents() {
    const gameSquares = document.querySelectorAll('.game-square')
    gameSquares.forEach( (square, index) => {
      square.addEventListener('click', () => this.toggleGameSquare(index))
    })
  }
  
  
  removeClickEvents() {
    const gameSquares = document.querySelectorAll('.game-square')
    gameSquares.forEach( square => {
      square.removeEventListener('click', () => this.toggleGameSquare)
    } )
  }


  generateSquares() {
    this.sqaureValues.forEach( square => {

      const sqaureHTML = `<button class="game-square">${ square ? square : '' }</button>`
      this.gameBoard.insertAdjacentHTML('beforeend', sqaureHTML)
    })
  }


  reset() {
    this.clearBoard()
    this.sqaureValues = new Array(9).fill(false)
    this.render()
    this.setGameStatus('Game in progress')
  }
  
  clearBoard() {
    this.gameBoard.innerHTML = ''
  }


  setGameStatus(status) {
    this.gameStatus.innerHTML = status
  }


  render() {
    this.clearBoard()
    this.generateSquares()
    if(!this.isGameOver()) this.addClickEvents()
  }

  completeGame(winner) {
    if(winner === 'tie') {
      this.setGameStatus('Game Over - Tie')
    } else {
      this.setGameStatus(`Player ${winner} won!!`)
    }
    this.removeClickEvents()

  }


  isGameOver() {

    // top row
    if(this.sqaureValues[0] && 
      this.sqaureValues[1] && 
      this.sqaureValues[2] &&
      this.sqaureValues[0] === this.sqaureValues[1] &&
      this.sqaureValues[1] === this.sqaureValues[2]
    ) {
      return this.sqaureValues[0]
    }
    
    // middle row (horizontal)
    if(this.sqaureValues[3] && 
      this.sqaureValues[4] && 
      this.sqaureValues[5] &&
      this.sqaureValues[3] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[5]
    ) {
      return this.sqaureValues[3]
    }

    // bottom row
    if(this.sqaureValues[6] && 
      this.sqaureValues[7] && 
      this.sqaureValues[8] &&
      this.sqaureValues[6] === this.sqaureValues[7] &&
      this.sqaureValues[7] === this.sqaureValues[8]
    ) {
      return this.sqaureValues[6]
    }

    // left row
    if(this.sqaureValues[0] && 
      this.sqaureValues[3] && 
      this.sqaureValues[6] &&
      this.sqaureValues[0] === this.sqaureValues[3] &&
      this.sqaureValues[3] === this.sqaureValues[6]
    ) {
      return this.sqaureValues[0]
    }

    // middle row (vertical)
    if(this.sqaureValues[1] && 
      this.sqaureValues[4] && 
      this.sqaureValues[7] &&
      this.sqaureValues[1] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[7]
    ) {
      return this.sqaureValues[1]
    }

    // right row
    if(this.sqaureValues[2] && 
      this.sqaureValues[5] && 
      this.sqaureValues[8] &&
      this.sqaureValues[2] === this.sqaureValues[5] &&
      this.sqaureValues[5] === this.sqaureValues[8]
    ) {
      return this.sqaureValues[2]
    }

    // top left to bottom right row
    if(this.sqaureValues[0] && 
      this.sqaureValues[4] && 
      this.sqaureValues[8] &&
      this.sqaureValues[0] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[8]
    ) {
      return this.sqaureValues[0]
    }

    // top right to bottom left row
    if(this.sqaureValues[2] && 
      this.sqaureValues[4] && 
      this.sqaureValues[6] &&
      this.sqaureValues[2] === this.sqaureValues[4] &&
      this.sqaureValues[4] === this.sqaureValues[6]
    ) {
      return this.sqaureValues[2]
    }

    // Check if all squares are played but no one one
    if( this.sqaureValues.every( square => square !== false ) ) return 'tie'

    return false
  }

}
