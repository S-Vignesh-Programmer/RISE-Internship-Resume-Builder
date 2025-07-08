import React from "react";
import { GraduationCap } from "lucide-react";

const EducationForm = ({
  formData,
  handleInputChange,
  addItem,
  removeItem,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
          <GraduationCap size={24} />
          Education
        </h2>
        <button
          onClick={() => addItem("education")}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full sm:w-auto"
        >
          Add Education
        </button>
      </div>

      {formData.education.map((edu, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
            <h3 className="text-lg font-semibold">Education {index + 1}</h3>
            {formData.education.length > 1 && (
              <button
                onClick={() => removeItem("education", index)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree
              </label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  handleInputChange(
                    "education",
                    index,
                    "degree",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School/University
              </label>
              <input
                type="text"
                value={edu.school}
                onChange={(e) =>
                  handleInputChange(
                    "education",
                    index,
                    "school",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="University of California"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                value={edu.location}
                onChange={(e) =>
                  handleInputChange(
                    "education",
                    index,
                    "location",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Berkeley, CA"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Graduation Date
              </label>
              <input
                type="text"
                value={edu.graduationDate}
                onChange={(e) =>
                  handleInputChange(
                    "education",
                    index,
                    "graduationDate",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="May 2020"
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                GPA (Optional)
              </label>
              <input
                type="text"
                value={edu.gpa}
                onChange={(e) =>
                  handleInputChange("education", index, "gpa", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="3.8"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
