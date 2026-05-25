import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

function CertificateView() {
  const location = useLocation();
  const navigate = useNavigate();
  const cert = location.state;

  const showQRCode = true;

  if (!cert) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center p-5 shadow bg-white rounded-4">
          <h3 className="fw-bold mt-3">Certificate Not Found</h3>
          <button className="btn btn-dark rounded-pill px-4" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="certificate-page-wrapper py-md-4" style={{ background: "#f0f2f5", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Great+Vibes&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap');

        * {
          box-sizing: border-box;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Screen Container */
        .certificate-container {
          background: white;
          width: 95%;
          max-width: 1050px;
          margin: auto;
          padding: 20px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          position: relative;
        }

        .border-gold {
          border: 15px solid #1e3a8a;
          padding: 8px;
          position: relative;
          background: #fff;
        }

        .border-gold::before, .border-gold::after {
          content: "";
          position: absolute;
          width: 40px;
          height: 40px;
          border: 5px solid #d4af37;
          z-index: 3;
        }
        .border-gold::before { top: -10px; left: -10px; border-right: 0; border-bottom: 0; }
        .border-gold::after { bottom: -10px; right: -10px; border-left: 0; border-top: 0; }

        .border-inner {
          border: 2px solid #d4af37;
          padding: 30px 40px;
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
          font-size: clamp(30px, 5vw, 55px);
          color: #1e3a8a;
          margin: 10px 0;
          letter-spacing: clamp(4px, 1vw, 10px);
          font-weight: 700;
        }

        .student-name {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(40px, 6vw, 65px);
          color: #1a252f;
          margin: 10px 0;
          display: inline-block;
          border-bottom: 1px double #d4af37;
          padding: 0 20px;
        }

        .watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-30deg);
          font-size: clamp(50px, 8vw, 100px);
          font-family: 'Cinzel', serif;
          font-weight: 700;
          color: rgba(30, 58, 138, 0.03);
          white-space: nowrap;
          z-index: 0;
          pointer-events: none;
        }

        /* MOBILE OPTIMIZATION */
        @media (max-width: 768px) {
          .certificate-container { width: 98%; padding: 10px; }
          .border-gold { border-width: 10px !important; }
          .border-inner { padding: 15px !important; min-height: auto !important; }
          .row.footer-row { flex-direction: column !important; gap: 20px; align-items: center !important; text-align: center !important; }
          .col-4 { width: 100% !important; }
          .student-name { font-size: 45px !important; }
        }

        /* PRINT LOGIC - 1 PAGE STRICT */
/* Is code ko apne <style> tag ke andar purane print CSS se replace karein */
@media print {
  @page {
    size: A4 landscape; /* Browser ko batayega ki landscape print karna hai */
    margin: 0mm; 
  }
  
  html, body {
    margin: 0 !important;
    padding: 0 !important;
    height: 100vh !important;
    overflow: hidden !important;
  }

  .no-print, nav, footer, .navbar { 
    display: none !important; /* Extra cheezein hide karne ke liye */
  }

  .certificate-page-wrapper {
    padding: 0 !important;
    margin: 0 !important;
    background: white !important;
    height: 100vh !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .certificate-container {
    width: 297mm !important; /* A4 Landscape Width */
    height: 210mm !important; /* A4 Landscape Height */
    padding: 10mm !important;
    margin: 0 !important;
    border: none !important;
    box-shadow: none !important;
    transform: scale(0.98); /* Safety margin taaki corners na kotein */
  }
}
`}</style>

      {/* Control Buttons */}
      <div className="container text-center mb-4 no-print">
        <div className="d-flex justify-content-center gap-2 flex-wrap">
          <button className="btn btn-primary btn-lg rounded-pill px-4" onClick={() => window.print()}>
            <i className="bi bi-printer-fill me-2"></i> Print / Download
          </button>
          <button className="btn btn-outline-dark btn-lg rounded-pill px-4" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
        <p className="small text-muted mt-2 d-none d-md-block">Desktop: Use <b>Landscape</b> mode & <b>Margins: None</b></p>
      </div>

      {/* Certificate Main UI */}
      <div className="certificate-container">
        <div className="border-gold">
          <div className="border-inner">
            <div className="watermark">LAVINOVA OFFICIAL</div>

            <div className="cert-header">
              <img src="https://cdn-icons-png.flaticon.com/512/5219/5219258.png" alt="Logo" width="55" className="mb-2" />
              <div className="text-uppercase fw-bold text-muted small mb-1" style={{ letterSpacing: "3px" }}>
                Authenticated Educational Document
              </div>
              <h1>CERTIFICATE</h1>
              <div style={{ color: "#d4af37", fontWeight: "700", letterSpacing: "5px", fontSize: "14px" }}>
                OF EXCELLENCE & ACHIEVEMENT
              </div>
            </div>

            <div className="cert-body">
              <p className="mb-0 text-muted" style={{ fontSize: "17px", fontStyle: "italic", fontFamily: "Playfair Display" }}>
                This prestigious honor is proudly awarded to
              </p>
              <h2 className="student-name">{cert.studentName}</h2>
              <p className="mt-2 mb-1 text-muted">In recognition of the successful completion and mastery of the course</p>
              <h4 className="fw-bold text-uppercase" style={{ color: "#1e3a8a", letterSpacing: "1.5px" }}>
                {cert.courseName}
              </h4>
              <p className="mt-2">
                Conferred with a grade of <span className="fw-bold px-2" style={{ color: "#28a745", borderBottom: "2px solid" }}>{cert.grade || "A+"}</span>
              </p>
            </div>

            <div className="row align-items-end text-start footer-row">
              {/* Left Column: ID & QR */}
              <div className="col-4">
                <div style={{ fontSize: "9px", color: "#666", fontFamily: "monospace" }}>ID: {cert.certificateId}</div>
                <div className="small mb-3">Issued: <b>{new Date(cert.issueDate).toLocaleDateString("en-GB")}</b></div>
                {showQRCode && (
                  <div className="p-1 border bg-white d-inline-block text-center shadow-sm" style={{ borderRadius: "5px" }}>
                    <QRCodeSVG value={`https://lavinova.com/verify/${cert.certificateId}`} size={55} fgColor="#1e3a8a" level="H" />
                    <div className="fw-bold" style={{ fontSize: "7px", color: "#1e3a8a" }}>VERIFIED</div>
                  </div>
                )}
              </div>

              {/* Center Column: Official Seal */}
{/* --- Center: Official Seal (SVG Code - 100% Load Guarantee) --- */}
<div className="col-4 text-center d-flex justify-content-center align-items-center">
  <svg width="100" height="100" viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.1))' }}>
    <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2" strokeDasharray="3,1" />
    <circle cx="50" cy="50" r="38" fill="#fffdf6" stroke="#d4af37" strokeWidth="1.5" />
    
    {/* Ribbon or Badge Style */}
    <path d="M50 20 L55 35 L70 35 L58 45 L63 60 L50 50 L37 60 L42 45 L30 35 L45 35 Z" fill="#d4af37" />
    
    {/* Circular Text */}
    <defs>
      <path id="sealTextPath" d="M 50, 50 m -32, 0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
    </defs>
    <text fontSize="5" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">
      <textPath xlinkHref="#sealTextPath" startOffset="25%"> • LAVINOVA INSTITUTE • OFFICIAL SEAL • </textPath>
    </text>
  </svg>
</div>
              {/* Right Column: Signature */}
              <div className="col-4 text-center">
                <div style={{ fontFamily: "Great Vibes", fontSize: "26px", color: "#1a252f" }}>{cert.issuedBy}</div>
                <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #333, transparent)", margin: "5px 0" }}></div>
                <div className="fw-bold text-uppercase" style={{ fontSize: "11px" }}>Authorized Signatory</div>
                <div className="text-muted small">Lavinova Institute</div>
              </div>
            </div>

            <div className="mt-3 pt-2" style={{ borderTop: "0.5px solid #eee" }}>
              <p className="text-muted mb-0" style={{ fontSize: "8px", letterSpacing: "1px" }}>
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