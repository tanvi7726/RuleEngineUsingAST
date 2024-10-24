import React from "react";

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
      <h2 className="text-xl font-bold mb-4">Existing Rules</h2>
      {rules.length === 0 ? (
        <p>No rules available</p>
      ) : (
        <ul className="list-disc pl-5">
          {rules.map((rule) => (
            <li key={rule._id} className="mb-2 flex items-center">
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handleSelectionChange(rule)}
                  checked={selectedRules.includes(rule)}
                />
                {typeof rule === 'object' ? rule.string : rule} {/* Display the rule string */}
              </label>
            </li>
          ))}
          {console.log(rules)}
        </ul>
      )}
    </div>
  );
};

export default RuleList;
