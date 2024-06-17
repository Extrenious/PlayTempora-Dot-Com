console.log('App.js booting up');
const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');

const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '..', '')));

const spreadsheetId = '1cVLnQOB6RpeNYx9MOn8q1MMxLfBtf0vVI1T3wKh9qAo';
let sheets;

try {
  const credentialsPath = path.join(__dirname, 'credentials.json');
  const credentials = JSON.parse(fs.readFileSync(credentialsPath));

  const { client_email, private_key } = credentials;

  const auth = new GoogleAuth({
    credentials: {
      client_email,
      private_key,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  sheets = google.sheets({ version: 'v4', auth });

} catch (err) {
  console.error('Error loading credentials:', err);
  process.exit(1); // Exit the process if credentials cannot be loaded
}

async function getValues(spreadsheetId, range) {
  try {
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
    const numRows = result.data.values ? result.data.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    return result.data.values;
  } catch (err) {
    console.error('The API returned an error:', err);
    throw err; // Re-throw the error to be caught by the global error handler
  }
}

const UpLogrange = 'UpdateLog!A:D';
app.get('/api/data/UpdateLog', async (req, res) => {
  try {
    const data = await getValues(spreadsheetId, UpLogrange);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
});

const Sug_range = 'Suggestions!A:D';
app.get('/api/data/Suggestions', async (req, res) => {
  try {
    const data = await getValues(spreadsheetId, Sug_range);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from Google Sheets' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Add more routes as needed...

app.use((req, res) => {
  res.status(404).send('404 Page not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
