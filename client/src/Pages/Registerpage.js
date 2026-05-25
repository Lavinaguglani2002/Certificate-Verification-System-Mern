import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import api from "../axios";

function Register() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (user && token) {
      if (user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/register",
        formData
      );

      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <div className="auth-wrapper d-flex align-items-center justify-content-center">
      
      {/* Dynamic Ambient Fluid Light Effects */}
      <div className="orb orb-cyber-cyan"></div>
      <div className="orb orb-cyber-purple"></div>
      <div className="orb orb-cyber-pink"></div>

      <div className="container d-flex justify-content-center align-items-center position-relative" style={{ zIndex: 10 }}>
        <div className="auth-card premium-glassmorphism">
          
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="title-gradient fw-black mb-1">Create Account 🚀</h2>
            <p className="text-white-50 small text-uppercase tracking-widest">Secure Credentials Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-2">
            
            {/* Input Name */}
            <div className="input-field-container mb-3 position-relative">
              <label className="input-label-glow">Full Name</label>
              <div className="input-wrapper-neon">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="input-field-container mb-3 position-relative">
              <label className="input-label-glow">Email Address</label>
              <div className="input-wrapper-neon">
                <span className="input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Input Password */}
            <div className="input-field-container mb-4 position-relative">
              <label className="input-label-glow">Password</label>
              <div className="input-wrapper-neon">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Holographic Glowing Button */}
            <button className="btn-holo-neon w-100 fw-bold py-3 mb-3 text-uppercase tracking-wider">
              Create Free Account
            </button>
          </form>

          {/* Bottom redirection styling */}
          <p className="bottom-text text-center text-white-50 mb-0 mt-4 small">
            Already have an account?{" "}
            <Link to="/login" className="login-link-neon fw-bold text-decoration-none">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;