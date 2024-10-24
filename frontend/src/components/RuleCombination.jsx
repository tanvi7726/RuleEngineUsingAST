import React, { useState } from "react";
import axios from "axios"; // Import axios for API calls

const RuleCombination = ({ rules, setRules }) => {
  const [selectedRules, setSelectedRules] = useState([]);

  // Handle selecting and unselecting rules
  const handleSelectRule = (ruleString) => {
    setSelectedRules((prevSelected) =>
      prevSelected.includes(ruleString)
        ? prevSelected.filter((str) => str !== ruleString)
        : [...prevSelected, ruleString]
    );
  };

  // Call the combineRules function with the selected rules
  const handleCombineRules = async () => {
    if (selectedRules.length < 2) {
      alert("Please select at least two rules to combine.");
      return;
    }
    console.log(selectedRules);
    try {
      const response = await axios.post("http://localhost:5000/api/rules/combine", {
        rules: selectedRules, // Send the array of rule strings
      });
      setRules((prevRules) => [...prevRules, response.data]); // Update the rules state with the new combined rule
      alert("Rules combined successfully!");
      setSelectedRules([]); // Reset the selected rules
    } catch (error) {
      console.error("Error combining rules:", error);
      alert("Failed to combine rules. Please try again.");
    }
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-4">Combine Rules</h2>
      <ul className="list-disc pl-5 mb-4">
        {rules.map((rule) => (
          <li key={rule._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedRules.includes(rule.string)} // Check if the rule string is selected
                onChange={() => handleSelectRule(rule.string)} // Use rule string for selection
                className="mr-2"
              />
              {rule.string} {/* Display the rule string */}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCombineRules}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Combine Selected Rules
      </button>
    </div>
  );
};

export default RuleCombination;
