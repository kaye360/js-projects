

//Slide Show
class ImgSlider {
  constructor() {

      this.getImages()
      this.updateProgressBar()
      this.startSlideshow()

      this.nextButton.addEventListener('click', () => {
          this.slideNext()
      })

      this.prevButton.addEventListener('click', () => {
          this.slidePrev()
      })

      this.pauseButton.addEventListener('click',  () => {
          clearInterval(this.slideshow)
          this.slideshow = false
          this.pauseButton.style.display = 'none'
          this.playButton.style.display = 'block'
      } )
      
      this.playButton.addEventListener('click', () => {
          this.startSlideshow()
          this.pauseButton.style.display = 'block'
          this.playButton.style.display = 'none'
      })
      
  }
  
  
  slider = document.querySelector('.img-slider-outer')
  images = document.querySelectorAll('.img-slider-inner') 

  nextButton = document.querySelector('.img-slider-next')
  prevButton = document.querySelector('.img-slider-prev')
  pauseButton = document.querySelector('.img-slider-pause')
  playButton = document.querySelector('.img-slider-play')

  progressBar = document.querySelectorAll('.img-slider-progress-bar')
  
  currentPosition = 1
  
  getImages =  () => {

      this.images.forEach( (image, index) => {

          if(
              !image.childNodes[1].src.includes('jpg') &&
              !image.childNodes[1].src.includes('png') &&
              !image.childNodes[1].src.includes('gif') 
          ) {
              this.images[index].remove()
          } 
      })
  }

  slideNext() {
      if(this.isAtEnd()) return
      this.currentPosition++

      this.images.forEach( image => {

          let slideAmount = this.currentPosition * 100 - 100

          image.style.transform = `translateX(-${slideAmount}%)`
          
      })

      this.updateProgressBar()
  }
  
  
  slidePrev() {
      if (this.isAtStart()) return
      this.currentPosition--
      
      this.images.forEach( image => {
          
          let slideAmount = this.currentPosition * 100 - 100
          
          image.style.transform = `translateX(-${slideAmount}%)`
          
      })
      
      this.updateProgressBar()
  }

  startSlideshow() {
      
      //Prevent stacking multiple setIntervals
      if(this.slideshow) return

      this.slideshow = setInterval( () => {

          if(this.isAtEnd()) this.currentPosition = 0

          this.slideNext()
      }, 3500 )
  }
  
  updateProgressBar() {

      let increments = 100 / document.querySelectorAll('.img-slider-inner').length

      let width = (this.currentPosition === document.querySelectorAll('.img-slider-inner').length) ? 100 : (this.currentPosition * increments)

      this.progressBar[0].style.width = width + '%'
  }


  isAtEnd() {
      
      if(this.currentPosition === document.querySelectorAll('.img-slider-inner').length) return true
      return false
  }

  isAtStart() {
      if(this.currentPosition === 1) return true
      return false
  }
}


const slider = new ImgSlider()

