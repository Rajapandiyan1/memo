const Routers=require("express").Router();
const { default: mongoose } = require("mongoose");
const MemoModel=require("../Model/MemoModel")
// get all memo
Routers.get("/getMymemo",async(req,res,next)=>{
    let arr=[];
    try{
        (await MemoModel.find({})).forEach((doc)=>{
            arr.push(doc);
            return doc;
        })
        res.send({ok:true,data:arr})
    }catch(e){
        res.send({ok:false,message:e.message})
    }
    
})
Routers.post("/addMyMemo",async(req,res,next)=>{
    try{
        let data=await new MemoModel(req.body).save();
        if(!data) return res.send({ok:false,message:"add memo faild !"})
         res.send({ok:false,message:"add memo successfully",data:data})
    }catch(e){
    
        res.send(e.message)
    }
});
Routers.put("/replaceMyMemo/:id",async(req,res,next)=>{
const Id=req.params.id;
const body=req.body;
console.log(body);

try{
    const response = await MemoModel.findByIdAndUpdate({_id:Id},{...body});
    // const response=await MemoModel.findByIdAndUpdate({_id:Id},{body})
    console.log(response)
    if(!response) return res.send({ok:false,message:"sorry ! Edit faild"});
    res.send({ok:false,message:"Edit successfully",data:response})
}catch(e){
    res.send({ok:false,message:"sorry ! Edit faild"})
}
});
Routers.delete("/deleteMyMemo/:ids",async(req,res,next)=>{
    const Ids=req.params.ids;
    console.log(Ids)
    try{
        const response=await MemoModel.findByIdAndDelete({_id:Ids})
        if(!response) return res.send({ok:false,message:"sorry ! Delete faild"});
        res.send({ok:false,message:"Delete successfully"})
    
    }catch(e){
    
    }
})


module.exports=Routers;