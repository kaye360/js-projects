

class DraggableSlider {

    
    prevMousePos = 0
    isDragging = false

    /**
     * 
     * @param slider : slider wrapper element
     * @param sliderItems : sliderItems wrapper
     * 
     */
    constructor({slider, sliderItems}) {
        this.slider = document.querySelector(slider)
        this.sliderItems = this.slider.querySelector(sliderItems)
        this.sliderItemsRightPadding = Number( getComputedStyle(this.sliderItems).paddingRight.slice(0, -2) )
        this.rightBound              = (this.sliderItems.scrollWidth - this.slider.clientWidth + this.sliderItemsRightPadding) * -1
    }


    prevSliderPosition = () => Number( getComputedStyle(this.sliderItems).translate.slice(0, -2) )
    mousePosDifference = (currentMousePos) => (currentMousePos - this.prevMousePos)


    sliderStart = (e) => {
        this.prevMousePos = e.clientX || e.touches[0].clientX
        this.isDragging = true
        this.slider.style.cursor = 'grabbing'
    }


    sliderMove = (e) => {
        if( !this.isDragging ) return

        const currentMousePos = Math.ceil( e.clientX || e.touches[0].clientX )

        // Calculate new slider position based on mouse drag
        this.sliderItems.style.translate = this.prevSliderPosition() + this.mousePosDifference(currentMousePos) + 'px'
    }


    sliderEnd = (e) => {
        if( !this.isDragging ) return

        const currentMousePos = e.clientX ? Math.ceil( e.clientX) : Math.ceil( e.changedTouches[0].clientX )

        // Check for Left Boundary
        if( this.prevSliderPosition() + this.mousePosDifference(currentMousePos) >= 0) {
            this.sliderItems.style.translate = '0px'
        } 

        // Check for Right Boundary
        if ( this.sliderItems.lastElementChild.getBoundingClientRect().right <= this.slider.getBoundingClientRect().right - this.sliderItemsRightPadding ) {
            this.sliderItems.style.translate = this.rightBound + 'px'
        }

        this.isDragging = false
        this.slider.style.cursor = 'grab'
    }


    init = () => {
        this.sliderItems.addEventListener('mousedown', this.sliderStart)
        this.sliderItems.addEventListener('touchstart', this.sliderStart)
    
        this.slider.addEventListener('mousemove', this.sliderMove)
        this.slider.addEventListener('touchmove', this.sliderMove)
    
        window.addEventListener('mouseup', this.sliderEnd)
        window.addEventListener('touchend', this.sliderEnd)
    }

}
