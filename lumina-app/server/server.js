import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message: 'Hello from Lumina',
    });
});

app.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;

        const result = await model.generateContent(prompt);
        const text = await result.response.text();

        res.status(200).send({
            bot: text
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

app.listen(5000, () => console.log("Server is running on port http://localhost:5000"));
