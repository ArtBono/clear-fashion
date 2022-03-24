const fs = require('fs');
const {MongoClient} = require('mongodb');
const MONGODB_URI = 'mongodb+srv://Arthur:TuCroisQueJeTaiPasVu@clearfashion.ljwkc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const MONGODB_DB_NAME = 'dedicatedbrand';

let collection=null;
let db=null;
 
const Connection = async()=>
{
    const client = await MongoClient.connect(MONGODB_URI, {'useNewUrlParser': true});
    db =  client.db(MONGODB_DB_NAME)
    //await importData();
    //await productsOfABrand('dedicated');
    //await productsLessThanAprice(10);
    //await productsSortedByDate();
    //await productsSortedByPrice();
    //await productsScrapedLessThanTwoWeeksAgo();
	await productsById("1418eebd-4f43-52a6-bd36-9f51406bea67");
    process.exit()   
}

const importData = async()=>
{
    const collection = db.collection('products')
    const result = collection.insertMany(products)
    console.log(result);    
}

const productsOfABrand = async(brand)=>
{
    collection = db.collection('products')
    const products = await collection.find({brand}).toArray();
    console.log(products);
}

const productsLessThanAprice = async(price)=>
{
    collection = db.collection('products')
    const products = await collection.find({price:{$lt:price}}).toArray();
    console.log(products);
}


const productsSortedByPrice = async()=>
{
    collection = db.collection('products')
    const products = await collection.find({}).sort({'price':1}).toArray();
    console.log(products);
}

const productsSortedByDate = async()=>
{
    collection = db.collection('products')
    const products = await collection.find({}).sort({"date":1}).toArray();
    console.log(products);
}

const productsScrapedLessThanTwoWeeksAgo=async()=>
{
    const date=Date.now()
    console.log(date)
    const products = await collection.aggregate([
        {$project:{'_id':1,'brand':1,'price':1,'name':1,'link':1,'photo':1,dateDifference: {$subtract: [ date, "$date" ] }}},
        {$match: {dateDifference:{$lt:1000000000000000000000000000000000}}}
    ]).toArray();
    console.log(products);
}

const productsById = async(id)=>
{
    collection = db.collection('products')
    const products = await collection.find({"_id":id}).toArray();
    console.log(products);
}


Connection();