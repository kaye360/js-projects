/**
 * 
 * Game scoreboard class
 * 
 */
export default class ScoreBoard {

  gameStatusEL = document.querySelector('#game-status')
  turnEL = document.querySelector('#turn-player')
  winnerEL = document.querySelector('#winner')
  resetGameBtn = document.querySelector('#reset-game')
  gameIsOver = false

  setGameStatus(status) {
    this.gameStatusEL.innerHTML = status
  }
  
  setWinner(player) {
    this.winnerEL.innerHTML = player ? `Winner: ${player}` : ''
  }

  setTurn(player) {
    this.turnEL.innerHTML = player
  }

  reset() {
    this.setWinner(false)
    this.setGameStatus('Game in Progress')
  }

}
