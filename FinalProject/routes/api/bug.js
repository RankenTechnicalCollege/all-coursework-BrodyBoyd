import express from 'express';
const router = express.Router();

import debug from 'debug';
const debugBug = debug('app:BugRouter');

router.use(express.urlencoded({extended:false}));

const bugs = [
{ bugId:1, title: 'SYSTEM IS BROKEN', description: 'literally wont even open', stepsToReproduce: 'try and open app', creationDate: '', classification: 'UI', classifiedOn: '-', lastUpdated: '-', assignedToUserId: '-', assignedToUserName: '-', assignedOn: '-', closed: '', closedOn: '' },
{ bugId:2, title: 'Clicking log in buys 4 years worth of disney+', description: 'I clicked the login button and instantly 4 years of Disney+ were purchased from my card', stepsToReproduce: 'Try and log in', creationDate: '',  classification: 'Malware?', classifiedOn: '-', lastUpdated: '-', assignedToUserId: '-', assignedToUserName: '-', assignedOn: '-', closed: '', closedOn: '' },
{ bugId:3, title: 'Click does not work', description: 'Unable to click any button after logging in', stepsToReproduce: 'Log in', creationDate: '',  classification: 'UI', classifiedOn: '-', lastUpdated: '-', assignedToUserId: '-', assignedToUserName: '-', assignedOn: '-', closed: '', closedOn: '' }

];

const currentDate = new Date()

function requireKey(keyName) {
        return (req, res, next) => {
            if (!req.body || !req.body[keyName]) {
                return res.status(404).send(`Missing required key: '${keyName}' in request body.` );
            }
            next();
        };
    }

    
router.get('/list', (req,res) => {
  debugBug('bug list route hit');
  res.json(bugs);
});

router.get('/:bugId', (req,res) => {
  const bugId = req.params.bugId;
  const bug = bugs.find(bug => bug.bugId == bugId)
  if (bug){
    res.status(200).json(bug);
  }
  else {
    res.status(404).send(`Bug ${bugId} not found.`);
  }
});

router.post('/new', (req,res) => {
  const newBug = req.body;

  const searchBug = bugs.find(bug => bug.title == newBug.title )

  if (searchBug){
    res.status(400).send('Bug already exists')
    return;
  }else {
      newBug.bugId = bugs.length + 1;
      newBug.creationDate = currentDate.toLocaleDateString();
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
      bugs.push(newBug);
      res.status(200).json({message: `The Bug titled "${newBug.title}" added successfully`})
    }
});

router.put('/:bugId', (req,res) => {
  const id = req.params.bugId;
  const bugToUpdate = bugs.find(bug => bug.bugId == id);

  const updatedBug = req.body;

  if(bugToUpdate)
  {
    for (const key in updatedBug){
      bugToUpdate[key] = updatedBug[key];
    }
    const index = bugs.findIndex(bug => bug.bugId == id);
  if(index != -1){
    bugs[index] = bugToUpdate;
  }
    res.status(200).send(`Bug ${id} updated successfully`);
  }
  else {
    res.status(404).send('Bug not found');
  }
});

router.put('/:bugId/classify', requireKey('classification'), (req,res) => {
  const id = req.params.bugId;
  const bugToUpdate = bugs.find(bug => bug.bugId == id);

  const newClassification = req.body
  //MAKE CLASSIFICATION TYPE
  if(bugToUpdate)
  {
    
    bugToUpdate.lastUpdated = currentDate.toLocaleDateString();
    bugToUpdate.classifiedOn = currentDate.toLocaleDateString();
    for (const key in newClassification){
      bugToUpdate[key] = newClassification[key];
    }
    const index = bugs.findIndex(bug => bug.bugId == id);


  if(index != -1){
    bugs[index] = bugToUpdate;
  }
    res.status(200).send(`Bug classified`);
  }
  else {
    res.status(404).send('Bug not found');
  }
});

router.put('/:bugId/assign', requireKey('assignedToUserId'), requireKey('assignedToUserName'),  (req,res) => {
  const id = req.params.bugId;
  const bugToAssign = bugs.find(bug => bug.bugId == id);
  const newAssignments = req.body
      if(bugToAssign)
      {
        bugToAssign.lastUpdated = currentDate.toLocaleDateString();
        bugToAssign.assignedOn = currentDate.toLocaleDateString();
        if (!newAssignments.assignedToUserId) {
          res.status(400).type('text/plain').send('User Id is required to be assigned')
          return;
          }
        if (!newAssignments.assignedToUserName) {
          res.status(400).type('text/plain').send('User Name is required to be assigned')
          return;
          } 
        else 
        {
          
          for (const key in newAssignments){
            bugToAssign[key] = newAssignments[key];
          }
            const index = bugs.findIndex(bug => bug.bugId == id);
          if(index != -1){
            bugs[index] = bugToAssign;
          }
          res.status(200).send(`Bug assigned!`);
        }
      }
      else {
        res.status(404).send('Bug not found');
      }
});

router.put('/:bugId/close', requireKey('closed'), (req,res) => {
  const id = req.params.bugId;
  const bugToClose = bugs.find(bug => bug.bugId == id);
  const closed = req.body
      if(bugToClose)
      {
        bugToClose.closedOn = currentDate.toLocaleDateString();
        bugToClose.lastUpdated = currentDate.toLocaleDateString();
          for (const key in closed){
            bugToClose[key] = closed[key];
          }
            const index = bugs.findIndex(bug => bug.bugId == id);
          if(index != -1){
            bugs[index] = bugToClose;
            
          }
          
        }
      else {
        res.status(404).send(`Bug ${id} not found`);
      }
});

export { router as BugRouter }