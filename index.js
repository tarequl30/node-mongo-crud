const express = require('express')
const bodyParser = require('body-parser')
const password = 'B5$hbre3@hJ@yNr'

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://organicUser:B5$hbre3@hJ@yNr@cluster0.5gken.mongodb.net/organicdb?retryWrites=true&w=majority";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("organicdb").collection("products");
  app.post("/addProduct", (req,res)=>{
      const pd = req.body
      collection.insertOne(pd)
      .then(result => {
        console.log('data added')
        res.send('success')
      })
      console.log(pd)
  })

  
});

app.listen(3000, () => console.log("server running "))