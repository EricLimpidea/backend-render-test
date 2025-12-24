const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Autorise les requêtes venant de n'importe quel site (OK pour test)
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello depuis Render 👋");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
