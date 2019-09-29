// Import express for creating REST APIs
const express = require('express');
const app = express();

// Import MongoDB client package
const MongoClient = require('mongodb').MongoClient;

// Set FoodFul MongoDB access credentials
const uri = "mongodb+srv://creativity:aJUfmZr63hauwhZ5@uni-azs3o.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Load all files in /public folder
app.use(express.static(__dirname + '/public'));

// Endpoint: Add a create to DB
app.post(`/api/creative`, (req, res) => {

  client.connect(err => {
    if (err) throw err;

    // Adding one sample creative
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

// Endpoint: Get all creatives from DB
app.get(`/api/creatives`, (req, res) => {
  
    let roles = req.query.roles;
    if (roles) {
      roles = roles.split(',');
    }

    // Continue if client credentials successfully connects
    client.connect(err => {
        if (err) throw err;
      
        // Access database uni
        const db = client.db('uni');

        const collection = db.collection('creatives');
        // Find some documents

        let filter = {};

        // Filter by role if necessary
        if (roles !== undefined) {
          filter = {"roles": { $in : roles}};
        }

        collection.find(filter).sort({ num: -1 }).toArray((err, docs) => {
          if (err) throw err;
            res.send(docs);
            client.close();
          });
    })
});

const PORT = process.env.PORT || 8001;

// Launch on localhost:PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
});