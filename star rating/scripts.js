"use strict"


const starRating = document.querySelector('.star-rating')
const wrapper = document.querySelector('.wrapper')
let starBtns = NodeList
let totalRating = new Array(5).fill(false)
let defaultRating = 0 


function initStars() {
  totalRating.forEach( () => {
    const btn = document.createElement('button')
    btn.classList.add('star-btn')
    btn.setAttribute('type', 'button')
    starRating.append(btn)
  })

  starBtns = document.querySelectorAll('.star-btn')
  starBtns.forEach( (btn, index) => {
    btn.addEventListener('click', () => setDefaultRating(index) )
  })
}

function setDefaultRating(index) {
  defaultRating = index + 1
}

function fillStars() {
  totalRating.forEach( (star, index) => {
    starBtns[index].classList.remove('star-empty')
    starBtns[index].classList.remove('star-full')
    if (!star) starBtns[index].classList.add('star-empty')
    if (star) starBtns[index].classList.add('star-full')
  })
}

function addStarEvents() {
  const stars = document.querySelectorAll('.star-btn')
  stars.forEach( (star, index) => {
    star.addEventListener('mouseover', () => hoverStars(index))
  })
}

function hoverStars(index) {

  // Make whole array false
  totalRating.fill(false)
  // make array true index + 1 
  totalRating.fill(true, 0, index + 1)
  // Reload
  fillStars()
}

function addWrapperEvents() {
  wrapper.addEventListener('mouseleave', () => {
    totalRating.fill(false)
    defaultRating !== 0 && totalRating.fill(true, 0, defaultRating)
    fillStars()
  })

  wrapper.addEventListener('mouseup', () => {
    setDefaultRating(-1)
    fillStars()
  })
}

initStars()
fillStars()
addStarEvents()
addWrapperEvents()