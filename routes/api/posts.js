const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {check, validationResult} = require("express-validator");
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");
const User = require("../../models/User");


//route : Get api/posts
//desc : Shows all posts by the users
//access : Private

router.get("/", auth,
async (req, res) => {
  try{
    const posts = await Post.find().sort({ date : -1 });          //sort all posts by date in descending order, showing
    res.json(posts);                                              //the recent ones first
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route : Get api/posts/:id
//desc : Shows posts by a user
//access : Private

router.get("/:id", auth,
async (req, res) => {
  try{
    const posts = await Post.findById(req.params.id);
    if(!posts){
      res.status(404).json({ msg : "Posts not found by this user" })
    }
    res.json(posts);
  }catch(err){
    console.error(err.message);
    if(err.kind === ObjectId){
      res.status(404).json({ msg : "Posts not found by this user" })
    }
    res.status(500).send("Server Error");
  }
});

//route : Post api/posts
//desc : Creates posts
//access : Private

router.post("/",[
  auth,
  [
    check("text", "Text is required").not().isEmpty()
  ]
],
 async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
     return res.status(400).json({ errors : errors.array() });
   }
   try{
     const user = await User.findById(req.user.id).select("-password");
     const profile = await Profile.findOne({user : req.user.id});
     const newPost = new Post({
        text: req.body.text,
        name : user.name,
        user: req.user.id,
        photo : profile.photo
     });
     const post = await newPost.save();
     res.json(post);
   }catch(err){
     console.error(err.message);
     res.status(500).send("Server Error");
   }
});

//route : Delete api/posts/:id
//desc : Delete Post of a user
//access : Private

router.delete("/:id", auth,
async(req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if(!post){
      return res.status(404).json({msg : "Post does not exist"});
    }
    //Check if user is not the one who accessed this route
    if(post.user.toString() !== req.user.id){
      return res.status(401).json({ msg : "User not authorized" });
    }

    await post.remove();
    res.json({ msg : "Post is removed" })
  }catch(err){
    console.error(err.message);
    if(err.kind === ObjectId){
      res.status(404).json({msg : "Post does not exist"});
    }
    res.status(500).send("Server Error");
  }
});

//route : Put api/posts/like/:id
//desc : Like a post
//access : Private
router.put("/like/:id", auth,
async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);

    //Checking if post is liked already
    if(post.likes.filter(like => like.users.toString() === req.user.id).length > 0){    //removes like if like is already present
      const removeIndex = post.likes.map(like => like.users.toString()).indexOf(req.user.id);
      post.likes.splice(removeIndex, 1);
    }else{                          //executing if like is not present, and going on to remove dislike and putting the like
      if(post.dislikes.filter(dislike => dislike.users.toString() === req.user.id).length > 0){
        const removeIndex = post.dislikes.map(like => like.users.toString()).indexOf(req.user.id);
        post.dislikes.splice(removeIndex, 1);
      }
      post.likes.unshift({ users : req.user.id });
    }

    await post.save();
    res.json({ like : post.likes,
              dislike : post.dislikes });
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route : Put api/posts/dislike/:id
//desc : Dislike a post
//access : Private
router.put("/dislike/:id", auth,
async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);

    //Checking if post is disliked already
    if(post.dislikes.filter(dislike => dislike.users.toString() === req.user.id).length > 0){   //removes dislike if dislike is
      const removeIndex = post.dislikes.map(dislike => dislike.users.toString()).indexOf(req.user.id);   //already present
      post.dislikes.splice(removeIndex, 1);
    }else{                          //executing if dislike is not present, and going on to remove like and putting the like
      if(post.likes.filter(like => like.users.toString() === req.user.id).length > 0){
        const removeIndex = post.likes.map(like => like.users.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
      }
      post.dislikes.unshift({ users : req.user.id });
    }

    await post.save();
    res.json({ like : post.likes,
              dislike : post.dislikes });
  }catch(err){
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//route : Post api/posts/comments/:id
//desc : Dislike a post
//access : Private
router.post("/comments/:id",[
  auth,
  [
    check("text", "Text is required").not().isEmpty()
  ]
],
 async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
     return res.status(400).json({ errors : errors.array() });
   }
   try{
     const user = await User.findById(req.user.id).select("-password");
     const profile = await Profile.findOne({user : req.user.id});
     const post = await Post.findById(req.params.id);
     const newComment = {
        text: req.body.text,
        name : user.name,
        users: req.user.id,
        photo : profile.photo
     };
     post.comments.unshift(newComment);
     await post.save();
     res.json(post.comments);
   }catch(err){
     console.error(err.message);
     res.status(500).send("Server Error");
   }
});

//route : Delete api/posts/comments/:id/:comment_id
//desc : Delete comment from a post
//access : Private
router.delete('/comments/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    post.comments = post.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await post.save();

    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
