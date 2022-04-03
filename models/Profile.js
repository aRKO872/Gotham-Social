const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,                        //creating a reference User key value pair
    ref : "user"
  },
  company : {
    type : String
  },
  location : {
    type : String
  },
  status : {
    type : String,
    required : true
  },
  likings : {
    type : [String],
    required : true
  },
  bio : {
    type : String
  },
  photo : {
    type : String
  },
  education : [{
    school : {
      type : String,
      required : true
    },
    degree : {
      type : String,
      required : true
    },
    fieldOfStudy : {
      type : String,
      required : true
    },
    from : {
      type : Date,
      required : true
    },
    to : {
      type : Date,
    },
    current : {
      type : Boolean,
      default : false
    },
    description : {
      type : String
    }
  }],
  social : {
    facebook : {
      type : String
    },
    instagram : {
      type : String
    },
    linkedin : {
      type : String
    }
  },
  date : {
    type : Date,
    default : Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
