// Libraries
const express = require('express');
const cors = require('cors');
const path = require('path');

// Init express app
const app = express();

// Middlewares
// Cors
app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + './../client/build'));

// Routes
const { kuNewsAndEvents } = require('./routes/api/kunewsandevents');

// Setup routes
app.use('/api/kunewsandevents', kuNewsAndEvents);

// React should be serve only at the end so that routes will not me mismatched
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + './../', 'client', 'build', 'index.html'));
});

// Setup Port
const port = process.env.PORT || 5000;

// Listening in port
app.listen(port, () => console.log(`Listening in port ${port}`));
