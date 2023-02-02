const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middlewires here
app.use(cors());
app.use(express.json());

// database connection here
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oa108nr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async () => {
    try {
        await client.connect();


        console.log('MongoDB Connected!');
    } finally {

    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Coding Challenge Server Running');
});

app.listen(port, () => {
    console.log('Listening to PORT', port);
});