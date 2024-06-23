import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Load environment variables
dotenv.config();

console.log('Environment Variables Loaded');
console.log('GOOGLE_GEMINI_API_KEY:', process.env.GOOGLE_GEMINI_API_KEY);

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

// Initialize the Express app
const app = express();
app.use(cors());
app.use(express.json());

console.log('Express App Initialized');

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hello from Lumina AI, by James Tenosa & John Lloyd Adante',
    });
});

// Endpoint to generate content
app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        console.log('Received prompt:', prompt);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        console.log('API response:', result);

        if (result && result.response) {
            const response = await result.response;
            const text = await response.text();
            console.log('Generated text:', text);

            res.status(200).send({
                bot: text
            });
        } else {
            console.log('No response in result:', result);
            res.status(500).send({ error: 'No response text' });
        }
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send({ error: error.message });
    }
});

// Define the port to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
