import express from 'express';
import joi from 'joi';
const router = express.Router();
import debug from 'debug';
const debugUser = debug('app:User');
import { getUsers, getOneUser, getUserByEmail, registerUser, updateUser, deleteUser } from '../../database.js';
import bcrypt from 'bcrypt';
import { registerSchema, loginSchema, updateSchema } from '../../validation/userSchema.js'
import { validate } from '../../middleware/joiValidator.js'
import { validId } from '../../middleware/validId.js'




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
//^ working with validate 03-02


router.get('/:userId', validId('userId'), async (req, res) => {
 try {
  const userId = req.userId
  const user = await getOneUser(userId)
  try {
  
  if (!user){
    res.status(400).json({error: 'User Not Found'})
  } else {
    res.status(200).json(user);
  }
}
  catch(err) {
    res.status(404).json({error: `userId ${userId} is not a valid ObjectId.`});
  }
}
catch (err) {
  res.status(500).send('Server Error')
}
})
//^ Working with validate 03-02

router.post('/register', validate(registerSchema), async (req, res) => {
  try {
  const newUser = req.body;
  if (await getUserByEmail(newUser.email)) {
    return res.status(400).json({ message: 'Email already in use' });
  }
    newUser.createdAt = new Date();
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const result = await registerUser(newUser);
    if (result.insertedId) {
      res.status(201).json({ id: result.insertedId, ...newUser });
    } else {
      res.status(500).send('Error adding user');
    }
} catch (err) {
    res.status(500).json({error: 'server error'})
  }
});
//^ Working with validate 03-02

router.post('/login', validate(loginSchema), async (req,res) => {
  try {
  const {email, password} = req.body;
  let existingUser = null;
  try {
    existingUser = await getUserByEmail(email);
  }catch(err){
    debugUser(`Error fetching user by email: ${err}`)
  }
    if (existingUser && await bcrypt.compare(password, existingUser.password)){
    res.status(200).json({message: 'Welcome In', user: existingUser})
  }else if (existingUser && existingUser.password == password){
    res.status(200).json({message: 'Welcome In', user: existingUser})
  }
  else {
    res.status(401).json({message: 'Invalid email or password'})
  }
  } catch (err) {
    res.status(500).json({error: 'server error'})
  }

  
})
//^ Working with validate 03-02

router.patch('/:userId', validate(updateSchema), validId('userId'), async (req,res) => {
  try {
  const userId = req.userId;
  const user = await getOneUser(userId);
    if (!user) {
      return res.status(404).json({ error: `userId ${userId} is not a valid ObjectId.` });
    }
    const updatedData = req.body;
  updatedData.lastUpdated = new Date();
  const result = await updateUser(userId, updatedData)
  if (result.modifiedCount === 1) {
    res.status(200).json({message: 'User updated successfully'})
  } else {
    res.status(404).json({message: 'User not found'})
  }
}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working with validate 03-02

router.delete('/:userId', validId('userId'), async (req,res) => {
 try { 
  const userId = req.userId;
  try{
  
  const user = await getOneUser(userId);
  const results = await deleteUser(userId);
  if (results.deletedCount === 1){
    res.status(200).json({message: 'User deleted successfully'});
  } else {
    res.status(404).json({message: 'User not found'})
  }
 }
catch (err){
  return res.status(404).json({ error: `userId ${userId} is not a valid ObjectId.` });
 }}
 catch(err){
  res.status(500).send('Server Error')
 }
});
//^ Working with validate 03-02

export { router as userRouter }