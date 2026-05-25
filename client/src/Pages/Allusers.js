import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../axios";

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/all-users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // Search logic
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // User de naam da pehla akhar (Avatar layi)
  const getInitials = (name) => name ? name.charAt(0).toUpperCase() : "U";

  return (
    <div className="container py-5">
      {/* TOP BAR */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <Link to="/admin-dashboard" className="btn btn-link text-decoration-none p-0 mb-2">
            <i className="bi bi-arrow-left"></i> Back to Dashboard
          </Link>
          <h2 className="fw-bold m-0">Registered Users</h2>
          <p className="text-muted small">Manage and view all accounts in the system</p>
        </div>
        <div className="text-end">
          <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0 text-muted">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0 ps-0"
              placeholder="Filter by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="card shadow-sm border-0 overflow-hidden">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">User Details</th>
                <th>Email Address</th>
                <th>Role</th>
                <th className="text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-5">
                    <div className="spinner-border text-primary" role="status"></div>
                    <p className="mt-2 mb-0 text-muted">Loading user database...</p>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((u) => (
                  <tr key={u._id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center">
                        <div 
                          className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold me-3" 
                          style={{ width: "40px", height: "40px", fontSize: "14px" }}
                        >
                          {getInitials(u.name)}
                        </div>
                        <span className="fw-semibold text-dark">{u.name}</span>
                      </div>
                    </td>
                    <td className="text-muted">{u.email}</td>
                    <td>
                      <span className={`badge rounded-pill px-3 ${u.role === 'admin' ? 'bg-danger-subtle text-danger' : 'bg-info-subtle text-info'}`}>
                        {u.role || 'user'}
                      </span>
                    </td>
                    <td className="text-center">
                      <span className="text-success small fw-bold">
                        <i className="bi bi-check-circle-fill me-1"></i> Active
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    No users found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;