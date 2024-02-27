import express from 'express';

var router = express.Router();

router.get('/', async (req, res) =>{
    console.log("reached the api router for tasks");
    try{
        
        if(req.session.account.username !== undefined) {
            
            let usernameVar = req.query.username;
            let usernameTasks = await req.models.Task.find({user: usernameVar})
           
            let taskData = await Promise.all(
                usernameTasks.map(async task => { 
                    try{
                        console.log("TASK", task)
                        return task.description
                    }catch(error){
                        // TODO: return error message
                        console.log("Error getting post from db", error)
                        res.send(500).json({"status": "error", "error": error})
                    }
                })
            );
            res.send(taskData)
        }
        else {
            res.send(["No tasks yet!, please log in"])
        }
        
        

    }catch(error){
        console.log("Error getting posts from db", error)
        res.send(500).json({"status": "error", "error": error})
    }
})

router.post('/', async (req, res) => {
   console.log("IN POST");
        try{
        
            console.log("REQ BODY PARAMS", req.body )
    
            const newTask = new req.models.Task({
                description: req.body.task,
                created_date: new Date(),
                username: req.session.account.username
            })
            console.log("NEW Task:"  , newTask);
    
            await newTask.save()
    
            res.json({"status":"success"})
    
        }catch(error){
            console.log("Error saving post to db", error)
            res.send(500).json({"status": "error", "error": error})
        }
    
    
    
})
export default router;