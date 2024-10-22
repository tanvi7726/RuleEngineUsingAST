import React, { useState } from "react";

const RuleInput = ({ addRule }) => {
  const [rule, setRule] = useState("");

  const handleAddRule = () => {
    if (rule.trim()) {
      addRule(rule);
      setRule(""); // Clear input after adding rule
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
