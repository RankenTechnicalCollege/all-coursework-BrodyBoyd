import express from 'express';
import joi from 'joi';
const router = express.Router();
import debug from 'debug';
const debugUser = debug('app:User');
import {isAuthenticated} from '../../middleware/isAuthenticated.js'
import { validId } from '../../middleware/validId.js';
import { getUsers,getOneUser,updateUser } from '../../database.js';
import { ObjectId } from 'mongodb'
import { validate } from '../../middleware/joiValidater.js';
import {updateUserSchema} from '../../validation/userSchema.js'
import { hasRole } from '../../middleware/hasRole.js';

router.get('/', async (req, res) => {
  try {
    const {keywords, role, minAge, maxAge, page, limit, sortBy} = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    const filter = {};
    if (keywords) { filter.$text = { $search: keywords }; }
    if (role) { filter.role = role; }

    if (minAge || maxAge) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dateFilter = {};

      if (maxAge) {dateFilter.$gte = new Date(today.getTime() - maxAge * 24 * 60 * 60 * 1000); }
      if (minAge) {dateFilter.$lt = new Date(today.getTime() - minAge * 24 * 60 * 60 * 1000); }

      filter.createdAt = dateFilter;
    }
    const sortOptions = {
      familyName: {familyName: 1, givenName: 1, createdAt: 1},
      newest: {createdAt: -1},
      role: {role: 1, givenName: 1, familyName: 1, createdAt: 1},
      givenName: {givenName: 1, familyName: 1, createdAt: 1},
      oldest: {createdAt: 1}
    };
    const sort = sortOptions[sortBy] || {givenName: -1}
    

    const users = await getUsers(filter, sort, limitNum, skip);
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

router.get('/me', isAuthenticated, async (req,res) => {
try {
  res.status(200).json({
    message: "Current User",
    userId: req.user.id,
    email: req.user.email,
    givenName: req.user.givenName,
    familyName: req.user.familyName,
    role: req.user.role,
    name: req.user.name
  })
} catch (err) {
  res.status(401).json({error: "server error"})
}
})

router.get('/:userId', isAuthenticated, validId('userId'), async (req, res) => {
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


router.patch('/me', isAuthenticated, validate(updateUserSchema),async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: Missing user info' });
    }

    const userId = req.user.id;
    const correctId = new ObjectId(userId)
    console.log(correctId);

    const user = await getOneUser(correctId);
    if (!user) {
      return res.status(404).json({ error: `User with ID ${userId} not found.` });
    }

    const updatedData = {
      ...req.body,
      role: req.user.role,
      lastUpdated: new Date()
    };

    const result = await updateUser(correctId, updatedData);
    if (!result) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.status(200).json({ message: 'User updated successfully' });
    }
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).send('Server Error');
  }
});

export {router as userRouter }