const mongoose = require("mongoose");

const userSchema = mongoose.Schema({

  name: { type: String, required: true },
  isAdmin: {type : Boolean , required:true},
  userId: { type: String, 

  },
  password: { type: String, required: true },
  
  
}, {timestamps : true});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;