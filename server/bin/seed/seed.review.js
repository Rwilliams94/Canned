require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const Review = require("../../models/Review.model");
const Beer = require("../../models/Beer.model");
 // fetch the model to validate our user document before insertion (in database)
const axios = require("axios");
const ReviewData = require('../Data/ReviewData');



async function insertMany() {
    try {
     await Review.deleteMany();
     const inserted = await Review.create(ReviewData); // insert docs in db
     console.log(`seed review done : ${inserted.length} documents inserted !`);
   
    } catch (err) {
       console.log(err);
     }
   
   }
   

async function addBeerID() {
    try {
    
    const reviews = await Review.find();

    reviews.forEach(async (review) =>  {
        const beerName = review.beername
        console.log(beerName);
        const beer = await Beer.findOne({name: beerName})
        console.log(beer);
        await Review.findByIdAndUpdate(review._id, {beerid: beer._id})
    })

    } catch (err) {
        console.log(err);
      }
}
   // console.log(breweryData);
   
//  insertMany()

// addBeerID()