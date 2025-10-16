import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId } from 'mongodb';
import debug from 'debug';
const debugDB = debug('app:db');

let _db = null;

async function connect() {
  if (!_db) {
    const dbUrl = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    const client = await MongoClient.connect(dbUrl);
    _db = client.db(dbName);
    debugDB('Connected to MongoDB');
  }
  return _db;
}

async function getProducts() {
  const db = await connect();
  return db.collection('products').find().toArray();
}

async function getOneProduct(productId) {
  const db = await connect();
  return db.collection('products').findOne({ _id: productId });
}

async function createProduct(product) {
  const db = await connect();
  product._id = new ObjectId();
  return db.collection('products').insertOne(product);
}

async function getProductByName(productName) {
  const db = await connect();
  return db.collection('products').findOne({ name: productName });
}

async function updateProduct(productId, updatedData) {
  const db = await connect();
  const result = await db.collection('products').updateOne({_id: productId}, {$set: updatedData });
  return result;
}

async function deleteProduct(productId) {
  const db = await connect();
  const result = await db.collection('products').deleteOne({_id: productId});
  return result;
}

export { getProducts, getOneProduct, createProduct, getProductByName, deleteProduct, updateProduct };