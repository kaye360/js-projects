"use strict"
/*

Created by Josh - joshkaye.ca
Simple Star Rating component that can be reused multiple times

Simply create a new instance with a corresponding star container element and wrapper element

View the Readme for more info

*/

class RatingStars {

  starRating // HTML element container for stars
  wrapper // HTML element that wraps starRating
  starBtns = NodeList // Node list of each star <button>
  totalRating = new Array(5).fill(false) // set the default array
  defaultRating = 0 // set default rating
  
  // 
  // StarRating is the Inner Element that displays stars
  // Wrapper is the outer element
  constructor(starRating, wrapper) {
    this.starRating = document.querySelector(`.${starRating}`)
    this.wrapper = document.querySelector(`.${wrapper}`)

    this.initStars()
    this.fillStars()
    this.addStarEvents()
    this.addWrapperEvents()
  }

// 
// Load the star <button>s into the DOM with event listener
initStars() {
  this.totalRating.forEach( () => {
    const btn = document.createElement('button')
    btn.classList.add('star-btn')
    btn.setAttribute('type', 'button')
    this.starRating.append(btn)
  })

  this.starBtns = this.starRating.querySelectorAll('.star-btn')
  this.starBtns.forEach( (btn, index) => {
    btn.addEventListener('click', () => this.setDefaultRating(index) )
  })
}

// 
// Set the default rating
setDefaultRating(index) {
  this.defaultRating = index + 1
}

// 
// take the values in this.totalRating [] and render Stars accordingly
// ex: true, true, true, false false = 3/5 stars
fillStars() {
  this.totalRating.forEach( (star, index) => {
    this.starBtns[index].classList.remove('star-empty')
    this.starBtns[index].classList.remove('star-full')
    if (!star) this.starBtns[index].classList.add('star-empty')
    if (star) this.starBtns[index].classList.add('star-full')
  })
}

// 
// Add hover event listener to each star
addStarEvents() {
  const stars = this.starRating.querySelectorAll('.star-btn')
  stars.forEach( (star, index) => {
    star.addEventListener('mouseover', () => this.hoverStars(index))
  })
}

// 
// Hover event listener for a star
hoverStars(index) {
  this.totalRating.fill(false)
  this.totalRating.fill(true, 0, index + 1)
  this.fillStars()
}

// 
// Add mouseleave and click event to this.wrapper
// mouseleave event is maintain the last rating that was clicked 
// click event is to set the rating back to 0
addWrapperEvents() {
  this.wrapper.addEventListener('mouseleave', () => {
    this.totalRating.fill(false)
    this.defaultRating !== 0 && this.totalRating.fill(true, 0, this.defaultRating)
    this.fillStars()
  })

  this.wrapper.addEventListener('mouseup', () => {
    this.setDefaultRating(-1)
    this.fillStars()
  })
}

}