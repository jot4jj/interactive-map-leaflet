export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Parâmetro 'q' é obrigatório." });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q
    )}&format=json&limit=1`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "MyLeafletApp/1.0 (your-email@example.com)"
      }
    });

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({ error: "Erro no servidor", details: error });
  }
}