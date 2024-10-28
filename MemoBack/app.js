const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const Router=require("./Router/handlers");
const cors=require("cors");

app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(bodyparser({extended:false}));
app.use(bodyparser.json());
(async()=>{
const mongoose=require('mongoose');

mongoose.connect("mongodb://localhost:27017/Memo").then(()=>{
    console.log("Database connected successfully !")
}).catch((e)=>{
    console.log(e)
})
})();
app.use("/api",Router)
app.listen(3001)