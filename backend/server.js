const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();

// Database URL and Database Name
const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'passop';
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Client Connection
let db;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect()
  .then(() => {
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Serve static files from the 'dist' directory (Vite build output)
app.use(express.static(path.join(__dirname, 'dist')));

// API routes

// Get all passwords
app.get('/api/passwords', async (req, res) => {
  try {
    const collection = db.collection('passwords');
    const passwords = await collection.find({}).toArray();
    res.json(passwords);
  } catch (err) {
    console.error('Error fetching passwords', err);
    res.status(500).send('Internal Server Error');
  }
});

// Save a password
app.post('/api/passwords', async (req, res) => {
  try {
    const password = req.body;
    const collection = db.collection('passwords');
    const result = await collection.insertOne(password);
    res.send({ success: true, result });
  } catch (err) {
    console.error('Error saving password', err);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a password
app.delete('/api/passwords', async (req, res) => {
  try {
    const { _id } = req.body; // Assuming you're sending the _id in the request body
    const collection = db.collection('passwords');
    const result = await collection.deleteOne({ _id });
    res.send({ success: true, result });
  } catch (err) {
    console.error('Error deleting password', err);
    res.status(500).send('Internal Server Error');
  }
});

// Catch-all route to serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
