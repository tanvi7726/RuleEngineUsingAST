const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
  string: {
    type: String,
    required: true,
  },
  ast: {
    type: Object, // Adjust this type based on your AST structure
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Rule = mongoose.model("Rule", ruleSchema);

module.exports = Rule;
