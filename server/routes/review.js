var express = require("express");
var router = express.Router();
const Review = require("../models/Review.model");
const requireAuth = require("..//middlewares/requireAuth");

// ------------------ Get reviews ------------------------------

router.get("/", function (req, res, next) {
  Review.find()
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ------------------ Get one review ------------------------------

router.get("/:id", (req, res, next) => {
  Review.findById(req.params.id)
    .then((review) => res.status(200).json(review))
    .catch((err) => res.json(err));
});

// ------------------ Upload review ------------------------------

router.post("/", requireAuth, function (req, res, next) {
  req.body.userid = req.session.currentUser;

  const { 
    userid,
    beerid,
    beername,
    breweryid,
    rating,
    comment,} = req.body;

  const newReview = {
    userid,
    beername,
    beerid,
    breweryid,
    rating,
    comment,
  };

  Review.create(newReview)
    .then((newReview) => {
      res.status(201).json(newReview);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ---------------------- Edit review ------------------------------

router.patch("/edit/:id", requireAuth, function (req, res, next) {
  const reviewId = req.params.id;
  const { 
    userid,
    beerid,
    beername,
    breweryid,
    rating,
    comment } = req.body;

  const updateReview = {
    userid,
    beername,
    beerid,
    breweryid,
    rating,
    comment }



        Review.findByIdAndUpdate(reviewId, updateReview)
          .then((updatedReview) => {
            res.status(200).json(updatedReview);
          })
          .catch((err) => {
            res.status(500).json(err);
          });

});

// ---------------------- Delete review ------------------------------

router.delete("/delete/:id", requireAuth, function (req, res, next) {
  const reviewId = req.params.id;

  Review.findById(reviewId)
    .then((review) => {
      if (
        JSON.stringify(review.userid) !==
        JSON.stringify(req.session.currentUser)
      ) {
        res.send("can't delete something you didn't make");
        return;
      } else {
        Review.findByIdAndDelete(reviewId)
          .then(() => {
            res.status(200).json({ message: "item successfully deleted" });
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
