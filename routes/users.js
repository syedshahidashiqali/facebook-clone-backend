const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// update user
router.put("/:id", async(req,res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                res.status(500).json(err)
            }
        }
        try{
            // update(), updateMany(), findOneAndUpdate(), etc. 
            // do not execute save() middleware. If you need save middleware and full validation, 
            // first query for the document and then save() it.
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body});
            res.status(200).json("Acount has been updated!");
        } catch(err){
            res.status(500).json(err)
        }
    } else{
        res.status(403).json("You can update only your account!")
    }
})

// delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){

        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        } catch(err){
            res.status(500).json(err)
        }

    } else {
        res.status(403).json("You can delete only your account")
    }
});

// get a user
router.get("/:id", async(req,res) => {

    try{
        const user = await User.findById(req.params.id);
        // if we just say user not user._doc it returns a big object containg properties
        // so we have to again write others._doc to find the wanted properties
        const { password, updatedAt, ...others } = user._doc;
        res.status(200).json(others);
    } catch(err) {
        res.status(500).json(err);
    }
})

// follow a user
router.put("/:id/follow", async(req,res) => {
    // if not same users
    if(req.body.userId !== req.params.id){

        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            // if users' followers does not have this particular id
            // it means it is not in users followers list, and hence can be followed
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already followed this user!");
            }
        } catch(err){
            res.status(500).json(err)
        }
    } else {
        res.status(403).json("You cannot follow yourself!");
    }
});

// unfollow a user
router.put("/:id/unfollow", async(req, res) => {
    // if not same users
    if(req.body.userId !== req.params.id){

        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("User has been unfollowed!");
            } else{
                res.status(403).json("You already unfollowed this user!");
            }
        } catch(err){
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You cannot unfollow yourself!");
    }
});

module.exports = router;