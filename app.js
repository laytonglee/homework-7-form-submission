const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");

const registerRoutes = require("./routes/registerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ── Handlebars setup ────────────────────────────────────────────────
app.engine("hbs", engine({ extname: ".hbs", defaultLayout: "main" }));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ── Static files ────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, "public")));

// ── Routes ──────────────────────────────────────────────────────────
app.use("/", registerRoutes);

// ── Home redirect ───────────────────────────────────────────────────
app.get("/", (_req, res) => res.redirect("/register"));

// ── Start server ────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
