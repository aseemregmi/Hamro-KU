// Libraries
const express = require('express');
const cors = require('cors');

// Init express app
const app = express();

// Middlewares
// Cors
app.use(cors());
app.use(express.json());

app.get('/hi', (req, res) => {
  res.send(
    'Hey There I am from port 5000. I hope you are doing well. I am fine here and expect you to be fine too'
  );
});

// Setup Port
const port = process.env.PORT || 5000;

// Listening in port
app.listen(port, () => console.log(`Listening in port ${port}`));
