const express = require("express");
const UserModel = require("../models/userModel");
const CashierModel = require("../models/cashiersModel");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userName: req.body.userName,
      password: req.body.password,
    
    });
    const cashier = await CashierModel.findOne({
      userName: req.body.userName,
      password: req.body.password,
     
    })
    if (user) {
      res.send(user);
    }
    else if(cashier){
      res.send(cashier);
    }
     else {
      res.status(400).json({ message: "Login failed" , user });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const newuser = new UserModel({ ...req.body, verified: false });
    await newuser.save();
    res.send("User Registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
