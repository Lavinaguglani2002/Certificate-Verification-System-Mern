import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./admindashboard.css"
import BulkUpload from "./BulkUpload"; // Ensure path is correct
import api from "../axios";


function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [certificates, setCertificates] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const certRes = await api.get(`/all`, config);
      setCertificates(certRes.data?.certificates || []);

      try {
        const userRes = await api.get(`/all-users-count`, config);
        setTotalUsers(userRes.data?.count || 0);
      } catch (err) {
        console.log("User count error (endpoint missing)");
      }
    } catch (error) {
      console.log("Fetch error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCertificates = certificates.filter((cert) =>
    cert.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    cert.email?.toLowerCase().includes(search.toLowerCase()) ||
    cert.certificateId?.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-cyber-wrapper py-5 px-lg-5 position-relative">
      
      {/* Background Ambient Orbs */}
      <div className="dashboard-bg-orb-1"></div>
      <div className="dashboard-bg-orb-2"></div>

      <div className="container-fluid position-relative" style={{ zIndex: 10 }}>
        
        {/* 1. HEADER SECTION */}
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-white tracking-tight">
            Lavinova Admin <span style={{ color: "#00f2fe", textShadow: "0 0 15px rgba(0,242,254,0.3)" }}>Portal</span>
          </h1>
          <p className="lead text-white-50">
            Authorized access for <span className="fw-semibold" style={{ color: "#ff0055" }}>{user?.name || "Administrator"}</span>
          </p>
          <div className="mx-auto rounded-pill" style={{ height: "4px", width: "60px", background: "linear-gradient(90deg, #00f2fe, #7209b7)" }}></div>
        </div>

        {/* 2. STATS CARDS */}
        <div className="row g-4 mb-5">
          {[
            { label: "Total Certificates", value: certificates.length, color: "#00f2fe", icon: "bi-file-earmark-check", bgGlow: "rgba(0,242,254,0.1)" },
            { label: "Active Students", value: totalUsers, color: "#2ec4b6", icon: "bi-people", bgGlow: "rgba(46,196,182,0.1)" },
            { label: "System Status", value: "Operational", color: "#ff0055", icon: "bi-shield-lock", bgGlow: "rgba(255,0,85,0.1)" }
          ].map((stat, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card h-100 stats-card-glass" style={{ borderLeft: `4px solid ${stat.color}` }}>
                <div className="card-body p-4 d-flex align-items-center justify-content-between">
                  <div>
                    <h6 className="text-uppercase text-white-50 small fw-bold mb-2">{stat.label}</h6>
                    <h2 className="fw-extrabold mb-0" style={{ color: stat.color, textShadow: `0 0 10px ${stat.bgGlow}` }}>{stat.value}</h2>
                  </div>
                  <div className="rounded-4 p-3 fs-3" style={{ background: stat.bgGlow, color: stat.color }}>
                    <i className={`bi ${stat.icon}`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 3. TOOLS & BULK IMPORT SECTION */}
        <div className="row g-4 mb-5">
          {/* Management Tools Grid */}
          <div className="col-lg-8">
            <div className="card p-4 h-100 tools-card-glass">
              <h4 className="fw-bold mb-4 d-flex align-items-center text-white">
                <i className="bi bi-grid-fill me-2" style={{ color: "#00f2fe" }}></i> Management Tools
              </h4>
              <div className="row g-3">
                {[
                  { title: "Manual Entry", desc: "Issue single certificate", link: "/create-certificate", styleType: "btn-cyber-purple" },
                  { title: "Verify Record", desc: "Validate authenticity", link: "/verify-certificate", styleType: "btn-cyber-cyan" },
                  { title: "Manage Users", desc: "View registered students", link: "/all-users", styleType: "btn-cyber-outline" },
                  { title: "Full Database", desc: "Access all records", link: "/all-certificates", styleType: "btn-cyber-teal" }
                ].map((action, idx) => (
                  <div className="col-md-6" key={idx}>
                    <div className="p-3 inner-tool-box h-100 d-flex flex-column justify-content-between">
                      <div>
                        <h6 className="fw-bold text-white mb-1">{action.title}</h6>
                        <p className="text-white-50 small mb-3">{action.desc}</p>
                      </div>
                      <Link to={action.link} className={`btn-dashboard-action ${action.styleType}`}>
                        Open Tool
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bulk Upload Component */}
          <div className="col-lg-4">
            <div className="card p-4 h-100 tools-card-glass" style={{ borderTop: "4px solid #2ec4b6" }}>
              <h4 className="fw-bold mb-3 d-flex align-items-center text-white">
                <i className="bi bi-file-earmark-excel-fill me-2" style={{ color: "#2ec4b6" }}></i> Bulk Import
              </h4>
              <p className="text-white-50 small mb-4">Select an Excel file to upload multiple student records instantly.</p>
              
              <div className="bulk-upload-dark-theme-container">
                <BulkUpload />
              </div>

              <div className="mt-4 p-3 rounded-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                 <small className="text-white-50" style={{ fontSize: '11px', lineHeight: '1.5' }}>
                   <i className="bi bi-info-circle me-1" style={{ color: "#2ec4b6" }}></i> Ensure columns match: <br />
                   <b className="text-white">studentName, email, courseName, certificateId</b>
                 </small>
              </div>
            </div>
          </div>
        </div>

        {/* 4. SEARCH SECTION */}
        <div className="card overflow-hidden tools-card-glass">
          <div className="card-header bg-transparent p-4 border-0">
            <h5 className="fw-bold mb-0 text-white">Database Live Search</h5>
          </div>
          <div className="px-4 pb-4">
            <div className="input-group input-group-lg search-input-wrapper overflow-hidden">
              <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-white-50"></i></span>
              <input
                type="text"
                className="form-control bg-transparent border-0 ps-0 shadow-none text-white"
                placeholder="Search by name, email or ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ fontSize: "1rem" }}
              />
            </div>

            {search && (
              <div className="mt-4 animate__animated animate__fadeIn">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="mb-0 text-white-50">Showing <b className="text-white">{filteredCertificates.length}</b> results</p>
                </div>

                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle custom-cyber-table mb-0">
                    <thead>
                      <tr className="small text-uppercase fw-bold text-white-50">
                        <th>Student</th>
                        <th>Certificate ID</th>
                        <th>Email</th>
                        <th className="text-end">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCertificates.length > 0 ? filteredCertificates.map((cert) => (
                        <tr key={cert._id}>
                          <td>
                            <div className="fw-bold text-white">{cert.studentName}</div>
                            <small style={{ color: "#00f2fe" }}>{cert.courseName}</small>
                          </td>
                          <td><code className="cyber-code-badge">{cert.certificateId}</code></td>
                          <td className="text-white-50 small">{cert.email}</td>
                          <td className="text-end">
                            <span className="badge rounded-pill px-3 py-2" style={{ background: "rgba(46,196,182,0.1)", color: "#2ec4b6", border: "1px solid rgba(46,196,182,0.2)" }}>
                              Verified
                            </span>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-white-50">No records found for "{search}"</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5. LOADING OVERLAY */}
        {loading && !search && (
          <div className="text-center py-5 mt-4">
            <div className="spinner-border" role="status" style={{ color: "#00f2fe" }}></div>
            <p className="mt-2 text-white-50 small fw-medium">Syncing Academic Cloud...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;