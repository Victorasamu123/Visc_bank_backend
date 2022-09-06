const mongoose = require("mongoose");

const userSchema=mongoose.Schema({
    firstname:{required:true,type:String},
    lastname:{required:true,type:String},
    Phonenumber:{required:true,type:String},
    email:{required:true,type:String,unique:true},
    password:{required:true,type:String},
    transferpin:{required:true,type:String},
    accountnumber:{type:String,unique:true},
    initialbalance:{type:String}
});
const userModel = mongoose.model("users_signup",userSchema);

module.exports= userModel;