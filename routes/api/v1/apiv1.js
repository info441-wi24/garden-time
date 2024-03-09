import express from 'express';



import tasksRouter from './controllers/tasks.js';
import usersRouter from './controllers/users.js';


var router = express.Router();

router.get('/', (req, res) => {
    res.send('This is api v1 router ');
});

router.use('/tasks', tasksRouter);
router.use('/users', usersRouter);

export default router;

  
