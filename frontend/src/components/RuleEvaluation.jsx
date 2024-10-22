import React, { useState } from "react";

const RuleEvaluation = ({ evaluateRule }) => {
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

  return (
    <div className="p-4 mt-6">
      <h2 className="text-xl font-semibold mb-4">Evaluate Rule</h2>
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
        onClick={() => evaluateRule(formData)}
      >
        Evaluate Selected Rules
      </button>
    </div>
  );
};

export default RuleEvaluation;
