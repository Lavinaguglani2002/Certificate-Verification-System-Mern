

import { Link } from "react-router-dom";
import "./homepage.css";

function HomePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="homepage-wrapper">
      
      {/* HERO SECTION WITH HERO CYBER GRADIENT & GEOMETRIC BACKDROP */}
      <div className="hero-cyber-section position-relative py-5 text-white d-flex align-items-center">
        
        {/* Geometric Hexagon Grid Background Overlay */}
        <div className="cyber-grid-overlay"></div>
        
        {/* Giant Futuristic Neon Gradient Circle (As seen in image) */}
        <div className="center-glow-ring"></div>

        <div className="container text-center py-5 position-relative" style={{ zIndex: 10 }}>
          
          {/* Main Title */}
          <h1 className="fw-bold display-3 mb-3 text-white tracking-tight text-shadow-glow">
            Certificate Verification System
          </h1>
          
          <p className="lead mt-3 mb-5 mx-auto text-light opacity-75 cyber-subtitle" style={{ maxWidth: "750px" }}>
            The gold standard for secure, fast, and immutable certificate generation. 
            Empowering institutions and individuals with instant digital trust.
          </p>

          {/* Three Unique Cyber Buttons from the image */}
          <div className="mt-4 d-flex justify-content-center gap-4 flex-wrap">
            {!user ? (
              <>
                <Link to="/login" className="cyber-btn btn-get-started">
                  Get Started
                </Link>
                <Link to="/register" className="cyber-btn btn-register">
                  Register
                </Link>
              </>
            ) : (
              <Link
                to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                className="cyber-btn btn-get-started"
              >
                Go to Dashboard
              </Link>
            )}
            <Link to="/verify-certificate" className="cyber-btn btn-verify-now">
              Verify Now
            </Link>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION - TRIPLE COLOR CODE GLASS CARDS */}
      <div className="container py-5 content-block-cards">
        <div className="row g-4 justify-content-center">
          <FeatureCard 
            icon="🛡️" 
            title="Secure Vault" 
            text="End-to-end encryption ensures certificates remain tamper-proof and authentic." 
            accentClass="accent-blue"
          />
          <FeatureCard 
            icon="⚡" 
            title="Instant Verification" 
            text="Query our global database in milliseconds using unique IDs or QR scans." 
            accentClass="accent-teal"
          />
          <FeatureCard 
            icon="📂" 
            title="Admin Suite" 
            text="Full lifecycle management from issuance to revocation with one click." 
            accentClass="accent-red"
          />
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="py-5 cyber-stats-bg border-top border-bottom border-secondary border-opacity-10">
        <div className="container text-center">
          <h2 className="fw-bold mb-5 text-white">Trusted by Global Standards</h2>
          <div className="row g-4">
            <StatCard value="100%" label="Accuracy Rate" color="text-info" />
            <StatCard value="99.9%" label="Uptime Record" color="text-success" />
            <StatCard value="AES-256" label="Security Level" color="text-danger" />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="text-center py-4 cyber-footer">
        <div className="container">
          <p className="mb-1  text-white">© 2026 VERIFYHUB | Modernizing Digital Credentials</p>
          <div className="d-flex justify-content-center gap-3 small">
            <Link to="#" className="text-white text-decoration-none hover-link">Privacy Policy</Link>
            <span className="text-muted opacity-25">|</span>
            <Link to="#" className="textwhite text-decoration-none hover-link">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Sub-components
function FeatureCard({ icon, title, text, accentClass }) {
  return (
    <div className="col-md-4">
      <div className={`card h-100 cyber-glass-card ${accentClass}`}>
        <div className="display-5 mb-3 card-icon">{icon}</div>
        <h4 className="fw-bold mb-2">{title}</h4>
        <p className="text-muted mb-0">{text}</p>
      </div>
    </div>
  );
}

function StatCard({ value, label, color }) {
  return (
    <div className="col-md-4">
      <div className="p-3">
        <h2 className={`display-5 fw-bold ${color}`}>{value}</h2>
        <p className="text-uppercase fw-semibold small tracking-widest text-muted mt-2">{label}</p>
      </div>
    </div>
  );
}

export default HomePage;