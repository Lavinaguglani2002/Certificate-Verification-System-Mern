import React, { useState } from "react";
import * as XLSX from "xlsx";
import api from "../axios";

const BulkUpload = () => {
  const [loading, setLoading] = useState(false);

  const handleFile = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      setLoading(true);

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          // Dynamic parsing checking rows safely
const json = XLSX.utils.sheet_to_json(sheet, { defval: "" });
          if (!json || json.length === 0) {
            alert("Excel sheet contains no data on row offset index.");
            setLoading(false);
            return;
          }

          const formattedData = json.map((row) => ({
            email: (row.email || row.Email || row["Student Email"] || "").toString().toLowerCase().trim(),
            courseName: (row.courseName || row["Course Name"] || row.Course || "").toString().trim(),
            studentName: (row.studentName || row["Student Name"] || row.Name || "").toString().trim(),
            grade: (row.grade || "A+").toString().trim(),
            collegeName: (row.collegeName || "Lavinova Institute").toString().trim(),
            issuedBy: (row.issuedBy || "Admin").toString().trim(),
            issueDate: row.issueDate ? new Date(row.issueDate) : new Date()
          }));

          console.log("Formatted Data to send:", formattedData);

          const token = localStorage.getItem("token");
          const res = await api.post(
            "/bulk-upload",
            { fileData: formattedData },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert(res.data.message);
          console.log("Server Response:", res.data);
          e.target.value = ""; 

        } catch (error) {
          console.error("Processing Error:", error);
          alert(error.response?.data?.message || "Error uploading data. Check console.");
        } finally {
          setLoading(false);
        }
      };

      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("File Read Error:", error);
      setLoading(false);
      alert("Something went wrong while reading the file");
    }
  };

  return (
    <div className="card p-4 border-0 shadow-sm rounded-4 bg-white">
      <h5 className="fw-bold mb-1">
        <i className="bi bi-file-earmark-excel me-2 text-success"></i>
        Bulk Import
      </h5>
      <p className="small text-muted mb-3">
        Upload .xlsx file to add multiple certificates.
      </p>

      <input
        type="file"
        className="form-control mb-2"
        onChange={handleFile}
        accept=".xlsx, .xls"
        disabled={loading}
      />

      {loading && (
        <div className="d-flex align-items-center gap-2 mt-2">
          <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
          <span className="text-primary small">Uploading to database...</span>
        </div>
      )}
      
      <div className="mt-3 p-2 bg-light rounded-3 border">
        <small className="text-muted d-block" style={{ fontSize: '10px' }}>
          <strong>Excel Columns required (Row index 3):</strong> email, courseName, studentName
        </small>
      </div>
    </div>
  );
};

export default BulkUpload;