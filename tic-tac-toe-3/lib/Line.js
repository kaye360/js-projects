/**
 * 
 * Winner Line class
 * 
 */

export default class Line {

  lineEL

  constructor() {
    this.lineEL = document.getElementById('line')
  }

  show(winningRow) {
    switch (winningRow) {
      case 0: this.lineEL.classList.add('line-visible', 'line-r1'); break;
      case 1: this.lineEL.classList.add('line-visible', 'line-r2'); break;
      case 2: this.lineEL.classList.add('line-visible', 'line-r3'); break;
      case 3: this.lineEL.classList.add('line-visible', 'line-c1'); break;
      case 4: this.lineEL.classList.add('line-visible', 'line-c2'); break;
      case 5: this.lineEL.classList.add('line-visible', 'line-c3'); break;
      case 6: this.lineEL.classList.add('line-visible', 'line-tl-br'); break;
      case 7: this.lineEL.classList.add('line-visible', 'line-tr-bl'); break;
    }
  }

  hide() {
    this.lineEL.removeAttribute('class')
  }
}