const express = require('express');

// Init express app
const app = express();

// Setup Port
const port = process.env.PORT || 5000;

// Listening in port
app.listen(port, () => console.log(`Listening in port ${port}`));
