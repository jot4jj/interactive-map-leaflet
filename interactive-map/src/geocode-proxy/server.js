import express from "express"
import fetch from "node-fetch"

const app = express()
const PORT = 3001

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next()
})

app.get("/geocode", async (req, res) => {
    const q = req.query.q
    if (!q) {
        return res.status(400).json({ error: "Missing Query" })
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        q
    )}&format=json&limit=1`;

    try {
        const response = await fetch(url, {
            header: {
                "User-Agent": "interactive-map/1.0 (jvtrsilvafreitas@gmail.com)"
            }
        })
        const data = await response.json()
        res.json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
})

app.listen(PORT, () => {
    console.log("deu bom pae")
})