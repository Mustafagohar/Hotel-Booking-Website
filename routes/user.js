const express = require("express");
const router = express.Router();
const User = require("../models/user");
const passport = require("passport");


router.get("/signup", (req, res) => {
    res.render("users/signup");
});


router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);

        console.log("User registered:", registeredUser);

        req.flash("success", "");

        
        res.redirect("/listings");

    } catch (e) {
        console.error("Signup error:", e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
});

router.get("/login", (req, res) => {
    res.render("users/login.ejs", { error: null }); // always pass error (even if null)
});

  
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.flash("error", "Invalid username or password");
            return res.redirect("/login");
        }
        req.logIn(user, (err) => {
            if (err) return next(err);
            req.flash("success", "Welcome back!");
            return res.redirect("/listings");
        });
    })(req, res, next);
});


router.get("/login", (req, res)=>{
    res.render("users/login.ejs");
})

module.exports = router;

