const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * ✅ CORS: pour démarrer, on autorise tout.
 * En prod, restreins à ton domaine Vercel (voir plus bas).
 */
app.use(cors());

/** Petit endpoint "health" style prod */
app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "backend-render-test",
    timestamp: new Date().toISOString(),
  });
});

/** Endpoint JSON "app" */
app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello depuis Render 👋",
    hint: "Essaie /api/stream pour le streaming (SSE).",
  });
});

/**
 * Streaming SSE (comme un LLM qui envoie des tokens)
 * GET /api/stream
 */
app.get("/api/stream", async (req, res) => {
  // Headers SSE
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  // Selon certains proxys, ça aide à flusher tout de suite
  res.flushHeaders?.();

  const tokens = [
    "Bonjour", " !", " Ceci", " est", " un", " stream", " SSE", " type", " IA", " ✅",
  ];

  let i = 0;
  const interval = setInterval(() => {
    if (i >= tokens.length) {
      res.write(`event: done\ndata: {"done": true}\n\n`);
      clearInterval(interval);
      res.end();
      return;
    }

    // event "token"
    res.write(`event: token\ndata: ${JSON.stringify({ token: tokens[i] })}\n\n`);
    i += 1;
  }, 200);

  // Si le client coupe la connexion
  req.on("close", () => {
    clearInterval(interval);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
