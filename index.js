const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(cors())
app.use(express.urlencoded({extended:true}));
app.use(express.json())
const URI =process.env.URI
mongoose.connect(URI,(err)=>{
    if (err) {
        console.log("error connecting with database")
    } else {
        console.log("connecting with database successful");
    }
});
const userRouter = require("./routes/users.route")
app.use("/users",userRouter)
PORT=process.env.PORT
app.listen(PORT,()=>{
   console.log("server starting now");
})