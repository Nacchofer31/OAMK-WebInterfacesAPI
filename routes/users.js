const express = require("express");
const router = express.Router();
const usersModel = require("../services/usersModel.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const jwtKey = require('../jwtKey.json');

router.post("/register", (req,res) => {
    var user = req.body
    bcrypt.hash(user.password, saltRounds, function(err,hash){
        user = {
            _id: usersModel.getUsers().length +1,
            ...user,
            password: hash,
        }
        try {
            res.status(200).send(usersModel.addUser(user))
        }catch(err){
            console.log(err)
            res.send(err)
        }
    })
})

module.exports = router;