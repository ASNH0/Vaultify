const mongoose = require("mongoose");

const cashiersSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId , 
        ref: "users"
      },
    name: { type: String, required: true },
    usreName: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {type : Boolean , required:false},

},{timestamps: true});

const cashiersModel = mongoose.model("cashiers", cashiersSchema);

module.exports = cashiersModel;