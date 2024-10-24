import React, { useState } from "react";
import axios from "axios";

const RuleInput = ({ addRule }) => {
  const [rule, setRule] = useState("");

  const handleAddRule = async () => {
    if (rule.trim()) {
      try {
        const response = await axios.post("http://localhost:5000/api/rules/create", {
          string: rule
        });

        if (response.data) {
          addRule(response.data);
          setRule(""); // Clear the input after successfully adding rule
        }
      } catch (error) {
        console.error("Error adding rule:", error);
        alert("Failed to add rule. Please try again.");
      }
    } else {
      alert("Please enter a valid rule");
    }
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-4">Create a Rule</h2>
      <input
        type="text"
        value={rule}
        onChange={(e) => setRule(e.target.value)}
        placeholder="Enter rule (e.g., age > 30 AND salary > 50000)"
        className="border-2 border-gray-300 p-2 rounded w-full mb-4"
      />
      <button
        onClick={handleAddRule}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Rule
      </button>
    </div>
  );
};

export default RuleInput;
