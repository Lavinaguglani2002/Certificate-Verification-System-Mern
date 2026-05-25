import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../axios";

function VerifyCertificate() {
  const { id } = useParams();
  const [certificateId, setCertificateId] = useState("");
  const [certificate, setCertificate] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 CRASH GUARD: Prevents role property extraction crash on missing token sessions
  const localUser = JSON.parse(localStorage.getItem("user")) || null;

  const verifyCertificate = async (finalId) => {
    try {
      setLoading(true);
      setCertificate(null);
      setMessage("");

      const res = await api.get(`verify/${finalId}`);
      
      if (res.data && res.data.certificate) {
        setCertificate(res.data.certificate);
        setMessage(res.data.message || "Certificate verified successfully.");
      } else {
        setCertificate(res.data);
      }
    } catch (error) {
      setCertificate(null);
      setMessage(error.response?.data?.message || "Invalid Certificate ID. Please check and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      verifyCertificate(id);
    }
  }, [id]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!certificateId) {
      setMessage("Please enter a valid Certificate ID");
      return;
    }
    verifyCertificate(certificateId);
  };

  return (
    <div className="container py-5 min-vh-100" style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#f1f5f9" }}>
      
      {/* Dynamic Style Injection for Premium Layout Components */}
      <style>{`
        .verify-card { border: none !important; border-radius: 24px !important; box-shadow: 0 20px 40px rgba(0,0,0,0.06) !important; transition: transform 0.3s ease; }
        .data-row { border-bottom: 1px dashed #e2e8f0; padding: 12px 4px; }
        .data-row:last-child { border-bottom: none; }
        .brand-logo { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      {/* SAFE PORTAL HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-5 mx-auto" style={{ maxWidth: "580px" }}>
        <Link to="/" className="text-decoration-none fw-extrabold fs-4 d-flex align-items-center gap-2 text-dark">
          <span className="fs-3">🛡️</span> <span className="brand-logo fw-bold">Lavinova</span>Portal
        </Link>
        <div>
          {localUser ? (
            <Link 
              to={localUser.role === "admin" ? "/admin-dashboard" : "/user-dashboard"} 
              className="btn btn-sm btn-outline-secondary px-4 py-2 rounded-pill fw-semibold small shadow-sm"
              style={{ fontSize: "12px" }}
            >
              Dashboard
            </Link>
          ) : (
            <Link to="/login" className="btn btn-sm btn-primary px-4 py-2 rounded-pill fw-semibold small shadow-sm" style={{ fontSize: "12px", backgroundColor: "#2563eb" }}>
              Login Member
            </Link>
          )}
        </div>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          
          <div className="card verify-card bg-white overflow-hidden">
            {/* Header with Dark Blue Linear Gradient */}
            <div className="p-5 text-center text-white" 
                 style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #111827 100%)" }}>
              <div className="badge bg-primary bg-opacity-25 text-primary rounded-pill px-3 py-2 mb-3 border border-primary border-opacity-25 fw-bold" style={{ fontSize: "11px", letterSpacing: "1px", color: "#60a5fa" }}>
                SECURE AUTHENTICATION GATEWAY
              </div>
              <h3 className="fw-bold tracking-tight mb-1" style={{ fontSize: "26px" }}>Certificate Verifier</h3>
              <p className="small text-white-50 mb-0">Verify credentials integrity in real-time</p>
            </div>

            <div className="card-body p-4 p-md-5">
              
              {/* LOADING STATE FOR AUTO-VERIFY */}
              {loading && (
                <div className="text-center py-5 my-3">
                  <div className="spinner-border text-primary mb-4" role="status" style={{ width: "3.5rem", height: "3.5rem", strokeWidth: "3px" }}></div>
                  <h6 className="text-dark fw-bold mb-1">Checking Records</h6>
                  <p className="text-muted small">Securing connection to the registry...</p>
                </div>
              )}

              {/* INPUT FORM */}
              {!loading && (!id || message) && !certificate && (
                <form onSubmit={handleVerify} className="py-2">
                  {id && (
                    <div className="alert alert-warning border-0 small mb-4 py-3 px-4 rounded-3 shadow-sm d-flex align-items-center gap-2">
                      <span>⚠️</span> <b>Validation Alert:</b> Direct URL access failed. Enter manually.
                    </div>
                  )}
                  
                  <div className="form-group mb-4">
                    <label htmlFor="certInput" className="text-secondary small fw-bold mb-2 tracking-wide text-uppercase" style={{ fontSize: "11px" }}>
                      Verification ID
                    </label>
                    <div className="input-group border rounded-3 p-1 bg-light">
                      <span className="input-group-text border-0 bg-transparent text-muted fs-5">🔑</span>
                      <input
                        type="text"
                        className="form-control border-0 bg-transparent shadow-none py-3 fw-semibold text-dark"
                        id="certInput"
                        placeholder="e.g. LAV-12345678"
                        value={certificateId}
                        onChange={(e) => setCertificateId(e.target.value)}
                        style={{ fontSize: "15px" }}
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-3 shadow d-flex align-items-center justify-content-center gap-2" style={{backgroundColor: "#1e40af"}}>
                    Verify Authenticity
                  </button>
                </form>
              )}

              {/* Status Errors Messages */}
              {!loading && message && !certificate && (
                <div className="alert alert-danger border-0 rounded-3 p-3 d-flex align-items-center gap-2 fw-medium small shadow-sm">
                  <span className="fs-5">❌</span> {message}
                </div>
              )}

              {/* Result Area (Success State) */}
              {!loading && certificate && (
                <div>
                  <div className="text-center mb-5">
                    <div className="d-inline-flex p-3 rounded-circle bg-success bg-opacity-10 mb-3 border border-success border-opacity-25 shadow-sm">
                       <span className="fs-1 text-success">🛡️</span>
                    </div>
                    <h4 className="fw-bold text-success mb-1">Credential Validated</h4>
                    <p className="text-muted small mb-0">This document parameters match active registry profiles</p>
                  </div>

                  <div className="bg-light p-4 rounded-4 border border-muted border-opacity-25 shadow-inner">
                    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-2">
                      <h6 className="fw-bold text-secondary mb-0 tracking-wide text-uppercase" style={{ fontSize: "11px" }}>Registry Identity Records</h6>
                      <span className="badge bg-success bg-opacity-10 text-success rounded-pill fw-bold" style={{ fontSize: "10px" }}>✓ OFFICIAL ISSUANCE</span>
                    </div>
                    
                    <div className="data-row d-flex justify-content-between align-items-center">
                      <span className="text-muted small">Recipient Graduate:</span>
                      <span className="fw-bold text-dark text-end fs-6">{certificate.studentName}</span>
                    </div>
                    <div className="data-row d-flex justify-content-between align-items-center">
                      <span className="text-muted small">Course Domain:</span>
                      <span className="fw-bold text-dark text-end small">{certificate.courseName}</span>
                    </div>
                    <div className="data-row d-flex justify-content-between align-items-center">
                      <span className="text-muted small">Verification Signature:</span>
                      <span className="fw-bold text-primary font-monospace bg-white px-2 py-1 rounded border shadow-sm small" style={{color: "#1e40af"}}>{certificate.certificateId}</span>
                    </div>
                    <div className="data-row d-flex justify-content-between align-items-center">
                      <span className="text-muted small">Authority Entity:</span>
                      <span className="fw-semibold text-secondary small">{certificate.issuedBy || "Lavinova Admin Team"}</span>
                    </div>
                  </div>

                  <Link
                    to="/certificate-view"
                    state={certificate}
                    className="btn btn-dark w-100 mt-4 py-3 rounded-3 shadow d-flex align-items-center justify-content-center fw-bold gap-2 transition-all"
                    style={{ backgroundColor: "#1f2937" }}
                  >
                    📄 View Secured Document Frame
                  </Link>
                </div>
              )}
            </div>

            <div className="card-footer bg-light py-3 text-center border-0 border-top">
              <p className="mb-0 text-muted fw-medium" style={{ fontSize: "0.72rem", letterSpacing: "0.5px" }}>
                SECURED COMPLIANCE FRAMEWORK PROTOCOL © 2026
              </p>
            </div>
          </div>

          <div className="text-center mt-4 mb-5">
             <Link to="/" className="text-decoration-none text-secondary small fw-bold tracking-wide text-uppercase" style={{ fontSize: "11px" }}>← Back to Portal Home</Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default VerifyCertificate;