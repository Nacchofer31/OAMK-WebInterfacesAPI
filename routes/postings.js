const express = require("express");
const router = express.Router();
const postingModel = require("../services/postingModel.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const jwtKey = require('../jwtKey.json');

router.post("/create", (req, res) => {
    var posting = req.body;
    posting = {
        _id: postingModel.getPostings().length +1,
        ...posting
    }

    res.status(200).send(postingModel.addPosting(posting));
    console.log("Item " + posting._id + " created!")

}
);

router.get("/search/:_id", (req, res) => {

    res.json(postingModel.getPostingById(req.params._id))
    console.log(postingModel.getPostingById(req.params._id))
});

router.delete("/delete/:_id", (req, res) => {
    
    res.status(200).send(postingModel.deletePosting(req.params._id));
    console.log("Item with id: " + req.params._id + ", has been deleted succesfuly")
});

module.exports = router;