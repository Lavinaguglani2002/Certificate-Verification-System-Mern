


// import { useNavigate } from "react-router-dom";
// import { useEffect, useState, useMemo } from "react";
// import api from "../axios";

// function UserDashboard() {
//   const navigate = useNavigate();

//   // useMemo ka use kiya hai taaki user object baar-baar parse na ho aur infinite reload loop ruk jaye
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch (e) {
//       console.error("User parsing error:", e);
//       return null;
//     }
//   }, []);

//   const [certificates, setCertificates] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     // Agar user log-in nahi hai toh login page par bhej dega
//     if (!user || !token) {
//       navigate("/login");
//       return;
//     }

//     const fetchAll = async () => {
//       try {
//         setLoading(true);
//         const res = await api.get(`/user-certificates/${user?.email}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCertificates(res.data.certificates || []);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAll();
//   }, [navigate, user]);

//   // Search Filter logic
//   const filtered = certificates.filter(
//     (cert) =>
//       cert.certificateId?.toLowerCase().includes(search.toLowerCase()) ||
//       cert.courseName?.toLowerCase().includes(search.toLowerCase()) ||
//       cert.studentName?.toLowerCase().includes(search.toLowerCase()) ||
//       cert.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   // --- Sharing Helpers (App.js me path "/certificate-view" ke liye query string format) ---
//   const getShareUrl = (cert) => {
//     const baseUrl = window.location.origin; 
//     return `${baseUrl}/certificate-view?id=${cert.certificateId}`;
//   };

//   const shareOnWhatsApp = (cert) => {
//     const url = getShareUrl(cert);
//     const text = `Hey! Check out my official certificate for "${cert.courseName}" from Lavinova Portal. Verified ID: ${cert.certificateId}. Link: ${url}`;
//     window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
//   };

//   const shareOnLinkedIn = (cert) => {
//     const url = getShareUrl(cert);
//     window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
//   };

//   const copyToClipboard = (cert) => {
//     const url = getShareUrl(cert);
//     navigator.clipboard.writeText(url)
//       .then(() => alert("Shareable link copied to clipboard!"))
//       .catch((err) => console.error("Could not copy text: ", err));
//   };

//   return (
//     <div
//       className="min-vh-100 pb-5"
//       style={{
//         backgroundColor: "#f3f6f9",
//         fontFamily: "sans-serif",
//       }}
//     >
//       <style>{`
//         .stat-card {
//           border: none;
//           border-radius: 20px;
//           transition: all 0.3s ease;
//           background: white;
//           overflow: hidden;
//         }

//         .stat-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
//         }

//         .action-icon {
//           width: 50px;
//           height: 50px;
//           border-radius: 12px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 1.5rem;
//         }

//         .table-wrap {
//           background: white;
//           border-radius: 20px;
//           border: none;
//         }

//         .search-input-group {
//           background: white;
//           border-radius: 12px;
//           padding: 5px 15px;
//           border: 1px solid #e0e0e0;
//         }

//         .search-input-group input:focus {
//           outline: none;
//         }

//         .btn-view {
//           border-radius: 8px;
//           font-weight: 600;
//           padding: 6px 16px;
//           transition: 0.2s;
//         }

//         .btn-view:hover {
//           background: #0d6efd;
//           color: white !important;
//         }

//         .btn-share {
//           border-radius: 8px;
//           padding: 6px 12px;
//           font-size: 12px;
//           font-weight: 500;
//           display: inline-flex;
//           align-items: center;
//           gap: 4px;
//           transition: 0.2s;
//         }

//         .btn-share:hover {
//           opacity: 0.9;
//         }

//         .badge-verified {
//           background: #e8f5e9;
//           color: #2e7d32;
//           font-size: 10px;
//           font-weight: 700;
//           padding: 4px 10px;
//           border-radius: 50px;
//         }

//         .support-gradient-card {
//           background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
//           border-radius: 20px;
//           border: none;
//         }
//       `}</style>

//       {/* NAVBAR */}
//       <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3">
//         <div className="container">
//           <div className="d-flex align-items-center">
//             <div
//               className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-2"
//               style={{ width: "35px", height: "35px" }}
//             >
//               L
//             </div>
//             <span className="h5 fw-bold mb-0">Lavinova Portal</span>
//           </div>

//           <div className="dropdown">
//             <div
//               className="d-flex align-items-center gap-2"
//               data-bs-toggle="dropdown"
//               style={{ cursor: "pointer" }}
//             >
//               <div className="text-end d-none d-md-block">
//                 <div className="fw-bold small">{user?.name}</div>
//                 <div className="text-muted" style={{ fontSize: "10px" }}>
//                   Student Member
//                 </div>
//               </div>
//             </div>

//             <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 rounded-3">
//               <li>
//                 <button
//                   className="dropdown-item py-2"
//                   onClick={() => {
//                     localStorage.clear();
//                     navigate("/login");
//                   }}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </nav>

//       <div className="container mt-5">
//         {/* HEADER */}
//         <div className="mb-4">
//           <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-2">
//             Student Dashboard
//           </span>
//           <h2 className="fw-bold text-dark">
//             Welcome back, {user?.name || "Student"}! 👋
//           </h2>
//           <p className="text-muted mb-0">
//             Manage your official credentials and download certificates securely.
//           </p>
//         </div>

//         {/* TOP CARDS */}
//         <div className="row g-4 mb-5">
//           <div className="col-md-4">
//             <div
//               onClick={() => navigate("/verify-certificate")}
//               className="stat-card card p-4 shadow-sm"
//               style={{ cursor: "pointer" }}
//             >
//               <div className="d-flex align-items-center gap-3">
//                 <div className="action-icon bg-primary text-white shadow">🔏</div>
//                 <div>
//                   <h6 className="fw-bold mb-1">Verify ID</h6>
//                   <p className="text-muted small mb-0">Check authenticity</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="stat-card card p-4 shadow-sm">
//               <div className="d-flex align-items-center gap-3">
//                 <div className="action-icon bg-success text-white shadow">🏅</div>
//                 <div>
//                   <h6 className="fw-bold mb-1">Documents</h6>
//                   <p className="text-muted small mb-0">
//                     {certificates.length} Files found
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4">
//             <div className="stat-card card p-4 shadow-sm bg-dark text-white">
//               <div className="d-flex align-items-center gap-3">
//                 <div className="action-icon bg-warning text-dark">👤</div>
//                 <div>
//                   <h6 className="fw-bold mb-1 text-white">Identity</h6>
//                   <span className="badge bg-success" style={{ fontSize: "9px" }}>
//                     VERIFIED PORTAL
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="row g-4">
//           <div className="col-lg-9">
//             <div className="card table-wrap shadow-sm border-0">
//               <div className="p-4 border-bottom d-md-flex justify-content-between align-items-center">
//                 <h5 className="fw-bold mb-3 mb-md-0">Academic Documents</h5>
//                 <div
//                   className="search-input-group d-flex align-items-center"
//                   style={{ minWidth: "320px" }}
//                 >
//                   <input
//                     type="text"
//                     className="border-0 w-100 small"
//                     placeholder="Search Name, Email, Course or ID..."
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="card-body p-0">
//                 <div className="table-responsive">
//                   <table className="table table-hover align-middle mb-0">
//                     <thead className="bg-light">
//                       <tr style={{ fontSize: "12px", color: "#666" }}>
//                         <th className="ps-4 py-3">STUDENT DETAILS</th>
//                         <th>COURSE / PROGRAM</th>
//                         <th>VERIFICATION ID</th>
//                         <th className="text-end pe-4">ACTION</th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {loading ? (
//                         <tr>
//                           <td colSpan="4" className="text-center py-5">
//                             <div className="spinner-border text-primary"></div>
//                           </td>
//                         </tr>
//                       ) : filtered.length > 0 ? (
//                         filtered.map((cert) => (
//                           <tr key={cert._id}>
//                             <td className="ps-4 py-3">
//                               <div className="d-flex align-items-center">
//                                 <div
//                                   className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3 text-primary fw-bold"
//                                   style={{
//                                     width: "38px",
//                                     height: "38px",
//                                     fontSize: "12px",
//                                   }}
//                                 >
//                                   {cert.studentName
//                                     ? cert.studentName
//                                         .split(" ")
//                                         .map((n) => n[0])
//                                         .join("")
//                                     : "S"}
//                                 </div>
//                                 <div>
//                                   <div className="fw-bold small">
//                                     {cert.studentName}
//                                   </div>
//                                   <div
//                                     className="text-muted"
//                                     style={{ fontSize: "11px" }}
//                                   >
//                                     {cert.email}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>

//                             <td>
//                               <div className="fw-semibold small">
//                                 {cert.courseName}
//                               </div>
//                               <span className="badge-verified">Official</span>
//                             </td>

//                             <td>
//                               <code
//                                 className="text-primary fw-bold"
//                                 style={{
//                                   fontSize: "12px",
//                                   background: "#f0f4ff",
//                                   padding: "4px 8px",
//                                   borderRadius: "4px",
//                                 }}
//                               >
//                                 {cert.certificateId}
//                               </code>
//                             </td>

//                             <td className="text-end pe-4">
//                               <div className="d-flex flex-wrap gap-2 align-items-center justify-content-start">
//   {/* Primary Action View Doc */}
//   <button
//     className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm d-flex align-items-center gap-1"
//     style={{ fontWeight: "600", fontSize: "13px" }}
//     onClick={() => navigate(`/certificate-view?id=${cert.certificateId}`)}
//   >
//     <span>View Doc</span>
//   </button>

//   {/* WhatsApp Share */}
//   <button
//     className="btn btn-success btn-sm rounded-pill px-3 d-flex align-items-center gap-1 border-0"
//     style={{ 
//       backgroundColor: "#25D366", 
//       fontWeight: "500", 
//       fontSize: "12px",
//       transition: "all 0.2s" 
//     }}
//     onClick={() => {
//       const url = `${window.location.origin}/certificate-view?id=${cert.certificateId}`;
//       window.open(`https://api.whatsapp.com/send?text=Check out my certificate: ${url}`, '_blank');
//     }}
//   >
//     <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
//       <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.101-1.194-.588-1.379-.653-.185-.069-.32-.103-.454.101-.135.202-.52.653-.637.786-.117.135-.235.151-.437.051-2.01-1.006-2.641-1.786-3.115-2.597-.126-.217-.013-.334.096-.442.1-.099.203-.233.303-.349.101-.116.135-.197.203-.33.067-.133.033-.252-.017-.353-.05-.101-.419-1.01-.574-1.386-.152-.369-.307-.319-.42-.325-.108-.005-.23-.006-.353-.006a.629.629 0 0 0-.455.214c-.156.171-.595.58-.595 1.417 0 .837.608 1.644.692 1.758.084.114 1.194 1.823 2.895 2.559.405.175.721.28.967.358.407.13 1.178.118 1.625.05.498-.074 1.194-.489 1.362-1.011.168-.522.168-.968.117-1.061-.051-.093-.185-.142-.387-.243z"/>
//     </svg>
//     <span>WhatsApp</span>
//   </button>

//   {/* LinkedIn Share */}
//   <button
//     className="btn btn-sm rounded-pill px-3 d-flex align-items-center gap-1 border-0 text-white"
//     style={{ 
//       backgroundColor: "#0077B5", 
//       fontWeight: "500", 
//       fontSize: "12px",
//       transition: "all 0.2s" 
//     }}
//     onClick={() => {
//       const url = `${window.location.origin}/certificate-view?id=${cert.certificateId}`;
//       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
//     }}
//   >
//     <svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
//       <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
//     </svg>
//     <span>LinkedIn</span>
//   </button>

//   {/* Sleek Outline Copy Link */}
//   <button
//     className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
//     style={{ 
//       fontWeight: "500", 
//       fontSize: "12px",
//       border: "1px solid #ced4da" 
//     }}
//     onClick={() => {
//       const url = `${window.location.origin}/certificate-view?id=${cert.certificateId}`;
//       navigator.clipboard.writeText(url);
//       alert("Link copied to clipboard!");
//     }}
//   >
//     <svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
//       <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
//       <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.586-.586a1.003 1.003 0 0 0 .154-.199 2 2 0 0 1-.861-3.337L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
//     </svg>
//     <span>Copy Link</span>
//   </button>
// </div>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td colSpan="4" className="text-center py-5 text-muted">
//                             No certificates found for "<b>{search}</b>"
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SUPPORT CARD */}
//           <div className="col-lg-3">
//             <div className="card support-gradient-card text-white p-4 h-100 d-flex flex-column justify-content-between text-center shadow-sm">
//               <div>
//                 <div className="fs-1 mb-2">🛡️</div>
//                 <h5 className="fw-bold text-white mb-2">Need Support?</h5>
//                 <p className="small text-white-50">
//                   If there is any correction needed in your credentials, contact the admin helpdesk directly.
//                 </p>
//               </div>

