const fundModel = require("../models/fund.model");
const transferModel = require("../models/transfer.model");
const userModel = require("../models/use.models");
const walletModel = require("../models/wallets.model");
let signup = ""
const registeredUsers = (req, res) => {
    console.log(req.body);
    let form = new userModel(req.body);
    form.save((err) => {
        console.log(err)
        if (err) {
            console.log("save not successful");
            res.send({ message: "signup not successful or email already exists" });
        } else {
            userModel.findOne({ email: req.body.email }, (err, result) => {
                signup = result.id
                console.log(result.id);
                console.log(signup)
                res.send({ message: "Registration successful", status: true, user_id: result.id });
            })

            // console.log("save successful");
            // res.send({message:"signup successful"})
        };
    });
};
const signinUsers = (req, res) => {
    console.log(req.body)
    let { email, password, } = req.body
    userModel.findOne({ email: email, password: password }, (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "signin not suuccessful pls try again later", status: false })
        } else {
            if (result) {
                if (result.email === email && result.password === password) {
                    console.log("signin information");
                    res.send({ messsage: "signin successful", status: true, user_id: result.id })
                    signup = result.id
                } else {
                    res.send({ message: "invalid password", status: false })
                }
            } else {
                res.send({ message: "invalid signin information", status: false })
            }
        }
    })
};
const dashboard = (req, res) => {
    console.log(req.body)
    let { userIdentification } = req.body
    userModel.findOne({ _id: userIdentification }, (err, result) => {
        if (err) {
            console.log(err);
            res.send({ message: "error loading" })
        } else {
            console.log(result)
            res.send(result)
        }
    })
}
const fund = (req, res) => {
    console.log(req.body);
    console.log(req.body.amount);
    userModel.findOne({ _id: req.body.userIdentification }, (err, result) => {
        user = result
        user.initialbalance = Number(user.initialbalance) + Number(req.body.amount)
        console.log(user)
        userModel.findByIdAndUpdate({ _id: req.body.userIdentification }, user, (err, result) => {
            if (err) {
                console.log("unable to save")
            } else {
                console.log("saved")
                console.log(result)
                // res.send(result)
            }
        })
        let newfund = new fundModel(req.body)
        newfund.save((err) => {
            console.log(err)
            if (err) {
                console.log("save not successful");
                res.send({ message: "funding not successful" });
            } else {
                console.log("funding successsful")
            }
        })
    })
}
const transfer = (req, res) => {
    console.log(req.body)
    userModel.findOne({ _id: req.body.userIdentification }, (err, result) => {
        accountinfo = result
        console.log(accountinfo.initialbalance)
        accountinfo.initialbalance = Number(accountinfo.initialbalance) - Number(req.body.amountTransfering)
        console.log(accountinfo)
        userModel.findByIdAndUpdate({ _id: req.body.userIdentification }, accountinfo, (err, result) => {
            if (err) {
                console.log("unable to save")
            } else {
                console.log("saved")
                console.log(result)
                // res.send(result)
            }
        })
        let newtransfer = new transferModel(req.body)
        newtransfer.save((err) => {
            console.log(err)
            if (err) {
                console.log("save not successful");
                res.send({ message: "traansfer not successful" });
            } else {
                console.log("transfer successsful")
            }
        })
    })
}
const history =(req,res)=>{
    console.log(req.body)
    fundModel.find({userIdentification:req.body.userIdentification},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result)
            res.send(result);
        }
    })
}
const transferhistory =(req,res)=>{
    console.log(req.body)
    transferModel.find({userIdentification:req.body.userIdentification},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result)
            res.send(result);
        }
    })
}
const wallet =(req,res)=>{
    console.log(req.body)
    let newWallets=new walletModel(req.body);
    newWallets.save((err)=>{
        if(err){
            console.log(err)
            res.send({message:"an error has occur"})
        }else{
            res.send({message:"wallet created successfully"})
        }
    })
}
const getwallet =(req,res)=>{
    console.log(req.body)
    walletModel.find({userIdentification:req.body.userIdentification},(err,result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result)
            res.send(result);
        }
    })
}
const fundwallet=(req,res)=>{
    console.log(req.body)
    userModel.findOne({_id:req.body.userIdentification},(err,result)=>{
        if(err){
            console.log(err)
            res.send({message:"wallet funding failed",status:false})
        }else{
        let user=result
        console.log(user);
        user.initialbalance=Number(user.initialbalance)-Number(req.body.amounttofound)
        console.log(user.initialbalance);
        userModel.findByIdAndUpdate({ _id: req.body.userIdentification }, user, (err, result) => {
            if (err) {
                console.log(err)
                console.log("unable to save")
            } else {
                console.log("saved")
                console.log(result.initialbalance)
                res.send({message:"wallet funding was successful",status:true});
            }
        })
        }
    })
}
const testing = (req, res) => {
    res.send({
        you: [
            {
                name: "sola", age: 123
            },
            {
                name: "sola", age: 123
            },
            {
                name: "sola", age: 123
            }
        ]
    })
}

module.exports = { registeredUsers, signinUsers, dashboard, testing, fund, transfer,history,transferhistory,wallet,getwallet,fundwallet};