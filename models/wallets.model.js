const mongoose = require("mongoose");

const walletSchema = mongoose.Schema({
    walletname:{required:true,type:String},
    walletdescription:{required:true,type:String},
    targetamount:{required:true,type:String},
    userIdentification:{required:true,type:String}
})
const walletModel= mongoose.model("wallets_collection",walletSchema);

module.exports= walletModel;