const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jsontoken = require("jsonwebtoken")

// (6) Schema and Module:
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    username: String,
    phonenum: String,
    emailid: {
        type: String,
        required: true,
        unique: [true, "Email Id must be Unique"],
    },
    password: {
        type: String,
        required: true
    },
    confirmpass: {
        type: String,
        required: true
    },
    gender: String,
    contactData: [
        {
            username: String,
            phonenum: String,
            emailid: {
                type: String,
                required: true,
                unique: [true, "Email Id must be Unique"],
            },
            title: String,
            usermessage: String  
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true 
            }
        }
    ]
});

// 8.i) Hashing the password:
// As we have to use 'this', so we use normal call back function instead of arrow function.
dataSchema.pre('save', async function(next) {
    console.log("Value of this is:::", this)
    console.log("Value of current password is:::", this.password)
    console.log("Value of modified is:::", this.isModified('password'))
    console.log("Bcrypt password value::", await bcrypt.hash(this.password, 12));
    console.log("_________________________________")

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12)
        this.confirmpass = await bcrypt.hash(this.confirmpass, 12)     
    }
    next()
})

// 9.i.) Generate JWT Token and stored it in database:
dataSchema.methods.generateAuthToken = async function(){
    try{
        const tokenVal = jsontoken.sign({_id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: tokenVal})
        await this.save()
        return tokenVal;
    }
    catch(err){
        console.log(err)
    }
}


dataSchema.methods.insertContactDetail = async function(username, emailid, phonenum, title, usermessage){
    try{
        this.contactData = this.contactData.concat({username, emailid, phonenum, title, usermessage});
        await this.save();
        return this.contactData;
    }
    catch(err){
        console.log(err)
    }
}

const DataModel = new mongoose.model("mernstackCollection", dataSchema);

module.exports = DataModel;