//               <div className="border-top border-secondary pt-3 mt-4">
//                 <p className="small mb-2 text-white-50">Write an email to us:</p>
//                 <a
//                   href="mailto:support@lavinova.com"
//                   className="btn btn-sm btn-light w-100 rounded-3 fw-bold py-2 text-dark"
//                 >
//                   ✉️ Email Admin Desk
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserDashboard;


import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import api from "../axios";

function UserDashboard() {
  const navigate = useNavigate();

  // useMemo ka use kiya hai taaki user object baar-baar parse na ho aur infinite reload loop ruk jaye
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      console.error("User parsing error:", e);
      return null;
    }
  }, []);

  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Agar user log-in nahi hai toh login page par bhej dega
    if (!user || !token) {
      navigate("/login");
      return;
    }

    const fetchAll = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/user-certificates/${user?.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCertificates(res.data.certificates || []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [navigate, user]);

  // Search Filter logic
  const filtered = certificates.filter(
    (cert) =>
      cert.certificateId?.toLowerCase().includes(search.toLowerCase()) ||
      cert.courseName?.toLowerCase().includes(search.toLowerCase()) ||
      cert.studentName?.toLowerCase().includes(search.toLowerCase()) ||
      cert.email?.toLowerCase().includes(search.toLowerCase())
  );

  // --- Sharing Helpers ---
  const getShareUrl = (cert) => {
    const baseUrl = window.location.origin; 
    return `${baseUrl}/certificate-view?id=${cert.certificateId}`;
  };

  const shareOnWhatsApp = (cert) => {
    const url = getShareUrl(cert);
    const text = `Hey! Check out my official certificate for "${cert.courseName}" from Lavinova Portal. Verified ID: ${cert.certificateId}. Link: ${url}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareOnLinkedIn = (cert) => {
    const url = getShareUrl(cert);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
  };

  const copyToClipboard = (cert) => {
    const url = getShareUrl(cert);
    navigator.clipboard.writeText(url)
      .then(() => alert("Shareable link copied to clipboard!"))
      .catch((err) => console.error("Could not copy text: ", err));
  };

  return (
    <div
      className="min-vh-100 pb-5"
      style={{
        backgroundColor: "#f3f6f9",
        fontFamily: "sans-serif",
      }}
    >
      <style>{`
        .stat-card {
          border: none;
          border-radius: 20px;
          transition: all 0.3s ease;
          background: white;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08) !important;
        }

        .action-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .search-input-group {
          background: white;
          border-radius: 12px;
          padding: 8px 15px;
          border: 1px solid #e0e0e0;
        }

        .search-input-group input:focus {
          outline: none;
        }

        .support-gradient-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 20px;
          border: none;
        }

        .document-item-card {
          border: 1px solid #edf2f7;
          border-radius: 16px;
          transition: all 0.2s ease-in-out;
        }

        .document-item-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top py-3">
        <div className="container">
          <div className="d-flex align-items-center">
            <div
              className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-2"
              style={{ width: "35px", height: "35px" }}
            >
              L
            </div>
            <span className="h5 fw-bold mb-0">Lavinova Portal</span>
          </div>

          <div className="dropdown">
            <div
              className="d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            >
              <div className="text-end d-none d-md-block">
                <div className="fw-bold small">{user?.name}</div>
                <div className="text-muted" style={{ fontSize: "10px" }}>
                  Student Member
                </div>
              </div>
            </div>

            <ul className="dropdown-menu dropdown-menu-end border-0 shadow-lg mt-2 rounded-3">
              <li>
                <button
                  className="dropdown-item py-2"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5">
        {/* HEADER */}
        <div className="mb-4">
          <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fw-bold mb-2">
            Student Dashboard
          </span>
          <h2 className="fw-bold text-dark">
            Welcome back, {user?.name || "Student"}! 👋
          </h2>
          <p className="text-muted mb-0">
            Manage your official credentials and download certificates securely.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              onClick={() => navigate("/verify-certificate")}
              className="stat-card card p-4 shadow-sm"
              style={{ cursor: "pointer" }}
            >
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
                  <p className="text-muted small mb-0">
                    {certificates.length} Files found
                  </p>
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
                  <span className="badge bg-success" style={{ fontSize: "9px" }}>
                    VERIFIED PORTAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN BODY AREA */}
        <div className="row g-4">
          <div className="col-lg-9">
            <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
              {/* Card Title & Search Header */}
              <div className="d-md-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold text-dark mb-3 mb-md-0">Academic Documents</h5>
                <div className="search-input-group d-flex align-items-center" style={{ minWidth: "300px" }}>
                  <input
                    type="text"
                    className="border-0 w-100 small"
                    placeholder="Search Name, Email, Course or ID..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* Responsive Row Items Area instead of traditional Table */}
              <div className="d-flex flex-column gap-3">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary"></div>
                  </div>
                ) : filtered.length > 0 ? (
                  filtered.map((cert) => (
                    <div key={cert._id} className="document-item-card bg-white p-3">
                      <div className="row align-items-center g-3">
                        
                        {/* 1. Student Details */}
                        <div className="col-12 col-md-3">
                          <div className="d-flex align-items-center gap-3">
                            <div
                              className="bg-light rounded-circle d-flex align-items-center justify-content-center text-primary fw-bold shadow-sm"
                              style={{ width: "42px", height: "42px", fontSize: "13px", minWidth: "42px" }}
                            >
                              {cert.studentName
                                ? cert.studentName.split(" ").map((n) => n[0]).join("")
                                : "S"}
                            </div>
                            <div>
                              <div className="fw-bold text-dark" style={{ fontSize: "14px" }}>{cert.studentName}</div>
                              <div className="text-muted" style={{ fontSize: "11px" }}>{cert.email}</div>
                            </div>
                          </div>
                        </div>

                        {/* 2. Course Details */}
                        <div className="col-12 col-sm-6 col-md-3">
                          <div>
                            <span className="text-uppercase text-muted d-block d-md-none fw-bold mb-1" style={{ fontSize: "9px" }}>Course</span>
                            <div className="fw-bold text-dark mb-1" style={{ fontSize: "13.5px", lineHeight: "1.3" }}>{cert.courseName}</div>
                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2 py-1" style={{ fontSize: "10px", fontWeight: "600" }}>Official</span>
                          </div>
                        </div>

                        {/* 3. Verification ID */}
                        <div className="col-12 col-sm-6 col-md-2">
                          <div>
                            <span className="text-uppercase text-muted d-block d-md-none fw-bold mb-1" style={{ fontSize: "9px" }}>Verification ID</span>
                            <code
                              className="text-primary fw-bold d-inline-block"
                              style={{
                                fontSize: "11px",
                                background: "#f0f4ff",
                                padding: "4px 10px",
                                borderRadius: "6px",
                              }}
                            >
                              {cert.certificateId}
                            </code>
                          </div>
                        </div>

                        {/* 4. Optimized Action Buttons */}
                        <div className="col-12 col-md-4 text-md-end">
                          <div className="d-flex flex-wrap gap-2 justify-content-start justify-content-md-end align-items-center">
                            
                            {/* View Doc */}
                            <button
                              className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                              style={{ fontWeight: "600", fontSize: "12px", height: "34px" }}
                              onClick={() => navigate(`/certificate-view?id=${cert.certificateId}`)}
                            >
                              View Doc
                            </button>

                            {/* WhatsApp */}
                            <button
                              className="btn text-white btn-sm rounded-pill px-3 d-flex align-items-center gap-1.5 border-0"
                              style={{ backgroundColor: "#25D366", fontWeight: "500", fontSize: "11px", height: "34px" }}
                              onClick={() => shareOnWhatsApp(cert)}
                            >
                              <svg width="13" height="13" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.98c-.202-.101-1.194-.588-1.379-.653-.185-.069-.32-.103-.454.101-.135.202-.52.653-.637.786-.117.135-.235.151-.437.051-2.01-1.006-2.641-1.786-3.115-2.597-.126-.217-.013-.334.096-.442.1-.099.203-.233.303-.349.101-.116.135-.197.203-.33.067-.133.033-.252-.017-.353-.05-.101-.419-1.01-.574-1.386-.152-.369-.307-.319-.42-.325-.108-.005-.23-.006-.353-.006a.629.629 0 0 0-.455.214c-.156.171-.595.58-.595 1.417 0 .837.608 1.644.692 1.758.084.114 1.194 1.823 2.895 2.559.405.175.721.28.967.358.407.13 1.178.118 1.625.05.498-.074 1.194-.489 1.362-1.011.168-.522.168-.968.117-1.061-.051-.093-.185-.142-.387-.243z"/>
                              </svg>
                              <span>WhatsApp</span>
                            </button>

                            {/* LinkedIn */}
                            <button
                              className="btn text-white btn-sm rounded-pill px-3 d-flex align-items-center gap-1.5 border-0"
                              style={{ backgroundColor: "#0077B5", fontWeight: "500", fontSize: "11px", height: "34px" }}
                              onClick={() => shareOnLinkedIn(cert)}
                            >
                              <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                              </svg>
                              <span>LinkedIn</span>
                            </button>

                            {/* Copy Link */}
                            <button
                              className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-1.5"
                              style={{ fontWeight: "500", fontSize: "11px", height: "34px", borderColor: "#dee2e6" }}
                              onClick={() => copyToClipboard(cert)}
                            >
                              <svg width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/>
                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.586-.586a1.003 1.003 0 0 0 .154-.199 2 2 0 0 1-.861-3.337L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/>
                              </svg>
                              <span>Copy Link</span>
                            </button>

                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5 text-muted">
                    No certificates found for "<b>{search}</b>"
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SUPPORT CARD */}
          <div className="col-lg-3">
            <div className="card support-gradient-card text-white p-4 h-100 d-flex flex-column justify-content-between text-center shadow-sm">
              <div>
                <div className="fs-1 mb-2">🛡️</div>
                <h5 className="fw-bold text-white mb-2">Need Support?</h5>
                <p className="small text-white-50">
                  If there is any correction needed in your credentials, contact the admin helpdesk directly.
                </p>
              </div>

              <div className="border-top border-secondary pt-3 mt-4">
                <p className="small mb-2 text-white-50">Write an email to us:</p>
                <a
                  href="mailto:support@lavinova.com"
                  className="btn btn-sm btn-light w-100 rounded-3 fw-bold py-2 text-dark"
                >
                  ✉️ Email Admin Desk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;