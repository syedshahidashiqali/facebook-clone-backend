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
// unfollow a user

module.exports = router;