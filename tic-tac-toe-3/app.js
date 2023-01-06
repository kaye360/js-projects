/**
 * 
 * 
 * Tic Tac Toe Twist Game 
 * 
 * 
 * 
 */

import Square from "./lib/Square.js"
import ScoreBoard from "./lib/ScoreBoard.js"
import Line from "./lib/Line.js"


export class TicTacToe {

  gameEL
  scoreBoard
  squareList
  resetBtn
  turnCount = 1
  turn = 'x'
  winLine
  winner
  winningRow
  
  constructor(gameEL) {
    this.gameEL = document.getElementById(gameEL)
    this.scoreBoard = new ScoreBoard()
    this.scoreBoard.setTurn('x')
    this.resetBtn = document.querySelector('#reset-game')
    this.resetBtn.addEventListener('click', () => this.reset())
    this.winLine = new Line()
    this.drawBoard()
  }

  drawBoard() {
    this.squareList = new Array(9).fill(false)

    this.squareList.forEach( (square, index) => {
      this.squareList[index] = new Square(this.gameEL)
      this.squareList[index].squareEL.addEventListener('click', () => {
        this.takeTurn(this.squareList[index])
      })
    })

  }

  takeTurn(square) {
    if ( square.isPlayed() ) { 
      square.warn()
      return 
    }

    square.play(this.turn)
    
    if( this.turnCount === 4) this.twist()
    
    if (this.isGameOver()) this.complete()
    
    this.turn = this.turn === 'x' ? 'o' : 'x'
    this.scoreBoard.setTurn(this.turn)
    this.turnCount += 1
  }

  twist() {

    this.scoreBoard.setGameStatus('Twisting...')

    this.gameEL.classList.add('twist')
    setTimeout( () => this.gameEL.classList.remove('twist'), 5000 )

    // Make new Shuffled Array
    let newSquareList = [...this.squareList]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)

    // restart gameboard from new array
    this.gameEL.innerHTML = ''
    this.squareList = new Array(9).fill(false)

    newSquareList.forEach( (square, index) => {
      this.squareList[index] = new Square(this.gameEL, square.state)
      this.squareList[index].squareEL.addEventListener('click', () => {
        this.takeTurn(this.squareList[index])
      })
    })

    setTimeout( () => this.scoreBoard.setGameStatus('Game in Progress'), 5000 )
  }

  reset() {
    this.scoreBoard.setGameStatus('Game in Progress')
    this.scoreBoard.setWinner(false)
    this.gameEL.innerHTML = ''
    this.winner = false
    this.winningRow = false
    this.winLine.hide()
    this.drawBoard()
    this.enableGameClicks()
    this.turnCount = 1
  }

  complete() {
    this.scoreBoard.setGameStatus('Game Over')
    this.scoreBoard.setWinner(this.winner)
    this.winLine.show(this.winningRow)
    this.disableGameClicks()
    this.startEndingAnimation()
  }
  
  startEndingAnimation() {
    this.squareList.forEach( square => {
      square.end()
    })
  }

  disableGameClicks() {
    this.gameEL.style.pointerEvents = 'none'
  }
  
  enableGameClicks() {
    this.gameEL.style.pointerEvents = 'all'
  }

  isGameOver() {
    // Possible array combinations that signify 3 in a row
    let winningSets = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal, top to bottom
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical, left to right
      [0, 4, 8],  [2, 4, 6] // Top-left and bottom-right
    ]

    // Check for a win
    winningSets.forEach( (row, index) => {
      if( 
        this.squareList[ row[0] ].state &&
        this.squareList[ row[1] ].state &&
        this.squareList[ row[2] ].state &&
        this.squareList[ row[0] ].state === this.squareList[ row[1] ].state &&
        this.squareList[ row[1] ].state === this.squareList[ row[2] ].state
      ) {
        this.winner = this.squareList[ row[0] ].state
        this.winningRow = index
      } 
    })

    if (this.winner) return true // Win

    // Check if Tie or keep playing
    if (this.squareList.every( square => square.state !== false )) {
      this.winner = 'Tie'
      return true
    } else {
      return false
    }
  }

}