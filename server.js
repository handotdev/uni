const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:SweetTea@foodful-cluster-msulm.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname + '/public'));

app.post(`/api/designer`, (req, res) => {

  client.connect(err => {
    if (err) throw err;

    const name = 'Katie Go';
    const pic = 'https://i.postimg.cc/HxDyPDNM/cecilia.jpg';
    const role = ['writer', 'designer'];
    const tag = '@alohakatiex';
    const bio = 'Katie is a YouTuber, GO-getter, and tropigal from Manila, Philippines. When she’s not creating videos, she\'s fangirling over YA novels.';
    const site = 'youtube.com/alohakatiex';
    const social = {instagram: '', facebook: ''};

    const db = client.db('uni');

    const collection = db.collection('creatives');

    collection.insertOne({name: name, pic: pic, role: role, tag: tag, bio: bio, site: site, social: social}, (err, result) => {
      console.log(result);
      res.end();
      client.close();
    });
  })
})

app.get(`/api/designers`, (req, res) => {
    const key = req.query.key;

    client.connect(err => {
        if (err) throw err;

        const db = client.db('uni');

        const collection = db.collection('creatives');
        // Find some documents
        collection.find({}).toArray(function(err, docs) {
        if (err) throw err;
          res.send(docs);
          client.close();
        });
    })
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});