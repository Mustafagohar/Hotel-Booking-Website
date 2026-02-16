const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync"); // Imported correctly
const Listing = require("../models/listing"); // Assuming you have a Listing model

// Get all listings
router.get("/listings", wrapAsync(async (_req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
}));

//<<<<<<< HEAD
  // new Route
//=======
// Create a new listing (GET form)
router.get("/listings/new", (req, res) => {
    res.render("listings/new");
});
//>>>>>>> 3eeb955 (Updated project)

// Create a new listing (POST form)
router.post("/listings", wrapAsync(async (req, res) => {
    // If you had a validation, you might uncomment this
    // if (!req.body.listing) {
    //     throw new Error("Invalid Listing Data");
    // }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

// Show a single listing
router.get("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
}));

// Edit form for a listing
router.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit", { listing });
}));

// Update a listing
router.put("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing);
    res.redirect(`/listings/${id}`);
}));

// Delete a listing
router.delete("/listings/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

module.exports = router;
