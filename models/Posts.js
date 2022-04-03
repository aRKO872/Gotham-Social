const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type : mongoose.Schema.Types.ObjectId,
    ref : "users"
  },
  text : {
    type : String,
    required : true
  },
  name : {
    type : String
  },
  photo : {
    type : String
  },
  likes : [
    {
        users : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "users"
        }
    }
  ],
  dislikes : [
    {
        users : {
          type : mongoose.Schema.Types.ObjectId,
          ref : "users"
        }
    }
  ],
  comments : [
    {
      users : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
      },
      text : {
        type : String,
        required : true
      },
      photo : {
        type : String
      },
      name : {
        type : String
      },
      date : {
        type : Date,
        default : Date.now
      }
    }
  ],
  date : {
    type : Date,
    default : Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);