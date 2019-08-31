const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:6atKluiQ93uD7tHW@cluster0-iyhxj.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'uni';

const apiKey = '422D';

app.use(express.static(__dirname + '/public'));

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
    } else {
        res.end();
    }

    const insertDocuments = (db, callback) => {
        // Get the documents collection
        const collection = db.collection('documents');
        // Insert some documents
        collection.insertMany([{a : 1}, {a : 2}, {a : 3}],(err, result) => {
          console.log(result);
          callback(result);
        });
      }

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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});