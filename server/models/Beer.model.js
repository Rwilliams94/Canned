const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Schema for the reviews
const beerSchema = new Schema ({
    name: String,
    description: String,
    abv: Number, 
    breweryname: String,
    breweryid: {
        type: Schema.Types.ObjectId,
        ref: "Brewery",
      },
    releasedate: Number,
    image: {
        type: String,
        default:
          "https://static9.depositphotos.com/1364311/1228/i/600/depositphotos_12283154-stock-photo-beer-can.jpg",
      },
    rating: Number,
},
{timestamps: { createdAt: "created_at", updatedAt: "updated_at" }}
);

// Export the reviews schema
const Beer = mongoose.model("Beer", beerSchema);
module.exports = Beer;

