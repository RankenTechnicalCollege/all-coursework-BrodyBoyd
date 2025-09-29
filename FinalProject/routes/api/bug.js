import express from 'express';
const router = express.Router();
import joi from 'joi';
import debug from 'debug';
const debugBug = debug('app:BugRouter');
import { getBugs, getBugById, createBug, updateBug } from '../../database.js';


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
//^ Working 03-02

router.get('/:bugId', async (req,res) => {
  try {
  const bugId = req.params.bugId
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
//^ Working 03-02

router.post('', async (req,res) => {
  try {
  const newBug = req.body;
  const schema = joi.object({
    title: joi.string().required(),
    description: joi.string().required(),
    stepsToReproduce: joi.string().required(),
    });

  try {
    await schema.validateAsync({
      title: newBug.title,
      description: newBug.description,
      stepsToReproduce: newBug.stepsToReproduce,
    });
    newBug.createdAt = new Date()
  const result = await createBug(newBug);
  if (result.insertedId) {
    res.status(201).json({ id: result.insertedId, ...newBug });
  } else {
    res.status(500).send('Error adding bug');
  }
  } catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }} catch (err) {
    res.status(500).json({error: 'server error'})
  }
});
//^ Working 03-02

router.patch('/:bugId', async (req,res) => {
  try {
  const bugId = req.params.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
    }
  const schema = joi.object({
    title: joi.string(),
    description: joi.string(),
    stepsToReproduce: joi.string()
    });

  try {
    const updatedData = req.body;
    await schema.validateAsync({
      title: updatedData.title,
      description: updatedData.description,
      stepsToReproduce: updatedData.stepsToReproduce,
    });
    updatedData.lastUpdated = new Date();
    const result = await updateBug(bugId, updatedData);
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} updated!`, bugId })
  } else {
    res.status(404).json({error: 'Bug not found'})
  }
  } catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }}
  catch(err){
    res.status(500).send('Server Error')
  }});
//^ Working 03-02

router.patch('/:bugId/classify',  async (req,res) => {  
  try {
    const bugId = req.params.bugId;
    const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
    }
    const schema = joi.object({
    classification: joi.string().required(),
    });
try {
  const updatedData = req.body;
    await schema.validateAsync({
      classification: updatedData.classification,
    });

    updatedData.classification = req.body.classification;
    updatedData.lastUpdated = new Date();
    updatedData.classifiedOn = new Date();
    const result = await updateBug(bugId, updatedData);
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: `Bug ${bugId} Classified!`, bugId });
    } else {
      res.status(404).json({ error: 'Bug not found' });
    }
  }catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }
}catch (err) {
    res.status(500).send('Server error');
  }
});
//^ Working 03-02

router.patch('/:bugId/assign',  async (req,res) => {
  try {
  const bugId = req.params.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
    }
    const schema = joi.object({
    assignedToUserId: joi.string().required(),
    assignedToUserName: joi.string().required()
    });
    try {
      const newAssignments = req.body
      await schema.validateAsync({
      assignedToUserId: newAssignments.assignedToUserId,
      assignedToUserName: newAssignments.assignedToUserName
    });
      newAssignments.lastUpdated = new Date();
      newAssignments.assignedOn = new Date();

      const result = await updateBug(bugId, newAssignments)
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: `Bug ${bugId} assigned!`, bugId })
      } else {
        res.status(404).json({error: 'Bug not found'})
      }
    }catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working 03-02

router.patch('/:bugId/close', async (req,res) => {
  try {
  const bugId = req.params.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
    }
    const schema = joi.object({
      closed: joi.bool().required()
    });
    try {
  const closed = req.body
  await schema.validateAsync({
      closed: closed.closed,
    });
  closed.closedOn = new Date();
  closed.lastUpdated = new Date();

  const result = await updateBug(bugId, closed)
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} Closed status changed!`, bugId })
  } else {
    res.status(404).json({error: 'Bug not found'})
  }
}catch (validateError) {
    res.status(400).json({ error: validateError.details ? validateError.details[0].message : validateError.message });
  }
}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working 03-02

//COMMENT APIS

router.get('/:bugId/comments', async (req,res) => { //list all

});

router.get('/:bugId/comments/:commentId', async (req,res) => { // search specific comment

})

router.post('/:bugId/comments', async (req,res) => { // add comment

})
export { router as BugRouter }