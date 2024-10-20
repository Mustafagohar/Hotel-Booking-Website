const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        filename: { type: String }, 
        url: {
            type: String,
            set: (v) => v === "" ? "https://img.sm360.ca/ir/w640h480/images/article/groupe-theetge/108037//s-63-amg-peformance1670604516124.jpeg" : v,
            default: "https://img.sm360.ca/ir/w640h480/images/article/groupe-theetge/108037//s-63-amg-peformance1670604516124.jpeg"
        }
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },

    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",

        },
    ],


});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
