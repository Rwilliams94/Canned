require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const Image = require("../../models/Image.model");
const Beer = require("../../models/Beer.model");
 // fetch the model to validate our user document before insertion (in database)
const axios = require("axios");
const ImageData = require('../Data/ImageData');



async function insertMany() {
    try {
     await Image.deleteMany();
     const inserted = await Image.create(ImageData); // insert docs in db
     console.log(`seed Image done : ${inserted.length} documents inserted !`);
   
    } catch (err) {
       console.log(err);
     }
   
   }
   

async function addBeerID() {
    try {
    
    const images = await Image.find();

    images.forEach(async (image) =>  {
        const beerName = image.beername
        console.log(beerName);
        const beer = await Beer.findOne({name: beerName})
        console.log(beer);
        await Image.findByIdAndUpdate(image._id, {beerid: beer._id})
    })

    } catch (err) {
        console.log(err);
      }
}
   // console.log(breweryData);
   
//  insertMany()

// addBeerID()