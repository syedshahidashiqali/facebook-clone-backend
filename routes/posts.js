const router = require("express").Router();
const Post = require("../models/post");

// create a post
router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost  = await newPost.save();
        res.status(200).json(savedPost);
    } catch(err){
        res.status(500).json(err);
    }
});

// update a post
// delete a post
// like / dislike a post
// get a post
// get all posts i.e timeline posts

module.exports = router;