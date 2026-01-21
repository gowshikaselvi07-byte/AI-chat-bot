require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Init Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",  // Free, fast model
    });

    const result = await model.generateContent(message);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err);
    res.status(500).json({ reply: "Backend error. Try again." });
  }
});

app.listen(5001, () => {
  console.log("🤖 AI Backend running at http://localhost:5001");
});

// Prevent auto-exit bug
setInterval(() => {}, 1000);