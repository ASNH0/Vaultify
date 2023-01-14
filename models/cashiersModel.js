const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cashiersSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId , 
        ref: "users"
      },
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: {type : Boolean , required:false},

},{timestamps: true});



cashiersSchema.pre("save", function (next) {
  const user = this

  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }

          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

const cashiersModel = mongoose.model("cashiers", cashiersSchema);

module.exports = cashiersModel;