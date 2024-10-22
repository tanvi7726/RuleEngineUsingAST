import React, { useState } from "react";

const RuleList = ({ rules, selectedRules, setSelectedRules }) => {
  // Toggle a rule's selection status
  const handleSelectionChange = (rule) => {
    if (selectedRules.includes(rule)) {
      // If already selected, remove it from the list
      setSelectedRules(selectedRules.filter((r) => r !== rule));
    } else {
      // Otherwise, add it to the selected list
      setSelectedRules([...selectedRules, rule]);
    }
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">Existing Rules</h2>
      <ul className="list-disc pl-5">
        {rules.map((rule, index) => (
          <li key={index} className="mb-2 flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              onChange={() => handleSelectionChange(rule)}
              checked={selectedRules.includes(rule)}
            />
            <span>{rule}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RuleList;
