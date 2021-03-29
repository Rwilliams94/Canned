const express = require("express");
const router = express.Router();
const Brewery = require("../models/Brewery.model");
const Beer = require("../models/Beer.model");
const Review = require("../models/Review.model");
const Image = require("../models/Image.model");
const requireAuth = require("../middlewares/requireAuth");
const fileUploader = require("../config/cloudinaryConnection.js");

// ------------------------ get beer --------------------------------

router.get("/", (req, res, next) => {
  Beer.find()
    .then((beers) => res.status(200).json(beers))
    .catch((err) => res.status(500).json(err));
});

// ---------------------- Search Beer ------------------------------------

router.get("/find/", async (req, res, next) => {
  let query = {};

  if (req.query.name) {
    const exp = new RegExp(req.query.name);
    query.name = { $regex: exp }
    console.log(query.name);
  }

  try {
    const searchRes = await Beer.find({name: query.name})
    res.status(200).json(searchRes) 
  } catch (err) {
    console.log(err);
  }

});

// ---------------------- create beer ------------------------------------

router.post(
  "/add-beer",
  requireAuth,
  fileUploader.single("image"),
  (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.path;
    }

    const {
      name,
      description,
      abv,
      breweryname,
      breweryid,
      releasedate,
      image,
      rating,
    } = req.body;

    Beer.findOne({ name })

      .then((beerData) => {
        if (beerData) {
          return res.status(400).json({ message: "Beer already exists" });
        }

        const newBeer = {
          name,
          description,
          abv,
          breweryname,
          breweryid,
          releasedate,
          image,
          rating,
        };

        Beer.create(newBeer)
          .then((newBeer) => {
            res.status(200).json(newBeer);
          })
          .catch(next);
      })
      .catch(next);
  }
);

// ------------------------------- Find one beer ------------------------------------------

router.get("/:id", (req, res, next) => {
  Beer.findById(req.params.id)
    .then((beer) => res.status(200).json(beer))
    .catch((err) => res.json(err));
});

// ------------------------------- Update beer ---------------------------------------

router.patch(
  "/edit-beer/:id",
  requireAuth,
  fileUploader.single("image"),
  function (req, res, next) {
    const beerId = req.params.id;

    if (req.file) {
      req.body.image = req.file.path;
    }
   
      Beer.findByIdAndUpdate(beerId, req.body, { new: true })
        .then((updatedBeer) => {
          res.status(200).json(updatedBeer);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    
  }
);

// ----------------------------- Delete beer -------------------------------------

router.delete("/delete/:id", requireAuth, function (req, res, next) {
  Beer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "item successfully deleted" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ------------------------  Get beer reviews ----------------------------------------

router.get("/reviews/:id", function (req, res, next) {
  const currentBeerId = req.params.id;

  Review.find({ beerid: currentBeerId })
    .then((reviewData) => {
      return res.status(200).json(reviewData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ------------------------  Get beer images ----------------------------------------

router.get("/images/:id", function (req, res, next) {
  const currentBeerId = req.params.id;

  Image.find({ beerid: currentBeerId })
    .then((imageData) => {
      return res.status(200).json(imageData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
