import React from "react";

const SummaryForm = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
        Professional Summary
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          value={formData.summary}
          onChange={(e) =>
            handleInputChange(null, null, "summary", e.target.value)
          }
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
          placeholder="Write a brief professional summary highlighting your key skills, experience, and career objectives..."
        />
        <p className="text-sm text-gray-500 mt-1">
          2-3 sentences highlighting your most relevant qualifications and
          career goals.
        </p>
      </div>
    </div>
  );
};

export default SummaryForm;
