import React from "react";
import { Code, Plus, X } from "lucide-react";

const ProjectsForm = ({
  formData,
  handleInputChange,
  addItem,
  removeItem,
  addProjectTech,
  removeProjectTech,
  handleProjectTechChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Code size={24} />
          Projects
        </h2>
        <button
          onClick={() => addItem("projects")}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {formData.projects.map((project, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg p-6 bg-gray-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Project {index + 1}
            </h3>
            {formData.projects.length > 1 && (
              <button
                onClick={() => removeItem("projects", index)}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
              >
                <X size={16} />
                Remove
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={project.name}
                onChange={(e) =>
                  handleInputChange("projects", index, "name", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="E-Commerce Platform"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={project.duration}
                onChange={(e) =>
                  handleInputChange(
                    "projects",
                    index,
                    "duration",
                    e.target.value
                  )
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="3 months"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project URL (Optional)
              </label>
              <input
                type="url"
                value={project.url}
                onChange={(e) =>
                  handleInputChange("projects", index, "url", e.target.value)
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                handleInputChange(
                  "projects",
                  index,
                  "description",
                  e.target.value
                )
              }
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="Brief description of the project, its purpose, and your role..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Key Features & Achievements
            </label>
            {project.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) =>
                    handleProjectTechChange(
                      index,
                      featureIndex,
                      e.target.value,
                      "features"
                    )
                  }
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Implemented user authentication and authorization..."
                />
                <button
                  onClick={() =>
                    removeProjectTech(index, featureIndex, "features")
                  }
                  disabled={project.features.length === 1}
                  className="px-3 py-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addProjectTech(index, "features")}
              className="mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Add Feature
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies Used
            </label>
            {project.technologies.map((tech, techIndex) => (
              <div key={techIndex} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) =>
                    handleProjectTechChange(
                      index,
                      techIndex,
                      e.target.value,
                      "technologies"
                    )
                  }
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="React, Node.js, MongoDB..."
                />
                <button
                  onClick={() =>
                    removeProjectTech(index, techIndex, "technologies")
                  }
                  disabled={project.technologies.length === 1}
                  className="px-3 py-2 text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
            <button
              onClick={() => addProjectTech(index, "technologies")}
              className="mt-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Add Technology
            </button>
          </div>
        </div>
      ))}

      <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-lg">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">Project Tips</h3>
            <div className="mt-2 text-sm text-amber-700">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Focus on projects that demonstrate relevant skills for your
                  target role
                </li>
                <li>Include quantifiable results and impact where possible</li>
                <li>Mention specific technologies and frameworks used</li>
                <li>
                  Highlight your individual contributions in team projects
                </li>
                <li>Include links to live demos or GitHub repositories</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsForm;
