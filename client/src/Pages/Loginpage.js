import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css"
import api from "../axios";

function Login() {

  const navigate = useNavigate();
useEffect(() => {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) return;

  try {

    const payload = JSON.parse(atob(token.split(".")[1]));

    // expired
    if (payload.exp * 1000 < Date.now()) {

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return;
    }

    // redirect
    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else {
      navigate("/user-dashboard");
    }

  } catch (error) {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

}, [navigate]);
  const [formData, setFormData] = useState({
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
        "/login",
        formData
      );

      alert(res.data.message);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      if (res.data.user.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (

    <div className="login-wrapper">

      <div className="login-card">

        <h2 className="title">Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
            />
          </div>

          <button className="login-btn">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>

    </div>

  );
}

export default Login;