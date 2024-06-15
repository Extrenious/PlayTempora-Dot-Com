console.log('App.js booting up');
const express = require('express');
const path = require('path');
const fs = require('fs');

const { GoogleAuth } = require('google-auth-library');
const { google } = require('googleapis');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Serve static files
app.use(express.static(path.join(__dirname, '..', '')));

// Example usage
const spreadsheetId = '1cVLnQOB6RpeNYx9MOn8q1MMxLfBtf0vVI1T3wKh9qAo';

let sheets;
try {
  // Corrected path to credentials.json
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
}

// Function to get values from Google Sheets
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
    throw err;
  }
}

const UpLogrange = 'UpdateLog!A:D';

// API endpoint to get data from Google Sheets
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


// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Route to serve the Home.html file
app.get('/Home', (req, res) => {
  const homePath = path.join(__dirname, '..', 'client', 'pages', 'Home.html');
  console.log(homePath);  // Log the path to check it
  res.sendFile(homePath);
});

app.get('/Hall', (req, res) => {
  const PagePath = path.join(__dirname, '..', 'client', 'pages', 'Hall.html');
  console.log(PagePath);
  res.sendFile(PagePath);
});

app.get('/Info', (req, res) => {
  const PagePath = path.join(__dirname, '..', 'client', 'pages', 'Info.html');
  console.log(PagePath);
  res.sendFile(PagePath);
});

const InfoPath = path.join(__dirname, '..', 'server', 'routes', 'Info.js');
const infoRoutes = require(InfoPath); // Assuming infoRoutes.js is in the same directory
app.use('/Info', infoRoutes);


app.get('/Feedback', (req, res) => {
  const PagePath = path.join(__dirname, '..', 'client', 'pages', 'Feedback.html');
  console.log(PagePath);
  res.sendFile(PagePath);
});



// 404 Page
app.use((req, res) => {
  res.status(404).send('404 Page not found');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
