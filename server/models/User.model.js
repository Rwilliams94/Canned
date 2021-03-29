const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: String,
    password: String,
    userName: String,
    city: String,
    beers: [
        {
        type: Schema.Types.ObjectId,
        ref: "Beer",
      }
    ],
    // awards: [] ??
    profileImg: {
        type: String,
        default:
        "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
    },
 
});

const User = mongoose.model("User", userSchema);

module.exports = User;
