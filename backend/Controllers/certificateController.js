
const Certificate = require("../Model/certificateModel");
const userModel = require("../Model/userModel");
const crypto = require("crypto");

// ==========================================
// 1. CREATE CERTIFICATE (Admin Only)
// ==========================================
const createCertificate = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const {
      email,
      courseName,
      grade,
      issueDate,
      issuedBy,
      collegeName,
    } = req.body;

    const cleanEmail = email.toLowerCase();

    // CHECK REGISTERED USER
    const registeredStudent = await userModel.findOne({
      email: cleanEmail,
    });

    if (!registeredStudent) {
      return res.status(404).json({
        success: false,
        message: "This email is not registered.",
      });
    }

    // DUPLICATE CHECK
    const existingCert = await Certificate.findOne({
      email: cleanEmail,
      courseName,
    });

    if (existingCert) {
      return res.status(400).json({
        success: false,
        message: "Certificate already issued for this course.",
      });
    }

    // UNIQUE CERTIFICATE ID
    const year = new Date()
      .getFullYear()
      .toString()
      .slice(-2);

    const randomNum = Math.floor(
      100000 + Math.random() * 900000
    );

    const certificateId = `LAV-${year}${randomNum}`;

    // DIGITAL SIGNATURE
    const digitalSignature = crypto
      .createHash("sha256")
      .update(cleanEmail + courseName + certificateId)
      .digest("hex")
      .substring(0, 16);

    // CREATE CERTIFICATE
    const certificate = await Certificate.create({
      studentName: registeredStudent.name,
      email: cleanEmail,
      courseName,
      grade,
      issueDate,
      certificateId,
      digitalSignature,
      issuedBy: issuedBy || "Lavinova Admin",
      collegeName:
        collegeName || "Lavinova Institute",
    });

    res.status(201).json({
      success: true,
      message: "Certificate created successfully!",
      certificate,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// 2. VERIFY CERTIFICATE
// ==========================================
// const verifyCertificate = async (req, res) => {
//   try {
//     const certificate = await Certificate.findOne({
//       certificateId: req.params.id,
//     });

//     if (!certificate) {
//       return res.status(404).json({
//         success: false,
//         message: "Certificate not found",
//       });
//     }

//     // 🔐 SAFE CHECK (IMPORTANT)
//     if (
//       req.user.role !== "admin" &&
//       certificate.email.toLowerCase() !== req.user.email.toLowerCase()
//     ) {
//       return res.status(403).json({
//         success: false,
//         message: "Access denied",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       certificate: {
//         studentName: certificate.studentName,
//         courseName: certificate.courseName,
//         grade: certificate.grade,
//         issueDate: certificate.issueDate,
//         certificateId: certificate.certificateId,
//         issuedBy: certificate.issuedBy,
//         collegeName: certificate.collegeName,
//         digitalSignature: certificate.digitalSignature,
//       },
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({
      certificateId: req.params.id,
    });

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    // 🌟 FIXED: Yahan se req.user.role wali condition hata di hai taaki public checks allow ho sakein.
    
    return res.status(200).json({
      success: true,
      certificate: {
        studentName: certificate.studentName,
        courseName: certificate.courseName,
        grade: certificate.grade,
        issueDate: certificate.issueDate,
        certificateId: certificate.certificateId,
        issuedBy: certificate.issuedBy,
        collegeName: certificate.collegeName,
        digitalSignature: certificate.digitalSignature,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. GET USER CERTIFICATES
// ==========================================
const getUserCertificates = async (req, res) => {
  try {

    const emailFromParams =
      req.params.email.toLowerCase();

    const loggedInUserEmail =
      req.user.email.toLowerCase();

    // SECURITY CHECK
if (
  req.user.role !== "admin" &&
  emailFromParams !== loggedInUserEmail
){
    return res.status(403).json({
        success: false,
        message:
          "Unauthorized: You can only view your own certificates.",
      });
    }

    const certificates = await Certificate.find({
      email: emailFromParams,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      certificates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// 4. GET ALL CERTIFICATES (ADMIN ONLY)
// ==========================================
const getAllCertificates = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    const certificates =
      await Certificate.find().sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      certificates,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================================
// 5. DELETE CERTIFICATE
// ==========================================
const deleteCertificate = async (req, res) => {
  try {

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Only admin can delete certificates",
      });
    }

    const certificate =
      await Certificate.findByIdAndDelete(
        req.params.id
      );

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found",
      });
    }

    res.status(200).json({
      success: true,
      message:
        "Certificate deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// 7. BULK UPLOAD
// ==========================================
const bulkUploadCertificates = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin access required" });
    }

    const { fileData } = req.body;
    console.log("Backend received data count:", fileData?.length); // Debugging

    if (!fileData || !Array.isArray(fileData) || fileData.length === 0) {
      return res.status(400).json({ success: false, message: "Invalid or empty file" });
    }

    let uploaded = [];
    let skipped = [];

    for (const item of fileData) {
      // 1. Headers ko Normalize karein (Excel headers check)
      const email = item.email || item.Email || item["Student Email"];
      const course = item.courseName || item["Course Name"] || item.Course;
      const sName = item.studentName || item["Student Name"] || item.Name;

      const cleanEmail = email?.toLowerCase().trim();

      // 2. Validation
      if (!cleanEmail || !course) {
        skipped.push({ email: email || "Unknown", reason: "Missing Email or Course Name" });
        continue;
      }

      // 3. User Check (Bypass if not found but use name from Excel)
      const registeredStudent = await userModel.findOne({ email: cleanEmail });
      const finalName = registeredStudent ? registeredStudent.name : sName;

      if (!finalName) {
        skipped.push({ email: cleanEmail, reason: "Student Name not found anywhere" });
        continue;
      }

      // 4. Duplicate Check
const existing = await Certificate.findOne({
  email: cleanEmail,
  courseName: item.courseName,
});

if (existing) {
  skipped.push({
    email: cleanEmail,
    reason: "Certificate already exists",
  });
  continue; 
}
      // 5. Generate ID & Signature
      const year = new Date().getFullYear().toString().slice(-2);
      const certId = `LAV-${year}${Math.floor(100000 + Math.random() * 900000)}`;
      
      const digitalSignature = crypto
        .createHash("sha256")
        .update(cleanEmail + course + certId)
        .digest("hex").substring(0, 16);

      // 6. Save to Database
      const cert = await Certificate.create({
        studentName: finalName,
        email: cleanEmail,
        courseName: course,
        grade: item.grade || "A+",
        issueDate: item.issueDate || new Date(),
        certificateId: certId,
        digitalSignature,
        issuedBy: item.issuedBy || "Lavinova Admin",
        collegeName: item.collegeName || "Lavinova Institute",
      });

      uploaded.push(cert);
    }

    res.status(200).json({
      success: true,
      message: `${uploaded.length} certificates uploaded successfully`,
      uploadedCount: uploaded.length,
      skippedCount: skipped.length,
      skipped
    });

  } catch (error) {
    console.error("Bulk Upload Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};module.exports = {
  createCertificate,
  verifyCertificate,
  getAllCertificates,
  deleteCertificate,
  getUserCertificates,
  bulkUploadCertificates,
};