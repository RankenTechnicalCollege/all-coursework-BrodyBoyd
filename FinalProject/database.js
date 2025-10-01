import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId } from "mongodb";
import debug from 'debug';
const debugDb = debug('app:Database');


/** Generate/Parse an ObjectId */
const newId = (str) => ObjectId.createFromHexString(str);



/** Global variable storing the open connection, do not use it directly. */
let _db = null;

/** Connect to the database */
async function connect() {
  if (!_db) {
    const dbUrl = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    const client = await MongoClient.connect(dbUrl);
    _db = client.db(dbName);
    debugDb('Connected.');
  }
  return _db;
}

/** Connect to the database and verify the connection */
async function ping() {
  const db = await connect();
  await db.command({ ping: 1 });
  debugDb('Ping.');
}

// FIXME: add more functions here
//User endpoints
async function getUsers(){
  const db = await connect();
  return db.collection('users').find({}).toArray();
}

async function getOneUser(userId){
  const db = await connect();
  return db.collection('users').findOne({_id: userId})
}

async function registerUser(user){
   const db = await connect();
   user._id = new ObjectId();
   return db.collection('users').insertOne(user);
}

async function getUserByEmail(email){
  const db = await connect();
  const user = await db.collection('users').findOne({email:email})
  return user;
}

async function updateUser(userId, updatedData){
  const db = await connect();
  const result = await db.collection('users').updateOne({_id: userId}, {$set: updatedData})
  return result;
}

async function deleteUser(userId){
  const db = await connect();
  const result = await db.collection('users').deleteOne({_id: userId});
  return result;
}

//Bug endpoints 

async function getBugs(){
  const db = await connect();
  return db.collection('bugs').find({}).toArray();
}

async function getBugById(bugId){
  const db = await connect();
  return db.collection('bugs').findOne({_id: bugId})
}

async function createBug(bug){
   const db = await connect();
   bug._id = new ObjectId();
   return db.collection('bugs').insertOne(bug);
}

async function updateBug(bugId, updatedData){
  const db = await connect();
  const result = await db.collection('bugs').updateOne({_id: bugId}, {$set: updatedData})
  return result;
}


export { newId, connect, ping, getUsers, getOneUser, getUserByEmail, registerUser, updateUser, deleteUser, getBugs, getBugById, createBug, updateBug };

// test the database connection

