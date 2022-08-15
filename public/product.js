// change rating star

let ratingStarInput = [...document.querySelectorAll('.rating-star')];

ratingStarInput.map((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i < 5; i++) {
            if (i <= index) {
                ratingStarInput[i].src = `images/fill star.jpeg`;
            } else {
                ratingStarInput[i].src = `images/no fill star.jpeg`;
            }
            
        }
    })
})

let homePage = document.querySelector('.go-home');

homePage.addEventListener('click', () => {
    location.replace('/');
})