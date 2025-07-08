import React from "react";

const ATSTips = () => {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 rounded-lg">
      <div className="flex">
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            ATS-Friendly Tips
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <ul className="list-disc list-inside space-y-1">
              <li>Include relevant keywords from job descriptions</li>
              <li>Use a clean, simple format without graphics or tables</li>
              <li>Save in PDF format for consistent formatting</li>
              <li>Use standard fonts and avoid special characters</li>
              <li>Keep formatting consistent throughout the document</li>
              <li>
                Use common section titles like "Professional Experience" and
                "Education"
              </li>
              <li>Avoid headers, footers, and text boxes</li>
              <li>Use chronological format for work experience</li>
              <li>Include specific achievements with quantifiable results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSTips;
