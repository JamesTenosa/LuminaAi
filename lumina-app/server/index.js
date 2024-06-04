import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Initialize the Express app
const app = express();
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello from Lumina',
    });
});

// Endpoint to generate content
app.post('/generate', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const result = await model.generateContent(prompt);
        const text = result.response.text;

        res.status(200).send({
            bot: text
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error });
    }
});

// Define the port to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
