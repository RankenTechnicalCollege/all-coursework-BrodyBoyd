import express from 'express';
const router = express.Router();

import debug from 'debug';
const debugBug = debug('app:BugRouter');
import { getBugs, getBugById, createBug, updateBug } from '../../database.js';


router.use(express.urlencoded({extended:false}));


const currentDate = new Date()

function requireKey(keyName) {
        return (req, res, next) => {
            if (!req.body || !req.body[keyName]) {
                return res.status(400).send(`Missing required key: '${keyName}' in request body.` );
            }
            next();
        };
    }

    
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
//^ Working

router.get('/:bugId', async (req,res) => {
  try {
  const bugId = req.params.bugId
  const bug = await getBugById(bugId)
  
  if (bug){
    res.status(200).json(bug);
  }
  else {
    res.status(404).json({ error: `Bug ${bugId} not found.` });
  }
}
catch (err) {
  res.status(500).json('Error')
}
});
//^ Working

router.post('', async (req,res) => {
  try {
  const newBug = req.body;

  if (!newBug.title) {
    res.status(400).type('text/plain').send('Title is Required')
    return;
  }
  if (!newBug.description) {
    res.status(400).type('text/plain').send('Description is required')
    return;
  }
  if (!newBug.stepsToReproduce) {
    res.status(400).type('text/plain').send('Steps of how to reproduce bug is required')
    return;
  }
  newBug.createdAt = new Date()
  const result = await createBug(newBug);
  if (result.insertedId) {
    res.status(201).json({ id: result.insertedId, ...newBug });
  } else {
    res.status(500).send('Error adding user');
  }

}
catch(err) {
  res.status(500).send('Error')
}
});
//^ Working

router.patch('/:bugId', async (req,res) => {
  try {
  const bugId = req.params.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `Bug ${bugId} not found` });
    }
  const updatedData = req.body;
  updatedData.lastUpdated = new Date();
  const result = await updateBug(bugId, updatedData)
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} updated!`, bugId })
  } else {
    res.status(404).json({error: 'Bug not found'})
  }}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working

router.patch('/:bugId/classify', requireKey('classification'), async (req,res) => {  
  try {
    const bugId = req.params.bugId;
    const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `Bug ${bugId} not found` });
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
  } catch (err) {
    res.status(500).send('Server error');
  }
});
//^ Working

router.patch('/:bugId/assign', requireKey('assignedToUserId'), requireKey('assignedToUserName'),  async (req,res) => {
  try {
  const bugId = req.params.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `Bug ${bugId} not found` });
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
//^ Working

router.patch('/:bugId/close', requireKey('closed'), async (req,res) => {
  try {
  const bugId = req.params.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `Bug ${bugId} not found` });
    }
  const closed = req.body
  closed.closedOn = new Date();
  closed.lastUpdated = new Date();

  const result = await updateBug(bugId, closed)
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} Closed!`, bugId })
  } else {
    res.status(404).json({error: 'Bug not found'})
  }
}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working

export { router as BugRouter }