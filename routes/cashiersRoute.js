const express = require("express");
const CashierModel = require("../models/cashiersModel");
const router = express.Router();

router.get("/get-all-cashiers", async (req, res) => {
    try {
        const cashiers = await CashierModel.find();
        res.send(cashiers);
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/add-cashier", async (req, res) => {
    try {
        const newcashier = new CashierModel({...req.body , isAdmin: false});
        await newcashier.save()
        res.send('cashier added successfully')
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/edit-cashier", async (req, res) => {
    try {
        await CashierModel.findOneAndUpdate({ _id: req.body.cashierId }, req.body)
        res.send('cashier updated successfully')
    } catch (error) {
        res.status(400).json(error);
    }
});



router.post("/delete-cashier", async (req, res) => {
    try {
        await CashierModel.findOneAndDelete({ _id: req.body.cashierId })
        res.send('cashier deleted successfully')
    } catch (error) {
        res.status(400).json(error);
    }
});

router.post("/cashier-login", async (req, res) => {
    try {
      const user = await CashierModel.findOne({
        name: req.body.name,
        password: req.body.password,
      
      });
      if (user) {
        res.send(user);
      } else {
        res.status(400).json({ message: "Login failed" , user });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  });





module.exports = router