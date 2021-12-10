const router = require("express").Router();
const bcrypt = require("bcrypt");
// import User model
const User = require("../models/user");

// REGISTER
router.post("/register", async (req,res) => {

    try{
        // generates a random text salt for use with hashpw
        // 1st few chars in this hold bcrypt version number and value for log_rounds
        // remainder chars stores 16 bytes of base64 encoded randomness for seeding the hashing algorithm
        // bcrypt.hash(data, salt, "callback(optional)")

        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            followers: req.body.followers,
            following: req.body.following,
            isAdmin: req.body.isAdmin,
        });

        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user)
    } catch(err){
        console.log(err)
    }
})

module.exports = router;