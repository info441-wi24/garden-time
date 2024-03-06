import express from 'express';
var router = express.Router();

/* GET users listing. */
router.get('/myIdentity', function(req, res, next) {
    if(req.session.isAuthenticated){
        // Accessing the email from the user loaded in the session
        const email = req.user && req.user.email;  // Using req.user which should have been populated by Passport

        res.json({
            status: "loggedin", 
            userInfo: {
                username: req.session.account ? req.session.account.username : email,
                name: req.session.account ? req.session.account.name : req.user && req.user.name.givenName && req.user.name.familyName,
                googleId: req.session.passport ? req.session.passport.user : undefined,
                ThemePreference: "",
                created_date: new Date(),
                created_tags: ["Not Started", "In Progress", "Completed"]
            }
        });
    } else {
        res.json({ "status": "loggedout" });
    }
});


router.post('/', async (req, res) =>{
    console.log("reached the api router for users");
    try{
        
        const newUser = new req.models.User({
            username: req.session.account ? req.session.account.username : req.session.profile.emails[0],
            name: req.session.account ? req.session.account.name : undefined,
            googleId: req.session.passport ? req.session.passport.user : undefined,
            ThemePreference: "", // Assuming default theme preference is empty
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
            
            let usernameVar = req.session.account.username
            let usernameValues= await req.models.User.find({username: usernameVar})
        
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
            
            let usernameVar = req.session.account.username
            let userValues= await req.models.User.findOne({username: usernameVar})
            
            console.log("USER VALUES", userValues);
        
            if(!userValues.created_tags.includes(req.body.tag)){
                //unshift adds to the front of the array instead of at the end so the new tags are always first 
                userValues.created_tags.unshift(req.body.tag)
            }
            console.log(userValues.created_tags)

            await userValues.save()
            res.json({"status":"success"})
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


export default router;
  