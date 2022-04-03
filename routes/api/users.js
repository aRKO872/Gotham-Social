const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../../models/User");

router.post("/", [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Provide a proper email").isEmail(),
  check("password", "Provide a password with more than 8 characters").isLength({ min : 8 })
],
async (req, res) => {
  //validating the checks for name, email and password
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors : errors.array() });
  }

  //destructuring name, email and password to use later
  const { name, email, password } = req.body;

  //finding user to see if he/she exists in database, if not creating a new user object and saving it to database.
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    };
    user = new User({
      name,
      email,
      password
    });

    //encrypting password before saving user to database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //setting up jwt payload for passing user info while authentication
    const payload = {
      user : {
        id : user.id
      }
    };

    //getting user token back by jwt sign using the jwtSecret, which would expire in 360000 ms
    jwt.sign(payload,
    config.get("jwtSecret"),
    { expiresIn : 360000 },
    (err, token) => {
      if (err) throw err;
      res.json({token});
    });

  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
