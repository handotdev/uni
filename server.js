const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:SweetTea@foodful-cluster-msulm.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static(__dirname + '/public'));

app.post(`/api/creative`, (req, res) => {

  client.connect(err => {
    if (err) throw err;

    const name = 'Han Wang';
    const pic = 'https://i.postimg.cc/K8KBNTLm/han.jpg';
    const roles = ['code', 'design'];
    const tag = '@hanywang';
    const bio = 'Han is a software engineer and all-around nice guy. He’s current working to improve agricultural technologies. He also built this site.';
    const site = 'hanywang2.github.io/portfolio';
    const social = {github: '', linkedin: ''};

    const db = client.db('uni');

    const collection = db.collection('creatives');

    collection.insertOne({name: name, pic: pic, roles: roles, tag: tag, bio: bio, site: site, social: social}, (err, result) => {
      console.log(result);
      res.end();
      client.close();
    });
  })
})

app.get(`/api/creatives`, (req, res) => {
  
    let roles = req.query.roles;
    if (roles) {
      roles = roles.split(',');
    }

    client.connect(err => {
        if (err) throw err;

        const db = client.db('uni');

        const collection = db.collection('creatives');
        // Find some documents

        let filter = {};

        if (roles !== undefined) {
          filter = {"roles": { $in : roles}};
        }

        collection.find(filter).toArray((err, docs) => {
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