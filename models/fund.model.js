const mongoose = require("mongoose");

const fundSchema=mongoose.Schema({
    userIdentification:{required:true,type:String},
    accountname:{required:true,type:String},
    accountnumber:{required:true,type:String},
    amount:{required:true,type:String}
})

const fundModel= mongoose.model("funds_collection",fundSchema);

module.exports= fundModel;