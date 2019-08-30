const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:6atKluiQ93uD7tHW@cluster0-iyhxj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'uni';

const apiKey = '422D';

app.get(`/api/designers`, (req, res) => {
    const key = req.query.key;

    if (key === apiKey) {
        client.connect(err => {
            if (err) throw err;

            const db = client.db(dbName);

            findDocuments(db, docs => {
                res.send(docs);
                client.close();
            });
        })
    }
    res.end();

    const findDocuments = (db, callback) => {
        // Get the documents collection
        const collection = db.collection('documents');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
          if (err) throw err;
          callback(docs);
        });
      }
});

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});