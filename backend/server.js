
const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()
const { MongoClient } = require('mongodb');
const bodyparser = require('body-parser');
const cors = require("cors")

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';
const port = 3000
app.use(bodyparser.json());
app.use(cors());


client.connect();
const db = client.db(dbName);

//Get all the passwords
app.get('/', async (req, res) => {
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//Save a password
app.post('/', async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({ success: true, result: findResult })
})

//Delete a password
app.delete('/', async (req, res) => {
    const password = req.body
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({ success: true, result: findResult })
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})