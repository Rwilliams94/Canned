const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Schema for the reviews
const brewerySchema = new Schema ({
    name: String,
    description: String,
    website: String,
    establisheddate: Number,
    address: String,
    latitude: Number,
    longitude: Number,
    image: {
        type: String,
        default:
          "https://cdn1.iconfinder.com/data/icons/gardening-filled-line/614/1935_-_Growing_Plant-512.png",
      },
    rating: Number,
},
{timestamps: { createdAt: "created_at", updatedAt: "updated_at" }}
);

// Export the reviews schema
const Brewery = mongoose.model("Brewery", brewerySchema);
module.exports = Brewery;