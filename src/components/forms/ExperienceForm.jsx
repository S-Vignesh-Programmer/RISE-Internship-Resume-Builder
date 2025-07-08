import React from "react";
import { Building } from "lucide-react";

const ExperienceForm = ({
  formData,
  handleInputChange,
  addItem,
  removeItem,
  addResponsibility,
  removeResponsibility,
  handleResponsibilityChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Building size={24} />
          Professional Experience
        </h2>
        <button
          onClick={() => addItem("experience")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto"
        >
          Add Experience
        </button>
      </div>

      {formData.experience.map((exp, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
            {formData.experience.length > 1 && (
              <button
                onClick={() => removeItem("experience", index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                value={exp.jobTitle}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    index,
                    "jobTitle",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Software Engineer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    index,
                    "company",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tech Company Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    index,
                    "location",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="San Francisco, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    index,
                    "startDate",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="January 2022"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) =>
                  handleInputChange(
                    "experience",
                    index,
                    "endDate",
                    e.target.value
                  )
                }
                disabled={exp.current}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                placeholder="Present"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id={`current-${index}`}
                checked={exp.current}
                onChange={(e) => {
                  handleInputChange(
                    "experience",
                    index,
                    "current",
                    e.target.checked
                  );
                  if (e.target.checked) {
                    handleInputChange("experience", index, "endDate", "");
                  }
                }}
                className="mr-2"
              />
              <label
                htmlFor={`current-${index}`}
                className="text-sm text-gray-700"
              >
                Currently working here
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Responsibilities & Achievements
            </label>
            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) =>
                    handleResponsibilityChange(index, respIndex, e.target.value)
                  }
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your key responsibility or achievement..."
                />
                <button
                  onClick={() => removeResponsibility(index, respIndex)}
                  disabled={exp.responsibilities.length === 1}
                  className="px-3 py-2 text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => addResponsibility(index)}
              className="mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 w-full sm:w-auto"
            >
              Add Responsibility
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
