import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios";

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
      return;
    }
    fetchCertificates();
  }, [fetchCertificates, navigate, token, user]);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `user-certificates/${user.email.toLowerCase()}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setCertificates(res.data.certificates);
    } catch (error) {
      console.log("Error fetching certificates:", error);
      if (error.response && error.response.status === 403) {
        alert("Security Alert: Unauthorized access!");
        localStorage.clear();
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ background: "#f8fafc", paddingBottom: "50px" }}>
      {/* INLINE CSS FOR PREMIUM FEEL */}
      <style>{`
        .cert-card {
          border: none;
          background: white;
          border-radius: 24px;
          transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
        }
        .cert-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        }
        .header-gradient {
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          color: white;
          border-radius: 0 0 40px 40px;
          padding: 60px 0;
          margin-bottom: -50px;
        }
        .stats-overlay {
          position: relative;
          z-index: 2;
        }
        .btn-view-doc {
          background: #000;
          color: white;
          border-radius: 12px;
          font-weight: 600;
          padding: 12px;
          transition: 0.3s;
        }
        .btn-view-doc:hover {
          background: #333;
          color: #fff;
        }
        .badge-verified {
          background: #dcfce7;
          color: #166534;
          font-weight: 700;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>

      {/* TOP HEADER SECTION */}
      <div className="header-gradient text-center shadow-lg">
        <div className="container">
          <h1 className="fw-bolder display-5 mb-2" style={{ letterSpacing: "-1.5px" }}>Academic Portfolio</h1>
          <p className="opacity-75 lead">Verified credentials for <b>{user?.name}</b></p>
        </div>
      </div>

      <div className="container stats-overlay">
        {/* TOP STATS CARDS */}
        <div className="row g-4 mb-5 justify-content-center">
          <div className="col-md-3">
            <div className="card border-0 shadow p-4 bg-white rounded-4 text-center">
              <i className="bi bi-patch-check-fill text-primary fs-1 mb-2"></i>
              <h2 className="fw-bold mb-0">{certificates.length}</h2>
              <small className="text-muted fw-semibold">Certificates</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow p-4 bg-white rounded-4 text-center">
              <i className="bi bi-shield-lock-fill text-success fs-1 mb-2"></i>
              <h2 className="fw-bold mb-0">SSL</h2>
              <small className="text-muted fw-semibold">Secured Access</small>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card border-0 shadow p-4 bg-dark text-white rounded-4 text-center">
              <i className="bi bi-calendar-event opacity-50 fs-1 mb-2"></i>
              <h2 className="fw-bold mb-0" style={{ fontSize: '1.4rem' }}>{new Date().toLocaleDateString('en-GB')}</h2>
              <small className="opacity-75 fw-semibold">Session Date</small>
            </div>
          </div>
        </div>

        {/* LOADING & DATA SECTION */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-grow text-primary" role="status"></div>
            <p className="mt-3 fw-medium text-muted">Authenticating Vault...</p>
          </div>
        ) : (
          <>
            {certificates.length === 0 ? (
              <div className="text-center py-5 bg-white shadow-sm rounded-4 border p-5">
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" width="100" alt="empty" className="mb-4 opacity-50" />
                <h4 className="fw-bold">No Records Found</h4>
                <p className="text-muted">We couldn't find any certificates linked to <b>{user.email}</b></p>
                <button onClick={() => navigate("/dashboard")} className="btn btn-primary rounded-pill px-4 fw-bold">Back to Dashboard</button>
              </div>
            ) : (
              <div className="row g-4">
                {certificates.map((cert) => (
                  <div className="col-md-6 col-lg-4" key={cert._id}>
                    <div className="card cert-card p-2 h-100">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <span className="badge badge-verified rounded-pill px-3 py-2">
                            <i className="bi bi-shield-check me-1"></i> Verified
                          </span>
                          <span className="text-muted font-monospace small" style={{ fontSize: '10px' }}>#{cert.certificateId}</span>
                        </div>

                        <h5 className="fw-bold mb-2" style={{ color: "#1e293b", lineHeight: '1.4' }}>{cert.courseName}</h5>
                        <p className="text-muted small mb-4">
                          <i className="bi bi-bank me-2"></i>{cert.collegeName}
                        </p>

                        <div className="p-3 rounded-4 bg-light mb-4">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="small text-muted fw-medium">Performance:</span>
                            <span className="badge bg-white text-dark shadow-sm px-3 rounded-pill fw-bold border">{cert.grade || "A+"}</span>
                          </div>
                          <div className="d-flex justify-content-between">
                            <span className="small text-muted fw-medium">Issued On:</span>
                            <span className="small fw-bold">{new Date(cert.issueDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <button
                          className="btn btn-view-doc w-100 shadow-sm"
                          onClick={() => navigate("/certificate-view", { state: cert })}
                        >
                          <i className="bi bi-file-earmark-pdf me-2"></i> View Certificate
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* FOOTER */}
      <div className="container mt-5 text-center">
        <p className="text-muted small">
           Authenticated via Lavinova Digital Identity Service. 
           <br />
           <i className="bi bi-info-circle me-1"></i> Need help? <a href="mailto:support@lavinova.com" className="text-decoration-none fw-bold">Contact Support</a>
        </p>
      </div>
    </div>
  );
}

export default MyCertificates;