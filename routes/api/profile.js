const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@desc : Get current user's profile
//@route : get api/profile/me
//@status : private

router.get("/me", auth, async (req, res) => {
  try{
    const profile = await Profile.findOne({ user : req.user.id }).populate("user", ["name"]);
    if(!profile){
      return res.status(400).json({msg : "Profile Not Found"});
    }
    res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@desc : Get all profiles
//@route : get api/profile
//@status : public

router.get("/", async (req, res) => {
  try{
    //fetching all accounts with the names
    let profiles = await Profile.find().populate("user", ["name"]);
    res.json(profiles);
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@desc : Get profile by user ID
//@route : get api/profile/user/:user_id
//@status : public

router.get("/user/:user_id", async (req, res) => {
  try{
    //fetching all accounts with the names
    let profile = await Profile.findOne({ user : req.params.user_id }).populate("user", ["name"]);
    if(!profile){
      return res.status(400).json({ msg : "No profile found"});
    }
    res.json(profile);
  }catch(err){
    console.error(err.message);
    if(err.kind == "ObjectId"){
      return res.status(400).json({ msg : "No profile found"});
    }
    res.status(500).send("Server Error");
  }
});

//@desc : Delete profile using user id
//@route : delete api/profile
//@status : private

router.delete("/", auth, async (req, res) => {
  try{
    //Remove posts
    await Post.deleteMany({ user : req.user.id });
    //Remove profile
    await Profile.findOneAndRemove({ user : req.user.id });
    //Remove users
    await User.findOneAndRemove({ _id : req.user.id });
    res.json({ msg : "Deleted user" });
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@desc : Create new profile or update old profile
//@route : post api/profile
//@status : private

router.post("/", [auth , [
  check("likings", "Please provide your likings").notEmpty(),
  check("status", "Please provide current citizenship status").notEmpty()
]], async(req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors : errors.array() });
  }

  const {
    company,
    location,
    status,
    likings,
    bio,
    photo,
    facebook,
    instagram,
    linkedin
  } = req.body;

  const profileFields = {};
  profileFields.user = req.user.id;
  profileFields.status = status;
  if(company) profileFields.company = company;
  if(location) profileFields.location = location;
  if(bio) profileFields.bio = bio;
  if(photo) profileFields.photo = photo;
  profileFields.likings = likings.split(",").map(liking => liking.trim());

  profileFields.social = {};

  if(facebook) profileFields.social.facebook = facebook;
  if(instagram) profileFields.social.instagram = instagram;
  if(linkedin) profileFields.social.linkedin = linkedin;

  try{
    //find the profile in the database first
    let profile = await Profile.findOne({ user : req.user.id});

    //if profile exists, update
    if(profile){
      profile = await Profile.findOneAndUpdate(
        { user : req.user.id },
        { $set : profileFields },
        { new : true }
      );

      return res.json(profile);
    }

    //if profile doesn't exist, create a new one
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);

  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }

});

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
  '/education',
  auth,
  check('school', 'School is required').notEmpty(),
  check('degree', 'Degree is required').notEmpty(),
  check('fieldOfStudy', 'Field of study is required').notEmpty(),
  check('from', 'From date is required and needs to be from the past')
    .notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(req.body);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user.id });
    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );
    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
