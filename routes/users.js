const router = require("express").Router();

router.get("/", (req,res) => {
    res.send("Its users page")
})

module.exports = router;