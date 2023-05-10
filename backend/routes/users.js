var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");

// let users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/", (req, res) => {

  // KOLLA FÖRST OM EN USER EXISTERAR MED DENNA EPOST

  // HÄMTA

  fs.readFile("./users.json", (err, data) => {
    if (err) console.log("err save user", err);

    let users = JSON.parse(data);
    console.log("readfile", users);

    // ÄNDRA
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      id: uuidv4()
    }

    users.push(newUser);

    // SPARA
    fs.writeFile("./users.json", JSON.stringify(users, null, 4), (err) => {
      if (err) console.log("err", err);
    })

  res.json(newUser.id);
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
