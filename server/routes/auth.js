const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const salt = 10;



// ------------------------- Sign In ---------------------------------

router.post("/signin", (req, res, next) => {

  const { email, password } = req.body;
  User.findOne({ email })
    .then((userDocument) => {
      if (!userDocument) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isValidPassword = bcrypt.compareSync(password, userDocument.password);
      if (!isValidPassword) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
    
      req.session.currentUser = userDocument._id;
      res.redirect("/api/auth/isLoggedIn");
    })
    .catch(next);
});


// ------------------------- Sign up ---------------------------------

router.post("/signup", (req, res, next) => {
  const { email, password, userName, city } = req.body;

  User.findOne({ email })
    .then((userDocument) => {

      if (userDocument) {
        return res.status(400).json({ message: "Email already taken" });
      }

      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = { email, userName, city, password: hashedPassword };

      User.create(newUser)
        .then((newUserDocument) => {
          /* Login on signup */
          req.session.currentUser = newUserDocument._id;
          res.redirect("/api/auth/isLoggedIn");
        })
        .catch(next);
    })
    .catch(next);
});


// -------------------- is Loggen In --------------------------------


router.get("/isLoggedIn", (req, res, next) => {
  if (!req.session.currentUser)
    return res.status(401).json({ message: "Unauthorized" });

  const id = req.session.currentUser;
  
  User.findById(id)
    .select("-password")
    .then((userDocument) => {
   
      res.status(200).json(userDocument);
    })
    .catch(next);
});


// --------------------- Log Out ------------------------------------


router.get("/logout",  (req, res, next) => {
  req.session.destroy(function (error) {
    
    if (error) next(error);
    else res.status(200).json({ message: "Succesfully disconnected." });
  });
});

module.exports = router;