const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema ({ 

    image: String,
    beername: String,
    beerid: {
        type: Schema.Types.ObjectId,
        ref: "Beer",
      },
    breweryid: {
        type: Schema.Types.ObjectId,
        ref: "Brewery",
      },
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        },
  



},
{timestamps: { createdAt: "created_at", updatedAt: "updated_at" }}
);



const Image = mongoose.model("Image", imageSchema);
module.exports = Image;