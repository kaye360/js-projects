

class DynamicHorizontalNav {


    wrapper         = document.querySelector('.wrapper')
    navWrapper      = document.querySelector('.nav-wrapper')
    navLinks        = document.querySelector('.nav-links')
    dropdown        = document.querySelector('.dropdown')
    dropdownWrapper = document.querySelector('.dropdown-wrapper')
    moreBtn         = document.querySelector('.more-btn')
    mobileBtn       = document.querySelector('.mobile-btn')

    NAV_INITIAL_STATE = this.navLinks.innerHTML


    handleNavOverFlow = () => {

        // Reset Navlinks and Dropdown to original state
        this.navLinks.innerHTML = this.NAV_INITIAL_STATE
        this.dropdown.innerHTML = ''

        // If screen is mobile phone size, move everything into dropdown and exit
        // Make sure more btn is hidden too
        if( window.innerWidth <= 400 ) {
            Array.from(this.navLinks.children).reverse().forEach( link => {
                this.dropdown.prepend(link)
            })
            this.moreBtn.style.display = 'none'
            return
        }

        // Loop through navlinks and move links until no longer overflowing
        Array.from(this.navLinks.children).reverse().forEach( link => {
            if( this.wrapper.clientWidth < this.navWrapper.scrollWidth  ) {
                this.dropdown.prepend(link)
            }
        })

        // If dropdown only has 1 link, see if it is narrower than remaining space
        // If so, move it to navLinks
        // Remaining space includes the more link + padding
        const remainingSpace = this.wrapper.clientWidth - this.navWrapper.clientWidth - 40 + this.moreBtn.clientWidth
        if( this.dropdown.children.length === 1 && this.dropdown.firstChild.clientWidth < remainingSpace ) {
            this.navLinks.append(this.dropdown.firstChild)
        }

        // If dropdown has no links, remove the more button
        this.moreBtn.style.display = this.dropdown.children.length === 0 ? 'none' : 'flex'
    }

    
    toggleMobileMenu = () => {
        document.body.classList.toggle('mobile-menu-is-open')
    }


    init() {
        window.addEventListener('DOMContentLoaded', this.handleNavOverFlow)
        window.addEventListener('resize', this.handleNavOverFlow)
        this.mobileBtn.addEventListener('click', this.toggleMobileMenu)
    }

}