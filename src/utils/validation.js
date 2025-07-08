export const validateForm = (formData) => {
  const errors = {};

  // Personal Information Validation
  if (!formData.fullName || !formData.fullName.trim()) {
    errors.fullName = "Full name is required";
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!formData.phone || !formData.phone.trim()) {
    errors.phone = "Phone number is required";
  } else if (
    !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ""))
  ) {
    // Basic phone validation - allows international formats
    if (formData.phone.replace(/[\s\-\(\)]/g, "").length < 10) {
      errors.phone = "Phone number must be at least 10 digits";
    }
  }

  // URL Validation for LinkedIn and Website
  if (formData.linkedIn && formData.linkedIn.trim()) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(formData.linkedIn.trim())) {
      errors.linkedIn = "Please enter a valid LinkedIn URL";
    }
  }

  if (formData.website && formData.website.trim()) {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlPattern.test(formData.website.trim())) {
      errors.website = "Please enter a valid website URL";
    }
  }

  // Experience Validation
  if (formData.experience && formData.experience.length > 0) {
    formData.experience.forEach((exp, index) => {
      if (exp.jobTitle && exp.jobTitle.trim()) {
        if (!exp.company || !exp.company.trim()) {
          errors[`experience_${index}_company`] =
            "Company name is required when job title is provided";
        }
        if (!exp.startDate || !exp.startDate.trim()) {
          errors[`experience_${index}_startDate`] =
            "Start date is required when job title is provided";
        }
        if (!exp.current && (!exp.endDate || !exp.endDate.trim())) {
          errors[`experience_${index}_endDate`] =
            "End date is required when not currently employed";
        }
      }
    });
  }

  // Education Validation
  if (formData.education && formData.education.length > 0) {
    formData.education.forEach((edu, index) => {
      if (edu.degree && edu.degree.trim()) {
        if (!edu.school || !edu.school.trim()) {
          errors[`education_${index}_school`] =
            "School name is required when degree is provided";
        }
      }
    });
  }

  // GPA Validation
  if (formData.education && formData.education.length > 0) {
    formData.education.forEach((edu, index) => {
      if (edu.gpa && edu.gpa.trim()) {
        const gpaValue = parseFloat(edu.gpa);
        if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 10.0) {
          errors[`education_${index}_gpa`] =
            "GPA must be a number between 0.0 and 4.0";
        }
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateStep = (formData, step) => {
  const errors = {};

  switch (step) {
    case 1: // Personal Information
      if (!formData.fullName || !formData.fullName.trim()) {
        errors.fullName = "Full name is required";
      }
      if (!formData.email || !formData.email.trim()) {
        errors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = "Please enter a valid email address";
      }
      if (!formData.phone || !formData.phone.trim()) {
        errors.phone = "Phone number is required";
      }
      break;

    case 3: // Experience
      if (formData.experience && formData.experience.length > 0) {
        formData.experience.forEach((exp, index) => {
          if (exp.jobTitle && exp.jobTitle.trim()) {
            if (!exp.company || !exp.company.trim()) {
              errors[`experience_${index}_company`] =
                "Company name is required";
            }
            if (!exp.startDate || !exp.startDate.trim()) {
              errors[`experience_${index}_startDate`] =
                "Start date is required";
            }
            if (!exp.current && (!exp.endDate || !exp.endDate.trim())) {
              errors[`experience_${index}_endDate`] = "End date is required";
            }
          }
        });
      }
      break;

    case 4: // Education
      if (formData.education && formData.education.length > 0) {
        formData.education.forEach((edu, index) => {
          if (edu.degree && edu.degree.trim()) {
            if (!edu.school || !edu.school.trim()) {
              errors[`education_${index}_school`] = "School name is required";
            }
          }
        });
      }
      break;

    default:
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
