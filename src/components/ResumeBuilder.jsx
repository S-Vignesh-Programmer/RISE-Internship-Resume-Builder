import React, { useState, useRef } from "react";
import {
  Eye,
  Edit3,
  Download,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import SummaryForm from "./forms/SummaryForm";
import ExperienceForm from "./forms/ExperienceForm";
import EducationForm from "./forms/EducationForm";
import ProjectsForm from "./forms/ProjectsForm";
import SkillsCertificationsForm from "./forms/SkillsForm";
import ResumePreview from "./ResumePreview";
import ProgressSteps from "./ui/ProgressSteps";
import ATSTips from "./ui/ATSTips";
import { generatePDF } from "../utils/pdfGenerator";
import { validateForm } from "../utils/validation";

const ResumeBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const resumeRef = useRef();

  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    website: "",

    // Professional Summary
    summary: "",

    // Experience
    experience: [
      {
        jobTitle: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        responsibilities: [""],
      },
    ],

    // Education
    education: [
      {
        degree: "",
        school: "",
        location: "",
        graduationDate: "",
        gpa: "",
      },
    ],

    // Projects
    projects: [
      {
        name: "",
        duration: "",
        url: "",
        description: "",
        features: [""],
        technologies: [""],
      },
    ],

    // Skills
    skills: [""],

    // Certifications
    certifications: [
      {
        name: "",
        issuer: "",
        date: "",
      },
    ],
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (section, index, field, value) => {
    setFormData((prev) => {
      if (
        section === "experience" ||
        section === "education" ||
        section === "certifications" ||
        section === "projects"
      ) {
        const newArray = [...prev[section]];
        if (field === "responsibilities" && section === "experience") {
          newArray[index][field] = value;
        } else {
          newArray[index][field] = value;
        }
        return { ...prev, [section]: newArray };
      } else if (section === "skills") {
        const newSkills = [...prev.skills];
        newSkills[index] = value;
        return { ...prev, skills: newSkills };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const addItem = (section) => {
    setFormData((prev) => {
      const newArray = [...prev[section]];
      if (section === "experience") {
        newArray.push({
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          current: false,
          responsibilities: [""],
        });
      } else if (section === "education") {
        newArray.push({
          degree: "",
          school: "",
          location: "",
          graduationDate: "",
          gpa: "",
        });
      } else if (section === "projects") {
        newArray.push({
          name: "",
          duration: "",
          url: "",
          description: "",
          features: [""],
          technologies: [""],
        });
      } else if (section === "certifications") {
        newArray.push({
          name: "",
          issuer: "",
          date: "",
        });
      } else if (section === "skills") {
        newArray.push("");
      }
      return { ...prev, [section]: newArray };
    });
  };

  const removeItem = (section, index) => {
    setFormData((prev) => {
      const newArray = [...prev[section]];
      newArray.splice(index, 1);
      return { ...prev, [section]: newArray };
    });
  };

  const addResponsibility = (expIndex) => {
    setFormData((prev) => {
      const newExp = [...prev.experience];
      newExp[expIndex].responsibilities.push("");
      return { ...prev, experience: newExp };
    });
  };

  const removeResponsibility = (expIndex, respIndex) => {
    setFormData((prev) => {
      const newExp = [...prev.experience];
      newExp[expIndex].responsibilities.splice(respIndex, 1);
      return { ...prev, experience: newExp };
    });
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    setFormData((prev) => {
      const newExp = [...prev.experience];
      newExp[expIndex].responsibilities[respIndex] = value;
      return { ...prev, experience: newExp };
    });
  };

  const addProjectTech = (projectIndex, type) => {
    setFormData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[projectIndex][type].push("");
      return { ...prev, projects: newProjects };
    });
  };

  const removeProjectTech = (projectIndex, techIndex, type) => {
    setFormData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[projectIndex][type].splice(techIndex, 1);
      return { ...prev, projects: newProjects };
    });
  };

  const handleProjectTechChange = (projectIndex, techIndex, value, type) => {
    setFormData((prev) => {
      const newProjects = [...prev.projects];
      newProjects[projectIndex][type][techIndex] = value;
      return { ...prev, projects: newProjects };
    });
  };

  const handleGeneratePDF = async () => {
    const validation = validateForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) return;

    await generatePDF(formData);
  };

  const steps = [
    "Personal Info",
    "Summary",
    "Education",
    "Experience",
    "Projects",
    "Skills & Certifications",
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      setMobileMenuOpen(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setMobileMenuOpen(false);
    }
  };

  const handlePreview = () => {
    const validation = validateForm(formData);
    setErrors(validation.errors);
    if (validation.isValid) {
      setPreviewMode(true);
      setMobileMenuOpen(false);
    }
  };

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-5xl mx-auto p-3 sm:p-6">
          {/* Preview Header */}
          <div className="bg-white rounded-xl shadow-lg mb-6 p-4 sm:p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Resume Preview
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Review your resume and download when ready
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setPreviewMode(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  <Edit3 size={18} />
                  <span className="sm:inline">Edit Resume</span>
                </button>
                <button
                  onClick={handleGeneratePDF}
                  className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg"
                >
                  <Download size={18} />
                  <span className="sm:inline">Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <ResumePreview formData={formData} ref={resumeRef} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-5xl mx-auto p-3 sm:p-6">
        {/* Main Header */}
        <div className="bg-white rounded-xl shadow-lg mb-6 p-4 sm:p-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                ATS Resume Builder
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                Build your professional resume with ATS optimization
              </p>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="sm:hidden flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <button
                onClick={handlePreview}
                className="flex items-center justify-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg flex-1 sm:flex-none"
              >
                <Eye size={18} />
                <span className="hidden sm:inline">Preview & Download</span>
                <span className="sm:hidden">Preview</span>
              </button>
            </div>
          </div>

          {/* Desktop Progress Steps */}
          <div className="hidden sm:block">
            <ProgressSteps
              steps={steps}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>

          {/* Mobile Progress Steps */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-700">
                Step {currentStep} of {steps.length}
              </div>
              <div className="text-sm text-gray-500">
                {steps[currentStep - 1]}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Navigation
                  </h2>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-2">
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentStep(index + 1);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        currentStep === index + 1
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                            currentStep === index + 1
                              ? "bg-white text-blue-600"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                        {step}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100">
          <div className="min-h-[400px]">
            {currentStep === 1 && (
              <PersonalInfoForm
                formData={formData}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <SummaryForm
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}

            {currentStep === 3 && (
              <EducationForm
                formData={formData}
                handleInputChange={handleInputChange}
                addItem={addItem}
                removeItem={removeItem}
              />
            )}

            {currentStep === 4 && (
              <ExperienceForm
                formData={formData}
                handleInputChange={handleInputChange}
                addItem={addItem}
                removeItem={removeItem}
                addResponsibility={addResponsibility}
                removeResponsibility={removeResponsibility}
                handleResponsibilityChange={handleResponsibilityChange}
              />
            )}

            {currentStep === 5 && (
              <ProjectsForm
                formData={formData}
                handleInputChange={handleInputChange}
                addItem={addItem}
                removeItem={removeItem}
                addProjectTech={addProjectTech}
                removeProjectTech={removeProjectTech}
                handleProjectTechChange={handleProjectTechChange}
              />
            )}

            {currentStep === 6 && (
              <SkillsCertificationsForm
                formData={formData}
                handleInputChange={handleInputChange}
                addItem={addItem}
                removeItem={removeItem}
              />
            )}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <ChevronLeft size={18} />
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex space-x-1">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index + 1 === currentStep
                        ? "bg-blue-600"
                        : index + 1 < currentStep
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="sm:hidden text-sm text-gray-500">
                {currentStep}/{steps.length}
              </div>
            </div>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length}
              className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-all duration-200 ${
                currentStep === steps.length
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ATS Tips */}
        <div className="mt-6">
          <ATSTips />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
