import express from 'express';
const router = express.Router();
import joi from 'joi';
import debug from 'debug';
const debugBug = debug('app:BugRouter');
import { getBugs, getBugById, createBug, updateBug, findBugsComments, createComment, findSpecificComment, findBugsTestCases, findSpecificTestCase, createTestcase, updateTestCase, deleteTestCase, saveAuditLog, updateBugWorkLog } from '../../database.js';
import { createBugSchema, updateSchema, classifySchema, assignSchema, closeSchema, createCommentSchema, createTestSchema, updateTestSchema } from '../../validation/bugSchema.js'
import { validate } from '../../middleware/joiValidator.js'
import { validId } from '../../middleware/validId.js'
import { isAuthenticated } from '../../middleware/isAuthenticated.js'
import { hasAnyPermissions } from '../../middleware/hasPermissions.js';



router.use(express.urlencoded({extended:false}));


const currentDate = new Date()

router.get('', isAuthenticated, hasAnyPermissions(['canViewData']), async (req,res) => {
  try {
    const {keywords, classification, minAge, maxAge, closed, page, limit, sortBy} = req.query;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 5;
    const skip = limitNum > 0 ? (pageNum - 1) * limitNum : 0;

    const filter = {};
    if (keywords) { filter.$text = { $search: keywords }; }
    if (classification) { filter.classification = classification; }
    if (closed === "true") { filter.closed = true }
    else if (closed === 'false') { filter.closed = false; }

    if (minAge || maxAge) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dateFilter = {};

      if (maxAge) {dateFilter.$gte = new Date(today.getTime() - maxAge * 24 * 60 * 60 * 1000); }
      if (minAge) {dateFilter.$lte = new Date(today.getTime() - minAge * 24 * 60 * 60 * 1000); }

      filter.dateOfCreation = dateFilter;
    }
    const sortOptions = {
      title: {title: 1, dateOfCreation: -1},
      newest: {dateOfCreation: -1},
      oldest: {dateOfCreation: 1},
      classification: {classification: 1, dateOfCreation: -1},
      assignedTo: {assignedToUserName: 1, dateOfCreation: -1},
      createdBy: {createdByUserId: 1, dateOfCreation: -1}
    };
    const sort = sortOptions[sortBy] || {dateOfCreation: -1}
    
    
    const bugs = await getBugs(filter, sort, limitNum, skip);
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
//^ Working with validate 03-04

router.get('/:bugId',  isAuthenticated, validId('bugId'), hasAnyPermissions(['canViewData']), async (req,res) => {
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

router.post('/new', isAuthenticated, validate(createBugSchema), hasAnyPermissions(['canCreateBug']), async (req,res) => {
  try {
  const newBug = req.body;
    newBug.createdOn = new Date()
    newBug.comments = []
    newBug.testcase = []
    newBug.workLog = []
    newBug.closed = false;
    newBug.classification = "unclassified";
    newBug.createdBy = req.user.email

  const result = await createBug(newBug);


  const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"insert",
    target: result.insertedId,
    update: JSON.stringify(newBug),
    performedBy: req.user.email
  }
  
  if (result.insertedId) {
    res.status(201).json({ id: result.insertedId, ...newBug });
    saveAuditLog(logEntry);
  } else {
    res.status(500).send('Error adding bug');
  }} catch (err) {
    res.status(500).json({error: 'server error'})
  }
});
//^ Working with validate 03-02

router.patch('/:bugId', isAuthenticated, validId('bugId'), hasAnyPermissions(['canEditAnyBug']), async (req,res) => {
  try {
  const bugId = req.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} Not Found.` });
    }
    const updatedData = req.body;
    updatedData.lastUpdated = new Date();
    updatedData.lastUpdatedBy = req.user.id;
    const result = await updateBug(bugId, updatedData);

    const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"update",
    target: bugId,
    update: JSON.stringify(updatedData),
    performedBy: req.user.email
  }
  
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} updated!`, bugId })
    saveAuditLog(logEntry);
  } else {
    res.status(404).json({error: 'Bug not found'})
  }}
  catch(err){
    res.status(500).send('Server Error')
  }});
