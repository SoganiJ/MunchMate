import express from 'express';
import dialogflow from 'dialogflow';
import cors from 'cors';
import {
    Firestore
} from '@google-cloud/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import bcrypt from 'bcrypt'; 

const {
    SessionsClient
} = dialogflow;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const projectId = 'precisionbakinghack';
const keyFilename = 'precisionbakinghack-5fda293205d6.json';

const sessionClient = new SessionsClient({
    projectId,
    keyFilename
});

const db = new Firestore({
    projectId: projectId,
    keyFilename: 'precisionbakinghack-firebase-adminsdk-fbsvc-af0ab8cf32.json',
});


const genAI = new GoogleGenerativeAI("AIzaSyCVjcMSQLafwMBysd2e8qmMDADwAqsv1c0");


app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Registration attempt for username: ${username}`);

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required.'
        });
    }

    try {
        const usersRef = db.collection('users');
       
        const userDoc = await usersRef.doc(username).get();

        if (userDoc.exists) {
            console.log(`Username ${username} already exists`);
            return res.status(400).json({
                message: 'Username already taken'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(`Attempting to create user with username: ${username}`);
        await usersRef.doc(username).set({
            username: username,
            password: hashedPassword,
        });
        console.log(`User ${username} created successfully`);
        res.status(201).json({
            message: 'User created successfully'
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            message: 'Registration failed'
        });
    }
});


app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`);

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username and password are required.'
        });
    }

    try {
        const usersRef = db.collection('users');
        const userDoc = await usersRef.doc(username).get();

        if (!userDoc.exists) {
            console.log(`User ${username} not found`);
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const userData = userDoc.data();

        
        const passwordMatch = await bcrypt.compare(password, userData.password);

        if (passwordMatch) {
            console.log(`Login successful for user ${username}`);
            res.status(200).json({
                message: 'Login successful'
            });
        } else {
            console.log(`Incorrect password for user ${username}`);
            res.status(401).json({
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            message: 'Login failed'
        });
    }
});


app.post('/api/message', async (req, res) => {
    const { message, sessionId } = req.body;

    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: message,
                languageCode: 'en-US',
            },
        },
    };

    try {
        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;

        res.json({ reply: result.fulfillmentText });
    } catch (error) {
        console.error('Dialogflow Error:', error);
        res.status(500).json({ error: 'Failed to communicate with Dialogflow' });
    }
});

app.post('/api/convert-instruction', async (req, res) => {
    const { instruction } = req.body;
    console.log(`Received instruction: ${instruction}`);

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Convert only non-gram measurements in this instruction to grams, keeping existing gram values unchanged , also convert tsp, tbsp and cups etc values to grams: \"${instruction}\"`;

        const result = await model.generateContent(prompt);
        const convertedInstruction = result.response.text();

        console.log(`Converted instruction: ${convertedInstruction}`);
        res.json({ convertedInstruction });
    } catch (error) {
        console.error('Error converting instruction:', error);
        res.status(500).json({ convertedInstruction: `Error processing instruction: ${instruction}` });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});