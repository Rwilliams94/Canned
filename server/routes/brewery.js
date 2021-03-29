const express = require("express");
const router = express.Router();
const Brewery = require("../models/Brewery.model");
const Beer = require("../models/Beer.model");
const Review = require("../models/Review.model");
const Image = require("../models/Image.model");
const requireAuth = require("..//middlewares/requireAuth");
const fileUploader = require("../config/cloudinaryConnection.js");

// get brewery

router.get("/", (req, res, next) => {
  Brewery.find()
    .then((breweries) => res.status(200).json(breweries))
    .catch((err) => res.status(500).json(err));
});

// Search brewery 

router.get("/find/", async (req, res, next) => {
  let query = {};

  if (req.query.name) {
    const exp = new RegExp(req.query.name);
    query.name = { $regex: exp }
    console.log(query.name);
  }

  try {
    const searchRes = await Brewery.find({name: query.name})
    res.status(200).json(searchRes) 
  } catch (err) {
    console.log(err);
  }

});


// create Brewery

router.post(
  "/add-brewery",
  requireAuth,
  fileUploader.single("image"),
  (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.path;
    }

    // !!----------------need to sort out location with this one---------!!!

    const {
      name,
      description,
      website,
      establisheddate,
      address,
      image,
      rating,
      longitude,
      latitude,
    } = req.body;

    Brewery.findOne({ name })

      .then((breweryData) => {
        if (breweryData) {
          return res.status(400).json({ message: "Brewery already exists" });
        }

        const newBrewery = {
          name,
          description,
          website,
          establisheddate,
          address,
          image,
          rating,
          longitude,
          latitude,
        };

        Brewery.create(newBrewery)
          .then((newBrewery) => {
            res.status(200).json(newBrewery);
          })
          .catch(next);
      })
      .catch(next);
  }
);

// Find one Brewery

router.get("/:id", (req, res, next) => {
  Brewery.findById(req.params.id)
    .then((brewery) => res.status(200).json(brewery))
    .catch((err) => res.json(err));
});

// Update Brewery

router.patch(
  "/edit/:id",
  requireAuth,
  fileUploader.single("image"),
  function (req, res, next) {
    const breweryId = req.params.id;

    if (req.file) {
      req.body.image = req.file.path;
    }

    Brewery.findByIdAndUpdate(breweryId, req.body, { new: true })
      .then((updatedBrewery) => {
        res.status(200).json(updatedBrewery);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// Delete Brewery

router.delete("/delete/:id", function (req, res, next) {
  const breweryId = req.params.id;

  Brewery.findByIdAndDelete(breweryId)
    .then(() => {
      res.status(200).json({ message: "item successfully deleted" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get user reviews

router.get("/reviews/:id", function (req, res, next) {
  const currentBreweryId = req.params.id;

  Review.find({ breweryid: currentBreweryId })
    .then((reviewData) => {
      return res.status(200).json(reviewData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get user images

router.get("/images/:id", function (req, res, next) {
  const currentBreweryId = req.params.id;

  Image.find({ breweryid: currentBreweryId })
    .then((imageData) => {
      return res.status(200).json(imageData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// Get beers

router.get("/beers/:id", function (req, res, next) {
  const currentBreweryId = req.params.id;

  Beer.find({ breweryid: currentBreweryId })
    .then((beerData) => {
      return res.status(200).json(beerData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
