const jwt = require("jsonwebtoken");
const DataModel = require("../model/dataschema")

const Authenticate = async (req, res, next) => {
    try{
    console.log("cookies value is::", req.cookies);
    const {webToken} = req.cookies;
    const jwtVerification = jwt.verify(webToken, process.env.SECRET_KEY);
    console.log("jwtVerification in Authenticate::", jwtVerification);
    const userData = await DataModel.findOne({_id: jwtVerification._id, "tokens.token": webToken});
    console.log("Value of userData for About Page::", userData);


    if(!userData){ throw new error("User Not Found")}
    req.token = webToken;
    req.userData = userData;


    next();
    }
    catch(err){
        console.log(err);
        res.status(401).send("Unauthorised: not Token Provided")
    }
}

module.exports = Authenticate