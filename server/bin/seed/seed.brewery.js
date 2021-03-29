require("dotenv").config();
require("./../../config/mongodb"); // fetch the db connection
const Brewery = require("../../models/Brewery.model"); // fetch the model to validate our user document before insertion (in database)
const axios = require("axios");
const breweryData = require('../Data/BreweryData');

const SANDBOX_URL = "https://sandbox-api.brewerydb.com/v2/"
const SAND_KEY= "28826731eb7496e2ef119a4d066c191f";
// const beerId = "c4f2KE"

async function getBreweries() {

  try {
    const location = await axios.get(`${SANDBOX_URL}locations/?key=${SAND_KEY}`);
    const locationArray = location.data.data
    const newLocations = []

    // console.log(beer);
    // console.log(beerArray);

    locationArray.forEach(location => {

        
        const latitude = location.latitude
        const longitude = location.longitude
        const name = location.brewery.name;
        const description = location.brewery.description;
        const website = location.brewery.website;
        const establishedDate = location.brewery.established;
        let image = ""
        if (location.brewery.images) {image = location.brewery.images.medium;}
        const rating = 3;
        const apiId = location.brewery.id
 
              
              
        const newLocation = {
            name, 
            description,
            website,
            establishedDate,
            longitude,
            latitude,
            image,
            rating,
            apiId,
          }
          
          newLocations.push(newLocation)
                
           


    })

    // console.log(newBeers);

    const inserted = await Brewery.insertMany(newLocations); // insert docs in db
    console.log(`seed artists done : ${inserted.length} documents inserted !`);

  } catch (err) {
    console.log(err);
  }
}


// const newBeer = {
//   name: "punk",
//   abv: 5.4,
//   description: "really tasty beer",
//   releaseDate: "june 2009",
//   image: "https://www.lavignery.fr/4584-thickbox_default/brewdog-punk-ipa-canette-33cl.jpg",
//   rating: 3,
//   apiId: "asijf"
// }



async function insertMany() {
 try {
  await Brewery.deleteMany();
  const inserted = await Brewery.create(breweryData); // insert docs in db
  console.log(`seed brewery done : ${inserted.length} documents inserted !`);

 } catch (err) {
    console.log(err);
  }

}

// console.log(breweryData);

insertMany()

// getBreweries()