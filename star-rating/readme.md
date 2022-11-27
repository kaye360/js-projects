# Star rating component

Can be easily used multiple times on the same page if needed

Instantiate JS like this
```
  window.onload = () => {
    const ratingStars1 = new RatingStars('star-rating1', 'wrapper1')
    const ratingStars2 = new RatingStars('star-rating2', 'wrapper2')
  }
```

HTML:
```
<div class="wrapper1">
  <div class="star-rating1"></div>
</div>

<div class="wrapper2">
  <div class="star-rating2"></div>
</div>
```

Bare Minimum CSS is specified in the CSS file
