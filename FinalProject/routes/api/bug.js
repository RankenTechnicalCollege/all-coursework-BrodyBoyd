import express from 'express';
const router = express.Router();
import joi from 'joi';
import debug from 'debug';
const debugBug = debug('app:BugRouter');
import { getBugs, getBugById, createBug, updateBug, findBugsComments } from '../../database.js';
import { createBugSchema, updateSchema, classifySchema, assignSchema, closeSchema } from '../../validation/bugSchema.js'
import { validate } from '../../middleware/joiValidator.js'
import { validId } from '../../middleware/validId.js'


router.use(express.urlencoded({extended:false}));


const currentDate = new Date()

router.get('', async (req,res) => {
  try {
    const bugs = await getBugs();
    if (!bugs){
    return res.status(500).send('Error retrieving Bugs')
  }else {
  res.status(200).json(bugs);
  }
  }
  catch (err) {
    return res.status(500).send('Error')
  }
});
//^ Working with validate 03-02

router.get('/:bugId', validId('bugId'), async (req,res) => {
  try {
  const bugId = req.bugId
  const bug = await getBugById(bugId)
  
  if (bug){
    res.status(200).json(bug);
  }
  else {
    res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
  }
}
catch (err) {
  res.status(500).json('Error')
}
});
//^ Working with validate 03-02

router.post('', validate(createBugSchema), async (req,res) => {
  try {
  const newBug = req.body;
    newBug.createdAt = new Date()
    newBug.comments = [{}]
  const result = await createBug(newBug);
  if (result.insertedId) {
    res.status(201).json({ id: result.insertedId, ...newBug });
  } else {
    res.status(500).send('Error adding bug');
  }} catch (err) {
    res.status(500).json({error: 'server error'})
  }
});
//^ Working with validate 03-02

router.patch('/:bugId', validate(updateSchema), validId('bugId'), async (req,res) => {
  try {
  const bugId = req.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} Not Found.` });
    }
    const updatedData = req.body;
    updatedData.lastUpdated = new Date();
    const result = await updateBug(bugId, updatedData);
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} updated!`, bugId })
  } else {
    res.status(404).json({error: 'Bug not found'})
  }}
  catch(err){
    res.status(500).send('Server Error')
  }});
//^ Working with validate 03-02

router.patch('/:bugId/classify', validate(classifySchema), validId('bugId'),  async (req,res) => {  
  try {
    const bugId = req.bugId;
    const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `Bug ${bugId} Not Found` });
    }
    const updatedData = req.body;
    updatedData.classification = req.body.classification;
    updatedData.lastUpdated = new Date();
    updatedData.classifiedOn = new Date();
    const result = await updateBug(bugId, updatedData);
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: `Bug ${bugId} Classified!`, bugId });
    } else {
      res.status(404).json({ error: 'Bug not found' });
    }
  }catch (err) {
    res.status(500).send('Server error');
  }
});
//^ Working with validate 03-02

router.patch('/:bugId/assign', validate(assignSchema), validId('bugId'), async (req,res) => {
  try {
  const bugId = req.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} Not Found.` });
    }
      const newAssignments = req.body
      newAssignments.lastUpdated = new Date();
      newAssignments.assignedOn = new Date();

      const result = await updateBug(bugId, newAssignments)
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: `Bug ${bugId} assigned!`, bugId })
      } else {
        res.status(404).json({error: 'Bug not found'})
      }
    }
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working with validate 03-02

router.patch('/:bugId/close', validate(closeSchema), validId('bugId'), async (req,res) => {
  try {
  const bugId = req.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} Not Found.` });
    }
  const closed = req.body
  closed.closedOn = new Date();
  closed.lastUpdated = new Date();

  const result = await updateBug(bugId, closed)
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} Closed status changed!`, bugId })
  } else {
    res.status(404).json({error: 'Bug not found'})
  }
}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working with validate 03-02

//COMMENT APIS

router.get('/:bugId/comments', validId('bugId'), async (req,res) => { //list all
try {
  const bugId = req.bugId
  const comments = await findBugsComments(bugId)
  
  if (comments){
    res.status(200).json(comments.comments);
  }
  else {
    res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
  }
}
catch (err) {
  res.status(500).json('Error')
}
});

router.get('/:bugId/comments/:commentId', validId('bugId'), validId('commentId'), async (req,res) => { // search specific comment
try {
  const bugId = req.bugId
  const commentId = req.commentId
  const comments = await findBugsComments(bugId)
  
  if (comments){
    res.status(200).json(comments.comments);
  }
  else {
    res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
  }
}
catch (err) {
  res.status(500).json('Error')
}
})

router.post('/:bugId/comments', async (req,res) => { // add comment

})
export { router as BugRouter }