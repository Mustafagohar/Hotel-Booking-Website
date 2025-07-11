/*const express = require("express");
const router = express.Router();


router.get("/listings", wrapAsync(async (_req, res) => {
    try {
      const allListings = await LISTING.find({});
      res.render("listings/index", { allListings });
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).send("Server Error");
    }
  }));

  // new Route

  router.get("/listings/new", (_req, res)=>{
    res.render("listings/new.ejs");
  })

  // show route

  router.get("/listings/:id", wrapAsync(async (req, res) => {
    try {
      let { id } = req.params;
      const listing = await LISTING.findById(id);
      res.render("listings/show", { listing });
    } catch (error) {
      console.error("Error fetching listing:", error);
      res.status(500).send("Server Error");
    }
  }));

  router.post("/listings",validateListing,wrapAsync(async (req, res, next) => {
       
    let result = listingSchema.validate(req.body);
    console.log(result);

    if(result.error){
      throw new ExpressError(400, result.error);
    }

      /*if(!req.body.listing){

        throw new ExpressError(400, "send valid data for listing ");
      } 

      const newListing = new LISTING(req.body.listing);
       await newListing.save();
       res.redirect("/listings");
    }));






 

    router.get("/listings/:id/edit", wrapAsync(async(req, res)=>{
     let {id} = req.params;
    const listing = await LISTING.findById(id) 
    res.render("listings/edit", {listing});
  
 }));

 // update route

 router.put("/listings/:id",
  validateListing, 
  wrapAsync(async (req, res)=>{

  if(!req.body.listing){

    throw new ExpressError(400, "send valid data for listing ");
  }

  let {id} = req.params;
  await LISTING.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect("/listings");
 }));

 router.delete("/listings/:id", wrapAsync(async (_req, res)=>{

  let {id} = _req.params;
  let deletedListing = await LISTING.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
 }));

 module.exports = router;*/
