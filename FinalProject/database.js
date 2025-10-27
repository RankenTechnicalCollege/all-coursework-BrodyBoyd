import * as dotenv from 'dotenv';
dotenv.config();
import { MongoClient, ObjectId } from "mongodb";
import debug from 'debug';
const debugDb = debug('app:Database');


/** Generate/Parse an ObjectId */
const newId = (str) => ObjectId.createFromHexString(str);



/** Global variable storing the open connection, do not use it directly. */
let _db = null;
let _client = null;

/** Connect to the database */
async function connect() {
  if (!_db) {
    const dbUrl = process.env.DB_URL;
    const dbName = process.env.DB_NAME;
    _client = await MongoClient.connect(dbUrl);
    _db = _client.db(dbName);
    debugDb('Connected.');
  }
  return _db;
}

async function getClient(){ 
  if (!_client){
    await connect();
  }
  return _client;
}

/** Connect to the database and verify the connection */
async function ping() {
  const db = await connect();
  await db.command({ ping: 1 });
  debugDb('Ping.');
}

// FIXME: add more functions here
//User endpoints
async function getUsers(filter, sort, limit=0, skip=0){
  const db = await connect();
  let query = db.collection('users').find(filter).sort(sort);

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

async function getBugs(filter, sort, limit=0, skip=0){
  const db = await connect();
  let query = db.collection('bugs').find(filter).sort(sort);

  if (skip > 0) {
    query = query.skip(skip);
  }
  if (limit > 0) {
    query = query.limit(limit);
  }
  return query.toArray()
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

//comment endpoints

async function findBugsComments(bugId){
  const db = await connect();
  return db.collection('bugs').findOne({ _id: bugId },{ comments: 1, _id: 0 })
};

async function findSpecificComment(bugId, commentId){
  const db = await connect();
  return db.collection('bugs').findOne({ _id: bugId, "comments._id": commentId }, {projection: { comments: { $elemMatch: { _id: commentId } }}})
}

async function createComment(bugId, comment){
   const db = await connect();
   comment._id = new ObjectId();
   return db.collection('bugs').updateOne({_id: bugId}, {$push: {comments: comment}});
}

//Testcase endpoints

async function findBugsTestCases(bugId){
  const db = await connect();
  return db.collection('bugs').findOne({ _id: bugId })
};

async function findSpecificTestCase(bugId, testId){
  const db = await connect();
  return db.collection('bugs').findOne({ _id: bugId, "testcase._id": testId }, {projection: { testcase: { $elemMatch: { _id: testId } }}})
}

async function createTestcase(bugId, testcase) {
   const db = await connect();
   testcase._id = new ObjectId();
   return db.collection('bugs').updateOne({_id: bugId}, {$push: {testcase: testcase}});
}

async function updateTestCase(bugId, testId, status) {
  const db = await connect();
  const result = db.collection('bugs').updateOne({ _id: bugId, "testcase._id": testId }, {$set: {"testcase.$.status": status} });
  return result;
}

async function deleteTestCase(bugId, testId){
  const db = await connect();
  const result = await db.collection('bugs').updateOne({ _id: bugId },{ $pull: { testcase: { _id:testId}}});
  return result;
}
async function saveAuditLog(log){
  const db = await connect();
  const dbResult = await db.collection('AuditLog').insertOne(log);
  return dbResult;
}
export { newId, connect, ping, getUsers, getOneUser, getUserByEmail, registerUser, updateUser, deleteUser, getBugs, getBugById, createBug, updateBug, findBugsComments, createComment, findSpecificComment, findBugsTestCases, findSpecificTestCase, createTestcase, updateTestCase, deleteTestCase, getClient, saveAuditLog };

// test the database connection

