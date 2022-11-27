"use strict"

class tictactoe {

  resetBtn
  line
  turn = 'X'
  gameWrapper
  gameBoard
  gameStatus
  sqaureValues = new Array(9).fill(false)


  constructor(gameWrapper, gameBoard) {

    this.resetBtn = document.getElementById('reset-game')
    this.gameStatus = document.getElementById('game-status')
    this.line = document.getElementById('line')
    this.gameWrapper = document.getElementById(gameWrapper)
    this.gameBoard = document.getElementById(gameBoard)
    this.resetBtn.addEventListener('click', () => this.reset())
    this.render()
  }



  toggleGameSquare(sqaureIndex) {

    // If square has already been played
    if(this.sqaureValues[sqaureIndex]) {

      this.warnAlreadyPlayed(sqaureIndex)
      
    } else {
      
      this.sqaureValues[sqaureIndex] = this.turn
      this.toggleTurn()
      this.render()

      const isGameOver = this.isGameOver()
      if (isGameOver) this.completeGame(isGameOver)
    }


  }



  warnAlreadyPlayed(index) {
    const gameSquares = document.querySelectorAll('.game-square')
    gameSquares[index].classList.add('already-played')
    setTimeout( () => gameSquares[index].classList.remove('already-played') , 500)
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
    this.line.removeAttribute('class')
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



  toggleTurn() {
    this.turn = this.turn === 'X' ? 'O' : 'X'
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
