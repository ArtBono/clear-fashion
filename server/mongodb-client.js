"use strict";

// Import the dependency.
const { MongoClient } = require('mongodb');

const URI = 'mongodb+srv://Arthur:TuCroisQueJeTaiPasVu@clearfashion.ljwkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {

  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (hot module replacement).
   if (!global._mongoClientPromise) {
      client = new MongoClient(URI, options);
      global._mongoClientPromise = client.connect();
   }

   clientPromise = global._mongoClientPromise;
} else {

  // In production mode, it's best to not use a global variable.
  client = new MongoClient(URI, options);
  clientPromise = client.connect()
}

  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
module.exports = clientPromise;