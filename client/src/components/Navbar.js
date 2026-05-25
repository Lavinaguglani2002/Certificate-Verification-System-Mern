import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav 
      className="navbar navbar-expand-lg navbar-dark shadow sticky-top py-2" 
      style={{ 
        background: "#0a192f", // Deep Dark Blue (Navy) Background
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)" // Subtle White Border instead of bright blue
      }}
    >
      <div className="container">
        
        {/* BRAND / LOGO */}
        <Link className="navbar-brand fw-bolder d-flex align-items-center text-white" to="/" style={{ fontSize: "1.4rem" }}>
          <div 
            className="d-flex align-items-center justify-content-center me-2 rounded-circle" 
            style={{ 
              width: "35px", 
              height: "35px",
              background: "#00b4d8" // Vibrant Cyan/Light Blue accent for contrast
            }}
          >
            <span className="text-white small fw-bold">V</span>
          </div>
          <span className="d-none d-sm-inline tracking-wider">
            VERIFY<span style={{ color: "#00b4d8" }}>HUB</span>
          </span>
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            
            {/* 1. DYNAMIC DASHBOARD LINK */}
            {user && (
              <li className="nav-item mx-lg-2">
                <Link 
                  className="nav-link fw-semibold text-white text-hover-white px-3" 
                  to={user.role === "admin" ? "/admin-dashboard" : "/user-dashboard"}
                  style={{ fontSize: "0.9rem" }}
                >
                  🏠 Dashboard
                </Link>
              </li>
            )}

            {/* 2. ADMIN ACTIONS */}
            {user?.role === "admin" && (
              <>
                <li className="nav-item mx-lg-1">
                  <Link className="nav-link small text-white text-hover-white" to="/create-certificate">
                    + Issue New
                  </Link>
                </li>
                <li className="nav-item mx-lg-1 ">
                  <Link className="nav-link small text-white text-hover-white" to="/all-certificates">
                    📜 Records
                  </Link>
                </li>
              </>
            )}

            {/* 3. VERIFY ACTION (Main CTA) */}
            <li className="nav-item mx-lg-2 my-2 my-lg-0">
              <Link 
                className="btn btn-sm rounded-pill px-3 fw-bold shadow-sm" 
                to="/verify-certificate"
                style={{ 
                  fontSize: "0.85rem",
                  background: "#00b4d8", // Contrast Light Blue
                  color: "#0a192f", // Dark Text for readability
                  border: "none"
                }}
              >
                ✓ Verify Now
              </Link>
            </li>

            {/* 4. NOTIFICATION ICON */}
            {user && (
               <li className="nav-item d-none d-lg-block mx-2">
                 <span className="text-white-50 cursor-pointer">🔔</span>
               </li>
            )}

            {/* DIVIDER */}
            {user && <div className="vr d-none d-lg-block mx-3 text-white opacity-25" style={{ height: "20px" }}></div>}

            {/* 5. USER PROFILE & LOGOUT */}
            {user ? (
              <li className="nav-item d-flex align-items-center gap-3 mt-2 mt-lg-0">
                <div className="text-end d-none d-xxl-block">
                  <div className="text-white small fw-bold mb-0">{user.name}</div>
                  <div className="text-white-50" style={{ fontSize: "0.7rem", textTransform: "uppercase" }}>{user.role}</div>
                </div>
                <button
                  className="btn btn-outline-danger btn-sm rounded-pill px-4 border-2 fw-bold"
                  onClick={handleLogout}
                  style={{ fontSize: "0.75rem" }}
                >
                  LOGOUT
                </button>
              </li>
            ) : (
              <li className="nav-item mt-2 mt-lg-0">
                <Link className="btn btn-light btn-sm rounded-pill px-4 fw-bold" to="/login" style={{ color: "#0a192f" }}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;