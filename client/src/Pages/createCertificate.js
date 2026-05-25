// // import { useState } from "react";
// // import axios from "axios";
// // import "./certificate.css"

// // function CreateCertificate() {

// //   const [formData, setFormData] = useState({
// //     studentName: "",
// //     email: "",
// //     courseName: "",
// //     certificateId: "",
// //     issuedBy: "",
// //   });

// //   const token = localStorage.getItem("token");

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post(
// //         "http://localhost:5000/api/create",
// //         formData,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`
// //           }
// //         }
// //       );

// //       alert(res.data.message);

// //       setFormData({
// //         studentName: "",
// //         email: "",
// //         courseName: "",
// //         certificateId: "",
// //         issuedBy: "",
// //       });

// //     } catch (error) {
// //       alert(error.response?.data?.message);
// //     }
// //   };

// //   return (

// //     <div className="create-wrapper">

// //       <div className="create-card">

// //         <h2 className="title">Create Certificate 🎓</h2>
// //         <p className="subtitle">Fill details to generate certificate</p>

// //         <form onSubmit={handleSubmit}>

// //           <div className="grid">

// //             <input
// //               name="studentName"
// //               placeholder="Student Name"
// //               value={formData.studentName}
// //               onChange={handleChange}
// //             />

// //             <input
// //               name="email"
// //               placeholder="Email"
// //               value={formData.email}
// //               onChange={handleChange}
// //             />

// //             <input
// //               name="courseName"
// //               placeholder="Course Name"
// //               value={formData.courseName}
// //               onChange={handleChange}
// //             />

// //             <input
// //               name="certificateId"
// //               placeholder="Certificate ID"
// //               value={formData.certificateId}
// //               onChange={handleChange}
// //             />

// //             <input
// //               name="issuedBy"
// //               placeholder="Issued By"
// //               value={formData.issuedBy}
// //               onChange={handleChange}
// //             />

// //           </div>

// //           <button className="submit-btn">
// //             Generate Certificate
// //           </button>

// //         </form>

// //       </div>

// //     </div>

// //   );
// // }

// // export default CreateCertificate;
// import { useState } from "react";
// import axios from "axios";
// import "./certificate.css";

// function CreateCertificate() {

//   const [formData, setFormData] = useState({
//     studentName: "",
//     email: "",
//     courseName: "",
//     issuedBy: "",
//     collegeName: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem("token");

//   // HANDLE CHANGE
//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });

//   };

//   // SUBMIT
//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     try {

//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/create",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("🎉 Certificate Created Successfully");

//       console.log(res.data);

//       // RESET FORM
//       setFormData({
//         studentName: "",
//         email: "",
//         courseName: "",
//         issuedBy: "",
//         collegeName: "",
//       });

//     } catch (error) {

//       alert(
//         error.response?.data?.message ||
//         "Something went wrong"
//       );

//     } finally {

//       setLoading(false);

//     }

//   };

//   return (

//     <div className="create-wrapper">

//       <div className="create-card">

//         <h2 className="title">
//           Create Certificate 🎓
//         </h2>

//         <p className="subtitle">
//           Generate secure digital certificate
//         </p>

//         <form onSubmit={handleSubmit}>

//           <div className="grid">

//             {/* STUDENT NAME */}
//             <input
//               type="text"
//               name="studentName"
//               placeholder="Student Name"
//               value={formData.studentName}
//               onChange={handleChange}
//               required
//             />

//             {/* EMAIL */}
//             <input
//               type="email"
//               name="email"
//               placeholder="Student Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />

//             {/* COURSE */}
//             <input
//               type="text"
//               name="courseName"
//               placeholder="Course Name"
//               value={formData.courseName}
//               onChange={handleChange}
//               required
//             />

//             {/* ISSUED BY */}
//             <input
//               type="text"
//               name="issuedBy"
//               placeholder="Issued By"
//               value={formData.issuedBy}
//               onChange={handleChange}
//             />

//             {/* COLLEGE NAME */}
//             <input
//               type="text"
//               name="collegeName"
//               placeholder="College / Institute Name"
//               value={formData.collegeName}
//               onChange={handleChange}
//             />

//             {/* STATUS */}
//           </div>

//           {/* INFO BOX */}
//           <div
//             style={{
//               marginTop: "15px",
//               background: "#f4f4f4",
//               padding: "12px",
//               borderRadius: "10px",
//               fontSize: "14px",
//               color: "#555",
//             }}
//           >
//             ✅ Certificate ID will be generated automatically
//           </div>

//           {/* BUTTON */}
//           <button
//             className="submit-btn"
//             disabled={loading}
//           >
//             {
//               loading
//                 ? "Generating..."
//                 : "Generate Certificate"
//             }
//           </button>

//         </form>

//       </div>

//     </div>

//   );
// }

// export default CreateCertificate;

// import { useState } from "react";
// import axios from "axios";
// import "./certificate.css";

// const APPROVED_COURSES = [
//   "Full Stack Web Development",
//   "Data Science & AI",
//   "UI/UX Design Strategy",
//   "Digital Marketing Masters"
// ];

// function CreateCertificate() {
//   const [formData, setFormData] = useState({
//     studentName: "",
//     email: "",
//     courseName: APPROVED_COURSES[0],
//     issuedBy: "Lavinova Admin",
//     collegeName: "Lavinova Institute",
//   });

//   const [loading, setLoading] = useState(false);
//   const token = localStorage.getItem("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await axios.post("http://localhost:5000/api/create", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       alert(res.data.message);
//       // Form reset logic...
//     } catch (error) {
//       // Yahan alert aayega agar email registered nahi hogi
//       alert("❌ Error: " + (error.response?.data?.message || "Verification failed"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="create-wrapper">
//       <div className="create-card shadow-lg">
//         <h2 className="title">Issue Certificate 🎓</h2>
//         <p className="subtitle text-primary fw-bold">Student Verification Active</p>

//         <form onSubmit={handleSubmit}>
//           <div className="grid">
//             <input 
//                type="email" name="email" placeholder="Registered Student Email" 
//                onChange={(e) => setFormData({...formData, email: e.target.value})} 
//                required 
//             />
            
//             <input 
//                type="text" name="studentName" placeholder="Student Name" 
//                onChange={(e) => setFormData({...formData, studentName: e.target.value})} 
//                required 
//             />

//             <select 
//                name="courseName" className="form-select"
//                onChange={(e) => setFormData({...formData, courseName: e.target.value})}
//             >
//               {APPROVED_COURSES.map((c, i) => <option key={i} value={c}>{c}</option>)}
//             </select>

//             <input 
//                type="text" name="collegeName" placeholder="Institute Name" 
//                value={formData.collegeName} readOnly
//             />
//           </div>

//           <div className="mt-3 p-2 bg-warning bg-opacity-10 rounded border border-warning small text-dark">
//             ⚠️ <strong>Admin Note:</strong> Email must exist in the database.
//           </div>

//           <button className="submit-btn mt-4" disabled={loading}>
//             {loading ? "Verifying & Generating..." : "Verify & Issue Certificate"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CreateCertificate;


import { useState } from "react";
import api from "../axios"
import "./certificate.css";

const APPROVED_COURSES = [
  "Full Stack Web Development",
  "Data Science & AI",
  "UI/UX Design Strategy",
  "Digital Marketing Masters"
];

const GRADES = ["A+", "A", "B+", "B", "C", "Distinction"];

function CreateCertificate() {
  const [formData, setFormData] = useState({
    email: "",
    courseName: APPROVED_COURSES[0],
    grade: "A+", // Naya field
    issueDate: new Date().toISOString().split("T")[0], // Default aaj ki date
    issuedBy: "Lavinova Admin",
    collegeName: "Lavinova Institute",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/create", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      alert("🎉 " + res.data.message);

      // FORM RESET logic
      setFormData({
        email: "",
        courseName: APPROVED_COURSES[0],
        grade: "A+",
        issueDate: new Date().toISOString().split("T")[0],
        issuedBy: "Lavinova Admin",
        collegeName: "Lavinova Institute",
      });

    } catch (error) {
      alert("❌ Error: " + (error.response?.data?.message || "Verification failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-wrapper">
      <div className="create-card shadow-lg border-0">
        <div className="text-center mb-4">
           <h2 className="title">Issue Official Certificate 🎓</h2>
           <span className="badge bg-primary-soft text-primary">Admin Panel v2.0</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            {/* EMAIL SECTION */}
            <div className="form-group">
              <label className="small fw-bold">Student Email</label>
              <input 
                type="email" name="email" className="form-control"
                placeholder="Enter registered email" 
                value={formData.email} onChange={handleChange} required 
              />
            </div>

            {/* NAME SECTION */}

            {/* COURSE SELECT */}
            <div className="form-group">
              <label className="small fw-bold">Course Program</label>
              <select name="courseName" className="form-select" value={formData.courseName} onChange={handleChange}>
                {APPROVED_COURSES.map((c, i) => <option key={i} value={c}>{c}</option>)}
              </select>
            </div>

            {/* GRADE SELECT */}
            <div className="form-group">
              <label className="small fw-bold">Final Grade</label>
              <select name="grade" className="form-select" value={formData.grade} onChange={handleChange}>
                {GRADES.map((g, i) => <option key={i} value={g}>{g}</option>)}
              </select>
            </div>

            {/* ISSUE DATE */}
            <div className="form-group">
              <label className="small fw-bold">Date of Issuance</label>
              <input 
                type="date" name="issueDate" className="form-control"
                value={formData.issueDate} onChange={handleChange} required 
              />
            </div>

            {/* COLLEGE NAME (Read Only) */}
            <div className="form-group">
              <label className="small fw-bold">Issuing Authority</label>
              <input 
                type="text" className="form-control bg-light" 
                value={formData.collegeName} readOnly
              />
            </div>
          </div>

          <div className="alert alert-info mt-4 border-0 shadow-sm" style={{fontSize: '13px'}}>
            <strong>Verification Logic:</strong> System will automatically check if the email is registered and if a certificate for this course already exists.
          </div>

          <button className="submit-btn w-100 py-3 mt-2" disabled={loading}>
            {loading ? (
              <span><i className="fa fa-spinner fa-spin"></i> Verifying...</span>
            ) : "Confirm & Issue Certificate"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCertificate;