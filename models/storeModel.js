const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
    owner:{type: mongoose.Schema.Types.ObjectId},
    name: { type: String, required: true },

    
} , {timestamps: true})

const storeModel = mongoose.model("stores" , storeSchema)

module.exports = storeModel;