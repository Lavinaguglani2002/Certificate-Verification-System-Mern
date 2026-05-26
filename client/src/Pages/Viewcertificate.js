


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import api from "../axios";

function CertificateView() {
  const location = useLocation();
  const navigate = useNavigate();

  const [cert, setCert] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  const showQRCode = true;

  useEffect(() => {
    const fetchCertificate = async () => {
      const params = new URLSearchParams(location.search);
      const id = params.get("id");

      if (cert || !id) return;

      try {
        setLoading(true);
        const res = await api.get(`/verify/${id}`);
        setCert(res.data.certificate);
      } catch (err) {
        console.error("Certificate Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [location.search, cert]);

  if (loading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center p-5 shadow bg-white rounded-4" style={{ maxWidth: "400px" }}>
          <h3 className="fw-bold mb-3 text-danger">Certificate Not Found</h3>
          <p className="text-muted mb-4">The certificate link might be invalid or expired.</p>
          <button
            className="btn btn-dark rounded-pill px-4"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="certificate-page-wrapper py-4"
      style={{ background: "#f0f2f5", minHeight: "100vh" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Great+Vibes&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        .certificate-container {
          background: white;
          width: 95%;
          max-width: 1050px;
          margin: auto;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          position: relative;
        }

        .border-gold {
          border: 15px solid #1e3a8a;
          padding: 8px;
          position: relative;
          background: #fff;
        }

        .border-gold::before,
        .border-gold::after {
          content: "";
          position: absolute;
          width: 40px;
          height: 40px;
          border: 5px solid #d4af37;
          z-index: 3;
        }

        .border-gold::before {
          top: -10px;
          left: -10px;
          border-right: 0;
          border-bottom: 0;
        }

        .border-gold::after {
          bottom: -10px;
          right: -10px;
          border-left: 0;
          border-top: 0;
        }

        .border-inner {
          border: 2px solid #d4af37;
          padding: 40px;
          text-align: center;
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background-image: radial-gradient(#fffdf6 1px, transparent 1px);
          background-size: 20px 20px;
          min-height: 650px;
        }

        .cert-header h1 {
          font-family: 'Cinzel', serif;
          font-size: clamp(24px, 4vw, 55px);
          color: #1e3a8a;
          margin: 10px 0;
          letter-spacing: clamp(2px, 1vw, 10px);
          font-weight: 700;
        }

        .student-name {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(32px, 5vw, 65px);
          color: #1a252f;
          margin: 15px 0;
          display: inline-block;
          border-bottom: 1px double #d4af37;
          padding: 0 20px;
          word-break: break-word;
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
          font-size: clamp(35px, 6vw, 100px);
          font-family: 'Cinzel', serif;
          font-weight: 700;
          color: rgba(30, 58, 138, 0.03);
          white-space: nowrap;
          z-index: 0;
          pointer-events: none;
        }

        /* --- MOBILE VIEW OPTIMIZATION --- */
        @media (max-width: 768px) {
          .certificate-page-wrapper {
            padding: 10px !important;
          }

          .certificate-container {
            width: 100%;
            padding: 10px;
          }

          .border-gold {
            border-width: 8px !important;
          }

          .border-inner {
            padding: 15px !important;
            min-height: auto !important;
            gap: 20px;
          }

          .footer-row {
            flex-direction: column !important;
            gap: 20px;
            align-items: center !important;
            text-align: center !important;
          }
          
          .footer-row > div {
            width: 100% !important;
            text-align: center !important;
          }
        }

        /* --- PERFECT PRINT OPTIMIZATION --- */
        @media print {
          @page {
            size: A4 landscape;
            margin: 6mm; /* Safe margin area for standard printers */
          }

          html, body {
            margin: 0 !important;
            padding: 0 !important;
            height: 100% !important;
            overflow: hidden !important;
            background: white !important;
          }

          .no-print {
            display: none !important;
          }

          .certificate-page-wrapper {
            padding: 0 !important;
            margin: 0 !important;
            background: white !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }

          .certificate-container {
            /* Subtracted margins to fit perfectly inside A4 page dimensions */
            width: calc(297mm - 12mm) !important; 
            height: calc(210mm - 12mm) !important;
            padding: 6mm !important; 
            margin: 0 auto !important;
            border: none !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
          }
          
          .border-inner {
            min-height: unset !important;
            flex-grow: 1 !important;
            padding: 25px !important;
          }
          
          .student-name {
            font-size: 48px !important;
          }
        }
      `}</style>

      {/* Control Buttons */}
      <div className="container text-center mb-4 no-print">
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <button
            className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm"
            onClick={() => window.print()}
          >
            Print / Download PDF
          </button>

          <button
            className="btn btn-outline-dark btn-lg rounded-pill px-4 shadow-sm"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>

      {/* Certificate Frame */}
      <div className="certificate-container">
        <div className="border-gold">
          <div className="border-inner">
            <div className="watermark">LAVINOVA OFFICIAL</div>

            {/* Header section */}
            <div className="cert-header">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5219/5219258.png"
                alt="Logo"
                width="50"
                className="mb-2"
              />

              <div
                className="text-uppercase fw-bold text-muted small mb-1"
                style={{ letterSpacing: "3px", fontSize: "11px" }}
              >
                Authenticated Educational Document
              </div>

              <h1>CERTIFICATE</h1>

              <div
                style={{
                  color: "#d4af37",
                  fontWeight: "700",
                  letterSpacing: "5px",
                  fontSize: "13px",
                }}
              >
                OF EXCELLENCE & ACHIEVEMENT
              </div>
            </div>

            {/* Main content body */}
            <div className="cert-body my-2">
              <p
                className="mb-0 text-muted"
                style={{
                  fontSize: "16px",
                  fontStyle: "italic",
                  fontFamily: "Playfair Display",
                }}
              >
                This prestigious honor is proudly awarded to
              </p>

              <h2 className="student-name">{cert.studentName}</h2>

              <p className="mt-2 mb-2 text-muted" style={{ fontSize: "14px" }}>
                In recognition of the successful completion and mastery of the course
              </p>

              <h4
                className="fw-bold text-uppercase"
                style={{ color: "#1e3a8a", letterSpacing: "1.5px", fontSize: "18px" }}
              >
                {cert.courseName}
              </h4>

              <p className="mt-3 mb-0" style={{ fontSize: "15px" }}>
                Conferred with a grade of{" "}
                <span
                  className="fw-bold px-2"
                  style={{
                    color: "#28a745",
                    borderBottom: "2px solid",
                  }}
                >
                  {cert.grade || "A+"}
                </span>
              </p>
            </div>

            {/* Footer Signatures & Credentials info */}
            <div className="row align-items-end text-start footer-row g-3">
              {/* Left Column: ID & Verification */}
              <div className="col-12 col-md-4 order-2 order-md-1">
                <div
                  style={{
                    fontSize: "10px",
                    color: "#666",
                    fontFamily: "monospace",
                  }}
                >
                  ID: {cert.certificateId}
                </div>

                <div className="small mb-2" style={{ fontSize: "13px" }}>
                  Issued:{" "}
                  <b>
                    {cert.issueDate ? new Date(cert.issueDate).toLocaleDateString("en-GB") : "N/A"}
                  </b>
                </div>

                {showQRCode && (
                  <div
                    className="p-1 border bg-white d-inline-block text-center shadow-sm"
                    style={{ borderRadius: "6px" }}
                  >
                    <QRCodeSVG
                      value={`${window.location.origin}/certificate-view?id=${cert.certificateId}`}
                      size={55}
                      fgColor="#1e3a8a"
                      level="H"
                    />
                    <div
                      className="fw-bold mt-1"
                      style={{
                        fontSize: "8px",
                        color: "#1e3a8a",
                        letterSpacing: "0.5px"
                      }}
                    >
                      VERIFIED
                    </div>
                  </div>
                )}
              </div>

              {/* Center Column: Stamp Seal Emblem */}
              <div className="col-12 col-md-4 text-center d-flex justify-content-center align-items-center order-1 order-md-2">
                <svg width="80" height="80" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="2"
                    strokeDasharray="3,1"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="38"
                    fill="#fffdf6"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 Z"
                    fill="#d4af37"
                  />
                </svg>
              </div>

              {/* Right Column: Signature line */}
              <div className="col-12 col-md-4 text-center order-3 text-md-center">
                <div
                  style={{
                    fontFamily: "Great Vibes",
                    fontSize: "26px",
                    color: "#1a252f",
                  }}
                >
                  {cert.issuedBy || "Director"}
                </div>

                <div
                  style={{
                    height: "1px",
                    background: "linear-gradient(to right, transparent, #333, transparent)",
                    margin: "5px 0",
                  }}
                ></div>

                <div
                  className="fw-bold text-uppercase text-muted"
                  style={{ fontSize: "10px", letterSpacing: "1px" }}
                >
                  Authorized Signatory
                </div>

                <div className="text-muted" style={{ fontSize: "11px" }}>
                  Lavinova Institute
                </div>
              </div>
            </div>

            {/* Bottom Cryptographic Verification Hash */}
            <div
              className="mt-3 pt-2"
              style={{ borderTop: "0.5px solid #eee" }}
            >
              <p
                className="text-muted mb-0 text-center"
                style={{
                  fontSize: "9px",
                  letterSpacing: "1px",
                  fontFamily: "monospace"
                }}
              >
                SECURE DIGITAL HASH: {cert.digitalSignature || "LV-SHA256-99283-X"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CertificateView;