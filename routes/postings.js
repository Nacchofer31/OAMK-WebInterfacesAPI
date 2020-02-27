const express = require("express")
const router = express.Router()
const postingModel = require("../services/postingModel.js")
const usersModel = require("../services/usersModel.js")
const auth = require("../util/auth.js")

router.post("/create", auth.authenticate('jwt', {session:false}), (req, res) => {
    var posting = req.body
    var user = req.user
    posting = {
        _id: postingModel.getPostings().length +1,
        title: posting.title !== undefined ? posting.title : "",
        description: posting.description !== undefined ? posting.description : "",
        category: posting.category !== undefined ? posting.category : "",
        location: {
            city: user.city,
            country: user.country
        },
        images: posting.images !== undefined ? posting.images : "",
        askingPrice: posting.askingPrice !== undefined ? posting.askingPrice : "",
        currency: posting.currency !== undefined ? posting.currency : "",
        dateOfPosting: new Date().toDateString(),
        deliveryType: posting.deliveryType !== undefined ? posting.deliveryType : "",
        sellerName: user.name,
        phoneNumber: user.phoneNumber,
        sellerEmail: user.email,
        
    }



        res.status(200).send(postingModel.addPosting(posting));
        console.log("Item " + posting._id + " created!")
 // no validation errors, so pass to the next

    //var userPostings = usersModel.addPosting(user._id, posting._id)
    //console.log(userPostings)





});

router.get("/search/:_id", (req, res) => {

    res.json(postingModel.getPostingById(Number(req.params._id)))
    console.log(postingModel.getPostingById(Number(req.params._id)))
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
        _id: Number(req.params._id),
        ...posting
    }
    if(postingModel.getSellerName(Number(req.params._id)) === req.user.name){
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
    } else {
        res.sendStatus(400)
    }



});

router.delete("/delete/:_id", auth.authenticate('jwt', {session:false}), (req, res) => {
    var posting = postingModel.getPostingById(Number(req.params._id))
    console.log(posting)
    console.log(Number(req.params._id))
    console.log(req.user.name)
    if(postingModel.getSellerName(Number(req.params._id)) === req.user.name) {
        var result = postingModel.deletePosting(Number(req.params._id))
        if(result !== undefined) {
            res.status(200).send(result);
        }

        console.log("Item with id: " + req.params._id + ", has been deleted succesfuly")
    } else {
        res.sendStatus(400)
    }
});

module.exports = router