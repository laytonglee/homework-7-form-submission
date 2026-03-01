const multiparty = require("multiparty");
const fs = require("fs");
const path = require("path");

// Allowed image MIME types
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

/**
 * GET /register
 * Render the registration form.
 */
exports.showForm = (_req, res) => {
  res.render("register", { title: "Register" });
};

/**
 * POST /register
 * Parse the multipart form, validate, move the file, and render the profile.
 */
exports.handleSubmission = (req, res) => {
  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).render("register", {
        title: "Register",
        error: "Something went wrong while processing the form.",
      });
    }

    // ── Extract field values ──────────────────────────────────────
    const fullName = fields.fullName ? fields.fullName[0] : "";
    const email = fields.email ? fields.email[0] : "";
    const courseTrack = fields.courseTrack ? fields.courseTrack[0] : "";

    // ── Validate file upload ─────────────────────────────────────
    const fileArray = files.profilePicture;
    if (!fileArray || fileArray.length === 0 || !fileArray[0].originalFilename) {
      return res.status(400).render("register", {
        title: "Register",
        error: "Please upload a profile picture.",
        fullName,
        email,
        courseTrack,
      });
    }

    const uploadedFile = fileArray[0];

    // ── Check file is an image ───────────────────────────────────
    if (!ALLOWED_TYPES.includes(uploadedFile.headers["content-type"])) {
      return res.status(400).render("register", {
        title: "Register",
        error: "Only .jpg, .jpeg, and .png images are allowed.",
        fullName,
        email,
        courseTrack,
      });
    }

    // ── Move file to ./public/uploads ────────────────────────────
    const uploadsDir = path.join(__dirname, "..", "public", "uploads");
    const newFileName =
      Date.now() + "-" + uploadedFile.originalFilename.replace(/\s+/g, "_");
    const newPath = path.join(uploadsDir, newFileName);

    fs.rename(uploadedFile.path, newPath, (moveErr) => {
      if (moveErr) {
        // If rename fails across devices, fall back to copy + delete
        const readStream = fs.createReadStream(uploadedFile.path);
        const writeStream = fs.createWriteStream(newPath);
        readStream.pipe(writeStream);
        writeStream.on("finish", () => {
          fs.unlink(uploadedFile.path, () => {});
          renderProfile();
        });
        writeStream.on("error", () => {
          return res.status(500).render("register", {
            title: "Register",
            error: "Failed to save the uploaded file.",
          });
        });
      } else {
        renderProfile();
      }
    });

    function renderProfile() {
      res.render("profile", {
        title: "Profile",
        fullName,
        email,
        courseTrack,
        profilePicture: `/uploads/${newFileName}`,
      });
    }
  });
};
