// const mongoose = require("mongoose");

// const certificateSchema = new mongoose.Schema({
//   studentName: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   courseName: {
//     type: String,
//     required: true,
//   },
//   certificateId: {
//     type: String,
//     unique: true,
//   },
//   issueDate: {
//     type: Date,
//     default: Date.now,
//   },
//   issuedBy: {
//     type: String,
//     default: "Admin",
//   },
// });

// module.exports = mongoose.model("Certificate", certificateSchema);

// ==============================
// certificateModel.js
// ==============================
const mongoose=require("mongoose")
const certificateSchema = new mongoose.Schema(
{
  studentName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  courseName: {
    type: String,
    required: true,
  },

  certificateId: {
    type: String,
    unique: true,
  },

  issueDate: {
    type: Date,
    default: Date.now,
  },

  issuedBy: {
    type: String,
    default: "Admin",
  },

  collegeName: {
    type: String,
    default: "Lavinora Institute",
  },

  grade: {
    type: String,
  },

  certificateURL: {
    type: String,
    default: "",
  },
},
{
  timestamps: true,
}
);
 module.exports = mongoose.model("Certificate", certificateSchema);
