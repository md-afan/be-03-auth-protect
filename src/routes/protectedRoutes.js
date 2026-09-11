const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// PROFILE
router.get("/profile", authMiddleware, (req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    created_at: req.user.created_at
  });
});


// DASHBOARD
router.get("/dashboard", authMiddleware, (req, res) => {
  return res.status(200).json({
    message: "Welcome to your protected dashboard",
    user_id: req.user.id
  });
});


// LOGOUT
router.post("/logout", authMiddleware, async (req, res) => {
  const supabase = require("../supabase");

  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.substring(7);

    const { error } = await supabase.auth.signOut(token);

    if (error) {
      return res.status(401).json({
        error: "Logout failed"
      });
    }

    return res.status(204).send();

  } catch (error) {
    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router;