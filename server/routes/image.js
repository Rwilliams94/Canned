var express = require("express");
var router = express.Router();
const Image = require("../models/Image.model");
const requireAuth = require("..//middlewares/requireAuth");
const fileUploader = require("../config/cloudinaryConnection.js");

// ---------------------- Get images ------------------------

router.get("/", function (req, res, next) {
  Image.find()
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// --------------------- Upload image ----------------------------

router.post(
  "/",
  requireAuth,
  fileUploader.single("image"),
  function (req, res, next) {
    if (req.file) {
      req.body.image = req.file.path;
    }
    req.body.userid = req.session.currentUser;
    const { 
      beerid,
      userid,
      breweryid,
      image, } = req.body;

    const newImage = {
      beerid,
      userid,
      breweryid,
      image,
    };

    Image.create(newImage)
      .then((newImage) => {
        res.status(201).json(newImage);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
);

// ----------------------- Get one image --------------------------------

router.get("/:id", (req, res, next) => {
  Image.findById(req.params.id)
    .then((image) => res.status(200).json(image))
    .catch((err) => res.json(err));
});

// ----------------------  Delete images --------------------------------

router.delete("/delete/:id", requireAuth, function (req, res, next) {
  Image.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: "item successfully deleted" });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
