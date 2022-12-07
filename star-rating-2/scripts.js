"use strict"


class RatingStar {
  
  // DOM elements to insert stars
  starClassName

  // Rating Component wrapper
  ratingWrapper

  // Star Node list
  starNodeList

  // Default HTML for each star
  starHTML = '<button class="star"></button>'

  // Clear Rating button
  clearHTML = '<button class="clear">Clear</button>'

  // Clear button dom element
  clearButton

  // User selected rating
  currentRating = 0
  
  constructor(starClassName='rating1') {

    this.starClassName = starClassName
    this.ratingWrapper = document.querySelector(`.${starClassName}`)
    this.ratingWrapper.classList.add('rating')

    this.loadDOM()

  }

  loadDOM() {
    for(let i = 0; i < 5; i++) {
      this.ratingWrapper.insertAdjacentHTML('beforeend', this.starHTML)
    }

    this.starNodeList = this.ratingWrapper.querySelectorAll('.star')
    this.starNodeList.forEach( (star, index) => {
      star.addEventListener('click', () => { this.updateRating(index + 1) })
    } )

    this.ratingWrapper.insertAdjacentHTML('beforeend', this.clearHTML)
    this.clearButton = this.ratingWrapper.querySelector('.clear')
    this.clearButton.addEventListener('click', () => { this.updateRating(0) })
  }

  updateRating(newRating) {
    this.currentRating = newRating; 
    this.ratingWrapper.classList.remove('rating-0', 'rating-1', 'rating-2', 'rating-3', 'rating-4', 'rating-5')
    this.ratingWrapper.classList.add(`rating-${newRating}`)
  }

}