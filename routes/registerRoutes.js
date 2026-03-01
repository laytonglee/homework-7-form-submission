const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

// GET  /register  → show the registration form
router.get("/register", registerController.showForm);

// POST /register  → handle the form submission
router.post("/register", registerController.handleSubmission);

module.exports = router;
