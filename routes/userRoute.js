const express = require("express");
const UserModel = require("../models/userModel");
const CashierModel = require("../models/cashiersModel");
const router = express.Router();
const users = require("../data/users");
const cry = require("../data/users");
const bcrypt = require("bcrypt");
const {cr} = require("../data/users");

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userName: req.body.userName,
     
    });
     

      // if(!user){
      //   return res.status(400).json({message:"Login failed"})
      // }
      // if(!bcrypt.compareSync(req.body.password) , UserModel.password){
      //  return res.status(400).json({message:" login failed"})
      // }
    
    if (user) {
      if( await bcrypt.compare(req.body.password  , user.password)){
      res.send(user);
      }else{
        res.status(400).json( {message: "login failed"})
      }
    }

    const cashier = await CashierModel.findOne({
      userName: req.body.userName,
      
     
    })

     if(cashier){
      if( await bcrypt.compare(req.body.password  , cashier.password)){
       
      res.send(cashier);
    }else {
      res.status(400).json({ message: "Login failed" , user });
    }
  }
  } catch (error) {
    res.status(400).json(error);
  }
});


router.post("/register", async (req, res) => {
  try {
    const newuser = new UserModel({ ...req.body, isAdmin: false });
    await newuser.save();
    res.send("User Registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
