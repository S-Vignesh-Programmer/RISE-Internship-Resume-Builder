import React, { forwardRef } from "react";
import {
  ExternalLink,
  Mail,
  Linkedin,
  Github,
  Globe,
  MapPin,
  Phone,
} from "lucide-react";

const ResumePreview = forwardRef(({ formData }, ref) => {
  // Helper function to format URLs
  const formatUrl = (url) => {
    if (!url) return url;
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  // Helper function to check if a string is an email
  const isEmail = (str) => {
    return str && str.includes("@") && str.includes(".");
  };

  // Helper function to check if a string is a URL
  const isUrl = (str) => {
    return (
      str &&
      (str.includes("www.") ||
        str.includes("http") ||
        str.includes(".com") ||
        str.includes(".org") ||
        str.includes(".net") ||
        str.includes(".io") ||
        str.includes(".dev"))
    );
  };

  // Helper function to render contact info with appropriate links and icons
  const renderContactInfo = (info, type) => {
    if (!info) return null;

    const getIcon = (type) => {
      switch (type) {
        case "email":
          return <Mail size={14} />;
        case "phone":
          return <Phone size={14} />;
        case "address":
          return <MapPin size={14} />;
        case "linkedin":
          return <Linkedin size={14} />;
        case "github":
          return <Github size={14} />;
        case "website":
          return <Globe size={14} />;
        default:
          return null;
      }
    };

    if (type === "email" || isEmail(info)) {
      return (
        <a
          href={`mailto:${info}`}
          className="hover:text-blue-600 hover:underline transition-colors cursor-pointer flex items-center gap-1"
        >
          {getIcon("email")}
          {info}
        </a>
      );
    } else if (type === "linkedin" || info.toLowerCase().includes("linkedin")) {
      return (
        <a
          href={formatUrl(info)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline transition-colors cursor-pointer flex items-center gap-1"
        >
          {getIcon("linkedin")}
          {info}
        </a>
      );
    } else if (type === "github" || info.toLowerCase().includes("github")) {
      return (
        <a
          href={formatUrl(info)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline transition-colors cursor-pointer flex items-center gap-1"
        >
          {getIcon("github")}
          {info}
        </a>
      );
    } else if (type === "website" || isUrl(info)) {
      return (
        <a
          href={formatUrl(info)}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 hover:underline transition-colors cursor-pointer flex items-center gap-1"
        >
          {getIcon("website")}
          {info}
        </a>
      );
    } else if (type === "phone") {
      return (
        <span className="flex items-center gap-1">
          {getIcon("phone")}
          {info}
        </span>
      );
    } else if (type === "address") {
      return (
        <span className="flex items-center gap-1">
          {getIcon("address")}
          {info}
        </span>
      );
    }

    return <span>{info}</span>;
  };

  // Sample data for preview
  const sampleData = {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    address: "New York, NY",
    linkedIn: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    website: "www.johndoe.com",
    summary:
      "Experienced software developer with 5+ years of experience in full-stack development, passionate about creating innovative solutions and mentoring junior developers.",
    experience: [
      {
        jobTitle: "Senior Software Engineer",
        company: "Tech Corp",
        location: "San Francisco, CA",
        startDate: "Jan 2022",
        endDate: "Present",
        current: true,
        responsibilities: [
          "Led development of microservices architecture serving 10M+ users",
          "Mentored 5 junior developers and improved team productivity by 30%",
          "Implemented CI/CD pipelines reducing deployment time by 50%",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Technology",
        location: "Boston, MA",
        graduationDate: "May 2019",
        gpa: "3.8",
      },
    ],
    projects: [
      {
        name: "E-commerce Platform",
        url: "github.com/johndoe/ecommerce",
        duration: "6 months",
        description: "Full-stack e-commerce solution with payment integration",
        features: [
          "User authentication and authorization",
          "Payment processing with Stripe",
          "Real-time inventory management",
        ],
        technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      },
    ],
    skills: [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "AWS",
      "Docker",
      "Git",
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        issuer: "Amazon Web Services",
        date: "2023",
      },
    ],
  };

  // Use sample data if formData is empty
  const displayData =
    formData && Object.keys(formData).length > 0 ? formData : sampleData;

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto font-serif" ref={ref}>
      <div className="space-y-5">
        {/* Header */}
        <div className="text-center border-b border-black pb-2">
          <h1 className="text-3xl font-bold text-black mb-1">
            {displayData.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-black">
            {displayData.email && (
              <span>{renderContactInfo(displayData.email, "email")}</span>
            )}
            {displayData.phone && (
              <span>{renderContactInfo(displayData.phone, "phone")}</span>
            )}
            {displayData.address && (
              <span>{renderContactInfo(displayData.address, "address")}</span>
            )}
            {displayData.linkedIn && (
              <span>{renderContactInfo(displayData.linkedIn, "linkedin")}</span>
            )}
            {displayData.website && (
              <span>{renderContactInfo(displayData.website, "website")}</span>
            )}
            {displayData.github && (
              <span>{renderContactInfo(displayData.github, "github")}</span>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {displayData.summary && (
          <div>
            <h2 className="text-lg font-bold text-black border-b border-black pb-1 mb-2">
              SUMMARY
            </h2>
            <p className="text-black text-sm leading-relaxed text-justify">
              {displayData.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {displayData.experience &&
          displayData.experience.some((exp) => exp.jobTitle) && (
            <div>
              <h2 className="text-lg font-bold text-black border-b border-black pb-1 mb-2">
                EXPERIENCE
              </h2>
              <div className="space-y-3">
                {displayData.experience.map(
                  (exp, index) =>
                    exp.jobTitle && (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h3 className="font-bold text-black text-sm">
                              {exp.jobTitle}
                            </h3>
                            <p className="text-black text-sm italic">
                              {exp.company}
                              {exp.location && `, ${exp.location}`}
                            </p>
                          </div>
                          <span className="text-black text-sm">
                            {exp.startDate} -{" "}
                            {exp.current ? "Present" : exp.endDate}
                          </span>
                        </div>
                        {exp.responsibilities &&
                          exp.responsibilities.length > 0 && (
                            <ul className="list-disc list-inside text-black text-sm space-y-1 ml-4">
                              {exp.responsibilities.map(
                                (resp, respIndex) =>
                                  resp.trim() && (
                                    <li
                                      key={respIndex}
                                      className="text-justify"
                                    >
                                      {resp}
                                    </li>
                                  )
                              )}
                            </ul>
                          )}
                      </div>
                    )
                )}
              </div>
            </div>
          )}

        {/* Education */}
        {displayData.education &&
          displayData.education.some((edu) => edu.degree) && (
            <div>
              <h2 className="text-lg font-bold text-black border-b border-black pb-1 mb-2">
                EDUCATION
              </h2>
              <div className="space-y-2">
                {displayData.education.map(
                  (edu, index) =>
                    edu.degree && (
                      <div key={index}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-black text-sm">
                              {edu.degree}
                            </h3>
                            <p className="text-black text-sm italic">
                              {edu.school}
                              {edu.location && `, ${edu.location}`}
                            </p>
                          </div>
                          <div className="text-black text-sm text-right">
                            {edu.graduationDate && (
                              <div>{edu.graduationDate}</div>
                            )}
                            {edu.gpa && <div>GPA: {edu.gpa}</div>}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          )}

        {/* Projects */}
        {displayData.projects &&
          displayData.projects.some((project) => project.name) && (
            <div>
              <h2 className="text-lg font-bold text-black border-b border-black pb-1 mb-2">
                PROJECTS
              </h2>
              <div className="space-y-3">
                {displayData.projects.map(
                  (project, index) =>
                    project.name && (
                      <div key={index}>
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-black text-sm">
                              {project.name}
                            </h3>
                            {project.url && (
                              <a
                                href={formatUrl(project.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-black hover:text-blue-600 transition-colors cursor-pointer"
                              >
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                          {project.duration && (
                            <span className="text-black text-sm">
                              {project.duration}
                            </span>
                          )}
                        </div>

                        {project.description && (
                          <p className="text-black text-sm mb-1 text-justify italic">
                            {project.description}
                          </p>
                        )}

                        {project.features &&
                          project.features.some((feature) =>
                            feature.trim()
                          ) && (
                            <ul className="list-disc list-inside text-black text-sm space-y-1 ml-4 mb-1">
                              {project.features.map(
                                (feature, featureIndex) =>
                                  feature.trim() && (
                                    <li
                                      key={featureIndex}
                                      className="text-justify"
                                    >
                                      {feature}
                                    </li>
                                  )
                              )}
                            </ul>
                          )}

                        {project.technologies &&
                          project.technologies.some((tech) => tech.trim()) && (
                            <p className="text-black text-sm">
                              <span className="font-bold">Technologies:</span>{" "}
                              {project.technologies
                                .filter((tech) => tech.trim())
                                .join(", ")}
                            </p>
                          )}
                      </div>
                    )
                )}
              </div>
            </div>
          )}

        {/* Skills */}
        {displayData.skills &&
          displayData.skills.some((skill) => skill.trim()) && (
            <div>
              <h2 className="text-lg font-bold text-black border-b border-black pb-1 mb-2">
                SKILLS
              </h2>
              <p className="text-black text-sm">
                {displayData.skills.filter((skill) => skill.trim()).join(", ")}
              </p>
            </div>
          )}

        {/* Certifications */}
        {displayData.certifications &&
          displayData.certifications.some((cert) => cert.name) && (
            <div>
              <h2 className="text-lg font-bold text-black border-b border-black pb-1 mb-2">
                CERTIFICATIONS
              </h2>
              <div className="space-y-1">
                {displayData.certifications.map(
                  (cert, index) =>
                    cert.name && (
                      <div key={index} className="flex justify-between">
                        <span className="text-black text-sm font-bold">
                          {cert.name}
                        </span>
                        <span className="text-black text-sm">
                          {cert.issuer} {cert.date && `- ${cert.date}`}
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );
});

ResumePreview.displayName = "ResumePreview";

export default ResumePreview;
