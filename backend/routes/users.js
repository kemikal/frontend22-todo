var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const crypto = require("crypto-js");

// let users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.app.locals.db.collection("users").find().toArray()
  .then( result => {
   console.log("resultat från databasen", result)
   res.json(result)
  })
});

router.post("/", (req, res) => {

  // KOLLA FÖRST OM EN USER EXISTERAR MED DENNA EPOST
  // KRYPTERA LÖSENORD

  let newUser = { email: req.body.email }
  let hashedPassword = crypto.SHA3(req.body.password).toString();
  newUser.password = hashedPassword;

  //LÄGGA IN NY USER

  req.app.locals.db.collection("users").insertOne(newUser)
   .then( result => {
    console.log("resultat från databasen", result)
    res.json(result)
   })
})

router.post("/login", (req, res) => {

  fs.readFile("./users.json", (err, data) => {
    if (err) console.log("err", err);

    let users = JSON.parse(data);
    
    let foundUser = users.find(user => user.email == req.body.email && user.password == req.body.password);
  
    if (foundUser) {
      res.json({id: foundUser.id});
    } else {
      res.status(401).json({message: "fel inlogg"})
    }

  })


})

module.exports = router;
