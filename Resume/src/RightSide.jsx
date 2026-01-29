import { useState } from "react";
import axios from "axios";
import "./RightSide.css";

const RightSide = () => {
  const [pdfUrl, setPdfUrl] = useState("");
  const [resumeText, setResumeText] = useState(""); // ✅ added
  const [error, setError] = useState("");

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    const formData = new FormData();
    formData.append("pdfFile", file);

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/upload/pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // ✅ unchanged
      setPdfUrl(res.data.pdfUrl);

      // ✅ NEW: extracted resume text
      setResumeText(res.data.resumeText || "");

      // ✅ debug check
      console.log("Extracted Resume Text:", res.data.resumeText);

    } catch (err) {
      console.error("UPLOAD ERROR:", err.response || err);
      setError(err.response?.data?.message || "Failed to upload PDF");
    }
  };

  return (
    <div className="RightSideContainer">
      {/* Upload Section */}
      <div className="topCont">
        <h3>Upload PDF</h3>

        <label className="uploadBox">
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfUpload}
          />
          <span>Click to upload or drag PDF here</span>
        </label>

        {error && <p className="error-text">{error}</p>}
      </div>

      {/* Preview Section */}
      <div className="bottomCont">
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            className="pdfViewer"
          />
        ) : (
          <p className="placeholder">
            Uploaded PDF will appear here
          </p>
        )}
      </div>

      {/* ✅ Optional: show extracted text (remove later) */}
      {/* {resumeText && (
        <div style={{ marginTop: "10px", fontSize: "12px" }}>
          <h4>Extracted Text (Debug)</h4>
          <pre style={{ whiteSpace: "pre-wrap" }}>
            {resumeText.slice(0, 3000)}
          </pre>
        </div>
      )} */}
    </div>
  );
};

export default RightSide;
