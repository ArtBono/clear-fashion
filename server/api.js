const cors = require('cors');
const express = require('express');
const helmet = require('helmet');

const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require("mongodb").ObjectID;

const URI = 'mongodb+srv://Arthur:TuCroisQueJeTaiPasVu@clearfashion.ljwkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const  DATABASE_NAME = "clearfashion";
const client = new MongoClient(URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const PORT = 8092;

const app = express();

var database, collection;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.get('/products/search', (request, response) => {

  var filters = {};
  var limit, brand, price;

  limit = parseInt(request.query.limit, 10);

  if(request.query.brand !== undefined){
    brand = request.query.brand,
    filters["brand"] = brand;
  }
  if(request.query.price !== undefined){
    price = parseInt(request.query.price, 10);
    filters["price"] = price;
  }

  if(limit === undefined){
    collection.find(filters).sort({ price: 1 }).limit(12).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
    });
  } else {
    collection.find(filters).sort({ price: 1 }).limit(limit).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
    });
  }
});

app.get('/products/:id', (request, response) => {
  collection.findOne({ "_id": new ObjectId(request.params.id)}, (error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.get('/products', (request, response) => {
  collection.find({ }).toArray((error, result) => {
      if(error) {
          return response.status(500).send(error);
      }
      response.send(result);
  });
});

app.listen(PORT, () => {
  client.connect((error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("products");
    console.log("Connected to `" + DATABASE_NAME + "`!");
    console.log(`📡 Running on port ${PORT}`);
  });
});

// Export the Express API
module.exports = app;