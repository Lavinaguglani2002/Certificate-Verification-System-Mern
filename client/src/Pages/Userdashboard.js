
import {  useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const initials = user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [toastMessage, setToastMessage] = useState("");
  const [selectedCert, setSelectedCert] = useState(null); 
  const [shareType, setShareType] = useState("link"); // "link" ya "file"

  // 🔥 FIXED DYNAMIC LINK GENERATOR BASED ON FORMAT SELECTOR
  const getShareableUrl = (cert, type) => {
    if (type === "link") {
      // Standard public authentication portal link
      return `${window.location.origin}/verify-certificate/${cert.certificateId}`;
    } else {
      // Redirects directly to full page document viewport screen
      return `${window.location.origin}/certificate-view?id=${cert.certificateId}`;
    }
  };

  // 1. WhatsApp Sharing
  const shareToWhatsApp = (cert) => {
    const finalUrl = getShareableUrl(cert, shareType);
    
    if (shareType === "link") {
      const text = `Hi! Check out my official certificate verification link for *${cert.courseName}* from Lavinova Institute.\n\n🔗 Verify Here: ${finalUrl}\nVerification ID: ${cert.certificateId}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    } else {
      const text = `📄 View & Download my Full Certificate Document for *${cert.courseName}* here:\n\n👉 ${finalUrl}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  // 2. LinkedIn Sharing
  const shareToLinkedIn = (cert) => {
    const finalUrl = getShareableUrl(cert, shareType);
    
    if (shareType === "link") {
      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(finalUrl)}`;
      window.open(linkedinUrl, "_blank");
    } else {
      const text = `I am proud to share my official certificate document for completing ${cert.courseName} from Lavinova Institute!\n\n📄 View Full Document Here: ${finalUrl}\nVerification ID: ${cert.certificateId}`;
      const linkedinUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`;
      window.open(linkedinUrl, "_blank");
    }
  };

useEffect(() => {
  const fetchAll = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await api.get(
        `/user-certificates/${user?.email}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setCertificates(res.data.certificates || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!user || !localStorage.getItem("token")) {
    navigate("/login");
    return;
  }

  fetchAll();
}, [navigate]); 
    cert.certificateId?.toLowerCase().includes(search.toLowerCase()) ||
    cert.courseName?.toLowerCase().includes(search.toLowerCase()) ||
    cert.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    cert.email?.toLowerCase().includes(search.toLowerCase())
  

  return (
    <div className="min-vh-100 pb-5" style={{ backgroundColor: "#f3f6f9", fontFamily: "sans-serif", position: "relative" }}>
      
      <style>{`
        .stat-card { border: none; border-radius: 20px; transition: all 0.3s ease; background: white; overflow: hidden; position: relative; }
        .stat-card:hover { transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important; }
        .action-icon { width: 50px; height: 50px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .table-wrap { background: white; border-radius: 20px; border: none; }
        .search-input-group { background: white; border-radius: 12px; padding: 5px 15px; border: 1px solid #e0e0e0; }
        .search-input-group input:focus { outline: none; }
        .btn-view { border-radius: 8px; font-weight: 600; padding: 6px 16px; transition: 0.2s; }
        .btn-view:hover { background: #0d6efd; color: white !important; }
        .badge-verified { background: #e8f5e9; color: #2e7d32; font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 50px; }
        .support-gradient-card { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); border-radius: 20px; border: none; }
        .custom-toast { position: fixed; top: 90px; right: 20px; z-index: 9999; background: #2e7d32; color: white; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
        .react-modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 2000; }
      `}</style>

      {/* TOAST SUCCESS NOTIFICATION */}
      {toastMessage && (
        <div className="custom-toast">
          ✅ {toastMessage}
        </div>
      )}

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3">
        <div className="container">
          <div className="d-flex align-items-center">
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-2" style={{width:'35px', height:'35px'}}>L</div>
            <span className="h5 fw-bold mb-0">Lavinova Portal</span>
          </div>
          <div className="dropdown">
            <div className="d-flex align-items-center gap-2" data-bs-toggle="dropdown" style={{cursor:'pointer'}}>
              <div className="text-end d-none d-md-block">
                <div className="fw-bold small">{user?.name}</div>
                <div className="text-muted" style={{fontSize:'10px'}}>Student Member</div>
              </div>
              <div className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{width:'40px', height:'40px'}}>
                {initials}
              </div>
            </div>
            <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 rounded-3">
              <li><button className="dropdown-item py-2" onClick={() => {localStorage.clear(); navigate("/login")}}>Logout</button></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        
        {/* HEADER */}
        <div className="mb-4">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-2">Student Dashboard</span>
          <h2 className="fw-bold text-dark">Welcome back, {user?.name || "Student"}! 👋</h2>
          <p className="text-muted mb-0">Manage your official credentials, download certificates, and share secure links directly.</p>
        </div>

        {/* TOP CARDS */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div onClick={() => navigate("/verify-certificate")} className="stat-card card p-4 shadow-sm" style={{cursor: 'pointer'}}>
              <div className="d-flex align-items-center gap-3">
                <div className="action-icon bg-primary text-white shadow">🔏</div>
                <div>
                  <h6 className="fw-bold mb-1">Verify ID</h6>
                  <p className="text-muted small mb-0">Check authenticity</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card card p-4 shadow-sm">
              <div className="d-flex align-items-center gap-3">
                <div className="action-icon bg-success text-white shadow">🏅</div>
                <div>
                  <h6 className="fw-bold mb-1">Documents</h6>
                  <p className="text-muted small mb-0">{certificates.length} Files found</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card card p-4 shadow-sm bg-dark text-white">
              <div className="d-flex align-items-center gap-3">
                <div className="action-icon bg-warning text-dark">👤</div>
                <div>
                  <h6 className="fw-bold mb-1 text-white">Identity</h6>
                  <span className="badge bg-success" style={{fontSize:'9px'}}>VERIFIED PORTAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE HUB */}
        <div className="row g-4">
          <div className="col-lg-9">
            <div className="card table-wrap shadow-sm border-0">
              <div className="p-4 border-bottom d-md-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-3 mb-md-0">Academic Documents</h5>
                <div className="search-input-group d-flex align-items-center" style={{minWidth: '320px'}}>
                  <input 
                    type="text" 
                    className="border-0 w-100 small" 
                    placeholder="Search Name, Email, Course or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr style={{fontSize:'12px', color: '#666'}}>
                        <th className="ps-4 py-3">STUDENT DETAILS</th>
                        <th>COURSE / PROGRAM</th>
                        <th>VERIFICATION ID</th>
                        <th className="text-end pe-4">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr><td colSpan="4" className="text-center py-5"><div className="spinner-border text-primary"></div></td></tr>
                      ) : filtered.length > 0 ? filtered.map((cert) => (
                        <tr key={cert._id} className="border-bottom-hover">
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              <div className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3 text-primary fw-bold" style={{width:'38px', height:'38px', fontSize:'12px'}}>
                                {cert.studentName ? cert.studentName.split(" ").map(n => n[0]).join("") : "S"}
                              </div>
                              <div>
                                <div className="fw-bold small">{cert.studentName}</div>
                                <div className="text-muted" style={{fontSize: '11px'}}>{cert.email}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-semibold small">{cert.courseName}</div>
                            <span className="badge-verified">Official</span>
                          </td>
                          <td>
                            <code className="text-primary fw-bold" style={{fontSize:'12px', background:'#f0f4ff', padding:'4px 8px', borderRadius:'4px'}}>
                              {cert.certificateId}
                            </code>
                          </td>
                          <td className="text-end pe-4">
                            <div className="d-inline-flex gap-2">
                              <button 
                                onClick={() => navigate("/certificate-view", { state: cert })} 
                                className="btn btn-outline-primary btn-view btn-sm"
                              >
                                View Doc
                              </button>
                              <button 
                                onClick={() => setSelectedCert(cert)} 
                                className="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                                style={{ borderRadius: "8px", fontWeight: "500" }}
                              >
                                🔗 Share
                              </button>
                            </div>
                          </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="text-center py-5 text-muted">
                            No certificates found for "<b>{search}</b>"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="card support-gradient-card text-white p-4 h-100 d-flex flex-column justify-content-between text-center shadow-sm">
              <div>
                <div className="fs-1 mb-2">🛡️</div>
                <h5 className="fw-bold text-white mb-2">Need Support?</h5>
<p className="small text-white-50">If there is any correction needed in your name, course, or credentials, you can contact the admin helpdesk directly for support.</p>
              </div>
              <div className="border-top border-secondary pt-3 mt-4">
                <p className="small mb-2 text-white-50">Write an email to us:</p>
                <a href="mailto:support@lavinova.com" className="btn btn-sm btn-light w-100 rounded-3 fw-bold py-2 text-dark">
                  ✉️ Email Admin Desk
                </a>    
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 🌟 SHARING MODAL OVERLAY 🌟 */}
      {selectedCert && (
        <div className="react-modal-overlay">
          <div className="card border-0 shadow-lg rounded-4" style={{ width: "100%", maxWidth: "500px", background: "#fff" }}>
            
            <div className="card-header border-0 bg-light p-4 rounded-top-4 d-flex justify-content-between align-items-center">
              <h5 className="fw-bold text-dark mb-0">📤 Share Your Achievement</h5>
              <button type="button" className="btn-close" style={{ boxShadow: "none" }} onClick={() => setSelectedCert(null)}></button>
            </div>

            <div className="card-body p-4">
              <p className="text-muted small mb-4">
                Choose how you want to share your certificate for <b className="text-dark">{selectedCert.courseName}</b>.
              </p>

              {/* FORMAT */}
              <h6 className="fw-bold mb-3 text-secondary" style={{ fontSize: "12px", letterSpacing: "1px" }}>1. SELECT FORMAT</h6>
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div 
                    className={`p-3 border text-center rounded-3 ${shareType === 'link' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'text-muted'}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setShareType("link")}
                  >
                    <div className="fs-3 mb-1">🔗</div>
                    <div style={{ fontSize: "13px" }}>Share Secure Link</div>
                  </div>
                </div>
                <div className="col-6">
                  <div 
                    className={`p-3 border text-center rounded-3 ${shareType === 'file' ? 'border-primary bg-primary bg-opacity-10 text-primary fw-bold' : 'text-muted'}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setShareType("file")}
                  >
                    <div className="fs-3 mb-1">📄</div>
                    <div style={{ fontSize: "13px" }}>Share Certificate Doc</div>
                  </div>
                </div>
              </div>

              {/* PLATFORMS */}
              <h6 className="fw-bold mb-3 text-secondary" style={{ fontSize: "12px", letterSpacing: "1px" }}>2. CHOOSE PLATFORM</h6>
              <div className="d-grid gap-2">
                <button 
                  onClick={() => shareToWhatsApp(selectedCert)}
                  className="btn py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 border-0 shadow-sm"
                  style={{ backgroundColor: "#25D366" }}
                >
                  💬 Share on WhatsApp
                </button>

                <button 
                  onClick={() => shareToLinkedIn(selectedCert)}
                  className="btn py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 rounded-3 border-0 shadow-sm mt-2"
                  style={{ backgroundColor: "#0077B5" }}
                >
                  💼 Share on LinkedIn
                </button>
              </div>

              {/* QUICK COPY FOOTER */}
              <div className="mt-4 pt-3 border-top text-center">
                <button 
                  className="btn btn-link text-decoration-none btn-sm fw-semibold text-primary"
                  onClick={() => {
                    const finalUrl = getShareableUrl(selectedCert, shareType);
                    navigator.clipboard.writeText(finalUrl);
                    setToastMessage(`${shareType === 'link' ? 'Verification link' : 'Document view link'} copied directly!`);
                    setSelectedCert(null);
                    setTimeout(() => setToastMessage(""), 3000);
                  }}
                >
                  📋 Just copy raw link instead
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default UserDashboard;