//^ Working with validate 03-02

router.patch('/:bugId/classify', isAuthenticated, validate(classifySchema), validId('bugId'),  hasAnyPermissions(['canClassifyAnyBug', 'canEditIfAssignedTo', 'canEditMyBug']), async (req,res) => {  
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
    updatedData.lastUpdatedBy = req.user.id;


    const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"update",
    target: bugId,
    update: JSON.stringify(updatedData),
    performedBy: req.user.email
  }

    const result = await updateBug(bugId, updatedData);
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: `Bug ${bugId} Classified!`, bugId });
      saveAuditLog(logEntry);
    } else {
      res.status(404).json({ error: 'Bug not found' });
    }
  }catch (err) {
    res.status(500).send('Server error');
  }
});
//^ Working with validate 03-02

router.patch('/:bugId/assign', isAuthenticated, validate(assignSchema), validId('bugId'), hasAnyPermissions(['canReassignAnyBug', 'canReassignIfAssignedTo', 'canEditMyBug']), async (req,res) => {
  try {
  const bugId = req.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} Not Found.` });
    }
      const newAssignments = req.body
      newAssignments.lastUpdated = new Date();
      newAssignments.assignedOn = new Date();
      newAssignments.assignedBy = req.user.id


      const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"update",
    target: bugId,
    update: JSON.stringify(newAssignments),
    performedBy: req.user.email
  }
      const result = await updateBug(bugId, newAssignments)
      if (result.modifiedCount === 1) {
        res.status(200).json({ message: `Bug ${bugId} assigned!`, bugId })
        saveAuditLog(logEntry);
      } else {
        res.status(404).json({error: 'Bug not found'})
      }
    }
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ Working with validate 03-02

router.patch('/:bugId/close', isAuthenticated, validate(closeSchema), validId('bugId'), hasAnyPermissions(['canCloseAnyBug']), async (req,res) => {
  try {
  const bugId = req.bugId;
  const bug = await getBugById(bugId);
    if (!bug) {
      return res.status(404).json({ error: `bugId ${bugId} Not Found.` });
    }
  const closed = req.body
  closed.closedOn = new Date();
  closed.lastUpdated = new Date();
  closed.closedBy = req.user.id

  const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"update",
    target: bugId,
    update: JSON.stringify(closed),
    performedBy: req.user.email
  }
  const result = await updateBug(bugId, closed)
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} Closed status changed!`, bugId })
    saveAuditLog(logEntry);
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

