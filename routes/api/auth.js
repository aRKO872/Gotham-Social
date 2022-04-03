const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");          //getting middleware next() function triggered from the link
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const UserModel = require("../../models/User");

//adding auth to the function to make this a protected route
router.get("/", auth,
  async (req, res) => {
  try{
    //finding the user object in database via the id passed down in the payload of the jwt, and showing all info
    //other than the password
    const user = await UserModel.findById(req.user.id).select("-password");
    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


//authenticate user and get token
router.post("/", 
  check("email", "Provide a proper email").isEmail(),
  check("password", "Provide a password with more than 8 characters").exists(),
async (req, res) => {
  //validating the checks for name, email and password
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors : errors.array() });
  }

  //destructuring email and password to use later
  const { email, password } = req.body;

  //if user doesn't exist show invalid credentials.
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    };

    //checking if password is right
    const passCheck = await bcrypt.compare(password, user.password);
    if(!passCheck){
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

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
