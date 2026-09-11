const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const {
  swaggerUi,
  swaggerDocument
} = require("../swagger");

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Public route

app.get("/public/info", (req, res) => {
  res.status(200).json({
    message: "Welcome stranger! This info is public."
  });
});


// Auth routes
app.use("/auth", authRoutes);


// Protected routes
app.use("/protected", protectedRoutes);


// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Auth API is running"
  });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Server running and connected to Supabase");
});