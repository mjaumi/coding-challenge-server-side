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
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.oa108nr.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1
});

console.log(uri);

const run = async () => {
    try {
        await client.connect();

        //collections here
        const sectorsCollection = client.db('survey-sector').collection('sectors');
        const surveyCollection = client.db('survey-sector').collection('survey');

        console.log('MongoDB Connected!');

        //GET API to fetch all the sectors data
        app.get('/sectors', async (req, res) => {
            const sectorData = await sectorsCollection.find({}).toArray();
            res.send(sectorData);
        });

        //GET API to fetch the latest survey data
        app.get('/getLatestSurveyData', async (req, res) => {
            const latestSurveyData = await surveyCollection.find().limit(1).sort({ $natural: -1 }).toArray();
            res.send(latestSurveyData);
        })

        //POST API to put survey data into database
        app.post('/addSurvey', async (req, res) => {
            const addSurvey = await surveyCollection.insertOne(req.body);
            res.send(addSurvey);
        });

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