import React, { useState, useEffect } from "react";
import RuleInput from "./components/RuleInput";
import RuleList from "./components/RuleList";
import axios from "axios"; // Import axios for API calls
import RuleCombination from './components/RuleCombination';
import RuleEvaluation from './components/RuleEvaluation';

function App() {
  const [rules, setRules] = useState([]); // Store rule objects including strings and ASTs
  const [selectedRules, setSelectedRules] = useState([]); // Track selected rules

  // Fetch rules from the backend
  const fetchRules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rules");
      console.log("API Response:", response.data); // Log the full response

      // Ensure the response contains an array of rule objects
      if (Array.isArray(response.data)) {
        setRules(response.data); // Set the state with the array of rule objects
      } else {
        console.error("Unexpected response structure:", response.data);
      }
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };

  useEffect(() => {
    fetchRules(); // Call the function to fetch rules when the component mounts
  }, []);

  // Function to add a new rule
  const addRule = (rule) => {
    setRules((prevRules) => [...prevRules, rule]); // Ensure you are using previous state for safety
  };

  const evaluate_rule = function (node, userData) {
    if (node.type === "BinaryExpression") {
      const left = node.left.name; // age, department
      const operator = node.operator; // >, ==
      const right = node.right.value; // 30, 'Sales'

      // Evaluate binary expression (e.g., "age > 30")
      switch (operator) {
        case '>':
          return userData[left] > right;
        case '==':
          return userData[left] == right;
        case '===':
          return userData[left] === right;
        case '<':
          return userData[left] < right;
        case '>=':
          return userData[left] >= right;
        case '<=':
          return userData[left] <= right;
        // Add more cases as needed
        default:
          throw new Error(`Unsupported operator: ${operator}`);
      }
    }

    if (node.type === "LogicalExpression") {
      const leftResult = evaluate_rule(node.left, userData);
      const rightResult = evaluate_rule(node.right, userData);

      // Handle logical expressions (AND, OR)
      if (node.operator === '&&') {
        return leftResult && rightResult;
      }
      else if (node.operator === '||') {
        return leftResult || rightResult;
      }
      else {
        throw new Error(`Unsupported logical operator: ${node.operator}`);
      }
    }

    throw new Error(`Unsupported node type: ${node.type}`);
  }

  // Function to evaluate selected rules
  const evaluateRule = (formData) => {
    if (selectedRules.length === 0) {
      alert("Please select a rule to evaluate.");
      return;
    }

    // Retrieve the AST of the selected rule (assuming only one rule is selected for evaluation)
    const selectedRuleAST = selectedRules[0]?.ast;

    if (!selectedRuleAST) {
      alert("Error: Unable to find the AST for the selected rule.");
      return;
    }

    try {
      const evaluationResult = evaluate_rule(selectedRuleAST, formData); // Use the evaluation logic
      alert(`Evaluation result: ${evaluationResult}`);
    } catch (error) {
      console.error("Error evaluating rule:", error);
      alert("Failed to evaluate the rule.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Rule Engine</h1>
      {/* Rule input section */}
      <RuleInput addRule={addRule} />

      {/* List of existing rules */}
      <RuleList
        rules={rules}
        selectedRules={selectedRules}
        setSelectedRules={setSelectedRules}
      />

      {/* Rule combination section */}
      <RuleCombination rules={rules} setRules={setRules} />

      {/* Rule evaluation section */}
      <RuleEvaluation evaluateRule={evaluateRule} ast={selectedRules[0]?.ast} />
      
    </div>
  );
}

export default App;
