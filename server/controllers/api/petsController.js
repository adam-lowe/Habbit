const router = require("express").Router();
const Pet = require("../../models/pet");
const Users = require("../../models/user");
const { JWTVerifier } = require('../../lib/passport');

router.get("/", JWTVerifier, (req, res) => {
  Pet
    .find()
    .sort({ date: -1 })
    .then(foundPets => res.json(foundPets))
    .catch(err => res.status(422).json(err));
});


router.get("/wound", JWTVerifier, (req, res) => {
  Users.findById(req.user._id)
  .then(user => {
    const pet = user.pet;
    pet.health -= 5;
    user.save().then(user => {
      delete user.password;
      res.json(user);
    });
  })
  .catch(err => res.status(500).json(err));
});

router.get("/heal/:points", JWTVerifier, (req, res) => {
  Users.findById(req.user._id)
  .then(user => {
    const pet = user.pet;
    pet.health = pet.health + parseInt(req.params.points);
    user.points = user.points - parseInt(req.params.points);
    user.save().then(user => {
      delete user.password;
      res.json(user);
    });
  })
  .catch(err => res.status(500).json(err));
});

router.get("/:id", JWTVerifier, (req, res) => {
  Pet
    .findById(req.params.id)
    .then(foundPet => res.json(foundPet))
    .catch(err => res.status(422).json(err));
});

router.post("/", JWTVerifier, (req, res) => {
  console.log("BODY", req.body)
  console.log("Current", req.body.userID)
  const petObj = {
    name: req.body.name,
    health: req.body.health
  }
  Pet
    .create(petObj, (err, newPet) => {
      if (err) {
        console.log(err)
        return res.status(422)
      }
      console.log("PET", newPet)
      Users.findById(req.body.userID)
      .then(foundUser => {
        console.log("FoundUser", foundUser )
        foundUser.pet.id = newPet._id
        foundUser.save()
        res.json({newPet, foundUser})
      })
      // res.json(newPet)
    })
    // .catch(err => res.status(422).json(err));
});

router.put("/:id", JWTVerifier, (req, res) => {
  Pet
    .findOneAndUpdate({ _id: req.params.id }, req.body)
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

router.delete("/:id", JWTVerifier, (req, res) => {
  Pet
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
});

module.exports = router;