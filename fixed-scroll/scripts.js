
gsap.registerPlugin(ScrollTrigger)

const astro = document.querySelector('#fixed-item')


gsap.to('#fixed-item', {
    scrollTrigger : {
        trigger : '#section-2',
        start : 'top 80%',
        end : 'top 10%',
        scrub : 1.3,
        toggleActions : "restart reverse none none",
        // markers : true
    },
    x : '-100%',
    rotate : -45,
    duration : 2,
    ease : 'power4.out'
})

gsap.to('#fixed-item', {
    scrollTrigger : {
        trigger : '#section-3',
        start : 'top 80%',
        end : 'top : 10%',
        scrub : 2,
        toggleActions : 'restart reverse none none',
        // markers : true
    },
    opacity : 0.2,
})

gsap.to('#fixed-item', {
    scrollTrigger : {
        trigger : '#section-4',
        start : 'top 50%',
        end : 'top 10%',
        scrub : 2,
        toggleActions : 'restart reverse none none'
    },
    scale : 5,
    y : 400,
    opacity : 1
})