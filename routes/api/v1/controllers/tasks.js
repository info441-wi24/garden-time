import express from 'express';

var router = express.Router();

router.get('/', async (req, res) => {
    console.log("reached the api router for tasks");
    try {
        let userTasks;
        let userInfo;

        if (req.session.authType === 'microsoft' && req.session.account.username) {
            userInfo = await req.models.User.findOne({username: req.session.account.username});
        } else if (req.session.authType === 'google' && req.session.passport && req.session.passport.user) {
            userInfo = await req.models.User.findOne({_id: req.session.passport.user});
        }

        if (userInfo) {
            userTasks = await req.models.Task.find({user: userInfo._id});
            let taskData = await Promise.all(userTasks.map(async task => {
                try {
                    return {"description": task.description, "taskId": task._id, "tag": task.tag};
                } catch (error) {
                    console.log("Error processing task", task, error);
                    return {"error": "Error processing task", "taskId": task._id};
                }
            }));

            return res.send(taskData);
        }

        res.send([{"description": "No tasks yet!, please log in", "taskId": 0}]);
    } catch (error) {
        console.log("Error getting tasks from db", error);
        res.status(500).json({"status": "error", "error": error});
    }
});


router.post('/', async (req, res) => {
    console.log("IN POST");
    try {
        console.log("REQ BODY PARAMS", req.body);

        let userInfo;
        if (req.session.authType === 'microsoft' && req.session.account.username) {
            // For Microsoft auth, assume you get the username via query parameters
            userInfo = await req.models.User.findOne({ username: req.session.account.username });
        } else if (req.session.authType === 'google' && req.session.passport && req.session.passport.user) {
            // For Google auth, you get the user ID from the session
            userInfo = await req.models.User.findOne({ _id: req.session.passport.user });
        }

        if (!userInfo) {
            return res.status(404).json({ "status": "error", "error": "User not found" });
        }

        const newTask = new req.models.Task({
            description: req.body.task,
            created_date: new Date(),
            user: userInfo._id,
            tag: req.body.tag
        });
        console.log("NEW Task:", newTask);

        await newTask.save();

        res.json({ "status": "success" });

    } catch (error) {
        console.log("Error saving post to db", error);
        res.status(500).json({ "status": "error", "error": error });
    }
});


router.post('/tag', async (req, res) => {
    console.log("IN POST");
    try {
        let userInfo;

        if (req.session.authType === 'microsoft' && req.session.account.username) {
            // For Microsoft auth, assume you get the username via query parameters
            userInfo = await req.models.User.findOne({ username: req.session.account.username });
        } else if (req.session.authType === 'google' && req.session.passport && req.session.passport.user) {
            // For Google auth, you get the user ID from the session
            userInfo = await req.models.User.findOne({ _id: req.session.passport.user });
        }

        if (!userInfo) {
            return res.status(404).json({ "status": "error", "error": "User not found" });
        }

        let taskInfo = await req.models.Task.findOne({_id: req.body.id});
        console.log("TASK INFO" , taskInfo);
        console.log("REQ BODY", req.body)
        taskInfo.tag = req.body.tag;
        console.log("TASK INFO" , taskInfo);

        if (!userInfo.created_tags.includes(req.body.tag)) {
            // Unshift adds to the front of the array instead of at the end so the new tags are always first.
            userInfo.created_tags.unshift(req.body.tag);
        }

        
        
        // Make sure to call save on the correct object
        await taskInfo.save();
        await userInfo.save();

        res.json({ "status": "success" });

    } catch (error) {
        console.log("Error saving post to db", error);
        res.status(500).json({ "status": "error", "error": error });
    }
});


router.delete('/', async (req, res) => {
    if(req.session.isAuthenticated){
        try{
            console.log("DELETE REQUEST", req.body.id);
            let taskId = req.body.id;
            
            // Find the task to ensure it belongs to the logged-in user
            let task = await req.models.Task.findOne({_id: taskId});
            if (!task) {
                return res.status(404).json({ "status": "error", "error": "Task not found" });
            }
            
            // Verify the logged-in user is the task owner, adjust based on your user identification (ID or username)
            let userId = req.session.passport ? req.session.passport.user : req.session.account.username;
            let userInfo;
            
            if (req.session.authType === 'microsoft') {
                userInfo = await req.models.User.findOne({username: userId});
            } else if (req.session.authType === 'google') {
                userInfo = await req.models.User.findOne({_id: userId});
            }

            if (!userInfo || task.user.toString() !== userInfo._id.toString()) {
                return res.status(403).json({ "status": "error", "error": "Unauthorized to delete this task" });
            }

            // Proceed with task deletion since the user is verified
            await req.models.Task.deleteOne({_id: taskId});
            res.json({"status": "success"});
    
        } catch (error) {
            console.log("Error deleting the task", error);
            res.status(500).json({"status": "error", "error": error});
        }
    }
    else {
        res.status(401).json({
            status: "error",
            error: "Not authenticated"
        });
    }
});

export default router;