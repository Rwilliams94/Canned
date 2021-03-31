require("dotenv").config();
require("./config/mongodb");

const cors = require("cors");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const app = express();


/*
 * Middlewares
 */

app.use(logger("dev")); // This logs HTTP reponses in the console.
app.use(express.json()); // Access data sent as json @req.body
app.use(express.urlencoded({ extended: false })); // Access data sent as urlEncoded (standard form or postman) @req.body
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use(
    session({
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }), // Persist session in database.
      secret: process.env.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
    })
  );
  

app.use(
  cors({
      origin: "http://localhost:3000",
      credentials: true, 
  })
)

/*
 * Routes
 */

// const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const beerRouter = require("./routes/beer");
const breweryRouter = require("./routes/brewery");
const reviewRouter = require("./routes/review");
const imageRouter = require("./routes/image");


// app.use("/", indexRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/beer", beerRouter);
app.use("/api/brewery", breweryRouter);
app.use("/api/review", reviewRouter);
app.use("/api/image", imageRouter);

// ...routes 

if (process.env.NODE_ENV === "production") {
  app.use("*", (req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/public/index.html");
  });
}

module.exports = app;
