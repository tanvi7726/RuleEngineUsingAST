import React, { useState } from "react";
import RuleInput from "./components/RuleInput";
import RuleList from "./components/RuleList";
import RuleCombination from "./components/RuleCombination";
import RuleEvaluation from "./components/RuleEvaluation";

function App() {
  const [rules, setRules] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]); // Track selected rules

  // Function to add a new rule
  const addRule = (rule) => {
    setRules([...rules, rule]);
  };

  // Function to combine selected rules and add them to the list
  const combineRules = (selectedRules) => {
    if (selectedRules.length > 0) {
      const combined = selectedRules.join(" AND ");
      setRules([...rules, combined]); // Add combined rule to the list
      alert(`Combined Rule: ${combined}`);
    } else {
      alert("Please select rules to combine.");
    }
  };

  // Function to evaluate selected rules
  const evaluateRule = (formData) => {
    if (selectedRules.length === 0) {
      alert("Please select rules to evaluate.");
      return;
    }

    // You can later connect this with backend logic for actual evaluation
    console.log("Evaluating selected rules with data:", formData);
    alert("Evaluation result will be displayed here!");
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
      <RuleCombination rules={rules} combineRules={combineRules} />

      {/* Rule evaluation section */}
      <RuleEvaluation evaluateRule={evaluateRule} />
    </div>
  );
}

export default App;