router.get('/:bugId/comments', isAuthenticated,validId('bugId'), hasAnyPermissions(['canViewData']), async (req,res) => {
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
//^ working 03-03

router.get('/:bugId/comments/:commentId', isAuthenticated, validId('bugId'), validId('commentId'), hasAnyPermissions(['canViewData']), async (req,res) => { 
try {
  const commentId = req.commentId
  const bugId = req.bugId
  const comment = await findSpecificComment(bugId, commentId)
  
  if (comment){
    res.status(200).json(comment);
  }
  else {
    res.status(404).json({ error: `Comment ID ${commentId} is not a valid ObjectId.` });
  }
}
catch (err) {
  res.status(500).json('Error')
}
})
//^ working 03-03

router.post('/:bugId/comments', isAuthenticated, validId('bugId'), validate(createCommentSchema), hasAnyPermissions(['canAddComments']), async (req,res) => {
try {
    const newComment = req.body;
    const bugId = req.bugId
    newComment.author = req.user.name || req.user.email
    newComment.authorId = req.user.id
    newComment.createdAt = new Date()
    
  const result = await createComment(bugId, newComment );
  if (result) {
    res.status(201).json({ id: result.insertedId, ...newComment });
  } else {
    res.status(500).send('Error adding Comment');
  }} catch (err) {
    res.status(500).json({error: 'server error'})
  }
})
//^ working 03-03


//TESTCASE APIS 

router.get('/:bugId/tests', isAuthenticated, validId('bugId'), hasAnyPermissions(['canViewData']), async (req,res) => { //list All
  try {
  const bugId = req.bugId
  const comments = await findBugsTestCases(bugId)
  
  if (comments){
    res.status(200).json(comments.testcase);
  }
  else {
    res.status(404).json({ error: `bugId ${bugId} is not a valid ObjectId.` });
  }
}
catch (err) {
  res.status(500).json('Error')
}
});
//^ working 03-03

router.get('/:bugId/tests/:testId', isAuthenticated, validId('bugId'), validId('testId'), hasAnyPermissions(['canViewData']), async (req,res) => { // find specific testcase
try {
  const testId = req.testId
  const bugId = req.bugId
  const testcase = await findSpecificTestCase(bugId, testId)
  
  if (testcase){
    res.status(200).json(testcase);
  }
  else {
    res.status(404).json({ error: `Testcase ID ${testId} is not a valid ObjectId.` });
  }
}
catch (err) {
  res.status(500).json('Error')
}
});
//^ working 03-03

router.post('/:bugId/tests', isAuthenticated, validId('bugId'), validate(createTestSchema), hasAnyPermissions(['canAddTestCase']), async (req,res) => {  //create test case
try {
    const newTestcase = req.body;
    const bugId = req.bugId
    newTestcase.createdAt = new Date()
    newTestcase.createdBy = req.user.id
    
    const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"update",
    target: bugId,
    update: JSON.stringify(newTestcase),
    performedBy: req.user.email
  }

  const result = await createTestcase(bugId, newTestcase );
  if (result) {
    res.status(201).json({ id: result.insertedId, ...newTestcase });
    saveAuditLog(logEntry);
  } else {
    res.status(500).send('Error adding testCase');
  }} catch (err) {
    res.status(500).json({error: 'server error'})
  }
});
//^ working 03-03

router.patch('/:bugId/tests/:testId',  isAuthenticated, validId('bugId'), validId('testId'), validate(updateTestSchema), hasAnyPermissions(['canEditTestCase']), async (req,res) => {  //update testcase passed/failed
try {
  const bugId = req.bugId;
  const testId = req.testId;
  const status = req.body
  status.lastUpdatedOn = new Date();
  status.lastUpdatedBy = req.user.id;

  const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"update",
    target: bugId,
    update: JSON.stringify(status),
    performedBy: req.user.email
  }
  const result = await updateTestCase(bugId, testId, status)
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Testcase ${testId} status changed!`, testId })
    saveAuditLog(logEntry);
  } else {
    res.status(404).json({error: 'testcase not found'})
  }
}
  catch(err){
    res.status(500).send('Server Error')
  }
});
//^ working 03-03

router.delete('/:bugId/tests/:testId', isAuthenticated, validId('bugId'), validId('testId'), hasAnyPermissions(['canDeleteTestCase']), async (req,res) => {  //delete testcase
  try {
  debugBug('Delete testcase endpoint called');
  const bugId = req.bugId;
  const testId = req.testId;
  const results = await deleteTestCase(bugId, testId);

  const logEntry = {
    timeStamp: new Date(),
    collection: "Bug",
    operation:"delete",
    target: bugId,
    performedBy: req.user.email
  }
  if (results.modifiedCount === 1){
    res.status(200).json({message: 'testCase deleted successfully'});
    saveAuditLog(logEntry);
  } else {
    res.status(404).json({message: 'testCase not found'})
  }
 }
 catch(err){
  res.status(500).send('Server Error')
 }
})

//Work log 

router.patch('/:bugId/worklog', isAuthenticated, validId('bugId'), hasAnyPermissions(['canEditAnyBug']), async (req,res) => {
  try {
  const bugId = req.bugId;
  const workLogEntry = req.body;
  workLogEntry.entryDate = new Date();
  workLogEntry.enteredBy = req.user.id;
  const result = await updateBugWorkLog(bugId, workLogEntry);
  if (result.modifiedCount === 1) {
    res.status(200).json({ message: `Bug ${bugId} work log updated!`, bugId })
  } else {
    res.status(404).json({error: 'Bug not found'})
  }}
  catch (err) {
    res.status(500).send('Server Error')
  }
});


export { router as BugRouter }