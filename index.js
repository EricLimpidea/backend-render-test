const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Autorise les requêtes venant de n'importe quel site (OK pour test)
app.use(
  cors({
    origin: [
      "https://frontend-vercel-test-erics-projects-8f4c3330.vercel.app",
      http://localhost:3000,
      "https://TON-DOMAINE.com",
    ],
  })
);

app.get("/", (req, res) => {
  res.send("Hello depuis Render 👋");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
