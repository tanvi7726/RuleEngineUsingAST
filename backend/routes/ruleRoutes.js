const express = require("express");
const router = express.Router();
const Rule = require("../models/rule");
const {create_rule} = require("../ruleControllers/ruleControllers")

// Add a new rule
router.post("/create", async (req, res) => {
  try {
    const { string } = req.body;
    const ast = create_rule(string);
    const newRule = new Rule({ string, ast });
    await newRule.save();
    res.status(201).json(newRule);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Get all rules
router.get("/", async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
