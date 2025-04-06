// api/convert-instruction.js
import { GoogleGenerativeAI } from 'google-generative-ai';
import cors from 'cors';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); 

export default async function handler(req, res) {
   
    cors()(req, res, () => {});

    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method Not Allowed'
        });
    }

    const {
        instruction
    } = req.body;
    console.log(`Received instruction: ${instruction}`);

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash"
        });
        const prompt = `Convert only non-gram measurements in this instruction to grams, keeping existing gram values unchanged , also convert tsp, tbsp and cups etc values to grams: \"${instruction}\"`;

        const result = await model.generateContent(prompt);
        const convertedInstruction = result.response.text();

        console.log(`Converted instruction: ${convertedInstruction}`);
        res.json({
            convertedInstruction
        });
    } catch (error) {
        console.error('Error converting instruction:', error);
        res.status(500).json({
            convertedInstruction: `Error processing instruction: ${instruction}`
        });
    }
}
