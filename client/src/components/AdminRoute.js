import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // no token
  if (!user || !token) {
    return <Navigate to="/login" />;
  }

  try {

    // decode token
    const payload = JSON.parse(atob(token.split(".")[1]));

    // token expired
    if (payload.exp * 1000 < Date.now()) {

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      return <Navigate to="/login" />;
    }

  } catch (error) {

    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return <Navigate to="/login" />;
  }

  // block admin
  if (user.role !== "admin") {
    return <Navigate to="/user-dashboard" />;
  }

  return children;
}

export default ProtectedRoute;