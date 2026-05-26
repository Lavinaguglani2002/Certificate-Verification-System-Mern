

// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import api from "../axios";

// function UserDashboard() {
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user") || "{}");
//   const token = localStorage.getItem("token");

//   const initials =
//     user?.name?.split(" ").map(n => n[0]).join("").toUpperCase() || "U";

//   const [certificates, setCertificates] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [toastMessage, setToastMessage] = useState("");
//   const [selectedCert, setSelectedCert] = useState(null);
//   const [shareType, setShareType] = useState("link");

//   // SHARE URL
//   const getShareableUrl = (cert, type) => {
//     if (type === "link") {
//       return `${window.location.origin}/verify-certificate/${cert.certificateId}`;
//     } else {
//       return `${window.location.origin}/certificate-view?id=${cert.certificateId}`;
//     }
//   };

//   // WHATSAPP
//   const shareToWhatsApp = (cert) => {
//     const finalUrl = getShareableUrl(cert, shareType);

//     const text =
//       shareType === "link"
//         ? `Check certificate for ${cert.courseName}\n\nVerify: ${finalUrl}`
//         : `View certificate: ${finalUrl}`;

//     window.open(
//       `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
//       "_blank"
//     );
//   };

//   // LINKEDIN
//   const shareToLinkedIn = (cert) => {
//     const finalUrl = getShareableUrl(cert, shareType);

//     window.open(
//       `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(finalUrl)}`,
//       "_blank"
//     );
//   };

//   // FETCH DATA
//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         setLoading(true);

//         const res = await api.get(
//           `/user-certificates/${user?.email}`,
//           {
//             headers: { Authorization: `Bearer ${token}` }
//           }
//         );

//         setCertificates(res.data.certificates || []);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!user || !token) {
//       navigate("/login");
//       return;
//     }

//     fetchAll();
//   }, [navigate, user?.email, token]);

//   // FILTER (FIXED ERROR)
//   const filtered = certificates.filter((cert) =>
//     cert.certificateId?.toLowerCase().includes(search.toLowerCase()) ||
//     cert.courseName?.toLowerCase().includes(search.toLowerCase()) ||
//     cert.studentName?.toLowerCase().includes(search.toLowerCase()) ||
//     cert.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="container py-4">

//       {/* HEADER */}
//       <h2>Welcome {user?.name}</h2>

//       {/* SEARCH */}
//       <input
//         type="text"
//         className="form-control my-3"
//         placeholder="Search certificates..."
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//       />

//       {/* LOADING */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="row">
//           {filtered.length > 0 ? (
//             filtered.map((cert) => (
//               <div key={cert._id} className="col-md-4 mb-3">
//                 <div className="card p-3">

//                   <h5>{cert.courseName}</h5>
//                   <p>{cert.certificateId}</p>

//                   <button
//                     className="btn btn-primary btn-sm me-2"
//                     onClick={() =>
//                       navigate("/certificate-view", { state: cert })
//                     }
//                   >
//                     View
//                   </button>

//                   <button
//                     className="btn btn-success btn-sm"
//                     onClick={() => setSelectedCert(cert)}
//                   >
//                     Share
//                   </button>

//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No certificates found</p>
//           )}
//         </div>
//       )}

//       {/* TOAST */}
//       {toastMessage && (
//         <div className="alert alert-success position-fixed top-0 end-0 m-3">
//           {toastMessage}
//         </div>
//       )}
//     </div>
//   );
// }

// export default UserDashboard;


import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../axios";

function UserDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [certificates, setCertificates] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get(
          `/user-certificates/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
  }, [navigate, user]);

  const filtered = certificates.filter(
    (cert) =>
      cert.certificateId
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      cert.courseName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      cert.studentName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      cert.email?.toLowerCase().includes(search.toLowerCase())
  );

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

        .table-wrap {
          background: white;
          border-radius: 20px;
          border: none;
        }

        .search-input-group {
          background: white;
          border-radius: 12px;
          padding: 5px 15px;
          border: 1px solid #e0e0e0;
        }

        .search-input-group input:focus {
          outline: none;
        }

        .btn-view {
          border-radius: 8px;
          font-weight: 600;
          padding: 6px 16px;
          transition: 0.2s;
        }

        .btn-view:hover {
          background: #0d6efd;
          color: white !important;
        }

        .badge-verified {
          background: #e8f5e9;
          color: #2e7d32;
          font-size: 10px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 50px;
        }

        .support-gradient-card {
          background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
          border-radius: 20px;
          border: none;
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

            <span className="h5 fw-bold mb-0">
              Lavinova Portal
            </span>
          </div>

          <div className="dropdown">
            <div
              className="d-flex align-items-center gap-2"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            >
              <div className="text-end d-none d-md-block">
                <div className="fw-bold small">
                  {user?.name}
                </div>

                <div
                  className="text-muted"
                  style={{ fontSize: "10px" }}
                >
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
            Manage your official credentials and
            download certificates securely.
          </p>
        </div>

        {/* TOP CARDS */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div
              onClick={() =>
                navigate("/verify-certificate")
              }
              className="stat-card card p-4 shadow-sm"
              style={{ cursor: "pointer" }}
            >
              <div className="d-flex align-items-center gap-3">
                <div className="action-icon bg-primary text-white shadow">
                  🔏
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Verify ID
                  </h6>

                  <p className="text-muted small mb-0">
                    Check authenticity
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="stat-card card p-4 shadow-sm">
              <div className="d-flex align-items-center gap-3">
                <div className="action-icon bg-success text-white shadow">
                  🏅
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Documents
                  </h6>

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
                <div className="action-icon bg-warning text-dark">
                  👤
                </div>

                <div>
                  <h6 className="fw-bold mb-1 text-white">
                    Identity
                  </h6>

                  <span
                    className="badge bg-success"
                    style={{ fontSize: "9px" }}
                  >
                    VERIFIED PORTAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="row g-4">
          <div className="col-lg-9">
            <div className="card table-wrap shadow-sm border-0">
              <div className="p-4 border-bottom d-md-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-3 mb-md-0">
                  Academic Documents
                </h5>

                <div
                  className="search-input-group d-flex align-items-center"
                  style={{ minWidth: "320px" }}
                >
                  <input
                    type="text"
                    className="border-0 w-100 small"
                    placeholder="Search Name, Email, Course or ID..."
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead className="bg-light">
                      <tr
                        style={{
                          fontSize: "12px",
                          color: "#666",
                        }}
                      >
                        <th className="ps-4 py-3">
                          STUDENT DETAILS
                        </th>

                        <th>COURSE / PROGRAM</th>

                        <th>VERIFICATION ID</th>

                        <th className="text-end pe-4">
                          ACTION
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {loading ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-5"
                          >
                            <div className="spinner-border text-primary"></div>
                          </td>
                        </tr>
                      ) : filtered.length > 0 ? (
                        filtered.map((cert) => (
                          <tr key={cert._id}>
                            <td className="ps-4 py-3">
                              <div className="d-flex align-items-center">
                                <div
                                  className="bg-light rounded-circle d-flex align-items-center justify-content-center me-3 text-primary fw-bold"
                                  style={{
                                    width: "38px",
                                    height: "38px",
                                    fontSize: "12px",
                                  }}
                                >
                                  {cert.studentName
                                    ? cert.studentName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                    : "S"}
                                </div>

                                <div>
                                  <div className="fw-bold small">
                                    {cert.studentName}
                                  </div>

                                  <div
                                    className="text-muted"
                                    style={{
                                      fontSize: "11px",
                                    }}
                                  >
                                    {cert.email}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="fw-semibold small">
                                {cert.courseName}
                              </div>

                              <span className="badge-verified">
                                Official
                              </span>
                            </td>

                            <td>
                              <code
                                className="text-primary fw-bold"
                                style={{
                                  fontSize: "12px",
                                  background: "#f0f4ff",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                }}
                              >
                                {cert.certificateId}
                              </code>
                            </td>

                            <td className="text-end pe-4">
                              <button
                                onClick={() =>
                                  navigate(
                                    "/certificate-view",
                                    { state: cert }
                                  )
                                }
                                className="btn btn-outline-primary btn-view btn-sm"
                              >
                                View Doc
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-5 text-muted"
                          >
                            No certificates found for "
                            <b>{search}</b>"
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* SUPPORT CARD */}
          <div className="col-lg-3">
            <div className="card support-gradient-card text-white p-4 h-100 d-flex flex-column justify-content-between text-center shadow-sm">
              <div>
                <div className="fs-1 mb-2">🛡️</div>

                <h5 className="fw-bold text-white mb-2">
                  Need Support?
                </h5>

                <p className="small text-white-50">
                  If there is any correction needed in
                  your credentials, contact the admin
                  helpdesk directly.
                </p>
              </div>

              <div className="border-top border-secondary pt-3 mt-4">
                <p className="small mb-2 text-white-50">
                  Write an email to us:
                </p>

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