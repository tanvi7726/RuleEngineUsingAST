const express = require("express");
const router = express.Router();
const Rule = require("../models/rule");
const generate = require("@babel/generator").default;
const {create_rule, combine_rules} = require("../ruleControllers/ruleControllers")

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

// Combine rules
router.post("/combine", async (req, res) => {
  try {
    const { rules } = req.body; // Get the array of rule strings from the request body

    // Convert rule strings to ASTs using create_rule
    const asts = rules.map(rule => create_rule(rule));
    
    if (asts.length < 2) {
      return res.status(400).json({ message: "Failed to parse the rules into ASTs." });
    }

    const combinedString = rules.join(' AND ');
    const combinedAST = combine_rules(asts); // Combine the ASTs using the utility function

    const combinedRule = new Rule({ string: combinedString, ast: combinedAST }); // Create a new Rule with the combined AST
    await combinedRule.save(); // Save the combined rule to the database

    res.status(201).json(combinedRule); // Return the newly created combined rule
  } catch (error) {
    console.error("Error combining rules:", error); // Log the error for debugging
    res.status(500).json({ message: "Server Error" }); // Return a generic server error response
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
