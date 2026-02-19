import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize OpenAI client
// NOTE: Make sure to create a .env file with OPENAI_API_KEY
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'mock-key', // Fallback for development if no key is present
});

app.get('/', (req, res) => {
    res.send('Aegis Orbit Backend is running');
});

app.post('/api/ai/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!process.env.OPENAI_API_KEY) {
            // Mock response if no key
            console.log('No API key found, returning mock response');
            return res.json({
                reply: `[MOCK] I received your message: "${message}". Connect a valid API key to get real AI responses.`
            });
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
        });

        res.json({ reply: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error calling AI service:', error);
        res.status(500).json({ error: 'Failed to process AI request' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
