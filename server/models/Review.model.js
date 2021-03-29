const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema ({ 

    comment: String,
    rating: Number,
    beername: String,
    beerid: {
        type: Schema.Types.ObjectId,
        ref: "Beer",
      },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
    breweryid: {
          type: Schema.Types.ObjectId,
          ref: "Brewery",
        },


},
{timestamps: { createdAt: "created_at", updatedAt: "updated_at" }}
);



const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;