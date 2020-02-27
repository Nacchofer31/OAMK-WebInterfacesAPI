const express = require("express")
const router = express.Router()
const postingModel = require("../services/postingModel.js")
const auth = require("../util/auth.js")

router.post("/create", auth.authenticate('jwt', {session:false}), (req, res) => {
    var posting = req.body
    var user = req.user
    posting = {
        _id: postingModel.getPostings().length +1,
        title: posting.title,
        description: posting.description,
        category: posting.category,
        location: {
            city: user.city,
            country: user.country
        },
        images: posting.images,
        askingPrice: posting.askingPrice,
        currency: posting.currency,
        dateOfPosting: new Date().now().toDateString,
        deliveryType: posting.deliveryType,
        contactInfo: {
            sellerName: user.name,
            phoneNumber: user.phoneNumber,
            sellerEmail: user.email
        }
    }

    res.status(200).send(postingModel.addPosting(posting));
    console.log("Item " + posting._id + " created!")

    user.postings.push(posting._id)

});

router.get("/search/:_id", (req, res) => {

    res.json(postingModel.getPostingById(req.params._id))
    console.log(postingModel.getPostingById(req.params._id))
});

router.get("/search_date", (req,res) => {
    var result = postingModel.getPostingByDate(req.body.dateOfPosting)
    console.log("Items found by the date of posting: " + req.body.dateOfPosting)

    if(result !== undefined) {
        res.status(200).json(result)
        console.log(result)
    } else {
        res.sendStatus(404)
    }


});

router.get("/search_location", (req,res) => {
    var result = postingModel.getPostingByLocation(req.body.location)
    console.log("Items found by the location: " + "\n" + req.body.location.city +"\n" + req.body.location.country)

    if(result !== undefined) {
        res.status(200).json(result)
        console.log(result)
    } else {
        res.sendStatus(404)
    }


});


router.get("/search_category/:category", (req,res) => {
    var result = postingModel.getPostingByCategory(req.params.category)
    console.log("Items found for the category: " + req.params.category)

    if(result !== undefined) {
        res.status(200).json(result)
        console.log(result)
    } else {
        res.sendStatus(404)
    }


});

router.put("/modify/:_id", auth.authenticate('jwt', {session:false}), (req, res) => {
    var posting = req.body
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

module.exports = router