
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";

function AllCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setCertificates(res.data.certificates);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("🚨 Are you sure you want to permanently delete this certificate?")) return;
    try {
      await api.delete(`/delete-certificate/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCertificates();
    } catch (error) {
      alert("Delete failed");
    }
  };

  const filteredCertificates = certificates.filter((cert) => {
    const term = searchTerm.toLowerCase();
    return (
      cert.studentName.toLowerCase().includes(term) ||
      cert.email.toLowerCase().includes(term) ||
      (cert.certificateId && cert.certificateId.toLowerCase().includes(term)) ||
      (cert.courseName && cert.courseName.toLowerCase().includes(term))
    );
  });

  return (
    <div className="container-fluid py-5 px-md-5" style={{ backgroundColor: "#f4f6f9", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      
      {/* TOP HEADER */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
        <div>
          <h2 className="fw-black text-dark mb-1" style={{ letterSpacing: "-0.5px" }}>Credential Dashboard</h2>
          <p className="text-muted mb-0">Manage, verify, and track issued student certificates seamlessly.</p>
        </div>
        <div>
          <Link to="/create-certificate" className="btn btn-dark px-4 py-2.5 rounded-3 fw-medium shadow-sm border-0 d-flex align-items-center gap-2" style={{ backgroundColor: "#0f172a", transition: "all 0.2s" }}>
            <span>➕</span> Issue New Certificate
          </Link>
        </div>
      </div>

      {/* FILTER & METRICS SECTION */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 p-2 bg-white">
            <div className="input-group align-items-center px-2">
              <span className="fs-5 text-muted me-2">🔍</span>
              <input 
                type="text" 
                className="form-control border-0 bg-transparent py-3 shadow-none text-dark" 
                placeholder="Search by student name, email,course name or unique ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: "0.95rem" }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end">
          <div className="bg-white px-4 py-3 rounded-4 shadow-sm border-0 w-100 text-center text-lg-end d-flex justify-content-between justify-content-lg-end align-items-center gap-3">
            <span className="text-muted small fw-medium">Total Records Found:</span>
            <span className="badge rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: "#e2e8f0", color: "#334155", fontSize: "0.85rem" }}>
              {filteredCertificates.length} Items
            </span>
          </div>
        </div>
      </div>

      {/* DATA TABLE CARD */}
      <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <tr>
                <th className="px-4 py-3 text-secondary fw-semibold small text-uppercase" style={{ letterSpacing: "0.5px" }}>Student Details</th>
                <th className="py-3 text-secondary fw-semibold small text-uppercase" style={{ letterSpacing: "0.5px" }}>Course & Credential ID</th>
                <th className="py-3 text-secondary fw-semibold small text-uppercase" style={{ letterSpacing: "0.5px" }}>Status</th>
                <th className="py-3 text-secondary fw-semibold small text-uppercase" style={{ letterSpacing: "0.5px" }}>Issue Date</th>
                <th className="py-3 text-secondary fw-semibold small text-uppercase text-end px-4" style={{ letterSpacing: "0.5px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="spinner-border spinner-border-sm text-secondary me-2" role="status"></div>
                    <span className="text-muted fw-medium">Fetching secure records...</span>
                  </td>
                </tr>
              ) : filteredCertificates.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="fs-3 mb-2">📁</div>
                    <span className="text-muted fw-medium">No matching certificates found.</span>
                  </td>
                </tr>
              ) : (
                filteredCertificates.map((cert) => (
                  <tr key={cert._id} style={{ transition: "all 0.2s" }}>
                    <td className="px-4 py-3">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm" 
                             style={{ width: "42px", height: "42px", fontWeight: "600", backgroundColor: "#e0e7ff", color: "#4f46e5", fontSize: "0.95rem" }}>
                          {cert.studentName ? cert.studentName.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <div className="fw-semibold text-dark mb-0" style={{ fontSize: "0.95rem" }}>{cert.studentName}</div>
                          <div className="text-muted" style={{ fontSize: "0.85rem" }}>{cert.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-dark fw-semibold mb-0" style={{ fontSize: "0.9rem" }}>{cert.courseName}</div>
                      <span className="badge font-monospace text-secondary bg-light px-2 py-1 border" style={{ fontSize: "0.75rem" }}>
                        {cert.certificateId || "N/A"}
                      </span>
                    </td>
                    <td>
                      <span className={`badge rounded-pill px-3 py-2 fw-medium d-inline-flex align-items-center gap-1.5 style={{ fontSize: "0.8rem" }} ${
                        cert.status === "Approved" ? "bg-success bg-opacity-10 text-success" : 
                        cert.status === "Pending" ? "bg-warning bg-opacity-10 text-warning text-dark" : 
                        "bg-danger bg-opacity-10 text-danger"
                      }`}>
                        <span style={{ fontSize: "8px" }}>●</span> {cert.status || "Approved"}
                      </span>
                    </td>
                    <td className="text-secondary" style={{ fontSize: "0.9rem" }}>
                      {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "N/A"}
                    </td>
                    <td className="text-end px-4">
                      <div className="d-flex justify-content-end align-items-center gap-2">
                        <Link 
                          to="/certificate-view" 
                          state={cert} 
                          className="btn btn-sm btn-light border rounded-3 px-3 fw-medium text-dark shadow-sm btn-hover-dark"
                          style={{ fontSize: "0.85rem", transition: "all 0.2s" }}
                        >
                          📄 View PDF
                        </Link>
                        <button
                          className="btn btn-sm btn-light border text-danger rounded-3 p-2 shadow-sm"
                          onClick={() => handleDelete(cert._id)}
                          title="Delete Certificate"
                          style={{ transition: "all 0.2s" }}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllCertificates;