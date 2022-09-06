const express = require("express");
const { registeredUsers,signinUsers, dashboard,testing, fund,transfer, history, transferhistory, wallet,getwallet} = require("../controllers/users.controllers");
const router= express.Router();

router.post("/signup",registeredUsers);
router.post("/signin",signinUsers);
router.post("/dashboard",dashboard);
router.get("/testing",testing);
router.post("/fund",fund);
router.post("/transfer",transfer);
router.post("/history",history);
router.post("/transferhistory",transferhistory);
router.post("/wallets",wallet);
router.post("/getwallets",getwallet);
router.post("/fundwallets",fundwallet);
module.exports= router;


