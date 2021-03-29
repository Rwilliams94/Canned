require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const Beer = require("../../models/Beer.model"); // fetch the model to validate our user document before insertion (in database)
const axios = require("axios");
const breweryData = require('../Data/BeerData');

const SANDBOX_URL = "https://sandbox-api.brewerydb.com/v2/"
const SAND_KEY= "28826731eb7496e2ef119a4d066c191f";
const beerId = "c4f2KE"

async function getBeers() {

  try {
    const beer = await axios.get(`${SANDBOX_URL}beers/?key=${SAND_KEY}`);
    const beerArray = beer.data.data
    const newBeers = []

    // console.log(beer);
    // console.log(beerArray);

    beerArray.forEach(beer => {

       
        const name = beer.name;

        let abv

        if (beer.abv) {
          abv = Number(beer.abv);
        } else {
          abv = 0
        }
        
        let description = "";

        if (beer.description) {
            description = beer.description;
        } else if (beer.style) {
            description = beer.style.description;
        } else {
            description = "no description available"
        }
              
        const releaseDate = beer.createDate;
        let image = ""
        if (beer.labels) {image = beer.labels.medium}
        const rating = 3
        const apiId = beer.id
              
              
        const newBeer = {
            name, 
            abv,
            description,
            releaseDate,
            image,
            rating,
            apiId
          }
          
          newBeers.push(newBeer)
                
           


    })

    // console.log(newBeers);

    const inserted = await Beer.insertMany(newBeers); // insert docs in db
    console.log(`seed artists done : ${inserted.length} documents inserted !`);

  } catch (err) {
    console.log(err);
  }
}


async function insertMany() {
  try {
   await Beer.deleteMany();
   const inserted = await Beer.insertMany(breweryData); // insert docs in db
   console.log(`seed beer done : ${inserted.length} documents inserted !`);
 
  } catch (err) {
     console.log(err);
   }
 
 }

// addBeerBrewery()

insertMany()

// getBeers()