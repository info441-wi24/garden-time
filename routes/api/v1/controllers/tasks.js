import express from 'express';

var router = express.Router();

router.get('/', async (req, res) =>{
    console.log("reached the api router for tasks");
    try{
        console.log("PARAM?" , req.query.username)
        if(req.query.username !== undefined) {
            console.log("going into the query if-statement")
            let usernameVar = req.query.username;
            let usernameTasks = await req.models.Task.find({user: usernameVar})
            console.log(usernameTasks)

            let taskData = await Promise.all(
                usernameTasks.map(async task => { 
                    try{
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
            res.send(["No tasks yet!"])
        }
        
        

    }catch(error){
        console.log("Error getting posts from db", error)
        res.send(500).json({"status": "error", "error": error})
    }
})
export default router;