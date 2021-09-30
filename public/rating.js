// const { json } = require("express");
// const { $cn } = require("../database");

const stars = document.querySelectorAll(".starss")
const info = document.querySelector(".info")
const starBtn = document.querySelector(".star-btn")
const backBtn = document.querySelector(".back-btn")

// const starSubmit = document.querySelector(".star-submit")


// console.log(stars)
let rating = 0;

stars.forEach((star, clickedIndex) => {
    star.addEventListener('click', (e) => {
        
        starBtn.classList.add('active')
        stars.forEach((star1, index) => {
            if (index <= clickedIndex) {
                // console.log(1)
                star1.className = 'starss yellowgreen';
            } else {
                star1.className = 'starss gray';
            }
        })
        e.preventDefault();
        info.innerHTML = `you have given ${clickedIndex + 1} ratings`
        rating = clickedIndex+1
    })
})

starBtn.addEventListener('click', (e) => {
    // e.preventDefault()
    // console.log(1)
    $.ajax({
        type: 'POST',
        url: `http://localhost:3000/rating`,
        dataType: 'json',
        data: {
            rating: rating,
            movie_id :movie_id
        }

    }).then(res => {
        console.log(res)
        if (res.status) {
            console.log(1)
            backBtn.click()
        } else {
            console.log(2)
            
        }
        
    })
    
})