import express from 'express';
import joi from 'joi';
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
//^ working 03-02


router.get('/:userId', async (req, res) => {
 try {
  const userId = req.params.userId
  try {
  const user = await getOneUser(userId)
  if (user){
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
//^ Working 03-02

router.post('/register', async (req, res) => {
  try {
  const newUser = req.body;

  if (await getUserByEmail(newUser.email)) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const schema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().required(),
    givenName: joi.string().required(),
    familyName: joi.string().required(),
    role: joi.string().valid('Developer', 'Business Analyst', 'Quality Analyst', 'Product Manager', 'Technical Manager').required()
  });

  try {
    await schema.validateAsync({
      email: newUser.email,
      password: newUser.password,
      givenName: newUser.givenName,
      familyName: newUser.familyName,
      role: newUser.role
    });
    newUser.createdAt = new Date();
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const result = await registerUser(newUser);
    if (result.insertedId) {
      res.status(201).json({ id: result.insertedId, ...newUser });
    } else {
      res.status(500).send('Error adding user');
    }
  } catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }} catch (err) {
    res.status(500).json({error: 'server error'})
  }
});
//^ Working 03-02

router.post('/login', async (req,res) => {
  try {
  const {email, password} = req.body;
  let existingUser = null;
  try {
    existingUser = await getUserByEmail(email);
  }catch(err){
    debugUser(`Error fetching user by email: ${err}`)
  }
  const schema = joi.object({
    email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().required()
  })
  try {
    await schema.validateAsync({
      email: email,
      password: password
    });
    if (existingUser && await bcrypt.compare(password, existingUser.password)){
    res.status(200).json({message: 'Welcome In', user: existingUser})
  }else if (existingUser && existingUser.password == password){
    res.status(200).json({message: 'Welcome In', user: existingUser})
  }
  else {
    res.status(401).json({message: 'Invalid email or password'})
  }
  } catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }} catch (err) {
    res.status(500).json({error: 'server error'})
  }

  
})
//^ Working 03-02

router.patch('/:userId', async (req,res) => {
  try {
  const userId = req.params.userId;
  const user = await getOneUser(userId);
    if (!user) {
      return res.status(404).json({ error: `userId ${userId} is not a valid ObjectId.` });
    }

    const schema = joi.object({
      password: joi.string(),
      fullName: joi.string(),
      givenName: joi.string(),
      familyName: joi.string(),
      role: joi.string().valid('Developer', 'Business Analyst', 'Quality Analyst', 'Product Manager', 'Technical Manager')
    });

  try {
    const updatedData = req.body;
      await schema.validateAsync({
        password: updatedData.password,
        fullName: updatedData.fullName,
        givenName: updatedData.givenName,
        familyName: updatedData.familyName,
        role: updatedData.role
      });

  updatedData.lastUpdated = new Date();
  const result = await updateUser(userId, updatedData)
  if (result.modifiedCount === 1) {
    res.status(200).json({message: 'User updated successfully'})
  } else {
    res.status(404).json({message: 'User not found'})
  }
}
  catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }
}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working 03-02

router.delete('/:userId', async (req,res) => {
 try { 
  const userId = req.params.userId;
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
//^ Working 03-02

export { router as userRouter }