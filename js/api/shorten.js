// server.js
import express from "express";
import axios from "axios";

const app = express();
app.use(express.json());

app.post("/shorten", async (req, res) => {
  try {
    const response = await axios.post(
      "https://cleanuri.com/api/v1/shorten",
      new URLSearchParams({ url: req.body.url }),
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "API failed" });
  }
});

app.listen(3000);
