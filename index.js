const express = require('express')
const bodyParser = require('body-parser')
const password = 'B5$hbre3@hJ@yNr'

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
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

 app.get('/products', (req,res) => {
   collection.find({})
   .toArray( (err, documents) => {
     res.send(documents)
   })
 })
 app.get('/product/:id', (req,res)=>{
  collection.find({_id: ObjectId(req.params.id)})
  .toArray((err, documents) => {
    res.send(documents[0])
  })
})
  app.post("/addProduct", (req,res)=>{
      const pd = req.body
      collection.insertOne(pd)
      .then(result => {
        console.log('data added')
        res.redirect('/')
    })
      console.log(pd)
  })
  
 app.patch('/update/:id', (req,res)=> {
   collection.updateOne({_id: ObjectId(req.params.id)},
   {
     $set:{price: req.body.price}
   })
   .then(result => {
      res,send(result.modifiedCount > 0)
   })
 })

app.delete('/delete/:id', (req,res) =>{
  collection.deleteOne({_id: ObjectId(req.params.id)})
  .then(( result) =>{
    res.send(result.deletedCount > 0)
  })
})
  
});

app.listen(3000, () => console.log("server running "))