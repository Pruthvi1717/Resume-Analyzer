import { useState } from "react";
import "./LeftSide.css";

const LeftSide = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [keywords, setKeywords] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [education, setEducation] = useState("");

  return (
    <div className="ats-container">
      <h2 className="ats-title">ATS Requirements</h2>
      <p className="ats-subtitle">
        Add company requirements to evaluate resume compatibility
      </p>

      <div className="ats-section">
        <label>Job Title</label>
        <input
          type="text"
          placeholder="e.g. Software Engineer"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />
      </div>

      <div className="ats-section">
        <label>Required Skills</label>
        <textarea
          placeholder="React, Node.js, MongoDB, REST APIs"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <span className="hint">Comma-separated skills</span>
      </div>

      <div className="ats-section">
        <label>Keywords (ATS Focused)</label>
        <textarea
          placeholder="scalable, optimized, performance, agile"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />
        <span className="hint">Used for ATS keyword matching</span>
      </div>

      <div className="ats-section">
        <label>Minimum Experience (Years)</label>
        <input
          type="number"
          placeholder="e.g. 2"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
      </div>

      <div className="ats-section">
        <label>Education</label>
        <input
          type="text"
          placeholder="B.Tech / B.E / M.Tech"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
        />
      </div>

      <button className="ats-btn">
        Analyze Resume
      </button>
    </div>
  );
};

export default LeftSide;
