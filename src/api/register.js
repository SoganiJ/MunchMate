// api/register.js
import { Firestore } from '@google-cloud/firestore';
import bcrypt from 'bcrypt';
import cors from 'cors';

// Initialize Firestore (use environment variables for credentials)
const db = new Firestore({
    projectId: process.env.FIRESTORE_PROJECT_ID,
    //credential: applicationDefault(),
    keyFilename: process.env.FIRESTORE_KEY_PATH,
});

export default async function handler(req, res) {
    // Enable CORS for all origins
    cors()(req, res, () => {});

    if (req.method !== 'POST') {
        return res.status(405).json({
            message: 'Method Not Allowed'
        });
    }

    const {
        username,
        password
    } = req.body;
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
}
