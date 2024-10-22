import React, { useState } from "react";

const RuleCombination = ({ rules, combineRules }) => {
  const [selectedRules, setSelectedRules] = useState([]);

  const handleSelectRule = (rule) => {
    setSelectedRules((prevSelected) =>
      prevSelected.includes(rule)
        ? prevSelected.filter((r) => r !== rule)
        : [...prevSelected, rule]
    );
  };

  const handleCombineRules = () => {
    combineRules(selectedRules);
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-xl font-bold mb-4">Combine Rules</h2>
      <ul className="list-disc pl-5 mb-4">
        {rules.map((rule, index) => (
          <li key={index}>
            <label>
              <input
                type="checkbox"
                value={rule}
                onChange={() => handleSelectRule(rule)}
                className="mr-2"
              />
              {rule}
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
