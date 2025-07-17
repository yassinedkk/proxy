import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Binance Proxy is running 🚀");
});

// Route pour récupérer le carnet d'ordres
app.get("/orderbook", async (req, res) => {
  const { symbol = "BTCUSDT", limit = "10" } = req.query;
  const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur Binance");

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Erreur API Binance", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy Binance sur le port ${PORT}`);
});
