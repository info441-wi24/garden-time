import express from 'express';
var router = express.Router();

/* GET users listing. */
// router.get('/myIdentity', function(req, res, next) {
//     if(req.session.isAuthenticated){
//         res.json({
//             status: "loggedin", 
//             userInfo: {
//                username: req.session.account.username,
//                name: req.session.account.name, 
//                ThemePreference: "", 
//                created_date: new Date(),
//                created_tags: ["Not Started", "In Progress", "Completed"]
//             }
//         })
    
//     }else{
//         res.json({"status": "loggedout" });
//     }
// });

router.post('/', async (req, res) =>{
    console.log("reached the api router for users");
    try{
        
        const newUser = new req.models.User({
            username: req.session.account.username,
            name: req.session.account.name, 
            ThemePreference: "", 
            created_date: new Date(),
            created_tags: ["Not Started", "In Progress", "Completed"]
        })
        console.log("NEW user:"  , newUser);

        await newUser.save()

        res.json({"status":"success"})
        
        

    }catch(error){
        console.log("Error getting tags from db", error)
        res.send(500).json({"status": "error", "error": error})
    }
})


//modifying the user tags
router.get('/tag', async (req, res) =>{
    console.log("reached the api router for tags");
    try{
        
        if(req.session.account.username !== undefined) {
            
            let usernameVar = req.query.username;
            let usernameValues= await req.models.User.find({user: usernameVar})
        
            res.send(usernameValues[0].created_tags)
        }
        else {
            res.send(["Not Started", "In Progress", "Completed"])
        }
        
        

    }catch(error){
        console.log("Error getting tags from db", error)
        res.send(500).json({"status": "error", "error": error})
    }
})

router.post('/tag', async (req, res) =>{
    console.log("reached the api router for user tags");
    try{
        
        if(req.session.account.username !== undefined) {
            
            let usernameVar = req.query.username;
            let userValues= await req.models.User.find({user: usernameVar})
        
            if(!userValues.created_tags.includes(req.body.tag)){
                //unshift adds to the front of the array instead of at the end so the new tags are always first 
                userValues.created_tags.unshift(req.body.tag)
            }

            await userValues.save()
        }
        else {
            console.log("Error getting tags from db", error)
            res.send(500).json({"status": "error", "error": error})
        }
        
        

    }catch(error){
        console.log("Error getting tags from db", error)
        res.send(500).json({"status": "error", "error": error})
    }
})

// router.delete('/tag', async (req, res) =>{
//     console.log("reached the api router for user tags");
//     try{
        
//         if(req.session.account.username !== undefined) {
            
//             let usernameVar = req.query.username;
//             let userValues= await req.models.User.find({user: usernameVar})
        
//             if(!userValues.created_tags.includes(req.body.tag)){
//                 //remove the first instance of the new tag
//                 userValues.created_tags.splice(userValues.created_tags.indexOf(req.body.tag), 1);
//             }

//             await userValues.save()
//         }
//         else {
//             console.log("Error getting tags from db", error)
//             res.send(500).json({"status": "error", "error": error})
//         }
        
        

//     }catch(error){
//         console.log("Error getting tags from db", error)
//         res.send(500).json({"status": "error", "error": error})
//     }
// })

export default router;
  