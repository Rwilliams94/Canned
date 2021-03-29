const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/canned", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((self) => {
    console.log(`Connection to ${self.connection.name} established. on ${process.env.PORT} `);
  })
  .catch((error) => {
    console.log(`An error occured try to connect to the DB ${error}`);
  });
