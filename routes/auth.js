const router = require("express").Router();
// import User model
const User = require("../models/user");

// REGISTER
router.post("/register", async (req,res) => {
    const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
        coverPicture: req.body.coverPicture,
        followers: req.body.followers,
        following: req.body.following,
        isAdmin: req.body.isAdmin,
    });

    try{
        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err){
        console.log(err)
    }
})

module.exports = router;