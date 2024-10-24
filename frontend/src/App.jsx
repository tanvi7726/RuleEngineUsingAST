import React, { useState, useEffect } from "react";
import RuleInput from "./components/RuleInput";
import RuleList from "./components/RuleList";
import axios from "axios"; // Import axios for API calls

function App() {
  const [rules, setRules] = useState([]); // Store rule strings
  const [selectedRules, setSelectedRules] = useState([]); // Track selected rules

  // Fetch rules from the backend
  const fetchRules = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rules");
      console.log("API Response:", response.data); // Log the full response

      // Ensure the response contains an array of rule objects
      if (Array.isArray(response.data)) {
        const rulesStrings = response.data; // Extract the 'string' property from each rule object
        setRules(rulesStrings); // Set the state with the array of strings
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

  // Function to combine selected rules and add them to the list
  const combineRules = (selectedRules) => {
    if (selectedRules.length > 0) {
      const combined = selectedRules.join(" AND "); // Combine rule strings
      setRules((prevRules) => [...prevRules, combined]); // Add combined rule as a string
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
      {/* Uncomment and implement if needed */}
      {/* <RuleCombination rules={rules} combineRules={combineRules} /> */}

      {/* Rule evaluation section */}
      {/* Uncomment and implement if needed */}
      {/* <RuleEvaluation evaluateRule={evaluateRule} /> */}
    </div>
  );
}

export default App;
