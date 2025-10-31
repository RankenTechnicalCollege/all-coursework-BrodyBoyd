import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId } from 'mongodb';
import debug from 'debug';
const debugDB = debug('app:db');

let _db = null;
let _client = null

async function connect() {
  if (!_db) {
    const dbUrl = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    _client = await MongoClient.connect(dbUrl);
    _db = _client.db(dbName);
    debugDB('Connected to MongoDB');
  }
  return _db;
}
async function getClient(){ 
  if (!_client){
    await connect();
  }
  return _client;
}

async function getProducts(filter, sort, limit=0, skip=0) {
  const db = await connect();
  let query = db.collection('products').find(filter).sort(sort);

  if (skip > 0) {
    query = query.skip(skip);
  }
  if (limit > 0) {
    query = query.limit(limit);
  }
  return query.toArray()
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

//USER FUNCTIONS 
async function getUsers(filter, sort, limit=0, skip=0){
  const db = await connect();
  let query = db.collection('user').find(filter).sort(sort);

  if (skip > 0) {
    query = query.skip(skip);
  }
  if (limit > 0) {
    query = query.limit(limit);
  }
  return query.toArray()
}

async function getOneUser(userId){
  const db = await connect();
  return db.collection('user').findOne({_id: userId})
}

async function updateUser(userId, updatedData){
  const db = await connect();
  const result = await db.collection('user').updateOne({_id: userId}, {$set: updatedData})
  return result;
}

export { getUsers, updateUser, getOneUser, getClient, getProducts, getOneProduct, createProduct, getProductByName, deleteProduct, updateProduct, connect };