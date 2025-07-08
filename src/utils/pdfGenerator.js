export const generatePDF = async (formData) => {
  try {
    // Create a print-friendly HTML version that can be saved as PDF
    const printWindow = window.open("", "_blank");

    const resumeHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Resume - ${formData.fullName || "Resume"}</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            line-height: 1.4; 
            color: #333;
            background: white;
          }
          .header { 
            text-align: center; 
            margin-bottom: 20px; 
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .name { 
            font-size: 24px; 
            font-weight: bold; 
            margin-bottom: 5px; 
          }
          .contact { 
            font-size: 12px; 
            color: #666; 
          }
          .section { 
            margin-bottom: 20px; 
          }
          .section-title { 
            font-size: 14px; 
            font-weight: bold; 
            text-transform: uppercase; 
            border-bottom: 1px solid #333; 
            margin-bottom: 10px; 
            padding-bottom: 2px;
          }
          .job-title { 
            font-weight: bold; 
            font-size: 12px; 
          }
          .company { 
            font-size: 11px; 
            color: #666; 
          }
          .date { 
            font-size: 10px; 
            color: #666; 
            font-style: italic; 
          }
          .responsibility { 
            margin-left: 15px; 
            font-size: 11px; 
            margin-bottom: 3px; 
          }
          .education-item, .project-item, .cert-item { 
            margin-bottom: 10px; 
            font-size: 11px; 
          }
          .skills { 
            font-size: 11px; 
          }
          .instructions {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #f0f0f0;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          }
          @media print {
            body { margin: 0; }
            .header { page-break-after: avoid; }
            .section { page-break-inside: avoid; }
            .instructions { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="instructions">
          <strong>To save as PDF:</strong><br>
          Press Ctrl+P (or Cmd+P on Mac)<br>
          Select "Save as PDF" as destination<br>
          Click Save
        </div>
        
        <div class="header">
          <div class="name">${formData.fullName || "Your Name"}</div>
          <div class="contact">
            ${[
              formData.email,
              formData.phone,
              formData.address,
              formData.linkedIn,
              formData.website,
            ]
              .filter(Boolean)
              .join(" | ")}
          </div>
        </div>

        ${
          formData.summary && formData.summary.trim()
            ? `
          <div class="section">
            <div class="section-title">Professional Summary</div>
            <div>${formData.summary}</div>
          </div>
        `
            : ""
        }

        ${
          formData.experience &&
          formData.experience.some((exp) => exp.jobTitle && exp.jobTitle.trim())
            ? `
          <div class="section">
            <div class="section-title">Professional Experience</div>
            ${formData.experience
              .map((exp) => {
                if (!exp.jobTitle || !exp.jobTitle.trim()) return "";
                return `
                <div style="margin-bottom: 15px;">
                  <div class="job-title">${exp.jobTitle}</div>
                  <div class="company">${[exp.company, exp.location]
                    .filter(Boolean)
                    .join(", ")}</div>
                  <div class="date">${
                    exp.current
                      ? `${exp.startDate || ""} - Present`
                      : `${exp.startDate || ""} - ${exp.endDate || ""}`
                  }</div>
                  ${
                    exp.responsibilities && exp.responsibilities.length > 0
                      ? exp.responsibilities
                          .map((resp) =>
                            resp && resp.trim()
                              ? `<div class="responsibility">• ${resp}</div>`
                              : ""
                          )
                          .join("")
                      : ""
                  }
                </div>
              `;
              })
              .join("")}
          </div>
        `
            : ""
        }

        ${
          formData.projects &&
          formData.projects.some((proj) => proj.name && proj.name.trim())
            ? `
          <div class="section">
            <div class="section-title">Projects</div>
            ${formData.projects
              .map((proj) => {
                if (!proj.name || !proj.name.trim()) return "";
                return `
                <div class="project-item">
                  <div class="job-title">${proj.name}</div>
                  ${
                    proj.duration
                      ? `<div class="date">${proj.duration}</div>`
                      : ""
                  }
                  ${proj.url ? `<div class="company">${proj.url}</div>` : ""}
                  ${proj.description ? `<div>${proj.description}</div>` : ""}
                  ${
                    proj.features && proj.features.length > 0
                      ? proj.features
                          .map((feature) =>
                            feature && feature.trim()
                              ? `<div class="responsibility">• ${feature}</div>`
                              : ""
                          )
                          .join("")
                      : ""
                  }
                  ${
                    proj.technologies && proj.technologies.length > 0
                      ? `<div class="company">Technologies: ${proj.technologies
                          .filter((tech) => tech && tech.trim())
                          .join(", ")}</div>`
                      : ""
                  }
                </div>
              `;
              })
              .join("")}
          </div>
        `
            : ""
        }

        ${
          formData.education &&
          formData.education.some((edu) => edu.degree && edu.degree.trim())
            ? `
          <div class="section">
            <div class="section-title">Education</div>
            ${formData.education
              .map((edu) => {
                if (!edu.degree || !edu.degree.trim()) return "";
                return `
                <div class="education-item">
                  <div class="job-title">${[edu.degree, edu.school]
                    .filter(Boolean)
                    .join(", ")}</div>
                  <div class="company">${[
                    edu.location,
                    edu.graduationDate,
                    edu.gpa ? `GPA: ${edu.gpa}` : "",
                  ]
                    .filter(Boolean)
                    .join(" | ")}</div>
                </div>
              `;
              })
              .join("")}
          </div>
        `
            : ""
        }

        ${
          formData.skills &&
          formData.skills.some((skill) => skill && skill.trim())
            ? `
          <div class="section">
            <div class="section-title">Technical Skills</div>
            <div class="skills">${formData.skills
              .filter((skill) => skill && skill.trim())
              .join(", ")}</div>
          </div>
        `
            : ""
        }

        ${
          formData.certifications &&
          formData.certifications.some((cert) => cert.name && cert.name.trim())
            ? `
          <div class="section">
            <div class="section-title">Certifications</div>
            ${formData.certifications
              .map((cert) => {
                if (!cert.name || !cert.name.trim()) return "";
                return `
                <div class="cert-item">
                  ${[cert.name, cert.issuer, cert.date]
                    .filter(Boolean)
                    .join(" - ")}
                </div>
              `;
              })
              .join("")}
          </div>
        `
            : ""
        }

        <script>
          // Auto-trigger print dialog after a short delay
          setTimeout(() => {
            window.print();
          }, 1000);
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(resumeHTML);
    printWindow.document.close();
  } catch (error) {
    console.error("PDF generation error:", error);

    // Fallback: create a simple text version
    const textContent = `
RESUME - ${formData.fullName || "Your Name"}
${[
  formData.email,
  formData.phone,
  formData.address,
  formData.linkedIn,
  formData.website,
]
  .filter(Boolean)
  .join(" | ")}

${formData.summary ? `PROFESSIONAL SUMMARY\n${formData.summary}\n\n` : ""}

${
  formData.experience &&
  formData.experience.some((exp) => exp.jobTitle && exp.jobTitle.trim())
    ? `PROFESSIONAL EXPERIENCE\n${formData.experience
        .map((exp) => {
          if (!exp.jobTitle || !exp.jobTitle.trim()) return "";
          return `${exp.jobTitle}\n${[exp.company, exp.location]
            .filter(Boolean)
            .join(", ")}\n${
            exp.current
              ? `${exp.startDate || ""} - Present`
              : `${exp.startDate || ""} - ${exp.endDate || ""}`
          }\n${
            exp.responsibilities && exp.responsibilities.length > 0
              ? exp.responsibilities
                  .map((resp) => (resp && resp.trim() ? `• ${resp}` : ""))
                  .join("\n")
              : ""
          }\n`;
        })
        .join("\n")}\n`
    : ""
}

${
  formData.education &&
  formData.education.some((edu) => edu.degree && edu.degree.trim())
    ? `EDUCATION\n${formData.education
        .map((edu) => {
          if (!edu.degree || !edu.degree.trim()) return "";
          return `${[edu.degree, edu.school].filter(Boolean).join(", ")}\n${[
            edu.location,
            edu.graduationDate,
            edu.gpa ? `GPA: ${edu.gpa}` : "",
          ]
            .filter(Boolean)
            .join(" | ")}\n`;
        })
        .join("\n")}\n`
    : ""
}

${
  formData.skills && formData.skills.some((skill) => skill && skill.trim())
    ? `TECHNICAL SKILLS\n${formData.skills
        .filter((skill) => skill && skill.trim())
        .join(", ")}\n\n`
    : ""
}

${
  formData.certifications &&
  formData.certifications.some((cert) => cert.name && cert.name.trim())
    ? `CERTIFICATIONS\n${formData.certifications
        .map((cert) => {
          if (!cert.name || !cert.name.trim()) return "";
          return [cert.name, cert.issuer, cert.date]
            .filter(Boolean)
            .join(" - ");
        })
        .join("\n")}\n`
    : ""
}
    `;

    // Create a blob and download as text file
    const blob = new Blob([textContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${
      formData.fullName ? formData.fullName.replace(/\s+/g, "_") : "Resume"
    }_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};
