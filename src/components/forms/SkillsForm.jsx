import React from "react";
import { Award } from "lucide-react";

const SkillsCertificationsForm = ({
  formData,
  handleInputChange,
  addItem,
  removeItem,
}) => {
  return (
    <div className="space-y-8">
      {/* Skills Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Technical Skills</h2>
          <button
            onClick={() => addItem("skills")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Skill
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  handleInputChange("skills", index, null, e.target.value)
                }
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="JavaScript, Python, React..."
              />
              {formData.skills.length > 1 && (
                <button
                  onClick={() => removeItem("skills", index)}
                  className="px-3 py-2 text-red-600 hover:text-red-800 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          List your technical skills, programming languages, tools, and
          technologies.
        </p>
      </div>

      {/* Certifications Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Award size={24} />
            Certifications
          </h2>
          <button
            onClick={() => addItem("certifications")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Add Certification
          </button>
        </div>

        {formData.certifications.map((cert, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Certification {index + 1}
              </h3>
              {formData.certifications.length > 1 && (
                <button
                  onClick={() => removeItem("certifications", index)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) =>
                    handleInputChange(
                      "certifications",
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="AWS Certified Solutions Architect"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) =>
                    handleInputChange(
                      "certifications",
                      index,
                      "issuer",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Amazon Web Services"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date Obtained
                </label>
                <input
                  type="text"
                  value={cert.date}
                  onChange={(e) =>
                    handleInputChange(
                      "certifications",
                      index,
                      "date",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="March 2023"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCertificationsForm;
