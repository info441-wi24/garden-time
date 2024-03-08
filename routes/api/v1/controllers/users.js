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
            username: req.session.account ? req.session.account.username : req.session.profile.emails[0].value,
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
router.get('/tag', async (req, res) => {
    console.log("reached the api router for tags");
    try {
        if (req.session.authType === 'microsoft') {
            if (req.session.account && req.session.account.username !== undefined) {
                let usernameVar = req.session.account.username;
                let usernameValues = await req.models.User.find({username: usernameVar});
                return res.send(usernameValues[0].created_tags);
            }
        } else if (req.session.authType === 'google') {
            if (req.session.passport && req.session.passport.user !== undefined) {
                let user_google_id = req.session.passport.user;
                let userValues = await req.models.User.find({_id: req.session.passport.user});
                console.log(userValues);

                return res.send(userValues[0].created_tags);
            }
        }
        return res.send(["Not Started", "In Progress", "Completed"]);
    } catch (error) {
        console.log("Error getting tags from db", error);
        return res.status(500).json({"status": "error", "error": error});
    }
});


router.post('/tag', async (req, res) => {
    console.log("reached the api router for user tags");
    try {
        let userValues;

        if (req.session.authType === 'microsoft' && req.session.account && req.session.account.username) {
            let usernameVar = req.session.account.username;
            userValues = await req.models.User.findOne({username: usernameVar});
        } else if (req.session.authType === 'google' && req.session.passport && req.session.passport.user) {
            let userId = req.session.passport.user;
            userValues = await req.models.User.findOne({_id: userId});
        }

        if (!userValues) {
            // If no user is found, respond with an error.
            return res.status(404).json({"status": "error", "error": "User not found"});
        }

        console.log("USER VALUES", userValues);
        if (!userValues.created_tags.includes(req.body.tag)) {
            // Unshift adds to the front of the array instead of at the end so the new tags are always first.
            userValues.created_tags.unshift(req.body.tag);
        }
        console.log(userValues.created_tags);

        await userValues.save();
        res.json({"status": "success"});

    } catch (error) {
        console.log("Error processing tags", error);
        res.status(500).json({"status": "error", "error": error});
    }
});



export default router;
  