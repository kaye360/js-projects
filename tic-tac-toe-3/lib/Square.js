/**
 * 
 * Class for each Square in the Tic Tac Toe Game
 * 
 * gameEL - Game DOM element
 * state - State of Square: x, o, false
 * squareEL -Sqaure DOM element
 * 
 * Methods:
 * create
 * play
 * isPlayed
 * warn
 * 
 */
export default class Square {

  gameEL
  squareEL
  state

  constructor(gameEL, state = false) {
    this.gameEL = gameEL
    this.state = state
    this.create()
  }

  create() {
    this.squareEL = document.createElement('button')
    this.gameEL.append(this.squareEL)

    if(this.state) this.squareEL.innerHTML = this.state
  }

  play(player) {
    this.state = player
    this.squareEL.innerHTML = player 
    this.squareEL.classList.add('square-played')
    setTimeout( () => this.squareEL.classList.remove('square-played'), 500 )
  }

  isPlayed() {
    return this.state ? true : false
  }

  warn() {
    this.squareEL.classList.add('already-played')
    setTimeout( () => this.squareEL.classList.remove('already-played'), 500 )
  }

  end() {
    this.squareEL.classList.add('square-end-game')
  }
}
