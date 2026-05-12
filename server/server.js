const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-caption", async (req, res) => {

    try {

        const { topic, mood, style } = req.body;

        const prompt = `
Generate 5 social media captions.

Topic: ${topic}
Mood: ${mood}
Style: ${style}

Keep captions short and attractive.
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-3.5-turbo",

                messages: [
                    {
                        role: "user",
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    Authorization:
                        `Bearer ${process.env.OPENROUTER_API_KEY}`,

                    "Content-Type": "application/json"
                }
            }
        );

        const captions =
            response.data.choices[0].message.content;

        res.json({
            captions
        });

    } catch (error) {

        console.log(
            error.response?.data || error.message
        );

        res.status(500).json({
            message: "Error generating captions"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});