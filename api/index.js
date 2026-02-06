import express from "express";
import serverless from "serverless-http";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(process.cwd()));

// Routes dashboard (nếu còn dùng)
app.post("/api/verify", require("../dashboard/api/verify"));
app.post("/api/list", require("../dashboard/api/list"));
app.post("/api/update", require("../dashboard/api/update"));
app.post("/api/upload", require("../dashboard/api/upload"));
app.post("/auth/login", require("../dashboard/auth/login"));

// Download redirect
app.get("/download", (req, res) => {
  res.redirect("/?showDownload=1");
});

// Auto login
app.get("/ipa-:version/password=:password", (req, res) => {
  const { version, password } = req.params;
  const decodedPassword = decodeURIComponent(password);

  try {
    const passwordFilePath = path.join(
      process.cwd(),
      "assets/config/password/password.json"
    );

    const passwordData = JSON.parse(
      fs.readFileSync(passwordFilePath, "utf8")
    );

    const isValid = passwordData[version] === decodedPassword.trim();

    if (isValid) {
      res.redirect(
        `/?auto=1&version=${version}&pwd=${encodeURIComponent(decodedPassword)}`
      );
    } else {
      res.redirect("/?error=wrong_password");
    }
  } catch (err) {
    console.error("Auto-login error:", err);
    res.status(500).send("Server error");
  }
});

export default serverless(app);
