const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

// Middlewares
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7r6jn89.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const servicesCollection = client.db("car-care").collection("services");

        app.get('/services', async (req, res) => {
            const query = {};
            const service = await servicesCollection.findOne(query);
            res.send(service);
        })
    }
    finally {

    }
}

run().catch(error => (console.log(error)))


app.get('/', (req, res) => {
    res.send('Server is running');
})

app.get('/test', (req, res) => {
    const testData = [
        {
            "testData": "testing data"
        }
    ]

    res.send(testData)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})