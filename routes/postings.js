const express = require("express");
const router = express.Router();
const postingModel = require("../services/postingModel.js");
const usersModel = require("../services/usersModel.js");
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

router.get("/search_category/:category", (req,res) => {
    var result = postingModel.getPostingByCategory(req.params.category)
    console.log("Items found for the category: " + req.params.category)

    if(result != null) {
        res.json(result)
        console.log(result)
    } else {
        res.status(404)
    }


});

router.put("/modify/:_id", (req, res) => {
    var posting = req.body;
    posting = {
        _id: req.params._id,
        ...posting
    }
    console.log("Modify operation: \n")
    console.log(postingModel.getPostingById(req.params._id))
    var result = postingModel.modifyPosting(posting)
    if(result != undefined) {
        res.send(200).json(result)
        console.log("Successful! Item with id: " + req.params._id + ", has been modified succesfuly")
    } else {
        res.sendStatus(404)
        console.log("Not successful! Object has not been created yet")
    }



});

router.delete("/delete/:_id", (req, res) => {
    
    res.status(200).send(postingModel.deletePosting(req.body));
    console.log("Item with id: " + req.params._id + ", has been deleted succesfuly")
});

module.exports = router;