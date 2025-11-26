export default async function handler(req, res) {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter q" });
  }
  
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`;

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "InteractiveMap/1.0 (jvtrsilvafreitas@gmail.com)",
      },
    });

    if (!response.ok) {
      throw new Error(`Nominatim API returned status ${response.status}`);
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    console.error("Nominatim error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}