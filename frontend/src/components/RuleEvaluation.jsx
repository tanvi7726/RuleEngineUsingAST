import React, { useState } from "react";

const RuleEvaluation = ({ ast, evaluateRule }) => {
  const [formData, setFormData] = useState({
    age: "",
    department: "",
    salary: "",
    experience: ""
  });

  // Handle input changes for form data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Function to evaluate the rule using the user data and the AST
  const handleEvaluate = () => {
    try {
      const result = evaluateRule(formData); // Only pass formData now
    } catch (error) {
      console.error("Error evaluating rule:", error);
      alert("Failed to evaluate the rule.");
    }
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="text-xl font-bold mb-4">Evaluate Rule</h2>
      <div className="grid gap-4">
        <input
          type="text"
          name="age"
          placeholder="Age"
          className="p-2 border rounded"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="department"
          placeholder="Department"
          className="p-2 border rounded"
          value={formData.department}
          onChange={handleChange}
        />
        <input
          type="text"
          name="salary"
          placeholder="Salary"
          className="p-2 border rounded"
          value={formData.salary}
          onChange={handleChange}
        />
        <input
          type="text"
          name="experience"
          placeholder="Experience"
          className="p-2 border rounded"
          value={formData.experience}
          onChange={handleChange}
        />
      </div>
      <button
        className="mt-4 bg-blue-500 text-white p-2 rounded"
        onClick={handleEvaluate} // Call handleEvaluate on button click
      >
        Evaluate Selected Rule
      </button>
    </div>
  );
};

export default RuleEvaluation;
