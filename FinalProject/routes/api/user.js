import express from 'express';

const router = express.Router();

import debug from 'debug';
const debugUser = debug('app:User');
import { getUsers, getOneUser, getUserByEmail, registerUser, updateUser, deleteUser } from '../../database.js';
import bcrypt from 'bcrypt';




router.get('', async (req, res) => {
  
  try {
    const users = await getUsers();
    if (!users){
    return res.status(500).send('Error retrieving users')
  }else {
  res.status(200).json(users);
  }
  }
  catch (err) {
    return res.status(500).send('Error')
  }
  
});
//^ working


router.get('/:userId', async (req, res) => {
 try {
  const userId = req.params.userId
  const user = await getOneUser(userId)
  if (user){
    res.status(200).json(user);
  }
  else {
    res.status(404).send('User not found');
  }
}
catch (err) {
  res.status(500).send('Server Error')
}
})
//^ Working

router.post('/register', async (req, res) => {
  try {
  const newUser= req.body;

  if (await getUserByEmail(newUser.email)){
    return res.status(400).json({message: 'Email already in use'})
  }
  if (!newUser.email) {
    res.status(400).send('Email is required')
    return;
  }
  if (!newUser.password) {
    res.status(400).type('text/plain').send('Password is required')
    return;
  }
  if (!newUser.fullName) {
    res.status(400).send('Full name is required')
    return;
  }
  if (!newUser.givenName) {
    res.status(400).send('First name is required')
    return;
  }
  if (!newUser.familyName) {
    res.status(400).send('Last name is required')
    return;
  }
  if (!newUser.role) {
    res.status(400).send('Role is required')
    return;
  }
  newUser.createdAt = new Date()
  newUser.password = await bcrypt.hash(newUser.password, 10)
  const result = await registerUser(newUser);
  if (result.insertedId) {
    res.status(201).json({ id: result.insertedId, ...newUser });
  } else {
    res.status(500).send('Error adding user');
  }
}
catch(err) {
  res.status(500).send('error')
}

});
//^ Working

router.post('/login', async (req,res) => {
  const {email, password} = req.body;
  let existingUser = null;
  try {
    existingUser = await getUserByEmail(email);
  }catch(err){
    debugUser(`Error fetching user by email: ${err}`)
  }
  if (!email) {
    res.status(400).send('Email is required');
    return;
  }
  else if (!password) {
    res.status(400).send('Password is required');
    return;
  }
  if (existingUser && await bcrypt.compare(password, existingUser.password)){
    res.status(200).json({message: 'Welcome To LawnConnect', user: existingUser})
  }else if (existingUser && existingUser.password == password){
    res.status(200).json({message: 'Welcome To LawnConnect', user: existingUser})
  }
  else {
    res.status(401).json({message: 'Invalid email or password'})
  }
})
//^ Working

router.patch('/:userId', async (req,res) => {
  try {
  const userId = req.params.userId;
  const user = await getOneUser(userId);
    if (!user) {
      return res.status(404).json({ error: `Bug ${userId} not found` });
    }
  const updatedData = req.body;
  updatedData.lastUpdated = new Date();
  const result = await updateUser(userId, updatedData)
  if (result.modifiedCount === 1) {
    res.status(200).json({message: 'User updated successfully'})
  } else {
    res.status(404).json({message: 'User not found'})
  }}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working

router.delete('/:userId', async (req,res) => {
 try { 
  const userId = req.params.userId;
  const user = await getOneUser(userId);
    if (!user) {
      return res.status(404).json({ error: `Bug ${userId} not found` });
    }
  const results = await deleteUser(userId);
  if (results.deletedCount === 1){
    res.status(200).json({message: 'User deleted successfully'});
  } else {
    res.status(404).json({message: 'User not found'})
  }
 }
 catch(err){
  res.status(500).send('Server Error')
 }
});
//^ Working

export { router as userRouter }