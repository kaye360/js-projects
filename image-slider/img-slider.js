

//Slide Show
class ImgSlider {
  
  // Config
  transitionTime = 2000
  progressBarColor = 'hsla(231, 33%, 24%, 0.3)'
  imgDir = './img/'
  imgList =[
    'diego-ph-fIq0tET6llw-unsplash.jpg',
    'ajeet-mestry-UBhpOIHnazM-unsplash.jpg',
    'austin-chan-ukzHlkoz1IE-unsplash.jpg',
    'carson-arias-7Z03R1wOdmI-unsplash.jpg',
    'david-kovalenko-G85VuTpw6jg-unsplash.jpg',
    'katie-moum-iRMUDX0kyOc-unsplash.jpg',
  ]

  // Elements
  slider = document.querySelector('.img-slider')
  nextButton
  prevButton
  pauseButton
  playButton
  progressBar
  imgNodeList

  // Other
  currentPosition = 1 // Starting Position
  sliderInterval // Slide show setInterval

  constructor() {

      this.loadUI()

      this.nextButton = document.querySelector('.img-slider-next')
      this.nextButton.addEventListener('click', () => this.slideNext() )

      this.prevButton = document.querySelector('.img-slider-prev')
      this.prevButton.addEventListener('click', () => this.slidePrev() )

      this.pauseButton = document.querySelector('.img-slider-pause')
      this.pauseButton.addEventListener('click',  () => { this.pauseSlideShow() } )
      
      this.playButton = document.querySelector('.img-slider-play')
      this.playButton.addEventListener('click', () => { this.startSlideshow() })

      this.imgNodeList = document.querySelectorAll('.img-slider-img-wrapper')
      
      this.startSlideshow()
  }
  
  // 
  // Render Component Functions
  // 

  // 
  // Initially load the slider UI into the DOM
  loadUI() {
    this.renderControllerHTML()
    this.renderProgressBarHTML()
    this.renderImages()
  }
  
  // 
  // Get img list, convert to HTML, and add to DOM
  renderImages() {
    let imgListHTML = ''
    this.imgList.forEach( img => {
      imgListHTML += this.singleImgHTML(this.imgDir, img)
    })
    this.slider.insertAdjacentHTML('afterbegin', imgListHTML)
  }

  // 
  // Add Controller Buttons to DOM
  renderControllerHTML() {
    this.slider.insertAdjacentHTML('beforeend', this.controllerHTML())
  }

  // 
  // Add Progress bar to DOM
  renderProgressBarHTML() {
    this.slider.insertAdjacentHTML('beforeend', this.progressBarHTML())
    this.progressBar = document.querySelector('.img-slider-progress-bar')
    this.progressBar.style.backgroundColor = this.progressBarColor
  }

  // 
  // Components
  // 

  controllerHTML() {
    return `
      <div class="img-slider-controller">
          <button class="img-slider-prev">
              <img src="./icons/prev.svg" alt="">
          </button>
          <button class="img-slider-pause">
              <img src="./icons/pause.svg" alt="">
          </button>
          <button class="img-slider-play">
              <img src="./icons/play.svg" alt="">
          </button>
          <button class="img-slider-next">
          <img src="./icons/next.svg" alt="">
      </button>
      </div>
    `
  }

  progressBarHTML() {
    return `<div class="img-slider-progress-bar"></div> `
  }

  singleImgHTML(imgDir, imgURL) {
    return imgDir && imgURL 
      ? `
      <div class="img-slider-img-wrapper">
        <img src="${imgDir}${imgURL}">
      </div>
      `
      : '<p>No image dir or URL specified'
  }
 
  // 
  // Actions
  // 

  // 
  // Go to next slide
  slideNext() {
    if(this.isAtEnd()) return
    this.currentPosition++

    this.imgNodeList.forEach( image => {
        image.style.transform = `translateX(-${this.currentPosition * 100 - 100}%)`
    })

    this.updateProgressBar()
  }
  
  // 
  // Go to prev slide
  slidePrev() {
    if (this.isAtStart()) return
    this.currentPosition--
    
    this.imgNodeList.forEach( image => {
        image.style.transform = `translateX(-${ this.currentPosition * 100 - 100 }%)`
    })
    
    this.updateProgressBar()
  }

  // 
  // Pause Slideshow
  pauseSlideShow() {
    clearInterval(this.sliderInterval)
    this.sliderInterval = false
    this.pauseButton.style.display = 'none'
    this.playButton.style.display = 'block'
  }

  startSlideshow() {
      
    //Prevent stacking multiple setIntervals
    if(this.sliderInterval) return

    this.sliderInterval = setInterval( () => {
        if(this.isAtEnd()) this.currentPosition = 0
        this.slideNext()
    }, this.transitionTime )

    this.pauseButton.style.display = 'block'
    this.playButton.style.display = 'none'
  }
  
  updateProgressBar() {

    let increments = 100 / document.querySelectorAll('.img-slider-img-wrapper').length

    let width = this.currentPosition === document.querySelectorAll('.img-slider-img-wrapper').length 
      ? 100 
      : this.currentPosition * increments

    this.progressBar.style.width = width + '%'
  }

  // 
  // Checker Functions
  isAtEnd() {
    return this.currentPosition === this.imgNodeList.length
  }

  isAtStart() {
    return this.currentPosition === 1
  }
}

const slider = new ImgSlider()

