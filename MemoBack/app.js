const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const Router=require("./Router/handlers");
const cors=require("cors");

app.use(cors({credentials:true,origin:"https://memo-r4oiimlts-rajapandiyan1s-projects.vercel.app"}))
app.use(bodyparser({extended:false}));
app.use(bodyparser.json());
(async()=>{
const mongoose=require('mongoose');

mongoose.connect(`mongodb+srv://rajapandiyan1163:r1a2j3a4@cluster0.8edduvs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Memo`).then(()=>{
    console.log("Database connected successfully !")
}).catch((e)=>{
    console.log(e)
})
})();
app.use("/api",Router)
app.listen(3001)