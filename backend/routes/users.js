var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');

let users = [];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/", (req, res) => {

  // KOLLA FÖRST OM EN USER EXISTERAR MED DENNA EPOST

  let newUser = {
    email: req.body.email,
    password: req.body.password,
    id: uuidv4()
  }

  users.push(newUser);

  res.json(newUser.id);
})

router.post("/login", (req, res) => {

  let foundUser = users.find(user => user.email == req.body.email && user.password == req.body.password);

  if (foundUser) {
    res.json({id: foundUser.id});
  } else {
    res.status(401).json({message: "fel inlogg"})
  }

})

module.exports = router;
