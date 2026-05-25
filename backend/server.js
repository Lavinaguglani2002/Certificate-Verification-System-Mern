const express = require("express");
const app = express();

const cors = require("cors");

const connectDB = require("./connectdb/db");

const userRoutes = require("./routes/userRoutes");
const certificateRoutes = require("./routes/certificateRoutes");

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/api", userRoutes);

app.use("/api", certificateRoutes);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});