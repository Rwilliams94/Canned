const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Beer = require("../models/Beer.model");
const Review = require("../models/Review.model");
const Image = require("../models/Image.model");
const requireAuth = require("..//middlewares/requireAuth");
const fileUploader = require("../config/cloudinaryConnection.js");

// --------------------- Get user ------------------------------

router.get("/me", requireAuth, function (req, res, next) {
  User.findById(req.session.currentUser)
    .select("-password")
    .then((userData) => {
      return res.status(200).json(userData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// --------------- Get user reviews -------------------------------

router.get("/me/reviews", requireAuth, function (req, res, next) {
  const currentUserId = req.session.currentUser;

  Review.find({ userid: currentUserId })
    .then((reviewData) => {
      return res.status(200).json(reviewData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ----------------- Get user images ---------------------------

router.get("/me/images/", requireAuth, function (req, res, next) {
  const currentUserId = req.session.currentUser;

  Image.find({ userid: currentUserId })
    .then((imageData) => {
      return res.status(200).json(imageData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ------------------------ Update user ----------------------------

router.patch(
  "/edit/me",
  requireAuth,
  fileUploader.single("profileImg"),
  function (req, res, next) {
    const userId = req.session.currentUser;

    if (req.file) {
      req.body.profileImg = req.file.path;
    }

    User.findByIdAndUpdate(userId, req.body, { new: true })
      .select("'password")
      .then((userDocument) => {
        res.status(200).json(userDocument);
      })
      .catch(next);
  }
);

// --------------------- Get user beers ------------------------------

router.get("/me/beers", requireAuth, function (req, res, next) {
  const currentUserId = req.session.currentUser;

  User.findById(currentUserId)
    .populate("beers")
    .then((userData) => {
      return res.status(200).json(userData.beers);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// ---------------------  Add user beers ---------------------------

router.patch("/me/beer/add/:id", (req, res, next) => {
  const beerId = req.params.id;
  const userId = req.session.currentUser;
  

  User.findByIdAndUpdate(userId, { $addToSet: { beers: beerId } }, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

// ------------------ remove user beers ----------------------------------

router.patch("/me/beer/remove/:id", (req, res, next) => {
  const beerId = req.params.id;
  const userId = req.session.currentUser;

  User.findByIdAndUpdate(userId, { $pull: { beers: beerId } }, { new: true })
    .then((userDocument) => {
      res.status(200).json(userDocument);
    })
    .catch(next);
});

// ------------------------ Delete user --------------------------------

router.delete("/me/delete", requireAuth, function (req, res, next) {
  const userId = req.session.currentUser;

  User.findByIdAndDelete(userId)
    .then(() => {
      req.session.destroy(function (error) {
        if (error) next(error);
        else res.status(200).json({ message: "Succesfully disconnected." });
      });
      res.status(200).json({ message: "User successfully deleted" });
    })
    .catch(next);
});
module.exports = router;
