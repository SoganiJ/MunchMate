// api/message.js
import dialogflow from 'dialogflow';
import cors from 'cors';

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const keyFilename = process.env.DIALOGFLOW_KEY_PATH;

const {
    SessionsClient
} = dialogflow;

const sessionClient = new SessionsClient({
    projectId,
    keyFilename
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
        message,
        sessionId
    } = req.body;

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

        res.json({
            reply: result.fulfillmentText
        });
    } catch (error) {
        console.error('Dialogflow Error:', error);
        res.status(500).json({
            error: 'Failed to communicate with Dialogflow'
        });
    }
}
