console.log(`App.js booting up`);
const express = require('express');
const path = require('path');

const app = express();

// Set view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, '..', 'client')));


// Example route
app.get('/', (req, res) => {
    console.log("Hai");
  //  res.json({ game: 'Tempora', description: 'Become a god' });
    res.render('index', { title: 'Temproa | Home' , game: 'Tempora', description: 'Become a god' ,RandomText: "BLAH" });
});

// 404 Page
app.use((req, res) => {
  res.status(404).render('404',{ title: 'Lost? '});
});

// Define the endpoint /api/game-info
app.get('/game-info', (req, res) => {
  res.render('game-info', { title: 'Temproa | Info' , game: 'Tempora', description: 'Become a god' ,RandomText: "BLAH" });

//  res.json({ game: 'Tempora', description: 'Become a god' });
});

// Import and use routes
const DevlogsRouter = require("./routes/Devlogs");
app.use("/Devlogs", DevlogsRouter);

const WikiRouter = require("./routes/Wiki");
app.use("/Wiki", WikiRouter);

const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
