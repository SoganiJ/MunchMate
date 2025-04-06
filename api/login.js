// api/login.js
import { Firestore } from '@google-cloud/firestore';
import bcrypt from 'bcrypt';
import cors from 'cors';

const db = new Firestore({
    projectId: process.env.FIRESTORE_PROJECT_ID,
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
}
