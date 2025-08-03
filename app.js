const express = require("express")
const app = express();
const mongoose = require("mongoose");
const  LISTING = require("./models/listing.js")
const path = require("path"); 
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

/*const expressLayouts = require('express-ejs-layouts');*/
const {listingSchema} = require("./schema.js");
const Review = require("./models/review.js");
const listings = require("./routes/listing.js");


const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';

/*const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});*/




main().then(()=>{

  console.log("connected to DB");
})
.catch(err => {
    console.log(err);
});

async function main(){

  await mongoose.connect(MONGO_URL);
}

  app.get("/", (_req,res)=>{

       res.send("hi, i am root");
  });

  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "views"));
  app.use(express.urlencoded({extended: true}));
  app.use(methodOverride("_method"));
  app.engine('ejs', ejsMate);
  app.use(express.static(path.join(__dirname, "/public")));

  const seesionOptions = {

    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
      expries:Date.now() + 7*24*60*60*1000,
      maxAge: 7*24*60*60*1000
      
    }
  };

  app.use(session(seesionOptions));
  app.use(flash());

  app.use((req, res, next)=>{

    res.locals.success = req.flash("success");
    next();
  });



  const validateListing = (req,res, next) =>{

    let {error} = listingSchema.validate(req.body);
    

    if(error){
     let errMsg = error.details.map((el) => el.message).join(",");
     throw new ExpressError(400, errMsg); 

      throw new ExpressError(400, result.error);
    }
    else{
      next();
    }
  };

  //app.use("/listings", listings)


  
  // index route
  app.get("/listings", wrapAsync(async (_req, res) => {
    try {
      const allListings = await LISTING.find({});
      res.render("listings/index", { allListings });
    } catch (error) {
      console.error("Error fetching listings:", error);
      res.status(500).send("Server Error");
    }
  }));

  // new route

  app.get("/listings/new", (_req, res)=>{
    res.render("listings/new.ejs");
  })

  // show route

  app.get("/listings/:id", wrapAsync(async (req, res) => {
    try {
      let { id } = req.params;
      const listing = await LISTING.findById(id);
      res.render("listings/show", { listing });
    } catch (error) {
      console.error("Error fetching listing:", error);
      res.status(500).send("Server Error");
    }
  }));

  // Create Route  1

  /*app.post(" /listings", async (_req,res)=>{

    let {title,description, image,price, country, location} = req.body;
  })*/

    // app.post("/listings", async (req, res) => {
    //   const newListing = new LISTING(req.body.listing);
    //   await newListing.save();
    //   res.redirect("/listings");
    // });
     // create route
   /* app.post("/listings", async (req, res, next) => {

      try{
      const newListing = new LISTING(req.body);
      await newListing.save();
      res.redirect("/listings");
      } catch(err){

        next(err);
      }
    });*/

    app.post("/listings",validateListing,wrapAsync(async (req, res, next) => {
       
      let result = listingSchema.validate(req.body);
      console.log(result);

      if(result.error){
        throw new ExpressError(400, result.error);
      }

        /*if(!req.body.listing){

          throw new ExpressError(400, "send valid data for listing ");
        }*/

        const newListing = new LISTING(req.body.listing);
         await newListing.save();
         res.redirect("/listings");
      }));




  

   
  
   app.get("/listings/:id/edit", wrapAsync(async(req, res)=>{
       let {id} = req.params;
      const listing = await LISTING.findById(id) 
      res.render("listings/edit", {listing});
    
   }));

   // update route

   app.put("/listings/:id",
    validateListing, 
    wrapAsync(async (req, res)=>{

    if(!req.body.listing){

      throw new ExpressError(400, "send valid data for listing ");
    }

    let {id} = req.params;
    await LISTING.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listings");
   }));

   app.delete("/listings/:id", wrapAsync(async (_req, res)=>{

    let {id} = _req.params;
    let deletedListing = await LISTING.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
   }));


   //Reviews
   //Post Route
   app.post("/listings/:id/reviews", async(req,res)=>{
      
    let listing = await listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    res.send("new review saved");
   });

   /*app.get('/listings', (req, res) => {
    // Fetch your listings from a database or an array
    const allListings = [
        { _id: 1, title: "Listing 1", image: "image1.jpg", description: "Description for listing 1" },
        { _id: 2, title: "Listing 2", image: "image2.jpg", description: "Description for listing 2" }
    ];

    // Render the view with the listings data
    res.render('listings', { allListings });
});*/



  


  
  

  /*app.get("/listings", async (_req,res)=>{
   const allListings = await  LISTING.find({});
   res.render("/listings/index.ejs", {allListings});
  });*/


/*app.get("/testingListing", async (req, res)=>{

  let sampleListing = new LISTING({

    title: "My New Villa",
    description: "By The beach",
    price: 1200,
    location: "Calangute, Goa",
    country : "India",
  });



await sampleListing.save();
console.log("sample was saved ");
res.send("successful testing");
});*/

app.get(/(.*)/, (req, res, next) => {
  console.log(req.path, req.params); // req.params will be { '0': '/the/path' }
  next();
});



app.use((err, req, res, next)=>{
  
  let {statusCode=500, message="something went wrong"} = err;
  res.status(statusCode).render("error.ejs", {message});
  
  //res.status(statusCode).send(message);
  /*res.send("something went wrong!");*/

}); 

// extra

app.get('/listings/listings/new', (req, res) => {
  res.send('New Listing Page'); // Or render a template/view
});

  


app.listen(8080, () =>{

    console.log("server is listening to the port 8080");
});


