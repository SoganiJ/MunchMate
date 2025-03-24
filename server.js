// api/server.js
import express from 'express';
import dialogflow from 'dialogflow'; // Import the entire dialogflow module as default
import cors from 'cors';

const { SessionsClient } = dialogflow; // Access SessionsClient from the default export

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const projectId = 'precisionbakinghack';
const keyFilename = 'precisionbakinghack-5fda293205d6.json';

const sessionClient = new SessionsClient({ projectId, keyFilename });

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

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });