import axios from "axios";

export default async function handler(req, res) {
  try {
    const { url } = req.body;

    const response = await axios.post(
      "https://cleanuri.com/api/v1/shorten",
      new URLSearchParams({ url }),
    );

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: "API failed" });
  }
}
