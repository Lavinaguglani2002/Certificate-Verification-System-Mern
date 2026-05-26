import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./Pages/Registerpage";
import Login from "./Pages/Loginpage";
import AdminDashboard from "./Pages/Admindashboard";
import UserDashboard from "./Pages/Userdashboard";
import CreateCertificate from "./Pages/createCertificate";
import VerifyCertificate from "./Pages/verifyCertificate";
import AllCertificates from "./Pages/Allcertificate";
import Navbar from "./components/Navbar";
import MyCertificates from "./Pages/Mycertificates";
import CertificateView from "./Pages/Viewcertificate";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminRoute from "./components/AdminRoute";
import Home from "./Pages/HomePage";
import AllUsers from "./Pages/Allusers";
import BulkUpload from "./Pages/BulkUpload";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ADMIN ONLY */}
        <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/create-certificate" element={<AdminRoute><CreateCertificate /></AdminRoute>} />
        <Route path="/all-certificates" element={<AdminRoute><AllCertificates /></AdminRoute>} />
        <Route path="/all-users" element={<AdminRoute><AllUsers /></AdminRoute>} />
        <Route path="/bulk-upload" element={<AdminRoute><BulkUpload /></AdminRoute>} />

        {/* USER ONLY */}
        <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
        <Route path="/my-certificates" element={<ProtectedRoute><MyCertificates /></ProtectedRoute>} />

        {/* 🌟 FIXED: VERIFY NOW COMPLETELY PUBLIC (Dono pure public hain) 🌟 */}
        <Route path="/verify-certificate" element={<VerifyCertificate />} />
        <Route path="/verify-certificate/:id" element={<VerifyCertificate />} />

        <Route path="/certificate-view" element={<CertificateView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;