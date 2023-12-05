const express = require("express");
const router = express.Router();
const DataModel = require("../model/dataschema");
const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const authenticate = require("../middleware/Authenticate")

// const middleware = (req, res, next) => {
//     console.log("Middleware Execution success :)");
//     next();
// }

router.get("/", (req, res) => {
    res.send("Welcome to Home Page");
})


// router.get("/about", middleware, (req, res) => {
//     console.log("About us Page Executed after completion of middleware execution :)")
//     res.send("Welcome to our About Us Page");
// })

router.get("/profile", (req, res) => {
    res.cookie("TestingToken", "SuccessToken")
    res.send("Welcome to our Profile Page");
    // 9.ii)For testing purpose of cookies:    
})

router.get("/contact", (req, res) => {
    res.send("Welcome to Contact US Page");
});


router.post("/registration", async(req, res) => {
    try{
        const {username, phonenum, emailid, password, confirmpass, gender} = req.body;
    console.log("Request body val:::", req.body);
    console.log("Request emailid val:::", emailid);

    if(!username || !emailid || !password || !confirmpass || !phonenum || !gender){
        return res.status(422).json({msg: "Please fill each field"})
    }

    if (!phonenum.trim()) {
        return res.status(422).json({ error: 'Phone number Needed' });
    }

    const userExist = await DataModel.findOne({emailid});

    if(userExist){
        res.status(422).json({error: "User already exist with this mail id"})
    }
    else if(password != confirmpass){
        res.status(422).json({error: "Password and confirm password must be same"})
    }
    else{
        const userData = DataModel({username, emailid, password, confirmpass, phonenum, gender});

        // (8) Before saving in database we use 'pre' method to encrypt password.
        const resultData = await userData.save();
        console.log("Value of resultData:::", resultData);
        return res.status(200).json({msg: "Registered Successfully"});
    }

    }
    catch(err){
        console.log(err)
    }
})


router.post("/login", async(req, res) => {
    try{
    const {emailid} = req.body;
    const enteredPassword = req.body.password

    console.log("Value of body for Login:::", req.body);
    console.log("Value of password for Login:::", enteredPassword);
    console.log("Value of emailid for Login:::", emailid);

    if(!emailid || !enteredPassword){
        return res.status(400).json({error: "Please enter all required fields"}) 
    }

    console.log("Value of DataModel::", DataModel)
    const storedData = await DataModel.findOne({emailid: emailid})

    console.log("Stored Password::", storedData)


    if(storedData){
        // 8.ii) During Login:
        const isMatch = await bcrypt.compare(enteredPassword, storedData.password)

        // 9.i) 
        let generateToken = await storedData.generateAuthToken();
        console.log("Value of token generated::", generateToken)

        // 9.ii) Store generated token inside cookies:
            res.cookie("webToken", generateToken, {
                httpOnly: true
            })

        if(!isMatch){
            return res.status(400).json({error: "Login Invalid"})  
          }
          else{
              return res.status(200).json({msg: "Login Successfull"})   
          }
    }
    else{
        return res.status(400).json({error: "Login Invalid"}) 
    }
    }
    catch(err){
        res.status(400).send("Login Invalid")
    }
})


router.get("/about", authenticate, async(req, res) => {
    try{
        console.log("About page");
        res.send(req.userData)
    }
    catch(err) {
        console.log(err);
        res.send(err)
    }
});

router.get("/getUserData", authenticate, async(req, res) => {
    res.send(req.userData)
});

router.post("/contact", authenticate, async (req, res) => {
    const {username, emailid, phonenum, title, usermessage} = req.body;

    if(!username || !emailid || !phonenum || !title || !usermessage){
        return res.status(422).send("Please Fill all Field");
    }

    const userContact = await DataModel.findOne({_id: req.userData._id})

    await userContact.insertContactDetail(username, emailid, phonenum, title, usermessage);
    userContact.save();

    // When we create or Insert it will give status of 201:
    // Whenever creationg or inserting use res.json() instead of res.send()
    res.status(201).json({Success: "Message Submitted Successfully"})
});

router.get("/logout", (req, res) => {
    res.clearCookie("webToken", {path: '/'});
    res.status(200).send("User LogOut")
})

module.exports = router;

