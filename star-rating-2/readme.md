# Star rating component

Can be easily used multiple times on the same page if needed. This version is smoother and more reliant on CSS than JS

### Instantiate JS like this
```
  window.onload = () => {
    const ratingStars1 = new RatingStars( 'wrapper1')
    const ratingStars2 = new RatingStars( 'wrapper2')
  }
```

### HTML:
```
<div class="wrapper1">
  <div class="star-rating1"></div>
</div>

<div class="wrapper2">
  <div class="star-rating2"></div>
</div>
```

Bare Minimum CSS is specified in the CSS file
