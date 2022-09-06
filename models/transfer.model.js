const mongoose = require("mongoose");

const transferSchema = mongoose.Schema({
    userIdentification:{required:true,type:String},
    receiverAcccoutName:{required:true,type:String},
    receiverAccountNumber:{required:true,type:String},
    amountTransfering:{required:true,type:String},
    bankName:{required:true,type:String}
})
const transferModel= mongoose.model("transfer_collection",transferSchema);

module.exports= transferModel;