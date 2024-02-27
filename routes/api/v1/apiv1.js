import express from 'express';



import tasksRouter from './controllers/tasks.js';


var router = express.Router();

router.get('/', (req, res) => {
    res.send('This is api v1 router ');
});

router.use('/tasks', tasksRouter);

export default router;

  
